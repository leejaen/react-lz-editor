'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VideoSpan = require('./VideoSpan');

var _VideoSpan2 = _interopRequireDefault(_VideoSpan);

var _draftJs = require('draft-js');

var _main = require('../utils/stateUtils/main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findVideoEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey != null && _draftJs.Entity.get(entityKey).getType() === _main.ENTITY_TYPE.VIDEO;
  }, callback);
}

exports.default = {
  strategy: findVideoEntities,
  component: _VideoSpan2.default
};