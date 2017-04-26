import React from 'react';
import ReactDOM from 'react-dom';
// import {LzEditor} from './index'
import LzEditor from './editor/index.jsx'
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: `<h1>一级标题 Head level 1</h1>
                <h2>HTML 格式</h2>
                <p style='text-align:center;'><span style="color:#ED5565">红色文字</span>，居中对齐，<strong>加粗</strong>，<em>斜体</em></p>
                <blockquote style='text-align:left;'><span style="color:#ffce54">其</span><span style="color:#a0d468">他</span><span style="color:#38afda">颜</span><span style="color:#967adc">色</span> <span style="color:#a0d468">C</span><span style="color:#48cfad">OL</span><span style="color:#4a89dc">O</span><span style="color:#967adc">R</span><span style="color:#434a54">S</span></blockquote>
                <p><br></p>
                <ul>
                  <li><span style="color:#434a54">list 1</span></li>
                  <li><span style="color:#434a54">list 2</span></li>
                  <li><span style="color:#434a54">list 3</span></li>
                </ul>
                <pre><code>Block here.Block here.Block here.Block here.</code></pre>
                <pre><code>Block here.Block here.Block here.Block here.Block here.</code></pre>
                <pre><code>Block here.Block here.Block here.Block here.Block here.</code></pre>
                <p><img src="https://image.qiluyidian.mobi/43053508139910678747.jpg"/></p>
                <p><br></p>
                <h2>正文示例：</h2>
                <h3>乐视金融传将收购数码视讯子公司，拿下互联网、数字电视两张支付牌照</h3>
                <p>用场景化的方式表达就是，用户可以在观看电视购物频道的时候，直接从电视上进行支付购买商品，不用再通过银行汇款或者货到付款；可以选择对电视上的点播内容进行付费，还可能在电视上对水电煤等公用事业费用进行缴费。</p>
                <p>一度金融的消息称，乐视金融同数码视讯的接触尚处在高层范围内进行，因此对于收购价格，暂时还不能确定。</p>
                <p><video controls src="https://image.qiluyidian.mobi/46474938866595256833.mp4"/></p>
                <p>如果乐视金融拿下数码视讯的两张金融牌照，并且在到期后能够获得央行审核顺利延期，意味着乐视可以通过移动设备和电视两个终端来链接用户的银行卡。</p>
                <p>乐视金融在去年11月份首度公开亮相的时候，缺少银行和支付两张关键牌照就一直是外界关注的问题。</p>`,
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
  }
  receiveHtml(content) {
    console.log("recieved HTML content", content);
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({htmlContent:"<p>This is changes for test.</p>"})
    },1000)
  }
  receiveMarkdown(content) {
    console.log("recieved markdown content", content);
  }
  receiveRaw(content) {
    console.log("recieved Raw content", content);
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
      QINIU_IMG_DOMAIN_URL: "https://image.yourServerAddress.mobi", //图片文件地址的前缀
      QINIU_DOMAIN_VIDEO_URL: "https://video.yourServerAddress.mobi", //视频文件地址的前缀
      QINIU_DOMAIN_FILE_URL: "https://static.yourServerAddress.com/", //其他文件地址前缀
    }
    return (
      <div>
        <div>Editor demo 1 (use default html format ):
        </div>
        <LzEditor
          active={true}
          importContent={this.state.htmlContent}
          cbReceiver={this.receiveHtml}
          uploadConfig={uploadConfig}/>
        <br/>
        <br/>
        <div>Editor demo 2 (use markdown format ):
        </div>
        <LzEditor
          active={true}
          importContent={this.state.markdownContent}
          cbReceiver={this.receiveMarkdown}
          uploadConfig={uploadConfig}
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
