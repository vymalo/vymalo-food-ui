import { medusaClient } from '../medusa';
import { getMedusaHeaders } from './medusa';
import { HttpTypes } from '@medusajs/types';

export async function createPaymentSessions(
	cart: HttpTypes.StoreCart,
	provider_id: string,
) {
	const headers = await getMedusaHeaders();

	return medusaClient.store.payment
		.initiatePaymentSession(
			cart,
			{
				provider_id,
			},
			headers,
		)
		.then(() =>
			medusaClient.store.cart.retrieve(cart.id, {
				fields: 'payment_sessions',
			}),
		);
}
