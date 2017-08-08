'use strict';

var _css = require('antd/lib/modal/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css2 = require('antd/lib/table/style/css');

var _table = require('antd/lib/table');

var _table2 = _interopRequireDefault(_table);

var _css3 = require('antd/lib/popconfirm/style/css');

var _popconfirm = require('antd/lib/popconfirm');

var _popconfirm2 = _interopRequireDefault(_popconfirm);

var _css4 = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _css5 = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _publicDatas = require('../../global/supports/publicDatas');

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoSaveControls = function (_Component) {
  _inherits(AutoSaveControls, _Component);

  function AutoSaveControls(props) {
    _classCallCheck(this, AutoSaveControls);

    var _this = _possibleConstructorReturn(this, (AutoSaveControls.__proto__ || Object.getPrototypeOf(AutoSaveControls)).call(this, props));

    _this.state = {
      visible: false,
      list: [],
      selectedRowKeys: [],
      selectedKeyName: ""
    }, _this.onAutoSaveToggle = _this.onAutoSaveToggle.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.sendSavedItemToEditor = _this.sendSavedItemToEditor.bind(_this);
    _this.doDelete = _this.doDelete.bind(_this);
    _this.selectRow = _this.selectRow.bind(_this);
    return _this;
  }

  _createClass(AutoSaveControls, [{
    key: 'onAutoSaveToggle',
    value: function onAutoSaveToggle() {
      this.setState({ visible: true, list: [] });
      this.componentDidMount();
    }
  }, {
    key: 'doDelete',
    value: function doDelete(text) {
      window.localStorage.removeItem("$d" + text);
      var currItem = (0, _find2.default)(this.state.list, function (item) {
        return item.keyName == text;
      });
      if (currItem.key === this.state.selectedRowKeys[0]) {
        this.state.selectedRowKeys = [];
        this.forceUpdate();
      }
      this.componentDidMount();
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(e) {
      this.setState({ visible: false });
      this.state.list = [];
      this.forceUpdate();
    }
  }, {
    key: 'sendSavedItemToEditor',
    value: function sendSavedItemToEditor() {
      this.setState({ visible: false });
      var list = this.state.list.map(function (item) {
        return item;
      });
      var content = _publicDatas.PRO_COMMON.localDB.getter("$d" + this.state.selectedKeyName);
      this.props.receiveSavedItem(content);
      this.state.list = [];
      this.forceUpdate();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var itemList = [];
      for (var i = 0; i < localStorage.length; i++) {
        var keyName = localStorage.key(i);
        if (!~keyName.lastIndexOf("$d")) {
          continue;
        }

        itemList.push({ keyName: keyName.replace("$d", "") });
      }

      _publicDatas.PRO_COMMON.obj.refsKeyTo(itemList);
      if (!!itemList.length) {
        this.setState({ list: itemList });
      } else {
        this.setState({ list: [] });
      }
    }
  }, {
    key: 'selectRow',
    value: function selectRow(record, index) {
      this.state.selectedRowKeys = [this.state.list[index].key];
      this.state.selectedKeyName = this.state.list[index].keyName;
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var className = 'RichEditor-styleButton';
      var that = this;

      var columns = [{
        title: this.props.lang.previewMsg,
        dataIndex: 'keyName',
        key: 'keyName',
        render: function render(text, record, index) {
          return text + "...";
        }
      }, {
        title: '',
        key: 'operation',
        render: function render(text, record) {
          return _react2.default.createElement(
            'a',
            { onClick: function onClick() {
                return _this2.doDelete(record.keyName);
              } },
            _this2.props.lang.deleteDraftItem
          );
        }
      }];

      var rowSelection = {
        selectedRowKeys: that.state.selectedRowKeys,
        onChange: function onChange(selectedRowKeys, selectedRows) {
          that.state.selectedRowKeys = selectedRowKeys;
          that.forceUpdate();
        },
        onSelect: function onSelect(record, selected, selectedRows) {
          that.state.selectedKeyName = record.keyName;
        },
        type: "radio"
      };
      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'span',
            { className: className, onClick: that.onAutoSaveToggle, title: this.props.lang.draftTipMsg },
            _react2.default.createElement(_icon2.default, { type: 'editor_safty' })
          )
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: this.props.lang.draftModalTitle,
            visible: that.state.visible,
            closable: false,
            width: 600,
            footer: [_react2.default.createElement(
              _button2.default,
              { key: 'back', size: 'large', onClick: that.handleCancel },
              '  ',
              this.props.lang.cancelText,
              '  '
            ), _react2.default.createElement(
              _popconfirm2.default,
              { placement: 'right', title: this.props.lang.confirmUseDraft, onConfirm: that.sendSavedItemToEditor },
              '\xA0\xA0\xA0\xA0',
              _react2.default.createElement(
                _button2.default,
                { key: 'submit', type: 'primary', size: 'large', disabled: !that.state.selectedRowKeys.length },
                ' ',
                this.props.lang.OKText,
                ' '
              )
            )] },
          _react2.default.createElement(_table2.default, {
            rowSelection: rowSelection,
            onRowClick: that.selectRow,
            columns: columns,
            dataSource: that.state.list,
            size: 'small'
          }),
          _react2.default.createElement(
            'span',
            { style: { color: "#ccc" } },
            this.props.lang.draftCautionMsg
          )
        )
      );
    }
  }]);

  return AutoSaveControls;
}(_react.Component);

module.exports = AutoSaveControls;