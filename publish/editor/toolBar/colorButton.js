'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colorStyleMap = require('../config/colorStyleMap');

var _colorStyleMap2 = _interopRequireDefault(_colorStyleMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorButton = function (_Component) {
  _inherits(ColorButton, _Component);

  function ColorButton(props) {
    _classCallCheck(this, ColorButton);

    var _this = _possibleConstructorReturn(this, (ColorButton.__proto__ || Object.getPrototypeOf(ColorButton)).call(this, props));

    _this.onToggle = function (e) {
      e.preventDefault();
      _this.props.onToggle(_this.props.style);
    };
    return _this;
  }

  _createClass(ColorButton, [{
    key: 'render',
    value: function render() {
      var _styles,
          _this2 = this;

      var styles = (_styles = {
        editor: {
          borderTop: '1px solid #ddd',
          cursor: 'text',
          fontSize: 16,
          marginTop: 20,
          minHeight: 400,
          paddingTop: 20
        },
        controls: {
          fontFamily: '\'Helvetica\', sans-serif',
          fontSize: 14,
          marginBottom: 10,
          userSelect: 'none'
        },
        ColorButton: {
          color: '#999',
          cursor: 'pointer',
          marginRight: 16,
          padding: '2px 0'
        },
        root: {
          fontFamily: '\'Georgia\', serif',
          padding: 20,
          width: 600
        },
        buttons: {
          marginBottom: 10
        },
        urlInputContainer: {
          marginBottom: 10
        },
        urlInput: {
          fontFamily: '\'Georgia\', serif',
          marginRight: 10,
          padding: 3
        }
      }, _defineProperty(_styles, 'editor', {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10
      }), _defineProperty(_styles, 'button', {
        marginTop: 10,
        textAlign: 'center'
      }), _defineProperty(_styles, 'link', {
        color: 'blue',
        textDecoration: 'underline'
      }), _styles);

      var style = Object.assign({}, styles.ColorButton, this.props.active ? _colorStyleMap2.default[this.props.style] : {});
      var className = 'RichEditor-styleButton';
      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-color' },
        _react2.default.createElement(
          'span',
          {
            className: className,
            onClick: this.onToggle,
            style: {
              backgroundColor: _colorStyleMap2.default[this.props.style].color
            } },
          this.props.label
        ),
        function () {
          if (!!_this2.props.split) {
            return _react2.default.createElement(
              'span',
              { className: 'RichEditor-controls-split' },
              _this2.props.split
            );
          }
        }()
      );
    }
  }]);

  return ColorButton;
}(_react.Component);

module.exports = ColorButton;