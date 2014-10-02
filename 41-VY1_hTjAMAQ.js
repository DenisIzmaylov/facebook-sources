/*!CK:281853384!*//*1411504273,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["5RZKe"]);
}

__d("AdblockDetector", ["CSS"], function (a, b, c, d, e, f, g) {
    var h = 'data-adblock-hash', i = {}, j = 0;

    function k(l, m) {
        var n = l.getAttribute(h);
        if (!n) {
            n = ++j;
            l.setAttribute(h, n);
        } else if (i[n]) {
            clearTimeout(i[n]);
            i[n] = null;
        }
        i[n] = setTimeout(function () {
            i[n] = null;
            if (!l.offsetHeight) {
                var o = l, p = document.getElementsByTagName('body')[0];
                while (o && o !== p) {
                    if (!o.style || g.hasClass(o, 'hidden_elem') || o.style.display === 'none' || o.style.height === '0px' || o.style.height === 0 || o.style.height === '0' || o.childNodes.length === 0)return;
                    o = o.parentNode;
                }
                if (o === p)m && m(l);
            }
        }, 3000);
    }

    f.assertUnblocked = k;
}, null);
__d("AdblockDetectorLogging", ["AdblockDetector", "EagleEye"], function (a, b, c, d, e, f, g, h) {
    function i(j) {
        g.assertUnblocked(j, h.log.bind(h, 'ads', {event: 'ads_blocked'}));
    }

    f.assertUnblocked = i;
}, null);
__d("EmuController", ["AsyncRequest", "DataStore", "URI", "copyProperties", "emptyFunction", "ge", "goURI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n(o, p) {
        "use strict";
        var q = l(o);
        if (!q)return null;
        this.impression = p;
        this.containerId = o;
        h.set(q, 'emuController', this);
        return this;
    }

    n.prototype.event = function (o, p, q, r) {
        "use strict";
        var s = {eid: this.impression, f: 0, ui: this.containerId, en: o, a: 1};
        if (p)s.ed = JSON.stringify(p);
        if (!r)r = k;
        var t = new g().setURI(this.EVENT_HANDLER_PATH).setData(s).setErrorHandler(r);
        if (q)t.setHandler(q);
        t.send();
    };
    n.prototype.redirect = function () {
        "use strict";
        var o = {eid: this.impression, f: 0, ui: this.containerId, en: this.CLICK, a: 0, sig: Math.floor(Math.random() * 65535) + 65536}, p = new i(this.EVENT_HANDLER_PATH);
        p.setQueryData(o);
        m(p);
    };
    n.fromContainer = function (o) {
        "use strict";
        var p = l(o);
        if (!p)return null;
        return h.get(p, 'emuController');
    };
    n.getEventClass = function (o) {
        "use strict";
        return "emuEvent" + String(o).trim();
    };
    j(n.prototype, {EVENT_HANDLER_PATH: '/ajax/emu/end.php', CLICK: 1, FAN: "fad_fan"});
    e.exports = n;
}, null);
__d("legacy:ad-units-base-js", ["EmuController"], function (a, b, c, d) {
    a.EmuController = b('EmuController');
}, 3);
__d("DesktopHscrollUnitEventConstants", [], function (a, b, c, d, e, f) {
    e.exports = {HSCROLL_ITEM_INSERTED_EVENT: 'DesktopHScrollUnit/itemInserted', HSCROLL_ITEM_SHOWN_EVENT: 'DesktopHScrollUnit/itemShown'};
}, null);
__d("Visibility", ["mixInEventEmitter"], function (a, b, c, d, e, f, g) {
    var h, i;
    if (typeof document.hidden !== 'undefined') {
        h = 'hidden';
        i = 'visibilitychange';
    } else if (typeof document.mozHidden !== 'undefined') {
        h = 'mozHidden';
        i = 'mozvisibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        h = 'msHidden';
        i = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        h = 'webkitHidden';
        i = 'webkitvisibilitychange';
    }
    function j() {
        return h ? document[h] : false;
    }

    var k = {HIDDEN: 'hidden', VISIBLE: 'visible', isHidden: j};
    g(k, {visible: true, hidden: true});
    if (document.addEventListener && i)document.addEventListener(i, function l() {
        k.emit(j() ? k.HIDDEN : k.VISIBLE);
    });
    e.exports = k;
}, null);
__d("ViewableImpressionHeatmapLogger", ["Banzai"], function (a, b, c, d, e, f, g) {
    h.logFromViewableImpressionTracker = function (i, j) {
        "use strict";
        var k = new h(j);
        k.subscribeToTrackerEvents(i);
    };
    function h(i) {
        "use strict";
        this.loggingDurationMS = i;
        this.trackingEntries = {};
    }

    h.prototype.subscribeToTrackerEvents = function (i) {
        "use strict";
        this.visibleSubscription = i.addListener('visible', this.onElementVisible, this);
        this.hiddenSubscription = i.addListener('hidden', this.onElementHidden, this);
    };
    h.prototype.onElementVisible = function (i) {
        "use strict";
        var j = this.getCurrentTimestamp(), k = this.trackingEntries[i.id];
        if (!k) {
            k = this.createTrackingEntry(i);
            this.beginTracking(i.id, k);
            j = k.startedTrackingTS;
        }
        k.viewportProgressEvents.push({timestamp: j, percentInViewport: i.percentInViewport.toFixed(2)});
    };
    h.prototype.onElementHidden = function (i) {
        "use strict";
        var j = this.getCurrentTimestamp(), k = this.trackingEntries[i.id];
        if (!k)return;
        k.viewportProgressEvents.push({timestamp: j, percentInViewport: 0});
    };
    h.prototype.onTrackingCompleted = function (i) {
        "use strict";
        var j = this.trackingEntries[i];
        j.viewportProgressEvents.push({timestamp: this.getCurrentTimestamp(), percentInViewport: j.tracker.getPercentInViewport().toFixed(2)});
        if (this.$ViewableImpressionHeatmapLogger0())this.$ViewableImpressionHeatmapLogger1(i, j);
        this.logToServer(j);
        delete this.trackingEntries[i];
    };
    h.prototype.logToServer = function (i) {
        "use strict";
        var j = i;
        delete j.tracker;
        g.post('xtrackable:heatmap', j);
    };
    h.prototype.beginTracking = function (i, j) {
        "use strict";
        this.trackingEntries[i] = j;
        setTimeout(function () {
            this.onTrackingCompleted(i);
        }.bind(this), this.loggingDurationMS);
    };
    h.prototype.createTrackingEntry = function (i) {
        "use strict";
        return {tracker: i.tracker, token: i.token, startedTrackingTS: this.getCurrentTimestamp(), viewportProgressEvents: []};
    };
    h.prototype.getCurrentTimestamp = function () {
        "use strict";
        return (Date.now() / 1000).toFixed(2);
    };
    h.prototype.$ViewableImpressionHeatmapLogger0 = function () {
        "use strict";
        return 0;
    };
    h.prototype.$ViewableImpressionHeatmapLogger1 = function (i, j) {
        "use strict";
        var k = 'Completed tracking for id ' + i + ' token=' + j.token + ' startedTrackingTS=' + j.startedTrackingTS + '\n';
        j.viewportProgressEvents.forEach(function (l) {
            k += '% in view: ' + l.percentInViewport + ' timestamp=' + l.timestamp + '\n';
        });
    };
    e.exports = h;
}, null);
__d("ViewableImpressionTracker", ["Banzai", "copyProperties", "DOM", "getElementPosition", "getViewportDimensions", "mixInEventEmitter", "Style", "URI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    function o(p, q, r) {
        "use strict";
        this.id = p;
        this.element = q;
        this.config = r;
        this.iframe = null;
        this.viewableTimeout = null;
        this.clearSubsequentTimeout = null;
        this.waitForSubsequent = false;
        this.waitForLogged = false;
        this.isNonViewableLogged = false;
        this.isVisible = false;
        this.banzaiLogged = false;
    }

    o.prototype.getID = function () {
        "use strict";
        return this.id;
    };
    o.prototype.getPercentInViewport = function () {
        "use strict";
        var p = k(), q = j(this.element);
        if (q.x < p.width && q.x + q.width > 0 && q.y < p.height && q.y + q.height > 0 && m.get(this.element, 'visibility') !== 'hidden' && m.get(this.element, 'opacity') !== '0') {
            var r = Math.max(q.x, 0), s = Math.min(q.x + q.width, p.width), t = Math.max(q.y, 0), u = Math.min(q.y + q.height, p.height);
            if ((q.height * q.width) === 0)return 100;
            if (this.config.require_horizontally_onscreen && ((s - r) < q.width))return 0;
            var v = 100 * (s - r) * (u - t) / (q.height * q.width);
            return v;
        }
        return 0;
    };
    o.prototype.onVisible = function () {
        "use strict";
        this.isVisible = true;
        var p = this.getPercentInViewport(), q = p > this.config.pixel_in_percentage;
        this.emit('visible', {tracker: this, id: this.getID(), token: this.getToken(), percentInViewport: p});
        if (!q) {
            this.$ViewableImpressionTracker0();
            return;
        }
        if (this.isLogged()) {
            this.$ViewableImpressionTracker1();
        } else this.$ViewableImpressionTracker2();
        if (!this.waitForLogged && !this.isLogged()) {
            this.waitForLogged = true;
            this.viewableTimeout = setTimeout(function () {
                this.waitForLogged = false;
                var r = this.getPercentInViewport(), s = r > this.config.pixel_in_percentage;
                if (!s) {
                    this.$ViewableImpressionTracker3();
                    return;
                }
                this.logImpression(1, {});
                this.$ViewableImpressionTracker1();
            }.bind(this), this.config.duration_in_ms);
        }
    };
    o.prototype.onHidden = function () {
        "use strict";
        this.emit('hidden', {id: this.getID(), token: this.getToken()});
        if (this.config.log_initial_nonviewable && !this.isLogged() && !this.isNonViewableLogged) {
            this.logNonViewableImpression();
        } else if (!this.config.log_initial_nonviewable && !this.isLogged() && this.isVisible)this.logNonViewableImpression();
        this.isVisible = false;
        if (this.waitForLogged) {
            this.waitForLogged = false;
            clearTimeout(this.viewableTimeout);
        }
        if (this.isLogged() && !this.waitForSubsequent && this.config.subsequent_gap_in_ms >= 0) {
            this.waitForSubsequent = true;
            this.clearSubsequentTimeout = setTimeout(function () {
                this.waitForSubsequent = false;
                this.reset();
                if (this.isVisible)this.onVisible();
            }.bind(this), this.config.subsequent_gap_in_ms);
        }
        this.$ViewableImpressionTracker3();
    };
    o.prototype.onRemoved = function () {
        "use strict";
        this.isVisible = false;
    };
    o.prototype.getToken = function () {
        "use strict";
        return this.element.getAttribute('data-xt');
    };
    o.prototype.logImpression = function (p, q) {
        "use strict";
        if (this.isLogged())return;
        var r = this.getToken(), s = Math.floor(Date.now() / 1000), t = {xt: r, isv: p, cts: s};
        if (g.isEnabled('xtrackable_clientview_batch') && this.config.should_batch) {
            this.logWithBanzai(t);
        } else this.logWithIFrame(h(t, q));
    };
    o.prototype.logNonViewableImpression = function () {
        "use strict";
        if (this.config.nonviewableEnabled) {
            var p = this.getToken();
            g.post('xtrackable:nonviewable', {xt: p});
        }
        this.isNonViewableLogged = true;
    };
    o.prototype.isLogged = function () {
        "use strict";
        return this.iframe !== null || this.banzaiLogged;
    };
    o.prototype.reset = function () {
        "use strict";
        if (this.iframe) {
            i.remove(this.iframe);
            this.iframe = null;
        }
        if (this.banzaiLogged)this.banzaiLogged = false;
        this.isNonViewableLogged = false;
        this.isVisible = false;
        this.waitForLogged = false;
        this.waitForSubsequent = false;
    };
    o.prototype.logWithBanzai = function (p) {
        "use strict";
        this.banzaiLogged = true;
        g.post('xtrackable:clientview_batch', p);
    };
    o.prototype.logWithIFrame = function (p) {
        "use strict";
        this.iframe = i.create('iframe', {src: new n(this.config.impressionURL).addQueryData(p), width: 0, height: 0, frameborder: 0, scrolling: 'no', className: 'fbEmuTracking'});
        this.iframe.setAttribute('aria-hidden', 'true');
        i.appendContent(this.element, this.iframe);
    };
    o.prototype.$ViewableImpressionTracker4 = function () {
        "use strict";
        return 0;
    };
    o.prototype.$ViewableImpressionTracker0 = function () {
        "use strict";
        if (this.$ViewableImpressionTracker4())m.set(this.element, 'background-color', '#abab9a');
    };
    o.prototype.$ViewableImpressionTracker2 = function () {
        "use strict";
        if (this.$ViewableImpressionTracker4())m.set(this.element, 'background-color', '#e4f70a');
    };
    o.prototype.$ViewableImpressionTracker3 = function () {
        "use strict";
        if (this.$ViewableImpressionTracker4())m.set(this.element, 'background-color', null);
    };
    o.prototype.$ViewableImpressionTracker1 = function () {
        "use strict";
        if (this.$ViewableImpressionTracker4())m.set(this.element, 'background-color', '#047515');
    };
    l(o, {visible: true, hidden: true});
    e.exports = o;
}, null);
__d("VisibilityTrackingHelper", ["Arbiter", "DesktopHscrollUnitEventConstants", "getViewportDimensions", "Event"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = {getEventListeners: function (l) {
        return [j.listen(document, 'DOMContentLoaded', l), j.listen(window, 'scroll', l), j.listen(window, 'resize', l), g.subscribe(h.HSCROLL_ITEM_SHOWN_EVENT, l)];
    }, getViewportInfo: function () {
        return i();
    }};
    e.exports = k;
}, null);
__d("VisibilityTracking", ["Banzai", "ErrorUtils", "ScriptPath", "SubscriptionsHandler", "Visibility", "VisibilityTrackingHelper", "collectDataAttributes", "copyProperties", "getElementPosition", "pageID", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = 'visibility_tracking', s = '[data-vistracking]', t = 500, u = 50, v = 50, w = 50, x = 50, y = {VISIBLE: 'visible', HIDDEN: 'hidden'}, z = {DEFAULT: 'default', REMOVED: 'removed'}, aa = {name: y.VISIBLE, cause: z.DEFAULT}, ba = {name: y.HIDDEN, cause: z.DEFAULT}, ca = {name: y.HIDDEN, cause: z.REMOVED}, da = 0;

    function ea(fa) {
        "use strict";
        fa = fa || {};
        if (!fa.bypass_banzai_check && !g.isEnabled(r))return;
        this.visibleElementInfo = {};
        this.getDataFromConfig(fa);
        k.addListener(k.VISIBLE, h.guard(this.fireEvent, 'VisibilityTracking:visible', this));
        if (!this.skipVisibilityHiddenEvents)k.addListener(k.HIDDEN, h.guard(this.clearAllVisibleElements, 'VisibilityTracking:hidden', this));
        i.subscribe(h.guard(this.updateVisibleElements, 'VisibilityTracking:scriptPath', this));
        g.subscribe(g.SHUTDOWN, h.guard(this.onUnload, 'VisibilityTracking:banzaiShutdown', this));
        this.fireEventCallback = q.acrossTransitions(h.guard(this.fireEvent, 'VisibilityTracking:fireEventCallback', this), this.timeout, this);
        this.listeners = new j();
        l.getEventListeners(this.fireEventCallback).forEach(function (ga) {
            this.listeners.addSubscriptions(ga);
        }, this);
        if (this.extraInit)h.applyWithGuard(this.extraInit.bind(this));
    }

    ea.prototype.getDataFromConfig = function (fa) {
        "use strict";
        this.config = fa;
        this.root = fa.root || document.documentElement;
        this.selector = fa.selector || s;
        this.timeout = (typeof fa.timeout !== 'undefined') ? fa.timeout : t;
        this.minOffsetVisibleFromBottom = (typeof fa.minOffsetVisibleFromBottom !== 'undefined') ? fa.minOffsetVisibleFromBottom : u;
        this.minOffsetVisibleFromTop = (typeof fa.minOffsetVisibleFromTop !== 'undefined') ? fa.minOffsetVisibleFromTop : v;
        this.minOffsetVisibleFromLeft = (typeof fa.minOffsetVisibleFromLeft !== 'undefined') ? fa.minOffsetVisibleFromLeft : w;
        this.minOffsetVisibleFromRight = (typeof fa.minOffsetVisibleFromRight !== 'undefined') ? fa.minOffsetVisibleFromRight : x;
        this.handleAllHiddenEvents = (typeof fa.handleAllHiddenEvents !== 'undefined') ? fa.handleAllHiddenEvents : false;
        this.handleAllVisibleEvents = (typeof fa.handleAllVisibleEvents !== 'undefined') ? fa.handleAllVisibleEvents : false;
        this.skipVisibilityHiddenEvents = (typeof fa.skipVisibilityHiddenEvents !== 'undefined') ? fa.skipVisibilityHiddenEvents : false;
        this.cacheTrackedElements = (typeof fa.cacheTrackedElements !== 'undefined') ? fa.cacheTrackedElements : false;
    };
    ea.prototype.getAllTrackedElements = function () {
        "use strict";
        if (!this.allTrackedElements) {
            this.allTrackedElements = {};
            if (this.root.querySelectorAll) {
                var fa = this.root.querySelectorAll(this.selector);
                for (var ga = 0; ga < fa.length; ga++) {
                    var ha = this.getElementID(fa[ga]);
                    this.allTrackedElements[ha] = fa[ga];
                }
            }
        }
        return this.allTrackedElements;
    };
    ea.prototype.refreshAllTrackedElements = function () {
        "use strict";
        delete this.allTrackedElements;
        return this.getAllTrackedElements();
    };
    ea.prototype.getDataToLog = function (fa) {
        "use strict";
        var ga = n(m(fa, ['gt']).gt, {client_time: Date.now() / 1000, time_spent_id: p, script_path: i.getScriptPath()});
        return ga;
    };
    ea.prototype.getElementID = function (fa) {
        "use strict";
        var ga = fa.$VisibilityTracking0;
        if (ga)return ga;
        fa.$VisibilityTracking0 = ++da;
        return da;
    };
    ea.prototype.sendDataToLog = function (fa) {
        "use strict";
        g.post(r, fa);
    };
    ea.prototype.fireEvent = function () {
        "use strict";
        var fa = this.cacheTrackedElements ? this.allTrackedElements : this.refreshAllTrackedElements();
        for (var ga in fa) {
            var ha = fa[ga], ia = l.getViewportInfo(), ja = this.isVisible(ha, ia);
            if (!ja && (ga in this.visibleElementInfo || this.handleAllHiddenEvents)) {
                this.handleEvent(ha, ba);
            } else if (ja && (!(ga in this.visibleElementInfo) || this.handleAllVisibleEvents))this.handleEvent(ha, aa);
        }
        this.clearUntrackedVisibleElements();
    };
    ea.prototype.isVisible = function (fa, ga) {
        "use strict";
        var ha = o(fa);
        return (ha.x || ha.y || ha.width || ha.height) && (ha.y + ha.height >= this.minOffsetVisibleFromTop) && (ha.y <= ga.height - this.minOffsetVisibleFromBottom) && (ha.x + ha.width >= this.minOffsetVisibleFromLeft) && (ha.x <= ga.width - this.minOffsetVisibleFromRight);
    };
    ea.prototype.handleEvent = function (fa, event) {
        "use strict";
        var ga = this.getElementID(fa), ha = this.getDataToLog(fa), ia;
        if (event.name === y.VISIBLE) {
            var ja = Math.floor(Date.now() / 1000);
            ia = p.concat(":", ja.toString(), ":", this.getElementID(fa).toString());
            this.visibleElementInfo[ga] = {visibility_id: ia, elem: fa};
        } else if (event.name === y.HIDDEN)if (ga in this.visibleElementInfo) {
            ia = this.visibleElementInfo[ga].visibility_id;
            delete this.visibleElementInfo[ga];
        }
        this.sendDataToLog(n(ha, {event: event.name, visibility_id: ia}));
    };
    ea.prototype.clearUntrackedVisibleElements = function () {
        "use strict";
        var fa = this.getAllTrackedElements();
        for (var ga in this.visibleElementInfo)if (!(ga in fa)) {
            var ha = this.visibleElementInfo[ga];
            if (ha.elem)this.handleEvent(ha.elem, ca);
        }
    };
    ea.prototype.clearAllVisibleElements = function () {
        "use strict";
        var fa = this.getAllTrackedElements();
        for (var ga in fa)if (ga in this.visibleElementInfo)this.handleEvent(fa[ga], ba);
        this.clearUntrackedVisibleElements();
    };
    ea.prototype.updateVisibleElements = function () {
        "use strict";
        this.clearAllVisibleElements();
        this.fireEvent();
    };
    ea.prototype.onUnload = function () {
        "use strict";
        this.clearAllVisibleElements();
        if (this.listeners) {
            this.listeners.release();
            this.listeners = null;
        }
        if (this.extraCleanup)h.applyWithGuard(this.extraCleanup.bind(this));
    };
    ea.init = function (fa) {
        "use strict";
        new ea(fa);
    };
    ea.EVENT = y;
    ea.CAUSE = z;
    e.exports = ea;
}, null);
__d("ViewableImpressionEventHandler", ["copyProperties", "ViewableImpressionHeatmapLogger", "ViewableImpressionTracker", "VisibilityTracking"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = 1;
    for (var l in j)if (j.hasOwnProperty(l))n[l] = j[l];
    var m = j === null ? null : j.prototype;
    n.prototype = Object.create(m);
    n.prototype.constructor = n;
    n.__superConstructor__ = j;
    function n() {
        "use strict";
        if (j !== null)j.apply(this, arguments);
    }

    n.prototype.extraInit = function () {
        "use strict";
        this.impressionTrackers = {};
    };
    n.prototype.getDataFromConfig = function (o) {
        "use strict";
        m.getDataFromConfig.call(this, o);
        this.doHeatmapLogging = o.doHeatmapLogging;
        this.heatmapLoggingDurationMS = o.heatmapLoggingDurationMS;
        o.impressionURL = (o.impressionURL !== undefined) ? o.impressionURL : '/xti.php';
        o.nonviewableEnabled = (o.nonviewableEnabled !== undefined) ? o.nonviewableEnabled : false;
    };
    n.prototype.getImpressionTracking = function (o) {
        "use strict";
        var p = this.getElementID(o), q = g(this.getConfigFromElement(o), this.config), r = this.impressionTrackers[p];
        if (!r) {
            r = new i(p, o, q);
            this.impressionTrackers[p] = r;
            if (this.doHeatmapLogging)h.logFromViewableImpressionTracker(r, this.heatmapLoggingDurationMS);
        }
        return r;
    };
    n.prototype.refreshAndFireEvent = function () {
        "use strict";
        this.refreshAllTrackedElements();
        this.fireEventCallback();
    };
    n.prototype.handleEvent = function (o, event) {
        "use strict";
        var p = this.getImpressionTracking(o);
        if (!p)return;
        if (event.name === j.EVENT.VISIBLE) {
            p.onVisible();
            if (!this.visibleElementInfo[p.getID()])this.visibleElementInfo[p.getID()] = {elem: o};
        } else if (event.name === j.EVENT.HIDDEN)if (event.cause === j.CAUSE.DEFAULT) {
            p.onHidden();
            delete this.visibleElementInfo[p.getID()];
        } else if (event.cause === j.CAUSE.REMOVED) {
            p.onRemoved();
            delete this.visibleElementInfo[p.getID()];
            delete this.impressionTrackers[p.getID()];
        }
    };
    n.prototype.getConfigFromElement = function (o) {
        "use strict";
        return JSON.parse(o.getAttribute('data-xt-vimp'));
    };
    n.prototype.getElementID = function (o) {
        "use strict";
        if (!o.getAttribute('id'))o.setAttribute('id', 'xt_uniq_' + k++);
        return o.getAttribute('id');
    };
    e.exports = n;
}, null);
__d("legacy:async-signal", ["AsyncSignal"], function (a, b, c, d) {
    a.AsyncSignal = b('AsyncSignal');
}, 3);
__d("ViewableImpressionTracking", ["Arbiter", "DesktopHscrollUnitEventConstants", "ErrorUtils", "LitestandMessages", "Run", "ViewableImpressionEventHandler", "ViewableImpressionConfig"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = {init: function () {
        if (l.instance === undefined) {
            l.instance = new l(m);
            l.instance.listeners.addSubscriptions(g.subscribe([j.STORIES_INSERTED, 'AdsRefreshHandler/AdsLoaded', 'MPPInsights/ChartView', 'PhotoSnowliftAds/displayUnits', 'WebMessengerAdsControl/adjustAds', h.HSCROLL_ITEM_INSERTED_EVENT], i.guard(function () {
                l.instance.refreshAndFireEvent();
            }, 'ViewableImpressionTracking')));
        }
        k.onLoad(function () {
            l.instance.refreshAndFireEvent();
        });
    }};
    e.exports = n;
}, null);
__d("EgoUnitSlideInsert", ["Animation", "CSS", "DataStore", "DOM", "Ease", "Event", "Parent", "TidyArbiterMixin", "cx", "copyProperties", "tidyEvent"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = 'sliding', s = "EgoSlider/End", t = p({isSliding: function (u) {
        return i.get(u, r);
    }, runAfterSlide: function (u, v) {
        var w = q(t.subscribe(s, function (x, y) {
            if (y === u) {
                w && w.unsubscribe();
                v();
            }
        }));
    }, registerSlide: function (u, v) {
        l.listen(u, 'click', function (w) {
            var x = m.byClass(w.getTarget(), "_5cl_");
            if (!x)return;
            var y = m.byClass(u, 'ego_unit'), z = 0, aa = m.byClass(y, 'ego_unit_container'), ba = j.scry(aa, '.ego_unit')[0];
            if (ba === y)if (y.nextSibling) {
                y.nextSibling.style.paddingTop = '0px';
                y.nextSibling.style.borderTop = '0px';
            }
            h.addClass(y, "_5cl-");
            i.set(y, r, true);
            new g(y).to('height', 0).to('padding-top', z).to('padding-bottom', 0).to('margin', 0).from('opacity', 1).to('opacity', 0).ease(k.circOut).duration(300).checkpoint(1,function () {
                j.appendContent(aa, y);
                j.prependContent(y, v);
                i.remove(y, r);
            }).to('height', 12).to('opacity', 1).to('margin-bottom', 10).duration(0).checkpoint(2,function () {
                t.inform(s, y);
            }).go();
        });
    }}, n);
    e.exports = t;
}, null);
__d("NetEgo", ["Animation", "Arbiter", "cx", "CSS", "DOM", "EgoUnitSlideInsert", "PageLikeButton", "Parent", "URI", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = {setup: function (r) {
        h.subscribe([m.LIKED, 'FriendRequest/sending'], function (s, t) {
            if ((r == t.profile_id && t.origin == 'hovercard') || r == t.uid) {
                var u = p(document.body, '.ego_unit_container');
                if (u) {
                    var v = k.scry(u, '.ego_unit'), w = v.length;
                    for (var x = 0; x < w; x++) {
                        var y = v[x].getAttribute('data-ego-fbid');
                        if (y == r) {
                            var z = k.scry(v[x], '.ego_action a')[0];
                            if (z)z.click();
                            break;
                        }
                    }
                }
            }
        });
    }, updateXids: function (r, s) {
        if (r.length == 0 && s.length == 0)return;
        var t = function (da) {
            return function (ea) {
                var fa = ea.getAttribute(da);
                if (!fa)return false;
                var ga = new o(fa).getQueryData();
                return !!ga.xids;
            };
        }, u = k.scry(document.body, '.ego_unit a');
        u = u.filter(t('ajaxify'));
        if (u.length == 0)return;
        var v = new o(u[0].getAttribute('ajaxify')), w = v.getQueryData();
        if (!w.xids)return;
        try {
            var y = JSON.parse(w.xids);
        } catch (x) {
            return;
        }
        for (var z = 0; z < r.length; ++z)delete y[r[z]];
        for (z = 0; z < s.length; ++z)y[s[z]] = 1;
        var aa = JSON.stringify(y), ba = function (da, ea) {
            v = new o(da.getAttribute(ea));
            w = v.getQueryData();
            w.xids = aa;
            v.setQueryData(w);
            da.setAttribute(ea, v.toString());
        };
        for (z = 0; z < u.length; ++z)ba(u[z], 'ajaxify');
        var ca = k.scry(document.body, '.ego_unit form');
        ca = ca.filter(t('action'));
        for (z = 0; z < ca.length; ++z)ba(ca[z], 'action');
    }, replaceUnit: function (r, s, t, u) {
        q.replaceUnitCheckParent(r, s, t, u, false);
    }, replaceUnitCheckParent: function (r, s, t, u, v) {
        var w = n.byClass(r, 'ego_unit_container');
        if (w && l.isSliding(r)) {
            var x = k.appendContent(w, s);
            x.forEach(j.hide);
            l.runAfterSlide(r, q._replaceUnitElement.bind(null, r, x, v));
        } else q._replaceUnit(r, s, t, u, v);
    }, _replaceUnit: function (r, s, t, u, v) {
        var w = k.insertAfter(r, s);
        w.forEach(j.hide);
        if (u !== undefined && u !== null) {
            setTimeout(function () {
                q._replaceUnitFadeout(r, w, t, v);
            }, u);
        } else q._replaceUnitFadeout(r, w, t, v);
    }, _replaceUnitFadeout: function (r, s, t, u) {
        if (t) {
            new g(r).from('opacity', 1).to('opacity', 0).duration(t).checkpoint(1,function () {
                q._replaceUnitElement(r, s, u);
            }).go();
        } else q._replaceUnitElement(r, s, u);
    }, _replaceUnitElement: function (r, s, t) {
        var u = null;
        if (t) {
            var v = j.hasClass(r, 'ego_unit') ? r.parentNode : null;
            if (v) {
                var w = n.byClass(r, 'ego_feed_column');
                if (w)u = n.byClass(w, "_4-u2");
            }
        }
        k.remove(r);
        s.forEach(j.show);
        h.inform('netego_replacedUnit');
        q.clearHeader();
        if (u && !v.childNodes.length)j.hide(u);
    }, clearHeader: function () {
        var r = k.scry(document.body, '.ego_column'), s = [];
        for (var t = 0; t < r.length; ++t)s = s.concat(k.scry(r[t], '.uiHeader'));
        for (t = 0; t < s.length; ++t) {
            var u = s[t].nextSibling;
            if (!u || u.childNodes.length === 0) {
                k.remove(s[t]);
            } else if (u.childNodes.length === 1) {
                var v = u.childNodes[0];
                if (j.hasClass(v, 'ego_appended_units') && v.childNodes.length === 0)k.remove(s[t]);
            }
        }
    }};
    e.exports = q;
}, null);