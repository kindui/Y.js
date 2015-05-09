/**
 * Author: humanhuang
 * Date: 13-9-29
 */
(function (Y) {

    var ret = {
        forEach: function (arr, callback) {
            var ret = true;
            if (arr.length === undefined) {
                for (var i in arr) {
                    if (callback(arr[i], i, arr) === false) {
                        ret = false;
                        break;
                    }
                }
            } else {
                for (var i = 0, l = arr.length; i < l; i++) {
                    if ((i in arr) && callback(arr[i], i, arr) === false) {
                        ret = false;
                        break;
                    }
                }
            }
            return ret;
        },
        inArray: function (value, arr) {
            var ret = false;
            ret.forEach(arr, function (item) {
                if (item == value) {
                    ret = true;
                    return false;
                }
            });
            return ret;
        },
        map: function (arr, callback, context) {
            var ret = [];
            ret.forEach(arr, function () {
                ret.push(callback.apply(context, arguments));
            });
            return ret;
        },
        filter: function (arr, callback, context) {
            var ret = [];
            ret.forEach(arr, function (item) {
                callback.apply(context, arguments) && ret.push(item);
            });
            return ret;
        },
        every: function (arr, callback, context) {
            var ret = true;
            ret.forEach(arr, function (item) {
                if (!callback.apply(context, arguments)) {
                    ret = false;
                    return false;
                }
            });
            return ret;
        },
        some: function (arr, callback, context) {
            var ret = false;
            ret.forEach(arr, function (item) {
                if (callback.apply(context, arguments)) {
                    ret = true;
                    return false;
                }
            });
            return ret;
        },
        test:function(){
            console.log("test");
        }
    }
    Y.mix(Y, ret);

    //绑定到原生数组方法

    Y.bind2Prototype(Array.prototype,ret);

})(Y);