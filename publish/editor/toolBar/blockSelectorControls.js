'use strict';

var _css = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RemoveStyleControls = function (_Component) {
  _inherits(RemoveStyleControls, _Component);

  function RemoveStyleControls(props) {
    _classCallCheck(this, RemoveStyleControls);

    return _possibleConstructorReturn(this, (RemoveStyleControls.__proto__ || Object.getPrototypeOf(RemoveStyleControls)).call(this, props));
  }

  _createClass(RemoveStyleControls, [{
    key: 'render',
    value: function render() {
      var className = 'RichEditor-styleButton';
      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        _react2.default.createElement(
          'span',
          { className: className, onClick: this.props.onToggle },
          _react2.default.createElement(_icon2.default, { key: 'empty_style', type: 'editor_select_block' })
        )
      );
    }
  }]);

  return RemoveStyleControls;
}(_react.Component);

module.exports = RemoveStyleControls;