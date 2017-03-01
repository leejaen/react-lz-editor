/**
 * Created by lizhen on 4/26/2016.
 */
import './components.css'
import '../global/supports/resources/system.css';
import 'antd/dist/antd.css';
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
  KeyBindingUtil,
  DraftPasteProcessor,
  SelectionState
} from 'draft-js';
import {
  Upload,
  Modal,
  Button,
  Popconfirm,
  Form,
  Input,
  message,
  Affix,
  Icon,
  Tooltip
} from 'antd';
import {stateToHTML,stateFromHTML} from './utils';

import getSelectedBlocks from './utils/stateUtils/getSelectedBlocks';
// import {stateFromHTML} from 'draft-js-import-html';
import {PRO_COMMON} from '../global/supports/publicDatas';
import LinkDecorator from "./decorators/LinkDecorator";
import ImageDecorator from "./decorators/ImageDecorator";
import VideoDecorator from "./decorators/VideoDecorator";
import AudioDecorator from "./decorators/AudioDecorator";
import ImgStyleControls from "./toolBar/mediaImageUploader"
import VideoStyleControls from "./toolBar/medioVideoUploader"
import AudioStyleControls from "./toolBar/medioAudioUploader"
import ColorControls from "./toolBar/colorControls"
import AutoSaveControls from "./toolBar/autoSaveList"
import StyleButton from "./toolBar/styleButton"
import BlockStyleControls from "./toolBar/blockStyleControls"
import AlignmentControls from "./toolBar/alignmentControls"
import InlineStyleControls from "./toolBar/inlineStyleControls"
import PasteNoStyleControls from "./toolBar/pasteNoStyleControls"
import {AddUrl,CloseUrl} from "./toolBar/urlControls"
import {OpenFull,AutoSave} from "./toolBar/cookieControls"
import RemoveStyleControls from "./toolBar/removeStyleControls"
import UndoRedo from "./toolBar/undoredoControls"
import {colorStyleMap} from "./utils/colorConfig"
import ExtendedRichUtils from "./utils/ExtendedRichUtils"
import _ from "lodash";
class EditorConcist extends React.Component {
  constructor(props) {
    super(props);
    const decorator = new CompositeDecorator([
      LinkDecorator,
      ImageDecorator,
      VideoDecorator,
      AudioDecorator
    ]);

    this.state = {
      openFullTest:"全屏",
      showURLInput: false,
      urlValue: '',
      hasPasted:false,
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
          // console.log("state originalHtml",originalHtml);
          // console.log("state contentState",contentState);
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
    this.toggleAlignment = (type) => this._toggleAlignment(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.customKeyBinding = this._customKeyBinding.bind(this);
    this.handlePastedText=this._handlePastedText.bind(this);

    /*视频音频图片*/
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      //  console.log(convertToRaw(content));
    };

    this.addMedia = this._addMedia.bind(this);
    this.addAudio = this._addAudio.bind(this);
    this.addImage = this._addImage.bind(this);
    this.addVideo = this._addVideo.bind(this);
    this.undoRedo = this._undoRedo.bind(this);
    this.removeStyle = this._removeStyle.bind(this);
    this.pasteNoStyle = this._pasteNoStyle.bind(this);
    this.choiceAutoSave=this._choiceAutoSave.bind(this);

    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);

    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
    this.openFull=this._openFull.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.solidHtml=this._solidHtml.bind(this);

  }
  componentDidMount() {
     let content = (this.state.HtmlContent);
    // const decorator = new CompositeDecorator([
    //   LinkDecorator,
    //   ImageDecorator
    // ]);
     const contentState = stateFromHTML(content);
    //  console.log("componentDidMount content",content);
    //  console.log("componentDidMount contentState",JSON.stringify(contentState));
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
    if (newContent == "undefined" ||!newContent) {
      newContent = "<h1>空内容</h1>";
    }
    const decorator = new CompositeDecorator([
      LinkDecorator,
      ImageDecorator,
      VideoDecorator,
      AudioDecorator
    ]);
    const contentState = stateFromHTML(newContent);
    // console.log("componentWillReceiveProps newContent",newContent);
    // console.log("componentWillReceiveProps contentState",JSON.stringify(contentState));
    let values = EditorState.createWithContent(contentState, decorator);
    this.state.editorState = values;
  }
  componentWillUnmount(){
    // console.log("componentWillUnmount! this.state.autoSaveFun",this.state.autoSaveFun);
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

      let that = this;
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
    // console.log("_confirmLink urlValue", urlValue)
    const {editorState, urlValue} = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', {url: urlValue});
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
_openFull(e){
  e.preventDefault();
  let ele=document.querySelector(".RichEditor-root"),affix=document.querySelector("#text-editor-affix"),affixToolBar=document.querySelector("#text-editor-affix>div");
  // let className = 'RichEditor-editor';
  if(ele.classList.contains("openFullAll")){
      ele.className = 'RichEditor-root';
      affix.style="";
      affixToolBar.className="";
      affixToolBar.style=""
      this.setState({
        openFullTest:"全屏"
      })
  }else{
      ele.className += ' openFullAll';
      setTimeout(()=>{
        affix.style="width: "+affix.offsetWidth+"px; height: 0; margin-bottom: 70px;";
        affixToolBar.className="ant-affix";
        affixToolBar.style="position: fixed; top: 0; left: 0; width: "+affix.offsetWidth+"px;margin: 0 15px 15px;"
      },500)
      this.setState({
        openFullTest:"退出全屏"
      })
  }

}
  //弹窗url，end
  _handleKeyCommand(command) {
    console.log("command",command);
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === 'editor-save'&&this.props.AutoSave==true) {
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
    }else if(command==="editor-paste"){
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
    }else if(e.keyCode === 86/* `V` key */ && hasCommandModifier(e)){
    }
    return getDefaultKeyBinding(e);
  }
  _solidHtml(html) {
    // html=html.replace(/"((?:\\.|[^"\\])*)"/g,"");//去掉所有英文单引号里面的内容，比如style="" class=""
    let walk_the_DOM = function walk(node, func) {
      func(node);
      node = node.firstChild;
      while (node) {
        walk(node, func);
        node = node.nextSibling;
      }
    };
    let wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    walk_the_DOM(wrapper.firstChild, function(element) {
      if (element.removeAttribute) {
        element.removeAttribute('id');
        element.removeAttribute('style');
        element.removeAttribute('class');
      }
    });
    return wrapper.innerHTML;
  }
  _handlePastedText(text,html){
    html = this.solidHtml(html);
    // console.log("_handlePastedText text",text);
    // console.log("_handlePastedText html",typeof(html),html);
    if (text=="undefined"&&html=="undefined") {
      // console.log("_handlePastedText return false");
      return false;
    }
    if (html=="undefined"||!html) {
      this.pasteNoStyle(text)
      return false;
    }
    const {editorState} = this.state;
    let rawContentState = editorState.getCurrentContent()
    let HTMLcontent = stateToHTML(rawContentState);
    let newText=HTMLcontent.replace(/<[^>]*>|&[^;]*;/g, "");
    if (this.state.hasPasted===true||_.trim(newText).length>0) {
      const blockMap = ContentState.createFromText(text.trim()).blockMap;
      const newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);
      this.onChange(EditorState.push(editorState, newState, 'insert-fragment'));
      return true;
    }
    this.state.hasPasted=true;
    const decorator = new CompositeDecorator([
      LinkDecorator,
      ImageDecorator,
      VideoDecorator,
      AudioDecorator
    ]);
    const contentState = stateFromHTML(html);
    // console.log("_handlePastedText html",html);
    // console.log("_handlePastedText contentState",JSON.stringify(contentState));
    let values = EditorState.createWithContent(contentState, decorator);
    this.state.editorState = values;
    message.success("已经清空样式并成功粘贴，可能部分图片因原网站防盗链功能暂未显示。",5);
    this.forceUpdate();
    return true;//覆盖编辑器的默认粘贴行为
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleAlignment(alignment) {
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
    this.onChange(ExtendedRichUtils.toggleAlignment(this.state.editorState, alignment));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  /*视频音频图片*/

  _addMedia(type, Object) {
    let src = Object.url;
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
        let imageObj=that.addMedia('image', item);
        // console.log("imageObj",imageObj,JSON.stringify(imageObj));
        return that.onChange(imageObj);
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
  _pasteNoStyle(text){
    text='<p>' + text.replace(/\n([ \t]*\n)+/g, '</p><p>')
                 .replace('\n', '<br />') + '</p>'
    const decorator = new CompositeDecorator([
      LinkDecorator,
      ImageDecorator,
      VideoDecorator,
      AudioDecorator
    ]);
    const contentState = stateFromHTML(text);
    // console.log("_pasteNoStyle text",text);
    // console.log("_pasteNoStyle contentState",JSON.stringify(contentState));
    let values = EditorState.createWithContent(contentState,decorator);
    this.state.editorState = values;
    this.forceUpdate();
  }
  _undoRedo(type){
    if (this.state.editorState) {
      let newEditorState=null;
      if (type=="undo") {
        newEditorState=EditorState.undo(this.state.editorState);
      }else {
        newEditorState=EditorState.redo(this.state.editorState);
      }
      this.setState({editorState:newEditorState});
    }
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
          placeholder="http:// or https://"
          onKeyDown={this.onLinkInputKeyDown}/>
        <span style={{color:"red"}}>请输入符合规范的网址链接（以“http://” 或 “https://”为前导）</span>
      </Modal>
    }

    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can either style the placeholder or hide it. Let's just
    // hide it now.
    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    // console.log("this.props.UndoRedo",this.props.UndoRedo)//https://gist.github.com/deanmcpherson/69f9962b744b273ffb64fe294ab71bc4
    return (
      <div className="RichEditor-root editorHidden" content={this.state.HTML} id="text-editor-container">
        <Affix offsetTop={0} id="text-editor-affix">
          {this.props.UndoRedo&&<UndoRedo onToggle={this.undoRedo}/>}
          {this.props.RemoveStyle&&<RemoveStyleControls onToggle={this.removeStyle}/>}
          {this.props.PasteNoStyle&&<PasteNoStyleControls receiveText={this.pasteNoStyle}/>}
          {this.props.BlockStyle&&<BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType}/>}
          {this.props.Alignment&&<AlignmentControls editorState={editorState} onToggle={this.toggleAlignment}/>}
          {this.props.InlineStyle&&<InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle}/>}
          {this.props.Color&&<ColorControls editorState={editorState} onToggle={this.toggleColor}/>}
          {this.props.Image&&<ImgStyleControls uploadConfig={this.props.uploadConfig} receiveImage={this.addImage}/>}
          {this.props.Video&&<VideoStyleControls uploadConfig={this.props.uploadConfig} receiveVideo={this.addVideo}/>}
          {this.props.Audio&&<AudioStyleControls uploadConfig={this.props.uploadConfig} receiveAudio={this.addAudio}/>}
          {this.props.Url&&<AddUrl editorState={editorState} onToggle={this.promptForLink}/>}
          {this.props.Url&&<CloseUrl editorState={editorState} onToggle={this.removeLink}/>}
          {this.props.AutoSave&&<AutoSaveControls receiveSavedItem={this.choiceAutoSave}/>}
          {this.props.FullScreen&&<OpenFull editorState={editorState} onToggle={this.openFull} coverTitle={this.state.openFullTest}/>}
        </Affix>
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
            handlePastedText={this.handlePastedText}
            ref="editor"
            spellCheck={true}/>
        </div>
        {urlInput}
      </div>
    );
  }
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

function getBlockStyle(block) {
  // console.log("getBlockStyle block",block,JSON.stringify(block))
  let type=block.getType();
  let data=block.getData();
  let text=block.getText();
  // console.log("getBlockStyle get data",JSON.stringify(data))
  let mergedStyle="";
  switch (type) {
    case 'blockquote':
      mergedStyle= 'RichEditor-blockquote';
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
    return {component: Media, editable: false};
  }

  return null;
}

const Audio = (props) => {
  return <audio controls src={props.src} className="media"/>;
};

const Image = (props) => {
  //   console.log("props",props.src);
  return <img src={props.src} className="media"/>;
};

const Video = (props) => {
  return <video controls src={props.src} className="media"/>;
};

const Media = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const {src} = entity.getData();
  const type = entity.getType();
  // console.log("Media type",src);
  // console.log("Media entity",type);
  let media;
  if (type === 'audio') {
    media = <Audio src={src}/>;
  } else if (type === 'image') {
    media = <Image src={src}/>;
  } else if (type === 'video') {
    media = <Video src={src}/>;
  }
  return media;
};

EditorConcist.propTypes = {
  active: React.PropTypes.bool,
  HtmlContent: React.PropTypes.string,
  cbReceiver: React.PropTypes.func.isRequired,
  UndoRedo: React.PropTypes.bool,
  RemoveStyle: React.PropTypes.bool,
  PasteNoStyle: React.PropTypes.bool,
  BlockStyle: React.PropTypes.bool,
  Alignment: React.PropTypes.bool,
  InlineStyle: React.PropTypes.bool,
  Color: React.PropTypes.bool,
  Image: React.PropTypes.bool,
  Video: React.PropTypes.bool,
  Audio: React.PropTypes.bool,
  Url: React.PropTypes.bool,
  AutoSave: React.PropTypes.bool,
  FullScreen: React.PropTypes.bool,
  uploadConfig:React.PropTypes.shape({
    QINIU_URL: React.PropTypes.string.isRequired,
    QINIU_IMG_TOKEN_URL: React.PropTypes.string.isRequired,
    QINIU_PFOP:React.PropTypes.shape({
      url: React.PropTypes.string.isRequired
    }),
    QINIU_VIDEO_TOKEN_URL: React.PropTypes.string.isRequired,
    QINIU_FILE_TOKEN_URL: React.PropTypes.string.isRequired,
    QINIU_IMG_DOMAIN_URL: React.PropTypes.string.isRequired,
    QINIU_DOMAIN_VIDEO_URL: React.PropTypes.string.isRequired,
    QINIU_DOMAIN_FILE_URL: React.PropTypes.string.isRequired
   })
}
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
  FullScreen:true,
};
// export default EditorConcist;
module.exports = EditorConcist;
