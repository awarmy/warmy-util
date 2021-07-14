(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.WlocalStorage = factory());
}(this, function () {
    'use strict';

    var pre = "";
    var ls;

    var WlocalStorage = function WlocalStorage(global, preKey) {
        'use strict';
        if (preKey) {
            pre = preKey;
        }
        if (typeof global !== 'object') {
            console.log('第一个参数必须是window对象')
        }
        this._init(global)

    }
    WlocalStorage.prototype._init = function (global) {
        'use strict';
        if ('localStorage' in global) {
            ls = global.localStorage;
        }
        else {
            ls = {
                getItem: function (key) {
                    var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
                    if (arr != null) return unescape(arr[2]);
                    return null;
                },
                setItem: function (key, value, expiredays) {
                    expiredays || (expiredays = 365);
                    var exdate = new Date()
                    exdate.setDate(exdate.getDate() + expiredays)
                    document.cookie = key + "=" + escape(value) +
                        (";expires=" + exdate.toGMTString());
                },
                removeItem: function (key) {
                    this.setItem(key, "", -1);
                },
                clear: function () {
                    //待续
                }
            }
        }
    }

    function parse_arg(arg) {
        if (arg.length == 1) {
            return { rid: arg[0], prev: pre }
        }
        else {
            return { rid: arg[1], prev: arg[0] }
        }
    }

    WlocalStorage.prototype.set = function () {
        var { rid, prev } = parse_arg(arguments);
        ls.setItem(prev + rid, rid);
    }
    WlocalStorage.prototype.exists = function (rid) {
        return this.get(rid) === null ? false : true;
    }
    WlocalStorage.prototype.get = function () {
        var { rid, prev } = parse_arg(arguments);
        return ls.getItem(prev + rid);
    }
    WlocalStorage.prototype.remove = function (rid) {
        var { rid, prev } = parse_arg(arguments);
        ls.removeItem(prev + rid);
    }
    return WlocalStorage
}));
