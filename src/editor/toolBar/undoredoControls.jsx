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
        <span className='RichEditor-styleButton' onClick={()=>this.props.onToggle("undo")} title="撤销（Ctrl-Z，Cmd-Z）">
          <Icon key="_undo" type="editor_undo" />
        </span>
        <span className='RichEditor-styleButton' onClick={()=>this.props.onToggle("redo")} title="重做（Ctrl-Y，Cmd-Shift-Z）">
          <Icon key="_redo" type="editor_redo" />
        </span>
      </div>
    )
  }
};
module.exports = undoRedo;
