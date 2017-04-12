/**
 * Created by Administrator on 2016/4/27.
 */
//import {PRO_URL} from 'datas/url.jsx';
import PRO_COMMON from './common';
import {message} from 'antd';
import 'whatwg-fetch' // 可以引入fetch来进行Ajax
module.exports = {
  ajax: {
    createXHR() {
      if (typeof XMLHttpRequest != "undefined") { // 非IE6浏览器
        return new XMLHttpRequest();
      } else if (typeof ActiveXObject != "undefined") { // IE6浏览器
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
    getParams(data) {
      var arr = [];
      for (var i in data) {
        let temp = data[i];
        if (temp == undefined || temp == null) { //|| temp == ""
          continue;
        }
        if (typeof temp == "object") {
          temp = JSON.stringify(temp);
          temp = encodeURIComponent(temp);
        }
        arr.push(encodeURIComponent(i) + "=" + temp);
      }
      return arr.join("&");
    },
    requestData(urlObj, data = {}, onSuccess = function() {
      //console.log("onSuccess");
    }, onError = function() {
      console.warn("！！！！！！！！！！服务器或接口返回出错！！！！！！！！！！");
    }, method = "post", isAsync = true) {
      data = Object.assign({}, urlObj.defaultData
        ? urlObj.defaultData
        : "", {
        "tokenID":"yourTokenID"
      // tokenID="0B5FDDF0FE0086FB0B23525B9C800DA8";//for test
      }, data); //合并
      data = PRO_COMMON.obj.removeFalseEntity(data); //手动转换数值成字符串型数据
      data = PRO_COMMON.obj.stringifyPropsDeeply(data); //手动转换数值成字符串型数据
      var content_type = "application/json";
      if (!!urlObj.contentType == false) {
        content_type = "application/x-www-form-urlencoded;charset=utf-8";
        data = this.getParams(data); // 转义字符串
      }
      method = method || urlObj.method;
      isAsync = isAsync || urlObj.isAsync;
      var callback = function() {
        // 判断是否返回正确
        if (xhr.status == 200) {
          if (!!onSuccess) {
            let data = null;
            try {
              data = JSON.parse(xhr.responseText);
            } catch (e) {
              message.error("数据返回出错，请通知技术部排查，参考原因：“" + e.toString() + "”；返回数据：“" + (xhr.responseText.length > 20
                ? xhr.responseText.substr(0, 20) + "……(详见控制台)"
                : xhr.responseText) + "”", 10);
              //console.log("错误返回数据xhr.responseText：“",xhr.responseText,"”");
              return false;
            }
            if (data.rc == "405") {
              // hashHistory.push("/login");
              message.info("验证登录超时请重新登陆", 10)
              return false;
            }
            onSuccess(data);
          }
        } else {
          if (!!onError) {
            onError();
          }
        }
      }

      var xhr = this.createXHR();
      if (method === "get") { // 判断使用的是否是get方式发送
        urlObj.url += urlObj.url.indexOf("?") == "-1"
          ? "?" + data
          : "&" + data;
      }

      // 异步
      if (isAsync === true) {
        // 异步的时候需要触发onreadystatechange事件
        xhr.onreadystatechange = function() {
          // 执行完成
          if (xhr.readyState == 4) {
            callback();
          }
        }
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
    fetchData(urlObj, data = {}, doProcess = (theData) => {
      console.warn("获取到数据但是未处理：", theData);
    }, onCatch = (e) => {
      console.warn("服务器或接口返回出错或数据处理过程中出错，参考：", e);
    }) {
      let tokenID = "yourTokenID";
      // tokenID="0B5FDDF0FE0086FB0B23525B9C800DA8";//for test
      data = Object.assign({}, urlObj.hasOwnProperty("defaultData")
        ? urlObj.defaultData
        : {}, {
        "tokenID": tokenID
      }, data); //合并
  //console.log("fetchData url data:", urlObj.url, JSON.stringify(data))
      fetch(urlObj.url + "?tokenID=" + tokenID, {
        method: "POST",
        body: JSON.stringify(data) //type:1 新增用户；2 启动次数; day:1今日；2 昨日；
      }).then((res) => {

        return res.json();
      }).then((theData) => {
    //console.log("fetchData theData", theData);
        if (theData.rc === "400") { //需要确认是否是400标示权限有更新
          // hashHistory.push("/login");
          message.info("验证您的权限设置有更新，请重新登陆", 10);
          return false;
        }else if (theData.rc == "405"){
          // hashHistory.push("/login");
          message.info("验证登录超时请重新登陆", 10)
          return false;
        } else {
          doProcess(theData);
        }
      }).catch((e) => {
        onCatch(e);
        // console.warn("注意此接口没有正式给出，数据用的假数据待删除！", urlObj.url);
        // doProcess(urlObj.testData);//测试用，待删除
      })
    }
  }
}
