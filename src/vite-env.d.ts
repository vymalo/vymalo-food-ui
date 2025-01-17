/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEDUSA_SERVER_URL: string;
  readonly VITE_MEDUSA_PUBLISHABLE_KEY: string;
  readonly VITE_MEILISEARCH_HOST: string;
  readonly VITE_MEILISEARCH_API_KEY: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_IMAGE_SHARPENER_URL: string;
  readonly VITE_SERVICE_NAME: string;
  readonly VITE_SERVICE_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
