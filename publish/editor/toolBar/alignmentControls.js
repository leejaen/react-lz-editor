"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styleButton = require("./styleButton");

var _styleButton2 = _interopRequireDefault(_styleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlignmentControls = function AlignmentControls(props) {
  var editorState = props.editorState;

  var selection = editorState.getSelection();
  var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  var BLOCK_TYPES = [{
    text: "左对齐",
    label: "editor_alignment_left",
    style: 'left'
  }, {
    text: "居中",
    label: "editor_alignment_center",
    style: 'center'
  }, {
    text: "右对齐",
    label: "editor_alignment_right",
    style: 'right'
  }, {
    text: "两端对齐",
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