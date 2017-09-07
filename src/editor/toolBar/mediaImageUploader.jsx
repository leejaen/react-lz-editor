import React, {Component} from 'react';
import {
  Modal,
  Button,
  message,
  Icon
} from 'antd';
import {UploadImage,GroupUpload} from '../../global/components/businessComponents';
import cloneDeep from "lodash/cloneDeep";

class ImgStyleControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provisible: false,
      previsible: false,
      images: [],
      loadingRemoteImageFun: null,
      pfopImages: []
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

    this.handleCancelUploading = this.handleCancelUploading.bind(this);
    this.realLoading = this.realLoading.bind(this);
    this.reloadUploadingPictrue = this.reloadUploadingPictrue.bind(this);
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
      this.state.loadingRemoteImageFun = message.loading(this.props.lang.inPreviewProgress, 0);
    }
  }
  successLoading(type) {
    if (type == "fromImg") {
      // console.log("successLoading", this.successedCount);
      if (this.successedCount + 1 < this.state.images.length) {
        this.successedCount += 1;
        return false;
      }
      this.successedCount = 0;
      setTimeout(this.state.loadingRemoteImageFun, 500);
    }
    let pfopImages = this.state.images.map((item) => {
      item.url = item.url.substr(0, ~ item.url.lastIndexOf("?t=")
        ? item.url.lastIndexOf("?t=")
        : item.url.length)+"?t=foreditor"
      return item;
    });
    // console.log("successLoading provisible false");
    this.setState({provisible: false,pfopImages: pfopImages, previsible: true});
  }
  realLoading(type) {
    let images = cloneDeep(this.state.pfopImages);
    // console.log("images", images);
    // console.log("realLoading provisible false");
    this.setState({provisible: false, images: [], pfopImages: [], previsible: false});
    this.props.receiveImage(images);
  }
  failureLoading(event, index) {
    let picture = this.state.images[index].url;
    if (!!picture && picture != "reset") {
      setTimeout(() => {
        //auto refresh when invalid
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
  reloadUploadingPictrue(picture, index) {
    // console.log("reloadUploadingPictrue picture, index", picture, index);
    let thePicture = picture.substr(0, ~ picture.lastIndexOf("?t=")
      ? picture.lastIndexOf("?t=")
      : picture.length);
    let n = picture.substr((~ picture.lastIndexOf("?t=")
      ? picture.lastIndexOf("?t=")
      : picture.length) + 3)
    picture = thePicture + "?t=" + (parseInt(!!n
      ? n
      : "0") + 1);
    if (!!this.state.pfopImages[index]) {
      this.state.pfopImages[index].url = picture;
    }
    this.forceUpdate();
  }
  groupAppend(pictureList) {
    console.log("groupAppend this.state.images", pictureList, this.state.images);
    if (!pictureList.length) {
      console.warn("ERROR: no pictureList sent to me, see pictureList", pictureList);
      return false;
    }
    let images = pictureList.map(item => {
      return {"url": item};
    })
    // this.setState({ provisible: false, previsible: false,"images": images });
    // this.prepareToSendImageToEditor();

    this.setState({images: [], pfopImages: []});
    setTimeout(()=>{
      this.setState({provisible: false, previsible: false});
    },1000);
    this.props.receiveImage(cloneDeep(images));
    pictureList=[];
  }

  onImgToggle() {
    this.setState({provisible: true, previsible: false, disabled: true, images: []});
  }

  handleCancel(e) {
  // console.log("handleCancel provisible false");
    this.setState({provisible: false, previsible: false, images: []});
  }
  handleCancelUploading(e) {
    this.setState({provisible: false, previsible: false, pfopImages: []});
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
          receiveSelectedPictures={this.groupAppend}
          uploadConfig={this.props.uploadConfig}
          uploadProps={this.props.uploadProps}
          watermarkImage={this.props.watermarkImage}
          lang={this.props.lang}>
          <span className={className}>
              <Icon type="editor_image_masker" title={this.props.lang.imageMasker}/>
          </span>
        </GroupUpload>
        <span className={className} onClick={that.onImgToggle}>
            <Icon type="editor_image" title={this.props.lang.originalImage}/>
        </span>

        <div
          style={{
          width: 0,
          height: 0,
          display: "inline",
          overflow: "hidden",
          position: "absolute"
        }}>{this.state.images.map((item, index) => <img style = {{width:"100px"}} src = {
            item.url+"?t=10"
          }
          onError = {
            (event) => this.failureLoading(event, index)
          }
          onLoad = {
            () => this.successLoading("fromImg")
          } />)}</div>
        <Modal
          title={this.props.lang.insertImageModalTitle}
          visible={that.state.provisible}
          closable={false}
          footer={[< Button key = "back" size = "large" onClick = {
            that.handleCancel
          } > {this.props.lang.cancelText} < /Button>, <Button key="submit" type="primary" size="large" disabled={that.state.disabled} onClick={()=>that.successLoading("fromOld")}> {this.props.lang.OKText} </Button >]}>
          <UploadImage
            isMultiple={true}
            fileList={that.state.images}
            isOpenModel={that.state.provisible}
            cbReceiver={that.getImgObject}
            uploadConfig={this.props.uploadConfig}
            uploadProps={this.props.uploadProps}
            lang={this.props.lang}
            limit={10}
            fileType="image"/>
        </Modal>
        <Modal
          title={this.props.lang.previewImageModalTitle}
          visible={that.state.previsible}
          width={800}
          closable={false}
          footer={[< Button key = "back" size = "large" onClick = {
            that.handleCancelUploading
          } > {this.props.lang.cancelText} < /Button>, <Button key="submit" type="primary" size="large" disabled={that.state.pfopImages.length==0} onClick={()=>that.realLoading("fromOld")}> {this.props.lang.validatedImage} </Button >]}>
          <div className="uploadingImagies">{that.state.pfopImages.map((item, index) => {
              // console.log("item,index", item, index);
              let url = item.url;
              return <div>
                <a onClick={() => that.reloadUploadingPictrue(url, index)} title={this.props.lang.refreshImage}><Icon type="reload"/></a><img src={url}/></div>
            })
}</div>
        </Modal>
      </div>
    )
  }
}
ImgStyleControls.propTypes = {
  receiveImage: React.PropTypes.func.isRequired,
  uploadConfig:React.PropTypes.shape({
    QINIU_URL: React.PropTypes.string.isRequired,
    QINIU_IMG_TOKEN_URL: React.PropTypes.string.isRequired,
    QINIU_PFOP:React.PropTypes.shape({
      url: React.PropTypes.string.isRequired
    }),
    QINIU_VIDEO_TOKEN_URL: React.PropTypes.string.isRequired,
    QINIU_FILE_TOKEN_URL: React.PropTypes.string.isRequired,
    QINIU_DOMAIN_IMG_URL: React.PropTypes.string.isRequired,
    QINIU_DOMAIN_VIDEO_URL: React.PropTypes.string.isRequired,
    QINIU_DOMAIN_FILE_URL: React.PropTypes.string.isRequired
   })
};

ImgStyleControls.defaultProps = {};
module.exports = ImgStyleControls;
