/*!CK:1671233288!*//*1412177820,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["KQd2Z"]);
}

__d("ComposerTargetType", [], function (a, b, c, d, e, f) {
    e.exports = {SELF_USER: "feed", OTHER_USER: "wall", GROUP: "group", PAGE: "page", EVENT: "event"};
}, null);
__d("ComposerXAjaxEndpoint", [], function (a, b, c, d, e, f) {
    e.exports = {ADS_MEDIA_UPLOAD: "\/ajax\/ads\/create\/composerx\/attachment\/media\/upload\/", ADS_ATTACHMENT_STATUS: "\/ajax\/ads\/create\/composerx\/attachment\/status\/", MEDIA_UPLOAD: "\/ajax\/composerx\/attachment\/media\/upload\/"};
}, null);
__d("ComposerXContextConfig", [], function (a, b, c, d, e, f) {
    e.exports = {propertyNames: {actorID: "ACTOR_ID", postID: "POST_ID"}, propertyValues: {ACTOR_ID: "actorID", POST_ID: "postID"}};
}, null);
__d("PrivacyRemindersLoggingTypes", [], function (a, b, c, d, e, f) {
    e.exports = {ONLY_ME_IMPRESSION: "only_me_impression", ONLY_ME_CONVERSION: "only_me_conversion", EVERYONE_IMPRESSION: "everyone_impression", EVERYONE_CONVERSION: "everyone_conversion", EVERYONE_TESTS_IMPRESSION: "everyone_tests_impression", EVERYONE_TESTS_CONVERSION: "everyone_tests_conversion", PUBLIC_POSTING_FILTER_NUX_IMPRESSION: "public_posting_filter_nux_impression", PUBLIC_POSTING_FILTER_NUX_CONVERSION: "public_posting_filter_nux_conversion", DELTA_EVERYONE_IMPRESSION: "delta_everyone_impression", DELTA_EVERYONE_CONVERSION: "delta_everyone_conversion", DELTA_EVERYONE_OK_BUTTON_CLICKED: "delta_everyone_ok_button_clicked", DELTA_EVERYONE_CHANGE_BUTTON_CLICKED: "delta_everyone_change_button_clicked"};
}, null);
__d("SuggestionConfig", [], function (a, b, c, d, e, f) {
    e.exports = {OG_TAGGER_TYPEAHEAD_BOOTSTRAP: "ogtaggertypeaheadbootstrap", OG_TAGGER_TYPEAHEAD_BOOTSTRAP_NO_RECENT_ACTION: "ogtaggertypeaheadbootstrapnorecentaction", GROUP_POST_COMPOSER: "grouppostcomposer", OG_SUGGESTION_BY_INPUT: "ogsuggestionbyinput"};
}, null);
__d("SuggestionUIPresentation", [], function (a, b, c, d, e, f) {
    e.exports = {FLYOUT: 1, TAGGER_BADGE: 2};
}, null);
__d("ComposerXAttachmentBootstrap", ["CSS", "Form", "Parent", "URI", "cx"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = [], m = {bootstrap: function (n) {
        m.load(i.byTag(n, 'form'), n.getAttribute('data-endpoint'));
    }, load: function (n, o, p) {
        var q = j(o).addQueryData({composerurihash: m.getURIHash(o)});
        g.conditionClass(n, "_fu", p);
        var r = i.byClass(n, "_2_4");
        g.removeClass(r, 'async_saving');
        h.setDisabled(n, false);
        n.action = q.toString();
        h.bootstrap(n);
    }, getURIHash: function (n) {
        if (n === 'initial')return 'initial';
        var o = l.indexOf(n);
        if (o !== -1) {
            return o + '';
        } else {
            o = l.length;
            l[o] = n;
            return o + '';
        }
    }};
    e.exports = m;
}, null);
__d("ComposerXContext", ["ComposerXContextConfig", "invariant"], function (a, b, c, d, e, f, g, h) {
    var i = function (k) {
        return g.propertyNames[k];
    };

    function j(k) {
        "use strict";
        this.$ComposerXContext0 = {};
        for (var l in k)this.setProperty(l, k[l]);
    }

    j.prototype.getProperty = function (k) {
        "use strict";
        h(i(k));
        return this.$ComposerXContext0[k];
    };
    j.prototype.setProperty = function (k, l) {
        "use strict";
        h(i(k));
        this.$ComposerXContext0[k] = l;
        return this;
    };
    j.PROPERTIES = g.propertyValues;
    e.exports = j;
}, null);
__d("ComposerXSessionIDs", ["DOM", "cx"], function (a, b, c, d, e, f, g, h) {
    function i() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (l) {
            var m = Math.random() * 16 | 0, n = l == 'x' ? m : (m & 3 | 8);
            return n.toString(16);
        });
    }

    var j = {}, k = {getSessionID: function (l) {
        return j[l];
    }, resetSessionID: function (l) {
        j[l] = i();
    }, createSessionIDInput: function (l) {
        return g.create('input', {type: 'hidden', name: 'composer_session_id', className: "_5r_b", value: l});
    }};
    e.exports = k;
}, null);
__d("ShareModeConst", [], function (a, b, c, d, e, f) {
    var g = {SELF_PAGE: 'selfpage', PAGE: 'page', SELF_POST: 'self', FRIEND: 'friend', GROUP: 'group', ALBUM: 'album', MESSAGE: 'message'};
    e.exports = g;
}, null);
__d("ComposerXMarauderLogger", ["Event", "ComposerTargetType", "ComposerXSessionIDs", "MarauderLogger", "ShareModeConst"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {};

    function m(o, p) {
        return function (q, r, s) {
            var t = l[q], u = i.getSessionID(q);
            if (!t || !u)return;
            if (p) {
                if (!t.loggedEventTypes[u])t.loggedEventTypes[u] = {};
                if (t.loggedEventTypes[u][o])return;
                t.loggedEventTypes[u][o] = true;
            }
            j.log(o, 'composer', {composer_type: r, target_type: t.targetType, ref: t.entryPointRef, error_info: s}, undefined, undefined, u);
        };
    }

    var n = {registerComposer: function (o, p, q) {
        l[o.id] = {targetType: p, entryPointRef: q, loggedEventTypes: {}};
    }, listenForPostEvents: function (o, p) {
        if (!p)return [];
        return [g.listen(p, 'submit', function () {
            n.logPost(o);
        }), g.listen(p, 'success', function () {
            n.logPostSuccess(o);
        }), g.listen(p, 'error', function (event) {
            n.logPostFailure(o, null, {error_code: event.data.response.error, error_description: event.data.response.errorDescription, error_summary: event.data.response.errorSummary});
        })];
    }, setShareMode: function (o, p) {
        var q = l[o];
        if (!q)return;
        switch (p) {
            case k.SELF_POST:
                q.targetType = h.SELF_USER;
                break;
            case k.FRIEND:
                q.targetType = h.OTHER_USER;
                break;
            case k.PAGE:
            case k.SELF_PAGE:
                q.targetType = h.PAGE;
                break;
            case k.GROUP:
                q.targetType = h.GROUP;
                break;
            default:
                q.targetType = h.OTHER;
        }
    }, logEntry: m('composer_entry', true), logCompleted: m('composer_post_completed', false), logPost: m('composer_post', false), logPostSuccess: m('composer_post_success', false), logPostFailure: m('composer_post_failure', false)};
    e.exports = n;
}, null);
__d("ComposerXSessionIDInserter", ["ComposerXSessionIDs", "DOM", "DOMQuery", "Event", "Parent", "csx", "cx", "onEnclosingPageletDestroy"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = {init: function (p) {
        var q = j.listen(p, 'submit', o._onSubmit);
        n(p, function () {
            q.remove();
        });
    }, _onSubmit: function (p) {
        o.insertSessionInput(p.getTarget());
    }, insertSessionInput: function (p) {
        var q = k.byClass(p, "_119");
        if (!q)return;
        var r = g.getSessionID(q.id);
        if (!r)return;
        var s = i.scry(p, "._5r_b")[0];
        if (!s) {
            h.prependContent(p, g.createSessionIDInput(r));
        } else s.value = r;
    }};
    e.exports = o;
}, null);
__d("ComposerXStore", ["Arbiter", "ge"], function (a, b, c, d, e, f, g, h) {
    var i = {};

    function j(l, m) {
        return 'ComposerX/' + l + '/' + m;
    }

    var k = {set: function (l, m, n) {
        if (!i[l])i[l] = {};
        i[l][m] = n;
        g.inform(j(l, m), {}, g.BEHAVIOR_STATE);
    }, get: function (l, m) {
        if (i[l])return i[l][m];
        return null;
    }, getAllForComposer: function (l) {
        return i[l] || {};
    }, waitForComponents: function (l, m, n) {
        g.registerCallback(n, m.map(j.bind(null, l)));
    }};
    g.subscribe('page_transition', function () {
        for (var l in i)if (!h(l))delete i[l];
    });
    e.exports = k;
}, null);
__d("ComposerX", ["ActorURI", "Arbiter", "ComposerXAttachmentBootstrap", "ComposerXContext", "ComposerXMarauderLogger", "ComposerXSessionIDs", "ComposerXSessionIDInserter", "ComposerXStore", "CSS", "DOM", "DOMQuery", "URI", "SubscriptionsHandler", "arrayContains", "copyProperties", "csx", "cx", "getObjectValues", "removeFromArray"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    var z = 'any';

    function aa(ba) {
        "use strict";
        this._root = ba;
        this._composerID = ba.id;
        this._attachments = {};
        this._context = new j({});
        l.resetSessionID(this._composerID);
        m.init(this._root);
        this._subscriptionsHandler = new s();
        this._subscriptionsHandler.addSubscriptions(h.subscribe(['composer/publish', 'composer/close'], function (ca, da) {
            if (da.composer_id === this._composerID)this.reset();
        }.bind(this)));
        this._subscriptionsHandler.addSubscriptions.apply(this._subscriptionsHandler, k.listenForPostEvents(this._composerID, this._getContent()));
        this._attachmentFetchForm = q.find(ba, "._2_4");
    }

    aa.prototype.getAttachment = function (ba, ca, da) {
        "use strict";
        ba = this._augmentURI(ba);
        var ea = i.getURIHash(ba);
        this._endpointHashToShow = ea;
        var fa = this._attachments[ea];
        if (fa) {
            this._showAttachmentAfterComponentsLoaded(ea, da);
        } else this.fetchAttachmentData(ba, ca);
    };
    aa.prototype.fetchAttachmentData = function (ba, ca) {
        "use strict";
        ba = this._augmentURI(ba);
        var da = i.getURIHash(ba);
        if (this._attachments[da])return;
        if (!t(this._currentFetchEndpoints, da)) {
            i.load(this._attachmentFetchForm, ba, ca);
            this._currentFetchEndpoints.push(da);
        }
    };
    aa.prototype.setAttachment = function (ba, ca, da, ea) {
        "use strict";
        y(this._currentFetchEndpoints, ba);
        this._setupAttachment(ba, ca, da, ea);
        this._showAttachmentAfterComponentsLoaded(ba, false);
    };
    aa.prototype.setInitialAttachment = function (ba, ca, da, ea, fa) {
        "use strict";
        if (fa)this._context = fa;
        ba = this._augmentURI(ba);
        var ga = i.getURIHash(ba);
        this._setupAttachment(ga, ca, da, ea);
        this._initialAttachmentEndpoint = ba;
        if (!this._currentInstance)this._showAttachmentAfterComponentsLoaded(ga, true);
    };
    aa.prototype.setComponent = function (ba, ca) {
        "use strict";
        if (!n.get(this._composerID, ba)) {
            n.set(this._composerID, ba, ca);
            p.appendContent(this._attachmentFetchForm, p.create('input', {type: 'hidden', name: 'loaded_components[]', value: ba}));
        }
    };
    aa.prototype.reset = function () {
        "use strict";
        if (this._currentInstance) {
            this._currentInstance.cleanup();
            this._currentInstance = null;
        }
        l.resetSessionID(this._composerID);
        for (var ba in this._attachments)this._attachments[ba].instance.reset();
        var ca = n.getAllForComposer(this._composerID);
        x(ca).forEach(function (da) {
            if (da.reset)da.reset(da);
        });
        this.getAttachment(this._initialAttachmentEndpoint, false, true);
        h.inform('composer/reset');
    };
    aa.prototype.destroy = function () {
        "use strict";
        this._subscriptionsHandler.release();
    };
    aa.prototype.addPlaceholders = function (ba, ca) {
        "use strict";
        var da;
        for (var ea in this._attachments) {
            da = this._attachments[ea];
            if (da.instance === ba) {
                ca.forEach(function (fa) {
                    da.placeholders.push(fa);
                    da.required_components.push(fa.component_name);
                });
                break;
            }
        }
        if (this._currentInstance === ba)this._fillPlaceholders(ca);
    };
    aa.prototype.hasAttachmentWithClassName = function (ba) {
        "use strict";
        return q.scry(this._root, '.' + ba).length > 0;
    };
    aa.prototype.showAttachmentThrobber = function () {
        "use strict";
        o.addClass(this._attachmentFetchForm, 'async_saving');
    };
    aa.prototype.hideAttachmentThrobber = function () {
        "use strict";
        o.removeClass(this._attachmentFetchForm, 'async_saving');
    };
    aa.prototype.getContext = function () {
        "use strict";
        return this._context;
    };
    aa.prototype.getID = function () {
        "use strict";
        return this._composerID;
    };
    aa.prototype._setupAttachment = function (ba, ca, da, ea) {
        "use strict";
        ca.setComposerID(this._composerID);
        this._attachments[ba] = {instance: ca, placeholders: da, required_components: ea};
        var fa = this._getContent(), ga = ca.getRoot();
        if (ga.parentNode !== fa) {
            o.hide(ga);
            p.appendContent(fa, ga);
        }
    };
    aa.prototype._getContent = function () {
        "use strict";
        return q.find(this._root, "div._55d0");
    };
    aa.prototype._showAttachment = function (ba, ca, da, ea) {
        "use strict";
        if (this._currentInstance === ba)return;
        if (this._endpointHashToShow === z) {
            this._endpointHashToShow = null;
        } else if (this._endpointHashToShow !== ca)return;
        if (this._currentInstance) {
            if (!this._currentInstance.canSwitchAway())return;
            this._currentInstance.cleanup();
        }
        this._currentInstance = ba;
        var fa = this._getContent().childNodes, ga = ba.getRoot();
        for (var ha = 0; ha < fa.length; ha++)if (fa[ha] !== ga)o.hide(fa[ha]);
        o.show(ga);
        this._fillPlaceholders(da);
        ba.initWithComponents(ea);
        this._setAttachmentSelectedClass(ba.attachmentClassName);
        h.inform('composer/initializedAttachment', {composerRoot: this._root, isInitial: ea});
    };
    aa.prototype._showAttachmentAfterComponentsLoaded = function (ba, ca) {
        "use strict";
        var da = this._attachments[ba];
        n.waitForComponents(this._composerID, da.required_components, this._showAttachment.bind(this, da.instance, ba, da.placeholders, ca));
    };
    aa.prototype._fillPlaceholders = function (ba) {
        "use strict";
        ba.forEach(function (ca) {
            var da = n.get(this._composerID, ca.component_name);
            if (da.element && ca.element !== da.element.parentNode)p.setContent(ca.element, da.element);
        }.bind(this));
    };
    aa.prototype._setAttachmentSelectedClass = function (ba) {
        "use strict";
        var ca = q.scry(this._root, "._519b")[0], da;
        if (ca) {
            o.removeClass(ca, "_519b");
            da = q.scry(ca, '*[aria-pressed="true"]')[0];
            if (da)da.setAttribute('aria-pressed', 'false');
        }
        if (ba) {
            var ea = q.scry(this._root, '.' + ba)[0];
            if (ea) {
                o.addClass(ea, "_519b");
                da = q.scry(ea, '*[aria-pressed="false"]')[0];
                if (da)da.setAttribute('aria-pressed', 'true');
            }
        }
    };
    aa.prototype._augmentURI = function (ba) {
        "use strict";
        var ca = this._context.getProperty(j.PROPERTIES.ACTOR_ID), da = (ca) ? g.create(ba, ca) : new r(ba), ea = this._context.getProperty(j.PROPERTIES.POST_ID);
        if (ea)da.addQueryData('post_id', ea);
        return da.toString();
    };
    u(aa.prototype, {_endpointHashToShow: z, _currentFetchEndpoints: [], _initialAttachmentEndpoint: ''});
    e.exports = aa;
}, null);
__d("ComposerXAttachment", ["ComposerXStore", "copyProperties"], function (a, b, c, d, e, f, g, h) {
    function i() {
        "use strict";
    }

    i.prototype.getRoot = function () {
        "use strict";
    };
    i.prototype.initWithComponents = function (j) {
        "use strict";
    };
    i.prototype.cleanup = function () {
        "use strict";
    };
    i.prototype.reset = function () {
        "use strict";
    };
    i.prototype.getComponent = function (j) {
        "use strict";
        return g.get(this._composerID, j);
    };
    i.prototype.getComponentInstance = function (j) {
        "use strict";
        var k = g.get(this._composerID, j);
        return k && k.instance;
    };
    i.prototype.canSwitchAway = function () {
        "use strict";
        return true;
    };
    i.prototype.setComposerID = function (j) {
        "use strict";
        this._composerID = j;
    };
    i.prototype.getComposerID = function () {
        "use strict";
        return this._composerID;
    };
    i.prototype.allowOGTagPreview = function () {
        "use strict";
        return false;
    };
    h(i.prototype, {attachmentClassName: ''});
    e.exports = i;
}, null);
__d("ComposerXController", ["ActorURI", "Arbiter", "ComposerX", "ComposerXAttachmentBootstrap", "ComposerXContext", "Parent", "$", "cx", "emptyFunction", "ge", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = {};

    function s(v) {
        var w = p(v);
        if (!w)return null;
        var x = l.byClass(m(v), "_119"), y = x.id;
        if (!r[y])r[y] = new i(x);
        return r[y];
    }

    function t(v) {
        var w = s(v);
        q(w !== null);
        return w;
    }

    var u = {getAttachment: function (v, w, x) {
        var y = t(v);
        y.getAttachment(w, x);
    }, fetchAttachmentData: function (v, w, x) {
        t(v).fetchAttachmentData(w, x);
    }, setAttachment: function (v, w, x, y, z) {
        var aa = s(v);
        if (aa)aa.setAttachment(w, x, y, z);
    }, setInitialAttachment: function (v, w, x, y, z, aa) {
        var ba = t(v);
        ba.setInitialAttachment(w, x, y, z, aa);
    }, setComponent: function (v, w, x) {
        var y = s(v);
        if (y)y.setComponent(w, x);
    }, reset: function (v) {
        var w = t(v);
        w.reset();
    }, holdTheMarkup: o, getEndpoint: function (v, w, x) {
        var y = t(v), z = y.getContext();
        w = g.create(w, z.getProperty(k.PROPERTIES.ACTOR_ID)).toString();
        j.load(y._attachmentFetchForm, w, x);
    }, addPlaceholders: function (v, w, x) {
        var y = t(v);
        y.addPlaceholders(w, x);
    }, hasAttachmentWithClassName: function (v, w) {
        var x = t(v);
        return x.hasAttachmentWithClassName(w);
    }, showAttachmentThrobber: function (v) {
        var w = t(v);
        w.showAttachmentThrobber();
    }, hideAttachmentThrobber: function (v) {
        var w = t(v);
        w.hideAttachmentThrobber();
    }, getComposerID: function (v) {
        return t(v).getID();
    }};
    j.bootstrap = function (v) {
        u.getAttachment(v, v.getAttribute('data-endpoint'));
    };
    h.subscribe('page_transition', function () {
        for (var v in r)if (!p(v)) {
            r[v].destroy();
            delete r[v];
        }
    });
    e.exports = u;
}, null);
__d("ComposerXAttachmentButtonBarState", ["CSS", "DOMQuery", "csx", "cx"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = {trackCityChanges: function (l) {
        var m = l.getComponent('citysharericon');
        if (m)return m.instance.subscribe('change', function () {
            k.updateMessageBoxBarState(l);
        });
    }, updateMessageBoxBarState: function (l) {
        var m = l.getComponent('citysharericon');
        if (m) {
            var n = h.find(l.getRoot(), "._1dsp");
            g.conditionClass(n, "_icv", !!m.instance.getValue());
        }
    }};
    e.exports = k;
}, null);
__d("ComposerXAttachmentUtils", ["BrowserSupport", "Button", "CSS", "DataStore", "DOMQuery", "Event", "Focus", "Input", "Keys", "PageTransitions", "Run", "StickyPlaceholderInput", "UserAgent_DEPRECATED", "URI", "csx", "debounce", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
    var x = 'composer_fixed_placeholder';

    function y(ba, ca) {
        if (!j.get(ba.element, x, false))ba.instance.setPlaceholder(ca);
    }

    function z(ba, ca) {
        var da = p.getMostRecentURI(), ea = t.getNextURI(), fa = da.getQueryData().hasOwnProperty('theater') && ca.path === ea.path, ga = ea.getQueryData().hasOwnProperty('theater'), ha = a.DialogNavigationStack && a.DialogNavigationStack.isActiveURI(ea);
        if (fa || ga || ha) {
            q.onAfterLoad(function () {
                q.onBeforeUnload(function () {
                    return z(ba, ca);
                });
            });
            return;
        }
        if (a.Dialog && a.Dialog.getCurrent())return;
        if (ba())return "\u0425\u043e\u0442\u0438\u0442\u0435 \u043f\u043e\u043a\u0438\u043d\u0443\u0442\u044c \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443, \u043d\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0432 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u044e?";
    }

    var aa = {initMentions: function (ba, ca) {
        y(ba, ca);
        var da = k.find(ba.element, 'textarea.input');
        m.set(da);
    }, setStickyPlaceholderForMentions: function (ba, ca) {
        if (k.contains(ba.element, document.activeElement) && i.hasClass(document.activeElement, 'DOMControl_placeholder'))document.activeElement.blur();
        y(ba, ca);
    }, setPlaceholderIsFixed: function (ba, ca) {
        j.set(ba.element, x, !!ca);
    }, setStickyPlaceholderForTypeahead: function (ba, ca) {
        var da = k.find(ba, '.textInput');
        r.setPlaceholderText(da, ca);
    }, registerInputForLeaveWarning: function (ba) {
        aa.registerForLeaveWarning(function () {
            return ba.offsetParent !== null && !n.isEmpty(ba);
        });
    }, registerForLeaveWarning: function (ba) {
        var ca = t.getNextURI();
        q.onBeforeUnload(function () {
            return z(ba, ca);
        });
    }, listenForPostSubmission: function (ba) {
        l.listen(ba, 'keydown', function (event) {
            var ca = event.getModifiers(), da = s.osx() ? ca.meta : ca.control, ea = k.find(ba.form, "._11b" + '[type="submit"]');
            if ((event.keyCode === o.RETURN) && da && h.isEnabled(ea)) {
                ba.blur();
                if (l.fire(ea, 'click'))l.fire(ba.form, 'submit');
                event.preventDefault();
            }
        });
    }, disableSaveOnEmpty: function (ba, ca) {
        var da = k.find(ba, '.textInput'), ea = v(function (ga) {
            h.setEnabled(ca, da.value.trim().length !== 0);
        }, 50), fa = [];
        fa.push(l.listen(da, 'keyup', ea));
        if (g.hasClipboardEvents()) {
            fa.push(l.listen(da, 'cut', ea));
            fa.push(l.listen(da, 'paste', ea));
        } else {
            fa.push(l.listen(da, 'mouseout', ea));
            fa.push(l.listen(da, 'mousemove', ea));
        }
        q.onUnload(function () {
            for (var ga = 0; ga < fa.length; ga++)fa[ga].remove();
            fa = null;
        });
    }};
    e.exports = aa;
}, null);
__d("DynamicIconSelector", ["Button", "CSS", "DOM", "SelectorDeprecated"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = {swapIcon: function (l) {
        var m = j.getSelectedOptions(l)[0], n = m && i.scry(m, '.itemIcon')[0], o = j.getSelectorButton(l);
        if (n) {
            g.setIcon(o, n.cloneNode(true));
        } else {
            var p = i.scry(o, '.img')[0];
            p && i.remove(p);
        }
        h.conditionClass(o, 'uiSelectorChevronOnly', !n);
    }};
    j.subscribe('change', function (l, m) {
        var n = m.selector;
        if (h.hasClass(n, 'dynamicIconSelector'))k.swapIcon(n);
    });
    e.exports = k;
}, null);
__d("PrivacySelectorOption", ["Arbiter", "AudienceSelectorTags", "CSS", "CurrentUser", "DOM", "DynamicIconSelector", "Parent", "PrivacyConst", "SelectorDeprecated", "copyProperties", "csx", "fbt", "intlList", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
    function u(v, w) {
        if (!v)throw new Error("there's no DOM option. Config data: ", w);
        this._elem = v;
        this._selector = m.byClass(this._elem, 'audienceSelector');
        if (!this._selector)return;
        this._priv_base_val = w.priv_base_val;
        this._audienceCount = w.audience_count || "";
        this._hasRestricted = w.has_restricted || false;
        this._isCustom = w.is_custom || false;
        this._includedAudience = w.included || "";
        this._excludedAudience = w.excluded || {};
        this._excludedTaggees = {};
        this._tagExpansionBehavior = w.tag_expansion_behavior || n.TagExpansion.NONE;
        this._plusLabel = k.scry(v, '.plusLabel')[0];
        this._audienceCountLabel = k.scry(v, '.audienceCountLabel')[0];
        this._taggedIDs = [];
        this._tags = [];
        this._recalculateTooltipAndLabel();
        this._updateOptionCountLabel();
        this._updateSelector();
        g.subscribe('Composer/changedtags', function (x, y) {
            var z = i.hasClass(this._selector, 'composerAudienceSelector');
            if (!this._getChangedData() || !z)return;
            this._tags = [];
            this._taggedIDs = [];
            for (var aa = 0; aa < y.withTags.length; aa++) {
                var ba = y.withTags[aa].info;
                if (ba.uid != j.getID()) {
                    this._tags.push(ba.text);
                    this._taggedIDs.push(ba.uid);
                }
            }
            for (aa in y.mention)if (y.mention[aa].type == 'user' && y.mention[aa].uid != j.getID()) {
                this._tags.push(y.mention[aa].text);
                this._taggedIDs.push(y.mention[aa].uid);
            }
            var ca = k.scry(document.body, "._5l7q")[0];
            ca && !!this._taggedIDs.length && i.hide(ca);
            this._updateOptionCountLabel();
            var da = this._recalculateTooltipAndLabel();
            if (da && o.isOptionSelected(this._elem)) {
                this._updateSelector();
                g.inform('SelectedPrivacyOption/changed', this._getChangedData());
            }
        }.bind(this));
        o.listen(this._selector, 'change', this._updateSelector.bind(this));
    }

    p(u.prototype, {updateOption: function (v, w, x, y, z) {
        this._priv_base_val = v;
        this._includedAudience = w;
        this._excludedAudience = x;
        this._tagExpansionBehavior = y;
        this._audienceCount = z;
        this._recalculateTooltipAndLabel();
        this._updateOptionCountLabel();
        return {label: this._label, tooltip: this._tooltip};
    }, _recalculateTooltipAndLabel: function () {
        var v = this._label;
        this._label = this._getNewSelectorLabel();
        var w = this._tooltip;
        this._tooltip = this._getNewTooltip();
        return (w != this._tooltip) || (v != this._label);
    }, _getNewTooltip: function () {
        if (this._isCustom)return this._recalcCustomTooltip();
        switch (this._priv_base_val) {
            case n.FriendsValue.ALL_FRIENDS:
                return this._recalcFriendsTooltip();
            case n.FriendsValue.FRIENDS_MINUS_ACQUAINTANCES:
                return this._recalcFriendsMinusTooltip();
            case n.FriendsValue.SELF:
                var v = this._getTagExpansionText();
                return v ? v : this._getIncludedAudience();
            default:
                return this._recalcCustomTooltip();
        }
    }, _getNewSelectorLabel: function () {
        var v = this._elem.getAttribute('data-label').replace(/\(.*\)/, "");
        if (this._showAudienceCount()) {
            var w = ' (' + this._audienceCount + ')';
            v += w;
        }
        if (this._isTagExpanded())v += ' (+)';
        return v;
    }, _updateOptionCountLabel: function () {
        if (this._audienceCountLabel) {
            if (this._showAudienceCount()) {
                var v = ' (' + this._audienceCount + ')';
                k.setContent(this._audienceCountLabel, v);
            }
            i.conditionShow(this._audienceCountLabel, this._showAudienceCount());
        }
        this._plusLabel && i.conditionShow(this._plusLabel, this._isTagExpanded());
    }, _getChangedData: function () {
        return {tags: this._taggedIDs, privacy: this._priv_base_val};
    }, _showAudienceCount: function () {
        return (this._audienceCountLabel && this._audienceCount && this._audienceCount.length > 0);
    }, _isTagExpanded: function () {
        var v = this._getTagExpansionBehavior(), w = !!this._taggedIDs.length || this._alreadyHasTags();
        return (w && v != n.TagExpansion.NONE);
    }, _alreadyHasTags: function () {
        var v = k.scry(this._selector, '*[data-oid]')[0];
        v = v && v.getAttribute('data-oid');
        return v && h.hasTags(v);
    }, _updateSelector: function () {
        if (o.isOptionSelected(this._elem)) {
            var v = i.hasClass(this._selector, 'composerAudienceSelector');
            v && o.setButtonLabel(this._selector, this._label);
            o.setButtonTooltip(this._selector, this._tooltip);
            l.swapIcon(this._selector);
            return false;
        }
        return true;
    }, _isSharedAlbum: function () {
        var v = k.scry(this._selector, '*[data-shared-album]')[0];
        return v && v.getAttribute('data-shared-album');
    }, _getTagExpansionBehavior: function () {
        if (this._tagExpansionBehavior)return this._tagExpansionBehavior;
        var v = this._priv_base_val === n.FriendsValue.SELF, w = this._priv_base_val === n.FriendsValue.EVERYONE;
        if ((v && this._isSharedAlbum()) || w) {
            return n.TagExpansion.NONE;
        } else if (this._priv_base_val < n.FriendsValue.ALL_FRIENDS)return n.TagExpansion.TAGGEES;
        return n.TagExpansion.FRIENDS_OF_TAGGEES;
    }, _getTagExpansionText: function () {
        var v = this._getTagExpansionBehavior();
        if (!!this._taggedIDs.length || this._alreadyHasTags()) {
            if (v == n.TagExpansion.FRIENDS_OF_TAGGEES) {
                return "\u0434\u0440\u0443\u0437\u044c\u044f \u0432\u0441\u0435\u0445, \u043a\u0442\u043e \u0431\u044b\u043b \u043e\u0442\u043c\u0435\u0447\u0435\u043d";
            } else if (v == n.TagExpansion.TAGGEES)return "\u0412\u0441\u0435, \u043a\u0442\u043e \u0431\u044b\u043b \u043e\u0442\u043c\u0435\u0447\u0435\u043d";
            return '';
        }
        return '';
    }, _getIncludedAudience: function () {
        if (this._includedAudience)return this._includedAudience;
        var v = this._priv_base_val === n.FriendsValue.SELF;
        if (v && !this._isSharedAlbum())return "\u0422\u043e\u043b\u044c\u043a\u043e \u044f";
        return this._elem.getAttribute('data-label');
    }, _getCombinedSentence: function (v, w) {
        if (!w)return v;
        return r._("{list of people who can see this}; \u0417\u0430 \u0438\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435\u043c: {list of people who cannot see this}", [r.param("list of people who can see this", v), r.param("list of people who cannot see this", w)]);
    }, _recalcFriendsTooltip: function () {
        var v = this._tags.length;
        if (v > 2) {
            return this._hasRestricted ? "\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044c\u044f \u0438 \u0434\u0440\u0443\u0437\u044c\u044f \u0432\u0441\u0435\u0445 \u043e\u0442\u043c\u0435\u0447\u0435\u043d\u043d\u044b\u0445 \u043b\u044e\u0434\u0435\u0439; \u041a\u0440\u043e\u043c\u0435: \u041e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u043d\u044b\u0435" : "\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044c\u044f \u0438 \u0434\u0440\u0443\u0437\u044c\u044f \u0432\u0441\u0435\u0445 \u043e\u0442\u043c\u0435\u0447\u0435\u043d\u043d\u044b\u0445 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439";
        } else if (v == 2) {
            if (this._hasRestricted) {
                return t._("\u0412\u0441\u0435 \u0432\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044c\u044f, \u0434\u0440\u0443\u0437\u044c\u044f {user} \u0438 {user2}; \u041a\u0440\u043e\u043c\u0435: \u041e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u043d\u044b\u0435", {user: this._tags[0], user2: this._tags[1]});
            } else return t._("\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044c\u044f, \u0434\u0440\u0443\u0437\u044c\u044f {user} \u0438 \u0434\u0440\u0443\u0437\u044c\u044f {user2}", {user: this._tags[0], user2: this._tags[1]});
        } else if (v == 1) {
            if (this._hasRestricted) {
                return t._("\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044c\u044f \u0438 \u0434\u0440\u0443\u0437\u044c\u044f {user}; \u041a\u0440\u043e\u043c\u0435: \u041e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u043d\u044b\u0435", {user: this._tags[0]});
            } else return t._("\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044c\u044f \u0438 \u0434\u0440\u0443\u0437\u044c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f  {user}", {user: this._tags[0]});
        } else return this._hasRestricted ? "\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044c\u044f; \u041a\u0440\u043e\u043c\u0435: \u041e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u043d\u044b\u0435" : "\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044c\u044f";
    }, _recalcFriendsMinusTooltip: function () {
        var v = this._tags.length;
        if (v > 0 || this._alreadyHasTags()) {
            var w = "\u0434\u0440\u0443\u0437\u044c\u044f \u0432\u0441\u0435\u0445, \u043a\u0442\u043e \u0431\u044b\u043b \u043e\u0442\u043c\u0435\u0447\u0435\u043d", x = r._("{people who can see this}, {list of more people who can see this}", [r.param("people who can see this", "\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044c\u044f"), r.param("list of more people who can see this", w)]), y = "\u0417\u043d\u0430\u043a\u043e\u043c\u044b\u0435";
            if (this._hasRestricted)y = r._("{Name of Acquaintances friend list}, {restricted}", [r.param("Name of Acquaintances friend list", y), r.param("restricted", "\u041e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u043d\u044b\u0435")]);
            return this._getCombinedSentence(x, y);
        } else {
            if (this._hasRestricted)return "\u0414\u0440\u0443\u0437\u044c\u044f, \u043a\u0440\u043e\u043c\u0435: \u0417\u043d\u0430\u043a\u043e\u043c\u044b\u0435, \u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u043e";
            return "\u0414\u0440\u0443\u0437\u044c\u044f, \u043a\u0440\u043e\u043c\u0435 \u0417\u043d\u0430\u043a\u043e\u043c\u044b\u0445";
        }
    }, _recalcCustomTooltip: function () {
        var v = this._getIncludedAudience(), w = this._getTagExpansionText();
        if (w)v = r._("{list of people who can see this}, {list of additional people who can see this}", [r.param("list of people who can see this", v), r.param("list of additional people who can see this", w)]);
        for (var x = 0; x < this._taggedIDs.length; x++) {
            y = this._taggedIDs[x];
            if (y in this._excludedAudience) {
                delete this._excludedAudience[y];
                this._excludedTaggees[y] = this._tags[x];
                break;
            }
        }
        for (var y in this._excludedTaggees)if (this._excludedTaggees.hasOwnProperty(y))if (this._taggedIDs.indexOf(y) === -1) {
            this._excludedAudience[y] = this._excludedTaggees[y];
            delete this._excludedTaggees[y];
            break;
        }
        var z = [];
        for (x in this._excludedAudience)if (this._excludedAudience.hasOwnProperty(x))z.push(this._excludedAudience[x]);
        return this._getCombinedSentence(v, s(z));
    }});
    e.exports = u;
}, null);
__d("CustomPrivacyOptionController", ["Arbiter", "AsyncDialog", "AsyncRequest", "DOM", "Event", "Form", "Parent", "PrivacyConst", "PrivacySelectorOption", "SelectorDeprecated", "XPrivacyCustomDialogControllerURIBuilder", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    function s(t, u) {
        if (!t)return;
        setTimeout((function () {
            this._selector = m.byClass(t, 'audienceSelector');
            if (!this._selector)return;
            this.initCustomState(t, u.option_id, u.id);
            var v = {priv_base_val: u.base_audience_value, audience_count: u.audience_count, is_custom: true, included: u.included_audience, excluded: u.excluded_audience, tag_expansion_behavior: u.tag_expansion_behavior};
            this._optionJSInstance = new o(t, v);
            k.listen(t, 'click', function (event) {
                this.openCustomDialog(event, u.option_id, u.explain_tags, u.autosave, u.limit_community, u.limit_facebook, u.limit_fof, u.limit_tagexpand, u.source);
            }.bind(this));
            p.listen(this._selector, 'select', function (w) {
                if (w.option._id != this._id)this.clearCustomState();
            }.bind(this));
        }).bind(this), 0);
    }

    r(s, {_instances: {}, update: function (t, u, v, w, x, y, z, aa, ba) {
        var ca = s._instances[t];
        ca._update(u, v)._updateOption(v, x, y, z, aa, ba);
        g.inform('Form/change', {node: ca._container});
    }, getData: function (t) {
        var u = s._instances[t];
        return u && u._privacyData;
    }, setPrivacyData: function (t, u, v) {
        s._instances[t]._update(u, v);
    }});
    r(s.prototype, {_updateOption: function (t, u, v, w, x, y) {
        var z = p.getOption(this._selector, t) || p.getOption(this._selector, n.BaseValue.CUSTOM + ''), aa = this._optionJSInstance.updateOption(u, v, w, x, y);
        g.inform('CustomPrivacyOptionController/update', {selector: this._selector, option: z, tooltip: aa.tooltip, label: aa.label});
        return this;
    }, _update: function (t, u) {
        var v = u == n.BaseValue.CUSTOM || !p.getOption(this._selector, u), w = this._selector.getAttribute('data-name');
        this.updateCustomState(t, v, w);
        return this;
    }, initCustomState: function (t, u, v) {
        s._instances[u] = this;
        this._container = j.find(t, '.customPrivacyInputs');
        this._id = v;
        this._privacyData = {};
        var w = l.serialize(this._container);
        if (w.audience)this._privacyData = w.audience[v];
        return t;
    }, openCustomDialog: function (event, t, u, v, w, x, y, z, aa) {
        var ba = new q().setString('option_id', t).setString('id', this._id).setString('privacy_data', JSON.stringify(this._privacyData)).setBool('explain_tags', u).setBool('autosave', v).setBool('limit_community', w).setBool('limit_facebook', x).setBool('limit_fof', y).setBool('limit_tagexpand', z).setBool('is_new_privacy_selector', false).setString('source', aa).getURI(), ca = new i(ba);
        ca.setRelativeTo(event.getTarget());
        h.send(ca, function (da) {
            da.subscribe('cancel', function () {
                g.inform('CustomPrivacyOptionController/cancel', {selector: this._selector});
            }.bind(this));
        }.bind(this));
    }, updateCustomState: function (t, u, v) {
        this.clearCustomState();
        this._privacyData = r({}, t);
        if (u)if (v) {
            v = v.slice(0, -'[value]'.length);
            var w = {};
            w[v] = t;
            l.createHiddenInputs(w, this._container, null, true);
        }
    }, clearCustomState: function () {
        this._privacyData = {};
        j.empty(this._container);
    }});
    e.exports = s;
}, null);
__d("AudienceSelector", ["Arbiter", "AsyncRequest", "AudienceSelectorTags", "CSS", "CustomPrivacyOptionController", "DOM", "DynamicIconSelector", "PrivacyConst", "SelectorDeprecated"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = {};
    o.subscribe('select', function (r, s) {
        if (!j.hasClass(s.selector, 'audienceSelector'))return;
        var t = o.getOptionValue(s.option);
        s.value = t;
        g.inform('AudienceSelector/changed', s);
        if (t == n.BaseValue.CUSTOM && !j.hasClass(s.option, 'noDialog')) {
            o.toggle(s.selector);
            return false;
        }
        g.inform('AudienceSelector/changedNonCustomDialogButton', s);
        if (j.hasClass(s.selector, 'dataTooltip')) {
            var u = l.find(s.option, '.itemAnchor').getAttribute('data-tooltip');
            o.setButtonTooltip(s.selector, u || null);
        }
        if (!j.hasClass(s.option, 'specialOption'))return;
        var v = l.find(s.option, 'a').getAttribute('data-type');
        if (j.hasClass(s.option, 'moreOption')) {
            j.addClass(s.selector, v);
            j.addClass(s.selector, 'showSecondaryOptions');
            return false;
        } else if (j.hasClass(s.option, 'returnOption')) {
            j.removeClass(s.selector, 'showSecondaryOptions');
            j.removeClass(s.selector, 'friendList');
            return false;
        }
    });
    var q = {keepSynchronized: function (r, s) {
        p[r] || (p[r] = {});
        p[r][s.id] = s;
    }, setHasTags: function (r) {
        i.setHasTags(r);
    }, getComposerInstance: function () {
        var r = p['PrivacyLiteNav/audience'];
        if (r) {
            var s;
            for (var t in r) {
                s = r[t];
                return s;
            }
        }
        return null;
    }, forceAndKeepSynchronized: function (r, s) {
        q.keepSynchronized(r, s);
        g.inform('AudienceSelector/update', {option: o.getSelectedOptions(s)[0], selector: s});
    }, get: function (r) {
        if (j.hasClass(r, 'audienceSelector'))return r;
        var s = l.scry(r, 'div.audienceSelector');
        if (s.length != 1)return;
        return s[0];
    }, setAudience: function (r, s) {
        var t = q.get(r);
        o.loadMenu(t, function (u) {
            o.setSelected(t, s.toString());
            m.swapIcon(t);
            var v = o.getSelectedOptions(t), w = v[0] && l.find(v[0], 'a');
            if (w && w.getAttribute('ajaxify'))h.bootstrap(w.getAttribute('ajaxify'), w, true);
            g.inform('AudienceSelector/changed', {option: v[0], selector: t});
        });
    }};
    g.subscribe('CustomPrivacyOptionController/update', function (r, s) {
        if (!j.hasClass(s.selector, 'audienceSelector'))return;
        o.setSelected(s.selector, o.getOptionValue(s.option));
        m.swapIcon(s.selector);
        var t = j.hasClass(s.selector, 'composerAudienceSelector'), u = j.hasClass(s.selector, 'inlineAudienceWidget');
        if (t || u)o.setButtonLabel(s.selector, s.label);
        o.setButtonTooltip(s.selector, s.tooltip);
        g.inform('AudienceSelector/update', s);
    });
    g.subscribe(['AudienceSelector/changed', 'AudienceSelector/update'], function (event, r) {
        var s = o.getOptionValue(r.option), t = {};
        if (s == n.BaseValue.CUSTOM) {
            if (event == 'AudienceSelector/changed')return;
            t = k.getData(r.option.id);
            if (!t)return;
        } else if (j.hasClass(r.selector, 'inlineAudienceWidget'))o.setButtonLabel(r.selector, r.option.innerText);
        for (var u in p) {
            var v = p[u];
            if (v[r.selector.id]) {
                g.inform('AudienceSelector/syncNonSelectorIcon', {category: u});
                for (var w in v) {
                    var x = v[w];
                    if (!x || r.selector === x)continue;
                    if (o.getValue(x) !== s) {
                        o.setSelected(x, s);
                        m.swapIcon(x);
                    }
                    if (s == n.BaseValue.CUSTOM) {
                        var y = o.getOption(x, n.BaseValue.CUSTOM + '');
                        if (y) {
                            k.setPrivacyData(y.id, t, s);
                            o.setButtonTooltip(x, r.tooltip);
                        }
                    }
                }
            }
        }
    });
    e.exports = q;
}, null);
__d("XPrivacyAudienceAlignmentLoggingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/privacy\/audience_alignment\/log\/", {client_time: {type: "Int"}, event: {type: "Enum", required: true}, product: {type: "Enum", required: true}});
}, null);
__d("AudienceAlignment", ["Arbiter", "AsyncRequest", "AudienceSelector", "ComposerXStore", "ContextualDialog", "CSS", "cx", "DialogExpansion", "DOM", "Event", "Focus", "Keys", "ModalMask", "PrivacyConst", "SelectorDeprecated", "Style", "XPrivacyAudienceAlignmentLoggingControllerURIBuilder"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
    var x = false, y, z;

    function aa(wa, xa) {
        wa.setContext(xa);
        wa.show();
    }

    function ba(wa, xa) {
        var ya = v.get(xa.getContentRoot(), 'margin-top');
        wa.setWidth(this.aaa_dialog_width);
        wa.show();
        v.set(wa.getContentRoot(), 'margin-top', ya);
    }

    var ca = 'wwwtux', da = 'wwwroadblock', ea = 'exposed', fa = 'friends_sticky', ga = 'public_sticky', ha = 'selector', ia = 'holdout', ja = 'dismissal', ka = 'learn_more', la = 'blur';

    function ma(wa, event) {
        var xa = new w().setEnum('product', wa).setEnum('event', event).setInt('client_time', Date.now()).getURI(), ya = new h().setURI(xa);
        ya.send();
    }

    function na(wa, xa, ya, za) {
        if (x)return false;
        if (!o.contains(document.body, wa.getRoot()))return false;
        var ab = j.get(xa, 'maininput');
        if (ab && ab.instance.getValue())return false;
        if (!ya)return false;
        var bb = null;
        if (za) {
            bb = za.getSelectedBaseValue();
        } else bb = parseInt(u.getValue(ya), 10);
        return (bb === t.BaseValue.EVERYONE);
    }

    function oa() {
        var wa = o.scry(document.body, '#pagelet_timeline_recent');
        if (wa.length >= 1) {
            var xa = o.scry(wa[0], 'li.fbTimelineComposerCapsule');
            if (xa.length >= 1)return xa[0];
        }
        return null;
    }

    function pa(wa, xa, ya, za) {
        var ab;
        if (za) {
            ab = za.getMenuElement();
        } else {
            var bb = o.find(ya, 'div.audienceSelector');
            ab = o.scry(bb, 'div.wrap');
        }
        if (ab.length < 1)return;
        var cb = oa(), db;
        if (za) {
            za.subscribeOnce('open', function () {
                if (cb)l.addClass(cb, "_2wc-");
                k.setContext(xa, ab);
                xa.setOffsetY(30);
                xa.show();
            });
        } else db = u.listen(bb, 'open', function () {
            var gb = o.scry(ab[0], 'div.uiSelectorMenuWrapper');
            if (gb.length > 0) {
                if (cb)l.addClass(cb, "_2wc-");
                k.setContext(xa, gb[0]);
                xa.setOffsetX(12);
                xa.show();
            } else s.hide();
            u.unsubscribe(db);
        });
        if (za) {
            za.getPopover().subscribeOnce('hide', function () {
                qa(xa, ab, cb, wa);
            });
        } else var eb = u.listen(bb, 'close', function () {
            qa(xa, ab[0], cb, wa);
            u.unsubscribe(eb);
        });
        if (za) {
            l.addClass(ab, "_35mn");
            var fb = za.getTriggerButtonElement();
            l.addClass(fb, "_35mn");
        } else l.addClass(ab[0], "_35mn");
        setTimeout(function () {
            s.show();
            v.set(s.getNode(), 'opacity', '0.3');
            v.set(s.getNode(), 'background-color', 'rgb(0,0,0)');
            if (za) {
                za.openSelectorExpanded();
            } else u.toggle(bb);
        }, 20);
    }

    function qa(wa, xa, ya, za) {
        s.hide();
        wa.hide();
        l.removeClass(xa, "_35mn");
        if (ya)l.removeClass(ya, "_2wc-");
        q.set(o.find(za.getRoot(), 'textarea.input'));
    }

    function ra(wa, xa) {
        wa.unsubscribe(y);
        wa.hide();
        q.set(o.find(xa.getRoot(), 'textarea.input'));
    }

    function sa(wa) {
        var xa = ua(wa);
        return xa && xa.element;
    }

    function ta(wa) {
        var xa = ua(wa);
        return xa && xa.instance && xa.instance.getInstance().getInstance();
    }

    function ua(wa) {
        return j.get(wa, 'mainprivacywidget');
    }

    var va = {abort: function () {
        x = true;
    }, startOnComposerFocus: function (wa, xa, ya, za, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb) {
        var mb = da;
        if (ib)mb = ca;
        g.subscribe('composer/focus', function () {
            var nb = sa(lb), ob = ta(lb);
            if (na(xa, lb, nb, ob))if (wa) {
                ma(mb, ia);
            } else {
                ma(mb, ea);
                setTimeout(function () {
                    ya.show();
                    var pb = gb.parentElement;
                    this.aaa_dialog_width = ya.getWidth() + pb.offsetWidth - 490;
                    var qb = new n(ya);
                    qb.setTargetWidth(this.aaa_dialog_width);
                    qb._onAfterShow();
                    q.set(ya.getRoot());
                }, 100);
            }
        });
        p.listen(fb, 'click', function () {
            var nb = sa(lb), ob = ta(lb);
            ra(ya, xa);
            if (ob) {
                ob.selectOption(t.PostParam.FRIENDS);
            } else i.setAudience(xa.getRoot(), t.BaseValue.ALL_FRIENDS);
            aa(za, nb);
            ma(mb, fa);
        });
        p.listen(gb, 'click', function () {
            var nb = sa(lb), ob = ta(lb);
            ra(ya, xa);
            if (ob) {
                ob.selectOption(t.PostParam.EVERYONE);
            } else i.setAudience(xa.getRoot(), t.BaseValue.EVERYONE);
            aa(ab, nb);
            ma(mb, ga);
        });
        p.listen(hb, 'click', function () {
            ya.subscribe('hide', function () {
                var nb = sa(lb), ob = ta(lb);
                if (bb)pa(xa, bb, nb, ob);
            });
            ra(ya, xa);
            ma(mb, ha);
        });
        if (ib)p.listen(ib, 'click', function () {
            var nb = sa(lb);
            ra(ya, xa);
            ma(mb, ja);
            if (cb)aa(cb, nb);
        });
        y = ya.subscribe('hide', function () {
            var nb = sa(lb);
            q.set(o.find(xa.getRoot(), 'textarea.input'));
            ma(mb, ja);
            if (db)aa(db, nb);
        });
        z = ya.subscribe('blur', function () {
            ma(mb, la);
        });
        p.listen(jb, 'click', function (event) {
            ba(eb, ya);
            ma(mb, ka);
        });
        p.listen(kb, 'click', function (event) {
            eb.hide();
        });
        if (ib)p.listen(eb.getRoot(), 'keydown', function (event) {
            if (p.getKeyCode(event) === r.ESC) {
                eb.hide();
                p.kill(event);
            }
        });
    }};
    e.exports = va;
}, null);
__d("ComposerXDragDrop", ["Arbiter", "ComposerXAjaxEndpoint", "ComposerXController", "CSS", "DOMQuery", "DragDropTarget", "Parent", "URI", "csx", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = h.MEDIA_UPLOAD, r = '/ajax/composerx/attachment/link/scraper/', s = function (u) {
        u();
    };

    function t(u, v, w, x) {
        "use strict";
        this._root = u;
        this._composerID = v;
        this._targetID = w;
        x = x || s;
        this._dragdrop = new l(u).setOnFilesDropCallback(function (y) {
            x(this._uploadFiles.bind(this, y));
        }.bind(this)).setFileFilter(t.filterImages).enable();
        t.handleDragEnterAndLeave(u);
        g.subscribe('composer/deactivateDragdrop', function () {
            this.deactivate();
        }.bind(this));
        g.subscribe('composer/reactivateDragdrop', function () {
            this.reactivate();
        }.bind(this));
    }

    t.prototype.enableURLDropping = function () {
        "use strict";
        this._dragdrop.setOnURLDropCallback(this._onURLDrop.bind(this));
    };
    t.prototype.deactivate = function () {
        "use strict";
        this._dragdrop.disable();
    };
    t.prototype.reactivate = function () {
        "use strict";
        this._dragdrop.enable();
    };
    t.prototype._uploadFiles = function (u) {
        "use strict";
        i.getAttachment(this._root, q);
        g.inform('ComposerXFilesStore/filesDropped/' + this._composerID + '/mediaupload', {files: u}, g.BEHAVIOR_PERSISTENT);
    };
    t.prototype._onURLDrop = function (u) {
        "use strict";
        var v = new n(r);
        v.addQueryData({scrape_url: encodeURIComponent(u)});
        i.getAttachment(this._root, v.toString());
    };
    t.handleDragEnterAndLeave = function (u) {
        "use strict";
        var v = k.scry(m.byClass(u, "_119"), "._2wr");
        g.subscribe('dragenter', function (w, x) {
            if (u == x.element)v.forEach(j.hide);
        });
        g.subscribe('dragleave', function (w, x) {
            if (u == x.element)v.forEach(j.show);
        });
    };
    t.filterImages = function (u) {
        "use strict";
        var v = [];
        for (var w = 0; w < u.length; w++)if (u[w].type.match('image/*'))v.push(u[w]);
        return v;
    };
    e.exports = t;
}, null);
__d("ComposerXNUX", ["AsyncRequest", "ComposerXDragDrop", "CSS", "DOM", "Event", "SubscriptionsHandler", "csx", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = {}, p = {};

    function q(s, t, u) {
        var v = u.dataTransfer.items;
        if (v) {
            var w = h.filterImages(v);
            if (!w.length)return;
        }
        r.acknowledgeDialog(s, t);
    }

    var r = {CAMERA_NUX: 'camera_nux_seen', ADD_MORE_NUX: 'add_more_nux_seen', HMU_NUX: 'hmu_nux_seen', HMU_POST_NUX: 'hmu_post_nux_seen', FACEREC_SUGGESTIONS_NUX: 'facerec_suggestions_nux_seen', TAGGING_FLYOUT_NUX: 'tagging_flyout_nux_seen', OGCOMPOSER_NEWVERBS_NUX: 'ogcomposer_newverbs_nux_seen', OGCOMPOSER_NEW_ICON_PICKER_NUX: 'minutiae_icon_picker_nux_seen', SHARER_MINUTIAE_NUX: 'sharer_minutiae_nux_seen', onInit: function (s, t, u) {
        if (o[u])return;
        p[u] = p[u] || new l();
        var v = p[u];
        v.engage();
        var w = s.getRoot();
        i.addClass(w, "_4bka");
        var x = j.scry(w, "._3o-a");
        x.forEach(function (y) {
            v.addSubscriptions(k.listen(y, 'click', r.acknowledgeDialog.bind(null, u, s)));
        });
        if (u == r.CAMERA_NUX)v.addSubscriptions(k.listen(document, 'dragenter', q.bind(null, u, s)));
        v.addSubscriptions(s.subscribe('cancel', r.sendMarkSeenRequest.bind(null, u)), s.subscribe('hide', v.release.bind(v)));
        s.setContext(t).show();
    }, acknowledgeDialog: function (s, t) {
        r.sendMarkSeenRequest(s);
        t.hide();
    }, sendMarkSeenRequest: function (s) {
        if (!o[s]) {
            new g('/ajax/photos/composer/mark_nux_seen.php').setData({type: s}).send();
            o[s] = true;
        }
    }, onCleanup: function (s) {
        s.hide();
    }};
    e.exports = r;
}, null);
__d("PagesComposerEntryLogger", ["Event", "PagesBanzaiLogger"], function (a, b, c, d, e, f, g, h) {
    function i(j) {
        "use strict";
        this.$PagesComposerEntryLogger0 = j;
    }

    i.prototype.registerForContentEntryEvents = function (j) {
        "use strict";
        var k = function () {
            var l = {page_id: this.$PagesComposerEntryLogger0, event_name: 'composer_content_entry', pages_composer: 1, target_id: this.$PagesComposerEntryLogger0};
            h.logData(l, h.VITAL_WAIT);
            this.unregister();
        };
        this.$PagesComposerEntryLogger1 = g.listen(j, {paste: k.bind(this), keydown: k.bind(this)});
    };
    i.prototype.unregister = function () {
        "use strict";
        if (!this.$PagesComposerEntryLogger1)return;
        for (var event in this.$PagesComposerEntryLogger1)this.$PagesComposerEntryLogger1[event].remove();
        this.$PagesComposerEntryLogger1 = null;
    };
    e.exports = i;
}, null);
__d("XPrivacyRemindersImpressionLoggingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/privacy\/reminders\/log_imp\/", {type: {type: "String", required: true}});
}, null);
__d("ComposerXBootloadStatusAttachment", ["Arbiter", "AsyncRequest", "AudienceAlignment", "Bootloader", "ComposerXAttachment", "ComposerXAttachmentButtonBarState", "ComposerXController", "ComposerXDragDrop", "ComposerXMarauderLogger", "ComposerXNUX", "ComposerXStore", "CSS", "DOM", "DOMQuery", "Event", "Focus", "PagesComposerEntryLogger", "Parent", "PlaceholderListener", "PrivacyConst", "PrivacyRemindersLoggingTypes", "SelectorDeprecated", "SuggestionConfig", "SuggestionUIPresentation", "URI", "copyProperties", "csx", "cx", "getActiveElement", "requestAnimationFrame", "XPrivacyRemindersDismissControllerURIBuilder", "XPrivacyRemindersImpressionLoggingControllerURIBuilder"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la) {
    var ma = {only_me: {PRIVACY_CONSTANT: [z.BaseValue.SELF], LOG_IMPRESSION: aa.ONLY_ME_IMPRESSION, LOG_CONVERSION: aa.ONLY_ME_CONVERSION, LOG_IMPRESSION_TO_DISMISS_ENDPOINT: true}, everyone: {PRIVACY_CONSTANT: [z.BaseValue.EVERYONE], LOG_IMPRESSION: aa.EVERYONE_IMPRESSION, LOG_CONVERSION: aa.EVERYONE_CONVERSION, LOG_IMPRESSION_TO_DISMISS_ENDPOINT: true}, delta_everyone: {PRIVACY_CONSTANT: [z.BaseValue.EVERYONE], LOG_IMPRESSION: aa.DELTA_EVERYONE_IMPRESSION, LOG_CONVERSION: aa.DELTA_EVERYONE_CONVERSION, LOG_IMPRESSION_TO_DISMISS_ENDPOINT: true}, everyone_tests: {PRIVACY_CONSTANT: [z.BaseValue.EVERYONE], LOG_IMPRESSION: aa.EVERYONE_TESTS_IMPRESSION, LOG_CONVERSION: aa.EVERYONE_TESTS_CONVERSION, LOG_IMPRESSION_TO_DISMISS_ENDPOINT: true}, public_posting_filter_nux: {PRIVACY_CONSTANT: [z.BaseValue.EVERYONE], LOG_IMPRESSION: aa.PUBLIC_POSTING_FILTER_NUX_IMPRESSION, LOG_CONVERSION: aa.PUBLIC_POSTING_FILTER_NUX_CONVERSION, LOG_IMPRESSION_TO_DISMISS_ENDPOINT: true}}, na = {};
    for (var oa in k)if (k.hasOwnProperty(oa))qa[oa] = k[oa];
    var pa = k === null ? null : k.prototype;
    qa.prototype = Object.create(pa);
    qa.prototype.constructor = qa;
    qa.__superConstructor__ = k;
    function qa(ra, sa) {
        "use strict";
        k.call(this);
        this._root = ra;
        this._config = sa;
        this._privacyReminders = {};
        this._onSelectorChange = this._onSelectorChange.bind(this);
    }

    qa.prototype.getRoot = function () {
        "use strict";
        return this._root;
    };
    qa.prototype._getTextArea = function () {
        "use strict";
        return t.find(this.getComponent('maininput').element, 'textarea.input');
    };
    qa.prototype.initWithComponents = function (ra) {
        "use strict";
        na[this._composerID] = this;
        this._attachmentIsActive = true;
        var sa = this._getTextArea(), ta = t.scry(x.byClass(this.getRoot(), "_119"), 'li.' + this.attachmentClassName)[0];
        this._focusListener = u.listen(sa, 'focus', this._onFocus.bind(this));
        if (ra && this._config.targetIsPage) {
            this._pagesComposerEntryLogger = new w(this._config.targetID);
            this._pagesComposerEntryLogger.registerForContentEntryEvents(sa);
        }
        if (this._fullVersion) {
            this._fullInitWithComponents();
        } else if (!this._bootloading)if (t.contains(this._root, ia())) {
            this._onFocus();
        } else if (ta)this._clickListener = u.listen(ta, 'click', function () {
            v.set(sa);
        }.bind(this));
        this._dragEnterHandler = g.subscribe('dragenter', function (ya, za) {
            if (za.element == this._root) {
                i.abort();
                var ab = za.event.dataTransfer.items, bb;
                if (ab)bb = n.filterImages(ab);
                if (bb && bb.length > 0) {
                    v.set(sa);
                } else {
                    var cb = x.byClass(this._root, 'focus_target');
                    y.expandInput(cb);
                    this._onFocus();
                }
            }
        }.bind(this));
        this.getComponent('maininput').instance.setPlaceholder(this._config.mentionsPlaceholder);
        if (!ra)v.set(sa);
        var ua = this.getComponent('prompt_selector');
        if (ua)ua.instance.registerInput(this.getComponent('maininput'), this._config.mentionsPlaceholder);
        if (this._config.plus_version) {
            this._dragdrop = new n(this._root, this._composerID, this._config.targetID);
            this._dragdrop.enableURLDropping();
        }
        var va = this.getComponent('mainprivacywidget');
        this._privacyWidgetElement = va.element;
        this._newPrivacyWidgetInstance = va.instance && va.instance.getInstance().getInstance();
        if (this._newPrivacyWidgetInstance) {
            var wa = this.getComponent('maininput').instance && this.getComponent('maininput').instance.getMentions(), xa = this.getComponent('tagExpansionButton');
            (xa && xa.instance) && xa.instance.listenToPrivacy(this._newPrivacyWidgetInstance, wa);
        }
        if (this._config.postActionsButton != null)this._config.postActionsButton.initHiddenInputs(this.getComponent('pabhiddeninputs').instance);
    };
    qa.prototype._fullInitWithComponents = function (ra) {
        "use strict";
        if (ra && ra.show_tag_expansion_reminder) {
            j.loadModules(["ComposerXPrivacyWidgetTags", "URLScraper", "SuggestionScraper", "URI", "ComposerTagReminder"], this._bootloadModules.bind(this));
        } else j.loadModules(["ComposerXPrivacyWidgetTags", "URLScraper", "SuggestionScraper", "URI"], this._bootloadModules.bind(this));
        Object.keys(this._privacyReminders).forEach(this._showPrivacyReminder, this);
        if (this._setEveryonePrivacyImpression)this._showPrivacyReminder('everyone');
        if (this._privacyReminders.delta_everyone && this._privacyReminders.delta_everyone.dialog) {
            var sa = this._privacyReminders.delta_everyone.dialog.getContent();
            if (sa) {
                var ta = t.scry(sa, '.photoText')[0], ua = t.scry(sa, '.postText')[0];
                g.subscribe('multi-upload/images-added', function () {
                    ta && r.show(ta);
                    ua && r.hide(ua);
                }.bind(this));
                g.subscribe('multi-upload/all-images-removed', function () {
                    ta && r.hide(ta);
                    ua && r.show(ua);
                }.bind(this));
            }
        }
        if (this._newPrivacyWidgetInstance) {
            this._newPrivacyWidgetInstance.subscribe('changed', this._onSelectorChange);
        } else ba.subscribe('select', this._onSelectorChange);
    };
    qa.prototype._bootloadModules = function (ra, sa, ta, ua, va) {
        "use strict";
        this._tagger.init(this);
        this._privacyWidgetTags = new ra(this);
        if (va) {
            this._tagExpansionReminder = new va(this._root);
            this._tagExpansionReminder.listen();
        }
        l.trackCityChanges(this);
        var wa = t.find(this.getComponent('maininput').element, 'textarea.input');
        if (!this._scraper) {
            this._scraper = new sa(wa);
            this._scraper.subscribe('match', function (za, ab) {
                var bb = this._getScraperEndpoint();
                bb.addQueryData({scrape_url: encodeURIComponent(ab.url), remove_url: this._config.remove_url, attachment_class: this._config.classname});
                m.getAttachment(this._root, bb.toString());
            }.bind(this));
        }
        this._scraper.enable();
        this._scraper.check();
        if (this._config.useSuggestionFramework) {
            var xa = s.scry(this._root, "._4-jj"), ya = this.getComposerID();
            if (!this._inputSuggestionScraper && !this._privacyReminderShown) {
                this._inputSuggestionScraper = new ta(this._tagger, xa[0], [da.FLYOUT], ya);
                this._inputSuggestionScraper.setInputTriggerConfig(ca.OG_SUGGESTION_BY_INPUT, wa);
            }
            if (!this._bootloadSuggestionScraper && this._config.recentActionUseSuggestionFramework) {
                this._bootloadSuggestionScraper = new ta(this._tagger, xa[0], [da.TAGGER_BADGE], ya);
                this._bootloadSuggestionScraper.setBootloadTriggerConfig(ca.OG_TAGGER_TYPEAHEAD_BOOTSTRAP);
            }
        }
    };
    qa.prototype._showPrivacyReminder = function (ra) {
        "use strict";
        var sa = this, ta = this._privacyReminders[ra], ua = ma[ra], va = null;
        if (this._newPrivacyWidgetInstance) {
            va = this._newPrivacyWidgetInstance.getSelectedBaseValue();
        } else va = parseInt(ba.getValue(this._privacyWidgetElement), 10);
        if (!ta || !ta.dialog || ta.shown) {
            if (va === z.BaseValue.EVERYONE && this._setEveryonePrivacyImpression) {
                this._sendSetEveryonePrivacyImpression();
                this._setEveryonePrivacyImpression = false;
            }
            return;
        }
        if (ua.PRIVACY_CONSTANT.indexOf(va) === -1)return;
        ta.dialog.setContext(this._privacyWidgetElement).show();
        ta.shown = true;
        this._privacyReminderShown = true;
        if (ua.LOG_IMPRESSION) {
            var wa = (new la()).setString('type', ua.LOG_IMPRESSION).getURI();
            new h(wa).send();
        }
        if (ua.LOG_IMPRESSION_TO_DISMISS_ENDPOINT)if (ra === 'delta_everyone' || ra === 'only_me') {
            var xa = (new ka()).setString('type', ra).getURI();
            new h(xa).send();
        } else new h('/ajax/privacy/reminders/dismiss').setData({type: ra, dismiss_type: 'impression'}).send();
        var ya = function (event) {
            var za = r.hasClass(event.target, 'layerConfirm') || t.scry(event.target, '^.layerConfirm').length === 1, ab = r.hasClass(event.target, 'layerButton') || t.scry(event.target, '^.layerButton').length === 1;
            if (za && ra !== 'public_posting_filter_nux') {
                if (ra === 'delta_everyone' || ra === 'only_me') {
                    var bb = (new la()).setString('type', aa.DELTA_EVERYONE_OK_BUTTON_CLICKED).getURI();
                    new h(bb).send();
                }
                return;
            }
            if (ra === 'delta_everyone' || ra === 'only_me') {
                var cb = (new ka()).setString('type', ra).getURI();
                new h(cb).send();
            } else new h('/ajax/privacy/reminders/dismiss').setData({type: ra, hide: ab}).send();
            ta.events.forEach(function (eb) {
                eb.remove();
            });
            ta.events = [];
            ta.dialog.hide();
            this._privacyReminderShown = false;
            if (ab) {
                ja(function () {
                    if (this._newPrivacyWidgetInstance) {
                        this._newPrivacyWidgetInstance.openSelector();
                    } else ba.toggle(t.scry(sa.getComponent('mainprivacywidget').element, '.uiSelector')[0]);
                }.bind(this));
                if (ra === 'delta_everyone') {
                    var db = (new la()).setString('type', aa.DELTA_EVERYONE_CHANGE_BUTTON_CLICKED).getURI();
                    new h(db).send();
                }
            }
        }.bind(this);
        if (this._newPrivacyWidgetInstance) {
            ta.conversionListener = this._newPrivacyWidgetInstance.subscribe('changed', function (za, ab) {
                var bb = this._newPrivacyWidgetInstance.getSelectedBaseValue();
                this._logPrivacyReminderConversion(ta, ua, bb);
            }.bind(this));
        } else ta.conversionListener = ba.subscribe('select', function (za, ab) {
            if (ab.selector == this._privacyWidgetElement.firstChild) {
                var bb = parseInt(ba.getValue(ab.option), 10);
                this._logPrivacyReminderConversion(ta, ua, bb);
            }
        }.bind(this));
        ta.events = [u.listen(ta.dialog.getContent(), 'click', ya), u.listen(ta.dialog.getContext(), 'click', ya)];
    };
    qa.prototype._logPrivacyReminderConversion = function (ra, sa, ta) {
        "use strict";
        if (sa.PRIVACY_CONSTANT.indexOf(ta) === -1) {
            if (sa.LOG_CONVERSION) {
                var ua = (new la()).setString('type', sa.LOG_CONVERSION).getURI();
                new h(ua).send();
            }
            if (this._newPrivacyWidgetInstance) {
                this._newPrivacyWidgetInstance.unsubscribe(ra.conversionListener);
            } else ba.unsubscribe(ra.conversionListener);
            ra.conversionListener = null;
        }
    };
    qa.prototype._onSelectorChange = function (ra, sa) {
        "use strict";
        if (!this.getComponent('mainprivacywidget'))return;
        if (this._newPrivacyWidgetInstance || (sa.selector === this._privacyWidgetElement.firstChild))setTimeout(function () {
            Object.keys(this._privacyReminders).forEach(this._showPrivacyReminder, this);
        }.bind(this));
    };
    qa.prototype.cleanup = function () {
        "use strict";
        this._attachmentIsActive = false;
        if (this._focusListener) {
            this._focusListener.remove();
            this._focusListener = null;
        }
        if (this._clickListener) {
            this._clickListener.remove();
            this._clickListener = null;
        }
        Object.keys(ma).forEach(function (ra) {
            var sa = this._privacyReminders[ra];
            if (sa && sa.dialog && sa.shown) {
                sa.dialog.hide();
                sa.events.forEach(function (ta) {
                    ta.remove();
                });
                sa.events = [];
                if (sa.conversionListener)if (this._newPrivacyWidgetInstance) {
                    this._newPrivacyWidgetInstance.unsubscribe(sa.conversionListener);
                } else ba.unsubscribe(sa.conversionListener);
                sa.conversionListener = null;
            }
        }.bind(this));
        if (this._dragdrop) {
            this._dragdrop.deactivate();
            this._dragdrop = null;
        }
        if (this._fullVersion) {
            this._tagger.cleanup();
            this._privacyWidgetTags.destroy();
            this._privacyWidgetTags = null;
            this._scraper.disable();
        }
        if (this._dragEnterHandler) {
            this._dragEnterHandler.unsubscribe();
            this._dragEnterHandler = null;
        }
        if (this._pagesComposerEntryLogger)this._pagesComposerEntryLogger.unregister();
    };
    qa.prototype.reset = function () {
        "use strict";
        var ra = x.byClass(this._root, "child_was_focused");
        if (ra)r.removeClass(ra, "child_was_focused");
        if (this._tagger)this._tagger.reset();
        if (this._scraper)this._scraper.reset();
        if (this._newPrivacyWidgetInstance)this._newPrivacyWidgetInstance.informTagsChanged([]);
        this.getComponent('maininput').instance.setPlaceholder(this._config.mentionsPlaceholder);
    };
    qa.prototype.canSwitchAway = function () {
        "use strict";
        return !x.byClass(this._root, 'async_saving');
    };
    qa.prototype.setBootloadedContent = function (ra) {
        "use strict";
        this._setEveryonePrivacyImpression = !!ra.set_everyone_privacy_impression;
        Object.keys(ma).forEach(function (ta) {
            var ua = ra[ta + '_privacy_reminder'];
            if (ua)this._privacyReminders[ta] = {dialog: ua};
        }.bind(this));
        var sa = ra.placeholders.map(function (ta) {
            return ta.component_name;
        });
        q.waitForComponents(this._composerID, sa, function () {
            var ta = t.find(this._root, "._3-6"), ua = t.find(this._root, "._3-7");
            s.setContent(ta, ra.markup.tagger_content);
            s.setContent(ua, ra.markup.tagger_icons);
            m.addPlaceholders(this._root, this, ra.placeholders);
            this._tagger = ra.tagger;
            l.updateMessageBoxBarState(this);
            this._fullVersion = true;
            if (this._attachmentIsActive)this._fullInitWithComponents(ra);
            var va = s.scry(this._root, "._4-jj");
            if (this._isEligibleForVerbsNUX(ra) && va.length > 0) {
                p.onInit(this._config.newverbsNUXDialog, va[0], p.OGCOMPOSER_NEWVERBS_NUX);
                this._newVerbsListener = u.listen(va[0], 'click', function () {
                    p.acknowledgeDialog(p.OGCOMPOSER_NEWVERBS_NUX, this._config.newverbsNUXDialog);
                }.bind(this));
            }
        }.bind(this));
    };
    qa.prototype._isEligibleForVerbsNUX = function (ra) {
        "use strict";
        var sa = this.getComponent('maininput');
        return this._config.newverbsNUXDialog && !this._privacyReminderShown && !ra.showed_previous_post_upsell && !sa.instance.hasAuxContent();
    };
    qa.prototype._getScraperEndpoint = function () {
        "use strict";
        return ea('/ajax/composerx/attachment/link/scraper/');
    };
    qa.prototype._onFocus = function () {
        "use strict";
        o.logEntry(this._composerID, 'status');
        if (this._fullVersion || this._bootloading)return;
        g.inform('composer/focus', this._composerID);
        g.inform('composer/render_pab_nux');
        m.getEndpoint(this._root, '/ajax/composerx/attachment/status/bootload/', true);
        if (this._config.prefill_text)this._getTextArea().value = this._config.prefill_text;
        this._bootloading = true;
    };
    qa.prototype.allowOGTagPreview = function () {
        "use strict";
        return true;
    };
    qa.prototype._sendSetEveryonePrivacyImpression = function () {
        "use strict";
        new h('/ajax/privacy/reminders/set_everyone_privacy_impression').send();
    };
    qa.setBootloadedContent = function (ra, sa) {
        "use strict";
        var ta = na[ra];
        if (ta)ta.setBootloadedContent.call(ta, sa);
    };
    fa(qa.prototype, {_attachmentIsActive: false, _bootloading: false, _fullVersion: false, _focusListener: null, _privacyWidgetTags: null, _scraper: null, _dragdrop: null, attachmentClassName: "_4j"});
    e.exports = qa;
}, null);
__d("ComposerXOGTaggerIconReset", ["CSS", "cx"], function (a, b, c, d, e, f, g, h) {
    function i(j) {
        g.removeClass(j.element, "_4-jh");
        g.removeClass(j.element, "_509o");
    }

    e.exports = i;
}, null);
__d("ComposerXPrivacyWidgetReset", ["Arbiter"], function (a, b, c, d, e, f, g) {
    function h(i) {
        g.inform('Composer/changedtags', {withTags: [], mention: {}, eventTag: false});
    }

    e.exports = h;
}, null);
__d("ComposerXTaggerIconReset", ["CSS", "cx"], function (a, b, c, d, e, f, g, h) {
    function i(j) {
        g.removeClass(j.element, "_1dsa");
        g.removeClass(j.element, "_1dsb");
        g.removeClass(j.element, "_509o");
    }

    e.exports = i;
}, null);
__d("legacy:AudienceSelector", ["AudienceSelector"], function (a, b, c, d) {
    b('AudienceSelector');
}, 3);
__d("FriendListPrivacyOptions", ["Arbiter", "AsyncDialog", "AsyncRequest", "Dialog", "DOMQuery", "PageTransitions", "Parent", "SelectorDeprecated", "$", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = false, r = false, s = null, t = {}, u = function (w) {
        if (!Object.keys(t).length)l.registerHandler(function () {
            t = {};
            q = false;
            r = false;
        });
        var x = w.getAttribute('data-name');
        t[x] = w;
        n.listen(w, 'select', function (y) {
            var z = y.option, aa = k.find(z, 'a.itemAnchor'), ba = aa.getAttribute('data-flid');
            if (!ba)return;
            var ca = aa.getAttribute('data-dynamic');
            if (ca && q) {
                v.showSmartListNux(z, ba);
            } else if (!ca && r)v.showDumbListNux([ba]);
        });
    }, v = {listen: function (w, x, y) {
        var z = p(w);
        if (!z)return;
        var aa = m.byClass(z, 'audienceSelector');
        if (aa) {
            u(aa);
            q = x;
            r = y;
        }
    }, showSmartListNux: function (w, x) {
        w = o(w);
        new i('/ajax/friends/lists/smart_list_publish_nux.php').setData({option_id: w.id, flid: x}).send();
        q = false;
    }, setContextualDialog: function (w, x) {
        x = o(x);
        var y = m.byClass(x, 'audienceSelector');
        if (y) {
            w.setContext(y);
            w.show();
            var z = g.subscribe('composer/publish', function () {
                w.hide();
            });
            w.subscribe('hide', function () {
                z.unsubscribe();
            });
        }
    }, showDumbListNux: function (w) {
        h.send(new i('/ajax/friends/lists/dumb_list_publish_nux.php').setData({flids: w}));
        r = false;
    }, showBothListsNux: function (w, x) {
        s = o(w);
        v.showDumbListNux(x);
    }, setDialogX: function (w) {
        if (!s)return;
        w.subscribe('hide', function () {
            v.showSmartListNux(s);
            s = null;
        });
    }, setDialog: function () {
        if (!s)return;
        var w = j.getCurrent();
        if (w)w.setCloseHandler(function () {
            v.showSmartListNux(s);
            s = null;
        });
    }};
    e.exports = v;
}, null);
__d("legacy:DynamicIconSelector", ["DynamicIconSelector"], function (a, b, c, d) {
    a.DynamicIconSelector = b('DynamicIconSelector');
}, 3);
__d("MentionsTypeaheadAreaView", ["ContextualTypeaheadView", "Parent"], function (a, b, c, d, e, f, g, h) {
    for (var i in g)if (g.hasOwnProperty(i))k[i] = g[i];
    var j = g === null ? null : g.prototype;
    k.prototype = Object.create(j);
    k.prototype.constructor = k;
    k.__superConstructor__ = g;
    function k() {
        "use strict";
        if (g !== null)g.apply(this, arguments);
    }

    k.prototype.getContext = function () {
        "use strict";
        return h.byClass(this.element, 'uiMentionsInput');
    };
    e.exports = k;
}, null);