import React, {Component} from 'react';
import StyleButton from "./styleButton"
class InlineStyleControls extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const INLINE_STYLES = [
      {
        text: '加粗',
        style: 'BOLD',
        label: "editor_b"
      }, {
        text: '斜体',
        style: 'ITALIC',
        label: "editor_i"
      }, {
        text: '下划线',
        style: 'UNDERLINE',
        label: "editor_u"
      }, {
        text: '等宽字体',
        style: 'CODE',
        label: "editor_e"
      }
    ];
    let currentStyle = this.props.editorState
      ? this.props.editorState.getCurrentInlineStyle()
      : {};
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type, i) => <StyleButton
          key={type.style}
          text={type.text}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={this.props.onToggle}
          style={type.style}/>)}
      </div>
    )
  }
}
module.exports = InlineStyleControls;
