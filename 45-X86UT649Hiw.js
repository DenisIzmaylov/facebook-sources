/*!CK:2566211910!*//*1411964857,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["pOVe5"]);
}

__d("ComposedBlockType", [], function (a, b, c, d, e, f) {
    e.exports = {UNSTYLED: 0, PARAGRAPH: 1, UNORDERED_LIST_ITEM: 2, ORDERED_LIST_ITEM: 3, BLOCKQUOTE: 4, HEADER_ONE: 5, HEADER_TWO: 6, CODE: 7, MEDIA: 8};
}, null);
__d("ComposedEntityMutability", [], function (a, b, c, d, e, f) {
    e.exports = {MUTABLE: 0, IMMUTABLE: 1, SEGMENTED: 2};
}, null);
__d("ComposedEntityType", [], function (a, b, c, d, e, f) {
    e.exports = {MENTION: 0, LINK: 1, IMAGE: 2, VIDEO: 3};
}, null);
__d("ComposedInlineStyle", [], function (a, b, c, d, e, f) {
    e.exports = {NONE: 0, BOLD: 1, ITALIC: 2, UNDERLINE: 4, CODE: 8};
}, null);
__d("checkRangeOverlap", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(i, j, k, l) {
        g(i <= j && k <= l);
        return (i < l && j > k);
    }

    e.exports = h;
}, null);
__d("fillArray", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        var j = new Array(h);
        for (var k = 0; k < h; k++)j[k] = i;
        return j;
    }

    e.exports = g;
}, null);
__d("DocumentCommands", ["keyMirror"], function (a, b, c, d, e, f, g) {
    var h = g({UNDO: true, REDO: true, DELETE: true, DELETE_WORD: true, DELETE_TO_END_OF_BLOCK: true, BACKSPACE: true, BACKSPACE_WORD: true, BACKSPACE_TO_END_OF_BLOCK: true, BOLD: true, ITALIC: true, UNDERLINE: true, CODE: true, INSERT_BLOCK_DELIMITER: true, TRANSPOSE_CHARACTERS: true, MOVE_SELECTION_TO_START_OF_BLOCK: true, MOVE_SELECTION_TO_END_OF_BLOCK: true});
    e.exports = h;
}, null);
__d("DocumentCharacters", [], function (a, b, c, d, e, f) {
    var g = {BLOCK_DELIMITER: '\u000D', SOFT_NEWLINE: '\u000A', PHOTO: '\ud83d\udcf7', VIDEO: '\ud83d\udcf9'};
    e.exports = g;
}, null);
__d("DocumentRemovalDirection", [], function (a, b, c, d, e, f) {
    var g = {BACKWARD: 0, FORWARD: 1};
    e.exports = g;
}, null);
__d("DocumentCompositeDecorator.Experimental", ["fillArray"], function (a, b, c, d, e, f, g) {
    var h = '.';

    function i(l) {
        "use strict";
        this.$DocumentCompositeDecorator0 = l.slice();
    }

    i.prototype.getDecorations = function (l) {
        "use strict";
        var m = g(l.getText().length, null);
        this.$DocumentCompositeDecorator0.forEach(function (n, o) {
            var p = 0, q = n.getStrategy();
            q(l, function (r, s) {
                if (j(m, r, s)) {
                    k(m, r, s, o + h + p);
                    p++;
                }
            });
        });
        return m;
    };
    i.prototype.getComponentForKey = function (l) {
        "use strict";
        var m = parseInt(l.split(h), 10);
        return this.$DocumentCompositeDecorator0[m].getComponent();
    };
    i.prototype.getPropsForKey = function (l) {
        "use strict";
        var m = parseInt(l.split(h), 10);
        return this.$DocumentCompositeDecorator0[m].getProps();
    };
    function j(l, m, n) {
        for (var o = m; o < n; o++)if (l[o] != null)return false;
        return true;
    }

    function k(l, m, n, o) {
        for (var p = m; p < n; p++)l[p] = o;
    }

    e.exports = i;
}, null);
__d("DocumentDecorator", [], function (a, b, c, d, e, f) {
    function g(h, i, j) {
        "use strict";
        this.$DocumentDecorator0 = h;
        this.$DocumentDecorator1 = i;
        this.$DocumentDecorator2 = j || {};
    }

    g.prototype.getStrategy = function () {
        "use strict";
        return this.$DocumentDecorator0;
    };
    g.prototype.getComponent = function () {
        "use strict";
        return this.$DocumentDecorator1;
    };
    g.prototype.getProps = function () {
        "use strict";
        return this.$DocumentDecorator2;
    };
    e.exports = g;
}, null);
__d("DocumentEntityInstance", ["ComposedEntityMutability", "ComposedEntityType", "arrayContains", "getObjectValues", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = j(h), m = j(g);

    function n(o, p, q) {
        "use strict";
        k(i(l, o));
        k(i(m, p));
        this.$DocumentEntityInstance0 = o;
        this.$DocumentEntityInstance1 = p;
        this.$DocumentEntityInstance2 = q;
    }

    n.prototype.getType = function () {
        "use strict";
        return this.$DocumentEntityInstance0;
    };
    n.prototype.getMutability = function () {
        "use strict";
        return this.$DocumentEntityInstance1;
    };
    n.prototype.getData = function () {
        "use strict";
        return this.$DocumentEntityInstance2;
    };
    n.prototype.replaceData = function (o) {
        "use strict";
        this.$DocumentEntityInstance2 = o;
    };
    e.exports = n;
}, null);
__d("DocumentEntity", ["DocumentEntityInstance", "invariant"], function (a, b, c, d, e, f, g, h) {
    var i = {}, j = 0, k = {create: function (l, m, n) {
        return k.add(new g(l, m, n));
    }, add: function (l) {
        i[++j] = l;
        return j.toString();
    }, get: function (l) {
        var m = i[l];
        h(!!m);
        return m;
    }};
    e.exports = k;
}, null);
__d("DocumentEntitySegmentsExperimental", ["DocumentRemovalDirection"], function (a, b, c, d, e, f, g) {
    var h = g.FORWARD, i = {getRemovalRange: function (j, k, l, m, n) {
        var o = l.split(' ');
        o = o.map(function (y, z) {
            if (n === h) {
                if (z > 0)return ' ' + y;
            } else if (z < o.length - 1)return y + ' ';
            return y;
        });
        var p = m, q, r, s = null, t = null;
        for (var u = 0; u < o.length; u++) {
            r = o[u];
            q = p + r.length;
            if (j < q && p < k) {
                if (s !== null) {
                    t = q;
                } else {
                    s = p;
                    t = q;
                }
            } else if (s !== null)break;
            p = q;
        }
        var v = m + l.length, w = s === m, x = t === v;
        if ((!w && x) || (w && !x))if (n === h) {
            if (t !== v)t++;
        } else if (s !== m)s--;
        return {start: s, end: t};
    }};
    e.exports = i;
}, null);
__d("ContentBlock", ["ImmutableObject", "invariant", "keyMirror"], function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j = i({KEY: true, TYPE: true, TEXT: true, INLINE_STYLES: true, ENTITIES: true});
    k.create = function (m) {
        return new k(new g(l(m)));
    };
    k.set = function (m, n) {
        return new k(g.set(m.getImmutable(), l(n)));
    };
    k.prototype.getKey = function () {
        return this.$ContentBlock0[j.KEY];
    };
    k.prototype.getType = function () {
        return this.$ContentBlock0[j.TYPE];
    };
    k.prototype.getText = function () {
        return this.$ContentBlock0[j.TEXT];
    };
    k.prototype.getLength = function () {
        return this.getText().length;
    };
    k.prototype.getInlineStyles = function () {
        return this.$ContentBlock0[j.INLINE_STYLES];
    };
    k.prototype.getEntities = function () {
        return this.$ContentBlock0[j.ENTITIES];
    };
    function k(m) {
        this.$ContentBlock0 = m;
    }

    k.prototype.getImmutable = function () {
        return this.$ContentBlock0;
    };
    function l(m) {
        var n = m, o = n.key, p = n.type, q = n.text, r = n.inlineStyles, s = n.entities, t = {};
        if (o !== undefined) {
            h(typeof o === 'string');
            t[j.KEY] = o;
        }
        if (p !== undefined) {
            h(typeof p === 'number');
            t[j.TYPE] = p;
        }
        if (q !== undefined) {
            h(typeof q === 'string');
            t[j.TEXT] = q;
        }
        if (r !== undefined) {
            h(Array.isArray(r));
            t[j.INLINE_STYLES] = r;
        }
        if (s !== undefined) {
            h(Array.isArray(s));
            t[j.ENTITIES] = s;
        }
        return t;
    }

    e.exports = k;
}, null);
__d("ImmutableMap", ["Immutable", "emptyFunction", "invariant", "keyOf"], function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    var k = j({_DONT_EVER_TYPE_THIS_SECRET_KEY: null}), l = '__size_DoNotEverTouchThis', m = '__keyByIndexDoNotEverTouchThis', n = '__indexByKeyDoNotEverTouchThis';

    function o(v) {
        var w = isNaN(+v) || (v.substring && v.substring(0, 1) === '.'), x = v === m || v === n || v === l;
        return !x && typeof v === 'string' && v !== '' && w;
    }

    function p(v, w, x) {
        i(typeof v === 'number' && typeof w === 'number' && w >= 0 && v >= 0 && v + w <= x);
    }

    function q(v) {
        return v instanceof g && v.hasOwnProperty(l);
    }

    function r(v) {
        i(q(v));
    }

    function s(v) {
        return v === l || v === m || v === n;
    }

    function t(v, w, x, y) {
        var z = {enumerable: false, configurable: true, writable: true, value: w}, aa = {enumerable: false, configurable: true, writable: true, value: x}, ba = {enumerable: false, configurable: true, writable: true, value: y};
        Object.defineProperty(v, l, z);
        Object.defineProperty(v, m, aa);
        Object.defineProperty(v, n, ba);
    }

    var u = {create: function () {
        var v = new g(g[k]), w = u.mergeAndValidateAllPropertiesInto(v, arguments);
        t(v, w, [], {});
        v[m].areComputed = false;
        return v;
    }, mergeAndValidateAllPropertiesInto: function (v, w) {
        var x = w.length, y = 0;
        for (var z = 0; z < x; z++) {
            var aa = w[z];
            for (var ba in aa) {
                if (!aa.hasOwnProperty(ba) || q(aa) && s(ba))continue;
                if (!v.hasOwnProperty(ba)) {
                    i(o(ba));
                    y++;
                }
                var ca = aa[ba];
                i(ca !== undefined);
                v[ba] = ca;
            }
        }
        return y;
    }, customDeepFreezeRootNode: function (v) {
        r(v);
        Object.freeze(v);
        for (var w in v) {
            if (!v.hasOwnProperty(w) || s(w))continue;
            g.recurseDeepFreeze(v[w]);
        }
        Object.seal(v);
    }, set: function (v, w) {
        r(v);
        i(w instanceof g || (typeof w === 'object' && w !== undefined && !Array.isArray(w)));
        return u.create(v, w);
    }, fromArray: function (v, w) {
        var x = Array.isArray(v), y = typeof w === 'function';
        i(x);
        i(y);
        var z = new g(g[k]), aa = [], ba = {};
        t(z, v.length, aa, ba);
        for (var ca = 0; ca < v.length; ca++) {
            var da = v[ca], ea = w(da, ca);
            i(!z.hasOwnProperty(ea));
            i(o(ea));
            z[ea] = da;
            aa[ca] = '' + ea;
            ba[ea] = ca;
        }
        aa.areComputed = true;
        return z;
    }, size: function (v) {
        r(v);
        u._computePositionsIfNeeded(v);
        return v[l];
    }, has: function (v, w) {
        i(o(w));
        r(v);
        return v.hasOwnProperty(w);
    }, get: function (v, w) {
        i(o(w));
        return v.hasOwnProperty(w) ? v[w] : undefined;
    }, map: function (v, w, x) {
        r(v);
        u._computePositionsIfNeeded(v);
        return u.mapRange(v, w, 0, u.size(v), x);
    }, mapRange: function (v, w, x, y, z) {
        r(v);
        u._computePositionsIfNeeded(v);
        var aa = {}, ba = 0;
        p(x, y, u.size(v));
        var ca = x + y - 1;
        for (var da in v)if (v.hasOwnProperty(da)) {
            if (ba >= x) {
                if (ba > ca)break;
                aa[da] = w.call(z, v[da], da, ba);
            }
            ba++;
        }
        return u.create(aa);
    }, filter: function (v, w, x) {
        return u.filterRange(v, w, 0, u.size(v), x);
    }, filterRange: function (v, w, x, y, z) {
        var aa = {};
        u.forEachRange(v, function (ba, ca, da) {
            if (w.call(z, ba, ca, da))aa[ca] = ba;
        }, x, y);
        return u.create(aa);
    }, forEach: function (v, w, x) {
        u.forEachRange(v, w, 0, u.size(v), x);
    }, forEachRange: function (v, w, x, y, z) {
        r(v);
        p(x, y, u.size(v));
        var aa = 0, ba = x + y - 1;
        for (var ca in v)if (v.hasOwnProperty(ca)) {
            if (aa >= x) {
                if (aa > ba)break;
                w.call(z, v[ca], ca, aa);
            }
            aa++;
        }
    }, mapKeyRange: function (v, w, x, y, z) {
        var aa = u.indexOfKey(v, x), ba = u.indexOfKey(v, y);
        i(aa != null && ba != null);
        i(ba >= aa);
        var ca = (ba - aa) + 1;
        return u.mapRange(v, w, aa, ca, z);
    }, forEachKeyRange: function (v, w, x, y, z) {
        var aa = u.indexOfKey(v, x), ba = u.indexOfKey(v, y);
        i(aa != null && ba != null);
        i(ba >= aa);
        var ca = (ba - aa) + 1;
        u.forEachRange(v, w, aa, ca, z);
    }, keyAtIndex: function (v, w) {
        u._computePositionsIfNeeded(v);
        var x = v[m][w];
        return x ? x : undefined;
    }, valueAtIndex: function (v, w) {
        var x = u.keyAtIndex(v, w);
        return x !== undefined ? v[x] : undefined;
    }, keyAfter: function (v, w) {
        return u.nthKeyAfter(v, w, 1);
    }, keyBefore: function (v, w) {
        return u.nthKeyBefore(v, w, 1);
    }, nthKeyAfter: function (v, w, x) {
        var y = u.indexOfKey(v, w);
        i(y !== undefined);
        return u.keyAtIndex(v, y + x);
    }, nthKeyBefore: function (v, w, x) {
        return u.nthKeyAfter(v, w, -x);
    }, indexOfKey: function (v, w) {
        i(o(w));
        u._computePositionsIfNeeded(v);
        var x = v[n][w];
        return x === undefined ? undefined : x;
    }, slice: function (v, w, x) {
        return u.mapRange(v, h.thatReturnsArgument, w, x);
    }, sliceByKey: function (v, w, x) {
        var y = u.indexOfKey(v, w), z = u.indexOfKey(v, x);
        i(y != null && z != null);
        i(z >= y);
        var aa = (z - y) + 1;
        return u.slice(v, y, aa);
    }, toArray: function (v) {
        var w = 0, x = u.size(v), y = [];
        for (var z in v)if (v.hasOwnProperty(z)) {
            if (w > x)break;
            y.push(v[z]);
            w++;
        }
        return y;
    }, _computePositionsIfNeeded: function (v) {
        if (v[m].areComputed === false)u._computePositionsFromDictionary(v);
    }, _computePositionsFromDictionary: function (v) {
        var w = v[m], x = v[n], y = 0;
        for (var z in v)if (v.hasOwnProperty(z)) {
            w[y] = z;
            x[z] = y;
            y++;
        }
        v[m].areComputed = true;
    }};
    e.exports = u;
}, null);
__d("SelectionState", ["ImmutableObject", "invariant", "keyMirror"], function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j = i({ANCHOR_KEY: true, ANCHOR_OFFSET: true, FOCUS_KEY: true, FOCUS_OFFSET: true, IS_BACKWARD: true, HAS_FOCUS: true});
    k.create = function (m) {
        return new k(new g(l(m)));
    };
    k.set = function (m, n) {
        return new k(g.set(m.getImmutable(), l(n)));
    };
    k.prototype.getAnchorKey = function () {
        return this.$SelectionState0[j.ANCHOR_KEY];
    };
    k.prototype.getAnchorOffset = function () {
        return this.$SelectionState0[j.ANCHOR_OFFSET];
    };
    k.prototype.getFocusKey = function () {
        return this.$SelectionState0[j.FOCUS_KEY];
    };
    k.prototype.getFocusOffset = function () {
        return this.$SelectionState0[j.FOCUS_OFFSET];
    };
    k.prototype.isBackward = function () {
        return this.$SelectionState0[j.IS_BACKWARD];
    };
    k.prototype.hasFocus = function () {
        return this.$SelectionState0[j.HAS_FOCUS];
    };
    k.prototype.hasEdgeWithin = function (m, n, o) {
        var p = this.getAnchorKey(), q = this.getFocusKey();
        if (p === q && p === m) {
            var r = this.getStartOffset(), s = this.getEndOffset();
            return n <= s && r <= o;
        }
        var t;
        if (m === p) {
            t = this.getAnchorOffset();
        } else if (m === q) {
            t = this.getFocusOffset();
        } else return false;
        return n <= t && o >= t;
    };
    k.prototype.isCollapsed = function () {
        return (this.getAnchorKey() === this.getFocusKey() && this.getAnchorOffset() === this.getFocusOffset());
    };
    k.prototype.getStartKey = function () {
        return this.isBackward() ? this.getFocusKey() : this.getAnchorKey();
    };
    k.prototype.getStartOffset = function () {
        return this.isBackward() ? this.getFocusOffset() : this.getAnchorOffset();
    };
    k.prototype.getEndKey = function () {
        return this.isBackward() ? this.getAnchorKey() : this.getFocusKey();
    };
    k.prototype.getEndOffset = function () {
        return this.isBackward() ? this.getAnchorOffset() : this.getFocusOffset();
    };
    function k(m) {
        this.$SelectionState0 = m;
    }

    k.prototype.getImmutable = function () {
        return this.$SelectionState0;
    };
    function l(m) {
        var n = m, o = n.anchorKey, p = n.anchorOffset, q = n.focusKey, r = n.focusOffset, s = n.isBackward, t = n.hasFocus, u = {};
        if (o !== undefined) {
            h(typeof o === 'string');
            u[j.ANCHOR_KEY] = o;
        }
        if (p !== undefined) {
            h(typeof p === 'number');
            u[j.ANCHOR_OFFSET] = p;
        }
        if (q !== undefined) {
            h(typeof q === 'string');
            u[j.FOCUS_KEY] = q;
        }
        if (r !== undefined) {
            h(typeof r === 'number');
            u[j.FOCUS_OFFSET] = r;
        }
        if (s !== undefined) {
            h(typeof s === 'boolean');
            u[j.IS_BACKWARD] = s;
        }
        if (t !== undefined) {
            h(typeof t === 'boolean');
            u[j.HAS_FOCUS] = t;
        }
        return u;
    }

    e.exports = k;
}, null);
__d("ContentState", ["DocumentCharacters", "Immutable", "ImmutableMap", "ImmutableObject", "SelectionState", "invariant", "keyMirror"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    "use strict";
    var n = g.SOFT_NEWLINE, o = m({BLOCK_MAP: true, TREE_MAP: true, SELECTION_BEFORE: true, SELECTION_AFTER: true});
    p.create = function (r) {
        return new p(new j(q(r)));
    };
    p.set = function (r, s) {
        return new p(j.set(r.getImmutable(), q(s)));
    };
    p.prototype.getBlockMap = function () {
        return this.$ContentState0[o.BLOCK_MAP];
    };
    p.prototype.getSelectionBefore = function () {
        return this.$ContentState0[o.SELECTION_BEFORE];
    };
    p.prototype.getSelectionAfter = function () {
        return this.$ContentState0[o.SELECTION_AFTER];
    };
    p.prototype.getBlockForKey = function (r) {
        return i.get(this.getBlockMap(), r) || null;
    };
    p.prototype.getKeyBefore = function (r) {
        return i.keyBefore(this.getBlockMap(), r) || null;
    };
    p.prototype.getKeyAfter = function (r) {
        return i.keyAfter(this.getBlockMap(), r) || null;
    };
    p.prototype.getBlockAfter = function (r) {
        var s = this.getKeyAfter(r);
        return s ? i.get(this.getBlockMap(), s) : null;
    };
    p.prototype.getBlockBefore = function (r) {
        var s = this.getKeyBefore(r);
        return s ? i.get(this.getBlockMap(), s) : null;
    };
    p.prototype.getBlocksAsArray = function () {
        return i.toArray(this.getBlockMap());
    };
    p.prototype.getLastBlock = function () {
        var r = this.getBlockMap(), s = i.size(r);
        return i.valueAtIndex(r, s - 1);
    };
    p.prototype.getPlainText = function (r) {
        return i.toArray(i.map(this.getBlockMap(), function (s, t) {
            return s.getText();
        })).join(r || n);
    };
    p.prototype.hasText = function () {
        var r = this.getBlockMap(), s = i.valueAtIndex(r, 0);
        return !(i.size(r) === 1 && s.getText().length === 0);
    };
    function p(r) {
        this.$ContentState0 = r;
    }

    p.prototype.getImmutable = function () {
        return this.$ContentState0;
    };
    function q(r) {
        var s = r, t = s.blockMap, u = s.selectionBefore, v = s.selectionAfter, w = {};
        if (t !== undefined) {
            l(t instanceof h);
            w[o.BLOCK_MAP] = t;
        }
        if (u !== undefined) {
            l(u instanceof k);
            w[o.SELECTION_BEFORE] = u;
        }
        if (v !== undefined) {
            l(v instanceof k);
            w[o.SELECTION_AFTER] = v;
        }
        return w;
    }

    e.exports = p;
}, null);
__d("ContentStateInlineStyle", ["ContentBlock", "ContentState", "ImmutableMap", "areEqual"], function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    var k = {add: function (m, n, o) {
        return l(m, n, o, true);
    }, remove: function (m, n, o) {
        return l(m, n, o, false);
    }};

    function l(m, n, o, p) {
        var q = m.getBlockMap(), r = n.getStartKey(), s = n.getStartOffset(), t = n.getEndKey(), u = n.getEndOffset(), v = i.mapKeyRange(q, function (w, x) {
            var y, z;
            if (r === t) {
                y = s;
                z = u;
            } else {
                y = x === r ? s : 0;
                z = x === t ? u : w.getLength();
            }
            var aa = w.getInlineStyles(), ba = aa.slice(y, z), ca = ba.map(function (ea) {
                return (p ? ea | o : ea & (~o));
            });
            if (j(ca, ba))return w;
            var da = aa.slice(0, y).concat(ca, aa.slice(z, w.getLength()));
            return g.set(w, {inlineStyles: da});
        }, r, t);
        return h.set(m, {blockMap: i.set(q, v), selectionBefore: n, selectionAfter: n});
    }

    e.exports = k;
}, null);
__d("applyEntityToContentBlock", ["ContentBlock", "fillArray"], function (a, b, c, d, e, f, g, h) {
    function i(j, k, l, m) {
        var n = j.getEntities(), o = n.slice(0, k).concat(h(l - k, m), n.slice(l));
        return g.set(j, {entities: o});
    }

    e.exports = i;
}, null);
__d("applyEntityToContentState", ["ContentState", "ImmutableMap", "applyEntityToContentBlock"], function (a, b, c, d, e, f, g, h, i) {
    function j(k, l, m) {
        var n = k.getBlockMap(), o = l.getStartKey(), p = l.getStartOffset(), q = l.getEndKey(), r = l.getEndOffset(), s = h.mapKeyRange(n, function (t, u) {
            var v, w;
            if (o === q) {
                v = p;
                w = r;
            } else {
                v = u === o ? p : 0;
                w = u === q ? 0 : t.getLength();
            }
            return i(t, v, w, m);
        }, o, q);
        return g.set(k, {blockMap: h.set(n, s), selectionBefore: l, selectionAfter: l});
    }

    e.exports = j;
}, null);
__d("findRanges", [], function (a, b, c, d, e, f) {
    function g(h, i, j) {
        var k = 0, l = 0, m;
        for (var n = 0; n < h.length; n++) {
            l++;
            m = h[n];
            if (m !== h[n + 1]) {
                if (i(m))j(k, l);
                k = l;
            }
        }
    }

    e.exports = g;
}, null);
__d("getRangesForDocumentEntityExperimental", ["findRanges", "invariant"], function (a, b, c, d, e, f, g, h) {
    function i(j, k) {
        var l = [];
        g(j, function (m) {
            return m === k;
        }, function (m, n) {
            l.push({start: m, end: n});
        });
        h(!!l.length);
        return l;
    }

    e.exports = i;
}, null);
__d("getCharacterRemovalRangeExperimental", ["ComposedEntityMutability", "DocumentEntity", "DocumentEntitySegmentsExperimental", "SelectionState", "checkRangeOverlap", "getRangesForDocumentEntityExperimental", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = g.MUTABLE, o = g.IMMUTABLE;

    function p(q, r, s) {
        var t = r.getStartOffset(), u = r.getEndOffset(), v = q.getEntities(), w = v[t];
        if (!w)return r;
        var x = h.get(w), y = x.getMutability();
        if (y === n)return r;
        var z = l(v, w).filter(function (ca) {
            return k(t, u, ca.start, ca.end);
        });
        m(z.length == 1);
        var aa = z[0];
        if (y === o)return j.set(r, {anchorOffset: aa.start, focusOffset: aa.end, isBackward: false});
        var ba = i.getRemovalRange(t, u, q.getText().slice(aa.start, aa.end), aa.start, s);
        return j.set(r, {anchorOffset: ba.start, focusOffset: ba.end, isBackward: false});
    }

    e.exports = p;
}, null);
__d("generateBlockKey", [], function (a, b, c, d, e, f) {
    var g = {}, h = Math.pow(2, 24);

    function i() {
        var j;
        while (j === undefined || g.hasOwnProperty(j) || !isNaN(+j))j = Math.floor(Math.random() * h).toString(32);
        g[j] = true;
        return j;
    }

    e.exports = i;
}, null);
__d("insertFragmentIntoContentState", ["ContentBlock", "ContentState", "ImmutableMap", "SelectionState", "generateBlockKey", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    function m(n, o, p) {
        l(o.isCollapsed());
        var q = o.getStartKey(), r = o.getStartOffset(), s = n.getBlockMap(), t = i.size(p), u, v;
        if (t === 1) {
            var w = i.get(s, q), x = i.valueAtIndex(p, 0), y = w.getText(), z = w.getInlineStyles(), aa = w.getEntities(), ba = g.set(w, {text: (y.slice(0, r) + x.getText() + y.slice(r)), inlineStyles: (z.slice(0, r).concat(x.getInlineStyles(), z.slice(r))), entities: (aa.slice(0, r).concat(x.getEntities(), aa.slice(r)))}), ca = {};
            ca[q] = ba;
            u = q;
            v = r + x.getText().length;
            return h.set(n, {blockMap: i.set(s, ca), selectionBefore: o, selectionAfter: j.set(o, {anchorKey: u, anchorOffset: v, focusKey: u, focusOffset: v, isBackward: false})});
        }
        var da = [];
        i.forEach(n.getBlockMap(), function (fa, ga) {
            if (ga !== q) {
                da.push(fa);
                return;
            }
            var ha = fa.getText(), ia = fa.getInlineStyles(), ja = fa.getEntities(), ka = ha.length, la = ha.slice(0, r), ma = ia.slice(0, r), na = ja.slice(0, r), oa = i.valueAtIndex(p, 0), pa = g.set(fa, {text: la + oa.getText(), inlineStyles: ma.concat(oa.getInlineStyles()), entities: na.concat(oa.getEntities())});
            da.push(pa);
            i.forEach(i.slice(p, 1, t - 2), function (va) {
                da.push(g.set(va, {key: k()}));
            });
            var qa = ha.slice(r, ka), ra = ia.slice(r, ka), sa = ja.slice(r, ka), ta = i.valueAtIndex(p, t - 1);
            u = k();
            var ua = g.set(ta, {key: u, text: ta.getText() + qa, inlineStyles: ta.getInlineStyles().concat(ra), entities: ta.getEntities().concat(sa)});
            da.push(ua);
        });
        var ea = i.valueAtIndex(p, t - 1);
        v = ea.getText().length;
        return h.set(n, {blockMap: i.fromArray(da, function (fa) {
            return fa.getKey();
        }), selectionBefore: o, selectionAfter: j.set(o, {anchorKey: u, anchorOffset: v, focusKey: u, focusOffset: v, isBackward: false})});
    }

    e.exports = m;
}, null);
__d("insertTextIntoContentState", ["ContentBlock", "ContentState", "ImmutableMap", "SelectionState", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k) {
    "use strict";
    function l(m, n, o, p, q) {
        k(n.isCollapsed());
        var r = o.length;
        k(r === p.length && r === q.length);
        if (!o.length)return m;
        var s = m.getBlockMap(), t = n.getStartKey(), u = n.getStartOffset(), v = i.get(s, t), w = v.getText(), x = v.getInlineStyles(), y = v.getEntities(), z = w.length, aa = g.set(v, {text: (w.slice(0, u) + o + w.slice(u, z)), inlineStyles: x.slice(0, u).concat(p, x.slice(u, z)), entities: y.slice(0, u).concat(q, y.slice(u, z))}), ba = {};
        ba[t] = aa;
        var ca = u + r;
        return h.set(m, {blockMap: i.set(s, ba), selectionAfter: j.set(n, {anchorOffset: ca, focusOffset: ca})});
    }

    e.exports = l;
}, null);
__d("removeEntitiesAtEdges", ["ContentBlock", "ContentState", "ComposedEntityMutability", "DocumentEntity", "ImmutableMap", "fillArray", "findRanges", "isEmpty"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = i.MUTABLE;

    function p(s, t) {
        var u = s.getBlockMap(), v = {}, w = t.getStartKey(), x = t.getStartOffset(), y = k.get(u, w), z = r(y, x);
        if (z)v[w] = z;
        var aa = t.getEndKey(), ba = t.getEndOffset(), ca = k.get(u, aa);
        if (w === aa && z)ca = z;
        var da = r(ca, ba);
        if (da)v[aa] = da;
        if (n(v))return h.set(s, {selectionAfter: t});
        return h.set(s, {blockMap: k.set(u, v), selectionAfter: t});
    }

    function q(s, t, u) {
        var v;
        m(s, function (w) {
            return w === t;
        }, function (w, x) {
            if (w <= u && x >= u)v = {start: w, end: x};
        });
        return v;
    }

    function r(s, t) {
        var u = s.getEntities(), v = u[t - 1], w = u[t];
        if (w && w === v) {
            var x = j.get(w);
            if (x.getMutability() !== o) {
                var y = q(u, w, t);
                return g.set(s, {entities: u.slice(0, y.start).concat(l(y.end - y.start, null), u.slice(y.end))});
            }
        }
        return null;
    }

    e.exports = p;
}, null);
__d("removeRangeFromContentState", ["ContentBlock", "ContentState", "ImmutableMap", "SelectionState"], function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    function k(l, m) {
        if (m.isCollapsed())return l;
        var n = l.getBlockMap(), o = m.getStartKey(), p = m.getStartOffset(), q = i.indexOfKey(n, o), r = m.getEndKey(), s = m.getEndOffset(), t = i.indexOfKey(n, r), u = i.map(n, function (v, w, x) {
            if (x < q || x > t)return v;
            if (x > q && x <= t)return null;
            var y = i.get(n, r), z = y.getText(), aa = y.getInlineStyles(), ba = y.getEntities(), ca = z.length, da = v.getText(), ea = v.getInlineStyles(), fa = v.getEntities();
            return g.set(v, {text: (da.slice(0, p) + z.slice(s, ca)), inlineStyles: ea.slice(0, p).concat(aa.slice(s, ca)), entities: fa.slice(0, p).concat(ba.slice(s, ca))});
        });
        return h.set(l, {blockMap: i.filter(u, function (v) {
            return !!v;
        }), selectionBefore: m, selectionAfter: j.set(m, {anchorKey: o, anchorOffset: p, focusKey: o, focusOffset: p, isBackward: false})});
    }

    e.exports = k;
}, null);
__d("setBlockTypeForContentState", ["ContentBlock", "ContentState", "ImmutableMap"], function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    function j(k, l, m) {
        var n = k.getBlockMap(), o = i.mapKeyRange(n, function (p, q) {
            return g.set(p, {type: m});
        }, l.getStartKey(), l.getEndKey());
        return h.set(k, {blockMap: i.set(n, o), selectionBefore: l, selectionAfter: l});
    }

    e.exports = j;
}, null);
__d("splitBlockInContentState", ["ContentBlock", "ContentState", "ImmutableMap", "SelectionState", "generateBlockKey", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    function m(n, o) {
        l(o.isCollapsed());
        var p = o.getAnchorKey(), q = o.getAnchorOffset(), r = n.getBlockMap(), s = i.get(r, p), t = s.getText(), u = s.getInlineStyles(), v = s.getEntities(), w = g.set(s, {text: t.slice(0, q), inlineStyles: u.slice(0, q), entities: v.slice(0, q)}), x = k(), y = g.set(w, {key: x, text: t.slice(q), inlineStyles: u.slice(q), entities: v.slice(q)}), z = [];
        i.forEach(r, function (aa, ba) {
            if (ba === p) {
                z.push(w);
                z.push(y);
            } else z.push(aa);
        });
        return h.set(n, {blockMap: i.fromArray(z, function (aa) {
            return aa.getKey();
        }), selectionBefore: o, selectionAfter: j.set(o, {anchorKey: x, anchorOffset: 0, focusKey: x, focusOffset: 0, isBackward: false})});
    }

    e.exports = m;
}, null);
__d("DocumentModifierExperimental", ["ComposedInlineStyle", "ContentStateInlineStyle", "applyEntityToContentState", "fillArray", "getCharacterRemovalRangeExperimental", "insertFragmentIntoContentState", "insertTextIntoContentState", "invariant", "removeEntitiesAtEdges", "removeRangeFromContentState", "setBlockTypeForContentState", "splitBlockInContentState"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    "use strict";
    var s = {replaceText: function (t, u, v, w, x) {
        if (w === undefined)w = g.NONE;
        if (x === undefined)x = null;
        var y = o(t, u), z = p(y, u);
        return m(z, z.getSelectionAfter(), v, j(v.length, w), j(v.length, x));
    }, insertText: function (t, u, v, w, x) {
        n(u.isCollapsed());
        var y = o(t, u);
        return m(y, y.getSelectionAfter(), v, j(v.length, w), j(v.length, x));
    }, replaceWithFragment: function (t, u, v) {
        var w = o(t, u), x = p(w, u);
        return l(x, x.getSelectionAfter(), v);
    }, removeRange: function (t, u, v) {
        if (u.getAnchorKey() === u.getFocusKey()) {
            var w = u.getAnchorKey(), x = u.getStartOffset(), y = u.getEndOffset(), z = t.getBlockForKey(w), aa = z.getEntities(), ba = aa[x], ca = aa[y - 1];
            if (ba && ba === ca) {
                var da = k(z, u, v);
                return p(t, da);
            }
        }
        var ea = o(t, u);
        return p(ea, u);
    }, splitBlock: function (t, u) {
        var v = o(t, u), w = p(v, u);
        return r(w, w.getSelectionAfter());
    }, applyInlineStyle: function (t, u, v) {
        return h.add(t, u, v);
    }, removeInlineStyle: function (t, u, v) {
        return h.remove(t, u, v);
    }, setBlockType: function (t, u, v) {
        return q(t, u, v);
    }, applyEntity: function (t, u, v) {
        var w = o(t, u);
        return i(w, u, v);
    }};
    e.exports = s;
}, null);
__d("DocumentOffsetKey", [], function (a, b, c, d, e, f) {
    var g = '-', h = {encode: function (i, j, k) {
        return i + g + j + g + k;
    }, decode: function (i) {
        var j = i.split(g), k = j[0], l = j[1], m = j[2];
        return {blockKey: k, decoratorKey: l, leafKey: m};
    }};
    e.exports = h;
}, null);
__d("createEmptySelectionState", ["SelectionState"], function (a, b, c, d, e, f, g) {
    "use strict";
    function h(i) {
        return g.create({anchorKey: i, anchorOffset: 0, focusKey: i, focusOffset: 0, isBackward: false, hasFocus: false});
    }

    e.exports = h;
}, null);
__d("createContentStateFromBlocks", ["ContentState", "ImmutableMap", "createEmptySelectionState"], function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    function j(k) {
        var l = h.fromArray(k, function (o) {
            return o.getKey();
        }), m = h.keyAtIndex(l, 0), n = i(m);
        return g.create({blockMap: l, selectionBefore: n, selectionAfter: n});
    }

    e.exports = j;
}, null);
__d("BlockTree", ["emptyFunction", "fillArray", "findRanges"], function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j = g.thatReturnsTrue, k = '-', l = {generate: function (n, o) {
        var p = n.getText().length;
        if (!p)return [
            {start: 0, end: 0, decoratorKey: null, leaves: [
                {start: 0, end: 0}
            ]}
        ];
        var q = [], r = o ? o.getDecorations(n) : h(p, null), s = n.getInlineStyles();
        i(r, j, function (t, u) {
            q.push({start: t, end: u, decoratorKey: r[t], leaves: m(s.slice(t, u), t)});
        });
        return q;
    }, getFingerprint: function (n) {
        return n.map(function (o) {
            var p = o.decoratorKey, q = p !== null ? p + '.' + (o.end - o.start) : '';
            return '' + q + '.' + o.leaves.length;
        }).join(k);
    }};

    function m(n, o) {
        var p = [];
        i(n, j, function (q, r) {
            p.push({start: q + o, end: r + o});
        });
        return p;
    }

    e.exports = l;
}, null);
__d("EditorChangeType", ["keyMirror"], function (a, b, c, d, e, f, g) {
    "use strict";
    var h = g({UNDO: true, REDO: true, CHANGE_SELECTION: true, INSERT_CHARACTERS: true, BACKSPACE_CHARACTER: true, DELETE_CHARACTER: true, REMOVE_RANGE: true, SPLIT_BLOCK: true, INSERT_FRAGMENT: true, CHANGE_INLINE_STYLE: true, CHANGE_BLOCK_TYPE: true, APPLY_ENTITY: true});
    e.exports = h;
}, null);
__d("generateContentStateKey", [], function (a, b, c, d, e, f) {
    var g = 0;

    function h() {
        return 'state-' + (++g);
    }

    e.exports = h;
}, null);
__d("EditorState", ["BlockTree", "ComposedInlineStyle", "ContentState", "DocumentCompositeDecorator.Experimental", "EditorChangeType", "Immutable", "ImmutableMap", "ImmutableObject", "SelectionState", "generateContentStateKey", "invariant", "keyMirror"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    "use strict";
    var s = r({ALLOW_UNDO: true, BOUNDARY_KEY: true, CURRENT_KEY: true, DECORATOR: true, FORCE_SELECTION: true, IN_COMPOSITION_MODE: true, INLINE_STYLE_OVERRIDE: true, LAST_CHANGE_TYPE: true, NATIVELY_RENDERED_KEY: true, SELECTION: true, STACK: true, TREE_MAP: true});
    t.create = function (z) {
        if (z.allowUndo === undefined)z.allowUndo = true;
        var aa = u(z);
        aa[s.TREE_MAP] = v(m.get(aa[s.STACK], aa[s.CURRENT_KEY]), aa[s.DECORATOR]);
        return new t(new n(aa));
    };
    t.set = function (z, aa) {
        var ba = u(aa), ca = ba[s.STACK] || z.getStack(), da = ba[s.CURRENT_KEY] || z.getCurrentKey(), ea = m.get(ca, da), fa = ba[s.DECORATOR] || z.getDecorator();
        if (fa !== z.getDecorator()) {
            ba[s.TREE_MAP] = v(ea, fa);
            ba[s.NATIVELY_RENDERED_KEY] = null;
        } else if (ea !== z.getCurrentContent())ba[s.TREE_MAP] = w(z, ea, fa);
        return new t(n.set(z.getImmutable(), ba));
    };
    t.prototype.allowUndo = function () {
        return this.$EditorState0[s.ALLOW_UNDO];
    };
    t.prototype.getCurrentKey = function () {
        return this.$EditorState0[s.CURRENT_KEY];
    };
    t.prototype.getBoundaryKey = function () {
        return this.$EditorState0[s.BOUNDARY_KEY];
    };
    t.prototype.getStack = function () {
        return this.$EditorState0[s.STACK];
    };
    t.prototype.getTreeMap = function () {
        return this.$EditorState0[s.TREE_MAP];
    };
    t.prototype.getSelection = function () {
        return this.$EditorState0[s.SELECTION];
    };
    t.prototype.getDecorator = function () {
        return this.$EditorState0[s.DECORATOR];
    };
    t.prototype.isInCompositionMode = function () {
        return this.$EditorState0[s.IN_COMPOSITION_MODE];
    };
    t.prototype.mustForceSelection = function () {
        return this.$EditorState0[s.FORCE_SELECTION];
    };
    t.prototype.getNativelyRenderedKey = function () {
        return this.$EditorState0[s.NATIVELY_RENDERED_KEY];
    };
    t.prototype.getLastChangeType = function () {
        return this.$EditorState0[s.LAST_CHANGE_TYPE];
    };
    t.prototype.getCurrentContent = function () {
        return m.get(this.getStack(), this.getCurrentKey());
    };
    t.prototype.getInlineStyleOverride = function () {
        return this.$EditorState0[s.INLINE_STYLE_OVERRIDE];
    };
    t.prototype.getCurrentInlineStyle = function () {
        var z = this.getInlineStyleOverride();
        if (z != null)return z;
        var aa = this.getSelection(), ba = this.getCurrentContent();
        if (aa.isCollapsed()) {
            var ca = aa.getStartOffset(), da = ba.getBlockForKey(aa.getStartKey()), ea = da.getInlineStyles();
            if (ca > 0)return ea[ca - 1];
            if (da.getLength())return ea[0];
        }
        return y(ba, aa);
    };
    t.prototype.isAtDocumentStart = function () {
        var z = this.getSelection(), aa = this.getCurrentContent(), ba = aa.getBlockMap(), ca = m.keyAtIndex(ba, 0);
        return z.hasEdgeWithin(ca, 0, 0);
    };
    t.prototype.isAtDocumentEnd = function () {
        var z = this.getSelection(), aa = this.getCurrentContent(), ba = aa.getBlockMap(), ca = m.keyAtIndex(ba, m.size(ba) - 1), da = m.get(ba, ca), ea = da.getText().length;
        return z.hasEdgeWithin(ca, ea, ea);
    };
    t.updateSelection = function (z, aa, ba) {
        return t.set(z, {selection: aa, forceSelection: ba, nativelyRenderedKey: null, inlineStyleOverride: null});
    };
    t.moveFocusToEnd = function (z) {
        var aa = z.getCurrentContent(), ba = aa.getLastBlock(), ca = ba.getKey(), da = ba.getLength();
        return t.updateSelection(z, o.create({anchorKey: ca, anchorOffset: da, focusKey: ca, focusOffset: da, isBackward: false, hasFocus: true}), true);
    };
    t.push = function (z, aa, ba) {
        if (z.getCurrentContent() === aa)return z;
        var ca = z.getStack(), da = z.getBoundaryKey(), ea = z.getCurrentKey(), fa = z.getCurrentContent(), ga = z.getSelection(), ha = ba !== k.INSERT_CHARACTERS;
        if (ga !== fa.getSelectionAfter() || x(z, ba)) {
            da = ea;
            aa = i.set(aa, {selectionBefore: ga});
        } else if (ba === k.INSERT_CHARACTERS || ba === k.BACKSPACE_CHARACTER || ba === k.DELETE_CHARACTER)aa = i.set(aa, {selectionBefore: fa.getSelectionBefore()});
        var ia = p(), ja = {};
        ja[ia] = aa;
        var ka;
        if (z.allowUndo()) {
            var la = m.indexOfKey(ca, da) + 1, ma = m.slice(ca, 0, la);
            ka = m.set(ma, ja);
        } else ka = m.create(ja);
        return t.set(z, {stack: ka, boundaryKey: da, currentKey: ia, lastChangeType: ba, selection: aa.getSelectionAfter(), forceSelection: ha, inlineStyleOverride: null});
    };
    t.undo = function (z) {
        if (!z.allowUndo())return z;
        var aa = z.getBoundaryKey(), ba = z.getCurrentKey(), ca = z.getStack(), da = z.getCurrentContent();
        if (aa === ba) {
            var ea = m.nthKeyBefore(ca, aa, 1);
            if (ea === undefined)return z;
            return t.set(z, {boundaryKey: ea, currentKey: ea, forceSelection: true, inlineStyleOverride: null, lastChangeType: k.UNDO, nativelyRenderedKey: null, selection: da.getSelectionBefore()});
        }
        return t.set(z, {currentKey: aa, forceSelection: true, inlineStyleOverride: null, lastChangeType: k.UNDO, nativelyRenderedKey: null, selection: da.getSelectionBefore(), stack: ca});
    };
    t.redo = function (z) {
        if (!z.allowUndo())return z;
        var aa = z.getStack(), ba = m.nthKeyAfter(aa, z.getBoundaryKey(), 1);
        if (ba === undefined)return z;
        var ca = m.get(aa, ba);
        return t.set(z, {boundaryKey: ba, currentKey: ba, forceSelection: true, inlineStyleOverride: null, lastChangeType: k.REDO, nativelyRenderedKey: null, selection: ca.getSelectionAfter()});
    };
    function t(z) {
        this.$EditorState0 = z;
    }

    t.prototype.getImmutable = function () {
        return this.$EditorState0;
    };
    function u(z) {
        var aa = z, ba = aa.allowUndo, ca = aa.boundaryKey, da = aa.currentKey, ea = aa.decorator, fa = aa.forceSelection, ga = aa.inCompositionMode, ha = aa.inlineStyleOverride, ia = aa.lastChangeType, ja = aa.nativelyRenderedKey, ka = aa.selection, la = aa.stack, ma = {};
        if (ba !== undefined) {
            q(typeof ba === 'boolean');
            ma[s.ALLOW_UNDO] = ba;
        }
        if (ca !== undefined) {
            q(typeof ca === 'string');
            ma[s.BOUNDARY_KEY] = ca;
        }
        if (da !== undefined) {
            q(typeof da === 'string');
            ma[s.CURRENT_KEY] = da;
        }
        if (ea !== undefined) {
            q(ea instanceof j);
            ma[s.DECORATOR] = ea;
        }
        if (fa !== undefined) {
            q(typeof fa === 'boolean');
            ma[s.FORCE_SELECTION] = fa;
        }
        if (ga !== undefined) {
            q(typeof ga === 'boolean');
            ma[s.IN_COMPOSITION_MODE] = ga;
        }
        if (ha !== undefined) {
            q(typeof ha === 'number' || ha === null);
            ma[s.INLINE_STYLE_OVERRIDE] = ha;
        }
        if (ia !== undefined) {
            q(typeof ia === 'string' || ia === null);
            ma[s.LAST_CHANGE_TYPE] = ia;
        }
        if (ja !== undefined) {
            q(typeof ja === 'string' || ja === null);
            ma[s.NATIVELY_RENDERED_KEY] = ja;
        }
        if (ka !== undefined) {
            q(ka instanceof o);
            ma[s.SELECTION] = ka;
        }
        if (la !== undefined) {
            q(la instanceof l);
            ma[s.STACK] = la;
        }
        return ma;
    }

    function v(z, aa) {
        return m.map(z.getBlockMap(), function (ba) {
            return g.generate(ba, aa);
        });
    }

    function w(z, aa, ba) {
        var ca = z.getCurrentContent(), da = z.getTreeMap(), ea = ca.getBlockMap();
        return m.map(aa.getBlockMap(), function (fa, ga) {
            if (fa !== m.get(ea, ga))return g.generate(fa, ba);
            return m.get(da, ga);
        });
    }

    function x(z, aa) {
        var ba = z.getLastChangeType();
        return (aa !== ba || (aa !== k.INSERT_CHARACTERS && aa !== k.BACKSPACE_CHARACTER && aa !== k.DELETE_CHARACTER));
    }

    function y(z, aa) {
        var ba = aa.getStartKey(), ca = aa.getStartOffset();
        if (ca > 0) {
            var da = z.getBlockForKey(ba), ea = da.getText(), fa = ca;
            if (ea.length === ca)fa--;
            return da.getInlineStyles()[fa];
        }
        var ga = z.getBlockBefore(ba), ha;
        while (ga) {
            ha = ga.getLength();
            if (ha)return ga.getInlineStyles()[ha - 1];
            ga = z.getBlockBefore(ga.getKey());
        }
        return h.NONE;
    }

    e.exports = t;
}, null);
__d("createInitialEditorState", ["EditorState", "ImmutableMap", "createEmptySelectionState", "generateContentStateKey"], function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    function k(l, m) {
        var n = h.fromArray([l], function () {
            return j();
        }), o = h.keyAtIndex(n, 0), p = l.getBlockMap(), q = h.keyAtIndex(p, 0);
        return g.create({stack: n, currentKey: o, boundaryKey: o, decorator: m, selection: i(q), forceSelection: false, lastChangeType: null, nativelyRenderedKey: null, inCompositionMode: false});
    }

    e.exports = k;
}, null);
__d("createPlainBlocksFromText", ["ComposedBlockType", "ComposedInlineStyle", "ContentBlock", "fillArray", "generateBlockKey"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(m) {
        return m.map(function (n) {
            var o = n.length;
            return i.create({key: k(), text: n, type: g.UNSTYLED, inlineStyles: j(o, h.NONE), entities: j(o, null)});
        });
    }

    e.exports = l;
}, null);
__d("isSelectionAtLeafStartExperimental", [], function (a, b, c, d, e, f) {
    "use strict";
    function g(h) {
        var i = h.getSelection(), j = i.getAnchorKey(), k = h.getTreeMap()[j], l = i.getStartOffset(), m, n, o;
        for (var p = 0; p < k.length; p++) {
            m = k[p];
            if (l === m.start)return true;
            if (l < m.end) {
                n = m.leaves;
                for (var q = 0; q < n.length; q++) {
                    o = n[q].start;
                    if (l === o)return true;
                    if (l < o)return false;
                }
            }
        }
        return false;
    }

    e.exports = g;
}, null);
__d("DocumentRemovableWord", ["TokenizeUtil"], function (a, b, c, d, e, f, g) {
    var h = g.getPunctuation();
    h = h.replace("\'", "").slice(1, -1);
    var i = '\\s' + h, j = '^(' + '[' + i + ']*' + '[^' + i + ']+' + '|[' + i + ']+' + ')', k = new RegExp(j), l = '(' + '[^' + i + ']+' + '[' + i + ']*' + '|[' + i + ']+' + ')$', m = new RegExp(l);

    function n(p, q) {
        var r = q ? m.exec(p) : k.exec(p);
        return r ? r[0] : null;
    }

    var o = {getBackward: function (p) {
        return n(p, true);
    }, getForward: function (p) {
        return n(p, false);
    }};
    e.exports = o;
}, null);
__d("getTextContentFromFiles", ["DocumentCharacters"], function (a, b, c, d, e, f, g) {
    var h = g.BLOCK_DELIMITER, i = /\.textClipping$/, j = {'text/plain': true, 'text/html': true, 'text/rtf': true};

    function k(m, n) {
        var o = 0, p = [];
        m.forEach(function (q) {
            l(q, function (r) {
                o++;
                r && p.push(r);
                if (o == m.length)n(p.join(h));
            });
        });
    }

    function l(m, n) {
        if (!a.FileReader || (m.type && !(m.type in j))) {
            n('');
            return;
        }
        if (m.type === '' && i.test(m.name)) {
            n(m.name.replace(i, ''));
            return;
        }
        var o = new FileReader();
        o.onload = function () {
            n(o.result);
        };
        o.onerror = function () {
            n('');
        };
        o.readAsText(m);
    }

    e.exports = k;
}, null);
__d("getSelectionOffsetKeyForNode", [], function (a, b, c, d, e, f) {
    function g(h) {
        return h.getAttribute && h.getAttribute('data-offset-key');
    }

    e.exports = g;
}, null);
__d("findAncestorOffsetKey", ["getSelectionOffsetKeyForNode"], function (a, b, c, d, e, f, g) {
    function h(i) {
        while (i && i !== document.documentElement) {
            var j = g(i);
            if (j != null)return j;
            i = i.parentNode;
        }
        return null;
    }

    e.exports = h;
}, null);
__d("getDocumentSelectionExperimental", ["DocumentCharacters", "DocumentOffsetKey", "ImmutableMap", "SelectionState", "findAncestorOffsetKey", "getSelectionOffsetKeyForNode", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = g.SOFT_NEWLINE;

    function o(u, v) {
        var w = a.getSelection();
        if (w.rangeCount === 0)return {selectionState: j.set(u.getSelection(), {hasFocus: false}), needsRecovery: false};
        var x = w.anchorNode, y = w.focusNode, z = w.anchorOffset, aa = w.focusOffset, ba = x.nodeType === Node.TEXT_NODE, ca = y.nodeType === Node.TEXT_NODE;
        if (ba && ca)return {selectionState: t(u, k(x), z, k(y), aa), needsRecovery: false};
        var da = null, ea = null;
        if (ba) {
            da = {key: k(x), offset: z};
            ea = r(v, y, aa);
        } else if (ca) {
            ea = {key: k(y), offset: aa};
            da = r(v, x, z);
        } else {
            da = r(v, x, z);
            ea = r(v, y, aa);
        }
        return {selectionState: t(u, da.key, da.offset, ea.key, ea.offset), needsRecovery: true};
    }

    function p(u) {
        while (u.firstChild && l(u.firstChild))u = u.firstChild;
        return u;
    }

    function q(u) {
        while (u.lastChild && l(u.lastChild))u = u.lastChild;
        return u;
    }

    function r(u, v, w) {
        var x = k(v);
        m(x != null || u === v);
        if (w === 0)return {key: x || l(p(v)), offset: 0};
        var y = v.childNodes[w - 1], z, aa;
        if (!l(y)) {
            z = x;
            aa = s(y);
        } else {
            var ba = q(y);
            z = l(ba);
            aa = s(ba);
        }
        return {key: z, offset: aa};
    }

    function s(u) {
        var v = u.textContent;
        return v === n ? 0 : v.length;
    }

    function t(u, v, w, x, y) {
        var z = u.getSelection(), aa = u.getTreeMap(), ba = h.decode(v), ca = ba.blockKey, da = aa[ca], ea = da[ba.decoratorKey].leaves, fa = ea[ba.leafKey], ga = h.decode(x), ha = ga.blockKey, ia = aa[ha], ja = ia[ga.decoratorKey].leaves, ka = ja[ga.leafKey], la = fa ? fa.start + w : null, ma = ka ? ka.start + y : null, na = (z.getAnchorKey() === ca && z.getAnchorOffset() === la && z.getFocusKey() === ha && z.getFocusOffset() === ma);
        if (na)return z;
        var oa = false;
        if (ca === ha) {
            if (ka === fa) {
                oa = y < w;
            } else oa = ka.start < fa.start;
        } else {
            var pa = i.indexOfKey(aa, ca), qa = i.indexOfKey(aa, ha);
            oa = qa < pa;
        }
        return j.set(z, {anchorKey: ca, anchorOffset: la, focusKey: ha, focusOffset: ma, isBackward: oa});
    }

    e.exports = o;
}, null);
__d("setDocumentSelectionExperimental", [], function (a, b, c, d, e, f) {
    "use strict";
    function g(j, k, l, m, n) {
        var o = a.getSelection(), p = j.getAnchorKey(), q = j.getAnchorOffset(), r = j.getFocusKey(), s = j.getFocusOffset(), t = j.isBackward();
        if (!o.extend && t) {
            var u = p, v = q;
            p = r;
            q = s;
            r = u;
            s = v;
            t = false;
        }
        var w = (p === l && m <= q && n >= q), x = (r === l && m <= s && n >= s);
        if (w && x) {
            o.removeAllRanges();
            i(o, k, q - m);
            h(o, k, s - m);
            return;
        }
        if (!t) {
            if (w) {
                o.removeAllRanges();
                i(o, k, q - m);
            }
            if (x)h(o, k, s - m);
        } else {
            if (x) {
                o.removeAllRanges();
                i(o, k, s - m);
            }
            if (w) {
                var y = o.focusNode, z = o.focusOffset;
                o.removeAllRanges();
                i(o, k, q - m);
                h(o, y, z);
            }
        }
    }

    function h(j, k, l) {
        if (j.extend) {
            j.extend(k, l);
        } else {
            var m = j.getRangeAt(0);
            m.setEnd(k, l);
            j.addRange(m.cloneRange());
        }
    }

    function i(j, k, l) {
        var m = document.createRange();
        m.setStart(k, l);
        j.addRange(m);
    }

    e.exports = g;
}, null);
__d("getContentStateFragment", ["ContentBlock", "ImmutableMap", "generateBlockKey", "removeEntitiesAtEdges"], function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    function k(l, m) {
        var n = m.getStartKey(), o = m.getStartOffset(), p = m.getEndKey(), q = m.getEndOffset(), r = j(l, m), s = r.getBlockMap();
        return h.mapKeyRange(s, function (t, u) {
            var v = i(), w = t.getText(), x = t.getInlineStyles(), y = t.getEntities();
            if (n === p)return g.set(t, {key: v, text: w.slice(o, q), inlineStyles: x.slice(o, q), entities: y.slice(o, q)});
            if (u === n)return g.set(t, {key: v, text: w.slice(o), inlineStyles: x.slice(o), entities: y.slice(o)});
            if (u === p)return g.set(t, {key: v, text: w.slice(0, q), inlineStyles: x.slice(0, q), entities: y.slice(0, q)});
            return g.set(t, {key: v});
        }, n, p);
    }

    e.exports = k;
}, null);
__d("AbstractTextEditorPlaceholder.Experimental.react", ["EditorState", "React", "cx"], function (a, b, c, d, e, f, g, h, i) {
    var j = h.PropTypes, k = h.createClass({displayName: 'AbstractTextEditorPlaceholder', propTypes: {editorState: j.instanceOf(g).isRequired, text: j.string.isRequired}, shouldComponentUpdate: function (l, m) {
        if (this.props.text !== l.text)return true;
        var n = this.props.editorState, o = l.editorState, p = n.getSelection(), q = o.getSelection();
        return (p.hasFocus() !== q.hasFocus());
    }, render: function () {
        var l = this.props.editorState.getSelection().hasFocus(), m = (("_5ywb") + (l ? ' ' + "_5ywc" : ''));
        return (h.createElement(h.DOM.div, {className: m}, this.props.text));
    }});
    e.exports = k;
}, null);
__d("getDefaultKeyBinding", ["DocumentCommands", "Keys", "UserAgent_DEPRECATED"], function (a, b, c, d, e, f, g, h, i) {
    var j = i.osx(), k = i.windows(), l = i.firefox(), m = j && l && l < 29;

    function n(u) {
        return u.ctrlKey && !u.altKey;
    }

    function o(u) {
        return j ? (u.metaKey && !u.altKey) : n(u);
    }

    function p(u) {
        return (j && u.altKey) || n(u);
    }

    function q(u) {
        if (o(u))return u.shiftKey ? g.REDO : g.UNDO;
    }

    function r(u) {
        if (k && u.shiftKey)return null;
        return p(u) ? g.DELETE_WORD : g.DELETE;
    }

    function s(u) {
        if (o(u) && j)return g.BACKSPACE_TO_END_OF_BLOCK;
        return p(u) ? g.BACKSPACE_WORD : g.BACKSPACE;
    }

    function t(u) {
        switch (u.keyCode) {
            case 66:
                return o(u) ? g.BOLD : null;
            case 68:
                return n(u) ? g.DELETE : null;
            case 72:
                return n(u) ? g.BACKSPACE : null;
            case 73:
                return o(u) ? g.ITALIC : null;
            case 74:
                return o(u) ? g.CODE : null;
            case 75:
                return n(u) ? g.DELETE_TO_END_OF_BLOCK : null;
            case 79:
                return n(u) ? g.INSERT_BLOCK_DELIMITER : null;
            case 84:
                return n(u) ? g.TRANSPOSE_CHARACTERS : null;
            case 85:
                return o(u) ? g.UNDERLINE : null;
            case 90:
                return q(u) || null;
            case h.DELETE:
                return r(u);
            case h.BACKSPACE:
                return s(u);
            case h.LEFT:
                return (m && o(u) ? g.MOVE_SELECTION_TO_START_OF_BLOCK : null);
            case h.RIGHT:
                return (m && o(u) ? g.MOVE_SELECTION_TO_END_OF_BLOCK : null);
            default:
                return null;
        }
    }

    e.exports = t;
}, null);
__d("AbstractTextEditorProps.Experimental", ["EditorState", "React", "emptyFunction", "getDefaultKeyBinding"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = i.thatReturns(''), l = h.PropTypes, m = {propTypes: {editorState: l.instanceOf(g).isRequired, placeholder: l.string, textAlignment: l.oneOf(['left', 'center', 'right']), blockStyleFn: l.func, inlineStyleFn: l.func, keyBindingFn: l.func, spellCheck: l.bool, handleReturn: l.func, handleKeyCommand: l.func, handlePastedFiles: l.func, onEscape: l.func, onTab: l.func, onUpArrow: l.func, onDownArrow: l.func, onBlur: l.func, onFocus: l.func}, getDefaultProps: function () {
        return {blockStyleFn: k, inlineStyleFn: k, keyBindingFn: j, spellCheck: false};
    }};
    e.exports = m;
}, null);
__d("ElementForBlockType", ["ComposedBlockType", "React"], function (a, b, c, d, e, f, g, h) {
    var i = {getElement: function (j) {
        switch (j) {
            case g.HEADER_ONE:
                return h.DOM.h2;
            case g.HEADER_TWO:
                return h.DOM.h3;
            case g.UNORDERED_LIST_ITEM:
            case g.ORDERED_LIST_ITEM:
                return h.DOM.li;
            case g.BLOCKQUOTE:
                return h.DOM.blockquote;
            case g.MEDIA:
                return h.DOM.figure;
            default:
                return h.DOM.div;
        }
    }, getWrapperElement: function (j) {
        switch (j) {
            case g.UNORDERED_LIST_ITEM:
                return h.DOM.ul;
            case g.ORDERED_LIST_ITEM:
                return h.DOM.ol;
            case g.CODE:
                return h.DOM.pre;
            default:
                return null;
        }
    }};
    e.exports = i;
}, null);
__d("TextEditorTextNode.react", ["DOMPropertyOperations", "ReactBrowserComponentMixin", "ReactComponent", "ReactDescriptor", "UserAgent_DEPRECATED", "escapeTextForBrowser", "getTextContentAccessor", "mixInto"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    "use strict";
    var o = k.ie() <= 11, p = i.BackendIDOperations, q = m();

    function r(z) {
        return o ? z[q] === '\n' : z.tagName === 'BR';
    }

    function s(z) {
        p.dangerouslyReplaceNodeWithMarkupByID(z, o ? v(z) : u(z));
    }

    function t(z, aa) {
        if (o) {
            p.updateTextContentByID(z, aa);
        } else p.dangerouslyReplaceNodeWithMarkupByID(z, w(z, aa));
    }

    function u(z) {
        return '<br ' + g.createMarkupForID(z) + ' />';
    }

    function v(z) {
        return w(z, '\n');
    }

    function w(z, aa) {
        return ('<span ' + g.createMarkupForID(z) + '>' + l(aa) + '</span>');
    }

    var x = function (z) {
    };
    n(x, i.Mixin);
    n(x, h);
    n(x, {mountComponent: function (z, aa, ba) {
        i.Mixin.mountComponent.call(this, z, aa, ba);
        if (this.props === '')return (o ? v(z) : u(z));
        return w(z, this.props);
    }, receiveComponent: function (z, aa) {
        var ba = this._rootNodeID, ca = z.props, da = this.getDOMNode();
        if (r(da)) {
            if (ca !== '') {
                this.props = ca;
                t(ba, ca);
            }
            return;
        }
        if (ca === '') {
            this.props = ca;
            s(ba);
            return;
        }
        var ea = this.getDOMNode()[q];
        if (ca !== ea)p.updateTextContentByID(ba, ca);
    }, type: x});
    var y = function (z) {
        return new j(x, null, null, null, null, z);
    };
    y.type = x;
    e.exports = y;
}, null);
__d("TextEditorLeaf.Experimental.react", ["DocumentCharacters", "React", "SelectionState", "TextEditorTextNode.react", "endsWith", "setDocumentSelectionExperimental"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    var m = h.PropTypes, n = g.SOFT_NEWLINE, o = 3, p = h.createClass({displayName: 'TextEditorLeaf', propTypes: {selection: m.instanceOf(i), start: m.number.isRequired, blockKey: m.string.isRequired, text: m.string.isRequired, style: m.number, inlineStyleFn: m.func.isRequired, isLast: m.bool.isRequired}, _setSelection: function () {
        var q = this.props.selection;
        if (q == null || !q.hasFocus())return;
        var r = this.props.start, s = r + this.props.text.length, t = this.props.blockKey;
        if (!q.hasEdgeWithin(t, r, s))return;
        var u = this.getDOMNode(), v = u.firstChild, w;
        if (v.nodeType === o) {
            w = v;
        } else if (v.tagName === 'BR') {
            w = u;
        } else w = v.firstChild;
        l(q, w, t, r, s);
    }, shouldComponentUpdate: function (q) {
        return (this.refs.leaf.getDOMNode().textContent !== q.text || q.forceSelection);
    }, componentDidUpdate: function () {
        this._setSelection();
    }, componentDidMount: function () {
        this._setSelection();
    }, render: function () {
        var q = this.props.text;
        if (k(q, n) && this.props.isLast)q += n;
        var r;
        if (this.props.style)r = this.props.inlineStyleFn(this.props.style);
        return (h.createElement(h.DOM.span, {'data-offset-key': this.props.offsetKey, className: r, ref: "leaf"}, j(q)));
    }});
    e.exports = p;
}, null);
__d("TextEditorBlock.Experimental.react", ["ContentBlock", "DocumentCompositeDecorator.Experimental", "DocumentOffsetKey", "ElementForBlockType", "React", "SelectionState", "TextEditorLeaf.Experimental.react", "UnicodeBidiDirection", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = k.PropTypes, r = n.LTR, s = n.RTL, t = k.createClass({displayName: 'TextEditorBlock', propTypes: {block: q.instanceOf(g).isRequired, tree: q.array.isRequired, selection: q.instanceOf(l).isRequired, decorator: q.instanceOf(h), forceSelection: q.bool.isRequired, direction: q.string.isRequired, blockPropTypes: q.object, blockStyleFn: q.func.isRequired, inlineStyleFn: q.func.isRequired}, shouldComponentUpdate: function (v) {
        return (this.props.block !== v.block || this.props.tree !== v.tree || this.props.direction !== v.direction || (u(v.selection, v.block.getKey()) && v.forceSelection));
    }, _renderChildren: function () {
        var v = this.props.block, w = v.getKey(), x = v.getText(), y = v.getInlineStyles(), z = v.getEntities(), aa = this.props.tree.length - 1, ba = u(this.props.selection, w);
        return this.props.tree.map(function (ca, da) {
            var ea = ca.leaves.map(function (ia, ja) {
                var ka = i.encode(w, da, ja);
                return (k.createElement(m, {key: ka, offsetKey: ka, blockKey: w, start: ia.start, selection: ba ? this.props.selection : null, forceSelection: this.props.forceSelection, text: x.slice(ia.start, ia.end), style: y[ia.start], inlineStyleFn: this.props.inlineStyleFn, isLast: da === aa}));
            }.bind(this));
            if (ca.decoratorKey === null)return ea;
            var fa = this.props.decorator.getComponentForKey(ca.decoratorKey), ga = this.props.decorator.getPropsForKey(ca.decoratorKey), ha = i.encode(w, da, 0);
            return (k.createElement(fa, Object.assign({}, ga, {key: ha, entityKey: z[ca.start], offsetKey: ha}), ea));
        }.bind(this));
    }, render: function () {
        var v = this.props.block, w = v.getKey(), x = p(this.props.blockStyleFn(v.getType()), (("_209g") + (this.props.direction === r ? ' ' + "_2vxa" : '') + (this.props.direction === s ? ' ' + "_2vxb" : ''))), y = j.getElement(v.getType());
        return (k.createElement(y, Object.assign({style: {position: 'relative'}, 'data-offset-key': i.encode(w, 0, 0), className: x}, this.props.blockProps), this._renderChildren()));
    }});

    function u(v, w) {
        return (v.getAnchorKey() === w || v.getFocusKey() === w);
    }

    e.exports = t;
}, null);
__d("TextEditorCompositionHandler.Experimental", ["ComposedInlineStyle", "DocumentModifierExperimental", "EditorChangeType", "EditorState", "Keys", "isSelectionAtLeafStartExperimental", "setImmediate"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = g.NONE, o = {onBeforeInput: function (p) {
        this._textInputData = (this._textInputData || '') + p.data;
    }, onCompositionStart: function () {
        this._stillComposing = true;
    }, onCompositionEnd: function (p) {
        this._resolved = false;
        this._stillComposing = false;
        m(function () {
            if (!this._resolved)o.resolveComposition.call(this);
        }.bind(this));
    }, onKeyDown: function (p) {
        if (p.which === k.RIGHT || p.which === k.LEFT)p.preventDefault();
    }, onKeyPress: function (p) {
        if (p.which === k.RETURN)p.preventDefault();
    }, resolveComposition: function () {
        if (this._stillComposing)return;
        this._resolved = true;
        var p = this._textInputData;
        this._textInputData = '';
        var q = j.set(this.props.editorState, {inCompositionMode: false}), r = !p || l(q);
        if (r)this.restoreEditorDOM();
        this.exitCurrentMode();
        this.removeRenderGuard();
        if (p) {
            var s = h.replaceText(q.getCurrentContent(), q.getSelection(), p, n, null);
            this.update(j.push(q, s, i.INSERT_CHARACTERS));
            return;
        }
        if (r)this.update(j.set(q, {nativelyRenderedKey: null, forceSelection: true}));
    }};
    e.exports = o;
}, null);
__d("TextEditorModes", [], function (a, b, c, d, e, f) {
    var g = {EDIT: 0, COMPOSITE: 1, DRAG: 2, RENDER: 3, CUT: 4};
    e.exports = g;
}, null);
__d("getSafeBodyFromHTML", [], function (a, b, c, d, e, f) {
    function g(h) {
        var i, j = null;
        if (document.implementation && document.implementation.createHTMLDocument) {
            i = document.implementation.createHTMLDocument('foo');
            i.documentElement.innerHTML = h;
            j = i.getElementsByTagName('body')[0];
        }
        return j;
    }

    e.exports = g;
}, null);
__d("TextEditorPasteHandler", ["ComposedBlockType", "ComposedInlineStyle", "ContentBlock", "DocumentCharacters", "arrayContains", "fillArray", "generateBlockKey", "getSafeBodyFromHTML"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = h.BOLD, p = h.ITALIC, q = h.UNDERLINE, r = h.NONE, s = j.BLOCK_DELIMITER, t = '&nbsp;', u = j.SOFT_NEWLINE, v = ' ', w = g.UNSTYLED, x = ['p', 'h1', 'h2', 'h3', 'li', 'blockquote'], y = {strong: o, b: o, em: p, i: p, u: q};

    function z() {
        return {text: '', inlines: [], blocks: []};
    }

    function aa() {
        return {text: v, inlines: [r], blocks: []};
    }

    function ba() {
        return {text: u, inlines: [r], blocks: []};
    }

    function ca(ka) {
        return {text: s, inlines: [r], blocks: [ka]};
    }

    function da(ka, la) {
        switch (ka) {
            case 'h1':
                return g.HEADER_ONE;
            case 'h2':
                return g.HEADER_TWO;
            case 'li':
                if (la === 'ol')return g.ORDERED_LIST_ITEM;
                return g.UNORDERED_LIST_ITEM;
            case 'blockquote':
                return g.BLOCKQUOTE;
            case 'pre':
                return g.CODE;
            default:
                return g.UNSTYLED;
        }
    }

    function ea(ka, la, ma) {
        var na = y[ka];
        if (na) {
            ma |= na;
        } else if (la.style) {
            ma |= la.style.fontWeight === 'bold' ? o : 0;
            ma |= la.style.fontStyle === 'italic' ? p : 0;
            ma |= la.style.textDecoration === 'underline' ? q : 0;
        }
        return ma;
    }

    function fa(ka, la) {
        if (ka.text.slice(-1) === s && la.text.slice(0, 1) === s) {
            ka.text = ka.text.slice(0, -1);
            ka.inlines.pop();
            ka.blocks.pop();
        }
        if (ka.text.slice(-1) === s && (la.text === v || la.text === u))return ka;
        return {text: ka.text + la.text, inlines: ka.inlines.concat(la.inlines), blocks: ka.blocks.concat(la.blocks)};
    }

    function ga(ka) {
        return x.some(function (la) {
            return ka.indexOf('<' + la) !== -1;
        });
    }

    function ha(ka, la, ma, na, oa) {
        var pa = ka.nodeName.toLowerCase(), qa = false;
        if (pa === "#text") {
            var ra = ka.textContent;
            if (ra.trim() === '')return aa();
            return {text: ra, inlines: l(ra.length, la), blocks: []};
        }
        if (pa === "br")return ba();
        var sa = z(), ta;
        la = ea(pa, ka, la);
        if (pa === "ul" || pa === "ol")ma = pa;
        if (!na && k(oa, pa)) {
            sa = ca(da(pa, ma));
            na = true;
            qa = true;
        }
        ka = ka.firstChild;
        while (ka) {
            ta = ha(ka, la, ma, na, oa);
            sa = fa(sa, ta);
            ka = ka.nextSibling;
        }
        if (qa)sa = fa(sa, ca(w));
        return sa;
    }

    function ia(ka) {
        ka = ka.trim().replace(s, '').replace(u, v).replace(t, v);
        var la = n(ka);
        if (!la)return null;
        var ma = ga(ka) ? x : ['div'], na = ha(la, 0, 'ul', false, ma);
        if (na.text.indexOf(s) === 0)na = {text: na.text.slice(1), inlines: na.inlines.slice(1), blocks: na.blocks};
        if (na.text.slice(-1) === s) {
            na.text = na.text.slice(0, -1);
            na.inlines = na.inlines.slice(0, -1);
            na.blocks.pop();
        }
        if (na.blocks.length === 0)na.blocks.push(w);
        if (na.text.split(s).length === na.blocks.length + 1)na.blocks.unshift(w);
        return na;
    }

    var ja = {processHTML: function (ka) {
        return ia(ka);
    }, processHTMLAsImmutable: function (ka) {
        var la = ia(ka);
        if (!la)return null;
        var ma = 0;
        return la.text.split(s).map(function (na, oa) {
            var pa = ma + na.length, qa = i.create({key: m(), type: la.blocks[oa], text: na, inlineStyles: la.inlines.slice(ma, pa), entities: l(na.length, null)});
            ma = pa + 1;
            return qa;
        });
    }, processText: function (ka) {
        return {text: ka, inlines: l(ka.length, r), blocks: l(ka.split(s).length, w)};
    }, processTextAsImmutable: function (ka) {
        return ka.map(function (la) {
            return i.create({key: m(), type: w, text: la, inlineStyles: l(la.length, r), entities: l(la.length, null)});
        });
    }};
    e.exports = ja;
}, null);
__d("VersionRange", ["invariant"], function (a, b, c, d, e, f, g) {
    'use strict';
    var h = /\./, i = /\|\|/, j = /\s+\-\s+/, k = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/, l = /^(\d*)(.*)/;

    function m(ea, fa) {
        var ga = ea.split(i);
        if (ga.length > 1) {
            return ga.some(function (ha) {
                return da.contains(ha, fa);
            });
        } else {
            ea = ga[0].trim();
            return n(ea, fa);
        }
    }

    function n(ea, fa) {
        var ga = ea.split(j);
        g(ga.length > 0 && ga.length <= 2);
        if (ga.length === 1) {
            return o(ga[0], fa);
        } else {
            var ha = ga, ia = ha[0], ja = ha[1];
            g(x(ia) && x(ja));
            return (o('>=' + ia, fa) && o('<=' + ja, fa));
        }
    }

    function o(ea, fa) {
        ea = ea.trim();
        if (ea === '')return true;
        var ga = fa.split(h), ha = v(ea), ia = ha.modifier, ja = ha.rangeComponents;
        switch (ia) {
            case '<':
                return p(ga, ja);
            case '<=':
                return q(ga, ja);
            case '>=':
                return s(ga, ja);
            case '>':
                return t(ga, ja);
            case '~':
            case '~>':
                return u(ga, ja);
            default:
                return r(ga, ja);
        }
    }

    function p(ea, fa) {
        return ca(ea, fa) === -1;
    }

    function q(ea, fa) {
        var ga = ca(ea, fa);
        return ga === -1 || ga === 0;
    }

    function r(ea, fa) {
        return ca(ea, fa) === 0;
    }

    function s(ea, fa) {
        var ga = ca(ea, fa);
        return ga === 1 || ga === 0;
    }

    function t(ea, fa) {
        return ca(ea, fa) === 1;
    }

    function u(ea, fa) {
        var ga = fa.slice(), ha = fa.slice();
        if (ha.length > 1)ha.pop();
        var ia = ha.length - 1, ja = parseInt(ha[ia], 10);
        if (w(ja))ha[ia] = ja + 1 + '';
        return (s(ea, ga) && p(ea, ha));
    }

    function v(ea) {
        var fa = ea.split(h), ga = fa[0].match(k);
        g(ga);
        return {modifier: ga[1], rangeComponents: [ga[2]].concat(fa.slice(1))};
    }

    function w(ea) {
        return !isNaN(ea) && isFinite(ea);
    }

    function x(ea) {
        return !v(ea).modifier;
    }

    function y(ea, fa) {
        for (var ga = ea.length; ga < fa; ga++)ea[ga] = '0';
    }

    function z(ea, fa) {
        ea = ea.slice();
        fa = fa.slice();
        y(ea, fa.length);
        for (var ga = 0; ga < fa.length; ga++) {
            var ha = fa[ga].match(/^[x*]$/i);
            if (ha) {
                fa[ga] = ea[ga] = '0';
                if (ha[0] === '*' && ga === fa.length - 1)for (var ia = ga; ia < ea.length; ia++)ea[ia] = '0';
            }
        }
        y(fa, ea.length);
        return [ea, fa];
    }

    function aa(ea, fa) {
        var ga = ea.match(l)[1], ha = fa.match(l)[1], ia = parseInt(ga, 10), ja = parseInt(ha, 10);
        if (w(ia) && w(ja) && ia !== ja) {
            return ba(ia, ja);
        } else return ba(ea, fa);
    }

    function ba(ea, fa) {
        g(typeof ea === typeof fa);
        if (ea > fa) {
            return 1;
        } else if (ea < fa) {
            return -1;
        } else return 0;
    }

    function ca(ea, fa) {
        var ga = z(ea, fa), ha = ga[0], ia = ga[1];
        for (var ja = 0; ja < ia.length; ja++) {
            var ka = aa(ha[ja], ia[ja]);
            if (ka)return ka;
        }
        return 0;
    }

    var da = {contains: function (ea, fa) {
        return m(ea.trim(), fa.trim());
    }};
    e.exports = da;
}, null);
__d("UserAgent", ["UserAgentData", "VersionRange", "mapObject", "memoizeStringOnly"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    function k(n, o, p, q) {
        if (n === p)return true;
        if (!p.startsWith(n))return false;
        var r = p.slice(n.length);
        if (o) {
            r = q ? q(r) : r;
            return h.contains(r, o);
        }
        return false;
    }

    function l(n) {
        if (g.platformName === 'Windows')return n.replace(/^\s*NT/, '');
        return n;
    }

    var m = {isBrowser: function (n) {
        return k(g.browserName, g.browserFullVersion, n);
    }, isDevice: function (n) {
        return k(g.deviceName, null, n);
    }, isEngine: function (n) {
        return k(g.engineName, g.engineVersion, n);
    }, isPlatform: function (n) {
        return k(g.platformName, g.platformFullVersion, n, l);
    }};
    e.exports = i(m, j);
}, null);
__d("TextEditorEditHandler.Experimental", ["BlockTree", "ContentState", "DataTransfer", "DocumentCharacters", "DocumentCommands", "DocumentModifierExperimental", "DocumentOffsetKey", "DocumentRemovableWord", "DocumentRemovalDirection", "EditorChangeType", "EditorState", "ImmutableMap", "Keys", "SelectionState", "TextEditorModes", "TextEditorPasteHandler", "UnicodeUtils", "UserAgent", "areEqual", "findAncestorOffsetKey", "getActiveElement", "getContentStateFragment", "getDocumentSelectionExperimental", "getTextContentFromFiles", "isSelectionAtLeafStartExperimental"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea) {
    "use strict";
    var fa = j.SOFT_NEWLINE, ga = x.isBrowser('Safari'), ha = {onFocus: function (hb) {
        var ib = this.props.editorState, jb = ib.getSelection();
        if (jb.hasFocus())return;
        var kb = t.set(jb, {hasFocus: true});
        this.props.onFocus && this.props.onFocus(hb);
        this.update(q.updateSelection(ib, kb, false));
    }, onBlur: function (hb) {
        if (ga && aa() === document.body)a.getSelection().removeAllRanges();
        var ib = this.props.editorState, jb = ib.getSelection();
        if (!jb.hasFocus())return;
        var kb = t.set(jb, {hasFocus: false});
        this.props.onBlur && this.props.onBlur(hb);
        this.update(q.updateSelection(ib, kb, false));
    }, onBeforeInput: function (hb) {
        var ib = hb.data;
        if (!ib)return;
        var jb = this.props.editorState, kb = jb.getSelection();
        if (!kb.isCollapsed()) {
            hb.preventDefault();
            this.update(la(jb, ib, jb.getCurrentInlineStyle(), null));
            return;
        }
        var lb = !ea(jb), mb = la(jb, ib, jb.getCurrentInlineStyle(), null);
        if (!lb) {
            hb.preventDefault();
            this.update(mb);
            return;
        }
        var nb = kb.getAnchorKey(), ob = r.get(jb.getTreeMap(), nb), pb = g.getFingerprint(ob), qb = g.getFingerprint(r.get(mb.getTreeMap(), nb));
        if (gb(ib) || pb !== qb) {
            hb.preventDefault();
        } else mb = q.set(mb, {nativelyRenderedKey: mb.getCurrentKey()});
        this.update(mb);
    }, onSelect: function (hb) {
        if (this._blockSelectEvents)return;
        var ib = this.props.editorState, jb = ca(ib, this.refs.editorContainer.getDOMNode().firstChild), kb = jb.selectionState;
        if (kb !== ib.getSelection())this.update(q.updateSelection(ib, kb, !!jb.needsRecovery));
    }, onKeyDown: function (hb) {
        var ib = hb.which, jb = this.props.editorState;
        switch (ib) {
            case s.RETURN:
                hb.preventDefault();
                if (!this.props.handleReturn || !this.props.handleReturn(hb))this.update(va(jb));
                return;
            case s.ESC:
                hb.preventDefault();
                this.props.onEscape && this.props.onEscape(hb);
                return;
            case s.TAB:
                this.props.onTab && this.props.onTab(hb);
                return;
            case s.UP:
                this.props.onUpArrow && this.props.onUpArrow(hb);
                return;
            case s.DOWN:
                this.props.onDownArrow && this.props.onDownArrow(hb);
                return;
        }
        var kb = this.props.keyBindingFn(hb);
        if (!kb)return;
        hb.preventDefault();
        if (this.props.handleKeyCommand && this.props.handleKeyCommand(kb))return;
        if (kb === k.UNDO) {
            ja(jb, this.update);
            return;
        }
        var lb = ia(kb, jb);
        if (lb !== jb)this.update(lb);
    }, onCharacterData: function (hb) {
        var ib = z(hb), jb = this.props.editorState, kb = jb.getSelection(), lb = jb.getCurrentContent(), mb = jb.getTreeMap(), nb = m.decode(ib), ob = nb.blockKey, pb = r.get(mb, ob), qb = pb[nb.decoratorKey].leaves[nb.leafKey], rb = lb.getBlockForKey(ob);
        if (rb.getText().slice(qb.start, qb.end) === hb.textContent)return;
        var sb = t.set(jb.getSelection(), {anchorOffset: qb.start, focusOffset: qb.end, isBackward: false}), tb = l.replaceText(lb, sb, hb.textContent, rb.getInlineStyles()[qb.start], null), ub = ca(this.props.editorState, this.refs.editorContainer.getDOMNode().firstChild), vb = h.set(tb, {selectionBefore: kb, selectionAfter: ub.selectionState});
        this.update(q.push(jb, vb, p.INSERT_CHARACTERS));
    }, onDragStart: function (hb) {
        this._internalDrag = true;
        this.setMode(u.DRAG);
    }, onDragOver: function (hb) {
        this._internalDrag = false;
        this.setMode(u.DRAG);
        hb.preventDefault();
    }, onCompositionStart: function (hb) {
        this.setRenderGuard();
        this.captureEditorDOM();
        this.setMode(u.COMPOSITE);
        this.update(q.set(this.props.editorState, {inCompositionMode: true}));
    }, onCut: function (hb) {
        var ib = this.props.editorState, jb = ib.getSelection();
        if (jb.isCollapsed()) {
            hb.preventDefault();
            return;
        }
        this.setRenderGuard();
        this.captureEditorDOM();
        cb(ib, function (kb) {
            this._clipboard = kb;
            this.setMode(u.CUT);
            setTimeout(function () {
                this.restoreEditorDOM();
                this.removeRenderGuard();
                this.exitCurrentMode();
                this.update(bb(ib));
            }.bind(this), 0);
        }.bind(this));
    }, onCopy: function () {
        cb(this.props.editorState, function (hb) {
            this._clipboard = hb;
        }.bind(this));
    }, onPaste: function (hb) {
        hb.preventDefault();
        var ib = new i(hb.clipboardData);
        if (!ib.isRichText()) {
            var jb = ib.getFiles(), kb = ib.getText();
            if (jb.length > 0) {
                if (this.props.handlePastedFiles && this.props.handlePastedFiles(jb))return;
                da(jb, function (tb) {
                    tb = tb || kb;
                    if (!tb)return;
                    var ub = tb.split(fa), vb = v.processTextAsImmutable(ub), wb = this.props.editorState, xb = l.replaceWithFragment(wb.getCurrentContent(), wb.getSelection(), r.fromArray(vb, function (yb) {
                        return yb.getKey();
                    }));
                    this.update(q.push(wb, xb, p.INSERT_FRAGMENT));
                }.bind(this));
                return;
            }
        }
        var lb, mb = ib.getText();
        if (mb)lb = mb.split(fa);
        if (this._clipboard) {
            var nb = lb.filter(za), ob = r.toArray(r.map(this._clipboard, function (tb) {
                return tb.getText();
            })).filter(za), pb = y(nb, ob);
            if (pb) {
                this.update(ab(this.props.editorState, this._clipboard));
                return;
            }
        }
        var qb = ib.getHTML();
        if (qb) {
            var rb = v.processHTMLAsImmutable(qb);
            if (rb) {
                this.update(ab(this.props.editorState, r.fromArray(rb, function (tb) {
                    return tb.getKey();
                })));
                return;
            }
        }
        this._clipboard = null;
        if (lb) {
            var sb = v.processTextAsImmutable(lb);
            this.update(ab(this.props.editorState, r.fromArray(sb, function (tb) {
                return tb.getKey();
            })));
        }
    }};

    function ia(hb, ib) {
        switch (hb) {
            case k.UNDO:
                return ja(ib);
            case k.REDO:
                return ka(ib);
            case k.DELETE:
                return na(ib);
            case k.DELETE_WORD:
                return oa(ib);
            case k.DELETE_TO_END_OF_BLOCK:
                return pa(ib);
            case k.BACKSPACE:
                return qa(ib);
            case k.BACKSPACE_WORD:
                return ta(ib);
            case k.BACKSPACE_TO_END_OF_BLOCK:
                return ua(ib);
            case k.INSERT_BLOCK_DELIMITER:
                return va(ib);
            case k.TRANSPOSE_CHARACTERS:
                return wa(ib);
            case k.MOVE_SELECTION_TO_START_OF_BLOCK:
                return xa(ib);
            case k.MOVE_SELECTION_TO_END_OF_BLOCK:
                return ya(ib);
            default:
                return ib;
        }
    }

    function ja(hb, ib) {
        var jb = q.undo(hb);
        if (!hb.getNativelyRenderedKey()) {
            ib(jb);
            return;
        }
        ib(q.set(hb, {nativelyRenderedKey: null}));
        setTimeout(function () {
            ib(jb);
        });
    }

    function ka(hb) {
        return q.redo(hb);
    }

    function la(hb, ib, jb, kb) {
        var lb = l.replaceText(hb.getCurrentContent(), hb.getSelection(), ib, jb, kb || null);
        return q.push(hb, lb, p.INSERT_CHARACTERS);
    }

    function ma(hb, ib, jb) {
        var kb = hb.getSelection(), lb = hb.getCurrentContent(), mb = kb;
        if (kb.isCollapsed()) {
            if (jb === o.FORWARD) {
                if (hb.isAtDocumentEnd())return lb;
            } else if (hb.isAtDocumentStart())return lb;
            mb = ib(hb);
            if (mb === kb)return lb;
        }
        return l.removeRange(lb, mb, jb);
    }

    function na(hb) {
        var ib = ma(hb, function (kb) {
            var lb = kb.getSelection(), mb = kb.getCurrentContent(), nb = lb.getAnchorKey(), ob = lb.getAnchorOffset(), pb = mb.getBlockForKey(nb).getText()[ob];
            return sa(kb, pb ? w.getUTF16Length(pb, 0) : 1);
        }, o.FORWARD);
        if (ib === hb.getCurrentContent())return hb;
        ib = h.set(ib, {selectionBefore: hb.getSelection()});
        var jb = hb.getSelection().isCollapsed() ? p.DELETE_CHARACTER : p.REMOVE_RANGE;
        return q.push(hb, ib, jb);
    }

    function oa(hb) {
        var ib = ma(hb, function (jb) {
            var kb = jb.getSelection(), lb = kb.getStartOffset(), mb = kb.getStartKey(), nb = jb.getCurrentContent(), ob = nb.getBlockForKey(mb).getText().slice(lb), pb = n.getForward(ob) || '';
            return sa(jb, pb.length || 1);
        }, o.FORWARD);
        if (ib === hb.getCurrentContent())return hb;
        return q.push(hb, ib, p.REMOVE_RANGE);
    }

    function pa(hb) {
        var ib = ma(hb, function (jb) {
            var kb = jb.getSelection(), lb = kb.getStartOffset(), mb = kb.getStartKey(), nb = jb.getCurrentContent(), ob = nb.getBlockForKey(mb).getText();
            if (lb === ob.length)return sa(jb, 1);
            return t.set(kb, {focusOffset: ob.length});
        }, o.FORWARD);
        if (ib === hb.getCurrentContent())return hb;
        return q.push(hb, ib, p.REMOVE_RANGE);
    }

    function qa(hb) {
        var ib = ma(hb, function (kb) {
            var lb = kb.getSelection(), mb = kb.getCurrentContent(), nb = lb.getAnchorKey(), ob = lb.getAnchorOffset(), pb = mb.getBlockForKey(nb).getText()[ob - 1];
            return ra(kb, pb ? w.getUTF16Length(pb, 0) : 1);
        }, o.BACKWARD);
        if (ib === hb.getCurrentContent())return hb;
        ib = h.set(ib, {selectionBefore: hb.getSelection()});
        var jb = hb.getSelection().isCollapsed() ? p.BACKSPACE_CHARACTER : p.REMOVE_RANGE;
        return q.push(hb, ib, jb);
    }

    function ra(hb, ib) {
        var jb = hb.getSelection(), kb = hb.getCurrentContent(), lb = jb.getStartKey(), mb = jb.getStartOffset(), nb = lb, ob;
        if (ib > mb) {
            var pb = kb.getKeyBefore(lb);
            nb = pb;
            var qb = kb.getBlockForKey(pb);
            ob = qb.getText().length;
        } else ob = mb - ib;
        return t.set(jb, {focusKey: nb, focusOffset: ob, isBackward: true});
    }

    function sa(hb, ib) {
        var jb = hb.getSelection(), kb = jb.getStartKey(), lb = jb.getStartOffset(), mb = hb.getCurrentContent(), nb = kb, ob, pb = mb.getBlockForKey(kb);
        if (ib > (pb.getText().length - lb)) {
            nb = mb.getKeyAfter(kb);
            ob = 0;
        } else ob = lb + ib;
        return t.set(jb, {focusKey: nb, focusOffset: ob});
    }

    function ta(hb) {
        var ib = ma(hb, function (jb) {
            var kb = jb.getSelection(), lb = kb.getStartOffset();
            if (lb === 0)return ra(jb, 1);
            var mb = kb.getStartKey(), nb = jb.getCurrentContent(), ob = nb.getBlockForKey(mb).getText().slice(0, lb), pb = n.getBackward(ob) || '';
            return ra(jb, pb.length || 1);
        }, o.BACKWARD);
        if (ib === hb.getCurrentContent())return hb;
        return q.push(hb, ib, p.REMOVE_RANGE);
    }

    function ua(hb) {
        var ib = ma(hb, function (jb) {
            var kb = jb.getSelection();
            if (kb.getStartOffset() === 0)return ra(jb, 1);
            return t.set(kb, {focusOffset: 0, isBackward: true});
        }, o.BACKWARD);
        if (ib === hb.getCurrentContent())return hb;
        return q.push(hb, ib, p.REMOVE_RANGE);
    }

    function va(hb) {
        var ib = l.splitBlock(hb.getCurrentContent(), hb.getSelection());
        return q.push(hb, ib, p.SPLIT_BLOCK);
    }

    function wa(hb) {
        return hb;
    }

    function xa(hb) {
        var ib = hb.getSelection(), jb = ib.getStartKey(), kb = t.set(ib, {anchorKey: jb, anchorOffset: 0, focusKey: jb, focusOffset: 0, isBackward: false});
        return q.set(hb, {selection: kb, forceSelection: true});
    }

    function ya(hb) {
        var ib = hb.getSelection(), jb = ib.getEndKey(), kb = hb.getCurrentContent(), lb = kb.getBlockForKey(jb), mb = lb.getText().length, nb = t.set(ib, {anchorKey: jb, anchorOffset: mb, focusKey: jb, focusOffset: mb, isBackward: false});
        return q.set(hb, {selection: nb, forceSelection: true});
    }

    function za(hb) {
        return hb.length > 0;
    }

    function ab(hb, ib) {
        var jb = l.replaceWithFragment(hb.getCurrentContent(), hb.getSelection(), ib);
        return q.push(hb, jb, p.INSERT_FRAGMENT);
    }

    function bb(hb) {
        var ib = l.removeRange(hb.getCurrentContent(), hb.getSelection(), o.FORWARD);
        return q.push(hb, ib, p.REMOVE_RANGE);
    }

    function cb(hb, ib) {
        var jb = hb.getSelection();
        if (!jb.isCollapsed())ib(ba(hb.getCurrentContent(), jb));
    }

    var db = '\'', eb = '\/', fb = x.isBrowser('Firefox');

    function gb(hb) {
        return (fb && (hb == db || hb == eb));
    }

    e.exports = ha;
}, null);
__d("TextEditorDragHandler", ["DataTransfer"], function (a, b, c, d, e, f, g) {
    function h(j, event) {
        var k, l;
        if (document.caretRangeFromPoint) {
            var m = document.caretRangeFromPoint(event.x, event.y);
            k = m.startContainer;
            l = m.startOffset;
        } else if (event.rangeParent) {
            k = event.rangeParent;
            l = event.rangeOffset;
        }
        if (k) {
            var n = document.createRange();
            n.setStart(j, 0);
            n.setEnd(k, l);
            var o = n.toString().length;
            n.detach();
            return o;
        }
    }

    var i = {onDragEnd: function () {
        this.exitCurrentMode();
    }, onDrop: function (j) {
        var k = new g(j.nativeEvent.dataTransfer), l = h(this.refs.editorContainer.getDOMNode(), j.nativeEvent);
        if (l != null) {
            var m = k.getFiles();
            if (this.props.onDropFiles && m.length > 0) {
                this.props.onDropFiles(l, m);
            } else if (this.props.onDropSelection && this._internalDrag) {
                this.props.onDropSelection(l);
            } else if (this.props.onDropText)this.props.onDropText(l, k.getText());
        }
        j.preventDefault();
        this.exitCurrentMode();
    }};
    e.exports = i;
}, null);
__d("UnicodeBidiService", ["Locale", "UnicodeBidi", "UnicodeBidiDirection", "invariant"], function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    function k(l) {
        if (!l)l = g.getDirection();
        j(i.isStrong(l));
        this.defaultDir = l;
        this.reset();
    }

    k.prototype.reset = function () {
        this.lastDir = this.defaultDir;
    };
    k.prototype.getDirection = function (l) {
        this.lastDir = h.getDirection(l, this.lastDir);
        return this.lastDir;
    };
    e.exports = k;
}, null);
__d("AbstractTextEditor.Experimental.react", ["AbstractTextEditorPlaceholder.Experimental.react", "AbstractTextEditorProps.Experimental", "DocumentOffsetKey", "DOMVector", "EditorState", "ElementForBlockType", "ImmutableMap", "React", "TextEditorBlock.Experimental.react", "TextEditorCompositionHandler.Experimental", "TextEditorEditHandler.Experimental", "TextEditorDragHandler", "TextEditorModes", "UnicodeBidiService", "UserAgent", "cx", "extendArray", "requestAnimationFrame", "setImmediate"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    "use strict";
    var z = a.MutationObserver || a.WebKitMutationObserver, aa = (u.isBrowser('Safari') || u.isBrowser('Mobile Safari'));

    function ba(ea) {
        return function (fa) {
            var ga = this._handler && this._handler[ea];
            ga && ga.call(this, fa);
        };
    }

    function ca(ea) {
        switch (ea) {
            case s.EDIT:
                return q;
            case s.COMPOSITE:
                return p;
            case s.DRAG:
                return r;
            case s.CUT:
            case s.RENDER:
                return null;
        }
    }

    var da = n.createClass({displayName: 'AbstractTextEditor', getDefaultProps: h.getDefaultProps, _onBlur: ba('onBlur'), _onFocus: ba('onFocus'), _onSelect: ba('onSelect'), _onKeyDown: ba('onKeyDown'), _onKeyUp: ba('onKeyUp'), _onKeyPress: ba('onKeyPress'), _onMouseDown: ba('onMouseDown'), _onMouseUp: ba('onMouseUp'), _onCharacterData: ba('onCharacterData'), _onCompositionStart: ba('onCompositionStart'), _onCompositionEnd: ba('onCompositionEnd'), _onDragStart: ba('onDragStart'), _onDragOver: ba('onDragOver'), _onDragEnd: ba('onDragEnd'), _onDrop: ba('onDrop'), _onCut: ba('onCut'), _onCopy: ba('onCopy'), _onPaste: ba('onPaste'), _onBeforeInput: ba('onBeforeInput'), _renderContents: function () {
        var ea = this.props.editorState, fa = this.props.blockComponent || o, ga = ea.getCurrentContent(), ha = ea.getSelection(), ia = ea.getCurrentKey(), ja = ea.mustForceSelection(), ka = ga.getBlocksAsArray(), la = [], ma = null, na = null, oa, pa, qa, ra, sa, ta, ua;
        for (var va = 0; va < ka.length; va++) {
            pa = ka[va];
            qa = pa.getKey();
            ra = pa.getText();
            sa = pa.getType();
            ta = n.createElement(fa, {currentEditorState: ia, key: qa, tree: m.get(ea.getTreeMap(), qa), decorator: ea.getDecorator(), block: pa, selection: ha, forceSelection: ja, direction: this._bidiService.getDirection(ra), blockProps: this.props.blockProps, blockStyleFn: this.props.blockStyleFn, inlineStyleFn: this.props.inlineStyleFn});
            ua = l.getWrapperElement(sa);
            if (ua) {
                if (na !== sa) {
                    oa = [];
                    ma = n.createElement(ua, {className: "_4noe", key: qa + '-wrap', 'data-offset-key': i.encode(qa, 0, 0)}, oa);
                    na = sa;
                    la.push(ma);
                }
                oa.push(ta);
            } else {
                oa = null;
                ma = null;
                na = null;
                la.push(ta);
            }
        }
        return la;
    }, _attachMutationObserver: function () {
        if (!z)return;
        var ea = [], fa = function () {
            if (ea.length > 1) {
                var ga = ea[0], ha = ga.target;
                y(function () {
                    if (this.isMounted() && ha.parentNode)this._onCharacterData(ha);
                }.bind(this));
            }
            ea.length = 0;
        }.bind(this);
        this._mutationObserver = new z(function (ga) {
            if (this._guardAgainstRender)return;
            if (aa) {
                if (ea.length === 0)x(fa);
                w(ea, ga);
            } else {
                ea = ga;
                fa();
            }
        }.bind(this));
        this._mutationObserver.observe(this.refs.editorContainer.getDOMNode(), {characterDataOldValue: true, characterData: true, subtree: true});
    }, _renderPlaceholder: function () {
        var ea = this.props.editorState.getCurrentContent(), fa = (this.props.placeholder && !this.props.editorState.isInCompositionMode() && !ea.hasText());
        if (fa)return (n.createElement(g, {text: this.props.placeholder, editorState: this.props.editorState, textAlignment: this.props.textAlignment}));
    }, render: function () {
        var ea = this.props.textAlignment, fa = (("_5yw9") + (ea === 'left' ? ' ' + "_48yc" : '') + (ea === 'right' ? ' ' + "_48yd" : '') + (ea === 'center' ? ' ' + "_48ye" : ''));
        return (n.createElement(n.DOM.div, {className: fa}, this._renderPlaceholder(), n.createElement(n.DOM.div, {className: "_5ywa", ref: "editorContainer"}, n.createElement(n.DOM.div, {ref: "editor", role: "textbox", className: "_54-z", onBlur: this._onBlur, onFocus: this._onFocus, onSelect: this._onSelect, onMouseUp: this._onMouseUp, onKeyDown: this._onKeyDown, onKeyUp: this._onKeyUp, onKeyPress: this._onKeyPress, onCut: this._onCut, onCopy: this._onCopy, onPaste: this._onPaste, onDragStart: this._onDragStart, onDragOver: this._onDragOver, onDragEnd: this._onDragEnd, onDrop: this._onDrop, onCompositionStart: this._onCompositionStart, onCompositionEnd: this._onCompositionEnd, onBeforeInput: this._onBeforeInput, spellCheck: this.props.spellCheck, contentEditable: true}, this._renderContents()))));
    }, focus: function () {
        var ea = this.props.editorState, fa = ea.getSelection().hasFocus(), ga = j.getScrollPosition();
        this.refs.editor.getDOMNode().focus();
        window.scrollTo(ga.x, ga.y);
        if (fa)return;
        this.update(k.moveFocusToEnd(ea));
    }, blur: function () {
        this.refs.editor.getDOMNode().blur();
    }, componentDidMount: function () {
        this._renderedVersion = null;
        this._clipboard = null;
        this._clonedEditor = null;
        this._guardAgainstRender = false;
        this._handler = q;
        this._attachMutationObserver();
    }, shouldComponentUpdate: function (ea) {
        if (ea.textAlignment !== this.props.textAlignment)return true;
        var fa = this.props.editorState, ga = ea.editorState, ha = fa.getSelection().hasFocus(), ia = ga.getSelection().hasFocus();
        if (ha !== ia)return true;
        var ja = ga.getNativelyRenderedKey(), ka = fa.isInCompositionMode(), la = ga.isInCompositionMode();
        if (fa === ga || (ja && ga.getCurrentKey() === ja) || (ka && la))return false;
        var ma = fa.getCurrentContent(), na = ga.getCurrentContent(), oa = fa.getTreeMap(), pa = ga.getTreeMap();
        return (ka !== la || ma !== na || oa !== pa || ga.mustForceSelection());
    }, componentWillUpdate: function (ea) {
        this._blockSelectEvents = true;
        this._bidiService.reset();
    }, componentDidUpdate: function () {
        this._blockSelectEvents = false;
    }, componentWillMount: function () {
        this._bidiService = new t();
    }, componentWillUnmount: function () {
        if (this._mutationObserver) {
            this._mutationObserver.disconnect();
            this._mutationObserver = null;
        }
    }, setMode: function (ea) {
        this._handler = ca(ea);
    }, exitCurrentMode: function () {
        this.setMode(s.EDIT);
    }, captureEditorDOM: function () {
        this._clonedEditor = this.refs.editor.getDOMNode().cloneNode(true);
    }, restoreEditorDOM: function () {
        var ea = this.refs.editorContainer.getDOMNode();
        ea.innerHTML = '';
        ea.appendChild(this._clonedEditor);
        this.focus();
        this._clonedEditor = null;
    }, setRenderGuard: function () {
        this._guardAgainstRender = true;
    }, removeRenderGuard: function () {
        this._guardAgainstRender = false;
    }, update: function (ea) {
        this.props.onChange(ea);
    }});
    e.exports = da;
}, null);
__d("isSoftNewlineEvent", ["Keys"], function (a, b, c, d, e, f, g) {
    function h(i) {
        return i.which === g.RETURN && (i.getModifierState('Shift') || i.getModifierState('Alt') || i.getModifierState('Control'));
    }

    e.exports = h;
}, null);
__d("TypeaheadNavigation", [], function (a, b, c, d, e, f) {
    var g = {moveUp: function (h, i, j) {
        var k = h.indexOf(i), l = k == -1 ? h.length - 1 : k - 1;
        j(l == -1 ? null : h[l]);
    }, moveDown: function (h, i, j) {
        var k = h.indexOf(i) + 1;
        j(k == h.length ? null : h[k]);
    }};
    e.exports = g;
}, null);
__d("TypeaheadViewItem", ["React", "SearchableEntry"], function (a, b, c, d, e, f, g, h) {
    var i = {entry: g.PropTypes.instanceOf(h).isRequired, highlighted: g.PropTypes.bool, selected: g.PropTypes.bool, onSelect: g.PropTypes.func.isRequired, onHighlight: g.PropTypes.func, onRenderHighlight: g.PropTypes.func}, j = {_onSelect: function (k) {
        this.props.onSelect(this.props.entry, k);
    }, _onHighlight: function (k) {
        if (this.props.onHighlight)this.props.onHighlight(this.props.entry, k);
    }, shouldComponentUpdate: function (k) {
        return (this.props.entry.getUniqueID() !== k.entry.getUniqueID() || this.props.highlighted !== k.highlighted || this.props.selected !== k.selected);
    }, componentDidMount: function () {
        if (this.props.highlighted && this.props.onRenderHighlight)this.props.onRenderHighlight(this.getDOMNode());
    }, componentDidUpdate: function () {
        if (this.props.highlighted && this.props.onRenderHighlight)this.props.onRenderHighlight(this.getDOMNode());
    }};
    e.exports = {propTypes: i, Mixin: j};
}, null);