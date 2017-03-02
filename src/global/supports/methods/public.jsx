/**
 * Created by Administrator on 2016/5/5.
 * From Public function doing
 */
import {ajax as AJAX} from './Request';
import {QINIU_IMG_TOKEN_URL, QINIU_MANAGE_TOKEN_URL, QINIU_VIDEO_TOKEN_URL, QINIU_FILE_TOKEN_URL} from '../datas/url';
module.exports = {
    supportMime: {
        image: [
            "image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"
        ],
        video: ["video/mp4"],
        audio: ["audio/mp4", "audio/mp3", "audio/mpeg"]
    },
    makeGuid: function() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
            }
        return guid;
    },

    nowTime: function() {
        let time = Date.parse(new Date()) / 1000;
        return time;
    },

    checkQiniu: {

        checkQiniuImgToken: function(key) {

            let timestamp = Date.parse(new Date()) / 1000;
            let last_qiniu_token_time = localStorage.getItem("last_qiniu_token_time_" + key);
            let mark = false;

            if (last_qiniu_token_time) {
                if ((timestamp - last_qiniu_token_time) < 3500) {
                    //console.log("time not out ");
                    mark = true;
                }
            }
            let qiniu_token = "";
            if (localStorage.getItem("qiniu_" + key + "_token") && mark) {
                qiniu_token = localStorage.getItem("qiniu_" + key + "_token");
            }
            return qiniu_token;

        },
        returnToken: function(uploadConfig,key = 'image', params = {}) {
            let token = this.checkQiniuImgToken(key);
            token = !!token == true
                ? token
                : this.getQiniuToken(uploadConfig, key, params);
            return token;
        },
        getQiniuToken: function(uploadConfig,type = 'image', params) {
            //console.log("getQiniuToken");
            let token = "";
            let url;
            if (type == 'image') {
                url = uploadConfig.QINIU_IMG_TOKEN_URL;
            } else if (type == 'video') {
                url = uploadConfig.QINIU_VIDEO_TOKEN_URL;
            } else if (type == 'file') {
                url = uploadConfig.QINIU_FILE_TOKEN_URL;
            } else if (type == 'manage') {
                url = uploadConfig.QINIU_MANAGE_TOKEN_URL;
            } else {
                url = uploadConfig.QINIU_IMG_TOKEN_URL;
            }
            //console.log("token_url",url);
            AJAX.requestData({
                url: url,
                method: 'post',
                isAsync: true,
                defaultData: {}
            }, params, (data) => {
                //console.log(data); data = JSON.parse(data);
                token = data.uptoken;
                //console.log("token=", token);
                localStorage.setItem("qiniu_" + type + "_token", token);
                localStorage.setItem("last_qiniu_token_time_" + type, Date.parse(new Date()) / 1000);
            }, () => {
                //console.log("err:", err);
                return false;
            });
            return token;
        }
    }
}
