function fengxiang(){
        var ua = navigator.userAgent.toLowerCase();
        var is_weixn = (ua.match(/MicroMessenger/i)=="micromessenger") ? 1 : 0;
    if(is_weixn || wap_userid == 424150){
        var id           = $('input[id=id]').val();
        var fx_display   = $('input[id=fxtag]').val() > 0 ? 'display:none' : ''; //推广产品标记
        var fx_width     = $('input[id=fxtag]').val() > 0 ? 'width:100%' : ''; //推广产品标记
        if (id) {
            //弹窗是否已存在
            if ($('.shareAlert_boxshadow').length > 0) {
                $('.shareAlert_boxshadow').show();
            } else {
                var fxWrap = $('body');
                var span = '<div class="shareAlert_boxshadow"><div class="alert_share"><ul class="alert_share_body"><li style="'+fx_display+'"><div class="img"><img src="/templates/wap/publish_coupon/images/sharef.png" onclick="wxShareFriend()"></div><div class="txt">微信好友</div></li><li style="'+fx_width+'"><div class="img"><img src="/templates/wap/publish_coupon/images/shares.png" onclick="wxSaveShare()"></div><div class="txt">保存海报</div></li></ul><div class="alert_share_foot" onclick="wxShareComplete()">取消</div></div></div>';
                fxWrap.append(span);
            }
        } else {
            fJson.weixin();
        }
    }else{
        if (wap_is_app == 1 || wap_is_ios == 1 || parseInt(APP_V)>=2) {
            return false;
        }
        var _f = this;
        var dW = $(document).width(),dH = $(document).height(),scT = $(document).scrollTop(),
            wW = $(window).width(),wH = $(window).height();
        var fxZ = $('<div class="allzz"></div>');
        fxZ.css({height:dH}).appendTo("body");
        var fxWrap = $('<div class="fx-wrap"></div>');
        //fxWrap.css({position:'fixed',left:'50%',top:'50%',marginLeft:"-25%",marginTop:"-25%",zIndex:2000});
        // var fenA = ["tenxT","tenxZ","sinaT","renren","douban"];
        var fenA = ["tenxZ","sinaT","douban"];
        for(var i = 0;i < fenA.length;i++){
            var span = '<span class="fx-but '+fenA[i]+'" data-id="'+fenA[i]+'"></span>';
            fxWrap.append(span);
        }
        fxWrap.appendTo("body");
        fxWrap.on({
            click : function(){
                var dataId = $(this).data('id');
                fJson[dataId]();
                fxZ.remove();
                fxWrap.remove();
            }
        },'span');
        fxZ.on("click",function(){
            fxZ.remove();
            fxWrap.remove();
        });
    }
}
//发送给好友
function wxShareFriend() {
    fJson.weixin();
}
//保存分享预览
function wxSaveShare() {
    var id          = $('input[id=id]').val();                                                     // php自行channel_type区分
    var tag         = $('input[id=tag_020]').val() ? 1 : 0;                                        // 区分020与文章标记
    var submit_type = $('input[id=submit_type]').val() > 0 ? 1 : 0;                                // 区分团购标记
    var success_id  = $('input[id=success_id]').val() > 0 ? $('input[id=success_id]').val() : 0;   // 分享拼团标记
    var fxtag       = $('input[id=fxtag]').val() > 0 ? 1 : 0;                                      // 推广产品标记

    alert_layer();            // 请求动画
    $('.reloadShare').hide(); // 重新请求

    $.post("/wap/shareAlert/GetShareThumbnail.php?name="+user_name, {'id':id, 'ch_id':css_channel_id,'user_id':wap_userid,'tag':tag,'submit_type':submit_type,'success_id':success_id,'fxtag':fxtag},
    function(data){
        var obj = JSON.parse(data);

        del_layer();                                // 关闭动画

        wxShareComplete();                          // 关闭弹窗按钮组

        if (obj == 1) {
            showAllzz('服务器繁忙，请稍后再试！');    // 参数有误，绘制失败
        } else if(obj == 2) {
            fJson.weixin();                         // 打开原分享
        } else if(obj == 3) {
            reloadWxShareImg();                     // 重新请求
        } else {
            if ($('.shareAlert_Img').length > 0) {
                $('.shareAlert_Img').find('img').attr('src',obj.returnUrl);
                $('.shareAlert_Img').show();
            } else {
                var fxWrap = $('body');
                var span = '<div class="shareAlert_Img"><img src="'+obj.returnUrl+'"><p class="keep">长按图片，保存到相册</p><p class="closeShare" onclick="closeShareImg'+"('"+obj.unlink+"')"+'">X</p></div>';
                fxWrap.append(span);
            }
        }
    });
}
// 取消分享
function wxShareComplete() {
    $('.shareAlert_boxshadow').hide();
}
// 重新请求图片
function reloadWxShareImg() {
    if ($('.reloadShare').length > 0) {
        $('.reloadShare').show();
    } else {
        var fxWrap = $('body');
        var span = '<div class="reloadShare" onclick="closeShareImg()"><p class="keep" onclick="wxSaveShare()">图片不存在，请点击重试</p></div>';
        fxWrap.append(span);
    }
}
// 关闭分享图
function closeShareImg(unlink){
    unlink = unlink ? unlink : '';
    //删除临时分享图
    if (unlink) { 
        $.post("/wap/shareAlert/GetShareThumbnail.php?name="+user_name, {'unlink':unlink},
        function(data){});
    }
    $('.shareAlert_Img').hide();
    $('.reloadShare').hide();
}

var fx_md5  = parseInt(readCookie('zz_userid')*wap_userid);
var fx_code = hex_md5(fx_md5);
var tmp_win = window.location.href;

if (tmp_win.indexOf("?") != -1) {
    var _url_fx = '&member_id='+readCookie('zz_userid')+'&user_id='+wap_userid+'&code='+fx_code;
} else {
    var _url_fx = '?member_id='+readCookie('zz_userid')+'&user_id='+wap_userid+'&code='+fx_code;
}
var fJson = {
    'tenxT' : function(){
         // var _t = encodeURI(document.title);  var _url = encodeURI(window.location+_url_fx); var _appkey = '801cf76d3cfc44ada52ec13114e84a96'; var _site = encodeURI; var _pic = ''; var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic; window.open( _u,'转播到腾讯微博', 'width=700, height=580, top=180, left=320, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
        //http://connect.qq.com/widget/shareqq/index.html?url=https://www.jq22.com/demo/myshare201704242303/&title=content title&source=content site&desc=&pics=
        window.open('http://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(document.location.href+_url_fx)+'&title='+encodeURI(document.title)+'&source=&desc='+encodeURIComponent(document.title)+'&pics=');
    },
    'tenxZ' : function(){
        window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(document.location.href+_url_fx));
    },
    'sinaT' : function(){
        (function(){window.open('http://service.weibo.com/share/share.php?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href+_url_fx)+'&source=bookmark','_blank','width=450,height=400');})()
    },
    'renren':function(){
       (function(){window.open('http://widget.renren.com/dialog/share?resourceUrl='+encodeURIComponent(location.href+_url_fx)+'&srcUrl='+encodeURIComponent(location.href+_url_fx)+'&title='+encodeURIComponent(document.title)+'&description='+encodeURIComponent(document.title),'_blank','width=450,height=400');})()
    },
    'douban':function(){
        (function(){window.open('http://www.douban.com/share/service?href='+encodeURIComponent(location.href+_url_fx)+'&name='+encodeURIComponent(document.title)+'&text='+encodeURIComponent(document.title),'_blank','width=450,height=400');})()
    },
    'weixin' : function(){
        if (AGENT_ID == 8101) {
            var weixin_ts = $('<div class="weixin_ts"><div><img src="/images/wap/share_weixin_8101.png" /></div></div>');
        } else {
            var weixin_ts = $('<div class="weixin_ts"><div><img src="/images/wap/share_weixin.png" /></div></div>');
        }
        weixin_ts.appendTo("body");
        weixin_ts.on("click",function(){
            $(this).remove();
        })
    }
};

/**微名片中的分享**/
$(function(){
    $("#evTWeiDl").on('click','dt',function(){
        var share = $(this).data("share");
        if(share == 1){
            var ua = navigator.userAgent.toLowerCase(),is_weixn = (ua.match(/MicroMessenger/i)=="micromessenger") ? 1 : 0;
            if(is_weixn){
                fengxiang();
            }else{
                showAllzz("此功能只在微信下可用！");
            }
        } else if (share ==2){
            var imgsrc = $(this).find("img").attr("src"),
                img = $('<img src="'+ imgsrc +'" />');
            img.load(function(){
                showAllzz(img);
            })
        }
    });
});
/**app分享的方法**/
function app_share_fn2(){
    var title=document.title;
    var url=window.location.href;
    url=url.replace(/\#/g,"");
    var con=$("meta[name='description']").attr("content");
    if(!con)con=title;
    var pic=$("img")[0].src;
    android.share(title,con,pic,url);
}
