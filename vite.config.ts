import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import { robots } from 'vite-plugin-robots';

import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import legacy from '@vitejs/plugin-legacy';
import { Buffer } from "buffer";

const base64Encode = (plaintext: string): string => {
	return Buffer.from(plaintext).toString('base64');
};

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		ViteMinifyPlugin({}),
		legacy({
			targets: ['defaults'],
		}),
		robots(),
		webUpdateNotice({
			logVersion: true,
			versionType: 'build_timestamp',
			hiddenDefaultNotification: true,
		}),
		VitePWA({
			minify: true,
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			manifest: {
				name: 'Your E-Store | Vymalo',
				description: 'Your E-Focused Store',
				short_name: 'Vymalo',
				theme_color: '#00a49a',
				background_color: '#100e13',
				display: 'standalone',
				orientation: 'portrait',
				scope: '/',
				start_url: '/',
			},
			includeAssets: ['assets/**/*', '*.{svg,png,jpg,jpeg,webp,avif}'],
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
		chunkSizeWarningLimit: 1_600,
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
						return base64Encode(cleanName);
					}
				},
				chunkFileNames: 'assets/chunks/[name]-[hash].js',
				assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
			},
		},
	},
});
