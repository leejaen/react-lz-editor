# react-lz-editor

An open source react rich-text editor ( mordern react editor includes media support such as texts, images, videos, audios, links etc. ), development based on Draft-Js and Ant-design, good support html, markdown, draft-raw mode.

一款基于 draft-Js 和 ant-design 实现的 react 富文本编辑器，支持文本、图片、视频、音频、链接等元素插入，同时支持HTML、markdown、draft-raw格式。

## Live demo

[react-lz-editor](https://leejaen.github.io/react-lz-editor/index.html)

Disabled media insert feature on demo page, because of there was no online API support for the time being, here is [The server side API demo in java](https://github.com/leejaen/react-lz-editor/blob/master/java_demo/getQiniuUptoken.java) you may want.

因为上传图片视频多媒体等文件需要后端服务器接口配合，这部分暂时没有实现在线demo接口，所以暂时通过配置去掉了，java版本接口实现示例请参考[示例代码](https://github.com/leejaen/react-lz-editor/blob/master/java_demo/getQiniuUptoken.java)。

# Install

``` npm install react-lz-editor --save ```

Version note: React 15.4.2+ and react-dom 15.4.2+ is required. Antd version at last 2.8.3 in your project is recommended.

版本号说明：react、react-dom 版本必须在15.4.2以上，Antd版本最好在2.8.3以上。

# Git
    git+ssh://git@github.com/leejaen/react-lz-editor.git

# Usage & Examples:

  ``` js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import LzEditor from 'react-lz-editor'
  class Test extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        content: `<h1>一级标题 Head level 1</h1>
                <p style='text-align:center;'><span style="color:#ED5565">红色文字</span>，居中对齐，<strong>加粗</strong>，<em>斜体</em></p>
                <blockquote style='text-align:left;'><span style="color:#ffce54">其</span><span style="color:#a0d468">他</span><span style="color:#38afda">颜</span><span style="color:#967adc">色</span>
                <span style="color:#a0d468">C</span><span style="color:#48cfad">OL</span><span style="color:#4a89dc">O</span><span style="color:#967adc">R</span><span style="color:#434a54">S</span></blockquote>
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
                <h2>正文示例：乐视金融传将收购数码视讯子公司，拿下互联网、数字电视两张支付牌照</h2>
                <p>用场景化的方式表达就是，用户可以在观看电视购物频道的时候，直接从电视上进行支付购买商品，不用再通过银行汇款或者货到付款；可以选择对电视上的点播内容进行付费，还可能在电视上对水电煤等公用事业费用进行缴费。</p>
                <p>一度金融的消息称，乐视金融同数码视讯的接触尚处在高层范围内进行，因此对于收购价格，暂时还不能确定。</p>
                <p>如果乐视金融拿下数码视讯的两张金融牌照，并且在到期后能够获得央行审核顺利延期，意味着乐视可以通过移动设备和电视两个终端来链接用户的银行卡。</p>
                <p>乐视金融在去年11月份首度公开亮相的时候，缺少银行和支付两张关键牌照就一直是外界关注的问题。</p>`
      }
      this.receiveHtml = this.receiveHtml.bind(this);
    }
    receiveHtml(content) {
      console.log("Recieved content", content);
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
      return <LzEditor
        active={true}
        importContent={this.state.content}
        cbReceiver={this.receiveHtml}
        uploadConfig={uploadConfig}
        fullScreen={false}/>
    }
  }

  ReactDOM.render(
    <Test/>, document.getElementById('test'));


  ```
  [https://image.qiluyidian.mobi/54541628992197066868.png](https://image.qiluyidian.mobi/54541628992197066868.png)
  ![示例](https://image.qiluyidian.mobi/54541628992197066868.png)


# API:
| 配置项 | 类型 | 默认值 | 说明 |
| -- | -- | -- | -- |
| active | bool | false | 有更新时是否刷新 |
| importContent | string | "" | 编辑器显示内容 |
| cbReceiver | function | null | 编辑器内容更新后的回调函数，此函数接受一个改动后的返回参数值 |
| undoRedo | bool | true | 是否启用撤销恢复功能，默认启用 |
| removeStyle | bool | true | 是否启用移除格式功能，默认启用 |
| pasteNoStyle | bool | true | 是否启用文本粘贴功能，默认启用 |
| blockStyle | bool | true | 是否启用段落样式设置功能（H1、列表、区段等），默认启用 |
| alignment | bool | true | 是否启用文本对齐设置功能，默认启用 |
| inlineStyle | bool | true | 是否启用文字样式设置功能（加粗、倾斜、下划线等），默认启用 |
| color | bool | true | 是否启用文字颜色设置功能，默认启用 |
| image | bool | true | 是否启用图片上传后插入功能，默认启用 |
| video | bool | true | 是否启用音视频上传后插入功能，默认启用 |
| urls | bool | true | 是否启用添加删除链接功能，默认启用 |
| autoSave | bool | true | 是否启用自动保存功能，默认启用 |
| fullScreen | bool | true | 是否启用全屏功能，默认启用 |
| convertFormat | string | "html" | 设置内容导入导出格式，支持html、markdown、raw三种格式，默认html |
| uploadConfig | object | null | 启用媒体上传后插入功能时，上传参数配置对象 |
# QA:
