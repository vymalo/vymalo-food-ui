type ProjectEnvVariablesType = Pick<ImportMetaEnv, 'VITE_MEDUSA_PUBLISHABLE_KEY' | 'VITE_MEILISEARCH_HOST' | 'VITE_MEILISEARCH_API_KEY' | 'VITE_SENTRY_DSN' | 'VITE_MEDUSA_SERVER_URL' | 'VITE_IMAGE_SHARPENER_URL'>


// Environment Variable Template to Be Replaced at Runtime
const projectEnvVariables: ProjectEnvVariablesType = {
	VITE_MEDUSA_PUBLISHABLE_KEY: '${VITE_MEDUSA_PUBLISHABLE_KEY}',
	VITE_MEILISEARCH_HOST: '${VITE_MEILISEARCH_HOST}',
	VITE_MEILISEARCH_API_KEY: '${VITE_MEILISEARCH_API_KEY}',
	VITE_SENTRY_DSN: '${VITE_SENTRY_DSN}',
	VITE_MEDUSA_SERVER_URL: '${VITE_MEDUSA_SERVER_URL}',
	VITE_IMAGE_SHARPENER_URL: '${VITE_IMAGE_SHARPENER_URL}',
};

interface ProjectEnvVariables {
	envVariables: ProjectEnvVariablesType;
}

// Returning the variable value from runtime or obtained as a result of the build
export const getProjectEnvVariables = (): ProjectEnvVariables => {
	return {
		envVariables: {
			VITE_MEDUSA_PUBLISHABLE_KEY: !projectEnvVariables.VITE_MEDUSA_PUBLISHABLE_KEY.includes('VITE_')
				? projectEnvVariables.VITE_MEDUSA_PUBLISHABLE_KEY
				: import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY,
			VITE_MEILISEARCH_HOST: !projectEnvVariables.VITE_MEILISEARCH_HOST.includes('VITE_')
				? projectEnvVariables.VITE_MEILISEARCH_HOST
				: import.meta.env.VITE_MEILISEARCH_HOST,
			VITE_MEILISEARCH_API_KEY: !projectEnvVariables.VITE_MEILISEARCH_API_KEY.includes('VITE_')
				? projectEnvVariables.VITE_MEILISEARCH_API_KEY
				: import.meta.env.VITE_MEILISEARCH_API_KEY,
			VITE_SENTRY_DSN: !projectEnvVariables.VITE_SENTRY_DSN.includes('VITE_')
				? projectEnvVariables.VITE_SENTRY_DSN
				: import.meta.env.VITE_SENTRY_DSN,
			VITE_MEDUSA_SERVER_URL: !projectEnvVariables.VITE_MEDUSA_SERVER_URL.includes('VITE_')
				? projectEnvVariables.VITE_MEDUSA_SERVER_URL
				: import.meta.env.VITE_MEDUSA_SERVER_URL,
			VITE_IMAGE_SHARPENER_URL: !projectEnvVariables.VITE_IMAGE_SHARPENER_URL.includes('VITE_')
				? projectEnvVariables.VITE_IMAGE_SHARPENER_URL
				: import.meta.env.VITE_IMAGE_SHARPENER_URL,
		},
	};
};