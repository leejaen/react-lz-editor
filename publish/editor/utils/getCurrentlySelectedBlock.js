'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var getCurrentlySelectedBlock = function getCurrentlySelectedBlock(editorState) {
	var selection = editorState.getSelection();
	var startKey = selection.getStartKey();
	var endKey = selection.getEndKey();
	var content = editorState.getCurrentContent();
	var target = selection;

	// Triple-click can lead to a selection that includes offset 0 of the
	// following block. The `SelectionState` for this case is accurate, but
	// we should avoid toggling block type for the trailing block because it
	// is a confusing interaction.
	if (startKey !== endKey && selection.getEndOffset() === 0) {
		var blockBefore = content.getBlockBefore(endKey);
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

	var hasAtomicBlock = content.getBlockMap().skipWhile(function (_, k) {
		return k !== startKey;
	}).takeWhile(function (_, k) {
		return k !== endKey;
	}).some(function (v) {
		return v.getType() === 'atomic';
	});

	var currentBlock = content.getBlockForKey(startKey);

	return {
		content: content,
		currentBlock: currentBlock,
		hasAtomicBlock: hasAtomicBlock,
		target: target
	};
};

exports.default = getCurrentlySelectedBlock;