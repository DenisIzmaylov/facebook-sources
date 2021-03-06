/*!CK:2148961379!*//*1409640225,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["SZnfG"]);
}

__d("PixelNumConverter", [], function (a, b, c, d, e, f) {
    var g = {pixelValue: function (h) {
        return h !== null ? Number(h) + 'px' : 'auto';
    }, numValue: function (h) {
        return Number(h.replace("px", ""));
    }};
    e.exports = g;
}, null);
__d("DesktopHscrollUnit", ["Arbiter", "CSS", "DesktopHscrollUnitEventConstants", "DOM", "DOMQuery", "Locale", "PixelNumConverter", "Style", "csx", "cx", "getStyleProperty", "queryThenMutateDOM"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = "_2_tg", t = 300, u = "_2_th", v = "_2_ti", w = "_2_tj", x = "_hy9", y = "_1kf5";

    function z(aa, ba, ca, da, ea, fa, ga, ha) {
        "use strict";
        this.$DesktopHscrollUnit0 = aa;
        this.$DesktopHscrollUnit1 = ba;
        this.$DesktopHscrollUnit2 = ca;
        this.$DesktopHscrollUnit3 = da;
        this.$DesktopHscrollUnit4 = fa;
        this.$DesktopHscrollUnit5 = 0;
        this.$DesktopHscrollUnit6 = 1 + fa.length;
        this.$DesktopHscrollUnit7 = [ea];
        this.$DesktopHscrollUnit8 = ga;
        this.$DesktopHscrollUnit9 = new g();
        this.$DesktopHscrollUnita = 0;
        this.$DesktopHscrollUnitb = k.find(aa, "^div._5jmm");
        this.$DesktopHscrollUnitc = this.$DesktopHscrollUnitb.getAttribute('data-ft');
        this.$DesktopHscrollUnit2.initPager(this, this.$DesktopHscrollUnit3);
        ha.forEach(function (ia) {
            ia.init(this);
        }, this);
        h.addClass(ea.ad, u);
        if (ea.subheader)this.$DesktopHscrollUnitd(ea.subheader);
        this.$DesktopHscrollUnite(this.$DesktopHscrollUnit5);
        h.addClass(this.$DesktopHscrollUnitb, "_sf6");
        h.conditionClass(this.$DesktopHscrollUnitb, "_2_tl", this.$DesktopHscrollUnit8);
        this.$DesktopHscrollUnitf();
    }

    z.prototype.getArbiter = function () {
        "use strict";
        return this.$DesktopHscrollUnit9;
    };
    z.prototype.getAdContainer = function () {
        "use strict";
        return this.$DesktopHscrollUnit0;
    };
    z.prototype.getPager = function () {
        "use strict";
        return this.$DesktopHscrollUnit2;
    };
    z.prototype.getSelectedItem = function () {
        "use strict";
        return this.$DesktopHscrollUnit7[this.$DesktopHscrollUnit5];
    };
    z.prototype.getSelectedIndex = function () {
        "use strict";
        return this.$DesktopHscrollUnit5;
    };
    z.prototype.getNumItems = function () {
        "use strict";
        return this.$DesktopHscrollUnit6;
    };
    z.prototype.getID = function () {
        "use strict";
        return this.$DesktopHscrollUnitb.id;
    };
    z.prototype.scrollNext = function () {
        "use strict";
        if (this.$DesktopHscrollUnit5 + 1 < this.$DesktopHscrollUnit6)this.$DesktopHscrollUnitg(this.$DesktopHscrollUnit5 + 1);
    };
    z.prototype.scrollPrevious = function () {
        "use strict";
        if (this.$DesktopHscrollUnit5 - 1 >= 0)this.$DesktopHscrollUnitg(this.$DesktopHscrollUnit5 - 1);
    };
    z.prototype.addOffscreenItems = function (aa) {
        "use strict";
        this.$DesktopHscrollUnit4.push.apply(this.$DesktopHscrollUnit4, aa);
        this.$DesktopHscrollUnit6 += aa.length;
        this.$DesktopHscrollUnit9.inform('onAdditionalItemsAdded', {});
    };
    z.prototype.$DesktopHscrollUnite = function (aa) {
        "use strict";
        var ba = this.$DesktopHscrollUnit7[aa];
        if (this.$DesktopHscrollUnit8 && ba.subheader) {
            j.remove(ba.subheader);
            j.appendContent(this.$DesktopHscrollUnit1, ba.subheader);
            this.$DesktopHscrollUnit1.offsetHeight;
        }
        this.$DesktopHscrollUnit7.forEach(function (ca, da) {
            var ea = da == aa;
            h.conditionClass(ca.ad, w, ea);
            h.conditionClass(ca.ad, x, !ea);
            if (ca.subheader)h.conditionClass(ca.subheader, w, ea);
        });
        this.$DesktopHscrollUnit9.inform('onShow', {item: ba, index: aa}, g.BEHAVIOR_EVENT);
        g.inform(i.HSCROLL_ITEM_SHOWN_EVENT);
    };
    z.prototype.$DesktopHscrollUnitg = function (aa) {
        "use strict";
        this.$DesktopHscrollUnit9.inform('onBeforeTransition', {item: this.$DesktopHscrollUnit7[this.$DesktopHscrollUnit5]}, g.BEHAVIOR_EVENT);
        while (this.$DesktopHscrollUnit4.length > 0 && aa >= this.$DesktopHscrollUnit7.length)this.$DesktopHscrollUnith(this.$DesktopHscrollUnit4.shift());
        this.$DesktopHscrollUnite(aa);
        if (this.$DesktopHscrollUnit8) {
            this.$DesktopHscrollUnita++;
            h.addClass(this.$DesktopHscrollUnit0, s);
            setTimeout(function () {
                if (--this.$DesktopHscrollUnita === 0)h.removeClass(this.$DesktopHscrollUnit0, s);
            }.bind(this), t);
            this.$DesktopHscrollUnit9.inform('onAnimate', {item: this.$DesktopHscrollUnit7[aa]}, g.BEHAVIOR_EVENT);
            var ba, ca;
            r(function () {
                ba = m.numValue(q(this.$DesktopHscrollUnit0, 'padding-bottom'));
                ca = this.$DesktopHscrollUnit0.offsetHeight;
            }.bind(this), function () {
                n.set(this.$DesktopHscrollUnit0, 'min-height', h.hasClass(this.$DesktopHscrollUnit7[aa].ad, y) ? '0px' : m.pixelValue(ca - ba));
                n.set(this.$DesktopHscrollUnit7[0].ad, l.isRTL() ? 'margin-right' : 'margin-left', (aa * -100) + '%');
            }.bind(this));
        }
        this.$DesktopHscrollUnit5 = aa;
        this.$DesktopHscrollUnitf();
    };
    z.prototype.$DesktopHscrollUnith = function (aa) {
        "use strict";
        h.addClass(aa.ad, u);
        j.appendContent(this.$DesktopHscrollUnit0, aa.ad);
        g.inform(i.HSCROLL_ITEM_INSERTED_EVENT);
        if (aa.subheader) {
            this.$DesktopHscrollUnitd(aa.subheader);
            j.appendContent(this.$DesktopHscrollUnit1, aa.subheader);
        }
        this.$DesktopHscrollUnit7.push(aa);
    };
    z.prototype.$DesktopHscrollUnitf = function () {
        "use strict";
        var aa = JSON.parse(this.$DesktopHscrollUnit7[this.$DesktopHscrollUnit5].ad.getAttribute('data-ft')), ba = JSON.parse(this.$DesktopHscrollUnitc);
        for (var ca in aa)ba[ca] = aa[ca];
        this.$DesktopHscrollUnitb.setAttribute('data-ft', JSON.stringify(ba));
        g.inform('FeedAdsClickLogger/refreshTrackingData', {});
    };
    z.prototype.$DesktopHscrollUnitd = function (aa) {
        "use strict";
        h.addClass(aa, v);
        if (this.$DesktopHscrollUnit8) {
            var ba = j.create('div');
            h.addClass(ba, "_2_tm");
            j.appendContent(aa, ba);
        }
    };
    e.exports = z;
}, null);
__d("XFeedInfiniteHscrollControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/feed\/infinite_hscroll\/", {ad_index_offset: {type: "Int", required: true}, cursor: {type: "String"}, requested_ad_type: {type: "Enum", required: true}, scroll_body_id: {type: "String"}, loading_card_id: {type: "String"}, serialized_context: {type: "String"}});
}, null);
__d("InfiniteHScrollExtension", ["Arbiter", "AsyncRequest", "CSS", "DOM", "LoadingIndicator.react", "React", "XFeedInfiniteHscrollControllerURIBuilder", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    function o(p) {
        "use strict";
        this.$InfiniteHScrollExtension0 = p;
        this.$InfiniteHScrollExtension1 = false;
    }

    o.prototype.init = function (p) {
        "use strict";
        this.$InfiniteHScrollExtension2 = p;
        this.$InfiniteHScrollExtension2.getArbiter().subscribe('onBeforeTransition', this.$InfiniteHScrollExtension3.bind(this), g.SUBSCRIBE_NEW);
        g.subscribe('DesktopInfiniteHscroll/newOffscreenItems', this.$InfiniteHScrollExtension4.bind(this), g.SUBSCRIBE_NEW);
    };
    o.prototype.initPager = function (p, q) {
        "use strict";
        this.$InfiniteHScrollExtension2 = p;
        this.$InfiniteHScrollExtension5 = q;
        this.$InfiniteHScrollExtension6 = j.create('div', {'class': 'hidden_elem lfloat'});
        j.insertBefore(this.$InfiniteHScrollExtension5.getRoot(), this.$InfiniteHScrollExtension6);
        l.renderComponent(l.createElement(k, {size: "small", color: "white", className: "_440x"}), this.$InfiniteHScrollExtension6);
        q.subscribe('next', this.$InfiniteHScrollExtension7.bind(this));
        q.subscribe('prev', this.$InfiniteHScrollExtension2.scrollPrevious.bind(this.$InfiniteHScrollExtension2));
        this.$InfiniteHScrollExtension2.getArbiter().subscribe('onShow', function (r, s) {
            this.$InfiniteHScrollExtension8(s.index);
        }.bind(this));
    };
    o.prototype.getPagerButtons = function () {
        "use strict";
        return this.$InfiniteHScrollExtension5;
    };
    o.prototype.$InfiniteHScrollExtension7 = function (p, q) {
        "use strict";
        if (this.$InfiniteHScrollExtension2.getSelectedIndex() + 1 < this.$InfiniteHScrollExtension2.getNumItems()) {
            this.$InfiniteHScrollExtension2.scrollNext();
        } else {
            this.$InfiniteHScrollExtension1 = true;
            this.$InfiniteHScrollExtension5.setNextEnabled(false);
            i.show(this.$InfiniteHScrollExtension6);
            this.$InfiniteHScrollExtension9();
        }
    };
    o.prototype.$InfiniteHScrollExtension8 = function (p) {
        "use strict";
        this.$InfiniteHScrollExtension5.setPrevEnabled(p > 0);
        this.$InfiniteHScrollExtension5.setNextEnabled(!this.$InfiniteHScrollExtension1 || p < this.$InfiniteHScrollExtension2.getNumItems() - 1);
    };
    o.prototype.$InfiniteHScrollExtension3 = function (p, q) {
        "use strict";
        this.$InfiniteHScrollExtension1 = false;
        i.hide(this.$InfiniteHScrollExtension6);
        this.fetchAdditionalAdsIfNecessary();
    };
    o.prototype.fetchAdditionalAdsIfNecessary = function () {
        "use strict";
        var p = this.$InfiniteHScrollExtension2.getNumItems() - this.$InfiniteHScrollExtension2.getSelectedIndex() - 1;
        if (p > this.$InfiniteHScrollExtension0.loadingThreshold)return;
        this.$InfiniteHScrollExtension9();
    };
    o.prototype.$InfiniteHScrollExtension9 = function () {
        "use strict";
        if (this.$InfiniteHScrollExtensiona)return;
        this.$InfiniteHScrollExtensiona = true;
        var p = new m().setString('serialized_context', this.$InfiniteHScrollExtension0.serializedContext).setEnum('requested_ad_type', this.$InfiniteHScrollExtension0.adType).setString('scroll_body_id', this.$InfiniteHScrollExtensionb()).setInt('ad_index_offset', this.$InfiniteHScrollExtension2.getNumItems());
        new h().setURI(p.getURI()).setHandler(function (q) {
            this.$InfiniteHScrollExtensiona = false;
            i.hide(this.$InfiniteHScrollExtension6);
            this.$InfiniteHScrollExtension8(this.$InfiniteHScrollExtension2.getSelectedIndex());
        }.bind(this)).setErrorHandler(function (q) {
        }.bind(this)).send();
    };
    o.prototype.$InfiniteHScrollExtension4 = function (p, q) {
        "use strict";
        if (q.unitID !== this.$InfiniteHScrollExtensionb())return;
        this.$InfiniteHScrollExtension2.addOffscreenItems(q.renderedItems);
        if (this.$InfiniteHScrollExtension1)this.$InfiniteHScrollExtension2.scrollNext();
    };
    o.prototype.$InfiniteHScrollExtensionb = function () {
        "use strict";
        return this.$InfiniteHScrollExtension2.getID();
    };
    e.exports = o;
}, null);
__d("PadMessageOnAnimateExtension", ["Arbiter", "CSS", "DOM", "DOMQuery", "PixelNumConverter", "Style", "csx", "cx", "getStyleProperty", "queryThenMutateDOM"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = "div._5pbx", r = "div._329q", s = "div._6m2", t = "_1kf5";

    function u() {
        "use strict";
    }

    u.prototype.init = function (v) {
        "use strict";
        this.$PadMessageOnAnimateExtension0 = v;
        this.$PadMessageOnAnimateExtension0.getArbiter().subscribe('onAnimate', this.$PadMessageOnAnimateExtension1.bind(this), g.SUBSCRIBE_NEW);
    };
    u.prototype.$PadMessageOnAnimateExtension1 = function (v, w) {
        "use strict";
        if (h.hasClass(w.item.ad, t))return;
        var x = j.scry(w.item.ad, q)[0];
        if (!x)return;
        var y = j.scry(w.item.ad, r)[0] || j.scry(w.item.ad, s)[0];
        if (!y)return;
        var z = j.scry(w.item.ad, "div._5pbx .text_exposed_root")[0], aa, ba, ca, da;
        p(function () {
            aa = k.numValue(o(this.$PadMessageOnAnimateExtension0.getAdContainer(), 'padding-bottom'));
            ca = this.$PadMessageOnAnimateExtension0.getAdContainer().offsetHeight;
            ba = x.offsetHeight;
            da = w.item.ad.offsetHeight;
        }.bind(this), function () {
            var ea = ca - aa - da;
            if (z && !h.hasClass(z, 'text_exposed')) {
                h.addClass(z, 'text_exposed');
                var fa = x.offsetHeight - ba;
                if (fa <= ea) {
                    ea -= fa;
                    this.$PadMessageOnAnimateExtension2(z);
                } else h.removeClass(z, 'text_exposed');
            }
            l.set(x, 'min-height', k.pixelValue(ba + ea));
        }.bind(this));
    };
    u.prototype.$PadMessageOnAnimateExtension2 = function (v) {
        "use strict";
        j.scry(v, '.text_exposed_hide').forEach(function (w) {
            i.remove(w);
        });
        j.scry(v, '.text_exposed_link').forEach(function (w) {
            i.remove(w);
        });
        j.scry(v, '.text_exposed_show').forEach(function (w) {
            i.replace(w, w.childNodes);
        });
        h.removeClass(v, 'text_exposed_root');
        h.removeClass(v, 'text_exposed');
    };
    e.exports = u;
}, null);
__d("PageLikeAdScrollOnLikeExtension", ["Arbiter", "Button", "PageLikeButton"], function (a, b, c, d, e, f, g, h, i) {
    var j = 750;

    function k() {
        "use strict";
    }

    k.prototype.init = function (l) {
        "use strict";
        this.$PageLikeAdScrollOnLikeExtension0 = l;
        var m = this.$PageLikeAdScrollOnLikeExtension0.getPager().getPagerButtons().getRoot().childNodes;
        this.$PageLikeAdScrollOnLikeExtension1 = m[m.length - 1];
        g.subscribe(i.LIKED, this.$PageLikeAdScrollOnLikeExtension2.bind(this), g.SUBSCRIBE_NEW);
    };
    k.prototype.$PageLikeAdScrollOnLikeExtension2 = function (l, m) {
        "use strict";
        var n = this.$PageLikeAdScrollOnLikeExtension0.getSelectedItem().ad.getAttribute('data-oid');
        if (m.profile_id != n || !h.isEnabled(this.$PageLikeAdScrollOnLikeExtension1))return;
        var o = this.$PageLikeAdScrollOnLikeExtension0.getPager();
        o.fetchAdditionalAdsIfNecessary && o.fetchAdditionalAdsIfNecessary();
        setTimeout(function () {
            h.setDepressed(this.$PageLikeAdScrollOnLikeExtension1, true);
        }.bind(this), j / 2);
        setTimeout(function () {
            h.setDepressed(this.$PageLikeAdScrollOnLikeExtension1, false);
            this.$PageLikeAdScrollOnLikeExtension0.getPager().getPagerButtons().inform('next');
        }.bind(this), j);
    };
    e.exports = k;
}, null);