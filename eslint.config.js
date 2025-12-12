import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default defineConfig(
	eslint.configs.recommended,

	{
		files: ['**/*.ts'],
		extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
	},
	{
		files: ['packages/**/*.ts'],
		languageOptions: {
			parserOptions: {
				project: 'packages/*/tsconfig.lint.json',
			},
		},
	},
	{
		files: ['**/*.test.ts'],
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
		},
	},
);
