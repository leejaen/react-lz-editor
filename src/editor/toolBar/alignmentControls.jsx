import React, {Component} from 'react';
import StyleButton from "./styleButton"
const AlignmentControls = (props) => {
  const {editorState,lang} = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  const BLOCK_TYPES = [
    {
      text:lang.alignLeft,
      label: "editor_alignment_left",
      style: 'left'
    }, {
      text:lang.alignCenter,
      label: "editor_alignment_center",
      style: 'center'
    }, {
      text:lang.alignRight,
      label: "editor_alignment_right",
      style: 'right'
    }, {
      text:lang.alignJustify,
      label: "editor_alignment_justify",
      style: 'justify'
    }
  ];
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type, i) => {
        let button = <StyleButton
          key={type.style}
          text={type.text}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}/>
        return button;
      })}
    </div>
  );
};
module.exports = AlignmentControls;
