/**
 * User: humanhuang
 * Date: 13-8-7
 */
(function (Y) {

    var ret = {
        /**
         * 0:今天
         * 1:明天
         * -1:昨天
         * 一次类推
         * @param num
         * @returns {string}
         */
        getToday:function(num){
            num = num ? num:0;
            var d = new Date();
            var day = d.getDate() + num;
            d.setDate(day);
            return d.getFullYear()+"-" +( d.getMonth()+1) +"-" + d.getDate();
        },
        // @param: 2013-09-13
        // return    Date()
        newDate:function(str){
            return new Date(str);
        },
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
    Y.date = {};
    Y.mix(Y.date, ret);

    Y.bind2Prototype(Date.prototype,ret);
})(Y);