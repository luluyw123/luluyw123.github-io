
//显示表情框函数
var faceArray = [
			{face_name:'微笑',face_id:'face1',face_url:'/images/wap/face/1.gif'},
			{face_name:'撇嘴',face_id:'face2',face_url:'/images/wap/face/2.gif'},
			{face_name:'色',face_id:'face3',face_url:'/images/wap/face/3.gif'},
			{face_name:'发呆',face_id:'face4',face_url:'/images/wap/face/4.gif'},
			{face_name:'得意',face_id:'face5',face_url:'/images/wap/face/5.gif'},
			{face_name:'流泪',face_id:'face6',face_url:'/images/wap/face/6.gif'},
			{face_name:'害羞',face_id:'face7',face_url:'/images/wap/face/7.gif'},
			{face_name:'闭嘴',face_id:'face8',face_url:'/images/wap/face/8.gif'},
			{face_name:'睡',face_id:'face9',face_url:'/images/wap/face/9.gif'},
			{face_name:'大哭',face_id:'face10',face_url:'/images/wap/face/10.gif'},
			{face_name:'尴尬',face_id:'face11',face_url:'/images/wap/face/11.gif'},
			{face_name:'发怒',face_id:'face12',face_url:'/images/wap/face/12.gif'},
			{face_name:'调皮',face_id:'face13',face_url:'/images/wap/face/13.gif'},
			{face_name:'龇牙',face_id:'face14',face_url:'/images/wap/face/14.gif'},
			{face_name:'惊讶',face_id:'face15',face_url:'/images/wap/face/15.gif'},
			{face_name:'难过',face_id:'face16',face_url:'/images/wap/face/16.gif'},
			{face_name:'酷',face_id:'face17',face_url:'/images/wap/face/17.gif'},
			{face_name:'冷汗',face_id:'face18',face_url:'/images/wap/face/18.gif'},
			{face_name:'抓狂',face_id:'face19',face_url:'/images/wap/face/19.gif'},
			{face_name:'吐',face_id:'face20',face_url:'/images/wap/face/20.gif'},
			{face_name:'可怜',face_id:'face21',face_url:'/images/wap/face/21.gif'},
			{face_name:'偷笑',face_id:'face22',face_url:'/images/wap/face/22.gif'},
			{face_name:'可爱',face_id:'face23',face_url:'/images/wap/face/23.gif'},
			{face_name:'白眼',face_id:'face24',face_url:'/images/wap/face/24.gif'},
			{face_name:'傲慢',face_id:'face25',face_url:'/images/wap/face/25.gif'},
			{face_name:'饥饿',face_id:'face26',face_url:'/images/wap/face/26.gif'},
			{face_name:'困',face_id:'face27',face_url:'/images/wap/face/27.gif'},
			{face_name:'惊恐',face_id:'face28',face_url:'/images/wap/face/28.gif'},
			{face_name:'流汗',face_id:'face29',face_url:'/images/wap/face/29.gif'},
			{face_name:'憨笑',face_id:'face30',face_url:'/images/wap/face/30.gif'},
			{face_name:'大兵',face_id:'face31',face_url:'/images/wap/face/31.gif'},
			{face_name:'奋斗',face_id:'face32',face_url:'/images/wap/face/32.gif'},
			{face_name:'咒骂',face_id:'face33',face_url:'/images/wap/face/33.gif'},
			{face_name:'疑问',face_id:'face34',face_url:'/images/wap/face/34.gif'},
			{face_name:'嘘..',face_id:'face35',face_url:'/images/wap/face/35.gif'},
			{face_name:'晕',face_id:'face36',face_url:'/images/wap/face/36.gif'},
			{face_name:'折磨',face_id:'face37',face_url:'/images/wap/face/37.gif'},
			{face_name:'衰',face_id:'face38',face_url:'/images/wap/face/38.gif'},
			{face_name:'骷髅',face_id:'face39',face_url:'/images/wap/face/39.gif'},
			{face_name:'敲打',face_id:'face40',face_url:'/images/wap/face/40.gif'},
			{face_name:'再见',face_id:'face41',face_url:'/images/wap/face/41.gif'},
			{face_name:'吓',face_id:'face42',face_url:'/images/wap/face/42.gif'},
			{face_name:'擦汗',face_id:'face43',face_url:'/images/wap/face/43.gif'},
			{face_name:'抠鼻',face_id:'face44',face_url:'/images/wap/face/44.gif'},
			{face_name:'鼓掌',face_id:'face45',face_url:'/images/wap/face/45.gif'},
			{face_name:'糗大了',face_id:'face46',face_url:'/images/wap/face/46.gif'},
			{face_name:'坏笑',face_id:'face47',face_url:'/images/wap/face/47.gif'},
			{face_name:'左哼哼',face_id:'face48',face_url:'/images/wap/face/48.gif'},
			{face_name:'右哼哼',face_id:'face49',face_url:'/images/wap/face/49.gif'},
			{face_name:'哈欠',face_id:'face50',face_url:'/images/wap/face/50.gif'},
			{face_name:'鄙视',face_id:'face51',face_url:'/images/wap/face/51.gif'},
			{face_name:'委屈',face_id:'face52',face_url:'/images/wap/face/52.gif'},
			{face_name:'快哭了',face_id:'face53',face_url:'/images/wap/face/53.gif'},
			{face_name:'阴笑',face_id:'face54',face_url:'/images/wap/face/54.gif'},
			{face_name:'亲亲',face_id:'face55',face_url:'/images/wap/face/55.gif'},
			{face_name:'抱抱',face_id:'face56',face_url:'/images/wap/face/56.gif'},
			{face_name:'礼物',face_id:'face57',face_url:'/images/wap/face/57.gif'},
			{face_name:'菜刀',face_id:'face58',face_url:'/images/wap/face/58.gif'},
			{face_name:'西瓜',face_id:'face59',face_url:'/images/wap/face/59.gif'},
			{face_name:'啤酒',face_id:'face60',face_url:'/images/wap/face/60.gif'},
			{face_name:'篮球',face_id:'face61',face_url:'/images/wap/face/61.gif'},
			{face_name:'乒乓',face_id:'face62',face_url:'/images/wap/face/62.gif'},
			{face_name:'太阳',face_id:'face63',face_url:'/images/wap/face/63.gif'},
			{face_name:'咖啡',face_id:'face64',face_url:'/images/wap/face/64.gif'},
			{face_name:'饭',face_id:'face65',face_url:'/images/wap/face/65.gif'},
			{face_name:'猪头',face_id:'face66',face_url:'/images/wap/face/66.gif'},
			{face_name:'玫瑰',face_id:'face67',face_url:'/images/wap/face/67.gif'},
			{face_name:'凋谢',face_id:'face68',face_url:'/images/wap/face/68.gif'},
			{face_name:'示爱',face_id:'face69',face_url:'/images/wap/face/69.gif'},
			{face_name:'爱心',face_id:'face70',face_url:'/images/wap/face/70.gif'},
			{face_name:'心碎',face_id:'face71',face_url:'/images/wap/face/71.gif'},
			{face_name:'蛋糕',face_id:'face72',face_url:'/images/wap/face/72.gif'},
			{face_name:'闪电',face_id:'face73',face_url:'/images/wap/face/73.gif'},
			{face_name:'炸弹',face_id:'face74',face_url:'/images/wap/face/74.gif'},
			{face_name:'刀',face_id:'face75',face_url:'/images/wap/face/75.gif'},
			{face_name:'足球',face_id:'face76',face_url:'/images/wap/face/76.gif'},
			{face_name:'瓢虫',face_id:'face77',face_url:'/images/wap/face/77.gif'},
			{face_name:'便便',face_id:'face78',face_url:'/images/wap/face/78.gif'},
			{face_name:'月亮',face_id:'face79',face_url:'/images/wap/face/79.gif'},
			{face_name:'爱你',face_id:'face80',face_url:'/images/wap/face/80.gif'},
			{face_name:'NO',face_id:'face81',face_url:'/images/wap/face/81.gif'},
			{face_name:'OK',face_id:'face82',face_url:'/images/wap/face/82.gif'},
			{face_name:'强',face_id:'face83',face_url:'/images/wap/face/83.gif'},
			{face_name:'差劲',face_id:'face84',face_url:'/images/wap/face/84.gif'},
			{face_name:'弱',face_id:'face85',face_url:'/images/wap/face/85.gif'},
			{face_name:'握手',face_id:'face86',face_url:'/images/wap/face/86.gif'},
			{face_name:'胜利',face_id:'face87',face_url:'/images/wap/face/87.gif'},
			{face_name:'抱拳',face_id:'face88',face_url:'/images/wap/face/88.gif'},
			{face_name:'勾引',face_id:'face89',face_url:'/images/wap/face/89.gif'},
			{face_name:'拳头',face_id:'face90',face_url:'/images/wap/face/90.gif'},
			{face_name:'回头',face_id:'face91',face_url:'/images/wap/face/91.gif'},
			{face_name:'怄火',face_id:'face92',face_url:'/images/wap/face/92.gif'},
			{face_name:'转圈',face_id:'face93',face_url:'/images/wap/face/93.gif'},
			{face_name:'磕头',face_id:'face94',face_url:'/images/wap/face/94.gif'},
			{face_name:'爱情',face_id:'face95',face_url:'/images/wap/face/95.gif'},
			{face_name:'飞吻',face_id:'face96',face_url:'/images/wap/face/96.gif'},
			{face_name:'跳跳',face_id:'face97',face_url:'/images/wap/face/97.gif'},
			{face_name:'发抖',face_id:'face98',face_url:'/images/wap/face/98.gif'},
			{face_name:'跳绳',face_id:'face99',face_url:'/images/wap/face/99.gif'},
			{face_name:'挥手',face_id:'face100',face_url:'/images/wap/face/100.gif'}
		];
var appendObj;
//doc  文章详细页发表评论
var showFace = function(clickObj,toObj,doc){
	appendObj = toObj;
	if(!$("#faceArea").length){
		var aarray = [],n,i=0;
		for(;n = faceArray[i];i++){
			aarray.push('<a href="###" data-name="['+faceArray[i].face_name+']" data-id="'+faceArray[i].face_id+'" data-url="'+faceArray[i].face_url+'"></a>');
		}
		var a = aarray.join("");
		var faceArea =$('<div class="faceArea" id="faceArea"><em class="close">×</em><div class="faceDiv"><div class="face">'+a+'</div></div></div>');
		$("body").append(faceArea);

		faceArea.on({
			click : function(){
				faceArea.css("display","none");
			}
		},"em.close")
		faceArea.find("div.face").on({
			click : function(){
				if(appendObj.val() == '回两句吧...'){
					appendObj.val('');
					appendObj.focus();
				}
				var tmp_data_name = $(this).attr("data-name");
				var tmp_data_name_length = tmp_data_name.length;
				if(appendObj.attr('id') == 'theme_content'){
					var limit_obj = appendObj.parent().parent().parent().siblings('.ev_popbox_t').find('#limitingtext');
				}else{
					var limit_obj = appendObj.parent().siblings('.ev_popbox_t').find('#limitingtext');
				}
				var tmp_limit = limit_obj.html();
				tmp_limit = parseInt(tmp_limit);
				tmp_limit = tmp_limit-(tmp_data_name_length-2);
				limit_obj.html(tmp_limit);
				appendObj.val(appendObj.val()+$(this).attr("data-name"));
				faceArea.hide();
			}
		},"a");
	}else{
		var faceArea = $("#faceArea");
	}
	if(doc){
		var t = clickObj.offset().top+clickObj.height()+10,l = clickObj.offset().left-faceArea.width() + 5;
		l = l < 5 ? l = 5 : l = clickObj.offset().left-faceArea.width() + 5;
		// var t = clickObj.offset().top+clickObj.height()+10,l = clickObj.offset().left-230;
	}else{
		var t = clickObj.offset().top+clickObj.height(),l = $('#wrapper').offset().left;
	}
	// if(clickObj.parent().attr('class') == 'ev_popbox_t'){
		// var popbox = clickObj.parents("#popbox");
		// var thisH = parseInt(popbox.css("margin-top"))+popbox.height();//白色框高度
		// var t = thisH,l = $('.wrapper').offset().left;
		// faceArea.css({"position":"fixed"});
	// }
	faceArea.css({"display":"block","top":t+"px","left":l+"px"});
};
