import React, {Component} from 'react';
import {
  Upload,
  Modal,
  Button,
  Popconfirm,
  Form,
  Input,
  message,
  Tooltip,
  Icon
} from 'antd';
import {UploadImage,GroupUpload} from 'businessComponents';
/*视频音频图片*/
class ImgStyleControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      images: [],
      loadingRemoteImageFun: null
    };
    this.successedCount = 0;

    this.onImgToggle = this.onImgToggle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.prepareToSendImageToEditor = this.prepareToSendImageToEditor.bind(this);
    this.getImgObject = this.getImgObject.bind(this);

    this.groupAppend = this.groupAppend.bind(this);
    this.failureLoading = this.failureLoading.bind(this);
    this.reloadPfopingPictrue = this.reloadPfopingPictrue.bind(this);
    this.successLoading = this.successLoading.bind(this);
  }
  getImgObject(fileObj) {
    this.state.images = fileObj;
    if (!!this.state.images) {
      this.setState({disabled: false})
    }
    this.forceUpdate();
  }
  prepareToSendImageToEditor() {
    if (!!this.state.images.length) {
      this.state.loadingRemoteImageFun = message.loading('图片正在处理请稍等片刻...', 0);
    }
  }
  successLoading(type) {
    if (type == "fromImg") {
      console.log("successLoading", this.successedCount);
      if (this.successedCount + 1 < this.state.images.length) {
        this.successedCount += 1;
        return false;
      }
      this.successedCount = 0;
      setTimeout(this.state.loadingRemoteImageFun, 500);
    }
    let images = this.state.images.map((item) => {
      item.url = item.url.substr(0, ~ item.url.lastIndexOf("?t=")
        ? item.url.lastIndexOf("?t=")
        : item.url.length)
      return item;
    });
    this.setState({visible: false, images: []});
    this.props.receiveImage(images);
  }
  failureLoading(event, index) {
    console.log("failureLoading", event, index);
    let picture = this.state.images[index].url;
    if (!!picture && picture != "reset") {
      setTimeout(() => {
        //无效时每100毫秒刷新一次
        this.reloadPfopingPictrue(picture, index);
      }, 300)
    }
  }
  reloadPfopingPictrue(picture, index) {
    let thePicture = picture.substr(0, ~ picture.lastIndexOf("?t=")
      ? picture.lastIndexOf("?t=")
      : picture.length);
    let n = picture.substr((~ picture.lastIndexOf("?t=")
      ? picture.lastIndexOf("?t=")
      : picture.length) + 3)
    picture = thePicture + "?t=" + (parseInt(!!n
      ? n
      : "0") + 1);
    this.state.images[index].url = picture;
    this.forceUpdate();
  }
  groupAppend(pictureList) {
    console.log("pictureList", pictureList);
    if (!pictureList.length) {
      console.log("return false", pictureList.lenght);
      return false;
    }
    let images = pictureList.map(item => {
      return {"url": item};
    })
    this.setState({"images": images});
    this.prepareToSendImageToEditor()
  }

  onImgToggle() {
    this.setState({visible: true, disabled: true, images: []});
  }

  handleCancel(e) {
    this.setState({visible: false, images: []});
  }

  render() {
    let className = 'RichEditor-styleButton';
    let that = this;

    return (
      <div className="RichEditor-controls">

        <GroupUpload
          limitCount={50}
          imageList={this.state.images.map((item) => {
          item.url
        })}
         atuoSize={[650,0]}
          receiveSelectedPictures={this.groupAppend}>
          <span className={className}>
            <Tooltip placement="top" title="水印图片">
              <Icon type="editor_image_masker"/>
            </Tooltip>
          </span>
        </GroupUpload>
        <span className={className} onClick={that.onImgToggle}>
          <Tooltip placement="top" title="原始图片">
            <Icon type="editor_image"/>
          </Tooltip>
        </span>

        <div
          style={{
          width: 0,
          height: 0,
          display: "inline",
          overflow: "hidden",
          position: "absolute"
        }}>{this.state.images.map((item, index) => <img style = {{width:"100px"}} src = {
            item.url
          }
          onError = {
            (event) => this.failureLoading(event, index)
          }
          onLoad = {
            () => this.successLoading("fromImg")
          } />)}</div>
        <Modal
          title="插入图片"
          visible={that.state.visible}
          closable={false}
          footer={[< Button key = "back" size = "large" onClick = {
            that.handleCancel
          } > 取 消 < /Button>, <Button key="submit" type="primary" size="large" disabled={that.state.disabled} onClick={()=>that.successLoading("fromOld")}> 确 定 </Button >]}>
          <UploadImage
            isMultiple={true}
            fileList={that.state.images}
            isOpenModel={that.state.visible}
            cbReceiver={that.getImgObject}
            limit={10}
            fileType="image"/>
        </Modal>
      </div>
    )
  }
}
ImgStyleControls.propTypes = {
  receiveImage: React.PropTypes.func.isRequired
};

ImgStyleControls.defaultProps = {};
module.exports = ImgStyleControls;
