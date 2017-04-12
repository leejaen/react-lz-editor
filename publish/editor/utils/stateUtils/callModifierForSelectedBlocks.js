'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _getSelectedBlocks = require('./getSelectedBlocks');

var _getSelectedBlocks2 = _interopRequireDefault(_getSelectedBlocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (editorState, modifier) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var contentState = editorState.getCurrentContent();
  var currentSelection = editorState.getSelection();

  var startKey = currentSelection.getStartKey();
  var endKey = currentSelection.getEndKey();
  var startOffset = currentSelection.getStartOffset();
  var endOffset = currentSelection.getEndOffset();

  var isSameBlock = startKey === endKey;
  var selectedBlocks = (0, _getSelectedBlocks2.default)(contentState, startKey, endKey);

  var finalEditorState = editorState;
  selectedBlocks.forEach(function (block) {
    var currentBlockKey = block.getKey();
    var selectionStart = startOffset;
    var selectionEnd = endOffset;

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

    var selection = new _draftJs.SelectionState({
      anchorKey: currentBlockKey,
      anchorOffset: selectionStart,
      focusKey: currentBlockKey,
      focusOffset: selectionEnd
    });

    finalEditorState = modifier.apply(undefined, [finalEditorState, selection].concat(args));
  });

  return _draftJs.EditorState.forceSelection(finalEditorState, currentSelection);
};