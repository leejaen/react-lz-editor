import React from 'react';
import ReactDOM from 'react-dom';
import LzEditor from './editor'
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "<p>Tips、Toast、弹窗、动作列表等等这几个词，虽然经常挂在嘴边，但是应该如何分类自己并不清楚，查阅大量资料后，我发现原来还有更多我不知道的知识点，每个人分类的维度也各不相同，有些按照模态、非模态弹窗来分类（Toast、Dialog、Actionbar 和 Snackbar）；有些按照弹窗、浮层来分等等，我觉得没有绝对的对错，只要能够有自己清晰的思考维度与参考依据，并且能够为实际工作带来指导意义，那就是有价值的，所以自己在经过筛选归类后，决定按照以下维度来定义我自己的弹窗体系，大纲如下（如有不妥之处，还请批评指正）：</p>"
        }
        this.receiveHtml = this.receiveHtml.bind(this);
    }
    receiveHtml(content) {
        console.log("recieved content", content);
    }
    render() {
        const uploadConfig = {
            QINIU_URL: "http://up.qiniu.com", //上传地址
            QINIU_IMG_TOKEN_URL: "http://114.55.148.57:8083/getQiniuUptoken.do", //请求图片的token
            QINIU_PFOP: {
                url: "http://114.55.148.57:8083/QiniuPicPersist.do"
            },
            QINIU_VIDEO_TOKEN_URL: "http://114.55.148.57:8083/getQiniuUptoken.do", //请求视频资源的token
            QINIU_FILE_TOKEN_URL: "http://114.55.148.57:8083/getQiniuUptoken.do?name=patch", //另一种资源的token的获取
            QINIU_IMG_DOMAIN_URL: "https://image.qiluyidian.mobi", //图片文件地址的前缀
            QINIU_DOMAIN_VIDEO_URL: "https://image.qiluyidian.mobi", //视频文件地址的前缀
            QINIU_DOMAIN_FILE_URL: "https://static.qiluyidian.com/", //其他文件地址前缀
        }
        return <LzEditor active={true} HtmlContent={this.state.content} cbReceiver={this.receiveHtml} uploadConfig={uploadConfig} InlineStyle={false} Color={false} FullScreen={false}/>
    }
}

ReactDOM.render(
    <Test/>, document.getElementById('hello'));
