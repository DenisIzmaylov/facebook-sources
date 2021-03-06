/*!CK:1087293735!*//*1409625237,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["ZeECG"]);
}

__d("MegaphoneHelper", ["Animation", "Arbiter", "AsyncRequest", "DOM", "Dialog", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {hideStory: function (n, o, p, q, r) {
        var s = {mp_id: n, location: o, context: q};
        new i().setURI('/ajax/megaphone/megaphone_hide.php').setMethod('POST').setData(s).setHandler(function (u) {
            r && r(u);
        }).send();
        var t = l(p);
        if (t)new g(t).to('height', 0).duration(500).hide().go();
    }, createModalStory: function (n, o, p, q) {
        var r;
        if (!n.buttons || !n.buttons.length) {
            n.buttons = k.CLOSE;
            r = m.hideStory(o, p, q, null);
        }
        var s = new k(n);
        if (r)s.setHandler(r);
        s.show();
    }, buttonOnClick: function (n, o, p, q, r, s, t, u) {
        var v = function () {
            if (r) {
                new i().setURI(q).send();
            } else if (!t)document.location.href = q;
        };
        if (s) {
            m.hideStory(n, o, u || '', p, v);
            if (t && q)window.open(q);
        } else v();
    }, renderFullWidth: function (n, o, p) {
        var q = l(n);
        j.prependContent(q, o);
        h.inform('Megaphone/show', n, h.BEHAVIOR_PERSISTENT);
    }};
    e.exports = m;
}, null);
__d("legacy:megaphone", ["MegaphoneHelper"], function (a, b, c, d) {
    a.MegaphoneHelper = b('MegaphoneHelper');
}, 3);
__d("ProfilePicForm", ["CSS", "DOM", "Parent", "Event", "TimelineProfilePicConfig", "Run", "$", "cx", "tidyEvent"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = false, q;

    function r(t) {
        p = t;
        g.conditionClass(document.documentElement, 'profilePicLoading', t);
    }

    function s(t, u) {
        "use strict";
        this.reset();
        this.$ProfilePicForm0 = t;
        if (!u)return;
        var v = m(u);
        o(j.listen(t.getRoot(), 'click', function (w) {
            q = w;
            w.stopPropagation();
        }));
        this.subscriptions = [t.subscribe('submit', function () {
            r(true);
            if (q) {
                j.fire(t.getRoot().parentNode, 'click', q);
                q = null;
            }
        }), t.subscribe('success', function (w, x) {
            r(false);
            var y = i.byClass(v, "_1ro1");
            if (!y)y = v.parentElement;
            h.replace(y, x.response.payload);
        }), t.subscribe('failure', r.bind(null, false))];
        l.onBeforeUnload(function () {
            if (p)return k.leavingMessage;
        });
        l.onLeave(this.reset.bind(this));
    }

    s.prototype.getFileForm = function () {
        "use strict";
        return this.$ProfilePicForm0;
    };
    s.prototype.reset = function () {
        "use strict";
        this.subscriptions && this.subscriptions.forEach(function (t) {
            t.unsubscribe();
        });
        this.subscriptions = [];
        q = null;
        r(false);
    };
    e.exports = s;
}, null);
__d("ProfilePictureUploader", ["CSS", "DOM", "HTML", "Arbiter", "Event", "Dialog", "tidyEvent", "ProfilePhotoActionLogger", "$", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = {_hadProfilePicture: false, _hasPreview: false, _optionsToHide: null, init: function (r, s, t, u, v, w, x) {
        var y = s.getFileForm(), z = p('remove_profile_picture_link');
        if (t && u)this._hasPreview = true;
        if (x)this._optionsToHide = x;
        m([j.subscribe('timeline/profile_pic/success', function (aa, ba) {
            if (w) {
                goURI(window.location);
                return;
            }
            var ca = ba.newPic;
            if (!ca)return;
            var da = l.getCurrent();
            if (da)da.hide();
            if (this._hasPreview)h.setContent(t, typeof ca === 'string' ? i(ca) : ca);
            if (z)g.show(z);
            q.updateIcons(ba.headerPicURL, r);
            j.inform('profile_picture/' + v + '/success');
        }.bind(this)), k.listen(y._form, 'click', function (aa) {
            if (!aa.clientX)return;
            n.log(n.EVENT_SELECT_METHOD, v, n.METHOD_UPLOAD);
        }), y.subscribe('submit', function () {
            if (!this._hasPreview) {
                g.addClass(document.documentElement, 'profilePicLoading');
                return;
            }
            if (z) {
                this._hadProfilePicture = !g.hasClass(z, 'hidden_elem');
                g.hide(z);
            }
            g.hide(t);
        }.bind(this)), y.subscribe('success', function (event, aa) {
            if (w) {
                goURI(window.location.href);
                return;
            }
            if (this._hasPreview) {
                h.setContent(t, aa.response.payload);
                g.show(t);
                if (z)g.show(z);
            } else g.removeClass(document.documentElement, 'profilePicLoading');
            var ba = h.create('div', null, aa.response.payload).getElementsByTagName('img')[0].src;
            q.updateIcons(ba, r);
            j.inform('profile_picture/' + v + '/success');
        }.bind(this)), y.subscribe('failure', function (aa, ba) {
            if (!this._hasPreview) {
                g.removeClass(document.documentElement, 'profilePicLoading');
                return;
            }
            g.show(t);
            g.conditionShow(o('remove_profile_picture_link'), this._hadProfilePicture);
        }.bind(this))]);
    }, updateIcons: function (r, s) {
        var t = p('profile_pic_header_' + s), u = p('profile_pic_welcome_' + s);
        if (t)t.src = r;
        if (u) {
            u.src = r;
            g.addClass(u, "_8zq");
        }
        if (this._optionsToHide) {
            h.remove(this._optionsToHide);
            this._optionsToHide = null;
        }
    }};
    e.exports = q;
}, null);
__d("ProfilePictureUploaderMegaphone", ["CSS", "cx", "Arbiter", "tidyEvent"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = {init: function (l) {
        j([i.subscribe('profile_picture/megaphone_activation/success', function () {
            g.removeClass(l, "_4y-k");
            g.removeClass(l, "_4y-l");
            g.addClass(l, "_4y-m");
        })]);
    }};
    e.exports = k;
}, null);