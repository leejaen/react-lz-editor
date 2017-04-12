'use strict';

var _css = require('antd/lib/modal/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css2 = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _css3 = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _businessComponents = require('../../global/components/businessComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioStyleControls = function (_Component) {
  _inherits(AudioStyleControls, _Component);

  function AudioStyleControls(props) {
    _classCallCheck(this, AudioStyleControls);

    var _this = _possibleConstructorReturn(this, (AudioStyleControls.__proto__ || Object.getPrototypeOf(AudioStyleControls)).call(this, props));

    _this.state = {
      visible: false,
      audios: []
    }, _this.onAudioToggle = _this.onAudioToggle.bind(_this);
    _this.sendAudioToEditor = _this.sendAudioToEditor.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.getAudioObject = _this.getAudioObject.bind(_this);
    return _this;
  }

  _createClass(AudioStyleControls, [{
    key: 'getAudioObject',
    value: function getAudioObject(fileObj) {
      this.state.audios = this.state.audios.concat(fileObj);
      if (!!this.state.audios) {
        this.setState({ disabled: false });
      }
      this.forceUpdate();
    }
  }, {
    key: 'onAudioToggle',
    value: function onAudioToggle() {
      this.setState({ visible: true, disabled: true, audios: [] });
    }
  }, {
    key: 'sendAudioToEditor',
    value: function sendAudioToEditor() {
      this.setState({ visible: false });
      var audios = this.state.audios.map(function (item) {
        return item;
      });
      this.props.receiveAudio(audios);
      this.state.audios = [];
      this.forceUpdate();
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(e) {
      this.setState({ visible: false });
      this.state.audios = [];
      this.forceUpdate();
    }
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
          { className: className, onClick: that.onAudioToggle },
          _react2.default.createElement(_icon2.default, { type: 'editor_audio', title: '\u4E0A\u4F20\u97F3\u9891' })
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: '\u63D2\u5165\u97F3\u9891',
            visible: that.state.visible,
            closable: false,
            footer: [_react2.default.createElement(
              _button2.default,
              { key: 'back', size: 'large', onClick: that.handleCancel },
              ' \u53D6 \u6D88 '
            ), _react2.default.createElement(
              _button2.default,
              { key: 'submit', type: 'primary', size: 'large', disabled: that.state.disabled, onClick: that.sendAudioToEditor },
              ' \u786E \u5B9A '
            )] },
          _react2.default.createElement(_businessComponents.UploadImage, { isMultiple: true,
            fileList: that.state.audios,
            isOpenModel: that.state.visible,
            limit: 10,
            cbReceiver: that.getAudioObject,
            fileType: 'audio',
            uploadConfig: this.props.uploadConfig })
        )
      );
    }
  }]);

  return AudioStyleControls;
}(_react.Component);

module.exports = AudioStyleControls;