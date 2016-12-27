import React, {Component} from 'react';
import ColorButton from "./ColorButton"
class ColorControls extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let COLORS = [
      {
        label: '　',
        alias: "grapeFruit1",
        style: 'grapeFruit1'
      }, {
        label: '　',
        alias: "grapeFruit2",
        style: 'grapeFruit2'
      }, {
        label: '　',
        alias: "bitterSweet1",
        style: 'bitterSweet1'
      }, {
        label: '　',
        alias: "bitterSweet2",
        style: 'bitterSweet2'
      }, {
        label: '　',
        alias: "sunFlower1",
        style: 'sunFlower1'
      }, {
        label: '　',
        alias: "sunFlower2",
        style: 'sunFlower2'
      }, {
        label: '　',
        alias: "grass1",
        style: 'grass1'
      }, {
        label: '　',
        alias: "grass2",
        style: 'grass2'
      }, {
        label: '　',
        alias: "mint1",
        style: 'mint1'
      }, {
        label: '　',
        alias: "mint2",
        style: 'mint2'
      }, {
        label: '　',
        alias: "aqua1",
        style: 'aqua1'
      }, {
        label: '　',
        alias: "aqua2",
        style: 'aqua2'
      }, {
        label: '　',
        alias: "blueJeans1",
        style: 'blueJeans1'
      }, {
        label: '　',
        alias: "blueJeans2",
        style: 'blueJeans2'
      }, {
        label: '　',
        alias: "lavander1",
        style: 'lavander1'
      }, {
        label: '　',
        alias: "lavander2",
        style: 'lavander2'
      }, {
        label: '　',
        alias: "mediumGray1",
        style: 'mediumGray1'
      }, {
        label: '　',
        alias: "mediumGray2",
        style: 'mediumGray2'
      }, {
        label: '　',
        alias: "darkGray1",
        style: 'darkGray1'
      }, {
        label: '　',
        alias: "darkGray2",
        style: 'darkGray2'
      }
    ];

      let currentStyle = this.props.editorState.getCurrentInlineStyle();
    return (
      <div className="RichEditor-controls" style={{
        paddingRight: "20px"
      }}>
        {COLORS.map((type, i) => <ColorButton
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={this.props.onToggle}
          style={type.style}
          key={i}
          split={((i == COLORS.length - 1)
          ? "|"
          : "")}/>)}
      </div>
    )
  }
}
module.exports = ColorControls;
