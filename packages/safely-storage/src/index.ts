import fs from 'node:fs';
import type { ESLint } from 'eslint';
import ruleTryCatch from './rules/tryCatch.js';

interface PackageJson {
	name: string;
	version: string;
}

const { name, version } = JSON.parse((await fs.promises.readFile('./package.json')).toString()) as PackageJson;

const plugin: ESLint.Plugin = {
	meta: {
		name: name,
		version: version,
	},
	configs: {},
	rules: {
		'try-catch': ruleTryCatch,
	},
};

const configs: ESLint.Plugin['configs'] = {
	default: [
		{
			plugins: {
				'eslint-plugin-safely-storage': plugin,
			},
			rules: {
				'eslint-plugin-safely-storage/try-catch': 'error',
			},
		},
	],
};

Object.assign(plugin.configs!, configs);

export default plugin;
