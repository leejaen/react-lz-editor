'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/message/style/css');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _decoratorStyle = require('./decoratorStyle.css');

var _decoratorStyle2 = _interopRequireDefault(_decoratorStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageSpan = function (_Component) {
  _inherits(ImageSpan, _Component);

  function ImageSpan(props) {
    _classCallCheck(this, ImageSpan);

    var _this = _possibleConstructorReturn(this, (ImageSpan.__proto__ || Object.getPrototypeOf(ImageSpan)).call(this, props));

    var entity = _draftJs.Entity.get(_this.props.entityKey);

    var _entity$getData = entity.getData(),
        width = _entity$getData.width,
        height = _entity$getData.height;

    _this.state = {
      width: width,
      height: height,
      imageSrc: ''
    };
    _this.onImageClick = _this._onImageClick.bind(_this);
    _this.onDoubleClick = _this._onDoubleClick.bind(_this);
    return _this;
  }

  _createClass(ImageSpan, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _state = this.state,
          width = _state.width,
          height = _state.height;

      var entity = _draftJs.Entity.get(this.props.entityKey);
      var image = new Image();

      var _entity$getData2 = entity.getData(),
          src = _entity$getData2.src;

      src = src.replace(/[-?*!].*$/g, "");
      this.setState({ imageSrc: src });
      image.src = this.state.imageSrc;
      image.onload = function () {
        if (width == null || height == null) {
          _this2.setState({ width: image.width, height: image.height });
          _draftJs.Entity.mergeData(_this2.props.entityKey, {
            width: image.width,
            height: image.height,
            originalWidth: image.width,
            originalHeight: image.height
          });
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          width = _state2.width,
          height = _state2.height;

      var key = this.props.entityKey;
      var entity = _draftJs.Entity.get(key);

      var _entity$getData3 = entity.getData(),
          src = _entity$getData3.src;

      var imageStyle = {
        verticalAlign: 'bottom',
        backgroundImage: 'url("' + this.state.imageSrc + '")',
        backgroundSize: width + 'px ' + height + 'px',
        lineHeight: height + 'px',
        fontSize: height + 'px',
        width: width,
        height: height,
        letterSpacing: width
      };

      return _react2.default.createElement(
        'div',
        { className: 'editor-inline-image', onClick: this._onClick },
        _react2.default.createElement('img', { src: '' + this.state.imageSrc, className: 'media-image', onClick: function onClick(event) {
            _this3.onImageClick(event, key);event.stopPropagation();
          }, onDoubleClick: this.onDoubleClick })
      );
    }
  }, {
    key: '_onDoubleClick',
    value: function _onDoubleClick() {
      var currentPicture = _reactDom2.default.findDOMNode(this).querySelector("img");
      var pictureWidth = currentPicture.naturalWidth;
      var pictureSrc = currentPicture.src;
    }
  }, {
    key: '_onImageClick',
    value: function _onImageClick(e, key) {
      var currentPicture = _reactDom2.default.findDOMNode(this).querySelector("img");

      var pictureWidth = currentPicture.naturalWidth;


      var editorState = _draftJs.EditorState.createEmpty();
      var selection = editorState.getSelection();

      var blockTree = editorState.getBlockTree(this.props.children[0].key);

      if (pictureWidth == 0) {
        _message2.default.error("图片地址错误！");
      } else if (pictureWidth > 650) {
        _message2.default.error("图片尺寸过大将会导致用户流量浪费！请调整至最大650px。", 10);
      }
    }
  }, {
    key: '_handleResize',
    value: function _handleResize(event, data) {
      var _data$size = data.size,
          width = _data$size.width,
          height = _data$size.height;

      this.setState({ width: width, height: height });
      _draftJs.Entity.mergeData(this.props.entityKey, { width: width, height: height });
    }
  }]);

  return ImageSpan;
}(_react.Component);

exports.default = ImageSpan;


ImageSpan.defaultProps = {
  children: null,
  entityKey: "",
  className: ""
};