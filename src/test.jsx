import React from 'react';
import ReactDOM from 'react-dom';
// import {LzEditor} from './index'
import LzEditor from './editor/index.jsx'
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: "",
      markdownContent: "## 二级标题 HEAD 2 \n markdown 格式示例 \n ``` 欢迎使用 ```",
      rawContent: '{"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://image.qiluyidian.mobi/4305350813991067' +
          '8747.jpg"}},"1":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://image.qiluyidian.mobi/430535081399106787' +
          '47.jpg"}}},"blocks":[{"key":"fr2lj","text":"正文示例","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[]' +
          ',"data":{}},{"key":"90kdv","text":"一度金融的消息称，乐视金融同数码视讯的接触尚处在高层范围内进行，因此对于收购价格，暂时还不能确定。","type":"unstyled","depth":0,"inlin' +
          'eStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b60ni","text":"如果乐视金融拿下数码视讯的两张金融牌照，并且在到期后能够获得央行审核顺利延期，意味着乐视可以通过移动设' +
          '备和电视两个终端来链接用户的银行卡。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eui4h","text' +
          '":"乐视金融在去年11月份首度公开亮相的时候，缺少银行和支付两张关键牌照就一直是外界关注的问题。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],' +
          '"data":{}},{"key":"29t6l","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"lengt' +
          'h":1,"key":0}],"data":{}},{"key":"7ujeo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],' +
          '"data":{}},{"key":"3n9d4","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"lengt' +
          'h":1,"key":1}],"data":{}},{"key":"9r0k2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],' +
          '"data":{}}]}'
    }
    this.receiveHtml = this.receiveHtml.bind(this);
    this.receiveMarkdown = this.receiveMarkdown.bind(this);
    this.receiveRaw = this.receiveRaw.bind(this);
    this.onChange=this.onChange.bind(this);
    this.beforeUpload=this.beforeUpload.bind(this);
  }
  receiveHtml(content) {
    console.log("recieved HTML content", content);
  }
  componentDidMount(){
  }
  receiveMarkdown(content) {
    console.log("recieved markdown content", content);
  }
  receiveRaw(content) {
    console.log("recieved Raw content", content);
  }
  onChange(info){
    console.log("onChange:",info);
  }
  beforeUpload(file){
    console.log("beforeUpload:",file);
  }
  render() {
    const uploadConfig = {
      QINIU_URL: "http://up.qiniu.com", //上传地址，现在暂只支持七牛上传
      QINIU_IMG_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do", //请求图片的token
      QINIU_PFOP: {
        url: "http://www.yourServerAddress.mobi/doQiniuPicPersist.do" //七牛持久保存请求地址
      },
      QINIU_VIDEO_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do", //请求媒体资源的token
      QINIU_FILE_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do?name=patch", //其他资源的token的获取
      QINIU_DOMAIN_IMG_URL: "https://image.yourServerAddress.mobi", //图片文件地址的前缀
      QINIU_DOMAIN_VIDEO_URL: "https://video.yourServerAddress.mobi", //视频文件地址的前缀
      QINIU_DOMAIN_FILE_URL: "https://static.yourServerAddress.com/", //其他文件地址前缀
    }

    //uploadProps 配置方法见 https://ant.design/components/upload-cn/
    const uploadProps={
      action: "",
      onChange: this.onChange,
      listType: 'picture',
      fileList: [""],
      data: (file)=>{//支持自定义保存文件名、扩展名支持
          console.log("uploadProps data",file)
        },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true}
    return (
      <div>
        <div>Editor demo 1 (use default html format ):
        </div>
        <LzEditor
          active={true}
          importContent={this.state.htmlContent}
          cbReceiver={this.receiveHtml}
          uploadProps={uploadProps}/>
        <br/>
        <br/>
        <div>Editor demo 2 (use markdown format ):
        </div>
        <LzEditor
          active={true}
          importContent={this.state.markdownContent}
          cbReceiver={this.receiveMarkdown}
          uploadConfig={uploadConfig}
          uploadProps={uploadProps}
          image={false}
          video={false}
          audio={false}
          convertFormat="markdown"/>
        <br/>
        <br/>
        <div>Editor demo 3 (use Raw format ):
        </div>
        <LzEditor
          active={true}
          importContent={this.state.rawContent}
          cbReceiver={this.receiveRaw}
          uploadConfig={uploadConfig}
          uploadProps={uploadProps}
          image={false}
          video={false}
          audio={false}
          convertFormat="raw"/>
      </div>
    );
  }
}

ReactDOM.render(
  <Test/>, document.getElementById('test'));
