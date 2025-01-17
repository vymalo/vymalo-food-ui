import { AppImage } from '@components/image';
import { useMemo } from 'react';
import { convertToLocale } from 'src/modules/utils';
import { useGetPricesForVariant } from '@modules/products';
import { useCart } from '@modules/cart';

export function CheckoutProductList() {
  const getPricesForVariant = useGetPricesForVariant();
  const cart = useCart();
  const lineItems = useMemo(() => cart?.items ?? [], [cart?.items]);

  return (
    <>
      <div
        className="min-h-full w-4/5 bg-primary px-4 py-8 text-primary-content max-md:pt-16 lg:!fixed lg:!bottom-0 lg:!right-0 lg:!top-0 lg:z-[90] lg:!w-[50vw] lg:px-16">
        <dl>
          <dt className="text-sm font-medium opacity-50">Amount due</dt>
          <dd className="mt-1 text-3xl font-bold tracking-tight">
            {convertToLocale({
              amount: cart?.total ?? 0,
              currency_code: cart?.currency_code,
            })}
          </dd>
        </dl>

        <ul
          role="list"
          className="divide-y divide-white divide-opacity-10 text-sm font-medium">
          {lineItems.map((lineItem) => (
            <li key={lineItem.id} className="flex items-center space-x-4 py-6">
              <AppImage
                alt={lineItem.title}
                src={lineItem.thumbnail ?? '/vymalo.svg'}
                className="h-20 w-20 flex-none rounded-md object-cover object-center"
              />
              <div className="flex-auto space-y-1">
                <h3 className="text-primary-content">
                  {lineItem.variant?.product?.title}
                </h3>
                <p className="text-primary-content text-opacity-60">
                  {lineItem.variant?.title} x {lineItem.quantity}
                </p>
              </div>
              <p className="flex-none text-base font-medium text-primary-content">
                {getPricesForVariant(lineItem.variant)?.calculated_price}
              </p>
            </li>
          ))}
        </ul>

        <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
          <div className="flex items-center justify-between">
            <dt>Subtotal</dt>
            <dd>
              {convertToLocale({
                amount: cart?.subtotal ?? 0,
                currency_code: cart?.currency_code,
              })}
            </dd>
          </div>

          <div className="flex items-center justify-between">
            <dt>Shipping</dt>
            <dd>
              {convertToLocale({
                amount: cart?.shipping_total ?? 0,
                currency_code: cart?.currency_code,
              })}
            </dd>
          </div>

          <div
            className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-primary-content">
            <dt className="text-2xl">Total</dt>
            <dd className="text-2xl">
              {convertToLocale({
                amount: cart?.total ?? 0,
                currency_code: cart?.currency_code,
              })}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
