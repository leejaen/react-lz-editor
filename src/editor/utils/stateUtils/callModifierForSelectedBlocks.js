import {EditorState, SelectionState} from 'draft-js';

import getSelectedBlocks from './getSelectedBlocks';

/**
 * Calls a provided `modifier` function with a selection for each
 * selected block in the current editor selection. Passes through additional
 * arguments to the modifier.
 *
 * Note: At the moment it will retain the original selection and override
 * possible selection changes from modifiers
 *
 * @param  {object} editorState The current draft.js editor state object
 *
 * @param  {function} modifier  A modifier function to be executed.
 *                              Must have the signature (editorState, selection, ...)
 *
 * @param  {mixed} ...args      Additional arguments to be passed through to the modifier
 *
 * @return {object} The new editor state
 */
export default (editorState, modifier, ...args) => {
  const contentState = editorState.getCurrentContent();
  const currentSelection = editorState.getSelection();

  const startKey = currentSelection.getStartKey();
  const endKey = currentSelection.getEndKey();
  const startOffset = currentSelection.getStartOffset();
  const endOffset = currentSelection.getEndOffset();

  const isSameBlock = startKey === endKey;
  const selectedBlocks = getSelectedBlocks(contentState, startKey, endKey);

  let finalEditorState = editorState;
  selectedBlocks.forEach((block) => {
    const currentBlockKey = block.getKey();
    let selectionStart = startOffset;
    let selectionEnd = endOffset;

    if (currentBlockKey === startKey) {
      selectionStart = startOffset;
      selectionEnd = isSameBlock ? endOffset : block.getText().length;
    } else if (currentBlockKey === endKey) {
      selectionStart = isSameBlock ? startOffset : 0;
      selectionEnd = endOffset;
    } else {
      selectionStart = 0;
      selectionEnd = block.getText().length;
    }

    const selection = new SelectionState({
      anchorKey: currentBlockKey,
      anchorOffset: selectionStart,
      focusKey: currentBlockKey,
      focusOffset: selectionEnd,
    });

    finalEditorState = modifier(finalEditorState, selection, ...args);
  });

  return EditorState.forceSelection(finalEditorState, currentSelection);
};
