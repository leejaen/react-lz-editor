"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styleButton = require("./styleButton");

var _styleButton2 = _interopRequireDefault(_styleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockStyleControls = function BlockStyleControls(props) {
  var editorState = props.editorState,
      lang = props.lang;

  var selection = editorState.getSelection();
  var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  var BLOCK_TYPES = [{
    text: lang.H1,
    label: "editor_H1",
    style: 'header-one'
  }, {
    text: lang.H2,
    label: "editor_H2",
    style: 'header-two'
  }, {
    text: lang.H3,
    label: "editor_H3",
    style: 'header-three'
  }, {
    text: lang.H4,
    label: "editor_H4",
    style: 'header-four'
  }, {
    text: lang.refs,
    label: "editor_refs",
    style: 'blockquote'
  }, {
    text: lang.ul,
    label: "editor_ul",
    style: 'unordered-list-item'
  }, {
    text: lang.ol,
    label: "editor_ol",
    style: 'ordered-list-item'
  }, {
    text: lang.pre,
    label: "editor_pre",
    style: 'code-block'
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
module.exports = BlockStyleControls;