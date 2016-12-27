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
        <Popconfirm title="确认移除所选择文字的样式？" onConfirm={this.props.onToggle} okText="确认移除" cancelText="取消操作">
          <span className={className}>
            <Icon key="empty_style" type="editor_empty_style" />
          </span>
        </Popconfirm>
      </div>
    )
  }
}
module.exports = RemoveStyleControls;
