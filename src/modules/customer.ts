import { medusaClient } from '../medusa';
import { getMedusaHeaders } from './medusa';

export async function getCustomer() {
	const headers = await getMedusaHeaders();

	return medusaClient.store.customer
		.retrieve(headers)
		.then(({ customer }) => customer);
}