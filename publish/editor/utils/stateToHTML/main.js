'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ENTITY_ATTR_MAP, _DATA_TO_ATTR;

exports.default = stateToHTML;

var _draftJs = require('draft-js');

var _main = require('../stateUtils/main');

var _colorConfig = require('../colorConfig');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BOLD = _main.INLINE_STYLE.BOLD,
    CODE = _main.INLINE_STYLE.CODE,
    ITALIC = _main.INLINE_STYLE.ITALIC,
    STRIKETHROUGH = _main.INLINE_STYLE.STRIKETHROUGH,
    UNDERLINE = _main.INLINE_STYLE.UNDERLINE;


var INDENT = '  ';
var BREAK = '<br>';

// Map entity data to element attributes.
var ENTITY_ATTR_MAP = (_ENTITY_ATTR_MAP = {}, _defineProperty(_ENTITY_ATTR_MAP, _main.ENTITY_TYPE.LINK, { url: 'href', rel: 'rel', target: 'target', title: 'title', className: 'class' }), _defineProperty(_ENTITY_ATTR_MAP, _main.ENTITY_TYPE.IMAGE, { src: 'src', height: 'height', width: 'width', alt: 'alt', className: 'class' }), _defineProperty(_ENTITY_ATTR_MAP, _main.ENTITY_TYPE.VIDEO, { src: 'src', controls: 'controls', height: 'height', width: 'width', alt: 'alt', className: 'class' }), _defineProperty(_ENTITY_ATTR_MAP, _main.ENTITY_TYPE.AUDIO, { src: 'src', controls: 'controls', height: 'height', width: 'width', alt: 'alt', className: 'class' }), _ENTITY_ATTR_MAP);

// Map entity data to element attributes.
var DATA_TO_ATTR = (_DATA_TO_ATTR = {}, _defineProperty(_DATA_TO_ATTR, _main.ENTITY_TYPE.LINK, function (entityType, entity) {
  var attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
  var data = entity.getData();
  var attrs = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var dataKey = _step.value;

      var dataValue = data[dataKey];
      if (attrMap.hasOwnProperty(dataKey)) {
        var attrKey = attrMap[dataKey];
        attrs[attrKey] = dataValue;
      } else if (DATA_ATTRIBUTE.test(dataKey)) {
        attrs[dataKey] = dataValue;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return attrs;
}), _defineProperty(_DATA_TO_ATTR, _main.ENTITY_TYPE.IMAGE, function (entityType, entity) {
  var attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
  var data = entity.getData();
  var attrs = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(data)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var dataKey = _step2.value;

      var dataValue = data[dataKey];
      if (attrMap.hasOwnProperty(dataKey)) {
        var attrKey = attrMap[dataKey];
        attrs[attrKey] = dataValue;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return attrs;
}), _defineProperty(_DATA_TO_ATTR, _main.ENTITY_TYPE.VIDEO, function (entityType, entity) {
  var attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
  var data = entity.getData();
  var attrs = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = Object.keys(data)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var dataKey = _step3.value;

      var dataValue = data[dataKey];
      if (attrMap.hasOwnProperty(dataKey)) {
        var attrKey = attrMap[dataKey];
        attrs[attrKey] = dataValue;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return attrs;
}), _defineProperty(_DATA_TO_ATTR, _main.ENTITY_TYPE.AUDIO, function (entityType, entity) {
  var attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
  var data = entity.getData();
  var attrs = {};
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = Object.keys(data)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var dataKey = _step4.value;

      var dataValue = data[dataKey];
      if (attrMap.hasOwnProperty(dataKey)) {
        var attrKey = attrMap[dataKey];
        attrs[attrKey] = dataValue;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return attrs;
}), _DATA_TO_ATTR);

// The reason this returns an array is because a single block might get wrapped
// in two tags.
function getTags(blockType) {
  switch (blockType) {
    case _main.BLOCK_TYPE.HEADER_ONE:
      return ['h1'];
    case _main.BLOCK_TYPE.HEADER_TWO:
      return ['h2'];
    case _main.BLOCK_TYPE.HEADER_THREE:
      return ['h3'];
    case _main.BLOCK_TYPE.HEADER_FOUR:
      return ['h4'];
    case _main.BLOCK_TYPE.HEADER_FIVE:
      return ['h5'];
    case _main.BLOCK_TYPE.HEADER_SIX:
      return ['h6'];
    case _main.BLOCK_TYPE.UNORDERED_LIST_ITEM:
    case _main.BLOCK_TYPE.ORDERED_LIST_ITEM:
      return ['li'];
    case _main.BLOCK_TYPE.BLOCKQUOTE:
      return ['blockquote'];
    case _main.BLOCK_TYPE.CODE:
      return ['pre', 'code'];
    // case BLOCK_TYPE.ATOMIC:
    //   return ['figure'];//Support atomic block type
    default:
      return ['p'];
  }
}

function getWrapperTag(blockType) {
  switch (blockType) {
    case _main.BLOCK_TYPE.UNORDERED_LIST_ITEM:
      return 'ul';
    case _main.BLOCK_TYPE.ORDERED_LIST_ITEM:
      return 'ol';
    default:
      return null;
  }
}

var MarkupGenerator = function () {
  function MarkupGenerator(contentState) {
    _classCallCheck(this, MarkupGenerator);

    this.contentState = contentState;
  }
  // These are related to state.


  _createClass(MarkupGenerator, [{
    key: 'generate',
    value: function generate() {
      this.output = [];
      this.blocks = this.contentState.getBlocksAsArray();
      this.totalBlocks = this.blocks.length;
      this.currentBlock = 0;
      this.indentLevel = 0;
      this.wrapperTag = null;
      while (this.currentBlock < this.totalBlocks) {
        this.processBlock();
      }
      this.closeWrapperTag();
      return this.output.join('').trim();
    }
  }, {
    key: 'processBlock',
    value: function processBlock() {
      var block = this.blocks[this.currentBlock];
      var blockType = block.getType();
      var blockData = block.getData();
      var newWrapperTag = getWrapperTag(blockType);
      if (this.wrapperTag !== newWrapperTag) {
        if (this.wrapperTag) {
          this.closeWrapperTag();
        }
        if (newWrapperTag) {
          this.openWrapperTag(newWrapperTag);
        }
      }
      this.indent();
      this.writeStartTag(blockType, blockData);
      this.output.push(this.renderBlockContent(block));
      // Look ahead and see if we will nest list.
      var nextBlock = this.getNextBlock();
      if (canHaveDepth(blockType) && nextBlock && nextBlock.getDepth() === block.getDepth() + 1) {
        this.output.push('\n');
        // This is a litle hacky: temporarily stash our current wrapperTag and
        // render child list(s).
        var thisWrapperTag = this.wrapperTag;
        this.wrapperTag = null;
        this.indentLevel += 1;
        this.currentBlock += 1;
        this.processBlocksAtDepth(nextBlock.getDepth());
        this.wrapperTag = thisWrapperTag;
        this.indentLevel -= 1;
        this.indent();
      } else {
        this.currentBlock += 1;
      }
      this.writeEndTag(blockType);
    }
  }, {
    key: 'processBlocksAtDepth',
    value: function processBlocksAtDepth(depth) {
      var block = this.blocks[this.currentBlock];
      while (block && block.getDepth() === depth) {
        this.processBlock();
        block = this.blocks[this.currentBlock];
      }
      this.closeWrapperTag();
    }
  }, {
    key: 'getNextBlock',
    value: function getNextBlock() {
      return this.blocks[this.currentBlock + 1];
    }
  }, {
    key: 'writeStartTag',
    value: function writeStartTag(blockType, blockData) {
      var tags = getTags(blockType);
      var blockStyle = "",
          blockAlign = blockData.get("textAlignment");
      if (blockAlign) {
        blockStyle = "text-align:" + blockAlign + ';';
      }
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = tags[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var tag = _step5.value;

          this.output.push('<' + tag + ' ' + (blockStyle ? " style='" + blockStyle + "'" : "") + '>');
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: 'writeEndTag',
    value: function writeEndTag(blockType) {
      var tags = getTags(blockType);
      if (tags.length === 1) {
        this.output.push('</' + tags[0] + '>\n');
      } else {
        var output = [];
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = tags[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var tag = _step6.value;

            output.unshift('</' + tag + '>');
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        this.output.push(output.join('') + '\n');
      }
    }
  }, {
    key: 'openWrapperTag',
    value: function openWrapperTag(wrapperTag) {
      this.wrapperTag = wrapperTag;
      this.indent();
      this.output.push('<' + wrapperTag + '>\n');
      this.indentLevel += 1;
    }
  }, {
    key: 'closeWrapperTag',
    value: function closeWrapperTag() {
      var wrapperTag = this.wrapperTag;

      if (wrapperTag) {
        this.indentLevel -= 1;
        this.indent();
        this.output.push('</' + wrapperTag + '>\n');
        this.wrapperTag = null;
      }
    }
  }, {
    key: 'indent',
    value: function indent() {
      this.output.push(INDENT.repeat(this.indentLevel));
    }
  }, {
    key: 'renderBlockContent',
    value: function renderBlockContent(block) {
      var blockType = block.getType();
      var text = block.getText();
      if (text === '') {
        // Prevent element collapse if completely empty.
        return BREAK;
      }
      text = this.preserveWhitespace(text);
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

          var content = encodeContent(text);
          // These are reverse alphabetical by tag name.
          if (style.has(BOLD)) {
            content = '<strong>' + content + '</strong>';
          }
          if (style.has(UNDERLINE)) {
            content = '<ins>' + content + '</ins>';
          }
          if (style.has(ITALIC)) {
            content = '<em>' + content + '</em>';
          }
          if (style.has(STRIKETHROUGH)) {
            content = '<del>' + content + '</del>';
          }
          Object.keys(_colorConfig.colorStyleMap).map(function (keyItem) {
            if (!!keyItem && style.has(keyItem)) {
              content = '<span style="color:' + _colorConfig.colorStyleMap[keyItem].color + '">' + content + '</span>';
            }
          });
          if (style.has(CODE)) {
            // If our block type is CODE then we are already wrapping the whole
            // block in a `<code>` so don't wrap inline code elements.
            content = blockType === _main.BLOCK_TYPE.CODE ? content : '<code>' + content + '</code>';
          }
          return content;
        }).join('');
        var entity = entityKey ? _draftJs.Entity.get(entityKey) : null;
        // Note: The `toUpperCase` below is for compatability with some libraries that use lower-case for image blocks.
        var entityType = entity == null || !entity.getType() ? null : entity.getType().toUpperCase();
        if (entityType != null && entityType === _main.ENTITY_TYPE.LINK) {
          var attrs = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;
          var attrString = stringifyAttrs(attrs);
          return '<a' + attrString + '>' + content + '</a>';
        } else if (entityType != null && entityType === _main.ENTITY_TYPE.IMAGE) {
          var _attrs = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;
          var _attrString = stringifyAttrs(_attrs);
          return '<img' + _attrString + '/>';
        } else if (entityType != null && entityType === _main.ENTITY_TYPE.VIDEO) {
          var _attrs2 = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;
          var _attrString2 = stringifyAttrs(_attrs2);
          return '<video' + _attrString2 + '></video>';
        } else if (entityType != null && entityType === _main.ENTITY_TYPE.AUDIO) {
          var _attrs3 = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;
          var _attrString3 = stringifyAttrs(_attrs3);
          return '<audio' + _attrString3 + '></audio>';
        } else {
          return content;
        }
      }).join('');
    }
  }, {
    key: 'preserveWhitespace',
    value: function preserveWhitespace(text) {
      var length = text.length;
      // Prevent leading/trailing/consecutive whitespace collapse.
      var newText = new Array(length);
      for (var i = 0; i < length; i++) {
        if (text[i] === ' ' && (i === 0 || i === length - 1 || text[i - 1] === ' ')) {
          newText[i] = '\xA0';
        } else {
          newText[i] = text[i];
        }
      }
      return newText.join('');
    }
  }]);

  return MarkupGenerator;
}();

function stringifyAttrs(attrs) {
  if (attrs == null) {
    return '';
  }
  var parts = [];
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = Object.keys(attrs)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var attrKey = _step7.value;

      var attrValue = attrs[attrKey];
      if (attrKey == "src") {
        // Get reality url resources.
        attrValue = attrValue.replace(/[-?#&].*$/g, "");
      }
      if (attrValue != null) {
        parts.push(' ' + attrKey + '="' + encodeAttr(attrValue + '') + '"');
      }
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return parts.join('');
}

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
  return text.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('\xA0').join('&nbsp;').split('\n').join(BREAK + '\n');
}

function encodeAttr(text) {
  return text.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
}

function stateToHTML(content) {
  return new MarkupGenerator(content).generate();
}