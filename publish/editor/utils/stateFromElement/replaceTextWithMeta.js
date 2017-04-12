'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceTextWithMeta;
function replaceTextWithMeta(subject, searchText, replaceText) {
  var text = subject.text,
      characterMeta = subject.characterMeta;

  var searchTextLength = searchText.length;
  var replaceTextLength = replaceText.length;
  var resultTextParts = [];

  var resultCharMeta = characterMeta.slice(0, 0);
  var lastEndIndex = 0;
  var index = text.indexOf(searchText);
  while (index !== -1) {
    resultTextParts.push(text.slice(lastEndIndex, index) + replaceText);
    resultCharMeta = resultCharMeta.concat(characterMeta.slice(lastEndIndex, index), repeatSeq(characterMeta.slice(index, index + 1), replaceTextLength));
    lastEndIndex = index + searchTextLength;
    index = text.indexOf(searchText, lastEndIndex);
  }
  resultTextParts.push(text.slice(lastEndIndex));
  resultCharMeta = resultCharMeta.concat(characterMeta.slice(lastEndIndex));
  return { text: resultTextParts.join(''), characterMeta: resultCharMeta };
}

function repeatSeq(seq, count) {
  var result = seq.slice(0, 0);
  while (count-- > 0) {
    result = result.concat(seq);
  }
  return result;
}