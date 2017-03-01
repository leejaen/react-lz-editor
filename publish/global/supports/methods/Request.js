'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by Administrator on 2016/4/27.
                                                                                                                                                                                                                                                                               */
//import {PRO_URL} from 'datas/url.jsx';


var _common = require('./common.jsx');

var _common2 = _interopRequireDefault(_common);

var _antd = require('antd');

require('whatwg-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 可以引入fetch来进行Ajax
module.exports = {
  ajax: {
    createXHR: function createXHR() {
      if (typeof XMLHttpRequest != "undefined") {
        // 非IE6浏览器
        return new XMLHttpRequest();
      } else if (typeof ActiveXObject != "undefined") {
        // IE6浏览器
        var version = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
        for (var i = 0; i < version.length; i++) {
          try {
            return new ActiveXObject(version[i]);
          } catch (e) {
            //跳过
          }
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
          //|| temp == ""
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
      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var onSuccess = arguments.length <= 2 || arguments[2] === undefined ? function () {
        //console.log("onSuccess");
      } : arguments[2];
      var onError = arguments.length <= 3 || arguments[3] === undefined ? function () {
        console.warn("！！！！！！！！！！服务器或接口返回出错！！！！！！！！！！");
      } : arguments[3];
      var method = arguments.length <= 4 || arguments[4] === undefined ? "post" : arguments[4];
      var isAsync = arguments.length <= 5 || arguments[5] === undefined ? true : arguments[5];

      data = Object.assign({}, urlObj.defaultData ? urlObj.defaultData : "", {
        "yourKey": "yourTokenID",
        "tokenID": "4A79B7D419E2431DC7749AF107F0BA0F"
      }, data); //合并
      data = _common2.default.obj.removeFalseEntity(data); //手动转换数值成字符串型数据
      data = _common2.default.obj.stringifyPropsDeeply(data); //手动转换数值成字符串型数据
      var content_type = "application/json";
      if (!!urlObj.contentType == false) {
        content_type = "application/x-www-form-urlencoded;charset=utf-8";
        data = this.getParams(data); // 转义字符串
      }
      method = method || urlObj.method;
      isAsync = isAsync || urlObj.isAsync;
      var callback = function callback() {
        // 判断是否返回正确
        if (xhr.status == 200) {
          if (!!onSuccess) {
            var _data = null;
            try {
              _data = JSON.parse(xhr.responseText);
            } catch (e) {
              _antd.message.error("数据返回出错，请通知技术部排查，参考原因：“" + e.toString() + "”；返回数据：“" + (xhr.responseText.length > 20 ? xhr.responseText.substr(0, 20) + "……(详见控制台)" : xhr.responseText) + "”", 10);
              //console.log("错误返回数据xhr.responseText：“",xhr.responseText,"”");
              return false;
            }
            if (_data.rc == "405") {
              // hashHistory.push("/login");
              _antd.message.info("验证登录超时请重新登陆", 10);
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
        // 判断使用的是否是get方式发送
        urlObj.url += urlObj.url.indexOf("?") == "-1" ? "?" + data : "&" + data;
      }

      // 异步
      if (isAsync === true) {
        // 异步的时候需要触发onreadystatechange事件
        xhr.onreadystatechange = function () {
          // 执行完成
          if (xhr.readyState == 4) {
            callback();
          }
        };
      }
      xhr.open(method, urlObj.url, isAsync); // false是同步 true是异步 // "demo.php?rand="+Math.random()+"&name=ga&ga",
      if (method === "post") {
        //console.log("urlObj.Authorization", urlObj.Authorization, !!urlObj.Authorization);
        xhr.setRequestHeader("Content-Type", content_type);
        if (!!urlObj.Authorization) {
          xhr.setRequestHeader("Authorization", urlObj.Authorization);
        }
        xhr.send(data);
      } else {
        xhr.send(null);
      }

      // 同步
      if (isAsync === false) {
        callback();
      }
    },
    fetchData: function fetchData(urlObj) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var doProcess = arguments.length <= 2 || arguments[2] === undefined ? function (theData) {
        console.warn("获取到数据但是未处理：", theData);
      } : arguments[2];
      var onCatch = arguments.length <= 3 || arguments[3] === undefined ? function (e) {
        console.warn("服务器或接口返回出错或数据处理过程中出错，参考：", e);
      } : arguments[3];

      var tokenID = "yourTokenID";
      tokenID = "4A79B7D419E2431DC7749AF107F0BA0F"; //for test
      data = Object.assign({}, urlObj.hasOwnProperty("defaultData") ? urlObj.defaultData : {}, {
        "tokenID": tokenID
      }, data); //合并
      //console.log("fetchData url data:", urlObj.url, JSON.stringify(data))
      fetch(urlObj.url + "?tokenID=" + tokenID, {
        method: "POST",
        body: JSON.stringify(data) //type:1 新增用户；2 启动次数; day:1今日；2 昨日；
      }).then(function (res) {

        return res.json();
      }).then(function (theData) {
        //console.log("fetchData theData", theData);
        if (theData.rc === "400") {
          //需要确认是否是400标示权限有更新
          // hashHistory.push("/login");
          _antd.message.info("验证您的权限设置有更新，请重新登陆", 10);
          return false;
        } else if (theData.rc == "405") {
          // hashHistory.push("/login");
          _antd.message.info("验证登录超时请重新登陆", 10);
          return false;
        } else {
          doProcess(theData);
        }
      }).catch(function (e) {
        onCatch(e);
        // console.warn("注意此接口没有正式给出，数据用的假数据待删除！", urlObj.url);
        // doProcess(urlObj.testData);//测试用，待删除
      });
    }
  }
};