function checkIDCard(num) 
{
    if (num == 111111111111111) {
        return false;
    }
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        return false;
    }

    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        }
        else {
            //将15位身份证转成18位
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        }
        else {
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return false;
            }
            return true;
        }
    }
    return false;
}

function getCity(type, id, version){
    var provinceCode = $('#province_'+id).val();
    if (version) {
        $('#province_'+id).parent().parent().siblings(".city, .district").hide();
    }
    var url = "/dom/ajax_form.php?ajax=3&code=" + provinceCode + "&fieldId=" + id + "&type=" + type;
    $.get(url,function(data){
        if(data){
            $('#city_'+ id).empty();
            $('#city_'+ id).append(data);
            $('#district_'+ id).empty();
            var def_city=$('#city_'+ id).find("option:selected").text();
            $('#city_'+ id).siblings('span').html(def_city);
            getDistrict(id,version);
            if (version) {
                $('#city_'+ id).siblings("span").html('请选择城市');
                $('#province_'+id).parent().parent().siblings('.city').css('display','block');


            }
        }
    });
}

function getDistrict(id, version){
    var cityCode = $('#city_'+id).val();
    var url = "/dom/ajax_form.php?ajax=4&cityCode=" + cityCode + "&fieldId=" + id;
    if (version) {
        $('#city_'+id).parent().parent().siblings(".district").hide();
    }
    $.get(url, function(data){
        $('#district_'+ id).empty();
        $('#district_'+ id).append(data);
         var def_dis=$('#district_'+ id).find("option:selected").text();
            $('#district_'+ id).siblings('span').html(def_dis);
        if (version) {
            $('#district_'+ id).siblings("span").html('请选择区县');
            $('#city_'+id).parent().parent().siblings('.district').css('display','block');
        } else {
            getPC(id);
        }
    });
}

function getPCD(id){
    var province = $('#province_'+id+' option:selected').html();
    var city = $('#city_'+id+' option:selected').html();
    var district = $('#district_'+id+' option:selected').html();
    $('#field_'+id).val(province + '#' + city + '#' + district);
}

function getP(id){
    var province = $('#province_'+id+' option:selected').html();
    $('#field_'+id).val(province);
}

function getPC(id){
    var province = $('#province_'+id+' option:selected').html();
    var city = $('#city_'+id+' option:selected').html();
    $('#field_'+id).val(province + '#' + city);
}

$(function() {
    $("body").on("change", ".checkboxDynamicValue", function() {
        var id = parseInt($(this).data("id"));
        if (!id) {
            return false;
        }

        $('#field_'+id).val("");

        var name = 'checkbox_'+id+'[]';
        if ($("input[name='"+name+"']:checked").length === 0) {
            return false;
        }

        var str = '';
        $("input[name='"+name+"']:checked").each(function(){
            str ? str += '#*#'+ $(this).val() : str = $(this).val();
        });
        $('#field_'+id).val(str);
        return false;
    });
});

function getCheckboxVal(id){
    $('#field_'+id).val("");

    var name = 'checkbox_'+id+'[]';
    if ($("input[name='"+name+"']:checked").length === 0) {
        return false;
    }

    var str = '';
    $("input[name='"+name+"']:checked").each(function(){
        str ? str += '#*#'+ $(this).val() : str = $(this).val();
    });
    $('#field_'+id).val(str);
    return false;
}

function auto_check(oParam) {
    var checkArr = [];
    var paramLength = oParam.length;
    for (var i=0; i<paramLength; i++) {
        (function(n){
            var _this = oParam[n];
            if (_this['type'] == 2) {
                //$('#field_'+_this['id']+' option:first').attr("selected","selected");
                $('#field_'+_this['id']).on('change',function(){
                    var _thisVal = $.trim($('#field_'+_this['id']).val());

                    if (_this['required'] == 1 && _thisVal == '') {
                        $('#error_'+_this['id']).html('<span class="caution">'+$weisiteLa.BuNengWeiKong+'！</span>');
                        return false;
                    } else {
                        $('#error_'+_this['id']).html('');
                        return true;
                    }
                })
            } else if (_this['type'] == 3) {
                    checkArr[_this['id']] = $("input[name='checkbox_"+ _this['id'] +"[]']");
                    for (var j=0; j<checkArr[_this['id']].length; j++) {
                        (function(m){
                            $(checkArr[_this['id']][m]).on('click',function(){
                                if (_this['required'] == 1 && $("input[name='checkbox_"+ _this['id'] +"[]']:checked").length === 0) {
                                    $('#error_'+_this['id']).html('<span class="error">请选择一个项目！</span>');
                                } else {
                                    $('#error_'+_this['id']).html('');
                                }
                            })
                            return false;
                        })(j);
                    }
            } else if (_this['type'] == 5 || _this['type'] == 6) {
                if (parseInt(_this['isCur']) === 1) {
                    $('#district_'+_this['id']+' option:first').attr("selected","selected");
                }
                $('#province_'+_this['id']).on('change',function(){
                    var _thisVal = $.trim($('#province_'+_this['id']).val());
                    if (_this['required'] == 1 && _thisVal == '') {
                        showCityMsg(1, _this['id']);
                    } else {
                        showCityMsg(false, _this['id']);
                    }
                });
                $('#city_'+_this['id']).on('change',function(){
                    var _thisVal1 = $.trim($('#city_'+_this['id']).val());
                    if (_this['required'] == 1 && _thisVal1 == '') {
                        showCityMsg(2, _this['id']);
                    } else {
                        showCityMsg(false, _this['id']);
                    }
                })
                if (_this['type'] == 5){
                    $('#district_'+_this['id']).on('change',function(){
                        var _thisVal2 = $.trim($('#district_'+_this['id']).val());
                        if (_this['required'] == 1 && _thisVal2 == '') {
                            showCityMsg(3, _this['id']);
                        } else {
                            showCityMsg(false, _this['id']);
                        }
                    })
                }
            } else {
                $('#field_'+_this['id']).on('blur',function(){
                    var _thisVal = $.trim($('#field_'+_this['id']).val());
                    if (_this['required'] == 1 && _thisVal == '') {
                        $('#error_'+_this['id']).html('<span class="caution">'+$weisiteLa.BuNengWeiKong+'！</span>');
                        return false;
                    } else {
                        if ($.trim(_this['fun']) && (_this['required'] == 1 || _thisVal)) {
                            if (eval(_this['fun']+ '("'+ _thisVal +'")') === false) {
                                $('#error_'+_this['id']).html('<span class="error">'+_this['msg']+'</span>');
                                return false;
                            } else {
                                $('#error_'+_this['id']).html('');
                                return true;
                            }
                        } else if ($.trim(_this['regex']) && (_this['required'] == 1 || _thisVal)) {
                            if (paramRegexp(_this['regex'], _thisVal) === false) {
                                $('#error_'+_this['id']).html('<span class="error">'+_this['msg']+'</span>');
                                return false;
                            } else {
                                $('#error_'+_this['id']).html('');
                                return true;
                            }
                        } else {
                            $('#error_'+_this['id']).html('');
                            return true;
                        }
                    }

                })
            }
        })(i);
    }
}

var tncode_div_form =false;
function defineFormSublime(iFormId, type,module_id) {
    if($("#HourWorkBox input").length == 3){
        if (!hourCheckTime()) {
            return false;
        }
    }
    if($("#roomOrderHtml input").length == 5){
        if (!checkRoomFrom()) {
            return false;
        }
    }

    if($(".onedaytour input").length == 6){
        if (!dayCheckNum()) {
            return false;
        }
    }
    if (!type) {
        if ($('#form-sublimt-box-'+ iFormId).data("hyid")) {
            if ($(".ev_t_product_yy_c ul li").length < 1) {
                showAllzz("预约项目不能为空！");
                return false;
            }
        }
    }

    if($('#form_mobile_code').length > 0){
        var form_mobile_code = $.trim($('#form_mobile_code').val());
        if (!form_mobile_code) {
            showAllzz("短信验证码不能为空！");
            return false;
        }
    }else if($('#form_mobile_code_'+module_id).length > 0){
        var form_mobile_code = $.trim($('#form_mobile_code_'+module_id).val());
        if (!form_mobile_code) {
            showAllzz("短信验证码不能为空！");
            return false;
        }
    }

    var is_message_open = 0;
    if($('#is_message_open').length > 0){
        is_message_open = parseInt($('#is_message_open').val());
    }else if($('#is_message_open_'+module_id).length > 0){
        is_message_open = parseInt($('#is_message_open_'+module_id).val());
    }
    var
        param = userDefineFromParam(iFormId),
        iCountError = 0,
        checkArr = [];

    for (var i=0; i<param.length; i++) {
        (function(n){
            var _this = param[n];
            if (_this['type'] == 2) {
                if ($('#field_'+_this['id']).triggerHandler('change') === false) {
                    iCountError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                }
            } else if (_this['type'] == 3) {
                checkArr = $("input[name='checkbox_"+ _this['id'] +"[]']:checked");
                if (_this['required'] == 1 && checkArr.length < 1) {
                    $('#error_'+_this['id']).html('<span class="caution">不能为空！</span>');
                    iCountError++;
                    if (iCountError == 1) {
                        $("input[name='checkbox_"+ _this['id'] +"[]']").focus();
                    }
                }
            } else if (_this['type'] == 4) {
                // var _thisVal = $("input[name='field_"+ _this['id'] +"']:checked").length;
                var _thisVal = 0;
                $("input[name='field_"+ _this['id'] +"']").each(function(){
                    var checked = $(this).attr('checked');
                    if (checked) { _thisVal = 1; return false; }
                });
                
                if (_this['required'] == 1 && _thisVal < 1) {
                    $('#error_'+_this['id']).html('<span class="caution">不能为空！</span>');
                    iCountError++;
                    if (iCountError == 1) { 
                        $("input[name='field_"+ _this['id'] +"']").focus();
                    }
                } else {
                    $('#error_'+_this['id']).html('');
                }
            } else if (_this['type'] == 5 || _this['type'] == 6) {
                var iCountCityError = 0;
                if (_this['type'] == 5) {
                    var _thisVal2 = $('#district_'+_this['id']).val();
                    if (_this['required'] == 1 && _thisVal2 == '') {
                        iCountError++;
                        iCountCityError++;
                        if (iCountError == 1) {
                            $('#field_'+_this['id']).focus();
                        }
                        showCityMsg(3, _this['id']);
                    }
                }
                var _thisVal1 = $('#city_'+_this['id']).val();
                if (_this['required'] == 1 && _thisVal1 == '') {
                    iCountError++;
                    iCountCityError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                    showCityMsg(2, _this['id']);
                }
                var _thisVal = $('#province_'+_this['id']).val();
                if (_this['required'] == 1 && _thisVal == '') {
                    iCountError++;
                    iCountCityError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                    showCityMsg(1, _this['id']);
                }
                if (parseInt(iCountCityError) === 0) {
                    showCityMsg(false, _this['id']);
                }
            } else {
                if ($('#field_'+_this['id']).triggerHandler('blur') === false) {
                    iCountError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                }
            }
        })(i);
    }
    if (parseInt(iCountError) > 0) {
        $('#form-sublimt-box-'+iFormId).attr('form_err_tag',1);
        return false;
    } else {
        if (typeof is_formsubmit != 'undefined') {
            if (!is_formsubmit) {
                return false;
            }
        }

        if ($("#formPrice"+ iFormId).length > 0) {
            var price = $("#formPrice"+ iFormId).val();
            var minPrice = $("#formPrice"+ iFormId).data('minprice');
            var currencyrate = $("#formPrice"+ iFormId).data('currencyrate');

            if (!price || checkNumber(price, 4) === false) {
                $("#error_price_"+ iFormId).html('<span class="caution">请输入有效的4位小数！</span>');
                $("#formPriceShow"+ iFormId).html("");
                return true;
            }

            var price = parseFloat(price);
            if (!price || price < minPrice) {
                $("#error_price_"+ iFormId).html('<span class="caution">请输入大于'+ minPrice +'的数字！</span>');
                $("#formPriceShow" + iFormId).html("");
                return true;
            }

            $("#error_price_"+ iFormId).html("");
            var showPrice = price / currencyrate;
            showPrice = showPrice.toFixed(3);
            showPrice = showPrice.substring(0, showPrice.lastIndexOf('.')+3);

            $("#formPriceShow"+ iFormId).html(showPrice);
        }
        //show_verification 0显示 1不显示
        var show_verification = parseInt($('#form_'+ iFormId).attr('show_verification'));
        //如开启显示滑动验证并且开启了短信验证码，则表单提交时不在显示滑动验证
        if(is_message_open){
            $('#form-sublimt-box-'+ iFormId).html('正在努力提交中... ');
            $('#isSubmit').val(1);
            $('#form_'+iFormId).submit();
        }else{
            if(show_verification){
                $('#form-sublimt-box-'+ iFormId).html('正在努力提交中... ');
                $('#isSubmit').val(1);
                $('#form_'+iFormId).submit();
            }else{
                if(!IS_NEWS_ARTICEL){
                    if(!tncode_div_form){
                        tncode.init('form_yz_'+iFormId,1);
                        tncode_div_form =true;
                    }else{
                        tncode.show();
                    }
                    $TN.onsuccess(function(){
                        if(iFormId == 822521){
                            meteor.track('form', {convert_id: 1653144289125383 });
                        }
                        $('#form_'+iFormId).append('<input type="hidden" name="tnr_'+iFormId+'" value="'+tncode._mark_offset+'">')
                        $('#form-sublimt-box-'+ iFormId).html('正在努力提交中... ');
                        $('#isSubmit').val(1);
                        $('#form_'+iFormId).submit();
                    });
                }else{
                    if(iFormId == 822521){
                        meteor.track('form', {convert_id: 1653144289125383 });
                    }
                    $('#form-sublimt-box-'+ iFormId).html('正在努力提交中... ');
                    $('#isSubmit').val(1);
                    $('#form_'+iFormId).submit();
                }
            }
        }
    }
}

function paramRegexp(regexpString, string) {
    if ($.trim(regexpString)=='' || $.trim(string)=='') {
        return false;
    }
    if(string.match(eval(regexpString))){
        return true;
    }else{
        return false;
    }
}

function showCityMsg (error, id) {
    if (error === false) {
        $('#error_'+ id).html('');
        return true;
    } else {
        var city_error_msg = '';
        if (error == 1) {
            city_error_msg  = '省不能为空！';
        } else if (error == 2) {
            city_error_msg  = '市不能为空！';
        } else if (error == 3) {
            city_error_msg  = '区不能为空！';
        }
        $('#error_'+ id).html('<span class="caution">'+ city_error_msg +'</span>');
        return false;
    }
}

// 刷新验证码
function refreshYzm(obj, iFormId)  {
    var date = new Date();
    $(obj).attr("src","/include/captcha/captcha-id.php?id="+ iFormId +"&datete="+ date.getTime());
}

