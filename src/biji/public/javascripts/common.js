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
        }
    };