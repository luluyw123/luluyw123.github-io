/**
 * @Date: 2020-06-15 10:35:42
 * @LastEditors: qwguo
 * @LastEditTime: Do not edit
 * @description: 函数说明 用于rem单位布局的计算
 * @param {x:表示设计稿的尺寸，min：表示最小屏幕值，max：表示最大屏幕值} 参数说明
 * @return: 返回值
 */
(function (x, min, max) {
    min = min || 320;
    var docEl = document.documentElement,
        clientWidth = null,
        countFun = function () {
            // 如果当前屏幕宽度小于指定最小宽度取比较大的值
            clientWidth = Math.max(docEl.clientWidth, min);
            // 如果当前屏幕宽度大于指定最大宽度取比较小的值
            clientWidth = max ? Math.min(clientWidth, max) : clientWidth;
            if (clientWidth) {
                //通过屏幕宽度除以参考设计稿宽度计算出html文字大小，然后所有元素应用设计稿的尺寸除以100来取值并加rem单位来给元素尺寸
                docEl.style.fontSize = 100 * (clientWidth / x) + 'px';
            }
        };
    // 给窗口绑定改变大小事件并调用方法改变html的字号大小
    window.addEventListener('resize', countFun, false);
    countFun();
})(750, 320, 750);
// console.log(show_module_js.show_shops_js);
//论坛版块JS
function get_module_bbs_forum(id,tag,obj_id){
    $.ajax({
        url:'/wap/wapAjaxModule.php?username='+user_name+'&module_id='+obj_id+'&ajax_type=4&tag='+tag+'&id='+id,
        type:'get',
        success: function(data){
            if(data){
                // $('#bbs_forum_'+obj_id).html(data);
                $('#'+obj_id).html(data);
            }
        }
    })
}

//论坛帖子JS
function get_module_bbs_thread(id,tag,page,append_tag,obj_id,show_style,show_quan){
    $.ajax({
        url:'/wap/wapAjaxModule.php?username='+user_name+'&ajax_type=3&tag='+tag+'&id='+id+'&page='+page+'&obj_id='+obj_id+'&show_style='+show_style+'&show_quan='+show_quan,
        type:'get',
        success: function(data){
            if(data){
                if(append_tag){
                    $('#more_link').remove();
                    $('#bbs_thread_'+obj_id).append(data);
                }else{
                    $('#bbs_thread_'+obj_id).html(data);
                }
            }
        }
    })
}

// 短视频瀑布流列表渲染函数
function videoTowColum(j, curDom){
    var shortVideoModule = curDom ? curDom : $('.shortVideoModule_style2');
    shortVideoModule.each(function(i, dom){
        dom = $(dom);
        var leftDom = dom.find('.SV_Left');
        var rightDom = dom.find('.SV_Right');
        var getJson = j ? j : JSON.parse(dom.find('.json-code').text().trim());
        var fun = function(v, i){
            var img = new Image();
            img.src = v.conver;
            img.onload = function(){
                var taregtDom = leftDom;
                if(leftDom.height() > rightDom.height()){
                    taregtDom = rightDom;
                }
                var browse_num_total = parseInt(v.browse_num)+parseInt(v.default_browse_num)
                var like_num_total = parseInt(v.like_num)+parseInt(v.default_like_num)
                var pro = '';
                if(v.proname){
                    pro = '<a class="max_name" href="'+v.prolink+'">' +
                        '<div class="m-name_img"><img src="'+v.propic+'"></div>' +
                        '<div class="m-name">'+v.proname+'</div>' +
                        '</a>';
                }
                taregtDom.append('' +
                    '<div class="SV_li shortVideo-item">' +
                    '<a class="video-href" href="' + v.video_url + '">&nbsp;</a>' +
                    '<div class="SV_img">' +
                    '<a class="video-href" href="' + v.video_url + '">&nbsp;</a>' +
                    '<span><img src="' + v.conver + '"></span>' +
                    '<p><img src="//aimg8.dlssyht.cn/xcx_pack/images/icon_video.png"></p>' + pro
                    + '</div>' +
                    '<div class="SV_tit title-text">' + v.title + '</div>' +
                    '<div class="SV_bottom">' +
                    '<div class="SV_number">' +
                    '<span><img src="//aimg8.dlssyht.cn/xcx_pack/images/num_icon2.png"></span>' +
                    '<p class="praise-num">' + browse_num_total + '</p>' +
                    '</div>' +
                    '<div class="SV_number">' +
                    '<span><img src="//aimg8.dlssyht.cn/xcx_pack/images/num_icon1.png"></span>' +
                    '<p class="praise-num">' + like_num_total + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                if(i<getJson.length-1){
                    fun(getJson[i+1], i+1);
                }
            }
        };
        fun(getJson[0], 0);
    });
}

$(function(){
    //加载更多
    var thread_page=1;
    $('#more_link a').live('click',function(){
        $('#more_link').html('<img src="/images/loading.gif">');
        var set_id=$('#more_link').data('id');
        var thread_tag=$('#more_link').data('tag');
        var obj_id=$('#more_link').data('obj_id');
        var s_style=$('#more_link').data('show_style');
        var show_quan=$('#more_link').data('show_quan');
        thread_page++;
        get_module_bbs_thread(set_id,thread_tag,thread_page,1,obj_id,s_style,show_quan);
    });
    //点赞
    $(".icon_a .ev_zan").live("click",function(){
        var _this = $(this);
        var id = _this.attr('rel');
        if (!id) return false;
        var ip=returnCitySN.cip;//通过搜狐IP地址查询接口
        var tmp_data=readCookie('THEMEZAN_'+user_name);
        var cookie_data=tmp_data.split('_');
        var tmp_ids=id+'#'+ip;
        if(cookie_data){
            for(var i=0;i<cookie_data.length;i++){
                if(tmp_ids==cookie_data[i]){
                    _this.addClass('cur');
                    showAllzz("您已经点击过了！");
                    return false;
                }
            }
        }

        $.post('/wap/action/ajax_theme_zan.php?username='+user_name, {'theme_id':id}, function(num) {
            if (parseInt(num)==0) {
                showAllzz("操作失败，请重新点击！");
                return false;
            } else {
                _this.find('em').html($.trim(num));
                var cookies=readCookie('THEMEZAN_'+user_name);
                var ids=id+'#'+ip;
                if(cookies){
                    cookies+='_'+ids;
                }else{
                    cookies=ids;
                }
                _this.addClass('cur');
                writeCookie('THEMEZAN_'+user_name,cookies,1000*24);
                showAllzz("点赞成功！");
            }
        });
    });
    //渲染瀑布流短视频列表模块
    videoTowColum();
    $(document).on('click', '.moreVideoData', function(){
        var $this = $(this);
        var page = $this.data('page');
        var module_id = $this.data('moid');
        var module_set_id = $this.data('setid');
        page = page || 1;
        if(!$this.data('click')){
            $this.data('click', 1);
            var shortVideoModule_style2 = $this.closest('.shortVideoModule_style2');
            $.get('/wap/wapAjaxModule.php?username='+user_name+'&ajax_type=12&page='+page+'&set_id='+module_set_id+'&module_id='+module_id+'&style_type=1', {}, function(res){
                console.log(res);
                // return;
                var getList = JSON.parse(res.str);
                videoTowColum(getList, shortVideoModule_style2);
                if(!parseInt(res.show_more)){
                    $this.hide();
                }else{
                    $this.data({'click': 0, 'page': res.page});
                }

            }, 'json');
        }
    })
});


//拼团模块JS
function get_fight_group_more(module_id,pageSize,style,page){
    $('#fight_group_'+module_id).parent().find('.listMore').html('<center><img src="/images/loading.gif"></center>');
    $.ajax({
        url:'/wap/wapAjaxModule.php?username='+user_name+'&ajax_type=5&pageSize='+pageSize+'&page='+page+'&style='+style+'&module_id='+module_id,
        type:'get',
        success: function(data){
            if(data){
                var new_data=data.split('#*&');
                $('#fight_group_'+module_id).parent().find('.listMore').remove();
                $('#fight_group_'+module_id).append(new_data[0]);
                $('#fight_group_'+module_id).parent().append(new_data[1]);
            }
        }
    });
}

//短视频加载更多
function getShortVideoAjax(module_set_id,module_id,style){
    var page = $('#shortVideo_'+module_id).attr('video_page');
    var leftLen = rightLen = 0;

    $.ajax({
        url:'/wap/wapAjaxModule.php?username='+user_name+'&ajax_type=12&page='+page+'&set_id='+module_set_id+'&module_id='+module_id+'&style_type='+style+'&leftlen='+leftLen+'&rightlen='+rightLen,
        type:'get',
        success:function(data){
            var newData = JSON.parse(data);
            // var newData = JSON.parse(data);
            // console.log(newData)
            if(newData.str){
                $('#shortVideo_'+module_id+'_more').before(newData.str);
                if(parseInt(newData.show_more)){
                    $('#shortVideo_'+module_id).attr('video_page',newData.page);
                    showThumbsUpIcon(module_id);
                    showThumbsUpNum(module_id);
                }else{
                    $('#shortVideo_'+module_id+'_more').hide();
                }
            }
        }
    })
}

//短视频跳转
function location_video(url) {
    if(url){
        window.location.href=url
    }
}
//短视频点赞
function thumbsUp(vid,mid){
    if(!vid){
        showAllzz('参数错误!');
        return false;
    }

    if(!wap_zz_userid){
        showAllzz("您未登录，请登录！",{'关闭':'/dom/denglu.php?username='+user_name+'&wap=1'});
        return false;
    }

    var status = parseInt($('#shortVideo_'+mid+'_'+vid).attr('vstatus')) ? 0 :1;
    var num = parseInt($.trim($('#shortVideo_'+mid+'_'+vid).find('.praise-num').text()));
    console.log(num)
    $.ajax({
        url:'http://'+wap_domain+':12701/Frontend/Shortvideo/shortVideoLikeLog?username='+user_name+'&id='+vid+'&status='+status+'&zz_userid='+wap_zz_userid+'&zz_shellCode='+readCookie('zz_shellCode'),
        type:'get',
        success:function(res){
            //点赞成功后
            if(res.code){
                $('#shortVideo_'+mid+'_'+vid).attr('vstatus',status);
                if(!status){
                    $('#shortVideo_'+mid+'_'+vid).find('.m-praise').removeClass('already');
                    $('#shortVideo_'+mid+'_'+vid).find('.praise-num').html((num-1) <1 ? 0 :(num-1));
                }else{
                    $('#shortVideo_'+mid+'_'+vid).find('.m-praise').addClass('already');
                    $('#shortVideo_'+mid+'_'+vid).find('.praise-num').html(num+1);
                }
            }
        }
    })
}

//点赞图标
function showThumbsUpIcon(mid){
    $.ajax({
        url:'http://'+wap_domain+':12701/Frontend/Shortvideo/currentUserIsLike?username='+user_name+'&zz_userid='+wap_zz_userid+'&zz_shellCode='+readCookie('zz_shellCode'),
        type:'get',
        success:function(res){
            if(res.code == 200){
                if(res.data.user_user_id == wap_zz_userid){
                    $('#shortVideo_'+mid).find('.shortVideo-item').each(function(){
                        var this_vid = $(this).data('videoid');
                        for (var i = 0; i < res.data.like_info.length; i++) {
                            if(res.data.like_info[i].video_id == this_vid){
                                $('#shortVideo_'+mid+'_'+this_vid).attr('vstatus',res.data.like_info[i].status);
                                if(res.data.like_info[i].status ==1){
                                    $('#shortVideo_'+mid+'_'+this_vid).find('.m-praise').addClass('already');
                                }else{
                                    $('#shortVideo_'+mid+'_'+this_vid).find('.m-praise').removeClass('already');
                                }
                            }
                        }
                    })
                }
            }
        }
    })
}

//点赞数量
function showThumbsUpNum(mid){
    $('#shortVideo_'+mid).find('.shortVideo-item').each(function(){
        var vid = $(this).data('videoid');
        $.ajax({
            url:'http://'+wap_domain+':12701/Frontend/Shortvideo/videoLikeInfo?id='+vid+'&username='+user_name+'&zz_userid='+wap_zz_userid+'&zz_shellCode='+readCookie('zz_shellCode'),
            type:'get',
            success:function(res){
                if(res.code == 200){
                    if(res.data.user_user_id == wap_zz_userid){
                        $('#shortVideo_'+mid+'_'+vid).find('.praise-num').html(res.data.likes.zan);
                    }
                }
            }
        })
    })
}

//OTO模块JS
function get_oto_more(module_id,pageSize,style,page){
    $('#module_oto_'+module_id).parent().find('.listMore').html('<center><img src="/images/loading.gif"></center>');
    var timestamp=new Date().getTime();
    $.ajax({
        url:'/wap/wapAjaxModule.php?username='+user_name+'&ajax_type=6&pageSize='+pageSize+'&page='+page+'&style='+style+'&module_id='+module_id+'&timestamp='+timestamp,
        type:'get',
        success: function(data){
            if(data){
                var new_data=data.split('#*&');
                $('#module_oto_'+module_id).parent().find('.listMore').remove();
                $('#module_oto_'+module_id).append(new_data[0]);
                $('#module_oto_'+module_id).parent().append(new_data[1]);
            }
        }
    });
}


//商铺模块JS
var tmp_data = [];
function shops_data(location_type,default_city,num,chose_type,shop_ids,shops_sort_type,shops_orderby,shops_where,customModuleId,shops_style,param_id){
    var t={};
    t.shops_where       =   shops_where;
    t.shops_sort_type   =   shops_sort_type;
    t.location_type     =   location_type;
    t.default_city      =   default_city;
    t.num               =   num;
    t.chose_type        =   chose_type;
    t.shop_ids          =   shop_ids;
    t.shops_orderby     =   shops_orderby;
    t.customModuleId    =   customModuleId;
    t.shops_style       =   shops_style;
    t.param_id          =   param_id;
    var username    =   user_name,
        system      =   {win : false, mac : false, xll : false },
        geoc        =   new BMap.Geocoder(),
        is_app      =   wap_is_app,
        is_ios      =   wap_is_ios,
        geolocation =   new BMap.Geolocation(),
        p           =   navigator.platform;
    if(num>30){
        num=30;
    }
    var is_bd=0;
    if (parseInt(chose_type) && (location_type == 1 || shops_sort_type == 2)){
        is_bd=1;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        if(system.win||system.mac||system.xll){
            geolocation.getCurrentPosition(function(r){
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var point =r.point;
                    geoc.getLocation(point, function(rs){
                        var addComp = rs.addressComponents;
                        var result = {name : addComp.city};
                        myFun(result,num,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd,point);
                    });
                }
            }, { enableHighAccuracy: true } );
        }else{
            if(is_app){
                if(is_ios){
                    geolocation.getCurrentPosition(function(position){
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                            var longitude =position.point.lng,
                            latitude = position.point.lat,
                            point =position.point,
                            geoc = new BMap.Geocoder();
                            if(position.accuracy == null){
                                if(default_city && default_city !="全国" && location_type==3){
                                    var result = {name : default_city};
                                    myFun(result,num,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd,point);
                                }else{
                                    geoc.getLocation(point, function(rs){
                                        var addComp = rs.addressComponents;
                                        var result = {name : addComp.city};
                                        myFun(result,num,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd,point);
                                    });
                                }
                            }else{
                                if(location_type==1){
                                    geoc.getLocation(point, function(rs){
                                        var addComp = rs.addressComponents;
                                        get_shops_list(addComp.city,longitude,latitude,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                    });
                                }else if(default_city && default_city !="全国" && location_type==3){
                                    get_shops_list(default_city,longitude,latitude,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                }else{
                                    get_shops_list(default_city,longitude,latitude,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                }
                            }
                        }else{
                            alert("请在设置中打开定位功能");
                        }
                    },{ enableHighAccuracy: true });
                }else{
                    android.getMapPosition('');
                }
            }else{
                if(use_wxchat_map){
                    wx.ready(function(){
                        var tmp_lat = readCookie('lat_'+user_name);
                        var tmp_lon = readCookie('lon_'+user_name);
                        if(tmp_lat && tmp_lon && user_name !='internet16' && user_name !='18138231203'){
                            $.ajax({
                                url:'/wap/wapAjaxModule.php?ajax_type=11&username='+user_name+'&wap=1&longitude='+tmp_lon+'&latitude='+tmp_lat,
                                type:'get',
                                success:function(dataN){
                                    var newArr = dataN.split('$%@');
                                    var longitudeNew = newArr[0],latitudeNew = newArr[1];
                                    if(location_type==1){
                                        var wx_geocoder = new qq.maps.Geocoder({
                                            complete: function (result) {
                                                // alert(result.detail.address)
                                                var tmp_city = JSON.stringify(result.detail.addressComponents.city);
                                                tmp_city =  tmp_city.replace(/\"/g, "");
                                                get_shops_list(tmp_city,longitudeNew,latitudeNew,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                            }
                                        })
                                        var wx_coord = new qq.maps.LatLng(tmp_lat, tmp_lon)
                                        wx_geocoder.getAddress(wx_coord);

                                    }else if(default_city && default_city !="全国" && location_type==3){
                                        get_shops_list(default_city,longitudeNew,latitudeNew,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                    }else{
                                        get_shops_list(default_city,longitudeNew,latitudeNew,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                    }
                                }
                            })
                        }else{
                            wx.getLocation({
                                success: function (res) {
                                    var lat = res.latitude; //纬度
                                    var lon = res.longitude; //经度
                                    var locationStr = "latitude："+lat+"，"+"longitude："+lon;
                                    writeCookie('lat_'+user_name,lat,1000*24);
                                    writeCookie('lon_'+user_name,lon,1000*24);
                                    $.ajax({
                                        url:'/wap/wapAjaxModule.php?ajax_type=11&username='+user_name+'&wap=1&longitude='+lon+'&latitude='+lat,
                                        type:'get',
                                        success:function(dataN){
                                            var newArr = dataN.split('$%@');
                                            var longitudeNew = newArr[0],latitudeNew = newArr[1];
                                            if(location_type==1){
                                                var wx_geocoder = new qq.maps.Geocoder({
                                                    complete: function (result) {
                                                        // alert(result.detail.address)
                                                        var tmp_city = JSON.stringify(result.detail.addressComponents.city);
                                                        tmp_city =  tmp_city.replace(/\"/g, "");
                                                        get_shops_list(tmp_city,longitudeNew,latitudeNew,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                                    }
                                                })
                                                var wx_coord = new qq.maps.LatLng(res.latitude, res.longitude)
                                                wx_geocoder.getAddress(wx_coord);

                                            }else if(default_city && default_city !="全国" && location_type==3){
                                                get_shops_list(default_city,longitudeNew,latitudeNew,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                            }else{
                                                get_shops_list(default_city,longitudeNew,latitudeNew,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                            }
                                        }
                                    })
                                },
                                cancel: function (res) {
                                    alert('用户拒绝授权获取地理位置');
                                },
                                fail: function (res) {
                                    // alert(JSON.stringify(res));
                                }
                            });
                        }
                    });
                }else{
                    geolocation.getCurrentPosition(function(position){
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                            var longitude =position.point.lng,
                            latitude = position.point.lat,
                            point =position.point,
                            geoc = new BMap.Geocoder();
                            if(position.accuracy == null){
                                if(default_city && default_city !="全国" && location_type==3){
                                    var result = {name : default_city};
                                    myFun(result,num,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd,point);
                                }else{
                                    geoc.getLocation(point, function(rs){
                                        var addComp = rs.addressComponents;
                                        var result = {name : addComp.city};
                                        myFun(result,num,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd,point);
                                    });
                                }
                            }else{
                                if(location_type==1){
                                    geoc.getLocation(point, function(rs){
                                        var addComp = rs.addressComponents;
                                        get_shops_list(addComp.city,longitude,latitude,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                    });
                                }else if(default_city && default_city !="全国" && location_type==3){
                                    get_shops_list(default_city,longitude,latitude,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                }else{
                                    get_shops_list(default_city,longitude,latitude,num,location_type,shops_orderby,shops_where,"shop_"+customModuleId,shops_style,is_bd);
                                }
                            }
                        }else{
                            alert("请在设置中打开定位功能");
                        }
                    },function(error){},{ enableHighAccuracy: true });
                }
            }
        }
        t.is_bd=is_bd;
        tmp_data.push(t);
    }else{
        get_def_shop_info(param_id,customModuleId,shops_style,is_bd);
    }
}

//默认加载
function get_def_shop_info(set_id,obj_id,style,bd_tag){
    $.ajax({
        url:"/wap/wapAjaxModule.php",
        type:'post',
        data:{username:user_name,set_id:set_id,is_bd:bd_tag,t:UTCTimeDemo},
        success: function(data){
            $("#shop_"+obj_id).html(data);
            if (style==4) {
                editPicHeight("shop_"+obj_id);
            }
        }
    })
}

//根据当前城市获得数据
function myFun(result,num,sortby,filter,obj,style,bd_tag,point){
    var ids     = [],
        linki   = "https://api.map.baidu.com/geosearch/v3/local?callback=?",
        param   = {
            //'region'     : cityName,
            //'page_size'  : num,
            'geotable_id': 144388,
            'ak'         : 'l3M8jnzdfgKoAB0uG2YAFIaoyHukxQ7a',
            //'sortby'   : 'is_top:-1|order_sort:-1|shop_id:-1',
            'page_index' : 0
        };
    if(parseInt(num)){
        param.page_size= parseInt(num);
    }
    param.sortby        =   sortby;
    param.filter        =   filter;
    param.page_index    =   0;
    // $.getJSON(linki,param,function(e) {
    //     var content = e.contents;
    //     var total   = e.total;
    //     $.each(content,function(i,item){
    //         var sid = item.shop_id;
    //         ids.push(sid);
    //     });
    //     var arr= ids.join(",");
    // });
    ajax_shop_list(point,'',obj,style,bd_tag);
}

//根据定位位置与城市名称获取商铺信息
function get_shops_list(city,longitude,latitude,num,is_show_loc,sortby,filter,obj,style,bd_tag){
    var linki       = "https://api.map.baidu.com/geosearch/v3/nearby?callback=?",
        param       = {
            'location'   : $.trim(longitude)+','+$.trim(latitude),
            //'page_size'  : num,
            'geotable_id': 144388,
            //'sortby'     : 'distance:1',
            'ak'         : 'l3M8jnzdfgKoAB0uG2YAFIaoyHukxQ7a',
            'radius'     : 10000000000000
        },
        ids         = [],
        distances   = [];
    if(parseInt(num)){
        param.page_size= parseInt(num);
    }

    param.sortby = sortby;
    param.filter = filter;
    if(city != '全国'){
        param.tags =city;
    }
    param.page_index=0;
    // $.getJSON(linki,param,function(e) {
    //     var content = e.contents;
    //     var total   = e.total;
    //     $.each(content,function(i,item){
    //         var sid = item.shop_id;
    //         ids.push(sid);
    //         distances.push(item.distance);
    //     });
    //     var arr= ids.join(",");
    // });
    var arr = {};
    arr['lng'] = longitude,arr['lat'] = latitude;
    ajax_shop_list(arr,distances,obj,style,bd_tag);
}

//认领商铺
function havego(id){
    $("#shops_"+id).removeAttr("onclick");
    $.ajax({
        type:'post',
        url:'/wap/shops/ajax_shops_claim.php',
        data:'id='+id+'&user_id='+wap_userid,
        success: function(data){
            if(data==0){
                showAllzz("您未登录，请登录！",{'关闭':'/dom/denglu.php?username='+user_name+'&wap=1'});
                return false;
            }else if(data==10){
                $("#shops_"+id).attr("onclick","havego("+id+");");
                showAllzz("认领失败！");
                return false;
            }else if(data==9){
                $("#shops_"+id).parents(".ev_t_product").remove();
                showAllzz("认领申请发送成功，请在个人中心查看结果！");
                return false;
            }else if(data==8){
                $("#shops_"+id).attr("onclick","havego("+id+");");
                showAllzz("等级不够，无法认领！");
                return false;
            }else if(data==7){
                $("#shops_"+id).attr("onclick","havego("+id+");");
                showAllzz("您已有自己的商铺，不能再进行认领！");
                return false;
            }else if(data==72){
                $("#shops_"+id).attr("onclick","havego("+id+");");
                showAllzz("您的商铺正在审核中，请在个人中心查看结果！");
                return false;
            }else if(data==6){
                $("#shops_"+id).attr("onclick","havego("+id+");");
                showAllzz("此商铺已被认领，不能再进行认领！");
                return false;
            }
        }
    });
}

//微商铺模块获取数据
function ajax_shop_list(arr,dis,obj,style,bd_tag){
    $.ajax({
        url:'/wap/wapAjaxModule.php',
        type:'post',
        data:{username:user_name,arr:arr,is_bd:bd_tag,distances:dis,style:style,mid:obj.replace('shop_Mo_',''),t:UTCTimeDemo},
        success: function(data){
            $('#'+obj).html(data);
            if(style==4){
                editPicHeight(obj);
            }
        }
    });
}

function editPicHeight(tId){
    var t = $("#"+tId), tImg = t.find(".banner_pic");
    if(tImg.length){
        tImg.css({"height":tImg.width(),"line-height":tImg.width()-4+'px'});
    }
}


//商铺和城市模块定位
if((show_module_js.show_shops_js || 1) || (city_setInfo_json.del_city !=1 && city_setInfo_json.click_type !=undefined && home_index)){
    function qddk(au,ps){
        var arr         =   ps.split(',');
        var longitude   =   arr[1];
        var latitude    =   arr[0];
        var point       =   new BMap.Point(longitude,latitude);
        if(show_module_js.show_shops_js){
            if(tmp_data){
                for(var i=0;i<tmp_data.length;i++){
                    if(tmp_data[i].location_type==1){
                        var geoc = new BMap.Geocoder();
                        var tmp_data_num = tmp_data[i].num,
                            tmp_data_location_type=tmp_data[i].location_type,
                            tmp_data_shops_orderby=tmp_data[i].shops_orderby,
                            tmp_data_shops_where=tmp_data[i].shops_where,
                            tmp_data_customModuleId=tmp_data[i].customModuleId,
                            tmp_data_shops_style=tmp_data[i].shops_style,
                            tmp_data_is_bd=tmp_data[i].is_bd;
                        geoc.getLocation(point, function(rs){
                            var addComp = rs.addressComponents;
                            get_shops_list(addComp.city,longitude,latitude,tmp_data_num,tmp_data_location_type,tmp_data_shops_orderby,tmp_data_shops_where,"shop_"+tmp_data_customModuleId,tmp_data_shops_style,tmp_data_is_bd);
                        });
                    }else if(tmp_data[i].default_city && tmp_data[i].default_city !="全国" && tmp_data[i].location_type==3){
                        get_shops_list(tmp_data[i].default_city,longitude,latitude,tmp_data[i].num,tmp_data[i].location_type,tmp_data[i].shops_orderby,tmp_data[i].shops_where,"shop_"+tmp_data[i].customModuleId,tmp_data[i].shops_style,tmp_data[i].is_bd);
                    }else{
                        get_shops_list(tmp_data[i].default_city,longitude,latitude,tmp_data[i].num,tmp_data[i].location_type,tmp_data[i].shops_orderby,tmp_data[i].shops_where,"shop_"+tmp_data[i].customModuleId,tmp_data[i].shops_style,tmp_data[i].is_bd);
                    }
                }
            }
        }
        if (city_setInfo_json.del_city != 1){
            var geoc = new BMap.Geocoder();
            geoc.getLocation(point, function(rs){
                var addComp = rs.addressComponents;
                $('#cityMo').find('.cityText').html(addComp.city);
                if(city_setInfo_json.click_type){
                    get_city_url(addComp.city);
                }
            });
        }
    }

    function get_city_url(new_city_name){
        var url='/wap/wapAjaxModule.php?username='+user_name+'&ajax_type=2&getUrl=1&id='+city_setInfo_json.id+'&city='+new_city_name;
        $.ajax({
            url:url,
            type:'get',
            success: function(data){
                if(data){
                    if (!is_bianji){
                        if(user_name=='wjzp2018'){
                            //window.location.href=data;
                        }else if(user_name=='yangguangvip'){
                            window.location.href=data;
                        }else{
                            if(!parseInt(readCookie('city_location_tag'))){
                                writeCookie('city_location_tag',1,24000)
                                window.location.href=data;
                            }
                        }
                    }
                }
            }
        })
    }

    if(city_setInfo_json.del_city !=1 && city_setInfo_json.click_type !=undefined && home_index){
        function clearCity(){
            $("#cityAlt").hide();
            $("#webBody").css("z-index","2");
        }
        //城市模块
        $(function(){
            // cityDrag();
            // 计算城市距离顶部位置
            /*var winH  = $(window).height();
            var cId     = $("#cityMo"),
                cTop    = parseInt(cId.css("top")),
                numTop  = cTop*winH/517;
            cId.css("top",numTop.toFixed(2)+'px');*/
            //设置为自定定位时走百度接口
            if(city_setInfo_json.location_type == 1 || !parseInt(city_setInfo_json.location_type)){
                var user_id =   wap_userid;
                var is_app  =   wap_is_app;
                var is_ios  =   wap_is_ios;
                var system  =   {win : false, mac : false, xll : false };
                var p       =   navigator.platform;
                var geoc    =   new BMap.Geocoder();
                var locationCookie = readCookie('city_location_cookie_'+user_name);
                locationCookie = '';
                if(!locationCookie){
                    var geolocation = new BMap.Geolocation();
                }
                system.win  = p.indexOf("Win") == 0;
                system.mac  = p.indexOf("Mac") == 0;
                system.x11  = (p == "X11") || (p.indexOf("Linux") == 0);
                if(system.win||system.mac||system.xll){
                    if(!locationCookie){
                        geolocation.getCurrentPosition(function(r){
                            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                                var point =r.point;
                                geoc.getLocation(point, function(rs){
                                    var addComp = rs.addressComponents;
                                    $('#cityMo').find('.cityText').html(addComp.city);
                                    writeCookie('city_location_cookie_'+user_name,addComp.city,1000*24);
                                    if(parseInt(city_setInfo_json.click_type)){
                                        get_city_url(addComp.city);
                                    }
                                });
                            }
                        }, { enableHighAccuracy: true } );
                    }else{
                        $('#cityMo').find('.cityText').html(locationCookie);
                        if(parseInt(city_setInfo_json.click_type)){
                            get_city_url(locationCookie);
                        }
                    }
                }else{
                    if(is_app){
                        if(is_ios){
                            if(!locationCookie){
                                geolocation.getCurrentPosition(function(position){
                                    var point =position.point;
                                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                                        if(position.accuracy == null){
                                            geoc.getLocation(point, function(rs){
                                                var addComp = rs.addressComponents;
                                                $('#cityMo').find('.cityText').html(addComp.city);
                                                writeCookie('city_location_cookie_'+user_name,addComp.city,1000*24);
                                                if(parseInt(city_setInfo_json.click_type)){
                                                    get_city_url(addComp.city);
                                                }
                                            });
                                        }else{
                                            geoc.getLocation(point, function(rs){
                                                var addComp = rs.addressComponents;
                                                $('#cityMo').find('.cityText').html(addComp.city);
                                                writeCookie('city_location_cookie_'+user_name,addComp.city,1000*24);
                                                if(parseInt(city_setInfo_json.click_type)){
                                                    get_city_url(addComp.city);
                                                }
                                            });
                                        }
                                    }else{
                                        alert("请在设置中打开定位功能");
                                    }
                                },{ enableHighAccuracy: true });
                            }else{
                                $('#cityMo').find('.cityText').html(locationCookie);
                                if(parseInt(city_setInfo_json.click_type)){
                                    get_city_url(locationCookie);
                                }
                            }
                        }else{
                            android.getMapPosition('');
                        }
                    }else{
                        if(!locationCookie){
                            if(use_wxchat_map){
                                var tmp_lat = readCookie('lat_'+user_name);
                                var tmp_lon = readCookie('lon_'+user_name);
                                if(tmp_lat && tmp_lon && user_name !='internet16'){
                                    $.ajax({
                                        url:'/wap/wapAjaxModule.php?ajax_type=11&username='+user_name+'&wap=1&longitude='+tmp_lon+'&latitude='+tmp_lat,
                                        type:'get',
                                        success:function(dataN){
                                            var newArr = dataN.split('$%@');
                                            var longitudeNew = newArr[0],latitudeNew = newArr[1];
                                            var wx_geocoder = new qq.maps.Geocoder({
                                                complete: function (result) {
                                                    var tmp_city = JSON.stringify(result.detail.addressComponents.city);
                                                    tmp_city =  tmp_city.replace(/\"/g, "");
                                                    $('#cityMo').find('.cityText').html(tmp_city);
                                                    // writeCookie('city_location_cookie_'+user_name,tmp_city,1000*24);
                                                    if(parseInt(city_setInfo_json.click_type)){
                                                        get_city_url(tmp_city);
                                                    }
                                                }
                                            })
                                            var wx_coord = new qq.maps.LatLng(tmp_lat, tmp_lon)
                                            wx_geocoder.getAddress(wx_coord);
                                        }
                                    })
                                }else{
                                    wx.ready(function(){
                                        wx.getLocation({
                                            success: function (res) {
                                                var lat = res.latitude; //纬度
                                                var lon = res.longitude; //经度
                                                writeCookie('lat_'+user_name,lat,1000*24);
                                                writeCookie('lon_'+user_name,lon,1000*24);
                                                var locationStr = "latitude："+lat+"，"+"longitude："+lon;
                                                $.ajax({
                                                    url:'/wap/wapAjaxModule.php?ajax_type=11&username='+user_name+'&wap=1&longitude='+lon+'&latitude='+lat,
                                                    type:'get',
                                                    success:function(dataN){
                                                        var newArr = dataN.split('$%@');
                                                        var longitudeNew = newArr[0],latitudeNew = newArr[1];
                                                        var wx_geocoder = new qq.maps.Geocoder({
                                                            complete: function (result) {
                                                                var tmp_city = JSON.stringify(result.detail.addressComponents.city);
                                                                tmp_city =  tmp_city.replace(/\"/g, "");
                                                                $('#cityMo').find('.cityText').html(tmp_city);
                                                                // writeCookie('city_location_cookie_'+user_name,tmp_city,1000*24);
                                                                if(parseInt(city_setInfo_json.click_type)){
                                                                    get_city_url(tmp_city);
                                                                }
                                                            }
                                                        })
                                                        var wx_coord = new qq.maps.LatLng(res.latitude, res.longitude)
                                                        wx_geocoder.getAddress(wx_coord);
                                                    }
                                                })
                                            },
                                            cancel: function (res) {
                                                alert('用户拒绝授权获取地理位置');
                                            },
                                            fail: function (res) {
                                                alert(JSON.stringify(res));
                                            }
                                        });
                                    });
                                }
                            }else{
                                geolocation.getCurrentPosition(function(position){
                                    var point =position.point;
                                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                                        if(position.accuracy == null){
                                            geoc.getLocation(point, function(rs){
                                                var addComp = rs.addressComponents;
                                                $('#cityMo').find('.cityText').html(addComp.city);
                                                writeCookie('city_location_cookie_'+user_name,addComp.city,1000*24);
                                                if(parseInt(city_setInfo_json.click_type)){
                                                    get_city_url(addComp.city);
                                                }
                                            });
                                        }else{
                                            geoc.getLocation(point, function(rs){
                                                var addComp = rs.addressComponents;
                                                $('#cityMo').find('.cityText').html(addComp.city);
                                                writeCookie('city_location_cookie_'+user_name,addComp.city,1000*24);
                                                if(parseInt(city_setInfo_json.click_type)){
                                                    get_city_url(addComp.city);
                                                }
                                            });
                                        }
                                    }else{
                                        alert("请在设置中打开定位功能");
                                    }
                                },{ enableHighAccuracy: true });
                            }

                        }else{
                            $('#cityMo').find('.cityText').html(locationCookie);
                            if(parseInt(city_setInfo_json.click_type)){
                                get_city_url(locationCookie);
                            }
                        }
                    }
                }
            }else if (city_setInfo_json.location_type == 2){
                $('#cityMo').find('.cityText').html('全国');
            }else if (city_setInfo_json.location_type == 3){
                var set_city    =   city_setInfo_json.city;
                var def_city    =   set_city.split('#');
                $('#cityMo').find('.cityText').html(def_city[1]);
                if(parseInt(city_setInfo_json.click_type)){
                    get_city_url(def_city[1]);
                }
            }

            if(!parseInt(city_setInfo_json.click_type)){
                $("#cityMo").on("click",function(){
                    $("#cityAlt").show();
                    $("#webBody").css("z-index","81");
                    var current_city=$('#cityMo').find('.cityText').html();
                    var url='/wap/wapAjaxModule.php?username='+user_name+'&ajax_type=2&id='+city_setInfo_json.id;
                    if(current_city !='全国'){
                        url+='&city='+current_city;
                    }
                    $.ajax({
                        url:url,
                        type:'get',
                        success: function(data){
                            if(data){
                                $('#cityAlt').find('.cityList').html(data);
                            }
                        }
                    })
                })
            }
        });

        // 计算城市左侧距离
        function cityDrag() {
            if($("#cityMo").length){
                var winW = $("#wrapper").width();
                winW = winW < 768 ? winW : 768;
                var this_ = $("#cityMo"), thisW = this_.attr("data-width"), thisH = this_.height();
                var iPicLeft = parseFloat(this_.attr("data-left")).toFixed(4);
                if(iPicLeft > winW){
                    thisW = 93;
                    var iPicLeftPx = winW-thisW;
                    this_.css({'left':iPicLeftPx+"px"});
                }else{
                    if(isNaN(iPicLeft)){
                        var iPicLeftPx = winW-thisW;
                    }else if(iPicLeft == 0){
                        var iPicLeftPx = 0;
                    }else{
                        var iPicLeftPx = (iPicLeft*winW)-(thisW/2);
                    }
                    this_.css({'left':(iPicLeftPx/320).toFixed(2)+"px"});
                }
            }
        }
    }
}


//容器上传图片回调
function reset_img_url(url,id){
    if(id && url){
        $('#'+id).find('.FreeImg_max img').attr('src',url);
    }
}

function focusFun(o){
    var focusId = $("#"+o).find(".focusimg"),
    focusW  = focusId.width(),
    focusP  = focusId.find(".focusPage"),
    typeN   = focusId.attr("type"),
    focusUl = focusId.find(".focusInfo ul"),
    focusLi = focusId.find(".focusInfo li"),
    liLength= focusLi.length,
    numW = Math.ceil(focusW*liLength),
    scrollW = focusW,
    pageH = '',
    pageN = 0;
    if(typeN == 1){
        for(var i=0; i<liLength; i++){
            if(i == 0){
                pageH += '<span class="cur"></span>';
            }else{
                pageH += '<span></span>';
            }
        }
        focusId.find("li").width(focusW);
    }else if(typeN == 2){
        for(var i=0; i<liLength; i++){
            var imgSrc = focusId.find(".focusInfo li:eq("+i+") img").attr("src");
            if(i == 0){
                pageH += '<span class="cur" style="width:'+100/liLength+'%;"><em><img src="'+imgSrc+'"></em></span>';
            }else{
                pageH += '<span style="width:'+100/liLength+'%;"><em><img src="'+imgSrc+'"></em></span>';
            }
        }
        focusId.find("li").width(focusW);
    }else if(typeN == 3 || typeN == 4){
        if(liLength < 3){
            focusUl.append(focusUl.html());
            if(liLength < 2){
                focusUl.append(focusUl.html());
            }
        }
        liLength = 4;
        focusId.find("li").width(focusW/3);
        focusId.find("li:first").addClass("cur");
        focusId.find("li:last").insertBefore(focusId.find("li:first"));
        scrollW = focusW/3;
        numW = Math.ceil(focusW*liLength);
        if(typeN == 4){
            for(var i=0; i<liLength; i++){
                if(i == 0){
                    pageH += '<span class="cur"></span>';
                }else{
                    pageH += '<span></span>';
                }
            }
            focusId.find("li").each(function(){
                $(this).find(".pic").height($(this).width());
            })
        }
    }else if(typeN == 5){
        for(var i=0; i<liLength; i++){
            if(i == 0){
                pageH += '<span class="cur"></span>';
            }else{
                pageH += '<span></span>';
            }
        }
        focusId.find("li").width(focusW/3*2);
        numW = Math.ceil((focusW/3+5)*2*liLength);
        scrollW = focusW/3*2;
    }
    focusP.html(pageH);
    focusUl.width(numW+'px');
    function focusTime(){
        var sLeft = focusId.find(".focusInfo").scrollLeft();
        focusId.find(".focusInfo").animate({scrollLeft:scrollW},function(){
            focusId.find(".focusInfo li:first").insertAfter(focusId.find(".focusInfo li:last"));
            focusId.find(".focusInfo").scrollLeft(0);
        });
        if(typeN == 3 || typeN == 4){
            focusId.find(".focusInfo li.cur").removeClass("cur").next().addClass("cur");
        }
        if(pageN == liLength-1){
            pageN = 0;
            /*sLeft = 0;
            focusId.find(".focusInfo").animate({scrollLeft:sLeft});*/
            focusP.find("span").removeClass("cur").eq(pageN).addClass("cur");
        }else{
            ++pageN
            /*sLeft += focusW;
            focusId.find(".focusInfo").animate({scrollLeft:sLeft});*/
            focusP.find("span").removeClass("cur").eq(pageN).addClass("cur");
        }
    }
    var timeObj = setInterval(focusTime,2000);
}

if(is_bianji){
    function update_other_con_html(name,ch_ids) {
        name = $.trim(name);
        $.post("/wap/ajax_module.php?username="+user_name+"&name="+ name, function(data) {
            if ($.trim(data) != 'fail') {
                var myobj = eval('('+data+')');
                if (name == 'top') {
                    $("#top_area").find(".topBarL").html(myobj.login);
                    $("#top_area").find(".topBarR").html(myobj.fun);
                } else if(name == 'logo') {
                    $("#logo").html(myobj.logo);
                    if (myobj.type == 1) {
                        $("#logo").parent().css("height","auto");
                    } else {
                        $("#logo").parent().removeAttr("style");
                    }
                    if(ch_ids == undefined){
                        if(!home_index && css_channel_id){
                            $('#header').hide();
                        }
                    }else{
                        if(ch_ids.length >0 && !home_index){
                            if(ch_ids.indexOf(css_channel_id) == -1){
                                $('#header').hide();
                            }
                        }
                    }
                } else if (name == 'link') {
                    if ($.trim(myobj.msg)) {
                        $("#blogroll").find(".MoBodyC").html(myobj.msg);
                    } else {
                        $("#blogroll").find(".blogrollTxt").html(myobj.txt);
                        $("#blogroll").find(".blogrollPic").html(myobj.pic);
                    }
                } else if (name == 'foot_doc') {
                    $("#footer_nav").html(myobj.foot_doc);
                } else if (name == 'foot') {
                    $("#copyright").html(myobj.foot_con);
                } else if (name == 'channel') {
                    $("#nav").find(".NMain").html(myobj.channel);
                } else if (name == 'search') {
                    $("#sysSearch").find('.searchBg i').html(myobj.search_keyword);
                }
            }
        })
    }
    function update_module_con_html(module_id,is_action) {
        if(!is_action){
            is_action = 0;
        }
        var timestamp = Date.parse(new Date());
        $.post("/wap/ajax_module.php?username="+user_name+"&module_id="+ module_id+'&action='+is_action, function(data) {
            if ($.trim(data)) {
                var myobj = JSON.parse(data);
                $("#Mo_"+module_id).find(".NameTxt").html(myobj.name);
                $("#Mo_"+module_id).find(".MoMore").html(myobj.mylink);
                if(myobj.mtype == 32 && !$('#shop_and_city_js').length){
                    var  whenArray = [],head = $('head');
                    (function(){
                        var src5 = 'https://api.map.baidu.com/getscript?v=3.0&ak=l3M8jnzdfgKoAB0uG2YAFIaoyHukxQ7a&services=&t='+timestamp,
                            script5 = $.getScript(src5, function(data, textStatus, jqxhr) {
                                if(!$('#shop_and_city_js').length){
                                    var scriptDom = document.createElement('script');
                                    scriptDom.type = 'text/javascript';
                                    scriptDom.id = 'shop_and_city_js';
                                    scriptDom.src = src5;
                                    head[0].appendChild(scriptDom);
                                }
                            });

                        whenArray.push(script5);
                        $.when.apply(this, whenArray).done(function(){
                            if ($.trim(myobj.con)) $("#Mo_"+module_id).find(".MoBodyC").html(myobj.con);
                        });
                    })();
                }else if(myobj.mtype == 9 && !$('#statistics_js').length && myobj.statistics==1){
                    $('head').append('<link id="statistics_css" rel="STYLESHEET" type="text/css" href="//aimg8.oss-cn-shanghai.aliyuncs.com/plugins/public/dhtmlxChart/dhtmlxchart.min.css">');
                    var  whenArray = [],head = $('head');
                    (function(){
                        var src4 = '//aimg8.oss-cn-shanghai.aliyuncs.com/plugins/public/dhtmlxChart/dhtmlxchart.min.js',
                            script4 = $.getScript(src4, function(data, textStatus, jqxhr) {
                                if(!$('#statistics_js').length){
                                    var scriptDom = document.createElement('script');
                                    scriptDom.type = 'text/javascript';
                                    scriptDom.id = 'statistics_js';
                                    scriptDom.src = src4;
                                    head[0].appendChild(scriptDom);
                                }
                            });
                        whenArray.push(script4);
                        $.when.apply(this, whenArray).done(function(){
                            if ($.trim(myobj.con)) $("#Mo_"+module_id).find(".MoBodyC").html(myobj.con);
                        });
                    })();
                }else if(myobj.mtype == 63 && myobj.rid){
                    if ($.trim(myobj.con)) $("#row_"+myobj.rid).html(myobj.con);
                    // $("#row_"+myobj.rid).find('.classifyTit li').each(function(){
                    //     var classify_mid = $(this).attr('data-classify_mid');
                    //     if(classify_mid == module_id){
                    //         public.changeMo(this);
                    //     }
                    // })
                }else if(myobj.mtype == 8 && !$('#qq_map_js').length){
                    console.log($('#qq_map_js').length);
                    var  whenArray = [],head = $('head');
                    (function(){
                        var src6 = '/js/wap/qq_map_load.js?t='+timestamp,
                            script6 = $.getScript(src6, function(data, textStatus, jqxhr) {
                                if(!$('#qq_map_js').length){
                                    var scriptDom = document.createElement('script');
                                    scriptDom.type = 'text/javascript';
                                    scriptDom.id = 'qq_map_js';
                                    scriptDom.src = src6;
                                    head[0].appendChild(scriptDom);
                                }
                            });
                            script7 = $.getScript('https://mapapi.qq.com/jsapi_v2/2/4/132/main.js', function(data, textStatus, jqxhr) {
                                if(!$('#qq_map_o_js').length){
                                    var scriptDom = document.createElement('script');
                                    scriptDom.type = 'text/javascript';
                                    scriptDom.id = 'qq_map_o_js';
                                    scriptDom.src = 'https://mapapi.qq.com/jsapi_v2/2/4/132/main.js';
                                    head[0].appendChild(scriptDom);
                                }
                            });

                        whenArray.push(script6,script7);
                        $.when.apply(this, whenArray).done(function(){
                            if ($.trim(myobj.con)) $("#Mo_"+module_id).find(".MoBodyC").html(myobj.con);
                        });
                    })();
                }else{
                    if ($.trim(myobj.con)){
                         $("#Mo_"+module_id).find(".MoBodyC").html(myobj.con);
                         var shortVideoModule_style2 =  $("#Mo_"+module_id).find('.shortVideoModule_style2');
                         if(shortVideoModule_style2.length){
                             videoTowColum(null, shortVideoModule_style2);
                         }
                    }
                }
                if ($.trim(myobj.css)) $("#ActionStyle").append(myobj.css);
                if ($.trim(myobj.css)) $("#Mstyle").append(myobj.css);
                var motype = $('#Mo_'+module_id).attr('motype');
                if($.trim(myobj.js)){
                    $('#Mo_'+module_id).append('<script>$(function(){'+myobj.js+'})</script>');
                }
                wsf.imgLazyLoading($('#Mo_'+module_id).find('.MoBodyC'));
                if(motype == 7) {
                    changeModule7PicHeight(module_id);
                }
                if(motype == 17){
                    if(is_action){
                        curButGroup.editButItem('Mo_'+module_id);
                    }
                    ButGroupLeftPosition();
                }
            }
        })
    }

    //浮动客服联动显示args.change_type: 1状态更改触发 2上传图片触发
    function changeFloatServiceStatus(args){
        if(!args) return false;
        var obj = $('#float_service_'+args.type);

        if(args.change_type == 1){
            var iconStr = args.icon ? '<img src="'+args.icon+'"></p>' : '<i class="'+args.icon_class+'" style="color:'+args.icon_color+'"></i>';
            if(obj.length){
                obj.find('p').html(iconStr);
                if(args.status == 1){
                    obj.show();
                }else{
                    obj.hide()
                }
            }else{
                var str =  '<div class="open-icon" id="float_service_'+args.type+'">\
                                <span></span>\
                                <p>'+iconStr+'</p>\
                            </div>';
                $('#frontWapFloatService').append(str)
            }
        }else if(args.change_type == 2){
            if(args.icon){
                obj.find('p').html('<img src="'+args.icon+'">');
            }else if(args.icon_class){
                obj.find('p').html('<i class="'+args.icon_class+'" style="color:'+args.icon_color+'"></i>');
            }
        }
    }

    function changeModule7PicHeight(module_id) {
        var prolist_id = $('#Mo_'+module_id).find(".exhibition_map").attr('id');
        prolist_id = $('#'+prolist_id);
        var li_w = prolist_id.find("li").width();
        prolist_id.find("li .pic").css({"height":li_w-10,"line-height":li_w-14+'px'});
        prolist_id.find("li.img_c").each(function(){
            var P_height = $(this).find(".text_list_bk").height();
            $(this).find(".text_list_bk").css("margin-top",-P_height/2);
        });
    }
}

function updateFormFieldUploadfile(fieldId, filePath) {
    if (/(.JPG|.GIF|.JPEG|.PNG)(\?\d+)/.test(filePath.toUpperCase()) === false) {
        $("#field_"+ fieldId +"_box").hide();
    } else {
        $("#field_"+ fieldId +"_box").show();
        $("#field_"+ fieldId +"_box span").html('<img src="'+ filePath +'">');
    }

    $("#error_"+ fieldId).html("");
    $("#field_"+ fieldId).css("background-image", "none");
    $("#field_"+ fieldId).val(filePath);
    $('#formAlertFrame').find(".alt_close_frame").trigger('click');
}

//表单方法
function formMo(curDom){
    var formAlertFrame = $('#formAlertFrame');
    curDom = curDom || $('.inputCustomForm');
    curDom.each(function(i, dom){
        dom = $(dom);
        dom.on('click', '.fieldTypeUploadFile,.fieldTypeUploadFileClean',function(){
            var $this = $(this),
                thisId = $this.data("id");
            switch(true){
                case $this.hasClass('fieldTypeUploadFile'):
                    if (!thisId) {
                        return false;
                    }
                    formAlertFrame.find('iframe').attr("src", "/dom/FormFile.php?username="+user_name+"&wap=1&field_id="+ thisId).load(function(){
                        formAlertFrame.find(".alt_loading").remove();
                    });
                    formAlertFrame.show();
                    break;
                case $this.hasClass('fieldTypeUploadFileClean'):
                    if (!(thisId * 1)) {
                        return false;
                    }
                    $("#field_" + thisId + "_box").hide();
                    $("#field_"+ thisId).val("");
                    $("#field_"+ thisId).attr("style", $this.data("style"));
                    // formAlertFrame.find(".alt_close_frame").trigger('click');
                    break;
            }
        });
    });
    if(!formAlertFrame.length && curDom.length){
        (function(){
            formAlertFrame = $('<div class="alt_frame" id="formAlertFrame" style="display:none;"><div class="alert_frame_bg"></div><div class="alert_frame_margin"><div class="alert_frame_content"><div class="alt_loading"></div><div class="alt_close_frame"><a href="javascript:;">X</a></div><iframe src=""></iframe></div></div></div>');
            $('body').append(formAlertFrame);
            formAlertFrame.on({
                'click': function () {
                    formAlertFrame.find("iframe").attr("src","");
                    formAlertFrame.hide();
                }
            }, '.alt_close_frame');
        })();
    }
}

//表单文件上传
/*if(formUploadFile){
    function updateFormFieldUploadfile(fieldId, filePath) {
        if (/(.JPG|.GIF|.JPEG|.PNG)(\?\d+)/.test(filePath.toUpperCase()) === false) {
            $("#field_"+ fieldId +"_box").hide();
        } else {
            $("#field_"+ fieldId +"_box").show();
            $("#field_"+ fieldId +"_box span").html('<img src="'+ filePath +'">');
        }

        $("#error_"+ fieldId).html("");
        $("#field_"+ fieldId).css("background-image", "none");
        $("#field_"+ fieldId).val(filePath);
        $(".alt_close_frame").trigger('click');
    }

    $(function() {
        $(".fieldTypeUploadFile").on("click", function() {
            var id = $(this).data("id");
            if (!id) {
                return false;
            }

            $("#alt_iframe").attr("src", "/dom/FormFile.php?username="+user_name+"&wap=1&field_id="+ id).load(function(){
                $("#alt_loading").remove();
            });
            $(".alt_frame").show();
        });

        $(".fieldTypeUploadFileClean").on("click", function() {
            var id = parseInt($(this).data("id"));
            if (!id) {
                return false;
            }
            $("#field_"+ id +"_box").hide();
            $("#field_"+ id).val("");
            $("#field_"+ id).attr("style", $(this).data("style"));
            $(".alt_close_frame").trigger('click');
        });

        $(".alt_close_frame").on("click", function() {
            $(".alt_frame").hide();
            $("#alt_iframe").attr("src","");
        });
    });
}*/

//容器模块JS
if(show_module_js.show_container_js || is_bianji){
    // $(function(){
    //     var max_w = $("#add_container").width();
    //     var min_int = (( max_w / 750 )*100 ).toFixed(4);
    //     $("#add_container").parents("html").css("font-size",min_int+"px");
    // });
    // $(window).resize(function(){
    //     var max_w = $("#add_container").width();
    //     var min_int = (( max_w / 750 )*100 ).toFixed(4);
    //     $("#add_container").parents("html").css("font-size",min_int+"px");
    // });
}
// 标签容器标签宽度rem计算
function classifyRem(obj){
    $("#"+obj).find(".titfont").each(function(){
        var W = parseInt($(this).css("width")),
            mini_W = W / 44.93,
            Small_W = mini_W.toFixed(4);
        var H = parseInt($(this).css("height")),
            mini_H = H / 44.93,
            Small_H = mini_H.toFixed(4);
        $(this).css({"width":Small_W+"rem","height":Small_H+"rem","line-height":Small_H+"rem"});
    });
}
// 自由容器宽高计算
function containerWandH(obj){
    var max_H = parseInt($("#"+obj).find(".freeRoom_Mo").css("height")),
            Mod = max_H / 44.93,
            Mod_H = Mod.toFixed(4);
            $("#"+obj).find(".freeRoom_Mo").css("height",Mod_H+"rem");
    $("#"+obj).find(".freeMo").each(function(){
        var Top_int = parseInt($(this).css("top")),
            num_T = Top_int / 44.93,
            int_T = num_T.toFixed(4);
        var Left_int = parseInt($(this).css("left")),
            num_L = Left_int / 44.93,
            int_L = num_L.toFixed(4);
        $(this).css({"top":int_T+"rem","left":int_L+"rem"});
        var W = parseInt($(this).css("width")),
            mini_W = W / 44.93,
            Small_W = mini_W.toFixed(4);
        var H = parseInt($(this).css("height")),
            mini_H = H / 44.93,
            Small_H = mini_H.toFixed(4);
        if(W == 330){
            $(this).css({"width":"100%","height":Small_H+"rem"});
        }else{
            $(this).css({"width":Small_W+"rem","height":Small_H+"rem"});
        }
    });
}
//页面初始化执行的方法
$(function() {
    var document_h = $(window).height();
    $("#wrapper").css({
        "min-height": document_h + 'px'
    });
    (function() {
        var rollIconMo = $('.rollIconMo');
        if(rollIconMo.length){
            rollIconMo.each(function(i, dom) {
                dom = $(dom);
                dom.find(".swiper-slide").width(dom.width());
                dom.find(".rollMain").width(dom.width() * dom.find(".swiper-slide").length);

                dom.find(".pic").each(function() {
                    var size = $(this).parent().parent().width();
                    $(this).css({
                        "width": size,
                        // "height": size
                    });
                });
            });
            var swiper = new Swiper(".rollbox", {
                pagination: {
                    el: ".touch_dot"
                }
            });
        }
        window.indexArr = [];
        setDownTime();
    })();

    // 表单方法
    formMo();
});

function countDownTime (thisS, startTime, endTime, index) {
    var thisTime = (Date.parse(new Date())/1000);
    var str = "";
    if (typeof thisS == "undefined") {
        return false;
    }
    if (endTime < thisTime) { // 活动已结束
        thisS.html("已结束");
    } else {
        var surplusTime = 0;
        var sign = false, target = false;
        if (!target) {
            if (startTime > thisTime) { // 还未开始
                surplusTime = startTime - thisTime;
                sign = true;
            } else { // 正在进行
                surplusTime = endTime - thisTime;
                sign = false;
            }
        }
        window.indexArr[index] = setInterval(function() {
            if (surplusTime <= 0) {
                if (sign) {
                    surplusTime = endTime - thisTime;
                    if (surplusTime <= 0) {
                        clearInterval(window.indexArr[index]);
                        thisS.html("已结束");
                    } else {
                        target = true; // 不在对剩余时间重新赋值
                    }
                } else { // 结束
                    clearInterval(window.indexArr[index]);
                    thisS.html("已结束");
                }
            } else {
                if (sign) {
                    var tmp = "距开团";
                    if (target) {
                        tmp = "距结束";
                    }
                } else {
                    var tmp = "距结束";
                }
                var day = Math.floor(surplusTime / (24 * 3600));
                var hour = Math.floor((surplusTime - day * 24 * 3600) / 3600);
                var minute = Math.floor((surplusTime - day * 24 * 3600 - hour * 3600) / 60);
                var second = surplusTime - day * 24 * 3600 - hour * 3600 - minute * 60;
                var dayStr = day>0 ? '<span >' + day + '</span>天' :'';
                var hourStr = hour>0 ? '<span >' + hour + '</span>时' :'';
                var minuteStr = minute>0 ? '<span >' + minute + '</span>分' :'';
                if(tmp == '距结束' && thisS.parent().find('.now a').html() !='立即抢购'){
                    thisS.parent().find('.now a').html('立即抢购');
                    thisS.parent().find('.now').removeClass('disable');
                }
                var str = [ tmp + ':',
                            dayStr,
                            hourStr,
                            minuteStr,
                            '<span>' + second + '</span>秒'].join("");
                thisS.html(str);
                surplusTime--;
            }
        }, 1000);
    }
}
function setDownTime(){
    $('.article').each(function(index, dom) {
        dom = $(dom);
        if(!dom.data('downtime')){
            var timDom = dom.find('.countDownTime'),
                startTime = parseInt(timDom.data("start")), endTime = parseInt(timDom.data("end"));
            window.indexArr[index] = null;
            countDownTime(timDom, startTime, endTime, index);
            dom.data('downtime',1);
        }
    });
}
function get_tuan_module_list(obj_id,set_id,page){
    $('#Mo_'+obj_id).find('.tuan_more').html('<img src="/images/loading.gif">');
    var t = Date.parse(new Date());
    $.ajax({
        url:'/wap/wapAjaxModule.php?ajax_type=7&username='+user_name+'&page='+page+'&module_id='+obj_id+'&set_id='+set_id+'&t='+t,
        type:'get',
        success:function(data){
            $('#Mo_'+obj_id).find('.tuan_more').remove();
            if(data){
                $('#Mo_'+obj_id).find('.section').append(data);
                setDownTime();
            }
        }
    })
}

function wapFileDown(id,channel_id){
    var zz_userid = readCookie('zz_userid');
    var is_wx = is_weixn();

    if(is_wx === false) {
        $(".webBody").append('<div class="login_alt" id="app_login" onmousedown="del_appAlt()"><div class="login_bg"></div><div class="login_alt_c"><img src="/images/ex_notice.png" style="width:100%;"></div></div>');
        return false;
    }

    $.ajax({
        url:'/wap/wapAjaxModule.php?username='+user_name+'&wap=1&ajax_type=9&channel_id='+channel_id+'&doc_id='+id,
        type:'get',
        success:function(data){
            var newData = $.parseJSON(data);
            var tag = (newData.tag)*1,
                appendStr ='',
                down_method = parseInt(newData.down_method),
                down_price = parseFloat(newData.down_price),
                title = newData.title,
                detail_url = newData.detail_url,
                file_url = newData.file_url;
            if (!parseInt(tag)) {
                if(!is_wx){
                    $("#downLoadDemo").show();
                    return false;
                }
            }else{
                if(!zz_userid){
                    var loginUrl    = '/dom/denglu.php?username='+user_name+'&wap=1';
                    showAllzz('您还没有登录！',{'登录':loginUrl,'关闭':'###'});
                    return false;
                }
            }

            if(down_method == 2){
                appendStr= '<div class="login_alt" id="app_login"><div class="login_bg"></div><div class="login_alt_c"><div class="login_center" style="height:200px; margin-top:-100px;"><form name="check_pwd" id="check_pwd" method="post" action="/dom/down_order.php?username='+user_name+'&wap=1&orderType=down_file&ch_id='+channel_id+'"><input type="hidden" name="file_id" id="doc_id" value="'+id+'"/><h2 style="overflow:hidden;"><em style="max-width:50%; overflow:hidden; display:inline-block; float:left;">'+title+'</em>下载</h2><div class="form_list"><div style="padding:5px 18px; font-size:16px; line-height:25px;">价格：<em style="color:#f00;">￥'+down_price+'</em></div><div style="padding:0 18px; font-size:12px; line-height:25px;">注：购买成功后可以重复下载。</div></div><div class="form_btn"><a href="###" class="submit_btn" onclick="wap_doc_down_sub('+down_method+')" style="width:80px;">立即购买</a><a href="###" class="clear_btn" onclick="del_appAlt()" style="width:80px;">取消</a></div></form></div></div></div>';
            }else if(!down_method){
                appendStr = '<div class="login_alt" id="app_login"><div class="login_bg"></div><div class="login_alt_c"><div class="login_center"><form name="check_pwd" id="check_pwd" method="post" action="/wap/downFile.php?username='+user_name+'&channel_id='+channel_id+'&doc_id='+id+'"><h2 style="overflow:hidden;"><em style="max-width:50%; overflow:hidden; display:inline-block; float:left;">'+title+'</em>下载--用户口令</h2><div class="form_list"><label>口令：</label><p><input type="password" name="password" id="pwd" value="" style="width:auto"><em id="error_msg" style="display:none"></em><input type="hidden" name="doc_id" id="doc_id" value="'+id+'"><input type="hidden" name="tag" id="tag" value="'+tag+'"></p></div><div class="form_btn"><a href="###" onclick="wap_doc_down_sub('+down_method+')" class="submit_btn" >提交</a><a href="###" class="clear_btn" onclick="del_appAlt()">取消</a></div></form></div></div></div>';
            }
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                $(".webBody").append('<div class="login_alt" id="app_login" onmousedown="del_appAlt()"><div class="login_bg"></div><div class="login_alt_c"><img src="/images/ex_notice.png" style="width:100%;"></div></div>');
                return false;
            }

            if(parseInt(tag)){
                if (parseInt(tag) == 2) {
                    //跳转到订单详细页
                    window.location.href = detail_url;
                } else if (parseInt(tag) == 3) {
                    //跳转到支付页面
                    window.location.href = '/wap/downFile.php?username='+user_name+'&channel_id='+channel_id+'&doc_id='+id;
                } else if (parseInt(tag) == 1) {
                    //显示弹窗
                    $('.webBody').append(appendStr);
                }
            }else{
                if(wap_is_ios){
                    // window.ev123:downLoadFile(file_url);
                }else if(wap_is_app){
                    window.android.downLoadFile(file_url);
                }else{
                    window.location.href='/wap/downFile.php?username='+user_name+'&channel_id='+channel_id+'&doc_id='+id;
                }
            }
        }
    })
}

/*论坛帖子图片计算*/
function luntan_pic(id){
    var curDom = $('#Mo_'+id),
        Three_div = curDom.find("div.Three_div");
        if(Three_div.length){
            var H_img = curDom.find(".Three_div").find("li").eq(0).width();
            Three_div.find("label").css("height",H_img+"px");
            Three_div.find("img").each(function(){
                var img_ = new Image(),
                    that = $(this),
                    pw = that.parent().width(),
                    ph = that.parent().height();
                img_.src = $(this).attr("src");
                img_.onload = function(){
                    var min_img = (ph*this.width)/this.height;
                    if(pw <= min_img){
                        var l_ = min_img - pw;
                        that.css("margin-left",-(l_/2));
                    }else{
                        var min_img_H = ((pw*this.height)/this.width)- ph;
                        that.css({"width":pw,"height":"initial","margin-top":-(min_img_H/2)});
                    }
                };
            });

        }
}
function wap_doc_down_sub(wap_doc_down_method){
    var pwd=$.trim($('#pwd').val());
    var id=$('#doc_id').val();
    if (!parseInt(wap_doc_down_method)) {
        if(pwd){
            $('#error_msg').html('');
            $('#error_msg').hide();
            $('#check_pwd').submit();
        }else{
            $('#error_msg').html('密码不能为空！');
            $('#error_msg').show();
            return false;
        }
    } else if (parseInt(wap_doc_down_method) == 2) {
        $('#error_msg').hide();
        $('#check_pwd').submit();
    }
}
function del_appAlt(){
    $("#app_login").remove();
}

function img_size(id, pic_size,pic_w){
    var obj = $("#prolist_"+id);
    obj.find(".demo1").css("float","none");
    var li_w = obj.find("li .inner").width();
    var tmp_set=parseInt(pic_size);
    if(tmp_set){
        li_w=pic_w;
        obj.find(".pic img").css("height",li_w+"px");
        obj.find("li .pic").css({"height":li_w});
    }else{
        var img = obj.find("li .pic img")[0];
        var tmp_w=obj.find("li .pic").width();
        img.onload = function(){
            //方法一
            getImgNaturalDimensions(img, function(dimensions){
                obj.find("li .pic").height(dimensions.h/dimensions.w*tmp_w);
            });
        }
    }
    obj.find("li.img_c").each(function(){
        var P_height = $(this).find(".text_list_bk").height();
        $(this).find(".text_list_bk").css("margin-top",-P_height/2);
    });
}

function getImgNaturalDimensions(oImg, callback) {
    var nWidth, nHeight;
    if (!oImg.naturalWidth) { // 现代浏览器

        nWidth = oImg.naturalWidth;
        nHeight = oImg.naturalHeight;
        callback({w: nWidth, h:nHeight});

    } else { // IE6/7/8
        var nImg = new Image();

        nImg.onload = function() {
             var nWidth = nImg.width,
                 nHeight = nImg.height;
           callback({w: nWidth, h:nHeight});
        }
        nImg.src = oImg.src;
    }
}


function wap_module_location(url){
    if(!url) return false;
    window.location.href=url;
}

//微信下调用内置地图
function mapLocation(lat,lng,name,addr,href){
    if(user_name == 'tx800'){
        wx.ready(function(){
            wx.openLocation({
                latitude : parseFloat(lat), // 纬度，浮点数，范围为90 ~ -90
                longitude :parseFloat(lng), // 经度，浮点数，范围为180 ~ -180。
                name : name, // 位置名
                address : addr, // 地址详情说明
                scale : 28 // 地图缩放级别,整形值,范围从1~28。默认为最大
            })
        })
    }else{
        if(!use_wxchat_map){
            window.location.href=href;
        }else{
            wx.ready(function(){
                wx.openLocation({
                    latitude : parseFloat(lat), // 纬度，浮点数，范围为90 ~ -90
                    longitude :parseFloat(lng), // 经度，浮点数，范围为180 ~ -180。
                    name : name, // 位置名
                    address : addr, // 地址详情说明
                    scale : 28 // 地图缩放级别,整形值,范围从1~28。默认为最大
                })
            })
        }
    }
}
//首页，内页头部浮动BUG修复（冯婷）
$(function(){
    var onshow = $("#blankHead").attr("visible"),
        Tstyle = $('#header').css("position");
    if(is_bianji == 1){
        console.log(1)
        if(home_index == 1){
            //首页
            $('#header').css("top", '0px');
            if($('#header').css("display") == 'none'){
                $('#headerH').css("display", 'none');
            }

        }else{
            // 内页
            if(onshow == 'show'){
                if(Tstyle == 'fixed'){
                    $('#header').css("top", '41px');
                }else{
                    $("#header").css("top", '0px');
                }
            }else{
                $("#header").css("top", '41px');
            }
        }
    }else{
        if(home_index == 1){
            //首页
            $('#header').css("top", '0px');
        }else{
            // 内页
            if(onshow == 'show'){
                if(Tstyle == 'fixed'){
                    $('#header').css("top", '41px');
                }else{
                    $("#header").css("top", '0px');
                }
            }else{
                $("#header").css("top", '0px');
            }
        }
    }
})
