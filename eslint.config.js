import tseslint from 'typescript-eslint';
import eslintJs from '@eslint/js';

export default tseslint.config(
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
	},

	eslintJs.configs.recommended,

	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: './packages/*/tsconfig.lint.json',
				tsconfigRootDir: import.meta.dirname,
			},
		},
		extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
	},
);
