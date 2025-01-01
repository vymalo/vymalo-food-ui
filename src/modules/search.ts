import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { getProjectEnvVariables } from '../project-env-variables';

const { envVariables } = getProjectEnvVariables();

export const { searchClient } = instantMeiliSearch(
	envVariables.VITE_MEILISEARCH_HOST,
	envVariables.VITE_MEILISEARCH_API_KEY,
	{
		httpClient: (input, init) => fetch(input, init),
	},
);
