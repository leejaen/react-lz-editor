"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _colorButton = require("./colorButton");

var _colorButton2 = _interopRequireDefault(_colorButton);

var _colorConfig = require("../utils/colorConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorControls = function (_Component) {
  _inherits(ColorControls, _Component);

  function ColorControls(props) {
    _classCallCheck(this, ColorControls);

    return _possibleConstructorReturn(this, (ColorControls.__proto__ || Object.getPrototypeOf(ColorControls)).call(this, props));
  }

  _createClass(ColorControls, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var currentStyle = this.props.editorState.getCurrentInlineStyle();
      var COLORS = Object.keys(_colorConfig.colorStyleMap).map(function (item) {
        return { label: '　', alias: item, style: item };
      });
      return _react2.default.createElement(
        "div",
        { className: "RichEditor-controls", style: {
            paddingRight: "20px"
          } },
        COLORS.map(function (type, i) {
          return _react2.default.createElement(_colorButton2.default, {
            active: currentStyle.has(type.style),
            label: type.label,
            onToggle: _this2.props.onToggle,
            style: type.style,
            key: i,
            split: i == COLORS.length - 1 ? "|" : "" });
        })
      );
    }
  }]);

  return ColorControls;
}(_react.Component);

module.exports = ColorControls;