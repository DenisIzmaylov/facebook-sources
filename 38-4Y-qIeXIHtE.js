/*!CK:4237805730!*//*1411961345,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["jlrE6"]);
}

__d("ChatOptions", ["Arbiter", "ChannelConstants", "JSLogger", "PresenceUtil", "copyProperties", "ChatOptionsInitialData"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = i.create('chat_options'), m = {};
    (function () {
        var o = b('ChatOptionsInitialData');
        for (var p in o) {
            var q = o[p];
            m[p] = !!q;
        }
    })();
    var n = k(new g(), {getSetting: function (o) {
        return m[o];
    }, setSetting: function (o, p, q) {
        if (this.getSetting(o) == p)return;
        if (q) {
            q = 'from_' + q;
            l.log(q, {name: o, new_value: p, old_value: this.getSetting(o)});
        }
        m[o] = !!p;
        g.inform('chat/option-changed', {name: o, value: p});
    }});
    g.subscribe(h.getArbiterType('setting'), function (o, p) {
        var q = p.obj;
        if (q.window_id === j.getSessionID())return;
        n.setSetting(q.setting, !!q.value, 'channel');
    });
    g.subscribe(i.DUMP_EVENT, function (o, p) {
        p.chat_options = m;
    });
    e.exports = n;
}, null);
__d("transferTextStyles", ["Style"], function (a, b, c, d, e, f, g) {
    var h = {fontFamily: null, fontSize: null, fontStyle: null, fontWeight: null, lineHeight: null, wordWrap: null};

    function i(j, k) {
        for (var l in h)if (h.hasOwnProperty(l))h[l] = g.get(j, l);
        g.apply(k, h);
    }

    e.exports = i;
}, null);
__d("TextMetrics", ["DOM", "Style", "UserAgent_DEPRECATED", "transferTextStyles"], function (a, b, c, d, e, f, g, h, i, j) {
    function k(m) {
        var n = m.clientWidth, o = (h.get(m, '-moz-box-sizing') == 'border-box');
        if (o && i.firefox() < 29)return n;
        var p = h.getFloat(m, 'paddingLeft') + h.getFloat(m, 'paddingRight');
        return n - p;
    }

    function l(m, n) {
        this._node = m;
        this._flexible = !!n;
        var o = 'textarea', p = 'textMetrics';
        if (this._flexible) {
            o = 'div';
            p += ' textMetricsInline';
        }
        this._shadow = g.create(o, {className: p});
        j(m, this._shadow);
        document.body.appendChild(this._shadow);
    }

    l.prototype.measure = function (m) {
        var n = this._node, o = this._shadow;
        m = (m || n.value) + '...';
        if (!this._flexible) {
            var p = k(n);
            h.set(o, 'width', Math.max(p, 0) + 'px');
        }
        g.setContent(o, m);
        return {width: o.scrollWidth, height: o.scrollHeight};
    };
    l.prototype.destroy = function () {
        g.remove(this._shadow);
    };
    e.exports = l;
}, null);
__d("Grid.react", ["React", "cx", "flattenChildren", "getObjectValues", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = g.PropTypes, m = g.createClass({displayName: 'Grid', propTypes: {cols: l.number.isRequired, fixed: l.bool, alignv: l.oneOf(['top', 'middle', 'bottom']), alignh: l.oneOf(['left', 'center', 'right']), spacing: l.string}, render: function () {
        var p = j(i(this.props.children)), q = p.length, r = [], s = [], t = 0;
        p.forEach(function (u, v) {
            if (u.type !== n.type)u = g.createElement(n, null, u);
            u.props.alignv = u.props.alignv || this.props.alignv;
            u.props.alignh = u.props.alignh || this.props.alignh;
            if (this.props.spacing)o(u, this.props.spacing);
            s.push(u);
            t += Math.max(u.props.colSpan || 0, 1);
            if (t % this.props.cols === 0 || v + 1 === q) {
                if (this.props.fixed && t < this.props.cols) {
                    for (var w = t; w < this.props.cols; w++)s.push(g.createElement(n, null));
                    t = this.props.cols;
                }
                if (t === this.props.cols)o(s[s.length - 1], "_51mw");
                r.push(g.createElement(g.DOM.tr, {className: "_51mx", key: v}, s));
                s = [];
                t = 0;
            }
        }, this);
        return (g.createElement(g.DOM.table, Object.assign({}, this.props, {className: k(this.props.className, (("uiGrid") + (' ' + "_51mz") + (this.props.fixed ? ' ' + "_5f0n" : ''))), cellSpacing: "0", cellPadding: "0"}), g.createElement(g.DOM.tbody, null, r)));
    }}), n = g.createClass({displayName: 'GridItem', propTypes: {alignv: l.oneOf(['top', 'middle', 'bottom']), alignh: l.oneOf(['left', 'center', 'right'])}, render: function () {
        var p = k(this.props.className, (("_51m-") + (this.props.alignv === 'top' ? ' ' + "vTop" : '') + (this.props.alignv === 'middle' ? ' ' + "vMid" : '') + (this.props.alignv === 'bottom' ? ' ' + "vBot" : '') + (this.props.alignh === 'left' ? ' ' + "hLeft" : '') + (this.props.alignh === 'center' ? ' ' + "hCent" : '') + (this.props.alignh === 'right' ? ' ' + "hRght" : '')));
        return (g.createElement(g.DOM.td, Object.assign({}, this.props, {className: p})));
    }}), o = function (p, q) {
        p.props.className = k(p.props.className, q);
    };
    m.GridItem = n;
    e.exports = m;
}, null);
__d("WaterfallIDGenerator", ["CurrentUser", "md5"], function (a, b, c, d, e, f, g, h) {
    function i() {
        var l = 2147483647;
        return Math.random() * l;
    }

    function j() {
        return Math.floor(Date.now() / 1000);
    }

    var k = {generate: function () {
        return h([g.getID(), j(), i()].join(':'));
    }};
    e.exports = k;
}, null);
__d("ChatBehavior", ["Arbiter", "AvailableList", "AvailableListConstants", "copyProperties", "MercuryConstants", "ChatSidebarCalloutData"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = b('MercuryConstants').ChatNotificationConstants, l = b('ChatSidebarCalloutData').isShown, m = h.getWebChatNotification(), n = l, o = true, p = j(new g(), {ON_CHANGED: 'changed', notifiesUserMessages: function () {
        return m !== k.NO_USER_MESSAGE_NOTIFICATION;
    }, ignoresRemoteTabRaise: function () {
        return n;
    }, showsTabUnreadUI: function () {
        return o;
    }});

    function q() {
        p.inform(p.ON_CHANGED);
    }

    h.subscribe(i.ON_CHAT_NOTIFICATION_CHANGED, function () {
        var r = m, s = h.getWebChatNotification();
        m = s;
        if (r != s)q();
    });
    g.subscribe('chat/set_does_page_occlude_tabs', function (r, s) {
        n = !!s;
        q();
    });
    g.subscribe('chat/set_show_tab_unread_ui', function (r, s) {
        o = !!s;
        q();
    });
    e.exports = p;
}, null);
__d("AsyncUploadBase", ["ArbiterMixin", "AsyncRequest", "AsyncResponse", "BrowserSupport", "Form", "copyProperties", "mixin", "removeFromArray"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = m(g);
    for (var p in o)if (o.hasOwnProperty(p))r[p] = o[p];
    var q = o === null ? null : o.prototype;
    r.prototype = Object.create(q);
    r.prototype.constructor = r;
    r.__superConstructor__ = o;
    r.parseFiles = function (t) {
        "use strict";
        var u = {};
        for (var v in t) {
            var w = t[v];
            if (Array.isArray(w)) {
                u[v] = w;
            } else {
                u[v] = [];
                if (w instanceof window.FileList) {
                    for (var x = 0; x < w.length; x++)u[v].push(w.item(x));
                } else if (w instanceof window.File || w instanceof window.Blob)u[v].push(w);
            }
        }
        return u;
    };
    function r(t) {
        "use strict";
        this.setURI(t);
        this.setNetworkErrorRetryLimit(0);
    }

    r.prototype.setAllowCrossOrigin = function (t) {
        "use strict";
        this._allowCrossOrigin = !!t;
        return this;
    };
    r.prototype.setData = function (t) {
        "use strict";
        this._data = t;
        return this;
    };
    r.prototype.setNetworkErrorRetryLimit = function (t) {
        "use strict";
        this._retryLimit = t;
        return this;
    };
    r.prototype.setLimit = function (t) {
        "use strict";
        this._limit = t;
        return this;
    };
    r.prototype.setPreprocessHandler = function (t) {
        "use strict";
        this._preprocessHandler = t;
        return this;
    };
    r.prototype.setRelativeTo = function (t) {
        "use strict";
        this._relativeTo = t;
        return this;
    };
    r.prototype.setStatusElement = function (t) {
        "use strict";
        this._statusElement = t;
        return this;
    };
    r.prototype.setURI = function (t) {
        "use strict";
        this._uri = t;
        return this;
    };
    r.prototype.suspend = function () {
        "use strict";
        this._suspended = true;
        return this;
    };
    r.prototype.resume = function () {
        "use strict";
        this._suspended = false;
        this._processQueue();
        return this;
    };
    r.prototype.isUploading = function () {
        "use strict";
        return this._inFlight;
    };
    r.prototype._createFileUpload = function (t, u, v) {
        "use strict";
        return new s(t, u, v);
    };
    r.prototype._processQueue = function () {
        "use strict";
        if (this._suspended)return;
        while (this._pending.length < this._limit) {
            if (!this._waiting.length)break;
            var t = this._waiting.shift();
            if (this._preprocessHandler) {
                this._preprocessHandler(t, this._processUpload.bind(this));
            } else this._processUpload(t);
            this._pending.push(t);
        }
    };
    r.prototype._processUpload = function (t) {
        "use strict";
        var u = k.createFormData(t.getData() || this._data);
        if (t.getFile()) {
            u.append(t.getName(), t.getFile());
            var v = t.getFile().uploadID;
            if (v)u.append('upload_id', v);
        }
        var w = new h().setAllowCrossOrigin(this._allowCrossOrigin).setURI(this._uri).setRawData(u).setStatusElement(this._statusElement).setHandler(this._success.bind(this, t)).setErrorHandler(this._failure.bind(this, t)).setUploadProgressHandler(this._progress.bind(this, t)).setInitialHandler(this._initial.bind(this, t));
        if (this._relativeTo)w.setRelativeTo(this._relativeTo);
        w.send();
        t.setAsyncRequest(w);
        this._inFlight = true;
        if (!t.getRetryCount())this.inform('start', t);
    };
    r.prototype._abort = function (t) {
        "use strict";
        n(this._waiting, t);
        t.abort();
    };
    r.prototype._initial = function (t) {
        "use strict";
        this.inform('initial', t);
    };
    r.prototype._success = function (t, u) {
        "use strict";
        this._complete(t);
        this.inform('success', t.handleSuccess(u));
        this._processQueue();
    };
    r.prototype._retryUpload = function (t) {
        "use strict";
        t.increaseRetryCount();
        this._processUpload(t);
    };
    r.prototype._failure = function (t, u) {
        "use strict";
        if (u.error === 1004 && t.getRetryCount() < this._retryLimit)return this._retryUpload(t);
        this._complete(t);
        if (this.inform('failure', t.handleFailure(u)) !== false)i.defaultErrorHandler(u);
        this._processQueue();
    };
    r.prototype._progress = function (t, event) {
        "use strict";
        this.inform('progress', t.handleProgress(event));
    };
    r.prototype._complete = function (t) {
        "use strict";
        n(this._pending, t);
        if (!this._pending.length)this._inFlight = false;
    };
    r.isSupported = function () {
        "use strict";
        return j.hasFileAPI();
    };
    l(r.prototype, {_limit: 10});
    function s(t, u, v) {
        "use strict";
        this._name = t;
        this._file = u;
        this._data = v;
        this._success = null;
        this._response = null;
        this._progressEvent = null;
        this._request = null;
        this._numRetries = 0;
    }

    s.prototype.getName = function () {
        "use strict";
        return this._name;
    };
    s.prototype.getFile = function () {
        "use strict";
        return this._file;
    };
    s.prototype.setFile = function (t) {
        "use strict";
        this._file = t;
    };
    s.prototype.getData = function () {
        "use strict";
        return this._data;
    };
    s.prototype.isComplete = function () {
        "use strict";
        return this._success !== null;
    };
    s.prototype.isSuccess = function () {
        "use strict";
        return this._success === true;
    };
    s.prototype.getResponse = function () {
        "use strict";
        return this._response;
    };
    s.prototype.getProgressEvent = function () {
        "use strict";
        return this._progressEvent;
    };
    s.prototype.setAsyncRequest = function (t) {
        "use strict";
        this._request = t;
        return this;
    };
    s.prototype.increaseRetryCount = function () {
        "use strict";
        this._numRetries++;
        return this;
    };
    s.prototype.getRetryCount = function () {
        "use strict";
        return this._numRetries;
    };
    s.prototype.isWaiting = function () {
        "use strict";
        return !this._request;
    };
    s.prototype.abort = function () {
        "use strict";
        this._request && this._request.abort();
        this._request = null;
    };
    s.prototype.handleSuccess = function (t) {
        "use strict";
        this._success = true;
        this._response = t;
        this._progressEvent = null;
        return this;
    };
    s.prototype.handleFailure = function (t) {
        "use strict";
        this._success = false;
        this._response = t;
        this._progressEvent = null;
        return this;
    };
    s.prototype.handleProgress = function (event) {
        "use strict";
        this._progressEvent = event;
        return this;
    };
    e.exports = r;
}, null);
__d("AsyncUploadRequest", ["AsyncUploadBase"], function (a, b, c, d, e, f, g) {
    for (var h in g)if (g.hasOwnProperty(h))j[h] = g[h];
    var i = g === null ? null : g.prototype;
    j.prototype = Object.create(i);
    j.prototype.constructor = j;
    j.__superConstructor__ = g;
    function j() {
        "use strict";
        if (g !== null)g.apply(this, arguments);
    }

    j.prototype.setFiles = function (k) {
        "use strict";
        this._files = g.parseFiles(k);
        return this;
    };
    j.prototype.send = function () {
        "use strict";
        if (this._inFlight)return;
        this._inFlight = true;
        this._uploads = [];
        for (var k in this._files)this._files[k].forEach(function (l) {
            this._uploads.push(this._createFileUpload(k, l));
        }.bind(this));
        this._waiting = this._uploads.slice(0);
        this._pending = [];
        if (this._uploads.length) {
            this._processQueue();
        } else this._processUpload(this._createFileUpload(null, null));
    };
    j.prototype._processQueue = function () {
        "use strict";
        i._processQueue.call(this);
        if (!this._pending.length && !this._waiting.length)this.inform('complete', this._uploads);
    };
    j.isSupported = function () {
        "use strict";
        return g.isSupported();
    };
    e.exports = j;
}, null);
__d("DOMClone", [], function (a, b, c, d, e, f) {
    var g = {shallowClone: function (i) {
        return h(i, false);
    }, deepClone: function (i) {
        return h(i, true);
    }};

    function h(i, j) {
        var k = i.cloneNode(j);
        if (typeof k.__FB_TOKEN !== 'undefined')delete k.__FB_TOKEN;
        return k;
    }

    e.exports = g;
}, null);
__d("FileForm", ["ArbiterMixin", "AsyncRequest", "AsyncResponse", "AsyncUploadRequest", "BehaviorsMixin", "CurrentUser", "DataStore", "DOMQuery", "Event", "Form", "JSONPTransport", "Parent", "URI", "copyProperties", "mixin", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    function w(ca) {
        var da = {}, ea = n.scry(ca, 'input[type="file"]');
        ea.forEach(function (fa) {
            da[fa.name] = fa.files;
        });
        return da;
    }

    function x(ca) {
        var da = n.scry(ca, 'input[type="file"]');
        da.forEach(function (ea) {
            ea.files = null;
        });
    }

    var y = u(g, k);
    for (var z in y)if (y.hasOwnProperty(z))ba[z] = y[z];
    var aa = y === null ? null : y.prototype;
    ba.prototype = Object.create(aa);
    ba.prototype.constructor = ba;
    ba.__superConstructor__ = y;
    function ba(ca, da, ea) {
        "use strict";
        if (ca.getAttribute('rel') === 'async')throw new Error('FileForm cannot be used with Primer forms.');
        if (ca.getAttribute('method').toUpperCase() !== 'POST')throw new Error('FileForm must be used with POST forms.');
        this._form = ca;
        this._previousEncoding = this._form.enctype;
        this._form.enctype = this._form.encoding = 'multipart/form-data';
        this._files = null;
        da && this.enableBehaviors(da);
        this._options = ea || {};
        this.setAllowCrossOrigin(this._options.allowCrossOrigin);
        this.setUploadInParallel(this._options.uploadInParallel);
        this.setConcurrentLimit(this._options.concurrentLimit);
        this.setPreprocessHandler(this._options.preprocessHandler);
        this.setNetworkErrorRetryLimit(this._options.networkErrorRetryLimit);
        this._listeners = [o.listen(this._form, 'submit', this._submit.bind(this)), o.listen(this._form, 'click', this._click.bind(this))];
        m.set(this._form, 'FileForm', this);
    }

    ba.prototype.getRoot = function () {
        "use strict";
        return this._form;
    };
    ba.prototype.setAllowCrossOrigin = function (ca) {
        "use strict";
        this._allowCrossOrigin = !!ca;
        return this;
    };
    ba.prototype.setUploadInParallel = function (ca) {
        "use strict";
        this._uploadInParallel = !!ca;
        return this;
    };
    ba.prototype.setConcurrentLimit = function (ca) {
        "use strict";
        this._concurrentLimit = ca;
        return this;
    };
    ba.prototype.setPreprocessHandler = function (ca) {
        "use strict";
        this._preprocessHandler = ca;
        return this;
    };
    ba.prototype.setNetworkErrorRetryLimit = function (ca) {
        "use strict";
        this._retryLimit = ca;
        return this;
    };
    ba.prototype.setFiles = function (ca) {
        "use strict";
        this._files = ca;
        return this;
    };
    ba.prototype.canUseXHR = function () {
        "use strict";
        var ca = 'FormData' in window;
        if (ca)if (!s(this._form.action).isSameOrigin() && !this._allowCrossOrigin)ca = false;
        return ca;
    };
    ba.prototype._submit = function (event) {
        "use strict";
        if (this.inform('submit') === false) {
            event.prevent();
            return;
        }
        return this.canUseXHR() ? this._sendViaXHR(event) : this._sendViaFrame(event);
    };
    ba.prototype._click = function (event) {
        "use strict";
        var ca = event.getTarget();
        while (n.isElementNode(ca)) {
            if (ca.type === 'submit') {
                this._clickTarget = ca;
                setTimeout(this._unclick.bind(this), 0);
                break;
            }
            ca = ca.parentNode;
        }
    };
    ba.prototype._unclick = function () {
        "use strict";
        this._clickTarget = null;
    };
    ba.prototype._sendViaFrame = function (event) {
        "use strict";
        var ca = this._request = new h();
        ca.setStatusElement(this._getStatusElement());
        ca.addStatusIndicator();
        ca.setOption('useIframeTransport', true);
        var da = ca.handleResponse.bind(ca), ea = new q('iframe', this._form.action, da), fa = ea.getTransportFrame(), ga = ea.getRequestURI().addQueryData({__iframe: true, __user: l.getID()});
        this._form.setAttribute('action', ga.toString());
        this._form.setAttribute('target', fa.name);
        ca.setJSONPTransport(ea);
        ca.setURI(ga);
        ca.setHandler(this.success.bind(this, null));
        ca.setErrorHandler(this.failure.bind(this, null));
        ca.setInitialHandler(v(this.initial, this, null));
    };
    ba.prototype._sendViaXHR = function (event) {
        "use strict";
        var ca;
        if (this._uploadInParallel && j.isSupported()) {
            ca = new j().setPreprocessHandler(this._preprocessHandler).setData(p.serialize(this._form, this._clickTarget)).setNetworkErrorRetryLimit(this._retryLimit);
            if (this._concurrentLimit)ca.setLimit(this._concurrentLimit);
            if (this._files) {
                ca.setFiles(this._files);
            } else ca.setFiles(w(this._form));
            var da = [ca.subscribe('progress', function (ia, ja) {
                this.progress(ja, ja.getProgressEvent());
            }.bind(this)), ca.subscribe('initial', function (ia, ja) {
                this.initial(ja, ja.getResponse());
            }.bind(this)), ca.subscribe('success', function (ia, ja) {
                this.success(ja, ja.getResponse());
            }.bind(this)), ca.subscribe('start', function (ia, ja) {
                this.inform('start', {upload: ja});
            }.bind(this)), ca.subscribe('failure', function (ia, ja) {
                this.failure(ja, ja.getResponse());
                return false;
            }.bind(this)), ca.subscribe('complete', function () {
                while (da.length)da.pop().unsubscribe();
            })];
        } else {
            var ea;
            if (this._files) {
                ea = p.createFormData(p.serialize(this._form, this._clickTarget));
                var fa = j.parseFiles(this._files);
                for (var ga in fa) {
                    var ha = fa[ga];
                    if (ha.length === 1) {
                        ea.append(ga, ha[0]);
                    } else {
                        ga = ga + '[]';
                        ha.forEach(function (ia) {
                            ea.append(ga, ia);
                        });
                    }
                }
            } else ea = p.createFormData(this._form, this._clickTarget);
            ca = new h().setRawData(ea).setHandler(this.success.bind(this, null)).setErrorHandler(this.failure.bind(this, null)).setUploadProgressHandler(this.progress.bind(this, null)).setInitialHandler(v(this.initial, this, null));
        }
        ca.setAllowCrossOrigin(this._allowCrossOrigin).setRelativeTo(this._form).setStatusElement(this._getStatusElement()).setURI(this._form.action).send();
        this._request = ca;
        event && event.prevent();
    };
    ba.prototype.forceSendViaXHR = function () {
        "use strict";
        return this._sendViaXHR(null);
    };
    ba.prototype.initial = function (ca) {
        "use strict";
        return this.inform('initial', {upload: ca});
    };
    ba.prototype.success = function (ca, da) {
        "use strict";
        var ea = {response: da, upload: ca};
        if (this.inform('success', ea) !== false)o.fire(this._form, 'success', ea);
        this._cleanup();
    };
    ba.prototype.failure = function (ca, da) {
        "use strict";
        var ea = {response: da, upload: ca};
        if (this.inform('failure', ea) !== false)if (o.fire(this._form, 'error', ea) !== false)i.defaultErrorHandler(da);
        this._cleanup();
    };
    ba.prototype.progress = function (ca, event) {
        "use strict";
        this.inform('progress', {event: event, upload: ca});
    };
    ba.prototype.abort = function () {
        "use strict";
        if (this._request) {
            this._request.abort();
            this._cleanup();
        }
    };
    ba.prototype.clear = function () {
        "use strict";
        x(this._form);
    };
    ba.prototype.destroy = function () {
        "use strict";
        this._cleanup();
        while (this._listeners.length)this._listeners.pop().remove();
        this._listeners = null;
        this._form.enctype = this._form.encoding = this._previousEncoding;
        m.remove(this._form, 'FileForm');
    };
    ba.prototype._cleanup = function () {
        "use strict";
        this._request = null;
    };
    ba.prototype._getStatusElement = function () {
        "use strict";
        return r.byClass(this._form, 'stat_elem') || this._form;
    };
    ba.getInstance = function (ca) {
        "use strict";
        return m.get(ca, 'FileForm');
    };
    t(ba, {EVENTS: ['start', 'submit', 'initial', 'progress', 'success', 'failure']});
    e.exports = ba;
}, null);
__d("FileInput", ["ArbiterMixin", "DOM", "DOMClone", "Event", "Focus", "Keys", "UserAgent_DEPRECATED", "cx", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = m.ie(), q = o(g);
    for (var r in q)if (q.hasOwnProperty(r))t[r] = q[r];
    var s = q === null ? null : q.prototype;
    t.prototype = Object.create(s);
    t.prototype.constructor = t;
    t.__superConstructor__ = q;
    function t(u, v, w) {
        "use strict";
        this.container = u;
        this.control = v;
        var x = h.scry(this.container, 'a')[0];
        x && x.removeAttribute('href');
        var y = h.create('div', {className: "_3jk"}, w);
        h.appendContent(this.control, y);
        this._boundHandleChange = this._handleChange.bind(this);
        if (p)this._boundHandleIEKeyDown = this._handleIEKeyDown.bind(this);
        this._setInputElement(w);
    }

    t.prototype.getValue = function () {
        "use strict";
        return this.input.value;
    };
    t.prototype.getInput = function () {
        "use strict";
        return this.input;
    };
    t.prototype.clear = function () {
        "use strict";
        if (p) {
            var u = i.deepClone(this.input);
            h.replace(this.input, u);
            this._setInputElement(u);
        } else this.input.value = '';
    };
    t.prototype.destroy = function () {
        "use strict";
        this._listener.remove();
        this._listener = null;
        if (p) {
            this._IEKeyDownListener.remove();
            this._IEKeyDownListener = null;
        }
        this.container = null;
        this.control = null;
        this.input = null;
    };
    t.prototype._setInputElement = function (u) {
        "use strict";
        this.input = u;
        k.relocate(u, this.control);
        this._listener && this._listener.remove();
        this._listener = j.listen(u, 'change', this._boundHandleChange);
        if (p) {
            this._IEKeyDownListener && this._IEKeyDownListener.remove();
            this._IEKeyDownListener = j.listen(u, 'keydown', this._boundHandleIEKeyDown);
        }
    };
    t.prototype._handleChange = function (event) {
        "use strict";
        this.inform('change', event);
        var u = this.input.form;
        if (u && p < 9)j.fire(u, 'change', event);
    };
    t.prototype._handleIEKeyDown = function (event) {
        "use strict";
        if (event.keyCode === l.RETURN) {
            event.preventDefault();
            var u = document.createEvent('MouseEvents');
            u.initEvent('click', true, true);
            this.input.dispatchEvent(u);
        }
    };
    e.exports = t;
}, null);
__d("swfobject", ["AsyncRequest", "Bootloader", "CSS", "copyProperties", "htmlSpecialChars"], function (a, b, c, d, e, f, g, h, i, j, k) {
    if (typeof l == "undefined")var l = {};
    if (typeof l.util == "undefined")l.util = {};
    if (typeof l.SWFObjectUtil == "undefined")l.SWFObjectUtil = {};
    l.SWFObject = function (n, o, p, q, r, s, t, u, v, w) {
        if (!document.getElementById)return;
        this.DETECT_KEY = w ? w : 'detectflash';
        this.skipDetect = l.util.getRequestParameter(this.DETECT_KEY);
        this.params = {};
        this.variables = {};
        this.attributes = [];
        this.fallback_html = '';
        this.fallback_js_fcn = function () {
        };
        if (n)this.setAttribute('swf', n);
        if (o)this.setAttribute('id', o);
        if (p)this.setAttribute('width', p);
        if (q)this.setAttribute('height', q);
        this.installedVer = l.SWFObjectUtil.getPlayerVersion();
        if (r) {
            if (!(r instanceof Array))r = [r];
            var x;
            r.forEach(function (aa) {
                x = new l.PlayerVersion(aa.toString().split('.'));
                if (x.major == this.installedVer.major) {
                    this.setAttribute('version', x);
                    return;
                } else if (!this.getAttribute('version') || x.major < this.getAttribute('version').major)this.setAttribute('version', x);
            }.bind(this));
        }
        if (!window.opera && document.all && this.installedVer.major > 7)if (!l.unloadSet) {
            l.SWFObjectUtil.prepUnload = function () {
                var aa = function () {
                }, ba = function () {
                };
                window.attachEvent("onunload", l.SWFObjectUtil.cleanupSWFs);
            };
            window.attachEvent("onbeforeunload", l.SWFObjectUtil.prepUnload);
            l.unloadSet = true;
        }
        if (s)this.addParam('bgcolor', s);
        var y = t ? t : 'high';
        this.addParam('quality', y);
        this.setAttribute('useExpressInstall', false);
        this.setAttribute('doExpressInstall', false);
        var z = (u) ? u : window.location;
        this.setAttribute('xiRedirectUrl', z);
        this.setAttribute('redirectUrl', '');
        if (v)this.setAttribute('redirectUrl', v);
    };
    l.SWFObject.ieWorkaroundApplied = false;
    l.SWFObject.ensureIEWorkaroundAttached = function () {
        if (!l.SWFObject.ieWorkaroundApplied && document.attachEvent) {
            l.SWFObject.ieWorkaroundApplied = true;
            document.attachEvent('onpropertychange', l.SWFObject.onDocumentPropertyChange);
        }
    };
    l.SWFObject.onDocumentPropertyChange = function (event) {
        if (event.propertyName == "title") {
            var n = document.title;
            if (n != null && n.indexOf('#!') != -1) {
                n = n.substring(0, n.indexOf('#!'));
                document.title = n;
            }
        }
    };
    j(l.SWFObject.prototype, {useExpressInstall: function (n) {
        this.xiSWFPath = !n ? "/swf/expressinstall.swf" : n;
        this.setAttribute('useExpressInstall', true);
    }, setAttribute: function (n, o) {
        this.attributes[n] = o;
    }, getAttribute: function (n) {
        return this.attributes[n] || "";
    }, addParam: function (n, o) {
        this.params[n] = o;
    }, getParams: function () {
        return this.params;
    }, addVariable: function (n, o) {
        this.variables[n] = o;
    }, getVariable: function (n) {
        return this.variables[n] || "";
    }, getVariables: function () {
        return this.variables;
    }, getVariablePairs: function () {
        var n = [], o, p = this.getVariables();
        for (o in p)n[n.length] = o + "=" + p[o];
        return n.join('&');
    }, getSWFHTML: function () {
        var n, o, p;
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            if (this.getAttribute("doExpressInstall")) {
                this.addVariable("MMplayerType", "PlugIn");
                this.setAttribute('swf', this.xiSWFPath);
            }
            o = {type: 'application/x-shockwave-flash', src: this.getAttribute('swf'), width: this.getAttribute('width'), height: this.getAttribute('height'), style: this.getAttribute('style') || 'display: block;', id: this.getAttribute('id'), name: this.getAttribute('id')};
            var q = this.getParams();
            for (var r in q)o[r] = q[r];
            p = this.getVariablePairs();
            if (p)o.flashvars = p;
            n = m('embed', o, null);
        } else {
            if (this.getAttribute("doExpressInstall")) {
                this.addVariable("MMplayerType", "ActiveX");
                this.setAttribute('swf', this.xiSWFPath);
            }
            o = {id: this.getAttribute('id'), classid: 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000', width: this.getAttribute('width'), height: this.getAttribute('height'), style: this.getAttribute('style') || 'display: block;'};
            var s = m('param', {name: 'movie', value: this.getAttribute('swf')}, null), q = this.getParams();
            for (var r in q)s += m('param', {name: r, value: q[r]}, null);
            p = this.getVariablePairs();
            if (p)s += m('param', {name: 'flashvars', value: p}, null);
            n = m('object', o, s);
        }
        return n;
    }, write: function (n) {
        if (this.getAttribute('useExpressInstall')) {
            var o = new l.PlayerVersion([6, 0, 65]);
            if (this.installedVer.versionIsValid(o) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
                this.setAttribute('doExpressInstall', true);
                this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
                document.title = document.title.slice(0, 47) + " - Flash Player Installation";
                this.addVariable("MMdoctitle", document.title);
            }
        }
        var p = (typeof n == 'string') ? document.getElementById(n) : n;
        if (!p)return false;
        i.addClass(p, 'swfObject');
        p.setAttribute('data-swfid', this.getAttribute('id'));
        if (this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version'))) {
            l.SWFObject.ensureIEWorkaroundAttached();
            p.innerHTML = this.getSWFHTML();
            return true;
        } else {
            if (this.getAttribute('redirectUrl') != "")document.location.replace(this.getAttribute('redirectUrl'));
            var q = this.getAttribute('version').major + '.' + this.getAttribute('version').minor + '.' + this.getAttribute('version').release + '.' + this.getAttribute('version').build, r = this.installedVer.major + '.' + this.installedVer.minor + '.' + this.installedVer.release + '.' + this.installedVer.build;
            this.fallback_js_fcn(r, q);
            p.innerHTML = this.fallback_html;
        }
        return false;
    }});
    l.SWFObjectUtil.getPlayerVersion = function () {
        var n = new l.PlayerVersion([0, 0, 0, 0]), o;
        if (navigator.plugins && navigator.mimeTypes.length) {
            for (var p = 0; p < navigator.plugins.length; p++)try {
                var r = navigator.plugins[p];
                if (r.name == 'Shockwave Flash') {
                    o = new l.PlayerVersion(r.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+(r|d)|\s+b[0-9]+)/, ".").split("."));
                    if (typeof n == 'undefined' || o.major > n.major || (o.major == n.major && (o.minor > n.minor || (o.minor == n.minor && (o.release > n.release || (o.release == n.release && o.build > n.build))))))n = o;
                }
            } catch (q) {
            }
        } else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) {
            var s = 1, t = 3;
            while (s)try {
                t++;
                s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + t);
                n = new l.PlayerVersion([t, 0, 0]);
            } catch (u) {
                s = null;
            }
        } else {
            try {
                var s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            } catch (v) {
                try {
                    var s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    n = new l.PlayerVersion([6, 0, 21]);
                    s.AllowScriptAccess = "always";
                } catch (w) {
                    if (n.major == 6)return n;
                }
                try {
                    s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                } catch (x) {
                }
            }
            if (s != null)n = new l.PlayerVersion(s.GetVariable("$version").split(" ")[1].split(","));
        }
        return n;
    };
    l.PlayerVersion = function (n) {
        this.major = n[0] != null ? parseInt(n[0], 10) : 0;
        this.minor = n[1] != null ? parseInt(n[1], 10) : 0;
        this.release = n[2] != null ? parseInt(n[2], 10) : 0;
        this.build = n[3] != null ? parseInt(n[3], 10) : 0;
    };
    l.PlayerVersion.prototype.versionIsValid = function (n) {
        if (this.major < n.major)return false;
        if (this.major > n.major)return true;
        if (this.minor < n.minor)return false;
        if (this.minor > n.minor)return true;
        if (this.release < n.release)return false;
        if (this.release > n.release)return true;
        if (this.build < n.build)return false;
        return true;
    };
    l.util = {getRequestParameter: function (n) {
        var o = document.location.search || document.location.hash;
        if (n == null)return o;
        if (o) {
            var p = o.substring(1).split("&");
            for (var q = 0; q < p.length; q++)if (p[q].substring(0, p[q].indexOf("=")) == n)return p[q].substring((p[q].indexOf("=") + 1));
        }
        return "";
    }};
    l.SWFObjectUtil.cleanupSWFs = function () {
        var n = document.getElementsByTagName("OBJECT");
        for (var o = n.length - 1; o >= 0; o--) {
            n[o].style.display = 'none';
            for (var p in n[o])if (typeof n[o][p] == 'function')n[o][p] = function () {
            };
        }
    };
    if (!document.getElementById && document.all)document.getElementById = function (n) {
        return document.all[n];
    };
    l.spawn_flash_update_dialog = function () {
        new g().setURI('/ajax/flash_update_dialog.php').setMethod('GET').setReadOnly(true).send();
    };
    l.showFlashErrorDialog = function (n, o) {
        h.loadModules(["ErrorDialog"], function (p) {
            p.show(n, o);
        });
    };
    function m(n, o, p) {
        var q = /^[A-Za-z0-9\-]+$/;
        if (!n.match(q))throw new Error('Invalid tag ' + n);
        var r = '<' + n;
        for (var s in o) {
            if (!s.match(q))throw new Error('Invalid attr ' + s);
            r += ' ' + s + '="' + k(o[s]) + '"';
        }
        if (p === null) {
            return r + '/>';
        } else return r + '>' + p + '</' + n + '>';
    }

    e.exports = a.deconcept || l;
}, null);
__d("SoundPlayer", ["Arbiter", "URI", "createArrayFrom", "swfobject"], function (a, b, c, d, e, f, g, h, i) {
    var j = b('swfobject').SWFObject, k = {}, l = null, m = false, n = 'so_sound_player', o = '/swf/SoundPlayer.swf?v=1', p = '10.0.22.87', q = null;

    function r(z) {
        var aa = h(z);
        if (!aa.getDomain())return h().setPath(aa.getPath()).toString();
        return z;
    }

    function s(z) {
        var aa = h(z).getPath();
        if (/\.mp3$/.test(aa))return 'audio/mpeg';
        if (/\.og[ga]$/.test(aa))return 'audio/ogg';
        return '';
    }

    function t() {
        if (!q) {
            var z = document.createElement('audio');
            if (!z || !z.canPlayType)return null;
            z.setAttribute('preload', 'auto');
            document.body.appendChild(z);
            q = z;
        }
        return q;
    }

    function u() {
        var z = document[n] || window[n];
        if (z)if (!z.playSound && z.length)z = z[0];
        return (z && z.playSound && z.loopSound) ? z : null;
    }

    function v() {
        return m;
    }

    function w(z, aa, ba) {
        l = {path: z, sync: aa, loop: ba};
    }

    function x() {
        m = true;
        if (l) {
            var z = u();
            if (l.loop) {
                z.loopSound(l.path, l.sync);
            } else z.playSound(l.path, l.sync);
        }
    }

    var y = {init: function (z) {
        z = i(z);
        var aa;
        for (var ba = 0; ba < z.length; ++ba) {
            aa = z[ba];
            if (k[aa])return;
        }
        var ca = t();
        for (ba = 0; ca && ba < z.length; ++ba) {
            aa = z[ba];
            if (ca.canPlayType(aa)) {
                k[aa] = true;
                return;
            }
        }
        k['audio/mpeg'] = true;
        if (u())return;
        try {
            g.registerCallback(x, ['sound/player_ready', 'sound/ready']);
            var ea = document.createElement('div');
            ea.id = 'sound_player_holder';
            document.body.appendChild(ea);
            var fa = new j(o, n, '1px', '1px', [p], '#ffffff');
            fa.addParam('allowscriptaccess', 'always');
            fa.addParam('wmode', 'transparent');
            fa.addVariable('swf_id', n);
            fa.fallback_html = ' ';
            fa.write(ea.id);
            window[n] = fa;
            g.inform('sound/player_ready');
        } catch (da) {
        }
    }, play: function (z, aa) {
        z = i(z);
        var ba = t(), ca, da;
        for (var ea = 0; ba && ea < z.length; ++ea) {
            ca = z[ea];
            da = s(ca);
            if (!ba.canPlayType(da))continue;
            y.init([da]);
            ba.src = r(ca);
            if (aa) {
                ba.setAttribute('loop', '');
            } else ba.removeAttribute('loop');
            ba.play();
            return;
        }
        for (ea = 0; ea < z.length; ++ea) {
            ca = r(z[ea]);
            da = s(ca);
            if (da != 'audio/mpeg')continue;
            y.init([da]);
            var fa = u();
            if (!v()) {
                w(ca, true, aa);
                return;
            } else if (fa) {
                if (aa) {
                    fa.loopSound(ca, true);
                } else fa.playSound(ca, true);
                return;
            }
        }
    }, stop: function (z) {
        z = i(z);
        for (var aa = 0; aa < z.length; ++aa) {
            var ba = r(z[aa]), ca = t(), da = u();
            if (ca && ca.src == ba) {
                ca.pause();
                ca.src = undefined;
            } else da && da.stopSound(ba);
        }
    }};
    e.exports = y;
}, null);
__d("SoundSynchronizer", ["SoundPlayer", "WebStorage", "createArrayFrom"], function (a, b, c, d, e, f, g, h, i) {
    var j = 'fb_sounds_playing3';

    function k() {
        var o = h.getLocalStorage();
        if (o)try {
            var q = o[j];
            if (q) {
                q = JSON.parse(q);
                if (Array.isArray(q))return q;
            }
        } catch (p) {
        }
        return [];
    }

    function l(o) {
        var p = h.getLocalStorage();
        if (p) {
            var q = k();
            q.push(o);
            while (q.length > 5)q.shift();
            try {
                p[j] = JSON.stringify(q);
            } catch (r) {
            }
        }
    }

    function m(o) {
        return k().some(function (p) {
            return p === o;
        });
    }

    var n = {play: function (o, p, q) {
        o = i(o);
        p = p || (o[0] + Math.floor(Date.now() / 1000));
        if (m(p))return;
        g.play(o, q);
        l(p);
    }, isSupported: function () {
        return !!h.getLocalStorage();
    }};
    e.exports = n;
}, null);
__d("SoundRPC", ["Event", "SoundSynchronizer"], function (a, b, c, d, e, f, g, h) {
    function i(k, l, m) {
        h.play(k, l, m);
    }

    var j = {playLocal: i, playRemote: function (k, l, m, n) {
        var o = {paths: l, sync: m, loop: n};
        k.postMessage(JSON.stringify(o), '*');
    }, supportsRPC: function () {
        return !!window.postMessage;
    }, _listen: function () {
        g.listen(window, 'message', function (k) {
            if (!/\.facebook.com$/.test(k.origin))return;
            var l = JSON.parse(k.data || '{}');
            i(l.paths, l.sync, l.loop);
        });
    }};
    e.exports = j;
}, null);
__d("TextInputControl", ["DOMControl", "Event", "Input", "copyProperties", "debounce"], function (a, b, c, d, e, f, g, h, i, j, k) {
    for (var l in g)if (g.hasOwnProperty(l))n[l] = g[l];
    var m = g === null ? null : g.prototype;
    n.prototype = Object.create(m);
    n.prototype.constructor = n;
    n.__superConstructor__ = g;
    function n(o) {
        "use strict";
        g.call(this, o);
        var p = this.getRoot(), q = k(this.update.bind(this), 0);
        h.listen(p, {input: q, keydown: q, paste: q});
    }

    n.prototype.setMaxLength = function (o) {
        "use strict";
        i.setMaxLength(this.getRoot(), o);
        return this;
    };
    n.prototype.getValue = function () {
        "use strict";
        return i.getValue(this.getRoot());
    };
    n.prototype.isEmpty = function () {
        "use strict";
        return i.isEmpty(this.getRoot());
    };
    n.prototype.setValue = function (o) {
        "use strict";
        i.setValue(this.getRoot(), o);
        this.update();
        return this;
    };
    n.prototype.clear = function () {
        "use strict";
        return this.setValue('');
    };
    n.prototype.setPlaceholderText = function (o) {
        "use strict";
        i.setPlaceholder(this.getRoot(), o);
        return this;
    };
    e.exports = n;
}, null);
__d("TextAreaControl", ["Arbiter", "ArbiterMixin", "CSS", "DOMControl", "Event", "Style", "TextInputControl", "TextMetrics", "classWithMixins", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    function q(v, w) {
        return l.getFloat(v, w) || 0;
    }

    var r = o(m, p(h));
    for (var s in r)if (r.hasOwnProperty(s))u[s] = r[s];
    var t = r === null ? null : r.prototype;
    u.prototype = Object.create(t);
    u.prototype.constructor = u;
    u.__superConstructor__ = r;
    function u(v) {
        "use strict";
        this.autogrow = i.hasClass(v, 'uiTextareaAutogrow');
        r.call(this, v);
        this.width = null;
        k.listen(v, 'focus', this._handleFocus.bind(this));
    }

    u.prototype.setAutogrow = function (v) {
        "use strict";
        this.autogrow = v;
        return this;
    };
    u.prototype.onupdate = function () {
        "use strict";
        t.onupdate.call(this);
        if (this.autogrow) {
            var v = this.getRoot();
            if (!this.metrics)this.metrics = new n(v);
            if (typeof this.initialHeight === 'undefined') {
                this.isBorderBox = l.get(v, 'box-sizing') === 'border-box' || l.get(v, '-moz-box-sizing') === 'border-box' || l.get(v, '-webkit-box-sizing') === 'border-box';
                this.borderBoxOffset = q(v, 'padding-top') + q(v, 'padding-bottom') + q(v, 'border-top-width') + q(v, 'border-bottom-width');
                this.initialHeight = v.offsetHeight - this.borderBoxOffset;
            }
            var w = this.metrics.measure(), x = Math.max(this.initialHeight, w.height);
            if (this.isBorderBox)x += this.borderBoxOffset;
            if (x !== this.height) {
                this.height = x;
                l.set(v, 'height', x + 'px');
                g.inform('reflow');
                this.inform('resize');
            }
        } else if (this.metrics) {
            this.metrics.destroy();
            this.metrics = null;
        }
    };
    u.prototype.resetHeight = function () {
        "use strict";
        this.height = -1;
        this.update();
    };
    u.prototype._handleFocus = function () {
        "use strict";
        this.width = null;
    };
    u.getInstance = function (v) {
        "use strict";
        return j.getInstance(v) || new u(v);
    };
    e.exports = u;
}, null);
__d("submitForm", ["DOM"], function (a, b, c, d, e, f, g) {
    var h = function (i) {
        var j = g.scry(i, 'input[type="submit"]')[0];
        if (j) {
            j.click();
        } else {
            j = g.create('input', {type: 'submit', className: 'hidden_elem'});
            g.appendContent(i, j);
            j.click();
            g.remove(j);
        }
    };
    e.exports = h;
}, null);
__d("StickersDispatcher", ["Dispatcher", "StickerConstants", "copyProperties", "merge"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    var k = i(new g(), {_handleUpdate: function (l, m) {
        var n = j({payloadSource: l}, m);
        this.dispatch(n);
    }, handleUpdateFromViewActions: function (l) {
        this._handleUpdate(h.PayloadSource.VIEW_ACTION, l);
    }});
    e.exports = k;
}, null);
__d("ProgressBarBase", ["emptyFunction", "requestAnimationFrame", "removeFromArray", "arrayContains"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = [];

    function l(m, n) {
        "use strict";
        this._min = m || 0;
        this._max = n || 100;
        this._initialPosition = 0;
        this._position = 0;
        this._initialVelocity = 0;
        this._velocity = 0;
        this._acceleration = 0;
        this.useAcceleration = true;
        this._targetPosition = 0;
        this._targetTime = 0;
        this._startTime = null;
        this._onComplete = g;
    }

    l.prototype.setPosition = function (m) {
        "use strict";
        m = this._normalizePosition(m);
        this._initialPosition = m;
        this._position = m;
        this.updateMeter(this._position);
        this.stop();
        return this;
    };
    l.prototype.setCompleteHandler = function (m) {
        "use strict";
        this._onComplete = m || g;
        return this;
    };
    l.prototype.setTarget = function (m, n) {
        "use strict";
        this._stopAnimating();
        this._clearOnCompleteTimeout();
        this._targetPosition = m;
        var o = this._normalizePosition(m);
        this._targetTime = n;
        this._initialVelocity = this._velocity;
        this._initialPosition = this._position;
        if (this.useAcceleration) {
            this._acceleration = 2 * (o - this._initialPosition - this._initialVelocity * n) / (n * n);
        } else {
            this._acceleration = 0;
            this._velocity = this._initialVelocity = (o - this._initialPosition) / n;
        }
        if (this._position >= o) {
            this._onComplete();
        } else this._start();
        return this;
    };
    l.prototype.setNoAcceleration = function (m) {
        "use strict";
        this.useAcceleration = !m;
        return this;
    };
    l.prototype._clearOnCompleteTimeout = function () {
        "use strict";
        a.clearTimeout(this._onCompleteTimeout);
    };
    l.prototype.stop = function () {
        "use strict";
        this._clearOnCompleteTimeout();
        this._velocity = 0;
        this._initialVelocity = 0;
        this._acceleration = 0;
        this._stopAnimating();
        return this;
    };
    l.prototype._start = function () {
        "use strict";
        this._startTime = Date.now();
        this._onCompleteTimeout = a.setTimeout(function () {
            this.setPosition(this._targetPosition);
            this._onComplete();
        }.bind(this), this._targetTime);
        this._startAnimating();
        return this;
    };
    l.prototype._loop = function () {
        "use strict";
        var m = Date.now() - this._startTime;
        this._position = (.5 * this._acceleration * m * m) + (this._initialVelocity * m) + this._initialPosition;
        var n = this._velocity;
        this._velocity = this._acceleration * m + this._initialVelocity;
        var o = n < 0 !== this._velocity < 0;
        if (this._position > this._normalizePosition(this._targetPosition) || o) {
            this.setPosition(this._targetPosition);
            this._onComplete();
        } else this.updateMeter(this._position);
    };
    l.prototype.updateMeter = function (m) {
        "use strict";
        throw "Unimplemented function: updateMeter";
    };
    l.prototype._normalizePosition = function (m) {
        "use strict";
        return Math.min(Math.max((m - this._min) / (this._max - this._min), 0), 1);
    };
    l.prototype._startAnimating = function () {
        "use strict";
        if (!j(k, this)) {
            k.push(this);
            if (k.length === 1)h(l.prototype._requestAnimationFrameCallback);
        }
    };
    l.prototype._stopAnimating = function () {
        "use strict";
        i(k, this);
    };
    l.prototype._requestAnimationFrameCallback = function () {
        "use strict";
        k.forEach(function (m) {
            m._loop();
        });
        if (k.length)h(l.prototype._requestAnimationFrameCallback);
    };
    l.setPosition = function (m, n) {
        "use strict";
        m.setPosition(n);
    };
    l.setTarget = function (m, n, o) {
        "use strict";
        m.setTarget(n, o);
    };
    e.exports = l;
}, null);
__d("ProgressBar", ["ProgressBarBase", "CSS", "Style", "cx", "csx", "DOM"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    for (var m in g)if (g.hasOwnProperty(m))o[m] = g[m];
    var n = g === null ? null : g.prototype;
    o.prototype = Object.create(n);
    o.prototype.constructor = o;
    o.__superConstructor__ = g;
    function o(p, q, r) {
        "use strict";
        g.call(this, q, r);
        this._root = p;
        this._meter = l.find(p, "div._5e4k");
        this._meter2 = l.scry(p, "div._5e2g")[0];
    }

    o.prototype.getRoot = function () {
        "use strict";
        return this._root;
    };
    o.prototype.updateMeter = function (p) {
        "use strict";
        var q = Math.min(Math.max(p, 0), 1);
        h.conditionClass(this._meter, "_5e2d", q <= 0);
        h.conditionClass(this._meter, "_5e4j", q >= 1);
        q = q * 100 + '%';
        i.set(this._meter, 'width', q);
        if (this._meter2) {
            i.set(this._meter2, 'left', q);
            i.set(this._meter2, 'width', q);
        }
    };
    o.prototype.changeLabel = function (p) {
        "use strict";
        var q = l.scry(this._root, "span._5e2h");
        q.forEach(function (r) {
            l.setContent(r, p);
        });
        return this;
    };
    e.exports = o;
}, null);
__d("XStickerSearchPromotePackControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/search\/promotePack\/", {sticker_id: {type: "Int", required: true}});
}, null);
__d("XStickerTagImagesControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/tag\/images\/", {tag_ids: {type: "IntVector", required: true}});
}, null);