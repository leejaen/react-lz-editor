'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _hmacsha = require('hmacsha1');

var _hmacsha2 = _interopRequireDefault(_hmacsha);

var _jsBase = require('js-base64');

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _uniqBy = require('lodash/uniqBy');

var _uniqBy2 = _interopRequireDefault(_uniqBy);

var _index = require('./editor/index.jsx');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_React$Component) {
  _inherits(Test, _React$Component);

  function Test(props) {
    _classCallCheck(this, Test);

    var _this2 = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

    _this2.state = {
      htmlContent: "",
      markdownContent: "## 二级标题 HEAD 2 \n markdown 格式示例 \n ``` 欢迎使用 ```",
      rawContent: '{"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://image.qiluyidian.mobi/4305350813991067' + '8747.jpg"}},"1":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://image.qiluyidian.mobi/430535081399106787' + '47.jpg"}}},"blocks":[{"key":"fr2lj","text":"正文示例","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[]' + ',"data":{}},{"key":"90kdv","text":"一度金融的消息称，乐视金融同数码视讯的接触尚处在高层范围内进行，因此对于收购价格，暂时还不能确定。","type":"unstyled","depth":0,"inlin' + 'eStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b60ni","text":"如果乐视金融拿下数码视讯的两张金融牌照，并且在到期后能够获得央行审核顺利延期，意味着乐视可以通过移动设' + '备和电视两个终端来链接用户的银行卡。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eui4h","text' + '":"乐视金融在去年11月份首度公开亮相的时候，缺少银行和支付两张关键牌照就一直是外界关注的问题。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],' + '"data":{}},{"key":"29t6l","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"lengt' + 'h":1,"key":0}],"data":{}},{"key":"7ujeo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],' + '"data":{}},{"key":"3n9d4","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"lengt' + 'h":1,"key":1}],"data":{}},{"key":"9r0k2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],' + '"data":{}}]}',
      responseList: []
    };
    _this2.receiveHtml = _this2.receiveHtml.bind(_this2);
    _this2.receiveMarkdown = _this2.receiveMarkdown.bind(_this2);
    _this2.receiveRaw = _this2.receiveRaw.bind(_this2);
    _this2.onChange = _this2.onChange.bind(_this2);
    _this2.beforeUpload = _this2.beforeUpload.bind(_this2);
    _this2.getSignature = _this2.getSignature.bind(_this2);
    _this2.getPolicy = _this2.getPolicy.bind(_this2);
    return _this2;
  }

  _createClass(Test, [{
    key: 'receiveHtml',
    value: function receiveHtml(content) {
      console.log("recieved HTML content", content);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'receiveMarkdown',
    value: function receiveMarkdown(content) {
      console.log("recieved markdown content", content);
    }
  }, {
    key: 'receiveRaw',
    value: function receiveRaw(content) {
      console.log("recieved Raw content", content);
    }
  }, {
    key: 'onChange',
    value: function onChange(info) {
      var currFileList = info.fileList;

      currFileList = currFileList.filter(function (f) {
        return !f.length;
      });
      var url = "http://devopee.b0.upaiyun.com";

      currFileList = currFileList.map(function (file) {
        if (file.response) {
          file.url = url + file.response.url;
        }
        if (!file.length) {
          return file;
        }
      });
      var _this = this;

      currFileList = currFileList.filter(function (file) {
        var hasNoExistCurrFileInUploadedList = !~(0, _findIndex2.default)(_this.state.responseList, function (item) {
          return item.name === file.name;
        });
        if (hasNoExistCurrFileInUploadedList) {
          if (!!_this.props.isMultiple == true) {
            _this.state.responseList.push(file);
          } else {
            _this.state.responseList = [file];
          }
        }
        return !!file.response || !!file.url && file.status == "done" || file.status == "uploading";
      });
      currFileList = (0, _uniqBy2.default)(currFileList, "name");
      if (!!currFileList && currFileList.length != 0) {
        this.setState({ responseList: currFileList });
      }
      _this.forceUpdate();
    }
  }, {
    key: 'beforeUpload',
    value: function beforeUpload(file) {
      console.log("beforeUpload like", file);
    }
  }, {
    key: 'getSignature',
    value: function getSignature(fileName) {
      var now = new Date();
      var h = (0, _hmacsha2.default)('19931944122b23f77681b6ab765648f8', 'POST&/upyun-temp/' + fileName + '&' + now);
      var Signature = _jsBase.Base64.encode(h);
      return Signature;
    }
  }, {
    key: 'getPolicy',
    value: function getPolicy(fileName) {
      var now = new Date();
      var afterHour = new Date(now.getTime() + 1 * 60 * 60 * 1000);
      var policy = _jsBase.Base64.encode(JSON.stringify({
        "bucket": "devopee",
        "save-key": "/" + fileName,
        "expiration": Math.round(afterHour.getTime() / 1000),
        "date": now
      }));
      return policy;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var uploadConfig = {
        QINIU_URL: "http://up.qiniu.com",
        QINIU_IMG_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do",
        QINIU_PFOP: {
          url: "http://www.yourServerAddress.mobi/doQiniuPicPersist.do" },
        QINIU_VIDEO_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do",
        QINIU_FILE_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do?name=patch",
        QINIU_DOMAIN_IMG_URL: "https://image.yourServerAddress.mobi",
        QINIU_DOMAIN_VIDEO_URL: "https://video.yourServerAddress.mobi",
        QINIU_DOMAIN_FILE_URL: "https://static.yourServerAddress.com/" };

      var policy = "";

      var uploadProps = {
        action: "http://v0.api.upyun.com/devopee",
        onChange: this.onChange,
        listType: 'picture',
        fileList: this.state.responseList,
        data: function data(file) {
          return {
            Authorization: "UPYUN reactlzeditor:" + _this3.getSignature(file.name),
            policy: function () {
              policy = _this3.getPolicy(file.name);
              return policy;
            }(),
            signature: (0, _md2.default)(policy + '&pLv/J4I6vfpeznxtwU+g/dsUcEY=')
          };
        },
        multiple: true,
        beforeUpload: this.beforeUpload,
        showUploadList: true
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          'Editor demo 1 (use default html format ):'
        ),
        _react2.default.createElement(_index2.default, { active: true, importContent: this.state.htmlContent, cbReceiver: this.receiveHtml, uploadProps: uploadProps }),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'div',
          null,
          'Editor demo 2 (use markdown format ):'
        ),
        _react2.default.createElement(_index2.default, {
          active: true,
          importContent: this.state.markdownContent,
          cbReceiver: this.receiveMarkdown,
          image: false,
          video: false,
          audio: false,
          convertFormat: 'markdown' }),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'div',
          null,
          'Editor demo 3 (use Raw format ):'
        ),
        _react2.default.createElement(_index2.default, {
          active: true,
          importContent: this.state.rawContent,
          cbReceiver: this.receiveRaw,
          uploadConfig: uploadConfig,
          image: false,
          video: false,
          audio: false,
          convertFormat: 'raw' })
      );
    }
  }]);

  return Test;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(Test, null), document.getElementById('test'));