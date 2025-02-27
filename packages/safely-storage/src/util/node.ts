import type { Rule } from 'eslint';
import type * as ESTree from 'estree';

export const wrappedTry = (node: ESTree.Node & Rule.NodeParentExtension): boolean => {
	const { parent } = node;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (parent === null) {
		return false;
	}

	if (parent.type === 'TryStatement') {
		return true;
	}

	return wrappedTry(parent);
};
