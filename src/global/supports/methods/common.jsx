/**
 * Created by lizhen on 4/7/2016.
 */
import { message } from 'antd';
// import { hashHistory } from 'react-router'
import forIn from 'lodash/forIn';
const commonFun = {
  test: function(a) {
    alert(a);
  },
  getChannelInfo:function(SourceData,power,type){
    let paths=power.split(".");
    // console.log("powers",paths);
    let true_data=[];
    forIn(SourceData,function(item,key){

      if(key==paths[0]){


        forIn(item,function(items,keys){
            // console.log("xxxxx333",items,keys);
          if(keys==paths[1]){
              // console.log("111222",items,keys);
            forIn(items,function(itm,ky){

              if(ky==paths[2]){
                  // console.log("xxxxx11",itm,ky);
                forIn(itm.objList,function(trueInfo){

                  if(parseInt(trueInfo.type)==type){
                    true_data=trueInfo;
                  }
                });
              }
            })
          }
        })
      }
    });
    // console.log("true_data",true_data);
    let city_id=0;
    let channel_id=true_data.data[0];
    if(channel_id.city){
      city_id=channel_id.city[0];
    }

    return {channel_id:channel_id,city_id:city_id}
  },

  retNewsColor:(info)=>{
    let text=parseInt(info)
    let str="";
    switch (text) {
      case 1:
        str="normal_news"
        break;
      case 2:
        str="img_news"
        break;
      case 3:
        str="video_news"
        break;
      case 4:
        str="subject_news"
        break;
      case 5:
        str="live_news"
        break;
      case 6:
        str="active_news"
        break;
      case 7:
      case 100:
        str="girl_news"
        break;
      case 8:
        str="live_news"
        break;
      case 10:
        str="live_video_news"
        break;
    }
    return str;
  },
  retNewsType:(info)=>{
    let text=parseInt(info)

    let str="";
    switch (text) {
      case 1:
        str="普通"
        break;
      case 2:
        str="图集"
        break;
      case 3:
        str="视频"
        break;
      case 4:
        str="专题"
        break;
      case 5:
        str="产品"
        break;
      case 6:
        str="活动"
        break;
      case 7:
      case 100:
        str="美女"
        break;
      case 8:
        str="图文直播"
        break;
      case 10:
        str="视频直播"
        break;
    }
    return str;
  },
  channel_city:{
    getchannelCtiy:function(data){
      let to_channel=[];
      data&&data.length&&data.map((item)=>{
        let temp={channel_id:item.key};
        if(item.cityList){
          let city_id=[];
          (item.cityList.map((items)=>{
            // console.log("1:",items.key);
            let testKey=items.key;
            city_id.push(testKey);
            // return testKey;
          }));
          // console.log("2:",city_id);
          temp.city_id=city_id;
        }
        to_channel.push(temp);
      })
      return to_channel;

    },
    author_list:function(obj){
      let author=obj;
      let authorData=""
      author.map((item,i)=>{
        authorData+=(item.key)+","
      });
     return authorData=authorData.substr(authorData,authorData.length-1);
    }
  },
  Validation: {
    isTelephone: function(str) {
      if (str.match(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/) == null) {
        return false;
      } else {
        return true;
      }
    },
    isMobilePhoneNumber: function(objStr) {
      var telReg = !!objStr.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
      return telReg;
    },
    isEmail: function(str) {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      return reg.test(str);
    },
    isIP: function(str) {
      var arg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (str.match(arg) == null) {
        return false;
      }
      return true;
    },
    isURL: function(str) {
      var regexp = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
      return regexp.test(str);
    },
    isQQ: function() {
      var myReg = /^[1-9]\d{4,10}$/;
      if (myReg.test(this)) return true;
      return false;
    },
    isHexColor: function() {
      var s = arguments[0] ? arguments[0] : "";
      s = s.Trim();
      if (s.length != 7) return false;
      return s.search(/\#[a-fA-F0-9]{6}/) != -1;
    },
    hasEscape: function(str) {
      //是否具有特殊字符
      var items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
      items.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
      items.push("admin", "administrators", "administrator", " 管理员 ", " 系统管理员 ");
      items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
      str = str.toLowerCase();
      for (var i = 0; i < items.length; i++) {
        if (str.indexOf(items[i]) >= 0) {
          return true;
        }
      }
      return false;
    },
    hasChineseChar(str) {
      if (escape(str).indexOf("%u") != -1) {
        return true;
      }
      return false;
    },
    isDate: function() {
      const value = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      if (value == null) {
        return false;
      } else {
        const date = new Date(value[1], value[3] - 1, value[4]);
        return (date.getFullYear() == value[1] && (date.getMonth() + 1) == value[3] && date.getDate() == value[4]);
      }
    },
    isTime: function() {
      var value = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/)
      if (value == null) {
        return false;
      } else {
        if (value[1] > 24 || value[3] > 60 || value[4] > 60) {
          return false
        }
        return true;
      }
    },
    isDateTime: function() {
      var value = str.match(/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/);
      if (value == null) {
        return false;
      }
      return true;
    },
    isImgURL: function() {
      var myReg = /^\.(jpeg|jpg|gif|png|webp)$/;
      if (myReg.test(this)) return true;
      return false;
    },
    isWebImgURL: function(str) {
      var myReg = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+=]*)*(\.(jpeg|jpg|gif|png|webp))$/i;
      if (myReg.test(str))
        return true;
      return false;
    },
    isWebVideoURL: function(str) {
      var myReg = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+=]*)*(\.mp4)$/i;
      if (myReg.test(str))
        return true;
      return false;
    },
    isWebAudioURL: function(str) {
      var myReg = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+=]*)*(\.(mp3))$/i;
      if (myReg.test(str))
        return true;
      return false;
    },
    isWebFileURL: function(str,fileType) {
      console.log("thisInIsWebFileURL",this);
      let that=this;
      switch (fileType) {
        case "image":
          return that.isWebImgURL(str);
          break;
        case "video":
          return that.isWebVideoURL(str);
          break;
        case "audio":
          return that.isWebAudioURL(str);
          break;
        default:
          return false;
      }
    },
  },
  Datetime: {
    getTimeStamp: function(D) {
      if (!!D == true) {
        if (typeof D == "string") {
          D=D.replace("-","/");//兼容safari
        }
        var theDate = new Date(D);
      } else {
        var theDate = new Date();
      }
      return theDate.getTime();
    },
    yyyymmdd: function(D) {
      if (!!D == true) {
        if (typeof D == "string") {
          D=D.replace("-","/");//兼容safari
        }
        var theDate = new Date(D);
      } else {
        var theDate = new Date();
      }
      const yyyy = theDate.getFullYear();
      const mm = theDate.getMonth() < 9 ? "0" + (theDate.getMonth() + 1) : (theDate.getMonth() + 1); // getMonth() is zero-based
      const dd = theDate.getDate() < 10 ? "0" + theDate.getDate() : theDate.getDate();
      return "".concat(yyyy).concat("-").concat(mm).concat("-").concat(dd);
    },
    yyyymmddhhmm: function(D) {
      if (!!D == true) {
        if (typeof D == "string") {
          D=D.replace("-","/");//兼容safari
        }
        var theDate = new Date(D);
      } else {
        var theDate = new Date();
      }
      const yyyy = theDate.getFullYear();
      const mm = theDate.getMonth() < 9 ? "0" + (theDate.getMonth() + 1) : (theDate.getMonth() + 1); // getMonth() is zero-based
      const dd = theDate.getDate() < 10 ? "0" + theDate.getDate() : theDate.getDate();
      const hh = theDate.getHours() < 10 ? "0" + theDate.getHours() : theDate.getHours();
      const min = theDate.getMinutes() < 10 ? "0" + theDate.getMinutes() : theDate.getMinutes();
      return "".concat(yyyy).concat("-").concat(mm).concat("-").concat(dd).concat(" ").concat(hh).concat(":").concat(min);
    },
    yyyymmddhhmmss: function(D) {
      if (!!D == true) {
        if (typeof D == "string") {
          D=D.replace("-","/");//兼容safari
        }
        var theDate = new Date(D);
      } else {
        var theDate = new Date();
      }
      const yyyy = theDate.getFullYear();
      const mm = theDate.getMonth() < 9 ? "0" + (theDate.getMonth() + 1) : (theDate.getMonth() + 1); // getMonth() is zero-based
      const dd = theDate.getDate() < 10 ? "0" + theDate.getDate() : theDate.getDate();
      const hh = theDate.getHours() < 10 ? "0" + theDate.getHours() : theDate.getHours();
      const min = theDate.getMinutes() < 10 ? "0" + theDate.getMinutes() : theDate.getMinutes();
      const ss = theDate.getSeconds() < 10 ? "0" + theDate.getSeconds() : theDate.getSeconds();
      return "".concat(yyyy).concat("-").concat(mm).concat("-").concat(dd).concat(" ").concat(hh).concat(":").concat(min).concat(":").concat(ss);
    },
    yyyymmddhhmmss1: function(D) {
      if (!!D == true) {
        if (typeof D == "string") {
          D=D.replace("-","/");//兼容safari
        }
        var theDate = new Date(D);
      } else {
        var theDate = new Date();
      }
      const yyyy = theDate.getFullYear();
      const mm = theDate.getMonth() < 9 ? "0" + (theDate.getMonth() + 1) : (theDate.getMonth() + 1); // getMonth() is zero-based
      const dd = theDate.getDate() < 10 ? "0" + theDate.getDate() : theDate.getDate();
      const hh = theDate.getHours() < 10 ? "0" + theDate.getHours() : theDate.getHours();
      const min = theDate.getMinutes() < 10 ? "0" + theDate.getMinutes() : theDate.getMinutes();
      const ss = theDate.getSeconds() < 10 ? "0" + theDate.getSeconds() : theDate.getSeconds();
      return "".concat(yyyy).concat("/").concat(mm).concat("/").concat(dd).concat(" ").concat(hh).concat(":").concat(min).concat(":").concat(ss);
    },
    mmddhhmm: function(D) {
      if (!!D == true) {
        if (typeof D == "string") {
          D=D.replace("-","/");//兼容safari
        }
        var theDate = new Date(D);
      } else {
        var theDate = new Date();
      }
      const mm = theDate.getMonth() < 9 ? "0" + (theDate.getMonth() + 1) : (theDate.getMonth() + 1); // getMonth() is zero-based
      const dd = theDate.getDate() < 10 ? "0" + theDate.getDate() : theDate.getDate();
      const hh = theDate.getHours() < 10 ? "0" + theDate.getHours() : theDate.getHours();
      const min = theDate.getMinutes() < 10 ? "0" + theDate.getMinutes() : theDate.getMinutes();
      return "".concat(mm).concat("-").concat(dd).concat(" ").concat(hh).concat(":").concat(min);
    }
  },
  Url: {
    getAbsoluteUrl: function() {
      //getAbsoluteUrl('/something'); // https://davidwalsh.name/something
      var a;
      return function(url) {
        if (!a)
          a = document.createElement('a');
        a.href = url;

        return a.href;
      };
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    getParamByReverseUrlIndex: function(i) {
      //依据倒序获取分段地址的参数
      i = i || 0;
      var p = null;
      var href = window.location.href;
      var url = href.substring(href.lastIndexOf("http://") + 7, href.lastIndexOf("/") || href.lastIndexOf("/?"));
      url = url.split("/");
      url.reverse();
      for (var j = 0; j < url.length; j++) {
        if (!!url[j] == false && url[j] != 0) {
          url.splice(j, 1);
        // 删除空字段
        }
      }
      if (url.length < 2) {
        return null;
      }
      p = url[i];
      return p;
    },
    escapeAllUnicode: function(text) {
      /*Using escape() should work with the character code range 0x00 to 0xFF (UTF-8 range).
       If you go beyond 0xFF (255), such as 0x100 (256) then escape() will not work:*/
      text.replace(/[\u00A0-\u2666]/g, function(c) {
        return '&#' + c.charCodeAt(0) + ';';
      });
    },
    retResult: function(data, path) {
      if (data.rc == 0) {
        message.success("操作成功", 4);
      } else {
        message.error("操作失败:" + data.des, 4);
      }
      // hashHistory.push(path);
    }
  },
  Array: {
    inArray: function(arr, value) {
      for (var i = 0; i < arr.length; i++)
        if (arr[i] === value) {
          return true;
      }
      return false;
    },
    swapItems: function(arr, index1, index2) {
      //交换两个元素在数组中
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    moveItemToNew: function(array, oldIndex, newIndex) {
      //移动数组元素到新位置
      if (oldIndex < newIndex) {
        for (var i = oldIndex; i < newIndex; i++) {
          array = this.swapItems(array, i, i + 1);
        }
      } else if (oldIndex > newIndex) {
        for (var i = oldIndex; i > newIndex; i--) {

          array = this.swapItems(array, i, i - 1);
        }
      }
      return array;
    },
    removeValueItem: function(arrayObj, deleteValue) {
      for (var i = 0; i < arrayObj.length; i++) {
        if (arrayObj[i] == deleteValue) {
          arrayObj.splice(i, 1);
          i--;
        }
      }
      return arrayObj;
    },
    cleanArray: function(actual) {
      var newArray = new Array();
      for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
          newArray.push(actual[i]);
        }
      }
      return newArray;
    },
    removeFalseyValues: function(arrayObj) {
      return arrayObj.filter(Boolean);
    },
    removeByIndex: function(arrayObj, i) {
      var newArr = arrayObj.splice(i, 1);
      return newArr;
    },
    merge: function(arr1, arr2) {
      //merge( [1, 2, 3], [101, 2, 1, 10]);
      //return [1,2,3,101,10]
      return arr1.concat(arr2.filter(function(item) {
        return arr1.indexOf(item) < 0;
      }));
    },
    mergeDedupe: function(arr) {
      // Input: [ [1, 2, 3], [101, 2, 1, 10], [2, 1] ]
      // Output: [1, 2, 3, 101, 10]
      return [...new Set([].concat(...arr))];
    },
    onlyIn1st: function(a, b) {
      //查找a数组有，b数组中没有的所有项目
      var onlyInA = a.filter(current => {
        return b.filter(current_b => {
            return current_b == current
          }).length == 0;
      });
      return onlyInA;
    },
    onlyIn2nd: function(a, b) {
      //查找b数组有，a数组中没有的所有项目
      var onlyInB = b.filter(current => {
        return a.filter(current_a => {
            return current_a == current
          }).length == 0;
      });
      return onlyInB;
    },
    differenceALL: function(a, b) {
      //查找两个数组中彼此没有的所有项目
      var onlyInA = this.onlyIn1st(a, b);
      var onlyInB = this.onlyIn2nd(a, b);
      return onlyInA.concat(onlyInB);
    },
    DeleteNull: function(formData) {
      //清除数组中元素值为空的项.
      for (let item in formData) {
        if (!formData[item]) {
          delete formData[item];
        }
      }
    }
  },
  String: {
    entityTable: {
      34: 'quot',
      38: 'amp',
      39: 'apos',
      60: 'lt',
      62: 'gt',
      160: 'nbsp',
      161: 'iexcl',
      162: 'cent',
      163: 'pound',
      164: 'curren',
      165: 'yen',
      166: 'brvbar',
      167: 'sect',
      168: 'uml',
      169: 'copy',
      170: 'ordf',
      171: 'laquo',
      172: 'not',
      173: 'shy',
      174: 'reg',
      175: 'macr',
      176: 'deg',
      177: 'plusmn',
      178: 'sup2',
      179: 'sup3',
      180: 'acute',
      181: 'micro',
      182: 'para',
      183: 'middot',
      184: 'cedil',
      185: 'sup1',
      186: 'ordm',
      187: 'raquo',
      188: 'frac14',
      189: 'frac12',
      190: 'frac34',
      191: 'iquest',
      192: 'Agrave',
      193: 'Aacute',
      194: 'Acirc',
      195: 'Atilde',
      196: 'Auml',
      197: 'Aring',
      198: 'AElig',
      199: 'Ccedil',
      200: 'Egrave',
      201: 'Eacute',
      202: 'Ecirc',
      203: 'Euml',
      204: 'Igrave',
      205: 'Iacute',
      206: 'Icirc',
      207: 'Iuml',
      208: 'ETH',
      209: 'Ntilde',
      210: 'Ograve',
      211: 'Oacute',
      212: 'Ocirc',
      213: 'Otilde',
      214: 'Ouml',
      215: 'times',
      216: 'Oslash',
      217: 'Ugrave',
      218: 'Uacute',
      219: 'Ucirc',
      220: 'Uuml',
      221: 'Yacute',
      222: 'THORN',
      223: 'szlig',
      224: 'agrave',
      225: 'aacute',
      226: 'acirc',
      227: 'atilde',
      228: 'auml',
      229: 'aring',
      230: 'aelig',
      231: 'ccedil',
      232: 'egrave',
      233: 'eacute',
      234: 'ecirc',
      235: 'euml',
      236: 'igrave',
      237: 'iacute',
      238: 'icirc',
      239: 'iuml',
      240: 'eth',
      241: 'ntilde',
      242: 'ograve',
      243: 'oacute',
      244: 'ocirc',
      245: 'otilde',
      246: 'ouml',
      247: 'divide',
      248: 'oslash',
      249: 'ugrave',
      250: 'uacute',
      251: 'ucirc',
      252: 'uuml',
      253: 'yacute',
      254: 'thorn',
      255: 'yuml',
      402: 'fnof',
      913: 'Alpha',
      914: 'Beta',
      915: 'Gamma',
      916: 'Delta',
      917: 'Epsilon',
      918: 'Zeta',
      919: 'Eta',
      920: 'Theta',
      921: 'Iota',
      922: 'Kappa',
      923: 'Lambda',
      924: 'Mu',
      925: 'Nu',
      926: 'Xi',
      927: 'Omicron',
      928: 'Pi',
      929: 'Rho',
      931: 'Sigma',
      932: 'Tau',
      933: 'Upsilon',
      934: 'Phi',
      935: 'Chi',
      936: 'Psi',
      937: 'Omega',
      945: 'alpha',
      946: 'beta',
      947: 'gamma',
      948: 'delta',
      949: 'epsilon',
      950: 'zeta',
      951: 'eta',
      952: 'theta',
      953: 'iota',
      954: 'kappa',
      955: 'lambda',
      956: 'mu',
      957: 'nu',
      958: 'xi',
      959: 'omicron',
      960: 'pi',
      961: 'rho',
      962: 'sigmaf',
      963: 'sigma',
      964: 'tau',
      965: 'upsilon',
      966: 'phi',
      967: 'chi',
      968: 'psi',
      969: 'omega',
      977: 'thetasym',
      978: 'upsih',
      982: 'piv',
      8226: 'bull',
      8230: 'hellip',
      8242: 'prime',
      8243: 'Prime',
      8254: 'oline',
      8260: 'frasl',
      8472: 'weierp',
      8465: 'image',
      8476: 'real',
      8482: 'trade',
      8501: 'alefsym',
      8592: 'larr',
      8593: 'uarr',
      8594: 'rarr',
      8595: 'darr',
      8596: 'harr',
      8629: 'crarr',
      8656: 'lArr',
      8657: 'uArr',
      8658: 'rArr',
      8659: 'dArr',
      8660: 'hArr',
      8704: 'forall',
      8706: 'part',
      8707: 'exist',
      8709: 'empty',
      8711: 'nabla',
      8712: 'isin',
      8713: 'notin',
      8715: 'ni',
      8719: 'prod',
      8721: 'sum',
      8722: 'minus',
      8727: 'lowast',
      8730: 'radic',
      8733: 'prop',
      8734: 'infin',
      8736: 'ang',
      8743: 'and',
      8744: 'or',
      8745: 'cap',
      8746: 'cup',
      8747: 'int',
      8756: 'there4',
      8764: 'sim',
      8773: 'cong',
      8776: 'asymp',
      8800: 'ne',
      8801: 'equiv',
      8804: 'le',
      8805: 'ge',
      8834: 'sub',
      8835: 'sup',
      8836: 'nsub',
      8838: 'sube',
      8839: 'supe',
      8853: 'oplus',
      8855: 'otimes',
      8869: 'perp',
      8901: 'sdot',
      8968: 'lceil',
      8969: 'rceil',
      8970: 'lfloor',
      8971: 'rfloor',
      9001: 'lang',
      9002: 'rang',
      9674: 'loz',
      9824: 'spades',
      9827: 'clubs',
      9829: 'hearts',
      9830: 'diams',
      338: 'OElig',
      339: 'oelig',
      352: 'Scaron',
      353: 'scaron',
      376: 'Yuml',
      710: 'circ',
      732: 'tilde',
      8194: 'ensp',
      8195: 'emsp',
      8201: 'thinsp',
      8204: 'zwnj',
      8205: 'zwj',
      8206: 'lrm',
      8207: 'rlm',
      8211: 'ndash',
      8212: 'mdash',
      8216: 'lsquo',
      8217: 'rsquo',
      8218: 'sbquo',
      8220: 'ldquo',
      8221: 'rdquo',
      8222: 'bdquo',
      8224: 'dagger',
      8225: 'Dagger',
      8240: 'permil',
      8249: 'lsaquo',
      8250: 'rsaquo',
      8364: 'euro'
    },
    escapeHtmlEntities: function(text) {
      return text.replace(/[\u00A0-\u2666<>\&]/g, function(c) {
        return '&' +
          (this.entityTable[c.charCodeAt(0)] || '#' + c.charCodeAt(0)) + ';';
      });
    },
    RndNum: function(n) {
      var rnd = "";
      for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
      return rnd;
    },
    GetFileExtensionName:function(filename){
      return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined
    },
    isNumeric: function(string) {
      //是否数字
      return !isNaN(parseFloat(string)) && isFinite(string);
    },
    getAbsoluteLength: function(str) {
      //获取字节长度
      var sTmpStr,
        sTmpChar;
      var nOriginLen = 0;
      var nStrLength = 0;
      sTmpStr = new String(str);
      nOriginLen = sTmpStr.length;
      for (var i = 0; i < nOriginLen; i++) {
        sTmpChar = sTmpStr.charAt(i);
        if (escape(sTmpChar).length > 4) {
          nStrLength += 2;
        } else if (sTmpChar != '\r') {
          nStrLength++;
        }
      }
      return nStrLength;
    },
    trimText: function(str) {
      //截取头尾空格
      // Make sure we trim BOM and NBSP
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    },
    trim: function(str) {
      return str.replace(/^\s+|\s+$/g, '');
    },

    ltrim: function(str) {
      return str.replace(/^\s+/, '');
    },

    rtrim: function(str) {
      return str.replace(/\s+$/, '');
    },

    fulltrim: function(str) {
      return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
    },
    convertToThousands: function(money) {
      //千分位
      var s = money; // 获取小数型数据
      s += "";
      if (s.indexOf(".") == -1)
        s += ".00"; // 如果没有小数点，在后面补个小数点和 00
      if (/\.\d$/.test(s))
        s += "0"; // 正则判断
      while (/\d{4}(\.|,)/.test(s)) // 符合条件则进行替换
      s = s.replace(/(\d)(\d{3}(\.|,))/, "$1,$2"); // 每隔 3 位添加一个
      return s;
    },
    convertToCurrency: function() {
      //货币转换
      if (/[^0-9\.\-]/.test(s)) return "invalid value";
      s = s.replace(/^(\d*)$/, "$1.");
      s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
      s = s.replace(".", ",");
      var re = /(\d)(\d{3},)/;
      while (re.test(s))
      s = s.replace(re, "$1,$2");
      s = s.replace(/,(\d\d)$/, ".$1");
      return s.replace(/^\./, "0.")
    },
    getNowTimeCode: function() {
      //获取时间戳
      var Result = "";
      var now = new Date();
      var year = now.getYear();
      if (now.getYear() < 1900) {
        year = now.getYear() + 1900;
      }
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var minutes = now.getMinutes();
      var second = now.getSeconds();
      var millisecond = now.getMilliseconds();
      if (month < 10)
        month = "0" + month;
      if (day < 10)
        day = "0" + day;
      if (hour < 10)
        hour = "0" + hour;
      if (minutes < 10)
        minutes = "0" + minutes;
      if (second < 10)
        second = "0" + second;
      if (millisecond < 10)
        millisecond = "00" + millisecond;
      else {
        if (millisecond < 100) {
          millisecond = "0" + millisecond;
        }
      }
      Result = year.toString() + month.toString() + day.toString() + hour.toString() + minutes.toString() + second.toString() + millisecond.toString();
      return Result;
    }
  },
  obj: {
    //获取数组key
    refsKeyTo: function(obj, propName) {
      //给数组中每个对象添加key值，存在propName指定的属性时直接映射，否则按照propName生成
      //refsKeyTo([{a:1,id:0},{a:2,id:1}],"id") => [{a:1,id:0,key:"0"},{a:2,id:1,key:"1"}]
      //refsKeyTo([{a:1,id:0},{a:2,id:1}],"") => [{a:1,id:0,key:"456745685689567324"},{a:2,id:1,key:"34123412352566"}]
      //refsKeyTo([{a:1,id:0},{a:2,id:1}],"uid") => [{a:1,id:0,uid:"456745685689567324"},{a:2,id:1,uid:"34123412352566"}]
      //console.log(obj);
      if (!obj) {
        return false;
      }
      obj.map((item, i) => {
        Object.assign(item,
          (() => {
            let newkey=commonFun.String.RndNum(20);
            if (!!item[propName] || !propName) {
              return {
                key: !!propName ? item[propName] : (newkey+"")
              }
            } else {
              return eval("({" + propName + ":'" + newkey + "'})")
            }
          })()
        );
      })
    },
    removeFalseEntity: function(obj) {
      //判断数组中的对象
      if (!!obj && !(Object.keys(obj).length === 0 && obj.constructor === Object)) {
        Object.keys(obj).map((item) => {
          //  console.log("obj[item] ",obj[item] );
          if (typeof obj[item] === "object") {
            return this.removeFalseEntity(obj[item]);
          } else if (!obj[item]) {
            //   console.log("obj[item] !");
            delete obj.item;
          }
        })
      }
      //console.log("removeFalseEnties", obj);
      return obj;
    },
    stringifyPropsDeeply: function(obj) {
      //数值加""
      if (!!obj && !(Object.keys(obj).length === 0 && obj.constructor === Object)) {
        Object.keys(obj).map((item) => {
          // console.log("item",item);
          if (typeof obj[item] === "object") {
            return this.stringifyPropsDeeply(obj[item]);
          } else if (!isNaN(parseFloat(obj[item])) && isFinite(obj[item])) {
            obj[item] = "" + obj[item];
          //   console.log("obj[item] ",obj[item] );
          }
        })
      }
      // console.log("stringifyPropsDeeply", obj);
      return obj;
    },
    isAllFieldValidated: function(obj) { /*判断对象是否都是空如果有一个为空就返回false*/
      var r = true;
      Object.keys(obj).map((item) => {
        if (!obj[item] && obj[item] !== 0) {
          r = false;
        }
      });
      return r;
    },
    isAllFieldValidatedTrue: function(obj) {
      //判断对象是否都是空，如果有一个不为空就返回false

      var r = false;
      Object.keys(obj).map((item) => {
        if (!!obj[item]) {
          if (r == false) {
            r = true;
          }
        }
      });
      return r;
    }
  //toEntries: function* (obj) {
  //    let propKeys = Reflect.ownKeys(obj);
  //
  //    for (let propKey of propKeys) {
  //        yield [propKey, obj[propKey]];
  //    }
  //}
  },
  browser: {
    detect: function() {
      // Chrome 1+
      var isChrome = !!window.chrome && !!window.chrome.webstore;
      if (!!isChrome) {
        return "chrome";
      }
      // Firefox 1.0+
      var isFirefox = typeof InstallTrigger !== 'undefined';
      if (!!isFirefox) {
        return "firefox";
      }
      // At least Safari 3+: "[object HTMLElementConstructor]"
      var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
      if (!!isSafari) {
        return "safari";
      }
      // Opera 8.0+
      var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
      if (!!isOpera) {
        return "opera";
      }
      // Internet Explorer 6-11
      var isIE = /*@cc_on!@*/ false || !!document.documentMode;
      if (!!isIE) {
        return "ie";
      }
      // Edge 20+
      var isEdge = !isIE && !!window.StyleMedia;
      if (!!isEdge) {
        return "edge";
      }
      // Blink engine detection
      var isBlink = (isChrome || isOpera) && !!window.CSS;
      if (!!isBlink) {
        return "blink";
      }
      return "none";
    }
  },
  console: {
    log: function(message) {
      //打印log
      var messageDiv = document.getElementById("messageDiv");
      if (!!messageDiv) {
        messageDiv.innerHTML = message + "<br />" + messageDiv.innerHTML;
      } else {
        let newEl = document.createElement('div');
        newEl.setAttribute('id', 'messageDiv');
        newEl.innerHTML = message;
        document.querySelector("body").appendChild(newEl);
        messageDiv = newEl;
      }
    }
  },
  localDB: {
    //暂时用localstorage实现，独立成函数以后上localDB的话容易实现
    setter: function(key, value, expiredTo) {
      //可以设置某数据的保存时限来保存key和value
      var suffix = "";
      if (!!expiredTo == true) {
        var theDate = new Date(expiredTo);
        window.localStorage.setItem(key, JSON.stringify({
          expiredTo: theDate,
          value: value
        }));
      } else {
        window.localStorage.setItem(key, JSON.stringify({
          value: value
        }));
      }
    //console.log(window.localStorage.getItem(key));
    },
    getter: function(key) {
      //根据key获取在有效期内的存储值
      var data = window.localStorage.getItem(key);
      data = JSON.parse(data);
      if (!data) {
        return "";
      } else if (Object.keys(data).hasOwnProperty("expiredTo")) {
        var expired = data.expiredTo;
        expired = new Date(expired);
        if (expired.getTime() > new Date().getTime()) {
          return data.value;
        } else {
          window.localStorage.removeItem(key);
          return "";
        }
      } else {
        return data.value;
      }
    },
    remove: function(key) {
      //根据key获取在有效期内的存储值
      var data = window.localStorage.removeItem(key);
      return !window.localStorage.getItem(key);
    }
  }
}
module.exports = commonFun;
