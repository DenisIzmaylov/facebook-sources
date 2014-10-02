/*!CK:3122936202!*//*1411957095,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["0kly0"]);
}

__d("destroyOnUnload", ["Run"], function (a, b, c, d, e, f, g) {
    function h(i) {
        g.onLeave(i);
    }

    e.exports = h;
}, null);
__d("DetectBrokenProxyCache", ["AsyncSignal", "Cookie", "URI"], function (a, b, c, d, e, f, g, h, i) {
    function j(k, l) {
        var m = h.get(l);
        if ((m != k) && (m != null) && (k != '0')) {
            var n = {c: 'si_detect_broken_proxy_cache', m: l + ' ' + k + ' ' + m}, o = new i('/common/scribe_endpoint.php').getQualifiedURI().toString();
            new g(o, n).send();
        }
    }

    e.exports = {run: j};
}, null);
__d("BanzaiLogger", ["Banzai"], function (a, b, c, d, e, f, g) {
    var h = 'logger';

    function i(k) {
        return {log: function (l, m) {
            g.post(h + ':' + l, m, k);
        }};
    }

    var j = i();
    j.create = i;
    e.exports = j;
}, null);
__d("escapeRegex", [], function (a, b, c, d, e, f) {
    function g(h) {
        return h.replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1");
    }

    e.exports = g;
}, null);
__d("forEachObject", [], function (a, b, c, d, e, f) {
    'use strict';
    var g = Object.prototype.hasOwnProperty;

    function h(i, j, k) {
        for (var l in i)if (g.call(i, l))j.call(k, i[l], l, i);
    }

    e.exports = h;
}, null);
__d("PresenceUtil", ["CurrentUser", "randomInt"], function (a, b, c, d, e, f, g, h) {
    var i = h(0, 4294967295) + 1;

    function j() {
        return i;
    }

    function k() {
        return g.isLoggedInNow();
    }

    e.exports = {getSessionID: j, hasUserCookie: k};
}, null);
__d("AttachmentRelatedShareConstants", [], function (a, b, c, d, e, f) {
    var g = {ARTICLE_CLICK: 'article_click', VIDEO_CLICK: 'video_click', FBVIDEO_CLICK: 'fbvideo_click', GAME_CLICK: 'game_click', EVENT_DELAY: 1000, HIDE_DELAY: 100, PHOTO_CLICK: 'photo_click'};
    e.exports = g;
}, null);
__d("AjaxPipeRequest", ["Arbiter", "AsyncRequest", "BigPipe", "CSS", "DOM", "Env", "PageletSet", "ScriptPathState", "URI", "copyProperties", "ge", "goOrReplace", "performance"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t;

    function u(x, y) {
        var z = q(x);
        if (!z)return;
        if (!y)z.style.minHeight = '100px';
        var aa = m.getPageletIDs();
        for (var ba = 0; ba < aa.length; ba++) {
            var ca = aa[ba];
            if (k.contains(z, ca))m.removePagelet(ca);
        }
        k.empty(z);
        g.inform('pagelet/destroy', {id: null, root: z});
    }

    function v(x, y) {
        var z = q(x);
        if (z && !y)z.style.minHeight = '100px';
    }

    function w(x, y) {
        "use strict";
        this._uri = x;
        this._query_data = y;
        this._request = new h();
        this._canvas_id = null;
        this._allow_cross_page_transition = true;
    }

    w.prototype.setCanvasId = function (x) {
        "use strict";
        this._canvas_id = x;
        return this;
    };
    w.prototype.setURI = function (x) {
        "use strict";
        this._uri = x;
        return this;
    };
    w.prototype.setData = function (x) {
        "use strict";
        this._query_data = x;
        return this;
    };
    w.prototype.getData = function (x) {
        "use strict";
        return this._query_data;
    };
    w.prototype.setAllowCrossPageTransition = function (x) {
        "use strict";
        this._allow_cross_page_transition = x;
        return this;
    };
    w.prototype.setAppend = function (x) {
        "use strict";
        this._append = x;
        return this;
    };
    w.prototype.send = function () {
        "use strict";
        var x = {ajaxpipe: 1, ajaxpipe_token: l.ajaxpipe_token};
        p(x, n.getParams());
        n.reset();
        this._request.setOption('useIframeTransport', true).setURI(this._uri).setData(p(x, this._query_data)).setPreBootloadHandler(this._preBootloadHandler.bind(this)).setInitialHandler(this._onInitialResponse.bind(this)).setHandler(this._onResponse.bind(this)).setMethod('GET').setReadOnly(true).setAllowCrossPageTransition(this._allow_cross_page_transition).setAllowIrrelevantRequests(this._allowIrrelevantRequests);
        if (this._automatic) {
            this._relevantRequest = t;
        } else t = this._request;
        var y = s.webkitClearResourceTimings || s.clearResourceTimings || null;
        if (y)y.call(s);
        this._request.send();
        return this;
    };
    w.prototype._preBootloadFirstResponse = function (x) {
        "use strict";
        return false;
    };
    w.prototype._fireDomContentCallback = function () {
        "use strict";
        this._arbiter.inform('ajaxpipe/domcontent_callback', true, g.BEHAVIOR_STATE);
    };
    w.prototype._fireOnloadCallback = function () {
        "use strict";
        this._arbiter.inform('ajaxpipe/onload_callback', true, g.BEHAVIOR_STATE);
    };
    w.prototype._isRelevant = function (x) {
        "use strict";
        return this._request == t || (this._automatic && this._relevantRequest == t) || this._jsNonBlock || (t && t._allowIrrelevantRequests);
    };
    w.prototype._preBootloadHandler = function (x) {
        "use strict";
        var y = x.getPayload();
        if (!y || y.redirect || !this._isRelevant(x))return false;
        var z = false;
        if (x.is_first) {
            !this._append && !this._displayCallback && u(this._canvas_id, this._constHeight);
            this._arbiter = new g();
            z = this._preBootloadFirstResponse(x);
            this.pipe = new i({arbiter: this._arbiter, rootNodeID: this._canvas_id, lid: this._request.lid, isAjax: true, domContentCallback: this._fireDomContentCallback.bind(this), onloadCallback: this._fireOnloadCallback.bind(this), domContentEvt: 'ajaxpipe/domcontent_callback', onloadEvt: 'ajaxpipe/onload_callback', jsNonBlock: this._jsNonBlock, automatic: this._automatic, displayCallback: this._displayCallback, allowIrrelevantRequests: this._allowIrrelevantRequests});
        }
        return z;
    };
    w.prototype._redirect = function (x) {
        "use strict";
        if (x.redirect) {
            if (x.force || !this.isPageActive(x.redirect)) {
                var y = ['ajaxpipe', 'ajaxpipe_token'].concat(this.getSanitizedParameters());
                r(window.location, o(x.redirect).removeQueryData(y), true);
            } else {
                var z = a.PageTransitions;
                z.go(x.redirect, true);
            }
            return true;
        } else return false;
    };
    w.prototype.isPageActive = function (x) {
        "use strict";
        return true;
    };
    w.prototype.getSanitizedParameters = function () {
        "use strict";
        return [];
    };
    w.prototype._versionCheck = function (x) {
        "use strict";
        return true;
    };
    w.prototype._onInitialResponse = function (x) {
        "use strict";
        var y = x.getPayload();
        if (!this._isRelevant(x))return false;
        if (!y)return true;
        if (this._redirect(y) || !this._versionCheck(y))return false;
        return true;
    };
    w.prototype._processFirstResponse = function (x) {
        "use strict";
        var y = x.getPayload();
        if (q(this._canvas_id) && y.canvas_class != null)j.setClass(this._canvas_id, y.canvas_class);
    };
    w.prototype.setFirstResponseCallback = function (x) {
        "use strict";
        this._firstResponseCallback = x;
        return this;
    };
    w.prototype.setFirstResponseHandler = function (x) {
        "use strict";
        this._processFirstResponse = x;
        return this;
    };
    w.prototype._onResponse = function (x) {
        "use strict";
        var y = x.payload;
        if (!this._isRelevant(x))return h.suppressOnloadToken;
        if (x.is_first) {
            this._processFirstResponse(x);
            this._firstResponseCallback && this._firstResponseCallback();
            y.provides = y.provides || [];
            y.provides.push('uipage_onload');
            if (this._append)y.append = this._canvas_id;
        }
        if (y) {
            if ('content' in y.content && this._canvas_id !== null && this._canvas_id != 'content') {
                y.content[this._canvas_id] = y.content.content;
                delete y.content.content;
            }
            this.pipe.onPageletArrive(y);
        }
        if (x.is_last)v(this._canvas_id, this._constHeight);
        return h.suppressOnloadToken;
    };
    w.prototype.setNectarModuleDataSafe = function (x) {
        "use strict";
        this._request.setNectarModuleDataSafe(x);
        return this;
    };
    w.prototype.setFinallyHandler = function (x) {
        "use strict";
        this._request.setFinallyHandler(x);
        return this;
    };
    w.prototype.setErrorHandler = function (x) {
        "use strict";
        this._request.setErrorHandler(x);
        return this;
    };
    w.prototype.abort = function () {
        "use strict";
        this._request.abort();
        if (t == this._request)t = null;
        this._request = null;
        return this;
    };
    w.prototype.setJSNonBlock = function (x) {
        "use strict";
        this._jsNonBlock = x;
        return this;
    };
    w.prototype.setAutomatic = function (x) {
        "use strict";
        this._automatic = x;
        return this;
    };
    w.prototype.setDisplayCallback = function (x) {
        "use strict";
        this._displayCallback = x;
        return this;
    };
    w.prototype.setConstHeight = function (x) {
        "use strict";
        this._constHeight = x;
        return this;
    };
    w.prototype.setAllowIrrelevantRequests = function (x) {
        "use strict";
        this._allowIrrelevantRequests = x;
        return this;
    };
    w.prototype.getAsyncRequest = function () {
        "use strict";
        return this._request;
    };
    w.getCurrentRequest = function () {
        "use strict";
        return t;
    };
    w.setCurrentRequest = function (x) {
        "use strict";
        t = x;
    };
    e.exports = w;
}, null);
__d("AsyncRequestNectarLogging", ["AsyncRequest", "Nectar", "copyProperties"], function (a, b, c, d, e, f, g, h, i) {
    i(g.prototype, {setNectarModuleData: function (j) {
        if (this.method == 'POST')h.addModuleData(this.data, j);
    }, setNectarImpressionId: function () {
        if (this.method == 'POST')h.addImpressionID(this.data);
    }});
}, null);
__d("CSSClassTransition", ["copyProperties"], function (a, b, c, d, e, f, g) {
    var h = [];

    function i() {
    }

    g(i, {go: function (j, k, l, m) {
        var n;
        for (var o = 0; o < h.length; o++)if (h[o](j, k, l, m) === true)n = true;
        if (!n)j.className = k;
    }, registerHandler: function (j) {
        h.push(j);
        return {remove: function () {
            var k = h.indexOf(j);
            if (k >= 0)h.splice(k, 1);
        }};
    }});
    e.exports = i;
}, null);
__d("DimensionTracking", ["Cookie", "DOMDimensions", "Event", "debounce", "isInIframe"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l() {
        var m = h.getViewportDimensions();
        g.set('wd', m.width + 'x' + m.height);
    }

    if (!k()) {
        setTimeout(l, 100);
        i.listen(window, 'resize', j(l, 250));
        i.listen(window, 'focus', l);
    }
}, null);
__d("DocumentTitle", ["Arbiter"], function (a, b, c, d, e, f, g) {
    var h = document.title, i = null, j = 1500, k = [], l = 0, m = null, n = false;

    function o() {
        if (k.length > 0) {
            if (!n) {
                p(k[l].title);
                l = ++l % k.length;
            } else q();
        } else {
            clearInterval(m);
            m = null;
            q();
        }
    }

    function p(s) {
        document.title = s;
        n = true;
    }

    function q() {
        r.set(i || h, true);
        n = false;
    }

    var r = {get: function () {
        return h;
    }, set: function (s, t) {
        document.title = s;
        if (!t) {
            h = s;
            i = null;
            g.inform('update_title', s);
        } else i = s;
    }, blink: function (s) {
        var t = {title: s};
        k.push(t);
        if (m === null)m = setInterval(o, j);
        return {stop: function () {
            var u = k.indexOf(t);
            if (u >= 0) {
                k.splice(u, 1);
                if (l > u) {
                    l--;
                } else if (l == u && l == k.length)l = 0;
            }
        }};
    }};
    e.exports = r;
}, null);
__d("HighContrastMode", ["AccessibilityLogger", "CSS", "CurrentUser", "DOM", "Style", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {init: function (n) {
        if (window.top !== window.self)return;
        var o = j.create('div');
        j.appendContent(document.body, o);
        o.style.cssText = 'border: 1px solid;' + 'border-color: red green;' + 'position: fixed;' + 'height: 5px;' + 'top: -999px;' + 'background-image: url(' + n.spacerImage + ');';
        var p = k.get(o, 'background-image'), q = k.get(o, 'border-top-color'), r = k.get(o, 'border-right-color'), s = q == r && (p && (p == 'none' || p == 'url(invalid-url:)'));
        if (s) {
            h.conditionClass(document.documentElement, 'highContrast', s);
            if (i.getID())g.logHCM();
        }
        j.remove(o);
        m.init = l;
    }};
    e.exports = m;
}, null);
__d("UIPagelet", ["ActorURI", "AjaxPipeRequest", "AsyncRequest", "DOM", "HTML", "ScriptPathState", "URI", "copyProperties", "emptyFunction", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    function q(r, s, t) {
        "use strict";
        var u = r && j.isElementNode(r) ? r.id : r;
        this._id = u || null;
        this._element = p(r || j.create('div'));
        this._src = s || null;
        this._context_data = t || {};
        this._data = {};
        this._handler = o;
        this._request = null;
        this._use_ajaxpipe = false;
        this._use_post_request = false;
        this._is_bundle = true;
        this._allow_cross_page_transition = false;
        this._append = false;
    }

    q.prototype.getElement = function () {
        "use strict";
        return this._element;
    };
    q.prototype.setHandler = function (r) {
        "use strict";
        this._handler = r;
        return this;
    };
    q.prototype.go = function (r, s) {
        "use strict";
        if (arguments.length >= 2 || typeof r == 'string') {
            this._src = r;
            this._data = s || {};
        } else if (arguments.length == 1)this._data = r;
        this.refresh();
        return this;
    };
    q.prototype.setAllowCrossPageTransition = function (r) {
        "use strict";
        this._allow_cross_page_transition = r;
        return this;
    };
    q.prototype.setBundleOption = function (r) {
        "use strict";
        this._is_bundle = r;
        return this;
    };
    q.prototype.setErrorHandler = function (r) {
        "use strict";
        this._errorHandler = r;
        return this;
    };
    q.prototype.setTransportErrorHandler = function (r) {
        "use strict";
        this.transportErrorHandler = r;
        return this;
    };
    q.prototype.refresh = function () {
        "use strict";
        if (this._use_ajaxpipe) {
            l.setIsUIPageletRequest(true);
            this._request = new h();
            this._request.setCanvasId(this._id).setAppend(this._append).setConstHeight(this._constHeight).setJSNonBlock(this._jsNonblock).setAutomatic(this._automatic).setDisplayCallback(this._displayCallback).setFinallyHandler(this._finallyHandler).setAllowIrrelevantRequests(this._allowIrrelevantRequests);
        } else {
            var r = function (v) {
                this._request = null;
                var w = k(v.getPayload());
                if (this._append) {
                    j.appendContent(this._element, w);
                } else j.setContent(this._element, w);
                this._handler();
            }.bind(this), s = this._displayCallback, t = this._finallyHandler;
            this._request = new i().setMethod('GET').setReadOnly(true).setOption('bundle', this._is_bundle).setHandler(function (v) {
                if (s) {
                    s(r.bind(null, v));
                } else r(v);
                t && t();
            });
            if (this._errorHandler)this._request.setErrorHandler(this._errorHandler);
            if (this.transportErrorHandler)this._request.setTransportErrorHandler(this.transportErrorHandler);
            if (this._use_post_request)this._request.setMethod('POST');
        }
        var u = {};
        n(u, this._context_data);
        n(u, this._data);
        if (this._actorID)u[g.PARAMETER_ACTOR] = this._actorID;
        this._request.setURI(this._src).setAllowCrossPageTransition(this._allow_cross_page_transition).setData({data: JSON.stringify(u)}).send();
        return this;
    };
    q.prototype.cancel = function () {
        "use strict";
        if (this._request)this._request.abort();
    };
    q.prototype.setUseAjaxPipe = function (r) {
        "use strict";
        this._use_ajaxpipe = !!r;
        return this;
    };
    q.prototype.setUsePostRequest = function (r) {
        "use strict";
        this._use_post_request = !!r;
        return this;
    };
    q.prototype.setAppend = function (r) {
        "use strict";
        this._append = !!r;
        return this;
    };
    q.prototype.setJSNonBlock = function (r) {
        "use strict";
        this._jsNonblock = !!r;
        return this;
    };
    q.prototype.setAutomatic = function (r) {
        "use strict";
        this._automatic = !!r;
        return this;
    };
    q.prototype.setDisplayCallback = function (r) {
        "use strict";
        this._displayCallback = r;
        return this;
    };
    q.prototype.setConstHeight = function (r) {
        "use strict";
        this._constHeight = !!r;
        return this;
    };
    q.prototype.setFinallyHandler = function (r) {
        "use strict";
        this._finallyHandler = r;
        return this;
    };
    q.prototype.setAllowIrrelevantRequests = function (r) {
        "use strict";
        this._allowIrrelevantRequests = r;
        return this;
    };
    q.prototype.setActorID = function (r) {
        "use strict";
        this._actorID = r;
        return this;
    };
    q.appendToInline = function (r, s) {
        "use strict";
        var t = p(r), u = p(s);
        if (t && u) {
            while (u.firstChild)j.appendContent(t, u.firstChild);
            j.remove(u);
        }
    };
    q.loadFromEndpoint = function (r, s, t, u) {
        "use strict";
        u = u || {};
        var v = '/ajax/pagelet/generic.php/' + r;
        if (u.intern)v = '/intern' + v;
        var w = new m(v.replace(/\/+/g, '/'));
        if (u.subdomain)w.setSubdomain(u.subdomain);
        var x = new q(s, w, t).setUseAjaxPipe(u.usePipe).setBundleOption(u.bundle !== false).setAppend(u.append).setJSNonBlock(u.jsNonblock).setAutomatic(u.automatic).setDisplayCallback(u.displayCallback).setConstHeight(u.constHeight).setAllowCrossPageTransition(u.crossPage).setFinallyHandler(u.finallyHandler || o).setErrorHandler(u.errorHandler).setTransportErrorHandler(u.transportErrorHandler).setAllowIrrelevantRequests(u.allowIrrelevantRequests).setActorID(u.actorID).setUsePostRequest(u.usePostRequest);
        u.handler && x.setHandler(u.handler);
        x.go();
        return x;
    };
    e.exports = q;
}, null);
__d("LayerTogglerContext", ["Toggler"], function (a, b, c, d, e, f, g) {
    function h(i) {
        "use strict";
        this._layer = i;
    }

    h.prototype.enable = function () {
        "use strict";
        this._root = this._layer.getRoot();
        g.createInstance(this._root).setSticky(false);
    };
    h.prototype.disable = function () {
        "use strict";
        g.destroyInstance(this._root);
        this._root = null;
    };
    e.exports = h;
}, null);
__d("DialogPosition", ["Vector"], function (a, b, c, d, e, f, g) {
    var h = 40, i, j = {calculateTopMargin: function (k, l) {
        if (i)return i;
        var m = g.getViewportDimensions(), n = Math.floor((m.x + k) * (m.y - l) / (4 * m.x));
        return Math.max(n, h);
    }, setFixedTopMargin: function (k) {
        i = k;
    }};
    e.exports = j;
}, null);
__d("DialogX", ["Arbiter", "CSS", "DialogPosition", "Event", "JSXDOM", "Layer", "LayerAutoFocus", "LayerButtons", "LayerFormHooks", "LayerRefocusOnHide", "LayerTabIsolation", "LayerTogglerContext", "ModalLayer", "Style", "Vector", "copyProperties", "cx", "debounce", "goURI", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
    for (var aa in l)if (l.hasOwnProperty(aa))ca[aa] = l[aa];
    var ba = l === null ? null : l.prototype;
    ca.prototype = Object.create(ba);
    ca.prototype.constructor = ca;
    ca.__superConstructor__ = l;
    function ca() {
        "use strict";
        if (l !== null)l.apply(this, arguments);
    }

    ca.prototype._configure = function (ea, fa) {
        "use strict";
        ba._configure.call(this, ea, fa);
        h.addClass(this.getRoot(), "_4-hy");
        if (ea.autohide)var ga = this.subscribe('show', function () {
            ga.unsubscribe();
            setTimeout(z(this.hide, this), ea.autohide);
        }.bind(this));
        if (ea.redirectURI)var ha = this.subscribe('hide', function () {
            ha.unsubscribe();
            y(ea.redirectURI);
        });
        this._fixedTopPosition = ea.fixedTopPosition;
    };
    ca.prototype._getDefaultBehaviors = function () {
        "use strict";
        return ba._getDefaultBehaviors.call(this).concat([da, s, m, n, o, q, r, p]);
    };
    ca.prototype._buildWrapper = function (ea, fa) {
        "use strict";
        var ga = ea.xui ? "_4-hz" : "_t", ha = ea.xui ? "_59s7" : "_1yv";
        this._innerContent = k.div(null, fa);
        this._wrapper = k.div({className: ha, role: "dialog", 'aria-labelledby': ea.titleID || null}, k.div({className: ga}, this._innerContent));
        this.setWidth(ea.width);
        return (k.div({className: "_10", role: "dialog"}, this._wrapper));
    };
    ca.prototype.getContentRoot = function () {
        "use strict";
        return this._wrapper;
    };
    ca.prototype.getInnerContent = function () {
        "use strict";
        return this._innerContent;
    };
    ca.prototype.updatePosition = function () {
        "use strict";
        var ea;
        if (this._fixedTopPosition) {
            ea = this._fixedTopPosition;
        } else {
            var fa = u.getElementDimensions(this._wrapper);
            ea = i.calculateTopMargin(fa.x, fa.y);
        }
        t.set(this._wrapper, 'margin-top', ea + 'px');
        this.inform('update_position', {type: 'DialogX', top: ea});
    };
    ca.prototype.setWidth = function (ea) {
        "use strict";
        ea = Math.floor(ea);
        if (ea === this._width)return;
        this._width = ea;
        t.set(this._wrapper, 'width', ea + 'px');
    };
    ca.prototype.getWidth = function () {
        "use strict";
        return this._width;
    };
    ca.prototype.getFixedTopPosition = function () {
        "use strict";
        return this._fixedTopPosition;
    };
    function da(ea) {
        "use strict";
        this._layer = ea;
    }

    da.prototype.enable = function () {
        "use strict";
        this._subscription = this._layer.subscribe(['show', 'hide'], function (ea) {
            if (ea === 'show') {
                this._attach();
                g.inform('layer_shown', {type: 'DialogX'});
            } else {
                this._detach();
                g.inform('layer_hidden', {type: 'DialogX'});
            }
        }.bind(this));
    };
    da.prototype.disable = function () {
        "use strict";
        this._subscription.unsubscribe();
        this._subscription = null;
        this._resize && this._detach();
    };
    da.prototype._attach = function () {
        "use strict";
        this._layer.updatePosition();
        this._resize = j.listen(window, 'resize', x(this._layer.updatePosition.bind(this._layer)));
    };
    da.prototype._detach = function () {
        "use strict";
        this._resize.remove();
        this._resize = null;
    };
    v(da.prototype, {_subscription: null, _resize: null});
    e.exports = ca;
}, null);
__d("LoadingDialogDimensions", [], function (a, b, c, d, e, f) {
    var g = {HEIGHT: 96, WIDTH: 300};
    e.exports = g;
}, null);
__d("AsyncDialog", ["AsyncRequest", "CSS", "DialogX", "DOM", "Keys", "LayerFadeOnShow", "Parent", "React", "URI", "XUISpinner.react", "copyProperties", "cx", "emptyFunction", "forEachObject", "LoadingDialogDimensions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
    var u = b('LoadingDialogDimensions').WIDTH, v;

    function w() {
        if (!v) {
            var ea = j.create('div', {className: "_57-x"});
            v = new i({width: u, addedBehaviors: [l], xui: true}, j.create('div', null, ea));
            n.renderComponent(n.createElement(p, {size: "large"}), ea);
            v.subscribe(['key', 'blur'], function (fa, ga) {
                if (fa == 'blur' || (fa == 'key' && ga.keyCode == k.ESC)) {
                    aa();
                    return false;
                }
            });
        }
        return v;
    }

    var x = {}, y = 1, z = [];

    function aa() {
        t(x, function (ea, fa) {
            ea.abandon();
            ba(fa);
        });
    }

    function ba(ea) {
        delete x[ea];
        if (!Object.keys(x).length)w().hide();
    }

    function ca(ea, fa) {
        var ga = y++;
        z[ga] = fa;
        x[ga] = ea;
        var ha = ba.bind(null, '' + ga);
        q(ea.getData(), {__asyncDialog: ga});
        w().setCausalElement(ea.getRelativeTo()).show();
        var ia = ea.finallyHandler;
        ea.setFinallyHandler(function (ja) {
            var ka = ja.getPayload();
            if (ka && ka.asyncURL)da.send(new g(ka.asyncURL));
            ha();
            ia && ia(ja);
        });
        ea.setInterceptHandler(ha).setAbortHandler(ha);
        ea.send();
    }

    var da = {send: function (ea, fa) {
        ca(ea, fa || s);
    }, bootstrap: function (ea, fa, ga) {
        if (!ea)return;
        var ha = m.byClass(fa, 'stat_elem') || fa;
        if (ha && h.hasClass(ha, 'async_saving'))return false;
        var ia = new o(ea).getQueryData(), ja = ga === 'dialog', ka = new g().setURI(ea).setData(ia).setMethod(ja ? 'GET' : 'POST').setReadOnly(ja).setRelativeTo(fa).setStatusElement(ha).setNectarModuleDataSafe(fa);
        da.send(ka);
    }, respond: function (ea, fa) {
        var ga = z[ea];
        if (ga) {
            ga(fa);
            delete z[ea];
        }
    }, getLoadingDialog: function () {
        return w();
    }};
    e.exports = da;
}, null);