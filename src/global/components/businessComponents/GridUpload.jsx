import React, {Component} from 'react'
import {Button, message} from 'antd';
import {Base64} from "js-base64";
import GroupUpload from "./GroupUpload"
import _ from 'lodash'
class GridUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaImage: []
    }
    //图片处理
    this.loadingRemoteImageFun = null
    this.successedCount = 0;
    this.groupAppend = this.groupAppend.bind(this);
    this.loadPicture = this.loadPicture.bind(this);
    this.reloadPfopingPictrue = this.reloadPfopingPictrue.bind(this);
    this.prepareToSendImageToEditor = this.prepareToSendImageToEditor.bind(this);
    this.successLoading = this.successLoading.bind(this);
  }
  groupAppend(pictureList) {
    console.log("groupAppend pictureList", pictureList);
    this.setState({mediaImage:_.compact(this.state.mediaImage)});
    if (!pictureList.length) {
      console.log("groupAppend pictureList.lenght", pictureList.lenght);
      return false;
    }
    setTimeout(() => {
      //延迟执行
      console.log("groupAppend this.state.mediaImage", this.state.mediaImage);
      if (this.state.mediaImage.length > 10) {
        message.error("您上传的图片已经超出10张，过多的图片数量会消耗客户端APP很大流量，建议酌情删减一定数量的图片！", 10)
      }
    }, 300);
    pictureList.map(item => {
      console.log("map:", item);
      if (!~ _.findIndex(this.state.mediaImage, n => n.img_url == item)) {
        console.log("add: ", item);
        this.state.mediaImage.push(item);
      }
    })
    this.prepareToSendImageToEditor()
    this.forceUpdate()
  }
  prepareToSendImageToEditor() {
    if (!!this.state.mediaImage.length) {
      this.loadingRemoteImageFun = message.loading('图片正在处理请稍等片刻...', 0);
    }
  }
  loadPicture(event, i) {
    //图片无效时自动刷新
    console.log("loadPicture", event, i);
    let picture = this.state.mediaImage[i];
    if (!!picture && picture != "reset") {
      setTimeout(() => {
        //无效时每100毫秒刷新一次
        this.reloadPfopingPictrue(picture, i);
      }, 300)
    }
  }
  successLoading() {
    console.log("successLoading mediaImage", this.state.mediaImage);
      console.log("successLoading if", this.successedCount,this.props.limitCount,this.state.mediaImage.length);
    if (this.successedCount + 1 < this.props.limitCount&&this.successedCount + 1<this.state.mediaImage.length) {
      this.successedCount += 1;
      return false;
    }
    setTimeout(this.loadingRemoteImageFun, 500);
    let images = this.state.mediaImage.map((item) => {
      item = item.substr(0, ~ item.lastIndexOf("?t=")
        ? item.lastIndexOf("?t=")
        : item.length)
      return item;
    });
    images=_.takeRight(images,this.props.limitCount)
    this.successedCount = images.length;
      console.log("successLoading cbReceiver",images);
    this.props.cbReceiver(images);
    this.setState({mediaImage: images});
  }
  reloadPfopingPictrue(picture, i) {
    let thePicture = picture.substr(0, ~ picture.lastIndexOf("?t=")
      ? picture.lastIndexOf("?t=")
      : picture.length);
    let n = picture.substr((~ picture.lastIndexOf("?t=")
      ? picture.lastIndexOf("?t=")
      : picture.length) + 3)
    picture = thePicture + "?t=" + (parseInt(!!n
      ? n
      : "0") + 1);
    this.state.mediaImage[i] = picture;
    this.forceUpdate();
  }
  componentWillReceiveProps(nextProps){if(nextProps.defaultList.length>0){console.log("this.props.defaultList",nextProps.defaultList);this.setState({mediaImage:nextProps.defaultList});}}
  render() {
    return (
      <div className="breakImages">
        <GroupUpload
          limitCount={this.props.limitCount}
          receiveSelectedPictures={this.groupAppend}
          atuoSize={this.props.atuoSize}>
          <Button>批量追加</Button>
        </GroupUpload>
        <br/> {this.state.mediaImage.map((item, i) =>item?<div style = {{backgroundImage:`url(${item}?imageView2/1/w/110/h/110)`}} > <a href={item} target="_blank">
          <img
            style={{
            opacity: "0"
          }}
            src={item + "?imageView2/1/w/110/h/110"}
            onError={(event) => this.loadPicture(event, i)}
            onLoad={this.successLoading}/></a> </div>:null)}
      </div>
    )
  }
}
GridUpload.propTypes = {
  limitCount:React.PropTypes.number.isRequired,
  atuoSize:React.PropTypes.array.isRequired,
  cbReceiver:React.PropTypes.func.isRequired,
};
module.exports = GridUpload;
