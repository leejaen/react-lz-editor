/* @flow */

type Attributes = {[key: string]: string};
type StringMap = {[key: string]: string};

// Lifted from: https://github.com/facebook/react/blob/master/src/renderers/dom/shared/HTMLDOMPropertyConfig.js
const ATTR_NAME_MAP: StringMap = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
};

function normalizeAttributes(attributes: ?Attributes) {
  if (attributes == null) {
    return attributes;
  }
  let normalized = {};
  let didNormalize = false;
  for (let name of Object.keys(attributes)) {
    let newName = name;
    if (ATTR_NAME_MAP.hasOwnProperty(name)) {
      newName = ATTR_NAME_MAP[name];
      didNormalize = true;
    }
    normalized[newName] = attributes[name];
  }
  return didNormalize ? normalized : attributes;
}

export default normalizeAttributes;
