/* @flow */

import {isUnitlessNumber} from 'react/lib/CSSProperty';

type StyleDescr = {[key: string]: number | string};

const VENDOR_PREFIX = /^(moz|ms|o|webkit)-/;
const NUMERIC_STRING = /^\d+$/;
const UPPERCASE_PATTERN = /([A-Z])/g;

// Lifted from: https://github.com/facebook/react/blob/master/src/renderers/dom/shared/CSSPropertyOperations.js
function processStyleName(name: string): string {
  return name
    .replace(UPPERCASE_PATTERN, '-$1')
    .toLowerCase()
    .replace(VENDOR_PREFIX, '-$1-');
}

// Lifted from: https://github.com/facebook/react/blob/master/src/renderers/dom/shared/dangerousStyleValue.js
function processStyleValue(name: string, value: number | string): string {
  let isNumeric;
  if (typeof value === 'string') {
    isNumeric = NUMERIC_STRING.test(value);
  } else {
    isNumeric = true;
    value = String(value);
  }
  if (!isNumeric || value === '0' || isUnitlessNumber[name] === true) {
    return value;
  } else {
    return value + 'px';
  }
}

function styleToCSS(styleDescr: StyleDescr): string {
  return Object.keys(styleDescr).map((name) => {
    let styleValue = processStyleValue(name, styleDescr[name]);
    let styleName = processStyleName(name);
    return `${styleName}: ${styleValue}`;
  }).join('; ');
}

export default styleToCSS;
