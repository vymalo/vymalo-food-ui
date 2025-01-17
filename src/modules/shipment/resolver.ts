import { HttpTypes } from '@medusajs/types';
import { getMedusaHeaders, medusaClient } from '@modules/medusa';

export async function listShippingMethods(cartId: string) {
  const headers = await getMedusaHeaders();

  return medusaClient.client
    .fetch<HttpTypes.StoreShippingOptionListResponse>(
      `/store/shipping-options`,
      {
        method: 'GET',
        query: { cart_id: cartId },
        headers,
        cache: 'force-cache',
      },
    )
    .then(({ shipping_options }) => shipping_options)
    .catch(() => []);
}

export async function addShippingMethod({
                                          cartId,
                                          shippingMethodId,
                                        }: {
  cartId: string;
  shippingMethodId: string;
}) {
  const headers = await getMedusaHeaders();

  return medusaClient.store.cart
    .addShippingMethod(cartId, { option_id: shippingMethodId }, headers)
    .then(({ cart }) => cart);
}
