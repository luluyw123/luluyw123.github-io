$(function(){
    // 点击登录按钮弹出登录弹框
    $("#login_alert").click(function(){
        if($("#member_menu_bg").css("display") == "block"){
            $("#member_menu_bg").css("display",'none');
            $("#member_menu").css("display",'none');
            $("#ev_community_bg").css("display",'none');
        }
        if($(".login_alert").css("display") == "none"){
            var max_H = $(document).height();
            $("#alert_login_div").css("display",'block');
            $("#alert_login_div").css("top",max_H+'px');
            $("#alert_login_div").animate({top:'20px'});


            $(".login_alert").css("display",'block');
            $(".alert_login_bg").css("display",'block');
            
        }
    })

    if ($("#phone_login_t").css("display") == 'block'){
        $('#zcxy').css('display','block');
    }else{
        $('#zcxy').css('display','none');
    }
})

function login_alert(){
    if($(".login_alert").css("display") == "none"){
        var max_H = $(document).height();
        $("#alert_login_div").css("display",'block');
        $("#alert_login_div").css("top",max_H+'px');
        $("#alert_login_div").animate({top:'20px'});

        $(".login_alert").css("display",'block');
        $(".alert_login_bg").css("display",'block');
    }
}

function close_login_alert(){
    var max_H = $(document).height();
    $("#alert_login_div").animate({top:max_H});
    $(".login_alert").css("display",'none');
    $(".alert_login_bg").css("display",'none');
}

function account_login(){
    if ($("#phone_login_t").css("display") == 'block'){
        $("#phone_login_t").css("display",'none');
        $("#account_login_t").css("display",'block');
        $("#loginType").val(0);
        $('#zcxy').css('display','none');
    }else{
        $("#phone_login_t").css("display",'block');
        $("#account_login_t").css("display",'none');
        $("#loginType").val(1);
        $('#zcxy').css('display','block');
    }
}

// 微信登录
function android_wx_login(url){
    android.wxLogin(url);   
}

// 提交
function login_alert_submit(obj){
    $(obj).html($weisiteLa.DengLuZhong);
    $(obj).attr("disabled",true);
    var loginType = parseInt($.trim($('#loginType').val()));
    remove_error_msg();
    iLoginErrorCount = 0;
    if (!loginType){
        if (!check_name() || !check_pwd()){
            return false;
        }
    } else {
        if (!check_mobile() || !check_mobilecode()){
            $(obj).html($weisiteLa.DengLu);
            $(obj).attr("disabled",false);
            return false;
        }
        isSendMsg = 1;
        if (!isSendMsg && !iLoginErrorCount) {
            alert($weisiteLa.QingHuoQuShouJiYanZhengMa);
            $(obj).html($weisiteLa.DengLu);
            $(obj).attr("disabled",false);
            return false;
        }
    }
    if (parseInt(iLoginErrorCount) > 0) {
        $(obj).html($weisiteLa.DengLu);
        $(obj).attr("disabled",false);
        return false;
    } else {
        var url="/dom/action/ajax_denglu.php?wap=1&username="+user_name;
        var login_name  = $("#login_name").val();
        var login_pwd   = $("#login_pwd").val();
        var mobile      = $("#mobile").val();
        var mobile_code = $("#mobilecode").val();
        var wap         = $("#wap").val();
        var trespass    = $("#trespass").val();
        var loginType   = $("#loginType").val();
        // var validatecode= $("#validatecode").val();
        $.ajax({
            type: 'POST',
            url: url,
            data:{"login_name":login_name, "login_pwd":login_pwd,"mobile":mobile,"mobile_code":mobile_code,"wap":wap," trespass":trespass,"login_type":loginType},
            dataType: 'json',
            cache: false,
            error: function(){
                alert($weisiteLa.WangLuoFanMang);
                $(obj).html($weisiteLa.DengLu);
                $(obj).attr("disabled",false);
                return false;
            },
            success:function(data){
                if (data['status'] == 1){
                    alert(decodeHtmlEntity(data['message']));
                    $(obj).html($weisiteLa.DengLu);
                    $(obj).attr("disabled",false);
                    return false;
                }else{
                    if (data['trespass']){
                        location.href=data['trespass'];
                    }else{
                        location.reload();
                    }
                    
                }
            }
        });
    }
}

var tncode_div_balance_alert = false;
function send_mob_code(type,obj){
    var this_ = $('#'+obj);
    if(!this_.data("clickget")){
        this_.data("clickget", 1);
        var user_id   = this_.data('userid');
        var mobile    = $.trim($("#mobile").val());
        if (!check_mobile()){
            this_.removeData("clickget");
            return false;
        }
        if(show_check){
            if (public.yzMobile(mobile)) {
                if(type && mobile && user_id){
                    this_.attr("data-get","false");
                    this_.html($weisiteLa.FaSongZhong);
                    var url = "/dom/ajax_zhuce_code.php?type="+type+"&userid="+user_id+"&mobile="+mobile+"&username="+user_name+"&wap=1";
                    $.post(url, function(data){
                        if (data == 1) {
                            showAllzz($weisiteLa.CiShouJiHaoMaYiBangDing);
                            this_.removeData("clickget");
                            return false;
                        }
                        if($.trim(data) == 'success'){
                            change_miao(this_);
                        }else{
                            showAllzz($weisiteLa.WangLuoFanMang);
                            this_.html($weisiteLa.HuoQuYanZhengMa);
                            this_.attr("data-get","true");
                            this_.removeClass("butFalse");
                            this_.removeData("clickget");
                        }
                    });
                }
            }
        }else{
            if(!tncode_div_balance_alert){
                tncode.init('send_miao',2);
                tncode_div_balance_alert =true;
            }else{
                tncode.show();
            }
            if (public.yzMobile(mobile)) {
                if(type && mobile && user_id){
                    $TN.onsuccess(function(){
                        this_.attr("data-get","false");
                        this_.html($weisiteLa.FaSongZhong);
                        var url = "/dom/ajax_zhuce_code.php?type="+type+"&userid="+user_id+"&mobile="+mobile+"&username="+user_name+"&wap=1&tn_r="+tncode._mark_offset;
                        $.post(url, function(data){
                            if (data == 1) {
                                showAllzz($weisiteLa.CiShouJiHaoMaYiBangDing);
                                this_.removeData("clickget");
                                return false;
                            }
                            if($.trim(data) == 'success'){
                                change_miao(this_);
                            }else{
                                showAllzz($weisiteLa.WangLuoFanMang);
                                this_.html($weisiteLa.HuoQuYanZhengMa);
                                this_.attr("data-get","true");
                                this_.removeClass("butFalse");
                                this_.removeData("clickget");
                            }
                        });
                    });
                }
            }
        }
    }else{
        return false;
    }
}

function check_name(){
    var username = $.trim($('#login_name').val());
    if (username.length == 0) {
        alert_frame($weisiteLa.ZhangHaoBuNengWeiKong);
        // iLoginErrorCount++;
        return false;
    // }else if(public.yzUsername(username)==false){
    //     alert_frame("账号为6-20个字符(字母/数字/下划线)123！");
    //     // iLoginErrorCount++;
    //     return false
    }else{
        return true;
    }
}

function check_pwd(){
    var password = $.trim($('#login_pwd').val());
    if (password.length == 0) {
        alert_frame($weisiteLa.MiMaBuNengWeiKong);
        // iLoginErrorCount++;
    }else{
        return true;
    }
}

function check_mobile(){
    var mobile = $.trim($('#mobile').val());
    var mobileErro = $('#mobileError');
    if (!mobile) {
        alert_frame($weisiteLa.ShouJiHaoBuNengWeiKong);
        // iLoginErrorCount++;
        return false;
    } else if(public.yzMobile(mobile)==false){
        alert_frame($weisiteLa.ShouJiHaoWeiWeiShuZi);
        // iLoginErrorCount++;
        return false
    }else{
        return true;
    }
}

function check_mobilecode(){
    var mobilecode = $.trim($('#mobilecode').val());
    var mobileCodeError = $('#mobileCodeError');
    if (!mobilecode) {
        alert_frame($weisiteLa.DuanXinYanZhengMaBuNengWeiKong);
        // iLoginErrorCount++;
        return false;
    }else{
        return true;
    }
}

function getVcode2(){
    var date=new Date();
    document.getElementById("vCodesrc").src="/include/captcha/captcha.php?datete="+date.getTime()+"&u_id=<{$u_id}>";
}
$(function(){
    // $('#login_name').on('blur',function(){
    //     $(".button_a").html("登录");
    //     $(".button_a").attr("disabled",false);
    //     check_name();
    // });

    // $('#login_pwd').on('blur',function(){
    //     $(".button_a").html("登录");
    //     $(".button_a").attr("disabled",false);
    //     check_pwd();
    // });

    // $('#mobile').on('blur',function(){
    //     $(".button_a").html("登录");
    //     $(".button_a").attr("disabled",false);
    //     check_mobile();
    // });

    // $('#mobilecode').on('blur',function(){
    //     $(".button_a").html("登录");
    //     $(".button_a").attr("disabled",false);
    //     check_mobilecode();
    // });
})