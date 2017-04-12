'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ALIGNMENT_DATA_KEY = exports.ALIGNMENTS = undefined;

var _draftJs = require('draft-js');

var _getCurrentlySelectedBlock = require('./getCurrentlySelectedBlock');

var _getCurrentlySelectedBlock2 = _interopRequireDefault(_getCurrentlySelectedBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALIGNMENTS = exports.ALIGNMENTS = {
	CENTER: 'center',
	JUSTIFY: 'justify',
	LEFT: 'left',
	RIGHT: 'right'
};

var ALIGNMENT_DATA_KEY = exports.ALIGNMENT_DATA_KEY = 'textAlignment';

var ExtendedRichUtils = Object.assign({}, _draftJs.RichUtils, {
	toggleAlignment: function toggleAlignment(editorState, alignment) {
		var _getCurrentlySelected = (0, _getCurrentlySelectedBlock2.default)(editorState),
		    content = _getCurrentlySelected.content,
		    currentBlock = _getCurrentlySelected.currentBlock,
		    hasAtomicBlock = _getCurrentlySelected.hasAtomicBlock,
		    target = _getCurrentlySelected.target;

		if (hasAtomicBlock) {
			return editorState;
		}

		var blockData = currentBlock.getData();

		var keyName = blockData.get(ALIGNMENT_DATA_KEY);

		var alignmentToSet = !!blockData && keyName === alignment ? undefined : alignment;

		var alignBlockData = new Map();
		alignBlockData.set(ALIGNMENT_DATA_KEY, alignmentToSet);

		var newBlockData = _draftJs.Modifier.setBlockData(content, target, alignBlockData);

		return _draftJs.EditorState.push(editorState, newBlockData, 'change-block-type');
	},
	splitBlock: function splitBlock(editorState) {
		var contentState = _draftJs.Modifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection());
		var splitState = _draftJs.EditorState.push(editorState, contentState, 'split-block');

		var _getCurrentlySelected2 = (0, _getCurrentlySelectedBlock2.default)(editorState),
		    currentBlock = _getCurrentlySelected2.currentBlock;

		var alignment = currentBlock.getData().get(ALIGNMENT_DATA_KEY);
		if (alignment) {
			return ExtendedRichUtils.toggleAlignment(splitState, alignment);
		} else {
			return splitState;
		}
	}
});

exports.default = ExtendedRichUtils;