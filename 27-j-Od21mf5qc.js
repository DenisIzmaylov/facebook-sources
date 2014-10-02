/*!CK:701264666!*//*1412036161,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["MOMrj"]);
}

__d("LitestandStream", ["Arbiter", "DOM", "LitestandMessages", "LitestandStoryInsertionStatus", "LitestandStreamConfig", "ViewportBounds", "copyProperties", "csx", "ge", "getElementPosition"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q, r, s, t, u, v = {init: function (w, x, y) {
        q = x;
        s = y;
        t = w;
        r = u = 0;
        g.subscribe(i.STORIES_INSERTED, function (z, aa) {
            if (!aa || !aa.substream_id || !q)return;
            var ba = h.scry(o(aa.substream_id), v.getStoriesSelector());
            ba.forEach(function (ca) {
                var da = h.scry(ca, "._5pbw"), ea = h.scry(ca, "._5pcp")[0], fa = h.scry(ca, "._5pbx")[0];
                if (da[0] && ea && fa) {
                    var ga = '';
                    for (var ha = 0; ha < da.length; ha++)ga += h.getID(da[ha]) + ' ';
                    ga.trim();
                    ca.setAttribute('aria-labelledby', ga + ' ' + h.getID(ea) + ' ' + h.getID(fa));
                }
                var ia = ca.getAttribute('data-timestamp'), ja = ca.getAttribute('data-ft') && JSON.parse(ca.getAttribute('data-ft')).ei;
                if (!ja && ia && ia < q)r++;
                u++;
            });
        });
    }, getEmptySubstreamsSelector: function () {
        return "._4ikz:empty";
    }, getStoriesSelector: function () {
        return "._5jmm";
    }, getStreamConfig: function (w) {
        return m({bufferPixels: 1000, firstPagerScrollBuffer: 100, maxStories: null, pagerController: 'LitestandMoreStoriesPagelet', pagerSelector: v.getPagerSelector(), pollIntervalMS: null, newStoryIdleTime: 60000, crossPage: k.load_more_units_cross_page}, w);
    }, getPagerSelector: function () {
        return "._2as,._5us6";
    }, getStreamRoot: function () {
        return t;
    }, getVisibleStoryCount: function (w) {
        var x = h.scry(w, v.getStoriesSelector());
        return x.length;
    }, hideOffscreenSubstreams: function () {
        return k.hide_offscreen_substreams;
    }, getOldStoryCount: function () {
        return r;
    }, getTotalStoryCount: function () {
        return u;
    }, getSectionID: function () {
        return s;
    }, canInsertNewerStories: function () {
        if (l.getTop() > p(v.getStreamRoot()).y)return false;
        return j.canInsert();
    }, getFeedStreamID: function () {
        return parseInt(t.id.split('feed_stream_')[1], 16) % 1e+08;
    }};
    e.exports = v;
}, null);
__d("ControlledReferer", ["Event", "URI", "UserAgent_DEPRECATED"], function (a, b, c, d, e, f, g, h, i) {
    var j = {useFacebookReferer: function (k, l, m) {
        var n = false;

        function o() {
            if (n)return;
            var q = k.contentWindow.location.pathname;
            if (q !== '/intern/common/referer_frame.php' && q !== '/common/referer_frame.php')return;
            n = true;
            k.contentWindow.document.body.style.margin = 0;
            l();
        }

        var p;
        if (document.domain !== 'facebook.com') {
            p = '/intern/common/referer_frame.php';
        } else if (i.opera()) {
            p = '/common/referer_frame.php';
        } else if (h().isSecure()) {
            p = 'https://s-static.ak.facebook.com/common/referer_frame.php';
        } else p = 'http://static.ak.facebook.com/common/referer_frame.php';
        if (m)p += '?fb_source=' + m;
        g.listen(k, 'load', o);
        k.src = p;
    }, useFacebookRefererHtml: function (k, l, m) {
        j.useFacebookReferer(k, function () {
            k.contentWindow.document.body.innerHTML = l;
        }, m);
    }};
    e.exports = j;
}, null);
__d("TrackingPixel", ["Arbiter", "ControlledReferer"], function (a, b, c, d, e, f, g, h) {
    var i = {_iframe: undefined, loadWithNoReferrer: function (j) {
        if (!i._iframe) {
            var k = document.createElement('iframe');
            k.frameborder = 0;
            k.width = k.height = 1;
            k.style.position = 'absolute';
            k.style.top = '-10px';
            h.useFacebookReferer(k, function () {
                g.inform('TrackingPixel/iframeIsLoaded', null, g.BEHAVIOR_PERSISTENT);
            }, null);
            document.body.appendChild(k);
            i._iframe = k;
        }
        g.subscribe('TrackingPixel/iframeIsLoaded', function () {
            var l = i._iframe.contentWindow.document, m = l.createElement('img');
            m.src = j;
        });
    }};
    e.exports = i;
}, null);
__d("ExternalTrackingTag", ["AsyncSignal", "TrackingPixel", "Event"], function (a, b, c, d, e, f, g, h, i) {
    var j = {listenForElementClick: function (k, l, m, n, o) {
        i.listen(k, 'click', function () {
            j.sendRequest(l, m, n, o);
        });
    }, sendRequest: function (k, l, m, n) {
        if (!k)return;
        new g('/ads/external_tracking_tag/', {href: k, tracking_tag_id: l, adgroup_id: m, ad_id: n}).send();
        h.loadWithNoReferrer(k);
    }};
    e.exports = j;
}, null);
__d("FeedAdsClickLogger", ["Arbiter", "AsyncRequest", "Banzai", "collectDataAttributes", "DOM", "ge", "LitestandMessages", "LitestandStream", "Parent", "TrackingNodes", "ExternalTrackingTag", "URI", "isFacebookURI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t = 'ssinfeed', u = {}, v = false, w = [];

    function x() {
        "use strict";
    }

    x.prototype.init = function (y) {
        "use strict";
        g.subscribe("ClickRefAction/new", this.onNewUserAction.bind(this));
        if (y.append_tracking_data_to_links) {
            this.appendTrackingDataToLinks();
            g.subscribe(m.STORIES_INSERTED, this.appendTrackingDataToLinks.bind(this));
            g.subscribe('FeedAdsClickLogger/refreshTrackingData', this.appendTrackingDataToLinks.bind(this), g.SUBSCRIBE_NEW);
        }
    };
    x.prototype.getStories = function () {
        "use strict";
        var y = n.getStreamRoot();
        if (y) {
            return k.scry(y, n.getStoriesSelector());
        } else {
            var z = l('home_stream');
            if (z)return k.scry(z, '.uiStreamStory');
        }
        return [];
    };
    x.prototype.appendTrackingDataToLinks = function () {
        "use strict";
        var y = this.getStories();
        for (var z = 0; z < y.length; z++) {
            var aa = y[z];
            if (aa in w)continue;
            var ba = aa.getAttribute('data-ft');
            if (!ba || (ba.indexOf('ei') === -1) && (ba.indexOf('mei') === -1))continue;
            var ca = k.scry(aa, 'a');
            for (var da = 0; da < ca.length; da++) {
                var ea = ca[da];
                if (ea.getAttribute('ajaxify') != null)continue;
                if (ea.getAttribute('rel') != null)continue;
                var fa = ea.getAttribute('href');
                if (!fa || fa.charAt(0) === '#')continue;
                var ga = r(ea);
                if (s(ga) === false)continue;
                if (ga.isLinkshimURI() === true)continue;
                var ha = j(ea, ['ft']).ft, ia = ga.getQueryData();
                ia.ft = ha;
                ia.__md__ = 0;
                ga.setQueryData(ia);
                ea.setAttribute('href', ga.toString());
                ea.setAttribute('onmousedown', "this.href = this.href.replace('__md__=0', '__md__=1');");
            }
            w.push(aa);
        }
    };
    x.prototype.getHref = function (y) {
        "use strict";
        return (y.getAttribute && (y.getAttribute('ajaxify') || y.getAttribute('data-endpoint')) || y.action || y.href);
    };
    x.prototype.sendLogRequest = function (y) {
        "use strict";
        var z = y.ei || y.ai;
        if (!z && y.mei)z = y.mf_story_key;
        if (y !== null && typeof(z) === "string") {
            var aa = false;
            if (y.tn) {
                var ba = p.parseTrackingNodeString(y.tn);
                for (var ca = 0; ca < ba.length; ca++) {
                    var da = ba[ca][0];
                    switch (da) {
                        case p.types.LIKE_LINK:
                        case p.types.UNLIKE_LINK:
                        case p.types.COMMENT:
                        case p.types.ADD_COMMENT_BOX:
                            return;
                        case p.types.XBUTTON:
                        case p.types.HIDE_LINK:
                        case p.types.REPORT_SPAM_LINK:
                        case p.types.HIDE_ALL_LINK:
                        case p.types.DROPDOWN_BUTTON:
                        case p.types.UNHIDE_LINK:
                            return;
                        case p.types.RELATED_SHARE_ARTICLE:
                        case p.types.RELATED_SHARE_VIDEO:
                            return;
                        case p.types.ATTACHMENT:
                        case p.types.USER_MESSAGE:
                            aa = true;
                            break;
                    }
                }
            }
            var ea = Date.now(), fa = 500;
            y.duplicate_click = !!u[z] && (ea - u[z] < fa);
            u[z] = ea;
            if (i.isEnabled('ssinfeed')) {
                i.post(t, y, {delay: 0, retry: i.isEnabled('ssinfeed_retry')});
            } else {
                var ga = new h('/ajax/ssinfeed/end/').setData(y).setAllowCrossPageTransition(true).setMethod('POST');
                ga.send();
            }
            var ha = y.href;
            if (r(ha).isLinkshimURI() && r(ha).getQueryData())ha = r(ha).getQueryData().u;
            if (aa && y.external_tracking_tag && !y.duplicate_click && ha && s(r(ha)) === false)q.sendRequest(y.external_tracking_tag.url, y.external_tracking_tag.tag_id, y.external_tracking_tag.adgroup_id);
        }
    };
    x.prototype.onNewUserAction = function (y, z) {
        "use strict";
        if (!z.node)return;
        var aa = this.getHref(z.node), ba = o.byTag(z.node, 'input') || o.byTag(z.node, 'button');
        if (!aa && ba && ba.type == "submit" && ba.getAttribute && ba.getAttribute('data-ft'))aa = "#";
        var ca;
        if (aa && z.event && (z.event.type === 'click' || z.event.type === 'contextmenu')) {
            ca = j(z.node, ['ft']);
            ca.ft.href = aa;
            ca.ft.mouse_type = z.event.type;
            this.sendLogRequest(ca.ft);
        }
    };
    e.exports.init = function (y) {
        if (v === false) {
            (new x()).init(y);
            v = true;
        }
    };
}, null);
__d("XAdPreferencesInterestsWriteControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/ads\/preferences\/edit_interests\/", {ad_id: {type: "Int", required: true}, action: {type: "Enum", required: true}, type: {type: "Enum", required: true}, fbids: {type: "IntVector", required: true}});
}, null);
__d("XAdPreferencesNUXControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/ads\/preferences\/nux\/", {type: {type: "String", required: true}});
}, null);
__d("XAdsPreferencesFeedbackControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/ads\/preferences\/feeedback\/", {ad_id: {type: "Int", required: true}, favorite: {type: "Enum", required: true}});
}, null);
__d("AdsPrefs", ["AsyncRequest", "CSS", "DOM", "Event", "tidyEvent", "cx", "csx", "XAdPreferencesInterestsWriteControllerURIBuilder", "XAdPreferencesNUXControllerURIBuilder", "XAdsPreferencesFeedbackControllerURIBuilder"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    function q(u, v) {
        var w = i.scry(u.parentNode, "div._g1j")[0], x = h.hasClass(w, "_2zny") ? 'add' : 'del', y = new n().setInt('ad_id', v).setEnum('action', x).setEnum('type', w.getAttribute('data-type')).setIntVector('fbids', [w.getAttribute('data-fbid')]).getURI();
        new g(y).send();
        h.toggleClass(w, "_2zny");
        return w;
    }

    function r(u, v) {
        h.toggleClass(u, "hidden_elem");
        var w = h.hasClass(u, "hidden_elem") ? 'ad_useful' : 'ad_neutral', x = new p().setInt('ad_id', v).setEnum('favorite', w).getURI(), y = new g(x);
        y.send();
    }

    function s() {
        var u = new o().setString('type', 'interest_nux_ts').getURI();
        new g(u).send();
    }

    var t = {initRHCFeedback: function (u, v, w) {
        k(j.listen(v, 'click', function (x) {
            r(w, u);
            x.kill();
        }));
    }, initSuggestions: function (u, v, w) {
        k(j.listen(v, 'click', function (x) {
            q(x.target, u);
        }));
        if (w)k(j.listen(w, 'click', function () {
            i.scry(v, 'li').forEach(function (x) {
                h.show(x);
            });
            h.hide(w);
        }));
    }, initMatchingInterests: function (u, v, w) {
        var x = i.scry(v, "div._g1j")[0];
        if (x) {
            h.removeClass(x, "_2hg");
        } else return;
        k(j.listen(v, 'click', function (y) {
            q(x, u);
            var z = i.scry(v, "span._58yk")[0];
            if (h.hasClass(x, "_2zny")) {
                h.removeClass(z, 'hidden_elem');
                if (w) {
                    w.subscribe('hide', s);
                    w.setContext(x);
                    w.show();
                    w = null;
                }
            } else h.addClass(z, 'hidden_elem');
        }));
    }, initExpandable: function (u) {
        k(j.listen(u, 'click', function (v) {
            var w = i.scry(u, "div._2fdq")[0], x = i.scry(u, "._4r43")[0], y = i.scry(u, "._1uhj")[0];
            h.toggleClass(x, 'hidden_elem');
            h.toggleClass(y, 'hidden_elem');
            h.toggleClass(w, 'hidden_elem');
        }));
    }, toggleFavorite: function (u) {
        var v = i.find(u.getRoot(), 'img');
        r(v, u.getLabel());
    }};
    e.exports = t;
}, null);
__d("XUIBlock", ["ReactPropTypes", "cx"], function (a, b, c, d, e, f, g, h) {
    var i = {propTypes: {background: g.oneOf(['base-wash', 'light-wash', 'white', 'highlight', 'transparent'])}, getDefaultProps: function () {
        return {background: 'transparent'};
    }, getBackgroundClass: function (j) {
        var k = ((j.background === 'base-wash' ? "_4-u5" : '') + (j.background === 'light-wash' ? ' ' + "_57d8" : '') + (j.background === 'white' ? ' ' + "_4-u8" : '') + (j.background === 'highlight' ? ' ' + "_4-u7" : ''));
        return k;
    }};
    e.exports = i;
}, null);
__d("XUICard.react", ["React", "XUIBlock", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = g.createClass({displayName: 'XUICard', propTypes: h.propTypes, getDefaultProps: h.getDefaultProps, render: function () {
        var l = j("_4-u2", h.getBackgroundClass(this.props));
        return (g.createElement(g.DOM.div, Object.assign({}, this.props, {className: j(this.props.className, l)}), this.props.children));
    }});
    e.exports = k;
}, null);
__d("EntstreamFeedObject", ["Parent", "cx"], function (a, b, c, d, e, f, g, h) {
    var i = {getRoot: function (j) {
        return g.byClass(j, "_5jmm");
    }};
    e.exports = i;
}, null);
__d("EntstreamFeedObjectFollowup", ["CSS", "DOM", "EntstreamFeedObject", "Event", "csx", "cx", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = {getFollowup: function (o) {
        var p = h.scry(o, "._5lum");
        if (!p.length)p = h.scry(o.parentNode, "._5lum");
        return p ? p[0] : null;
    }, initCloseButton: function (o) {
        var p = h.find(o, "._5xsl"), q = j.listen(p, 'click', function () {
            q.remove();
            h.remove(o);
        });
        o.listener = q;
    }, stopListenCloseButton: function (o) {
        if (o.listener)o.listener.remove();
    }, addFollowup: function (o, p, q) {
        var r = g.hasClass(o, "_5pat"), s = h.create('div', {className: "_5lum"});
        if (r) {
            g.addClass(s, "_5pau");
        } else g.addClass(s, "_1f84");
        if (q)g.addClass(s, q);
        if (p) {
            h.appendContent(s, p);
            this.initCloseButton(s);
            h.insertBefore(o, s);
        } else {
            var t = n.getFollowup(o);
            if (t)this.removeFollowup(t);
            h.prependContent(o, s);
        }
        return s;
    }, removeFollowup: function (o) {
        var p = n.getFollowup(o);
        this.stopListenCloseButton(p);
        h.remove(p);
    }, appendToFollowup: function (o, p) {
        var q = i.getRoot(m(o)), r = n.getFollowup(q);
        h.appendContent(r, p);
    }, getFollowupMessage: function (o) {
        var p = h.find(o, "._1f86");
        return p;
    }, replaceFollowupMessage: function (o, p) {
        this.stopListenCloseButton(o);
        var q = n.getFollowupMessage(o);
        h.replace(q, p);
        this.initCloseButton(o);
    }};
    e.exports = n;
}, null);
__d("EntstreamFeedObjectFollow", ["EntstreamFeedObject", "EntstreamFeedObjectFollowup", "Event", "Parent", "cx", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {toggleFollow: function (n, o, p) {
        var q = n.getValue() == 'follow_post' ? p.follow_post : p.unfollow_post, r = g.getRoot(l(o)), s = h.getFollowup(r);
        if (s) {
            h.replaceFollowupMessage(s, q);
        } else {
            s = h.addFollowup(r, q, "_521o") || h.getFollowup(r);
            i.listen(s, 'click', function (event) {
                var t = event.getTarget(), u = "_1f89";
                if (j.byClass(t, u)) {
                    m.toggleFollow(n, o, p);
                    n.toggleMenuItem();
                }
            });
        }
    }};
    e.exports = m;
}, null);
__d("EntstreamFeedObjectHide", ["Event", "CSS", "EntstreamFeedObject", "EntstreamFeedObjectFollowup", "Focus", "TabbableElements", "cx", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = {hide: function (p, q) {
        var r = i.getRoot(n(p));
        j.addFollowup(r, q);
        h.addClass(r, "_i6m");
        o.setFocus(r);
    }, registerUnhide: function (p, q) {
        g.listen(p, 'click', function () {
            if (q)q.send();
            o.unhide(i.getRoot(p));
        });
    }, setFocus: function (p) {
        var q = l.find(p);
        if (q && q[0])k.setWithoutOutline(q[0]);
    }, unhide: function (p) {
        j.removeFollowup(p);
        h.removeClass(p, "_i6m");
        o.setFocus(p);
    }};
    e.exports = o;
}, null);
__d("YouTube", ["CSS", "DOM", "DOMQuery", "Event", "Keys", "LitestandStoryInsertionStatus", "SubscriptionsHandler", "UserAgent_DEPRECATED", "Focus", "copyProperties", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    function r(s, t, u) {
        "use strict";
        var v = new m();
        v.addSubscriptions(j.listen(s, 'load', this.listening.bind(this)), l.registerBlocker(function () {
            return this.playerState === r.STATE_PLAYING;
        }.bind(this)));
        p(this, {iframe: s, autofocus: t, autoplay: u, playerState: r.STATE_UNSTARTED, muted: false, volume: 100, currentTime: 0, timer: null, handler: v});
        if (t)o.set(s);
    }

    r.prototype.id = function () {
        "use strict";
        return this.iframe.id;
    };
    r.prototype.post = function (s) {
        "use strict";
        s.id = this.id();
        this.iframe.contentWindow.postMessage(JSON.stringify(s), '*');
    };
    r.prototype.listening = function () {
        "use strict";
        this.post({event: 'listening'});
        clearTimeout(this.timer);
        this.timer = setTimeout(this.listening.bind(this), 100);
    };
    r.prototype.update = function (s) {
        "use strict";
        if (s.event == 'initialDelivery') {
            clearTimeout(this.timer);
            if ((n.webkit() || n.firefox()) && s.info && s.info.debugText.match(/flashVersion/)) {
                this.addAccessibleButtons();
                if (n.firefox())this.iframe.tabIndex = -1;
            }
        }
        if (s.info)['playerState', 'muted', 'volume', 'currentTime'].forEach(function (t) {
            if (s.info.hasOwnProperty(t))this[t] = s.info[t];
        }.bind(this));
    };
    r.prototype.togglePlay = function () {
        "use strict";
        this.post({event: 'command', func: (this.playerState == r.STATE_PLAYING) ? 'pauseVideo' : 'playVideo'});
    };
    r.prototype.toggleMute = function () {
        "use strict";
        this.post({event: 'command', func: this.muted ? 'unMute' : 'mute'});
    };
    r.prototype.addAccessibleButtons = function () {
        "use strict";
        this.addAccessibleButton('Mute', "_505m", this.toggleMute.bind(this));
        this.addAccessibleButton('Play', "_505n", this.togglePlay.bind(this));
    };
    r.prototype.addAccessibleButton = function (s, t, u) {
        "use strict";
        var v = h.create('button', {'class': t, tabindex: 0}, s);
        h.insertAfter(this.iframe, v);
        this.handler.addSubscriptions(j.listen(v, 'click', u), j.listen(v, 'mouseover', g.hide.bind(null, v)), j.listen(this.iframe, 'mouseout', g.show.bind(null, v)), j.listen(v, 'focus', function () {
            if (!this.autoplay && this.playerState == r.STATE_UNSTARTED) {
                this.post({event: 'command', func: 'playVideo'});
                this.post({event: 'command', func: 'pauseVideo'});
            }
        }.bind(this)), j.listen(v, 'keydown', function (w) {
            switch (w.keyCode) {
                case k.UP:
                case k.DOWN:
                    this.post({event: 'command', func: 'setVolume', args: [this.volume + ((w.keyCode == k.UP) ? 10 : -10)]});
                    w.prevent();
                    break;
                case k.RIGHT:
                case k.LEFT:
                    this.post({event: 'command', func: 'seekTo', args: [this.currentTime + ((w.keyCode == k.RIGHT) ? 10 : -10)]});
                    w.prevent();
                    break;
            }
        }.bind(this)));
        return v;
    };
    r.prototype.destroy = function () {
        "use strict";
        this.handler.release();
        delete r.instances[this.id()];
        if (!Object.keys(r.instances).length)r.handler.remove();
    };
    r.register = function (s, t, u) {
        "use strict";
        if (!window.postMessage)return;
        if (!Object.keys(r.instances).length)r.handler = j.listen(window, 'message', function (w) {
            try {
                var x = JSON.parse(w.data);
                if (r.instances[x.id])r.instances[x.id].update(x);
            } catch (w) {
            }
        });
        var v = new r(i.find(s, 'iframe'), t, u);
        r.instances[v.id()] = v;
    };
    p(r, {STATE_UNSTARTED: -1, STATE_PLAYING: 1, instances: {}, handler: null});
    e.exports = r;
}, null);
__d("EntstreamHomeFeedObjectHide", ["AsyncRequest", "CSS", "DOM", "EntstreamFeedObject", "EntstreamFeedObjectHide", "Event", "TrackingNodes", "YouTube", "csx", "cx", "ge", "tx", "$"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t = {stopVideo: function (u) {
        var v = s(u), w = i.find(v, "^._5jmm"), x = i.scry(w, 'iframe');
        for (var y = 0; y < x.length; y++) {
            var z = n.instances[i.getID(x[y])];
            if (z && (z.playerState === n.STATE_PLAYING))z.togglePlay();
        }
        var aa = i.scry(w, 'video');
        for (var ba = 0; ba < aa.length; ba++)if (('paused' in aa[ba]) && !aa[ba].paused)if (typeof aa[ba].pause === 'function')aa[ba].pause();
    }, hide: function (u, v, w, x) {
        t.stopVideo(u);
        var y = j.getRoot(q(u)), z = h.hasClass(y, "_5pat"), aa;
        if (z && w == 'afrostart') {
            aa = '';
        } else {
            var ba = w == 'hide' || w == 'afrostart' ? "\u041d\u043e\u0432\u043e\u0441\u0442\u044c \u0441\u043a\u0440\u044b\u0442\u0430 \u0438\u0437 \u0432\u0430\u0448\u0435\u0439 \u041b\u0435\u043d\u0442\u044b." : "\u042d\u0442\u0430 \u043d\u043e\u0432\u043e\u0441\u0442\u044c \u0431\u044b\u043b\u0430 \u043e\u0442\u043c\u0435\u0447\u0435\u043d\u0430 \u043a\u0430\u043a \u0441\u043f\u0430\u043c.", ca = w == 'hide' || w == 'afrostart' ? "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c" : "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c", da = m.getTrackingInfo(m.types.UNHIDE_LINK), ea = i.create('a', {href: '#', 'data-ft': da}, ca), fa = {};
            if (v)fa.token = v;
            if (x)fa.hideable_token = x;
            var ga = new g().setURI('/ajax/entstream/home/story/unhide').setMethod('POST').setData(fa).setRelativeTo(ea);
            k.registerUnhide(ea, ga);
            aa = i.create('div', {'class': "_1f86"}, [ba, ' ', ea]);
        }
        k.hide(u, aa);
    }, registerHide: function (u, v, w, x) {
        l.listen(u, 'click', function () {
            t.hide(u.getAttribute('id'), v, w, x);
        });
    }};
    e.exports = t;
}, null);
__d("MenuTogglingItem", ["DOM", "MenuItem"], function (a, b, c, d, e, f, g, h) {
    for (var i in h)if (h.hasOwnProperty(i))k[i] = h[i];
    var j = h === null ? null : h.prototype;
    k.prototype = Object.create(j);
    k.prototype.constructor = k;
    k.__superConstructor__ = h;
    function k() {
        "use strict";
        if (h !== null)h.apply(this, arguments);
    }

    k.prototype.handleClick = function () {
        "use strict";
        this.toggleMenuItem();
        return j.handleClick.call(this);
    };
    k.prototype.toggleMenuItem = function () {
        "use strict";
        this._swap('ajaxify', 'toggleAjaxify');
        this._swap('value', 'toggleValue');
        this._toggleItemText();
    };
    k.prototype.setValue = function (l) {
        "use strict";
        this._data.value = l;
    };
    k.prototype._toggleItemText = function () {
        "use strict";
        var l = this._anchor;
        this._swap('markup', 'toggleMarkup');
        g.replace(l, this._renderItemContent());
    };
    k.prototype._swap = function (l, m) {
        "use strict";
        var n = this._data[l];
        this._data[l] = this._data[m];
        this._data[m] = n;
    };
    e.exports = k;
}, null);
__d("EntstreamHomeFeedObjectOptionsMenu", ["AdsPrefs", "CSS", "DOM", "EntstreamHomeFeedObjectHide", "EntstreamFeedObject", "EntstreamFeedObjectFollow", "MenuTogglingItem", "UFICentralUpdates", "UFIConstants", "cx", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    function r(s, t, u, v, w, x) {
        s.subscribe('itemclick', function (y, z) {
            switch (z.item.getValue()) {
                case 'hide':
                case 'markspam':
                case 'afrostart':
                    j.hide(t, u, z.item.getValue(), w);
                    break;
                case 'afro_direct_action':
                    var aa = z.item.getRoot().getAttribute('data-optimistic-hide');
                    if (aa) {
                        var ba = i.create('div', {className: "_5lum"});
                        i.appendContent(ba, z.item.getRoot().getAttribute('data-action-in-progress-string'));
                        i.insertBefore(k.getRoot(q(t)).firstChild, ba);
                        h.addClass(k.getRoot(q(t)), "_i6m");
                    }
                    break;
                case 'follow_post':
                case 'unfollow_post':
                    l.toggleFollow(z.item, t, v);
                    break;
                case 'ad_useful':
                case 'ad_neutral':
                    g.toggleFavorite(z.item);
                    y.kill();
                    break;
            }
        }.bind(this));
        s.subscribe('show', function () {
            s.forEachItem(function (y) {
                y.onShow();
            });
        });
        n.subscribe('update-actions', function (y, z) {
            if (z.payloadsource === o.UFIPayloadSourceType.USER_ACTION) {
                var aa = z.actions || [];
                for (var ba = 0; ba < aa.length; ba++)if (aa[ba].actiontype === o.UFIActionType.ADD_COMMENT_ACTION) {
                    if (aa[ba].feedbackfbid != x)return;
                    s.getRoot();
                    s.forEachItem(function (ca) {
                        if (ca instanceof m && ca.getValue() === 'unfollow_post')ca.handleClick();
                    });
                }
            }
        });
    }

    e.exports = r;
}, null);
__d("BookmarkFeedSorter", ["Run"], function (a, b, c, d, e, f, g) {
    var h, i = {init: function (j) {
        h = j;
        g.onLeave(function () {
            h = null;
        });
    }, setChecked: function (j) {
        if (h)h.setValue(j);
    }};
    e.exports = i;
}, null);
__d("MercuryLeftNav", ["Arbiter", "MessagingTag", "NavigationMessage", "MercuryThreadInformer", "MercuryUnreadState"], function (a, b, c, d, e, f, g, h, i) {
    var j = b('MercuryThreadInformer').get(), k = b('MercuryUnreadState').get(), l = false;

    function m() {
        var o = k.getUnreadCount(h.INBOX);
        g.inform(i.NAVIGATION_COUNT_UPDATE, {key: 'inbox', hide: true});
        g.inform(i.NAVIGATION_COUNT_UPDATE, {key: 'inbox', count: o});
    }

    var n = {bootstrap: function () {
        if (l)return;
        j.subscribe('unread-updated', m);
        l = true;
    }};
    e.exports = n;
}, null);
__d("KeyboardShortcuts", ["KeyEventController", "Layer", "ModalLayer"], function (a, b, c, d, e, f, g, h, i) {
    function j(l, m, n) {
        "use strict";
        this.key = l;
        this.handler = m;
        this.filter = n;
        this.register();
    }

    j.prototype.register = function () {
        "use strict";
        this.token = g.registerKey(this.key, this.handler, this.filter);
    };
    j.prototype.remove = function () {
        "use strict";
        this.token.remove();
    };
    var k = {_tokens: [
        []
    ], register: function (l, m, n) {
        n = n || {};
        var o = n.allowDefault ? m : function (event, s) {
            m.apply(this, arguments);
            event.prevent();
        }, p = n.baseFilters || [g.defaultFilter], q = function (event, s) {
            for (var t = 0, u = p.length; t < u; t++)if (!p[t](event, s))return false;
            return !n.filter || n.filter(event, s);
        }, r = new j(l, o, q);
        this._tokens[this._tokens.length - 1].push(r);
        return r;
    }, init: function () {
        h.subscribe('show', function (l, m) {
            if (m.hasBehavior(i))this.pushLayer();
        }.bind(this));
        h.subscribe('hide', function (l, m) {
            if (m.hasBehavior(i))this.popLayer();
        }.bind(this));
    }, pushLayer: function () {
        var l = this._tokens[this._tokens.length - 1];
        l && l.forEach(function (m) {
            m.remove();
        });
        this._tokens.push([]);
    }, popLayer: function () {
        var l = this._tokens.length - 1;
        if (l < 0)return;
        var m = this._tokens[l];
        m.forEach(function (o) {
            o.remove();
        });
        this._tokens.pop();
        var n = this._tokens[l - 1];
        n && n.forEach(function (o) {
            o.register();
        });
    }};
    k.init();
    e.exports = k;
}, null);
__d("collectSubtreeData", [], function (a, b, c, d, e, f) {
    function g(i, j, k, l, m) {
        if (i.offsetWidth === 0 && i.offsetHeight === 0)return m;
        var n = {};
        if (i.getAttribute)for (r = 0; r < j.length; r++) {
            t = j[r];
            var o = i.getAttribute(k[t]);
            if (o) {
                n[t] = {};
                var p = JSON.parse(o);
                for (var q in l)if (p[q] !== undefined) {
                    n[t][q] = true;
                    if (m[t] === undefined)m[t] = {};
                    if (m[t][q] === undefined)m[t][q] = [];
                    if (l[q].length > 0)m[t][q].push(l[q]);
                    m[t][q].push('(' + p[q]);
                }
            }
        }
        for (var r = 0; r < i.childNodes.length; r++) {
            var s = i.childNodes[r];
            g(s, j, k, l, m);
        }
        for (var t in n)for (var u in n[t]) {
            var v = m[t][u][m[t][u].length - 1];
            if (v.length > 0 && v.charAt(0) == '(') {
                m[t][u][m[t][u].length - 1] = v.substr(1);
            } else m[t][u].push(')');
        }
        return m;
    }

    function h(i, j) {
        var k = {};
        for (var l = 0; l < j.length; ++l)k[j[l]] = 'data-' + j[l];
        var m = {tn: "", "tn-debug": ","}, n = {};
        g(i, j, k, m, n);
        for (var o in n)for (var p in n[o])n[o][p] = n[o][p].join('');
        return n;
    }

    e.exports = h;
}, null);
__d("SaveState", [], function (a, b, c, d, e, f) {
    var g = {SAVING: 'saving', SAVED: 'saved', UNSAVING: 'unsaving', UNSAVED: 'unsaved'};
    e.exports = g;
}, null);
__d("SaveStateHandler", ["Run", "SaveState"], function (a, b, c, d, e, f, g, h) {
    var i = null;

    function j() {
        "use strict";
        this.$SaveStateHandler0 = {};
        this.$SaveStateHandler1 = {};
        g.onLeave(function () {
            i = null;
        });
    }

    j.prototype.addListener = function (k, l) {
        "use strict";
        k.forEach(function (m) {
            if (!this.$SaveStateHandler0[m])this.$SaveStateHandler0[m] = [];
            this.$SaveStateHandler0[m].push(l);
        }, this);
    };
    j.prototype.setState = function (k, l) {
        "use strict";
        k.forEach(function (m) {
            this.$SaveStateHandler1[m] = l;
            if (!this.$SaveStateHandler0[m])return;
            var n = this.$SaveStateHandler0[m];
            n.forEach(function (o) {
                try {
                    o.call(window, l, m);
                } catch (p) {
                }
            });
        }, this);
    };
    j.prototype.getState = function (k) {
        "use strict";
        var l = {};
        k.forEach(function (m) {
            l[m] = this.$SaveStateHandler1[m];
        }, this);
        return l;
    };
    j.$SaveStateHandler2 = function () {
        "use strict";
        if (!i)i = new j();
        return i;
    };
    j.listen = function (k, l) {
        "use strict";
        this.$SaveStateHandler2().addListener(k, l);
    };
    j.getState = function (k) {
        "use strict";
        this.$SaveStateHandler2().getState(k);
    };
    j.saving = function (k) {
        "use strict";
        this.$SaveStateHandler2().setState(k, h.SAVING);
    };
    j.saved = function (k) {
        "use strict";
        this.$SaveStateHandler2().setState(k, h.SAVED);
    };
    j.unsaving = function (k) {
        "use strict";
        this.$SaveStateHandler2().setState(k, h.UNSAVING);
    };
    j.unsaved = function (k) {
        "use strict";
        this.$SaveStateHandler2().setState(k, h.UNSAVED);
    };
    j.isSaveAction = function (k) {
        "use strict";
        var l = this.$SaveStateHandler2().getState(k);
        for (var m in l) {
            var n = l[m];
            if (n == h.UNSAVED || n == h.UNSAVING)return true;
        }
        return false;
    };
    e.exports = j;
}, null);
__d("SaveCaretMenuItem", ["Banzai", "CSS", "DOM", "EntstreamFeedObject", "EntstreamFeedObjectFollowup", "Event", "MenuItem", "SaveState", "SaveStateHandler", "cx", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = 'saved_for_later:caret_action', s = 'click', t = 'imp';
    for (var u in m)if (m.hasOwnProperty(u))w[u] = m[u];
    var v = m === null ? null : m.prototype;
    w.prototype = Object.create(v);
    w.prototype.constructor = w;
    w.__superConstructor__ = m;
    function w(x) {
        "use strict";
        m.call(this, x);
        this._updateData();
        this.getRoot();
        l.listen(this._anchor, 'error', this.handleError.bind(this));
        o.listen(x.ogobjectids, function (y) {
            this._updateData();
            this._doRender(y);
        }.bind(this));
    }

    w.prototype.handleClick = function () {
        "use strict";
        var x = v.handleClick.call(this), y = this._data.logdata;
        g.post(r, {action: s, collection_id: y.collection_id, surface: y.surface, story_id: y.story_id, is_save: this._data.isSaveAction, is_multi: y.is_multi});
        var z = j.getRoot(q(this._data.storydomid));
        if (this._data.isSaveAction) {
            o.saving(this._data.ogobjectids);
            z && k.addFollowup(z, this._data.savefollowupmarkup, "_521o");
        } else {
            o.unsaving(this._data.ogobjectids);
            var aa = k.getFollowup(z);
            aa && k.removeFollowup(z);
        }
        return x;
    };
    w.prototype.handleError = function () {
        "use strict";
        if (this._data.isSaveAction) {
            o.saved(this._data.ogobjectids);
        } else o.unsaved(this._data.ogobjectids);
    };
    w.prototype._updateData = function () {
        "use strict";
        this._data.isSaveAction = o.isSaveAction(this._data.ogobjectids);
        if (this._data.isSaveAction) {
            this._data.markup = this._data.savemarkup;
            this._data.ajaxify = this._data.saveajaxify;
        } else {
            this._data.markup = this._data.unsavemarkup;
            this._data.ajaxify = this._data.unsaveajaxify;
        }
    };
    w.prototype._doRender = function (x) {
        "use strict";
        if (!this._root)return;
        switch (x) {
            case n.SAVING:
            case n.UNSAVING:
                h.addClass(this._root, "_5arm");
                setTimeout(this.disable.bind(this), 10);
                break;
            case n.SAVED:
            case n.UNSAVED:
                h.removeClass(this._root, "_5arm");
                setTimeout(this.enable.bind(this), 10);
                break;
        }
        i.replace(this._anchor, this._renderItemContent());
        l.listen(this._anchor, 'error', this.handleError.bind(this));
    };
    w.prototype.onShow = function () {
        "use strict";
        var x = this._data.logdata;
        g.post(r, {action: t, collection_id: x.collection_id, surface: x.surface, story_id: x.story_id, is_save: this._data.isSaveAction, is_multi: x.is_multi});
    };
    e.exports = w;
}, null);
__d("FbFeedAttachmentRelatedShare", ["Arbiter", "AttachmentRelatedShareConstants", "DOM", "Event", "tidyEvent", "csx"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {loadRelatedAttachment: function (n, o) {
        k(j.listen(n, 'click', function () {
            g.inform(h.ARTICLE_CLICK, {attachment: n, global_share_id: o});
        }));
    }, loadRelatedVideoAttachment: function (n, o) {
        k(j.listen(n, 'click', function () {
            g.inform(h.VIDEO_CLICK, {attachment: n, global_share_id: o});
        }));
    }, loadRelatedGameAttachment: function (n, o) {
        k(j.listen(n, 'click', function () {
            g.inform(h.GAME_CLICK, {attachment: n, global_share_id: o});
        }));
    }, loadRelatedAttachmentForStream: function (n) {
        var o = function (event, p) {
            var q = event.getTarget();
            if (q.getAttribute('target') !== '_blank')return;
            var r = "^div._5pbx", s = "^div._5pc9", t = i.scry(q, r)[0] || i.scry(q, s)[0];
            if (!t)return;
            g.inform(h.ARTICLE_CLICK, {attachment: t, global_share_id: 0, link_url: q.getAttribute('href'), is_right_click: p});
        };
        k(j.listen(n, 'click', function (event) {
            o(event, false);
        }));
        k(j.listen(n, 'mousedown', function (event) {
            if (event.which == 3 || event.button == 2)o(event, true);
        }));
    }, closeButton: function (n, o) {
        k(j.listen(n, 'click', function () {
            i.remove(o);
        }));
    }};
    e.exports = m;
}, null);