var public = {};
var sIdTag = '';
var G_ = {};
var wsf = {};
if("undefined" != typeof is_bianji){
	if (is_bianji == 1) {
        if (typeof tmp_arr == "undefined") {
            var Domain=document.domain;
            Domain=Domain.toLowerCase();
            var tmp_arr=Domain.match(/[\w][\w-]*\.(?:com\.cn|net\.cn|org\.cn|com|cn|co|net|org|gov|cc|biz|info|hn|xyz|hk|icu|us|mobi|art|wang|me|so|top|win|vip|ltd|red|ru|ac\.cn|xn--kput3i|xin|xn--3ds443g|shop|site|club|fun|online|link|gov\.cn|name|pro|work|tv|kim|group|tech|store|ren|ink|pub|live|wiki|design|xn--fiq228c5hs|xn--6qq986b3xl|xn--fiqs8s|xn--ses554g|xn--hxt814e|xn--55qx5d|xn--io0a7i|xn--3bst00m)(\/|$)/);
            Domain=tmp_arr[0];
            document.domain = Domain;
        }
	}
}

/**
 * @Date: 2021-04-12 17:05:36
 * @LastEditors: qwguo
 * @description: 防止微信修改页面字体大小，页面字体大小跟着修改的问题
 *
 * @param {type} 参数说明
 * @return: 返回值
 */
(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    }
    function handleFontSize () {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        });
    }
})();
// JavaScript Document
/**
 ** 用来得到精确的加、减、乘、除结果
 ** 说明：javascript的四则运算结果会有误差，这个函数返回较为精确的加法结果。
 ** 调用：加：nCount.add(arg1,arg2),
 *  减：nCount.sub(arg1,arg2),
 *  乘：nCount.mul(arg1,arg2),
 *  除：nCount.div(arg1,arg2),
 ** 返回值：arg1和arg2计算后的精确结果
 **/

var nCount = {
    add: function(arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },
    sub: function(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    mul: function(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) {}
        try {
            m += s2.split(".")[1].length;
        } catch (e) {}
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    div: function(arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        } catch (e) {}
        try {
            t2 = arg2.toString().split(".")[1].length;
        } catch (e) {}
        with(Math) {
            r1 = Number(arg1.toString().replace(".", ""));
            r2 = Number(arg2.toString().replace(".", ""));
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }
};
/**
    正则验证(用户名,密码等等...)
    规则:6-20个字符(字母/数字/下划线)
*/
public.yzUsername = function(string) {
    if (string.length == 0) {
        return false;
    }
    if (/^(\w){6,20}$/.test(string)) {
        return true;
    } else {
        return false;
    }
};

// 正则验证邮箱
public.yzEmail = function(email) {
    if (email.length == 0) {
        return false;
    }

    if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
        return true;
    } else {
        return false;
    }
};

// 获取字符长度
public.getStringLength = function(str) {
    if (str == '') return 0;
    var realLength = 0,
        len = str.length,
        charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};


// 电话验证（支持座机和手机）
public.yzTel = function(s) {
    var str = s;
    var reg = /(^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
    if (reg.test(str) == false) {
        return false;
    } else {
        return true;
    }
};


// 邮编验证
public.yzPostcode = function(s) {
    var str = s;
    var reg = /^[0-9][0-9]{5}$/;
    if (reg.test(str) == false) {
        return false;
    } else {
        return true;
    }
};

//车牌号
public.yzPlateNumber =function(s){
    var str = s;
    // var reg = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-Za-z]{1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警港澳]{1})|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-Za-z]{1}(([0-9]{5}[DFdf])|([DFdf][A-Za-z0-9][0-9]{4})))$/;//A-HJ-NP-Za-hj-np-z
    var reg_1 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-HJ-NP-Za-hj-np-z]{1}[A-HJ-NP-Za-hj-np-z0-9]{4}[A-HJ-NP-Za-hj-np-z0-9挂学警港澳]{1}$/;
    var reg_2 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-HJ-NP-Za-hj-np-z]{1}(([0-9]{5}[DFdf])|([DFdf][A-HJ-NP-Za-hj-np-z0-9][0-9]{4}))$/;
    var reg_3 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-HJ-NP-Za-hj-np-z]{1}[A-HJ-NP-Za-hj-np-z0-9]{5}[A-HJ-NP-Za-hj-np-z0-9]{1}$/;
    if (reg_1.test(str) == false && reg_2.test(str) == false && reg_3.test(str) == false) {
        return false;
    } else {
        return true;
    }
};

// 判断小数位是否有值，无没有转换成整形
public.yzIsdecimal = function(str) {
    var reg = /(\.00)$/;
    if (reg.test(str) == false) {
        return str;
    } else {
        return parseInt(str);
    }
};
// 验证手机
public.yzMobile = function(tel) {
    var reg = /(^0{0,1}1[0-9]{1}[0-9]{9}$)/;
    if (reg.test(tel)) {
        tel = true;
        return tel;
    } else {
        tel = false;
        return tel;
    }
};

//复制模块
public.getCopyModuleInfo = function(module_set_id,userid,mark) {
    mark = mark ? 1 :0;
	var t=[];
    $.ajax({
	 	url:'/wap/wapCopyModule.php?username='+user_name+'&action=1&copy_module_set_id='+module_set_id+'&userid='+userid+'&copy_mark='+mark,
		type:'get',
		async: false,
		dataType:"json",
		error: function(a,b,c){
			console.log(11);
		},
		success: function(data){
			if(data){
				t=data;
			}
		}
	});
	return t;
};

// 分类模块更多
public.moreBtn = function(o){
    var t = $(o), tMo = t.parents(".Mo"), tId = tMo.attr("id").replace(/Mo_/g, "");
    var tHtml = '<div class="moreBtnAlt"><h2><a href="###" class="delBtnAlt">x</a></h2><div class="moreList"><ul>';
    for(i in wapClassifyJson[tId]){
        tHtml += '<li><a href="'+wapClassifyJson[tId][i].link+'">'+wapClassifyJson[tId][i].title+'</a></li>';
    }
    tHtml += '</ul></div></div>';
    var obj = $(tHtml),winH = $(window).height();
    obj.css({"height":winH+'px',"top":"100%"});
    $("body").append(obj);
    obj.animate({"top":"0"});
    obj.find("li").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
    });
    obj.find(".delBtnAlt").click(function(){
        obj.animate({"top":"100%"},function(){
            $(this).remove();
        });
    });
};
// 分类模块标签切换
public.changeMo = function(o,tag){
    var t = $(o),
        tMo = t.closest(".customModuleRow").find(".classifymain:gt(0)"),
        container_mid = t.attr('data-classify_mid'),
        curContainerDom = (function(){
            var curMo = null;
            tMo.each(function(i, dom){
                dom = $(dom);
                if(dom.find('div.Mo:eq(0)').attr('old_id') == container_mid){
                    curMo = dom;
                    return false
                }
            });
            return curMo;
        })(),
        ajaxload = t.attr('data-ajaxload') * 1;
    t.addClass("cur").siblings().removeClass("cur");
    if(!ajaxload && !tag){
        var MoBodyC = curContainerDom.find('.MoBodyC');
        // MoBodyC.find('.bgSetup').css('height','auto');
        MoBodyC.find('.bgSetup').html('<div style="height: 100%;display: flex;align-items: center;justify-content: center;"><img style="width:50px;height:50px;" src="/images/loading.gif"></div>');
        // return false;
        $.ajax({
            url:'/wap/wapAjaxModule.php?ajax_type=8&username='+user_name+'&wap=1&container_mid='+container_mid+'&action='+is_bianji,
            type:'get',
            success:function(data){
                var newData = $.parseJSON(data);
                var timestamp = Date.parse(new Date());
                if(newData.html){
                    if(newData.show_style == 12){
                        newData.html = newData.html.replace(/\\\'/g,"'");
                    }else{
                        newData.html = newData.html.replace(/\\\'/g,'"');
                        newData.html = newData.html.replace(/\\\'/g,'"');
                    }
                    if(newData.show_style == 58){
                        MoBodyC.html(newData.html);
                    }else{
                        if(newData.show_style ==32 && !$('#shop_and_city_js').length){
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
                                    MoBodyC.find('.bgSetup').html(newData.html);
                                });
                            })();
                        }else{
                            MoBodyC.find('.bgSetup').html(newData.html);
                        }
                    }

                    if(newData.show_style ==9 && !$('#statistics_js').length){
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
                                // loadFun();
                            });
                        })();
                    }
                    if(newData.show_style ==20){
                        formMo(MoBodyC.find('.inputCustomForm'));
                        if(!$('#biaodan_css1').length){
                            var whenArray = [],head = $('head');
                            (function(){
                                var src1 = '//aimg8.oss-cn-shanghai.aliyuncs.com/plugins/public/calendar/calendar.min.js',
                                    src2 = '/js/wap/userDefineForm.js?t='+timestamp,
                                    src3 = '/wap/include/define_form_js.php?user_id='+wap_userid+'&channel_id='+form_channel_id+((form_group_id*1) ? '&group_id='+(form_group_id*1) : '')+'&timestamp='+timestamp,
                                    script1 = $.getScript(src1, function(data, textStatus, jqxhr) {
                                        if(!$('#biaodan_js1').length){
                                            var scriptDom = document.createElement('script');
                                            scriptDom.type = 'text/javascript';
                                            scriptDom.id = 'biaodan_js1';
                                            scriptDom.src = src1;
                                            head[0].appendChild(scriptDom);
                                        }
                                    });
                                    script2 = $.getScript(src2, function(data, textStatus, jqxhr) {
                                        if(!$('#biaodan_js2').length){
                                            var scriptDom = document.createElement('script');
                                            scriptDom.type = 'text/javascript';
                                            scriptDom.id = 'biaodan_js2';
                                            scriptDom.src = src2;
                                            head[0].appendChild(scriptDom);
                                        }
                                    });
                                    script3 = $.getScript(src3, function(data, textStatus, jqxhr) {
                                        if(!$('#biaodan_js3').length){
                                            var scriptDom = document.createElement('script');
                                            scriptDom.type = 'text/javascript';
                                            scriptDom.id = 'biaodan_js3';
                                            scriptDom.src = src3;
                                            head[0].appendChild(scriptDom);
                                        }
                                    });
                                whenArray.push(script1,script2,script3);
                                $.when.apply(this, whenArray).done(function(){
                                    // loadFun();
                                });
                            })();
                            $('head').append('<link id="biaodan_css1" type="text/css" rel="stylesheet" href="//aimg8.oss-cn-shanghai.aliyuncs.com/plugins/public/calendar/calendar.min.css">');
                        }
                    }
                    if(newData.show_style == 58){
                        MoBodyC.find('.bgSetup').css('height',newData.height);
                    }
                    if(newData.jscode && newData.show_style == 58){
                        MoBodyC.find('.bgSetup').append(newData.jscode);
                    }
                    newData.customModuleCss && curContainerDom.addClass(newData.customModuleCss);
                    newData.animate_name && curContainerDom.attr('data-animate-name',newData.animate_name);
                    newData.animate_duration && curContainerDom.attr('data-animate-duration',newData.animate_duration);
                    newData.animate_delay && curContainerDom.attr('data-animate-delay',newData.animate_delay);
                    wsf.annimationLoadMo(curContainerDom);
                    !newData.animate_name && wsf.imgLazyLoading(curContainerDom);
                }
                for(var k in $.parseJSON(newData.wapContainerJson)){
                    wapContainerJson[k]=$.parseJSON(newData.wapContainerJson)[k];
                }
                newData.link && curContainerDom.find('.MoHead a').attr('href',newData.link);
                newData.target && curContainerDom.find('.MoHead a').attr('target','_blank');
                newData.title && curContainerDom.find('.MoHead .NameTxt a').html(newData.title);
            }
        });
        t.attr('data-ajaxload', 1);
    }
    tMo.each(function(i, dom){
        dom = $(dom);
        dom.is(curContainerDom) ? dom.removeClass('none') : dom.addClass('none');
    });
};

// 微信客服二维码
public.wxServer = function(url,txt){
    url ? url = url : url = 'http://img.ev123.com/pic/nopic/150_150.jpg';
    txt ? txt = txt : txt = '请使用手机微信扫描二维码';
    var tHtml = '<div class="wxServerAlt"><div class="altMain"><span class="pic"><img src="'+url+'"></span><h2>'+txt+'</h2></div></div>';
    var obj = $(tHtml);
    $("body").append(obj);
    obj.click(function(){
        obj.remove();
    });
    obj.find(".altMain").click(function(e){
        e.stopPropagation();
    });
};

function showAllzz(tit, jsons) {
    var allZZ = $('<div id="allZZ" class="allzz"><div class="alertDiv"><div class="promptText">回复成功</div><div class="promptBut"><a href="###">继续回复</a><a href="###">关闭</a></div></div></div>'),
        h = $(document).height(),
        ah = $(window).height() / 2,
        i = 0;

    allZZ.find(".promptText").html(tit), alertDiv = allZZ.find(".alertDiv");

    if (!jsons) {
        var jsons = {};
        jsons[$weisiteLa.GuanBi || '关闭']=  'javascript:;';
    }

    var x, aArray = "";
    for (var x in jsons) {
        i++;
        aArray += typeof(jsons[x]) === 'string' ? '<a href="' + jsons[x] + '">' + x + '</a>' : '<a href="' + jsons[x].url + '">' + jsons[x].title + '</a>';
    }
    allZZ.find(".promptBut").html(aArray);


    allZZ.find(".promptBut").find("a").css({
        'width': 100 / i + "%"
    }).click(function() {
        allZZ.remove();
    });

    allZZ.css({
        "height": h + "px"
    }).appendTo('body');
    alertDiv.css({
        "margin-top": ah - alertDiv.height() / 2
    });
}


//定时弹窗
function alert_frame(val_text) {
    $("body").append('<div class="alert_frame" id="alert_frame"><div class="alert_frame_bg"></div><div class="alert_frame_c">' + val_text + '</div></div>');
    var time_ = 1000,
        frame_id = $("#alert_frame"),
        text_w = $(".alert_frame_c").outerWidth() / 2,
        text_h = $(".alert_frame_c").outerHeight() / 2;
    $(".alert_frame_c").css({
        "top": "50%",
        "left": "50%",
        "margin-top": -text_h,
        "margin-left": -text_w,
        "z-index":999999
    });
    $(".alert_frame_bg").css("background","none");
    setTimeout(function() {
        $("body").find("#alert_frame").remove();
    }, time_);
}

//在窗口中显示二维码
function showAllewm(tit, wenzi) {
    var allZZ = $('<div id="allZZ" class="allzz"><div class="alertDiv"><div class="promptText"><div class="ewmstyle">回复成功</div><div class="wenzi"></div></div><div class="promptBut"><a href="###" style="width: 100%;">关闭</a></div></div></div>'),
        h = $("body").height(),
        ah = $(document).scrollTop() + $(window).height() / 2,
        i = 0;

    allZZ.find(".ewmstyle").html(tit), allZZ.find(".wenzi").html(wenzi), alertDiv = allZZ.find(".alertDiv");

    allZZ.find(".promptBut").find("a").click(function() {
        allZZ.remove();
    });

    allZZ.css({
        "height": h + "px"
    }).appendTo('body');
    alertDiv.css({
        "margin-top": ah - alertDiv.height() / 2
    });
}
//判断是否为微信
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return false;
    } else {
        return true;
    }
}
//加载中遮罩层
function alert_layer() {
    $("body").append('<div class="alert_layer" id="alert_layer"><div class="alert_layer_bg"></div><div class="alert_layer_c"><img src="/images/loading.gif" class="loading_img"></div></div>')
}
//删除遮罩层
function del_layer() {
    $("#alert_layer").remove();
}

//页面分享模块
$(function() {
    $('div.shareModule span').on("click", function() {
        var ua = navigator.userAgent.toLowerCase();
        var is_weixn = (ua.match(/MicroMessenger/i) == "micromessenger") ? 1 : 0;
        if (is_weixn) {
            fJson.weixin()
        } else {
            var tmpClass = $(this).attr('class');
            fJson[tmpClass]();
        }
    });
    $('#closeSpecHtml').click(function() {
        var pro_feature = 0;
        if ($('#pro_feature').length > 0) {
            pro_feature = parseInt($("#pro_feature").val());
        }
        $('#specHtml').hide();
        if ($('#return_top').length > 0) {
            $('#return_top').show();
        }
        if ($('#fixedShopCar').length > 0) {
            $('#fixedShopCar').show();
        }
        if ($('#fixed_nav_but').length > 0) {
            $('#fixed_nav_but').show();
        }
        var buyBtn = $('#inner_nowBuy'),
            addCat = $('#inner_addCat');
        //产品内页购买按钮自定义
        buyBtn.html(define_pro_buy_text);
        addCat.html(define_pro_add_text);
        buyBtn.removeAttr("style");
        addCat.removeAttr("style");
        buyBtn.css('right', '0px');
        addCat.css('right', '90px');
        if ($('#footerMoneyContent').length > 0) {
            $('#footerMoneyContent').hide();
        }
        $('#serverProductBtn').show();
        if (pro_feature) {
            buyBtn.css('width', '195px');
        }
        // 预售
        if (buyBtn.attr('date-presales') == 1){
            var end_time=$("#presalse_end_time").val();
            $(".preSaleBuy a").html('<font>'+end_time+'结束</font> 支付定金');
            $(".preSaleBuy a").attr('date-presales',1);
            $(".preSaleBuy a").attr('pay','success');
            // var html = '<a href="###" class="ActivityRight1 specPresale inner_nowBuy" id="inner_nowBuy" date-presales="1" pay="success"><font>'+end_time+'结束</font> 支付定金</a></div>';
            // $(".preSaleBuy").html(html);
            $(".preSaleBuy").css({'width':'auto','padding':'0px 10px'});
        }
    });
    // 判断系统搜索定位
    $(window).scroll(function(){
        var offTop = $(this).scrollTop();
        if($("#sysSearch").length){
            if(offTop <= 0){
                $("#sysSearch").css("position","absolute");
            }else{
                $("#sysSearch").css("position","fixed");
            }
        }
    });
});

 // 倒计时函数
wsf.countDown = function(j) {
    var r = function(t) {
            var a = t.split(' '),
                ymd = a[0],
                hms = a[1],
                str = ymd.split('-'),
                fix = hms.split(':'),
                year = str[0] - 0,
                month = str[1] - 0 - 1,
                day = str[2] - 0,
                hour = fix[0] - 0,
                minute = fix[1] - 0,
                second = fix[2] - 0,
                time = (new Date(year, month, day, hour, minute, second)).getTime();
            return parseInt(time / 1000);
        },
        o = j.o,
        st = r(j.st),
        et = r(j.et),
        nts = j.nt ? r(j.nt) : (new Date().getTime() / 1000),
        n_underway = function() {
            var y, m, d, h, mi, s, now = nts,
                c = et - now,
                html_;
            nts = nts + 1;
            if (c > 0) {
                d = Math.floor(c / (60 * 60 * 24));
                h = Math.floor((c - d * 24 * 60 * 60) / 3600);
                mi = Math.floor((c - d * 24 * 60 * 60 - h * 3600) / 60);
                s = Math.floor(c - d * 24 * 60 * 60 - h * 3600 - mi * 60);
                h = h < 10 ? '0' + h : h;
                mi = mi < 10 ? '0' + mi : mi;
                s = s < 10 ? '0' + s : s;
                html_ = '<span class="count-time"><i>' + d + '</i><em>天</em><i>' + h + '</i><em>时</em><i>' + mi + '</i><em>分</em><i>' + s + '</i><em>秒</em></span>';
                o.html(html_);
                setTimeout(function() {
                    n_underway();
                }, 1000);
            } else {
                typeof j.efun == 'function' && j.efun();
                // o.html('活动已经结束！');
            }
        },
        b_underway = function() {
            var y, m, d, h, mi, s, now = nts,
                c = st - now,
                html_;
            nts = nts + 1;
            if (c > 0) {
                d = Math.floor(c / (60 * 60 * 24));
                h = Math.floor((c - d * 24 * 60 * 60) / 3600);
                mi = Math.floor((c - d * 24 * 60 * 60 - h * 3600) / 60);
                s = Math.floor(c - d * 24 * 60 * 60 - h * 3600 - mi * 60);
                h = h < 10 ? '0' + h : h;
                mi = mi < 10 ? '0' + mi : mi;
                s = s < 10 ? '0' + s : s;
                html_ = '<span class="count-time"><i>' + d + '</i><em>天</em><i>' + h + '</i><em>时</em><i>' + mi + '</i><em>分</em><i>' + s + '</i><em>秒</em></span>';
                o.html(html_);
                setTimeout(function() {
                    b_underway();
                }, 1000);
            } else {
                n_underway();
                typeof j.nfun == 'function' && j.nfun();
            }
        };
    // 判断状态
    if ((st - nts) > 0) {
        typeof j.sfun == 'function' && j.sfun();
        b_underway();
    } else if ((nts - et) > 0) {
        typeof j.efun == 'function' && j.efun();
        // o.html('活动已经结束！');
    } else {
        n_underway();
        typeof j.nfun == 'function' && j.nfun();
    }
};
//时间戳
function UTCTimeDemo() {
    var now = new Date().getTime();
    var datestr = escape(now * 1000 + Math.round(Math.random() * 1000));
    return datestr;
}

function moduleMoveFun (t) {
    /*定义变量*/
    // 滚动对象
    var t_id = t.obj,
        // 滚动速度 1-4 快-慢
        _time = t._time,
        // 滚动方式 1：横向滚动 2：纵向滚动 3: 触屏左右滑动
        s_way = t.s_way,
        // 滚动类型 1：单项滚动 2：连续滚动
        s_type = t.s_type,
        // 每行显示数量
        li_x = t.li_x,
        // 显示几行
        li_y = t.li_y,
        // 展示图片数量
        list_length = t.list_length,
        // 初始值 0
        num = t.num,
        // 获取容器的宽度
        win_w = t_id.width(),
        //获取列表父元素
        demo_c = t_id.find(".exhibition_demo"),
        //设置时间
        set_time = "",
        // 触屏相关
        // 触屏开始
        touch_s = "",
        touch_m = "",
        touch_e = "",
        // 列行乘积
        xy = li_x * li_y,
        //通过容器宽度和每行显示数量计算一项的宽度
        li_w = Math.ceil(win_w / li_x);
    //将图片等比例显示，给图片容器设置成宽度值
    demo_c.find("li .pic").css({
        height: li_w - 10
    });
    //然后获取单项的高度
    var li_h = demo_c.find("li").outerHeight(),
        //计算出显示几行几列
        ceil_x = Math.ceil(list_length / li_y),
        ceil_y = Math.ceil(list_length / li_x);
    // 滚动速度 当滚动s_type类型 1：单项滚动时设置为时间为滚动的间隔时间
    //          滚动类型2：连续滚动时，设置的是滚动速度
    _time = _time * (s_type === 1 ? 1000 : 10);

    // 添加滚动
    function add_scroll() {
        //如果横向滚动
        if (s_way === 1) {
            if (s_type === 1) {
                num += li_w;
                t_id.animate({
                    scrollLeft: num,
                });
            } else {
                num += 1;
                t_id.scrollLeft(num);
            }
        } else {
            //如果纵向滚动
            if (s_type === 1) {
                num += li_h;
                t_id.animate({
                    scrollTop: num,
                });
            } else {
                num += 1;
                t_id.scrollTop(num);
            }
        }
    }

    function scroll_set(scrollL) {
        var WorH = "",
            scroll_type = "",
            scroll_val = "";
        switch (s_way) {
            case 1:
                scroll_type = t_id.scrollLeft();
                WorH = t_id.find("ul").outerWidth();
                t_id.find("ul").css("float", "left");
                break;
            case 2:
                scroll_type = t_id.scrollTop();
                WorH = t_id.find("ul").outerHeight();
                t_id.find("ul").css("float", "none");
                break;
            case 3:
                // WorH = t_id.find("ul").outerWidth();
                // t_id.find("ul").css("float","left");
                break;
        }
        if (s_way == 1 || s_way == 2) {
            if (scroll_type >= WorH) {
                if (s_way == 1) {
                    num = 0;
                    t_id.scrollLeft(num);
                } else {
                    num = 0;
                    t_id.scrollTop(num);
                }
                t_id.find("ul:first").insertAfter(t_id.find("ul:last"));
                add_scroll();
            } else {
                add_scroll();
            }
        } else {
            /*if(touch_s > touch_e){
                    if(t_id.scrollLeft() >= WorH){
                        t_id.scrollLeft(t_id.scrollLeft()-WorH);
                    }
                    num = t_id.scrollLeft() + t_id.width();
                }else if(touch_s < touch_e){
                    if(t_id.scrollLeft() <= 0){
                        t_id.scrollLeft(t_id.scrollLeft()+WorH);
                    }
                    num = t_id.scrollLeft() - t_id.width();
                }
                t_id.animate({"scrollLeft":num},function(){
                    if(touch_s > touch_e && num >= WorH){
                        t_id.scrollLeft(t_id.scrollLeft()-WorH);
                    }else if(touch_s < touch_e && num <= 0){
                        t_id.scrollLeft(t_id.scrollLeft()+WorH);
                    }
                });*/
            if (touch_s > touch_e) {
                // num = t_id.scrollLeft() + t_id.width();
                num = scrollL + t_id.width();
                t_id
                    .siblings(".touch_dot")
                    .children(".cur")
                    .next()
                    .addClass("cur this_color")
                    .siblings()
                    .removeClass("cur this_color");
            } else if (touch_s < touch_e) {
                num = scrollL - t_id.width();
                // num = t_id.scrollLeft() - t_id.width();
                t_id
                    .siblings(".touch_dot")
                    .children(".cur")
                    .prev()
                    .addClass("cur this_color")
                    .siblings()
                    .removeClass("cur this_color");
            }
            // console.log(num);
            t_id.animate({
                scrollLeft: num,
            });
            // t_id.css("overflow","hidden");
        }
    }

    if (s_way === 1 || s_way === 2) {
        scroll_set();
        set_time = setInterval(scroll_set, _time);
    } else {
        var sc_l;
        t_id.on("touchstart", function (e) {
            sc_l = t_id.scrollLeft();
            t_id.css("overflow", "auto");
            var _touch = e.originalEvent.targetTouches[0];
            var _x = _touch.pageX;
            touch_s = _x;
        });
        t_id.on("touchend", function (e) {
            t_id.css("overflow", "hidden");
            var _touch = e.originalEvent.changedTouches[0];
            var _x = _touch.pageX;
            touch_e = _x;
            scroll_set(sc_l);
        });
    }
    if (s_way === 1) {
        if (xy >= list_length) {
            demo_c.find("ul").width(li_w * li_x);
            demo_c.css("width", win_w * 2 + 10);
        } else {
            demo_c.find("ul").width(li_w * ceil_x);
            demo_c.css("width", demo_c.find("ul").width() * 2);
        }
    } else if (s_way === 2) {
        demo_c.find("ul").width(li_w * li_x);
        demo_c.css("width", win_w);
        if (xy >= list_length) {
            demo_c.height(li_h * li_y * 2);
            demo_c.find("ul").height(li_h * li_y);
            t_id.css("height", li_h * li_y);
        } else {
            demo_c.height(li_h * ceil_y * 2);
            demo_c.find("ul").height(li_h * ceil_y);
            t_id.css("height", li_h * li_y);
        }
    } else {
        /*if(xy >= list_length){
              demo_c.find("ul").width(li_w * li_x);
              demo_c.css("width",win_w*2);
          }else{
              demo_c.find("ul").width(li_w * ceil_x);
              demo_c.css("width",demo_c.find("ul").width() * 2);
          }*/
        var dot = "";
        // console.log("xy(一页显示几个)="+xy+", list_length(总个数)="+list_length);
        if (xy >= list_length) {
            demo_c.find("ul").width(li_w * ceil_x);
            demo_c.css("width", win_w);
            dot += '<em class="cur this_color"></em>';
        } else {
            // ceil_x
            var i = 1;
            var dotNum = Math.ceil(ceil_x / li_x);
            var demo_c_w = win_w * dotNum;

            var page = Math.floor(list_length / xy);

            if (list_length % xy > 0) {
                // 余数是否大余一行显示的个
                if (list_length % xy >= li_x) {
                    // console.log("li_w="+li_w+", li_x="+li_x+", page="+(page + 1));
                    demo_c.find("ul").width(li_w * li_x * (page + 1));
                } else {
                    // console.log("li_w="+li_w+", shengyuegeshu="+(list_length % xy)+", page="+(page + 1));
                    var tmpWidth = li_w * li_x * page + (list_length % xy) * li_w;
                    demo_c.find("ul").width(tmpWidth);
                }

                //page++;
                //demo_c.find("ul").width(li_w * (ceil_x+1));
            } else {
                // console.log("page="+page+", li_w="+li_w);
                demo_c.find("ul").width(li_w * li_x * page);
            }

            demo_c.css("width", demo_c_w);
            for (i; i <= dotNum; i++) {
                if (i == 1) {
                    dot += '<em class="cur this_color"></em>';
                } else {
                    dot += "<em></em>";
                }
            }
        }
        t_id.parent().append('<div class="touch_dot">' + dot + "</div>");
    }
    demo_c.find("li").width(li_w);
    demo_c.find(".demo2").html(demo_c.find(".demo1").html());
    if (s_way === 1 || s_way === 2) {
        demo_c.find(".demo2").show();
        demo_c.find(".demo2").html(demo_c.find(".demo1").html());
    } else {
        demo_c.find(".demo2").hide();
    }

    // 标题文字居中显示
    demo_c.find("li.img_c").each(function () {
        var t = $(this);
        var P_height = t.find(".text_list_bk").height();
        t.find(".text_list_bk").css("margin-top", -P_height / 2);
    });
}

//点赞公用
wsf.userLike = function(recordId, type, objectId, style, operate, user_name, part, html, location) {
    //没有登录通过cookie验证是否点赞
    var zz_userid = readCookie('zz_userid');
    var readName = '阅读';
    if (!zz_userid && operate == 'like') {
        var userLikeRecord = readCookie('user_like_record');
        var tmpStr = type + '*' + recordId;
        //已赞过
        if (userLikeRecord.indexOf(tmpStr) != -1) {
            alert_frame('已赞过');
            return false;
        }

        //每日限制100次
        var tmpArr = userLikeRecord.split('#');
        if (tmpArr.length >= 100) {
            alert_frame('每日最多点赞100次');
            return false;
        }
    }

    if (user_name == 'shengrihuanbao') {
        readName = 'read';
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Public/UserOperate.php',
        data: {
            username: user_name,
            rid: recordId,
            opt: operate,
            type: type,
            part: part,
            t: Date.parse(new Date())
        },
        success: function(data) {
            if (data.errorcode > 0) {
                alert_frame(data.errormsg);
            } else {
                var obj = $("#" + objectId);
                if(html){
                    obj.html(html.replace('{n}', data.num));
                }else{
                    if (operate == 'browse') {
                        if (location) {
                            obj.html(readName+data.num);
                        } else {
                            obj.html(data.num+readName);
                        }
                    } else {
                        obj.html(data.errormsg);
                    }
                }

                var styleArr = style.split('#');

                if (operate == 'like' || data.liked)
                {
                    obj.data('opt', "unLike");
                    obj.removeClass(styleArr[0]);
                    obj.addClass(styleArr[1]);
                    if(operate == 'like') alert_frame('点赞成功');
                }
                else if (operate == 'unLike')
                {
                    obj.data('opt', "like");
                    obj.removeClass(styleArr[1]);
                    obj.addClass(styleArr[0]);
                    alert_frame('取消成功');
                }
            }
        }
    });
};
wsf.imgLazyLoading = function(curDom){
    curDom.find('.lazy-loading').each(function(i, dom){
        dom = $(dom);
        var oImage = new Image();
        oImage.onload = function () {
            dom.attr('src', this.src).addClass('lazy-loading-animate');
            setTimeout(function(){
                dom.removeClass('lazy-loading lazy-loading-animate');
                dom.closest('.pic').css({'background-image': 'none'});
            }, 10);
        };
        oImage.src = dom.attr('data-original-src');
    });
};
//列表页点赞
wsf.userLikeList = function(recordId, type, obj, style, operate, user_name, part, html, location) {
    //没有登录通过cookie验证是否点赞
    var zz_userid = readCookie('zz_userid');
    if (!zz_userid && operate == 'like') {
        var userLikeRecord = readCookie('user_like_record');
        var tmpStr = type + '*' + recordId;
        //已赞过
        if (userLikeRecord.indexOf(tmpStr) != -1) {
            alert_frame('已赞过');
            return false;
        }

        //每日限制100次
        var tmpArr = userLikeRecord.split('#');
        if (tmpArr.length >= 100) {
            alert_frame('每日最多点赞100次');
            return false;
        }
    }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Public/UserOperate.php',
        data: {
            username: user_name,
            rid: recordId,
            opt: operate,
            type: type,
            part: part,
            t: Date.parse(new Date())
        },
        success: function(data) {
            if (data.errorcode > 0) {
                alert_frame(data.errormsg);
            } else {
                obj.find('span').html('&nbsp'+data.num);
                obj.find('em').addClass('cur');
                var styleArr = style.split('#');
                if (operate == 'like' || data.liked)
                {
                    obj.attr('data-opt', "unLike");
                    if(operate == 'like') alert_frame('点赞成功');
                }
                else if (operate == 'unLike')
                {
                    obj.find('em').removeClass('cur');
                    obj.attr('data-opt', "like");
                    alert_frame('取消成功');
                }
            }
        }
    });
};
wsf.annimationLoadMo = function (dom) {
        if (!dom.data('loadAnimate') && dom.attr('data-animate-name')) {
            dom.data('loadAnimate', 1);
            var v = {
                'dom': dom,
                'st': dom.attr('style') || '',
                'aName': dom.data('animate-name'),
                'aDelay': dom.data('animate-delay'),
                'aDuration': dom.data('animate-duration')
            };
            if (v.aName) {
                v.dom.addClass('animated ' + v.aName).css({
                    'animation-delay': v.aDelay,
                    'animation-duration': v.aDuration
                });
                setTimeout(function () {
                    v.dom.removeClass('load-animate');
                }, v.aDelay.slice(0, v.aDelay.length - 1) * 1000 + 30);
                setTimeout(function () {
                    v.dom.attr('style', v.st).removeClass('animated ' + v.aName);
                    wsf.imgLazyLoading(v.dom);
                    /*v.dom.find('.ev-module-edit-box,.customModule').each(function (i, dom) {
                        wsf.f.annimationLoadMo($(dom));
                    });*/
                }, v.aDelay.slice(0, v.aDelay.length - 1) * 1000 + v.aDuration.slice(0, v.aDuration.length - 1) * 1000 + 1);
            }
        }
    };
// 动画加载效果
wsf.loadAnimate = function() {
    var getDom = [],
        getLoadImg = [];
    $(".load-animate[data-animate-name][data-animate-delay][data-animate-duration]").each(function(i, dom) {
        dom = $(dom);
        dom.is(':visible') && getDom.push({
            'dom': dom,
            'st': dom.attr('style') || '',
            'loaded': false,
            'aName': dom.data('animate-name'),
            'aDelay': dom.data('animate-delay'),
            'aDuration': dom.data('animate-duration'),
            'evContainer': dom.parent().hasClass('ev-tab-container-two') ? 1 : null
        });
    });
    $("img.lazy-loading").each(function (i, dom) {
        dom = $(dom);
        if(dom.parent().is(':visible') || (dom.closest('.pic').length && dom.closest('.pic').is(':visible'))){
            getLoadImg.push({
                'dom': dom,
                'st': dom.attr('style') || '',
                'loaded': false,
                'src': dom.data('original-src'),
                'evContainer': dom.closest('.ev-tab-container-two') ? 1 : null
            });
        }
    });
    var addAnimate = function(s, h) {
        if (getDom.length > 0) {
            $.map(getDom, function(v, i) {
                var oTop = v.dom.offset().top
                if (!v.loaded && ((oTop > s && oTop < s + h) || (oTop < s && oTop + v.dom.height() > s)) || (!v.loaded && oTop == 0)) {
                    if ($.browser && $.browser.msie && $.browser.msie < 9) {
                        v.dom.removeClass('load-animate');
                        v.loaded = true;
                    } else {
                        v.dom.addClass('animated ' + v.aName).css({
                            'animation-delay': v.aDelay,
                            'animation-duration': v.aDuration
                        });
                        setTimeout(function() {
                            v.dom.removeClass('load-animate');
                        }, v.aDelay.slice(0, v.aDelay.length - 1) * 1000);
                        setTimeout(function() {
                            v.dom.attr('style', v.st).removeClass('animated ' + v.aName);
                        }, v.aDelay.slice(0, v.aDelay.length - 1) * 1000 + v.aDuration.slice(0, v.aDuration.length - 1) * 1000 + 10);
                        v.loaded = true;
                        if (v.evContainer) {
                            v.dom.attr('data-loadAnimate', 1).data('loadAnimate', 1);
                        }
                    }
                }
            });
        }
        if (getLoadImg.length > 0) {
            $.map(getLoadImg, function (v, i) {
                var imgP = v.dom.parent(),
                    oTop = imgP.offset().top;
                if (!v.loaded && (s + h > oTop) && (oTop + v.dom.height() > s)) {
                    wsf.imgLazyLoading(imgP);
                    v.loaded = true;
                }
            });
        }
    };
    var window_ = window;
    $(window_).on({
        'scroll.loadAnimate': function() {
            addAnimate($(this).scrollTop(), $(this).height());
        }
    });
    addAnimate($(window_).scrollTop(), $(window_).height());
    setTimeout(function(){
        // addAnimate($(window_).scrollTop(), $(window_).height());
        $(window_).trigger('scroll');
    }, 1500);
};

// 百度编辑器中的embed代码替换成video代码
wsf.embedToVideo = function(){
    var editor_content_air = $('.ev_t_product_xq_new_div,.ev_t_product_xq_con,.articleC,.baiduEditorTxtModule,.news_conter');
    editor_content_air.each(function(i, dom){
        dom = $(dom);
        var embeds = dom.find('embed');
        embeds.each(function(i, embed){
            embed = $(embed);
            embed.before('<video controls="true" src="'+ embed.attr('src') +'" style="width:100%; height:auto"></video>');
            embed.remove();
        });
    });
};

// 文章最終也媒体播放
wsf.docMp3PlayFun = function(){
    var mp3Wrap = $('.mp3-wrap');
    if(mp3Wrap.length){
        var audioDom = mp3Wrap.find('audio');
        var duration = 0;
        // 格式化时间
        var timeRules = function(during){
            var s = Math.floor(during / 1) % 60;
            if(s < 10){
                s = '0'+s;
            }
            during = Math.floor(during / 60);
            var i = during % 60;
            if(i < 10){
                i = '0'+i;
            }
            during = Math.floor(during / 60);
            var h = during % 24;
            if(h < 10){
                h = '0'+h;
            }
            during = Math.floor(during / 24);
            var d = during;
            var getStr = i+':'+s;
            if(h*1){
                getStr = h+':' + getStr;
            }
            return getStr;
        };
        var playProgress = function(c, d){
            return c/d*100;
        }
        // 给音频媒体绑定事件
        audioDom.on({
            canplay: function(){
                duration = audioDom[0].duration;
                var currentTime = audioDom[0].currentTime;
                mp3Wrap.find('.times .cur-time').text(timeRules(currentTime));
                mp3Wrap.find('.times .dur-time').text(timeRules(duration));
                mp3Wrap.find('.play-bar span').css({width: playProgress(currentTime, duration)+'%'})
            },
            timeupdate: function(){
                var currentTime = audioDom[0].currentTime;
                mp3Wrap.find('.times .cur-time').text(timeRules(currentTime));
                mp3Wrap.find('.play-bar span').css({width: playProgress(currentTime, duration)+'%'})
            },
            ended: function(){
                mp3Wrap.find('.play-icon').removeClass('playing').data('playing', 0);
                audioDom[0].pause();
                audioDom[0].currentTime = 0;
            }
        });
        mp3Wrap.on({
            'click': function(ev){
                var $this = $(this);
                var action = $this.data('action');
                switch(action){
                    case 'playBtn':
                        if($this.data('playing') * 1){
                            $this.removeClass('playing').data('playing', 0);
                            audioDom[0].pause();

                        }else{
                            $this.addClass('playing').data('playing', 1);
                            audioDom[0].play();
                        }
                        break;
                    case 'playBar':
                        var w = $this.width();
                        var l = $this.offset().left;
                        var pageX = ev.pageX;
                        var clickW = pageX - l;
                        var getGoTime = clickW * duration/w;
                        audioDom[0].currentTime = Math.floor(getGoTime);
                        break;
                }
            }
        }, '[data-action]');
    }
}
// $('#shareModule span').on("click",function(){
//  var ua = navigator.userAgent.toLowerCase();
//   var is_weixn = (ua.match(/MicroMessenger/i)=="micromessenger") ? 1 : 0;
//   if(is_weixn){
//     fJson.weixin()
//   }else{
//      var tmpClass = $(this).attr('class');
//      fJson[tmpClass]();
//   }

// });

// 将实体转换为字符
function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
}

/**
 * 验证小数,默认为2位
 *
 * @param number
 * @param decimals
 * @returns {boolean}
 */
function checkNumber(number, decimals) {
    var is_number = false;

    decimals = !decimals ? 2 : decimals;

    var reg = new RegExp("^\\d{1,10}(\\.\\d{1,"+ decimals +"})?$");

    if(reg.test(number) !== false) {
        is_number=true;
        return is_number;
    }else{
        is_number =false;
        return is_number;
    }
}

// 公告特效
/*function NoticeModule(id,axis,speed,type){
    var scroll = 0;
        tId = $("#"+id),
        tLi = tId.find("li"),
        liW = tLi.width(),
        liH = tLi.height();
    switch(speed){
        case "slowly":
            speed = 150;
            break;
        case "slow":
            speed = 100;
            break;
        case "normal":
            speed = 60;
            break;
        case "quick":
            speed = 30;
            break;
        case "quickly":
            speed = 5;
            break;
    }
    if(tLi.length < 2){
        tId.find("ul").append("<li>"+tLi.html()+"</li>");
    }
    if(axis == "left"){
        tLi.css({"float":"left","width":liW+"px"});
        tId.find("ul").width(tLi.length*liW);
    }
    tId.parent().height(liH);
    var date = setInterval(function(){
        scroll++;
        if(axis == "left"){
            //tId.find("ul").css("margin-left",-scroll+'px');
            if(scroll >= liW){
                tId.find("ul li:first").insertAfter(tId.find("ul li:last"));
                scroll = 0;
                tId.find("ul").scrollLeft(0);
            }else{
                tId.find("ul").scrollLeft(scroll);
            }
        }else{
            //tId.find("ul").css("margin-top",-scroll+'px');
            if(scroll >= liH){
                tId.find("ul li:first").insertAfter(tId.find("ul li:last"));
                scroll = 0;
                tId.parent().scrollTop(0);
            }else{
                tId.parent().scrollTop(scroll);
            }
        }
    },speed);

}*/
//模块移动函数 主要是拖拽版的单模块内容移动效果
(function($){
  $.fn.extend({
    "move2Module" : function(options){
      return this.each(function(){
        var defaultO = {
          axis : "top",
          speed : "slow",
          type : "flow",
          hand : false
        };
        var O = $.extend(defaultO,options);
        var speed = 100;
        if(O.type == "flow")
        {
          switch(O.speed){
            case "slowly":
              speed = 150;
            break;
            case "slow":
              speed = 100;
            break;
            case "normal":
              speed = 60;
            break;
            case "quick":
              speed = 30;
            break;
            case "quickly":
              speed = 5;
            break;
          }
        }else if(O.type == "single")
        {
          switch(O.speed){
            case "slowly":
              speed = 5000;
            break;
            case "slow":
              speed = 4000;
            break;
            case "normal":
              speed = 3000;
            break;
            case "quick":
              speed = 2000;
            break;
            case "quickly":
              speed = 1000;
            break;
          }
        }
        var _this = $(this),
            lilength = _this.find("ul li").length,
            movepx = 0,
            times=null,
            thisPar = $(this).parent();
        thisPar.height(_this.find("li:first").outerHeight());
        var thisParH = thisPar.height(),
            thisParW = thisPar.width(),
            firstChild = _this.children().first();
        if(O.axis == "top" || O.axis == "bottom"){
         var thisH = _this.height();
        }else if(O.axis == "left" || O.axis == "right"){
          if(_this.hasClass("proListmodule_1")){
            firstChild.children().width(thisParW);
          }
          var thisW = firstChild.width();
            _this.find("li, ul").css('display',"inline-block");
            _this.css('white-space','nowrap');
          // _this.find("ul").css("float","left");
          // _this.find("li").css("min-width",thisParW);
          // _this.find("li").width(thisParW);
          // _this.find("ul").width(firstChild.width()*lilength);
          // _this.width(firstChild.width()*2+10);
          // _this.width(firstChild.width()*2+10);
          }
          var clone = $(firstChild.clone());
        //向上
        if(O.axis == "top")
        {
          movepx = 0;
          _this.append(clone);
          times=setInterval(moveT,speed);
          /*_this.bind("mouseout",function(){
              times = setInterval(moveT,speed);
          });
          _this.bind("mouseover",function(){
            clearInterval(times);
          });*/
        }
        //向下
        if(O.axis == "bottom")
        {
          movepx = -(thisH+(thisH - thisParH));
          _this.css({"margin-top":-thisH}).append(clone);
            times=setInterval(moveB,speed);
            /*_this.bind("mouseout",function(){
              times = setInterval(moveB,speed);
            });
          _this.bind("mouseover",function(){
              clearInterval(times);
          });*/
        }
        //向左
        if(O.axis == "left")
        {
          movepx = 0;
          _this.css({"margin-left":0}).append(clone);
            times=setInterval(moveL,speed);
            /*_this.bind("mouseout",function(){
              times = setInterval(moveL,speed);
            });
          _this.bind("mouseover",function(){
              clearInterval(times);
          });*/
        }
        //向右
        if(O.axis == "right")
        {
          movepx = -(thisW);
          _this.css({"margin-left":movepx}).append(clone);
            times=setInterval(moveR,speed);
           /* _this.bind("mouseout",function(){
              times = setInterval(moveR,speed);
            });
          _this.bind("mouseover",function(){
              clearInterval(times);
          });*/
        }
        //下移动函数
        function moveB()
        {
          if(thisH!=firstChild.height()){
            thisH = firstChild.height();
          }
          var mt = parseInt(_this.css("margin-top"));
          var itemH = firstChild.children().outerHeight();
          if(O.type=="flow")
          {
            if(mt<0){
              _this.css("margin-top",movepx);
              movepx++;
            }else{
              movepx=-thisH;
              _this.css("margin-top",movepx);
            }
          }else if(O.type == "single"){
            if(mt<0){
                _this.animate({"margin-top":mt+itemH},500);
            }else{
                _this.css("margin-top",-thisH);
                _this.animate({"margin-top":-(thisH-itemH)},500);
            }
          }
        }
        //上移动函数
        function moveT()
        {
          if(thisH!=firstChild.height()){
            thisH = firstChild.height();
          }
          var itemH = firstChild.children().outerHeight();
          var mt = Math.abs(parseInt(_this.css("margin-top")));
          if(O.type == "single"){
            if(mt<thisH){
                _this.animate({"margin-top":-(mt+itemH)},500);
            }else{
                _this.css("margin-top",0);
                _this.animate({"margin-top":-(itemH)},500);
            }
          }else if(O.type == "flow"){
            if(mt<thisH){
              _this.css("margin-top",-movepx);
              movepx++;
            }else{
              movepx=0;
              _this.css("margin-top",-movepx);
            }
          }
        }
        //左移动
        function moveL()
        {
          if(thisParW!=_this.parent().width()){
            if(_this.hasClass("proListmodule_1")){
              thisParW = _this.parent().width();
              firstChild.children().width(thisParW);
              clone.remove();
              clone = $(firstChild.clone());
              _this.css({"margin-left":0}).append(clone);
              thisW = firstChild.width();
              _this.width(firstChild.width()*2);
            }
          }
          thisW = _this.find("ul").width();
          var itemW = firstChild.children().outerWidth();
          var ml = Math.abs(parseInt(_this.css("margin-left")));
          if(O.type == "single"){
            if(ml<thisW){
              _this.animate({"margin-left":-(ml+itemW)},500);
            }else{
              _this.css("margin-left",0);
              _this.animate({"margin-left":-(itemW)},500);
            }
          }else if(O.type == "flow"){
            if(ml<thisW){
              _this.css("margin-left",-movepx);
              movepx++;
            }else{
              movepx=0;
              _this.css("margin-left",-movepx);
            }
          }
        }

        //右移动
        function moveR()
        {
          if(thisParW!=_this.parent().width()){
            if(_this.hasClass("proListmodule_1")){
              thisParW = _this.parent().width();
              firstChild.children().width(thisParW);
              clone.remove();
              clone = $(firstChild.clone());
              _this.css({"margin-left":-firstChild.width()}).append(clone);
              thisW = firstChild.width();
              _this.width(firstChild.width()*2);
            }
          }
          var itemW = firstChild.children().outerWidth();
          var ml = parseInt(_this.css("margin-left"));
          if(O.type == "single"){
            if(ml<0){
              _this.animate({"margin-left":ml+itemW},500);
            }else{
              _this.css("margin-left",-thisW);
              _this.animate({"margin-left":-(thisW-itemW)},500);
            }
          }else if(O.type == "flow"){
            if(ml<0){
              _this.css("margin-left",movepx);
              movepx++;
            }else{
              movepx=0;
              _this.css("margin-left",movepx);
            }
          }
        }

      });
    }
  });
})(jQuery);

// 3D焦点图效果
function swiper3DBanner(j) {
    this.box = document.querySelector(j.dom);
    this.bannerH = $(j.dom).height();
    this.picList = this.box.querySelector('.banner-pic-3d');
    this.children = this.picList.querySelectorAll('li');
    this.navList = this.box.querySelector('.bannerNav');
    this.count = this.children.length;
    this.autoPlay = null;
    this.autoTime = j.autoTime || 3000;
    var x0, y0, quen, lock = 0,
        css = ['transform:translate3d(0,0,10px) scale3d(1,1,1);z-index:3;visibility:visible;', 'transform:translate3d(-100px,0,6px) scale3d(0.8,0.8,1);z-index:2;visibility:visible;opacity:0.6;', 'transform:translate3d(100px,0,6px) scale3d(0.8,0.8,1);z-index:2;visibility:visible;opacity:0.6;', 'transform:translate3d(-200px,0,2px) scale3d(0.667,0.667,1);z-index:1;visibility:visible;', 'transform:translate3d(200px,0,2px) scale3d(0.667,0.667,1);z-index:1;visibility:visible;'];
    var startT = function(e) {
        x0 = e.targetTouches[0].pageX;
        y0 = e.targetTouches[0].pageY;
        lock = 0;
        if(this.autoPlay){
            clearInterval(this.autoPlay);
            this.autoPlay = null;
        }
    }.bind(this);
    var MoveT = function(e) {
        if (lock == 1) return;
        var x = e.targetTouches[0].pageX,
            y = e.targetTouches[0].pageY,
            offsetX = x - x0;
        if (offsetX >= 50) {
            this.quen.unshift(this.quen.pop());
            lock = 1;
            swap();
        } else if (offsetX <= -50) {
            this.quen.push(this.quen.shift());
            lock = 1;
            swap();
        }
    }.bind(this);
    var autoPlay = function(){
        var This = this;
        This.autoPlay = setInterval(function(){
        This.quen.push(This.quen.shift());
        swap();
        }, This.autoTime);
    }.bind(this);
    var swap = function() {
        var count = this.count,
            This = this,
            quen = [].concat(This.quen),
            last = count - 1,
            NewList = new Array(count),
            num = 0,
            odd = 1;
        while (num < 3 && count > 0) {
            var curVal = odd ? quen.shift() : quen.pop();
            if(num == 0){
                var iEle = This.navList.querySelectorAll('span');
                for(var x = 0; x < iEle.length; x++){
                    if(x == curVal){
                        iEle[x].setAttribute('class','cur');
                        This.box.style.backgroundColor = This.children[x].getAttribute('bcolor');
                    }else{
                        iEle[x].removeAttribute('class');
                    }
                }
            }
            NewList[curVal] = css[num++];
            odd = !odd;
        }
        for (var i = 0; i < count; i++) {
            this.children[i].style.cssText = NewList[i] || 'visibility: hidden';
            this.children[i].style.height = this.bannerH + 'px';
            this.children[i].getElementsByTagName('a')[0].style.backgroundSize = '100% 100%';
        }
        if(!this.autoPlay){
            autoPlay();
        }
    }.bind(this);
    this.init = function() {
        this.picList.style.height = this.bannerH + 'px';
        this.quen = function(len) {
            var attr = [];
            for (var i = 0; i < len; i++) {
                attr[i] = i;
            }
            return attr;
        }(this.count);
        var s = this.quen;
        for (var i = 0; i < this.count; i++) {
            var  iEle= document.createElement('span');
            if(i == 0){
                iEle.setAttribute('class','cur');
            }
            var imgurl = this.children[i].getAttribute('bigpic');
            var a = this.children[i].querySelectorAll('a');
            a[0].style.backgroundImage = 'url('+imgurl+')';
            this.children[i].style.visibility = 'hidden';
            this.navList.appendChild(iEle);
            this.navList.setAttribute('class','banner-nav-1 bannerNav');
        };
        swap();
        picList.addEventListener('touchstart', startT);
        picList.addEventListener('touchmove', MoveT);
    };
    var list = document.querySelector(j.dom);
    var picList = list ? list.querySelector('.banner-pic-3d') : null;
    picList && this.init();
}

// 默认播放背景音乐
function audioAutoPlay(id){
    var audio = document.getElementById(id),
        play = function(){
        audio.play();
        document.removeEventListener("touchstart",play, false);
    };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {//微信
       play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {//易信
              play();
        }, false);
    document.addEventListener("touchstart",play, false);
}

/*新执行方法*/
$(function(){
    // 背景音乐
    if($("#webMusic").length){
        audioAutoPlay('webMusic');
    }
    $(".webMusic").click(function(){
        var t = $(this);
        if(t.hasClass("playMusic")){
            t.find("audio")[0].pause();
            t.removeClass("playMusic");
        }else{
            t.find("audio")[0].play();
            t.addClass("playMusic");
        }
    });
    $("#alert_login_div").on("focus","input",function(){
        var tid = $("#alert_login_div");
        var sTop = $(window).scrollTop();
        tid.css({"position":"absolute","top":sTop+20});
    });
    $("#alert_login_div").on("blur","input",function(){
        var tid = $("#alert_login_div");
        tid.css({"position":"fixed","top":"20px"});
    });
    setTimeout(function(){wsf.loadAnimate();},1);
    // 页面加载完替换百度编辑器中的embed的flash播放器
    wsf.embedToVideo();
    wsf.docMp3PlayFun();
});

//APP一键转售(安卓)
function android_share_pic(con,pic,type){
    if (type) {
        var str = pic;
    } else {
        var str='{"desc":"'+con+'","imgurls":['+pic+']}';
    }
	android.shareImgList(str);
}

//APP一键转售(苹果)
function ios_share_pic(pic, type){
    if (type) {
        location.href='ev123:shareImage:'+pic;
    } else {
        location.href='ev123:shareImage:['+pic+']';
    }
}

/*菜单*/
function newMenu() {
    if($("#fixed_nav_but").length){
        var winW = $("body").width();
        winW = winW < 640 ? winW : 640;
        var this_ = $("#fixed_nav_but"), thisW = this_.width(), thisH = this_.height();
        var iPicLeft = parseFloat(this_.attr("data-left")).toFixed(4);
        if(isNaN(iPicLeft)){
            var iPicLeftPx = winW-thisW;
        }else if(iPicLeft == 0){
            var iPicLeftPx = 0;
        }else{
            var iPicLeftPx = (iPicLeft*winW)-(thisW/2);
        }
        // this_.css({'left':(iPicLeftPx/332).toFixed(2)+"px"});
    }
}

//判断是否为微信
function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        $('#wxAndAppShowHtml').show();
        return false;
    } else {
        $('#wxAndAppShowHtml').hide();
        return true;
    }
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r   = window.location.search.substr(1).match(reg);
    if(r!=null){
        return  unescape(r[2]);
    }
    return '';
}
$(function(){
    if (!$('.ev_t_top').length && !$('.ev_t_product_pj_tit').length) {
        $('#wxAndAppShowHtml').removeClass('content_margin');
    }
});
$(".baiduEditorTxtModule img").each(function(){
    var w = $(this).width();
    if(w > 320){
        $(this).css({'width':'100%','height':'auto'});
    }
});

if (is_weixn()){
    writeCookie('openid','',168);
    var shareModule = $('#shareModule li');
    if (shareModule.length > 0 ){
        shareModule.find('.weixin').parent().remove();
    }
}else {
    var openid = GetQueryString('openid');
    if (!readCookie('openid')){
        writeCookie('openid',openid);
    }
}

function ButGroupLeftPosition(states) {
    if($(".butgroupList").length){
        var winW = $(window).width();
        winW = winW < 768 ? winW : 768;
        $(".butgroupList").each(function(){
            var Lthis_ = $(this),butItme = Lthis_.find(".newBbutItem");
            butItme.each(function(){
                var this_ = $(this).find("a.itemA"),iLiWidth = this_.width();
                // var this_ = $(this),iLiWidth = this_.width(),aitem =this_.find("a.itemA");
                iAHeight = parseInt(this_.attr("data-height"));
                /*if(winW != 320){
                    var bl = winW/320*iAHeight;
                    this_.height(bl);
                    this_.parent().height(bl);
                }*/
                var isReturn = false;
                if(this_.find(".butText").length){
                    var iFont = this_.find(".butText");
                    iFont.css({'left':"0px"});
                    var iFontWidth = iFont.width();
                    var iFontLeftBfb = parseFloat(iFont.attr("data-left")).toFixed(4);
                    var iFontLeftPx=(iFontLeftBfb*iLiWidth)-(iFontWidth/2);
                    if(iFontLeftPx < 0){
                        iFont.css({'left':0});
                    }else{
                        iFont.css({'left':iFontLeftPx+"px"});
                    }
                    isReturn = true;
                }

                if(this_.find(".imgicon").length || this_.find(".ficon").length){
                    if(this_.find(".imgicon").length){
                        var iPic = this_.find(".imgicon"),
                            iPic_sub = this_.find(".imgicon img");
                        var w = parseInt(iPic_sub.attr("width"));
                        if(w>iLiWidth){w=iLiWidth}
                    }else if(this_.find(".ficon").length){
                        var iPic = this_.find(".ficon");
                        //var w = iPic.width();
                        var w = iPic.attr('data-picwidth');
                    }
                    var iPicLeftBfb = parseFloat(iPic.attr("data-left")).toFixed(4);
                    var iPicLeftPx=(iPicLeftBfb*iLiWidth)-(w/2);
                    if(iPicLeftPx < 0){
                        iPic.css({'left':0});
                    }else{
                        iPic.css({'left':iPicLeftPx+"px"});
                    }
                }
            });
        });
    }
}


//微信扫一扫
function wxScanCode() {
    if(is_weixn()){
        showAllzz("请在微信下使用！");
        return false;
    }
    wx.scanQRCode({
        needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType : [ "qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有("barCode" )
        success : function(res) {
            // 当needResult 为 1 时，扫码返回的结果
            JSON.stringify(res);
            //res.errMsg;错误信息
            //res.resultStr;扫描结果
            var aaa=res.resultStr;
            var pid= aaa.split(',');
            if(pid[1]){
                $.ajax({
                    url:'/wap/wapAjaxModule.php?ajax_type=10&username='+user_name+'&pro_sn='+pid[1],
                    type:'get',
                    success:function(data){
                        if($.trim(data)){
                            window.location.href=data;
                        }else{
                            showAllzz("商品编号有误!");
                            return false;
                        }
                    }
                })
            }
        },
        fail : function(res) {
            JSON.stringify(res);
            alert(res.errMsg);
        }
    });
}

// 禁止微信字体放大
(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
})();


//打开某个地址
function openNewWin(url){
    if(window.readCookie && readCookie('zz_userid')){
        if(url.indexOf('?') !== -1){
            url = url+'&';
        }else{
            url = url+'?';
        }
        url = url + 'zz_userid=' + readCookie('zz_userid')
    }
    window.open(`${url}`);
}
