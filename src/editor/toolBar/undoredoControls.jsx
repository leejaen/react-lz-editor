import React, {Component} from 'react';
import {Tooltip, Icon} from "antd"

class UndoRedo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let className = 'RichEditor-styleButton';
    return (
      <div className="RichEditor-controls">
        <span className='RichEditor-styleButton' onClick={()=>this.props.onToggle("undo")}>
          <Icon key="_undo" type="editor_undo" />
        </span>
        <span className='RichEditor-styleButton' onClick={()=>this.props.onToggle("redo")}>
          <Icon key="_redo" type="editor_redo" />
        </span>
      </div>
    )
  }
};
module.exports = UndoRedo;
