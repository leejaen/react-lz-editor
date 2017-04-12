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
        title: '内容预览',
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
            '\u5220\u9664'
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
            { className: className, onClick: that.onAutoSaveToggle, title: '\u4FDD\u9669\u5E93\u2014\u2014\u7F16\u8F91\u5668\u4E2D\u6309Ctrl+S\u6216Cmd+S\u5B58\u5165\u4FDD\u9669\u5E93\uFF0C\u70B9\u51FB\u6253\u5F00\u4FDD\u9669\u5E93\u4EE5\u7EE7\u7EED' },
            _react2.default.createElement(_icon2.default, { type: 'editor_safty' })
          )
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: '\u7F16\u8F91\u5668\u4FDD\u9669\u5E93\u6761\u76EE\u5217\u8868\uFF1A',
            visible: that.state.visible,
            closable: false,
            width: 600,
            footer: [_react2.default.createElement(
              _button2.default,
              { key: 'back', size: 'large', onClick: that.handleCancel },
              ' \u53D6 \u6D88 '
            ), _react2.default.createElement(
              _popconfirm2.default,
              { placement: 'right', title: '\u786E\u5B9A\u540E\u7F16\u8F91\u5668\u5185\u5BB9\u5C06\u4F1A\u88AB\u6700\u540E\u4E00\u6B21\u4FDD\u5B58\u7684\u5185\u5BB9\u66FF\u6362\uFF0C\u82E5\u6709\u66F4\u6539\uFF0C\u66FF\u6362\u540E\u5C06\u4E0D\u53EF\u6062\u590D\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F', onConfirm: that.sendSavedItemToEditor },
              '\xA0\xA0\xA0\xA0',
              _react2.default.createElement(
                _button2.default,
                { key: 'submit', type: 'primary', size: 'large', disabled: !that.state.selectedRowKeys.length },
                ' \u786E \u5B9A '
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
            '\u7F16\u8F91\u5668\u5185\u5BB9\u9ED8\u8BA4\u4E00\u5206\u949F\u4FDD\u5B58\u4E00\u6B21\uFF0C\u53EF\u4EE5\u624B\u52A8Ctrl+S\u6216Cmd+S\u4FDD\u5B58\uFF0C\u5185\u5BB9\u5C0F\u4E8E20\u5B57\u65F6\u5C06\u4E0D\u4F1A\u4FDD\u5B58\u5728\u4FDD\u9669\u5E93\u4E2D\uFF1B\u5217\u8868\u4E2D\u4E0D\u7528\u6570\u636E\u8BF7\u53CA\u65F6\u5220\u9664\u7EF4\u62A4\uFF0C\u5426\u5219\u4F1A\u5F71\u54CD\u4FDD\u9669\u5E93\u4FDD\u5B58\u5BB9\u91CF\uFF01'
          )
        )
      );
    }
  }]);

  return AutoSaveControls;
}(_react.Component);

module.exports = AutoSaveControls;