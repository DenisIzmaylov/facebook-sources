/*!CK:3339184268!*//*1411971777,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["z\/SYi"]);
}

__d("ModuleErrorLogger", ["Bootloader", "ErrorUtils", "ModuleDependencies", "BanzaiScuba"], function (a, b, c, d, e, f, g, h, i, j) {
    function k(n) {
        if (!n || !n.length)return 0;
        return n.reduce(function (o, p) {
            return o + p;
        }) / n.length;
    }

    function l(n) {
        if (!n)return [];
        var o = [];
        for (var p in n)o.push(n[p]);
        return o;
    }

    var m = {init: function () {
        h.addListener(function (n) {
            if (n.name !== 'ModuleError')return;
            var o = i.getNotLoadedModules(), p = Object.keys(o.loading), q = l(g.getLoadingUrls()), r = l(g.getLoadedUrlTimes()), s = {};
            o.missing.forEach(function (v) {
                s[v] = 1;
            });
            var t = {};
            p.forEach(function (v) {
                t[v] = 1;
            });
            var u = new j('module_errors', null, {addAsnFields: true, addPredictedGeographyFields: true, addBrowserFields: true, addMobileDeviceFields: true, addPageFields: true, addUserFields: true});
            u.addInteger('missing_count', o.missing.length).addInteger('loading_count', p.length).addInteger('error_url_count', g.getErrorUrls().length).addTagset('missing_modules', s).addTagset('loading_modules', t).addInteger('mean_url_loading_time', Math.floor(k(q))).addInteger('mean_url_loaded_time', Math.floor(k(r))).post();
        }, true);
    }};
    e.exports = m;
}, null);
__d("Base64", [], function (a, b, c, d, e, f) {
    var g = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    function h(l) {
        l = (l.charCodeAt(0) << 16) | (l.charCodeAt(1) << 8) | l.charCodeAt(2);
        return String.fromCharCode(g.charCodeAt(l >>> 18), g.charCodeAt((l >>> 12) & 63), g.charCodeAt((l >>> 6) & 63), g.charCodeAt(l & 63));
    }

    var i = '>___?456789:;<=_______' + '\0\1\2\3\4\5\6\7\b\t\n\13\f\r\16\17\20\21\22\23\24\25\26\27\30\31' + '______\32\33\34\35\36\37 !"#$%&\'()*+,-./0123';

    function j(l) {
        l = (i.charCodeAt(l.charCodeAt(0) - 43) << 18) | (i.charCodeAt(l.charCodeAt(1) - 43) << 12) | (i.charCodeAt(l.charCodeAt(2) - 43) << 6) | i.charCodeAt(l.charCodeAt(3) - 43);
        return String.fromCharCode(l >>> 16, (l >>> 8) & 255, l & 255);
    }

    var k = {encode: function (l) {
        l = unescape(encodeURI(l));
        var m = (l.length + 2) % 3;
        l = (l + '\0\0'.slice(m)).replace(/[\s\S]{3}/g, h);
        return l.slice(0, l.length + m - 2) + '=='.slice(m);
    }, decode: function (l) {
        l = l.replace(/[^A-Za-z0-9+\/]/g, '');
        var m = (l.length + 3) & 3;
        l = (l + 'AAA'.slice(m)).replace(/..../g, j);
        l = l.slice(0, l.length + m - 3);
        try {
            return decodeURIComponent(escape(l));
        } catch (n) {
            throw new Error('Not valid UTF-8');
        }
    }, encodeObject: function (l) {
        return k.encode(JSON.stringify(l));
    }, decodeObject: function (l) {
        return JSON.parse(k.decode(l));
    }, encodeNums: function (l) {
        return String.fromCharCode.apply(String, l.map(function (m) {
            return g.charCodeAt((m | -(m > 63)) & -(m > 0) & 63);
        }));
    }};
    e.exports = k;
}, null);
__d("Clock", ["EventEmitter"], function (a, b, c, d, e, f, g) {
    var h = new g();
    h.ANOMALY = 'anomaly';
    var i = 30, j = Date.now(), k = [], l = 0, m = 1000;

    function n() {
        var p = Date.now() - j;
        return p < 0 || p > m * 10;
    }

    function o() {
        var p = Date.now() - j;
        k[l] = p;
        l = (l + 1) % i;
        if (n())h.emit(h.ANOMALY, p);
        j = Date.now();
    }

    h.getSamples = function () {
        return k.slice(l).concat(k.slice(0, l));
    };
    h.isAnomalous = n;
    setInterval(o, m, false);
    e.exports = h;
}, null);
__d("LogHistoryListeners", ["Clock", "ErrorUtils", "LogHistory"], function (a, b, c, d, e, f, g, h) {
    var i = b('LogHistory').getInstance('sys');
    g.addListener(g.ANOMALY, function (j) {
        i.warn('clock_anomaly', g.getSamples());
    });
    h.addListener(function (j) {
        i.error('error', JSON.stringify({guard: j.guard, line: j.line, message: j.message, script: j.script, stack: j.stack}));
    });
}, null);
__d("ScriptPathLogger", ["Banzai", "ScriptPath", "copyProperties", "isInIframe"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = 'script_path_change', l = {scriptPath: null, categoryToken: null, impressionID: null}, m = false;

    function n(v, w, x) {
        if (!m || j())return;
        var y = g.isEnabled('vital_navigations') ? g.VITAL : g.BASIC, z = {source_path: v.scriptPath, source_token: v.categoryToken, dest_path: w.scriptPath, dest_token: w.categoryToken, navigation: h.getNavigation(), impression_id: w.impressionID, cause: x};
        if (v.owningEntityID)z.source_owning_entity_id = v.owningEntityID;
        if (w.owningEntityID)z.dest_owning_entity_id = w.owningEntityID;
        if (v.topViewEndpoint)z.source_endpoint = v.topViewEndpoint;
        if (w.topViewEndpoint)z.dest_endpoint = w.topViewEndpoint;
        g.post(k, z, y);
    }

    function o() {
        n(l, h.getPageInfo(), h.CAUSE.PAGE_LOAD);
    }

    function p(v, w) {
        n(v, w, h.CAUSE.TRANSITION);
    }

    function q() {
        n(h.getPageInfo(), l, h.CAUSE.PAGE_UNLOAD);
    }

    function r(v) {
        var w = i({}, l);
        w.scriptPath = v;
        n(h.getPageInfo(), w, h.CAUSE.DIALOG_OPEN);
    }

    function s(v) {
        var w = i({}, l);
        w.scriptPath = v;
        n(w, h.getPageInfo(), h.CAUSE.DIALOG_CLOSE);
    }

    var t = h.subscribe(function (v) {
        if (m) {
            var w = v.source, x = v.dest, y = v.cause;
            if (y) {
                n(w || l, x || l, y);
            } else if (w) {
                p(w, x);
            } else o();
        }
    });
    g.subscribe(g.SHUTDOWN, q);
    var u = {startLogging: function () {
        m = true;
        if (h.getPageInfo())o();
    }, stopLogging: function () {
        m = false;
        h.unsubscribe(t);
    }, logDialogOpen: function (v) {
        r(v);
    }, logDialogClose: function (v) {
        s(v);
    }};
    u.BANZAI_LOGGING_ROUTE = k;
    e.exports = u;
}, null);
__d("TimeSpentArray", ["Banzai", "pageID", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i) {
    var j = 2, k = j * 32, l, m, n, o, p, q, r, s, t, u = {}, v;

    function w() {
        return {timeoutDelayMap: u, nextDelay: v, timeoutInSeconds: n};
    }

    function x() {
        if (l) {
            var fa = Date.now();
            if (fa > p)r = Math.min(k, Math.ceil((fa / 1000) - o));
            var ga = ca();
            if (ga)l(ga, v);
        }
        ba();
    }

    function y() {
        z();
        m = i(x, n * 1000);
    }

    function z() {
        if (m) {
            clearTimeout(m);
            m = null;
        }
    }

    function aa(fa) {
        o = fa;
        p = o * 1000;
        q = [1];
        for (var ga = 1; ga < j; ga++)q.push(0);
        r = 1;
        s += 1;
        t += 1;
        var ha = t.toString() + '_delay';
        v = u[ha];
        if (typeof v == 'undefined')v = u.delay;
        var ia = t.toString() + '_timeout', ja = u[ia];
        if (typeof ja == 'undefined')ja = u.timeout;
        ja = Math.min(ja, k);
        n = ja || k;
        y();
    }

    function ba() {
        z();
        q = null;
    }

    function ca() {
        if (!q)return null;
        return {tos_id: h, start_time: o, tos_array: q.slice(0), tos_len: r, tos_seq: t, tos_cum: s};
    }

    function da(fa) {
        if (fa >= p && (fa - p) < 1000)return;
        ea(Math.floor(fa / 1000));
    }

    function ea(fa) {
        var ga = fa - o;
        if (ga < 0 || ga >= k)x();
        if (!q) {
            aa(fa);
        } else {
            q[ga >> 5] |= (1 << (ga & 31));
            r = ga + 1;
            s += 1;
            p = fa * 1000;
        }
    }

    e.exports = {init: function (fa, ga, ha) {
        s = 0;
        t = -1;
        l = fa;
        if (typeof ga == 'object' && ga !== null) {
            u = ga;
        } else u = {};
        if (!ha)ha = Date.now();
        aa(Math.floor(ha / 1000));
        g.subscribe(g.SHUTDOWN, x);
    }, update: function (fa) {
        da(fa);
    }, get: function () {
        return ca();
    }, ship: function () {
        x();
    }, reset: function () {
        ba();
    }, testState: function () {
        return w();
    }};
}, null);
__d("IntlUtils", ["AsyncRequest", "Cookie", "goURI"], function (a, b, c, d, e, f, g, h, i) {
    var j = {setXmode: function (k) {
        (new g()).setURI('/ajax/intl/save_xmode.php').setData({xmode: k}).setHandler(function () {
            document.location.reload();
        }).send();
    }, setAmode: function (k) {
        new g().setURI('/ajax/intl/save_xmode.php').setData({amode: k, app: false}).setHandler(function () {
            document.location.reload();
        }).send();
    }, setLocale: function (k, l, m, n) {
        if (!m)m = k.options[k.selectedIndex].value;
        j.saveLocale(m, true, null, l, n);
    }, saveLocale: function (k, l, m, n, o) {
        new g().setURI('/ajax/intl/save_locale.php').setData({aloc: k, source: n, app_only: o}).setHandler(function (p) {
            if (l) {
                document.location.reload();
            } else i(m);
        }).send();
    }, setLocaleCookie: function (k, l) {
        h.set('locale', k, 7 * 24 * 3600000);
        i(l);
    }};
    e.exports = j;
}, null);
__d("legacy:intl-base", ["IntlUtils"], function (a, b, c, d, e, f, g) {
    a.intl_set_xmode = g.setXmode;
    a.intl_set_amode = g.setAmode;
    a.intl_set_locale = g.setLocale;
    a.intl_save_locale = g.saveLocale;
    a.intl_set_cookie_locale = g.setLocaleCookie;
}, 3);
__d("legacy:onload-action", ["OnloadHooks"], function (a, b, c, d, e, f, g) {
    a._onloadHook = g._onloadHook;
    a._onafterloadHook = g._onafterloadHook;
    a.runHook = g.runHook;
    a.runHooks = g.runHooks;
    a.keep_window_set_as_loaded = g.keepWindowSetAsLoaded;
}, 3);
__d("LoginFormController", ["Event", "ge", "Button", "Cookie"], function (a, b, c, d, e, f, g, h, i, j) {
    f.init = function (k, l, m) {
        g.listen(k, 'submit', function () {
            if (window.__cookieReload)window.clearInterval(window.__cookieReload);
            i.setEnabled(l, false);
            setTimeout(i.setEnabled.bind(null, l, true), 15000);
        });
        var n = h('lgnjs');
        if (n) {
            var o = Math.floor(Date.now() / 1000);
            n.value = o;
        }
        var p = parseInt(j.get('m_ts'), 10), q = m != null;
        if (p > o - 60)q = false;
        if (q) {
            var r, s = function () {
                if (j.get('c_user') != null) {
                    window.clearInterval(r);
                    j.set('m_ts', Math.floor(Date.now() / 1000), null, '/', false);
                    window.location.href = m;
                }
            };
            r = window.setInterval(s, 1000);
            s();
        }
    };
}, null);
__d("ClickRefUtils", [], function (a, b, c, d, e, f) {
    var g = {get_intern_ref: function (h) {
        if (!!h) {
            var i = {profile_minifeed: 1, gb_content_and_toolbar: 1, gb_muffin_area: 1, ego: 1, bookmarks_menu: 1, jewelBoxNotif: 1, jewelNotif: 1, BeeperBox: 1, searchBarClickRef: 1};
            for (var j = h; j && j != document.body; j = j.parentNode) {
                if (!j.id || typeof j.id !== 'string')continue;
                if (j.id.substr(0, 8) == 'pagelet_')return j.id.substr(8);
                if (j.id.substr(0, 8) == 'box_app_')return j.id;
                if (i[j.id])return j.id;
            }
        }
        return '-';
    }, get_href: function (h) {
        var i = (h.getAttribute && (h.getAttribute('ajaxify') || h.getAttribute('data-endpoint')) || h.action || h.href || h.name);
        return typeof i === 'string' ? i : null;
    }, should_report: function (h, i) {
        if (i == 'FORCE')return true;
        if (i == 'INDIRECT')return false;
        return h && (g.get_href(h) || (h.getAttribute && h.getAttribute('data-ft')));
    }};
    e.exports = g;
}, null);
__d("setUECookie", ["Env"], function (a, b, c, d, e, f, g) {
    function h(i) {
        if (!g.no_cookies)document.cookie = "act=" + encodeURIComponent(i) + "; path=/; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
    }

    e.exports = h;
}, null);
__d("ClickRefLogger", ["Arbiter", "Banzai", "ClickRefUtils", "EagleEye", "Env", "ScriptPath", "Vector", "$", "collectDataAttributes", "copyProperties", "ge", "pageID", "setUECookie"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t = {delay: h.BASIC.delay, retry: true};

    function u(y) {
        if (!q('content'))return [0, 0, 0, 0];
        var z = n('content'), aa = m.getEventPosition(y);
        return [aa.x, aa.y, z.offsetLeft, z.clientWidth];
    }

    function v(y, z, event, aa) {
        var ba = 'r', ca = [0, 0, 0, 0], da, ea;
        if (!!event) {
            da = event.type;
            if (da == 'click' && q('content'))ca = u(event);
            var fa = 0;
            event.ctrlKey && (fa += 1);
            event.shiftKey && (fa += 2);
            event.altKey && (fa += 4);
            event.metaKey && (fa += 8);
            if (fa)da += fa;
        }
        if (!!z)ea = i.get_href(z);
        var ga = o(!!event ? (event.target || event.srcElement) : z, ['ft', 'gt']);
        p(ga.ft, aa.ft || {});
        p(ga.gt, aa.gt || {});
        if (typeof(ga.ft.ei) === 'string')delete ga.ft.ei;
        var ha = [y._ue_ts, y._ue_count, ea || '-', y._context, da || '-', i.get_intern_ref(z), ba, a.URI ? a.URI.getRequestURI(true, true).getUnqualifiedURI().toString() : location.pathname + location.search + location.hash, ga].concat(ca).concat(r).concat(l.getScriptPath());
        return ha;
    }

    g.subscribe("ClickRefAction/new", function (y, z) {
        if (i.should_report(z.node, z.mode)) {
            var aa = v(z.cfa, z.node, z.event, z.extra_data), ba = [j.getSessionID(), Date.now(), 'act'];
            s(z.cfa.ue);
            if (h.isEnabled('click_ref_logger')) {
                h.post('click_ref_logger', Array.prototype.concat(ba, aa), t);
            } else j.log('act', aa);
        }
    });
    function w(y) {
        function z(ha) {
            var ia = '';
            for (var ja = 0; ja < ha.length; ja++)ia += String.fromCharCode(1 ^ ha.charCodeAt(ja));
            return ia;
        }

        function aa(ha, ia, ja, ka) {
            var la = ia[ja];
            if (la && ha && la in ha)if (ja + 1 < ia.length) {
                aa(ha[la], ia, ja + 1, ka);
            } else {
                var ma = ha[la], na = function () {
                    setTimeout(ka.bind(null, arguments));
                    return ma.apply(this, arguments);
                };
                na.toString = ma.toString.bind(ma);
                Object.defineProperty(ha, la, {configurable: false, writable: true, value: na});
            }
        }

        var ba = {}, ca = {}, da = false;

        function ea(ha, ia) {
            if (ca[ha])return;
            ca[ha] = ba[ha] = 1;
        }

        var fa = y[z('jiri')];
        if (fa) {
            var ga = [];
            z(fa).split(',').map(function (ha, ia) {
                var ja = ha.substring(1).split(':'), ka;
                switch (ha.charAt(0)) {
                    case '1':
                        ka = new RegExp('\\b(' + ja[0] + ')\\b', 'i');
                        ga.push(function (la) {
                            var ma = ka.exec(Object.keys(window));
                            if (ma)ea(ia, '' + ma);
                        });
                        break;
                    case '2':
                        ka = new RegExp(ja[0]);
                        aa(window, ja, 2, function (la) {
                            var ma = la[ja[1]];
                            if (typeof ma === 'string' && ka.test(ma))ea(ia, ha);
                        });
                        break;
                    case '3':
                        aa(window, ja, 0, function () {
                            for (var la = ga.length; la--;)ga[la]();
                            var ma = Object.keys(ba);
                            if (ma.length) {
                                ba = {};
                                setTimeout(h[z('qnru')].bind(h, z('islg'), {m: '' + ma}), 5000);
                            }
                        });
                        break;
                    case '4':
                        da = true;
                        break;
                }
            });
        }
    }

    try {
        w(k);
    } catch (x) {
    }
}, null);
__d("QuicklingAugmenter", ["URI"], function (a, b, c, d, e, f, g) {
    var h = [], i = {addHandler: function (j) {
        h.push(j);
    }, augmentURI: function (j) {
        var k = [], l = g(j);
        h.forEach(function (m) {
            var n = m(l);
            if (!n)return l;
            k.push(m);
            l = l.addQueryData(n);
        });
        h = k;
        return l;
    }};
    e.exports = i;
}, null);
__d("Quickling", ["AjaxPipeRequest", "Arbiter", "CSSClassTransition", "DocumentTitle", "DOM", "ErrorUtils", "HTML", "OnloadHooks", "PageTransitions", "QuicklingAugmenter", "QuicklingConfig", "Run", "URI", "UserAgent_DEPRECATED", "PHPQuerySerializer", "goOrReplace", "isEmpty"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
    var x = q.version, y = q.sessionLength, z = new RegExp(q.inactivePageRegex), aa = 0, ba, ca = '', da = [];

    function ea() {
        da.forEach(clearTimeout);
        da.length = 0;
    }

    function fa() {
        if (da.length === 0)r.onLeave(ea);
    }

    var ga = {isActive: function () {
        return true;
    }, isPageActive: function (pa) {
        if (pa == '#')return false;
        pa = new s(pa);
        if (pa.getDomain() && pa.getDomain() != s().getDomain())return false;
        if (pa.getPath() == '/l.php') {
            var qa = pa.getQueryData().u;
            if (qa) {
                qa = s(unescape(qa)).getDomain();
                if (qa && qa != s().getDomain())return false;
            }
        }
        var ra = pa.getPath(), sa = pa.getQueryData();
        if (!w(sa))ra += '?' + u.serialize(sa);
        return !z.test(ra);
    }, getLoadCount: function () {
        return aa;
    }};

    function ha(pa) {
        pa = pa || 'Facebook';
        j.set(pa);
        if (t.ie()) {
            ca = pa;
            if (!ba)ba = window.setInterval(function () {
                var qa = ca, ra = j.get();
                if (qa != ra)j.set(qa);
            }, 5000, false);
        }
    }

    function ia(pa) {
        var qa = document.getElementsByTagName('link');
        for (var ra = 0; ra < qa.length; ++ra) {
            if (qa[ra].rel != 'alternate')continue;
            k.remove(qa[ra]);
        }
        if (pa.length) {
            var sa = k.find(document, 'head');
            sa && k.appendContent(sa, m(pa[0]));
        }
    }

    for (var ja in g)if (g.hasOwnProperty(ja))la[ja] = g[ja];
    var ka = g === null ? null : g.prototype;
    la.prototype = Object.create(ka);
    la.prototype.constructor = la;
    la.__superConstructor__ = g;
    function la(pa) {
        "use strict";
        var qa = {version: x};
        g.call(this, pa, {quickling: qa});
    }

    la.prototype._preBootloadFirstResponse = function (pa) {
        "use strict";
        return true;
    };
    la.prototype._fireDomContentCallback = function () {
        "use strict";
        this._request.cavalry && this._request.cavalry.setTimeStamp('t_domcontent');
        o.transitionComplete();
        this._onPageDisplayed && this._onPageDisplayed(this.pipe);
        ka._fireDomContentCallback.call(this);
    };
    la.prototype._fireOnloadCallback = function () {
        "use strict";
        if (this._request.cavalry) {
            this._request.cavalry.setTimeStamp('t_hooks');
            this._request.cavalry.setTimeStamp('t_layout');
            this._request.cavalry.setTimeStamp('t_onload');
        }
        ka._fireOnloadCallback.call(this);
    };
    la.prototype.isPageActive = function (pa) {
        "use strict";
        return ga.isPageActive(pa);
    };
    la.prototype._versionCheck = function (pa) {
        "use strict";
        if (pa.version == x)return true;
        var qa = ['quickling', 'ajaxpipe', 'ajaxpipe_token'];
        v(window.location, s(pa.uri).removeQueryData(qa), true);
        return false;
    };
    la.prototype._processFirstResponse = function (pa) {
        "use strict";
        var qa = pa.getPayload();
        ha(qa.title);
        ia(qa.syndication || []);
        window.scrollTo(0, 0);
        i.go(document.body, qa.body_class || '', o.getMostRecentURI(), pa.getRequest().getURI());
        h.inform('quickling/response');
    };
    la.prototype.getSanitizedParameters = function () {
        "use strict";
        return ['quickling'];
    };
    function ma() {
        aa++;
        return aa >= y;
    }

    function na(pa) {
        g.setCurrentRequest(null);
        if (ma())return false;
        pa = p.augmentURI(pa);
        if (!ga.isPageActive(pa))return false;
        window.ExitTime = Date.now();
        r.__removeHook('onafterloadhooks');
        r.__removeHook('onloadhooks');
        n.runHooks('onleavehooks');
        h.inform('onload/exit', true);
        new la(pa).setCanvasId('content').send();
        return true;
    }

    function oa(pa) {
        var qa = window[pa];

        function ra(sa, ta, ua) {
            if (typeof sa !== 'function')sa = eval.bind(null, sa);
            var va = qa(l.guard(sa, pa + ' (with Quickling)'), ta);
            if (ta > 0 && ua !== false) {
                fa();
                da.push(va);
            }
            return va;
        }

        window[pa] = ra;
    }

    r.onAfterLoad(function pa() {
        oa('setInterval');
        oa('setTimeout');
        o.registerHandler(na, 1);
    });
    e.exports = a.Quickling = ga;
}, null);
__d("StringTransformations", [], function (a, b, c, d, e, f) {
    e.exports = {unicodeEscape: function (g) {
        return g.replace(/[^A-Za-z0-9\-\.\:\_\$\/\+\=]/g, function (h) {
            var i = h.charCodeAt().toString(16);
            return '\\u' + ('0000' + i.toUpperCase()).slice(-4);
        });
    }, unicodeUnescape: function (g) {
        return g.replace(/(\\u[0-9A-Fa-f]{4})/g, function (h) {
            return String.fromCharCode(parseInt(h.slice(2), 16));
        });
    }};
}, null);
__d("UserActionHistory", ["Arbiter", "ClickRefUtils", "ScriptPath", "throttle", "WebStorage"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {click: 1, submit: 1}, m = false, n = {log: [], len: 0}, o = j.acrossTransitions(function () {
        try {
            m._ua_log = JSON.stringify(n);
        } catch (r) {
            m = false;
        }
    }, 1000);

    function p() {
        var r = k.getSessionStorage();
        if (r) {
            m = r;
            m._ua_log && (n = JSON.parse(m._ua_log));
        } else m = false;
        n.log[n.len % 10] = {ts: Date.now(), path: '-', index: n.len, type: 'init', iref: '-'};
        n.len++;
        g.subscribe("UserAction/new", function (s, t) {
            var u = t.ua, v = t.node, event = t.event;
            if (!event || !(event.type in l))return;
            var w = {path: i.getScriptPath(), type: event.type, ts: u._ue_ts, iref: h.get_intern_ref(v) || '-', index: n.len};
            n.log[n.len++ % 10] = w;
            m && o();
        });
    }

    function q() {
        return n.log.sort(function (r, s) {
            return (s.ts != r.ts) ? (s.ts - r.ts) : (s.index - r.index);
        });
    }

    p();
    e.exports = {getHistory: q};
}, null);
__d("KappaWrapper", ["AsyncSignal", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h) {
    var i = false;
    e.exports = {forceStart: function (j, k, l) {
        var m = 0, n = function () {
            new g('/si/kappa/', {Ko: "a"}).send();
            if (++m < j)h(n, (k * 1000));
        };
        h(n, ((k + l) * 1000));
    }, start: function (j, k, l) {
        if (!i) {
            i = true;
            this.forceStart(j, k, l);
        }
    }};
}, null);
__d("useragentcm", ["Bootloader", "UACMConfig", "ge"], function (a, b, c, d, e, f, g, h, i) {
    function j() {
        var k = false, l = {ffid: (typeof(h.ffid) == "undefined" ? 0 : h.ffid), ffid1: (typeof(h.ffid1) == "undefined" ? 0 : h.ffid1), ffid2: (typeof(h.ffid2) == "undefined" ? 0 : h.ffid2), ffid3: (typeof(h.ffid3) == "undefined" ? 0 : h.ffid3), ffid4: (typeof(h.ffid4) == "undefined" ? 0 : h.ffid4), ffver: (typeof(h.ffver) == "undefined" ? 0 : h.ffver)};
        l.qp = document.location;
        var m = i('login_form');
        if (m && m.action)l.qm = m.action;
        var n = '\146\141\143\145\142\157\157\153', o = new RegExp('(^|\\.)' + n + '\\.com$', 'i').test(document.location.hostname);
        if (!o) {
            k = true;
        } else if (l.qm) {
            var p = l.qm.split('?')[0].split('#')[0], q = 65535;
            for (var r = 0; r < p.length; r++) {
                var s = ((q >> 8) ^ p.charCodeAt(r)) & 255;
                s ^= s >> 4;
                q = ((q << 8) ^ (s << 12) ^ (s << 5) ^ s) & 65535;
            }
            if (h.ffver && h.ffver != q)k = true;
        }
        if (k) {
            var t = document.location.protocol + '//www.' + n + '.com/ajax/ua_callback.php';
            if (document.referrer)l.qr1 = document.referrer;
            g.loadModules(["AsyncSignal"], function (v) {
                new v(t, l).send();
            });
        }
    }

    e.exports = j;
}, null);
__d("legacy:si-countermeasures", ["useragentcm"], function (a, b, c, d) {
    a.useragentcm = b('useragentcm');
}, 3);
__d("Chromedome", ["fbt"], function (a, b, c, d, e, f, g) {
    f.start = function (h) {
        if (h.off || top !== window || !/(^|\.)facebook\.com$/.test(document.domain))return;
        var i = h.stop || "\u041e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u0435\u0441\u044c!", j = h.text || "\u042d\u0442\u0430 \u0444\u0443\u043d\u043a\u0446\u0438\u044f \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430 \u043f\u0440\u0435\u0434\u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0430 \u0434\u043b\u044f \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u043e\u0432. \u0415\u0441\u043b\u0438 \u043a\u0442\u043e-\u0442\u043e \u0441\u043a\u0430\u0437\u0430\u043b \u0432\u0430\u043c \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0438 \u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0447\u0442\u043e-\u0442\u043e \u0437\u0434\u0435\u0441\u044c, \u0447\u0442\u043e\u0431\u044b \u0432\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0444\u0443\u043d\u043a\u0446\u0438\u044e Facebook \u0438\u043b\u0438 \u00ab\u0432\u0437\u043b\u043e\u043c\u0430\u0442\u044c\u00bb \u0447\u0435\u0439-\u0442\u043e \u0430\u043a\u043a\u0430\u0443\u043d\u0442, \u044d\u0442\u043e \u043c\u043e\u0448\u0435\u043d\u043d\u0438\u043a\u0438. \u0412\u044b\u043f\u043e\u043b\u043d\u0438\u0432 \u044d\u0442\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f, \u0432\u044b \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u0435 \u0438\u043c \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0441\u0432\u043e\u0435\u043c\u0443 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0443 Facebook.", k = h.more || g._("\u0414\u043b\u044f \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438, \u0441\u043c. {url}.", [g.param("url", 'https://www.facebook.com/selfxss')]);
        if ((window.chrome || window.safari) && !h.textonly) {
            var l = 'font-family:helvetica; font-size:20px; ';
            [
                [i, h.c1 || l + 'font-size:50px; font-weight:bold; ' + 'color:red; -webkit-text-stroke:1px black;'],
                [j, h.c2 || l],
                [k, h.c3 || l],
                ['', '']
            ].map(function (r) {
                setTimeout(console.log.bind(console, '\n%c' + r[0], r[1]));
            });
        } else {
            var m = ['', ' .d8888b.  888                       888', 'd88P  Y88b 888                       888', 'Y88b.      888                       888', ' "Y888b.   888888  .d88b.  88888b.   888', '    "Y88b. 888    d88""88b 888 "88b  888', '      "888 888    888  888 888  888  Y8P', 'Y88b  d88P Y88b.  Y88..88P 888 d88P', ' "Y8888P"   "Y888  "Y88P"  88888P"   888', '                           888', '                           888', '                           888'], n = ('' + j).match(/.{35}.+?\s+|.+$/g), o = Math.floor(Math.max(0, (m.length - n.length) / 2));
            for (var p = 0; p < m.length || p < n.length; p++) {
                var q = m[p];
                m[p] = q + new Array(45 - q.length).join(' ') + (n[p - o] || '');
            }
            console.log('\n\n\n' + m.join('\n') + '\n\n' + k + '\n');
            return;
        }
    };
}, null);
__d("WebStorageMonster", ["Event", "AsyncRequest", "UserActivity", "StringTransformations", "WebStorage", "arrayContains", "isEmpty", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = 300000, p = false;

    function q(v) {
        var w = {};
        for (var x in v) {
            var y = v.getItem(x), z = j.unicodeEscape(x);
            if (typeof y === 'string')w[z] = y.length;
        }
        return w;
    }

    function r(v) {
        var w = k.getLocalStorage();
        if (!w || !v.keys)return;
        u._getLocalStorageKeys().forEach(function (x) {
            if (l(v.keys, x))w.removeItem(x);
        });
    }

    function s(v) {
        var w = k.getLocalStorage();
        if (w)u._getLocalStorageKeys().forEach(function (y) {
            if (!v.some(function (z) {
                return new RegExp(z).test(y);
            }))w.removeItem(y);
        });
        var x = k.getSessionStorage();
        if (x)x.clear();
    }

    function t(v) {
        if (i.isActive(o)) {
            n(t.bind(null, v), o);
        } else u.cleanNow(v);
    }

    var u = {registerLogoutForm: function (v, w) {
        g.listen(v, 'submit', function (x) {
            u.cleanOnLogout(w);
        });
    }, schedule: function (v) {
        if (p)return;
        p = true;
        t(v);
    }, cleanNow: function (v) {
        var w = Date.now(), x = {}, y = k.getLocalStorage();
        if (y)x.localStorage = q(y);
        var z = k.getSessionStorage();
        if (z)x.sessionStorage = q(z);
        var aa = !m(x), ba = Date.now();
        x.logtime = ba - w;
        if (aa)new h('/ajax/webstorage/process_keys.php').setData(x).setHandler(function (ca) {
            if (!v) {
                var da = ca.getPayload();
                if (da.keys)da.keys = da.keys.map(j.unicodeUnescape);
                r(da);
            }
        }.bind(this)).send();
    }, cleanOnLogout: function (v) {
        if (v)s(v);
        var w = k.getSessionStorage();
        if (w)w.clear();
    }, _getLocalStorageKeys: function () {
        var v = k.getLocalStorage();
        return v ? Object.keys(v) : [];
    }};
    e.exports = u;
}, null);