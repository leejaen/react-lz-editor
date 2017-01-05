/* @flow */

import type {IndexedSeq} from 'immutable';

type TextFragment<T> = {
  text: string;
  characterMeta: IndexedSeq<T>;
};

export default function replaceTextWithMeta<T>(
  subject: TextFragment<T>,
  searchText: string,
  replaceText: string
): TextFragment<T> {
  let {text, characterMeta} = subject;
  let searchTextLength = searchText.length;
  let replaceTextLength = replaceText.length;
  let resultTextParts: Array<string> = [];
  // Get empty set of same kind as characterMeta.
  let resultCharMeta = characterMeta.slice(0, 0);
  let lastEndIndex = 0;
  let index = text.indexOf(searchText);
  while (index !== -1) {
    resultTextParts.push(
      text.slice(lastEndIndex, index) + replaceText
    );
    resultCharMeta = resultCharMeta.concat(
      characterMeta.slice(lastEndIndex, index),
      // Use the metadata of the first char we are replacing.
      repeatSeq(characterMeta.slice(index, index + 1), replaceTextLength)
    );
    lastEndIndex = index + searchTextLength;
    index = text.indexOf(searchText, lastEndIndex);
  }
  resultTextParts.push(
    text.slice(lastEndIndex)
  );
  resultCharMeta = resultCharMeta.concat(
    characterMeta.slice(lastEndIndex)
  );
  return {text: resultTextParts.join(''), characterMeta: resultCharMeta};
}

function repeatSeq<T>(seq: IndexedSeq<T>, count: number): IndexedSeq<T> {
  let result = seq.slice(0, 0);
  while (count-- > 0) {
    result = result.concat(seq);
  }
  return result;
}
