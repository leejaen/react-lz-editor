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
      const uploadConfig={
        
      }
        return <LzEditor
          active={true}
          HtmlContent={this.state.content}
          cbReceiver={this.receiveHtml}
          InlineStyle={false}
          Color={false}
          FullScreen={false}
          />
    }
}

ReactDOM.render(
    <Test/>, document.getElementById('hello'));
