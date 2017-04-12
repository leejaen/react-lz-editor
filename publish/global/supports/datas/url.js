"use strict";

var _base = require("./base.js");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  QINIU_URL: "",
  QINIU_IMG_TOKEN_URL: "",
  QINIU_PFOP: {
    url: ""
  },
  QINIU_VIDEO_TOKEN_URL: "",
  QINIU_FILE_TOKEN_URL: "",
  QINIU_IMG_DOMAIN_URL: "",
  QINIU_DOMAIN_VIDEO_URL: "",
  QINIU_DOMAIN_FILE_URL: "",

  activity_public: {
    visible: {
      url: _base2.default.Config.server.ajax + 'visible_set_status.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    get_checking_channels_cities: {
      url: _base2.default.Config.server.ajax + 'get_checking_channels_cities.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    set_checking_channels_cities: {
      url: _base2.default.Config.server.ajax + 'set_checking_channels_cities.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    get_multiple: {
      url: _base2.default.Config.server.ajax + 'get_multiple.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    set_multiple: {
      url: _base2.default.Config.server.ajax + 'set_multiple.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    clear_multiple: {
      url: _base2.default.Config.server.ajax + 'clear_multiple.do',
      authId: '',
      method: 'post',
      defaultData: {}
    }

  },
  user: {
    login: {
      url: _base2.default.Config.server.ajax + 'userLogin.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    getCodeKey: {
      url: _base2.default.Config.server.ajax + 'get_captcha_key.do',
      authId: '',
      method: 'post',
      defaultData: {}
    }
  },
  newsradar: {
    rank: {
      getRankIntelligenceList: {
        url: _base2.default.Config.server.ajax + "getRankIntelligenceList.do"
      },
      modifyIntelligenceTopRank: {
        url: _base2.default.Config.server.ajax + "modifyIntelligenceTopRank.do"
      },
      clearorders: {
        url: _base2.default.Config.server.ajax + "updateIntelligenceInfoTopnumdefault.do"
      }
    },
    list: {
      url: _base2.default.Config.server.ajax + "queryIntelligence.do"
    },
    update_status: {
      url: _base2.default.Config.server.ajax + "updateIntelligenceStatus.do"
    },
    batch_deletes: {
      url: _base2.default.Config.server.ajax + "batchUpdateIntelligenceStatus.do"
    },
    item_pass: {
      url: _base2.default.Config.server.ajax + "updateIntelligenceUseStatus.do"
    },
    batch_pass: {
      url: _base2.default.Config.server.ajax + "batchUpdateIntelligenceUseStatus.do"
    },
    view_item: {
      url: _base2.default.Config.server.ajax + "previewIntelligence.do"
    },
    add: {
      url: _base2.default.Config.server.ajax + "insertIntelligence.do"
    },
    get: {
      url: _base2.default.Config.server.ajax + "selectIntelligenceById.do"
    },
    update: {
      url: _base2.default.Config.server.ajax + "updateIntelligence.do"
    },
    get_orders: {
      url: _base2.default.Config.server.ajax + "getRankIntelligenceList.do"
    },
    amount: {
      url: _base2.default.Config.server.ajax + "selectIntelligenceCountByUseStatus.do"
    },

    report_newsradar: {
      url: _base2.default.Config.server.ajax + "updateIntelligenceReply.do"
    },

    newsradar_news: {
      url: _base2.default.Config.server.ajax + "insertIntelligenceReplyNews.do"
    },

    report_list: {
      url: _base2.default.Config.server.ajax + "selectIntelReplyPageByParam.do"
    },

    report_list_byid: {
      url: _base2.default.Config.server.ajax + "queryIntelligenceReplyByIntelligenceId.do"
    },
    report_batch_pass: {
      url: _base2.default.Config.server.ajax + "batchUpdateIntelReplyUseStatus.do"
    },
    report_batch_deletes: {
      url: _base2.default.Config.server.ajax + "batchUpdateIntelReplyStatus.do"
    },
    report_item_pass: {
      url: _base2.default.Config.server.ajax + "updateIntelligenceReplyUseStatus.do"
    },
    report_item_deletes: {
      url: _base2.default.Config.server.ajax + "updateIntelReplyStatus.do"
    }

  },

  biguser: {

    list: {
      list: { url: _base2.default.Config.server.ajax + "queryAllChannelGeneralInfoList.do" },
      update_status: { url: _base2.default.Config.server.ajax + "updateChannelInfoStatus.do" },
      item: { url: _base2.default.Config.server.ajax + "preUpdateChannelGeneralInfo.do" },
      add: { url: _base2.default.Config.server.ajax + "addChannelGeneralInfo.do" },
      reset: { url: _base2.default.Config.server.ajax + "resetUserPwd.do" },
      update: { url: _base2.default.Config.server.ajax + "updateChannelGeneralInfo.do" },
      hot_order: { url: _base2.default.Config.server.ajax + "getSubChannelHotList4Range.do" },
      change_hot_order: { url: _base2.default.Config.server.ajax + "getRankIntelligenceList.do" },
      fresh_order: { url: _base2.default.Config.server.ajax + "getSubChannelFreshList4Range.do" },
      set_fresh_order: { url: _base2.default.Config.server.ajax + "setFreshnumOrders.do" }
    },
    list_verifier: {
      list: { url: _base2.default.Config.server.ajax + "selectChannelExamineListByParam.do" },
      change: { url: _base2.default.Config.server.ajax + "updateChannelExamineInfo.do" }
    },
    type: {
      list: { url: _base2.default.Config.server.ajax + "selectChannelTypePageByParam.do" },
      add: { url: _base2.default.Config.server.ajax + "insertChannelType.do" },
      update: { url: _base2.default.Config.server.ajax + "updateChannelType.do" },
      deletes: { url: _base2.default.Config.server.ajax + "deleteChannelType.do" },
      reset: { url: _base2.default.Config.server.ajax + "removeChannelType.do" },
      orders: { url: _base2.default.Config.server.ajax + "updateChannelTypeOrderNumById.do" },
      all: { url: _base2.default.Config.server.ajax + "selectChannelTypeList.do" }
    },
    news: {
      list: { url: _base2.default.Config.server.ajax + "queryAllSubChannelNewsList.do" },
      item: { url: _base2.default.Config.server.ajax + "getNewsInfoById4SubChannel.do" },
      update: { url: _base2.default.Config.server.ajax + "modifyNewsInfo4SubChannel.do" },
      chouqu: { url: _base2.default.Config.server.ajax + "drawSubChannelNews2OtherChannel.do" },
      deletes: { url: _base2.default.Config.server.ajax + "delNewsInfo4SubChannel.do" }
    },
    news_verifier: {
      list: { url: _base2.default.Config.server.ajax + "getAllSubChannelNewsList4Audit.do" },
      batch_pass: { url: _base2.default.Config.server.ajax + "batchAuditNewsInfo4SubChannel.do" }
    },
    grab: {
      list: { url: _base2.default.Config.server.ajax + "getAllSpideNewsList.do" },
      update: { url: _base2.default.Config.server.ajax + "modifySpiderNewsInfo.do" },
      batch_pass: { url: _base2.default.Config.server.ajax + "batchDealSpiderSubChannelNews.do" }
    },
    comments: {
      list: { url: _base2.default.Config.server.ajax + "getAllSubChannelNewsCommentList.do" }
    }
  },
  activity: {
    add: {
      url: _base2.default.Config.server.ajax + 'activity_add.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    del: {
      url: _base2.default.Config.server.ajax + 'activity_delete.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    reset: {
      url: _base2.default.Config.server.ajax + 'activity_reset.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    save: {
      url: _base2.default.Config.server.ajax + 'activity_save.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    edit: {
      url: _base2.default.Config.server.ajax + 'activity_update.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    list: {
      url: _base2.default.Config.server.ajax + 'activity_list.do',
      authId: '',
      method: 'post',
      defaultData: {
        pageIndex: 1,
        pageSize: 10
      }
    },
    activity_list_content: {
      url: _base2.default.Config.server.ajax + 'activity_list_content.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    getActivityList_id: {
      url: _base2.default.Config.server.ajax + 'activity_list_id.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    get_activity_in_post: {
      url: _base2.default.Config.server.ajax + 'get_activity_in_post.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    activity_get_star_list: {
      url: _base2.default.Config.server.ajax + 'activity_get_star_list.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    activity_star_list: {
      url: _base2.default.Config.server.ajax + 'activity_star_list.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    commodity_star_remove: {
      url: _base2.default.Config.server.ajax + 'activity_remove_from_star.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    activity_list_detail: {
      url: _base2.default.Config.server.ajax + 'activity_list_detail.do',
      authId: '',
      method: 'post',
      defaultData: {}
    }
  },
  commodity: {
    add: {
      url: _base2.default.Config.server.ajax + 'commodity_add.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    edit: {
      url: _base2.default.Config.server.ajax + 'commodity_update.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    detail: {
      url: _base2.default.Config.server.ajax + 'commodity_detail.do',
      authId: '',
      method: 'post' },
    list_detail: {
      url: _base2.default.Config.server.ajax + 'commodity_list_detail.do',
      authId: '',
      method: 'post' },
    del: {
      url: _base2.default.Config.server.ajax + 'commodity_del.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    list: {
      url: _base2.default.Config.server.ajax + 'commodity_list.do',
      authId: '',
      method: 'post',
      defaultData: {
        pageIndex: 1,
        pageSize: 10
      }
    },
    orders: {
      url: _base2.default.Config.server.ajax + 'commodity_order.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    business_list: {
      url: _base2.default.Config.server.ajax + 'buiness_list.do',
      authId: '',
      method: 'post',
      defaultData: {
        pageIndex: 1,
        pageSize: 10
      }
    },
    brand_list: {
      url: _base2.default.Config.server.ajax + 'brand_list.do',
      authId: '',
      method: 'post',
      defaultData: {
        pageIndex: 1,
        pageSize: 10
      }
    },
    quanzi_list: {
      url: _base2.default.Config.server.ajax + 'quanzi_list.do',
      authId: '',
      method: 'post',
      defaultData: {
        pageIndex: 1,
        pageSize: 10
      }
    },
    get_goods_in_post: {
      url: _base2.default.Config.server.ajax + 'get_goods_in_post.do',
      authId: '',
      method: 'post',
      defaultData: {}
    },
    down: {
      url: _base2.default.Config.server.ajax + 'invoice_present.do' },
    save: {
      url: _base2.default.Config.server.ajax + 'commodity_save.do',
      authId: '',
      method: 'post' },
    invoice_list: {
      url: _base2.default.Config.server.ajax + 'invoice_list.do',
      authId: '',
      method: 'post' },
    commodity_get_star_lists: {
      url: _base2.default.Config.server.ajax + 'commodity_get_star_lists.do',
      authId: '',
      method: 'post' },
    commodity_set_list: {
      url: _base2.default.Config.server.ajax + 'commodity_set_list.do',
      authId: '',
      method: 'post' },
    commodity_star_remove: {
      url: _base2.default.Config.server.ajax + 'commodity_star_remove.do',
      authId: '',
      method: 'post' }
  },
  serial: {
    gallery: {
      add: {
        url: _base2.default.Config.server.ajax + 'gallery_new.do',
        authId: '',
        method: 'post',
        defaultData: {
          status: 1
        }
      },
      edit: {
        url: _base2.default.Config.server.ajax + 'gallery_update.do',
        authId: '',
        method: 'post',
        defaultData: {}
      },
      del: {
        url: _base2.default.Config.server.ajax + 'gallery_delete.do',
        authId: '',
        method: 'post',
        defaultData: {}
      },
      gallery_get_list: {
        url: _base2.default.Config.server.ajax + 'gallery_get_list.do',
        authId: '',
        method: 'post',
        defaultData: {
          pageIndex: 1,
          pageSize: 10
        }
      },
      gallery_get_details: {
        url: _base2.default.Config.server.ajax + 'gallery_get_details.do',
        authId: '',
        method: 'post',
        defaultData: {}

      },
      orders: {
        url: _base2.default.Config.server.ajax + 'gallery_order_star.do',
        authId: '',
        method: 'post',
        defaultData: {}
      },
      gallery_set_status: {
        url: _base2.default.Config.server.ajax + 'gallery_set_status.do',
        authId: '',
        method: 'post',
        defaultData: {}
      },
      gallery_filter_type_list: {
        url: _base2.default.Config.server.ajax + 'gallery_filter_type_list.do',
        authId: '',
        method: 'post',
        defaultData: {
          pageSize: 10,
          pageIndex: 1
        }
      },
      gallery_order_clear: {
        url: _base2.default.Config.server.ajax + 'gallery_order_clear.do',
        authId: '',
        method: 'post',
        defaultData: {}
      },
      gallery_get_order_list: {
        url: _base2.default.Config.server.ajax + 'gallery_get_order_list.do',
        authId: '',
        method: 'post',
        defaultData: {}
      }
    },
    olympic: {
      indentityCode: "1",
      get_olympic_info: {
        url: _base2.default.Config.server.ajax + 'olympicurldetail.do',
        authId: '' },
      set_is_show_info: {
        url: _base2.default.Config.server.ajax + 'olympicnewsenter_ishow.do',
        authId: '' },
      setOrderNum: {
        url: _base2.default.Config.server.ajax + 'gallery_get_order_list.do',
        authId: '' },
      get_news_list: {
        url: _base2.default.Config.server.ajax + 'querynews.do',
        authId: ""
      },
      get_an_item: {
        url: _base2.default.Config.server.ajax + 'olympicnewsdetail.do',
        authId: '' },
      new_an_item: {
        url: _base2.default.Config.server.ajax + 'newolympicnews.do',
        authId: '' },
      update_an_item: {
        url: _base2.default.Config.server.ajax + 'updateolympicnews.do',
        authId: '' },
      update_refs_url: {
        url: _base2.default.Config.server.ajax + 'updateolympicurl.do',
        authId: '' },
      get_item_list: {
        url: _base2.default.Config.server.ajax + 'olympicnews_list.do',
        authId: '' },
      del_an_item: {
        url: _base2.default.Config.server.ajax + 'deleteolympicnews.do',
        authId: '' },
      get_rank_list: {
        url: _base2.default.Config.server.ajax + 'get_olympicnews_order.do',
        authId: '' },
      save_rank_list: {
        url: _base2.default.Config.server.ajax + 'olympicnews_order.do',
        authId: '' },
      clear_rank_list: {
        url: _base2.default.Config.server.ajax + 'clear_olympicnews_order.do',
        authId: '' }
    }
  },
  public: {
    operation: {
      queryhotfixes: {
        url: _base2.default.Config.server.ajax + 'queryhotfixes.do',
        authId: ''
      },
      hotfixesdetail: {
        url: _base2.default.Config.server.ajax + 'hotfixesdetail.do',
        authId: ''
      },
      newhotfixes: {
        url: _base2.default.Config.server.ajax + 'newhotfixes.do',
        authId: ''
      },
      updatehotfixes: {
        url: _base2.default.Config.server.ajax + 'updatehotfixes.do',
        authId: ''
      },
      deletehotfixes: {
        url: _base2.default.Config.server.ajax + 'deletehotfixes.do',
        authId: ''
      }
    },
    sensitive: {
      list: {
        url: _base2.default.Config.server.ajax + "querySensitiveWordPage.do"
      },
      add: {
        url: _base2.default.Config.server.ajax + "addSensitiveWord.do"
      },
      del_items: {
        url: _base2.default.Config.server.ajax + "deleteSensitiveWordByIds.do"
      }
    },
    hot_words: {
      list: {
        url: _base2.default.Config.server.ajax + "selectHotwordInfoPageByParam.do"
      },
      add: {
        url: _base2.default.Config.server.ajax + "insertHotwordInfo.do"
      },
      del_hot: {
        url: _base2.default.Config.server.ajax + "deleteHotwordInfo.do"
      },
      active_hot: {
        url: _base2.default.Config.server.ajax + "updateHotwordInfoStatus.do"
      },
      orders: {
        url: _base2.default.Config.server.ajax + "updateHotwordInfoOrderNum.do"
      }
    },
    integral: {
      list: {
        url: _base2.default.Config.server.ajax + "pointsOperateList.do"
      },
      update: {
        url: _base2.default.Config.server.ajax + "updateScorePointsOperate.do"
      }
    },
    info: {
      list: {
        url: _base2.default.Config.server.ajax + "selectInternalMessageInfoPageByParam.do"
      },
      add: {
        url: _base2.default.Config.server.ajax + "insertInternalMessageInfo.do"
      },
      deletes: {
        url: _base2.default.Config.server.ajax + "deleteInternalMessageInfo.do"
      },
      change: {
        url: _base2.default.Config.server.ajax + "updateInternalMessageInfo.do"
      }
    },
    appuser: {
      getUserList: {
        url: _base2.default.Config.server.ajax + "queryClientUserList.do"
      },
      updateAppUserStatus: {
        url: _base2.default.Config.server.ajax + "dealClientUserStatus.do"
      },
      getPersonas: {
        url: _base2.default.Config.server.ajax + "getClientUserPersonas.do"
      },
      getUserScoreLog: {
        url: _base2.default.Config.server.ajax + "queryClientUserScoreHisList.do"
      },
      getUserInvitationLog: {
        url: _base2.default.Config.server.ajax + "queryClientUserInviteUserList.do"
      },
      downloadUserList: {
        url: _base2.default.Config.server.ajax + "downloadClientUserListFile.do"
      },
      downloadUserInvitationList: {
        url: _base2.default.Config.server.ajax + "downloadClientUserInviteListFile.do"
      }
    },
    softupdate: {
      list: {
        url: _base2.default.Config.server.ajax + "selectAppUpdateInfoPageByParam.do"
      },
      add: {
        url: _base2.default.Config.server.ajax + "AppUpdateInfoEdit.do"
      },
      change: {
        url: _base2.default.Config.server.ajax + "updateAppUpdateInfoStatus.do"
      },
      deletes: {
        url: _base2.default.Config.server.ajax + "deleteAppUpdateInfo.do"
      },
      item: {
        url: _base2.default.Config.server.ajax + "selectAppUpdateInfoById.do"
      }

    }
  },
  circles: {
    circle: {
      add: {
        authId: '211',
        url: _base2.default.Config.server.ajax + "circle_new.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "isVisible": 1
        }
      },
      delete: {
        authId: '212',
        url: _base2.default.Config.server.ajax + "circle_delete.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      update: {
        authId: '213',
        url: _base2.default.Config.server.ajax + "circle_update.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      details: {
        authId: '214',
        url: _base2.default.Config.server.ajax + "circle_details.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_list: {
        authId: '215',
        url: _base2.default.Config.server.ajax + "circle_get_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 10,
          "pageIndex": 1
        }
      },
      set_visible: {
        authId: '217',
        url: _base2.default.Config.server.ajax + "circle_set_visiable.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      to_dicoveries: {
        authId: '218',
        url: _base2.default.Config.server.ajax + "circle_to_dicoveries.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "limit": "40"
        }
      },

      save_dicoveries: {
        authId: '2110',
        url: _base2.default.Config.server.ajax + "circle_order_dicoveries.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_discoveries: {
        authId: '2111',
        url: _base2.default.Config.server.ajax + "circle_get_discoveries_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      clear_discoveries: {
        authId: '2112',
        url: _base2.default.Config.server.ajax + "circle_empty_discoveries_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      }
    },
    post: {
      add: {
        authId: '221',
        url: _base2.default.Config.server.ajax + "post_new.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      delete: {
        authId: '222',
        url: _base2.default.Config.server.ajax + "post_delete.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      update: {
        authId: '224',
        url: _base2.default.Config.server.ajax + "post_update.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_detail: {
        authId: '225',
        url: _base2.default.Config.server.ajax + "post_get_details.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_list: {
        authId: '226',
        url: _base2.default.Config.server.ajax + "post_get_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 10,
          "pageIndex": 1
        }
      },
      filter_list: {
        authId: '226',
        url: _base2.default.Config.server.ajax + "post_filter_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 10,
          "pageIndex": 1
        }
      },
      update_report: {
        authId: '2210',
        url: _base2.default.Config.server.ajax + "post_get_report_count.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      save_stars: {
        authId: '2214',
        url: _base2.default.Config.server.ajax + "post_order_star.do",
        method: 'post',

        isAsync: true,
        defaultData: {}
      },
      get_stars: {
        authId: '2215',
        url: _base2.default.Config.server.ajax + "post_get_star_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 200,
          "pageIndex": 1
        }
      },
      clear_stars: {
        authId: '2216',
        url: _base2.default.Config.server.ajax + "post_empty_star_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      set_verify: {
        authId: '2217',
        url: _base2.default.Config.server.ajax + "post_handle_verify.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      set_refs: {
        authId: '2218',
        url: _base2.default.Config.server.ajax + "ref_to_offline.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      }
    },
    comment: {
      add: {
        authId: '229',
        url: _base2.default.Config.server.ajax + "comment_new.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      delete: {
        authId: '231',
        url: _base2.default.Config.server.ajax + "comment_delete.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      update: {
        authId: '232',
        url: _base2.default.Config.server.ajax + "comment_update.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      details: {
        authId: '233',
        url: _base2.default.Config.server.ajax + "comment_get_details.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_list: {
        authId: '234',
        url: _base2.default.Config.server.ajax + "comment_get_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 10,
          "pageIndex": 1
        }
      },
      filter_list: {
        authId: '234',
        url: _base2.default.Config.server.ajax + "comment_filter_list.do",
        method: 'post',
        isAsync: true,
        defaultData: {
          "pageSize": 10,
          "pageIndex": 1
        }
      },
      update_verify: {
        authId: '236',
        url: _base2.default.Config.server.ajax + "comment_set_verify.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      update_report: {
        authId: '237',
        url: _base2.default.Config.server.ajax + "comment_set_report.do",
        method: 'post',
        isAsync: true,
        defaultData: {}
      },
      get_verify_count: {
        authId: '237',
        url: _base2.default.Config.server.ajax + "post_get_verify_count.do",
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
            url: _base2.default.Config.server.ajax + "selectChannelListByParam.do"
          },
          out_excel: {
            url: _base2.default.Config.server.ajax + "exNewsListingExcel.do"
          }
        },
        click_tongji: {
          list: {
            url: _base2.default.Config.server.ajax + "selectNewsInfoStati.do"
          },
          out_excel: {
            url: _base2.default.Config.server.ajax + "exNewsInfoStatiExcel.do"
          }
        },
        getUserByDep: {
          url: _base2.default.Config.server.ajax + "userListForNewsListing.do"
        }
      },
      apps: {
        get_nearly_info: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "stat_info_day.do"
        },
        get_app_summary: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "stat_info_summary.do"
        },
        get_activity_info: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "stat_info_active.do"
        },
        get_timezone_info: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "stat_info_time.do"
        },
        get_app_top: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "stat_info_top10.do"
        }
      },
      today: {
        get_today_info: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "stat_today_day.do"
        },
        get_today_new: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "stat_today_newreg.do"
        },
        get_today_details: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "stat_today_newdetail.do"
        }
      },
      newboot: {
        get_user_summary: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_reg_userinfo.do"
        },
        get_data_summary: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_reg_datainfo.do"
        },
        get_data_details: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_reg_datadetail.do"
        }
      },
      active: {
        user_active_summary: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_active_info.do"
        },
        user_general_summary: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_active_summary.do"
        },
        user_active_detail_summary: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_active_detail.do"
        }
      },
      timespan: {
        get_analyzed_data: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_time_info.do"
        },
        get_data_summary: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_time_summary.do"
        },
        get_data_details: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_time_detail.do"
        }
      },
      version: {
        use_version_info: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_version_info.do"
        },
        use_version_trend: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_version_trend.do"
        },
        use_version_detail: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_version_detail.do"
        },
        get_version_id: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "get_version_id.do"
        }
      },
      device: {
        get_top10_data: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_top10_info.do"
        },
        get_hot_summary: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_top10_hot.do"
        },
        get_top10_details: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "use_top10_detail.do"
        }
      },
      retained_user: {
        get_data_details: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "retain_user_info.do"
        }
      },
      retained_device: {
        get_data_details: {
          authId: '130',
          url: _base2.default.Config.server.ajax + "retain_device_info.do"
        }
      }
    }
  },
  channel: {
    list: {
      url: _base2.default.Config.server.ajax + "queryAllChannelBaseInfoList.do"
    },
    changestatus: {
      url: _base2.default.Config.server.ajax + "updateChannelInfoStatus.do"
    },
    add: {
      url: _base2.default.Config.server.ajax + "addChannelBaseInfo.do"
    },
    update: {
      url: _base2.default.Config.server.ajax + "updateChannelInfo.do"
    },
    item: {
      url: _base2.default.Config.server.ajax + "preUpdateChannelInfo.do"
    },
    orders: {
      url: _base2.default.Config.server.ajax + "updateChannelBaseInfoRecommend.do"
    },
    all: {
      url: _base2.default.Config.server.ajax + "getAllChannels.do"
    }
  },
  appClient: {
    startPage: {
      getList: {
        url: _base2.default.Config.server.ajax + "queryOpenappimgList.do"
      },
      createItem: {
        url: _base2.default.Config.server.ajax + "addOpenappimg.do"
      },
      updateItem: {
        url: _base2.default.Config.server.ajax + "modifyOpenappimg.do"
      },
      getItemDetails: {
        url: _base2.default.Config.server.ajax + "getOpenappimgById.do"
      },
      updateItemStatus: {
        url: _base2.default.Config.server.ajax + "dealOpenappimgStatus.do"
      },
      getItemRefNews: {
        url: _base2.default.Config.server.ajax + "getNewsList4Openimg.do"
      },
      getItemRefGoods: {
        url: _base2.default.Config.server.ajax + "getProductList4Openimg.do"
      },
      getItemRefActivity: {
        url: _base2.default.Config.server.ajax + "getActiveList4Openimg.do"
      },
      getItemRefReport: {
        url: _base2.default.Config.server.ajax + "getIntelligenceList4Openimg.do"
      }
    }
  }
};