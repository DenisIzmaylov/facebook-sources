/*!CK:3710936553!*//*1412036449,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["nLYPz"]);
}

__d("MercuryMessageSourceTags", [], function (a, b, c, d, e, f) {
    e.exports = {CHAT: "source:chat", EMAIL: "source:email", MESSENGER: "source:messenger", MOBILE: "source:mobile"};
}, null);
__d("MercuryTimePassed", [], function (a, b, c, d, e, f) {
    e.exports = {TODAY: 0, WEEK_AGO: 1, MONTH_AGO: 2, CURRENT_YEAR: 3, OTHER_YEAR: 4};
}, null);
__d("MessagingEvent", [], function (a, b, c, d, e, f) {
    e.exports = {DELETE: "delete", DELETE_MESSAGES: "delete_messages", DELIVER: "deliver", ERROR: "error", READ: "read", REPORT_SPAM: "report_spam", REPORT_SPAM_MESSAGES: "report_spam_messages", UNMARK_SPAM: "unmark_spam", SUBSCRIBE: "subscribe", CHANGE_MUTE_SETTINGS: "change_mute_settings", TAG: "tag", UNREAD: "unread", UNSUBSCRIBE: "unsubscribe", DELIVER_LOG: "deliver_log", MORE_THREADS: "more_threads", READ_ALL: "read_all", READ_RECEIPT: "read_receipt", DELIVERY_RECEIPT: "delivery_receipt", SENT_PUSH: "sent_push", DELIVER_FAST_PAST: "deliver_fast_path", MESSENGER_STATUS: "messenger_status", UPDATE_PINNED_THREADS: "update_pinned_threads"};
}, null);
__d("SplitImage.react", ["React", "Image.react", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = g.createClass({displayName: 'SplitImage', render: function () {
        var l = this.props.size;
        return (g.createElement(g.DOM.div, Object.assign({}, this.props, {className: j(this.props.className, "_55lt"), style: Object.assign({}, (this.props.style || {}), {width: l, height: l})}), this.renderImages()));
    }, renderImages: function () {
        if (!this.props.srcs)return null;
        var l = this.props.srcs, m = Array.isArray(l);
        if (!m || l.length == 1)return this.renderOne(m ? l[0] : l);
        return l.length == 2 ? this.renderTwo(l) : this.renderThree(l);
    }, renderOne: function (l) {
        return (g.createElement(h, {src: l, width: this.props.size, height: this.props.size, alt: ""}));
    }, renderTwo: function (l) {
        var m = this.props.size, n = Math.floor(m / 2), o = -Math.floor(n / 2), p = (("_55lu") + (this.props.border ? ' ' + "_57xo" : ''));
        return (g.createElement(g.DOM.div, null, g.createElement(g.DOM.div, {className: "_55lu", style: {width: n}}, g.createElement(h, {src: l[0], width: m, height: m, style: {marginLeft: o}})), g.createElement(g.DOM.div, {className: p, style: {width: n}}, g.createElement(h, {src: l[1], width: m, height: m, style: {marginLeft: o}}))));
    }, renderThree: function (l) {
        var m = this.props.size, n = Math.floor(m / 3 * 2), o = -Math.floor((m - n) / 2), p = Math.floor(m / 2), q = m - n, r = -Math.floor((p - q) / 2), s = (("_55lu") + (this.props.border ? ' ' + "_57pl" : '')), t = (("_55lu") + (this.props.border ? ' ' + "_57pm" : ''));
        return (g.createElement(g.DOM.div, null, g.createElement(g.DOM.div, {className: s, style: {width: n}}, g.createElement(h, {src: l[0], width: m, height: m, style: {marginLeft: o}})), g.createElement(g.DOM.div, {className: t, style: {width: q, height: p}}, g.createElement(h, {src: l[1], width: p, height: p, style: {marginLeft: r}})), g.createElement(g.DOM.div, {className: "_55lu", style: {width: q, height: p}}, g.createElement(h, {src: l[2], width: p, height: p, style: {marginLeft: r}}))));
    }});
    e.exports = k;
}, null);
__d("loadImage", [], function (a, b, c, d, e, f) {
    "use strict";
    function g(h, i) {
        var j = new Image();
        j.onload = function () {
            i(j.width, j.height, j);
        };
        j.src = h;
    }

    e.exports = g;
}, null);
__d("PhotoResizeMath", [], function (a, b, c, d, e, f) {
    var g = {getScaledPhotoDimensions: function (h, i, j, k, l) {
        var m = h / i, n = j / k;
        if (j && k && l === 'stretch')return {width: j, height: k};
        if ((!j && k) || ((l === 'contain') !== (m >= n)))return {width: k * m, height: k};
        if (j)return {width: j, height: j / m};
        return {width: h, height: i};
    }};
    e.exports = g;
}, null);
__d("PixelzFocus", [], function (a, b, c, d, e, f) {
    "use strict";
    var g = {search: function (h, i) {
        var j = 0, k = h.length - 1;
        while (j <= k) {
            var l = j + Math.floor((k - j) / 2), m = h[l];
            if (m > i) {
                k = l - 1;
            } else if (m < i) {
                j = l + 1;
            } else return l;
        }
        return Math.min(j, k);
    }, forceSpecificPoint: function (h, i, j) {
        var k = 1e-09, l = g.search(h, i - j - k) + 1, m = g.search(h, i + j);
        return h.slice(l, m + 1);
    }, findBiggestSets: function (h, i) {
        var j = [], k = -1;
        for (var l = 0; l < h.length; ++l) {
            var m = h[l], n = l, o = g.search(h, m + i), p = o - n;
            if (p > k)j = [];
            if (p >= k) {
                k = p;
                j.push({low: n, high: o});
            }
        }
        return j;
    }, getBestSet: function (h, i, j) {
        var k = -1, l = null;
        for (var m = 0; m < i.length; ++m) {
            var n = i[m], o = h[n.low], p = h[n.high], q = o + (p - o) / 2, r = Math.min(o - (q - j), (q + j) - p);
            if (r > k) {
                k = r;
                l = n;
            }
        }
        return l;
    }, getFocusFromSet: function (h, i) {
        var j = h[i.low], k = h[i.high];
        return j + (k - j) / 2;
    }, clampFocus: function (h, i) {
        var j = i / 2, k = 1 - (i / 2);
        if (h < j)return j;
        if (h > k)return k;
        return h;
    }, convertFromCenterToCSS: function (h, i) {
        if (Math.abs(1 - i) < 1e-05)return 0;
        return (h - i / 2) / (1 - i);
    }, convertFromCSSToCenter: function (h, i) {
        return h * (1 - i) + i / 2;
    }, getVisible: function (h, i) {
        if (h < i)return h / i;
        return i / h;
    }, getHidden: function (h, i) {
        return 1 - g.getVisible(h, i);
    }, focusHorizontally: function (h, i) {
        return h < i;
    }, convertVectorFromCenterToCSS: function (h, i, j) {
        var k = g.focusHorizontally(i, j), l;
        if (k) {
            l = h.x / 100;
        } else l = h.x / 100;
        var m = g.convertFromCenterToCSS(l, g.getVisible(i, j));
        if (k) {
            return {x: m, y: 0};
        } else return {x: 0, y: m};
    }, getCropRect: function (h, i, j) {
        var k = g.focusHorizontally(i, j), l = g.getVisible(i, j);
        if (k) {
            var m = (1 - l) * h.x;
            return {left: m, top: 0, width: l, height: 1};
        } else {
            var n = (1 - l) * h.y;
            return {left: 0, top: n, width: 1, height: l};
        }
    }};
    e.exports = g;
}, null);
__d("Pixelz.react", ["arrayContains", "copyProperties", "cx", "loadImage", "joinClasses", "React", "PhotoResizeMath", "PixelzFocus"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    "use strict";
    var o = l.PropTypes, p = l.createClass({displayName: 'Pixelz', propTypes: {width: o.number, height: o.number, resizeMode: o.oneOf(['contain', 'cover', 'stretch']), alt: o.string, letterbox: o.bool, borderRadius: o.number, insetBorderColor: o.string, animated: o.bool, upscale: o.bool, cropRect: function (q, r, s) {
        var t = q[r], u = 'Invalid prop `' + r + '` supplied to `' + s + '`, expected a rectangle with values normalized ' + 'between 0 and 1.';
        if (t.left < 0 || t.top < 0 || t.width < 0 || t.height < 0 || t.left + t.width > 1 || t.top + t.height > 1)return new Error(u);
    }, focus: function (q, r, s) {
        var t = q[r], u = 'Invalid prop `' + r + '` supplied to `' + s + '`, expected either a {x, y, type} vector where type ' + 'is `css` or `center` or an array of {x, y} vectors. All the vectors ' + 'have with values normalized between 0 and 1.';
        if (Array.isArray(t)) {
            for (var v = 0; v < t.length; ++v)if (!(t[v].x >= 0 && t[v].x <= 1) || !(t[v].y >= 0 && t[v].y <= 1))return new Error(u);
        } else {
            if (!t.type)t.type = 'css';
            if (!(t.x >= 0 && t.x <= 1) || !(t.y >= 0 && t.y <= 1) || !g(['center', 'css'], t.type))return new Error(u);
        }
    }}, getDefaultProps: function () {
        return {resizeMode: 'cover', alt: '', letterbox: true, upscale: true, cropRect: {width: 1, height: 1, top: 0, left: 0}, focus: {x: .5, y: .5, type: 'css'}};
    }, getInitialState: function () {
        return {srcDimensions: {}};
    }, getSrcDimensions: function () {
        var q = this.props.src, r = this.state.srcDimensions[q];
        if (r)return r;
        j(q, function (s, t) {
            var u = {};
            u[q] = {width: s, height: t};
            this.isMounted() && this.setState({srcDimensions: u});
        }.bind(this));
        return null;
    }, getCropSrcDimensions: function () {
        var q = this.getSrcDimensions();
        return {width: q.width * this.props.cropRect.width, height: q.height * this.props.cropRect.height};
    }, getUpscaleCropDimensions: function () {
        var q = this.getCropSrcDimensions();
        return m.getScaledPhotoDimensions(q.width, q.height, this.props.width, this.props.height, this.props.resizeMode);
    }, getCropDimensions: function () {
        var q = this.getUpscaleCropDimensions(), r = this.getCropSrcDimensions();
        if (!this.props.upscale)return {width: Math.min(q.width, r.width), height: Math.min(q.height, r.height)};
        return q;
    }, getCropAspectRatio: function () {
        var q = this.getCropDimensions();
        return q.width / q.height;
    }, getContainerDimensions: function () {
        if (this.props.letterbox && this.props.width && this.props.height)return {width: this.props.width, height: this.props.height};
        return this.getCropDimensions();
    }, getContainerAspectRatio: function () {
        var q = this.getContainerDimensions();
        return q.width / q.height;
    }, getContainerPosition: function () {
        return {left: 0, top: 0};
    }, getFocus: function () {
        var q = this.props.focus;
        if (!Array.isArray(q) && q.type === 'css')return {x: q.x, y: q.y};
        var r = this.getContainerAspectRatio(), s = this.getCropAspectRatio(), t = n.getVisible(r, s), u = n.focusHorizontally(r, s), v;
        if (!Array.isArray(q)) {
            v = n.convertFromCenterToCSS(u ? q.x : q.y, t);
        } else {
            var w = q.map(function (z) {
                return u ? z.x : z.y;
            });
            w.sort();
            var x = n.findBiggestSets(w, t), y = n.getBestSet(w, x, t);
            v = n.getFocusFromSet(w, y);
        }
        return {x: u ? v : .5, y: u ? .5 : v};
    }, getCropPosition: function () {
        var q = this.getCropDimensions(), r = this.getContainerDimensions(), s = this.getFocus();
        return {left: s.x * (r.width - q.width), top: s.y * (r.height - q.height)};
    }, getScaleDimensions: function () {
        var q = this.getCropDimensions();
        return {width: q.width / this.props.cropRect.width, height: q.height / this.props.cropRect.height};
    }, getScalePosition: function () {
        var q = this.getScaleDimensions();
        return {left: -q.width * this.props.cropRect.left, top: -q.height * this.props.cropRect.top};
    }, getClipCropRectangle: function () {
        var q = this.getContainerDimensions(), r = this.getCropDimensions(), s = this.getContainerPosition(), t = this.getCropPosition(), u = Math.max(s.left, t.left), v = Math.max(s.top, t.top), w = Math.min(s.top + q.height, t.top + r.height), x = Math.min(s.left + q.width, t.left + r.width);
        return {left: u, top: v, width: x - u, height: w - v};
    }, getClipCropPosition: function () {
        var q = this.getClipCropRectangle();
        return {left: q.left, top: q.top};
    }, getClipCropDimensions: function () {
        var q = this.getClipCropRectangle();
        return {width: q.width, height: q.height};
    }, getClipScalePosition: function () {
        var q = this.getScalePosition(), r = this.getClipCropPosition(), s = this.getCropPosition();
        return {left: q.left + (s.left - r.left), top: q.top + (s.top - r.top)};
    }, getClipScaleDimensions: function () {
        return this.getScaleDimensions();
    }, areDimensionsEqual: function (q, r) {
        return q.width === r.width && q.height === r.height;
    }, shouldAddAllNodesAndStyles: function () {
        return this.props.animated;
    }, hasCrop: function () {
        if (this.shouldAddAllNodesAndStyles())return true;
        var q = this.getContainerDimensions(), r = this.getClipCropDimensions(), s = this.getClipScaleDimensions();
        if (this.areDimensionsEqual(q, r) || this.areDimensionsEqual(r, s))return false;
        return true;
    }, hasContainer: function () {
        if (this.shouldAddAllNodesAndStyles() || this.hasInsetBorder())return true;
        var q = this.getContainerDimensions(), r = this.getClipScaleDimensions();
        if (this.areDimensionsEqual(q, r))return false;
        return true;
    }, hasInsetBorder: function () {
        return this.shouldAddAllNodesAndStyles() || this.props.insetBorderColor;
    }, applyPositionStyle: function (q, r) {
        if (this.shouldAddAllNodesAndStyles() || r.left)q.left = Math.round(r.left);
        if (this.shouldAddAllNodesAndStyles() || r.top)q.top = Math.round(r.top);
    }, applyDimensionsStyle: function (q, r) {
        q.width = Math.round(r.width);
        q.height = Math.round(r.height);
    }, applyBorderRadiusStyle: function (q) {
        if (this.shouldAddAllNodesAndStyles() || this.props.borderRadius)q.borderRadius = this.props.borderRadius || 0;
    }, getScaleStyle: function () {
        var q = {}, r = this.getClipCropDimensions(), s = this.getClipScaleDimensions();
        if (this.shouldAddAllNodesAndStyles() || !this.areDimensionsEqual(r, s)) {
            this.applyPositionStyle(q, this.getClipScalePosition());
        } else this.applyPositionStyle(q, this.getClipCropPosition());
        this.applyDimensionsStyle(q, this.getClipScaleDimensions());
        this.applyBorderRadiusStyle(q);
        return q;
    }, getCropStyle: function () {
        var q = {};
        this.applyPositionStyle(q, this.getClipCropPosition());
        this.applyDimensionsStyle(q, this.getClipCropDimensions());
        this.applyBorderRadiusStyle(q);
        return q;
    }, getInsetBorderStyle: function () {
        var q = {borderColor: this.props.insetBorderColor || 'transparent'};
        this.applyPositionStyle(q, this.getClipCropPosition());
        this.applyDimensionsStyle(q, this.getClipCropDimensions());
        this.applyBorderRadiusStyle(q);
        return q;
    }, getContainerStyle: function () {
        var q = {};
        this.applyDimensionsStyle(q, this.getContainerDimensions());
        this.applyBorderRadiusStyle(q);
        return q;
    }, getScale: function () {
        var q = this.getScaleStyle(), r = q.width, s = q.height;
        q = h({}, q);
        delete q.width;
        delete q.height;
        return (l.createElement(l.DOM.img, Object.assign({}, this.props, {alt: this.props.alt, className: k(this.props.className, (("_56wb") + (this.shouldAddAllNodesAndStyles() ? ' ' + "_56t5" : ''))), src: this.props.src, style: Object.assign({}, (this.props.style || {}), q), width: r, height: s})));
    }, getCrop: function () {
        var q = this.getScale();
        if (!this.hasCrop())return q;
        return (l.createElement(l.DOM.div, {className: (("_56ma") + (this.shouldAddAllNodesAndStyles() ? ' ' + "_56t5" : '')), style: this.getCropStyle()}, q));
    }, getInsetBorder: function () {
        if (!this.hasInsetBorder())return null;
        return (l.createElement(l.DOM.div, {className: (("_56lv") + (this.shouldAddAllNodesAndStyles() ? ' ' + "_56t5" : '')), style: this.getInsetBorderStyle()}));
    }, getContainer: function () {
        var q = this.getCrop();
        if (!this.hasContainer())return q;
        var r = this.getInsetBorder();
        return (l.createElement(l.DOM.div, {className: (("_56jj") + (this.shouldAddAllNodesAndStyles() ? ' ' + "_56t5" : '')), style: this.getContainerStyle()}, q, r));
    }, render: function () {
        var q = this.getSrcDimensions();
        if (!q)return l.createElement(l.DOM.span, null);
        return this.getContainer();
    }});
    e.exports = p;
}, null);
__d("legacy:cookie", ["Cookie"], function (a, b, c, d, e, f, g) {
    a.getCookie = g.get;
    a.setCookie = g.set;
    a.clearCookie = g.clear;
}, 3);
__d("RangedCallbackManager", ["CallbackManagerController", "copyProperties", "createObjectFrom"], function (a, b, c, d, e, f, g, h, i) {
    var j = function (k, l, m) {
        this._resources = [];
        this._reachedEndOfArray = false;
        this._error = false;
        this._existingIDs = {};
        this._controller = new g(this._constructCallbackArg.bind(this));
        this._getValueHandler = k;
        this._compareValuesHandler = l;
        this._skipOnStrictHandler = m;
    };
    h(j.prototype, {executeOrEnqueue: function (k, l, m, n, o) {
        return this._controller.executeOrEnqueue({start: k, limit: l}, m, {strict: !!n, skipOnStrictHandler: o});
    }, unsubscribe: function (k) {
        this._controller.unsubscribe(k);
    }, getUnavailableResources: function (k) {
        var l = this._controller.getRequest(k), m = [];
        if (l && !this._reachedEndOfArray) {
            var n = l.request, o = this._filterForStrictResults(l.options), p = n.start + n.limit;
            for (var q = o.length; q < p; q++)m.push(q);
        }
        return m;
    }, addResources: function (k) {
        k.forEach(function (l) {
            if (!this._existingIDs[l]) {
                this._existingIDs[l] = true;
                this._resources.push(l);
                this._error = null;
            }
        }.bind(this));
        this.resortResources();
        this._controller.runPossibleCallbacks();
    }, addResourcesWithoutSorting: function (k, l) {
        var m = this._resources.slice(0, l);
        m = m.concat(k);
        m = m.concat(this._resources.slice(l));
        this._resources = m;
        h(this._existingIDs, i(k, true));
        this._error = null;
        this._controller.runPossibleCallbacks();
    }, removeResources: function (k) {
        k.forEach(function (l) {
            if (this._existingIDs[l]) {
                this._existingIDs[l] = false;
                var m = this._resources.indexOf(l);
                if (m != -1)this._resources.splice(m, 1);
            }
        }.bind(this));
    }, removeAllResources: function () {
        this._resources = [];
        this._existingIDs = {};
    }, resortResources: function () {
        this._resources = this._resources.sort(function (k, l) {
            return this._compareValuesHandler(this._getValueHandler(k), this._getValueHandler(l));
        }.bind(this));
    }, setReachedEndOfArray: function () {
        if (!this._reachedEndOfArray) {
            this._reachedEndOfArray = true;
            this._error = null;
            this._controller.runPossibleCallbacks();
        }
    }, hasReachedEndOfArray: function () {
        return this._reachedEndOfArray;
    }, setError: function (k) {
        if (this._error !== k) {
            this._error = k;
            this._controller.runPossibleCallbacks();
        }
    }, getError: function (k, l, m) {
        var n = this._filterForStrictResults({strict: m});
        return k + l > n.length ? this._error : null;
    }, hasResource: function (k) {
        return this._existingIDs[k];
    }, getResourceAtIndex: function (k) {
        return this._resources[k];
    }, getAllResources: function () {
        return this._resources.concat();
    }, getCurrentArraySize: function (k) {
        return this._filterForStrictResults(k).length;
    }, _filterForStrictResults: function (k) {
        var l = this._resources;
        if (k && k.strict) {
            var m = k.skipOnStrictHandler || this._skipOnStrictHandler;
            if (m)l = l.filter(m);
        }
        return l;
    }, _constructCallbackArg: function (k, l) {
        var m = this._filterForStrictResults(l);
        if (!this._reachedEndOfArray && !this._error && k.start + k.limit > m.length) {
            return false;
        } else {
            var n = m.slice(k.start, k.start + k.limit), o = k.start + k.limit > m.length ? this._error : null;
            return [n, o];
        }
    }, getElementsUntil: function (k) {
        var l = [];
        for (var m = 0; m < this._resources.length; m++) {
            var n = this._getValueHandler(this._resources[m]);
            if (this._compareValuesHandler(n, k) > 0)break;
            l.push(this._resources[m]);
        }
        return l;
    }});
    e.exports = j;
}, null);
__d("mergeObjects", ["copyProperties"], function (a, b, c, d, e, f, g) {
    function h() {
        var i = {};
        for (var j = 0; j < arguments.length; j++)g(i, arguments[j]);
        return i;
    }

    e.exports = h;
}, null);
__d("DateConsts", ["fbt"], function (a, b, c, d, e, f, g) {
    var h = 1000, i = 60, j = 60, k = 24, l = 7, m = 365.242, n = 12, o = i * j, p = o * k, q = p * m, r = h * p * l, s = h * p * m, t = "\u0414\u0435\u043d\u044c:", u = "\u041c\u0435\u0441\u044f\u0446:", v = "\u0413\u043e\u0434:", w = ["\u0412\u0441", "\u041f\u043d", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041f\u0442", "\u0421\u0431"], x = ["\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435", "\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a", "\u0412\u0442\u043e\u0440\u043d\u0438\u043a", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433", "\u041f\u044f\u0442\u043d\u0438\u0446\u0430", "\u0421\u0443\u0431\u0431\u043e\u0442\u0430"], y = ["\u042f\u043d\u0432", "\u0424\u0435\u0432", "\u041c\u0430\u0440", "\u0410\u043f\u0440", "\u041c\u0430\u0439", "\u0418\u044e\u043d", "\u0418\u044e\u043b", "\u0410\u0432\u0433", "\u0421\u0435\u043d", "\u041e\u043a\u0442", "\u041d\u043e\u044f", "\u0414\u0435\u043a"], z = ["\u044f\u043d\u0432\u0430\u0440\u044f", "\u0444\u0435\u0432\u0440\u0430\u043b\u044f", "\u043c\u0430\u0440\u0442\u0430", "\u0430\u043f\u0440\u0435\u043b\u044f", "\u043c\u0430\u044f", "\u0438\u044e\u043d\u044f", "\u0438\u044e\u043b\u044f", "\u0430\u0432\u0433\u0443\u0441\u0442\u0430", "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c", "\u043e\u043a\u0442\u044f\u0431\u0440\u044f", "\u043d\u043e\u044f\u0431\u0440\u044f", "\u0434\u0435\u043a\u0430\u0431\u0440\u044f"], aa = ['', "-\u043e\u0435", "-\u043e\u0435", "-\u0435", "-\u043e\u0435", "-oe", "-\u043e\u0435", "-\u043e\u0435", "-\u043e\u0435", "-oe", "-\u043e\u0435", "-oe", "-oe", "-\u043e\u0435", "-oe", "-\u043e\u0435", "-oe", "-\u043e\u0435", "-oe", "-\u043e\u0435", "-\u043e\u0435", "-\u043e\u0435", "-\u043e\u0435", "-\u0435", "-\u043e\u0435", "-\u043e\u0435", "-oe", "-oe", "-\u043e\u0435", "-oe", "-\u043e\u0435", "-\u043e\u0435"], ba = {getWeekdayName: function (ca) {
        return x[ca];
    }, getWeekdayNameShort: function (ca) {
        return w[ca];
    }, getMonthName: function (ca) {
        return z[ca - 1];
    }, getMonthNameShort: function (ca) {
        return y[ca - 1];
    }, getOrdinalSuffix: function (ca) {
        return aa[ca];
    }, getDaysInMonth: function (ca, da) {
        return (new Date(ca, da, 0)).getDate();
    }, getCurrentTimeInSeconds: function () {
        return Date.now() / h;
    }, DAYS_PER_YEAR: m, HOUR_PER_DAY: k, MIN_PER_HOUR: j, MONTHS_PER_YEAR: n, MS_PER_SEC: h, MS_PER_WEEK: r, MS_PER_YEAR: s, SEC_PER_MIN: i, SEC_PER_HOUR: o, SEC_PER_DAY: p, SEC_PER_YEAR: q, DAY_LABEL: t, MONTH_LABEL: u, YEAR_LABEL: v};
    e.exports = ba;
}, null);
__d("URLMatcher", [], function (a, b, c, d, e, f) {
    var g = '!"#%&\'()*,-./:;<>?@[\\]^_`{|}', h = '\u2000-\u206F\u00ab\u00bb\uff08\uff09', i = '(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])', j = '(?:(?:ht|f)tps?)://', k = '(?:(?:' + i + '[.]){3}' + i + ')', l = '\\[(?:(?:[A-Fa-f0-9]{1,4}::?){1,7}[A-Fa-f0-9]{1,4})\\]', m = '(?:\\b)www\\d{0,3}[.]', n = '[^\\s' + g + h + ']', o = '(?:(?:(?:[.:\\-_%@]|' + n + ')*' + n + ')|' + l + ')', p = '(?:[.][a-z]{2,4})', q = '(?::\\d+){0,1}', r = '(?=[/?#])', s = '(?:' + '(?:' + j + o + q + ')|' + '(?:' + k + q + ')|' + '(?:' + l + q + ')|' + '(?:' + m + o + p + q + ')|' + '(?:' + o + p + q + r + ')' + ')', t = '[/#?]', u = '\\([^\\s()<>]+\\)', v = '[^\\s()<>?#]+', w = new RegExp(s, 'im'), x = '^\\[[0-9]{1,4}:[0-9]{1,4}:[A-Fa-f0-9]{1,4}\\]', y = new RegExp(x, 'im'), z = '(?:' + '(?:' + t + ')' + '(?:' + '(?:' + u + '|' + v + ')*' + ')*' + ')*', aa = new RegExp('(' + '(?:' + s + ')' + '(?:' + z + ')' + ')', 'im'), ba = new RegExp('(' + '(?:' + j + o + q + ')|' + '(?:' + m + o + p + q + ')' + ')'), ca = /[\s'";]/, da = new RegExp(t, 'im'), ea = new RegExp('[\\s!"#%&\'()*,./:;<>?@[\\]^`{|}\u00ab\u00bb\u2000-\u206F\uff08\uff09]', 'im'), fa = new RegExp('[\\s()<>?#]', 'im'), ga = new RegExp('\\s()<>'), ha = function (oa) {
        if (oa && oa.indexOf('@') != -1) {
            return (ba.exec(oa)) ? oa : null;
        } else return oa;
    }, ia = function (oa) {
        return ja(oa, aa);
    }, ja = function (oa, pa) {
        var qa = (pa.exec(oa) || [])[1] || null;
        return ha(qa);
    }, ka = function (oa) {
        return w.exec(oa);
    }, la = function (oa) {
        return !ca.test(oa.charAt(oa.length - 1));
    }, ma = function (oa) {
        do {
            var pa = w.exec(oa);
            if (!pa)return null;
            var qa = false;
            if (pa[0][0] === '[' && pa.index > 0 && oa[pa.index - 1] === '@') {
                var ra = y.exec(pa[0]);
                if (ra) {
                    qa = true;
                    oa = oa.substr(pa.index + ra[0].length);
                }
            }
        } while (qa);
        var sa = oa.substr(pa.index + pa[0].length);
        if (sa.length === 0 || !(da.test(sa[0])))return ha(pa[0]);
        var ta = 0, ua = 0, va = 1, wa = 0, xa = ua;
        for (var ya = 1; ya < sa.length; ya++) {
            var za = sa[ya];
            if (xa === ua) {
                if (za === '(') {
                    wa = wa + 1;
                    xa = va;
                } else if (da.test(za) || !(ea.test(za))) {
                    ta = ya;
                } else if (fa.test(za))break;
            } else if (za === '(') {
                wa = wa + 1;
            } else if (za === ')') {
                wa = wa - 1;
                if (wa === 0) {
                    xa = ua;
                    ta = ya;
                }
            } else if (ga.test(za))break;
        }
        return ha(pa[0] + sa.substring(0, ta + 1));
    }, na = {};
    na.permissiveMatch = ia;
    na.matchToPattern = ja;
    na.matchHost = ka;
    na.trigger = la;
    na.match = ma;
    e.exports = na;
}, null);
__d("formatDate", ["DateConsts", "DateFormatConfig", "fbt", "invariant"], function (a, b, c, d, e, f, g, h, i, j) {
    function k(o, p, q) {
        q = q || {};
        if (!p || !o)return '';
        if (typeof o === 'string')o = parseInt(o, 10);
        if (typeof o === 'number')o = new Date(o * 1000);
        j(o instanceof Date);
        j(!isNaN(o.getTime()));
        j(o.getTime() < 1e+15);
        if (typeof p !== 'string') {
            var r = m();
            for (var s in r) {
                var t = r[s];
                if (t.start <= o.getTime() && p[t.name]) {
                    p = p[t.name];
                    break;
                }
            }
        }
        var u;
        if (q.skipPatternLocalization || n() || p.length === 1) {
            u = p;
        } else {
            j(h.formats[p]);
            u = h.formats[p];
        }
        var v = q.utc ? 'getUTC' : 'get', w = o[v + 'Date'](), x = o[v + 'Day'](), y = o[v + 'Month'](), z = o[v + 'FullYear'](), aa = o[v + 'Hours'](), ba = o[v + 'Minutes'](), ca = o[v + 'Seconds'](), da = o[v + 'Milliseconds'](), ea = '';
        for (var fa = 0; fa < u.length; fa++) {
            var ga = u.charAt(fa);
            switch (ga) {
                case '\\':
                    fa++;
                    ea += u.charAt(fa);
                    break;
                case 'd':
                    ea += l(w, 2);
                    break;
                case 'j':
                    ea += w;
                    break;
                case 'S':
                    ea += g.getOrdinalSuffix(w);
                    break;
                case 'D':
                    ea += g.getWeekdayNameShort(x);
                    break;
                case 'l':
                    ea += g.getWeekdayName(x);
                    break;
                case 'F':
                case 'f':
                    ea += g.getMonthName(y + 1);
                    break;
                case 'M':
                    ea += g.getMonthNameShort(y + 1);
                    break;
                case 'm':
                    ea += l(y + 1, 2);
                    break;
                case 'n':
                    ea += y + 1;
                    break;
                case 'Y':
                    ea += z;
                    break;
                case 'y':
                    ea += ('' + z).slice(2);
                    break;
                case 'a':
                    if (aa < 12) {
                        ea += "\u0443\u0442\u0440\u0430";
                    } else ea += "\u0432\u0435\u0447\u0435\u0440\u0430";
                    break;
                case 'A':
                    if (aa < 12) {
                        ea += "AM";
                    } else ea += "PM";
                    break;
                case 'g':
                    ea += (aa === 0 || aa === 12) ? 12 : aa % 12;
                    break;
                case 'G':
                    ea += aa;
                    break;
                case 'h':
                    if (aa === 0 || aa === 12) {
                        ea += 12;
                    } else ea += l(aa % 12, 2);
                    break;
                case 'H':
                    ea += l(aa, 2);
                    break;
                case 'i':
                    ea += l(ba, 2);
                    break;
                case 's':
                    ea += l(ca, 2);
                    break;
                case 'X':
                    ea += l(da, 3);
                    break;
                default:
                    ea += ga;
            }
        }
        return ea;
    }

    function l(o, p) {
        return Array(p - ('' + o).length + 1).join('0') + o;
    }

    function m() {
        var o = new Date(), p = o.getTime(), q = o.getFullYear(), r = o.getDate() - ((o.getDay() - h.weekStart + 6) % 7), s = new Date(q, o.getMonth() + 1, 0).getDate(), t = new Date(q, 1, 29).getMonth() === 1 ? 366 : 365, u = 1000 * 60 * 60 * 24;
        return [
            {name: 'today', start: o.setHours(0, 0, 0, 0)},
            {name: 'withinDay', start: p - u},
            {name: 'thisWeek', start: new Date(o.getTime()).setDate(r)},
            {name: 'withinWeek', start: p - u * 7},
            {name: 'thisMonth', start: o.setDate(1)},
            {name: 'withinMonth', start: p - u * s},
            {name: 'thisYear', start: o.setMonth(0)},
            {name: 'withinYear', start: p - u * t},
            {name: 'older', start: -Infinity}
        ];
    }

    k.periodNames = ['today', 'thisWeek', 'thisMonth', 'thisYear', 'withinDay', 'withinWeek', 'withinMonth', 'withinYear', 'older'];
    function n() {
        if (typeof window === 'undefined' || !window || !window.location)return false;
        var o = window.location.pathname, p = '/intern';
        return o.substr(0, p.length) === p;
    }

    e.exports = k;
}, null);
__d("ReactComponentWithPureRenderMixin", ["shallowEqual"], function (a, b, c, d, e, f, g) {
    "use strict";
    var h = {shouldComponentUpdate: function (i, j) {
        return !g(this.props, i) || !g(this.state, j);
    }};
    e.exports = h;
}, null);
__d("MercuryThreadActions", ["MercuryActionTypeConstants", "MercuryPayloadSource", "MercuryServerRequests", "MercurySingletonMixin", "MessagingTag", "merge", "mergeInto"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    'use strict';
    function n(o) {
        this.$MercuryThreadActions0 = o;
        this.$MercuryThreadActions1 = i.getForFBID(this.$MercuryThreadActions0);
    }

    n.prototype.markSpam = function (o) {
        this.$MercuryThreadActions1.markThreadSpam(o);
        this.$MercuryThreadActions1.handleUpdate(this.$MercuryThreadActions2(o, g.CHANGE_FOLDER, h.CLIENT_CHANGE_FOLDER, {new_folder: k.SPAM}));
    };
    n.prototype.unmarkSpam = function (o) {
        this.$MercuryThreadActions1.unmarkThreadSpam(o);
        this.$MercuryThreadActions1.handleUpdate(this.$MercuryThreadActions2(o, g.CHANGE_FOLDER, h.CLIENT_CHANGE_FOLDER, {new_folder: k.INBOX}));
    };
    n.prototype["delete"] = function (o) {
        this.$MercuryThreadActions1.deleteThread(o);
        this.$MercuryThreadActions1.handleUpdate(this.$MercuryThreadActions2(o, g.DELETE_THREAD, h.CLIENT_DELETE_THREAD));
    };
    n.prototype.unmute = function (o) {
        this.updateMuteSetting(o, 0);
    };
    n.prototype.updateMuteSetting = function (o, p) {
        this.$MercuryThreadActions1.changeMutingOnThread(o, p);
        this.$MercuryThreadActions1.handleUpdate(this.$MercuryThreadActions2(o, g.CHANGE_MUTE_SETTINGS, h.CLIENT_CHANGE_MUTE_SETTINGS, {mute_settings: p}));
    };
    n.prototype.$MercuryThreadActions2 = function (o, p, q, r) {
        return {actions: [l({action_type: p, action_id: null, thread_id: o}, r)], from_client: true, payload_source: q};
    };
    m(n, j);
    e.exports = n;
}, null);
__d("MercuryThreadMuter", ["AsyncDialog", "AsyncRequest", "CurrentUser", "DOM"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = {getUserIDEmail: function () {
        return i.getID() + '@facebook.com';
    }, getThreadMuteSettingForUser: function (l) {
        return l.mute_settings && l.mute_settings[k.getUserIDEmail()];
    }, isThreadMuted: function (l) {
        return k.getThreadMuteSettingForUser(l) !== undefined;
    }, showMuteChangeDialog: function (l, m) {
        g.send(new h('/ajax/mercury/mute_thread_dialog.php').setRelativeTo(m), function (n) {
            n.subscribe('confirm', function () {
                this.hide();
                var o;
                j.scry(this.getRoot(), 'input[type="radio"]').forEach(function (r) {
                    if (r.checked)o = r.value;
                });
                switch (o) {
                    case 'always':
                        o = -1;
                        break;
                    case '1hour':
                        o = 3600;
                        break;
                    case '8am':
                        var p = new Date(), q = new Date();
                        q.setHours(8);
                        q.setMinutes(0);
                        q.setSeconds(0);
                        if (q > p) {
                            o = q - p;
                        } else o = q - p + (24 * 3600 * 1000);
                        o /= 1000;
                        break;
                    default:
                        o = 0;
                }
                d(['MercuryThreadActions'], function (r) {
                    r.get().updateMuteSetting(l, o);
                });
            }.bind(n));
        });
    }};
    e.exports = k;
}, null);
__d("MercuryAttachmentSnippet.react", ["EmoticonsList", "Image.react", "MercuryAttachment", "MercuryAttachmentType", "MercuryConstants", "MercuryParticipants", "React", "StickerConstants", "TextWithEmoticons.react", "cx", "fbt", "ix", "joinClasses", "OrionMercuryAttachmentStrings"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    'use strict';
    var t = b('OrionMercuryAttachmentStrings').module, u = m.createClass({displayName: 'MercuryAttachmentSnippet', propTypes: {thread: m.PropTypes.object.isRequired, viewer: m.PropTypes.string.isRequired}, componentWillMount: function () {
        this._ensureParticipant(this.props.thread.snippet_sender);
        this._setVariables(this.props);
    }, componentWillReceiveProps: function (y) {
        this._ensureParticipant(y.thread.snippet_sender);
        this._setVariables(y);
    }, componentWillUnmount: function () {
        this._cancelParticipantFetch();
    }, render: function () {
        var y = this._getSenderName();
        if (this._hasOnlyPhotos())return this._renderPhotoSnippet(y);
        if (this._hasOnlyVideo())return this._renderVideoSnippet(y);
        if (this._hasAudioClip())return this._renderAudioClipSnippet(y);
        if (this._hasSticker())return this._renderStickerSnippet(y);
        if (this._hasOrion())return this._renderOrionSnippet(y);
        if (this._hasShoerackInvitation())return this._renderShoerackInvitationSnippet(y);
        if (this._hasShare())return this._renderShareSnippet(y);
        return this._renderMixedSnippet(y);
    }, _renderPhotoSnippet: function (y) {
        var z;
        if (this._photos.length === 1) {
            if (this._isViewerSender) {
                z = ("\u0412\u044b \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b\u0438 \u0444\u043e\u0442\u043e.");
            } else z = (q._("{name} \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b(-\u0430) \u0444\u043e\u0442\u043e.", [q.param("name", y)]));
        } else if (this._isViewerSender) {
            z = (q._("\u0412\u044b \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b\u0438 {num_photos} \u0444\u043e\u0442\u043e.", [q.param("num_photos", this._photos.length)]));
        } else z = (q._("{name} \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b(-\u0430) {num_photos} \u0444\u043e\u0442\u043e.", [q.param("name", y), q.param("num_photos", this._photos.length)]));
        return this._renderSnippet(z);
    }, _renderVideoSnippet: function (y) {
        var z;
        if (this._isViewerSender) {
            z = ("\u0412\u044b \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b\u0438 \u0432\u0438\u0434\u0435\u043e.");
        } else z = (q._("{sender name} \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b(-\u0430) \u0432\u0438\u0434\u0435\u043e.", [q.param("sender name", y)]));
        return this._renderSnippet(z);
    }, _renderAudioClipSnippet: function (y) {
        var z;
        if (this._isViewerSender) {
            z = ("\u0413\u043e\u043b\u043e\u0441\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e.");
        } else z = (q._("{name} \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b(-\u0430) \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435.", [q.param("name", y)]));
        return this._renderSnippet(z);
    }, _renderStickerSnippet: function (y) {
        if (w(this._attachments[0].metadata.stickerID)) {
            return (m.createElement(o, {renderEmoticons: true, text: g.symbols.like}));
        } else if (this._isViewerSender) {
            return (m.createElement(m.DOM.span, null, "\u0412\u044b \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b\u0438 \u043d\u0430\u043a\u043b\u0435\u0439\u043a\u0443."));
        } else return (m.createElement(m.DOM.span, null, q._("{name} \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b(-\u0430) \u043d\u0430\u043a\u043b\u0435\u0439\u043a\u0443.", [q.param("name", y)])));
    }, _renderOrionSnippet: function (y) {
        return this._renderSnippet(t.getOrionMercuryThreadAttachmentMetadataText(this._isViewerSender, y));
    }, _renderShoerackInvitationSnippet: function (y) {
        var z;
        if (this._isViewerSender) {
            z = ("\u0412\u044b \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b\u0438 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c Moments.");
        } else z = (q._("{sender name} \u043f\u0440\u0438\u0433\u043b\u0430\u0441\u0438\u043b(\u0430) \u0432\u0430\u0441 \u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u0444\u043e\u0442\u043e \u043f\u0440\u0438 \u043f\u043e\u043c\u043e\u0449\u0438 Moments.", [q.param("sender name", y)]));
        return this._renderSnippet(z);
    }, _renderShareSnippet: function (y) {
        var z;
        if (this._isViewerSender) {
            z = ("\u0412\u044b \u043f\u043e\u0434\u0435\u043b\u0438\u043b\u0438\u0441\u044c \u0441\u0441\u044b\u043b\u043a\u043e\u0439.");
        } else z = (q._("{sender name} \u043f\u043e\u0434\u0435\u043b\u0438\u043b\u0441\u044f(-\u0430\u0441\u044c) \u0441\u0441\u044b\u043b\u043a\u043e\u0439.", [q.param("sender name", y)]));
        return this._renderSnippet(z);
    }, _renderMixedSnippet: function (y) {
        return (m.createElement(m.DOM.span, null, this._attachments.filter(function (z) {
            return z.attach_type === j.FILE || z.attach_type === j.PHOTO || z.attach_type === j.VIDEO;
        }).map(function (z) {
            return this._renderSnippet(z.name, z.icon_type);
        }.bind(this))));
    }, _renderSnippet: function (y, z) {
        var aa = i.getAttachIconClass(z || this._attachments[0].icon_type), ba = s(aa, "uiIconText _3tn");
        return (m.createElement(m.DOM.span, {className: ba}, m.createElement(h, {src: r('/images/messaging/docs/generic.png')}), y));
    }, _hasOnlyPhotos: function () {
        return this._photos.length === this._attachments.length;
    }, _hasOnlyVideo: function () {
        return (this._attachments.length === 1 && this._attachments[0].attach_type === j.VIDEO);
    }, _hasAudioClip: function () {
        return !!(this._attachments.length === 1 && this._attachments[0].metadata && this._attachments[0].metadata.type == 'fb_voice_message');
    }, _hasSticker: function () {
        return (this._attachments.length === 1 && this._attachments[0].attach_type === j.STICKER);
    }, _hasOrion: function () {
        return this._hasSingleAttachmentOfShareDataType(k.MercurySupportedShareType.FB_ORION);
    }, _hasShoerackInvitation: function () {
        return this._hasSingleAttachmentOfShareDataType(k.MercurySupportedShareType.FB_SHOERACK_INVITATION);
    }, _hasSingleAttachmentOfShareDataType: function (y) {
        return (this._attachments.length === 1 && this._attachments[0].share_data_type === y);
    }, _hasShare: function () {
        return (this._attachments.length === 1 && this._attachments[0].attach_type === j.SHARE);
    }, _setVariables: function (y) {
        this._viewer = y.viewer;
        this._sender = y.thread.snippet_sender;
        this._attachments = y.thread.snippet_attachments;
        this._photos = v(this._attachments);
        this._isViewerSender = x(this._sender, this._viewer);
    }, _getSenderName: function () {
        if (!this._sender || this._isViewerSender)return null;
        var y = l.getNow(this._sender);
        if (!y)return null;
        return y.short_name;
    }, _ensureParticipant: function (y) {
        if (!y)return;
        this._cancelParticipantFetch();
        if (!l.getNow(y))this._sub = l.get(y, function (z) {
            return this.forceUpdate();
        }.bind(this));
    }, _cancelParticipantFetch: function () {
        this._sub && this._sub.remove();
    }});

    function v(y) {
        if (!y)return [];
        return y.filter(function (z) {
            return z.attach_type === j.PHOTO;
        });
    }

    function w(y) {
        return (y == n.LIKE_STICKER_ID || y == n.HOT_LIKE_SMALL_STICKER_ID || y == n.HOT_LIKE_MEDIUM_STICKER_ID || y == n.HOT_LIKE_LARGE_STICKER_ID);
    }

    function x(y, z) {
        return !!(y && l.getIDForUser(z) == y);
    }

    e.exports = u;
}, null);
__d("MercuryThreadImage.react", ["MercuryParticipants", "MercuryParticipantsConstants", "Pixelz.react", "React", "SplitImage.react"], function (a, b, c, d, e, f, g, h, i, j, k) {
    'use strict';
    var l = j.createClass({displayName: 'MercuryThreadImage', propTypes: {thread: j.PropTypes.object.isRequired, viewer: j.PropTypes.string.isRequired}, getInitialState: function () {
        return {participantImages: []};
    }, componentDidMount: function () {
        this._getParticipantImages(this.props);
    }, componentWillReceiveProps: function (m, n) {
        this._getParticipantImages(m);
    }, render: function () {
        if (this.props.thread.image_src)return (j.createElement(i, {height: h.BIG_IMAGE_SIZE, resizeMode: 'cover', src: this.props.thread.image_src, width: h.BIG_IMAGE_SIZE}));
        if (this.state.participantImages.length > 0)return (j.createElement(k, {srcs: this.state.participantImages, border: true, size: h.BIG_IMAGE_SIZE}));
        return null;
    }, _getParticipantImages: function (m) {
        var n = m.thread, o = m.viewer;
        if (n.image_src)return;
        var p = g.getIDForUser(o), q = n.participants.filter(function (s) {
            return s != p;
        }), r = [];
        if (!q.length) {
            r = [p];
        } else if (q.length == 1) {
            r = q;
        } else r = q.slice(0, 3);
        g.getOrderedBigImageMulti(r, function (s) {
            this.isMounted() && this.setState({participantImages: s});
        }.bind(this));
    }});
    e.exports = l;
}, null);
__d("MercuryParticipantListRenderer", ["fbt"], function (a, b, c, d, e, f, g) {
    'use strict';
    function h() {
        this.$MercuryParticipantListRenderer0 = false;
        this.$MercuryParticipantListRenderer1 = function (o) {
            return o.name;
        };
    }

    h.prototype.renderParticipantList = function (o) {
        var p = o.map(this.$MercuryParticipantListRenderer1);
        switch (p.length) {
            case 0:
                return i(this.$MercuryParticipantListRenderer0);
            case 1:
                return j(p);
            case 2:
                return k(p);
            case 3:
                return l(p);
            default:
                return m(p);
        }
    };
    h.prototype.setIsNewThread = function (o) {
        this.$MercuryParticipantListRenderer0 = o;
        return this;
    };
    h.prototype.setNameRenderer = function (o) {
        this.$MercuryParticipantListRenderer1 = o;
        return this;
    };
    function i(o) {
        if (o) {
            return ("\u041d\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435");
        } else return ("\u041d\u0435\u0442 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432");
    }

    function j(o) {
        return o[0];
    }

    function k(o) {
        return (g._("{participant1}, {participant2}", [g.param("participant1", o[0]), g.param("participant2", o[1])]));
    }

    function l(o) {
        return (g._("{participant1}, {participant2}, {participant3}", [g.param("participant1", o[0]), g.param("participant2", o[1]), g.param("participant3", o[2])]));
    }

    function m(o) {
        return (g._("{participant1}, {participant2}, {participant3},{others_link}", [g.param("participant1", o[0]), g.param("participant2", o[1]), g.param("participant3", o[2]), g.param("others_link", n(o.length - 3))]));
    }

    function n(o) {
        if (o > 1) {
            return (g._("{others_count} \u0434\u0440\u0443\u0433\u0438\u0445", [g.param("others_count", o)]));
        } else return ("\u0435\u0449\u0435 1");
    }

    e.exports = h;
}, null);
__d("MercuryThreadTitle.react", ["MercuryParticipantListRenderer", "MercuryParticipants", "React", "fbt"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    var k = i.createClass({displayName: 'MercuryThreadTitle', propTypes: {thread: i.PropTypes.object.isRequired, viewer: i.PropTypes.string.isRequired, showUnreadCount: i.PropTypes.bool}, getDefaultProps: function () {
        return {showUnreadCount: false};
    }, getInitialState: function () {
        return {participantNames: ''};
    }, componentDidMount: function () {
        this._renderParticipantsList(this.props);
    }, componentWillReceiveProps: function (l) {
        this._renderParticipantsList(l);
    }, render: function () {
        return (i.createElement(i.DOM.span, null, this.props.thread.name ? this._renderThreadTitle() : this.state.participantNames));
    }, _renderThreadTitle: function () {
        var l = this.props.thread;
        if (!l.unread_count || !this.props.showUnreadCount)return l.name;
        return this._renderTitleWithUnreadCount(l.name, l.unread_count);
    }, _renderParticipantsList: function (l) {
        if (l.thread.name)return;
        var m = h.getIDForUser(l.viewer), n = l.thread.participants;
        if (n.length > 1)n = n.filter(function (o) {
            return o != m;
        });
        h.getMulti(n, function (o) {
            if (!this.isMounted())return;
            var p = n.map(function (s) {
                return o[s];
            }), q = new g().renderParticipantList(p), r = (l.showUnreadCount && l.thread.unread_count) ? this._renderTitleWithUnreadCount(q, l.thread.unread_count) : q;
            this.setState({participantNames: r});
        }.bind(this));
    }, _renderTitleWithUnreadCount: function (l, m) {
        return (j._("{conversation-title} ({unread-count})", [j.param("conversation-title", l), j.param("unread-count", m)]));
    }});
    e.exports = k;
}, null);
__d("WebMessengerThreadPermalinks", ["MercuryIDs", "MessagingTag", "URI", "WebMessengerPermalinkConstants", "WWWBase", "requireWeak"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    'use strict';
    var m = {getThreadURI: function (q, r, s) {
        if (g.isCanonical(q)) {
            n(q, r, s);
        } else o(q, r, s);
    }};

    function n(q, r, s) {
        var t = new i(k.uri), u = g.tokenize(q).value;
        t.setPath(p(s) + '/' + u);
        r && r(t.toString());
    }

    function o(q, r, s) {
        l(['MercuryServerRequests'], function (t) {
            var u = t.get();
            u.getServerThreadID(q, function (v) {
                var w = new i(k.uri);
                w.setPath(j.getURIPathForThreadID(v, p(s)));
                r && r(w.toString());
            });
        });
    }

    function p(q) {
        var r = j.BASE_PATH;
        if (q && q != h.INBOX)r += '/' + q;
        return r;
    }

    e.exports = m;
}, null);
__d("MercuryErrorInfo", ["MercuryActionStatus", "MercuryErrorType", "fbt"], function (a, b, c, d, e, f, g, h, i) {
    var j = {getMessage: function (k) {
        var l = '';
        if (j.isConnectionError(k)) {
            l = "\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043d\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e.";
            if (j.isTransient(k))l = i._("{message} \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u0441 \u0418\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u043e\u043c \u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0435\u0449\u0435 \u0440\u0430\u0437.", [i.param("message", l)]);
        } else {
            if (k && k.description) {
                l = k.description;
            } else l = "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435.";
            if (j.isTransient(k))l = i._("{message} \u041d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0435 \u0440\u0430\u0437.", [i.param("message", l)]);
        }
        return l;
    }, isConnectionError: function (k) {
        if (k && k.type == h.TRANSPORT)return k.code === 1001 || k.code === 1004 || k.code === 1006;
        return false;
    }, isTransient: function (k) {
        return k && k.is_transient;
    }, isPermanent: function (k) {
        return k ? !this.isTransient(k) : false;
    }, hasErrorStatus: function (k) {
        return k.status === g.FAILED_UNKNOWN_REASON || k.status === g.UNABLE_TO_CONFIRM || k.status === g.ERROR;
    }};
    e.exports = j;
}, null);
__d("MercurySendAttemptLogger", ["Banzai", "BanzaiLogger", "MercuryAttachmentType"], function (a, b, c, d, e, f, g, h, i) {
    var j = h.create({retry: true}), k = g.isEnabled('mercury_send_attempt_logging'), l = {}, m = function (p) {
        if (l[p] === undefined) {
            l[p] = 1;
        } else l[p] += 1;
        return l[p];
    }, n = function (p) {
        if (!p.has_attachment)return null;
        if (p.sticker_id)return i.STICKER;
        if ((p.image_ids && p.image_ids.length) || (p.photo_fbids && p.photo_fbids.length))return i.PHOTO;
        if (p.raw_attachments && p.raw_attachments.length)return i.FILE;
        if (p.content_attachment)return i.SHARE;
        return i.UNKNOWN;
    }, o = {log: function (p) {
        if (!k)return;
        j.log('MercurySendAttemptLoggerConfig', {message_id: p.message_id, timestamp_client: p.timestamp, attempt_num: m(p.message_id), first_attachment_type: n(p), source: p.source});
    }};
    e.exports = o;
}, null);
__d("MercuryMessages", ["AsyncRequest", "BanzaiODS", "CurrentUser", "KeyedCallbackManager", "MercuryActionStatus", "MercuryActionTypeConstants", "MercuryAssert", "MercuryAttachmentType", "MercuryGenericConstants", "MercuryIDs", "MercuryLogMessageType", "MercuryMessageClientState", "MercuryMessageSourceTags", "MercuryPayloadSource", "MercurySendAttemptLogger", "MercurySingletonMixin", "MercurySourceType", "MercuryTimePassed", "MercuryMessageIDs", "MercuryParticipants", "PresenceUtil", "RangedCallbackManager", "ReportState", "MercuryServerRequests", "MercuryThreadInformer", "MercuryThreadActions", "MercuryThreads", "copyProperties", "debounceAcrossTransitions", "formatDate", "invariant", "isNode", "randomInt", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma, na) {
    'use strict';
    function oa(gb, hb) {
        var ib = hb;
        if (gb._localIdsMap[hb])ib = gb._localIdsMap[hb];
        return gb._messages[ib];
    }

    var pa = new j();

    function qa(gb, hb) {
        if (hb.status === undefined)hb.status = k.UNSENT;
        hb.timestamp_absolute = "\u0421\u0435\u0433\u043e\u0434\u043d\u044f";
        hb.message_id = hb.message_id || gb.generateNewClientMessageID(hb.timestamp);
        var ib = z.getIDForUser(gb._fbid);
        hb.specific_to_list = hb.specific_to_list || [];
        if (hb.specific_to_list.length && hb.specific_to_list.indexOf(ib) === -1)hb.specific_to_list.push(ib);
        if (!hb.thread_id) {
            if (hb.specific_to_list.length == 1) {
                hb.thread_id = 'user:' + gb._fbid;
            } else if (hb.specific_to_list.length == 2) {
                var jb = hb.specific_to_list[0] == ib ? hb.specific_to_list[1] : hb.specific_to_list[0];
                if (p.tokenize(jb).type == 'email') {
                    hb.thread_id = o.PENDING_THREAD_ID;
                } else hb.thread_id = gb._threads.getThreadIDForParticipant(jb);
            }
            hb.thread_id = hb.thread_id || 'root:' + hb.message_id;
        }
        if (!hb.specific_to_list.length) {
            var kb = p.tokenize(hb.thread_id), lb = kb.type, mb = kb.value;
            if (lb == 'user')hb.specific_to_list = ['fbid:' + mb, ib];
        }
    }

    function ra(gb, hb, ib, jb) {
        var kb = cb(ib) ? [s.CHAT] : [], lb = Date.now(), mb = ja(new Date(lb), 'g:ia'), nb = {action_type: hb, thread_id: jb, author: z.getIDForUser(gb._fbid), author_email: null, coordinates: null, timestamp: lb, timestamp_absolute: (new Date(lb)).toLocaleDateString(), timestamp_relative: mb, timestamp_time_passed: x.TODAY, is_unread: false, is_cleared: false, is_forward: false, is_filtered_content: false, is_spoof_warning: false, source: ib, source_tags: kb};
        return nb;
    }

    function sa(gb) {
        switch (gb) {
            case t.UNKNOWN:
            case t.SERVER_INITIAL_DATA:
            case t.SERVER_FETCH_THREAD_INFO:
            case t.SERVER_THREAD_SYNC:
                return true;
        }
        return false;
    }

    function ta(gb) {
        return gb && gb.substr(0, 6) === 'server';
    }

    function ua(gb, hb) {
        if (!gb._threadsToMessages[hb])gb._threadsToMessages[hb] = new ba(function (ib) {
            return oa(gb, ib).timestamp;
        }, function (ib, jb) {
            return jb - ib;
        });
        return gb._threadsToMessages[hb];
    }

    function va(gb) {
        var hb = [];
        return JSON.stringify(gb, function (ib, jb) {
            if (typeof jb === 'object' && jb !== null) {
                if (la(jb))return '<' + jb.nodeName + '>';
                if (hb.indexOf(jb) !== -1)return 'CIRCULAR';
                hb.push(jb);
            }
            return jb;
        });
    }

    ca.registerCallback('mercury-messages', function () {
        var gb = {}, hb = {}, ib = xa._getInstances();
        for (var jb in ib) {
            gb[jb] = {};
            for (var kb in ib[jb]._messages) {
                var lb = ib[jb]._messages[kb];
                if (Object.keys(lb).length === 0)continue;
                var mb = lb.thread_id;
                gb[jb][mb] = gb[jb][mb] || {};
                gb[jb][mb][lb.message_id] = JSON.parse(va(lb));
            }
            hb[jb] = ha({}, ib[jb]._localIdsMap);
        }
        var nb = {};
        nb.local_message_ids = hb;
        nb.messages = gb;
        return nb;
    });
    function wa(gb, hb, ib) {
        hb.forEach(function (jb) {
            var kb = ua(gb, jb);
            kb.setReachedEndOfArray();
            gb._threadInformer.reorderedMessages(jb, ib);
        });
    }

    function xa(gb) {
        this._fbid = gb;
        this._serverRequests = da.getForFBID(this._fbid);
        this._threadInformer = ea.getForFBID(this._fbid);
        this._threads = ga.getForFBID(this._fbid);
        this._threadActions = fa.getForFBID(this._fbid);
        this._failedHistoryFetchThreads = {};
        this._threadsToMessages = {};
        this._titanMessagesCount = {};
        this._localTitanMessagesCount = {};
        this._messages = {};
        this._attachmentData = {};
        this._messagesNeedingAttachmentData = {};
        this._localIdsMap = {};
        this._serverRequests.subscribe('update-messages', function (hb, ib) {
            var jb = (ib.actions || []).filter(function (lb) {
                var mb = lb.action_type;
                return (lb.is_forward || lb.thread_id) && (mb == l.LOG_MESSAGE || mb == l.USER_GENERATED_MESSAGE || mb == l.SEND_MESSAGE || mb == l.CLEAR_CHAT || mb == l.DELETE_THREAD || mb == l.DELETE_MESSAGES);
            }), kb = sa(ib.payload_source);
            if (ta(ib.payload_source))jb.forEach(function (lb) {
                if (!lb.is_forward) {
                    var mb = this._threads.getThreadMetaNow(lb.thread_id);
                    if (mb)lb.is_cleared = lb.timestamp < mb.chat_clear_time;
                }
            }.bind(this));
            this.handleUpdates(jb, kb, ib.payload_source, ib.from_client);
            if (ib.end_of_history)wa(this, ib.end_of_history, ib.payload_source);
        }.bind(this));
    }

    ha(xa.prototype, {getMessagesFromIDs: function (gb) {
        return (gb || []).map(oa.bind(null, this)).filter(function (hb) {
            return hb;
        });
    }, hasLoadedNMessages: function (gb, hb) {
        var ib = ua(this, gb);
        return ib.hasReachedEndOfArray() || ib.getCurrentArraySize() >= hb;
    }, hasLoadedExactlyNMessages: function (gb, hb) {
        var ib = ua(this, gb);
        return ib.getCurrentArraySize() == hb;
    }, clearMercuryInternalState_DO_NOT_USE: function () {
        this._failedHistoryFetchThreads = {};
        this._threadsToMessages = {};
        this._titanMessagesCount = {};
        this._localTitanMessagesCount = {};
        this._messages = {};
        this._attachmentData = {};
        this._messagesNeedingAttachmentData = {};
        this._localIdsMap = {};
    }, getThreadMessagesRange: function (gb, hb, ib, jb, kb, lb) {
        var mb = ua(this, gb), nb = function (tb) {
            jb(ya(this, tb));
        }.bind(this), ob = mb.executeOrEnqueue(hb, ib, nb), pb = mb.getUnavailableResources(ob), qb = this._failedHistoryFetchThreads[gb];
        if (pb.length && !qb) {
            var rb = (this._titanMessagesCount[gb] || 0) - (this._localTitanMessagesCount[gb] || 0), sb = pb.length + (this._localTitanMessagesCount[gb] || 0);
            this._serverRequests.fetchThreadMessages(gb, rb, sb, kb, lb);
        } else this._failedHistoryFetchThreads[gb] = false;
        return ob;
    }, getThreadMessagesSinceTimestamp: function (gb, hb) {
        var ib = ua(this, gb), jb = ib.getElementsUntil(hb);
        return ya(this, jb);
    }, hasLoadedAllMessages: function (gb) {
        return ua(this, gb).hasReachedEndOfArray();
    }, getCurrentlyLoadedMessages: function (gb) {
        var hb = ua(this, gb).getAllResources();
        return ya(this, hb);
    }, unsubscribe: function (gb, hb) {
        m.isThreadID(hb);
        var ib = ua(this, hb);
        ib.unsubscribe(gb);
    }, addAttachmentData: function (gb, hb, ib) {
        var jb = oa(this, gb);
        if (jb) {
            var kb = jb.attachments.indexOf(hb);
            if (kb != -1) {
                jb.attachments[kb] = ib;
                this._threadInformer.updatedMessage(jb.thread_id, jb.message_id, 'attach');
            }
        } else {
            if (!this._attachmentData[gb])this._attachmentData[gb] = [];
            this._attachmentData[gb].push({attach_key: hb, data: ib});
        }
    }, shouldSortOutOfOrderMessages: function (gb, hb, ib) {
        if (gb == t.CLIENT_CHANNEL_MESSAGE) {
            var jb = this.getThreadMessagesSinceTimestamp(hb, ib);
            if (jb.length > 0) {
                h.bumpEntityKey('chat.web', 'channel.messages_reordered');
                return true;
            }
        }
        return false;
    }, handleUpdates: function (gb, hb, ib, jb) {
        var kb, lb = {}, mb = {};
        for (var nb = 0; nb < gb.length; nb++) {
            var ob = gb[nb];
            if (ob.is_forward || ib == t.SERVER_SEARCH) {
                if (!this._messages[ob.message_id]) {
                    this._messages[ob.message_id] = ob;
                    db(this, ob);
                }
                continue;
            }
            if (ob.client_state === r.SEND_TO_SERVER) {
                this._messages[ob.message_id] = ob;
                db(this, ob);
                continue;
            }
            var pb = ob.action_type;
            if (ib == t.CLIENT_CHANNEL_MESSAGE && pb == l.USER_GENERATED_MESSAGE && ob.threading_id && this._localIdsMap[ob.threading_id] === ob.threading_id) {
                ob.client_message_id = ob.threading_id;
                ob.status = k.SUCCESS;
                ob.action_type = l.SEND_MESSAGE;
                pb = ob.action_type;
            }
            if (pb == l.SEND_MESSAGE) {
                var qb = ob.client_message_id;
                if (qb && this._localIdsMap[qb] && ob.status) {
                    var rb = oa(this, qb), sb = rb.status;
                    if (rb.status == k.SUCCESS)continue;
                    if (ob.status == k.UNCONFIRMED) {
                        if (!mb[ob.thread_id])mb[ob.thread_id] = [];
                        mb[ob.thread_id].push(qb);
                    } else if (!lb[ob.thread_id])lb[ob.thread_id] = [];
                    this.updateLocalMessage(ob, ib);
                    if (typeof sb !== undefined || ob.status == k.FAILED_UNKNOWN_REASON || ob.status == k.UNABLE_TO_CONFIRM || ob.status == k.SUCCESS || ob.status == k.ERROR)this._threadInformer.updatedMessage(ob.thread_id, oa(this, qb).message_id, ib);
                }
                continue;
            } else if (pb == l.DELETE_THREAD) {
                ua(this, ob.thread_id).removeAllResources();
                continue;
            } else if (pb == l.DELETE_MESSAGES) {
                var tb = ob.message_ids.map(function (ac) {
                    return oa(this, ac).message_id;
                }.bind(this));
                kb = ua(this, ob.thread_id);
                kb.removeResources(tb);
                this._threadInformer.reorderedMessages(ob.thread_id, ib);
                continue;
            } else if (pb == l.LOG_MESSAGE) {
                if (ob.log_message_type == q.SERVER_ERROR)this._failedHistoryFetchThreads[ob.thread_id] = true;
            } else if (pb == l.CLEAR_CHAT) {
                var ub = ua(this, ob.thread_id).getAllResources();
                ub.map(oa.bind(null, this)).forEach(function (ac) {
                    ac.is_cleared = true;
                });
                continue;
            }
            var vb = oa(this, ob.message_id);
            if ((ob.threading_id && this._localIdsMap[ob.threading_id]) || (vb && !vb.is_forward))continue;
            if (!lb[ob.thread_id])lb[ob.thread_id] = [];
            lb[ob.thread_id].push(ob.message_id);
            this._messages[ob.message_id] = ob;
            db(this, ob);
            if (ob.threading_id && ob.threading_id != ob.message_id)y.addServerID(ob.threading_id, ob.message_id);
            hb = hb || this.shouldSortOutOfOrderMessages(ib, ob.thread_id, ob.timestamp);
            if (!hb)this._threadInformer.receivedMessage(ob);
        }
        for (var wb in lb) {
            kb = ua(this, wb);
            var xb = kb.getAllResources(), yb = xb.filter(function (ac) {
                var bc = this._messages[ac];
                return bc.action_type == l.LOG_MESSAGE && bc.log_message_type == q.SERVER_ERROR;
            }.bind(this));
            kb.removeResources(yb);
            za(this, wb, lb[wb]);
            if (jb)ab(this, wb, lb[wb]);
            if (hb) {
                kb.addResources(lb[wb]);
                this._threadInformer.reorderedMessages(wb, ib);
            } else kb.addResourcesWithoutSorting(lb[wb].reverse(), 0);
            this._threadInformer.updatedThread(wb);
        }
        var zb = Object.keys(mb);
        if (zb.length)this._serverRequests.requestMessageConfirmation(mb);
    }, sendMessage: function (gb, hb, ib) {
        hb = hb || Function.prototype;
        qa(this, gb);
        setTimeout(function () {
            u.log(gb);
        }, 0);
        this._localIdsMap[gb.message_id] = gb.message_id;
        if (gb.thread_id == 'root:' + gb.message_id)ua(this, gb.thread_id).setReachedEndOfArray();
        this._serverRequests.sendNewMessage(gb, ib);
        if (gb.thread_id == o.PENDING_THREAD_ID) {
            this._messages[gb.message_id] = gb;
            return pa.executeOrEnqueue(gb.message_id, hb);
        } else hb(gb.thread_id);
    }, isOutbound: function (gb) {
        return gb.author == z.user;
    }, isInbound: function (gb) {
        return !this.isOutbound(gb);
    }, isSending: function (gb) {
        return (gb.status === k.UNSENT || gb.status === k.UNCONFIRMED || gb.status === k.UNABLE_TO_CONFIRM || gb.status === k.RESENDING);
    }, isFirstMessage: function (gb) {
        var hb = ua(this, gb.thread_id);
        if (hb.getCurrentArraySize() === 0)return false;
        var ib = hb.getResourceAtIndex(hb.getCurrentArraySize() - 1), jb = oa(this, ib).message_id, kb = oa(this, gb.message_id).message_id;
        return hb.hasReachedEndOfArray() && jb == kb;
    }, unsubscribeSend: function (gb) {
        pa.unsubscribe(gb);
    }, resendMessage: function (gb, hb) {
        var ib = ha({}, gb);
        ib.status = k.RESENDING;
        ib.timestamp = Date.now();
        ib.message_id = gb.message_id;
        this._messages[gb.message_id] = ib;
        var jb = ua(this, gb.thread_id);
        jb.resortResources([gb.message_id]);
        this.sendMessage(ib, null, hb);
        this._threadInformer.reorderedMessages(gb.thread_id, t.CLIENT_SEND_MESSAGE);
    }, deleteMessages: function (gb, hb) {
        if (hb.length) {
            var ib = ua(this, gb), jb = ib.getCurrentArraySize() == hb.length && ib.hasReachedEndOfArray();
            this._serverRequests.deleteMessages(gb, hb, jb);
        }
    }, deleteLocalMessage: function (gb) {
        if (this._localTitanMessagesCount[gb])this._localTitanMessagesCount[gb]--;
    }, markMessagesSpam: function (gb, hb) {
        if (hb.length) {
            var ib = ua(this, gb), jb = ib.getCurrentArraySize() == hb.length && ib.hasReachedEndOfArray();
            if (jb) {
                this._threadActions.markSpam(gb);
            } else this._serverRequests.markMessagesSpam(gb, hb);
        }
    }, updateLocalMessage: function (gb, hb) {
        var ib = oa(this, gb.client_message_id);
        ib.status = gb.status;
        if (gb.status === k.SUCCESS || gb.error_data)ib.error_data = gb.error_data;
        var jb = gb.message_id, kb = gb.client_message_id;
        if (this._messages[jb])return false;
        this._localIdsMap[kb] = jb;
        this._messages[jb] = this._messages[kb];
        y.addServerID(kb, jb);
        this._messages[kb] = {};
        var lb = oa(this, kb);
        if (gb.timestamp)lb.timestamp = gb.timestamp;
        if (gb.attachments && gb.attachments.length) {
            lb.raw_attachments = null;
            lb.attachments = gb.attachments;
            db(this, lb, jb);
        }
        if (gb.log_message_data)lb.log_message_data = gb.log_message_data;
        if (bb(lb))this._localTitanMessagesCount[lb.thread_id]--;
        return true;
    }, constructUserGeneratedMessageObject: function (gb, hb, ib, jb, kb) {
        var lb = ra(this, l.USER_GENERATED_MESSAGE, hb, ib);
        if (typeof gb == 'string')gb = gb.replace(/^\s+/, '').replace(/\s+$/, '');
        lb.body = gb;
        lb.has_attachment = false;
        lb.html_body = false;
        lb.attachments = [];
        lb.specific_to_list = jb || [];
        lb.creator_info = kb;
        return lb;
    }, constructLogMessageObject: function (gb, hb, ib, jb) {
        var kb = ra(this, l.LOG_MESSAGE, gb, hb);
        kb.log_message_type = ib;
        kb.log_message_data = jb;
        return kb;
    }, generateNewClientMessageID: function (gb) {
        var hb = gb + ':' + (ma(0, 4294967295) + 1) + '-' + aa.getSessionID();
        return '<' + hb + '@mail.projektitan.com>';
    }, getNumberLocalMessages: function (gb) {
        return this._localTitanMessagesCount[gb] || 0;
    }, _uploadMessages: {}, updateNewMessage: function (gb, hb, ib) {
        if (ib.preview_attachments.length > 0) {
            gb.has_attachment = true;
            gb.preview_attachments = ib.preview_attachments;
        }
        gb.client_state = r.DO_NOT_SEND_TO_SERVER;
        gb.status = k.RESENDING;
        this._uploadMessages[hb] = gb;
        return gb;
    }, updateMessageAfterUpload: function (gb, hb) {
        var ib = this._uploadMessages[gb];
        ka(ib);
        ib.image_ids = hb.image_ids;
        ib.client_state = r.SEND_TO_SERVER;
        return ib;
    }, clearUploadedMessage: function (gb) {
        delete this._uploadMessages[gb];
    }});
    ha(xa, v, {addAttachmentData: function (gb, hb, ib, jb) {
        jb = jb || i.getID();
        xa.getForFBID(jb).addAttachmentData(gb, hb, ib);
    }});
    function ya(gb, hb) {
        var ib = hb.map(oa.bind(null, gb));
        return ib.reverse();
    }

    function za(gb, hb, ib) {
        var jb = ib.filter(function (kb) {
            return bb(oa(gb, kb));
        });
        if (!gb._titanMessagesCount[hb])gb._titanMessagesCount[hb] = 0;
        gb._titanMessagesCount[hb] += jb.length;
    }

    function ab(gb, hb, ib) {
        var jb = ib.filter(function (kb) {
            return bb(oa(gb, kb));
        });
        if (!gb._localTitanMessagesCount[hb])gb._localTitanMessagesCount[hb] = 0;
        gb._localTitanMessagesCount[hb] += jb.length;
    }

    function bb(gb) {
        var hb = gb.action_type;
        if (hb == l.USER_GENERATED_MESSAGE)return true;
        switch (gb.log_message_type) {
            case q.SUBSCRIBE:
            case q.UNSUBSCRIBE:
            case q.SERVER_ERROR:
            case q.LIVE_LISTEN:
                return false;
            default:
                return true;
        }
    }

    function cb(gb) {
        switch (gb) {
            case w.CHAT_WEB:
            case w.CHAT_JABBER:
            case w.CHAT_IPHONE:
            case w.CHAT_MEEBO:
            case w.CHAT_ORCA:
            case w.CHAT_TEST:
            case w.CHAT:
            case w.DESKTOP:
                return true;
            default:
                return false;
        }
    }

    function db(gb, hb, ib) {
        ib = ib || hb.message_id;
        var jb = gb._attachmentData[ib];
        if (jb) {
            jb.forEach(function (kb) {
                var lb = hb.attachments.indexOf(kb.attach_key);
                if (lb !== -1)hb.attachments[lb] = kb.data;
            });
            delete gb._attachmentData[ib];
        } else if (!hb.is_forward && eb(gb, hb)) {
            gb._messagesNeedingAttachmentData[ib] = true;
            fb(gb);
        }
    }

    function eb(gb, hb) {
        if (!hb || !hb.attachments)return false;
        for (var ib = 0; ib < hb.attachments.length; ib++) {
            var jb = hb.attachments[ib];
            if (typeof jb === 'string' && jb.indexOf(n.SHARE) === 0)return true;
        }
        var kb = hb.forward_message_ids || [];
        for (ib = 0; ib < kb.length; ib++) {
            var lb = oa(gb, kb[ib]);
            if (eb(gb, lb))return true;
        }
        return false;
    }

    var fb = ia(function (gb) {
        var hb = {};
        for (var ib in gb._messagesNeedingAttachmentData) {
            var jb = oa(gb, ib);
            if (eb(gb, jb))hb[ib] = true;
        }
        var kb = Object.keys(hb);
        if (kb.length) {
            var lb = {message_ids: kb};
            if (gb._fbid != i.getID())lb.request_user_id = gb._fbid;
            new g('/ajax/mercury/attachments/fetch_shares.php').setData(lb).setAllowCrossPageTransition(true).send();
        }
        gb._messagesNeedingAttachmentData = {};
    }, 0, this);
    e.exports = xa;
}, null);
__d("MercuryChannelHandler", ["Arbiter", "ChannelConstants", "MercuryActionTypeConstants", "MercuryConfig", "MercuryGlobalActionType", "MercuryMessages", "MercuryPayloadSource", "MercurySingletonMixin", "MercurySendLogger", "MessagingReliabilityLogger", "MessagingEvent", "MessagingTag", "MercuryParticipants", "MercuryServerRequests", "MercuryThreadInformer", "PresenceUtil", "copyProperties", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
    var y = x(n);
    for (var z in y)if (y.hasOwnProperty(z))ba[z] = y[z];
    var aa = y === null ? null : y.prototype;
    ba.prototype = Object.create(aa);
    ba.prototype.constructor = ba;
    ba.__superConstructor__ = y;
    function ba(ca) {
        "use strict";
        this.$MercuryChannelHandler0 = ca;
        this.$MercuryChannelHandler1 = t.getForFBID(this.$MercuryChannelHandler0);
        this.$MercuryChannelHandler2 = u.getForFBID(this.$MercuryChannelHandler0);
        this.$MercuryChannelHandler3 = l.getForFBID(this.$MercuryChannelHandler0);
        this.$MercuryChannelHandler4 = [];
    }

    ba.prototype.getInstanceFBID = function () {
        "use strict";
        return this.$MercuryChannelHandler0;
    };
    ba.prototype.$MercuryChannelHandler5 = function (ca, da) {
        "use strict";
        if (j.MercuryFBIDGK) {
            this.$MercuryChannelHandler6(ca, da);
        } else this.$MercuryChannelHandler7(ca, da);
    };
    ba.prototype.$MercuryChannelHandler7 = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || !da.obj.message) {
            p.addEntry('channel_receive', 'invalid_data');
            return;
        }
        var ea = da.obj.message, fa = {author: ea.mercury_author_id, author_email: ea.mercury_author_email, body: ea.body, subject: ea.subject, has_attachment: ea.has_attachment, attachments: ea.attachments, html_body: ea.html_body, thread_id: ea.tid, message_id: ea.mid, coordinates: ea.mercury_coordinates, is_spoof_warning: ea.is_spoof_warning, source: ea.mercury_source, source_tags: ea.mercury_source_tags, threading_id: ea.threading_id, timestamp: ea.timestamp, timestamp_absolute: ea.timestamp_absolute, timestamp_relative: ea.timestamp_relative, timestamp_time_passed: ea.timestamp_time_passed, action_type: i.USER_GENERATED_MESSAGE, is_unread: ea.is_unread, action_id: ea.action_id, is_forward: false, forward_count: ea.forward_count || ea.forward, forward_message_ids: ea.forward_msg_ids, location_text: ea.location_text, folder: da.obj.folder};
        if ("sync_id" in ea) {
            fa.sync_id = ea.sync_id;
        } else fa.action_id = ea.action_id;
        var ga = [w({}, fa)];
        ga = ga.concat(ea.forward_actions || []);
        var ha = m.CLIENT_CHANNEL_MESSAGE;
        this.$MercuryChannelHandler1.handleUpdateWaitForThread({actions: ga, payload_source: ha}, ea.tid);
        if (!ea.is_unread && ea.mercury_author_id === s.user) {
            var ia = {};
            ia[ea.tid] = da.obj.folder;
            this.$MercuryChannelHandler9(this.__getMessagingPayloadType(), {obj: {event: q.READ, tids: [ea.tid], folder_info: ia, timestamp: ea.timestamp}});
        }
        if (ea.mercury_author_id === s.user)if (this.$MercuryChannelHandler3.getMessagesFromIDs([ea.threading_id]).length)o.log(o.CLIENT_CHANNEL_ECHO, ea.threading_id, {canonical: !ea.group_thread_info});
        p.addEntry('channel_receive', 'success', [fa.thread_id, fa.message_id, v.getSessionID()]);
    };
    ba.prototype.$MercuryChannelHandler6 = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || !da.obj.message) {
            p.addEntry('channel_receive', 'invalid_data');
            return;
        }
        var ea = da.obj.message, fa = ea.other_user_fbid ? ea.other_user_fbid : ea.thread_fbid, ga = {author: ea.mercury_author_id, author_email: ea.mercury_author_email, body: ea.body, subject: ea.subject, has_attachment: ea.has_attachment, attachments: ea.attachments, html_body: ea.html_body, thread_id: ea.tid, thread_fbid: ea.thread_fbid, other_user_fbid: ea.other_user_fbid, message_id: ea.mid, coordinates: ea.mercury_coordinates, is_spoof_warning: ea.is_spoof_warning, source: ea.mercury_source, source_tags: ea.mercury_source_tags, threading_id: ea.threading_id, timestamp: ea.timestamp, timestamp_absolute: ea.timestamp_absolute, timestamp_relative: ea.timestamp_relative, timestamp_time_passed: ea.timestamp_time_passed, action_type: i.USER_GENERATED_MESSAGE, is_unread: ea.is_unread, is_forward: false, forward_count: ea.forward_count || ea.forward, forward_message_ids: ea.forward_msg_ids, location_text: ea.location_text, folder: da.obj.folder};
        if ("sync_id" in ea) {
            ga.sync_id = ea.sync_id;
        } else ga.action_id = ea.action_id;
        var ha = [w({}, ga)];
        ha = ha.concat(ea.forward_actions || []);
        var ia = m.CLIENT_CHANNEL_MESSAGE;
        this.$MercuryChannelHandler1.handleUpdateWaitForThread({actions: ha, payload_source: ia}, fa);
        if (!ea.is_unread && ea.mercury_author_id === s.user) {
            var ja = {};
            ja[fa] = da.obj.folder;
            this.$MercuryChannelHandler9(this.__getMessagingPayloadType(), {obj: {event: q.READ, thread_fbids: ea.thread_fbid ? [ea.thread_fbid] : [], other_user_fbids: ea.other_user_fbid ? [ea.other_user_fbid] : [], folder_info: ja, timestamp: ea.timestamp}});
        }
        if (ea.mercury_author_id === s.user)if (this.$MercuryChannelHandler3.getMessagesFromIDs([ea.threading_id]).length)o.log(o.CLIENT_CHANNEL_ECHO, ea.threading_id, {canonical: !ea.group_thread_info});
        p.addEntry('channel_receive', 'success', [fa, ga.message_id, v.getSessionID()]);
    };
    ba.prototype.$MercuryChannelHandler9 = function (ca, da) {
        "use strict";
        if (j.MercuryFBIDGK) {
            this.$MercuryChannelHandlera(ca, da);
        } else this.$MercuryChannelHandlerb(ca, da);
    };
    ba.prototype.$MercuryChannelHandlerb = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || !da.obj.tids)return;
        var ea = [], fa = da.obj.event == q.READ;
        (da.obj.tids || []).forEach(function (ga) {
            ea.push({action_type: i.CHANGE_READ_STATUS, action_id: null, thread_id: ga, mark_as_read: fa, timestamp: da.obj.timestamp || 0, folder: da.obj.folder_info[ga]});
        });
        this.$MercuryChannelHandler1.handleUpdate({actions: ea, payload_source: m.CLIENT_CHANNEL_MESSAGE});
    };
    ba.prototype.$MercuryChannelHandlera = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || (!da.obj.thread_fbids && !da.obj.other_user_fbids))return;
        var ea = [], fa = da.obj.event == q.READ;
        (da.obj.thread_fbids || []).forEach(function (ga) {
            ea.push({action_type: i.CHANGE_READ_STATUS, action_id: null, thread_fbid: ga, mark_as_read: fa, timestamp: da.obj.timestamp || 0, folder: da.obj.folder_info[ga]});
        });
        (da.obj.other_user_fbids || []).forEach(function (ga) {
            ea.push({action_type: i.CHANGE_READ_STATUS, action_id: null, other_user_fbid: ga, mark_as_read: fa, timestamp: da.obj.timestamp || 0, folder: da.obj.folder_info[ga]});
        });
        this.$MercuryChannelHandler1.handleUpdate({actions: ea, payload_source: m.CLIENT_CHANNEL_MESSAGE});
    };
    ba.prototype.$MercuryChannelHandlerc = function (ca, da) {
        "use strict";
        if (j.MercuryFBIDGK) {
            this.$MercuryChannelHandlerd(ca, da);
        } else this.$MercuryChannelHandlere(ca, da);
    };
    ba.prototype.$MercuryChannelHandlere = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || !da.obj.tids)return;
        var ea = [];
        (da.obj.tids || []).forEach(function (fa) {
            ea.push({action_type: i.DELETE_THREAD, action_id: null, thread_id: fa});
        });
        this.$MercuryChannelHandler1.handleUpdate({actions: ea, payload_source: m.CLIENT_CHANNEL_MESSAGE});
    };
    ba.prototype.$MercuryChannelHandlerd = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || !(da.obj.thread_fbids || da.obj.other_user_fbids))return;
        var ea = [];
        (da.obj.thread_fbids || []).forEach(function (fa) {
            ea.push({action_type: i.DELETE_THREAD, action_id: null, thread_fbid: fa});
        });
        (da.obj.other_user_fbids || []).forEach(function (fa) {
            ea.push({action_type: i.DELETE_THREAD, action_id: null, other_user_fbid: fa});
        });
        this.$MercuryChannelHandler1.handleUpdate({actions: ea, payload_source: m.CLIENT_CHANNEL_MESSAGE});
    };
    ba.prototype.$MercuryChannelHandlerf = function (ca, da) {
        "use strict";
        if (j.MercuryFBIDGK) {
            this.$MercuryChannelHandlerg(ca, da);
        } else this.$MercuryChannelHandlerh(ca, da);
    };
    ba.prototype.$MercuryChannelHandlerh = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || !da.obj.tids || !da.obj.mids)return;
        var ea = da.obj.tids[0], fa = {action_type: i.DELETE_MESSAGES, action_id: null, thread_id: ea, message_ids: da.obj.mids};
        this.$MercuryChannelHandler1.handleUpdate({actions: [fa], threads: [da.obj.updated_thread], payload_source: m.CLIENT_CHANNEL_MESSAGE});
    };
    ba.prototype.$MercuryChannelHandlerg = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || (!da.obj.thread_fbids && !da.obj.other_user_fbids) || !da.obj.mids)return;
        var ea = da.obj.thread_fbids.length ? da.obj.thread_fbids[0] : null, fa = da.obj.other_user_fbids.length ? da.obj.other_user_fbids[0] : null, ga = {action_type: i.DELETE_MESSAGES, action_id: null, thread_fbid: ea, other_user_fbid: fa, message_ids: da.obj.mids};
        this.$MercuryChannelHandler1.handleUpdate({actions: [ga], threads: [da.obj.updated_thread], payload_source: m.CLIENT_CHANNEL_MESSAGE});
    };
    ba.prototype.$MercuryChannelHandleri = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || !da.obj.folder)return;
        var ea = {action_type: k.MARK_ALL_READ, action_id: da.obj.action_id, folder: da.obj.folder};
        this.$MercuryChannelHandler1.handleUpdate({global_actions: [ea]});
    };
    ba.prototype.$MercuryChannelHandlerj = function (ca, da) {
        "use strict";
        if (j.MercuryFBIDGK) {
            this.$MercuryChannelHandlerk(ca, da);
        } else this.$MercuryChannelHandlerl(ca, da);
    };
    ba.prototype.$MercuryChannelHandlerl = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj.tids)return;
        var ea = m.CLIENT_CHANNEL_MESSAGE;
        (da.obj.tids || []).forEach(function (fa) {
            var ga = {action_type: i.CHANGE_ARCHIVED_STATUS, action_id: null, thread_id: fa, archived: da.obj.state};
            this.$MercuryChannelHandler1.handleUpdateWaitForThread({actions: [w({}, ga)], payload_source: ea}, fa);
        }, this);
    };
    ba.prototype.$MercuryChannelHandlerk = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || (!da.obj.thread_fbids && !da.obj.other_user_fbids))return;
        var ea = m.CLIENT_CHANNEL_MESSAGE;
        (da.obj.thread_fbids || []).forEach(function (fa) {
            var ga = {action_type: i.CHANGE_ARCHIVED_STATUS, action_id: null, thread_fbid: fa, other_user_fbid: null, archived: da.obj.state};
            this.$MercuryChannelHandler1.handleUpdateWaitForThread({actions: [w({}, ga)], payload_source: ea}, fa);
        }, this);
        (da.obj.other_user_fbids || []).forEach(function (fa) {
            var ga = {action_type: i.CHANGE_ARCHIVED_STATUS, action_id: null, thread_fbid: null, other_user_fbid: fa, archived: da.obj.state};
            this.$MercuryChannelHandler1.handleUpdateWaitForThread({actions: [w({}, ga)], payload_source: ea}, fa);
        }, this);
    };
    ba.prototype.$MercuryChannelHandlerm = function (ca, da) {
        "use strict";
        if (j.MercuryFBIDGK) {
            this.$MercuryChannelHandlern(ca, da);
        } else this.$MercuryChannelHandlero(ca, da);
    };
    ba.prototype.$MercuryChannelHandlero = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj.tids)return;
        var ea = m.CLIENT_CHANNEL_MESSAGE, fa;
        (da.obj.tids || []).forEach(function (ga) {
            if (da.obj.event == q.TAG) {
                fa = da.obj.tag;
            } else fa = da.obj.marked_as_spam ? r.SPAM : r.INBOX;
            var ha = {action_type: i.CHANGE_FOLDER, action_id: null, thread_id: ga, new_folder: fa};
            this.$MercuryChannelHandler1.handleUpdateWaitForThread({actions: [w({}, ha)], payload_source: ea}, ga);
        }, this);
    };
    ba.prototype.$MercuryChannelHandlern = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || (!da.obj.thread_fbids && !da.obj.other_user_fbids))return;
        var ea = m.CLIENT_CHANNEL_MESSAGE, fa;
        (da.obj.thread_fbids || []).forEach(function (ga) {
            if (da.obj.event == q.TAG) {
                fa = da.obj.tag;
            } else fa = da.obj.marked_as_spam ? r.SPAM : r.INBOX;
            var ha = {action_type: i.CHANGE_FOLDER, action_id: null, thread_fbid: ga, other_user_fbid: null, new_folder: fa};
            this.$MercuryChannelHandler1.handleUpdateWaitForThread({actions: [w({}, ha)], payload_source: ea}, ga);
        }, this);
        (da.obj.other_user_fbids || []).forEach(function (ga) {
            if (da.obj.event == q.TAG) {
                fa = da.obj.tag;
            } else fa = da.obj.marked_as_spam ? r.SPAM : r.INBOX;
            var ha = {action_type: i.CHANGE_FOLDER, action_id: null, other_user_fbid: ga, thread_fbid: null, new_folder: fa};
            this.$MercuryChannelHandler1.handleUpdateWaitForThread({actions: [w({}, ha)], payload_source: ea}, ga);
        }, this);
    };
    ba.prototype.$MercuryChannelHandlerp = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj.tag)return;
        switch (da.obj.tag) {
            case r.ACTION_ARCHIVED:
                this.$MercuryChannelHandlerj(ca, da);
                break;
            case r.INBOX:
            case r.OTHER:
                this.$MercuryChannelHandlerm(ca, da);
                break;
        }
    };
    ba.prototype.__markAsSeen = function (ca, da) {
        "use strict";
        if (j.MercuryFBIDGK) {
            this.$MercuryChannelHandlerq(ca, da);
        } else this.$MercuryChannelHandlerr(ca, da);
    };
    ba.prototype.$MercuryChannelHandlerr = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandlers(ca) || !da.obj || !da.obj.seen_timestamp)return;
        this.$MercuryChannelHandler1.handleUpdate({message_counts: [
            {seen_timestamp: da.obj.seen_timestamp, folder: r.INBOX}
        ], unseen_thread_ids: [
            {thread_ids: [], folder: r.INBOX}
        ], payload_source: m.CLIENT_CHANNEL_MESSAGE});
    };
    ba.prototype.$MercuryChannelHandlerq = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandlers(ca) || !da.obj || !da.obj.seen_timestamp)return;
        this.$MercuryChannelHandler1.handleUpdate({message_counts: [
            {seen_timestamp: da.obj.seen_timestamp, folder: r.INBOX}
        ], unseen_thread_fbids: [
            {thread_fbids: [], other_user_fbids: [], folder: r.INBOX}
        ], payload_source: m.CLIENT_CHANNEL_MESSAGE});
    };
    ba.prototype.__updateModelsFromMercuryPayload = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandlert(ca) || !da.obj)return;
        this.$MercuryChannelHandler2.synchronizeInforms(function () {
            var ea = da.obj, fa = [];
            (ea.actions || []).forEach(function (ga) {
                var ha = i.USER_GENERATED_MESSAGE;
                if (ga.action_type == i.LOG_MESSAGE) {
                    var ia = m.CLIENT_CHANNEL_MESSAGE, ja;
                    if (j.MercuryFBIDGK) {
                        ja = ga.other_user_fbid || ga.thread_fbid;
                    } else ja = ga.thread_id;
                    this.$MercuryChannelHandler1.handleUpdateWaitForThread({actions: [w({}, ga)], payload_source: ia}, ja);
                } else if (ga.action_type != ha)fa.push(ga);
            }, this);
            ea.actions = fa;
            ea.payload_source = m.CLIENT_CHANNEL_MESSAGE;
            this.$MercuryChannelHandler1.handleUpdate(ea);
        }.bind(this));
    };
    ba.prototype.$MercuryChannelHandleru = function (ca, da) {
        "use strict";
        this.$MercuryChannelHandler1.handleRoger(da.obj);
    };
    ba.prototype.$MercuryChannelHandlerv = function (ca, da) {
        "use strict";
        if (j.MercuryFBIDGK) {
            this.$MercuryChannelHandlerw(ca, da);
        } else this.$MercuryChannelHandlerx(ca, da);
    };
    ba.prototype.$MercuryChannelHandlerx = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || da.obj.mute_settings === undefined || !da.obj.thread_id)return;
        var ea = i.CHANGE_MUTE_SETTINGS, fa = [
            {action_type: ea, action_id: null, thread_id: da.obj.thread_id, mute_settings: da.obj.mute_settings}
        ];
        this.$MercuryChannelHandler1.handleUpdate({actions: fa, payload_source: m.CLIENT_CHANNEL_MESSAGE});
    };
    ba.prototype.$MercuryChannelHandlerw = function (ca, da) {
        "use strict";
        if (!this.$MercuryChannelHandler8(ca) || !da.obj || da.obj.mute_settings === undefined || (!da.obj.thread_fbid && !da.obj.other_user_fbid))return;
        var ea = i.CHANGE_MUTE_SETTINGS, fa = [
            {action_type: ea, action_id: null, thread_fbid: da.obj.thread_fbid, other_user_fbid: da.obj.other_user_fbid, mute_settings: da.obj.mute_settings}
        ];
        this.$MercuryChannelHandler1.handleUpdate({actions: fa, payload_source: m.CLIENT_CHANNEL_MESSAGE});
    };
    ba.prototype.__handleMessagingPayload = function (ca, da) {
        "use strict";
        switch (da.obj.event) {
            case q.DELIVER:
                this.$MercuryChannelHandler5(ca, da);
                break;
            case q.READ:
            case q.UNREAD:
                this.$MercuryChannelHandler9(ca, da);
                break;
            case q.READ_ALL:
                this.$MercuryChannelHandleri(ca, da);
                break;
            case q.DELETE:
                this.$MercuryChannelHandlerc(ca, da);
                break;
            case q.DELETE_MESSAGES:
                this.$MercuryChannelHandlerf(ca, da);
                break;
            case q.TAG:
                this.$MercuryChannelHandlerp(ca, da);
                break;
            case q.REPORT_SPAM:
                this.$MercuryChannelHandlerm(ca, da);
                break;
            case q.READ_RECEIPT:
                this.$MercuryChannelHandleru(ca, da);
                break;
            case q.CHANGE_MUTE_SETTINGS:
                this.$MercuryChannelHandlerv(ca, da);
                break;
        }
    };
    ba.prototype.getRouting = function () {
        "use strict";
        return {mercury: this.__updateModelsFromMercuryPayload, messaging: this.__handleMessagingPayload, inbox: this.__markAsSeen};
    };
    ba.prototype.__getMessagingPayloadType = function () {
        "use strict";
        return h.getArbiterType('messaging');
    };
    ba.prototype.__getMercuryPayloadType = function () {
        "use strict";
        return h.getArbiterType('mercury');
    };
    ba.prototype.__getInboxPayloadType = function () {
        "use strict";
        return h.getArbiterType('inbox');
    };
    ba.prototype.$MercuryChannelHandler8 = function (ca) {
        "use strict";
        return (ca == this.__getMessagingPayloadType());
    };
    ba.prototype.$MercuryChannelHandlert = function (ca) {
        "use strict";
        return (ca == this.__getMercuryPayloadType());
    };
    ba.prototype.$MercuryChannelHandlers = function (ca) {
        "use strict";
        return (ca == this.__getInboxPayloadType());
    };
    ba.prototype.turnOn = function () {
        "use strict";
        if (!this.$MercuryChannelHandler4.length) {
            var ca = this.getRouting();
            for (var da in ca)this.$MercuryChannelHandler4.push(g.subscribe(h.getArbiterType(da), ca[da].bind(this)));
        }
        return this;
    };
    ba.prototype.turnOff = function () {
        "use strict";
        if (this.$MercuryChannelHandler4.length) {
            this.$MercuryChannelHandler4.forEach(g.unsubscribe);
            this.$MercuryChannelHandler4 = [];
        }
        return this;
    };
    w(ba, n);
    e.exports = ba;
}, null);
__d("MercuryRoger", ["Arbiter", "ArbiterMixin", "JSLogger", "MercuryActionStatus", "copyProperties", "MercuryServerRequests", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = b('MercuryServerRequests').get(), m = b('MercuryThreads').get(), n = {}, o = [], p = {getSeenBy: function (q, r) {
        if (!q)return [];
        var s = [], t = n[q.thread_id], u = j.SUCCESS;
        for (var v in t)if (t[v] > q.timestamp && (q.status === undefined || q.status === u) && (!r || v != q.author))s.push(v);
        return s;
    }, getSeenTimestamp: function (q, r) {
        var s = n[q];
        return s ? s[r] : null;
    }};
    k(p, h);
    l.subscribe('update-roger', function (q, r) {
        for (var s in r) {
            if (!n[s])n[s] = {};
            for (var t in r[s]) {
                var u = m.getThreadMetaNow(s);
                if (u && u.participants)if (u.participants.indexOf(t) == -1) {
                    o.push(n);
                    continue;
                }
                var v = n[s][t], w = r[s][t];
                if (!v || w > v)n[s][t] = w;
            }
        }
        if (r)p.inform('state-changed', r);
    });
    g.subscribe(i.DUMP_EVENT, function (q, r) {
        r.bad_read_receipts = {receipts: o};
    });
    e.exports = p;
}, null);
__d("MercuryDelayedRoger", ["ArbiterMixin", "LiveTimer", "MercuryActionStatus", "MercuryConfig", "MercuryRoger", "copyProperties", "setTimeoutAcrossTransitions", "MercuryMessages", "MercuryThreadInformer", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = b('MercuryMessages').get(), o = b('MercuryThreadInformer').get(), p = b('MercuryThreads').get(), q = {}, r = {}, s = j['roger.seen_delay'], t = l({getSeenBy: function (x, y) {
        if (r[x])return [];
        if (!q[x]) {
            var z = p.getThreadMetaNow(x);
            if (z)q[x] = {thread_id: x, author: z.participants[0], timestamp: z.timestamp};
        }
        return k.getSeenBy(q[x], y);
    }}, g);

    function u(x) {
        var y = false;
        n.getThreadMessagesRange(x, 0, 1, function (z) {
            var aa = z[0];
            if (!aa)return;
            var ba = aa.timestamp;
            if (aa.action_id || aa.status == i.SUCCESS)ba -= h.getServerTimeOffset();
            var ca = t.getSeenBy(x);
            if (r[x]) {
                clearTimeout(r[x]);
                delete r[x];
            }
            var da = ba + s, ea = da - Date.now();
            if (ea > 0)r[x] = m(function () {
                delete r[x];
                v(x);
            }, ea);
            q[x] = aa;
            var fa = t.getSeenBy(x);
            if (ca.length || fa.length)y = true;
        });
        return y;
    }

    function v(x) {
        var y = {};
        y[x] = true;
        t.inform('state-changed', y);
    }

    function w(event, x) {
        var y = {};
        for (var z in x)if (u(z))y[z] = true;
        for (var aa in y) {
            t.inform('state-changed', y);
            break;
        }
    }

    k.subscribe('state-changed', function (x, y) {
        for (var z in y)!r[z] && v(z);
    });
    o.subscribe('messages-received', w);
    o.subscribe('messages-reordered', w);
    o.subscribe('messages-updated', w);
    e.exports = t;
}, null);
__d("MercuryUnseenState", ["KeyedCallbackManager", "LogHistory", "MercuryActionTypeConstants", "MercuryConfig", "MercurySingletonMixin", "MercuryThreadlistConstants", "MessagingTag", "ReportState", "MercuryServerRequests", "MercuryThreadInformer", "MercuryThreadMuter", "MercuryThreads", "copyProperties", "createObjectFrom", "isEmpty"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
    var v = l.MAX_UNSEEN_COUNT, w = 'unseen_thread_hash', x = 'unseen_thread_list', y = h.getInstance('mercury_unseen_state');

    function z(oa) {
        this._fbid = oa;
        this._serverRequests = o.getForFBID(this._fbid);
        this._threads = r.getForFBID(this._fbid);
        this._threadInformer = p.getForFBID(this._fbid);
        this._initialUnseenCount = null;
        this._lastSeenTimestamp = 0;
        this._maxCount = false;
        this._pendingServerUpdates = false;
        this._unseenResources = new g();
        this._serverRequests.subscribe('update-unseen', function (pa, qa) {
            ea(this, qa);
        }.bind(this));
        this._serverRequests.subscribe('update-thread-ids', function (pa, qa) {
            ma(this, qa);
        }.bind(this));
    }

    s(z.prototype, {getUnseenCount: function () {
        if (this.exceedsMaxCount()) {
            y.error('unguarded_unseen_count_fetch', {});
            return 0;
        }
        return da(this) || 0;
    }, exceedsMaxCount: function () {
        return this._maxCount || (da(this) > v);
    }, markAsSeen: function () {
        var oa = da(this);
        if (oa === null) {
            this._pendingServerUpdates = true;
        } else if (oa > 0 || this._maxCount) {
            this._serverRequests.markSeen();
            var pa = this._serverRequests.getLastActionTimestamp();
            ha(this, pa, []);
        }
    }, markThreadSeen: function (oa, pa) {
        var qa = {};
        qa[oa] = 0;
        ja(this, qa, pa);
    }});
    s(z, k);
    function aa(oa, pa) {
        oa._unseenResources.setResource(w, pa);
        oa._unseenResources.setResource(x, Object.keys(pa));
    }

    function ba(oa, pa) {
        var qa = oa._unseenResources.executeOrEnqueue(w, pa), ra = oa._unseenResources.getUnavailableResources(qa);
        if (ra.length)oa._serverRequests.fetchUnseenThreadIDs();
    }

    function ca(oa) {
        return oa._unseenResources.getResource(w);
    }

    function da(oa) {
        var pa = oa._unseenResources.getResource(x);
        if (pa) {
            return pa.length;
        } else return oa._initialUnseenCount;
    }

    function ea(oa, pa) {
        if (j.MercuryFBIDGK) {
            ga(oa, pa);
        } else fa(oa, pa);
        if (oa._pendingServerUpdates) {
            oa._pendingServerUpdates = false;
            oa.markAsSeen();
        }
    }

    function fa(oa, pa) {
        var qa = na(pa);
        if (pa.unseen_thread_ids) {
            pa.unseen_thread_ids.forEach(function (bb) {
                if (bb.folder != m.INBOX)return;
                var cb = la(oa, bb.thread_ids), db = oa._lastSeenTimestamp;
                if (qa && qa.seen_timestamp)db = qa.seen_timestamp;
                ha(oa, db, cb);
                if (qa && qa.unseen_count > v)oa._maxCount = true;
            });
        } else if (qa && qa.seen_timestamp) {
            oa._lastSeenTimestamp = qa.seen_timestamp;
            if (qa.unseen_count > v) {
                oa._maxCount = true;
                aa(oa, {});
            } else {
                oa._initialUnseenCount = qa.unseen_count;
                if (oa._initialUnseenCount === 0)aa(oa, {});
            }
        } else {
            if (oa._maxCount)return;
            var ra = pa.actions;
            if (!ra || !(ra.length))return;
            var sa = {}, ta = {};
            for (var ua = 0; ua < ra.length; ua++) {
                var va = ra[ua];
                if (va.is_forward)continue;
                var wa = va.action_type, xa = va.thread_id ? va.thread_id : va.server_thread_id, ya = va.folder === undefined || va.folder == m.INBOX;
                if (!ya)continue;
                if (wa == i.USER_GENERATED_MESSAGE || wa == i.LOG_MESSAGE) {
                    var za = sa[xa] ? va.timestamp > sa[xa] : false, ab = za || !sa[xa];
                    if (va.is_unread && ab)oa._threads.getThreadMeta(xa, function (bb) {
                        var cb = false;
                        if (bb && bb.last_read_timestamp)if (bb.last_read_timestamp >= va.timestamp)cb = true;
                        if (!q.isThreadMuted(bb) && !cb)sa[xa] = va.timestamp;
                    });
                } else if (wa == i.CHANGE_READ_STATUS && va.mark_as_read)ta[xa] = va.timestamp;
            }
            ia(oa, sa);
            ja(oa, ta);
        }
    }

    function ga(oa, pa) {
        var qa = na(pa);
        if (pa.unseen_thread_fbids) {
            pa.unseen_thread_fbids.forEach(function (cb) {
                if (cb.folder != m.INBOX)return;
                var db = cb.thread_fbids || [];
                db = db.concat(cb.other_user_fbids || []);
                var eb = la(oa, db), fb = oa._lastSeenTimestamp;
                if (qa && qa.seen_timestamp)fb = qa.seen_timestamp;
                ha(oa, fb, eb);
                if (qa && qa.unseen_count > v)oa._maxCount = true;
            });
        } else if (qa && qa.seen_timestamp) {
            oa._lastSeenTimestamp = qa.seen_timestamp;
            if (qa.unseen_count > v) {
                oa._maxCount = true;
                aa(oa, {});
            } else {
                oa._initialUnseenCount = qa.unseen_count;
                if (oa._initialUnseenCount === 0)aa(oa, {});
            }
        } else {
            if (oa._maxCount)return;
            var ra = pa.actions;
            if (!ra || !(ra.length))return;
            var sa = {}, ta = {};
            for (var ua = 0; ua < ra.length; ua++) {
                var va = ra[ua];
                if (va.is_forward)continue;
                var wa = va.action_type, xa = va.other_user_fbid ? va.other_user_fbid : va.thread_fbid, ya = va.thread_id ? va.thread_id : xa, za = va.folder === undefined || va.folder == m.INBOX;
                if (!za)continue;
                if (wa == i.USER_GENERATED_MESSAGE || wa == i.LOG_MESSAGE) {
                    var ab = sa[ya] ? va.timestamp > sa[ya] : false, bb = ab || !sa[ya];
                    if (va.is_unread && bb)oa._threads.getThreadMeta(ya, function (cb) {
                        var db = false;
                        if (cb && cb.last_read_timestamp)if (cb.last_read_timestamp >= va.timestamp)db = true;
                        if (!q.isThreadMuted(cb) && !db)sa[ya] = va.timestamp;
                    });
                } else if (wa == i.CHANGE_READ_STATUS && va.mark_as_read)ta[ya] = va.timestamp;
            }
            ia(oa, sa);
            ja(oa, ta);
        }
    }

    function ha(oa, pa, qa) {
        var ra = ca(oa);
        if (ra === undefined || pa > oa._lastSeenTimestamp || oa._maxCount) {
            oa._lastSeenTimestamp = pa;
            qa = qa || [];
            if (qa.length <= v)oa._maxCount = false;
            var sa = {}, ta = ca(oa) || {};
            for (var ua in ta)if (ta[ua] !== true) {
                var va = ta[ua];
                if (ka(oa, va))sa[ua] = va;
            }
            var wa = s(t(qa, true), sa);
            aa(oa, wa);
            oa._threadInformer.updatedUnseenState();
        }
    }

    function ia(oa, pa) {
        if (oa._maxCount)return;
        var qa = {}, ra = false;
        for (var sa in pa) {
            var ta = pa[sa];
            if (ka(oa, ta)) {
                qa[sa] = ta;
                ra = true;
            }
        }
        if (!ra)return;
        ba(oa, function (ua) {
            for (var va in qa) {
                var wa = qa[va];
                if (!ua[va] && ka(oa, wa))ua[va] = qa[va];
            }
            aa(oa, ua);
            oa._threadInformer.updatedUnseenState();
        });
    }

    function ja(oa, pa, qa) {
        var ra = false;
        if (!u(pa))ra = true;
        if (ra)ba(oa, function (sa) {
            var ta = false;
            for (var ua in pa) {
                var va = pa[ua], wa = va > sa[ua];
                if (sa[ua] && (!va || wa)) {
                    delete sa[ua];
                    ta = true;
                }
            }
            if (ta) {
                aa(oa, sa);
                oa._threadInformer.updatedUnseenState();
                if (qa && da(oa) === 0)oa._serverRequests.markSeen();
            }
        });
    }

    function ka(oa, pa) {
        return pa > oa._lastSeenTimestamp;
    }

    function la(oa, pa) {
        return pa.map(oa._serverRequests.convertThreadIDIfAvailable, oa._serverRequests);
    }

    function ma(oa, pa) {
        var qa = ca(oa);
        if (!qa)return;
        for (var ra in pa) {
            var sa = pa[ra];
            if (qa[ra]) {
                qa[sa] = qa[ra];
                delete qa[ra];
            }
        }
        aa(oa, qa);
    }

    function na(oa) {
        var pa = (oa.message_counts || []);
        for (var qa = 0; qa < pa.length; qa++)if (pa[qa].folder == m.INBOX)return pa[qa];
        return null;
    }

    n.registerCallback('mercury-unseen-state', function () {
        var oa = {};
        oa.unseen = {};
        oa.unseen_max_count = {};
        oa.unseen_time = {};
        var pa = z._getInstances();
        for (var qa in pa) {
            oa.unseen[qa] = s({}, ca(pa[qa]));
            oa.unseen_max_count[qa] = pa[qa]._maxCount;
            oa.unseen_time[qa] = pa[qa]._lastSeenTimestamp;
        }
        return oa;
    });
    e.exports = z;
}, null);
__d("MercuryThreadMetadataRawRenderer", ["Event", "CSS", "DOM", "MercuryActionStatus", "MercuryErrorInfo", "MercuryStatusTemplates", "Tooltip", "cx", "tx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = {renderParticipantListWithNoThreadName: function (r, s, t, u, v, w) {
        var x = {callback: true, check_length: true, show_unread_count: true};
        w = w || {};
        var y = {};
        for (var z in w)if (x[z]) {
            y[z] = w[z];
            delete w[z];
        }
        var aa = t.map(function (fa) {
            return u[fa];
        }), ba = this.renderRawParticipantList(r, aa, t.length, w);
        ba = this.renderRawTitleWithUnreadCount(ba, y.show_unread_count ? s.unread_count : 0);
        var ca = w.abbr_mode, da = {};
        for (var ea in w)da[ea] = w[ea];
        da.abbr_mode = true;
        v.forEach(function (fa) {
            var ga = v.length > 1 ? this._cloneIfDOMElement(ba) : ba;
            i.setContent(fa, ga);
            if (y.check_length && !ca && fa.scrollWidth > fa.clientWidth) {
                var ha = this.renderRawParticipantList(r, aa, t.length, da), ia = this.renderRawTitleWithUnreadCount(ha, y.show_unread_count ? s.unread_count : 0);
                i.setContent(fa, ia);
            }
        }.bind(this));
        y.callback && y.callback(ba);
    }, renderRawParticipantList: function (r, s, t, u) {
        var v = {abbr_mode: true, last_separator_uses_and: true, names_renderer: true};
        u = u || {};
        var w = null;
        if (u.names_renderer) {
            w = u.names_renderer(s);
        } else w = s.map(function (z) {
            return z.name;
        });
        var x = null;
        if (w.length === 0) {
            if (!r) {
                x = "\u041d\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435";
            } else x = "\u041d\u0435\u0442 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432";
        } else if (w.length == 1) {
            x = w[0];
        } else if (w.length == 2) {
            var y = {participant1: w[0], participant2: w[1]};
            if (u.last_separator_uses_and) {
                x = o._("{participant1} \u0438 {participant2}", y);
            } else x = o._("{participant1}, {participant2}", y);
        } else if (u.last_separator_uses_and) {
            if (u.abbr_mode) {
                x = o._("{participant1} \u0438 {others_link}", {participant1: w[0], others_link: this.renderRawParticipantCount({render_subset: true, count: t - 1})});
            } else if (w.length == 3) {
                x = o._("{participant1}, {participant2} \u0438 {participant3}", {participant1: w[0], participant2: w[1], participant3: w[2]});
            } else x = o._("{participant1}, {participant2} \u0438 {others_link}", {participant1: w[0], participant2: w[1], others_link: this.renderRawParticipantCount({render_subset: true, count: t - 2})});
        } else if (w.length == 3) {
            x = o._("{participant1}, {participant2}, {participant3}", {participant1: w[0], participant2: w[1], participant3: w[2]});
        } else x = o._("{participant1}, {participant2}, {participant3},{others_link}", {participant1: w[0], participant2: w[1], participant3: w[2], others_link: this.renderRawParticipantCount({render_subset: true, count: t - 3})});
        if (Array.isArray(x))x = i.create('span', {}, x);
        return x;
    }, renderRawTitleWithUnreadCount: function (r, s) {
        var t = r;
        if (s && s > 1)t = i.create('span', {}, o._("{conversation_title} ({unread_count})", {conversation_title: r, unread_count: s}));
        return t;
    }, renderRawParticipantCount: function (r) {
        var s = r.render_subset, t;
        if (!s) {
            t = r.count > 1 ? o._("{num} \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439", {num: r.count}) : "1 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c";
        } else t = r.count > 1 ? o._("{others_count} \u0434\u0440\u0443\u0433\u0438\u0445", {others_count: r.count}) : "\u0435\u0449\u0435 1";
        return t;
    }, renderShortNames: function (r) {
        if (r.length == 1)return [r[0].name];
        return r.map(function (s) {
            return s.short_name;
        });
    }, renderStatusIndicator: function (r, s, t) {
        var u;
        if (r == j.RESENDING) {
            u = this.renderResendIndicator();
        } else if (r !== undefined && r != j.UNSENT && r != j.UNCONFIRMED && r != j.SUCCESS)u = this.renderErrorIndicator(s, t);
        return u;
    }, renderResendIndicator: function () {
        return l[':fb:mercury:resend-indicator'].render();
    }, renderErrorIndicator: function (r, s) {
        if (!r)return null;
        var t = l[':fb:mercury:error-indicator'].render(), u = r.is_transient, v = k.getMessage(r);
        if (u)if (k.isConnectionError(r)) {
            v = p._("{message} \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u0441 \u0418\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u043e\u043c \u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0435\u0449\u0435 \u0440\u0430\u0437.", [p.param("message", v)]);
        } else v = p._("{message} \u041d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0435 \u0440\u0430\u0437.", [p.param("message", v)]);
        m.set(t, v, 'above', 'center');
        if (s && u) {
            g.listen(t, 'click', s);
            t.setAttribute('tabindex', '0');
            h.addClass(t, "_55q-");
        }
        return t;
    }, _cloneIfDOMElement: function (r) {
        if (r && r.cloneNode) {
            return r.cloneNode();
        } else return r;
    }};
    e.exports = q;
}, null);
__d("MercurySeenByAll", ["CSS", "DataStore", "DOM", "MercuryParticipants", "MercuryDelayedRoger", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = b('MercuryThreads').get(), m = {}, n = {updateOnSeenChange: function (p, q, r) {
        m[p.tagName] = true;
        h.set(p, 'thread-id', q.thread_id);
        g.addClass(p, 'seenByListener');
        o(p, q, r);
    }};

    function o(p, q, r) {
        var s = null;
        if (r) {
            s = j.getIDFromVanityOrFBID(r);
        } else s = j.user;
        var t = q.participants.filter(function (v) {
            return v !== s;
        }), u = q.participants.length > 0 && q.participants[0] === s;
        g.conditionClass(p, 'repliedLast', u);
        g.conditionClass(p, 'seenByAll', u && k.getSeenBy(q.thread_id).length === t.length);
    }

    k.subscribe('state-changed', function (p, q) {
        for (var r in m) {
            var s = i.scry(document.body, r + '.seenByListener');
            for (var t = 0; t < s.length; t++) {
                var u = s[t], v = h.get(u, 'thread-id');
                if (q[v])l.getThreadMeta(v, function (w) {
                    o(u, w);
                });
            }
        }
    });
    e.exports = n;
}, null);
__d("MercuryThreadMetadataRenderer", ["CSS", "DOM", "Emoji", "HTML", "JSLogger", "MercuryAttachmentType", "MercuryMessageSourceTags", "MercurySingletonMixin", "MercuryThreadImage.react", "MercuryThreadMetadataRawRenderer", "MercuryThreadTitle.react", "MercuryParticipants", "React", "MercurySeenByAll", "MercuryServerRequests", "Style", "MercuryThreads", "Tooltip", "URI", "WebMessengerThreadPermalinks", "arrayContains", "createArrayFrom", "copyProperties", "cx", "formatDate", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa) {
    var ga = k.create('wm_timestamp');

    function ha(ma) {
        this._fbid = ma;
        this._serverRequests = u.getForFBID(ma);
        this._threads = w.getForFBID(ma);
    }

    ca(ha, n);
    ca(ha.prototype, {renderTimestamp: function (ma, na, oa, pa) {
        if (pa) {
            if (!na) {
                ga.warn('no_title');
                na = (new Date(pa)).toLocaleDateString();
            }
            ma.setAttribute('title', na);
            ma.setAttribute('data-utime', pa / 1000);
            if (!oa) {
                ga.warn('no_display');
                oa = ea(new Date(pa), 'g:ia');
            }
            h.setContent(ma, oa);
            g.show(ma);
        }
    }, renderMessageSourceTags: function (ma, na, oa, pa) {
        var qa = '', ra = '', sa = '';
        if (aa(oa, m.MESSENGER)) {
            qa = "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u0438\u0437 \u0427\u0430\u0442\u0430";
            ra = new y('/mobile/messenger');
            sa = "_9g";
        } else if (aa(oa, m.MOBILE)) {
            qa = "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u0441 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e";
            ra = new y('/mobile/');
            sa = "_9j";
        } else if (aa(oa, m.CHAT)) {
            qa = "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u0438\u0437 \u0427\u0430\u0442\u0430";
            sa = "_9h";
        } else if (aa(oa, m.EMAIL)) {
            if (pa) {
                qa = fa._("\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u0441 {email}", {email: pa});
            } else qa = "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u043f\u043e \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u0435";
            sa = "_9i";
        }
        if (sa) {
            x.set(ma, qa);
            g.addClass(na, sa);
            if (ra) {
                ma.setAttribute('href', ra);
            } else ma.removeAttribute('href');
        } else g.hide(ma);
    }, renderMessageLocation: function (ma, na, oa) {
        var pa = y('/ajax/messaging/hovercard/map.php').setQueryData(oa);
        ma.setAttribute('data-hovercard', pa);
        g.removeClass(ma, "_b9");
        g.show(na);
    }, renderSpoofWarning: function (ma, na, oa) {
        if (na) {
            g.addClass(ma, "_sa");
            x.set(ma, fa._("\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c {name_or_email} \u0432 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u0435\u043b\u044f.", {name_or_email: oa.name}));
        }
    }, renderChatSpoofWarning: function (ma, na, oa) {
        if (na)h.appendContent(ma, fa._("\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c {name_or_email} \u0432 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u0435\u043b\u044f.", {name_or_email: oa.name}));
    }, renderCoreThreadlist: function (ma, na, oa, pa, qa) {
        pa = pa || {};
        this.renderThreadImage(ma, na.getNode('image'));
        var ra = na.getNode('accessibleName'), sa = [na.getNode('name')];
        if (ra)sa.push(ra);
        la(this, ma, sa, pa);
        if (ma.folder && qa)ka(na.getNode('folderBadge'), ma.folder);
        var ta = na.getNode('timestamp');
        this.renderTimestamp(ta, ma.timestamp_absolute, ma.timestamp_relative, ma.timestamp);
        this.renderSnippet(ma, na.getNode('snippet'));
        ja(na, ma);
        oa(na, ma);
    }, renderAndSeparatedParticipantList: function (ma, na, oa) {
        oa = oa || {};
        oa.last_separator_uses_and = true;
        this._threads.getThreadMeta(ma, function (pa) {
            la(this, pa, na, oa);
        }.bind(this));
    }, renderSnippet: function (ma, na) {
        var oa = false, pa = h.create('span');
        g.addClass(pa, 'MercuryRepliedIndicator');
        h.appendContent(na, pa);
        t.updateOnSeenChange(pa, ma, this._fbid);
        var qa = ma.snippet;
        if (qa) {
            if (ma.snippet_has_attachment)h.appendContent(na, h.create('span', {className: 'MercuryAttachmentIndicator'}));
            if (ma.is_forwarded_snippet)h.appendContent(na, h.create('strong', {className: "_55q_"}, "\u041f\u0435\u0440\u0435\u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"));
            if (qa.substr(0, 4) == '?OTR') {
                qa = "[\u0437\u0430\u0448\u0438\u0444\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435]";
            } else qa = qa.replace(/\r\n|[\r\n]/g, " ");
            qa = j(i.htmlEmojiAndEmote(qa));
        } else {
            if (ma.is_forwarded_snippet)h.appendContent(na, h.create('strong', {className: "_55q_"}, "\u041f\u0435\u0440\u0435\u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"));
            if (ma.snippet_has_attachment && ma.snippet_attachments && ma.snippet_attachments.length) {
                oa = true;
                qa = h.create('span');
                d(['MercuryAttachmentSnippet.react'], function (sa) {
                    s.renderComponent(s.createElement(sa, {thread: ma, viewer: this._fbid}), qa);
                }.bind(this));
            }
        }
        var ra = ma.participants.length;
        if (ma.is_subscribed)ra--;
        if (!oa && ma.snippet_sender && r.getIDForUser(this._fbid) != ma.snippet_sender && ra > 1) {
            r.get(ma.snippet_sender, function (sa) {
                if (sa.short_name) {
                    h.appendContent(na, fa._("{name}: {conversation_snippet}", {name: sa.short_name, conversation_snippet: qa}));
                } else h.appendContent(na, qa);
            });
        } else h.appendContent(na, qa);
    }, renderWebMessengerLink: function (ma, na, oa, pa) {
        z.getThreadURI(ma, function (qa) {
            na.setAttribute('href', qa);
            oa && oa();
        }, pa);
    }, renderThreadImage: function (ma, na) {
        s.renderComponent(s.createElement(o, {thread: ma, viewer: this._fbid}), na);
    }, renderParticipantList: function (ma, na, oa, pa) {
        return p.renderRawParticipantList(this._serverRequests.getServerThreadIDNow(ma), na, oa, pa);
    }, renderThreadNameAndParticipantList: function (ma, na, oa, pa) {
        var qa = p.renderRawParticipantList(this._serverRequests.getServerThreadIDNow(ma), na, oa, pa), ra = this._threads.getThreadMetaNow(ma);
        if (!ra.name)return qa;
        return fa._("{conversation_name} [with {participant_list}]", {conversation_name: ra.name, participant_list: qa});
    }, renderParticipantCount: function (ma, na) {
        return p.renderRawParticipantCount(na);
    }});
    function ia(ma) {
        if (!ma.snippet_attachments)return [];
        return ma.snippet_attachments.filter(function (na) {
            return na.attach_type === l.PHOTO;
        });
    }

    function ja(ma, na) {
        var oa = ia(na);
        if (oa.length === 0)return;
        var pa = oa[0].thumbnail_url;
        if (!pa)return;
        var qa = (oa.length == 1) ? 'snippet-thumbnail-single' : 'snippet-thumbnail-multiple', ra = ma.getNode(qa);
        if (!ra)return;
        var sa = h.find(ra, 'i');
        v.set(sa, 'background-image', 'url(' + pa + ')');
        g.show(ra);
    }

    function ka(ma, na) {
        ba(ma).forEach(function (oa) {
            h.setContent(oa, na);
        });
    }

    function la(ma, na, oa, pa) {
        oa = ba(oa);
        if (na.name) {
            oa.forEach(function (ra) {
                s.renderComponent(s.createElement(q, {thread: na, viewer: ma._fbid, showUnreadCount: !!pa.show_unread_count}), ra);
            });
            return;
        }
        var qa = na.participants;
        if (na.participants.length > 1)qa = na.participants.filter(function (ra) {
            return ra != r.getIDForUser(ma._fbid);
        });
        r.getMulti(qa, function (ra) {
            p.renderParticipantListWithNoThreadName(ma._serverRequests.getServerThreadIDNow(na.thread_id), na, qa, ra, oa, pa);
        });
    }

    e.exports = ha;
}, null);