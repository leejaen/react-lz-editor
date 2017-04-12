'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = stateToMarkdown;

var _main = require('../stateUtils/main');

var _draftJs = require('draft-js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOLD = _main.INLINE_STYLE.BOLD,
    CODE = _main.INLINE_STYLE.CODE,
    ITALIC = _main.INLINE_STYLE.ITALIC,
    STRIKETHROUGH = _main.INLINE_STYLE.STRIKETHROUGH,
    UNDERLINE = _main.INLINE_STYLE.UNDERLINE;


var CODE_INDENT = '    ';

var MarkupGenerator = function () {
  function MarkupGenerator(contentState) {
    _classCallCheck(this, MarkupGenerator);

    this.contentState = contentState;
  }

  _createClass(MarkupGenerator, [{
    key: 'generate',
    value: function generate() {
      this.output = [];
      this.blocks = this.contentState.getBlockMap().toArray();
      this.totalBlocks = this.blocks.length;
      this.currentBlock = 0;
      this.listItemCounts = {};
      while (this.currentBlock < this.totalBlocks) {
        this.processBlock();
      }
      return this.output.join('');
    }
  }, {
    key: 'processBlock',
    value: function processBlock() {
      var block = this.blocks[this.currentBlock];
      var blockType = block.getType();
      switch (blockType) {
        case _main.BLOCK_TYPE.HEADER_ONE:
          {
            this.insertLineBreaks(1);
            this.output.push('# ' + this.renderBlockContent(block) + '\n');
            break;
          }
        case _main.BLOCK_TYPE.HEADER_TWO:
          {
            this.insertLineBreaks(1);
            this.output.push('## ' + this.renderBlockContent(block) + '\n');
            break;
          }
        case _main.BLOCK_TYPE.HEADER_THREE:
          {
            this.insertLineBreaks(1);
            this.output.push('### ' + this.renderBlockContent(block) + '\n');
            break;
          }
        case _main.BLOCK_TYPE.HEADER_FOUR:
          {
            this.insertLineBreaks(1);
            this.output.push('#### ' + this.renderBlockContent(block) + '\n');
            break;
          }
        case _main.BLOCK_TYPE.HEADER_FIVE:
          {
            this.insertLineBreaks(1);
            this.output.push('##### ' + this.renderBlockContent(block) + '\n');
            break;
          }
        case _main.BLOCK_TYPE.HEADER_SIX:
          {
            this.insertLineBreaks(1);
            this.output.push('###### ' + this.renderBlockContent(block) + '\n');
            break;
          }
        case _main.BLOCK_TYPE.UNORDERED_LIST_ITEM:
          {
            var blockDepth = block.getDepth();
            var lastBlock = this.getLastBlock();
            var lastBlockType = lastBlock ? lastBlock.getType() : null;
            var lastBlockDepth = lastBlock && canHaveDepth(lastBlockType) ? lastBlock.getDepth() : null;
            if (lastBlockType !== blockType && lastBlockDepth !== blockDepth - 1) {
              this.insertLineBreaks(1);

              if (lastBlockType === _main.BLOCK_TYPE.ORDERED_LIST_ITEM) {
                this.insertLineBreaks(1);
              }
            }
            var indent = ' '.repeat(block.depth * 4);
            this.output.push(indent + '- ' + this.renderBlockContent(block) + '\n');
            break;
          }
        case _main.BLOCK_TYPE.ORDERED_LIST_ITEM:
          {
            var _blockDepth = block.getDepth();
            var _lastBlock = this.getLastBlock();
            var _lastBlockType = _lastBlock ? _lastBlock.getType() : null;
            var _lastBlockDepth = _lastBlock && canHaveDepth(_lastBlockType) ? _lastBlock.getDepth() : null;
            if (_lastBlockType !== blockType && _lastBlockDepth !== _blockDepth - 1) {
              this.insertLineBreaks(1);

              if (_lastBlockType === _main.BLOCK_TYPE.UNORDERED_LIST_ITEM) {
                this.insertLineBreaks(1);
              }
            }
            var _indent = ' '.repeat(_blockDepth * 4);

            var count = this.getListItemCount(block) % 10;
            this.output.push(_indent + (count + '. ') + this.renderBlockContent(block) + '\n');
            break;
          }
        case _main.BLOCK_TYPE.BLOCKQUOTE:
          {
            this.insertLineBreaks(1);
            this.output.push(' > ' + this.renderBlockContent(block) + '\n');
            break;
          }
        case _main.BLOCK_TYPE.CODE:
          {
            this.insertLineBreaks(1);
            this.output.push(CODE_INDENT + this.renderBlockContent(block) + '\n');
            break;
          }
        default:
          {
            this.insertLineBreaks(1);
            this.output.push(this.renderBlockContent(block) + '\n');
            break;
          }
      }
      this.currentBlock += 1;
    }
  }, {
    key: 'getLastBlock',
    value: function getLastBlock() {
      return this.blocks[this.currentBlock - 1];
    }
  }, {
    key: 'getNextBlock',
    value: function getNextBlock() {
      return this.blocks[this.currentBlock + 1];
    }
  }, {
    key: 'getListItemCount',
    value: function getListItemCount(block) {
      var blockType = block.getType();
      var blockDepth = block.getDepth();

      var index = this.currentBlock - 1;
      var prevBlock = this.blocks[index];
      while (prevBlock && canHaveDepth(prevBlock.getType()) && prevBlock.getDepth() > blockDepth) {
        index -= 1;
        prevBlock = this.blocks[index];
      }
      if (!prevBlock || prevBlock.getType() !== blockType || prevBlock.getDepth() !== blockDepth) {
        this.listItemCounts[blockDepth] = 0;
      }
      return this.listItemCounts[blockDepth] = this.listItemCounts[blockDepth] + 1;
    }
  }, {
    key: 'insertLineBreaks',
    value: function insertLineBreaks() {
      if (this.currentBlock > 0) {
        this.output.push('\n');
      }
    }
  }, {
    key: 'renderBlockContent',
    value: function renderBlockContent(block) {
      var blockType = block.getType();
      var text = block.getText();
      if (text === '') {
        return '\u200B';
      }
      var charMetaList = block.getCharacterList();
      var entityPieces = (0, _main.getEntityRanges)(text, charMetaList);
      return entityPieces.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            entityKey = _ref2[0],
            stylePieces = _ref2[1];

        var content = stylePieces.map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              text = _ref4[0],
              style = _ref4[1];

          if (!text) {
            return '';
          }
          var content = encodeContent(text);
          if (style.has(BOLD)) {
            content = '**' + content + '**';
          }
          if (style.has(UNDERLINE)) {
            content = '++' + content + '++';
          }
          if (style.has(ITALIC)) {
            content = '_' + content + '_';
          }
          if (style.has(STRIKETHROUGH)) {
            content = '~~' + content + '~~';
          }
          if (style.has(CODE)) {
            content = blockType === _main.BLOCK_TYPE.CODE ? content : '`' + content + '`';
          }
          return content;
        }).join('');
        var entity = entityKey ? _draftJs.Entity.get(entityKey) : null;
        if (entity != null && entity.getType() === _main.ENTITY_TYPE.LINK) {
          var data = entity.getData();
          var url = data.url || '';
          var title = data.title ? ' "' + escapeTitle(data.title) + '"' : '';
          return '[' + content + '](' + encodeURL(url) + title + ')';
        } else if (entity != null && entity.getType() === _main.ENTITY_TYPE.IMAGE) {
          var _data = entity.getData();
          var src = _data.src || '';
          var alt = _data.alt ? ' "' + escapeTitle(_data.alt) + '"' : '';
          return '![' + alt + '](' + encodeURL(src) + ')';
        } else {
          return content;
        }
      }).join('');
    }
  }]);

  return MarkupGenerator;
}();

function canHaveDepth(blockType) {
  switch (blockType) {
    case _main.BLOCK_TYPE.UNORDERED_LIST_ITEM:
    case _main.BLOCK_TYPE.ORDERED_LIST_ITEM:
      return true;
    default:
      return false;
  }
}

function encodeContent(text) {
  return text.replace(/[*_`]/g, '\\$&');
}

function encodeURL(url) {
  return url.replace(/\)/g, '%29');
}

function escapeTitle(text) {
  return text.replace(/"/g, '\\"');
}

function stateToMarkdown(content) {
  return new MarkupGenerator(content).generate();
}