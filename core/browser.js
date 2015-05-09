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