'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BLOCK_TYPE = exports.BLOCK_TYPE = {
  UNSTYLED: 'unstyled',
  HEADER_ONE: 'header-one',
  HEADER_TWO: 'header-two',
  HEADER_THREE: 'header-three',
  HEADER_FOUR: 'header-four',
  HEADER_FIVE: 'header-five',
  HEADER_SIX: 'header-six',
  UNORDERED_LIST_ITEM: 'unordered-list-item',
  ORDERED_LIST_ITEM: 'ordered-list-item',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  CODE: 'code-block',
  ATOMIC: 'atomic'
};

var ENTITY_TYPE = exports.ENTITY_TYPE = {
  LINK: 'LINK',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO'
};

var INLINE_STYLE = exports.INLINE_STYLE = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  SPAN: 'SPAN',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE'
};

exports.default = {
  BLOCK_TYPE: BLOCK_TYPE,
  ENTITY_TYPE: ENTITY_TYPE,
  INLINE_STYLE: INLINE_STYLE
};