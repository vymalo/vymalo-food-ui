import { useCallback, useContext, useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/store';
import { HttpTypes } from '@medusajs/types';
import { convertToLocale, getPercentageDiff } from '@modules/utils.ts';
import { FetchState } from '@modules/products/slice.ts';
import { getProductThunk } from '@modules/products/thunk.ts';
import { useAddItem, useGetOrSetCart } from '@modules/cart';
import { ProductContext } from '@modules/products/context.tsx';
import { useRegion } from '@modules/region';

export function useCurrentProduct(): HttpTypes.StoreProduct {
  const context = useContext(ProductContext);
  return context!;
}

interface AddToCartProps {
  variantId: string;
  quantity: number;
}

export function useAddToCart() {
  const addItem = useAddItem();
  const getOrSetCart = useGetOrSetCart();

  return useCallback(
    async ({ variantId, quantity }: AddToCartProps) => {
      const cart = await getOrSetCart();

      if (!cart) {
        throw new Error('missing_cart_id');
      }

      if (!variantId) {
        throw new Error('missing_product_variant_id');
      }

      try {
        await addItem({ cartId: cart.id, variantId, quantity });
      } catch (e) {
        console.error(e);
        throw new Error('error_adding_item_to_cart');
      }
    },
    [addItem, getOrSetCart],
  );
}

export const useGetPricesForVariant = () => {
  return useCallback((variant?: HttpTypes.StoreProductVariant) => {
    if (!variant?.calculated_price?.calculated_amount) {
      return null;
    }

    return {
      calculated_price_number: variant.calculated_price.calculated_amount,
      calculated_price: convertToLocale({
        amount: variant.calculated_price.calculated_amount,
        currency_code: variant.calculated_price.currency_code,
      }),
      original_price_number: variant.calculated_price.original_amount,
      original_price: convertToLocale({
        amount: variant.calculated_price.original_amount,
        currency_code: variant.calculated_price.currency_code,
      }),
      currency_code: variant.calculated_price.currency_code,
      price_type: variant.calculated_price.calculated_price?.price_list_type,
      percentage_diff: getPercentageDiff(
        variant.calculated_price.original_amount,
        variant.calculated_price.calculated_amount,
      ),
    };
  }, []);
};
export const useQuickPricesForVariant = (
  variant?: HttpTypes.StoreProductVariant,
) => {
  const getPricesForVariant = useGetPricesForVariant();
  return getPricesForVariant(variant);
};

export function useProductPrice(variantId?: string) {
  const product = useCurrentProduct();
  const getPricesForVariant = useGetPricesForVariant();
  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null;
    }

    const cheapestVariant = product.variants
      .filter((v) => !!v.calculated_price)
      .filter((v) => (v.calculated_price?.calculated_amount || 0) > 0)
      .sort((a, b) => {
        return (
          a.calculated_price!.calculated_amount! -
          b.calculated_price!.calculated_amount!
        );
      })[0];

    return getPricesForVariant(cheapestVariant);
  };

  const variantPrice = () => {
    if (!product || !variantId) {
      return null;
    }

    const variant = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId,
    );

    if (!variant) {
      return null;
    }

    return getPricesForVariant(variant);
  };

  return {
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  };
}

export function useGetProductById(productId: string): FetchState {
  const product = useAppSelector((state) => state.product[productId]);
  const dispatch = useAppDispatch();
  const region = useRegion();

  useEffect(() => {
    dispatch(getProductThunk({ id: productId, regionId: region?.id })).catch(
      console.warn,
    );
  }, [dispatch, productId, region?.id]);

  return product ?? [undefined, true, undefined];
}