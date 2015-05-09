;
!function () {

    var menu = [
        {
            title: "Y.js",
            href: "#yjs",
            collection: [
                {text: "Y.js介绍"},
                {text: "about", href: "#about"},
                {text: "给我留言", href: "#msg"}
            ]
        },
        {
            title: "Selector",
            href: "#selector",
            collection: [
                {text: "Y(selector)", href: "#selector"}
            ]
        },
        {
            title: "Type",
            href: "#istype",
            collection: [
                {text: "Y.isObject"},
                {text: "Y.isString"},
                {text: "Y.isNumber"},
                {text: "Y.isArray"},
                {text: "Y.isFunction"},
                {text: "Y.isNull"},
                {text: "Y.isUndefined"},
                {text: "Y.isElement"}
            ]
        },
        {
            title: "Util",
            href: "#tpl",
            collection: [
                {text: "*Y.tpl", href: "#tpl"},
                {text: "Y.forEach", href: "#foreach"},
                {text: "Y.Clone", href: "#clone"},
                {text: "Y.trim",href:"#trim"},
                {text: "Y.inArray",href:"#inarray"},
                {text: "Y.grep",href:"#grep"},
                {text: "Y.map",href:"#map"},
                {text: "Y.mix", href: "#mixa"},
                {text: "Y.date.format", href: "#format"}
            ]
        }, {
            title: "Cookie",
            href: "#cookie",
            collection: [
                {text: "Y.cookie", href: "#cookie"},
                {text: "Y.removeCookie", href: "#removeCookie"}
            ]
        },
        {
            title: "Ajax",
            href: "#ajax",
            collection: [
                {text: "Y.loadScript", href: "#loadscript"},
                {text: "Y.ajax", href: "#ajax"},
                {text: "Y.get", href: "#get"},
                {text: "Y.post", href: "#post"}
            ]
        },
        {
            title: "CSS",
            href: "#css",
            collection: [
                {text: ".css", href: "#css"},
                {text: ".addClass", href: "#addClass"},
                {text: ".removeClass", href: "#removeClass"},
                {text: ".hasClass", href: "#hasClass"}
            ]
        },
        {
            title: "DOM",
            href: "#dom",
            collection: [
                {text: ".html()", href: "#html"},
                {text: ".append", href: "#append"},
                {text: ".appendTo", href: "#appendTo"},
                {text: ".before", href: "#before"},
                {text: ".after", href: "#after"},
                {text: ".remove", href: "#remove"},
                {text: ".next", href: "#next"},
                {text: ".show", href: "#show"},
                {text: ".hide", href: "#hide"}
            ]
        },
        {
            title: "Positon",
            href: "#position",
            collection: [
                {text: ".offset", href: "#offset"},
                {text: ".position", href: "#position"}
            ]
        },
        {
            title: "Event",
            href: "#on",
            collection: [
                {text: ".on", href: "#on"}
            ]
        },
        {
            title: "Browser",
            href: "#browser",
            collection: [
                {text: "Y.browser"}
            ]
        }
    ];

    function renderMenu() {
        var html = "";
        Y.forEach(menu, function (item, i) {
            html += '<a class="toc_title" href="' + item.href + '">' + item.title + '</a>';
            html += '<ul class="toc_section">';
            Y.forEach(item.collection, function (item2, i) {
                if (!item2.href) {
                    item2.href = item.href;
                }
                html += '<li>- <a href="' + item2.href + '">' + item2.text + '</a></li>';
            });
            html += '</ul>';
        });
        return html;
    }

    Y("#sidebar").html(renderMenu());

    Y("#sidebar").on("click", function (e) {
        var target = e.target;
        if (target.nodeName == 'A') {
            var hrefId = target.getAttribute("href");
        }
    });

}();

