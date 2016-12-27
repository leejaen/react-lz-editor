const getCurrentlySelectedBlock = (editorState) => {
	const selection = editorState.getSelection();
	const startKey = selection.getStartKey();
	let endKey = selection.getEndKey();
	const content = editorState.getCurrentContent();
	let target = selection;

	// Triple-click can lead to a selection that includes offset 0 of the
	// following block. The `SelectionState` for this case is accurate, but
	// we should avoid toggling block type for the trailing block because it
	// is a confusing interaction.
	if (startKey !== endKey && selection.getEndOffset() === 0) {
		const blockBefore = content.getBlockBefore(endKey);
		if (!blockBefore) {
			throw new Error('Got unexpected null or undefined');
		}

		endKey = blockBefore.getKey();
		target = target.merge({
			anchorKey: startKey,
			anchorOffset: selection.getStartOffset(),
			focusKey: endKey,
			focusOffset: blockBefore.getLength(),
			isBackward: false
		});
	}

	const hasAtomicBlock = content.getBlockMap()
		.skipWhile((_, k) => k !== startKey)
		.takeWhile((_, k) => k !== endKey)
		.some(v => v.getType() === 'atomic');

	const currentBlock = content.getBlockForKey(startKey);

	return {
		content,
		currentBlock,
		hasAtomicBlock,
		target
	};
};

export default getCurrentlySelectedBlock;