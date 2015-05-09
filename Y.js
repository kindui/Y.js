/* Y.js - v1.0.0 - http://www.cnblogs.com/human - 2013-09-08 huang jun hua*/
/**
 * Author: humanhuang
 * Date: 13-8-17
 */

(function () {


    function c(msg) {
        console.log(msg);
    }

    Y.c = c;
    Y.version = '1.0.0';
    Y.released = '2013-09-08';

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
        },
        forEach: function (arr, func) {
            for (var i = 0, l = arr.length; i < l; i++) {
                func.call(arr[i], arr[i], i);
            }
        },
        clone: function (obj) {
            var o;
            if (typeof obj == "object") {
                if (obj === null) {
                    o = null;
                } else {
                    //array
                    if (obj instanceof Array) {
                        o = [];
                        for (var i = 0, len = obj.length; i < len; i++) {
                            o.push(clone(obj[i]));
                        }
                        //date
                    } else if (Object.prototype.toString.call(obj) == "[object Date]") {
                        return new Date(obj.toString());
                    } else {
                        //object
                        o = {};
                        for (var k in obj) {
                            o[k] = clone(obj[k]);
                        }
                    }
                }
            } else {
                o = obj;
            }
            return o;
        }
    });

    init.prototype = Y.fn = Y.prototype;
    window.Y = Y;
})();
/**
 * User: humanhuang
 * Date: 13-8-7
 */
(function (Y) {

    var ua = navigator.userAgent.toLowerCase();

    var check = function (r) {
        return r.test(ua);
    }

    Y.mix(Y, {
        browser: {

            isOpera: function () {
                return check(/opera/)
            },
            isIE: function () {
                return !this.isOpera() && check(/msie/)
            },
            isWin: function () {
                return check(/windows|win32/)
            },
            isFirefox: function () {
                return check(/firefox/);
            },
            isChrome: function () {
                return check(/chrome/);
            }
        }
    });
})(Y);
/**
 * User: humanhuang
 * Date: 13-8-7
 */
(function (Y) {

    Y.mix(Y, {
        trim: function (text) {
            return (text || "").replace(/^\s+|\s+$/g, "");
        },
        inArray: function (elem, array) {
            for (var i = 0, length = array.length; i < length; i++)
                if (array[i] == elem)
                    return i;
            return -1;
        },
        /**
         * 过滤数组,选出符合条件的值
         * @param arr
         * @param callback
         * @returns {Array}
         */
        grep: function (arr, callback) {
            var ret = [];
            for (var i = 0, length = arr.length; i < length; i++) {
                if(callback.call(arr[i],arr[i], i)){
                    ret.push(arr[i]);
                }
            }
            return ret;
        },
        /**
         * 产生新数组
         * @param arr
         * @param callback
         * @returns {Array}
         */
        map:function(arr,callback){
            var ret = [];
            for (var i = 0, length = arr.length; i < length; i++) {
                ret.push( callback.call(arr[i],arr[i], i));
            }
            return ret;
        },
        /**
         * 模版替换方法
         * 支持 <#=name#>
         *
         *     <#=i>0?i:"nima"#>
         *
         *     <# for (var s =0;s<10;s++) { #>
         *          <p><#=s #></p>
         *      <# } #>
         *
         *    <# if (i<0) { #>
         *         niba
         *      <# }else{ #>
         *          nima
         *      <# } #>
         * @param str
         * @param data
         */
        tpl:function(str,data){
            var f =   new Function("obj",
                "var p=[];"+
                    "with(obj){p.push('" +
                    str .replace(/\'/g,"\\'")
                        .replace(/[\r\t\n]/g, " ")
                        .split("<#").join("\t")
                        .replace(/\t=(.*?)#>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("#>").join("p.push('")
                    + "');}return p.join('');");
            return f(data);
        }

    });
})(Y);
/**
 * User: humanhuang
 * Date: 13-8-7
 */
(function (Y) {

    Y.mix(Y.fn, {
        addClass: function (classname) {
            return this.each(function (dom) {
                var classNames = dom.className.replace(/\s{2,}/g, ' ').replace(/(^\s*)|(\s$)/g, '');

                if (classNames.indexOf(classname) > -1) {
                    return this;
                }
                var newClassNames = classNames + " " + classname;
                dom.className = newClassNames;
            });
        },
        hasClass: function (classname) {
            return  this[0].className.indexOf(classname) > -1 ? true : false;
        },
        removeClass: function (classname) {
            return this.each(function (dom) {
                var newClassNames = dom.className.replace(classname, "");
                dom.className = newClassNames;
            });
        },
        css: function (obj, val) {
            this.each(function (dom) {
                if (Y.isString(obj)) {

                    obj = obj.replace(/-(\w)/g, function (a, b) {
                        return b.toUpperCase();
                    });

                    dom.style[obj] = val;

                } else if (Y.isObject(obj)) {
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            dom.style[i] = obj[i];
                        }
                    }
                }
            });
            return this;
        },


        attr: function (name, val) {
            this.each(function (dom) {
                if (Y.isUndefined(val)) {
                    return dom.getAttribute(name);
                } else {
                    dom.setAttribute(name, val);
                }
            });
            return this;
        },

        show: function () {
            this.each(function (dom) {
                if (dom['_display']) {
                    dom.style.display = dom['_display'];
                } else {
                    dom.style.display = '';
                }
            });
            return this;
        },
        hide: function () {
            this.each(function (dom) {
                dom['_display'] = dom.style.display;
                dom.style.display = 'none';
            });
            return this;
        },

        html: function (text) {
            var dom = this[0];
                if (text) {
                    dom.innerHTML = text;
                    return this;
                } else {
                    return   dom.innerHTML;
                }
        },
        append: function (dom) {
            this[0].appendChild(dom);
            return this;
        },
        appendTo: function (dom) {
            dom.appendChild(this[0]);
            return this;
        },
        remove: function () {
            this.each(function (dom) {
                dom.remove();
            });
            return this;
        },
        after: function (dom) {
            this[0].nextSibling ? this[0].parentNode.insertBefore(dom, this[0].nextSibling) :
                this[0].parentNode.appendChild(dom);
            return this;
        },
        before: function (dom) {
            this[0].parentNode.insertBefore(dom, this[0]);
            return this;
        },
        next: function () {
            var next = this[0].nextSibling;
            while (next.nodeType != 1) {
                next = next.nextSibling;
            }
            return Y(next);
        },
        /**
         * 获取元素的基于文档的位置
         * @returns {{top: number, left: number}}
         */
        offset: function () {
            var element = this[0];
            var actualTop = element.offsetTop,
                actualLeft = element.offsetLeft,
                current = element.offsetParent;

            while (current !== null) {
                actualTop += current.offsetTop;
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            return {
                "top": actualTop,
                "left": actualLeft
            }
        },

        /**
         * 获取元素基于fixed屏幕绝对位置
         * @returns {{top: number, left: number}}
         */
        position: function () {
            var element = this[0];
            var actualTop = element.offsetTop,
                actualLeft = element.offsetLeft,
                current = element.offsetParent;

            while (current !== null) {
                actualTop += current.offsetTop;
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }

            var elementScrollTop = document.body.scrollTop,
                elementScrollLeft = document.body.scrollLeft;


            return {
                "top": actualTop - elementScrollTop,
                "left": actualLeft - elementScrollLeft
            }
        }

    });
})(Y);
/**
 * User: humanhuang
 * Date: 13-8-7
 */
(function (Y) {

    function formatEvent(oEvent) {
        if (Y.browser.isIE()) {
            oEvent = oEvent || window.event;
            oEvent.eventPhase = 2;  //ie中没有eventPhase这个属性
            oEvent.isChar = (oEvent.charCode > 0);
            oEvent.pageX = oEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            oEvent.pageY = oEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;


            oEvent.preventDefault = function () {
                this.returnValue = false;
            }
            oEvent.stopPropagation = function () {
                this.cancelBubble = true;
            }


            if (oEvent.type == "mouseout") {
                oEvent.relatedTarget = oEvent.toElement;
            } else if (oEvent.type == "mouseover") {
                oEvent.relatedTarget = oEvent.fromElement;
            }

            oEvent.target = oEvent.srcElement;
            oEvent.timestamp = (new Date()).getTime();
        }

        if (Y.browser.isFirefox()) {
            if (oEvent.type === "DOMMouseScroll") {
                e.wheelDelta = -oEvent.detail * 40;
            }
        }
        return oEvent;
    }

    Y.mix(Y.fn, {
        on: function (eventType, callback) {
            this.each(function (dom) {
                if (dom.addEventListener) {
                    dom.addEventListener(eventType, function (e) {
                        var event = formatEvent(e);
                        callback.call(this,event);
                    }, false);
                    return this;
                } else if (dom.attacheEvent) {
                    dom.attachEvent("on" + eventType, function (e) {
                        var event = formatEvent(e);
                        callback.call(this,event);
                    });
                } else {
                    dom["on" + eventType] = function (e) {
                        var event = formatEvent(e);
                        callback.call(this,event);
                    }
                }
            });
            return this;
        }
    });
})(Y);
/**
 * Author: humanhuang
 * Date: 13-8-18
 */
(function (Y) {

    function Ajax(options) {
        this.url = options.url;
        var data = options.data;
        if (Y.isObject(data)) {
            var queryData = [];
            for (var i  in data) {
                queryData.push(i + "=" + data[i]);
            }
            data = queryData.join("&");
        }

        this.data = data || "";

        this.XMLHTTP = this.getXMLRequest();
        this.success = options.success;
        this.error = options.error;
        this.method = options.method || "get";
        this.dataType = options.dataType || "json";
    }

    Ajax.prototype = {
        constructor: Ajax,
        start: function () {
            if (this.dataType === "jsonp") {
                this.requestJsonp();
            } else {
                this.request(this.method);
            }

        },
        getXMLRequest: function () {
            var xmlhttp = null;
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
                //针对某些特定版本的Mozillar浏览器的BUG进行修正
                if (xmlhttp.overrideMimeType) {
                    xmlhttp.overrideMimeType("text/xml");
                }

            } else if (window.ActiveXObject) {
                var activexName = ['MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
                for (var i = 0; i < activexName.length; i++) {
                    try {
                        xmlhttp = new ActiveXObject(activexName[i]);
                        break;
                    } catch (e) {
                    }
                }
            }
            return xmlhttp;
        },
        request: function (method) {
            var _this = this,
                resText,
                URL = _this.url,
                xmlHttp = _this.XMLHTTP,
                queryString = _this.data + "&timestamp=" + new Date().getTime();
            method = this.method.toLocaleUpperCase();
            if (method === 'GET') {
                method = "GET";
                URL = _this.url + '?' + queryString;
                queryString = null;
            } else {
                method = "POST";
            }
            xmlHttp.open(method, URL, true);
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status >= 200 && xmlHttp.status < 300 || xmlHttp.status == 304) {
                        resText = xmlHttp.responseText;

                        if (_this.dataType === "json") {
                            if (window.JSON) {
                                resText = JSON.parse(resText);
                            } else {
                                resText = (new Function('return ' + resText))();
                            }

                        } else if (_this.dataType === "jsonp") {

                        } else if (_this.dataType === 'xml') {
                            resText = xmlHttp.responseXML;
                        }
                        _this.success.call(_this, resText);
                    } else {
                        _this.error.call(_this, xmlHttp.responseText);
                    }
                }
            };
            if (method === "POST") {
                xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            xmlHttp.send(queryString);
        },
        requestJsonp: function () {
            var _this = this;
            var timestamp = "Y"+new Date() * 1;
            url = this.url;
            window[timestamp] = function (data) {
                _this.success(data);
                window[timestamp] = null;
            }
            url += (url.indexOf("?") > -1 ? "&callback=" + timestamp : "?callback=" + timestamp);
            Y.loadScript(url);
        }
    }


    Y.mix(Y, {
        /**
         * 加载js,或者css执行回调函数
         * @param url
         * @param callback
         */
        loadScript: function (url, callback) {
            var f = arguments.callee;

            //创建队列
            if (!("queue" in f)) {
                f.queue = {};
            }

            var queue = f.queue;

            if (url in queue) {
                if (callback) {
                    if (queue[url]) { //正在加载
                        queue[url].push(callback);
                    }
                    else { // 已经加载了
                        callback();
                    }
                }
                return;
            }

            queue[url] = callback ? [callback] : [];

            var script = document.createElement("script");
            script.type = "text/javascript";

            //加载完成的回调
            script.onload = script.onreadystatechange = function () {

                if (script.readyState && script.readyState != "loaded" && script.readyState != "complete") {
                    return;
                } else {
                    script.onreadystatechange = script.onload = null;
                    while (queue[url].length) {
                        queue[url].shift()();
                    }
                    queue[url] = null;
                }
        }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        },
        ajax: function (options) {
            new Ajax(options).start();
        },
        get: function (url, data, callback) {
            if (Y.isFunction(data)) {
                callback = data;
                data = null;
            }
            new Ajax({
                url: url,
                data: data,
                success: callback,
                type: "get"
            }).start();
        },
        post: function (url, data, callback) {
            if (Y.isFunction(data)) {
                callback = data;
                data = null;
            }
            new Ajax({
                url: url,
                data: data,
                success: callback,
                type: "post"
            }).start();
        }

    });
})(Y);
/**
 * User: humanhuang
 * Date: 13-8-7
 */
(function (Y) {
    Y.mix(Y, {

        date:{
            /**
             *  eg: Y.dateFormat(new Date(),"YY年MM月dd日 hh:mm ss");
             *  Y.dateFormat(new Date(),"YYYY年MM月dd日 hh:mm ss");
             * @param d 时间new Date()对象
             * @param pStr 匹配字符串
             * @returns {*}
             */
            format: function (d, pStr) {
                var map ={
                    "YYYY": d.getFullYear(),
                    "YY": d.getFullYear().toString().substring(2),
                    "MM": d.getMonth()+1,
                    "dd": d.getDate(),

                    "hh": d.getHours(),
                    "mm": d.getMinutes(),
                    "ss": d.getSeconds()
                }

                for(var i in map){
                    pStr = pStr.replace(new RegExp(i), function(r){
                        var t = map[i].toString();
                        return  t.length===1?"0"+t : t;
                    });
                }
                return pStr;
            }
        }
    });
})(Y);
/**
 * Author: humanhuang
 * Date: 13-9-3
 */
!function(Y){
    var cookie = {
        set: function(name, value, options){
            options = options || {};
            if(!value){
                document.cookie = [name, '=', encodeURIComponent(value),';expires=-1'].join('');
                return false;
            }
            var date = options.day? ';expires='+option.date.toGTMString() :'';
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure': '';
            document.cookie = [name, '=', encodeURIComponent(value), date, path, domain, secure].join('');
        },
        /**
         * 获取cookie
         * @param  {String} name cookie名
         * @return {String}
         */
        get: function(c_name){
            if (document.cookie.length>0)
            {
                var c_start=document.cookie.indexOf(c_name + "=")
                if (c_start!=-1)
                {
                    c_start=c_start + c_name.length+1
                    var c_end=document.cookie.indexOf(";",c_start)
                    if (c_end==-1) c_end=document.cookie.length
                    return unescape(document.cookie.substring(c_start,c_end))
                }
            }
            return ""
        },
        remove: function(name){
            cookie.set(name, null);
        }
    }
    Y.mix(Y, {
        cookie: function (name, value, options){
            if (value) {
                cookie.set(name, value, options);
            }else{
                return cookie.get(name);
            }
        },
        removeCookie: function(name){
            cookie.remove(name);
        }
    });

}(Y);