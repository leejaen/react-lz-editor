# Entropy react-lz-editor guide

A Entropy-customized react rich-text editor based off of [react-lz-editor:](https://leejaen.github.io/react-lz-editor/index.html).

## How to contribute
```
// clone this repo and go to the repo folder.

yarn && yarn dev

// All the source code is under /src. 
// Create a new branch and open with your favorite editor.
git checkout -b [dev_name]/[feature_branch]

// After you finish your development, you open a PR. Get approval and then merge into master.
// The admin run the following command to publish it (IT IS A MUST! 
// Otherwise, our front-end repo wouldn't be able to access the code.)
git checkout master && yarn publish

// Enjoy coding!
```
[![npm license](https://img.shields.io/npm/l/awesome-badges.svg)](https://www.npmjs.org/package/awesome-badges)

# react-lz-editor

An open source react rich-text editor ( mordern react editor includes media support such as texts, images, videos, audios, links etc. ), development based on Draft-Js and Ant-design, good support html, markdown, draft-raw mode. It's supports multiple languages well and welcome you add your language supports.

## Language Contributors

[![Li Zhen](https://avatars3.githubusercontent.com/u/1638970?s=50&v=4)](https://github.com/leejaen) | [![Li Zhen](https://avatars3.githubusercontent.com/u/1638970?s=50&v=4)](https://github.com/leejaen) | [![Boris Chernysh]()](https://github.com/borisblack) | [![SibaService.inc](https://avatars1.githubusercontent.com/u/1687663?s=50&v=4)](https://github.com/sibaservice)
---|---|---|---
[Li Zhen](https://github.com/leejaen) | [Li Zhen](https://github.com/leejaen) | [Boris Chernysh](https://github.com/borisblack) | [SibaService.inc](https://github.com/sibaservice)
English | Chinese(S. & T.) | Russian | Japannese

## Live demo

[react-lz-editor:](https://leejaen.github.io/react-lz-editor/index.html) https://leejaen.github.io/react-lz-editor/index.html

Disabled media insert feature on demo page, because of there was no online API support for the time being, here is [The server side API demo in java](https://github.com/leejaen/react-lz-editor/blob/master/java_demo/getQiniuUptoken.java) you may want.

# Install
```
npm install react-lz-editor --save
OR
yarn add react-lz-editor
```

Version note: React 15.4.2+ and react-dom 15.4.2+ is required. Antd version at least from 2.8.3 in your project is recommended.

# Git
    git+ssh://git@github.com/leejaen/react-lz-editor.git

# Usage & Examples

  [clicking to code example](https://github.com/leejaen/react-lz-editor/blob/master/src/test.jsx)

  ``` js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import LzEditor from './editor/index.jsx'
  class Test extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        htmlContent: `<h1>Yankees, Peeking at the Red Sox, Will Soon Get an Eyeful</h1>
                  <p>Whenever Girardi stole a glance, there was rarely any good news for the Yankees. While Girardi’s charges were clawing their way to a split of their four-game series against the formidable Indians, the Boston Red Sox were plowing past the rebuilding Chicago White Sox, sweeping four games at Fenway Park.</p>`,
        markdownContent: "## HEAD 2 \n markdown examples \n ``` welcome ```"
        responseList: []
      }
      this.receiveHtml=this.receiveHtml.bind(this);
    }
    receiveHtml(content) {
      console.log("recieved HTML content", content);
      this.setState({responseList:[]});
    }
    render() {
      let policy = "";
      const uploadProps = {
        action: "http://v0.api.upyun.com/devopee",
        onChange: this.onChange,
        listType: 'picture',
        fileList: this.state.responseList,
        data: (file) => {

        },
        multiple: true,
        beforeUpload: this.beforeUpload,
        showUploadList: true
      }
      return (
        <div>
          <div>Editor demo 1 (use default html format ):
          </div>
          <LzEditor active={true} importContent={this.state.htmlContent} cbReceiver={this.receiveHtml} uploadProps={uploadProps}
          lang="en"/>
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
        </div>
      );
    }
  }

  ReactDOM.render(
    <Test/>, document.getElementById('test'));

  ```

![screenshot](https://image.qiluyidian.mobi/54541628992197066868.png)

# API
| props | type | default | description |
| -- | -- | -- | -- |
| active | bool | false | Is reloading content after changing |
| importContent | string | "" | Editor content value, default to "" |
| lang | string | "" | Editor using language, default to your browser language settings |
| cbReceiver | function | null | `Callback` function, the changed value will be sent to its parameter. |
| undoRedo | bool | true | Enabled `undo and redo` feature, default to true |
| removeStyle | bool | true | Enabled `remove style` feature, default to true |
| pasteNoStyle | bool | true | Enabled `paste plan text` feature, default to true |
| blockStyle | bool | true | Enabled `block style (H1,ol,pre etc.)` feature, default to true |
| alignment | bool | true | Enabled `text alignment` feature, default to true |
| inlineStyle | bool | true | Enabled `inline style (bold, italic, underline etc.)` feature, default to true |
| color | bool | true | Enabled `color text` feature, default to true |
| image | bool | true | Enabled `insert image` feature, default to true |
| video | bool | true | Enabled `insert video` feature, default to true |
| audio | bool | true | Enabled `insert audio` feature, default to true |
| urls | bool | true | Enabled `add hyper link` feature, default to true |
| autoSave | bool | true | Enabled `auto save to draft-box` feature, default to true |
| fullScreen | bool | true | Enabled `full screen` feature, default to true |
| convertFormat | string | "html" | Set support format `(html, markdown, raw)`, default to "html" |
| uploadProps | object | null | Customize uploading settings. [API: Antd.Upload](https://ant.design/components/upload/) |
