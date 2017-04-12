import React, {Component} from 'react'
import {Upload, Button, Icon, message,Input} from 'antd';
import {PRO_URL, PRO_QINIU, PRO_COMMON} from '../../supports/publicDatas';
import findIndex from "lodash/findIndex";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import uniqBy from "lodash/uniqBy";

/*
 * 调用示例：
 * <UploadImage cbReceiver={this.getFile} isMultiple={true}/>
 * cbReceiver 必要属性，此属性指定一个处理接收数据的自定义方法，上传成功的地址通过此方法传给调用组件
 * fileType　必须属性，此属性指定上传文件的类型，img（图片）,video(mp4,mp3类型)
 * isMultiple 非必要属性，默认false，是否支持多文件同时上传，默认只允许单文件上传
 * */
class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      qiniu: {
        token: PRO_QINIU.checkQiniu.returnToken(this.props.uploadConfig)
      },
      files: [],
      upReceiverFun: null,
      inputVideoUrl:"",
      inputVideoHelp:"",
    }

    this.getInputVideo=this.getInputVideo.bind(this);
    this.changeInputVideo=this.changeInputVideo.bind(this);
  }

  changeInputVideo(e){
    let value=e.target.value;
    console.log("changeInputVideo",value);
    this.setState({inputVideoUrl:value});
  }

  getInputVideo(e){
    let value=e.target.value;
    if (PRO_COMMON.Validation.isWebFileURL(value,this.props.fileType)) {
      this.state.inputVideoUrl = "";
      this.state.inputVideoHelp = "";
      this.forceUpdate();
      setTimeout(()=>{
        this.state.files.push({url:value,name:value,status:"done",uid:"uid_"+PRO_COMMON.String.RndNum(20)});
        // this.getVideoObject();
        setTimeout(()=>{
          console.log("tstd")
          this.props.cbReceiver(this.state.files);
          console.log("tsta")
        },100);
      },100);
    }
    else {
      this.state.inputVideoHelp = "验证您填写的URL地址无效，请检查！";
      this.forceUpdate();
    }
  }
  componentDidMount() {
    // console.log("componentDidMount this.props.fileList:", this.props.fileList);
    var list = [];
    if (!!this.props.fileList) {
      this.props.fileList.copyWithin(list);
    }
      // console.log("componentDidMount list:", list);
    if (!!list) {
      this.setState({files: list});
    }
  }

  beforeUpload(file) {
    // console.log("file.type",file);
    // key需要唯一，此处不可使用直接获取的方式，否则会出现相同KEY if (!!this.props.limit && file.length > this.props.limit) {    // message.error("由于限制，您最多只能选择" + this.props.limit + "张图片，请重新选择。", 5);    return false; }    // console.log("key需要唯一，此处不可使用直接获取的方式，否则会出现相同KEY");
    let isFormat = PRO_COMMON.Array.inArray(PRO_QINIU.supportMime[this.props.fileType], file.type);
    if (!isFormat) {
      message.error('只能上传指定文件，请重新选择！参考 File Mimetype: ' + PRO_QINIU.supportMime[this.props.fileType].join("、"), 10);
      return false;
    }
    if (!this.state.qiniu.token) {
      let token = PRO_QINIU.checkQiniu.returnToken(this.props.uploadConfig);
      this.state.qiniu.token = token;
    }
    return isFormat;
  }

  onChange(info) {
    // console.log("upload onChange this.state.files",this.state.files,info)
    clearTimeout(this.state.upReceiverFun);
    let fileList = info.fileList;

    fileList = fileList.filter((f) => (!f.length));
    let url = "";
    if (this.props.fileType == "image") {
      url = PRO_URL.QINIU_IMG_DOMAIN_URL||this.props.uploadConfig.QINIU_IMG_DOMAIN_URL;
    } else if (this.props.fileType == "video" || this.props.fileType == "audio") {
      url = PRO_URL.QINIU_DOMAIN_VIDEO_URL||this.props.uploadConfig.QINIU_DOMAIN_VIDEO_URL;
    }
    //读取远程路径并显示链接
    fileList = fileList.map((file) => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        file.url = url + "/" + file.response.key;
        // file.key=PRO_COMMON.String.RndNum(10);
      }
      if (!file.length) {
        return file;
      }
    });
    let _this = this;
    //按照服务器返回信息筛选成功上传的文件
    // let cloneList=cloneDeep(_this.state.files);
    fileList = fileList.filter((file) => {
      //根据多选选项更新添加内容
      let hasNoExistCurrFileInUploadedList=!~findIndex(_this.state.files,item=>item.name===file.name)
      if (hasNoExistCurrFileInUploadedList) {
        if (!!_this.props.isMultiple == true) {
          _this.state.files.push(file);
        } else {
          _this.state.files = [file];
        }
      }
      if (!!file.response) {
        //上传列表数量的限制，只显示最近上传的限制个数，旧的会被新的顶掉
        if (!!_this.props.limit && _this.state.files.length > _this.props.limit) {
          message.info(`只能保留最后上传的 ${_this.props.limit} 个文件，其他超出的已经被顶掉。`, 5);
          PRO_COMMON.Array.removeByIndex(_this.state.files, 0)
        }
      }
      return !!file.response||(!!file.url&&file.status=="done")||file.status=="uploading";
    });
    fileList=uniqBy(fileList,"name");
    // console.log("upload _this.state.files",_this.state.files);
    // console.log("upload fileList before if",fileList);
    if (!!fileList && fileList.length != 0) {
      console.log("upload set files as fileList",fileList);
      this.setState({files: fileList});
    }
    _this.forceUpdate();
    this.state.upReceiverFun = setTimeout(() => {
      //限制频繁调用组件制定的cbReceiver
      // console.log("upload this.state.files",this.state.files)
      if (!!this.state.files && this.state.files.length == 0) {
        return false;
      }
      this.props.cbReceiver(this.state.files);

    }, 1000);
  }

  supportFileType(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';
    if (props[propName]) {
      let value = props[propName];
      if (typeof value === 'string') {
        var isInSupport = !!PRO_QINIU.supportMime[value];
        return isInSupport
          ? null
          : new Error(propName + ' in ' + componentName + "不合法的上传资源类型！");
      }
    } else {
      throw new Error(propName + ' in ' + componentName + "必须填写fileType（字符串型）：image或video或audio！");
      return false;
    }
    // assume all ok
    return null;
  }

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps",nextProps.fileList,this.state.files);
      // console.log("isEqual",isEqual(nextProps.fileList, this.state.files));
    if (isEqual(nextProps.fileList, this.state.files)) {
      return false;
    }
    // console.log("我是变化",nextProps.isOpenModel);
    if(nextProps.isOpenModel){
      // console.log("我是变化",nextProps.isOpenImg);
      // this.setState({
      //   files:[]
      // })
      this.state.files=[];
      this.forceUpdate();

    }
    // console.log("componentWillReceiveProps 图片有更新：", nextProps.fileList, this.state.files);
    let list = [];
    if (this.state.files.length) {
      list = this.state.files.copyWithin(0);
    }else {
      list = cloneDeep(nextProps.fileList);
    }
    if (!!list) {
      PRO_COMMON.obj.refsKeyTo(list, "uid");
      this.setState({files: list});
    }
  }

  render() {
    let properties = this.props,that=this,uploadProps = {
      action: PRO_URL.QINIU_URL||this.props.uploadConfig.QINIU_URL,
      onChange: this.onChange.bind(this),
      listType: 'picture',
      fileList: this.state.files,
      data: (file)=>{//支持自定义保存文件名、扩展名支持
          let token =that.state.qiniu.token,key="";
          if (!token) {
            token = PRO_QINIU.checkQiniu.returnToken(this.props.uploadConfig);
          }
          key = PRO_COMMON.String.RndNum(20)+"."+PRO_COMMON.String.GetFileExtensionName(file.name)[0];
          return {token,key}
        },
      multiple: properties.isMultiple || false,
      beforeUpload: this.beforeUpload.bind(this),
      showUploadList: properties.isShowUploadList!=undefined?properties.isShowUploadList:true
    };
    // console.log("uploadProps",uploadProps);

    return (
      <div>
        <Upload {...uploadProps}>
          <Button>
            <Icon type="upload"/>
            点击上传
          </Button>
        </Upload>

        <div style={{margin:"10px 0 0"}}>
          <Input
          placeholder={`您还可以手动输入${{'image':'图片','video':'视频','audio':'音频'}[this.props.fileType]}资源地址${this.props.fileType=="image"?"（仅支持七牛）":""}，输入完毕按回车键确认`}
          value={this.state.inputVideoUrl}
          onChange={this.changeInputVideo}
          onPressEnter={this.getInputVideo}/>
          <span style={{color:'red'}}>{this.state.inputVideoHelp}&nbsp;</span>
        </div>
        <span>{`${this.props.limit > 1
            ? "最多"
            : "只"}可以上传 ${this.props.limit} 个类型为 ${PRO_QINIU.supportMime[this.props.fileType].join("、")} 的 ${{'image':'图片','video':'视频','audio':'音频'}[this.props.fileType]} 文件。${
              this.props.fileType=="image"?"推荐安装“Hover Zoom+”扩展支持。":""+this.props.description
            }`}</span>
      </div>
    )
  }
}

UploadImage.propTypes = {
  cbReceiver: React.PropTypes.func.isRequired,
  limit: React.PropTypes.number,
  isMultiple: React.PropTypes.bool,
  isShowUploadList: React.PropTypes.bool,
  fileType: UploadImage.prototype.supportFileType,
  description: React.PropTypes.string,
  fileList: React.PropTypes.arrayOf(React.PropTypes.shape({url: React.PropTypes.string.isRequired, thumbUrl: React.PropTypes.string, name: React.PropTypes.string})),
  uploadConfig:React.PropTypes.shape({
    QINIU_URL: React.PropTypes.string.isRequired,
    QINIU_IMG_TOKEN_URL: React.PropTypes.string.isRequired,
    QINIU_PFOP:React.PropTypes.shape({
      url: React.PropTypes.string.isRequired
    }),
    QINIU_VIDEO_TOKEN_URL: React.PropTypes.string.isRequired,
    QINIU_FILE_TOKEN_URL: React.PropTypes.string.isRequired,
    QINIU_IMG_DOMAIN_URL: React.PropTypes.string.isRequired,
    QINIU_DOMAIN_VIDEO_URL: React.PropTypes.string.isRequired,
    QINIU_DOMAIN_FILE_URL: React.PropTypes.string.isRequired
   })
};

UploadImage.defaultProps = {
  limit: 1,
  isMultiple: false,
  isShowUploadList: true,
  fileType: "image",
  description: "请根据要求上传。"
};

module.exports = UploadImage;
