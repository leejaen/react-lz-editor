import getSelectedBlocks from './getSelectedBlocks';

export default (strategy) => (editorState, selection) => {
  const contentState = editorState.getCurrentContent();
  const currentSelection = selection || editorState.getSelection();
  const startKey = currentSelection.getStartKey();
  const endKey = currentSelection.getEndKey();
  const startOffset = currentSelection.getStartOffset();
  const endOffset = currentSelection.getEndOffset();

  const isSameBlock = startKey === endKey;
  const selectedBlocks = getSelectedBlocks(contentState, startKey, endKey);
  let entityFound = false;

  // We have to shift the offset to not get false positives when selecting
  // a character just before or after an entity
  const finalStartOffset = startOffset + 1;
  const finalEndOffset = endOffset - 1;

  selectedBlocks.forEach((block) => {
    strategy(
      block,
      (start, end) => {
        if (entityFound) {
          return;
        }

        const blockKey = block.getKey();

        if (isSameBlock && (end < finalStartOffset || start > finalEndOffset)) {
          return;
        } else if (blockKey === startKey && end < finalStartOffset) {
          return;
        } else if (blockKey === endKey && start > finalEndOffset) {
          return;
        }

        entityFound = true;
      }
    );
  });

  return entityFound;
};
