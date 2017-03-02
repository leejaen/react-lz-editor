import React, {Component} from 'react';
import {Icon,Tooltip} from "antd"
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton ant-btn ant-btn-primary ant-btn-icon-only ';
    }

    return (
      <span>
        <Tooltip placement="top" title={this.props.text}>
          <span className={className} onClick={this.onToggle}>
            <Icon type={`${this.props.label}`}/>
          </span>
        </Tooltip>
        {(() => {
          if (!!this.props.split) {
            return <span className="RichEditor-controls-split">{this.props.split}</span>;
          }
        })()}
      </span>
    );
  }
}
module.exports = StyleButton;
