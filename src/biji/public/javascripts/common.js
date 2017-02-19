    var restful = {
        put: function (url, model, options) {
            opts = $.extend({}, {
                async: false,
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                url: url,
                data: JSON.stringify(model)
            }, options || {});
            return jQuery.ajax(opts);
        },
        post: function (url, model, options) {
            var opts = $.extend({}, {
                async: false,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                url: url,
                data: JSON.stringify(model)
            }, options || {});
            return jQuery.ajax(opts);
        },
        get: function (url, options) {
            var opts = $.extend({}, {
                async: false,
                type: 'GET',
                dataType: 'json',
                url: url
            }, options || {});
            return jQuery.ajax(opts);
        },
        getForIE: function (url, options) {
            var opts = $.extend({}, {
                async: false,
                cache: false,
                type: 'GET',
                dataType: 'json',
                url: url
            }, options || {});
            return jQuery.ajax(opts);
        },
        destroy: function (url, options) {
            var opts = $.extend({}, {
                async: false,
                type: 'DELETE',
                dataType: 'text',
                url: url
            }, options || {});
            return jQuery.ajax(opts);
        },
        batchDestroy: function (url, model) {
            var options = {};
            options = $.extend(options || {}, {
                async: false,
                type: 'DELETE',
                dataType: 'text',
                contentType: 'application/json',
                url: url,
                data: JSON.stringify(model)
            });
            return jQuery.ajax(options);
        },
        asyncPut: function (url, model, options) {
            opts = $.extend({}, {
                async: true,
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                url: url,
                data: JSON.stringify(model)
            }, options || {});
            return jQuery.ajax(opts);
        },
        asyncPost: function (url, model, options) {
            var opts = $.extend({}, {
                async: true,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                url: url,
                data: JSON.stringify(model)
            }, options || {});
            return jQuery.ajax(opts);
        },
        asyncGet: function (url, options) {
            var opts = $.extend({}, {
                async: true,
                type: 'GET',
                dataType: 'json',
                url: url
            }, options || {});
            return jQuery.ajax(opts);
        }

    };
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.format = function(fmt)
    { //author: meizz
      var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
      for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      return fmt;
    }



    //回到顶部
    var toHeadArrow = $("#toHeadArrow");
    toHeadArrow.hide();
    $(window).bind("scroll", function() {
          var st = $(document).scrollTop(), winh = $(window).height();
          (st > 0)? toHeadArrow.show(): toHeadArrow.hide();
      });
    toHeadArrow.click(function(){
        $("html, body").animate({ scrollTop: 0 }, 120);
    });
