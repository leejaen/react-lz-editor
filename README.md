[中文版](https://github.com/leejaen/react-lz-editor/blob/master/README.cn.md)

# react-lz-editor

An open source react rich-text editor ( mordern react editor includes media support such as texts, images, videos, audios, links etc. ), development based on Draft-Js and Ant-design, good support html, markdown, draft-raw mode.

## Live demo

[react-lz-editor https://leejaen.github.io/react-lz-editor/index.html](https://leejaen.github.io/react-lz-editor/index.html)

Disabled media insert feature on demo page, because of there was no online API support for the time being, here is [The server side API demo in java](https://github.com/leejaen/react-lz-editor/blob/master/java_demo/getQiniuUptoken.java) you may want.

# Install
```
npm install react-lz-editor --save
OR
yarn add react-lz-editor
```


Version note: React 15.4.2+ and react-dom 15.4.2+ is required. Antd version at last 2.8.3 in your project is recommended.

# Git
    git+ssh://git@github.com/leejaen/react-lz-editor.git

# Usage & Examples

  [code example](https://github.com/leejaen/react-lz-editor/blob/master/src/test.jsx)

  ``` js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import hmacsha1 from "hmacsha1";
  import {Base64} from "js-base64";
  import md5 from "md5";
  import findIndex from "lodash/findIndex";
  import uniqBy from "lodash/uniqBy";
  import LzEditor from './editor/index.jsx'
  class Test extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        htmlContent: `<h1> Head level 1</h1>
              ...
                  <p>Whenever Girardi stole a glance, there was rarely any good news for the Yankees. While Girardi’s charges were clawing their way to a split of their four-game series against the formidable Indians, the Boston Red Sox were plowing past the rebuilding Chicago White Sox, sweeping four games at Fenway Park.</p>`,
        markdownContent: "## HEAD 2 \n markdown examples \n ``` welcome ```",
        rawContent: '{"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://image.qiluyidian.mobi/43053508139910678747.jpg"}}..."data":{}}]}',
        responseList: []
      }
      this.receiveHtml = this.receiveHtml.bind(this);
      this.receiveMarkdown = this.receiveMarkdown.bind(this);
      this.receiveRaw = this.receiveRaw.bind(this);
      this.onChange = this.onChange.bind(this);
      this.beforeUpload = this.beforeUpload.bind(this);
      this.getSignature = this.getSignature.bind(this);
      this.getPolicy = this.getPolicy.bind(this);
    }
    receiveHtml(content) {
      console.log("recieved HTML content", content);
    }
    componentDidMount() {}
    receiveMarkdown(content) {
      console.log("recieved markdown content", content);
    }
    receiveRaw(content) {
      console.log("recieved Raw content", content);
    }
    onChange(info) {
      ...
    }
    beforeUpload(file) {
      console.log("beforeUpload like", file);
    }
    getSignature(fileName) {
      ...
      return Signature;
    }
    getPolicy(fileName) {
      ...
      return policy;
    }
    render() {
      let policy = "";

      //uploadProps configration: https://ant.design/components/upload/
      const uploadProps = {
        action: "http://v0.api.upyun.com/devopee",
        onChange: this.onChange,
        listType: 'picture',
        fileList: this.state.responseList,
        data: (file) => {
          // customize uploading parameters, code example use UPYUN(https://www.upyun.com/)
          return {
            Authorization: "UPYUN reactlzeditor:" + this.getSignature(file.name),
            policy: (() => {
              policy = this.getPolicy(file.name);
              return policy;
            })(),
            signature: md5(policy + '&pLv/J4I6vfpeznxtwU+g/dsUcEY=')
          }
        },
        multiple: true,
        beforeUpload: this.beforeUpload,
        showUploadList: true
      }
      let watermarkImage=[...]
      return (
        <div>
          <div>Editor demo 1 (use default html format ):
          </div>
          <LzEditor active={true} importContent={this.state.htmlContent} cbReceiver={this.receiveHtml} uploadProps={uploadProps}
          lang="en"/>
          <br/>
          <br/>
          <div>Editor demo 2 (use markdown format ):
          </div>
          <LzEditor
            active={true}
            importContent={this.state.markdownContent}
            cbReceiver={this.receiveMarkdown}
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
            image={false}
            video={false}
            audio={false}
            convertFormat="raw"
            lang="zh-CN"/>
        </div>
      );
    }
  }

  ReactDOM.render(
    <Test/>, document.getElementById('test'));

  ```

![e.g.](https://image.qiluyidian.mobi/54541628992197066868.png)

# API
| props | type | default | description |
| -- | -- | -- | -- |
| active | bool | false | is reloading content after changing |
| importContent | string | "" | editor content value |
| cbReceiver | function | null | `callback` function, the changed value will be sent to its parameter. |
| undoRedo | bool | true | enabled `undo and redo` feature, default to true |
| removeStyle | bool | true | enabled `remove style` feature, default to true |
| pasteNoStyle | bool | true | enabled `paste plan text` feature, default to true |
| blockStyle | bool | true | enabled `block style (H1,ol,pre etc.)` feature, default to true |
| alignment | bool | true | enabled `text alignment` feature, default to true |
| inlineStyle | bool | true | enabled `inline style (bold, italic, underline etc.)` feature, default to true |
| color | bool | true | enabled `color text` feature, default to true |
| image | bool | true | enabled `insert image` feature, default to true |
| video | bool | true | enabled `insert video` feature, default to true |
| urls | bool | true | enabled `add hyper link` feature, default to true |
| autoSave | bool | true | enabled `auto save to draft-box` feature, default to true |
| fullScreen | bool | true | enabled `full screen` feature, default to true |
| convertFormat | string | "html" | set support format `(html, markdown, raw)`, default to `html` |
| uploadProps | object | null | customize uploading settings. [API: Antd.Upload](https://ant.design/components/upload/) |
# QA
