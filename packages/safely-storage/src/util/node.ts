import type { Rule } from 'eslint';

export const wrappedTry = (node: Rule.Node): boolean => {
	const { parent } = node;

	if (parent === null) {
		return false;
	}

	if (parent.type === 'TryStatement') {
		return true;
	}

	return wrappedTry(parent);
};
