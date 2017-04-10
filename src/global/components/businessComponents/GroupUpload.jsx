import React, {Component} from 'react'
import {Button, Modal,Select, Checkbox,message} from 'antd';
// import {connect} from 'react-redux';
import UploadImage from './UploadImage';
import { PRO_REQUEST,PRO_BASE } from '../../supports/publicDatas';
// import {PRO_COMMON} from '../../supports/publicDatas';
// import {getPfopPictures} from "rootActions";
// import {Base64} from "js-base64";
import remove from 'lodash/remove'
import uniq from 'lodash/uniq'
import find from 'lodash/find'
import cloneDeep from 'lodash/cloneDeep'
import clone from 'lodash/clone'
import compact from 'lodash/compact'
class GroupUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPictureSeletor: false,
      pictureList: this.props.imageList||[],
      selectedPictureList: [],
      isAutoWaterMark: false,
      selectedWaterMarkType: "white_big",
      selectedWaterMarkPositon:"SouthEast",
      isAutoSize: true,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handlePictureSeletorOK = this.handlePictureSeletorOK.bind(this);
    this.getPictures = this.getPictures.bind(this);
    this.onSelectPicture = this.onSelectAPicture.bind(this);
    this.autoWaterMark = this.autoWaterMark.bind(this);
    this.chooseWaterMake = this.chooseWaterMake.bind(this);
    this.chooseWaterMakePosition=this.chooseWaterMakePosition.bind(this)
    this.onAutoSizeChange=this.onAutoSizeChange.bind(this);

    this.getPfop=this.getPfop.bind(this);
    this.getPfopPictures=this.getPfopPictures.bind(this);
  }
  onAutoSizeChange(e){
    this.setState({onAutoSizeChange: e.target.checked});
  }
  chooseWaterMake(value) {
    this.setState({selectedWaterMarkType: value});
  }
  chooseWaterMakePosition(value){
    this.setState({selectedWaterMarkPositon: value});}
  autoWaterMark(e) {
    this.setState({isAutoWaterMark: e.target.checked})
  }
  onSelectAPicture(e, item) { //选哪些图
    if (e.target.checked) {
      this.state.selectedPictureList.push(item);
    } else {
      remove(this.state.selectedPictureList, function(n) {
        return n == item;
      });
    }
    this.state.selectedPictureList=uniq(this.state.selectedPictureList);
    this.forceUpdate();
  }
  handlePictureSeletorOK() {
    setTimeout(()=>{
      this.setState({showPictureSeletor: false});
    },600)
    if (this.state.isAutoWaterMark == true) {
      //需要加水印
      setTimeout(()=>{
        this.getPfop();
      },300);
    }
    else {
      setTimeout(() => {
        this.props.receiveSelectedPictures(this.state.selectedPictureList);
      }, 400);
    }
  }
  getPfop(){//持久保存
    let newPicturesObj=this.state.selectedPictureList.map(item=>{
      // console.log("getPfop.value", item.value);
      if(!!item&&!~item.lastIndexOf("reset")){
        let originKey=(item+"").split("").reverse().join("");
        originKey=originKey.substr(originKey.lastIndexOf("?")+1);
        originKey=originKey.substr(0,originKey.indexOf("/"));
        originKey=originKey.split("").reverse().join("");
        // console.log("getPfop originKey",originKey);
        let extensionNameItem=originKey.match(/\.[^\.]*/g),extensionName="";
        if (!!extensionNameItem&&extensionNameItem.length>0) {
          extensionName=extensionNameItem[0];
        }
        let originKeyItem=originKey.match(/^[^/\.]*/g);
        if (!!originKeyItem&&originKeyItem.length>0) {
          originKey=originKeyItem[0];
        }
        let thumbnail="";
        // console.log("this.props.atuoSize",this.props.atuoSize);
        if (this.state.isAutoSize) {
          if (this.props.atuoSize[0] == 0 && this.props.atuoSize[1] == 0) {
            thumbnail = `imageMogr2/thumbnail/600x600>|`;
          } else if (this.props.atuoSize[0] == 0) {
            thumbnail = `imageMogr2/thumbnail/x${this.props.atuoSize[1]}>|`;
          } else if (this.props.atuoSize[1] == 0) {
            thumbnail = `imageMogr2/thumbnail/${this.props.atuoSize[0]}x>|`;
          } else {
            thumbnail = `imageMogr2/thumbnail/${this.props.atuoSize[0]}x${this.props.atuoSize[1]}>|`;
          }
        }
        return {
          //"http://image.qlwbyidian.com/03142179463624167665.jpg?imageMogr2/thumbnail/!36p/crop/!608x380a32a4|watermark/1/gravity/SouthEast/image/aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS93aGl0ZV9iaWcucG5n/dx/10/dy/10"
          "originPic": item+"?"+thumbnail+"watermark/1/gravity/"
                            +this.state.selectedWaterMarkPositon
                            +"/image/"
                            +(find(PRO_BASE.Config.watermarkImage,item=>item.type==this.state.selectedWaterMarkType).valuebase64)
                            +"/dx/50/dy/50",
          "newName": (~ originKey.lastIndexOf("QN1D")
            ? (originKey)
            : (originKey + "QN1D" + new Date().getMilliseconds()+(this.state.selectedWaterMarkPositon)))+(extensionName||""),
          "key": originKey,
          "extensionName":extensionName
        }
      }else{
        return {originPic:""};
      }
    });
    // console.log("newPicturesObj a",newPicturesObj);
    newPicturesObj=compact(newPicturesObj);
    // console.log("newPicturesObj b",newPicturesObj);
    let refObj=clone(newPicturesObj);
    remove(newPicturesObj,item=>{return !item.originPic});
    let removedPic=remove(newPicturesObj,item=>{return !!~item.originPic.lastIndexOf("QN1D")});
    // console.log("getPfop removedPic",removedPic);
    if (newPicturesObj.length>0) {
      this.getPfopPictures(newPicturesObj);
    }

    // const args = {
    //   message: '图片正在进行持久保存：',
    //   description: <div>{(()=>{return this.renderPfopPictrues(newPicturesObj);})()}</div>,
    //   duration: 0,
    // };
    // notification.open(args);
    // console.log("getPfop refObj",refObj)
    let pictureList=refObj.map(item=>{
      let domain="",picture="";
      if (!!item.originPic) {
        domain=item.originPic.substr(0,item.originPic.lastIndexOf(item.key));
        picture=domain+item.newName;
        // picture=item.originPic//开发时持久保存无效时暂用原图片
      }else {
        picture="";
      }
      return picture
    });
    // console.log("getPfop pictureList",pictureList);
    // setTimeout(()=>{//防止在持久保存成功前过快加载导致图片显示不出
    message.info("图片正在处理请稍等片刻",10);
    setTimeout(() => {
      this.props.receiveSelectedPictures(pictureList);
    }, 100);
    // },300);
  }
  getPfopPictures(pictures){
    PRO_REQUEST.ajax.fetchData(this.props.uploadConfig.QINIU_PFOP, {
      "list": pictures
    }, (data) => {
      this.gotPfopPictures(data);
    });
  }
  gotPfopPictures (theData)  {
  // console.log("gotPfopPictures theData",theData);
  if (theData.rc == "0") {
    return (dispatch) => {
      // dispatch(gotPfopPicturesSuccessfully(theData.data));
    }
  } else {
    message.error("持久保存图片过程中发生错误！请参考：" + theData.des, 5);
  }
}
  getPictures(listPicture) { //上传完毕
    let newPictures = listPicture.map(item => {
      if (typeof(item.url) != undefined) {
        return item.url
      }
    });
    this.state.pictureList = compact(this.state.pictureList.concat(newPictures));
    this.state.pictureList=uniq(this.state.pictureList);
    this.state.selectedPictureList = cloneDeep(this.state.pictureList);
    // console.log("pictureList", this.state.pictureList);
    this.forceUpdate(); //强制更新
  }
  openModal() {
    this.setState({showPictureSeletor: true});
  }
  closeModal() {
    this.setState({showPictureSeletor: false});
  }
  componentWillReceiveProps(prevProps,nextProps){
    // console.log("nextProps",nextProps)
    if (!!nextProps&&nextProps.hasOwnProperty("imageList")) {
      this.setState({pictureList:nextProps.imageList,selectedPictureList: cloneDeep(nextProps.imageList)});
    }else {
      this.setState({pictureList:[],selectedPictureList:[]});
    }
  }
  componentDidMount(){
    if ((this.props.atuoSize[0] <= 300&&this.props.atuoSize[0] != 0 )|| (this.props.atuoSize[1]<=64&&this.props.atuoSize[1] != 0)) {
      //如果图片的尺寸比默认水印图的尺寸小，改用小图
      this.setState({selectedWaterMarkType: "white_small"});
    }
  }
  render() {
    return (
      <span>
        {(() => {
          if (!this.props.children) {
            return (
              <Button onClick={this.openModal}>批量添加</Button>
            );
          } else {
            const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {onClick: this.openModal}));
            return childrenWithProps;
          }
        })()}
        <Modal
          title={<span> <span>批量上传图片</span> &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <Checkbox onChange = {
          this.autoWaterMark
        }> 自动加水印 </Checkbox>
        &nbsp;&nbsp;&nbsp;&nbsp;<Select size="small"
        disabled={!this.state.isAutoWaterMark}
        defaultValue={this.state.selectedWaterMarkType}
        style={{ width: 100 }}
        onChange={this.chooseWaterMake}>
        <Select.Option value="white_small">白色小图</Select.Option >
          <Select.Option value="white_big">白色大图</Select.Option>
          <Select.Option value = "gray_small" > 灰色小图 </Select.Option>
          <Select.Option value="gray_big">灰色大图</Select.Option>
          <Select.Option value="black_small">黑色小图</Select.Option>
          <Select.Option value = "black_big" > 黑色大图 </Select.Option>
        </Select>
        &nbsp;&nbsp;&nbsp;&nbsp;<Select size="small"
        disabled={!this.state.isAutoWaterMark}
        defaultValue={this.state.selectedWaterMarkPositon}
        style={{ width: 100 }}
        onChange={this.chooseWaterMakePosition}>
          <Select.OptGroup label="上">
            <Select.Option value="NorthWest">左上</Select.Option >
            <Select.Option value="North">中上</Select.Option>
            <Select.Option value = "NorthEast" > 右上 </Select.Option>
          </Select.OptGroup>
          <Select.OptGroup label="中">
            <Select.Option value="West">左中</Select.Option>
            <Select.Option value="Center">中心</Select.Option>
            <Select.Option value = "East" > 右中 </Select.Option>
          </Select.OptGroup>
          <Select.OptGroup label="下">
            <Select.Option value="SouthWest">左下</Select.Option>
            <Select.Option value="South">中下</Select.Option>
            <Select.Option value = "SouthEast" > 右下 </Select.Option>
          </Select.OptGroup>
        </Select>&nbsp;&nbsp;&nbsp;&nbsp;{
          this.props.atuoSize
          ?<Checkbox onChange={this.onAutoSizeChange} defaultChecked={this.state.isAutoSize}>按照图片{this.props.atuoSize[0]==0?"高度":"宽度"}自动缩放到{this.props.atuoSize[0]||"[自动]"}*{this.props.atuoSize[1]||"[自动]"}</Checkbox>
          :null
        }
      </span>}
          visible={this.state.showPictureSeletor}
          onCancel={this.closeModal}
          closable={false}
          maskClosable={false}
          width={900}
          footer={[
            <Button key = "back"
                    size = "large"
                    onClick = {this.closeModal}> 取消 </Button>
          , <Button key="submit"
                    type="primary"
                    size="large"
                    disabled={this.state.selectedPictureList.length==0}
                    onClick={this.handlePictureSeletorOK}> 确定 </Button >]}>
          <div className="picture-list">
            {this.state.pictureList.length === 0
              ? <div>请上传图片，数量请尽可能不要多余{this.props.limitCount || 10}，图片数量过多会引起用户体验问题及数据流量压力！</div>
              : <div>
                {this.state.pictureList.map(item => {
                  return <Checkbox
                    key={item}
                    value={item}
                    defaultChecked={true}
                    onChange={(e) => {
                    this.onSelectAPicture(e, item)
                  }}><br/><img style={{
                    width: "100px"
                  }} src={item}/></Checkbox>
                })}
              </div>}
            <UploadImage
              id="pictures"
              fileList = {this.state.pictureList.map(item => {
                                return {url: item}
                          })}
              isOpenModel={this.state.showPictureSeletor}
              cbReceiver={this.getPictures}
              isMultiple={true}
              isShowUploadList={true}
              uploadConfig={this.props.uploadConfig}
              limit={this.props.limitCount || 10}/>
          </div>
        </Modal>
      </span>
    )
  }
}
const propertys = state => {
  return {};
}

// module.exports = connect(propertys, {getPfopPictures})(GroupUpload);
module.exports = GroupUpload;
