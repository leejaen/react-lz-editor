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
        title: this.props.lang.previewMsg,
        dataIndex: 'keyName',
        key: 'keyName',
        render: (text, record, index) => (text + "...")
      }, {
        title: '',
        key: 'operation',
        render: (text, record) => (
          <a onClick={() => this.doDelete(record.keyName)}>{this.props.lang.deleteDraftItem}</a>
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
            <span className={className} onClick={that.onAutoSaveToggle} title={this.props.lang.draftTipMsg}><Icon type="editor_safty"/>
            </span>
        </span>
        <Modal
          title={this.props.lang.draftModalTitle}
          visible={that.state.visible}
          closable={false}
          width={600}
          footer={[< Button key = "back" size = "large" onClick = {
            that.handleCancel
          } >  {this.props.lang.cancelText}  < /Button>,
            <Popconfirm placement="right" title={this.props.lang.confirmUseDraft} onConfirm={that.sendSavedItemToEditor}>
              &nbsp;&nbsp;&nbsp;&nbsp;<Button key="submit" type="primary" size="large" disabled={!that.state.selectedRowKeys.length}> {this.props.lang.OKText} </Button >
            </Popconfirm>]}>
          <Table
            rowSelection={rowSelection}
            onRowClick={that.selectRow}
            columns={columns}
            dataSource={that.state.list}
            size="small"
            /><span style={{color:"#ccc"}}>{this.props.lang.draftCautionMsg}</span>
        </Modal>
      </div>
    )
  }
}
module.exports = AutoSaveControls;
