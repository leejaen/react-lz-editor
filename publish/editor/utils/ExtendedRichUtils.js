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
	// Largely copied from RichUtils' `toggleBlockType`
	toggleAlignment: function toggleAlignment(editorState, alignment) {
		var _getCurrentlySelected = (0, _getCurrentlySelectedBlock2.default)(editorState),
		    content = _getCurrentlySelected.content,
		    currentBlock = _getCurrentlySelected.currentBlock,
		    hasAtomicBlock = _getCurrentlySelected.hasAtomicBlock,
		    target = _getCurrentlySelected.target;
		// console.log("ExtendedRichUtils content, currentBlock, hasAtomicBlock, target",content, currentBlock, hasAtomicBlock, target)


		if (hasAtomicBlock) {
			return editorState;
		}

		var blockData = currentBlock.getData();
		// console.log("ExtendedRichUtils blockData,alignment",blockData,alignment)
		var keyName = blockData.get(ALIGNMENT_DATA_KEY);
		// console.log("ExtendedRichUtils blockData.get,keyName",ALIGNMENT_DATA_KEY,keyName)
		var alignmentToSet = !!blockData && keyName === alignment ? undefined : alignment;
		// console.log("ExtendedRichUtils alignmentToSet",alignmentToSet)
		// console.log("ExtendedRichUtils content",content)
		// console.log("ExtendedRichUtils target",target)
		// console.log("ExtendedRichUtils ALIGNMENT_DATA_KEY",ALIGNMENT_DATA_KEY)
		// console.log("ExtendedRichUtils alignmentToSet",alignmentToSet)
		var alignBlockData = new Map();
		alignBlockData.set(ALIGNMENT_DATA_KEY, alignmentToSet);
		// console.log("ExtendedRichUtils alignBlockData",alignBlockData);
		// let newBlockData=Modifier.mergeBlockData(content, target,alignBlockData );
		var newBlockData = _draftJs.Modifier.setBlockData(content, target, alignBlockData);
		// console.log("ExtendedRichUtils newBlockData",newBlockData);
		return _draftJs.EditorState.push(editorState, newBlockData, 'change-block-type');
	},


	/*
 * An extension of the default split block functionality, originally pulled from
 * https://github.com/facebook/draft-js/blob/master/src/component/handlers/edit/commands/keyCommandInsertNewline.js
 *
 * This version ensures that the text alignment is copied from the previously selected block.
 */
	splitBlock: function splitBlock(editorState) {
		// Original split logic
		var contentState = _draftJs.Modifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection());
		var splitState = _draftJs.EditorState.push(editorState, contentState, 'split-block');

		// Assign alignment if previous block has alignment. Note that `currentBlock` is the block that was selected
		// before the split.

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