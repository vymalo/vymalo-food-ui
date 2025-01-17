import { getMedusaHeaders, medusaClient } from '@modules/medusa';

export async function getProduct(id: string, regionId?: string) {
  const headers = await getMedusaHeaders();
  const region = regionId ? `region_id=${regionId}` : '';

  const product = await medusaClient.store.product
    .retrieve(
      `${id}?${region}`,
      {
        fields:
          'id,*variants,*variants.calculated_price,*variants.inventory_quantity',
      },
      headers,
    )
    .then(({ product }) => product)
    .catch((err) => {
      throw err;
    });

  if (!product) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return product;
}
