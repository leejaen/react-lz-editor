'use strict';

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UploadImage = require('./UploadImage');

var _UploadImage2 = _interopRequireDefault(_UploadImage);

var _publicDatas = require('../../supports/publicDatas');

var _remove = require('lodash/remove');

var _remove2 = _interopRequireDefault(_remove);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

var _compact = require('lodash/compact');

var _compact2 = _interopRequireDefault(_compact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupUpload = function (_Component) {
  _inherits(GroupUpload, _Component);

  function GroupUpload(props) {
    _classCallCheck(this, GroupUpload);

    var _this = _possibleConstructorReturn(this, (GroupUpload.__proto__ || Object.getPrototypeOf(GroupUpload)).call(this, props));

    _this.state = {
      showPictureSeletor: false,
      pictureList: _this.props.imageList || [],
      selectedPictureList: [],
      isAutoWaterMark: false,
      selectedWaterMarkType: "white_big",
      selectedWaterMarkPositon: "SouthEast",
      isAutoSize: true
    };
    _this.openModal = _this.openModal.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    _this.handlePictureSeletorOK = _this.handlePictureSeletorOK.bind(_this);
    _this.getPictures = _this.getPictures.bind(_this);
    _this.onSelectPicture = _this.onSelectAPicture.bind(_this);
    _this.autoWaterMark = _this.autoWaterMark.bind(_this);
    _this.chooseWaterMake = _this.chooseWaterMake.bind(_this);
    _this.chooseWaterMakePosition = _this.chooseWaterMakePosition.bind(_this);
    _this.onAutoSizeChange = _this.onAutoSizeChange.bind(_this);

    _this.getPfop = _this.getPfop.bind(_this);
    _this.getPfopPictures = _this.getPfopPictures.bind(_this);
    return _this;
  }

  _createClass(GroupUpload, [{
    key: 'onAutoSizeChange',
    value: function onAutoSizeChange(e) {
      this.setState({ onAutoSizeChange: e.target.checked });
    }
  }, {
    key: 'chooseWaterMake',
    value: function chooseWaterMake(value) {
      this.setState({ selectedWaterMarkType: value });
    }
  }, {
    key: 'chooseWaterMakePosition',
    value: function chooseWaterMakePosition(value) {
      this.setState({ selectedWaterMarkPositon: value });
    }
  }, {
    key: 'autoWaterMark',
    value: function autoWaterMark(e) {
      this.setState({ isAutoWaterMark: e.target.checked });
    }
  }, {
    key: 'onSelectAPicture',
    value: function onSelectAPicture(e, item) {
      if (e.target.checked) {
        this.state.selectedPictureList.push(item);
      } else {
        (0, _remove2.default)(this.state.selectedPictureList, function (n) {
          return n == item;
        });
      }
      this.state.selectedPictureList = (0, _uniq2.default)(this.state.selectedPictureList);
      this.forceUpdate();
    }
  }, {
    key: 'handlePictureSeletorOK',
    value: function handlePictureSeletorOK() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({ showPictureSeletor: false });
      }, 600);
      if (this.state.isAutoWaterMark == true) {
        setTimeout(function () {
          _this2.getPfop();
        }, 300);
      } else {
        setTimeout(function () {
          _this2.props.receiveSelectedPictures(_this2.state.selectedPictureList);
        }, 400);
      }
    }
  }, {
    key: 'getPfop',
    value: function getPfop() {
      var _this3 = this;

      var newPicturesObj = this.state.selectedPictureList.map(function (item) {
        if (!!item && !~item.lastIndexOf("reset")) {
          var originKey = (item + "").split("").reverse().join("");
          originKey = originKey.substr(originKey.lastIndexOf("?") + 1);
          originKey = originKey.substr(0, originKey.indexOf("/"));
          originKey = originKey.split("").reverse().join("");

          var extensionNameItem = originKey.match(/\.[^\.]*/g),
              extensionName = "";
          if (!!extensionNameItem && extensionNameItem.length > 0) {
            extensionName = extensionNameItem[0];
          }
          var originKeyItem = originKey.match(/^[^/\.]*/g);
          if (!!originKeyItem && originKeyItem.length > 0) {
            originKey = originKeyItem[0];
          }
          var thumbnail = "";

          if (_this3.state.isAutoSize) {
            if (_this3.props.atuoSize[0] == 0 && _this3.props.atuoSize[1] == 0) {
              thumbnail = 'imageMogr2/thumbnail/600x600>|';
            } else if (_this3.props.atuoSize[0] == 0) {
              thumbnail = 'imageMogr2/thumbnail/x' + _this3.props.atuoSize[1] + '>|';
            } else if (_this3.props.atuoSize[1] == 0) {
              thumbnail = 'imageMogr2/thumbnail/' + _this3.props.atuoSize[0] + 'x>|';
            } else {
              thumbnail = 'imageMogr2/thumbnail/' + _this3.props.atuoSize[0] + 'x' + _this3.props.atuoSize[1] + '>|';
            }
          }
          return {
            "originPic": item + "?" + thumbnail + "watermark/1/gravity/" + _this3.state.selectedWaterMarkPositon + "/image/" + (0, _find2.default)(_publicDatas.PRO_BASE.Config.watermarkImage, function (item) {
              return item.type == _this3.state.selectedWaterMarkType;
            }).valuebase64 + "/dx/50/dy/50",
            "newName": (~originKey.lastIndexOf("QN1D") ? originKey : originKey + "QN1D" + new Date().getMilliseconds() + _this3.state.selectedWaterMarkPositon) + (extensionName || ""),
            "key": originKey,
            "extensionName": extensionName
          };
        } else {
          return { originPic: "" };
        }
      });

      newPicturesObj = (0, _compact2.default)(newPicturesObj);

      var refObj = (0, _clone2.default)(newPicturesObj);
      (0, _remove2.default)(newPicturesObj, function (item) {
        return !item.originPic;
      });
      var removedPic = (0, _remove2.default)(newPicturesObj, function (item) {
        return !!~item.originPic.lastIndexOf("QN1D");
      });

      if (newPicturesObj.length > 0) {
        this.getPfopPictures(newPicturesObj);
      }

      var pictureList = refObj.map(function (item) {
        var domain = "",
            picture = "";
        if (!!item.originPic) {
          domain = item.originPic.substr(0, item.originPic.lastIndexOf(item.key));
          picture = domain + item.newName;
        } else {
          picture = "";
        }
        return picture;
      });

      _message2.default.info(this.props.lang.inPfopProgress, 10);
      setTimeout(function () {
        _this3.props.receiveSelectedPictures(pictureList);
      }, 100);
    }
  }, {
    key: 'getPfopPictures',
    value: function getPfopPictures(pictures) {
      var _this4 = this;

      _publicDatas.PRO_REQUEST.ajax.fetchData(this.props.uploadConfig.QINIU_PFOP, {
        "list": pictures
      }, function (data) {
        _this4.gotPfopPictures(data);
      });
    }
  }, {
    key: 'gotPfopPictures',
    value: function gotPfopPictures(theData) {
      if (theData.rc == "0") {
        return function (dispatch) {};
      } else {
        _message2.default.error(this.props.lang.pfopError + theData.des, 5);
      }
    }
  }, {
    key: 'getPictures',
    value: function getPictures(listPicture) {
      var newPictures = listPicture.map(function (item) {
        if (_typeof(item.url) != undefined) {
          return item.url;
        }
      });
      this.state.pictureList = (0, _compact2.default)(this.state.pictureList.concat(newPictures));
      this.state.pictureList = (0, _uniq2.default)(this.state.pictureList);
      this.state.selectedPictureList = (0, _cloneDeep2.default)(this.state.pictureList);

      this.forceUpdate();
    }
  }, {
    key: 'openModal',
    value: function openModal() {
      this.setState({ showPictureSeletor: true });
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      this.setState({ showPictureSeletor: false });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(prevProps, nextProps) {
      if (!!nextProps && nextProps.hasOwnProperty("imageList")) {
        this.setState({ pictureList: nextProps.imageList, selectedPictureList: (0, _cloneDeep2.default)(nextProps.imageList) });
      } else {
        this.setState({ pictureList: [], selectedPictureList: [] });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.atuoSize[0] <= 300 && this.props.atuoSize[0] != 0 || this.props.atuoSize[1] <= 64 && this.props.atuoSize[1] != 0) {
        this.setState({ selectedWaterMarkType: "white_small" });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props = this.props,
          lang = _props.lang,
          watermarkImage = _props.watermarkImage,
          atuoSize = _props.atuoSize;

      return _react2.default.createElement(
        'span',
        null,
        function () {
          if (!_this5.props.children) {
            return _react2.default.createElement(
              _button2.default,
              { onClick: _this5.openModal },
              lang.btnAddBatch
            );
          } else {
            var childrenWithProps = _react2.default.Children.map(_this5.props.children, function (child) {
              return _react2.default.cloneElement(child, { onClick: _this5.openModal });
            });
            return childrenWithProps;
          }
        }(),
        _react2.default.createElement(
          _modal2.default,
          {
            title: _react2.default.createElement(
              'span',
              null,
              ' ',
              _react2.default.createElement(
                'span',
                null,
                lang.batchAddModalTitle
              ),
              ' \xA0 \xA0 \xA0 \xA0',
              _react2.default.createElement(
                _checkbox2.default,
                { onChange: this.autoWaterMark,
                  disabled: !watermarkImage || watermarkImage.length == 0 },
                ' ',
                lang.chkAutoWaterMask,
                ' '
              ),
              '\xA0\xA0\xA0\xA0',
              _react2.default.createElement(
                _select2.default,
                { size: 'small',
                  disabled: !this.state.isAutoWaterMark || !watermarkImage || watermarkImage.length == 0,
                  defaultValue: this.state.selectedWaterMarkType,
                  style: { width: 100 },
                  onChange: this.chooseWaterMake },
                watermarkImage && watermarkImage.map(function (item) {
                  return _react2.default.createElement(
                    _select2.default.Option,
                    { value: item.type },
                    item.tip
                  );
                })
              ),
              '\xA0\xA0\xA0\xA0',
              _react2.default.createElement(
                _select2.default,
                { size: 'small',
                  disabled: !this.state.isAutoWaterMark || !watermarkImage || watermarkImage.length == 0,
                  defaultValue: this.state.selectedWaterMarkPositon,
                  style: { width: 100 },
                  onChange: this.chooseWaterMakePosition },
                _react2.default.createElement(
                  _select2.default.OptGroup,
                  { label: lang.watermarkPos.north },
                  _react2.default.createElement(
                    _select2.default.Option,
                    { value: 'NorthWest' },
                    lang.watermarkPos.northWest
                  ),
                  _react2.default.createElement(
                    _select2.default.Option,
                    { value: 'North' },
                    lang.watermarkPos.northCenter
                  ),
                  _react2.default.createElement(
                    _select2.default.Option,
                    { value: 'NorthEast' },
                    ' ',
                    lang.watermarkPos.northEast,
                    ' '
                  )
                ),
                _react2.default.createElement(
                  _select2.default.OptGroup,
                  { label: lang.watermarkPos.center },
                  _react2.default.createElement(
                    _select2.default.Option,
                    { value: 'West' },
                    lang.watermarkPos.west
                  ),
                  _react2.default.createElement(
                    _select2.default.Option,
                    { value: 'Center' },
                    lang.watermarkPos.centerCenter
                  ),
                  _react2.default.createElement(
                    _select2.default.Option,
                    { value: 'East' },
                    ' ',
                    lang.watermarkPos.east,
                    ' '
                  )
                ),
                _react2.default.createElement(
                  _select2.default.OptGroup,
                  { label: lang.watermarkPos.south },
                  _react2.default.createElement(
                    _select2.default.Option,
                    { value: 'SouthWest' },
                    lang.watermarkPos.southWest
                  ),
                  _react2.default.createElement(
                    _select2.default.Option,
                    { value: 'South' },
                    lang.watermarkPos.southCenter
                  ),
                  _react2.default.createElement(
                    _select2.default.Option,
                    { value: 'SouthEast' },
                    ' ',
                    lang.watermarkPos.southEast,
                    ' '
                  )
                )
              ),
              '\xA0\xA0\xA0\xA0',
              atuoSize ? _react2.default.createElement(
                _checkbox2.default,
                { onChange: this.onAutoSizeChange, defaultChecked: this.state.isAutoSize },
                lang.zoomTipMsg.replace("$accordingSize$", atuoSize[0] == 0 ? lang.height : lang.width).replace("$targetSize$", (atuoSize[0] || lang.auto) + "*" + (atuoSize[1] || lang.auto))
              ) : null
            ),
            visible: this.state.showPictureSeletor,
            onCancel: this.closeModal,
            closable: false,
            maskClosable: false,
            width: 1000,
            footer: [_react2.default.createElement(
              _button2.default,
              { key: 'back',
                size: 'large',
                onClick: this.closeModal },
              ' ',
              lang.cancelText,
              ' '
            ), _react2.default.createElement(
              _button2.default,
              { key: 'submit',
                type: 'primary',
                size: 'large',
                disabled: this.state.selectedPictureList.length == 0,
                onClick: this.handlePictureSeletorOK },
              ' ',
              lang.OKText,
              ' '
            )] },
          _react2.default.createElement(
            'div',
            { className: 'picture-list' },
            this.state.pictureList.length === 0 ? _react2.default.createElement(
              'div',
              null,
              lang.pleaseUploading
            ) : _react2.default.createElement(
              'div',
              null,
              this.state.pictureList.map(function (item) {
                return _react2.default.createElement(
                  _checkbox2.default,
                  {
                    key: item,
                    value: item,
                    defaultChecked: true,
                    onChange: function onChange(e) {
                      _this5.onSelectAPicture(e, item);
                    } },
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('img', { style: {
                      width: "100px"
                    }, src: item })
                );
              })
            ),
            _react2.default.createElement(_UploadImage2.default, {
              id: 'pictures',
              fileList: this.state.pictureList.map(function (item) {
                return { url: item };
              }),
              isOpenModel: this.state.showPictureSeletor,
              cbReceiver: this.getPictures,
              isMultiple: true,
              isShowUploadList: true,
              uploadConfig: this.props.uploadConfig,
              limit: this.props.limitCount || 10,
              uploadProps: this.props.uploadProps,
              lang: lang })
          )
        )
      );
    }
  }]);

  return GroupUpload;
}(_react.Component);

var propertys = function propertys(state) {
  return {};
};

module.exports = GroupUpload;