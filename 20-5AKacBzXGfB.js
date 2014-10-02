/*!CK:596011299!*//*1412036058,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["ITSM2"]);
}

__d("MessagingRealtimeConstants", [], function (a, b, c, d, e, f) {
    e.exports = {VIEWER_FBID: "realtime_viewer_fbid"};
}, null);
__d("SyncRequestStatusEnum", [], function (a, b, c, d, e, f) {
    e.exports = {PENDING: 0, ACCEPTED: 1, REJECTED: 2, EXPIRED: 3, CANCELED: 4, namesByValue: ["PENDING", "ACCEPTED", "REJECTED", "EXPIRED", "CANCELED"]};
}, null);
__d("ChatConfig", ["ChatConfigInitialData", "copyProperties"], function (a, b, c, d, e, f, g, h) {
    var i = {}, j = {get: function (k, l) {
        return k in i ? i[k] : l;
    }, set: function (k) {
        if (arguments.length > 1) {
            var l = {};
            l[k] = arguments[1];
            k = l;
        }
        h(i, k);
    }, getDebugInfo: function () {
        return i;
    }};
    j.set(g);
    e.exports = j;
}, null);
__d("SystemEvents", ["Arbiter", "ErrorUtils", "SystemEventsInitialData", "UserAgent_DEPRECATED", "copyProperties", "setIntervalAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = new g(), n = [], o = 1000;
    l(function () {
        for (var y = 0; y < n.length; y++)n[y]();
    }, o);
    function p() {
        return (/c_user=(\d+)/.test(document.cookie) && RegExp.$1) || 0;
    }

    function q() {
        return i.ORIGINAL_USER_ID;
    }

    var r = q(), s = navigator.onLine;

    function t() {
        if (!s) {
            s = true;
            m.inform(m.ONLINE, s);
        }
    }

    function u() {
        if (s) {
            s = false;
            m.inform(m.ONLINE, s);
        }
    }

    if (j.ie()) {
        if (j.ie() >= 11) {
            window.addEventListener('online', t, false);
            window.addEventListener('offline', u, false);
        } else if (j.ie() >= 8) {
            window.attachEvent('onload', function () {
                document.body.ononline = t;
                document.body.onoffline = u;
            });
        } else n.push(function () {
            (navigator.onLine ? t : u)();
        });
    } else if (window.addEventListener)if (!j.chrome()) {
        window.addEventListener('online', t, false);
        window.addEventListener('offline', u, false);
    }
    var v = r;
    n.push(function () {
        var y = p();
        if (v != y) {
            m.inform(m.USER, y);
            v = y;
        }
    });
    var w = Date.now();

    function x() {
        var y = Date.now(), z = y - w, aa = z < 0 || z > 10000;
        w = y;
        if (aa)m.inform(m.TIME_TRAVEL, z);
        return aa;
    }

    n.push(x);
    n.push(function () {
        if (window.onerror != h.onerror)window.onerror = h.onerror;
    });
    k(m, {USER: 'SystemEvents/USER', ONLINE: 'SystemEvents/ONLINE', TIME_TRAVEL: 'SystemEvents/TIME_TRAVEL', isPageOwner: function (y) {
        return (y || p()) == r;
    }, isOnline: function () {
        return j.chrome() || s;
    }, checkTimeTravel: x});
    e.exports = m;
}, null);
__d("ChannelSubdomain", ["Event", "JSLogger", "Run", "setTimeoutAcrossTransitions", "LogHistory", "WebStorage"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = b('LogHistory').getInstance('channel'), l = b('WebStorage').getLocalStorage(), m = h.create('channel'), n = 'channel_sub:', o = 7, p = 100 * 1000, q = null, r;

    function s() {
        if (r) {
            clearTimeout(r);
            r = null;
        }
        if (l && q != null)l.removeItem(n + q);
        q = null;
    }

    function t(u, v, w) {
        var x = (u - 1) * o;
        if (w) {
            if (r)clearTimeout(r);
            q = r = null;
        }
        if (v == null)v = Math.floor(Math.random() * x);
        if (q == null)if (l) {
            var y = [];
            for (var z = 0; z < l.length; z++) {
                var aa = l.key(z);
                if (aa.indexOf(n) === 0) {
                    var ba = parseInt(aa.substr(n.length), 10);
                    y[ba] = parseInt(l.getItem(aa), 10);
                }
            }
            var ca = Date.now() - p;
            for (z = 0; z < x; z++) {
                var da = (z + v) % x;
                if (!y[da] || y[da] < ca) {
                    q = da;
                    break;
                }
            }
            if (q != null) {
                var ea = function () {
                    try {
                        l.setItem(n + q, Date.now());
                    } catch (fa) {
                        k.warn('subdomain set failed', fa.message);
                    }
                    r = j(ea, p / 2);
                };
                ea();
            } else {
                k.warn('no channel subdomain', y);
                m.error('subdomain_overflow');
            }
            if (typeof window.onpageshow != 'undefined') {
                g.listen(window, 'pagehide', s);
            } else i.onUnload(s);
        } else q = v;
        return q == null ? null : q % o;
    }

    e.exports = {allocate: t, clear: s};
}, null);
__d("DocRPC", ["ErrorUtils"], function (a, b, c, d, e, f, g) {
    var h = {_apis: {}, _dispatch: function (i) {
        var j;
        try {
            i = JSON.parse(i);
        } catch (k) {
            throw new Error('DocRPC unparsable dispatch: "' + i + '"');
        }
        if (h._apis.hasOwnProperty(i.api)) {
            var l = h._apis[i.api];
            if (l[i.method])j = g.applyWithGuard(l[i.method], l, i.args);
        }
        if (j === undefined)j = null;
        return JSON.stringify(j);
    }, publish: function (i, j) {
        h._apis[j] = i;
    }, proxy: function (i, j, k) {
        var l = {};
        k.forEach(function (m) {
            l[m] = function () {
                var n = {api: j, method: m, args: Array.prototype.slice.call(arguments)}, o;
                try {
                    if (i.closed)throw new Error('DocRPC window closed');
                    o = i.DocRPC._dispatch(JSON.stringify(n));
                } catch (p) {
                    g.reportError(p);
                    return;
                }
                if (typeof(o) == 'string')try {
                    o = JSON.parse(o);
                } catch (p) {
                    throw new Error('DocRPC ' + j + '.' + m + ' unparsable return: "' + o + '"');
                }
                return o;
            };
        });
        return l;
    }};
    e.exports = a.DocRPC = h;
}, null);
__d("ChannelTransport", ["copyProperties", "bind", "AjaxRequest", "URI", "JSLogger", "DocRPC", "ChannelConstants", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = k.create('channel');

    function p() {
        return (1048576 * Math.random() | 0).toString(36);
    }

    function q(z, aa) {
        var ba = z.subdomain;
        ba = ba === null ? '' : (ba + '-');
        var ca = new j(aa).setDomain(ba + z.host + '.facebook.com').setPort(z.port).setSecure(j().isSecure());
        return ca;
    }

    function r(z) {
        var aa = {partition: z.partition, cb: p()};
        if (z.sticky_token)aa.sticky_token = z.sticky_token;
        var ba = q(z, '/p').setQueryData(aa);
        o.log('start_p', {uri: ba.toString()});
        var ca = new i('GET', ba);
        if (i.supportsCORS())ca.xhr.withCredentials = true;
        var da = function (ea) {
            o.log('finish_p', {xhr: ea.toJSON ? ea.toJSON() : ea});
        };
        ca.timeout = z.P_TIMEOUT;
        ca.onError = ca.onSuccess = da;
        ca.send();
    }

    function s(z, aa, ba) {
        var ca = new Image(), da = 0, ea = function (ha) {
            ca.abort();
            return ha ? aa() : ba();
        };
        ca.onload = function () {
            o.log('ping_ok', {duration: Date.now() - da});
            ea(true);
        };
        ca.onerror = function () {
            r(z);
            ea(false);
        };
        var fa = n(ca.onerror, 10000);
        ca.abort = function () {
            if (fa) {
                clearTimeout(fa);
                fa = null;
            }
            ca.onload = ca.onerror = null;
        };
        var ga = {partition: z.partition, cb: p()};
        if (z.sticky_token)ga.sticky_token = z.sticky_token;
        if (z.sticky_pool)ga.sticky_pool = z.sticky_pool;
        if (z.watchdog && z.watchdog.enabled)ga.wtc = z.watchdog.doSerialize();
        da = Date.now();
        ca.src = q(z, '/ping').setQueryData(ga);
        return ca;
    }

    function t(z) {
        var aa = {channel: z.user_channel, partition: z.partition, clientid: z.sessionID, cb: p(), cap: 0, uid: z.uid, viewer_uid: z.viewerUid};
        if (z.sticky_token)aa.sticky_token = z.sticky_token;
        if (z.sticky_pool)aa.sticky_pool = z.sticky_pool;
        if (z.is_offline) {
            if (!!z.send_active_when_offline) {
                aa.state = 'offline';
            } else return;
        } else aa.state = 'active';
        if (aa.state === z.lastPresenceState)return;
        z.lastPresenceState = aa.state;
        if (z.profile)aa.profile = z.profile;
        if (z.capabilities)aa.cap = z.capabilities;
        var ba = q(z, '/active_ping').setQueryData(aa), ca = new i('GET', ba);
        if (i.supportsCORS())ca.xhr.withCredentials = true;
        ca.onError = function (da) {
            o.warn('active_ping_error');
        };
        ca.onSuccess = function (da) {
            o.log('active_ping_ok');
        };
        ca.timeout = z.P_TIMEOUT;
        ca.send();
    }

    function u(z, aa, ba, ca) {
        var da = new Date(), ea = -1;
        if (z.userActive > 0) {
            ea = (da - z.userActive) / 1000 | 0;
            if (ea < 0)o.warn('idle_regression', {idleTime: ea, now: da.getTime(), userActive: z.userActive});
        }
        var fa = {channel: z.user_channel, seq: z.seq, partition: z.partition, clientid: z.sessionID, cb: p(), idle: ea, cap: 0};
        if (!!z.watchdog && z.watchdog.enabled)fa.wtc = z.watchdog.doSerialize();
        if (z.uid && z.viewerUid) {
            fa.uid = z.uid;
            fa.viewer_uid = z.viewerUid;
        }
        if (z.sticky_token)fa.sticky_token = z.sticky_token;
        if (z.sticky_pool)fa.sticky_pool = z.sticky_pool;
        if ('trace_id' in z)fa.traceid = z.trace_id;
        var ga = !!z.send_active_when_offline;
        if (ga && z.is_offline) {
            fa.state = 'offline';
        } else if (z.userActive > 0 && ea < 60)fa.state = 'active';
        z.lastPresenceState = fa.state;
        if (z.streamingCapable) {
            fa.mode = 'stream';
            fa.format = 'json';
        }
        if (z.profile)fa.profile = z.profile;
        if (z.capabilities)fa.cap = z.capabilities;
        var ha = q(z, '/pull').setQueryData(fa), ia = z.fantail_enabled ? 'POST' : 'GET', ja = new i(ia, ha);
        if (i.supportsCORS())ja.xhr.withCredentials = true;
        ja.timeout = z.streamingCapable ? z.STREAMING_TIMEOUT : z.LONGPOLL_TIMEOUT;
        ja.onJSON = aa;
        ja.onSuccess = ba;
        ja.onError = function () {
            var ma = (this.status == 12002 && this._time >= z.MIN_12002_TIMEOUT) || (this.status == 504 && this._time >= z.MIN_504_TIMEOUT), na = ma ? ba : ca;
            return na && na.apply(this, arguments);
        };
        if (z.fantail_logs && z.fantail_logs.length > 0) {
            var ka = {};
            for (var la = 0; la < z.fantail_logs.length; la++)g(ka, z.fantail_logs[la]);
            ja.send(ka);
            z.fantail_logs = [];
        } else ja.send();
        z.inStreaming = z.streamingCapable;
        return ja;
    }

    function v(z) {
        this.manager = z;
        (this.init && this.init());
    }

    function w(z) {
        v.apply(this, arguments);
    }

    g(w.prototype, {logName: 'CORS', enterState: function (z, aa) {
        if (this._request) {
            this._request.abort();
            this._request = null;
        }
        if (z == 'init')n(h(this.manager, 'exitState', {status: m.OK, stateId: aa.stateId}), 3000);
        if (!/pull|ping/.test(z))return;
        var ba = this.manager;
        if (z == 'ping') {
            this._request = s(aa, h(ba, 'exitState', {status: m.OK, stateId: aa.stateId}), h(ba, 'exitState', {status: m.ERROR, stateId: aa.stateId}));
        } else if (z == 'pull')this._request = u(aa, h(ba, '_processTransportData', aa.stateId), h(ba, 'exitState', {status: m.OK, stateId: aa.stateId}), h(ba, 'exitState', {status: m.ERROR, stateId: aa.stateId}));
    }});
    function x(z) {
        o.log('iframe_init_constructor');
        v.apply(this, arguments);
        this._iframe = document.createElement('iframe');
        this._iframe.style.display = 'none';
        document.body.appendChild(this._iframe);
        l.publish(this, 'outerTransport');
    }

    g(x.prototype, {logName: 'iframe', _initIframe: function (z) {
        o.log('iframe_init_start');
        window.onchanneliframeready = function () {
            o.log('iframe_resources');
            return z.resources;
        };
        window.onchanneliframeloaded = function () {
            o.log('iframe_loaded');
        };
        if (z) {
            this._iframeURI = q(z, z.path);
            if (z.bustIframe) {
                var aa = {partition: z.partition, cb: p()};
                this._iframeURI.setQueryData(aa);
            }
        } else this._iframeURI = 'about:blank';
        this._iframeProxy = null;
        try {
            this._iframe.contentWindow.location.replace(this._iframeURI);
            o.log('iframe_uri_set');
        } catch (ba) {
            o.error('iframe_uri_set_error', ba);
            this.exitState({status: m.ERROR, stateId: z.stateId}, ba + '');
        }
    }, enterState: function (z, aa) {
        if (z == 'init') {
            this._initIframe(aa);
        } else if (/idle|ping|pull/.test(z)) {
            if (this._iframeProxy) {
                this._iframeProxy.enterState.apply(this._iframeProxy, arguments);
            } else if (z != 'idle')this.exitState({status: m.ERROR, stateId: aa.stateId}, 'iframe not yet loaded');
        } else if (z == 'shutdown')this._initIframe();
    }, _processTransportData: function () {
        this.manager._processTransportData.apply(this.manager, arguments);
    }, exitState: function (z) {
        if (this.manager.state == 'init' && z.status == m.OK)this._iframeProxy = l.proxy(this._iframe.contentWindow, 'innerTransport', ['enterState'], (this._iframeURI + '').replace(/iframe.*/, ''));
        if (/ping|pull/.test(this.manager.state) && !this._iframeProxy)return;
        this.manager.exitState.apply(this.manager, arguments);
    }});
    function y() {
        this.init = this.init.bind(this);
        v.apply(this, arguments);
    }

    g(y.prototype, {logName: 'iframe(inner)', init: function () {
        l.publish(this, 'innerTransport');
        try {
            var aa = l.proxy(window.parent, 'outerTransport', ['_processTransportData', 'exitState'], top.DocRPC.origin);
            g(this, aa);
            this.exitState({status: m.OK, stateId: 1e+06});
        } catch (z) {
            o.error('iframe_inner_init_error', z);
        }
    }, enterState: function (z, aa) {
        if (this._request) {
            this._request.abort();
            this._request = null;
        }
        if (z == 'ping') {
            this._request = s(aa, h(this, 'exitState', {status: m.OK, stateId: aa.stateId}), h(this, 'exitState', {status: m.ERROR, stateId: aa.stateId}));
        } else if (z == 'pull')this._request = u(aa, h(this, '_processTransportData', aa.stateId), h(this, 'exitState', {status: m.OK, stateId: aa.stateId}), h(this, 'exitState', {status: m.ERROR, stateId: aa.stateId}));
    }});
    e.exports = {getURI: q, Transport: v, CORSTransport: w, IframeTransport: x, IframeInnerTransport: y, sendActivePing: t};
}, null);
__d("PresencePrivacy", ["Arbiter", "AsyncRequest", "ChannelConstants", "CurrentUser", "PresencePrivacyInitialData", "JSLogger", "PresenceUtil", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = '/ajax/chat/privacy/settings.php', p = '/ajax/chat/privacy/online_policy.php', q = '/ajax/chat/privacy/visibility.php', r = 'friend_visibility', s = 'visibility', t = 'online_policy', u = n({}, k.privacyData), v = k.visibility, w = n({}, k.privacyData), x = v, y = k.onlinePolicy, z = y, aa = [], ba = false;

    function ca() {
        return l.create('blackbird');
    }

    var da = n(new g(), {WHITELISTED: 1, BLACKLISTED: -1, UNLISTED: 0, ONLINE: 1, OFFLINE: 0, ONLINE_TO_WHITELIST: 0, ONLINE_TO_BLACKLIST: 1});

    function ea(qa) {
        var ra;
        for (ra in qa) {
            var sa = qa[ra];
            if (ra == j.getID()) {
                ca().error('set_viewer_visibility');
                throw new Error("Invalid to set current user's visibility");
            }
            switch (sa) {
                case da.WHITELISTED:
                case da.BLACKLISTED:
                case da.UNLISTED:
                    break;
                default:
                    ca().error('set_invalid_friend_visibility', {id: ra, value: sa});
                    throw new Error("Invalid state: " + sa);
            }
        }
        for (ra in qa)u[ra] = qa[ra];
        da.inform('privacy-changed');
    }

    function fa(qa, ra) {
        var sa = {};
        sa[qa] = ra;
        ea(sa);
    }

    function ga(qa) {
        switch (qa) {
            case da.ONLINE:
            case da.OFFLINE:
                break;
            default:
                ca().error('set_invalid_visibility', {value: qa});
                throw new Error("Invalid visibility: " + qa);
        }
        v = qa;
        da.inform('privacy-changed');
        da.inform('privacy-user-presence-changed');
        g.inform('chat/visibility-changed', {sender: this});
    }

    function ha(qa) {
        switch (qa) {
            case da.ONLINE_TO_WHITELIST:
            case da.ONLINE_TO_BLACKLIST:
                break;
            default:
                throw new Error("Invalid default online policy: " + qa);
        }
        y = qa;
        da.inform('privacy-user-presence-changed');
        da.inform('privacy-changed');
    }

    function ia(qa, ra) {
        ba = true;
        qa.send();
    }

    function ja(qa, ra) {
        aa.push({request: qa, data: ra});
        if (!ba) {
            var sa = aa.shift();
            ia(sa.request, sa.data);
        }
    }

    function ka(qa, ra) {
        var sa = qa.type;
        if (sa === r) {
            var ta = ra.payload.user_availabilities;
            if (!Array.isArray(ta)) {
                da.inform('privacy-availability-changed', {user_availabilities: ta});
                for (var ua in qa.settings)w[ua] = qa.settings[ua];
            }
        } else {
            if (sa === s) {
                x = qa.visibility;
            } else if (sa === t)z = qa.online_policy;
            da.inform('privacy-user-presence-response');
        }
        ca().log('set_update_response', {data: qa, response: ra});
    }

    function la(qa, ra) {
        if (v !== x)ga(x);
        if (y !== z)ha(z);
        n(u, w);
        da.inform('privacy-changed');
        aa = [];
        ca().log('set_error_response', {data: qa, response: ra});
    }

    function ma(qa) {
        ba = false;
        if (aa.length > 0) {
            var ra = aa.shift();
            ia(ra.request, ra.data);
        }
    }

    function na(qa, ra) {
        if (m != null) {
            var sa = qa.getData();
            sa.window_id = m.getSessionID();
            qa.setData(sa);
        }
        qa.setHandler(ka.bind(this, ra)).setErrorHandler(la.bind(this, ra)).setTransportErrorHandler(la.bind(this, ra)).setFinallyHandler(ma.bind(this)).setAllowCrossPageTransition(true);
        return qa;
    }

    function oa(qa, ra, sa) {
        return na(new h(qa).setData(ra), sa);
    }

    function pa(qa, ra) {
        var sa = ra.obj;
        if (sa.viewer_id != j.getID()) {
            ca().error('invalid_viewer_for_channel_message', {type: qa, data: ra});
            throw new Error("Viewer got from the channel is not the real viewer");
        }
        if (sa.window_id === m.getSessionID())return;
        var ta = sa.data;
        if (sa.event == 'access_control_entry') {
            ta.target_ids.forEach(function (va) {
                fa(va, ta.setting);
                w[va] = ta.setting;
            });
        } else {
            if (sa.event == 'visibility_update') {
                var ua = !!ta.visibility ? da.ONLINE : da.OFFLINE;
                ga(ua);
                x = ua;
            } else if (sa.event == 'online_policy_update') {
                ha(ta.online_policy);
                z = ta.online_policy;
            }
            da.inform('privacy-user-presence-response');
        }
        ca().log('channel_message_received', {data: ra.obj});
    }

    n(da, {WHITELISTED: 1, BLACKLISTED: -1, UNLISTED: 0, ONLINE: 1, OFFLINE: 0, ONLINE_TO_WHITELIST: 0, ONLINE_TO_BLACKLIST: 1, init: function (qa, ra, sa) {
    }, setVisibility: function (qa) {
        x = v;
        ga(qa);
        var ra = {visibility: qa}, sa = {type: s, visibility: qa}, ta = oa(q, ra, sa);
        ja(ta, sa);
        ca().log('set_visibility', {data: ra});
        return qa;
    }, getVisibility: function () {
        return v;
    }, setOnlinePolicy: function (qa) {
        z = y;
        ha(qa);
        var ra = {online_policy: qa}, sa = {type: t, online_policy: qa}, ta = oa(p, ra, sa);
        ja(ta, sa);
        ca().log('set_online_policy', {data: ra});
        return qa;
    }, getOnlinePolicy: function () {
        return y;
    }, getFriendVisibility: function (qa) {
        return u[qa] || da.UNLISTED;
    }, allows: function (qa) {
        if (this.getVisibility() === da.OFFLINE)return false;
        var ra = this.getOnlinePolicy();
        return ra === da.ONLINE_TO_WHITELIST ? u[qa] == da.WHITELISTED : u[qa] != da.BLACKLISTED;
    }, setFriendsVisibility: function (qa, ra) {
        if (qa.length > 0) {
            var sa = {};
            for (var ta = 0; ta < qa.length; ta++) {
                var ua = qa[ta];
                w[ua] = u[ua];
                sa[ua] = ra;
            }
            ea(sa);
            var va = ra;
            if (va == da.UNLISTED)va = w[qa[0]];
            var wa = {users: qa, setting: ra, setting_type: va}, xa = {type: r, settings: sa}, ya = oa(o, wa, xa);
            ja(ya, xa);
            ca().log('set_friend_visibility', {data: wa});
        }
        return ra;
    }, setFriendVisibilityMap: function (qa, ra) {
        for (var sa in qa)w[sa] = u[sa];
        ea(qa);
        var ta = {type: r, settings: qa};
        ja(na(ra, ta), ta);
        ca().log('set_friend_visibility_from_map', {data: qa});
    }, allow: function (qa) {
        if (this.allows(qa)) {
            ca().error('allow_already_allowed');
            throw new Error("allow() should only be called for users that " + "are not already allowed");
        }
        if (this.getVisibility() === da.OFFLINE) {
            ca().error('allow_called_while_offline');
            throw new Error("allow() should only be called when the user is already online");
        }
        var ra = this.getOnlinePolicy() === da.ONLINE_TO_WHITELIST ? da.WHITELISTED : da.UNLISTED;
        return this.setFriendsVisibility([qa], ra);
    }, disallow: function (qa) {
        if (!this.allows(qa)) {
            ca().error('disallow_already_disallowed');
            throw new Error("disallow() should only be called for users that " + "are not already disallowed");
        }
        if (this.getVisibility() === da.OFFLINE) {
            ca().error('disallow_called_while_offline');
            throw new Error("disallow() should only be called when the user is already online");
        }
        var ra = this.getOnlinePolicy() === da.ONLINE_TO_BLACKLIST ? da.BLACKLISTED : da.UNLISTED;
        return this.setFriendsVisibility([qa], ra);
    }, getBlacklist: function () {
        var qa = [];
        for (var ra in u)if (u[ra] === da.BLACKLISTED)qa.push(ra);
        return qa;
    }, getWhitelist: function () {
        var qa = [];
        for (var ra in u)if (u[ra] === da.WHITELISTED)qa.push(ra);
        return qa;
    }, getMapForTest: function () {
        return u;
    }, setMapForTest: function (qa) {
        u = qa;
    }});
    da.inform('privacy-changed');
    da.inform('privacy-user-presence-changed');
    ca().log('initialized', {visibility: v, policy: y});
    g.subscribe(i.getArbiterType('privacy_changed'), pa.bind(this));
    g.subscribe(i.ON_CONFIG, function (qa, ra) {
        var sa = ra.getConfig('visibility', null);
        if (sa !== null && typeof(sa) !== 'undefined') {
            var ta = sa ? da.ONLINE : da.OFFLINE;
            ga(ta);
            ca().log('config_visibility', {vis: ta});
        }
    }.bind(this));
    a.PresencePrivacy = e.exports = da;
}, 3);
__d("ChatVisibility", ["Arbiter", "JSLogger", "PresencePrivacy"], function (a, b, c, d, e, f, g, h, i) {
    var j = {isOnline: function () {
        return i.getVisibility() === i.ONLINE;
    }, hasBlackbirdEnabled: function () {
        return this.isVisibleToMostFriends() || this.isVisibleToSomeFriends();
    }, isVisibleToMostFriends: function () {
        return i.getOnlinePolicy() === i.ONLINE_TO_BLACKLIST && i.getBlacklist().length > 0;
    }, isVisibleToSomeFriends: function () {
        return i.getOnlinePolicy() === i.ONLINE_TO_WHITELIST && i.getWhitelist().length > 0;
    }, goOnline: function (k) {
        if (i.getVisibility() === i.OFFLINE) {
            h.create('blackbird').log('chat_go_online');
            i.setVisibility(i.ONLINE);
            g.inform('chat-visibility/go-online');
        }
        k && k();
    }, goOffline: function (k) {
        if (i.getVisibility() === i.ONLINE) {
            h.create('blackbird').log('chat_go_offline');
            i.setVisibility(i.OFFLINE);
            g.inform('chat-visibility/go-offline');
        }
        k && k();
    }, toggleVisibility: function () {
        if (j.isOnline()) {
            j.goOffline();
        } else j.goOnline();
    }};
    a.ChatVisibility = e.exports = j;
}, 3);
__d("MovingStat", [], function (a, b, c, d, e, f) {
    function g(h) {
        h = h || 60000;
        var i = {t: new Date(), count: 0, v: 0}, j = i, k = 0, l = 0;

        function m() {
            var n = new Date() - h;
            while (j && j.next && j.t < n) {
                k -= j.v;
                l -= j.count;
                j = j.next;
            }
        }

        this.add = function (n) {
            k += n;
            l++;
            var o = new Date();
            if (o - i.t < 1000) {
                i.v += n;
                i.count++;
            } else {
                i.next = {t: o, v: n, count: 1};
                i = i.next;
                m();
            }
        };
        this.tally = function (n) {
            n = n || 1000;
            m();
            return {sum: k, count: l, timeAverage: k * n / h};
        };
    }

    e.exports = g;
}, null);
__d("Dcode", [], function (a, b, c, d, e, f) {
    var g, h = {}, i = {_: '%', A: '%2', B: '000', C: '%7d', D: '%7b%22', E: '%2c%22', F: '%22%3a', G: '%2c%22ut%22%3a1', H: '%2c%22bls%22%3a', I: '%2c%22n%22%3a%22%', J: '%22%3a%7b%22i%22%3a0%7d', K: '%2c%22pt%22%3a0%2c%22vis%22%3a', L: '%2c%22ch%22%3a%7b%22h%22%3a%22', M: '%7b%22v%22%3a2%2c%22time%22%3a1', N: '.channel%22%2c%22sub%22%3a%5b', O: '%2c%22sb%22%3a1%2c%22t%22%3a%5b', P: '%2c%22ud%22%3a100%2c%22lc%22%3a0', Q: '%5d%2c%22f%22%3anull%2c%22uct%22%3a', R: '.channel%22%2c%22sub%22%3a%5b1%5d', S: '%22%2c%22m%22%3a0%7d%2c%7b%22i%22%3a', T: '%2c%22blc%22%3a1%2c%22snd%22%3a1%2c%22ct%22%3a', U: '%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a', V: '%2c%22blc%22%3a0%2c%22snd%22%3a0%2c%22ct%22%3a', W: '%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a', X: '%2c%22ri%22%3a0%7d%2c%22state%22%3a%7b%22p%22%3a0%2c%22ut%22%3a1', Y: '%2c%22pt%22%3a0%2c%22vis%22%3a1%2c%22bls%22%3a0%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a', Z: '%2c%22sb%22%3a1%2c%22t%22%3a%5b%5d%2c%22f%22%3anull%2c%22uct%22%3a0%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a'};
    (function () {
        var k = [];
        for (var l in i) {
            h[i[l]] = l;
            k.push(i[l]);
        }
        k.reverse();
        g = new RegExp(k.join("|"), 'g');
    })();
    var j = {encode: function (k) {
        return encodeURIComponent(k).replace(/([_A-Z])|%../g,function (l, m) {
            return m ? '%' + m.charCodeAt(0).toString(16) : l;
        }).toLowerCase().replace(g, function (l) {
            return h[l];
        });
    }, decode: function (k) {
        return decodeURIComponent(k.replace(/[_A-Z]/g, function (l) {
            return i[l];
        }));
    }};
    e.exports = j;
}, null);
__d("PresenceCookieManager", ["Cookie", "CurrentUser", "Dcode", "ErrorUtils", "JSLogger", "PresenceInitialData", "PresenceUtil", "URI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = l.cookieVersion, p = l.dictEncode, q = 'presence', r = {}, s = null, t = null, u = k.create('presence_cookie');

    function v() {
        try {
            var z = g.get(q);
            if (s !== z) {
                s = z;
                t = null;
                if (z && z.charAt(0) == 'E')z = i.decode(z.substring(1));
                if (z)t = JSON.parse(z);
            }
            if (t && (!t.user || t.user === h.getID()))return t;
        } catch (y) {
            u.warn('getcookie_error', y);
        }
        return null;
    }

    function w() {
        return parseInt(Date.now() / 1000, 10);
    }

    var x = {register: function (y, z) {
        r[y] = z;
    }, store: function () {
        var y = v();
        if (y && y.v && o < y.v) {
            u.debug('stale_cookie', o);
            return;
        }
        var z = {v: o, time: w(), user: h.getID()};
        for (var aa in r)z[aa] = j.applyWithGuard(r[aa], r, [y && y[aa]], function (ea) {
            ea.presence_subcookie = aa;
        });
        var ba = JSON.stringify(z);
        if (p)ba = 'E' + i.encode(ba);
        if (m.hasUserCookie()) {
            var ca = ba.length;
            if (ca > 1024)u.warn('big_cookie', ca);
            var da = n.getRequestURI(false).isSecure() && !!g.get('csm');
            g.set(q, ba, null, null, da);
        }
    }, clear: function () {
        g.clear(q);
    }, getSubCookie: function (y) {
        var z = v();
        if (!z)return null;
        return z[y];
    }};
    e.exports = x;
}, null);
__d("PresenceState", ["Arbiter", "ErrorUtils", "JSLogger", "PresenceCookieManager", "copyProperties", "debounceAcrossTransitions", "setIntervalAcrossTransitions", "PresenceInitialData"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = n.cookiePollInterval || 2000, p = [], q = [], r = null, s = null, t = 0, u = null, v = 0, w = ['sb2', 't2', 'lm2', 'uct2', 'tr', 'tw', 'at', 'wml'], x = i.create('presence_state');

    function y() {
        return j.getSubCookie('state');
    }

    function z() {
        t = Date.now();
        j.store();
        da(s);
    }

    var aa = l(z, 0);

    function ba(ia) {
        if (typeof ia == 'undefined' || isNaN(ia) || ia == Number.POSITIVE_INFINITY || ia == Number.NEGATIVE_INFINITY)ia = 0;
        return ia;
    }

    function ca(ia) {
        var ja = {};
        if (ia) {
            w.forEach(function (ma) {
                ja[ma] = ia[ma];
            });
            if (t < ia.ut)x.error('new_cookie', {cookie_time: ia.ut, local_time: t});
        }
        ja.ut = t;
        for (var ka = 0, la = p.length; ka < la; ka++)h.applyWithGuard(p[ka], null, [ja]);
        s = ja;
        return s;
    }

    function da(ia) {
        v++;
        t = ba(ia.ut);
        if (!r)r = m(ga, o);
        s = ia;
        if (u === null)u = ia;
        for (var ja = 0, ka = q.length; ja < ka; ja++)h.applyWithGuard(q[ja], null, [ia]);
        v--;
    }

    function ea(ia) {
        if (ia && ia.ut)if (t < ia.ut) {
            return true;
        } else if (ia.ut < t)x.error('old_cookie', {cookie_time: ia.ut, local_time: t});
        return false;
    }

    function fa() {
        var ia = y();
        if (ea(ia))s = ia;
        return s;
    }

    function ga() {
        var ia = y();
        if (ea(ia))da(ia);
    }

    j.register('state', ca);
    g.subscribe(i.DUMP_EVENT, function (ia, ja) {
        ja.presence_state = {initial: k({}, u), state: k({}, s), update_time: t, sync_paused: v, poll_time: o};
    });
    (function () {
        var ia = fa();
        if (ia) {
            da(ia);
        } else {
            x.debug('no_cookie_initial');
            da(ca());
            return;
        }
    })();
    var ha = {doSync: function (ia) {
        if (v)return;
        if (ia) {
            z();
        } else aa();
    }, registerStateStorer: function (ia) {
        p.push(ia);
    }, registerStateLoader: function (ia) {
        q.push(ia);
    }, get: function () {
        return fa();
    }, getInitial: function () {
        return u;
    }, verifyNumber: ba};
    e.exports = ha;
}, null);
__d("ActiveXSupport", ["UserAgent_DEPRECATED"], function (a, b, c, d, e, f, g) {
    var h = null, i = {isSupported: function () {
        if (h !== null)return h;
        try {
            if (g.ie() >= 11) {
                h = !!new ActiveXObject("htmlfile");
            } else h = !!window.ActiveXObject && !!new ActiveXObject("htmlfile");
        } catch (j) {
            h = false;
        }
        return h;
    }};
    e.exports = i;
}, null);
__d("VideoCallSupport", ["ActiveXSupport", "ChannelConstants", "MercuryConfig", "UserAgent_DEPRECATED"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = {isSendWebrtcSupported: function () {
        return i.SendNewVCGK && n();
    }, isReceiveWebrtcSupported: function () {
        return i.ReceiveNewVCGK && n();
    }, isVideoCallSupported: function () {
        if (k.isSendWebrtcSupported())return true;
        if (j.windows()) {
            if (j.ie() >= 9 && !j.ie64()) {
                return g.isSupported();
            } else return (j.ie() >= 7 && !j.ie64()) || j.firefox() >= 3.6 || j.chrome() >= 5 || j.opera() >= 12;
        } else if (j.osx() > 10.5)return (j.firefox() >= 3.6 || j.chrome() >= 5 || j.webkit() >= 500 || j.opera() >= 12);
        return false;
    }, isPluginInstalled: function (o) {
        if (o === 'undefined')o = true;
        var p = false;
        if (k.isVideoCallSupported())if (l()) {
            var q = null;
            try {
                q = new ActiveXObject('SkypeLimited.SkypeWebPlugin');
                p = !!q;
            } catch (r) {
            }
            q = null;
        } else p = m(o);
        return p;
    }, getCapabilities: function () {
        var o = 0;
        if (k.isPluginInstalled(false))o = o | h.CAPABILITY_SKYPE;
        if (k.isReceiveWebrtcSupported())o = o | h.CAPABILITY_VOIP_INTEROP;
        return o;
    }};

    function l() {
        return j.ie() && j.windows() && !j.opera();
    }

    function m(o) {
        if (!navigator)return null;
        if (o)navigator.plugins.refresh(false);
        var p = navigator.mimeTypes['application/skypesdk-plugin'];
        return p && p.enabledPlugin;
    }

    function n() {
        return (j.chrome() >= 24 || j.firefox() >= 22);
    }

    e.exports = k;
}, null);
__d("ChannelManager", ["AjaxRequest", "Arbiter", "AsyncRequest", "ChannelConstants", "ChannelInitialData", "ChannelSubdomain", "ChannelTransport", "ChatVisibility", "DTSG", "Env", "FBAjaxRequest", "ISB", "JSLogger", "MessagingRealtimeConstants", "MovingStat", "PresenceCookieManager", "PresenceState", "PresenceUtil", "SystemEvents", "URI", "UserActivity", "VideoCallSupport", "copyProperties", "createArrayFrom", "setIntervalAcrossTransitions", "setTimeoutAcrossTransitions", "WebStorage"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa) {
    var ga = b('WebStorage').getSessionStorage(), ha = 'chproxy_base_sess', ia, ja = s.create('channel'), ka = null;

    function la(xa) {
        ka = xa;
    }

    var ma = {idle: {ok: 'init!'}, init: {ok: 'pull!', error: 'reconnect', sys_online: 'init', sys_timetravel: 'init'}, pull: {ok: 'pull!', error: 'ping', error_missing: 'pull', error_msg_type: 'pull', refresh_0: 'reconnect', refresh_110: 'reconnect', refresh_111: 'reconnect', refresh_112: 'pull', refresh_113: 'pull', refresh_117: 'reconnect'}, ping: {ok: 'pull!', error: 'ping', error_stale: 'reconnect!'}, reconnect: {ok: 'init!', error: 'reconnect', sys_online: 'reconnect', sys_timetravel: 'reconnect'}, shutdown: {}, _all: {error_max: 'shutdown!', error_shutdown: 'shutdown!', sys_owner: 'reconnect', sys_nonowner: 'idle!', sys_online: 'ping', sys_offline: 'idle!', sys_timetravel: 'ping'}}, na = {reconnectOverrideTimeMillis: Date.now(), userActive: Date.now(), lastPresenceState: null, fantail_logs: [], sessionID: (Math.random() * 2147483648 | 0).toString(16), capabilities: ba.getCapabilities(), streamingCapable: false, inStreaming: false, LONGPOLL_TIMEOUT: 60000, STREAMING_TIMEOUT: 60000, P_TIMEOUT: 30000, IFRAME_LOAD_TIMEOUT: 30000, MIN_RETRY_INTERVAL: 5000, MAX_RETRY_INTERVAL: 320000, MIN_12002_TIMEOUT: 9000, MIN_504_TIMEOUT: 20000, STALL_THRESHOLD: 180000, JUMPSTART_THRESHOLD: 90000, MIN_INIT_PROBE_DELAY: 3000, INIT_PROBE_DELAY_RANDOMIZE_RANGE: 12000, CHANNEL_PROXY_REPORTING_MIN_INTERVAL: 10000, PROBE_DELAY: 60000, PROBE_HEARTBEATS_INTERVAL_LOW: 1000, PROBE_HEARTBEATS_INTERVAL_HIGH: 5000, STREAMING_EXIT_STATE_ON_CONTINUE: false, FANTAIL_QUEUE_CAPACITY: 50}, oa = {MAX_CONTINUOUS_PULL_FAILS: 3, enabled: false, startTimeMillis: Date.now(), accumulatedPullTimeMillis: 0, pullStartTimeMillis: 0, pingCount: 0, pullCount: 0, continuousPullFails: 0, initialized: false, getUptimeSeconds: function () {
        return (Date.now() - this.startTimeMillis) / 1000;
    }, getAccumulatedPullTimeSeconds: function () {
        var xa = this.accumulatedPullTimeMillis, ya = Date.now();
        if (this.pullStartTimeMillis > 0 && ya - this.pullStartTimeMillis <= na.LONGPOLL_TIMEOUT)xa += (ya - this.pullStartTimeMillis);
        var za = xa / 1000;
        if (za >= this.getUptimeSeconds()) {
            this.accumulatedPullTimeMillis = 0;
            this.startTimeMillis = ya;
        }
        return za;
    }, getPingToPullRatio: function () {
        return this.pullCount === 0 ? 0 : this.pingCount / this.pullCount;
    }, reportPullSent: function () {
        if (!this.enabled)return;
        if (!this.initialized) {
            this.startTimeMillis = Date.now();
            this.initialized = true;
        }
        this.pullStartTimeMillis = Date.now();
    }, reportPullReturned: function (xa, ya) {
        if (!this.enabled)return;
        if (this.pullStartTimeMillis > 0) {
            var za = Date.now() - this.pullStartTimeMillis;
            if (za <= na.LONGPOLL_TIMEOUT) {
                this.accumulatedPullTimeMillis += za;
            } else {
                this.accumulatedPullTimeMillis = 0;
                this.startTimeMillis = Date.now();
            }
            if (xa) {
                this.pullCount++;
                this.continuousPullFails = 0;
            } else this.continuousPullFails++;
        }
        if (this.continuousPullFails >= this.MAX_CONTINUOUS_PULL_FAILS) {
            wa();
            ya.backoff = true;
        }
        this.pullStartTimeMillis = 0;
    }, reportPingSent: function () {
        if (!this.enabled)return;
        this.pingCount++;
    }, transportEnteredState: function (xa) {
        if (!this.enabled)return;
        if (xa.indexOf('pull') === 0) {
            this.reportPullSent();
        } else if (xa.indexOf('ping') === 0)this.reportPingSent();
    }, doSerialize: function () {
        if (!this.enabled)return "";
        return (this.getUptimeSeconds()).toFixed(0) + ',' + (this.getAccumulatedPullTimeSeconds()).toFixed(0) + ',' + (this.getPingToPullRatio()).toFixed(2);
    }}, pa = 1, qa = {}, ra = 0;

    function sa() {
        return i.lastSuccessTime ? Math.round((Date.now() - i.lastSuccessTime) / 1000) : -1;
    }

    function ta() {
        var xa = {};
        if (ia.getConfig('host'))xa[ia.getConfig('user_channel')] = ia.getConfig('seq', 0);
        return xa;
    }

    function ua() {
        var xa = Date.now(), ya = Date.now(), za = {total: 0}, ab = 'idle', bb = false;
        y.subscribe([y.USER, y.ONLINE, y.TIME_TRAVEL], function (eb, fb) {
            wa(true);
            ya = null;
            ia.lastPullTime = Date.now();
            var gb;
            switch (eb) {
                case y.USER:
                    gb = y.isPageOwner() ? j.SYS_OWNER : j.SYS_NONOWNER;
                    break;
                case y.ONLINE:
                    gb = fb ? j.SYS_ONLINE : j.SYS_OFFLINE;
                    break;
                case y.TIME_TRAVEL:
                    gb = j.SYS_TIMETRAVEL;
                    break;
            }
            ia.exitState({status: gb, stateId: pa});
        });
        var cb = function (eb, fb) {
            var gb = Date.now(), hb;
            if (fb) {
                xa = gb;
                hb = fb.nextState || fb.state;
            } else hb = ab;
            y.checkTimeTravel();
            if (ya) {
                var ib = Math.round((gb - ya) / 1000);
                if (ib > 0) {
                    za[ab] = (za[ab] || 0) + ib;
                    za.total += ib;
                }
            }
            ab = hb;
            ya = gb;
            if (!eb) {
                za.lastSuccessTime = sa();
                za.online = y.isOnline();
                ja.log('rollup', za);
            }
        };
        h.subscribe(j.ON_ENTER_STATE, cb);
        ea(cb, 60000);
        h.subscribe(s.DUMP_EVENT, function (eb, fb) {
            fb.channelRollup = za;
        });
        var db = function () {
            if (ia.isShutdown() || ia.shouldIdle())return;
            y.checkTimeTravel();
            var eb = Date.now() - (ia.lastPullTime || p.start);
            if (!bb && eb > na.STALL_THRESHOLD) {
                var fb = sa();
                ja.error('stall', {lastSuccessTime: fb, rollupState: ab});
                bb = true;
            }
            var gb = Date.now() - xa;
            if (ia.state == 'pull' && gb > na.JUMPSTART_THRESHOLD) {
                xa = null;
                ja.warn('jumpstart', {state: ia.state, dormant: gb});
                ia.enterState('init');
            }
        };
        ea(db, 10000);
    }

    function va() {
        var xa = Date.now(), ya = 1;

        function za() {
            fa(za, ya * 1000);
            var eb = ia.state;
            if (eb == 'idle' && ia.shouldIdle())return;
            ja.bump('conn_t', ya);
            if (eb == 'pull')ja.bump('conn_t_pull', ya);
        }

        za();
        var ab = [15, 30, 60, 120, 240], bb = false, cb = false;

        function db(eb) {
            fa(function () {
                ja.rate('pullenter_' + eb, bb);
                ja.rate('pullexit_' + eb, cb);
            }, eb * 1000);
        }

        while (ab.length)db(ab.shift());
        h.subscribe(j.ON_ENTER_STATE, function (eb, fb) {
            if (fb.state == 'pull')bb = true;
            xa = Date.now();
        });
        h.subscribe(j.ON_EXIT_STATE, function (eb, fb) {
            if (fb.state != 'pull' || !xa)return;
            var gb = 'other';
            if (fb.status == j.OK) {
                cb = true;
                gb = 'ok';
            } else if (fb.xhr && fb.xhr.errorType) {
                gb = /ar:(\w+)/.test(fb.xhr.errorType) && RegExp.$1;
            } else if (/^sys_/.test(fb.status))return;
            var hb = (Date.now() - xa) / 1000;
            if (hb < 0) {
                return;
            } else if (hb > 3600)hb = 3600;
            ja.bump('conn_num');
            ja.bump('conn_exit', hb);
            ja.bump('conn_num_' + gb);
            ja.bump('conn_exit_' + gb, hb);
        });
    }

    function wa(xa) {
        if (xa) {
            ra = 0;
            qa = {};
        } else ra++;
    }

    ia = {state: 'idle', nextState: null, lastPullTime: Date.now(), lastReportOnMisguidedMsgTime: Date.now(), heartbeats: [], setTestCallback: la, backoff: false, init: function (xa) {
        this.init = function () {
        };
        this._logFantail('client initialized', j.FANTAIL_INFO);
        var ya = !!na.use_sticky_session, za = null;
        if (ya && ga) {
            for (var ab = 0; ab < ga.length; ab++) {
                var bb = ga.key(ab);
                if (bb.indexOf(ha) === 0) {
                    za = ga.getItem(bb);
                    break;
                }
            }
            if (!za) {
                za = na.sessionID;
                ga.setItem(ha, za);
            }
        }
        var cb = !!na.send_active_when_offline;
        if (!cb && !n.isOnline())na.userActive = 0;
        oa.enabled = !!na.watchdog_enabled;
        na.watchdog = oa;
        if (typeof(aa) != 'undefined') {
            aa.subscribe(function () {
                if (cb || n.isOnline())na.userActive = Date.now();
                if (!!na.web_sends_active_ping)m.sendActivePing(na);
            }.bind(this));
        } else ja.error('user_activity_undefined');
        v.register('ch', ta);
        var db = this.getConfig('max_conn', 2);
        na.subdomain = l.allocate(db);
        if (za && za.length && za.trim())na.sessionID = za;
        this._logFantail('using session id: ' + na.sessionID, j.FANTAIL_INFO);
        this._transportRate = new u(30000);
        var eb = (g.supportsCORS() && !na.forceIframe) ? 'CORSTransport' : 'IframeTransport';
        this.transport = new m[eb](this);
        if (xa)this.enterState.apply(this, arguments);
        h.subscribe(s.DUMP_EVENT, function (event, gb) {
            gb.transportRate = this._transportRate.tally();
            gb.transportType = eb;
            gb.transportVersion = 2;
        }.bind(this));
        ua();
        va();
        if (ia.getConfig('tryStreaming') && ia.getConfig('host') && g.supportsCORS() && !na.forceIframe) {
            var fb = na.MIN_INIT_PROBE_DELAY + Math.random() * na.INIT_PROBE_DELAY_RANDOMIZE_RANGE;
            fa(this._probeTest, fb);
        }
    }, configure: function () {
        var xa = da(arguments);
        ja.log('configure', xa);
        xa.forEach(ca.bind(null, na));
        h.inform(j.ON_CONFIG, this);
    }, getConfig: function (xa, ya) {
        return xa in na ? na[xa] : ya;
    }, getWatchdog: function () {
        return oa;
    }, isShutdown: function () {
        return this.state == 'shutdown';
    }, shouldIdle: function () {
        return !(y.isPageOwner() && y.isOnline());
    }, _sendIframeError: function (xa) {
        var ya = new i().setURI('/ajax/presence/reconnect.php').setData({reason: xa, fb_dtsg: o.getToken()}).setOption('suppressErrorHandlerWarning', true).setOption('retries', 1).setMethod('GET').setReadOnly(true).setAllowCrossPageTransition(true);
        ya.specifiesWriteRequiredParams() && ya.send();
    }, _getDelay: function () {
        var xa = Math.min(na.MIN_RETRY_INTERVAL * Math.pow(2, Math.max(0, ra - 1)), na.MAX_RETRY_INTERVAL);
        return Math.floor(xa * (1 + Math.random() * .5));
    }, enterState: function () {
        if (this._inEnterState)ja.warn('enterstate_recursion');
        this._inEnterState = true;
        try {
            this._enterState.apply(this, arguments);
            this._inEnterState = false;
        } catch (xa) {
            this._inEnterState = false;
            throw xa;
        }
    }, _enterState: function (xa) {
        if ((xa.indexOf('pull') === 0 || xa.indexOf('ping') === 0 || xa.indexOf('shutdown') === 0) && !!na.active_config_refresh) {
            var ya = Date.now(), za = (ya - na.reconnectOverrideTimeMillis) / 1000;
            if ('config_refresh_seconds' in na && na.config_refresh_seconds > 0 && za > na.config_refresh_seconds) {
                xa = 'reconnect';
                this._logFantail('forcing reconnect to refresh config' + ' - this is normal behavior', j.FANTAIL_DEBUG);
            }
        }
        if (xa.indexOf('reconnect') === 0)na.reconnectOverrideTimeMillis = Date.now();
        var ab = this.backoff ? this._getDelay() : 0;
        this.backoff = false;
        var bb = da(arguments);
        if (this.isShutdown()) {
            this._logFantail('not executing state due to shutdown mode: ' + xa, j.FANTAIL_WARN);
            return;
        }
        if (xa != 'idle!' && this.shouldIdle()) {
            this._logFantail('forced idleness', j.FANTAIL_WARN);
            return;
        }
        pa++;
        na.stateId = pa;
        clearTimeout(this._deferredTransition);
        this._deferredTransition = null;
        this.transport.enterState('idle');
        this.state = 'idle';
        this.nextState = null;
        if (/!$/.test(xa)) {
            var cb = this._transportRate.tally().timeAverage, db = ia.getConfig('MAX_CHANNEL_STATES_PER_SEC', 1);
            if (cb >= db) {
                if (!this._throttled) {
                    this._throttled = true;
                    ja.warn('throttled');
                }
                ja.bump('throttle');
                ab = 1000 / db;
            }
        } else if (!(/#$/.test(xa)))ab = this._getDelay();
        xa = xa.replace(/\W*$/, '');
        if (!ma[xa]) {
            this._logFantail('invalid state: ' + xa, j.FANTAIL_ERROR);
            throw new Error('invalid state:' + xa);
        }
        var eb;
        if (ab <= 0) {
            eb = {state: xa};
            this._transportRate.add(1);
            this.state = xa;
            var fb = this['_enter_' + this.state];
            if (fb) {
                bb.shift();
                fb.apply(this, bb);
            }
            if (/init|idle|pull|ping/.test(this.state)) {
                if (na.streamingCapable && /pull/.test(this.state))this.heartbeats = [];
                oa.transportEnteredState(xa);
                na.is_offline = !n.isOnline();
                this._logFantail('entering transport state: ' + this.state, j.FANTAIL_INFO);
                this.transport.enterState(this.state, na);
                if (this.state == 'ping') {
                    eb.url = m.getURI(na).toString();
                    eb.port = na.port || 'undefined';
                }
            }
        } else {
            this.state = 'idle';
            this.nextState = xa;
            eb = {state: this.state, delay: ab, nextState: xa};
            bb[0] = xa + '#';
            this._deferredTransition = fa((function () {
                this._deferredTransition = null;
                this.enterState.apply(this, bb);
            }).bind(this), ab);
        }
        if (/pull/.test(xa)) {
            eb.client_id = na.sessionID;
            eb.streaming = na.inStreaming;
        }
        ja.log('enter_' + this.state, eb);
        h.inform(j.ON_ENTER_STATE, eb);
    }, exitState: function (xa, ya) {
        var za = xa.stateId, ab = xa.status;
        if (this.isShutdown() || za < pa)return;
        var bb = da(arguments), cb = this.state;
        bb[0] = xa.status;
        var db = {state: cb, status: ab};
        if (/pull/.test(cb)) {
            db.client_id = na.sessionID;
            db.streaming = na.inStreaming;
        }
        if (/ping/.test(cb) && ab != j.OK)db.url = m.getURI(na).toString();
        if (this.nextState)db.nextState = this.nextState;
        if (ya && ya.errorType) {
            db.xhr = ya.toJSON ? ya.toJSON() : ya;
            delete db.xhr.json;
        }
        if (ya && ya.json) {
            if (ya.json.t)db.t = ya.json.t;
            if (ya.json.reason)db.reason = ya.json.reason;
            if (ya.json.seq)db.seq = ya.json.seq;
        }
        ja.log('exit_' + cb, db);
        h.inform(j.ON_EXIT_STATE, db);
        var eb = this['_exit_' + cb];
        if (eb)ab = eb.apply(this, bb) || ab;
        if (ab != j.OK) {
            wa();
            qa[cb] = (qa[cb] || 0) + 1;
        }
        var fb = ma[this.nextState || cb][ab] || ma._all[ab], gb = fb && fb.replace(/!*$/, '');
        if (!gb) {
            ja.error('terminal_transition', db);
            this._shutdownHint = j.HINT_INVALID_STATE;
            fb = 'shutdown!';
            this._logFantail('entering shutdown state', j.FANTAIL_ERROR);
        }
        this._lastState = cb;
        this._lastStatus = ab;
        this.enterState(fb);
    }, _processTransportData: function (xa, ya) {
        var za = ya.json, ab = za.t;
        if ('s' in za) {
            za.seq = za.s;
            delete za.s;
        }
        if (za.u && na.user && za.u != na.user) {
            ja.warn('misguided_msg', {user: na.user, target: za.u});
            this._reportProxyMisguidedMsg(za.u, na.user);
            return;
        }
        var bb = na.seq;
        if ('seq' in za) {
            na.seq = za.seq;
            w.doSync();
        }
        switch (ab) {
            case 'continue':
                if (na.inStreaming && this.heartbeats.length < 1) {
                    na.streamingCapable = false;
                    ja.log('switch_to_longpoll');
                    fa(this._probeTest, na.PROBE_DELAY);
                }
                wa(true);
                if (!na.inStreaming || na.STREAMING_EXIT_STATE_ON_CONTINUE)this.exitState({status: j.OK, stateId: xa});
                break;
            case 'refresh':
            case 'refreshDelay':
                this._logFantail('got refresh with reason: ' + za.reason, j.FANTAIL_INFO);
                this.exitState({status: 'refresh_' + (za.reason || 0), stateId: xa}, ya);
                break;
            case 'backoff':
                this._logFantail('server told client to back off', j.FANTAIL_WARN);
                wa();
                this.backoff = true;
                break;
            case 'lb':
                var cb = za.lb_info;
                if (cb) {
                    na.sticky_token = cb.sticky;
                    if ('pool' in cb) {
                        na.sticky_pool = cb.pool;
                    } else na.host = cb.vip;
                } else ja.error('bad lb info');
                break;
            case 'test_streaming':
                fa(this._probeTest, 500);
                break;
            case 'fullReload':
                v.clear();
                ja.log('invalid_history');
                h.inform(j.ON_INVALID_HISTORY);
                wa(true);
                this._logFantail('full reload incurred', j.FANTAIL_INFO);
                this.exitState({status: j.ERROR_MISSING, stateId: xa}, ya);
                break;
            case 'msg':
                var db, eb, fb, gb;
                wa(true);
                if ('tr' in za)na.trace_id = za.tr;
                eb = za.ms;
                fb = na.seq - eb.length;
                for (db = 0; db < eb.length; db++, fb++)if (fb >= bb) {
                    gb = eb[db];
                    if (gb.type) {
                        if (gb.type === 'messaging') {
                            var hb = {type: 'messaging', event: gb.event};
                            if (gb.message) {
                                hb.inbox_unread = gb.unread_counts && gb.unread_counts.inbox;
                                hb.tid = gb.message.tid;
                                hb.mid = gb.message.mid;
                                this._logFantail('got message with id: ' + gb.message.mid, j.FANTAIL_INFO);
                            }
                            ja.debug('message', hb);
                        } else if (gb.type === 'm_messaging') {
                            ja.debug('message', {type: 'm_messaging', tid: gb.tid, mid: gb.uuid});
                        } else if (gb.type === 'pages_messaging') {
                            if (gb.unread_counts && gb.unread_counts.inbox)h.inform(j.getArbiterType('pages_inbox_count_update'), {page_id: gb[t.VIEWER_FBID], inbox_unread: gb.unread_counts.inbox});
                        } else ja.debug('message', {type: gb.type});
                        h.inform(j.getArbiterType(gb.type), {obj: gb});
                    }
                } else ja.warn('seq_regression', {seq: fb, last_seq: bb, messages: eb.length});
                break;
            case 'heartbeat':
                if (na.inStreaming) {
                    var ib = Date.now();
                    if (this.heartbeats.length > 0) {
                        var jb = ib - this.heartbeats[this.heartbeats.length - 1];
                        ja.log('heartbeat_interval', {client_id: na.sessionID, interval: jb});
                    }
                    this.heartbeats.push(ib);
                }
                break;
            default:
                this._logFantail('got an unknown protocol message: ' + ab, j.FANTAIL_ERROR);
                ja.error('unknown_msg_type', {type: ab});
                break;
        }
    }, _enter_init: function () {
        if (qa.init >= ia.getConfig('MAX_INIT_FAILS', 2))return setTimeout(this.exitState.bind(this, {status: j.ERROR_MAX, stateId: pa}), 0);
        this._initTimer = fa(this.exitState.bind(this, {status: j.ERROR, stateId: pa}, 'timeout'), na.IFRAME_LOAD_TIMEOUT);
    }, _enter_reconnect: function (xa) {
        this._logFantail('entered reconnect with reason: ' + xa, j.FANTAIL_INFO);
        var ya = pa;
        if (!x.hasUserCookie()) {
            this._logFantail('user has no cookie???', j.FANTAIL_WARN);
            ja.warn('no_user_cookie');
            setTimeout(function () {
                ia._shutdownHint = j.HINT_AUTH;
                ia.exitState({status: j.ERROR_SHUTDOWN, stateId: ya});
            }, 0);
            return;
        }
        var za = {reason: xa, fb_dtsg: o.getToken()};
        if (r.token)za.fb_isb = r.token;
        if (ka)ka(za);
        var ab = new q('GET', '/ajax/presence/reconnect.php', za);
        ab.onSuccess = (function () {
            ia.configure(ab.json);
            v.store();
            this.exitState({status: j.OK, stateId: ya});
        }).bind(this);
        ab.onError = (function () {
            var bb = ab.json && ab.json.error;
            this._logFantail('reconnect error: ' + ab.errorType, j.FANTAIL_ERROR);
            if (ab.errorType == g.TRANSPORT_ERROR || ab.errorType == g.PROXY_ERROR)this._shutdownHint = j.HINT_CONN;
            if (bb && bb == 1356007) {
                this._shutdownHint = j.HINT_MAINT;
            } else if (bb == 1357001 || bb == 1357004 || bb == 1348009) {
                this._shutdownHint = j.HINT_AUTH;
            } else this._shutdownHint = null;
            this.exitState({status: this._shutdownHint ? j.ERROR_SHUTDOWN : j.ERROR, stateId: ya}, ab);
        }).bind(this);
        ab.send();
    }, _enter_shutdown: function () {
        h.inform(j.ON_SHUTDOWN, {reason: this._shutdownHint});
        if (!!na.shutdown_recovery_enabled && 'shutdown_recovery_interval_seconds' in na && na.shutdown_recovery_interval_seconds > 0) {
            var xa = na.shutdown_recovery_interval_seconds * 1000;
            fa((function () {
                h.inform(j.ATTEMPT_RECONNECT);
                this.state = 'reconnect!';
                this.enterState('reconnect!');
            }).bind(this), xa);
        }
    }, _exit_init: function (xa) {
        if (this._initTimer)this._initTimer = clearTimeout(this._initTimer);
        if (xa == j.ERROR_MAX)this._sendIframeError(j.reason_IFrameLoadGiveUp);
    }, _exit_pull: function (xa) {
        var ya = xa == j.OK;
        oa.reportPullReturned(ya, this);
        if (ya) {
            this.lastPullTime = Date.now();
        } else this._logFantail('pull failed with status: ' + xa, j.FANTAIL_ERROR);
    }, _exit_ping: function (xa) {
        if (xa == j.OK) {
            var ya = Date.now() - (this.lastPullTime || p.start);
            if (ya > na.STALL_THRESHOLD) {
                this._logFantail('didnt complete a successful pull for too long', j.FANTAIL_ERROR);
                return j.ERROR_STALE;
            }
        } else this._logFantail('ping failed with status: ' + xa, j.FANTAIL_ERROR);
    }, _reportProxyMisguidedMsg: function (xa, ya) {
        this._logFantail('misguided message to ' + ya + ' meant for ' + xa, j.FANTAIL_ERROR);
        var za = Date.now();
        if (za - this.lastReportOnMisguidedMsgTime <= na.CHANNEL_PROXY_REPORTING_MIN_INTERVAL)return;
        this.lastReportOnMisguidedMsgTime = za;
        var ab = {received_uid: xa, expected_uid: ya};
        if (na.sticky_token)ab.sticky_token = na.sticky_token;
        var bb = new z('/err_misguided_msg').setDomain(na.host + '.facebook.com').setPort(na.port).setSecure(z().isSecure()).setQueryData(ab), cb = new g('GET', bb);
        if (g.supportsCORS())cb.xhr.withCredentials = true;
        cb.onSuccess = function (db) {
        };
        cb.onError = function (db) {
        };
        cb.onJSON = function (db, eb) {
        };
        cb.send();
    }, _probeTest: function () {
        na.streamingCapable = false;
        var xa = [], ya = {mode: 'stream', format: 'json'};
        if (na.sticky_token)ya.sticky_token = na.sticky_token;
        var za = new z('/probe').setDomain(na.host + '.facebook.com').setPort(na.port).setSecure(z().isSecure()).setQueryData(ya), ab = new g('GET', za);
        ab.onJSON = function (bb, cb) {
            if (bb && bb.json && bb.json.t === 'heartbeat') {
                xa.push(Date.now());
                if (xa.length >= 2) {
                    var db = xa[1] - xa[0];
                    if (db >= na.PROBE_HEARTBEATS_INTERVAL_LOW && db <= na.PROBE_HEARTBEATS_INTERVAL_HIGH) {
                        na.streamingCapable = true;
                        ja.log('switch_to_streaming');
                    } else this._logFantail('probe request failed due to heartbeat delay', j.FANTAIL_ERROR);
                    ja.log('probe_ok', {time: db});
                }
            }
        };
        ab.onSuccess = function (bb) {
            if (xa.length != 2) {
                na.streamingCapable = false;
                ja.error('probe_error', {error: 'beats.length = ' + xa.length});
            }
        };
        ab.onError = function (bb) {
            this._logFantail('probe request failed', j.FANTAIL_ERROR);
            na.streamingCapable = false;
            ja.error('probe_error', bb);
        };
        ja.log('probe_request');
        ab.send();
    }, _logFantail: function (xa, ya) {
        var za = na.fantail_queue_capacity || na.FANTAIL_QUEUE_CAPACITY;
        if (!na.fantail_enabled || na.fantail_logs.length > za)return;
        var ab = 'fantail queue size exceeded', bb = j.FANTAIL_WARN;
        if (na.fantail_logs.length < za) {
            ab = xa;
            bb = ya;
        }
        var cb = na.fantail_logs.length, db = {};
        db['time' + cb] = Date.now();
        db['log' + cb] = ab;
        db['severity' + cb] = bb;
        na.fantail_logs.push(db);
    }};
    e.exports = ia;
    if (k.channelConfig) {
        ia.configure(k.channelConfig);
        if (/shutdown/.test(k.state))ia._shutdownHint = j[k.reason];
        ia.init(k.state, k.reason);
    }
}, null);
__d("ChannelConnection", ["Arbiter", "copyProperties", "ChatConfig", "Run", "SystemEvents", "ChannelConstants", "ChannelManager", "JSLogger", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = n.create('channel_connection'), q = null, r = null, s = null, t = null, u = 0, v = h(new g(), {CONNECTED: 'chat-connection/connected', RECONNECTING: 'chat-connection/reconnecting', SHUTDOWN: 'chat-connection/shutdown', MUTE_WARNING: 'chat-connection/mute', UNMUTE_WARNING: 'chat-connection/unmute'});

    function w() {
        if (r) {
            clearTimeout(r);
            r = null;
        }
    }

    function x() {
        w();
        p.log('unmute_warning');
        v.inform(v.UNMUTE_WARNING);
    }

    function y(ba) {
        w();
        r = o(x, ba);
        p.log('mute_warning', {time: ba});
        v.inform(v.MUTE_WARNING);
    }

    function z() {
        if (s) {
            clearTimeout(s);
            s = null;
        }
    }

    function aa(ba, ca) {
        z();
        if (ba === l.ON_ENTER_STATE && (ca.nextState || ca.state) === 'pull') {
            if (t !== v.CONNECTED) {
                p.log('connected');
                var da = !t;
                t = v.CONNECTED;
                u = 0;
                v.inform(v.CONNECTED, {init: da});
            }
        } else if (ba === l.ON_ENTER_STATE && ((ca.nextState || ca.state) === 'ping' || (!ca.nextState && ca.state === 'idle'))) {
            s = o(function () {
                var ea = null;
                if (!(ca.state === 'idle' && !ca.nextState))ea = (ca.delay || 0);
                p.log('reconnecting', {delay: ea});
                if (v.disconnected())p.log('reconnecting_ui', {delay: ea});
                t = v.RECONNECTING;
                (ca.state === 'idle') && u++;
                if (u > 1) {
                    v.inform(v.RECONNECTING, ea);
                } else if (!ca.nextState && ca.state === 'idle')aa(ba, ca);
            }, 500);
        } else if (ba === l.ON_SHUTDOWN) {
            p.log('shutdown', {reason: ca.reason});
            t = v.SHUTDOWN;
            u = 0;
            v.inform(v.SHUTDOWN, ca.reason);
        }
    }

    if (m.isShutdown()) {
        aa(l.ON_SHUTDOWN, m._shutdownHint);
    } else aa(l.ON_ENTER_STATE, {state: m.state, nextState: m.nextState, delay: 0});
    h(v, {disconnected: function () {
        return t === v.SHUTDOWN || (t === v.RECONNECTING && !r && u > 1);
    }, isShutdown: function () {
        return t === v.SHUTDOWN;
    }, reconnect: function (ba) {
        if (m.state === 'ping' || m.isShutdown())return;
        p.log('reconnect', {now: ba});
        v.inform(v.RECONNECTING, 0);
        if (!!ba) {
            if (q !== null) {
                clearTimeout(q);
                q = null;
            }
            m.enterState('ping!');
        } else if (!q)q = o(function () {
            m.enterState('ping!');
            q = null;
        }, i.get('channel_manual_reconnect_defer_msec'));
    }, unmuteWarning: x});
    g.subscribe([l.ON_ENTER_STATE, l.ON_SHUTDOWN], aa);
    g.subscribe(l.ATTEMPT_RECONNECT, function () {
        if (v.disconnected())v.reconnect();
    });
    k.subscribe(k.TIME_TRAVEL, function () {
        v.reconnect();
        y(i.get('mute_warning_time_msec'));
    });
    j.onBeforeUnload(z, false);
    e.exports = v;
}, null);
__d("AvailableListConstants", ["fbt"], function (a, b, c, d, e, f, g) {
    var h = {ON_AVAILABILITY_CHANGED: 'buddylist/availability-changed', ON_UPDATE_ERROR: 'buddylist/update-error', ON_UPDATED: 'buddylist/updated', ON_CHAT_NOTIFICATION_CHANGED: 'chat-notification-changed', OFFLINE: 0, IDLE: 1, ACTIVE: 2, MOBILE: 3, WEB_STATUS: 'webStatus', FB_APP_STATUS: 'fbAppStatus', MESSENGER_STATUS: 'messengerStatus', OTHER_STATUS: 'otherStatus', ACTIVE_ON_WEB: "\u0412\u0435\u0431", ACTIVE_ON_MOBILE: "\u041c\u043e\u0431.", LEGACY_OVERLAY_OFFLINE: -1, LEGACY_OVERLAY_ONLINE: 0, LEGACY_OVERLAY_IDLE: 1, STATUS_ACTIVE: 'active', STATUS_IDLE: 'idle', STATUS_OFFLINE: 'offline', legacyStatusMap: {'0': 2, '1': 1, '-1': 0, '2': 3}, reverseLegacyStatusMap: {0: -1, 1: 1, 2: 0, 3: 2}};
    a.AvailableListConstants = e.exports = h;
}, null);
__d("ChatContexts", [], function (a, b, c, d, e, f) {
    var g = {};

    function h(k) {
        var l = k ? k.subtext : '';
        return l;
    }

    function i(k, l) {
        g[k] = l;
    }

    var j = {get: function (k) {
        if (k in g) {
            return g[k];
        } else return null;
    }, update: function (k) {
        for (var l in k)i(l, k[l]);
    }, getShortDisplay: function (k) {
        return h(j.get(k));
    }};
    e.exports = j;
}, null);
__d("LastMobileActiveTimes", ["ServerTime", "tx"], function (a, b, c, d, e, f, g, h) {
    var i = {};

    function j(n) {
        if (!n || n < 0)return '';
        var o = (g.get() / 1000) - n, p = Math.floor(o / 60), q = Math.floor(p / 60), r = Math.floor(q / 24);
        if (p <= 1) {
            return h._("{count}\u043c\u0438\u043d", {count: 1});
        } else if (p < 60) {
            return h._("{count}\u043c\u0438\u043d", {count: p});
        } else if (q < 24) {
            return h._("{count}\u0447", {count: q});
        } else if (r < 3) {
            return h._("{count}\u0434", {count: r});
        } else return '';
    }

    function k(n, o) {
        i[n] = o;
    }

    function l(n) {
        if (n in i) {
            return i[n];
        } else return 0;
    }

    var m = {update: function (n) {
        for (var o in n)k(o, n[o]);
    }, getShortDisplay: function (n) {
        return j(l(n));
    }};
    e.exports = m;
}, null);
__d("Poller", ["ArbiterMixin", "AsyncRequest", "CurrentUser", "copyProperties", "emptyFunction", "mixin", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = l(g);
    for (var o in n)if (n.hasOwnProperty(o))q[o] = n[o];
    var p = n === null ? null : n.prototype;
    q.prototype = Object.create(p);
    q.prototype.constructor = q;
    q.__superConstructor__ = n;
    function q(t) {
        "use strict";
        this._config = j({clearOnQuicklingEvents: true, setupRequest: k, interval: null, maxRequests: Infinity, dontStart: false}, t);
        this._handle = null;
        if (!this._config.dontStart)this.start();
    }

    q.prototype.start = function () {
        "use strict";
        if (this._polling)return this;
        this._requests = 0;
        this.request();
        return this;
    };
    q.prototype.stop = function () {
        "use strict";
        this._cancelRequest();
        return this;
    };
    q.prototype.mute = function () {
        "use strict";
        this._muted = true;
        return this;
    };
    q.prototype.resume = function () {
        "use strict";
        if (this._muted) {
            this._muted = false;
            if (this._handle === null && this._polling)return this.request();
        }
        return this;
    };
    q.prototype.skip = function () {
        "use strict";
        this._skip = true;
        return this;
    };
    q.prototype.reset = function () {
        "use strict";
        return this.stop().start();
    };
    q.prototype.request = function () {
        "use strict";
        this._cancelRequest();
        this._polling = true;
        if (!s())return this._done();
        if (this._muted)return this;
        if (++this._requests > this._config.maxRequests)return this._done();
        var t = new h(), u = false;
        t.setInitialHandler(function () {
            return !u;
        });
        this._cancelRequest = function () {
            u = true;
            this._cleanup();
        }.bind(this);
        t.setFinallyHandler(r.bind(this));
        t.setInitialHandler = k;
        t.setFinallyHandler = k;
        this._config.setupRequest(t, this);
        if (this._skip) {
            this._skip = false;
            setTimeout(r.bind(this), 0);
        } else t.send();
        return this;
    };
    q.prototype.isPolling = function () {
        "use strict";
        return this._polling;
    };
    q.prototype.isMuted = function () {
        "use strict";
        return this._muted;
    };
    q.prototype.setInterval = function (t) {
        "use strict";
        if (t) {
            this._config.interval = t;
            this.start();
        }
    };
    q.prototype.getInterval = function () {
        "use strict";
        return this._config.interval;
    };
    q.prototype._cleanup = function () {
        "use strict";
        if (this._handle !== null)clearTimeout(this._handle);
        this._handle = null;
        this._cancelRequest = k;
        this._polling = false;
    };
    q.prototype._done = function () {
        "use strict";
        this._cleanup();
        this.inform('done', {sender: this});
        return this;
    };
    q.MIN_INTERVAL = 2000;
    j(q.prototype, {_config: null, _requests: 0, _muted: false, _polling: false, _skip: false, _cancelRequest: k});
    function r() {
        if (!this._polling)return;
        if (this._requests < this._config.maxRequests) {
            var t = this._config.interval;
            t = typeof t === 'function' ? t(this._requests) : t;
            t = (t > q.MIN_INTERVAL) ? t : q.MIN_INTERVAL;
            if (this._config.clearOnQuicklingEvents) {
                this._handle = setTimeout(this.request.bind(this), t);
            } else this._handle = m(this.request.bind(this), t);
        } else this._done();
    }

    function s() {
        return i.isLoggedInNow();
    }

    e.exports = q;
}, null);
__d("PresenceStatus", ["AvailableListConstants", "BanzaiODS", "ChatVisibility", "CurrentUser", "LastMobileActiveTimes", "LogHistory", "PresencePrivacy", "ServerTime", "createObjectFrom"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = l.getInstance('presence_status'), q = {}, r = {}, s = {}, t = {}, u = {}, v = {}, w = {}, x = {}, y = {resetPresenceData: function () {
        r = {};
        s = {};
        x = {};
        w = {};
        v = {};
    }, reset: function () {
        y.resetPresenceData();
        t = {};
        u = {};
    }, get: function (z) {
        if (z == j.getID())return i.isOnline() ? g.ACTIVE : g.OFFLINE;
        var aa = g.OFFLINE;
        if (z in r)aa = r[z];
        if (aa == g.OFFLINE)if (t[z])aa = g.MOBILE;
        if (!m.allows(z))aa = g.OFFLINE;
        return aa;
    }, getCapabilities: function (z) {
        var aa = y.get(z);
        if (aa == g.OFFLINE)return 0;
        var ba = s[z];
        return ba ? ba : 0;
    }, getDetailedActivePresence: function (z) {
        var aa = x[z];
        if (!aa)return g.ACTIVE_ON_WEB;
        var ba = aa[g.WEB_STATUS], ca = aa[g.FB_APP_STATUS], da = aa[g.MESSENGER_STATUS], ea = aa[g.OTHER_STATUS];
        if (ca === g.STATUS_ACTIVE || da === g.STATUS_ACTIVE) {
            return g.ACTIVE_ON_MOBILE;
        } else if (ba === g.STATUS_ACTIVE || ea === g.STATUS_ACTIVE) {
            return g.ACTIVE_ON_WEB;
        } else {
            if (!q[z]) {
                p.error('inconsistent_presence', {id: z, presence: y.getDebugInfo(z)});
                h.bumpEntityKey('presence', 'inconsistent_presence');
                q[z] = true;
            }
            return null;
        }
    }, hasDetailedPresenceData: function (z) {
        return x[z] != null;
    }, isBirthday: function (z) {
        return u[z];
    }, getGroup: function (z) {
        return z.some(function (aa) {
            if (aa == j.getID())return false;
            return (y.get(aa) === g.ACTIVE);
        }) ? g.ACTIVE : g.OFFLINE;
    }, set: function (z, aa, ba, ca, da, ea) {
        if (z == j.getID())return false;
        switch (aa) {
            case g.OFFLINE:
            case g.IDLE:
            case g.ACTIVE:
            case g.MOBILE:
                break;
            default:
                return false;
        }
        var fa = y.get(z), ga = fa != aa;
        if (ga && fa == g.ACTIVE) {
            var ha = {};
            ha[z] = n.get();
            k.update(ha);
        }
        var ia = false;
        if (!ga && da)ia = y.getCapabilities(z) != da;
        if (ba) {
            v[z] = n.get();
            w[z] = ca;
        }
        r[z] = aa;
        if (da)s[z] = da;
        if (ea)x[z] = ea;
        return ga || ia;
    }, setMobileFriends: function (z) {
        t = o(z);
    }, setBirthdayFriends: function (z) {
        u = o(z);
    }, getOnlineIDs: function () {
        var z, aa = [];
        for (z in r)if (y.get(z) === g.ACTIVE)aa.push(z);
        return aa;
    }, getAvailableIDs: function () {
        var z = y.getOnlineIDs(), aa;
        for (aa in t) {
            if (r[aa])continue;
            z.push(aa);
        }
        return z;
    }, getOnlineCount: function () {
        return y.getOnlineIDs().length;
    }, getPresenceStats: function () {
        var z = 0, aa = 0, ba = 0, ca = 0, da = 0;
        for (var ea in r) {
            z += 1;
            switch (y.get(ea)) {
                case g.OFFLINE:
                    aa += 1;
                    break;
                case g.IDLE:
                    ba += 1;
                    break;
                case g.ACTIVE:
                    ca += 1;
                    break;
                case g.MOBILE:
                    da += 1;
                    break;
                default:
                    break;
            }
        }
        return {total: z, offline: aa, idle: ba, active: ca, mobile: da};
    }, getDebugInfo: function (z) {
        return {id: z, presence: r[z], detailedPresence: x[z], overlaySource: w[z], overlayTime: v[z], mobile: t[z]};
    }};
    e.exports = y;
}, null);
__d("PresencePoller", ["AvailableListConstants", "AvailableListInitialData", "BanzaiODS", "ChannelConnection", "ChatContexts", "ChatVisibility", "CurrentUser", "JSLogger", "LastMobileActiveTimes", "Poller", "PresencePrivacy", "PresenceStatus", "ServerTime", "ShortProfiles", "UserActivity", "copyProperties", "debounceAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
    var x = 5, y = '/ajax/chat/buddy_list.php', z = 1800000, aa = h.pollInterval, ba = h.lazyPollInterval, ca = h.lazyThreshold, da = n.create('available_list'), ea = 'presence_poller';
    i.setEntitySample(ea, .01);
    function fa(ga) {
        "use strict";
        this.$PresencePoller0 = ga;
        this.$PresencePoller1 = false;
        this.$PresencePoller2 = h.chatNotif;
        this.$PresencePoller3 = new p({interval: aa, setupRequest: this.$PresencePoller4.bind(this), clearOnQuicklingEvents: false, dontStart: true});
        if (l.isOnline()) {
            this.$PresencePoller5 = Date.now();
            this.$PresencePoller6 = Date.now();
            this.$PresencePoller7 = Date.now();
            this.$PresencePoller8 = h.updateTime;
        } else {
            this.$PresencePoller5 = 0;
            this.$PresencePoller8 = 0;
            this.$PresencePoller6 = 0;
            this.$PresencePoller7 = 0;
        }
        this.$PresencePoller9 = 0;
        this.$PresencePollera('available_initial_data', h.updateTime, h.availableList, h.lastActiveTimes, h.mobileFriends, h.birthdayFriends);
        u.subscribe(function (ha, ia) {
            if (ia.idleness > aa)this.forceUpdate();
        }.bind(this));
        q.subscribe('privacy-user-presence-changed', function () {
            this.forceUpdate();
        }.bind(this));
    }

    fa.prototype.start = function () {
        "use strict";
        setTimeout(this.$PresencePoller3.start.bind(this.$PresencePoller3), 0);
    };
    fa.prototype.restart = function () {
        "use strict";
        if (this.$PresencePoller3.isMuted()) {
            this.$PresencePoller3.resume();
            this.forceUpdate();
        }
    };
    fa.prototype.stop = function () {
        "use strict";
        this.$PresencePoller3.mute();
    };
    fa.prototype.forceUpdate = function () {
        "use strict";
        this.$PresencePoller3.request();
    };
    fa.prototype.getIsUserIdle = function () {
        "use strict";
        return this.$PresencePoller1;
    };
    fa.prototype.getWebChatNotification = function () {
        "use strict";
        return this.$PresencePoller2;
    };
    fa.prototype.getCallback = function () {
        "use strict";
        return this.$PresencePoller0;
    };
    fa.prototype.$PresencePollerb = function () {
        "use strict";
        return w(function () {
            this.$PresencePoller0(g.ON_AVAILABILITY_CHANGED);
        }.bind(this), 0)();
    };
    fa.prototype.$PresencePollera = function (ga, ha, ia, ja, ka, la) {
        "use strict";
        this.$PresencePoller8 = ha;
        if (!Array.isArray(ia)) {
            r.resetPresenceData();
            for (var ma in ia)r.set(ma, ia[ma].a, false, ga, ia[ma].c, ia[ma].p);
        }
        if (ja)o.update(ja);
        if (ka)r.setMobileFriends(ka);
        if (la)r.setBirthdayFriends(la);
        this.$PresencePollerb();
    };
    fa.prototype.$PresencePoller4 = function (ga) {
        "use strict";
        if (j.isShutdown() || !l.isOnline()) {
            this.$PresencePoller3.skip();
            i.bumpEntityKey(ea, 'skip.offline');
            return;
        }
        if (Date.now() - this.$PresencePoller5 < aa) {
            this.$PresencePoller3.skip();
            i.bumpEntityKey(ea, 'skip.recent');
            return;
        }
        i.bumpEntityKey(ea, 'request');
        this.$PresencePoller5 = Date.now();
        var ha = Date.now() - this.$PresencePoller7, ia = t.getCachedProfileIDs().join(",");
        ga.setHandler(this.$PresencePollerc.bind(this)).setErrorHandler(this.$PresencePollerd.bind(this)).setOption('suppressErrorAlerts', true).setOption('retries', 1).setData({user: m.getID(), cached_user_info_ids: ia, fetch_mobile: (ha > z)}).setURI(y).setAllowCrossPageTransition(true);
    };
    fa.prototype.$PresencePollerc = function (ga) {
        "use strict";
        var ha = ga.getPayload(), ia = ha.buddy_list;
        if (!ia) {
            this.$PresencePollerd(ga);
            return;
        }
        i.bumpEntityKey(ea, 'response');
        this.$PresencePollere();
        this.$PresencePoller6 = Date.now();
        s.update(ha.time);
        if (ia.mobile_friends)this.$PresencePoller7 = Date.now();
        this.$PresencePoller9 = 0;
        this.$PresencePollerf();
        var ja = ia.userInfos;
        if (ja)t.setMulti(ja);
        var ka = ia.chatContexts;
        ka && k.update(ka);
        this.$PresencePoller1 = ia.userIsIdle;
        if (ia.chatNotif !== undefined) {
            this.$PresencePoller2 = ia.chatNotif;
            this.$PresencePoller0(g.ON_CHAT_NOTIFICATION_CHANGED, this.$PresencePoller2);
        }
        this.$PresencePollera('buddy_list_poller', ha.time, ia.nowAvailableList, ia.last_active_times, ia.mobile_friends, ia.todays_birthdays);
    };
    fa.prototype.$PresencePollerd = function (ga) {
        "use strict";
        i.bumpEntityKey(ea, 'error');
        if (ga.getError() == 1356007)return;
        this.$PresencePoller9++;
        if (this.$PresencePoller9 >= x)this.$PresencePoller0(g.ON_UPDATE_ERROR);
    };
    fa.prototype.$PresencePollerf = function () {
        "use strict";
        var ga = u.isActive(ca) ? aa : ba;
        i.bumpEntityKey(ea, 'period.' + ga);
        this.$PresencePoller3.setInterval(ga);
    };
    fa.prototype.$PresencePollere = function () {
        "use strict";
        var ga = Date.now(), ha = ga - this.$PresencePoller6;
        da.log('buddylist_presence_stats', v({duration: ha}, r.getPresenceStats()));
    };
    e.exports = fa;
}, null);
__d("TypingStates", [], function (a, b, c, d, e, f) {
    var g = {INACTIVE: 0, TYPING: 1, QUITTING: 2};
    e.exports = g;
}, null);
__d("AvailableList", ["Arbiter", "ArbiterMixin", "AsyncRequest", "AvailableListConstants", "ChannelConnection", "ChannelConstants", "ChatConfig", "JSLogger", "PresencePoller", "PresencePrivacy", "PresenceStatus", "ShortProfiles", "TypingStates", "copyProperties", "debounceAcrossTransitions", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    var w = t({}, j, h);
    w.subscribe([j.ON_AVAILABILITY_CHANGED, j.ON_UPDATE_ERROR], function (fa, ga) {
        g.inform(fa, ga);
    });
    var x = u(function () {
        w.inform(j.ON_AVAILABILITY_CHANGED);
    }, 0);

    function y(fa, ga, ha, ia, ja, ka) {
        var la = q.set(fa, ga, ha, ia, ja, ka);
        if (la)x();
    }

    function z(fa) {
        var ga = fa.payload.availability || {};
        for (var ha in ga)if (ga[ha] !== null && typeof ga[ha] === 'object') {
            y(ha, ga[ha].a, true, 'mercury_tabs', ga[ha].c);
        } else y(ha, ga[ha], true, 'mercury_tabs');
    }

    function aa() {
        ea.restart();
    }

    function ba() {
        ea.stop();
    }

    function ca(fa) {
        var ga = w.getDebugInfo(fa), ha = (ga.presence == j.ACTIVE), ia = new i('/ajax/mercury/tabs_presence.php').setData({target_id: fa, to_online: ha, presence_source: ga.overlaySource, presence_time: ga.overlayTime}).setHandler(z).setErrorHandler(v).setAllowCrossPageTransition(true).send();
    }

    function da(fa, ga) {
        ga.chat_config = m.getDebugInfo();
        ga.available_list_debug_info = {};
        q.getAvailableIDs().forEach(function (ha) {
            ga.available_list_debug_info[ha] = w.getDebugInfo(ha);
        });
        ga.available_list_poll_interval = w._poller && w._poller.getInterval();
    }

    var ea = new o(function (event) {
        w.inform(event);
    });
    t(w, {get: function (fa) {
        return q.get(fa);
    }, updateForID: function (fa) {
        ca(fa);
    }, getWebChatNotification: function () {
        return ea.getWebChatNotification();
    }, isUserIdle: function () {
        return ea.getIsUserIdle();
    }, isReady: function () {
        return true;
    }, set: function (fa, ga, ha, ia, ja) {
        y(fa, ga, true, ha, ia, ja);
    }, update: function () {
        ea.forceUpdate();
    }, isIdle: function (fa) {
        return w.get(fa) == j.IDLE;
    }, getDebugInfo: function (fa) {
        var ga = q.getDebugInfo(fa), ha = r.getNow(fa);
        if (ha)ga.name = ha.name;
        return ga;
    }});
    ea.start();
    g.subscribe(n.DUMP_EVENT, da);
    g.subscribe('chat-visibility/go-online', aa);
    g.subscribe('chat-visibility/go-offline', ba);
    p.subscribe(['privacy-changed', 'privacy-availability-changed', 'privacy-user-presence-response'], x);
    k.subscribe([k.CONNECTED, k.RECONNECTING, k.SHUTDOWN, k.MUTE_WARNING, k.UNMUTE_WARNING], x);
    g.subscribe(l.getArbiterType('buddylist_overlay'), function (fa, ga) {
        var ha = ga.obj.overlay;
        for (var ia in ha)w.set(ia, ha[ia].a, ha[ia].s || 'channel', ha[ia].vc, ha[ia].p);
    });
    g.subscribe([l.getArbiterType('typ'), l.getArbiterType('ttyp')], function (fa, ga) {
        var ha = ga.obj;
        if (ha.st === s.TYPING) {
            var ia = ha.from;
            w.set(ia, j.ACTIVE, 'channel-typing');
        }
    });
    a.AvailableList = e.exports = w;
}, null);
__d("requireWeak", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        d.call(null, h, i);
    }

    e.exports = g;
}, null);
__d("ChatImpressionLogger", ["AsyncSignal", "requireWeak", "ChatConfig", "ChatVisibility", "Poller", "PresencePrivacy", "PresenceStatus", "debounceAcrossTransitions", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = null;
    h(['AvailableList'], function (v) {
        return p = v;
    });
    var q = null;

    function r() {
        if (!q)return '';
        return q.getCachedSortedList().toString();
    }

    function s() {
        if (!q || !p)return '';
        var v = [], w = q.getCachedSortedList();
        for (var x = 0; x < w.length; x++)v[x] = p.get(w[x]);
        return v.toString();
    }

    function t(v) {
        v.setURI('/ajax/chat/imps_logging.php').setData({list_availability: s(), sorted_list: r(), source: 'periodical_imps'});
    }

    var u = {init: function (v) {
        q = v;
        var w = i.get('chat_impression_logging_periodical', 0);
        if (w) {
            var x = i.get('periodical_impression_logging_config.interval'), y = new k({interval: x, setupRequest: t, clearOnQuicklingEvents: false, dontStart: true});
            l.subscribe('privacy-user-presence-changed', n(function () {
                if (j.isOnline()) {
                    y.start();
                } else y.stop();
            }));
        }
        this.init = function () {
        };
    }, logImpression: function (v, w, x) {
        var y = i.get('chat_impression_logging_with_click'), z = {list_availability: y ? s() : '', sorted_list: y ? r() : '', source: v, target: w, target_presence: m.get(w), viewport_width: document.body.clientWidth};
        new g('/ajax/chat/ct.php', o(z, x)).send();
    }};
    e.exports = u;
}, null);
__d("WebMessengerPermalinkConstants", ["URI"], function (a, b, c, d, e, f, g) {
    var h = {ARCHIVED_PATH: '/messages/archived', BASE_PATH: '/messages', OTHER_PATH: '/messages/other', SPAM_PATH: '/messages/spam', COMPOSE_POSTFIX_PATH: '/new', SEARCH_POSTFIX_PATH: '/search', TID_POSTFIX_PARTIAL_PATH: '/conversation-', overriddenVanities: '(archived|other|spam|new|search|conversation-.*)', getURIPathForThreadID: function (i, j) {
        return (j || h.BASE_PATH) + h.TID_POSTFIX_PARTIAL_PATH + g.encodeComponent(g.encodeComponent(i));
    }, getThreadIDFromURI: function (i) {
        var j = i.getPath().match(h.BASE_PATH + '(/[^/]*)*' + h.TID_POSTFIX_PARTIAL_PATH + '([^/]+)');
        if (j) {
            var k = g.decodeComponent(g.decodeComponent(j[2]));
            return k;
        }
    }, getURIPathForIDOrVanity: function (i, j) {
        if (i.match('^' + h.overriddenVanities + '$'))i = '.' + i;
        return (j || h.BASE_PATH) + '/' + i;
    }, getUserIDOrVanity: function (i) {
        var j = i.match(h.BASE_PATH + '.*/([^/]+)/?$'), k = j && j[1], l = h.overriddenVanities;
        if (!k || k.match('^' + l + '$')) {
            return false;
        } else if (k.match('^\\.' + l + '$')) {
            return k.substr(1);
        } else return k;
    }};
    e.exports = h;
}, null);
__d("ChatTypeaheadConstants", [], function (a, b, c, d, e, f) {
    var g = {USER_TYPE: 'user', THREAD_TYPE: 'thread', FRIEND_TYPE: 'friend', NON_FRIEND_TYPE: 'non_friend', FB4C_TYPE: 'fb4c', HEADER_TYPE: 'header'};
    e.exports = g;
}, null);
__d("ChatOpenTab", ["Event", "requireWeak", "ContextualThing", "DOM", "csx", "cx", "Parent"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = null;
    h(['ChatApp'], function (x) {
        return n = x;
    });
    var o = null;
    h(['ChatTabModel'], function (x) {
        return o = x;
    });
    var p = 716, q = 'messaging_tracking';

    function r() {
        d(['Toggler'], function (x) {
            var y = x.getInstance(j.scry(document, "div._1z4y")[0]);
            if (y && y.getActive())y.hide();
        });
    }

    function s(x) {
        d(['LogHistory', 'MercuryThreads', 'WebMessengerPermalinkConstants', 'goURI'], function (y, z, aa, ba) {
            z.get().getThreadMeta(x, function (ca) {
                if (n && n.isInitialized()) {
                    n.tabController.openTab(x, n.tabsViewport);
                } else ba(aa.getURIPathForThreadID(x));
                if (!w.canOpenTab())y.getInstance('mercury').error('Unable to open chat tab', ca);
            });
        });
        if (document.documentElement.clientHeight <= p)r();
    }

    function t(x, y, z, aa) {
        g.listen(x, 'click', function (ba) {
            if (w.canOpenTab()) {
                aa(y, z);
                return ba.kill();
            }
        });
    }

    function u(x, y, z, aa) {
        var ba = {referrer: x || '', message_thread_id: y, message_view: 'chat', timestamp_send: Date.now()};
        if (z !== undefined)ba.message_target_ids = [z];
        d(['ChatImpressionLogger'], function (ca) {
            ca.logImpression(x, z, aa);
        });
        d(['Banzai'], function (ca) {
            ca.post(q, ba, {delay: 0, retry: true});
        });
    }

    function v(x) {
        var y = i.getContext(x);
        return (y && m.byClass(y, "_3qw") !== null);
    }

    var w = {canOpenTab: function () {
        return n && !n.isHidden();
    }, openEmptyTab: function (x, y, z) {
        if (w.canOpenTab() && o) {
            var aa = o.getEmptyTab();
            s(aa);
            u(y, aa, null, z);
            r();
        }
    }, listenOpenEmptyTab: function (x, y) {
        t(x, null, y, w.openEmptyTab);
    }, openThread: function (x, y, z) {
        d(['MercuryIDs', 'MercuryServerRequests'], function (aa, ba) {
            if (aa.isValid(x)) {
                s(x);
            } else ba.get().getClientThreadID(x, s);
            u(y, x, null, z);
            r();
        });
    }, listenOpenThread: function (x, y, z) {
        t(x, y, z, w.openThread);
    }, openUserTab: function (x, y, z) {
        d(['MercuryThreads'], function (aa) {
            var ba = aa.get().getCanonicalThreadToUser(x);
            s(ba.thread_id);
            u(y, ba.thread_id, x, z);
        });
        return true;
    }, listenOpenUserTab: function (x, y, z) {
        if (!v(x))t(x, y, z, w.openUserTab);
    }, openTabByType: function (x, y, z) {
        d(['ChatTypeaheadConstants', 'MercuryParticipantTypes'], function (aa, ba) {
            if (y === aa.THREAD_TYPE) {
                if (x) {
                    w.openThread(x, z);
                } else w.openEmptyTab(null, z);
            } else if (!y || y === ba.FRIEND || y === aa.FRIEND_TYPE || y === aa.USER_TYPE)w.openUserTab(x, z);
        });
    }};
    e.exports = w;
}, null);