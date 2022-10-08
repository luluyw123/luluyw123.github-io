
/*
* @Author: yiruili
* @Date:   2018-07-18 10:00:57
* 访客统计
*/
$(function () {
    !function () {
        var SiteStatsSign = readCookie("SiteStatsSignKey");
        if (!SiteStatsSign) {
            writeCookie(
                "SiteStatsSignKey", 
                hex_md5(user_name + (new Date()).valueOf() + GetRandomNum(10000, 99999)), 
                24 * 365
            );
            SiteStatsSign = readCookie("SiteStatsSignKey");
        }

        // IP, PV, 独立访客
        siteStatsResponse("/Public/UserOperate.php", {
            username: user_name,
            rid: 1,
            mobile: $('script#SiteStats').data("val") == 1 ? 1 : 0,
            type: 1,
            opt: 'ipv',
            SiteStatsSign: SiteStatsSign,
            t: Date.parse(new Date())
        });

        function siteStatsResponse (u, data, func) {
            $.ajax({
                url: u,
                type: 'POST',
                dataType: 'json',
                async: true,
                data: data,
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success: function (res) {
                    typeof func === "function" && func(data);
                }
            });
        }

        function GetRandomNum (Min, Max) {   
            var Range = Max - Min;
            var Rand = Math.random();
            // return Min + Math.round(Rand * Range);
            return Math.floor(Math.random() * (Max - Min) + Min) ;
        }
    }();
});