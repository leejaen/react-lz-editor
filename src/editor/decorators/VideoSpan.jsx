/* @flow */

// import autobind from 'class-autobind';
import React, {Component} from 'react';
import {Entity} from 'draft-js';

// $FlowIssue - Flow doesn't understand CSS Modules
import styles from './decoratorStyle.css';

export default class VideoSpan extends Component {
  constructor(props : Props) {
    super(props);
    // autobind(this);
    const entity = Entity.get(this.props.entityKey);
    const {width, height} = entity.getData();
    this.state = {
      width,
      height
    };
  }

  componentDidMount() {
    const {width
      , height} = this.state;
    const entity = Entity.get(this.props.entityKey);
    const video = document.createElement('video');
    const {src} = entity.getData();
    video.src = src;
    video.onload = () => {
      if (width == null || height == null) {
        // TODO: isMounted?
        this.setState({width: video.width, height: video.height});
        Entity.mergeData(this.props.entityKey, {
          width: video.width,
          height: video.height,
          originalWidth: video.width,
          originalHeight: video.height
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
    const videoStyle = {
      verticalAlign: 'bottom',
      backgroundImage: `url("${src}")`,
      backgroundSize: `${width}px ${height}px`,
      lineHeight: `${height}px`,
      fontSize: `${height}px`,
      width,
      height,
      letterSpacing: width
    };

    //   return (       <span           className="editor-inline-video"           style={videoStyle}
    // onClick={this._onClick}           >   {this.props.children} </span>   );
    return (
      <figure className="editor-inline-video" onClick={this._onClick}>
        <video controls="controls" src={`${src}`} className="media-video"></video>
      </figure>
    );
  }

  _onClick() {
    //console.log('video click');
  }

  _handleResize(event : Object, data : Object) {
    const {width, height} = data.size;
    this.setState({width, height});
    Entity.mergeData(this.props.entityKey, {width, height});
  }
}
//VideoSpan.propTypes={  children: React.PropTypes,  entityKey: string,  className?: string }

VideoSpan.defaultProps = {
  children: null,
  entityKey: "",
  className: ""
}
