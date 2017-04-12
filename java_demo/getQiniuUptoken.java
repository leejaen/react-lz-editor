@RequestMapping(value = "/doQiniuPicPersist.do")
    public void doQiniuPicPersist(HttpServletRequest request,
            HttpServletResponse response, final ModelMap context,String persistentOps) {
        response.setHeader("Access-Control-Allow-Origin", rm.getValue("allow_url"));
        Jedis jedis = null;
        try {
            String inputJsonStr = RequestDeal.getInstance().readJSONString(
                    request);
            if ("".equals(inputJsonStr)
                    ||inputJsonStr== null) {
                ResponeDeal.getInstance().sendResponseStr(response, "301",
                        "json为空");
                return;
            }
            HashMap dataMap = JSON.parseObject(inputJsonStr,
                    HashMap.class);
            List<JSONObject> list = (List<JSONObject>)dataMap.get("list");
            if(list.size() > 0){
                jedis = ManageRedisPool.getInstance().getJedis();
                List<Map> dataList = new ArrayList<Map>();
                for(JSONObject map : list){
                    String originPic = (String)map.get("originPic");
                    String newName = (String) map.get("newName");
                      String ACCESS_KEY = "YourAccessKeyStringOfQiNiu";
                      String SECRET_KEY = "YourSecretKeyStringOfQiNiu";
                      String url = 	originPic;
                      if(url != null && !("".equals(url))){
                          String fops = url.substring(url.indexOf("?")+1);
                          String org_url = url.substring(0,url.indexOf("?"));
                          String key = org_url.substring(org_url.lastIndexOf("/")+1);
                          Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
                          String callbackUrl = rm.getValue("qiniu_callback");
                          //新建一个OperationManager对象
                          Zone z = Zone.zone0();
                          Configuration c = new Configuration(z);
                          //新建一个OperationManager对象
                          OperationManager operater = new OperationManager(auth,c);
                          //设置要转码的空间和key，并且这个key在你空间中存在
                          String bucket = "yourimg";
                          //设置转码的队列
                          String pipeline = "yourPipeline";
                          //可以对转码后的文件使用saveas参数自定义命名，当然也可以不指定，文件会默认命名并保存在当前空间
                          String urlbase64 = UrlSafeBase64.encodeToString("yourimg:"+newName);
                          String pfops = fops + "|saveas/"+urlbase64;
                          Map<String,String> callBackMap = new HashMap<String,String>();
                          callBackMap.put("fsize", "$(fsize)");
                          callBackMap.put("mimeType", "$(mimeType)");
                          callBackMap.put("exif", "$(exif)");
                          callBackMap.put("imageInfo", "$(imageInfo)");
                          callBackMap.put("avinfo", "$(avinfo)");
                          callBackMap.put("imageAve", "$(imageAve)");
                          callBackMap.put("ext", "$(ext)");
                          //设置pipeline参数
                          StringMap params = new StringMap().putWhen("force", 1, true).putNotEmpty("pipeline", pipeline).putNotEmpty("notifyURL", callbackUrl).putNotEmpty("callbackBody", JSONObject.toJSONString(callBackMap));
                          try {
                            String persistid = operater.pfop(bucket, key, pfops, params);
                            //打印返回的persistid
                            System.out.println(persistid);
                            Map m = new HashMap();
                            m.put("persistid", persistid);
                            m.put("newName", newName);
                            dataList.add(m);
                            jedis.set(ManageRedisParam.MANAGE_PIC_PRE+newName, "0");
                            jedis.expire(ManageRedisParam.MANAGE_PIC_PRE+newName, 30*60);
                          } catch (QiniuException e) {
                            //捕获异常信息
                              Response r = e.response;
                              // 请求失败时简单状态信息
                              System.out.println(r.toString());
                              try {
                                 // 响应的文本信息
                                System.out.println(r.bodyString());
                              } catch (QiniuException e1) {
                                  //ignore
                              }
                          }
                    }
                }
                ResponeDeal.getInstance().sendResponseData(response, "0", "成功",
                        dataList);
            }else{
                ResponeDeal.getInstance().sendResponseStr(response, "301",
                        "数据为空");
                return;
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            ResponeDeal.getInstance().sendResponseStr(response, "404",
                    "服务器错误");
        }finally{
            if(jedis != null){
                ManageRedisPool.getInstance().returnResource(jedis);
            }
        }
    }
	 @RequestMapping(value = "/getUptokenOfQiniu.do")
    public void getUptokenOfQiniu(HttpServletRequest request,
            HttpServletResponse response, final ModelMap context,String name) {
        response.setHeader("Access-Control-Allow-Origin", rm.getValue("allow_url"));
        Auth auth = Auth.create("",
                "");
        String token="";
        if("".equals(name)||name ==null){
            token = auth.uploadToken("yourimg");
        }else{
            if("patch".equals(name)){
                token = auth.uploadToken("yourstatic");//补丁空间名:yourstatic
            }else{
                token = auth.uploadToken("yourimg");
            }
        }
        HashMap<String, String> rtnMap = new HashMap<String, String>();
        rtnMap.put("uptoken", token);
        response.setContentType("text/html;charset=UTF-8");
        try {
            response.getWriter().print(JSONObject.toJSONString(rtnMap));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
