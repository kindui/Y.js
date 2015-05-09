/**
 * User: humanhuang
 * Date: 13-8-7
 */
(function (Y) {

    Y.mix(Y, {
        noConflict: (function() {
            var _previousQW = window.Y;
            return function() {
                window.QW = _previousQW;
                return QW;
            }
        })(),
        /**
         * 如果prototype没有, 则绑定到原生原型对象
         * @param proto
         * @param src
         */
        bind2Prototype:function(proto, src){
            Y.forEach(src, function (func, name) {
                if (!proto.hasOwnProperty(name)) {
                    proto[name] = func;
                }
            });
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
            return f.call(data,data);
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
})(Y);