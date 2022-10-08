$(function(){
  	//头部 会员登录，注册（ev_t_top_user） 搜索（ev_t_top_search） 导航（ev_t_top_menu）是否显示
 	$(".ev_t_top_user").click(function(){
	   	var data_user = $(this).attr("data-user");
		if(data_user == 0){
			if($('.ev_t_top_user_div').css('display') == 'none'){
				$(".ev_t_top_user_div").show();
				$(".ev_t_top_user_a").show();
				$(".ev_t_top_search_div").hide();
				$(".ev_t_top_search_a").hide();
			}else{
				$(".ev_t_top_user_div").hide();
				$(".ev_t_top_user_a").hide();
			}
		}
  	});

	$(".ev_t_top_search").click(function(){
		if($('.ev_t_top_search_div').css('display') == 'none'){
			$(".ev_t_top_search_div").show();
			$(".ev_t_top_search_a").show();
			$(".ev_t_top_user_div").hide();
			$(".ev_t_top_user_a").hide();
		}else{
			$(".ev_t_top_search_div").hide();
			$(".ev_t_top_search_a").hide();
		}
	});

  	$(".ev_t_top_menu").click(function(){
	  	var h = $(document).height();
	  	$(".ev_t_bg_kuang").height(h).show();
  	});
  	$(".ev_t_bg_kuang").click(function(){
	  	$(".ev_t_bg_kuang").hide();
  	});

  //页面输出类型

  //分享
  	$(document).on("click",".ev_t_train_xin",function(){
		var that       = $(this);
		var username  = $('#username').val();
		var channel_id = $('#channel_id').val();
		var doc_id     = that.attr("data-doc-id");
		var type       = $('#channel_type').val();
		var title      = that.attr("data-title");
		var timestamp  = Date.parse(new Date());
  	});

  	//类别
 	$(".ev_t_train .ev_t_product_tit_sx").click(function(){
		if($('.ev_t_product_c2').css("display") == "none"){
			$(".ev_t_product_c2").show();
			$(".ev_t_product_c3").hide();
			$(".ev_t_product_c3_bg").hide();
			$(".ev_t_train .ev_t_product_tit_sx").addClass("ev_t_product_tit_open");
		}else{
			$(".ev_t_train .ev_t_product_tit_sx").removeClass("ev_t_product_tit_open");
			$(".ev_t_product_c2").hide();
			$(".ev_t_product_c3").hide();
			$(".ev_t_product_c3_bg").hide();
		}
  	});

 	$(".ev_t_product_c2").on({
		click : function(){
		  	var index = $(this).index();
		  	if(index != 0){
				$(".ev_t_product_c3_bg").show();
				$(".ev_t_product_c3").show();
				$(".ev_t_product_c3 ul:eq("+(index-1)+")").show().siblings().hide();
		  	}
		}
  	},"li");

  	$(".ev_t_product_c2 .ev_t_product_c_div").each(function(){
		$(this).click(function(){
		  	var shuzi = $(this).parent().index();
		  	$(this).parent().addClass("ev_t_product_cur").siblings().removeClass("ev_t_product_cur");
		  	if($(this).parent().attr("class") == "ev_t_product_cur"){
				$(".ev_t_product_c3 i").addClass("ev_t_product_c_i");
				var iheight = 12+(shuzi-1)*$(this).parent().outerHeight();
				$(".ev_t_product_c_i").css("top",iheight+"px");
		  	}else{
				$(".ev_t_product_c3  i").removeClass("ev_t_product_c_i");
		  	}
		});
  	});

  	$(".ev_t_product_c2 .ev_t_product_c_both").each(function(){
		$(this).click(function(){
			$(this).parent().addClass("ev_t_product_cur").siblings().removeClass("ev_t_product_cur");
			$(".ev_t_product_c3_bg").hide();
			$(".ev_t_product_c3").hide();
			$(".ev_t_product_c2").hide();
		});
  	});

  	$(".ev_t_product_c3 .ev_t_product_c_div").each(function(){
		$(this).click(function(){
		  	$(this).parent().addClass("ev_t_product_cur").siblings().removeClass("ev_t_product_cur");
		  	if($(this).parent().attr("class") == "ev_t_product_cur"){
				$(".ev_t_product_c3_bg").hide();
				$(".ev_t_product_c3").hide();
				$(".ev_t_product_c2").hide();
				$(".ev_t_product_tit_sx").removeClass("ev_t_product_tit_open");
		  	}
		});
  	});

  	$(".ev_t_product_c3 .ev_t_product_c_both").each(function(){
		$(this).click(function(){
		  	$(this).parent().addClass("ev_t_product_cur").siblings().removeClass("ev_t_product_cur");
		  	if($(this).parent().attr("class") == "ev_t_product_cur"){
				$(".ev_t_product_c3_bg").hide();
				$(".ev_t_product_c3").hide();
				$(".ev_t_product_c2").hide();
		  	}
		});
  	});

 	$(".ev_t_product_c3_bg").click(function(){
		$(".ev_t_product_c3_bg").hide();
		$(".ev_t_product_c3").hide();
  	});

  	//文章详细页，首页
  	$('.ev_t_product_pj_t .ev_t_product_more').click(function(){
	  	var _this = $(".ev_t_product_pj_t  .ev_t_product_more_div");
	  	if(_this.css("display") == "none"){
			_this.show();
	  	}else{
			_this.hide();
	  	}
  	});

  	//产品排序
 	$(".ev_t_product .ev_t_product_tit_px").click(function(){
	  	if($('.ev_t_product_c').css("display") == "none"){
			$(".ev_t_product_c").show();
			$(".ev_t_product_c2").hide();
			$(".ev_t_product_shaixuan").hide();
			$(".ev_t_product .ev_t_product_tit_sx").removeClass("ev_t_product_tit_open");
			$(".ev_t_product .ev_t_product_tit_px").addClass("ev_t_product_tit_open");
	  	}else{
			$(".ev_t_product_c").hide();
			$(".ev_t_product .ev_t_product_tit_px").removeClass("ev_t_product_tit_open");
	  	}
	});

	$(".ev_t_product .ev_t_product_tit_sx").click(function(){
	  	if($('.ev_t_product_shaixuan').css("display") == "none"){
			$(".ev_t_product_shaixuan").show();
			$(".ev_t_product_c").hide();
			$(".ev_t_product_c2").hide();
			$(".ev_t_product_c3").hide();
			$(".ev_t_product_c3_bg").hide();
			$(".ev_t_product .ev_t_product_tit_px").removeClass("ev_t_product_tit_open");
			$(".ev_t_product .ev_t_product_tit_sx").addClass("ev_t_product_tit_open");
	  	}else{
			$(".ev_t_product .ev_t_product_shaixuan").hide();
			$(".ev_t_product .ev_t_product_tit_sx").removeClass("ev_t_product_tit_open");
	  	}
	});

	$(".ev_t_product_shaixuan").on({click : function(){
		$(".ev_t_product_c2").show();
		$(".ev_t_product_shaixuan").hide();
		$(".ev_t_product_c3").hide();
		$(".ev_t_product_c3_bg").hide();
		var that = $(this),id = that.data("id");
		$(".ev_t_product_c2").find("ul").each(function(){
		  	if($(this).data("id")==id){
				$(this).show()
		  	}else{
				$(this).hide()
		  	}
		})
	  }
	},"li");

	$(".ev_t_product_c2").on({
	  click : function(){
		var index = $(this).index();
		if(index != 0){
			$(".ev_t_product_c3_bg").show();
			$(".ev_t_product_c3").show();
			$(".ev_t_product_c3 ul:eq("+(index-1)+")").show().siblings().hide();
			$(".ev_t_product_c_i").css("display","block");
		}
	  }
	},"li")

	$(".ev_t_product_c2 .ev_t_product_c_both").each(function(){
	  $(this).click(function(){
		$(this).parent().addClass("ev_t_product_cur").siblings().removeClass("ev_t_product_cur");
		$(".ev_t_product_c3_bg").hide();
		$(".ev_t_product_c3").hide();
		$(".ev_t_product_c2").hide();
		$(".ev_t_product_shaixuan").show();
	  });
	});

	$(".ev_t_product_c2 .ev_t_product_c_div").each(function(){
	  	$(this).click(function(){
			var shuzi = $(this).parent().index();
			$(this).parent().addClass("ev_t_product_cur").siblings().removeClass("ev_t_product_cur");
			if($(this).parent().attr("class") == "ev_t_product_cur"){
			  	$(".ev_t_product_c3 i").addClass("ev_t_product_c_i");
			  	var iheight = 12+(shuzi-1)*$(this).parent().outerHeight();
			  	$(".ev_t_product_c_i").css("top",iheight+"px");
			}else{
			  	$(".ev_t_product_c3  i").removeClass("ev_t_product_c_i");
			}
	  	});
	});

	$(".ev_t_product_c3 .ev_t_product_c_div").each(function(){
	  	$(this).click(function(){
			$(this).parent().addClass("ev_t_product_cur").siblings().removeClass("ev_t_product_cur");
			if($(this).parent().attr("class") == "ev_t_product_cur"){
				$(".ev_t_product_c3_bg").hide();
				$(".ev_t_product_c3").hide();
				$(".ev_t_product_c2").hide();
				$(".ev_t_product_shaixuan").show();
			}
	  	});
	});
	$(".ev_t_product_c3 .ev_t_product_c_both").each(function(){
	  	$(this).click(function(){
			$(this).parent().addClass("ev_t_product_cur").siblings().removeClass("ev_t_product_cur");
			if($(this).parent().attr("class") == "ev_t_product_cur"){
				$(".ev_t_product_c3_bg").hide();
				$(".ev_t_product_c3").hide();
				$(".ev_t_product_c2").hide();
				$(".ev_t_product_shaixuan").show();
			}
	  	});
	});

	$(".ev_t_product_c3_bg").click(function(){
	  	$(".ev_t_product_c3_bg").hide();
	  	$(".ev_t_product_c3").hide();
	});

	$(".ev_t_product_qd").click(function(){
	  	$(".ev_t_product_shaixuan").hide();
	  	$(".ev_t_product_tit_sx").removeClass("ev_t_product_tit_open");
	});
	//收藏
	$(document).on("click", ".ev_t_product_xq_fx .ev_t_product_xq_zan , #detailNavCollect,#detailNavCollectNew,.ev_t_train_xin,.collectIcon" ,function(){
		var href       = window.location.href;
		var doc_id     = $(this).attr("data-doc-id");
		var username   = $('#username').val();
		var _this      = $(this);
		if(username){
			var channel_id = $('#channel_id').val();
			var type       = $('#channel_type').val();
			var title      = $(this).attr("data-title");
		}else{
			var title      = $(this).attr("data-title");
			var type       = $(this).attr("data-type");
			var channel_id = $(this).attr("data-channel-id");
			var username   = $(this).attr("data-username");
		}
		var timestamp  = Date.parse(new Date());
		var url        = '/dom/user_collect_add.php?timestamp='+timestamp;
		var data       = {
						  'title'     :title,
						  'type'      :type,
						  'doc_id'    :doc_id,
						  'channel_id':channel_id,
						  'username'  :username,
						  'wap'       :1
						};
		$.ajax({
			'url' : url,
			type: "POST",
			async: false,
			cache: false,
			data:data,
			success: function(data) {
			  if(data == 1){
				showAllzz($weisiteLa.ShouCangChengGong);
				if (_this.find('.foot-icon-shoucang').length > 0) {
					_this.find('.foot-icon-shoucang').css('color','#f00');
					_this.find('.collect_name').html($weisiteLa.YiShouCang);
				}
				//团购
				if (_this.find('.group_collection').length > 0) {
					_this.find('.group_collection').addClass('active');
					_this.find('.group_collect_name').html($weisiteLa.YiShouCang);
				}

				//微报名
				if(type == 61){
					if (!_this.hasClass('cur')) {
						_this.addClass('cur');
						setTimeout(function(){
							var allZZ = $('#allZZ');
							if(allZZ.length){
								allZZ.remove();
							}
						}, 1000);
					}
				}
				if(_this.attr('class') == 'ev_t_train_xin'){
					var num  = _this.find('span').html();
					num = isNaN(parseInt(num)) ? 1 : parseInt(num)+1;
					_this.find('span').html(num);
				}

				if(_this.hasClass('ev_t_train_xin')){
					if(_this.hasClass('cur')){	
						$('#detailNavCollectNew').find('p').css('background','url(\'/images/wap/pro_sc_1.png\') no-repeat center 5px');
					  	$('#detailNavCollectNew').find('p').css('background-size','22px');
					}
				}
				if(_this.attr('class') == 'collectIcon'){
					_this.find('a').addClass('cur');
				}
				if(_this.attr('id')=='detailNavCollectNew'){
				  	_this.find('img').attr('src','/images/wap/pro_sc_1.png')
				  	_this.find('p').css('background','url(\'/images/wap/pro_sc_1.png\') no-repeat center 5px');
				  	_this.find('p').css('background-size','22px');
				  	if(!$('.ev_t_train_xin').hasClass('cur')){
				  		$('.ev_t_train_xin').addClass('cur')
				  	}
				}
				return false;
			  }else if(data == 2){
				var loginUrl    = '/dom/denglu.php?username='+username+'&wap=1';
				var registerUrl = '/dom/zhuce.php?username='+username+'&wap=1';
				showAllzz($weisiteLa.ShouCangShiBaiMeiDengLuChongXinShouCang,{
					'登陆' : {url:loginUrl,'title':$weisiteLa.DengLu},
					'注册' : {url:registerUrl,'title':$weisiteLa.ZhuCe},
					'关闭' : {url:'###','title':$weisiteLa.GuanBi}
				});
				return false;
			  }else if(data == 3){
			  	if (_this.find('.foot-icon-shoucang').length > 0) {
					_this.find('.foot-icon-shoucang').css('color','#999');
					if(_this.find('.collect_name').attr('data-name')){
						_this.find('.collect_name').html($weisiteLa.ShouCang+_this.find('.collect_name').attr('data-name'));
					}else{
						_this.find('.collect_name').html($weisiteLa.ShouCang);
					}

				}
				//团购
				if (_this.find('.group_collection').length > 0) {
					_this.find('.group_collection').removeClass('active');
					_this.find('.group_collect_name').html($weisiteLa.ShouCang);
				}

				//微报名
				if(type == 61){
					if (_this.hasClass('cur')) {
						_this.removeClass('cur');
						setTimeout(function(){
							var allZZ = $('#allZZ');
							if(allZZ.length){
								allZZ.remove();
							}
						}, 1000);
					}
				}
				showAllzz($weisiteLa.QuXiaoShouCangChengGong);
				if(_this.attr('class') == 'collectIcon'){
					_this.find('a').removeClass('cur');
				}
				if(_this.attr('id')=='detailNavCollectNew'){
					// _this.find('img').attr('src','/images/wap/pro_sc_1.png')
					_this.find('img').attr('src','/images/doc_new/soucang.png')
					_this.find('p').css('background','url(\'/images/doc_new/soucang.png\') no-repeat center 5px')
					_this.find('p').css('background-size','22px')
					if($('.ev_t_train_xin').hasClass('cur')){
				  		$('.ev_t_train_xin').removeClass('cur')
				  	}
				}
				if(_this.hasClass('ev_t_train_xin')){
					if(!_this.hasClass('cur')){	
						$('#detailNavCollectNew').find('p').css('background','url(\'/images/doc_new/soucang.png\') no-repeat center 5px')
						$('#detailNavCollectNew').find('p').css('background-size','22px')
					}
				}
				return false;
			  }else if(data == 4){
				showAllzz($weisiteLa.CanShuCuoWu);
				return false;
			  }
			}
		  })
		  return false;
	});

});

$(function(){
  	//分享
	$(document).on('click',"#productFenxiang , #detailNavShare , #footShareButton",function(){
	   fengxiang();
	});
	//判断头部列表数量
	var Hli_length = $(".alert_header_list li").length,
		li_w = 100/Hli_length;
	if(Hli_length != 6){
	  	$(".alert_header_list ul li").width(li_w+'%');
	}
  	//头部列表
	$(".ev_t_product_more").click(function(){
	  	var header_list = $(".alert_header_list").css("display"),
			header_select = $(".ev_t_top_search_div").css("display");
	  	if(header_select == "block"){
			$(".ev_t_top_search_div").hide();
			$(".ev_t_top_search_a").hide();
	  	}
	  	if(header_list == "none"){
			$(".alert_header_list").show();
	  	}else{
			$(".alert_header_list").hide();
	  	}
	  	//弹出搜索
	  	$(".header_search").click(function(){
			$(".alert_header_list").hide();
			$(".ev_t_top_search_div").show();
			$(".ev_t_top_search_a").show();
	    	$(".alert_zz").show();
	    	if($(".allzz").length){
	      		$(".allzz").click();
	    	}
    	})
    	//关闭弹窗
    	$(".alert_zz").click(function(){
	      	$(".ev_t_top_search_div").hide();
	      	$(".ev_t_top_search_a").hide();
	      	$(".alert_zz").hide();
    	})
	});

	//tab切换
	$(".article_nav_tab li").click(function(){
		$(this).siblings().removeClass("cur").children().removeClass("this_bo_color");
		$(this).addClass("cur").children().addClass("this_bo_color");
		$(".ev_t_product_xq_cp .ev_t_product_xq_c > div:eq("+$(this).index()+")").show().siblings().hide();
	});

	//返回顶部
	$("#return_top").hide();
	$(window).scroll(function(){
	  if($(window).scrollTop()>10){
		$("#return_top").show();
	  }else{
		$("#return_top").hide();
	  }
	});

	$("#return_top").click(function(){
	  $("html,body").animate({scrollTop:0},500);
	});

	$(".tab_div ul li").click(function(){
	  $(this).addClass("this_color").siblings().removeClass("this_color");
	  $("#tab_con .term_con").eq($(this).index()).show().siblings().hide();
	});
	$("#footer_server").click(function(){
			var this_ = $(this),s = $("#server_btn_hide");
			var f = function(){
				this_.data('show',0);
				s.hide();
			};
			if(this_.data("show") != 1){
				this_.data("show",1);
				s.show();
				$("body").on("click",f);
			}else{
				f();
				$("body").off('click',f);
			}
			return false;
	});

	/*$(".main").click(function(){
	  $("#server_btn_hide").hide();
	});*/
	$(".ev_t_product_xq_c a").click(function(){
	  if($(this).parent().hasClass("tab_type_two")){
		$(this).addClass("this_color").siblings().removeClass("this_color");
	  }else{
		$(this).addClass("ev_t_cur").siblings().removeClass("ev_t_cur");
	  }
	});
	$(".footer_collect").click(function(){
	  if($(this).find("img").css("margin-top") == '0px'){
		$(this).find("img").css("margin-top","-23px");
	  }else{
		$(this).find("img").css("margin-top","0");
	  }
	});
	// 关闭表单弹窗
	$(".alt_c_close").click(function(){
	  $(".alt_content_table").hide();
	});

});

//点击隐藏窗口
function close_tit(e,a){
	e.preventDefault();
   var isAppAndWxDownload = readCookie(user_name+'_appAndWxDownload');
	if (!isAppAndWxDownload) {
	  writeCookie(user_name+'_appAndWxDownload',1, 24*1000);
	}
	$(a).parents(".alt_tit_content").hide();
	$(a).parents().siblings(".alt_tit_bg").hide();
}


function search_website() {
  var keyword = $.trim($('.ev_t_top_search_input #top_keyword').val());
  if (!keyword) {
	showAllzz($weisiteLa.GuanJianZiBuNengWeiKong);
	return false;
  }
  $('.ev_t_top_search_a #search_form').submit();
}

/*************************登录验证JS****************************/
var iLoginErrorCount = 0,isSendMsg = 0;

function remove_error_msg() {
  $('.ev_empy').show();
  if($("#error_msg")[0]){
	$("#error_msg").html("");
  }
}

function tab_list(id,name)
{
	  $("."+id).addClass("cur").siblings().removeClass("cur");
	  $("."+id).find("a").addClass("this_font_color").end().siblings().find("a").removeClass("this_font_color");;
	  $("."+name).show().siblings().hide();
	  if(id =='pc_tit'){
		$(".phone_tit img").removeClass().addClass("phone_bg");
		$(".pc_tit img").attr("src","/images/wap/login_user2.png");
		$('#loginType').val(0);
	  }else{
		$(".phone_tit img").removeClass().addClass("this_color");
		$(".pc_tit img").attr("src","/images/wap/login_user.jpg");
		$('#loginType').val(1);
	  }
}

/***********************发送手机验证码***************************/
var tncode_div_login = false;
function send_mob_code(type,obj){
  	var this_ = $('#'+obj);
  	if(!this_.data("clickget")){
  		this_.data("clickget", 1);
		var user_id   = this_.data('userid');
		var mobile    = $.trim($("#mobile").val());
		if (parseInt(iLoginErrorCount) > 0){
			this_.removeData("clickget");
			return false;
		}

		if (!check_mobile()){
			this_.removeData("clickget");
			return false;
		}

		//关闭滑动验证时时，使用原有验证码
		if(show_check){
			// if (!check_validate()){
			// 	return false;
			// }

			if (public.yzMobile(mobile)) {
				if(type && mobile && user_id){
				  	// this_.attr("data-get","false");
				  	this_.html($weisiteLa.FaSongZhong);
				  	var url = "/dom/ajax_zhuce_code.php?type="+type+"&userid="+user_id+"&mobile="+mobile+"&username="+user_name+"&wap=1&tn_r="+tncode._mark_offset;
				  	$.post(url, function(data){
					  	if (data == 1) {
					  		alert_frame($weisiteLa.CiShouJiHaoMaYiBangDing);
					  		this_.removeData("clickget");
					  		return false;
					  	}
						if($.trim(data) == 'success'){
						  	change_miao(this_);
						}else{
						  	alert_frame($weisiteLa.WangLuoFanMang);
						  	this_.html($weisiteLa.HuoQuYanZhengMa);
						  	// this_.attr("data-get","true");
						  	this_.removeClass("butFalse");
						  	this_.removeData("clickget");
						}
				  	});
				}
			}
		}else{
			if(!tncode_div_login){
		        tncode.init('send_miao',2,{hideFun: function(){
	                        this_.removeData("clickget");
	                    }});
		        tncode_div_login =true;
		    }else{
		        tncode.show();
		    }

		    $TN.onsuccess(function(){
				if (public.yzMobile(mobile)) {
					if(type && mobile && user_id){
					  	// this_.attr("data-get","false");
					  	this_.html($weisiteLa.FaSongZhong);
					  	var url = "/dom/ajax_zhuce_code.php?type="+type+"&userid="+user_id+"&mobile="+mobile+"&username="+user_name+"&wap=1&tn_r="+tncode._mark_offset;
					  	$.post(url, function(data){
						  	if (data == 1) {
						  		alert_frame($weisiteLa.CiShouJiHaoMaYiBangDing);
						  		this_.removeData("clickget");
						  		return false;
						  	}
							if($.trim(data) == 'success'){
							  	change_miao(this_);
							}else{
							  	alert_frame($weisiteLa.WangLuoFanMang);
							  	this_.html($weisiteLa.HuoQuYanZhengMa);
							  	// this_.attr("data-get","true");
							  	this_.removeClass("butFalse");
							  	this_.removeData("clickget");
							}
					  	});
					}
				}
			});
		}
  	}else{
		return false;
  	}
}

function change_miao(obj){
  	obj.addClass("butFalse");
  	var a = 60;
  	var time = setInterval(function(){
	  	isSendMsg = 1;
		obj.html(a+$weisiteLa.KeChongXinHuoQu);
		if(a == 0){
		  	clearInterval(time);
		  	obj.html($weisiteLa.HuoQuYanZhengMa);
		  	// obj.attr("data-get","true");
		  	obj.removeClass("butFalse");
		  	obj.removeData("clickget");
		  	var new_html='<span>'+$weisiteLa.YanZhengMaDuanXinMeiShouDao+'<a onclick="send_mob_code(2,\'send_miao\')" class="hqyzm" id="hqyzm_id" href="javascript:;">'+$weisiteLa.ChongXinHuoQuYanZhengMa+'</a></span>';
		  	$("#mobileCodeError").html(new_html);
		}
		a--;
  	},1000);
}
$(function(){
	// var spans = $("#test_span");
    var iLoginErrorCount = 0;
	$("#loginBut,#loginBut_1").on('click', function() {
	  	var loginType = parseInt($.trim($('#loginType').val()));
	  	remove_error_msg();
	  	iLoginErrorCount = 0;
	  	if (!loginType){
			$('#login_name').trigger('blur');
			if (parseInt(iLoginErrorCount) > 0){
				return false;
			}
			$('#login_pwd').trigger('blur');
	  	} else {
		  	if (!check_mobile()){
		  		return false;
		  	}
			// $('#mobile').trigger('blur');
			if (parseInt(iLoginErrorCount) > 0){
				return false;
			}
			if (!check_mobilecode()){
		  		return false;
		  	}
			// $('#mobile_code').trigger('blur');
		  	if (!isSendMsg && !iLoginErrorCount) {
		  		alert_frame($weisiteLa.QingHuoQuShouJiYanZhengMa);
		  		return false;
		  	}
	  	}
		// spans.html('aaaaa'+iLoginErrorCount);
		if (parseInt(iLoginErrorCount) > 0) {
			return false;
		} else {
			$("#myfrom").submit();
		}
	});

	$('#login_name').on('blur',function(){
		// spans.html(1234444);
	  	remove_error_msg();
	  	var username = $.trim($('#login_name').val());
		// spans.html(333333);
	  	if (username.length == 0) {
	  		alert_frame($weisiteLa.ZhangHaoBuNengWeiKong);
			// $("#login_name_msg").html('<span class="caution">账号不能为空！</span>');
			iLoginErrorCount++;
			return false;
			//  }else if(public.yzUsername(username)==false){

			//  // spans.html(8);
			//  	alert_frame($weisiteLa.ZhangHaoWeiZiFu);
			// // $("#login_name_msg").html('<span class="error">账号为6-20个字符(字母/数字/下划线)！</span>');
			// iLoginErrorCount++;
			// return false
	  	} else {
			$("#login_name_msg").html('');
	  	}
	  	// spans.html(1);
	});

	$('#login_pwd').on('blur',function(){
	  remove_error_msg();
	  var password = $.trim($('#login_pwd').val());

	  if (password.length == 0) {
	  	alert_frame($weisiteLa.MiMaBuNengWeiKong);
		// $("#login_pwd_msg").html('<span class="caution">密码不能为空！</span>');
		iLoginErrorCount++;
		return false;
	 //  }else if(public.yzUsername(password)==false){
	 //  	alert_frame("密码为6-20个字符(字母/数字/下划线)！");
		// // $("#login_pwd_msg").html('<span class="error">密码为6-20个字符(字母/数字/下划线)！</span>');
		// iLoginErrorCount++;
		// return false
	  } else {
		$("#login_pwd_msg").html('');
	  }
	  // spans.html(2);
	});
	$('#validatecode').on('blur',function(){
		// check_validate();
	})

	// $('#mobile').on('blur',function(){
	//   remove_error_msg();
	//   var mobile = $.trim($('#mobile').val());
	//   // var mobileErro = $('#mobileError');
	//   if (!mobile) {
	//   	alert_frame("手机号不能为空！");
	// 	// mobileErro.html('<span class="error">手机号不能为空！</span>');
	// 	iLoginErrorCount++;
	// 	return false;
	//   } else if(public.yzMobile(mobile)==false){
	//   	alert_frame("手机号为11位数字！");
	// 	// mobileErro.html('<span class="error">手机号为11位数字！</span>');
	// 	iLoginErrorCount++;
	// 	return false
	//   } else {
	// 	// mobileErro.html('');
	//   }
	//   // spans.html(3);
	// });

	// $('#mobile_code').on('blur',function(){
	//   remove_error_msg();
	//   var mobile_code = $.trim($('#mobile_code').val());
	//   var mobileCodeError = $('#mobileCodeError');
	//   if (!mobile_code) {
	//   	alert_frame("短信验证码不能为空！");
	// 	// mobileCodeError.html('<span class="error">验证码不能为空！</span>');
	// 	iLoginErrorCount++;
	// 	return false;
	//   }  else {
	// 	mobileCodeError.html('');
	//   }
	//   // spans.html(4);
	// });
});
function check_mobile(){
  	var mobile = $.trim($('#mobile').val());
  	if (!mobile) {
  		alert_frame($weisiteLa.ShouJiHaoBuNengWeiKong);
		return false;
  	} else if(public.yzMobile(mobile)==false){
  		alert_frame($weisiteLa.ShouJiHaoWeiWeiShuZi);
		return false;
  	} else {
  		return true;
  	}
}
function check_mobilecode(){
	remove_error_msg();
	var mobile_code = $.trim($('#mobile_code').val());
	var mobileCodeError = $('#mobileCodeError');
	if (!mobile_code) {
	  	alert_frame($weisiteLa.DuanXinYanZhengMaBuNengWeiKong);
		return false;
	}  else {
		return true;
	}
}
function check_validate(){
    var validatecode = $.trim($('#validatecode').val());
    validatecode = validatecode.replace(/\s*/g,"");
    $('#validatecode').val(validatecode);
    if (validatecode.length == 0) {
        alert_frame($weisiteLa.YanZhengMaBuNengWeiKong);
        return false;
    }else{
    	var return_int = 1;
        var date = new Date();
        var u_id = $.trim($('#u_id').val());
        var url = "/dom/ajax_captcha.php?ajax=1&captcha="+validatecode+"&t="+date.getTime()+"&u_id="+u_id;
        $.ajaxSetup (
        {
            async: false
        });
        $.post(url,function(data){
            if(1 == parseInt(data)){
            	return_int = 2;
                alert_frame($weisiteLa.YanZhengMaCuoWu);
                getVcode2();

            }
        });
        if (return_int == 1){
        	return true;
        }else{
        	return false;
        }

    }
}
function movePicModule_left(id){
	var movePicShow = $("#"+id).find(".movePicShow");
	var scroll_x = movePicShow.scrollLeft();
	var li_w = movePicShow.find("ul li").width();
	if(scroll_x == 0){
		movePicShow.find("ul li:last").insertBefore(movePicShow.find("ul li:first"));
		movePicShow.scrollLeft(li_w);
	}
	movePicShow.animate({scrollLeft:0},function(){
		movePicShow.find("ul li:last").insertBefore(movePicShow.find("ul li:first"));
		movePicShow.scrollLeft(li_w);
	});
}
function movePicModule_right(id){
	var movePicShow = $("#"+id).find(".movePicShow");
	var scroll_x = movePicShow.scrollLeft();
	var li_w = movePicShow.find("ul li").width();
	if(scroll_x == li_w){
		movePicShow.find("ul li:first").insertAfter(movePicShow.find("ul li:last"));
		movePicShow.scrollLeft(0);
	}
	movePicShow.animate({scrollLeft:li_w},function(){
		movePicShow.find("ul li:first").insertAfter(movePicShow.find("ul li:last"));
		movePicShow.scrollLeft(0);
	});
}

/*===导航(/js/wap/nav.js)==*/
// JavaScript Document
//导航_function
$(function(){
	var NMore = $("#NMore"),nav = $("#nav"),Nzz = $("#Nzz");
	if(nav.length){
		var topH = nav.offset().top+nav.height();
		if(NMore.hasClass("NMore_1001") || NMore.hasClass("NMore_1003")){
				NMore.css("top",topH);
		}else{
				NMore.css("top",0);
		}
	}
	$(window).on('touchstart',function(e){
		if(NMore.attr("state") == 'close' && !NMore.hasClass("NMore_1001")){
			NMore.hide();
		}
	});
	$("#nav .navMoreBut,#fixed_nav_but,#search_nav").click(function(e){
		var state = NMore.attr("state");
		if(!NMore.hasClass("NMore_1001")){
			NMore.removeAttr("style");
		}
		if(state== "open"){
			cNav(NMore);
			NMore.hide();
		}else{
			NMore.show();
			oNav(NMore);
		}
		return false;
	});
	function cNav(obj){
		obj.attr("state","close");
		if(obj.hasClass("NMore_1002") || obj.hasClass("NMore_1004")){
			Nzz.css({"display":"none"});
		}else if(obj.hasClass("NMore_1005") || obj.hasClass("NMore_1006") || obj.hasClass("NMore_1007") || obj.hasClass("NMore_1008") || obj.hasClass("NMore_1009") || obj.hasClass("NMore_1010") || obj.hasClass("NMore_1011") || obj.hasClass("NMore_1012") || obj.hasClass("NMore_1013")){
			var webBody = $("#webBody,.main");
			if(is_wap_view){
				$("body").removeAttr("style");
			}
			webBody.removeClass("NMoreEffect");
			// webBody.attr("state","close");
			obj.find("span").removeAttr("style");
			if(obj.hasClass("NMore_1009") || obj.hasClass("NMore_1010") || obj.hasClass("NMore_1013")){
				// obj.find("li em").removeAttr("style");
				obj.find("li em").css("transition-delay",'0s');
			}else if(obj.hasClass("NMore_1011") || obj.hasClass("NMore_1012")){
				obj.find("li").removeAttr("style");
			}
		}else if(obj.hasClass("NMore_1014")){
			var nMore = $("#fixed_nav_but");
			obj.removeAttr("style");
		}
	}
	function oNav(obj){
		if(obj.hasClass("NMore_1002") || obj.hasClass("NMore_1004")){
			var w = $(document).width();
			var h = $(document).height()
			Nzz.css({"display":"block"});
		}else if(obj.hasClass("NMore_1005") || obj.hasClass("NMore_1006") || obj.hasClass("NMore_1007") || obj.hasClass("NMore_1008") || obj.hasClass("NMore_1009") || obj.hasClass("NMore_1010") || obj.hasClass("NMore_1011") || obj.hasClass("NMore_1012") || obj.hasClass("NMore_1013")){
			var	liNum = obj.find("li").length,
				sDate = 0,
				iDate = liNum*0.08;
			var webBody = $("#webBody,.main");
			if(is_wap_view){
				$("body").css({"position":"fixed","width":"100%"});
			}
			obj.find("li").each(function(){
				var t = $(this);
				sDate += 0.08;
				t.find("span").css("transition-delay",sDate+'s');
				if(obj.hasClass("NMore_1009")){
					t.find("em").css("transition-delay",iDate+'s');
					iDate -= 0.08;
				}else if(obj.hasClass("NMore_1010") || obj.hasClass("NMore_1013")){
					t.find("em").css("transition-delay",sDate+'s');
				}else if(obj.hasClass("NMore_1011") || obj.hasClass("NMore_1012")){
					t.css("transition-delay",sDate+'s');
				}
			})
			// webBody.attr("state","open");
			webBody.addClass("NMoreEffect");
		}else if(obj.hasClass("NMore_1014")){
			var nMore = $("#fixed_nav_but"),
				winH = $(window).height(),
				left = parseInt(nMore.css("left")),
				bottom = parseInt(nMore.css("bottom")),
				top = parseInt(nMore.css("top")),
				height = parseInt(nMore.height());
			/*var nMore = $("#fixed_nav_but"), left = parseInt(nMore.css("left")), top = parseInt(nMore.css("top")), height = parseInt(obj.height());
			obj.css({left:left+'px',top:top-height-28+'px'})*/
			/*if(top > winH/2){
				obj.css({left:left+'px',bottom:bottom+height+'px'})
			}else{
				obj.css({left:left+'px',top:top+height+'px'})
			}*/
			obj.css({left:left+'px',bottom:bottom+height+10+'px'})
		}
		setTimeout(function(){
			obj.attr("state","open");
		})
	}

	Nzz.click(function(){
		if(NMore.attr("state") == 'open'){
			cNav(NMore);
		}
	});
	NMore.click(function(){
		if(NMore.attr("state") == 'open'){
			cNav(NMore);
		}
	});
	$("#back_top").click(function(){
		$(document).find("body").animate({"scrollTop":0},1000);
	});
});


/*============END==========*/


/*=============/js/tj/model_banner.js================*/
$(function(){
  $(".moveModule_1").each(function(){
	  $(this).width($(this).parent().width());
	var obj = $(this),
	h = parseInt(obj.height()),
	w = parseInt(obj.width()),
	li = obj.find(".show_piclist dd"),
	ul = obj.find(".show_piclist dl"),
	limr = parseInt(li.css("margin-right")),
	spage = obj.find(".show_pagelist span"),
	next = obj.find(".move_next"),
	prev = obj.find(".move_prev"),
	i = 0,
	sum = li.length;
	li.width(w);
	/*obj.find(".show_piclist").css({"width":w+"px","height":h+"px","overflow":"hidden"});
	obj.find(".show_piclist dd").css({"width":w+"px","height":h+"px","overflow":"hidden"});*/
	function move(c){
	  if(spage.length>1){
		spage.removeClass("cur");
		obj.find(".show_pagelist span:eq("+c+")").addClass("cur");
	  }
	  ul.animate({"margin-left":-(w+limr)*c},1000);
	}
	var times = setInterval(function(){
	  if(i<sum-1){
		i++;
	  }else{
		i=0;
	  }
	  move(i);
	},5000);
	obj.bind("mouseenter",function(){
		clearInterval(times);
	  });
	obj.bind("mouseleave",function(){
	  times = setInterval(function(){
		if(i<sum-1){
		  i++;
		}else{
		  i=0;
		}
		move(i);
	  },5000);
	  });
	  spage.bind("click",function(){//alert($(this).index());
		$(this).addClass("cur");
		$(this).siblings().removeClass("cur");
		i = $(this).index();
		move(i);
	  });
	  if(next.length>0 || prev.length>0){
		  obj.mouseenter(function(){
			 next.animate({"opacity":1},1000);
			 prev.animate({"opacity":1},1000);
		  });
		  obj.mouseleave(function(){
			 next.animate({"opacity":0},1000);
			 prev.animate({"opacity":0},1000);
		  });
		next.css({"top":(h/2)-20}).bind("click",function(){
		  if(ul.is(':animated') == false){
			if(i<sum-1){
			  i++;
			}else{
			  i=0;
			}
			move(i);
		  }
		});
		prev.css({"top":(h/2)-20}).bind("click",function(){
		  if(ul.is(':animated') == false){
			if(i>0){
			  i--;
			}else{
			  i=sum-1;
			}
			move(i);
		  }
		});
	  }
	  move(i);
  });
});
// 图标列表页
(function tabList(){
	var box=$(".rollIconMo"),
		dot=$(".rollBox",box),
		tab=$(".rollman",box),
		tabLi=$;

	dot.on("touchend,click","em",function(){
		var ind=$(this).index();
	})
    $(".rollIconMo").each(function(){
		$(this).width($(this).parent().width());
		var obj = $(this),
		h = obj.height(),
		w = parseInt(obj.width()),
		li = obj.find(".show_piclist dd"),
		ul = obj.find(".show_piclist dl"),
		limr = parseInt(li.css("margin-right")),
		spage = obj.find(".show_pagelist span"),
		next = obj.find(".move_next"),
		prev = obj.find(".move_prev"),
		i = 0,
		sum = li.length;
		/*obj.find(".show_piclist").css({"width":w+"px","height":h+"px","overflow":"hidden"});
		obj.find(".show_piclist dd").css({"width":w+"px","height":h+"px","overflow":"hidden"});*/
		function move(c){
			if(spage.length>1){
				spage.removeClass("cur");
				obj.find(".show_pagelist span:eq("+c+")").addClass("cur");
			}
			ul.animate({"margin-left":-(w+limr)*c},200);
		}
		var times = setInterval(function(){
			if(i<sum-1){
				i++;
			}else{
				i=0;
			}
			move(i);
		},5000);
		obj.bind("mouseenter",function(){
			clearInterval(times);
		});
		obj.bind("mouseleave",function(){
			times = setInterval(function(){
				if(i<sum-1){
					i++;
				}else{
					i=0;
				}
				move(i);
			},5000);
		});
		spage.bind("click",function(){//alert($(this).index());
			$(this).addClass("cur");
			$(this).siblings().removeClass("cur");
			i = $(this).index();
			move(i);
		});
		if(next.length>0 || prev.length>0){
			obj.mouseenter(function(){
				next.animate({"opacity":1},1000);
				prev.animate({"opacity":1},1000);
			});
			obj.mouseleave(function(){
				next.animate({"opacity":0},1000);
				prev.animate({"opacity":0},1000);
			});
			next.css({"top":(h/2)-20}).bind("click",function(){
				if(ul.is(':animated') == false){
					if(i<sum-1){
						i++;
					}else{
						i=0;
					}
					move(i);
				}
			});
			prev/*.css({"top":(h/2)-20})*/.bind("click",function(){
				if(ul.is(':animated') == false){
					if(i>0){
						i--;
					}else{
						i=sum-1;
					}
					move(i);
				}
			});
		}
		move(i);
	});
})(window);
/*=============END================*/
/*=============/js/tj/move_module.js================*/
(function($){
  $.fn.extend({
    "moveModule" : function(options){
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
            lilength = _this.find("li").length,
            movepx = 0,
            times=null,
            thisPar = $(this).parent();
            if(lilength >= 2){
                // thisPar.height(_this.find("li:first").height()*(lilength-1));
                thisPar.height(_this.find("li:first").outerHeight()*(lilength));
            }else{
                // thisPar.height(h);
                thisPar.height(_this.find("li:first").outerHeight());
            }
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
          _this.width(firstChild.width()*2+10);
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
            /*_this.bind("mouseout",function(){
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
