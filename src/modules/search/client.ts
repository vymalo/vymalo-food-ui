import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { getProjectEnvVariables } from '@modules/env';

const { envVariables } = getProjectEnvVariables();

export const { searchClient } = instantMeiliSearch(
  envVariables.VITE_MEILISEARCH_HOST,
  envVariables.VITE_MEILISEARCH_API_KEY,
  {
    httpClient: (input, init) => fetch(input, init),
  },
);
