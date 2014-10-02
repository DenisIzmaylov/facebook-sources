/*!CK:1678501058!*//*1412109718,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["4otqi"]);
}

__d("BusinessConf", [], function (a, b, c, d, e, f) {
    e.exports = {DOMAIN: "business", BIZ_ID_PARAM_NAME: "business_id", LABEL_ID_PARAM_NAME: "label_id", ACCOUNT_ID_PARAM_NAME: "act", ACCOUNT_ID_PARAM_NAME_LONG: "account_id", ACCOUNT_IDS_PARAM_NAME_LONG: "account_ids", PAGE_ID_PARAM_NAME: "id", PAGE_ADMIN_SELECTED_KEY: "sk", PRODUCT_CATALOG_ID_PARAM_NAME: "catalog_id", PRODUCT_FEED_ID_PARAM_NAME: "feed_id", LEGACY_ADS_MANAGER_PREFIX: "\/ads\/manage\/", CAMPAIGN_MANAGER_PREFIX: "\/ads\/manager\/", SHOW_SPLASH_PARAM_NAME: "splash", WHITELISTED_URI_CLASS: "bizOK", OPT_OUT_KEY: "do_not_redirect_to_biz_site", OPT_OUT_EXPIRE: 86400, HIGHLANDER_OPT_OUT_KEY: "use_biz_page_in_highlander"};
}, null);
__d("MessageThreadViewSource", [], function (a, b, c, d, e, f) {
    e.exports = {UNSPECIFIED: "unspecified", LEGACY: "legacy", LEGACY_MESSAGES_PREVIEW: "legacy_messages_preview", REFRESH_SPRINGBOARD: "springboard", REFRESH_MESSAGETAB: "message_tab", REFRESH_PERMALINK: "permalink", REFRESH_HIGHLANDER_JEWEL: "highlander_jewel", REFRESH_SEARCH_TYPEAHEAD: "search_typeahead", MTOUCH_MESSAGE_TAB: "mtouch_message_tab", MBASIC_MESSAGE_TAB: "mbasic_message_tab"};
}, null);
__d("BlueBar", ["Arbiter", "Event", "Run", "SubscriptionsHandler"], function (a, b, c, d, e, f, g, h, i, j) {
    var k;

    function l(event) {
        if (g.inform('BlueBar/homeClick') === false)event.preventDefault();
    }

    function m() {
        if (k) {
            k.release();
            k = null;
        }
    }

    var n = {listen: function (o) {
        if (!k) {
            k = new j();
            i.onUnload(m);
        }
        k.addSubscriptions(h.listen(o, 'click', l));
    }};
    e.exports = n;
}, null);
__d("BlueBarMinWidth", ["DOM", "DOMDimensions", "Event", "Locale", "Style", "Vector", "csx", "queryThenMutateDOM"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    f.init = function () {
        var o = g.find(document, "div._uaw"), p = g.find(o, "._59g8"), q, r = n.bind(null, function () {
            var s = h.getElementDimensions(o).width, t;
            if (j.isRTL()) {
                t = -l.getElementPosition(o).x;
            } else t = l.getElementPosition(o).x + s - h.getViewportDimensions().width;
            var u = s - t - v;
            if (t > 0 && u > 0) {
                var v = h.measureElementBox(o, 'width', true);
                q = u + 'px';
            } else q = '';
        }, function () {
            k.set(p, 'width', q);
        }, 'BlueBarMinWidth');
        i.listen(window, 'resize', r);
        r();
    };
}, null);
__d("BusinessAssetGrouping.brands", ["emptyFunction", "getObjectValues"], function (a, b, c, d, e, f, g, h) {
    'use strict';
    var i = "personal-business", j = {NULL_BIZ_ID: i, groupAssets: function (r, s, t, u, v, w, x, y) {
        v = v || o;
        w = w || g.thatReturnsTrue;
        var z = k(r, s, t), aa = z.businessesByID;
        aa[i] = {id: i, name: x || "You"};
        var ba = l(z.assetsByBizID, aa, u), ca = p(h(ba), n);
        if (y && ca[0].bizID === i)ca.shift();
        var da = [];
        for (var ea = 0; ea < ca.length; ea++) {
            var fa = ca[ea], ga = false;
            fa.assets = p(fa.assets, v);
            fa.assets = q(fa.assets, w, fa.bizID);
            if (fa.assets.length !== 0) {
                da = da.concat(fa.assets);
                ga = true;
            }
            fa.projects = p(h(fa.projectsByID), m);
            delete fa.projectsByID;
            for (var ha = 0; ha < fa.projects.length; ha++) {
                fa.projects[ha].assets = p(fa.projects[ha].assets, v);
                fa.projects[ha].assets = q(fa.projects[ha].assets, w, fa.bizID);
                if (fa.projects[ha].assets.length !== 0) {
                    da = da.concat(fa.projects[ha].assets);
                    ga = true;
                }
            }
            if (!ga)ca[ea] = null;
        }
        ca = ca.filter(function (ia) {
            return ia;
        });
        return {businessesByID: aa, groupedAssets: ca, assets: da};
    }};

    function k(r, s, t) {
        var u = {}, v = {};
        for (var w = 0; w < r.length; w++) {
            var x = r[w], y = t(x);
            if (!y || y.length === 0) {
                u[i] ? u[i].push(x) : u[i] = [x];
                continue;
            }
            for (var z = 0; z < y.length; z++) {
                var aa = y[z], ba;
                if (aa.business) {
                    ba = aa.business.id;
                    v[ba] = aa.business;
                } else ba = i;
                if (u[ba]) {
                    u[ba].push(x);
                } else u[ba] = [x];
            }
        }
        return {assetsByBizID: u, businessesByID: v};
    }

    function l(r, s, t) {
        var u = {}, v;
        for (var w in r) {
            v = r[w];
            u[w] = u[w] || {bizID: w, name: s[w].name, projectsByID: {}, assets: []};
            for (var x = 0; x < v.length; x++) {
                var y = v[x], z = t(y), aa = false;
                if (w !== i && z && z.length > 0)for (var ba = 0; ba < z.length; ba++) {
                    var ca = z[ba];
                    if (ca.business && ca.business.id !== w)continue;
                    var da = u[w].projectsByID;
                    da[ca.id] = da[ca.id] || {projectID: ca.id, name: s[w].name + " - " + ca.name, assets: []};
                    da[ca.id].assets.push(y);
                    aa = true;
                }
                if (!aa)u[w].assets.push(y);
            }
        }
        return u;
    }

    function m(r) {
        return (r.name || "").toUpperCase();
    }

    function n(r) {
        if (r.bizID === i)return String.fromCharCode(0);
        return r.name;
    }

    function o(r) {
        return r.name ? r.name : r.id;
    }

    function p(r, s) {
        return r.sort(function (t, u) {
            var v = s(t), w = s(u);
            if (v > w) {
                return 1;
            } else if (v < w) {
                return -1;
            } else return 0;
        });
    }

    function q(r, s, t) {
        return r.filter(function (u) {
            return s(u, t);
        });
    }

    e.exports = j;
}, null);
__d("BizSiteIdentifier.brands", ["BusinessConf", "BusinessAssetGrouping.brands", "URI"], function (a, b, c, d, e, f, g, h, i) {
    var j = h.NULL_BIZ_ID, k = {isBizSite: function () {
        return i.getRequestURI(false).getSubdomain() === g.DOMAIN;
    }, getBusinessID: function () {
        return i.getRequestURI(false).getQueryData()[g.BIZ_ID_PARAM_NAME];
    }, createBusinessURL: function (l, m) {
        if (m === j)return i(l).setSubdomain('www');
        var n = i(l).setSubdomain(g.DOMAIN);
        if (k.isBizSite())n.setDomain(i.getRequestURI().getDomain());
        var o = m || k.getBusinessID();
        n.addQueryData(g.BIZ_ID_PARAM_NAME, o);
        return n;
    }};
    e.exports = k;
}, null);
__d("NotificationCounter", ["Arbiter", "DocumentTitle", "JSLogger"], function (a, b, c, d, e, f, g, h, i) {
    var j = {messages: 0, notifications: 0, requests: 0}, k = {init: function (l) {
        g.subscribe('update_title', this._handleUpdate.bind(this));
        g.subscribe('jewel/count-updated', this._handleCountUpdate.bind(this));
    }, getCount: function () {
        var l = 0;
        for (var m in j) {
            var n = Number(j[m]);
            if (typeof j[m] == 'string' && isNaN(n))return j[m];
            if (isNaN(n) || n < 0) {
                i.create('jewels').error('bad_count', {jewel: m, count: j[m]});
                continue;
            }
            l += n;
        }
        return l;
    }, updateTitle: function () {
        var l = this.getCount(), m = h.get();
        m = l ? '(' + l + ') ' + m : m;
        h.set(m, true);
    }, _handleCountUpdate: function (l, m) {
        j[m.jewel] = m.count;
        this.updateTitle();
    }, _handleUpdate: function (l, m) {
        this.updateTitle();
    }};
    e.exports = k;
}, null);
__d("NotificationJewelController", ["Arbiter", "Event", "NotificationConstants", "NotificationCounter", "NotificationSeenState", "NotificationUpdates", "NotificationUserActions", "createObjectFrom", "curry"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    function p(r) {
        g.inform('jewel/count-updated', {jewel: r, count: k.getUnseenIDs().length}, g.BEHAVIOR_STATE);
    }

    function q(r, s, t, u) {
        "use strict";
        j.init();
        var v = h.listen(r.getRoot(), 'mouseover', function () {
            v.remove();
            v = null;
            s.open();
        });
        if (r.isOpen()) {
            s.open();
        } else var w = r.subscribe('opened', function () {
            w.unsubscribe();
            w = null;
            s.open();
        });
        var x = s.pause.bind(s);
        r.subscribe('opened', function () {
            setTimeout(x, 0);
            var y = k.getUnseenIDs();
            if (y.length)m.markNotificationsAsSeen(y);
        });
        r.subscribe('closed', function () {
            s.unpause();
            p(r.name);
        });
        l.subscribe('seen-state-updated', o(p, r.name));
        l.handleUpdate(i.PayloadSourceType.INITIAL_LOAD, {seenState: n(t, false), readState: n(u, false)});
    }

    e.exports = q;
}, null);
__d("NotificationJewelHeaderController", ["DOM", "Event", "NotificationSeenState", "NotificationUserActions", "NotificationUpdates"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(m, n) {
        "use strict";
        h.listen(m, 'click', function () {
            var o = i.getUnreadIDs();
            if (o.length)j.markNotificationsAsRead(o);
        });
        k.subscribe('read-state-updated', function () {
            if (n)g.setContent(n, i.getUnreadCount());
        });
    }

    e.exports = l;
}, null);
__d("NotificationHiddenState", ["NotificationUpdates", "copyProperties"], function (a, b, c, d, e, f, g, h) {
    var i = {};
    g.subscribe('update-hidden', function (k, l) {
        if (l.hiddenState) {
            i = h(i, l.hiddenState);
            g.didUpdateHiddenState(Object.keys(l.hiddenState));
        }
    });
    var j = {isHidden: function (k) {
        if (i[k])return i[k];
        return false;
    }};
    e.exports = j;
}, null);
__d("XNotificationInlineStoryControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/desktop_notifications\/inline_story\/", {notif_id: {type: "String", required: true}, flyout_id: {type: "String", required: true}});
}, null);
__d("InlineStoryFlyout", ["Arbiter", "AsyncRequest", "csx", "DOM", "ScrollableArea", "Style", "Vector", "XNotificationInlineStoryControllerURIBuilder", "XNotificationInlineStoryDialogControllerURIBuilder"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = 450, q = 25, r = 160, s = 120, t = [], u = null, v = {}, w = {init: function (x) {
        t.push(x);
    }, setDialog: function (x) {
        if (!u) {
            u = x;
            u.subscribe('hide', w._onDialogHide);
            t.forEach(function (y) {
                y.subscribe('closed', function () {
                    u.hide();
                });
            });
        }
        g.inform('inlineStory/dialogLoaded');
    }, reuseDialog: function (x, y) {
        if (!u) {
            var z = g.subscribe('inlineStory/dialogLoaded', function () {
                u.setInnerContent(x);
                w.showDialog(y);
                w.setupCommentArbiter(x);
                w.updatePosition();
                g.inform('inlineStory/flyoutLoaded');
                g.subscribe('inlineStory/ufiLoaded', w.updatePosition);
                z.unsubscribe();
            }.bind(this)), aa = new o().setString('flyout_id', y).getURI();
            new h().setURI(aa).send();
            g.inform('inlineStory/flyoutLoaded');
        } else {
            if (u.getContent() != x)u.setInnerContent(x);
            w.showDialog(y);
            w.setupCommentArbiter(x);
            g.inform('inlineStory/flyoutLoaded');
        }
    }, _onDialogHide: function () {
        var x = u.getContext().id, y = u.getContent();
        v[x] = y;
    }, requestStory: function (x, y) {
        if (y in v) {
            w.reuseDialog(v[y], y);
        } else {
            var z = new n().setString('notif_id', x).setString('flyout_id', y).getURI();
            new h().setURI(z).send();
        }
    }, setCommentFocus: function () {
        var x = j.scry(u.getContentRoot(), "._5vpa textarea");
        if (x.length > 0)x[0].focus();
    }, setupCommentArbiter: function (x) {
        g.subscribe('ufi/comment', function (y, z) {
            var aa = j.scry(x, "._5vp9");
            if (!aa)return;
            var ba = j.scry(aa[0], '.uiScrollableAreaWrap')[0];
            ba = ba && k.getInstance(ba);
            ba && ba.scrollToBottom();
        });
    }, showDialog: function (x) {
        var y = false;
        for (var z = 0; z < t.length; z++)if (t[z] && t[z].isOpen()) {
            y = true;
            break;
        }
        if (!y || !u) {
            if (u)u.hide();
            return;
        }
        u.setContext(j.find(document, '#' + x));
        u.show();
    }, updatePosition: function () {
        if (!u)return;
        var x = u.getContentRoot(), y = j.scry(x, "._5vp9")[0], z = j.scry(x, "._53ij")[0];
        if (!y || !z)return;
        var aa = m.getViewportDimensions().y, ba = aa - r, ca = Math.min(p, ba), da = ca - q, ea = j.scry(y, '.uiScrollableAreaContent')[0];
        if (!ea)return;
        var fa = m.getElementDimensions(ea), ga = Math.min(da, fa.y);
        l.set(y, 'height', ga + 'px');
        var ha = m.getElementPosition(y).y, ia = m.getScrollPosition('document').y, ja = ga + ha - aa - ia + s;
        if (ja > 0)l.set(z, 'margin-top', -ja + 'px');
        ja = ia - ha + q;
        if (ja > 0)l.set(z, 'margin-top', ja + 'px');
        w.setCommentFocus();
    }};
    e.exports = w;
}, null);
__d("PageLikeButton.react", ["AsyncResponse", "Image.react", "PageFanning", "React", "XUIButton.react", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = j.createClass({displayName: 'PageLikeButton', propTypes: {pageID: j.PropTypes.number.isRequired, reference: j.PropTypes.string.isRequired}, getInitialState: function () {
        return {liked: false};
    }, _onClick: function (o) {
        o.preventDefault();
        if (!this.state.liked) {
            this.setState({liked: true});
            i.setFanStatus(this.refs.likeButton.getDOMNode(), this.props.pageID, true, false, this._onSuccess, this._onFailure, {fan_origin: this.props.reference, fan_source: this.props.reference});
        }
    }, _onSuccess: function () {
        this.setState({liked: true});
    }, _onFailure: function (o) {
        this.setState({liked: false});
        g.defaultErrorHandler(o);
    }, render: function () {
        var o = this.state.liked ? "\u041d\u0440\u0430\u0432\u0438\u0442\u0441\u044f" : "\u041d\u0440\u0430\u0432\u0438\u0442\u0441\u044f", p = j.createElement(h, {src: "/images/litestand/glyph/like.png"});
        return (j.createElement(k, {className: "_19nd", disabled: this.state.liked, image: p, label: o, onClick: this._onClick, ref: "likeButton", suppressed: false, size: "medium", use: "default"}));
    }});
    e.exports = n;
}, null);
__d("ReadToggle.react", ["React", "cx", "emptyFunction", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    var k = g.createClass({displayName: 'ReadToggle', propTypes: {isRead: g.PropTypes.bool.isRequired, onClick: g.PropTypes.func, readLabel: g.PropTypes.renderable, unreadLabel: g.PropTypes.renderable}, getDefaultProps: function () {
        return {onClick: i};
    }, render: function () {
        return (g.createElement(g.DOM.div, {'aria-label': this.props.isRead ? this.props.readLabel : this.props.unreadLabel, className: this._getClasses(), 'data-hover': "tooltip", 'data-tooltip-alignh': "center", onClick: this.props.onClick, role: "button"}));
    }, _getClasses: function () {
        return j(this.props.className, ((!this.props.isRead ? "_5c9q" : '') + (this.props.isRead ? ' ' + "_5c9_" : '')));
    }});
    e.exports = k;
}, null);
__d("XNotificationInlineStoryLoggingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/desktop_notifications\/inline_story_logging\/", {screen_wide_enough: {type: "Bool"}, is_snowlift: {type: "Bool"}, is_vault_set: {type: "Bool"}, is_aggregated_story: {type: "Bool"}, should_fallback: {type: "Bool"}});
}, null);
__d("NotificationJewelItem.react", ["Arbiter", "AsyncRequest", "AsyncResponse", "BizSiteIdentifier.brands", "CloseButton.react", "DOM", "Event", "FlexibleBlock.react", "ImageBlock.react", "InlineStoryFlyout", "InlineStoryInsert", "Keys", "NotificationPhotoThumbnail", "NotificationURI", "NotificationUserActions", "PageLikeButton.react", "React", "TextWithEntities.react", "ReadToggle.react", "Timestamp.react", "URI", "VaultBoxURI", "Vector", "XNotificationInlineStoryLoggingControllerURIBuilder", "XPermalinkDialogControllerURIBuilder", "XUIButton.react", "XUISpinner.react", "cx", "emptyFunction", "invariant", "mergeObjects", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la) {
    var ma = 950, na = {group_activity: true};

    function oa(ra, sa) {
        return w.createElement(w.DOM.span, {className: "fwb"}, ra);
    }

    function pa(ra) {
        return !!(ra && ra.id && !ra.is_facebook_app);
    }

    var qa = w.createClass({displayName: 'NotificationJewelItem', getInitialState: function () {
        return {showingOptions: false, negativeFeedbackConfirmation: null, canReportAsSpam: false, spamReportConfirmation: null, sendingFeedback: false, mayUndoHide: false, firstReceiptHandled: false, showLoadingIndicator: false, isBizSite: j.isBizSite()};
    }, _onKeyDownItem: function (ra) {
        if (m.getKeyCode(ra.nativeEvent) == r.RETURN)this._markItemRead();
    }, _markItemReadIfUnread: function () {
        !this.props.isRead && this._markItemRead();
    }, _markItemRead: function () {
        u.markNotificationsAsRead([this.props.alert_id]);
    }, _onFeedbackError: function (ra) {
        i.defaultErrorHandler(ra);
        this.setState({sendingFeedback: false});
    }, _onHideSuccess: function (ra) {
        var sa = ra.getPayload();
        ja(sa.confirmation);
        this.setState({negativeFeedbackConfirmation: sa.confirmation, canReportAsSpam: sa.canReportAsSpam, sendingFeedback: false});
    }, _onHideAppSuccess: function (ra) {
        var sa = ra.getPayload(), ta = sa.confirmation, ua = sa.canReportAsSpam;
        ja(ta);
        this.setState({negativeFeedbackConfirmation: ta, canReportAsSpam: ua, mayUndoHide: true, sendingFeedback: false, showingOptions: true});
    }, _onSpamReportSuccess: function (ra) {
        var sa = ra.getPayload().spamReportConfirmation;
        this.setState({negativeFeedbackConfirmation: null, spamReportConfirmation: sa, sendingFeedback: false});
    }, _onHide: function () {
        u.markNotificationAsHidden(this.props.alert_id, this._onHideSuccess, this._onFeedbackError);
        this.setState({sendingFeedback: true, mayUndoHide: true});
    }, _onShow: function () {
        var ra = this.props.negative ? this.props.negative.subscription_level : null;
        u.markNotificationAsVisible(this.props.alert_id, ra, function () {
            this.setState({negativeFeedbackConfirmation: null, sendingFeedback: false, showingOptions: false});
        }.bind(this), this._onFeedbackError);
        this.setState({sendingFeedback: true});
    }, _onReportSpam: function () {
        u.markNotificationAsSpam(this.props.alert_id, this._onSpamReportSuccess, this._onFeedbackError);
        this.setState({sendingFeedback: true});
    }, _markAppAsHidden: function () {
        u.markAppAsHidden(this.props.alert_id, this.props.application.id, this._onHideAppSuccess, this._onFeedbackError);
        this.setState({sendingFeedback: true});
    }, _markAppAsVisible: function () {
        u.markAppAsVisible(this.props.alert_id, this.props.application.id, function () {
            this.setState({negativeFeedbackConfirmation: null, sendingFeedback: false, showingOptions: false, mayUndoHide: false});
        }.bind(this), this._onFeedbackError);
        this.setState({sendingFeedback: true});
    }, _onFirstReceiptYes: function () {
        u.markFirstReceiptYes(this.props.alert_id, function () {
            this.props.onHandleFirstReceipt(this.props.application.id);
            this.setState({firstReceiptHandled: true});
        }.bind(this), ia);
    }, _onFirstReceiptNo: function () {
        u.markFirstReceiptNo(this.props.alert_id, function () {
            this._markAppAsHidden();
            this.props.onHandleFirstReceipt(this.props.application.id);
            this.setState({firstReceiptHandled: true});
        }.bind(this), this._onFeedbackError);
        this.setState({sendingFeedback: true});
    }, _renderAttachedItem: function (ra) {
        if (ra)return (w.createElement(w.DOM.img, {src: ra.uri, className: "_42td", 'aria-hidden': true}));
        if (this.props.showLikeButton && (this.props.notif_type === 'fbpage_fan_invite' || this.props.notif_type === 'fbpage_ci_invite'))return (w.createElement(v, {pageID: this.props.contextID, reference: this.props.notif_type + '_jewel'}));
        return w.createElement(w.DOM.span, null);
    }, _getModifiedTrackingString: function (ra) {
        return JSON.stringify(ka(JSON.parse(this.props.tracking), ra));
    }, _onClickCloseButton: function () {
        this.setState({showingOptions: true});
    }, _onCancelNegativeFeedback: function () {
        this.setState({showingOptions: false});
    }, shouldComponentUpdate: function (ra, sa) {
        return (this.props.visible !== ra.visible || this.props.isRead !== ra.isRead || this.props.timestamp !== ra.timestamp || this.state.showingOptions !== sa.showingOptions || this.state.sendingFeedback !== sa.sendingFeedback || this.state.canReportAsSpam !== sa.canReportAsSpam || this.state.spamReportConfirmation !== sa.spamReportConfirmation || this.state.showLoadingIndicator !== sa.showLoadingIndicator);
    }, render: function () {
        if (!this.props.visible && !this.state.mayUndoHide)return w.createElement(w.DOM.li, {className: "_4_62"});
        var ra = this.props.negative, sa = this.props.negativeTracking, ta = (("_33c") + (!this.props.isRead ? ' ' + "_4af" : '') + (this.state.showingOptions ? ' ' + "_4ag" : '') + (this.state.sendingFeedback ? ' ' + "_4m8s" : ''));
        if (this.state.negativeFeedbackConfirmation) {
            var ua = this.state.negativeFeedbackConfirmation, va;
            if (this.state.canReportAsSpam)va = w.createElement(w.DOM.span, null, w.createElement(w.DOM.span, {className: "mhs"}, "·"), w.createElement(w.DOM.a, {href: "#", onClick: this._onReportSpam}, "\u0421\u043e\u043e\u0431\u0449\u0438\u0442\u0435 \u043e \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438, \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u044f\u044e\u0449\u0435\u043c \u0441\u043f\u0430\u043c"));
            var wa = pa(this.props.application) ? this._markAppAsVisible : this._onShow;
            return (w.createElement(w.DOM.li, {className: ta, 'data-gt': this.props.tracking}, w.createElement(w.DOM.div, {className: "_4ai"}, w.createElement(x, {interpolator: oa, ranges: ua.ranges, aggregatedranges: ua.aggregated_ranges, text: ua.text}), w.createElement(w.DOM.a, {href: "#", onClick: wa, className: "mls"}, "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c"), va)));
        }
        var xa = this.state.spamReportConfirmation;
        if (xa)return (w.createElement(w.DOM.li, {className: ta, 'data-gt': this.props.tracking}, w.createElement(w.DOM.div, {className: "_4ai"}, w.createElement(x, {interpolator: oa, ranges: xa.ranges, aggregatedranges: xa.aggregated_ranges, text: xa.text}))));
        if (this.state.showingOptions) {
            var ya = pa(this.props.application) ? this._markAppAsHidden : this._onHide;
            return (w.createElement(w.DOM.li, {className: ta, 'data-gt': this.props.tracking}, w.createElement(w.DOM.div, {className: "_4ai"}, w.createElement(w.DOM.div, null, w.createElement(x, {interpolator: oa, ranges: ra.confirm_question.ranges, aggregatedranges: ra.confirm_question.aggregated_ranges, text: ra.confirm_question.text})), w.createElement(w.DOM.div, {className: "mts"}, w.createElement(fa, {'data-gt': this._getModifiedTrackingString(sa.confirm), href: {url: '#'}, label: ra.turn_off, use: "confirm", onClick: ya, disabled: this.state.sendingFeedback}), w.createElement(fa, {'data-gt': this._getModifiedTrackingString(sa.cancel), href: {url: '#'}, label: "\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0432\u043a\u043b\u044e\u0447\u0435\u043d\u043d\u044b\u043c", onClick: this._onCancelNegativeFeedback, disabled: this.state.sendingFeedback})))));
        }
        var za = null;
        if (this.props.title)za = w.createElement(x, {interpolator: oa, ranges: this.props.title.ranges, aggregatedranges: this.props.title.aggregated_ranges, text: this.props.title.text, renderEmoji: true, renderEmoticons: true});
        var ab = null, bb = null, cb = null;
        if (ra) {
            var db = this._onClickCloseButton, eb;
            if (this.props.isFirstReceipt) {
                bb = w.createElement(w.DOM.span, {className: "_540_"}, "\u041d\u041e\u0412\u041e\u0415");
                db = this._onFirstReceiptNo;
                cb = this._onFirstReceiptYes;
                eb = this._getModifiedTrackingString(sa.firstReceiptNo);
            } else eb = this._getModifiedTrackingString(sa.click);
            var fb = (("_4ah") + (' ' + "_55m9"));
            ab = w.createElement(k, {className: fb, 'data-gt': eb, size: "medium", tooltip: ra.button_tooltip, onClick: db, ref: "closeButton"});
        }
        var gb = t.localize(this.props.url), hb = s.getThumbnail(this.props.attachments, this.props.attached_story, this.props.feedback_context), ib = hb && t.snowliftable(gb), jb = t.isVaultSetURI(gb), kb = t.isAlbumDraftRecoveryDialogURI(gb), lb = w.createElement(y, {className: "_55m9", isRead: !!this.props.isRead, onClick: this._markItemReadIfUnread, readLabel: "\u041f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043e", unreadLabel: "\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u043a\u0430\u043a \u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u043e\u0435"}), mb = (ib || jb || kb) ? gb : this.props.ajaxify_url, nb = null, ob = null, pb = jb ? ba.getSyncedTabURI().toString() : gb;
        if (ib) {
            nb = 'theater';
        } else if (kb) {
            nb = 'async-post';
        } else if (jb || mb)nb = 'dialog';
        var qb = null, rb = this.props.actors[0];
        if (rb)qb = {backgroundImage: 'url(' + rb.profile_picture.uri + ')'};
        var sb = 'notif_flyout_' + this.props.alert_id, tb = null, ub = this.props.substory_count > 0, vb = false;
        this.props.attachments.forEach(function (bc) {
            if (vb)return;
            vb = bc.style_list.indexOf("notification_target") >= 0 || bc.style_list.indexOf("question") >= 0;
            if (vb)return;
        });
        var wb = false, xb = na[this.props.notif_type] && this.props.excludeGroup, yb = this.props.hasEntStory, zb = !jb && !ub && !vb;
        if (this.props.storyInline) {
            var ac = ca.getViewportDimensions().x > ma;
            wb = ac && zb && !xb;
            ob = this._openItemFlyout(gb, sb, ac, ib, jb, ub, vb);
            if (ac && zb) {
                nb = null;
                if (this.state.showLoadingIndicator)tb = w.createElement(ga, {color: "white", background: "light", className: "_5vp8", size: "large"});
            }
        } else if (this.props.storyInsert) {
            wb = yb && zb;
            if (wb) {
                nb = null;
                ob = this._insertIntoFeed(gb);
                if (this.state.showLoadingIndicator)tb = w.createElement(ga, {color: "white", background: "light", className: "_5vp8", size: "large"});
            }
        } else if (this.props.hasPermalinkDialog && !nb && !ub) {
            mb = new ea().setString('uri', pb).getURI().toString();
            nb = 'dialog';
        }
        return (w.createElement(w.DOM.li, {className: ta, 'data-gt': this.props.tracking, onMouseLeave: cb}, w.createElement(w.DOM.div, {className: "anchorContainer"}, w.createElement(w.DOM.a, {id: sb, href: pb, ajaxify: mb, className: "_33e", rel: nb, onClick: ob, onMouseDown: this._markItemRead, onKeyDown: this._onKeyDownItem}, w.createElement(o, null, w.createElement(w.DOM.span, {style: qb, className: "_33h"}, w.createElement(w.DOM.img, {src: "/images/notif_flyout_indicator.png", className: (("flyoutNoIndicator") + (wb ? ' ' + "flyoutShowIndicator" : ''))})), w.createElement(n, {flex: n.FLEX.left}, w.createElement(w.DOM.div, {className: "_4l_v"}, za, bb, w.createElement(o, {className: (("_33f") + (this.state.isBizSite ? ' ' + "_2g48" : ''))}, w.createElement(w.DOM.img, {className: "_10cu", src: this.props.icon.uri}), w.createElement(w.DOM.span, null, w.createElement(z, {shorten: this.props.shortenTimestamp, time: this.props.timestamp.time, text: this.props.timestamp.text, verbose: this.props.timestamp.verbose, className: "_33g"})))), this._renderAttachedItem(hb))), tb), lb, ab)));
    }, _openItemFlyout: function (ra, sa, ta, ua, va, wa, xa) {
        return function (event) {
            if (event.type === 'click' && (event.button !== 0 || event.altKey || event.ctrlKey || event.shiftKey || event.metaKey))return true;
            if (this.state.showLoadingIndicator)return false;
            var ya = na[this.props.notif_type] && this.props.excludeGroup, za = new da().setBool('screen_wide_enough', ta).setBool('is_snowlift', ua).setBool('is_vault_set', va).setBool('is_aggregated_story', wa).setBool('should_fallback', xa).getURI();
            new h().setURI(za).send();
            if (!ta || ua || va || wa || ya || xa)return;
            event.preventDefault();
            g.subscribeOnce('inlineStory/flyoutLoaded', function () {
                this.setState({showLoadingIndicator: false});
            }.bind(this));
            setTimeout(function () {
                this.state.showLoadingIndicator && window.open(l.find(document, '#' + sa).href, '_self');
            }.bind(this), 3000);
            this.setState({showLoadingIndicator: true});
            p.requestStory(this.props.id, sa);
        }.bind(this);
    }, _insertIntoFeed: function (ra) {
        return function (event) {
            if (event.type === 'click' && (event.button !== 0 || event.altKey || event.ctrlKey || event.shiftKey || event.metaKey))return true;
            if (this.state.showLoadingIndicator)return false;
            if (!q._isInFeed()) {
                q.gotoPermalink(ra);
                return;
            }
            var sa = aa(this.props.url).getPath();
            q._insert(ra, sa, this.props.id);
            this.setState({showLoadingIndicator: true});
            event.preventDefault();
            g.subscribeOnce('inlineStory/insertLoaded', function () {
                this.setState({showLoadingIndicator: false});
            }.bind(this));
        }.bind(this);
    }});
    e.exports = qa;
}, null);
__d("NotificationJewelList.react", ["Animation", "Event", "NotificationConstants", "NotificationHiddenState", "NotificationJewelItem.react", "NotificationSeenState", "NotificationStore", "NotificationUpdates", "React", "LegacyScrollableArea.react", "Vector", "createObjectFrom", "cx", "debounce", "getObjectValues", "isEmpty", "mapObject", "merge", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    var z = o.PropTypes, aa = 5, ba = 160, ca = 530, da = 40, ea = 332, fa = 430, ga = i.PayloadSourceType.LIVE_SEND;

    function ha(ja) {
        return !!(ja.application && ja.application.id && ja.negative && ja.negative.show_first_receipt && !ja.application.is_facebook_app);
    }

    var ia = o.createClass({displayName: 'NotificationJewelList', propTypes: {businessID: z.string, excludeGroup: z.bool, hasEverBeenOpened: z.bool, maxHeight: z.number, negativeTracking: z.object, paused: z.bool, staticNotifs: z.object, storyInline: z.bool, storyInsert: z.bool, tracking: z.string, useWideList: z.bool}, getInitialState: function () {
        this._currentlyFetching = false;
        this._pendingNotifs = {};
        this._shouldScroll = false;
        var ja = w(this.props.staticNotifs, function (ka) {
            return ka.seen_state === 'SEEN_AND_READ';
        });
        return {canFetchMore: !this.props.staticNotifs, notifs: this.props.staticNotifs || {}, hiddenState: {}, readState: ja || {}, firstReceiptsHandled: {}};
    }, componentWillMount: function () {
        if (this.props.staticNotifs)return;
        m.setBusinessID(this.props.businessID);
        this._subscriptions = [n.subscribe('notifications-updated', function (ja, ka) {
            if (ka.source == ga && !v(ka.updates)) {
                this._shouldScroll = true;
                if (this.props.paused)this._pendingNotifs = x(this._pendingNotifs, ka.updates);
                return;
            }
            this._fetchAndUpdate(m.getCount());
        }.bind(this)), n.subscribe(['hidden-state-updated', 'read-state-updated'], function (ja, ka) {
            if (ja == 'hidden-state-updated') {
                var la = {};
                Object.keys(ka.updates).forEach(function (na) {
                    la[na] = j.isHidden(na);
                });
                this.setState({hiddenState: x(this.state.hiddenState, la)});
            } else {
                var ma = {};
                Object.keys(ka.updates).forEach(function (na) {
                    ma[na] = l.isRead(na);
                });
                this.setState({readState: x(this.state.readState, ma)});
            }
        }.bind(this))];
    }, componentWillUnmount: function () {
        if (this._subscriptions) {
            while (this._subscriptions.length)this._subscriptions.pop().unsubscribe();
            this._subscriptions = null;
        }
    }, _fetchAndUpdate: function (ja) {
        if (this.props.staticNotifs)return;
        this._currentlyFetching = true;
        m.getNotifications(ja, function (ka) {
            var la = v(this._pendingNotifs) ? ka : this._getNotifsWithCurrentOrder(ka);
            this._currentlyFetching = false;
            this.setState({notifs: la, canFetchMore: m.canFetchMore()});
        }.bind(this));
    }, _getNotifsWithCurrentOrder: function (ja) {
        var ka = Object.keys(this.state.notifs), la = Object.keys(ja).filter(function (na) {
            return !this.state.notifs[na];
        }.bind(this));
        ka = ka.concat(la);
        var ma = {};
        ka.forEach(function (na) {
            if (this._pendingNotifs[na]) {
                var oa = this.state.notifs[na];
                if (oa)ma[na] = oa;
            } else ma[na] = ja[na];
        }.bind(this));
        return ma;
    }, _fetchAndUpdateAll: function () {
        this._pendingNotifs = {};
        this._fetchAndUpdate(m.getCount());
    }, _fetchNextSet: function () {
        if (!this._currentlyFetching) {
            var ja = Object.keys(this.state.notifs).length;
            this._fetchAndUpdate(ja + aa);
        }
    }, _onScroll: function () {
        if (this._currentlyFetching || !this.state.canFetchMore)return;
        if (this._isLoadingIndicatorVisible())this._fetchNextSet();
    }, _isLoadingIndicatorVisible: function () {
        var ja = this.refs.loading;
        if (!ja)return false;
        var ka = this.refs.scrollable.getDOMNode(), la = q.getElementDimensions(ka).y;
        if (la === 0)return false;
        var ma = q.getElementPosition(ka).y + la, na = q.getElementPosition(ja.getDOMNode()).y;
        na -= da;
        return na < ma;
    }, _calculateHeight: function () {
        var ja = q.getViewportDimensions().y;
        return Math.min(this.props.maxHeight || ca, ja - ba);
    }, _onHandleFirstReceipt: function (ja) {
        if (!(ja in this.state.firstReceiptsHandled)) {
            var ka = x(this.state.firstReceiptsHandled, r([ja]));
            this.setState({firstReceiptsHandled: ka});
            this._fetchNextSet();
        }
    }, _renderItems: function () {
        var ja = {}, ka = {};
        u(this.state.notifs).forEach(function (la) {
            var ma = false, na = ha(la);
            if (na) {
                var oa = la.application.id;
                ma = (!this.state.firstReceiptsHandled[oa] && !ka[oa]);
                if (ma)ka[oa] = ma;
            }
            var pa = la.alert_id;
            la.hasPermalinkDialog = la.hasPermalinkDialog && this.props.shouldShowPermalinkDialog;
            ja[pa] = o.createElement(k, Object.assign({visible: !this.state.hiddenState[pa], isRead: this.state.readState[pa], negativeTracking: this.props.negativeTracking, isFirstReceipt: ma, onHandleFirstReceipt: this._onHandleFirstReceipt, shortenTimestamp: this.props.shortenTimestamp, storyInline: this.props.storyInline, storyInsert: this.props.storyInsert, excludeGroup: this.props.excludeGroup}, la));
        }.bind(this));
        return ja;
    }, componentDidMount: function () {
        var ja = this.refs.scrollable.getDOMNode();
        h.listen(window, 'resize', t(function () {
            if (!v(this.state.notifs))new g(ja).to('height', this._calculateHeight() + 'px').duration(100).go();
        }.bind(this)));
    }, componentDidUpdate: function (ja) {
        if (!ja.hasEverBeenOpened && this.props.hasEverBeenOpened) {
            var ka = l.getUnseenIDs().length;
            if (ka > aa) {
                this._fetchAndUpdate(ka);
            } else this._fetchNextSet();
            return;
        }
        if (ja.paused && !this.props.paused) {
            setTimeout(this._fetchAndUpdateAll, 0);
            return;
        }
        if (this.props.paused && !ja.paused) {
            if (this._shouldScroll && this.refs.scrollable)this.refs.scrollable.getArea().scrollToTop(false);
            this._shouldScroll = false;
        }
        if (!this._currentlyFetching && this._isLoadingIndicatorVisible())setTimeout(this._fetchNextSet, 0);
    }, render: function () {
        var ja = this.state.notifs, ka = null, la = null, ma = this.props.useWideList ? fa : ea, na = null;
        if (!v(ja)) {
            ka = o.createElement(o.DOM.ul, {'data-gt': this.props.tracking}, this._renderItems());
            la = this._calculateHeight();
        } else if (!this.state.canFetchMore)ka = o.createElement(o.DOM.div, {className: "_572e"}, "\u041d\u0435\u0442 \u043d\u043e\u0432\u044b\u0445 \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u0439");
        if (this.state.canFetchMore)na = o.createElement(o.DOM.img, {ref: "loading", src: "/images/loaders/indicator_blue_small.gif", className: "_33i"});
        return (o.createElement(o.DOM.div, {className: "_50-t"}, o.createElement(p, {ref: "scrollable", width: ma, height: la, fade: true, persistent: true, onScroll: t(this._onScroll)}, ka, na)));
    }});
    e.exports = ia;
}, null);
__d("NotificationJewelListController", ["NotificationJewelList.react", "React"], function (a, b, c, d, e, f, g, h) {
    function i(j, k) {
        "use strict";
        this.$NotificationJewelListController0 = j;
        this.$NotificationJewelListController1 = k;
        this.$NotificationJewelListController2 = false;
        this.$NotificationJewelListController3 = false;
        this.$NotificationJewelListController4();
    }

    i.prototype.open = function () {
        "use strict";
        this.$NotificationJewelListController2 = true;
        this.$NotificationJewelListController4();
    };
    i.prototype.pause = function () {
        "use strict";
        this.$NotificationJewelListController3 = true;
        this.$NotificationJewelListController4();
    };
    i.prototype.unpause = function () {
        "use strict";
        this.$NotificationJewelListController3 = false;
        this.$NotificationJewelListController4();
    };
    i.prototype.$NotificationJewelListController4 = function () {
        "use strict";
        h.renderComponent(h.createElement(g, {hasEverBeenOpened: this.$NotificationJewelListController2, paused: this.$NotificationJewelListController3, initialNotifs: this.$NotificationJewelListController1.initialNotifs || {}, useWideList: this.$NotificationJewelListController1.useWideList, tracking: this.$NotificationJewelListController1.tracking, negativeTracking: this.$NotificationJewelListController1.negativeTracking, shortenTimestamp: this.$NotificationJewelListController1.shortenTimestamp, storyInline: this.$NotificationJewelListController1.storyInline, storyInsert: this.$NotificationJewelListController1.storyInsert, excludeGroup: this.$NotificationJewelListController1.excludeGroup, shouldShowPermalinkDialog: this.$NotificationJewelListController1.shouldShowPermalinkDialog, businessID: this.$NotificationJewelListController1.businessID, maxHeight: this.$NotificationJewelListController1.maxHeight}), this.$NotificationJewelListController0);
    };
    e.exports = i;
}, null);
__d("PagesMessengerThreadDialogLink.react", ["Link.react", "MessageThreadViewSource", "PagesMessagingConst", "ReactComponentWithPureRenderMixin", "React", "URI"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    'use strict';
    var m = k.createClass({displayName: 'PagesMessengerThreadDialogLink', mixins: [j], propTypes: {threadID: k.PropTypes.string.isRequired, viewer: k.PropTypes.string.isRequired, folder: k.PropTypes.string}, getInitialState: function () {
        return {permalinkURI: '#'};
    }, componentDidMount: function () {
        this._getPermalinkURI(this.props);
    }, componentWillReceiveProps: function (n) {
        if (n.threadID !== this.props.threadID || n.folder !== this.props.folder)this._getPermalinkURI(n);
    }, render: function () {
        return (k.createElement(g, {ajaxify: this.state.permalinkURI, className: this.props.className, href: "#", rel: "dialog", role: "button"}, this.props.children));
    }, _getPermalinkURI: function (n) {
        this.setState(this.getInitialState());
        var o = n.threadID, p = n.viewer, q = n.folder;
        d(['MercuryServerRequests'], function (r) {
            var s = r.getForFBID(p);
            s.getServerThreadID(o, function (t) {
                this.isMounted() && this.setState({permalinkURI: l(i.LOAD_MESSAGE_THREAD_URI).setQueryData({pageid: p, threadid: o, threadElementID: t, folder: q, source: h.REFRESH_HIGHLANDER_JEWEL}).toString()});
            }.bind(this));
        }.bind(this));
    }});
    e.exports = m;
}, null);
__d("HashtagParser", ["URLMatcher", "getHashtagRegex"], function (a, b, c, d, e, f, g, h) {
    var i = 100, j = 30, k = /@\[([0-9]+):([0-9]+):((?:[^\\\]]*(?:\\.)*)*)\]/g;

    function l(da) {
        var ea = y(da), fa = 0, ga = 0;
        return n(da).map(function (ha) {
            while (fa < ea.length) {
                var ia = ea[fa], ja = ia.offset - ga;
                if (ja < ha.offset) {
                    ga += ia.token.length - ia.name.length;
                    fa++;
                } else break;
            }
            return {marker: ha.marker, tag: ha.hashtag, rawOffset: ha.offset + ga, offset: ha.offset};
        });
    }

    function m(da) {
        return o(da, t(da));
    }

    function n(da) {
        var ea = aa(da);
        return o(ea, p(da, ea));
    }

    function o(da, ea) {
        return r(da).slice(0, j).filter(function (fa) {
            var ga = v(fa.offset, fa.hashtag.length, ea);
            return !ga && fa.hashtag.length <= i;
        });
    }

    function p(da, ea) {
        return u(s(da), t(ea));
    }

    var q = h();

    function r(da) {
        var ea = [];
        da.replace(q, function (fa, ga, ha, ia, ja) {
            ea.push({marker: ha, hashtag: ia, offset: ja + ga.length});
        });
        return ea;
    }

    function s(da) {
        return ba(da).map(function (ea) {
            return [ea.offset, ea.name.length];
        });
    }

    function t(da) {
        var ea = [], fa, ga = 0;
        while ((fa = g.permissiveMatch(da))) {
            var ha = da.indexOf(fa);
            ea.push([ga + ha, fa.length]);
            da = da.substring(ha + fa.length);
            ga += ha + fa.length;
        }
        return ea;
    }

    function u(da, ea) {
        var fa = [], ga = 0, ha = 0, ia = 0;
        while (ga < da.length && ha < ea.length)if (da[ga][0] > ea[ha][0]) {
            fa[ia++] = ea[ha++];
        } else fa[ia++] = da[ga++];
        return fa.concat(da.slice(ga), ea.slice(ha));
    }

    function v(da, ea, fa) {
        if (!fa)return false;
        var ga = x(fa, da);
        return w(da, ea, fa, ga) || w(da, ea, fa, ga + 1);
    }

    function w(da, ea, fa, ga) {
        if (!fa[ga])return false;
        var ha = fa[ga][0], ia = fa[ga][1];
        return !((da + ea - 1 < ha) || (da > ha + ia - 1));
    }

    function x(da, ea) {
        var fa = 0, ga = da.length - 1;
        while (fa <= ga) {
            var ha = Math.floor((fa + ga) / 2), ia = da[ha][0];
            if (ia == ea) {
                return ha;
            } else if (ia < ea) {
                fa = ha + 1;
            } else ga = ha - 1;
        }
        return ga;
    }

    function y(da) {
        var ea = [];
        da.replace(k, function (fa, ga, ha, ia, ja) {
            ea.push({token: fa, id: ga, type: ha, name: ia, offset: ja});
        });
        return ea;
    }

    function z(da) {
        return da ? da.replace(/\\([^\\])/g, '$1').replace(/\\\\/g, '\\') : null;
    }

    function aa(da) {
        return da.replace(k, function (ea, fa, ga, ha, ia) {
            return z(ha);
        });
    }

    function ba(da) {
        var ea = 0, fa = 0;
        return y(da).map(function (ga) {
            var ha = da.indexOf(ga.token, fa);
            fa = ha + 1;
            ha -= ea;
            var ia = z(ga.name);
            ea += ga.token.length - ia.length;
            if (ha >= 0)return {id: ga.id, name: ia, type: ga.type, offset: ha};
        });
    }

    var ca = {};
    ca.parse = l;
    ca.parseWithoutMentions = m;
    e.exports = ca;
}, null);
__d("FacebarResultStoreUtils", [], function (a, b, c, d, e, f) {
    var g = {processEntityResult: function (h, i, j, k) {
        var l = {semantic: i.toString(), structure: [
            {type: 'ent:' + h, text: j, uid: i}
        ], type: h, cost: k, cache_id_length: 0};
        l.tuid = JSON.stringify({semantic: l.semantic, structure: l.structure});
        return l;
    }, getRawTextFromStructured: function (h) {
        var i = h.map(function (j) {
            return j.getText();
        });
        return i.join('');
    }, getTextFromResult: function (h) {
        var i = h.structure, j = '';
        i.forEach(function (k) {
            j += k.text;
        });
        return j;
    }};
    e.exports = g;
}, null);
__d("HashtagSearchResultUtils", ["FacebarResultStoreUtils", "HashtagParser", "HashtagSearchResultConfig", "URI", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {getHashtagFromQuery: function (m) {
        var n = h.parse(m);
        if (n && n.length === 1 && n[0].offset === 0)return n[0].tag;
        return false;
    }, makeTypeaheadResult: function (m) {
        var n = "\u0425\u044d\u0448\u0442\u0435\u0433";
        return {category: n, path: j('/hashtag/' + m).toString(), photo: i.image_url, rankType: null, replace_results: i.boost_result ? true : false, scaled_score: 1, score: 0, text: '#' + m, type: 'hashtag_exact', uid: 'hashtag:' + m};
    }, makeFacebarEntry: function (m) {
        var n = "\u0425\u044d\u0448\u0442\u0435\u0433";
        return {category: n, path: j('/hashtag/' + m).toString(), photo: i.image_url, replace_results: i.boost_result ? true : false, text: '#' + m, type: 'hashtag_exact', uid: 'hashtag:' + m};
    }, makeFacebarResult: function (m) {
        var n = g.processEntityResult('hashtag_exact', 'hashtag:' + m, '#' + m, i.hashtag_cost);
        n.parse = {display: [
            {type: 'ent:hashtag_exact', uid: 'hashtag:' + m}
        ], remTokens: [], suffix: ''};
        n.tags = {hashtag: 'hashtag'};
        return n;
    }};
    e.exports = l;
}, null);
__d("RequestsJewel", ["AccessibilityLogger", "Arbiter", "AsyncRequest", "AsyncSignal", "ChannelConstants", "CSS", "DOM", "Event", "FriendBrowserCheckboxController", "LinkController", "Parent", "ScrollableArea", "Vector", "$", "copyProperties", "ge", "shield", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
    function y(z, aa, ba) {
        if (z)this.init(z, aa, ba);
    }

    u(y, {instance: null, getInstance: function () {
        return this.instance;
    }, replaceJewelTitle: function (z, aa) {
        m.setContent(t(z), aa);
    }});
    u(y.prototype, {init: function (z, aa, ba) {
        y.instance = this;
        this.countNew = 0;
        this.jewel = z;
        this.jewelFlyoutCase = z.getRoot();
        this.jewelFlyout = v('fbRequestsFlyout');
        this.newCountSpan = v('newRequestCount');
        this.folder = aa;
        this.doNewMarkRead = ba;
        this.openTimestamp = 0;
        this._requestList = {};
        this._egoData = {};
        this._requestCount = 0;
        this.egoPredictedCount = 0;
        this.pendingCount = 0;
        this.shouldLogEgoClick = false;
        this.shouldClearPredictionAssocOnClick = false;
        var ca = v('requestsMarkReadButton');
        if (ca)n.listen(ca, 'click', w(this._markRead, this));
        this.jewel.subscribe('marked-seen', w(this._markSeenCallback, this));
        this.jewel.subscribe('closed', w(this._closeHandler, this));
        this.jewel.subscribe('updated', this._updateCount.bind(this));
        this.jewel.subscribe('opened', this._openHandler.bind(this));
        p.registerHandler(this._handleLink.bind(this));
        h.subscribe(k.getArbiterType('jewel_requests_add'), this._addRequest.bind(this));
        h.subscribe(k.getArbiterType('jewel_friending_notifs'), this._addNotif.bind(this));
        h.subscribe(k.getArbiterType('jewel_requests_remove_old'), this._removeOldRequest.bind(this));
        h.subscribe(k.getArbiterType('friend_requests_seen'), this._markSeenFromMessage.bind(this));
        h.subscribe('jewel/ego_predicted_count', function (ea, fa) {
            this.egoPredictedCount = fa.ego_predicted_count;
            this.pendingCount = fa.pending_count;
            this.egoUnseenTimestamp = fa.unseen_timestamp;
            this.shouldLogEgoClick = fa.should_log_ego_click;
            this.actionContext = fa.action_context;
        }.bind(this));
        n.listen(this.jewelFlyout, 'submit', function (ea) {
            var fa = q.byClass(ea.getTarget(), 'objectListItem');
            if (fa) {
                l.removeClass(fa, 'jewelItemNew');
                l.addClass(fa, 'jewelItemResponded');
            }
        }.bind(this));
        var da = m.find(v('fbRequestsJewel'), 'a[rel="toggle"]');
        n.listen(da, 'focus', function (ea) {
            g.logFocusIn();
        }.bind(this));
        this.setupScroll();
        return this;
    }, setupScroll: function () {
        var z = m.scry(this.jewelFlyout, '.uiScrollableAreaWrap')[0];
        if (z) {
            this._scrollableWrap = z;
            this._lastLinkPosition = 0;
            this._scrollListener = n.listen(z, 'scroll', this._handleScroll.bind(this), n.Priority._BUBBLE);
        }
    }, fromDom: function () {
        m.scry(this.jewelFlyout, '.jewelItemList li.objectListItem').forEach(function (z) {
            var aa = z.getAttribute('id');
            if (aa) {
                var ba = v(aa + '_status'), ca = this._parseIDToInts(aa), da = ba.getAttribute('data-ego');
                if (ca.requester) {
                    this._requestList[ca.requester] = aa;
                    if (da)this._egoData[da] = da;
                }
                ++this._requestCount;
            }
        }.bind(this));
        this._conditionShowEmptyMessage();
    }, _parseID: function (z) {
        var aa = z.match(/^(\d+)_(\d+)/);
        return (aa) ? {requester: aa[1], type: aa[2]} : undefined;
    }, _parseIDToInts: function (z) {
        var aa = z ? this._parseID(z) : undefined, ba;
        if (aa && aa.requester) {
            ba = parseInt(aa.requester, 10);
            if (isNaN(ba))ba = undefined;
        }
        var ca;
        if (aa && aa.type) {
            ca = parseInt(aa.type, 10);
            if (isNaN(ca))ca = undefined;
        }
        return {requester: ba, type: ca};
    }, _decrementCountNewIfPositive: function () {
        if (this.countNew > 0)this.countNew -= 1;
    }, _handleLink: function (z, event) {
        var aa = q.byClass(z, 'jewelItemNew');
        if (aa && q.byClass(aa, 'fbRequestList') && q.byClass(aa, 'beeperEnabled')) {
            var ba = this._parseID(aa.id);
            ba && this._markSeenCallback(ba.requester, ba.type);
            this._decrementCountNewIfPositive();
            h.inform('jewel/count-updated', {jewel: 'requests', count: this.countNew});
            l.removeClass(aa, 'jewelItemNew');
        }
        return true;
    }, _handleScroll: function () {
        var z = m.scry(this._scrollableWrap, '.uiMorePager');
        if (!z)return;
        var aa = z.pop();
        if (aa) {
            var ba = s.getElementPosition(aa, 'viewport').y;
            if (ba > 0)l.addClass(q.byClass(this._scrollableWrap, 'uiScrollableArea'), 'contentAfter');
            var ca = m.find(aa, 'a');
            if (!ca)return;
            var da = s.getElementPosition(ca, 'viewport').y;
            if (da == this._lastLinkPosition)return;
            var ea = s.getElementPosition(this._scrollableWrap, 'viewport').y + s.getElementDimensions(this._scrollableWrap).y;
            if (da - 300 < ea && da > 0) {
                this._lastLinkPosition = da;
                var fa = ca.getAttribute('ajaxify');
                if (fa) {
                    new i(fa).setRelativeTo(ca).setStatusElement(q.byClass(ca, 'stat_elem')).send();
                } else o.getInstance('jewel').showMore();
            }
        }
    }, _addNotif: function (z, aa) {
        if (!aa || this.jewel.isOpen())return;
        if (aa.obj.notif_type !== 'friend_confirmed')return;
        if (v('fbRequestsJewelLoading')) {
            new i().setURI('/ajax/requests/loader/').send();
            return;
        }
        var ba = {};
        ba.reloadcontent = true;
        new i().setURI('/ajax/requests/loader/').setData(ba).send();
    }, _addRequest: function (z, aa) {
        if (!aa)return;
        var ba = aa.obj.from, ca = aa.obj.suggester, da = this._parseIDToInts(this._requestList[ba]).type, ea = da === 19 && !ca;
        if (!ea && (da || this.jewel.isOpen()))return;
        if (v('fbRequestsJewelLoading')) {
            new i().setURI('/ajax/requests/loader/').send();
        } else {
            var fa = {};
            fa.reloadcontent = true;
            new i().setURI('/ajax/requests/loader/').setData(fa).send();
        }
    }, _removeOldRequest: function (z, aa) {
        if (!aa || this.jewel.isOpen() || v('fbRequestsJewelLoading') !== null)return;
        var ba = this._requestList[aa.obj.from], ca = ba && v(ba);
        if (ca) {
            if (l.hasClass(ca, 'jewelItemNew')) {
                this._decrementCountNewIfPositive();
                h.inform('jewel/count-updated', {jewel: 'requests', count: this.countNew});
            }
            if (!l.hasClass(ca, 'jewelItemResponded')) {
                m.remove(ca);
                delete this._requestList[aa.obj.from];
                --this._requestCount;
                this._conditionShowEmptyMessage();
            }
        }
    }, _markRead: function () {
        this.jewel.markSeen();
        this._clearNewItems();
    }, _markSeenCallback: function (z, aa) {
        h.inform('friend-confirmed-notifs-seen');
        var ba = m.scry(this.jewelFlyout, 'li');
        new j('/ajax/gigaboxx/endpoint/UpdateLastSeenTime.php', {folder: this.folder, first_item: ba[0].id}).send();
        new i().setURI('/ajax/friends/jewel/predicted_count_logging').setData({ego_predicted_count: this.egoPredictedCount, pending_count: this.pendingCount, unseen_timestamp: this.egoUnseenTimestamp, action_context: this.actionContext, should_log_ego_click: this.shouldLogEgoClick}).send();
        var ca = typeof z != 'undefined' && typeof aa != 'undefined' ? {requester: z, type: aa} : {};
        this.doNewMarkRead && new j('/ajax/requests/mark_read/', ca).send();
    }, _markSeenFromMessage: function (z, aa) {
        h.inform('jewel/count-updated', {jewel: 'requests', count: 0});
    }, _clearNewItems: function (z, aa) {
        m.scry(this.jewel.root, 'li.jewelItemNew').forEach(function (ba) {
            l.removeClass(ba, 'jewelItemNew');
        });
    }, _updateCount: function (z, aa) {
        this.countNew = aa.count;
        l.conditionClass(this.jewelFlyout, 'beeperUnread', this.countNew > 0);
        l.conditionClass(this.jewelFlyoutCase, 'showRequests', this.countNew > 0);
        if (this.newCountSpan) {
            var ba = this.countNew == 1 ? x._("{num} \u041d\u041e\u0412\u042b\u0419 \u0417\u0410\u041f\u0420\u041e\u0421", {num: this.countNew}) : x._("{num} \u041d\u041e\u0412\u042b\u0425 \u0417\u0410\u041f\u0420\u041e\u0421\u041e\u0412", {num: this.countNew});
            m.setContent(this.newCountSpan, ba);
        }
    }, _conditionShowEmptyMessage: function () {
        m.scry(this.jewelFlyout, 'li.empty').forEach(function (z) {
            l.conditionShow(z, this._requestCount <= 0);
        }.bind(this));
    }, _openHandler: function () {
        h.inform('requestsJewel/opened');
        var z = m.scry(this.jewelFlyout, '.uiScrollableArea')[0];
        if (v('fbRequestsJewelLoading')) {
            var aa = Date.now();
            if (this.openTimestamp + 5000 < aa) {
                this.openTimestamp = aa;
                new i().setURI('/ajax/requests/loader/').setData({log_impressions: true}).send();
            }
        } else {
            var ba = Object.keys(this._requestList);
            if (ba.length > 0) {
                new i().setURI('/friends/requests/log_impressions').setData({ids: ba.join(','), ref: 'jewel'}).send();
                var ca = Object.keys(this._egoData);
                if (ca.length > 0)new i().setURI('/growth/jewel/impression_logging.php').setData({egodata: ca}).send();
            }
        }
        z && r.poke(z);
    }, _closeHandler: function () {
        h.inform('requestsJewel/closed');
        this._clearNewItems();
    }});
    e.exports = y;
}, null);
__d("JewelX", ["Event", "Arbiter", "ArbiterMixin", "CSS", "DOM", "HTML", "Keys", "TabIsolation", "Toggler", "csx", "copyProperties", "emptyFunction", "reportData", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
    var u = function (v, w) {
        v && w && this.init(v, w);
    };
    q(u, {_instancesByName: {}, _resizeListener: null});
    q(u.prototype, i, {init: function (v, w) {
        this.name = w.name;
        this.root = v;
        this.badge = w.badge;
        this.countNew = 0;
        this.initialCount = 0;
        this.escHandler = null;
        this.togglerInstance = o.createInstance(v).setSticky(false);
        if (w.keepOpenForSnowlift)this.togglerInstance.setPrePageTransitionCallback(this._onPrePageTransition.bind(this));
        u._instancesByName[this.name] = this;
        var x = this.getFlyout(), y = new n(x);
        o.createInstance(x).setSticky(false);
        o.listen('show', this.root, function (z) {
            this._logFirstClick();
            this.hasNew() && this.markSeen();
            this.reset();
            this.inform('opened');
            h.inform('layer_shown', {type: 'Jewel'});
            y.enable();
            this.setupEvents();
        }.bind(this));
        o.listen('hide', this.root, function (z, aa) {
            this.hasNew() && this.markSeen();
            this.reset();
            this.inform('closed');
            h.inform('layer_hidden', {type: 'Jewel'});
            y.disable();
            this.removeEvents();
        }.bind(this));
        h.subscribe('jewel/count-updated', function (z, aa) {
            aa.jewel == this.name && this.update(aa);
        }.bind(this));
        h.subscribe('jewel/count-initial', function (z, aa) {
            aa.jewel == this.name && this.setInitial(aa);
        }.bind(this));
        h.subscribe('jewel/reset', function (z, aa) {
            aa.jewel == this.name && this.reset();
        }.bind(this));
        u._resizeListener = u._resizeListener || (function () {
            var z = null;
            return g.listen(window, 'resize', function () {
                clearTimeout(z);
                z = t(h.inform.bind(h, 'jewel/resize'), 100);
            });
        })();
    }, getRoot: function () {
        return this.root;
    }, getFlyout: function () {
        if (typeof this._flyout === 'undefined')this._flyout = k.find(this.root, ".__tw");
        return this._flyout;
    }, hasNew: function () {
        return j.hasClass(this.root, 'hasNew');
    }, isOpen: function () {
        return j.hasClass(this.root, 'openToggler');
    }, reset: function () {
        j.removeClass(this.root, 'hasNew');
    }, setContent: function (v) {
        var w = k.find(this.root, 'ul.jewelItemList');
        k.setContent(w, l(v));
    }, update: function (v) {
        this.countNew = v.count;
        if (typeof this.countNew === 'number' && this.countNew < 0)this.countNew = 0;
        this.badge.setLegacyContent(this.countNew);
        var w = isNaN(this.countNew) || this.countNew > 0;
        j.conditionClass(this.root, 'hasNew', w);
        this.inform('updated', v);
    }, setInitial: function (v) {
        this.initialCount = v;
    }, setupEvents: function () {
        this.escHandler = g.listen(document.documentElement, 'keydown', function (v) {
            if (v.keyCode === m.ESC && this.isOpen())o.hide(this.root);
        }.bind(this));
    }, removeEvents: function () {
        if (this.escHandler) {
            this.escHandler.remove();
            this.escHandler = null;
        }
    }, markSeen: function () {
        h.inform('jewel/count-updated', {jewel: this.name, count: 0}, h.BEHAVIOR_STATE);
        this.inform('marked-seen');
    }, _onPrePageTransition: function (v, w) {
        if (!this._isSnowliftURI(w.from) && !this._isSnowliftURI(w.to))this.togglerInstance && this.togglerInstance.hide();
    }, _isSnowliftURI: function (v) {
        return v && v.getQueryData().hasOwnProperty('theater');
    }, _logFirstClick: function () {
        this._logFirstClick = r;
        s('jewel_click', {gt: {count: this.countNew, initial: this.initialCount, jewel: this.name}});
    }});
    e.exports = u;
}, null);
__d("MercuryJewelCountControl", ["Arbiter", "DOM", "copyProperties", "shield", "MercuryServerRequests", "MercuryThreadInformer", "MercuryUnseenState"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = b('MercuryServerRequests').get(), l = b('MercuryThreadInformer').get(), m = b('MercuryUnseenState').get(), n, o, p, q = function (s) {
        if (s || p.isOpen())m.markAsSeen();
    }, r = function (s, t) {
        n = s;
        o = h.find(n, '#mercurymessagesCountValue');
        p = t;
        this.render();
        k.subscribe('model-update-completed', function (u, v) {
            q(false);
        });
        l.subscribe('unseen-updated', this.render.bind(this));
        p.subscribe('marked-seen', j(q, this, true));
    };
    i(r.prototype, {render: function () {
        g.inform('jewel/count-updated', {jewel: 'mercurymessages', count: m.getUnseenCount()}, g.BEHAVIOR_STATE);
    }});
    e.exports = r;
}, null);
__d("MercuryPresenceIndicator.react", ["Arbiter", "AvailableListConstants", "MercuryIDs", "PresenceStatus", "ReactComponentWithPureRenderMixin", "React", "SubscriptionsHandler", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    'use strict';
    var p = l.createClass({displayName: 'MercuryPresenceIndicator', mixins: [k], propTypes: {threadID: l.PropTypes.string.isRequired}, componentDidMount: function () {
        this._subscriptions = new m();
        this._subscriptions.addSubscriptions(g.subscribe(h.ON_AVAILABILITY_CHANGED, function () {
            return this.forceUpdate();
        }.bind(this)));
    }, componentWillUnmount: function () {
        this._subscriptions && this._subscriptions.release();
    }, render: function () {
        var q = this._getPresence();
        return (l.createElement(l.DOM.span, {className: this._getClasses(q)}, l.createElement(l.DOM.span, {className: "accessible_elem"}, this._getLabel(q))));
    }, _getPresence: function () {
        if (!i.isCanonical(this.props.threadID)) {
            return null;
        } else {
            var q = i.getUserIDFromThreadID(this.props.threadID);
            return j.get(q);
        }
    }, _getClasses: function (q) {
        return (("presenceIndicator") + (i.isMultichat(this.props.threadID) ? ' ' + "groupThread" : '') + (q == h.ACTIVE ? ' ' + "presenceActive" : '') + (q == h.MOBILE ? ' ' + "presenceMobile" : ''));
    }, _getLabel: function (q) {
        switch (q) {
            case h.ACTIVE:
                return ("\u0414\u0435\u0439\u0441\u0442\u0432\u0443\u044e\u0449\u0430\u044f");
            case h.MOBILE:
                return ("\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439 \u0442\u0435\u043b\u0435\u0444\u043e\u043d");
            default:
                return null;
        }
    }});
    e.exports = p;
}, null);
__d("MercurySeenIndicator.react", ["MercuryDelayedRoger", "MercuryParticipants", "React", "SubscriptionsHandler", "cx"], function (a, b, c, d, e, f, g, h, i, j, k) {
    'use strict';
    var l = i.createClass({displayName: 'MercurySeenIndicator', propTypes: {thread: i.PropTypes.object.isRequired, viewer: i.PropTypes.string.isRequired}, componentDidMount: function () {
        this._subscriptions = new j();
        this._subscriptions.addSubscriptions(g.subscribe('state-changed', function (m, n) {
            n[this.props.thread.thread_id] && this.forceUpdate();
        }.bind(this)));
    }, componentWillUnmount: function () {
        this._subscriptions && this._subscriptions.release();
    }, render: function () {
        var m = this._separateParticipants(), n = m.viewer, o = m.others, p = this._viewerLastToReply(n), q = this._seenByAll(o);
        return (i.createElement(i.DOM.span, {className: (("MercuryRepliedIndicator") + (p ? ' ' + "repliedLast" : '') + (p && q ? ' ' + "seenByAll" : ''))}));
    }, _separateParticipants: function () {
        var m = h.getIDForUser(this.props.viewer), n = this.props.thread.participants.filter(function (o) {
            return o !== m;
        });
        return {viewer: m, others: n};
    }, _viewerLastToReply: function (m) {
        var n = this.props.thread.participants;
        return n.length > 0 && n[0] === m;
    }, _seenByAll: function (m) {
        var n = this.props.thread.thread_id;
        return g.getSeenBy(n).length === m.length;
    }});
    e.exports = l;
}, null);
__d("MercuryThreadPermalink.react", ["HighlanderFinchGating", "Link.react", "PagesMessengerThreadDialogLink.react", "ReactComponentWithPureRenderMixin", "React", "WebMessengerThreadPermalinks"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    'use strict';
    var m = k.createClass({displayName: 'MercuryThreadPermalink', mixins: [j], propTypes: {threadID: k.PropTypes.string.isRequired, viewer: k.PropTypes.string.isRequired, folder: k.PropTypes.string, onClick: k.PropTypes.func}, getInitialState: function () {
        return {permalinkURI: '#'};
    }, componentDidMount: function () {
        this._getPermalinkURI(this.props);
    }, componentWillReceiveProps: function (n) {
        if (n.threadID !== this.props.threadID || n.folder !== this.props.folder)this._getPermalinkURI(n);
    }, render: function () {
        if (g.HIGHLANDER_FINCH_GATING)return (k.createElement(i, {className: this.props.className, threadID: this.props.threadID, viewer: this.props.viewer, folder: this.props.folder}));
        return (k.createElement(h, {className: this.props.className, href: this.state.permalinkURI, onClick: this.props.onClick, role: "button"}, this.props.children));
    }, _getPermalinkURI: function (n) {
        if (g.HIGHLANDER_FINCH_GATING)return;
        this.setState(this.getInitialState());
        l.getThreadURI(n.threadID, function (o) {
            return this.isMounted() && this.setState({permalinkURI: o});
        }.bind(this), n.folder);
    }});
    e.exports = m;
}, null);
__d("MercuryThreadReadToggle.react", ["ReactComponentWithPureRenderMixin", "React", "ReadToggle.react", "fbt", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k) {
    'use strict';
    var l = h.createClass({displayName: 'MercuryThreadReadToggle', mixins: [g], propTypes: {threadID: h.PropTypes.string.isRequired, viewer: h.PropTypes.string.isRequired, unreadCount: h.PropTypes.number.isRequired}, render: function () {
        k(this.props.unreadCount >= 0);
        return (h.createElement(i, {isRead: this.props.unreadCount === 0, onClick: this._handleClick, readLabel: "\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u043a\u0430\u043a \u043d\u0435\u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u043e\u0435", unreadLabel: "\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u043a\u0430\u043a \u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u043e\u0435"}));
    }, _handleClick: function (m) {
        m.preventDefault();
        m.stopPropagation();
        d(['MercuryThreads'], function (n) {
            var o = n.getForFBID(this.props.viewer), p = this.props.unreadCount > 0;
            o.changeThreadReadStatus(this.props.threadID, p);
        }.bind(this));
    }});
    e.exports = l;
}, null);
__d("MercuryThreadSnippet.react", ["MercuryAttachmentSnippet.react", "MercuryParticipants", "React", "TextWithEmoticons.react", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k) {
    'use strict';
    var l = i.createClass({displayName: 'MercuryThreadSnippet', propTypes: {thread: i.PropTypes.object.isRequired, viewer: i.PropTypes.string.isRequired}, getInitialState: function () {
        return {snippet: null};
    }, componentDidMount: function () {
        this._ensureParticipants(this.props);
    }, componentWillReceiveProps: function (m) {
        this._ensureParticipants(m);
    }, componentWillUnmount: function () {
        this._cancelParticipantFetch();
    }, render: function () {
        return (i.createElement(i.DOM.span, null, this._renderAttachmentIndicator(), this._renderSnippet()));
    }, _renderAttachmentIndicator: function () {
        if (!this.props.thread.snippet || !this._hasAttachments())return null;
        return i.createElement(i.DOM.span, {className: "MercuryAttachmentIndicator"});
    }, _renderSnippet: function () {
        var m = this.props.thread, n = h.getIDForUser(this.props.viewer), o = this._renderInnerSnippet(), p = m.participants.length;
        if (m.is_subscribed)p--;
        if (this._hasAttachments() || !m.snippet_sender || n == m.snippet_sender || p <= 1)return o;
        var q = h.getNow(m.snippet_sender);
        if (!q || !q.short_name)return o;
        return (k._("{name}: {conversation_snippet}", [k.param("name", q.short_name), k.param("conversation_snippet", o)]));
    }, _renderInnerSnippet: function () {
        var m = this.props.thread, n = m.snippet;
        if (n && n.startsWith('?OTR'))return ("[\u0437\u0430\u0448\u0438\u0444\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435]");
        if (n)return (i.createElement(j, {renderEmoticons: true, renderEmoji: true, text: n.replace(/\r\n|[\r\n]/g, ' ')}));
        if (this._hasAttachments())return (i.createElement(g, {thread: m, viewer: this.props.viewer}));
        return null;
    }, _hasAttachments: function () {
        var m = this.props.thread;
        return (m.snippet_has_attachment && m.snippet_attachments && m.snippet_attachments.length > 0);
    }, _ensureParticipants: function (m) {
        var n = h.getIDForUser(m.viewer), o = m.thread.snippet_sender;
        this._cancelParticipantFetch();
        if (!h.getNow(n) || !h.getNow(o))h.getMulti([n, o], function (p) {
            return this.forceUpdate();
        }.bind(this));
    }, _cancelParticipantFetch: function () {
        this._participantSub && this._participantSub.remove();
    }});
    e.exports = l;
}, null);
__d("MercuryThreadTimestamp.react", ["ReactComponentWithPureRenderMixin", "React", "formatDate", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    var k = h.createClass({displayName: 'MercuryThreadTimestamp', mixins: [g], propTypes: {time: h.PropTypes.number, title: h.PropTypes.string, text: h.PropTypes.string}, render: function () {
        var l = this.props.time;
        if (!l)return h.createElement(h.DOM.abbr, null);
        return (h.createElement(h.DOM.abbr, {className: j(this.props.className, 'timestamp'), title: this.props.title || (new Date(l)).toLocaleDateString(), 'data-utime': l / 1000}, this.props.text || i(new Date(l), 'g:ia')));
    }});
    e.exports = k;
}, null);
__d("MessagesJewelInlineThumbnail.react", ["MercuryAttachmentType", "React", "cx"], function (a, b, c, d, e, f, g, h, i) {
    'use strict';
    var j = h.createClass({displayName: 'MessagesJewelInlineThumbnail', propTypes: {thread: h.PropTypes.object.isRequired}, render: function () {
        var k = this._getPhotoAttachments();
        if (k.length === 0)return h.createElement(h.DOM.span, null);
        var l = k[0].thumbnail_url;
        if (!l)return h.createElement(h.DOM.span, null);
        var m = h.createElement(h.DOM.span, {className: "_56hv"}, h.createElement(h.DOM.i, {style: {backgroundImage: ("url(" + l + ")")}}));
        if (k.length > 1)m = h.createElement(h.DOM.span, null, h.createElement(h.DOM.span, {className: "_56hy"}), m);
        return m;
    }, _getPhotoAttachments: function () {
        var k = this.props.thread;
        if (!k.snippet_attachments)return [];
        return k.snippet_attachments.filter(function (l) {
            return l.attach_type === g.PHOTO;
        });
    }});
    e.exports = j;
}, null);
__d("MessagesJewelThreadListRow.react", ["ImageBlock.react", "MercuryPresenceIndicator.react", "MercurySeenIndicator.react", "MercuryThreadImage.react", "MercuryThreadPermalink.react", "MercuryThreadReadToggle.react", "MercuryThreadSnippet.react", "MercuryThreadTimestamp.react", "MercuryThreadTitle.react", "MessagesJewelInlineThumbnail.react", "React", "cx", "requireWeak"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    'use strict';
    var t;
    s(['ChatOpenTab'], function (v) {
        t = v;
    });
    var u = q.createClass({displayName: 'MessagesJewelThreadListRow', propTypes: {thread: q.PropTypes.object.isRequired, viewer: q.PropTypes.string.isRequired, folder: q.PropTypes.string}, componentDidMount: function () {
        if (!t)s(['ChatOpenTab'], function (v) {
            this.forceUpdate();
        }.bind(this));
    }, render: function () {
        return (q.createElement(q.DOM.li, {className: ((this.props.thread.unread_count > 0 ? "jewelItemNew" : ''))}, q.createElement(k, {className: "messagesContent", threadID: this.props.thread.thread_id, viewer: this.props.viewer, folder: this.props.folder, onClick: this._handleClick}, q.createElement(g, {spacing: "medium"}, q.createElement(q.DOM.div, {className: "MercuryThreadImage"}, q.createElement(j, {thread: this.props.thread, viewer: this.props.viewer})), q.createElement(q.DOM.div, {className: "content"}, q.createElement(q.DOM.div, {className: "author"}, q.createElement(q.DOM.strong, null, q.createElement(o, {thread: this.props.thread, viewer: this.props.viewer, showUnreadCount: true})), this._renderPresenceIndicator()), q.createElement(q.DOM.div, {className: "snippet preview"}, q.createElement(i, {thread: this.props.thread, viewer: this.props.viewer}), q.createElement(m, {thread: this.props.thread, viewer: this.props.viewer})), q.createElement(q.DOM.div, {className: "time"}, q.createElement(n, {time: this.props.thread.timestamp, title: this.props.thread.timestamp_absolute, text: this.props.thread.timestamp_relative}))), q.createElement(q.DOM.div, null, q.createElement(p, {thread: this.props.thread}), q.createElement(q.DOM.div, {className: "x_div"}, q.createElement(l, {threadID: this.props.thread.thread_id, viewer: this.props.viewer, unreadCount: this.props.thread.unread_count})))))));
    }, _renderPresenceIndicator: function () {
        if (!t || !t.canOpenTab())return null;
        return (q.createElement(h, {threadID: this.props.thread.thread_id}));
    }, _handleClick: function (v) {
        if (t && t.canOpenTab()) {
            v.preventDefault();
            t.openThread(this.props.thread.thread_id, 'jewel');
        }
    }});
    e.exports = u;
}, null);
__d("MercuryJewelThreadlistControl", ["Arbiter", "ArbiterMixin", "requireWeak", "CurrentUser", "CSS", "DOM", "Event", "HighlanderFinchGating", "JSLogger", "MercuryAPIArgsSource", "MercuryConfig", "MercuryIDs", "MercuryThreadlistConstants", "MessagingTag", "MessageThreadViewSource", "PagesMessagingConst", "MercuryPresence", "React", "MercuryJewelTemplates", "Tooltip", "URI", "copyProperties", "csx", "cx", "throttle", "tx", "MercuryServerRequests", "MercuryOrderedThreadlist", "OrionMercuryReceiverNUX", "MercuryThreadInformer", "MercuryThreadMetadataRenderer", "MercuryThreads", "MercuryUnreadState"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa) {
    var ga;
    i(['ChatOpenTab'], function (xa) {
        return ga = xa;
    });
    var ha = b('MercuryServerRequests').get(), ia = b('MercuryOrderedThreadlist').get(), ja = b('OrionMercuryReceiverNUX').module, ka = b('MercuryThreadInformer').get(), la = b('MercuryThreadMetadataRenderer').get(), ma = b('MercuryThreads').get(), na = b('MercuryUnreadState').get(), oa = o.create('mercury_jewel');

    function pa(xa, ya) {
        this._contentArea = l.scry(xa, '.scrollable')[0] || xa;
        this._contentElement = l.find(this._contentArea, '.jewelContent');
        this._loadingElement = l.find(this._contentArea, '.jewelLoading');
        this._loadMoreButton = l.find(this._contentArea, "._8y5");
        this._loadMoreLink = l.find(this._contentArea, "a._8y6");
        this._currentFolder = t.INBOX;
        this._jewelFolderLinks = [];
        this._jewelFolderLinks[t.INBOX] = l.find(ya, "._1sde");
        this._jewelFolderLinks[t.OTHER] = l.find(ya, "._1sdf");
        this._jewelFolderCounts = [];
        this._jewelFolderCounts[t.INBOX] = l.find(ya, "._1sdg");
        this._jewelFolderCounts[t.OTHER] = l.find(ya, "._1sdh");
        ua.bind(this)();
        m.listen(this._jewelFolderLinks[t.INBOX], 'click', ta.bind(this, t.INBOX));
        m.listen(this._jewelFolderLinks[t.OTHER], 'click', ta.bind(this, t.OTHER));
        this._curCount = [];
        this._curCount[t.INBOX] = s.JEWEL_THREAD_COUNT + 1;
        this._curCount[t.OTHER] = s.JEWEL_THREAD_COUNT + 1;
        this._isFolderLoaded = [];
        this._isFolderLoaded[t.INBOX] = false;
        this._isFolderLoaded[t.OTHER] = false;
        this._folderIsLoading = [];
        this._folderIsLoading[t.INBOX] = false;
        this._folderIsLoading[t.OTHER] = false;
        this.initOrionListeners();
        ka.subscribe('threadlist-updated', function (za, ab) {
            if (ab && ab.length > 0)this.render();
        }.bind(this));
        ka.subscribe('unread-updated', ua.bind(this));
        this.render();
        oa.bump('opened_threadlist_' + this._currentFolder);
        m.listen(this._contentArea, 'scroll', ea(qa, 50, this));
        m.listen(this._loadMoreLink, 'click', this.renderMoreThreads.bind(this));
    }

    ba(pa, {EVENT_THREADS_LOADED: 'threads-loaded', EVENT_THREADS_RENDERED: 'threads-rendered'});
    ba(pa.prototype, h);
    ba(pa.prototype, {render: function () {
        k.show(this._loadingElement);
        k.hide(this._loadMoreButton);
        var xa;
        if (!q.MessagesJewelReactGK) {
            l.empty(this._contentElement);
            xa = l.create('div');
            l.appendContent(this._contentElement, xa);
        } else xa = this._contentElement;
        ia.getThreadlist(s.RECENT_THREAD_OFFSET, this._curCount[this._currentFolder], this._currentFolder, this.renderThreads.bind(this, xa), true);
    }, renderThreads: function (xa, ya) {
        this.inform(pa.EVENT_THREADS_LOADED);
        if (!ya.length) {
            l.setContent(this._contentElement, this.renderEmptyThreadlist());
            this.doneRendering();
            return;
        }
        this.renderOrionNUX(xa);
        if (q.MessagesJewelReactGK) {
            this.renderThreadsReact(xa, ya);
            return;
        }
        ya.forEach(function (za) {
            var ab = y[':fb:mercury:jewel:threadlist-row'].build();
            ma.getThreadMeta(za, function (bb) {
                la.renderCoreThreadlist(bb, ab, this.renderSingleThread.bind(this), {show_unread_count: true});
            }.bind(this));
            l.appendContent(xa, ab.getRoot());
        }.bind(this));
        this.doneRendering();
    }, renderThreadsReact: function (xa, ya) {
        d(['MessagesJewelThreadListRow.react'], function (za) {
            if (this._threadMetaSub)ma.unsubscribe(this._threadMetaSub);
            this._threadMetaSub = ma.getMultiThreadMeta(ya, function (ab) {
                this._threadMetaSub = null;
                x.renderComponent(x.createElement(x.DOM.ul, null, ya.map(function (bb) {
                    return x.createElement(za, {key: bb, thread: ab[bb], viewer: j.getID(), folder: this._currentFolder});
                }.bind(this))), xa, this.doneRendering.bind(this));
            }.bind(this));
        }.bind(this));
    }, doneRendering: function () {
        k.hide(this._loadingElement);
        k.conditionShow(this._loadMoreButton, !this._isFolderLoaded[this._currentFolder]);
        this.inform(pa.EVENT_THREADS_RENDERED);
    }, renderSingleThread: function (xa, ya) {
        var za = ya.unread_count > 0;
        if (za)k.addClass(xa.getRoot(), 'jewelItemNew');
        var ab = l.create('div', {className: 'x_div'}), bb = l.create('div', {className: "_5c9q"}), cb = "\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u043a\u0430\u043a \u043d\u0435\u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u043e\u0435";
        if (za)cb = "\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u043a\u0430\u043a \u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u043e\u0435";
        z.set(bb, cb, 'above', 'right');
        m.listen(bb, 'click', function (event) {
            ma.changeThreadReadStatus(ya.thread_id, ya.unread_count > 0);
            return false;
        });
        ab.appendChild(bb);
        xa.getNode('link').appendChild(ab);
        if (ga && ga.canOpenTab()) {
            var db = xa.getNode('presenceIndicator'), eb = ya.is_canonical && ya.canonical_fbid ? ya.canonical_fbid : ya.thread_id;
            wa(eb, db);
        }
        if (n.HIGHLANDER_FINCH_GATING) {
            ha.getServerThreadID(ya.thread_id, function (fb) {
                var gb = aa(v.LOAD_MESSAGE_THREAD_URI).setQueryData({pageid: j.getID(), threadid: ya.thread_id, threadElementID: fb, folder: this._currentFolder, source: u.REFRESH_HIGHLANDER_JEWEL}), hb = xa.getNode('link');
                hb.setAttribute('rel', 'dialog');
                hb.setAttribute('ajaxify', gb.toString());
            }.bind(this));
        } else la.renderWebMessengerLink(ya.thread_id, xa.getNode('link'), null, this._currentFolder);
        m.listen(xa.getRoot(), 'click', function (fb) {
            var gb = ga && ga.canOpenTab() && !fb.isDefaultRequested();
            if (gb && fb.prevent())ga.openThread(ya.thread_id, 'jewel');
        });
    }, renderMoreThreads: function () {
        k.addClass(this._loadMoreButton, 'async_saving');
        this._folderIsLoading[this._currentFolder] = true;
        var xa = this._curCount[this._currentFolder] + s.JEWEL_MORE_COUNT;
        ia.getThreadlist(s.RECENT_THREAD_OFFSET, xa + 1, this._currentFolder, sa.bind(this, xa, this._currentFolder), true, p.JEWEL);
    }, renderEmptyThreadlist: function () {
        return l.create('li', {className: 'empty'}, "\u041d\u0435\u0442 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439");
    }, renderOrionNUX: function (xa) {
        if (ja && !this._orionNUXDisabled) {
            if (this._orionNUXContainer) {
                l.appendContent(xa, this._orionNUXContainer);
                return;
            }
            this._orionNUXContainer = l.create('li');
            l.appendContent(xa, this._orionNUXContainer);
            this._orionNUXComponent = x.renderComponent(x.createElement(ja, {nuxType: "jewel"}), this._orionNUXContainer);
        }
    }, orionNUXCleanup: function () {
        if (this._orionNUXContainer) {
            x.unmountComponentAtNode(this._orionNUXContainer);
            l.remove(this._orionNUXContainer);
        }
        if (this._orionNUXCompleteSub) {
            g.unsubscribe(this._orionNUXCompleteSub);
            this._orionNUXCompleteSub = null;
        }
        if (this._orionNUXMessageReceivedSub) {
            ka.unsubscribe(this._orionNUXMessageReceivedSub);
            this._orionNUXMessageReceivedSub = null;
        }
        if (this._orionNUXMessageUpdatedSub) {
            ka.unsubscribe(this._orionNUXMessageUpdatedSub);
            this._orionNUXMessageUpdatedSub = null;
        }
        this._orionNUXContainer = null;
        this._orionNUXComponent = null;
        this._pendingOrionMessage = null;
        this._orionNUXDisabled = true;
    }, initOrionListeners: function () {
        if (ja) {
            this._orionNUXComponent = null;
            this._orionNUXContainer = null;
            this._pendingOrionMessage = null;
            this._orionNUXDisabled = false;
            this._orionNUXCompleteSub = g.subscribeOnce('OrionMercuryReceiverNUX/nuxComplete', function () {
                return this.orionNUXCleanup();
            }.bind(this));
            this._orionNUXMessageReceivedSub = ka.subscribe('messages-received', function (xa, ya) {
                for (var za in ya)if (ya.hasOwnProperty(za)) {
                    var ab = ya[za];
                    for (var bb = 0; bb < ab.length; bb++)if (ab[bb].attachments.length) {
                        this._pendingOrionMessage = ab[bb];
                        return;
                    }
                }
            }.bind(this));
            this._orionNUXMessageUpdatedSub = ka.subscribe('messages-updated', function (xa, ya) {
                if (!this._pendingOrionMessage)return;
                for (var za in ya)if (ya.hasOwnProperty(za)) {
                    var ab = ya[za];
                    for (var bb in ab)if (ab.hasOwnProperty(bb) && bb === this._pendingOrionMessage.message_id && this._orionNUXComponent && ja.isValidOrionNUXMessage(this._pendingOrionMessage)) {
                        this._orionNUXComponent.setProps(this._pendingOrionMessage.attachments[0].metadata);
                        this.render();
                        return;
                    }
                }
            }.bind(this));
        }
    }});
    function qa() {
        if (!this._isFolderLoaded[this._currentFolder] && !this._folderIsLoading[this._currentFolder] && ra.bind(this)())this.renderMoreThreads();
    }

    function ra() {
        return this._contentArea.scrollTop + this._contentArea.clientHeight >= this._contentArea.scrollHeight - 1;
    }

    function sa(xa, ya, za) {
        this._curCount[ya] = xa;
        if (!this._isFolderLoaded[ya] && za.length < this._curCount[ya] + 1)this._isFolderLoaded[ya] = true;
        this._folderIsLoading[ya] = false;
        k.removeClass(this._loadMoreButton, 'async_saving');
        this.render();
    }

    function ta(xa) {
        if (this._currentFolder != xa) {
            oa.bump('opened_threadlist_' + xa);
            k.addClass(this._jewelFolderLinks[xa], "_1sdd");
            k.removeClass(this._jewelFolderLinks[this._currentFolder], "_1sdd");
            this._currentFolder = xa;
            this.render();
        }
    }

    function ua() {
        va.bind(this)(t.INBOX);
        va.bind(this)(t.OTHER);
    }

    function va(xa) {
        var ya;
        if (na.exceedsMaxCount(xa)) {
            ya = s.MAX_UNREAD_COUNT;
        } else ya = na.getUnreadCount(xa);
        var za = this._jewelFolderCounts[xa];
        if (ya > 0) {
            if (ya == s.MAX_UNREAD_COUNT)ya += '+';
            l.setContent(za, fa._("({unread_count})", {unread_count: ya}));
        } else l.setContent(za, '');
    }

    function wa(xa, ya) {
        var za = r.isValid(xa) && r.isMultichat(xa);
        if (za) {
            k.addClass(ya, 'groupThread');
        } else w.updateOnPresenceChanges(xa, ya);
    }

    e.exports = pa;
}, null);
__d("MercuryJewel", ["MercuryJewelCountControl", "DOM", "MercuryJewelThreadlistControl", "userAction", "MercuryChannelHandler", "MercuryServerRequests"], function (a, b, c, d, e, f, g, h, i, j) {
    b('MercuryChannelHandler').get().turnOn();
    var k = b('MercuryServerRequests').get(), l = false;

    function m(q, r) {
        k.handleUpdate(r);
        var s = q.getRoot(), t = q.getFlyout(), u = new g(s, q), v = h.find(t, '#MercuryJewelThreadList');
        if (q.getRoot() && q.isOpen()) {
            n.call(this, v, t);
        } else q.subscribe('opened', n.bind(this, v, t));
    }

    e.exports = m;
    function n(q, r) {
        this._ua = j('messages').uai('click', 'jewel');
        this._listenForLoad = this._listenForRender = true;
        if (!l) {
            var s = new i(q, r);
            s.subscribe(i.EVENT_THREADS_LOADED, o.bind(this));
            s.subscribe(i.EVENT_THREADS_RENDERED, p.bind(this));
            l = true;
        }
    }

    function o() {
        if (this._listenForLoad) {
            this._ua.add_event('loaded');
            this._listenForLoad = false;
        }
    }

    function p() {
        if (this._listenForRender) {
            this._ua.add_event('rendered');
            this._listenForRender = false;
        }
    }
}, null);
__d("RenderManager", ["copyProperties"], function (a, b, c, d, e, f, g) {
    function h(i) {
        "use strict";
        this._isDirty = false;
        this._obj = i;
    }

    h.prototype.dirty = function () {
        "use strict";
        if (!this._isDirty) {
            this._isDirty = true;
            setTimeout(this._doPaint.bind(this), 0);
        }
    };
    h.prototype._doPaint = function () {
        "use strict";
        this._isDirty = false;
        this._obj.paint();
    };
    e.exports = h;
}, null);
__d("CounterDisplay", ["Arbiter", "CSS", "DOM", "RenderManager", "Run", "$", "copyProperties", "removeFromArray"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    function o(p, q, r, s, t, u) {
        m(this, {_name: p, _valueNode: l(q), _wrapperNode: l(r) || null, _statusClass: t, _rm: new j(this), _arbiterSubscription: null, _count: 0});
        var v = this._valueNode.firstChild;
        if (v) {
            var w = parseInt(v.nodeValue, 10);
            if (!isNaN(w))this._count = w;
        }
        this._statusNode = s ? l(s) : null;
        this._subscribeAll();
        o.instances.push(this);
        if (!u)k.onLeave(this._destroy.bind(this), true);
    }

    m(o, {EVENT_TYPE_ADJUST: 'CounterDisplay/adjust', EVENT_TYPE_UPDATE: 'CounterDisplay/update', instances: [], adjustCount: function (p, q) {
        g.inform(o.EVENT_TYPE_ADJUST + '/' + p, q);
    }, setCount: function (p, q) {
        g.inform(o.EVENT_TYPE_UPDATE + '/' + p, q);
    }});
    m(o.prototype, {_destroy: function () {
        delete this._valueNode;
        delete this._wrapperNode;
        if (this._arbiterSubscription) {
            this._arbiterSubscription.unsubscribe();
            delete this._arbiterSubscription;
        }
        n(o.instances, this);
    }, adjustCount: function (p) {
        this._count = Math.max(0, this._count + p);
        this._rm.dirty();
        return this;
    }, setCount: function (p) {
        this._count = Math.max(0, p);
        this._rm.dirty();
        return this;
    }, paint: function () {
        i.setContent(this._valueNode, this._count);
        this._toggleNodes();
    }, _toggleNodes: function () {
        if (this._wrapperNode)h.conditionClass(this._wrapperNode, 'hidden_elem', this._count <= 0);
        if (this._statusClass && this._statusNode)h.conditionClass(this._statusNode, this._statusClass, this._count > 0);
    }, _subscribeAll: function () {
        var p = [o.EVENT_TYPE_ADJUST + '/' + this._name, o.EVENT_TYPE_UPDATE + '/' + this._name];
        this._arbiterSubscription = g.subscribe(p, this._onInform.bind(this), g.SUBSCRIBE_NEW);
    }, _onInform: function (p, q) {
        q = parseInt(q);
        if (isNaN(q))return;
        if (p.indexOf(o.EVENT_TYPE_ADJUST) != -1) {
            this.adjustCount(q);
        } else if (p.indexOf(o.EVENT_TYPE_UPDATE) != -1) {
            this.setCount(q);
        } else return;
        return;
    }});
    e.exports = o;
}, null);
__d("MessagingEvents", ["Arbiter", "ChannelConstants", "arrayContains", "copyProperties", "isEmpty"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {}, m = new g();

    function n(o) {
        if (!k(l))return;
        for (var p in o)m.inform('count/' + p, o[p]);
    }

    m.subscribe('mark-as-read', function (o, p) {
        (p.tids || p.chat_ids || []).forEach(function (q) {
            q = '' + q;
            if (!(q in l)) {
                l[q] = true;
                var r = function () {
                    m.unsubscribe(s);
                    clearTimeout(t);
                    delete l[q];
                }, s = m.subscribe('read', function (u, v) {
                    if (i((v.tids || []), q) || i((v.chat_ids || []), q))r();
                }), t = setTimeout(r, 60000);
            }
        });
    });
    g.subscribe(h.getArbiterType('messaging'), function (o, p) {
        var q = j({}, p.obj), event = q.event || '';
        delete q.type;
        delete q.event;
        m.inform(event, q);
        if ('unread_counts' in q) {
            var r = q.unread_counts;
            n({unread: r.inbox, other_unseen: r.other});
        }
    });
    g.subscribe(h.getArbiterType('inbox'), function (o, p) {
        var q = j(p.obj);
        delete q.type;
        n(q);
    });
    a.MessagingEvents = e.exports = m;
}, 3);
__d("TitanLeftNav", ["CounterDisplay", "MessagingEvents"], function (a, b, c, d, e, f, g, h) {
    var i = {initialize: function () {
        h.subscribe('count/other_unseen', function (j, k) {
            g.setCount('other_unseen', k);
        });
    }};
    e.exports = i;
}, null);
__d("AccessibilityShortcut", ["AccessibilityLogger", "Event", "Focus", "ge", "onEnclosingPageletDestroy", "warning"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {init: function (n, o) {
        var p = h.listen(n, 'click', function (q) {
            q.preventDefault();
            var r = j(o);
            if (r) {
                i.set(r);
                g.logSRKey();
            } else l(r, 'Failed to set focus on element with ID: %s', o);
        });
        k(n, function () {
            return p.remove();
        });
    }};
    e.exports = m;
}, null);
__d("AccessibleMenu", ["Event", "CSS", "DOM", "Keys", "TabbableElements", "Toggler"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m, n, o;

    function p() {
        var x = i.scry(m, 'a[rel="toggle"]')[0];
        x && x.focus();
        l.getInstance(m).hide();
    }

    function q(x) {
        if (!x)return false;
        h.removeClass(x, 'selected');
        x.setAttribute('aria-selected', 'false');
    }

    function r(x) {
        if (!x)return false;
        h.addClass(x, 'selected');
        x.setAttribute('aria-selected', 'true');
        var y = k.find(x);
        if (y[0])y[0].focus();
    }

    function s(x) {
        var y = i.scry(m, '.selected')[0], z = n.indexOf(y) + x, aa = n[z];
        if (!aa)return false;
        q(y);
        r(aa);
    }

    function t(x) {
        if (!l.isShown() || l.getActive() !== m || h.hasClass(m, w.MENU_HIDDEN))return true;
        var y = g.getKeyCode(x);
        switch (y) {
            case j.TAB:
                s(x.shiftKey ? -1 : 1);
                g.prevent(x);
                break;
            case j.ESC:
                p();
                g.prevent(x);
                break;
            case j.UP:
            case j.DOWN:
                s(y === j.UP ? -1 : 1);
                g.prevent(x);
                break;
        }
    }

    function u(x, y) {
        m = y.getActive();
        n = i.scry(m, '[role="menuitem"]');
        if (!o)o = g.listen(document.documentElement, 'keydown', t);
    }

    function v() {
        if (l.getActive() == m)q(i.scry(m, '.selected')[0]);
    }

    var w = {init: function (x) {
        l.listen('show', x, u);
        l.listen('hide', x, v);
    }, MENU_HIDDEN: 'menu_hidden'};
    e.exports = w;
}, null);
__d("NotificationJewelReminder", ["Arbiter", "ContextualDialog", "ContextualDialogXUITheme", "DOM", "Event", "ImageBlock.react", "LayerFadeOnHide", "LayerFadeOnShow", "NotificationConstants", "NotificationStore", "NotificationUpdates", "React", "SubscriptionsHandler", "Toggler", "$", "cx", "fbt", "intlList"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
    var y = 2;
    z.init = function (aa) {
        "use strict";
        new z(aa);
    };
    function z(aa) {
        "use strict";
        this.$NotificationJewelReminder0 = aa;
        if (p.getCount()) {
            this.$NotificationJewelReminder1();
            return;
        }
        q.subscribeOnce('update-notifications', function (ba, ca) {
            if (ca.payloadsource === o.PayloadSourceType.INITIAL_LOAD)this.$NotificationJewelReminder1();
        }.bind(this));
    }

    z.prototype.$NotificationJewelReminder1 = function () {
        "use strict";
        p.getNotifications(p.getCount(), this.$NotificationJewelReminder3.bind(this));
    };
    z.prototype.$NotificationJewelReminder3 = function (aa) {
        "use strict";
        var ba = t.getInstance(u('fbNotificationsJewel'));
        if (ba && ba.isShown())return;
        var ca = [], da, ea = Object.keys(aa);
        for (var fa = 0; fa < ea.length; fa++) {
            var ga = aa[ea[fa]].actors;
            if (ga.length === 0)continue;
            for (var ha = 0; ha < ga.length; ha++) {
                da = da || ga[ha].profile_picture.uri;
                if (ca.length < y && ga[ha].name && ca.indexOf(ga[ha].name) === -1)ca.push(ga[ha].name);
            }
            if (ca.length === y)break;
        }
        if (ca.length === 0 || !da)return;
        var ia = r.createElement(r.DOM.div, {className: "_5bov"}, r.createElement(l, null, r.createElement(r.DOM.img, {className: "_5bow", src: da}), r.createElement(r.DOM.div, null, this.$NotificationJewelReminder4(ea.length, ca)))), ja = j.create('div');
        r.renderComponent(ia, ja);
        var ka = new h({alignment: 'right', contextSelector: '#fbNotificationsJewel', offsetY: -10, position: 'below', theme: i, width: 210}, ja);
        ka.enableBehaviors([n, m]);
        this.$NotificationJewelReminder5(ka);
    };
    z.prototype.$NotificationJewelReminder4 = function (aa, ba) {
        "use strict";
        ba = ba.map(function (ca) {
            return r.createElement(r.DOM.b, null, ca);
        });
        return (w._({"notifications": "{number} notifications from {notification senders}", "notification": "{number} notification from {notification senders}"}, [w.param("number", aa), w['enum'](aa > 1 ? 'notifications' : 'notification', {notifications: "notifications", notification: "notification"}), w.param("notification senders", x(ba))]));
    };
    z.prototype.$NotificationJewelReminder5 = function (aa) {
        "use strict";
        aa.show();
        this.$NotificationJewelReminder6 = aa;
        var ba = aa.getRoot();
        this.$NotificationJewelReminder7 = setTimeout(this.$NotificationJewelReminder8.bind(this), this.$NotificationJewelReminder0.show_time);
        this.$NotificationJewelReminder9 = new s();
        this.$NotificationJewelReminder9.addSubscriptions(g.subscribe('layer_shown', function (ca, da) {
            if (da && da.type === 'Jewel')this.$NotificationJewelReminder8();
        }.bind(this)), k.listen(ba, 'mouseenter', function () {
            clearTimeout(this.$NotificationJewelReminder7);
        }.bind(this)), k.listen(ba, 'mouseleave', this.$NotificationJewelReminder8.bind(this)), k.listen(ba, 'click', function () {
            this.$NotificationJewelReminder8();
            t.show(u('fbNotificationsJewel'));
        }.bind(this)));
    };
    z.prototype.$NotificationJewelReminder8 = function () {
        "use strict";
        clearTimeout(this.$NotificationJewelReminder7);
        this.$NotificationJewelReminder6.hide();
        this.$NotificationJewelReminder9.release();
    };
    e.exports = z;
}, null);
__d("XPrivacyCheckupSpawnDialogControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/privacy\/checkup\/dialog\/show\/", {source: {type: "Enum"}});
}, null);
__d("PrivacyLiteFlyout", ["Animation", "Arbiter", "ArbiterMixin", "AsyncDialog", "AsyncRequest", "CSS", "DOM", "Ease", "Event", "Parent", "PrivacyConst", "SelectorDeprecated", "Style", "Toggler", "XPrivacyCheckupSpawnDialogControllerURIBuilder", "XPrivacyRemindersDismissControllerURIBuilder", "copyProperties", "csx", "cx", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
    var aa = 'PrivacyLiteFlyout/expandingSection', ba = {}, ca = {};

    function da(la, ma, na) {
        var oa = ma ? 0 : la.offsetHeight;
        s.set(la, 'height', oa + 'px');
        s.set(la, 'overflow', 'hidden');
        l.show(la);
        var pa = ma ? la.scrollHeight : 0, qa = m.getID(la);
        ba[qa] && ba[qa].stop();
        ba[qa] = new g(la).to('height', pa).ondone(function () {
            ba[qa] = null;
            s.set(la, 'height', '');
            s.set(la, 'overflow', '');
            pa || l.hide(la);
            na();
        }).duration(Math.abs(pa - oa) * 1.5).ease(n.sineOut).go();
    }

    function ea(la) {
        return new k().setURI(la).send();
    }

    function fa() {
        return ea('/ajax/privacy/privacy_lite/increment_masher_tip_count');
    }

    function ga() {
        return ea('/ajax/privacy/privacy_lite/dismiss_masher_tip');
    }

    var ha = null, ia = false, ja = false, ka = w({loadBody: function () {
        this._loadBody(false);
    }, loadBodyFromMegaphone: function () {
        this._loadBody(true);
    }, _loadBody: function (la) {
        if (!ia && z('fbPrivacyLiteFlyoutLoading')) {
            ia = true;
            new k('/ajax/privacy/privacy_lite/loader').setData({from_megaphone: la}).send();
        }
    }, renderBody: function (la, ma) {
        var na = z('fbPrivacyLiteFlyoutLoading');
        if (na) {
            m.replace(na, la);
            ka.registerCallback(function () {
                ka.inform('load', null, h.BEHAVIOR_STATE);
            }, ma);
        }
    }, hideCleanup: function (la) {
        h.inform(aa);
        var ma = m.scry(la, "._2va0").forEach(function (na) {
            l.removeClass(na, "_2va0");
        });
    }, registerFlyoutToggler: function (la, ma, na) {
        ha = ma;
        var oa = t.createInstance(la);
        oa.setSticky(false);
        t.listen(['show', 'hide'], ma, function (pa) {
            ka.inform(pa);
            ja = pa === 'show';
            if (!ja) {
                ka.hideCleanup(la);
                oa.hide();
                h.inform('layer_hidden', {type: 'PrivacyShortcutsFlyout'});
            } else {
                h.inform('layer_shown', {type: 'PrivacyShortcutsFlyout'});
                if (na) {
                    na.start(this);
                    na = null;
                }
            }
        }.bind(this));
    }, isFlyoutVisible: function () {
        return ha && t.getActive() === ha;
    }, exists: function () {
        return !!m.scry(document.body, "._59fc")[0];
    }, setFlyoutVisible: function (la) {
        la ? t.show(ha) : t.hide(ha);
    }, showSection: function (la) {
        var ma = ca[la];
        if (!ma)return;
        if (!ma.sublist_container) {
            ka.inform('expanded', la, h.BEHAVIOR_STATE);
            return;
        }
        var na = ma.chevron, oa = ma.sublist_container;
        h.inform(aa, na);
        if (ka.inform('expand', la) !== false) {
            l.removeClass(na, "_9or");
            l.addClass(na, "_9os");
            da(oa, true, function () {
                ka.inform('expanded', la);
            });
        }
    }, hideSection: function (la, ma, na) {
        var oa = ca[la], pa = oa.chevron, qa = oa.sublist_container;
        if (na === pa)return;
        if (ka.inform('collapse', la) !== false) {
            l.addClass(pa, "_9or");
            l.removeClass(pa, "_9os");
            da(qa, false, function () {
                ka.inform('collapsed', la);
            });
        }
    }, toggleSection: function (la) {
        var ma = ca[la].chevron;
        t.getInstance(ma).hide();
        if (l.hasClass(ma, "_9or")) {
            ka.showSection(la);
            new k('/ajax/privacy/privacy_lite/log_section_expand').setData({section: la}).send();
        } else ka.hideSection(la);
    }, registerSection: function (la, ma) {
        ca[la] = ma;
        if (ma.sublist_container) {
            h.subscribe(aa, ka.hideSection.bind(null, la));
            o.listen(ma.section_block, 'click', ka.toggleSection.bind(null, la));
        }
        ka.inform(la);
    }, registerInlineHelpOnAudienceChangeOldSelector: function (la, ma, na, oa) {
        r.subscribe('select', function (pa, qa) {
            if (qa.selector != la)return;
            this._registerInlineHelpOnAudienceChange(ma, na, oa, qa.value);
        }.bind(this));
    }, registerInlineHelpOnAudienceChangeNewSelector: function (la, ma, na, oa) {
        la = la.getInstance();
        la.subscribe('changed', function (pa) {
            this._registerInlineHelpOnAudienceChange(ma, na, oa, la.getSelectedBaseValue());
        }.bind(this));
    }, _registerInlineHelpOnAudienceChange: function (la, ma, na, oa) {
        var pa = m.find(la, "._9o_"), qa = m.find(la, "._2v9_");
        if (na) {
            var ra = m.find(la, "._5n9w"), sa = (oa == q.BaseValue.EVERYONE);
            l.conditionShow(ra, sa);
            l.conditionShow(pa, !sa);
            if (ra && sa) {
                var ta = (new v()).setString('type', 'delta_everyone').setBool('log_plite', true).getURI();
                new k(ta).send();
            }
        } else l.show(pa);
        l.hide(qa);
        if (ma)new k('/ajax/privacy/privacy_lite/kill_intro').send();
    }, registerInlineHelpXOutOnClick: function (la, ma, na) {
        o.listen(la, 'click', function () {
            l.addClass(ma, "_9p0");
        });
    }, registerBlockUnhideOnFocus: function (la, ma) {
        o.listen(la, 'focus', l.show.bind(null, ma));
    }, registerMessageFilterSettingOnClick: function (la, ma) {
        var na = m.find(la, "._fv0");
        o.listen(la, 'click', function () {
            if (na.checked)new k('/ajax/mercury/change_filtering_type.php').setData({filtering_type: ma, source: 'privacy_lite'}).send();
        });
    }, registerMasher: function (la, ma) {
        var na = false;
        h.subscribe(aa, function (oa, pa) {
            var qa = true;
            if (pa)qa = !!m.scry(p.byTag(pa, 'li'), "._571t").length;
            if (na || !qa)return;
            na = !!(fa());
        });
        o.listen(ma, 'click', function () {
            m.remove(la);
            ga();
        });
    }, registerPrivacyCheckupListener: function (la) {
        o.listen(la, 'click', function () {
            this.setFlyoutVisible(false);
            j.send(new k((new u()).setEnum('source', 'plite').getURI()));
        }.bind(this));
    }, displayPrivacyCheckup: function (la) {
        la.show();
    }}, i);
    e.exports = ka;
}, null);
__d("BingScalingCommon", [], function (a, b, c, d, e, f) {
    var g = {integrateWebsuggestions: function (h, i, j, k, l) {
        var m = [], n = i ? m : [], o = [], p = 0, q = 0, r = j;
        k = Math.floor(j * k);
        for (var s = 0; s < h.length; s++) {
            var t = h[s];
            if (t.type === 'websuggestion' && !t.isSeeMore) {
                if ((r > 0 && p < k) || (p > 0 && p < l)) {
                    n.push(t);
                    p++;
                    r--;
                } else if (r > 0)o.push(t);
            } else {
                if (r <= 0 && !i)continue;
                m.push(t);
                q++;
                r--;
            }
        }
        if (r > 0 && o.length > 0)n = n.concat(o.slice(0, r));
        if (!i)return m.concat(n);
        return n;
    }};
    e.exports = g;
}, null);
__d("SearchSingleState", ["fbt"], function (a, b, c, d, e, f, g) {
    function h(j, k, l, m) {
        return {classNames: 'grammar', groupIndex: 0, indexInGroup: j, path: k, text: l, type: 'grammar', uid: m};
    }

    var i = {getSuggestions: function (j, k, l) {
        if (l === 'ent:user') {
            return this.getSuggestionsForUser(j, k);
        } else if (l === 'ent:page') {
            return this.getSuggestionsForPage(j, k);
        } else if (l === 'ent:app') {
            return this.getSuggestionsForApp(j, k);
        } else if (l === 'ent:group')return this.getSuggestionsForGroup(j, k);
    }, getSuggestionsForUser: function (j, k) {
        return [h(0, '/search/' + j + '/photos-of', g._("\u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 {full name}", [g.param("full name", k)]), 'photos_of_user'), h(1, '/search/' + j + '/friends', g._("\u0434\u0440\u0443\u0437\u044c\u044f {full name}", [g.param("full name", k)]), 'friends_of_user'), h(2, '/search/' + j + '/pages-liked', g._("\u043b\u044e\u0431\u0438\u043c\u044b\u0435 \u0421\u0442\u0440\u0430\u043d\u0438\u0446\u044b {full name}", [g.param("full name", k)]), 'pages_liked_user'), h(3, '/search/str/' + k + '/users-named', g._("\u043d\u0430\u0439\u0442\u0438 \u0432\u0441\u0435\u0445 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0441 \u0438\u043c\u0435\u043d\u0435\u043c \"{full name}\"", [g.param("full name", k)]), 'people_named_text')];
    }, getSuggestionsForPage: function (j, k) {
        return [h(0, '/search/' + j + '/photos-of', g._("\u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 {name of page}", [g.param("name of page", k)]), 'photos_of_page'), h(1, '/search/' + j + '/likers', g._("\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438, \u043a\u043e\u0442\u043e\u0440\u044b\u043c \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f {name of page}", [g.param("name of page", k)]), 'page_likers'), h(2, '/search/str/' + k + '/pages-named', g._("\u043d\u0430\u0439\u0442\u0438 \u0432\u0441\u0435 \u0421\u0442\u0440\u0430\u043d\u0438\u0446\u044b \u0441 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435\u043c \"{name of page}\"", [g.param("name of page", k)]), 'pages_named_text')];
    }, getSuggestionsForGroup: function (j, k) {
        return [h(0, '/search/' + j + '/members', g._("\u0423\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0438 {name of group}", [g.param("name of group", k)]), 'members_of_group'), h(1, '/search/' + j + '/photos-in', g._("\u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u0432 {name of groups}", [g.param("name of groups", k)]), 'photos_in_group'), h(2, '/search/' + j + '/creators', g._("\u0421\u043e\u0437\u0434\u0430\u0442\u0435\u043b\u0438 {name of group}", [g.param("name of group", k)]), 'creators_of_group'), h(3, '/search/' + j + '/admins', g._("\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u044b {name of group}", [g.param("name of group", k)]), 'admins_of_group')];
    }, getSuggestionsForApp: function (j, k) {
        return [h(0, '/search/' + j + '/apps-similar-to', g._("\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f, \u043f\u043e\u0445\u043e\u0436\u0438\u0435 \u043d\u0430 {name of app}", [g.param("name of app", k)]), 'similar_apps'), h(1, '/search/' + j + '/app-users', g._("\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438 {name of app}", [g.param("name of app", k)]), 'app_users'), h(2, '/search/str/' + k + '/pages-named', g._("\u043d\u0430\u0439\u0442\u0438 \u0432\u0441\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u0441 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435\u043c \"{name of page}\"", [g.param("name of page", k)]), 'apps_named_text')];
    }};
    e.exports = i;
}, null);
__d("SearchDataSource", ["Event", "Arbiter", "AsyncResponse", "DataSource", "HashtagSearchResultUtils", "copyProperties", "createArrayFrom", "BingScalingCommon", "PageTransitions", "SearchSingleState", "UnicodeCJK", "TokenizeUtil"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = '/typeahead/search/facebar/nullstate/';
    for (var t in j)if (j.hasOwnProperty(t))v[t] = j[t];
    var u = j === null ? null : j.prototype;
    v.prototype = Object.create(u);
    v.prototype.constructor = v;
    v.__superConstructor__ = j;
    function v(w) {
        "use strict";
        this._token = w.token || '';
        this._lazyonload = w.lazyonload === false ? false : true;
        this._extraTypes = w.extraTypes;
        this._buckets = w.buckets;
        this._noMultiFetch = w.noMultiFetch || false;
        this._maxWebSuggToCountFetchMore = w.maxWebSuggToCountFetchMore || 0;
        this._nullStateConfig = w.nullStateConfig || {};
        this._removeUnicodeFlatten = w.removeUnicodeFlatten || false;
        var x = w.maxResults || 8;
        j.call(this, w);
        this._numResults = {min: 3, max: x};
        this.recordingRoute = w.recordingRoute || 'non_banzai';
        this._enabledHashtag = w.enabledHashtag || false;
        this.logBackendQueriesWindow = w.logBackendQueriesWindow || 25;
        this._minWebSugg = w.minWebSugg || 2;
        this._queryToWebSuggState = {};
        this._genTime = w.genTime;
        this.cacheUnicodeMatch.setConfigs({prefix_hangul_conjoining_jamo: true, prefix_kana_drop_trailing_latin: w.cjkDropLatinInCjTokens, prefix_kana_hiragana_to_katakana: w.cjkUiCacheHiraganaToKatakana});
        this.backendUnicodeMatch.setConfigs({prefix_kana_drop_trailing_latin: w.cjkDropLatinInCjTokens});
    }

    v.prototype.tokenizeCache = function (w, x) {
        "use strict";
        if (this._removeUnicodeFlatten) {
            w = this.cacheUnicodeMatch.prefixMatchPrepare(w);
            var y = w.toLowerCase(), z = {value: w, flatValue: y, tokens: r.tokenize(y), isPrefixQuery: y && y[y.length - 1] != ' '};
            if (x)z.sortedTokens = z.tokens.slice().sort(function (aa, ba) {
                return ba.length - aa.length;
            });
            return z;
        } else return u.tokenizeCache.call(this, w, x);
    };
    v.prototype.init = function () {
        "use strict";
        u.init.call(this);
        this._leanPayload = null;
        this._bootstrapRequestsPending = 0;
        this._criticalOnly = true;
        this._updateMaxResults();
        g.listen(window, 'resize', this._updateMaxResults.bind(this));
        if (this._nullStateConfig.singleState) {
            h.subscribe('page_transition', this.handlePageTransition.bind(this));
            h.subscribe('search/updateNullState', this.updateNullState.bind(this));
        }
        if (this._nullStateConfig.recent)h.subscribe('search/refreshRecentSearchesNullstate', this.refreshRecentSearches.bind(this));
    };
    v.prototype.refreshRecentSearches = function () {
        "use strict";
        this.nullStateData = null;
    };
    v.prototype.handlePageTransition = function () {
        "use strict";
        this.nullStateParams = {};
    };
    v.prototype.updateNullState = function (event, w) {
        "use strict";
        this.nullStateParams = w;
        this.fetchNullState();
    };
    v.prototype.fetchNullState = function (w) {
        "use strict";
        if (!this._nullStateConfig.hasNullState)return;
        var x = null;
        if (this.nullStateParams && this.nullStateParams.uid) {
            this.nullStateParams.query = w || '';
            x = this._fetchDataForSingleState();
        } else x = this._fetchDataForNullState();
        if (x)this.inform('respond', {value: this.nullStateParams ? this.nullStateParams.query : '', results: x, isAsync: false, nullState: true});
    };
    v.prototype._fetchDataForSingleState = function () {
        "use strict";
        if (this.nullStateDataWithProfile && this.nullStateParams.uid === this.nullStateDataWithProfile.profileID)return this.nullStateDataWithProfile.data;
        if (this.nullStateParams.type === 'ent:app' || this.nullStateParams.type === 'ent:group' || this.nullStateParams.type === 'ent:page') {
            this.fetch(s, {profile_id: this.nullStateParams.uid, ent_type: this.nullStateParams.type}, {singleState: true});
            this.nullStateDataWithProfile = {profileID: this.nullStateParams.uid};
            return;
        }
        var w = p.getSuggestions(this.nullStateParams.uid, this.nullStateParams.text, this.nullStateParams.type);
        if (!w)return this._fetchDataForNullState();
        this.nullStateDataWithProfile = {data: w, profileID: this.nullStateParams.uid};
        return w;
    };
    v.prototype._shouldRefreshNullState = function () {
        "use strict";
        if (!this._nullStateConfig.recent)return false;
        var w = window.location.href;
        if (!w)return false;
        if (w.indexOf('allactivity') && w.indexOf('log_filter=search'))return true;
        return false;
    };
    v.prototype._fetchDataForNullState = function () {
        "use strict";
        if (this.nullStateData && !this._shouldRefreshNullState())return this.nullStateData;
        this.fetch(s, {value: ""}, {nullState: true, value: ''});
        return null;
    };
    v.prototype.dirty = function () {
        "use strict";
        u.dirty.call(this);
        this._fetchOnUseRequests = [];
    };
    v.prototype.asyncErrorHandler = function (w) {
        "use strict";
        if (window.Dialog && window.Dialog.getCurrent() == null && w.getError() == 1400003)i.verboseErrorHandler(w);
    };
    v.prototype.fetch = function (w, x, y) {
        "use strict";
        y = y || {};
        y.fetch_start = Date.now();
        var z = o.getMostRecentURI().path;
        x = l(x, {path: z});
        u.fetch.call(this, w, x, y);
    };
    v.prototype.fetchHandler = function (w, x) {
        "use strict";
        if (x.nullState) {
            this.nullStateData = w.getPayload().entries;
            this.inform('respond', {value: '', results: w.getPayload().entries, isAsync: true, nullState: true});
            return;
        }
        if (x.singleState) {
            this.nullStateDataWithProfile.data = w.getPayload().entries;
            this.inform('respond', {results: w.getPayload().entries, isAsync: true, value: this.nullStateParams ? this.nullStateParams.query : '', nullState: true});
            return;
        }
        var y = w.getPayload(), z = l({fetch_end: Date.now()}, x), aa = z.value ? h.BEHAVIOR_EVENT : h.BEHAVIOR_PERSISTENT;
        this.inform('beginFetchHandler', {response: w});
        if (x.type == 'lean') {
            this._leanPayload = y;
            this._processLean();
        } else {
            if (y.coeff2_ts)z.coeff2_ts = y.coeff2_ts;
            var ba = {limit: typeof y.webSuggLimit !== 'undefined' ? y.webSuggLimit : 6, showOnTop: typeof y.webSuggOnTop !== 'undefined' ? y.webSuggOnTop : false};
            this._queryToWebSuggState[x.value] = ba;
            u.fetchHandler.call(this, w, x);
            if (x.bootstrap && !w.getRequest().getData().no_cache)z.browserCacheHit = (y.timestamp < this._genTime);
            if (x.bootstrap && !y.no_data && this._bootstrapRequestsPending > 0) {
                x.bootstrap = false;
                --this._bootstrapRequestsPending;
                !this._bootstrapRequestsPending && this._bootstrapPostProcess();
            }
            if (y.no_data || y.stale || y.token !== this._token) {
                var ca = l({}, w.getRequest().getData());
                if (ca.lazy) {
                    delete ca.lazy;
                    ca.token = this._token;
                    this._fetchOnUse(ca, x);
                }
            }
        }
        this.inform('endpointStats', z, aa);
        if (x && !!x.value)this.inform('completeFetch', {response: w, stats: z});
    };
    v.prototype.respond = function (w, x, y) {
        "use strict";
        this.inform('respondValidUids', x);
        this.inform('reorderResults', x);
        var z = this.buildData(x, w);
        z.forEach(function (aa, ba) {
            aa.origIndex = ba;
        });
        this.inform('respond', {value: w, results: z, isAsync: !!y});
        return z;
    };
    v.prototype.buildData = function (w, x) {
        "use strict";
        if (!w || w.length === 0)return [];
        var y = this.getWebSuggState(x), z = y.showOnTop, aa = n.integrateWebsuggestions(w.map(this.getEntry.bind(this)), Boolean(z), this._maxResults, y.limit);
        aa.length = Math.min(aa.length, this._maxResults);
        return aa;
    };
    v.prototype.getWebSuggState = function (w) {
        "use strict";
        while (w) {
            var x = this._queryToWebSuggState[w];
            if (typeof x !== 'undefined')return x;
            w = w.slice(0, w.length - 1);
        }
        return {limit: 0, showOnTop: false};
    };
    v.prototype.fetchLean = function () {
        "use strict";
        this._fetchLean();
    };
    v.prototype._isQueryTooShort = function (w) {
        "use strict";
        return w.length < this._minQueryLength && !q.hasIdeoOrSyll(w);
    };
    v.prototype.shouldFetchMoreResults = function (w) {
        "use strict";
        var x = 0, y = 0;
        w.forEach(function (z) {
            if (z.type !== 'websuggestion' || y++ < this._maxWebSuggToCountFetchMore)x++;
        }.bind(this));
        return x < this._maxResults;
    };
    v.prototype._bootstrapPostProcess = function () {
        "use strict";
        var w = {time: Date.now()};
        this.inform('bootstrapped', w, h.BEHAVIOR_PERSISTENT);
        this._processLean();
    };
    v.prototype._processLean = function () {
        "use strict";
        if (this._leanPayload) {
            var w, x = this._leanPayload.entries;
            for (var y in x) {
                w = this.getEntry(y);
                w && (w.index = x[y]);
            }
            this.setExclusions(this._leanPayload.blocked);
            this._leanPayload = null;
        }
    };
    v.prototype._updateMaxResults = function () {
        "use strict";
        var w = window.innerHeight || document.documentElement.clientHeight;
        this.setMaxResults(Math.max(this._numResults.min, Math.min(this._numResults.max, Math.ceil(2 + ((w - 370) / 56)))));
    };
    v.prototype._bootstrapFetch = function (w, x) {
        "use strict";
        var y = l(x, this.bootstrapData);
        if (this._criticalOnly && this._lazyonload)y.lazy = 1;
        this.fetch(this.bootstrapEndpoint, y, {bootstrap: true, type: w});
        ++this._bootstrapRequestsPending;
    };
    v.prototype._fetchOnUse = function (w, x) {
        "use strict";
        for (var y in this.bootstrapData)!w.hasOwnProperty(y) && (w[y] = this.bootstrapData[y]);
        if (this._criticalOnly) {
            this._fetchOnUseRequests.push({args: w, ctx: x});
        } else this.fetch(this.bootstrapEndpoint, w, x);
    };
    v.prototype._fetchLean = function () {
        "use strict";
        var w = {no_cache: 1};
        w.options = m(w.options);
        w.options.push('lean');
        this._fetchOnUse(w, {type: 'lean'});
    };
    v.prototype.bootstrap = function (w) {
        "use strict";
        if (!w) {
            this._criticalOnly = false;
            this._flushFetchOnUseRequests();
        }
        if (this._bootstrapped)return;
        var x = {filter: ['event'], no_cache: 1};
        this._fetchOnUse(x, {type: 'event'});
        var y = ['app', 'page', 'group', 'friendlist'];
        y = y.concat(this._extraTypes || []);
        if (this._noMultiFetch) {
            y.push('user');
            this._bootstrapFetch('user', {filter: y});
        } else {
            this._bootstrapFetch('other', {filter: y});
            if (this._buckets) {
                for (var z = 0; z < this._buckets.length; ++z) {
                    var aa = {filter: ['user'], buckets: this._buckets[z]};
                    this._bootstrapFetch('user', aa);
                }
            } else this._bootstrapFetch('user', {filter: ['user']});
        }
        this._fetchLean();
        this._bootstrapped = true;
    };
    v.prototype._flushFetchOnUseRequests = function () {
        "use strict";
        var w = this._fetchOnUseRequests.length;
        for (var x = 0; x < w; ++x) {
            var y = this._fetchOnUseRequests[x];
            this.fetch(this.bootstrapEndpoint, y.args, y.ctx);
        }
        if (w > 0)this.inform('extra_bootstrap', {time: Date.now()}, h.BEHAVIOR_PERSISTENT);
        this._fetchOnUseRequests = [];
    };
    v.prototype.onLoad = function (w, x) {
        "use strict";
        this.inform('onload', {time: Date.now()}, h.BEHAVIOR_PERSISTENT);
        if (w)setTimeout(this.bootstrap.bind(this, x), 0);
    };
    v.prototype.mergeUids = function (w, x, y, z) {
        "use strict";
        var aa = this.getDynamicHashtagResult(z);
        if (z && aa && x.indexOf(aa) <= 0)x.unshift(aa);
        var ba = y[0] ? this.getEntry(y[0]) : null, ca = x[0] ? this.getEntry(x[0]) : null, da = (ba && ba.replace_results) ? ba : null;
        da = (!da && ca && ca.replace_results) ? ca : da;
        var ea = u.mergeUids.call(this, w, x, y, z);
        if (da) {
            this.inform('backend_topreplace', {});
            return this.deduplicateByKey([da.uid].concat(ea));
        }
        return ea;
    };
    v.prototype.getTextToIndexFromFields = function (w, x) {
        "use strict";
        var y = [], z = w.tokenVersion === "v2";
        for (var aa = 0; aa < x.length; ++aa) {
            if (z && (x[aa] === "text" || x[aa] === "alias"))continue;
            var ba = w[x[aa]];
            if (ba)y.push(ba.join ? ba.join(' ') : ba);
        }
        return y.join(' ');
    };
    v.prototype.getDynamicHashtagResult = function (w) {
        "use strict";
        if (!w || !this._enabledHashtag)return;
        var x = k.getHashtagFromQuery(w);
        if (!x)return;
        var y = 'hashtag:' + x, z = this.getEntry(y);
        if (!z)this.processEntries([k.makeTypeaheadResult(x)], w);
        return y;
    };
    e.exports = v;
}, null);
__d("SearchTypeaheadRecorder", ["AsyncRequest", "Banzai", "CurrentUser", "Event", "Keys", "BanzaiScuba", "TokenizeUtil", "Vector", "clickRefAction", "copyProperties", "ge", "userAction", "FacebarGlobalOptions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    function t(v) {
        "use strict";
        this.init(v);
        this.initEvents();
    }

    t.prototype.init = function (v) {
        "use strict";
        this.core = v.getCore();
        this.data = v.getData();
        this.view = v.getView();
        this.element = this.core.getElement();
        this.initTime = Date.now();
        this._onloadTime = 0;
        this._extraRecorder = [];
        this.performanceTimings = {};
        var w = q('search_first_focus');
        this.initStartTime = w && w.value;
        this.bootstrapStats = {bootstrapped: 0};
        this.type = "legacy_search";
        this._reset();
    };
    t.prototype._reset = function () {
        "use strict";
        this.stats = {};
        this.avgStats = {};
        this.appendStats = {};
        this._backspacing = false;
        this.backendQueries = [];
        this._topreplace = false;
        this._inflightRequests = {};
        var v = Math.random().toString();
        this.data.setQueryData({sid: v});
        this.view.setSid(v);
        this.recordStat('sid', v);
        this.recordStat('keypressed', 0);
    };
    t.prototype.initEvents = function () {
        "use strict";
        this.core.subscribe('focus', function (event) {
            if (!this.stats.session_start_time) {
                this.recordStat('session_start_time', Date.now());
                var v = new Date(), w = v.getTimezoneOffset(), x = Date.now() - w * 60 * 1000;
                this.recordStat('session_start_time_user_timezone', x);
            }
        }.bind(this));
        this.core.subscribe('blur', function (event) {
            var v = Date.now();
            for (var w in this._inflightRequests) {
                var x = this._inflightRequests[w], y = v - x;
                this.recordAvgStat('search_endpoint_ms_from_js', y);
            }
            this.recordStat('session_end_time', v);
            this.submit();
        }.bind(this));
        this.view.subscribe('select', function (v, w) {
            this.recordSelectInfo(w);
        }.bind(this));
        this.view.subscribe('render', function (v, w) {
            this.recordRender(w);
        }.bind(this));
        this.data.subscribe('activity', function (v, w) {
            this.recordStat('pending_request', w.activity);
        }.bind(this));
        this.data.subscribe('respondValidUids', function (v, w) {
            this.validUids = w.slice(0);
        }.bind(this));
        this.data.subscribe('beforeQuery', function (v, w) {
            if (!w.value) {
                this.query = '';
                this.results = [];
                return;
            }
            if (!this.stats.first_query_time)this.recordStat('first_query_time', Date.now());
            this.query = w.value;
            this.recordCountStat('num_queries');
        }.bind(this));
        this.data.subscribe('queryEndpoint', function (v, w) {
            this.recordCountStat('num_search_ajax_requests');
            this.recordAvgStat('endpoint_query_length', w.value.length);
            this._inflightRequests[w.value] = Date.now();
        }.bind(this));
        this.data.subscribe('onload', function (v, w) {
            this._onloadTime = w.time;
        }.bind(this));
        this.data.subscribe('bootstrapped', function (v, w) {
            this.bootstrapStats.endTime = w.time;
            this.bootstrapStats.bootstrapped = 1;
        }.bind(this));
        this.core.subscribe('recordFunction', function (v, w) {
            this._extraRecorder.push(w);
        }.bind(this));
        this.data.subscribe('endpointStats', function (v, w) {
            var x = w.fetch_end - w.fetch_start;
            if (w.value) {
                this.recordAvgStat('search_endpoint_ms_from_js', x);
            } else this.bootstrapStats[w.type] = x;
            if (w.coeff2_ts)this.bootstrapStats.coeff2_ts = w.coeff2_ts;
            if (typeof w.browserCacheHit != 'undefined')this.recordCountStat(w.browserCacheHit ? 'bootstrap_cachehits' : 'bootstrap_cachemisses');
            if (this._inflightRequests[w.value])delete this._inflightRequests[w.value];
        }.bind(this));
        this.data.subscribe('query', function (v, w) {
            this.recordAvgStat('num_results_from_cache', w.results.length);
        }.bind(this));
        this.data.subscribe('backend_topreplace', function (v, w) {
            if (false === this._topreplace) {
                this.recordStat("backend_topreplace", 1);
                this._topreplace = true;
            }
        }.bind(this));
        this.data.subscribe('completeFetch', function (v, w) {
            if (this.core.scubaInfo) {
                var x = w.response, y = {recv: w.stats.fetch_end - w.stats.fetch_start, render: Date.now() - w.stats.fetch_start, payload_size: JSON.stringify(x).length};
                if (!x.payload.entities)x.payload.entities = this.buildResults();
                this.logToScuba(x, y, this.core.scubaInfo, this.query, this.type);
            }
        }.bind(this));
        j.listen(this.element, 'keydown', function (event) {
            this.recordStat('keypressed', 1);
            this.recordCountStat('count_keys_pressed');
            if (j.getKeyCode(event) == k.BACKSPACE) {
                if (!this._backspacing && this.query) {
                    this._backspacing = true;
                    this.recordAppendStat('before_backspace_queries', this.query);
                }
            } else this._backspacing = false;
        }.bind(this));
        this.data.subscribe('beforeFetch', function (v, w) {
            var x = w.request.data.value;
            if (!x)return;
            this.backendQueries.push(x);
        }.bind(this));
    };
    t.prototype.recordStat = function (v, w) {
        "use strict";
        this.stats[v] = w;
    };
    t.prototype.recordCountStat = function (v) {
        "use strict";
        var w = this.stats[v];
        this.stats[v] = w ? w + 1 : 1;
    };
    t.prototype.recordAvgStat = function (v, w) {
        "use strict";
        if (this.avgStats[v]) {
            this.avgStats[v][0] += w;
            ++this.avgStats[v][1];
        } else this.avgStats[v] = [w, 1];
    };
    t.prototype.recordAppendStat = function (v, w) {
        "use strict";
        if (!this.appendStats.hasOwnProperty(v))this.appendStats[v] = [];
        this.appendStats[v].push(w);
    };
    t.prototype.recordRender = function (v) {
        "use strict";
        this.results = v.filter(function (x) {
            return (x.uid != 'search' && x.type != 'disabled_result' && x.type != 'header');
        }).map(function (x) {
            return p(null, x);
        });
        var w = n.getViewportDimensions();
        this.recordStat('window_size_width', w.x);
        this.recordStat('window_size_height', w.y);
        if (this.results.length > 0 && !this.stats.first_result_time)this.recordStat('first_result_time', Date.now());
    };
    t.prototype.recordSelectInfo = function (v) {
        "use strict";
        var w = v.selected, x = v.index;
        if (w.groupIndex !== undefined)x = v.index - w.groupIndex - 1;
        var y = {href: w.path}, z = w.dataGT ? {gt: JSON.parse(w.dataGT)} : {};
        o('click', y, null, null, z);
        r('search').uai('click');
        if (w.uid == 'search') {
            this.recordStat('selected_search', 1);
        } else if (w.uid == 'invite') {
            this.recordStat('selected_invite', 1);
        } else {
            var aa = w.log_type || w.rankType || w.render_type || w.type, ba = (aa == 'friend' ? 'user' : aa);
            this.recordStat('selected_' + ba, 1);
            this.recordStat('selected_position', x);
            this.recordStat('selected_type', aa);
            this.recordStat('selected_name_length', w.text.length);
            this.recordStat('selected_id', w.uid);
            this.recordStat('selected_degree', w.bootstrapped ? 1 : 2);
            this.recordStat('selected_recent_search', w.recent_search);
            var ca = m.parse(this.data.getTextToIndex(w)).tokens, da = u(ca, this.query);
            if (da)this.recordStat('matched_terms', da);
        }
        var ea = {};
        this._extraRecorder.forEach(function (fa) {
            fa(v, this.results, ea);
        }.bind(this));
        this.recordStat('extra_select_info', JSON.stringify(ea));
        if (w.type === 'websuggestion') {
            this.recordStat('selected_memcached_websuggestion', w.fromMemcache);
            this.recordStat('selected_websuggestion_source', w.websuggestion_source);
        }
        this.recordStat('selected_with_mouse', v.clicked ? 1 : 0);
    };
    t.prototype._dataToSubmit = function () {
        "use strict";
        this.recordStat('candidate_results', this.buildResults());
        this.recordStat('query', this.query);
        this.recordStat('init_time', this.initTime);
        if (this.initStartTime) {
            this.recordStat('init_start_time', this.initStartTime);
            this.recordStat('onload_time', this._onloadTime);
            this.initStartTime = 0;
        }
        this.recordStat('bootstrapped', this.bootstrapStats.bootstrapped);
        if (this.bootstrapStats.endTime) {
            this.recordStat('bootstrapped_time', this.bootstrapStats.endTime);
            this.recordStat('user_bootstrap_ms', this.bootstrapStats.user);
            this.recordStat('other_bootstrap_ms', this.bootstrapStats.other);
            this.bootstrapStats.endTime = 0;
        }
        this.recordStat('coeff2_ts', this.bootstrapStats.coeff2_ts);
        this.recordStat('max_results', this.data._maxResults);
        if (this.backendQueries.length > 0) {
            if (this.backendQueries.length > this.data.logBackendQueriesWindow)this.backendQueries = this.backendQueries.slice(this.backendQueries.length - this.data.logBackendQueriesWindow);
            this.recordStat('backend_queries', this.backendQueries);
        }
        if (s.taSessionLoggingSample) {
            var v = [];
            this.results.forEach(function (aa) {
                v.push([aa.text || '', aa.category || '', aa.subtext || '']);
            });
            this.recordStat('raw_suggestions_text', v);
        }
        var w = this.stats;
        for (var x in this.avgStats) {
            var y = this.avgStats[x];
            w[x] = y[0] / y[1];
        }
        for (var z in this.appendStats)w[z] = JSON.stringify(this.appendStats[z]);
        return w;
    };
    t.prototype.buildResults = function () {
        "use strict";
        var v = (this.results || []).map(function (w, x) {
            var y = m.parse(this.data.getTextToIndex(w)).tokens, z = w.rankType || w.render_type || w.type, aa = w.bootstrapped ? 1 : 0, ba = w.s_token || '', ca = (typeof w.index == 'undefined') ? 100 : w.index, da = u(y, this.query) || this.query, ea = w.index_rank, fa = w.match_type, ga = w.l_type, ha = w.vertical_type, ia = w.prefix_match, ja = w.prefix_length, ka = w.text, la = w.category, ma = w.subtext;
            if (typeof w.groupIndex == 'number')return [w.groupIndex, w.indexInGroup, w.uid, z, aa, ba, da, ea, fa, ia, ja, w.origIndex, ga, ha, ka, la, ma, ca];
            return [0, x, w.uid, z, aa, ba, da, ea, fa, ia, ja, w.origIndex, ga, ha, ka, la, ma, ca];
        }.bind(this));
        return JSON.stringify(v);
    };
    t.prototype.submit = function () {
        "use strict";
        var v = this._dataToSubmit();
        switch (this.data.recordingRoute) {
            case 'double_recording':
                if (Math.random() > .5) {
                    v.recorded_first = 'legacy';
                    setTimeout(this.submitThroughAsyncRequest.bind(this, v), 0);
                    h.post(this._banzaiRoute, v, {delay: 0, retry: true});
                } else {
                    v.recorded_first = 'banzai';
                    h.post(this._banzaiRoute, v, {delay: 0, retry: true});
                    setTimeout(this.submitThroughAsyncRequest.bind(this, v), 0);
                }
                break;
            case 'random_recording':
                if (Math.random() > .5) {
                    this.submitThroughAsyncRequest(v);
                } else h.post(this._banzaiRoute, v, {delay: 0, retry: true});
                break;
            case 'banzai_basic':
                h.post(this._banzaiRoute, v);
                break;
            case 'banzai_vital':
                h.post(this._banzaiRoute, v, {delay: 0, retry: true});
                break;
            default:
                this.submitThroughAsyncRequest(v);
        }
        this._reset();
    };
    t.prototype.addLatencyToSample = function (v, w, x) {
        "use strict";
        v.addInteger(x + 'query_start', w.queryStart);
        v.addInteger(x + 'query_end', w.queryEnd);
        v.addInteger(x + 'keypress_query_end', w.keyPressToQueryEnd);
        v.addInteger(x + 'render', w.render);
        v.addInteger(x + 'keypress_render', w.keyPressToRender);
    };
    t.prototype.logToScuba = function (v, w, x, y, z) {
        "use strict";
        var aa = new l('search_facebar_js', null, {addBrowserFields: true, addPredictedGeographyFields: true, addUser: true, addSearchVersion: true, addGatekeepers: {facebarGKs: true}});
        aa.addInteger('sample_rate', x.sample_rate);
        aa.addNormal('site', x.site);
        aa.addDenorm('query', y);
        var ba = v.payload;
        ba.entities && aa.addInteger('num_entities', ba.entities.length);
        Object.keys(this.performanceTimings).forEach(function (ca) {
            aa.addInteger(ca, this.performanceTimings[ca]);
        }.bind(this), this);
        if (ba.results || ba.entries)aa.addInteger('num_results', (ba.results || ba.entries).length);
        if (ba.gzipped_payload_size !== undefined)aa.addInteger('gzipped_payload_size', ba.gzipped_payload_size);
        if (w.recv && w.render > w.recv) {
            aa.addInteger('time_render', w.render - w.recv);
            aa.addInteger('time_js_async', w.recv);
        }
        if (w.payload_size)aa.addInteger('payload_size', w.payload_size);
        aa.addInteger('query_id', v.queryId);
        aa.addDenorm('user_id', i.getID());
        aa.addDenorm('session_id', this.stats.sid);
        aa.addNormal('typeahead_type', z);
        if (w.remoteQueryLatencies) {
            this.addLatencyToSample(aa, w.remoteQueryLatencies, 'remote_');
            aa.addInteger('remote_keypress_query_dispatch', w.remoteQueryLatencies.keyPressToQueryDispatch);
            aa.addInteger('remote_keypress_query_start', w.remoteQueryLatencies.keyPressToQueryStart);
            aa.addNormal('inflight_requests', w.remoteQueryLatencies.inflightRequests);
            aa.addInteger('inflight_requests', w.remoteQueryLatencies.inflightRequests);
            aa.addNormal('waiting_queries', w.remoteQueryLatencies.waitingQueries);
            aa.addInteger('waiting_queries', w.remoteQueryLatencies.waitingQueries);
        }
        if (w.cacheQueryLatencies)this.addLatencyToSample(aa, w.cacheQueryLatencies, 'cache_');
        aa.post();
    };
    t.prototype.submitThroughAsyncRequest = function (v) {
        "use strict";
        if (Object.keys(v).length > 0)new g().setURI(this._endPoint).setMethod('POST').setData({stats: v}).setOption('handleErrorAfterUnload', true).setErrorHandler(function (w) {
            v.retry = true;
            new g().setURI(this._endPoint).setMethod('POST').setData({stats: v}).setOption('asynchronous', false).send();
        }.bind(this)).send();
    };
    var u = function (v, w) {
        if (!v || !w)return;
        var x = m.parse(w);
        if (x.flatValue[x.flatValue.length - 1] === ' ')return x.flatValue;
        var y = x.tokens[x.tokens.length - 1], z = {};
        v.forEach(function (ea) {
            z[ea] = (z[ea] || 0) + 1;
        });
        var aa = {}, ba = x.tokens.slice(0, x.tokens.length - 1);
        ba.forEach(function (ea) {
            aa[ea] = (aa[ea] || 0) + 1;
        });
        for (var ca = 0; ca < v.length; ++ca) {
            var da = v[ca];
            if (da.indexOf(y) === 0 && (z[da] - (aa[da] || 0) > 0)) {
                ba.push(da);
                return ba.join(' ');
            }
        }
        return undefined;
    };
    p(t.prototype, {_endPoint: '/ajax/typeahead/record_metrics.php', _banzaiRoute: 'search'});
    e.exports = t;
}, null);