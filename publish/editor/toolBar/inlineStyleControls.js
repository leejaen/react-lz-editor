'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleButton = require('./styleButton');

var _styleButton2 = _interopRequireDefault(_styleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlineStyleControls = function (_Component) {
  _inherits(InlineStyleControls, _Component);

  function InlineStyleControls(props) {
    _classCallCheck(this, InlineStyleControls);

    return _possibleConstructorReturn(this, (InlineStyleControls.__proto__ || Object.getPrototypeOf(InlineStyleControls)).call(this, props));
  }

  _createClass(InlineStyleControls, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var INLINE_STYLES = [{
        text: '加粗',
        style: 'BOLD',
        label: "editor_b"
      }, {
        text: '斜体',
        style: 'ITALIC',
        label: "editor_i"
      }, {
        text: '下划线',
        style: 'UNDERLINE',
        label: "editor_u"
      }, {
        text: '等宽字体',
        style: 'CODE',
        label: "editor_e"
      }];
      var currentStyle = this.props.editorState ? this.props.editorState.getCurrentInlineStyle() : {};
      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        INLINE_STYLES.map(function (type, i) {
          return _react2.default.createElement(_styleButton2.default, {
            key: type.style,
            text: type.text,
            active: currentStyle.has(type.style),
            label: type.label,
            onToggle: _this2.props.onToggle,
            style: type.style });
        })
      );
    }
  }]);

  return InlineStyleControls;
}(_react.Component);

module.exports = InlineStyleControls;