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

var _css4 = require('antd/lib/message/style/css');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _businessComponents = require('../../global/components/businessComponents');

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImgStyleControls = function (_Component) {
  _inherits(ImgStyleControls, _Component);

  function ImgStyleControls(props) {
    _classCallCheck(this, ImgStyleControls);

    var _this = _possibleConstructorReturn(this, (ImgStyleControls.__proto__ || Object.getPrototypeOf(ImgStyleControls)).call(this, props));

    _this.state = {
      provisible: false,
      previsible: false,
      images: [],
      loadingRemoteImageFun: null,
      pfopImages: []
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

    _this.handleCancelUploading = _this.handleCancelUploading.bind(_this);
    _this.realLoading = _this.realLoading.bind(_this);
    _this.reloadUploadingPictrue = _this.reloadUploadingPictrue.bind(_this);
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
        this.state.loadingRemoteImageFun = _message2.default.loading(this.props.lang.inPreviewProgress, 0);
      }
    }
  }, {
    key: 'successLoading',
    value: function successLoading(type) {
      if (type == "fromImg") {
        if (this.successedCount + 1 < this.state.images.length) {
          this.successedCount += 1;
          return false;
        }
        this.successedCount = 0;
        setTimeout(this.state.loadingRemoteImageFun, 500);
      }
      var pfopImages = this.state.images.map(function (item) {
        item.url = item.url.substr(0, ~item.url.lastIndexOf("?t=") ? item.url.lastIndexOf("?t=") : item.url.length) + "?t=foreditor";
        return item;
      });

      this.setState({ provisible: false, pfopImages: pfopImages, previsible: true });
    }
  }, {
    key: 'realLoading',
    value: function realLoading(type) {
      var images = (0, _cloneDeep2.default)(this.state.pfopImages);

      this.setState({ provisible: false, images: [], pfopImages: [], previsible: false });
      this.props.receiveImage(images);
    }
  }, {
    key: 'failureLoading',
    value: function failureLoading(event, index) {
      var _this2 = this;

      var picture = this.state.images[index].url;
      if (!!picture && picture != "reset") {
        setTimeout(function () {
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
    key: 'reloadUploadingPictrue',
    value: function reloadUploadingPictrue(picture, index) {
      var thePicture = picture.substr(0, ~picture.lastIndexOf("?t=") ? picture.lastIndexOf("?t=") : picture.length);
      var n = picture.substr((~picture.lastIndexOf("?t=") ? picture.lastIndexOf("?t=") : picture.length) + 3);
      picture = thePicture + "?t=" + (parseInt(!!n ? n : "0") + 1);
      if (!!this.state.pfopImages[index]) {
        this.state.pfopImages[index].url = picture;
      }
      this.forceUpdate();
    }
  }, {
    key: 'groupAppend',
    value: function groupAppend(pictureList) {
      if (!pictureList.length) {
        return false;
      }
      var images = pictureList.map(function (item) {
        return { "url": item };
      });
      this.setState({ previsible: true, "images": images });
      this.prepareToSendImageToEditor();
    }
  }, {
    key: 'onImgToggle',
    value: function onImgToggle() {
      this.setState({ provisible: true, previsible: false, disabled: true, images: [] });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(e) {
      this.setState({ provisible: false, previsible: false, images: [] });
    }
  }, {
    key: 'handleCancelUploading',
    value: function handleCancelUploading(e) {
      this.setState({ provisible: false, previsible: false, pfopImages: [] });
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
            uploadConfig: this.props.uploadConfig,
            uploadProps: this.props.uploadProps,
            watermarkImage: this.props.watermarkImage,
            lang: this.props.lang },
          _react2.default.createElement(
            'span',
            { className: className },
            _react2.default.createElement(_icon2.default, { type: 'editor_image_masker', title: this.props.lang.imageMasker })
          )
        ),
        _react2.default.createElement(
          'span',
          { className: className, onClick: that.onImgToggle },
          _react2.default.createElement(_icon2.default, { type: 'editor_image', title: this.props.lang.originalImage })
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
            return _react2.default.createElement('img', { style: { width: "100px" }, src: item.url + "?t=10",
              onError: function onError(event) {
                return _this3.failureLoading(event, index);
              },
              onLoad: function onLoad() {
                return _this3.successLoading("fromImg");
              } });
          })
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: this.props.lang.insertImageModalTitle,
            visible: that.state.provisible,
            closable: false,
            footer: [_react2.default.createElement(
              _button2.default,
              { key: 'back', size: 'large', onClick: that.handleCancel },
              ' ',
              this.props.lang.cancelText,
              ' '
            ), _react2.default.createElement(
              _button2.default,
              { key: 'submit', type: 'primary', size: 'large', disabled: that.state.disabled, onClick: function onClick() {
                  return that.successLoading("fromOld");
                } },
              ' ',
              this.props.lang.OKText,
              ' '
            )] },
          _react2.default.createElement(_businessComponents.UploadImage, {
            isMultiple: true,
            fileList: that.state.images,
            isOpenModel: that.state.provisible,
            cbReceiver: that.getImgObject,
            uploadConfig: this.props.uploadConfig,
            uploadProps: this.props.uploadProps,
            lang: this.props.lang,
            limit: 10,
            fileType: 'image' })
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: this.props.lang.previewImageModalTitle,
            visible: that.state.previsible,
            width: 800,
            closable: false,
            footer: [_react2.default.createElement(
              _button2.default,
              { key: 'back', size: 'large', onClick: that.handleCancelUploading },
              ' ',
              this.props.lang.cancelText,
              ' '
            ), _react2.default.createElement(
              _button2.default,
              { key: 'submit', type: 'primary', size: 'large', disabled: that.state.pfopImages.length == 0, onClick: function onClick() {
                  return that.realLoading("fromOld");
                } },
              ' ',
              this.props.lang.validatedImage,
              ' '
            )] },
          _react2.default.createElement(
            'div',
            { className: 'uploadingImagies' },
            that.state.pfopImages.map(function (item, index) {
              var url = item.url;
              return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'a',
                  { onClick: function onClick() {
                      return that.reloadUploadingPictrue(url, index);
                    }, title: _this3.props.lang.refreshImage },
                  _react2.default.createElement(_icon2.default, { type: 'reload' })
                ),
                _react2.default.createElement('img', { src: url })
              );
            })
          )
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
    QINIU_DOMAIN_IMG_URL: _react2.default.PropTypes.string.isRequired,
    QINIU_DOMAIN_VIDEO_URL: _react2.default.PropTypes.string.isRequired,
    QINIU_DOMAIN_FILE_URL: _react2.default.PropTypes.string.isRequired
  })
};

ImgStyleControls.defaultProps = {};
module.exports = ImgStyleControls;