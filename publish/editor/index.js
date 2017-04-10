'use strict';

var _css = require('antd/lib/affix/style/css');

var _affix = require('antd/lib/affix');

var _affix2 = _interopRequireDefault(_affix);

var _css2 = require('antd/lib/modal/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css3 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _css4 = require('antd/lib/message/style/css');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./components.css');

require('../global/supports/resources/system.css');

require('antd/dist/antd.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _utils = require('./utils');

var _getSelectedBlocks = require('./utils/stateUtils/getSelectedBlocks');

var _getSelectedBlocks2 = _interopRequireDefault(_getSelectedBlocks);

var _publicDatas = require('../global/supports/publicDatas');

var _LinkDecorator = require('./decorators/LinkDecorator');

var _LinkDecorator2 = _interopRequireDefault(_LinkDecorator);

var _ImageDecorator = require('./decorators/ImageDecorator');

var _ImageDecorator2 = _interopRequireDefault(_ImageDecorator);

var _VideoDecorator = require('./decorators/VideoDecorator');

var _VideoDecorator2 = _interopRequireDefault(_VideoDecorator);

var _AudioDecorator = require('./decorators/AudioDecorator');

var _AudioDecorator2 = _interopRequireDefault(_AudioDecorator);

var _mediaImageUploader = require('./toolBar/mediaImageUploader');

var _mediaImageUploader2 = _interopRequireDefault(_mediaImageUploader);

var _medioVideoUploader = require('./toolBar/medioVideoUploader');

var _medioVideoUploader2 = _interopRequireDefault(_medioVideoUploader);

var _medioAudioUploader = require('./toolBar/medioAudioUploader');

var _medioAudioUploader2 = _interopRequireDefault(_medioAudioUploader);

var _colorControls = require('./toolBar/colorControls');

var _colorControls2 = _interopRequireDefault(_colorControls);

var _autoSaveList = require('./toolBar/autoSaveList');

var _autoSaveList2 = _interopRequireDefault(_autoSaveList);

var _styleButton = require('./toolBar/styleButton');

var _styleButton2 = _interopRequireDefault(_styleButton);

var _blockStyleControls = require('./toolBar/blockStyleControls');

var _blockStyleControls2 = _interopRequireDefault(_blockStyleControls);

var _alignmentControls = require('./toolBar/alignmentControls');

var _alignmentControls2 = _interopRequireDefault(_alignmentControls);

var _inlineStyleControls = require('./toolBar/inlineStyleControls');

var _inlineStyleControls2 = _interopRequireDefault(_inlineStyleControls);

var _pasteNoStyleControls = require('./toolBar/pasteNoStyleControls');

var _pasteNoStyleControls2 = _interopRequireDefault(_pasteNoStyleControls);

var _urlControls = require('./toolBar/urlControls');

var _cookieControls = require('./toolBar/cookieControls');

var _removeStyleControls = require('./toolBar/removeStyleControls');

var _removeStyleControls2 = _interopRequireDefault(_removeStyleControls);

var _undoredoControls = require('./toolBar/undoredoControls');

var _undoredoControls2 = _interopRequireDefault(_undoredoControls);

var _colorConfig = require('./utils/colorConfig');

var _ExtendedRichUtils = require('./utils/ExtendedRichUtils');

var _ExtendedRichUtils2 = _interopRequireDefault(_ExtendedRichUtils);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _trim = require('lodash/trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lizhen on 4/26/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default, _VideoDecorator2.default, _AudioDecorator2.default]);

var EditorConcist = function (_React$Component) {
  _inherits(EditorConcist, _React$Component);

  function EditorConcist(props) {
    _classCallCheck(this, EditorConcist);

    var _this = _possibleConstructorReturn(this, (EditorConcist.__proto__ || Object.getPrototypeOf(EditorConcist)).call(this, props));

    _this.state = {
      openFullTest: "全屏",
      showSourceEditor: "源码",
      showURLInput: false,
      urlValue: '',
      hasPasted: false,
      autoSaveFun: null,
      visible: false,
      showMarkdownSource: false,
      tempSouceContent: "",

      editorState: function () {
        var originalString = _this.props.importContent;
        originalString = !originalString ? " " : originalString;
        if (!originalString) {
          //暂时不走createEmpty，有错。空的话给个空格规避
          //this.state.alwaysEnterEmpty = true;
          return _draftJs.EditorState.createEmpty(decorator);
        } else {
          // let contentDomElement= document.createElement('div'); contentDomElement.innerHTML= this.props.importContent;//转换成dom
          // element
          var ConvertFormatProps = _this.props.convertFormat;
          var contentState = void 0;
          if (ConvertFormatProps === 'html') {
            contentState = (0, _utils.stateFromHTML)(originalString);
          } else if (ConvertFormatProps === 'markdown') {
            // console.log("markdown originalString",originalString)
            contentState = (0, _utils.stateFromMD)(originalString);
          } else if (ConvertFormatProps === 'raw') {
            originalString = originalString.replace(/\s/g, "") ? originalString : "{}";
            var rawContent = JSON.parse(originalString);
            if ((0, _isEmpty2.default)(rawContent)) {
              return _draftJs.EditorState.createWithContent("", decorator);
            }
            contentState = (0, _draftJs.convertFromRaw)(rawContent);
          }
          return _draftJs.EditorState.createWithContent(contentState, decorator);
        }
      }()
    };

    // this.focus = () => this.refs.editor.focus();//使用babel转码之后不是react组件不能用refs方式
    _this.onChange = function (editorState) {
      _this.setState({ editorState: editorState });
      var that = _this;
      if (that.timer) {
        clearTimeout(that.timer);
      }
      that.timer = setTimeout(function () {
        //状态转对象
        var rawContentState = that.state.editorState.getCurrentContent();
        //const rawContent = convertToRaw(rawContentState);
        // console.log('rawContentState', rawContentState);
        var content = void 0;
        var ConvertFormatProps = that.props.convertFormat;
        if (ConvertFormatProps === 'html') {
          content = (0, _utils.stateToHTML)(rawContentState);
        } else if (ConvertFormatProps === 'markdown') {
          content = (0, _utils.stateToMD)(rawContentState);
        } else if (ConvertFormatProps === 'raw') {
          var rawContent = (0, _draftJs.convertToRaw)(rawContentState);
          content = JSON.stringify(rawContent);
        }
        that.props.cbReceiver(content); //富文本编辑器在设置active是true时，不可使用forceUpdate，否则会造成无法选中文本的问题！
      }, 300);
    };

    _this.handleKeyCommand = function (command) {
      return _this._handleKeyCommand(command);
    };
    _this.toggleBlockType = function (type) {
      return _this._toggleBlockType(type);
    };
    _this.toggleAlignment = function (type) {
      return _this._toggleAlignment(type);
    };
    _this.toggleInlineStyle = function (style) {
      return _this._toggleInlineStyle(style);
    };
    _this.customKeyBinding = _this._customKeyBinding.bind(_this);
    _this.handlePastedText = _this._handlePastedText.bind(_this);

    /*视频音频图片*/
    _this.logState = function () {
      var content = _this.state.editorState.getCurrentContent();
      //  console.log(convertToRaw(content));
    };

    _this.addMedia = _this._addMedia.bind(_this);
    _this.addAudio = _this._addAudio.bind(_this);
    _this.addImage = _this._addImage.bind(_this);
    _this.addVideo = _this._addVideo.bind(_this);
    _this.undoRedo = _this._undoRedo.bind(_this);
    _this.removeStyle = _this._removeStyle.bind(_this);
    _this.pasteNoStyle = _this._pasteNoStyle.bind(_this);
    _this.choiceAutoSave = _this._choiceAutoSave.bind(_this);

    _this.toggleColor = function (toggledColor) {
      return _this._toggleColor(toggledColor);
    };

    _this.promptForLink = _this._promptForLink.bind(_this);
    _this.onURLChange = function (e) {
      return _this.setState({ urlValue: e.target.value });
    };
    _this.confirmLink = _this._confirmLink.bind(_this);
    _this.onLinkInputKeyDown = _this._onLinkInputKeyDown.bind(_this);
    _this.removeLink = _this._removeLink.bind(_this);
    _this.openFull = _this._openFull.bind(_this);
    _this.toggleSource = _this._toggleSource.bind(_this);
    _this.handleOk = _this.handleOk.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.solidHtml = _this._solidHtml.bind(_this);
    _this.changeMrakdownContent = _this._changeMrakdownContent.bind(_this);
    return _this;
  }

  _createClass(EditorConcist, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var content = this.props.importContent;
      // const decorator = new CompositeDecorator([
      //   LinkDecorator,
      //   ImageDecorator
      // ]);
      var contentState = (0, _utils.stateFromHTML)(content);
      //  console.log("componentDidMount content",content);
      //  console.log("componentDidMount contentState",JSON.stringify(contentState));
      // let values = EditorState.createWithContent(contentState, decorator);
      // this.state.editorState = values;
      this.state.autoSaveFun = setInterval(function () {
        //每分钟自动保存草稿一次
        _this2.handleKeyCommand("editor-save");
      }, 60000);
    } // 此钩子用作编辑时候的回调

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (!newProps.active) {
        return false;
      }
      if (newProps.importContent == this.props.importContent) {
        return false;
      }
      var ConvertFormatProps = this.props.convertFormat;
      var newContent = "";
      // console.log("ConvertFormatProps",ConvertFormatProps)
      if (ConvertFormatProps === "html") {
        newContent = newProps.importContent.replace(/[\s\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]\>/g, ">");
        if (newContent == "undefined" || !newContent) {
          newContent = "<p>&nbsp;</p>";
        }
      } else if (ConvertFormatProps === "markdown") {
        newContent = newProps.importContent || "";
        this.state.tempSouceContent = newContent;
      } else if (ConvertFormatProps === "raw") {
        newContent = newProps.importContent || "{}";
      }
      /*const decorator = new CompositeDecorator([
        LinkDecorator,
        ImageDecorator,
        VideoDecorator,
        AudioDecorator
      ]);*/
      // console.log("newContent",newContent)
      var contentState = void 0;
      if (ConvertFormatProps === 'html') {
        contentState = (0, _utils.stateFromHTML)(newContent);
      } else if (ConvertFormatProps === 'markdown') {
        contentState = (0, _utils.stateFromMD)(newContent);
      } else if (ConvertFormatProps === 'raw') {
        var rawContent = JSON.parse(newContent);
        contentState = (0, _draftJs.convertFromRaw)(rawContent);
      }
      // console.log("contentState",contentState)
      // console.log("componentWillReceiveProps newContent",newContent);
      // console.log("componentWillReceiveProps contentState",JSON.stringify(contentState));
      var values = _draftJs.EditorState.createWithContent(contentState, decorator);
      this.state.editorState = values;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // console.log("componentWillUnmount! this.state.autoSaveFun",this.state.autoSaveFun);
      clearInterval(this.state.autoSaveFun);
    }
  }, {
    key: 'handleOk',
    value: function handleOk() {
      // console.log('点击了确定');
      this.setState({ visible: false });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(e) {
      //  console.log(e);
      this.setState({ visible: false });
    }
  }, {
    key: '_promptForLink',
    value: function _promptForLink(e) {
      e.preventDefault();
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      // console.log("111111selection", selection)
      if (!selection.isCollapsed()) {

        var that = this;
        this.setState({
          showURLInput: true,
          urlValue: '',
          visible: true
        }, function () {
          // setTimeout(() => {
          //     ReactDom.findDOMNode(that.refs.urltext).focus();//使用babel转码之后不是react组件不能用refs方式
          // }, 0);
        });
      } else {
        _message2.default.error("创建链接前请先选中链接文字！", 5);
      }
    }
  }, {
    key: '_confirmLink',
    value: function _confirmLink(e) {
      // console.log("_confirmLink urlValue", urlValue)
      var _state = this.state,
          editorState = _state.editorState,
          urlValue = _state.urlValue;

      var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', { url: urlValue });
      this.setState({
        editorState: _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey),
        showURLInput: false,
        urlValue: ''
      }, function () {
        setTimeout(function () {
          // this.refs.editor.focus()//使用babel转码之后不是react组件不能用refs方式
        }, 0);
      });
    }
  }, {
    key: '_onLinkInputKeyDown',
    value: function _onLinkInputKeyDown(e) {
      if (e.which === 13) {
        this._confirmLink(e);
        return false;
      }
    }
  }, {
    key: '_removeLink',
    value: function _removeLink(e) {
      e.preventDefault();
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        this.setState({
          editorState: _draftJs.RichUtils.toggleLink(editorState, selection, null)
        });
      } else {
        _message2.default.error("移除链接前请先选中链接！", 5);
      }
    }
  }, {
    key: '_openFull',
    value: function _openFull(e) {
      e.preventDefault();
      var ele = document.querySelector(".RichEditor-root"),
          affix = document.querySelector("#text-editor-affix"),
          affixToolBar = document.querySelector("#text-editor-affix>div");
      if (ele.classList.contains("openFullAll")) {
        ele.className = ele.className.replace("openFullAll", "");
        affix.style = "";
        affixToolBar.className = "";
        affixToolBar.style = "";
        this.setState({
          openFullTest: "全屏"
        });
      } else {
        ele.className += ' openFullAll';
        setTimeout(function () {
          affix.style = "width: " + affix.offsetWidth + "px; height: 0; margin-bottom: 70px;";
          affixToolBar.className = "ant-affix";
          affixToolBar.style = "position: fixed; top: 0; left: 0; width: " + affix.offsetWidth + "px;margin: 0 15px 15px;";
        }, 500);
        this.setState({
          openFullTest: "退出全屏"
        });
      }
    }
  }, {
    key: '_toggleSource',
    value: function _toggleSource(e) {
      e.preventDefault();
      var ele = document.querySelector(".RichEditor-root");
      if (ele.classList.contains("showSource")) {
        ele.className = ele.className.replace("showSource", "");
        this.setState({
          showSourceEditor: "源码",
          showMarkdownSource: false
        });
      } else {
        ele.className += ' showSource';
        this.setState({
          showSourceEditor: "预览",
          showMarkdownSource: true
        });
      }
    }
  }, {
    key: '_changeMrakdownContent',
    value: function _changeMrakdownContent(e) {
      var markdownContent = e.target.value;
      // console.log("markdownContent",markdownContent);
      var contentState = (0, _utils.stateFromMD)(markdownContent);
      var values = _draftJs.EditorState.createWithContent(contentState, decorator);
      this.state.tempSouceContent = markdownContent;
      this.state.editorState = values;
      this.forceUpdate();
    }
    //弹窗url，end

  }, {
    key: '_handleKeyCommand',
    value: function _handleKeyCommand(command) {
      // console.log("command",command);
      var editorState = this.state.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (command === 'editor-save' && this.props.autoSave == true) {
        // window.localDB//start20Text
        // let Data=PRO_COMMON.localDB.getter("grab_news_data") || [];

        var rawContentState = editorState.getCurrentContent();
        var content = "",
            newText = "";

        var ConvertFormatProps = this.props.convertFormat;
        if (ConvertFormatProps === 'html') {
          content = (0, _utils.stateToHTML)(rawContentState);
          newText = content.replace(/<[^>]*>|&[^;]*;/g, "");
        } else if (ConvertFormatProps === 'markdown') {
          content = (0, _utils.stateToMD)(rawContentState);
        } else if (ConvertFormatProps === 'raw') {
          var rawContent = (0, _draftJs.convertToRaw)(rawContentState);
          content = JSON.stringify(rawContent);
        }

        if (newText.length < 30) {
          return false;
        }
        var start30Text = newText.substr(0, 30);
        _publicDatas.PRO_COMMON.localDB.setter("$d" + start30Text, content);
        _message2.default.success("编辑器内容已更新到保险库中", 5);
        return true;
      } else if (command === "editor-paste") {
        return true;
      }
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }
  }, {
    key: '_customKeyBinding',
    value: function _customKeyBinding(e) {
      var hasCommandModifier = _draftJs.KeyBindingUtil.hasCommandModifier;

      if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
        return 'editor-save';
      } else if (e.keyCode === 86 /* `V` key */ && hasCommandModifier(e)) {}
      return (0, _draftJs.getDefaultKeyBinding)(e);
    }
  }, {
    key: '_solidHtml',
    value: function _solidHtml(html) {
      // html=html.replace(/"((?:\\.|[^"\\])*)"/g,"");//去掉所有英文单引号里面的内容，比如style="" class=""
      var walk_the_DOM = function walk(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
          walk(node, func);
          node = node.nextSibling;
        }
      };
      var wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      walk_the_DOM(wrapper.firstChild, function (element) {
        if (element.removeAttribute) {
          element.removeAttribute('id');
          element.removeAttribute('style');
          element.removeAttribute('class');
        }
      });
      return wrapper.innerHTML;
    }
  }, {
    key: '_handlePastedText',
    value: function _handlePastedText(text, sourceString) {
      sourceString = this.solidHtml(sourceString);
      // console.log("_handlePastedText text",text);
      // console.log("_handlePastedText sourceString",typeof(sourceString),sourceString);
      if (text == "undefined" && sourceString == "undefined") {
        // console.log("_handlePastedText return false");
        return false;
      }
      if (sourceString == "undefined" || !sourceString) {
        this.pasteNoStyle(text);
        return false;
      }
      var editorState = this.state.editorState;

      var rawContentState = editorState.getCurrentContent();
      var content = "",
          newText = "";

      var ConvertFormatProps = this.props.convertFormat;
      if (ConvertFormatProps === 'html') {
        content = (0, _utils.stateToHTML)(rawContentState);
        newText = content.replace(/<[^>]*>|&[^;]*;/g, "");
      } else if (ConvertFormatProps === 'markdown') {
        content = (0, _utils.stateToMD)(rawContentState);
      } else if (ConvertFormatProps === 'raw') {
        var rawContent = (0, _draftJs.convertToRaw)(rawContentState);
        content = JSON.stringify(rawContent);
      }

      if (this.state.hasPasted === true || (0, _trim2.default)(newText).length > 0) {
        var blockMap = _draftJs.ContentState.createFromText(text.trim()).blockMap;
        var newState = _draftJs.Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);
        this.onChange(_draftJs.EditorState.push(editorState, newState, 'insert-fragment'));
        return true;
      }
      this.state.hasPasted = true;
      var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default, _VideoDecorator2.default, _AudioDecorator2.default]);
      var contentState = "";

      if (ConvertFormatProps === 'html') {
        contentState = (0, _utils.stateFromHTML)(sourceString);
      } else if (ConvertFormatProps === 'markdown') {
        contentState = (0, _utils.stateFromMD)(sourceString);
      } else if (ConvertFormatProps === 'raw') {
        contentState = (0, _draftJs.convertFromRaw)(sourceString);
      }

      var values = _draftJs.EditorState.createWithContent(contentState, decorator);
      this.state.editorState = values;
      _message2.default.success("已经清空样式并成功粘贴，可能部分图片因原网站防盗链功能暂未显示。", 5);
      this.forceUpdate();
      return true; //覆盖编辑器的默认粘贴行为
    }
  }, {
    key: '_toggleBlockType',
    value: function _toggleBlockType(blockType) {
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
    }
  }, {
    key: '_toggleAlignment',
    value: function _toggleAlignment(alignment) {
      //这种方式仅支持的数据类型
      // https://github.com/facebook/draft-js/blob/master/src/model/constants/DraftBlockType.js

      // const {editorState} = this.state;
      // const selection = editorState.getSelection();
      // const contentState = editorState.getCurrentContent();
      // const alignBlock = Modifier.setBlockType(contentState, selection, alignment)
      // this.setState({
      //   editorState: EditorState.push(editorState, alignBlock)
      // })

      // right way:
      this.onChange(_ExtendedRichUtils2.default.toggleAlignment(this.state.editorState, alignment));
    }
  }, {
    key: '_toggleInlineStyle',
    value: function _toggleInlineStyle(inlineStyle) {
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }

    /*视频音频图片*/

  }, {
    key: '_addMedia',
    value: function _addMedia(type, Object) {
      var src = Object.url;
      if (!src) {
        throw new Error("！！！！！！！！！！上传文件错误！！！！！！！！！！");
        return false;
      }
      var entityKey = _draftJs.Entity.create(type, 'IMMUTABLE', { src: src });
      return _draftJs.AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' ');
    }
  }, {
    key: '_addAudio',
    value: function _addAudio(Objects) {
      var that = this;

      Objects.map(function (item, i) {
        setTimeout(function () {
          return that.onChange(that.addMedia('audio', item));
        }, i * 100);
      });
    }
  }, {
    key: '_addImage',
    value: function _addImage(Objects) {
      var that = this;
      // console.log("Objects Objects", Objects);
      Objects.map(function (item, i) {
        setTimeout(function () {
          var imageObj = that.addMedia('image', item);
          // console.log("imageObj",imageObj,JSON.stringify(imageObj));
          return that.onChange(imageObj);
        }, i * 100);
      });
    }
  }, {
    key: '_addVideo',
    value: function _addVideo(Objects) {
      var that = this;
      Objects.map(function (item, i) {
        setTimeout(function () {
          return that.onChange(that.addMedia('video', item));
        }, i * 100);
      });
    }
  }, {
    key: '_pasteNoStyle',
    value: function _pasteNoStyle(sourceString) {
      var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default, _VideoDecorator2.default, _AudioDecorator2.default]);
      var contentState = "";

      var ConvertFormatProps = this.props.convertFormat;
      if (ConvertFormatProps === 'html') {
        sourceString = '<p>' + sourceString.replace(/\n([ \t]*\n)+/g, '</p><p>').replace('\n', '<br />') + '</p>';
        contentState = (0, _utils.stateFromHTML)(sourceString);
      } else if (ConvertFormatProps === 'markdown') {
        contentState = (0, _utils.stateFromMD)(sourceString);
      } else if (ConvertFormatProps === 'raw') {
        contentState = (0, _draftJs.convertFromRaw)(sourceString);
      }
      // console.log("_pasteNoStyle sourceString",sourceString);
      // console.log("_pasteNoStyle contentState",JSON.stringify(contentState));
      var values = _draftJs.EditorState.createWithContent(contentState, decorator);
      this.state.editorState = values;
      this.forceUpdate();
    }
  }, {
    key: '_undoRedo',
    value: function _undoRedo(type) {
      if (this.state.editorState) {
        var newEditorState = null;
        if (type == "undo") {
          newEditorState = _draftJs.EditorState.undo(this.state.editorState);
        } else {
          newEditorState = _draftJs.EditorState.redo(this.state.editorState);
        }
        this.setState({ editorState: newEditorState });
      }
    }
  }, {
    key: '_removeStyle',
    value: function _removeStyle() {
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      var contentState = editorState.getCurrentContent();
      var styles = editorState.getCurrentInlineStyle();

      var removeStyles = styles.reduce(function (state, style) {
        return _draftJs.Modifier.removeInlineStyle(state, selection, style);
      }, contentState);

      var removeBlock = _draftJs.Modifier.setBlockType(removeStyles, selection, 'unstyled');

      this.setState({
        editorState: _draftJs.EditorState.push(editorState, removeBlock)
      });
    }
  }, {
    key: '_choiceAutoSave',
    value: function _choiceAutoSave(savedImportContent) {
      var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default, _VideoDecorator2.default, _AudioDecorator2.default]);
      var ConvertFormatProps = this.props.convertFormat;
      var contentState = "";
      if (ConvertFormatProps === 'html') {
        contentState = (0, _utils.stateFromHTML)(savedImportContent);
      } else if (ConvertFormatProps === 'markdown') {
        contentState = (0, _utils.stateFromMD)(savedImportContent);
      } else if (ConvertFormatProps === 'raw') {
        var rawContent = JSON.parse(savedImportContent);
        contentState = (0, _draftJs.convertFromRaw)(rawContent);
      }

      var values = _draftJs.EditorState.createWithContent(contentState, decorator);
      this.state.editorState = values;
      this.forceUpdate();
    }
  }, {
    key: '_toggleColor',
    value: function _toggleColor(toggledColor) {
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();

      // Let's just allow one color at a time. Turn off all active colors.
      var nextContentState = Object.keys(_colorConfig.colorStyleMap).reduce(function (contentState, color) {
        return _draftJs.Modifier.removeInlineStyle(contentState, selection, color);
      }, editorState.getCurrentContent());

      var nextEditorState = _draftJs.EditorState.push(editorState, nextContentState, 'change-inline-style');
      var currentStyle = editorState.getCurrentInlineStyle();

      // Unset style override for current color.
      if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce(function (state, color) {
          return _draftJs.RichUtils.toggleInlineStyle(state, color);
        }, nextEditorState);
      }

      // If the color is being toggled on, apply it.
      if (!currentStyle.has(toggledColor)) {
        nextEditorState = _draftJs.RichUtils.toggleInlineStyle(nextEditorState, toggledColor);
      }

      this.onChange(nextEditorState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _React$createElement;

      var urlInput = void 0;
      // ref="urltext"
      if (this.state.showURLInput) {
        urlInput = _react2.default.createElement(
          _modal2.default,
          {
            title: '\u8BF7\u8F93\u51FA\u4F60\u8981\u8DF3\u8F6C\u7684\u94FE\u63A5',
            visible: this.state.visible,
            onOk: this.confirmLink,
            onCancel: this.handleCancel,
            closable: false },
          _react2.default.createElement(_input2.default, {
            type: 'text',
            onChange: this.onURLChange,
            value: this.state.urlValue,
            placeholder: 'http:// or https://',
            onKeyDown: this.onLinkInputKeyDown }),
          _react2.default.createElement(
            'span',
            { style: { color: "red" } },
            '\u8BF7\u8F93\u5165\u7B26\u5408\u89C4\u8303\u7684\u7F51\u5740\u94FE\u63A5\uFF08\u4EE5\u201Chttp://\u201D \u6216 \u201Chttps://\u201D\u4E3A\u524D\u5BFC\uFF09'
          )
        );
      }

      var editorState = this.state.editorState;
      // If the user changes block type before entering any text, we can either style the placeholder or hide it. Let's just
      // hide it now.

      var className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }
      // console.log("this.props.undoRedo",this.props.undoRedo)//https://gist.github.com/deanmcpherson/69f9962b744b273ffb64fe294ab71bc4
      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-root editorHidden', content: this.state.HTML, id: 'text-editor-container' },
        _react2.default.createElement(
          _affix2.default,
          { offsetTop: 0, id: 'text-editor-affix' },
          this.state.showMarkdownSource == false && this.props.undoRedo && _react2.default.createElement(_undoredoControls2.default, { onToggle: this.undoRedo }),
          this.state.showMarkdownSource == false && this.props.removeStyle && _react2.default.createElement(_removeStyleControls2.default, { onToggle: this.removeStyle }),
          this.state.showMarkdownSource == false && this.props.pasteNoStyle && _react2.default.createElement(_pasteNoStyleControls2.default, { receiveText: this.pasteNoStyle }),
          this.state.showMarkdownSource == false && this.props.blockStyle && _react2.default.createElement(_blockStyleControls2.default, { editorState: editorState, onToggle: this.toggleBlockType }),
          this.props.alignment && this.props.convertFormat !== "markdown" && _react2.default.createElement(_alignmentControls2.default, { editorState: editorState, onToggle: this.toggleAlignment }),
          this.state.showMarkdownSource == false && this.props.inlineStyle && _react2.default.createElement(_inlineStyleControls2.default, { editorState: editorState, onToggle: this.toggleInlineStyle }),
          this.props.color && this.props.convertFormat !== "markdown" && _react2.default.createElement(_colorControls2.default, { editorState: editorState, onToggle: this.toggleColor }),
          this.state.showMarkdownSource == false && this.props.image && _react2.default.createElement(_mediaImageUploader2.default, { uploadConfig: this.props.uploadConfig, receiveImage: this.addImage }),
          this.state.showMarkdownSource == false && this.props.video && _react2.default.createElement(_medioVideoUploader2.default, { uploadConfig: this.props.uploadConfig, receiveVideo: this.addVideo }),
          this.state.showMarkdownSource == false && this.props.audio && _react2.default.createElement(_medioAudioUploader2.default, { uploadConfig: this.props.uploadConfig, receiveAudio: this.addAudio }),
          this.state.showMarkdownSource == false && this.props.urls && _react2.default.createElement(_urlControls.AddUrl, { editorState: editorState, onToggle: this.promptForLink }),
          this.state.showMarkdownSource == false && this.props.urls && _react2.default.createElement(_urlControls.CloseUrl, { editorState: editorState, onToggle: this.removeLink }),
          this.state.showMarkdownSource == false && this.props.autoSave && _react2.default.createElement(_autoSaveList2.default, { receiveSavedItem: this.choiceAutoSave }),
          this.props.fullScreen && _react2.default.createElement(_cookieControls.OpenFull, { editorState: editorState, onToggle: this.openFull, coverTitle: this.state.openFullTest }),
          this.props.convertFormat == "markdown" && _react2.default.createElement(_cookieControls.SourceEditor, { editorState: editorState, onToggle: this.toggleSource, coverTitle: this.state.showSourceEditor })
        ),
        _react2.default.createElement(
          'div',
          { className: className, onClick: this.focus, style: { display: this.state.showMarkdownSource == true ? "none" : "block" } },
          _react2.default.createElement(_draftJs.Editor, (_React$createElement = {
            blockRendererFn: mediaBlockRenderer,
            editorState: this.state.editorState,
            blockStyleFn: getBlockStyle,
            customStyleMap: styleMap
          }, _defineProperty(_React$createElement, 'customStyleMap', _colorConfig.colorStyleMap), _defineProperty(_React$createElement, 'editorState', editorState), _defineProperty(_React$createElement, 'handleKeyCommand', this.handleKeyCommand), _defineProperty(_React$createElement, 'keyBindingFn', this.customKeyBinding), _defineProperty(_React$createElement, 'onChange', this.onChange), _defineProperty(_React$createElement, 'handlePastedText', this.handlePastedText), _defineProperty(_React$createElement, 'spellCheck', true), _React$createElement))
        ),
        _react2.default.createElement(
          'div',
          { style: { display: this.state.showMarkdownSource == true ? "block" : "none", height: "500px", width: "100%" } },
          _react2.default.createElement('textarea', {
            style: { height: "100%", width: "100%", overflowY: "visible" },
            onChange: this.changeMrakdownContent,
            value: this.state.tempSouceContent || this.props.importContent,
            placeholder: '\u8BF7\u5728\u8FD9\u91CC\u7F16\u8F91\u60A8\u7684markdown\u5185\u5BB9' })
        ),
        urlInput
      );
      // ref="editor"
    }
  }]);

  return EditorConcist;
}(_react2.default.Component);

// Custom overrides for "code" style.


var styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  // console.log("getBlockStyle block",block,JSON.stringify(block))
  var type = block.getType();
  var data = block.getData();
  var text = block.getText();
  // console.log("getBlockStyle get data",JSON.stringify(data))
  var mergedStyle = "";
  switch (type) {
    case 'blockquote':
      mergedStyle = 'RichEditor-blockquote';
      break;
  }
  // console.log("getBlockStyle mergingStyle",mergedStyle)
  if (!data.has("textAlignment")) {
    return mergedStyle;
  }
  switch (data.get("textAlignment")) {
    case 'left':
      mergedStyle += ' RichEditor-alignment-left';
      break;
    case 'center':
      mergedStyle += ' RichEditor-alignment-center';
      break;
    case 'right':
      mergedStyle += ' RichEditor-alignment-right';
      break;
    case 'justify':
      mergedStyle += ' RichEditor-alignment-justify';
      break;
  }
  // console.log("getBlockStyle mergedStyle",mergedStyle)
  return mergedStyle;
}

function mediaBlockRenderer(block) {
  // console.log("block",block); console.log("1111111block.getType() ",block.getType());
  if (block.getType() === 'atomic') {
    // console.log("11112222block.getType() ",block.getType());
    return { component: Media, editable: false };
  }

  return null;
}

var Audio = function Audio(props) {
  return _react2.default.createElement('audio', { controls: true, src: props.src, className: 'media' });
};

var Image = function Image(props) {
  //   console.log("props",props.src);
  return _react2.default.createElement('img', { src: props.src, className: 'media' });
};

var Video = function Video(props) {
  return _react2.default.createElement('video', { controls: true, src: props.src, className: 'media' });
};

var Media = function Media(props) {
  var entity = _draftJs.Entity.get(props.block.getEntityAt(0));

  var _entity$getData = entity.getData(),
      src = _entity$getData.src;

  var type = entity.getType();
  // console.log("Media type",src);
  // console.log("Media entity",type);
  var media = void 0;
  if (type === 'audio') {
    media = _react2.default.createElement(Audio, { src: src });
  } else if (type === 'image') {
    media = _react2.default.createElement(Image, { src: src });
  } else if (type === 'video') {
    media = _react2.default.createElement(Video, { src: src });
  }
  return media;
};

EditorConcist.propTypes = {
  active: _react2.default.PropTypes.bool,
  importContent: _react2.default.PropTypes.string,
  cbReceiver: _react2.default.PropTypes.func.isRequired,
  undoRedo: _react2.default.PropTypes.bool,
  removeStyle: _react2.default.PropTypes.bool,
  pasteNoStyle: _react2.default.PropTypes.bool,
  blockStyle: _react2.default.PropTypes.bool,
  alignment: _react2.default.PropTypes.bool,
  inlineStyle: _react2.default.PropTypes.bool,
  color: _react2.default.PropTypes.bool,
  image: _react2.default.PropTypes.bool,
  video: _react2.default.PropTypes.bool,
  audio: _react2.default.PropTypes.bool,
  urls: _react2.default.PropTypes.bool,
  autoSave: _react2.default.PropTypes.bool,
  fullScreen: _react2.default.PropTypes.bool,
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
  }),
  convertFormat: _react2.default.PropTypes.oneOf(['html', 'markdown', 'raw'])
};
EditorConcist.defaultProps = {
  undoRedo: true,
  removeStyle: true,
  pasteNoStyle: true,
  blockStyle: true,
  alignment: true,
  inlineStyle: true,
  color: true,
  image: true,
  video: true,
  audio: true,
  urls: true,
  autoSave: true,
  fullScreen: true,
  convertFormat: 'html'
};
// export default EditorConcist;
module.exports = EditorConcist;