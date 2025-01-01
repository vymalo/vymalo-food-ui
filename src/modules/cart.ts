import { medusaClient } from '../medusa';
import { getMedusaHeaders } from './medusa';
import { HttpTypes } from '@medusajs/types';

export async function addItem({
	cartId,
	variantId,
	quantity,
}: {
	cartId: string;
	variantId: string;
	quantity: number;
}) {
	const headers = await getMedusaHeaders();

	return await medusaClient.store.cart
		.createLineItem(cartId, { variant_id: variantId, quantity }, headers)
		.then(({ cart }) => cart);
}

export async function updateItem({
	cartId,
	lineId,
	quantity,
}: {
	cartId: string;
	lineId: string;
	quantity: number;
}) {
	const headers = await getMedusaHeaders();

	return medusaClient.store.cart
		.updateLineItem(cartId, lineId, { quantity }, headers)
		.then(({ cart }) => cart);
}

export async function getCart(cartId: string) {
	const headers = await getMedusaHeaders();
	return medusaClient.store.cart
		.retrieve(cartId, headers)
		.then(({ cart }) => cart)
		.catch(() => null);
}

export async function createCart(data = {}) {
	const headers = await getMedusaHeaders();
	return medusaClient.store.cart
		.create(data, headers)
		.then(({ cart }) => cart)
		.catch((err) => {
			console.error(err);
			return undefined;
		});
}

export async function updateCart(
	cartId: string,
	data: HttpTypes.StoreUpdateCart,
) {
	const headers = await getMedusaHeaders();

	return medusaClient.store.cart
		.update(cartId, data, headers)
		.then(({ cart }) => cart);
}
