/* @flow */

export default function parseHTML(html: string): Element {
  let doc;
  if (typeof DOMParser !== 'undefined') {
    let parser = new DOMParser();
    doc = parser.parseFromString(html, 'text/html');
  } else {
    doc = document.implementation.createHTMLDocument('');
    doc.documentElement.innerHTML = html;
  }
  return doc.body;
}
