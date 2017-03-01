'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseHTML;
function parseHTML(html) {
  var doc = void 0;
  if (typeof DOMParser !== 'undefined') {
    var parser = new DOMParser();
    doc = parser.parseFromString(html, 'text/html');
  } else {
    doc = document.implementation.createHTMLDocument('');
    doc.documentElement.innerHTML = html;
  }
  return doc.body;
}