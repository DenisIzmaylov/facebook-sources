/*!CK:4040419704!*//*1412114161,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["fJMI3"]);
}

__d("BroadcastRequestParam", [], function (a, b, c, d, e, f) {
    e.exports = {ANSWER_IDS: "answer_ids", BROADCAST_REQUEST_ID: "broadcast_request_id", CHECKED_IDS: "checked_ids", COMMENT_TOKEN: "comment_token", COMPOSER_TOKEN_IDS: "composer_token_ids", DESCRIPTION_DOM_ID: "description_dom_id", DOM_ID: "dom_id", ENTITY_TITLE: "entity_title", ENTITY_TOKEN: "entity_token", ERROR_CODE: "error_code", HAS_VIEWER_VOTED: "has_viewer_voted", QUERIED_RECIPIENTS: "queried_recipients", QUERY: "q", RECIPIENT_IDS: "recipient_ids", SEND_REQUEST: "send_request", SOURCE: "source", SOURCE_OBJ_ID: "source_obj_id", SUGGESTION_CARD_ID: "suggestion_card_id", SUGGESTION_ID: "suggestion_id", SUGGESTION_IDS: "add_suggestions_ids", SUGGESTION_ROW_ID: "suggestion_row_id", TARGET_ID: "target_id", VOTE_ACTION: "vote_action", EXISTING_IDS: "existing_ids", VALUE: "value", BROADCAST_REQUEST_TYPE: "broadcast_request_type", COMPOSER_TEXT: "composer_text"};
}, null);
__d("UFITranslationConstants", [], function (a, b, c, d, e, f) {
    e.exports = {BING_PAGE_URL: "http:\/\/bing.com\/translator", BING_TRANSLATOR_APP: "bing", FB_TRANSLATOR_APP: "fb"};
}, null);
__d("ActorSelector.react", ["ContextualLayerBlind", "CurrentUser", "DOMScroll", "Event", "Image.react", "LayerFadeOnHide", "LayerFadeOnShow", "PageTransitions", "React", "ReactLayeredComponentMixin", "ShortProfiles", "Tooltip", "XUIContextualDialog.react", "XUIDialogBody.react", "XUIDialogFooter.react", "XUIDialogOkayButton.react", "XUISelector.react", "XUISpinner.react", "cx", "ix", "fbt", "tidyEvent"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba) {
    var ca = w.Option, da = 32, ea = 200, fa = 195, ga = 500, ha = 175, ia = 16, ja = o.createClass({displayName: 'ActorSelector', mixins: [p], propTypes: {actorIDs: o.PropTypes.array.isRequired, covered: o.PropTypes.bool, loading: o.PropTypes.bool, nuxBody: o.PropTypes.renderable, nuxEnabledCovered: o.PropTypes.bool, nuxEnabledUncovered: o.PropTypes.bool, nuxHoverContext: o.PropTypes.object, onChange: o.PropTypes.func.isRequired, onCompleteNux: o.PropTypes.func, selectedActorID: o.PropTypes.string, settingsURI: o.PropTypes.string, showName: o.PropTypes.bool, suppressed: o.PropTypes.bool, tooltipConstructor: o.PropTypes.func, tooltipConstructorCovered: o.PropTypes.func}, getDefaultProps: function () {
        return {suppressed: true};
    }, getInitialState: function () {
        return {actorData: {}, clicked: false, nuxShown: false};
    }, componentWillMount: function () {
        this._fetchActorData();
    }, render: function () {
        if (!this.props.selectedActorID || !this.state.actorData[this.props.selectedActorID])return o.createElement(o.DOM.div, null);
        var ka = this._isCovered(), la = this.props.actorIDs.map(function (ma) {
            var na = this.state.actorData[ma];
            if (!na)return;
            var oa = o.createElement(k, {className: "_6vg", height: ia, src: ka && h.getID() === ma ? z('images/pages/voice/flag.png') : na.thumbSrc, width: ia});
            return (o.createElement(ca, {icon: oa, value: ma}, na.name));
        }.bind(this));
        if (la.length < 1 || (la.length === 1 && this.state.actorData[h.getID()]))return o.createElement(o.DOM.div, null);
        return (o.createElement(o.DOM.span, {className: "_6vh"}, o.createElement(x, {className: ((!this.props.loading ? "hidden_elem" : '') + (!this.props.suppressed ? ' ' + "_3-8_" : ''))}), o.createElement(w, {haschevron: !ka, className: "_6vi", disabled: this.props.loading, maxheight: fa, maxwidth: ka ? ia : this.props.showName ? ea : da, onChange: this.props.onChange, onClick: this._onClickSelector, ref: "selector", suppressed: this.props.suppressed, value: this.props.selectedActorID}, la)));
    }, renderLayers: function () {
        if (!this.refs.selector)return null;
        var ka = null;
        if (this.props.settingsURI)ka = o.createElement(o.DOM.a, {onClick: this._onClickSettings, style: {verticalAlign: 'middle'}}, "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u044f \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438");
        if (this.state.nuxShown)i.ensureVisible(this.refs.selector.getDOMNode(), null, ha);
        return {nux: o.createElement(s, {alignment: "right", behaviors: {ContextualLayerBlind: g, LayerFadeOnHide: l, LayerFadeOnShow: m}, hasActionableContext: true, contextRef: "selector", position: "below", shown: this.state.nuxShown, width: s.WIDTH.NORMAL}, o.createElement(t, null, this.props.nuxBody), o.createElement(u, {leftContent: ka}, o.createElement(v, {action: "button", use: "confirm", onClick: this._onCompleteNux})))};
    }, componentDidMount: function () {
        this._setTooltip();
        if (this._canShowNux())if (this.props.nuxHoverContext) {
            var ka = ba(j.listen(this.props.nuxHoverContext, 'mouseenter', function () {
                var la = setTimeout(function () {
                    ka.remove();
                    if (this._canShowNux())this.setState({nuxShown: true});
                }.bind(this), ga), ma = ba(j.listen(this.props.nuxHoverContext, 'mouseleave', function () {
                    clearTimeout(la);
                    ma.remove();
                }));
            }.bind(this)));
        } else this.setState({nuxShown: true});
    }, componentDidUpdate: function (ka) {
        if (this.props.actorIDs.toString() !== ka.actorIDs.toString())this._fetchActorData();
        this._setTooltip();
    }, _canShowNux: function () {
        return (this.props.nuxEnabledCovered && this._isCovered()) || (this.props.nuxEnabledUncovered && !this._isCovered());
    }, _fetchActorData: function () {
        q.getMulti(this.props.actorIDs, function (ka) {
            this.setState({actorData: ka});
        }.bind(this));
    }, _isCovered: function () {
        return (this.props.coverEnabled && !this.state.clicked && h.getID() === this.props.selectedActorID);
    }, _onClickSelector: function () {
        this.setState({clicked: true});
        if (this.state.nuxShown)this._onCompleteNux();
    }, _onClickSettings: function () {
        this._onCompleteNux();
        n.go(this.props.settingsURI);
    }, _onCompleteNux: function () {
        this.setState({nuxShown: false});
        if (this.props.onCompleteNux)this.props.onCompleteNux({isCovered: this._isCovered()});
    }, _setTooltip: function () {
        if (!this.refs.selector)return;
        var ka = this.state.actorData[this.props.selectedActorID];
        if (!ka)return;
        var la = this._isCovered() && this.props.tooltipConstructorCovered ? this.props.tooltipConstructorCovered : this.props.tooltipConstructor;
        if (!la)return;
        r.set(this.refs.selector.getDOMNode(), la(ka.name), 'above', 'right');
    }});
    e.exports = ja;
}, null);
__d("ClickPointIdentifiersDEPRECATED", [], function (a, b, c, d, e, f) {
    var g = {types: {TIMELINE_SEE_LIKERS: 'timeline:seelikes'}, getUserActionID: function (h) {
        return '{"ua_id":"' + h + '"}';
    }};
    e.exports = g;
}, null);
__d("UFIBlingItem.react", ["React", "NumberFormat", "cx", "fbt", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = g.createClass({displayName: 'UFIBlingItem', propTypes: {contextArgs: g.PropTypes.object.isRequired, count: g.PropTypes.number.isRequired, allowText: g.PropTypes.bool, className: g.PropTypes.string, iconClassName: g.PropTypes.string, itemKey: g.PropTypes.string}, render: function () {
        var m = k(this.props.className, this.props.iconClassName, "UFIBlingBoxSprite"), n = h.formatIntegerWithDelimiter(this.props.count, this.props.contextArgs.numberdelimiter || ','), o = '';
        if (this.props.allowText)switch (this.props.itemKey) {
            case 'reshare':
                if (this.props.contextArgs.reshareedu)o = this.props.count === 1 ? ' Share' : ' Shares';
                break;
        }
        return (g.createElement(g.DOM.span, null, g.createElement(g.DOM.i, {className: m}), g.createElement(g.DOM.span, {className: "UFIBlingBoxText"}, j._({"": "{count}", " Share": "{count} \u043f\u0435\u0440\u0435\u043f\u043e\u0441\u0442", " Shares": "\u041f\u0435\u0440\u0435\u043f\u043e\u0441\u0442\u044b: {count}"}, [j.param("count", n), j['enum'](o, {"": "", " Share": " Share", " Shares": " Shares"})]))));
    }});
    e.exports = l;
}, null);
__d("UFIBlingBox.react", ["React", "UFIBlingItem.react", "UFIConstants", "cx", "fbt", "tx", "FeedNFBConstants"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = b('FeedNFBConstants').data, n = g.createClass({displayName: 'UFIBlingBox', propTypes: {contextArgs: g.PropTypes.object.isRequired, 'data-ft': g.PropTypes.string, comments: g.PropTypes.number, likes: g.PropTypes.number, nfb: g.PropTypes.number, onClick: g.PropTypes.func, permalink: g.PropTypes.string, reshares: g.PropTypes.number}, render: function () {
        var o = [], p = '';
        if (this.props.likes) {
            o.push(g.createElement(h, {className: ((o.length > 0 ? "mls" : '')), contextArgs: this.props.contextArgs, count: this.props.likes, iconClassName: "UFIBlingBoxLikeIcon", itemKey: "like", key: "like"}));
            p += (this.props.likes == 1) ? "1 \u043e\u0442\u043c\u0435\u0442\u043a\u0430 \u00ab\u041d\u0440\u0430\u0432\u0438\u0442\u0441\u044f\u00bb" : l._("{count} \u043e\u0442\u043c\u0435\u0442\u043e\u043a \u00ab\u041d\u0440\u0430\u0432\u0438\u0442\u0441\u044f\u00bb", {count: this.props.likes});
            p += ' ';
        }
        if (this.props.comments) {
            o.push(g.createElement(h, {className: ((o.length > 0 ? "mls" : '')), contextArgs: this.props.contextArgs, count: this.props.comments, iconClassName: "UFIBlingBoxCommentIcon", itemKey: "comment", key: "comment"}));
            p += (this.props.comments == 1) ? "1 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439" : l._("{count} \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0435\u0432", {count: this.props.comments});
            p += ' ';
        }
        if (this.props.reshares) {
            o.push(g.createElement(h, {className: ((o.length > 0 ? "mls" : '')), contextArgs: this.props.contextArgs, count: this.props.reshares, iconClassName: "UFIBlingBoxReshareIcon", itemKey: "reshare", key: "reshare"}));
            p += (this.props.reshares == 1) ? "1 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u044f \u043e\u0442 \u0434\u0440\u0443\u0433\u0438\u0445" : l._("\u042d\u0442\u0438\u043c \u043f\u043e\u0434\u0435\u043b\u0438\u043b\u0438\u0441\u044c: {count}", {count: this.props.reshares});
        }
        if (this.props.nfb && m) {
            o.push(g.createElement(h, {className: ((o.length > 0 ? "mls" : '')), contextArgs: this.props.contextArgs, count: this.props.nfb, iconClassName: "_1ufb", itemKey: "nfb", key: "nfb"}));
            p += (this.props.nfb == 1) ? k._("{nfb text}", [k.param("nfb text", m.ONE_NFB)]) : k._("{nfb count}{nfb text}", [k.param("nfb count", this.props.nfb), k.param("nfb text", m.MULT_NFB)]);
            p += ' ';
        }
        var q = g.createElement(g.DOM.a, {className: "UFIBlingBox uiBlingBox feedbackBling", href: this.props.permalink, 'data-ft': this.props['data-ft'], 'aria-label': p}, o);
        if (this.props.comments > i.defaultPageSize)return q;
        q.props.onClick = this.props.onClick;
        q.props.rel = 'ignore';
        return q;
    }});
    e.exports = n;
}, null);
__d("UFILikeLink.react", ["AccessibilityLogger", "React", "TrackingNodes", "tx"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = h.createClass({displayName: 'UFILikeLink', propTypes: {likeAction: h.PropTypes.bool, onClick: h.PropTypes.func}, _handleClick: function (event) {
        g.logLikeEnterPress();
        if (this.props.onClick)this.props.onClick(event);
    }, render: function () {
        var l = this.props.likeAction ? "\u041d\u0440\u0430\u0432\u0438\u0442\u0441\u044f" : "\u041d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f", m = i.getTrackingInfo(this.props.likeAction ? i.types.LIKE_LINK : i.types.UNLIKE_LINK), n = this.props.likeAction ? "\u041e\u0442\u043c\u0435\u0442\u044c\u0442\u0435 \u043a\u0430\u043a \u043f\u043e\u043d\u0440\u0430\u0432\u0438\u0432\u0448\u0435\u0435\u0441\u044f" : "\u041d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f";
        return (h.createElement(h.DOM.span, null, h.createElement(h.DOM.a, {className: "UFILikeLink accessible_elem", href: "#", role: "button", 'aria-live': "polite", title: n, onClick: this._handleClick}, l), h.createElement(h.DOM.a, {className: "UFILikeLink", href: "#", role: "button", 'aria-live': "polite", title: n, onClick: this.props.onClick, 'data-ft': m}, l)));
    }});
    e.exports = k;
}, null);
__d("UFIShareLink.react", ["React", "TrackingNodes", "fbt"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.createClass({displayName: 'UFIShareLink', propTypes: {href: g.PropTypes.oneOfType([g.PropTypes.object, g.PropTypes.string]).isRequired}, render: function () {
        var k = "\u041e\u0442\u043f\u0440\u0430\u0432\u044c\u0442\u0435 \u044d\u0442\u043e \u0434\u0440\u0443\u0437\u044c\u044f\u043c \u0438\u043b\u0438 \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u0443\u0439\u0442\u0435 \u0432 \u0441\u0432\u043e\u0435\u0439 \u0425\u0440\u043e\u043d\u0438\u043a\u0435.", l = '{ "tn": "' + h.encodeTN(h.types.SHARE_LINK) + '", "type": 25 }';
        return (g.createElement(g.DOM.a, {className: "share_action_link", 'data-ft': l, href: this.props.href, rel: "dialog", title: k}, "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f"));
    }});
    e.exports = j;
}, null);
__d("UFISubscribeLink.react", ["React", "fbt"], function (a, b, c, d, e, f, g, h) {
    var i = g.createClass({displayName: 'UFISubscribeLink', propTypes: {subscribeAction: g.PropTypes.bool, onClick: g.PropTypes.func}, render: function () {
        var j = this.props.subscribeAction ? "\u041f\u043e\u043b\u0443\u0447\u0430\u0442\u044c \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f" : "\u041d\u0435 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u044c \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f", k = this.props.subscribeAction ? "\u041f\u043e\u043b\u0443\u0447\u0430\u0439\u0442\u0435 \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f \u043e \u043a\u0430\u0436\u0434\u043e\u043c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438." : "\u041d\u0435 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u044c \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f \u043e \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f\u0445.";
        return (g.createElement(g.DOM.a, {className: "UFISubscribeLink", href: "#", role: "button", 'aria-live': "polite", title: k, onClick: this.props.onClick}, j));
    }});
    e.exports = i;
}, null);
__d("ProfileBrowserLink", ["URI"], function (a, b, c, d, e, f, g) {
    var h = '/ajax/browser/dialog/', i = '/browse/', j = function (l, m, n) {
        return new g(l + m).setQueryData(n);
    }, k = {constructPageURI: function (l, m) {
        return j(i, l, m);
    }, constructDialogURI: function (l, m) {
        return j(h, l, m);
    }};
    e.exports = k;
}, null);
__d("ProfileBrowserTypes", [], function (a, b, c, d, e, f) {
    var g = {LIKES: 'likes', GROUP_MESSAGE_VIEWERS: 'group_message_viewers', MUTUAL_FRIENDS: 'mutual_friends', TODO_LIST_ASSIGNEES: 'todo_list_assignees'};
    e.exports = g;
}, null);
__d("UFITimelineBlingBox.react", ["ProfileBrowserLink", "ProfileBrowserTypes", "React", "UFIBlingItem.react", "URI", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = i.createClass({displayName: 'UFITimelineBlingBox', propTypes: {contextArgs: i.PropTypes.object.isRequired, 'data-ft': i.PropTypes.string, 'data-gt': i.PropTypes.string, actorid: i.PropTypes.any, commentOnClick: i.PropTypes.func, comments: i.PropTypes.number, enableShowComments: i.PropTypes.bool, enableShowLikes: i.PropTypes.bool, feedbackFBID: i.PropTypes.any, likes: i.PropTypes.number, reshares: i.PropTypes.number}, render: function () {
        var o = [];
        if (this.props.likes && this.props.enableShowLikes) {
            var p = this._getProfileBrowserURI(), q = "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0442\u0435\u0445, \u043a\u043e\u043c\u0443 \u044d\u0442\u043e \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f", r = i.createElement(i.DOM.a, {ajaxify: p.dialog, className: this._getItemClassName(o), 'data-ft': this.props['data-ft'], 'data-gt': this.props['data-gt'], 'data-hover': "tooltip", 'data-tooltip-alignh': "right", 'data-tooltip-uri': this._getLikeToolTipURI(), href: p.page, key: "like", rel: "dialog", role: "button", title: q}, i.createElement(j, {contextArgs: this.props.contextArgs, count: this.props.likes, iconClassName: "UFIBlingBoxTimelineLikeIcon", itemKey: "like"}));
            o.push(r);
        }
        if (this.props.comments && this.props.enableShowComments) {
            var s = "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438", t = i.createElement(i.DOM.a, {'aria-label': s, className: this._getItemClassName(o), 'data-ft': this.props['data-ft'], 'data-hover': "tooltip", 'data-tooltip-alignh': "right", href: "#", key: "comment", onClick: this.props.commentOnClick}, i.createElement(j, {contextArgs: this.props.contextArgs, count: this.props.comments, iconClassName: "UFIBlingBoxTimelineCommentIcon", itemKey: "comment"}));
            o.push(t);
        }
        if (this.props.reshares) {
            var u = "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043f\u043e\u0432\u0442\u043e\u0440\u043d\u044b\u0435 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438", v = this._getShareViewURI(), w = i.createElement(i.DOM.a, {ajaxify: v.dialog, 'aria-label': u, className: this._getItemClassName(o), 'data-ft': this.props['data-ft'], 'data-hover': "tooltip", 'data-tooltip-alignh': "right", href: v.page, key: "reshare", rel: "async"}, i.createElement(j, {allowText: true, contextArgs: this.props.contextArgs, count: this.props.reshares, iconClassName: "UFIBlingBoxTimelineReshareIcon", itemKey: "reshare"}));
            o.push(w);
        }
        return (i.createElement(i.DOM.span, null, o));
    }, _getItemClassName: function (o) {
        return ((o.length > 0 ? "mls" : '') + (' ' + "UFIBlingBoxTimelineItem"));
    }, _getLikeToolTipURI: function () {
        if (this.props.feedbackFBID) {
            var o = new k('/ajax/like/tooltip.php').setQueryData({comment_fbid: this.props.feedbackFBID});
            return o.toString();
        } else return null;
    }, _getProfileBrowserURI: function () {
        if (this.props.feedbackFBID) {
            var o = h.LIKES, p = {id: this.props.feedbackFBID, actorid: this.props.actorid}, q = g.constructDialogURI(o, p), r = g.constructPageURI(o, p), s = {dialog: q.toString(), page: r.toString()};
            return s;
        }
    }, _getShareViewURI: function () {
        if (this.props.feedbackFBID) {
            var o = new k('/ajax/shares/view').setQueryData({target_fbid: this.props.feedbackFBID}), p = new k('/shares/view').setSubdomain('www').setQueryData({id: this.props.feedbackFBID}), q = {dialog: o.toString(), page: p.toString()};
            return q;
        }
    }});
    e.exports = n;
}, null);
__d("UFICommentList", ["ClientIDs", "KeyedCallbackManager", "UFICentralUpdates", "UFIConstants", "UFIFeedbackTargets", "keyMirror"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    var m = l({actorID: true});

    function n(o) {
        this.count = 0;
        this.deletedComments = {};
        this.deletedCount = 0;
        this.dataSource = new h();
        this.feedbackTargetID = o;
        this.lastRequestedOffset = 0;
        this.lastRequestedLength = 0;
        this.basePermalink = "";
        this.commentPermalinks = {};
        this.orderReversed = false;
        k.getFeedbackTarget(this.feedbackTargetID, function (p) {
            this.actorID = p.actorforpost;
            this.basePermalink = p.permalink;
            this.orderReversed = p.isranked;
        }.bind(this));
    }

    n.prototype.addComment = function (o, p, q) {
        var r = p && g.isExistingClientID(p), s = this.dataSource.getAllResources(), t = {};
        for (var u in s) {
            var v = s[u];
            t[v] = u;
        }
        if (r && p in t) {
            t[o] = t[p];
            var w = t[p];
            this.dataSource.setResource(w, o);
        } else if (!t[o]) {
            var x = this.count;
            this.count++;
            t[o] = x;
            this.dataSource.setResource(x, o);
        }
        if (q)this.commentPermalinks[o] = this.buildCommentPermalink(o, q, t[o]);
        i.didUpdateFeedback(this.feedbackTargetID);
    };
    n.prototype.addCommentIDs = function (o, p, q) {
        var r = {};
        for (var s = 0; s < p; s++)r[o + s] = q[s] || j.unavailableCommentKey;
        this.dataSource.addResourcesAndExecute(r);
        i.didUpdateFeedback(this.feedbackTargetID);
        return this;
    };
    n.prototype.getComments = function (o, p, q, r) {
        var s = [];
        for (var t = 0; t < p; t++)s.push(o + t);
        var u = this.dataSource.getUnavailableResourcesFromRequest(s);
        if (u.length) {
            var v = Math.min.apply(Math, u), w = Math.max.apply(Math, u), x = v, y = w - v + 1;
            if (x < this.lastRequestedOffset || (x + y) > (this.lastRequestedOffset + this.lastRequestedLength)) {
                this.lastRequestedOffset = x;
                this.lastRequestedLength = y;
                this.fetchComments(x, y, q);
            }
        } else this.dataSource.deferredExecuteOrEnqueue(s).addCallback(this.deferredCallback.bind(this, o, p, r));
    };
    n.prototype.fetchComments = function (o, p, q) {
    };
    n.prototype.deferredCallback = function (o, p, q, r) {
    };
    n.prototype.reset = function () {
        var o = this.dataSource.getAllResources();
        this.dataSource.reset();
        this.count = 0;
        this.deletedCount = 0;
        this.deletedComments = {};
        this.lastRequestedOffset = 0;
        this.lastRequestedLength = 0;
        return o;
    };
    n.prototype.deleteComment = function (o) {
        if (!(o in this.deletedComments)) {
            this.deletedComments[o] = true;
            this.deletedCount++;
        }
    };
    n.prototype.updateCommentCount = function (o) {
        this.count = o;
        this.deletedCount = 0;
        return this;
    };
    n.prototype.getFeedbackTargetID = function () {
        return this.feedbackTargetID;
    };
    n.prototype.getCommentCount = function () {
        return this.count;
    };
    n.prototype.getDeletedCount = function () {
        return this.deletedCount;
    };
    n.prototype.getDisplayedCommentCount = function () {
        return this.count - this.deletedCount;
    };
    n.prototype.getBasePermalink = function () {
        return this.basePermalink;
    };
    n.prototype.buildCommentPermalink = function (o, p, q) {
    };
    n.prototype.getPermalinkForComment = function (o) {
        return this.commentPermalinks[o];
    };
    n.isValidContextPropertyForReset = function (o) {
        return o in m;
    };
    e.exports = n;
}, null);
__d("UFIInstanceState", ["UFICentralUpdates"], function (a, b, c, d, e, f, g) {
    var h = {};

    function i(k) {
        if (!h[k])h[k] = {};
    }

    var j = {getKeyForInstance: function (k, l) {
        i(k);
        return h[k][l];
    }, updateState: function (k, l, m) {
        i(k);
        h[k][l] = m;
        g.didUpdateInstanceState(k, l);
    }, updateStateField: function (k, l, m, n) {
        var o = this.getKeyForInstance(k, l) || {};
        o[m] = n;
        this.updateState(k, l, o);
    }};
    e.exports = j;
}, null);
__d("UFIComments", ["ClientIDs", "ImmutableObject", "UFICentralUpdates", "UFIConstants", "UFIInstanceState", "invariant", "merge", "randomInt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    "use strict";
    var o = {}, p = {};

    function q(fa) {
        return fa in p ? p[fa] : fa;
    }

    function r(fa, ga) {
        fa.forEach(function (ha) {
            var ia = ha.ftentidentifier, ja = j.UFIPayloadSourceType, ka = ha.clientid, la = false, ma = m({}, ha);
            if (ka) {
                delete ma.clientid;
                la = g.isExistingClientID(ka);
                if (la && p[ka])return;
            }
            if ((ga === ja.LIVE_SEND) || (ga === ja.USER_ACTION) || (ga === ja.ENDPOINT_ADD_COMMENT) || (ga === ja.ENDPOINT_EDIT_COMMENT))ma.isunseen = true;
            if (ga === ja.ENDPOINT_COMMENT_FETCH || ga === ja.ENDPOINT_ID_COMMENT_FETCH)ma.fromfetch = true;
            if (la) {
                if (o[ka].ufiinstanceid)k.updateStateField(o[ka].ufiinstanceid, 'locallycomposed', ha.id, true);
                ma.ufiinstanceid = o[ka].ufiinstanceid;
                p[ka] = ha.id;
                o[ha.id] = o[ka];
                delete o[ka];
                i.didUpdateComment(ka);
            }
            ea.setComment(ha.id, new h(ma));
            i.didUpdateComment(ha.id);
            i.didUpdateFeedback(ia);
        });
    }

    function s(fa) {
        for (var ga = 0; ga < fa.length; ga++) {
            var ha = fa[ga];
            switch (ha.actiontype) {
                case j.UFIActionType.COMMENT_LIKE:
                    t(ha);
                    break;
                case j.UFIActionType.DELETE_COMMENT:
                    x(ha);
                    break;
                case j.UFIActionType.LIVE_DELETE_COMMENT:
                    y(ha);
                    break;
                case j.UFIActionType.REMOVE_PREVIEW:
                    z(ha);
                    break;
                case j.UFIActionType.COMMENT_SET_SPAM:
                    aa(ha);
                    break;
                case j.UFIActionType.CONFIRM_COMMENT_REMOVAL:
                    ba(ha);
                    break;
                case j.UFIActionType.TRANSLATE_COMMENT:
                    v(ha);
                    break;
                case j.UFIActionType.COMMENT_LIKECOUNT_UPDATE:
                    u(ha);
                    break;
            }
        }
    }

    function t(fa) {
        var ga = ea.getComment(fa.commentid);
        if (ga) {
            var ha = {}, ia = fa.clientid && g.isExistingClientID(fa.clientid);
            if (!ia) {
                ha.hasviewerliked = fa.viewerliked;
                ha.likecount = fa.likecount;
            }
            ha.likeconfirmhash = n(0, 1024);
            da(fa.commentid, ha);
        }
    }

    function u(fa) {
        var ga = ea.getComment(fa.commentid);
        if (ga && fa.hasviewerliked === ga.hasviewerliked) {
            var ha = {likecount: fa.likecount, likeconfirmhash: n(0, 1024)};
            da(fa.commentid, ha);
        }
    }

    function v(fa) {
        var ga = fa.commentid, ha = ea.getComment(ga);
        if (ha) {
            var ia = {translatedtext: fa.translatedtext, translatorapp: fa.translatorapp};
            da(ga, ia);
        }
    }

    function w(fa) {
        var ga = {reportLink: fa.reportLink, commenterIsFOF: fa.commenterIsFOF, userIsMinor: fa.userIsMinor, giveFeedbackLink: fa.giveFeedbackLink};
        return ga;
    }

    function x(fa) {
        var ga = ea.getComment(fa.commentid);
        ca(ga, j.UFIStatus.DELETED);
    }

    function y(fa) {
        var ga = ea.getComment(fa.commentid);
        if (ga && ga.status !== j.UFIStatus.DELETED)ca(ga, j.UFIStatus.LIVE_DELETED);
    }

    function z(fa) {
        da(fa.commentid, {attachment: null});
    }

    function aa(fa) {
        var ga = ea.getComment(fa.commentid), ha = fa.shouldHideAsSpam ? j.UFIStatus.SPAM_DISPLAY : null;
        ca(ga, ha);
    }

    function ba(fa) {
        da(fa.commentid, w(fa));
    }

    function ca(fa, ga) {
        da(fa.id, {priorstatus: fa.status, status: ga});
    }

    function da(fa, ga) {
        var ha = ea.getComment(fa) || new h({});
        ea.setComment(fa, h.set(ha, ga));
        i.didUpdateComment(ha.id);
        i.didUpdateFeedback(ha.ftentidentifier);
    }

    var ea = {getComment: function (fa) {
        if (fa === j.unavailableCommentKey)return null;
        return o[q(fa)];
    }, setComment: function (fa, ga) {
        l(ga instanceof h);
        o[q(fa)] = ga;
    }, resetComments: function (fa) {
        for (var ga in fa)delete o[q(ga)];
    }};
    i.subscribe('update-comments', function (fa, ga) {
        if (ga.comments && ga.comments.length)r(ga.comments, ga.payloadsource);
    });
    i.subscribe('update-actions', function (fa, ga) {
        if (ga.actions && ga.actions.length)s(ga.actions);
    });
    e.exports = ea;
}, null);
__d("UFIReplyCommentList", ["ActorURI", "MercuryServerDispatcher", "UFICentralUpdates", "UFICommentList", "UFIComments", "UFIConstants", "URI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    "use strict";
    var n = {};
    for (var o in j)if (j.hasOwnProperty(o))q[o] = j[o];
    var p = j === null ? null : j.prototype;
    q.prototype = Object.create(p);
    q.prototype.constructor = q;
    q.__superConstructor__ = j;
    q.getCommentList = function (s, t) {
        if (!n[t])n[t] = new q(s, t);
        return n[t];
    };
    q.resetWithContext = function (s, t, u) {
        var v = n[t];
        if (!v)return;
        v.reset();
        for (var w in u)if (this.isValidContextPropertyForReset(w))v[w] = u[w];
    };
    function q(s, t) {
        j.call(this, s);
        this.parentCommentID = t;
    }

    q.prototype.fetchComments = function (s, t, u) {
        var v = {ft_ent_identifier: this.feedbackTargetID, parent_comment_ids: [this.parentCommentID], source: null, offsets: [s], lengths: [t]};
        if (!u)v[g.PARAMETER_ACTOR] = this.actorID;
        h.trySend('/ajax/ufi/reply_fetch.php', v);
    };
    q.prototype.deferredCallback = function (s, t, u, v) {
        var w = {};
        for (var x = 0; x < t; x++) {
            var y = k.getComment(v[s + x]);
            if (y)w[s + x] = y;
        }
        u(w);
    };
    q.prototype.reset = function () {
        var s = p.reset.call(this), t = {};
        for (var u in s) {
            var v = s[u];
            t[v] = true;
        }
        k.resetComments(t);
    };
    q.prototype.getParentCommentID = function () {
        return this.parentCommentID;
    };
    q.prototype.buildCommentPermalink = function (s, t, u) {
        if (!this.basePermalink)return null;
        return (m(this.basePermalink).addQueryData({reply_comment_id: t, total_comments: this.count}).toString());
    };
    h.registerEndpoints({'/ajax/ufi/reply_fetch.php': {mode: h.IMMEDIATE}});
    function r(s) {
        var t = k.getComment(s.commentid), u = t.id, v = t.ftentidentifier, w = t.parentcommentid;
        if (!w)return;
        if (t.status !== l.UFIStatus.DELETED && t.status !== l.UFIStatus.FAILED_ADD)q.getCommentList(v, w).deleteComment(u);
    }

    i.subscribe('update-actions', function (s, t) {
        if (t.actions && t.actions.length)for (var u = 0; u < t.actions.length; u++) {
            var v = t.actions[u];
            switch (v.actiontype) {
                case l.UFIActionType.DELETE_COMMENT:
                    r(v);
                    break;
            }
        }
    });
    i.subscribe('update-comment-lists', function (s, t) {
        var u = t.commentlists;
        if (u && u.replies && Object.keys(u).length)for (var v in u.replies) {
            var w = u.replies[v], x = w.ftentidentifier;
            q.getCommentList(x, v).addCommentIDs(w.range.offset, w.range.length, w.values).updateCommentCount(w.count);
        }
    });
    i.subscribe('update-comments', function (s, t) {
        if (t.comments && t.comments.length)t.comments.forEach(function (u) {
            var v = u.entidentifier, w = u.parentcommentid;
            if (!w)return;
            q.getCommentList(v, w).addComment(u.id, u.clientid, u.legacyid);
        });
    });
    e.exports = q;
}, null);
__d("UFIToplevelCommentList", ["ActorURI", "MercuryServerDispatcher", "UFICentralUpdates", "UFICommentList", "UFIComments", "UFIConstants", "UFIReplyCommentList", "URI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    "use strict";
    var o = {};
    for (var p in j)if (j.hasOwnProperty(p))r[p] = j[p];
    var q = j === null ? null : j.prototype;
    r.prototype = Object.create(q);
    r.prototype.constructor = r;
    r.__superConstructor__ = j;
    r.getCommentList = function (t, u) {
        if (!o[t])o[t] = {};
        if (!o[t][u]) {
            var v = new r(t, u), w = r.getCommentListsForFeedbackTargetID(t);
            if (w.length)v.updateCommentCount(w[0].getCommentCount());
            o[t][u] = v;
        }
        return o[t][u];
    };
    r.getCommentListsForFeedbackTargetID = function (t) {
        var u = [], v = o[t] || {};
        for (var w in v)u.push(v[w]);
        return u;
    };
    r.getCommentListForFeedbackTargetID_UNSAFE = function (t) {
        var u = r.getCommentListsForFeedbackTargetID(t);
        return u.length ? u[0] : null;
    };
    r.resetCommentListsForFeedbackTargetID = function (t) {
        if (!o[t])return;
        var u = {};
        for (var v in o[t]) {
            var w = o[t][v], x = w.reset();
            for (var y in x) {
                var z = x[y];
                u[z] = true;
            }
        }
        k.resetComments(u);
    };
    r.resetCommentListsWithContext = function (t, u) {
        if (!o[t])return;
        var v = {};
        for (var w in o[t]) {
            var x = o[t][w];
            for (var y in u)if (this.isValidContextPropertyForReset(y))x[y] = u[y];
            var z = x.reset();
            for (var aa in z) {
                var ba = z[aa];
                v[ba] = true;
                m.resetWithContext(t, ba, u);
            }
        }
        k.resetComments(v);
    };
    function r(t, u) {
        j.call(this, t);
        this.orderingMode = u;
    }

    r.prototype.fetchComments = function (t, u, v) {
        var w = {ft_ent_identifier: this.feedbackTargetID, viewas: v, source: null, offset: t, length: u, orderingmode: this.orderingMode};
        if (!v)w[g.PARAMETER_ACTOR] = this.actorID;
        h.trySend('/ajax/ufi/comment_fetch.php', w);
    };
    r.prototype.deferredCallback = function (t, u, v, w) {
        var x = {}, y = t, z = t + u - 1;
        for (var aa = 0; aa < u; aa++) {
            var ba = this.orderReversed ? z - aa : y + aa, ca = k.getComment(w[ba]);
            if (ca)x[t + aa] = ca;
        }
        v(x);
    };
    r.prototype.getOrderingMode = function () {
        return this.orderingMode;
    };
    r.prototype.buildCommentPermalink = function (t, u, v) {
        if (!this.basePermalink)return null;
        var w = Math.floor((this.count - v - 1) / l.defaultPageSize) * l.defaultPageSize;
        return (n(this.basePermalink).addQueryData({comment_id: u, offset: w, total_comments: this.count}).toString());
    };
    h.registerEndpoints({'/ajax/ufi/comment_fetch.php': {mode: h.IMMEDIATE}});
    function s(t) {
        var u = k.getComment(t.commentid), v = u.id, w = u.ftentidentifier, x = u.parentcommentid;
        if (x)return;
        if (u.status !== l.UFIStatus.DELETED && u.status !== l.UFIStatus.FAILED_ADD)r.getCommentListsForFeedbackTargetID(w).forEach(function (y) {
            y.deleteComment(v);
        });
    }

    i.subscribe('update-actions', function (t, u) {
        if (u.actions && u.actions.length)for (var v = 0; v < u.actions.length; v++) {
            var w = u.actions[v];
            switch (w.actiontype) {
                case l.UFIActionType.DELETE_COMMENT:
                    s(w);
                    break;
            }
        }
    });
    i.subscribe('update-comment-lists', function (t, u) {
        var v = u.commentlists;
        if (v && v.comments && Object.keys(v).length)for (var w in v.comments)for (var x in v.comments[w]) {
            var y = v.comments[w][x];
            r.getCommentList(w, x).addCommentIDs(y.range.offset, y.range.length, y.values);
        }
    });
    i.subscribe('update-comments', function (t, u) {
        if (u.comments && u.comments.length)u.comments.forEach(function (v) {
            if (v.parentcommentid)return;
            var w = v.ftentidentifier;
            r.getCommentListsForFeedbackTargetID(w).forEach(function (x) {
                x.addComment(v.id, v.clientid, v.legacyid);
            });
        });
    });
    i.subscribe('update-feedback', function (t, u) {
        if (u.feedbacktargets && u.feedbacktargets.length)u.feedbacktargets.forEach(function (v) {
            var w = v.entidentifier, x = v.defaultcommentorderingmode, y = {};
            if (x)y[x] = true;
            if (v.orderingmodes)v.orderingmodes.forEach(function (aa) {
                y[aa.value] = true;
            });
            for (var z in y)r.getCommentList(w, z).updateCommentCount(v.commentcount);
        });
    });
    e.exports = r;
}, null);
__d("XBroadcastRequestAddComposerTokenAsyncControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/profile\/broadcast_request\/async\/add_composer_token\/", {comment_token: {type: "String"}, source_obj_id: {type: "Int"}});
}, null);
__d("UFIUserActions", ["ActorURI", "AsyncResponse", "BroadcastRequestParam", "CLoggerX", "ClientIDs", "ImmutableObject", "Nectar", "UFICentralUpdates", "UFIToplevelCommentList", "UFIComments", "UFIConstants", "UFIFeedbackTargets", "MercuryServerDispatcher", "XBroadcastRequestAddComposerTokenAsyncControllerURIBuilder", "collectDataAttributes", "copyProperties", "tx", "UnicodeBidi"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
    var y = {BAN: 'ban', UNDO_BAN: 'undo_ban'}, z = {changeActor: function (ma, na) {
        r.getFeedbackTarget(ma, function (oa) {
            o.resetCommentListsWithContext(ma, {actorID: na});
            var pa = {from_actor_id: oa.actorforpost, ft_ent_identifier: ma};
            pa[g.PARAMETER_ACTOR] = na;
            s.trySend('/ajax/ufi/actor_change.php', pa);
        });
    }, changeCommentLike: function (ma, na, oa) {
        var pa = p.getComment(ma);
        if (pa.hasviewerliked != na) {
            var qa = aa(oa.target), ra = na ? 1 : -1, sa = {commentid: ma, actiontype: q.UFIActionType.COMMENT_LIKE, viewerliked: na, likecount: pa.likecount + ra};
            n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {actions: [sa]});
            r.getFeedbackTarget(pa.ftentidentifier, function (ta) {
                var ua = {};
                ua[g.PARAMETER_ACTOR] = ta.actorforpost;
                s.trySend('/ajax/ufi/comment_like.php', v({comment_id: ma, legacy_id: pa.legacyid, like_action: na, ft_ent_identifier: pa.ftentidentifier, source: oa.source, client_id: k.getNewClientID()}, qa, ua));
            });
        }
    }, changeAlsoRecommend: function (ma, na) {
        var oa = p.getComment(ma.id);
        if (oa.hasviewerrecommended !== na) {
            var pa = {};
            pa[i.COMMENT_TOKEN] = ma.id;
            pa[i.SOURCE_OBJ_ID] = ma.ftentidentifier;
            s.trySend(new t().getURI(), pa);
        }
    }, addComment: function (ma, na, oa, pa) {
        r.getFeedbackTarget(ma, function (qa) {
            var ra = aa(pa.target), sa = k.getNewClientID();
            if (!qa.actorforpost)return;
            var ta = x.isDirectionLTR(na) ? 'ltr' : 'rtl', ua = {ftentidentifier: ma, body: {text: na, dir: ta}, author: qa.actorforpost, id: sa, islocal: true, ufiinstanceid: pa.ufiinstanceid, likecount: 0, hasviewerliked: false, parentcommentid: pa.replyid, attachment: pa.attachedsticker, photo_comment: pa.attachedphoto, timestamp: {time: Date.now(), text: "\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434 \u043d\u0430\u0437\u0430\u0434"}}, va = {actiontype: q.UFIActionType.SUBSCRIBE_ACTION, actorid: qa.actorforpost, hasviewersubscribed: true, entidentifier: ma}, wa = {actiontype: q.UFIActionType.ADD_COMMENT_ACTION, feedbackfbid: qa.targetfbid};
            n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {comments: [ua], actions: [va, wa]});
            var xa = null;
            if (pa.replyid)xa = (p.getComment(pa.replyid)).fbid;
            var ya = j.getCLParamsForTarget(pa.target, xa), za = {};
            za[g.PARAMETER_ACTOR] = qa.actorforpost;
            s.trySend('/ajax/ufi/add_comment.php', v({ft_ent_identifier: qa.entidentifier, comment_text: oa, source: pa.source, client_id: sa, reply_fbid: xa, parent_comment_id: pa.replyid, timeline_log_data: pa.timelinelogdata, rootid: pa.rootid, clp: ya, attached_sticker_fbid: pa.attachedsticker ? pa.attachedsticker.fbid : 0, attached_photo_fbid: pa.attachedphoto ? pa.attachedphoto.fbid : 0, giftoccasion: pa.giftoccasion, recommendation_ids: pa.recommendationIDs ? pa.recommendationIDs : []}, ra, za));
        });
    }, _hasCommentTextChanged: function (ma, na) {
        return ma.body && ma.body.text != na;
    }, _hasCommentPhotoChanged: function (ma, na) {
        return ((ma || na) && !(ma && na)) || (ma && na && (ma.fbid != na.fbid));
    }, _hasCommentStickerChanged: function (ma, na) {
        return ((ma || na) && !(ma && na)) || (ma && (ma.type == "sticker") && na && (ma.fbid != na.fbid));
    }, editComment: function (ma, na, oa, pa) {
        var qa = aa(pa.target), ra = p.getComment(ma), sa = this._hasCommentTextChanged(ra, na) || this._hasCommentPhotoChanged(ra.photo_comment, pa.attachedPhoto) || this._hasCommentStickerChanged(ra.attachment, pa.attachedSticker);
        ra = l.set(ra, {status: q.UFIStatus.PENDING_EDIT, body: {text: na}, editnux: null, attachment: pa.attachedSticker, photo_comment: pa.attachedPhoto});
        if (sa)ra = l.set(ra, {originalTimestamp: ra.timestamp.time, timestamp: {time: Date.now(), text: "\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434 \u043d\u0430\u0437\u0430\u0434"}});
        n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {comments: [ra]});
        r.getFeedbackTarget(ra.ftentidentifier, function (ta) {
            var ua = {};
            ua[g.PARAMETER_ACTOR] = ta.actorforpost;
            s.trySend('/ajax/ufi/edit_comment.php', v({ft_ent_identifier: ra.ftentidentifier, comment_text: oa, source: pa.source, comment_id: ra.id, parent_comment_id: ra.parentcommentid, attached_sticker_fbid: pa.attachedSticker ? pa.attachedSticker.fbid : 0, attached_photo_fbid: pa.attachedPhoto ? pa.attachedPhoto.fbid : 0}, qa, ua));
        });
    }, translateComment: function (ma, na) {
        s.trySend('/ajax/ufi/translate_comment.php', {ft_ent_identifier: ma.ftentidentifier, comment_ids: [ma.id], source: na.source});
    }, setHideAsSpam: function (ma, na, oa) {
        var pa = aa(oa.target), qa = p.getComment(ma), ra = {commentid: ma, actiontype: q.UFIActionType.COMMENT_SET_SPAM, shouldHideAsSpam: na};
        n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {actions: [ra]});
        s.trySend('/ajax/ufi/comment_spam.php', v({comment_id: ma, spam_action: na, ft_ent_identifier: qa.ftentidentifier, source: oa.source}, pa));
    }, removeComment: function (ma, na) {
        var oa = aa(na.target), pa = p.getComment(ma), qa = {actiontype: q.UFIActionType.DELETE_COMMENT, commentid: ma, oneclick: na.oneclick};
        n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {actions: [qa]});
        r.getFeedbackTarget(pa.ftentidentifier, function (ra) {
            var sa = {};
            sa[g.PARAMETER_ACTOR] = ra.actorforpost;
            s.trySend('/ajax/ufi/delete_comment.php', v({comment_id: pa.id, comment_legacyid: pa.legacyid, ft_ent_identifier: pa.ftentidentifier, one_click: na.oneclick, source: na.source, client_id: k.getNewClientID(), timeline_log_data: na.timelinelogdata}, oa, sa));
        });
    }, banUser: function (ma, na, oa, pa) {
        var qa = oa ? y.BAN : y.UNDO_BAN;
        s.trySend('/ajax/ufi/ban_user.php', {page_id: na, commenter_id: ma.author, action: qa, comment_id: ma.id, client_side: true});
    }, changeLike: function (ma, na, oa) {
        r.getFeedbackTarget(ma, function (pa) {
            var qa = aa(oa.target);
            if (pa.hasviewerliked !== na) {
                var ra = na ? 1 : -1, sa = {actiontype: q.UFIActionType.LIKE_ACTION, actorid: pa.actorforpost, hasviewerliked: na, likecount: pa.likecount + ra, entidentifier: ma, likesentences: {current: pa.likesentences.alternate, alternate: pa.likesentences.current}};
                n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {actions: [sa]});
                var ta = {};
                ta[g.PARAMETER_ACTOR] = pa.actorforpost;
                s.trySend('/ajax/ufi/like.php', v({like_action: na, ft_ent_identifier: ma, source: oa.source, client_id: k.getNewClientID(), rootid: oa.rootid, giftoccasion: oa.giftoccasion}, qa, ta));
            }
        });
    }, changeSubscribe: function (ma, na, oa) {
        r.getFeedbackTarget(ma, function (pa) {
            var qa = aa(oa.target);
            if (pa.hasviewersubscribed !== na) {
                var ra = {actiontype: q.UFIActionType.SUBSCRIBE_ACTION, actorid: pa.actorforpost, hasviewersubscribed: na, entidentifier: ma};
                n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {actions: [ra]});
                var sa = {};
                sa[g.PARAMETER_ACTOR] = pa.actorforpost;
                s.trySend('/ajax/ufi/subscribe.php', v({subscribe_action: na, ft_ent_identifier: ma, source: oa.source, client_id: k.getNewClientID(), rootid: oa.rootid, comment_expand_mode: oa.commentexpandmode}, qa, sa));
            }
        });
    }, fetchSpamComments: function (ma, na, oa, pa) {
        s.trySend('/ajax/ufi/id_comment_fetch.php', {ft_ent_identifier: ma, viewas: pa, comment_ids: na, parent_comment_id: oa, source: null});
    }, removePreview: function (ma, na) {
        var oa = aa(na.target), pa = {commentid: ma.id, actiontype: q.UFIActionType.REMOVE_PREVIEW};
        n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {actions: [pa]});
        s.trySend('/ajax/ufi/remove_preview.php', v({comment_id: ma.id, ft_ent_identifier: ma.ftentidentifier, source: na.source}, oa));
    }};

    function aa(ma) {
        if (!ma)return {ft: {}};
        var na = {ft: u(ma, ['ft']).ft};
        m.addModuleData(na, ma);
        return na;
    }

    function ba(ma) {
        var na = ma.request.data;
        if (!ma.isBlockedAction())h.defaultErrorHandler(ma);
        var oa = na.client_id || na.comment_id, pa = p.getComment(oa), qa = (pa.status === q.UFIStatus.PENDING_EDIT) ? q.UFIStatus.FAILED_EDIT : q.UFIStatus.FAILED_ADD;
        pa = l.setDeep(pa, {status: qa, allowRetry: ca(ma), body: {mentionstext: na.comment_text, mentionsphoto: pa.photo_comment}});
        n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {comments: [pa]});
    }

    function ca(ma) {
        var na = ma.getError();
        if (ma.isBlockedAction())return false;
        if (ma.silentError)return true;
        if (na === 1357012 || na === 1357006)return false;
        return true;
    }

    function da(ma) {
        var na = ma.request.data, oa = na.comment_id, pa = p.getComment(oa);
        pa = l.set(pa, {status: pa.priorstatus || null, priorstatus: undefined});
        n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {comments: [pa]});
    }

    function ea(ma) {
        var na = ma.request.data, oa = na.comment_id, pa = p.getComment(oa);
        if (na.like_action === pa.hasviewerliked) {
            var qa = pa.hasviewerliked ? -1 : 1, ra = {commentid: oa, actiontype: q.UFIActionType.COMMENT_LIKE, viewerliked: !pa.hasviewerliked, likecount: pa.likecount + qa};
            n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {actions: [ra]});
        }
        h.defaultErrorHandler(ma);
    }

    function fa(ma) {
        var na = ma.request.data, oa = na.ft_ent_identifier;
        r.getFeedbackTarget(oa, function (pa) {
            if (pa.hasviewerliked === na.like_action) {
                var qa = pa.hasviewerliked ? -1 : 1, ra = {actiontype: q.UFIActionType.LIKE_ACTION, actorid: pa.actorforpost, hasviewerliked: !pa.hasviewerliked, likecount: pa.likecount + qa, entidentifier: oa, likesentences: {current: pa.likesentences.alternate, alternate: pa.likesentences.current}};
                n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {actions: [ra]});
            }
        });
        h.defaultErrorHandler(ma);
    }

    function ga(ma) {
        var na = ma.request.data, oa = na.ft_ent_identifier;
        r.getFeedbackTarget(oa, function (pa) {
            if (pa.hasviewersubscribed === na.subscribe_action) {
                var qa = {actiontype: q.UFIActionType.SUBSCRIBE_ACTION, actorid: pa.actorforpost, hasviewersubscribed: !pa.hasviewersubscribed, entidentifier: oa};
                n.handleUpdate(q.UFIPayloadSourceType.USER_ACTION, {actions: [qa]});
            }
        });
        h.defaultErrorHandler(ma);
    }

    var ha = {'/ajax/ufi/actor_change.php': {mode: s.IMMEDIATE}, '/ajax/ufi/comment_like.php': {mode: s.BATCH_CONDITIONAL, error_handler: ea, batch_if: ia, batch_function: la}, '/ajax/ufi/comment_spam.php': {mode: s.IMMEDIATE, error_handler: da}, '/ajax/ufi/add_comment.php': {mode: s.IMMEDIATE, error_handler: ba}, '/ajax/ufi/delete_comment.php': {mode: s.IMMEDIATE, error_handler: da}, '/ajax/ufi/ban_user.php': {mode: s.IMMEDIATE}, '/ajax/ufi/edit_comment.php': {mode: s.IMMEDIATE, error_handler: ba}, '/ajax/ufi/like.php': {mode: s.BATCH_CONDITIONAL, error_handler: fa, batch_if: ja, batch_function: la}, '/ajax/ufi/subscribe.php': {mode: s.BATCH_CONDITIONAL, error_handler: ga, batch_if: ka, batch_function: la}, '/ajax/ufi/id_comment_fetch.php': {mode: s.IMMEDIATE}, '/ajax/ufi/remove_preview.php': {mode: s.IMMEDIATE}, '/ajax/ufi/translate_comment.php': {mode: s.IMMEDIATE}, '/profile/broadcast_request/async/add_composer_token/': {mode: s.IMMEDIATE}};
    ha[(new t()).getURI()] = {mode: s.IMMEDIATE};
    s.registerEndpoints(ha);
    function ia(ma, na) {
        return ma && ma.ft_ent_identifier == na.ft_ent_identifier && ma.comment_id == na.comment_id;
    }

    function ja(ma, na) {
        return ma && ma.ft_ent_identifier == na.ft_ent_identifier;
    }

    function ka(ma, na) {
        return ma && ma.ft_ent_identifier == na.ft_ent_identifier;
    }

    function la(ma, na) {
        return na;
    }

    e.exports = z;
}, null);
__d("UFIUIEvents", [], function (a, b, c, d, e, f) {
    var g = 'UFIUIEvents/ufiActionLinkLike', h = 'UFIUIEvents/ufiActionLinkUnlike', i = {UFIActionLinkLike: g, UFIActionLinkUnlike: h};
    e.exports = i;
}, null);
__d("UFIActionLinkController", ["Arbiter", "ClickPointIdentifiersDEPRECATED", "CSS", "DOMQuery", "Parent", "React", "TrackingNodes", "UFIBlingBox.react", "UFICentralUpdates", "UFIConstants", "UFIFeedbackTargets", "UFILikeLink.react", "UFIShareLink.react", "UFISubscribeLink.react", "UFITimelineBlingBox.react", "UFIToplevelCommentList", "UFIUserActions", "UFIUIEvents", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    function z(ba, ca, da) {
        if (this._root)throw new Error('UFIActionLinkController attempted to initialize when a root was' + ' already present');
        var ea = j.scry(ba, ca)[0];
        if (ea) {
            var fa = document.createElement('span');
            ea.parentNode.replaceChild(fa, ea);
            fa.appendChild(ea);
            if (typeof da === "function")da(fa);
        } else var ga = g.subscribe('PhotoSnowlift.DATA_CHANGE', function () {
            g.unsubscribe(ga);
            z(ba, ca, da);
        }, g.SUBSCRIBE_NEW);
    }

    var aa = function (ba, ca, da) {
        this._id = ca.ftentidentifier;
        this._ftFBID = da.targetfbid;
        this._source = ca.source;
        this._contextArgs = ca;
        this._ufiRoot = ba;
        this._isOnTimeline = this._isRenderingOnTimeline();
        if (this._isOnTimeline) {
            this._attemptInitializeTimelineBling();
        } else this._attemptInitializeBling();
        if (da.viewercanlike || da.hasviewerliked)this._attemptInitializeLike();
        if (da.viewercansubscribetopost)this._attemptInitializeSubscribe();
        this._attemptInitializeShare();
        o.subscribe('feedback-updated', function (ea, fa) {
            var ga = fa.updates;
            if (this._id in ga)this.render();
        }.bind(this));
        o.subscribe('feedback-id-changed', function (ea, fa) {
            var ga = fa.updates;
            if (this._id in ga)this._id = ga[this._id];
        }.bind(this));
    };
    y(aa.prototype, {_attemptInitializeBling: function () {
        z(this._ufiRoot, '^form .uiBlingBox', function (ba) {
            this._blingRoot = ba;
            if (this._dataReady)this._renderBling();
        }.bind(this));
    }, _attemptInitializeTimelineBling: function () {
        if (this._root)throw new Error('UFIActionLinkController attempted to initialize when a root was' + ' already present');
        var ba = j.scry(this._ufiRoot, '^form .fbTimelineFeedbackActions .UFIBlingBoxTimeline')[0];
        if (ba) {
            var ca = j.scry(ba, '.fbTimelineFeedbackLikes')[0];
            this._enableShowLikes = ca ? true : false;
            var da = j.scry(ba, '.fbTimelineFeedbackComments')[0];
            this._enableShowComments = da ? true : false;
        }
        this._blingTimelineRoot = ba;
        if (this._dataReady)this._renderTimelineBling();
    }, _attemptInitializeLike: function () {
        z(this._ufiRoot, '^form .like_link', function (ba) {
            this._likeRoot = ba;
            if (this._dataReady)this._renderLike();
        }.bind(this));
    }, _attemptInitializeSubscribe: function () {
        z(this._ufiRoot, '^form .unsub_link', function (ba) {
            this._subscribeRoot = ba;
            if (this._dataReady)this._renderSubscribe();
        }.bind(this));
    }, _attemptInitializeShare: function () {
        z(this._ufiRoot, '^form .share_action_link', function (ba) {
            this._shareRoot = ba;
            var ca = j.scry(this._shareRoot, '.share_action_link')[0];
            this._shareURI = ca ? ca.getAttribute('href') : null;
            if (this._dataReady)this._renderShare();
        }.bind(this));
    }, render: function () {
        this._dataReady = true;
        if (this._isOnTimeline) {
            this._renderTimelineBling();
        } else this._renderBling();
        this._renderLike();
        this._renderSubscribe();
        this._renderShare();
    }, _renderBling: function () {
        if (this._blingRoot)q.getFeedbackTarget(this._id, function (ba) {
            var ca = function (event) {
                if (this._contextArgs.blingtogglescomments) {
                    var ga = k.byTag(event.target, "form");
                    i.toggleClass(ga, "collapsed_comments");
                    i.toggleClass(ga, "hidden_add_comment");
                }
                event.preventDefault();
            }.bind(this), da = m.getTrackingInfo(m.types.BLINGBOX), ea = v.getCommentListForFeedbackTargetID_UNSAFE(this._id).getDisplayedCommentCount(), fa = l.createElement(n, {likes: ba.likecount, comments: ea, reshares: ba.sharecount, nfb: ba.nfbcount, permalink: ba.permalink, contextArgs: this._contextArgs, onClick: ca, 'data-ft': da});
            this._blingBox = l.renderComponent(fa, this._blingRoot);
        }.bind(this));
    }, _renderTimelineBling: function () {
        if (this._blingTimelineRoot)q.getFeedbackTarget(this._id, function (ba) {
            var ca = m.getTrackingInfo(m.types.BLINGBOX), da = h.getUserActionID(h.types.TIMELINE_SEE_LIKERS), ea = function (event) {
                var ha = k.byTag(event.target, "form");
                i.removeClass(ha, "collapsed_comments");
                var ia = j.scry(ha, 'a.UFIPagerLink');
                if (ia.length)ia[0].click();
                event.preventDefault();
            }.bind(this), fa = v.getCommentListForFeedbackTargetID_UNSAFE(this._id).getDisplayedCommentCount(), ga = l.createElement(u, {comments: fa, commentOnClick: ea, contextArgs: this._contextArgs, 'data-ft': ca, 'data-gt': da, enableShowComments: this._enableShowComments, enableShowLikes: this._enableShowLikes, feedbackFBID: this._ftFBID, likes: ba.likecount, reshares: ba.sharecount, actorid: ba.actorid});
            l.renderComponent(ga, this._blingTimelineRoot);
        }.bind(this));
    }, _renderLike: function () {
        if (this._likeRoot)q.getFeedbackTarget(this._id, function (ba) {
            var ca = !ba.hasviewerliked, da = function (event) {
                var fa = ca ? x.UFIActionLinkLike : x.UFIActionLinkUnlike;
                g.inform(fa, {ft_id: this._id, like_action: ca, target: event.target});
                w.changeLike(this._id, ca, {source: this._source, target: event.target, rootid: this._contextArgs.rootid, giftoccasion: this._contextArgs.giftoccasion});
                event.preventDefault();
            }.bind(this), ea = l.createElement(r, {onClick: da, likeAction: ca});
            this._likeLink = l.renderComponent(ea, this._likeRoot);
        }.bind(this));
    }, _renderSubscribe: function () {
        if (this._subscribeRoot)q.getFeedbackTarget(this._id, function (ba) {
            var ca = !ba.hasviewersubscribed, da = function (event) {
                w.changeSubscribe(this._id, ca, {source: this._source, target: event.target, rootid: this._contextArgs.rootid, commentexpandmode: ba.commentexpandmode});
                event.preventDefault();
            }.bind(this), ea = l.createElement(t, {onClick: da, subscribeAction: ca});
            this._subscribeLink = l.renderComponent(ea, this._subscribeRoot);
        }.bind(this));
    }, _renderShare: function () {
        if (this._shareRoot && this._shareURI)this._shareLink = l.renderComponent(l.createElement(s, {href: this._shareURI}), this._shareRoot);
    }, _isRenderingOnTimeline: function () {
        if (this._source === p.UFIFeedbackSourceType.PROFILE) {
            var ba = j.scry(this._ufiRoot, '^form .fbTimelineFeedbackActions .UFIBlingBoxTimeline');
            return (ba.length > 0);
        }
        return false;
    }});
    e.exports = aa;
}, null);
__d("ClipboardPhotoUploader", ["ArbiterMixin", "AsyncRequest", "mixin"], function (a, b, c, d, e, f, g, h, i) {
    var j = i(g);
    for (var k in j)if (j.hasOwnProperty(k))m[k] = j[k];
    var l = j === null ? null : j.prototype;
    m.prototype = Object.create(l);
    m.prototype.constructor = m;
    m.__superConstructor__ = j;
    function m(n, o) {
        "use strict";
        this.uploadURIString = n;
        this.data = o;
    }

    m.prototype.handlePaste = function (event) {
        "use strict";
        if (!event.clipboardData)return;
        var n = event.clipboardData.items;
        if (!n)return;
        for (var o = 0; o < n.length; ++o) {
            var p = n[o];
            if (p.kind === 'file' && p.type.indexOf('image/') !== -1) {
                var q = new FormData();
                q.append('pasted_file', p.getAsFile());
                var r = new h();
                r.setURI(this.uploadURIString).setData(this.data).setRawData(q).setHandler(function (s) {
                    this.inform('upload_success', s);
                }.bind(this)).setErrorHandler(function (s) {
                    this.inform('upload_error', s);
                }.bind(this));
                this.inform('upload_start');
                r.send();
                break;
            }
        }
    };
    e.exports = m;
}, null);
__d("LegacyMentionsInput.react", ["Bootloader", "CLogConfig", "TypeaheadMetricsConfig", "Event", "Keys", "React", "ReactPropTypes", "cx", "PlaceholderListener"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    b('PlaceholderListener');
    var o = l.createClass({displayName: 'ReactLegacyMentionsInput', propTypes: {initialData: m.object, placeholder: m.string, datasource: m.object, ref: m.string, viewOptionsTypeObjects: m.object, viewOptionsTypeObjectsOrder: m.array, hashtags: m.bool, autoflip: m.bool, onEnterSubmit: m.func, onFocus: m.func, onBlur: m.func, onTypingStateChange: m.func, onPaste: m.func}, componentDidMount: function () {
        this.props.initialData && this._initializeTextarea(this.getDOMNode());
    }, hasEnteredText: function () {
        return !!(this._mentionsInput && this._mentionsInput.getValue().trim());
    }, submitComment: function (event) {
        var p;
        if (event) {
            p = event.target.value && event.target.value.trim();
        } else {
            var q = this.refs.textarea.getDOMNode();
            if (q.value && q.value !== q.placeholder)p = q.value;
        }
        p = p || '';
        var r = {visibleValue: p, encodedValue: p};
        if (this._mentionsInput)r.encodedValue = this._mentionsInput.getRawValue().trim();
        var s = this.props.onEnterSubmit(r, event);
        if (s && this._mentionsInput) {
            this._mentionsInput.reset();
            event && event.preventDefault();
        }
    }, _handleKeydown: function (event) {
        var p = event.nativeEvent, q = j.getKeyCode(p) == k.RETURN && !j.$E(p).getModifiers().any, r = this._mentionsInput && this._mentionsInput.getTypeahead().getView().getSelection();
        if (this.props.onEnterSubmit && q && !r)this.submitComment(event);
    }, _handleFocus: function () {
        this.props.onFocus && this.props.onFocus();
        this._initializeTextarea(this.refs.root.getDOMNode());
    }, _handleBlur: function () {
        this.props.onBlur && this.props.onBlur();
    }, _initializeTextarea: function (p) {
        if (this._mentionsInput || this._bootloadingMentions)return;
        this._bootloadingMentions = true;
        g.loadModules(["CompactTypeaheadRenderer", "ContextualTypeaheadView", "CLoggerX", "InputSelection", "MentionsInput", "TextAreaControl", "Typeahead", "TypeaheadAreaCore", "TypeaheadBestName", "TypeaheadHoistFriends", "TypeaheadMetrics", "TypeaheadMetricsX", "TypingDetector", "UFIComments"], function (q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da) {
            var ea = this.refs.textarea.getDOMNode();
            new v(ea);
            if (h.gkResults) {
                var fa = da.getComment(this.props.replyCommentID), ga = fa ? fa.fbid : null;
                s.trackMentionsInput(ea, ga);
            }
            if (this.props.onTypingStateChange) {
                var ha = new ca(ea);
                ha.init();
                ha.subscribe('change', this.props.onTypingStateChange);
            }
            var ia = {autoSelect: true, renderer: q, causalElement: ea, autoflip: this.props.autoflip};
            if (this.props.viewOptionsTypeObjects)ia.typeObjects = this.props.viewOptionsTypeObjects;
            if (this.props.viewOptionsTypeObjectsOrder)ia.typeObjectsOrder = this.props.viewOptionsTypeObjectsOrder;
            var ja = new w(this.props.datasource, {ctor: r, options: ia}, {ctor: x}, this.refs.typeahead.getDOMNode()), ka = [y, z];
            if (i.gkResults) {
                var la = new ba({extraData: {event_name: 'mention_metric_x'}});
                la.init(ja);
            }
            var ma = new aa({extraData: {event_name: 'mentions', from_location: 'comments'}});
            w.initNow(ja, ka, ma);
            this._mentionsInput = new u(p, ja, ea, {hashtags: this.props.hashtags});
            this._mentionsInput.init({}, this.props.initialData);
            if (this.props.initialData)t.set(ea, ea.value.length);
            if (this.props.onPaste)j.listen(ea, 'paste', this.props.onPaste);
            this._bootloadingMentions = false;
        }.bind(this));
    }, focus: function () {
        try {
            this.refs.textarea.getDOMNode().focus();
        } catch (p) {
        }
    }, render: function () {
        var p = (("textInput") + (' ' + "mentionsTextarea") + (' ' + "uiTextareaAutogrow") + (' ' + "uiTextareaNoResize") + (' ' + "UFIAddCommentInput") + (' ' + "DOMControl_placeholder"));
        return (l.createElement(l.DOM.div, {ref: "root", className: "uiMentionsInput textBoxContainer ReactLegacyMentionsInput"}, l.createElement(l.DOM.div, {className: "highlighter"}, l.createElement(l.DOM.div, null, l.createElement(l.DOM.span, {className: "highlighterContent hidden_elem"}))), l.createElement(l.DOM.div, {ref: "typeahead", className: "uiTypeahead mentionsTypeahead"}, l.createElement(l.DOM.div, {className: "wrap"}, l.createElement(l.DOM.input, {type: "hidden", autoComplete: "off", className: "hiddenInput"}), l.createElement(l.DOM.div, {className: "innerWrap"}, l.createElement(l.DOM.textarea, {ref: "textarea", name: "add_comment_text", className: p, title: this.props.placeholder, placeholder: this.props.placeholder, onFocus: this._handleFocus, onBlur: this._handleBlur, onKeyDown: this._handleKeydown, defaultValue: this.props.placeholder})))), l.createElement(l.DOM.input, {type: "hidden", autoComplete: "off", className: "mentionsHidden", defaultValue: ""})));
    }});
    e.exports = o;
}, null);
__d("UFIClassNames", ["cx"], function (a, b, c, d, e, f, g) {
    e.exports = {ACTOR_IMAGE: "img UFIActorImage _54ru", ROW: "UFIRow", UNSEEN_ITEM: "UFIUnseenItem"};
}, null);
__d("UFIImageBlock.react", ["ImageBlock.react", "React", "cx"], function (a, b, c, d, e, f, g, h, i) {
    var j = h.createClass({displayName: 'UFIImageBlock', render: function () {
        return (h.createElement(g, Object.assign({}, this.props, {imageClassName: "UFIImageBlockImage", contentClassName: "UFIImageBlockContent"}), this.props.children));
    }});
    e.exports = j;
}, null);
__d("UFIStickerButton.react", ["Bootloader", "ContextualLayerAutoFlip", "React", "ReactLayeredComponentMixin", "StickerConstants", "UFIConfig", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = i.createClass({displayName: 'UFIStickerButton', propTypes: {onStickerSelected: i.PropTypes.func.isRequired}, mixins: [j], getInitialState: function () {
        var p = l.stickerSearch ? k.SEARCH_PACK_ID : k.MRU_STICKER_PACK;
        return {renderFlyout: null, flyoutShown: false, packID: p};
    }, render: function () {
        var p = "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u0435\u0441\u044c \u043d\u0430\u043a\u043b\u0435\u0439\u043a\u043e\u0439";
        return (i.createElement(i.DOM.div, {'aria-label': p, className: "UFICommentStickerButton", 'data-hover': "tooltip", 'data-tooltip-alignh': "center", onClick: this._onLinkClicked, onMouseDown: this._prepareForClick, ref: "link"}, i.createElement(i.DOM.div, {className: "UFICommentStickerIcon"})));
    }, renderLayers: function () {
        return !this.state.renderFlyout ? {} : this.state.renderFlyout();
    }, _hideFlyout: function () {
        this.setState({flyoutShown: false});
    }, _prepareForClick: function () {
        this._clickGuard = this.state.flyoutShown;
    }, _onLinkClicked: function () {
        if (this.state.renderFlyout !== null) {
            !this._clickGuard && this.setState({flyoutShown: true});
            return;
        }
        g.loadModules(["XUIContextualDialog.react", "StickersFlyout.react"], function (p, q) {
            this.setState({flyoutShown: true, renderFlyout: function () {
                return {contextualDialog: i.createElement(p, {alignment: "right", behaviors: {flip: h}, className: "_5e-r", contextRef: "link", onBlur: this._hideFlyout, position: "above", shown: this.state.flyoutShown, hasActionableContext: true, width: 278}, i.createElement(i.DOM.div, null, i.createElement(q, {onPackSelect: function (r) {
                    this.setState({packID: r});
                }.bind(this), onStickerSelect: this._onStickerSelected, onEmoticonSelect: this._onEmoticonSelected, isComments: true, packID: this.state.packID, shown: this.state.flyoutShown})))};
            }.bind(this)});
        }.bind(this));
    }, _onStickerSelected: function (p, event) {
        this.props.onStickerSelected(p, event);
        this._hideFlyout();
    }, _onEmoticonSelected: function (p) {
        this.props.onEmoticonSelected(p);
        this._hideFlyout();
    }});
    e.exports = o;
}, null);
__d("XFeedNUXSaveSeenStateControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/feed\/nux\/seen\/save\/", {link_id: {type: "String"}, key: {type: "String", required: true}, seen: {type: "Bool"}});
}, null);
__d("UFIAddComment.react", ["ActorURI", "AsyncRequest", "Bootloader", "ClipboardPhotoUploader", "CloseButton.react", "DOM", "DOMContainer.react", "getActiveElement", "Event", "Focus", "HTML", "Keys", "LegacyMentionsInput.react", "Link.react", "LitestandStoryInsertionStatus", "LoadingIndicator.react", "React", "ReactLayeredComponentMixin", "Run", "SnowflakePermalinkUtils", "Sticker.react", "TrackingNodes", "UFIClassNames", "UFIConfig", "UFIImageBlock.react", "UFIStickerButton.react", "URI", "XFeedNUXSaveSeenStateControllerURIBuilder", "cx", "fbt", "joinClasses", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la) {
    var ma = "\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 ...", na = "\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043e\u0442\u0432\u0435\u0442...", oa = "fcg fss UFICommentTip", pa = 19, qa = '/ajax/ufi/upload/', ra = 80, sa = '/ajax/ufi/sticker_preview/', ta = w.createClass({displayName: 'UFIAddComment', mixins: [x], propTypes: {contextArgs: w.PropTypes.object.isRequired, viewerActor: w.PropTypes.object.isRequired, allowPhotoAttachments: w.PropTypes.bool, allowStickerAttachments: w.PropTypes.bool, attachedPhoto: w.PropTypes.object, attachedSticker: w.PropTypes.object, hide: w.PropTypes.bool, initialData: w.PropTypes.object, isEditing: w.PropTypes.bool, isFirstComponent: w.PropTypes.bool, isLastComponent: w.PropTypes.bool, isQAndA: w.PropTypes.bool, mentionsDataSource: w.PropTypes.object, onCancel: w.PropTypes.func, onCommentSubmit: w.PropTypes.func, onTypingStateChange: w.PropTypes.func, replyCommentID: w.PropTypes.string, showSendOnEnterTip: w.PropTypes.bool, subtitle: w.PropTypes.any, targetID: w.PropTypes.string, withoutSeparator: w.PropTypes.bool}, getInitialState: function () {
        if (this.props.attachedPhoto)this.props.contextArgs.attachedphoto = this.props.attachedPhoto;
        if (this.props.attachedSticker)this.props.contextArgs.attachedsticker = this.props.attachedSticker;
        return {attachedPhoto: this.props.attachedPhoto ? this.props.attachedPhoto : null, attachedSticker: this.props.attachedSticker ? this.props.attachedSticker : null, broadcastRequestTokenizer: null, fileInput: null, fileUploader: null, isCommenting: false, isLoadingPhoto: false, isRecommending: false, recommendationEntries: [], renderStickerNUX: null, searchSource: null, stickerNUXVisible: false};
    }, _onKeyDown: function (event) {
        if (this.props.isEditing && o.getKeyCode(event.nativeEvent) === r.ESC)this.props.onCancel();
        if (this.isMounted() && !this._isOnBeforeUnloadListenerAdded) {
            y.onBeforeUnload(this._handleUnsavedChanges);
            this._isOnBeforeUnloadListenerAdded = true;
        }
        var ua = n();
        if (o.getKeyCode(event.nativeEvent) === r.ESC)ua.blur();
    }, _handleUnsavedChanges: function () {
        var ua = a.PageTransitions;
        if (ua) {
            var va = ga.getNextURI(), wa = ua.getMostRecentURI();
            if (va.getQueryData().hasOwnProperty('theater') || wa.getQueryData().hasOwnProperty('theater') || z.isPermalinkURI(va) || z.isPermalinkURI(wa))return;
            var xa = a.DialogNavigationStack;
            if (xa && xa.isActiveURI(va))return;
        }
        if (this.refs && this.refs.mentionsinput && this.refs.mentionsinput.hasEnteredText())return "\u0412\u044b \u043d\u0435 \u0437\u0430\u043a\u043e\u043d\u0447\u0438\u043b\u0438 \u0441\u0432\u043e\u0439 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439. \u0425\u043e\u0442\u0438\u0442\u0435 \u0432\u044b\u0439\u0442\u0438, \u043d\u0430 \u0437\u0430\u043a\u043e\u043d\u0447\u0438\u0432?";
    }, _blur: function () {
        this.setState({stickerNUXVisible: false});
        if (this.refs.mentionsinput && this.refs.mentionsinput.hasEnteredText())return;
        this.setState({isCommenting: false});
    }, _onPaste: function (event) {
        var ua = new j(qa, this._getPhotoUploadData());
        this._cancelCurrentSubscriptions();
        this._subscriptions = [ua.subscribe('upload_start', this._prepareForAttachedPhotoPreview), ua.subscribe('upload_error', this._onRemoveAttachedPhotoPreviewClicked), ua.subscribe('upload_success', function (va, wa) {
            this._onPhotoUploadComplete(wa);
        }.bind(this))];
        ua.handlePaste(event);
    }, _onEnterSubmit: function (ua, event) {
        var va = this.state.attachedPhoto || this.state.attachedSticker || this.state.recommendationEntries.length, wa = this.props.isEditing || va;
        if (this.state.isLoadingPhoto) {
            return false;
        } else if (!ua.encodedValue.trim() && !wa)return false;
        if (va) {
            if (this.state.recommendationEntries.length) {
                var xa = [], ya = [];
                this.state.recommendationEntries.forEach(function (za) {
                    xa.push(za.getUniqueID());
                    ya.push(za.getTitle());
                });
                ua.recommendationIDs = xa;
                if (ya.length)ua.visibleValue += ' \u2014 ' + ya.join(', ');
            }
            this.setState({isLoadingPhoto: false, isRecommending: false, attachedPhoto: null, attachedSticker: null, recommendationEntries: []});
            ua.attachedPhoto = this.props.contextArgs.attachedphoto;
            ua.attachedSticker = this.props.contextArgs.attachedsticker;
        } else {
            ua.attachedPhoto = null;
            ua.attachedSticker = null;
        }
        this.props.onCommentSubmit(ua, event);
        return true;
    }, _cancelCurrentSubscriptions: function () {
        if (this._subscriptions)this._subscriptions.forEach(function (ua) {
            ua.unsubscribe();
        });
    }, componentWillMount: function () {
        this._isOnBeforeUnloadListenerAdded = false;
        this._storyInsertionBlocker = u.registerBlocker(function () {
            return this.state.isCommenting;
        }.bind(this));
        if (this.props.contextArgs.canaddrecommendation)i.loadModules(["BroadcastRequestTokenizer.react", "BroadcastRequestParam", "WebAsyncSearchSource", "XBroadcastRequestSearchSourceControllerURIBuilder"], function (ua, va, wa, xa) {
            var ya = new xa().setString(va.SOURCE_OBJ_ID, this.props.contextArgs.ftentidentifier).getURI(), za = new wa({bootstrapRequests: [
                {uri: ya}
            ], getAllForEmptyQuery: true, queryRequests: [
                {uri: ya}
            ]});
            this.setState({broadcastRequestTokenizer: ua, searchSource: za});
        }.bind(this));
    }, componentWillUnmount: function () {
        this._cancelCurrentSubscriptions();
        this._storyInsertionBlocker && this._storyInsertionBlocker.unsubscribe();
        this._storyInsertionBlocker = null;
    }, focus: function () {
        var ua = {isCommenting: true};
        if (this.props.allowStickerAttachments && da.shouldShowStickerNUX) {
            var va = new ha().setString('key', 'sticker_comments').setBool('seen', true).getURI();
            new h(va).send();
            if (this.state.renderStickerNUX === null)i.loadModules(["XUIAmbientNUX.react"], function (wa) {
                ua.renderStickerNUX = function () {
                    return {ambientNUX: w.createElement(wa, {contextRef: "sticker_button", shown: this.state.stickerNUXVisible, position: "above", width: "auto", alignment: "right", onCloseButtonClick: this._hideStickerNUX}, "\u0422\u0435\u043f\u0435\u0440\u044c \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043d\u0430\u043a\u043b\u0435\u0439\u043a\u0430\u043c\u0438!")};
                }.bind(this);
            }.bind(this));
            da.shouldShowStickerNUX = false;
            ua.stickerNUXVisible = true;
        }
        this.setState(ua);
    }, renderLayers: function () {
        return !this.state.renderStickerNUX ? {} : this.state.renderStickerNUX();
    }, render: function () {
        var ua = !this.props.contextArgs.collapseaddcomment || this.state.isCommenting, va = null;
        if (this.props.subtitle) {
            va = w.createElement(w.DOM.span, {className: oa}, this.props.subtitle);
        } else if (this.props.isEditing) {
            va = w.createElement(w.DOM.span, {className: oa}, ja._("\u041d\u0430\u0436\u043c\u0438\u0442\u0435 Esc \u0434\u043b\u044f {cancel}.", [ja.param("cancel", w.createElement(t, {onClick: this.props.onCancel}, "\u043e\u0442\u043c\u0435\u043d\u0438\u0442\u044c"))]));
        } else if (this.props.showSendOnEnterTip)va = w.createElement(w.DOM.span, {className: oa}, "\u041e\u043f\u0443\u0431\u043b\u0438\u043a\u0443\u0439\u0442\u0435 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439, \u043d\u0430\u0436\u0430\u0432 \u043a\u043b\u0430\u0432\u0438\u0448\u0443 \"Enter\".");
        var wa = null, xa = null, ya = this.state.attachedPhoto || this.state.attachedSticker, za = null;
        if (this.props.allowStickerAttachments && !ya) {
            var ab = this.props.isEditing ? this._prepareForAttachedStickerPreview : this.onStickerSelected;
            xa = w.createElement(fa, {ref: "sticker_button", onStickerSelected: ab, onEmoticonSelected: this._insertEmoticonIntoCommentText});
        }
        if (this.props.allowPhotoAttachments) {
            za = this._onPaste;
            var bb = ya ? "UFICommentPhotoAttachedIcon" : "UFICommentPhotoIcon", cb = "UFIPhotoAttachLinkWrapper _m";
            wa = w.createElement(w.DOM.div, {ref: "PhotoInputContainer", className: cb, 'data-hover': "tooltip", 'data-tooltip-alignh': "center", 'aria-label': "\u041f\u0440\u0438\u043a\u0440\u0435\u043f\u0438\u0442\u044c \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u044e"}, w.createElement(w.DOM.i, {ref: "PhotoInputControl", className: bb}));
        }
        var db = ba.getTrackingInfo(ba.types.ADD_COMMENT_BOX), eb = ka(ca.ACTOR_IMAGE, ((!ua ? "hidden_elem" : ''))), fb = w.createElement(w.DOM.div, {className: "UFIReplyActorPhotoWrapper", onClick: this.focus}, w.createElement(w.DOM.img, {className: eb, src: this.props.viewerActor.thumbSrc, alt: this.props.viewerActor.name})), gb = ka(ca.ROW, ((this.props.hide ? "noDisplay" : '') + (' ' + "UFIComponent") + (' ' + "UFIAddComment") + (this.props.allowPhotoAttachments ? ' ' + "UFIAddCommentWithPhotoAttacher" : '') + (this.props.withoutSeparator ? ' ' + "UFIAddCommentWithoutSeparator" : '') + (this.props.isFirstComponent ? ' ' + "UFIFirstComponent" : '') + (this.props.isLastComponent ? ' ' + "UFILastComponent" : ''))), hb;
        if (!!this.props.replyCommentID) {
            hb = na;
        } else if (this.props.isQAndA) {
            hb = "\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043e\u043f\u0440\u043e\u0441 ...";
        } else hb = ma;
        var ib = this.props.contextArgs.viewoptionstypeobjects, jb = this.props.contextArgs.viewoptionstypeobjectsorder, kb = null;
        if (this.state.attachedSticker) {
            var lb = this._getScaledDimensions(ya.metadata.height, ya.metadata.width);
            kb = w.createElement(aa, {animationTrigger: "load_and_hover", frameCount: ya.metadata.frameCount, framesPerCol: ya.metadata.framesPerCol, framesPerRow: ya.metadata.framesPerRow, spriteURI: ya.metadata.sprite_uri, sourceHeight: lb.height, sourceURI: ya.metadata.source_uri, sourceWidth: lb.width});
        } else if (this.state.attachedPhoto) {
            var mb = ya.markupPreview;
            if (q.isHTML(mb.markup))mb = q.replaceJSONWrapper(mb.markup).getRootNode();
            kb = w.createElement(m, null, mb);
            if (!this.props.subtitle)va = null;
        } else if (this.state.isLoadingPhoto)kb = w.createElement(v, {color: "white", className: "UFICommentPhotoAttachedPreviewLoadingIndicator", size: "medium"});
        var nb, ob = this.state.attachedPhoto ? this._onRemoveAttachedPhotoPreviewClicked : this._onRemoveAttachedStickerPreviewClicked;
        if (kb != null) {
            var pb = null;
            if (this.state.attachedSticker) {
                pb = "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043d\u0430\u043a\u043b\u0435\u0439\u043a\u0443";
            } else if (this.state.attachedPhoto)pb = "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u044e";
            nb = w.createElement(w.DOM.div, {className: "UFICommentPhotoAttachedPreview pas"}, kb, w.createElement(k, {tooltip: pb, onClick: ob}));
        }
        var qb = this.props.allowStickerAttachments ? ka("UFIMentionsInputWrap", "UFIStickersEnabledInput") : "UFIMentionsInputWrap", rb, sb, tb;
        if (this.props.contextArgs.mentionsinput) {
            var ub = this.props.contextArgs.mentionsinput;
            rb = ub.inputComponent;
            sb = ub.viewComponent;
            tb = ub.viewProps;
        } else rb = s;
        var vb = null;
        if (this.props.contextArgs.canaddrecommendation)if (this.state.broadcastRequestTokenizer) {
            var wb = this.state.broadcastRequestTokenizer;
            vb = (w.createElement(wb, {active: this.state.isRecommending, entries: this.state.recommendationEntries, onBlur: this._onRecommendationInputBlur, onSubmitAttempt: this._onRecommendationTokenizerSubmit, onTokenChange: this._onRecommendationTokenizerUpdate, onTriggerClick: this._onRecommendationTriggerClick, placeHolder: this.props.contextArgs.broadcastrequestplaceholder, searchSource: this.state.searchSource, sourceID: this.props.contextArgs.ftentidentifier}));
        }
        return (w.createElement(w.DOM.li, {className: gb, onKeyDown: this._onKeyDown, 'data-ft': db}, w.createElement(ea, {className: qb}, fb, w.createElement(w.DOM.div, {className: "UFICommentContainer"}, w.createElement(w.DOM.div, {className: "UFIInputContainer"}, w.createElement(rb, {replyCommentID: this.props.replyCommentID, initialData: this.props.initialData, placeholder: hb, datasource: this.props.mentionsDataSource, ref: "mentionsinput", viewComponent: sb, viewProps: tb, viewOptionsTypeObjects: ib, viewOptionsTypeObjectsOrder: jb, hashtags: this.props.contextArgs.sht, autoflip: this.props.contextArgs.addcommentautoflip, onEnterSubmit: this._onEnterSubmit, onFocus: this.focus, onBlur: this._blur, onTypingStateChange: this.props.onTypingStateChange, onPaste: za}), w.createElement(w.DOM.div, {className: "UFICommentAttachmentButtons clearfix"}, wa, xa)), nb, vb, va))));
    }, _onRecommendationInputBlur: function () {
        if (!this.state.recommendationEntries.length)this.setState({isRecommending: false});
    }, _onRecommendationTokenizerSubmit: function (event) {
        this.refs.mentionsinput.submitComment(event);
    }, _onRecommendationTokenizerUpdate: function (ua) {
        this.setState({recommendationEntries: ua});
    }, _onRecommendationTriggerClick: function () {
        this.setState({isRecommending: true});
    }, componentDidUpdate: function (ua, va, wa) {
        if (!va.attachedPhoto && this.state.attachedPhoto || !va.attachedSticker && this.state.attachedSticker)this.refs.mentionsinput.focus();
        if (ua.viewerActor.id !== this.props.viewerActor.id) {
            if (this.state.fileInput)this.state.fileInput.clear();
            if (this.state.fileUploader)this.state.fileUploader.setData(this._getPhotoUploadData());
            this._onRemoveAttachedPhotoPreviewClicked();
        }
    }, componentDidMount: function () {
        if (!this.props.allowPhotoAttachments)return;
        var ua = this.refs.PhotoInputContainer.getDOMNode(), va = this.refs.PhotoInputControl.getDOMNode(), wa = "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043b \u0434\u043b\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438", xa = l.create('input', {accept: 'image/*', className: "_n", name: 'file', type: 'file', title: wa, 'aria-label': wa});
        l.appendContent(va, xa);
        var ya = o.listen(ua, 'click', function (event) {
            i.loadModules(["FileInput", "FileInputUploader", "Input"], function (za, ab, bb) {
                var cb = new za(ua, va, xa), db = new ab(undefined, ua).setURI(qa).setData(this._getPhotoUploadData());
                cb.subscribe('change', function (event) {
                    if (cb.getValue()) {
                        this._prepareForAttachedPhotoPreview();
                        db.setInput(cb.getInput()).send();
                    }
                }.bind(this));
                db.subscribe('success', function (eb, fb) {
                    cb.clear();
                    this._onPhotoUploadComplete(fb.response);
                }.bind(this));
                db.subscribe('failure', function (eb, fb) {
                    cb.clear();
                    this._onPhotoUploadComplete(fb.response);
                }.bind(this));
                p.setWithoutOutline(va);
                this.setState({fileInput: cb, fileUploader: db});
            }.bind(this));
            ya.remove();
        }.bind(this));
    }, insertMention: function (ua) {
        if (this.refs.mentionsinput && this.refs.mentionsinput.insertMention)this.refs.mentionsinput.insertMention(ua);
    }, _getScaledDimensions: function (ua, va) {
        var wa, xa, ya;
        if (va > ua) {
            ya = ra / va;
            wa = ua * ya;
            xa = va * ya;
        } else {
            ya = ra / ua;
            wa = ua * ya;
            xa = va * ya;
        }
        return {height: Math.round(wa), width: Math.round(xa)};
    }, _getPhotoUploadData: function () {
        var ua = this.props.viewerActor.id, va = {profile_id: ua, target_id: this.props.targetID, source: pa};
        va[g.PARAMETER_ACTOR] = ua;
        return va;
    }, _onPhotoUploadComplete: function (ua) {
        if (!this.state.isLoadingPhoto)return;
        var va = ua.getPayload();
        if (va && va.fbid) {
            this.props.contextArgs.attachedphoto = va;
            this.setState({attachedPhoto: va, isLoadingPhoto: false});
        } else this._onRemoveAttachedPhotoPreviewClicked(null);
    }, _onRemoveAttachedPhotoPreviewClicked: function (event) {
        this.props.contextArgs.attachedphoto = null;
        this.setState({attachedPhoto: null, isLoadingPhoto: false});
    }, _prepareForAttachedPhotoPreview: function () {
        this.props.contextArgs.attachedphoto = null;
        this.setState({attachedPhoto: null, isLoadingPhoto: true});
    }, _onStickerUploadComplete: function (ua) {
        if (!this.state.isLoadingPhoto)return;
        var va = ua.getPayload();
        if (va && va.fbid) {
            this.props.contextArgs.attachedsticker = va;
            this.setState({attachedSticker: va, isLoadingPhoto: false});
        } else {
            i.loadModules(["Dialog"], function (wa) {
                var xa = "Sticker Failed", ya = "There was a problem attaching the sticker.";
                new wa().setTitle(xa).setBody(ya).setButtons(wa.OK).show();
            });
            this._onRemoveAttachedStickerPreviewClicked(null);
        }
    }, _onRemoveAttachedStickerPreviewClicked: function (event) {
        this.props.contextArgs.attachedsticker = null;
        this.setState({attachedSticker: null, isLoadingPhoto: false});
    }, _prepareForAttachedStickerPreview: function (ua) {
        this.props.contextArgs.attachedsticker = null;
        this.setState({attachedSticker: null, isLoadingPhoto: true});
        new h(sa).setData({sticker_id: ua}).setErrorHandler(this._onRemoveAttachedStickerPreviewClicked).setHandler(this._onStickerUploadComplete).send();
    }, onStickerSelected: function (ua, event) {
        var va = {encodedValue: '', visibleValue: ''};
        this.props.contextArgs.attachedsticker = {fbid: ua};
        this.props.onCommentSubmit(va, event);
    }, _insertEmoticonIntoCommentText: function (ua) {
        i.loadModules(["EmoticonsList", "EmoticonUtils", "TextAreaControl", "SelectionPosition"], function (va, wa, xa, ya) {
            var za = va.symbols[ua];
            if (!za)return;
            if (this.props.contextArgs.mentionsinput) {
                this.refs.mentionsinput.insertEmoticon(za);
                return;
            }
            if (!this._selectionPosition)this._selectionPosition = new ya(this.refs.mentionsinput.refs.textarea.getDOMNode());
            var ab = this.refs.mentionsinput.refs.textarea.getDOMNode(), bb = xa.getInstance(ab), cb = bb.getValue(), db = wa.insertEmoticon(za, cb, this._selectionPosition.getPos());
            bb.setValue(db.result);
            this._selectionPosition.setPos(db.start, db.end);
        }.bind(this));
    }, _hideStickerNUX: function () {
        this.setState({stickerNUXVisible: false});
    }});
    e.exports = ta;
}, null);
__d("UFIAddCommentController", ["Arbiter", "copyProperties", "MentionsInputUtils", "Parent", "UFIAddComment.react", "React", "ShortProfiles", "UFICentralUpdates", "UFIComments", "UFIFeedbackTargets", "UFIInstanceState", "UFIUserActions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    function s(t, u, v, w) {
        this.id = u;
        this._ufiInstanceID = w.instanceid;
        this._contextArgs = w;
        this._replyCommentID = v;
        if (t) {
            this.root = t;
            if (!this._contextArgs.rootid)this._contextArgs.rootid = t.id;
            this.render();
            n.subscribe('instance-updated', function (x, y) {
                var z = y.updates;
                if (this._ufiInstanceID in z)this.render();
            }.bind(this));
            n.subscribe('feedback-updated', function (x, y) {
                var z = y.updates;
                if (this.id in z)this.render();
            }.bind(this));
        }
        n.subscribe('feedback-id-changed', function (x, y) {
            var z = y.updates;
            if (this.id in z)this.id = z[this.id];
        }.bind(this));
    }

    h(s.prototype, {_onCommentSubmit: function (t, event) {
        r.addComment(this.id, t.visibleValue, t.encodedValue, {source: this._contextArgs.source, ufiinstanceid: this._ufiInstanceID, target: event.target, replyid: this._replyCommentID, timelinelogdata: this._contextArgs.timelinelogdata, rootid: this._contextArgs.rootid, attachedphoto: this._contextArgs.attachedphoto, attachedsticker: this._contextArgs.attachedsticker, giftoccasion: this._contextArgs.giftoccasion, recommendationIDs: t.recommendationIDs});
        this._contextArgs.attachedphoto = null;
        this._contextArgs.attachedsticker = null;
        p.getFeedbackTarget(this.id, function (u) {
            var v = j.byTag(this.root, 'form');
            if (v)g.inform('ufi/comment', {form: v, isranked: u.isranked});
        }.bind(this));
        return false;
    }, _onTypingStateChange: function (t, u) {
    }, renderAddComment: function (t, u, v, w, x, y, z, aa, ba, ca) {
        var da = this._contextArgs.logtyping ? this._onTypingStateChange.bind(this) : null, ea = null, fa = q.getKeyForInstance(this._ufiInstanceID, 'isediting') && !this._replyCommentID;
        return (l.createElement(k, {hide: fa, replyCommentID: this._replyCommentID, viewerActor: t, targetID: u, initialData: ea, ref: x, withoutSeparator: y, onCommentSubmit: this._onCommentSubmit.bind(this), mentionsDataSource: v, onTypingStateChange: da, showSendOnEnterTip: w, allowPhotoAttachments: aa, allowStickerAttachments: ba, source: this._contextArgs.source, contextArgs: this._contextArgs, subtitle: z, isQAndA: ca}));
    }, renderEditComment: function (t, u, v, w, x, y, z, aa, ba) {
        var ca = o.getComment(v), da;
        if (ca.attachment)da = ca.attachment.type == 'sticker' ? ca.attachment : null;
        var ea = i.generateDataFromTextWithEntities(ca.body);
        return (l.createElement(k, {viewerActor: t, targetID: u, initialData: ea, onCommentSubmit: x, onCancel: y, mentionsDataSource: w, source: this._contextArgs.source, contextArgs: this._contextArgs, isEditing: true, editingCommentID: v, attachedPhoto: ca.photo_comment, attachedSticker: da, allowPhotoAttachments: z, allowStickerAttachments: aa, isQAndA: ba}));
    }, render: function () {
        if (!this.root)throw new Error('render called on UFIAddCommentController with no root');
        p.getFeedbackTarget(this.id, function (t) {
            if (t.cancomment && t.actorforpost)m.get(t.actorforpost, function (u) {
                var v = this.renderAddComment(u, t.ownerid, t.mentionsdatasource, t.showsendonentertip, null, null, t.subtitle, t.allowphotoattachments, t.allowstickerattachments, t.isqanda);
                this._addComment = l.renderComponent(v, this.root);
            }.bind(this));
        }.bind(this));
    }});
    e.exports = s;
}, null);
__d("UFIAddCommentLink.react", ["React", "UFIClassNames", "cx", "fbt", "joinClasses", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = g.createClass({displayName: 'UFIAddCommentLink', propTypes: {'data-ft': g.PropTypes.string, isFirstCommentComponent: g.PropTypes.bool, isFirstComponent: g.PropTypes.bool, isLastCommentComponent: g.PropTypes.bool, isLastComponent: g.PropTypes.bool, isQAndA: g.PropTypes.bool, onClick: g.PropTypes.func}, render: function () {
        var n = k(h.ROW, (("UFIAddCommentLink") + (this.props.isFirstCommentComponent ? ' ' + "UFIFirstCommentComponent" : '') + (this.props.isLastCommentComponent ? ' ' + "UFILastCommentComponent" : '') + (this.props.isFirstComponent ? ' ' + "UFIFirstComponent" : '') + (this.props.isLastComponent ? ' ' + "UFILastComponent" : ''))), o;
        if (this.props.isQAndA) {
            o = "\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043e\u043f\u0440\u043e\u0441 ...";
        } else o = "\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 ...";
        return (g.createElement(g.DOM.li, {className: n, 'data-ft': this.props['data-ft']}, g.createElement(g.DOM.a, {className: "UFICommentLink", onClick: this.props.onClick, href: "#", role: "button"}, o)));
    }});
    e.exports = m;
}, null);
__d("URITruncator", ["URI", "tx"], function (a, b, c, d, e, f, g, h) {
    var i = 3;

    function j(k, l) {
        var m = "...", n = m.length;
        if (!k || l === undefined || k.length <= l || l <= n || k.toString().length <= n)return k;
        if (!g.isValidURI(k))return k.substring(0, l - n) + m;
        var o = new g(k), p = o.getOrigin();
        if (p.length > l - n)return p.substring(0, l - n) + m;
        var q = false;
        if (!!o.getFragment()) {
            q = true;
            o.setFragment('');
            if (o.toString().length <= l - n)return o.toString() + m;
        }
        var r = o.getQueryData();
        if (r) {
            var s = Object.keys(r);
            if (s.length > 0) {
                q = true;
                for (var t = s.length - 1; t >= 0; t--) {
                    o.removeQueryData(s[t]);
                    if (o.toString().length <= l - n)return o.toString() + m;
                }
            }
        }
        var u = o.getPath() + (q ? m : ''), v = u.split('/'), w = (p.length + u.length) - l, x = 0;
        while (w > 0 && v.length > x + 1) {
            var y = x + 1, z = v[y];
            if (w + n + i <= z.length) {
                var aa = z.length - 1, ba = z.length - w - n, ca = /[a-zA-Z0-9]/;
                w += n;
                while (w > 0) {
                    while (aa > 0 && ca.test(z[aa])) {
                        aa--;
                        w--;
                    }
                    while (aa > 0 && !ca.test(z[aa])) {
                        aa--;
                        w--;
                    }
                }
                if (aa === 0)aa = ba - 1;
                v[y] = z.substring(0, aa + 1) + m;
            } else {
                x++;
                w -= z.length;
                if (x === 1) {
                    w += n;
                } else w--;
            }
        }
        if (x > 0) {
            if (v[v.length - 1].length === 0 && v.length === x + 2)x++;
            v.splice(1, x, m);
        }
        var da = p + v.join('/');
        if (da.length > l)da = da.substring(0, l - n) + m;
        return da;
    }

    e.exports = j;
}, null);
__d("HovercardLinkInterpolator", ["HovercardLink", "Link.react", "React", "URI", "URITruncator", "WWWBase", "cx", "isRTL"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    function o(p, q, r, s, t, u) {
        var v = q.entity, w = r || (v.external ? '_blank' : null), x, y = ((!v.external ? "profileLink" : '') + (v.weakreference ? ' ' + "weakReference" : '')), z, aa = v.hashtag ? p.substring(1) : p;
        z = n(aa) ? 'rtl' : 'ltr';
        if (v.hashtag) {
            var ba = new j(v.url).setDomain(new j(l.uri).getDomain());
            x = i.createElement(i.DOM.a, {className: "_58cn", dir: z, href: ba.toString()}, i.createElement(i.DOM.span, {className: "_58cl"}, p.substring(0, 1)), i.createElement(i.DOM.span, {className: "_58cm"}, p.substring(1)));
        } else if (v.weakreference) {
            x = i.createElement(h, {className: y, dir: z, href: v, target: w}, i.createElement(i.DOM.i, {className: "UFIWeakReferenceIcon"}), p);
        } else {
            if (u && v.external)p = k(p, u);
            x = i.createElement(h, {className: y, dir: z, href: v, target: w}, p);
        }
        if (!v.external && !v.hashtag && !v.photo)x.props['data-hovercard'] = g.constructEndpointWithGroupAndLocation(v, s, t).toString();
        return x;
    }

    e.exports = o;
}, null);
__d("SeeMore.react", ["React", "cx", "tx"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.createClass({displayName: 'SeeMore', getInitialState: function () {
        return {isCollapsed: true};
    }, handleClick: function () {
        this.setState({isCollapsed: false});
    }, render: function () {
        var k = this.state.isCollapsed, l = k ? g.createElement(g.DOM.span, {className: "_5uzb"}, "...") : null, m = this.props.children[0], n = k ? null : g.createElement(g.DOM.span, null, this.props.children[1]), o = !k ? null : g.createElement(g.DOM.a, {className: "_5v47 fss", onClick: this.handleClick, href: "#", role: "button"}, "\u0415\u0449\u0435");
        return (g.createElement(g.DOM.span, {className: this.props.className}, m, l, o, n));
    }});
    e.exports = j;
}, null);
__d("partitionTextAndRanges", [], function (a, b, c, d, e, f) {
    function g(j, k) {
        var l = j.offset + j.length;
        return k > j.offset && k < l;
    }

    function h(j, k) {
        for (var l = 0; l < j.length; l++) {
            var m = j[l];
            if (g(m, k))return m.offset;
        }
        return k;
    }

    var i = function (j, k, l) {
        var m = [], n = [], o = h(k, l);
        for (var p = 0; p < k.length; p++) {
            var q = k[p];
            if (q.offset < o) {
                m.push(q);
            } else n.push({offset: q.offset - o, length: q.length, entity: q.entity});
        }
        return {before: {ranges: m, text: j.substr(0, o)}, after: {ranges: n, text: j.substr(o)}};
    };
    e.exports = i;
}, null);
__d("UFIActor.react", ["Badge.react", "Focus", "HovercardLink", "Locale", "React", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = " \u00b7 ", n = k.createClass({displayName: 'UFIActor', propTypes: {author: k.PropTypes.object.isRequired, 'data-ft': k.PropTypes.string, focusOnMount: k.PropTypes.bool, showHovercard: k.PropTypes.bool}, componentDidMount: function () {
        if (this.props.focusOnMount)h.setWithoutOutline(this.refs.authorName.getDOMNode());
    }, render: function () {
        var o = this.props.author, p = j.isRTL() ? 'rtl' : 'ltr', q = o.uri ? k.createElement(k.DOM.a, {className: "UFICommentActorName", 'data-hovercard': this.props.showHovercard ? i.constructEndpointWithLocation(o, 'ufi').toString() : null, 'data-ft': this.props['data-ft'], dir: p, href: o.uri, ref: "authorName"}, o.name) : k.createElement(k.DOM.span, {className: "UFICommentActorName", dir: p, ref: "authorName"}, o.name);
        return (k.createElement(k.DOM.span, null, q, k.Children.map(this.props.children, function (r) {
            return r ? [r.type == g.type ? "" : m, r] : null;
        })));
    }});
    e.exports = n;
}, null);
__d("UFICommentLikeCount.react", ["NumberFormat", "ProfileBrowserLink", "ProfileBrowserTypes", "React", "URI", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    var m = function (o, p) {
        var q = new k('/ajax/like/tooltip.php').setQueryData({comment_fbid: o.fbid, comment_from: o.author, comment_likecount: o.likecount || 0, comment_id: o.id, cache_buster: o.likeconfirmhash || 0});
        if (p)q.addQueryData({viewas: p});
        return q;
    }, n = j.createClass({displayName: 'UFICommentLikeCount', propTypes: {comment: j.PropTypes.object.isRequired, contextArgs: j.PropTypes.object.isRequired}, render: function () {
        var o = this.props.comment, p = g.formatIntegerWithDelimiter(o.likecount || 0, this.props.contextArgs.numberdelimiter), q = i.LIKES, r = {id: o.fbid}, s = m(this.props.comment, this.props.contextArgs.viewas), t = j.createElement(j.DOM.i, {className: "UFICommentLikeIcon"}), u = j.createElement(j.DOM.span, null, p), v = (("UFICommentLikeButton") + (this.props.comment.hasviewerliked ? ' ' + "UFICommentLikedButton" : ''));
        return (j.createElement(j.DOM.a, {ajaxify: h.constructDialogURI(q, r).toString(), className: v, 'data-hover': "tooltip", 'data-tooltip-alignh': "center", 'data-tooltip-uri': s.toString(), href: h.constructPageURI(q, r).toString(), rel: "dialog", role: "button"}, t, u));
    }});
    e.exports = n;
}, null);
__d("HelpLink.react", ["React", "joinClasses", "TooltipLink.react"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.createClass({displayName: 'HelpLink', render: function () {
        return (g.createElement(i, Object.assign({}, this.props, {className: h(this.props.className, "uiHelpLink mls")}), undefined));
    }});
    e.exports = j;
}, null);
__d("UFICreatorInfo.react", ["HelpLink.react", "React", "URI", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k) {
    "use strict";
    var l = h.createClass({displayName: 'UFICreatorInfo', propTypes: {creatorID: h.PropTypes.number.isRequired, creatorType: h.PropTypes.string.isRequired, creatorName: h.PropTypes.string.isRequired, labelType: h.PropTypes.string.isRequired, pageID: h.PropTypes.number.isRequired, profileURI: h.PropTypes.string}, render: function () {
        var m, n = this.getCreatorLink();
        switch (this.props.labelType) {
            case 'commented':
                m = k._("\u041f\u0440\u043e\u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e {creator}", [k.param("creator", n)]);
                break;
            case 'edited_comment':
                m = k._("\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e {creator}", [k.param("creator", n)]);
                break;
            case 'sent_message':
                m = k._("\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e {creator}", [k.param("creator", n)]);
                break;
            default:
                return;
        }
        return (h.createElement(h.DOM.span, null, m, h.createElement(g, {tooltip: this.getHelpText()})));
    }, getCreatorLink: function () {
        switch (this.props.creatorType) {
            case 'application':
            case 'gray_account':
            case 'indirect_admin':
                return (h.createElement(h.DOM.a, {className: "uiLinkSubtle", 'aria-label': this.getTooltipText(), 'data-hover': "tooltip"}, this.props.creatorName));
            case 'direct_admin':
                return this.getProfileLinkWithHovercard();
            case 'former_admin':
                return (h.createElement(h.DOM.span, {className: "uiLinkSubtle"}, h.createElement(h.DOM.img, {src: "/images/privacy/cant-see.png", width: 9, height: 9, className: "_3-8_"}), this.getProfileLinkWithHovercard()));
            default:
                return (h.createElement(h.DOM.span, {className: "uiLinkSubtle"}, this.props.creatorName));
        }
    }, getTooltipText: function () {
        switch (this.props.creatorType) {
            case 'application':
                return this.getApplicationText();
            case 'gray_account':
                return this.getGrayAccountText();
            case 'indirect_admin':
                return this.getIndirectAdminText();
        }
    }, getProfileLinkWithHovercard: function () {
        if (!this.props.profileURI)return h.createElement(h.DOM.span, null, this.props.creatorName);
        var m = new i('/ajax/hovercard/user.php').setQueryData({id: this.props.creatorID}).addQueryData({type: 'page_admin', extragetparams: JSON.stringify({directed_target_id: this.props.pageID})});
        return (h.createElement(h.DOM.a, {className: "uiLinkSubtle", 'data-hovercard': m, href: this.props.profileURI}, this.props.creatorName));
    }, getApplicationText: function () {
        switch (this.props.labelType) {
            case 'commented':
                return (k._("\u041f\u0440\u043e\u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u043a\u0435\u043c-\u0442\u043e \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e {application}.", [k.param("application", this.props.creatorName)]));
            case 'edited_comment':
                return (k._("\u041e\u0442\u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u0441 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435\u043c {application}.", [k.param("application", this.props.creatorName)]));
            case 'sent_message':
                return (k._("\u042d\u0442\u043e \u0431\u044b\u043b\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u043a\u0435\u043c-\u043b\u0438\u0431\u043e \u0447\u0435\u0440\u0435\u0437 {application}.", [k.param("application", this.props.creatorName)]));
        }
    }, getIndirectAdminText: function () {
        switch (this.props.labelType) {
            case 'commented':
                return (k._("\u041f\u0440\u043e\u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u043a\u0435\u043c-\u0442\u043e \u0441 {page}.", [k.param("page", this.props.creatorName)]));
            case 'edited_comment':
                return (k._("\u041e\u0442\u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u0441 {page}.", [k.param("page", this.props.creatorName)]));
            case 'sent_message':
                return (k._("\u042d\u0442\u043e \u0431\u044b\u043b\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u043a\u0435\u043c-\u043b\u0438\u0431\u043e \u0441 {page}.", [k.param("page", this.props.creatorName)]));
        }
    }, getGrayAccountText: function () {
        switch (this.props.labelType) {
            case 'commented':
                return ("\u041f\u0440\u043e\u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u043a\u0435\u043c-\u0442\u043e, \u0443 \u043a\u043e\u0433\u043e \u043d\u0435\u0442 \u043b\u0438\u0447\u043d\u043e\u0433\u043e \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430 Facebook.");
            case 'edited_comment':
                return ("\u041e\u0442\u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u043a\u0435\u043c-\u0442\u043e, \u0443 \u043a\u043e\u0433\u043e \u043d\u0435\u0442 \u043b\u0438\u0447\u043d\u043e\u0433\u043e \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430 Facebook.");
            case 'sent_message':
                return ("\u042d\u0442\u043e \u0431\u044b\u043b\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u043c, \u0443 \u043a\u043e\u0442\u043e\u0440\u043e\u0433\u043e \u043d\u0435\u0442 \u043b\u0438\u0447\u043d\u043e\u0433\u043e \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430 Facebook.");
        }
    }, getHelpText: function () {
        switch (this.props.labelType) {
            case 'commented':
                return ("\u0422\u043e\u043b\u044c\u043a\u043e \u0442\u0435, \u043a\u0442\u043e \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442 \u044d\u0442\u043e\u0439 \u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0435\u0439, \u043c\u043e\u0433\u0443\u0442 \u0432\u0438\u0434\u0435\u0442\u044c, \u043a\u0442\u043e \u0441\u0434\u0435\u043b\u0430\u043b \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439");
            case 'edited_comment':
                return ("\u0422\u043e\u043b\u044c\u043a\u043e \u0442\u0435, \u043a\u0442\u043e \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442 \u044d\u0442\u043e\u0439 \u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0435\u0439, \u043c\u043e\u0433\u0443\u0442 \u0432\u0438\u0434\u0435\u0442\u044c, \u043a\u0442\u043e \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043b \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439");
            case 'sent_message':
                return ("\u0422\u043e\u043b\u044c\u043a\u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438, \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u044e\u0449\u0438\u0435 \u044d\u0442\u043e\u0439 \u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0435\u0439, \u043c\u043e\u0433\u0443\u0442 \u0432\u0438\u0434\u0435\u0442\u044c, \u043a\u0442\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435");
        }
    }});
    e.exports = l;
}, null);
__d("UFIReplyLink.react", ["React", "tx"], function (a, b, c, d, e, f, g, h) {
    var i = g.createClass({displayName: 'UFIReplyLink', propTypes: {onClick: g.PropTypes.func}, render: function () {
        return (g.createElement(g.DOM.a, {className: "UFIReplyLink", href: "#", onClick: this.props.onClick}, "\u041e\u0442\u0432\u0435\u0442\u0438\u0442\u044c"));
    }});
    e.exports = i;
}, null);
__d("UFICommentActions.react", ["React", "TrackingNodes", "UFICommentLikeCount.react", "UFICommentMetadata.react", "UFIConstants", "UFIReplyLink.react", "UFISpamCount", "cx", "fbt", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    "use strict";
    var q = k.UFIStatus, r = ' \u00b7 ', s = "fsm fwn fcg UFICommentActions", t = "UFIDeletedMessageIcon", u = "UFIDeletedMessage", v = g.createClass({displayName: 'UFICommentActions', propTypes: {comment: g.PropTypes.object.isRequired, contextArgs: g.PropTypes.object.isRequired, feedback: g.PropTypes.object.isRequired, hideAsSpamForPageAdmin: g.PropTypes.bool, markedAsSpamHere: g.PropTypes.bool, onAlsoRecommendToggle: g.PropTypes.func, onCommentLikeToggle: g.PropTypes.func, onCommentReply: g.PropTypes.func, onMarkAsNotSpam: g.PropTypes.func, onPreviewRemove: g.PropTypes.func, onRetrySubmit: g.PropTypes.func, permalink: g.PropTypes.string, shortenTimestamp: g.PropTypes.bool, showPermalink: g.PropTypes.bool, showReplyLink: g.PropTypes.bool, viewerCanMarkNotSpam: g.PropTypes.bool}, render: function () {
        var w = this.props, x = w.comment, y = w.permalink, z = w.feedback, aa = w.markedAsSpamHere, ba = x.status === q.SPAM_DISPLAY, ca = w.showReplyLink, da = w.hideAsSpamForPageAdmin, ea, fa, ga, ha, ia, ja, ka, la = !x.islocal && x.status !== q.LIVE_DELETED;
        if (la) {
            if (ba && !aa) {
                if (w.viewerCanMarkNotSpam)ea = g.createElement(g.DOM.a, {onClick: w.onMarkAsNotSpam, className: "UFICommentNotSpamLink", href: "#", role: "button"}, "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c");
                if (da && z.isthreaded && x.cancomment && ca)ia = g.createElement(l, {comment: x, onClick: w.onCommentReply, contextArgs: w.contextArgs});
            } else {
                if (x.viewercanlike) {
                    var ma = h.getTrackingInfo(x.hasviewerliked ? h.types.UNLIKE_LINK : h.types.LIKE_LINK), na = x.hasviewerliked ? "\u041d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f" : "\u041c\u043d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439";
                    fa = g.createElement(g.DOM.a, {className: "UFILikeLink", 'data-ft': ma, href: "#", onClick: w.onCommentLikeToggle, role: "button", title: na}, x.hasviewerliked ? "\u041d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f" : "\u041d\u0440\u0430\u0432\u0438\u0442\u0441\u044f");
                }
                if ((this.props.contextArgs.simplereply && this.props.feedback.cancomment) || (z.isthreaded && x.cancomment && ca))ia = g.createElement(l, {comment: x, contextArgs: w.contextArgs, onClick: w.onCommentReply});
                if (x.likecount > 0)ga = g.createElement(i, {comment: x, contextArgs: w.contextArgs});
                if (x.spamcount && m.enabled)ha = g.createElement(m, {count: x.spamcount});
            }
            if (w.contextArgs.canaddrecommendation && x.hasrecommendation) {
                var oa = ("\u0422\u0430\u043a\u0436\u0435 \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u043e\u0432\u0430\u0442\u044c \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0438 \u0432 \u044d\u0442\u043e\u043c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438");
                if (x.hasviewerrecommended) {
                    ka = g.createElement(g.DOM.span, null, "\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u043e\u0432\u0430\u043d\u043e");
                } else ka = g.createElement(g.DOM.a, {className: "UFIRecommendLink", href: "#", onClick: w.onAlsoRecommendToggle, role: "button", title: oa}, "\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u043e\u0432\u0430\u0442\u044c");
            }
            if (x.attachment && x.attachment.type == "share" && x.canremove)ja = g.createElement(g.DOM.a, {href: "#", onClick: w.onPreviewRemove, role: "button"}, "\u0423\u0431\u0440\u0430\u0442\u044c \u043f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440");
        }
        var pa = g.createElement(j, {comment: x, onRetrySubmit: w.onRetrySubmit, permalink: y, shortenTimestamp: w.shortenTimestamp, showPermalink: w.showPermalink}), qa;
        if (z.isqanda) {
            qa = {likeCount: ga, spamCount: ha, likeToggle: fa, commentReply: ia, spamToggle: ea, metadata: pa, removePreview: ja};
        } else if (w.contextArgs.entstream) {
            qa = {metadata: pa, likeToggle: fa, likeCount: ga, alsoRecommend: ka, commentReply: ia, spamCount: ha, spamToggle: ea, removePreview: ja};
        } else if (z.isthreaded) {
            qa = {likeToggle: fa, commentReply: ia, spamToggle: ea, removePreview: ja, likeCount: ga, spamCount: ha, metadata: pa};
        } else qa = {metadata: pa, likeToggle: fa, likeCount: ga, alsoRecommend: ka, spamCount: ha, commentReply: ia, spamToggle: ea, removePreview: ja};
        if (x.status === q.LIVE_DELETED) {
            var ra = g.createElement(g.DOM.span, {className: u}, g.createElement(g.DOM.i, {className: t, 'data-hover': "tooltip", 'aria-label': "\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u0443\u0434\u0430\u043b\u0435\u043d"}));
            qa.deletionWarning = ra;
        }
        var sa = true, ta = {};
        for (var ua in qa) {
            var va = qa[ua];
            if (va) {
                ta[ua] = sa ? va : {MIDDOT: r, action: va};
                sa = false;
            }
        }
        return (g.createElement(g.DOM.div, {className: s}, ta));
    }});
    e.exports = v;
}, null);
__d("XUIEditButton.react", ["XUIAbstractGlyphButton.react", "React", "cx", "tx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = h.createClass({displayName: 'XUIEditButton', render: function () {
        var m = this.props.label, n = this.props.title;
        if (!this.props.title && !this.props.tooltip) {
            if (!m)m = "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c";
            n = m;
        }
        return (h.createElement(g, Object.assign({}, this.props, {label: m, title: n, 'aria-label': this.props.tooltip, 'data-hover': this.props.tooltip && 'tooltip', 'data-tooltip-alignh': this.props.tooltip && 'center', className: k(this.props.className, "_5upq _5upr")})));
    }});
    e.exports = l;
}, null);
__d("UFICommentMenu.react", ["Bootloader", "React", "XUICloseButton.react", "XUIEditButton.react", "keyMirror"], function (a, b, c, d, e, f, g, h, i, j, k) {
    "use strict";
    var l, m, n, o, p = k({EDIT: true, CLOSE: true}), q = h.createClass({displayName: 'UFICommentMenu', propTypes: {menuData: h.PropTypes.array, menuType: h.PropTypes.oneOf(Object.keys(p)).isRequired, onAction: h.PropTypes.func, onClick: h.PropTypes.func}, getInitialState: function () {
        return {bootloading: false, bootloaded: false, needsExpand: false};
    }, onClickGuard: function (event) {
        if (this.state.bootloading) {
            return;
        } else if (!this.state.bootloaded && this.props.menuData) {
            this.setState({bootloading: true});
            g.loadModules(["ContextualDialogArrow", "PopoverMenu.react", "ReactXUIMenu"], function (r, s, t) {
                l = r, m = s;
                n = t;
                o = n.Item;
                this.setState({bootloading: false, bootloaded: true, needsExpand: true});
            }.bind(this));
        } else if (this.props.onClick)this.props.onClick(event);
    }, shouldComponentUpdate: function (r, s, t) {
        if (this.state.needsExpand && !s.needsExpand)return false;
        return true;
    }, render: function () {
        var r = null;
        if (this.props.menuType === p.EDIT) {
            r = j;
        } else r = i;
        if (this.props.menuData && this.state.bootloaded) {
            var s = this.props.menuData.map(function (u) {
                return (h.createElement(o, {value: u.value}, u.label));
            }), t = h.createElement(n, {onItemClick: this.props.onAction}, s);
            return (h.createElement(m, Object.assign({}, this.props, {alignh: "right", layerBehaviors: [l], menu: t, ref: "menu"}), h.createElement(r, {href: "#", onClick: this.onClickGuard})));
        }
        return h.createElement(r, Object.assign({}, this.props, {href: "#", onClick: this.onClickGuard}));
    }, componentDidUpdate: function () {
        if (this.state.needsExpand) {
            this.refs.menu.showPopover();
            this.setState({needsExpand: false});
        }
    }});
    q.MenuType = p;
    e.exports = q;
}, null);
__d("UFISocialContext.react", ["HovercardLink", "ProfileBrowserLink", "ProfileBrowserTypes", "React", "URI", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    var m = 27, n = j.createClass({displayName: 'UFISocialContext', propTypes: {commentAuthor: j.PropTypes.object.isRequired, otherMutualCount: j.PropTypes.number.isRequired, topMutualFriend: j.PropTypes.object.isRequired}, render: function () {
        var o = this.props.topMutualFriend, p = this.props.otherMutualCount, q = this.props.commentAuthor, r = g.constructEndpoint(o).toString(), s = j.createElement(j.DOM.a, {href: o.uri, 'data-hovercard': r, key: "top"}, o.name), t = q.name.length + o.name.length, u;
        if (p === 0) {
            u = l._("\u041e\u0431\u0449\u0438\u0439 \u0434\u0440\u0443\u0433 \u2013 {name}", {name: s});
        } else if (t < m) {
            var v;
            if (p == 1) {
                v = "\u0435\u0449\u0435 1";
            } else v = l._("\u0435\u0449\u0435 {count}", {count: p});
            u = l._("\u0414\u0440\u0443\u0436\u0438\u0442 \u0441 {name} \u0438 {others}", {name: s, others: this.getOthersLink(v, q, o)});
        } else {
            var w = l._("{count} \u043e\u0431\u0449\u0438\u0445 \u0434\u0440\u0443\u0437\u0435\u0439", {count: p + 1});
            u = this.getOthersLink(w, q);
        }
        return (j.createElement(j.DOM.span, {className: "UFICommentSocialContext"}, u));
    }, getOthersLink: function (o, p, q) {
        var r = i.MUTUAL_FRIENDS, s = {uid: p.id}, t = new k('/ajax/mutual_friends/tooltip.php').setQueryData({friend_id: p.id});
        if (q)t.addQueryData({exclude_id: q.id});
        var u = h.constructDialogURI(r, s).toString();
        return (j.createElement(j.DOM.a, {ajaxify: u, 'data-hover': "tooltip", 'data-tooltip-alignh': "center", 'data-tooltip-uri': t.toString(), href: h.constructPageURI(r, s).toString(), key: "others", rel: "dialog"}, o));
    }});
    e.exports = n;
}, null);
__d("UFIComment.react", ["Badge.react", "Bootloader", "HovercardLink", "HovercardLinkInterpolator", "InlineStoryInsert", "Locale", "React", "TrackingNodes", "TruncatedTextWithEntities.react", "UFIActor.react", "UFIClassNames", "UFICommentActions.react", "UFICommentAttachment.react", "UFICommentMenu.react", "UFIConfig", "UFIConstants", "UFIImageBlock.react", "UFISocialContext.react", "UFITranslationConstants", "UnicodeBidi", "URI", "XUICloseButton.react", "cx", "joinClasses", "keyMirror", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa) {
    "use strict";
    var ga = v.UFIStatus, ha = ea({edit: true, hide: true, remove: true}), ia = "UFITranslateLink", ja = "UFITranslatedText", ka = "pls", la = "fcg", ma = null, na = function (qa) {
        var ra = qa.status;
        return ra === ga.FAILED_ADD || ra === ga.FAILED_EDIT;
    };

    function oa(qa) {
        return qa.commenterIsFOF !== undefined && qa.userIsMinor !== undefined && qa.reportLink !== undefined;
    }

    var pa = m.createClass({displayName: 'UFIComment', propTypes: {authorProfiles: m.PropTypes.object.isRequired, comment: m.PropTypes.object.isRequired, contextArgs: m.PropTypes.object.isRequired, feedback: m.PropTypes.object.isRequired, 'data-ft': m.PropTypes.string, focusOnMount: m.PropTypes.bool, hasPartialBorder: m.PropTypes.bool, hideAsSpamForPageAdmin: m.PropTypes.bool, isFeatured: m.PropTypes.bool, isFirst: m.PropTypes.bool, isFirstCommentComponent: m.PropTypes.bool, isFirstComponent: m.PropTypes.bool, isLast: m.PropTypes.bool, isLastCommentComponent: m.PropTypes.bool, isLastComponent: m.PropTypes.bool, isLocallyComposed: m.PropTypes.bool, isReply: m.PropTypes.bool, onAlsoRecommendToggle: m.PropTypes.func, onBlingBoxClick: m.PropTypes.func, onCommentLikeToggle: m.PropTypes.func, onCommentReply: m.PropTypes.func, onCommentTranslate: m.PropTypes.func, onEdit: m.PropTypes.func, onHideAsSpam: m.PropTypes.func, onInlineBan: m.PropTypes.func, onMarkAsNotSpam: m.PropTypes.func, onPreviewRemove: m.PropTypes.func, onRemove: m.PropTypes.func, onRetrySubmit: m.PropTypes.func, onUndoInlineBan: m.PropTypes.func, permalink: m.PropTypes.string, shortenTimestamp: m.PropTypes.bool, showPermalink: m.PropTypes.bool, showRemoveReportMenu: m.PropTypes.bool, showReplies: m.PropTypes.bool, showReplyLink: m.PropTypes.bool, viewerIsAuthor: m.PropTypes.bool}, getInitialState: function () {
        return {isHighlighting: this.props.comment.highlightcomment, wasHighlighted: this.props.comment.highlightcomment, markedAsSpamHere: false, isInlinePageDeleted: false, isInlineBanned: false};
    }, _onHideAsSpam: function (event) {
        this.props.onHideAsSpam(event);
        this.setState({markedAsSpamHere: true});
    }, _onMarkAsNotSpam: function (event) {
        this.props.onMarkAsNotSpam(event);
        this.setState({markedAsSpamHere: false});
    }, _onDeleteSpam: function (event) {
        this.props.onRemove(event, this);
    }, _onInlineBan: function (event) {
        this.props.onInlineBan(event);
        this.setState({isInlineBanned: true});
    }, _onUndoInlineBan: function (event) {
        this.props.onUndoInlineBan(event);
        this.setState({isInlineBanned: false});
    }, _onAction: function (event, qa) {
        var ra = qa.item, sa = ra.getValue();
        setTimeout(function () {
            if (sa === ha.remove) {
                this.props.onRemove(event);
            } else if (sa === ha.edit) {
                this.props.onEdit(event);
            } else if (sa === ha.hide)this._onHideAsSpam(event);
        }.bind(this), 0);
    }, _createRemoveReportMenuData: function () {
        return [
            {value: ha.remove, label: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 ..."},
            {value: ha.hide, label: "\u0421\u043a\u0440\u044b\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439"}
        ];
    }, _createEditDeleteMenuData: function () {
        return [
            {value: ha.edit, label: "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c ..."},
            {value: ha.remove, label: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c ..."}
        ];
    }, _renderCloseButton: function () {
        var qa = this.props.comment, ra = this.props.feedback, sa = null, ta = null, ua = null, va = false;
        if (qa.canremove && !this.props.hideAsSpamForPageAdmin) {
            if (this.props.viewerIsAuthor) {
                if (qa.canedit) {
                    ua = "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0438\u043b\u0438 \u0443\u0434\u0430\u043b\u0438\u0442\u044c";
                    ta = this._createEditDeleteMenuData();
                    va = true;
                } else {
                    ua = "\u0423\u0434\u0430\u043b\u0438\u0442\u044c";
                    sa = this.props.onRemove;
                }
            } else if (ra.canremoveall)if (this.props.showRemoveReportMenu) {
                ua = "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u043b\u0438 \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c\u0441\u044f";
                ta = this._createRemoveReportMenuData();
            } else {
                ua = "\u0423\u0434\u0430\u043b\u0438\u0442\u044c";
                sa = this.props.onRemove;
            }
        } else if (qa.canreport) {
            ua = "\u0421\u043a\u0440\u044b\u0442\u044c";
            sa = this._onHideAsSpam;
        }
        var wa = (("UFICommentCloseButton") + (sa === null && ta === null ? ' ' + "hdn" : '')), xa = null, ya = null;
        if (this.props.contextArgs.viewas) {
            xa = "/ajax/profile/link_disabled_in_viewas.php";
            ya = "dialog";
            sa = null;
        }
        var za = va ? t.MenuType.EDIT : t.MenuType.CLOSE;
        return (m.createElement(t, {ajaxify: xa, className: wa, onClick: sa, rel: ya, tooltip: ua, menuData: ta, menuType: za, onAction: this._onAction}));
    }, _renderFakeCloseButton: function () {
        return (m.createElement(ba, {className: "UFICommentCloseButtonFake", tabIndex: "-1"}));
    }, componentDidMount: function () {
        if (this.state.isHighlighting) {
            var qa = this.getDOMNode();
            if (this.props.storyInsert && k._notifStoryUFI(qa)) {
                h.loadModules(["UFIHighlight"], function (ra) {
                    setTimeout(ra.actOn.bind(null, qa), 0);
                });
            } else h.loadModules(["UFIScrollHighlight"], function (ra) {
                setTimeout(ra.actOn.bind(null, qa), 0);
            });
            this.setState({isHighlighting: false});
        }
    }, shouldComponentUpdate: function (qa, ra) {
        var sa = this.props, ta = this.state;
        return (qa.comment !== sa.comment || qa.showReplyLink !== sa.showReplyLink || qa.showReplies !== sa.showReplies || qa.isFirst !== sa.isFirst || qa.isLast !== sa.isLast || qa.isFirstCommentComponent !== sa.isFirstCommentComponent || qa.isLastCommentComponent !== sa.isLastCommentComponent || qa.isFirstComponent !== sa.isFirstComponent || qa.isLastComponent !== sa.isLastComponent || qa.isFeatured !== sa.isFeatured || qa.hasPartialBorder !== sa.hasPartialBorder || ra.wasHighlighted !== ta.wasHighlighted || ra.isHighlighting !== ta.isHighlighting || ra.markedAsSpamHere !== ta.markedAsSpamHere || ra.isInlinePageDeleted !== ta.isInlinePageDeleted || ra.isInlineBanned !== ta.isInlineBanned);
    }, render: function () {
        var qa = this.props.comment, ra = this.props.feedback, sa = qa.status === ga.DELETED, ta = qa.status === ga.LIVE_DELETED, ua = qa.status === ga.SPAM_DISPLAY, va = this.state.markedAsSpamHere, wa = this.state.isInlinePageDeleted, xa = this.props.hideAsSpamForPageAdmin, ya = this.state.isInlineBanned, za = oa(qa), ab = !qa.status && (qa.isunseen || qa.islocal);
        if (!qa.status && ra.lastseentime) {
            var bb = qa.originalTimestamp || qa.timestamp.time;
            ab = ab || bb > ra.lastseentime;
        }
        var cb = this.props.contextArgs.markedcomments;
        if (cb && cb[qa.legacyid])ab = true;
        var db = ((this.props.isFirst ? "UFIFirstComment" : '') + (this.props.isLast ? ' ' + "UFILastComment" : '') + (this.props.isFirstCommentComponent ? ' ' + "UFIFirstCommentComponent" : '') + (this.props.isLastCommentComponent ? ' ' + "UFILastCommentComponent" : '') + (this.props.isFirstComponent ? ' ' + "UFIFirstComponent" : '') + (this.props.isLastComponent ? ' ' + "UFILastComponent" : ''));
        if (za)if (ma) {
            var eb, fb = null, gb = null, hb = null;
            if (xa) {
                gb = ya ? this._onUndoInlineBan : this._onInlineBan;
                if (wa) {
                    eb = "You've deleted this comment so no one can see it.";
                } else if (va) {
                    eb = "\u0422\u0435\u043f\u0435\u0440\u044c \u044d\u0442\u043e \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e \u0442\u043e\u043b\u044c\u043a\u043e \u0434\u043b\u044f \u0430\u0432\u0442\u043e\u0440\u0430 \u0438 \u0435\u0433\u043e \u0434\u0440\u0443\u0437\u0435\u0439.";
                    hb = this._onDeleteSpam;
                    fb = this._onMarkAsNotSpam;
                }
            } else if (va) {
                eb = "\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u0441\u043a\u0440\u044b\u0442.";
                hb = this._onDeleteSpam;
                fb = this._onMarkAsNotSpam;
            }
            if (eb)return (m.createElement(m.DOM.li, {className: da(q.ROW, db, "UFIHide")}, m.createElement(ma, {notice: eb, comment: this.props.comment, authorProfiles: this.props.authorProfiles, onUndo: fb, onBanAction: gb, onDeleteAction: hb, isInlineBanned: ya, isInlinePageDeleted: wa, hideAsSpamForPageAdmin: xa, pageID: this.props.feedback.ownerid})));
        } else h.loadModules(["UFICommentRemovalControls.react"], function (lb) {
            ma = lb;
            setTimeout(function () {
                this.forceUpdate();
            }.bind(this));
        }.bind(this));
        var ib = !sa, jb = da(q.ROW, db, (("UFIComment") + (na(qa) ? ' ' + "UFICommentFailed" : '') + (sa || ta || ua ? ' ' + "UFITranslucentComment" : '') + (this.state.isHighlighting ? ' ' + "highlightComment" : '') + (!ib ? ' ' + "noDisplay" : '') + (ib ? ' ' + "display" : '') + (' ' + "UFIComponent") + (this.props.isFeatured && !this.props.contextArgs.showverified ? ' ' + "UFIFeaturedComment" : '') + (this.props.hasPartialBorder ? ' ' + "UFIPartialBorder" : ''))), kb = this.renderComment();
        if (ab)jb = da(jb, q.UNSEEN_ITEM);
        return (m.createElement(m.DOM.li, {className: jb, 'data-ft': this.props['data-ft']}, kb));
    }, renderComment: function () {
        var qa = this.props, ra = qa.comment, sa = qa.permalink, ta = qa.feedback, ua = qa.authorProfiles[ra.author], va = ra.status === ga.SPAM_DISPLAY, wa = ra.status === ga.LIVE_DELETED, xa = !(va || wa), ya = ta.canremoveall || ra.hiddenbyviewer, za = null, ab = null;
        if (!qa.isLocallyComposed && !this.state.wasHighlighted && !ra.fromfetch) {
            ab = v.commentTruncationLength;
            za = v.commentTruncationMaxLines;
        }
        var bb = n.getTrackingInfo(n.types.SMALL_ACTOR_PHOTO), cb = n.getTrackingInfo(n.types.USER_NAME), db = n.getTrackingInfo(n.types.USER_MESSAGE), eb = null, fb = null;
        if (ra.istranslatable && (ra.translatedtext === undefined))eb = m.createElement(m.DOM.a, {href: "#", role: "button", title: "\u041f\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u044d\u0442\u043e\u0442 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439", className: ia, onClick: qa.onCommentTranslate}, "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043f\u0435\u0440\u0435\u0432\u043e\u0434");
        if (ra.translatedtext) {
            var gb = null, hb = y.BING_PAGE_URL, ib = y.BING_TRANSLATOR_APP;
            if (ra.translatorapp === ib) {
                var jb = new aa(hb).addQueryData({text: ra.body.text});
                gb = m.createElement(m.DOM.span, {className: ka}, ' ', "(", m.createElement(m.DOM.a, {href: jb.toString(), target: "_blank", className: la}, "\u041f\u0435\u0440\u0435\u0432\u0435\u0434\u0435\u043d\u043e \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e Bing"), ")");
            }
            fb = m.createElement(m.DOM.span, {className: ja}, ra.translatedtext, gb);
        }
        var kb = z.isDirectionLTR(ra.body.text), lb = !kb, mb = kb && l.isRTL() ? 'ltr' : lb && !l.isRTL() ? 'rtl' : null, nb = function (vb, wb) {
            return j(vb, wb, '_blank', ta.grouporeventid, 'ufi', v.commentURLTruncationLength);
        }, ob = m.createElement(o, {key: "comment-body", className: (("UFICommentBody") + (this.props.contextArgs.useWhitespacesRender ? ' ' + "UFICommentBodyPreserveWhitespace" : '')), interpolator: nb, ranges: ra.body.ranges, text: ra.body.text, truncationPercent: v.commentTruncationPercent, maxLength: ab, maxLines: za, renderEmoticons: u.renderEmoticons, renderEmoji: u.renderEmoji, 'data-ft': db, dir: mb});
        if (ra.socialcontext) {
            ob = m.createElement(m.DOM.div, {key: "body"}, ob);
        } else {
            var pb = ((kb && l.isRTL() ? "_5wjy" : '') + (kb && l.isRTL() ? ' ' + "_5wjz" : '') + (lb && !l.isRTL() ? ' ' + "_5wj-" : '') + (lb && !l.isRTL() ? ' ' + "_5wj_" : ''));
            ob = pb ? m.createElement(m.DOM.div, {key: "body", className: pb}, ob) : [' ', ob];
        }
        var qb = qa.contextArgs.viewas ? null : i.constructEndpointWithLocation(ua, 'ufi').toString(), rb = m.createElement(p, {author: ua, showHovercard: !!qb, key: "author", focusOnMount: qa.focusOnMount, 'data-ft': cb}, qa.isFeatured && qa.contextArgs.showverified ? m.createElement(g, {key: "badge", size: "xsmall", type: "verified"}) : null, ra.socialcontext ? m.createElement(x, {topMutualFriend: qa.authorProfiles[ra.socialcontext.topmutualid], otherMutualCount: ra.socialcontext.othermutualcount, commentAuthor: ua}) : null), sb = null;
        if (ra.photo_comment_status)sb = m.createElement(m.DOM.div, {className: "_50f8"}, ra.photo_comment_status);
        var tb = null;
        if (ra.sticker_attachment_status)tb = m.createElement(m.DOM.div, {className: "_50f8"}, ra.sticker_attachment_status);
        var ub = null;
        if (ra.status !== ga.DELETED)ub = m.createElement(s, {comment: qa.comment});
        return (m.createElement(w, {spacing: "medium"}, m.createElement(m.DOM.a, {href: ua.uri, 'data-hovercard': qb, 'data-ft': bb}, m.createElement(m.DOM.img, {src: ua.thumbSrc, className: q.ACTOR_IMAGE, alt: ""})), m.createElement(m.DOM.div, {className: "UFICommentContentBlock"}, m.createElement(m.DOM.div, {className: "UFICommentContent"}, rb, ob, eb, fb, ub), sb, tb, m.createElement(r, {comment: ra, feedback: ta, onBlingBoxClick: qa.onBlingBoxClick, onAlsoRecommendToggle: qa.onAlsoRecommendToggle, onCommentLikeToggle: qa.onCommentLikeToggle, onCommentReply: qa.onCommentReply, onPreviewRemove: qa.onPreviewRemove, onRetrySubmit: qa.onRetrySubmit, onMarkAsNotSpam: this._onMarkAsNotSpam, permalink: sa, viewerCanMarkNotSpam: ya, shortenTimestamp: qa.shortenTimestamp, showPermalink: qa.showPermalink, showReplyLink: qa.showReplyLink, showReplies: qa.showReplies, contextArgs: qa.contextArgs, markedAsSpamHere: this.state.markedAsSpamHere, hideAsSpamForPageAdmin: qa.hideAsSpamForPageAdmin}), xa && !this.props.comment.canEdit ? m.createElement(m.DOM.div, {className: "UFICommentCloseBlur"}) : null, xa ? this._renderCloseButton() : null), xa ? this._renderFakeCloseButton() : null));
    }});
    e.exports = pa;
}, null);
__d("UFIContainer.react", ["React", "cx"], function (a, b, c, d, e, f, g, h) {
    var i = g.createClass({displayName: 'UFIContainer', render: function () {
        var j = null;
        if (this.props.hasNub)j = g.createElement(g.DOM.li, {className: "UFIArrow"}, g.createElement(g.DOM.i, null));
        var k = ((!this.props.isReplyList ? "UFIList" : '') + (this.props.isReplyList ? ' ' + "UFIReplyList" : '') + (this.props.isParentLiveDeleted ? ' ' + "UFITranslucentReplyList" : '') + (this.props.isFirstCommentComponent ? ' ' + "UFIFirstCommentComponent" : '') + (this.props.isLastCommentComponent ? ' ' + "UFILastCommentComponent" : '') + (this.props.isFirstComponent ? ' ' + "UFIFirstComponent" : '') + (this.props.isLastComponent ? ' ' + "UFILastComponent" : ''));
        return (g.createElement(g.DOM.ul, {className: k}, j, this.props.children));
    }});
    e.exports = i;
}, null);
__d("UFILikeSentenceText.react", ["ActorURI", "HovercardLinkInterpolator", "ProfileBrowserLink", "ProfileBrowserTypes", "React", "TextWithEntities.react", "URI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n(p, q, r, s) {
        if (s.count != null) {
            var t = j.LIKES, u = {id: p.targetfbid, actorid: p.actorid}, v = [], w;
            for (var x = 0; x < q.length; x++)if (!q[x].count) {
                w = q[x];
                var y = w.entity;
                v.push(y.id);
            }
            var z = new m('/ajax/like/tooltip.php').setQueryData({comment_fbid: p.targetfbid, comment_from: p.actorforpost, seen_user_fbids: v.length ? v : true});
            z = g.create(z, p.actorforpost);
            return (k.createElement(k.DOM.a, {rel: "dialog", ajaxify: i.constructDialogURI(t, u).toString(), href: i.constructPageURI(t, u).toString(), 'data-hover': "tooltip", 'data-tooltip-alignh': "center", 'data-tooltip-uri': z.toString(), role: "button"}, r));
        } else return h(r, s, null, null, 'ufi');
    }

    var o = k.createClass({displayName: 'UFILikeSentenceText', propTypes: {contextArgs: k.PropTypes.object.isRequired, feedback: k.PropTypes.object.isRequired, likeSentenceData: k.PropTypes.object.isRequired}, render: function () {
        var p = this.props.feedback, q = this.props.likeSentenceData, r;
        r = n;
        r = r.bind(null, p, q.ranges);
        return (k.createElement(l, {interpolator: r, ranges: q.ranges, aggregatedRanges: q.aggregatedranges, text: q.text}));
    }});
    e.exports = o;
}, null);
__d("UFILikeSentence.react", ["Bootloader", "LeftRight.react", "ProfileBrowserLink", "ProfileBrowserTypes", "React", "UFIClassNames", "UFIImageBlock.react", "UFILikeSentenceText.react", "URI", "cx", "joinClasses", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = k.createClass({displayName: 'UFILikeSentence', propTypes: {contextArgs: k.PropTypes.object.isRequired, feedback: k.PropTypes.object.isRequired, isFirstComponent: k.PropTypes.bool, isLastComponent: k.PropTypes.bool, onOrderingModeChange: k.PropTypes.func, onTargetLikeToggle: k.PropTypes.func, orderingMode: k.PropTypes.string, showOrderingModeSelector: k.PropTypes.bool}, getInitialState: function () {
        return {selectorModule: null, bootloadedSelectorModule: false};
    }, componentWillMount: function () {
        this._bootloadSelectorModule(this.props);
    }, componentWillReceiveProps: function (t) {
        this._bootloadSelectorModule(t);
    }, _bootloadSelectorModule: function (t) {
        if (t.showOrderingModeSelector && !this.state.bootloadedSelectorModule) {
            var u = function (v) {
                this.setState({selectorModule: v});
            }.bind(this);
            if (t.contextArgs.entstream) {
                g.loadModules(["UFIEntStreamOrderingModeSelector.react"], u);
            } else g.loadModules(["UFIOrderingModeSelector.react"], u);
            this.setState({bootloadedSelectorModule: true});
        }
    }, render: function () {
        var t = this.props.feedback, u = t.likesentences.current, v = this.props.contextArgs.entstream, w = q(l.ROW, t.likesentences.isunseen ? l.UNSEEN_ITEM : '', (("UFILikeSentence") + (this.props.isFirstComponent ? ' ' + "UFIFirstComponent" : '') + (this.props.isLastComponent ? ' ' + "UFILastComponent" : ''))), x = null, y = null;
        if (u.text)y = k.createElement(k.DOM.div, {className: "UFILikeSentenceText"}, k.createElement(n, {contextArgs: this.props.contextArgs, feedback: t, likeSentenceData: u}));
        if (y && !v) {
            x = k.createElement(k.DOM.i, {className: "UFILikeIcon"});
            if (t.viewercanlike && !t.hasviewerliked)x = k.createElement(k.DOM.a, {className: "UFILikeThumb", href: "#", tabIndex: "-1", title: "\u041e\u0442\u043c\u0435\u0442\u044c\u0442\u0435 \u043a\u0430\u043a \u043f\u043e\u043d\u0440\u0430\u0432\u0438\u0432\u0448\u0435\u0435\u0441\u044f", onClick: this.props.onTargetLikeToggle, role: "button", 'aria-label': "\u041e\u0442\u043c\u0435\u0442\u044c\u0442\u0435 \u043a\u0430\u043a \u043f\u043e\u043d\u0440\u0430\u0432\u0438\u0432\u0448\u0435\u0435\u0441\u044f"}, x);
        }
        var z = y, aa = null;
        if (t.seencount > 0 && !v) {
            var ba = j.GROUP_MESSAGE_VIEWERS, ca = {id: t.targetfbid}, da = i.constructDialogURI(ba, ca), ea = i.constructPageURI(ba, ca), fa = new o('/ajax/ufi/seen_tooltip.php').setQueryData({ft_ent_identifier: t.entidentifier, displayed_count: t.seencount}), ga;
            if (t.seenbyall) {
                ga = "\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u043e \u0432\u0441\u0435\u043c\u0438";
            } else ga = t.seencount == 1 ? "\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u043e 1 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u043c" : r._("\u0412\u0438\u0434\u0435\u043b\u0438: {count}", {count: t.seencount});
            aa = k.createElement(k.DOM.a, {rel: "dialog", ajaxify: da.toString(), href: ea.toString(), 'data-hover': "tooltip", 'data-tooltip-alignh': "left", 'data-tooltip-uri': fa.toString(), className: (("UFISeenCount") + (!!u.text ? ' ' + "UFISeenCountRight" : ''))}, k.createElement(k.DOM.span, {className: "UFISeenCountIcon"}), ga);
        } else if (this.props.showOrderingModeSelector && this.state.selectorModule) {
            var ha = this.state.selectorModule;
            aa = k.createElement(ha, {currentOrderingMode: this.props.orderingMode, entstream: v, orderingmodes: t.orderingmodes, onOrderChanged: this.props.onOrderingModeChange});
            if (!z)z = k.createElement(k.DOM.div, null);
        }
        var ia = null;
        if (x && y) {
            ia = k.createElement(m, null, x, y, aa);
        } else if (z) {
            ia = k.createElement(h, {direction: h.DIRECTION.right}, z, aa);
        } else ia = aa;
        return (k.createElement(k.DOM.li, {className: w}, ia));
    }});
    e.exports = s;
}, null);
__d("UFIPager.react", ["LeftRight.react", "React", "UFIClassNames", "UFIImageBlock.react", "XUISpinner.react", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = h.createClass({displayName: 'UFIPager', propTypes: {contextArgs: h.PropTypes.object.isRequired, pagerLabel: h.PropTypes.string.isRequired, 'data-ft': h.PropTypes.string, countSentence: h.PropTypes.string, isFirstCommentComponent: h.PropTypes.bool, isFirstComponent: h.PropTypes.bool, isLastCommentComponent: h.PropTypes.bool, isLastComponent: h.PropTypes.bool, isLoading: h.PropTypes.bool, isUnseen: h.PropTypes.bool, onPagerClick: h.PropTypes.func}, onPagerClick: function (o) {
        !this.props.isLoading && this.props.onPagerClick && this.props.onPagerClick();
        o.nativeEvent.prevent();
    }, render: function () {
        var o = this.onPagerClick, p = m(i.ROW, this.props.isUnseen ? i.UNSEEN_ITEM : '', (("UFIPagerRow") + (' ' + "UFIComponent") + (this.props.isFirstCommentComponent ? ' ' + "UFIFirstCommentComponent" : '') + (this.props.isLastCommentComponent ? ' ' + "UFILastCommentComponent" : '') + (this.props.isFirstComponent ? ' ' + "UFIFirstComponent" : '') + (this.props.isLastComponent ? ' ' + "UFILastComponent" : ''))), q = null;
        if (this.props.isLoading)q = h.createElement(k, {className: "mls", background: "light", size: "small"});
        var r = h.createElement(h.DOM.a, {className: "UFIPagerLink", onClick: o, href: "#", role: "button"}, this.props.pagerLabel, q), s = (("fcg") + (' ' + "UFIPagerCount")), t = h.createElement(h.DOM.span, {className: s}, this.props.countSentence), u;
        if (this.props.contextArgs.entstream) {
            u = (h.createElement(g, {direction: g.DIRECTION.right}, r, t));
        } else u = (h.createElement(j, null, h.createElement(h.DOM.a, {className: "UFIPagerIcon", onClick: o, href: "#", role: "button"}), r, t));
        return (h.createElement(h.DOM.li, {className: p, 'data-ft': this.props['data-ft']}, u));
    }});
    e.exports = n;
}, null);
__d("UFIPagerLabel", ["fbt", "tx"], function (a, b, c, d, e, f, g, h) {
    var i = {VIEW_ONE: 'view_one', VIEW_ONE_MORE: 'view_one_more', VIEW_ALL: 'view_all', VIEW_MORE_EXPLICIT: 'view_more_explicit', VIEW_MORE: 'view_more', VIEW_PREVIOUS: 'view_previous', getReplyLabel: function (j, k) {
        switch (j) {
            case i.VIEW_ONE:
                return "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c 1 \u043e\u0442\u0432\u0435\u0442";
            case i.VIEW_ONE_MORE:
                return "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0435\u0449\u0435 1 \u043e\u0442\u0432\u0435\u0442";
            case i.VIEW_ALL:
                return h._("\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0432\u0441\u0435 {count} \u043e\u0442\u0432\u0435\u0442\u043e\u0432", {count: k.count});
            case i.VIEW_MORE_EXPLICIT:
                return h._("\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0435\u0449\u0435 {count} \u043e\u0442\u0432\u0435\u0442\u043e\u0432", {count: k.count});
            case i.VIEW_MORE:
                return "\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0434\u0440\u0443\u0433\u0438\u0435 \u043e\u0442\u0432\u0435\u0442\u044b";
            case i.VIEW_PREVIOUS:
                return "\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0435 \u043e\u0442\u0432\u0435\u0442\u044b";
            default:
                return null;
        }
    }, getCommentLabel: function (j, k) {
        switch (j) {
            case i.VIEW_ONE:
                return "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c 1 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439";
            case i.VIEW_ONE_MORE:
                return "\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0435\u0449\u0435 1 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439";
            case i.VIEW_ALL:
                return h._("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0432\u0441\u0435 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438 ({count})", {count: k.count});
            case i.VIEW_MORE_EXPLICIT:
                return h._("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0435\u0449\u0435 {count} \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0435\u0432", {count: k.count});
            case i.VIEW_MORE:
                return "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0434\u0440\u0443\u0433\u0438\u0435 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438";
            case i.VIEW_PREVIOUS:
                return "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0435 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438";
            default:
                return null;
        }
    }, getQuestionLabel: function (j, k) {
        switch (j) {
            case i.VIEW_ONE:
                return "\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c 1 \u0432\u043e\u043f\u0440\u043e\u0441";
            case i.VIEW_ONE_MORE:
                return "\u0415\u0449\u0435 1 \u0432\u043e\u043f\u0440\u043e\u0441";
            case i.VIEW_ALL:
                return g._("View all {count} questions", [g.param("count", k.count)]);
            case i.VIEW_MORE_EXPLICIT:
                return g._("View {count} more questions", [g.param("count", k.count)]);
            case i.VIEW_MORE:
                return "View more questions";
            case i.VIEW_PREVIOUS:
                return "\u0421\u043c. \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0435 \u0432\u043e\u043f\u0440\u043e\u0441\u044b";
            default:
                return null;
        }
    }, getLabel: function (j, k, l, m) {
        if (k) {
            return i.getReplyLabel(j, m);
        } else if (l) {
            return i.getQuestionLabel(j, m);
        } else return i.getCommentLabel(j, m);
    }};
    e.exports = i;
}, null);
__d("UFIReplySocialSentence.react", ["Badge.react", "LiveTimer", "React", "Timestamp.react", "UFIClassNames", "UFIConstants", "UFIImageBlock.react", "cx", "joinClasses", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = ' \u00b7 ', r = 43200, s = i.createClass({displayName: 'UFIReplySocialSentence', propTypes: {authors: i.PropTypes.object.isRequired, 'data-ft': i.PropTypes.string, isExpanded: i.PropTypes.bool, isFirstComponent: i.PropTypes.bool, isLastComponent: i.PropTypes.bool, isLoading: i.PropTypes.bool, onClick: i.PropTypes.func, orderingMode: i.PropTypes.string, replies: i.PropTypes.number, shortenTimestamp: i.PropTypes.bool, showVerified: i.PropTypes.bool, timestamp: i.PropTypes.object}, render: function () {
        var t = ((this.props.isLoading ? "UFIReplySocialSentenceLoading" : '')), u = o(k.ROW, (("UFIReplySocialSentenceRow") + (this.props.isFirstComponent ? ' ' + "UFIFirstComponent" : '') + (this.props.isLastComponent ? ' ' + "UFILastComponent" : ''))), v, w;
        if (this.props.isExpanded) {
            v = this.props.replies > 1 ? p._("\u0421\u043a\u0440\u044b\u0442\u044c {count} \u043e\u0442\u0432\u0435\u0442\u043e\u0432", {count: this.props.replies}) : "\u0421\u043a\u0440\u044b\u0442\u044c 1 \u043e\u0442\u0432\u0435\u0442";
        } else {
            v = this.props.replies > 1 ? p._("{count} \u043e\u0442\u0432\u0435\u0442\u043e\u0432", {count: this.props.replies}) : "1 \u043e\u0442\u0432\u0435\u0442";
            if (this.props.timestamp) {
                var x = h.getApproximateServerTime() / 1000 - this.props.timestamp.time;
                if (x < r || this.props.orderingMode == l.UFICommentOrderingMode.RECENT_ACTIVITY)w = i.createElement(i.DOM.span, {className: "fcg"}, q, i.createElement(j, {shorten: this.props.shortenTimestamp, time: this.props.timestamp.time, text: this.props.timestamp.text, verbose: this.props.timestamp.verbose}));
            }
        }
        var y = Object.keys(this.props.authors), z = y.length && !this.props.isExpanded, aa = null, ba;
        if (z) {
            var ca = this.props.authors[y[0]];
            aa = i.createElement(i.DOM.img, {alt: "", src: ca.thumbSrc, className: k.ACTOR_IMAGE});
            var da = ca.name;
            if (this.props.showVerified)da = [ca.name, i.createElement(g, {size: "xsmall", type: "verified"})];
            ba = [p._("{author} \u043e\u0442\u0432\u0435\u0442\u0438\u043b(-\u0430)", {author: da}), q, v];
        } else ba = v;
        var ea = null, fa = false;
        if (!z || this.props.contextArgs.feedcarded) {
            if (z)fa = true;
            ea = i.createElement(i.DOM.i, {className: ((!this.props.isExpanded ? "UFIPagerIcon" : '') + (this.props.isExpanded ? ' ' + "UFICollapseIcon" : '') + (fa ? ' ' + "UFIFeedCardedIconWithActor" : ''))});
        }
        return (i.createElement(i.DOM.li, {className: u, 'data-ft': this.props['data-ft']}, i.createElement(i.DOM.a, {className: "UFICommentLink", onClick: this.props.onClick, href: "#", role: "button"}, i.createElement(m, null, i.createElement(i.DOM.div, {className: ((z ? "UFIReplyActorPhotoWrapper" : '') + (fa ? ' ' + "UFIFeedCardedReplyActor" : ''))}, ea, aa), i.createElement(i.DOM.span, {className: t}, i.createElement(i.DOM.span, {className: (("UFIReplySocialSentenceLinkText") + (this.props.showVerified ? ' ' + "UFIReplySocialSentenceVerified" : ''))}, ba), w)))));
    }});
    e.exports = s;
}, null);
__d("UFIShareRow.react", ["NumberFormat", "React", "UFIClassNames", "UFIImageBlock.react", "URI", "cx", "joinClasses", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = h.createClass({displayName: 'UFIShareRow', propTypes: {contextArgs: h.PropTypes.object.isRequired, shareCount: h.PropTypes.number.isRequired, targetID: h.PropTypes.any.isRequired, isFirstComponent: h.PropTypes.bool, isLastComponent: h.PropTypes.bool}, render: function () {
        var p = new k('/ajax/shares/view').setQueryData({target_fbid: this.props.targetID}), q = new k('/shares/view').setSubdomain('www').setQueryData({id: this.props.targetID}), r;
        if (this.props.shareCount > 1) {
            var s = g.formatIntegerWithDelimiter(this.props.shareCount, this.props.contextArgs.numberdelimiter || ',');
            r = n._("{count} \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0439", {count: s});
        } else r = "1 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u044f";
        var t = m(i.ROW, (("UFIShareRow") + (this.props.isFirstComponent ? ' ' + "UFIFirstComponent" : '') + (this.props.isLastComponent ? ' ' + "UFILastComponent" : '')));
        return (h.createElement(h.DOM.li, {className: t}, h.createElement(j, null, h.createElement(h.DOM.a, {className: "UFIShareIcon", rel: "dialog", ajaxify: p.toString(), href: q.toString()}), h.createElement(h.DOM.a, {className: "UFIShareLink", rel: "dialog", ajaxify: p.toString(), href: q.toString()}, r))));
    }});
    e.exports = o;
}, null);
__d("UFISpamPlaceholder.react", ["React", "UFIClassNames", "XUISpinner.react", "fbt", "tx"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = g.createClass({displayName: 'UFISpamPlaceholder', propTypes: {numHidden: g.PropTypes.number.isRequired, isLoading: g.PropTypes.bool, onClick: g.PropTypes.func}, render: function () {
        if (this.props.isLoading)return (g.createElement(g.DOM.li, {className: h.ROW}, g.createElement(g.DOM.span, {className: "UFISpamCommentWrapper"}, g.createElement(i, {className: "mls", background: "light", size: "small"}))));
        return (g.createElement(g.DOM.li, {className: h.ROW}, g.createElement(g.DOM.a, {href: "#", role: "button", className: "UFISpamCommentLink", onClick: this.props.onClick, 'aria-label': "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438, \u043e\u0431\u043e\u0437\u043d\u0430\u0447\u0435\u043d\u043d\u044b\u0435 \u043a\u0430\u043a \u0441\u043f\u0430\u043c"}, g.createElement(g.DOM.span, {'data-hover': "tooltip", 'data-tooltip-alignh': "center", 'aria-label': k._("{count} \u0441\u043a\u0440\u044b\u0442\u043e", {count: this.props.numHidden}), className: "UFISpamCommentWrapper"}, g.createElement(g.DOM.i, {className: "placeholderIcon"})))));
    }});
    e.exports = l;
}, null);
__d("UFIFeaturedReplyCommentList", ["UFIReplyCommentList"], function (a, b, c, d, e, f, g) {
    "use strict";
    for (var h in g)if (g.hasOwnProperty(h))j[h] = g[h];
    var i = g === null ? null : g.prototype;
    j.prototype = Object.create(i);
    j.prototype.constructor = j;
    j.__superConstructor__ = g;
    j.getCommentList = function (k, l) {
    };
    function j(k, l, m, n) {
        g.call(this, k, l);
        var o = 0, p = m.length;
        this.updateCommentCount(p);
        this.addCommentIDs(o, p, m);
        var q = {};
        n.forEach(function (r) {
            q[r.id] = r;
        });
        m.forEach(function (r) {
            var s = q[r];
            this.addComment(s.id, s.clientid, s.legacyid);
        }.bind(this));
    }

    j.prototype.fetchComments = function (k, l, m) {
    };
    e.exports = j;
}, null);
__d("UFIRange", [], function (a, b, c, d, e, f) {
    "use strict";
    function g(h, i) {
        this.offset = h || 0;
        this.length = i || 0;
        this.requestedOffset = this.offset;
        this.requestedLength = this.length;
    }

    g.prototype.getOffset = function () {
        return this.offset;
    };
    g.prototype.getLength = function () {
        return this.length;
    };
    g.prototype.updateRange = function (h, i) {
        this.offset = h;
        this.length = i;
        if (this.requestedLength > 0) {
            var j = Math.min(this.offset, this.requestedOffset), k = Math.max(this.offset + this.length, this.requestedOffset + this.requestedLength);
            this.requestedOffset = j;
            this.requestedLength = k - j;
        } else {
            this.requestedOffset = this.offset;
            this.requestedLength = this.length;
        }
    };
    g.prototype.getRequestedOffset = function () {
        return this.requestedOffset;
    };
    g.prototype.getRequestedLength = function () {
        return this.requestedLength;
    };
    g.prototype.updateRequestedRange = function (h, i) {
        this.requestedOffset = h;
        this.requestedLength = i;
    };
    e.exports = g;
}, null);
__d("UFIController", ["Arbiter", "Bootloader", "CSS", "DOM", "LayerRemoveOnHide", "LiveTimer", "Parent", "React", "ReactMount", "ShortProfiles", "UFI.react", "UFIActionLinkController", "UFICentralUpdates", "UFIFeaturedReplyCommentList", "UFIFeaturedToplevelCommentList", "UFICommentTemplates", "UFIConstants", "UFIFeedbackTargets", "UFIInstanceState", "UFIRange", "UFIReplyCommentList", "UFIToplevelCommentList", "UFIUserActions", "URI", "isEmpty", "onEnclosingPageletDestroy", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga) {
    "use strict";
    var ha = function (la, ma, na, oa, pa) {
        var qa = la + ma === na;
        return {offset: la, length: (qa && ia(pa)) ? oa - la : ma};
    }, ia = function (la) {
        return la == w.UFIPayloadSourceType.USER_ACTION || la == w.UFIPayloadSourceType.LIVE_SEND;
    }, ja = function (la, ma) {
        for (var na = 0; na < ma.length; na++) {
            var oa = ma[na];
            if (oa.author)la.push(oa.author);
            if (oa.socialcontext)la.push(oa.socialcontext.topmutualid);
            if (oa.replyauthors && oa.replyauthors.length)for (var pa = 0; pa < oa.replyauthors.length; pa++)la.push(oa.replyauthors[pa]);
        }
    };

    function ka(la, ma, na) {
        this.root = la;
        this.id = ma.ftentidentifier;
        this.source = ma.source;
        this.$UFIController0 = ma.instanceid;
        this.featuredToplevelCommentList = null;
        this.featuredReplyCommentLists = {};
        this.$UFIController1 = ma;
        this.$UFIController1.rootid = this.root.id;
        this.$UFIController2 = false;
        this.storyInsert = ma.storyInsert;
        var oa = na.feedbacktargets[0];
        this.actionLink = new r(la, this.$UFIController1, oa);
        this.orderingMode = oa.defaultcommentorderingmode;
        var pa = null;
        if (na.featuredcommentlists && na.featuredcommentlists.comments && na.featuredcommentlists.comments[this.id]) {
            pa = na.featuredcommentlists.comments[this.id];
            this.featuredToplevelCommentList = new u(this.id, pa.values, na.comments);
        } else pa = na.commentlists.comments[this.id][this.orderingMode];
        this.ranges = {};
        this.replyRanges = {};
        this.repliesMap = {};
        this.showRepliesMap = {};
        this.showReplySocialSentenceMap = {};
        this.shortenTimestamp = ma.shortenTimestamp;
        this.commentcounts = {};
        this.commentcounts[this.id] = this.getToplevelCommentList().getCommentCount();
        var qa = oa.orderingmodes || [
            {value: this.orderingMode}
        ];
        qa.forEach(function (ua) {
            this.ranges[ua.value] = new z(pa.range.offset, pa.range.length);
        }.bind(this));
        var ra, sa, ta;
        if (na.commentlists.replies)for (ra = 0; ra < pa.values.length; ra++) {
            sa = pa.values[ra];
            ta = na.commentlists.replies[sa];
            if (ta) {
                this.commentcounts[sa] = this.getReplyCommentList(sa).getCommentCount();
                this.getReplyRange(sa).updateRange(ta.range.offset, ta.range.length);
            }
        }
        if (na.featuredcommentlists)if (na.featuredcommentlists.replies)for (ra = 0; ra < pa.values.length; ra++) {
            sa = pa.values[ra];
            ta = na.featuredcommentlists.replies[sa];
            if (ta) {
                this.featuredReplyCommentLists[sa] = new t(this.id, sa, ta.values, na.comments);
                this.commentcounts[sa] = this.getReplyCommentList(sa).getCommentCount();
                this.getReplyRange(sa).updateRange(ta.range.offset, ta.range.length);
            }
        }
        this.$UFIController3 = null;
        this.$UFIController4 = null;
        this.ufiCentralUpdatesSubscriptions = [s.subscribe('feedback-updated', function (ua, va) {
            var wa = va.updates, xa = va.payloadSource;
            if (xa != w.UFIPayloadSourceType.COLLAPSED_UFI && this.id in wa)this.fetchAndUpdate(this.render.bind(this), xa);
        }.bind(this)), s.subscribe('feedback-id-changed', function (ua, va) {
            var wa = va.updates;
            if (this.id in wa)this.id = wa[this.id];
        }.bind(this)), s.subscribe('instance-updated', function (ua, va) {
            var wa = va.updates;
            if (this.$UFIController0 in wa) {
                var xa = wa[this.$UFIController0];
                if (xa.editcommentid)this.render(va.payloadSource);
            }
        }.bind(this))];
        this.clearPageletSubscription = fa(this.root, this.$UFIController6.bind(this));
        this.clearPageSubscription = g.subscribe('ufi/page_cleared', this.$UFIController7.bind(this));
        s.handleUpdate(w.UFIPayloadSourceType.INITIAL_SERVER, na);
        if (this.$UFIController1.viewas)this.viewasUFICleanSubscription = g.subscribe('pre_page_transition', function (ua, va) {
            if (this.$UFIController1.viewas !== da(va.to).getQueryData('viewas'))ba.resetCommentListsForFeedbackTargetID(this.id);
        }.bind(this));
        h.loadModules(["ScrollAwareDOM"], function (ua) {
            o.scrollMonitor = ua.monitor;
        });
        if (ma.notifyonload)g.inform('inlineStory/ufiLoaded');
        g.inform('notifStory/ufiLoaded');
    }

    ka.prototype.$UFIController8 = function () {
        if (!this.$UFIController9)this.$UFIController9 = m.byTag(this.root, 'form');
        return this.$UFIController9;
    };
    ka.prototype.$UFIControllera = function (event) {
        var la = !this.feedback.hasviewerliked;
        ca.changeLike(this.id, la, {source: this.source, target: event.target, rootid: this.$UFIController1.rootid});
        event.preventDefault();
    };
    ka.prototype.$UFIControllerb = function (la, event) {
        var ma = !la.hasviewerliked;
        ca.changeCommentLike(la.id, ma, {source: this.source, target: event.target});
    };
    ka.prototype.$UFIControllerc = function (la, event) {
        ca.changeAlsoRecommend(la, !la.hasviewerrecommended);
    };
    ka.prototype.$UFIControllerd = function (la) {
        y.updateState(this.$UFIController0, 'isediting', true);
        y.updateState(this.$UFIController0, 'editcommentid', la.id);
    };
    ka.prototype.$UFIControllere = function (la, ma, event) {
        if (!ma.visibleValue && !ma.attachedPhoto && !ma.attachedSticker) {
            this.$UFIControllerf(la, event);
        } else ca.editComment(la.id, ma.visibleValue, ma.encodedValue, {source: this.$UFIController1.source, target: event.target, attachedPhoto: ma.attachedPhoto, attachedSticker: ma.attachedSticker});
        y.updateStateField(this.$UFIController0, 'locallycomposed', la.id, true);
        this.$UFIControllerg();
    };
    ka.prototype.$UFIControllerg = function () {
        y.updateState(this.$UFIController0, 'isediting', false);
        y.updateState(this.$UFIController0, 'editcommentid', null);
    };
    ka.prototype.$UFIControllerf = function (la, event, ma) {
        this.$UFIControllerh(la, false, event, ma);
    };
    ka.prototype.$UFIControllerh = function (la, ma, event, na) {
        var oa = v[':fb:ufi:hide-dialog-template'].build();
        j.setContent(oa.getNode('body'), "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u043e\u0442 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439?");
        j.setContent(oa.getNode('title'), "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439");
        h.loadModules(["DialogX"], function (pa) {
            var qa = new pa({modal: true, width: 465, addedBehaviors: [k]}, oa.getRoot());
            qa.subscribe('confirm', function () {
                ca.removeComment(la.id, {source: this.source, oneclick: ma, target: event.target, timelinelogdata: this.$UFIController1.timelinelogdata});
                if (na)na.setState({isInlinePageDeleted: true});
                qa.hide();
            }.bind(this));
            qa.show();
        }.bind(this));
    };
    ka.prototype.$UFIControlleri = function (la, event) {
        ca.setHideAsSpam(la.id, true, {source: this.source, target: event.target});
    };
    ka.prototype.$UFIControllerj = function (la, event) {
        ca.setHideAsSpam(la.id, false, {source: this.source, target: event.target});
    };
    ka.prototype.$UFIControllerk = function (la, event) {
        ca.translateComment(la, {source: this.source, target: event.target});
    };
    ka.prototype.$UFIControllerl = function (la, ma, event) {
        ca.banUser(la, this.feedback.ownerid, ma, {source: this.source, target: event.target});
    };
    ka.prototype.$UFIControllerm = function (la, event) {
        this.$UFIControllerl(la, true, event);
    };
    ka.prototype.$UFIControllern = function (la, event) {
        this.$UFIControllerl(la, false, event);
    };
    ka.prototype.$UFIControllero = function (la, ma) {
        ca.fetchSpamComments(this.id, la, ma, this.$UFIController1.viewas);
    };
    ka.prototype.$UFIControllerp = function (la, event) {
        ca.removePreview(la, {source: this.source, target: event.target});
    };
    ka.prototype.$UFIControllerq = function (la) {
        h.loadModules(["UFIRetryActions"], function (ma) {
            ma.retrySubmit(la, {source: this.source});
        }.bind(this));
    };
    ka.prototype.$UFIControllerr = function () {
        if (this.$UFIController2)return;
        var la = m.byTag(this.root, 'form');
        if (la) {
            i.removeClass(la, 'collapsed_comments');
            this.$UFIController2 = true;
        }
    };
    ka.prototype.setRange = function (la) {
        this.getRange().updateRange(la.offset, la.length);
    };
    ka.prototype.setReplyRange = function (la, ma) {
        this.getReplyRange(la).updateRange(ma.offset, ma.length);
    };
    ka.prototype.render = function (la) {
        var ma = this.comments.length || !ea(this.feedback.likesentences.current);
        if (ma && ia(la))this.$UFIControllerr();
        var na = this.getRange();
        if (this.$UFIController3 === null)this.$UFIController3 = na.getOffset() + na.getLength() - 1;
        var oa = this.feedback.replysocialsentencemaxreplies || -1, pa = {};
        pa[this.id] = this.getToplevelCommentList().getDeletedCount();
        var qa = {}, ra = {};
        ra[this.id] = !this.featuredToplevelCommentList;
        this.comments.forEach(function (wa) {
            var xa = wa.id;
            pa[xa] = this.getReplyCommentList(xa).getDeletedCount();
            qa[xa] = this.getToplevelCommentList().getPermalinkForComment(xa);
            ra[xa] = !this.featuredReplyCommentLists[xa];
            if (this.repliesMap[xa])this.repliesMap[xa].forEach(function (ya) {
                var za = ya.id;
                qa[za] = aa.getCommentList(this.id, xa).getPermalinkForComment(za);
            }.bind(this));
        }.bind(this));
        var sa = {};
        sa[this.id] = na;
        for (var ta in this.replyRanges)sa[ta] = this.replyRanges[ta];
        var ua = !!this.featuredToplevelCommentList, va = n.createElement(q, {feedback: this.feedback, id: this.id, storyInsert: this.storyInsert, onTargetLikeToggle: this.$UFIControllera.bind(this), onAlsoRecommendToggle: this.$UFIControllerc.bind(this), onCommentLikeToggle: this.$UFIControllerb.bind(this), onCommentRemove: this.$UFIControllerf.bind(this), onCommentHideAsSpam: this.$UFIControlleri.bind(this), onCommentMarkAsNotSpam: this.$UFIControllerj.bind(this), onCommentEdit: this.$UFIControllerd.bind(this), onCommentTranslate: this.$UFIControllerk.bind(this), onCommentInlineBan: this.$UFIControllerm.bind(this), onCommentUndoInlineBan: this.$UFIControllern.bind(this), onEditAttempt: this.$UFIControllere.bind(this), onCancelEdit: this.$UFIControllerg.bind(this), onChangeRange: this.$UFIControllers.bind(this), onSpamFetch: this.$UFIControllero.bind(this), onPreviewRemove: this.$UFIControllerp.bind(this), onRetrySubmit: this.$UFIControllerq.bind(this), onOrderingModeChange: this.$UFIControllert.bind(this), contextArgs: this.$UFIController1, repliesMap: this.repliesMap, showRepliesMap: this.showRepliesMap, showReplySocialSentenceMap: this.showReplySocialSentenceMap, shortenTimestamp: this.shortenTimestamp, commentCounts: this.commentcounts, deletedCounts: pa, availableComments: this.comments, source: this.source, ranges: sa, pageSize: w.defaultPageSize, authorProfiles: this.authorProfiles, instanceid: this.$UFIController0, loggingOffset: this.$UFIController3, replySocialSentenceMaxReplies: oa, orderingMode: this.orderingMode, hideOrderingModeSelector: ua, commentPermalinks: qa, canAddCommentMap: ra});
        this.$UFIController4 = n.renderComponent(va, this.root);
        l.updateTimeStamps();
        if (this.$UFIController8())g.inform('ufi/changed', {form: this.$UFIController8()});
        if (la != w.UFIPayloadSourceType.INITIAL_SERVER && la != w.UFIPayloadSourceType.COLLAPSED_UFI)g.inform('reflow');
    };
    ka.prototype.deferredCallback = function (la, ma, na, oa) {
        la.callbackCount++;
        if (la.callbackCount < la.expectedCallbackCount)return;
        p.getMulti(ma, function (pa) {
            this.authorProfiles = pa;
            oa(na);
            if (na == w.UFIPayloadSourceType.ENDPOINT_COMMENT_FETCH)g.inform('CommentUFI.Pager');
        }.bind(this));
    };
    ka.prototype.fetchAndUpdate = function (la, ma) {
        x.getFeedbackTarget(this.id, function (na) {
            this.feedback = na;
            var oa = this.getToplevelCommentList(this.orderingMode).getCommentCount(), pa = this.getRange(), qa = ha(pa.getRequestedOffset(), pa.getRequestedLength(), this.commentcounts[this.id], oa, ma), ra = [];
            if (this.feedback.actorforpost)ra.push(this.feedback.actorforpost);
            var sa = {expectedCallbackCount: 0, callbackCount: 0}, ta = qa.offset, ua = qa.length, va;
            if (this.$UFIController1.viewas)va = this.$UFIController1.viewas + '';
            this.getToplevelCommentList().getComments(ta, ua, va, function (wa, xa, ya) {
                this.commentcounts[this.id] = xa;
                this.setRange(wa);
                this.comments = [];
                for (var za in ya)this.comments.push(ya[za]);
                ja(ra, this.comments);
                if (this.feedback.isthreaded && this.comments.length) {
                    sa.expectedCallbackCount = this.comments.length;
                } else sa.expectedCallbackCount = 1;
                for (var ab in ya) {
                    var bb = ya[ab], cb = bb.id;
                    if (this.feedback.isthreaded) {
                        var db = this.getReplyCommentList(cb).getCommentCount(), eb;
                        if (this.replyRanges[cb]) {
                            var fb = this.getReplyRange(cb);
                            eb = ha(fb.getRequestedOffset(), fb.getRequestedLength(), this.commentcounts[cb], db, ma);
                        } else eb = {offset: 0, length: Math.min(db, 2)};
                        var gb = eb.offset, hb = eb.length;
                        this.getReplyCommentList(cb).getComments(gb, hb, null, function (ib, jb, kb, lb) {
                            this.commentcounts[ib] = kb;
                            this.setReplyRange(ib, jb);
                            this.repliesMap[ib] = [];
                            for (var mb in lb)this.repliesMap[ib].push(lb[mb]);
                            ja(ra, this.repliesMap[ib]);
                            this.showRepliesMap[ib] = jb.length > 0;
                            if (this.showReplySocialSentenceMap[ib] === undefined && this.commentcounts[ib] > 0)this.showReplySocialSentenceMap[ib] = !this.showRepliesMap[ib];
                            this.deferredCallback(sa, ra, ma, la);
                        }.bind(this, cb, eb, db));
                    }
                }
                if (!this.feedback.isthreaded || !this.comments.length)this.deferredCallback(sa, ra, ma, la);
            }.bind(this, qa, oa));
        }.bind(this));
    };
    ka.prototype.getToplevelCommentList = function () {
        if (this.featuredToplevelCommentList)return this.featuredToplevelCommentList;
        return ba.getCommentList(this.id, this.orderingMode);
    };
    ka.prototype.getReplyCommentList = function (la) {
        if (la in this.featuredReplyCommentLists)return this.featuredReplyCommentLists[la];
        return aa.getCommentList(this.id, la);
    };
    ka.prototype.getRange = function () {
        if (!(this.orderingMode in this.ranges))this.ranges[this.orderingMode] = new z();
        return this.ranges[this.orderingMode];
    };
    ka.prototype.getReplyRange = function (la) {
        if (!(la in this.replyRanges))this.replyRanges[la] = new z();
        return this.replyRanges[la];
    };
    ka.prototype.$UFIControllers = function (la, ma) {
        if (la == this.id) {
            this.getRange().updateRequestedRange(ma.offset, ma.length);
        } else this.replyRanges[la].updateRequestedRange(ma.offset, ma.length);
        this.fetchAndUpdate(this.render.bind(this), w.UFIPayloadSourceType.USER_ACTION);
    };
    ka.prototype.$UFIController6 = function () {
        n.unmountComponentAtNode(this.root);
        this.ufiCentralUpdatesSubscriptions.forEach(s.unsubscribe.bind(s));
        g.unsubscribe(this.clearPageSubscription);
        this.viewasUFICleanSubscription && g.unsubscribe(this.viewasUFICleanSubscription);
    };
    ka.prototype.$UFIController7 = function () {
        this.$UFIController6();
        g.unsubscribe(this.clearPageletSubscription);
    };
    ka.prototype.$UFIControllert = function (la) {
        this.orderingMode = la;
        this.fetchAndUpdate(this.render.bind(this), w.UFIPayloadSourceType.USER_ACTION);
    };
    e.exports = ka;
}, null);