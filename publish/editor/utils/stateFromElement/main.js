'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = stateFromElement;

var _replaceTextWithMeta3 = require('./replaceTextWithMeta');

var _replaceTextWithMeta4 = _interopRequireDefault(_replaceTextWithMeta3);

var _draftJs = require('draft-js');

var _immutable = require('immutable');

var _main = require('../stateUtils/main');

var _syntheticDom = require('synthetic-dom');

var _colorConfig = require('../colorConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NO_STYLE = (0, _immutable.OrderedSet)();
var NO_ENTITY = null;

var EMPTY_BLOCK = new _draftJs.ContentBlock({
  key: (0, _draftJs.genKey)(),
  text: '',
  type: _main.BLOCK_TYPE.UNSTYLED,
  characterList: (0, _immutable.List)(),
  depth: 0
});

var LINE_BREAKS = /(\r\n|\r|\n)/g;

var SOFT_BREAK_PLACEHOLDER = '\r';
var ZERO_WIDTH_SPACE = '\u200B';
var DATA_ATTRIBUTE = /^data-([a-z0-9-]+)$/;

var ELEM_ATTR_MAP = {
  a: { href: 'url', rel: 'rel', target: 'target', title: 'title' },
  span: { style: 'style', alt: 'alt' },
  img: { src: 'src', alt: 'alt' },
  video: { src: 'src', alt: 'alt', controls: 'controls' },
  audio: { src: 'src', alt: 'alt', controls: 'controls' }
};

var getEntityData = function getEntityData(tagName, element) {
  var data = {};
  if (ELEM_ATTR_MAP.hasOwnProperty(tagName)) {
    var attrMap = ELEM_ATTR_MAP[tagName];
    for (var i = 0; i < element.attributes.length; i++) {
      var _element$attributes$i = element.attributes[i],
          name = _element$attributes$i.name,
          value = _element$attributes$i.value;

      if (value != null) {
        if (attrMap.hasOwnProperty(name)) {
          var newName = attrMap[name];
          data[newName] = value;
        } else if (DATA_ATTRIBUTE.test(name)) {
          data[name] = value;
        }
      }
    }
  }
  return data;
};

var ELEM_TO_ENTITY = {
  a: function a(tagName, element) {
    var data = getEntityData(tagName, element);

    if (data.url != null) {
      return _draftJs.Entity.create(_main.ENTITY_TYPE.LINK, 'MUTABLE', data);
    }
  },
  img: function img(tagName, element) {
    var data = getEntityData(tagName, element);

    if (data.src != null) {
      return _draftJs.Entity.create(_main.ENTITY_TYPE.IMAGE, 'MUTABLE', data);
    }
  },
  video: function video(tagName, element) {
    var data = getEntityData(tagName, element);

    if (data.src != null) {
      return _draftJs.Entity.create(_main.ENTITY_TYPE.VIDEO, 'MUTABLE', data);
    }
  },
  audio: function audio(tagName, element) {
    var data = getEntityData(tagName, element);

    if (data.src != null) {
      return _draftJs.Entity.create(_main.ENTITY_TYPE.AUDIO, 'MUTABLE', data);
    }
  },
  span: function span(tagName, element) {
    var data = getEntityData(tagName, element);

    if (data.style != null) {
      return _draftJs.Entity.create(_main.ENTITY_TYPE.SPAN, 'MUTABLE', data);
    }
  }
};

var INLINE_ELEMENTS = {
  a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1,
  canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1,
  embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1,
  label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1,
  progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1,
  span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, var: 1,
  video: 1, wbr: 1, acronym: 1, applet: 1, basefont: 1, big: 1, font: 1,
  isindex: 1, strike: 1, style: 1, tt: 1
};

var SPECIAL_ELEMENTS = {
  area: 1, base: 1, br: 1, col: 1, colgroup: 1, command: 1, dl: 1, embed: 1,
  head: 1, hgroup: 1, hr: 1, iframe: 1, img: 1, input: 1, keygen: 1, link: 1,
  meta: 1, ol: 1, optgroup: 1, option: 1, param: 1, script: 1, select: 1,
  source: 1, style: 1, table: 1, tbody: 1, textarea: 1, tfoot: 1, thead: 1,
  title: 1, tr: 1, track: 1, ul: 1, wbr: 1, basefont: 1, dialog: 1, dir: 1,
  isindex: 1
};

var SELF_CLOSING_ELEMENTS = { img: 1, video: 2, audio: 3 };

var BlockGenerator = function () {
  function BlockGenerator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BlockGenerator);

    this.options = options;

    this.blockStack = [];

    this.blockList = [];
    this.depth = 0;
  }

  _createClass(BlockGenerator, [{
    key: 'process',
    value: function process(element) {
      this.processBlockElement(element);
      var contentBlocks = [];
      this.blockList.forEach(function (block) {
        var _concatFragments = concatFragments(block.textFragments),
            text = _concatFragments.text,
            characterMeta = _concatFragments.characterMeta;

        var includeEmptyBlock = false;

        if (text === SOFT_BREAK_PLACEHOLDER) {
          includeEmptyBlock = true;
          text = '';
        }
        if (block.tagName === 'pre') {
          var _trimLeadingNewline = trimLeadingNewline(text, characterMeta);

          text = _trimLeadingNewline.text;
          characterMeta = _trimLeadingNewline.characterMeta;
        } else {
          var _collapseWhiteSpace = collapseWhiteSpace(text, characterMeta);

          text = _collapseWhiteSpace.text;
          characterMeta = _collapseWhiteSpace.characterMeta;
        }

        text = text.split(SOFT_BREAK_PLACEHOLDER).join('\n').replace("　", "");

        if ((text.length || includeEmptyBlock) && text != "\n") {
          contentBlocks.push(new _draftJs.ContentBlock({
            key: (0, _draftJs.genKey)(),
            text: text,
            type: block.type,
            characterList: characterMeta.toList(),
            depth: block.depth,
            data: block.data
          }));
        }
      });
      if (contentBlocks.length) {
        return contentBlocks;
      } else {
        return [EMPTY_BLOCK];
      }
    }
  }, {
    key: 'getBlockTypeFromTagName',
    value: function getBlockTypeFromTagName(tagName) {
      switch (tagName) {
        case 'li':
          {
            var parent = this.blockStack.slice(-1)[0];
            return parent.tagName === 'ol' ? _main.BLOCK_TYPE.ORDERED_LIST_ITEM : _main.BLOCK_TYPE.UNORDERED_LIST_ITEM;
          }
        case 'blockquote':
          {
            return _main.BLOCK_TYPE.BLOCKQUOTE;
          }
        case 'h1':
          {
            return _main.BLOCK_TYPE.HEADER_ONE;
          }
        case 'h2':
          {
            return _main.BLOCK_TYPE.HEADER_TWO;
          }
        case 'h3':
          {
            return _main.BLOCK_TYPE.HEADER_THREE;
          }
        case 'h4':
          {
            return _main.BLOCK_TYPE.HEADER_FOUR;
          }
        case 'h5':
          {
            return _main.BLOCK_TYPE.HEADER_FIVE;
          }
        case 'h6':
          {
            return _main.BLOCK_TYPE.HEADER_SIX;
          }
        case 'pre':
          {
            return _main.BLOCK_TYPE.CODE;
          }

        default:
          {
            return _main.BLOCK_TYPE.UNSTYLED;
          }
      }
    }
  }, {
    key: 'processBlockElement',
    value: function processBlockElement(element) {
      var tagName = element.nodeName.toLowerCase();
      var type = this.getBlockTypeFromTagName(tagName);
      var hasDepth = canHaveDepth(type);
      var allowRender = !SPECIAL_ELEMENTS.hasOwnProperty(tagName);
      var blockData = new Map();
      if (element.style && element.style.textAlign) {
        blockData.set("textAlignment", element.style.textAlign);
      }
      var block = {
        tagName: tagName,
        textFragments: [],
        type: type,
        styleStack: [NO_STYLE],
        entityStack: [NO_ENTITY],
        depth: hasDepth ? this.depth : 0,
        data: blockData
      };
      if (allowRender) {
        this.blockList.push(block);
        if (hasDepth) {
          this.depth += 1;
        }
      }
      this.blockStack.push(block);
      if (element.childNodes != null) {
        Array.from(element.childNodes).forEach(this.processNode, this);
      }
      this.blockStack.pop();
      if (allowRender && hasDepth) {
        this.depth -= 1;
      }
    }
  }, {
    key: 'processInlineElement',
    value: function processInlineElement(element) {
      var tagName = element.nodeName.toLowerCase();
      if (tagName === 'br') {
        this.processText(SOFT_BREAK_PLACEHOLDER);
        return;
      }
      var block = this.blockStack.slice(-1)[0];
      var style = block.styleStack.slice(-1)[0];
      var entityKey = block.entityStack.slice(-1)[0];
      style = addStyleFromTagName(style, tagName, this.options.elementStyles, element);
      if (ELEM_TO_ENTITY.hasOwnProperty(tagName)) {
        entityKey = ELEM_TO_ENTITY[tagName](tagName, element) || entityKey;
      }
      block.styleStack.push(style);
      block.entityStack.push(entityKey);
      if (element.childNodes != null) {
        Array.from(element.childNodes).forEach(this.processNode, this);
      }
      if (SELF_CLOSING_ELEMENTS.hasOwnProperty(tagName)) {
        this.processText('~');
      }
      block.entityStack.pop();
      block.styleStack.pop();
    }
  }, {
    key: 'processTextNode',
    value: function processTextNode(node) {
      var text = node.nodeValue;

      text = text.replace(LINE_BREAKS, '\n');

      text = text.split(ZERO_WIDTH_SPACE).join(SOFT_BREAK_PLACEHOLDER);
      this.processText(text);
    }
  }, {
    key: 'processText',
    value: function processText(text) {
      var block = this.blockStack.slice(-1)[0];
      var style = block.styleStack.slice(-1)[0];
      var entity = block.entityStack.slice(-1)[0];
      var charMetadata = _draftJs.CharacterMetadata.create({
        style: style,
        entity: entity
      });
      var seq = (0, _immutable.Repeat)(charMetadata, text.length);
      block.textFragments.push({
        text: text,
        characterMeta: seq
      });
    }
  }, {
    key: 'processNode',
    value: function processNode(node) {
      if (node.nodeType === _syntheticDom.NODE_TYPE_ELEMENT) {
        var element = node;
        var _tagName = element.nodeName.toLowerCase();
        if (INLINE_ELEMENTS.hasOwnProperty(_tagName)) {
          this.processInlineElement(element);
        } else {
          this.processBlockElement(element);
        }
      } else if (node.nodeType === _syntheticDom.NODE_TYPE_TEXT) {
        this.processTextNode(node);
      }
    }
  }]);

  return BlockGenerator;
}();

function trimLeadingNewline(text, characterMeta) {
  if (text.charAt(0) === '\n') {
    text = text.slice(1);
    characterMeta = characterMeta.slice(1);
  }
  return { text: text, characterMeta: characterMeta };
}

function trimLeadingSpace(text, characterMeta) {
  while (text.charAt(0) === ' ') {
    text = text.slice(1);
    characterMeta = characterMeta.slice(1);
  }
  return { text: text, characterMeta: characterMeta };
}

function trimTrailingSpace(text, characterMeta) {
  while (text.slice(-1) === ' ') {
    text = text.slice(0, -1);
    characterMeta = characterMeta.slice(0, -1);
  }
  return { text: text, characterMeta: characterMeta };
}

function collapseWhiteSpace(text, characterMeta) {
  text = text.replace(/[ \t\n]/g, ' ');

  var _trimLeadingSpace = trimLeadingSpace(text, characterMeta);

  text = _trimLeadingSpace.text;
  characterMeta = _trimLeadingSpace.characterMeta;

  var _trimTrailingSpace = trimTrailingSpace(text, characterMeta);

  text = _trimTrailingSpace.text;
  characterMeta = _trimTrailingSpace.characterMeta;

  var i = text.length;
  while (i--) {
    if (text.charAt(i) === ' ' && text.charAt(i - 1) === ' ') {
      text = text.slice(0, i) + text.slice(i + 1);
      characterMeta = characterMeta.slice(0, i).concat(characterMeta.slice(i + 1));
    }
  }

  var _replaceTextWithMeta = (0, _replaceTextWithMeta4.default)({ text: text, characterMeta: characterMeta }, SOFT_BREAK_PLACEHOLDER + ' ', SOFT_BREAK_PLACEHOLDER);

  text = _replaceTextWithMeta.text;
  characterMeta = _replaceTextWithMeta.characterMeta;

  var _replaceTextWithMeta2 = (0, _replaceTextWithMeta4.default)({ text: text, characterMeta: characterMeta }, ' ' + SOFT_BREAK_PLACEHOLDER, SOFT_BREAK_PLACEHOLDER);

  text = _replaceTextWithMeta2.text;
  characterMeta = _replaceTextWithMeta2.characterMeta;

  return { text: text, characterMeta: characterMeta };
}

function canHaveDepth(blockType) {
  switch (blockType) {
    case _main.BLOCK_TYPE.UNORDERED_LIST_ITEM:
    case _main.BLOCK_TYPE.ORDERED_LIST_ITEM:
      {
        return true;
      }
    default:
      {
        return false;
      }
  }
}

function concatFragments(fragments) {
  var text = '';
  var characterMeta = (0, _immutable.Seq)();
  fragments.forEach(function (textFragment) {
    text = text + textFragment.text;
    characterMeta = characterMeta.concat(textFragment.characterMeta);
  });
  return { text: text, characterMeta: characterMeta };
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function addStyleFromTagName(styleSet, tagName, elementStyles, element) {
  switch (tagName) {
    case 'b':
    case 'strong':
      {
        return styleSet.add(_main.INLINE_STYLE.BOLD);
      }
    case 'i':
    case 'em':
      {
        return styleSet.add(_main.INLINE_STYLE.ITALIC);
      }
    case 'ins':
      {
        return styleSet.add(_main.INLINE_STYLE.UNDERLINE);
      }
    case 'code':
      {
        return styleSet.add(_main.INLINE_STYLE.CODE);
      }
    case 'del':
      {
        return styleSet.add(_main.INLINE_STYLE.STRIKETHROUGH);
      }
    case 'span':
      {
        var savedColor = element.style.color;
        if (savedColor.lastIndexOf("rgb") > -1) {
          savedColor = savedColor.substring(savedColor.lastIndexOf("(") + 1, savedColor.length - 1);
          savedColor = savedColor.split(",");
        }
        var savedHex = rgbToHex(parseInt(savedColor[0]), parseInt(savedColor[1]), parseInt(savedColor[2]));
        var savedKey = "";
        Object.keys(_colorConfig.colorStyleMap).map(function (key) {
          if (_colorConfig.colorStyleMap[key].color.toLowerCase() == savedHex.toLowerCase()) {
            savedKey = key;
          }
        });
        return styleSet.add(savedKey);
      }
    default:
      {
        if (elementStyles && elementStyles[tagName]) {
          return styleSet.add(elementStyles[tagName]);
        }

        return styleSet;
      }
  }
}

function stateFromElement(element, options) {
  var blocks = new BlockGenerator(options).process(element);
  return _draftJs.ContentState.createFromBlockArray(blocks);
}