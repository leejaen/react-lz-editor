"use strict";

var _css = require("antd/lib/icon/style/css");

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddUrl = function (_Component) {
  _inherits(AddUrl, _Component);

  function AddUrl(props) {
    _classCallCheck(this, AddUrl);

    return _possibleConstructorReturn(this, (AddUrl.__proto__ || Object.getPrototypeOf(AddUrl)).call(this, props));
  }

  _createClass(AddUrl, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "RichEditor-controls" },
        _react2.default.createElement(
          "span",
          { className: "RichEditor-styleButton", onClick: this.props.onToggle, title: "\u589E\u52A0\u94FE\u63A5" },
          _react2.default.createElement(_icon2.default, { type: "editor_link" })
        )
      );
    }
  }]);

  return AddUrl;
}(_react.Component);

var CloseUrl = function (_Component2) {
  _inherits(CloseUrl, _Component2);

  function CloseUrl(props) {
    _classCallCheck(this, CloseUrl);

    return _possibleConstructorReturn(this, (CloseUrl.__proto__ || Object.getPrototypeOf(CloseUrl)).call(this, props));
  }

  _createClass(CloseUrl, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "RichEditor-controls" },
        _react2.default.createElement(
          "span",
          { className: "RichEditor-styleButton", onClick: this.props.onToggle, title: "\u79FB\u9664\u94FE\u63A5" },
          _react2.default.createElement(_icon2.default, { type: "editor_unlink" })
        )
      );
    }
  }]);

  return CloseUrl;
}(_react.Component);

module.exports = {
  AddUrl: AddUrl,
  CloseUrl: CloseUrl
};