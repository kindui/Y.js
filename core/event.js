/**
 * User: humanhuang
 * Date: 13-8-7
 */
(function (Y) {

    function formatEvent(oEvent) {
        oEvent = oEvent || window.event;
        oEvent.eventPhase = 2;  //ie中没有eventPhase这个属性
        oEvent.isChar = (oEvent.charCode > 0);

        if (!oEvent.target) {
            oEvent.target = oEvent.srcElement || document;
        }

        if (oEvent.pageX == null && oEvent.clientX != null) {
            var oEventDocument = oEvent.target.ownerDocument || document,
                doc = oEventDocument.documentElement,
                body = oEventDocument.body;

            oEvent.pageX = oEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            oEvent.pageY = oEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }


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

        oEvent.timestamp = (new Date()).getTime();


        //鼠标滚动事件
        if (Y.browser.isFirefox()) {
            if (oEvent.type === "DOMMouseScroll") {
                oEvent.wheelDelta = -oEvent.detail * 40;
            }
            return oEvent;
        }
    }

    Y.mix(Y.fn, {
        on: function (eventType, callback) {
            this.each(function (dom) {
                if (dom.addEventListener) {
                    dom.addEventListener(eventType, function (e) {
                        var event = formatEvent(e);
                        callback.call(this, event);
                    }, false);
                    return this;
                } else if (dom.attacheEvent) {
                    dom.attachEvent("on" + eventType, function (e) {
                        var event = formatEvent(e);
                        callback.call(this, event);
                    });
                } else {
                    dom["on" + eventType] = function (e) {
                        var event = formatEvent(e);
                        callback.call(this, event);
                    }
                }
            });
            return this;
        }
    });
})(Y);