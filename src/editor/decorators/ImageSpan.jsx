/* @flow */

// import autobind from 'class-autobind';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Entity,EditorState} from 'draft-js';
import {message} from 'antd';

// $FlowIssue - Flow doesn't understand CSS Modules
import styles from './decoratorStyle.css';

export default class ImageSpan extends Component {
  constructor(props : Props) {
    super(props);
    // autobind(this);
    const entity = Entity.get(this.props.entityKey);
    const {width, height} = entity.getData();
    this.state = {
      width,
      height,
      imageSrc:''
    };
    this.onImageClick=this._onImageClick.bind(this);
    this.onDoubleClick=this._onDoubleClick.bind(this);
  }

  componentDidMount() {
    const {width, height} = this.state;
    const entity = Entity.get(this.props.entityKey);
    const image = new Image();
    let {src} = entity.getData();
    src=src.replace(/[-?*!].*$/g,"");
    this.setState({imageSrc:src});
    image.src = this.state.imageSrc;
    image.onload = () => {
      if (width == null || height == null) {
        // TODO: isMounted?
        this.setState({width: image.width, height: image.height});
        Entity.mergeData(this.props.entityKey, {
          width: image.width,
          height: image.height,
          originalWidth: image.width,
          originalHeight: image.height
        });
      }
    };
  }

  render() {
    const {width, height} = this.state;
    //let {className} = this.props;
    let key=this.props.entityKey;
    const entity = Entity.get(key);
    const {src} = entity.getData();
    // this.setState({imageSrc:src});
    //console.log("styles.root: ", styles.root); className = cx(className, styles.root);
    const imageStyle = {
      verticalAlign: 'bottom',
      backgroundImage: `url("${this.state.imageSrc}")`,
      backgroundSize: `${width}px ${height}px`,
      lineHeight: `${height}px`,
      fontSize: `${height}px`,
      width,
      height,
      letterSpacing: width
    };

    //   return (       <span           className="editor-inline-image"           style={imageStyle}
    // onClick={this._onClick}           >   {this.props.children} </span>   );
    //<tips> {imageStyle.width&&imageStyle.height?`宽${imageStyle.width}px；高${imageStyle.height}px`:""}</tips>
    return (
      <div className="editor-inline-image" onClick={this._onClick}>
        <img src={`${this.state.imageSrc}`} className="media-image" onClick={(event)=>{this.onImageClick(event,key);event.stopPropagation();}} onDoubleClick={this.onDoubleClick}/>
      </div>
    );
  }

  _onDoubleClick() {
    //弹框编辑
    let currentPicture=ReactDom.findDOMNode(this).querySelector("img");
    let pictureWidth=currentPicture.naturalWidth;
    let pictureSrc=currentPicture.src;
      // console.log("pictureSrc",pictureSrc);
      // currentPicture.src="http://www.cbinews.com/article/image/20161027/20161027091805_674.png"
  }
  _onImageClick(e:any,key){
    let currentPicture=ReactDom.findDOMNode(this).querySelector("img");
      // console.log("currentPicture:",currentPicture.src);
    let pictureWidth=currentPicture.naturalWidth;
    // console.log("this",this);
    // console.log("this.props.children[0].key",this.props.children[0].key);
    // console.log("this.state.editorState",EditorState);
    // console.log("key",key);
    // console.log("pictureWidth：",pictureWidth);

    const editorState=EditorState.createEmpty();
    const selection = editorState.getSelection();
    // console.log("selection",selection);
    const blockTree = editorState.getBlockTree(this.props.children[0].key);
    // console.log("blockTree",blockTree);
    // this.setState({imageSrc:"https://image.qiluyidian.mobi/87928142151028397142qn1d609U291dGhFYXN0.jpg"});
    if (pictureWidth==0) {
      message.error("图片地址错误！")
    }else if(pictureWidth>650) {
      message.error("图片尺寸过大将会导致用户流量浪费！请调整至最大650px。",10);
    }
  }

  _handleResize(event : Object, data : Object) {
    const {width, height} = data.size;
    this.setState({width, height});
    Entity.mergeData(this.props.entityKey, {width, height});
  }
}
//ImageSpan.propTypes={  children: React.PropTypes,  entityKey: string,  className?: string }

ImageSpan.defaultProps = {
  children: null,
  entityKey: "",
  className: ""
}
