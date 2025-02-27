import { RuleTester } from 'eslint';
import rule from './tryCatch.js';

const ruleTester = new RuleTester();

const messageSessionStorage = 'Access to `sessionStorage` can cause an exception, so be sure to use it with try...catch';
const messageLocalStorage = 'Access to `localStorage` can cause an exception, so be sure to use it with try...catch';

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
					message: messageSessionStorage,
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
					message: messageLocalStorage,
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
					message: messageSessionStorage,
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
					message: messageLocalStorage,
				},
			],
		},
	],
});
