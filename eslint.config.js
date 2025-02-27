// @ts-check

import w0sConfig from '@w0s/eslint-config';

/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
export default [
	...w0sConfig,
	{
		ignores: ['packages/*/dist'],
	},
	{
		files: ['packages/*/src/index.ts'],
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off', // plugin.configs
		},
	},
];
