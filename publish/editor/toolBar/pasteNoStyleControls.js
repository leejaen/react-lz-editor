'use strict';

var _css = require('antd/lib/modal/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css2 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _css3 = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _css4 = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PasteNoStyleControls = function (_Component) {
  _inherits(PasteNoStyleControls, _Component);

  function PasteNoStyleControls(props) {
    _classCallCheck(this, PasteNoStyleControls);

    var _this = _possibleConstructorReturn(this, (PasteNoStyleControls.__proto__ || Object.getPrototypeOf(PasteNoStyleControls)).call(this, props));

    _this.state = {
      visible: false,
      plantext: ""
    };
    _this.onTextToggle = _this.onTextToggle.bind(_this);
    _this.pasteContent = _this.pasteContent.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.sendTextToEditor = _this.sendTextToEditor.bind(_this);
    return _this;
  }

  _createClass(PasteNoStyleControls, [{
    key: 'pasteContent',
    value: function pasteContent(e) {
      var _this2 = this;

      this.state.plantext = e.target.value;
      this.forceUpdate();
      setTimeout(function () {
        if (!!_this2.state.plantext) {
          _this2.setState({ disabled: false });
        }
      }, 100);
    }
  }, {
    key: 'sendTextToEditor',
    value: function sendTextToEditor() {
      var text = this.state.plantext + "";
      this.props.receiveText(text);
      this.setState({ visible: false, plantext: "" });
    }
  }, {
    key: 'onTextToggle',
    value: function onTextToggle() {
      this.setState({ visible: true, disabled: true, plantext: "" });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(e) {
      this.setState({ visible: false });
      this.state.plantext = "";
      this.forceUpdate();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var className = 'RichEditor-styleButton';
      var that = this;
      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        _react2.default.createElement(
          'span',
          { className: className, onClick: that.onTextToggle, title: '\u7EAF\u6587\u672C\u7C98\u8D34' },
          _react2.default.createElement(_icon2.default, { key: 'paset_text', type: 'editor_paset_text' })
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: '\u63D2\u5165\u65E0\u6837\u5F0F\u6587\u672C\u5185\u5BB9',
            visible: that.state.visible,
            closable: false,
            width: 800,
            footer: [_react2.default.createElement(
              _button2.default,
              { key: 'back', size: 'large', onClick: that.handleCancel },
              ' \u53D6\u6D88 '
            ), _react2.default.createElement(
              _button2.default,
              { key: 'submit', type: 'primary', size: 'large', disabled: that.state.disabled, onClick: that.sendTextToEditor },
              ' \u786E\u5B9A '
            )] },
          _react2.default.createElement(_input2.default, { type: 'textarea', rows: 10, onChange: that.pasteContent, value: that.state.plantext, placeholder: '\u8BF7\u5728\u8FD9\u91CC\u7C98\u8D34\u5185\u5BB9\u540E\u70B9\u51FB\u786E\u5B9A\u6309\u94AE' })
        )
      );
    }
  }]);

  return PasteNoStyleControls;
}(_react.Component);

module.exports = PasteNoStyleControls;