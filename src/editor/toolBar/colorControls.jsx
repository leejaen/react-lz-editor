import React, {Component} from 'react';
import ColorButton from "./colorButton"
import {colorStyleMap} from "../utils/colorConfig"
class ColorControls extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      let currentStyle = this.props.editorState.getCurrentInlineStyle();
      let COLORS = Object.keys(colorStyleMap).map(item => {
        return {label: '　', alias: item, style: item}
      });
      return (
        <div className="RichEditor-controls" style={{
          paddingRight: "20px"
        }}>
          {COLORS.map((type, i) => <ColorButton
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={this.props.onToggle}
            style={type.style}
            key={i}
            split={((i == COLORS.length - 1)
            ? "|"
            : "")}/>)}
        </div>
      );
  }
}
module.exports = ColorControls;
