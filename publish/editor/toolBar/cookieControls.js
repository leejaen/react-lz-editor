"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OpenFull = function (_Component) {
  _inherits(OpenFull, _Component);

  function OpenFull(props) {
    _classCallCheck(this, OpenFull);

    return _possibleConstructorReturn(this, (OpenFull.__proto__ || Object.getPrototypeOf(OpenFull)).call(this, props));
  }

  _createClass(OpenFull, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "RichEditor-controls" },
        _react2.default.createElement(
          "span",
          { className: "RichEditor-styleButton", onClick: this.props.onToggle },
          this.props.coverTitle
        )
      );
    }
  }]);

  return OpenFull;
}(_react.Component);

var AutoSave = function (_Component2) {
  _inherits(AutoSave, _Component2);

  function AutoSave(props) {
    _classCallCheck(this, AutoSave);

    return _possibleConstructorReturn(this, (AutoSave.__proto__ || Object.getPrototypeOf(AutoSave)).call(this, props));
  }

  _createClass(AutoSave, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "RichEditor-controls" },
        _react2.default.createElement(
          "span",
          { className: "RichEditor-styleButton", onClick: this.props.onToggle },
          "\u81EA\u52A8\u4FDD\u5B58\u5E93"
        )
      );
    }
  }]);

  return AutoSave;
}(_react.Component);

;

var SourceEditor = function (_Component3) {
  _inherits(SourceEditor, _Component3);

  function SourceEditor(props) {
    _classCallCheck(this, SourceEditor);

    return _possibleConstructorReturn(this, (SourceEditor.__proto__ || Object.getPrototypeOf(SourceEditor)).call(this, props));
  }

  _createClass(SourceEditor, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "RichEditor-controls" },
        _react2.default.createElement(
          "span",
          { className: "RichEditor-styleButton", onClick: this.props.onToggle },
          this.props.coverTitle
        )
      );
    }
  }]);

  return SourceEditor;
}(_react.Component);

;
module.exports = {
  OpenFull: OpenFull,
  AutoSave: AutoSave,
  SourceEditor: SourceEditor
};