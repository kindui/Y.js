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