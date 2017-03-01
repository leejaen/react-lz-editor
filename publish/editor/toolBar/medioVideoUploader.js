'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _businessComponents = require('../../global/components/businessComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoStyleControls = function (_Component) {
  _inherits(VideoStyleControls, _Component);

  function VideoStyleControls(props) {
    _classCallCheck(this, VideoStyleControls);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VideoStyleControls).call(this, props));

    _this.state = {
      visible: false,
      videos: []
    };
    _this.onVideoToggle = _this.onVideoToggle.bind(_this);

    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.getVideoObject = _this.getVideoObject.bind(_this);
    _this.sendVideoToEditor = _this.sendVideoToEditor.bind(_this);
    return _this;
  }

  _createClass(VideoStyleControls, [{
    key: 'getVideoObject',
    value: function getVideoObject(fileObj) {
      this.state.videos = this.state.videos.concat(fileObj);
      if (!!this.state.videos) {
        this.setState({ disabled: false });
      }
      this.forceUpdate();
    }
  }, {
    key: 'sendVideoToEditor',
    value: function sendVideoToEditor() {
      this.setState({ visible: false });
      var videos = this.state.videos.map(function (item) {
        return item;
      });
      this.props.receiveVideo(videos);
      this.state.videos = [];
      this.forceUpdate();
    }
  }, {
    key: 'onVideoToggle',
    value: function onVideoToggle() {
      this.setState({ visible: true, disabled: true, videos: [] });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(e) {
      // console.log(e);
      this.setState({ visible: false });
      this.state.videos = [];
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
          { className: className, onClick: that.onVideoToggle },
          _react2.default.createElement(
            _antd.Tooltip,
            { placement: 'top', title: '\u4E0A\u4F20\u89C6\u9891' },
            _react2.default.createElement(_antd.Icon, { type: 'editor_video' })
          )
        ),
        _react2.default.createElement(
          _antd.Modal,
          {
            title: '\u63D2\u5165\u89C6\u9891',
            visible: that.state.visible,
            closable: false,
            footer: [_react2.default.createElement(
              _antd.Button,
              { key: 'back', size: 'large', onClick: that.handleCancel },
              ' \u53D6\u6D88 '
            ), _react2.default.createElement(
              _antd.Button,
              { key: 'submit', type: 'primary', size: 'large', disabled: that.state.disabled, onClick: that.sendVideoToEditor },
              ' \u786E\u5B9A '
            )] },
          _react2.default.createElement(_businessComponents.UploadImage, { isMultiple: true,
            limit: 10,
            fileList: that.state.videos,
            isOpenModel: that.state.visible,
            cbReceiver: that.getVideoObject,
            uploadConfig: this.props.uploadConfig,
            fileType: 'video' })
        )
      );
    }
  }]);

  return VideoStyleControls;
}(_react.Component);

module.exports = VideoStyleControls;