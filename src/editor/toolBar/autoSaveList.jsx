import React, {Component} from 'react';
import {
  Modal,
  Button,
  Popconfirm,
  message,
  Table,
  Icon
} from 'antd';
import {PRO_COMMON} from '../../global/supports/publicDatas';
import find from "lodash/find";
class AutoSaveControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      list: [],
      selectedRowKeys: [],
      selectedKeyName: ""
    },
    this.onAutoSaveToggle = this.onAutoSaveToggle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.sendSavedItemToEditor = this.sendSavedItemToEditor.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this.selectRow = this.selectRow.bind(this);
  }

  onAutoSaveToggle() {
    this.setState({visible: true, list: []});
    this.componentDidMount();
  }
  doDelete(text) {
    window.localStorage.removeItem("$d" + text);
    let currItem=find(this.state.list,item=>item.keyName==text)
    if (currItem.key===this.state.selectedRowKeys[0]) {
      this.state.selectedRowKeys=[];
      this.forceUpdate();
    }
    this.componentDidMount();
  }
  handleCancel(e) {
    // console.log(e);
    this.setState({visible: false});
    this.state.list = [];
    this.forceUpdate();
  }
  sendSavedItemToEditor() {
    this.setState({visible: false});
    let list = this.state.list.map((item) => {
      return item;
    });
    let content=PRO_COMMON.localDB.getter("$d"+this.state.selectedKeyName);//window.localStorage.getItem("$d"+this.state.selectedKeyName);
//console.log("content",content)
    this.props.receiveSavedItem(content);
    this.state.list = [];
    this.forceUpdate();
  }
  componentDidMount() {
//console.log("componentDidMount!");
    let itemList = [];
    for (var i = 0; i < localStorage.length; i++) {
      let keyName = localStorage.key(i);
      if (!~ keyName.lastIndexOf("$d")) {
        continue;
      }
  //console.log(keyName);
      itemList.push({keyName: keyName.replace("$d","")})
    }

    PRO_COMMON.obj.refsKeyTo(itemList)
    if (!!itemList.length) {
  //console.log("itemList", itemList);
      this.setState({list: itemList});
    } else {
      this.setState({list: []});
    }
  }
  selectRow(record, index) {
//console.log("selectRow!",record, index)
    this.state.selectedRowKeys = [this.state.list[index].key];
    this.state.selectedKeyName = this.state.list[index].keyName;
    this.forceUpdate();
  }
  render() {
    let className = 'RichEditor-styleButton';
    let that = this;

    const columns = [
      {
        title: '内容预览',
        dataIndex: 'keyName',
        key: 'keyName',
        render: (text, record, index) => (text + "...")
      }, {
        title: '',
        key: 'operation',
        render: (text, record) => (
          <a onClick={() => this.doDelete(record.keyName)}>删除</a>
        )
      }
    ];

    const rowSelection = {
      selectedRowKeys: that.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
    //console.log("onChange", selectedRowKeys);
        that.state.selectedRowKeys = selectedRowKeys;
        that.forceUpdate();
      },
      onSelect: function(record, selected, selectedRows) {
    //console.log("onSelect", record.keyName);
        that.state.selectedKeyName = record.keyName;
      },
      type: "radio"
    };
    return (
      <div className="RichEditor-controls">
        <span>
            <span className={className} onClick={that.onAutoSaveToggle} title="保险库——编辑器中按Ctrl+S或Cmd+S存入保险库，点击打开保险库以继续"><Icon type="editor_safty"/>
            </span>
        </span>
        <Modal
          title="编辑器保险库条目列表："
          visible={that.state.visible}
          closable={false}
          width={600}
          footer={[< Button key = "back" size = "large" onClick = {
            that.handleCancel
          } > 取 消 < /Button>,
            <Popconfirm placement="right" title="确定后编辑器内容将会被最后一次保存的内容替换，若有更改，替换后将不可恢复，是否继续？" onConfirm={that.sendSavedItemToEditor}>
              &nbsp;&nbsp;&nbsp;&nbsp;<Button key="submit" type="primary" size="large" disabled={!that.state.selectedRowKeys.length}> 确 定 </Button >
            </Popconfirm>]}>
          <Table
            rowSelection={rowSelection}
            onRowClick={that.selectRow}
            columns={columns}
            dataSource={that.state.list}
            size="small"
            /><span style={{color:"#ccc"}}>编辑器内容默认一分钟保存一次，可以手动Ctrl+S或Cmd+S保存，内容小于20字时将不会保存在保险库中；列表中不用数据请及时删除维护，否则会影响保险库保存容量！</span>
        </Modal>
      </div>
    )
  }
}
module.exports = AutoSaveControls;
