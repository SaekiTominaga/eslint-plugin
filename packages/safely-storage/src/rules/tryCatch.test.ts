import { RuleTester } from 'eslint';
import rule from './tryCatch.ts';

const ruleTester = new RuleTester();

ruleTester.run('storage-try-catch', rule, {
	valid: [
		{
			name: 'Parent try',
			code: `
try {
	sessionStorage.setItem('key', 'value');
} catch {
}
`,
		},
		{
			name: 'Ancestor try',
			code: `
try {
	const func = () => {
		localStorage.setItem('key', 'value');
	}
} catch {
}
`,
		},
		{
			name: 'Assign to variable',
			code: `
let mySessionStorage;
try {
	mySessionStorage = sessionStorage;
} catch {
}

mySessionStorage?.setItem('key', 'value');
`,
		},
	],
	invalid: [
		{
			name: 'Property only',
			code: `
sessionStorage;
`,
			errors: [
				{
					message: rule.meta?.messages?.['sessionStorage']!,
				},
			],
		},
		{
			name: 'Method',
			code: `
localStorage.setItem('key', 'value');
`,
			errors: [
				{
					message: rule.meta?.messages?.['localStorage']!,
				},
			],
		},
		{
			name: 'Assign to variable (AssignmentExpression)',
			code: `
const mySessionStorage = sessionStorage;
`,
			errors: [
				{
					message: rule.meta?.messages?.['sessionStorage']!,
				},
			],
		},
		{
			name: 'Assign to variable (VariableDeclarator)',
			code: `
let myLocalStorage;
myLocalStorage = localStorage;
`,
			errors: [
				{
					message: rule.meta?.messages?.['localStorage']!,
				},
			],
		},
	],
});
