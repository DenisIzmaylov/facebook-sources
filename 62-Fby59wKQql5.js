/*!CK:982676257!*//*1411957096,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["ORmco"]);
}

__d("PageWebsiteLogger", ["Banzai", "Event"], function (a, b, c, d, e, f, g, h) {
    var i = {init: function (j, k, l, m) {
        h.listen(j, 'click', function (n) {
            this.log({user_id: k, page_id: l, website_url: m});
        }.bind(this));
    }, log: function (j) {
        g.post('page_website_logger', j);
    }};
    e.exports = i;
}, null);
__d("ComposerXPages", ["Arbiter", "CurrentUser", "DOM", "DOMScroll", "URI", "Event", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = {initScrollToComposer: function (o) {
        this.initScrollToComposerWithRootID(o, 'pagelet_timeline_recent');
    }, initScrollToComposerWithRootID: function (o, p) {
        l.listen(o, 'click', function () {
            this._scrollAndFocus(m(p));
        }.bind(this));
    }, scrollToComposer: function (o) {
        if (!k.getRequestURI().getQueryData().focus_composer && !k.getRequestURI().getQueryData().scroll_to_composer)return;
        l.listen(window, 'load', function () {
            this._scrollAndFocus(o);
        }.bind(this));
    }, _scrollAndFocus: function (o) {
        g.inform('ComposerXPages/composePostWithActor', {actorID: h.getID(), callback: function () {
            i.find(o, 'textarea.input').focus();
        }});
        j.scrollTo(o, 500, false, false, 0, function () {
            i.find(o, 'textarea.input').focus();
        });
    }};
    e.exports = n;
}, null);
__d("ShareAttachmentDescriptionEllipsis", ["DOMDimensions", "LitestandEllipsis", "Style"], function (a, b, c, d, e, f, g, h, i) {
    var j = {add: function (k, l, m) {
        var n = g.getElementDimensions(l).height, o = i.getFloat(k, 'marginTop'), p = k.parentElement.clientHeight - n - o;
        if (m)p -= (i.getFloat(m, 'marginTop') + g.getElementDimensions(m).height);
        h.add(k, p);
    }};
    e.exports = j;
}, null);
__d("PagesPostsSections", ["Arbiter", "CSS", "DOM", "DOMScroll", "Event", "PagesTimelineController", "ScrollingPager", "Vector", "csx", "queryThenMutateDOM", "tidyEvent"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = 120, s = 'PagesPostsSections/scrollListener';

    function t(u) {
        "use strict";
        this.$PagesPostsSections0 = u;
        this.$PagesPostsSections1 = {};
        this.$PagesPostsSections2 = 0;
        this.$PagesPostsSections3 = 0;
        for (var v = 0; v < this.$PagesPostsSections0.length; v++) {
            this.$PagesPostsSections1[this.$PagesPostsSections0[v].key] = {section: this.$PagesPostsSections0[v].section, index: v};
            this.$PagesPostsSections0[v].loaded = (!v);
            this.$PagesPostsSections0[v].fire_on_scroll_enabled = true;
            this.$PagesPostsSections0[v].first_posts_loaded = (!v);
        }
        var w = function (x, y) {
            if (y.section_index + 1 < this.$PagesPostsSections0.length)h.show(this.$PagesPostsSections0[y.section_index + 1].section);
            if (this.$PagesPostsSections2 < this.$PagesPostsSections0.length - 1)this.$PagesPostsSections0[++this.$PagesPostsSections2].loaded = true;
        };
        q(g.subscribe(l.SECTION_FULLY_LOADED, w.bind(this)));
        q(g.subscribe(l.LOAD_SECTION, this.loadSection.bind(this)));
        q(k.listen(window, 'scroll', this.scrollListener.bind(this)));
        q(g.subscribe(l.FIRST_POSTS_LOADED, this.firstPostsLoaded.bind(this)));
        q(g.subscribe(l.REMOVE_SECTION, this.removeSection.bind(this)));
    }

    t.prototype.firstPostsLoaded = function (u, v) {
        "use strict";
        var w = this.$PagesPostsSections1[v.section_key];
        w.section.style.minHeight = '';
        this.$PagesPostsSections0[w.index].first_posts_loaded = true;
    };
    t.prototype.loadSection = function (u, v) {
        "use strict";
        var w = this.$PagesPostsSections1[v.section_key].section, x = this.$PagesPostsSections1[v.section_key].index;
        for (var y = this.$PagesPostsSections2; y < x; y++) {
            if (this.$PagesPostsSections0[y].fire_on_scroll_enabled)this.setFireOnScroll(y, false);
            h.show(this.$PagesPostsSections0[y].section);
            this.$PagesPostsSections0[y].loaded = true;
        }
        this.$PagesPostsSections2 = x;
        if (!this.$PagesPostsSections0[x].first_posts_loaded) {
            if (!this.$PagesPostsSections0[x].fire_on_scroll_enabled)this.setFireOnScroll(x, true);
            w.style.minHeight = window.innerHeight + 'px';
        }
        if (!x && !this.$PagesPostsSections0[x].loaded) {
            j.scrollTo(document.body);
        } else {
            h.show(w);
            this.$PagesPostsSections0[this.$PagesPostsSections2].loaded = true;
            var z = n.getScrollPosition().x, aa = n.getElementPosition(w).y - r;
            j.scrollTo(new n(z, aa, 'document'));
        }
    };
    t.prototype.setFireOnScroll = function (u, v) {
        "use strict";
        var w = this.$PagesPostsSections0[u].section, x = i.scry(w, "div._5t6j"), y = x.length ? x[x.length - 1] : null;
        if (y) {
            var z = m.getInstance(y.id);
            if (z) {
                this.$PagesPostsSections0[u].fire_on_scroll_enabled = v;
                if (v) {
                    z.register();
                } else z.removeOnVisible();
            }
        }
    };
    t.prototype.scrollListener = function (event) {
        "use strict";
        p(this.getActiveSectionIndex.bind(this), function () {
            l.activateScrubberItem(this.$PagesPostsSections0[this.$PagesPostsSections3].key);
        }.bind(this), s);
    };
    t.prototype.getActiveSectionIndex = function () {
        "use strict";
        var u = 0;
        for (var v = 0; v < this.$PagesPostsSections0.length; v++) {
            var w = this.$PagesPostsSections0[v].section, x = n.getElementPosition(w, 'viewport').y;
            if (x > r)break;
            if (this.$PagesPostsSections0[v].loaded)u = v;
        }
        if (u != this.$PagesPostsSections3)this.$PagesPostsSections3 = u;
    };
    t.prototype.removeSection = function (u, v) {
        "use strict";
        var w = this.$PagesPostsSections1[v.section_key].index;
        this.$PagesPostsSections0[w].loaded = false;
        h.hide(this.$PagesPostsSections1[v.section_key].section);
    };
    e.exports = t;
}, null);
__d("PagesTimelineChaining", ["Arbiter", "PageLikeButton", "Parent", "Style", "UIPagelet", "cx", "tidyEvent"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = {_recentlyLikedPageIDs: {}, container: null, init: function (o, p) {
        this.container = o;
        if (!this._showChainSuggestions(p.pageID)) {
            this.subscription = g.subscribe(h.LIKED, this.onLike.bind(this, p.pageID));
            m(this.subscription);
        }
    }, onLike: function (o, p, q) {
        if (q.profile_id === o && i.byClass(q.target, "_5d_i")) {
            this._recentlyLikedPageIDs[o] = true;
            this._showChainSuggestions(o);
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }, displayCallback: function (o) {
        o();
        var p = this.container.firstChild;
        if (p)j.set(this.container, 'height', p.offsetHeight + 'px');
    }, _showChainSuggestions: function (o) {
        if (!(o in this._recentlyLikedPageIDs))return false;
        k.loadFromEndpoint('PagesTimelineChainingPagelet', this.container, {pageID: o}, {displayCallback: this.displayCallback.bind(this)});
        return true;
    }};
    e.exports = n;
}, null);
__d("PlaceActionLink", ["AsyncRequest", "Dialog"], function (a, b, c, d, e, f, g, h) {
    var i = {start_claim_link: function (j) {
        var k = new g().setMethod('POST').setURI('/ajax/places/claim/start_claim.php').setData({id: j});
        new h().setAsync(k).show();
        return false;
    }, refer_claim_link: function (j) {
        var k = new g().setMethod('POST').setURI('/ajax/places/claim/refer_claim.php').setData({id: j});
        new h().setAsync(k).show();
        return false;
    }};
    e.exports = i;
}, null);
__d("legacy:place-action-link", ["PlaceActionLink"], function (a, b, c, d) {
    a.PlaceActionLink = b('PlaceActionLink');
}, 3);
__d("ProfileCoverEditControls", ["ArbiterMixin", "Event", "mixin"], function (a, b, c, d, e, f, g, h, i) {
    var j = i(g);
    for (var k in j)if (j.hasOwnProperty(k))m[k] = j[k];
    var l = j === null ? null : j.prototype;
    m.prototype = Object.create(l);
    m.prototype.constructor = m;
    m.__superConstructor__ = j;
    function m(n, o, p, q) {
        "use strict";
        this.root = n;
        this.save = o;
        this.cancel = p;
        this.input = q;
        h.listen(o, 'click', function () {
            this.inform('save');
        }.bind(this));
        h.listen(p, 'click', function () {
            this.inform('cancel');
        }.bind(this));
    }

    m.prototype.getSaveButton = function () {
        "use strict";
        return this.save;
    };
    m.prototype.getCancelButton = function () {
        "use strict";
        return this.cancel;
    };
    m.prototype.getInput = function () {
        "use strict";
        return this.input;
    };
    e.exports = m;
}, null);
__d("PagesComposer", ["Arbiter", "Bootloader", "ComposerXMarauderLogger", "ComposerXStore", "DOM", "Parent", "Run", "$", "csx", "cx", "getObjectValues", "goURI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s;

    function t() {
        i.logCompleted(s.id);
    }

    function u(w) {
        if (w.hidePost) {
            t();
            return;
        }
        if (w.redirect) {
            var x = j.getAllForComposer(s.id);
            q(x).forEach(function (z) {
                if (z.reset)z.reset(z);
            });
            r(w.redirect);
            t();
            return;
        }
        if (!w.streamStory) {
            window.location.reload();
            return;
        }
        if (w.backdatedTime) {
            h.loadModules(["PagesStoryPublisher"], function (z) {
                z.publish(w);
            });
            t();
            return;
        }
        var y = v.renderStory(s, w.streamStory);
        g.inform('TimelineComposer/on_after_publish', y, g.BEHAVIOR_PERSISTENT);
        t();
    }

    var v = {init: function (w) {
        s = n(w);
        var x = g.subscribe('composer/publish', function (event, y) {
            if (y.composer_id === s.id)u(y);
        });
        m.onLeave(x.unsubscribe.bind(x));
    }, renderStory: function (w, x) {
        var y = l.byClass(w, "_5onn");
        if (!y)return;
        var z = k.scry(y, "._5sem")[0], aa = k.prependContent(z, x)[0];
        h.loadModules(["Animation"], function (ba) {
            new ba(aa).from('backgroundColor', '#fff8dd').to('backgroundColor', '#fff').duration(2000).ease(ba.ease.both).go();
        });
        return aa;
    }, replaceByID: function (w, x) {
        k.replace(n(w), x);
    }};
    e.exports = a.PagesComposer || v;
}, null);
__d("CovercardArrow", ["ContextualDialogArrow", "CSS", "DOMQuery", "Locale", "Style", "csx", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = -45, o = 45, p = 12;
    if (j.isRTL()) {
        n = -n;
        o = -o;
    }
    function q(s) {
        "use strict";
        this._layer = s;
    }

    q.prototype.enable = function () {
        "use strict";
        this._layer.enableBehavior(g);
        var s = this._layer.getContentRoot();
        this._arrowWrapper = i.scry(s, "._7lh")[0];
        if (!this._arrowWrapper)return;
        this._arrowShadow = i.scry(this._arrowWrapper, "._7li")[0];
        if (!this._arrowShadow)return;
        var t = null;
        if (r(this._arrowWrapper))t = this._renderArrowWithRotate.bind(this);
        if (!t)return;
        if (j.isRTL())h.addClass(s, "_7lf");
        this._subscription = this._layer.subscribe('reposition', function (u, v) {
            var w = v.getPosition() == 'below';
            h.conditionClass(s, "_53ih", w);
            w && t(v);
        });
    };
    q.prototype.disable = function () {
        "use strict";
        this._subscription && this._subscription.unsubscribe();
        this._subscription = null;
    };
    q.prototype._calculateArrowOffset = function (s) {
        "use strict";
        var t = g.getOffsetPercent(s), u = g.getOffset(s, t, this._layer), v = k.get(this._layer.getContentRoot(), 'width');
        return parseInt(v, 10) * (t / 100) + u;
    };
    q.prototype._renderArrowWithRotate = function (s) {
        "use strict";
        var t = i.scry(this._arrowWrapper, "._7lj")[0];
        if (!t)return;
        var u = i.scry(this._arrowWrapper, "._1ubp")[0];
        if (!u)return;
        var v = r(this._arrowWrapper);
        if (!v)return;
        var w = this._calculateArrowOffset(s), x = p + w, y = -p;
        if (j.isRTL()) {
            x = -x;
            y = -y;
        }
        this._arrowWrapper.style[v] = 'translate(' + x + 'px, -' + p + 'px) ' + 'rotate(' + o + 'deg)';
        t.style[v] = 'rotate(' + n + 'deg) ' + 'translate(' + (-x) + 'px, 0px)';
        u.style[v] = 'rotate(' + n + 'deg) ' + 'translate(' + y + 'px, 0)';
    };
    function r(s) {
        if (!s)s = document.body;
        var t = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'], u;
        while (u = t.shift())if (s.style[u] !== undefined)return u;
        return null;
    }

    e.exports = q;
}, null);