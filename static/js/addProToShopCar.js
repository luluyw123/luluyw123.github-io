var readCookieFun = {
    setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    checkCookie: function() {
        var user = getCookie("username");
        if (user != "") {
            alert("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                setCookie("username", user, 365);
            }
        }
    }
}
var userLocationJson = null;
var loadBaiduMap = function (sFun,eFun) {
    var oHead = document.getElementsByTagName("HEAD").item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src =
        "http://api.map.baidu.com/getscript?v=3.0&ak=tYLSdsr5kI9c9tjf1Q0CxEPPB8wNgMdG&services=&t=20210105095946";
    oHead.appendChild(oScript);
    oScript.onload = function (date) {
        new BMap.Geolocation().getCurrentPosition(
            function(r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    //通过Geolocation类的getStatus()可以判断是否成功定位。
                    var point = new BMap.Point(r.point.lng, r.point.lat);
                    (new BMap.Geocoder()).getLocation(point, function (rs) {
                        userLocationJson = rs.addressComponents;
                        var arr = [];
                        userLocationJson.province && arr.push(userLocationJson.province);
                        userLocationJson.city && arr.push(userLocationJson.city);
                        userLocationJson.district && arr.push(userLocationJson.district);
                        if(arr.length){
                            readCookieFun.setCookie('supplyCity', JSON.stringify({
                                1: arr.join(' ')+''})
                            );
                            sFun();
                        }
                    });
                }else{
                    eFun();
                }
            },
            { enableHighAccuracy: true }
        );
    };
};

// 数据请求
function ajaxRequest(url,data,type,callback){
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: 'JSON',
        success: function(data){
            callback(data,true)
        },
        error: function(data){
            callback(data,false)
        }
    })
}
//数量修改
function updateShoppingCardNum(i) {
    if ($("#toolShoppingCar").length > 0) {
        if($("#toolShoppingCar em").length > 0){
            $("#toolShoppingCar em").html(i);
        }else{
            $("#toolShoppingCar b").append("<em>"+i+"</em>");
        }
    }
    if($("#fixedShopCar").length > 0){
        if ($("#footShopCarNum").length > 0) {
            $("#footShopCarNum").html(i);
        }else{
            $("#fixedShopCar").append('<i id="footShopCarNum" >'+i+'</i>');
           if(cart_num_back_color){
            $('#footShopCarNum').css("background-color",cart_num_back_color);
           }
           if(cart_num_text_color){
            $('#footShopCarNum').css("color",cart_num_text_color);
           }
        }
    }
    if ($("#topShopCarNum").length > 0) {
        $("#topShopCarNum").html(i);
    }
}
// 加入购物车
function addShops(proId,specId,proNum){
    var param_id = 0;
    var gouwuche = readCookie(user_name+'_gouwuche');

    if (specId) {
        param_id = specId
    }

    var isUpdate = 0;
    var i = 0;
    var price_val = 0;
    if (gouwuche) {
        var aOrder = JSON.parse(gouwuche);
        // var carAllnum = 0;
        for (key in aOrder) {
            // carAllnum = carAllnum+ parseInt(aOrder[key].num);
            if(key==(proId+'_'+param_id)){
                aOrder[key]={'num':parseInt(aOrder[key].num)+parseInt(proNum),'sort':aOrder[key].sort};
                var tmp_str = JSON.stringify(aOrder);
                writeCookie(user_name +'_gouwuche', tmp_str, 3600*7);
                isUpdate = 1;
                i = i+1;
            } else {
                i = i+1;
            }

        }
        if (!isUpdate) {
            if(i>100){
                showAllzz($weisiteLa.shoppingCardYiMan+"！");
                return false;
            }
            i = i+1;
            aOrder[proId+'_'+param_id]={'num':proNum,'sort':i};
            var tmp_str = JSON.stringify(aOrder);
            writeCookie(user_name +'_gouwuche',tmp_str, 3600*7);
            // carAllnum = nCount.add(carAllnum,proNum);
        } else {
            // carAllnum = nCount.add(carAllnum,1);
        }
        // updateShoppingCardNum(carAllnum);
    }else{
        //初始情况
        var arrayObj = {};
        arrayObj[proId +"_"+ param_id]={'num':proNum,'sort':i};
        var tmp_str = JSON.stringify(arrayObj);
        // updateShoppingCardNum(proNum);
        writeCookie(user_name+'_gouwuche',tmp_str,3600*7);
    }
    // 获取购物车数量
    ajaxRequest('/mallorder/api/quantity.php',{'username':user_name},'get',function(data){
        updateShoppingCardNum(data);
    })
    var type = null
    if(specId == 0){
        type = pro_language_info.shangpin
    }else{
        type= pro_language_info.guige
    }
    alert_frame(pro_language_info.dangqianxuanzede+type+pro_language_info.yichenggongjiarugouwuche+'！');
    // alert_frame($weisiteLa.DangQianChanPinJiaRuChengGong+'！');
}
// 选择规格数据
function setSpec(data,join){
    // 图片获取
    var imgSrc = data.pro_pic == '' ? join.pic : data.pro_pic
    // 钱币符号
    var icon = data.pro_price <= 0 || data.pro_price == '' ? '' : join.icon
    $('.popupWin').find('.pic img').attr('src',imgSrc)
    if(data.pro_tag == '' && data.pro_original_price_show == ''){
        $('.popupWin').find('.pro').html('<font>'+icon+data.pro_price_show+'</font>')
    }else{
        $('.popupWin').find('.pro').html('<font>'+icon+data.pro_original_price_show+'</font><span><em>'+join.icon+data.pro_price_show+'</em></span>')
        if(data.pro_tag != ''){
            if(data.pro_tag == '会员价' || data.pro_tag == '会员折扣'){
                $('.popupWin').find('.pro span').append('<i class="type1">'+data.pro_tag+'</i>')
            }else{
                $('.popupWin').find('.pro span').append('<i class="type2">'+data.pro_tag+'</i>')
            }
        }
    }
    if(parseInt(data.pro_stock) < 1){
        $('.popupWin').find('.winHead .pic').append('<em></em>')
    }else{
        $('.popupWin').find('.winHead .pic em').remove()
    }
    $('.popupWin').find('.integral').html()
    $('.popupWin').find('.setInfo').html()
    // 限购
    if(data.restrict_num != 0){
        $('.popupWin').find('.restrict').text('限购'+data.restrict_num+'件')
    }
    // $('.popupWin').find('.specInfo').html()
    $('.popupWin').find('.handle font').text(join.num)
    // 批发商品
    if(data.wholesale_info.length){
        var wholesale = ''
        $.each(data.wholesale_info,function(index,item){
            var arr = item.split('_')
            if(index == 0){
                wholesale += '<p>'+join.laguage.man+arr[0]+join.laguage.meijian+join.emptyIcon+arr[1]+'</p>'
            }else{
                wholesale += '<p>'+join.laguage.man+(parseInt(arr[0])+1)+join.laguage.meijian+join.emptyIcon+arr[1]+'</p>'
            }
        })
        if($('.popupWin').find('.batch').css('display') == 'none'){
            $('.popupWin').find('.batch').show()
        }
        $('.popupWin').find('.batch .labs').html(wholesale)
    }else{
        $('.popupWin').find('.batch').hide()
    }
    // is_buy：0为不可购买 1为可购买
    if(data.is_buy == '0'){
        $('.popupWin').find('.btnGroup a').addClass('noShop').text(data.err_msg)
        if($('.popupWin').find('.btnGroup a').length > 1){
            $('.popupWin').find('.btnGroup a').eq(1).hide()
        }
    }else{
        if(($('.proMobile').length && $('.proMobile').css('display') == 'block') || !$('.proMobile').length){
            $('.popupWin').find('.btnGroup a').removeClass('noShop').show()
        }else{
            $('.popupWin').find('.btnGroup a').addClass('noShop')
            if($('.popupWin').find('.btnGroup a').length > 1){
                $('.popupWin').find('.btnGroup a').eq(1).hide()
            }
        }
        if($('.popupWin').find('.btnGroup a').length == 2){
            $('.popupWin').find('.btnGroup a').eq(0).text(join.btnInfo.buy_define_name)
            $('.popupWin').find('.btnGroup a').eq(1).text(join.btnInfo.add_define_name)
        }else{
            $('.popupWin').find('.btnGroup a').text(join.btnInfo.buy_define_name)
        }
    }
}
// 筛选数组中重复数据
function filterData(arr){
    var s = arr.join(",")+",";
    if(arr.length>1){
        for(var i=0;i<arr.length;i++) {
            if(s.replace(arr[i]+",","").indexOf(arr[i]+",")>-1) {
                return arr[i]
            }
        }
    }else{
        return arr[0]
    }
}
function shopsPopup(json){
    var setIphone = $('<div class="pageshadowTel"><div class="page"><div class="ptitle"><p>选择号码</p><div class="closeIphone" id="close_phone"></div></div><div class="psearch"><input type="text" name="" placeholder="请输入"><span class="searchbtn" id="search_phone"></span></div><ul class="pcont"></ul><div class="okbtn">确认</div></div></div>')
    var showImg = $('<div class="showImgFixed"></div>')
    ajaxRequest('/mallorder/api/specinfo.php',json,'POST',function(data){
        var setArr = []
        var popup = $('<div class="popupWin"><div class="popupMain"></div></div>');
        // 头部信息
        var join = {
            proId : data.pro_id, // 商品id
            small : parseInt(data.pro_small), // 最小定量
            stock : parseInt(data.pro_stock), // 库存
            noPic : data.pro_nopic, // 无图片
            icon : data.currency_symbol, // ￥符号
            emptyIcon : data.currency_symbol,
            btnInfo : data.button_info, // 按钮信息
            setSpecData : data,
            laguage : data.laguage_info,
        }
        /*var proId = data.pro_id // 商品id
            ,small = parseInt(data.pro_small) // 最小定量
            ,stock = parseInt(data.pro_stock) // 库存
            ,noPic = data.pro_nopic // 无图片
            ,icon = data.currency_symbol // ￥符号
            ,emptyIcon = data.currency_symbol
            ,btnInfo = data.button_info // 按钮信息
            ,setSpecData = data
            ,laguage = data.laguage_info*/
            //is_show_add // 是否显示加入购物车
            // phone_info // 手机号码 有值手机选号显示
        var imgSrc = data.pro_pic == '' ? data.pro_nopic : data.pro_pic
        popup.find('.popupMain').append('<input type="hidden" id="specId" value="0"/><a href="javascript:;" class="close">+</a><div class="winHead">'+
            '<span class="pic">'+
                '<img src="'+imgSrc+'">'+
            '</span>'+
            '<div class="headInfo"><div class="tit"></div>'+
            '</div>'+
        '</div>')
        // 判断钱币符是否显示
        if(data.pro_price <= 0 || data.pro_price == ''){
            join.emptyIcon = ''
        }
        // 价格显示
        if(data.pro_tag == '' && data.pro_original_price_show == ''){
            popup.find('.tit').append('<h2 class="pro"><font>'+join.emptyIcon+data.pro_price_show+'</font></h2>')
        }else{
            popup.find('.tit').append('<h2 class="pro"><font>'+join.emptyIcon+data.pro_original_price_show+'</font><span><em>'+join.emptyIcon+data.pro_price_show+'</em></span></h2>')
        }
        // 标签类型
        if(data.pro_tag != ''){
            if(data.pro_tag == '会员价' || data.pro_tag == '会员折扣'){
                popup.find('.pro span').append('<i class="type1">'+data.pro_tag+'</i>')
            }else{
                popup.find('.pro span').append('<i class="type2">'+data.pro_tag+'</i>')
            }
        }
        // 积分使用
        if(data.jifen_must_num > 0){
            popup.find('.tit').append('<p class="integral">'+join.laguage.bixushiyong+data.jifen_must_num+data.xf_name+'</p>')
        }
        // 当前选择
        popup.find('.headInfo').append('<div class="setInfo">'+join.laguage.yixuan+'：<span></span></div>')
        popup.find('.popupMain').append('<div class="conMain"></div>')
        // 产品规格
        if(data.spec_info.length){
            popup.find('.conMain').append('<div class="specInfo"></div>')
            $.each(data.spec_info,function(index,item){
                popup.find('.specInfo').append('<h3>'+item.name+'</h3><dl></dl>')
                $.each(item.spec,function(cIndex,cItem){
                    // 默认选择
                    if(cItem.is_default == 1){
                        popup.find('.setInfo span').text(popup.find('.setInfo span').text() +'“'+cItem.name+'” ')
                        popup.find('.specInfo dl:eq('+index+')').append('<dd class="active" data-arr="'+cItem.param_ids+'">'+cItem.name+'</dd>')
                        $.each(cItem.param_ids, function(nIndex,nItem){
                            setArr.push(nItem)
                        })
                    }else{
                        popup.find('.specInfo dl:eq('+index+')').append('<dd data-arr="'+cItem.param_ids+'">'+cItem.name+'</dd>')
                    }
                })
            })
        }
        if(data.spec_info.length){
            join.setSpecData = data.pro_spec[filterData(setArr)]
        }
        // 当前选择
        if(!data.spec_info.length || join.setSpecData == undefined){
            popup.find('.setInfo').hide()
        }
        // 选择手机号
        if(data.phone_info.length){
            popup.find('.conMain').append('<div class="setMobile"><h3>'+join.laguage.qingxuanze+join.laguage.shoujihao+'</h3><p><a href="javascript:;" class="setBtn">'+join.laguage.lijixuanhao+'</a></p></div>')
            popup.find('.conMain').append('<div class="proMobile"><h3>'+join.laguage.yixuan+join.laguage.shoujihao+'</h3><dl></dl></div>')
            $.each(data.phone_info, function(index,item){
                setIphone.find('.pcont').append('<li>'+item.phone+'</li>')
            })
        }
        // 购买数量
        if(!data.phone_info.length){
            popup.find('.conMain').append('<div class="shopNum"><label>'+join.laguage.goumaishuliang+'</label></div>')
        }
        // 限购
        if(data.restrict_num != 0){
            popup.find('.shopNum').append('<span class="restrict">'+join.laguage.xiangou+data.restrict_num+join.laguage.meijian+'</span>')
        }
        // 最小定量
        if(join.small > 1){
            popup.find('.shopNum').append('<span class="small">'+join.small+join.laguage.meijian+join.laguage.qishou+'</span>')
        }
        // 添加数量
        popup.find('.shopNum').append('<span class="handle">'+
            '<em class="minus">-</em>'+
            '<input value="'+join.small+'">'+
            '<em class="add new-bg">+</em>'+
        '</span>')
        // 商品批发
        if(data.wholesale_info.length){
            popup.find('.conMain').append('<div class="batch"><h3>'+join.laguage.pifa+'</h3><div class="labs"></div></div>')
            $.each(data.wholesale_info,function(index,item){
                var arr = item.split('_')
                if(index == 0){
                    popup.find('.labs').append('<p>'+join.laguage.man+arr[0]+join.laguage.meijian+join.emptyIcon+arr[1]+'</p>')
                }else{
                    popup.find('.labs').append('<p>'+join.laguage.man+(parseInt(arr[0])+1)+join.laguage.meijian+join.emptyIcon+arr[1]+'</p>')
                }
            })
        }else{
            popup.find('.conMain').append('<div class="batch" style="display:none;"><h3>'+join.laguage.pifa+'</h3><div class="labs"></div></div>')
        }
        // 购买按钮
        var buyStyle='',addStyle=''
        if(join.btnInfo.is_define == 1){
            buyStyle = 'background:'+join.btnInfo.buy_bg+'; color:'+join.btnInfo.buy_text+';'
            addStyle = 'background:'+join.btnInfo.add_bg+'; color:'+join.btnInfo.add_text+';'
        }
        if(join.setSpecData != undefined){
            if(data.is_buy == 1 && !data.phone_info.length){
                if(data.is_show_add == 1){
                    popup.find('.popupMain').append('<div class="btnGroup"><a href="javascript:;" class="new-gradient TwoBtn buyBtn" style="'+buyStyle+'">'+join.btnInfo.buy_define_name+'</a><a href="javascript:;" class="new-bg TwoBtn shopBtn" style="'+addStyle+'">'+join.btnInfo.add_define_name+'</a></div>')
                }else{
                    popup.find('.popupMain').append('<div class="btnGroup"><a href="javascript:;" class="new-gradient buyBtn" style="'+buyStyle+'">'+join.btnInfo.buy_define_name+'</a></div>')
                }
            }else{
                if(data.is_show_add == 1){
                    popup.find('.popupMain').append('<div class="btnGroup"><a href="javascript:;" class="new-gradient TwoBtn buyBtn noShop" style="'+buyStyle+'">'+join.btnInfo.buy_define_name+'</a><a href="javascript:;" class="new-bg TwoBtn shopBtn noShop" style="'+addStyle+'">'+join.btnInfo.add_define_name+'</a></div>')
                }else{
                    popup.find('.popupMain').append('<div class="btnGroup"><a href="javascript:;" class="new-gradient oneBtn buyBtn noShop" style="'+buyStyle+'">'+join.btnInfo.buy_define_name+'</a></div>')
                }
            }
        }else{
            popup.find('.popupMain').append('<div class="btnGroup"><a href="javascript:;" class="oneBtn buyBtn noShop" style="'+buyStyle+'">'+join.btnInfo.buy_define_name+'</a></div>')
        }
        if(join.stock < 1){
            popup.find('.winHead .pic').append('<em></em>')
        }
        $('body').append(popup)
        $('body').append(setIphone)
        del_layer();
        if(data.spec_info.length && join.setSpecData != undefined){
            setSpec(data.pro_spec[filterData(setArr)],join)
            popup.find('#specId').val(filterData(setArr))
        }
        // 关闭弹窗
        popup.click(function(){
            popup.remove()
            setIphone.remove()
        })
        popup.on('click', '.popupMain', function(e){
            e.stopPropagation()
        })
        popup.find('.close').click(function(){
            popup.remove()
            setIphone.remove()
        })
        // 展示图片
        popup.on('click', '.pic', function(){
            $('body').append(showImg)
            showImg.html('<img src="'+$(this).find('img').attr('src')+'">')
            showImg.click(function(){
                showImg.remove()
            })
        })
        // 选择规格
        if((data.spec_info.length && join.setSpecData != undefined) || !data.spec_info.length){
            popup.on('click','.specInfo dd',function(){
                $(this).addClass('active').siblings().removeClass('active')
                setArr = []
                popup.find('.setInfo span').empty()
                popup.find('.specInfo dd.active').each(function(){
                    var newArr = $(this).attr('data-arr').split(',')
                    popup.find('.setInfo span').text(popup.find('.setInfo span').text() +'“'+$(this).text()+'” ')
                    $.each(newArr,function(index,item){
                        setArr.push(item)
                    })
                })
                join.setSpecData = data.pro_spec[filterData(setArr)]
                setSpec(data.pro_spec[filterData(setArr)],join)
                popup.find('#specId').val(filterData(setArr))
            })
            // 减
            popup.on('click', '.handle .minus', function(){
                var self = $(this), input = self.next('input')
                if(input.val() > join.small){
                    input.val(parseInt(input.val())-1)
                }else{
                    alert_frame('购买数量小于最小定量！')
                }
            })
            // 加
            popup.on('click', '.handle .add', function(){
                var self = $(this), input = self.prev('input')
                if((data.restrict_num == 0 || input.val() < data.restrict_num) && input.val() <= join.stock){
                    input.val(parseInt(input.val())+1)
                }else if(self.val() >= join.stock){
                    alert_frame('超过库存数量！')
                }
            })
            // 输入数量
            popup.on('change', '.handle input', function(){
                var self = $(this), reg = /^\+?[1-9][0-9]*$/
                if(!reg.test(self.val()) || (data.restrict_num != 0 && self.val() > data.restrict_num) || self.val() > join.stock || self.val() < join.small){
                    if(self.val() > join.stock){
                        alert_frame('超过库存数量！')
                    }else{
                        alert_frame('购买数量小于最小定量！')
                    }
                    self.val(join.small)
                }
            })
            // 选择/更换手机号
            popup.on('click', '.setBtn,.proMobile dd', function(){
                setIphone.show()
            })
        }
        // 手机号搜索
        setIphone.on('click', '#search_phone', function(){
            var val = $(this).prev().val()
            setIphone.find('.pcont').empty()
            if(!$.trim(val)){
                $.each(data.phone_info, function(index,item){
                    setIphone.find('.pcont').append('<li>'+item.phone+'</li>')
                })
            }else{
                $.each(data.phone_info, function(index,item){
                    if(item.phone.indexOf(val) >= 0){
                        setIphone.find('.pcont').append('<li>'+item.phone+'</li>')
                    }
                    if(index == data.phone_info.length-1 && !setIphone.find('.pcont li').length){
                        setIphone.find('.pcont').html('<li class="noCon">暂无匹配到手机号码！</li>')
                    }
                })
            }
        })
        // 选择号码
        setIphone.on('click', '.pcont li', function(){
            if(!$(this).hasClass('noCon')){
                $(this).addClass('active').siblings().removeClass('active')
            }
        })
        // 确定选择
        setIphone.on('click', '.okbtn', function(){
            var active = setIphone.find('.pcont .active')
            if(active.length){
                popup.find('.setMobile').hide()
                popup.find('.proMobile dl').html('<dd class="active">'+active.text()+'</dd><dd class="replace">'+join.laguage.genghuan+'</dd>')
                popup.find('.proMobile').show()
                if(join.setSpecData.is_buy == 1){
                    popup.find('.btnGroup a').removeClass('noShop')
                }
            }else{
                popup.find('.proMobile').hide()
            }
            setIphone.hide()
        })
        // 关闭号码选择
        setIphone.on('click', '.closeIphone', function(){
            setIphone.hide()
        })
        // 立即购买
        popup.on('click', '.buyBtn', function(){
            var self = $(this),
                specId= popup.find('#specId').val(),     // 产品id
                proNum = null, // 产品数量
                iphoneVal = null // 手机号
            if(!self.hasClass('noShop')){
                if(data.phone_info.length){
                    proNum = 1
                    iphoneVal = popup.find('.proMobile .active').text()
                }else{
                    proNum = popup.find('.handle input').val()
                }
                writeCookie('is_liji', 1, 3600*24);
                writeCookie('liji_pro_num', proNum, 3600*24);
                writeCookie('liji_param_pro', join.proId +"_"+ specId, 3600*24);
                
                if(data.phone_info.length){  
                    location.href="/VFrontend/order/submitOrder/index?username="+user_name+"&buy_now_param="+JSON.stringify([{
                          "pro_id": join.proId,
                          "param_id": specId ? specId : 0,
                          "num": proNum,
                          "val": iphoneVal
                    }]);
                }else{
                    location.href="/VFrontend/order/submitOrder/index?username="+user_name+"&buy_now_param="+JSON.stringify([{
                          "pro_id": join.proId,
                          "param_id": specId ? specId : 0,
                          "num": proNum
                    }]);
                }
            }
        })
        // 加入购物车
        popup.on('click', '.shopBtn', function(){
            var self = $(this),
                specId= popup.find('#specId').val(),     // 产品id
                proNum = null // 产品数量
            if(data.phone_info.length){
                proNum = 1
            }else{
                proNum = popup.find('.handle input').val()
            }
            if(!self.hasClass('noShop')){
                // if(!proId){ return false; }
                addShops(join.proId,specId,proNum)
                popup.remove()
                setIphone.remove()
            }
        })

    })
}
$(function(){
    $('#pro_listInfo').on('click', '.list_shopping_img img',function(){
        var proId = $(this).parent().data('pid'),
            is_join = $(this).parent().data('is_join');
        if (is_join == 1) {
            addShops(proId,0,1)
        } else {
            var supplyCity = readCookieFun.getCookie('supplyCity');
            var obtainStatus = readCookieFun.getCookie('obtainStatus');
            var supplyCoding_address = readCookieFun.getCookie('supplyCoding_address');
            var json = {
                pro_id: proId,
                username: user_name
            }

            if(supplyCoding_address){
                json.regionCode = supplyCoding_address
            }
            alert_layer();
            shopsPopup(json);
        }
    });
    // 搜索
    $('.ev_t_top_search_a .inputm').click(function(){
        $('.searchPop').addClass('showCon')
        $('#top_keyword').focus()
    });
    $('.searchPop .fixedBg').click(function(){
        $('.searchPop').removeClass('showCon')
    });
    $('.searchPop .sBtn').click(function(){
        var keyword = $.trim($('.searchFixed #top_keyword').val());
        if (!keyword) {
            showAllzz($weisiteLa.GuanJianZiBuNengWeiKong);
            return false;
        }
        $('.searchFixed #search_form').submit();
    });
    var supplyCity = readCookieFun.getCookie('supplyCity');
    if(!supplyCity && channel_type === 102){
        var getJdAddressCode = function(j){
            $.ajax({
                url: '/eeeapi/Frontend/Supplychain/getJdAddressCode',
                data:{
                    address: j.address,
                    username: user_name
                },
                success: function(res){
                    if(res.code == 200){
                        readCookieFun.setCookie(j.cookKey, res.data)
                    }
                },
                dataType: 'json'
            });
        }
        loadBaiduMap(function(){
            //通过省获取地址编码
            getJdAddressCode({address:userLocationJson.province,cookKey: 'supplyCoding_address'});
            //通过省市区获取地址编码
            getJdAddressCode({address:JSON.parse(readCookieFun.getCookie('supplyCity'))['1'],cookKey: 'supplyCoding'});
        }, function(){
            var zz_userid = readCookieFun.getCookie('zz_userid');
            if(zz_userid){
                $.ajax({
                    url: '/eeeapi/Frontend/mallorder/getAddressList',
                    data:{
                        zz_userid: zz_userid,
                        type: 1,
                        req:'',
                        username: user_name,
                        client_type: 1
                    },
                    success: function(res){
                        var defAdd;
                        if(res.code === 200 && res.data && res.data.list && res.data.list.length){
                            defAdd = res.data.list.find(function(v){
                               return v.is_default == 1;
                            });
                            if(!defAdd){
                                defAdd = res.data.list[0];
                            }
                        }
                        if(defAdd){
                            getJdAddressCode({address:defAdd.province,cookKey: 'supplyCoding_address'});
                            getJdAddressCode({address: defAdd.province + ' ' + defAdd.city + ' ' + defAdd.district ,cookKey: 'supplyCoding'});
                        }
                    },
                    dataType: 'json'
                })
            }else{
                getJdAddressCode({address: '北京' ,cookKey: 'supplyCoding_address'});
                getJdAddressCode({address: '北京' ,cookKey: 'supplyCoding'});
            }
        });
    }
})
