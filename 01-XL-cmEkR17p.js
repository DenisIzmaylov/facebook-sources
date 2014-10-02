/*!CK:1607075504!*//*1411617777,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["6kppL"]);
}


self.__DEV__ = self.__DEV__ || 0;
(function (a) {
    function b(c, d) {
        if (this == null)throw new TypeError('Array.prototype.findIndex called on null or undefined');
        if (typeof c !== 'function')throw new TypeError('predicate must be a function');
        var e = Object(this), f = e.length >>> 0;
        for (var g = 0; g < f; g++)if (g in e)if (c.call(d, e[g], g, e))return g;
        return -1;
    }

    if (!Array.prototype.findIndex)Array.prototype.findIndex = b;
    if (!Array.prototype.find)Array.prototype.find = function (c, d) {
        if (this == null)throw new TypeError('Array.prototype.find called on null or undefined');
        var e = b.call(this, c, d);
        return e === -1 ? a : this[e];
    };
})();


if (JSON.stringify(["\u2028\u2029"]) === '["\u2028\u2029"]')JSON.stringify = function (a) {
    var b = /\u2028/g, c = /\u2029/g;
    return function (d, e, f) {
        var g = a.call(this, d, e, f);
        if (g) {
            if (-1 < g.indexOf('\u2028'))g = g.replace(b, '\\u2028');
            if (-1 < g.indexOf('\u2029'))g = g.replace(c, '\\u2029');
        }
        return g;
    };
}(JSON.stringify);


if (!Object.assign)Object.assign = function (a, b) {
    if (a == null)throw new TypeError('Object.assign target cannot be null or undefined');
    var c = Object(a), d = Object.prototype.hasOwnProperty;
    for (var e = 1; e < arguments.length; e++) {
        var f = arguments[e];
        if (f == null)continue;
        var g = Object(f);
        for (var h in g)if (d.call(g, h))c[h] = g[h];
    }
    return c;
};

(function (a) {
    a.__m = function (b, c) {
        b.__SMmeta = c;
        return b;
    };
})(this);
if (!String.prototype.startsWith)String.prototype.startsWith = function (a) {
    "use strict";
    if (this == null)throw TypeError();
    var b = String(this), c = arguments.length > 1 ? (Number(arguments[1]) || 0) : 0, d = Math.min(Math.max(c, 0), b.length);
    return b.indexOf(String(a), c) == d;
};
if (!String.prototype.endsWith)String.prototype.endsWith = function (a) {
    "use strict";
    if (this == null)throw TypeError();
    var b = String(this), c = b.length, d = String(a), e = arguments.length > 1 ? (Number(arguments[1]) || 0) : c, f = Math.min(Math.max(e, 0), c), g = f - d.length;
    if (g < 0)return false;
    return b.lastIndexOf(d, g) == g;
};
if (!String.prototype.contains)String.prototype.contains = function (a) {
    "use strict";
    if (this == null)throw TypeError();
    var b = String(this), c = arguments.length > 1 ? (Number(arguments[1]) || 0) : 0;
    return b.indexOf(String(a), c) != -1;
};
if (!String.prototype.repeat)String.prototype.repeat = function (a) {
    "use strict";
    if (this == null)throw TypeError();
    var b = String(this);
    a = Number(a) || 0;
    if (a < 0 || a === Infinity)throw RangeError();
    if (a === 1)return b;
    var c = '';
    while (a) {
        if (a & 1)c += b;
        if ((a >>= 1))b += b;
    }
    return c;
};


__t = function (a) {
    return a[0];
};
__w = function (a) {
    return a;
};

(function (a) {
    if (a.require)return;
    var b = Object.prototype.toString, c = {}, d = {}, e = {}, f = 0, g = 1, h = 2, i = Object.prototype.hasOwnProperty;

    function j(y) {
        var z = Array.prototype.slice.call(y), aa = {}, ba, ca, da, ea;
        while (z.length) {
            ca = z.shift();
            if (aa[ca])continue;
            aa[ca] = true;
            da = c[ca];
            if (!da || !da.waiting)continue;
            for (ba = 0; ba < da.dependencies.length; ba++) {
                ea = da.dependencies[ba];
                if (!c[ea] || c[ea].waiting)z.push(ea);
            }
        }
        for (ca in aa)if (i.call(aa, ca))z.push(ca);
        var fa = [];
        for (ba = 0; ba < z.length; ba++) {
            ca = z[ba];
            var ga = ca;
            da = c[ca];
            if (!da) {
                ga += ' is not defined';
            } else if (!da.waiting) {
                ga += ' is ready';
            } else {
                var ha = [];
                for (var ia = 0; ia < da.dependencies.length; ia++) {
                    ea = da.dependencies[ia];
                    if (!c[ea] || c[ea].waiting)ha.push(ea);
                }
                ga += ' is waiting for ' + ha.join(', ');
            }
            fa.push(ga);
        }
        return fa.join('\n');
    }

    function k(y) {
        this.name = 'ModuleError';
        this.message = y;
        this.stack = Error(y).stack;
        this.framesToPop = 2;
    }

    k.prototype = Object.create(Error.prototype);
    k.prototype.constructor = k;
    var l = a.performance || a.msPerformance || a.webkitPerformance || {};
    if (!l.now)l = a.Date;
    var m = l ? l.now.bind(l) : function () {
        return 0;
    }, n = 0, o = 0, p = 0;

    function q(y) {
        var z = c[y], aa, ba, ca;
        if (z && z.exports) {
            if (z.refcount-- === 1)delete c[y];
            return z.exports;
        }
        if (a.ErrorUtils && !a.ErrorUtils.inGuard())return ErrorUtils.applyWithGuard(q, this, arguments);
        if (!z) {
            ca = 'Requiring unknown module "' + y + '"';
            throw new k(ca);
        }
        if (z.hasError)throw new k('Requiring module "' + y + '" which threw an exception');
        if (z.waiting)throw new k('Requiring module "' + y + '" with unresolved dependencies: ' + j([y]));
        var da = z.exports = {}, ea = z.factory;
        if (b.call(ea) === '[object Function]') {
            var fa = [], ga = z.dependencies, ha = ga.length, ia;
            if (z.special & h)ha = Math.min(ha, ea.length);
            try {
                for (ba = 0; fa.length < ha; ba++) {
                    aa = ga[ba];
                    if (!z.inlineRequires[aa])fa.push(aa === 'module' ? z : (aa === 'exports' ? da : q.call(null, aa)));
                }
                ++p;
                if (n++ === 0)o -= m();
                try {
                    ia = ea.apply(z.context || a, fa);
                } catch (ja) {
                    if (c.ex && c.erx) {
                        var ka = q.call(null, 'ex'), la = q.call(null, 'erx'), ma = la(ja.message);
                        if (ma[0].indexOf(' from module "%s"') < 0) {
                            ma[0] += ' from module "%s"';
                            ma[ma.length] = y;
                        }
                        ja.message = ka.apply(null, ma);
                    }
                    throw ja;
                } finally {
                    if (--n === 0)o += m();
                }
            } catch (ja) {
                z.hasError = true;
                z.exports = null;
                throw ja;
            }
            if (ia)z.exports = ia;
        } else z.exports = ea;
        if (z.refcount-- === 1)delete c[y];
        return z.exports;
    }

    q.__getFactoryTime = function () {
        return (n ? m() : 0) + o;
    };
    q.__getTotalFactories = function () {
        return p;
    };
    function r(y, z, aa, ba, ca, da, ea) {
        if (z === undefined) {
            z = [];
            aa = y;
            y = u();
        } else if (aa === undefined) {
            aa = z;
            if (b.call(y) === '[object Array]') {
                z = y;
                y = u();
            } else z = [];
        }
        var fa = {cancel: s.bind(this, y)}, ga = c[y];
        if (ga) {
            if (da)ga.refcount += da;
            return fa;
        } else if (!z && !aa && da) {
            e[y] = (e[y] || 0) + da;
            return fa;
        } else {
            ga = {id: y};
            ga.refcount = (e[y] || 0) + (da || 0);
            delete e[y];
        }
        ga.factory = aa;
        ga.dependencies = z;
        ga.context = ca;
        ga.special = ba;
        ga.inlineRequires = ea || {};
        ga.waitingMap = {};
        ga.waiting = 0;
        ga.hasError = false;
        c[y] = ga;
        w(y);
        return fa;
    }

    function s(y) {
        if (!c[y])return;
        var z = c[y];
        delete c[y];
        for (var aa in z.waitingMap)if (z.waitingMap[aa])delete d[aa][y];
        for (var ba = 0; ba < z.dependencies.length; ba++) {
            aa = z.dependencies[ba];
            if (c[aa]) {
                if (c[aa].refcount-- === 1)s(aa);
            } else if (e[aa])e[aa]--;
        }
    }

    function t(y, z, aa) {
        return r(y, z, undefined, g, aa, 1);
    }

    function u() {
        return '__mod__' + f++;
    }

    function v(y, z) {
        if (!y.waitingMap[z] && y.id !== z) {
            y.waiting++;
            y.waitingMap[z] = 1;
            d[z] || (d[z] = {});
            d[z][y.id] = 1;
        }
    }

    function w(y) {
        var z = [], aa = c[y], ba, ca, da;
        for (ca = 0; ca < aa.dependencies.length; ca++) {
            ba = aa.dependencies[ca];
            if (!c[ba]) {
                v(aa, ba);
            } else if (c[ba].waiting)for (da in c[ba].waitingMap)if (c[ba].waitingMap[da])v(aa, da);
        }
        if (aa.waiting === 0 && aa.special & g)z.push(y);
        if (d[y]) {
            var ea = d[y], fa;
            d[y] = undefined;
            for (ba in ea) {
                fa = c[ba];
                for (da in aa.waitingMap)if (aa.waitingMap[da])v(fa, da);
                if (fa.waitingMap[y]) {
                    fa.waitingMap[y] = undefined;
                    fa.waiting--;
                }
                if (fa.waiting === 0 && fa.special & g)z.push(ba);
            }
        }
        for (ca = 0; ca < z.length; ca++)q.call(null, z[ca]);
    }

    function x(y, z) {
        var aa = c[y] = {id: y};
        aa.exports = z;
        aa.refcount = 0;
    }

    x('module', 0);
    x('exports', 0);
    x('define', r);
    x('global', a);
    x('require', q);
    x('requireDynamic', q);
    x('requireLazy', t);
    r.amd = {};
    a.define = r;
    a.require = q;
    a.requireDynamic = q;
    a.requireLazy = t;
    q.__debug = {modules: c, deps: d, printDependencyInfo: function () {
        if (!a.console)return;
        var y = Object.keys(q.__debug.deps);
        a.console.log(j(y));
    }};
    a.__d = function (y, z, aa, ba, ca) {
        var da = ['global', 'require', 'requireDynamic', 'requireLazy', 'module', 'exports'];
        r(y, da.concat(z), aa, ba || h, null, null, ca);
    };
})(this);
__d("copyProperties", [], function (a, b, c, d, e, f) {
    function g(h, i, j, k, l, m, n) {
        h = h || {};
        var o = [i, j, k, l, m], p = 0, q;
        while (o[p]) {
            q = o[p++];
            for (var r in q)h[r] = q[r];
            if (q.hasOwnProperty && q.hasOwnProperty('toString') && (typeof q.toString != 'undefined') && (h.toString !== q.toString))h.toString = q.toString;
        }
        return h;
    }

    e.exports = g;
}, null);
__d("Env", ["copyProperties"], function (a, b, c, d, e, f, g) {
    var h = {start: Date.now()};
    if (a.Env) {
        g(h, a.Env);
        a.Env = undefined;
    }
    e.exports = h;
}, null);
__d("eprintf", [], function (a, b, c, d, e, f) {
    var g = function (h) {
        var i = Array.prototype.slice.call(arguments).map(function (l) {
            return String(l);
        }), j = h.split('%s').length - 1;
        if (j !== i.length - 1)return g('eprintf args number mismatch: %s', JSON.stringify(i));
        var k = 1;
        return h.replace(/%s/g, function (l) {
            return String(i[k++]);
        });
    };
    e.exports = g;
}, null);
__d("ex", ["eprintf"], function (a, b, c, d, e, f, g) {
    var h = function () {
        var i = Array.prototype.slice.call(arguments, 0);
        i = i.map(function (j) {
            return String(j);
        });
        if (i[0].split('%s').length !== i.length)return h('ex args number mismatch: %s', JSON.stringify(i));
        return h._prefix + JSON.stringify(i) + h._suffix;
    };
    h._prefix = '<![EX[';
    h._suffix = ']]>';
    e.exports = h;
}, null);
__d("erx", ["ex"], function (a, b, c, d, e, f, g) {
    var h = function (i) {
        if (typeof i !== 'string')return i;
        var j = i.indexOf(g._prefix), k = i.lastIndexOf(g._suffix);
        if (j < 0 || k < 0)return [i];
        var l = j + g._prefix.length, m = k + g._suffix.length;
        if (l >= k)return ['erx slice failure: %s', i];
        var n = i.substring(0, j), o = i.substring(m);
        i = i.substring(l, k);
        var p;
        try {
            p = JSON.parse(i);
            p[0] = n + p[0] + o;
        } catch (q) {
            return ['erx parse failure: %s', i];
        }
        return p;
    };
    e.exports = h;
}, null);
__d("wrapFunction", [], function (a, b, c, d, e, f) {
    var g = {};

    function h(i, j, k) {
        j = j || 'default';
        return function () {
            var l = j in g ? g[j](i, k) : i;
            return l.apply(this, arguments);
        };
    }

    h.setWrapper = function (i, j) {
        j = j || 'default';
        g[j] = i;
    };
    e.exports = h;
}, null);
__d("ErrorUtils", ["Env", "eprintf", "erx", "wrapFunction"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = {}, l = '<anonymous guard>', m = '<generated guard>', n = '<window.onerror>', o = /^https?:\/\//i, p = /^Type Mismatch for/, q = ['Unknown script code', 'Function code', 'eval code'], r = new RegExp('(.*?)(\\s)(?:' + q.join('|') + ')$'), s = [], t, u = [], v = 50, w = [], x = false, y = false;

    function z(la) {
        if (!la)return [];
        var ma = la.split(/\n\n/)[0].replace(/[\(\)]|\[.*?\]|^\w+:\s.*?\n/g, '').split('\n').map(function (na) {
            var oa, pa, qa;
            na = na.trim();
            if (/(:(\d+)(:(\d+))?)$/.test(na)) {
                pa = RegExp.$2;
                qa = RegExp.$4;
                na = na.slice(0, -RegExp.$1.length);
            }
            if (r.test(na) || /(.*)(@|\s)[^\s]+$/.test(na)) {
                na = na.substring(RegExp.$1.length + 1);
                oa = /(at)?\s*(.*)([^\s]+|$)/.test(RegExp.$1) ? RegExp.$2 : '';
            }
            var ra = {identifier: oa, script: na, line: pa, column: qa};
            if (t)t(ra);
            ra.text = '    at' + (ra.identifier ? ' ' + ra.identifier + ' (' : ' ') + ra.script + (ra.line ? ':' + ra.line : '') + (ra.column ? ':' + ra.column : '') + (ra.identifier ? ')' : '');
            return ra;
        });
        return ma;
    }

    function aa(la) {
        if (!la) {
            return {};
        } else if (la._originalError)return la;
        var ma = z(la.stackTrace || la.stack), na = false;
        if (la.framesToPop) {
            var oa = la.framesToPop, pa;
            while (oa > 0 && ma.length > 0) {
                pa = ma.shift();
                oa--;
                na = true;
            }
            if (p.test(la.message) && la.framesToPop === 2 && pa)if (o.test(pa.script))la.message += ' at ' + pa.script + (pa.line ? ':' + pa.line : '') + (pa.column ? ':' + pa.column : '');
            delete la.framesToPop;
        }
        var qa = {line: la.lineNumber || la.line, column: la.columnNumber || la.column, name: la.name, message: la.message, messageWithParams: la.messageWithParams, type: la.type, script: la.fileName || la.sourceURL || la.script, stack: ma.map(function (sa) {
            return sa.text;
        }).join('\n'), stackFrames: ma, guard: la.guard, guardList: la.guardList, extra: la.extra, snapshot: la.snapshot};
        if (typeof qa.message === 'string' && !qa.messageWithParams) {
            qa.messageWithParams = i(qa.message);
            qa.message = h.apply(a, qa.messageWithParams);
        } else {
            qa.messageObject = qa.message;
            qa.message = String(qa.message);
        }
        if (t)t(qa);
        if (na) {
            delete qa.script;
            delete qa.line;
            delete qa.column;
        }
        if (ma[0]) {
            qa.script = qa.script || ma[0].script;
            qa.line = qa.line || ma[0].line;
            qa.column = qa.column || ma[0].column;
        }
        qa._originalError = la;
        for (var ra in qa)(qa[ra] == null && delete qa[ra]);
        return qa;
    }

    function ba(la, ma) {
        if (y)return false;
        if (w.length > 0) {
            la.guard = la.guard || w[0];
            la.guardList = w.slice();
        }
        la = aa(la);
        !ma;
        if (u.length > v)u.splice(v / 2, 1);
        u.push(la);
        y = true;
        for (var na = 0; na < s.length; na++)try {
            s[na](la);
        } catch (oa) {
        }
        y = false;
        return true;
    }

    function ca() {
        return x;
    }

    function da(la) {
        w.unshift(la);
        x = true;
    }

    function ea() {
        w.shift();
        x = (w.length !== 0);
    }

    function fa(la, ma, na, oa, pa) {
        da(pa || l);
        var qa, ra = k.nocatch || (/nocatch/).test(location.search);
        if (!ra && g.nocatch)ra = g.nocatch;
        if (ra) {
            try {
                qa = la.apply(ma, na || []);
            } finally {
                ea();
            }
            return qa;
        }
        try {
            qa = la.apply(ma, na || []);
            return qa;
        } catch (sa) {
            var ta = aa(sa);
            if (oa)oa(ta);
            if (la)ta.callee = la.toString().substring(0, 100);
            if (na)ta.args = Array.prototype.slice.call(na).toString().substring(0, 100);
            ta.guard = w[0];
            ta.guardList = w.slice();
            ba(ta);
        } finally {
            ea();
        }
    }

    function ga(la, ma, na) {
        ma = ma || la.name || m;
        function oa() {
            return fa(la, na || this, arguments, null, ma);
        }

        return oa;
    }

    j.setWrapper(ga, 'entry');
    function ha(la, ma, na, oa, pa) {
        pa = pa || {};
        pa.message = pa.message || la;
        pa.script = pa.script || ma;
        pa.line = pa.line || na;
        pa.column = pa.column || oa;
        pa.guard = n;
        pa.guardList = [n];
        ba(pa, true);
    }

    window.onerror = ha;
    function ia(la, ma) {
        s.push(la);
        if (!ma)u.forEach(la);
    }

    function ja(la) {
        t = la;
    }

    var ka = {ANONYMOUS_GUARD_TAG: l, GENERATED_GUARD_TAG: m, GLOBAL_ERROR_HANDLER_TAG: n, addListener: ia, setSourceResolver: ja, applyWithGuard: fa, guard: ga, history: u, inGuard: ca, normalizeError: aa, onerror: ha, reportError: ba};
    e.exports = a.ErrorUtils = ka;
    if (typeof __t === 'function' && __t.setHandler)__t.setHandler(ba);
}, null);
__d("CallbackDependencyManager", ["ErrorUtils"], function (a, b, c, d, e, f, g) {
    function h() {
        "use strict";
        this.$CallbackDependencyManager0 = {};
        this.$CallbackDependencyManager1 = {};
        this.$CallbackDependencyManager2 = 1;
        this.$CallbackDependencyManager3 = {};
    }

    h.prototype.$CallbackDependencyManager4 = function (i, j) {
        "use strict";
        var k = 0, l = {};
        for (var m = 0, n = j.length; m < n; m++)l[j[m]] = 1;
        for (var o in l) {
            if (this.$CallbackDependencyManager3[o])continue;
            k++;
            if (this.$CallbackDependencyManager0[o] === undefined)this.$CallbackDependencyManager0[o] = {};
            this.$CallbackDependencyManager0[o][i] = (this.$CallbackDependencyManager0[o][i] || 0) + 1;
        }
        return k;
    };
    h.prototype.$CallbackDependencyManager5 = function (i) {
        "use strict";
        if (!this.$CallbackDependencyManager0[i])return;
        for (var j in this.$CallbackDependencyManager0[i]) {
            this.$CallbackDependencyManager0[i][j]--;
            if (this.$CallbackDependencyManager0[i][j] <= 0)delete this.$CallbackDependencyManager0[i][j];
            this.$CallbackDependencyManager1[j].$CallbackDependencyManager6--;
            if (this.$CallbackDependencyManager1[j].$CallbackDependencyManager6 <= 0) {
                var k = this.$CallbackDependencyManager1[j].$CallbackDependencyManager7;
                delete this.$CallbackDependencyManager1[j];
                g.applyWithGuard(k);
            }
        }
    };
    h.prototype.addDependenciesToExistingCallback = function (i, j) {
        "use strict";
        if (!this.$CallbackDependencyManager1[i])return null;
        var k = this.$CallbackDependencyManager4(i, j);
        this.$CallbackDependencyManager1[i].$CallbackDependencyManager6 += k;
        return i;
    };
    h.prototype.isPersistentDependencySatisfied = function (i) {
        "use strict";
        return !!this.$CallbackDependencyManager3[i];
    };
    h.prototype.satisfyPersistentDependency = function (i) {
        "use strict";
        this.$CallbackDependencyManager3[i] = 1;
        this.$CallbackDependencyManager5(i);
    };
    h.prototype.satisfyNonPersistentDependency = function (i) {
        "use strict";
        var j = this.$CallbackDependencyManager3[i] === 1;
        if (!j)this.$CallbackDependencyManager3[i] = 1;
        this.$CallbackDependencyManager5(i);
        if (!j)delete this.$CallbackDependencyManager3[i];
    };
    h.prototype.registerCallback = function (i, j) {
        "use strict";
        var k = this.$CallbackDependencyManager2;
        this.$CallbackDependencyManager2++;
        var l = this.$CallbackDependencyManager4(k, j);
        if (l === 0) {
            g.applyWithGuard(i);
            return null;
        }
        this.$CallbackDependencyManager1[k] = {$CallbackDependencyManager7: i, $CallbackDependencyManager6: l};
        return k;
    };
    h.prototype.unsatisfyPersistentDependency = function (i) {
        "use strict";
        delete this.$CallbackDependencyManager3[i];
    };
    e.exports = h;
}, null);
__d("EventSubscription", [], function (a, b, c, d, e, f) {
    'use strict';
    function g(h) {
        this.subscriber = h;
    }

    g.prototype.remove = function () {
        this.subscriber.removeSubscription(this);
    };
    e.exports = g;
}, null);
__d("EmitterSubscription", ["EventSubscription"], function (a, b, c, d, e, f, g) {
    'use strict';
    for (var h in g)if (g.hasOwnProperty(h))j[h] = g[h];
    var i = g === null ? null : g.prototype;
    j.prototype = Object.create(i);
    j.prototype.constructor = j;
    j.__superConstructor__ = g;
    function j(k, l, m) {
        g.call(this, k);
        this.listener = l;
        this.context = m;
    }

    e.exports = j;
}, null);
__d("invariant", [], function (a, b, c, d, e, f) {
    "use strict";
    var g = function (h, i, j, k, l, m, n, o) {
        if (!h) {
            var p;
            if (i === undefined) {
                p = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
            } else {
                var q = [j, k, l, m, n, o], r = 0;
                p = new Error('Invariant Violation: ' + i.replace(/%s/g, function () {
                    return q[r++];
                }));
            }
            p.framesToPop = 1;
            throw p;
        }
    };
    e.exports = g;
}, null);
__d("EventSubscriptionVendor", ["invariant"], function (a, b, c, d, e, f, g) {
    'use strict';
    function h() {
        this.$EventSubscriptionVendor0 = {};
        this.$EventSubscriptionVendor1 = null;
    }

    h.prototype.addSubscription = function (i, j) {
        g(j.subscriber === this);
        if (!this.$EventSubscriptionVendor0[i])this.$EventSubscriptionVendor0[i] = [];
        var k = this.$EventSubscriptionVendor0[i].length;
        this.$EventSubscriptionVendor0[i].push(j);
        j.eventType = i;
        j.key = k;
        return j;
    };
    h.prototype.removeAllSubscriptions = function (i) {
        if (i === undefined) {
            this.$EventSubscriptionVendor0 = {};
        } else delete this.$EventSubscriptionVendor0[i];
    };
    h.prototype.removeSubscription = function (i) {
        var j = i.eventType, k = i.key, l = this.$EventSubscriptionVendor0[j];
        if (l)delete l[k];
    };
    h.prototype.getSubscriptionsForType = function (i) {
        return this.$EventSubscriptionVendor0[i];
    };
    e.exports = h;
}, null);
__d("emptyFunction", ["copyProperties"], function (a, b, c, d, e, f, g) {
    function h(j) {
        return function () {
            return j;
        };
    }

    function i() {
    }

    g(i, {thatReturns: h, thatReturnsFalse: h(false), thatReturnsTrue: h(true), thatReturnsNull: h(null), thatReturnsThis: function () {
        return this;
    }, thatReturnsArgument: function (j) {
        return j;
    }});
    e.exports = i;
}, null);
__d("EventEmitter", ["EmitterSubscription", "ErrorUtils", "EventSubscriptionVendor", "emptyFunction", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l() {
        "use strict";
        this.$EventEmitter0 = new i();
    }

    l.prototype.addListener = function (m, n, o) {
        "use strict";
        return this.$EventEmitter0.addSubscription(m, new g(this.$EventEmitter0, n, o));
    };
    l.prototype.once = function (m, n, o) {
        "use strict";
        var p = this;
        return this.addListener(m, function () {
            p.removeCurrentListener();
            n.apply(o, arguments);
        });
    };
    l.prototype.removeAllListeners = function (m) {
        "use strict";
        this.$EventEmitter0.removeAllSubscriptions(m);
    };
    l.prototype.removeCurrentListener = function () {
        "use strict";
        k(!!this.$EventEmitter1);
        this.$EventEmitter0.removeSubscription(this.$EventEmitter1);
    };
    l.prototype.listeners = function (m) {
        "use strict";
        var n = this.$EventEmitter0.getSubscriptionsForType(m);
        return n ? n.filter(j.thatReturnsTrue).map(function (o) {
            return o.listener;
        }) : [];
    };
    l.prototype.emit = function (m) {
        "use strict";
        var n = this.$EventEmitter0.getSubscriptionsForType(m);
        if (n) {
            var o = Object.keys(n);
            for (var p = 0; p < o.length; p++) {
                var q = o[p], r = n[q];
                if (r) {
                    this.$EventEmitter1 = r;
                    h.applyWithGuard(r.listener, r.context, Array.prototype.slice.call(arguments, 1), null, 'EventEmitter:' + m);
                }
            }
            this.$EventEmitter1 = null;
        }
    };
    e.exports = l;
}, null);
__d("EventEmitterWithHolding", [], function (a, b, c, d, e, f) {
    'use strict';
    function g(h, i) {
        this.$EventEmitterWithHolding0 = h;
        this.$EventEmitterWithHolding1 = i;
        this.$EventEmitterWithHolding2 = null;
        this.$EventEmitterWithHolding3 = [];
        this.$EventEmitterWithHolding4 = 0;
    }

    g.prototype.addListener = function (h, i, j) {
        return this.$EventEmitterWithHolding0.addListener(h, i, j);
    };
    g.prototype.once = function (h, i, j) {
        return this.$EventEmitterWithHolding0.once(h, i, j);
    };
    g.prototype.addRetroactiveListener = function (h, i, j) {
        var k = this.$EventEmitterWithHolding0.addListener(h, i, j), l = this.$EventEmitterWithHolding3;
        l.push(false);
        this.$EventEmitterWithHolding4++;
        this.$EventEmitterWithHolding1.emitToListener(h, i, j);
        this.$EventEmitterWithHolding4--;
        if (l[l.length - 1])k.remove();
        l.pop();
        return k;
    };
    g.prototype.removeAllListeners = function (h) {
        this.$EventEmitterWithHolding0.removeAllListeners(h);
    };
    g.prototype.removeCurrentListener = function () {
        if (this.$EventEmitterWithHolding4) {
            var h = this.$EventEmitterWithHolding3;
            h[h.length - 1] = true;
        } else this.$EventEmitterWithHolding0.removeCurrentListener();
    };
    g.prototype.listeners = function (h) {
        return this.$EventEmitterWithHolding0.listeners(h);
    };
    g.prototype.emit = function (h, i, j, k, l, m, n) {
        this.$EventEmitterWithHolding0.emit(h, i, j, k, l, m, n);
    };
    g.prototype.emitAndHold = function (h, i, j, k, l, m, n) {
        this.$EventEmitterWithHolding2 = this.$EventEmitterWithHolding1.holdEvent(h, i, j, k, l, m, n);
        this.$EventEmitterWithHolding0.emit(h, i, j, k, l, m, n);
        this.$EventEmitterWithHolding2 = null;
    };
    g.prototype.releaseCurrentEvent = function () {
        if (this.$EventEmitterWithHolding2 !== null) {
            this.$EventEmitterWithHolding1.releaseEvent(this.$EventEmitterWithHolding2);
        } else if (!!this.$EventEmitterWithHolding4)this.$EventEmitterWithHolding1.releaseCurrentEvent();
    };
    g.prototype.releaseHeldEventType = function (h) {
        this.$EventEmitterWithHolding1.releaseEventType(h);
    };
    e.exports = g;
}, null);
__d("EventHolder", ["invariant"], function (a, b, c, d, e, f, g) {
    'use strict';
    function h() {
        this.$EventHolder0 = {};
        this.$EventHolder1 = [];
    }

    h.prototype.holdEvent = function (i, j, k, l, m, n, o) {
        this.$EventHolder0[i] = this.$EventHolder0[i] || [];
        var p = this.$EventHolder0[i], q = {eventType: i, index: p.length};
        p.push([j, k, l, m, n, o]);
        return q;
    };
    h.prototype.emitToListener = function (i, j, k) {
        var l = this.$EventHolder0[i];
        if (!l)return;
        l.forEach(function (m, n) {
            if (!m)return;
            this.$EventHolder1.push({eventType: i, index: n});
            j.apply(k, m);
            this.$EventHolder1.pop();
        }.bind(this));
    };
    h.prototype.releaseCurrentEvent = function () {
        g(this.$EventHolder1.length);
        this.releaseEvent(this.$EventHolder1[this.$EventHolder1.length - 1]);
    };
    h.prototype.releaseEvent = function (i) {
        delete this.$EventHolder0[i.eventType][i.index];
    };
    h.prototype.releaseEventType = function (i) {
        this.$EventHolder0[i] = [];
    };
    e.exports = h;
}, null);
__d("toArray", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(i) {
        var j = i.length;
        g(!Array.isArray(i) && (typeof i === 'object' || typeof i === 'function'));
        g(typeof j === 'number');
        g(j === 0 || (j - 1) in i);
        if (i.hasOwnProperty)try {
            return Array.prototype.slice.call(i);
        } catch (k) {
        }
        var l = Array(j);
        for (var m = 0; m < j; m++)l[m] = i[m];
        return l;
    }

    e.exports = h;
}, null);
__d("createArrayFrom", ["toArray"], function (a, b, c, d, e, f, g) {
    function h(j) {
        return (!!j && (typeof j == 'object' || typeof j == 'function') && ('length' in j) && !('setInterval' in j) && (typeof j.nodeType != 'number') && (Array.isArray(j) || ('callee' in j) || ('item' in j)));
    }

    function i(j) {
        if (!h(j)) {
            return [j];
        } else if (Array.isArray(j)) {
            return j.slice();
        } else return g(j);
    }

    e.exports = i;
}, null);
__d("Arbiter", ["CallbackDependencyManager", "ErrorUtils", "EventEmitter", "EventEmitterWithHolding", "EventHolder", "copyProperties", "createArrayFrom", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    'use strict';
    function o() {
        var t = new i();
        this.$Arbiter0 = new r();
        this.$Arbiter1 = new j(t, this.$Arbiter0);
        this.$Arbiter2 = new g();
        this.$Arbiter3 = [];
    }

    o.prototype.subscribe = function (t, u, v) {
        t = m(t);
        t.forEach(function (x) {
            n(x && typeof x === 'string');
        });
        n(typeof u === 'function');
        v = v || o.SUBSCRIBE_ALL;
        n(v === o.SUBSCRIBE_NEW || v === o.SUBSCRIBE_ALL);
        var w = t.map(function (x) {
            var y = this.$Arbiter4.bind(this, u, x);
            if (v === o.SUBSCRIBE_NEW)return this.$Arbiter1.addListener(x, y);
            this.$Arbiter3.push({});
            var z = this.$Arbiter1.addRetroactiveListener(x, y);
            this.$Arbiter3.pop();
            return z;
        }, this);
        return new s(this, w);
    };
    o.prototype.$Arbiter4 = function (t, u, v) {
        var w = this.$Arbiter3[this.$Arbiter3.length - 1];
        if (w[u] === false)return;
        var x = h.applyWithGuard(t, null, [u, v]);
        if (x === false)this.$Arbiter1.releaseCurrentEvent();
        w[u] = x;
    };
    o.prototype.unsubscribeCurrentSubscription = function () {
        this.$Arbiter1.removeCurrentListener();
    };
    o.prototype.releaseCurrentPersistentEvent = function () {
        this.$Arbiter1.releaseCurrentEvent();
    };
    o.prototype.subscribeOnce = function (t, u, v) {
        var w = this.subscribe(t, function (x, y) {
            this.unsubscribeCurrentSubscription();
            return u(x, y);
        }.bind(this), v);
        return w;
    };
    o.prototype.unsubscribe = function (t) {
        n(t.isForArbiterInstance(this));
        t.unsubscribe();
    };
    o.prototype.inform = function (t, u, v) {
        var w = Array.isArray(t);
        t = m(t);
        v = v || o.BEHAVIOR_EVENT;
        var x = (v === o.BEHAVIOR_STATE) || (v === o.BEHAVIOR_PERSISTENT);
        this.$Arbiter3.push({});
        for (var y = 0; y < t.length; y++) {
            var z = t[y];
            n(z);
            this.$Arbiter0.setHoldingBehavior(z, v);
            this.$Arbiter1.emitAndHold(z, u);
            this.$Arbiter5(z, u, x);
        }
        var aa = this.$Arbiter3.pop();
        return w ? aa : aa[t[0]];
    };
    o.prototype.query = function (t) {
        var u = this.$Arbiter0.getHoldingBehavior(t);
        n(!u || u === o.BEHAVIOR_STATE);
        var v = null;
        this.$Arbiter0.emitToListener(t, function (w) {
            v = w;
        });
        return v;
    };
    o.prototype.registerCallback = function (t, u) {
        if (typeof t === 'function') {
            return this.$Arbiter2.registerCallback(t, u);
        } else return this.$Arbiter2.addDependenciesToExistingCallback(t, u);
    };
    o.prototype.$Arbiter5 = function (t, u, v) {
        if (u === null)return;
        if (v) {
            this.$Arbiter2.satisfyPersistentDependency(t);
        } else this.$Arbiter2.satisfyNonPersistentDependency(t);
    };
    for (var p in k)if (k.hasOwnProperty(p))r[p] = k[p];
    var q = k === null ? null : k.prototype;
    r.prototype = Object.create(q);
    r.prototype.constructor = r;
    r.__superConstructor__ = k;
    function r() {
        k.call(this);
        this.$ArbiterEventHolder0 = {};
    }

    r.prototype.setHoldingBehavior = function (t, u) {
        this.$ArbiterEventHolder0[t] = u;
    };
    r.prototype.getHoldingBehavior = function (t) {
        return this.$ArbiterEventHolder0[t];
    };
    r.prototype.holdEvent = function (t, u, v, w, x) {
        var y = this.$ArbiterEventHolder0[t];
        if (y !== o.BEHAVIOR_PERSISTENT)this.$ArbiterEventHolder2(t);
        if (y !== o.BEHAVIOR_EVENT)return q.holdEvent.call(this, t, u, v, w, x);
    };
    r.prototype.$ArbiterEventHolder2 = function (t) {
        this.emitToListener(t, this.releaseCurrentEvent, this);
    };
    r.prototype.releaseEvent = function (t) {
        if (t)q.releaseEvent.call(this, t);
    };
    l(o, {SUBSCRIBE_NEW: 'new', SUBSCRIBE_ALL: 'all', BEHAVIOR_EVENT: 'event', BEHAVIOR_STATE: 'state', BEHAVIOR_PERSISTENT: 'persistent'});
    function s(t, u) {
        this.$ArbiterToken0 = t;
        this.$ArbiterToken1 = u;
    }

    s.prototype.unsubscribe = function () {
        for (var t = 0; t < this.$ArbiterToken1.length; t++)this.$ArbiterToken1[t].remove();
        this.$ArbiterToken1.length = 0;
    };
    s.prototype.isForArbiterInstance = function (t) {
        n(this.$ArbiterToken0);
        return this.$ArbiterToken0 === t;
    };
    Object.keys(o.prototype).forEach(function (t) {
        o[t] = function () {
            var u = (this instanceof o) ? this : o;
            return o.prototype[t].apply(u, arguments);
        };
    });
    o.call(o);
    e.exports = o;
}, null);
__d("guid", [], function (a, b, c, d, e, f) {
    function g() {
        return 'f' + (Math.random() * (1 << 30)).toString(16).replace('.', '');
    }

    e.exports = g;
}, null);
__d("ArbiterMixin", ["Arbiter", "guid"], function (a, b, c, d, e, f, g, h) {
    var i = "arbiter$" + h(), j = Object.prototype.hasOwnProperty, k = {_getArbiterInstance: function () {
        return j.call(this, i) ? this[i] : this[i] = new g();
    }, inform: function (l, m, n) {
        return this._getArbiterInstance().inform(l, m, n);
    }, subscribe: function (l, m, n) {
        return this._getArbiterInstance().subscribe(l, m, n);
    }, subscribeOnce: function (l, m, n) {
        return this._getArbiterInstance().subscribeOnce(l, m, n);
    }, unsubscribe: function (l) {
        this._getArbiterInstance().unsubscribe(l);
    }, unsubscribeCurrentSubscription: function () {
        this._getArbiterInstance().unsubscribeCurrentSubscription();
    }, releaseCurrentPersistentEvent: function () {
        this._getArbiterInstance().releaseCurrentPersistentEvent();
    }, registerCallback: function (l, m) {
        return this._getArbiterInstance().registerCallback(l, m);
    }, query: function (l) {
        return this._getArbiterInstance().query(l);
    }};
    e.exports = k;
}, null);
__d("legacy:ArbiterMixin", ["ArbiterMixin"], function (a, b, c, d) {
    a.ArbiterMixin = b('ArbiterMixin');
}, 3);
__d("$", ["ex"], function (a, b, c, d, e, f, g) {
    function h(j) {
        var k = typeof j === 'string' ? document.getElementById(j) : j;
        if (!k)throw new Error(g('Tried to get element with id of "%s" but it is not present on the page.', j));
        return k;
    }

    function i(j) {
        return h(j);
    }

    i.unsafe = h;
    e.exports = i;
}, null);
__d("CSSCore", ["invariant"], function (a, b, c, d, e, f, g) {
    var h = {addClass: function (i, j) {
        g(!/\s/.test(j));
        if (j)if (i.classList) {
            i.classList.add(j);
        } else if (!h.hasClass(i, j))i.className = i.className + ' ' + j;
        return i;
    }, removeClass: function (i, j) {
        g(!/\s/.test(j));
        if (j)if (i.classList) {
            i.classList.remove(j);
        } else if (h.hasClass(i, j))i.className = i.className.replace(new RegExp('(^|\\s)' + j + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
        return i;
    }, conditionClass: function (i, j, k) {
        return (k ? h.addClass : h.removeClass)(i, j);
    }, hasClass: function (i, j) {
        g(!/\s/.test(j));
        if (i.classList)return !!j && i.classList.contains(j);
        return (' ' + i.className + ' ').indexOf(' ' + j + ' ') > -1;
    }};
    e.exports = h;
}, null);
__d("CSS", ["CSSCore", "$"], function (a, b, c, d, e, f, g) {
    var h = b('$').unsafe, i = 'hidden_elem', j = {setClass: function (k, l) {
        h(k).className = l || '';
        return k;
    }, hasClass: function (k, l) {
        return g.hasClass(h(k), l);
    }, addClass: function (k, l) {
        return g.addClass(h(k), l);
    }, removeClass: function (k, l) {
        return g.removeClass(h(k), l);
    }, conditionClass: function (k, l, m) {
        return g.conditionClass(h(k), l, m);
    }, toggleClass: function (k, l) {
        return j.conditionClass(k, l, !j.hasClass(k, l));
    }, shown: function (k) {
        return !j.hasClass(k, i);
    }, hide: function (k) {
        return j.addClass(k, i);
    }, show: function (k) {
        return j.removeClass(k, i);
    }, toggle: function (k) {
        return j.toggleClass(k, i);
    }, conditionShow: function (k, l) {
        return j.conditionClass(k, i, !l);
    }};
    e.exports = j;
}, null);
__d("legacy:css", ["CSS"], function (a, b, c, d) {
    a.CSS = b('CSS');
}, 3);
__d("ge", [], function (a, b, c, d, e, f) {
    function g(j, k, l) {
        return typeof j != 'string' ? j : !k ? document.getElementById(j) : h(j, k, l);
    }

    function h(j, k, l) {
        var m, n, o;
        if (i(k) == j) {
            return k;
        } else if (k.getElementsByTagName) {
            n = k.getElementsByTagName(l || '*');
            for (o = 0; o < n.length; o++)if (i(n[o]) == j)return n[o];
        } else {
            n = k.childNodes;
            for (o = 0; o < n.length; o++) {
                m = h(j, n[o]);
                if (m)return m;
            }
        }
        return null;
    }

    function i(j) {
        return j.getAttribute ? j.getAttribute('id') : null;
    }

    e.exports = g;
}, null);
__d("legacy:dom-core", ["$", "ge"], function (a, b, c, d) {
    a.$ = b('$');
    a.ge = b('ge');
}, 3);
__d("Parent", ["CSSCore"], function (a, b, c, d, e, f, g) {
    var h = {byTag: function (i, j) {
        j = j.toUpperCase();
        while (i && i.nodeName !== j)i = i.parentNode;
        return i;
    }, byClass: function (i, j) {
        while (i && !g.hasClass(i, j))i = i.parentNode;
        return i;
    }, byAttribute: function (i, j) {
        while (i && (!i.getAttribute || !i.getAttribute(j)))i = i.parentNode;
        return i;
    }};
    e.exports = h;
}, null);
__d("legacy:parent", ["Parent"], function (a, b, c, d) {
    a.Parent = b('Parent');
}, 3);
__d("CookieCore", [], function (a, b, c, d, e, f) {
    var g = {set: function (h, i, j, k, l) {
        document.cookie = h + "=" + encodeURIComponent(i) + "; " + (j ? "expires=" + (new Date(Date.now() + j)).toGMTString() + "; " : "") + "path=" + (k || '/') + "; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1') + (l ? "; secure" : "");
    }, clear: function (h, i) {
        i = i || '/';
        document.cookie = h + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; " + "path=" + i + "; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
    }, get: function (h) {
        var i = document.cookie.match('(?:^|;\\s*)' + h + '=(.*?)(?:;|$)');
        return (i ? decodeURIComponent(i[1]) : i);
    }};
    e.exports = g;
}, null);
__d("Cookie", ["CookieCore", "Env", "copyProperties"], function (a, b, c, d, e, f, g, h, i) {
    function j(l, m, n, o, p) {
        if (h.no_cookies && l != 'tpa')return;
        g.set(l, m, n, o, p);
    }

    var k = i({}, g);
    k.set = j;
    e.exports = k;
}, null);
__d("CurrentUser", ["Cookie", "CurrentUserInitialData"], function (a, b, c, d, e, f, g, h) {
    var i = {getID: function () {
        return h.USER_ID;
    }, getAccountID: function () {
        return h.ACCOUNT_ID;
    }, isLoggedIn: function () {
        return h.USER_ID && h.USER_ID !== '0';
    }, isLoggedInNow: function () {
        if (!i.isLoggedIn())return false;
        if (h.IS_INTERN_SITE)return true;
        if (h.ORIGINAL_USER_ID)return h.ORIGINAL_USER_ID === g.get('c_user');
        return h.USER_ID === g.get('c_user');
    }, isEmployee: function () {
        return !!h.IS_EMPLOYEE;
    }, isGray: function () {
        return !!h.IS_GRAY;
    }};
    e.exports = i;
}, null);
__d("Miny", [], function (a, b, c, d, e, f) {
    var g = 'Miny1', h = {encode: [], decode: {}}, i = 'wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');

    function j(n) {
        for (var o = h.encode.length; o < n; o++) {
            var p = o.toString(32).split('');
            p[p.length - 1] = i[parseInt(p[p.length - 1], 32)];
            p = p.join('');
            h.encode[o] = p;
            h.decode[p] = o;
        }
        return h;
    }

    function k(n) {
        if (/^$|[~\\]|__proto__/.test(n))return n;
        var o = n.match(/\w+|\W+/g), p = {};
        for (var q = 0; q < o.length; q++)p[o[q]] = (p[o[q]] || 0) + 1;
        var r = Object.keys(p);
        r.sort(function (u, v) {
            return p[u] < p[v] ? 1 : (p[v] < p[u] ? -1 : 0);
        });
        var s = j(r.length).encode;
        for (q = 0; q < r.length; q++)p[r[q]] = s[q];
        var t = [];
        for (q = 0; q < o.length; q++)t[q] = p[o[q]];
        return [g, r.length].concat(r).concat(t.join('')).join('~');
    }

    function l(n) {
        var o = n.split('~');
        if (o.shift() != g)return n;
        var p = parseInt(o.shift(), 10), q = o.pop();
        q = q.match(/[0-9a-v]*[\-w-zA-Z_]/g);
        var r = o, s = j(p).decode, t = [];
        for (var u = 0; u < q.length; u++)t[u] = r[s[q[u]]];
        return t.join('');
    }

    var m = {encode: k, decode: l};
    e.exports = m;
}, null);
__d("QueryString", [], function (a, b, c, d, e, f) {
    function g(k) {
        var l = [];
        Object.keys(k).sort().forEach(function (m) {
            var n = k[m];
            if (typeof n === 'undefined')return;
            if (n === null) {
                l.push(m);
                return;
            }
            l.push(encodeURIComponent(m) + '=' + encodeURIComponent(n));
        });
        return l.join('&');
    }

    function h(k, l) {
        var m = {};
        if (k === '')return m;
        var n = k.split('&');
        for (var o = 0; o < n.length; o++) {
            var p = n[o].split('=', 2), q = decodeURIComponent(p[0]);
            if (l && m.hasOwnProperty(q))throw new URIError('Duplicate key: ' + q);
            m[q] = p.length === 2 ? decodeURIComponent(p[1]) : null;
        }
        return m;
    }

    function i(k, l) {
        return k + (~k.indexOf('?') ? '&' : '?') + (typeof l === 'string' ? l : j.encode(l));
    }

    var j = {encode: g, decode: h, appendToUrl: i};
    e.exports = j;
}, null);
__d("ExecutionEnvironment", [], function (a, b, c, d, e, f) {
    "use strict";
    var g = !!(typeof window !== 'undefined' && window.document && window.document.createElement), h = {canUseDOM: g, canUseWorkers: typeof Worker !== 'undefined', canUseEventListeners: g && !!(window.addEventListener || window.attachEvent), canUseViewport: g && !!window.screen, isInWorker: !g};
    e.exports = h;
}, null);
__d("OnloadEvent", [], function (a, b, c, d, e, f) {
    var g = {ONLOAD: 'onload/onload', ONLOAD_CALLBACK: 'onload/onload_callback', ONLOAD_DOMCONTENT: 'onload/dom_content_ready', ONLOAD_DOMCONTENT_CALLBACK: 'onload/domcontent_callback', ONBEFOREUNLOAD: 'onload/beforeunload', ONUNLOAD: 'onload/unload'};
    e.exports = g;
}, null);
__d("Run", ["Arbiter", "ExecutionEnvironment", "OnloadEvent"], function (a, b, c, d, e, f, g, h, i) {
    var j = 'onunloadhooks', k = 'onafterunloadhooks', l = g.BEHAVIOR_STATE;

    function m(ca) {
        var da = a.CavalryLogger;
        da && da.getInstance().setTimeStamp(ca);
    }

    function n() {
        return !window.loading_page_chrome;
    }

    function o(ca) {
        var da = a.OnloadHooks;
        if (window.loaded && da) {
            da.runHook(ca, 'onlateloadhooks');
        } else v('onloadhooks', ca);
    }

    function p(ca) {
        var da = a.OnloadHooks;
        if (window.afterloaded && da) {
            setTimeout(function () {
                da.runHook(ca, 'onlateafterloadhooks');
            }, 0);
        } else v('onafterloadhooks', ca);
    }

    function q(ca, da) {
        if (da === undefined)da = n();
        da ? v('onbeforeleavehooks', ca) : v('onbeforeunloadhooks', ca);
    }

    function r(ca, da) {
        if (!window.onunload)window.onunload = function () {
            g.inform(i.ONUNLOAD, true, l);
        };
        v(ca, da);
    }

    function s(ca) {
        r(j, ca);
    }

    function t(ca) {
        r(k, ca);
    }

    function u(ca) {
        v('onleavehooks', ca);
    }

    function v(ca, da) {
        window[ca] = (window[ca] || []).concat(da);
    }

    function w(ca) {
        window[ca] = [];
    }

    function x() {
        g.inform(i.ONLOAD_DOMCONTENT, true, l);
    }

    a._domcontentready = x;
    function y() {
        var ca = document, da = window;
        if (ca.addEventListener) {
            var ea = /AppleWebKit.(\d+)/.exec(navigator.userAgent);
            if (ea && ea[1] < 525) {
                var fa = setInterval(function () {
                    if (/loaded|complete/.test(ca.readyState)) {
                        x();
                        clearInterval(fa);
                    }
                }, 10);
            } else ca.addEventListener("DOMContentLoaded", x, true);
        } else {
            var ga = 'javascript:void(0)';
            if (da.location.protocol == 'https:')ga = '//:';
            ca.write('<script onreadystatechange="if (this.readyState==\'complete\') {' + 'this.parentNode.removeChild(this);_domcontentready();}" ' + 'defer="defer" src="' + ga + '"><\/script\>');
        }
        var ha = da.onload;
        da.onload = function () {
            m('t_layout');
            ha && ha();
            g.inform(i.ONLOAD, true, l);
        };
        da.onbeforeunload = function () {
            var ia = {};
            g.inform(i.ONBEFOREUNLOAD, ia, l);
            if (!ia.warn)g.inform('onload/exit', true);
            return ia.warn;
        };
    }

    var z = g.registerCallback(function () {
        m('t_onload');
        g.inform(i.ONLOAD_CALLBACK, true, l);
    }, [i.ONLOAD]), aa = g.registerCallback(function () {
        m('t_domcontent');
        var ca = {timeTriggered: Date.now()};
        g.inform(i.ONLOAD_DOMCONTENT_CALLBACK, ca, l);
    }, [i.ONLOAD_DOMCONTENT]);
    if (h.canUseDOM)y();
    var ba = {onLoad: o, onAfterLoad: p, onLeave: u, onBeforeUnload: q, onUnload: s, onAfterUnload: t, __domContentCallback: aa, __onloadCallback: z, __removeHook: w};
    e.exports = ba;
}, null);
__d("UserAgent_DEPRECATED", [], function (a, b, c, d, e, f) {
    var g = false, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v;

    function w() {
        if (g)return;
        g = true;
        var y = navigator.userAgent, z = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(y), aa = /(Mac OS X)|(Windows)|(Linux)/.exec(y);
        s = /\b(iPhone|iP[ao]d)/.exec(y);
        t = /\b(iP[ao]d)/.exec(y);
        q = /Android/i.exec(y);
        u = /FBAN\/\w+;/i.exec(y);
        v = /Mobile/i.exec(y);
        r = !!(/Win64/.exec(y));
        if (z) {
            h = z[1] ? parseFloat(z[1]) : (z[5] ? parseFloat(z[5]) : NaN);
            if (h && document && document.documentMode)h = document.documentMode;
            var ba = /(?:Trident\/(\d+.\d+))/.exec(y);
            m = ba ? parseFloat(ba[1]) + 4 : h;
            i = z[2] ? parseFloat(z[2]) : NaN;
            j = z[3] ? parseFloat(z[3]) : NaN;
            k = z[4] ? parseFloat(z[4]) : NaN;
            if (k) {
                z = /(?:Chrome\/(\d+\.\d+))/.exec(y);
                l = z && z[1] ? parseFloat(z[1]) : NaN;
            } else l = NaN;
        } else h = i = j = l = k = NaN;
        if (aa) {
            if (aa[1]) {
                var ca = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(y);
                n = ca ? parseFloat(ca[1].replace('_', '.')) : true;
            } else n = false;
            o = !!aa[2];
            p = !!aa[3];
        } else n = o = p = false;
    }

    var x = {ie: function () {
        return w() || h;
    }, ieCompatibilityMode: function () {
        return w() || (m > h);
    }, ie64: function () {
        return x.ie() && r;
    }, firefox: function () {
        return w() || i;
    }, opera: function () {
        return w() || j;
    }, webkit: function () {
        return w() || k;
    }, safari: function () {
        return x.webkit();
    }, chrome: function () {
        return w() || l;
    }, windows: function () {
        return w() || o;
    }, osx: function () {
        return w() || n;
    }, linux: function () {
        return w() || p;
    }, iphone: function () {
        return w() || s;
    }, mobile: function () {
        return w() || (s || t || q || v);
    }, nativeApp: function () {
        return w() || u;
    }, android: function () {
        return w() || q;
    }, ipad: function () {
        return w() || t;
    }};
    e.exports = x;
}, null);
__d("CurrentCommunity", ["CurrentCommunityInitialData"], function (a, b, c, d, e, f, g) {
    var h = {getID: function () {
        return g.COMMUNITY_ID || '0';
    }};
    e.exports = h;
}, null);
__d("DTSG", ["DTSGInitialData"], function (a, b, c, d, e, f, g) {
    var h = g.token || null, i = {setToken: function (j) {
        h = j;
    }, getToken: function () {
        return h;
    }};
    e.exports = i;
}, null);
__d("repeatString", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(i, j) {
        if (j === 1)return i;
        g(j >= 0);
        var k = '';
        while (j) {
            if (j & 1)k += i;
            if ((j >>= 1))i += i;
        }
        return k;
    }

    e.exports = h;
}, null);
__d("BitMap", ["copyProperties", "repeatString"], function (a, b, c, d, e, f, g, h) {
    var i = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

    function j() {
        this._bits = [];
    }

    g(j.prototype, {set: function (m) {
        this._bits[m] = 1;
        return this;
    }, toString: function () {
        var m = [];
        for (var n = 0; n < this._bits.length; n++)m.push(this._bits[n] ? 1 : 0);
        return m.length ? l(m.join('')) : '';
    }, toCompressedString: function () {
        if (this._bits.length === 0)return '';
        var m = [], n = 1, o = this._bits[0] || 0, p = o.toString(2);
        for (var q = 1; q < this._bits.length; q++) {
            var r = this._bits[q] || 0;
            if (r === o) {
                n++;
            } else {
                m.push(k(n));
                o = r;
                n = 1;
            }
        }
        if (n)m.push(k(n));
        return l(p + m.join(''));
    }});
    function k(m) {
        var n = m.toString(2), o = h('0', n.length - 1);
        return o + n;
    }

    function l(m) {
        var n = (m + '00000').match(/[01]{6}/g), o = '';
        for (var p = 0; p < n.length; p++)o += i[parseInt(n[p], 2)];
        return o;
    }

    e.exports = j;
}, null);
__d("replaceTransportMarkers", ["ge"], function (a, b, c, d, e, f, g) {
    function h(i, j, k) {
        var l = (typeof k !== 'undefined') ? j[k] : j, m;
        if (Array.isArray(l)) {
            for (m = 0; m < l.length; m++)h(i, l, m);
        } else if (l && typeof l == 'object')if (l.__m) {
            j[k] = b.call(null, l.__m);
        } else if (l.__e) {
            j[k] = g(l.__e);
        } else if (l.__rel) {
            j[k] = i;
        } else for (var n in l)h(i, l, n);
    }

    e.exports = h;
}, null);
__d("ServerJSDefine", ["BitMap", "replaceTransportMarkers"], function (a, b, c, d, e, f, g, h) {
    var i = new g(), j = {getLoadedModuleHash: function () {
        return i.toCompressedString();
    }, handleDefine: function (k, l, m, n, o) {
        i.set(n);
        define(k, l, function () {
            h(o, m);
            return m;
        });
    }, handleDefines: function (k, l) {
        k.map(function (m) {
            if (l)m.push(l);
            j.handleDefine.apply(null, m);
        });
    }};
    e.exports = j;
}, null);
__d("URIRFC3986", [], function (a, b, c, d, e, f) {
    var g = new RegExp('^' + '([^:/?#]+:)?' + '(//' + '([^\\\\/?#@]*@)?' + '(' + '\\[[A-Fa-f0-9:.]+\\]|' + '[^\\/?#:]*' + ')' + '(:[0-9]*)?' + ')?' + '([^?#]*)' + '(\\?[^#]*)?' + '(#.*)?'), h = {parse: function (i) {
        if (i.trim() === '')return null;
        var j = i.match(g), k = {};
        k.uri = j[0] ? j[0] : null;
        k.scheme = j[1] ? j[1].substr(0, j[1].length - 1) : null;
        k.authority = j[2] ? j[2].substr(2) : null;
        k.userinfo = j[3] ? j[3].substr(0, j[3].length - 1) : null;
        k.host = j[2] ? j[4] : null;
        k.port = j[5] ? (j[5].substr(1) ? parseInt(j[5].substr(1), 10) : null) : null;
        k.path = j[6] ? j[6] : null;
        k.query = j[7] ? j[7].substr(1) : null;
        k.fragment = j[8] ? j[8].substr(1) : null;
        k.isGenericURI = k.authority === null && !!k.scheme;
        return k;
    }};
    e.exports = h;
}, null);
__d("createObjectFrom", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        var j = {}, k = Array.isArray(i);
        if (typeof i == 'undefined')i = true;
        for (var l = h.length; l--;)j[h[l]] = k ? i[l] : i;
        return j;
    }

    e.exports = g;
}, null);
__d("URISchemes", ["createObjectFrom"], function (a, b, c, d, e, f, g) {
    var h = g(['fb', 'fbcf', 'fbconnect', 'fb-messenger', 'fbrpc', 'file', 'ftp', 'http', 'https', 'mailto', 'ms-app', 'itms', 'itms-apps', 'itms-services', 'market', 'svn+ssh', 'fbstaging', 'tel', 'sms', 'pebblejs']), i = {isAllowed: function (j) {
        if (!j)return true;
        return h.hasOwnProperty(j.toLowerCase());
    }};
    e.exports = i;
}, null);
__d("URIBase", ["URIRFC3986", "URISchemes", "copyProperties", "ex", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = new RegExp('[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f' + '\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF' + '\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'), m = new RegExp('^(?:[^/]*:|' + '[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');

    function n(p, q, r, s) {
        if (!q)return true;
        if (q instanceof o) {
            p.setProtocol(q.getProtocol());
            p.setDomain(q.getDomain());
            p.setPort(q.getPort());
            p.setPath(q.getPath());
            p.setQueryData(s.deserialize(s.serialize(q.getQueryData())));
            p.setFragment(q.getFragment());
            p.setForceFragmentSeparator(q.getForceFragmentSeparator());
            return true;
        }
        q = q.toString().trim();
        var t = g.parse(q) || {};
        if (!r && !h.isAllowed(t.scheme))return false;
        p.setProtocol(t.scheme || '');
        if (!r && l.test(t.host))return false;
        p.setDomain(t.host || '');
        p.setPort(t.port || '');
        p.setPath(t.path || '');
        if (r) {
            p.setQueryData(s.deserialize(t.query) || {});
        } else try {
            p.setQueryData(s.deserialize(t.query) || {});
        } catch (u) {
            return false;
        }
        p.setFragment(t.fragment || '');
        if (t.fragment === '')p.setForceFragmentSeparator(true);
        if (t.userinfo !== null)if (r) {
            throw new Error(j('URI.parse: invalid URI (userinfo is not allowed in a URI): %s', p.toString()));
        } else return false;
        if (!p.getDomain() && p.getPath().indexOf('\\') !== -1)if (r) {
            throw new Error(j('URI.parse: invalid URI (no domain but multiple back-slashes): %s', p.toString()));
        } else return false;
        if (!p.getProtocol() && m.test(q))if (r) {
            throw new Error(j('URI.parse: invalid URI (unsafe protocol-relative URLs): %s', p.toString()));
        } else return false;
        return true;
    }

    function o(p, q) {
        "use strict";
        k(q);
        this.$URIBase0 = q;
        this.$URIBase1 = '';
        this.$URIBase2 = '';
        this.$URIBase3 = '';
        this.$URIBase4 = '';
        this.$URIBase5 = '';
        this.$URIBase6 = {};
        this.$URIBase7 = false;
        n(this, p, true, q);
    }

    o.prototype.setProtocol = function (p) {
        "use strict";
        k(h.isAllowed(p));
        this.$URIBase1 = p;
        return this;
    };
    o.prototype.getProtocol = function (p) {
        "use strict";
        return this.$URIBase1;
    };
    o.prototype.setSecure = function (p) {
        "use strict";
        return this.setProtocol(p ? 'https' : 'http');
    };
    o.prototype.isSecure = function () {
        "use strict";
        return this.getProtocol() === 'https';
    };
    o.prototype.setDomain = function (p) {
        "use strict";
        if (l.test(p))throw new Error(j('URI.setDomain: unsafe domain specified: %s for url %s', p, this.toString()));
        this.$URIBase2 = p;
        return this;
    };
    o.prototype.getDomain = function () {
        "use strict";
        return this.$URIBase2;
    };
    o.prototype.setPort = function (p) {
        "use strict";
        this.$URIBase3 = p;
        return this;
    };
    o.prototype.getPort = function () {
        "use strict";
        return this.$URIBase3;
    };
    o.prototype.setPath = function (p) {
        "use strict";
        this.$URIBase4 = p;
        return this;
    };
    o.prototype.getPath = function () {
        "use strict";
        return this.$URIBase4;
    };
    o.prototype.addQueryData = function (p, q) {
        "use strict";
        if (Object.prototype.toString.call(p) === '[object Object]') {
            i(this.$URIBase6, p);
        } else this.$URIBase6[p] = q;
        return this;
    };
    o.prototype.setQueryData = function (p) {
        "use strict";
        this.$URIBase6 = p;
        return this;
    };
    o.prototype.getQueryData = function () {
        "use strict";
        return this.$URIBase6;
    };
    o.prototype.removeQueryData = function (p) {
        "use strict";
        if (!Array.isArray(p))p = [p];
        for (var q = 0, r = p.length; q < r; ++q)delete this.$URIBase6[p[q]];
        return this;
    };
    o.prototype.setFragment = function (p) {
        "use strict";
        this.$URIBase5 = p;
        this.setForceFragmentSeparator(false);
        return this;
    };
    o.prototype.getFragment = function () {
        "use strict";
        return this.$URIBase5;
    };
    o.prototype.setForceFragmentSeparator = function (p) {
        "use strict";
        this.$URIBase7 = p;
        return this;
    };
    o.prototype.getForceFragmentSeparator = function () {
        "use strict";
        return this.$URIBase7;
    };
    o.prototype.isEmpty = function () {
        "use strict";
        return !(this.getPath() || this.getProtocol() || this.getDomain() || this.getPort() || Object.keys(this.getQueryData()).length > 0 || this.getFragment());
    };
    o.prototype.toString = function () {
        "use strict";
        var p = '', q = this.getProtocol();
        if (q)p += q + '://';
        var r = this.getDomain();
        if (r)p += r;
        var s = this.getPort();
        if (s)p += ':' + s;
        var t = this.getPath();
        if (t) {
            p += t;
        } else if (p)p += '/';
        var u = this.$URIBase0.serialize(this.getQueryData());
        if (u)p += '?' + u;
        var v = this.getFragment();
        if (v) {
            p += '#' + v;
        } else if (this.getForceFragmentSeparator())p += '#';
        return p;
    };
    o.prototype.getOrigin = function () {
        "use strict";
        var p = this.getPort();
        return this.getProtocol() + '://' + this.getDomain() + (p ? ':' + p : '');
    };
    o.isValidURI = function (p, q) {
        return n(new o(null, q), p, false, q);
    };
    e.exports = o;
}, null);
__d("PHPQuerySerializer", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(o) {
        return i(o, null);
    }

    function i(o, p) {
        p = p || '';
        var q = [];
        if (o === null || o === undefined) {
            q.push(j(p));
        } else if (typeof(o) == 'object') {
            g(!(('nodeName' in o) || ('nodeType' in o)));
            for (var r in o)if (o.hasOwnProperty(r) && o[r] !== undefined)q.push(i(o[r], p ? (p + '[' + r + ']') : r));
        } else q.push(j(p) + '=' + j(o));
        return q.join('&');
    }

    function j(o) {
        return encodeURIComponent(o).replace(/%5D/g, "]").replace(/%5B/g, "[");
    }

    var k = /^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;

    function l(o) {
        if (!o)return {};
        var p = {};
        o = o.replace(/%5B/ig, '[').replace(/%5D/ig, ']');
        o = o.split('&');
        var q = Object.prototype.hasOwnProperty;
        for (var r = 0, s = o.length; r < s; r++) {
            var t = o[r].match(k);
            if (!t) {
                var u = o[r].split('=');
                p[m(u[0])] = u[1] === undefined ? null : m(u[1]);
            } else {
                var v = t[2].split(/\]\[|\[|\]/).slice(0, -1), w = t[1], x = m(t[3] || '');
                v[0] = w;
                var y = p;
                for (var z = 0; z < v.length - 1; z++)if (v[z]) {
                    if (!q.call(y, v[z])) {
                        var aa = v[z + 1] && !v[z + 1].match(/^\d{1,3}$/) ? {} : [];
                        y[v[z]] = aa;
                        if (y[v[z]] !== aa)return p;
                    }
                    y = y[v[z]];
                } else {
                    if (v[z + 1] && !v[z + 1].match(/^\d{1,3}$/)) {
                        y.push({});
                    } else y.push([]);
                    y = y[y.length - 1];
                }
                if (y instanceof Array && v[v.length - 1] === '') {
                    y.push(x);
                } else y[v[v.length - 1]] = x;
            }
        }
        return p;
    }

    function m(o) {
        return decodeURIComponent(o.replace(/\+/g, ' '));
    }

    var n = {serialize: h, encodeComponent: j, deserialize: l, decodeComponent: m};
    e.exports = n;
}, null);
__d("getAsyncParams", ["CurrentCommunity", "CurrentUser", "DTSG", "ISB", "LSD", "ServerJSDefine", "SiteData", "URIBase", "PHPQuerySerializer"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = 1;

    function q(r) {
        var s = {__user: h.getID(), __a: 1, __dyn: l.getLoadedModuleHash(), __req: (p++).toString(36)}, t = new n(window.location.href, o).getQueryData();
        for (var u in t)if (t.hasOwnProperty(u))if ((u === 'locale') || (u.substr(0, 3) === 'mh_'))s[u] = t[u];
        if (r == 'POST' && i.getToken()) {
            s.fb_dtsg = i.getToken();
            var v = '';
            for (var w = 0; w < s.fb_dtsg.length; w++)v += s.fb_dtsg.charCodeAt(w);
            s.ttstamp = '2' + v;
        }
        if (r == 'POST' && k.token)s.lsd = k.token;
        if (j.token)s.fb_isb = j.token;
        if (m.revision)s.__rev = m.revision;
        if (g.getID() !== '0')s.__cid = g.getID();
        return s;
    }

    e.exports = q;
}, null);
__d("getSameOriginTransport", ["ex"], function (a, b, c, d, e, f, g) {
    function h() {
        try {
            return a.XMLHttpRequest ? new a.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");
        } catch (i) {
            throw new Error(g('getSameOriginTransport: %s', i.message));
        }
    }

    e.exports = h;
}, null);
__d("setTimeoutAcrossTransitions", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        return setTimeout(h, i, false);
    }

    e.exports = g;
}, null);
__d("BanzaiAdapter", ["Arbiter", "CurrentUser", "Miny", "QueryString", "Run", "SiteData", "UserAgent_DEPRECATED", "getAsyncParams", "getSameOriginTransport", "setTimeoutAcrossTransitions", "BanzaiConfig"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = [], s = new g(), t = '/ajax/bz', u = {}, v = u.adapter = {config: q, getUserID: function () {
        return h.getID();
    }, inform: function (w) {
        s.inform(w);
    }, subscribe: function (w, x) {
        s.subscribe(w, x);
    }, cleanup: function () {
        var w = r;
        r = [];
        w.forEach(function (x) {
            if (x.readyState < 4)x.abort();
        });
    }, readyToSend: function () {
        return m.ie() <= 8 ? true : navigator.onLine;
    }, send: function (w, x, y, z) {
        var aa = 'POST', ba = o();
        ba.open(aa, t, true);
        ba.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ba.onreadystatechange = function () {
            if (ba.readyState >= 4) {
                var fa;
                try {
                    fa = ba.status;
                } catch (ga) {
                    fa = 0;
                }
                if (fa == 200) {
                    if (x)x();
                    if (!z)v.inform(u.OK);
                } else {
                    if (y)y(fa);
                    if (!z)v.inform(u.ERROR);
                }
            }
        };
        p(function () {
            if (ba.readyState < 4)ba.abort();
        }, u.SEND_TIMEOUT);
        r.push(ba);
        var ca = n(aa);
        ca.q = JSON.stringify(w);
        ca.ts = Date.now();
        ca.ph = l.push_phase;
        if (u.FBTRACE)ca.fbtrace = u.FBTRACE;
        if (u.isEnabled('miny_compression')) {
            var da = Date.now(), ea = i.encode(ca.q);
            if (ea.length < ca.q.length) {
                ca.q = ea;
                ca.miny_encode_ms = Date.now() - da;
            }
        }
        ba.send(j.encode(ca));
    }, setHooks: function (w) {
        k.onAfterUnload(u._unload);
    }, onUnload: function (w) {
        k.onAfterUnload(w);
    }};
    e.exports = u;
}, null);
__d("FBJSON", [], function (a, b, c, d, e, f) {
    e.exports = {parse: JSON.parse, stringify: JSON.stringify};
}, null);
__d("WebStorage", ["ErrorUtils", "ex"], function (a, b, c, d, e, f, g, h) {
    var i = {};

    function j(q) {
        if (!i.hasOwnProperty(q))i[q] = k(q);
        return i[q];
    }

    function k(q) {
        try {
            var s = window[q];
            if (s) {
                var t = '__test__' + Date.now();
                s.setItem(t, '');
                s.removeItem(t);
            }
            return s;
        } catch (r) {
        }
    }

    function l() {
        return j('localStorage');
    }

    function m() {
        return j('sessionStorage');
    }

    function n(q) {
        var r = [];
        for (var s = 0; s < q.length; s++)r.push(q.key(s));
        return r;
    }

    function o(q, r, s) {
        var t = null;
        try {
            q.setItem(r, s);
        } catch (u) {
            var v = n(q).map(function (w) {
                var x = q.getItem(w).length;
                return w + '(' + x + ')';
            });
            t = new Error(h('Storage quota exceeded while setting %s(%s). Items(length) follows: %s', r, s.length, v.join()));
            g.reportError(t);
        }
        return t;
    }

    var p = {getLocalStorage: l, getSessionStorage: m, setItemGuarded: o};
    e.exports = p;
}, null);
__d("pageID", [], function (a, b, c, d, e, f) {
    e.exports = Math.floor(2147483648 * Math.random()).toString(36);
}, null);
__d("WebStorageMutex", ["WebStorage", "setTimeoutAcrossTransitions", "pageID"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.getLocalStorage(), k = i;

    function l(m) {
        "use strict";
        this.name = m;
    }

    l.testSetPageID = function (m) {
        "use strict";
        k = m;
    };
    l.prototype.$WebStorageMutex0 = function () {
        "use strict";
        if (!j)return k;
        var m = j.getItem('mutex_' + this.name);
        m = m ? m.split(':') : null;
        return m && m[1] >= Date.now() ? m[0] : null;
    };
    l.prototype.$WebStorageMutex1 = function (m) {
        "use strict";
        if (!j)return;
        var n = Date.now() + (m || 10000);
        g.setItemGuarded(j, 'mutex_' + this.name, k + ':' + n);
    };
    l.prototype.hasLock = function () {
        "use strict";
        return this.$WebStorageMutex0() == k;
    };
    l.prototype.lock = function (m, n, o) {
        "use strict";
        if (this.$WebStorageMutex2)clearTimeout(this.$WebStorageMutex2);
        if (k == (this.$WebStorageMutex0() || k))this.$WebStorageMutex1(o);
        this.$WebStorageMutex2 = h(function () {
            this.$WebStorageMutex2 = null;
            var p = this.hasLock() ? m : n;
            if (p)p(this);
        }.bind(this), 0);
    };
    l.prototype.unlock = function () {
        "use strict";
        if (this.$WebStorageMutex2)clearTimeout(this.$WebStorageMutex2);
        if (j && this.hasLock())j.removeItem('mutex_' + this.name);
    };
    e.exports = l;
}, null);
__d("isInIframe", [], function (a, b, c, d, e, f) {
    var g = window != window.top;

    function h() {
        return g;
    }

    e.exports = h;
}, null);
__d("Banzai", ["BanzaiAdapter", "CurrentUser", "ErrorUtils", "ExecutionEnvironment", "FBJSON", "WebStorage", "WebStorageMutex", "emptyFunction", "isInIframe", "pageID", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = g.adapter, s = o(), t = 'bz:', u = 0, v = 1, w = 2, x, y, z = [], aa = null;

    function ba(ia) {
        return ia[2] >= Date.now() - (r.config.EXPIRY || g.EXPIRY);
    }

    function ca(ia, ja) {
        ia.__meta.status = u;
        ia[3] = (ia[3] || 0) + 1;
        if (!ia.__meta.retry && ja >= 400 && ja < 600)z.push(ia);
    }

    function da(ia) {
        var ja = Date.now() + ia;
        if (!y || ja < y) {
            y = ja;
            clearTimeout(x);
            x = q(ea, ia);
            return true;
        }
    }

    function ea() {
        fa(null, null);
    }

    function fa(ia, ja) {
        y = null;
        da(g.BASIC.delay);
        if (!r.readyToSend()) {
            if (ja)ja();
            return;
        }
        r.inform(g.SEND);
        var ka = [], la = [], ma = {};
        z = z.filter(function (na) {
            var oa = na.__meta;
            if (oa.status >= w || !ba(na))return false;
            if (oa.status >= v)return true;
            var pa = oa.pageID + h.getID(), qa = ma[pa];
            if (!qa) {
                qa = {user: oa.userID, page_id: oa.pageID, posts: []};
                ma[pa] = qa;
                ka.push(qa);
            }
            oa.status = v;
            qa.posts.push(na);
            la.push(na);
            return oa.retry;
        });
        if (ka.length <= 0) {
            r.inform(g.OK);
            if (ia)ia();
            return;
        }
        ka[0].trigger = aa;
        aa = null;
        r.send(ka, function () {
            la.forEach(function (na) {
                na.__meta.status = w;
            });
            if (ia)ia();
        }, function (na) {
            la.forEach(function (oa) {
                ca(oa, na);
            });
            if (ja)ja();
        });
    }

    var ga, ha = l.getLocalStorage();
    if (ha && !s) {
        ga = {store: function ia() {
            if (z.length <= 0)return;
            var ja = z.map(function (ka) {
                return [ka[0], ka[1], ka[2], ka[3] || 0, ka.__meta];
            });
            z = [];
            ha.setItem(t + p + '.' + Date.now(), k.stringify(ja));
        }, restore: function ia() {
            (new m('banzai')).lock(function (ja) {
                var ka = [];
                for (var la = 0; la < ha.length; la++) {
                    var ma = ha.key(la);
                    if (ma.indexOf(t) === 0 && ma.indexOf('bz:__') !== 0)ka.push(ma);
                }
                ka.forEach(function (na) {
                    var oa = ha.getItem(na);
                    ha.removeItem(na);
                    if (!oa)return;
                    var pa = k.parse(oa, e.id);
                    pa.forEach(function (qa) {
                        if (!qa)return;
                        var ra = qa.__meta = qa.pop(), sa = ba(qa);
                        if (sa && ra.userID == h.getID()) {
                            ra.status = u;
                            z.push(qa);
                        }
                    });
                });
                ja.unlock();
            });
        }};
    } else ga = {store: n, restore: n};
    g.SEND = 'Banzai:SEND';
    g.OK = 'Banzai:OK';
    g.ERROR = 'Banzai:ERROR';
    g.SHUTDOWN = 'Banzai:SHUTDOWN';
    g.SEND_TIMEOUT = 15000;
    g.VITAL_WAIT = 1000;
    g.BASIC_WAIT = 60000;
    g.EXPIRY = 30 * 60000;
    g.VITAL = {delay: r.config.MIN_WAIT || g.VITAL_WAIT};
    g.BASIC = {delay: r.config.MAX_WAIT || g.BASIC_WAIT};
    g.FBTRACE = r.config.fbtrace, g.isEnabled = function (ia) {
        return r.config.gks && r.config.gks[ia];
    };
    g.post = function (ia, ja, ka) {
        ka = ka || {};
        var la = ka.retry;
        if (r.config.disabled)return;
        if (!j.canUseDOM)return;
        var ma = r.config.blacklist;
        if (ma)if (ma.indexOf)if (typeof ma.indexOf == 'function')if (ma.indexOf(ia) != -1)return;
        if (s && document.domain == 'facebook.com') {
            var na;
            try {
                na = a.top.require('Banzai');
            } catch (oa) {
                na = null;
            }
            if (na) {
                na.post.apply(na, arguments);
                return;
            }
        }
        var pa = [ia, ja, Date.now(), 0];
        pa.__meta = {retry: la === true, pageID: p, userID: h.getID(), status: u};
        if (ka.signal) {
            pa.__meta.status = v;
            var qa = [
                {user: h.getID(), page_id: p, posts: [pa], trigger: ia}
            ];
            r.send(qa, function () {
                pa.__meta.status = w;
            }, function (sa) {
                ca(pa, sa);
            }, true);
            if (!la)return;
        }
        z.push(pa);
        var ra = ka.delay;
        if (ra == null)ra = g.BASIC_WAIT;
        if (da(ra) || !aa)aa = ia;
    };
    g.flush = function (ia, ja) {
        clearTimeout(x);
        x = 0;
        fa(ia, ja);
    };
    g.subscribe = r.subscribe;
    g._schedule = da;
    g._store = function (ia) {
        i.applyWithGuard(ga.store, ga);
    };
    g._restore = function (ia) {
        i.applyWithGuard(ga.restore, ga);
        da(r.config.RESTORE_WAIT || g.VITAL_WAIT);
    };
    g._unload = function () {
        r.cleanup();
        r.inform(g.SHUTDOWN);
        i.applyWithGuard(ga.store, ga);
    };
    g._testState = function () {
        return {postBuffer: z, triggerRoute: aa};
    };
    if (j.canUseDOM) {
        if (g.isEnabled('adapterhooks')) {
            r.setHooks(ga);
        } else r.onUnload(g._unload);
        g._restore();
    }
    e.exports = g;
}, null);
__d("isEmpty", [], function (a, b, c, d, e, f) {
    function g(h) {
        if (Array.isArray(h)) {
            return h.length === 0;
        } else if (typeof h === 'object') {
            for (var i in h)return false;
            return true;
        } else return !h;
    }

    e.exports = g;
}, null);
__d("setIntervalAcrossTransitions", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        return setInterval(h, i, false);
    }

    e.exports = g;
}, null);
__d("CSSLoader", ["isEmpty", "setIntervalAcrossTransitions"], function (a, b, c, d, e, f, g, h) {
    var i = 20, j = 5000, k, l, m = {}, n = [], o, p = {};

    function q(u) {
        if (l)return;
        l = true;
        var v = document.createElement('link');
        v.onload = function () {
            k = true;
            v.parentNode.removeChild(v);
        };
        v.rel = 'stylesheet';
        v.href = 'data:text/css;base64,';
        u.appendChild(v);
    }

    function r() {
        var u, v = [], w = [];
        if (Date.now() >= o) {
            for (u in p) {
                w.push(p[u].signal);
                v.push(p[u].error);
            }
            p = {};
        } else for (u in p) {
            var x = p[u].signal, y = window.getComputedStyle ? getComputedStyle(x, null) : x.currentStyle;
            if (y && parseInt(y.height, 10) > 1) {
                v.push(p[u].load);
                w.push(x);
                delete p[u];
            }
        }
        for (var z = 0; z < w.length; z++)w[z].parentNode.removeChild(w[z]);
        if (!g(v)) {
            for (z = 0; z < v.length; z++)v[z]();
            o = Date.now() + j;
        }
        return g(p);
    }

    function s(u, v, w, x) {
        var y = document.createElement('meta');
        y.id = 'bootloader_' + u.replace(/[^a-z0-9]/ig, '_');
        v.appendChild(y);
        var z = !g(p);
        o = Date.now() + j;
        p[u] = {signal: y, load: w, error: x};
        if (!z)var aa = h(function ba() {
            if (r())clearInterval(aa);
        }, i);
    }

    var t = {loadStyleSheet: function (u, v, w, x, y) {
        if (m[u])throw new Error('CSS component ' + u + ' has already been requested.');
        if (document.createStyleSheet) {
            var z;
            for (var aa = 0; aa < n.length; aa++)if (n[aa].imports.length < 31) {
                z = aa;
                break;
            }
            if (z === undefined) {
                try {
                    n.push(document.createStyleSheet());
                } catch (ba) {
                    y();
                    return;
                }
                z = n.length - 1;
            }
            n[z].addImport(v);
            m[u] = {styleSheet: n[z], uri: v};
            s(u, w, x, y);
            return;
        }
        var ca = document.createElement('link');
        ca.rel = 'stylesheet';
        ca.type = 'text/css';
        ca.href = v;
        m[u] = {link: ca};
        if (k) {
            ca.onload = function () {
                ca.onload = ca.onerror = null;
                x();
            };
            ca.onerror = function () {
                ca.onload = ca.onerror = null;
                y();
            };
        } else {
            s(u, w, x, y);
            if (k === undefined)q(w);
        }
        w.appendChild(ca);
    }, registerLoadedStyleSheet: function (u, v) {
        if (m[u])throw new Error('CSS component ' + u + ' has been requested and should not be ' + 'loaded more than once.');
        m[u] = {link: v};
    }, unloadStyleSheet: function (u) {
        if (!u in m)return;
        var v = m[u], w = v.link;
        if (w) {
            w.onload = w.onerror = null;
            w.parentNode.removeChild(w);
        } else {
            var x = v.styleSheet;
            for (var y = 0; y < x.imports.length; y++)if (x.imports[y].href == v.uri) {
                x.removeImport(y);
                break;
            }
        }
        delete p[u];
        delete m[u];
    }};
    e.exports = t;
}, null);
__d("Bootloader", ["BootloaderConfig", "CSSLoader", "CallbackDependencyManager", "setTimeoutAcrossTransitions", "createArrayFrom", "ErrorUtils", "ex"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = {}, o = {}, p = {}, q = {}, r = null, s = {}, t = {}, u = {}, v = {}, w = {}, x = {}, y = false, z = [], aa = new i(), ba = Date.now();
    l.addListener(function (ma) {
        ma.loadingUrls = Object.keys(t);
    }, true);
    function ca(ma) {
        var na = new Error(ma);
        na.guard = 'Bootloader';
        l.reportError(na);
    }

    function da() {
        return document.documentMode || +(/MSIE.(\d+)/.exec(navigator.userAgent) || [])[1];
    }

    function ea() {
        if (!g.retry_on_timeout || !g.is_not_mobile || da() || !g.timeout || g.timeout < 0)return false;
        return true;
    }

    function fa(ma, na, oa, pa) {
        var qa = document.createElement('script');
        qa.src = ma;
        qa.async = true;
        var ra = s[na];
        if (ra && ra.crossOrigin)qa.crossOrigin = 'anonymous';
        qa.onload = oa;
        qa.onerror = function () {
            v[ma] = true;
            oa();
        };
        qa.onreadystatechange = function () {
            if (this.readyState in {loaded: 1, complete: 1})oa();
        };
        pa.appendChild(qa);
        return qa;
    }

    function ga(ma, na, oa, pa) {
        var qa = la.done.bind(null, [oa], na);
        t[na] = Date.now();
        if (ma == 'js') {
            var ra = fa(na, oa, qa, pa);
            if (ea())q[na] = j(function () {
                delete q[na];
                if (r) {
                    if (ra.parentNode && ra.parentNode === r)r.removeChild(ra);
                    w[na] = Date.now();
                    fa(na, oa, qa, r);
                }
            }, g.timeout);
        } else if (ma == 'css')h.loadStyleSheet(oa, na, pa, qa, function () {
            ca(m('CSS timeout [%s] at %s', oa, na));
            v[na] = true;
            qa();
        });
    }

    function ha(ma) {
        if (!s[ma]) {
            ca(m('Missing unloading resource %s', ma));
            return;
        }
        if (s[ma].type == 'css') {
            h.unloadStyleSheet(ma);
            delete n[ma];
            aa.unsatisfyPersistentDependency(ma);
        }
    }

    function ia(ma, na) {
        if (!y) {
            z.push([ma, na]);
            return;
        }
        ma = k(ma);
        var oa = [];
        for (var pa = 0; pa < ma.length; ++pa) {
            if (!ma[pa]) {
                ca(m('Empty component!'));
                continue;
            }
            var qa = p[ma[pa]];
            if (qa) {
                var ra = qa.resources;
                for (var sa = 0; sa < ra.length; ++sa)oa.push(ra[sa]);
            }
        }
        la.loadResources(oa, na);
    }

    function ja(ma) {
        if (ma) {
            n[ma] = true;
        } else ca(m('Making an empty resource (%s) as requested', typeof ma));
    }

    function ka(ma) {
        if (!ma)return [];
        var na = [];
        for (var oa = 0; oa < ma.length; ++oa)if (typeof ma[oa] == 'string') {
            if (ma[oa] in s) {
                na.push(s[ma[oa]]);
            } else ca(m('Unable to resolve resource %s.', ma[oa]));
        } else na.push(ma[oa]);
        return na;
    }

    var la = {configurePage: function (ma) {
        var na = {}, oa = ka(ma), pa;
        for (pa = 0; pa < oa.length; pa++) {
            na[oa[pa].src] = oa[pa];
            ja(oa[pa].name);
        }
        var qa = document.getElementsByTagName('link'), ra = 0;
        for (pa = 0; pa < qa.length; ++pa) {
            if (qa[pa].rel != 'stylesheet')continue;
            for (var sa in na)if (qa[pa].href.indexOf(sa) !== -1) {
                var ta = na[sa].name;
                if (na[sa].permanent)o[ta] = true;
                delete na[sa];
                h.registerLoadedStyleSheet(ta, qa[pa]);
                la.done([ta]);
                ra++;
                break;
            }
        }
        if (ra != oa.length)ca(m('configurePage: Found %s out of %s items', ra, oa.length));
    }, loadComponents: function (ma, na) {
        ma = k(ma);
        var oa = [];
        for (var pa = 0; pa < ma.length; pa++) {
            var qa = p[ma[pa]], ra = 'legacy:' + ma[pa];
            if (p[ra]) {
                if (qa)ca(m('%s has a conflicting legacy component. That cannot happen ' + 'and legacy won btw.', ma[pa]));
                ma[pa] = ra;
                oa.push(ra);
                continue;
            }
            if (!qa) {
                ca(m('loadComponents: %s is not in the component map.', ma[pa]));
            } else if (qa.module) {
                oa.push(ma[pa]);
                ca(m('loadComponents: Loading module %s!', ma[pa]));
            }
        }
        ia(ma, oa.length ? d.bind(null, oa, na) : na);
    }, loadModules: function (ma, na) {
        var oa = [];
        for (var pa = 0; pa < ma.length; pa++) {
            var qa = p[ma[pa]];
            if (!qa) {
                ca(m('loadModules: %s is not in the component map.', ma[pa]));
                oa.push(ma[pa]);
            } else if (qa.module) {
                oa.push(ma[pa]);
            } else {
                var ra = qa.resources, sa = true;
                for (var ta = 0; ta < ra.length; ta++) {
                    var ua = s[ra[ta]];
                    if (!ua || ua.type != 'css')sa = false;
                }
                if (!sa)ca(m('loadModules: %s is not a module!', ma[pa]));
            }
        }
        ia(ma, d.bind(null, oa, na));
    }, loadResources: function (ma, na, oa, pa) {
        var qa;
        ma = ka(k(ma));
        if (oa) {
            var ra = {};
            for (qa = 0; qa < ma.length; ++qa)ra[ma[qa].name] = true;
            for (var sa in n)if (!(sa in o) && !(sa in ra) && !(sa in x))ha(sa);
            x = {};
        }
        var ta = [], ua = [];
        for (qa = 0; qa < ma.length; ++qa) {
            var va = ma[qa];
            if (va.permanent)o[va.name] = true;
            if (aa.isPersistentDependencySatisfied(va.name))continue;
            if (!va.nonblocking)ua.push(va.name);
            if (!n[va.name]) {
                ja(va.name);
                ta.push(va);
                window.CavalryLogger && window.CavalryLogger.getInstance().measureResources(va, pa);
            }
        }
        var wa;
        if (na)if (typeof na === 'function') {
            wa = aa.registerCallback(na, ua);
        } else wa = aa.addDependenciesToExistingCallback(na, ua);
        var xa = la.getHardpoint(), ya = da() ? xa : document.createDocumentFragment();
        for (qa = 0; qa < ta.length; ++qa)ga(ta[qa].type, ta[qa].src, ta[qa].name, ya);
        if (xa !== ya)xa.appendChild(ya);
        return wa;
    }, requestJSResource: function (ma) {
        var na = la.getHardpoint();
        ga('js', ma, null, na);
    }, done: function (ma, na) {
        if (na) {
            u[na] = Date.now() - t[na];
            delete t[na];
            if (q[na]) {
                clearTimeout(q[na]);
                delete q[na];
            }
        }
        if (window.CavalryLogger)window.CavalryLogger.done_js(ma);
        for (var oa = 0; oa < ma.length; ++oa) {
            var pa = ma[oa];
            if (pa) {
                ja(pa);
                aa.satisfyPersistentDependency(pa);
            }
        }
    }, enableBootload: function (ma) {
        for (var na in ma)if (!p[na])p[na] = ma[na];
        if (!y) {
            y = true;
            for (var oa = 0; oa < z.length; oa++)ia.apply(null, z[oa]);
            z = [];
        }
    }, getHardpoint: function () {
        if (!r) {
            var ma = document.getElementsByTagName('head');
            r = ma.length && ma[0] || document.body;
        }
        return r;
    }, setResourceMap: function (ma) {
        for (var na in ma)if (!s[na]) {
            ma[na].name = na;
            s[na] = ma[na];
        }
    }, getResourceURLs: function () {
        var ma = {};
        for (var na in s) {
            var oa = s[na].src;
            ma[oa] = (na in n) && !(oa in v) && !(oa in t);
        }
        return ma;
    }, getResourceHashes: function () {
        return Object.assign({}, s);
    }, loadEarlyResources: function (ma) {
        la.setResourceMap(ma);
        var na = [];
        for (var oa in ma) {
            var pa = s[oa];
            na.push(pa);
            if (!pa.permanent)x[pa.name] = pa;
        }
        la.loadResources(na);
    }, getLoadingUrls: function () {
        var ma = {}, na = Date.now();
        for (var oa in t)ma[oa] = na - t[oa];
        return ma;
    }, getLoadedUrlTimes: function () {
        return u;
    }, getErrorUrls: function () {
        return Object.keys(v);
    }, getStartTime: function () {
        return ba;
    }, getRetriedUrls: function () {
        return Object.keys(w);
    }, __debug: {callbackManager: aa, componentMap: p, requested: n, resources: s}};
    e.exports = la;
}, null);
__d("lowerDomain", [], function (a, b, c, d, e, f) {
    if (document.domain.toLowerCase().match(/(^|\.)facebook\..*/))document.domain = "facebook.com";
}, null);
__d("ix", ["invariant"], function (a, b, c, d, e, f, g) {
    var h = {};

    function i(j) {
        var k = h[j];
        g(!!k);
        return k;
    }

    i.add = function (j) {
        var k = false;
        for (var l in j)if (!(l in h))h[l] = j[l];
    };
    e.exports = i;
}, null);
__d("ScriptPath", ["ErrorUtils"], function (a, b, c, d, e, f, g) {
    var h = null, i = null, j = {}, k = 0, l = null, m = {DIALOG_CLOSE: 'close_dialog', DIALOG_OPEN: 'open_dialog', PAGE_LOAD: 'load', PAGE_UNLOAD: 'unload', OVERLAY_VIEW_CHANGE: 'overlay_view_change', TRANSITION: 'transition'}, n = [];

    function o(t) {
        var u = ++k;
        j[u] = t;
        return u;
    }

    function p(t) {
        if (j[t])delete j[t];
    }

    function q(t) {
        Object.keys(j).forEach(function (u) {
            g.applyWithGuard(j[u], null, [
                {source: h, dest: i, cause: t}
            ]);
        });
    }

    function r() {
        return i ? i.scriptPath : undefined;
    }

    var s = {set: function (t, u, v, w) {
        h = i;
        i = {scriptPath: t, categoryToken: u, impressionID: v, owningEntityID: w};
        n = [];
        window._script_path = t;
        q();
    }, openOverlayView: function (t) {
        if (!t)return;
        var u = n.length;
        if (u === 0 || n[u - 1] !== t) {
            h = Object.assign({}, i);
            i.topViewEndpoint = t;
            n.push(t);
            q(m.OVERLAY_VIEW_CHANGE);
        }
    }, closeOverlayView: function (t) {
        var u = n.lastIndexOf(t);
        if (u === -1)return;
        h = Object.assign({}, i);
        if (u > 0) {
            i.topViewEndpoint = n[u - 1];
        } else i.topViewEndpoint = null;
        n = n.slice(0, u);
        q(m.OVERLAY_VIEW_CHANGE);
    }, setNavigation: function (t) {
        l = t;
    }, getNavigation: function () {
        return l;
    }, getScriptPath: r, getCategoryToken: function () {
        return i ? i.categoryToken : undefined;
    }, getTopViewEndpoint: function () {
        var t = n.length;
        return t > 0 ? n[t - 1] : r();
    }, getPageInfo: function () {
        return i;
    }, getSourcePageInfo: function () {
        return h;
    }, subscribe: function (t) {
        return o(t);
    }, unsubscribe: function (t) {
        p(t);
    }};
    s.CAUSE = m;
    e.exports = s;
}, null);
__d("ServerJS", ["ErrorUtils", "EventEmitter", "ServerJSDefine", "copyProperties", "ex", "ge", "replaceTransportMarkers"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = 0, o = new h(), p = 0;

    function q() {
        this._moduleMap = {};
        this._relativeTo = null;
        this._moduleIDsToCleanup = {};
    }

    q.PRE_JS_CALL = 'pre-js-call';
    q.POST_JS_CALL = 'post-js-call';
    q.addListener = o.addListener.bind(o);
    j(q.prototype, {handle: function (u) {
        if (u.__guard)throw new Error('ServerJS.handle called on data that has already been handled');
        u.__guard = true;
        r(u.define || [], this._handleDefine, this);
        r(u.markup || [], this._handleMarkup, this);
        r(u.elements || [], this._handleElement, this);
        r(u.instances || [], this._handleInstance, this);
        var v = r(u.require || [], this._handleRequire, this);
        return {cancel: function () {
            for (var w = 0; w < v.length; w++)if (v[w])v[w].cancel();
        }};
    }, handlePartial: function (u) {
        (u.instances || []).forEach(s.bind(null, this._moduleMap, 3));
        (u.markup || []).forEach(s.bind(null, this._moduleMap, 2));
        (u.elements || []).forEach(s.bind(null, this._moduleMap, 2));
        return this.handle(u);
    }, setRelativeTo: function (u) {
        this._relativeTo = u;
        return this;
    }, cleanup: function () {
        var u = [];
        for (var v in this._moduleMap)u.push(v);
        d.call(null, u, t);
        this._moduleMap = {};
        function w(y) {
            var z = this._moduleIDsToCleanup[y], aa = z[0], ba = z[1];
            delete this._moduleIDsToCleanup[y];
            var ca = ba ? 'JS::call("' + aa + '", "' + ba + '", ...)' : 'JS::requireModule("' + aa + '")', da = ca + ' did not fire because it has missing dependencies.';
            throw new Error(da);
        }

        for (var x in this._moduleIDsToCleanup)g.applyWithGuard(w, this, [x], null, 'ServerJS:cleanup' + ' id: ' + x);
    }, _handleDefine: g.guard(function (u, v, w, x) {
        i.handleDefine(u, v, w, x, this._relativeTo);
    }, 'JS::define'), _handleRequire: function (u, v, w, x) {
        return g.applyWithGuard(function () {
            var y = [u].concat(w || []), z = (v ? '__call__' : '__requireModule__') + n++;
            this._moduleIDsToCleanup[z] = [u, v];
            return define(z, y, g.guard(function (aa) {
                delete this._moduleIDsToCleanup[z];
                x && m(this._relativeTo, x);
                if (v) {
                    if (!aa[v])throw new TypeError(k('Module %s has no method "%s"', u, v));
                    var ba = {moduleName: u, method: v, sourceMeta: aa[v].__SMmeta};
                    o.emit(q.PRE_JS_CALL, p, ba);
                    aa[v].apply(aa, x || []);
                    o.emit(q.POST_JS_CALL, p, ba);
                    p++;
                }
            }.bind(this), v ? "JS::call('" + u + "', '" + v + "', ...)" : "JS::requireModule('" + u + "')"), 1, this, 1);
        }, this, null, null, v ? 'JS::call' : 'JS::requireModule');
    }, _handleInstance: g.guard(function (u, v, w, x) {
        var y = null;
        if (v)y = function (z) {
            m(this._relativeTo, w);
            var aa = Object.create(z.prototype);
            z.apply(aa, w);
            return aa;
        }.bind(this);
        define(u, v, y, 0, null, x);
    }, 'JS::instance'), _handleMarkup: g.guard(function (u, v, w) {
        define(u, ['HTML'], function (x) {
            return x.replaceJSONWrapper(v).getRootNode();
        }, 0, null, w);
    }, 'JS::markup'), _handleElement: g.guard(function (u, v, w, x) {
        if (v === null && w) {
            define(u, null, null, 0, null, w);
            return;
        }
        var y = [], z = 0;
        if (x) {
            y.push(x);
            z = 1;
            w++;
        }
        define(u, y, function (aa) {
            var ba = l(v, aa);
            if (!ba) {
                var ca = 'Could not find element "%s"';
                throw new Error(k(ca, v));
            }
            return ba;
        }, z, null, w);
    }, 'JS::element')});
    function r(u, v, w) {
        return u.map(function (x) {
            v.apply(w, x);
        });
    }

    function s(u, v, w) {
        var x = w[0];
        if (!(x in u))w[v] = (w[v] || 0) + 1;
        u[x] = true;
    }

    function t() {
        return {};
    }

    e.exports = q;
}, null);
__d("legacy:emptyFunction", ["emptyFunction"], function (a, b, c, d) {
    a.emptyFunction = b('emptyFunction');
}, 3);
__d("BlueBarController", ["Bootloader", "CSS"], function (a, b, c, d, e, f, g, h) {
    f.init = function (i) {
        if ('getBoundingClientRect' in i) {
            var j = function () {
                var k = i.getBoundingClientRect(), l = Math.round(k.top) - document.documentElement.clientTop;
                h.conditionClass(i.firstChild, 'fixed_elem', l <= 0);
            };
            j();
            g.loadModules(["Event"], function (k) {
                k.listen(window, 'scroll', j);
            });
        }
    };
}, null);
__d("legacy:arbiter", ["Arbiter"], function (a, b, c, d) {
    a.Arbiter = b('Arbiter');
}, 3);
__d("event-form-bubbling", [], function (a, b, c, d, e, f) {
    a.Event = a.Event || function () {
    };
    a.Event.__inlineSubmit = function (g, event) {
        var h = (a.Event.__getHandler && a.Event.__getHandler(g, 'submit'));
        return h ? null : a.Event.__bubbleSubmit(g, event);
    };
    a.Event.__bubbleSubmit = function (g, event) {
        if (document.documentElement.attachEvent) {
            var h;
            while (h !== false && (g = g.parentNode))h = g.onsubmit ? g.onsubmit(event) : a.Event.__fire && a.Event.__fire(g, 'submit', event);
            return h;
        }
    };
}, 3);
__d("legacy:onload", ["Run", "OnloadEvent"], function (a, b, c, d, e, f, g) {
    a.OnloadEvent = b('OnloadEvent');
    a.onloadRegister_DEPRECATED = g.onLoad;
    a.onloadRegister = function () {
        return g.onLoad.apply(this, arguments);
    };
    a.onafterloadRegister_DEPRECATED = g.onAfterLoad;
    a.onafterloadRegister = function () {
        return g.onAfterLoad.apply(this, arguments);
    };
    a.onleaveRegister = g.onLeave;
    a.onbeforeunloadRegister = g.onBeforeUnload;
    a.onunloadRegister = g.onUnload;
}, 3);
__d("wait_for_load", ["Bootloader", "Run"], function (a, b, c, d, e, f, g, h) {
    function i(l, m) {
        return window.loaded && m.call(l);
    }

    function j(l, m, n) {
        g.loadComponents.call(g, m, n.bind(l));
        return false;
    }

    function k(l, m, n) {
        n = n.bind(l, m);
        if (window.loaded)return n();
        switch ((m || event).type) {
            case 'load':
            case 'focus':
                h.onAfterLoad(n);
                return;
            case 'click':
                var o = l.style, p = document.body.style;
                o.cursor = p.cursor = 'progress';
                h.onAfterLoad(function () {
                    o.cursor = p.cursor = '';
                    if (l.tagName.toLowerCase() == 'a') {
                        if (false !== n() && l.href)window.location.href = l.href;
                    } else if (l.click)l.click();
                });
                break;
        }
        return false;
    }

    a.run_if_loaded = i;
    a.run_with = j;
    a.wait_for_load = k;
}, 3);
__d("markJSEnabled", [], function (a, b, c, d, e, f) {
    var g = document.documentElement;
    g.className = g.className.replace('no_js', '');
}, null);
__d("JSCC", [], function (a, b, c, d, e, f) {
    var g = {};

    function h(j) {
        var k, l = false;
        return function () {
            if (!l) {
                k = j();
                l = true;
            }
            return k;
        };
    }

    var i = {get: function (j) {
        if (!g[j])throw new Error('JSCC entry is missing');
        return g[j]();
    }, init: function (j) {
        for (var k in j)g[k] = h(j[k]);
        return function l() {
            for (var m in j)delete g[m];
        };
    }};
    e.exports = i;
}, null);
__d("PageletSet", ["Arbiter"], function (a, b, c, d, e, f, g) {
    var h = {}, i = {hasPagelet: function (l) {
        return h.hasOwnProperty(l);
    }, getPagelet: function (l) {
        return h[l];
    }, getOrCreatePagelet: function (l) {
        if (!i.hasPagelet(l)) {
            var m = new k(l);
            h[l] = m;
        }
        return i.getPagelet(l);
    }, getPageletIDs: function () {
        return Object.keys(h);
    }, removePagelet: function (l) {
        if (i.hasPagelet(l)) {
            h[l].destroy();
            delete h[l];
        }
    }};

    function j(l, m) {
        return l.contains ? l.contains(m) : l.compareDocumentPosition(m) & 16;
    }

    function k(l) {
        "use strict";
        this.id = l;
        this._root = null;
        this._destructors = [];
        this.addDestructor(function m() {
            g.inform('pagelet/destroy', {id: this.id, root: this._root});
        }.bind(this));
    }

    k.prototype.setRoot = function (l) {
        "use strict";
        this._root = l;
    };
    k.prototype._getDescendantPagelets = function () {
        "use strict";
        var l = [];
        if (!this._root)return l;
        var m = i.getPageletIDs();
        for (var n = 0; n < m.length; n++) {
            var o = m[n];
            if (o === this.id)continue;
            var p = h[o];
            if (p._root && j(this._root, p._root))l.push(p);
        }
        return l;
    };
    k.prototype.addDestructor = function (l) {
        "use strict";
        this._destructors.push(l);
    };
    k.prototype.destroy = function () {
        "use strict";
        var l = this._getDescendantPagelets();
        for (var m = 0; m < l.length; m++) {
            var n = l[m];
            if (i.hasPagelet(n.id))i.removePagelet(n.id);
        }
        for (m = 0; m < this._destructors.length; m++)this._destructors[m]();
        if (this._root)while (this._root.firstChild)this._root.removeChild(this._root.firstChild);
    };
    e.exports = i;
}, null);
__d("invokeCallbacks", ["ErrorUtils"], function (a, b, c, d, e, f, g) {
    function h(i, j) {
        if (i)for (var k = 0; k < i.length; k++)g.applyWithGuard(new Function(i[k]), j);
    }

    e.exports = h;
}, null);
__d("BigPipe", ["Arbiter", "Bootloader", "Env", "ErrorUtils", "JSCC", "OnloadEvent", "PageletSet", "Run", "ServerJS", "$", "copyProperties", "ge", "invokeCallbacks", "ix"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
    var u = document.documentMode || +(/MSIE.(\d+)/.exec(navigator.userAgent) || [])[1], v = g.BEHAVIOR_STATE, w = g.BEHAVIOR_PERSISTENT;

    function x(ba) {
        "use strict";
        q(this, {arbiter: g, rootNodeID: 'content', lid: 0, isAjax: false, domContentCallback: n.__domContentCallback, onloadCallback: n.__onloadCallback, domContentEvt: l.ONLOAD_DOMCONTENT_CALLBACK, onloadEvt: l.ONLOAD_CALLBACK, forceFinish: false, _phaseDoneCallbacks: [], _currentPhase: 0, _lastPhase: -1, _livePagelets: {}});
        q(this, ba);
        if (this.automatic) {
            this._relevant_instance = x._current_instance;
        } else x._current_instance = this;
        this._serverJS = new o();
        g.inform('BigPipe/init', {lid: this.lid, arbiter: this.arbiter}, w);
        this.arbiter.registerCallback(this.domContentCallback, ['pagelet_displayed_all']);
        this._informEventExternal('phase_begin', {phase: 0});
        this.arbiter.inform('phase_begin_0', true, v);
        this.onloadCallback = this.arbiter.registerCallback(this.onloadCallback, ['pagelet_displayed_all']);
        this.arbiter.registerCallback(this._serverJS.cleanup.bind(this._serverJS), [this.onloadEvt]);
    }

    x.prototype._beginPhase = function (ba) {
        "use strict";
        this._informEventExternal('phase_begin', {phase: ba});
        this.arbiter.inform('phase_begin_' + ba, true, v);
    };
    x.prototype._endPhase = function (ba) {
        "use strict";
        this.arbiter.inform('phase_complete_' + ba, true, v);
    };
    x.prototype._displayPageletHandler = function (ba) {
        "use strict";
        if (this.displayCallback) {
            this.displayCallback(this._displayPagelet.bind(this, ba));
        } else this._displayPagelet(ba);
    };
    x.prototype._displayPagelet = function (ba) {
        "use strict";
        this._informPageletEvent('display_start', ba);
        var ca = this._getPagelet(ba);
        for (var da in ba.content) {
            var ea = ba.content[da];
            if (ba.append)da = this._getPageletRootID(ba);
            var fa = r(da);
            if (!fa)continue;
            if (da === ca.id)ca.setRoot(fa);
            ea = y(ea);
            if (ea)if (ba.append || u < 8) {
                if (!ba.append)while (fa.firstChild)fa.removeChild(fa.firstChild);
                aa(fa, ea);
            } else fa.innerHTML = ea;
            var ga = fa.getAttribute('data-referrer');
            if (!ga)fa.setAttribute('data-referrer', da);
            if (ba.cache_hit && i.pc_debug)fa.style.border = '1px red solid';
        }
        if (ba.jsmods) {
            var ha = JSON.parse(JSON.stringify(ba.jsmods)), ia = this._serverJS.handlePartial(ha);
            ca.addDestructor(ia.cancel.bind(ia));
        }
        this._informPageletEvent('display', ba);
        this.arbiter.inform(ba.id + '_displayed', true, v);
    };
    x.prototype._onPhaseDone = function () {
        "use strict";
        if (this._currentPhase === this._ttiPhase)this._informEventExternal('tti_bigpipe', {phase: this._ttiPhase});
        if (this._currentPhase === this._lastPhase && this._isRelevant())this.arbiter.inform('pagelet_displayed_all', true, v);
        this._currentPhase++;
        if (u <= 8) {
            setTimeout(this._beginPhase.bind(this, this._currentPhase), 20);
        } else this._beginPhase(this._currentPhase);
    };
    x.prototype._downloadJsForPagelet = function (ba) {
        "use strict";
        this._informPageletEvent('jsstart', ba);
        h.loadResources(ba.js || [], function () {
            this._informPageletEvent('jsdone', ba);
            ba.requires = ba.requires || [];
            if (!this.isAjax || ba.phase >= 1)ba.requires.push('uipage_onload');
            var ca = function () {
                this._informPageletEvent('preonload', ba);
                if (this._isRelevantPagelet(ba))s(ba.onload);
                this._informPageletEvent('onload', ba);
                this.arbiter.inform('pagelet_onload', true, g.BEHAVIOR_EVENT);
                ba.provides && this.arbiter.inform(ba.provides, true, v);
            }.bind(this), da = function () {
                this._isRelevantPagelet(ba) && s(ba.onafterload);
            }.bind(this);
            this.arbiter.registerCallback(ca, ba.requires);
            this.arbiter.registerCallback(da, [this.onloadEvt]);
        }.bind(this), false, ba.id);
    };
    x.prototype._getPagelet = function (ba) {
        "use strict";
        var ca = this._getPageletRootID(ba);
        return m.getPagelet(ca);
    };
    x.prototype._getPageletRootID = function (ba) {
        "use strict";
        var ca = ba.append;
        if (ca)return (ca === 'bigpipe_root') ? this.rootNodeID : ca;
        return Object.keys(ba.content)[0] || null;
    };
    x.prototype._isRelevant = function () {
        "use strict";
        return this == x._current_instance || (this.automatic && this._relevant_instance == x._current_instance) || this.jsNonBlock || this.forceFinish || (x._current_instance && x._current_instance.allowIrrelevantRequests);
    };
    x.prototype._isRelevantPagelet = function (ba) {
        "use strict";
        if (!this._isRelevant())return false;
        var ca = this._getPageletRootID(ba);
        return !!this._livePagelets[ca];
    };
    x.prototype._informEventExternal = function (ba, ca) {
        "use strict";
        ca = ca || {};
        ca.ts = Date.now();
        ca.lid = this.lid;
        console.timeStamp && console.timeStamp(ba + " " + JSON.stringify(ca));
        this.arbiter.inform(ba, ca, w);
    };
    x.prototype._informPageletEvent = function (ba, ca) {
        "use strict";
        var da = {event: ba, id: ca.id};
        if (ca.phase)da.phase = ca.phase;
        if (ca.categories)da.categories = ca.categories;
        this._informEventExternal('pagelet_event', da);
    };
    x.getCurrentInstance = function () {
        "use strict";
        return x._current_instance;
    };
    q(x.prototype, {onPageletArrive: j.guard(function (ba) {
        this._informPageletEvent('arrive', ba);
        ba.content = ba.content || {};
        var ca = ba.phase;
        if (!this._phaseDoneCallbacks[ca])this._phaseDoneCallbacks[ca] = this.arbiter.registerCallback(this._onPhaseDone.bind(this), ['phase_complete_' + ca]);
        this.arbiter.registerCallback(this._phaseDoneCallbacks[ca], [ba.id + '_displayed']);
        var da = this._getPageletRootID(ba), ea = m.getOrCreatePagelet(da);
        if (ba.the_end)this._lastPhase = ca;
        if (ba.tti_phase !== undefined)this._ttiPhase = ba.tti_phase;
        if (ba.is_second_to_last_phase)this._secondToLastPhase = ca;
        this._livePagelets[ea.id] = true;
        ea.addDestructor(function () {
            delete this._livePagelets[ea.id];
        }.bind(this));
        if (ba.jscc_map) {
            var fa = (eval)(ba.jscc_map), ga = k.init(fa);
            ea.addDestructor(ga);
        }
        if (ba.resource_map)h.setResourceMap(ba.resource_map);
        if (ba.bootloadable)h.enableBootload(ba.bootloadable);
        t.add(ba.ixData);
        this._informPageletEvent('setup', ba);
        var ha = new g();
        ha.registerCallback(this._displayPageletHandler.bind(this, ba), ['preceding_pagelets_displayed', 'display_resources_downloaded']);
        var ia = ba.display_dependency || [], ja = ia.map(function (la) {
            return la + '_displayed';
        });
        this.arbiter.registerCallback(function () {
            ha.inform('preceding_pagelets_displayed');
        }, ja);
        this.arbiter.registerCallback(function () {
            this._informPageletEvent('css', ba);
            var la = (ba.css || []).concat(ba.displayJS || []);
            h.loadResources(la, function () {
                this._informPageletEvent('css_load', ba);
                ha.inform('display_resources_downloaded');
            }.bind(this), false, ba.id);
        }.bind(this), ['phase_begin_' + ca]);
        this.arbiter.registerCallback(this.onloadCallback, ['pagelet_onload']);
        var ka = [ba.id + '_displayed'];
        if (!this.jsNonBlock)ka.push(this.domContentEvt);
        this.arbiter.registerCallback(this._downloadJsForPagelet.bind(this, ba), ka);
        if (ba.is_last)this._endPhase(ca);
    }, 'BigPipe#onPageletArrive')});
    function y(ba) {
        if (!ba || typeof ba === 'string')return ba;
        if (ba.container_id) {
            var ca = p(ba.container_id);
            ba = z(ca) || '';
            ca.parentNode.removeChild(ca);
            return ba;
        }
        return null;
    }

    function z(ba) {
        if (!ba.firstChild) {
            h.loadModules(["ErrorSignal"], function (da) {
                da.sendErrorSignal('bigpipe', 'Pagelet markup container is empty.');
            });
            return null;
        }
        if (ba.firstChild.nodeType !== 8)return null;
        var ca = ba.firstChild.nodeValue;
        ca = ca.substring(1, ca.length - 1);
        return ca.replace(/\\([\s\S]|$)/g, '$1');
    }

    function aa(ba, ca) {
        var da = document.createElement('div'), ea = u < 7;
        if (ea)ba.appendChild(da);
        da.innerHTML = ca;
        var fa = document.createDocumentFragment();
        while (da.firstChild)fa.appendChild(da.firstChild);
        ba.appendChild(fa);
        if (ea)ba.removeChild(da);
    }

    e.exports = x;
}, null);
__d("legacy:bootloader", ["Bootloader"], function (a, b, c, d) {
    a.Bootloader = b('Bootloader');
}, 3);
__d("legacy:constructor-cache", ["JSCC"], function (a, b, c, d) {
    a.JSCC = b('JSCC');
}, 3);
__d("goURI", ["URISchemes"], function (a, b, c, d, e, f, g) {
    function h(i, j, k) {
        i = i.toString();
        if (/^([^.:/?#]+):/.test(i) && !g.isAllowed(RegExp.$1))throw new Error('goURI: URI scheme rejected, URI: ' + i);
        if (!j && a.PageTransitions && a.PageTransitions.isInitialized()) {
            a.PageTransitions.go(i, k);
        } else if (window.location.href == i) {
            window.location.reload();
        } else window.location.href = i;
    }

    e.exports = h;
}, null);
__d("legacy:goURI", ["goURI"], function (a, b, c, d) {
    a.goURI = b('goURI');
}, 3);
__d("InitialJSLoader", ["Arbiter", "Bootloader", "OnloadEvent", "Run", "ServerJS"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {INITIAL_JS_READY: 'BOOTLOAD/JSREADY', loadOnDOMContentReady: function (m, n) {
        g.subscribe(i.ONLOAD_DOMCONTENT_CALLBACK, function () {
            function o() {
                h.loadResources(m, function () {
                    g.inform(l.INITIAL_JS_READY, true, g.BEHAVIOR_STATE);
                });
            }

            if (n) {
                setTimeout(o, n);
            } else o();
        });
    }, handleServerJS: function (m) {
        var n = new k();
        n.handle(m);
        j.onAfterLoad(n.cleanup.bind(n));
    }};
    e.exports = l;
}, null);
__d("legacy:object-core-utils", ["isEmpty", "copyProperties"], function (a, b, c, d) {
    a.is_empty = b('isEmpty');
    a.copyProperties = b('copyProperties');
}, 3);
__d("PlaceholderListener", ["Arbiter", "CSS", "Parent"], function (a, b, c, d, e, f, g, h, i) {
    function j(o, p) {
        if (p.getAttribute('data-silentplaceholderlistener'))return;
        var q = p.getAttribute('placeholder');
        if (q) {
            var r = i.byClass(p, 'focus_target');
            if ('focus' == o || 'focusin' == o) {
                var s = p.value.replace(/\r\n/g, '\n'), t = q.replace(/\r\n/g, '\n');
                if (s == t && h.hasClass(p, 'DOMControl_placeholder')) {
                    p.value = '';
                    h.removeClass(p, 'DOMControl_placeholder');
                }
                if (r)n.expandInput(r);
            } else {
                if (p.value === '') {
                    h.addClass(p, 'DOMControl_placeholder');
                    p.value = q;
                    r && h.removeClass(r, 'child_is_active');
                    p.style.direction = '';
                }
                r && h.removeClass(r, 'child_is_focused');
            }
        }
    }

    try {
        if (document.activeElement)j('focus', document.activeElement);
    } catch (k) {
    }
    function l(event) {
        event = event || window.event;
        j(event.type, event.target || event.srcElement);
    }

    var m = document.documentElement;
    if (m.addEventListener) {
        m.addEventListener('focus', l, true);
        m.addEventListener('blur', l, true);
    } else {
        m.attachEvent('onfocusin', l);
        m.attachEvent('onfocusout', l);
    }
    var n = {expandInput: function (o) {
        h.addClass(o, 'child_is_active');
        h.addClass(o, 'child_is_focused');
        h.addClass(o, 'child_was_focused');
        g.inform('reflow');
    }};
    e.exports = n;
}, null);
__d("clickRefAction", ["Arbiter"], function (a, b, c, d, e, f, g) {
    function h(l, m, n, o, p) {
        var q = l + '/' + m;
        this.ue = q;
        this._ue_ts = l;
        this._ue_count = m;
        this._context = n;
        this._ns = null;
        this._node = o;
        this._type = p;
    }

    h.prototype.set_namespace = function (l) {
        this._ns = l;
        return this;
    };
    h.prototype.coalesce_namespace = function (l) {
        if (this._ns === null)this._ns = l;
        return this;
    };
    h.prototype.add_event = function () {
        return this;
    };
    var i = 0, j = [];

    function k(l, m, event, n, o) {
        var p = Date.now(), q = event && event.type;
        o = o || {};
        if (!m && event)m = event.getTarget();
        var r = 50;
        if (m && n != "FORCE")for (var s = j.length - 1; s >= 0 && ((p - j[s]._ue_ts) < r); --s)if (j[s]._node == m && j[s]._type == q)return j[s];
        var t = new h(p, i, l, m, q);
        j.push(t);
        while (j.length > 10)j.shift();
        g.inform("ClickRefAction/new", {cfa: t, node: m, mode: n, event: event, extra_data: o}, g.BEHAVIOR_PERSISTENT);
        i++;
        return t;
    }

    e.exports = a.clickRefAction = k;
}, null);
__d("trackReferrer", ["Parent"], function (a, b, c, d, e, f, g) {
    function h(i, j) {
        i = g.byAttribute(i, 'data-referrer');
        if (i) {
            var k = /^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/.exec(j)[1] || '';
            if (!k)return;
            var l = k + '|' + i.getAttribute('data-referrer'), m = new Date();
            m.setTime(Date.now() + 1000);
            document.cookie = "x-src=" + encodeURIComponent(l) + "; " + "expires=" + m.toGMTString() + ";path=/; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
        }
        return i;
    }

    e.exports = h;
}, null);
__d("userAction", ["Arbiter", "Banzai", "copyProperties"], function (a, b, c, d, e, f, g, h, i) {
    var j = 50, k = [], l = {}, m = {};

    function n(v, w, x, y, event) {
        "use strict";
        var z = v + '/' + w, aa = u(y);
        i(this, {ue: z, _uai_logged: false, _uai_timeout: null, _primary: {}, _fallback: {}, _default_ua_id: aa || '-', _default_action_type: event ? event.type : '-', _ts: v, _ns: x, _start_ts: v, _prev_event: 's', _ue_ts: v, _ue_count: w, _data_version: 1, _event_version: 2, _info_version: 2});
        this._log('ua:n', [1, z]);
    }

    n.prototype._log = function (v, w) {
        "use strict";
        var x = l[v] === true, y = o(v, this._ns, 'ua_id', this._get_ua_id()), z = o(v, this._ns, 'action', this._get_action_type()), aa = (y !== undefined || z !== undefined), ba = aa ? (y || z) : x;
        if (h.isEnabled('useraction') && ba)h.post(v, w, p);
    };
    n.prototype._get_action_type = function () {
        "use strict";
        return (this._primary._action_type || this._fallback._action_type || this._default_action_type);
    };
    n.prototype._get_ua_id = function () {
        "use strict";
        return (this._primary._ua_id || this._fallback._ua_id || this._default_ua_id);
    };
    n.prototype._log_uai = function () {
        "use strict";
        var v = [this._info_version, this.ue, this._ns, this._get_ua_id(), this._get_action_type()];
        this._log('ua:i', v);
        this._uai_logged = true;
        this._uai_timeout = null;
    };
    n.prototype.uai = function (v, w, x) {
        "use strict";
        if (!this._uai_logged) {
            this._uai_timeout && clearTimeout(this._uai_timeout);
            this._primary._ua_id = w;
            this._primary._action_type = v;
            if (x === undefined) {
                this._log_uai();
            } else if (x === false) {
                this._uai_logged = true;
            } else {
                var y = this;
                x = x || 0;
                this._uai_timeout = setTimeout(function () {
                    y._log_uai.apply(y);
                }, x);
            }
        }
        return this;
    };
    n.prototype.uai_fallback = function (v, w, x) {
        "use strict";
        if (!this._uai_logged) {
            var y = this;
            this._uai_timeout && clearTimeout(this._uai_timeout);
            this._fallback._ua_id = w;
            this._fallback._action_type = v;
            x = (x === undefined) ? j : x;
            this._uai_timeout = setTimeout(function () {
                y._log_uai.apply(y);
            }, x);
        }
        return this;
    };
    n.prototype.add_event = function (v, w, x) {
        "use strict";
        w = w || 0;
        var y = (Date.now() - w), z = y - this._ts, aa = y - (x ? x : this._ue_ts), ba = [this._event_version, this.ue, this._ns, this._get_ua_id(), this._prev_event, v, z, aa];
        if (this._get_ua_id()) {
            this._log('ua:e', ba);
            this._ts = y;
            this._prev_event = v;
        }
        return this;
    };
    n.prototype.add_data = function (v) {
        "use strict";
        var w = [this._data_version, this.ue, v];
        this._log('ua:d', w);
        return this;
    };
    function o(v, w, x, y) {
        var z = v in m ? m[v] : {}, aa = w in z ? z[w] : {}, ba;
        if (x in aa)if ('*' in aa[x]) {
            ba = aa[x]['*'];
        } else if (y in aa[x])ba = aa[x][y];
        return ba;
    }

    var p = {store: true, delay: 3000, retry: true}, q = 0, r = 0, s = null;

    function t(v, w, event, x) {
        x = x || {};
        var y = Date.now();
        if (!w && event)w = event.getTarget();
        if (w && s)if (y - r < j && w == s && x.mode == "DEDUP")return k[k.length - 1];
        var z = new n(y, q, v, w, event);
        s = w;
        k.push(z);
        while (k.length > 10)k.shift();
        g.inform("UserAction/new", {ua: z, node: w, mode: x.mode, event: event});
        r = y;
        q++;
        return z;
    }

    function u(v) {
        if (!v || !v.nodeName)return null;
        return v.nodeName.toLowerCase();
    }

    t.setUATypeConfig = function (v) {
        i(l, v);
    };
    t.setCustomSampleConfig = function (v) {
        i(m, v);
    };
    t.getCurrentUECount = function () {
        return q;
    };
    e.exports = a.userAction = t;
}, null);
__d("Primer", ["Bootloader", "CSS", "ErrorUtils", "Parent", "clickRefAction", "trackReferrer", "userAction"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = null, o = /async(?:-post)?|dialog(?:-post)?|theater|toggle/, p = document.documentElement;

    function q(u, v) {
        u = j.byAttribute(u, v);
        if (!u)return;
        do {
            var w = u.getAttribute(v);
            JSON.parse(w).forEach(function (x) {
                var y = u;
                g.loadModules.call(g, [x[0]], function (z) {
                    z[x[1]](y);
                });
            });
        } while (u = j.byAttribute(u.parentNode, v));
        return false;
    }

    p.onclick = i.guard(function (u) {
        u = u || window.event;
        n = u.target || u.srcElement;
        var v = j.byTag(n, 'A');
        if (!v)return q(n, 'data-onclick');
        var w = v.getAttribute('ajaxify'), x = v.href, y = w || x;
        if (y) {
            k('a', v, u).coalesce_namespace('primer');
            m('primer', v, u, {mode: 'DEDUP'}).uai_fallback('click');
        }
        if (w && x && !(/#$/).test(x)) {
            var z = u.which && u.which === 2, aa = u.altKey || u.ctrlKey || u.metaKey || u.shiftKey;
            if (z || aa)return;
        }
        var ba = q(n, 'data-onclick');
        l(v, y);
        var ca = v.rel && v.rel.match(o);
        ca = ca && ca[0];
        switch (ca) {
            case 'dialog':
            case 'dialog-post':
                g.loadModules(["AsyncDialog"], function (da) {
                    da.bootstrap(y, v, ca);
                });
                break;
            case 'async':
            case 'async-post':
                g.loadModules(["AsyncRequest"], function (da) {
                    da.bootstrap(y, v);
                });
                break;
            case 'theater':
                g.loadModules(["PhotoSnowlift"], function (da) {
                    da.bootstrap(y, v);
                });
                break;
            case 'toggle':
                h.toggleClass(v.parentNode, 'openToggler');
                g.loadModules(["Toggler"], function (da) {
                    da.bootstrap(v);
                });
                break;
            default:
                return ba;
        }
        return false;
    }, 'Primer click');
    p.onsubmit = i.guard(function (u) {
        u = u || window.event;
        var v = u.target || u.srcElement;
        if (v && v.nodeName == 'FORM' && v.getAttribute('rel') == 'async') {
            k('f', v, u).coalesce_namespace('primer');
            m('primer', v, u, {mode: 'DEDUP'}).uai_fallback('submit');
            var w = n;
            g.loadModules(["Form"], function (x) {
                x.bootstrap(v, w);
            });
            return false;
        }
    }, 'Primer submit');
    var r = null, s = function (u, v) {
        v = v || window.event;
        r = v.target || v.srcElement;
        q(r, 'data-on' + u);
        var w = j.byAttribute(r, 'data-hover');
        if (!w)return;
        switch (w.getAttribute('data-hover')) {
            case 'tooltip':
                g.loadModules(["Tooltip"], function (x) {
                    x.process(w, r);
                });
                break;
        }
    };
    p.onmouseover = i.guard(s.bind(null, 'mouseover'), 'Primer mouseover');
    var t = i.guard(s.bind(null, 'focus'), 'Primer focus');
    if (p.addEventListener) {
        p.addEventListener('focus', t, true);
    } else p.attachEvent('onfocusin', t);
}, null);
__d("URLFragmentPrelude", ["ScriptPath", "URLFragmentPreludeConfig"], function (a, b, c, d, e, f, g, h) {
    var i = /^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/, j = '', k = /^[^\/\\#!\.\?\*\&\^=]+$/;
    window.location.href.replace(i, function (l, m, n, o) {
        var p, q, r, s;
        p = q = m + (n ? '?' + n : '');
        if (o) {
            if (h.incorporateQuicklingFragment) {
                var t = o.replace(/^(!|%21)/, '');
                r = t.charAt(0);
                if (r == '/' || r == '\\')p = t.replace(/^[\\\/]+/, '/');
            }
            if (h.hashtagRedirect)if (q == p) {
                var u = o.match(k);
                if (u && !n && m == '/')p = '/hashtag/' + o;
            }
        }
        if (p != q) {
            s = g.getScriptPath();
            if (s)document.cookie = "rdir=" + s + "; path=/; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
            window.location.replace(j + p);
        }
    });
}, null);
__d("SidebarPrelude", [], function (a, b, c, d, e, f) {
    var g = {addSidebarMode: function (h, i) {
        var j = document.documentElement;
        if (j.clientWidth > i) {
            j.className = j.className + ' sidebarMode';
            if (j.clientWidth <= h)j.className = j.className + ' miniSidebar';
        }
    }};
    e.exports = g;
}, null);
__d("SubmitOnEnterListener", ["Bootloader", "CSS"], function (a, b, c, d, e, f, g, h) {
    document.documentElement.onkeydown = function (i) {
        i = i || window.event;
        var j = i.target || i.srcElement, k = i.keyCode == 13 && !i.altKey && !i.ctrlKey && !i.metaKey && !i.shiftKey && h.hasClass(j, 'enter_submit');
        if (k) {
            g.loadModules(["DOM", "Input", "trackReferrer", "Form"], function (l, m, n, o) {
                if (!m.isEmpty(j)) {
                    var p = j.form, q = l.scry(p, '.enter_submit_target')[0] || l.scry(p, '[type="submit"]')[0];
                    if (q) {
                        var r = o.getAttribute(p, 'ajaxify') || o.getAttribute(p, 'action');
                        if (r)n(p, r);
                        q.click();
                    }
                }
            });
            return false;
        }
    };
}, null);
__d("CommentPrelude", ["Arbiter", "CSS", "Parent", "clickRefAction", "userAction"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(p, q) {
        k('ufi', p).uai('click');
        j('ufi', p, null, 'FORCE');
        return m(p, q);
    }

    function m(p, q) {
        var r = i.byTag(p, 'form');
        n(r);
        var s = h.removeClass.bind(null, r, 'hidden_add_comment');
        if (window.ScrollAwareDOM) {
            window.ScrollAwareDOM.monitor(r, s);
        } else s();
        if (q !== false) {
            var t = r.add_comment_text_text || r.add_comment_text, u = t.length;
            if (u) {
                if (!i.byClass(t[u - 1], 'UFIReplyList')) {
                    t = t[u - 1];
                } else if (!i.byClass(t[0], 'UFIReplyList')) {
                    t = t[0];
                } else t = null;
            } else {
                var v = i.byClass(t, 'uiTypeahead');
                if (v) {
                    h.addClass(v, 'UFIInputContainerGlow');
                    setTimeout(function () {
                        h.removeClass(v, 'UFIInputContainerGlow');
                    }, 2000);
                }
                t.focus();
            }
            if (t) {
                t.focus();
                g.inform('comment/focus', {element: t});
            }
        }
        return false;
    }

    function n(p) {
        var q = h.removeClass.bind(null, p, 'collapsed_comments');
        if (window.ScrollAwareDOM) {
            window.ScrollAwareDOM.monitor(p, q);
        } else q();
    }

    var o = {click: l, expand: m, uncollapse: n};
    e.exports = o;
}, null);
__d("legacy:ufi-comment-prelude-js", ["CommentPrelude"], function (a, b, c, d, e, f, g) {
    a.fc_click = g.click;
    a.fc_expand = g.expand;
}, 3);
__d("ScriptMonitor", [], function (a, b, c, d, e, f) {
    var g, h = [], i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    e.exports = {activate: function () {
        if (!i)return;
        g = new i(function (j) {
            for (var k = 0; k < j.length; k++) {
                var l = j[k];
                if (l.type == 'childList') {
                    for (var m = 0; m < l.addedNodes.length; m++) {
                        var n = l.addedNodes[m];
                        if ((n.tagName == 'SCRIPT' || n.tagName == 'IFRAME') && n.src)h.push(n.src);
                    }
                } else if (l.type == 'attributes' && l.attributeName == 'src' && (l.target.tagName == 'SCRIPT' || l.target.tagName == 'IFRAME'))h.push(l.target.src);
            }
        });
        g.observe(document, {attributes: true, childList: true, subtree: true});
    }, stop: function () {
        g && g.disconnect();
        return h;
    }};
}, null);
__d("SyntaxErrorMonitor", ["Cookie", "ErrorUtils"], function (a, b, c, d, e, f, g, h) {
    var i = 'js_ver', j = 86400000, k = 1.262304e+12, l = null;

    function m(p) {
        return p.name == 'SyntaxError' || /syntaxerror/i.test(p.message);
    }

    function n(p) {
        if (m(p)) {
            var q = g.get(i), r = Math.floor((Date.now() - k) / j);
            if (!q || r - q >= l.bump_freq_day)g.set(i, r, l.cookie_ttl_sec * 1000);
        }
    }

    var o = {init: function (p) {
        l = p;
        h.addListener(n);
    }};
    e.exports = o;
}, null);
