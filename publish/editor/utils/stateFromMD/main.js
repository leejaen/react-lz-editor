'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stateFromMarkdown;

var _MarkdownParser = require('./MarkdownParser');

var _MarkdownParser2 = _interopRequireDefault(_MarkdownParser);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stateFromMarkdown(markdown) {
  var element = _MarkdownParser2.default.parse(markdown, { getAST: true });
  return (0, _index.stateFromElement)(element);
}