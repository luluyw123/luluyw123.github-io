//根据条件输出列表内容
var filtrateFun = {
    // 筛选价格显示
    filterPro: function(dataId){
        var pPrice = $('#firstClassify').find('dt[data-id="pPrice"]')
        if(!pPrice.length) return false;
        if(dataId == 'all'){
            dataId = 0
        }else{
            dataId = dataId.split('_')[1]
        }
        pPrice.next('dd').find('.item').each(function(){
            var self = $(this), classID = self.data('classid')
            if(classID == dataId || classID == 0){
                self.show()
            }else{
                if(self.hasClass('active')){
                    self.trigger('click')
                }
                self.hide()
            }
        })
    },
    //排序列表输出
    addSortList: function () {
        var x, sList = "", sLi = "", sDt = "", curVal = "", j = proF.sort;
        if (proF.clickVal.sort[0]) {
            curVal = proF.clickVal.sort[0];
        } else if (proF.getback.sort[0]) {
            curVal = proF.getback.sort[0];
        } else {
            curVal = "all";
        }
        for (x in j) {
            var curCss = curVal == x ? "cur" : "";
            var dataUrl = j[x]['url'], dataId = j[x]['id'], name = j[x]['name'], attrCss = j[x]['class'];
            if (x == "all") {
                sDt = '<dt data-id="' + dataId + '" class="' + curCss + '" data-url="' + dataUrl + '"><i class="icon-img icon-' + attrCss + '"></i><strong>' + name + '</strong><em><s></s></em></dt>';
            }
            sLi += '<li data-id="' + dataId + '" class="' + curCss + '" data-url="' + dataUrl + '"><strong>' + name + '</strong><em><s></s></em></li>';
        }
        sList = '<dl>' + sDt + '<dd><ul>' + sLi + '</ul></dd></dl>';
        return sList;
    },
    addPinList: function () {
    },
    addPriceList: function () {
    },
    addFiltrateList: function (big, middle, small) {    //筛选列表输出函数
        var l = arguments.length,
            x = "", sList = "", sDt = "", sLi = "", curVal = "";
        if (l == 0) {       //筛选一级列表输出
            var j = proF.filtrate;
            // console.log(proF)
            for (x in j) {
                // if(Object.keys(j[x]['sub']).length <= 1) continue;
                var btext = $weisiteLa.QuBu,
                    hasmore = "";
                if(proF.clickVal.filtrate[x] == undefined) continue;
                if (proF.clickVal.filtrate[x][0]) {
                    var l_big = proF.clickVal.filtrate[x][0];
                    if (l_big && x == 'pClass') {
                        l_big = l_big;
                    }
                    if (proF.clickVal.filtrate[x][1] && proF.clickVal.filtrate[x][1] != "all") {
                        var l_small = proF.clickVal.filtrate[x][1];
                        if (l_small && x == 'pClass') {
                            l_small = l_small;
                        }
                        if (typeof(j[x]['sub'][l_big]['sub']) == 'object') {
                            if (j[x]['sub'][l_big]['sub'][l_small]) {
                                btext = j[x]['sub'][l_big]['sub'][l_small]['name'];
                            }
                        } else {
                            btext = j[x]['sub'][l_big]['name'];
                        }
                    } else {
                        if (typeof(j[x]['sub']) == 'object') {
                            if (j[x]['sub'][l_big]) {
                                btext = j[x]['sub'][l_big]['name'];
                            }
                        }
                    }
                } else if (proF.getback.filtrate[x][0]) {
                    var l_big = proF.getback.filtrate[x][0], l_small = proF.getback.filtrate[x][1];
                    if (l_big === 0 || l_big == undefined) {
                        l_big = "all";
                    }
                    if (l_small === 0 || l_small == undefined) {
                        l_small = "all";
                    }
                    if (l_small != "all") {
                        if (typeof(j[x]['sub'][l_big]['sub']) == 'object') {
                            if (j[x]['sub'][l_big]['sub'][l_small]) {
                                btext = j[x]['sub'][l_big]['sub'][l_small]['name'];
                            }
                        }
                    } else {
                        if (typeof(j[x]['sub']) == 'object') {
                            if (j[x]['sub'][l_big]) {
                                btext = j[x]['sub'][l_big]['name'];
                            }
                        }
                    }
                }
                var url = j[x]['url'] ? j[x]['url'] : "";

                if(x=="pClass" || x=="pBrand"){
                    hasmore = "more";
                }
                if(x=="pClass" || x=="pBrand"){
                    hasmore = "more";
                }
                sLi += '<dt data-id="' + j[x]["id"] + '" data-url="' + url + '">' + j[x]["name"] + (hasmore?'<a href="#">'+$weisiteLa.GengDuo+'&nbsp;></a>':'') + '</dt><dd class="' + (hasmore?"more":"all") + '">';
                var k = proF.filtrate[x]["sub"];
                if (proF.clickVal.filtrate[x][0]) {
                    curVal = proF.clickVal.filtrate[x][0];
                } else if (proF.getback.filtrate[x][0]) {
                    curVal = proF.getback.filtrate[x][0];
                } else {
                    curVal = "0";
                }
                if (x == 'pBrand' || x == 'pPrice') {
                    var pp = true;
                }else{
                    var pp = false;
                }
                if (typeof(k) == 'object') {
                    // console.log(curVal,'bbb')
                    curVal = curVal == 'p_0' || curVal == 0 ? 'all' : curVal
                    for (y in k) { //筛选二级列表输出
                        if(y == 'class') continue;
                        var url = k[y]['url'] ? k[y]['url'] : "",
                            id = k[y]["id"], 
                            name = k[y]["name"],
                            cur = curVal == id ? "active" : "",
                            // cur = curVal == id ? "active" : "",
                            target = k[y]['url_yemian'],
                            exitsArr = (x == 'pBrand' && k[y]['exits_pro']) ? k[y]['exits_pro'] : '',
                            is_true = null, is_true2 = null;
                        if (pp) {
                            class_id = parseInt(k[y]['class_id']);
                            class_id = isNaN(class_id) ? 0 : class_id;
                            var clickClassId = parseInt(proF.clickVal.filtrate.pClass[0].substr(2));
                            clickClassId = isNaN(clickClassId) ? 0 : clickClassId;
                            if (x == 'pBrand') {
                                is_true = ((class_id == 0 && clickClassId == 0) || (clickClassId == class_id && class_id != 0) || (class_id != 0 && $.inArray(clickClassId.toString(), exitsArr) != -1));
                            } else {
                                if ($.inArray(clickClassId.toString(), k['class']) != -1) {
                                    is_true = clickClassId == class_id;
                                } else {
                                    is_true = class_id == 0;
                                }
                            }
                            if (x != "all") {
                                /*if (is_true && x != 'class') {
                                    sLi += '<div href="#" class="item double ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p></div>';
                                } else {
                                    sLi += '<div href="#" class="item double ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p></div>';
                                }*/
                                if(x == 'pPrice'){
                                    var class_id = k[y]["class_id"]
                                    sLi += '<div href="#" class="item double ' + cur + '" data-id="' + id + '" data-classId="' + class_id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p></div>';
                                }else{
                                    sLi += '<div href="#" class="item double ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p></div>';
                                }
                            }
                        } else {
                            if (x != "all") {
                                sLi += '<div href="#" class="item triple ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name;
                                    //筛选三级列表输出  样式不好弄，搁浅
                                    /*var m = proF.filtrate[x]["sub"][y]["sub"];
                                    if (proF.clickVal.filtrate[x][1]) {
                                        curVal = proF.clickVal.filtrate[x][1];
                                    } else if (proF.getback.filtrate[x][1]) {
                                        curVal = proF.getback.filtrate[x][1];
                                    } else {
                                        curVal = "all";
                                    }
                                    if (typeof(m) == "object") {
                                        sLi += "<ul>";
                                        for (z in m) { 
                                            var url = m[z]['url'] ? m[z]['url'] : "";
                                            var id = m[z]["id"],
                                                name = m[z]["name"];
                                            var cur = id == curVal ? "cur" : "";
                                            var target = m[z]['url_yemian'];
                                            if (x != "all") {
                                                sLi += '<li class="' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><strong>' + name + '</strong><em><s></s></em><small></small></li>';
                                            } else {
                                                sLi = '<li class="' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><i></i><strong>' + name + '</strong><em><s></s></em></li>';
                                            }
                                        }
                                        sLi += '<ul>';
                                        // return sList;
                                    }*/
                                sLi += '</p></div>';
                            } else {
                                sLi += '<div href="#" class="item triple ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p></div>';
                            }
                        }
                    }
                    // iList += 
                    // return sList;
                }
                sLi += '</dd>';
            }
            sList = '<div class="filter-con"><div class="filter-top" >'+$weisiteLa.ShaiXuan+'</div><dl class="filter-list">' + sLi + '</dl></div>';
            // sList='<div class="filter-con"><div class="filter-top" ><a class="arrow-l" ></a>筛选<a class="ok-btn">完成</a></div><dl class="filter-list"><dt>商品状态</dt><dd class="all" ><a href="#" class="item triple">推荐</a><a href="#" class="item ">促销</a></dd><dt style="">价格区间</dt><dd class="all"><a href="#" class="item double" >1000-200</a><a href="#" class="item double">促销</a></dd><dt style="">商品分类 <a href="#">更多&nbsp;></a></dt><dd class="more"><a href="#" class="item double">1000-200</a><a href="#" class="item double">促销</a></dd></dl></div>';
            return sList;
        }
        if (l == 1) {   //筛选二级列表输出
            var j = proF.filtrate[big]["sub"]
                jn= proF.filtrate[big]["name"];
            if (proF.clickVal.filtrate[big][0]) {
                curVal = proF.clickVal.filtrate[big][0];
            } else if (proF.getback.filtrate[big][0]) {
                curVal = proF.getback.filtrate[big][0];
            } else {
                curVal = "all";
            }
            if (big == 'pBrand' || big == 'pPrice') {
                var pp = true;
            }
            if (typeof(j) == 'object') {
                for (x in j) {
                    var url = j[x]['url'] ? j[x]['url'] : "",
                        id = j[x]["id"], name = j[x]["name"],
                        cur = curVal == id ? "cur" : "",
                        target = j[x]['url_yemian'],
                        exitsArr = (big == 'pBrand' && j[x]['exits_pro']) ? j[x]['exits_pro'] : '',
                        is_true = null, is_true2 = null;
                    if (pp) {
                        class_id = parseInt(j[x]['class_id']);
                        class_id = isNaN(class_id) ? 0 : class_id;
                        var clickClassId = parseInt(proF.clickVal.filtrate.pClass[0].substr(2));
                        clickClassId = isNaN(clickClassId) ? 0 : clickClassId;
                        if (big == 'pBrand') {
                            is_true = ((class_id == 0 && clickClassId == 0) || (clickClassId == class_id && class_id != 0) || (class_id != 0 && $.inArray(clickClassId.toString(), exitsArr) != -1));
                        } else {
                            if ($.inArray(clickClassId.toString(), j['class']) != -1) {
                                is_true = clickClassId == class_id;
                            } else {
                                is_true = class_id == 0;
                            }
                        }
                        if (x != "all") {
                            if (is_true && x != 'class') {
                                sLi += '<dd class="item ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p>';
                                    // var m = proF.filtrate[big]["sub"][x]["sub"];
                                    // if (proF.clickVal.filtrate[big][1]) {
                                    //     curVal = proF.clickVal.filtrate[big][1];
                                    // } else if (proF.getback.filtrate[big][1]) {
                                    //     curVal = proF.getback.filtrate[big][1];
                                    // } else {
                                    //     curVal = "all";
                                    // }
                                    // if (typeof(m) == "object") {
                                    //     sLi += "<ul>";
                                    //     for (z in m) { 
                                    //         var url = m[z]['url'] ? m[z]['url'] : "";
                                    //         var id = m[z]["id"],
                                    //             name = m[z]["name"];
                                    //         var cur = id == curVal ? "cur" : "";
                                    //         var target = m[z]['url_yemian'];
                                    //         if (x != "all") {
                                    //             sLi += '<li class="' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><strong>' + name + '</strong><em><s></s></em><small></small></li>';
                                    //         } else {
                                    //             sLi = '<li class="' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><i></i><strong>' + name + '</strong><em><s></s></em></li>';
                                    //         }
                                    //     }
                                    //     sLi += '<ul>';
                                    // }
                                sLi += '</dd>';
                            }
                        } else {
                            sLi += '<dd class="item ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p></dd>';
                        }
                    } else {
                        if (x != "all") {
                            sLi += '<dd class="item ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p>';
                            // var m = proF.filtrate[big]["sub"][x]["sub"];
                            // if (proF.clickVal.filtrate[big][1]) {
                            //     curVal = proF.clickVal.filtrate[big][1];
                            // } else if (proF.getback.filtrate[big][1]) {
                            //     curVal = proF.getback.filtrate[big][1];
                            // } else {
                            //     curVal = "all";
                            // }
                            // if (typeof(m) == "object") {
                            //     sLi += "<ul>";
                            //     for (z in m) { 
                            //         var url = m[z]['url'] ? m[z]['url'] : "";
                            //         var id = m[z]["id"],
                            //             name = m[z]["name"];
                            //         var cur = id == curVal ? "cur" : "";
                            //         var target = m[z]['url_yemian'];
                            //         if (x != "all") {
                            //             sLi += '<li class="' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><strong>' + name + '</strong><em><s></s></em><small></small></li>';
                            //         } else {
                            //             sLi = '<li class="' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><i></i><strong>' + name + '</strong><em><s></s></em></li>';
                            //         }
                            //     }
                            //     sLi += '<ul>';
                            // }
                            sLi += '</dd>';
                        } else {
                            sLi += '<dd class="item ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p></dd>';
                        }
                    }
                }
                sList = '<div class="filter-con"><div class="filter-top" ><a class="arrow-l" ></a>'+$weisiteLa.QuBu + jn + '</div><dl class="filter-list">' + sLi + '</dl></div>';
                return sList;
            }
        }
        if (l == 2) {       //筛选三级列表输出
            var j = proF.filtrate[big]["sub"][middle]["sub"]
                jn= proF.filtrate[big]["sub"][middle]["name"];
            if (proF.clickVal.filtrate[big][1]) {
                curVal = proF.clickVal.filtrate[big][1];
            } else if (proF.getback.filtrate[big][1]) {
                curVal = proF.getback.filtrate[big][1];
            } else {
                curVal = "all";
            }
            if (typeof(j) == "object") {
                for (x in j) {
                    var url = j[x]['url'] ? j[x]['url'] : "";
                    var id = j[x]["id"],
                        name = j[x]["name"];
                    var cur = id == curVal ? "cur" : "";
                    var target = j[x]['url_yemian'];
                    if (x != "all") {
                        sLi += '<dd class="item ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p></dd>';
                    } else {
                        sLi += '<dd class="item ' + cur + '" data-id="' + id + '" data-url="' + url + '" data-target="' + target + '"><p>' + name + '</p></dd>';
                    }
                }
                sList = '<div class="filter-con"><div class="filter-top" ><a class="arrow-l" ></a>'+ jn +'</div><dl class="filter-list">' + sLi + '</dl></div>';
                return sList;
            }
        }
    }
};

// tab选择
function specTab(o, obj) {
    var t = $(o), tVal = t.attr("data-val");
    if (t.hasClass("cur")) {
        t.removeClass("cur");
        $(".priceInfo").hide();
    } else {
        $(".priceInfo").show();
        t.addClass("cur").siblings().removeClass("cur");
        $("#" + obj).show().siblings().hide();
    }
    // $(".priceC").find('input').attr('checked', false);
    // $(".priceC").find('dd').removeClass("cur");
}

$(function () {
    //得到dom元素
    var filtrateBut = $("#filtrateBut"),
        wrap = $("#filtrateListWrap"),
        sortList = $("#sortfiltrateList"),
        firstClassify = $("#firstClassify"),
        secondClassify = $("#secondClassify"),
        thirdClassify = $("#thirdClassify"),
        resetBut = $("#filtrateResetBut"),
        enterBut = $("#filtrateEnterBut");
    // 阴影区域隐藏
    wrap.on("click",function(){
        firstClassify.animate({right: "-100%"}, 300);
        secondClassify.animate({right: "-100%"}, 300);
        thirdClassify.animate({right: "-100%"}, 300, function(){
            $(".toolMenu").show();
            $(".ev_t_top1").show();
            $(".return_top").show();
            $(".fixedNavBut").show();
            $(".fixedShopCar").show();
            wrap.fadeOut().attr("style","");
            filtrateBut.find(".firstList").data("open", 0);
        });
    })
    //给dom元素绑定事件
    filtrateBut.on({
        click: function () {
            var curBut = $(this), dataId = curBut.data("id"), open = curBut.data("open");
            //根据单击添加内容列表
            switch (dataId) {
                case "sortList" :
                    if (sortList.data("add") != 1) {
                        sortList.html(filtrateFun.addSortList());
                        sortList.data("add", 1);
                    }
                    break;
                case "firstClassify" :
                    if (firstClassify.data("add") != 1) {
                        firstClassify.prepend(filtrateFun.addFiltrateList());
                        filtrateFun.filterPro(proF.clickVal.filtrate.pClass[0])
                        firstClassify.data("add", 1);
                    }
                    break;
                case "priceList":
                    if(curBut.hasClass("open-select")){
                        curBut.find(".up").addClass("down")
                    }else{
                        curBut.find(".double").addClass("up").removeClass("double");
                    }
            }

            //判断是否打开
            if (open == 1) {
                curBut.data("open", 0);
                switch (dataId) {
                    case "sortList" :
                        curBut.removeClass("open-select");
                        break;
                    case "firstClassify":
                        $(".toolMenu").show();
                        $(".ev_t_top1").show();
                        $(".return_top").show();
                        $(".fixedNavBut").show();
                        $(".fixedShopCar").show();
                        break;
                }
                if(dataId!="firstClassify"){
                    wrap.animate({height: 0}, 300);
                }
                curBut.data("open", 0);
                wrap.animate(300, function () {
                    wrap.find("div.filtrate-list").hide();
                });
            } else {
                wrap.find("div.filtrate-list").hide().css({"left": 0});
                thirdClassify.data("open", 0);
                switch (dataId) {
                    case "firstClassify" :
                        wrap.prop("style","position: fixed;top: 0;bottom: 0;z-index: 2;background: rgba(0,0,0,0.5);");
                        firstClassify.show().animate({right:0},300);
                        $(".toolMenu").hide();
                        $(".ev_t_top1").hide();
                        $(".return_top").hide();
                        $(".fixedNavBut").hide();
                        $(".fixedShopCar").hide();
                        break;
                    case "sortList" :
                        sortList.show();
                        curBut.addClass("open-select");
                        break;
                }
                if(dataId!="firstClassify"){
                    wrap.css("display","block").animate({height: 330}, 300);
                }
                curBut.data("open", 1);
                // curBut.data("open",1).addClass("open-select");
                // curBut.siblings().data("open",0);
            }
        }
    }, "li");
    //给排序列表添加单击事件
    sortList.on({
        click: function () {
            var cLi = $(this),
                dataUrl = cLi.data("url"),
                dataId = cLi.data("id"),
                curVal = "";
            if (proF.clickVal.sort[0]) {
                curVal = proF.clickVal.sort[0];
            } else if (proF.getback.sort[0]) {
                curVal = proF.getback.sort[0];
            }
            if (curVal != dataId) {
                cLi.addClass("cur").siblings().removeClass("cur");
                proF.clickVal.sort[0] = dataId;
                window.location = dataUrl;
            }
        }
    }, "li,dt");
    //给筛选列表添加单击事件
    firstClassify.on('click', '.filter-con,.classify-but', function(e){
        e.stopPropagation();
    })
    firstClassify.on({
        click: function () {
            if(!$(this).hasClass("item")){
                var cLi = $(this),
                    cLip = cLi.parent(),
                    dataId = cLip.data("id"),
                    dataTarget = cLip.data("target"),
                    dataUrl = cLip.data("url");
                proF.filtrate.clickClass = dataId;
                if (!dataUrl) {
                    if (typeof(proF.filtrate[dataId]['sub']) == "object") {
                        secondClassify.html(filtrateFun.addFiltrateList(dataId));
                        $(".toolMenu").hide();
                        $(".ev_t_top1").hide();
                        // firstClassify.animate({right: "100%"}, 300);
                        secondClassify.css({"display": "block",}).animate({right: "0"}, 300);
                    }
                } else {
                    if (dataTarget == 2) {
                        window.open(dataUrl);
                    } else if (dataTarget == 1) {
                        window.location = dataUrl;
                    }
                }
            }else{
                var cLi = $(this),
                    dataId = cLi.data("id"),
                    dataUrl = cLi.data("url"),
                    dataTarget = cLi.data("target"),
                    curText = cLi.find("strong").text(),
                    bigVar = proF.filtrate.clickClass = cLi.parent().prev("dt").data("id"),
                    subJ = proF.filtrate[bigVar]['sub'][dataId]['sub'];
                if (proF.clickVal.filtrate[bigVar][0] != dataId) {
                    proF.clickVal.filtrate[bigVar][0] = dataId;
                    proF.clickVal.filtrate[bigVar][1] = "all";
                }else{
                    proF.clickVal.filtrate[bigVar][0] = '';
                    proF.clickVal.filtrate[bigVar][1] = "";
                }
                if (!dataUrl) {
                    // console.log(subJ);
                    if(cLi.hasClass('active')){
                        cLi.removeClass('active')
                    }else{
                        if (typeof(subJ) == "object") {
                            var dd = secondClassify.find("dd"),
                                t = cLi.index() * cLi.outerHeight(),
                                h = secondClassify.height(),
                                st = dd.scrollTop();
                            thirdClassify.html(filtrateFun.addFiltrateList(bigVar, dataId));
                            if (thirdClassify.data("open") != 1) {
                                thirdClassify.css({
                                    "display": "block",
                                    "right": "0"
                                }).animate({right: "0"}, 300, function () {
                                    thirdClassify.data("open", 1);
                                    secondClassify.find(".item").addClass("open");
                                });
    
                            }
                            dd.animate({scrollTop: t}, 300);
                        } 
                        cLi.addClass("active").siblings("").removeClass("active");
                        firstClassify.find(".item").each(function () {
                            var that = $(this);
                            if (that.data("id") == bigVar) {
                                that.find("b").text(curText);
                            }
                        })
                    }
                } else {
                    if (dataTarget == 2) {
                        window.open(dataUrl);
                    } else if (dataTarget == 1) {
                        window.location = dataUrl;
                    }
                }
                if(bigVar == 'pClass'){
                    filtrateFun.filterPro(dataId)
                }
            }
        }
    }, ".item,dt a");
    //给二级列表添加单击事件
    secondClassify.on({
        click: function (e) {
            e.stopPropagation();
            if($(this).hasClass("item")){
                var cLi = $(this),
                    dataId = cLi.data("id"),
                    dataUrl = cLi.data("url"),
                    dataTarget = cLi.data("target"),
                    curText = cLi.find("strong").text(),
                    bigVar = proF.filtrate.clickClass,
                    subJ = proF.filtrate[bigVar]['sub'][dataId]['sub'];
                if (proF.clickVal.filtrate[bigVar][0] != dataId) {
                    proF.clickVal.filtrate[bigVar][0] = dataId;
                    proF.clickVal.filtrate[bigVar][1] = "all";
                }
                firstClassify.find(".item").each(function () {
                    var that = $(this);
                    if(that.data("id")==dataId){
                        that.addClass("active");
                    }else{
                        that.removeClass("active");
                    }
                });
                if (!dataUrl) {
                    if (typeof(subJ) == "object") {
                        var dd = secondClassify.find("dd"),
                            t = cLi.index() * cLi.outerHeight(),
                            h = secondClassify.height(),
                            st = dd.scrollTop();
                        thirdClassify.html(filtrateFun.addFiltrateList(bigVar, dataId));
                        if (thirdClassify.data("open") != 1) {
                            thirdClassify.css({"display": "block"}).data("open", 1);
                        }
                        thirdClassify.animate({right: "0"}, 300);
                        cLi.addClass("cur").siblings().removeClass("cur");
                        dd.animate({scrollTop: t}, 300);
                    } else {
                        cLi.addClass("cur").siblings().removeClass("cur");
                        secondClassify.animate({right: "-100%"}, 300);
                        // thirdClassify.animate({right: "0"}, 300).data("open", 0);
                    }
                } else {
                    if (dataTarget == 2) {
                        window.open(dataUrl);
                    } else if (dataTarget == 1) {
                        window.location = dataUrl;
                    }
                }
            }else{
                secondClassify.animate({right: "-100%"}, 300);
            }
        }
    }, ".item,a");
    //给三级列表添加单击事件
    thirdClassify.on({
        click: function (e) {
            e.stopPropagation();
            if($(this).hasClass("item")){
                var cLi = $(this),
                    curText = cLi.find("strong").text(),
                    dataId = cLi.data("id"),
                    dataUrl = cLi.data("url"),
                    bigVar = proF.filtrate.clickClass,
                    dataTarget = cLi.data("target");
                cLi.addClass("cur").siblings().removeClass("cur");

                proF.clickVal.filtrate[bigVar][1] = dataId;
                if (!dataUrl) {
                    if (dataId == "all") {
                        if (proF.clickVal.filtrate[bigVar][0]) {
                            var l_big_id = proF.clickVal.filtrate[bigVar][0];
                            curText = proF.filtrate[bigVar]['sub'][l_big_id]["name"];
                        }
                    }
                    // firstClassify.animate({right: "100%"}, 300);
                    secondClassify.animate({right: "-100%"}, 300);
                    thirdClassify.animate({right: "-100%"}, 300, function () {
                        thirdClassify.data("open", 0);
                        secondClassify.find("dd").removeClass("open");
                    });
                    firstClassify.find("dd").each(function () {
                        var that = $(this);
                        if (that.data("id") == bigVar) {
                            that.find("b").text(curText);
                        }
                    })
                } else {
                    if (dataTarget == 2) {
                        window.open(dataUrl);
                    } else if (dataTarget == 1) {
                        window.location = dataUrl;
                    }
                }
            }else if($(this).hasClass("ok-btn")){
                thirdClassify.animate({right: "-100%"}, 300);
                secondClassify.animate({right: "-100%"}, 300);
                thirdClassify.data("open", 0);
            }else{
                thirdClassify.animate({right: "-100%"}, 300);
                thirdClassify.data("open", 0);
                // firstClassify.animate({right: "-0%"}, 300);
            }
        }
    }, ".item,a")
    //重置按钮绑定事件
    resetBut.on({
        click: function () {
            var chooseUrl = $("#choose_url").val();
            chooseUrl = changeURLArg(chooseUrl, 'status', 0);
            chooseUrl = changeURLArg(chooseUrl, 'price', 0);
            chooseUrl = changeURLArg(chooseUrl, 'manu_id', 0);
            $("#choose_url").val(chooseUrl);
            for (x in proF.clickVal.filtrate) {
                if (x != "clickClass" && x != 'u_u_id') {
                    for (var i = 0; i < proF.clickVal.filtrate[x].length; i++) {
                        proF.clickVal.filtrate[x][i] = "";
                    }
                }
            }
            firstClassify.find(".item").each(function () {
                $(this).find("b").text($weisiteLa.QuBu);
            });
            enterBut.trigger('click')
        }
    });
    //确定按钮绑定事件
    enterBut.on({
        'click': function () {
            var k;
            var tmpParam = '?style=' + proF.pStyle;
            var tmpId = sub_id = big_id = 0;
            var orderStyle = parseInt(proF.getback.sort);
            orderStyle = isNaN(orderStyle) ? 0 : orderStyle - 1;
            var sortArr = ['default', 'bid', '_bid'];
            var chooseUrl = $("#choose_url").val();
            var isShai = 0;
            // if(sortArr[orderStyle]){
            //  tmpParam  += '&sort='+sortArr[orderStyle];
            // }
            // if (proF.clickVal.filtrate.u_u_id) {
            //  tmpParam  += '&u_u_id='+proF.clickVal.filtrate.u_u_id;
            // }
            for (k in proF.clickVal.filtrate) {
                if (k != "clickClass") {
                    if (proF.clickVal.filtrate[k][0] != 0) {
                        if (typeof proF.clickVal.filtrate[k][0] == 'string') {
                            proF.clickVal.filtrate[k][0];
                        }
                        if (isNaN(proF.clickVal.filtrate[k][0])) {
                            var tmpId_arr = proF.clickVal.filtrate[k][0].split('p_');
                            tmpId = tmpId_arr[1];
                        } else {
                            tmpId = parseInt(proF.clickVal.filtrate[k][0]);
                        }


                        tmpId = isNaN(tmpId) ? 0 : tmpId;
                        if (tmpId) {
                            isShai = 1;
                        }
                        if (k == 'pClass') {
                            big_id = isNaN(tmpId) ? 0 : tmpId;
                            proF.clickVal.filtrate[k][1];
                            if (isNaN(proF.clickVal.filtrate[k][1])) {
                                var subId_arr = proF.clickVal.filtrate[k][1].split('p_');
                                var sub_id = subId_arr[1];
                            } else {
                                var sub_id = parseInt(proF.clickVal.filtrate[k][1]);
                            }
                            //var sub_id = parseInt(proF.clickVal.filtrate[k][1]);
                            sub_id = isNaN(sub_id) ? 0 : sub_id;
                        } else if (k == 'pBrand') {
                            // tmpParam += '&manu_id='+tmpId;
                            if (chooseUrl.indexOf('manu_id') >= 0) {
                                chooseUrl = changeURLArg(chooseUrl, 'manu_id', tmpId);
                            } else {
                                chooseUrl = chooseUrl + '&manu_id=' + tmpId;
                            }
                        } else if (k == 'pPrice') {
                            // tmpParam += '&price='+tmpId ;
                            if (chooseUrl.indexOf('price') >= 0) {
                                chooseUrl = changeURLArg(chooseUrl, 'price', tmpId);
                            } else {
                                chooseUrl = chooseUrl + '&price=' + tmpId;
                            }
                        } else if (k == 'pState') {
                            // tmpParam += '&status='+tmpId ;
                            if (chooseUrl.indexOf('status') >= 0) {
                                chooseUrl = changeURLArg(chooseUrl, 'status', tmpId);
                            } else {
                                chooseUrl = chooseUrl + '&status=' + tmpId;
                            }
                        }
                    }
                }
            }
            //筛选显示被选中状态
            if (chooseUrl.indexOf('isShai') >= 0) {
                chooseUrl = changeURLArg(chooseUrl, 'isShai', isShai);
            } else {
                chooseUrl = chooseUrl + '&isShai=' + isShai;
            }
            var url = "/" + proF.username + "/wap_pro/" + proF.channel_id + "_" + big_id + "_" + sub_id + "_0.html" + chooseUrl;
            location.href = url;
        }
    });

    // 价格-规格选择
    $(".priceC").on("click", "dd", function () {
        $(this).addClass("cur").siblings().removeClass("cur");
        /*if($(this).hasClass("cur")){
            $(this).find("input").attr("checked",false);
            $(this).removeClass("cur");
        }else if($(this).siblings().hasClass("cur")){
            alert("只能选择一个");
        }else{
            $(this).find("input").attr("checked",true);
            $(this).addClass("cur");
        }*/
        /*if($(this).hasClass("cur")){
            $(this).find("input").attr("checked",false);
            $(this).removeClass("cur");
        }else{
            $(this).find("input").attr("checked",true);
            $(this).addClass("cur");
        }*/
    })

    // 价格-确定
    $(".okBtn").click(function () {
        var dataVal = "",
            dataId = "",
            dataGuiGe = "",
            textCur = $(".priceC .cur"),
            titId = $(".priceTit .cur"),
            localUrl = $("#re_url").val();
        // if(textCur.length){
        $(".priceC dl").each(function () {
            var t = $(this);
            if (t.css('display') == 'block') {
                $(this).find('dd').each(function () {
                    dataGuiGe = $(this).parent('dl').attr("data-id");
                    if ($(this).hasClass("cur")) {
                        dataId += $(this).attr("data-id") + ",";
                        if (dataVal == '') {
                            dataVal += $(this).attr("data-val");
                        } else {
                            dataVal += "," + $(this).attr("data-val");
                        }
                    } else {
                        dataId += '';
                    }
                });
            }
        });
        if (dataId) {
            dataId = dataId.substring(0, dataId.length - 1);
        }
        if (localUrl.indexOf('guige_' + dataGuiGe) >= 0) {
            localUrl = changeURLArg(localUrl, 'guige_' + dataGuiGe, dataId);
        } else {
            localUrl = localUrl + '&guige_' + dataGuiGe + '=' + dataId;
        }
        $(".priceInfo").hide();
        $("#priceList li").removeClass("cur");
        window.location.href = localUrl;
        // } else {
        //  alert('请选择相应的规格参数');
        //  return false;
        // }
    });

    // 价格-重置
    $(".resetBtn").click(function () {
        $(".priceC dl").each(function () {
            var m = $(this);
            if (m.css('display') == 'block') {
                $(this).find('dd').removeClass('cur');
                $(this).find('input').attr('checked', false);
            }
        });
        $(".okBtn").trigger('click')
    });

    /*
    * url 目标url
    * arg 需要替换的参数名称
    * arg_val 替换后的参数的值
    * return url 参数替换后的url
    */
    function changeURLArg(url, arg, arg_val) {
        var pattern = arg + '=([^&]*)';
        var replaceText = arg + '=' + arg_val;
        if (url.match(pattern)) {
            var tmp = '/(' + arg + '=)([^&]*)/gi';
            tmp = url.replace(eval(tmp), replaceText);
            return tmp;
        } else {
            if (url.match('[\?]')) {
                return url + '&' + replaceText;
            } else {
                return url + '?' + replaceText;
            }
        }
        return url + '\n' + arg + '\n' + arg_val;
    }

    //更改检索名称
    if ($("#choose_url")) {
        var chooseUrl = $("#choose_url").val();
        if (chooseUrl) {
            if (chooseUrl.match('sort=bid')) {
                $("#filtrateBut .sortList").find('strong').html($weisiteLa.XinPing);
            } else if (chooseUrl.match('sort=_bid')) {
                $("#filtrateBut .sortList").find('strong').html($weisiteLa.PingLun);
            } else if (chooseUrl.match('sort=default')) {
                $("#filtrateBut .sortList").find('strong').html($weisiteLa.ZongHe);
            }
        }
    }
});
