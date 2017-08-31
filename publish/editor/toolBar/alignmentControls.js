"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styleButton = require("./styleButton");

var _styleButton2 = _interopRequireDefault(_styleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlignmentControls = function AlignmentControls(props) {
  var editorState = props.editorState,
      lang = props.lang;

  var selection = editorState.getSelection();
  var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  var BLOCK_TYPES = [{
    text: lang.alignLeft,
    label: "editor_alignment_left",
    style: 'left'
  }, {
    text: lang.alignCenter,
    label: "editor_alignment_center",
    style: 'center'
  }, {
    text: lang.alignRight,
    label: "editor_alignment_right",
    style: 'right'
  }, {
    text: lang.alignJustify,
    label: "editor_alignment_justify",
    style: 'justify'
  }];
  return _react2.default.createElement(
    "div",
    { className: "RichEditor-controls" },
    BLOCK_TYPES.map(function (type, i) {
      var button = _react2.default.createElement(_styleButton2.default, {
        key: type.style,
        text: type.text,
        active: type.style === blockType,
        label: type.label,
        onToggle: props.onToggle,
        style: type.style });
      return button;
    })
  );
};
module.exports = AlignmentControls;