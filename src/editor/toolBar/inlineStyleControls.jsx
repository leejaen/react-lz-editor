import React, {Component} from 'react';
import StyleButton from "./styleButton"
class InlineStyleControls extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {editorState,onToggle,lang} = this.props;
    const INLINE_STYLES = [
      {
        text: lang.textBold,
        style: 'BOLD',
        label: "editor_b"
      }, {
        text: lang.textItalic,
        style: 'ITALIC',
        label: "editor_i"
      }, {
        text: lang.textUnderline,
        style: 'UNDERLINE',
        label: "editor_u"
      }, {
        text: lang.textCode,
        style: 'CODE',
        label: "editor_e"
      }
    ];
    let currentStyle = editorState
      ? editorState.getCurrentInlineStyle()
      : {};
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type, i) => <StyleButton
          key={type.style}
          text={type.text}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}/>)}
      </div>
    )
  }
}
module.exports = InlineStyleControls;
