'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _publicDatas = require('../../supports/publicDatas');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * 调用示例：
 * <UploadImage cbReceiver={this.getFile} isMultiple={true}/>
 * cbReceiver 必要属性，此属性指定一个处理接收数据的自定义方法，上传成功的地址通过此方法传给调用组件
 * fileType　必须属性，此属性指定上传文件的类型，img（图片）,video(mp4,mp3类型)
 * isMultiple 非必要属性，默认false，是否支持多文件同时上传，默认只允许单文件上传
 * */
var UploadImage = function (_Component) {
  _inherits(UploadImage, _Component);

  function UploadImage(props) {
    _classCallCheck(this, UploadImage);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(UploadImage).call(this, props));

    _this2.state = {
      isLoad: false,
      qiniu: {
        token: _publicDatas.PRO_QINIU.checkQiniu.returnToken(_this2.props.uploadConfig)
      },
      files: [],
      upReceiverFun: null
    };
    return _this2;
  }

  _createClass(UploadImage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // console.log("componentDidMount this.props.fileList:", this.props.fileList);
      var list = [];
      if (!!this.props.fileList) {
        this.props.fileList.copyWithin(list);
      }
      // console.log("componentDidMount list:", list);
      if (!!list) {
        this.setState({ files: list });
      }
    }
  }, {
    key: 'beforeUpload',
    value: function beforeUpload(file) {
      // console.log("file.type",file);
      // key需要唯一，此处不可使用直接获取的方式，否则会出现相同KEY if (!!this.props.limit && file.length > this.props.limit) {    // message.error("由于限制，您最多只能选择" + this.props.limit + "张图片，请重新选择。", 5);    return false; }    // console.log("key需要唯一，此处不可使用直接获取的方式，否则会出现相同KEY");
      var isFormat = _publicDatas.PRO_COMMON.Array.inArray(_publicDatas.PRO_QINIU.supportMime[this.props.fileType], file.type);
      if (!isFormat) {
        _antd.message.error('只能上传指定文件，请重新选择！参考 File Mimetype: ' + _publicDatas.PRO_QINIU.supportMime[this.props.fileType].join("、"), 10);
        return false;
      }
      if (!this.state.qiniu.token) {
        var token = _publicDatas.PRO_QINIU.checkQiniu.returnToken(this.props.uploadConfig);
        this.state.qiniu.token = token;
      }
      return isFormat;
    }
  }, {
    key: 'onChange',
    value: function onChange(info) {
      var _this3 = this;

      // console.log("upload onChange this.state.files",this.state.files,info)
      clearTimeout(this.state.upReceiverFun);
      var fileList = info.fileList;

      fileList = fileList.filter(function (f) {
        return !f.length;
      });
      var url = "";
      if (this.props.fileType == "image") {
        url = _publicDatas.PRO_URL.QINIU_IMG_DOMAIN_URL || this.props.uploadConfig.QINIU_IMG_DOMAIN_URL;
      } else if (this.props.fileType == "video" || this.props.fileType == "audio") {
        url = _publicDatas.PRO_URL.QINIU_DOMAIN_VIDEO_URL || this.props.uploadConfig.QINIU_DOMAIN_VIDEO_URL;
      }
      //读取远程路径并显示链接
      fileList = fileList.map(function (file) {
        if (file.response) {
          // 组件会将 file.url 作为链接进行展示
          file.url = url + "/" + file.response.key;
          // file.key=PRO_COMMON.String.RndNum(10);
        }
        if (!file.length) {
          return file;
        }
      });
      var _this = this;
      //按照服务器返回信息筛选成功上传的文件
      // let cloneList=_.cloneDeep(_this.state.files);
      fileList = fileList.filter(function (file) {
        //根据多选选项更新添加内容
        var hasNoExistCurrFileInUploadedList = !~_lodash2.default.findIndex(_this.state.files, function (item) {
          return item.name === file.name;
        });
        if (hasNoExistCurrFileInUploadedList) {
          if (!!_this.props.isMultiple == true) {
            _this.state.files.push(file);
          } else {
            _this.state.files = [file];
          }
        }
        if (!!file.response) {
          //上传列表数量的限制，只显示最近上传的限制个数，旧的会被新的顶掉
          if (!!_this.props.limit && _this.state.files.length > _this.props.limit) {
            _antd.message.info('\u53EA\u80FD\u4FDD\u7559\u6700\u540E\u4E0A\u4F20\u7684 ' + _this.props.limit + ' \u4E2A\u6587\u4EF6\uFF0C\u5176\u4ED6\u8D85\u51FA\u7684\u5DF2\u7ECF\u88AB\u9876\u6389\u3002', 5);
            _publicDatas.PRO_COMMON.Array.removeByIndex(_this.state.files, 0);
          }
        }
        return !!file.response;
      });
      _this.forceUpdate();
      // console.log("upload _this.state.files",_this.state.files);
      // this.setState({files: _this.state.files});
      this.state.upReceiverFun = setTimeout(function () {
        //限制频繁调用组件制定的cbReceiver
        // console.log("upload this.state.files",this.state.files)
        if (!!_this3.state.files && _this3.state.files.length == 0) {
          return false;
        }
        _this3.props.cbReceiver(_this3.state.files);
      }, 1000);
    }
  }, {
    key: 'supportFileType',
    value: function supportFileType(props, propName, componentName) {
      componentName = componentName || 'ANONYMOUS';
      if (props[propName]) {
        var value = props[propName];
        if (typeof value === 'string') {
          var isInSupport = !!_publicDatas.PRO_QINIU.supportMime[value];
          return isInSupport ? null : new Error(propName + ' in ' + componentName + "不合法的上传资源类型！");
        }
      } else {
        throw new Error(propName + ' in ' + componentName + "必须填写fileType（字符串型）：image或video或audio！");
        return false;
      }
      // assume all ok
      return null;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.log("componentWillReceiveProps",nextProps.fileList,this.state.files);
      // console.log("isEqual",_.isEqual(nextProps.fileList, this.state.files));
      if (_lodash2.default.isEqual(nextProps.fileList, this.state.files)) {
        return false;
      }
      if (nextProps.isOpenModel) {
        // console.log("我是变化",nextProps.isOpenImg);
        // this.setState({
        //   files:[]
        // })
        this.state.files = [];
        this.forceUpdate();
      }
      // console.log("componentWillReceiveProps 图片有更新：", nextProps.fileList, this.state.files);
      var list = [];
      if (this.state.files.length) {
        list = this.state.files.copyWithin(0);
      } else {
        list = _lodash2.default.cloneDeep(nextProps.fileList);
      }
      if (!!list) {
        _publicDatas.PRO_COMMON.obj.refsKeyTo(list, "uid");
        this.setState({ files: list });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var properties = this.props,
          that = this,
          uploadProps = {
        action: _publicDatas.PRO_URL.QINIU_URL || this.props.uploadConfig.QINIU_URL,
        onChange: this.onChange.bind(this),
        listType: 'picture',
        fileList: this.state.files,
        data: function data(file) {
          //支持自定义保存文件名、扩展名支持
          var token = that.state.qiniu.token,
              key = "";
          if (!token) {
            token = _publicDatas.PRO_QINIU.checkQiniu.returnToken(_this4.props.uploadConfig);
          }
          key = _publicDatas.PRO_COMMON.String.RndNum(20) + "." + _publicDatas.PRO_COMMON.String.GetFileExtensionName(file.name)[0];
          return { token: token, key: key };
        },
        multiple: properties.isMultiple || false,
        beforeUpload: this.beforeUpload.bind(this),
        showUploadList: properties.isShowUploadList != undefined ? properties.isShowUploadList : true
      };
      // console.log("uploadProps",uploadProps);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Upload,
          uploadProps,
          _react2.default.createElement(
            _antd.Button,
            null,
            _react2.default.createElement(_antd.Icon, { type: 'upload' }),
            '\u70B9\u51FB\u4E0A\u4F20'
          )
        ),
        _react2.default.createElement(
          'span',
          null,
          (this.props.limit > 1 ? "最多" : "只") + '\u53EF\u4EE5\u4E0A\u4F20 ' + this.props.limit + ' \u4E2A\u7C7B\u578B\u4E3A ' + _publicDatas.PRO_QINIU.supportMime[this.props.fileType].join("、") + ' \u7684 ' + this.props.fileType + ' \u6587\u4EF6\u3002' + (this.props.fileType == "image" ? "推荐安装“Hover Zoom+”扩展支持，安装方法点击系统首页。" : "" + this.props.description)
        )
      );
    }
  }]);

  return UploadImage;
}(_react.Component);

UploadImage.propTypes = {
  cbReceiver: _react2.default.PropTypes.func.isRequired,
  limit: _react2.default.PropTypes.number,
  isMultiple: _react2.default.PropTypes.bool,
  isShowUploadList: _react2.default.PropTypes.bool,
  fileType: UploadImage.prototype.supportFileType,
  description: _react2.default.PropTypes.string,
  fileList: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({ url: _react2.default.PropTypes.string.isRequired, thumbUrl: _react2.default.PropTypes.string, name: _react2.default.PropTypes.string })),
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

UploadImage.defaultProps = {
  limit: 1,
  isMultiple: false,
  isShowUploadList: true,
  fileType: "image",
  description: "请根据要求上传。"
};

module.exports = UploadImage;