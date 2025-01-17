import js from '@eslint/js';
import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import storybook from 'eslint-plugin-storybook';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      '.idea',
      'public',
      'storybook-static',
      'docs',
      '.github',
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      eslintConfigPrettier,
      sonarjs.configs.recommended,
      reactRefresh.configs.recommended,
    ],
    ignores: ['node_modules', 'dist', 'public'],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      // https://github.com/facebook/react/issues/28313#issuecomment-2530821315
      'react-hooks': reactHooks,
      // https://github.com/facebook/react/issues/28313#issuecomment-2530821315
      storybook,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // https://github.com/facebook/react/issues/28313#issuecomment-2530821315
      ...reactHooks.configs.recommended.rules,
      // https://github.com/facebook/react/issues/28313#issuecomment-2530821315
      ...storybook.configs.recommended.rules,
    },
  },
);