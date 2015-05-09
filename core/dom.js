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

            var elementScrollTop = document.body.scrollTop || document.documentElement.scrollTop,
                elementScrollLeft = document.body.scrollLeft || document.documentElement.scrollTop;


            return {
                "top": actualTop - elementScrollTop,
                "left": actualLeft - elementScrollLeft
            }
        }

    });
})(Y);