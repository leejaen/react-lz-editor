/**
 * Created by lizhen on 4/14/2016.
 */
//import PRO_MENU from 'datas/menu';
//import PRO_RELEASE from 'datas/release';
//import PRO_URL from 'datas/url';
//import PRO_USER from 'datas/user';
//import PRO_DOM_HELPER from 'methods/domHelper';
//import PRO_REQUEST from 'methods/Request';
//import PRO_COMMON from 'methods/common';
//import PRO_QINIU from 'methods/public';
//module.exports = {PRO_RELEASE, PRO_MENU, PRO_URL, PRO_USER, PRO_DOM_HELPER, PRO_REQUEST, PRO_COMMON, PRO_QINIU};
module.exports = {
    PRO_BASE: require('./datas/base'),
    PRO_URL: require('./datas/url'),
    PRO_REQUEST: require('./methods/Request'),
    PRO_COMMON: require('./methods/common'),
    PRO_QINIU: require('./methods/public')
};
