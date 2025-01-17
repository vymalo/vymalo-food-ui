import { ProductOption } from './product-option.tsx';
import { ProductPrice } from './product-price.tsx';
import { isEqual } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Button, Loading } from 'react-daisyui';
import { ShoppingBag } from 'react-feather';
import { Link } from 'react-router-dom';
import { useAddToCart, useCurrentProduct } from '@modules/products';

export function ProductVariant() {
  const product = useCurrentProduct();
  const addToCart = useAddToCart();
  const [options, setOptions] = useState<Record<string, string>>({});
  const [isAdding, setIsAdding] = useState(false);

  const variants = product.variants;

  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {};

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined });
    }

    setOptions(optionObj);
  }, [product]);

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};

    for (const variant of variants ?? []) {
      if (!variant.options || !variant.id) continue;

      const temp: Record<string, string> = {};

      for (const option of variant.options) {
        temp[option.option_id!] = option.value;
      }

      map[variant.id] = temp;
    }

    return map;
  }, [variants]);

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined;

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key;
      }
    }

    return variants?.find((v) => v.id === variantId);
  }, [options, variantRecord, variants]);

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants?.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id]);
    }
  }, [variants, variantRecord]);

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update });
  };

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (variant && !variant.inventory_quantity) {
      return false;
    }

    if (variant && variant.allow_backorder === false) {
      return true;
    }
  }, [variant]);

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variant?.id) return null;

    setIsAdding(true);

    await addToCart({
      variantId: variant.id,
      quantity: 1,
    });

    setIsAdding(false);
  };

  return (
    <div
      className="flex flex-col gap-y-4 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:rounded-t-2xl max-sm:border-t-2 max-sm:bg-base-200 max-sm:p-4 md:gap-y-4">
      <ProductPrice variant={variant} />

      <div>
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-3">
            {(product.options || []).map((option) => (
              <div key={option.id}>
                <ProductOption
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  title={option.title}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-row gap-2 md:flex-col">
        <Button
          onClick={handleAddToCart}
          className="basis-1/2"
          disabled={isAdding || !inStock || !variant}
          color="primary">
          {isAdding && <Loading />}
          {!variant
            ? 'Select variant'
            : !inStock
              ? 'Out of stock'
              : 'Add to cart'}
        </Button>

        <Link to="/checkout" className="btn btn-ghost btn-outline basis-1/2">
          <span>Checkout</span>
          <ShoppingBag />
        </Link>
      </div>
    </div>
  );
}
