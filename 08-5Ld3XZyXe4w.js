/*!CK:1045696764!*//*1412036112,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["kJy0J"]);
}

__d("classWithMixins", ["copyProperties"], function (a, b, c, d, e, f, g) {
    function h(i, j) {
        var k = function () {
            i.apply(this, arguments);
        };
        k.prototype = g(Object.create(i.prototype), j.prototype);
        return k;
    }

    e.exports = h;
}, null);
__d("endsWith", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        return h.indexOf(i, h.length - i.length) > -1;
    }

    e.exports = g;
}, null);
__d("PhotosMimeType", [], function (a, b, c, d, e, f) {
    function g(h) {
        "use strict";
        if (this instanceof g === false)return new g(h);
        this.$PhotosMimeType0 = h.split('/');
    }

    g.prototype.isImage = function () {
        "use strict";
        return this.$PhotosMimeType0[0] === 'image';
    };
    g.prototype.isJpeg = function () {
        "use strict";
        return this.isImage() && (this.$PhotosMimeType0[1] === 'jpeg' || this.$PhotosMimeType0[1] === 'pjpeg');
    };
    e.exports = g;
}, null);
__d("DataTransfer", ["PhotosMimeType", "createArrayFrom", "emptyFunction"], function (a, b, c, d, e, f, g, h, i) {
    var j = new RegExp('\u000D\u000A', 'g'), k = '\u000A', l = {'text/rtf': 1, 'text/html': 1};

    function m(o) {
        if (o.kind == 'file')return o.getAsFile();
    }

    function n(o) {
        "use strict";
        this.data = o;
        this.types = o.types ? h(o.types) : [];
    }

    n.prototype.isRichText = function () {
        "use strict";
        return this.types.some(function (o) {
            return l[o];
        });
    };
    n.prototype.getText = function () {
        "use strict";
        var o;
        if (this.data.getData)if (!this.types.length) {
            o = this.data.getData('Text');
        } else if (this.types.indexOf('text/plain') != -1)o = this.data.getData('text/plain');
        return o ? o.replace(j, k) : null;
    };
    n.prototype.getHTML = function () {
        "use strict";
        if (this.data.getData)if (!this.types.length) {
            return this.data.getData('Text');
        } else if (this.types.indexOf('text/html') != -1)return this.data.getData('text/html');
    };
    n.prototype.isLink = function () {
        "use strict";
        return this.types.some(function (o) {
            return o.indexOf('url') != -1 || o.indexOf('text/uri-list') != -1;
        });
    };
    n.prototype.isImage = function () {
        "use strict";
        var o = this.types.some(function (s) {
            return s.indexOf('application/x-moz-file') != -1;
        });
        if (o)return true;
        var p = this.getFiles();
        for (var q = 0; q < p.length; q++) {
            var r = p[q].type;
            if (!g(r).isImage())return false;
        }
        return true;
    };
    n.prototype.getCount = function () {
        "use strict";
        if (this.data.hasOwnProperty('items')) {
            return this.data.items.length;
        } else if (this.data.hasOwnProperty('mozItemCount')) {
            return this.data.mozItemCount;
        } else if (this.data.files)return this.data.files.length;
        return null;
    };
    n.prototype.getFiles = function () {
        "use strict";
        if (this.data.items) {
            return Array.prototype.slice.call(this.data.items).map(m).filter(i.thatReturnsArgument);
        } else if (this.data.files) {
            return Array.prototype.slice.call(this.data.files);
        } else return [];
    };
    n.prototype.hasFiles = function () {
        "use strict";
        return this.getFiles().length > 0;
    };
    e.exports = n;
}, null);
__d("CacheStorage", ["ErrorUtils", "EventListener", "ExecutionEnvironment", "FBJSON", "WebStorage", "startsWith"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {memory: v, localstorage: t, sessionstorage: u}, n = '_@_', o = '3b', p = 'CacheStorageVersion';

    function q(x) {
        "use strict";
        this._store = x;
    }

    q.prototype.getStore = function () {
        "use strict";
        return this._store;
    };
    q.prototype.keys = function () {
        "use strict";
        var x = [];
        for (var y = 0; y < this._store.length; y++)x.push(this._store.key(y));
        return x;
    };
    q.prototype.get = function (x) {
        "use strict";
        return this._store.getItem(x);
    };
    q.prototype.set = function (x, y) {
        "use strict";
        this._store.setItem(x, y);
    };
    q.prototype.remove = function (x) {
        "use strict";
        this._store.removeItem(x);
    };
    q.prototype.clear = function () {
        "use strict";
        this._store.clear();
    };
    for (var r in q)if (q.hasOwnProperty(r))t[r] = q[r];
    var s = q === null ? null : q.prototype;
    t.prototype = Object.create(s);
    t.prototype.constructor = t;
    t.__superConstructor__ = q;
    function t() {
        "use strict";
        q.call(this, k.getLocalStorage());
    }

    t.available = function () {
        "use strict";
        return !!k.getLocalStorage();
    };
    for (r in q)if (q.hasOwnProperty(r))u[r] = q[r];
    u.prototype = Object.create(s);
    u.prototype.constructor = u;
    u.__superConstructor__ = q;
    function u() {
        "use strict";
        q.call(this, k.getSessionStorage());
    }

    u.available = function () {
        "use strict";
        return !!k.getSessionStorage();
    };
    function v() {
        "use strict";
        this._store = {};
    }

    v.prototype.getStore = function () {
        "use strict";
        return this._store;
    };
    v.prototype.keys = function () {
        "use strict";
        return Object.keys(this._store);
    };
    v.prototype.get = function (x) {
        "use strict";
        if (this._store[x] === undefined)return null;
        return this._store[x];
    };
    v.prototype.set = function (x, y) {
        "use strict";
        this._store[x] = y;
    };
    v.prototype.remove = function (x) {
        "use strict";
        if (x in this._store)delete this._store[x];
    };
    v.prototype.clear = function () {
        "use strict";
        this._store = {};
    };
    v.available = function () {
        "use strict";
        return true;
    };
    function w(x, y) {
        "use strict";
        this._key_prefix = y || '_cs_';
        if (x == 'AUTO' || !x)for (var z in m) {
            var aa = m[z];
            if (aa.available()) {
                x = z;
                break;
            }
        }
        if (x)if (!m[x] || !m[x].available()) {
            i.canUseDOM;
            this._backend = new v();
        } else this._backend = new m[x]();
        var ba = this.useBrowserStorage();
        if (ba)h.listen(window, 'storage', this._onBrowserValueChanged.bind(this));
        var ca = ba ? this._backend.getStore().getItem(p) : this._backend.getStore()[p];
        if (ca !== o)this.clear();
    }

    w.prototype.useBrowserStorage = function () {
        "use strict";
        return this._backend.getStore() === k.getLocalStorage() || this._backend.getStore() === k.getSessionStorage();
    };
    w.prototype.addValueChangeCallback = function (x) {
        "use strict";
        this._changeCallbacks = this._changeCallbacks || [];
        this._changeCallbacks.push(x);
        return {remove: function () {
            this._changeCallbacks.slice(this._changeCallbacks.indexOf(x), 1);
        }.bind(this)};
    };
    w.prototype._onBrowserValueChanged = function (x) {
        "use strict";
        if (this._changeCallbacks && l(x.key, this._key_prefix))this._changeCallbacks.forEach(function (y) {
            y(x.key, x.oldValue, x.newValue);
        });
    };
    w.prototype.keys = function () {
        "use strict";
        var x = [];
        g.guard(function () {
            if (this._backend) {
                var y = this._backend.keys(), z = this._key_prefix.length;
                for (var aa = 0; aa < y.length; aa++)if (y[aa].substr(0, z) == this._key_prefix)x.push(y[aa].substr(z));
            }
        }.bind(this), 'CacheStorage')();
        return x;
    };
    w.prototype.set = function (x, y, z) {
        "use strict";
        if (this._backend) {
            var aa;
            if (typeof y == 'string') {
                aa = n + y;
            } else if (!z) {
                aa = {__t: Date.now(), __v: y};
                aa = j.stringify(aa);
            } else aa = j.stringify(y);
            var ba = this._backend, ca = this._key_prefix + x, da = true;
            while (da)try {
                ba.set(ca, aa);
                da = false;
            } catch (ea) {
                var fa = ba.keys().length;
                this._evictCacheEntries();
                da = ba.keys().length < fa;
            }
        }
    };
    w.prototype._evictCacheEntries = function () {
        "use strict";
        var x = [], y = this._backend;
        y.keys().forEach(function (aa) {
            if (aa === p)return;
            var ba = y.get(aa);
            if (ba === undefined) {
                y.remove(aa);
                return;
            }
            if (w._hasMagicPrefix(ba))return;
            try {
                ba = j.parse(ba, e.id);
            } catch (ca) {
                y.remove(aa);
                return;
            }
            if (ba && ba.__t !== undefined && ba.__v !== undefined)x.push([aa, ba.__t]);
        });
        x.sort(function (aa, ba) {
            return aa[1] - ba[1];
        });
        for (var z = 0; z < Math.ceil(x.length / 2); z++)y.remove(x[z][0]);
    };
    w.prototype.get = function (x, y) {
        "use strict";
        var z;
        if (this._backend) {
            g.applyWithGuard(function () {
                z = this._backend.get(this._key_prefix + x);
            }, this, null, function () {
                z = null;
            }, 'CacheStorage:get');
            if (z !== null) {
                if (w._hasMagicPrefix(z)) {
                    z = z.substr(n.length);
                } else try {
                    z = j.parse(z, e.id);
                    if (z && z.__t !== undefined && z.__v !== undefined)z = z.__v;
                } catch (aa) {
                    z = undefined;
                }
            } else z = undefined;
        }
        if (z === undefined && y !== undefined) {
            z = y;
            this.set(x, z);
        }
        return z;
    };
    w.prototype.remove = function (x) {
        "use strict";
        if (this._backend)g.applyWithGuard(this._backend.remove, this._backend, [this._key_prefix + x], null, 'CacheStorage:remove');
    };
    w.prototype.clear = function () {
        "use strict";
        if (this._backend) {
            g.applyWithGuard(this._backend.clear, this._backend, null, null, null, 'CacheStorage:clear');
            if (this.useBrowserStorage()) {
                this._backend.getStore().setItem(p, o);
            } else this._backend.getStore()[p] = o;
        }
    };
    w.getAllStorageTypes = function () {
        "use strict";
        return Object.keys(m);
    };
    w._hasMagicPrefix = function (x) {
        "use strict";
        return x.substr(0, n.length) === n;
    };
    e.exports = w;
}, null);
__d("MarauderLogger", ["Banzai", "CacheStorage", "MarauderConfig"], function (a, b, c, d, e, f, g, h, i) {
    var j = 'client_event', k = 'navigation', l = 180000, m = 'marauder', n = 'marauder_last_event_time', o = 'marauder_last_session_id', p = {}, q = [], r = false, s = null, t = null, u = null, v = 0, w, x, y = false, z = new h('localstorage', '');

    function aa() {
        z.set(n, ba());
    }

    g.subscribe(g.SHUTDOWN, aa);
    function ba() {
        w = w || z.get(n) || 0;
        return w;
    }

    function ca() {
        if (!y) {
            x = z.get(o);
            y = true;
        }
        var ra = Date.now();
        if (!x || ra - l > ba()) {
            x = ra.toString(16) + '-' + (~~(Math.random() * 16777215)).toString(16);
            z.set(o, x);
        }
        return x;
    }

    function da() {
        return {user_agent: window.navigator.userAgent, screen_height: window.screen.availHeight, screen_width: window.screen.availWidth, density: (window.screen.devicePixelRatio || null), platform: (window.navigator.platform || null), locale: (window.navigator.language || null)};
    }

    function ea() {
        return {locale: navigator.language};
    }

    function fa(ra, sa, ta, ua, va, wa, xa) {
        var ya = xa || Date.now();
        w = xa ? Date.now() : ya;
        sa = sa || s;
        return {name: ra, time: ya / 1000, module: sa, obj_type: ua, obj_id: va, uuid: wa, extra: ta};
    }

    function ga(ra, sa, ta) {
        return fa('content', null, {flags: sa}, null, null, ra, ta);
    }

    function ha(ra) {
        var sa = window.__mrdr;
        if (sa)for (var ta in sa) {
            var ua = sa[ta];
            if (ua[3] !== 0) {
                delete sa[ta];
                if (ta === "1")if (u !== null) {
                    ta = u;
                } else continue;
                ra.push(ga(ta, 1, ua[1]));
                ra.push(ga(ta, 2, ua[2]));
                ra.push(ga(ta, 3, ua[3]));
            }
        }
    }

    function ia(ra) {
        ha(ra);
        if (ra.length === 0)return;
        if (r)ra.push(fa('counters', null, p));
        var sa = g.BASIC, ta = i.gk_enabled;
        if (v === 0 && ta) {
            ra.push(fa('device_status', null, ea()));
            sa = {delay: 5000};
        }
        if (ta && Math.random() < .01)ra.push(fa('device_info', null, da()));
        if (u !== null)for (var ua = 0; ua < ra.length; ua++) {
            var va = ra[ua];
            if (va.uuid === null || va.uuid === undefined)va.uuid = u;
        }
        var wa = {app_ver: i.app_version, data: ra, log_type: j, seq: v++, session_id: ca()}, xa = z.get('device_id');
        if (xa)wa.device_id = xa;
        p = {};
        r = false;
        g.post(m, wa, sa);
    }

    function ja(ra) {
        if (!p[ra])p[ra] = 0;
        p[ra]++;
        r = true;
    }

    function ka(ra, sa, ta, ua, va, wa, xa) {
        ia([fa(ra, sa, ta, ua, va, wa, xa)]);
    }

    function la(ra, sa) {
        if (s !== sa) {
            q.push(fa(k, s, {dest_module: sa, source_url: t, destination_url: ra}));
            s = sa;
            t = ra;
        }
    }

    function ma(ra, sa) {
        if (s !== sa) {
            u = null;
            la(ra, sa);
        }
    }

    function na(ra, sa, ta) {
        ka(sa ? 'show_module' : 'hide_module', ra, ta);
    }

    function oa(ra) {
        s = ra;
    }

    function pa() {
        return s;
    }

    function qa(ra) {
        if (u === null) {
            u = ra;
            if (ra !== null) {
                ia(q);
                q = [];
            }
        }
    }

    e.exports = {count: ja, log: ka, navigateTo: ma, navigateWithinSession: la, toggleModule: na, setUUID: qa, setNavigationModule: oa, getNavigationModule: pa};
}, null);
__d("DragDropFileUpload", [], function (a, b, c, d, e, f) {
    f.isSupported = function () {
        return typeof(FileList) !== "undefined";
    };
}, null);
__d("DocumentDragDrop", ["Event", "Arbiter", "CSS", "DOM", "DOMQuery", "DragDropFileUpload", "emptyFunction", "getObjectValues"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = {}, p = 0;

    function q() {
        p = 0;
        n(o).forEach(function (v) {
            i.removeClass(v.element, v.className);
            h.inform('dragleave', {element: v.element});
        });
    }

    var r = null;

    function s() {
        r && clearTimeout(r);
        r = setTimeout(function () {
            q();
        }, 500);
    }

    function t() {
        if (!l.isSupported())return;
        g.listen(document, 'dragenter', function (v) {
            if (p === 0)n(o).forEach(function (w) {
                i.addClass(w.element, w.className);
                h.inform('dragenter', {element: w.element, event: v});
            });
            p++;
            s();
        });
        g.listen(document, 'dragleave', function (v) {
            p--;
            if (p === 0)q();
            s();
        });
        g.listen(document, 'drop', function (v) {
            q();
            var w = v.getTarget();
            if (k.isNodeOfType(v.getTarget(), 'input'))if (w.type === 'file')return;
            v.prevent();
        });
        g.listen(document, 'dragover', g.prevent);
        document.addEventListener('dragover', s, true);
        t = m;
    }

    var u = {init: function () {
        t();
    }, registerStatusElement: function (v, w) {
        t();
        o[j.getID(v)] = {element: v, className: w};
        if (p > 0)i.addClass(v, w);
    }, removeStatusElement: function (v) {
        var w = j.getID(v), x = o[w];
        if (x) {
            i.removeClass(x.element, x.className);
            delete o[w];
        }
    }};
    e.exports = u;
}, null);
__d("DragDropTarget", ["Arbiter", "Event", "SubscriptionsHandler", "CSS", "DataTransfer", "DocumentDragDrop", "DragDropFileUpload", "copyProperties", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    function p(q) {
        this._element = q;
        this._listeners = new i();
        this._statusElem = q;
        this._dragEnterCount = 0;
        this._enabled = false;
    }

    n(p.prototype, {_onFilesDropCallback: o, _onURLDropCallback: o, _onPlainTextDropCallback: o, _onDropCallback: o, _fileFilterFn: o.thatReturnsArgument, setOnDocumentDragEnterCallback: function (q) {
        this._onDocumentDragEnterCallback = q;
        return this;
    }, setOnDocumentDragLeaveCallback: function (q) {
        this._onDocumentDragLeaveCallback = q;
        return this;
    }, setOnDragEnterCallback: function (q) {
        this._onDragEnterCallback = q;
        return this;
    }, setOnDragLeaveCallback: function (q) {
        this._onDragLeaveCallback = q;
        return this;
    }, setOnFilesDropCallback: function (q) {
        this._onFilesDropCallback = q;
        return this;
    }, setOnURLDropCallback: function (q) {
        this._onURLDropCallback = q;
        return this;
    }, setOnPlainTextDropCallback: function (q) {
        this._onPlainTextDropCallback = q;
        return this;
    }, setOnDropCallback: function (q) {
        this._onDropCallback = q;
        return this;
    }, enable: function () {
        if (!m.isSupported())return this;
        this._listeners.engage();
        l.registerStatusElement(this._statusElem, 'fbWantsDragDrop');
        this._listeners.addSubscriptions(h.listen(this._element, 'dragenter', this._onDragEnter.bind(this)), h.listen(this._element, 'dragleave', this._onDragLeave.bind(this)), h.listen(this._element, 'dragover', this._onDragOver.bind(this)), h.listen(this._element, 'drop', function (q) {
            this._dragEnterCount = 0;
            j.removeClass(this._statusElem, 'fbDropReady');
            j.removeClass(this._statusElem, 'fbDropReadyPhoto');
            j.removeClass(this._statusElem, 'fbDropReadyPhotos');
            j.removeClass(this._statusElem, 'fbDropReadyLink');
            var r = {}, s = false, t = this._fileFilterFn(q.dataTransfer.files);
            if (t.length) {
                this._onFilesDropCallback(t, q);
                r.files = t;
                s = true;
            }
            var u = q.dataTransfer.getData('url') || q.dataTransfer.getData('text/uri-list');
            if (u) {
                this._onURLDropCallback(u, q);
                r.url = u;
                s = true;
            }
            var v = q.dataTransfer.getData('text/plain');
            if (v) {
                this._onPlainTextDropCallback(v, q);
                r.plainText = v;
                s = true;
            }
            if (s)this._onDropCallback(r, q);
            q.kill();
        }.bind(this)));
        this._listeners.addSubscriptions(g.subscribe('dragenter', this._onDocumentDragEnter.bind(this)), g.subscribe('dragleave', this._onDocumentDragLeave.bind(this)));
        this._enabled = true;
        return this;
    }, disable: function () {
        if (!this._enabled)return this;
        l.removeStatusElement(this._statusElem, 'fbWantsDragDrop');
        j.removeClass(this._statusElem, 'fbDropReady');
        j.removeClass(this._statusElem, 'fbDropReadyPhoto');
        j.removeClass(this._statusElem, 'fbDropReadyPhotos');
        j.removeClass(this._statusElem, 'fbDropReadyLink');
        this._listeners.release();
        this._enabled = false;
        return this;
    }, setFileFilter: function (q) {
        this._fileFilterFn = q;
        return this;
    }, setStatusElement: function (q) {
        this._statusElem = q;
        return this;
    }, _onDragEnter: function (q) {
        if (this._dragEnterCount === 0) {
            var r = new k(q.dataTransfer);
            j.addClass(this._statusElem, 'fbDropReady');
            if (r.isLink() || !r.isImage()) {
                j.addClass(this._statusElem, 'fbDropReadyLink');
            } else if (r.getCount() > 1) {
                j.addClass(this._statusElem, 'fbDropReadyPhotos');
            } else j.addClass(this._statusElem, 'fbDropReadyPhoto');
            this._onDragEnterCallback && this._onDragEnterCallback();
        }
        this._dragEnterCount++;
        q.preventDefault();
    }, _onDragLeave: function (q) {
        this._dragEnterCount = Math.max(this._dragEnterCount - 1, 0);
        if (this._dragEnterCount === 0) {
            j.removeClass(this._statusElem, 'fbDropReady');
            j.removeClass(this._statusElem, 'fbDropReadyPhoto');
            j.removeClass(this._statusElem, 'fbDropReadyPhotos');
            j.removeClass(this._statusElem, 'fbDropReadyLink');
            this._onDragLeaveCallback && this._onDragLeaveCallback();
        }
    }, _onDragOver: function (q) {
        if (!q.dataTransfer) {
            h.kill(q);
            return;
        }
        var r = q.dataTransfer.effectAllowed;
        q.dataTransfer.dropEffect = (r == 'move' || r == 'linkMove') ? 'move' : 'copy';
        h.kill(q);
    }, _onDocumentDragEnter: function (event, q) {
        if (this._onDocumentDragEnterCallback && q.element == this._element)this._onDocumentDragEnterCallback();
    }, _onDocumentDragLeave: function (event, q) {
        this._dragEnterCount = 0;
        this._onDragLeave(event);
        if (this._onDocumentDragLeaveCallback && q.element == this._element)this._onDocumentDragLeaveCallback();
    }});
    e.exports = p;
}, null);
__d("Flash", ["DOMEventListener", "DOMWrapper", "QueryString", "UserAgent_DEPRECATED", "copyProperties", "guid", "htmlSpecialChars"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = {}, o, p = h.getWindow().document;

    function q(v) {
        var w = p.getElementById(v);
        if (w)w.parentNode.removeChild(w);
        delete n[v];
    }

    function r() {
        for (var v in n)if (n.hasOwnProperty(v))q(v);
    }

    function s(v) {
        return v.replace(/\d+/g, function (w) {
            return '000'.substring(w.length) + w;
        });
    }

    function t(v) {
        if (!o) {
            if (j.ie() >= 9)g.add(window, 'unload', r);
            o = true;
        }
        n[v] = v;
    }

    var u = {embed: function (v, w, x, y) {
        var z = l();
        v = m(v).replace(/&amp;/g, '&');
        x = k({allowscriptaccess: 'always', flashvars: y, movie: v}, x || {});
        if (typeof x.flashvars == 'object')x.flashvars = i.encode(x.flashvars);
        var aa = [];
        for (var ba in x)if (x.hasOwnProperty(ba) && x[ba])aa.push('<param name="' + m(ba) + '" value="' + m(x[ba]) + '">');
        var ca = w.appendChild(p.createElement('span')), da = '<object ' + (j.ie() ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' : 'type="application/x-shockwave-flash"') + 'data="' + v + '" ' + (x.height ? 'height="' + x.height + '" ' : '') + (x.width ? 'width="' + x.width + '" ' : '') + 'id="' + z + '">' + aa.join('') + '</object>';
        ca.innerHTML = da;
        var ea = ca.firstChild;
        t(z);
        return ea;
    }, remove: q, getVersion: function () {
        var v = 'Shockwave Flash', w = 'application/x-shockwave-flash', x = 'ShockwaveFlash.ShockwaveFlash', y;
        if (navigator.plugins && typeof navigator.plugins[v] == 'object') {
            var z = navigator.plugins[v].description;
            if (z && navigator.mimeTypes && navigator.mimeTypes[w] && navigator.mimeTypes[w].enabledPlugin)y = z.match(/\d+/g);
        }
        if (!y)try {
            y = (new ActiveXObject(x)).GetVariable('$version').match(/(\d+),(\d+),(\d+),(\d+)/);
            y = Array.prototype.slice.call(y, 1);
        } catch (aa) {
        }
        return y;
    }, checkMinVersion: function (v) {
        var w = u.getVersion();
        if (!w)return false;
        return s(w.join('.')) >= s(v);
    }, isAvailable: function () {
        return !!u.getVersion();
    }};
    e.exports = u;
}, null);
__d("PopoverAsyncMenu", ["AsyncRequest", "Event", "PopoverMenu", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = {}, l = 0;
    for (var m in i)if (i.hasOwnProperty(m))o[m] = i[m];
    var n = i === null ? null : i.prototype;
    o.prototype = Object.create(n);
    o.prototype.constructor = o;
    o.__superConstructor__ = i;
    function o(p, q, r, s, t) {
        "use strict";
        this._endpoint = s;
        this._loadingMenu = r;
        this._instanceId = l++;
        k[this._instanceId] = this;
        this._mouseoverListener = h.listen(q, 'mouseover', this.fetchMenu.bind(this));
        i.call(this, p, q, null, t);
    }

    o.prototype._onLayerInit = function () {
        "use strict";
        if (!this._menu && this._loadingMenu)this.setMenu(this._loadingMenu);
        this.fetchMenu();
        this._popover.getLayer().subscribe('key', this._handleKeyEvent.bind(this));
    };
    o.prototype.fetchMenu = function () {
        "use strict";
        if (this._fetched)return;
        new g().setURI(this._endpoint).setData({pmid: this._instanceId}).send();
        this._fetched = true;
        if (this._mouseoverListener) {
            this._mouseoverListener.remove();
            this._mouseoverListener = null;
        }
    };
    o.setMenu = function (p, q) {
        "use strict";
        k[p].setMenu(q);
    };
    o.getInstance = function (p) {
        "use strict";
        return k[p];
    };
    j(o.prototype, {_fetched: false, _mouseoverListener: null});
    e.exports = o;
}, null);
__d("LikeConfirmer", ["AsyncDialog", "AsyncRequest"], function (a, b, c, d, e, f, g, h) {
    var i = false, j = false, k = {likeContent: function () {
    }, like: function (l, m) {
        this.likeContent = l;
        if (j)return;
        if (i) {
            this.likeContent();
        } else {
            var n = new h().setURI('/like/confirm_like.php').setRelativeTo(m);
            g.send(n, function (o) {
                j = true;
                o.subscribe('confirm', this.onCloseLikeConfirmDialog.bind(this));
                o.subscribe('cancel', this.onCloseLikeConfirmDialog.bind(this));
                o.setCausalElement(m);
            }.bind(this));
        }
        return false;
    }, isShowingConfirmation: function () {
        return j;
    }, onCloseLikeConfirmDialog: function () {
        j = false;
    }, likeSkipConfirmation: function (l) {
        i = l;
        this.likeContent();
    }};
    e.exports = k;
}, null);
__d("MenuSeparator", ["DOM", "CSS", "MenuItemInterface", "cx"], function (a, b, c, d, e, f, g, h, i, j) {
    for (var k in i)if (i.hasOwnProperty(k))m[k] = i[k];
    var l = i === null ? null : i.prototype;
    m.prototype = Object.create(l);
    m.prototype.constructor = m;
    m.__superConstructor__ = i;
    function m(n) {
        "use strict";
        i.call(this, n);
        this._data = n;
        this.showFn = this._data.should_show_fn;
    }

    m.prototype.updateShownState = function (n) {
        "use strict";
        if (this.showFn) {
            this._isHidden = !this.showFn(n);
            if (this._root)h.conditionShow(this._root, !this._isHidden);
        }
    };
    m.prototype.isShown = function (n) {
        "use strict";
        var o = this.showFn ? this.showFn(n) : true;
        return o;
    };
    m.prototype.render = function () {
        "use strict";
        var n = "_54ak";
        if (this._data.className)n += ' ' + this._data.className;
        var o = this._data.label || '', p = g.create('li', {className: n, role: 'separator'}, o);
        if (this._isHidden)h.hide(p);
        return p;
    };
    e.exports = m;
}, null);
__d("PopoverLoadingMenu", ["BehaviorsMixin", "DOM", "PopoverMenuInterface", "copyProperties", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    for (var m in i)if (i.hasOwnProperty(m))o[m] = i[m];
    var n = i === null ? null : i.prototype;
    o.prototype = Object.create(n);
    o.prototype.constructor = o;
    o.__superConstructor__ = i;
    function o(p) {
        "use strict";
        i.call(this);
        this._config = p || {};
        this._theme = p.theme || {};
    }

    o.prototype.getRoot = function () {
        "use strict";
        if (!this._root) {
            this._root = h.create('div', {className: l("_54nq", this._config.className, this._theme.className)}, h.create('div', {className: "_54ng"}, h.create('div', {className: "_54nf _54af"}, h.create('span', {className: "_54ag"}))));
            if (this._config.behaviors)this.enableBehaviors(this._config.behaviors);
        }
        return this._root;
    };
    j(o.prototype, g, {_root: null});
    e.exports = o;
}, null);
__d("Hovercard", ["AccessibleLayer", "Arbiter", "AsyncRequest", "ContextualDialog", "ContextualDialogXUITheme", "ContextualThing", "DOM", "Event", "JSXDOM", "LayerAutoFocus", "Parent", "Style", "Vector", "clickRefAction", "csx", "cx", "getInlineBoundingRect", "tx", "userAction"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    var z = {}, aa = {}, ba = null, ca = null, da = null, ea = null, fa = 150, ga = 700, ha = 1000, ia = 250, ja = 50, ka = null, la = null, ma = null, na = null;

    function oa(event) {
        var eb = q.byTag(event.getTarget(), 'a');
        db.processNode(eb) && event.stop();
    }

    function pa(eb) {
        ca = eb;
        if (!qa(eb)) {
            var fb;
            if (!eb || !(fb = ra(eb)) || bb(eb)) {
                aa.moveToken && aa.moveToken.remove();
                aa = {};
                return false;
            }
            if (aa.node != eb) {
                aa.moveToken && aa.moveToken.remove();
                aa = {node: eb, endpoint: fb, pos: null};
            }
        }
        return true;
    }

    function qa(eb) {
        return eb && ba && aa.node == eb;
    }

    function ra(eb) {
        return eb.getAttribute('data-hovercard');
    }

    function sa(eb) {
        var fb = m.scry(eb, "^._5jmm ._2orz").length;
        if (fb)return;
        var gb = n.listen(eb, 'mouseleave', function () {
            clearTimeout(ka);
            clearTimeout(la);
            gb.remove();
            ca = null;
            if (!db.contains(eb))db.hide();
        });
        if (!aa.moveToken)aa.moveToken = n.listen(eb, 'mousemove', function (event) {
            aa.pos = s.getEventPosition(event);
        });
        clearTimeout(ka);
        clearTimeout(la);
        clearTimeout(na);
        var hb = fa, ib = ba ? ia : ga;
        if (eb.getAttribute('data-hovercard-instant'))hb = ib = ja;
        ka = setTimeout(wa.bind(null, eb), hb);
        la = setTimeout(ta.bind(null, eb), ib);
    }

    function ta(eb, fb) {
        if (aa.node != eb)return;
        var gb = z[ra(eb)];
        if (gb) {
            va(gb);
        } else if (fb) {
            va(za());
        } else {
            var hb = ba ? ia : ga;
            ma = setTimeout(ta.bind(null, eb, true), ha - hb);
        }
    }

    function ua() {
        db.hide(true);
        clearTimeout(la);
    }

    function va(eb) {
        var fb = aa.node, gb = ba, hb = gb != fb, ib = fb.getAttribute('data-hovercard-position');
        ib && eb.setPosition(ib);
        if (ea) {
            var jb = ea.getContentRoot();
            if (!l.containsIncludingLayers(jb, fb))ea.hide();
        }
        if (!m.contains(document.body, fb)) {
            db.hide(true);
            return;
        }
        ba = fb;
        ea = eb;
        eb.setContextWithBounds(fb, w(fb, aa.pos)).show();
        if (hb)setTimeout(function () {
            t('himp', ba, null, 'FORCE', {ft: {evt: 39}});
            y('hovercard', ba).uai('show');
        }, 0);
    }

    function wa(eb) {
        if (eb.id && z[eb.id] != null)return;
        var fb = ra(eb);
        if (z[fb] != null)return;
        xa(fb);
        var gb = function () {
            db.dirty(fb);
            ua();
        };
        new i(fb).setData({endpoint: fb}).setMethod('GET').setReadOnly(true).setErrorHandler(gb).setTransportErrorHandler(gb).send();
    }

    function xa(eb) {
        z[eb] = false;
    }

    function ya(eb) {
        var fb = aa.node.getAttribute('data-hovercard-offset-x') || 0;
        eb.setOffsetX(parseInt(fb, 10));
        var gb = aa.node.getAttribute('data-hovercard-offset-y') || 0;
        eb.setOffsetY(parseInt(gb, 10));
    }

    var za = function () {
        if (!da) {
            da = new j({width: 275, theme: k}, o.div({className: "_7lk"}, "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."));
            da.disableBehavior(g).disableBehavior(p);
            ab(da);
        }
        var eb = aa.node.getAttribute('data-hovercard-position');
        da.setPosition(eb);
        ya(da);
        return da;
    };

    function ab(eb) {
        var fb = [eb.subscribe('mouseenter', function () {
            clearTimeout(na);
            ca = aa.node;
        }), eb.subscribe('mouseleave', function () {
            eb.hide();
            ca = null;
        }), eb.subscribe('destroy', function () {
            while (fb.length)fb.pop().unsubscribe();
            fb = null;
        })];
    }

    function bb(eb) {
        return (q.byClass(eb, "_7lu") !== null);
    }

    var cb = true, db = {hide: function (eb) {
        if (!ba)return;
        if (eb) {
            if (ea)ea.hide();
            ca = null;
            ba = null;
            ea = null;
        } else {
            var fb = aa.node.getAttribute('data-hovercard-instant') ? ja : ia;
            na = setTimeout(db.hide.bind(null, true), fb);
        }
    }, setDialog: function (eb, fb) {
        fb.disableBehavior(g).disableBehavior(p);
        z[eb] = fb;
        ab(fb);
        if (aa.endpoint == eb && ca == aa.node) {
            za().hide();
            ya(fb);
            va(fb);
        }
    }, getDialog: function (eb) {
        return z[eb];
    }, contains: function (eb) {
        if (ea)return l.containsIncludingLayers(ea.getContentRoot(), eb);
        return false;
    }, dirty: function (eb) {
        var fb = z[eb];
        if (fb) {
            fb.destroy();
            delete z[eb];
        }
    }, dirtyAll: function () {
        for (var eb in z) {
            var fb = z[eb];
            fb && db.dirty(eb);
        }
        h.inform('Hovercard/dirty');
    }, processNode: function (eb) {
        if (eb && pa(eb)) {
            sa(eb);
            return true;
        }
        return false;
    }, setDirtyAllOnPageTransition: function (eb) {
        cb = eb;
    }, getLoadingDelay: function () {
        return ha;
    }, getHideDelay: function () {
        return ia;
    }};
    (function () {
        n.listen(document.documentElement, 'mouseover', oa);
        n.listen(window, 'scroll', function () {
            if (ba && r.isFixed(ba))db.hide(true);
        });
        h.subscribe('page_transition', function () {
            ua();
            cb && db.dirtyAll();
        }, h.SUBSCRIBE_NEW);
    })();
    e.exports = db;
}, null);