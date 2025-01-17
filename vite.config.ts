import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { Buffer } from 'buffer';
import { defineConfig } from 'vite';
import bundlesize from 'vite-plugin-bundlesize';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { VitePWA } from 'vite-plugin-pwa';
import { robots } from 'vite-plugin-robots';
import tsconfigPaths from 'vite-tsconfig-paths';

const base64Encode = (plaintext: string): string => {
  return Buffer.from(plaintext).toString('base64');
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    bundlesize({
      limits: [
        {
          name: '**/*.js',
          limit: 500_000,
        },
      ],
    }),
    tsconfigPaths(),
    ViteMinifyPlugin({
    }),
    legacy({
      targets: ['defaults'],
      modernPolyfills: true,
    }),
    robots(),
    webUpdateNotice({
      logVersion: true,
      versionType: 'build_timestamp',
      hiddenDefaultNotification: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Your Food tracker | Food',
        description: 'Your Food tracker',
        short_name: 'Food',
        theme_color: '#00a49a',
        background_color: '#100e13',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
      },
      pwaAssets: {
        injectThemeColor: true,
        config: true,
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5_000_000,
      },
    }),
  ],
  server: {
    port: 23001,
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1_500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (/project-env-variables.ts/.test(id)) {
            return 'project-env-variables';
          }

          if (id.includes('node_modules')) {
            const cleanName = id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
            return cleanName + '~' + base64Encode(cleanName);
          }
        },
        chunkFileNames: 'assets/chunks/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
      },
    },
  },
});
