import React, {Component} from 'react';
import {
  Upload,
  Modal,
  Button,
  Popconfirm,
  Form,
  Input,
  message,
  Icon
} from 'antd';
import {UploadImage} from '../../global/components/businessComponents';
class VideoStyleControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      videos: []
    };
    this.onVideoToggle = this.onVideoToggle.bind(this);

    this.handleCancel = this.handleCancel.bind(this);
    this.getVideoObject = this.getVideoObject.bind(this);
    this.sendVideoToEditor = this.sendVideoToEditor.bind(this);
  }

  getVideoObject(fileObj) {
    this.state.videos = this.state.videos.concat(fileObj);
    if (!!this.state.videos) {
      this.setState({disabled: false})
    }
    this.forceUpdate();
  }

  sendVideoToEditor() {
    this.setState({visible: false});
    let videos = this.state.videos.map((item) => {
      return item;
    });
    this.props.receiveVideo(videos);
    this.state.videos = [];
    this.forceUpdate();
  }

  onVideoToggle() {
    this.setState({visible: true, disabled: true,videos : []})
  }

  handleCancel(e) {
    // console.log(e);
    this.setState({visible: false});
    this.state.videos = [];
    this.forceUpdate();
  }

  render() {
    let className = 'RichEditor-styleButton';
    let that = this;
    return (
      <div className="RichEditor-controls">
        <span className={className} onClick={that.onVideoToggle}>
            <Icon type="editor_video" title={this.props.lang.insertVideoTip}/>
        </span>
        <Modal
          title={this.props.lang.insertVideoModalTitle}
          visible={that.state.visible}
          closable={false}
          footer={[<Button key = "back" size = "large" onClick = {
            that.handleCancel
          }> {this.props.lang.cancelText} </Button>, <Button key="submit" type="primary" size="large" disabled={that.state.disabled} onClick={that.sendVideoToEditor}> {this.props.lang.OKText} </Button>]}>
          <UploadImage isMultiple={true}
            limit={10}
            fileList={that.state.videos}
            isOpenModel={that.state.visible}
            cbReceiver={that.getVideoObject}
            uploadConfig={this.props.uploadConfig}
            lang={this.props.lang}
            fileType="video"
            uploadProps={this.props.uploadProps}/>
        </Modal>
      </div>
    )
  }
}

module.exports = VideoStyleControls;
