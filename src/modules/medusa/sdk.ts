import Medusa from '@medusajs/js-sdk';
import { getProjectEnvVariables } from '@modules/env';

const { envVariables } = getProjectEnvVariables();

const medusaClient = new Medusa({
  baseUrl: envVariables.VITE_MEDUSA_SERVER_URL,
  debug: import.meta.env.DEV,
  auth: {
    type: 'session',
  },
  publishableKey: envVariables.VITE_MEDUSA_PUBLISHABLE_KEY,
});

export { medusaClient };
