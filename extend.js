(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.wextend = factory());
}(this, function () {
    'use strict';
    function extend(subClass, superClass) {
        'use strict';
        var F = function () { };
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;

        subClass.superClass = superClass.prototype;
        //修正原型的constructor指向
        // if (!superClass.prototype.contrucotor == Object.prototype.constructor) {
        //     superClass.prototype.constructor = superClass;
        // }
    }
    return extend;
}));