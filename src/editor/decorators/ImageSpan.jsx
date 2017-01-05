/* @flow */

// import autobind from 'class-autobind';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Entity} from 'draft-js';
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
      height
    };
    this.onHover=this._onHover.bind(this);
    this.onDoubleClick=this._onDoubleClick.bind(this);
  }

  componentDidMount() {
    const {width, height} = this.state;
    const entity = Entity.get(this.props.entityKey);
    const image = new Image();
    const {src} = entity.getData();
    image.src = src;
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
    const entity = Entity.get(this.props.entityKey);
    const {src} = entity.getData();
    //console.log("styles.root: ", styles.root); className = cx(className, styles.root);
    const imageStyle = {
      verticalAlign: 'bottom',
      backgroundImage: `url("${src}")`,
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
      <figure className="editor-inline-image">
        <img src={`${src}`} className="media-image" onClick={(event)=>{this.onHover(event);event.stopPropagation();}} onDoubleClick={this.onDoubleClick}/>
      </figure>
    );
  }

  _onDoubleClick() {
    //弹框编辑
    let currentPicture=ReactDom.findDOMNode(this).querySelector("img");
    let pictureWidth=currentPicture.naturalWidth;
    let pictureSrc=currentPicture.src;
      console.log("pictureSrc",pictureSrc);
      // currentPicture.src="http://www.cbinews.com/article/image/20161027/20161027091805_674.png"
  }
  _onHover(e:any){
    let currentPicture=ReactDom.findDOMNode(this).querySelector("img");
    let pictureWidth=currentPicture.naturalWidth;
      console.log("pictureWidth：",pictureWidth);
    if (pictureWidth==0) {
      message.error("图片地址错误！")
    }else if(pictureWidth>650) {
      message.error("图片尺寸过大将会导致用户流量浪费！请调整至最大650px。",10)
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
