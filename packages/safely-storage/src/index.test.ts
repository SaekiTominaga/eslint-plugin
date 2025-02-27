import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import plugin from './index.js';

await test('read package.json', () => {
	assert.equal(plugin.meta?.name, 'eslint-plugin-safely-storage');
	assert.equal(plugin.meta.version !== undefined && /[0-9]+\.[0-9]+\.[0-9]+/.test(plugin.meta.version), true);
});
