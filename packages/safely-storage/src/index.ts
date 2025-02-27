import fs from 'node:fs';
import type { ESLint, Linter } from 'eslint';
import ruleTryCatch from './rules/tryCatch.js';

interface PackageJson {
	name: string;
	version: string;
}

type PluginConfigs = Record<string, Linter.Config[]>;

const { name, version } = JSON.parse((await fs.promises.readFile('./package.json')).toString()) as PackageJson;

const plugin: Omit<ESLint.Plugin, 'configs'> & { configs: PluginConfigs } = {
	meta: {
		name: name,
		version: version,
	},
	configs: {},
	rules: {
		'try-catch': ruleTryCatch,
	},
};

const configs: PluginConfigs = {
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

Object.assign(plugin.configs, configs);

export default plugin;
