import React, {Component} from 'react';
import {Popconfirm,Icon} from 'antd';
class RemoveStyleControls extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let className = 'RichEditor-styleButton';
    return (
      <div className="RichEditor-controls">
          <span className={className} onClick= {this.props.onToggle}>
            <Icon key="empty_style" type="editor_select_block" />
          </span>
      </div>
    )
  }
}
module.exports = RemoveStyleControls;
