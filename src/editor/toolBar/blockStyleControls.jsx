import React, {Component} from 'react';
import StyleButton from "./styleButton"
const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  const BLOCK_TYPES = [
    {
      text:"标题1",
      label: "editor_H1",
      style: 'header-one'
    }, {
      text:"标题2",
      label: "editor_H2",
      style: 'header-two'
    }, {
      text:"标题3",
      label: "editor_H3",
      style: 'header-three'
    }, {
      text:"标题4",
      label: "editor_H4",
      style: 'header-four'
    }, {
      text:"引用",
      label: "editor_refs",
      style: 'blockquote'
    }, {
      text:"无序列表",
      label: "editor_ul",
      style: 'unordered-list-item'
    }, {
      text:"有序列表",
      label: "editor_ol",
      style: 'ordered-list-item'
    }, {
      text:"区段",
      label: "editor_pre",
      style: 'code-block'
    // },{
    //   label: '左对齐',
    //   style: 'alignment-left'
    // },{
    //   label: '居中对齐',
    //   style: 'alignment-center'
    // },{
    //   label: '右对齐',
    //   style: 'alignment-right'
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
module.exports = BlockStyleControls;
