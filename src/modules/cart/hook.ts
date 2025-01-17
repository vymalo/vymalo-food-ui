import { addItemThunk, createCartThunk, updateCartThunk, UpdateCartThunkArgs, updateItemThunk } from './thunk.ts';
import { convertToLocale } from '@modules/utils.ts';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@modules/store';
import { selectCartItems, selectCartTotalItems } from './selector.ts';
import { HttpTypes } from '@medusajs/types';
import { addShippingMethodThunk } from '@modules/shipment';
import { useRegion } from '@modules/region';

export function useCart() {
  return useAppSelector((state) => state.cart.current);
}

export function useCartTotalItem() {
  return useAppSelector(selectCartTotalItems);
}

export function useCartTotalPrice() {
  const cart = useAppSelector((ro) => ro.cart.current);
  return convertToLocale({
    amount: cart?.total,
    currency_code: cart?.currency_code,
  });
}

interface AddItemArgs {
  cartId: string;
  variantId: string;
  quantity: number;
}

export function useAddItem() {
  const dispatch = useAppDispatch();
  return useCallback(
    async ({ cartId, variantId, quantity }: AddItemArgs) => {
      const res = await dispatch(addItemThunk({ cartId, variantId, quantity }));
      return res.payload;
    },
    [dispatch],
  );
}

export function useCartItems() {
  return useAppSelector(selectCartItems);
}

export function useUpdateCart(): (
  data: UpdateCartThunkArgs,
) => Promise<HttpTypes.StoreCart> {
  const dispatch = useAppDispatch();
  return useCallback(
    async (data: UpdateCartThunkArgs) => {
      const res = await dispatch(updateCartThunk(data));
      return res.payload as HttpTypes.StoreCart;
    },
    [dispatch],
  );
}

export function useGetOrSetCart() {
  const dispatch = useAppDispatch();
  const region = useRegion();
  const currentCard = useAppSelector((state) => state.cart.current);
  const updateCart = useUpdateCart();

  return useCallback(async () => {
    if (!currentCard) {
      const res = await dispatch(
        createCartThunk({ data: { region_id: region?.id } }),
      );
      return res.payload as typeof currentCard;
    }

    if (currentCard && currentCard.region_id !== region?.id) {
      return await updateCart({
        cartId: currentCard.id,
        data: { region_id: region?.id },
      });
    }

    return currentCard;
  }, [currentCard, dispatch, region?.id, updateCart]);
}

interface UpdateLineItemArgs {
  lineId: string;
  quantity: number;
}

export function useUpdateLineItem() {
  const dispatch = useAppDispatch();
  const getOrSetCart = useGetOrSetCart();

  return useCallback(
    async ({ lineId, quantity }: UpdateLineItemArgs) => {
      const cart = await getOrSetCart();

      if (!cart) {
        throw new Error('missing_cart_id');
      }

      if (!lineId) {
        throw new Error('missing_product_lineId');
      }

      if (!lineId) {
        throw new Error('missing_lineItem_id');
      }

      try {
        await dispatch(updateItemThunk({ cartId: cart.id, lineId, quantity }));
      } catch (e) {
        console.error(e);
        throw new Error('error_updating_item_in_cart');
      }
    },
    [dispatch, getOrSetCart],
  );
}

export function useAddShippingMethod() {
  const dispatch = useAppDispatch();
  const getOrSetCart = useGetOrSetCart();
  return useCallback(
    async ({ shippingMethodId }: { shippingMethodId: string }) => {
      const cart = await getOrSetCart();
      if (!cart) {
        throw new Error('missing_cart_id');
      }

      const res = await dispatch(
        addShippingMethodThunk({
          cartId: cart.id,
          shippingMethodId,
        }),
      );
      return res.payload;
    },
    [dispatch, getOrSetCart],
  );
}