"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (contentState, anchorKey, focusKey) {
  var isSameBlock = anchorKey === focusKey;
  var startingBlock = contentState.getBlockForKey(anchorKey);

  if (!startingBlock) {
    return [];
  }

  var selectedBlocks = [startingBlock];

  if (!isSameBlock) {
    var blockKey = anchorKey;

    while (blockKey !== focusKey) {
      var nextBlock = contentState.getBlockAfter(blockKey);

      if (!nextBlock) {
        selectedBlocks = [];
        break;
      }

      selectedBlocks.push(nextBlock);
      blockKey = nextBlock.getKey();
    }
  }

  return selectedBlocks;
};