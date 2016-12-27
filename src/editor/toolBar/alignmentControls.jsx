import React, {Component} from 'react';
import StyleButton from "./styleButton"
const AlignmentControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  const BLOCK_TYPES = [
    {
      text:"左对齐",
      label: "editor_alignment_left",
      style: 'left'
    }, {
      text:"居中",
      label: "editor_alignment_center",
      style: 'center'
    }, {
      text:"右对齐",
      label: "editor_alignment_right",
      style: 'right'
    }, {
      text:"两端对齐",
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
