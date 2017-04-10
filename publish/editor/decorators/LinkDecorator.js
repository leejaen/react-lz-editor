'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _main = require('../utils/stateUtils/main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Use a more specific type here.
function Link(props_) {
  var _Entity$get$getData = _draftJs.Entity.get(props_.entityKey).getData(),
      url = _Entity$get$getData.url;

  return _react2.default.createElement(
    'a',
    { href: url },
    props_.children
  );

  // const {url} = Entity.get(props.entityKey).getData();
  // let currentStyle = props.editorState
  //   ? props.editorState.getCurrentInlineStyle()
  //   : {};
  // return (
  //   <a href={url} style={!!currentStyle.link
  //     ? currentStyle.link
  //     : {}}>
  //     {props.children}
  //   </a>
  // );
}


function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey != null && _draftJs.Entity.get(entityKey).getType() === _main.ENTITY_TYPE.LINK;
  }, callback);
}

exports.default = {
  strategy: findLinkEntities,
  component: Link
};