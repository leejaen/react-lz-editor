import React, {Component} from 'react';
import {Tooltip, Icon} from "antd"
class AddUrl extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="RichEditor-controls">
        <span className="RichEditor-styleButton" onClick={this.props.onToggle} title={this.props.lang.addLink}>
          <Icon type="editor_link"/>
        </span>
      </div>
    )
  }
}

class CloseUrl extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="RichEditor-controls">
        <span className="RichEditor-styleButton" onClick={this.props.onToggle} title={this.props.lang.removeLink}>
          <Icon type="editor_unlink"/>
        </span>
      </div>
    )
  }
}

module.exports = {
  AddUrl,
  CloseUrl
};
