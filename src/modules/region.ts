import { medusaClient } from '../medusa';

export async function listRegions() {
	const regions = await medusaClient.store.region
		.list()
		.then(({ regions }) => regions)
		.catch((err) => {
			throw err;
		});

	return { regions };
}