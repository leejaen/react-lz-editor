'use strict';

var _Request = require('./Request');

var _url = require('../datas/url');

module.exports = {
    supportMime: {
        image: ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"],
        video: ["video/mp4"],
        audio: ["audio/mp4", "audio/mp3", "audio/mpeg"]
    },
    makeGuid: function makeGuid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
        }
        return guid;
    },

    nowTime: function nowTime() {
        var time = Date.parse(new Date()) / 1000;
        return time;
    },

    checkQiniu: {

        checkQiniuImgToken: function checkQiniuImgToken(key) {

            var timestamp = Date.parse(new Date()) / 1000;
            var last_qiniu_token_time = localStorage.getItem("last_qiniu_token_time_" + key);
            var mark = false;

            if (last_qiniu_token_time) {
                if (timestamp - last_qiniu_token_time < 3500) {
                    mark = true;
                }
            }
            var qiniu_token = "";
            if (localStorage.getItem("qiniu_" + key + "_token") && mark) {
                qiniu_token = localStorage.getItem("qiniu_" + key + "_token");
            }
            return qiniu_token;
        },
        returnToken: function returnToken(uploadConfig) {
            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image';
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var token = this.checkQiniuImgToken(key);
            token = !!token == true ? token : this.getQiniuToken(uploadConfig, key, params);
            return token;
        },
        getQiniuToken: function getQiniuToken(uploadConfig) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image';
            var params = arguments[2];

            var token = "";
            var url = void 0;
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

            _Request.ajax.requestData({
                url: url,
                method: 'post',
                isAsync: true,
                defaultData: {}
            }, params, function (data) {
                token = data.uptoken;

                localStorage.setItem("qiniu_" + type + "_token", token);
                localStorage.setItem("last_qiniu_token_time_" + type, Date.parse(new Date()) / 1000);
            }, function () {
                return false;
            });
            return token;
        }
    }
};