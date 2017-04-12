'use strict';

var _css = require('antd/lib/message/style/css');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

require('whatwg-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ajax: {
    createXHR: function createXHR() {
      if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
      } else if (typeof ActiveXObject != "undefined") {
        var version = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
        for (var i = 0; i < version.length; i++) {
          try {
            return new ActiveXObject(version[i]);
          } catch (e) {}
        }
      } else {
        throw new Error("您的系统或浏览器不支持XHR对象！");
      }
    },
    getParams: function getParams(data) {
      var arr = [];
      for (var i in data) {
        var temp = data[i];
        if (temp == undefined || temp == null) {
          continue;
        }
        if ((typeof temp === 'undefined' ? 'undefined' : _typeof(temp)) == "object") {
          temp = JSON.stringify(temp);
          temp = encodeURIComponent(temp);
        }
        arr.push(encodeURIComponent(i) + "=" + temp);
      }
      return arr.join("&");
    },
    requestData: function requestData(urlObj) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var onSuccess = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      var onError = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
        console.warn("！！！！！！！！！！服务器或接口返回出错！！！！！！！！！！");
      };
      var method = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "post";
      var isAsync = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

      data = Object.assign({}, urlObj.defaultData ? urlObj.defaultData : "", {
        "tokenID": "yourTokenID"
      }, data);
      data = _common2.default.obj.removeFalseEntity(data);
      data = _common2.default.obj.stringifyPropsDeeply(data);
      var content_type = "application/json";
      if (!!urlObj.contentType == false) {
        content_type = "application/x-www-form-urlencoded;charset=utf-8";
        data = this.getParams(data);
      }
      method = method || urlObj.method;
      isAsync = isAsync || urlObj.isAsync;
      var callback = function callback() {
        if (xhr.status == 200) {
          if (!!onSuccess) {
            var _data = null;
            try {
              _data = JSON.parse(xhr.responseText);
            } catch (e) {
              _message2.default.error("数据返回出错，请通知技术部排查，参考原因：“" + e.toString() + "”；返回数据：“" + (xhr.responseText.length > 20 ? xhr.responseText.substr(0, 20) + "……(详见控制台)" : xhr.responseText) + "”", 10);

              return false;
            }
            if (_data.rc == "405") {
              _message2.default.info("验证登录超时请重新登陆", 10);
              return false;
            }
            onSuccess(_data);
          }
        } else {
          if (!!onError) {
            onError();
          }
        }
      };

      var xhr = this.createXHR();
      if (method === "get") {
        urlObj.url += urlObj.url.indexOf("?") == "-1" ? "?" + data : "&" + data;
      }

      if (isAsync === true) {
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            callback();
          }
        };
      }
      xhr.open(method, urlObj.url, isAsync);
      if (method === "post") {
        xhr.setRequestHeader("Content-Type", content_type);
        if (!!urlObj.Authorization) {
          xhr.setRequestHeader("Authorization", urlObj.Authorization);
        }
        xhr.send(data);
      } else {
        xhr.send(null);
      }

      if (isAsync === false) {
        callback();
      }
    },
    fetchData: function fetchData(urlObj) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var doProcess = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (theData) {
        console.warn("获取到数据但是未处理：", theData);
      };
      var onCatch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (e) {
        console.warn("服务器或接口返回出错或数据处理过程中出错，参考：", e);
      };

      var tokenID = "yourTokenID";

      data = Object.assign({}, urlObj.hasOwnProperty("defaultData") ? urlObj.defaultData : {}, {
        "tokenID": tokenID
      }, data);
      fetch(urlObj.url + "?tokenID=" + tokenID, {
        method: "POST",
        body: JSON.stringify(data) }).then(function (res) {

        return res.json();
      }).then(function (theData) {
        if (theData.rc === "400") {
          _message2.default.info("验证您的权限设置有更新，请重新登陆", 10);
          return false;
        } else if (theData.rc == "405") {
          _message2.default.info("验证登录超时请重新登陆", 10);
          return false;
        } else {
          doProcess(theData);
        }
      }).catch(function (e) {
        onCatch(e);
      });
    }
  }
};