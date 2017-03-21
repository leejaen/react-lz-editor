import React, {Component} from 'react';
import {Icon} from "antd"
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
        <span className={className} onClick={this.onToggle} title={this.props.text}>
          <Icon type={`${this.props.label}`}/>
        </span>
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
