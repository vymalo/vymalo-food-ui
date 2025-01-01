import themes from 'daisyui/src/theming/themes';
import { fontFamily } from 'tailwindcss/defaultTheme';

const coreVymaloTheme = {
	'primary': '#00a49a',
	'secondary': '#00d500',
	'accent': '#ff5d6e',
	'neutral': '#100e13',
	'info': '#0082f7',
	'success': '#4ad800',
	'warning': '#f7a100',
	'error': '#ff2100',
};

module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/daisyui/dist/**/*.js',
		'node_modules/react-daisyui/dist/**/*.js',
	],
	theme: {
		extend: {
			fontSize: {
				'3xl': '2rem',
			},
			fontFamily: {
				sans: ['Louis George Cafe', ...fontFamily.sans],
				serif: ['Louis George Cafe', ...fontFamily.serif],
				mono: ['Louis George Cafe', ...fontFamily.mono],
			},
		},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('tailwind-extended-shadows'),
		require('@tailwindcss/typography'),
		require('tailwindcss-radix')(),
		require('@tailwindcss/forms')({ strategy: 'class' }),
		require('daisyui'),
	],
	daisyui: {
		themes: [
			{
				'vymalo-light': {
					...themes.lemonade,
					...coreVymaloTheme,
				},
			},
			{
				'vymalo-dark': {
					...themes.forest,
					...coreVymaloTheme,
				},
			},
		],
	},
	darkMode: ['class', '[data-theme="vymalo-dark"]'],
};

