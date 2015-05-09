/**
 * Author: humanhuang
 * Date: 13-8-17
 */

(function () {


    function c(msg) {
        console.log(msg);
    }

    Y.c = c;
    Y.version = '@VERSION';
    Y.released = '@RELEASED';

    function isType(type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) == "[object " + type + "]";
        }
    }

    /**
     * 类型判断
     * @type {*}
     */
    Y.isString = isType('String');
    Y.isObject = isType('Object');
    Y.isString = isType('String');
    Y.isNumber = isType('Number');
    Y.isArray = isType('Array');
    Y.isFunction = isType('Function');
    Y.isNull = function (obj) {
        return obj === null;
    }
    Y.isUndefined = function (obj) {
        return obj === void 0;
    }
    Y.isElement = function (obj) {
        return !!obj && obj.nodeType === 1;
    }


    //产生ym数组
    function makeymArray(arr) {
        var a = [];

        if (arr.length == 1) {
            return new init(arr[0]);
        }

        for (var i = 0, len = arr.length; i < len; i++) {
            a[i] = new init(arr[i]);
        }
        return a;
    }

    //产生真实数组
    function makeArray(arr) {

        if (arr.length == 1) {
            return arr[0];
        }
        try {
            return Array.prototype.slice.call(arr);
        } catch (e) {
            //如果是IE
            var a = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                a[i] = arr[i];
            }
            return a;
        }

    }


    //构造函数
    function Y(selector) {
        return new init(selector);
    }

    function init(selector) {


        if (selector["type"] === "Y") {
            return selector;
        }
        // selector为DOM节点、window、document、document.documentElement
        if (selector.nodeType && (typeof selector === 'object' || 'setInterval' in selector)) {
            this[0] = selector;
            this.length = 1;
            this.type = "Y";
            return this;
        }

        var doms = document.querySelectorAll(selector);
        if (!doms.length) {
            throw new Error("选择的dom为空");
        }

        this[0] = makeArray(doms);

        if (doms.length !== 1) {
            this.doms = makeymArray(doms);
        }

        this.length = doms.length;
        this.type = "Y";
        return this;
    }

    /**
     * 合并
     * @param src
     * @param target
     */
    Y.mix = function (src, target) {
        for (var i in target) {
            if (target.hasOwnProperty(i)) {
                src[i] = target[i];
            }
        }
        return src;
    }

    Y.prototype = {
        each: function (callback) {
            var dom = this[0];
            if (!dom.length) {
                callback.call(dom, dom, 0);
            }

            for (var i = 0, len = dom.length; i < len; i++) {
                callback.call(this[i], dom[i], i);
            }
            return this;
        }
    }

    Y.mix(Y, {
        ready: function (callback) {
            if (window.onload) {
                var _onload = window.onload;
                window.onload = function () {
                    _onload();
                    callback();
                }
            }
            window.onload = callback;
        }
    });

    init.prototype = Y.fn = Y.prototype;
    window.Y = Y;
})();