/**
 * Author: humanhuang
 * Date: 13-9-29
 */
(function (Y) {

    var ret = {
        trim: function (text) {
            return (text || "").replace(/^\s+|\s+$/g, "");
        }
    }

    Y.mix(Y, ret);

    //绑定到原生String方法
    Y.bind2Prototype(String.prototype, ret);

})(Y);