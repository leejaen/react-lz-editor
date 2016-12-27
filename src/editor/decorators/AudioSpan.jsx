/* @flow */

// import autobind from 'class-autobind';
import React, {Component} from 'react';
import {Entity} from 'draft-js';

// $FlowIssue - Flow doesn't understand CSS Modules
import styles from './decoratorStyle.css';

export default class AudioSpan extends Component {
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
    const audio = document.createElement('audio');
    const {src} = entity.getData();
    audio.src = src;
    audio.onload = () => {
      if (width == null || height == null) {
        // TODO: isMounted?
        this.setState({width: audio.width, height: audio.height});
        Entity.mergeData(this.props.entityKey, {
          width: audio.width,
          height: audio.height,
          originalWidth: audio.width,
          originalHeight: audio.height
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
    const audioStyle = {
      verticalAlign: 'bottom',
      backgroundImage: `url("${src}")`,
      backgroundSize: `${width}px ${height}px`,
      lineHeight: `${height}px`,
      fontSize: `${height}px`,
      width,
      height,
      letterSpacing: width
    };

    //   return (       <span           className="editor-inline-audio"           style={audioStyle}
    // onClick={this._onClick}           >   {this.props.children} </span>   );
    return (
      <figure className="editor-inline-audio" onClick={this._onClick}>
        <audio controls src={`${src}`} className="media-audio"></audio>
      </figure>
    );
  }

  _onClick() {
    //console.log('audio click');
  }

  _handleResize(event : Object, data : Object) {
    const {width, height} = data.size;
    this.setState({width, height});
    Entity.mergeData(this.props.entityKey, {width, height});
  }
}
//AudioSpan.propTypes={  children: React.PropTypes,  entityKey: string,  className?: string }

AudioSpan.defaultProps = {
  children: null,
  entityKey: "",
  className: ""
}
