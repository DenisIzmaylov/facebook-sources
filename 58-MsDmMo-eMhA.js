/*!CK:2414043511!*//*1402981464,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["vi\/fs"]);
}

__d("EgoUnitClickHandler", ["CSS", "DOM", "Event", "csx", "goURI"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {};
    l.stealHref = function (m) {
        var n = h.find(m.parentNode, 'a.ego_title');
        m.setAttribute('href', n.href);
    };
    l.register = function (m) {
        i.listen(m, 'click', function (n) {
            var o = h.find(m, 'a.ego_title');
            if (l.enabled && o && o.href)k(o.href);
        });
        i.listen(m, 'mouseover', function (n) {
            var o = h.find(m, 'a.ego_title'), p = h.find(m, "a._8o .img"), q = n.getTarget(), r;
            if (q.tagName === 'A' || q.tagName === 'a') {
                r = q;
            } else {
                var s = h.scry(q, "^a");
                if (s.length === 1)r = s[0];
            }
            if (r && r.href != o.href && (!p || r.href != p.href)) {
                g.removeClass(o, 'always_underlined');
                l.enabled = false;
            } else {
                g.addClass(o, 'always_underlined');
                l.enabled = true;
            }
        });
        i.listen(m, 'mouseout', function (n) {
            var o = h.find(m, 'a.ego_title');
            g.removeClass(o, 'always_underlined');
            l.enabled = false;
        });
    };
    e.exports = l;
}, null);
__d("legacy:PageFanning", ["PageFanning"], function (a, b, c, d) {
    a.PageFanning = b('PageFanning');
}, 3);