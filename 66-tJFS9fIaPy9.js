/*!CK:3965331604!*//*1408457152,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["4e5PU"]);
}

__d("highlight", ["Animation", "Style"], function (a, b, c, d, e, f, g, h) {
    function i(j, k, l, m) {
        new g(j).from('background', m || '#fff9d7').to('background', l || '#fff').ease(g.ease.both).duration(2000).ondone(function () {
            h.set(j, 'background', '');
            k && k();
        }).go();
    }

    e.exports = i;
}, null);
__d("XIntlSeeTranslationControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/intl\/see_translation\/", {ftid: {type: "String", required: true}});
}, null);
__d("IntlSeeTranslate", ["AsyncRequest", "cx", "DOM", "Event", "fbt", "highlight", "LoadingIndicator.react", "React", "XIntlSeeTranslationControllerURIBuilder"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    function p(r, s) {
        var t = i.create('div', {'class': "_5yn0"}, s || "\u041d\u0435\u0442 \u043f\u0435\u0440\u0435\u0432\u043e\u0434\u0430");
        i.replace(r, t);
        if (s)l(t);
    }

    var q = {bindListener: function (r, s) {
        j.listen(r, 'click', function () {
            n.renderComponent(n.createElement(m, {size: "small", color: "white"}), r);
            var t = new o().setString('ftid', s).getURI();
            new g().setURI(t).setHandler(function (u) {
                var v = u.getPayload();
                p(r, v && v.text);
            }).setErrorHandler(function () {
                p(r, null);
            }).send();
        });
    }};
    e.exports = q;
}, null);