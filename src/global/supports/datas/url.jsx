/**
 * Created by lizhen on 4/27/2016.
 */
import PRO_BASE from './base.js';
module.exports = {
  QINIU_URL: "", //上传地址
  QINIU_IMG_TOKEN_URL:  "", //请求图片的token
  QINIU_PFOP: {
    url:  ""
  },
  QINIU_VIDEO_TOKEN_URL: "", //请求视频资源的token
  QINIU_FILE_TOKEN_URL: "", //请求热补丁资源的token
  QINIU_DOMAIN_IMG_URL: "", //图片的地址的前缀image.qlwbyidian.com
  QINIU_DOMAIN_VIDEO_URL: "", //视频地址的前缀image.qlwbyidian.com
  QINIU_DOMAIN_FILE_URL: "", //ALL文件地址的前缀

  activity_public: {
    visible: {
      //可见不可见
      url: PRO_BASE.Config.server.ajax + 'visible_set_status.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    get_checking_channels_cities: {
      //获取用户管理的频道和城市及其对应的状态
      url: PRO_BASE.Config.server.ajax + 'get_checking_channels_cities.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    set_checking_channels_cities: {
      //根据传过来的参数添加抽取
      url: PRO_BASE.Config.server.ajax + 'set_checking_channels_cities.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    get_multiple: {
      //获取混排列表
      url: PRO_BASE.Config.server.ajax + 'get_multiple.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    set_multiple: {
      //设置混排列表
      url: PRO_BASE.Config.server.ajax + 'set_multiple.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    clear_multiple: {
      //清除混排列表
      url: PRO_BASE.Config.server.ajax + 'clear_multiple.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    }

  },
  user: {
    login: {
      url: PRO_BASE.Config.server.ajax + 'userLogin.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    getCodeKey: {
      url: PRO_BASE.Config.server.ajax + 'get_captcha_key.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    }
  },
  newsradar:{
    rank:{
      getRankIntelligenceList:{
        url:PRO_BASE.Config.server.ajax + "getRankIntelligenceList.do",
      },
      modifyIntelligenceTopRank:{
        url:PRO_BASE.Config.server.ajax + "modifyIntelligenceTopRank.do"
      },
      clearorders:{
        url:PRO_BASE.Config.server.ajax + "updateIntelligenceInfoTopnumdefault.do",
      },
    },
    list:{
      url:PRO_BASE.Config.server.ajax + "queryIntelligence.do",
    },
    update_status:{
      url:PRO_BASE.Config.server.ajax + "updateIntelligenceStatus.do",
    },
    batch_deletes:{//批量删除
      url:PRO_BASE.Config.server.ajax + "batchUpdateIntelligenceStatus.do",
    },
    item_pass:{
      url:PRO_BASE.Config.server.ajax + "updateIntelligenceUseStatus.do",
    },
    batch_pass:{//批量审核
      url:PRO_BASE.Config.server.ajax + "batchUpdateIntelligenceUseStatus.do",
    },
    view_item:{
      url:PRO_BASE.Config.server.ajax + "previewIntelligence.do",
    },
    add:{//新增情报站 1.17
      url:PRO_BASE.Config.server.ajax + "insertIntelligence.do",
    },
    get:{
      url:PRO_BASE.Config.server.ajax + "selectIntelligenceById.do",
    },
    update:{
      url:PRO_BASE.Config.server.ajax + "updateIntelligence.do",
    },
    get_orders:{//排序 1.10
      url:PRO_BASE.Config.server.ajax + "getRankIntelligenceList.do",
    },
    amount:{
      url:PRO_BASE.Config.server.ajax + "selectIntelligenceCountByUseStatus.do",
    },

    report_newsradar:{//回复情报站
      url:PRO_BASE.Config.server.ajax + "updateIntelligenceReply.do",
    },

    newsradar_news:{//情报站关联新闻
      url:PRO_BASE.Config.server.ajax + "insertIntelligenceReplyNews.do",
    },

    report_list:{//评论列表
      url:PRO_BASE.Config.server.ajax + "selectIntelReplyPageByParam.do",
    },

    report_list_byid:{//某条情报的评论列表
      url:PRO_BASE.Config.server.ajax + "queryIntelligenceReplyByIntelligenceId.do",
    },
    report_batch_pass:{//情报站回复评论的批量审核通过 or 不过
      url:PRO_BASE.Config.server.ajax + "batchUpdateIntelReplyUseStatus.do",
    },
    report_batch_deletes:{//情报站回复评论的批量删除
      url:PRO_BASE.Config.server.ajax + "batchUpdateIntelReplyStatus.do",
    },
    report_item_pass:{
      url:PRO_BASE.Config.server.ajax + "updateIntelligenceReplyUseStatus.do",
    },
    report_item_deletes:{
      url:PRO_BASE.Config.server.ajax + "updateIntelReplyStatus.do",
    },

  },

  biguser:{//壹点号相关接口

    list:{//壹点号
      list:{url:PRO_BASE.Config.server.ajax + "queryAllChannelGeneralInfoList.do",},
      update_status:{url:PRO_BASE.Config.server.ajax + "updateChannelInfoStatus.do",},
      item:{url:PRO_BASE.Config.server.ajax + "preUpdateChannelGeneralInfo.do",},
      add:{url:PRO_BASE.Config.server.ajax + "addChannelGeneralInfo.do",},
      reset:{url:PRO_BASE.Config.server.ajax + "resetUserPwd.do",},//重置壹点号密码
      update:{url:PRO_BASE.Config.server.ajax + "updateChannelGeneralInfo.do",},
      hot_order:{url:PRO_BASE.Config.server.ajax + "getSubChannelHotList4Range.do",},
      change_hot_order:{url:PRO_BASE.Config.server.ajax + "getRankIntelligenceList.do",},
      fresh_order:{url:PRO_BASE.Config.server.ajax + "getSubChannelFreshList4Range.do",},
      set_fresh_order:{url:PRO_BASE.Config.server.ajax + "setFreshnumOrders.do",},
    },
    list_verifier:{//待审核的壹点号接口，类主任审核
      list:{url:PRO_BASE.Config.server.ajax + "selectChannelExamineListByParam.do",},
      change:{url:PRO_BASE.Config.server.ajax + "updateChannelExamineInfo.do",},
    },
    type:{//壹点号的类型
      list:{url:PRO_BASE.Config.server.ajax + "selectChannelTypePageByParam.do",},
      add:{url:PRO_BASE.Config.server.ajax + "insertChannelType.do",},
      update:{url:PRO_BASE.Config.server.ajax + "updateChannelType.do",},
      deletes:{url:PRO_BASE.Config.server.ajax + "deleteChannelType.do",},
      reset:{url:PRO_BASE.Config.server.ajax + "removeChannelType.do",},//恢复壹点号类型
      orders:{url:PRO_BASE.Config.server.ajax + "updateChannelTypeOrderNumById.do",},
      all:{url:PRO_BASE.Config.server.ajax + "selectChannelTypeList.do",},
    },
    news:{//壹点号新闻
      list:{url:PRO_BASE.Config.server.ajax + "queryAllSubChannelNewsList.do",},
      item:{url:PRO_BASE.Config.server.ajax + "getNewsInfoById4SubChannel.do",},
      update:{url:PRO_BASE.Config.server.ajax + "modifyNewsInfo4SubChannel.do",},
      chouqu:{url:PRO_BASE.Config.server.ajax + "drawSubChannelNews2OtherChannel.do",},
      deletes:{url:PRO_BASE.Config.server.ajax + "delNewsInfo4SubChannel.do",},
    },
    news_verifier:{//壹点号的主任审核
      list:{url:PRO_BASE.Config.server.ajax + "getAllSubChannelNewsList4Audit.do",},
      batch_pass:{url:PRO_BASE.Config.server.ajax + "batchAuditNewsInfo4SubChannel.do",},
    },
    grab:{//壹点号的抓取
      list:{url:PRO_BASE.Config.server.ajax + "getAllSpideNewsList.do",},
      update:{url:PRO_BASE.Config.server.ajax + "modifySpiderNewsInfo.do",},
      batch_pass:{url:PRO_BASE.Config.server.ajax + "batchDealSpiderSubChannelNews.do",},
    },
    comments:{//壹点号的评论相关
      list:{url:PRO_BASE.Config.server.ajax + "getAllSubChannelNewsCommentList.do",},
    }
  },
  activity: {
    add: {
      url: PRO_BASE.Config.server.ajax + 'activity_add.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    del: {
      url: PRO_BASE.Config.server.ajax + 'activity_delete.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    reset: {
      url: PRO_BASE.Config.server.ajax + 'activity_reset.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    save: {
      url: PRO_BASE.Config.server.ajax + 'activity_save.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    edit: {
      url: PRO_BASE.Config.server.ajax + 'activity_update.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    list: {
      url: PRO_BASE.Config.server.ajax + 'activity_list.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {
        pageIndex: 1,
        pageSize: 10
      }
    },
    activity_list_content: {
      //按照条件查找信息
      url: PRO_BASE.Config.server.ajax + 'activity_list_content.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    getActivityList_id: {
      //按照id查找信息
      url: PRO_BASE.Config.server.ajax + 'activity_list_id.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    get_activity_in_post: {
      //获取活动列表及其关联帖子的情况
      url: PRO_BASE.Config.server.ajax + 'get_activity_in_post.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    activity_get_star_list: {
      //获取可排序的帖子列表
      url: PRO_BASE.Config.server.ajax + 'activity_get_star_list.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    activity_star_list: {
      //设置列表顺序
      url: PRO_BASE.Config.server.ajax + 'activity_star_list.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    commodity_star_remove: {
      //从精选列表中移除
      url: PRO_BASE.Config.server.ajax + 'activity_remove_from_star.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    activity_list_detail: {
      //查看详情
      url: PRO_BASE.Config.server.ajax + 'activity_list_detail.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    }
  },
  commodity: { //商品列表
    add: {
      url: PRO_BASE.Config.server.ajax + 'commodity_add.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    edit: { //更新商品
      url: PRO_BASE.Config.server.ajax + 'commodity_update.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    detail: {
      url: PRO_BASE.Config.server.ajax + 'commodity_detail.do', //url
      authId: '', //控制权限
      method: 'post', //回调
    },
    list_detail: {
      //商品在列表页获取详情时返回的
      url: PRO_BASE.Config.server.ajax + 'commodity_list_detail.do', //url
      authId: '', //控制权限
      method: 'post', //回调
    },
    del: { //下架商品
      url: PRO_BASE.Config.server.ajax + 'commodity_del.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    list: { //商品列表
      url: PRO_BASE.Config.server.ajax + 'commodity_list.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {
        pageIndex: 1,
        pageSize: 10
      }
    },
    orders: {
      url: PRO_BASE.Config.server.ajax + 'commodity_order.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    business_list: { //商家列表
      url: PRO_BASE.Config.server.ajax + 'buiness_list.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {
        pageIndex: 1,
        pageSize: 10
      }
    },
    brand_list: {
      url: PRO_BASE.Config.server.ajax + 'brand_list.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {
        pageIndex: 1,
        pageSize: 10
      }
    },
    quanzi_list: {
      url: PRO_BASE.Config.server.ajax + 'quanzi_list.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {
        pageIndex: 1,
        pageSize: 10
      }
    },
    get_goods_in_post: {
      //按照id查找信息
      url: PRO_BASE.Config.server.ajax + 'get_goods_in_post.do', //url
      authId: '', //控制权限
      method: 'post', //回调
      defaultData: {}
    },
    down: {
      //下载地址  invoice_present.do  invoice_test.do
      url: PRO_BASE.Config.server.ajax + 'invoice_present.do', //url
    },
    save: {
      //保存草稿。
      url: PRO_BASE.Config.server.ajax + 'commodity_save.do',
      authId: '', //控制权限
      method: 'post', //回调
    },
    invoice_list: {
      //获取电子票列表
      url: PRO_BASE.Config.server.ajax + 'invoice_list.do',
      authId: '', //控制权限
      method: 'post', //回调
    },
    commodity_get_star_lists: {
      //获取可排序的商品列表
      url: PRO_BASE.Config.server.ajax + 'commodity_get_star_lists.do',
      authId: '', //控制权限
      method: 'post', //回调
    },
    commodity_set_list: {
      //商品设置顺序
      url: PRO_BASE.Config.server.ajax + 'commodity_set_list.do',
      authId: '', //控制权限
      method: 'post', //回调
    },
    commodity_star_remove: {
      //商品从顺序中移除
      url: PRO_BASE.Config.server.ajax + 'commodity_star_remove.do',
      authId: '', //控制权限
      method: 'post', //回调
    }
  }, //商品
  serial: {
    gallery: { //轮播图接口
      add: {
        url: PRO_BASE.Config.server.ajax + 'gallery_new.do', //url
        authId: '', //控制权限
        method: 'post', //回调
        defaultData: {
          status: 1
        }
      },
      edit: { //编辑后更新
        url: PRO_BASE.Config.server.ajax + 'gallery_update.do', //url
        authId: '', //控制权限
        method: 'post', //回调
        defaultData: {}
      },
      del: { //删除
        url: PRO_BASE.Config.server.ajax + 'gallery_delete.do', //url
        authId: '', //控制权限
        method: 'post', //回调
        defaultData: {}
      },
      gallery_get_list: { //返回轮播图列表
        url: PRO_BASE.Config.server.ajax + 'gallery_get_list.do', //url
        authId: '', //控制权限
        method: 'post', //回调
        defaultData: {
          pageIndex: 1,
          pageSize: 10
        }
      },
      gallery_get_details: { //获取某条轮播图详情
        url: PRO_BASE.Config.server.ajax + 'gallery_get_details.do', //url
        authId: '', //控制权限
        method: 'post', //回调
        defaultData: {}

      },
      orders: { //将设置好的顺序传递给后台
        url: PRO_BASE.Config.server.ajax + 'gallery_order_star.do', //url
        authId: '', //控制权限
        method: 'post', //回调
        defaultData: {}
      },
      gallery_set_status: { //设置状态
        url: PRO_BASE.Config.server.ajax + 'gallery_set_status.do', //url
        authId: '', //控制权限
        method: 'post', //回调
        defaultData: {}
      },
      gallery_filter_type_list: { //根据类型获取对应类别的列表
        url: PRO_BASE.Config.server.ajax + 'gallery_filter_type_list.do', //url
        authId: '', //控制权限
        method: 'post', //回调
        defaultData: {
          pageSize: 10,
          pageIndex: 1
        }
      },
      gallery_order_clear: { //清除已经排序的列表
        url: PRO_BASE.Config.server.ajax + 'gallery_order_clear.do', //url
        authId: '', //控制权限
        method: 'post', //回调
        defaultData: {}
      },
      gallery_get_order_list: { //获取可排序列表
        url: PRO_BASE.Config.server.ajax + 'gallery_get_order_list.do', //url
        authId: '', //控制权限
        method: 'post', //回调
        defaultData: {}
      }
    }, //奥运新闻
    olympic: {
      indentityCode: "1", //此innerId在数据库中由字典表设置成固定模式，奥运的被设置为1
      get_olympic_info: { //获取是否显示、链接地址
        url: PRO_BASE.Config.server.ajax + 'olympicurldetail.do', //url
        authId: '', //控制权限
      },
      set_is_show_info: { //设置是否显示奥运滚动列表
        url: PRO_BASE.Config.server.ajax + 'olympicnewsenter_ishow.do', //url
        authId: '', //控制权限
      },
      setOrderNum: { //设置是否显示奥运滚动列表
        url: PRO_BASE.Config.server.ajax + 'gallery_get_order_list.do', //url
        authId: '', //控制权限
      },
      get_news_list: {
        url: PRO_BASE.Config.server.ajax + 'querynews.do',
        authId: ""
      },
      get_an_item: { //获取一项新闻详细内容
        url: PRO_BASE.Config.server.ajax + 'olympicnewsdetail.do', //url
        authId: '', //控制权限
      },
      new_an_item: { //设置是否显示奥运滚动列表
        url: PRO_BASE.Config.server.ajax + 'newolympicnews.do', //url
        authId: '', //控制权限
      },
      update_an_item: { //设置是否显示奥运滚动列表
        url: PRO_BASE.Config.server.ajax + 'updateolympicnews.do', //url
        authId: '', //控制权限
      },
      update_refs_url: { //设置奥运模块链接地址
        url: PRO_BASE.Config.server.ajax + 'updateolympicurl.do', //url
        authId: '', //控制权限
      },
      get_item_list: { //获取奥运新闻列表
        url: PRO_BASE.Config.server.ajax + 'olympicnews_list.do', //url
        authId: '', //控制权限
      },
      del_an_item: { //删除奥运新闻
        url: PRO_BASE.Config.server.ajax + 'deleteolympicnews.do', //url
        authId: '', //控制权限
      },
      get_rank_list: { //获取排序列表
        url: PRO_BASE.Config.server.ajax + 'get_olympicnews_order.do', //url
        authId: '', //控制权限
      },
      save_rank_list: { //保存排序列表
        url: PRO_BASE.Config.server.ajax + 'olympicnews_order.do', //url
        authId: '', //控制权限
      },
      clear_rank_list: { //清空排序列表
        url: PRO_BASE.Config.server.ajax + 'clear_olympicnews_order.do', //url
        authId: '', //控制权限
      }
    }
  },
  public: {
    //热更新相关
    operation: { //3.5 热补丁接口定义
      queryhotfixes: { //3.5.1 查询热补丁列表协议
        url: PRO_BASE.Config.server.ajax + 'queryhotfixes.do',
        authId: ''
      },
      hotfixesdetail: { //3.5.2 热补丁详情协议
        url: PRO_BASE.Config.server.ajax + 'hotfixesdetail.do',
        authId: ''
      },
      newhotfixes: { //3.5.3 新增热补丁协议
        url: PRO_BASE.Config.server.ajax + 'newhotfixes.do',
        authId: ''
      },
      updatehotfixes: { //3.5.4 修改热补丁协议
        url: PRO_BASE.Config.server.ajax + 'updatehotfixes.do',
        authId: ''
      },
      deletehotfixes: { //3.5.5 删除热补丁协议
        url: PRO_BASE.Config.server.ajax + 'deletehotfixes.do',
        authId: ''
      }
    },
    sensitive: { //敏感词相关
      list: {
        url: PRO_BASE.Config.server.ajax + "querySensitiveWordPage.do"
      },
      add: {
        url: PRO_BASE.Config.server.ajax + "addSensitiveWord.do"
      },
      del_items: { //多条删除
        url: PRO_BASE.Config.server.ajax + "deleteSensitiveWordByIds.do"
      }
    },
    hot_words: { //热词列表
      list: {
        url: PRO_BASE.Config.server.ajax + "selectHotwordInfoPageByParam.do"
      },
      add: { //新增热词
        url: PRO_BASE.Config.server.ajax + "insertHotwordInfo.do"
      },
      del_hot: { //删除热词
        url: PRO_BASE.Config.server.ajax + "deleteHotwordInfo.do"
      },
      active_hot: { //启用禁用热词
        url: PRO_BASE.Config.server.ajax + "updateHotwordInfoStatus.do"
      },
      orders: { //排序
        url: PRO_BASE.Config.server.ajax + "updateHotwordInfoOrderNum.do"
      }
    },
    integral: { //积分管理
      list: { //积分列表
        url: PRO_BASE.Config.server.ajax + "pointsOperateList.do"
      },
      update: { //更新积分
        url: PRO_BASE.Config.server.ajax + "updateScorePointsOperate.do"
      }
    },
    info: { //站内消息
      list: {
        url: PRO_BASE.Config.server.ajax + "selectInternalMessageInfoPageByParam.do"
      },
      add: {
        url: PRO_BASE.Config.server.ajax + "insertInternalMessageInfo.do"
      },
      deletes: {
        url: PRO_BASE.Config.server.ajax + "deleteInternalMessageInfo.do"
      },
      change: {
        url: PRO_BASE.Config.server.ajax + "updateInternalMessageInfo.do"
      }
    },
    appuser: { //粉丝相关
      getUserList: {
        url: PRO_BASE.Config.server.ajax + "queryClientUserList.do"
      },
      updateAppUserStatus: { //修改粉丝状态
        url: PRO_BASE.Config.server.ajax + "dealClientUserStatus.do"
      },
      getPersonas: { //获取用户画像
        url: PRO_BASE.Config.server.ajax + "getClientUserPersonas.do"
      },
      getUserScoreLog: { //积分记录
        url: PRO_BASE.Config.server.ajax + "queryClientUserScoreHisList.do"
      },
      getUserInvitationLog: { //邀请记录
        url: PRO_BASE.Config.server.ajax + "queryClientUserInviteUserList.do"
      },
      downloadUserList: { //下载excel
        url: PRO_BASE.Config.server.ajax + "downloadClientUserListFile.do"
      },
      downloadUserInvitationList: { //下载excel,所有邀请的粉丝列表
        url: PRO_BASE.Config.server.ajax + "downloadClientUserInviteListFile.do"
      }
    },
    softupdate:{
      list:{
        url:PRO_BASE.Config.server.ajax + "selectAppUpdateInfoPageByParam.do"
      },
      add:{
        url:PRO_BASE.Config.server.ajax + "AppUpdateInfoEdit.do"
      },
      change:{
        url:PRO_BASE.Config.server.ajax + "updateAppUpdateInfoStatus.do"
      },
      deletes:{
        url:PRO_BASE.Config.server.ajax + "deleteAppUpdateInfo.do"
      },
      item:{
        url:PRO_BASE.Config.server.ajax + "selectAppUpdateInfoById.do"
      },

    }
  },
  circles: {
    circle: {
      add: {
        authId: '211', //控制权限
        url: PRO_BASE.Config.server.ajax + "circle_new.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "isVisible": 1
        }
      },
      delete: {
        authId: '212', //控制权限
        url: PRO_BASE.Config.server.ajax + "circle_delete.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      update: {
        authId: '213', //控制权限
        url: PRO_BASE.Config.server.ajax + "circle_update.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      details: {
        authId: '214', //控制权限
        url: PRO_BASE.Config.server.ajax + "circle_details.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_list: {
        authId: '215', //控制权限
        url: PRO_BASE.Config.server.ajax + "circle_get_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 10,
          "pageIndex": 1
        }
      },
      set_visible: {
        authId: '217', //控制权限
        url: PRO_BASE.Config.server.ajax + "circle_set_visiable.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      to_dicoveries: {
        authId: '218', //控制权限
        url: PRO_BASE.Config.server.ajax + "circle_to_dicoveries.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "limit": "40"
        }
      },
      // remove_form_discovery: {    authId: '219',//控制权限    url: PRO_BASE.Config.server.ajax + "circle_get_discoveries_list.do", method:
      // 'post',    isAsync: true,    defaultData: {} },
      save_dicoveries: {
        authId: '2110', //控制权限
        url: PRO_BASE.Config.server.ajax + "circle_order_dicoveries.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_discoveries: {
        authId: '2111', //控制权限
        url: PRO_BASE.Config.server.ajax + "circle_get_discoveries_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      clear_discoveries: {
        authId: '2112', //控制权限
        url: PRO_BASE.Config.server.ajax + "circle_empty_discoveries_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      }
    },
    post: {
      add: {
        authId: '221', //控制权限
        //url: PRO_BASE.Config.server.ajax + "post_new.do",
        url: PRO_BASE.Config.server.ajax + "post_new.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      delete: {
        authId: '222', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_delete.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      update: {
        authId: '224', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_update.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_detail: {
        authId: '225', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_get_details.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_list: {
        authId: '226', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_get_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 10,
          "pageIndex": 1
        }
      },
      filter_list: {
        authId: '226', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_filter_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 10,
          "pageIndex": 1
        }
      },
      update_report: {
        authId: '2210', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_get_report_count.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      save_stars: {
        authId: '2214', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_order_star.do",
        method: 'post',
        //contentType:"JSON",
        isAsync: true,
        defaultData: {}
      },
      get_stars: {
        authId: '2215', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_get_star_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 200,
          "pageIndex": 1
        }
      },
      clear_stars: {
        authId: '2216', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_empty_star_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      set_verify: {
        authId: '2217', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_handle_verify.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      set_refs: {
        authId: '2218', //控制权限
        url: PRO_BASE.Config.server.ajax + "ref_to_offline.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      }
    },
    comment: {
      add: {
        authId: '229', //控制权限
        url: PRO_BASE.Config.server.ajax + "comment_new.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      delete: {
        authId: '231', //控制权限
        url: PRO_BASE.Config.server.ajax + "comment_delete.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      update: {
        authId: '232', //控制权限
        url: PRO_BASE.Config.server.ajax + "comment_update.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      details: {
        authId: '233', //控制权限
        url: PRO_BASE.Config.server.ajax + "comment_get_details.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_list: {
        authId: '234', //控制权限
        url: PRO_BASE.Config.server.ajax + "comment_get_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 10,
          "pageIndex": 1
        }
      },
      filter_list: {
        authId: '234', //控制权限
        url: PRO_BASE.Config.server.ajax + "comment_filter_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 10,
          "pageIndex": 1
        }
      },
      update_verify: {
        authId: '236', //控制权限
        url: PRO_BASE.Config.server.ajax + "comment_set_verify.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      update_report: {
        authId: '237', //控制权限
        url: PRO_BASE.Config.server.ajax + "comment_set_report.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_verify_count: {
        authId: '237', //控制权限
        url: PRO_BASE.Config.server.ajax + "post_get_verify_count.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      }
    }
  },
  chart: {
    panorama: {
      tongji: {
        news_tongji: {
          list: {
            url: PRO_BASE.Config.server.ajax + "selectChannelListByParam.do"
          },
          out_excel: {
            url: PRO_BASE.Config.server.ajax + "exNewsListingExcel.do"
          }
        },
        click_tongji: {
          list: {
            url: PRO_BASE.Config.server.ajax + "selectNewsInfoStati.do"
          },
          out_excel: {
            url: PRO_BASE.Config.server.ajax + "exNewsInfoStatiExcel.do"
          }
        },
        getUserByDep: {
          url: PRO_BASE.Config.server.ajax + "userListForNewsListing.do"
        }
      },
      apps: {
        get_nearly_info: { //3.1.1 近日概况协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "stat_info_day.do"
        },
        get_app_summary: { //3.1.2 应用摘要协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "stat_info_summary.do"
        },
        get_activity_info: { //3.1.3 活跃概况协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "stat_info_active.do"
        },
        get_timezone_info: { //3.1.4 时段分析协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "stat_info_time.do"
        },
        get_app_top: { //3.1.5 TOP10协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "stat_info_top10.do"
        }
      },
      today: {
        get_today_info: { //3.2.1 今日概况协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "stat_today_day.do"
        },
        get_today_new: { //3.2.2 今日新增协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "stat_today_newreg.do"
        },
        get_today_details: { //3.2.3 今日明细协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "stat_today_newdetail.do"
        }
      },
      newboot: {
        get_user_summary: { //4.1.1 用户概况协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_reg_userinfo.do"
        },
        get_data_summary: { //4.1.2 数据摘要协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_reg_datainfo.do"
        },
        get_data_details: { //4.1.3 明细数据协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_reg_datadetail.do"
        }
      },
      active: {
        user_active_summary: { //活跃分析协议 4.2.1
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_active_info.do"
        },
        user_general_summary: { //概况协议4.2.2
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_active_summary.do"
        },
        user_active_detail_summary: { //活跃明细协议 4.2.3
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_active_detail.do"
        }
      },
      timespan: {
        get_analyzed_data: { //4.3.1 时段分析协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_time_info.do"
        },
        get_data_summary: { //4.3.2 数据摘要协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_time_summary.do"
        },
        get_data_details: { //4.1.3 明细数据协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_time_detail.do"
        }
      },
      version: {
        use_version_info: { //4.4.1 用户概况协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_version_info.do"
        },
        use_version_trend: { //4.4.2 版本趋势协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_version_trend.do"
        },
        use_version_detail: { //4.4.3 版本明细协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_version_detail.do"
        },
        get_version_id: { //4.4.4 版本号获取协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "get_version_id.do"
        }
      },
      device: {
        get_top10_data: { //4.5.1 TOP10机型协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_top10_info.do"
        },
        get_hot_summary: { //4.5.2 最热机型协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_top10_hot.do"
        },
        get_top10_details: { //4.5.3 机型明细数据协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "use_top10_detail.do"
        }
      },
      retained_user: {
        get_data_details: { //4.5.3 机型明细数据协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "retain_user_info.do"
        }
      },
      retained_device: {
        get_data_details: { //4.5.3 机型明细数据协议
          authId: '130',
          url: PRO_BASE.Config.server.ajax + "retain_device_info.do"
        }
      }
    }
  },
  channel: { //频道信息
    list: { //频道列表
      url: PRO_BASE.Config.server.ajax + "queryAllChannelBaseInfoList.do",
      // testData: fakeData.resumerNewsInfo
    },
    changestatus: { //更改状态
      url: PRO_BASE.Config.server.ajax + "updateChannelInfoStatus.do",
      // testData: fakeData.resumerNewsInfo
    },
    add: { //新增
      url: PRO_BASE.Config.server.ajax + "addChannelBaseInfo.do"
    },
    update: {
      url: PRO_BASE.Config.server.ajax + "updateChannelInfo.do"
    },
    item: { //获取详情
      url: PRO_BASE.Config.server.ajax + "preUpdateChannelInfo.do"
    },
    orders: { //排序
      url: PRO_BASE.Config.server.ajax + "updateChannelBaseInfoRecommend.do"
    },
    all: { //获取所有列表
      url: PRO_BASE.Config.server.ajax + "getAllChannels.do"
    }
  },
  appClient: {
    startPage: {
      getList: {
        url: PRO_BASE.Config.server.ajax + "queryOpenappimgList.do"
      },
      createItem: {
        url: PRO_BASE.Config.server.ajax + "addOpenappimg.do"
      },
      updateItem: {
        url: PRO_BASE.Config.server.ajax + "modifyOpenappimg.do"
      },
      getItemDetails: {
        url: PRO_BASE.Config.server.ajax + "getOpenappimgById.do"
      },
      updateItemStatus: {
        url: PRO_BASE.Config.server.ajax + "dealOpenappimgStatus.do"
      },
      getItemRefNews: {
        url: PRO_BASE.Config.server.ajax + "getNewsList4Openimg.do"
      },
      getItemRefGoods: {
        url: PRO_BASE.Config.server.ajax + "getProductList4Openimg.do"
      },
      getItemRefActivity: {
        url: PRO_BASE.Config.server.ajax + "getActiveList4Openimg.do"
      },
      getItemRefReport: {
        url: PRO_BASE.Config.server.ajax + "getIntelligenceList4Openimg.do"
      }
    }
  }
};
