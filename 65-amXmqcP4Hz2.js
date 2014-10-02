/*!CK:1889520714!*//*1401285474,178198863*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["z\/MdD"]);
}

__d("ShareLikeFooterNUX", ["copyProperties"], function (a, b, c, d, e, f, g) {
    function h(i) {
        this.dialog = i;
    }

    g(h.prototype, {show: function () {
        this.dialog.show();
    }});
    e.exports = h;
}, null);
__d("ShareLikeFooter", ["CSS", "DOM", "DOMQuery", "Parent", "ShareLikeFooterContext", "ShareLikeFooterNUX", "csx", "cx", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    function p(r, s, t) {
        var u = i.scry(r, "._5rnz")[0], v;
        if (u) {
            h.replace(u, s);
        } else if (t === k.LITESTAND) {
            var w = i.scry(r, "._6kv ._6m2")[0];
            if (w) {
                v = i.find(r, "._6kv");
                g.addClass(v, "_dcs");
                g.addClass(v, "_52c5");
                var x = i.scry(r, "._6nm")[0];
                if (!x)g.addClass(v, "_59sw");
                g.removeClass(w, "_dcs");
                h.appendContent(v, s);
            }
        } else if (t == k.TIMELINE) {
            v = i.scry(r, '.shareLink')[0];
            if (v && v.parentNode)h.appendContent(v.parentNode, s);
        } else if (t == k.STREAM || t == k.TICKER) {
            var y = i.scry(r, '.shareRedesignBottomBorder')[0];
            if (y)h.insertAfter(y, s);
        }
    }

    var q = {addLikeFooter: function (r, s) {
        var t = o(r), u = j.byClass(t, 'genericStreamStory'), v = k.STREAM;
        if (!u) {
            u = j.byClass(t, 'tickerDialogBody');
            v = k.TICKER;
        }
        if (!u) {
            u = j.byClass(t, 'timelineUnitContainer');
            v = k.TIMELINE;
        }
        if (!u) {
            u = j.byClass(t, "_5jmm");
            v = k.LITESTAND;
        }
        if (!u)return;
        p(u, s, v);
    }, addLikeFooterComposer: function (r, s) {
        var t = null;
        if (g.hasClass(r, 'uiStreamStory')) {
            t = k.STREAM;
        } else if (g.hasClass(r, "_5jmm")) {
            t = k.LITESTAND;
        } else t = k.TIMELINE;
        p(r, s, t);
    }, showLikeFooterNUX: function (r) {
        var s = new l(r);
        setTimeout(s.show.bind(s), 0);
    }};
    e.exports = q;
}, null);