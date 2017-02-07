# react-lz-editor
an open source react editor based on draft-Js and ant design.

# Usage & Examples:

``` js
import React from 'react';
import ReactDOM from 'react-dom';
import LzEditor from './editor'
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: `<p><span style="color:#e9573f">我要做一个幸福的女子，认真地生活，少一点幻想。</span></p><p>根据山东省重污染天气应急工作小组办公室《关于启动重污染天气Ⅰ级响应的通知》，<span style="color:#Da4453">我市于12月29日20时发布重污染天气红色预警</span>，并于12月30日20时采取包括机动车单双号限行等措施的重污染天气Ⅰ级应急响应。经气象部门与环保部门最新会商，由于天气形势发生了一定变化，12月31日至2017年1月1日，虽然空气扩散条件转差，31日仍以中度污染为主，预计1月1日空气质量以中度至重度为主，达不到严重污染的程度。为保障市民节假日出行，经市政府批准，暂停实施机动车单双号限行措施。其它应急响应措施继续执行。</p>`
    }
    this.receiveHtml = this.receiveHtml.bind(this);
  }
  receiveHtml(content) {
    console.log("recieved content", content);
  }
  render() {
    const uploadConfig = {
      QINIU_URL: "http://up.qiniu.com", //上传地址
      QINIU_IMG_TOKEN_URL: "http://www.yourServerAddress.com/getQiniuUptoken.do", //请求图片的token
      QINIU_PFOP: {
        url: "http://www.yourServerAddress.com/QiniuPicPersist.do" //七牛持久保存请求地址
      },
      QINIU_VIDEO_TOKEN_URL: "http://www.yourServerAddress.com/getQiniuUptoken.do", //请求媒体资源的token
      QINIU_FILE_TOKEN_URL: "http://www.yourServerAddress.com/getQiniuUptoken.do?name=patch", //其他资源的token的获取
      QINIU_IMG_DOMAIN_URL: "https://image.qiluyidian.mobi", //图片文件地址的前缀
      QINIU_DOMAIN_VIDEO_URL: "https://image.qiluyidian.mobi", //视频文件地址的前缀
      QINIU_DOMAIN_FILE_URL: "https://static.qiluyidian.com/", //其他文件地址前缀
    }
    return <LzEditor
      active={true}
      HtmlContent={this.state.content}
      cbReceiver={this.receiveHtml}
      uploadConfig={uploadConfig}
      FullScreen={false}/>
  }
}

ReactDOM.render(
  <Test/>, document.getElementById('test'));


```

# API:

| 配置项  | 类型  | 默认值  | 说明  |  
| ---------  | ---------  | ---------  | ---------  |  
| active  | bool  | false  | 有更新时是否刷新  |  
| HtmlContent  | string  | 空  | 编辑器显示内容  |  
| cbReceiver  | function  | null  | 编辑器内容更新后的回调函数，此函数接受一个改动后的返回参数值  |
| UndoRedo  | bool  | true  | 是否启用撤销恢复功能，默认启用  |
| RemoveStyle  | bool  | true  | 是否启用移除格式功能，默认启用  |
| PasteNoStyle  | bool  | true  | 是否启用文本粘贴功能，默认启用  |
| BlockStyle  | bool  | true  | 是否启用段落样式设置功能（H1、列表、区段等），默认启用  |
| Alignment  | bool  | true  | 是否启用文本对齐设置功能，默认启用  |
| InlineStyle  | bool  | true  | 是否启用文字样式设置功能（加粗、倾斜、下划线等），默认启用  |
| Color  | bool  | true  | 是否启用文字颜色设置功能，默认启用  |
| Image  | bool  | true  | 是否启用图片上传后插入功能，默认启用  |
| Video  | bool  | true  | 是否启用音视频上传后插入功能，默认启用  |
| Url  | bool  | true  | 是否启用添加删除链接功能，默认启用  |
| AutoSave  | bool  | true  | 是否启用自动保存功能，默认启用  |
| FullScreen  | bool  | true  | 是否启用全屏功能，默认启用  |
| uploadConfig  | object  | null  | 启用媒体上传后插入功能时，上传参数配置对象  |
  
  
  表头1  | 表头2
--------- | --------
表格单元  | 表格单元 
表格单元  | 表格单元 

| 表头1  | 表头2|
| ---------- | -----------|
| 表格单元   | 表格单元   |
| 表格单元   | 表格单元   |


# QA:
