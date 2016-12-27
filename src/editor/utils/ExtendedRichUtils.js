import { Modifier, EditorState, RichUtils } from 'draft-js';
import getCurrentlySelectedBlock from './getCurrentlySelectedBlock';

export const ALIGNMENTS = {
	CENTER:  'center',
	JUSTIFY: 'justify',
	LEFT:    'left',
	RIGHT:   'right'
};

export const ALIGNMENT_DATA_KEY = 'textAlignment';

const ExtendedRichUtils = Object.assign({}, RichUtils, {
	// Largely copied from RichUtils' `toggleBlockType`
	toggleAlignment(editorState, alignment) {
		const { content, currentBlock, hasAtomicBlock, target } = getCurrentlySelectedBlock(editorState);
// console.log("ExtendedRichUtils content, currentBlock, hasAtomicBlock, target",content, currentBlock, hasAtomicBlock, target)
		if (hasAtomicBlock) {
			return editorState;
		}

		const blockData = currentBlock.getData();
		// console.log("ExtendedRichUtils blockData,alignment",blockData,alignment)
		let keyName=blockData.get(ALIGNMENT_DATA_KEY);
		// console.log("ExtendedRichUtils blockData.get,keyName",ALIGNMENT_DATA_KEY,keyName)
		const alignmentToSet = ((!!blockData) && (keyName === alignment)) ?
			undefined :
			alignment;
		// console.log("ExtendedRichUtils alignmentToSet",alignmentToSet)
		// console.log("ExtendedRichUtils content",content)
		// console.log("ExtendedRichUtils target",target)
		// console.log("ExtendedRichUtils ALIGNMENT_DATA_KEY",ALIGNMENT_DATA_KEY)
		// console.log("ExtendedRichUtils alignmentToSet",alignmentToSet)
		let alignBlockData=new Map();
		alignBlockData.set(ALIGNMENT_DATA_KEY,alignmentToSet);
		// console.log("ExtendedRichUtils alignBlockData",alignBlockData);
		// let newBlockData=Modifier.mergeBlockData(content, target,alignBlockData );
		let newBlockData=Modifier.setBlockData(content, target,alignBlockData );
		// console.log("ExtendedRichUtils newBlockData",newBlockData);
		return EditorState.push(
			editorState,
			newBlockData,
			'change-block-type'
		);
	},

	/*
	* An extension of the default split block functionality, originally pulled from
	* https://github.com/facebook/draft-js/blob/master/src/component/handlers/edit/commands/keyCommandInsertNewline.js
	*
	* This version ensures that the text alignment is copied from the previously selected block.
	*/
	splitBlock(editorState) {
		// Original split logic
		const contentState = Modifier.splitBlock(
			editorState.getCurrentContent(),
			editorState.getSelection()
		);
		const splitState = EditorState.push(editorState, contentState, 'split-block');

		// Assign alignment if previous block has alignment. Note that `currentBlock` is the block that was selected
		// before the split.
		const { currentBlock } = getCurrentlySelectedBlock(editorState);
		const alignment = currentBlock.getData().get(ALIGNMENT_DATA_KEY);
		if (alignment) {
			return ExtendedRichUtils.toggleAlignment(splitState, alignment);
		} else {
			return splitState;
		}
	}
});

export default ExtendedRichUtils;
