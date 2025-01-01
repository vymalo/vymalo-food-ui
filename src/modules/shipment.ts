import { getMedusaHeaders } from './medusa';
import { medusaClient } from '../medusa';

export async function listShippingMethods(
	regionId: string,
	productIds?: string[],
) {
	const headers = await getMedusaHeaders();

	const product_ids = productIds?.join(',');

	return medusaClient.store.shippingOptions
		.list(
			{
				region_id: regionId,
				product_ids,
			},
			headers,
		)
		.then(({ shipping_options }) => shipping_options);
}

export async function addShippingMethod({
																					cartId,
																					shippingMethodId,
																				}: {
	cartId: string;
	shippingMethodId: string;
}) {
	const headers = getMedusaHeaders();

	return medusaClient.carts
		.addShippingMethod(cartId, { option_id: shippingMethodId }, headers)
		.then(({ cart }) => cart);
}