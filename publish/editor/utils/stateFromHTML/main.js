'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stateFromHTML;

var _index = require('../index');

var _parseHTML = require('./parseHTML');

var _parseHTML2 = _interopRequireDefault(_parseHTML);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stateFromHTML(html, options) {
  var parser = options == null || options.parser == null ? _parseHTML2.default : options.parser;
  var element = parser(html);
  return (0, _index.stateFromElement)(element, options);
}