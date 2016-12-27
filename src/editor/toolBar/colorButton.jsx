import React, {Component} from 'react';

import colorStyleMap from "../config/colorStyleMap"

class ColorButton extends Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    const styles = {
      editor: {
        borderTop: '1px solid #ddd',
        cursor: 'text',
        fontSize: 16,
        marginTop: 20,
        minHeight: 400,
        paddingTop: 20
      },
      controls: {
        fontFamily: '\'Helvetica\', sans-serif',
        fontSize: 14,
        marginBottom: 10,
        userSelect: 'none'
      },
      ColorButton: {
        color: '#999',
        cursor: 'pointer',
        marginRight: 16,
        padding: '2px 0'
      },
      root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600
      },
      buttons: {
        marginBottom: 10
      },
      urlInputContainer: {
        marginBottom: 10
      },
      urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3
      },
      editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10
      },
      button: {
        marginTop: 10,
        textAlign: 'center'
      },
      link: {
        color: 'blue',
        textDecoration: 'underline'
      }
    };

    let style = Object.assign({}, styles.ColorButton, (this.props.active
      ? colorStyleMap[this.props.style]
      : {}));
    let className = 'RichEditor-styleButton';
    return (
      <div className="RichEditor-color">
        <span
          className={className}
          onClick={this.onToggle}
          style={{
          backgroundColor: colorStyleMap[this.props.style].color
        }}>
          {this.props.label}
        </span>
        {(() => {
          if (!!this.props.split) {
            return <span className="RichEditor-controls-split">{this.props.split}</span>;
          }
        })()}
      </div>
    )
  };
}
module.exports = ColorButton;
