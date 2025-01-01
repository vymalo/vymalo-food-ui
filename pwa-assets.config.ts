import { combinePresetAndAppleSplashScreens, defineConfig, Preset } from '@vite-pwa/assets-generator/config';

const defaultPreset: Preset = {
	transparent: {
		sizes: [64, 192, 512],
		favicons: [[48, 'favicon-48x48.ico'], [64, 'favicon.ico']],
	},
	maskable: {
		sizes: [512],
	},
	apple: {
		sizes: [180],
	},
};

export default defineConfig({
	// injectThemeColor: true,
	images: ['public/vymalo.svg'],
	/* remember to include the preset for favicons and apple touch icon */
	headLinkOptions: {
		preset: '2023',
		basePath: '/assets/',
	},
	preset: combinePresetAndAppleSplashScreens(defaultPreset, {
			padding: 0.3,
			resizeOptions: {
				background: 'white',
				fit: 'contain',
			},
			// by default, dark splash screens are exluded
			// darkResizeOptions: { background: 'black' },
			linkMediaOptions: {
				// will log the links you need to add to your html pages
				log: true,
				// add screen to media attribute link?
				// by default:
				// <link rel="apple-touch-startup-image" href="..." media="screen and ...">
				addMediaScreen: true,
				// add closing link tag?
				// by default:
				// <link rel="apple-touch-startup-image" href="..." media="...">
				// with xhtml enabled:
				// <link rel="apple-touch-startup-image" href="..." media="..." />
				xhtml: false,
			},
			png: {
				compressionLevel: 9,
				quality: 90,
			},
			name: (landscape, size, dark) => {
				return `apple-splash-${landscape ? 'landscape' : 'portrait'}-${typeof dark === 'boolean' ? (dark ? 'dark-' : 'light-') : ''}${size.width}x${size.height}.png`;
			},
		},
	),
});