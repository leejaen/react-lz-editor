'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AudioSpan = require('./AudioSpan');

var _AudioSpan2 = _interopRequireDefault(_AudioSpan);

var _draftJs = require('draft-js');

var _main = require('../utils/stateUtils/main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findAudioEntities(contentBlock, callback) {

  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey != null && _draftJs.Entity.get(entityKey).getType() === _main.ENTITY_TYPE.AUDIO;
  }, callback);
}

exports.default = {
  strategy: findAudioEntities,
  component: _AudioSpan2.default
};