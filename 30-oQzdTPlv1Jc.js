/*!CK:310365035!*//*1412036161,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["E5lGu"]);
}

/**
 * @providesModule underscore.ads
 * @preserve-header
 *
 * Underscore.js 1.5.2
 * ===================

 * > http://underscorejs.org
 * > Underscore may be freely distributed under the MIT license.
 * > (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative
 *   Reporters & Editors

 * Baseline setup
 * --------------
 */__d("underscore.ads", [], function (a, b, c, d, e, f) {
    (function () {
        var g = this, h = g._, i = {}, j = Array.prototype, k = Object.prototype, l = Function.prototype, m = j.push, n = j.slice, o = j.concat, p = k.toString, q = k.hasOwnProperty, r = j.forEach, s = j.map, t = j.reduce, u = j.reduceRight, v = j.filter, w = j.every, x = j.some, y = j.indexOf, z = j.lastIndexOf, aa = Array.isArray, ba = Object.keys, ca = l.bind, da = function (ta) {
            if (ta instanceof da)return ta;
            if (!(this instanceof da))return new da(ta);
            this._wrapped = ta;
        };
        if (typeof f !== 'undefined') {
            if (typeof e !== 'undefined' && e.exports)f = e.exports = da;
            f._ = da;
        } else g._ = da;
        da.VERSION = '1.5.2';
        var ea = da.each = da.forEach = function (ta, ua, va) {
            if (ta == null)return;
            if (r && ta.forEach === r) {
                ta.forEach(ua, va);
            } else if (ta.length === +ta.length) {
                for (var wa = 0, xa = ta.length; wa < xa; wa++)if (ua.call(va, ta[wa], wa, ta) === i)return;
            } else {
                var ya = da.keys(ta);
                for (var wa = 0, xa = ya.length; wa < xa; wa++)if (ua.call(va, ta[ya[wa]], ya[wa], ta) === i)return;
            }
        };
        da.map = da.collect = function (ta, ua, va) {
            var wa = [];
            if (ta == null)return wa;
            if (s && ta.map === s)return ta.map(ua, va);
            ea(ta, function (xa, ya, za) {
                wa.push(ua.call(va, xa, ya, za));
            });
            return wa;
        };
        var fa = 'Reduce of empty array with no initial value';
        da.reduce = da.foldl = da.inject = function (ta, ua, va, wa) {
            var xa = arguments.length > 2;
            if (ta == null)ta = [];
            if (t && ta.reduce === t) {
                if (wa)ua = da.bind(ua, wa);
                return xa ? ta.reduce(ua, va) : ta.reduce(ua);
            }
            ea(ta, function (ya, za, ab) {
                if (!xa) {
                    va = ya;
                    xa = true;
                } else va = ua.call(wa, va, ya, za, ab);
            });
            if (!xa)throw new TypeError(fa);
            return va;
        };
        da.reduceRight = da.foldr = function (ta, ua, va, wa) {
            var xa = arguments.length > 2;
            if (ta == null)ta = [];
            if (u && ta.reduceRight === u) {
                if (wa)ua = da.bind(ua, wa);
                return xa ? ta.reduceRight(ua, va) : ta.reduceRight(ua);
            }
            var ya = ta.length;
            if (ya !== +ya) {
                var za = da.keys(ta);
                ya = za.length;
            }
            ea(ta, function (ab, bb, cb) {
                bb = za ? za[--ya] : --ya;
                if (!xa) {
                    va = ta[bb];
                    xa = true;
                } else va = ua.call(wa, va, ta[bb], bb, cb);
            });
            if (!xa)throw new TypeError(fa);
            return va;
        };
        da.find = da.detect = function (ta, ua, va) {
            var wa;
            ga(ta, function (xa, ya, za) {
                if (ua.call(va, xa, ya, za)) {
                    wa = xa;
                    return true;
                }
            });
            return wa;
        };
        da.filter = da.select = function (ta, ua, va) {
            var wa = [];
            if (ta == null)return wa;
            if (v && ta.filter === v)return ta.filter(ua, va);
            ea(ta, function (xa, ya, za) {
                if (ua.call(va, xa, ya, za))wa.push(xa);
            });
            return wa;
        };
        da.reject = function (ta, ua, va) {
            return da.filter(ta, function (wa, xa, ya) {
                return !ua.call(va, wa, xa, ya);
            }, va);
        };
        da.every = da.all = function (ta, ua, va) {
            ua || (ua = da.identity);
            var wa = true;
            if (ta == null)return wa;
            if (w && ta.every === w)return ta.every(ua, va);
            ea(ta, function (xa, ya, za) {
                if (!(wa = wa && ua.call(va, xa, ya, za)))return i;
            });
            return !!wa;
        };
        var ga = da.some = da.any = function (ta, ua, va) {
            ua || (ua = da.identity);
            var wa = false;
            if (ta == null)return wa;
            if (x && ta.some === x)return ta.some(ua, va);
            ea(ta, function (xa, ya, za) {
                if (wa || (wa = ua.call(va, xa, ya, za)))return i;
            });
            return !!wa;
        };
        da.contains = da.include = function (ta, ua) {
            if (ta == null)return false;
            if (y && ta.indexOf === y)return ta.indexOf(ua) != -1;
            return ga(ta, function (va) {
                return va === ua;
            });
        };
        da.invoke = function (ta, ua) {
            var va = n.call(arguments, 2), wa = da.isFunction(ua);
            return da.map(ta, function (xa) {
                return (wa ? ua : xa[ua]).apply(xa, va);
            });
        };
        da.pluck = function (ta, ua) {
            return da.map(ta, function (va) {
                return va[ua];
            });
        };
        da.where = function (ta, ua, va) {
            if (da.isEmpty(ua))return va ? void 0 : [];
            return da[va ? 'find' : 'filter'](ta, function (wa) {
                for (var xa in ua)if (ua[xa] !== wa[xa])return false;
                return true;
            });
        };
        da.findWhere = function (ta, ua) {
            return da.where(ta, ua, true);
        };
        da.max = function (ta, ua, va) {
            if (!ua && da.isArray(ta) && ta[0] === +ta[0] && ta.length < 65535)return Math.max.apply(Math, ta);
            if (!ua && da.isEmpty(ta))return -Infinity;
            var wa = {computed: -Infinity, value: -Infinity};
            ea(ta, function (xa, ya, za) {
                var ab = ua ? ua.call(va, xa, ya, za) : xa;
                ab > wa.computed && (wa = {value: xa, computed: ab});
            });
            return wa.value;
        };
        da.min = function (ta, ua, va) {
            if (!ua && da.isArray(ta) && ta[0] === +ta[0] && ta.length < 65535)return Math.min.apply(Math, ta);
            if (!ua && da.isEmpty(ta))return Infinity;
            var wa = {computed: Infinity, value: Infinity};
            ea(ta, function (xa, ya, za) {
                var ab = ua ? ua.call(va, xa, ya, za) : xa;
                ab < wa.computed && (wa = {value: xa, computed: ab});
            });
            return wa.value;
        };
        da.shuffle = function (ta) {
            var ua, va = 0, wa = [];
            ea(ta, function (xa) {
                ua = da.random(va++);
                wa[va - 1] = wa[ua];
                wa[ua] = xa;
            });
            return wa;
        };
        da.sample = function (ta, ua, va) {
            if (arguments.length < 2 || va)return ta[da.random(ta.length - 1)];
            return da.shuffle(ta).slice(0, Math.max(0, ua));
        };
        var ha = function (ta) {
            return da.isFunction(ta) ? ta : function (ua) {
                return ua[ta];
            };
        };
        da.sortBy = function (ta, ua, va) {
            var wa = ha(ua);
            return da.pluck(da.map(ta,function (xa, ya, za) {
                return {value: xa, index: ya, criteria: wa.call(va, xa, ya, za)};
            }).sort(function (xa, ya) {
                var za = xa.criteria, ab = ya.criteria;
                if (za !== ab) {
                    if (za > ab || za === void 0)return 1;
                    if (za < ab || ab === void 0)return -1;
                }
                return xa.index - ya.index;
            }), 'value');
        };
        var ia = function (ta) {
            return function (ua, va, wa) {
                var xa = {}, ya = va == null ? da.identity : ha(va);
                ea(ua, function (za, ab) {
                    var bb = ya.call(wa, za, ab, ua);
                    ta(xa, bb, za);
                });
                return xa;
            };
        };
        da.groupBy = ia(function (ta, ua, va) {
            (da.has(ta, ua) ? ta[ua] : (ta[ua] = [])).push(va);
        });
        da.indexBy = ia(function (ta, ua, va) {
            ta[ua] = va;
        });
        da.countBy = ia(function (ta, ua) {
            da.has(ta, ua) ? ta[ua]++ : ta[ua] = 1;
        });
        da.sortedIndex = function (ta, ua, va, wa) {
            va = va == null ? da.identity : ha(va);
            var xa = va.call(wa, ua), ya = 0, za = ta.length;
            while (ya < za) {
                var ab = (ya + za) >>> 1;
                va.call(wa, ta[ab]) < xa ? ya = ab + 1 : za = ab;
            }
            return ya;
        };
        da.toArray = function (ta) {
            if (!ta)return [];
            if (da.isArray(ta))return n.call(ta);
            if (ta.length === +ta.length)return da.map(ta, da.identity);
            return da.values(ta);
        };
        da.size = function (ta) {
            if (ta == null)return 0;
            return (ta.length === +ta.length) ? ta.length : da.keys(ta).length;
        };
        da.first = da.head = da.take = function (ta, ua, va) {
            if (ta == null)return void 0;
            return (ua == null) || va ? ta[0] : n.call(ta, 0, ua);
        };
        da.initial = function (ta, ua, va) {
            return n.call(ta, 0, ta.length - ((ua == null) || va ? 1 : ua));
        };
        da.last = function (ta, ua, va) {
            if (ta == null)return void 0;
            if ((ua == null) || va) {
                return ta[ta.length - 1];
            } else return n.call(ta, Math.max(ta.length - ua, 0));
        };
        da.rest = da.tail = da.drop = function (ta, ua, va) {
            return n.call(ta, (ua == null) || va ? 1 : ua);
        };
        da.compact = function (ta) {
            return da.filter(ta, da.identity);
        };
        var ja = function (ta, ua, va) {
            if (ua && da.every(ta, da.isArray))return o.apply(va, ta);
            ea(ta, function (wa) {
                if (da.isArray(wa) || da.isArguments(wa)) {
                    ua ? m.apply(va, wa) : ja(wa, ua, va);
                } else va.push(wa);
            });
            return va;
        };
        da.flatten = function (ta, ua) {
            return ja(ta, ua, []);
        };
        da.without = function (ta) {
            return da.difference(ta, n.call(arguments, 1));
        };
        da.uniq = da.unique = function (ta, ua, va, wa) {
            if (da.isFunction(ua)) {
                wa = va;
                va = ua;
                ua = false;
            }
            var xa = va ? da.map(ta, va, wa) : ta, ya = [], za = [];
            ea(xa, function (ab, bb) {
                if (ua ? (!bb || za[za.length - 1] !== ab) : !da.contains(za, ab)) {
                    za.push(ab);
                    ya.push(ta[bb]);
                }
            });
            return ya;
        };
        da.union = function () {
            return da.uniq(da.flatten(arguments, true));
        };
        da.intersection = function (ta) {
            var ua = n.call(arguments, 1);
            return da.filter(da.uniq(ta), function (va) {
                return da.every(ua, function (wa) {
                    return da.indexOf(wa, va) >= 0;
                });
            });
        };
        da.difference = function (ta) {
            var ua = o.apply(j, n.call(arguments, 1));
            return da.filter(ta, function (va) {
                return !da.contains(ua, va);
            });
        };
        da.zip = function () {
            var ta = da.max(da.pluck(arguments, "length").concat(0)), ua = new Array(ta);
            for (var va = 0; va < ta; va++)ua[va] = da.pluck(arguments, '' + va);
            return ua;
        };
        da.object = function (ta, ua) {
            if (ta == null)return {};
            var va = {};
            for (var wa = 0, xa = ta.length; wa < xa; wa++)if (ua) {
                va[ta[wa]] = ua[wa];
            } else va[ta[wa][0]] = ta[wa][1];
            return va;
        };
        da.indexOf = function (ta, ua, va) {
            if (ta == null)return -1;
            var wa = 0, xa = ta.length;
            if (va)if (typeof va == 'number') {
                wa = (va < 0 ? Math.max(0, xa + va) : va);
            } else {
                wa = da.sortedIndex(ta, ua);
                return ta[wa] === ua ? wa : -1;
            }
            if (y && ta.indexOf === y)return ta.indexOf(ua, va);
            for (; wa < xa; wa++)if (ta[wa] === ua)return wa;
            return -1;
        };
        da.lastIndexOf = function (ta, ua, va) {
            if (ta == null)return -1;
            var wa = va != null;
            if (z && ta.lastIndexOf === z)return wa ? ta.lastIndexOf(ua, va) : ta.lastIndexOf(ua);
            var xa = (wa ? va : ta.length);
            while (xa--)if (ta[xa] === ua)return xa;
            return -1;
        };
        da.range = function (ta, ua, va) {
            if (arguments.length <= 1) {
                ua = ta || 0;
                ta = 0;
            }
            va = arguments[2] || 1;
            var wa = Math.max(Math.ceil((ua - ta) / va), 0), xa = 0, ya = new Array(wa);
            while (xa < wa) {
                ya[xa++] = ta;
                ta += va;
            }
            return ya;
        };
        var ka = function () {
        };
        da.bind = function (ta, ua) {
            var va, wa;
            if (ca && ta.bind === ca)return ca.apply(ta, n.call(arguments, 1));
            if (!da.isFunction(ta))throw new TypeError();
            va = n.call(arguments, 2);
            return wa = function () {
                if (!(this instanceof wa))return ta.apply(ua, va.concat(n.call(arguments)));
                ka.prototype = ta.prototype;
                var xa = new ka();
                ka.prototype = null;
                var ya = ta.apply(xa, va.concat(n.call(arguments)));
                if (Object(ya) === ya)return ya;
                return xa;
            };
        };
        da.partial = function (ta) {
            var ua = n.call(arguments, 1);
            return function () {
                return ta.apply(this, ua.concat(n.call(arguments)));
            };
        };
        da.bindAll = function (ta) {
            var ua = n.call(arguments, 1);
            if (ua.length === 0)throw new Error("bindAll must be passed function names");
            ea(ua, function (va) {
                ta[va] = da.bind(ta[va], ta);
            });
            return ta;
        };
        da.memoize = function (ta, ua) {
            var va = {};
            ua || (ua = da.identity);
            return function () {
                var wa = ua.apply(this, arguments);
                return da.has(va, wa) ? va[wa] : (va[wa] = ta.apply(this, arguments));
            };
        };
        da.delay = function (ta, ua) {
            var va = n.call(arguments, 2);
            return setTimeout(function () {
                return ta.apply(null, va);
            }, ua);
        };
        da.defer = function (ta) {
            return da.delay.apply(da, [ta, 1].concat(n.call(arguments, 1)));
        };
        da.throttle = function (ta, ua, va) {
            var wa, xa, ya, za = null, ab = 0;
            va || (va = {});
            var bb = function () {
                ab = va.leading === false ? 0 : new Date();
                za = null;
                ya = ta.apply(wa, xa);
            };
            return function () {
                var cb = new Date();
                if (!ab && va.leading === false)ab = cb;
                var db = ua - (cb - ab);
                wa = this;
                xa = arguments;
                if (db <= 0) {
                    clearTimeout(za);
                    za = null;
                    ab = cb;
                    ya = ta.apply(wa, xa);
                } else if (!za && va.trailing !== false)za = setTimeout(bb, db);
                return ya;
            };
        };
        da.debounce = function (ta, ua, va) {
            var wa, xa, ya, za, ab;
            return function () {
                ya = this;
                xa = arguments;
                za = new Date();
                var bb = function () {
                    var db = (new Date()) - za;
                    if (db < ua) {
                        wa = setTimeout(bb, ua - db);
                    } else {
                        wa = null;
                        if (!va)ab = ta.apply(ya, xa);
                    }
                }, cb = va && !wa;
                if (!wa)wa = setTimeout(bb, ua);
                if (cb)ab = ta.apply(ya, xa);
                return ab;
            };
        };
        da.once = function (ta) {
            var ua = false, va;
            return function () {
                if (ua)return va;
                ua = true;
                va = ta.apply(this, arguments);
                ta = null;
                return va;
            };
        };
        da.wrap = function (ta, ua) {
            return function () {
                var va = [ta];
                m.apply(va, arguments);
                return ua.apply(this, va);
            };
        };
        da.compose = function () {
            var ta = arguments;
            return function () {
                var ua = arguments;
                for (var va = ta.length - 1; va >= 0; va--)ua = [ta[va].apply(this, ua)];
                return ua[0];
            };
        };
        da.after = function (ta, ua) {
            return function () {
                if (--ta < 1)return ua.apply(this, arguments);
            };
        };
        da.keys = ba || function (ta) {
            if (ta !== Object(ta))throw new TypeError('Invalid object');
            var ua = [];
            for (var va in ta)if (da.has(ta, va))ua.push(va);
            return ua;
        };
        da.values = function (ta) {
            var ua = da.keys(ta), va = ua.length, wa = new Array(va);
            for (var xa = 0; xa < va; xa++)wa[xa] = ta[ua[xa]];
            return wa;
        };
        da.pairs = function (ta) {
            var ua = da.keys(ta), va = ua.length, wa = new Array(va);
            for (var xa = 0; xa < va; xa++)wa[xa] = [ua[xa], ta[ua[xa]]];
            return wa;
        };
        da.invert = function (ta) {
            var ua = {}, va = da.keys(ta);
            for (var wa = 0, xa = va.length; wa < xa; wa++)ua[ta[va[wa]]] = va[wa];
            return ua;
        };
        da.functions = da.methods = function (ta) {
            var ua = [];
            for (var va in ta)if (da.isFunction(ta[va]))ua.push(va);
            return ua.sort();
        };
        da.extend = function (ta) {
            ea(n.call(arguments, 1), function (ua) {
                if (ua)for (var va in ua)ta[va] = ua[va];
            });
            return ta;
        };
        da.pick = function (ta) {
            var ua = {}, va = o.apply(j, n.call(arguments, 1));
            ea(va, function (wa) {
                if (wa in ta)ua[wa] = ta[wa];
            });
            return ua;
        };
        da.omit = function (ta) {
            var ua = {}, va = o.apply(j, n.call(arguments, 1));
            for (var wa in ta)if (!da.contains(va, wa))ua[wa] = ta[wa];
            return ua;
        };
        da.defaults = function (ta) {
            ea(n.call(arguments, 1), function (ua) {
                if (ua)for (var va in ua)if (ta[va] === void 0)ta[va] = ua[va];
            });
            return ta;
        };
        da.clone = function (ta) {
            if (!da.isObject(ta))return ta;
            return da.isArray(ta) ? ta.slice() : da.extend({}, ta);
        };
        da.tap = function (ta, ua) {
            ua(ta);
            return ta;
        };
        var la = function (ta, ua, va, wa) {
            if (ta === ua)return ta !== 0 || 1 / ta == 1 / ua;
            if (ta == null || ua == null)return ta === ua;
            if (ta instanceof da)ta = ta._wrapped;
            if (ua instanceof da)ua = ua._wrapped;
            var xa = p.call(ta);
            if (xa != p.call(ua))return false;
            switch (xa) {
                case '[object String]':
                    return ta == String(ua);
                case '[object Number]':
                    return ta != +ta ? ua != +ua : (ta == 0 ? 1 / ta == 1 / ua : ta == +ua);
                case '[object Date]':
                case '[object Boolean]':
                    return +ta == +ua;
                case '[object RegExp]':
                    return ta.source == ua.source && ta.global == ua.global && ta.multiline == ua.multiline && ta.ignoreCase == ua.ignoreCase;
            }
            if (typeof ta != 'object' || typeof ua != 'object')return false;
            var ya = va.length;
            while (ya--)if (va[ya] == ta)return wa[ya] == ua;
            var za = ta.constructor, ab = ua.constructor;
            if (za !== ab && !(da.isFunction(za) && (za instanceof za) && da.isFunction(ab) && (ab instanceof ab)))return false;
            va.push(ta);
            wa.push(ua);
            var bb = 0, cb = true;
            if (xa == '[object Array]') {
                bb = ta.length;
                cb = bb == ua.length;
                if (cb)while (bb--)if (!(cb = la(ta[bb], ua[bb], va, wa)))break;
            } else {
                for (var db in ta)if (da.has(ta, db)) {
                    bb++;
                    if (!(cb = da.has(ua, db) && la(ta[db], ua[db], va, wa)))break;
                }
                if (cb) {
                    for (db in ua)if (da.has(ua, db) && !(bb--))break;
                    cb = !bb;
                }
            }
            va.pop();
            wa.pop();
            return cb;
        };
        da.isEqual = function (ta, ua) {
            return la(ta, ua, [], []);
        };
        da.isEmpty = function (ta) {
            if (ta == null)return true;
            if (da.isArray(ta) || da.isString(ta))return ta.length === 0;
            for (var ua in ta)if (da.has(ta, ua))return false;
            return true;
        };
        da.isElement = function (ta) {
            return !!(ta && ta.nodeType === 1);
        };
        da.isArray = aa || function (ta) {
            return p.call(ta) == '[object Array]';
        };
        da.isObject = function (ta) {
            return ta === Object(ta);
        };
        ea(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (ta) {
            da['is' + ta] = function (ua) {
                return p.call(ua) == '[object ' + ta + ']';
            };
        });
        if (!da.isArguments(arguments))da.isArguments = function (ta) {
            return !!(ta && da.has(ta, 'callee'));
        };
        if (typeof(/./) !== 'function')da.isFunction = function (ta) {
            return typeof ta === 'function';
        };
        da.isFinite = function (ta) {
            return isFinite(ta) && !isNaN(parseFloat(ta));
        };
        da.isNaN = function (ta) {
            return da.isNumber(ta) && ta != +ta;
        };
        da.isBoolean = function (ta) {
            return ta === true || ta === false || p.call(ta) == '[object Boolean]';
        };
        da.isNull = function (ta) {
            return ta === null;
        };
        da.isUndefined = function (ta) {
            return ta === void 0;
        };
        da.has = function (ta, ua) {
            return q.call(ta, ua);
        };
        da.noConflict = function () {
            g._ = h;
            return this;
        };
        da.identity = function (ta) {
            return ta;
        };
        da.times = function (ta, ua, va) {
            var wa = Array(Math.max(0, ta));
            for (var xa = 0; xa < ta; xa++)wa[xa] = ua.call(va, xa);
            return wa;
        };
        da.random = function (ta, ua) {
            if (ua == null) {
                ua = ta;
                ta = 0;
            }
            return ta + Math.floor(Math.random() * (ua - ta + 1));
        };
        var ma = {escape: {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;'}};
        ma.unescape = da.invert(ma.escape);
        var na = {escape: new RegExp('[' + da.keys(ma.escape).join('') + ']', 'g'), unescape: new RegExp('(' + da.keys(ma.unescape).join('|') + ')', 'g')};
        da.each(['escape', 'unescape'], function (ta) {
            da[ta] = function (ua) {
                if (ua == null)return '';
                return ('' + ua).replace(na[ta], function (va) {
                    return ma[ta][va];
                });
            };
        });
        da.result = function (ta, ua) {
            if (ta == null)return void 0;
            var va = ta[ua];
            return da.isFunction(va) ? va.call(ta) : va;
        };
        da.mixin = function (ta) {
            ea(da.functions(ta), function (ua) {
                var va = da[ua] = ta[ua];
                da.prototype[ua] = function () {
                    var wa = [this._wrapped];
                    m.apply(wa, arguments);
                    return sa.call(this, va.apply(da, wa));
                };
            });
        };
        var oa = 0;
        da.uniqueId = function (ta) {
            var ua = ++oa + '';
            return ta ? ta + ua : ua;
        };
        da.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
        var pa = /(.)^/, qa = {"'": "'", '\\': '\\', '\r': 'r', '\n': 'n', '\t': 't', '\u2028': 'u2028', '\u2029': 'u2029'}, ra = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        da.template = function (ta, ua, va) {
            var wa;
            va = da.defaults({}, va, da.templateSettings);
            var xa = new RegExp([(va.escape || pa).source, (va.interpolate || pa).source, (va.evaluate || pa).source].join('|') + '|$', 'g'), ya = 0, za = "__p+='";
            ta.replace(xa, function (cb, db, eb, fb, gb) {
                za += ta.slice(ya, gb).replace(ra, function (hb) {
                    return '\\' + qa[hb];
                });
                if (db)za += "'+\n((__t=(" + db + "))==null?'':_.escape(__t))+\n'";
                if (eb)za += "'+\n((__t=(" + eb + "))==null?'':__t)+\n'";
                if (fb)za += "';\n" + fb + "\n__p+='";
                ya = gb + cb.length;
                return cb;
            });
            za += "';\n";
            if (!va.variable)za = 'with(obj||{}){\n' + za + '}\n';
            za = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + za + "return __p;\n";
            try {
                wa = new Function(va.variable || 'obj', '_', za);
            } catch (ab) {
                ab.source = za;
                throw ab;
            }
            if (ua)return wa(ua, da);
            var bb = function (cb) {
                return wa.call(this, cb, da);
            };
            bb.source = 'function(' + (va.variable || 'obj') + '){\n' + za + '}';
            return bb;
        };
        da.chain = function (ta) {
            return da(ta).chain();
        };
        var sa = function (ta) {
            return this._chain ? da(ta).chain() : ta;
        };
        da.mixin(da);
        ea(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (ta) {
            var ua = j[ta];
            da.prototype[ta] = function () {
                var va = this._wrapped;
                ua.apply(va, arguments);
                if ((ta == 'shift' || ta == 'splice') && va.length === 0)delete va[0];
                return sa.call(this, va);
            };
        });
        ea(['concat', 'join', 'slice'], function (ta) {
            var ua = j[ta];
            da.prototype[ta] = function () {
                return sa.call(this, ua.apply(this._wrapped, arguments));
            };
        });
        da.extend(da.prototype, {chain: function () {
            this._chain = true;
            return this;
        }, value: function () {
            return this._wrapped;
        }});
    }).call(this);
}, null);
__d("FBAnimatedProgressBar.react", ["Animation", "React", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = h.PropTypes, l = 300, m = h.createClass({displayName: 'FBAnimatedProgressBar', propTypes: {className: k.string, duration: k.number.isRequired, percent: k.number.isRequired}, componentDidMount: function () {
        this._animation = null;
        this._totalWidth = this.getDOMNode().offsetWidth;
    }, componentDidUpdate: function (n, o) {
        if (n.percent == this.props.percent)return;
        var p = this.props.percent, q = this.props.duration, r = (parseInt(this._totalWidth, 10) * parseInt(p, 10)) / 100;
        if (!this._animation)this._animation = new g(this.refs.fill.getDOMNode());
        this._animation.stop().to('width', parseInt(r, 10)).duration(this.props.animate ? Math.max(parseInt(q, 10), l) : 0).go();
    }, render: function () {
        var n = j(this.props.className, "_1c5");
        return (h.createElement(h.DOM.div, {className: n}, h.createElement(h.DOM.div, {className: "_1c6", ref: "fill"})));
    }});
    e.exports = m;
}, null);
__d("XVideoHideEncodeCardControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/video\/encode\/hide_card\/", {video_id: {type: "String", required: true}});
}, null);
__d("VideoEncodeCard.react", ["FBAnimatedProgressBar.react", "Animation", "Arbiter", "AsyncRequest", "BanzaiLogger", "ChannelConstants", "DOM", "Ease", "React", "Image.react", "SubscriptionsHandler", "XVideoHideEncodeCardControllerURIBuilder", "XUICard.react", "XUICloseButton.react", "XUIText.react", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
    var x = 6000, y = 250, z = 'video_encode', aa = 'video_thumbnail_generated', ba = 'VideoEncodeCardLoggerConfig', ca = 'hide', da = 'render', ea = {done: "\u0412\u0430\u0448\u0435 \u0432\u0438\u0434\u0435\u043e \u0433\u043e\u0442\u043e\u0432\u043e!", error: "\u041a \u0441\u043e\u0436\u0430\u043b\u0435\u043d\u0438\u044e, \u0432\u0430\u0448\u0435 \u0432\u0438\u0434\u0435\u043e \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c.", processing: "\u0412\u0430\u0448\u0435 \u0432\u0438\u0434\u0435\u043e \u043e\u0431\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0435\u0442\u0441\u044f. \u041a\u043e\u0433\u0434\u0430 \u043e\u043d\u043e \u0431\u0443\u0434\u0435\u0442 \u0433\u043e\u0442\u043e\u0432\u043e, \u043e\u043d\u043e \u0431\u0443\u0434\u0435\u0442 \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d\u043e \u043d\u0430 Facebook.", retry: "\u0412\u0430\u0448\u0435 \u0432\u0438\u0434\u0435\u043e \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c, \u043d\u043e \u043c\u044b \u043f\u043e\u043f\u044b\u0442\u0430\u0435\u043c\u0441\u044f \u044d\u0442\u043e \u0441\u0434\u0435\u043b\u0430\u0442\u044c."}, fa = o.createClass({displayName: 'VideoEncodeCard', propTypes: {progressBarConfig: o.PropTypes.object.isRequired, videoID: o.PropTypes.string.isRequired}, getInitialState: function () {
        return {duration: 0, errorMessage: '', message: 'processing', targetPercent: 0, thumbnailLoaded: false, thumbnailSrc: null};
    }, componentWillMount: function () {
        if (this.props.thumbUrl)this.setState({thumbnailSrc: this.props.thumbUrl});
    }, componentDidMount: function () {
        this._subscriptionsHandler = new q();
        this._subscriptionsHandler.addSubscriptions(i.subscribe(this._getChannelType(z), this._handleChannelUpdates), i.subscribe(this._getChannelType(aa), this._updateThumbnail));
        k.log(ba, {event: da, video_id: this.props.videoID, origin: this.props.origin});
    }, componentWillUnmount: function () {
        this._subscriptionsHandler.release();
    }, _resetProgress: function () {
        this.setState({targetPercent: 0, duration: 0});
    }, _getChannelType: function (ga) {
        return l.getArbiterType(ga);
    }, _updateThumbnail: function (event, ga) {
        if (ga.obj.videoID == this.props.videoID)this.setState({thumbnailSrc: ga.obj.thumbUrl});
    }, _handleChannelUpdates: function (event, ga) {
        if (ga.obj.videoID != this.props.videoID)return;
        var ha = ga.obj.error, ia = ga.obj.extra, ja = ga.obj.progress, ka = ga.obj.stage;
        if (ia.quality)ka += '_' + ia.quality;
        if (ha) {
            this._onError(ha, ia.is_permanent_error);
            return;
        } else this.setState({errorMessage: '', message: 'processing'});
        var la = this.props.progressBarConfig.stages[ka];
        if (!la)return;
        if (ia.hasOwnProperty('progress')) {
            ja = Math.min(100, ja + (ia.progress * la.percent) / 100);
        } else ja = Math.min(100, ja + la.percent);
        if (!la.hasOwnProperty('duration')) {
            if (!ia.hasOwnProperty('time_left'))return;
            this.setState({targetPercent: ja, duration: ia.time_left});
            return;
        }
        this.setState({targetPercent: ja, duration: la.duration});
        if (ka == "finish") {
            this.setState({message: 'done'});
            setTimeout(this._hideCard, x);
        }
    }, _onError: function (ga, ha) {
        if (!ha) {
            this.setState({message: 'retry'});
            this._resetProgress();
        } else {
            this.setState({errorMessage: ga.__html, message: 'error'});
            this._resetProgress();
        }
    }, _hideCard: function () {
        this._subscriptionsHandler.release();
        var ga = this.getDOMNode(), ha = n.makePowerIn(3);
        new h(ga).from('opacity', 1).to('opacity', 0).to('height', '0%').to('margin-bottom', 0).to('margin-top', 0).to('padding-bottom', 0).to('padding-top', 0).duration(y).ease(ha).go().ondone(function () {
            m.remove(ga);
        });
    }, _hideButtonClickHandler: function () {
        this._hideCard();
        this._addCardHideAssoc();
        k.log(ba, {event: ca, video_id: this.props.videoID, origin: this.props.origin});
    }, _addCardHideAssoc: function () {
        var ga = new r().setString('video_id', this.props.videoID).getURI();
        new j(ga).send();
    }, _onThumbnailLoad: function () {
        this.setState({thumbnailLoaded: true});
    }, render: function () {
        var ga = null;
        if (this.state.thumbnailSrc) {
            var ha = (("_52rg") + (this.state.thumbnailLoaded ? ' ' + "_2ub3" : ''));
            ga = o.createElement(p, {className: ha, src: this.state.thumbnailSrc, onLoad: this._onThumbnailLoad});
        }
        var ia = this.state.message === 'error' ? o.createElement(u, {size: "medium", dangerouslySetInnerHTML: {__html: this.state.errorMessage}}) : o.createElement(u, {size: "medium"}, ea[this.state.message]);
        return (o.createElement(s, {className: "_4naz"}, o.createElement(o.DOM.div, {className: "_10au"}, ga, o.createElement(o.DOM.div, {className: (("_10av") + (this.state.message == 'error' ? ' ' + "_5q6t" : ''))}, o.createElement(o.DOM.div, {className: "_2fs7"}))), o.createElement(o.DOM.div, {className: "_10aw"}, ia), o.createElement(o.DOM.div, {className: "clearfix"}), o.createElement(g, {animate: this.state.message != 'error' && this.state.message != 'retry', className: "_25c", duration: this.state.duration, percent: this.state.targetPercent}), o.createElement(t, {className: "_10ax", size: "medium", tooltip: "Hide", onClick: this._hideButtonClickHandler})));
    }});
    e.exports = fa;
}, null);
__d("VideoEncodeCardHandler", ["Arbiter", "CSS", "DOM", "React", "VideoEncodeCard.react"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = 'server', m = 'client', n = {_alreadySubscribed: false, _cardsContainer: null, _progressBarConfig: null, initHandler: function (o, p) {
        this._cardsContainer = o;
        this._progressBarConfig = p;
        if (!this._alreadySubscribed) {
            g.subscribe('videoUpload/complete', this.addVideoEncodeCardFromClient.bind(this));
            this._alreadySubscribed = true;
        }
    }, addVideoEncodeCardFromServer: function (o) {
        this.addVideoEncodeCard(o, l);
    }, addVideoEncodeCardFromClient: function (o, p) {
        this.addVideoEncodeCard(p, m);
    }, addVideoEncodeCard: function (o, p) {
        h.show(this._cardsContainer);
        var q = i.create('div', {className: 'videoEncodeCard'});
        i.prependContent(this._cardsContainer, q);
        j.renderComponent(j.createElement(k, {progressBarConfig: this._progressBarConfig, videoID: o.videoID, thumbUrl: o.thumbUrl, origin: p}), q);
    }};
    e.exports = n;
}, null);
__d("EntstreamStoryDeduper", ["AsyncRequest", "Arbiter", "DOM", "csx", "CSS", "CacheStorage"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    function m(p, q) {
        var r = {};
        for (var s = 0; s < p.length; s++) {
            var t = p[s], u = t.getAttribute('data-dedupekey');
            if (r[u]) {
                if (q) {
                    k.hide(t);
                    h.inform('FbFeedUnreadPillNavigation/logDedupe', {story: t, action: 'dedupe_story_hide'});
                } else {
                    i.remove(t);
                    h.inform('FbFeedUnreadPillNavigation/logDedupe', {story: t, action: 'dedupe_story_remove'});
                }
            } else r[u] = 1;
        }
    }

    function n(p, q) {
        var r = {}, s = 0, t = Date.now() / 1000 / 3600, u = 30;
        for (var v = 0; v < u; ++v) {
            var w = new l('localstorage', 'vpv_local_log.' + parseInt(t - v, 10) + 'h'), x = w.keys();
            s += x.length > 0;
            for (var y = 0; y < x.length; y++)r[x[y]] = 1;
        }
        var z = 0, aa = 0, ba;
        for (var ca = 0; ca < p.length; ca++) {
            var da = p[ca], ea = da.getAttribute('data-dedupekey'), fa = 'checkedVPVLocalCache';
            if (k.hasClass(da, fa)) {
                continue;
            } else k.addClass(da, fa);
            ++z;
            if (r[ea] && k.shown(da)) {
                ba = ea;
                ++aa;
                if (q) {
                    k.hide(da);
                } else i.remove(da);
            }
        }
        if (z > 0)new g('/ajax/feed/feed_tracking/vpv_local_storage_log').setData({num_vpvs: Object.keys(r).length, num_hours: s, num_seen_stories: aa, num_unseen_stories: z, seen_story_key: ba}).send();
    }

    var o = {dedupe: function (p, q) {
        q = q || "._5jmm";
        var r = i.scry(p, q);
        r = r.filter(function (s) {
            return s.getAttribute('data-dedupekey');
        });
        m(r, false);
    }, dedupeHide: function (p, q, r) {
        q = q || "._5jmm";
        var s = i.scry(p, q), t = s.filter(function (x) {
            return x.getAttribute('data-dedupekey') && k.shown(x);
        });
        m(t, true);
        if (r) {
            var u = i.scry(p, ".unread_session");
            for (var v = 0; v < u.length; ++v) {
                var w = i.scry(u[v], q);
                w.length && n(w, true);
            }
        }
    }};
    e.exports = o;
}, null);
__d("FeedBaseKeyboardController", ["$", "AccessibilityLogger", "Arbiter", "AsyncDialog", "AsyncRequest", "Banzai", "BanzaiODS", "BanzaiNectar", "CSS", "DOM", "DOMScroll", "DOMQuery", "Event", "Focus", "KeyboardShortcuts", "LikeConfirmer", "NavigationMessage", "Parent", "Run", "StickyComposerConfig", "SubscriptionsHandler", "Vector", "ViewportBounds", "emptyFunction", "ge", "getActiveElement", "isAsyncScrollQuery", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha) {
    var ia;

    function ja() {
        ia = o.hasClass(document.documentElement, 'tinyViewport') ? 0 : g('pagelet_bluebar').offsetTop + g('pagelet_bluebar').offsetHeight;
    }

    setTimeout(ja, 0);
    s.listen(window, 'resize', ha(ja));
    function ka(la) {
        "use strict";
        this.root = la;
        this.init();
    }

    ka.prototype.getStories = function () {
        "use strict";
    };
    ka.prototype.getParentStory = function (la) {
        "use strict";
    };
    ka.prototype.isStory = function (la) {
        "use strict";
    };
    ka.prototype.isHoldoutStory = function (la) {
        "use strict";
    };
    ka.prototype.getHeadline = function (la) {
        "use strict";
    };
    ka.prototype.getPreviousStory = function (la) {
        "use strict";
    };
    ka.prototype.getNextStory = function (la) {
        "use strict";
    };
    ka.prototype.setSelected = function (la, ma) {
        "use strict";
    };
    ka.prototype.clickLike = function () {
        "use strict";
    };
    ka.prototype.clickComment = function () {
        "use strict";
    };
    ka.prototype.clickShare = function () {
        "use strict";
    };
    ka.prototype.clickSeeMore = function () {
        "use strict";
    };
    ka.prototype.clickLeft = function () {
        "use strict";
    };
    ka.prototype.clickRight = function () {
        "use strict";
    };
    ka.prototype.openAttachment = function () {
        "use strict";
    };
    ka.prototype.focusComposer = function () {
        "use strict";
        var la = p.scry(ea('pagelet_composer'), 'textarea')[0];
        if (la) {
            t.set(la);
            q.scrollToTop(true);
        }
    };
    ka.prototype.getScrollOffset = function () {
        "use strict";
        return 10;
    };
    ka.prototype.getAnimationLength = function (la) {
        "use strict";
        return Math.min(Math.abs(ba.getElementPosition(la).y - ca.getTop() - document.body.scrollTop), 400);
    };
    ka.prototype.findTop = function () {
        "use strict";
        var la = this.getStories();
        for (var ma = 0; ma < la.length; ma++)if (ba.getElementPosition(la[ma]).y > ba.getScrollPosition().y)return la[ma];
    };
    ka.prototype.onLeave = function () {
        "use strict";
        this.subscriptions && this.subscriptions.release();
    };
    ka.prototype.getHelpDialogRequest = function () {
        "use strict";
        if (!this.dialogRequest) {
            this.dialogRequest = new k('/ajax/keyboard_shortcuts');
            this.dialogRequest.setReadOnly(true);
        } else if (this.dialogRequest.transport)return null;
        return this.dialogRequest;
    };
    ka.prototype.init = function () {
        "use strict";
        y.onLeave(this.onLeave.bind(this));
        this.subscriptions = new aa();
        this.subscriptions.addSubscriptions(i.subscribe(w.NAVIGATION_BEGIN, this.onLeave.bind(this)), u.register('j', this.vert.bind(this, 1)), u.register('k', this.vert.bind(this, -1)), u.register('l', function () {
            var la = this.getParentStory(fa());
            v.like(function () {
                this.setSelected(la, false);
                this.clickLike();
            }.bind(this), fa());
        }.bind(this), {filter: this.hasActiveStory.bind(this)}), u.register('c', this.clickComment.bind(this), {filter: this.hasActiveStory.bind(this)}), u.register('o', this.openAttachment.bind(this), {filter: this.hasActiveStory.bind(this)}), u.register('p', this.focusComposer.bind(this)), u.register('s', this.clickShare.bind(this), {filter: this.hasActiveStory.bind(this)}), u.register('SLASH', function () {
            var la = this.getHelpDialogRequest();
            la && j.send(la);
        }.bind(this), {filter: function (event, la) {
            return event.getModifiers().shift;
        }}), u.register('RETURN', this.clickSeeMore.bind(this), {filter: this.hasExpandableStoryInFocus.bind(this)}), u.register('LEFT', this.clickLeft.bind(this), {filter: this.hasActiveStory.bind(this)}), u.register('RIGHT', this.clickRight.bind(this), {filter: this.hasActiveStory.bind(this)}), s.listen(document, 'focusin', function (event) {
            var la = event.getTarget(), ma = (la.nodeName == 'OBJECT' || la.nodeName == 'EMBED' || la.nodeName == 'IFRAME'), na = this.getParentStory(la);
            if (na && (this.selected != na) && !ma) {
                this.setSelected(na, false);
                if (!this.isInteractive(la))this.setFocused(na);
            }
        }.bind(this)));
    };
    ka.prototype.hasActiveStory = function (event, la) {
        "use strict";
        var ma = fa();
        return !(ma && o.shown(ma)) || !!this.getParentStory(ma);
    };
    ka.prototype.hasExpandableStoryInFocus = function (event, la) {
        "use strict";
        var ma = fa();
        return (ma.getElementsByClassName('text_exposed_root').length && !ma.getElementsByClassName('text_exposed_root text_exposed').length);
    };
    ka.prototype.click = function (la) {
        "use strict";
        if (!this.selected)return;
        var ma;
        for (var na = 0, oa = arguments.length; na < oa; na++) {
            ma = p.scry(this.selected, arguments[na])[0];
            if (ma && o.shown(ma)) {
                ma.click();
                return;
            }
        }
    };
    ka.prototype.vert = function (la) {
        "use strict";
        if (!this.scrollInitialized) {
            this.subscriptions.addSubscriptions(s.listen(document, 'scroll', function () {
                if (this.selected && !this.scrolling)this.setSelected(null, false);
            }.bind(this)));
            this.scrollInitialized = true;
        }
        var ma, na;
        if (this.selected) {
            if (l.isEnabled('kbshortcuts_feed')) {
                na = la > 0 ? 'kbshortcuts.scroll_down' : 'kbshortcuts.scroll_up';
                m.bumpEntityKey('kbshortcuts_feed', na);
                n.log('feed_scroll', na, {});
            }
            h.logJKKey();
            if (this.selected.id == 'pagelet_composer') {
                ma = la > 0 ? this.getStories()[0] : null;
                if (this.isHoldoutStory(ma))ma = this.getPreviousStory(ma);
            } else ma = la > 0 ? this.getNextStory(this.selected) : (this.getPreviousStory(this.selected) || ea('pagelet_composer'));
            if (!ma) {
                return;
            } else if (!r.isElementNode(ma)) {
                o.removeClass(this.selected, 'selectedStorySimple');
                this.selected = ma;
                return this.vert(la);
            }
        }
        if (!ma || x.byClass(ma, 'hidden_elem') || !p.contains(document, ma)) {
            ma = this.findTop();
            if (ma && la < 0)ma = this.getPreviousStory(ma);
            if (this.isHoldoutStory(ma))ma = this.getPreviousStory(ma);
        }
        if (!ma)return;
        this.anim && this.anim.stop();
        var oa = (Date.now() - (this.lastScroll || 0) > 30), pa = this.setFocused.bind(this, ma);
        if (ga()) {
            oa = false;
            pa();
            pa = da;
        }
        this.scrolling = true;
        this.scrollingTimer && window.clearTimeout(this.scrollingTimer);
        var qa = ia;
        if (z.IS_SHOWN)if ((z.BEHAVIOR === 'scrollup' && la < 0) || (z.BEHAVIOR === 'persistent'))qa = ia + z.HEIGHT;
        this.anim = q.scrollTo(ma, oa ? this.getAnimationLength(ma) : 0, false, ba.getViewportDimensions().y - qa - this.getScrollOffset(), 0, function () {
            this.scrollingTimer = window.setTimeout(function () {
                this.scrolling = false;
            }.bind(this), 300);
            var ra = ba.getScrollPosition();
            pa();
            if (ra.distanceTo(ba.getScrollPosition()) !== 0)q.scrollTo(ra, 0);
        }.bind(this));
        this.setSelected(ma, true);
        this.lastScroll = Date.now();
    };
    ka.prototype.isInteractive = function (la) {
        "use strict";
        return ((la.nodeName == 'INPUT') || (la.nodeName == 'BUTTON') || (la.nodeName == 'TEXTAREA') || (la.nodeName == 'A') || !!x.byAttribute(la, 'contenteditable'));
    };
    ka.prototype.setTabindexOnHeadline = function (la, ma) {
        "use strict";
        if (this.isStory(la)) {
            var na = this.getHeadline(la);
            if (na)na.tabIndex = ma;
        }
    };
    ka.prototype.setTabindexOnStory = function (la, ma) {
        "use strict";
        if (this.isStory(la))la.tabIndex = ma;
    };
    ka.prototype.setFocused = function (la) {
        "use strict";
        if (this.isStory(la))t.setWithoutOutline(la);
    };
    e.exports = ka;
}, null);
__d("PageAdsAttachmentLinkShareConstants", [], function (a, b, c, d, e, f) {
    var g = {LINK_ATTACHMENT_CLICK: 'link_attachment_click'};
    e.exports = g;
}, null);
__d("ViewportTracking", ["Arbiter", "AsyncSignal", "Banzai", "BanzaiScuba", "CSS", "cx", "CurrentUser", "DOMDimensions", "Event", "LitestandMessages", "NavigationMessage", "Run", "SubscriptionsHandler", "UserActivity", "Vector", "clickRefAction", "collectDataAttributes", "copyProperties", "debounce", "getElementPosition", "throttle", "CacheStorage", "WebStorage", "bolt/util"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da) {
    var ea = 97, fa = 51, ga = 'vpv', ha = 'incremental_count', ia = 'incremental_key';

    function ja() {
        "use strict";
    }

    ja.prototype.init = function (ka) {
        "use strict";
        this.useBanzai = !!ka.banzai;
        this.conservative_initial_logging = !!ka.conservative_initial_logging;
        this.banzaiNoDelay = !!ka.banzai_no_delay;
        this.banzaiRetry = !!ka.banzai_retry;
        this.useLocalStorage = !!ka.use_local_storage;
        this.useIncrementalCount = !!ka.use_incremental_count;
        this.viewportHeightRatio = ka.viewport_height_ratio ? ka.viewport_height_ratio : .25;
        this.vpvDebug = !!ka.vpv_debug;
        this.logNewFetchStories = !!ka.log_new_fetch_stories;
        this.relaxHeightLimit = !!ka.relax_height_limit;
        this.delayedInitialLogging = !!ka.delayed_initial_logging;
        this.useWaterfallLogging = !!ka.waterfall_logging;
        this.loggedStoryIDs = {};
        this.readStoryIDs = {};
        this.minSizeToBeVisible = 200;
        if (this.relaxHeightLimit) {
            this.minSizeToBeVisible = ka.relaxed_height_limit_config.min_size_visible;
            this.minStoryHeightRatio = ka.relaxed_height_limit_config.min_story_height_ratio;
        }
        this.minFractionToBeVisibleForTimetracking = .5;
        this.minFractionForAdditionalView = 0;
        this.timetrackingThrottlingInterval = 100;
        this.minTimeToReportImmediately = 500;
        this.cachedAllStories = null;
        this.cachedViewportHeight = n.getViewportDimensions().height;
        this.isTimetrackingEnabled = 0;
        this.storyEnteredVPTimestamp = {};
        this.alreadyLoggedDurationStories = [];
        this.userInactiveLock = false;
        this.userActivityPollerTimeoutID = -1;
        this._headLoadStoryCount = 0;
        this.getDataFromConfig(ka);
        this.isLoose = !!ka.is_loose;
        this.maxScrollPosition = 0;
        if (ka.tracking_duration_config) {
            this.timetrackingThrottlingInterval = ka.tracking_duration_config.timetracking_throttling_interval;
            this.userActivityPollingInterval = ka.tracking_duration_config.user_activity_polling_interval;
            this.timeToBeConsideredInactive = ka.tracking_duration_config.time_to_be_considered_inactive;
            this.minFractionToBeVisibleForTimetracking = ka.tracking_duration_config.min_fraction_to_be_visible;
            this.minTimeToReportImmediately = ka.tracking_duration_config.min_time_to_report_immediately;
            this.minFractionForAdditionalView = ka.tracking_duration_config.min_fraction_for_additional_view;
            this.localStorageLogMinDurationMs = ka.tracking_duration_config.local_storage_log_min_duration_ms;
        }
        var la, ma = y(this.fireTimer, this.getTimeout(), this);
        if (this.isLoose) {
            this.minSizeToBeVisible = 0;
            la = aa(function () {
                this.maxScrollPosition = Math.max(this.maxScrollPosition, u.getScrollPosition().y);
                ma();
            }.bind(this));
        } else la = ma;
        if (!ka.scroll_only && !ka.conservative_initial_logging) {
            this.fireTimer();
        } else if (ka.conservative_initial_logging) {
            this.initialStories = this.getStoriesInView();
            this.initialStoriesLogged = false;
        }
        if (this.useWaterfallLogging)this.getStoriesInView().forEach(function (pa) {
            this.waterfallLogStep(pa, '100_all_stories_in_view_ignore_height', true);
        }, this);
        if (this.delayedInitialLogging) {
            var na = ka.initial_logging_config.delay;
            this.vpvDelayedInitialLogging = setTimeout(function () {
                if (!this.initialStoriesLogged) {
                    this.initialStories.forEach(this.markStoryRead, this);
                    this.initialStoriesLogged = true;
                }
            }.bind(this), na);
        }
        this.vpvHeartBeatInterval = ka.vpv_heartbeat_interval;
        this.passVPVHeartbeatGK = ka.use_vpv_heartbeat;
        if (this.passVPVHeartbeatGK) {
            this.intervalCount = 1;
            this.fireTimerCount = 1;
            this.storiesInView = this.initialStories ? this.initialStories : this.getStoriesInView();
            this.vpvHeartBeatIntervalSignal = setInterval(function () {
                this._sendSignal('interval');
            }.bind(this), this.vpvHeartBeatInterval);
        }
        var oa = aa(this.updateTimeTrackingData.bind(this, false), this.timetrackingThrottlingInterval);
        this.subscriptions = new s();
        this.subscriptions.addSubscriptions(this._getScrollListener(la), o.listen(window, 'resize', function () {
            this.cachedViewportHeight = n.getViewportDimensions().height;
            la();
        }.bind(this)), g.subscribe(q.NAVIGATION_BEGIN, this.cleanup.bind(this)), g.subscribe('Stream/totalHeadLoadedStories', function (pa, qa) {
            this._headLoadStoryCount = qa;
        }.bind(this)));
        if (this.logNewFetchStories)this.subscriptions.addSubscriptions(g.subscribe(p.STORIES_INSERTED, function () {
            la();
        }.bind(this)));
        if (this.isTimetrackingEnabled) {
            this.updateTimeTrackingData(false);
            this.subscriptions.addSubscriptions(this._getScrollListener(oa));
            this._userActivityPoller();
        }
        r.onLeave(this.cleanup.bind(this));
    };
    ja.prototype._getScrollListener = function (ka) {
        "use strict";
        return o.listen(window, 'scroll', ka);
    };
    ja.prototype.cleanup = function () {
        "use strict";
        if (this.subscriptions) {
            this.subscriptions.release();
            this.subscriptions = null;
        }
        if (this.isTimetrackingEnabled) {
            clearTimeout(this.userActivityPollerTimeoutID);
            this.updateTimeTrackingData(true);
        }
        if (this.passVPVHeartbeatGK)clearInterval(this.vpvHeartBeatIntervalSignal);
        if (this.delayedInitialLogging)clearTimeout(this.vpvDelayedInitialLogging);
        this.initialStories = [];
        this._headLoadStoryCount = 0;
    };
    ja.prototype.fireTimer = function () {
        "use strict";
        if (this.useWaterfallLogging) {
            var ka = this.getStoriesInViewIgnoreHeight();
            ka.forEach(function (la) {
                this.waterfallLogStep(la, '100_all_stories_in_view_ignore_height');
            }, this);
        }
        if (this.conservative_initial_logging && !this.initialStoriesLogged) {
            this.initialStories.forEach(this.markStoryRead, this);
            this.initialStoriesLogged = true;
        }
        this.storiesInView = this.getStoriesInView();
        this.addSeenClass();
        this.storiesInView.forEach(this.markStoryRead, this);
        if (this.passVPVHeartbeatGK)this._sendSignal('fireTimer');
    };
    ja.prototype.heartBeatIsEnabled = function () {
        "use strict";
        return false;
    };
    ja.prototype.getSessionID = function () {
        "use strict";
        return null;
    };
    ja.prototype._sendSignal = function (ka) {
        "use strict";
        if (!this.heartBeatIsEnabled())return;
        var la = -1;
        if (ka == 'interval') {
            la = this.intervalCount++;
        } else if (ka == 'fireTimer')la = this.fireTimerCount++;
        var ma = -1, na = -1, oa = -1;
        if (this.storiesInView.length > 0) {
            ma = this.getStoryID(this.storiesInView[0]);
            na = this.getQueryID(this.storiesInView[0]);
            oa = this.getFBFeedLocations(this.storiesInView[0]);
        }
        var pa = new j('vpv_heartbeat_js');
        pa.addInteger('qid', na);
        pa.addInteger('uid', m.getID());
        pa.addInteger('firststoryid', ma);
        pa.addInteger('time', Math.round(Date.now() / 1000));
        pa.addNormal('type', ka);
        pa.addInteger('count', la);
        pa.addInteger('fbfeed_location', oa);
        pa.post();
    };
    ja.prototype._userActivityPoller = function () {
        "use strict";
        if (!this.userInactiveLock && !t.isActive(this.timeToBeConsideredInactive)) {
            this.userInactiveLock = true;
            this.updateTimeTrackingData(true);
            t.subscribeOnce(function () {
                this.updateTimeTrackingData(false);
                this.userInactiveLock = false;
            }.bind(this));
        }
        this.userActivityPollerTimeoutID = setTimeout(this._userActivityPoller.bind(this), this.userActivityPollingInterval);
    };
    ja.prototype.getQueryID = function (ka) {
        "use strict";
        return -1;
    };
    ja.prototype.getFBFeedLocations = function (ka) {
        "use strict";
        return -1;
    };
    ja.prototype.addVisibleStoriesTimestamps = function (ka, la) {
        "use strict";
        var ma = {};
        for (var na = 0, oa = ka.length; na < oa; na++) {
            var pa = this.getStoryID(ka[na]);
            ma[pa] = true;
            if (pa in this.storyEnteredVPTimestamp)continue;
            this.storyEnteredVPTimestamp[pa] = {ts: la, story: ka[na]};
        }
        return ma;
    };
    ja.prototype.removeTimestampsOfStoriesNotInView = function (ka, la) {
        "use strict";
        for (var ma in this.storyEnteredVPTimestamp)if (!(ma in ka)) {
            this.recordTimeStoryWasInView(this.storyEnteredVPTimestamp[ma].story, this.storyEnteredVPTimestamp[ma].ts, la);
            delete this.storyEnteredVPTimestamp[ma];
        }
    };
    ja.prototype.updateTimeTrackingData = function (ka) {
        "use strict";
        if (!this.storyEnteredVPTimestamp)this.storyEnteredVPTimestamp = {};
        var la = Date.now(), ma = {}, na;
        if (!ka)ma = this.getAllStoriesInView();
        na = this.addVisibleStoriesTimestamps(ma, la);
        this.removeTimestampsOfStoriesNotInView(na, la);
    };
    ja.prototype.getStoriesInView = function () {
        "use strict";
        var ka = this.getAllStories(), la = [], ma = false;
        for (var na = 0; na < ka.length; na++) {
            var oa = ka[na], pa = this.getStoryID(oa);
            if (this.hasBeenVisible(pa))continue;
            if (this.isVisible(oa)) {
                if (oa.getAttribute('data-insertion-position') === null)oa.setAttribute('data-insertion-position', na - this._headLoadStoryCount);
                la.push(oa);
                ma = true;
            } else if (ma)break;
        }
        return la;
    };
    ja.prototype.getStoriesInViewIgnoreHeight = function () {
        "use strict";
        var ka = this.getAllStories(), la = false, ma = [];
        for (var na = 0; na < ka.length; na++) {
            var oa = ka[na];
            if (this.isVisible(oa, false, 0)) {
                ma.push(oa);
                la = true;
            } else if (la)break;
        }
        return ma;
    };
    ja.prototype.getAllStoriesFromCache = function () {
        "use strict";
        if (this.cachedAllStories === null)this.cachedAllStories = this.getAllStories();
        return this.cachedAllStories;
    };
    ja.prototype.invalidateAllStoriesCache = function () {
        "use strict";
        this.cachedAllStories = null;
    };
    ja.prototype.getAllStoriesInView = function () {
        "use strict";
        var ka = this.getAllStoriesFromCache(), la = [], ma = false, na = 0, oa = ka.length, pa = 1;
        if (this._indexOfLastVisibleStoryOnPreviousPass > oa / 2) {
            na = oa - 1;
            oa = -1;
            pa = -pa;
        }
        for (var qa = na; qa != oa; qa += pa) {
            var ra = ka[qa];
            if (this.isVisible(ra, false, this.minFractionToBeVisibleForTimetracking * n.getElementDimensions(ra).height)) {
                if (ra.getAttribute('data-insertion-position') === null)ra.setAttribute('data-insertion-position', qa - this._headLoadStoryCount);
                la.push(ra);
                ma = true;
            } else if (ma) {
                this._indexOfLastVisibleStoryOnPreviousPass = qa - pa;
                break;
            }
        }
        for (qa = this.alreadyLoggedDurationStories.length - 1; qa >= 0; qa--) {
            ra = this.alreadyLoggedDurationStories[qa];
            if (!this.isVisible(ra, false, this.minFractionForAdditionalView * n.getElementDimensions(ra).height))this.alreadyLoggedDurationStories.splice(qa, 1);
        }
        return la;
    };
    ja.prototype.getTimetrackingDataToLog = function (ka, la, ma) {
        "use strict";
        var na = {evt: ea, vpvd_start_timestamp: la, vpvd_time_delta: ma - la, story_height: n.getElementDimensions(ka).height, viewport_height: this.cachedViewportHeight};
        return {ft: na};
    };
    ja.prototype.markStoryReadInLocalStorage = function (ka) {
        "use strict";
        if (this.useLocalStorage) {
            var la = 'vpv_local_log.' + parseInt(Date.now() / 1000 / 3600, 10) + 'h', ma = new ba('localstorage', la);
            ma.set(ka, 1);
        }
    };
    ja.prototype.recordTimeStoryWasInView = function (ka, la, ma) {
        "use strict";
        if (this.isTimetrackingEnabled) {
            if (this.alreadyLoggedDurationStories.indexOf(ka) > -1) {
                return;
            } else this.alreadyLoggedDurationStories.push(ka);
            var na = this.getTimetrackingDataToLog(ka, la, ma), oa = w(ka, ['ft']);
            x(na.ft, oa.ft);
            var pa = !!oa.ft.ei && (na.ft.vpvd_time_delta > this.minTimeToReportImmediately);
            delete na.ei;
            this.sendDataToLog(ka, na, pa, false);
            if (this.useLocalStorage && na.ft.vpvd_time_delta > this.localStorageLogMinDurationMs) {
                var qa = this.getStoryID(ka);
                this.markStoryReadInLocalStorage(qa);
            }
        }
    };
    ja.prototype.hasBeenVisible = function (ka) {
        "use strict";
        return ka in this.readStoryIDs;
    };
    ja.prototype.isVisible = function (ka, la, ma) {
        "use strict";
        if (typeof la === "undefined")la = this.isLoose;
        if (typeof ma === "undefined")ma = this.minSizeToBeVisible;
        var na = u.getScrollPosition().y, oa = n.getViewportDimensions().height, pa = z(ka), qa = n.getElementDimensions(ka), ra = oa + this.maxScrollPosition - na;
        if (!pa.x && !pa.y && !qa.x && !qa.y)return false;
        if (la && pa.y < ra)return true;
        var sa = Math.max(pa.y, 0), ta = Math.min(pa.y + qa.height, oa), ua;
        if (this.relaxHeightLimit) {
            ua = Math.min(qa.height * this.minStoryHeightRatio, ma);
        } else ua = Math.min(qa.height, ma);
        return (ta - sa) >= ua;
    };
    ja.prototype.getHeightInViewport = function (ka) {
        "use strict";
        var la = n.getViewportDimensions().height, ma = z(ka), na = n.getElementDimensions(ka);
        if (!ma.x && !ma.y && !na.x && !na.y)return false;
        var oa = Math.max(ma.y, 0), pa = Math.min(ma.y + na.height, la);
        return pa - oa;
    };
    ja.prototype.getIncrementalVpvCnt = function () {
        "use strict";
        var ka = ca.getLocalStorage(), la = 0;
        if (!ka)return 0;
        var ma = 'vpv_local_log.' + ha, na = 'vpv_local_log.' + ia;
        if (ka.getItem(ma))la = parseInt(ka.getItem(ma), 10);
        if (la === 0)ka.setItem(na, da.generateUUID());
        ka.setItem(ma, la + 1);
        return la;
    };
    ja.prototype.getIncrementalVpvKey = function () {
        "use strict";
        var ka = ca.getLocalStorage(), la = 'vpv_local_log.' + ia;
        if (!ka || !ka.getItem(la))return '';
        return ka.getItem(la);
    };
    ja.prototype.sendDataToLog = function (ka, la, ma, na) {
        "use strict";
        if (this.useBanzai) {
            var oa = {};
            if (ma)oa.delay = 3000;
            if (na)oa.retry = true;
            if (this.useIncrementalCount && la.ft && la.ft.evt == fa) {
                la.ft.incrementalVpvCnt = this.getIncrementalVpvCnt();
                la.ft.incrementalVpvKey = this.getIncrementalVpvKey();
            }
            var pa = this.getSessionID();
            if (pa)la.ft.session_id = pa;
            if (this.useWaterfallLogging && la.ft.evt == fa) {
                la.ft.should_waterfall_logging = 1;
                var qa = !this.initialStoriesLogged;
                this.waterfallLogStep(ka, '200_sent_to_banzai', qa);
            }
            i.post('feed_tracking', la, oa);
        } else v(ga, ka, null, 'FORCE', la);
    };
    ja.prototype.waterfallLogStep = function (ka, la, ma) {
        "use strict";
        var na = this.getWaterfallData(ka, la, ma), oa = this.getStoryID(ka);
        if (this.loggedStoryIDs[la] && this.loggedStoryIDs[la][oa])return;
        new h('/ajax/feed/feed_tracking/vpv_waterfall_logging', na).send();
        if (!this.loggedStoryIDs[la])this.loggedStoryIDs[la] = {};
        this.loggedStoryIDs[la][oa] = true;
    };
    ja.prototype.getWaterfallData = function (ka, la, ma) {
        "use strict";
        var na = this.getDataToLog(ka), oa = w(ka, ['ft']);
        x(na.ft, oa.ft);
        na.ft.height_in_viewport = this.getHeightInViewport(ka);
        na.ft.step = la;
        na.ft.is_initial_story = 0;
        if (ma)na.ft.is_initial_story = 1;
        return na.ft;
    };
    ja.prototype.addSeenClass = function () {
        "use strict";
        var ka = this.getAllStories(), la = n.getViewportDimensions().height * this.viewportHeightRatio;
        for (var ma = 0; ma < ka.length; ma++) {
            var na = ka[ma], oa = this.getStoryID(na), pa = z(na);
            if (oa && pa.y + pa.height < la && this.hasBeenVisible(oa) && (k.hasClass(na, "_50mx") || k.hasClass(na, "_2z-5"))) {
                k.addClass(na, "_50nb");
                k.removeClass(na, "_50mx");
                k.removeClass(na, "_2z-5");
            }
        }
    };
    ja.prototype.markStoryRead = function (ka) {
        "use strict";
        var la = this.getStoryID(ka);
        if (!la || this.hasBeenVisible(la))return;
        this.readStoryIDs[la] = true;
        var ma = this.getDataToLog(ka), na = w(ka, ['ft']);
        x(ma.ft, na.ft);
        delete ma.ei;
        this.markStoryReadInLocalStorage(la);
        this.sendDataToLog(ka, ma, this.banzaiNoDelay, this.banzaiRetry);
        k.addClass(ka, "_x72");
        if (this.vpvDebug)k.addClass(ka, "_5m7s");
    };
    e.exports = ja;
}, null);
__d("GroupViewportTracking", ["DOM", "csx", "ViewportTracking", "Banzai", "$"], function (a, b, c, d, e, f, g, h, i, j, k) {
    for (var l in i)if (i.hasOwnProperty(l))n[l] = i[l];
    var m = i === null ? null : i.prototype;
    n.prototype = Object.create(m);
    n.prototype.constructor = n;
    n.__superConstructor__ = i;
    function n() {
        "use strict";
        if (i !== null)i.apply(this, arguments);
    }

    n.prototype.getDataFromConfig = function (o) {
        "use strict";
        this.timeout = o.record_delay;
    };
    n.prototype.getTimeout = function () {
        "use strict";
        return this.timeout;
    };
    n.prototype.getAllStories = function () {
        "use strict";
        return g.scry(k('pagelet_group_mall'), "._5pat");
    };
    n.prototype.getStoryID = function (o) {
        "use strict";
        var p = JSON.parse(o.getAttribute('data-ft'));
        return p.id;
    };
    n.prototype.getDataToLog = function (o) {
        "use strict";
        return JSON.parse(o.getAttribute('data-ft'));
    };
    n.prototype.sendDataToLog = function (o, p) {
        "use strict";
        if (this.useBanzai)j.post('group_feed_tracking', p);
    };
    e.exports.init = function (o) {
        n.instance = new n();
        n.instance.init(o);
    };
    e.exports.getInstance = function () {
        return n.instance;
    };
}, null);
__d("LitestandViewportHeight", ["Arbiter", "CSS", "Event", "cx", "debounce", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m, n = {SMALL: 'small', NORMAL: 'normal', LARGE: 'large', getSize: function () {
        if (m === "_4vcw")return n.SMALL;
        if (m === "_4vcx")return n.LARGE;
        return n.NORMAL;
    }, init: function (o) {
        n.init = l;
        var p = k(function () {
            var q = document.documentElement, r = q.clientHeight, s;
            if (r <= o.max_small_height) {
                s = "_4vcw";
            } else if (r >= o.min_large_height)s = "_4vcx";
            if (s !== m) {
                m && h.removeClass(q, m);
                m = s;
                m && h.addClass(q, m);
                g.inform('ViewportSizeChange');
            }
        });
        p();
        i.listen(window, 'resize', p);
    }};
    e.exports = n;
}, null);
__d("runAfterScrollingStops", ["Arbiter", "Event", "Run", "debounceAcrossTransitions", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(w, x, y) {
        if (x && o[x])return;
        if (!n) {
            g.subscribe('page_transition', v);
            n = true;
        }
        if (!m) {
            w();
            return;
        }
        x && (o[x] = 1);
        p.push(w);
        if (!y) {
            if (r) {
                i.onLeave(v);
                r = false;
            }
            q.push(p.length - 1);
        }
    }

    var m, n, o = {}, p = [], q = [], r = true, s = 500, t = j(function () {
        m = false;
        var w = p;
        p = [];
        q = [];
        o = {};
        for (var x = 0, y = w.length; x < y; ++x)w[x]();
    }, s);

    function u() {
        m = true;
        t();
    }

    function v() {
        var w = q;
        q = [];
        r = true;
        for (var x = 0, y = w.length; x < y; ++x)p[w[x]] = k;
    }

    h.listen(window, 'scroll', u);
    e.exports = l;
}, null);
__d("LitestandOffscreenController", ["Arbiter", "CSS", "DOM", "Event", "LitestandViewportHeight", "NavigationMessage", "Parent", "Run", "Style", "SubscriptionsHandler", "Vector", "cx", "csx", "queryThenMutateDOM", "runAfterScrollingStops", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    var w = 1, x = 9, y = 7, z = 10, aa = {}, ba = false, ca, da, ea, fa, ga = [];

    function ha() {
        ca && ca.release();
        ca = null;
        ba = false;
    }

    function ia() {
        aa = {};
        ga = [];
    }

    function ja() {
        for (var va in aa) {
            var wa = aa[va];
            if (wa.hidden)wa.dirty = true;
        }
    }

    function ka() {
        if (h.hasClass(document.body, "body._5vb_")) {
            return z;
        } else if (k.getSize() === k.SMALL)return y;
        return x;
    }

    function la() {
        fa = fa || q.getViewportDimensions().y;
        da = q.getScrollPosition().y;
        ea = da + fa;
        if (w) {
            da -= fa * w;
            ea += fa * w;
        }
        for (var va in aa) {
            var wa = aa[va];
            wa.position = q.getElementPosition(wa.element).y;
            if (!wa.hidden)wa.height = wa.element.offsetHeight;
        }
    }

    function ma() {
        var va = [];
        for (var wa in aa) {
            var xa = aa[wa], ya = xa.position, za = ya + xa.height < da, ab = ya > ea;
            if (!xa.hidden && (za || ab)) {
                na(xa);
            } else if (!za && !ab) {
                xa.pendingHide = false;
                if (xa.hidden) {
                    if (xa.dirty && ya < da) {
                        va.push(wa);
                        h.addClass(oa(xa), "_49nu");
                    } else o.apply(xa.element, {height: '', marginBottom: ''});
                    h.show(oa(xa));
                    xa.dirty = false;
                    xa.hidden = false;
                }
            }
        }
        if (!va.length)return;
        var bb = 0;
        t(function () {
            for (var cb = 0, db = va.length; cb < db; cb++) {
                var eb = aa[va[cb]];
                bb += eb.height - oa(eb).offsetHeight + o.getFloat(eb.element, 'marginBottom');
            }
        }, function () {
            for (var cb = 0, db = va.length; cb < db; cb++) {
                var eb = aa[va[cb]];
                h.removeClass(oa(eb), "_49nu");
                o.apply(eb.element, {height: '', marginBottom: ''});
            }
            bb && (document.body.scrollTop -= bb);
        });
    }

    function na(va) {
        if (!va.pendingHide) {
            ga.push(va);
            va.pendingHide = true;
        }
    }

    function oa(va) {
        if (va.wrapperElement)return va.wrapperElement;
        var wa = va.element;
        if (wa.firstElementChild)return (va.wrapperElement = wa.firstElementChild);
        for (var xa = 0; xa < wa.childNodes.length; xa++)if (wa.childNodes[xa].tagName)return (va.wrapperElement = wa.childNodes[xa]);
    }

    function pa() {
        var va = ka() + 'px';
        for (var wa = 0; wa < ga.length; wa++) {
            var xa = ga[wa];
            if (i.scry(xa.element, "._52fb").length)xa.pendingHide = false;
            if (xa && xa.element && xa.pendingHide && !xa.hidden) {
                o.apply(xa.element, {height: xa.height + 'px', marginBottom: va});
                h.hide(oa(xa));
                xa.hidden = true;
                xa.pendingHide = false;
            }
        }
        ga = [];
    }

    function qa() {
        u(pa, 'LitestandOffscreenController/hide');
        t(la, ma, 'LitestandOffscreenController');
    }

    function ra(va, wa) {
        var xa = m.byClass(wa.story, "_4ikz");
        if (!xa)return;
        xa = aa[i.getID(xa)];
        if (xa && xa.hidden)xa.dirty = true;
    }

    function sa(va, wa) {
        var xa = false;
        wa.forEach(function (ya) {
            var za = aa[ya];
            if (za && za.hidden) {
                za.dirty = true;
                xa = true;
                if (za.position >= da) {
                    za.hidden = false;
                    za.pendingHide = false;
                    o.apply(za.element, {height: '', marginBottom: ''});
                    h.show(oa(za));
                }
            }
        });
        xa && ma();
    }

    function ta() {
        n.onLeave(ha);
        ca = new p();
        ca.addSubscriptions(g.subscribe(l.NAVIGATION_BEGIN, ia), g.subscribe('Entstream/StoryUpdated', ra), g.subscribe('ViewportSizeChange', ja), g.subscribe('LitestandStream/SubstreamsUpdated', sa), j.listen(window, 'scroll', v(qa)), j.listen(window, 'resize', v(function () {
            fa = null;
            qa();
        })));
        ba = true;
    }

    var ua = {attachSubstream: function (va) {
        ba || ta();
        aa[i.getID(va)] = {element: va};
    }};
    e.exports = ua;
}, null);
__d("LitestandComposerBase", ["Animation", "Arbiter", "ComposerXController", "ComposerXMarauderLogger", "DOM", "Run", "SubscriptionsHandler", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = 600;

    function p(q) {
        this._composerID = q;
        this._subscriptions = new m();
        this.init();
    }

    n(p.prototype, {init: function () {
        this._subscriptions.addSubscriptions(h.subscribe('LitestandComposer/publish', function (q, r) {
            if (r.composer_id === this._composerID)this.liveInsertComposerStory(this._composerID, r.markup);
        }.bind(this)));
        l.onLeave(this._cleanup.bind(this));
    }, _cleanup: function () {
        this._subscriptions && this._subscriptions.release();
        this._subscriptions = null;
    }, liveInsertComposerStory: function (q, r) {
        q && i.reset(q);
        if (!r)return;
        k.prependContent(this.getStreamRoot(), r);
        new g(r).from('opacity', 0).to('opacity', 1).duration(o).go();
        j.logCompleted(q);
    }, getStreamRoot: function () {
    }});
    e.exports = p;
}, null);
__d("LitestandComposer", ["Arbiter", "LitestandComposerBase", "LitestandStream"], function (a, b, c, d, e, f, g, h, i) {
    for (var j in h)if (h.hasOwnProperty(j))l[j] = h[j];
    var k = h === null ? null : h.prototype;
    l.prototype = Object.create(k);
    l.prototype.constructor = l;
    l.__superConstructor__ = h;
    function l() {
        "use strict";
        if (h !== null)h.apply(this, arguments);
    }

    l.prototype.init = function () {
        "use strict";
        k.init.call(this);
        this._subscriptions.addSubscriptions(g.subscribe('LitestandComposer/globalPublish', function (m, n) {
            if (n.top_news_id === i.getSectionID())this.liveInsertComposerStory(null, n.markup);
        }.bind(this)));
    };
    l.prototype.getStreamRoot = function () {
        "use strict";
        return i.getStreamRoot();
    };
    l.initComposer = function (m) {
        "use strict";
        new l(m);
    };
    e.exports = l;
}, null);
__d("LitestandNewStoryController", ["Animation", "Arbiter", "AsyncRequest", "EntstreamStoryDeduper", "LitestandMessages", "LitestandStream", "Style", "$", "queryThenMutateDOM"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = 500, q = 600, r, s;

    function t() {
        s && clearTimeout(s);
        s = null;
    }

    function u() {
        s = setTimeout(function () {
            s = null;
            v();
        }, p);
    }

    function v() {
        var y;
        o(function () {
            y = l.canInsertNewerStories();
        }, function () {
            if (y) {
                w();
            } else u();
        }, 'LitestandNewStoryController/tryShowingStories');
    }

    function w() {
        t();
        if (!r)return;
        j.dedupe(l.getStreamRoot(), l.getStoriesSelector());
        m.apply(r, {height: '', left: '', overflow: '', position: '', width: ''});
        new g(r).from('opacity', 0).to('opacity', 1).duration(q).go();
        h.inform(k.STORIES_INSERTED);
        h.inform(k.NEWER_STORIES_INSERTED);
        setTimeout(function () {
            h.inform('reflow');
        }, 0);
        new i().setURI('/ajax/litestand/update_filter_viewtime').setData({section_id: l.getSectionID()}).send();
        r = null;
    }

    var x = {waitForDisplay: function (y) {
        if (!r)r = n(y);
        if (l.canInsertNewerStories()) {
            w();
        } else u();
    }, showStoriesFromPill: function (y) {
        r = y;
        w();
    }};
    e.exports = x;
}, null);
__d("TrackingData", [], function (a, b, c, d, e, f) {
    var g = 'mei', h = 'ei', i = 'cmf', j = {hasAdToken: function (k) {
        var l = k.getAttribute('data-ft') ? JSON.parse(k.getAttribute('data-ft')) : null;
        return l && (l[g] || l[h]);
    }, setContinueMainFeed: function (k) {
        var l = k.getAttribute('data-ft') ? JSON.parse(k.getAttribute('data-ft')) : null;
        if (l) {
            l[i] = 1;
            k.setAttribute('data-ft', JSON.stringify(l));
        }
    }};
    e.exports = j;
}, null);
__d("LitestandStreamLoader", ["Arbiter", "AsyncRequest", "CSS", "csx", "cx", "DOM", "DOMScroll", "Event", "FbFeedHighlight", "JSXDOM", "LitestandMessages", "LitestandNewStoryController", "LitestandOffscreenController", "LitestandStream", "NavigationMessage", "OnVisible", "Run", "throttle", "UIPagelet", "UserActivity", "EntstreamStoryDeduper", "$", "copyProperties", "ge", "getUnboundedScrollPosition", "Vector", "Parent", "TrackingData"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha) {
    var ia = false, ja = false, ka = {}, la, ma, na, oa, pa, qa, ra = 0, sa = false, ta, ua = null, va, wa = [], xa = false, ya = false, za, ab, bb = false, cb = true, db, eb = false, fb = false, gb = 1000, hb = null, ib = false, jb = 50, kb = 0, lb, mb;

    function nb() {
        w.onLeave(pb);
        wa = [g.subscribe(q.PILL_VISIBILITY_UPDATED, function (ic, jc) {
            sa = jc.pill_visibility;
        }), g.subscribe(q.NEW_STORIES_PILL_CLICKED, function () {
            r.showStoriesFromPill(mb);
        }), g.subscribe(u.NAVIGATION_BEGIN, pb), g.subscribe(q.NEWER_STORIES_INSERTED, function () {
            mb = null;
        }), g.subscribe(q.TOUR_BEGIN, function () {
            ia = true;
        }), g.subscribe(q.TOUR_END, function () {
            ia = false;
            tb();
        }), g.subscribe(q.UPDATE_STREAM, zb), g.subscribe(q.REFRESH_STREAM, zb), g.subscribe(q.UNREAD_ONLY_BEGIN, function (ic, jc) {
            ib = true;
            var kc = ob(), lc = l.scry(za, ".unseenStoriesHeader")[0], mc = [];
            if (lc && kc) {
                xa = true;
                var nc = l.scry(qa, t.getStoriesSelector()).slice(jc + 1), oc = nc.length, pc = nc.filter(function (zc) {
                    return i.hasClass(zc, "_50mx") && !i.hasClass(zc, "_x72") && !ha.hasAdToken(zc);
                }), qc = pc.length, rc = db.min_stories_to_skip;
                if (nc.length - pc.length < rc)pc = pc.slice(0, nc.length - pc.length - rc);
                var sc = pc.length, tc = -1, uc = {};
                if (db.move_skipped_unseen) {
                    var vc = p.div({className: "moved_stories"});
                    pc.forEach(function (zc) {
                        var ad = ga.byClass(zc, "_4ikz");
                        uc[l.getID(ad)] = 1;
                        l.appendContent(vc, zc);
                    });
                    g.inform('LitestandStream/SubstreamsUpdated', Object.keys(uc));
                    l.insertAfter(lc, vc);
                    tc = l.scry(za, ".moved_stories ._5jmm").length;
                }
                mc = l.scry(za, t.getStoriesSelector());
                l.insertBefore(kc, za);
                i.show(za);
                mc.forEach(function (zc) {
                    i.show(zc);
                    o.highlight(zc);
                });
                aa.dedupeHide(t.getStreamRoot(), t.getStoriesSelector(), bb);
                g.inform(q.STORIES_INSERTED);
                setTimeout(function () {
                    m.scrollTo(lc, 800, false, false, 10);
                }, 0);
                qb();
                var wc = mc[0], xc = JSON.parse(wc.getAttribute('data-ft')), yc = xc.qid;
                rb('load', {all_unseen_stories: mc.length, qid: yc, main_feed_stories_skip: oc, unseen_stories_skipped: qc, unseen_stories_eligible_to_move: sc, unseen_stories_moved: tc});
            } else {
                if (!lc)rb('missed_stories_header_unavailable');
                if (!mc[0])rb('missed_stories_unseen_stories_unavailable');
                if (!kc)rb('missed_stories_more_pager_unavailable');
            }
        })];
        ja = true;
    }

    function ob() {
        if (ma.parentNode)return ma.parentNode;
        if (!qa)return;
        var ic = qa.children.length - 1;
        while (ic >= 0) {
            if (qa.children[ic].id.lastIndexOf('more_pager', 0) === 0)return qa.children[ic];
            ic--;
        }
        return;
    }

    function pb() {
        g.inform(q.LEAVE_HOME);
        ka = {};
        va = null;
        ra = 0;
        wa.forEach(g.unsubscribe);
        wa = [];
        la && la.remove();
        pa && clearTimeout(pa);
        pa = null;
        oa = null;
        mb = null;
        ta && ta.remove();
        ta = null;
        ja = false;
        kb = 0;
        ua && ua.remove();
        ua = null;
        xa = false;
        ya = false;
        fb = false;
        za = null;
        ab = null;
        bb = false;
        cb = true;
        db = null;
        eb = false;
        ib = false;
        hb = null;
    }

    function qb() {
        ka = {};
    }

    function rb(ic, jc) {
        var kc = -1, lc = -1, mc = -1, nc = l.scry(qa, ".unread_session"), oc = 0, pc = 0, qc = null;
        for (var rc = 0; rc < nc.length; ++rc) {
            var sc = l.scry(nc[rc], t.getStoriesSelector());
            for (var tc = 0; tc < sc.length; ++tc) {
                var uc = sc[tc];
                if (!uc.getAttribute('data-dedupekey'))continue;
                ++pc;
                if (i.shown(uc)) {
                    ++oc;
                    qc = uc;
                }
            }
        }
        lc = oc - 1;
        if (qc) {
            var vc = JSON.parse(qc.getAttribute('data-ft'));
            kc = vc.qid;
            mc = vc.mf_story_key;
        }
        var wc = {qid: kc, finish_pos: lc, storyid: mc, feed_stream_id: t.getFeedStreamID(), all_unseen_stories: pc, num_unseen_sessions: nc.length};
        jc = typeof jc !== 'undefined' ? jc : {};
        for (var xc in wc)if (typeof jc[xc] === 'undefined')jc[xc] = wc[xc];
        jc.action = ic;
        new h('/ajax/feed/pill/').setData(jc).send();
    }

    function sb() {
        if (pa)return;
        pa = setTimeout(function () {
            pa = null;
            ac();
        }, va.pollIntervalMS);
    }

    function tb() {
        if (va && oa && va.pollIntervalMS && va.pollIntervalMS > 1000)sb();
    }

    function ub() {
        la = new v(l.find(ma, 'a'), fc.bind(null), false, va.bufferPixels);
    }

    function vb() {
        var ic = ea(window).y;
        return ic > va.firstPagerScrollBuffer;
    }

    function wb() {
        if (vb()) {
            ub();
            ta && ta.remove();
            ta = null;
        }
    }

    function xb() {
        if (ib || !hb)return;
        var ic = l.scry(qa, t.getStoriesSelector()), jc = ba('leftCol'), kc = fa.getElementPosition(jc).y + fa.getElementDimensions(jc).y, lc = 0;
        for (; lc < ic.length; lc++)if (!i.hasClass(ic[lc], "_2l4l") && ic[lc].getAttribute('data-ft'))break;
        while (lc < ic.length && fa.getElementPosition(ic[lc]).y < kc + jb)lc++;
        if (ic.length === lc)return;
        var mc = ic[lc], nc = hb.getElement();
        l.insertBefore(mc, nc);
        i.show(nc);
        hb.reflow();
        ib = true;
    }

    function yb(ic) {
        xb();
        var jc = l.find(ma, 'a');
        n.listen(jc, 'click', function (event) {
            fc();
            ta && ta.remove();
            ta = null;
            event.preventDefault();
        });
        var kc = t.getVisibleStoryCount(qa), lc = va.maxStories;
        if (lc && kc >= lc)return;
        if (ic && !vb()) {
            ta = n.listen(window, 'scroll', x(wb));
        } else ub();
    }

    function zb() {
        ac();
        g.inform(q.UPDATE_LAST_REFRESH_TIME);
    }

    function ac() {
        if (ia || !oa)return;
        if (!z.isActive(va.newStoryIdleTime)) {
            z.subscribeOnce(ac);
            return;
        }
        if (!t.canInsertNewerStories()) {
            sb();
            return;
        }
        if (!mb) {
            var ic = t.getStreamRoot();
            mb = p.div({style: {height: 0, width: ic.offsetWidth + 'px', left: '-10000px', opacity: 0, overflow: 'hidden', position: 'absolute'}});
            l.prependContent(ic, mb);
        }
        if (!ua)ua = n.listen(window, 'scroll', function () {
            if (t.canInsertNewerStories() != sa)g.inform(q.TOGGLE_PILL_VISIBILITY);
        });
        var jc = p.div(null);
        l.prependContent(mb, jc);
        var kc = va.crossPage ? {crossPage: true} : null;
        y.loadFromEndpoint('LitestandNewerStoriesPagelet', jc, ca(oa, {cursor: lb, containerID: l.getID(mb)}), kc);
        g.inform(q.PILL_CLEAR_COUNTER);
    }

    function bc() {
        var ic = l.getID(ma);
        i.addClass(ma, 'async_saving');
        var jc = dc();
        if (ka[jc])throw new Error('This cursor has been used before, stories will be ' + 'repeated. Cursor: ' + jc);
        ka[jc] = jc;
        var kc = {cursor: jc, preload_next_cursor: ab, pager_config: na, pager_id: ic, scroll_count: ++ra, start_unread_session: xa, start_continue_top_news_feed: ya, feed_stream_id: t.getFeedStreamID(), snapshot_time: db ? db.snapshot_time : null};
        xa = false;
        ya = false;
        y.loadFromEndpoint(va.pagerController, l.getID(qa), kc, {append: true, automatic: true, usePipe: true, crossPage: va.crossPage});
    }

    function cc() {
        return ec()[0].getAttribute('data-cursor');
    }

    function dc() {
        var ic = ec();
        ic = ic.filter(function (jc) {
            return !jc.getAttribute('data-preload_unseen_story');
        });
        return ic[ic.length - 1].getAttribute('data-cursor');
    }

    function ec() {
        var ic = l.scry(qa, t.getStoriesSelector());
        return ic.filter(function (jc) {
            return jc.getAttribute('data-cursor');
        });
    }

    function fc() {
        g.inform('FbFeedUnreadPillNavigation/startLoading');
        bc();
        la && la.remove();
        la = null;
    }

    function gc() {
        if (!za || !ja)return [];
        var ic = l.scry(qa, t.getStoriesSelector()), jc = ic.filter(function (mc) {
            return mc.getAttribute('data-dedupekey') && !i.hasClass(mc, "preloadUnseenStory");
        }), kc = {};
        for (var lc = 0; lc < jc.length; lc++)kc[jc[lc].getAttribute('data-dedupekey')] = 1;
        return l.scry(za, t.getStoriesSelector()).filter(function (mc) {
            var nc = mc.getAttribute('data-dedupekey'), oc = nc && !kc[nc];
            kc[nc] = 1;
            return oc;
        });
    }

    var hc = {register: function (ic, jc, kc, lc, mc) {
        ja || nb();
        va = t.getStreamConfig(jc);
        xa = false;
        ya = false;
        fb = false;
        za = null;
        ab = null;
        bb = false;
        cb = true;
        db = null;
        eb = false;
        na = kc;
        qa = ba(ic);
        lb = cc();
        hb = mc;
        ib = false;
        ma = lc;
        yb(true);
        tb();
    }, replacePagerConfig: function (ic) {
        na = ic;
    }, continueTopNewsFeed: function () {
        ya = true;
        fb = true;
        qb();
        rb('finish');
    }, removeOldPager: function (ic, jc) {
        if (ic)l.remove(ba(ic));
        i.show(ba(jc));
    }, removeLoadingIndicator: function (ic, jc) {
        var kc = da(ic);
        if (kc)l.remove(kc);
        i.show(jc);
    }, moreStoriesInserted: function (ic) {
        g.inform(q.STORIES_INSERTED, {substream_id: ic});
        var jc = ba(ic);
        if (fb)l.scry(jc, t.getStoriesSelector()).forEach(ha.setContinueMainFeed);
        if (t.hideOffscreenSubstreams())s.attachSubstream(jc);
    }, attachNewPager: function (ic) {
        !eb && aa.dedupeHide(t.getStreamRoot(), t.getStoriesSelector(), bb);
        this.loadMoreUnseenStoriesIfNeeded();
        ma = ic;
        ma && yb(false);
    }, setPollerData: function (ic) {
        if (ic) {
            oa = ic;
            tb();
        }
    }, updatePollerCursor: function (ic) {
        lb = ic;
        tb();
    }, headLoadCompleted: function (ic) {
        lb = ic.newCursor;
        tb();
        var jc = ic.stories;
        if (jc && jc.length > 0) {
            for (var kc = jc.length - 1; kc >= 0; kc--)jc[kc].setAttribute('data-insertion-position', --kb);
            g.inform('Stream/totalHeadLoadedStories', -kb);
        }
    }, registerPreloadUnseenStories: function (ic, jc, kc, lc) {
        za = ic;
        ab = jc;
        bb = kc;
        db = lc;
        if (lc)eb = lc.disable_deduper;
        hc.loadMoreUnseenStoriesIfNeeded();
    }, morePreloadUnseenStories: function (ic, jc, kc) {
        ab = kc;
        if (ic > 0) {
            l.appendContent(za, jc);
            this.loadMoreUnseenStoriesIfNeeded();
        } else {
            g.inform('FbFeedUnreadPillLoader/removeLoadingPill');
            g.inform('FbFeedUnreadPillNavigation/removePill');
            cb = true;
            rb('not_enough_remove', {all_unseen_stories: ic});
        }
    }, setStopRecursiveUnseenLoad: function (ic) {
        cb = ic;
    }, loadMoreUnseenStoriesIfNeeded: function () {
        if (!db || cb)return;
        var ic = gc();
        if (ic.length < db.min_num) {
            if (!za || db.disable_recursive) {
                g.inform('FbFeedUnreadPillNavigation/removePill');
                cb = true;
                return;
            }
            y.loadFromEndpoint('LitestandUnseenStreamPagelet', za, {unread_pill_config: db, next_cursor: ab, mode: 1}, {append: true, automatic: true, usePipe: true, crossPage: va.crossPage});
        } else {
            g.inform('FbFeedUnreadPillNavigation/enoughLoaded');
            if (db.disable_recursive)cb = true;
        }
    }, forceNewFetch: ac};
    e.exports = hc;
}, null);
__d("recordTNTreeData", ["collectSubtreeData"], function (a, b, c, d, e, f, g) {
    function h(i, j) {
        var k = {}, l = g(i, ['ft']);
        for (var m in l.ft) {
            k[m + '_tree'] = l.ft[m];
            if (m === 'tn-debug')i.setAttribute('tn-debug_subtree', l.ft[m]);
        }
        k.evt_value = i.offsetHeight;
        if (j)k.offset = Math.max(0, i.offsetTop - j.offsetTop);
        return k;
    }

    e.exports = h;
}, null);
__d("StoryTopicMap", [], function (a, b, c, d, e, f) {
    var g = {}, h = {registerTopics: function (i, j) {
        g[i] = j;
    }, getTopicsForFTID: function (i) {
        return g[i] || [];
    }};
    e.exports = h;
}, null);
__d("XFeedAdsChainingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/feed\/ads_chaining\/", {actor_id: {type: "String", required: true}, ft_id: {type: "String"}, origin: {type: "String", required: true}, ei: {type: "String", required: true}, data_ownerid: {type: "String", required: true}});
}, null);
__d("XPubcontentFeedChainingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/pubcontent\/feed_chaining\/", {actor_id: {type: "String", required: true}, content_id: {type: "String"}, ft_id: {type: "String"}, origin: {type: "String", required: true}});
}, null);
__d("XPubcontentRelatedShareChainingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/pubcontent\/related_share\/", {attachment_div_id: {type: "String", required: true}, global_share_id: {type: "Int", required: true}, video_div_id: {type: "String"}, link_url: {type: "String"}, qid: {type: "String"}, mf_story_key: {type: "String"}, share_id: {type: "String"}, is_auto_expand: {type: "Bool"}});
}, null);
__d("XPubcontentRelatedVideoChainingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/pubcontent\/related_video\/", {attachment_div_id: {type: "String", required: true}, fbvideo_id: {type: "Int"}, qid: {type: "String"}, mf_story_key: {type: "String"}});
}, null);
__d("XPubcontentTopicChainingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/pubcontent\/topic_chaining\/", {pivotal_topic_ids: {type: "IntVector"}});
}, null);
__d("XPubcontentInlineStoryPivotChainingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/pubcontent\/inline_story_pivot_chaining\/", {origin: {type: "String", required: true}, storyid: {type: "String"}, ftid: {type: "String"}});
}, null);
__d("XRelatedGamesChainingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/games\/async\/related_games\/", {attachment_div_id: {type: "String", required: true}, app_id: {type: "Int", required: true}});
}, null);
__d("PubcontentFeedChainingController", ["AggregatedLinkComposerConfig", "Arbiter", "AsyncRequest", "AttachmentRelatedShareConstants", "CSS", "csx", "cx", "DOM", "DOMQuery", "FeedAdsChainingConfig", "PageAdsAttachmentLinkShareConstants", "PageLikeButton", "PubcontentFeedChainingConfig", "PubcontentRelatedShareChainingConfig", "PubcontentTopicChainingConfig", "StoryInlinePivotChainingConfig", "StoryTopicMap", "UFIFeedbackTargets", "UFIUIEvents", "XFeedAdsChainingControllerURIBuilder", "XPubcontentFeedChainingControllerURIBuilder", "XPubcontentRelatedShareChainingControllerURIBuilder", "XPubcontentRelatedVideoChainingControllerURIBuilder", "XPubcontentTopicChainingControllerURIBuilder", "XPubcontentInlineStoryPivotChainingControllerURIBuilder", "XRelatedGamesChainingControllerURIBuilder"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa) {
    var ga = 'ei', ha = 'ad_fan_page_action', ia = 'ad_like_page_post_action', ja = 'ad_share_attachment_click_action', ka = 'page_story_like_action', la = 'related_share_article_click', ma = 'related_share_video_click', na = 'page_share_like_action', oa = 'topic_story_like_action', pa = 'story_click_for_pivot_action', qa = 'story_like_pivot_action';

    function ra() {
        "use strict";
        this.$PubcontentFeedChainingController0 = s;
        this.$PubcontentFeedChainingController1 = p;
        this.$PubcontentFeedChainingController2 = t;
        this.$PubcontentFeedChainingController3 = u;
        this.$PubcontentFeedChainingController4 = v;
        this.$PubcontentFeedChainingController5 = {};
        h.subscribe(r.LIKED, this.$PubcontentFeedChainingController6.bind(this));
        h.subscribe(y.UFIActionLinkLike, this.$PubcontentFeedChainingController7.bind(this));
        h.subscribe(j.ARTICLE_CLICK, this.$PubcontentFeedChainingController8.bind(this));
        h.subscribe(j.VIDEO_CLICK, this.$PubcontentFeedChainingController9.bind(this));
        h.subscribe(j.FBVIDEO_CLICK, this.$PubcontentFeedChainingControllera.bind(this));
        h.subscribe(j.GAME_CLICK, this.$PubcontentFeedChainingControllerb.bind(this));
        h.subscribe(q.LINK_ATTACHMENT_CLICK, this.$PubcontentFeedChainingControllerc.bind(this));
        h.subscribe(j.PHOTO_CLICK, this.$PubcontentFeedChainingControllerd.bind(this));
        ra.instance = this;
    }

    ra.getAdClientTokenIndex = function () {
        "use strict";
        return ga;
    };
    ra.prototype.$PubcontentFeedChainingController6 = function (sa, ta) {
        "use strict";
        var ua = this.findAdClientToken(ta.target);
        if (ua) {
            this.$PubcontentFeedChainingControllere(ta.target, {origin: ha, actor_id: ta.profile_id, client_token: ua});
        } else this.$PubcontentFeedChainingControllerf(ta.target, {origin: ta.origin, actor_id: ta.profile_id});
    };
    ra.prototype.$PubcontentFeedChainingController7 = function (sa, ta) {
        "use strict";
        if (!ta.ft_id)return;
        if (!this.$PubcontentFeedChainingControllerg(this.findStory(ta.target)))return;
        x.getFeedbackTarget(ta.ft_id, function (ua, va) {
            var wa = this.findAdClientToken(ua);
            if (wa && va.isshare) {
                this.$PubcontentFeedChainingControllere(ua, {actor_id: va.actorid, origin: ia, ft_id: va.entidentifier, client_token: wa});
            } else if (va.isownerpage) {
                this.$PubcontentFeedChainingControllerf(ua, {actor_id: va.actorid, content_id: va.entidentifier, origin: ka});
            } else if (va.isshare) {
                this.$PubcontentFeedChainingControllerf(ua, {actor_id: va.actorid, ft_id: va.entidentifier, origin: na});
            } else {
                var xa = w.getTopicsForFTID(va.entidentifier);
                if (xa && xa.length > 0) {
                    this.$PubcontentFeedChainingControllerh(ua, {ft_id: va.entidentifier, origin: oa, pivotal_topic_ids: xa});
                } else this.$PubcontentFeedChainingControlleri(ua, {origin: qa, ft_id: va.entidentifier});
            }
        }.bind(this, ta.target));
    };
    ra.prototype.$PubcontentFeedChainingControlleri = function (sa, ta) {
        "use strict";
        var ua = this.$PubcontentFeedChainingControllerj(sa, ta);
        if (!ua)return false;
        var va = (new ea()).setString('origin', ta.origin);
        if (ta.story_id)va.setString('storyid', String(ta.story_id));
        if (ta.ft_id)va.setString('ftid', String(ta.ft_id));
        new i().setErrorHandler(this.$PubcontentFeedChainingControllerk.bind(this, ua.story.id)).setRelativeTo(ua.chainingWrapper).setURI(va.getURI()).setAllowCrossPageTransition(true).send();
        return true;
    };
    ra.prototype.$PubcontentFeedChainingControllerd = function (sa, ta) {
        "use strict";
        var ua = this;
        ua.$PubcontentFeedChainingControlleri(ta.attachment, {origin: pa, story_id: ta.storyid});
    };
    ra.prototype.$PubcontentFeedChainingController8 = function (sa, ta) {
        "use strict";
        if (g.no_chained_related_stories === 'true')return;
        ta.origin = la;
        var ua = this, va = this.findStory(ta.attachment), wa = o.scry(o.getRootElement(), '#initial_browse_result').length > 0;
        if (wa)return;
        var xa;
        if (ta.is_right_click) {
            xa = 0;
        } else xa = j.EVENT_DELAY;
        setTimeout(function () {
            if (va) {
                var ya = ua.findAttachment(va);
                if (ya)ta.attachment = ya;
            }
            ua.$PubcontentFeedChainingControllerl(ta.attachment, ta);
        }, xa);
    };
    ra.prototype.$PubcontentFeedChainingController9 = function (sa, ta) {
        "use strict";
        ta.origin = ma;
        var ua = this, va = this.findStory(ta.attachment);
        setTimeout(function () {
            if (va) {
                var wa = ua.findAttachment(va);
                if (wa)ta.attachment = wa;
            }
            ua.$PubcontentFeedChainingControllerl(ta.attachment, ta);
        }, j.EVENT_DELAY);
    };
    ra.prototype.$PubcontentFeedChainingControllera = function (sa, ta) {
        "use strict";
        ta.origin = ma;
        var ua = this, va = this.findStory(ta.attachment);
        setTimeout(function () {
            if (va) {
                var wa = ua.findAttachment(va);
                if (wa)ta.attachment = wa;
            }
            ua.$PubcontentFeedChainingControllerl(ta.attachment, ta);
        }, j.EVENT_DELAY);
    };
    ra.prototype.$PubcontentFeedChainingControllerb = function (sa, ta) {
        "use strict";
        var ua = this, va = this.findStory(ta.attachment);
        setTimeout(function () {
            if (va)var wa = ua.findContainer(va);
            ua.$PubcontentFeedChainingControllerm(va, ta.global_share_id, n.getID(wa));
        }, j.EVENT_DELAY);
    };
    ra.prototype.$PubcontentFeedChainingControllerc = function (sa, ta) {
        "use strict";
        var ua = this.findAdClientToken(ta.attachment);
        if (ua) {
            ta.origin = ja;
            ta.client_token = ua;
            this.$PubcontentFeedChainingControllere(ta.attachment, ta);
        }
    };
    ra.prototype.$PubcontentFeedChainingControllern = function (sa) {
        "use strict";
        return !!(sa && sa.id && !k.hasClass(sa, "_sf6") && !(sa.id in this.$PubcontentFeedChainingController5));
    };
    ra.prototype.$PubcontentFeedChainingControllero = function (sa) {
        "use strict";
        if (!sa)return false;
        if (sa.origin in this.$PubcontentFeedChainingController0 || sa.origin in this.$PubcontentFeedChainingController2 || sa.origin in this.$PubcontentFeedChainingController1 || sa.origin in this.$PubcontentFeedChainingController4) {
            return true;
        } else {
            var ta = this.$PubcontentFeedChainingController3[sa.origin];
            if (!ta || !ta.rate)return false;
            var ua = Math.random();
            if (ua > ta.rate)return false;
            return true;
        }
    };
    ra.prototype.$PubcontentFeedChainingControllerp = function (sa) {
        "use strict";
        this.$PubcontentFeedChainingController5[sa] = true;
    };
    ra.prototype.$PubcontentFeedChainingControllerk = function (sa) {
        "use strict";
        delete this.$PubcontentFeedChainingController5[sa];
    };
    ra.prototype.$PubcontentFeedChainingControllerg = function (sa) {
        "use strict";
        if (!sa)return false;
        var ta = "_2bex", ua = sa.nextSibling;
        if (ua && ua.firstChild) {
            var va = ua.firstChild;
            return !(va.hasChildNodes() && k.hasClass(va, ta));
        }
        return true;
    };
    ra.prototype.$PubcontentFeedChainingControllerj = function (sa, ta) {
        "use strict";
        var ua = this.findStory(sa);
        if (!this.$PubcontentFeedChainingControllern(ua))return null;
        if (!this.$PubcontentFeedChainingControllero(ta))return null;
        this.$PubcontentFeedChainingControllerp(ua.id);
        if (this.isSponsoredStory(ua))return null;
        var va;
        if (!ta.continued_chaining) {
            va = this.findContainer(ua);
            if (!va)return null;
            var wa = n.create('div'), xa = n.appendContent(va, wa);
            if (xa.length !== 1)return null;
        } else {
            va = ua;
            wa = n.create('div');
            xa = n.insertAfter(va, wa);
            n.remove(va);
            if (xa.length !== 1)return null;
        }
        if (ta.is_auto_expand) {
            return {chainingWrapper: xa[0], story: ua, is_auto_expand: ta.is_auto_expand};
        } else return {chainingWrapper: xa[0], story: ua};
    };
    ra.prototype.$PubcontentFeedChainingControllere = function (sa, ta) {
        "use strict";
        var ua = this.$PubcontentFeedChainingControllerj(sa, ta);
        if (!ua)return false;
        var va = this.findStreamRoot(ua.story);
        if (!va)return false;
        var wa = va.getAttribute('id'), xa = (new z()).setString('actor_id', ta.actor_id).setString('origin', ta.origin).setString('ei', ta.client_token).setString('data_ownerid', wa);
        if (ta.ft_id)xa.setString('ft_id', ta.ft_id);
        new i().setErrorHandler(this.$PubcontentFeedChainingControllerk.bind(this, ua.story.id)).setRelativeTo(ua.chainingWrapper).setURI(xa.getURI()).send();
        return true;
    };
    ra.prototype.$PubcontentFeedChainingControllerl = function (sa, ta) {
        "use strict";
        if (!this.$PubcontentFeedChainingControllerg(this.findStory(sa)))return false;
        var ua = this.$PubcontentFeedChainingControllerj(sa, ta);
        if (!ua)return false;
        k.addClass(ua.chainingWrapper, "_2bex");
        var va = o.scry(sa, "^._5ss6");
        if (va.length > 0)k.addClass(ua.chainingWrapper, "_33mi");
        var wa = null;
        if (ta.fbvideo_id) {
            wa = new ca();
            wa.setInt('fbvideo_id', ta.fbvideo_id);
        } else {
            wa = new ba();
            wa.setInt('global_share_id', ta.global_share_id);
        }
        wa.setString('attachment_div_id', n.getID(ta.attachment));
        if (ta.link_url)wa.setString('link_url', ta.link_url);
        if (ta.video_div_id)wa.setString('video_div_id', ta.video_div_id);
        if (ta.share_id)wa.setString('share_id', ta.share_id);
        var xa = JSON.parse(ua.story.getAttribute('data-ft')) || {};
        if ('qid' in xa && 'mf_story_key' in xa) {
            wa.setString('qid', xa.qid);
            wa.setString('mf_story_key', xa.mf_story_key);
        }
        if (ta.is_auto_expand) {
            this.$PubcontentFeedChainingControllerk(ua.story.id);
            wa.setBool('is_auto_expand', ta.is_auto_expand);
        }
        var ya = new i().setErrorHandler(this.$PubcontentFeedChainingControllerk.bind(this, ua.story.id)).setRelativeTo(ua.chainingWrapper).setURI(wa.getURI());
        xa && ya.setData(xa);
        ya.send();
        return true;
    };
    ra.prototype.$PubcontentFeedChainingControllerm = function (sa, ta, ua) {
        "use strict";
        if (!this.$PubcontentFeedChainingControllern(sa))return;
        this.$PubcontentFeedChainingControllerp(sa.id);
        var va = (new fa()).setInt('app_id', ta).setString('attachment_div_id', ua);
        new i().setErrorHandler(this.$PubcontentFeedChainingControllerk.bind(this, sa.id)).setURI(va.getURI()).send();
        return true;
    };
    ra.prototype.$PubcontentFeedChainingControllerf = function (sa, ta) {
        "use strict";
        var ua = this.$PubcontentFeedChainingControllerj(sa, ta);
        if (!ua)return false;
        var va = (new aa()).setString('actor_id', ta.actor_id).setString('origin', ta.origin);
        if (ta.ft_id)va.setString('ft_id', ta.ft_id);
        if (ta.content_id)va.setString('content_id', ta.content_id);
        new i().setErrorHandler(this.$PubcontentFeedChainingControllerk.bind(this, ua.story.id)).setRelativeTo(ua.chainingWrapper).setURI(va.getURI()).send();
        return true;
    };
    ra.prototype.$PubcontentFeedChainingControllerh = function (sa, ta) {
        "use strict";
        var ua = this.$PubcontentFeedChainingControllerj(sa, ta);
        if (!ua)return false;
        var va = (new da()).setIntVector('pivotal_topic_ids', ta.pivotal_topic_ids).getURI();
        new i().setErrorHandler(this.$PubcontentFeedChainingControllerk.bind(this, ua.story.id)).setRelativeTo(ua.chainingWrapper).setURI(va).send();
        return true;
    };
    e.exports = ra;
}, null);
__d("PubcontentLitestandClassicChainingController", ["ContextualThing", "DOM", "PubcontentFeedChainingController", "csx"], function (a, b, c, d, e, f, g, h, i, j) {
    for (var k in i)if (i.hasOwnProperty(k))m[k] = i[k];
    var l = i === null ? null : i.prototype;
    m.prototype = Object.create(l);
    m.prototype.constructor = m;
    m.__superConstructor__ = i;
    function m() {
        "use strict";
        if (i !== null)i.apply(this, arguments);
    }

    m.prototype.findStory = function (n) {
        "use strict";
        var o = "^div._4-u2", p = h.scry(n, o);
        return p.length === 1 ? p[0] : null;
    };
    m.prototype.isSponsoredStory = function (n) {
        "use strict";
        var o = "._5paw";
        return h.scry(n, o).length > 0;
    };
    m.prototype.findAttachment = function (n) {
        "use strict";
        var o = "div._6m2", p = "div.iframeEmbed", q = h.scry(n, o)[0] || h.scry(n, p)[0];
        return q;
    };
    m.prototype.findContainer = function (n) {
        "use strict";
        var o = h.create('div'), p = h.insertAfter(n, o);
        g.register(o, n);
        return p.length >= 1 ? p[0] : null;
    };
    m.prototype.findStreamRoot = function (n) {
        "use strict";
        var o = "^div._4ikz";
        return h.scry(n, o)[0];
    };
    m.prototype.findAdClientToken = function (n) {
        "use strict";
        var o = this.findStory(n);
        if (!o)return null;
        var p = o.getAttribute('data-ft');
        if (!p)return null;
        var q = JSON.parse(p);
        return q[i.getAdClientTokenIndex()];
    };
    e.exports = m;
    new m();
}, null);
__d("StoryPositionTracking", ["DOM", "LitestandStream", "csx", "ge"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = 0;

    function l(o, p) {
        var q = JSON.parse(o.getAttribute('data-ft'));
        q.insertion_position = p;
        o.setAttribute('data-ft', JSON.stringify(q));
    }

    function m(o) {
        return g.scry(o, "._5jmm");
    }

    var n = {registerNewStories: function (o) {
        if (o == 'substream_0')k = 0;
        var p = m(j(o)), q = p.length;
        for (var r = 0; r < q; r++)l(p[r], k++);
    }, updateAllStories: function () {
        var o = m(h.getStreamRoot()), p = o.length;
        k = 0;
        for (var q = 0; q < p; q++)l(o[q], k++);
    }};
    e.exports = n;
}, null);
__d("StreamViewportTracking", ["DOM", "DOMDimensions", "ViewportTracking", "ge", "recordTNTreeData"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = 51;
    for (var m in i)if (i.hasOwnProperty(m))o[m] = i[m];
    var n = i === null ? null : i.prototype;
    o.prototype = Object.create(n);
    o.prototype.constructor = o;
    o.__superConstructor__ = i;
    function o() {
        "use strict";
        if (i !== null)i.apply(this, arguments);
    }

    o.prototype.init = function (p, q) {
        "use strict";
        if (q)this.$StreamViewportTracking0 = q;
        n.init.call(this, p);
        this.initSubscriptions();
    };
    o.prototype.initSubscriptions = function () {
        "use strict";
    };
    o.prototype.getDataFromConfig = function (p) {
        "use strict";
        this.recordTNTree = p.record_tn_tree;
        this.timeout = p.record_delay;
        this.isTimetrackingEnabled = !!p.is_timetracking_enabled;
    };
    o.prototype.getTimeout = function () {
        "use strict";
        return this.timeout;
    };
    o.prototype.getStorySelector = function () {
        "use strict";
        return '.uiStreamStory';
    };
    o.prototype.getAllStories = function () {
        "use strict";
        var p = g.scry(this.getStream(), this.getStorySelector());
        return p.filter(function (q) {
            return q.getAttribute('data-ft');
        });
    };
    o.prototype.getStoryID = function (p) {
        "use strict";
        var q = JSON.parse(p.getAttribute('data-ft'));
        return q.mf_story_key;
    };
    o.prototype.getQueryID = function (p) {
        "use strict";
        var q = JSON.parse(p.getAttribute('data-ft'));
        return q.qid;
    };
    o.prototype.getFBFeedLocations = function (p) {
        "use strict";
        var q = JSON.parse(p.getAttribute('data-ft'));
        return q.fbfeed_location;
    };
    o.prototype.getDataToLog = function (p) {
        "use strict";
        var q = {};
        if (this.recordTNTree) {
            var r = this.getStream();
            q = k(p, r);
            var s = p.getAttribute('data-insertion-position');
            if (s !== null)q.inspos = s;
        }
        q.evt = l;
        q.vpv_time = Math.round(Date.now() / 1000);
        var t = g.scry(p, ".fbStoryAttachmentImage")[0];
        if (t) {
            var u = h.getElementDimensions(t);
            q.story_image_height = u.height;
            q.story_image_width = u.width;
        }
        return {ft: q};
    };
    o.prototype.getStream = function () {
        "use strict";
        if (this.$StreamViewportTracking0)return this.$StreamViewportTracking0;
        return j('home_stream');
    };
    o.prototype.heartBeatIsEnabled = function () {
        "use strict";
        return true;
    };
    o.init = function (p, q) {
        "use strict";
        o.instance = new o();
        o.instance.init(p, q);
    };
    o.getInstance = function () {
        "use strict";
        return o.instance;
    };
    e.exports = o;
}, null);
__d("FbFeedKeyboardController", ["CSS", "DOM", "DOMQuery", "FeedBaseKeyboardController", "Focus", "JSXDOM", "Parent", "FbFeedHighlight", "csx", "cx", "ge", "getActiveElement"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    function s(x) {
        if (x.previousElementSibling)return x.previousElementSibling;
        x = x.previousSibling;
        while (x && !h.isElementNode(x))x = x.previousSibling;
        return x || null;
    }

    function t(x) {
        if (x.nextElementSibling)return x.nextElementSibling;
        x = x.nextSibling;
        while (x && !h.isElementNode(x))x = x.nextSibling;
        return x || null;
    }

    for (var u in j)if (j.hasOwnProperty(u))w[u] = j[u];
    var v = j === null ? null : j.prototype;
    w.prototype = Object.create(v);
    w.prototype.constructor = w;
    w.__superConstructor__ = j;
    function w() {
        "use strict";
        if (j !== null)j.apply(this, arguments);
    }

    w.prototype.getStories = function (x) {
        "use strict";
        return h.scry(x || this.root, "._5jmm");
    };
    w.prototype.isHoldoutStory = function (x) {
        "use strict";
        return !!x && g.hasClass(x, 'holdoutAdStory');
    };
    w.prototype.isRelevantStory = function (x) {
        "use strict";
        return i.isElementNode(x) && !this.isHoldoutStory(x);
    };
    w.prototype.isStory = function (x) {
        "use strict";
        return g.hasClass(x, "_5jmm");
    };
    w.prototype.clickLike = function () {
        "use strict";
        this.click('.UFILikeLink');
        var x = this.getParentStory(r());
        if (x) {
            var y = h.scry(x, '.UFILikeLink');
            for (var z = 0; z < y.length; z++)if (!g.hasClass(y[z], 'accessible_elem'))k.setWithoutOutline(y[z]);
        }
    };
    w.prototype.clickComment = function () {
        "use strict";
        this.click('.comment_link');
    };
    w.prototype.clickShare = function () {
        "use strict";
        this.click('.share_action_link');
    };
    w.prototype.clickSeeMore = function () {
        "use strict";
        this.click('.see_more_link');
    };
    w.prototype.clickLeft = function () {
        "use strict";
        this.click("._1mri");
    };
    w.prototype.clickRight = function () {
        "use strict";
        this.click("._2fu-");
    };
    w.prototype.openAttachment = function () {
        "use strict";
        this.click("._5dec", "a._52c6", "._4-eo", '.uiVideoThumb');
    };
    w.prototype.getHeadline = function (x) {
        "use strict";
        return i.scry(x, "h5._5pbw")[0];
    };
    w.prototype.getPreviousSibling = function (x) {
        "use strict";
        var y = s(x);
        if (y && this.getParentStory(y))return y;
        y = null;
        var z = m.byClass(x, "_5pcb");
        if (z) {
            var aa = h.scry(z, "._5jmm"), ba = aa.indexOf(x);
            while (ba > -1) {
                if (ba === 0) {
                    y = q('pagelet_composer');
                    y = y && m.byClass(y, "_5jmm");
                } else if (ba > 0) {
                    y = aa[ba - 1];
                    if (y.offsetHeight > 0)break;
                }
                ba--;
            }
        }
        return y || this.selected;
    };
    w.prototype.getPreviousStory = function (x) {
        "use strict";
        var y = this.getPreviousSibling(x);
        while (y && !this.isStory(y))y = this.getPreviousSibling(y);
        return y;
    };
    w.prototype.getParentStory = function (x) {
        "use strict";
        return m.byClass(x, "_5jmm");
    };
    w.prototype.getNextSibling = function (x) {
        "use strict";
        var y = t(x);
        if (y && this.getParentStory(y))return y;
        y = null;
        var z = m.byClass(x, "_5pcb");
        if (z) {
            var aa = h.scry(z, "._5jmm"), ba = aa.indexOf(x);
            if (ba > -1) {
                y = aa[++ba];
                while (y && y.offsetHeight === 0)y = aa[++ba];
            }
        } else if (q('pagelet_composer', x))y = h.scry(document, "div._5pcb ._5jmm")[0];
        return y || this.selected;
    };
    w.prototype.getNextStory = function (x) {
        "use strict";
        var y = this.getNextSibling(x);
        while (y && !this.isStory(y))y = this.getNextSibling(y);
        return y;
    };
    w.prototype.setSelected = function (x, y) {
        "use strict";
        if (x) {
            var z = "_5qdu", aa = i.scry(x, "._5qdu");
            if (!aa.length && y)h.prependContent(x, l.div({className: z}));
        }
        if (y) {
            this.selected && this.setTabindexOnStory(this.selected, '-1');
            this.selected && g.removeClass(this.selected, "_5qdv");
            this.selected = x;
            x && this.setTabindexOnStory(x, '0');
            x && g.addClass(x, "_5qdv");
            n.highlightSingle(x);
        }
    };
    w.init = function (x) {
        "use strict";
        new w(x);
    };
    e.exports = w;
}, null);
__d("FbFeedViewportTracking", ["Arbiter", "LitestandMessages", "LitestandStream", "StreamViewportTracking", "csx"], function (a, b, c, d, e, f, g, h, i, j, k) {
    for (var l in j)if (j.hasOwnProperty(l))n[l] = j[l];
    var m = j === null ? null : j.prototype;
    n.prototype = Object.create(m);
    n.prototype.constructor = n;
    n.__superConstructor__ = j;
    function n() {
        "use strict";
        if (j !== null)j.apply(this, arguments);
    }

    n.prototype.initSubscriptions = function () {
        "use strict";
        this.subscriptions.addSubscriptions(g.subscribe([h.STORIES_INSERTED], this.invalidateAllStoriesCache.bind(this)), g.subscribe(h.LEAVE_HOME, this.updateTimeTrackingData.bind(this, true)));
    };
    n.prototype.getStorySelector = function () {
        "use strict";
        return "._5jmm";
    };
    n.prototype.getStream = function () {
        "use strict";
        return i.getStreamRoot();
    };
    n.prototype.getSessionID = function () {
        "use strict";
        return i.getFeedStreamID();
    };
    n.init = function (o) {
        "use strict";
        new n().init(o);
    };
    e.exports = n;
}, null);