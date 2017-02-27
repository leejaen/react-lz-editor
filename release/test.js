'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('./editor/index.jsx');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import {LzEditor} from './index'


var Test = function (_React$Component) {
  _inherits(Test, _React$Component);

  function Test(props) {
    _classCallCheck(this, Test);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Test).call(this, props));

    _this.state = {
      content: '<h1>\u4E00\u7EA7\u6807\u9898 Head level 1</h1>\n                <p style=\'text-align:center;\'><span style="color:#ED5565">\u7EA2\u8272\u6587\u5B57</span>\uFF0C\u5C45\u4E2D\u5BF9\u9F50\uFF0C<strong>\u52A0\u7C97</strong>\uFF0C<em>\u659C\u4F53</em></p>\n                <blockquote style=\'text-align:left;\'><span style="color:#ffce54">\u5176</span><span style="color:#a0d468">\u4ED6</span><span style="color:#38afda">\u989C</span><span style="color:#967adc">\u8272</span> <span style="color:#a0d468">C</span><span style="color:#48cfad">OL</span><span style="color:#4a89dc">O</span><span style="color:#967adc">R</span><span style="color:#434a54">S</span></blockquote>\n                <p><br></p>\n                <ul>\n                  <li><span style="color:#434a54">list 1</span></li>\n                  <li><span style="color:#434a54">list 2</span></li>\n                  <li><span style="color:#434a54">list 3</span></li>\n                </ul>\n                <pre><code>Block here.Block here.Block here.Block here.</code></pre>\n                <pre><code>Block here.Block here.Block here.Block here.Block here.</code></pre>\n                <pre><code>Block here.Block here.Block here.Block here.Block here.</code></pre>\n                <p><img src="https://image.qiluyidian.mobi/43053508139910678747.jpg"/></p>\n                <p><br></p>\n                <h2>\u6B63\u6587\u793A\u4F8B\uFF1A</h2>\n                <h3>\u4E50\u89C6\u91D1\u878D\u4F20\u5C06\u6536\u8D2D\u6570\u7801\u89C6\u8BAF\u5B50\u516C\u53F8\uFF0C\u62FF\u4E0B\u4E92\u8054\u7F51\u3001\u6570\u5B57\u7535\u89C6\u4E24\u5F20\u652F\u4ED8\u724C\u7167</h3>\n                <p>\u7528\u573A\u666F\u5316\u7684\u65B9\u5F0F\u8868\u8FBE\u5C31\u662F\uFF0C\u7528\u6237\u53EF\u4EE5\u5728\u89C2\u770B\u7535\u89C6\u8D2D\u7269\u9891\u9053\u7684\u65F6\u5019\uFF0C\u76F4\u63A5\u4ECE\u7535\u89C6\u4E0A\u8FDB\u884C\u652F\u4ED8\u8D2D\u4E70\u5546\u54C1\uFF0C\u4E0D\u7528\u518D\u901A\u8FC7\u94F6\u884C\u6C47\u6B3E\u6216\u8005\u8D27\u5230\u4ED8\u6B3E\uFF1B\u53EF\u4EE5\u9009\u62E9\u5BF9\u7535\u89C6\u4E0A\u7684\u70B9\u64AD\u5185\u5BB9\u8FDB\u884C\u4ED8\u8D39\uFF0C\u8FD8\u53EF\u80FD\u5728\u7535\u89C6\u4E0A\u5BF9\u6C34\u7535\u7164\u7B49\u516C\u7528\u4E8B\u4E1A\u8D39\u7528\u8FDB\u884C\u7F34\u8D39\u3002</p>\n                <p>\u4E00\u5EA6\u91D1\u878D\u7684\u6D88\u606F\u79F0\uFF0C\u4E50\u89C6\u91D1\u878D\u540C\u6570\u7801\u89C6\u8BAF\u7684\u63A5\u89E6\u5C1A\u5904\u5728\u9AD8\u5C42\u8303\u56F4\u5185\u8FDB\u884C\uFF0C\u56E0\u6B64\u5BF9\u4E8E\u6536\u8D2D\u4EF7\u683C\uFF0C\u6682\u65F6\u8FD8\u4E0D\u80FD\u786E\u5B9A\u3002</p>\n                <p>\u5982\u679C\u4E50\u89C6\u91D1\u878D\u62FF\u4E0B\u6570\u7801\u89C6\u8BAF\u7684\u4E24\u5F20\u91D1\u878D\u724C\u7167\uFF0C\u5E76\u4E14\u5728\u5230\u671F\u540E\u80FD\u591F\u83B7\u5F97\u592E\u884C\u5BA1\u6838\u987A\u5229\u5EF6\u671F\uFF0C\u610F\u5473\u7740\u4E50\u89C6\u53EF\u4EE5\u901A\u8FC7\u79FB\u52A8\u8BBE\u5907\u548C\u7535\u89C6\u4E24\u4E2A\u7EC8\u7AEF\u6765\u94FE\u63A5\u7528\u6237\u7684\u94F6\u884C\u5361\u3002</p>\n                <p>\u4E50\u89C6\u91D1\u878D\u5728\u53BB\u5E7411\u6708\u4EFD\u9996\u5EA6\u516C\u5F00\u4EAE\u76F8\u7684\u65F6\u5019\uFF0C\u7F3A\u5C11\u94F6\u884C\u548C\u652F\u4ED8\u4E24\u5F20\u5173\u952E\u724C\u7167\u5C31\u4E00\u76F4\u662F\u5916\u754C\u5173\u6CE8\u7684\u95EE\u9898\u3002</p>'
    };
    _this.receiveHtml = _this.receiveHtml.bind(_this);
    return _this;
  }

  _createClass(Test, [{
    key: 'receiveHtml',
    value: function receiveHtml(content) {
      // console.log("recieved content", content);
    }
  }, {
    key: 'render',
    value: function render() {
      var uploadConfig = {
        QINIU_URL: "http://up.qiniu.com", //上传地址，现在暂只支持七牛上传
        QINIU_IMG_TOKEN_URL: "http://www.yourServerAddress.com/getQiniuUptoken.do", //请求图片的token
        QINIU_PFOP: {
          url: "http://www.yourServerAddress.com/QiniuPicPersist.do" //七牛持久保存请求地址
        },
        QINIU_VIDEO_TOKEN_URL: "http://www.yourServerAddress.com/getQiniuUptoken.do", //请求媒体资源的token
        QINIU_FILE_TOKEN_URL: "http://www.yourServerAddress.com/getQiniuUptoken.do?name=patch", //其他资源的token的获取
        QINIU_IMG_DOMAIN_URL: "https://image.yourServerAddress.mobi", //图片文件地址的前缀
        QINIU_DOMAIN_VIDEO_URL: "https://video.yourServerAddress.mobi", //视频文件地址的前缀
        QINIU_DOMAIN_FILE_URL: "https://static.yourServerAddress.com/" };
      return _react2.default.createElement(_index2.default, {
        active: true,
        HtmlContent: this.state.content,
        cbReceiver: this.receiveHtml,
        uploadConfig: uploadConfig,
        Image: false,
        Video: false,
        Audio: false });
    }
  }]);

  return Test;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(Test, null), document.getElementById('test'));