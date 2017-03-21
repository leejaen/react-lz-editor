import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {
  Modal,
  Button,
  Input,
  Icon
} from 'antd';
class PasteNoStyleControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      plantext: ""
    };
    this.onTextToggle = this.onTextToggle.bind(this);
    this.pasteContent = this.pasteContent.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.sendTextToEditor = this.sendTextToEditor.bind(this);
  }
  pasteContent(e){
    this.state.plantext = e.target.value;
    this.forceUpdate();
    setTimeout(() => {
      if (!!this.state.plantext) {
        this.setState({disabled: false})
      }
    }, 100);
  }
  sendTextToEditor() {
    let text=this.state.plantext+"";
    this.props.receiveText(text);
    this.setState({visible: false,plantext: ""})
  }

  onTextToggle() {
    this.setState({visible: true, disabled: true,plantext : ""})
    // let that=this;
    //   setTimeout(()=>{
    //     console.log("this.refs.nostyletext",that.refs.noStyleText)
    //     ReactDom.findDOMNode(that.refs.noStyleText).focus();
    //   },1000);
  }

  handleCancel(e) {
    // console.log(e);
    this.setState({visible: false});
    this.state.plantext = "";
    this.forceUpdate();
  }
  componentDidMount(){
  }
  render() {
    let className = 'RichEditor-styleButton';
    let that = this;
    return (
      <div className="RichEditor-controls">

        <span className={className} onClick={that.onTextToggle} title="纯文本粘贴">
          <Icon key="paset_text" type="editor_paset_text" />
        </span>

        <Modal
          title="插入无样式文本内容"
          visible={that.state.visible}
          closable={false}
          width={800}
          footer={[< Button key = "back" size = "large" onClick = {
            that.handleCancel
          } > 取消 < /Button>, <Button key="submit" type="primary" size="large" disabled={that.state.disabled} onClick={that.sendTextToEditor}> 确定 </Button >]}>
            <Input type="textarea" rows={10} onChange={that.pasteContent} value={that.state.plantext} placeholder="请在这里粘贴内容后点击确定按钮"/>
        </Modal>
      </div>
    )
  }
}

module.exports = PasteNoStyleControls;
