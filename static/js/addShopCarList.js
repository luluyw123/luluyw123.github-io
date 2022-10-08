//产品列表页 加入购物车
$(function(){
    $('.exhibition_demo, #contents').on("click", ".list_shopping_img,.list_shopping_img_cl", function(){
        var id        = parseInt($(this).data("pid"));
        var feature   = parseInt($(this).data("feature"));
        if (feature) {
            window.location.href = "/"+user_name+"/wap_pro/"+id+".html";
            return;
        }

        var obj = $(this);
        showCarBox(id,obj);
        return;
    });

    function showCarBox (pid,obj) {
        if (parseInt(obj.data("ch"))) {
            var channelId = parseInt(obj.data("ch"));
        } else {
            var channelId = parseInt($('#channel_id').val());
        }

        if (!pid || !channelId) {
            return false;
        }
        alert_layer();
        var url = '/wap/ajaxShopCarList.php';
        $.ajax({
            url : url,
            type : 'POST',
            data : {pid:pid,username:user_name,isGuiGe:1,channel_id:channelId},
            success : function(data){
                if ($("#fixedShopCar").length) {
                    $("#fixedShopCar").hide();
                }
                del_layer();
                $("#specHtml").html(data);
                if($(".toolMenu").length){
                    $("#specHtml .alert_div,#specHtml .ev_t_position").css("bottom","42px");
                }
                $("#specHtml").show();
            }
        });
    }
});

function get_product_all_num() {
    if ($("#Real_stock").length>0) {
        var iAllNum = parseInt($("#Real_stock").val());
        if (iAllNum < 1) {
            $("#inner_nowBuy,#inner_addCat").attr('pay', 'fail');
            $("#pro_num").html(0);
            showAllzz("暂无供货！");
            return false;
        }
    }else{
        var iAllNum = 99999;
    }

    return iAllNum;
}
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
function get_product_min_num() {
    if ($("#min_num").length>0) {
        var min_num = parseInt($("#min_num").text());
    } else {
        var min_num = 1;
    }

    return min_num;
}

function pro_sn (guige_param) {
    if (!guige_param) {
        return false;
    }

    var tmp_sn = '';
    var tmp_sn_param = '';
    for (var i=0; i < guige_param.length; i++) {
        $.each($("#pro_param_"+guige_param[i]+" span"), function (m, item) {
            if ($(this).hasClass('bg_color1')) {
                tmp_sn += guige_param[i] + ':' + parseInt($(this).attr('data-id')) + '|';
            }
        });
    }
    tmp_sn = tmp_sn.substring(0, tmp_sn.length-1);
    tmp_sn_param = Base64.encode(tmp_sn);
    tmp_sn_param = tmp_sn_param.replace(/\+/g, '-').replace(/\//g, '_');
    return tmp_sn_param;
}

function param_combination_price(info) {
    var fail          = 0;
    var Real_stock    = parseInt($('#Real_stock').val()); // 供货数量
    var shop_num      = parseInt($('#pro_num').val()); // 数量
    var param_str     = sStatus = '';
    var id            = parseInt($("#id").val());
    if (id < 1 || isNaN(id)) { return false; }
    if (guige_param) {
        param_str = pro_sn(guige_param);
    } else {
        return false;
    }
    alert_layer();
    $.post(
        '/Ajax/GuiGe.php',
        {type:18, sn:param_str, id:id,buyCnt:shop_num,username:user_name,isUserInfo:1,wap:1},
        function (data) {
            if (!data) {
                del_layer();
                $("#inner_nowBuy,#inner_addCat").addClass("goDisabledBut").attr("pay", 'fail');
                $("#shop_price").html('暂无价格');
                $("#Real_price").val(0);
                $("#all_num").html(0);
                $("#Real_stock").val(0);
                $("#weight").hide();
                $("#pro_weight").html('');
                $("#Real_weight").val(0);
                $("#send_jifen").val(0);
                $('#proPrice').html('暂无价格');
                $('#money_unit').hide();
                if ($("#limitNum").length > 0) {
                    $("#limitNumBox").hide();
                    $("#limitNum").html(0);
                }
                return false;
            }
            var param_id  = parseInt(data.guigeId);
            var weight    = parseFloat(data.weight);
            var num       = parseInt(data.buyStock);
            var shopStock = parseInt(data.shopStock);
            var price     = parseFloat(data.price);
            var restrict_num = parseInt(data.restrict_num);
            var userPro   = data.userPro;
            var presales  = data.presales;

            if ($("#guige_img").length > 0 && data.imgPath) {
                $("#guige_img").attr('src', data.imgPath);
            }
            del_layer();
            if ($("#limitNum").length > 0) {
                var limitNum = parseInt(data.limitBuyNum);
                if (limitNum) {
                    $("#limitNum").html(limitNum);
                    $("#limitNumBox").show();
                } else {
                    $("#limitNumBox").hide();
                }
            }

            var show_parice  = (price <= 0) ? '暂无价格' : '￥'+ price;
            var send_jifen   = 0;
            if (price <= 0) {
                show_parice = '暂无价格';
                $("#jifen").hide();
                $('#money_unit').hide();
            } else {
                show_parice = '￥'+ price;
                if(G_.sendjifen>=0){
                    if(G_.sendjifen>0){
                        $("#jifenNum").html(G_.sendjifen);
                        $("#jifen").show();
                    }
                }else{
                    if (G_.jifen) {
                        if (price >= G_.jifen) {
                            jifen = parseInt(price / G_.jifen);

                            $("#jifenNum").html(jifen);
                            $("#jifen").show();
                        } else {
                            $("#jifen").hide();
                        }
                    }
                }
                $('#money_unit').show();
            }
            var actPrice = price;
            if (userPro && userPro.length != 0) {
                var tbStr = '',className = '',tmp_rebate_price=0,tmp_show=0;
                var rebate_arr = userPro['rebate_arr'];
                var cur_rebate = userPro['cur_rebate'];
                var rebate_type = userPro['rebate_type'];
                actPrice = cur_rebate['rebatePrice'];
                $.each(rebate_arr,function(index,item){
                    className = (item['user_level'] == cur_rebate['user_level']) ? ' class="cur"' : '';
                    if (rebate_type ==1) {
                        tmp_rebate_price = item['rebate_price'];
                        tmp_show = 1;
                    }else{
                        tmp_rebate_price = parseFloat(item['rebate']) /10;
                        tmp_rebate_price = (tmp_rebate_price * data.price).toFixed(2);
                        if (item['rebate'] > 0.00 && item['rebate'] <10.00){
                            tmp_show = 1;
                        }else{
                            tmp_show = 0;
                        }
                    }

                    if (tmp_show == 1){
                        tbStr +='<tr><td'+className+'>'+item['grade_name']+'</td><td'+className+'>&yen;'+tmp_rebate_price+'</td></tr>';
                    }
                })

                var curRebateInfo = '<span>'+cur_rebate['level_name']+'专享价</span><em>&yen;'+cur_rebate['rebatePrice']+'</em>';
                $('#userPro_1 tbody').html(tbStr);
                $('.plaint_div').html(curRebateInfo);

            }

            if (presales && presales.length != 0){
                var price_unit = $("#money_unit").html();
                $('#proPrice').parent().html('<strong><b id="presales_lable">定金：</b><b id="money_unit">'+price_unit+'</b><b id="proPrice">'+actPrice+'</b><b style="color: #888;font-weight: normal;font-size: 12px;margin-left: 5px;">预售价：'+price_unit+presales.price+'</b></strong>');
                var presales_price_list = presales.price_list;
                $.each(presales_price_list,function(index,item){
                    $("#current_"+index).html('￥'+item.price);
                })
            }else{
                $('#proPrice').html(actPrice);
            }

            var productSumPrice = actPrice*shop_num;
            $('#productSumPrice').html(productSumPrice);
            $('#stock').html(num);
            $("#shop_price").html(show_parice);
            $("#all_num").html(shopStock);
            $("#Real_stock").val(num);
            $("#Real_price").val(price);
            if(weight){
                $("#weight").show()
                $("#pro_weight").html(weight+'克');
            }else{
                $("#weight").hide();
                $("#pro_weight").html('');
            }
            $("#Real_weight").val(weight);
            $(".param_id").val(param_id);

            if(restrict_num > 0){
                $("#restrict_show_num").html(restrict_num);
                $("#restrict_num").val(restrict_num);
            }else{
                $(".restrict_text").hide();
                $("#restrict_num").val(0);
            }

            var Minimum_ord = parseInt($('#Minimum_ord').val());

            $('#proNum input').val(Minimum_ord);
            $("#pro_num").val(Minimum_ord);
            $('#proCnt').html(Minimum_ord);
            $('#productSumPrice').html(nCount.mul(Minimum_ord,actPrice));

            if (num == 0) {
                $('#inner_addCat').removeClass('goDisabledCar');
                $("#inner_nowBuy, #inner_addCat").removeClass("goDisabledBut")
                $("#inner_nowBuy, #inner_addCat").attr("pay", 'fail');
                if (!info) {
                    if ($("#specHtml").length > 0) {
                        showAllzz($weisiteLa.GaiGuiGeKuCunBuZu+"!");
                    } else {
                        showAllzz($weisiteLa.gongHuoBuZu+"！");
                    }
                }
                return false;
            } else if (price <= 0 && data.buy_for_zero == 0) {
                $("#inner_nowBuy, #inner_addCat").addClass("goDisabledBut").attr("pay", 'fail');
                // showAllzz("暂无价格！");
                return false;
            } else {
                if(Minimum_ord > num){
                    $("#inner_nowBuy, #inner_addCat").addClass("goDisabledBut").attr("pay", 'fail');
                    if ($("#specHtml").length > 0) {
                        showAllzz($weisiteLa.GaiGuiGeKuCunBuZu+"!");
                    } else {
                        showAllzz($weisiteLa.gongHuoBuZu+"！");
                    }
                    return false;
                } else {
                    $('#inner_addCat').removeClass('goDisabledCar');
                    $("#inner_nowBuy, #inner_addCat").removeClass("goDisabledBut").attr("pay", 'success');
                }
            }
        },
        'json'
    );
}

$(function(){
    $('#specHtml').on('click', '#closeSpecHtml, .alert_div_bg', function() {
        if ($("#fixedShopCar").length) {
            $("#fixedShopCar").show();
        }
        $('#specHtml').hide();
    });

    $("#specHtml").on('click', '.alert_color_c span', function(){
        $(this).siblings().removeClass('bg_color1');
        $(this).addClass('bg_color1');
        var tmp_val=$(this).text();
        $(this).parent().parent().find("input:hidden").val(tmp_val);
        param_combination_price();
    });

    $("#specHtml").on("click", '#inner_addCat, #inner_nowBuy', function(){
        if ($(this).attr("pay") == 'fail') {
            if ($("#specHtml").length > 0 && !tradeJson) {
                showAllzz($weisiteLa.GaiGuiGeKuCunBuZu+"!");
            } else {
                showAllzz($weisiteLa.gongHuoBuZu+"！");
            }
            return false;
        } else if ($(this).attr("pay") == 'allnum') {
            return false;
        } else if ($(this).attr("pay") == 'wait') {
            showAllzz($weisiteLa.gongHuoBuZu+"！");
            return false;
        } else if ($(this).attr("pay") == 'mmk') {
            showAllzz($weisiteLa.WeiDaDaoQiPiLiang+"！");
            return false;
        }

        id = parseInt($('#id').val());
        if(!id){ return false; }
        var pro_num       = parseInt($('#pro_num').val());
        var param_id      = parseInt($('.param_id').val());
        if(!param_id){
            param_id      = 0;
        }
        var sButId        = $.trim($(this).attr("id"));
        var gouwuche      = readCookie(user_name+'_gouwuche');
        var isUpdate      = 0;
        var i             = 0;
        var price_val     = 0;
        var param_val     = '';
        var param_val_new = '';
        var sn            = '';
        var isTradePrice  = $('#choose').data('istradeprice');

        if ($(this).attr("pay") == 'fail') {
            if ($("#specHtml").length > 0) {
                showAllzz($weisiteLa.GaiGuiGeKuCunBuZu+"!");
            } else {
                showAllzz($weisiteLa.gongHuoBuZu+"！");
            }
            return false;
        }
        if (isTradePrice) {
            addWholesaleCar(sButId);
            return false;
        }
        alert_layer();
        if (gouwuche) {
            var aOrder = JSON.parse(gouwuche);
            var carAllnum = 0;
            for (key in aOrder) {
                if(key==(id+'_'+param_id)){
                    aOrder[key]={'num':parseInt(aOrder[key].num)+pro_num,'sort':aOrder[key].sort};
                    var tmp_str = JSON.stringify(aOrder);
                    writeCookie(user_name +'_gouwuche', tmp_str, 3600*7);
                    isUpdate = 1;
                    i = i+1;
                } else {
                    i = i+1;
                }
                carAllnum = carAllnum+ parseInt(aOrder[key].num);
            }
            if (!isUpdate) {
                if(i>100){
                    showAllzz($weisiteLa.shoppingCardYiMan+"！");
                    del_layer();
                    return false;
                }
                i = i+1;
                aOrder[id+'_'+param_id]={'num':pro_num,'sort':i};
                var tmp_str = JSON.stringify(aOrder);
                writeCookie(user_name +'_gouwuche',tmp_str, 3600*7);
            }

            carAllnum = nCount.add(carAllnum,pro_num);
            updateShoppingCardNum(carAllnum);
        }else{
            //初始情况
            var arrayObj = {};
            arrayObj[id +"_"+ param_id]={'num':pro_num,'sort':i};
            var tmp_str = JSON.stringify(arrayObj);
            updateShoppingCardNum(pro_num);
            writeCookie(user_name+'_gouwuche',tmp_str,3600*7);
        }
        del_layer();
        if (sButId == 'inner_nowBuy') {
            sn = sn ? sn : '';
            writeCookie('is_liji', 1, 3600*24);
            writeCookie('liji_sn', sn, 3600*24);
            writeCookie('liji_pro_num', pro_num, 3600*24);
            writeCookie('liji_param_pro', id +"_"+ param_id, 3600*24);
            location.href="/VFrontend/order/submitOrder/index?username="+user_name+"&buy_now_param="+JSON.stringify([{
                          "pro_id": id,
                          "param_id": param_id ? param_id : 0,
                          "num": pro_num
                    }]); 
        } else {
            if (($("#specHtml").length > 0) && ($("#alert_color").length > 0)) {
                alert_frame($weisiteLa.DangQianChanPinJiaRuChengGong+'!');
            } else if (($("#specHtml").length > 0) && (!$("#alert_color").length)) {
                alert_frame($weisiteLa.DangQianChanPinJiaRuChengGong+'!');
            } else {
                alert_frame($weisiteLa.DangQianChanPinJiaRuChengGong+'！');
            }
            $("#closeSpecHtml").trigger('click');
        }
    })
});

function  addCookie(user_name, id, sn, param_val, param_val_new, price_val, pro_num,sButId){
    var gouwuche = readCookie(user_name+'_gouwuche');
    var isUpdate = 0;
    if (gouwuche) {
        var aOrder = gouwuche.split('@@');
        for (key in aOrder) {
            if (aOrder[key].indexOf(id+'###') == -1) { continue; }

            var aInfo = aOrder[key].split('###');
            aInfo[0] = parseInt(aInfo[0]);
            aInfo[1] = parseInt(aInfo[1]);
            if (id != aInfo[0]) { continue; }

            if (sn) {
                var sCookieSn = readCookie(user_name +'_gouwuche_'+ id +'_sn_'+ aInfo[1]);
                if (!sCookieSn || sn != sCookieSn) { continue; }
                isUpdate = 1;
            } else if (param_val_new) {
                var sCookieParam = readCookie(user_name +'_gouwuche_'+ id +'_param_new_'+ aInfo[1]);
                if (!sCookieParam || param_val_new != sCookieParam) { continue; }
                isUpdate = 1;
            } else {
                isUpdate = 1;
            }
            if (isUpdate) {
                var sCookieNum = parseInt(readCookie(user_name +'_gouwuche_'+ id +'_pro_num_'+ aInfo[1]));
                writeCookie(user_name +'_gouwuche_'+ id +'_pro_num_'+ aInfo[1], sCookieNum + 1, 3600*7);
                break;
            }
        } // for end
    }
    if (!isUpdate) {
        //初始情况
        var tmp_t   = UTCTimeDemo();

        writeCookie(user_name+'_gouwuche_'+id+'_pro_num_'+tmp_t,pro_num,3600*7);
        writeCookie(user_name+'_gouwuche_'+id+'_param_'+tmp_t,'',3600*7);
        writeCookie(user_name+'_gouwuche_'+id+'_param_new_'+tmp_t,'',3600*7);
        writeCookie(user_name+'_gouwuche_'+id+'_price_'+tmp_t,'',3600*7);
        writeCookie(user_name+'_gouwuche_'+id+'_sn_'+tmp_t,'',3600*7);
        writeCookie(user_name+'_gouwuche_'+id+'_pro_num_'+tmp_t,pro_num,3600*7);
        writeCookie(user_name+'_gouwuche_'+id+'_param_'+tmp_t,param_val,3600*7);
        writeCookie(user_name+'_gouwuche_'+id+'_param_new_'+tmp_t,param_val_new,3600*7);
        writeCookie(user_name+'_gouwuche_'+id+'_price_'+tmp_t,price_val,3600*7);
        writeCookie(user_name+'_gouwuche_'+id+'_sn_'+tmp_t,sn,3600*7);

    }
    if (!isUpdate) {
        !isUpdate ? gouwuche+='@@'+id+'###'+tmp_t : gouwuche='@@'+id+'###'+tmp_t;
        writeCookie(user_name+'_gouwuche',gouwuche,3600*7);
    }

    if (sButId == 'inner_nowBuy') {
        location.href="/dom/sc_shopcar_add.php?username="+user_name+"&wap=1";
    } else {
        var shoppingCarObj = $('#toolShoppingCar'),
            topShopCarObj = $('#topShopCarNum'),
            footShopCarObj = $('#footShopCarNum');

        if ( shoppingCarObj.find('i').length
            || topShopCarObj.length
            || footShopCarObj.length ) {
            var shopCarNum = 0;
            if (shoppingCarObj.find('i').length ) {
                shopCarNum = shoppingCarObj.find('i').html();
            } else if (topShopCarObj.length){
                shopCarNum = topShopCarObj.html();
            } else if (footShopCarObj.length){
                shopCarNum = footShopCarObj.html();
            }
            if (shopCarNum) {
                shopCarNum = parseInt(shopCarNum);
                shopCarNum = shopCarNum + parseInt(pro_num);
                if (shopCarNum) {
                    if (shoppingCarObj.find('i').length ) {
                         shoppingCarObj.find('i').html(shopCarNum);
                    }
                    if (topShopCarObj.length){
                         topShopCarObj.html(shopCarNum);
                    }
                    if (footShopCarObj.length){
                         footShopCarObj.html(shopCarNum);
                    }
                }
            }

        }
        alert_frame('加入购物车成功！');
        $("#closeSpecHtml").trigger('click');
    }
}

/**
    商品数量判断
*/
$("#pro_num").on('blur', function(){
    var
        iAllNum = get_product_all_num(),
        iMinNum = get_product_min_num();

    if (!iAllNum || !iMinNum) {
        return false;
    }

    if (iAllNum < iMinNum) {
        showAllzz($weisiteLa.gongHuoBuZu+"！");
        return false;
    }

    var reality_num = $("#pro_num").val();

    var is_number_var = /^[0-9]+.?[0-9]*$/;
    var is_number_zheng =  /^[1-9]+[0-9]*]*$/;
    if(!is_number_var.test(reality_num) || !is_number_zheng.test(reality_num) || reality_num > iAllNum){
        showAllzz('购买数量必须是大于等于'+ iMinNum +'小于'+ iAllNum +'的整数！');
        $("#pro_num").html(iMinNum);
        $('#proNum input').val(iMinNum);
        reality_num = iMinNum;
    }else{
        $('#proNum input').val(reality_num);
        $("#pro_num").html(reality_num);
    }
    var proPrice = parseFloat($('#proPrice').html());
    $('#proCnt').html(reality_num);
    $('#productSumPrice').html(nCount.mul(reality_num,proPrice));
    return false;
});
/**
    商品数量加减
*/
$(document).on("click", ".reduce, .plus", function(){
    var
        iAllNum = get_product_all_num(),
        iMinNum = get_product_min_num();

    if (!iAllNum || !iMinNum) {
        return false;
    }

    if (iAllNum < iMinNum) {
        showAllzz($weisiteLa.gongHuoBuZu+"！");
        return false;
    }
    var arithmetic = $(this).data("num");
    if (!arithmetic) {
        return false;
    }
    var restrict_num = parseInt($("#restrict_num").val());
    var proPrice = parseFloat($('#proPrice').html());
    var shop_num = parseInt($("#pro_num").val());
    if(arithmetic == 'reduce'){
        if(shop_num > iMinNum  &&  shop_num <= iAllNum){
             reality_num = parseInt(shop_num) - 1;
        }else{
            showAllzz($weisiteLa.GouMaiShuLiangBuNengXiaoYu+ iMinNum +$weisiteLa.HuoZheDaYu+ iAllNum +'！');
            return false;
        }
    }else if(arithmetic == 'add'){
        if(shop_num >= iMinNum &&  shop_num < iAllNum){
            if (restrict_num > 0) {
                if (restrict_num < iMinNum) {
                    showAllzz($weisiteLa.GouMaiShuLiangBuNengDaYu+ restrict_num +$weisiteLa.QieXiaoYu+ iMinNum +'！');
                    return false;
                }
                if (restrict_num < iAllNum && shop_num >= restrict_num) {
                    showAllzz($weisiteLa.GouMaiShuLiangBuNengDaYu+ restrict_num +'！');
                    return false;
                }
            }
            reality_num = parseInt(shop_num) + 1;
        }else{
            showAllzz($weisiteLa.GouMaiShuLiangBuNengXiaoYu+ iMinNum +$weisiteLa.HuoZheDaYu+ iAllNum +'！');
            return false;
        }
    }

    //批发价格设置
    if (typeof(tradeJson) != "undefined") {
        if (tradeJson) {
            if (reality_num <= parseInt(tradeJson.trade_price_num1)) {
                proPrice = tradeJson.trade_price1;
            } else if (reality_num > parseInt(tradeJson.trade_price_num1) && reality_num <= parseInt(tradeJson.trade_price_num2)) {
                proPrice = tradeJson.trade_price2;
            } else if (reality_num > parseInt(tradeJson.trade_price_num2)) {
                proPrice = tradeJson.trade_price3;
            }
        }
    }
    $('#proNum input').val(reality_num);
    $("#pro_num").val(reality_num);
    $('#proCnt').html(reality_num);
    $('#productSumPrice').html(nCount.mul(reality_num,proPrice));
    if (typeof(tradeJson) != "undefined") {
        if (tradeJson) {
            $("#footerMoney").html(nCount.mul(reality_num,proPrice));
            $("#footerBuyCnt").html(reality_num);
        }
    }
});

$(".yunsun1 input").on("blur", function(){
    var
        iAllNum = get_product_all_num(),
        iMinNum = get_product_min_num();

    if (!iAllNum || !iMinNum) {
        return false;
    }

    if (iAllNum < iMinNum) {
        showAllzz($weisiteLa.gongHuoBuZu+"！");
        return false;
    }
    var proPrice = parseFloat($('#proPrice').html());
    var textNum = parseInt($(this).val());
    if (!textNum) {
        return false;
    }
    if (typeof(tradeJson) != "undefined") {
        if (tradeJson) {
            var inputNum = parseInt($('#proNum input').val());
            if (inputNum <= parseInt(tradeJson.trade_price_num1)) {
                proPrice = tradeJson.trade_price1;
            } else if (inputNum > parseInt(tradeJson.trade_price_num1) && inputNum <= parseInt(tradeJson.trade_price_num2)) {
                proPrice = tradeJson.trade_price2;
            } else if (inputNum > parseInt(tradeJson.trade_price_num2)) {
                proPrice = tradeJson.trade_price3;
            }
        }
    }
    if(textNum >= iMinNum &&  textNum < iAllNum){
        var reality_num = textNum;
    }else{
        var reality_num = iMinNum;
        showAllzz($weisiteLa.GouMaiShuLiangBuNengXiaoYu+ iMinNum +$weisiteLa.HuoZheDaYu+ iAllNum +'！');
    }

    $(this).val(reality_num);
    $("#pro_num").val(reality_num);
    $('#proCnt').html(reality_num);
    $('#productSumPrice').html(nCount.mul(reality_num,proPrice));
    if (typeof(tradeJson) != "undefined") {
        if (tradeJson) {
            $("#footerMoney").html(nCount.mul(reality_num,proPrice));
            $("#footerBuyCnt").html(reality_num);
        }
    }
});

function addWholesaleCar(sButId) {
    var isSuccess = 0;
    var wholesaleType = parseInt($("#is_trade_dynamic_type").val());
    var minimum = parseInt($('#pifa_table').data('minum'));//起批量
    var minSale = parseInt($('#pifa_table').data('miniSale'));//最小定量
    var chooseNum = 0;
    var isStop = 0;
    $("#pifa_table tr").each(function(){
        chooseNum += parseInt($(this).find('.buyCnt').val());
        var tmpNum = parseInt($(this).find('.buyCnt').val());
        if (wholesaleType &&  (tmpNum<minimum) && tmpNum) {
            var tmpName = $(this).data('value');
            alert('"'+tmpName+'"型号的产品不够起批量！');
            isStop = 1;
        }
    });
    if (isStop) {
        return false;
    }
    if (!wholesaleType && chooseNum < minimum) {
        alert('该产品的起批量为'+minimum);
        return false;
    }
    if (chooseNum < minSale) {
        alert('该产品的最小定量为'+minSale);
        return false;
    }


    $('#pifa_table tr').each(function(){
        var sn = '';
        var buyCnt   = parseInt($(this).find('.buyCnt').val());
        var specId   = parseInt($(this).data('dynamic'));
        var proId    = parseInt($('#id').val());

        if (buyCnt) {
            sn = $(this).data('sn');
            var gouwuche = readCookie(user_name+'_gouwuche');
            var isUpdate = 0;
            var carAllnum = 0;
            var i=0;
            if (gouwuche) {
                var aOrder = JSON.parse(gouwuche);
                for (key in aOrder) {
                    if(key==(proId+'_'+specId)){
                        aOrder[key]={'num':parseInt(aOrder[key].num)+buyCnt,'sort':aOrder[key].sort};
                        var tmp_str = JSON.stringify(aOrder);
                        writeCookie(user_name +'_gouwuche',tmp_str, 3600*7);
                        isSuccess = 1;
                        isUpdate = 1;
                        i = i+1;
                    }else{
                        i = i+1;
                        //continue;
                    }
                    carAllnum = nCount.add(carAllnum,parseInt(aOrder[key].num));
                } // for end
                if (!isUpdate) {
                    if(i>100){
                        showAllzz("购物车已满！");
                        del_layer();
                        return false;
                    }
                    i = i+1;
                    aOrder[proId+'_'+specId]={'num':buyCnt,'sort':i};
                    var tmp_str = JSON.stringify(aOrder);
                    carAllnum = nCount.add(carAllnum,buyCnt);
                    updateShoppingCardNum(carAllnum);
                    writeCookie(user_name +'_gouwuche',tmp_str, 3600*7);
                    isSuccess = 1;
                }else{
                    updateShoppingCardNum(carAllnum);
                }
            }else{
                //初始情况
                var arrayObj = {};
                arrayObj[proId +"_"+ specId]={'num':buyCnt,'sort':i};
                var tmp_str = JSON.stringify(arrayObj);
                updateShoppingCardNum(buyCnt);
                writeCookie(user_name+'_gouwuche',tmp_str,3600*7);
                isSuccess = 1;
            }
        }
    });
    if (isSuccess == 1) {
        if (sButId == 'inner_nowBuy') {
            location.href="/dom/sc_shopcar_add.php?username="+user_name+"&wap=1";
        } else {
            alert_frame('当前选择的规格已成功加入购物车！');
            $("#closeSpecHtml").trigger('click');
            // showAllzz("添加成功！",{"继续购物":"###","去购物车":"/dom/sc_shopcar_add.php?username="+user_name+"&wap=1"});
        }
    } else {
        showAllzz('请选择产品');
        return false;
    }
}
