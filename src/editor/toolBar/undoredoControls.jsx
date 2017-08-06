import React, {Component} from 'react';
import {Icon} from "antd"

class undoRedo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let className = 'RichEditor-styleButton';
    return (
      <div className="RichEditor-controls">
        <span className='RichEditor-styleButton' onClick={()=>this.props.onToggle("undo")} title={this.props.lang.undo}>
          <Icon key="_undo" type="editor_undo" />
        </span>
        <span className='RichEditor-styleButton' onClick={()=>this.props.onToggle("redo")} title={this.props.lang.redo}>
          <Icon key="_redo" type="editor_redo" />
        </span>
      </div>
    )
  }
};
module.exports = undoRedo;
