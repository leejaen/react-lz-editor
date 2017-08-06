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
        <Popconfirm title={this.props.lang.confirmToRemove} onConfirm={this.props.onToggle} okText={this.props.lang.doRemove} cancelText={this.props.lang.doNotRemove}>
          <span className={className}>
            <Icon key="empty_style" type="editor_empty_style" />
          </span>
        </Popconfirm>
      </div>
    )
  }
}
module.exports = RemoveStyleControls;
