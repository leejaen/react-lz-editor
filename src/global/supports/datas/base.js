/**
 * Created by Administrator on 2016/5/20.
 */
module.exports = {
  Config: {
    version: "2.1.3 (Beta)",
    server : {
        // ajax: 'http://192.168.110.239:8082/qlwb/' //测试服务器
       ajax: 'http://114.55.148.57:8083/' //正式（公网）服务器
    },
    watermarkImage: [{
      type: "white_small",
      tip: "白色小图",
      value: "http://7xjl1j.com1.z0.glb.clouddn.com/white_small.png",
      valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS93aGl0ZV9zbWFsbC5wbmc="
    }, {
      type: "white_big",
      tip: "白色大图",
      value: "http://7xjl1j.com1.z0.glb.clouddn.com/white_big.png",
      valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS93aGl0ZV9iaWcucG5n"
    }, {
      type: "gray_small",
      tip: "灰色小图",
      value: "http://7xjl1j.com1.z0.glb.clouddn.com/gray_small.png",
      valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS9ncmF5X3NtYWxsLnBuZw=="
    }, {
      type: "gray_big",
      tip: "灰色大图",
      value: "http://7xjl1j.com1.z0.glb.clouddn.com/gray_big.png",
      valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS9ncmF5X2JpZy5wbmc="
    }, {
      type: "black_small",
      tip: "黑色小图",
      value: "http://7xjl1j.com1.z0.glb.clouddn.com/black_small.png",
      valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS9ibGFja19zbWFsbC5wbmc="
    }, {
      type: "black_big",
      tip: "黑色大图",
      value: "http://7xjl1j.com1.z0.glb.clouddn.com/black_big.png",
      valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS9ibGFja19iaWcucG5n"
    }]
  }
}
