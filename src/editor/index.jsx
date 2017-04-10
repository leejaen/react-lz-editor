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
  convertFromRaw,
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
  Icon
} from 'antd';
import {stateToHTML,stateFromHTML,stateToMD,stateFromMD} from './utils';

import getSelectedBlocks from './utils/stateUtils/getSelectedBlocks';
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
import {OpenFull,AutoSave,SourceEditor} from "./toolBar/cookieControls"
import RemoveStyleControls from "./toolBar/removeStyleControls"
import UndoRedo from "./toolBar/undoredoControls"
import {colorStyleMap} from "./utils/colorConfig"
import ExtendedRichUtils from "./utils/ExtendedRichUtils"
import isEmpty from 'lodash/isEmpty';
import trim from 'lodash/trim';

const decorator = new CompositeDecorator([
  LinkDecorator,
  ImageDecorator,
  VideoDecorator,
  AudioDecorator
]);

class EditorConcist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openFullTest:"全屏",
      showSourceEditor:"源码",
      showURLInput: false,
      urlValue: '',
      hasPasted:false,
      autoSaveFun:null,
      visible: false,
      showMarkdownSource:false,
      tempSouceContent:"",

      editorState: (() => {
        let originalString = this.props.importContent;
        originalString = !originalString
          ? " "
          : originalString;
        if (!originalString) { //暂时不走createEmpty，有错。空的话给个空格规避
          //this.state.alwaysEnterEmpty = true;
          return EditorState.createEmpty(decorator);
        } else {
          // let contentDomElement= document.createElement('div'); contentDomElement.innerHTML= this.props.importContent;//转换成dom
          // element
          const ConvertFormatProps = this.props.convertFormat;
          let contentState;
          if(ConvertFormatProps === 'html') {
            contentState = stateFromHTML(originalString);
          } else if (ConvertFormatProps === 'markdown') {
            // console.log("markdown originalString",originalString)
            contentState = stateFromMD(originalString);
          } else if(ConvertFormatProps === 'raw'){
            originalString=originalString.replace(/\s/g,"")?originalString:"{}";
            let rawContent = JSON.parse(originalString);
            if (isEmpty(rawContent)) {
            return EditorState.createWithContent("", decorator);
            }
            contentState = convertFromRaw(rawContent);
          }
          return EditorState.createWithContent(contentState, decorator);
        }
      })()
    };

    // this.focus = () => this.refs.editor.focus();//使用babel转码之后不是react组件不能用refs方式
    this.onChange = (editorState) => {
      this.setState({editorState});
      let that = this;
      if(that.timer){
        clearTimeout(that.timer);
      }
      that.timer = setTimeout(function() {
        //状态转对象
        let rawContentState = that.state.editorState.getCurrentContent()
        //const rawContent = convertToRaw(rawContentState);
        // console.log('rawContentState', rawContentState);
        let content;
        const ConvertFormatProps = that.props.convertFormat;
        if(ConvertFormatProps === 'html') {
          content = stateToHTML(rawContentState);
        }else if (ConvertFormatProps === 'markdown') {
          content = stateToMD(rawContentState);
        }else if(ConvertFormatProps === 'raw') {
          const rawContent = convertToRaw(rawContentState);
          content = JSON.stringify(rawContent);
        }
        that.props.cbReceiver(content); //富文本编辑器在设置active是true时，不可使用forceUpdate，否则会造成无法选中文本的问题！
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
    this.toggleSource=this._toggleSource.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.solidHtml=this._solidHtml.bind(this);
    this.changeMrakdownContent=this._changeMrakdownContent.bind(this);
  }
  componentDidMount() {
     let content = (this.props.importContent);
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
    if (newProps.importContent == this.props.importContent) {
      return false;
    }
    const ConvertFormatProps = this.props.convertFormat;
    let newContent ="";
    // console.log("ConvertFormatProps",ConvertFormatProps)
    if (ConvertFormatProps==="html") {
      newContent = newProps.importContent.replace(/[\s\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]\>/g,">");
      if (newContent == "undefined" ||!newContent) {
        newContent = "<p>&nbsp;</p>";
      }
    } else if (ConvertFormatProps==="markdown") {
      newContent = newProps.importContent||"";
      this.state.tempSouceContent=newContent;
    } else if (ConvertFormatProps==="raw") {
      newContent = newProps.importContent||"{}";
    }
    /*const decorator = new CompositeDecorator([
      LinkDecorator,
      ImageDecorator,
      VideoDecorator,
      AudioDecorator
    ]);*/
    // console.log("newContent",newContent)
    let contentState;
    if(ConvertFormatProps === 'html') {
      contentState = stateFromHTML(newContent);
    } else if (ConvertFormatProps === 'markdown') {
      contentState = stateFromMD(newContent);
    } else if(ConvertFormatProps === 'raw'){
      let rawContent = JSON.parse(newContent);
      contentState = convertFromRaw(rawContent);
    }
    // console.log("contentState",contentState)
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
        // setTimeout(() => {
        //     ReactDom.findDOMNode(that.refs.urltext).focus();//使用babel转码之后不是react组件不能用refs方式
        // }, 0);
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
      setTimeout(() => {
        // this.refs.editor.focus()//使用babel转码之后不是react组件不能用refs方式
      }, 0);
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
    if(ele.classList.contains("openFullAll")){
        ele.className = ele.className.replace("openFullAll","");
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
  _toggleSource(e){
    e.preventDefault();
    let ele=document.querySelector(".RichEditor-root")
    if(ele.classList.contains("showSource")){
        ele.className = ele.className.replace("showSource","");
        this.setState({
          showSourceEditor:"源码",
          showMarkdownSource:false
        })
    }else{
        ele.className += ' showSource';
        this.setState({
          showSourceEditor:"预览",
          showMarkdownSource:true
        })
    }
  }
  _changeMrakdownContent(e){
    let markdownContent = e.target.value;
    // console.log("markdownContent",markdownContent);
    let contentState = stateFromMD(markdownContent);
    let values = EditorState.createWithContent(contentState, decorator);
    this.state.tempSouceContent=markdownContent;
    this.state.editorState = values;
    this.forceUpdate();
  }
  //弹窗url，end
  _handleKeyCommand(command) {
    // console.log("command",command);
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === 'editor-save'&&this.props.autoSave==true) {
      // window.localDB//start20Text
      // let Data=PRO_COMMON.localDB.getter("grab_news_data") || [];

      let rawContentState = editorState.getCurrentContent()
      let content = "",newText="";

      const ConvertFormatProps = this.props.convertFormat;
      if(ConvertFormatProps === 'html') {
        content = stateToHTML(rawContentState);
        newText=content.replace(/<[^>]*>|&[^;]*;/g, "");
      }else if (ConvertFormatProps === 'markdown') {
        content = stateToMD(rawContentState);
      }else if(ConvertFormatProps === 'raw') {
        const rawContent = convertToRaw(rawContentState);
        content = JSON.stringify(rawContent);
      }

      if (newText.length<30) {
        return false;
      }
      let start30Text=newText.substr(0,30);
      PRO_COMMON.localDB.setter("$d"+start30Text, content);
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
  _handlePastedText(text,sourceString){
    sourceString = this.solidHtml(sourceString);
    // console.log("_handlePastedText text",text);
    // console.log("_handlePastedText sourceString",typeof(sourceString),sourceString);
    if (text=="undefined"&&sourceString=="undefined") {
      // console.log("_handlePastedText return false");
      return false;
    }
    if (sourceString=="undefined"||!sourceString) {
      this.pasteNoStyle(text)
      return false;
    }
    const {editorState} = this.state;
    let rawContentState = editorState.getCurrentContent()
    let content = "",newText="";

    const ConvertFormatProps = this.props.convertFormat;
    if(ConvertFormatProps === 'html') {
      content = stateToHTML(rawContentState);
      newText=content.replace(/<[^>]*>|&[^;]*;/g, "");
    }else if (ConvertFormatProps === 'markdown') {
      content = stateToMD(rawContentState);
    }else if(ConvertFormatProps === 'raw') {
      const rawContent = convertToRaw(rawContentState);
      content = JSON.stringify(rawContent);
    }

    if (this.state.hasPasted===true||trim(newText).length>0) {
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
    let contentState = "";

    if(ConvertFormatProps === 'html') {
      contentState = stateFromHTML(sourceString);
    }else if (ConvertFormatProps === 'markdown') {
      contentState = stateFromMD(sourceString);
    }else if(ConvertFormatProps === 'raw') {
      contentState = convertFromRaw(sourceString);
    }

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
  _pasteNoStyle(sourceString){
    const decorator = new CompositeDecorator([
      LinkDecorator,
      ImageDecorator,
      VideoDecorator,
      AudioDecorator
    ]);
    let contentState = "";

    const ConvertFormatProps = this.props.convertFormat;
    if(ConvertFormatProps === 'html') {
      sourceString='<p>' + sourceString.replace(/\n([ \t]*\n)+/g, '</p><p>')
                 .replace('\n', '<br />') + '</p>'
      contentState = stateFromHTML(sourceString);
    }else if (ConvertFormatProps === 'markdown') {
      contentState = stateFromMD(sourceString);
    }else if(ConvertFormatProps === 'raw') {
      contentState = convertFromRaw(sourceString);
    }
    // console.log("_pasteNoStyle sourceString",sourceString);
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
  _choiceAutoSave(savedImportContent){
    const decorator = new CompositeDecorator([
      LinkDecorator,
      ImageDecorator,
      VideoDecorator,
      AudioDecorator
    ]);
    const ConvertFormatProps = this.props.convertFormat;
    let contentState = "";
    if(ConvertFormatProps === 'html') {
      contentState = stateFromHTML(savedImportContent);
    } else if (ConvertFormatProps === 'markdown') {
      contentState = stateFromMD(savedImportContent);
    } else if(ConvertFormatProps === 'raw'){
      let rawContent = JSON.parse(savedImportContent);
      contentState = convertFromRaw(rawContent);
    }

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
    // ref="urltext"
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
    // console.log("this.props.undoRedo",this.props.undoRedo)//https://gist.github.com/deanmcpherson/69f9962b744b273ffb64fe294ab71bc4
    return (
      <div className="RichEditor-root editorHidden" content={this.state.HTML} id="text-editor-container">
        <Affix offsetTop={0} id="text-editor-affix">
          {this.state.showMarkdownSource==false&&this.props.undoRedo&&<UndoRedo onToggle={this.undoRedo}/>}
          {this.state.showMarkdownSource==false&&this.props.removeStyle&&<RemoveStyleControls onToggle={this.removeStyle}/>}
          {this.state.showMarkdownSource==false&&this.props.pasteNoStyle&&<PasteNoStyleControls receiveText={this.pasteNoStyle}/>}
          {this.state.showMarkdownSource==false&&this.props.blockStyle&&<BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType}/>}
          {this.props.alignment&&this.props.convertFormat!=="markdown"&&<AlignmentControls editorState={editorState} onToggle={this.toggleAlignment}/>}
          {this.state.showMarkdownSource==false&&this.props.inlineStyle&&<InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle}/>}
          {this.props.color&&this.props.convertFormat!=="markdown"&&<ColorControls editorState={editorState} onToggle={this.toggleColor}/>}
          {this.state.showMarkdownSource==false&&this.props.image&&<ImgStyleControls uploadConfig={this.props.uploadConfig} receiveImage={this.addImage}/>}
          {this.state.showMarkdownSource==false&&this.props.video&&<VideoStyleControls uploadConfig={this.props.uploadConfig} receiveVideo={this.addVideo}/>}
          {this.state.showMarkdownSource==false&&this.props.audio&&<AudioStyleControls uploadConfig={this.props.uploadConfig} receiveAudio={this.addAudio}/>}
          {this.state.showMarkdownSource==false&&this.props.urls&&<AddUrl editorState={editorState} onToggle={this.promptForLink}/>}
          {this.state.showMarkdownSource==false&&this.props.urls&&<CloseUrl editorState={editorState} onToggle={this.removeLink}/>}
          {this.state.showMarkdownSource==false&&this.props.autoSave&&<AutoSaveControls receiveSavedItem={this.choiceAutoSave}/>}
          {this.props.fullScreen&&<OpenFull editorState={editorState} onToggle={this.openFull} coverTitle={this.state.openFullTest}/>}
          {this.props.convertFormat=="markdown"&&<SourceEditor editorState={editorState} onToggle={this.toggleSource} coverTitle={this.state.showSourceEditor}/>}
        </Affix>
        <div className={className} onClick={this.focus} style={{display:this.state.showMarkdownSource==true?"none":"block"}}>
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
            spellCheck={true}/>
        </div>
        <div style={{display:this.state.showMarkdownSource==true?"block":"none",height:"500px",width:"100%"}}>
          <textarea
            style={{height:"100%",width:"100%",overflowY:"visible" }}
            onChange={this.changeMrakdownContent}
            value={this.state.tempSouceContent||this.props.importContent}
            placeholder="请在这里编辑您的markdown内容"/>
        </div>
        {urlInput}
      </div>
    );
    // ref="editor"
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
  importContent: React.PropTypes.string,
  cbReceiver: React.PropTypes.func.isRequired,
  undoRedo: React.PropTypes.bool,
  removeStyle: React.PropTypes.bool,
  pasteNoStyle: React.PropTypes.bool,
  blockStyle: React.PropTypes.bool,
  alignment: React.PropTypes.bool,
  inlineStyle: React.PropTypes.bool,
  color: React.PropTypes.bool,
  image: React.PropTypes.bool,
  video: React.PropTypes.bool,
  audio: React.PropTypes.bool,
  urls: React.PropTypes.bool,
  autoSave: React.PropTypes.bool,
  fullScreen: React.PropTypes.bool,
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
   }),
  convertFormat: React.PropTypes.oneOf(['html', 'markdown', 'raw']),
}
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
  fullScreen:true,
  convertFormat: 'html',
};
// export default EditorConcist;
module.exports = EditorConcist;
