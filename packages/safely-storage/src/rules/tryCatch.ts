import type { Rule } from 'eslint';
import { wrappedTry } from '../util/node.ts';

const rule: Rule.RuleModule = {
	meta: {
		type: 'suggestion',
		messages: {
			sessionStorage: 'Access to `sessionStorage` can cause an exception, so be sure to use it with try...catch',
			localStorage: 'Access to `localStorage` can cause an exception, so be sure to use it with try...catch',
		},
	},
	create(context) {
		return {
			Identifier(node) {
				switch (node.name) {
					case 'sessionStorage': {
						if (!wrappedTry(node)) {
							context.report({
								node: node,
								messageId: 'sessionStorage',
							});
						}

						break;
					}
					case 'localStorage': {
						if (!wrappedTry(node)) {
							context.report({
								node: node,
								messageId: 'localStorage',
							});
						}

						break;
					}
					default:
				}
			},
		};
	},
};

export default rule;
