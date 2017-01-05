/* @flow */

type Attributes = {[key: string]: string};
type StyleDescr = {[key: string]: number | string};
type RenderConfig = {
  element?: string;
  attributes?: Attributes;
  style?: StyleDescr;
};
type StyleMap = {[styleName: string]: RenderConfig};
type StyleOrder = Array<string>;
type OrderedStyleMap = [StyleMap, StyleOrder];

function combineOrderedStyles(
  customMap: ?StyleMap,
  defaults: OrderedStyleMap,
): OrderedStyleMap {
  if (customMap == null) {
    return defaults;
  }
  let [defaultStyleMap, defaultStyleOrder] = defaults;
  let styleMap = {...defaultStyleMap};
  let styleOrder = [...defaultStyleOrder];
  for (let styleName of Object.keys(customMap)) {
    if (defaultStyleMap.hasOwnProperty(styleName)) {
      let defaultStyles = defaultStyleMap[styleName];
      styleMap[styleName] = {...defaultStyles, ...customMap[styleName]};
    } else {
      styleMap[styleName] = customMap[styleName];
      styleOrder.push(styleName);
    }
  }
  return [styleMap, styleOrder];
}

export default combineOrderedStyles;
