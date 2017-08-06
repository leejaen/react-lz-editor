import React, {Component} from 'react';
import {Icon} from "antd"

class OpenFull extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="RichEditor-controls">
        <span className="RichEditor-styleButton" onClick={this.props.onToggle}>
          {this.props.coverTitle}
        </span>
      </div>
    )
  }
}
class AutoSave extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="RichEditor-controls">
        <span className="RichEditor-styleButton" onClick={this.props.onToggle}>
          {this.props.lang.autoSave}
        </span>
      </div>
    )
  }
};
class SourceEditor extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="RichEditor-controls">
        <span className="RichEditor-styleButton" onClick={this.props.onToggle}>
          {this.props.coverTitle}
        </span>
      </div>
    )
  }
};
module.exports = {
  OpenFull,
  AutoSave,
  SourceEditor
};
