/**
 * Created by lizhen on 4/26/2016.
 */
import React, {Component} from 'react';
import ReactDom from 'react-dom';

import {
  AtomicBlockUtils,
  Editor,
  Entity,
  convertToRaw,
  EditorState,
  RichUtils,
  Modifier,
  ContentBlock,
  convertFromHTML,
  CompositeDecorator,
  ContentState,
  getDefaultKeyBinding,
  KeyBindingUtil
} from 'draft-js';

import {
  Upload,
  Modal,
  Button,
  Popconfirm,
  Form,
  Input,
  message
} from 'antd';

import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import {PRO_URL, PRO_REQUEST,PRO_COMMON} from 'publicDatas';
import {LinkDecorator,ImageDecorator,VideoDecorator,AudioDecorator} from "./decorators";
// import {ImgStyleControls,VideoStyleControls,AudioStyleControls,AutoSaveControls,BlockStyleControls,RemoveStyleControls,InlineStyleControls,ColorControls,AddUrl,CloseUrl,AutoSave} from "./toolBar"
import ImgStyleControls from "./toolBar/mediaImageUploader"
import VideoStyleControls from "./toolBar/medioVideoUploader"
import AudioStyleControls from "./toolBar/medioAudioUploader"
import AutoSaveControls from "./toolBar/autoSaveList"
import BlockStyleControls from "./toolBar/BlockStyleControls"
import RemoveStyleControls from "./toolBar/removeStyleControls"
import InlineStyleControls from "./toolBar/inlineStyleControls"
import ColorControls from "./toolBar/colorControls"
import {AddUrl,CloseUrl} from "./toolBar/urlControls"
import AutoSave from "./toolBar/autoSave"
import colorStyleMap from "./config/colorStyleMap"

class EditorConcist extends React.Component {
  constructor(props) {
    super(props);
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      },
      LinkDecorator,
      ImageDecorator,
      VideoDecorator,
      AudioDecorator
    ]);

    this.state = {
      showURLInput: false,
      urlValue: '',
      autoSaveFun:null,
      visible: false,

      editorState: (() => {
        let originalHtml = this.props.HtmlContent;
        originalHtml = !originalHtml
          ? " "
          : originalHtml;
        if (!originalHtml) { //暂时不走createEmpty，有错。空的话给个空格规避
          //this.state.alwaysEnterEmpty = true;
          return EditorState.createEmpty(decorator);
        } else {
          // let contentDomElement= document.createElement('div'); contentDomElement.innerHTML= this.props.HtmlContent;//转换成dom
          // element

          const contentState = stateFromHTML(originalHtml);
          return EditorState.createWithContent(contentState, decorator);
        }
      })()
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({editorState});
      let that = this;
      setTimeout(function() {
        //stateToHTML 状态转对象
        let rawContentState = that.state.editorState.getCurrentContent()
        let HTMLcontent = stateToHTML(rawContentState);
        that.props.cbReceiver(HTMLcontent); //富文本编辑器在设置active是true时，不可使用forceUpdate，否则会造成无法选中文本的问题！
      }, 300);
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.customKeyBinding = this._customKeyBinding.bind(this);

    /*视频音频图片*/
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      //  console.log(convertToRaw(content));
    };

    this.addMedia = this._addMedia.bind(this);
    this.addAudio = this._addAudio.bind(this);
    this.addImage = this._addImage.bind(this);
    this.addVideo = this._addVideo.bind(this);
    this.removeStyle = this._removeStyle.bind(this);
    this.choiceAutoSave=this._choiceAutoSave.bind(this);

    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);

    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }
  componentDidMount() {
    // let content = (this.state.HtmlContent);
    // const decorator = new CompositeDecorator([
    //   {
    //     strategy: findLinkEntities,
    //     component: Link
    //   },
    //   LinkDecorator,
    //   ImageDecorator
    // ]);
    // const contentState = stateFromHTML(content);
    // let values = EditorState.createWithContent(contentState, decorator);
    // this.state.editorState = values;
    this.state.autoSaveFun=setInterval(()=>{
      //每分钟自动保存草稿一次
      this.handleKeyCommand("editor-save");
    },60000);
  } // 此钩子用作编辑时候的回调
  componentWillReceiveProps(newProps) {
    if (!newProps.active) {
      return false;
    }
    if (newProps.HtmlContent == this.props.HtmlContent) {
      return false;
    }
    let newContent = (newProps.HtmlContent);
    if (newContent == "undefined ") {
      newContent = "空内容";
    }
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      },
      LinkDecorator,
      ImageDecorator,
      VideoDecorator,
      AudioDecorator
    ]);
    const contentState = stateFromHTML(newContent);
    let values = EditorState.createWithContent(contentState, decorator);
    this.state.editorState = values;
  }
  componentWillUnmount(){
//console.log("componentWillUnmount! this.state.autoSaveFun",this.state.autoSaveFun);
    clearInterval(this.state.autoSaveFun);
  }
  handleOk() {
    // console.log('点击了确定');
    this.setState({visible: false});
  }

  handleCancel(e) {
    //  console.log(e);
    this.setState({visible: false});
  }

  _promptForLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // console.log("111111selection", selection)
    if (!selection.isCollapsed()) {

      var that = this;
      this.setState({
        showURLInput: true,
        urlValue: '',
        visible: true
      }, () => {
        setTimeout(() => {
          ReactDom.findDOMNode(that.refs.urltext).focus();
        }, 0);
      });
    } else {
      message.error("创建链接前请先选中链接文字！", 5);
    }
  }

  _confirmLink(e) {

    const {editorState, urlValue} = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', {url: urlValue});
    //  console.log("2222222222entityKey", entityKey)
    this.setState({
      editorState: RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey),
      showURLInput: false,
      urlValue: ''
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
      return false;
    }
  }

  _removeLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null)
      });
    } else {
      message.error("移除链接前请先选中链接！", 5);
    }
  }

  //弹窗url，end
  _handleKeyCommand(command) {
//console.log("command",command);
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === 'editor-save') {
// window.localDB//start20Text
// let Data=PRO_COMMON.localDB.getter("grab_news_data") || [];

      let rawContentState = editorState.getCurrentContent()
      let HTMLcontent = stateToHTML(rawContentState);
      let newText=HTMLcontent.replace(/<[^>]*>|&[^;]*;/g, "");
      if (newText.length<30) {
        return false;
      }
      let start30Text=newText.substr(0,30);
      PRO_COMMON.localDB.setter("$d"+start30Text, HTMLcontent);
      message.success("编辑器内容已更新到保险库中",5)
      return true;
    }
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _customKeyBinding(e) {
    const {hasCommandModifier} = KeyBindingUtil;
    if (e.keyCode === 83/* `S` key */ && hasCommandModifier(e)) {
      return 'editor-save';
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  /*视频音频图片*/

  _addMedia(type, Object) {
    var src = Object.url;
    if (!src) {
      throw new Error("！！！！！！！！！！上传文件错误！！！！！！！！！！");
      return false;
    }
    const entityKey = Entity.create(type, 'IMMUTABLE', {src});
    return AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' ');
  }

  _addAudio(Objects) {
    let that = this;

    Objects.map((item, i) => {
      setTimeout(() => {
        return that.onChange(that.addMedia('audio', item));
      }, i * 100);
    })
  }

  _addImage(Objects) {
    let that = this;
    // console.log("Objects Objects", Objects);
    Objects.map((item, i) => {
      setTimeout(() => {
        return that.onChange(that.addMedia('image', item));
      }, i * 100);
    })
  }

  _addVideo(Objects) {
    let that = this;
    Objects.map((item, i) => {
      setTimeout(() => {
        return that.onChange(that.addMedia('video', item));
      }, i * 100);
    });
  }

  _removeStyle() {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const styles = editorState.getCurrentInlineStyle();

    const removeStyles = styles.reduce((state, style) => {
      return Modifier.removeInlineStyle(state, selection, style)
    }, contentState);

    const removeBlock = Modifier.setBlockType(removeStyles, selection, 'unstyled')

    this.setState({
      editorState: EditorState.push(editorState, removeBlock)
    })
  }
  _choiceAutoSave(savedHtmlContent){
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      },
      LinkDecorator,
      ImageDecorator,
      VideoDecorator,
      AudioDecorator
    ]);
    const contentState = stateFromHTML(savedHtmlContent);
    let values = EditorState.createWithContent(contentState, decorator);
    this.state.editorState = values;
    this.forceUpdate();
  }

  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color)
    }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');
    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledColor);
    }

    this.onChange(nextEditorState);
  }

  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput = <Modal
        title="请输出你要跳转的链接"
        visible={this.state.visible}
        onOk={this.confirmLink}
        onCancel={this.handleCancel}
        closable={false}>
        <Input
          type="text"
          onChange={this.onURLChange}
          value={this.state.urlValue}
          ref="urltext"
          addonBefore="Http://"
          onKeyDown={this.onLinkInputKeyDown}/>
      </Modal>
    }

    // Custom overrides for "code" style.
    const styleMap = {
      CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
      }
    };
    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can either style the placeholder or hide it. Let's just
    // hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    // console.log("this.addImage",this.addImage)
    return (
      <div className="RichEditor-root" content={this.state.HTML}>
        <RemoveStyleControls onToggle={this.removeStyle}/>
        <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType}/>
        <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle}/>
        <ColorControls editorState={editorState} onToggle={this.toggleColor}/>
        <ImgStyleControls receiveImage={this.addImage}/>
        <VideoStyleControls receiveVideo={this.addVideo}/>
        <AudioStyleControls receiveAudio={this.addAudio}/>
        <AddUrl editorState={editorState} onToggle={this.promptForLink}/>
        <CloseUrl editorState={editorState} onToggle={this.removeLink}/>
        <AutoSaveControls receiveSavedItem={this.choiceAutoSave}/> {urlInput}
        <div style={{
          color: "#ccc",
          fontSize: 12,
          borderTop: '1px solid #dddddd'
        }}>为防止客户端文章显示混论，编辑器内不允许粘贴客户端中被认为无效的网页样式，所有无效样式将被自动清空！</div>
        <div className={className} onClick={this.focus}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            editorState={this.state.editorState}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            customStyleMap={colorStyleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.customKeyBinding}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}/>
        </div>
      </div>
    );
  }
}
function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    // console.log("33333333333entityKey", entityKey);
    return (entityKey !== null && Entity.get(entityKey).getType() === 'LINK');
  }, callback);
}

const Link = (props) => {
  const {url} = Entity.get(props.entityKey).getData();
  var currentStyle = props.editorState
    ? props.editorState.getCurrentInlineStyle()
    : {};
  // console.log("4444444url", url);
  return (
    <a href={url} style={!!currentStyle.link
      ? currentStyle.link
      : {}}>
      {props.children}
    </a>
  );
};


function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

function mediaBlockRenderer(block) {
  // console.log("block",block); console.log("1111111block.getType() ",block.getType());
  if (block.getType() === 'atomic') {
    // console.log("11112222block.getType() ",block.getType());
    return {component: Media, editable: false};
  }

  return null;
}

const Media = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const {src} = entity.getData();
  const type = entity.getType();
  //console.log("2222222type",src); console.log("222222entity",type);
  let media;
  if (type === 'audio') {
    media = <audio controls src={src} className="media"/>;
  } else if (type === 'image') {
    media = <img src={src} className="media"/>;
  } else if (type === 'video') {
    media = <video controls src={src} className="media"/>;
  }
  return media;
};

EditorConcist.propTypes = {
  cbReceiver: React.PropTypes.func.isRequired
}
module.exports = EditorConcist;
