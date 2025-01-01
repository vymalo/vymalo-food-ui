import Medusa from '@medusajs/js-sdk';
import { getProjectEnvVariables } from './project-env-variables';

const { envVariables } = getProjectEnvVariables();

const medusaClient = new Medusa({
	baseUrl: envVariables.VITE_MEDUSA_SERVER_URL! as string,
	debug: import.meta.env.DEV,
	auth: {
		type: 'session',
	},
	publishableKey: envVariables.VITE_MEDUSA_PUBLISHABLE_KEY! as string,
});

export { medusaClient };
