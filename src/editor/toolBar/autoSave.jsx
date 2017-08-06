import React, {Component} from 'react';
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
}
module.exports = AutoSave;
