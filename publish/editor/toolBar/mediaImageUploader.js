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

/*视频音频图片*/
var ImgStyleControls = function (_Component) {
  _inherits(ImgStyleControls, _Component);

  function ImgStyleControls(props) {
    _classCallCheck(this, ImgStyleControls);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImgStyleControls).call(this, props));

    _this.state = {
      visible: false,
      images: [],
      loadingRemoteImageFun: null
    };
    _this.successedCount = 0;

    _this.onImgToggle = _this.onImgToggle.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.prepareToSendImageToEditor = _this.prepareToSendImageToEditor.bind(_this);
    _this.getImgObject = _this.getImgObject.bind(_this);

    _this.groupAppend = _this.groupAppend.bind(_this);
    _this.failureLoading = _this.failureLoading.bind(_this);
    _this.reloadPfopingPictrue = _this.reloadPfopingPictrue.bind(_this);
    _this.successLoading = _this.successLoading.bind(_this);
    return _this;
  }

  _createClass(ImgStyleControls, [{
    key: 'getImgObject',
    value: function getImgObject(fileObj) {
      this.state.images = fileObj;
      if (!!this.state.images) {
        this.setState({ disabled: false });
      }
      this.forceUpdate();
    }
  }, {
    key: 'prepareToSendImageToEditor',
    value: function prepareToSendImageToEditor() {
      if (!!this.state.images.length) {
        this.state.loadingRemoteImageFun = _antd.message.loading('图片正在处理请稍等片刻...', 0);
      }
    }
  }, {
    key: 'successLoading',
    value: function successLoading(type) {
      if (type == "fromImg") {
        console.log("successLoading", this.successedCount);
        if (this.successedCount + 1 < this.state.images.length) {
          this.successedCount += 1;
          return false;
        }
        this.successedCount = 0;
        setTimeout(this.state.loadingRemoteImageFun, 500);
      }
      var images = this.state.images.map(function (item) {
        item.url = item.url.substr(0, ~item.url.lastIndexOf("?t=") ? item.url.lastIndexOf("?t=") : item.url.length);
        return item;
      });
      this.setState({ visible: false, images: [] });
      this.props.receiveImage(images);
    }
  }, {
    key: 'failureLoading',
    value: function failureLoading(event, index) {
      var _this2 = this;

      console.log("failureLoading", event, index);
      var picture = this.state.images[index].url;
      if (!!picture && picture != "reset") {
        setTimeout(function () {
          //无效时每100毫秒刷新一次
          _this2.reloadPfopingPictrue(picture, index);
        }, 300);
      }
    }
  }, {
    key: 'reloadPfopingPictrue',
    value: function reloadPfopingPictrue(picture, index) {
      var thePicture = picture.substr(0, ~picture.lastIndexOf("?t=") ? picture.lastIndexOf("?t=") : picture.length);
      var n = picture.substr((~picture.lastIndexOf("?t=") ? picture.lastIndexOf("?t=") : picture.length) + 3);
      picture = thePicture + "?t=" + (parseInt(!!n ? n : "0") + 1);
      this.state.images[index].url = picture;
      this.forceUpdate();
    }
  }, {
    key: 'groupAppend',
    value: function groupAppend(pictureList) {
      console.log("pictureList", pictureList);
      if (!pictureList.length) {
        console.log("return false", pictureList.lenght);
        return false;
      }
      var images = pictureList.map(function (item) {
        return { "url": item };
      });
      this.setState({ "images": images });
      this.prepareToSendImageToEditor();
    }
  }, {
    key: 'onImgToggle',
    value: function onImgToggle() {
      this.setState({ visible: true, disabled: true, images: [] });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(e) {
      this.setState({ visible: false, images: [] });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var className = 'RichEditor-styleButton';
      var that = this;

      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        _react2.default.createElement(
          _businessComponents.GroupUpload,
          {
            limitCount: 50,
            imageList: this.state.images.map(function (item) {
              item.url;
            }),
            atuoSize: [650, 0],
            receiveSelectedPictures: this.groupAppend,
            uploadConfig: this.props.uploadConfig },
          _react2.default.createElement(
            'span',
            { className: className },
            _react2.default.createElement(
              _antd.Tooltip,
              { placement: 'top', title: '\u6C34\u5370\u56FE\u7247' },
              _react2.default.createElement(_antd.Icon, { type: 'editor_image_masker' })
            )
          )
        ),
        _react2.default.createElement(
          'span',
          { className: className, onClick: that.onImgToggle },
          _react2.default.createElement(
            _antd.Tooltip,
            { placement: 'top', title: '\u539F\u59CB\u56FE\u7247' },
            _react2.default.createElement(_antd.Icon, { type: 'editor_image' })
          )
        ),
        _react2.default.createElement(
          'div',
          {
            style: {
              width: 0,
              height: 0,
              display: "inline",
              overflow: "hidden",
              position: "absolute"
            } },
          this.state.images.map(function (item, index) {
            return _react2.default.createElement('img', { style: { width: "100px" }, src: item.url,
              onError: function onError(event) {
                return _this3.failureLoading(event, index);
              },
              onLoad: function onLoad() {
                return _this3.successLoading("fromImg");
              } });
          })
        ),
        _react2.default.createElement(
          _antd.Modal,
          {
            title: '\u63D2\u5165\u56FE\u7247',
            visible: that.state.visible,
            closable: false,
            footer: [_react2.default.createElement(
              _antd.Button,
              { key: 'back', size: 'large', onClick: that.handleCancel },
              ' \u53D6 \u6D88 '
            ), _react2.default.createElement(
              _antd.Button,
              { key: 'submit', type: 'primary', size: 'large', disabled: that.state.disabled, onClick: function onClick() {
                  return that.successLoading("fromOld");
                } },
              ' \u786E \u5B9A '
            )] },
          _react2.default.createElement(_businessComponents.UploadImage, {
            isMultiple: true,
            fileList: that.state.images,
            isOpenModel: that.state.visible,
            cbReceiver: that.getImgObject,
            uploadConfig: this.props.uploadConfig,
            limit: 10,
            fileType: 'image' })
        )
      );
    }
  }]);

  return ImgStyleControls;
}(_react.Component);

ImgStyleControls.propTypes = {
  receiveImage: _react2.default.PropTypes.func.isRequired,
  uploadConfig: _react2.default.PropTypes.shape({
    QINIU_URL: _react2.default.PropTypes.string.isRequired,
    QINIU_IMG_TOKEN_URL: _react2.default.PropTypes.string.isRequired,
    QINIU_PFOP: _react2.default.PropTypes.shape({
      url: _react2.default.PropTypes.string.isRequired
    }),
    QINIU_VIDEO_TOKEN_URL: _react2.default.PropTypes.string.isRequired,
    QINIU_FILE_TOKEN_URL: _react2.default.PropTypes.string.isRequired,
    QINIU_IMG_DOMAIN_URL: _react2.default.PropTypes.string.isRequired,
    QINIU_DOMAIN_VIDEO_URL: _react2.default.PropTypes.string.isRequired,
    QINIU_DOMAIN_FILE_URL: _react2.default.PropTypes.string.isRequired
  })
};

ImgStyleControls.defaultProps = {};
module.exports = ImgStyleControls;