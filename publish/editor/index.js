'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./components.css');

require('../global/supports/resources/system.css');

require('antd/dist/antd.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _antd = require('antd');

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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lizhen on 4/26/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import {stateFromHTML} from 'draft-js-import-html';


var EditorConcist = function (_React$Component) {
  _inherits(EditorConcist, _React$Component);

  function EditorConcist(props) {
    _classCallCheck(this, EditorConcist);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EditorConcist).call(this, props));

    var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default, _VideoDecorator2.default, _AudioDecorator2.default]);

    _this.state = {
      openFullTest: "全屏",
      showURLInput: false,
      urlValue: '',
      hasPasted: false,
      autoSaveFun: null,
      visible: false,

      editorState: function () {
        var originalHtml = _this.props.HtmlContent;
        originalHtml = !originalHtml ? " " : originalHtml;
        if (!originalHtml) {
          //暂时不走createEmpty，有错。空的话给个空格规避
          //this.state.alwaysEnterEmpty = true;
          return _draftJs.EditorState.createEmpty(decorator);
        } else {
          // let contentDomElement= document.createElement('div'); contentDomElement.innerHTML= this.props.HtmlContent;//转换成dom
          // element

          var contentState = (0, _utils.stateFromHTML)(originalHtml);
          // console.log("state originalHtml",originalHtml);
          // console.log("state contentState",contentState);
          return _draftJs.EditorState.createWithContent(contentState, decorator);
        }
      }()
    };

    _this.focus = function () {
      return _this.refs.editor.focus();
    };
    _this.onChange = function (editorState) {
      _this.setState({ editorState: editorState });
      var that = _this;
      setTimeout(function () {
        //stateToHTML 状态转对象
        var rawContentState = that.state.editorState.getCurrentContent();
        var HTMLcontent = (0, _utils.stateToHTML)(rawContentState);
        that.props.cbReceiver(HTMLcontent); //富文本编辑器在设置active是true时，不可使用forceUpdate，否则会造成无法选中文本的问题！
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
    _this.handleOk = _this.handleOk.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.solidHtml = _this._solidHtml.bind(_this);

    return _this;
  }

  _createClass(EditorConcist, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var content = this.state.HtmlContent;
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
      if (newProps.HtmlContent == this.props.HtmlContent) {
        return false;
      }
      var newContent = newProps.HtmlContent;
      if (newContent == "undefined" || !newContent) {
        newContent = "<h1>空内容</h1>";
      }
      var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default, _VideoDecorator2.default, _AudioDecorator2.default]);
      var contentState = (0, _utils.stateFromHTML)(newContent);
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
      var _this3 = this;

      e.preventDefault();
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      // console.log("111111selection", selection)
      if (!selection.isCollapsed()) {
        (function () {

          var that = _this3;
          _this3.setState({
            showURLInput: true,
            urlValue: '',
            visible: true
          }, function () {
            setTimeout(function () {
              _reactDom2.default.findDOMNode(that.refs.urltext).focus();
            }, 0);
          });
        })();
      } else {
        _antd.message.error("创建链接前请先选中链接文字！", 5);
      }
    }
  }, {
    key: '_confirmLink',
    value: function _confirmLink(e) {
      var _this4 = this;

      // console.log("_confirmLink urlValue", urlValue)
      var _state = this.state;
      var editorState = _state.editorState;
      var urlValue = _state.urlValue;

      var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', { url: urlValue });
      this.setState({
        editorState: _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey),
        showURLInput: false,
        urlValue: ''
      }, function () {
        setTimeout(function () {
          return _this4.refs.editor.focus();
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
        _antd.message.error("移除链接前请先选中链接！", 5);
      }
    }
  }, {
    key: '_openFull',
    value: function _openFull(e) {
      e.preventDefault();
      var ele = document.querySelector(".RichEditor-root"),
          affix = document.querySelector("#text-editor-affix"),
          affixToolBar = document.querySelector("#text-editor-affix>div");
      // let className = 'RichEditor-editor';
      if (ele.classList.contains("openFullAll")) {
        ele.className = 'RichEditor-root';
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
    //弹窗url，end

  }, {
    key: '_handleKeyCommand',
    value: function _handleKeyCommand(command) {
      console.log("command", command);
      var editorState = this.state.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (command === 'editor-save' && this.props.AutoSave == true) {
        // window.localDB//start20Text
        // let Data=PRO_COMMON.localDB.getter("grab_news_data") || [];

        var rawContentState = editorState.getCurrentContent();
        var HTMLcontent = (0, _utils.stateToHTML)(rawContentState);
        var newText = HTMLcontent.replace(/<[^>]*>|&[^;]*;/g, "");
        if (newText.length < 30) {
          return false;
        }
        var start30Text = newText.substr(0, 30);
        _publicDatas.PRO_COMMON.localDB.setter("$d" + start30Text, HTMLcontent);
        _antd.message.success("编辑器内容已更新到保险库中", 5);
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
    value: function _handlePastedText(text, html) {
      html = this.solidHtml(html);
      // console.log("_handlePastedText text",text);
      // console.log("_handlePastedText html",typeof(html),html);
      if (text == "undefined" && html == "undefined") {
        // console.log("_handlePastedText return false");
        return false;
      }
      if (html == "undefined" || !html) {
        this.pasteNoStyle(text);
        return false;
      }
      var editorState = this.state.editorState;

      var rawContentState = editorState.getCurrentContent();
      var HTMLcontent = (0, _utils.stateToHTML)(rawContentState);
      var newText = HTMLcontent.replace(/<[^>]*>|&[^;]*;/g, "");
      if (this.state.hasPasted === true || _lodash2.default.trim(newText).length > 0) {
        var blockMap = _draftJs.ContentState.createFromText(text.trim()).blockMap;
        var newState = _draftJs.Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);
        this.onChange(_draftJs.EditorState.push(editorState, newState, 'insert-fragment'));
        return true;
      }
      this.state.hasPasted = true;
      var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default, _VideoDecorator2.default, _AudioDecorator2.default]);
      var contentState = (0, _utils.stateFromHTML)(html);
      // console.log("_handlePastedText html",html);
      // console.log("_handlePastedText contentState",JSON.stringify(contentState));
      var values = _draftJs.EditorState.createWithContent(contentState, decorator);
      this.state.editorState = values;
      _antd.message.success("已经清空样式并成功粘贴，可能部分图片因原网站防盗链功能暂未显示。", 5);
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
    value: function _pasteNoStyle(text) {
      text = '<p>' + text.replace(/\n([ \t]*\n)+/g, '</p><p>').replace('\n', '<br />') + '</p>';
      var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default, _VideoDecorator2.default, _AudioDecorator2.default]);
      var contentState = (0, _utils.stateFromHTML)(text);
      // console.log("_pasteNoStyle text",text);
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
    value: function _choiceAutoSave(savedHtmlContent) {
      var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default, _VideoDecorator2.default, _AudioDecorator2.default]);
      var contentState = (0, _utils.stateFromHTML)(savedHtmlContent);
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
      if (this.state.showURLInput) {
        urlInput = _react2.default.createElement(
          _antd.Modal,
          {
            title: '\u8BF7\u8F93\u51FA\u4F60\u8981\u8DF3\u8F6C\u7684\u94FE\u63A5',
            visible: this.state.visible,
            onOk: this.confirmLink,
            onCancel: this.handleCancel,
            closable: false },
          _react2.default.createElement(_antd.Input, {
            type: 'text',
            onChange: this.onURLChange,
            value: this.state.urlValue,
            ref: 'urltext',
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
      // console.log("this.props.UndoRedo",this.props.UndoRedo)//https://gist.github.com/deanmcpherson/69f9962b744b273ffb64fe294ab71bc4
      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-root editorHidden', content: this.state.HTML, id: 'text-editor-container' },
        _react2.default.createElement(
          _antd.Affix,
          { offsetTop: 0, id: 'text-editor-affix' },
          this.props.UndoRedo && _react2.default.createElement(_undoredoControls2.default, { onToggle: this.undoRedo }),
          this.props.RemoveStyle && _react2.default.createElement(_removeStyleControls2.default, { onToggle: this.removeStyle }),
          this.props.PasteNoStyle && _react2.default.createElement(_pasteNoStyleControls2.default, { receiveText: this.pasteNoStyle }),
          this.props.BlockStyle && _react2.default.createElement(_blockStyleControls2.default, { editorState: editorState, onToggle: this.toggleBlockType }),
          this.props.Alignment && _react2.default.createElement(_alignmentControls2.default, { editorState: editorState, onToggle: this.toggleAlignment }),
          this.props.InlineStyle && _react2.default.createElement(_inlineStyleControls2.default, { editorState: editorState, onToggle: this.toggleInlineStyle }),
          this.props.Color && _react2.default.createElement(_colorControls2.default, { editorState: editorState, onToggle: this.toggleColor }),
          this.props.Image && _react2.default.createElement(_mediaImageUploader2.default, { uploadConfig: this.props.uploadConfig, receiveImage: this.addImage }),
          this.props.Video && _react2.default.createElement(_medioVideoUploader2.default, { uploadConfig: this.props.uploadConfig, receiveVideo: this.addVideo }),
          this.props.Audio && _react2.default.createElement(_medioAudioUploader2.default, { uploadConfig: this.props.uploadConfig, receiveAudio: this.addAudio }),
          this.props.Url && _react2.default.createElement(_urlControls.AddUrl, { editorState: editorState, onToggle: this.promptForLink }),
          this.props.Url && _react2.default.createElement(_urlControls.CloseUrl, { editorState: editorState, onToggle: this.removeLink }),
          this.props.AutoSave && _react2.default.createElement(_autoSaveList2.default, { receiveSavedItem: this.choiceAutoSave }),
          this.props.FullScreen && _react2.default.createElement(_cookieControls.OpenFull, { editorState: editorState, onToggle: this.openFull, coverTitle: this.state.openFullTest })
        ),
        _react2.default.createElement(
          'div',
          { className: className, onClick: this.focus },
          _react2.default.createElement(_draftJs.Editor, (_React$createElement = {
            blockRendererFn: mediaBlockRenderer,
            editorState: this.state.editorState,
            blockStyleFn: getBlockStyle,
            customStyleMap: styleMap
          }, _defineProperty(_React$createElement, 'customStyleMap', _colorConfig.colorStyleMap), _defineProperty(_React$createElement, 'editorState', editorState), _defineProperty(_React$createElement, 'handleKeyCommand', this.handleKeyCommand), _defineProperty(_React$createElement, 'keyBindingFn', this.customKeyBinding), _defineProperty(_React$createElement, 'onChange', this.onChange), _defineProperty(_React$createElement, 'handlePastedText', this.handlePastedText), _defineProperty(_React$createElement, 'ref', 'editor'), _defineProperty(_React$createElement, 'spellCheck', true), _React$createElement))
        ),
        urlInput
      );
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

  var _entity$getData = entity.getData();

  var src = _entity$getData.src;

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
  HtmlContent: _react2.default.PropTypes.string,
  cbReceiver: _react2.default.PropTypes.func.isRequired,
  UndoRedo: _react2.default.PropTypes.bool,
  RemoveStyle: _react2.default.PropTypes.bool,
  PasteNoStyle: _react2.default.PropTypes.bool,
  BlockStyle: _react2.default.PropTypes.bool,
  Alignment: _react2.default.PropTypes.bool,
  InlineStyle: _react2.default.PropTypes.bool,
  Color: _react2.default.PropTypes.bool,
  Image: _react2.default.PropTypes.bool,
  Video: _react2.default.PropTypes.bool,
  Audio: _react2.default.PropTypes.bool,
  Url: _react2.default.PropTypes.bool,
  AutoSave: _react2.default.PropTypes.bool,
  FullScreen: _react2.default.PropTypes.bool,
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
EditorConcist.defaultProps = {
  UndoRedo: true,
  RemoveStyle: true,
  PasteNoStyle: true,
  BlockStyle: true,
  Alignment: true,
  InlineStyle: true,
  Color: true,
  Image: true,
  Video: true,
  Audio: true,
  Url: true,
  AutoSave: true,
  FullScreen: true
};
// export default EditorConcist;
module.exports = EditorConcist;