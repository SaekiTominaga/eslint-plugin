// @ts-check

import w0sConfig from '@w0s/eslint-config';

/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
export default [
	...w0sConfig,
	{
		ignores: ['packages/*/dist'],
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				project: './packages/*/tsconfig.lint.json',
			},
		},
	},
	{
		files: ['packages/safely-storage/src/rules/tryCatch.ts'],
		rules: {
			'safely-storage/try-catch': 'off',
		},
	},
];
