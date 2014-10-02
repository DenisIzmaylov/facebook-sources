/*!CK:2588927185!*//*1412036058,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["dDlQa"]);
}

__d("BlackbirdUpsellConstants", [], function (a, b, c, d, e, f) {
    e.exports = {ACTION_EDUCATE: "educate", ACTION_UPSELL: "upsell", CLICK_TYPE_DISMISS_PROMO: "dismiss_promo", CLICK_TYPE_ENABLE_CHAT: "enable_chat", CLICK_TYPE_OPEN_SETTINGS: "open_settings"};
}, null);
__d("ChatSidebarSections", [], function (a, b, c, d, e, f) {
    e.exports = {MORE_ONLINE_FRIENDS: "more_online_friends", MORE_ONLINE_COWORKERS: "more_online_coworkers", OFFLINE_USERS: "offline_users", ORDERED_LIST: "ordered_list", ORDERED_COWORKERS: "ordered_coworkers", TYPEAHEAD: "typeahead"};
}, null);
__d("GenderConst", [], function (a, b, c, d, e, f) {
    e.exports = {NOT_A_PERSON: 0, FEMALE_SINGULAR: 1, MALE_SINGULAR: 2, FEMALE_SINGULAR_GUESS: 3, MALE_SINGULAR_GUESS: 4, MIXED_SINGULAR: 5, MIXED_PLURAL: 5, NEUTER_SINGULAR: 6, UNKNOWN_SINGULAR: 7, FEMALE_PLURAL: 8, MALE_PLURAL: 9, NEUTER_PLURAL: 10, UNKNOWN_PLURAL: 11, UNKNOWN: 0};
}, null);
__d("AsyncLoader", ["copyProperties", "AsyncRequest", "BaseAsyncLoader"], function (a, b, c, d, e, f, g, h, i) {
    function j(k, l) {
        this._endpoint = k;
        this._type = l;
    }

    g(j.prototype, i.prototype);
    j.prototype.send = function (k, l, m, n, o) {
        new h(k).setData({ids: l}).setHandler(n).setErrorHandler(o).setAllowCrossPageTransition(true).setMethod('GET').setReadOnly(true).send();
    };
    e.exports = j;
}, null);
__d("BlackbirdUpsell", ["Event", "Arbiter", "AsyncRequest", "LegacyContextualDialog", "DOM", "LayerDestroyOnHide", "LayerHideOnTransition", "PresencePrivacy", "copyProperties", "BlackbirdUpsellConfig", "BlackbirdUpsellConstants", "BlackbirdUpsellTemplates"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = '/ajax/chat/blackbird/update_clicks.php', t = '/ajax/chat/blackbird/update_impressions.php', u = '/ajax/chat/blackbird/dismiss.php', v = 235, w = null, x = null, y = false, z = false;

    function aa() {
    }

    o(aa, {shouldShow: function () {
        if (this._dialogDismissed)return false;
        if (this.isEducation()) {
            return !p.EducationDismissed && p.EducationImpressions < p.EducationImpressionLimit;
        } else return !!p.UpsellGK && !p.UpsellDismissed && p.UpsellImpressions < p.UpsellImpressionLimit && p.FriendCount >= p.UpsellMinFriendCount;
    }, isEducation: function () {
        return p.TimeOffline <= p.EducationTimeOfflineThresdhold;
    }, getOfflineContent: function () {
        if (this.isEducation()) {
            return this._getEducationContent();
        } else return this._getUpsellContent();
    }, _getEducationContent: function () {
        ga();
        var ka = r[':fb:chat:blackbird:offline-educate'].build(), la = ka.getNode('chatSettingsButton');
        g.listen(la, 'click', function () {
            h.inform('chat/advanced-settings-dialog-opened');
            ja(q.CLICK_TYPE_OPEN_SETTINGS);
            da();
        });
        return ka.getRoot();
    }, _getUpsellContent: function () {
        fa();
        var ka = r[':fb:chat:blackbird:upsell'].build(), la = ka.getNode('chatSettingsButton');
        g.listen(la, 'click', function () {
            h.inform('chat/advanced-settings-dialog-opened');
            ia(q.CLICK_TYPE_OPEN_SETTINGS);
            ca();
        });
        var ma = ka.getNode('enableChatButton');
        g.listen(ma, 'click', function () {
            ia(q.CLICK_TYPE_ENABLE_CHAT);
            ca();
        });
        return ka.getRoot();
    }, getBlackbirdContent: function (ka) {
        ga();
        switch (ka) {
            case n.ONLINE:
                return r[':fb:chat:blackbird:most-friends-educate'].build().getRoot();
            case n.OFFLINE:
                return r[':fb:chat:blackbird:some-friends-educate'].build().getRoot();
        }
    }, showOfflineDialog: function (ka) {
        this.showDialog(ka, this.getOfflineContent.bind(this));
    }, showBlackbirdDialog: function (ka, la) {
        this.showDialog(ka, this.getBlackbirdContent.bind(null, la));
    }, showDialog: function (ka, la) {
        !w && this._constructDialog();
        k.setContent(x, la());
        w.setContext(ka);
        w.show();
    }, hide: function () {
        if (w && w.isShown())w.hide();
    }, dismiss: function () {
        this.hide();
        if (this.isEducation()) {
            da();
        } else ca();
    }, registerDismissClick: function () {
        if (this.isEducation()) {
            ja(q.CLICK_TYPE_DISMISS_PROMO);
        } else ia(q.CLICK_TYPE_DISMISS_PROMO);
    }, isVisible: function () {
        return z && !y;
    }, _constructDialog: function () {
        var ka = r[':fb:chat:blackbird:dialog-frame'].build();
        x = ka.getNode('dialogContent');
        w = new j();
        w.init(ka.getRoot());
        w.setPosition('above').setWidth(v).setFixed(true).disableBehavior(l).disableBehavior(m);
        g.listen(ka.getNode('dialogCloseButton'), 'click', this.dismiss.bind(this));
        g.listen(ka.getNode('dialogCloseButton'), 'click', this.registerDismissClick.bind(this));
    }});
    function ba(ka, la) {
        if (!y && z) {
            y = true;
            n.inform('privacy-user-presence-changed');
            var ma = new i(u);
            ma.setData({source: ka, impressions: la, time_offline: p.TimeOffline});
            ma.setErrorHandler(function () {
                y = false;
            });
            ma.send();
        }
    }

    function ca() {
        ba(q.ACTION_UPSELL, p.UpsellImpressions);
    }

    function da() {
        ba(q.ACTION_EDUCATE, p.EducationImpressions);
    }

    function ea(ka, la) {
        if (!z) {
            z = true;
            var ma = new i(t);
            ma.setData({action: ka, impressions: la, time_offline: p.TimeOffline});
            ma.setErrorHandler(function () {
                z = false;
            });
            ma.send();
        }
    }

    function fa() {
        ea(q.ACTION_UPSELL, p.UpsellImpressions);
    }

    function ga() {
        ea(q.ACTION_EDUCATE, p.EducationImpressions);
    }

    function ha(ka, la, ma, na) {
        var oa = new i(s);
        oa.setData({action: ka, impressions: ma, source: la, time_offline: na});
        oa.send();
    }

    function ia(ka) {
        ha(ka, q.ACTION_UPSELL, p.UpsellImpressions, p.TimeOffline);
    }

    function ja(ka) {
        ha(ka, q.ACTION_EDUCATE, p.EducateImpressions, p.TimeOffline);
    }

    h.subscribe('chat/advanced-settings-dialog-opened', aa.dismiss.bind(aa));
    h.subscribe('chat-visibility/go-online', aa.dismiss.bind(aa));
    h.subscribe('chat-visibility/go-offline', aa.dismiss.bind(aa));
    e.exports = aa;
}, null);
__d("Chat", ["Arbiter"], function (a, b, c, d, e, f, g) {
    var h = {buddyListNub: 'buddylist-nub/initialized', sidebar: 'sidebar/initialized'};

    function i(k, l) {
        g.subscribe(h[k], function (event, m) {
            l(m);
        });
    }

    var j = {openBuddyList: function () {
        i('buddyListNub', function (k) {
            k.show();
            i('sidebar', function (l) {
                l.enable();
            });
        });
    }, closeBuddyList: function () {
        i('buddyListNub', function (k) {
            k.hide();
        });
    }, toggleSidebar: function () {
        i('sidebar', function (k) {
            k.toggle();
        });
    }};
    a.Chat = e.exports = j;
}, 3);
__d("ChatHovercard", ["Arbiter", "AsyncLoader", "Hovercard", "JSLogger", "debounce"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = 5, m = new h('/ajax/chat/hovercard/sidebar.php', 'hover'), n = j.create('chat_hovercard');
    g.subscribe('Hovercard/dirty', m.reset.bind(m));
    function o(s, t) {
        m.get(s, function (u) {
            setTimeout(function () {
                if (!u) {
                    n.error('fetch_failure', {id: s});
                    return;
                }
                var v = i.getDialog(u);
                if (!v) {
                    n.error('no_hovercard', {id: s, endpoint: u});
                    return;
                }
                if (s == t.getActiveID())t.showHovercard(s, v);
            }, 0);
        });
    }

    function p(s, t) {
        var u = [];

        function v(y) {
            if (y >= 0 && y < s.length)u.push(s[y]);
        }

        var w = s.indexOf(t);
        if (w > -1) {
            v(w);
            for (var x = 1; x < l; x++) {
                v(w + x);
                v(w - x);
            }
        }
        return u.filter(function (y) {
            return y;
        });
    }

    function q(s, t) {
        var u = t.getActiveID();
        if (u) {
            var v = s.getShowingUsers(), w = p(v, u);
            m.get(w, function () {
            });
        }
    }

    function r(s) {
        var t = s.getHoverController();
        t.registerDefault(o);
        t.subscribe('hover', k(q.bind(null, s, t), 100));
    }

    e.exports = r;
}, null);
__d("ChatOrderedListHover", ["ArbiterMixin", "CSS", "ErrorUtils", "Event", "LayerHideOnBlur", "Parent", "copyProperties", "cx", "mixin", "setTimeoutAcrossTransitions", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    function r(x) {
        h.addClass(x, 'fetching');
    }

    function s(x) {
        h.removeClass(x, 'fetching');
    }

    var t = o(g);
    for (var u in t)if (t.hasOwnProperty(u))w[u] = t[u];
    var v = t === null ? null : t.prototype;
    w.prototype = Object.create(v);
    w.prototype.constructor = w;
    w.__superConstructor__ = t;
    function w(x) {
        "use strict";
        this._orderedList = x;
        this._root = x.getRoot();
        j.listen(this._root, 'mouseover', this._mouseOver.bind(this));
        j.listen(this._root, 'mouseleave', this._mouseLeave.bind(this));
        x.subscribe('click', q(this._hide, this));
    }

    w.prototype._mouseOver = function (event) {
        "use strict";
        if (this._paused)return;
        var x = event.getTarget(), y = l.byClass(x, "_42fz") || l.byClass(x, "_5a58");
        y && this._setActiveItem(y);
    };
    w.prototype._mouseLeave = function (event) {
        "use strict";
        this._setActiveItem(null);
    };
    w.prototype._clearTimeouts = function () {
        "use strict";
        this._showTimeout && clearTimeout(this._showTimeout);
        this._showTimeout = null;
        this._hideTimeout && clearTimeout(this._hideTimeout);
        this._hideTimeout = null;
    };
    w.prototype._hide = function () {
        "use strict";
        if (this._showingDialog) {
            this._showingDialog.hide();
            this._showingDialog = null;
            this._showingID = null;
        }
    };
    w.prototype._show = function () {
        "use strict";
        var x = this.getActiveID(), y = false;
        if (this._defaultHandler) {
            y = true;
            i.applyWithGuard(this._defaultHandler, {}, [x, this]);
        }
        if (y && this._showingID != this.getActiveID())r(this._activeItem);
    };
    w.prototype._setActiveItem = function (x) {
        "use strict";
        if (x != this._activeItem) {
            this._clearTimeouts();
            this._activeItem && s(this._activeItem);
            this._activeItem = null;
            var y = x ? 0 : 100;
            this._hideTimeout = p(function () {
                if (this.getActiveID() != this._showingID)this._hide();
            }.bind(this), y);
            if (x) {
                this._activeItem = x;
                var z = y + 500;
                this._showTimeout = p(function () {
                    this._show();
                }.bind(this), z);
                this.inform('hover');
            } else this.inform('leave');
        }
    };
    w.prototype.registerDefault = function (x) {
        "use strict";
        this._defaultHandler = x;
    };
    w.prototype.getActiveID = function () {
        "use strict";
        var x = this._activeItem && this._orderedList.getUserForNode(this._activeItem);
        return x || null;
    };
    w.prototype.showHovercard = function (x, y) {
        "use strict";
        if (x == this.getActiveID() && x != this._showingID) {
            this._clearTimeouts();
            s(this._activeItem);
            this._hide();
            this._showingDialog = y;
            this._showingID = x;
            var z = y.subscribe('mouseenter', this._setActiveItem.bind(this, this._activeItem)), aa = y.subscribe('mouseleave', function () {
                z.unsubscribe();
                this._setActiveItem(null);
            }.bind(this)), ba = y.subscribe('hide', function () {
                this.inform('hovercard_hide');
                z.unsubscribe();
                aa.unsubscribe();
                ba.unsubscribe();
            }.bind(this));
            y.enableBehavior(k).setContext(this._activeItem).setPosition('left').show();
            this.inform('hovercard_show');
        }
    };
    m(w.prototype, {_root: null, _activeItem: null, _hideTimeout: null, _showTimeout: null, _showingDialog: null, _showingID: null, _defaultHandler: null});
    e.exports = w;
}, null);
__d("ChatSidebarConstants", ["mergeInto"], function (a, b, c, d, e, f, g) {
    var h = {LITESTAND_CLASSIC_SIZE: 32, IMAGE_SIZE: 28};
    g(h, {getImageSize: function (i) {
        if (i === false)return h.IMAGE_SIZE;
        return h.LITESTAND_CLASSIC_SIZE;
    }, getItemHeight: function (i) {
        if (i === false)return h.IMAGE_SIZE + 4;
        return h.LITESTAND_CLASSIC_SIZE + 4;
    }});
    e.exports = h;
}, null);
__d("ChatQuietLinks", ["Event", "DOM", "UserAgent_DEPRECATED", "DataStore", "Parent"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {}, m = {silenceLinks: function (q) {
        n(q, this.removeEmptyHrefs.bind(this));
    }, nukeLinks: function (q) {
        n(q, this.removeAllHrefs.bind(this));
    }, removeEmptyHrefs: function (q) {
        o(q, function (r) {
            return !r || r === '#';
        });
    }, removeAllHrefs: function (q) {
        o(q);
    }};

    function n(q, r) {
        var s = !!i.chrome(), t = !!i.chrome() || i.ie() >= 9 || i.firefox() >= 4;
        if (l[h.getID(q)])return;
        l[h.getID(q)] = true;
        if (!t)return;
        if (!s) {
            r && r(q);
            return;
        }
        g.listen(q, 'mouseover', function u(v) {
            var w = k.byTag(v.getTarget(), 'a');
            if (w) {
                var x = w.getAttribute('href');
                if (p(x)) {
                    j.set(w, 'stashedHref', w.getAttribute('href'));
                    w.removeAttribute('href');
                }
            }
        });
        g.listen(q, 'mouseout', function u(v) {
            var w = k.byTag(v.getTarget(), 'a'), x = w && j.remove(w, 'stashedHref');
            if (p(x))w.setAttribute('href', x);
        });
        g.listen(q, 'mousedown', function (u) {
            if (!u.isDefaultRequested())return true;
            var v = k.byTag(u.getTarget(), 'a'), w = v && j.get(v, 'stashedHref');
            if (p(w))v.setAttribute('href', w);
        });
    }

    function o(q, r) {
        var s = h.scry(q, 'a');
        if (r)s = s.filter(function (t) {
            return r(t.getAttribute('href'));
        });
        s.forEach(function (t) {
            t.removeAttribute('href');
            t.setAttribute('tabindex', 0);
        });
    }

    function p(q) {
        return q && q !== '#';
    }

    e.exports = m;
}, null);
__d("ChatSidebarItem.react", ["AvailableListConstants", "ChatConfig", "ChatSidebarConstants", "Image.react", "Link.react", "React", "SplitImage.react", "cx", "ix"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = 9, q = l.createClass({displayName: 'ChatSidebarItem', propTypes: {birthday: l.PropTypes.bool, context: l.PropTypes.string, detailedStatus: l.PropTypes.string, href: l.PropTypes.object, imageSize: l.PropTypes.number, name: l.PropTypes.string, onClick: l.PropTypes.func, status: l.PropTypes.number, statusTime: l.PropTypes.string, unreadCount: l.PropTypes.number}, render: function () {
        var r = (("_55ln") + (this.props.context ? ' ' + "_55lo" : '') + (this.props.unreadCount ? ' ' + "_5bom" : ''));
        return (l.createElement(k, {className: r, href: this.props.href, onClick: this.props.onClick, rel: "ignore"}, l.createElement(l.DOM.div, {className: "_55lp"}, l.createElement(l.DOM.div, {className: "_56p9"}, this.renderImage(), l.createElement(l.DOM.div, {className: "_568w"})), l.createElement(l.DOM.div, {className: "_5bon"}, this.renderBirthday(), this.renderUnreadCount(), this.renderStatus()), l.createElement(l.DOM.div, {className: "_55lr"}, this.props.name), l.createElement(l.DOM.div, {className: "_55ls"}, this.props.context))));
    }, renderImage: function () {
        var r = this.props.imageSize || i.IMAGE_SIZE;
        return l.createElement(m, {size: r, srcs: this.props.images});
    }, renderUnreadCount: function () {
        var r = this.props.unreadCount;
        if (!r)return null;
        var s = (("_5boo") + (r > p ? ' ' + "_5bop" : ''));
        if (r > p)r = p + '+';
        return (l.createElement(l.DOM.div, {className: s}, r));
    }, renderStatus: function () {
        var r = this.getStatusSrc();
        if (!r && !this.props.statusTime)return null;
        var s = r ? l.createElement(j, {className: "_568_", src: r}) : null;
        return (l.createElement(l.DOM.div, {className: "_568z"}, l.createElement(l.DOM.div, {className: "_568-"}, this.props.statusTime), this.renderDetailedPresence(), s));
    }, renderDetailedPresence: function () {
        if (this.props.unreadCount)return null;
        return (l.createElement(l.DOM.div, {className: "_5t35"}, this.props.detailedStatus));
    }, renderBirthday: function () {
        if (!this.props.birthday)return null;
        var r = o('/images/gifts/icons/cake_icon.png');
        if (h.get('gray_cake'))r = o('/images/chat/sidebar/livebar/divebar_cake.png');
        return (l.createElement(j, {className: "_5dv3", src: r}));
    }, getStatusSrc: function () {
        switch (this.props.status) {
            case g.ACTIVE:
                return o('/images/litestand_classic/sidebar/online.png');
            case g.MOBILE:
                return o('/images/litestand_classic/sidebar/pushable.png');
        }
        return null;
    }});
    e.exports = q;
}, null);
__d("ChatSidebarUser.react", ["ChatOpenTab", "ChatSidebarItem.react", "WebMessengerPermalinkConstants", "React"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = j.createClass({displayName: 'ChatSidebarUser', propTypes: {birthday: j.PropTypes.bool, detailedStatus: j.PropTypes.string, image: j.PropTypes.string, imageSize: j.PropTypes.number, name: j.PropTypes.string, sectionName: j.PropTypes.string.isRequired, slot: j.PropTypes.number, status: j.PropTypes.number, statusTime: j.PropTypes.string, unreadCount: j.PropTypes.number, userID: j.PropTypes.string.isRequired}, _openTab: function (event) {
        g.openUserTab(this.props.userID, this.props.sectionName, {global_slot: this.props.slot});
        return event.preventDefault();
    }, render: function () {
        var l = i.getURIPathForIDOrVanity(this.props.userID);
        return (j.createElement(h, {onClick: this._openTab, href: {url: l}, imageSize: this.props.imageSize, images: this.props.image, name: this.props.name, status: this.props.status, birthday: this.props.birthday, statusTime: this.props.statusTime, detailedStatus: this.props.detailedStatus, context: this.props.context, unreadCount: this.props.unreadCount}));
    }});
    e.exports = k;
}, null);
__d("ChatUnreadCount", ["ArbiterMixin", "copyProperties", "MercuryThreadInformer", "MercuryThreads"], function (a, b, c, d, e, f, g, h) {
    var i = b('MercuryThreadInformer').get(), j = b('MercuryThreads').get(), k = {};
    i.subscribe('threads-updated', function (l, m) {
        for (var n in m) {
            var o = j.getCanonicalUserInThread(n);
            k.inform('unread-changed', o);
        }
    });
    h(k, g, {getUnreadCountForUID: function (l, m) {
        j.getThreadMeta(j.getThreadIDForUser(l), function (n) {
            m(n.unread_count);
        });
    }});
    e.exports = k;
}, null);
__d("ChatSidebarUserGroup.react", ["AvailableList", "AvailableListConstants", "ChannelConnection", "ChatContexts", "ChatSidebarSections", "ChatSidebarUser.react", "ChatUnreadCount", "LastMobileActiveTimes", "PresencePrivacy", "PresenceStatus", "React", "ShortProfiles", "SubscriptionsHandler", "cx", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
    var v = Object.keys(k).map(function (x) {
        return k[x];
    }), w = q.createClass({displayName: 'ChatSidebarUserGroup', propTypes: {ids: q.PropTypes.array.isRequired, sectionName: q.PropTypes.oneOf(v).isRequired}, getInitialState: function () {
        return {userData: [], unreadCounts: {}};
    }, _updateUnreadCount: function (x) {
        m.getUnreadCountForUID(x, function (y) {
            this.state.unreadCounts[x] = y;
            this.setState({unreadCounts: this.state.unreadCounts});
        }.bind(this));
    }, componentWillMount: function () {
        this.componentWillReceiveProps(this.props);
        this._subscriptions = new s();
        this._subscriptions.addSubscriptions(g.subscribe(h.ON_AVAILABILITY_CHANGED, u(this.forceUpdate, this)), o.subscribe('privacy-changed', u(this.forceUpdate, this)), i.subscribe([i.CONNECTED, i.RECONNECTING, i.SHUTDOWN, i.MUTE_WARNING, i.UNMUTE_WARNING], u(this.forceUpdate, this)));
    }, componentWillUnmount: function () {
        this._subscriptions.release();
    }, componentWillReceiveProps: function (x) {
        r.getMulti(x.ids, function (y) {
            var z = x.ids.map(function (aa) {
                return y[aa];
            });
            this.setState({userData: z});
        }.bind(this));
    }, _renderProfile: function (x, y) {
        if (x.id === 0)return null;
        var z = p.get(x.id), aa = (z !== h.ACTIVE) ? n.getShortDisplay(x.id) : null, ba = (z === h.ACTIVE) ? p.getDetailedActivePresence(x.id) : null, ca = i.disconnected() || !o.allows(x.id), da = j.getShortDisplay(x.id);
        return (q.createElement(q.DOM.li, {className: (("_42fz") + (da ? ' ' + "_52zj" : '') + (ca ? ' ' + "_570-" : '')), 'data-id': x.id, key: x.id}, q.createElement(l, {birthday: p.isBirthday(x.id), context: da, detailedStatus: ba, image: x.thumbSrc, imageSize: this.props.imageSize, name: x.name, sectionName: this.props.sectionName, slot: y, status: z, statusTime: aa, unreadCount: this.state.unreadCounts[x.id], userID: x.id})));
    }, render: function () {
        return (q.createElement(q.DOM.ul, Object.assign({}, this.props), this.state.userData.map(this._renderProfile)));
    }});
    e.exports = w;
}, null);
__d("ChatSidebarOrderedList.react", ["Animation", "AsyncDialog", "AsyncRequest", "ChatQuietLinks", "ChatSidebarConstants", "ChatSidebarSections", "ChatSidebarUserGroup.react", "PresencePrivacy", "React", "URI", "cx", "shield", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t = o.createClass({displayName: 'ChatSidebarOrderedList', propTypes: {topUsers: o.PropTypes.array.isRequired, availableUsers: o.PropTypes.array.isRequired, isSidebar: o.PropTypes.bool.isRequired, scrollContainer: o.PropTypes.object}, getInitialState: function () {
        return {mouseOver: true, pauseRendering: false};
    }, shouldComponentUpdate: function (u, v) {
        return !v.mouseOver && !v.pauseRendering;
    }, componentDidMount: function () {
        j.nukeLinks(this.getDOMNode());
    }, _scrollToSeparator: function () {
        if (!this.props.scrollContainer)return;
        var u = this.refs.usersSeparator.getDOMNode(), v = this.props.scrollContainer.scrollHeight, w = this.props.scrollContainer.clientHeight, x = this.props.scrollContainer.scrollTop, y = Math.min(u.offsetTop, v - w);
        if (x !== y) {
            var z = Math.abs(y - x) / this.props.scrollContainer.clientHeight * 500;
            new g(this.props.scrollContainer).to('scrollTop', y).ease(g.ease.end).duration(z).go();
        }
    }, _openBlackbirdSettings: function () {
        var u = new p('/ajax/chat/privacy/settings_dialog.php').addQueryData({ref: 'whitelist_separator'});
        h.send(new i(u));
    }, _renderOfflineSection: function () {
        var u = k.getImageSize(this.props.isSidebar), v = this.props.topUsers.filter(function (x) {
            return !n.allows(x);
        });
        v.splice(-2);
        var w = (o.createElement(o.DOM.a, {href: "#", onClick: this._openBlackbirdSettings}, "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"));
        return [o.createElement(o.DOM.div, {key: "users_separator1", className: "_554m"}, o.createElement(o.DOM.div, {className: "_554o"}, o.createElement(o.DOM.div, {className: "_554n"}, o.createElement(o.DOM.span, {className: "_554p"}, "\u0414\u0420\u0423\u0413\u0418\u0415 \u0414\u0420\u0423\u0417\u042c\u042f"), o.createElement(o.DOM.div, {className: "_554q"}, o.createElement(o.DOM.span, {className: "_554r"}))))), o.createElement(o.DOM.div, {key: "users_separator2", className: "_554m blackbirdWhitelist"}, o.createElement(o.DOM.div, {className: "_554o"}, o.createElement(o.DOM.div, {className: "_554n"}, o.createElement(o.DOM.div, {className: "_5v-d"}, o.createElement(o.DOM.span, {className: "_554t"}, s._("\u042d\u0442\u0438 \u0434\u0440\u0443\u0437\u044c\u044f \u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0432\u0438\u0434\u0435\u0442\u044c \u0432\u0430\u0441 \u0432 \u0447\u0430\u0442\u0435. {=link}", {'=link': w})))))), o.createElement(m, {key: l.OFFLINE_USERS, sectionName: l.OFFLINE_USERS, ids: v, imageSize: u})];
    }, _renderOnlineSection: function () {
        if (this.props.availableUsers.length === 0)return null;
        var u = k.getImageSize(this.props.isSidebar);
        return [o.createElement(o.DOM.div, {key: "users_separator", ref: "usersSeparator", onClick: this._scrollToSeparator, className: "_554m moreOnlineFriends"}, o.createElement(o.DOM.div, {className: "_554o"}, o.createElement(o.DOM.div, {className: "_554n"}, o.createElement(o.DOM.span, {className: "_554p"}, s._("{MORE ONLINE FRIENDS} ({=count})", {'MORE ONLINE FRIENDS': "\u0414\u0420\u0423\u0413\u0418\u0415 \u0414\u0420\u0423\u0417\u042c\u042f", '=count': this.props.availableUsers.length})), o.createElement(o.DOM.div, {className: "_554q"}, o.createElement(o.DOM.span, {className: "_554r"}))))), o.createElement(m, {key: l.MORE_ONLINE_FRIENDS, sectionName: l.MORE_ONLINE_FRIENDS, ids: this.props.availableUsers, imageSize: u})];
    }, render: function () {
        var u = k.getImageSize(this.props.isSidebar), v = this.props.topUsers;
        if (n.getVisibility() == n.ONLINE)v = this.props.topUsers.filter(function (x) {
            return n.allows(x);
        });
        var w = (n.getOnlinePolicy() == n.ONLINE_TO_WHITELIST && n.getVisibility()) ? this._renderOfflineSection() : this._renderOnlineSection();
        return (o.createElement(o.DOM.li, Object.assign({}, this.props, {onMouseEnter: r(this.setState, this, {mouseOver: true}), onMouseLeave: r(this.setState, this, {mouseOver: false})}), o.createElement(m, {key: l.ORDERED_LIST, sectionName: l.ORDERED_LIST, ids: v, imageSize: u}), w));
    }});
    e.exports = t;
}, null);
__d("OrderedFriendsList", ["AvailableList", "createArrayFrom", "ShortProfiles", "WorkModeConfig", "InitialChatFriendsList"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = [], l = {}, m = [], n = {contains: function (o) {
        return o in l;
    }, getList: function () {
        if (j.is_work_user)return h(k);
        n.reRank();
        var o = h(k);
        o = o.filter(function (p) {
            var q = i.getNowUnsafe(p);
            return !q || q.type == "friend";
        });
        return o;
    }, getRank: function (o) {
        return o in l ? l[o] : k.length;
    }, reRank: function () {
        var o = {}, p = {};
        m.forEach(function (r, s) {
            var t = r.substr(0, r.length - 2), u = r.substring(r.length - 1);
            if (typeof(p.uid) == 'undefined') {
                if (typeof(o.uid) == 'undefined')o[t] = g.get(t);
                var v = o[t];
                if (v == u)p[s] = t;
            }
        });
        k = [];
        for (var q in p)k.push(p[q]);
        k.forEach(function (r, s) {
            l[r] = s;
        });
    }};
    (function () {
        var o = b('InitialChatFriendsList');
        k = o.list.length ? o.list : [];
        if (!j.is_work_user) {
            m = k.slice();
            n.reRank();
        }
        k.forEach(function (p, q) {
            l[p] = q;
        });
    })();
    e.exports = a.OrderedFriendsList || n;
}, null);
__d("ChatSortUsers", ["AvailableListConstants", "OrderedFriendsList", "PresencePrivacy", "PresenceStatus", "ShortProfiles", "TokenizeUtil"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    function m(q, r) {
        var s = i.allows(q), t = i.allows(r);
        if (s !== t)return s ? -1 : 1;
        return 0;
    }

    var n = {};

    function o(q) {
        if (n[q])return n[q];
        var r = (k.getNowUnsafe(q) || {}).name;
        if (r)return n[q] = l.flatten(r);
        return '~';
    }

    var p = {sortAlphabetical: function (q, r) {
        var s = o(q), t = o(r);
        if (s !== t)return s < t ? -1 : 1;
        return 0;
    }, sortMobile: function (q, r) {
        var s = j.get(q) === g.MOBILE, t = j.get(r) === g.MOBILE;
        if (s !== t)return t ? -1 : 1;
        return p.sortAlphabetical(q, r);
    }, sortCoefficient: function (q, r) {
        var s = h.getRank(q), t = h.getRank(r);
        if (s !== t)return s - t;
        return p.sortAlphabetical(q, r);
    }, sort: function (q, r) {
        var s = m(q, r);
        if (s !== 0)return s;
        return p.sortCoefficient(q, r);
    }};
    e.exports = p;
}, null);
__d("ChatOrderedList", ["Arbiter", "ArbiterMixin", "AvailableList", "AvailableListConstants", "CSS", "ChatConfig", "ChatHovercard", "ChatOrderedListHover", "ChatSidebarConstants", "ChatSidebarOrderedList.react", "ChatSortUsers", "ChatVisibility", "DOM", "DataStore", "Event", "JSLogger", "OrderedFriendsList", "Parent", "PresencePrivacy", "PresenceStatus", "React", "createObjectFrom", "csx", "debounceAcrossTransitions", "mixin", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa) {
    var ga = null, ha, ia = ea(h);
    for (var ja in ia)if (ia.hasOwnProperty(ja))la[ja] = ia[ja];
    var ka = ia === null ? null : ia.prototype;
    la.prototype = Object.create(ka);
    la.prototype.constructor = la;
    la.__superConstructor__ = ia;
    function la(ma, na, oa) {
        "use strict";
        this._isSidebar = ma;
        this._root = na;
        this._isVisible = false;
        this._excludedIds = {};
        this._numTopFriends = 5;
        this._hoverController = null;
        this._contextualDialog = oa;
        this._orderedList = s.find(this._root, '.fbChatOrderedList');
        this._scrollableOrderedList = x.byClass(this._root, 'scrollableOrderedList');
        this._scrollableArea = x.byClass(this._root, 'scrollable');
        if (this._isSidebar)new m(this);
        g.subscribe(v.DUMP_EVENT, function (pa, qa) {
            qa.chat_lists = qa.chat_lists || {sorted_list: this.getCachedSortedList(), ordered_list: w.getList(), available_list: la.getAvailableList(this._excludedIds), excluded_list: this._excludedIds};
        }.bind(this));
        y.subscribe('privacy-user-presence-changed', fa(this._render, this));
        i.subscribe(j.ON_AVAILABILITY_CHANGED, fa(this._render, this));
    }

    la.prototype.getShowingUsers = function () {
        "use strict";
        return s.scry(this._root, "li._42fz,li._5a58").map(this.getUserForNode);
    };
    la.prototype.getUserForNode = function (ma) {
        "use strict";
        return t.get(ma, 'id') || t.get(ma, 'serverthreadid');
    };
    la.prototype.getHoverController = function () {
        "use strict";
        if (!this._hoverController)this._hoverController = new n(this, this._contextualDialog);
        return this._hoverController;
    };
    la.prototype.getItemHeight = function () {
        "use strict";
        return o.getItemHeight(this._isSidebar);
    };
    la.prototype.getRoot = function () {
        "use strict";
        return this._root;
    };
    la.prototype.getSortedList = function (ma) {
        "use strict";
        return la.getSortedList(ma || this._excludedIds, this._numTopFriends);
    };
    la.prototype.getCachedSortedList = function (ma) {
        "use strict";
        if (ga == null)ga = this.getSortedList(ma);
        return ga;
    };
    la.prototype.hide = function () {
        "use strict";
        if (!this._isVisible)return;
        this._isVisible = false;
        k.hide(this._scrollableOrderedList || this._root);
        this.inform('hide');
    };
    la.prototype.setNumTopFriends = function (ma) {
        "use strict";
        if (ma !== this._numTopFriends) {
            this._numTopFriends = ma;
            this._render();
        }
    };
    la.prototype._renderOrderedList = function () {
        "use strict";
        if (!this._isVisible || ha)return;
        var ma = la.getSortedList({}, this._numTopFriends), na = la.getAvailableList(ba(ma));
        na.sort(q.sortMobile);
        aa.renderComponent(aa.createElement(p, {availableUsers: na, isSidebar: this._isSidebar, scrollContainer: this._scrollContainer, topUsers: ma}), this._orderedList);
        this.inform('render');
    };
    la.prototype._render = function () {
        "use strict";
        this._render = da(this._renderOrderedList.bind(this), 300);
        this._render();
    };
    la.prototype.show = function () {
        "use strict";
        if (this._isVisible)return;
        this._isVisible = true;
        k.show(this._scrollableOrderedList || this._root);
        this._render();
        this.inform('show');
    };
    la.prototype.isVisible = function () {
        "use strict";
        return this._isVisible;
    };
    la.prototype.setScrollContainer = function (ma) {
        "use strict";
        if (s.contains(ma, this._root))this._scrollContainer = ma;
    };
    la.getSortedList = function (ma, na) {
        "use strict";
        var oa = w.getList().filter(function (ra) {
            return !(ra in ma) && y.getFriendVisibility(ra) !== y.BLACKLISTED;
        }), pa = [];
        if (!r.isOnline()) {
            Array.prototype.push.apply(pa, oa);
        } else {
            if (y.getOnlinePolicy() === y.ONLINE_TO_WHITELIST)oa = this._filterByWhitelist(oa);
            Array.prototype.push.apply(pa, oa);
        }
        pa = pa.slice(0, na);
        if (pa.length === na) {
            var qa = la.getAvailableList(pa.concat(ma)).length;
            qa && pa.splice(-1);
        }
        ga = pa.slice();
        return pa;
    };
    la._filterByWhitelist = function (ma) {
        "use strict";
        var na = ma, oa = {}, pa, qa;
        ma = [];
        for (pa = 0; pa < na.length; ++pa) {
            qa = na[pa];
            if (y.allows(qa)) {
                oa[qa] = true;
                ma.push(qa);
            }
        }
        var ra = y.getWhitelist();
        for (pa = 0; pa < ra.length; ++pa) {
            qa = ra[pa];
            if (!(qa in oa))ma.push(qa);
        }
        for (pa = 0; pa < na.length; ++pa) {
            qa = na[pa];
            if (!y.allows(qa))ma.push(qa);
        }
        return ma;
    };
    la.getAvailableList = function (ma) {
        "use strict";
        var na;
        if (!na)na = z.getOnlineIDs();
        return na.filter(function (oa) {
            return !(oa in ma);
        });
    };
    la._pause = function () {
        "use strict";
        ha = true;
    };
    la._unpause = function () {
        "use strict";
        ha = false;
    };
    la._registerToggleRenderItem = function (ma) {
        "use strict";
        u.listen(ma, 'click', function () {
            ha = !ha;
            k.conditionClass(ma, 'checked', ha);
        });
    };
    e.exports = la;
}, null);
__d("ChatMiniSidebarUser.react", ["AvailableListConstants", "ChatOpenTab", "ChatSidebarSections", "Image.react", "Link.react", "WebMessengerPermalinkConstants", "PresenceStatus", "React", "cx", "ix"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    'use strict';
    var q = n.createClass({displayName: 'ChatMiniSidebarUser', propTypes: {user: n.PropTypes.object.isRequired}, _openTab: function (r) {
        h.openUserTab(this.props.user.id, i.ORDERED_LIST);
        r.preventDefault();
    }, _renderImage: function () {
        return n.createElement(j, {src: this.props.user.thumbSrc});
    }, _renderStatus: function () {
        var r = m.get(this.props.user.id), s = null;
        if (r == g.ACTIVE) {
            s = p('/images/litestand_classic/sidebar/online.png');
        } else if (r == g.MOBILE)s = p('/images/litestand_classic/sidebar/pushable.png');
        return s ? n.createElement(j, {src: s}) : null;
    }, _getHref: function () {
        return l.getURIPathForIDOrVanity(this.props.user.id);
    }, render: function () {
        return (n.createElement(n.DOM.li, {className: "_2sb2"}, n.createElement(n.DOM.div, {'aria-label': this.props.user.name, className: "_2sb3", 'data-hover': "tooltip", 'data-tooltip-position': "left"}, n.createElement(k, {href: {url: this._getHref()}, onClick: this._openTab, rel: "ignore"}, n.createElement(n.DOM.div, {className: "_2sb4"}, n.createElement(n.DOM.div, {className: "_2sb5"}, this._renderImage()), n.createElement(n.DOM.div, {className: "_2sb6"}, this._renderStatus()))))));
    }});
    e.exports = q;
}, null);
__d("ChatMiniSidebarBody.react", ["ChatMiniSidebarUser.react", "LegacyScrollableArea.react", "React", "ShortProfiles"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    var k = 56, l = i.createClass({displayName: 'ChatMiniSidebarBody', propTypes: {height: i.PropTypes.number.isRequired, users: i.PropTypes.array.isRequired}, getInitialState: function () {
        return {userData: []};
    }, componentDidMount: function () {
        this._populateUserData(this.props.users);
    }, componentWillReceiveProps: function (m) {
        this._populateUserData(m.users);
    }, _populateUserData: function (m) {
        j.getMulti(m, function (n) {
            var o = m.map(function (p) {
                return n[p];
            });
            this.setState({userData: o});
        }.bind(this));
    }, _renderUser: function (m) {
        if (m.id === 0)return null;
        return i.createElement(g, {key: m.id, user: m});
    }, render: function () {
        return (i.createElement(h, {height: this.props.height, width: k, fade: true}, i.createElement(i.DOM.ul, null, this.state.userData.map(function (m) {
            return this._renderUser(m);
        }.bind(this)))));
    }});
    e.exports = l;
}, null);
__d("ChatMiniSidebarFooter.react", ["React", "cx"], function (a, b, c, d, e, f, g, h) {
    'use strict';
    var i = g.createClass({displayName: 'ChatMiniSidebarFooter', render: function () {
        return g.createElement(g.DOM.div, {className: "_iup"});
    }});
    e.exports = i;
}, null);
__d("ChatMiniSidebar.react", ["AvailableList", "AvailableListConstants", "ChannelConnection", "ChatOrderedList", "ChatSidebarConstants", "ChatSortUsers", "ChatMiniSidebarBody.react", "ChatMiniSidebarFooter.react", "PresencePrivacy", "React", "SubscriptionsHandler", "createObjectFrom", "cx", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
    'use strict';
    var u = 6, v = 27, w = p.createClass({displayName: 'ChatMiniSidebar', propTypes: {height: p.PropTypes.number.isRequired, shown: p.PropTypes.bool.isRequired}, getInitialState: function () {
        return {users: []};
    }, componentWillMount: function () {
        this._subscriptions = new q();
        this._subscriptions.addSubscriptions(g.subscribe(h.ON_AVAILABILITY_CHANGED, this._updateUsers), i.subscribe([i.CONNECTED, i.RECONNECTING, i.SHUTDOWN, i.MUTE_WARNING, i.UNMUTE_WARNING], t(this.forceUpdate, this)), o.subscribe('privacy-changed', t(this.forceUpdate, this)), o.subscribe('privacy-user-presence-changed', this._updateUsers));
    }, componentWillUnmount: function () {
        this._subscriptions && this._subscriptions.release();
    }, _getScrollableAreaHeight: function () {
        return Math.max(this.props.height - u - v, 0);
    }, _updateUsers: function () {
        if (!this.props.shown)return;
        var x = this._getScrollableAreaHeight(), y = x / k.getItemHeight(true), z = j.getSortedList({}, y), aa = j.getAvailableList(r(z));
        aa.sort(l.sortMobile);
        this.setState({users: z.concat(aa)});
    }, render: function () {
        if (!this.props.shown)return null;
        var x = this._getScrollableAreaHeight();
        return (p.createElement(p.DOM.div, {className: "_269v"}, p.createElement(p.DOM.div, {className: "_269w"}), p.createElement(m, {className: "_269x", height: x, users: this.state.users}), p.createElement(n, null)));
    }});
    e.exports = w;
}, null);
__d("ChatMiniSidebarController", ["ChatMiniSidebar.react", "React"], function (a, b, c, d, e, f, g, h) {
    'use strict';
    var i = 0, j = null, k = null, l = {init: function (m) {
        if (k)return;
        k = m;
    }, setHeight: function (m) {
        i = m;
    }, show: function () {
        if (!j) {
            j = h.renderComponent(h.createElement(g, {height: i, shown: true}), k);
        } else j.setProps({height: i, shown: true});
    }, hide: function () {
        j && j.setProps({height: i, shown: false});
    }};
    e.exports = l;
}, null);
__d("ChatSidebarSheet", ["ArbiterMixin", "BlackbirdUpsell", "ChannelConnection", "ChannelConstants", "ChatBehavior", "ChatConfig", "ChatVisibility", "CSS", "DOM", "Event", "JSLogger", "PresencePrivacy", "copyProperties", "mixin", "setTimeoutAcrossTransitions", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    var w = q.create('sidebar_sheet');

    function x(da) {
        switch (da) {
            case j.HINT_AUTH:
                return "\u0412\u0440\u0435\u043c\u044f \u0432\u0430\u0448\u0435\u0439 \u0441\u0435\u0441\u0441\u0438\u0438 \u0438\u0441\u0442\u0435\u043a\u043b\u043e. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u043d\u043e\u0432\u044c \u0432\u044b\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0445\u043e\u0434.";
            case j.HINT_CONN:
                return v._("{Chat} Facebook \u0432 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d.", {Chat: "\u0427\u0430\u0442"});
            case j.HINT_MAINT:
                return v._("{Chat} Facebook \u0432 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u0437\u0430\u043a\u0440\u044b\u0442 \u043d\u0430 \u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u043e\u0435 \u043e\u0431\u0441\u043b\u0443\u0436\u0438\u0432\u0430\u043d\u0438\u0435.", {Chat: "\u0427\u0430\u0442"});
            default:
                return v._("{Chat} Facebook \u0432 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d.", {Chat: "\u0427\u0430\u0442"});
        }
    }

    function y(da) {
        var ea;
        if (da === null || false === navigator.onLine) {
            ea = "\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u043a \u0447\u0430\u0442\u0443. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u0432\u043e\u0435 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043a \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u0443.";
        } else if (da > l.get('warning_countdown_threshold_msec')) {
            var fa = o.create('a', {href: '#', className: 'fbChatReconnectLink'}, "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u044c \u043f\u043e\u043f\u044b\u0442\u043a\u0443");
            ea = o.tx._("\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u043a \u0447\u0430\u0442\u0443. {try-again-link}", {'try-again-link': fa});
        } else if (da > 1000) {
            ea = v._("\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u043a \u0447\u0430\u0442\u0443. \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0441\u044f \u0447\u0435\u0440\u0435\u0437 {seconds} \u0441\u0435\u043a...", {seconds: Math.floor(da / 1000)});
        } else ea = "\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u043a \u0447\u0430\u0442\u0443. \u041f\u043e\u0432\u0442\u043e\u0440\u043d\u043e\u0435 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435...";
        return ea;
    }

    var z = t(g);
    for (var aa in z)if (z.hasOwnProperty(aa))ca[aa] = z[aa];
    var ba = z === null ? null : z.prototype;
    ca.prototype = Object.create(ba);
    ca.prototype.constructor = ca;
    ca.__superConstructor__ = z;
    function ca(da) {
        "use strict";
        this._root = da;
        this._message = o.find(da, 'div.fbChatSidebarMessage div.message');
        i.subscribe([i.CONNECTED, i.SHUTDOWN, i.RECONNECTING], this._handleConnectionChange.bind(this));
        i.subscribe([i.MUTE_WARNING, i.UNMUTE_WARNING], this._render.bind(this));
        r.subscribe('privacy-user-presence-changed', this._render.bind(this));
        k.subscribe(k.ON_CHANGED, this._render.bind(this));
        this._render();
    }

    ca.prototype._handleConnectionChange = function (da, ea) {
        "use strict";
        this._channelStatus = da;
        this._channelData = ea;
        this._render();
    };
    ca.prototype._renderChannelDisconnect = function () {
        "use strict";
        if (this._channelStatus === i.SHUTDOWN) {
            return o.setContent(this._message, x(this._channelData));
        } else if (this._channelStatus === i.RECONNECTING) {
            var da = this._channelData;
            o.setContent(this._message, y(da));
            if (da > 1000) {
                if (da > l.get('warning_countdown_threshold_msec'))this._warningMsgEventListener = p.listen(this._message, 'click', function (event) {
                    if (n.hasClass(event.getTarget(), 'fbChatReconnectLink')) {
                        i.reconnect();
                        return false;
                    }
                });
                this._showWarningTimeout = u(this._handleConnectionChange.bind(this, i.RECONNECTING, da - 1000), 1000);
            }
        }
    };
    ca.prototype._renderOffline = function () {
        "use strict";
        var da = 'fbChatGoOnlineLink', ea = "\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0427\u0430\u0442", fa = o.create('a', {href: '#', className: da}, ea), ga = o.tx._("{=Go online}, \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u043a\u0442\u043e \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0441\u044f \u043e\u043d\u043b\u0430\u0439\u043d.", {'=Go online': fa});
        o.setContent(this._message, ga);
        this._goOnlineEventListener = p.listen(this._message, 'click', function (event) {
            if (n.hasClass(event.getTarget(), da)) {
                w.log('sidebar_go_online');
                m.goOnline();
                return false;
            }
        });
    };
    ca.prototype._renderBlackbirdUpsell = function () {
        "use strict";
        o.setContent(this._message, h.getOfflineContent());
    };
    ca.prototype._renderBlackbird = function (da) {
        "use strict";
        o.setContent(this._message, h.getBlackbirdContent(da));
    };
    ca.prototype._clear = function () {
        "use strict";
        if (this._showWarningTimeout) {
            clearTimeout(this._showWarningTimeout);
            this._showWarningTimeout = null;
        }
        if (this._warningMsgEventListener) {
            this._warningMsgEventListener.remove();
            this._warningMsgEventListener = null;
        }
        if (this._goOnlineEventListener) {
            this._goOnlineEventListener.remove();
            this._goOnlineEventListener = null;
        }
        n.removeClass(this._root, 'upsell');
        n.removeClass(this._root, 'offline');
        n.removeClass(this._root, 'blackbird');
        n.removeClass(this._root, 'error');
        n.removeClass(this._root, 'notice');
        o.empty(this._message);
    };
    ca.prototype._render = function () {
        "use strict";
        this._clear();
        if (h.shouldShow()) {
            if (m.hasBlackbirdEnabled()) {
                var da = m.isOnline() ? 'blackbird' : 'upsell';
                n.addClass(this._root, da);
                this._renderBlackbird(r.getVisibility());
            } else if (!m.isOnline()) {
                n.addClass(this._root, 'upsell');
                this._renderBlackbirdUpsell();
            }
        } else if (!m.isOnline()) {
            n.addClass(this._root, 'offline');
            this._renderOffline();
        } else if (i.disconnected()) {
            n.addClass(this._root, 'error');
            this._renderChannelDisconnect();
        } else if (!k.notifiesUserMessages()) {
            n.addClass(this._root, 'notice');
            var ea = "\u0423\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u044b \u043f\u043e\u043a\u0430 \u0432\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0435 \u0434\u0440\u0443\u0433\u043e\u0439 \u043a\u043b\u0438\u0435\u043d\u0442 \u0434\u043b\u044f \u0447\u0430\u0442\u0430.";
            o.setContent(this._message, ea);
        }
        this.inform('updated');
    };
    s(ca.prototype, {_channelStatus: null, _channelData: null, _showWarningTimeout: null, _warningMsgEventListener: null, _goOnlineEventListener: null});
    e.exports = ca;
}, null);
__d("SidebarFitWindowHeight", ["Arbiter", "ArbiterMixin", "Event", "Style", "SubscriptionsHandler", "TinyViewport", "Vector", "mixin", "queryThenMutateDOM"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = n(h);
    for (var q in p)if (p.hasOwnProperty(q))s[q] = p[q];
    var r = p === null ? null : p.prototype;
    s.prototype = Object.create(r);
    s.prototype.constructor = s;
    s.__superConstructor__ = p;
    function s(t) {
        "use strict";
        this.$SidebarFitWindowHeight0 = t;
        this.onViewportUpdate();
        l.subscribe('change', this.onViewportUpdate.bind(this));
    }

    s.prototype.onViewportUpdate = function () {
        "use strict";
        if (l.isTiny()) {
            this.onScroll();
            var t = this.onScroll.bind(this);
            this.$SidebarFitWindowHeight1 = new k();
            this.$SidebarFitWindowHeight1.addSubscriptions(i.listen(window, 'scroll', t), g.subscribe('dom-scroll', t));
        } else {
            if (this.$SidebarFitWindowHeight2 !== 0) {
                j.set(this.$SidebarFitWindowHeight0, 'margin-top', '0');
                this.$SidebarFitWindowHeight2 = 0;
            }
            this.$SidebarFitWindowHeight1 && this.$SidebarFitWindowHeight1.release();
        }
    };
    s.prototype.onScroll = function () {
        "use strict";
        o(this.updateScrollPosition.bind(this), this.resizeSidebar.bind(this), 'SidebarFitWindowHeight/scroll');
    };
    s.prototype.updateScrollPosition = function () {
        "use strict";
        this.$SidebarFitWindowHeight3 = m.getScrollPosition().y;
        this.$SidebarFitWindowHeight4 || (this.$SidebarFitWindowHeight4 = this.$SidebarFitWindowHeight0.offsetHeight);
    };
    s.prototype.resizeSidebar = function () {
        "use strict";
        var t = -Math.max(Math.min(this.$SidebarFitWindowHeight3, this.$SidebarFitWindowHeight4), 0);
        j.set(this.$SidebarFitWindowHeight0, 'margin-top', t + 'px');
        if (t != this.$SidebarFitWindowHeight2) {
            this.$SidebarFitWindowHeight2 = t;
            this.inform('resized', t);
        }
    };
    s.prototype.getOffset = function () {
        "use strict";
        return this.$SidebarFitWindowHeight2;
    };
    e.exports = s;
}, null);
__d("ChatSidebar", ["Arbiter", "ArbiterMixin", "AsyncRequest", "Banzai", "BanzaiLogger", "BootloaderConfig", "ChatConfig", "ChatImpressionLogger", "ChatOptions", "ChatMiniSidebarController", "ChatSidebarSheet", "CSS", "DOM", "DOMDimensions", "Event", "JSLogger", "JSXDOM", "KeyEventController", "LitestandClassicPlaceHolders", "ModalLayer", "OrderedFriendsList", "Parent", "PresencePrivacy", "ScrollableArea", "SidebarFitWindowHeight", "Style", "ViewportBounds", "copyProperties", "createArrayFrom", "csx", "cx", "debounce", "emptyFunction", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma, na) {
    var oa, pa = null, qa = false, ra = false, sa = false, ta = false, ua = false, va, wa = false, xa, ya, za, ab, bb, cb, db, eb = null, fb, gb = v.create('chat_sidebar'), hb = 'succeeded', ib = k.create(ha({retry: true}, j.VITAL));

    function jb() {
        r.removeClass(document.documentElement, 'sidebarMode');
        if (!ta || !ub.isVisible()) {
            g.inform('reflow');
            return;
        }
        sa = false;
        eb = null;
        ab.hide();
        cb.getCore().reset();
        r.hide(ya);
        if (wa) {
            r.hide(va);
            r.hide(xa);
            r.removeClass(document.documentElement, 'miniSidebar');
            r.removeClass(ya, "_51xq");
            p.hide();
            gb.log('minisidebar_hide');
        } else gb.log('sidebar_hide');
        g.inform('sidebar/hide', ub);
        g.inform('reflow');
    }

    function kb() {
        var vb = ub.shouldShowSidebar(), wb = ub.shouldShowMiniSidebar();
        if (ub.isEnabled() && (vb || wb)) {
            if (vb) {
                nb();
                ob();
            } else pb();
        } else jb();
        if (!ta) {
            sb();
            ta = true;
        }
        eb = null;
    }

    function lb() {
        if (cb && ub.isVisible())cb.getCore().getElement().focus();
    }

    function mb(vb) {
        var wb = db.height;
        vb.forEach(function (xb) {
            if (xb && xb !== oa)wb -= t.getElementDimensions(xb).height;
        });
        if (fb)wb -= fb.getOffset();
        if (bb)wb -= t.getElementDimensions(bb).height;
        return Math.max(0, wb);
    }

    function nb() {
        if (ub.isVisible())return;
        if (wa) {
            r.hide(va);
            r.show(xa);
            r.removeClass(document.documentElement, 'miniSidebar');
            r.removeClass(ya, "_51xq");
            p.hide();
        }
        sa = true;
        eb = null;
        r.show(ya);
        r.addClass(document.documentElement, 'sidebarMode');
        ab.show();
        gb.log('sidebar_show');
        g.inform('sidebar/show', ub);
        y.destroy('sidebar');
    }

    function ob() {
        var vb = mb(ia(xa.childNodes)), wb = ab.getItemHeight(), xb = 8, yb = Math.floor((vb - xb) / wb);
        fa.set(oa, 'height', vb + 'px');
        ab.setNumTopFriends(yb);
        var zb = Math.floor((vb - xb) / wb);
        zb = (zb - 2) > 0 ? zb - 2 : 0;
        cb.getData().setMaxResults(zb);
        g.inform('sidebar/resized', ub);
        g.inform('reflow');
    }

    function pb() {
        r.hide(xa);
        r.show(va);
        r.show(ya);
        r.addClass(document.documentElement, 'sidebarMode');
        r.addClass(document.documentElement, 'miniSidebar');
        r.addClass(ya, "_51xq");
        var vb = mb([]);
        p.setHeight(vb);
        p.show();
        sa = false;
        y.destroy('sidebar');
        gb.log('minisidebar_show');
        g.inform('minisidebar/show', ub);
        g.inform('reflow');
    }

    function qb() {
        o.setSetting('sidebar_mode', ub.isEnabled(), 'sidebar');
        new i('/ajax/chat/settings.php').setHandler(ma).setErrorHandler(ma).setData({sidebar_mode: ub.isEnabled()}).setAllowCrossPageTransition(true).send();
    }

    function rb() {
        return aa.getList().length <= m.get('sidebar.min_friends');
    }

    function sb() {
        var vb = true;
        if (!ub.isEnabled()) {
            gb.log('state_not_enabled');
            vb = false;
        }
        if (!ub.isViewportCapable())if (!wa) {
            gb.log('state_not_shown_viewport');
            vb = false;
        } else if (!ub.isViewportCapableForMiniSidebar()) {
            gb.log('state_not_shown_viewport_mini');
            vb = false;
        }
        if (ra) {
            gb.log('state_not_shown_hidden');
            vb = false;
        }
        if (rb()) {
            gb.log('state_not_shown_num_friends');
            vb = false;
        }
        gb.log(vb ? 'state_shown' : 'state_not_shown');
    }

    function tb(event, vb) {
        if (!ub.isVisible())return;
        if (vb) {
            fa.set(ya, 'right', vb + 'px');
        } else fa.set(ya, 'right', '');
    }

    var ub = {init: function (vb, wb, xb, yb) {
        ub.init = ma;
        ua = true;
        ya = vb;
        ab = wb;
        cb = xb;
        za = yb;
        oa = s.find(vb, 'div.fbChatSidebarBody');
        va = s.find(vb, "._51x-");
        xa = s.find(vb, "._51x_");
        bb = s.find(vb, "._5qqe");
        wa = m.get('mini_sidebar', false);
        p.init(va);
        u.listen(window, 'resize', kb);
        x.registerKey('q', function (event) {
            if (sa) {
                if (!pa)pa = s.scry(vb, '.inputsearch')[0];
                if (pa) {
                    pa.focus();
                    event.prevent();
                }
            }
        });
        var zb = new q(vb);
        zb.subscribe('updated', kb);
        ab.setScrollContainer(ba.byClass(ab.getRoot(), 'uiScrollableAreaWrap'));
        ab.subscribe(['render', 'show', 'hide'], la(function (bc) {
            var cc = da.getInstance(ab.getRoot());
            cc && cc.adjustGripper();
        }));
        g.subscribe('chat/option-changed', function (bc, cc) {
            if (cc.name == "sidebar_mode") {
                qa = !!o.getSetting('sidebar_mode');
                kb();
            }
        });
        xb.getCore().subscribe('sidebar/typeahead/active', ub.updateOnActiveTypeahead);
        xb.subscribe('reset', function () {
            if (!xb.getCore().getValue() && !ab.isVisible())ub.updateOnActiveTypeahead(null, false);
        });
        g.subscribe('buddylist-nub/initialized', function (bc, cc) {
            u.listen(cc.getButton(), 'click', function (event) {
                var dc = ra;
                ra = false;
                ub.enable();
                var ec = ub.shouldShowSidebar();
                ra = dc && !ec;
                return !ec;
            });
        });
        qa = !!o.getSetting('sidebar_mode');
        ca.subscribe('privacy-user-presence-changed', kb);
        kb();
        n.init(ab);
        ga.addPersistentRight(ub.getVisibleWidth);
        ub.inform('sidebar/initialized', ub, g.BEHAVIOR_PERSISTENT);
        g.inform('sidebar/initialized', ub, g.BEHAVIOR_PERSISTENT);
        fb = new ea(bb);
        fb.subscribe('resized', kb);
        if (m.get('chat_sidebar_load_log')) {
            var ac = {event: hb, session_token: yb.session_token, country_code: yb.viewer_country_code, buddylist_short: m.get('buddylist_short_group'), bootloader_retry: l.retry_on_timeout};
            ib.log('MessagesSidebarLoadLoggerConfig', ac);
        }
        z.subscribe('CompensateForScrollbar', tb);
    }, updateOnActiveTypeahead: function (vb, wb) {
        if (!sa)return;
        if (wb) {
            ab.hide();
        } else {
            ab.show();
            kb();
        }
    }, isInitialized: function () {
        return ta;
    }, disable: function () {
        if (!ub.isEnabled())return;
        qa = false;
        qb();
        jb();
    }, enable: function () {
        if (ub.isEnabled())return;
        qa = true;
        qb();
        kb();
        setTimeout(lb, 0);
    }, ensureLoaded: function () {
        if (!qa)return;
        if (ua)return;
        if (na('pagelet_sidebar'))return;
        d(['UIPagelet'], function (vb) {
            var wb = w.div({id: "pagelet_sidebar"});
            s.appendContent(document.body, wb);
            vb.loadFromEndpoint('SidebarPagelet', 'pagelet_sidebar');
        });
        ua = true;
    }, hide: function () {
        if (ra)return;
        ra = true;
        jb();
    }, unhide: function () {
        if (!ra)return;
        ra = false;
        kb();
    }, getBody: function () {
        return oa;
    }, getRoot: function () {
        return ya;
    }, getVisibleWidth: function () {
        if (!sa || !ya)return 0;
        if (eb === null)eb = ya.offsetWidth;
        return eb;
    }, isEnabled: function () {
        return qa;
    }, isViewportCapable: function () {
        db = t.getViewportWithoutScrollbarDimensions();
        var vb = m.get('sidebar.minimum_width');
        return db.width > vb;
    }, shouldShowSidebar: function () {
        var vb = ub.isViewportCapable();
        return vb && !ra && !rb();
    }, isViewportCapableForMiniSidebar: function () {
        db = t.getViewportWithoutScrollbarDimensions();
        var vb = m.get('sidebar.minimum_width'), wb = m.get('minisidebar.minimum_width');
        return db.width > wb && db.width <= vb;
    }, shouldShowMiniSidebar: function () {
        if (!wa)return false;
        var vb = ub.isViewportCapableForMiniSidebar();
        return vb && !ra && !rb();
    }, isVisible: function () {
        return sa;
    }, resize: kb, toggle: function () {
        ub.isEnabled() ? ub.disable() : ub.enable();
    }};
    ha(ub, h);
    e.exports = ub;
}, null);
__d("ChatTypeaheadBehavior", ["ChatOpenTab", "CSS", "MercuryConfig", "Parent", "Rect", "copyProperties", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n(p, q) {
        var r = j.byClass(p, "_4oes");
        if (r)h.conditionClass(r, "_5q83", q);
    }

    function o(p) {
        "use strict";
        this._typeahead = p;
    }

    o.prototype.enable = function () {
        "use strict";
        var p = this._typeahead;
        this._subscriptions = [p.subscribe('focus', function () {
            p.getData().refreshData();
            n(p.getElement(), true);
        }), p.subscribe('blur', function (q) {
            p.getCore().reset();
            n(p.getElement(), false);
        }), p.subscribe('respond', function (q, r) {
            if (r.value && r.value === p.getCore().getValue()) {
                if (!r.results.length) {
                    var s = r.value.toLowerCase(), t = p.getData().getQueryCache();
                    if (!r.isAsync && !t.hasOwnProperty(s))return;
                    p.getView().showNoResults();
                }
                h.addClass(p.getElement(), 'hasValue');
            }
        }), p.subscribe('reset', function () {
            h.removeClass(p.getElement(), 'hasValue');
        }), p.subscribe('select', function (q, r) {
            var s = r.selected.uid;
            if (i.MercuryFBIDGK && r.selected.mercury_thread && !r.selected.mercury_thread.is_canonical)s = r.selected.mercury_thread.thread_fbid;
            p.getView().hide();
            g.openTabByType(s, r.selected.type, 'typeahead');
        }), p.subscribe('highlight', function (q, r) {
            if (r.index >= 0) {
                var s = p.getView().getItems()[r.index];
                if (s) {
                    var t = new k(s), u = s.offsetParent, v = t.boundWithin(new k(u)).getPositionVector();
                    t.getPositionVector().sub(v).scrollElementBy(u);
                }
            }
        })];
    };
    o.prototype.disable = function () {
        "use strict";
        this._subscriptions.forEach(function (p) {
            this._typeahead.unsubscribe(p);
        }, this);
        this._subscriptions = null;
    };
    l(o.prototype, {_subscriptions: null});
    e.exports = o;
}, null);
__d("getDOMImageSize", ["URI"], function (a, b, c, d, e, f, g) {
    function h(m) {
        m.onload = null;
        m.onerror = null;
        m.onreadystatechange = null;
        m._callback = null;
        m._thisObj = null;
        m._srcStr = null;
        m.parentNode && m.parentNode.removeChild(m);
    }

    function i() {
        var m = this;
        if (m._callback)m._callback.call(m._thisObj, m.naturalWidth || m.width, m.naturalHeight || m.height, m._srcStr);
        h(m);
    }

    function j() {
        var m = this;
        if (m.readyState === 'complete')i.call(m);
    }

    function k() {
        var m = this;
        if (m._callback)m._callback.call(m._thisObj, 0, 0, m._srcStr);
        h(m);
    }

    function l(m, n, o) {
        o = o || null;
        if (!m) {
            n.call(o, 0, 0, '');
            return;
        }
        var p = document.body;
        if (!p) {
            setTimeout(l.bind(this, m, n, o), 500);
            return;
        }
        var q;
        if (typeof m === 'string') {
            q = m;
        } else if (typeof m === 'object')if (typeof m.width === 'number' && typeof m.height === 'number') {
            if (typeof m.src === 'string') {
                q = m.src;
                if (m.naturalWidth && m.naturalHeight) {
                    n.call(o, m.naturalWidth, m.naturalHeight, q);
                    return;
                }
            }
            if (typeof m.uri === 'string') {
                q = m.uri;
                if (m.width && m.height) {
                    n.call(o, m.width, m.height, q);
                    return;
                }
            }
        } else if (m instanceof g)q = m.toString();
        if (!q) {
            n(0, 0, m);
            return;
        }
        var r = document.createElement('img');
        r.onreadystatechange = j;
        r.onload = i;
        r.onerror = k;
        r._callback = n;
        r._thisObj = o;
        r._srcStr = q;
        r.src = q;
        r.style.cssText = 'position:absolute;left:0;top:0;width:auto;height:auto;clip:rect(0 0 0 0);';
        p.insertBefore(r, p.firstChild);
    }

    e.exports = l;
}, null);
__d("CachedDOMImageSizePool", ["debounce", "getDOMImageSize"], function (a, b, c, d, e, f, g, h) {
    function i(j, k) {
        "use strict";
        this.$CachedDOMImageSizePool0 = {};
        this.$CachedDOMImageSizePool1 = k;
        this.$CachedDOMImageSizePool2 = 0;
        this.$CachedDOMImageSizePool3 = j;
        this.$CachedDOMImageSizePool4 = g(this.$CachedDOMImageSizePool5, 5000, this);
        this.$CachedDOMImageSizePool6 = {};
        this.$CachedDOMImageSizePool7 = {};
    }

    i.prototype.get = function (j, k, l) {
        "use strict";
        if (!j) {
            k.call(l, 0, 0, j);
            return;
        }
        var m = this.$CachedDOMImageSizePool0[j];
        if (m) {
            m.lastAccessTime = Date.now();
            k.call(l, m.width, m.height, m.src);
        } else if (this.$CachedDOMImageSizePool6[j]) {
            this.$CachedDOMImageSizePool6[j].push(k);
            this.$CachedDOMImageSizePool7[j].push(l);
        } else {
            this.$CachedDOMImageSizePool6[j] = [k];
            this.$CachedDOMImageSizePool7[j] = [l];
            h(j, this.$CachedDOMImageSizePool8, this);
        }
    };
    i.prototype.set = function (j, k, l) {
        "use strict";
        if (this.$CachedDOMImageSizePool2 > this.$CachedDOMImageSizePool3)this.$CachedDOMImageSizePool4();
        var m = this.$CachedDOMImageSizePool0;
        if (j && !m[j]) {
            var n = {width: k, height: l, src: j, lastAccessTime: Date.now()};
            m[j] = n;
            this.$CachedDOMImageSizePool2++;
        }
    };
    i.prototype.$CachedDOMImageSizePool8 = function (j, k, l) {
        "use strict";
        this.set(l, j, k);
        var m = this.$CachedDOMImageSizePool6[l], n = this.$CachedDOMImageSizePool7[l];
        for (var o = 0, p = m.length; o < p; o++)m[o].call(n[o], j, k, l);
        delete this.$CachedDOMImageSizePool6[l];
        delete this.$CachedDOMImageSizePool7[l];
    };
    i.prototype.$CachedDOMImageSizePool5 = function () {
        "use strict";
        var j = Date.now(), k = this.$CachedDOMImageSizePool0, l = this.$CachedDOMImageSizePool2, m = this.$CachedDOMImageSizePool1;
        for (var n in k) {
            var o = k[n];
            if ((j - o.lastAccessTime) > m) {
                delete k[n];
                l--;
            }
        }
        this.$CachedDOMImageSizePool2 = l;
    };
    e.exports = i;
}, null);
__d("BackgroundImage.react", ["CachedDOMImageSizePool", "React", "ReactPropTypes", "XUISpinner.react", "cx", "invariant", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = '(-?(\\d+\\.)?\\d+(px|\\%))', o = new RegExp('^' + n + '?(\\s' + n + ')?$', 'g'), p = new g(50, 10 * 60 * 1000), q = h.createClass({displayName: 'BackgroundImage', propTypes: {src: i.string, width: i.number.isRequired, height: i.number.isRequired, backgroundSize: i.oneOf(['contain', 'cover', 'containinside', 'coverinside']), loadingIndicatorStyle: i.oneOf(['none', 'large', 'small']), backgroundPosition: function (r, s, t) {
        var u = r[s];
        if (u) {
            l(typeof u === 'string');
            l(u.match(o));
        }
    }, onImageLoad: i.func, optimizeResizeSpeed: i.bool, onContextMenu: i.func}, getInitialState: function () {
        return {imageWidth: null, imageHeight: null, imageSrc: this.props.src, loading: true};
    }, getDefaultProps: function () {
        return {optimizeResizeSpeed: false, loadingIndicatorStyle: 'none'};
    }, componentDidMount: function () {
        this._resolveImageSize();
    }, componentDidUpdate: function (r) {
        if (this.props.src !== this.state.imageSrc)this.setState({imageWidth: 0, imageHeight: 0, imageSrc: this.props.src, loading: true}, this._resolveImageSize);
    }, _resolveImageSize: function () {
        var r = this.state.imageSrc;
        if (r)p.get(r, this._onImageSizeResolved, this);
    }, render: function () {
        var r = {width: this.props.width + 'px', height: this.props.height + 'px'}, s = m(this.props.className, "_5f0d");
        return (h.createElement(h.DOM.div, Object.assign({}, this.props, {className: m(this.props.className, s), style: Object.assign({}, (this.props.style || {}), r), onContextMenu: this.props.onContextMenu}), this._renderImage(), this._renderContent(), this._renderLoadingIndicator()));
    }, _renderLoadingIndicator: function () {
        if (!this.state.loading || this.props.loadingIndicatorStyle === 'none')return null;
        return (h.createElement(h.DOM.div, {className: "_1qe- _5lar"}, h.createElement(h.DOM.div, {className: "_1qe_"}, h.createElement(h.DOM.div, {className: "_1qf0"}, h.createElement(j, {size: this.props.loadingIndicatorStyle})))));
    }, _renderContent: function () {
        if (this.props.children)return (h.createElement(h.DOM.div, {className: "_1qe-"}, h.createElement(h.DOM.div, {className: "_1qe_"}, h.createElement(h.DOM.div, {className: "_1qf0"}, this.props.children))));
    }, _renderImage: function () {
        if (!this.state.imageWidth || !this.state.imageHeight)return;
        var r = this.props.width, s = this.props.height, t, u;
        switch (this.props.backgroundSize) {
            case 'cover':
                t = 'cover';
                u = false;
                break;
            case 'coverinside':
                t = 'cover';
                u = true;
                break;
            case 'contain':
                t = 'contain';
                u = false;
                break;
            case 'containinside':
                t = 'contain';
                u = true;
        }
        var v = this.state.imageWidth, w = this.state.imageHeight, x = r / s, y = v / w;
        if (t === 'contain')if ((v > r || !u) && y >= x) {
            v = r;
            w = v / y;
        } else if (w > s || !u) {
            w = s;
            v = w * y;
        }
        if (t === 'cover')if ((v > r || !u) && y >= x) {
            w = s;
            v = w * y;
        } else if (w > s || !u) {
            v = r;
            w = v / y;
        }
        var z = this._getImageStyle(v, w);
        return (h.createElement(h.DOM.img, {alt: "", className: (("_5i4g") + (this.props.optimizeResizeSpeed ? ' ' + "_5sjv" : '')), style: z, src: this.state.imageSrc}));
    }, _getImageStyle: function (r, s) {
        var t;
        if (this.props.backgroundPosition) {
            t = this.props.backgroundPosition.split(' ');
        } else t = ['50%', '50%'];
        return {width: Math.round(r) + 'px', height: Math.round(s) + 'px', left: this._getBackgroundPositionPxValue('left', t[0], r, s), top: this._getBackgroundPositionPxValue('top', t[1] || t[0], r, s)};
    }, _getBackgroundPositionPxValue: function (r, s, t, u) {
        var v = parseFloat(s), w = s.substr(v.toString().length);
        if (w === 'px')return s;
        if (r === 'left') {
            return Math.round((this.props.width - t) * (v / 100)) + 'px';
        } else return Math.round((this.props.height - u) * (v / 100)) + 'px';
    }, _onImageSizeResolved: function (r, s, t) {
        if (!this.isMounted() || this.state.imageSrc !== t)return;
        var u = this.props.onImageLoad ? this.props.onImageLoad.bind(null, r, s) : null;
        this.setState({imageWidth: r, imageHeight: s, loading: false}, u);
    }});
    e.exports = q;
}, null);
__d("MercuryMessageError.react", ["CurrentUser", "ImmutableObject", "MercuryErrorInfo", "MercuryMessages", "React", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    'use strict';
    var n = k.PropTypes, o = k.createClass({displayName: 'MercuryMessageError', propTypes: {authorFBID: n.string, message: n.instanceOf(h).isRequired}, getDefaultProps: function () {
        return {authorFBID: g.getID()};
    }, render: function () {
        var p = this.props.message, q = p.error_data;
        return (k.createElement(k.DOM.div, Object.assign({}, this.props, {className: m(this.props.className, this._getClassNameFromStatus(p)), tabIndex: i.isTransient(q) ? 0 : null, onClick: i.isTransient(q) ? this.messageResend : null}), k.createElement(k.DOM.div, {className: "_2fs1"}), k.createElement(k.DOM.span, {dangerouslySetInnerHTML: {__html: this._getTextFromStatus(p)}})));
    }, messageResend: function () {
        j.getForFBID(this.props.authorFBID).resendMessage(this.props.message);
    }, _getClassNameFromStatus: function (p) {
        if (i.hasErrorStatus(p)) {
            return (("_2fs2") + (' ' + "_2fs3") + (i.isTransient(p.error_data) ? ' ' + "_2fs4" : '') + (i.isPermanent(p.error_data) ? ' ' + "_2fs5" : ''));
        } else return "_2fs6 _2fs2";
    }, _getTextFromStatus: function (p) {
        var q = '', r = p.error_data;
        if (i.hasErrorStatus(p))q = i.getMessage(r);
        if (typeof q === 'object' && q.__html)q = q.__html;
        return q;
    }});
    e.exports = o;
}, null);
__d("SyncRequestTitle.react", ["React", "fbt", "cx"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.createClass({displayName: 'SyncRequestTitle', propTypes: {appName: g.PropTypes.string.isRequired, isSender: g.PropTypes.bool.isRequired, receiverName: g.PropTypes.string.isRequired, senderName: g.PropTypes.string.isRequired}, render: function () {
        if (this.props.isSender) {
            return (g.createElement(g.DOM.div, null, h._("Waiting for {receiver} to accept your invite to play {app_name}.", [h.param("receiver", g.createElement(g.DOM.span, {className: "_dg4"}, this.props.receiverName)), h.param("app_name", g.createElement(g.DOM.span, {className: "_dg5"}, h._("{app}", [h.param("app", this.props.appName)])))])));
        } else return (g.createElement(g.DOM.div, null, h._("{sender} wants to play {app_name} with you, right now.", [h.param("sender", g.createElement(g.DOM.span, {className: "_dg4"}, this.props.senderName)), h.param("app_name", g.createElement(g.DOM.span, {className: "_dg5"}, h._("{app}", [h.param("app", this.props.appName)])))])));
    }});
    e.exports = j;
}, null);
__d("SyncRequestAcceptedMessage.react", ["React", "fbt", "cx"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.createClass({displayName: 'SyncRequestAcceptedMessage', propTypes: {appName: g.PropTypes.string.isRequired, isSender: g.PropTypes.bool.isRequired, receiverName: g.PropTypes.string.isRequired, senderName: g.PropTypes.string.isRequired}, render: function () {
        if (this.props.isSender) {
            return (g.createElement(g.DOM.div, null, h._("{receiver} accepted your invite to play {app_name}.", [h.param("receiver", g.createElement(g.DOM.span, {className: "_dg4"}, this.props.receiverName)), h.param("app_name", g.createElement(g.DOM.span, {className: "_dg5"}, h._("{app}", [h.param("app", this.props.appName)])))])));
        } else return (g.createElement(g.DOM.div, null, h._("You accepted an invite from {sender} to play {app_name}.", [h.param("sender", g.createElement(g.DOM.span, {className: "_dg4"}, this.props.senderName)), h.param("app_name", g.createElement(g.DOM.span, {className: "_dg5"}, h._("{app}", [h.param("app", this.props.appName)])))])));
    }});
    e.exports = j;
}, null);
__d("SyncRequestRejectedMessage.react", ["React", "fbt", "Link.react", "cx", "URI", "AsyncRequest"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = g.createClass({displayName: 'SyncRequestRejectedMessage', propTypes: {requestId: g.PropTypes.string.isRequired, app: g.PropTypes.object.isRequired, isSender: g.PropTypes.bool.isRequired, receiver: g.PropTypes.object.isRequired, sender: g.PropTypes.object.isRequired}, render: function () {
        if (this.props.isSender) {
            return (g.createElement(g.DOM.div, null, h._("{receiver} declined your invite to play {app_name}.", [h.param("receiver", g.createElement(g.DOM.span, {className: "_dg4"}, this.props.receiver.name)), h.param("app_name", g.createElement(g.DOM.span, {className: "_dg5"}, h._("{app}", [h.param("app", this.props.app.name)])))])));
        } else return (g.createElement(g.DOM.div, null, h._("You declined an invite from {sender} to play {app_name}.", [h.param("sender", g.createElement(g.DOM.span, {className: "_dg4"}, this.props.sender.name)), h.param("app_name", g.createElement(g.DOM.span, {className: "_dg5"}, h._("{app}", [h.param("app", this.props.app.name)])))]), g.createElement(g.DOM.div, {className: "_13n7"}, g.createElement(g.DOM.div, null, g.createElement(i, {onClick: this._submitBlockApp}, h._("\u0417\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u0442\u044c {app}", [h.param("app", this.props.app.name)]))), g.createElement(g.DOM.div, null, g.createElement(i, {onClick: this._submitBlockUser}, h._("Block requests from {sender}", [h.param("sender", this.props.sender.name)]))))));
    }, _submitBlockApp: function () {
        var n = new k('/games/block_app/'), o = new l().setURI(n);
        o.setData({app_id: this.props.app.id, source: 'sync_request'});
        o.send();
    }, _submitBlockUser: function () {
        var n = new k('/games/block_user/'), o = new l().setURI(n);
        o.setData({app_id: this.props.app.id, blockee_uid: this.props.sender.id});
        o.send();
    }});
    e.exports = m;
}, null);
__d("SyncRequestExpiredMessage.react", ["React", "fbt", "cx"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.createClass({displayName: 'SyncRequestExpiredMessage', propTypes: {appName: g.PropTypes.string.isRequired, isSender: g.PropTypes.bool.isRequired, receiverName: g.PropTypes.string.isRequired, senderName: g.PropTypes.string.isRequired}, render: function () {
        if (this.props.isSender) {
            return (g.createElement(g.DOM.div, null, h._("{receiver} missed your invite to play {app_name}.", [h.param("receiver", g.createElement(g.DOM.span, {className: "_dg4"}, this.props.receiverName)), h.param("app_name", g.createElement(g.DOM.span, {className: "_dg5"}, h._("{app}", [h.param("app", this.props.appName)])))])));
        } else return (g.createElement(g.DOM.div, null, h._("You missed an invite from {sender} to play {app_name}.", [h.param("sender", g.createElement(g.DOM.span, {className: "_dg4"}, this.props.senderName)), h.param("app_name", g.createElement(g.DOM.span, {className: "_dg5"}, h._("{app}", [h.param("app", this.props.appName)])))])));
    }});
    e.exports = j;
}, null);
__d("SyncRequestCanceledMessage.react", ["React", "fbt", "cx"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.createClass({displayName: 'SyncRequestCanceledMessage', propTypes: {appName: g.PropTypes.string.isRequired, isSender: g.PropTypes.bool.isRequired, receiverName: g.PropTypes.string.isRequired, senderName: g.PropTypes.string.isRequired}, render: function () {
        if (this.props.isSender) {
            return (g.createElement(g.DOM.div, null, h._("You canceled an invite to {receiver} to play {app_name}.", [h.param("receiver", g.createElement(g.DOM.span, {className: "_dg4"}, this.props.receiverName)), h.param("app_name", g.createElement(g.DOM.span, {className: "_dg5"}, h._("{app}", [h.param("app", this.props.appName)])))])));
        } else return (g.createElement(g.DOM.div, null, h._("{sender} canceled an invitation to play {app_name}.", [h.param("sender", g.createElement(g.DOM.span, {className: "_dg4"}, this.props.senderName)), h.param("app_name", g.createElement(g.DOM.span, {className: "_dg5"}, h._("{app}", [h.param("app", this.props.appName)])))])));
    }});
    e.exports = j;
}, null);
__d("SyncRequestTimer.react", ["React", "fbt"], function (a, b, c, d, e, f, g, h) {
    function i(k) {
        if (k) {
            k = Math.ceil(k);
            var l = k % 60;
            if (l < 10)l = '0' + l;
            var m = Math.floor(k / 60);
            return m + ':' + l;
        } else return "0:00";
    }

    var j = g.createClass({displayName: 'SyncRequestTimer', propTypes: {timeRemaining: g.PropTypes.number.isRequired, isSender: g.PropTypes.bool.isRequired, receiverName: g.PropTypes.string.isRequired}, render: function () {
        if (this.props.isSender) {
            return (g.createElement(g.DOM.div, null, h._("({time_remaining} remaining)", [h.param("time_remaining", i(this.props.timeRemaining))])));
        } else return (g.createElement(g.DOM.div, null, h._("You have {time_remaining} to accept.", [h.param("time_remaining", i(this.props.timeRemaining))])));
    }});
    e.exports = j;
}, null);
__d("XSyncRequestSubmitControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/platform\/games\/sync_requests\/submit\/", {request_id: {type: "Int", required: true}, sender: {type: "Int", required: true}, action: {type: "Int", required: true}});
}, null);
__d("SyncRequest.react", ["Arbiter", "AsyncRequest", "ChannelConstants", "React", "SyncRequestStatusEnum", "SyncRequestTitle.react", "SyncRequestAcceptedMessage.react", "SyncRequestRejectedMessage.react", "SyncRequestExpiredMessage.react", "SyncRequestCanceledMessage.react", "SyncRequestTimer.react", "XUIButton.react", "XSyncRequestSubmitControllerURIBuilder", "cx", "fbt", "getObjectValues"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    var w = j.createClass({displayName: 'SyncRequest', propTypes: {app: j.PropTypes.object.isRequired, creationTime: j.PropTypes.number.isRequired, requestId: j.PropTypes.string.isRequired, receiver: j.PropTypes.object.isRequired, sender: j.PropTypes.object.isRequired, status: j.PropTypes.oneOf(v(k)).isRequired, timeout: j.PropTypes.number.isRequired, timeRemaining: j.PropTypes.number.isRequired, viewerId: j.PropTypes.number.isRequired, onStatusUpdate: j.PropTypes.func}, componentWillMount: function () {
        if (this.props.status === k.PENDING) {
            var x = g.subscribe(i.getArbiterType('sync_request_updated'), function (aa, ba) {
                ba = ba.obj;
                if (ba.id.toString() !== this.props.requestId)return;
                this.setState({status: ba.status});
            }.bind(this));
            this.setState({statusEvent: x});
        }
        var y = null;
        if (this.props.status === k.PENDING) {
            var z = function () {
                this.setState({time_remaining: (this.state.time_remaining - 1)});
                if (this.state.time_remaining <= 0) {
                    clearInterval(this.state.counter);
                    var aa = {counter: null, time_remaining: 0};
                    if (this.state.status === k.PENDING)aa.status = k.EXPIRED;
                    this.setState(aa);
                }
            };
            y = setInterval(z.bind(this), 1000);
        }
        this.setState({time_remaining: this.props.timeRemaining, counter: y});
    }, componentWillUnmount: function () {
        if (this.state.counter)clearInterval(this.state.counter);
        g.unsubscribe(this.state.statusEvent);
    }, getInitialState: function () {
        return {buttonsDisabled: false, time: Date.now(), status: this.props.status, viewerIsSender: this.props.viewerId === this.props.sender.id};
    }, componentDidUpdate: function (x, y) {
        if (this.props.status != k.PENDING)this.state.status = this.props.status;
        if (this.props.onStatusUpdate)this.props.onStatusUpdate(this.state.status, y.status);
    }, render: function () {
        var x;
        switch (this.state.status) {
            case k.PENDING:
                var y;
                if (!this.state.viewerIsSender) {
                    y = [j.createElement(r, {use: "confirm", onClick: this._handleAccept, disabled: this.state.buttonsDisabled, label: "\u041f\u0440\u0438\u043d\u044f\u0442\u044c"}), j.createElement(r, {use: "default", onClick: this._handleReject, disabled: this.state.buttonsDisabled, label: "\u041e\u0442\u043a\u043b\u043e\u043d\u0438\u0442\u044c"})];
                } else y = j.createElement(r, {use: "default", onClick: this._handleCancel, disabled: this.state.buttonsDisabled, label: "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c"});
                x = (j.createElement(j.DOM.div, null, j.createElement(j.DOM.div, {className: "_372m"}, j.createElement(l, {appName: this.props.app.name, isSender: this.state.viewerIsSender, receiverName: this.props.receiver.name, senderName: this.props.sender.name})), j.createElement(j.DOM.div, {className: "_372n"}, j.createElement(q, {isSender: this.state.viewerIsSender, timeRemaining: this.state.time_remaining, receiverName: this.props.receiver.name})), j.createElement(j.DOM.div, {className: "_372o"}, y)));
                break;
            case k.ACCEPTED:
                x = j.createElement(j.DOM.div, {className: "_372p mvs"}, j.createElement(m, {appName: this.props.app.name, isSender: this.state.viewerIsSender, receiverName: this.props.receiver.name, senderName: this.props.sender.name}));
                break;
            case k.REJECTED:
                x = j.createElement(j.DOM.div, {className: "_372p mvs"}, j.createElement(n, {requestId: this.props.requestId, app: this.props.app, isSender: this.state.viewerIsSender, receiver: this.props.receiver, sender: this.props.sender}));
                break;
            case k.EXPIRED:
                x = j.createElement(j.DOM.div, {className: "_372p mvs"}, j.createElement(o, {appName: this.props.app.name, isSender: this.state.viewerIsSender, receiverName: this.props.receiver.name, senderName: this.props.sender.name}));
                break;
            case k.CANCELED:
                x = j.createElement(j.DOM.div, {className: "_372p mvs"}, j.createElement(p, {appName: this.props.app.name, isSender: this.state.viewerIsSender, receiverName: this.props.receiver.name, senderName: this.props.sender.name}));
                break;
            default:
                throw new Error('The request status `%s` is unknown.', this.state.status);
        }
        return (j.createElement(j.DOM.div, {className: "_372q"}, x));
    }, _handleAccept: function () {
        this._handleStatusUpdate(k.ACCEPTED);
        var x = window.open(this.props.app.uri);
        if (x)x.focus();
    }, _handleReject: function () {
        this._handleStatusUpdate(k.REJECTED);
    }, _handleCancel: function () {
        this._handleStatusUpdate(k.CANCELED);
    }, _handleStatusUpdate: function (x) {
        this.setState({status: x, buttonsDisabled: true});
        var y = new s().setInt('request_id', this.props.requestId).setInt('sender', this.props.sender.id).setInt('action', x).getURI();
        new h().setURI(y).setHandler(function (z) {
            this.setState({status: x});
        }.bind(this)).setErrorHandler(function (z) {
            this.setState({buttonsDisabled: false});
        }.bind(this)).send();
    }});
    e.exports = w;
}, null);
__d("AbstractDialog.react", ["DialogX", "LayerHideOnBlur", "ReactPropTypes", "copyProperties", "merge"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {createSpec: function (m) {
        return {displayName: m.displayName, propTypes: {behaviors: i.object, className: i.string, modal: i.bool, autohide: i.number, width: i.number, titleID: i.string, causalElement: i.object, causalElementRef: i.string, shown: i.bool, layerHideOnBlur: i.bool, fixedTopPosition: i.number}, createLayer: function (n) {
            var o = this.props.className, p = j({width: this.props.width, xui: true, autohide: this.props.autohide, classNames: o ? o.split(' ') : null, titleID: this.props.titleID, causalElement: this._getCausalElement(), fixedTopPosition: this.props.fixedTopPosition}, m || {}), q = k(m.addedBehaviors, this.props.behaviors);
            if (this.props.layerHideOnBlur !== false)q.LayerHideOnBlur = h;
            p.addedBehaviors = this.enumerateBehaviors(q);
            var r = new g(p, n);
            r.conditionShow(this.props.shown);
            return r;
        }, receiveProps: function (n) {
            this.updateBehaviors(n.behaviors);
            if (this.layer) {
                this.layer.setCausalElement(this._getCausalElement());
                this.layer.conditionShow(n.shown);
                this.layer.setWidth(n.width);
                n.shown && this.layer.updatePosition();
            }
        }, _getCausalElement: function () {
            var n;
            if (this.props.causalElementRef) {
                n = this.getNodeForOwnerRef(this.props.causalElementRef);
            } else n = this.props.causalElement;
            return n;
        }};
    }};
    e.exports = l;
}, null);
__d("ContextualLayer.react", ["ContextualLayer", "React", "ReactLayer", "Style"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = h.PropTypes, l = i.createClass({propTypes: {contextRef: k.string, context: function (m, n, o) {
        if ((m.context == null) == (m.contextRef == null))return new Error(("Exactly one of `context` or `contextRef` must be set on `") + (o + "`."));
        var p = m[n];
        if (p != null) {
            if (typeof p !== 'object')return new Error(("Invalid `" + n + "` supplied to `" + o + "`, ") + ("expected a React component."));
            if (h.isValidComponent(p))return new Error(("Invalid `" + n + "` supplied to `" + o + "`, ") + ("expected a React component instance. You're passing a React ") + ("descriptor."));
        }
    }}, immutableProps: {modal: null}, createLayer: function (m) {
        var n = this._getContextNode(), o = {context: n, contextBounds: this.props.contextBounds, position: this.props.position, alignment: this.props.alignment, offsetX: this.props.offsetX, offsetY: this.props.offsetY, addedBehaviors: this.enumerateBehaviors(this.props.behaviors), shouldSetARIAProperties: this.props.shouldSetARIAProperties}, p = new g(o, m);
        this._node = m;
        this._matchContextSize(this.props);
        if (this.props.contextBounds)p.setContextWithBounds(n, this.props.contextBounds);
        p.conditionShow(this.props.shown);
        return p;
    }, receiveProps: function (m) {
        this.updateBehaviors(m.behaviors);
        var n = this._getContextNode();
        if (m.contextBounds) {
            this.layer.setContextWithBounds(n, m.contextBounds);
        } else this.layer.setContext(n);
        this._matchContextSize(m);
        this.layer.setPosition(m.position);
        this.layer.setAlignment(m.alignment);
        this.layer.setOffsetX(m.offsetX);
        this.layer.setOffsetY(m.offsetY);
        this.layer.conditionShow(m.shown);
    }, _getContextNode: function () {
        var m;
        if (this.props.context) {
            m = this.props.context.getDOMNode();
        } else if (this.props.contextRef)m = this.getNodeForOwnerRef(this.props.contextRef);
        return m;
    }, _matchContextSize: function (m) {
        var n = this._node, o = this._getContextNode();
        if (m.containerWidthMatchContext)j.set(n, 'width', o.offsetWidth + 'px');
        if (m.containerHeightMatchContext)j.set(n, 'height', o.offsetHeight + 'px');
    }});
    e.exports = l;
}, null);
__d("MenuSeparator.react", ["MenuSeparator"], function (a, b, c, d, e, f, g) {
    function h(j) {
        j.isReactLegacyFactory = {};
        j.type = j;
    }

    var i = g;
    h(i);
    e.exports = i;
}, null);
__d("AbstractTextFieldMixin.react", ["React", "Keys", "cx", "invariant", "joinClasses", "cloneWithProps"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {propTypes: {value: g.PropTypes.string, placeholder: g.PropTypes.string, tabIndex: g.PropTypes.string, maxLength: g.PropTypes.number, autoComplete: g.PropTypes.string, onBackspace: g.PropTypes.func, onBackTab: g.PropTypes.func, onBlur: g.PropTypes.func, onChange: g.PropTypes.func, onDownArrow: g.PropTypes.func, onEnter: g.PropTypes.func, onEscape: g.PropTypes.func, onFocus: g.PropTypes.func, onKeyDown: g.PropTypes.func, onLeftArrow: g.PropTypes.func, onNoShiftEnter: g.PropTypes.func, onRightArrow: g.PropTypes.func, onShiftEnter: g.PropTypes.func, onShiftDownArrow: g.PropTypes.func, onShiftUpArrow: g.PropTypes.func, onTab: g.PropTypes.func, onUpArrow: g.PropTypes.func, type: g.PropTypes.string, autoCapitalize: g.PropTypes.string, autoCorrect: g.PropTypes.string}, getInitialState: function () {
        return {focused: false, value: this.props.defaultValue || ''};
    }, getValue: function () {
        return this.props.value != null ? '' + this.props.value : this.state.value;
    }, onInputKeyDown: function (n) {
        var o = this.props, p = n.keyCode, q = n.shiftKey;
        if (p === h.BACKSPACE && !q && o.onBackspace) {
            o.onBackspace(n);
        } else if (p === h.TAB && !q && o.onTab) {
            o.onTab(n);
        } else if (p === h.TAB && q && o.onBackTab) {
            o.onBackTab(n);
        } else if (p === h.UP) {
            if (q) {
                if (o.onShiftUpArrow)o.onShiftUpArrowAttempt(n);
            } else if (o.onUpArrow)o.onUpArrow(n);
        } else if (p === h.DOWN && o.onDownArrow) {
            if (q) {
                if (o.onShiftDownArrow)o.onShiftDownArrow(n);
            } else if (o.onDownArrow)o.onDownArrow(n);
        } else if (p === h.LEFT && o.onLeftArrow) {
            o.onLeftArrow(n);
        } else if (p === h.RIGHT && o.onRightArrow) {
            o.onRightArrow(n);
        } else if (p === h.RETURN) {
            if (o.onEnter)o.onEnter(n);
            if (q) {
                if (o.onShiftEnter)o.onShiftEnter(n);
            } else if (o.onNoShiftEnter)o.onNoShiftEnter(n);
        } else if (p === h.ESC && o.onEscape)o.onEscape(n);
        if (o.onKeyDown)o.onKeyDown(n);
    }, onInputChange: function (n) {
        if (this.props.onChange)this.props.onChange(n);
        this.setState({value: n.target.value});
    }, focusInput: function () {
        this.getTextFieldDOM().focus();
    }, blurInput: function () {
        this.getTextFieldDOM().blur();
    }, onInputBlur: function (event) {
        if (this.props.onBlur)this.props.onBlur(event);
        if (!event.isDefaultPrevented())this.setState({focused: false});
    }, onInputFocus: function (event) {
        if (this.props.onFocus)this.props.onFocus(event);
        if (!event.isDefaultPrevented())this.setState({focused: true});
    }, getTextFieldDOM: function () {
        return this.refs[this.getTextFieldRef()].getDOMNode();
    }, getTextFieldRef: function () {
        return 'textField';
    }, setTextFieldPropsOn: function (n) {
        return l(n, {'aria-activedescendant': this.props['aria-activedescendant'], 'aria-autocomplete': this.props['aria-autocomplete'], 'data-testid': this.props['data-testid'], ref: this.getTextFieldRef(), autoCapitalize: this.props.autoCapitalize, autoComplete: this.props.autoComplete, autoCorrect: this.props.autoCorrect, onKeyDown: this.onInputKeyDown, onBlur: this.onInputBlur, onFocus: this.onInputFocus, onChange: this.onInputChange, disabled: this.props.disabled, defaultValue: this.props.defaultValue, name: this.props.name, value: this.getValue(), id: this.props.id, maxLength: this.props.maxLength, min: this.props.min, max: this.props.max, title: this.props.title, type: this.props.type || n.props.type});
    }, render: function () {
        var n = null;
        if (!this.getValue()) {
            var o = (("_58ai") + (this.state.focused ? ' ' + "_58aj" : ''));
            n = g.createElement(g.DOM.span, {className: o}, this.props.placeholder);
        }
        var p = k(this.props.className, "_58ak");
        j(this.renderTextField);
        return (g.createElement(g.DOM.label, {className: p}, {placeholder: n, textField: this.renderTextField()}));
    }};
    e.exports = m;
}, null);
__d("AbstractTextInput.react", ["AbstractTextFieldMixin.react", "React", "cx"], function (a, b, c, d, e, f, g, h, i) {
    var j = h.createClass({displayName: 'AbstractTextInput', mixins: [g], renderTextField: function () {
        return this.setTextFieldPropsOn(h.createElement(h.DOM.input, {type: "text", className: "_58al", tabIndex: this.props.tabIndex, onClick: this.props.onClick, onKeyUp: this.props.onKeyUp, onPaste: this.props.onPaste}));
    }});
    e.exports = j;
}, null);
__d("SearchableTextInput.react", ["EventListener", "React", "AbstractTextFieldMixin.react", "AbstractTextInput.react", "getActiveElement", "merge"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = h.createClass({displayName: 'SearchableTextInput', propTypes: l(i.propTypes, {queryString: h.PropTypes.string, searchSource: h.PropTypes.object, searchSourceOptions: h.PropTypes.object, onEntriesFound: h.PropTypes.func.isRequired, searchOnFocus: h.PropTypes.bool, searchOnUpdate: h.PropTypes.bool, onPaste: h.PropTypes.func, onFocus: h.PropTypes.func, onChange: h.PropTypes.func}), componentDidMount: function () {
        if (this.props.onPaste)this._listener = g.listen(this.refs.input.getTextFieldDOM(), 'paste', this.props.onPaste);
    }, componentDidUpdate: function (n) {
        if (this.props.searchOnUpdate)if (n.queryString !== this.props.queryString)this.search(this.props.queryString);
    }, componentWillUnmount: function () {
        if (this._listener) {
            this._listener.remove();
            this._listener = null;
        }
    }, _onInputFocus: function () {
        this.props.searchSource.bootstrap(function () {
            if (this.props.searchOnFocus)this.search(this.props.queryString);
        }.bind(this));
        this.props.onFocus && this.props.onFocus();
    }, _onSearchCallback: function (n, o) {
        if (this.props.queryString === o)this.props.onEntriesFound(n);
    }, _onChange: function (event) {
        this.props.onChange && this.props.onChange(event);
        var n = event.target.value;
        setTimeout(function () {
            this.search(n);
        }.bind(this));
    }, search: function (n) {
        this.props.searchSource.search(n, this._onSearchCallback, this.props.searchSourceOptions);
    }, focusInput: function () {
        var n = this.getTextFieldDOM();
        if (k() === n) {
            this._onInputFocus();
        } else n.offsetHeight && n.focus();
    }, blurInput: function () {
        var n = this.getTextFieldDOM();
        n.offsetHeight && n.blur();
    }, getTextFieldDOM: function () {
        return this.refs.input.getTextFieldDOM();
    }, render: function () {
        return (h.createElement(j, Object.assign({}, this.props, {ref: "input", value: this.props.queryString || '', onFocus: this._onInputFocus, onChange: this._onChange})));
    }});
    e.exports = m;
}, null);
__d("TypeaheadView.react", ["React", "cx", "merge"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.createClass({displayName: 'TypeaheadView', propTypes: {entries: g.PropTypes.array.isRequired, extraRendererProps: g.PropTypes.object, highlightedEntry: g.PropTypes.object, isVisible: g.PropTypes.bool, queryString: g.PropTypes.string, Renderer: g.PropTypes.func.isRequired, selectedEntry: g.PropTypes.object}, _onSelect: function (k, l) {
        if (this.props.onSelect)this.props.onSelect(k, l);
    }, _onHighlight: function (k) {
        this.props.onHighlight(k);
    }, render: function () {
        var k = ((!this.props.isVisible ? "hidden_elem" : '')), l = i({highlightedEntry: this.props.highlightedEntry, selectedEntry: this.props.selectedEntry, entries: this.props.entries, onSelect: this._onSelect, onHighlight: this._onHighlight, onRenderHighlight: this.props.onRenderHighlight, queryString: this.props.queryString}, this.props.extraRendererProps), m = this.props.Renderer;
        return (g.createElement(g.DOM.div, {className: k}, g.createElement(m, Object.assign({}, l))));
    }});
    e.exports = j;
}, null);
__d("AbstractTypeahead.react", ["AbstractTextFieldMixin.react", "ContextualLayer.react", "InputSelection", "React", "ReactLayeredComponentMixin", "SearchableTextInput.react", "TypeaheadNavigation", "TypeaheadView.react", "cx", "getOrCreateDOMID", "merge", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = 10, t = j.createClass({displayName: 'AbstractTypeahead', mixins: [k], propTypes: q(g.propTypes, {inputClassName: j.PropTypes.string, inputID: j.PropTypes.string, autoCapitalize: j.PropTypes.string, autoComplete: j.PropTypes.string, autoCorrect: j.PropTypes.string, queryString: j.PropTypes.string, searchSource: j.PropTypes.object.isRequired, searchSourceOptions: j.PropTypes.object, excludedEntries: j.PropTypes.object, presenter: j.PropTypes.object.isRequired, onSelectAttempt: j.PropTypes.func, onEnterWithoutSelection: j.PropTypes.func, autoHighlight: j.PropTypes.bool, showEntriesOnFocus: j.PropTypes.bool, selectOnBlur: j.PropTypes.bool, selectOnTab: j.PropTypes.bool, focusedOnInit: j.PropTypes.bool, hideViewWithEntries: j.PropTypes.bool, disabled: j.PropTypes.bool, entriesWidthMatchContext: j.PropTypes.bool, selectedEntry: j.PropTypes.object, onTypeaheadVisibilityChanged: j.PropTypes.func, onPaste: j.PropTypes.func}), getDefaultProps: function () {
        return {autoComplete: 'off', autoCorrect: 'off', selectOnBlur: false, selectOnTab: true, hideViewWithEntries: true, entriesWidthMatchContext: true};
    }, getInitialState: function () {
        return {highlightedEntry: null, isAutoHighlight: this.props.autoHighlight, activeDescendant: null, activeEntries: [], focused: !!this.props.focusedOnInit, viewIsVisible: !!this.props.focusedOnInit};
    }, _onRenderHighlight: function (u) {
        var v = p(u);
        this.setState({activeDescendant: v});
    }, _onEntriesFound: function (u) {
        if (!this.isMounted())return;
        if (this.props.excludedEntries) {
            var v = this.props.excludedEntries;
            u = u.filter(function (da) {
                return !v.hasOwnProperty(da.getUniqueID());
            });
        }
        var w = this.props.presenter, x = typeof w.sortEntries == 'function' ? w.sortEntries(u) : u, y = x.slice(0, w.maxEntries || s);
        if (!y.length) {
            this.setState({activeDescendant: null, activeEntries: y, highlightedEntry: null, isAutoHighlight: this.props.autoHighlight});
            this._setViewIsVisible(false);
            return;
        }
        var z = this.state.highlightedEntry, aa = z && y.indexOf(z) !== -1, ba = (this.state.focused && (this.props.showEntriesOnFocus || this.props.queryString.length > 0));
        if (!this.props.autoHighlight) {
            this.setState({activeEntries: y, highlightedEntry: aa ? z : null});
            if (ba)this._setViewIsVisible(true);
            return;
        }
        var ca = this.state.isAutoHighlight;
        if (ca) {
            z = y[0];
        } else {
            z = aa ? z : y[0];
            ca = !aa;
        }
        this.setState({activeEntries: y, highlightedEntry: z, isAutoHighlight: ca});
        if (ba)this._setViewIsVisible(true);
    }, _onInputFocus: function () {
        if ((this.state.activeEntries.length && this.state.queryString) || this.props.showEntriesOnFocus)this._setViewIsVisible(true);
        this.setState({focused: true});
        this.props.onFocus && this.props.onFocus();
    }, _onInputBlur: function () {
        if (this.props.hideViewWithEntries) {
            this._setViewIsVisible(false);
            this.clearActiveEntries();
        }
        if (this.props.selectOnBlur && this.state.highlightedEntry)this.props.onSelectAttempt(this.state.highlightedEntry);
        this.setState({focused: false});
        this.props.onBlur && this.props.onBlur();
    }, _onInputClick: function () {
        var u = this.getTextFieldDOM(), v = i.get(u);
        if (v && v.start == v.end)u.select();
        this.props.onClick && this.props.onClick();
    }, _onEnter: function (event) {
        if (this.props.onEnterWithoutSelection && (!this.state.viewIsVisible || !this.state.highlightedEntry)) {
            this.props.onEnterWithoutSelection(event);
            return;
        }
        if (!this.state.viewIsVisible)return;
        if (!this.state.highlightedEntry) {
            event.preventDefault();
            return;
        }
        if (this.props.hideViewWithEntries)this._setViewIsVisible(false);
        if (this.props.onSelectAttempt)this.props.onSelectAttempt(this.state.highlightedEntry);
        event.preventDefault();
    }, _onTab: function (event) {
        if (this.props.selectOnTab && this.state.viewIsVisible && this.props.onSelectAttempt && this.state.highlightedEntry) {
            if (this.props.hideViewWithEntries) {
                this._setViewIsVisible(false);
                event.preventDefault();
            }
            this.props.onSelectAttempt(this.state.highlightedEntry);
        }
    }, _onDownArrow: function (event) {
        event.preventDefault();
        m.moveDown(this.state.activeEntries, this.state.highlightedEntry, this._setHighlight);
    }, _onUpArrow: function (event) {
        event.preventDefault();
        m.moveUp(this.state.activeEntries, this.state.highlightedEntry, this._setHighlight);
    }, _setHighlight: function (u) {
        this.setState({highlightedEntry: u, isAutoHighlight: !u});
    }, _onInputChange: function (event) {
        if (this.props.onChange)this.props.onChange(event);
        this._setViewIsVisible(this.state.focused && (this.props.showEntriesOnFocus || event.target.value.length > 0) && this.state.activeEntries.length > 0);
    }, _onViewHighlight: function (u) {
        this.setState({highlightedEntry: u, isAutoHighlight: false});
    }, _getView: function () {
        return (j.createElement(n, {Renderer: this.props.presenter.ViewRenderer, extraRendererProps: this.props.presenter.extraRendererProps, highlightedEntry: this.state.highlightedEntry, selectedEntry: this.props.selectedEntry, isVisible: this.state.viewIsVisible, onHighlight: this._onViewHighlight, onRenderHighlight: this._onRenderHighlight, onSelect: this.props.onSelectAttempt, entries: this.state.activeEntries, queryString: this.props.queryString}));
    }, _setViewIsVisible: function (u) {
        if (u !== this.state.viewIsVisible) {
            if (this.props.onTypeaheadVisibilityChanged)this.props.onTypeaheadVisibilityChanged(u, this.state.activeEntries);
            this.setState({viewIsVisible: u});
        }
    }, componentWillReceiveProps: function (u) {
        if (!u.queryString && !this.props.showEntriesOnFocus)this.clearActiveEntries();
    }, renderLayers: function () {
        if (!this.props.presenter.useLayer)return {};
        var u = null, v = null;
        if (this.props.context) {
            u = this.props.context;
        } else v = 'input';
        return {typeaheadView: j.createElement(h, {behaviors: this.props.presenter.layerBehaviors, containerWidthMatchContext: this.props.entriesWidthMatchContext, contextRef: v, context: u, position: "below", shown: this.state.viewIsVisible, shouldSetARIAProperties: false}, this._getView())};
    }, render: function () {
        var u = j.createElement(l, {'aria-activedescendant': this.state.activeDescendant, 'aria-autocomplete': "list", ref: "input", autoCapitalize: this.props.autoCapitalize, autoComplete: this.props.autoComplete, autoCorrect: this.props.autoCorrect, className: this.props.inputClassName, id: this.props.inputID, queryString: this.props.queryString, placeholder: this.props.placeholder, searchSource: this.props.searchSource, searchSourceOptions: this.props.searchSourceOptions, searchOnFocus: !!this.props.showEntriesOnFocus, disabled: this.props.disabled, onEntriesFound: this._onEntriesFound, onEscape: this.props.onEscape, onBlur: this._onInputBlur, onFocus: this._onInputFocus, onChange: this._onInputChange, onDownArrow: this._onDownArrow, onUpArrow: this._onUpArrow, onTab: this._onTab, onEnter: this._onEnter, onBackspace: this.props.onBackspace, onPaste: this.props.onPaste, onClick: this._onInputClick}), v = null;
        if (!this.props.presenter.useLayer)v = this._getView();
        return (j.createElement(j.DOM.span, Object.assign({}, this.props, {className: r(this.props.className, "_58ah"), onBlur: null, onClick: null, onFocus: null}), {searchableInput: u, view: v}));
    }, componentDidMount: function () {
        if (this.props.focusedOnInit)this.refs.input.focusInput();
    }, clearActiveEntries: function () {
        this.setState({activeDescendant: null, activeEntries: [], highlightedEntry: null});
    }, focusInput: function () {
        this.refs.input.focusInput();
    }, blurInput: function () {
        if (this.refs.input.blur) {
            this.refs.input.blur();
        } else if (this.refs.input.blurInput)this.refs.input.blurInput();
    }, hideView: function () {
        this._setViewIsVisible(false);
    }, getTextFieldDOM: function () {
        return this.refs.input.getTextFieldDOM();
    }});
    e.exports = t;
}, null);
__d("XUIBadge.react", ["React", "cx", "invariant", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j) {
    function k(m) {
        return parseInt(m, 10) === m;
    }

    var l = g.createClass({displayName: 'XUIBadge', propTypes: {type: g.PropTypes.oneOf(['regular', 'special']), count: g.PropTypes.number.isRequired, maxcount: g.PropTypes.number}, getDefaultProps: function () {
        return {type: 'regular', maxcount: 20};
    }, render: function () {
        var m = this.props.type, n = this.props.count, o = this.props.maxcount;
        i(k(n));
        i(k(o));
        var p = (("_5ugh") + (n > o ? ' ' + "_5ugi" : '') + (m === 'regular' ? ' ' + "_5ugf" : '') + (m === 'special' ? ' ' + "_5ugg" : '') + (n === 0 ? ' ' + "hidden_elem" : ''));
        return (g.createElement(g.DOM.span, Object.assign({}, this.props, {className: j(this.props.className, p), type: null}), n > o ? o + '+' : n));
    }});
    e.exports = l;
}, null);
__d("XUIDialog.react", ["AbstractDialog.react", "LayerFadeOnShow", "ReactLayer"], function (a, b, c, d, e, f, g, h, i) {
    var j = i.createClass(g.createSpec({displayName: 'XUIDialog', addedBehaviors: {LayerFadeOnShow: h}}));
    e.exports = j;
}, null);
__d("str2rstr", [], function (a, b, c, d, e, f) {
    function g(h) {
        var i = "", j, k;
        for (var l = 0; l < h.length; l++) {
            j = h.charCodeAt(l);
            k = l + 1 < h.length ? h.charCodeAt(l + 1) : 0;
            if (55296 <= j && j <= 56319 && 56320 <= k && k <= 57343) {
                j = 65536 + ((j & 1023) << 10) + (k & 1023);
                l++;
            }
            if (j <= 127) {
                i += String.fromCharCode(j);
            } else if (j <= 2047) {
                i += String.fromCharCode(192 | ((j >>> 6) & 31), 128 | (j & 63));
            } else if (j <= 65535) {
                i += String.fromCharCode(224 | ((j >>> 12) & 15), 128 | ((j >>> 6) & 63), 128 | (j & 63));
            } else if (j <= 2097151)i += String.fromCharCode(240 | ((j >>> 18) & 7), 128 | ((j >>> 12) & 63), 128 | ((j >>> 6) & 63), 128 | (j & 63));
        }
        return i;
    }

    e.exports = g;
}, null);
__d("WebMessengerEvents", ["Arbiter", "copyProperties"], function (a, b, c, d, e, f, g, h) {
    var i = h(new g(), {MASTER_DOM_CHANGED: 'master-dom-changed', DETAIL_DOM_CHANGED: 'detail-dom-changed', FOCUS_COMPOSER: 'focus-composer', FOCUS_SEARCH: 'focus-search', FOCUS_AND_SELECT_SEARCH: 'focus-and-select-search', STICKER_CLICKED: 'sticker-clicked', SUBMIT_REPLY: 'submit-reply', UPDATE_SELECTION: 'update-selection', masterDOMChanged: function () {
        this.inform(i.MASTER_DOM_CHANGED);
    }, detailDOMChanged: function () {
        this.inform(i.DETAIL_DOM_CHANGED);
    }, focusComposer: function () {
        this.inform(i.FOCUS_COMPOSER);
    }, focusSearch: function () {
        this.inform(i.FOCUS_SEARCH);
    }, focusAndSelectSearch: function () {
        this.inform(i.FOCUS_AND_SELECT_SEARCH);
    }, updateSelection: function (j) {
        this.inform(i.UPDATE_SELECTION, j);
    }, stickerClicked: function (j, k) {
        this.inform(i.STICKER_CLICKED, {packID: j, stickerID: k});
    }, submitReply: function () {
        this.inform(i.SUBMIT_REPLY);
    }});
    e.exports = i;
}, null);
__d("WebMessengerSubscriptionsHandler", ["SubscriptionsHandler"], function (a, b, c, d, e, f, g) {
    var h = new g('webmessenger');
    e.exports = h;
}, null);
__d("isWebMessengerURI", [], function (a, b, c, d, e, f) {
    function g(h) {
        return (/^(\/messages)/).test(h.getPath());
    }

    e.exports = g;
}, null);
__d("WebMessengerWidthControl", ["Arbiter", "CSS", "CSSClassTransition", "DOM", "DOMDimensions", "Event", "Style", "URI", "ViewportBounds", "WebMessengerEvents", "WebMessengerSubscriptionsHandler", "$", "cx", "csx", "isWebMessengerURI", "requestAnimationFrame", "setTimeoutAcrossTransitions", "shield", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    var z = 205, aa = 981, ba = 257, ca = 18, da = 848, ea = 724, fa = .57, ga = 56, ha, ia, ja;

    function ka(pa, qa, ra) {
        this.masterChanged = pa;
        this.detailChaned = qa;
        q.addSubscriptions(l.listen(window, 'resize', y(x(la, this, this), 100)), g.subscribe(['sidebar/initialized', 'sidebar/show', 'sidebar/hide', 'minisidebar/show'], x(la, this, this), g.SUBSCRIBE_NEW));
        var sa = oa() ? ga : 0;
        if (ra)sa = z;
        this._width = oa() ? 0 : da;
        ja = true;
        la(this, sa);
    }

    function la(pa, qa) {
        var ra = o.getRight() + o.getLeft();
        ra = ra || qa || 0;
        var sa = k.getViewportWithoutScrollbarDimensions().width - ra, ta = Math.round(Math.max(0, sa / 2 - aa / 2));
        sa = aa + ta - ba;
        sa -= ca;
        sa = Math.max(ea, Math.min(da, sa));
        if (!isNaN(sa) && pa._width !== sa) {
            pa._width = sa;
            var ua = Math.round(sa / (1 + fa)), va = sa - ua;
            pa.masterChanged(va);
            pa.detailChaned(ua);
            if (oa()) {
                var wa = sa + ba;
                ma(function () {
                    if (ia) {
                        document.body.className = ia;
                        ia = '';
                    }
                    na(wa + 'px');
                    h.removeClass(document.body, "_5uj5");
                    ja && p.detailDOMChanged();
                    ja = false;
                }, ia);
            }
        }
    }

    function ma(pa, qa) {
        qa && h.addClass(document.documentElement, "_5uj6");
        v(pa);
        qa && w(h.removeClass.bind(null, document.documentElement, "_5uj6"), 1000);
    }

    function na(pa) {
        m.set(j.find(document, "div._uaw"), 'width', pa);
        m.set(r('globalContainer'), 'width', pa);
    }

    function oa() {
        if (!ha)ha = h.hasClass(document.body, "_6nw");
        return ha;
    }

    i.registerHandler(function (pa, qa, ra, sa) {
        function ta(ua) {
            return oa() && u(n(ua));
        }

        if (ta(sa)) {
            ia = qa;
            return true;
        } else if (ta(ra)) {
            ma(function () {
                pa.className = qa;
                na('');
            }, true);
            return true;
        }
    });
    e.exports = ka;
}, null);
__d("Dock", ["Event", "shield", "Arbiter", "ArbiterMixin", "ChatQuietLinks", "CSS", "DataStore", "DOM", "Parent", "Style", "Toggler", "Vector", "copyProperties", "csx", "emptyFunction", "WebMessengerWidthControl"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
    b('WebMessengerWidthControl');
    function v() {
    }

    s(v, j, {MIN_HEIGHT: 140, INITIAL_FLYOUT_HEIGHT_OFFSET: 10, init: function (w) {
        this.init = u;
        this.rootEl = w;
        this.calculateViewportDimensions();
        this.calculateFlyoutHeightOffset();
        k.removeEmptyHrefs(this.rootEl);
        g.listen(w, 'click', this._onClick.bind(this));
        g.listen(window, 'resize', this._onWindowResize.bind(this));
        q.subscribe(['show', 'hide'], function (x, y) {
            var z = y.getActive();
            if (!n.contains(w, z))return;
            if (l.hasClass(z, 'fbNub')) {
                this.notifyNub(z, x);
                if (x === 'show')this._resizeNubFlyout(z);
            } else {
                var aa = o.byClass(z, 'fbNubFlyout');
                if (aa)l.conditionClass(aa, 'menuOpened', x === 'show');
            }
        }.bind(this));
        this.inform('init', {}, i.BEHAVIOR_PERSISTENT);
    }, calculateViewportDimensions: function () {
        return (this.viewportDimensions = r.getViewportDimensions());
    }, calculateFlyoutHeightOffset: function () {
        this.flyoutHeightOffset = this.INITIAL_FLYOUT_HEIGHT_OFFSET + r.getElementDimensions(this.rootEl).y;
        var w = n.scry(document, "div._4f7n")[0];
        if (w) {
            var x = p.isFixed(w) ? 'viewport' : 'document';
            this.flyoutHeightOffset += r.getElementPosition(w, x).y + r.getElementDimensions(w).y;
        }
    }, toggle: function (w) {
        var x = this._findFlyout(w);
        if (!x)return;
        this.subscribe('init', function () {
            q.toggle(w);
        });
    }, show: function (w) {
        this.subscribe('init', function () {
            q.show(w);
        });
    }, showNub: function (w) {
        l.show(w);
    }, hide: function (w) {
        this.subscribe('init', function () {
            var x = q.getInstance(w);
            n.contains(w, x.getActive()) && x.hide();
        });
    }, hideNub: function (w) {
        l.hide(w);
        this.hide(w);
    }, setUseMaxHeight: function (w, x) {
        l.conditionClass(w, 'maxHeight', x !== false);
        this._resizeNubFlyout(w);
    }, _resizeNubFlyout: function (w) {
        var x = this._findFlyout(w);
        if (!x || !(l.hasClass(w, 'openToggler') || l.hasClass(w, 'opened')))return;
        var y = n.find(x, 'div.fbNubFlyoutOuter'), z = n.find(y, 'div.fbNubFlyoutInner'), aa = n.find(z, 'div.fbNubFlyoutBody'), ba = aa.scrollTop, ca = aa.offsetHeight;
        p.set(aa, 'height', 'auto');
        var da = r.getElementDimensions(x), ea = r.getElementDimensions(aa), fa = this.getMaxFlyoutHeight(w);
        p.set(x, 'max-height', fa + 'px');
        p.set(y, 'max-height', fa + 'px');
        da = r.getElementDimensions(x);
        var ga = r.getElementDimensions(z), ha = ga.y - ea.y, ia = da.y - ha, ja = parseInt(aa.style.height || aa.clientHeight, 10), ka = ia !== ja;
        if (da.y > ha && ka)p.set(aa, 'height', ia + 'px');
        l.removeClass(x, 'swapDirection');
        var la = r.getElementPosition(x).x;
        l.conditionClass(x, 'swapDirection', function () {
            if (la < 0)return true;
            return (la + da.x > this.viewportDimensions.x);
        }.bind(this)());
        if (ka && ba + ca >= ea.y) {
            aa.scrollTop = aa.scrollHeight;
        } else aa.scrollTop = ba;
        this.notifyNub(w, 'resize');
    }, getMaxFlyoutHeight: function (w) {
        var x = this._findFlyout(w), y = r.getElementPosition(x, 'viewport'), z = r.getElementDimensions(x), aa = Math.max(this.MIN_HEIGHT, this.viewportDimensions.y - this.flyoutHeightOffset) - (this.viewportDimensions.y - y.y - z.y);
        return Math.max(aa, 0);
    }, resizeAllFlyouts: function () {
        var w = this._getAllNubs(), x = w.length;
        while (x--)this._resizeNubFlyout(w[x]);
    }, hideAllFlyouts: function () {
        var w = this._getAllNubs(), x = w.length;
        while (x--)this.hide(w[x]);
    }, _getAllNubs: function () {
        var w = n.scry(this.rootEl, "div._50-v.openToggler");
        return w.concat(n.scry(this.rootEl, "div._50-v.opened"));
    }, _onClick: function (event) {
        var w = event.getTarget(), x = o.byClass(w, 'fbNub');
        if (x) {
            if (o.byClass(w, 'fbNubFlyoutTitlebar')) {
                var y = o.byTag(w, 'a'), z = w.nodeName == 'INPUT' && w.getAttribute('type') == 'submit';
                if (!y && !z) {
                    this.hide(x);
                    return false;
                }
            }
            this.notifyNub(x, 'click');
        }
    }, _onWindowResize: function (event) {
        this.calculateViewportDimensions();
        this.resizeAllFlyouts();
    }, _findFlyout: function (w) {
        return l.hasClass(w, 'fbNubFlyout') ? w : n.scry(w, 'div.fbNubFlyout')[0] || null;
    }, registerNubController: function (w, x) {
        m.set(w, 'dock:nub:controller', x);
        x.subscribe('nub/button/content-changed', h(this.inform, this, 'resize', w));
        x.subscribe('nub/flyout/content-changed', h(this._resizeNubFlyout, this, w));
    }, unregisterNubController: function (w) {
        m.remove(w, 'dock:nub:controller');
    }, notifyNub: function (w, x, y) {
        var z = m.get(w, 'dock:nub:controller');
        z && z.inform(x, y);
    }});
    e.exports = a.Dock || v;
}, null);
__d("NubController", ["ArbiterMixin", "Dock", "copyProperties"], function (a, b, c, d, e, f, g, h, i) {
    function j() {
    }

    i(j.prototype, g, {init: function (k) {
        this.el = k;
        h.registerNubController(k, this);
        return this;
    }, buttonContentChanged: function () {
        this.inform('nub/button/content-changed');
    }, flyoutContentChanged: function () {
        this.inform('nub/flyout/content-changed');
    }, hide: function () {
        h.hide(this.el);
    }, show: function () {
        h.show(this.el);
    }});
    e.exports = j;
}, null);
__d("BlobFactory", ["emptyFunction"], function (a, b, c, d, e, f, g) {
    var h, i = a.BlobBuilder || a.WebKitBlobBuilder || a.MozBlobBuilder || a.MSBlobBuilder;
    if (a.Blob) {
        var j;
        try {
            new a.Blob();
            j = true;
        } catch (k) {
            j = false;
        }
        h = {getBlob: function (l, m) {
            l = l || [];
            m = m || {};
            if (j) {
                return new a.Blob(l, m);
            } else {
                var n = new i();
                for (var o = 0; o < l.length; o++)n.append(l[o]);
                return n.getBlob(m.type);
            }
        }, isSupported: g.thatReturnsTrue};
    } else h = {getBlob: function () {
    }, isSupported: g.thatReturnsFalse};
    e.exports = h;
}, null);
__d("arraySort", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(i, j) {
        g(Array.isArray(i));
        var k = i.slice();
        if (j)return k.sort(j);
        return k.sort();
    }

    e.exports = h;
}, null);
__d("OrderedMap", ["invariant", "mixInto"], function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i = 'key:';

    function j(q, r) {
        var s = {};
        for (var t = 0; t < q.length; t++) {
            var u = q[t], v = r(u);
            l(v);
            var w = i + v;
            g(!(w in s));
            s[w] = u;
        }
        return s;
    }

    function k(q, r) {
        this._normalizedObj = q;
        this._computedPositions = null;
        this.length = r;
    }

    function l(q) {
        g(q !== '' && (typeof q === 'string' || typeof q === 'number'));
    }

    function m(q, r, s) {
        g(typeof q === 'number' && typeof r === 'number' && r >= 0 && q >= 0 && q + r <= s);
    }

    function n(q, r) {
        g(q && q.constructor === Object && (!r || r.constructor === Object));
        var s = {}, t = 0, u;
        for (u in q)if (q.hasOwnProperty(u)) {
            s[u] = q[u];
            t++;
        }
        for (u in r)if (r.hasOwnProperty(u)) {
            if (!(u in s))t++;
            s[u] = r[u];
        }
        return new k(s, t);
    }

    var o = {has: function (q) {
        l(q);
        var r = i + q;
        return r in this._normalizedObj;
    }, get: function (q) {
        l(q);
        var r = i + q;
        return this.has(q) ? this._normalizedObj[r] : undefined;
    }, merge: function (q) {
        g(q instanceof k);
        return n(this._normalizedObj, q._normalizedObj);
    }, map: function (q, r) {
        return this.mapRange(q, 0, this.length, r);
    }, mapRange: function (q, r, s, t) {
        var u = this._normalizedObj, v = {}, w = 0;
        m(r, s, this.length);
        var x = r + s - 1;
        for (var y in u)if (u.hasOwnProperty(y)) {
            if (w >= r) {
                if (w > x)break;
                var z = u[y];
                v[y] = q.call(t, z, y.substr(i.length), w);
            }
            w++;
        }
        return new k(v, s);
    }, filter: function (q, r) {
        return this.filterRange(q, 0, this.length, r);
    }, filterRange: function (q, r, s, t) {
        var u = {}, v = 0;
        this.forEachRange(function (w, x, y) {
            if (q.call(t, w, x, y)) {
                var z = i + x;
                u[z] = w;
                v++;
            }
        }, r, s);
        return new k(u, v);
    }, forEach: function (q, r) {
        this.forEachRange(q, 0, this.length, r);
    }, forEachRange: function (q, r, s, t) {
        m(r, s, this.length);
        var u = this._normalizedObj, v = 0, w = r + s - 1;
        for (var x in u)if (u.hasOwnProperty(x)) {
            if (v >= r) {
                if (v > w)break;
                var y = u[x];
                q.call(t, y, x.substr(i.length), v);
            }
            v++;
        }
    }, mapKeyRange: function (q, r, s, t) {
        var u = this.indexOfKey(r), v = this.indexOfKey(s);
        g(u !== undefined && v !== undefined);
        g(v >= u);
        return this.mapRange(q, u, (v - u) + 1, t);
    }, forEachKeyRange: function (q, r, s, t) {
        var u = this.indexOfKey(r), v = this.indexOfKey(s);
        g(u !== undefined && v !== undefined);
        g(v >= u);
        this.forEachRange(q, u, (v - u) + 1, t);
    }, keyAtIndex: function (q) {
        var r = this._getOrComputePositions(), s = r.keyByIndex[q];
        return s ? s.substr(i.length) : undefined;
    }, keyAfter: function (q) {
        return this.nthKeyAfter(q, 1);
    }, keyBefore: function (q) {
        return this.nthKeyBefore(q, 1);
    }, nthKeyAfter: function (q, r) {
        var s = this.indexOfKey(q);
        g(s !== undefined);
        return this.keyAtIndex(s + r);
    }, nthKeyBefore: function (q, r) {
        return this.nthKeyAfter(q, -r);
    }, indexOfKey: function (q) {
        l(q);
        var r = i + q, s = this._getOrComputePositions(), t = s.indexByKey[r];
        return t === undefined ? undefined : t;
    }, toArray: function () {
        var q = [], r = this._normalizedObj;
        for (var s in r)if (r.hasOwnProperty(s))q.push(r[s]);
        return q;
    }, _getOrComputePositions: function () {
        var q = this._computedPositions;
        if (!q)this._computePositions();
        return this._computedPositions;
    }, _computePositions: function () {
        this._computedPositions = {keyByIndex: {}, indexByKey: {}};
        var q = this._computedPositions.keyByIndex, r = this._computedPositions.indexByKey, s = 0, t = this._normalizedObj;
        for (var u in t)if (t.hasOwnProperty(u)) {
            q[s] = u;
            r[u] = s;
            s++;
        }
    }};
    h(k, o);
    var p = {from: function (q) {
        g(q instanceof k);
        return n(q._normalizedObj, null);
    }, fromArray: function (q, r) {
        g(Array.isArray(q));
        g(typeof r === 'function');
        return new k(j(q, r), q.length);
    }};
    e.exports = p;
}, null);
__d("AbstractSearchSource", ["Deferred", "emptyFunction", "mixInto"], function (a, b, c, d, e, f, g, h, i) {
    function j() {
    }

    var k = {bootstrap: function (l) {
        l = l || h;
        if (this._bootstrapped) {
            l();
            return;
        }
        if (this._bootstrapDeferred)return this._bootstrapDeferred.addCallback(l);
        this._bootstrapDeferred = new g();
        this._bootstrapDeferred.addCallback(l);
        this.bootstrapImpl(function () {
            this._bootstrapped = true;
            this._bootstrapDeferred.succeed();
            this._bootstrapDeferred = null;
        }.bind(this));
        return this._bootstrapDeferred;
    }, search: function (l, m, n) {
        this.searchImpl(l, m, n);
    }, bootstrapImpl: function (l) {
        l();
    }, searchImpl: function (l, m, n) {
        throw new Error('Abstract method #searchImpl is not implemented.');
    }};
    i(j, k);
    j.Mixin = k;
    e.exports = j;
}, null);
__d("SearchSourceCallbackManager", ["createObjectFrom", "invariant"], function (a, b, c, d, e, f, g, h) {
    function i(k) {
        "use strict";
        this.$SearchSourceCallbackManager0 = k.parseFn;
        h(typeof this.$SearchSourceCallbackManager0 === 'function');
        this.$SearchSourceCallbackManager1 = k.matchFn;
        h(typeof this.$SearchSourceCallbackManager1 === 'function');
        this.$SearchSourceCallbackManager2 = k.alwaysPrefixMatch || false;
        this.$SearchSourceCallbackManager3 = k.indexFn || j;
        this.reset();
    }

    i.prototype.search = function (k, l, m) {
        "use strict";
        var n = this.$SearchSourceCallbackManager4(k, l, m);
        if (n)return 0;
        this.$SearchSourceCallbackManager5.push({queryString: k, callback: l, options: m});
        var o = this.$SearchSourceCallbackManager5.length - 1;
        this.$SearchSourceCallbackManager6.push(o);
        return o;
    };
    i.prototype.$SearchSourceCallbackManager4 = function (k, l, m) {
        "use strict";
        var n = this.$SearchSourceCallbackManager7(k), o = !!this.$SearchSourceCallbackManager8[k];
        if (!n.length) {
            l([], k);
            return o;
        }
        var p = n.map(function (q) {
            return this.$SearchSourceCallbackManager9[q];
        }, this);
        l(p, k);
        return o;
    };
    i.prototype.$SearchSourceCallbackManagera = function () {
        "use strict";
        var k = this.$SearchSourceCallbackManager6;
        this.$SearchSourceCallbackManager6 = [];
        k.forEach(this.$SearchSourceCallbackManagerb, this);
    };
    i.prototype.$SearchSourceCallbackManagerb = function (k) {
        "use strict";
        var l = this.$SearchSourceCallbackManager5[k];
        if (!l)return;
        var m = this.$SearchSourceCallbackManager4(l.queryString, l.callback, l.options);
        if (m) {
            delete this.$SearchSourceCallbackManager5[k];
            return;
        }
        this.$SearchSourceCallbackManager6.push(k);
    };
    i.prototype.reset = function () {
        "use strict";
        this.$SearchSourceCallbackManager9 = {};
        this.$SearchSourceCallbackManagerc = {};
        this.$SearchSourceCallbackManagerd = {};
        this.$SearchSourceCallbackManagere = {};
        this.$SearchSourceCallbackManager8 = {};
        this.$SearchSourceCallbackManager6 = [];
        this.$SearchSourceCallbackManager5 = [undefined];
    };
    i.prototype.addLocalEntries = function (k) {
        "use strict";
        k.forEach(function (l) {
            var m = l.getUniqueID(), n = this.$SearchSourceCallbackManager3(l);
            this.$SearchSourceCallbackManager9[m] = l;
            this.$SearchSourceCallbackManagerc[m] = n;
            var o = this.$SearchSourceCallbackManager0(n);
            o.tokens.forEach(function (p) {
                if (!this.$SearchSourceCallbackManagerd.hasOwnProperty(p))this.$SearchSourceCallbackManagerd[p] = {};
                this.$SearchSourceCallbackManagerd[p][m] = true;
            }, this);
        }, this);
        this.$SearchSourceCallbackManagera();
    };
    i.prototype.addQueryEntries = function (k, l) {
        "use strict";
        var m = this.$SearchSourceCallbackManager7(l), n = this.$SearchSourceCallbackManager0(l).flatValue;
        this.$SearchSourceCallbackManagere[n] = g(m, true);
        k.forEach(function (o) {
            var p = o.getUniqueID();
            this.$SearchSourceCallbackManager9[p] = o;
            this.$SearchSourceCallbackManagerc[p] = this.$SearchSourceCallbackManager3(o);
            this.$SearchSourceCallbackManagere[n][p] = true;
        }, this);
        this.$SearchSourceCallbackManagera();
    };
    i.prototype.unsubscribe = function (k) {
        "use strict";
        delete this.$SearchSourceCallbackManager5[k];
    };
    i.prototype.removeEntry = function (k) {
        "use strict";
        delete this.$SearchSourceCallbackManager9[k];
    };
    i.prototype.getAllEntriesMap = function () {
        "use strict";
        return this.$SearchSourceCallbackManager9;
    };
    i.prototype.setQueryStringAsExhausted = function (k) {
        "use strict";
        this.$SearchSourceCallbackManager8[k] = true;
    };
    i.prototype.unsetQueryStringAsExhausted = function (k) {
        "use strict";
        delete this.$SearchSourceCallbackManager8[k];
    };
    i.prototype.$SearchSourceCallbackManager7 = function (k) {
        "use strict";
        var l = this.$SearchSourceCallbackManagerf(k, this.$SearchSourceCallbackManagerg(k)), m = this.$SearchSourceCallbackManagerf(k, this.$SearchSourceCallbackManagerh(k)), n = l.concat(m), o = {}, p = [];
        n.forEach(function (q) {
            if (!o[q] && this.$SearchSourceCallbackManager9[q] !== undefined) {
                p.push(q);
                o[q] = true;
            }
        }, this);
        return p;
    };
    i.prototype.$SearchSourceCallbackManagerf = function (k, l) {
        "use strict";
        var m = this.$SearchSourceCallbackManageri(k, l), n = this.$SearchSourceCallbackManager9;

        function o(p, q) {
            if (m[p] !== m[q])return m[p] ? -1 : 1;
            var r = n[p], s = n[q];
            if (r.getOrder() !== s.getOrder())return r.getOrder() - s.getOrder();
            var t = r.getTitle().length, u = s.getTitle().length;
            if (t !== u)return t - u;
            return r.getUniqueID() - s.getUniqueID();
        }

        return l.sort(o).slice();
    };
    i.prototype.$SearchSourceCallbackManageri = function (k, l) {
        "use strict";
        var m = {};
        l.forEach(function (n) {
            m[n] = this.$SearchSourceCallbackManager1(k, this.$SearchSourceCallbackManagerc[n]);
        }, this);
        return m;
    };
    i.prototype.$SearchSourceCallbackManagerg = function (k) {
        "use strict";
        var l = this.$SearchSourceCallbackManager0(k, this.$SearchSourceCallbackManager2), m = this.$SearchSourceCallbackManager2 ? l.sortedTokens : l.tokens, n = m.length, o = l.isPrefixQuery ? n - 1 : null, p = {}, q = {}, r = {}, s = false, t = {}, u = 0;
        m.forEach(function (w, x) {
            if (t.hasOwnProperty(w))return;
            u++;
            t[w] = true;
            for (var y in this.$SearchSourceCallbackManagerd) {
                var z = (y === w && !p.hasOwnProperty(y)), aa = false;
                if (!z)aa = ((this.$SearchSourceCallbackManager2 || o === x) && y.indexOf(w) === 0);
                if (!z && !aa)continue;
                if (y === w) {
                    if (q.hasOwnProperty(y))s = true;
                    p[y] = true;
                } else {
                    if (p.hasOwnProperty(y) || q.hasOwnProperty(y))s = true;
                    q[y] = true;
                }
                for (var ba in this.$SearchSourceCallbackManagerd[y])if (x === 0 || (r.hasOwnProperty(ba) && r[ba] == u - 1))r[ba] = u;
            }
        }, this);
        var v = Object.keys(r).filter(function (w) {
            return r[w] == u;
        });
        if (s || u < n)v = this.$SearchSourceCallbackManagerj(k, v);
        return v;
    };
    i.prototype.$SearchSourceCallbackManagerh = function (k) {
        "use strict";
        var l = this.$SearchSourceCallbackManager0(k).flatValue, m = this.$SearchSourceCallbackManagerk(l);
        if (this.$SearchSourceCallbackManagere.hasOwnProperty(l))return m;
        return this.$SearchSourceCallbackManagerj(k, m);
    };
    i.prototype.$SearchSourceCallbackManagerk = function (k) {
        "use strict";
        var l = 0, m = null, n = this.$SearchSourceCallbackManagere;
        Object.keys(n).forEach(function (o) {
            if (k.indexOf(o) === 0 && o.length > l) {
                l = o.length;
                m = o;
            }
        });
        return (n.hasOwnProperty(m) ? Object.keys(n[m]) : []);
    };
    i.prototype.$SearchSourceCallbackManagerj = function (k, l) {
        "use strict";
        return l.filter(function (m) {
            return this.$SearchSourceCallbackManager1(k, this.$SearchSourceCallbackManagerc[m]);
        }, this);
    };
    function j(k) {
        return [k.getTitle(), k.getKeywordString()].join(' ');
    }

    e.exports = i;
}, null);
__d("AbstractAsyncSearchSource", ["AbstractSearchSource", "SearchSourceCallbackManager", "SearchableEntry", "TokenizeUtil", "copyProperties", "emptyFunction", "isValidUniqueID"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    for (var n in g)if (g.hasOwnProperty(n))p[n] = g[n];
    var o = g === null ? null : g.prototype;
    p.prototype = Object.create(o);
    p.prototype.constructor = p;
    p.__superConstructor__ = g;
    function p(q, r, s) {
        "use strict";
        this.$AbstractAsyncSearchSource0 = q.bootstrapRequests;
        this.$AbstractAsyncSearchSource1 = q.queryRequests;
        this.$AbstractAsyncSearchSource2 = q.auxiliaryFields;
        this.$AbstractAsyncSearchSource3 = q.asyncErrorHandler || l;
        this.$AbstractAsyncSearchSource4 = q.packageFn || this.$AbstractAsyncSearchSource5;
        this.$AbstractAsyncSearchSource6 = q.getAllForEmptyQuery;
        this.$AbstractAsyncSearchSource7 = [];
        this.$AbstractAsyncSearchSource8 = new h({parseFn: j.parse, matchFn: j.isQueryMatch, indexFn: q.indexFn});
        this.$AbstractAsyncSearchSource9 = r;
        this.$AbstractAsyncSearchSourcea = s;
    }

    p.prototype.bootstrapImpl = function (q) {
        "use strict";
        if (!this.$AbstractAsyncSearchSource0 || !this.$AbstractAsyncSearchSource0.length) {
            q();
            return;
        }
        var r = this.$AbstractAsyncSearchSource0.length, s = 0;
        this.$AbstractAsyncSearchSource0.forEach(function (t) {
            this.$AbstractAsyncSearchSourceb({}, t, function (u) {
                this.$AbstractAsyncSearchSource8.addLocalEntries(u);
                this.$AbstractAsyncSearchSource7 = this.$AbstractAsyncSearchSource7.concat(u);
                s++;
                if (s === r) {
                    q();
                    q = null;
                }
            }.bind(this));
        }.bind(this));
    };
    p.prototype.searchImpl = function (q, r, s) {
        "use strict";
        if (this.$AbstractAsyncSearchSource6 && q === '') {
            this.getBootstrappedEntries(function (y) {
                r(y, q);
            });
            return;
        }
        var t = null, u = {}, v = this.$AbstractAsyncSearchSource8.search(q, function (y) {
            if (!t) {
                t = y;
                t.forEach(function (z) {
                    u[z.getUniqueID()] = true;
                });
            } else y.forEach(function (z) {
                var aa = z.getUniqueID();
                if (!u[aa]) {
                    t.push(z);
                    u[aa] = true;
                }
            });
            r(t, q);
        }, s);
        if (!v || !this.$AbstractAsyncSearchSource1 || !this.$AbstractAsyncSearchSource1.length)return;
        var w = {value: q, existing_ids: t && t.map(function (y) {
            return y.getUniqueID();
        }).join(',')}, x = this.$AbstractAsyncSearchSource1.length;
        this.$AbstractAsyncSearchSource1.forEach(function (y) {
            this.$AbstractAsyncSearchSourceb(w, y, function (z) {
                this.$AbstractAsyncSearchSourcec(z, q);
                x--;
                if (!x)this.$AbstractAsyncSearchSource8.setQueryStringAsExhausted(q);
            }.bind(this));
        }, this);
    };
    p.prototype.getBootstrappedEntries = function (q) {
        "use strict";
        return this.bootstrap(function () {
            return q(this.$AbstractAsyncSearchSource7 || []);
        }.bind(this));
    };
    p.prototype.getAllEntriesMap = function () {
        "use strict";
        return this.$AbstractAsyncSearchSource8.getAllEntriesMap();
    };
    p.prototype.$AbstractAsyncSearchSourceb = function (q, r, s) {
        "use strict";
        this.$AbstractAsyncSearchSource9(q, r, function (t) {
            return s(this.$AbstractAsyncSearchSourcea(t, this.$AbstractAsyncSearchSource4).filter(function (u) {
                return !!u;
            }));
        }.bind(this), this.$AbstractAsyncSearchSource3);
    };
    p.prototype.$AbstractAsyncSearchSourced = function (q) {
        "use strict";
        this.$AbstractAsyncSearchSource8.addLocalEntries(q);
    };
    p.prototype.$AbstractAsyncSearchSourcec = function (q, r) {
        "use strict";
        if (q.length)this.$AbstractAsyncSearchSource8.addQueryEntries(q, r);
    };
    p.prototype.$AbstractAsyncSearchSource5 = function (q, r) {
        "use strict";
        var s = q.title || q.text, t = q.uniqueID || q.uid;
        if (!s || !m(t))return null;
        return new i({uniqueID: t, order: q.order || q.index || r, title: s, subtitle: q.subtitle || q.category || q.subtext, keywordString: q.keywordString || q.tokens, type: q.type, photo: q.photo, uri: q.uri || q.path, auxiliaryData: this.$AbstractAsyncSearchSourcee(q)});
    };
    p.prototype.$AbstractAsyncSearchSourcee = function (q) {
        "use strict";
        var r;
        if (this.$AbstractAsyncSearchSource2) {
            r = {};
            for (var s in this.$AbstractAsyncSearchSource2) {
                var t = this.$AbstractAsyncSearchSource2[s];
                r[s] = q[t];
            }
        }
        if (q.aux_data) {
            r = r || {};
            k(r, q.aux_data);
        }
        return r;
    };
    e.exports = p;
}, null);
__d("WebWorker", ["BanzaiLogger", "WebWorkerConfig", "BlobFactory", "EventListener", "URI", "areSameOrigin", "destroyOnUnload", "SubscriptionsHandler", "XHRRequest", "arrayContains", "emptyFunction", "getCrossOriginTransport", "performanceNow", "invariant", "memoize", "merge", "filterObject"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
    var x = a.URL || a.webkitURL;

    function y(ea) {
        "use strict";
        this.$WebWorker0 = false;
        this.$WebWorker1 = null;
        this.$WebWorker2 = ea;
        this.$WebWorker3 = null;
        this.$WebWorker4 = q;
        this.$WebWorker5 = q;
        this.$WebWorker6 = [];
        this.$WebWorker7 = false;
        this.$WebWorker8 = new n();
        m(function () {
            if (!this.$WebWorker7)this.terminate();
        }.bind(this));
        this.$WebWorker9('constructed');
    }

    y.prototype.setMessageHandler = function (ea) {
        "use strict";
        this.$WebWorker4 = ea || q;
        return this;
    };
    y.prototype.setErrorHandler = function (ea) {
        "use strict";
        this.$WebWorker5 = ea || q;
        return this;
    };
    y.prototype.postMessage = function (ea, fa) {
        "use strict";
        t(!this.isCurrentState('constructed'));
        t(!this.isCurrentState('terminated'));
        if (this.isCurrentState('preparing')) {
            this.$WebWorker6.push(this.postMessage.bind(this, ea, fa));
            return this;
        }
        var ga = {type: 'message', message: ea};
        if (fa) {
            this.$WebWorker3.postMessage(ga, fa);
        } else this.$WebWorker3.postMessage(ga);
        return this;
    };
    y.prototype.terminate = function () {
        "use strict";
        if (this.isCurrentState('executing'))this.$WebWorker3.terminate();
        if (!this.isCurrentState('terminated')) {
            this.$WebWorker9('terminated');
            this.$WebWorker3 = null;
            this.$WebWorkera();
            this.$WebWorker6 = [];
        }
        return this;
    };
    y.prototype.execute = function () {
        "use strict";
        t(!this.isCurrentState('terminated'));
        if (['preparing', 'executing'].some(this.isCurrentState, this))return this;
        this.$WebWorker9('preparing');
        y.prepareResource(this.$WebWorker2, this.$WebWorkerb.bind(this));
        return this;
    };
    y.prototype.setAllowCrossPageTransition = function (ea) {
        "use strict";
        this.$WebWorker7 = ea;
        return this;
    };
    y.prototype.isCurrentState = function (ea) {
        "use strict";
        t(p(y.states, ea));
        return ea === this.$WebWorker1;
    };
    y.prototype.$WebWorkerb = function () {
        "use strict";
        t(!this.isCurrentState('executing'));
        if (this.isCurrentState('terminated'))return;
        t(this.$WebWorker2.sameOriginURL || this.$WebWorker2.source);
        if (this.$WebWorker2.sameOriginURL) {
            this.$WebWorker3 = new a.Worker(this.$WebWorker2.sameOriginURL);
        } else {
            this.$WebWorker3 = new a.Worker(y.evalWorkerURL);
            this.$WebWorker3.postMessage(this.$WebWorker2.source);
        }
        this.$WebWorkerc('ping', Date.now());
        this.$WebWorkerd();
        this.$WebWorker9('executing');
        this.$WebWorker6.forEach(function (ea) {
            return ea();
        });
        this.$WebWorker6 = null;
    };
    y.prototype.$WebWorkera = function () {
        "use strict";
        this.$WebWorker8.release();
    };
    y.prototype.$WebWorkerc = function (ea) {
        "use strict";
        var fa = Array.prototype.slice.call(arguments, 1);
        this.$WebWorker3.postMessage({type: ea, args: fa});
    };
    y.prototype.$WebWorkere = function (event, ea) {
        "use strict";
        y.$WebWorkere(event, this.$WebWorker2.name, v(ea, {cross_page_transition: !!this.$WebWorker7, state: this.$WebWorker1}));
    };
    y.$WebWorkerf = function () {
        "use strict";
        return Object.keys(w({object_url: y.$WebWorkerg(), eval_url: ca(), data_url: y.$WebWorkerh(), worker: y.isSupported(), transferables: y.areTransferablesSupported()}, function (ea) {
            return !!ea;
        }));
    };
    y.prototype.$WebWorkerd = function () {
        "use strict";
        this.$WebWorker8.addSubscriptions(j.listen(this.$WebWorker3, 'message', this.$WebWorkeri.bind(this)), j.listen(this.$WebWorker3, 'error', this.$WebWorkerj.bind(this)));
    };
    y.prototype.$WebWorkerj = function (ea) {
        "use strict";
        var fa = this.$WebWorker5(ea);
        if (!fa && !ea.defaultPrevented)this.$WebWorkere('exception', {message: ea.message});
    };
    y.prototype.$WebWorkeri = function (event) {
        "use strict";
        var ea = event.data;
        switch (ea.type) {
            case 'message':
                this.$WebWorker4(ea.message);
                break;
            case 'pong':
                this.$WebWorker0 = true;
                this.$WebWorkere('executed', {dt: Math.floor(ea.args[1] - ea.args[0]), bytes: this.$WebWorker2.source.length});
                break;
            case 'terminate':
                this.terminate();
                break;
            case 'haste-error':
                this.terminate();
                this.$WebWorkere('haste_error', {message: ea.message});
                break;
            case 'console':
                var fa = ea.args.shift();
                t(p(['log', 'error', 'info', 'debug', 'warn'], fa));
                a.console[fa].apply(a.console, ea.args);
                break;
        }
    };
    y.prototype.$WebWorker9 = function (ea) {
        "use strict";
        t(p(y.states, ea));
        this.$WebWorkere('transition', {next_state: ea});
        this.$WebWorker1 = ea;
    };
    y.prepareResource = function (ea, fa) {
        "use strict";
        fa = fa || q;
        t(ea.sameOriginURL || ea.url || ea.source);
        t(!!y.isSupported());
        if (ea.sameOriginURL) {
            fa();
        } else if (ea.url && l(new k(ea.url), new k(a.location.href))) {
            ea.sameOriginURL = ea.url;
            fa();
        } else if (ea.source) {
            if (y.$WebWorkerk())ea.sameOriginURL = y.$WebWorkerl(ea.source);
            fa();
        } else if (!ea.loading) {
            var ga = s();
            ea.loading = [fa];
            y.$WebWorkerm(ea.url, function (ha) {
                if (ha) {
                    ea.source = ha;
                    if (y.$WebWorkerk())ea.sameOriginURL = y.$WebWorkerl(ha);
                }
                y.$WebWorkere('prepared', ea.name, {dt: Math.floor(s() - ga), bytes: ha.length});
                ea.loading.forEach(function (ia) {
                    return ia();
                });
                ea.loading = false;
            });
        } else ea.loading.push(fa);
        return ea;
    };
    y.releaseResource = function (ea) {
        "use strict";
        if (ea.sameOriginURL.indexOf('blob:') === 0) {
            if (x.revokeObjectURL)x.revokeObjectURL(ea.sameOriginURL);
            ea.sameOriginURL = null;
        }
        return ea;
    };
    y.isSupported = function () {
        "use strict";
        return ba && (y.$WebWorkerk() || ca());
    };
    y.areTransferablesSupported = function () {
        "use strict";
        return y.isSupported() && da();
    };
    y.$WebWorkerm = function (ea, fa) {
        "use strict";
        new o(ea).setTransportBuilder(r).setMethod('GET').setResponseHandler(function (ga) {
            fa(ga);
        }).setErrorHandler(fa.bind(null, null)).send();
    };
    y.$WebWorkerl = function (ea) {
        "use strict";
        t(y.$WebWorkerk());
        if (y.$WebWorkerg()) {
            var fa = i.getBlob([ea], {type: 'application/javascript'});
            return x.createObjectURL(fa);
        }
        if (y.$WebWorkerh())return 'data:application/javascript,' + encodeURIComponent(ea);
    };
    y.$WebWorkerg = function () {
        "use strict";
        return i.isSupported() && z();
    };
    y.$WebWorkerh = function () {
        "use strict";
        return aa();
    };
    y.$WebWorkerk = function () {
        "use strict";
        return y.$WebWorkerg() || y.$WebWorkerh();
    };
    y.$WebWorkere = function (event, ea, fa) {
        "use strict";
        if (!h.logging.enabled)return;
        g.log(h.logging.config, v(fa, {features_array: y.$WebWorkerf(), event: event, resource: ea}));
    };
    var z = u(function () {
        var ea, fa;
        if (!x || !x.createObjectURL)return false;
        try {
            ea = x.createObjectURL(i.getBlob([''], {type: 'application/javascript'}));
            var ha = new a.Worker(ea);
            ha.terminate();
            fa = true;
        } catch (ga) {
            fa = false;
        } finally {
            if (x.revokeObjectURL)x.revokeObjectURL(ea);
        }
        return fa;
    }), aa = u(function () {
        var ea;
        try {
            var ga = new a.Worker('data:application/javascript,');
            ga.terminate();
            ea = true;
        } catch (fa) {
            ea = false;
        }
        return ea;
    }), ba = !!a.Worker, ca = u(function () {
        var ea;
        try {
            var ga = new a.Worker(y.evalWorkerURL);
            ga.terminate();
            ea = true;
        } catch (fa) {
            ea = false;
        }
        return ea;
    }), da = u(function () {
        var ea;
        try {
            var ga = new a.Worker(y.evalWorkerURL), ha = new ArrayBuffer(0);
            ga.postMessage({buffer: ha}, [ha]);
            ga.terminate();
            ea = true;
        } catch (fa) {
            ea = false;
        }
        return ea;
    });
    y.states = ['constructed', 'preparing', 'executing', 'terminated'];
    y.evalWorkerURL = h.evalWorkerURL;
    e.exports = y;
}, null);
__d("DropdownContextualHelpLink", ["DOM", "ge"], function (a, b, c, d, e, f, g, h) {
    var i = {set: function (j) {
        var k = h('navHelpCenter');
        if (k !== null)g.replace(k, j);
    }};
    e.exports = i;
}, null);
__d("Sound", ["SoundInitialData", "SoundPlayer", "SoundRPC", "SoundSynchronizer", "URI", "UserAgent_DEPRECATED", "isFacebookURI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = null, o = {init: function (s) {
        if (!n)h.init(s);
    }, play: function (s, t, u) {
        if (n) {
            i.playRemote(n.contentWindow, s, t, false);
        } else i.playLocal(s, t, u);
    }, stop: function (s) {
        if (!n)h.stop(s);
    }}, p = new k(location.href);
    if (p.getSubdomain() && p.getSubdomain() !== 'www')p.setSubdomain('www');
    var q = p.getDomain();

    function r() {
        if (l.ie() < 9)return false;
        if (g.RPC_DISABLED)return false;
        return j.isSupported() && i.supportsRPC();
    }

    if (m(p) && location.host !== q && r()) {
        n = document.createElement('iframe');
        n.setAttribute('src', '//' + q + '/sound_iframe.php');
        n.style.display = 'none';
        document.body.appendChild(n);
    }
    e.exports = o;
}, null);
__d("MercuryBrowserAlerts", ["ArbiterMixin", "ChatActivity", "ChatConfig", "ChatOptions", "ChatTitleBarBlinker", "MercuryParticipants", "MercuryThreadMuter", "MessagingTag", "Sound", "copyProperties", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = b('MercuryThreads').get();
    o.init(['audio/ogg', 'audio/mpeg']);
    function r(t) {
        if (j.getSetting('sound'))o.play([i.get('sound.notif_ogg_url'), i.get('sound.notif_mp3_url')], t, false);
    }

    var s = {messageReceived: function (t) {
        if (t.author == l.user || !t.is_unread || (t.folder != n.INBOX && t.folder != n.ARCHIVED))return;
        var u = t.thread_id, v = h.isActive();
        if (v) {
            var w = false;
            s.inform('before-alert', {threadID: u, cancelAlert: function () {
                w = true;
            }});
        }
        q.getThreadMeta(u, function (x) {
            var y = m.isThreadMuted(x);
            if (y)return;
            var z = t.timestamp;
            if (v) {
                !w && r(z);
            } else {
                k.blink(u, z);
                r(z);
            }
            k.blinkingElsewhere();
        }.bind(this));
    }};
    e.exports = p(s, g);
}, null);
__d("FBRTCLogger", ["Log", "LogHistory", "MarauderLogger", "UserAgentData", "formatDate"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = 'webrtc', m = 'sent_message', n = 'received_message', o = 'send_succeeded', p = 'send_failed', q = 'info', r = 'call_action', s = 'client_event', t = 'client_error', u = 'type', v = 'msg_id', w = 'ack_msg_id', x = 'call_id', y = 'from', z = 'to', aa = 'content', ba = 'tag', ca = 'peer_id', da = 'error_code', ea = 'trigger', fa = 'endcallstats', ga = 'device_info', ha = null;
    ia.getInstance = function () {
        "use strict";
        if (!ha)ha = new ia();
        return ha;
    };
    function ia() {
        "use strict";
        this.$FBRTCLogger0 = h.getInstance('webrtc');
    }

    ia.prototype.logToConsole = function (ja) {
        "use strict";
        this.$FBRTCLogger1(null, null, 'Console', ja);
    };
    ia.prototype.logReceivedMessage = function (ja, ka, la) {
        "use strict";
        var ma = {};
        ma[y] = ja;
        ma[x] = ka;
        ma[u] = la.type;
        ma[v] = la.msg_id;
        if (la.sdp)ma[aa] = la.sdp;
        if (la.ack_id)ma[w] = la.ack_id;
        this.$FBRTCLogger2(n, ma);
        this.$FBRTCLogger1(ja, ka, 'Received', la.type + ', ' + la.msg_id);
    };
    ia.prototype.logSentMessage = function (ja, ka, la) {
        "use strict";
        var ma = {};
        ma[z] = ja;
        ma[x] = ka;
        ma[u] = la.type;
        ma[v] = la.msg_id;
        if (la.sdp)ma[aa] = la.sdp;
        if (la.ack_id)ma[w] = la.ack_id;
        this.$FBRTCLogger2(m, ma);
        this.$FBRTCLogger1(ja, ka, 'Sent', la.type + ', ' + la.msg_id);
    };
    ia.prototype.logSentMessageSuccess = function (ja, ka, la, ma) {
        "use strict";
        var na = {};
        na[ca] = ja;
        na[x] = ka;
        na[u] = la;
        na[v] = ma;
        this.$FBRTCLogger2(o, na);
    };
    ia.prototype.logSentMessageFailure = function (ja, ka, la, ma, na) {
        "use strict";
        var oa = {};
        oa[ca] = ja;
        oa[x] = ka;
        oa[u] = la;
        oa[v] = ma;
        oa[da] = na;
        this.$FBRTCLogger2(p, oa);
        this.$FBRTCLogger1(ja, ka, 'Send Failed', la + ', ' + na);
    };
    ia.prototype.logCallAction = function (ja, ka, la, ma, na) {
        "use strict";
        var oa = {};
        oa[ca] = ja;
        oa[x] = ka;
        oa[r] = la;
        oa[aa] = ma;
        if (na)oa[ea] = na;
        this.$FBRTCLogger2(r, oa);
        this.$FBRTCLogger1(ja, ka, 'CallAction', la + ', ' + ma);
    };
    ia.prototype.logEvent = function (ja, ka, event) {
        "use strict";
        var la = {};
        la[ca] = ja;
        la[x] = ka;
        la[aa] = event;
        this.$FBRTCLogger2(s, la);
        this.$FBRTCLogger1(ja, ka, 'Event', event);
    };
    ia.prototype.logInfo = function (ja, ka, la) {
        "use strict";
        var ma = {};
        ma[ca] = ja;
        ma[x] = ka;
        ma[aa] = la;
        this.$FBRTCLogger2(q, ma);
        this.$FBRTCLogger1(ja, ka, 'Info', la);
    };
    ia.prototype.logError = function (ja, ka, la) {
        "use strict";
        var ma = {};
        ma[ca] = ja;
        ma[x] = ka;
        ma[aa] = la;
        this.$FBRTCLogger2(t, ma);
        this.$FBRTCLogger1(ja, ka, 'Error', la);
    };
    ia.prototype.logErrorWithoutID = function (ja) {
        "use strict";
        this.logError(null, null, ja);
    };
    ia.prototype.logEndCallSummary = function (ja) {
        "use strict";
        if (!ja)return;
        var ka = {};
        ka[ca] = ja.peerID;
        ka[x] = ja.callID;
        ka[ba] = fa;
        ka[aa] = ja.toString();
        ka[ga] = this.$FBRTCLogger3();
        this.$FBRTCLogger2(q, ka);
        this.$FBRTCLogger1(ja.peerID, ja.callID, 'Call Summary', ka);
    };
    ia.prototype.$FBRTCLogger3 = function () {
        "use strict";
        return {device: j.deviceName, os: j.platformName, os_version: j.platformFullVersion, browser: j.browserName, browser_version: j.browserFullVersion, screen_height: window.screen.availHeight, screen_width: window.screen.availWidth};
    };
    ia.prototype.$FBRTCLogger2 = function (ja, ka) {
        "use strict";
        this.$FBRTCLogger0.log(ja, ka);
        i.log(ja, l, ka);
    };
    ia.prototype.$FBRTCLogger1 = function (ja, ka, la, ma) {
        "use strict";
    };
    ia.CallAction = {START_CALL: 'start_call', RECEIVED_CALL: 'received_call', ANSWER_CALL: 'answer_call', END_CALL: 'end_call', SET_MUTE: 'set_mute', SET_VIDEO_ON: 'set_video_on', SET_SELF_VIEW_ON: 'set_self_view_on', SET_FULLSCREEN_ON: 'set_fullscreen_on'};
    ia.Trigger = {ADMIN_MESSAGE: 'admin_message', CHAT_TAB_ICON: 'chat_tab_icon', CHAT_TAB_ICON_TOUR: 'chat_tab_icon_tour', REDIAL_BUTTON: 'redial_button'};
    e.exports = ia;
}, null);
__d("ChatAnimatedGifs", ["URI"], function (a, b, c, d, e, f, g) {
    var h = {shouldHideBody: function (i) {
        if (!i.has_attachment)return false;
        for (var j = 0; j < i.attachments.length; j++) {
            var k = i.attachments[j];
            if (k.preview_url) {
                var l = h.getRawUrlFromSafeUrl(k.preview_url);
                if (i.body == l)return true;
            }
        }
        return false;
    }, getRawUrlFromSafeUrl: function (i) {
        return g(i).getQueryData().url;
    }};
    e.exports = h;
}, null);
__d("FileFormResetOnSubmit", ["DOMQuery", "Event", "emptyFunction"], function (a, b, c, d, e, f, g, h, i) {
    function j(l, m) {
        var n = h.listen(l, 'change', i.thatReturnsFalse, h.Priority.URGENT);
        try {
            m();
        } catch (o) {
            throw o;
        } finally {
            n.remove();
        }
    }

    function k(l) {
        "use strict";
        this._form = l;
    }

    k.prototype.enable = function () {
        "use strict";
        var l = this._reset.bind(this);
        this._subscription = this._form.subscribe('submit', function () {
            setTimeout(l, 0);
        });
    };
    k.prototype.disable = function () {
        "use strict";
        this._subscription.unsubscribe();
        this._subscription = null;
    };
    k.prototype._reset = function () {
        "use strict";
        var l = this._form.getRoot();
        j(l, function () {
            var m = g.scry(l, 'input[type="file"]');
            m.forEach(function (n) {
                n.value = '';
            });
        });
    };
    e.exports = k;
}, null);
__d("FormSubmitOnChange", ["Event", "copyProperties", "submitForm"], function (a, b, c, d, e, f, g, h, i) {
    function j(k) {
        "use strict";
        this._form = k;
    }

    j.prototype.enable = function () {
        "use strict";
        this._listener = g.listen(this._form.getRoot(), 'change', this._submit.bind(this));
    };
    j.prototype.disable = function () {
        "use strict";
        this._listener.remove();
        this._listener = null;
    };
    j.prototype._submit = function () {
        "use strict";
        i(this._form.getRoot());
    };
    h(j.prototype, {_listener: null});
    e.exports = j;
}, null);
__d("PhotosUploadID", [], function (a, b, c, d, e, f) {
    var g = 1024, h = {getNewID: function () {
        return (g++).toString();
    }};
    e.exports = h;
}, null);
__d("ChatAutoSendPhotoUploader", ["ArbiterMixin", "AsyncUploadRequest", "DOM", "Event", "FileForm", "FileFormResetOnSubmit", "FileInput", "FormSubmitOnChange", "JpegResizer", "MercuryAttachmentType", "PhotosMimeType", "PhotosUploadID", "SubscriptionsHandler", "arrayContains", "csx", "getImageSize", "getObjectValues", "invariant", "isEmpty", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
    "use strict";
    function aa() {
        return 'upload_' + r.getNewID();
    }

    var ba = z(g);
    for (var ca in ba)if (ba.hasOwnProperty(ca))ea[ca] = ba[ca];
    var da = ba === null ? null : ba.prototype;
    ea.prototype = Object.create(da);
    ea.prototype.constructor = ea;
    ea.__superConstructor__ = ba;
    function ea(fa, ga, ha) {
        this.$ChatAutoSendPhotoUploader0 = ha;
        this.$ChatAutoSendPhotoUploader1 = ga;
        this.$ChatAutoSendPhotoUploader2 = new s();
        this.$ChatAutoSendPhotoUploader3 = {};
        this.$ChatAutoSendPhotoUploader4 = {};
        this.$ChatAutoSendPhotoUploader5 = fa.getAttribute('action');
        this.$ChatAutoSendPhotoUploader6 = new k(fa, [n, l]);
        this.$ChatAutoSendPhotoUploader6.setAllowCrossOrigin(true);
        this.$ChatAutoSendPhotoUploader6.setUploadInParallel(true);
        var ia = i.find(fa, "._4q60"), ja = i.find(ia, "._4q61");
        new m(ia, ja, ga);
        this.$ChatAutoSendPhotoUploader2.addSubscriptions(this.$ChatAutoSendPhotoUploader6.subscribe('submit', this.$ChatAutoSendPhotoUploader7.bind(this)), this.$ChatAutoSendPhotoUploader6.subscribe('success', this.$ChatAutoSendPhotoUploader8.bind(this)), this.$ChatAutoSendPhotoUploader6.subscribe('failure', this.$ChatAutoSendPhotoUploader9.bind(this)), this.$ChatAutoSendPhotoUploader6.subscribe('progress', this.$ChatAutoSendPhotoUploadera.bind(this)), j.listen(ja, 'click', function () {
            if (this.$ChatAutoSendPhotoUploaderb)if (o.prepareResource)o.prepareResource();
            this.inform('open');
        }.bind(this)));
        this.$ChatAutoSendPhotoUploaderb = o.isSupported();
        if (this.$ChatAutoSendPhotoUploaderb)this.$ChatAutoSendPhotoUploader6.setPreprocessHandler(this.$ChatAutoSendPhotoUploaderc.bind(this));
    }

    ea.prototype.isUploading = function () {
        return !y(this.$ChatAutoSendPhotoUploader3);
    };
    ea.prototype.destroy = function () {
        this.$ChatAutoSendPhotoUploader2.release();
        this.$ChatAutoSendPhotoUploader6.destroy();
        this.$ChatAutoSendPhotoUploader3 = {};
        this.$ChatAutoSendPhotoUploader4 = {};
    };
    ea.prototype.$ChatAutoSendPhotoUploaderd = function (fa, ga) {
        var ha = this.$ChatAutoSendPhotoUploadere(fa);
        if (ga) {
            ha.preview_width = ga.width;
            ha.preview_height = ga.height;
        }
        return ha;
    };
    ea.prototype.$ChatAutoSendPhotoUploadere = function (fa) {
        var ga = {upload_id: fa, on_progress: function (ha) {
            this.$ChatAutoSendPhotoUploader2.addSubscriptions(this.subscribe('progress', ha));
        }.bind(this), on_resizing_progress: function (ha) {
            this.$ChatAutoSendPhotoUploader2.addSubscriptions(this.subscribe('resize_progress', ha));
        }.bind(this), on_success: function (ha) {
            this.$ChatAutoSendPhotoUploader2.addSubscriptions(this.subscribe('success', ha));
        }.bind(this), upload_canceled: this.$ChatAutoSendPhotoUploaderf.bind(this), attach_type: p.PHOTO, preview_uploading: true};
        return ga;
    };
    ea.prototype.$ChatAutoSendPhotoUploaderc = function (fa, ga) {
        var ha = fa.getFile();
        if (!q(ha.type).isJpeg())return ga(fa);
        o.getSingleton().resizeBlob(ha, function (ia, ja, ka) {
            if (ja)fa.setFile(ja);
            ga(fa);
        }, this.$ChatAutoSendPhotoUploaderg.bind(this, fa));
    };
    ea.prototype.$ChatAutoSendPhotoUploader7 = function () {
        var fa = aa();
        this.$ChatAutoSendPhotoUploaderh(fa, this.$ChatAutoSendPhotoUploader1.files);
    };
    ea.prototype.$ChatAutoSendPhotoUploaderh = function (fa, ga) {
        var ha = {};
        if (typeof FileReader !== 'undefined' && FileReader.prototype.readAsArrayBuffer && ga && ga.length === 1) {
            this.$ChatAutoSendPhotoUploader3[fa] = fa;
            ha[fa] = ga[0];
            var ia = new FileReader();
            ia.onload = function () {
                this.inform('submit', {upload_id: fa, preview_attachments: [this.$ChatAutoSendPhotoUploaderd(fa, v(ia.result))]});
            }.bind(this);
            ia.onerror = function () {
                this.inform('submit', {upload_id: fa, preview_attachments: [this.$ChatAutoSendPhotoUploadere(fa)]});
            }.bind(this);
            ia.readAsArrayBuffer(ga[0]);
        } else {
            var ja = [];
            if (!ga) {
                this.$ChatAutoSendPhotoUploader3[fa] = fa;
                this.$ChatAutoSendPhotoUploader0.value = fa;
                ja.push(this.$ChatAutoSendPhotoUploadere(fa));
            } else for (var ka = 0; ka < ga.length; ++ka) {
                var la = aa();
                ha[la] = ga[ka];
                this.$ChatAutoSendPhotoUploader3[la] = fa;
                ja.push(this.$ChatAutoSendPhotoUploadere(la));
            }
            this.inform('submit', {upload_id: fa, preview_attachments: ja});
        }
        if (Object.keys(ha).length > 0)this.$ChatAutoSendPhotoUploader6.setFiles(ha);
    };
    ea.prototype.$ChatAutoSendPhotoUploader8 = function (event, fa) {
        var ga = this.$ChatAutoSendPhotoUploaderi(fa);
        if (this.$ChatAutoSendPhotoUploader3[ga]) {
            var ha = this.$ChatAutoSendPhotoUploader3[ga];
            delete this.$ChatAutoSendPhotoUploader3[ga];
            var ia = fa.response.getPayload();
            if (!this.$ChatAutoSendPhotoUploader4[ha])this.$ChatAutoSendPhotoUploader4[ha] = [];
            this.$ChatAutoSendPhotoUploader4[ha].push({id: ga, fbid: ia.metadata[0].image_id});
            this.inform('success', {upload_id: ga});
            if (!this.$ChatAutoSendPhotoUploaderj(ha))this.$ChatAutoSendPhotoUploaderk(ha);
        }
    };
    ea.prototype.$ChatAutoSendPhotoUploaderk = function (fa) {
        x(!this.$ChatAutoSendPhotoUploaderj(fa));
        this.$ChatAutoSendPhotoUploader4[fa].sort(function (ha, ia) {
            return ha.id < ia.id ? -1 : 1;
        });
        var ga = this.$ChatAutoSendPhotoUploader4[fa].map(function (ha) {
            return ha.fbid;
        });
        this.inform('all-uploads-completed', {upload_id: fa, image_ids: ga});
        delete this.$ChatAutoSendPhotoUploader4[fa];
    };
    ea.prototype.$ChatAutoSendPhotoUploadera = function (event, fa) {
        this.inform('progress', {upload_id: fa.upload.getName(), event: fa.event});
    };
    ea.prototype.$ChatAutoSendPhotoUploaderg = function (fa, event) {
        this.inform('resize_progress', {upload_id: fa.getName(), event: event});
    };
    ea.prototype.$ChatAutoSendPhotoUploaderj = function (fa) {
        return t(w(this.$ChatAutoSendPhotoUploader3), fa);
    };
    ea.prototype.$ChatAutoSendPhotoUploader9 = function (event, fa) {
        var ga = this.$ChatAutoSendPhotoUploaderi(fa);
        this.$ChatAutoSendPhotoUploaderl(ga, 'last-upload-failed');
        return false;
    };
    ea.prototype.$ChatAutoSendPhotoUploaderf = function (fa) {
        this.$ChatAutoSendPhotoUploaderl(fa, 'last-upload-canceled');
    };
    ea.prototype.$ChatAutoSendPhotoUploaderl = function (fa, ga) {
        if (!this.$ChatAutoSendPhotoUploader3[fa])return;
        var ha = this.$ChatAutoSendPhotoUploader3[fa];
        delete this.$ChatAutoSendPhotoUploader3[fa];
        if (!this.$ChatAutoSendPhotoUploaderj(ha))if (this.$ChatAutoSendPhotoUploader4[ha]) {
            this.$ChatAutoSendPhotoUploaderk(ha);
        } else this.inform(ga, {upload_id: ha});
    };
    ea.prototype.$ChatAutoSendPhotoUploaderi = function (fa) {
        if (fa.upload) {
            return fa.upload.getName();
        } else return fa.response.getPayload().uploadID;
    };
    ea.prototype.uploadFile = function (fa) {
        var ga = aa(), ha = {};
        ha[ga] = fa;
        var ia = new h(this.$ChatAutoSendPhotoUploader5).setAllowCrossOrigin(true).setRelativeTo(this.$ChatAutoSendPhotoUploader6.getRoot()).setFiles(ha);
        this.$ChatAutoSendPhotoUploader2.addSubscriptions(ia.subscribe('success', function (event, ja) {
            this.$ChatAutoSendPhotoUploader8(event, {upload: ja, response: ja.getResponse()});
        }.bind(this)), ia.subscribe('failure', this.$ChatAutoSendPhotoUploader9.bind(this)));
        ia.send();
        this.$ChatAutoSendPhotoUploaderh(ga, [fa]);
    };
    e.exports = ea;
}, null);
__d("MercuryTypingAnimation.react", ["React", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i) {
    'use strict';
    var j = g.createClass({displayName: 'MercuryTypingAnimation', propTypes: {color: g.PropTypes.oneOf(['light', 'dark'])}, getDefaultProps: function () {
        return {color: 'dark'};
    }, render: function () {
        var k = (("_4a0v") + (this.props.color === 'light' ? ' ' + "_4a0w" : '') + (this.props.color === 'dark' ? ' ' + "_4a0x" : ''));
        return (g.createElement(g.DOM.div, {className: i(this.props.className, k)}, g.createElement(g.DOM.div, {className: "_4b0g"}, g.createElement(g.DOM.div, {className: "_4a0y"}), g.createElement(g.DOM.div, {className: "_4a0y"}), g.createElement(g.DOM.div, {className: "_4a0y"}))));
    }});
    e.exports = j;
}, null);
__d("MercuryThreadSearchUtils", ["escapeRegex", "TokenizeUtil"], function (a, b, c, d, e, f, g, h) {
    var i = {wordsInString: function (j) {
        return (j || '').split(/\s+/).filter(function (k) {
            return k.trim().length > 0;
        });
    }, anyMatchPredicate: function (j, k) {
        for (var l = 0; l < j.length; l++)if (k(j[l]))return true;
        return false;
    }, allMatchPredicate: function (j, k) {
        for (var l = 0; l < j.length; l++)if (!k(j[l]))return false;
        return true;
    }, queryWordMatchesAnyNameWord: function (j, k) {
        var l = new RegExp('\\b' + g(j), 'i');
        return this.anyMatchPredicate(k, function (m) {
            var n = h.parse(m).flatValue;
            return l.test(n);
        });
    }, queryMatchesName: function (j, k) {
        var l = this.wordsInString(j), m = this.wordsInString(k);
        return this.allMatchPredicate(l, function (n) {
            return this.queryWordMatchesAnyNameWord(n, m);
        }.bind(this));
    }};
    e.exports = i;
}, null);
__d("Token", ["CSS", "DataStore", "DOM", "Locale", "UnicodeBidi", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    function m(n, o) {
        "use strict";
        this.info = n;
        this.paramName = o;
    }

    m.prototype.getInfo = function () {
        "use strict";
        return this.info;
    };
    m.prototype.getText = function () {
        "use strict";
        return this.info.text;
    };
    m.prototype.getValue = function () {
        "use strict";
        return this.info.uid;
    };
    m.prototype.isFreeform = function () {
        "use strict";
        return !!this.info.freeform;
    };
    m.prototype.setSelected = function (n) {
        "use strict";
        g.conditionClass(this.getElement(), 'uiTokenSelected', n);
        return this;
    };
    m.prototype.getElement = function () {
        "use strict";
        if (!this.element)this.setElement(this.createElement());
        return this.element;
    };
    m.prototype.setElement = function (n) {
        "use strict";
        h.set(n, 'Token', this);
        this.element = n;
        return this;
    };
    m.prototype.isRemovable = function () {
        "use strict";
        return g.hasClass(this.element, 'removable');
    };
    m.prototype.getTextDirection = function () {
        "use strict";
        var n = k.isDirectionRTL(this.getText()), o = j.isRTL();
        if (n && !o)return 'rtl';
        if (!n && o)return 'ltr';
        return null;
    };
    m.prototype.createElement = function (n, o) {
        "use strict";
        var p = this.paramName, q = this.getText(), r = this.getValue(), s = i.create('a', {href: '#', 'aria-label': l._("\u0423\u0434\u0430\u043b\u0438\u0442\u044c {item}?", {item: q}), className: 'remove uiCloseButton uiCloseButtonSmall'});
        if (n)g.addClass(s, 'uiCloseButtonSmallGray');
        var t = i.create('input', {type: 'hidden', value: r, name: p + '[]', autocomplete: 'off'}), u = i.create('input', {type: 'hidden', value: q, name: 'text_' + p + '[]', autocomplete: 'off'}), v = {className: 'removable uiToken'}, w = this.getTextDirection();
        if (w !== null)v.dir = w;
        var x = i.create('span', v, [q, t, u, s]);
        if (n)g.addClass(x, 'uiTokenGray');
        if (o) {
            var y = i.create('i', {className: o});
            i.prependContent(x, y);
        }
        return x;
    };
    e.exports = m;
}, null);
__d("WeakToken", ["CSS", "Token"], function (a, b, c, d, e, f, g, h) {
    for (var i in h)if (h.hasOwnProperty(i))k[i] = h[i];
    var j = h === null ? null : h.prototype;
    k.prototype = Object.create(j);
    k.prototype.constructor = k;
    k.__superConstructor__ = h;
    function k() {
        "use strict";
        if (h !== null)h.apply(this, arguments);
    }

    k.prototype.createElement = function () {
        "use strict";
        var l = j.createElement.call(this, true, 'UFIWeakReferenceIcon');
        g.addClass(l, 'uiTokenWeakReference');
        return l;
    };
    e.exports = k;
}, null);
__d("Tokenizer", ["Arbiter", "ArbiterMixin", "CSS", "DataStore", "DOM", "DOMQuery", "Event", "Focus", "Input", "Keys", "Parent", "StickyPlaceholderInput", "Style", "TextMetrics", "Token", "UserAgent_DEPRECATED", "WeakToken", "copyProperties", "createObjectFrom", "emptyFunction", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa) {
    var ba = 20, ca = aa(h);
    for (var da in ca)if (ca.hasOwnProperty(da))fa[da] = ca[da];
    var ea = ca === null ? null : ca.prototype;
    fa.prototype = Object.create(ea);
    fa.prototype.constructor = fa;
    fa.__superConstructor__ = ca;
    function fa(ga, ha, ia) {
        "use strict";
        this.element = ga;
        this.typeahead = ha;
        this.input = ha.getCore().getElement();
        if (ia)this.init(ia.tokenarea, ia.param_name, ia.initial_info, ia.options);
        j.set(this.element, 'Tokenizer', this);
    }

    fa.prototype.init = function (ga, ha, ia, ja) {
        "use strict";
        this.init = z;
        this.tokenarea = ga;
        this.paramName = ha;
        if (!this.placeholder)this.placeholder = this.input.getAttribute('data-placeholder') || '';
        x(this, ja || {});
        this.initEvents();
        this.initTypeahead();
        this.reset(ia);
        this.initBehaviors();
        setTimeout(this.adjustWidth.bind(this), 0);
        g.inform('Tokenizer/init', this, g.BEHAVIOR_PERSISTENT);
        this.inform('init', {tokens: this.getTokens()});
    };
    fa.prototype.reset = function (ga) {
        "use strict";
        this.tokens = [];
        this.unique = {};
        if (ga) {
            this.populate(ga);
        } else k.empty(this.tokenarea);
        this.updateTokenarea();
    };
    fa.prototype.populate = function (ga) {
        "use strict";
        var ha = [];
        this.tokens = this.getTokenElements().map(function (ia, ja) {
            var ka = ga[ja];
            ha.push(this._tokenKey(ka));
            return this.createToken(ka, ia);
        }, this);
        this.unique = y(ha, this.tokens);
    };
    fa.prototype.getElement = function () {
        "use strict";
        return this.element;
    };
    fa.prototype.getTypeahead = function () {
        "use strict";
        return this.typeahead;
    };
    fa.prototype.getInput = function () {
        "use strict";
        return this.input;
    };
    fa.prototype.initBehaviors = function () {
        "use strict";
        this.behaviors = this.behaviors || [];
        if (this.behaviors instanceof Array) {
            this.behaviors.forEach(function (ia) {
                ia.behavior(this, ia.config);
            }.bind(this));
        } else for (var ga in (this.behaviors || {})) {
            var ha = window.TokenizerBehaviors && window.TokenizerBehaviors[ga];
            ha.call(null, this, this.behaviors[ga]);
        }
    };
    fa.prototype.initTypeahead = function () {
        "use strict";
        var ga = this.typeahead.getCore();
        ga.resetOnSelect = true;
        ga.setValueOnSelect = false;
        ga.preventFocusChangeOnTab = true;
        if (this.inline) {
            var ha = this.typeahead.getView();
            i.addClass(ha.getElement(), 'uiInlineTokenizerView');
        }
        this.typeahead.subscribe('select', function (ia, ja) {
            var ka = ja.selected;
            if ('uid' in ka) {
                this.updateInput();
                this.addToken(this.createToken(ka));
            }
        }.bind(this));
        this.typeahead.subscribe('blur', this.handleBlur.bind(this));
    };
    fa.prototype.handleBlur = function (event) {
        "use strict";
        this.inform('blur', {event: event});
        this.updatePlaceholder();
    };
    fa.prototype.initEvents = function () {
        "use strict";
        var ga = this.handleEvents.bind(this), ha = v.firefox() < 4 ? 'keypress' : 'keydown';
        m.listen(this.tokenarea, {click: ga, keydown: ga});
        m.listen(this.input, 'paste', this.paste.bind(this));
        m.listen(this.input, ha, this.keydown.bind(this));
    };
    fa.prototype.handleEvents = function (event) {
        "use strict";
        var ga = event.getTarget(), ha = ga && this.getTokenElementFromTarget(ga);
        if (!ha)return;
        if (event.type != 'keydown' || m.getKeyCode(event) == p.RETURN)this.processEvents(event, ga, ha);
    };
    fa.prototype.processEvents = function (event, ga, ha) {
        "use strict";
        if (q.byClass(ga, 'remove')) {
            var ia = ha.nextSibling;
            ia = ia && l.scry(ha.nextSibling, '.remove')[0];
            var ja = this.getTokenFromElement(ha);
            ja = this.addTokenData(ja, ga);
            this.removeToken(ja);
            this.focusOnTokenRemoval(event, ia);
            event.kill();
        }
    };
    fa.prototype.focusOnTokenRemoval = function (event, ga) {
        "use strict";
        n.set(event.type == 'keydown' && ga || this.input);
    };
    fa.prototype.addTokenData = function (ga, ha) {
        "use strict";
        return ga;
    };
    fa.prototype.keydown = function (event) {
        "use strict";
        this.inform('keydown', {event: event});
        var ga = m.getKeyCode(event), ha = this.input;
        if (this.inline && ga == p.BACKSPACE && o.isEmpty(ha)) {
            var ia = this.getLastToken();
            if (ia && ia.isRemovable())this.removeToken(ia);
        }
        this.updateInput();
    };
    fa.prototype.paste = function (event) {
        "use strict";
        this.inform('paste', {event: event});
        this.updateInput(true);
    };
    fa.prototype.focusInput = function () {
        "use strict";
        n.set(this.input);
    };
    fa.prototype.updateInput = function (ga) {
        "use strict";
        if (!this.inline)return;
        setTimeout(function () {
            this.adjustWidth(this.input.value);
            if (ga)this.input.value = this.input.value;
        }.bind(this), 20);
        r.setPlaceholderText(this.input, '');
        this.inform('resize');
    };
    fa.prototype.setPlaceholder = function (ga) {
        "use strict";
        this.placeholder = ga;
        if (this.stickyPlaceholder)r.setPlaceholderText(this.input, ga);
        this.updatePlaceholder();
    };
    fa.prototype.updatePlaceholder = function () {
        "use strict";
        if (!this.inline || this.input.value)return;
        var ga = !this.tokens.length, ha = '';
        if (ga || this.stickyPlaceholder) {
            this.adjustWidth(this.placeholder);
            ha = this.placeholder;
        } else this.adjustWidth(this.input.value);
        r.setPlaceholderText(this.input, ha);
    };
    fa.prototype.adjustWidth = function (ga) {
        "use strict";
        if (!this.inline || !this._getIsInDOM())return;
        if (!ga && this.input.value === '')ga = this.placeholder;
        var ha = ba;
        if (ga !== this.placeholder || !this.getTokens().length || this.stickyPlaceholder) {
            var ia = s.getFloat(this.getElement(), 'width'), ja = this._getMetrics().measure(ga);
            ha = ja.width + this._getWidthOffset() + 10;
            ha = (ha >= ia) ? ia : ha;
        }
        s.set(this.input, 'width', ha + 'px');
        this.inform('resize');
        g.inform('reflow');
    };
    fa.prototype.getToken = function (ga) {
        "use strict";
        return this.unique[ga] || null;
    };
    fa.prototype.getTokens = function () {
        "use strict";
        return this.tokens || [];
    };
    fa.prototype.getTokenElements = function () {
        "use strict";
        return l.scry(this.tokenarea, 'span.uiToken');
    };
    fa.prototype.getTokenElementFromTarget = function (ga) {
        "use strict";
        return q.byClass(ga, 'uiToken');
    };
    fa.prototype.getTokenFromElement = function (ga) {
        "use strict";
        return j.get(ga, 'Token');
    };
    fa.prototype.getTokenValues = function () {
        "use strict";
        if (!this.tokens)return [];
        return this.tokens.map(function (ga) {
            return ga.getValue();
        });
    };
    fa.prototype.getFirstToken = function () {
        "use strict";
        return this.tokens[0] || null;
    };
    fa.prototype.getLastToken = function () {
        "use strict";
        return this.tokens[this.tokens.length - 1] || null;
    };
    fa.prototype.hasMaxTokens = function () {
        "use strict";
        return this.maxTokens && this.maxTokens <= this.tokens.length;
    };
    fa.prototype.createToken = function (ga, ha) {
        "use strict";
        var ia = this.getToken(this._tokenKey(ga));
        if (!ia)ia = ga.weak_reference ? new w(ga, this.paramName) : new u(ga, this.paramName);
        ha && ia.setElement(ha);
        return ia;
    };
    fa.prototype.addToken = function (ga) {
        "use strict";
        if (this.hasMaxTokens())return;
        var ha = this._tokenKey(ga.getInfo());
        if (ha in this.unique)return;
        this.unique[ha] = ga;
        this.tokens.push(ga);
        this.insertToken(ga);
        this.updateTokenarea();
        this.inform('addToken', ga);
        this.inform('changeTokens');
        g.inform('Form/change', {node: this.element});
    };
    fa.prototype.insertToken = function (ga) {
        "use strict";
        k.appendContent(this.tokenarea, ga.getElement());
    };
    fa.prototype.removeToken = function (ga) {
        "use strict";
        if (!ga)return;
        var ha = this.tokens.indexOf(ga);
        if (ha < 0)return;
        this.tokens.splice(this.tokens.indexOf(ga), 1);
        delete this.unique[this._tokenKey(ga.getInfo())];
        k.remove(ga.getElement());
        this.updateTokenarea();
        this.inform('removeToken', ga);
        this.inform('changeTokens');
        g.inform('Form/change', {node: this.element});
    };
    fa.prototype.removeAllTokens = function () {
        "use strict";
        this.reset();
        this.inform('changeTokens');
        this.inform('removeAllTokens');
    };
    fa.prototype.updateTokenarea = function () {
        "use strict";
        var ga = this.typeahead.getCore(), ha = this.getTokenValues();
        if (this.excludeDuplicates) {
            this._exclusions || (this._exclusions = ga.getExclusions());
            ga.setExclusions(ha.concat(this._exclusions));
        }
        ga.setEnabled(!this.hasMaxTokens());
        this.updateTokenareaVisibility();
        this.updatePlaceholder();
        this.inform('resize');
        g.inform('reflow');
    };
    fa.prototype.updateTokenareaVisibility = function () {
        "use strict";
        i.conditionShow(this.tokenarea, this.tokens.length !== 0);
    };
    fa.prototype._tokenKey = function (ga) {
        "use strict";
        return ga.uid + (ga.freeform ? ':' : '');
    };
    fa.prototype._getWidthOffset = function () {
        "use strict";
        if (this._widthOffset === null) {
            var ga = this.input.clientWidth, ha = s.getFloat(this.input, 'width');
            if (ga == ha) {
                this._widthOffset = s.getFloat(this.input, 'paddingLeft') + s.getFloat(this.input, 'paddingRight');
            } else this._widthOffset = 0;
        }
        return this._widthOffset;
    };
    fa.prototype._getMetrics = function () {
        "use strict";
        if (!this._metrics)this._metrics = new t(this.input, this.inline);
        return this._metrics;
    };
    fa.prototype._getIsInDOM = function () {
        "use strict";
        return this._isInDOM || (this._isInDOM = l.contains(document.body, this.input));
    };
    fa.getInstance = function (ga) {
        "use strict";
        var ha = q.byClass(ga, 'uiTokenizer');
        return ha ? j.get(ha, 'Tokenizer') : null;
    };
    fa.init = function (ga, ha) {
        "use strict";
        ga.init(ha.tokenarea, ha.param_name, ha.initial_info, ha.options);
    };
    x(fa.prototype, {inline: false, maxTokens: null, excludeDuplicates: true, placeholder: '', _widthOffset: null, _metrics: null});
    e.exports = fa;
}, null);
__d("XPhotosWaterfallBatchLoggingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/photos\/logging\/waterfall\/batch\/", {});
}, null);
__d("PhotosUploadWaterfall", ["AsyncRequest", "AsyncSignal", "Banzai", "PhotosUploadWaterfallXConfig", "XPhotosWaterfallBatchLoggingControllerURIBuilder", "emptyFunction", "randomInt", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = [], p = {APP_FLASH: 'flash_pro', APP_SIMPLE: 'simple', APP_ARCHIVE: 'archive', APP_COMPOSER: 'composer', APP_MESSENGER: 'messenger', APP_HTML5: 'html5', APP_CHAT: 'chat', INSTALL_CANCEL: 1, INSTALL_INSTALL: 2, INSTALL_UPDATE: 3, INSTALL_REINSTALL: 4, INSTALL_PERMA_CANCEL: 5, INSTALL_SILENT_SKIP: 6, INSTALL_DOWNLOAD: 7, CERROR_RESIZING_FAILED: 6, CERROR_MARKER_EXTRACTION_FAILED: 9, BEGIN: 1, UPLOAD_START: 4, ALL_UPLOADS_DONE: 6, CLIENT_ERROR: 7, RECOVERABLE_CLIENT_ERROR: 12, IMAGES_SELECTED: 9, UPGRADE_REQUIRED: 11, VERSION: 15, SELECT_START: 18, SELECT_CANCELED: 19, CANCEL: 22, CANCEL_DURING_UPLOAD: 83, ONE_RESIZING_START: 2, ONE_UPLOAD_START: 10, ONE_UPLOAD_DONE: 29, ONE_RESIZING_DONE: 34, PROGRESS_BAR_STOPPED: 44, MISSED_BEAT: 45, HEART_ATTACK: 46, PUBLISH_START: 100, PUBLISH_SUCCESS: 101, PUBLISH_FAILURE: 102, CLUSTERING_START: 103, CLUSTERING_SUCCESS: 104, CLUSTERING_FAILURE: 105, POST_BUTTON_CLICKED: 110, PHOTO_DELETED: 114, PUBLISH_CLIENT_SUCCESS: 115, PHOTO_ROTATED: 117, SAVE_DRAFT_BUTTON_CLICKED: 123, RECOVERY_START_ON_CLIENT: 124, EDITABLE_PHOTO_FETCH_START: 106, EDITABLE_PHOTO_FETCH_SUCCESS: 107, EDITABLE_PHOTO_FETCH_FAILURE: 108, EDITABLE_PHOTO_FETCH_DELAY: 116, CANCEL_INDIVIDUAL_UPLOAD: 109, MISSING_OVERLAY_NODE: 118, PUBLISH_RETRY_FAILURE: 119, MISSING_UPLOAD_STATE: 120, SESSION_POSTED: 72, POST_PUBLISHED: 80, ONE_UPLOAD_CANCELED: 81, ONE_UPLOAD_CANCELED_DURING_UPLOAD: 82, RESIZER_AVAILABLE: 20, OVERLAY_FIRST: 61, ASYNC_AVAILABLE: 63, FALLBACK_TO_FLASH: 13, RETRY_UPLOAD: 17, TAGGED_ALL_FACES: 14, VAULT_IMAGES_SELECTED: 62, VAULT_CREATE_POST_CANCEL: 65, VAULT_SEND_IN_MESSAGE_CLICKED: 66, VAULT_DELETE_CANCEL: 68, VAULT_ADD_TO_ALBUM_CANCEL: 74, VAULT_SHARE_IN_AN_ALBUM_CLICKED: 76, VAULT_SHARE_OWN_TIMELINE_CLICKED: 77, VAULT_SHARE_FRIENDS_TIMELINE_CLICKED: 78, VAULT_SHARE_IN_A_GROUP_CLICKED: 79, VAULT_SYNCED_PAGED_LINK_CLICKED: 84, VAULTBOX: 'vaultbox', GRID: 'grid', SPOTLIGHT_VAULT_VIEWER: 'spotlight_vault_viewer', REF_VAULT_NOTIFICATION: 'vault_notification', _checkRequiredFields: function (r) {
    }, sendBanzai: function (r, s) {
        this._checkRequiredFields(r);
        var t = {};
        r.scuba_ints = r.scuba_ints || {};
        r.scuba_ints.client_time = Math.round(Date.now() / 1000);
        if (j.retryBanzai) {
            t.retry = true;
            r.scuba_ints.nonce = m(4294967296);
        }
        i.post(j.deprecatedBanzaiRoute, r, t);
        if (s)setTimeout(s, 0);
    }, sendSignal: function (r, s) {
        this._checkRequiredFields(r);
        if (j.useBanzai) {
            this.sendBanzai(r, s);
        } else if (j.reduceLoggingRequests) {
            this.queueLog(r, s);
        } else {
            var t = new h('/ajax/photos/waterfall.php', {data: JSON.stringify(r)}).setHandler(s);
            if (j.timeout)t.setTimeout(10 * 1000);
            t.send();
        }
    }, queueLog: function (r, s) {
        o.push(r);
        if (!!s) {
            this.flushQueue(s);
        } else q();
    }, flushQueue: function (r) {
        var s = JSON.stringify(o);
        o = [];
        var t = new k().getURI();
        new g().setURI(t).setData({logs: s}).setFinallyHandler(r || l).setTimeoutHandler(10 * 1000, r || l).send();
    }}, q = n(p.flushQueue, j.batchInterval * 1000);
    e.exports = p;
}, null);
__d("WebAsyncSearchSource", ["AbstractAsyncSearchSource", "AbstractSearchSource", "AsyncRequest", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j) {
    for (var k in h)if (h.hasOwnProperty(k))m[k] = h[k];
    var l = h === null ? null : h.prototype;
    m.prototype = Object.create(l);
    m.prototype.constructor = m;
    m.__superConstructor__ = h;
    function m(n) {
        "use strict";
        this.$WebAsyncSearchSource0 = new g(n, this.$WebAsyncSearchSource1, this.$WebAsyncSearchSource2);
    }

    m.prototype.bootstrapImpl = function (n) {
        "use strict";
        this.$WebAsyncSearchSource0.bootstrap(n);
    };
    m.prototype.searchImpl = function (n, o, p) {
        "use strict";
        this.$WebAsyncSearchSource0.search(n, o, p);
    };
    m.prototype.getBootstrappedEntries = function (n) {
        "use strict";
        return this.$WebAsyncSearchSource0.getBootstrappedEntries(n);
    };
    m.prototype.getAllEntriesMap = function () {
        "use strict";
        return this.$WebAsyncSearchSource0.getAllEntriesMap();
    };
    m.prototype.$WebAsyncSearchSource1 = function (n, o, p, q) {
        "use strict";
        new i(o.uri).setData(j({}, n, o.data)).setMethod('GET').setReadOnly(true).setHandler(p).setErrorHandler(q).send();
    };
    m.prototype.$WebAsyncSearchSource2 = function (n, o) {
        "use strict";
        var p = n.getPayload(), q;
        if (Array.isArray(p)) {
            q = p;
        } else if (p && p.entries) {
            q = p.entries;
        } else q = [];
        return q.map(o, this);
    };
    e.exports = m;
}, null);
__d("StickerSearch", ["StickerImages", "StickerServerRequests", "StickerState", "createObjectFrom", "getObjectValues"], function (a, b, c, d, e, f, g, h, i, j, k) {
    'use strict';
    var l = 100, m = 1000, n = 10000, o, p, q, r = null, s = {}, t = {requestStickersForTags: function (u, v, w, x) {
        p = w;
        var y = u, z = v.length > 1;
        if (z)y = y.concat(v);
        g.requestStickersForTags(y, function () {
            if (p === w)x(this._getSortedStickersForTags(u, v, w, z));
        }.bind(this));
    }, requestStickersForQuery: function (u, v) {
        p = u;
        h.getStickersForQuery(u, function (w) {
            return p === u && v(w.payload);
        });
    }, _getSortedStickersForTags: function (u, v, w, x) {
        var y = {}, z = this._getTypeaheadStickers(u, w, y), aa = k(z);
        if (x) {
            var ba = this._getIntersectionStickers(v, y);
            aa = aa.concat(ba.filter(function (ca) {
                return !z.hasOwnProperty(ca.id);
            }));
        }
        aa.map(function (ca) {
            return g.cacheSticker(ca);
        });
        aa.sort(function (ca, da) {
            return y[da.id] - y[ca.id];
        });
        return aa;
    }, _getTypeaheadStickers: function (u, v, w) {
        var x = {}, y = g.getStickerTagsData();
        o = j(i.getPackIDsInTray());
        u.forEach(function (z) {
            y[z.id].forEach(function (aa) {
                var ba = aa.score + l;
                if (o[aa.packID])ba += m;
                if (z.name === v)ba += n;
                if (!x[aa.id] || ba > w[aa.id]) {
                    x[aa.id] = aa;
                    w[aa.id] = ba;
                }
            });
        });
        return x;
    }, _getIntersectionStickers: function (u, v) {
        var w = g.getStickerTagsData(), x = u.map(function (z) {
            return w[z.id].map(function (aa) {
                return aa.id;
            });
        }), y = w[u[0].id].filter(function (z) {
            v[z.id] = z.score;
            for (var aa = 1; aa < x.length; aa++)if (x[aa].indexOf(z.id) === -1) {
                return false;
            } else v[z.id] += w[u[aa].id].score;
            return true;
        });
        return y;
    }, prepareTagsData: function () {
        if (!q)q = h.fetchTagData(function (u) {
            r = u;
            r.map(function (v) {
                return s[v.name] = v;
            });
        });
        return q;
    }, getTagByName: function (u) {
        return s[u];
    }, getTags: function () {
        return r;
    }, getTagsIndex: function () {
        return s;
    }};
    e.exports = t;
}, null);
__d("StickerStoreController", ["Bootloader", "DialogFitHeight", "DOM", "LayerAutoFocus", "LayerFadeOnHide", "LayerHideOnEscape", "React", "XUIDialog.react", "XUIDialogBody.react", "XUISpinner.react", "cx", "requestAnimationFrame"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    'use strict';
    var s = 688, t = null, u = m.createClass({displayName: 'StoreLayer', getInitialState: function () {
        return {renderStore: function () {
            return (m.createElement(m.DOM.div, {className: "_5r5e"}, m.createElement(p, {background: "light", size: "large"})));
        }};
    }, componentDidMount: function () {
        g.loadModules(["StickerStore.react"], function (x) {
            this.setState({renderStore: function () {
                return (m.createElement(x, {currentPackID: this.props.packID, onPackSelect: this._packSelected, shown: this.props.shown}));
            }.bind(this)});
        }.bind(this));
    }, _packSelected: function (x) {
        this.setProps({packID: x});
    }, _onToggle: function (x) {
        r(this.setProps.bind(this, {shown: x}, null));
    }, render: function () {
        return (m.createElement(n, {behaviors: {DialogFitHeight: h, LayerAutoFocus: j, LayerFadeOnHide: k, LayerHideOnEscape: l}, onToggle: this._onToggle, shown: this.props.shown, width: s}, m.createElement(o, {className: "_5rq- autofocus"}, this.state.renderStore())));
    }});

    function v(x) {
        var y = i.create('div');
        i.appendContent(document.body, y);
        t = m.renderComponent(m.createElement(u, {packID: x, shown: true}), y);
    }

    var w = {showStore: function (x) {
        if (!t) {
            v(x);
        } else t.setProps({shown: true, packID: x});
    }};
    e.exports = w;
}, null);
__d("StickerContextualDialog.react", ["ReactAbstractContextualDialog", "ReactLayer", "cx"], function (a, b, c, d, e, f, g, h, i) {
    'use strict';
    var j = 47, k = h.createClass(g.createSpec({displayName: 'StickerXUIContextualDialog', theme: {wrapperClassName: "_53ii", arrowDimensions: {offset: j, length: 16}}}));
    k.WIDTH = {NORMAL: 312, WIDE: 400};
    e.exports = k;
}, null);
__d("StickersFlyoutPackSelector.react", ["Animation", "ImmutableObject", "Locale", "React", "Image.react", "StickerActions", "StickerConfig", "StickerConstants", "StickerState", "StickerStoreController", "XUIBadge.react", "cx", "emptyFunction", "fbt", "ix"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
    'use strict';
    var v = 4, w = 200, x = "\u041c\u0430\u0433\u0430\u0437\u0438\u043d \u043d\u0430\u043a\u043b\u0435\u0435\u043a", y = j.createClass({displayName: 'StickersFlyoutPackSelector', propTypes: {isComments: j.PropTypes.bool, numNewPacks: j.PropTypes.number, packs: j.PropTypes.arrayOf(j.PropTypes.instanceOf(h)).isRequired, onPackClick: j.PropTypes.func, selectedPackID: j.PropTypes.string, resetTagSelectorFunc: j.PropTypes.func}, getInitialState: function () {
        return {animating: false, page: 0};
    }, getDefaultProps: function () {
        return {isComments: false, numNewPacks: 0};
    }, shouldComponentUpdate: function (aa, ba) {
        return !ba.animating;
    }, onFlyoutShown: function () {
        if (this.props.packs.length > 0) {
            var aa = this._calculatePageForPack(this.props.selectedPackID);
            if (this.state.page !== aa)this._setPage(aa, 0);
        }
    }, _calculatePageForPack: function (aa) {
        for (var ba = 0; ba < this.props.packs.length; ba++)if (this.props.packs[ba].id == aa)return ba <= v ? 0 : Math.floor((ba - 1) / v);
        return 0;
    }, _setPage: function (aa, ba) {
        if (this.state.animating)return;
        this.setState({animating: true, page: aa}, function () {
            var ca = this.refs.positioner.getDOMNode(), da = this._calculatePosition(aa);
            new g(ca).to(da.reference, da.offset + 'px').ondone(function () {
                return this.setState({animating: false});
            }.bind(this)).duration(ba).go();
        });
    }, _calculatePosition: function (aa) {
        var ba = this.refs.positioner.getDOMNode(), ca = ba.childNodes[aa].offsetLeft;
        if (i.isRTL()) {
            var da = ba.offsetWidth, ea = ba.childNodes[aa].offsetWidth;
            return {reference: 'right', offset: ca + ea - da};
        }
        return {reference: 'left', offset: -ca};
    }, _numPages: function () {
        return Math.max(1, Math.ceil((this.props.packs.length - 1) / v));
    }, _canGoPrev: function () {
        return this.state.page > 0;
    }, _canGoNext: function () {
        return this.state.page + 1 < this._numPages();
    }, _goPrev: function () {
        this._canGoPrev() && this._setPage(this.state.page - 1, w);
    }, _goNext: function () {
        this._canGoNext() && this._setPage(this.state.page + 1, w);
    }, _openStore: function () {
        l.resetNumNewPacks();
        p.showStore();
    }, render: function () {
        return (j.createElement(j.DOM.div, {className: "_5r85"}, this._renderStoreButton(), this._renderPrevArrow(), this._renderNextArrow(), j.createElement(j.DOM.div, {className: "_5r88"}, j.createElement(j.DOM.div, {className: "_5r89", ref: "positioner"}, this._renderPages()))));
    }, _selectPack: function (aa) {
        var ba = o.getPack(aa);
        if (ba && ba.isPromoted)l.addPack(aa);
        if (aa === n.SEARCH_PACK_ID)this.props.resetTagSelectorFunc();
        if (this.props.onPackClick) {
            this.props.onPackClick(aa);
        } else l.selectPack(aa);
    }, _renderPages: function () {
        var aa = this.props.packs.map(function (ea, fa) {
            return j.createElement(z, {key: ea.id, onClick: function () {
                return this._selectPack(ea.id);
            }.bind(this), pack: ea, selected: this.props.selectedPackID === ea.id, index: fa, isComments: this.props.isComments});
        }.bind(this)), ba = [];
        for (var ca = 0; ca < aa.length; ca += v) {
            var da = ca;
            ca === 0 && ca++;
            ba.push(j.createElement(j.DOM.div, {className: "_5r81", key: ca}, aa.slice(da, ca + v)));
        }
        return ba;
    }, _renderStoreButton: function () {
        var aa = m.WebStickerTrayPlusSign ? u('/images/messaging/stickers/selector/sticker_store.png') : u('/images/messaging/stickers/selector/store.png');
        return (j.createElement(j.DOM.a, {'aria-label': x, className: (("_5r86") + (' ' + "rfloat") + (m.WebStickerTrayPlusSign ? ' ' + "_5qci" : '')), 'data-hover': "tooltip", onClick: this._openStore}, j.createElement(k, {className: "_5r87", src: aa}), this._renderJewel()));
    }, _renderJewel: function () {
        var aa = this.props.numNewPacks;
        if (!aa)return null;
        return (j.createElement(q, {className: "rfloat _3fhs", count: aa, maxcount: 9, type: "special"}));
    }, _renderPrevArrow: function () {
        if (!this._canGoPrev())return null;
        return (j.createElement(j.DOM.a, {className: (("_37wu") + (' ' + "lfloat")), onClick: this._goPrev}, j.createElement(k, {className: "_5r84", src: u('/images/messaging/stickers/selector/left.png')})));
    }, _renderNextArrow: function () {
        if (!this._canGoNext())return null;
        return (j.createElement(j.DOM.a, {className: (("_37wv") + (' ' + "rfloat")), onClick: this._goNext}, j.createElement(k, {className: "_5r84", src: u('/images/messaging/stickers/selector/right.png')})));
    }}), z = j.createClass({displayName: 'PackIcon', propTypes: {index: j.PropTypes.number, isComments: j.PropTypes.bool, onClick: j.PropTypes.func, pack: j.PropTypes.instanceOf(h).isRequired, selected: j.PropTypes.bool}, getDefaultProps: function () {
        return {isComments: false, onClick: s};
    }, _getPackIcon: function (aa) {
        if (aa.id == n.SEARCH_PACK_ID)return u('/images/messaging/stickers/icons/search.png');
        if (aa.id == n.MRU_STICKER_PACK)return u('/images/messaging/stickers/icons/recent.png');
        if (aa.id == n.EMOTICON_PACK_ID)return u('/images/messaging/stickers/icons/emoji.png');
        return aa.icon;
    }, render: function () {
        var aa = this.props.pack, ba = m.WebStickerSearch ? this.props.index === 1 || this.props.index === 2 : this.props.index === 1, ca = (("_5r8a") + (this.props.selected ? ' ' + "_5r8b" : '') + (aa.id == n.MRU_STICKER_PACK ? ' ' + "_5qcj" : '') + (aa.id == n.SEARCH_PACK_ID ? ' ' + "_5qck" : '') + (ba ? ' ' + "_eb3" : '')), da = this.props.isComments && aa.isMessengerOnly, ea = "\u0414\u0430\u043d\u043d\u044b\u0439 \u043d\u0430\u0431\u043e\u0440 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u0442\u043e\u043b\u044c\u043a\u043e \u0432 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f\u0445", fa = da ? s : function () {
            return this.props.onClick(aa.id);
        }.bind(this);
        return (j.createElement(j.DOM.a, {'aria-label': da ? ea : aa.name, className: ca, 'data-id': aa.id, 'data-hover': "tooltip", ref: "search_icon", onClick: fa, tabIndex: "0"}, j.createElement(k, {className: ((da ? "_2ji6" : '') + (' ' + "_5r8c") + (m.WebStickerSearch ? ' ' + "_1viy" : '')), src: this._getPackIcon(aa)})));
    }});
    e.exports = y;
}, null);
__d("XUIAmbientNUXTheme", ["cx"], function (a, b, c, d, e, f, g) {
    var h = {wrapperClassName: "_2x6q", arrowDimensions: {offset: 14, length: 18}};
    e.exports = h;
}, null);
__d("StickerSearchNUX.react", ["React", "ReactLayeredComponentMixin", "StickerServerRequests", "XUIAmbientNUX.react", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = g.createClass({displayName: 'StickerSearchNUX', mixins: [h], getInitialState: function () {
        return {nuxShown: true};
    }, componentDidMount: function () {
        i.markSeenSearchTooltipNUX();
    }, hideNUX: function () {
        this.setState({nuxShown: false});
    }, onCloseButtonClicked: function () {
        this.hideNUX();
        this.props.showIndicatorFunc();
    }, renderLayers: function () {
        return {stickerSearchNUX: g.createElement(j, {ref: "NUX", contextRef: "container", shown: this.state.nuxShown, position: "above", width: "auto", onCloseButtonClick: this.onCloseButtonClicked}, "\u0422\u0435\u043f\u0435\u0440\u044c \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0438\u0441\u043a\u0430\u0442\u044c \u043d\u0430\u043a\u043b\u0435\u0439\u043a\u0438!")};
    }, render: function () {
        return (g.createElement(g.DOM.span, {ref: "container"}));
    }});
    e.exports = l;
}, null);