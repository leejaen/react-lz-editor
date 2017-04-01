'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CSSProperty = require('react-dom/lib/CSSProperty');

var VENDOR_PREFIX = /^(moz|ms|o|webkit)-/;

var NUMERIC_STRING = /^\d+$/;
var UPPERCASE_PATTERN = /([A-Z])/g;

// Lifted from: https://github.com/facebook/react/blob/master/src/renderers/dom/shared/CSSPropertyOperations.js
function processStyleName(name) {
  return name.replace(UPPERCASE_PATTERN, '-$1').toLowerCase().replace(VENDOR_PREFIX, '-$1-');
}

// Lifted from: https://github.com/facebook/react/blob/master/src/renderers/dom/shared/dangerousStyleValue.js
function processStyleValue(name, value) {
  var isNumeric = void 0;
  if (typeof value === 'string') {
    isNumeric = NUMERIC_STRING.test(value);
  } else {
    isNumeric = true;
    value = String(value);
  }
  if (!isNumeric || value === '0' || _CSSProperty.isUnitlessNumber[name] === true) {
    return value;
  } else {
    return value + 'px';
  }
}

function styleToCSS(styleDescr) {
  return Object.keys(styleDescr).map(function (name) {
    var styleValue = processStyleValue(name, styleDescr[name]);
    var styleName = processStyleName(name);
    return styleName + ': ' + styleValue;
  }).join('; ');
}

exports.default = styleToCSS;