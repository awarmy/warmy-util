(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.WvirtualPath = factory());
}(this, function () {
    'use strict';
    function WvirtualPath(filename) {
        return (function () {
            'use strict';

            // in Node things are rather simple
            if (typeof __dirname !== 'undefined') {
                return __dirname;
            }

            // we can only run this test in the browser,
            // so make sure we actually have a DOM to work with.
            if (typeof document === 'undefined' || !document.getElementsByTagName) {
                return null;
            }
            // http://www.2ality.com/2014/05/current-script.html
            var currentScript = document.currentScript || (function () {
                var scripts = document.getElementsByTagName('script');
                return scripts[scripts.length - 1];
            })();
            var path = currentScript && currentScript.src;
            if (!path) {
                return null;
            }
            var arr = path.split("/");
            arr.splice(arr.length - 1, 1);
            return arr.join('/');

        })() || '.';
    }
    return WvirtualPath;
}));