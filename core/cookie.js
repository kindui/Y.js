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