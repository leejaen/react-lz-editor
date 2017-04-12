'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _decoratorStyle = require('./decoratorStyle.css');

var _decoratorStyle2 = _interopRequireDefault(_decoratorStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoSpan = function (_Component) {
  _inherits(VideoSpan, _Component);

  function VideoSpan(props) {
    _classCallCheck(this, VideoSpan);

    var _this = _possibleConstructorReturn(this, (VideoSpan.__proto__ || Object.getPrototypeOf(VideoSpan)).call(this, props));

    var entity = _draftJs.Entity.get(_this.props.entityKey);

    var _entity$getData = entity.getData(),
        width = _entity$getData.width,
        height = _entity$getData.height;

    _this.state = {
      width: width,
      height: height
    };
    return _this;
  }

  _createClass(VideoSpan, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _state = this.state,
          width = _state.width,
          height = _state.height;

      var entity = _draftJs.Entity.get(this.props.entityKey);
      var video = document.createElement('video');

      var _entity$getData2 = entity.getData(),
          src = _entity$getData2.src;

      video.src = src;
      video.onload = function () {
        if (width == null || height == null) {
          _this2.setState({ width: video.width, height: video.height });
          _draftJs.Entity.mergeData(_this2.props.entityKey, {
            width: video.width,
            height: video.height,
            originalWidth: video.width,
            originalHeight: video.height
          });
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          width = _state2.width,
          height = _state2.height;

      var entity = _draftJs.Entity.get(this.props.entityKey);

      var _entity$getData3 = entity.getData(),
          src = _entity$getData3.src;

      var videoStyle = {
        verticalAlign: 'bottom',
        backgroundImage: 'url("' + src + '")',
        backgroundSize: width + 'px ' + height + 'px',
        lineHeight: height + 'px',
        fontSize: height + 'px',
        width: width,
        height: height,
        letterSpacing: width
      };

      return _react2.default.createElement(
        'figure',
        { className: 'editor-inline-video', onClick: this._onClick },
        _react2.default.createElement('video', { controls: 'controls', src: '' + src, className: 'media-video' })
      );
    }
  }, {
    key: '_onClick',
    value: function _onClick() {}
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

  return VideoSpan;
}(_react.Component);

exports.default = VideoSpan;


VideoSpan.defaultProps = {
  children: null,
  entityKey: "",
  className: ""
};