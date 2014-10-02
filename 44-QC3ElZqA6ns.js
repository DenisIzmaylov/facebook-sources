/*!CK:3345584431!*//*1412199757,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["957xn"]);
}

__d("PUWErrorCodes", [], function (a, b, c, d, e, f) {
    e.exports = {BAD_JPEG: 9901, WORKER_TERMINATED: 9902, UNKNOWN_RESIZE_ERROR: 9903, WORKER_ABORT: 9904};
}, null);
__d("StickerAssetType", [], function (a, b, c, d, e, f) {
    e.exports = {IMAGE: "BestEffortImage", SPRITE: "SpriteImage", PADDED_SPRITE: "PaddedSpriteImage"};
}, null);
__d("TypingDetector", ["ArbiterMixin", "Event", "Input", "Run", "TypingStates", "copyProperties", "createObjectFrom", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    function o(p, q) {
        this._input = p;
        this._ignoreKeys = {};
        this._getValueFn = q;
    }

    l(o.prototype, g, {_timeout: 7000, _currentState: k.INACTIVE, init: function () {
        this.init = n;
        this.reset();
        h.listen(this._input, 'keyup', this._update.bind(this));
        j.onUnload(this._onunload.bind(this));
    }, reset: function () {
        clearTimeout(this._checkTimer);
        this._checkTimer = null;
        this._lastKeystrokeAt = null;
        this._currentState = k.INACTIVE;
    }, setIgnoreKeys: function (p) {
        this._ignoreKeys = m(p);
    }, _onunload: function () {
        if (this._currentState == k.TYPING)this._transition(k.QUITTING);
    }, _update: function (event) {
        var p = h.getKeyCode(event), q = this._currentState;
        if (!this._ignoreKeys[p]) {
            var r = this._getValueFn ? this._getValueFn() : i.getValue(this._input);
            if (r.trim().length === 0) {
                if (q == k.TYPING)this._transition(k.INACTIVE);
            } else if (q == k.TYPING) {
                this._recordKeystroke();
            } else if (q == k.INACTIVE) {
                this._transition(k.TYPING);
                this._recordKeystroke();
            }
        }
    }, _transition: function (p) {
        this.reset();
        this._currentState = p;
        this.inform('change', p);
    }, _recordKeystroke: function () {
        this._lastKeystrokeTime = Date.now();
        if (!this._checkTimer)this._checkTimer = setTimeout(this._checkTyping.bind(this), this._timeout);
    }, _checkTyping: function () {
        var p = this._lastKeystrokeTime + this._timeout, q = Date.now();
        if (q > p) {
            this._transition(k.INACTIVE);
        } else {
            clearTimeout(this._checkTimer);
            this._checkTimer = setTimeout(this._checkTyping.bind(this), p - q + 10);
        }
    }});
    e.exports = o;
}, null);
__d("TypingDetectorController", ["AsyncRequest", "AvailableList", "AvailableListConstants", "ChannelConnection", "ChatVisibility", "Keys", "PresencePrivacy", "ShortProfiles", "TypingDetector", "TypingStates", "copyProperties", "emptyFunction", "setTimeoutAcrossTransitions", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
    function u(w) {
        if (!k.isOnline())return false;
        if (w) {
            var x = n.getNow(w);
            return x && x.type == "friend" && m.allows(w);
        }
        return true;
    }

    function v(w, x, y, z, aa, ba) {
        "use strict";
        this.userID = w;
        this.input = x;
        this.source = y;
        this.threadID = aa;
        this.remoteState = p.INACTIVE;
        this.notifyTimer = null;
        z = z || {};
        this.notifyDelay = z.notifyDelay || this.notifyDelay;
        this._typingDetector = new o(x, ba);
        this._typingDetector.init(z);
        this._typingDetector.subscribe('change', this._stateChange.bind(this));
    }

    v.prototype.setUserAndThread = function (w, x) {
        "use strict";
        if (this.userID !== w || this.threadID !== x) {
            this.resetState();
            this.userID = w;
            this.threadID = x;
        }
    };
    v.prototype.setIgnoreEnter = function (w) {
        "use strict";
        var x = w ? [l.RETURN] : [];
        this._typingDetector.setIgnoreKeys(x);
    };
    v.prototype.resetState = function () {
        "use strict";
        this._notifyState(p.INACTIVE);
        this.remoteState = p.INACTIVE;
        this._typingDetector.reset();
        clearTimeout(this.notifyTimer);
        this.notifyTimer = null;
    };
    v.prototype._stateChange = function (w, x) {
        "use strict";
        if (x != p.QUITTING) {
            clearTimeout(this.notifyTimer);
            this.notifyTimer = s(t(this._notifyState, this, x), this.notifyDelay);
        } else this._notifyState(x, true);
    };
    v.prototype._notifyState = function (w, x) {
        "use strict";
        if (!this.userID && !this.threadID)return;
        var y = this.userID, z = u(y);
        if (z && w != this.remoteState) {
            this.remoteState = w;
            if (j.disconnected())return;
            var aa = {typ: w, to: y, source: this.source, thread: this.threadID};
            new g().setHandler(this._onTypResponse.bind(this, y)).setErrorHandler(r).setData(aa).setURI('/ajax/messaging/typ.php').setAllowCrossPageTransition(true).setOption('asynchronous', !x).send();
        }
    };
    v.prototype._onTypResponse = function (w, x) {
        "use strict";
        var y = x.getPayload() || {};
        if (y.offline)h.set(w, i.OFFLINE, 'typing_response');
    };
    q(v.prototype, {notifyDelay: 1000});
    e.exports = v;
}, null);
__d("VideoCallingTour", ["Arbiter", "ArbiterMixin", "Chat", "ChatSidebar", "ChatVisibility", "CSS", "DOM", "PresencePrivacy", "Run", "Toggler", "Vector", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s, t, u, v, w = [], x = function () {
    };

    function y() {
        if (j.isVisible()) {
            z();
        } else if (u)aa();
    }

    function z() {
        s.setContext(t.getBody());
        ba();
        s.show();
        ca();
    }

    function aa() {
        if (!v)v = p.createInstance(u.getRoot());
        var fa = m.scry(u.getRoot(), 'div.fbNubFlyout')[0];
        if (fa) {
            s.setContext(fa);
            ba();
            s.show();
            ca();
        }
    }

    function ba() {
        var fa = q.getElementDimensions(s.getContext()).y;
        s.setOffsetY(fa * .6);
        s.updatePosition();
    }

    function ca() {
        if (u)w.push(u.subscribe('hide', function () {
            da();
            if (!j.isVisible())s.hide();
        }), u.subscribe('show', function () {
            s.show();
        }), u.subscribe('resize', function () {
            ba();
            s.updatePosition();
        }));
        w.push(g.subscribe('sidebar/show', z), g.subscribe('sidebar/hide', aa), g.subscribe('sidebar/resized', ba));
    }

    function da() {
        if (v) {
            v.setSticky(false);
            v = null;
        }
    }

    function ea() {
        while (w.length)w.pop().unsubscribe();
        if (u)da();
        s.hide();
        l.show('fbVideoCallingGetStarted');
    }

    r(x, h, {start: function (fa) {
        s = fa;
        l.hide('fbVideoCallingGetStarted');
        k.goOnline(function () {
            w.push(n.subscribe('privacy-user-presence-changed', ea));
            o.onLeave(ea);
            i.openBuddyList();
            var ga = null;
            w.push(j.subscribe('sidebar/initialized', function (ha, ia) {
                t = ia;
                clearTimeout(ga);
                ga = setTimeout(y, 0);
            }), x.subscribe('videocallingtour/end', ea));
            w.push(g.subscribe('buddylist-nub/initialized', function (ha, ia) {
                u = ia;
                clearTimeout(ga);
                ga = setTimeout(y, 0);
            }));
        });
        x.inform('videocallingtour/start');
    }});
    e.exports = x;
}, null);
__d("ContentRollTypeaheadView.react", ["BackgroundImage.react", "ImageBlock.react", "LegacyScrollableArea.react", "React", "TypeaheadViewItem", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = j.createClass({displayName: 'ContentRollTypeaheadViewItem', mixins: [k.Mixin], propTypes: k.propTypes, render: function () {
        var p = this.props.entry, q = p.getSubtitle() ? j.createElement(j.DOM.div, {className: "_599q"}, p.getSubtitle()) : null;
        if (q && p.getAuxiliaryData() && p.getAuxiliaryData().icon)q = j.createElement(h, {spacing: "small"}, j.createElement(g, {width: 16, height: 16, src: p.getAuxiliaryData().icon}), q);
        var r = p.getPhoto() ? j.createElement(g, {width: 32, height: 32, backgroundSize: "cover", src: p.getPhoto()}) : j.createElement(j.DOM.span, null), s = (("_5yww") + (!q ? ' ' + "_5mne" : '') + (this.props.highlighted ? ' ' + "_599n" : ''));
        return (j.createElement(j.DOM.li, {className: s, onMouseDown: this._onSelect, onMouseEnter: this._onHighlight}, j.createElement(h, {spacing: "medium"}, r, j.createElement(j.DOM.div, null, j.createElement(j.DOM.div, {className: "_599p"}, p.getTitle()), q))));
    }}), o = j.createClass({displayName: 'ContentRollTypeaheadView', propTypes: {highlightedEntry: j.PropTypes.object, entries: j.PropTypes.array.isRequired, onSelect: j.PropTypes.func.isRequired, onHighlight: j.PropTypes.func, onRenderHighlight: j.PropTypes.func, scrollableAreaHeight: j.PropTypes.number.isRequired, scrollableAreaWidth: j.PropTypes.number.isRequired}, _renderItem: function (p) {
        var q = p === this.props.highlightedEntry;
        return (j.createElement(n, {key: p.getUniqueID(), entry: p, highlighted: q, onSelect: this.props.onSelect, onHighlight: this.props.onHighlight, onRenderHighlight: this.props.onRenderHighlight}));
    }, render: function () {
        var p = (("_2072") + (!this.props.entries.length ? ' ' + "_599s" : '')), q = this.props.entries, r = {};
        q.forEach(function (v) {
            r[v.getType()] = r[v.getType()] || [];
            r[v.getType()].push(v);
        });
        var s = [];
        for (var t in r) {
            var u = null;
            switch (t) {
                case 'recent':
                    u = "Recently Viewed Links";
                    break;
                case 'saved':
                    u = "Saved Links";
                    break;
                case 'bing':
                    u = "Bing Results";
                    break;
            }
            if (u)s.push(j.createElement(j.DOM.div, {className: "_1opo"}, u));
            r[t].forEach(function (v) {
                s.push(this._renderItem(v));
            }, this);
        }
        return (j.createElement(j.DOM.div, {className: p}, j.createElement(i, {height: this.props.scrollableAreaHeight, width: this.props.scrollableAreaWidth}, j.createElement(j.DOM.ul, null, s))));
    }});
    e.exports = o;
}, null);
__d("ContentRollTypeahead.react", ["AbstractTypeahead.react", "React", "ReactPropTypes", "WebAsyncSearchSource", "ContentRollTypeaheadView.react", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = 20, o = '/ajax/metacomposer/attachment/og/typeahead/content_roll', p = h.createClass({displayName: 'ContentRollTypeahead', propTypes: {className: i.string, onSelection: i.func.isRequired, scrollableAreaHeight: h.PropTypes.number.isRequired, scrollableAreaWidth: h.PropTypes.number.isRequired, userID: i.string.isRequired, useLayer: i.bool}, getInitialState: function () {
        return {query: ''};
    }, _handleChange: function (event) {
        this.setState({query: event.target.value});
    }, _handleSelectAttempt: function (q) {
        this.setState({query: ''});
        var r = {object_id: q.getUniqueID(), url: q.getURI(), source: q.getType(), query: q.getAuxiliaryData().query, subindex: q.getAuxiliaryData().subindex, subtotal: q.getAuxiliaryData().subtotal, index: q.getAuxiliaryData().index, total: q.getAuxiliaryData().total};
        this.props.onSelection(r);
    }, _getSearchSource: function () {
        if (!this._searchSource)this._searchSource = new j({bootstrapRequests: [
            {uri: o, data: {viewer: this.props.userID}}
        ], queryRequests: [
            {uri: o, data: {viewer: this.props.userID}}
        ], getAllForEmptyQuery: true});
        return this._searchSource;
    }, _getPlaceholder: function () {
        if (!this._placeholder)this._placeholder = "Search for articles, videos, music, and more";
        return this._placeholder;
    }, focusInput: function () {
        this.refs.typeahead.focusInput();
    }, render: function () {
        var q = {ViewRenderer: k, maxEntries: n, useLayer: this.props.useLayer, extraRendererProps: {scrollableAreaHeight: this.props.scrollableAreaHeight, scrollableAreaWidth: this.props.scrollableAreaWidth}};
        return (h.createElement(g, {autoHighlight: true, className: this.props.className, focusedOnInit: true, inputClassName: "_55r1", onChange: this._handleChange, onSelectAttempt: this._handleSelectAttempt, placeholder: this._getPlaceholder(), presenter: q, queryString: this.state.query, ref: "typeahead", searchSource: this._getSearchSource(), showEntriesOnFocus: true}));
    }});
    e.exports = p;
}, null);
__d("ContentRollFlyout.react", ["ContentRollTypeahead.react", "Parent", "React", "ReactPropTypes", "Toggler", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = i.createClass({displayName: 'ContentRollFlyout', propTypes: {onSelection: j.func.isRequired, userID: j.string.isRequired}, getInitialState: function () {
        return {showFlyout: false};
    }, componentDidMount: function () {
        var n = this._getParentToggler();
        if (n)k.listen('show', n, function () {
            this.setState({showFlyout: true});
        }.bind(this));
    }, _getParentToggler: function () {
        return h.byClass(this.getDOMNode(), 'uiToggle');
    }, _hideParentToggler: function () {
        var n = this._getParentToggler();
        if (n)k.hide(n);
    }, _handleSelection: function (n) {
        this._hideParentToggler();
        this.props.onSelection(n);
    }, render: function () {
        if (!this.state.showFlyout)return i.createElement(i.DOM.div, null);
        return (i.createElement(g, {className: "_5j11", onSelection: this._handleSelection, scrollableAreaHeight: 288, scrollableAreaWidth: 256, userID: this.props.userID, useLayer: false}));
    }});
    e.exports = m;
}, null);
__d("CroppedImage.react", ["Image.react", "React", "ReactPropTypes", "cx"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = h.createClass({displayName: 'CroppedImage', propTypes: {center: i.shape({x: i.number.isRequired, y: i.number.isRequired}), crop: i.shape({height: i.number.isRequired, width: i.number.isRequired}).isRequired, size: i.shape({height: i.number.isRequired, width: i.number.isRequired}).isRequired, src: i.string.isRequired}, getDefaultProps: function () {
        return {center: {x: .5, y: .5}};
    }, _calculateMargin: function (l, m, n) {
        return -1 * Math.max(Math.min(((n * m) - (.5 * l)), m - l), 0);
    }, render: function () {
        var l = this._calculateMargin(this.props.crop.width, this.props.size.width, this.props.center.x), m = this._calculateMargin(this.props.crop.height, this.props.size.height, this.props.center.y), n = {left: l, height: this.props.size.height, top: m, width: this.props.size.width};
        return (h.createElement(h.DOM.div, {className: "_46-h", style: this.props.crop}, h.createElement(g, {alt: this.props.alt || '', className: "_46-i", src: this.props.src, style: n})));
    }});
    e.exports = k;
}, null);
__d("URLScraper", ["ArbiterMixin", "DataStore", "Event", "URLMatcher", "copyProperties", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = 'scraperLastPermissiveMatch', n = l(g);
    for (var o in n)if (n.hasOwnProperty(o))q[o] = n[o];
    var p = n === null ? null : n.prototype;
    q.prototype = Object.create(p);
    q.prototype.constructor = q;
    q.__superConstructor__ = n;
    function q(r, s) {
        "use strict";
        this.input = r;
        this.enable();
        this.getValueFn = s;
    }

    q.prototype.reset = function () {
        "use strict";
        h.set(this.input, m, null);
    };
    q.prototype.enable = function () {
        "use strict";
        if (this.events)return;
        var r = function (s) {
            setTimeout(this.check.bind(this, s), 30);
        };
        this.events = i.listen(this.input, {paste: r.bind(this, false), keydown: r.bind(this, true)});
    };
    q.prototype.disable = function () {
        "use strict";
        if (!this.events)return;
        for (var event in this.events)this.events[event].remove();
        this.events = null;
    };
    q.prototype.check = function (r) {
        "use strict";
        var s = this.getValueFn ? this.getValueFn() : this.input.value;
        if (r && q.trigger(s))return;
        var t = q.match(s), u = j.permissiveMatch(s);
        if (u && (u != h.get(this.input, m))) {
            h.set(this.input, m, u);
            this.inform('match', {url: t || u, alt_url: u});
        }
    };
    k(q, j);
    e.exports = q;
}, null);
__d("getURLRanges", ["URI", "URLScraper"], function (a, b, c, d, e, f, g, h) {
    "use strict";
    function i(j, k) {
        k = k || 0;
        var l = h.match(j);
        if (!l)return [];
        var m = l;
        if (!(/^[a-z][a-z0-9\-+.]+:\/\//i.test(l)))m = 'http://' + l;
        if (!g.isValidURI(m))return [];
        k += j.indexOf(l);
        var n = l.length, o = [
            {offset: k, length: l.length, entity: {url: m}}
        ];
        return o.concat(i(j.substr(k + n), k + n));
    }

    e.exports = i;
}, null);
__d("MercuryMessageBody.react", ["React", "Link.react", "TextWithEntities.react", "ReactComponentWithPureRenderMixin", "cx", "fbt", "getURLRanges"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = g.createClass({displayName: 'MercuryMessageBody', mixins: [j], propTypes: {body: g.PropTypes.string}, render: function () {
        var o = this.props.body || '';
        if (o.startsWith('?OTR'))return (g.createElement(g.DOM.span, {className: "_89h"}, "[\u0437\u0430\u0448\u0438\u0444\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435]"));
        o = o.replace(/\s+$/, '');
        if (o.length === 0)return null;
        return (g.createElement(i, {interpolator: this._getInterpolator(), text: o, ranges: m(o), renderEmoticons: true, renderEmoji: true}));
    }, _getInterpolator: function () {
        return function (o, p) {
            return (g.createElement(h, {target: "_blank", href: p.entity}, o));
        };
    }});
    e.exports = n;
}, null);
__d("MercuryAudioPlayer", ["Event", "Arbiter", "DOM", "Flash", "UserAgent_DEPRECATED", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = 200;

    function n() {
        if (k.webkit() && !k.chrome())return false;
        var w = i.create('audio'), x = false;
        try {
            if (!!w.canPlayType)if (w.canPlayType('video/mp4;').replace(/^no$/, ''))x = true;
        } finally {
            return x;
        }
    }

    function o() {
        return j.isAvailable();
    }

    var p = function () {
        this.interval = null;
        this.arbiterInstance = null;
        this.audio = i.create('audio');
        g.listen(this.audio, 'playing', function () {
            this.informAttachment('playing', this.audio.currentTime);
            this.interval = setInterval(function () {
                this.informAttachment('playing', this.audio.currentTime);
            }.bind(this), m);
        }.bind(this));
        g.listen(this.audio, 'ended', function () {
            clearInterval(this.interval);
            this.informAttachment('finished');
        }.bind(this));
    };
    l(p.prototype, {setAudio: function (w, x) {
        this.audio.setAttribute('src', w);
        this.arbiterInstance = x;
    }, informAttachment: function (w, x) {
        if (this.arbiterInstance)this.arbiterInstance.inform(w, x);
    }, play: function () {
        this.audio.play();
        this.informAttachment('played');
    }, resume: function () {
        this.audio.play();
        this.informAttachment('played');
    }, pause: function () {
        this.audio.pause();
        clearInterval(this.interval);
        this.informAttachment('paused');
    }, getType: function () {
        return 'html5';
    }});
    var q = function () {
        this.src = null;
        this.arbiterInstance = null;
        var w = i.create('div');
        document.body.appendChild(w);
        this.swf = j.embed('/swf/SoundStreamPlayer.swf', w, null, {});
        this.interval = null;
        h.subscribe('soundstream/finished', function () {
            clearInterval(this.interval);
            this.informAttachment('finished');
        }.bind(this));
    };
    l(q.prototype, {setAudio: function (w, x) {
        this.src = w;
        this.arbiterInstance = x;
    }, informAttachment: function (w, x) {
        if (this.arbiterInstance)this.arbiterInstance.inform(w, x);
    }, play: function () {
        this.swf.playSound(this.src);
        this.interval = setInterval(function () {
            var w = this.swf.getCurrentTime();
            this.informAttachment('playing', w);
        }.bind(this), m);
        this.informAttachment('played');
    }, resume: function () {
        this.swf.resume();
        this.informAttachment('played');
    }, pause: function () {
        clearInterval(this.interval);
        this.swf.pause();
        this.informAttachment('paused');
    }, getType: function () {
        return 'flash';
    }});
    function r() {
        if (n()) {
            return new p();
        } else if (o())return new q();
        return false;
    }

    var s = null, t = null, u = 0;

    function v(w, x) {
        this.src = w;
        this.arbiterInstance = x;
        this.audio_id = ++u;
        s !== null || (s = r());
        if (!s)return false;
    }

    l(v.prototype, {getType: function () {
        if (!s) {
            return false;
        } else return s.getType();
    }, play: function (w) {
        if (w && t == this.audio_id) {
            s.resume();
        } else {
            this.pause();
            t = this.audio_id;
            s.setAudio(this.src, this.arbiterInstance);
            s.play();
        }
    }, pause: function () {
        s.pause();
    }});
    e.exports = v;
}, null);
__d("MercuryAttachmentAudioClip.react", ["Arbiter", "ArbiterMixin", "MercuryAudioPlayer", "CurrentUser", "JSLogger", "LeftRight.react", "React", "cx", "shield", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = 'MercuryAttachmentAudioClip/play', r = k.create('mercury_audio_clip'), s = m.createClass({displayName: 'AudioClip', mixins: [h], getInitialState: function () {
        this.subscribe('playing', this.updateTime);
        this.subscribe('played', o(this.setState, this, {playing: true, started: true}));
        this.subscribe('paused', o(this.setState, this, {playing: false}));
        this.subscribe('finished', o(this.setState, this, {playing: false, started: false, time: this.props.duration}));
        this.logged = false;
        var t = this.props.downloadOnly ? false : new i(this.props.src, this);
        g.subscribe(q, function (u, v) {
            if (this.props.src != v)this.setState({time: 0});
        }.bind(this));
        return {time: 0, playing: false, started: false, duration: this.props.duration, audioPlayer: t};
    }, updateTime: function (t, u) {
        this.setState({time: u});
    }, play: function () {
        if (this.state.playing) {
            this.state.audioPlayer.pause();
        } else {
            this.state.audioPlayer.play(this.state.started);
            g.inform(q, this.props.src);
            if (!this.logged) {
                this.logged = true;
                r.log('play', {uid: j.getID(), duration: this.props.duration});
            }
        }
    }, _formatSeconds: function (t) {
        if (t) {
            t = Math.ceil(t);
            var u = t % 60;
            if (u < 10)u = '0' + u;
            var v = Math.floor(t / 60);
            return v + ':' + u;
        } else return null;
    }, _renderPlayer: function (t, u) {
        return (m.createElement(m.DOM.a, {className: "_1miz", href: "#", style: {width: t}, onClick: this.play}, m.createElement(m.DOM.span, {className: "_1mi-"}, m.createElement(m.DOM.i, {className: "_1mi_"})), m.createElement(m.DOM.span, {className: "_1mj0"}, u), m.createElement(m.DOM.div, {className: "_1mj1"})));
    }, render: function () {
        var t = this.state.time, u = this.state.playing, v = this._formatSeconds(this.state.duration), w = this.props.width || 170, x = null, y = Math.ceil((t * (w + 2)) / this.state.duration);
        if (this.state.audioPlayer && this.state.audioPlayer.getType()) {
            var z = this._renderPlayer(w, v), aa = this._renderPlayer(w, v), ba = (("_1mj2") + (u && (t !== 0) ? ' ' + "_1mj3" : '') + (u && (t === 0) ? ' ' + "_4g4x" : ''));
            x = (m.createElement(m.DOM.div, {className: ba}, z, m.createElement(m.DOM.div, {className: "_1mj4", style: {width: y}}, aa)));
        } else x = (m.createElement(m.DOM.div, {className: "_1mj2"}, m.createElement(m.DOM.div, {className: "_1miz"}, m.createElement(l, null, m.createElement(m.DOM.a, {className: "_1mj5", href: this.props.src}, m.createElement(m.DOM.span, {className: "_3qi6"}, m.createElement(m.DOM.i, {className: "_1mj6"})), m.createElement(m.DOM.span, {className: "_1mj7"}, "\u0413\u043e\u043b\u043e\u0441\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"), m.createElement(m.DOM.span, {className: "_1mj8"}, v)), m.createElement(m.DOM.a, {href: this.props.src, className: "_1mj9"}, m.createElement(m.DOM.i, {className: "_1mja"}))))));
        return (m.createElement(m.DOM.div, {className: "_1mjb"}, x));
    }});
    e.exports = s;
}, null);
__d("XMessagingVideoAttachmentControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/mercury\/attachments\/video\/", {video_id: {type: "Int", required: true}, window_width: {type: "Int", required: true}});
}, null);
__d("MercuryAttachmentVideo.react", ["CroppedImage.react", "Image.react", "React", "ReactPropTypes", "XMessagingVideoAttachmentControllerURIBuilder", "cx", "ix"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = i.createClass({displayName: 'MercuryAttachmentVideo', propTypes: {duration: j.number.isRequired, name: j.string.isRequired, size: j.shape({height: j.number, width: j.number}), thumbnailSize: j.shape({height: j.number, width: j.number}), thumbnail: j.string, videoID: j.string}, _formatDuration: function () {
        var o = this.props.duration, p = Math.floor(o / 60), q = o % 60;
        if (q < 10)return p + ':0' + q;
        return p + ':' + q;
    }, render: function () {
        var o = !!this.props.thumbnail, p = (("_zow") + (' ' + "_59go") + (!o ? ' ' + "_59gq" : '')), q = ((!o ? "_3l6h" : '') + (!o ? ' ' + "uiIconText" : '')), r = new k().setInt('video_id', this.props.videoID).setInt('window_width', document.body.clientWidth).getURI();
        if (this.props.thumbnail)return (i.createElement(i.DOM.div, {className: p, style: this.props.size}, i.createElement(i.DOM.a, {className: q, href: r, role: "button", rel: "async"}, i.createElement(g, {crop: this.props.size, size: this.props.thumbnailSize, src: this.props.thumbnail}), i.createElement(i.DOM.div, {className: "_zox"}), i.createElement(i.DOM.div, {className: "_zoy"}, i.createElement(h, {src: m('/images/chat/chat_play_icon.png')})), i.createElement(i.DOM.span, {className: "_zoz"}, this._formatDuration()))));
        return (i.createElement(i.DOM.div, {className: p}, i.createElement(i.DOM.a, {className: q, href: r, role: "button", rel: "async"}, i.createElement(h, {src: m('/images/icons/video.gif')}), i.createElement(i.DOM.span, {className: "_59gp"}, this.props.name))));
    }});
    e.exports = n;
}, null);
__d("XUIAmbientNUX.react", ["HasLayerContextMixin", "React", "ReactLayer", "ReactAbstractContextualDialog", "XUIAmbientNUXTheme", "XUICloseButton.react", "XUIContextualDialogBody.react", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = h.PropTypes, p = 300, q = 380, r = i.createClass(j.createSpec({displayName: 'XUIAmbientNUX', theme: k})), s = h.createClass({displayName: 'XUIAmbientNUX', mixins: [g], propTypes: {alignment: o.oneOf(['left', 'center', 'right']), behaviors: o.object, context: o.object, contextRef: o.string, customwidth: o.number, offsetX: o.number, offsetY: o.number, onCloseButtonClick: o.func, position: o.oneOf(['above', 'below', 'left', 'right']), shown: o.bool, width: o.oneOf(['wide', 'normal', 'auto', 'custom'])}, _getWidth: function () {
        switch (this.props.width) {
            case 'wide':
                return q;
            case 'custom':
                return this.props.customwidth;
            case 'auto':
                return null;
            default:
                return p;
        }
    }, render: function () {
        return (h.createElement(r, {alignment: this.props.alignment, autoFocus: false, behaviors: this.props.behaviors, context: this.getContextNode(), focusContextOnHide: false, offsetX: this.props.offsetX, offsetY: this.props.offsetY, position: this.props.position, shown: this.props.shown, width: this._getWidth(this.props)}, h.createElement(h.DOM.div, {className: "_53iv"}, h.createElement(m, null, h.createElement(l, {shade: "light", className: "_36gl", onClick: this.props.onCloseButtonClick}), h.createElement(h.DOM.div, {className: "_36gn"}, this.props.children)))));
    }});
    e.exports = s;
}, null);
__d("XUIError", ["Bootloader", "CSS", "DataStore", "DOM", "Event", "JSXDOM", "Parent", "Promise", "cx", "getActiveElement", "invariant", "isNode", "memoize", "merge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
    'use strict';
    var u = 'XUIError', v = 'data-xui-error', w = "_1tp7";
    k.listen(document.documentElement, 'focusin', function (event) {
        var ja = m.byClass(event.getTarget(), w);
        if (ja) {
            fa(ja);
        } else ga();
    });
    k.listen(document.documentElement, 'focusout', function (event) {
        ga();
    });
    var x = s(function () {
        return new n(function (ja, ka) {
            g.loadModules(["ContextualDialog", "ContextualLayerAutoFlip", "LayerRefocusOnHide", "React", "ReactDescriptor"], function (la, ma, na, oa, pa) {
                var qa = {ContextualDialog: la, ContextualLayerAutoFlip: ma, LayerRefocusOnHide: na, React: oa, ReactDescriptor: pa};
                ja(t(qa, y(qa)));
            });
        });
    });

    function y(ja) {
        var ka = ja.ContextualDialog, la = ja.ContextualLayerAutoFlip, ma = ja.LayerRefocusOnHide, na = l.div({className: "_1tp8"}), oa = (l.div({className: "_53ij _1tp9"}, l.div({className: "_1tpa"}), na)), pa = new ka({addedBehaviors: [la], theme: {wrapperClassName: "_1tpb", arrowDimensions: {offset: 12, length: 16}}}, oa);
        pa.disableBehavior(ma);
        pa.shouldSetARIAProperties(false);
        pa.setPosition('right');
        return {dialog: pa, dialogBodyNode: oa, dialogMessageNode: na};
    }

    var z = null;

    function aa(ja, ka) {
        i.set(ja, u, ka);
    }

    function ba(ja) {
        return t({message: ja.getAttribute(v)}, i.get(ja, u));
    }

    function ca(ja) {
        i.remove(ja, u);
    }

    var da = false, ea = false;

    function fa(ja) {
        x().done(function (ka) {
            var la = ka.React, ma = ka.ReactDescriptor, na = ka.dialog, oa = ka.dialogMessageNode, pa = ba(ja), qa = pa.message, ra = ma.isValidDescriptor(qa);
            if (da && !ra)la.unmountComponentAtNode(oa);
            if (ra) {
                la.renderComponent(qa, oa);
            } else {
                q(typeof qa === 'string' || r(qa));
                j.setContent(oa, qa);
            }
            da = ra;
            na.setContext(ja).show();
            z = ja;
        });
        ea = true;
    }

    function ga() {
        if (!ea)return;
        x().done(function (ja) {
            var ka = ja.React, la = ja.dialog, ma = ja.dialogMessageNode;
            if (!z)return;
            if (da) {
                ka.unmountComponentAtNode(ma);
                da = false;
            }
            la.hide();
            z = null;
        });
    }

    function ha(ja) {
        if (j.contains(ja, p()))fa(ja);
    }

    var ia = {set: function (ja) {
        var ka = ja.target, la = ja.message;
        q(la !== null);
        h.addClass(ka, w);
        aa(ka, {message: la});
        ha(ka);
    }, clear: function (ja) {
        h.removeClass(ja, w);
        ja.removeAttribute(v);
        ca(ja);
        if (ja === z)ga();
    }, updatePosition: function () {
        if (!ea)return;
        x().done(function (ja) {
            var ka = ja.dialog;
            if (z)ka.updatePosition();
        });
    }, __setReactError: function (ja, ka) {
        var la = ka.message;
        q(la !== null);
        aa(ja, {message: la});
        ha(ja);
    }, __clearReactError: function (ja) {
        ca(ja);
        if (ja === z)ga();
    }};
    e.exports = ia;
}, null);
__d("XUIError.react", ["React", "ReactDescriptor", "XUIError", "cx", "joinClasses", "merge", "onlyChild"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    'use strict';
    var n = "_1tp7", o = g.createClass({displayName: 'ReactXUIError', componentDidMount: function () {
        if (this.props.message != null)i.__setReactError(this.getDOMNode(), {message: this.props.message});
    }, componentDidUpdate: function () {
        if (this.props.message == null) {
            i.__clearReactError(this.getDOMNode());
        } else i.__setReactError(this.getDOMNode(), {message: this.props.message});
    }, componentWillUnmount: function () {
        i.__clearReactError(this.getDOMNode());
    }, render: function () {
        var p = m(this.props.children);
        if (this.props.message != null)p = h.cloneAndReplaceProps(p, l(p.props, {className: k(p.props.className, n)}));
        return p;
    }});
    e.exports = o;
}, null);
__d("XUITextInput.react", ["AbstractTextInput.react", "React", "XUIError.react", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = h.createClass({displayName: 'XUITextInput', render: function () {
        var m = (("_55r1") + (this.props.height == 'tall' ? ' ' + "_55r2" : '')), n = this.props, o = n.className, p = n.xuiError, q = (function (s, t) {
            var u = {}, v = Object.prototype.hasOwnProperty;
            if (s == null)throw new TypeError();
            for (var w in s)if (v.call(s, w) && !v.call(t, w))u[w] = s[w];
            return u;
        })(n, {className: 1, xuiError: 1}), r = (h.createElement(g, Object.assign({}, q, {ref: "textInput", className: k(o, m)})));
        return (h.createElement(i, {message: p}, r));
    }, focusInput: function () {
        this.refs.textInput.focusInput();
    }});
    e.exports = l;
}, null);
__d("updatePhotoProgressBar", [], function (a, b, c, d, e, f) {
    'use strict';
    function g(h, event) {
        if (event.loaded != event.total) {
            h.setPosition(50 * event.loaded / event.total);
        } else {
            h.setPosition(50);
            h.setTarget(100, 2000);
        }
    }

    e.exports = g;
}, null);
__d("md5", ["str2rstr"], function (a, b, c, d, e, f, g) {
    function h(u, v) {
        var w = u[0], x = u[1], y = u[2], z = u[3];
        w = j(w, x, y, z, v[0], 7, -680876936);
        z = j(z, w, x, y, v[1], 12, -389564586);
        y = j(y, z, w, x, v[2], 17, 606105819);
        x = j(x, y, z, w, v[3], 22, -1044525330);
        w = j(w, x, y, z, v[4], 7, -176418897);
        z = j(z, w, x, y, v[5], 12, 1200080426);
        y = j(y, z, w, x, v[6], 17, -1473231341);
        x = j(x, y, z, w, v[7], 22, -45705983);
        w = j(w, x, y, z, v[8], 7, 1770035416);
        z = j(z, w, x, y, v[9], 12, -1958414417);
        y = j(y, z, w, x, v[10], 17, -42063);
        x = j(x, y, z, w, v[11], 22, -1990404162);
        w = j(w, x, y, z, v[12], 7, 1804603682);
        z = j(z, w, x, y, v[13], 12, -40341101);
        y = j(y, z, w, x, v[14], 17, -1502002290);
        x = j(x, y, z, w, v[15], 22, 1236535329);
        w = k(w, x, y, z, v[1], 5, -165796510);
        z = k(z, w, x, y, v[6], 9, -1069501632);
        y = k(y, z, w, x, v[11], 14, 643717713);
        x = k(x, y, z, w, v[0], 20, -373897302);
        w = k(w, x, y, z, v[5], 5, -701558691);
        z = k(z, w, x, y, v[10], 9, 38016083);
        y = k(y, z, w, x, v[15], 14, -660478335);
        x = k(x, y, z, w, v[4], 20, -405537848);
        w = k(w, x, y, z, v[9], 5, 568446438);
        z = k(z, w, x, y, v[14], 9, -1019803690);
        y = k(y, z, w, x, v[3], 14, -187363961);
        x = k(x, y, z, w, v[8], 20, 1163531501);
        w = k(w, x, y, z, v[13], 5, -1444681467);
        z = k(z, w, x, y, v[2], 9, -51403784);
        y = k(y, z, w, x, v[7], 14, 1735328473);
        x = k(x, y, z, w, v[12], 20, -1926607734);
        w = l(w, x, y, z, v[5], 4, -378558);
        z = l(z, w, x, y, v[8], 11, -2022574463);
        y = l(y, z, w, x, v[11], 16, 1839030562);
        x = l(x, y, z, w, v[14], 23, -35309556);
        w = l(w, x, y, z, v[1], 4, -1530992060);
        z = l(z, w, x, y, v[4], 11, 1272893353);
        y = l(y, z, w, x, v[7], 16, -155497632);
        x = l(x, y, z, w, v[10], 23, -1094730640);
        w = l(w, x, y, z, v[13], 4, 681279174);
        z = l(z, w, x, y, v[0], 11, -358537222);
        y = l(y, z, w, x, v[3], 16, -722521979);
        x = l(x, y, z, w, v[6], 23, 76029189);
        w = l(w, x, y, z, v[9], 4, -640364487);
        z = l(z, w, x, y, v[12], 11, -421815835);
        y = l(y, z, w, x, v[15], 16, 530742520);
        x = l(x, y, z, w, v[2], 23, -995338651);
        w = m(w, x, y, z, v[0], 6, -198630844);
        z = m(z, w, x, y, v[7], 10, 1126891415);
        y = m(y, z, w, x, v[14], 15, -1416354905);
        x = m(x, y, z, w, v[5], 21, -57434055);
        w = m(w, x, y, z, v[12], 6, 1700485571);
        z = m(z, w, x, y, v[3], 10, -1894986606);
        y = m(y, z, w, x, v[10], 15, -1051523);
        x = m(x, y, z, w, v[1], 21, -2054922799);
        w = m(w, x, y, z, v[8], 6, 1873313359);
        z = m(z, w, x, y, v[15], 10, -30611744);
        y = m(y, z, w, x, v[6], 15, -1560198380);
        x = m(x, y, z, w, v[13], 21, 1309151649);
        w = m(w, x, y, z, v[4], 6, -145523070);
        z = m(z, w, x, y, v[11], 10, -1120210379);
        y = m(y, z, w, x, v[2], 15, 718787259);
        x = m(x, y, z, w, v[9], 21, -343485551);
        u[0] = s(w, u[0]);
        u[1] = s(x, u[1]);
        u[2] = s(y, u[2]);
        u[3] = s(z, u[3]);
    }

    function i(u, v, w, x, y, z) {
        v = s(s(v, u), s(x, z));
        return s((v << y) | (v >>> (32 - y)), w);
    }

    function j(u, v, w, x, y, z, aa) {
        return i((v & w) | ((~v) & x), u, v, y, z, aa);
    }

    function k(u, v, w, x, y, z, aa) {
        return i((v & x) | (w & (~x)), u, v, y, z, aa);
    }

    function l(u, v, w, x, y, z, aa) {
        return i(v ^ w ^ x, u, v, y, z, aa);
    }

    function m(u, v, w, x, y, z, aa) {
        return i(w ^ (v | (~x)), u, v, y, z, aa);
    }

    function n(u) {
        var v = u.length, w = [1732584193, -271733879, -1732584194, 271733878], x;
        for (x = 64; x <= u.length; x += 64)h(w, o(u.substring(x - 64, x)));
        u = u.substring(x - 64);
        var y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (x = 0; x < u.length; x++)y[x >> 2] |= u.charCodeAt(x) << ((x & 3) << 3);
        y[x >> 2] |= 128 << ((x & 3) << 3);
        if (x > 55) {
            h(w, y);
            for (x = 0; x < 16; x++)y[x] = 0;
        }
        y[14] = v * 8;
        h(w, y);
        return w;
    }

    function o(u) {
        var v = [], w = 0;
        while (w < 64)v[w >> 2] = u.charCodeAt(w++) | (u.charCodeAt(w++) << 8) | (u.charCodeAt(w++) << 16) | (u.charCodeAt(w++) << 24);
        return v;
    }

    var p = '0123456789abcdef'.split('');

    function q(u) {
        var v = '', w = 0;
        for (; w < 4; w++)v += p[(u >> ((w << 3) + 4)) & 15] + p[(u >> (w << 3)) & 15];
        return v;
    }

    function r(u) {
        for (var v = 0; v < u.length; v++)u[v] = q(u[v]);
        return u.join('');
    }

    var s = function (u, v) {
        return (u + v) & 4294967295;
    };

    function t(u) {
        if (null === u || undefined === u) {
            return null;
        } else {
            for (var v = 0; v < u.length; v++)if (u[v] > "\u007F") {
                u = g(u);
                break;
            }
            return r(n(u));
        }
    }

    if (t('hello') != '5d41402abc4b2a76b9719d911017c592')s = function (u, v) {
        var w = (u & 65535) + (v & 65535), x = (u >> 16) + (v >> 16) + (w >> 16);
        return (x << 16) | (w & 65535);
    };
    e.exports = t;
}, null);
__d("filterObject", [], function (a, b, c, d, e, f) {
    'use strict';
    var g = Object.prototype.hasOwnProperty;

    function h(i, j, k) {
        if (!i)return null;
        var l = {};
        for (var m in i)if (g.call(i, m) && j.call(k, i[m], m, i))l[m] = i[m];
        return l;
    }

    e.exports = h;
}, null);
__d("DataViewPolyfill", ["copyProperties"], function (a, b, c, d, e, f, g) {
    "use strict";
    function h(i, j, k) {
        if (j === undefined) {
            this._ba = new Uint8Array(i);
        } else if (k === undefined) {
            this._ba = new Uint8Array(i, j);
        } else this._ba = new Uint8Array(i, j, k);
        this.byteLength = this._ba.byteLength;
    }

    g(h, {isSupported: function () {
        return !!a.Uint8Array;
    }});
    g(h.prototype, {getUint8: function (i) {
        if (i >= this._ba.length)throw new Error('Trying to read beyond bounds of DataViewPolyfill');
        return this._ba[i];
    }, getUint16: function (i, j) {
        var k = this.getUint8(i), l = this.getUint8(i + 1);
        return j ? (l * 256) + k : (k * 256) + l;
    }, getUint32: function (i, j) {
        var k = this.getUint8(i), l = this.getUint8(i + 1), m = this.getUint8(i + 2), n = this.getUint8(i + 3);
        return j ? (((n * 256 + m) * 256 + l) * 256) + k : (((k * 256 + l) * 256 + m) * 256) + n;
    }});
    e.exports = h;
}, null);
__d("Emscripten", [], function (a, b, c, d, e, f) {
    e.exports = {isSupported: function () {
        return (typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!new Int32Array(1).subarray && !!new Int32Array(1).set);
    }};
}, null);
__d("XHRHttpError", [], function (a, b, c, d, e, f) {
    var g = 'HTTP_CLIENT_ERROR', h = 'HTTP_PROXY_ERROR', i = 'HTTP_SERVER_ERROR', j = 'HTTP_TRANSPORT_ERROR', k = 'HTTP_UNKNOWN_ERROR';

    function l(m, n) {
        if (n === 0) {
            var o = m.getProtocol();
            if (o === 'file' || o === 'ftp')return null;
            return j;
        } else if (n >= 100 && n < 200) {
            return h;
        } else if (n >= 200 && n < 300) {
            return null;
        } else if (n >= 400 && n < 500) {
            return g;
        } else if (n >= 500 && n < 600) {
            return i;
        } else if (n >= 12001 && n < 12156) {
            return j;
        } else return k;
    }

    e.exports = {getErrorCode: l, HTTP_CLIENT_ERROR: g, HTTP_PROXY_ERROR: h, HTTP_SERVER_ERROR: i, HTTP_TRANSPORT_ERROR: j, HTTP_UNKNOWN_ERROR: k};
}, null);
__d("xhrSimpleDataSerializer", [], function (a, b, c, d, e, f) {
    function g(h) {
        var i = [], j;
        for (j in h)i.push(encodeURIComponent(j) + '=' + encodeURIComponent(h[j]));
        return i.join('&');
    }

    e.exports = g;
}, null);
__d("XHRRequest", ["ErrorUtils", "URI", "XHRHttpError", "getSameOriginTransport", "invariant", "xhrSimpleDataSerializer"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {errorCode: null, errorMsg: null, errorType: null}, n = {loadedBytes: null, totalBytes: null};

    function o(p) {
        "use strict";
        this.setURI(p);
        this.setMethod('POST');
        this.setIsAsynchronous(true);
        this.setTransportBuilder(j);
        this.setDataSerializer(l);
        this.$XHRRequest0 = this.$XHRRequest0.bind(this);
    }

    o.prototype.setURI = function (p) {
        "use strict";
        this.$XHRRequest1 = new h(p);
        return this;
    };
    o.prototype.getURI = function () {
        "use strict";
        return this.$XHRRequest1;
    };
    o.prototype.setMethod = function (p) {
        "use strict";
        this.$XHRRequest2 = p;
        return this;
    };
    o.prototype.getMethod = function () {
        "use strict";
        return this.$XHRRequest2;
    };
    o.prototype.setData = function (p) {
        "use strict";
        this.$XHRRequest3 = p;
        return this;
    };
    o.prototype.getData = function () {
        "use strict";
        return this.$XHRRequest3;
    };
    o.prototype.setRawData = function (p) {
        "use strict";
        this.$XHRRequest4 = p;
        return this;
    };
    o.prototype.setRequestHeaderField = function (p, q) {
        "use strict";
        if (!this.$XHRRequest5)this.$XHRRequest5 = {};
        this.$XHRRequest5[p] = q;
        return this;
    };
    o.prototype.setTimeout = function (p) {
        "use strict";
        this.$XHRRequest6 = p;
        return this;
    };
    o.prototype.setResponseHandler = function (p) {
        "use strict";
        this.$XHRRequest7 = p;
        return this;
    };
    o.prototype.setErrorHandler = function (p) {
        "use strict";
        this.$XHRRequest8 = p;
        return this;
    };
    o.prototype.setAbortHandler = function (p) {
        "use strict";
        this.$XHRRequest9 = p;
        return this;
    };
    o.prototype.setTimeoutHandler = function (p) {
        "use strict";
        this.$XHRRequesta = p;
        return this;
    };
    o.prototype.setUploadProgressHandler = function (p) {
        "use strict";
        this.$XHRRequestb = p;
        return this;
    };
    o.prototype.setIsAsynchronous = function (p) {
        "use strict";
        this.$XHRRequestc = p;
        return this;
    };
    o.prototype.setTransportBuilder = function (p) {
        "use strict";
        this.$XHRRequestd = p;
        return this;
    };
    o.prototype.setDataSerializer = function (p) {
        "use strict";
        this.$XHRRequeste = p;
        return this;
    };
    o.prototype.send = function () {
        "use strict";
        var p = this.$XHRRequest6, q = this.$XHRRequestd(), r = this.getURI();
        this.$XHRRequestf = q;
        var s;
        k(this.$XHRRequest2 === 'POST' || !this.$XHRRequest4);
        if (this.$XHRRequest2 === 'GET' || this.$XHRRequest4) {
            r.addQueryData(this.$XHRRequest3);
            s = this.$XHRRequest4;
        } else s = this.$XHRRequeste(this.$XHRRequest3);
        q.onreadystatechange = this.$XHRRequest0;
        if (q.upload && this.$XHRRequestb)q.upload.onprogress = this.$XHRRequestg.bind(this);
        if (p)this.$XHRRequesth = setTimeout(this.$XHRRequesti.bind(this), p);
        q.open(this.$XHRRequest2, r.toString(), this.$XHRRequestc);
        if (this.$XHRRequest5)for (var t in this.$XHRRequest5)q.setRequestHeader(t, this.$XHRRequest5[t]);
        q.send(s);
        if (!this.$XHRRequestc)q.onreadystatechange(null, true);
    };
    o.prototype.abort = function () {
        "use strict";
        this.$XHRRequestj();
        if (this.$XHRRequest9)g.applyWithGuard(this.$XHRRequest9, null, null, null, 'XHRRequest:_abortHandler');
    };
    o.prototype.$XHRRequestj = function () {
        "use strict";
        var p = this.$XHRRequestf;
        if (p) {
            p.onreadystatechange = null;
            p.abort();
        }
        this.$XHRRequestk();
    };
    o.prototype.$XHRRequesti = function () {
        "use strict";
        this.$XHRRequestj();
        if (this.$XHRRequesta)g.applyWithGuard(this.$XHRRequesta, null, null, null, 'XHRRequest:_abortHandler');
    };
    o.prototype.$XHRRequest0 = function (p, q) {
        "use strict";
        if (!this.$XHRRequestc && q !== true)return;
        var r = this.$XHRRequestf, s = r, t = s.readyState;
        if (t >= 2) {
            var u = t === 4, v = this.getURI(), w = i.getErrorCode(v, r.status), x = this.$XHRRequest7;
            if (w !== null) {
                if (u) {
                    m.errorCode = w;
                    m.errorMsg = r.responseText;
                    m.errorType = 'HTTP';
                    if (this.$XHRRequest8)g.applyWithGuard(this.$XHRRequest8, null, [m], null, 'XHRRequest:_errorHandler');
                }
            } else if (x) {
                var y = null;
                if (x.includeHeaders)y = r.getAllResponseHeaders();
                if (u || (x.parseStreaming && t === 3))g.applyWithGuard(x, null, [r.responseText, y, u], null, 'XHRRequest:handler');
            }
            if (u)this.$XHRRequestk();
        }
    };
    o.prototype.$XHRRequestg = function (p) {
        "use strict";
        n.loadedBytes = p.loaded;
        n.totalBytes = p.total;
        if (this.$XHRRequestb)g.applyWithGuard(this.$XHRRequestb, null, [n], null, 'XHRRequest:_uploadProgressHandler');
    };
    o.prototype.$XHRRequestk = function () {
        "use strict";
        clearTimeout(this.$XHRRequesth);
        delete this.$XHRRequestf;
    };
    e.exports = o;
}, null);
__d("getCrossOriginTransport", ["ex", "invariant"], function (a, b, c, d, e, f, g, h) {
    function i() {
        try {
            var k = new XMLHttpRequest();
            if (!('withCredentials' in k) && typeof XDomainRequest !== 'undefined')k = new XDomainRequest();
            return k;
        } catch (j) {
            throw new Error(g('getCrossOriginTransport: %s', j.message));
        }
    }

    i.withCredentials = function () {
        var j = i();
        h('withCredentials' in j);
        var k = j.open;
        j.open = function () {
            k.apply(this, arguments);
            this.withCredentials = true;
        };
        return j;
    };
    e.exports = i;
}, null);
__d("PooledWebWorker", ["WebWorker"], function (a, b, c, d, e, f, g) {
    for (var h in g)if (g.hasOwnProperty(h))j[h] = g[h];
    var i = g === null ? null : g.prototype;
    j.prototype = Object.create(i);
    j.prototype.constructor = j;
    j.__superConstructor__ = g;
    function j(k, l, m) {
        "use strict";
        i.constructor.call(this, m);
        this.$PooledWebWorker0 = l;
        this.$PooledWebWorker1 = k;
    }

    j.prototype.getIndex = function () {
        "use strict";
        return this.$PooledWebWorker0;
    };
    j.prototype.getPool = function () {
        "use strict";
        return this.$PooledWebWorker1;
    };
    e.exports = j;
}, null);
__d("WebWorkerPool", ["PooledWebWorker", "emptyFunction"], function (a, b, c, d, e, f, g, h) {
    i.isSupported = function () {
        "use strict";
        return g.isSupported();
    };
    function i(j, k) {
        "use strict";
        this.$WebWorkerPool0 = [];
        for (var l = 0; l < k; l++)this.$WebWorkerPool0.push(new g(this, l, j).setErrorHandler(this.$WebWorkerPool1).setMessageHandler(this.$WebWorkerPool2).execute());
        this.$WebWorkerPool3 = 0;
    }

    i.prototype.setMessageHandler = function (j) {
        "use strict";
        this.$WebWorkerPool4 = j || h;
        return this;
    };
    i.prototype.setAllowCrossPageTransition = function (j) {
        "use strict";
        this.$WebWorkerPool0.forEach(function (k) {
            return k.setAllowCrossPageTransition(j);
        });
        return this;
    };
    i.prototype.setErrorHandler = function (j) {
        "use strict";
        this.$WebWorkerPool5 = j || h;
        return this;
    };
    i.prototype.postMessage = function () {
        "use strict";
        var j = Array.prototype.slice.call(arguments, 0), k = this.getWorker();
        k.postMessage.apply(k, j);
        return k;
    };
    i.prototype.$WebWorkerPool2 = function () {
        "use strict";
        var j = Array.prototype.slice.call(arguments, 0);
        j.unshift(this);
        this.getPool().$WebWorkerPool4.apply(this.getPool(), j);
    };
    i.prototype.$WebWorkerPool1 = function () {
        "use strict";
        var j = Array.prototype.slice.call(arguments, 0);
        j.unshift(this);
        return this.getPool().$WebWorkerPool5.apply(this.getPool(), j);
    };
    i.prototype.getWorker = function () {
        "use strict";
        var j = this.$WebWorkerPool0[this.$WebWorkerPool3];
        this.$WebWorkerPool3 = (this.$WebWorkerPool3 + 1) % this.$WebWorkerPool0.length;
        return j;
    };
    e.exports = i;
}, null);
__d("JpegResizer", ["Emscripten", "JpegResizerConfig", "JpegResizeWorkerResource", "WebWorker", "WebWorkerPool", "PUWErrorCodes"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = null;
    n.isSupported = function () {
        "use strict";
        return k.isSupported() && g.isSupported() && !h.isGKBlacklisted;
    };
    n.getSingleton = function () {
        "use strict";
        if (!m)m = new n(n.DEFAULT_POOL_SIZE).setAllowCrossPageTransition(true);
        return m;
    };
    n.prepareResource = function (o) {
        "use strict";
        j.prepareResource(i, o);
    };
    function n(o) {
        "use strict";
        o = o || n.DEFAULT_POOL_SIZE;
        j.prepareResource(i);
        this.$JpegResizer0 = (new k(i, o)).setErrorHandler(this.$JpegResizer1.bind(this)).setMessageHandler(this.$JpegResizer2.bind(this));
        this.$JpegResizer3 = {};
    }

    n.prototype.setAllowCrossPageTransition = function (o) {
        "use strict";
        this.$JpegResizer0.setAllowCrossPageTransition(o);
        return this;
    };
    n.prototype.resizeBlob = function (o, p, q) {
        "use strict";
        var r = this.$JpegResizer0.getWorker();
        if (r.isCurrentState('terminated')) {
            var s = new Error('Worker terminated');
            s.code = l.WORKER_TERMINATED;
            p(s);
            return this;
        }
        var t = r.postMessage({blob: o, height: 2048, width: 2048}).getIndex();
        this.$JpegResizer4(t).unshift({done: p, progress: q});
        return this;
    };
    n.prototype.$JpegResizer4 = function (o) {
        "use strict";
        if (!this.$JpegResizer3.hasOwnProperty(o))this.$JpegResizer3[o] = [];
        return this.$JpegResizer3[o];
    };
    n.prototype.$JpegResizer1 = function (o, p) {
        "use strict";
        o.terminate();
        var q = this.$JpegResizer4(o.getIndex());
        this.$JpegResizer5(p);
        q.forEach(function (r) {
            return r.done(p);
        });
        q.length = 0;
    };
    n.prototype.$JpegResizer2 = function (o, p) {
        "use strict";
        if (p.error)this.$JpegResizer5(p.error);
        if (p.done) {
            this.$JpegResizer4(o.getIndex()).pop().done(p.error, p.blob, p.skipped);
        } else {
            var q = this.$JpegResizer4(o.getIndex()), r = q[q.length - 1].progress;
            if (r)r({written: p.written, total: p.total});
        }
    };
    n.prototype.$JpegResizer5 = function (o) {
        "use strict";
        var p = o.message;
        if (p.indexOf('Not a JPEG file') !== -1) {
            o.code = l.BAD_JPEG;
        } else if (p.indexOf('abort()') !== -1) {
            o.code = l.WORKER_ABORT;
        } else o.code = l.UNKNOWN_RESIZE_ERROR;
    };
    n.DEFAULT_POOL_SIZE = 3;
    e.exports = n;
}, null);
__d("MercuryFileUploader", ["ArbiterMixin", "CSS", "Dialog", "DOM", "Event", "FileForm", "FileFormResetOnSubmit", "FileInput", "FormSubmitOnChange", "MercuryAttachment", "MercuryAttachmentTemplates", "MercuryConstants", "PhotosUploadID", "SubscriptionsHandler", "csx", "fbt", "getObjectValues", "mixin", "shield", "startsWith", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa) {
    var ba = x(g);
    for (var ca in ba)if (ba.hasOwnProperty(ca))ea[ca] = ba[ca];
    var da = ba === null ? null : ba.prototype;
    ea.prototype = Object.create(da);
    ea.prototype.constructor = ea;
    ea.__superConstructor__ = ba;
    function ea(ga, ha, ia, ja) {
        "use strict";
        this.$MercuryFileUploader0 = ga;
        this.$MercuryFileUploader1 = {};
        this.$MercuryFileUploader2 = {};
        this.$MercuryFileUploader3 = {};
        this.$MercuryFileUploader4 = {};
        this.$MercuryFileUploader5 = {};
        this.$MercuryFileUploader6 = {};
        this.$MercuryFileUploader7 = {};
        this.$MercuryFileUploader8 = {};
        this.updateElements(ha, ia, ja);
    }

    ea.prototype.updateElements = function (ga, ha, ia) {
        "use strict";
        this.$MercuryFileUploader9 && this.$MercuryFileUploader9.release();
        this.$MercuryFileUploader9 = new t();
        this.$MercuryFileUploadera && this.$MercuryFileUploadera.destroy();
        this.$MercuryFileUploadera = new l(ga, [o, m]);
        this.$MercuryFileUploadera.setAllowCrossOrigin(true);
        this.$MercuryFileUploadera.setUploadInParallel(true);
        var ja = j.find(ga, "._4q60"), ka = j.find(ja, "._4q61");
        new n(ja, ka, ha);
        this.$MercuryFileUploader9.addSubscriptions(this.$MercuryFileUploadera.subscribe('submit', function () {
            var la = {count: 0, file_sizes: []};
            if (ha.files) {
                for (var ma = 0; ma < ha.files.length; ma++)if (ha.files[ma].size > r.AttachmentMaxSize) {
                    this.showAttachmentSizeErrorDialog();
                    return false;
                }
                var na = {};
                for (var oa = 0; oa < ha.files.length; oa++) {
                    var pa = this.$MercuryFileUploaderb();
                    this.$MercuryFileUploaderc(pa, ha.files[oa].name);
                    la.count++;
                    la.file_sizes.push(ha.files[oa].size);
                    na[pa] = ha.files[oa];
                }
                this.$MercuryFileUploadera.setFiles(na);
            } else {
                ia.value = this.$MercuryFileUploaderb();
                this.$MercuryFileUploaderc(ia.value, ha.value);
                la.count = 1;
            }
            this.inform('submit', la);
        }.bind(this)), this.$MercuryFileUploadera.subscribe('success', this.$MercuryFileUploaderd.bind(this)), this.$MercuryFileUploadera.subscribe('failure', this.$MercuryFileUploadere.bind(this)), k.listen(ka, 'click', y(this.inform, this, 'open')));
    };
    ea.prototype.showAttachmentSizeErrorDialog = function () {
        "use strict";
        this.$MercuryFileUploadera.abort();
        this.$MercuryFileUploadera.clear();
        new i().setTitle("\u0412\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0439 \u0432\u0430\u043c\u0438 \u0444\u0430\u0439\u043b \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u0439").setBody("\u0412\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0439 \u0432\u0430\u043c\u0438 \u0444\u0430\u0439\u043b \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u0439. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u2013 25 \u041c\u0411.").setButtons(i.OK).setSemiModal(true).show();
    };
    ea.prototype.addDroppedFiles = function (ga) {
        "use strict";
        if (!this.$MercuryFileUploadera || !this.$MercuryFileUploadera.canUseXHR())return;
        var ha = {}, ia = {count: 0, file_sizes: []};
        for (var ja = 0; ja < ga.length; ja++) {
            var ka = ga[ja];
            if (ka.size > r.AttachmentMaxSize) {
                this.showAttachmentSizeErrorDialog();
                return false;
            }
            var la = this.$MercuryFileUploaderb();
            this.$MercuryFileUploaderc(la, ka.name);
            ha[la] = ka;
            ia.file_sizes.push(ka.size);
            ia.count++;
        }
        this.$MercuryFileUploadera.setFiles(ha);
        this.$MercuryFileUploadera.forceSendViaXHR();
        this.inform('submit', ia);
    };
    ea.prototype.isUploading = function () {
        "use strict";
        return !!Object.keys(this.$MercuryFileUploader6).length;
    };
    ea.prototype.addCachedAttachments = function (ga) {
        "use strict";
        ga.forEach(function (ha) {
            var ia = this.$MercuryFileUploaderb();
            this.$MercuryFileUploaderc(ia, ha.filename);
            this.$MercuryFileUploaderf(ia, ha);
        }.bind(this));
    };
    ea.prototype.addCachedImageFiles = function (ga) {
        "use strict";
        var ha = "\u0424\u043e\u0442\u043e";
        ga.forEach(function (ia) {
            var ja = this.$MercuryFileUploaderb();
            this.$MercuryFileUploaderc(ja, ha);
            this.$MercuryFileUploaderf(ja, {filename: ia, image_id: ia, filetype: 'image/jpeg'});
        }.bind(this));
    };
    ea.prototype.getAttachments = function () {
        "use strict";
        return w(this.$MercuryFileUploader1);
    };
    ea.prototype.getImageFiles = function () {
        "use strict";
        var ga = Object.keys(this.$MercuryFileUploader2).sort(), ha = [];
        ga.forEach(function (ia) {
            return ha.push(this.$MercuryFileUploader2[ia]);
        }.bind(this));
        return ha;
    };
    ea.prototype.getVideoFiles = function () {
        "use strict";
        return w(this.$MercuryFileUploader3);
    };
    ea.prototype.getAudioFiles = function () {
        "use strict";
        return w(this.$MercuryFileUploader4);
    };
    ea.prototype.getFiles = function () {
        "use strict";
        return w(this.$MercuryFileUploader5);
    };
    ea.prototype.removeAttachments = function () {
        "use strict";
        j.empty(this.$MercuryFileUploader0);
        this.$MercuryFileUploader1 = {};
        this.$MercuryFileUploader2 = {};
        this.$MercuryFileUploader3 = {};
        this.$MercuryFileUploader4 = {};
        this.$MercuryFileUploader5 = {};
        this.$MercuryFileUploader7 = {};
        this.$MercuryFileUploader6 = {};
        this.$MercuryFileUploader8 = {};
        h.hide(this.$MercuryFileUploader0);
        this.inform('dom-updated');
    };
    ea.prototype.destroy = function () {
        "use strict";
        this.$MercuryFileUploader9 && this.$MercuryFileUploader9.release();
        this.$MercuryFileUploadera && this.$MercuryFileUploadera.destroy();
        this.removeAttachments();
    };
    ea.prototype.$MercuryFileUploaderc = function (ga, ha) {
        "use strict";
        var ia = q[':fb:mercury:upload-file-row'].build();
        this.$MercuryFileUploader7[ga] = ia;
        this.$MercuryFileUploader6[ga] = true;
        this.$MercuryFileUploader8[ga] = Date.now();
        j.appendContent(ia.getNode('iconText'), fa(ha));
        k.listen(ia.getNode('closeFileUpload'), 'click', this.$MercuryFileUploaderg.bind(this, ga));
        j.appendContent(this.$MercuryFileUploader0, ia.getRoot());
        h.show(this.$MercuryFileUploader0);
        this.inform('dom-updated');
    };
    ea.prototype.$MercuryFileUploaderg = function (ga, event) {
        "use strict";
        if (this.$MercuryFileUploader6[ga]) {
            this.inform('upload-canceled-during-upload');
        } else if (this.$MercuryFileUploader1[ga] || this.$MercuryFileUploader2[ga] || this.$MercuryFileUploader3[ga] || this.$MercuryFileUploader4[ga] || this.$MercuryFileUploader5[ga])this.inform('upload-canceled-after-uploaded');
        delete this.$MercuryFileUploader1[ga];
        delete this.$MercuryFileUploader2[ga];
        delete this.$MercuryFileUploader3[ga];
        delete this.$MercuryFileUploader4[ga];
        delete this.$MercuryFileUploader5[ga];
        delete this.$MercuryFileUploader6[ga];
        delete this.$MercuryFileUploader8[ga];
        var ha = this.$MercuryFileUploader7[ga];
        delete this.$MercuryFileUploader7[ga];
        if (ha) {
            j.remove(ha.getRoot());
            this.inform('dom-updated');
        }
        this.inform('upload-canceled');
        return false;
    };
    ea.prototype.$MercuryFileUploaderh = function (ga, ha) {
        "use strict";
        var ia = this.$MercuryFileUploader7[ga], ja = p.getAttachIconClassByMime(ha);
        h.addClass(ia.getNode('iconText'), ja);
        h.addClass(ia.getRoot(), 'done');
    };
    ea.prototype.$MercuryFileUploaderf = function (ga, ha) {
        "use strict";
        if (this.$MercuryFileUploader6[ga]) {
            delete this.$MercuryFileUploader6[ga];
            if (ha.image_id) {
                this.$MercuryFileUploader2[ga] = ha.image_id;
            } else if (ha.video_id) {
                this.$MercuryFileUploader3[ga] = ha.video_id;
            } else if (ha.audio_id) {
                this.$MercuryFileUploader4[ga] = ha.audio_id;
            } else if (ha.file_id) {
                this.$MercuryFileUploader5[ga] = ha.file_id;
            } else this.$MercuryFileUploader1[ga] = ha;
            this.$MercuryFileUploaderh(ga, ha.filetype);
            this.inform('one-upload-completed', {upload_time_ms: Date.now() - this.$MercuryFileUploader8[ga]});
        }
        if (!this.isUploading())this.inform('all-uploads-completed', {count: this.getAttachments().length});
    };
    ea.prototype.$MercuryFileUploaderd = function (event, ga) {
        "use strict";
        var ha = ga.response.getPayload();
        this.$MercuryFileUploaderf(this.$MercuryFileUploaderi(ga), ha.metadata[0]);
    };
    ea.prototype.$MercuryFileUploadere = function (event, ga) {
        "use strict";
        this.inform('one-upload-failed');
        this.$MercuryFileUploaderg(this.$MercuryFileUploaderi(ga), event);
    };
    ea.prototype.$MercuryFileUploaderb = function () {
        "use strict";
        return 'upload_' + s.getNewID();
    };
    ea.prototype.$MercuryFileUploaderi = function (ga) {
        "use strict";
        var ha = ga.response.getPayload();
        if (ga.upload) {
            return ga.upload.getName();
        } else return ha.uploadID;
    };
    function fa(ga) {
        if (ga && z(ga, 'C:\\fakepath\\'))return ga.substring(12);
        return ga;
    }

    e.exports = ea;
}, null);
__d("MercuryShareLinkUploader", ["ArbiterMixin", "AsyncRequest", "CSS", "DOM", "Event", "Form", "URLScraper", "WebMessengerEvents", "mixin", "isEmpty"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = o(g);
    for (var r in q)if (q.hasOwnProperty(r))t[r] = q[r];
    var s = q === null ? null : q.prototype;
    t.prototype = Object.create(s);
    t.prototype.constructor = t;
    t.__superConstructor__ = q;
    function t(u, v, w, x, y) {
        "use strict";
        this.$MercuryShareLinkUploader0 = u;
        this.$MercuryShareLinkUploader1 = v;
        this.$MercuryShareLinkUploader2 = w;
        this.$MercuryShareLinkUploader3 = y;
        this.$MercuryShareLinkUploader4 = false;
        this.$MercuryShareLinkUploader5 = null;
        this.$MercuryShareLinkUploader6 = null;
        k.listen(x, 'click', this.close.bind(this));
        k.listen(y, 'keyup', function () {
            !y.value.length && this.$MercuryShareLinkUploader7.enable();
        }.bind(this));
        this.$MercuryShareLinkUploader7 = new m(y);
        this.$MercuryShareLinkUploader7.subscribe('match', function (z, aa) {
            this.loadShare(aa && aa.url);
        }.bind(this));
    }

    t.prototype.getAttachData = function () {
        "use strict";
        return this.loadAttachData(this.$MercuryShareLinkUploader4, this.$MercuryShareLinkUploader0, this.$MercuryShareLinkUploader3);
    };
    t.prototype.loadAttachData = function (u, v, w, x) {
        "use strict";
        if (u) {
            var y = l.serialize(v), z = y.attachment && y.attachment.params, aa = y.link_metrics ? y.link_metrics.no_image : true;
            if (!z || p(z))return null;
            var ba = x ? x() : w.value;
            if (ba.indexOf(z.url) === -1)return y;
            if (!z.summary && !z.favicon && aa && z.title && z.url && z.url.substr(0, z.title.length) === z.title)return null;
            return y;
        }
        return null;
    };
    t.prototype.check = function () {
        "use strict";
        this.$MercuryShareLinkUploader7.check();
    };
    t.prototype.close = function () {
        "use strict";
        this.$MercuryShareLinkUploader8();
        this.$MercuryShareLinkUploader7.disable();
        this.inform('closed');
    };
    t.prototype.clear = function () {
        "use strict";
        this.$MercuryShareLinkUploader8();
        this.$MercuryShareLinkUploader7.enable();
    };
    t.prototype.enable = function () {
        "use strict";
        this.$MercuryShareLinkUploader7.enable();
    };
    t.prototype.disable = function () {
        "use strict";
        this.$MercuryShareLinkUploader7.disable();
    };
    t.prototype.loadShare = function (u) {
        "use strict";
        this.$MercuryShareLinkUploader5 = u;
        this.$MercuryShareLinkUploader6 && this.$MercuryShareLinkUploader6.abort();
        this.$MercuryShareLinkUploader6 = new h().setMethod('POST').setURI('/ajax/share_scrape.php').setData({u: u}).setHandler(this.$MercuryShareLinkUploader9.bind(this).bind(null, u)).setStatusElement(this.$MercuryShareLinkUploader2);
        this.$MercuryShareLinkUploader6.send();
        this.inform('link-detected');
    };
    t.prototype.$MercuryShareLinkUploader9 = function (u, v) {
        "use strict";
        if (this.$MercuryShareLinkUploader5 !== u)return;
        this.$MercuryShareLinkUploader5 = null;
        this.$MercuryShareLinkUploader6 = null;
        i.show(this.$MercuryShareLinkUploader0);
        j.empty(this.$MercuryShareLinkUploader1);
        j.setContent(this.$MercuryShareLinkUploader1, v.payload);
        this.$MercuryShareLinkUploader4 = true;
        if (!this.getAttachData()) {
            this.close();
            return;
        }
        n.detailDOMChanged();
    };
    t.prototype.$MercuryShareLinkUploader8 = function () {
        "use strict";
        i.hide(this.$MercuryShareLinkUploader0);
        this.$MercuryShareLinkUploader4 = false;
        this.$MercuryShareLinkUploader5 = null;
        this.$MercuryShareLinkUploader6 && this.$MercuryShareLinkUploader6.abort();
        this.$MercuryShareLinkUploader6 = null;
        this.$MercuryShareLinkUploader7.reset();
        n.detailDOMChanged();
    };
    e.exports = t;
}, null);
__d("VideoCallRecordMessageDialog", ["AsyncDialog", "AsyncRequest", "Dialog", "URI", "tx"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {get: function (m, n) {
        var o = "\u0425\u043e\u0442\u0435\u043b\u0438 \u0431\u044b \u0432\u044b \u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435?", p = "\u041d\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435";
        return new i().setTitle(k._("{firstname} \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d(\u0430)", {firstname: n})).setBody(o).setButtons([
            {name: 'record-message', label: p},
            i.CANCEL
        ]).setHandler(function () {
            var q = j('/ajax/messaging/composer.php').setQueryData({ids: [m], autoloadvideo: true}).toString();
            g.send(new h(q));
        });
    }};
    e.exports = l;
}, null);
__d("VideoCallCore", ["Event", "Arbiter", "AsyncRequest", "AvailableList", "AvailableListConstants", "Bootloader", "ChannelConstants", "Cookie", "CSS", "Dialog", "FBRTCLogger", "UserAgent_DEPRECATED", "VideoCallSupport", "emptyFunction", "ge", "PresenceStatus", "VideoCallUI", "VideoCallIncomingCallController", "VideoCallTemplates", "ShortProfiles", "VideoCallRecordMessageDialog"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    var w = b('VideoCallUI').module, x = b('VideoCallIncomingCallController').module;
    b('VideoCallTemplates');
    var y = [], z = [], aa = null, ba = {mightReloadPostInstall: function () {
        return r.windows();
    }, onVideoMessage: function (ea) {
        y.push(ea);
        l.loadModules(["VideoCallController"], t);
    }, onRTCMessage: function (ea) {
        if (s.isReceiveWebrtcSupported() && x) {
            z.push(ea);
            ca();
        }
    }, setMessageHandler: function (ea) {
        this.onVideoMessage = ea;
        if (ea)while (y.length)ea(y.shift());
    }, setRTCMessageHandler: function (ea) {
        this.onRTCMessage = ea;
        if (ea)while (z.length)ea(z.shift());
    }, availableForCall: function (ea) {
        var fa = j.get(ea);
        return fa == k.ACTIVE || fa == k.IDLE;
    }, attachListenerToProfileButton: function (ea) {
        var fa = u('videoCallProfileButton');
        if (fa) {
            if (!s.isVideoCallSupported()) {
                o.hide(fa);
                return;
            }
            g.listen(fa, 'click', function (event) {
                ba.startCallOrLeaveMessage(ea, 'profile_button_click_timeline');
            });
        }
    }, startCallOrLeaveMessage: function (ea, fa) {
        if (this.availableForCall(ea)) {
            ba.showOutgoingCallDialog(ea, fa);
        } else b('ShortProfiles').get(ea, function (ga) {
            b('VideoCallRecordMessageDialog').get(ea, ga.firstName).show();
        });
    }, showOutgoingCallDialog: function (ea, fa) {
        var ga = fa || 'unknown';
        ba.logClick(ea, ga);
        if (s.isReceiveWebrtcSupported() && w) {
            var ha = v.getCapabilities(ea), ia = m.CAPABILITY_VOIP_INTEROP | m.CAPABILITY_VIDEO, ja = ha & ia;
            if (ja !== 0) {
                var ka = parseInt(ea, 10);
                ca();
                aa.startingCallTo(ka);
                var la = q.Trigger.CHAT_TAB_ICON;
                w.open(ea, true, la);
                return;
            }
        }
        ba.makeSkypeCall(ea);
    }, makeSkypeCall: function (ea) {
        var fa = s.isPluginInstalled() ? 'outgoing_dialog.php' : 'intro.php', ga = '/ajax/chat/video/' + fa + '?idTarget=' + ea;
        new p().setAllowCrossPageTransition(true).setAsync(new i(ga).setHandler(t).setServerDialogCancelHandler(t)).show();
    }, logClick: function (ea, fa) {
        new i().setURI('/ajax/chat/video/log_click.php').setData({targetUserID: ea, clickSource: fa}).setAllowCrossPageTransition(true).setErrorHandler(t).send();
    }};

    function ca() {
        if (!aa)aa = new x(ba);
    }

    function da() {
        if (!ba.mightReloadPostInstall())return;
        var ea = n.get('vcpwn');
        if (ea) {
            n.clear('vcpwn');
            var fa = n.get('vctid');
            if (fa) {
                n.clear('vctid');
                if (n.get('vctid'))return;
                if (fa && ba.isInstalled()) {
                    var ga = '/ajax/chat/video/outgoing_dialog.php?idTarget=' + fa;
                    new p().setAllowCrossPageTransition(true).setAsync(new i(ga)).show();
                }
            }
        }
    }

    h.subscribe(m.getArbiterType('video'), function (ea, fa) {
        ba.onVideoMessage(fa.obj);
    });
    h.subscribe(m.getArbiterType('webrtc'), function (ea, fa) {
        ba.onRTCMessage(fa.obj);
    });
    h.subscribe(m.getArbiterType('chat_event'), function (ea, fa) {
        if (fa.obj.event_name == "missed-call")l.loadModules(["VideoCallController"], function (ga) {
            ga.onMissedCallEvent(fa.obj);
        });
    });
    da();
    e.exports = ba;
}, null);
__d("ChatActivity", ["Event", "Arbiter", "AvailableList", "AvailableListConstants", "JSLogger", "MercuryConfig", "PresenceState", "UserActivity", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = l.activity_limit || 60000, q = l.idle_limit || 1800000, r = l.idle_poll_interval || 300000, s = k.create('chat_activity'), t = Date.now(), u = t, v = true;

    function w() {
        var aa = Date.now();
        return !!(v && (aa - t < p));
    }

    var x = o(new h(), {isActive: w});

    function y() {
        var aa = t;
        t = Date.now();
        if (t - aa > q) {
            s.debug('idle_to_active', aa);
            m.doSync();
        }
        x.inform('activity');
    }

    i.subscribe(j.ON_AVAILABILITY_CHANGED, function () {
        if (!i.isUserIdle())u = Date.now();
    });
    g.listen(window, 'focus', function () {
        v = true;
        y();
    });
    g.listen(window, 'blur', function () {
        v = false;
    });
    n.subscribe(function () {
        y();
    });
    function z(aa) {
        var ba = aa && aa.at && m.verifyNumber(aa.at);
        if (typeof ba !== 'number')ba = null;
        return ba || 0;
    }

    setInterval(function () {
        var aa = Date.now(), ba = z(m.get()), ca = Math.max(t, ba, u);
        if (aa - ca > q) {
            s.debug('idle', {cookie: ba, local: t, presence: u});
            x.inform('idle', aa - ca);
        }
    }, r);
    m.registerStateStorer(function (aa) {
        var ba = z(aa);
        if (ba < t)aa.at = t;
        return aa;
    });
    h.subscribe(k.DUMP_EVENT, function (aa, ba) {
        ba.chat_activity = {activity_limit: p, idle_limit: q, idle_poll_interval: r, last_active_time: t, last_global_active_time: u};
    });
    e.exports = x;
}, null);
__d("MercuryTimestampTracker", ["MercuryActionTypeConstants", "MercuryPayloadSource", "MercurySingletonMixin", "MercuryServerRequests", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(m) {
        this._fbid = m;
        this._serverRequests = j.getForFBID(this._fbid);
        this._lastTimestamp = 0;
        this._serverRequests.subscribe('update-messages', function (n, o) {
            if (!o.actions || !o.actions.length)return;
            if (o.payload_source == h.CLIENT_SEND_MESSAGE || o.payload_source == h.UNKNOWN)return;
            for (var p = 0; p < o.actions.length; p++) {
                var q = o.actions[p], r = q.action_type;
                if (r == g.USER_GENERATED_MESSAGE && q.thread_id && q.timestamp > this._lastTimestamp)this._lastTimestamp = q.timestamp;
            }
        }.bind(this));
    }

    k(l.prototype, {getLastUserMessageTimestamp: function () {
        return this._lastTimestamp;
    }});
    k(l, i);
    e.exports = l;
}, null);
__d("ChatTabModel", ["Arbiter", "ArbiterMixin", "ChatBehavior", "ChatConfig", "LogHistory", "JSLogger", "MercuryAssert", "PresenceInitialData", "PresenceState", "PresenceUtil", "areJSONRepresentationsEqual", "arrayContains", "copyProperties", "MercuryServerRequests", "MercuryMessages", "MercuryThreads", "MercuryTimestampTracker"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t = b('MercuryServerRequests').get(), u = b('MercuryMessages').get(), v = b('MercuryThreads').get(), w = b('MercuryTimestampTracker').get(), x = [], y = null, z = null, aa = null, ba = null;

    function ca() {
        return parseInt(n.serverTime, 10);
    }

    var da = j.get('tab_max_load_age') || 3600000, ea = ca() - da, fa = 0, ga = 20, ha = k.getInstance('chat_tab_model'), ia = false;

    function ja(cb) {
        var db = o.verifyNumber(cb.uct2);
        if (!db || typeof db !== 'number') {
            ha.warn('bad_cookie_version', cb);
            return null;
        }
        if (db < fa || db < ea)return null;
        return db;
    }

    function ka(cb) {
        var db = ja(cb), eb = {};
        if (!db) {
            eb.old_tabs = cb && cb.t2 && JSON.stringify(cb.t2);
            eb.old_promoted = cb && cb.lm2;
            eb.old_time = cb && cb.uct2;
            eb.old_reason = cb && cb.tr;
            eb.old_window = cb && cb.tw;
            var fb;
            if (z && cb.t2)for (var gb = 0; gb < cb.t2.length; gb++) {
                var hb = cb.t2[gb];
                if (hb.i === z)fb = hb.r;
            }
            var ib = [];
            x.forEach(function (jb) {
                if (!jb.fragile) {
                    var kb = {i: jb.id, si: jb.server_id};
                    if (jb.raised || (jb.id === z && fb))kb.r = 1;
                    ib.push(kb);
                }
            });
            cb.t2 = ib;
            cb.lm2 = y;
            cb.uct2 = fa;
            cb.tr = ba;
            cb.tw = p.getSessionID();
            eb.new_tabs = JSON.stringify(cb.t2);
            eb.new_promoted = cb.lm2;
            eb.new_time = cb.uct2;
            eb.new_reason = cb.tr;
            eb.new_window = cb.tw;
            ha.debug('store', eb);
        } else {
            eb.tabs = cb && cb.t2 && JSON.stringify(cb.t2);
            eb.promoted = cb && cb.lm2;
            eb.time = cb && cb.uct2;
            eb.reason = cb && cb.tr;
            eb.window = cb && cb.tw;
            eb.last_change_time = fa;
            eb.last_change_reason = ba;
            eb.min_change_time = ea;
            ha.warn('store_bad_state', eb);
        }
        return cb;
    }

    function la(cb) {
        if (cb) {
            var db = ja(cb);
            if (db && db !== fa) {
                var eb = {};
                eb.old_tabs = JSON.stringify(x);
                eb.old_promoted = y;
                eb.old_time = fa;
                eb.old_reason = ba;
                eb.window_id = p.getSessionID();
                eb.cookie_tabs = cb && cb.t2 && JSON.stringify(cb.t2);
                eb.cookie_promoted = cb && cb.lm2;
                eb.cookie_time = cb && cb.uct2;
                eb.cookie_reason = cb && cb.tr;
                eb.cookie_window = cb && cb.tw;
                fa = db;
                ba = 'load';
                var fb = ma(cb.t2, cb.lm2 || null);
                eb.load_result = fb;
                eb.new_tabs = JSON.stringify(x);
                eb.new_promoted = y;
                eb.new_time = fa;
                eb.new_reason = ba;
                var event = 'load';
                if (!ia)event += '_init';
                ha.log(event, eb);
                return fb;
            }
        } else ha.warn('load_bad_state', cb);
        return false;
    }

    function ma(cb, db) {
        if (na(cb, db)) {
            var eb = x.filter(function (hb) {
                return hb.fragile;
            }), fb = {};
            y = null;
            x = cb.map(function (hb) {
                var ib = {id: hb.i, server_id: hb.si};
                if (ib.id == db)y = ib.id;
                if (z == hb.i) {
                    var jb = sa(z);
                    if (jb != -1) {
                        ib.raised = x[jb].raised;
                        return ib;
                    } else return null;
                }
                if (hb.r)ib.raised = true;
                fb[ib.id] = ib;
                return ib;
            });
            x = x.filter(function (hb) {
                return hb != null;
            });
            if (aa)for (var gb in aa)if (!fb[gb] || !fb[gb].raised)delete aa[gb];
            eb = eb.filter(function (hb) {
                return !fb[hb.id];
            });
            x = x.concat(eb);
            ra();
            return true;
        }
        return false;
    }

    function na(cb, db) {
        if (db != y)return true;
        var eb = x.filter(function (hb) {
            return !hb.fragile;
        });
        if (cb.length != eb.length)return true;
        for (var fb = 0, gb = cb.length; fb < gb; fb++) {
            if (cb[fb].id === z)continue;
            if (!q(cb[fb], eb[fb]))return true;
        }
        return false;
    }

    function oa(cb, db, eb) {
        var fb = la(o.get());
        if (db === undefined || db > fa) {
            if (cb()) {
                fb = true;
                ba = eb || null;
                qa(db);
            }
        } else ha.error('rejected', {change_time: db, state_time: fa});
        fb && pa();
    }

    function pa() {
        if (ia)ab.inform('chat/tabs-changed', ab.get());
    }

    function qa(cb) {
        if (cb === undefined)cb = Math.max(w.getLastUserMessageTimestamp() || 1, fa + 1);
        fa = cb;
        o.doSync();
    }

    function ra(cb) {
        var db = x.length - ga;
        if (db > 0)x = x.filter(function (eb) {
            return eb.raised || eb.id == cb || db-- <= 0;
        });
        if (db > 0)x = x.filter(function (eb) {
            return eb.id == y || eb.id == cb || db-- <= 0;
        });
    }

    function sa(cb) {
        for (var db = 0; db < x.length; db++)if (x[db].id == cb)return db;
        return -1;
    }

    function ta(cb, db) {
        var eb = v.getThreadMetaNow(cb);
        if (!eb)return false;
        if (eb.is_canonical_user) {
            return wa(cb, db);
        } else {
            var fb = ua(cb);
            if (fb)t.getServerThreadID(cb, function (gb) {
                if (ya(cb, gb)) {
                    qa();
                    pa();
                }
            });
            return fb;
        }
    }

    function ua(cb) {
        if (sa(cb) === -1) {
            x.push({id: cb, fragile: true});
            ha.log('open_fragile_tab', {tabs: JSON.stringify(x), opened: cb, window_id: p.getSessionID()});
            return true;
        }
        return false;
    }

    function va(cb) {
        var db = [];
        cb.forEach(function (eb) {
            var fb = sa(eb);
            if (fb !== -1)db.push(x[fb]);
        });
        x.forEach(function (eb) {
            if (!r(cb, eb.id))db.push(eb);
        });
        oa(function () {
            if (na(db, y)) {
                x = db;
                return true;
            }
            return false;
        });
    }

    function wa(cb, db) {
        var eb = sa(cb);
        if (eb != -1)if (x[eb].fragile) {
            x.splice(eb, 1);
        } else {
            db && (x[eb].signatureID = db);
            return true;
        }
        for (var fb = 0; fb <= x.length; fb++)if (fb == x.length || x[fb].fragile) {
            x.splice(fb, 0, {id: cb, signatureID: db});
            ra(cb);
            ha.log('open_tab', {tabs: JSON.stringify(x), opened: cb, window_id: p.getSessionID()});
            return true;
        }
    }

    function xa(cb) {
        var db = sa(cb);
        if (db != -1 && (!x[db].raised || y !== cb)) {
            x[db].raised = true;
            y = cb;
            return true;
        }
        return false;
    }

    function ya(cb, db) {
        var eb = sa(cb);
        if (eb != -1 && x[eb].fragile) {
            var fb = x[eb];
            fb.fragile = false;
            fb.server_id = db;
            var gb = [];
            x.forEach(function (hb) {
                if (hb.id != cb) {
                    if (fb && hb.fragile) {
                        gb.push(fb);
                        fb = null;
                    }
                    gb.push(hb);
                }
            });
            if (fb)gb.push(fb);
            x = gb;
            ha.log('make_permanent', {tabs: JSON.stringify(x), tab_id: cb, window_id: p.getSessionID()});
            return true;
        }
        return false;
    }

    function za(cb) {
        var db = sa(cb);
        if (cb == y)y = null;
        if (db != -1) {
            x.splice(db, 1);
            ha.log('close_tab', {tabs: JSON.stringify(x), closed: cb, window_id: p.getSessionID()});
            return true;
        }
        return false;
    }

    o.registerStateStorer(ka);
    o.registerStateLoader(function (cb) {
        if (la(cb))pa();
    });
    function ab() {
    }

    s(ab, h, {isTabPromoted: function (cb) {
        if (cb)return cb == y;
        return false;
    }, indexOf: function (cb) {
        return sa(cb);
    }, getTab: function (cb) {
        m.isThreadID(cb);
        var db = this.indexOf(cb);
        if (db > -1) {
            var eb = x[db];
            return s({}, eb);
        }
        return null;
    }, getEmptyTab: function () {
        var cb;
        for (var db = 0; db < x.length; db++) {
            cb = x[db].id;
            if (v.isNewEmptyLocalThread(cb))return cb;
        }
        cb = 'root:' + u.generateNewClientMessageID(Date.now());
        v.createNewLocalThread(cb, []);
        return cb;
    }, getServerTime: function () {
        return ca();
    }, changeShowingTabs: function (cb) {
        return va(cb);
    }, closeAllTabs: function () {
        if (x.length) {
            ha.log('close_all_tabs', {closed_tabs: JSON.stringify(x), window_id: p.getSessionID()});
            x = [];
            y = null;
            if (aa)aa = {};
            qa();
            pa();
        }
    }, closeFragileTabs: function () {
        var cb = [];
        for (var db = 0; db < x.length; db++)if (x[db].fragile && !v.isNewEmptyLocalThread(x[db].id)) {
            cb.push(x[db]);
            x.splice(db);
            pa();
            break;
        }
        ha.log('close_fragile_tabs', {tabs: JSON.stringify(x), fragile_closed: cb, window_id: p.getSessionID()});
    }, closeTab: function (cb, db) {
        m.isThreadID(cb);
        var eb = false;
        if (aa) {
            delete aa[cb];
            eb = true;
        }
        oa(function () {
            if (za(cb))eb = true;
            return eb;
        }, undefined, db);
    }, raiseTab: function (cb, db, eb) {
        m.isThreadID(cb);
        var fb = false;
        if (aa && db) {
            aa[cb] = true;
            fb = true;
        }
        if (!db && cb === z) {
            fb && pa();
            return;
        }
        oa(function () {
            if (ta(cb, eb))fb = true;
            var gb = sa(cb);
            if (gb != -1 && !x[gb].raised) {
                x[gb].raised = true;
                fb = true;
                ha.log('raise_tab', {tabs: JSON.stringify(x), raised: cb, window_id: p.getSessionID()});
            }
            return fb;
        });
    }, get: function () {
        var cb = x.map(function (db) {
            var eb = s({}, db);
            delete eb.fragile;
            if (aa)eb.raised = aa[eb.id];
            return eb;
        });
        return {tabs: cb, promoted: y};
    }, openFragileTab: function (cb) {
        m.isThreadID(cb);
        if (ua(cb))pa();
    }, openTab: function (cb) {
        m.isThreadID(cb);
        oa(ta.bind(null, cb));
    }, lowerTab: function (cb) {
        m.isThreadID(cb);
        var db = false;
        if (aa) {
            delete aa[cb];
            db = true;
        }
        oa(function () {
            var eb = sa(cb);
            if (eb != -1 && x[eb].raised) {
                delete x[eb].raised;
                ha.log('lower_tab', {tabs: JSON.stringify(x), lowered: cb, window_id: p.getSessionID()});
                db = true;
            }
            return db;
        });
    }, raiseAndPromoteTab: function (cb, db, eb, fb, gb) {
        m.isThreadID(cb);
        var hb = false;
        if (aa && db) {
            aa[cb] = true;
            hb = true;
        }
        if (!db && cb === z) {
            hb && pa();
            return;
        }
        oa(function () {
            if (ta(cb, eb))hb = true;
            if (xa(cb)) {
                hb = true;
                ha.log('raise_and_promote_tab', {tabs: JSON.stringify(x), promoted: cb, window_id: p.getSessionID()});
            }
            return hb;
        }, fb, gb);
    }, setPromotedTab: function (cb) {
        m.isThreadID(cb);
        oa(xa.bind(null, cb));
    }, promoteThreadInPlaceOfThread: function (cb, db, eb, fb) {
        m.isThreadID(cb);
        m.isThreadID(db);
        oa(function () {
            var gb = sa(cb), hb = sa(db);
            if (fb) {
                y = cb;
            } else if (y === db)return true;
            var ib = x[gb];
            if (eb) {
                m.isThreadID(eb);
                var jb = sa(eb), kb = x[hb];
                x[hb] = ib;
                x.splice(gb, 1);
                x.splice(jb, 0, kb);
            } else {
                x[gb] = x[hb];
                x[hb] = ib;
            }
            return true;
        });
    }, squelchTab: function (cb) {
        m.isThreadID(cb);
        z = cb;
        this.lowerTab(cb);
        ha.log('squelch_tab', {squelched: cb, tabs: JSON.stringify(x), window_id: p.getSessionID()});
    }, clearSquelchedTab: function () {
        if (z)ha.log('unsquelch_tab', {squelched: z, tabs: JSON.stringify(x), window_id: p.getSessionID()});
        z = null;
    }, persistLocalRaised: function () {
        if (aa) {
            oa(function () {
                var cb = false;
                x.forEach(function (db) {
                    if (db.raised != aa[db.id]) {
                        cb = true;
                        if (aa[db.id]) {
                            db.raised = true;
                        } else delete db.raised;
                    }
                });
                return cb;
            });
            ha.log('persist_local_raise', {tabs: JSON.stringify(x), window_id: p.getSessionID()});
        }
    }});
    g.subscribe(l.DUMP_EVENT, function (cb, db) {
        db.chat_tabs = {promoted: y, tabs: x.map(function (eb) {
            return s({}, eb);
        }), time: fa, max_load_age: da};
    });
    function bb() {
        var cb = i.ignoresRemoteTabRaise();
        if (cb && !aa) {
            ha.log('start_ignore_remote_raise');
            aa = {};
            pa();
        } else if (!cb && aa) {
            ha.log('stop_ignore_remote_raise');
            aa = null;
            pa();
        }
    }

    i.subscribe(i.ON_CHANGED, bb);
    bb();
    la(o.getInitial(), true);
    if (fa === 0)fa = ca() - 600000;
    ia = true;
    e.exports = ab;
}, null);
__d("TabsViewport", ["Arbiter", "ArbiterMixin", "ChatTabModel", "Dock", "DOM", "DOMDimensions", "Event", "Parent", "Vector", "ViewportBounds", "areJSONRepresentationsEqual", "copyProperties", "csx", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
    var u = 175, v = 269, w = 0;

    function x() {
        return u;
    }

    function y() {
        return v;
    }

    function z(aa) {
        this._root = aa;
        var ba = this._recalculateWidth.bind(this);
        m.listen(window, 'resize', ba);
        j.subscribe('resize', ba);
        g.subscribeOnce('sidebar/initialized', ba, g.SUBSCRIBE_NEW);
        i.subscribe('chat/tabs-changed', t(this._recalculateTabs, this, true));
        this._recalculateWidth();
        this._initialized = true;
    }

    r(z.prototype, h, {_root: null, _initialized: false, _availableWidth: 0, _maxShown: 1, _viewState: null, _recalculateWidth: function () {
        var aa = z._getAvailableDockWidth(this._root), ba = Math.max(1, Math.floor(aa / y())), ca = ba != this._maxShown;
        if (!this._viewState || ca || aa <= this._viewState.usedWidth || aa > this._viewState.widthToShowNext) {
            this._availableWidth = aa;
            this._maxShown = ba;
            this._viewState = null;
            this._recalculateTabs(ca);
        }
    }, _onTabsChanged: function () {
        if (this._initialized) {
            this.inform('tabs-changed');
            this.inform('max-to-show-changed', this._maxShown);
            this.inform('max-to-show-change-completed');
        }
    }, _recalculateTabs: function (aa) {
        var ba = z._getTabsToShow(i.get(), this._availableWidth);
        if (aa || !q(this._viewState, ba)) {
            this._viewState = ba;
            this._onTabsChanged();
        }
    }, getMaxTabsToShow: function () {
        return this._maxShown;
    }, checkWidth: function () {
        this._recalculateWidth();
    }, hasRoomForRaisedTab: function () {
        return this._availableWidth - this._viewState.usedWidth > y();
    }, getTabsToShow: function () {
        return JSON.parse(JSON.stringify(this._viewState.tabsToShow));
    }, getShowingTabsOrder: function () {
        var aa = i.get(), ba = this._viewState.tabsToShow;
        return aa.tabs.filter(function (ca) {
            return ba[ca.id];
        });
    }, getRightmostHiddenTab: function () {
        var aa = i.get(), ba = this._viewState.tabsToShow, ca = aa.tabs.filter(function (ea) {
            return !ba[ea.id];
        }), da = ca.shift();
        return da ? da.id : null;
    }, getLeftmostVisibleTab: function () {
        var aa = this.getShowingTabsOrder(), ba = aa.pop();
        return ba ? ba.id : null;
    }, getRightmostRaisedTab: function () {
        var aa = this.getShowingTabsOrder(), ba = aa.length;
        for (var ca = 0; ca < ba; ca++)if (i.getTab(aa[ca].id).raised)return aa[ca].id;
        return null;
    }, getRaisedVisibleTabs: function () {
        var aa = [], ba = this.getShowingTabsOrder(), ca = ba.length;
        for (var da = 0; da < ca; da++)if (i.getTab(ba[da].id).raised)aa.push(ba[da].id);
        return aa;
    }, shouldPromoteOnRaise: function (aa) {
        if (!this._viewState.tabsToShow[aa])return true;
        if (this._viewState.nextToHide != aa)return false;
        var ba = i.getTab(aa), ca = ba && ba.raised;
        return !ca && (this._availableWidth - this._viewState.usedWidth < y() - x());
    }});
    r(z, {_getAvailableDockWidth: function (aa) {
        var ba = l.getViewportWithoutScrollbarDimensions().width;
        ba -= p.getLeft() + p.getRight();
        ba -= 50;
        var ca = n.byClass(aa, 'fbDock'), da = k.find(ca, "._56ox"), ea = o.getElementDimensions(da).x;
        ba -= ea;
        var fa = k.scry(ca, "._56oy");
        ea += o.getElementDimensions(fa.pop()).x;
        var ga = o.getElementDimensions(ca), ha = ga.x - ea;
        if (ha > w)w = ha;
        ba -= w;
        ba -= 15;
        return Math.max(ba, 0);
    }, _getTabsToShow: function (aa, ba) {
        ba = Math.max(ba, y() + 1);
        function ca(sa, ta) {
            return (sa.raised || !ta) ? y() : x();
        }

        var da = JSON.parse(JSON.stringify(aa.tabs)), ea = -1, fa = null;
        if (aa.promoted)da.forEach(function (sa, ta) {
            if (sa.id === aa.promoted) {
                ea = ta;
                fa = sa;
            }
        });
        var ga = 0, ha = false, ia = 0, ja = !fa;
        da.forEach(function (sa, ta) {
            var ua = ca(sa, ha);
            ha = ha || !sa.raised;
            sa.leftmostOffset = ga + ua;
            ga += ua;
            if (sa.leftmostOffset < ba)ia++;
            ja |= ta == ea;
            sa.alreadyPlacedPromoted = ja;
        });
        function ka(sa, ta, ua) {
            var va = {};
            for (var wa = 0; wa < ta; wa++) {
                var xa = sa[wa];
                if (!xa.alreadyPlacedPromoted && wa == ta - 1) {
                    va[ua] = true;
                } else va[xa.id] = true;
            }
            return va;
        }

        var la = ka(da, ia, aa.promoted), ma = ka(da, ia - 1, aa.promoted), na = null;
        for (var oa in la)if (!ma[oa])na = oa;
        var pa = da[ia - 1], qa = pa ? pa.leftmostOffset : 0, ra = Infinity;
        if (ia < da.length)ra = da[ia].leftmostOffset;
        return {nextToHide: na, tabsToShow: la, usedWidth: qa, widthToShowNext: ra};
    }});
    e.exports = z;
}, null);
__d("ChatTabPresence", ["AvailableList", "ChatTabModel", "MercuryThreads"], function (a, b, c, d, e, f, g, h) {
    var i = b('MercuryThreads').get(), j = {};

    function k(l) {
        var m = i.getCanonicalUserInThread(l);
        if (m)g.updateForID(m);
    }

    h.subscribe('chat/tabs-changed', function (event, l) {
        l.tabs.forEach(function (m) {
            if (m.raised && !j[m.id])k(m.id);
        });
        j = {};
        l.tabs.forEach(function (m) {
            if (m.raised)j[m.id] = true;
        });
    });
    e.exports = {};
}, null);
__d("ChatMentionsNotifications", ["fbt", "CurrentUser", "MercuryParticipants"], function (a, b, c, d, e, f, g, h, i) {
    var j = {notifyIfMessageToMe: function (k) {
        var l = 'fbid:' + h.getID(), m = k.body;
        i.get(l, function (n) {
            var o = new RegExp(n.short_name, "i");
            if (o.test(m))j._notify(k);
        });
    }, _notify: function (k) {
        var l = 48, m = k.body;
        if (m.length > l)m = m.substr(0, l - 3) + "...";
        new Notification("\"You were tagged in a message!\"", {body: m, icon: "http://facebook.com//images/icons-large/fb-xl.png"});
    }};
    e.exports = j;
}, null);
__d("VideoCallTourDialog", ["ArbiterMixin", "LegacyContextualDialog", "CSS", "ChatTabTemplates", "VideoCallCore", "VideoCallingTour", "copyProperties", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = b('MercuryThreads').get();

    function o() {
        this._dialog = null;
    }

    m(o.prototype, g);
    m(o.prototype, {render: function (p, q) {
        var r = n.getCanonicalUserInThread(q);
        if (!r || !k.availableForCall(r))return;
        var s = j[':fb:mercury:call:tour'].build();
        this._dialog = new h();
        this._dialog.init(s.getRoot()).setWidth(250).setAlignH('center').setContext(p).show();
        i.addClass(this._dialog.getRoot(), 'uiContextualDialogWithFooterArrowBottom');
        i.addClass(p, 'video_call_tour');
        this.inform('chat/dialog-rendered', {dialog: this, thread_id: q});
        l.inform('videocallingtour/end');
    }, updatePosition: function () {
        if (this._dialog && this._dialog.isShown())this._dialog.updatePosition();
    }, hide: function () {
        if (this._dialog && this._dialog.isShown()) {
            this._dialog.hide();
            this._dialog = null;
        }
    }});
    e.exports = o;
}, null);
__d("ChatContextualDialogController", ["Event", "ArbiterMixin", "ChatTabModel", "VideoCallingTour", "VideoCallTourDialog", "copyProperties", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = 60000, o = false, p = function (w, x) {
        this._videoCallTour = new k();
        this._threadID = w;
        this._tabMainElement = x;
        this._openDialog = null;
        this._subscriptionTokens = [];
        this._scrollListener = null;
        this._timeout = null;
    };

    function q(w, event, x) {
        if (w._openDialog)w._openDialog.updatePosition();
    }

    function r(w) {
        if (w._openDialog)w._openDialog.updatePosition();
    }

    function s(w) {
        if (w._openDialog) {
            w._openDialog.hide();
            w._openDialog = null;
        }
        if (w._timeout) {
            clearTimeout(w._timeout);
            w._timeout = null;
        }
        while (w._subscriptionTokens.length)w._subscriptionTokens.pop().unsubscribe();
        if (w._scrollListener) {
            w._scrollListener.remove();
            w._scrollListener = null;
        }
    }

    function t(w, event, x) {
        if (x.thread_id === w._threadID) {
            w._openDialog = x.dialog;
            v(w);
            w._timeout = m(w.destroy.bind(w, w._threadID), n);
            w._scrollListener = g.listen(window, 'scroll', r.bind(null, w));
        }
    }

    function u(w, x) {
        if (!w._openDialog) {
            w._subscriptionTokens.push(x.subscribe('chat/dialog-rendered', t.bind(null, w)));
            x.render(w._tabMainElement, w._threadID);
        }
    }

    function v(w) {
        w._subscriptionTokens.push(i.subscribe('chat/tabs-changed', q.bind(null, w)), p.subscribe('dialog/close-all', s.bind(null, w)));
    }

    l(p, h);
    l(p.prototype, {destroy: function () {
        s(this);
    }, tabFocused: function () {
        if (o) {
            u(this, this._videoCallTour);
            return;
        }
    }, tabNotActive: function () {
        s(this);
    }, hideVideoCallouts: function () {
        s(this);
    }});
    j.subscribe('videocallingtour/start', function () {
        o = true;
        p.inform('dialog/close-all');
    });
    j.subscribe('videocallingtour/end', function () {
        o = false;
    });
    e.exports = p;
}, null);
__d("StickerTriggerHighlightSpan.react", ["React", "cx"], function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i = g.createClass({displayName: 'StickerTriggerHighlightSpan', getInitialState: function () {
        return {activated: false};
    }, propTypes: {offsetKey: g.PropTypes.string}, _onClick: function () {
        if (this.state.activated)return;
        this.props.openFlyoutFn();
        this.setState({activated: true});
    }, render: function () {
        return (g.createElement(g.DOM.span, {onClick: this._onClick, 'data-offset-key': this.props.offsetKey, className: (("_29dt") + (this.state.activated ? ' ' + "_1t57" : '')), spellCheck: false}, this.props.children));
    }});
    e.exports = i;
}, null);
__d("ChatInput.react", ["AbstractTextEditor.Experimental.react", "DocumentCompositeDecorator.Experimental", "DocumentDecorator", "DocumentModifierExperimental", "DOMVector", "EditorChangeType", "EditorState", "StickerTriggerHighlightSpan.react", "React", "createContentStateFromBlocks", "createPlainBlocksFromText", "createInitialEditorState", "emptyFunction", "getDefaultKeyBinding", "isSoftNewlineEvent", "setImmediate"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    "use strict";
    var w = s.thatReturnsNull, x = ' ', y = o.createClass({displayName: 'ChatInput', propTypes: {blockStyleFn: o.PropTypes.func, getTriggeredWordFn: o.PropTypes.func, initializeThingsWithInputFn: o.PropTypes.func, inlineStyleFn: o.PropTypes.func, inputChanged: o.PropTypes.func, inputKeyDown: o.PropTypes.func, isTriggerValid: o.PropTypes.func, keyBindingFn: o.PropTypes.func, onBlur: o.PropTypes.func, onEscape: o.PropTypes.func, onFocus: o.PropTypes.func, onTab: o.PropTypes.func, resizeFn: o.PropTypes.func}, getDefaultProps: function () {
        return {blockStyleFn: w, inlineStyleFn: w, keyBindingFn: t};
    }, componentDidMount: function () {
        this.props.resizeFn();
        this._oldHeight = this.getDOMNode().getBoundingClientRect().height;
        this.props.initializeThingsWithInputFn(this.refs.input.getDOMNode(), this.getValue);
    }, componentWillReceiveProps: function (z) {
        if (this.props.triggeredWord !== z.triggeredWord)this._updateDecorator(z.triggeredWord);
    }, componentDidUpdate: function () {
        var z = k.getScrollPosition();
        v(function () {
            var aa = this.getDOMNode().getBoundingClientRect().height;
            if (this._oldHeight !== aa) {
                window.scrollTo(z.x, z.y);
                this.props.resizeFn();
            }
            this._oldHeight = aa;
        }.bind(this));
    }, getInitialState: function () {
        return {editorState: this._createEmptyEditorState()};
    }, _createEmptyEditorState: function () {
        var z = q(['']);
        return r(p(z));
    }, resetState: function () {
        this.setState({editorState: m.moveFocusToEnd(this._createEmptyEditorState())});
    }, _updateDecorator: function (z) {
        var aa = this._getStickerTagDecorator(z);
        v(function () {
            var ba = m.set(this.state.editorState, {decorator: aa});
            this.setState({editorState: ba});
        }.bind(this));
    }, _getStickerTagDecorator: function (z) {
        var aa = function (ba, ca) {
            if (!z)return;
            var da, ea, fa;
            if (z.match(/\W/)) {
                fa = new RegExp(z.replace(/(\W)/g, '\\$1'), 'gi');
            } else fa = new RegExp('\\b' + z + '\\b', 'gi');
            while ((da = fa.exec(ba.getText())) !== null) {
                ea = da.index;
                ca(ea, ea + z.length);
            }
        };
        return new h([new i(aa, n, {openFlyoutFn: this.props.openFlyoutFn})]);
    }, onChange: function (z) {
        if (z.getCurrentContent() !== this.state.editorState.getCurrentContent())this.props.inputChanged(this.getValueFromEditorState(z));
        this.setState({editorState: z});
    }, onReturn: function (event) {
        if (u(event))return false;
        this.props.inputKeyDown(event, this.getValue());
        this.resetState();
        return true;
    }, getValueFromEditorState: function (z) {
        return z.getCurrentContent().getPlainText();
    }, getValue: function () {
        return this.getValueFromEditorState(this.state.editorState);
    }, focus: function () {
        this.refs.input.focus();
    }, _onPasteFiles: function (z) {
        var aa = /^image\//, ba = z.filter(function (ca) {
            return aa.test(ca.type);
        });
        if (ba.length)this.props.uploadPhotoFn(ba[0]);
    }, insertEmoticon: function (z) {
        var aa = this.state.editorState, ba = aa.getSelection(), ca = aa.getCurrentContent(), da = ba.getStartOffset(), ea = ba.getEndOffset(), fa = ca.getBlockForKey(ba.getStartKey()).getText(), ga = ca.getBlockForKey(ba.getEndKey()).getText();
        if (da > 0 && fa[da - 1] !== x)z = x + z;
        if (ea <= ga.length && ga[ea] !== x)z = z + x;
        var ha = j.replaceText(ca, ba, z, aa.getCurrentInlineStyle(), null), ia = m.push(aa, ha, l.INSERT_CHARACTERS);
        this.setState({editorState: ia});
    }, render: function () {
        return (o.createElement(g, Object.assign({ref: "input"}, this.props, {editorState: this.state.editorState, onChange: this.onChange, onPasteFiles: this._onPasteFiles, handleReturn: this.onReturn, spellCheck: true})));
    }});
    e.exports = y;
}, null);
__d("getImageSize", ["DataViewPolyfill"], function (a, b, c, d, e, f, g) {
    var h = a.DataView || g;

    function i(m) {
        return {width: m.getUint16(6, true), height: m.getUint16(8, true)};
    }

    function j(m) {
        return {width: m.getUint32(16, false), height: m.getUint32(20, false)};
    }

    function k(m) {
        var n = m.byteLength, o = 2;
        while (o < n) {
            var p = m.getUint16(o, false);
            o += 2;
            if (p == 65472 || p == 65474) {
                return {width: m.getUint16(o + 5, false), height: m.getUint16(o + 3, false)};
            } else o += m.getUint16(o, false);
        }
        return null;
    }

    function l(m) {
        var n = new h(m);
        if (n.getUint8(0) == 255 && n.getUint8(1) == 216)return k(n);
        if (n.getUint8(0) == 71 && n.getUint8(1) == 73 && n.getUint8(2) == 70)return i(n);
        if (n.getUint8(0) == 137 && n.getUint8(1) == 80 && n.getUint8(2) == 78 && n.getUint8(3) == 71)return j(n);
        return null;
    }

    e.exports = l;
    l.gif = i;
    l.png = j;
    l.jpeg = k;
}, null);
__d("ChatPhotoUploader.react", ["ChatAutoSendPhotoUploader", "Image.react", "InlineBlock.react", "Link.react", "MercuryConfig", "React", "SubscriptionsHandler", "cx", "emptyFunction", "fbt", "ix"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    'use strict';
    var r = l.createClass({displayName: 'ChatPhotoUploader', propTypes: {actionURI: l.PropTypes.string, onSubmit: l.PropTypes.func, onAllUploadsComplete: l.PropTypes.func, onLastUploadFail: l.PropTypes.func, onLastUploadCancel: l.PropTypes.func}, getDefaultProps: function () {
        return {actionURI: k.upload_url, onSubmit: o, onAllUploadsComplete: o, onLastUploadFail: o, onLastUploadCancel: o};
    }, componentDidMount: function () {
        this._uploader = new g(this.refs.form.getDOMNode(), this.refs.input.getDOMNode(), this.refs.attachID.getDOMNode());
        this._subscriptions = new m();
        this._subscriptions.addSubscriptions(this._uploader.subscribe('submit', this._handleSubmit), this._uploader.subscribe('all-uploads-completed', this._handleAllUploadsCompleted), this._uploader.subscribe('last-upload-failed', this._handleLastUploadFailed), this._uploader.subscribe('last-upload-canceled', this._handleLastUploadCanceled));
    }, shouldComponentUpdate: function (s, t) {
        return s.actionURI != this.props.actionURI;
    }, componentWillUnmount: function () {
        this._subscriptions && this._subscriptions.release();
        this._uploader && this._uploader.destroy();
    }, render: function () {
        return (l.createElement(l.DOM.form, {action: this.props.actionURI, method: "post", ref: "form"}, l.createElement(l.DOM.input, {type: "hidden", name: "attach_id", ref: "attachID"}), l.createElement(l.DOM.input, {type: "hidden", name: "images_only", value: true}), l.createElement(i, {className: "_m _4q60 _3rzn"}, l.createElement(j, {className: "_4q61 _509v"}, l.createElement(h, {className: "_509w", src: q('/images/chat/chat_camera_icon.png'), alt: "\u041a\u0430\u043c\u0435\u0440\u0430"})), l.createElement(l.DOM.input, {type: "file", className: "_n", name: "attachment[]", multiple: "true", accept: "image/*", ref: "input"}))));
    }, _handleSubmit: function (s, t) {
        this.props.onSubmit(s, t);
    }, _handleAllUploadsCompleted: function (s, t) {
        this.props.onAllUploadsComplete(s, t);
    }, _handleLastUploadFailed: function (s, t) {
        this.props.onLastUploadFail(s, t);
    }, _handleLastUploadCanceled: function (s, t) {
        this.props.onLastUploadCancel(s, t);
    }, isUploading: function () {
        return this._uploader && this._uploader.isUploading();
    }, uploadFile: function (s) {
        this._uploader.uploadFile(s);
    }});
    e.exports = r;
}, null);
__d("ChatPrivacyActionController", ["ChatVisibility", "JSLogger", "PresencePrivacy", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = function (l, m) {
        this._userID = l;
        this._logger = h.create('blackbird');
        this._getState = function () {
            if (g.isOnline())return i.allows(this._userID) ? k.NORMAL : k.BLOCKED;
            return k.OFFLINE;
        };
        this._togglePrivacy = function () {
            var n = this._getState();
            switch (this._getState()) {
                case k.OFFLINE:
                    if (g.isOnline()) {
                        this._logger.error('tabs_already_online');
                        break;
                    }
                    this._logger.log('tabs_go_online', {tab_id: this._userID});
                    g.goOnline(function () {
                        if (!i.allows(this._userID)) {
                            if (this._getState() !== k.BLOCKED)this._logger.error('privacy_action_controller_blocked_inconsistency');
                            this._togglePrivacy();
                        }
                    }.bind(this));
                    break;
                case k.BLOCKED:
                    i.allow(this._userID);
                    this._logger.log('tabs_unblock', {tab_id: this._userID});
                    break;
                case k.NORMAL:
                    i.disallow(this._userID);
                    this._logger.log('tabs_block', {tab_id: this._userID});
                    break;
            }
        };
        setTimeout(function () {
            var n = function () {
                m && m(this._getState());
            }.bind(this);
            n();
            this._subscribeToken = i.subscribe('privacy-changed', n);
        }.bind(this), 0);
    };
    k.OFFLINE = 'offline';
    k.BLOCKED = 'blocked';
    k.NORMAL = 'normal';
    j(k.prototype, {togglePrivacy: function () {
        this._logger.log('gear_menu_toggle_privacy', {tab_id: this._userID});
        this._togglePrivacy();
    }, destroy: function () {
        this._subscribeToken && i.unsubscribe(this._subscribeToken);
    }});
    e.exports = k;
}, null);
__d("ChatShareLinkUploader", ["AsyncRequest", "CSS", "DOM", "URLScraper", "MercuryShareLinkUploader", "MercuryAttachmentTemplates", "Event"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    for (var n in k)if (k.hasOwnProperty(n))p[n] = k[n];
    var o = k === null ? null : k.prototype;
    p.prototype = Object.create(o);
    p.prototype.constructor = p;
    p.__superConstructor__ = k;
    function p(q, r, s, t) {
        "use strict";
        this.$ChatShareLinkUploader0 = q;
        this.$ChatShareLinkUploader1 = r;
        this.$ChatShareLinkUploader2 = s;
        this.$ChatShareLinkUploader3 = false;
        this.$ChatShareLinkUploader4 = null;
        this.$ChatShareLinkUploader5 = null;
        this.$ChatShareLinkUploader6 = t;
        m.listen(r, 'keyup', function () {
            var u = t ? t() : r.value;
            !u.length && this.$ChatShareLinkUploader7.enable();
        }.bind(this));
        this.$ChatShareLinkUploader7 = new j(r, t);
        this.$ChatShareLinkUploader7.subscribe('match', function (u, v) {
            this.loadShare(v && v.url);
        }.bind(this));
        this.$ChatShareLinkUploader8 = null;
    }

    p.prototype.getAttachData = function () {
        "use strict";
        return this.loadAttachData(this.$ChatShareLinkUploader3, this.$ChatShareLinkUploader0, this.$ChatShareLinkUploader1, this.$ChatShareLinkUploader6);
    };
    p.prototype.close = function () {
        "use strict";
        this.$ChatShareLinkUploader9();
        this.$ChatShareLinkUploader7.disable();
        this.inform('closed');
    };
    p.prototype.clear = function () {
        "use strict";
        this.$ChatShareLinkUploader9();
        this.$ChatShareLinkUploader7.enable();
    };
    p.prototype.$ChatShareLinkUploader9 = function () {
        "use strict";
        var q = this.$ChatShareLinkUploader8;
        delete this.$ChatShareLinkUploader8;
        if (q) {
            i.remove(q);
            this.inform('dom-updated');
        }
        this.$ChatShareLinkUploader3 = false;
        this.$ChatShareLinkUploader4 = null;
        this.$ChatShareLinkUploader5 && this.$ChatShareLinkUploader5.abort();
        this.$ChatShareLinkUploader5 = null;
        this.$ChatShareLinkUploader7 && this.$ChatShareLinkUploader7.reset();
    };
    p.prototype.loadShare = function (q, r) {
        "use strict";
        this.$ChatShareLinkUploader4 = q;
        this.$ChatShareLinkUploader5 && this.$ChatShareLinkUploader5.abort();
        var s = l[':fb:mercury:share-link-row'].build();
        if (this.$ChatShareLinkUploader8)i.remove(this.$ChatShareLinkUploader8);
        this.$ChatShareLinkUploader8 = s.getRoot();
        m.listen(s.getNode('closeFileUpload'), 'click', function (event) {
            this.close();
            event.kill();
        }.bind(this));
        i.appendContent(this.$ChatShareLinkUploader0, this.$ChatShareLinkUploader8);
        h.show(this.$ChatShareLinkUploader0);
        this.inform('dom-updated');
        var t = {u: q, chat: true, extra_params: JSON.stringify(r)};
        this.$ChatShareLinkUploader5 = new g().setMethod('POST').setURI('/ajax/share_scrape.php').setData(t).setHandler(this.$ChatShareLinkUploadera.bind(this).bind(null, q));
        this.$ChatShareLinkUploader5.send();
        this.inform('link-detected');
    };
    p.prototype.$ChatShareLinkUploadera = function (q, r) {
        "use strict";
        if (this.$ChatShareLinkUploader4 !== q)return;
        this.$ChatShareLinkUploader4 = null;
        this.$ChatShareLinkUploader5 = null;
        i.appendContent(this.$ChatShareLinkUploader8, r.payload);
        this.$ChatShareLinkUploader2();
        this.$ChatShareLinkUploader3 = true;
        if (!this.getAttachData()) {
            this.close();
            return;
        }
        h.addClass(this.$ChatShareLinkUploader8, 'done');
    };
    e.exports = p;
}, null);
__d("MessagesEmoticons.react", ["Grid.react", "React", "cx", "emptyFunction", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = g.GridItem, m = 8, n = {smile: "\u0443\u043b\u044b\u0431\u043a\u0430", frown: "\u0445\u043c\u0443\u0440\u044b\u0439 \u0432\u0437\u0433\u043b\u044f\u0434", tongue: "\u044f\u0437\u044b\u043a", grin: "\u0443\u043b\u044b\u0431\u043a\u0430 \u0434\u043e \u0443\u0448\u0435\u0439", gasp: "\u0443\u0434\u0443\u0448\u044c\u0435", wink: "\u043f\u043e\u0434\u043c\u0438\u0433\u0438\u0432\u0430\u043d\u0438\u0435", pacman: "\u043f\u0430\u043a\u043c\u0430\u043d", grumpy: "\u0440\u0430\u0437\u0434\u0440\u0430\u0436\u0435\u043d\u0438\u0435", unsure: "\u043d\u0435\u0443\u0432\u0435\u0440\u0435\u043d\u043d\u043e\u0441\u0442\u044c", cry: "\u043f\u043b\u0430\u0447", kiki: "\u041a\u0438\u043a\u0438", glasses: "\u043e\u0447\u043a\u0438", sunglasses: "\u0441\u043e\u043b\u043d\u0435\u0447\u043d\u044b\u0435 \u043e\u0447\u043a\u0438", heart: "\u0441\u0435\u0440\u0434\u0446\u0435", devil: "\u0447\u0435\u0440\u0442\u0438\u043a", angel: "\u0430\u043d\u0433\u0435\u043b", squint: "\u0432\u0437\u0433\u043b\u044f\u0434 \u0438\u0441\u043a\u043e\u0441\u0430", confused: "\u0441\u043c\u0443\u0449\u0435\u043d\u0438\u0435", upset: "\u043e\u0433\u043e\u0440\u0447\u0435\u043d\u0438\u0435", colonthree: "\u0434\u0432\u043e\u0435\u0442\u043e\u0447\u0438\u0435 \u0441 \u0442\u0440\u043e\u0439\u043a\u043e\u0439", like: "\u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f"}, o = h.createClass({displayName: 'MessagesEmoticons', propTypes: {onEmoticonSelect: h.PropTypes.func}, getDefaultProps: function () {
        return {onEmoticonSelect: j};
    }, getEmoticons: function () {
        return Object.keys(n).map(function (p) {
            return (h.createElement(l, {key: p}, h.createElement(h.DOM.div, {className: "panelCell"}, h.createElement(h.DOM.a, {'aria-label': n[p], className: 'emoticon emoticon_' + p, onClick: function () {
                return this.props.onEmoticonSelect(p);
            }.bind(this)}))));
        }.bind(this));
    }, render: function () {
        return (h.createElement(h.DOM.div, {className: "emoticonsTable"}, h.createElement(g, {cols: m, alignv: "middle", alignh: "center", spacing: "pam"}, this.getEmoticons())));
    }});
    e.exports = o;
}, null);
__d("StickerActions", ["BanzaiLogger", "StickerConstants", "StickersDispatcher"], function (a, b, c, d, e, f, g, h, i) {
    'use strict';
    var j = {addPack: function (k) {
        i.handleUpdateFromViewActions({actions: [
            {actionType: h.ActionTypes.ADD_PACK, packID: k}
        ]});
    }, removePack: function (k) {
        i.handleUpdateFromViewActions({actions: [
            {actionType: h.ActionTypes.REMOVE_PACK, packID: k}
        ]});
    }, selectPack: function (k, l) {
        if (!l)g.log('StickersLoggerConfig', {event: 'select_pack', packid: k});
        i.handleUpdateFromViewActions({actions: [
            {actionType: h.ActionTypes.SELECT_PACK, packID: k}
        ]});
    }, resetNumNewPacks: function () {
        i.handleUpdateFromViewActions({actions: [
            {actionType: h.ActionTypes.RESET_NUM_NEW_PACKS}
        ]});
    }};
    e.exports = j;
}, null);
__d("XStickerPackImagesControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/{pack_id}\/images\/", {pack_id: {type: "Int", required: true}, sticker_size: {type: "Int"}});
}, null);
__d("XStickersAddPackControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/addpack\/", {pack_id: {type: "Int"}, size: {type: "String"}, redirect_uri: {type: "String"}, is_promoted: {type: "Bool"}});
}, null);
__d("XStickersRemovePackControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/removepack\/", {pack_id: {type: "Int"}, size: {type: "String"}, redirect_uri: {type: "String"}});
}, null);
__d("XStickerStateInitialDataControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/state\/", {});
}, null);
__d("XStickerStatePackDataControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/state\/pack\/", {pack_id: {type: "Int", required: true}});
}, null);
__d("XStickerStateStoreDataControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/state\/store\/", {});
}, null);
__d("XStickerSearchNUXSeenControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/searchNUX\/seen\/", {tooltip_only: {type: "Bool"}});
}, null);
__d("XStickerTagDataControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/tag\/data\/", {});
}, null);
__d("XStickerQueryImagesControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/query\/images\/", {query: {type: "String", required: true}});
}, null);
__d("StickerServerRequests", ["AsyncRequest", "Promise", "XStickerPackImagesControllerURIBuilder", "XStickersAddPackControllerURIBuilder", "XStickersRemovePackControllerURIBuilder", "XStickerStateInitialDataControllerURIBuilder", "XStickerStatePackDataControllerURIBuilder", "XStickerStateStoreDataControllerURIBuilder", "XStickerSearchPromotePackControllerURIBuilder", "XStickerSearchNUXSeenControllerURIBuilder", "XStickerTagImagesControllerURIBuilder", "XStickerTagDataControllerURIBuilder", "XStickerQueryImagesControllerURIBuilder"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    'use strict';
    var t = {addPack: function (v, w, x) {
        var y = new j().setInt('pack_id', v).setBool('is_promoted', w).getURI();
        new g(y).setHandler(function (z) {
            return x(z.payload);
        }).send();
    }, removePack: function (v, w) {
        var x = new k().setInt('pack_id', v).getURI();
        new g(x).setHandler(function (y) {
            return w(y.payload);
        }).send();
    }, getStickersForPack: function (v, w) {
        var x = new i().setInt('pack_id', v).setInt('sticker_size', w).getURI();
        return new h(function (y, z) {
            return new g().setURI(x).setMethod("POST").setHandler(function (aa) {
                return y(aa.payload);
            }).send();
        });
    }, getStickersForTags: function (v, w) {
        new g().setURI(new q().setIntVector('tag_ids', v).getURI()).setMethod("POST").setHandler(function (x) {
            return w(x);
        }).send();
    }, getStickersForQuery: function (v, w) {
        new g().setURI(new s().setString('query', v).getURI()).setMethod("POST").setHandler(function (x) {
            return w(x);
        }).send();
    }, fetchTrayData: function (v) {
        return u(new l().getURI(), v, true);
    }, fetchStoreData: function (v) {
        return u(new n().getURI(), v);
    }, fetchPackData: function (v, w) {
        return u(new m().setInt('pack_id', v).getURI(), w);
    }, fetchTagData: function (v) {
        return u(new r().getURI(), v, true);
    }, markSeenSearchNUX: function () {
        new g(new p().setBool('tooltip_only', false).getURI().toString()).send();
    }, markSeenSearchTooltipNUX: function () {
        new g(new p().setBool('tooltip_only', true).getURI().toString()).send();
    }, promotePackSentFromSearch: function (v, w) {
        var x = new o().setInt('sticker_id', v).getURI();
        u(x, w, true);
    }};

    function u(v, w, x) {
        return new h(function (y, z) {
            return new g(v).setHandler(function (aa) {
                return y(aa.getPayload());
            }).setAllowCrossPageTransition(x).send();
        }).then(w);
    }

    e.exports = t;
}, null);
__d("StickerImages", ["StickerServerRequests"], function (a, b, c, d, e, f, g) {
    'use strict';
    var h = {}, i = {}, j = {}, k = {requestStickersForTags: function (l, m) {
        var n = l.filter(function (o) {
            return !j[o.id];
        }).map(function (o) {
            return o.id;
        });
        if (n.length > 0) {
            g.getStickersForTags(n, function (o) {
                for (var p in o.payload)j[p] = o.payload[p];
                m();
            });
        } else m();
    }, getStickerTagsData: function () {
        return j;
    }, requestStickersForPack: function (l, m, n) {
        if (!l)return;
        if (!i[l]) {
            i[l] = g.getStickersForPack(l, m);
            i[l].then(function (o) {
                o.forEach(function (p) {
                    return this.cacheSticker(p);
                }.bind(this));
            }.bind(this));
        }
        i[l].then(function (o) {
            return n(o);
        });
    }, cacheSticker: function (l) {
        h[l.id] = l;
    }, getSticker: function (l) {
        return h[l];
    }};
    e.exports = k;
}, null);
__d("StickerState", ["ImmutableObject", "StickerConfig", "PresenceState", "StickerConstants", "StickerImages", "StickersDispatcher", "StickerServerRequests", "mixInEventEmitter"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    'use strict';
    var o = {}, p, q, r, s = null, t = 0, u = {}, v = [], w = [], x = [], y = null, z = i.get();
    if (z)y = z.tray_pack_id;
    var aa = h.ShowStickerReplyNUX, ba = h.ShowStickerSearchNUXIndicator, ca = h.ShowStickerSearchNUXTooltip, da = {onTrayDataReady: function (ga) {
        if (!q)q = m.fetchTrayData(function (ha) {
            v = ha.packs.map(function (ia) {
                return ea(ia);
            });
            r = ha.mru;
            t = ha.num_new_packs;
            x = ha.tags;
        });
        q.then(ga);
    }, onStoreDataReady: function (ga) {
        if (!p)p = m.fetchStoreData(function (ha) {
            w = ha.packs.map(function (ia) {
                return ea(ia);
            });
        });
        p.then(ga);
    }, onPackDataReady: function (ga, ha) {
        if (!o[ga])o[ga] = m.fetchPackData(ga, function (ia) {
            ea(ia);
        });
        o[ga].then(ha);
    }, getPacksInTray: function () {
        return v;
    }, getPacksInCommentsTray: function () {
        var ga = [], ha = [], ia;
        for (var ja = 0; ja < v.length; ja++)if (v[ja].isSearch) {
            continue;
        } else if (v[ja].id == j.EMOTICON_PACK_ID) {
            ia = v[ja];
        } else if (v[ja].isMessengerOnly) {
            ha.push(v[ja]);
        } else ga.push(v[ja]);
        var ka = ga.concat(ha);
        if (ia)ka.push(ia);
        return ka;
    }, getPackIDsInTray: function () {
        return v.map(function (ga) {
            return ga.id;
        });
    }, getPacksInStore: function () {
        return w;
    }, getPack: function (ga) {
        return u[ga];
    }, getNumNewPacks: function () {
        return t;
    }, getFeaturedTags: function () {
        return x;
    }, resetNumNewPacks: function () {
        if (t) {
            t = 0;
            this.emit(this.NUM_NEW_PACKS_CHANGED, 0);
        }
    }, addMRUPack: function () {
        if (r) {
            this._addPackToTray(r);
            r = null;
        }
    }, addPack: function (ga) {
        var ha = false;
        if (u[ga])ha = u[ga].isPromoted;
        m.addPack(ga, ha, function (ia) {
            this._addPackToTray(ia);
        }.bind(this));
    }, removePack: function (ga) {
        m.removePack(ga, function (ha) {
            v = v.filter(function (ia) {
                return ia.id !== ha;
            });
            u[ha] = g.set(u[ha], {isInTray: false});
            w = w.map(function (ia) {
                return u[ia.id];
            });
            this.emit(this.PACKS_CHANGED, ha);
        }.bind(this));
    }, setTrayPackID: function (ga) {
        y = ga;
        i.doSync();
        this.emit(da.PACK_SELECTED, ga);
    }, getTrayPackID: function () {
        return y;
    }, shouldShowStickerReplyNUX: function () {
        return aa;
    }, clearShowStickerReplyNUX: function () {
        aa = false;
    }, shouldShowStickerSearchNUXIndicator: function () {
        return ba;
    }, shouldShowStickerSearchNUXTooltip: function () {
        return ca;
    }, clearShowStickerSearchNUXIndicator: function () {
        m.markSeenSearchNUX();
        ba = false;
    }, _addPackToTray: function (ga, ha) {
        ea(ga);
        u[ga.id] = g.set(u[ga.id], {isPurchased: !ha, isInTray: true});
        var ia = v.filter(function (ka) {
            return ka.id === ga.id;
        }).length > 0;
        if (!ia) {
            var ja;
            if (!ha) {
                ja = v.filter(function (ka) {
                    return ka.isMRU || ka.isSearch;
                }).length;
            } else ja = v.filter(function (ka) {
                return ka.id !== j.EMOTICON_PACK_ID;
            }).length;
            v.splice(ja, 0, u[ga.id]);
        }
        w = w.map(function (ka) {
            return u[ka.id];
        });
        this.emit(this.PACKS_CHANGED, ga.id);
    }, _addRecentlyUsedSticker: function (ga) {
        for (var ha = 0; ha < s.length; ++ha)if (s[ha].id === ga.id) {
            s.splice(ha, 1);
            break;
        }
        s.unshift(ga);
    }, getMRUStickerPack: function (ga) {
        if (!s)s = ga;
        return s;
    }, updateRecentlyUsed: function (ga) {
        if (!s) {
            this.addMRUPack();
            return;
        }
        this._addRecentlyUsedSticker(k.getSticker(ga));
    }, promotePackSentFromSearch: function (ga) {
        m.promotePackSentFromSearch(ga, function (ha) {
            return ha && this._addPackToTray(ha, true);
        }.bind(this));
    }};
    l.register(function (ga) {
        if (ga.actions && ga.actions.length) {
            var ha = j.ActionTypes;
            ga.actions.forEach(function (ia) {
                switch (ia.actionType) {
                    case ha.ADD_PACK:
                        da.addPack(ia.packID);
                        break;
                    case ha.REMOVE_PACK:
                        da.removePack(ia.packID);
                        break;
                    case ha.SELECT_PACK:
                        da.setTrayPackID(ia.packID);
                        break;
                    case ha.RESET_NUM_NEW_PACKS:
                        da.resetNumNewPacks();
                        break;
                }
            });
        }
    });
    da.PACKS_CHANGED = 'StickerState/packsChanged';
    da.PACK_SELECTED = 'StickerState/packSelected';
    da.NUM_NEW_PACKS_CHANGED = 'StickerState/numNewPacksChanged';
    i.registerStateStorer(function (ga) {
        ga.tray_pack_id = y;
    });
    function ea(ga) {
        var ha = ga.id;
        if (!u[ha]) {
            return (u[ha] = new g(ga));
        } else return (u[ha] = g.set(u[ha], ga));
    }

    var fa = {};
    fa[da.PACK_SELECTED] = true;
    fa[da.PACKS_CHANGED] = true;
    fa[da.NUM_NEW_PACKS_CHANGED] = true;
    n(da, fa);
    e.exports = da;
}, null);
__d("DialogFitHeight", ["CSS", "DOM", "Event", "Style", "SubscriptionsHandler", "Vector", "csx", "cx", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = 450, q = 100, r = 67, s = 67;

    function t(u) {
        "use strict";
        this.$DialogFitHeight0 = u;
    }

    t.prototype.enable = function () {
        "use strict";
        this.$DialogFitHeight1 = new k();
        this.$DialogFitHeight1.addSubscriptions(this.$DialogFitHeight0.subscribe('beforeshow', this.$DialogFitHeight2.bind(this)), i.listen(window, 'resize', o(this.$DialogFitHeight2.bind(this))));
        this.$DialogFitHeight3 = h.find(this.$DialogFitHeight0.getRoot(), "._4-i2");
        g.addClass(this.$DialogFitHeight3, "_5pfh");
        this.$DialogFitHeight4 = q;
        if (h.scry(this.$DialogFitHeight0.getRoot(), "._4-i0").length)this.$DialogFitHeight4 += r;
        if (h.scry(this.$DialogFitHeight0.getRoot(), "._5a8u").length)this.$DialogFitHeight4 += s;
    };
    t.prototype.disable = function () {
        "use strict";
        this.$DialogFitHeight1.release();
        this.$DialogFitHeight1 = null;
        g.removeClass(this.$DialogFitHeight3, "_5pfh");
    };
    t.prototype.$DialogFitHeight2 = function () {
        "use strict";
        var u = l.getViewportDimensions().y, v = u - this.$DialogFitHeight4;
        j.set(this.$DialogFitHeight3, 'height', Math.max(p, v) + 'px');
        this.$DialogFitHeight0.updatePosition();
    };
    e.exports = t;
}, null);
__d("StickerUtils", [], function (a, b, c, d, e, f) {
    var g = 64, h = {getScaledDimensions: function (i, j) {
        var k, l, m;
        if (j > i) {
            m = g / j;
            k = i * m;
            l = j * m;
        } else {
            m = g / i;
            k = i * m;
            l = j * m;
        }
        return {height: Math.round(k), width: Math.round(l)};
    }, capitalizeWords: function (i) {
        var j = i.split(" ");
        for (var k = 0; k < j.length; k++) {
            var l = j[k].charAt(0).toUpperCase();
            j[k] = l + j[k].substr(1);
        }
        return j.join(" ");
    }};
    e.exports = h;
}, null);
__d("StickersFlyoutStickerSelector.react", ["BanzaiLogger", "Grid.react", "Image.react", "LegacyScrollableArea.react", "React", "Sticker.react", "StickerConstants", "StickerImages", "StickerSearch", "StickerState", "StickerUtils", "XUISpinner.react", "areEqual", "cx", "debounce", "emptyFunction", "fbt", "ix", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    'use strict';
    var z = h.GridItem, aa = 320, ba = 278, ca = m.MRU_STICKER_PACK, da = 64, ea = 44, fa = 112, ga = u(function (ia, ja) {
        if (!ia)return;
        g.log('StickersLoggerConfig', {event: 'search_sticker', searchtoken: ia, numsearchresults: ja.length});
    }, 1000), ha = k.createClass({displayName: 'StickersFlyoutStickerSelector', propTypes: {height: k.PropTypes.number, onScroll: k.PropTypes.func, packID: k.PropTypes.string, userInput: k.PropTypes.string, typeaheadTags: k.PropTypes.array, singleWordTags: k.PropTypes.array}, getDefaultProps: function () {
        return {isComments: false, onScroll: v};
    }, getInitialState: function () {
        return {loading: false, stickers: []};
    }, componentDidMount: function () {
        if (this.props.packID) {
            this.requestStickersForPack(this.props.packID);
            return;
        }
        if ((this.props.typeaheadTags && this.props.typeaheadTags.length > 0) || (this.props.singleWordTags && this.props.singleWordTags.length > 0)) {
            this.requestStickersForTags(this.props.typeaheadTags, this.props.singleWordTags, this.props.userInput);
            return;
        }
        if (this.props.userInput)this.requestStickersForQuery(this.props.userInput);
    }, componentWillReceiveProps: function (ia) {
        if (ia.packID && ia.packID !== this.props.packID) {
            this.requestStickersForPack(ia.packID);
        } else if (!s(ia.typeaheadTags, this.props.typeaheadTags) || !s(ia.singleWordTags, this.props.singleWordTags)) {
            this.requestStickersForTags(ia.typeaheadTags, ia.singleWordTags, ia.userInput);
        } else if (!o.getTags() && ia.userInput !== this.props.userInput)this.requestStickersForQuery(ia.userInput);
    }, requestStickersForTags: function (ia, ja, ka) {
        this.setState({loading: true});
        o.requestStickersForTags(ia, ja, ka, function (la) {
            if (!this.props.tagChosen)ga(ka, la);
            if (this.props.isComments)la = la.filter(function (ma) {
                return !ma.isMessengerOnly;
            });
            this.isMounted() && this.setState({loading: false, stickers: la.slice(0, 40)});
        }.bind(this));
    }, requestStickersForQuery: function (ia) {
        this.setState({loading: true});
        o.requestStickersForQuery(ia, function (ja) {
            ja.map(function (ka) {
                return n.cacheSticker(ka);
            });
            if (!this.props.tagChosen)ga(ia, ja);
            if (this.props.isComments)ja = ja.filter(function (ka) {
                return !ka.isMessengerOnly;
            });
            this.isMounted() && this.setState({loading: false, stickers: ja});
        }.bind(this));
    }, requestStickersForPack: function (ia) {
        this.setState({loading: true});
        n.requestStickersForPack(ia, da, function (ja) {
            if (ia == ca) {
                ja = p.getMRUStickerPack(ja);
                if (this.props.isComments)ja = ja.filter(function (ka) {
                    return !ka.isMessengerOnly;
                });
            }
            this.setState({loading: false, stickers: ja});
        }.bind(this));
    }, renderStickers: function () {
        var ia = this.state.stickers.map(function (ja) {
            var ka = q.getScaledDimensions(ja.height, ja.width);
            return (k.createElement(z, {key: ja.id}, k.createElement(k.DOM.div, {className: "_5r8h", 'data-id': ja.id}, k.createElement(l, {animationTrigger: "hover", className: "_5r8i", frameCount: ja.frameCount, frameRate: ja.frameRate || 83, framesPerCol: ja.framesPerCol, framesPerRow: ja.framesPerRow, sourceHeight: ka.height, sourceURI: ja.sourceURI, sourceWidth: ka.width, spriteURI: ja.spriteURI, paddedSpriteURI: ja.paddedSpriteURI, stickerID: ja.id, style: {cursor: 'pointer'}}))));
        });
        return ia;
    }, _onScroll: function () {
        var ia = this.refs.stickerScrollable;
        if (ia) {
            var ja = ia.getArea().getScrollTop();
            this.props.onScroll(ja);
        }
    }, render: function () {
        if (this.state.loading) {
            return (k.createElement(k.DOM.div, {className: "_e0r"}, k.createElement(r, {size: "large"})));
        } else if (this.state.stickers.length === 0) {
            var ia = (aa - ea * 2 - fa) / 2 + "px";
            return (k.createElement(k.DOM.div, {className: "_5jdt", style: {marginTop: ia}}, k.createElement(i, {src: x("/images/messaging/stickers/icons/sad_face.png")}), k.createElement(k.DOM.p, null, "\u041d\u0435\u0442 \u043d\u0430\u043a\u043b\u0435\u0435\u043a \u0434\u043b\u044f \u043f\u043e\u043a\u0430\u0437\u0430")));
        }
        return (k.createElement(j, {ref: "stickerScrollable", height: this.props.height || aa, onScroll: y(this._onScroll, 200), width: ba, fade: true}, k.createElement(k.DOM.div, {className: "_5r8k"}, k.createElement(h, {cols: 4, fixed: true}, this.renderStickers()))));
    }});
    e.exports = ha;
}, null);
__d("StickersFlyoutTagSelector.react", ["BanzaiLogger", "Grid.react", "LegacyScrollableArea.react", "Parent", "React", "Image.react", "StickerConfig", "StickerConstants", "StickersFlyoutStickerSelector.react", "StickerSearch", "StickerState", "StickerUtils", "Toggler", "XUIButton.react", "XUICloseButton.react", "XUITextInput.react", "cx", "emptyFunction", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    'use strict';
    var z = h.GridItem, aa = 320, ba = 278, ca = 44, da = k.createClass({displayName: 'StickersFlyoutTagSelector', propTypes: {trigger: k.PropTypes.string, isComments: k.PropTypes.bool, resetTrigger: k.PropTypes.func}, getInitialState: function () {
        return {input: '', isScrolling: false, tagChosen: false, typeaheadTags: [], singleWordTags: []};
    }, getDefaultProps: function () {
        return {trigger: null, isComments: false, resetTrigger: x};
    }, componentDidMount: function () {
        var ea = j.byClass(this.getDOMNode(), 'uiToggle');
        if (ea)this._togglerSub = s.listen('show', ea, function () {
            this.isMounted() && this.focusInput();
        }.bind(this));
        this.focusInput();
        this.selectTrigger(this.props.trigger);
    }, componentWillUnmount: function () {
        this._togglerSub && this._togglerSub.unsubscribe();
    }, componentWillReceiveProps: function (ea) {
        this.selectTrigger(ea.trigger);
    }, focusInput: function () {
        this.refs.inputField.focusInput && this.refs.inputField.focusInput();
    }, _inputChanged: function (ea) {
        var fa = this._normalizeInput(ea.target.value), ga = p.getTags();
        if (ga) {
            var ha = ga.filter(function (ka) {
                return ka.name.indexOf(fa) === 0;
            }), ia = fa.split(/\s+/), ja = ia.map(function (ka) {
                return p.getTagByName(ka);
            }).filter(function (ka) {
                return ka !== undefined;
            });
            if (ja.length !== ia.length)ja = [];
            this.setState({input: ea.target.value, tagChosen: false, typeaheadTags: ha, singleWordTags: ja, isScrolling: false});
        } else this.setState({input: ea.target.value, tagChosen: false, isScrolling: false});
    }, _normalizeInput: function (ea) {
        return ea.trim().replace(/\s+/, ' ').toLowerCase();
    }, _handleResetButtonClick: function (ea) {
        ea.preventDefault();
        this.reset();
    }, reset: function () {
        this.setState(this.getInitialState());
    }, renderContentArea: function () {
        if (this.state.tagChosen || this._normalizeInput(this.state.input).length > 1) {
            return this.renderStickers();
        } else return m.StickerSearchInRecent ? this.renderRecentStickers() : this.renderTags();
    }, render: function () {
        return (k.createElement(k.DOM.div, {className: (("_217a") + (this.state.isScrolling ? ' ' + "_1hg1" : ''))}, k.createElement(k.DOM.div, {className: "_5jdr"}, k.createElement(k.DOM.span, {className: "_5jds"}), k.createElement(v, {onChange: this._inputChanged, ref: "inputField", placeholder: "\u0418\u0449\u0438\u0442\u0435 \u043d\u0430\u043a\u043b\u0435\u0439\u043a\u0438", value: this.state.input}), k.createElement(u, {size: "small", onClick: this._handleResetButtonClick, className: ((this.state.input.length === 0 ? "hidden_elem" : ''))})), this.renderContentArea()));
    }, selectTag: function (ea) {
        g.log('StickersLoggerConfig', {event: 'select_tag', tagid: ea.id});
        this.setState({tagChosen: true, typeaheadTags: [ea], singleWordTags: [], input: r.capitalizeWords(ea.name)});
        this.focusInput();
    }, selectTrigger: function (ea) {
        if (ea !== null) {
            var fa = p.getTagByName(ea);
            this.setState({tagChosen: true, typeaheadTags: [fa], singleWordTags: [], input: r.capitalizeWords(fa.name)});
            this.props.resetTrigger();
        }
    }, _onScroll: function (ea) {
        this.setState({isScrolling: !!ea});
    }, renderStickers: function () {
        var ea = this._normalizeInput(this.state.input);
        return (k.createElement(o, {ref: "selector", height: aa - ca, userInput: ea, typeaheadTags: this.state.typeaheadTags, singleWordTags: this.state.singleWordTags, onScroll: this._onScroll, isComments: this.props.isComments, tagChosen: this.state.tagChosen}));
    }, renderRecentStickers: function () {
        if (this._normalizeInput(this.state.input).length === 1)return k.createElement(k.DOM.div, null);
        return (k.createElement(o, {ref: "selector", height: aa - ca, packID: n.MRU_STICKER_PACK, onScroll: this._onScroll, isComments: this.props.isComments}));
    }, renderTags: function () {
        var ea = q.getFeaturedTags().filter(function (fa) {
            return fa.sourceURI !== null;
        }).sort(function (fa, ga) {
            return fa.order - ga.order;
        }).map(function (fa, ga) {
            return k.createElement(z, {key: ga}, k.createElement(k.DOM.div, {className: (("_t5c") + (ga < 2 ? ' ' + "_1b27" : '') + (ga % 2 === 0 ? ' ' + "_t5d" : '') + (ga % 2 !== 0 ? ' ' + "_t5e" : ''))}, k.createElement(t, {image: k.createElement(l, {src: fa.sourceURI}), label: fa.name, onClick: this.selectTag.bind(this, fa), className: "_5jdu", style: {background: '#' + fa.color_code}, disabled: this._normalizeInput(this.state.input).length === 1})));
        }.bind(this));
        return (k.createElement(i, {height: aa - ca, width: ba - 16, shadow: true, fade: true, className: "_5jei"}, k.createElement(h, {spacing: "pas", cols: 2, fixed: true, ref: "grid"}, ea)));
    }});
    e.exports = da;
}, null);
__d("StickersFlyout.react", ["BanzaiLogger", "Event", "Keys", "MessagesEmoticons.react", "Parent", "React", "StickersFlyoutPackSelector.react", "StickersFlyoutStickerSelector.react", "StickerActions", "StickerConstants", "StickerConfig", "StickersFlyoutTagSelector.react", "StickerSearch", "StickerState", "SubscriptionsHandler", "Toggler", "XUISpinner.react", "arrayContains", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    'use strict';
    var z = p.SEARCH_PACK_ID, aa = l.createClass({displayName: 'StickersFlyout', propTypes: {isComments: l.PropTypes.bool, onStickerSelect: l.PropTypes.func.isRequired, onEmoticonSelect: l.PropTypes.func, onShown: l.PropTypes.func, onHidden: l.PropTypes.func, onEscKeyDown: l.PropTypes.func, onPackSelect: l.PropTypes.func, packID: l.PropTypes.string, shown: l.PropTypes.bool, trigger: l.PropTypes.string}, getDefaultProps: function () {
        return {isComments: false, packID: t.getTrayPackID(), shown: false, trigger: null};
    }, getInitialState: function () {
        return {dataReady: false, numNewPacks: 0};
    }, componentDidMount: function () {
        if (q.LoadStickerEarly && !this.state.dataReady)this.loadTrayData();
        var ba = k.byClass(this.getDOMNode(), 'uiToggle');
        this._subscriptions = new u();
        if (ba) {
            this._subscriptions.addSubscriptions(v.listen('show', ba, this._onShownWrapper), v.listen('hide', ba, this._onHidden));
        } else if (!q.LoadStickerEarly && this.props.shown && !this.state.dataReady)this.loadTrayData();
        this._subscriptions.addSubscriptions(h.listen(this.getDOMNode(), 'keydown', this._onKeyDown), t.addListener(t.PACKS_CHANGED, this.packsUpdated), t.addListener(t.NUM_NEW_PACKS_CHANGED, function (ca) {
            this.setState({numNewPacks: ca});
        }.bind(this)));
    }, _onShownWrapper: function () {
        if (this.props.onShown) {
            this.props.onShown(this._onShown);
        } else this._onShown();
    }, _onShown: function () {
        g.log('StickersLoggerConfig', {event: 'open_tray'});
        if (!q.LoadStickerEarly && !this.state.dataReady)this.loadTrayData();
        if (this.props.packID === z)this.refs.tagSelector && this.refs.tagSelector.focusInput();
        this.refs.packSelector.onFlyoutShown();
    }, _onHidden: function () {
        this.resetTagSelector();
        this.props.onHidden && this.props.onHidden();
    }, componentWillUnmount: function () {
        this._subscriptions.release();
    }, componentWillReceiveProps: function (ba) {
        if (!this.state.dataReady && ba.shown)this.loadTrayData();
    }, componentDidUpdate: function (ba) {
        if (!ba.shown && this.props.shown) {
            this._onShown();
        } else if (ba.shown && !this.props.shown)this._onHidden();
    }, _onKeyDown: function (event) {
        if (event.keyCode === i.ESC && this.props.onEscKeyDown) {
            this.props.onEscKeyDown();
            event.kill();
        }
    }, resetTagSelector: function () {
        this.refs.tagSelector && this.refs.tagSelector.reset();
    }, loadTrayData: function () {
        t.onTrayDataReady(function () {
            var ba = t.getNumNewPacks();
            this.setState({dataReady: true, numNewPacks: ba});
            var ca = t.getPacksInTray()[0].id, da = this.props.packID;
            if (!da || !x(t.getPackIDsInTray(), da))o.selectPack(ca, true);
        }.bind(this));
        if (q.WebStickerSearch && !q.StickerSearchOnServer)s.prepareTagsData();
    }, loadPack: function () {
        if (!this.state.dataReady)return (l.createElement(l.DOM.div, {className: "_e0r"}, l.createElement(w, {size: "large"})));
        if (this.props.packID === p.EMOTICON_PACK_ID)return (l.createElement(l.DOM.div, {className: "_5r8l", 'data-id': this.props.packID}, l.createElement(j, {onEmoticonSelect: this.props.onEmoticonSelect})));
        if (this.props.packID === z && q.WebStickerSearch)return (l.createElement(l.DOM.div, {className: "_5r8l"}, l.createElement(r, {ref: "tagSelector", className: "fbStickersFlyoutTagSelector", trigger: this.props.trigger, resetTrigger: function () {
            return this.setProps({trigger: null});
        }.bind(this), isComments: this.props.isComments})));
        return (l.createElement(l.DOM.div, {className: "_5r8l", 'data-id': this.props.packID}, l.createElement(n, {ref: "selector", packID: this.props.packID, isComments: this.props.isComments})));
    }, packsUpdated: function () {
        var ba = t.getPackIDsInTray();
        if (!x(ba, this.props.packID)) {
            o.selectPack(ba[0]);
            return;
        }
        this.forceUpdate(null);
    }, selectedSticker: function (event) {
        var ba = k.byClass(event.target, "_5r8h");
        if (ba) {
            var ca = ba.getAttribute('data-id');
            t.updateRecentlyUsed(ca);
            this.props.onStickerSelect(ca, event);
            if (this.props.packID === p.SEARCH_PACK_ID)t.promotePackSentFromSearch(ca);
            t.clearShowStickerReplyNUX();
        }
    }, render: function () {
        var ba = this.props.isComments ? t.getPacksInCommentsTray() : t.getPacksInTray();
        return (l.createElement(l.DOM.div, {className: "_5r8f"}, l.createElement(l.DOM.div, {className: "_5r8e"}, l.createElement(m, {ref: "packSelector", numNewPacks: this.state.numNewPacks, onPackClick: this.props.onPackSelect, selectedPackID: this.props.packID, packs: ba, isComments: this.props.isComments, resetTagSelectorFunc: this.resetTagSelector})), l.createElement(l.DOM.div, {className: "_5r8m", onClick: this.selectedSticker}, this.loadPack())));
    }});
    e.exports = aa;
}, null);
__d("ChatStickerButton.react", ["BanzaiODS", "React", "ReactLayeredComponentMixin", "StickerContextualDialog.react", "StickersFlyout.react", "StickerState", "cx", "emptyFunction", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    'use strict';
    var p = 278, q = h.createClass({displayName: 'ChatStickerButton', propTypes: {onStickerSelect: h.PropTypes.func, onEmoticonSelect: h.PropTypes.func, onFlyoutShown: h.PropTypes.func, onFlyoutHidden: h.PropTypes.func, packID: h.PropTypes.string}, getInitialState: function () {
        return {shown: false};
    }, mixins: [i], getDefaultProps: function () {
        return {onStickerSelect: n, onEmoticonSelect: n};
    }, componentDidMount: function () {
        g.bumpEntityKey('chat.web', 'sticker_button.mounted');
        this._subscription = l.addListener(l.PACK_SELECTED, function (r) {
            return this.setProps({packID: r});
        }.bind(this));
    }, shouldComponentUpdate: function (r, s) {
        return (r.packID != this.props.packID || s.shown != this.state.shown);
    }, componentWillUnmount: function () {
        this._subscription && this._subscription.remove();
    }, render: function () {
        return (h.createElement(h.DOM.a, {className: "_4vuh", onClick: this.showFlyout, onMouseDown: this._prepareForClick, title: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043d\u0430\u043a\u043b\u0435\u0439\u043a\u0443 \u0438\u043b\u0438 \u0441\u043c\u0430\u0439\u043b\u0438\u043a", ref: "link"}, h.createElement(h.DOM.div, {className: (("_4vui") + (this.state.shown ? ' ' + "open" : ''))})));
    }, renderLayers: function () {
        return {contextualDialog: h.createElement(j, {alignment: "left", className: "_5e-r", contextRef: "link", onBlur: this._hideFlyout, position: "above", shown: this.state.shown, width: p}, h.createElement(h.DOM.div, null, h.createElement(k, {onShown: function (r) {
            return this.props.onFlyoutShown && this.props.onFlyoutShown(r);
        }.bind(this), onHidden: function () {
            return this.props.onFlyoutHidden && this.props.onFlyoutHidden();
        }.bind(this), onEscKeyDown: this._hideFlyout, onStickerSelect: this._handleStickerSelected, onEmoticonSelect: this._handleEmoticonSelected, packID: this.props.packID, shown: this.state.shown})))};
    }, _prepareForClick: function () {
        this._clickGuard = this.state.shown;
    }, showFlyout: function () {
        !this._clickGuard && this.setState({shown: true});
    }, _hideFlyout: function () {
        this.setState({shown: false});
    }, _handleStickerSelected: function (r) {
        this.props.onStickerSelect(r);
    }, _handleEmoticonSelected: function (r) {
        this._hideFlyout();
        this.props.onEmoticonSelect(r);
    }});
    e.exports = q;
}, null);
__d("ChatFileUploaderMixin", ["SubscriptionsHandler", "React"], function (a, b, c, d, e, f, g, h) {
    var i = {propTypes: {attachmentsShelf: h.PropTypes.object, onFileUploaderMounted: h.PropTypes.func, onUploadFinished: h.PropTypes.func, onUpdateAttachmentsShelf: h.PropTypes.func, onSubmit: h.PropTypes.func}, setUpSubscriptionsHandler: function (j) {
        this._uploader = j;
        this._subscriptions = new g();
        this._subscriptions.addSubscriptions(this._uploader.subscribe(['all-uploads-completed', 'upload-canceled'], this._handleUploadFinished), this._uploader.subscribe('dom-updated', this._handleUpdateAttachmentsShelf), this._uploader.subscribe('submit', this._handleSubmit));
        this.props.onFileUploaderMounted(this._uploader);
    }, componentWillUnmount: function () {
        this._subscriptions && this._subscriptions.release();
        if (!this.props.uploaderIsFromHigherLevel)this._uploader && this._uploader.destroy();
    }, isUploading: function () {
        return this._uploader.isUploading();
    }, getAttachments: function () {
        return this._uploader.getAttachments();
    }, getImageFiles: function () {
        return this._uploader.getImageFiles();
    }, getVideoFiles: function () {
        return this._uploader.getVideoFiles();
    }, getAudioFiles: function () {
        return this._uploader.getAudioFiles();
    }, getFiles: function () {
        return this._uploader.getFiles();
    }, removeAttachments: function () {
        return this._uploader.removeAttachments();
    }, _handleUploadFinished: function () {
        if (this.props.onUploadFinished)this.props.onUploadFinished();
    }, _handleUpdateAttachmentsShelf: function () {
        if (this.props.onUpdateAttachmentsShelf)this.props.onUpdateAttachmentsShelf();
    }, _handleSubmit: function () {
        if (this.props.onSubmit)this.props.onSubmit();
    }};
    e.exports = i;
}, null);
__d("ChatFileUploader.react", ["ChatFileUploaderMixin", "InlineBlock.react", "MercuryConfig", "React", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    'use strict';
    var m = j.createClass({displayName: 'ChatFileUploader', mixins: [g], getDefaultProps: function () {
        return {uploaderIsFromHigherLevel: true};
    }, shouldComponentUpdate: function () {
        return false;
    }, componentDidMount: function () {
        var n = this.props.initFileUploaderFn(this.refs.form.getDOMNode(), this.refs.input.getDOMNode(), this.refs.attachID.getDOMNode());
        this.setUpSubscriptionsHandler(n);
    }, render: function () {
        return (j.createElement(j.DOM.form, {ref: "form", action: i.upload_url, method: "post"}, j.createElement(j.DOM.input, {type: "hidden", ref: "attachID", name: "attach_id"}), j.createElement(h, {className: "_m _4q60 itemLabel"}, j.createElement(j.DOM.input, {type: "file", className: "_n", name: "attachment[]", multiple: "true", ref: "input"}), j.createElement(j.DOM.span, {className: "_4q61 itemAnchor"}, "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0444\u0430\u0439\u043b\u044b..."))));
    }});
    e.exports = m;
}, null);
__d("ChatTabMenu.react", ["ChatFileUploader.react", "ChatPrivacyActionController", "ChatConfig", "MercuryConfig", "MercuryFileUploader", "MercuryThreadMuter", "React", "PopoverMenu.react", "ReactMenu", "MenuSeparator.react", "Toggler", "TrackingNodes", "WebMessengerThreadPermalinks", "cx", "fbt", "goURI", "MercuryThreads", "MercuryThreadActions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    'use strict';
    var w = b('MercuryThreads').get(), x = b('MercuryThreadActions').get(), y = o.Item, z = m.createClass({displayName: 'ChatTabMenu', propTypes: {onFileUploaderMounted: m.PropTypes.func, updatePrivacyLinkFunc: m.PropTypes.func, nameConversationFunc: m.PropTypes.func, leaveConversationFunc: m.PropTypes.func, showParticipantsFunc: m.PropTypes.func, clearHistoryFunc: m.PropTypes.func, reportSpamFunc: m.PropTypes.func, createGroupFunc: m.PropTypes.func, isMultichat: m.PropTypes.bool, isEmptyChat: m.PropTypes.bool, showAddFriend: m.PropTypes.func, threadID: m.PropTypes.string, attachmentsShelf: m.PropTypes.object, onUploadFinished: m.PropTypes.func, onUpdateAttachmentsShelf: m.PropTypes.func, onSubmit: m.PropTypes.func, enableDesktopNotif: m.PropTypes.func}, getDefaultProps: function () {
        return {show: true};
    }, componentWillMount: function () {
        if (!this.props.isMultiChat)this._privacyActionController = new h(w.getCanonicalUserInThread(this.props.threadID), this.props.updatePrivacyLinkFunc);
    }, componentDidMount: function () {
        if (!this.props.fullURL)s.getThreadURI(this.props.threadID, function (aa) {
            this.isMounted() && this.setProps({fullURL: aa});
        }.bind(this));
    }, _initFileUploader: function (aa, ba, ca) {
        if (this._fileUploader) {
            this._fileUploader.updateElements(aa, ba, ca);
        } else this._fileUploader = new k(this.props.attachmentsShelf, aa, ba, ca);
        return this._fileUploader;
    }, componentWillUnmount: function () {
        this._privacyActionController && this._privacyActionController.destroy();
        this._fileUploader && this._fileUploader.destroy();
    }, _unmuteThread: function () {
        x.unmute(this.props.threadID);
        q.hide();
    }, _renderFileUploader: function () {
        return (m.createElement(y, {className: "_37_x"}, m.createElement(g, {onFileUploaderMounted: this.props.onFileUploaderMounted, attachmentsShelf: this.props.attachmentsShelf, initFileUploaderFn: this._initFileUploader, onUploadFinished: this.props.onUploadFinished, onUpdateAttachmentsShelf: this.props.onUpdateAttachmentsShelf, onSubmit: this.props.onSubmit})));
    }, _renderOpenFullConversation: function () {
        if (this.props.fullURL)return (m.createElement(y, {onclick: function () {
            return v(this.props.fullURL);
        }.bind(this)}, "\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0432\u0441\u044e \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0443"));
        return null;
    }, _renderAddFriend: function () {
        if (!this.props.showAddFriend)return null;
        return (m.createElement(y, {onclick: this.props.showAddFriend}, "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0434\u0440\u0443\u0437\u0435\u0439 \u0432 \u0447\u0430\u0442..."));
    }, _renderTogglePrivacy: function () {
        if (!this.props.isMultichat) {
            var aa = this._privacyActionController.togglePrivacy.bind(this._privacyActionController);
            return (m.createElement(y, {onclick: aa}, this.props.privacyText));
        }
        return null;
    }, _renderMuteConversation: function () {
        if (!this.props.isMuted) {
            var aa = l.showMuteChangeDialog.bind(null, this.props.threadID);
            return (m.createElement(y, {onclick: aa}, "\u0412\u044b\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0437\u0432\u0443\u043a"));
        } else return (m.createElement(y, {onclick: this._unmuteThread}, "\u0412\u043e\u0437\u043e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0443"));
    }, _renderClearConversation: function () {
        if (!this.props.isMultichat)return (m.createElement(y, {onclick: this.props.clearHistoryFunc}, "\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043e\u043a\u043d\u043e"));
        return null;
    }, _renderReportSpam: function () {
        if (!this.props.isMultichat)return (m.createElement(y, {onclick: this.props.reportSpamFunc}, "\u0421\u043e\u043e\u0431\u0449\u0438\u0442\u044c \u043e \u0441\u043f\u0430\u043c\u0435 \u0438\u043b\u0438 \u043d\u0430\u0440\u0443\u0448\u0435\u043d\u0438\u044f\u0445..."));
        return null;
    }, _renderCreateGroup: function () {
        if (this.props.isMultichat)return (m.createElement(y, {onclick: this.props.createGroupFunc}, "\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0433\u0440\u0443\u043f\u043f\u0443"));
        return null;
    }, _renderConversationName: function () {
        if (this.props.isMultichat && this.props.fullURL)return (m.createElement(y, {onclick: this.props.nameConversationFunc}, "\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438"));
        return null;
    }, _renderLeaveConversation: function () {
        if (this.props.isMultichat)return (m.createElement(y, {onclick: this.props.leaveConversationFunc}, "\u0412\u044b\u0439\u0442\u0438 \u0438\u0437 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438"));
        return null;
    }, _renderEnableDesktopNotifications: function () {
        if (j.DesktopNotificationsGK && "Notification" in window && Notification.permission !== "granted")return (m.createElement(y, {onclick: this.props.enableDesktopNotif}, "Enable Desktop Notifications"));
        return null;
    }, _renderPeopleList: function () {
        if (this.props.isMultichat && this.props.fullURL && i.get('chat_remove_participants'))return (m.createElement(y, {onclick: this.props.showParticipantsFunc}, "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432..."));
        return null;
    }, render: function () {
        var aa = this._renderReportSpam(), ba = this._renderCreateGroup(), ca = m.createElement(o, {className: (("chatReact") + (!this.props.show ? ' ' + "hidden_elem" : ''))}, this._renderOpenFullConversation(), this._renderFileUploader(), this._renderAddFriend(), this._renderTogglePrivacy(), this._renderConversationName(), this._renderPeopleList(), m.createElement(p, null), this._renderMuteConversation(), this._renderClearConversation(), this._renderLeaveConversation(), aa ? (m.createElement(p, null)) : null, aa, ba ? (m.createElement(p, null)) : null, ba, this._renderEnableDesktopNotifications()), da = "\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b", ea = r.getTrackingInfo(r.types.DROPDOWN_BUTTON);
        return (m.createElement(n, {menu: ca}, m.createElement(m.DOM.a, {'data-ft': ea, 'data-hover': "tooltip", 'aria-label': da, 'data-tooltip-alignh': "center", className: (("button") + (this.props.isEmptyChat ? ' ' + "hidden_elem" : ''))})));
    }});
    e.exports = z;
}, null);
__d("ChatDateBreak.react", ["React", "ReactPropTypes", "Timestamp.react", "cx", "formatDate", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = g.createClass({displayName: 'ChatDateBreak', propTypes: {date: h.instanceOf(Date).isRequired}, shouldComponentUpdate: function (n) {
        return this.props.date.getTime() !== n.date.getTime();
    }, render: function () {
        var n = this.props.date, o = k(n, {today: 'g:ia', withinWeek: 'l g:ia', thisYear: 'F jS, g:ia', older: 'F j, Y g:i a'}), p = Math.round(n.getTime() / 1000);
        return (g.createElement(g.DOM.div, Object.assign({}, this.props, {className: l(this.props.className, "_5w-5")}), g.createElement(g.DOM.div, {className: "_5w-6"}, g.createElement(i, {time: p, verbose: o, text: o}))));
    }});
    e.exports = m;
}, null);
__d("ChatAuthorPhotoBlock.react", ["MercuryParticipants", "ReactPropTypes", "React", "cx", "formatDate", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = 86400000, n = i.createClass({displayName: 'ChatAuthorPhotoBlock', propTypes: {authorID: h.string.isRequired, hideName: h.bool, hidePhoto: h.bool, timestamp: h.number}, getInitialState: function () {
        return {author: {id: null, name: '', href: '#', image_src: ''}};
    }, componentDidMount: function () {
        this.updateAuthor(this.props.authorID);
    }, componentWillReceiveProps: function (o) {
        if (o.authorID != this.state.author.id)this.updateAuthor(o.authorID);
    }, render: function () {
        return (i.createElement(i.DOM.div, Object.assign({}, this.props, {className: l(this.props.className, "_5yt9")}), this.renderAuthorName(), this.renderAuthorPhoto(), this.props.children));
    }, renderAuthorName: function () {
        if (!this.props.hideName)return (i.createElement(i.DOM.div, {className: "_5ys-", ref: "name"}, this.state.author.name));
    }, renderAuthorPhoto: function () {
        if (!this.props.hidePhoto) {
            var o = null;
            if (this.props.timestamp) {
                var p = (Date.now() - this.props.timestamp > m) ? 'M jS, g:ia' : 'g:ia';
                o = k(new Date(this.props.timestamp), p);
            }
            return (i.createElement(i.DOM.a, {'aria-label': o, className: "_5ys_", 'data-hover': "tooltip", 'data-tooltip-position': "left", href: this.state.author.href, ref: "link"}, i.createElement(i.DOM.img, {src: this.state.author.image_src, ref: "image"})));
        }
    }, updateAuthor: function (o) {
        g.get(o, function (p) {
            this.isMounted() && this.setState({author: p});
        }.bind(this));
    }});
    e.exports = n;
}, null);
__d("ChatBubble.react", ["DOMDimensions", "MercuryMessageBody.react", "ReactPropTypes", "React", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = null, n = j.createClass({displayName: 'ChatBubble', propTypes: {attachments: i.renderable, body: i.string, maxWidth: i.number.isRequired}, getInitialState: function () {
        return {bubbleWidth: this.props.maxWidth};
    }, componentDidMount: function () {
        this.shrinkBubble();
    }, componentWillReceiveProps: function (o) {
        if (o.body != this.props.body)this.setState({bubbleWidth: this.props.maxWidth});
    }, componentDidUpdate: function (o, p) {
        if (o.body != this.props.body)this.shrinkBubble();
    }, render: function () {
        return (j.createElement(j.DOM.div, Object.assign({}, this.props, {className: l(this.props.className, "_5w1r"), ref: "bubble", style: Object.assign({}, (this.props.style || {}), {maxWidth: this.state.bubbleWidth})}), j.createElement(j.DOM.div, null, j.createElement(j.DOM.span, {className: "_5yl5", ref: "content"}, j.createElement(h, {body: this.props.body}))), this.props.attachments));
    }, shrinkBubble: function () {
        var o = this.refs.bubble.getDOMNode(), p = this.refs.content.getDOMNode(), q = g.getElementDimensions(o).width, r = g.getElementDimensions(p).width;
        if (this.contentWraps() && r > 0 && r < this.props.maxWidth && q - r - this.getBoxWidth() > 0 && r != this.state.bubbleWidth)this.setState({bubbleWidth: r});
    }, contentWraps: function () {
        var o = this.refs.content.getDOMNode(), p = o.getClientRects(), q = g.getElementDimensions(o).height;
        return (p && p.length > 1 && p[0].height < q);
    }, getBoxWidth: function () {
        if (!m)m = g.measureElementBox(this.refs.bubble.getDOMNode(), 'width', true, true, false);
        return m;
    }});
    e.exports = n;
}, null);
__d("XStickerAssetControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/asset\/", {sticker_id: {type: "Int", required: true}, image_type: {type: "Enum"}});
}, null);
__d("XLinkshimLogControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/si\/ajax\/l\/render_linkshim_log\/", {u: {type: "String", required: true}, h: {type: "String", required: true}, render_verification: {type: "Bool"}, enc: {type: "String"}, d: {type: "String"}});
}, null);
__d("LinkshimHandler", ["Event", "LinkshimAsyncLink", "LinkshimHandlerConfig", "URI", "XLinkshimLogControllerURIBuilder", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {setUpLinkshimHandling: function (s) {
        try {
            var u = j(s.getAttribute('href')), v = n(u);
            if (v && o(u)) {
                g.listen(s, 'mouseover', l(h.swap, null, s, v));
                var w = q(u);
                g.listen(s, 'click', function () {
                    if (i.supports_meta_referrer) {
                        h.referrer_log(s, w, p(u).toString());
                    } else h.swap(s, u);
                });
            }
        } catch (t) {
        }
    }};

    function n(s) {
        return s.getQueryData().u ? new j(s.getQueryData().u) : null;
    }

    function o(s) {
        return s.getQueryData().hasOwnProperty('s');
    }

    function p(s) {
        var t = s.getQueryData().hasOwnProperty('enc') ? s.getQueryData().enc : '';
        return (new k()).setString('u', s.getQueryData().u).setString('h', s.getQueryData().h).setBool('render_verification', s.getQueryData().hasOwnProperty('render_verification')).setString('enc', t).getURI();
    }

    function q(s) {
        var t;
        if (r()) {
            t = j(s).addQueryData({render_verification: true});
        } else t = n(s);
        return t;
    }

    function r() {
        var s = i.render_verification_rate || 0;
        return Math.floor(Math.random() * s + 1) === s;
    }

    e.exports = m;
}, null);
__d("MercuryAttachmentRenderer", ["MercuryAttachmentTemplates", "MercuryAttachmentAudioClip.react", "Bootloader", "ChatAnimatedGifs", "SyncRequest.react", "CSS", "MercuryConstants", "DOM", "Event", "MercuryAttachment", "MercuryAttachmentType", "MercuryAttachmentVideo.react", "MercuryParticipants", "ProgressBar", "React", "Sticker.react", "StickerAssetType", "Style", "URI", "UserAgent_DEPRECATED", "cx", "endsWith", "invariant", "tx", "updatePhotoProgressBar", "XStickerAssetControllerURIBuilder", "OrionMercuryAttachment", "MercuryMessages"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa) {
    "use strict";
    var ga = b('OrionMercuryAttachment').module, ha = b('MercuryMessages').get(), ia = z.ie() <= 8;

    function ja(ma, na) {
        var oa = g[na].build().setNodeContent('filename', ma.name), pa = oa.getNode('link');
        pa.setAttribute('href', ma.url);
        ma.rel && pa.setAttribute('rel', ma.rel);
        l.addClass(oa.getRoot(), p.getAttachIconClass(ma.icon_type));
        return oa;
    }

    function ka(ma, na) {
        var oa = g[na].build().setNodeContent('filename', ma.name);
        l.addClass(oa.getRoot(), p.getAttachIconClass(ma.icon_type));
        return oa;
    }

    var la = {renderAttachment: function (ma, na, oa, pa, qa, ra) {
        var sa = 100, ta = ma ? 160 : 400, ua = null, va = null, wa = m.MercurySupportedShareType;
        if (this.isErrorAttachment(na))ua = la.renderError(na);
        if (this.isShareAttachment(na) && na.share_xhp)if (na.share_data_type === wa.FB_BROWSE_QUERY || !ma)va = la.renderShareXHP(na, oa.id);
        if (this.isStickerAttachment(na))va = la.renderSticker(na, oa, ma, ra);
        if (!va && this.isShareAttachment(na)) {
            var xa = na.share_data_type;
            switch (xa) {
                case wa.FB_PHOTO:
                    va = la.renderPreview(na, oa, pa, qa);
                    break;
                case wa.FB_VIDEO:
                    va = la.renderVideoThumb(na);
                    break;
                case wa.FB_MUSIC_ALBUM:
                case wa.FB_SONG:
                case wa.FB_PLAYLIST:
                case wa.FB_MUSICIAN:
                case wa.FB_RADIO_STATION:
                    va = la.renderMusic(na);
                    break;
                case wa.EXTERNAL:
                case wa.FB_TEMPLATE:
                case wa.FB_SOCIAL_REPORT_PHOTO:
                    va = la.renderExternalLink(na);
                    break;
                case wa.FB_COUPON:
                case wa.FB_EVENT:
                case wa.FB_SHOERACK_INVITATION:
                    va = la.renderChatXHP(na);
                    break;
                case wa.FB_SOCIAL_RESOLUTION:
                case wa.FB_STATUS:
                    va = la.renderSocialResolution(na);
                    break;
                case wa.FB_SYNC_REQUEST:
                    va = la.renderSyncRequest(na);
                    break;
                case wa.FB_OPEN_GRAPH:
                    va = la.renderOpenGraph(na);
                    break;
                case wa.FB_ORION:
                    if (ga)va = la.renderOrionMercuryAttachment(na);
                    break;
                default:
                    if (na.name)va = la.renderShareLink(na, oa && oa.id, ma);
                    break;
            }
        }
        if (!va && na.preview_loading)va = la.renderPreview(na, oa, pa, qa);
        if (!va && this.isVideoAttachment(na)) {
            va = n.create('div');
            u.renderComponent(la.renderVideo(na, ma), va);
        }
        if (!va && na.preview_url)va = la.renderPreview(na, oa, pa, qa);
        if (!va && this.isFileAttachment(na))if (na.metadata && na.metadata.type == m.MercuryAttachmentAudioClip) {
            va = n.create('div');
            var ya = la.renderAudioClip(na, oa.message_id, sa, ta);
            u.renderComponent(ya, va);
        } else va = ma ? la.renderFileLink(na) : la.renderExtendedFileLink(na);
        return {error: ua, content: va, bubblePreferred: this.isBubblePreferred(na)};
    }, isBubblePreferred: function (ma) {
        return !this.isStickerAttachment(ma) && !this.isSyncRequestAttachment(ma);
    }, renderError: function (ma) {
        var na = g[':fb:mercury:attachment:error'].build();
        n.appendContent(na.getNode('error'), ma.error_msg);
        return na.getRoot();
    }, renderSocialResolution: function (ma) {
        var na = g[':fb:mercury:attachment:social-resolution'].build();
        na.setNodeContent('post', ma.share_xhp);
        return na.getRoot();
    }, renderChatXHP: function (ma) {
        var na = g[':fb:mercury:attachment:social-resolution'].build();
        na.setNodeContent('post', ma.chat_xhp);
        return na.getRoot();
    }, renderOpenGraph: function (ma) {
        var na = ma.share_xhp.cloneNode(true);
        if (z.firefox())x.set(na, 'minWidth', '180px');
        return na;
    }, renderExternalLink: function (ma) {
        var na = g[':fb:mercury:attachment:external-link'].build().setNodeContent('name', ma.name);
        ma.base_url && na.setNodeContent('shortLink', ma.base_url);
        var oa = na.getNode('preview'), pa = na.getNode('image-link');
        pa.setAttribute('href', ma.url);
        ma.rel && pa.setAttribute('rel', ma.rel);
        if (ma.preview_url) {
            var qa = na.getNode('preview-image'), ra = ma.preview_url, sa = y(j.getRawUrlFromSafeUrl(ra));
            if (ba(sa.getPath(), '.gif')) {
                ra = y('/animated.php').setSecure(true).setDomain('www.fbsbx.com').addQueryData('url', sa.toString());
                l.addClass(oa, "_dri");
                if (ma.name && ma.name.__html == sa.toString())na.setNodeContent('name', '');
            }
            qa.setAttribute('src', ra);
            l.addClass(oa, ma.preview_class);
            l.show(qa);
        } else {
            l.addClass(na.getRoot(), 'noMedia');
            l.hide(oa);
        }
        na.getNode('name').setAttribute('href', ma.url);
        d(['LinkshimHandler'], function (ta) {
            ta.setUpLinkshimHandling(na.getNode('name'));
            ta.setUpLinkshimHandling(na.getNode('image-link'));
        });
        if (ma.rel)na.getNode('name').setAttribute('rel', ma.rel);
        return na.getRoot();
    }, renderFileLink: function (ma) {
        var na = null;
        if (ma.url === '') {
            na = ':fb:mercury:attachment:file-name';
            return ka(ma, na).getRoot();
        } else {
            na = ':fb:mercury:attachment:file-link';
            return ja(ma, na).getRoot();
        }
    }, renderAudioClip: function (ma, na, oa, pa) {
        var qa = ma.metadata.duration / 1000, ra = 200;
        if (oa && pa)if (qa < 5) {
            ra = oa;
        } else ra = (1 - Math.pow(10, (qa - 5) / -30)) * (pa - oa) + oa;
        return u.createElement(h, {src: ma.url, duration: ma.metadata.duration / 1000, showHelp: false, width: ra});
    }, renderVideo: function (ma, na) {
        var oa = {height: ma.preview_height, width: ma.preview_width}, pa = na ? {width: 160, height: 120} : {width: 266, height: 200};
        return u.createElement(r, {duration: ma.metadata.duration, name: ma.name, size: pa, thumbnailSize: oa, thumbnail: ma.thumbnail_url, videoID: ma.metadata.fbid});
    }, renderExtendedFileLink: function (ma) {
        var na = null;
        if (ma.url === '') {
            na = ':fb:mercury:attachment:file-name';
            return ka(ma, na).getRoot();
        }
        na = ':fb:mercury:attachment:extended-file-link';
        var oa = ja(ma, na);
        if (ma.open_url) {
            var pa = oa.getNode('openLinkContainer');
            l.show(pa);
            var qa = oa.getNode('openFile');
            qa.setAttribute('href', ma.open_url);
        }
        var ra = oa.getNode('downloadFile');
        ra.setAttribute('href', ma.url);
        ma.rel && ra.setAttribute('rel', ma.rel);
        return oa.getRoot();
    }, renderMusic: function (ma) {
        var na = g[':fb:mercury:attachment:music'].build().setNodeContent('filename', ma.name), oa = na.getNode('link');
        oa.setAttribute('href', ma.url);
        oa.setAttribute('target', '_blank');
        ma.rel && oa.setAttribute('rel', ma.rel);
        var pa = na.getNode('image-link');
        pa.setAttribute('href', ma.url);
        ma.rel && pa.setAttribute('rel', ma.rel);
        var qa = na.getNode('preview-image');
        qa.setAttribute('src', ma.preview_url);
        l.show(qa);
        l.addClass(na.getNode('icon_link'), 'MercuryMusicIcon');
        return na.getRoot();
    }, renderSyncRequest: function (ma) {
        var na = k(ma.metadata), oa = n.create('div');
        u.renderComponent(na, oa);
        return oa;
    }, renderOrionMercuryAttachment: function (ma) {
        var na = u.createElement(ga, Object.assign({}, ma.metadata)), oa = n.create('div');
        u.renderComponent(na, oa);
        return oa;
    }, resizeContain: function (ma, na) {
        var oa = ma.width / ma.height, pa = na.width / na.height;
        if (pa < oa) {
            return {width: Math.min(ma.height * pa, na.width), height: Math.min(ma.height, na.height)};
        } else return {width: Math.min(ma.width, na.width), height: Math.min(ma.width / pa, na.height)};
    }, renderPreview: function (ma, na, oa, pa) {
        var qa = g[':fb:mercury:attachment:preview'].build(), ra = qa.getNode('image-link');
        if (ma) {
            if (ma.url) {
                var sa = new y(ma.url).getQueryData().uri;
                if (sa && ma.rel === 'async') {
                    ra.setAttribute('href', sa);
                    ra.setAttribute('ajaxify', ma.url);
                } else ra.setAttribute('href', ma.url);
            }
            ma.rel && ra.setAttribute('rel', ma.rel);
            var ta;
            if (ma.preview_uploading) {
                var ua = qa.getNode('cancel-button-container');
                l.show(ua);
                var va = qa.getNode('cancel-button'), wa = o.listen(va, 'click', function () {
                    ma.upload_canceled(ma.upload_id);
                    l.hide(qa.getRoot());
                    wa.remove();
                });
                ma.on_success(function (event, eb) {
                    if (eb.upload_id == ma.upload_id) {
                        l.hide(ua);
                        wa.remove();
                    }
                });
                var xa = qa.getNode('progress-bar'), ya = new t(xa), za = qa.getNode('progress-bar-container');
                ca(ma.upload_id);
                ma.on_progress(function (event, eb) {
                    if (eb.upload_id == ma.upload_id) {
                        l.removeClass(za, "_395w");
                        l.show(za);
                        ea(ya, eb.event);
                    }
                });
                if (ma.on_resizing_progress)ma.on_resizing_progress(function (event, eb) {
                    if (eb.upload_id == ma.upload_id) {
                        l.addClass(za, "_395w");
                        l.show(za);
                        ya.setPosition(100 * eb.event.written / eb.event.total);
                    }
                });
                l.addClass(ra, "_57jm");
                if (oa >= 176) {
                    ta = '/images/photos/dots_large.png';
                } else if (oa >= 86) {
                    ta = '/images/photos/dots_medium.png';
                } else ta = '/images/photos/dots_small.png';
                x.set(ra, 'width', oa + 'px');
                x.set(ra, 'max-width', oa + 'px');
                if (ma.preview_width && ma.preview_height)x.set(ra, 'padding-bottom', ((ma.preview_height / ma.preview_width) * 100) + '%');
            } else if (ma.preview_loading) {
                l.addClass(ra, "_5xdv");
                if (pa === 'contain' && ma.preview_width && ma.preview_height) {
                    x.set(ra, 'width', ma.preview_width + 'px');
                    x.set(ra, 'height', ma.preview_height + 'px');
                }
                if (pa === 'cover' && !ia)l.addClass(ra, "_55pj");
            } else if (ma.metadata && ma.metadata.fbid) {
                ta = y('/ajax/mercury/attachments/photo.php').addQueryData({fbid: ma.metadata.fbid, request_user_id: ma.metadata.pageid, mode: pa, width: oa, height: oa}).toString();
                var ab = ra.getAttribute('ajaxify');
                ra.removeAttribute('ajaxify');
                ra.removeAttribute('rel');
                o.listen(ra, 'click', function (event) {
                    event.prevent();
                    i.loadModules(["MessagesViewer"], function (eb) {
                        eb.bootstrapWithConfig({src: ta, endpoint: ab, fbid: ma.metadata.fbid, dimensions: ma.metadata.dimensions, disablePaging: na && na.attachments.length == 1}, ra);
                    });
                });
            } else {
                var bb = y(ma.preview_url);
                pa && bb.addQueryData({mode: pa});
                oa && bb.addQueryData({width: oa, height: oa});
                ta = bb.toString();
            }
            var cb = qa.getNode('preview-image');
            if (ta) {
                if (pa === 'contain' && ma.preview_width && ma.preview_height) {
                    var db = la.resizeContain({width: oa, height: oa}, {width: ma.preview_width, height: ma.preview_height});
                    cb.setAttribute('width', db.width);
                    cb.setAttribute('height', db.height);
                }
                if (ma.preview_uploading || (pa === 'cover' && !ia)) {
                    l.addClass(ra, "_55pj");
                    x.set(ra, 'backgroundImage', 'url(' + ta + ')');
                } else {
                    cb.onload = function () {
                        cb.removeAttribute('width');
                        cb.removeAttribute('height');
                    };
                    cb.setAttribute('src', ta);
                }
            }
            if (na)this.renderReportRespondLink(qa.getRoot(), ma, na.message_id);
        }
        return qa.getRoot();
    }, renderShareLink: function (ma, na, oa) {
        var pa = g[':fb:mercury:attachment:share-link'].build().setNodeContent('name', ma.name), qa = pa.getNode('link');
        qa.setAttribute('href', ma.url);
        ma.rel && qa.setAttribute('rel', ma.rel);
        return pa.getRoot();
    }, renderVideoThumb: function (ma) {
        var na = g[':fb:mercury:attachment:video-thumb'].build(), oa = na.getNode('thumb');
        oa.setAttribute('href', ma.url);
        oa.setAttribute('rel', ma.rel);
        var pa = n.find(na.getRoot(), 'img');
        pa.src = ma.preview_url;
        return na.getRoot();
    }, renderShareXHP: function (ma, na) {
        var oa = n.create('div');
        if (ma) {
            n.appendContent(oa, ma.share_xhp);
            this.renderReportRespondLink(oa, ma, na);
        }
        return oa;
    }, renderSticker: function (ma, na, oa, pa) {
        var qa = oa ? 'chatScrolled/' : 'messengerScrolled/';
        qa += na.thread_id;
        var ra = n.create('div');
        l.addClass(ra, 'stickerContainer');
        var sa = null;
        if (ma.metadata.stickerID)sa = ma.metadata.stickerID.toString();
        var ta = null;
        if (ma.metadata.packID)ta = ma.metadata.packID.toString();
        var ua = new fa().setInt('sticker_id', sa), va = null, wa = null;
        if (window.devicePixelRatio && window.devicePixelRatio > 1) {
            wa = ma.metadata.paddedSpriteURI2x;
            va = ma.metadata.spriteURI2x;
        } else {
            wa = ma.metadata.paddedSpriteURI;
            va = ma.metadata.spriteURI;
        }
        var xa = u.createElement(v, {animationTrigger: "hover", className: "mvs", frameCount: ma.metadata.frameCount || 1, frameRate: ma.metadata.frameRate || 83, framesPerCol: ma.metadata.framesPerCol || 1, framesPerRow: ma.metadata.framesPerRow || 1, onStickerClick: pa, packID: ta, paddedSpriteURI: wa, sourceHeight: ma.metadata.height, sourceURI: ua.setEnum('image_type', w.IMAGE).getURI().toString(), sourceWidth: ma.metadata.width, spriteURI: va, stickerID: sa, subscribedThreadID: qa});
        u.renderComponent(xa, ra);
        return ra;
    }, renderReportRespondLink: function (ma, na, oa) {
        if (!na.is_social_report_attachment)return null;
        switch (na.share_data_type) {
            case m.MercurySupportedShareType.FB_PHOTO:
                break;
            case m.MercurySupportedShareType.FB_SOCIAL_REPORT_PHOTO:
                return null;
            default:
                return null;
        }
        var pa = null;
        if (oa)pa = ha.getMessagesFromIDs([oa])[0];
        if (!pa)return null;
        if (pa.author === s.user)return null;
        var qa = null;
        s.get(pa.author, function (ra) {
            qa = n.create('a', {rel: 'dialog-post', className: "_z6l", id: 'respond-link', ajaxify: y('/ajax/report/social_resolution/post/').setQueryData({attachment_fbid: na.attach_id, post_fbid: na.shared_object_id, sender_id: s.getUserID(ra.id)}).toString()});
            n.setContent(qa, da._("\u041e\u0442\u0432\u0435\u0442\u0438\u0442\u044c \u043d\u0430 \u0437\u0430\u043f\u0440\u043e\u0441 {name}", {name: ra.name}));
            n.appendContent(ma, qa);
        });
    }, renderPhotoAttachments: function (ma, na, oa, pa) {
        var qa = ma.length;
        if (!qa)return null;
        var ra = n.create('div', {className: "_55pk"});
        if (qa === 1) {
            var sa = la.renderPreview(ma[0], na, oa, 'contain');
            n.appendContent(ra, sa);
            return ra;
        }
        var ta = (qa == 2 || qa == 4) ? 2 : 3, ua = (oa - (ta - 1) * pa) / ta, va = Math.ceil(qa / ta), wa = va * ua + (va - 1) * pa, xa = n.create('div', {className: "_55pm", style: 'padding-bottom: ' + (wa / oa * 100) + '%;'});
        n.appendContent(ra, xa);
        for (var ya = 0; ya < qa; ++ya) {
            var za = la.renderPreview(ma[ya], na, ua, 'cover'), ab = ya % ta, bb = Math.floor(ya / ta);
            l.addClass(za, "_55pn");
            x.apply(za, {width: (ua / oa * 100) + '%', left: ((ab * (ua + pa)) / oa * 100) + '%', top: ((bb * (ua + pa)) / wa * 100) + '%'});
            n.appendContent(xa, za);
        }
        return ra;
    }, isPhotoAttachment: function (ma) {
        return ma.attach_type == q.PHOTO || (ma.attach_type == q.FILE && ma.preview_url);
    }, isVideoAttachment: function (ma) {
        return ma.attach_type == q.VIDEO;
    }, isShareAttachment: function (ma) {
        return ma.attach_type == q.SHARE;
    }, isFileAttachment: function (ma) {
        return ma.attach_type == q.FILE;
    }, isErrorAttachment: function (ma) {
        return ma.attach_type == q.ERROR;
    }, isStickerAttachment: function (ma) {
        return ma.attach_type == q.STICKER;
    }, isSyncRequestAttachment: function (ma) {
        var na = m.MercurySupportedShareType;
        return this.isShareAttachment(ma) && ma.share_data_type == na.FB_SYNC_REQUEST;
    }, booleanLexicographicComparator: function (ma) {
        return function (na, oa) {
            for (var pa = 0; pa < ma.length; ++pa) {
                var qa = ma[pa](na), ra = ma[pa](oa);
                if (qa && !ra) {
                    return -1;
                } else if (!qa && ra)return 1;
            }
            return 0;
        };
    }};
    e.exports = la;
}, null);
__d("MercuryAttachments.react", ["MercuryAttachmentRenderer", "DOM", "Event", "ImmutableObject", "React", "SubscriptionsHandler", "arraySort", "cx", "emptyFunction", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    'use strict';
    var q = 176, r = 4, s = k.createClass({displayName: 'MercuryAttachments', propTypes: {message: k.PropTypes.instanceOf(j).isRequired, attachments: k.PropTypes.array.isRequired, isChat: k.PropTypes.bool, onImageLoad: k.PropTypes.func, onStickerClick: k.PropTypes.func}, getDefaultProps: function () {
        return {isChat: false, onImageLoad: o, onStickerClick: o};
    }, componentDidMount: function () {
        this._subscriptionsHandler = new l();
        this.renderAttachments();
    }, componentDidUpdate: function () {
        this.renderAttachments();
    }, componentWillUnmount: function () {
        this._subscriptionsHandler.release();
    }, render: function () {
        var t = this.props.attachments.filter(g.isPhotoAttachment).length > 0;
        return (k.createElement(k.DOM.div, Object.assign({}, this.props, {className: p(this.props.className, (("_5h9y") + (t ? ' ' + "_zl6" : '')))})));
    }, renderAttachments: function () {
        var t = this.getDOMNode();
        h.empty(t);
        var u = this.props.message, v = m(this.props.attachments, g.booleanLexicographicComparator([g.isPhotoAttachment, g.isShareAttachment, g.isFileAttachment, g.isErrorAttachment])), w = g.renderPhotoAttachments(v.filter(g.isPhotoAttachment), u, q, r);
        w && h.appendContent(t, w);
        for (var x = 0; x < v.length; x++) {
            var y = v[x];
            if (g.isPhotoAttachment(y))continue;
            var z = g.renderAttachment(this.props.isChat, y, u, null, null, this.props.onStickerClick);
            z.error && h.appendContent(t, z.error);
            z.content && h.appendContent(t, z.content);
        }
        h.scry(t, 'img').forEach(function (aa) {
            this._subscriptionsHandler.addSubscriptions(i.listen(aa, 'load', function () {
                this.props.onImageLoad(aa);
            }.bind(this)));
        }.bind(this));
    }});
    e.exports = s;
}, null);
__d("MercurySpoofWarning.react", ["MercuryParticipants", "ReactPropTypes", "React", "fbt"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = i.createClass({displayName: 'MercurySpoofWarning', propTypes: {authorID: h.string.isRequired}, getInitialState: function () {
        return {author: {name: ''}};
    }, componentWillMount: function () {
        this.componentWillReceiveProps(this.props);
    }, componentWillReceiveProps: function (l) {
        g.get(l.authorID, function (m) {
            return this.setState({author: m});
        }.bind(this));
    }, render: function () {
        return (i.createElement(i.DOM.div, Object.assign({}, this.props), j._("\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c {name_or_email} \u0432 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u0435\u043b\u044f.", [j.param("name_or_email", this.state.author.name)])));
    }});
    e.exports = k;
}, null);
__d("ChatMessage.react", ["ChatAnimatedGifs", "ChatAuthorPhotoBlock.react", "ChatBubble.react", "ChatConfig", "CSS", "ImmutableObject", "MercuryAttachment", "MercuryAttachments.react", "MercuryAttachmentRenderer", "MercuryErrorInfo", "MercuryIDs", "MercuryMessageError.react", "MercurySpoofWarning.react", "React", "ReactPropTypes", "cx", "fbt", "formatDate", "isRTL", "joinClasses", "MercuryMessages"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
    'use strict';
    var aa = b('MercuryMessages').get(), ba = t.createClass({displayName: 'ChatMessage', propTypes: {message: u.instanceOf(l).isRequired, maxBubbleWidth: u.number.isRequired, onImageLoad: u.func, onStickerClick: u.func}, componentDidMount: function () {
        k.conditionClass(this.getDOMNode(), "_2cnu", this.isOneLine());
    }, isOneLine: function () {
        var ca = this.props.message;
        return aa.isInbound(ca) && !this.refs.attachmentsInside && this.refs.bubble && !this.refs.bubble.contentWraps();
    }, shouldComponentUpdate: function (ca, da) {
        return ca.message !== this.props.message;
    }, render: function () {
        var ca = this.props.message, da = aa.isInbound(ca), ea = q.isMultichat(ca.thread_id), fa = y(ca.body), ga = j.get('chat_fading_bubbles') && !da && aa.isSending(ca), ha = p.hasErrorStatus(ca), ia = (("_5wd4") + (da ? ' ' + "_1nc7" : '') + (!da ? ' ' + "_1nc6" : '') + (da && ea ? ' ' + "_5ysy" : '') + (ga ? ' ' + "_4oe5" : '') + (ha ? ' ' + "_1zcs" : '') + (fa ? ' ' + "direction_rtl" : '') + (!fa ? ' ' + "direction_ltr" : '')), ja = new Date(ca.timestamp);
        return (t.createElement(h, Object.assign({}, this.props, {authorID: ca.author, className: z(this.props.className, ia), hideName: !da || !ea, hidePhoto: !da, timestamp: ca.timestamp, title: da ? null : x(ja, 'g:ia')}), this._renderInner(), this._renderUndertext()));
    }, _renderInner: function () {
        if (this.props.message.is_filtered_content)return (t.createElement(t.DOM.div, {className: "_5wd9", ref: "inner"}, this._renderFilteredContent()));
        return (t.createElement(t.DOM.div, {className: "_5wd9", ref: "inner"}, this._renderBubble(), this._renderAttachments('outside')));
    }, _renderUndertext: function () {
        if (this.props.message.is_filtered_content)return null;
        return (t.createElement(t.DOM.div, {className: "_3ry4", ref: "undertext"}, t.createElement(r, {className: "_5wda clearfix", message: this.props.message, ref: "status"}), this._renderSpoofWarning()));
    }, _renderSpoofWarning: function () {
        return (this.props.message.is_spoof_warning ? t.createElement(s, {authorID: this.props.message.author, className: "_5wdb"}) : null);
    }, _renderFilteredContent: function () {
        return t.createElement(t.DOM.div, {className: "_5wdc uiBoxYellow clearfix"}, "\u042d\u0442\u043e \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0435 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e, \u0442.\u043a. \u043e\u043d\u043e \u0431\u044b\u043b\u043e \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u043e \u043a\u0430\u043a \u043e\u0441\u043a\u043e\u0440\u0431\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u0438\u043b\u0438 \u043e\u0442\u043c\u0435\u0447\u0435\u043d\u043e \u043a\u0430\u043a \u0441\u043f\u0430\u043c.");
    }, _renderAttachments: function (ca) {
        var da = this.props.message, ea = ca == 'inside' ? 'attachmentsInside' : 'attachmentsOutside', fa = m.get(da).filter(function (ga) {
            var ha = o.isBubblePreferred(ga);
            return (ha && ca === 'inside') || (!ha && ca === 'outside');
        });
        if (fa.length > 0)return t.createElement(n, {className: "_5wdd clearfix", isChat: true, message: da, attachments: fa, ref: ea, onImageLoad: this.props.onImageLoad, onStickerClick: this.props.onStickerClick});
    }, _renderBubble: function () {
        var ca = this.props.message, da = ca.body, ea = this._renderAttachments('inside');
        if (g.shouldHideBody(ca))da = '';
        if (da || ea)return (t.createElement(t.DOM.div, {className: "_5wde"}, t.createElement(i, {attachments: ea, body: da, className: "_5wdf", maxWidth: this.props.maxBubbleWidth, ref: "bubble"})));
    }});
    e.exports = ba;
}, null);
__d("ChatVideoCallLink.react", ["Arbiter", "ChatVisibility", "MercuryParticipants", "PresencePrivacy", "React", "ReactPropTypes", "SubscriptionsHandler", "VideoCallCore", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = k.createClass({displayName: 'ChatVideoCallLink', propTypes: {message: l.object.isRequired, onClick: l.func.isRequired}, componentDidMount: function () {
        this._subscriptions = new m();
        this._subscriptions.addSubscriptions(g.subscribe(['buddylist/availability-changed'], this.availabilityChanged), j.subscribe(['privacy-changed', 'privacy-availability-changed'], this.availabilityChanged));
    }, componentWillUnmount: function () {
        this._subscriptions.release();
    }, render: function () {
        return (k.createElement(k.DOM.a, {className: (("callBackLink") + (this.shouldHideLink() ? ' ' + "hidden_elem" : '')), 'data-gt': JSON.stringify({videochat: 'clicked_callback_link'}), href: "#", onClick: this.linkClicked}, this.renderLinkText()));
    }, renderLinkText: function () {
        if (this.props.message.log_message_data.event_name == 'install_canceled') {
            return ("\u0415\u0449\u0435 \u0440\u0430\u0437 \u0432\u044b\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0443 \u0438 \u043f\u0435\u0440\u0435\u0437\u0432\u043e\u043d\u0438\u0442\u0435.");
        } else if (!this.props.message.log_message_data.event_name && this.props.message.log_message_data.callee == i.user && !this.props.message.log_message_data.answered)return ("\u041e\u0442\u0432\u0435\u0442\u043d\u044b\u0439 \u0437\u0432\u043e\u043d\u043e\u043a");
    }, shouldHideLink: function () {
        return !h.isOnline() || !n.availableForCall(this.props.message.log_message_data.to);
    }, linkClicked: function () {
        var r;
        if (this.props.message.log_message_data.event_name == 'install_canceled') {
            r = 'callback_cancelinstall_link';
        } else if (!this.props.message.log_message_data.event_name && this.props.message.log_message_data.callee == i.user && !this.props.message.log_message_data.answered)r = 'callback_link';
        this.props.onClick(this.props.message.log_message_data.to, this.props.message.thread_id, r);
    }, availabilityChanged: function () {
        this.forceUpdate();
    }});
    e.exports = q;
}, null);
__d("MercuryLogMessageRenderer", ["MercuryAttachmentRenderer", "CSS", "DOM", "HovercardLink", "MercuryLogMessageType", "MercuryParticipants", "React", "Image.react", "TooltipLink.react", "cx", "fbt", "ix"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = {renderText: function (la, ma) {
        switch (la.log_message_type) {
            case k.SUBSCRIBE:
                u(la, ma);
                break;
            case k.UNSUBSCRIBE:
                z(la, ma);
                break;
            case k.VIDEO_CALL:
                aa(la, ma);
                break;
            case k.PHONE_CALL:
                ca(la, ma);
                break;
            case k.THREAD_NAME:
                da(la, ma);
                break;
            case k.THREAD_IMAGE:
                ea(la, ma);
                break;
            case k.WALLPAPER:
                fa(la, ma);
                break;
            case k.SERVER_ERROR:
                ga(la, ma);
                break;
        }
    }, renderIcon: function (la) {
        return (m.createElement(n, {className: t(la), src: r('images/spacer.gif')}));
    }, renderLegacy: function (la, ma, na, oa) {
        t(oa).split(' ').forEach(function (pa) {
            return pa && h.addClass(la, pa);
        });
        this.renderText(oa, function (pa) {
            m.renderComponent(m.createElement(m.DOM.span, null, pa), ma);
        });
        this.renderAttachmentLegacy(na, oa);
    }, renderAttachmentLegacy: function (la, ma) {
        if (ma.log_message_type == k.THREAD_IMAGE) {
            var na = ma.log_message_data.image;
            if (na) {
                var oa = g.renderPreview(na.preview_url ? na : null);
                i.setContent(la, oa);
                h.addClass(oa, "_z6a");
                h.show(la);
            }
        }
    }};
    e.exports = s;
    function t(la) {
        var ma = la.log_message_type, na = la.log_message_data;
        return (("_5wzu") + (ma == k.SUBSCRIBE ? ' ' + "_5wzj" : '') + (ma == k.UNSUBSCRIBE ? ' ' + "_5wzk" : '') + (ma == k.THREAD_NAME ? ' ' + "_5wzl" : '') + (ma == k.THREAD_IMAGE ? ' ' + "_5wzm" : '') + (ma == k.VIDEO_CALL && (na.answered || ka(la)) ? ' ' + "_5wzn" : '') + (ma == k.VIDEO_CALL && !(na.answered || ka(la)) ? ' ' + "_5wzo" : '') + (ma == k.PHONE_CALL && na.answered ? ' ' + "_5wzp" : '') + (ma == k.PHONE_CALL && !na.answered ? ' ' + "_5wzq" : '') + (ma == k.SERVER_ERROR ? ' ' + "_5wzr" : ''));
    }

    function u(la, ma) {
        var na = ja(la.log_message_data.added_participants);
        switch (na.length) {
            case 1:
                v(la, ma, na);
                break;
            case 2:
                w(la, ma, na);
                break;
            case 3:
                x(la, ma, na);
                break;
            default:
                y(la, ma, na);
                break;
        }
    }

    function v(la, ma, na) {
        var oa = [la.author, na[0]];
        l.getMulti(oa, function (pa) {
            if (la.author == l.user) {
                ma(q._("\u0412\u044b \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438 {subscriber1}.", [q.param("subscriber1", ia(pa[na[0]]))]));
            } else if (na[0] == l.user) {
                ma(q._("{actor} \u0434\u043e\u0431\u0430\u0432\u0438\u043b(-\u0430) \u0432\u0430\u0441.", [q.param("actor", ia(pa[la.author]))]));
            } else ma(q._("{actor} \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438 {subscriber1}.", [q.param("actor", ia(pa[la.author])), q.param("subscriber1", ia(pa[na[0]]))]));
        });
    }

    function w(la, ma, na) {
        var oa = [la.author].concat(na);
        l.getMulti(oa, function (pa) {
            if (la.author == l.user) {
                ma(q._("\u0412\u044b \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438 {subscriber1} \u0438 {subscriber2}.", [q.param("subscriber1", ia(pa[na[0]])), q.param("subscriber2", ia(pa[na[1]]))]));
            } else if (na[0] == l.user) {
                ma(q._("{actor} \u0434\u043e\u0431\u0430\u0432\u0438\u043b(-\u0430) \u0432\u0430\u0441 \u0438 {subscriber2}.", [q.param("actor", ia(pa[la.author])), q.param("subscriber2", ia(pa[na[1]]))]));
            } else ma(q._("{actor} \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438 {subscriber1} \u0438 {subscriber2}.", [q.param("actor", ia(pa[la.author])), q.param("subscriber1", ia(pa[na[0]])), q.param("subscriber2", ia(pa[na[1]]))]));
        });
    }

    function x(la, ma, na) {
        var oa = [la.author].concat(na);
        l.getMulti(oa, function (pa) {
            if (la.author == l.user) {
                ma(q._("\u0412\u044b \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438 {subscriber1}, {subscriber2} \u0438 {subscriber3}.", [q.param("subscriber1", ia(pa[na[0]])), q.param("subscriber2", ia(pa[na[1]])), q.param("subscriber3", ia(pa[na[2]]))]));
            } else if (na[0] == l.user) {
                ma(q._("{actor} \u0434\u043e\u0431\u0430\u0432\u0438\u043b(-\u0430) \u0432\u0430\u0441, {subscriber2} \u0438 {subscriber3}.", [q.param("actor", ia(pa[la.author])), q.param("subscriber2", ia(pa[na[1]])), q.param("subscriber3", ia(pa[na[2]]))]));
            } else ma(q._("{actor} \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438 {subscriber1}, {subscriber2} \u0438 {subscriber3}.", [q.param("actor", ia(pa[la.author])), q.param("subscriber1", ia(pa[na[0]])), q.param("subscriber2", ia(pa[na[1]])), q.param("subscriber3", ia(pa[na[2]]))]));
        });
    }

    function y(la, ma, na) {
        var oa = [la.author].concat(na);
        l.getMulti(oa, function (pa) {
            function qa(sa) {
                var ta = m.createElement(m.DOM.div, null, sa.map(function (ua) {
                    return m.createElement(m.DOM.div, null, ua.name);
                }));
                return (m.createElement(o, {alignH: "center", position: "above", tooltip: ta}, q._("\u0435\u0449\u0435 {num}", [q.param("num", sa.length)])));
            }

            var ra = na.map(function (sa) {
                return pa[sa];
            });
            if (la.author == l.user) {
                ma(q._("\u0412\u044b \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438 {subscriber1}, {subscriber2} \u0438 {more_people}.", [q.param("subscriber1", ia(ra[0])), q.param("subscriber2", ia(ra[1])), q.param("more_people", qa(ra.slice(2)))]));
            } else if (na[0] == l.user) {
                ma(q._("{actor} \u0434\u043e\u0431\u0430\u0432\u0438\u043b(-\u0430) \u0432\u0430\u0441, {subscriber2} \u0438 {more_people}.", [q.param("actor", ia(pa[la.author])), q.param("subscriber2", ia(ra[1])), q.param("more_people", qa(ra.slice(2)))]));
            } else ma(q._("{actor} \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438 {subscriber1}, {subscriber2} \u0438 {more_people}.", [q.param("actor", ia(pa[la.author])), q.param("subscriber1", ia(ra[0])), q.param("subscriber2", ia(ra[1])), q.param("more_people", qa(ra.slice(2)))]));
        });
    }

    function z(la, ma) {
        var na = [la.author], oa = la.log_message_data.removed_participants, pa;
        if (oa.length === 1) {
            pa = oa[0];
            na.push(pa);
        }
        l.getMulti(na, function (qa) {
            var ra = qa[la.author], sa = qa[pa];
            if (la.author == l.user) {
                if (!pa || pa == la.author) {
                    ma("\u0412\u044b \u0432\u044b\u0448\u043b\u0438 \u0438\u0437 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438.");
                } else ma(q._("\u0412\u044b \u0443\u0434\u0430\u043b\u0438\u043b\u0438 {name} \u0438\u0437 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438.", [q.param("name", ia(sa))]));
            } else if (!pa || pa == la.author) {
                ma(q._("{actor} \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0435 \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u0435\u0442 \u0432 \u044d\u0442\u043e\u0439 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0435.", [q.param("actor", ia(ra))]));
            } else if (pa == l.user) {
                ma(q._("{actor} \u0443\u0434\u0430\u043b\u0438\u043b(-\u0430) \u0432\u0430\u0441 \u0438\u0437 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438.", [q.param("actor", ia(ra))]));
            } else ma(q._("{actor} \u0443\u0434\u0430\u043b\u0438\u043b(-\u0430) {name} \u0438\u0437 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438.", [q.param("actor", ia(ra)), q.param("name", ia(sa))]));
        });
    }

    function aa(la, ma) {
        if (ka(la)) {
            ba(la, ma);
            return;
        }
        var na = la.log_message_data.caller, oa = la.log_message_data.callee, pa = [na, oa];
        l.getMulti(pa, function (qa) {
            var ra = ha(qa[oa]);
            if (na == l.user) {
                if (la.log_message_data.answered) {
                    ma(q._("\u0412\u044b \u043f\u043e\u0437\u0432\u043e\u043d\u0438\u043b\u0438 {firstname}.", [q.param("firstname", ra)]));
                } else ma(q._("{firstname} \u043f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u043b(\u0430) \u0432\u0430\u0448 \u0437\u0432\u043e\u043d\u043e\u043a.", [q.param("firstname", ra)]));
            } else {
                var sa = ha(qa[na]);
                if (la.log_message_data.answered) {
                    ma(q._("{firstname} \u043f\u043e\u0437\u0432\u043e\u043d\u0438\u043b\u0438 \u0412\u0430\u043c.", [q.param("firstname", sa)]));
                } else ma(q._("\u0412\u044b \u043f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u043b\u0438 \u0437\u0432\u043e\u043d\u043e\u043a \u043e\u0442 {firstname}.", [q.param("firstname", sa)]));
            }
        });
    }

    function ba(la, ma) {
        l.get(la.log_message_data.callee, function (na) {
            var oa = ha(na);
            switch (la.log_message_data.event_name) {
                case 'installing':
                    ma(q._("{firstname} \u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0435\u0442 \u0432\u0438\u0434\u0435\u043e\u0437\u0432\u043e\u043d\u043a\u0438...", [q.param("firstname", oa)]));
                    break;
                case 'installed':
                    ma(q._("{firstname} \u0437\u0430\u043a\u043e\u043d\u0447\u0438\u043b(\u0430) \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0443 \u0432\u0438\u0434\u0435\u043e\u0437\u0432\u043e\u043d\u043a\u043e\u0432.", [q.param("firstname", oa)]));
                    break;
                case 'install_canceled':
                    ma("\u0412\u044b \u043e\u0442\u043c\u0435\u043d\u0438\u043b\u0438 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0443 \u0432\u0438\u0434\u0435\u043e\u0437\u0432\u043e\u043d\u043a\u043e\u0432.");
                    break;
            }
        });
    }

    function ca(la, ma) {
        var na = la.log_message_data.caller, oa = la.log_message_data.callee, pa = [na, oa];
        l.getMulti(pa, function (qa) {
            if (na == l.user) {
                var ra = ha(qa[oa]);
                if (la.log_message_data.answered) {
                    ma(q._("\u0412\u044b \u043f\u043e\u0437\u0432\u043e\u043d\u0438\u043b\u0438 {firstname}.", [q.param("firstname", ra)]));
                } else ma(q._("{firstname} \u043f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u043b(\u0430) \u0432\u0430\u0448 \u0437\u0432\u043e\u043d\u043e\u043a.", [q.param("firstname", ra)]));
            } else {
                var sa = ha(qa[na]);
                if (la.log_message_data.answered) {
                    ma(q._("{firstname} \u043f\u043e\u0437\u0432\u043e\u043d\u0438\u043b\u0438 \u0412\u0430\u043c.", [q.param("firstname", sa)]));
                } else ma(q._("\u0412\u044b \u043f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u043b\u0438 \u0437\u0432\u043e\u043d\u043e\u043a \u043e\u0442 {firstname}.", [q.param("firstname", sa)]));
            }
        });
    }

    function da(la, ma) {
        var na = la.log_message_data.name;
        if (la.author == l.user) {
            if (na) {
                ma(q._("\u0412\u044b \u043e\u0437\u0430\u0433\u043b\u0430\u0432\u0438\u043b\u0438 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0443: {name}.", [q.param("name", m.createElement(m.DOM.span, {className: "_5wzs"}, na))]));
            } else ma("\u0412\u044b \u0443\u0434\u0430\u043b\u0438\u043b\u0438 \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438.");
        } else l.get(la.author, function (oa) {
            var pa = ia(oa);
            if (na) {
                ma(q._("{actor} \u0434\u0430\u043b\u0438 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0435: {name}", [q.param("actor", pa), q.param("name", m.createElement(m.DOM.span, {className: "_5wzs"}, na))]));
            } else ma(q._("{actor} \u0443\u0434\u0430\u043b\u0438\u043b\u0438 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438.", [q.param("actor", pa)]));
        });
    }

    function ea(la, ma) {
        if (la.author == l.user) {
            if (la.log_message_data.image) {
                ma("\u0412\u044b \u0438\u0437\u043c\u0435\u043d\u0438\u043b\u0438 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438.");
            } else ma("\u0412\u044b \u0443\u0434\u0430\u043b\u0438\u043b\u0438 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438.");
        } else l.get(la.author, function (na) {
            var oa = ia(na);
            if (la.log_message_data.image) {
                ma(q._("{actor} \u0438\u0437\u043c\u0435\u043d\u0438\u043b\u0438 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438.", [q.param("actor", oa)]));
            } else ma(q._("{actor} \u0443\u0434\u0430\u043b\u0438\u043b(\u0430) \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438.", [q.param("actor", oa)]));
        });
    }

    function fa(la, ma) {
        if (la.author == l.user) {
            ma("\u0412\u044b \u0438\u0437\u043c\u0435\u043d\u0438\u043b\u0438 \u043e\u0431\u043e\u0438.");
        } else l.get(la.author, function (na) {
            var oa = ia(na);
            ma(q._("{actor} \u0438\u0437\u043c\u0435\u043d\u0438\u043b(-\u0430) \u043e\u0431\u043e\u0438.", [q.param("actor", oa)]));
        });
    }

    function ga(la, ma) {
        ma("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0438\u0437\u0432\u043b\u0435\u0447\u044c \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u0432 \u044d\u0442\u043e\u0439 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0435.");
    }

    function ha(la) {
        return ia(la, true);
    }

    function ia(la, ma) {
        var na = la.fbid, oa = j.constructEndpoint({id: na});
        if (la.href)return (m.createElement(m.DOM.a, {className: "_5wzt", href: la.href, 'data-hovercard': oa}, ma ? la.short_name : la.name));
        return la.name;
    }

    function ja(la) {
        var ma = la.indexOf(l.user);
        if (ma > 0) {
            var na = la.filter(function (oa) {
                return oa !== l.user;
            });
            return [l.user].concat(na);
        }
        return la;
    }

    function ka(la) {
        return la.log_message_data.event_name === 'installing' || la.log_message_data.event_name === 'installed' || la.log_message_data.event_name === 'install_canceled';
    }
}, null);
__d("MercuryLogMessage.react", ["DOM", "Event", "ChatVideoCallLink.react", "ImmutableObject", "MercuryLogMessageRenderer", "MercuryLogMessageType", "React", "ReactPropTypes", "VideoCallSupport", "cx", "emptyFunction", "formatDate", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    'use strict';
    var t = m.createClass({displayName: 'MercuryLogMessage', propTypes: {message: n.instanceOf(j).isRequired, onImageLoad: n.func, onVideoCallLinkClick: n.func}, getDefaultProps: function () {
        return {onImageLoad: q};
    }, getInitialState: function () {
        return {messageText: null};
    }, componentDidMount: function () {
        this.componentWillReceiveProps(this.props);
    }, componentWillReceiveProps: function (u) {
        k.renderText(u.message, function (v) {
            this.setState({messageText: v});
        }.bind(this));
    }, shouldComponentUpdate: function (u, v) {
        return this.state.messageText != v.messageText;
    }, componentDidUpdate: function () {
        var u = this.refs.attachment.getDOMNode();
        k.renderAttachmentLegacy(u, this.props.message);
        g.scry(u, 'img').forEach(function (v) {
            var w = h.listen(v, 'load', function () {
                this.props.onImageLoad(v);
                w.remove();
            }.bind(this));
        }.bind(this));
    }, render: function () {
        return (m.createElement(m.DOM.div, Object.assign({}, this.props, {className: s(this.props.className, "_5ye6"), title: r(new Date(this.props.message.timestamp), 'g:ia')}), k.renderIcon(this.props.message), m.createElement(m.DOM.div, {className: "_5ye7"}, this.state.messageText, this.renderVideoCallLink()), m.createElement(m.DOM.div, {className: "_5ye8", ref: "attachment"})));
    }, renderVideoCallLink: function () {
        if (this.props.message.log_message_type !== l.VIDEO_CALL || !this.props.onVideoCallLinkClick || !o.isVideoCallSupported())return null;
        return (m.createElement(i, {message: this.props.message, onClick: this.props.onVideoCallLinkClick}));
    }});
    e.exports = t;
}, null);
__d("ChatConversation.react", ["ChatDateBreak.react", "ChatMessage.react", "ImmutableObject", "MercuryActionTypeConstants", "MercuryLogMessage.react", "React", "cx", "invariant", "OrionMercuryReceiverNUX"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    'use strict';
    var o = b('OrionMercuryReceiverNUX').module, p = 1000 * 60 * 60, q = l.createClass({displayName: 'ChatConversation', propTypes: {maxBubbleWidth: l.PropTypes.number.isRequired, messages: l.PropTypes.arrayOf(l.PropTypes.instanceOf(i)).isRequired, onCallLinkClick: l.PropTypes.func, onImageLoad: l.PropTypes.func, onStickerClick: l.PropTypes.func}, componentWillReceiveProps: function (r) {
        n(r.maxBubbleWidth === this.props.maxBubbleWidth);
    }, render: function () {
        var r = this.props.messages, s = [];
        for (var t = 0; t < r.length; t++) {
            var u = r[t], v = (t > 0) ? r[t - 1] : null;
            if (u.is_cleared)continue;
            if (!v || v.is_cleared || u.timestamp - v.timestamp > p)s.push(l.createElement(g, {date: new Date(u.timestamp), key: 'db:' + u.message_id}));
            if (u.action_type == j.LOG_MESSAGE) {
                s.push(l.createElement(k, {className: "_5w0o", key: u.message_id, message: u, onImageLoad: this.props.onImageLoad, onCallLinkClick: this.props.onCallLinkClick}));
            } else s.push(l.createElement(h, {key: u.message_id, message: u, maxBubbleWidth: this.props.maxBubbleWidth, onImageLoad: this.props.onImageLoad, onStickerClick: this.props.onStickerClick}));
            if (o && o.isValidOrionNUXMessage(u)) {
                var w = u.attachments[0], x = w.metadata;
                s.push(l.createElement(o, Object.assign({className: "_3-8r", key: 'omrn:' + u.message_id, onImageLoad: this.props.onImageLoad}, x)));
            }
        }
        return l.createElement(l.DOM.div, null, s);
    }});
    e.exports = q;
}, null);
__d("MercuryTypingReceiver", ["Arbiter", "ChannelConstants", "MercuryActionTypeConstants", "MercuryConfig", "MercuryParticipants", "MercuryPayloadSource", "TypingStates", "mixInEventEmitter", "setTimeoutAcrossTransitions", "MercuryServerRequests", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = b('MercuryServerRequests').get(), q = b('MercuryThreads').get(), r, s = {}, t = 30000, u = {};
    n(u, {'state-changed': true});
    function v(ba) {
        var ca = s[ba] || {}, da = Object.keys(ca);
        da.sort(function (ea, fa) {
            return ca[ea] - ca[fa];
        });
        return da;
    }

    function w() {
        r = null;
        var ba = Date.now(), ca = {}, da = false;
        for (var ea in s) {
            var fa = false;
            for (var ga in s[ea] || {})if (s[ea][ga] < ba - t) {
                delete s[ea][ga];
                fa = true;
            } else da = true;
            if (fa)ca[ea] = v(ea);
        }
        for (var ha in ca) {
            y(ca);
            break;
        }
        if (da)r = o(w, 3000);
    }

    function x(ba, ca) {
        if (ba in s)if (ca in s[ba]) {
            delete s[ba][ca];
            z(ba);
        }
    }

    function y(ba) {
        u.releaseHeldEventType('state-changed');
        u.emitAndHold('state-changed', ba);
    }

    function z(ba) {
        var ca = {};
        ca[ba] = v(ba);
        y(ca);
    }

    function aa(ba) {
        var ca = j.MercuryFBIDGK ? ba.thread_fbid : ba.thread;
        if (ca)return p.getClientThreadIDNow(ca);
        if (ba.type === 'typ')return q.getThreadIDForUser(ba.from);
        return null;
    }

    g.subscribe([h.getArbiterType('typ'), h.getArbiterType('ttyp')], function (ba, ca) {
        var da = ca.obj, ea = aa(da);
        if (ea) {
            var fa = k.getIDForUser(da.from);
            if (da.st == m.TYPING) {
                s[ea] = s[ea] || {};
                var ga = s[ea][fa];
                s[ea][fa] = Date.now();
                if (!r)r = o(w, 3000);
                !ga && z(ea);
            } else if (da.st == m.INACTIVE)x(ea, fa);
        }
    });
    p.subscribe('update-typing-state', function (ba, ca) {
        var da = ca.payload_source;
        if (da != l.CLIENT_CHANNEL_MESSAGE)return;
        var ea = ca.actions;
        if (!ea || !ea.length)return;
        var fa = i.USER_GENERATED_MESSAGE;
        ea.forEach(function (ga) {
            if (ga.action_type == fa && ga.author != k.user)x(ga.thread_id, ga.author);
        });
    });
    e.exports = u;
}, null);
__d("ChatTypingIndicators.react", ["ChatAuthorPhotoBlock.react", "DOM", "MercuryIDs", "MercuryParticipants", "ReactPropTypes", "React", "SubscriptionsHandler", "Tooltip", "MercuryTypingReceiver", "arraySort", "createObjectFrom", "cx", "emptyFunction", "fbt", "MercuryThreadInformer"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
    var u = b('MercuryThreadInformer').get(), v = l.createClass({displayName: 'ChatTypingIndicators', propTypes: {indicatorsWillShow: k.func, indicatorsDidShow: k.func, threadID: k.string.isRequired}, getDefaultProps: function () {
        return {indicatorsWillShow: s, indicatorsDidShow: s};
    }, getInitialState: function () {
        return {typingUserIDs: []};
    }, componentDidMount: function () {
        this._subscriptions = new m();
        this._subscriptions.addSubscriptions(o.addRetroactiveListener('state-changed', this.typingStateChanged), u.subscribe('messages-received', this.messagesReceived));
    }, componentWillReceiveProps: function (w) {
        if (w.threadID != this.props.threadID)this.setState({typingUserIDs: []});
    }, componentWillUpdate: function (w, x) {
        if (x.typingUserIDs.length > 0)this.props.indicatorsWillShow();
    }, componentDidUpdate: function () {
        if (this.state.typingUserIDs.length > 0)this.props.indicatorsDidShow();
        j.getMulti(this.state.typingUserIDs, function (w) {
            if (this.isMounted())this.state.typingUserIDs.forEach(function (x) {
                var y = w[x];
                n.set(this.refs[x].getDOMNode(), this.renderTooltip(y.short_name), 'above', 'left');
            }.bind(this));
        }.bind(this));
    }, componentWillUnmount: function () {
        this._subscriptions.release();
    }, render: function () {
        var w = i.isMultichat(this.props.threadID);
        return (l.createElement(l.DOM.div, {className: "_2fsr"}, this.state.typingUserIDs.map(function (x) {
            return l.createElement(g, {authorID: x, className: (("_gfq") + (w ? ' ' + "_52fu" : '')), hideName: !w, key: x}, l.createElement(l.DOM.div, {className: "_52ft"}, l.createElement(l.DOM.div, {className: "_gfp", ref: x})));
        })));
    }, renderTooltip: function (w) {
        var x = h.create('span');
        l.renderComponent(l.createElement(l.DOM.span, null, t._("{name} \u043f\u0435\u0447\u0430\u0442\u0430\u0435\u0442 \u0432\u0430\u043c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435...", [t.param("name", w)])), x);
        return x;
    }, typingStateChanged: function (w) {
        if (this.props.threadID in w)this.setState({typingUserIDs: p(w[this.props.threadID])});
    }, messagesReceived: function (w, x) {
        if (this.props.threadID in x) {
            var y = x[this.props.threadID], z = q(y.map(function (aa) {
                return aa.author;
            }));
            this.setState({typingUserIDs: p(this.state.typingUserIDs.filter(function (aa) {
                return !z[aa];
            }))});
        }
    }});
    e.exports = v;
}, null);
__d("MercuryIndicatorController", ["ArbiterMixin", "DOM", "MercuryActionTypeConstants", "MercuryDelayedRoger", "MercuryMessageSourceTags", "MercuryParticipants", "MercuryRoger", "MercuryTypingReceiver", "arrayContains", "copyProperties", "formatDate", "removeFromArray", "tx", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t = b('MercuryThreads').get(), u = [];

    function v(w) {
        this._threadID = w;
        this._canonicalUser = t.getCanonicalUserInThread(w);
        u.push(this);
    }

    p(v.prototype, g, {destroy: function () {
        r(u, this);
    }, setLastMessage: function (w) {
        this._lastMsg = w;
        this._handleStateChange();
    }, _informStateChanged: function (w) {
        if (w.activity == 'none' && this._currentActivity == 'none')return;
        if (this._lastMsg && l.isAuthor(this._lastMsg.author))w.self_authored = true;
        this._currentActivity = w.activity;
        this.inform('state-changed', w);
    }, _notifySentFrom: function () {
        var w, x, y = this._lastMsg.location_text, z = this._lastMsg.source_tags || [];
        if (y) {
            w = s._("\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u0438\u0437 {location}", {location: y});
            x = 'sentFromMobile';
        } else if (o(z, k.MESSENGER)) {
            w = h.create('a', {href: '/mobile/messenger', 'class': 'fcg', target: '_blank'}, "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u0438\u0437 \u0427\u0430\u0442\u0430");
            x = 'sentFromMobile';
        } else if (o(z, k.MOBILE)) {
            w = h.create('a', {href: '/mobile', 'class': 'fcg', target: '_blank'}, "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u0441 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e");
            x = 'sentFromMobile';
        } else if (o(z, k.EMAIL)) {
            w = "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u043f\u043e \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u0435";
            x = 'sentFromEmail';
        } else {
            this._informStateChanged({activity: 'none'});
            return;
        }
        this._informStateChanged({activity: x, text: w});
    }, _notifySeenTimestamp: function (w) {
        var x = m.getSeenTimestamp(this._threadID, w[0]) * .001, y = Date.now() * .001, z;
        if (x < y - 518400) {
            z = 'M j';
        } else if (x < y - 86400) {
            z = 'D g:ia';
        } else z = 'g:ia';
        this._informStateChanged({activity: 'seen-timestamp', text: s._("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u043e {timestamp}", {timestamp: q(x, z)})});
    }, _checkNamesForCollision: function (w, x) {
        var y = false;
        l.getMulti(w, function (z) {
            function aa(da) {
                if (typeof z[da] !== "undefined") {
                    return z[da].short_name.toLowerCase();
                } else return da;
            }

            var ba = x.map(aa), ca = w.map(aa);
            y = ba.some(function (da) {
                return ca.indexOf(da) !== ca.lastIndexOf(da);
            });
        });
        return y;
    }, _notifySeenBy: function (w) {
        var x = this._lastMsg, y = true;
        l.getMulti(w, function (z) {
            y = false;
            if (this._lastMsg != x)return;
            var aa = t.getThreadMetaNow(this._threadID), ba = aa ? aa.participants.length : 0, ca = w.length + (x.author != l.user), da, ea = false, fa = false, ga = ba > 2 && ca >= ba - 1;
            if (!(ga) && ba > 0)fa = this._checkNamesForCollision(aa.participants, w);
            if (ga) {
                da = "\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u043e \u0432\u0441\u0435\u043c\u0438";
            } else if (w.length == 1) {
                da = s._("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u043e {user}", {user: z[w[0]].short_name});
            } else if (w.length == 2) {
                da = s._("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u043e {user1} \u0438 {user2}", {user1: z[w[0]].short_name, user2: z[w[1]].short_name});
            } else if (w.length == 3) {
                da = s._("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u043e {user1}, {user2}, {user3}", {user1: z[w[0]].short_name, user2: z[w[1]].short_name, user3: z[w[2]].short_name});
            } else if (w.length > 3) {
                var ha = Object.keys(z).length - 2, ia = s._("\u0435\u0449\u0435 {num}", {num: ha}), ja = h.create('span', {className: 'more'}, ia);
                da = h.tx._("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u043e {user1}, {user2}, {=num more link}", {user1: z[w[0]].short_name, user2: z[w[1]].short_name, '=num more link': ja});
                ea = true;
            }
            ea = ea || fa;
            this._informStateChanged({activity: 'seen-by', text: da, seenBy: w, hasNameCollision: fa, tooltip: ea});
        }.bind(this));
        y && this._informStateChanged({activity: 'none'});
    }, _notifyTyping: function (w) {
        var x = this._lastMsg, y = true;
        l.getMulti(w, function (z) {
            y = false;
            if (this._lastMsg != x)return;
            var aa = t.getThreadMetaNow(this._threadID), ba = aa ? aa.participants.length : 0, ca, da = false;
            if (ba > 2 && w.length >= ba - 1) {
                ca = "\u0412\u0441\u0435 \u043f\u0435\u0447\u0430\u0442\u0430\u044e\u0442...";
            } else if (w.length == 1) {
                ca = s._("{name} \u043f\u0435\u0447\u0430\u0442\u0430\u0435\u0442 \u0432\u0430\u043c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435...", {name: z[w[0]].short_name});
            } else if (w.length == 2) {
                ca = s._("{user1} \u0438 {user2} \u043f\u0435\u0447\u0430\u0442\u0430\u044e\u0442...", {user1: z[w[0]].short_name, user2: z[w[1]].short_name});
            } else if (w.length == 3) {
                ca = s._("{user1}, {user2} \u0438 {user3} \u043f\u0435\u0447\u0430\u0442\u0430\u044e\u0442...", {user1: z[w[0]].short_name, user2: z[w[1]].short_name, user3: z[w[2]].short_name});
            } else if (w.length > 3) {
                var ea = Object.keys(z).length - 2, fa = s._("\u0435\u0449\u0435 {num}", {num: ea}), ga = h.create('a', {href: '#'}, fa);
                ca = h.tx._("{user1}, {user2} \u0438 {=num more link} \u043f\u0435\u0447\u0430\u0442\u0430\u044e\u0442...", {user1: z[w[0]].short_name, user2: z[w[1]].short_name, '=num more link': ga});
                da = true;
            }
            this._informStateChanged({activity: 'typing', text: ca, typing: w, tooltip: da});
        }.bind(this));
        y && this._informStateChanged({activity: 'none'});
    }, _handleStateChange: function () {
        var w = i.LOG_MESSAGE;
        if (!this._lastMsg || this._lastMsg.action_type == w) {
            this._informStateChanged({activity: 'none'});
            return;
        }
        if (this._typing && this._typing.length) {
            this._notifyTyping(this._typing);
            return;
        }
        if (this._canonicalUser && this._lastMsg.author != l.user) {
            this._notifySentFrom();
            return;
        }
        var x = j.getSeenBy(this._threadID, true);
        if (x.length)if (this._canonicalUser) {
            this._notifySeenTimestamp(x);
            return;
        } else {
            this._notifySeenBy(x);
            return;
        }
        this._informStateChanged({activity: 'none'});
    }});
    n.addRetroactiveListener('state-changed', function (w) {
        u.forEach(function (x) {
            var y = w[x._threadID];
            if (y !== undefined) {
                x._typing = y;
                x._handleStateChange();
            }
        });
    });
    j.subscribe('state-changed', function (w, x) {
        u.forEach(function (y) {
            x[y._threadID] && y._handleStateChange();
        });
    });
    e.exports = v;
}, null);
__d("MercuryLastMessageIndicator.react", ["DOM", "MercuryIndicatorController", "MercuryParticipants", "ReactPropTypes", "React", "Tooltip", "cx", "emptyFunction", "joinClasses", "startsWith"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = k.createClass({displayName: 'MercuryLastMessageIndicator', propTypes: {hideTyping: j.bool, indicatorWillShow: j.func, indicatorDidShow: j.func, lastMessage: j.object, threadID: j.string.isRequired}, getDefaultProps: function () {
        return {indicatorWillShow: n, indicatorDidShow: n};
    }, getInitialState: function () {
        return {data: {}};
    }, componentDidMount: function () {
        this._setup(this.props);
    }, componentWillReceiveProps: function (r) {
        if (r.threadID != this.props.threadID) {
            this._destroy();
            this._setup(r);
        } else if (r.lastMessage != this.props.lastMessage)this._controller.setLastMessage(r.lastMessage);
    }, componentWillUpdate: function (r, s) {
        if (this.isVisible(r, s))this.props.indicatorWillShow();
    }, componentDidUpdate: function () {
        if (!this.isVisible())return;
        this.setText();
        this.setTooltip();
        this.props.indicatorDidShow();
    }, componentWillUnmount: function () {
        this._destroy();
    }, render: function () {
        return (k.createElement(k.DOM.div, {className: this.getRootClass()}, k.createElement(k.DOM.div, {className: "_510h"}), k.createElement(k.DOM.span, {className: "_510f", ref: "text"}, " ")));
    }, getRootClass: function () {
        var r = (("_510g") + (this.state.data.self_authored ? ' ' + "_510e" : '')), s = this.state.data.activity, t = null;
        if (p(s, 'seen')) {
            t = 'seen';
        } else if (s == 'typing') {
            t = this.props.hideTyping ? null : s;
        } else t = s;
        return o(r, t, this.props.className);
    }, isVisible: function (r, s) {
        r = r || this.props;
        s = s || this.state;
        return (s.data && s.data.activity != 'none' && !(r.hideTyping && s.data.activity == 'typing'));
    }, setText: function () {
        if (this.state.data.text)g.setContent(this.refs.text.getDOMNode(), this.state.data.text);
    }, setTooltip: function () {
        if (this.state.data.activity == 'seen-by' && this.state.data.tooltip)i.getMulti(this.state.data.seenBy, function (r) {
            var s = g.create('div', null, this.state.data.seenBy.map(function (t) {
                return g.create('div', null, r[t].name);
            }));
            l.set(this.state.data.hasNameCollision ? this.getDOMNode() : g.find(this.getDOMNode(), 'span.more'), s, 'above', 'center');
        }.bind(this));
    }, _setup: function (r) {
        this._controller = new h(r.threadID);
        this._subscription = this._controller.subscribe('state-changed', function (s, t) {
            return this.setState({data: t});
        }.bind(this));
        r.lastMessage && this._controller.setLastMessage(r.lastMessage);
    }, _destroy: function () {
        this._subscription.unsubscribe();
        this._controller.destroy();
    }, setLastMessage: function (r) {
        this.setProps({lastMessage: r});
    }});
    e.exports = q;
}, null);
__d("MercuryTypingIndicator", ["Animation", "ChatConfig", "CSS", "DOM", "MercuryTypingAnimation.react", "MercuryTypingReceiver", "MercuryParticipants", "React", "Style", "ChatTabTemplates", "Tooltip", "copyProperties", "cx", "csx", "tx", "MercuryThreadInformer"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
    var v = b('MercuryThreadInformer').get(), w = [];
    v.subscribe('messages-received', function (z, aa) {
        w.forEach(function (ba) {
            var ca = aa[ba._threadID];
            ca && ba.receivedMessages(ca);
        });
    });
    l.addRetroactiveListener('state-changed', function (z) {
        w.forEach(function (aa) {
            var ba = z[aa._threadID];
            ba && aa._handleStateChanged(ba);
        });
    });
    function x(z) {
        var aa = p[':fb:chat:conversation:message-group'].build(), ba = p[':fb:mercury:typing-indicator:typing'].build();
        i.addClass(aa.getRoot(), "_50kd");
        var ca = aa.getNode('profileLink');
        q.set(ca, z.name, 'left');
        ca.href = z.href;
        aa.setNodeContent('profileName', z.name);
        aa.setNodeProperty('profilePhoto', 'src', z.image_src);
        var da = u._("{name} \u043f\u0435\u0447\u0430\u0442\u0430\u0435\u0442 \u0432\u0430\u043c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435...", {name: z.short_name});
        q.set(ba.getRoot(), da, 'above');
        j.appendContent(aa.getNode('messages'), ba.getRoot());
        return aa;
    }

    function y(z, aa, ba) {
        this._animations = {};
        this._activeUsers = {};
        this._typingIndicator = aa;
        this._messagesView = ba;
        this._threadID = z;
        this._subscription = l.addRetroactiveListener('state-changed', function (ca) {
            var da = ca[this._threadID];
            da && this._handleStateChanged(da);
        }.bind(this));
        w.push(this);
    }

    r(y.prototype, {destroy: function () {
        Object.keys(this._activeUsers).forEach(this._removeUserBubble.bind(this));
        this._controller.destroy();
        w.remove(this);
    }, receivedMessages: function (z) {
        z.forEach(function (aa) {
            if (!m.isAuthor(aa.author))this._removeUserBubble(aa.author);
        }.bind(this));
    }, _handleStateChanged: function (z) {
        for (var aa in this._activeUsers)if (z.indexOf(aa) === -1) {
            this._slideOutUserBubble(aa);
            delete this._activeUsers[aa];
        }
        if (z.length)m.getMulti(z, function (ba) {
            var ca = this._messagesView.isScrolledToBottom(), da = {};
            for (var ea in ba) {
                var fa = this._activeUsers[ea];
                da[ea] = fa || x(ba[ea]).getRoot();
                if (!fa) {
                    j.appendContent(this._typingIndicator, da[ea]);
                    if (h.get('chat_thread_typing_indicator_animated')) {
                        var ga = j.scry(this._typingIndicator, "._510u");
                        for (var ha = 0, ia = ga.length; ha < ia; ha++)n.renderComponent(n.createElement(k, {className: "_3e2s"}), ga[ha]);
                    }
                }
            }
            var ja = Object.keys(da).length > 0;
            ca && this._messagesView.scrollToBottom(ja);
            this._activeUsers = da;
        }.bind(this));
    }, _removeUserBubble: function (z, aa) {
        var ba = this._getCurrentAnimation(z, aa);
        if (ba) {
            ba.animation.stop();
            j.remove(ba.elem);
            delete this._animations[z];
        }
        if (z in this._activeUsers) {
            j.remove(this._activeUsers[z]);
            delete this._activeUsers[z];
        }
        if (aa && h.get('chat_thread_typing_indicator_animated')) {
            var ca = j.scry(aa, "._510u");
            for (var da = 0, ea = ca.length; da < ea; da++)n.unmountComponentAtNode(ca[da]);
        }
        aa && j.remove(aa);
    }, _slideOutUserBubble: function (z) {
        var aa = this._activeUsers[z];
        if (this._getCurrentAnimation(z, aa)) {
            return;
        } else if (aa) {
            o.set(aa, 'overflow', 'hidden');
            var ba = (new g(aa)).from('opacity', 1).from('height', aa.offsetHeight).to('height', 0).to('opacity', 0).ease(g.ease.end).duration(250).ondone(this._removeUserBubble.bind(this, z, aa)).go();
            this._animations[z] = {animation: ba, elem: aa};
        }
    }, _getCurrentAnimation: function (z, aa) {
        if (this._animations[z] && (!aa || this._animations[z].elem === aa))return this._animations[z];
    }});
    e.exports = y;
}, null);
__d("MercuryMessageList", ["ImmutableObject", "LogHistory", "OrderedMap", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    var k = h.getInstance('mercury_message_list');

    function l(q) {
        this.$MercuryMessageList0 = n(q ? m(q) : []);
    }

    l.prototype.append = function (q) {
        this.$MercuryMessageList0 = this.$MercuryMessageList0.merge(n(m(q)));
        p('append', q);
    };
    l.prototype.prepend = function (q) {
        this.$MercuryMessageList0 = n(m(q)).merge(this.$MercuryMessageList0);
        p('prepend', q);
    };
    l.prototype.update = function (q) {
        var r = q.filter(function (s) {
            return this.contains(s);
        }.bind(this));
        if (r.length === 0)return;
        this.$MercuryMessageList0 = this.$MercuryMessageList0.merge(n(m(r)));
        p('update', q);
    };
    l.prototype.reorder = function (q) {
        this.$MercuryMessageList0 = n(q.map(function (r) {
            var s = this.$MercuryMessageList0.get(r.message_id);
            if (!s || s.timestamp != r.timestamp || s.is_cleared != r.is_cleared)return new g(r);
            return s;
        }.bind(this)));
        p('reorder', q);
    };
    l.prototype.hasReachedClearedMessages = function () {
        var q = this.messageAt(0);
        return !!(q && q.is_cleared);
    };
    l.prototype.messageAt = function (q) {
        var r = this.$MercuryMessageList0.keyAtIndex(q);
        return r ? this.$MercuryMessageList0.get(r) : undefined;
    };
    l.prototype.contains = function (q) {
        return this.$MercuryMessageList0.indexOfKey(o(q)) !== undefined;
    };
    l.prototype.toArray = function () {
        return this.$MercuryMessageList0.toArray();
    };
    l.prototype.toOrderedMap = function () {
        return this.$MercuryMessageList0;
    };
    function m(q) {
        return q.map(function (r) {
            return new g(r);
        });
    }

    function n(q) {
        return i.fromArray(q, o);
    }

    function o(q) {
        return q.message_id;
    }

    function p(event, q) {
        j(function () {
            k.debug(event, {messageIDs: q.map(function (r) {
                return r.message_id;
            })});
        }, 0);
    }

    e.exports = l;
}, null);
__d("MercuryMessageStore", ["MercuryAPIArgsSource", "LogHistory", "MercuryMessageList", "MercuryParticipants", "SubscriptionsHandler", "MercuryThreadlistConstants", "copyProperties", "merge", "mixInEventEmitter", "setTimeoutAcrossTransitions", "MercuryMessages", "MercuryThreads", "MercuryThreadInformer"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    'use strict';
    var q = b('MercuryMessages').get(), r = b('MercuryThreads').get(), s = b('MercuryThreadInformer').get(), t = h.getInstance('mercury_message_store');

    function u(w) {
        this.$MercuryMessageStore0 = w;
        this.$MercuryMessageStore1 = new i();
        this.$MercuryMessageStore2 = 1;
        this.$MercuryMessageStore3 = null;
        this.$MercuryMessageStore4 = 0;
        this.$MercuryMessageStore5 = new k();
        this.$MercuryMessageStore5.addSubscriptions(s.subscribe('messages-received', function (x, y) {
            return this.$MercuryMessageStore7(y);
        }.bind(this)), s.subscribe('messages-updated', function (x, y) {
            return y[this.$MercuryMessageStore0] && this.$MercuryMessageStore8(y[this.$MercuryMessageStore0]);
        }.bind(this)), s.subscribe('messages-reordered', function (x, y) {
            return y[this.$MercuryMessageStore0] && this.$MercuryMessageStore9();
        }.bind(this)));
        t.debug('constructed', {threadID: this.$MercuryMessageStore0});
        this.$MercuryMessageStorea();
    }

    u.prototype.setNewThreadID = function (w) {
        this.$MercuryMessageStoreb = w;
    };
    u.prototype.destroy = function () {
        this.$MercuryMessageStore5 && this.$MercuryMessageStore5.release();
        t.debug('destroyed', {threadID: this.$MercuryMessageStore0});
    };
    u.prototype.subscribe = function (w) {
        return this.addRetroactiveListener('updated', w);
    };
    u.prototype.fetchMoreMessages = function () {
        if (q.hasLoadedExactlyNMessages(this.$MercuryMessageStore0, this.$MercuryMessageStore4) && q.hasLoadedAllMessages(this.$MercuryMessageStore0))return false;
        if (r.isNewEmptyLocalThread(this.$MercuryMessageStore0))return false;
        if (this.$MercuryMessageStore1.hasReachedClearedMessages())return false;
        return this.$MercuryMessageStorea();
    };
    u.prototype.$MercuryMessageStorea = function () {
        var w = this.$MercuryMessageStore4 + l.RECENT_MESSAGES_LIMIT * this.$MercuryMessageStore2;
        t.debug('fetching', {threadID: this.$MercuryMessageStore0, limit: w});
        q.getThreadMessagesRange(this.$MercuryMessageStore0, 0, w, this.$MercuryMessageStorec.bind(this), null, g.MERCURY);
        if (this.$MercuryMessageStore2 < 10)this.$MercuryMessageStore2 += 1;
        if (q.hasLoadedNMessages(this.$MercuryMessageStore0, w)) {
            this.$MercuryMessageStore9();
            return false;
        }
        return true;
    };
    u.prototype.$MercuryMessageStorec = function (w) {
        if (w && w.length) {
            this.$MercuryMessageStore3 = w[0].timestamp;
            this.$MercuryMessageStore4 = w.length;
            t.debug('fetched', {threadID: this.$MercuryMessageStore0, earliestMessageTimestamp: this.$MercuryMessageStore3, count: this.$MercuryMessageStore4});
        }
    };
    u.prototype.$MercuryMessageStore7 = function (w) {
        var x = [], y = w[this.$MercuryMessageStore0];
        if (y && y.length)x = x.concat(y);
        if (this.$MercuryMessageStoreb) {
            var z = w[this.$MercuryMessageStoreb];
            if (z && z.length) {
                x = x.concat(z);
                this.$MercuryMessageStoreb = null;
            }
        }
        if (x.length) {
            this.$MercuryMessageStore1.append(x);
            this.$MercuryMessageStore4 += x.length;
            var aa = x.every(function (ba) {
                return ba.author != j.user;
            });
            this.$MercuryMessageStored(u.MESSAGES_RECEIVED, {allFromOthers: aa});
        }
    };
    u.prototype.$MercuryMessageStore8 = function (w) {
        this.$MercuryMessageStore1.update(q.getMessagesFromIDs(Object.keys(w)));
        this.$MercuryMessageStoree();
        this.$MercuryMessageStored(u.MESSAGES_CHANGED);
    };
    u.prototype.$MercuryMessageStore9 = function () {
        if (!this.$MercuryMessageStore3)return;
        this.$MercuryMessageStore1.reorder(q.getThreadMessagesSinceTimestamp(this.$MercuryMessageStore0, this.$MercuryMessageStore3));
        this.$MercuryMessageStoree();
        this.$MercuryMessageStored(u.MESSAGES_REORDERED);
    };
    u.prototype.$MercuryMessageStored = function (w, x) {
        var y = this.$MercuryMessageStore1.toArray();
        this.releaseHeldEventType('updated');
        this.emitAndHold('updated', n({messages: y, eventType: w}, x));
        v(this.$MercuryMessageStore0, w, y);
    };
    u.prototype.$MercuryMessageStoree = function () {
        var w = this.$MercuryMessageStore1.messageAt(0);
        if (w)this.$MercuryMessageStore3 = w.timestamp;
    };
    function v(w, x, y) {
        p(function () {
            t.debug('update:' + x, {threadID: w, messageIDs: y.map(function (z) {
                return z.message_id;
            })});
        }, 0);
    }

    m(u, {MESSAGES_FETCHED: 'fetched', MESSAGES_CHANGED: 'changed', MESSAGES_RECEIVED: 'received', MESSAGES_REORDERED: 'reordered'});
    o(u, {updated: true});
    e.exports = u;
}, null);
__d("ChatTabMessagesView", ["Animation", "Arbiter", "ArbiterMixin", "BanzaiLogger", "ChatConfig", "ChatConversation.react", "ChatTypingIndicators.react", "CSS", "DOM", "Event", "MercuryLastMessageIndicator.react", "LiveTimer", "MercuryTypingIndicator", "MercuryMessageStore", "MercuryParticipants", "React", "ServerTime", "StickerActions", "StickerState", "StickerStoreController", "Style", "SubscriptionsHandler", "UserAgent_DEPRECATED", "arrayContains", "copyProperties", "getElementPosition", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga) {
    'use strict';
    var ha = 70, ia = null, ja = 20;

    function ka(ma) {
        if (ia === null) {
            var na = ma.childNodes[0];
            aa.set(ma, 'overflow', 'scroll');
            ia = na.clientWidth - ha;
            aa.set(ma, 'overflow', '');
        }
        return ia;
    }

    function la(ma, na, oa, pa, qa, ra, sa, ta) {
        this.loadingIcon = qa;
        this.threadID = ma;
        this.sheetController = na;
        this.scrollContainer = oa;
        this.conversationElem = pa;
        this.tabView = ta;
        r.restart(w.get() / 1000);
        this._loadingMoreMessages = false;
        function ua() {
            la.inform('interaction-with-tab', ma);
        }

        this._subscriptions = new ba();
        this._subscriptions.addSubscriptions(h.subscribe('overflow-applied-to-body', this.scrollToBottom.bind(this)), p.listen(this.scrollContainer, 'mousedown', ua));
        if (ca.firefox()) {
            var va = ('WheelEvent' in window) ? 'wheel' : 'DOMMouseScroll';
            this.scrollContainer.addEventListener(va, ua, false);
        } else this._subscriptions.addSubscriptions(p.listen(this.scrollContainer, 'mousewheel', ua));
        this._subscriptions.addSubscriptions(p.listen(this.scrollContainer, 'scroll', ga(this.scrolling, 50, this)));
        if (k.get('chat_react')) {
            var wa;
            v.renderComponent(v.createElement(m, {threadID: this.threadID, indicatorsWillShow: function () {
                return wa = this.isScrolledToBottom();
            }.bind(this), indicatorsDidShow: function () {
                return wa && this.scrollToBottom(true);
            }.bind(this)}), sa);
        } else this.typingIndicator = new s(this.threadID, sa, this);
        var xa;
        this.lastMessageIndicatorNode = ra;
        this.lastMessageIndicator = v.renderComponent(v.createElement(q, {threadID: this.threadID, hideTyping: true, indicatorWillShow: function () {
            return xa = this.isScrolledToBottom();
        }.bind(this), indicatorDidShow: function () {
            return xa && this.scrollToBottom(true);
        }.bind(this)}), this.lastMessageIndicatorNode);
        this.initializeConversation();
    }

    ea(la, i);
    ea(la.prototype, {initializeConversation: function () {
        this._store = new t(this.threadID);
        this._conversation = v.renderComponent(v.createElement(l, {maxBubbleWidth: ka(this.scrollContainer), messages: [], onImageLoad: function (ma) {
            var na = this.scrollContainer, oa = na.scrollTop + na.clientHeight;
            if (oa + ma.offsetHeight >= na.scrollHeight)this.scrollToBottom();
        }.bind(this), onStickerClick: this._onStickerClick.bind(this), onCallLinkClick: function (ma, na, oa) {
            la.inform('video-call-clicked', {userID: ma, threadID: na, clickSource: oa});
        }}), this.conversationElem);
        this._subscriptions.addSubscriptions(this._store.subscribe(function (ma) {
            if (ma.eventType == t.MESSAGES_RECEIVED && ma.allFromOthers && !this.isScrolledToBottom()) {
                this.sheetController.openNewMessagesSheet();
                this._newMessagesSheetOpened = true;
            }
            if (ma.eventType == t.MESSAGES_REORDERED) {
                this._loadingMoreMessages = false;
                n.hide(this.loadingIcon);
            }
            var na = this.isScrolledToBottom(), oa = this._getLoadingHeight(), pa = this.scrollContainer.scrollHeight, qa = this.scrollContainer.scrollTop, ra = ma.messages;
            this._conversation.setProps({messages: ra}, function () {
                if (na || this._shouldScrollToBottom) {
                    this.scrollToBottom();
                    this.setShouldScrollToBottom(false);
                } else if (ma.eventType == t.MESSAGES_REORDERED)this.scrollToPosition(this.scrollContainer.scrollHeight - pa - oa + qa);
            }.bind(this));
            this.lastMessageIndicator.setProps({lastMessage: ra.length > 0 ? ra[ra.length - 1] : null});
            if (ma.eventType == t.MESSAGES_RECEIVED && this._shouldShowStickerReplyNUX(ra) && this.tabView && this.tabView.isFocused())this.tabView.showStickerReplyNUX();
        }.bind(this)));
    }, setShouldScrollToBottom: function (ma) {
        this._shouldScrollToBottom = ma;
    }, scrolling: function () {
        this._checkToAnimateSticker();
        if (this.isScrolledNearTop() && !this._loadingMoreMessages && !this.isScrolledToBottom() && !this.tabView._isDragDropActive)if (this._store.fetchMoreMessages()) {
            n.show(this.loadingIcon);
            this._loadingMoreMessages = true;
        }
        if (!this._newMessagesSheetOpened)return;
        if (this.isScrolledToBottom()) {
            this.sheetController.closeNewMessagesSheet();
            this._newMessagesSheetOpened = false;
        }
    }, getScrollTop: function () {
        return this.scrollContainer && this.scrollContainer.scrollTop;
    }, destroy: function () {
        o.scry(this.conversationElem, '.stickerContainer').forEach(function (ma) {
            return v.unmountComponentAtNode(ma);
        });
        v.unmountComponentAtNode(this.conversationElem);
        this._subscriptions && this._subscriptions.release();
        v.unmountComponentAtNode(this.lastMessageIndicatorNode);
        delete this.lastMessageIndicator;
        this._store && this._store.destroy();
        this.destroyed = true;
    }, _getLoadingHeight: function () {
        return this.loadingHeight || this.loadingIcon.clientHeight;
    }, _shouldShowStickerReplyNUX: function (ma) {
        if (!y.shouldShowStickerReplyNUX() || !ma.length)return false;
        var na = ma[ma.length - 1];
        if (na.author === u.user)return false;
        if (na.has_attachment)return na.attachments.some(function (oa) {
            return oa.attach_type === 'sticker';
        });
        return false;
    }, isScrolledToBottom: function (ma) {
        var na = this.scrollContainer;
        ma = ma || ja;
        return na.scrollTop + na.clientHeight >= na.scrollHeight - ma;
    }, isScrolledNearTop: function () {
        return this.scrollContainer.scrollTop < this.scrollContainer.clientHeight;
    }, scrollToBottom: function (ma) {
        this.scrollToPosition(this.scrollContainer.scrollHeight, ma);
    }, scrollToPosition: function (ma, na) {
        this._scrollTopAnimation && this._scrollTopAnimation.stop();
        if (na === true) {
            this._scrollTopAnimation = (new g(this.scrollContainer)).to('scrollTop', ma).ease(g.ease.end).duration(400).go();
        } else this.scrollContainer.scrollTop = ma;
    }, _onStickerClick: function (ma, na) {
        if (!ma)return;
        j.log('StickersLoggerConfig', {event: 'click_sticker', packid: ma, stickerid: na});
        var oa = this.tabView;
        y.onTrayDataReady(function () {
            if (da(y.getPackIDsInTray(), ma)) {
                var pa = y.getPack(ma);
                if (pa && pa.isPromoted)x.addPack(ma);
                oa.setStickersFlyoutPackID(ma);
            } else z.showStore(ma);
        });
    }, _checkToAnimateSticker: function () {
        var ma = fa(this.scrollContainer);
        h.inform('chatScrolled/' + this.threadID, {scrollTop: this.scrollContainer.scrollTop, top: ma.y, viewHeight: ma.height});
    }, setNewThreadID: function (ma) {
        this._store.setNewThreadID(ma);
    }});
    e.exports = la;
}, null);
__d("MercuryTypeahead", ["Event", "ArbiterMixin", "DOM", "DOMDimensions", "Input", "Keys", "MercuryTypeaheadTemplates", "Tokenizer", "Typeahead", "TypeaheadCore", "copyProperties", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = function (t, u) {
        this._domElement = null;
        this._typeahead = null;
        this._tokenizer = null;
        this._placeholder = '';
        this._exclusions = [];
        this._viewNodeOrID = null;
        this._viewOptions = {renderer: 'compact', autoSelect: true};
        this._tokenizerBehaviors = [];
        this._heightPrev = null;
        this._dataSource = t;
        this._view = u;
    };
    q(s.prototype, h);
    q(s.prototype, {setPlaceholder: function (t) {
        this._placeholder = t;
        return this;
    }, setExcludedParticipantsFromThreadMeta: function (t) {
        if (!t)return;
        if (!t.former_participants) {
            this.setExcludedParticipants(t.participants);
            return;
        }
        var u = t.former_participants.filter(function (v) {
            return v.is_friend === false;
        }).map(function (v) {
            return v.id;
        });
        this.setExcludedParticipants(u.concat(t.participants));
    }, setExcludedParticipants: function (t) {
        this._exclusions = [];
        t.forEach(function (u) {
            var v = u.indexOf(':');
            if (u.substr(0, v) == 'fbid')this._exclusions.push(u.substr(v + 1));
        }.bind(this));
        return this;
    }, setViewNodeID: function (t) {
        this._viewNodeOrID = t;
    }, setViewNode: function (t) {
        this._viewNodeOrID = t;
    }, setFullWidthView: function (t) {
        var u = i.create('div', {className: "_4ck uiTypeaheadView"});
        i.setContent(t, u);
        this.setViewNode(u);
    }, setViewOption: function (t, u) {
        this._viewOptions[t] = u;
    }, addTokenizerBehavior: function (t) {
        this._tokenizerBehaviors.push(t);
    }, build: function (t) {
        if (this._domElement)return;
        var u = m[':fb:mercury:tokenizer'].build(), v = m[':fb:mercury:typeahead'].build();
        this._domElement = u.getRoot();
        i.appendContent(this._domElement, v.getRoot());
        var w = v.getNode('textfield');
        k.setPlaceholder(w, this._placeholder);
        w.setAttribute('data-placeholder', this._placeholder);
        this._input = w;
        var x = {node_id: this._viewNodeOrID, ctor: this._view, options: this._viewOptions}, y = {ctor: p, options: {setValueOnSelect: true}};
        this._typeahead = new o(this._dataSource, x, y, v.getRoot());
        this._typeahead.init();
        var z = {inline: true, behaviors: this._tokenizerBehaviors};
        this._tokenizer = new n(this._domElement, this._typeahead);
        this._tokenizer.init(u.getNode('tokenarea'), 'participants', [], z);
        this._tokenizer.subscribe(['addToken', 'removeToken', 'removeAllTokens'], this._tokensChanged.bind(this));
        this._tokenizer.subscribe('resize', function () {
            this.inform('resize');
        }.bind(this));
        g.listen(w, 'focus', function () {
            this._resetDataSource();
            this._typeahead.init();
        }.bind(this));
        g.listen(this._domElement, 'click', this.focus.bind(this));
        g.listen(w, 'keydown', this.keydown.bind(this));
        this._heightPrev = j.getElementDimensions(this._domElement).height;
    }, getElement: function () {
        return this._domElement;
    }, getSelectedParticipantIDs: function () {
        var t = [];
        if (this._tokenizer)(this._tokenizer.getTokenValues() || []).forEach(function (u) {
            t.push('fbid:' + u);
        });
        return t;
    }, getTokens: function () {
        var t = [];
        if (this._tokenizer)t = this._tokenizer.getTokens();
        return t;
    }, getTokenizer: function () {
        return this._tokenizer;
    }, keydown: function (event) {
        if (this._tokenizer.inline && event.keyCode == l.ESC) {
            if (k.isEmpty(this._input)) {
                var t = this._tokenizer.getLastToken();
                if (t && t.isRemovable())this._tokenizer.removeToken(t);
            } else this._typeahead.getCore().reset();
            return false;
        }
        if (k.isEmpty(this._input) && this._tokenizer.inline && event.keyCode === l.RETURN) {
            event.preventDefault();
            return this.inform('tokens-return');
        }
    }, reset: function () {
        this._tokenizer && this._tokenizer.removeAllTokens();
        this._typeahead && this._typeahead.getCore().reset();
    }, focus: function () {
        this._tokenizer && this._tokenizer.focusInput();
    }, getTypeahead: function () {
        return this._typeahead;
    }, _resetDataSource: function () {
        this._dataSource.setExclusions(this._exclusions);
    }, _tokensChanged: function () {
        this.inform('tokens-changed');
    }});
    e.exports = s;
}, null);
__d("ChatAddFriendsTabSheetRawRenderer", ["ContextualTypeaheadView", "DOM", "Event", "MercuryDataSourceWrapper", "MercuryTypeahead", "ChatTabTemplates", "fbt", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = {render: function (p, q, r, s, t, u) {
        var v = u ? l[':fb:mercury:chat:tab-sheet:add-friends-empty-tab'].build() : l[':fb:mercury:chat:tab-sheet:add-friends'].build(), w = u ? j.source : j.add_people_source, x = new k(w, g);
        x.setExcludedParticipantsFromThreadMeta(s);
        if (!u)x.setPlaceholder("\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0434\u0440\u0443\u0433\u0430 \u0432 \u044d\u0442\u0443 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0443");
        x.build();
        h.replace(v.getNode('participantsTypeahead'), x.getElement());
        h.setContent(r, v.getRoot());
        x.getTokenizer().adjustWidth();
        var y = v.getNode('participantsTypeahead').getAttribute('data-labelid'), z = h.scry(x.getElement(), 'input[type="text"]')[0];
        if (z)if (y) {
            z.setAttribute('aria-labelledby', y);
        } else z.setAttribute('aria-label', "\u041a\u043e\u043c\u0443");
        x.focus();
        if (!u) {
            var aa = function () {
                var ba = x.getSelectedParticipantIDs();
                if (ba.length)t(ba);
                q.close(p);
            };
            i.listen(v.getNode('doneButton'), 'click', aa);
            x.subscribe('tokens-return', function () {
                if (x.getTokens().length)aa();
            });
        }
        return x;
    }};
    e.exports = o;
}, null);
__d("MultiChatController", ["AsyncSignal", "ChatOpenTab", "copyProperties", "Form", "MercuryMessages", "MercuryServerRequests", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = b('MercuryMessages').get(), l = b('MercuryServerRequests').get(), m = b('MercuryThreads').get();

    function n() {
    }

    i(n, {subscribe: function (o, p) {
        o.subscribe('confirm', function () {
            this.createGroupThreadFromChooserDialog(o, p);
        }.bind(this));
    }, createGroupThreadFromChooserDialog: function (o, p) {
        var q = j.serialize(o.getRoot()), r = JSON.parse(q.profileChooserItems), s = [];
        for (var t in r)if (r[t])s.push(t);
        var u = n.createThreadForFBIDs(s);
        l.subscribe('update-thread-ids', function (v, w) {
            for (var x in w)if (w[x] == u)new g('/ajax/groups/chat/log', {group_id: p, message_id: x}).send();
        });
        o.hide();
    }, createThreadForTokens: function (o) {
        if (!o.length)return;
        var p;
        if (o.length == 1) {
            p = 'user:' + o[0].split(':')[1];
        } else p = 'root:' + k.generateNewClientMessageID(Date.now());
        m.createNewLocalThread(p, o);
        h.openThread(p, 'MultiChatController');
    }, createThreadForFBIDs: function (o) {
        var p = [];
        for (var q = 0; q < o.length; q++)p.push("fbid:" + o[q]);
        return n.createThreadForTokens(p);
    }});
    e.exports = n;
}, null);
__d("ChatAddFriendsTabSheet", ["ArbiterMixin", "ChatAddFriendsTabSheetRawRenderer", "ChatOpenTab", "MercuryLogMessageType", "MercurySourceType", "MultiChatController", "Style", "copyProperties", "MercuryMessages", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = b('MercuryMessages').get(), p = b('MercuryThreads').get();

    function q(t, u, v) {
        this._threadID = t;
        this._rootElement = u;
        this._sheetView = v;
        this._typeahead = null;
    }

    n(q.prototype, g, {render: function () {
        p.getThreadMeta(this._threadID, function (t) {
            var u = t.is_canonical_user ? r : s;
            this._typeahead = h.render(this, this._sheetView, this._rootElement, t, u.bind(null, t), p.isNewEmptyLocalThread(this._threadID));
            this._typeahead.subscribe('tokens-changed', function () {
                this.inform('chat/tokens-changed', {token_count: this._typeahead.getTokens().length});
            }.bind(this));
            this._typeahead.subscribe('resize', function () {
                this._sheetView.resize();
            }.bind(this));
        }.bind(this));
    }, getParticipants: function () {
        if (!this._typeahead)return null;
        return this._typeahead.getSelectedParticipantIDs();
    }, isPermanent: function () {
        return true;
    }, isSheetWithInput: function () {
        return true;
    }, getType: function () {
        return 'add_friends_type';
    }, open: function () {
        this._sheetView.open(this);
    }, close: function () {
        this._sheetView.close(this);
    }, getHeight: function () {
        return m.get(this._rootElement, 'height');
    }});
    function r(t, u) {
        var v = t.participants;
        l.createThreadForTokens(v.concat(u));
    }

    function s(t, u) {
        var v = t.thread_id;
        if (p.isEmptyLocalThread(v)) {
            p.addParticipantsToThreadLocally(v, u);
        } else o.sendMessage(o.constructLogMessageObject(k.CHAT_WEB, v, j.SUBSCRIBE, {added_participants: u}));
        i.openThread(v, 'ChatAddFriendsTabSheet');
    }

    e.exports = q;
}, null);
__d("ChatNameConversationTabSheetRawRenderer", ["DOM", "Event", "Input", "Keys", "ChatTabTemplates", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    var m = {render: function (n, o, p, q, r, s) {
        var t = k[':fb:mercury:chat:tab-sheet:name-conversation'].build(), u = t.getNode('nameInput'), v = t.getNode('doneButton'), w = "\u0413\u043e\u0442\u043e\u0432\u043e", x = "\u0421\u043a\u0440\u044b\u0442\u044c", y = q.name;
        if (y) {
            i.setValue(u, y);
        } else g.setContent(v, x);
        var z = function () {
            var aa = i.getValue(u);
            if (aa)r(aa);
            s();
            o.close(n);
        };
        h.listen(u, 'input', function () {
            g.setContent(v, i.getValue(u).length === 0 ? x : w);
        });
        h.listen(v, 'click', z);
        h.listen(u, 'keyup', function (aa) {
            if (aa.keyCode === j.RETURN) {
                z();
                return false;
            }
        });
        g.setContent(p, t.getRoot());
        !n.isAutomatic() && u.focus();
    }};
    e.exports = m;
}, null);
__d("ChatNameConversationTabSheet", ["AsyncRequest", "ChatNameConversationTabSheetRawRenderer", "MercuryAPIArgsSource", "MercuryLogMessageType", "MercurySourceType", "MercuryMessages", "MercuryServerRequests", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = b('MercuryMessages').get(), m = b('MercuryServerRequests').get(), n = b('MercuryThreads').get(), o = '/ajax/chat/multichat/name_conversation/dismiss.php', p = {};

    function q(r, s, t) {
        "use strict";
        this.$ChatNameConversationTabSheet0 = r;
        this.$ChatNameConversationTabSheet1 = s;
        this.$ChatNameConversationTabSheet2 = t;
        this.$ChatNameConversationTabSheet3 = false;
    }

    q.prototype.render = function () {
        "use strict";
        n.getThreadMeta(this.$ChatNameConversationTabSheet0, function (r) {
            h.render(this, this.$ChatNameConversationTabSheet2, this.$ChatNameConversationTabSheet1, r, this.$ChatNameConversationTabSheet4.bind(null, r), this.$ChatNameConversationTabSheet5.bind(this, r));
            this.$ChatNameConversationTabSheet2.resize();
        }.bind(this));
    };
    q.prototype.isPermanent = function () {
        "use strict";
        return true;
    };
    q.prototype.isSheetWithInput = function () {
        "use strict";
        return true;
    };
    q.prototype.getType = function () {
        "use strict";
        return 'name_conversation_type';
    };
    q.prototype.open = function (r) {
        "use strict";
        this.$ChatNameConversationTabSheet3 = r;
        if (!(this.$ChatNameConversationTabSheet3 && this.$ChatNameConversationTabSheet6()))this.$ChatNameConversationTabSheet2.open(this);
    };
    q.prototype.close = function () {
        "use strict";
        this.$ChatNameConversationTabSheet2.close(this);
    };
    q.prototype.isAutomatic = function () {
        "use strict";
        return this.$ChatNameConversationTabSheet3;
    };
    q.prototype.$ChatNameConversationTabSheet6 = function () {
        "use strict";
        return !!p[this.$ChatNameConversationTabSheet0];
    };
    q.prototype.$ChatNameConversationTabSheet7 = function () {
        "use strict";
        p[this.$ChatNameConversationTabSheet0] = true;
    };
    q.prototype.$ChatNameConversationTabSheet5 = function (r) {
        "use strict";
        if (!r.name_conversation_sheet_dismissed || !this.$ChatNameConversationTabSheet6()) {
            this.$ChatNameConversationTabSheet7();
            m.getServerThreadID(r.thread_id, function (s) {
                new g(o).setData({thread_id: s}).send();
            });
        }
    };
    q.prototype.$ChatNameConversationTabSheet4 = function (r, s) {
        "use strict";
        var t = r.name;
        if ((s || t) && (s != t))l.sendMessage(l.constructLogMessageObject(k.CHAT_WEB, r.thread_id, j.THREAD_NAME, {name: s}), null, i.CHAT);
    };
    e.exports = q;
}, null);
__d("ChatNewMessagesTabSheet", ["Event", "ArbiterMixin", "DOM", "ChatTabTemplates", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(m, n, o) {
        this._threadID = m;
        this._rootElement = n;
        this._sheetView = o;
    }

    k(l.prototype, h, {render: function () {
        var m = j[':fb:mercury:chat:tab-sheet:clickable-message-icon-sheet'].build();
        i.setContent(m.getNode('text'), i.tx._("\u041f\u0440\u043e\u043a\u0440\u0443\u0442\u0438\u0442\u0435 \u0432\u043d\u0438\u0437, \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u043d\u043e\u0432\u044b\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f."));
        i.setContent(this._rootElement, m.getRoot());
        g.listen(m.getRoot(), 'click', function () {
            this.inform('clicked', this._threadID);
        }.bind(this));
    }, isPermanent: function () {
        return true;
    }, isSheetWithInput: function () {
        return true;
    }, getType: function () {
        return 'new_messages_type';
    }, open: function () {
        this._sheetView.open(this);
    }, close: function () {
        this._sheetView.close(this);
    }});
    e.exports = l;
}, null);
__d("ChatNoRecipientsTabSheet", ["DOM", "fbt", "MercuryParticipants", "ChatTabTemplates", "copyProperties", "MercuryThreadInformer", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = b('MercuryThreadInformer').get(), m = b('MercuryThreads').get();

    function n(o, p, q) {
        this._threadID = o;
        this._rootElement = p;
        this._sheetView = q;
        l.subscribe('threads-updated', this._handleThreadsUpdated.bind(this));
    }

    k(n.prototype, {render: function () {
        var o = j[':fb:mercury:chat:tab-sheet:message-icon-sheet'].build();
        g.setContent(o.getNode('text'), "\u0412\u0441\u0435 \u043f\u043e\u043a\u0438\u043d\u0443\u043b\u0438 \u0447\u0430\u0442.");
        g.setContent(this._rootElement, o.getRoot());
    }, isPermanent: function () {
        return true;
    }, getType: function () {
        return 'no_recipients_type';
    }, _handleThreadsUpdated: function () {
        m.getThreadMeta(this._threadID, function (o) {
            var p = i.user, q = o.participants.filter(function (r) {
                return r != p;
            });
            if (q.length < 1 && !m.isNewEmptyLocalThread(this._threadID)) {
                this._sheetView.open(this);
            } else this._sheetView.close(this);
        }.bind(this));
    }});
    e.exports = n;
}, null);
__d("ChatOfflineTabSheet", ["ChatPrivacyActionController", "ChatVisibility", "CSS", "DOM", "Event", "JSLogger", "MercuryParticipants", "ChatTabTemplates", "copyProperties", "cx", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = b('MercuryThreads').get();

    function r(s, t, u) {
        this._rootElement = t;
        this._sheetView = u;
        this._logger = l.create('blackbird');
        this._canonicalUser = q.getCanonicalUserInThread(s);
        if (this._canonicalUser)this._privacyActionController = new g(this._canonicalUser, this._handlePrivacyChange.bind(this));
    }

    o(r.prototype, {render: function () {
        if (!this._canonicalUser) {
            this._logger.error('offline_sheet_open_with_non_friend');
            return;
        }
        var s = n[':fb:mercury:chat:tab-sheet:message-icon-sheet'].build(), t = 'fbid:' + this._canonicalUser;
        m.get(t, function (u) {
            var v = 'fbChatGoOnlineLink', w = j.tx._("\u0432\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0427\u0430\u0442"), x = j.create('a', {href: '#', className: v}, w), y = j.tx._("\u041e\u0431\u0449\u0430\u0439\u0442\u0435\u0441\u044c \u0432 \u0427\u0430\u0442\u0435 \u0441  {name} \u0438 \u0434\u0440\u0443\u0433\u0438\u043c\u0438 \u0434\u0440\u0443\u0437\u044c\u044f\u043c\u0438: {link}.", {name: u.short_name, link: x});
            j.setContent(s.getNode('text'), y);
            i.addClass(s.getRoot(), "_1sk1");
            j.setContent(this._rootElement, s.getRoot());
            k.listen(this._rootElement, 'click', function (event) {
                if (i.hasClass(event.getTarget(), v)) {
                    if (h.isOnline())this._logger.error('tab_sheet_already_online');
                    this._privacyActionController.togglePrivacy();
                    this._logger.log('tab_sheet_go_online', {tab_id: this._canonicalUser});
                    return false;
                }
            }.bind(this));
            this._sheetView.resize();
        }.bind(this));
    }, _handlePrivacyChange: function (s) {
        if (!this._canonicalUser)this._logger.error('user_blocked_sheet_privacy_changed_non_friend');
        switch (s) {
            case g.OFFLINE:
                this._sheetView.open(this);
                break;
            case g.NORMAL:
            case g.BLOCKED:
                this._sheetView.close(this);
                break;
        }
    }, isPermanent: function () {
        return true;
    }, getType: function () {
        return 'offline_type';
    }, destroy: function () {
        this._privacyActionController && this._privacyActionController.destroy();
    }});
    e.exports = r;
}, null);
__d("ChatUploadWarningTabSheet", ["DOM", "ChatTabTemplates", "copyProperties"], function (a, b, c, d, e, f, g, h, i) {
    function j(k, l, m) {
        this._threadID = k;
        this._rootElement = l;
        this._sheetView = m;
    }

    i(j.prototype, {render: function () {
        var k = h[':fb:mercury:chat:tab-sheet:message-icon-sheet'].build();
        g.setContent(k.getNode('text'), g.tx._("\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043c \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435, \u0434\u043e\u0436\u0434\u0438\u0442\u0435\u0441\u044c \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438."));
        g.setContent(this._rootElement, k.getRoot());
    }, isPermanent: function () {
        return false;
    }, getType: function () {
        return 'upload_warning_type';
    }, open: function () {
        this._sheetView.open(this);
    }, close: function () {
        this._sheetView.close(this);
    }});
    e.exports = j;
}, null);
__d("MercuryReadOnlyReason", ["React", "fbt"], function (a, b, c, d, e, f, g, h) {
    var i = {getReason: function (j) {
        if (j.has_email_participant) {
            return (h._("\u0418\u0437\u0432\u0438\u043d\u0438\u0442\u0435, \u043d\u043e \u044d\u0442\u0430 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0430 \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0439, \u0442\u0430\u043a \u043a\u0430\u043a \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u043d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043d\u0430 \u044d\u043b. \u0430\u0434\u0440\u0435\u0441\u0430. \u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f, \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u044b\u0435 \u043d\u0430 \u044d\u043b. \u0430\u0434\u0440\u0435\u0441\u0430 facebook.com, \u0431\u0443\u0434\u0443\u0442 \u043f\u0435\u0440\u0435\u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u044b \u043d\u0430 \u0432\u0430\u0448 \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0439 \u044d\u043b. \u0430\u0434\u0440\u0435\u0441, \u0438 \u0432\u044b \u0441\u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0443 \u043f\u043e \u044d\u043b. \u043f\u043e\u0447\u0442\u0435. {Learn more}.", [h.param("Learn more", g.createElement(g.DOM.a, {href: "/help/224049364288051"}, "\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435"))]));
        } else return ("\u0412\u044b \u043d\u0435 \u043c\u043e\u0436\u0435\u0442\u0435 \u043e\u0442\u0432\u0435\u0447\u0430\u0442\u044c \u0432 \u0434\u0430\u043d\u043d\u043e\u0439 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0435.");
    }};
    e.exports = i;
}, null);
__d("ChatReadOnlyTabSheet", ["React", "MercuryReadOnlyReason", "cx", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i) {
    var j = b('MercuryThreads').get();

    function k(l, m, n) {
        "use strict";
        this.$ChatReadOnlyTabSheet0 = l;
        this.$ChatReadOnlyTabSheet1 = m;
        this.$ChatReadOnlyTabSheet2 = n;
    }

    k.prototype.render = function () {
        "use strict";
        var l = h.getReason(j.getThreadMetaNow(this.$ChatReadOnlyTabSheet0));
        g.renderComponent(g.createElement(g.DOM.div, {className: "_87-"}, l), this.$ChatReadOnlyTabSheet1);
    };
    k.prototype.isPermanent = function () {
        "use strict";
        return false;
    };
    k.prototype.getType = function () {
        "use strict";
        return 'chat-thread-is-read-only';
    };
    k.prototype.open = function () {
        "use strict";
        this.$ChatReadOnlyTabSheet2.open(this);
    };
    k.prototype.close = function () {
        "use strict";
        this.$ChatReadOnlyTabSheet2.open(this);
    };
    e.exports = k;
}, null);
__d("ChatThreadIsMutedTabSheet", ["Event", "ArbiterMixin", "DOM", "ChatTabTemplates", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(m, n, o) {
        this._threadID = m;
        this._rootElement = n;
        this._sheetView = o;
    }

    k(l.prototype, h, {render: function () {
        var m = j[':fb:mercury:chat:tab-sheet:message-mute-sheet'].build();
        i.setContent(m.getNode('text'), i.tx._("\u041f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0430 \u043e\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u0430. \u0411\u043e\u043b\u044c\u0448\u0435 \u043d\u0435 \u0431\u0443\u0434\u0443\u0442 \u043f\u043e\u044f\u0432\u043b\u044f\u0442\u044c\u0441\u044f \u0435\u0435 \u0432\u043a\u043b\u0430\u0434\u043a\u0438 \u0438 \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f."));
        i.setContent(this._rootElement, m.getRoot());
        g.listen(m.getNode('unmuteButton'), 'click', function () {
            this.inform('clicked', this._threadID);
        }.bind(this));
    }, isPermanent: function () {
        return false;
    }, getType: function () {
        return 'chat-thread-is-muted';
    }, open: function () {
        this._sheetView.open(this);
    }, close: function () {
        this._sheetView.close(this);
    }});
    e.exports = l;
}, null);
__d("ChatUserBlockedTabSheet", ["CSS", "ChatPrivacyActionController", "DOM", "Event", "GenderConst", "JSLogger", "MercuryParticipants", "ChatTabTemplates", "copyProperties", "cx", "tx", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = b('MercuryThreads').get();

    function s(t, u, v) {
        this._rootElement = u;
        this._sheetView = v;
        this._logger = l.create('blackbird');
        this._canonicalUser = r.getCanonicalUserInThread(t);
        if (this._canonicalUser)this._privacyActionController = new h(this._canonicalUser, this._handlePrivacyChange.bind(this));
    }

    o(s.prototype, {render: function () {
        if (!this._canonicalUser) {
            this._logger.error('user_blocked_sheet_open_with_non_friend');
            return;
        }
        var t = n[':fb:mercury:chat:tab-sheet:user-blocked'].build(), u = 'fbid:' + this._canonicalUser;
        m.get(u, function (v) {
            var w = null;
            switch (v.gender) {
                case k.FEMALE_SINGULAR:
                case k.FEMALE_SINGULAR_GUESS:
                    w = q._("\u0412\u044b \u043e\u0442\u043a\u043b\u044e\u0447\u0438\u043b\u0438 \u0427\u0430\u0442 \u0434\u043b\u044f {name}, \u043d\u043e \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0435\u0439 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435.", {name: v.short_name});
                    break;
                case k.MALE_SINGULAR:
                case k.MALE_SINGULAR_GUESS:
                    w = q._("\u0412\u044b \u043e\u0442\u043a\u043b\u044e\u0447\u0438\u043b\u0438 \u0427\u0430\u0442 \u0434\u043b\u044f {name}, \u043d\u043e \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0435\u043c\u0443 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435.", {name: v.short_name});
                    break;
                default:
                    w = q._("\u0412\u044b \u043e\u0442\u043a\u043b\u044e\u0447\u0438\u043b\u0438 \u0427\u0430\u0442 \u0434\u043b\u044f {name}, \u043d\u043e \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0435\u043c\u0443\/\u0435\u0439 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435.", {name: v.short_name});
            }
            i.setContent(t.getNode('text'), w);
            var x = q._("\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0427\u0430\u0442 \u0441 {name}?", {name: v.short_name});
            i.setContent(t.getNode('actionLink'), x);
            g.addClass(t.getRoot(), "_1sk0");
            i.setContent(this._rootElement, t.getRoot());
            j.listen(t.getNode('actionLink'), 'click', this._privacyActionController.togglePrivacy.bind(this._privacyActionController));
            this._sheetView.resize();
        }.bind(this));
    }, _handlePrivacyChange: function (t) {
        if (!this._canonicalUser)this._logger.error('user_blocked_sheet_privacy_changed_non_friend');
        if (t == h.BLOCKED) {
            var u = 'fbid:' + this._canonicalUser;
            m.get(u, function (v) {
                if (v.is_friend) {
                    this._sheetView.open(this);
                } else this._sheetView.close(this);
            }.bind(this));
            return;
        }
        this._sheetView.close(this);
    }, isPermanent: function () {
        return true;
    }, getType: function () {
        return 'user_blocked_type';
    }, destroy: function () {
        this._privacyActionController && this._privacyActionController.destroy();
    }});
    e.exports = s;
}, null);
__d("MercurySheetPolicy", [], function (a, b, c, d, e, f) {
    var g = {canReplaceOpenSheet: function (h, i) {
        if (h.isSheetWithInput && h.isSheetWithInput())return i.getType() != h.getType() && i.isSheetWithInput && i.isSheetWithInput();
        if (h.getType() == i.getType())return false;
        if (h.isPermanent() && !i.isPermanent())return false;
        return true;
    }};
    e.exports = g;
}, null);
__d("MercurySheetView", ["Animation", "ArbiterMixin", "MercurySheetPolicy", "CSS", "DOM", "Style", "MercurySheetTemplates", "Vector", "copyProperties", "cx", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = 5000, s = function (t, u, v) {
        this._threadID = t;
        this._rootElement = u;
        this._tabMainElement = v;
        this._openSheet = null;
    };
    o(s.prototype, h, {destroy: function () {
        k.empty(this._rootElement);
    }, _openCommon: function (t, u) {
        if (this._openSheet && !i.canReplaceOpenSheet(this._openSheet, t)) {
            if (t.couldNotReplace)t.couldNotReplace();
            return;
        }
        this.clear(function () {
            this._openSheet = t;
            var v = m[':fb:mercury:tab-sheet:loading'].build().getRoot();
            k.setContent(this._rootElement, v);
            j.show(v);
            j.show(this._rootElement);
            t.render();
            if (u) {
                j.addClass(this._tabMainElement, 'sheetSlide');
                j.addClass(this._tabMainElement, "_1sk4");
                var w = n.getElementDimensions(this._rootElement).y;
                l.set(this._rootElement, 'bottom', w + 'px');
                this.resize();
                this._animation = new g(this._rootElement).to('bottom', 0).duration(150).ease(g.ease.both).ondone(function () {
                    j.removeClass(this._tabMainElement, 'sheetSlide');
                    j.removeClass(this._tabMainElement, "_1sk4");
                    this.resize();
                }.bind(this)).go();
            } else this.resize();
            if (!t.isPermanent()) {
                var x = r;
                if (t.getCloseTimeout)x = t.getCloseTimeout();
                var y = this.getAutoCloseCallback(t);
                this._sheetCloseHandler = q(this.close.bind(this, t, y), x);
                if (t.timeoutCanBeReset)t.setResetTimeoutCallback(this.resetTimeout.bind(this));
            }
        }.bind(this));
    }, getAutoCloseCallback: function (t) {
        if (!t.autoCloseCallback)return null;
        return t.autoCloseCallback.bind(t);
    }, resetTimeout: function (t, u) {
        clearTimeout(this._sheetCloseHandler);
        var v = this.getAutoCloseCallback(t);
        this._sheetCloseHandler = q(this.close.bind(this, t, v), u);
    }, set: function (t) {
        return this._openCommon(t, false);
    }, open: function (t) {
        return this._openCommon(t, true);
    }, close: function (t, u) {
        if (this._openSheet != t)return;
        if (!this._openSheet) {
            u && u();
            return;
        }
        if (this._animation)this._animation.stop();
        if (this._sheetCloseHandler) {
            clearTimeout(this._sheetCloseHandler);
            this._sheetCloseHandler = null;
        }
        j.addClass(this._tabMainElement, 'sheetSlide');
        j.addClass(this._tabMainElement, "_1sk4");
        var v = n.getElementDimensions(this._rootElement).y;
        this.resize();
        this._animation = new g(this._rootElement).to('bottom', v + 'px').duration(100).ease(g.ease.begin).ondone(function () {
            k.empty(this._rootElement);
            j.hide(this._rootElement);
            j.removeClass(this._tabMainElement, 'sheetSlide');
            j.removeClass(this._tabMainElement, "_1sk4");
            this._openSheet = null;
            this.resize();
            u && u();
        }.bind(this)).go();
    }, clear: function (t) {
        this.close(this._openSheet, t);
    }, resize: function () {
        this.inform('resize');
    }});
    e.exports = s;
}, null);
__d("ChatTabSheetController", ["ChatAddFriendsTabSheet", "ChatNameConversationTabSheet", "ChatNewMessagesTabSheet", "ChatNoRecipientsTabSheet", "ChatOfflineTabSheet", "ChatUploadWarningTabSheet", "ChatReadOnlyTabSheet", "ChatThreadIsMutedTabSheet", "ChatUserBlockedTabSheet", "copyProperties", "MercurySheetView", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = b('MercuryThreads').get(), s = function (t, u, v) {
        this._sheetView = new q(t, u, v);
        this._addFriendsTabSheet = new g(t, u, this._sheetView);
        this._nameConversationTabSheet = new h(t, u, this._sheetView);
        this._userBlockedTabSheet = new o(t, u, this._sheetView);
        this._offlineTabSheet = new k(t, u, this._sheetView);
        this._newMessagesTabSheet = new i(t, u, this._sheetView);
        this._uploadWarningTabSheet = new l(t, u, this._sheetView);
        this._threadIsMutedTabSheet = new n(t, u, this._sheetView);
        this._readOnlyTabSheet = new m(t, u, this._sheetView);
        if (!r.getCanonicalUserInThread(t))this._noRecipientsTabSheet = new j(t, u, this._sheetView);
    };
    p(s.prototype, {openAddFriendsSheet: function () {
        this._addFriendsTabSheet.open();
    }, getAddFriendsTabSheet: function () {
        return this._addFriendsTabSheet;
    }, getAddFriendsParticipants: function () {
        var t = this._addFriendsTabSheet.getParticipants();
        this._addFriendsTabSheet.close();
        return t;
    }, openNameConversationSheet: function (t) {
        this._nameConversationTabSheet.open(t);
    }, openReadOnlySheet: function () {
        this._readOnlyTabSheet.open();
    }, openNewMessagesSheet: function () {
        this._newMessagesTabSheet.open();
    }, openUploadWarningTabSheet: function () {
        this._uploadWarningTabSheet.open();
    }, openThreadIsMutedTabSheet: function () {
        this._threadIsMutedTabSheet.open();
    }, closeAutomaticNameConversationSheet: function () {
        if (this._nameConversationTabSheet.isAutomatic())this._nameConversationTabSheet.close();
    }, closeThreadIsMutedTabSheet: function () {
        this._threadIsMutedTabSheet.close();
    }, closeNewMessagesSheet: function () {
        this._newMessagesTabSheet.close();
    }, closeUploadWarningTabSheet: function () {
        this._uploadWarningTabSheet.close();
    }, onClickNewMessagesSheet: function (t) {
        this._newMessageClickSub = this._newMessagesTabSheet.subscribe('clicked', t);
    }, onClickThreadIsMutedSheet: function (t) {
        this._threadIsMutedClickSub = this._threadIsMutedTabSheet.subscribe('clicked', t);
    }, onResize: function (t) {
        this._sheetView.subscribe('resize', t);
    }, onTokensChanged: function (t) {
        this._addFriendsTabSheet.subscribe('chat/tokens-changed', t);
    }, destroy: function () {
        this._sheetView && this._sheetView.destroy();
        this._offlineTabSheet && this._offlineTabSheet.destroy();
        this._userBlockedTabSheet && this._userBlockedTabSheet.destroy();
        this._newMessageClickSub && this._newMessageClickSub.unsubscribe();
        this._threadIsMutedClickSub && this._threadIsMutedClickSub.unsubscribe();
    }});
    e.exports = s;
}, null);
__d("EmoticonUtils", ["EmoticonsList", "Parent", "endsWith", "startsWith"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = 'emoticon_', l = g.symbols, m = {getEmoteFromTarget: function (n) {
        var o = h.byClass(n, 'emoticon');
        if (!o)return null;
        var p = null;
        o.className.split(' ').forEach(function (q) {
            if (j(q, k))p = q.substring(k.length);
        });
        return l[p] || null;
    }, insertEmoticon: function (n, o, p) {
        var q = o.substring(0, p.start), r = o.substring(p.end);
        if (p.start > 0 && !i(q, ' '))n = ' ' + n;
        if (!j(r, ' '))n += ' ';
        var s = q + n + r;
        p.start += n.length;
        p.end = p.start;
        return {result: s, start: p.start, end: p.end};
    }};
    e.exports = m;
}, null);
__d("SelectionPosition", ["Event", "InputSelection", "SubscriptionsHandler", "merge"], function (a, b, c, d, e, f, g, h, i, j) {
    function k(l) {
        "use strict";
        this.$SelectionPosition0 = l;
        this.$SelectionPosition1 = {start: 0, end: 0};
        this.$SelectionPosition2 = new i();
        this.$SelectionPosition3 = false;
        this.updatePos();
        this.enable();
    }

    k.prototype.getPos = function () {
        "use strict";
        return j(this.$SelectionPosition1);
    };
    k.prototype.setPos = function (l, m) {
        "use strict";
        this.$SelectionPosition1 = {start: l, end: m};
        this.restore();
    };
    k.prototype.updatePos = function () {
        "use strict";
        this.$SelectionPosition1 = h.get(this.$SelectionPosition0);
    };
    k.prototype.restore = function () {
        "use strict";
        h.set(this.$SelectionPosition0, this.$SelectionPosition1.start, this.$SelectionPosition1.end);
    };
    k.prototype.enable = function () {
        "use strict";
        if (!this.$SelectionPosition3) {
            this.$SelectionPosition2.addSubscriptions(g.listen(this.$SelectionPosition0, 'keyup', this.updatePos.bind(this)), g.listen(this.$SelectionPosition0, 'click', this.updatePos.bind(this)));
            this.$SelectionPosition3 = true;
        }
    };
    k.prototype.disable = function () {
        "use strict";
        if (this.$SelectionPosition3) {
            this.$SelectionPosition2.release();
            this.$SelectionPosition3 = false;
        }
    };
    e.exports = k;
}, null);
__d("StickerTrigger", ["StickerConfig", "StickerSearch", "StickerServerRequests"], function (a, b, c, d, e, f, g, h, i) {
    'use strict';
    var j = g.StickerTriggerThreshold, k = {findTriggerForInput: function (l, m) {
        h.prepareTagsData().then(function () {
            return this.findTagForInput(l, function (n, o) {
                return m(n, o);
            });
        }.bind(this));
    }, findTagForInput: function (l, m) {
        var n = this.findTriggeredWord(l);
        if (n) {
            i.getStickersForQuery(n, function (o) {
                return m(o.getPayload(), n);
            });
        } else m([], null);
    }, _getRegex: function () {
        var l = null;
        if (g.TriggerConfidence === 'emoji_only') {
            l = g.EmoticonRegex;
        } else if (g.TriggerConfidence === 'high')l = '^\\w+$';
        return new RegExp(l);
    }, findTriggeredWord: function (l) {
        var m = h.getTagsIndex();
        if (!m)return null;
        l = l.toLowerCase();
        var n = l.match(this._getRegex()), o = j, p = null;
        for (var q = 0; n !== null && q < n.length; q++)if (m[n[q]] && m[n[q]].sticker_count > o) {
            o = m[n[q]].sticker_count;
            p = n[q];
        }
        return p;
    }};
    e.exports = k;
}, null);
__d("StickersFlyoutTriggerSelector.react", ["BanzaiLogger", "React", "Sticker.react", "StickerTrigger", "StickerUtils", "XUIContextualDialog.react", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    'use strict';
    var n = 84, o = h.createClass({displayName: 'StickersFlyoutTriggerSelector', propTypes: {context: h.PropTypes.object.isRequired, input: h.PropTypes.string, onStickerSelect: h.PropTypes.func.isRequired, onTriggerChanged: h.PropTypes.func.isRequired}, getDefaultProps: function () {
        return {input: null};
    }, getInitialState: function () {
        return {stickers: [], triggeredWord: null};
    }, componentWillReceiveProps: function (p) {
        if (!p.input) {
            this._resetFlyout();
        } else if (p.input !== this.props.input)j.findTriggerForInput(p.input, this._onTriggerChanged);
    }, _resetFlyout: function () {
        this.setState(this.getInitialState());
    }, _onTriggerChanged: function (p, q) {
        if (this.props.input && this.props.input.indexOf(q) === -1) {
            this._resetFlyout();
            return;
        }
        if (q)g.log('StickersLoggerConfig', {event: 'sticker_trigger_activated', numsearchresults: p.length, triggeredword: q, triggerused: false});
        this.props.onTriggerChanged(q);
        this.setState({stickers: p, triggeredWord: q});
    }, _onStickerSelect: function (p) {
        g.log('StickersLoggerConfig', {event: 'sticker_trigger_activated', stickerid: p, triggeredword: this.state.triggeredWord, triggerused: true});
        this.props.onStickerSelect(p);
        this._resetFlyout();
    }, _renderStickers: function () {
        if (!this.state.stickers || this.state.stickers.length === 0)return null;
        var p = this.state.stickers[0], q = k.getScaledDimensions(p.height, p.width);
        return (h.createElement(h.DOM.div, {className: "_5r8h _onc", 'data-id': p.id, onClick: function () {
            return this._onStickerSelect(p.id);
        }.bind(this)}, h.createElement(i, {animationTrigger: "hover", className: "_5r8i", frameCount: p.frameCount, frameRate: p.frameRate || 83, framesPerCol: p.framesPerCol, framesPerRow: p.framesPerRow, sourceHeight: q.height, sourceURI: p.sourceURI, sourceWidth: q.width, spriteURI: p.spriteURI, paddedSpriteURI: p.paddedSpriteURI, stickerID: p.id, style: {cursor: 'pointer'}})));
    }, render: function () {
        return (h.createElement(l, {alignment: "center", autoFocus: false, context: this.props.context, onBlur: this._resetFlyout, position: "above", shown: this.state.stickers && this.state.stickers.length > 0, width: n}, this._renderStickers()));
    }});
    e.exports = o;
}, null);
__d("StickerTriggerIndicator.react", ["BanzaiLogger", "React", "StickerTrigger", "cx"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    var k = h.createClass({displayName: 'StickerTriggerIndicator', propTypes: {input: h.PropTypes.string, onTriggerChanged: h.PropTypes.func.isRequired}, getDefaultProps: function () {
        return {input: null};
    }, getInitialState: function () {
        return {shown: false};
    }, componentWillReceiveProps: function (l) {
        if (!l.input) {
            this.setState({shown: false});
        } else if (l.input !== this.props.input)i.findTriggerForInput(l.input, this._onTriggerChanged);
    }, _onTriggerChanged: function (l, m) {
        if (m)g.log('StickersLoggerConfig', {event: 'sticker_trigger_activated', numsearchresults: l.length, triggeredword: m, triggerused: false});
        this.props.onTriggerChanged(m);
        this.setState({shown: l && l.length > 0});
    }, render: function () {
        return h.createElement(h.DOM.span, {className: ((this.state.shown ? "emoticonIndicator" : ''))});
    }});
    e.exports = k;
}, null);
__d("XStickerReplyNUXControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/stickers\/tooltip\/", {});
}, null);
__d("ChatTabView", ["Arbiter", "ArbiterMixin", "AsyncDialog", "AsyncRequest", "AsyncSignal", "AvailableListConstants", "BanzaiLogger", "BanzaiODS", "ChatBehavior", "ChatConfig", "ChatContextualDialogController", "ChatInput.react", "ChatOpenTab", "ChatPhotoUploader.react", "ChatPrivacyActionController", "ChatQuietLinks", "ChatShareLinkUploader", "ChatStickerButton.react", "ChatTabMenu.react", "ChatTabMessagesView", "ChatTabSheetController", "ChatVisibility", "MercuryConstants", "ContentRollFlyout.react", "CurrentUser", "CSS", "CurrentLocale", "Dialog", "Dock", "DOM", "DOMEvent", "DOMQuery", "DragDropTarget", "EmoticonsList", "EmoticonUtils", "Event", "Focus", "Input", "Keys", "Locale", "MercuryConfig", "MercuryIDs", "MercuryFileUploader", "MercuryLogMessageType", "MercuryParticipants", "MercurySourceType", "MercuryThreadMetadataRawRenderer", "MercuryThreadMuter", "MercuryTypingAnimation.react", "MercuryTypingReceiver", "NubController", "Parent", "PhotosUploadWaterfall", "PresencePrivacy", "PresenceStatus", "React", "Run", "SelectionPosition", "StickerActions", "StickerConfig", "StickerConstants", "StickersFlyout.react", "StickersFlyoutTriggerSelector.react", "StickerState", "StickerSearchNUX.react", "StickerTriggerIndicator.react", "Style", "SubscriptionsHandler", "ChatTabTemplates", "TextAreaControl", "Toggler", "Tooltip", "TypingDetectorController", "URI", "UserAgent_DEPRECATED", "VideoCallCore", "WaterfallIDGenerator", "WebMessengerThreadPermalinks", "XStickerReplyNUXControllerURIBuilder", "copyProperties", "cx", "csx", "fbt", "getActiveElement", "isEmpty", "setIntervalAcrossTransitions", "tx", "OrionTrigger", "MercuryMessages", "MercuryServerRequests", "MercuryThreadInformer", "MercuryThreadMetadataRenderer", "MercuryThreadActions", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra, sa, ta, ua, va, wa, xa, ya, za, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, rb, sb, tb, ub, vb, wb, xb, yb, zb, ac, bc, cc, dc, ec, fc, gc, hc, ic, jc, kc, lc, mc, nc, oc) {
    "use strict";
    var pc = b('OrionTrigger').module, qc = b('MercuryMessages').get(), rc = b('MercuryServerRequests').get(), sc = b('MercuryThreadInformer').get(), tc = b('MercuryThreadMetadataRenderer').get(), uc = b('MercuryThreadActions').get(), vc = b('MercuryThreads').get(), wc = /^\s*$/, xc = {}, yc = null, zc, ad = 10;

    function bd(wd, xd) {
        var yd = ja.create('div');
        xd = xd && xd.filter(function (be) {
            return be != ya.user;
        });
        if (mc(xd))return zb.remove(wd);
        var zd = xd.length, ae = zd - ad;
        if (ae > 1)xd = xd.slice(0, ad);
        ya.getMulti(xd, function (be) {
            for (var ce in be) {
                var de = be[ce], ee = wb[':fb:mercury:chat:multichat-tooltip-item'].build();
                ja.setContent(ee.getNode('name'), de.name);
                var fe = ya.getUserID(ce), ge = fe && ib.get(fe) == l.ACTIVE;
                fa.conditionShow(ee.getNode('icon'), ge);
                fa.conditionClass(ee.getNode('name'), 'tooltipItemWithIcon', ge);
                ja.appendContent(yd, ee.getRoot());
            }
            if (ae > 1) {
                var he = kc._("\u0438 \u0435\u0449\u0435 {number of hidden chat participants}.", [kc.param("number of hidden chat participants", ae)]);
                ja.appendContent(yd, ja.create('div', {}, he));
            }
            zb.set(wd, yd, 'above');
        });
    }

    var cd = {}, dd = null, ed = false;

    function fd(wd, xd, yd) {
        if (yd) {
            cd[wd] = xd;
            if (!dd)dd = nc(gd, 600);
        } else {
            fa.removeClass(xd, 'highlightTitle');
            delete cd[wd];
        }
    }

    function gd() {
        for (var wd in cd) {
            var xd = cd[wd];
            if (xd.parentNode) {
                fa.conditionClass(xd, 'highlightTitle', ed);
            } else delete cd[wd];
        }
        ed = !ed;
        if (!Object.keys(cd).length) {
            clearInterval(dd);
            dd = null;
        }
    }

    function hd(wd) {
        var xd = va.tokenize(wd);
        switch (xd.type) {
            case 'user':
                return wb[':fb:mercury:chat:user-tab'].build();
        }
        return wb[':fb:mercury:chat:multichat-tab'].build();
    }

    function id(wd) {
        var xd = wd._getInputValue(), yd = wd._fileUploader.getAttachments();
        if (od(wd))kd(wd, xd, yd, function (zd) {
            var ae = wd._fileUploader.getImageFiles();
            if (ae.length > 0) {
                zd.image_ids = ae;
                zd.has_attachment = true;
            }
            var be = wd._fileUploader.getVideoFiles();
            if (be.length > 0) {
                zd.video_ids = be;
                zd.has_attachment = true;
            }
            var ce = wd._fileUploader.getAudioFiles();
            if (ce.length > 0) {
                zd.audio_ids = ce;
                zd.has_attachment = true;
            }
            var de = wd._fileUploader.getFiles();
            if (de.length > 0) {
                zd.file_ids = de;
                zd.has_attachment = true;
            }
            qc.sendMessage(zd);
            wd._fileUploader.removeAttachments();
            wd._shareLinkUploader.clear();
            if (!p.get('chat_react_input'))wd._getNode('input').value = '';
            wd._typingDetector && wd._typingDetector.resetState();
            wd._messagesView && wd._messagesView.setShouldScrollToBottom(true);
        });
    }

    function jd(wd, xd) {
        if (xd === 0)return;
        rd(wd, gb.POST_PUBLISHED, {count: xd});
        wd._waterfallID = ec.generate();
    }

    function kd(wd, xd, yd, zd) {
        vc.getThreadMeta(wd._threadID, function (ae) {
            var be = qc.constructUserGeneratedMessageObject(xd, za.CHAT_WEB, wd._threadID);
            if (yd.length > 0) {
                be.has_attachment = true;
                be.raw_attachments = yd;
            }
            var ce = wd._shareLinkUploader.getAttachData();
            if (ce) {
                be.has_attachment = true;
                be.content_attachment = ce;
            }
            if (vc.isNewEmptyLocalThread(wd._threadID)) {
                var de = wd._sheetController.getAddFriendsParticipants();
                if (de === null || de.length === 0)return;
                de = de.filter(function (fe) {
                    return fe != ya.user;
                });
                if (de.length === 0) {
                    be.thread_id = vc.getThreadIDForUser(ea.getID());
                } else if (de.length === 1) {
                    be.thread_id = vc.getThreadIDForParticipant(de[0]);
                } else vc.addParticipantsToThreadLocally(wd._threadID, de);
            }
            if (vc.isEmptyLocalThread(wd._threadID)) {
                var ee = va.tokenize(wd._threadID);
                be.message_id = ee.value;
                be.specific_to_list = ae.participants;
            }
            if (typeof be != 'undefined')be.signatureID = wd._signatureID;
            be.ui_push_phase = ca.UIPushPhase;
            zd(be);
            if (wd._threadID !== be.thread_id && !wd._photoUploader.isUploading()) {
                sd.inform('closed-tab', wd._threadID);
                s.openThread(be.thread_id, 'ChatTabView');
            }
        });
    }

    function ld(wd) {
        wd._blocked = true;
        wd._sheetController.openUploadWarningTabSheet();
    }

    function md(wd) {
        return (wd._fileUploader.isUploading() || wd._photoUploader.isUploading());
    }

    function nd(wd) {
        return wd._fileUploader.isUploading();
    }

    function od(wd) {
        var xd = wd._getInputValue();
        if (!wc.test(xd))return true;
        if (wd._fileUploader.getAttachments().length > 0 || wd._fileUploader.getImageFiles().length > 0 || wd._fileUploader.getVideoFiles().length > 0 || wd._fileUploader.getAudioFiles().length > 0 || wd._fileUploader.getFiles().length > 0)return true;
        if (wd._shareLinkUploader.getAttachData())return true;
        return false;
    }

    function pd(wd) {
        if (wd._blocked) {
            if (nd(wd))return;
            wd._blocked = false;
            id(wd);
            wd._sheetController.closeUploadWarningTabSheet();
        }
    }

    function qd(wd) {
        wd._nubController.flyoutContentChanged();
        wd._attachmentsDiv.scrollTop = wd._attachmentsDiv.scrollHeight;
    }

    function rd(wd, xd, yd) {
        gb.sendSignal(hc({qn: wd._waterfallID, step: xd, uploader: gb.APP_CHAT}, yd || {}));
    }

    function sd(wd, xd, yd, zd, ae) {
        if (xd)rc.ensureThreadIsFetched(xd);
        this._threadID = wd;
        this._signatureID = yd;
        this._eventListeners = [];
        this._isDragDropActive = false;
        this._tabTemplate = hd(wd);
        this._tabElem = this._tabTemplate.getRoot();
        if (ae) {
            this.insertBefore(ae);
        } else this.appendTo(zd);
        this._titlebar = this._getNode('nubFlyoutTitlebar');
        this._iconsContainerNode = this._getNode('iconsContainer');
        this._inputContainerNode = this._getNode('inputContainer');
        this._waterfallID = ec.generate();
        this._subscriptionsHandler = new vb();
        this._initializeAutoSendPhotoUploader();
        this._stickersFlyoutShown = false;
        var be = la.scry(this._tabElem, "._1ia");
        if (be && be.length > 0) {
            this._dropTarget = new ma(be[0]);
            this._dropTarget.setOnFilesDropCallback(this._filesDropped.bind(this));
            this._dropTarget.setOnURLDropCallback(this._linkDropped.bind(this));
            this._dropTarget.enable();
        }
        this._attachmentsDiv = this._getNode('attachmentShelf');
        this._sheetController = new aa(this._threadID, this._getNode('sheet'), this._tabElem);
        if (p.get('chat_react_option_menu')) {
            this._initializeReactMenu(this._tabTemplate.getNode('attachmentShelf'));
        } else {
            this._fileUploader = new wa(this._tabTemplate.getNode('attachmentShelf'), this._tabTemplate.getNode('attachButtonForm'), this._tabTemplate.getNode('fileInput'), this._tabTemplate.getNode('attachID'));
            this._initializeUploader(this._fileUploader);
        }
        this._sheetController.onClickNewMessagesSheet(function () {
            this._messagesView && this._messagesView.scrollToBottom();
            this.focus();
            sd.inform('read', this._threadID);
        }.bind(this));
        this._sheetController.onClickThreadIsMutedSheet(function () {
            uc.unmute(this._threadID);
            this.focus();
        }.bind(this));
        this._nubController = new eb().init(this._tabElem);
        this._sheetController.onResize(this._nubController.flyoutContentChanged.bind(this._nubController));
        this._sheetController.onTokensChanged(function (le, me) {
            vc.getThreadMeta(this._threadID, function (ne) {
                this._updateControls(ne, me.token_count);
            }.bind(this));
        }.bind(this));
        this._contextualDialogController = new q(this._threadID, this._getNode('videoCallLink'));
        if (yc === null)yc = !p.get('seen_autosend_photo_nux');
        this._messagesView = null;
        var ce = this._getNode('titlebarText'), de = function (le) {
            ce.setAttribute('href', le);
            ce.removeAttribute('rel');
            fa.removeClass(ce, 'noLink');
        };
        if (p.get('chat_react_option_menu')) {
            fc.getThreadURI(wd, function (le) {
                return de(le);
            });
        } else {
            var ee = this._getNode('conversationLink');
            fa.hide(ee);
            tc.renderWebMessengerLink(wd, ee, function () {
                fa.show(ee);
                de(ee.href);
            });
        }
        if (!vc.getCanonicalUserInThread(this._threadID))this._titlebarTooltipAnchor = this._getNode('titlebarText');
        var fe = this._getCanonicalUserID();
        if (this._getCanonicalUserID()) {
            ya.get(ya.getIDForUser(fe), function (le) {
                if (le.href)de(le.href);
            });
        } else if (p.get('chat_react_option_menu') && this._reactChatTabMenu.props.fullURL) {
            de(this._reactChatTabMenu.props.fullURL);
        } else if (ee && ee.href)de(ee.href);
        this._nubController.subscribe('resize', function () {
            this._resizeInputContainer();
        }.bind(this));
        this._setNameConversationLink();
        this._listen('closeButton', 'click', this._closeClicked);
        this._listen('titlebarCloseButton', 'click', this._closeClicked);
        this._listen('titlebarCloseButton', 'keyup', this._closeEnter);
        this._listen('titlebarCloseButton', 'mousedown', this._closePreClicked);
        this._listen('dockButton', 'click', this._nubClicked);
        this._listen('dockButton', 'keydown', this._dockKeyDown);
        this._listen('nubFlyoutTitlebar', 'click', this._titleClicked);
        this._listen('chatConv', 'click', this._chatConvClicked);
        this._listen('inputContainer', 'click', this._inputContainerClicked);
        this._listen('addFriendLink', 'click', this._addFriendLinkClicked, true);
        this._listen('addToThreadLink', 'click', this._addFriendLinkClicked, true);
        this._listen('nameConversationLink', 'click', this._nameConversationLinkClicked, true);
        this._listen('clearWindowLink', 'click', this._clearHistory, true);
        this._listen('unsubscribeLink', 'click', this._unsubscribeLinkClicked, true);
        this._listen('videoCallLink', 'click', this._callClicked, true);
        this._listen('reportSpamLink', 'click', this._reportSpamClicked, true);
        this._listen('createGroupLink', 'click', this._createGroupClicked, true);
        this._listen('enableDesktopNotif', 'click', this._enableDesktopNotif, true);
        this._listen('muteThreadLink', 'click', bb.showMuteChangeDialog.bind(null, this._threadID), true);
        this._listen('unmuteThreadLink', 'click', function () {
            uc.unmute(this._threadID);
            yb.hide();
        }.bind(this), true);
        this._listen('sheet', 'keydown', function (event) {
            if (!event.getModifiers().any && event.keyCode === sa.TAB) {
                this._focusInput();
                event.kill();
            }
        }.bind(this));
        this._stickersFlyoutToggler = this._getNode('emoticons');
        this._initializeInput();
        if (nb.WebStickerTrigger) {
            this._triggeredWord = null;
            this._stickerTrigger = null;
            this._stickerTriggerNode = null;
            if (nb.TriggerInterface === 'one_tap') {
                this._stickerTrigger = jb.renderComponent(jb.createElement(qb, {context: this._stickersFlyoutToggler, onStickerSelect: this._stickerSelected.bind(this), onTriggerChanged: this._onTriggerChanged.bind(this)}), this._getNode('stickersTriggerFlyoutContainer'));
                this._stickerTriggerNode = this._getNode('stickersTriggerFlyoutContainer');
            } else if (nb.TriggerInterface === 'hyperlink') {
                this._stickerTrigger = jb.renderComponent(jb.createElement(tb, {onTriggerChanged: this._onTriggerChanged.bind(this)}), this._getNode('emoticonIndicator'));
                this._stickerTriggerNode = this._getNode('emoticonIndicator');
            }
        }
        if (rb.shouldShowStickerSearchNUXIndicator()) {
            this._addStickerSearchNUXIndicator();
            this._listen('emoticons', 'click', function () {
                if (rb.shouldShowStickerSearchNUXIndicator()) {
                    mb.selectPack(ob.SEARCH_PACK_ID);
                    rb.clearShowStickerSearchNUXIndicator();
                }
                g.inform('stickerSearchNUXIndicator/hide');
            }, true);
            g.subscribeOnce('stickerSearchNUXIndicator/hide', function () {
                this._clearStickerSearchNUXIndicator();
                this._clearStickerSearchNUXTooltip();
            }.bind(this));
            sd.subscribe('lower-activated', function (le, me) {
                if (me === this._threadID && rb.shouldShowStickerSearchNUXIndicator()) {
                    this._clearStickerSearchNUXTooltip();
                    this._addStickerSearchNUXIndicator();
                }
            }.bind(this));
        }
        if (p.get('chat_react_sticker_button')) {
            this._stickerButton = jb.renderComponent(jb.createElement(x, {onFlyoutShown: this._onFlyoutShown.bind(this), onFlyoutHidden: this._onFlyoutHidden.bind(this), onStickerSelect: this._stickerSelected.bind(this), onEmoticonSelect: this._emoticonSelected.bind(this)}), this._getNode('stickerButtonContainer'));
            n.bumpEntityKey('chat.web', 'sticker_button.mounting_attempted');
        } else {
            var ge = this._getNode('stickers');
            if (ge)this._stickersFlyout = jb.renderComponent(jb.createElement(pb, {onStickerSelect: function (le) {
                this._stickerSelected(le);
            }.bind(this), onShown: this._onFlyoutShown.bind(this), onHidden: this._onFlyoutHidden.bind(this), onEmoticonSelect: this._emoticonSelected.bind(this), onEscKeyDown: this._hideStickersFlyoutIfShown.bind(this)}), ge);
            this._eventListeners.push(rb.addListener(rb.PACK_SELECTED, function (le) {
                if (this._stickersFlyout && this._stickersFlyout.isMounted())this._stickersFlyout.setProps({packID: le});
            }.bind(this)));
        }
        if (pc) {
            this._orionTriggerContainer = this._getNode('orionTriggerContainer');
            this._orionTrigger = jb.renderComponent(jb.createElement(pc, {onTrigger: this._orionTriggered.bind(this)}), this._orionTriggerContainer);
        }
        var he = this._getNode('contentRoll');
        if (he)jb.renderComponent(jb.createElement(da, {onSelection: function (le) {
            this._shareLinkUploader && this._shareLinkUploader.loadShare(le.url, {content_roll_entry: le});
            this.focus();
        }.bind(this), userID: ea.getID()}), he);
        this._privacyLink = this._getNode('privacyLink');
        if (this._privacyLink) {
            this._privacyActionController = new u(fe, this._updatePrivacyLink.bind(this));
            this._eventListeners.push(pa.listen(this._privacyLink, 'click', this._privacyActionController.togglePrivacy.bind(this._privacyActionController)));
        }
        vc.getThreadMeta(this._threadID, function (le) {
            this._setUpMutingSettings(le);
        }.bind(this));
        var ie = this._getNode('muteGroupLink');
        if (ie) {
            var je = vc.getCanonicalGroupInThread(this._threadID);
            if (je)ie.setAttribute('ajaxify', bc(ie.getAttribute('ajaxify')).addQueryData({id: je}));
        }
        v.removeEmptyHrefs(this._tabElem);
        xc[wd] = this;
        this.updateAvailableStatus();
        this.updateTab();
        this._setCloseTooltip(false);
        var ke = {threadID: wd, userID: fe, signatureID: this._signatureID};
        new k('/ajax/chat/opentab_tracking.php', ke).send();
        kb.onBeforeUnload(function () {
            if (this._hasUnfinishedPost())return "\u0412\u044b \u0435\u0449\u0435 \u043d\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b\u0438 \u0441\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435. \u0425\u043e\u0442\u0438\u0442\u0435 \u0432\u044b\u0439\u0442\u0438, \u043d\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0432 \u0435\u0433\u043e?";
            if (qc.getNumberLocalMessages(this._threadID))return "\u0412\u0430\u0448\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0432\u0441\u0435 \u0435\u0449\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442\u0441\u044f. \u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u043f\u043e\u043a\u0438\u043d\u0443\u0442\u044c \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443?";
            return null;
        }.bind(this), false);
        kb.onUnload(function () {
            td(this);
        }.bind(this));
    }

    function td(wd) {
        if (wd._photoUploader.isUploading())rd(wd, gb.CANCEL_DURING_UPLOAD);
    }

    function ud() {
        for (var wd in xc) {
            xc[wd].updateAvailableStatus();
            xc[wd].updateMultichatTooltip();
        }
    }

    g.subscribe(['buddylist/availability-changed'], ud);
    hb.subscribe(['privacy-changed', 'privacy-availability-changed'], ud);
    o.subscribe(o.ON_CHANGED, function () {
        for (var wd in xc)vc.getThreadMeta(wd, function (xd) {
            xc[wd]._updateUnreadCount(xd);
        });
    });
    db.addRetroactiveListener('state-changed', function (wd) {
        for (var xd in wd) {
            var yd = wd[xd] && wd[xd].length, zd = xc[xd];
            zd && zd.showTypingIndicator(yd);
        }
    });
    sc.subscribe('threads-updated', function (wd, xd) {
        for (var yd in xc) {
            var zd = xc[yd];
            xd[yd] && zd.updateTab();
            if (zd._newThreadIDFromPhotoUpload && !zd._photoUploader.isUploading() && xd[zd._newThreadIDFromPhotoUpload]) {
                sd.inform('closed-tab', zd._threadID);
                s.openThread(zd._newThreadIDFromPhotoUpload, 'ChatTabView');
                zd._newThreadIDFromPhotoUpload = null;
            }
        }
    });
    sc.subscribe('threads-deleted', function (wd, xd) {
        for (var yd in xc)xd[yd] && sd.inform('thread-deleted', yd);
    });
    hc(sd, h, {get: function (wd) {
        return xc[wd];
    }});
    hc(sd.prototype, {getThreadID: function () {
        return this._threadID;
    }, showAddFriend: function () {
        setTimeout((function () {
            this._sheetController.openAddFriendsSheet();
        }).bind(this), 0);
    }, showNameConversation: function (wd) {
        setTimeout((function () {
            this._sheetController.openNameConversationSheet(wd);
        }).bind(this), 0);
    }, hideAutomaticNameConversation: function () {
        setTimeout((function () {
            this._sheetController.closeAutomaticNameConversationSheet();
        }).bind(this), 0);
    }, isVisible: function () {
        return fa.shown(this._tabElem);
    }, setVisibleState: function (wd, xd) {
        var yd = fa.shown(this._tabElem), zd = fa.hasClass(this._tabElem, 'opened');
        fa.conditionShow(this._tabElem, wd);
        fa.conditionClass(this._tabElem, 'opened', xd);
        if (!(yd && zd) && wd && xd) {
            if (!this._messagesView)this._messagesView = new z(this._threadID, this._sheetController, this._getNode('chatConv'), this._getNode('conversation'), this._getNode('loadingIndicator'), this._getNode('lastMessageIndicator'), this._getNode('typingIndicator'), this);
            this._nubController.flyoutContentChanged();
            this._messagesView.scrollToBottom();
        }
        if (yd && zd && !(wd && xd))this._contextualDialogController.tabNotActive();
    }, focus: function () {
        if (fa.hasClass(this._tabElem, 'opened')) {
            this._focusInput();
        } else this._getNode('dockButton').focus();
    }, isFocused: function () {
        var wd = lc();
        return fb.byClass(wd, "_50mz") === this._tabElem;
    }, hasEmptyInput: function () {
        var wd;
        if (p.get('chat_react_input')) {
            wd = this._chatInput.getValue();
        } else wd = this._getNode('input').value;
        return wc.test(wd);
    }, getInputElem: function () {
        if (p.get('chat_react_input')) {
            return this._chatInput.getDOMNode();
        } else return this._getNode('input');
    }, setStickersFlyoutPackID: function (wd) {
        if (this._stickerButton) {
            this._setPackIDReact(wd);
        } else this._setPackIDLegacy(wd);
    }, _linkDropped: function (wd) {
        this._shareLinkUploader.loadShare(wd);
    }, _filesDropped: function (wd) {
        if (this._fileUploader)this._fileUploader.addDroppedFiles(wd);
    }, showStickerSearchNUXTooltip: function () {
        if (zc)return;
        zc = true;
        this._clearStickerSearchNUXIndicator();
        this._stickerSearchNUXTooltip = jb.renderComponent(jb.createElement(sb, {showIndicatorFunc: this._addStickerSearchNUXIndicator.bind(this)}), this._getNode('tooltipNUXContainer'));
    }, _setPackIDLegacy: function (wd) {
        var xd = this._stickersFlyout;
        if (!this._stickersFlyoutToggler || !xd || !xd.isMounted())return;
        mb.selectPack(wd);
        this._toggleStickersFlyoutShownLegacy(true);
    }, _setPackIDReact: function (wd) {
        if (!this._stickerButton.isMounted())return;
        mb.selectPack(wd);
        this._toggleStickersFlyoutShownReact(true);
    }, _toggleStickersFlyoutShownReact: function (wd) {
        this._stickerButton.showFlyout();
        this._stickersFlyoutShown = wd;
    }, _toggleStickersFlyoutShownLegacy: function (wd) {
        if (wd) {
            yb.show(this._stickersFlyoutToggler);
        } else yb.hide(this._stickersFlyoutToggler);
        this._stickersFlyoutShown = wd;
    }, _hideStickersFlyoutIfShown: function () {
        if (this._stickersFlyoutToggler && this._stickersFlyout && this._stickersFlyoutShown)this._toggleStickersFlyoutShownLegacy(false);
    }, showStickerReplyNUX: function () {
        if (zc)return;
        var wd = this._getNode('stickerButtonContainer') || this._getNode('emoticons');
        new j(new gc().getURI()).setRelativeTo(wd).setData({thread_id: this._threadID}).setHandler(function (xd) {
            rb.clearShowStickerReplyNUX();
        }).send();
    }, insertBefore: function (wd) {
        ja.insertBefore(wd._tabElem, this._tabElem);
    }, appendTo: function (wd) {
        ja.appendContent(wd, this._tabElem);
    }, nextTabIs: function (wd) {
        var xd = wd && wd._tabElem;
        return this._tabElem.nextSibling == xd;
    }, getScrollTop: function () {
        return ja.find(this._tabElem, '.fbNubFlyoutBody.scrollable').scrollTop;
    }, setScrollTop: function (wd) {
        ja.find(this._tabElem, '.fbNubFlyoutBody.scrollable').scrollTop = wd;
    }, destroy: function () {
        ja.remove(this._tabElem);
        this._selectionPosition && this._selectionPosition.disable();
        while (this._eventListeners.length)this._eventListeners.pop().remove();
        if (this._dropTarget)this._dropTarget.disable();
        this._messagesView && this._messagesView.destroy();
        this._sheetController && this._sheetController.destroy();
        if (p.get('chat_react_option_menu')) {
            jb.unmountComponentAtNode(this._getNode('menuContainer'));
        } else this._fileUploader && this._fileUploader.destroy();
        jb.unmountComponentAtNode(this._getNode('photoUploaderContainer'));
        if (p.get('chat_react_sticker_button')) {
            jb.unmountComponentAtNode(this._getNode('stickerButtonContainer'));
        } else jb.unmountComponentAtNode(this._getNode('stickers'));
        if (this._stickerTriggerNode) {
            jb.unmountComponentAtNode(this._stickerTriggerNode);
            clearTimeout(this._triggerTimeoutID);
        }
        this._subscriptionsHandler && this._subscriptionsHandler.release();
        this._contextualDialogController && this._contextualDialogController.destroy();
        this._privacyActionController && this._privacyActionController.destroy();
        delete xc[this._threadID];
        ia.unregisterNubController(this._nubController);
        if (p.get('chat_react_input')) {
            jb.unmountComponentAtNode(this._getNode('inputContainer'));
        } else ra.reset(this._getNode('input'));
    }, updateAvailableStatus: function () {
        vc.getThreadMeta(this._threadID, function (wd) {
            var xd = l.OFFLINE, yd = this._getCanonicalUserID();
            if (yd) {
                xd = ib.get(yd);
            } else {
                var zd = wd.participants.map(function (be) {
                    return ya.getUserID(be);
                });
                xd = ib.getGroup(zd);
            }
            if (!ba.isOnline())xd = l.OFFLINE;
            if (yd)this._updateCallLink(xd);
            fa.conditionClass(this._tabElem, "_5238", xd === l.ACTIVE);
            fa.conditionClass(this._tabElem, "_42nw", xd === l.IDLE);
            fa.conditionClass(this._tabElem, "_5239", xd === l.MOBILE);
            var ae = this._getNode('presenceIndicator');
            switch (xd) {
                case l.ACTIVE:
                    ae.setAttribute('alt', "\u0412 \u0441\u0435\u0442\u0438");
                    break;
                case l.MOBILE:
                    ae.setAttribute('alt', "\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439");
                    break;
                default:
                    ae.removeAttribute('alt');
                    break;
            }
        }.bind(this));
    }, updateTab: function () {
        this._setNameConversationLink();
        vc.getThreadMeta(this._threadID, function (wd) {
            tc.renderAndSeparatedParticipantList(this._threadID, [this._getNode('name'), this._getNode('titlebarText')], {names_renderer: ab.renderShortNames, check_length: true});
            this._updateControls(wd);
            this._updateMutingSettings(wd);
            this._updateUnreadCount(wd);
            this.updateMultichatTooltip();
            this._updateArchiveWarning(wd);
            this._updateNewThread(wd);
            this._updateNameConversationSheet(wd);
            this._updateReadOnlySheet(wd);
        }.bind(this));
    }, _setNameConversationLink: function () {
        var wd = this._getNode('nameConversationLink');
        if (wd)vc.isEmptyLocalThread(this._threadID) ? fa.hide(wd) : fa.show(wd);
    }, _updateNameConversationSheet: function (wd) {
        if (vc.canReply(wd.thread_id) && !wd.name && !wd.is_canonical && !wd.name_conversation_sheet_dismissed && !wd.has_email_participant && !wd.read_only && !vc.isEmptyLocalThread(wd.thread_id)) {
            this.showNameConversation(true);
        } else this.hideAutomaticNameConversation();
    }, _updateReadOnlySheet: function (wd) {
        var xd = vc.canReply(wd.thread_id), yd = vc.isEmptyLocalThread(wd.thread_id);
        if (!xd && !yd)this._sheetController.openReadOnlySheet();
    }, updateSignatureID: function (wd) {
        this._signatureID = wd;
    }, _showPhotoNUXIfNecessary: function () {
        if (yc) {
            yc = false;
            new j('/ajax/chat/photo_nux.php').setRelativeTo(this._getNode('photoUploaderContainer')).setData({threadID: this._threadID}).send();
            return true;
        }
    }, _setUpMutingSettings: function (wd) {
        var xd = bb.isThreadMuted(wd);
        if (xd)this._sheetController.openThreadIsMutedTabSheet();
        this._updateActionMenu(xd);
    }, _updateMutingSettings: function (wd) {
        var xd = bb.isThreadMuted(wd), yd;
        if (p.get('chat_react_option_menu')) {
            yd = this._reactChatTabMenu.props.isMuted;
        } else yd = fa.shown(this._getNode('unmuteThreadLink').parentNode);
        if (xd && !yd) {
            this._sheetController.openThreadIsMutedTabSheet();
        } else if (!xd && yd)this._sheetController.closeThreadIsMutedTabSheet();
        this._updateActionMenu(xd);
    }, _updateActionMenu: function (wd) {
        if (p.get('chat_react_option_menu')) {
            this._reactChatTabMenu.isMounted() && this._reactChatTabMenu.setProps({isMuted: wd});
        } else {
            fa.conditionShow(this._getNode('muteThreadLink').parentNode, !wd);
            fa.conditionShow(this._getNode('unmuteThreadLink').parentNode, wd);
        }
    }, _updateArchiveWarning: function (wd) {
        var xd = false;
        ya.get(ya.user, function (yd) {
            xd = yd.employee;
            if (xd)ya.getMulti(wd.participants, this._showArchiveWarningIfAllParticipantsAreEmployees.bind(this));
        }.bind(this));
    }, _updateControls: function (wd, xd) {
        var yd = false;
        if (wd && wd.thread_id) {
            var zd = va.tokenize(wd.thread_id);
            if (zd.type === 'user') {
                var ae = zd.value;
                yd = !rc.isUser(ae);
            }
        }
        var be = vc.canReply(wd.thread_id) && (!mc(wd.participants) || xd);
        fa.conditionShow(this._inputContainerNode, be);
        fa.conditionShow(this._iconsContainerNode, be);
        if (!p.get('chat_react_option_menu')) {
            fa.conditionShow(this._getNode('dropdown'), be);
        } else if (this._reactChatTabMenu.isMounted()) {
            this._reactChatTabMenu.setProps({isEmptyChat: vc.isNewEmptyLocalThread(wd.thread_id), show: be});
            if (yd)this._reactChatTabMenu.setProps({showAddFriend: null});
        }
        fa.conditionShow(this._getNode('addToThreadLink'), be && !yd);
        this._resizeInputContainer();
        this._updateOrionTrigger(be);
    }, _updateOrionTrigger: function (wd) {
        if (this._orionTrigger && wd) {
            var xd = this.getParticipantIDForOrionNUX();
            fa.conditionShow(this._orionTriggerContainer, xd);
            if (xd) {
                ya.get(xd, function (yd) {
                    yd.userId = ya.getUserID(xd);
                    this._orionTrigger.setProps({receiver: yd, disabled: !yd.orion_eligible});
                    if (yd.orion_eligible && this.isOrionNUXEligible())this.showOrionNUXTooltip();
                }.bind(this));
            } else this._orionTrigger.setProps({receiver: {}});
        }
    }, getParticipantIDForOrionNUX: function () {
        var wd = this._sheetController.getAddFriendsTabSheet(), xd = wd.getParticipants(), yd = this._getCanonicalUserID(), zd = null;
        if (yd) {
            zd = ya.getIDForUser(yd);
        } else if (xd && xd.length === 1)zd = xd[0];
        return zd;
    }, showOrionNUXTooltip: function () {
        if (this._orionTrigger && ua.ShowOrionNUXTooltip)this._orionTrigger.setShouldShowNUXTooltip();
    }, isOrionNUXEligible: function () {
        var wd = this.getParticipantIDForOrionNUX();
        return wd && this.isVisible() && fa.hasClass(this._tabElem, 'opened');
    }, _resizeInputContainer: function () {
        var wd = this._tabElem.clientWidth, xd = 2, yd = wd - (this._inputContainerNode.clientWidth + xd), zd = ta.isRTL() ? 'left' : 'right';
        ub.set(this._iconsContainerNode, zd, yd + 'px');
        if (!p.get('chat_react_input'))xb.getInstance(this._getNode('input')).update();
    }, _updateNewThread: function (wd) {
        if (vc.isNewEmptyLocalThread(wd.thread_id))this.showAddFriend();
    }, _showArchiveWarningIfAllParticipantsAreEmployees: function (wd) {
        var xd = true;
        for (var yd in wd)xd = xd && wd[yd].employee;
        var zd = this._getNode('titanArchiveWarning');
        if (zd) {
            if (this._titlebarTooltipAnchor)fa.conditionClass(this._titlebarTooltipAnchor, 'narrowTitleBar', xd);
            fa.conditionShow(zd, xd);
        }
    }, updateMultichatTooltip: function () {
        vc.getThreadMeta(this._threadID, function (wd) {
            if (!wd.is_canonical)bd(this._titlebarTooltipAnchor, wd.participants);
        }.bind(this));
    }, _getNode: function (wd) {
        return this._tabTemplate.getNode(wd);
    }, _getCanonicalUserID: function () {
        return vc.getCanonicalUserInThread(this._threadID);
    }, _listen: function (wd, event, xd, yd) {
        var zd = this._getNode(wd);
        if (zd) {
            this._eventListeners.push(pa.listen(zd, event, xd.bind(this)));
        } else if (!yd)throw new Error('Could not find node "' + wd + '"');
    }, _closePreClicked: function (wd) {
        this._closeMouseDown = true;
    }, _closeClicked: function (wd) {
        td(this);
        sd.inform('closed-tab', this._threadID);
        wd.kill();
    }, _closeEnter: function (wd) {
        if (wd.keyCode === sa.RETURN)this._closeClicked(wd);
    }, _nubClicked: function (wd) {
        if (!this._isDragDropActive) {
            wd.kill();
            return sd.inform('nub-activated', this._threadID);
        }
    }, _dockKeyDown: function (event) {
        if (event.keyCode === sa.RETURN || event.keyCode === sa.SPACE) {
            sd.inform('nub-activated', this._threadID);
            event.kill();
        } else this._handleHotkeyPressed(event);
    }, _handleHotkeyPressed: function (event) {
        if (event.keyCode === sa.ESC) {
            this._handleEscape();
            if (p.get('chat_react_input'))event = new ka(event);
            event.kill();
        } else if (event.keyCode === sa.TAB)this._handleTabPressed(event);
    }, _handleTabPressed: function (event) {
        if (!event.ctrlKey) {
            var wd = sd.inform('tab-pressed', {id: this._threadID, shiftPressed: event.shiftKey});
            if (p.get('chat_react_input'))event = new ka(event);
            !wd && event.kill();
            return true;
        }
    }, _handleEscape: function () {
        if (this._stickersFlyoutShown) {
            this._stickerButton ? this._toggleStickersFlyoutShownReact(false) : this._toggleStickersFlyoutShownLegacy(false);
            return;
        }
        td(this);
        if (this.hasEmptyInput()) {
            sd.inform('esc-pressed', this._threadID);
        } else {
            var wd = "\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0437\u0430\u043a\u0440\u044b\u0442\u044c \u043e\u043a\u043d\u043e \u044d\u0442\u043e\u0433\u043e \u0447\u0430\u0442\u0430?", xd = "\u0412\u044b \u043d\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b\u0438 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435.", yd = new ha().setTitle(wd).setBody(xd).setButtons([ha.CLOSE, ha.CANCEL]).setHandler(sd.inform.bind(sd, 'esc-pressed', this._threadID, null)).setModal(true).show(), zd = yd.getButtonElement('yes');
            zd && qa.set(zd);
        }
    }, _titleClicked: function (event) {
        var wd = event.getTarget();
        if (!fb.byClass(wd, 'titlebarText') && !fb.byClass(wd, 'uiSelector') && !fb.byClass(wd, 'addToThread') && !fb.byClass(wd, 'optionMenu') && !this._isDragDropActive) {
            sd.inform('lower-activated', this._threadID);
            event.kill();
        }
    }, _callClicked: function (wd) {
        var xd = this._getCanonicalUserID();
        if (dc.availableForCall(xd)) {
            var yd = 'chat_tab_icon';
            if (wd.target && fa.hasClass(wd.target, 'video_call_tour'))yd = 'chat_tab_icon_tour';
            sd.inform('video-call-clicked', {threadID: this._threadID, userID: xd, clickSource: yd});
        }
        return false;
    }, _addFriendLinkClicked: function () {
        this.showAddFriend();
    }, _nameConversationLinkClicked: function () {
        this.showNameConversation();
    }, _showParticipantsClicked: function () {
        rc.getServerThreadID(this._threadID, function (wd) {
            i.send(new j(bc('/ajax/browser/dialog/multichat_members/').addQueryData({id: wd})));
        });
    }, _clearHistory: function () {
        var wd = vc.getThreadMetaNow(this._threadID);
        if (wd) {
            var xd = this._getCanonicalUserID();
            rc.clearChat(this._threadID, xd, wd.timestamp);
        }
    }, _unsubscribeLinkClicked: function () {
        var wd = [];
        wd.push({name: 'unsubscribe', label: "\u0412\u044b\u0439\u0442\u0438 \u0438\u0437 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438", handler: this._unsubscribeToThread.bind(this)});
        wd.push(ha.CANCEL);
        new ha().setTitle("\u0412\u044b\u0439\u0442\u0438 \u0438\u0437 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438?").setBody("\u0412\u044b \u043d\u0435 \u0431\u0443\u0434\u0435\u0442\u0435 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u044d\u0442\u043e\u0439 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0438 \u0438 \u043b\u044e\u0434\u0438 \u0431\u0443\u0434\u0443\u0442 \u0432\u0438\u0434\u0435\u0442\u044c, \u0447\u0442\u043e \u0432\u044b \u0435\u0435 \u043f\u043e\u043a\u0438\u043d\u0443\u043b\u0438.").setButtons(wd).show();
    }, _getUserParticipants: function (wd) {
        var xd = [];
        wd.forEach(function (yd) {
            var zd = ya.getUserID(yd);
            zd && xd.push(zd);
        });
        return xd;
    }, _createGroupClicked: function () {
        vc.getThreadMeta(this._threadID, function (wd) {
            if (!wd.is_canonical) {
                var xd = bc('/ajax/groups/create_get.php').addQueryData({ref: 'web_messenger_dock', parent_id: '0'}), yd = this._getUserParticipants(wd.participants);
                xd.addQueryData({members: yd});
                if (wd.name)xd.addQueryData({name: wd.name});
                i.send(new j(xd));
            }
        }.bind(this));
    }, _enableDesktopNotif: function () {
        Notification.requestPermission();
    }, _reportSpamClicked: function () {
        var wd = this._getCanonicalUserID(), xd = bc('/ajax/chat/report.php').addQueryData({id: wd}).addQueryData({src: 'top_report_link'});
        i.send(new j(xd));
    }, _inputPasted: function (event) {
        if (cc.chrome()) {
            var wd = event.clipboardData || event.originalEvent.clipboardData;
            if (!wd || !wd.items || wd.items.length < 1)return;
            var xd = wd.items[0].type;
            if (xd !== 'image/png')return;
            if (wd.items[0].getAsFile) {
                var yd = wd.items[0].getAsFile();
                this._photoUploader.uploadFile(yd);
            }
        }
    }, _focusInput: function () {
        if (p.get('chat_react_input')) {
            this._chatInput.focus();
        } else this._getNode('input').focus();
    }, _focusTab: function () {
        fa.addClass(this._tabElem, 'focusedTab');
        this.tryMarkAsRead();
        this._contextualDialogController.tabFocused();
        if (!zc && this._showPhotoNUXIfNecessary())g.subscribe(['ChatNUX/show', 'ChatNUX/hide'], function (event) {
            zc = event === 'ChatNUX/show';
        });
        this._closeMouseDown = false;
        this._setCloseTooltip(true);
        sd.inform('focus-tab', this._threadID);
    }, _blurTab: function () {
        fa.removeClass(this._tabElem, 'focusedTab');
        !this._closeMouseDown && this._setCloseTooltip(false);
    }, _setCloseTooltip: function (wd) {
        var xd = this._getNode('titlebarCloseButton'), yd = wd ? "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 Esc \u0434\u043b\u044f \u0432\u044b\u0445\u043e\u0434\u0430" : "\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u0432\u043a\u043b\u0430\u0434\u043a\u0443";
        zb.set(xd, yd, 'above');
    }, _inputKeyDown: function (event) {
        this.tryMarkAsRead();
        if (event.keyCode === sa.RETURN && !event.shiftKey) {
            if (nd(this)) {
                ld(this);
                event.kill && event.kill();
                return;
            }
            id(this);
            if (nb.WebStickerTrigger)this._activateStickerTriggerAfterparty();
            event.kill && event.kill();
            return;
        }
        if (event.keyCode === sa.DOWN && event.shiftKey && this.hasEmptyInput()) {
            sd.inform('lower-activated', this._threadID);
            event.kill && event.kill();
            return;
        }
        this._handleHotkeyPressed(event);
    }, _activateStickerTriggerAfterparty: function () {
        this._persistTrigger = true;
        clearTimeout(this._triggerTimeoutID);
        this._triggerTimeoutID = setTimeout(this._deactivateStickerTriggerAfterparty.bind(this), 5000);
    }, _deactivateStickerTriggerAfterparty: function () {
        clearTimeout(this._triggerTimeoutID);
        this._persistTrigger = false;
        this._userUsedTrigger = false;
        this._triggeredWord = null;
        this._setStickerTrigger(null);
    }, _setStickerTrigger: function (wd) {
        if (this._stickerTrigger && this._stickerTrigger.isMounted())this._stickerTrigger.setProps({input: wd});
    }, getTriggeredWord: function () {
        return this._triggeredWord;
    }, isTriggerValid: function () {
        return !this._userUsedTrigger;
    }, _inputChanged: function (wd) {
        if (this._persistTrigger)this._deactivateStickerTriggerAfterparty();
        if (this.isTriggerValid())this._setStickerTrigger(wd);
    }, _initializeInput: function () {
        if (!p.get('chat_react_input')) {
            var wd = this._inputContainerNode.clientHeight;
            xb.getInstance(this._getNode('input')).subscribe('resize', function () {
                var xd = this._inputContainerNode.clientHeight;
                if (xd != wd)this._nubController.flyoutContentChanged();
                wd = xd;
            }.bind(this));
            this._listen('input', 'focus', this._focusTab);
            this._listen('input', 'blur', this._blurTab);
            this._listen('input', 'paste', this._inputPasted);
            if (cc.firefox() && ga.get() == 'ko_KR') {
                this._listen('input', 'keyup', this._inputKeyDown);
            } else this._listen('input', 'keydown', this._inputKeyDown);
            this._initializeThingsWithInputFn(this._tabTemplate.getNode('input'));
        } else this._chatInput = jb.renderComponent(jb.createElement(r, {getTriggeredWordFn: this.getTriggeredWord.bind(this), initializeThingsWithInputFn: this._initializeThingsWithInputFn.bind(this), inputChanged: this._inputChanged.bind(this), inputKeyDown: this._inputKeyDown.bind(this), isTriggerValid: this.isTriggerValid.bind(this), onBlur: this._blurTab.bind(this), onEscape: this._handleEscape.bind(this), onFocus: this._focusTab.bind(this), onTab: this._handleTabPressed.bind(this), openFlyoutFn: this._toggleStickersFlyoutShownLegacy.bind(this, true), resizeFn: this._nubController.flyoutContentChanged.bind(this._nubController), uploadPhotoFn: this._photoUploader.uploadFile}), this._getNode('chatInputContainer'));
    }, _initializeThingsWithInputFn: function (wd, xd) {
        this._shareLinkUploader = new w(this._tabTemplate.getNode('attachmentShelf'), wd, this.focus.bind(this), xd);
        this._initializeUploader(this._shareLinkUploader);
        vc.getThreadMeta(this._threadID, function (yd) {
            rc.getServerThreadID(this._threadID, function (zd) {
                this._typingDetector = new ac(this._getCanonicalUserID(), wd, 'mercury-chat', null, zd, xd);
            }.bind(this));
        }.bind(this));
    }, _getInputValue: function () {
        if (p.get('chat_react_input')) {
            return this._chatInput.getValue() || '';
        } else return this._tabTemplate.getNode('input').value || '';
    }, _hasUnfinishedPost: function () {
        return od(this) || md(this);
    }, tryMarkAsRead: function () {
        if (!this._messagesView || this._messagesView.isScrolledToBottom()) {
            sd.inform('read', this._threadID);
            return true;
        }
        return false;
    }, _chatConvClicked: function (wd) {
        this.tryMarkAsRead();
        if (fb.byTag(wd.getTarget(), 'a') || ja.getSelection())return;
        this.focus();
    }, _inputContainerClicked: function (wd) {
        this.tryMarkAsRead();
        this.focus();
    }, showTypingIndicator: function (wd) {
        if (p.get('chat_closed_tab_typing_indicator_animated')) {
            var xd = ja.find(this._tabElem, "._54m9");
            if (wd) {
                this._animatedTypingIndicator = jb.renderComponent(jb.createElement(cb, null), xd);
                this._updateAnimatedIndicatorColor();
                fa.addClass(this._tabElem, "_54m8");
                fa.show(xd);
            } else {
                fa.removeClass(this._tabElem, "_54m8");
                fa.hide(xd);
                jb.unmountComponentAtNode(xd);
                this._animatedTypingIndicator = null;
            }
        } else fa.conditionClass(this._tabElem, 'typing', wd);
    }, _updateAnimatedIndicatorColor: function () {
        if (this._animatedTypingIndicator) {
            var wd = fa.hasClass(this._tabElem, 'highlightTab') ? 'light' : 'dark';
            this._animatedTypingIndicator.setProps({color: wd});
        }
    }, _updateUnreadCount: function (wd) {
        var xd = wd.unread_count;
        if (typeof xd != 'undefined') {
            var yd = !!xd && (!o.showsTabUnreadUI || o.showsTabUnreadUI()), zd = this._getNode('numMessages');
            fa.conditionShow(zd, yd);
            fa.conditionClass(this._tabElem, 'highlightTab', yd);
            this._updateAnimatedIndicatorColor();
            fd(this._threadID, this._tabElem, yd);
            ja.setContent(zd, xd);
        }
    }, _updateCallLink: function (wd) {
        var xd = this._getNode('videoCallLink'), yd = this._getCanonicalUserID();
        if (yd === ea.getID()) {
            this._hideVideoCallouts();
            fa.hide(xd);
            return;
        }
        if (ba.isOnline()) {
            var zd = 'fbid:' + yd;
            ya.get(zd, function (ae) {
                if (dc.availableForCall(yd)) {
                    zb.set(xd, oc._("\u041d\u0430\u0447\u0430\u0442\u044c \u0432\u0438\u0434\u0435\u043e\u0437\u0432\u043e\u043d\u043e\u043a \u0441 {firstname}", {firstname: ae.short_name}));
                } else {
                    zb.set(xd, oc._("{firstname} \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b \u0434\u043b\u044f \u0432\u0438\u0434\u0435\u043e\u0437\u0432\u043e\u043d\u043a\u0430", {firstname: ae.short_name}));
                    this._hideVideoCallouts();
                }
            }.bind(this));
        } else {
            zb.set(xd, "\u0412\u044b \u0434\u043e\u043b\u0436\u043d\u044b \u0431\u044b\u0442\u044c \u0432 \u0441\u0435\u0442\u0438 \u0434\u043b\u044f \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u0437\u0432\u043e\u043d\u043a\u0430.");
            this._hideVideoCallouts();
        }
    }, _hideVideoCallouts: function () {
        this._contextualDialogController.hideVideoCallouts();
    }, _updatePrivacyLink: function (wd) {
        var xd;
        if (wd == u.OFFLINE) {
            xd = "\u0412\u043e\u0439\u0442\u0438 \u0432 \u0441\u0435\u0442\u044c";
            if (p.get('chat_react_option_menu')) {
                this._reactChatTabMenu.isMounted() && this._reactChatTabMenu.setProps({privacyText: xd});
            } else ja.setContent(this._privacyLink, xd);
            return;
        }
        var yd = this._getCanonicalUserID();
        if (!yd)return;
        var zd = 'fbid:' + yd;
        ya.get(zd, function (ae) {
            if (wd == u.BLOCKED) {
                xd = oc._("\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0427\u0430\u0442 \u0441 {name}", {name: ae.short_name});
            } else xd = oc._("\u041e\u0442\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0427\u0430\u0442 \u0441 {name}", {name: ae.short_name});
            if (p.get('chat_react_option_menu')) {
                this._reactChatTabMenu.isMounted() && this._reactChatTabMenu.setProps({privacyText: xd});
            } else ja.setContent(this._privacyLink, xd);
        }.bind(this));
    }, _unsubscribeToThread: function () {
        if (!vc.isEmptyLocalThread(this._threadID)) {
            var wd = qc.constructLogMessageObject(za.CHAT_WEB, this._threadID, xa.UNSUBSCRIBE, {removed_participants: [ya.user]});
            qc.sendMessage(wd);
        }
        sd.inform('unsubscribed', this._threadID);
        return true;
    }, _initializeUploader: function (wd) {
        this._subscriptionsHandler.addSubscriptions(wd.subscribe(['all-uploads-completed', 'upload-canceled'], function () {
            pd(this);
        }.bind(this)), wd.subscribe('dom-updated', function () {
            qd(this);
        }.bind(this)), wd.subscribe('submit', function () {
            this._focusInput();
        }.bind(this)));
    }, _initializeReactMenu: function (wd) {
        var xd = this._getNode('menuContainer'), yd = va.isMultichat(this._threadID), zd = vc.isNewEmptyLocalThread(this._threadID), ae = this._sheetController.openAddFriendsSheet.bind(this._sheetController);
        if (xd)this._reactChatTabMenu = jb.renderComponent(jb.createElement(y, {onFileUploaderMounted: this.setFileUploader.bind(this), updatePrivacyLinkFunc: this._updatePrivacyLink.bind(this), nameConversationFunc: this._nameConversationLinkClicked.bind(this), showParticipantsFunc: this._showParticipantsClicked.bind(this), leaveConversationFunc: this._unsubscribeLinkClicked.bind(this), clearHistoryFunc: this._clearHistory.bind(this), reportSpamFunc: this._reportSpamClicked.bind(this), createGroupFunc: this._createGroupClicked.bind(this), isMultichat: yd, isEmptyChat: zd, showAddFriend: ae, threadID: this._threadID, attachmentsShelf: wd, onUploadFinished: pd.bind(this, this), onUpdateAttachmentsShelf: qd.bind(this, this), onSubmit: this._focusInput.bind(this), enableDesktopNotif: function () {
            this._enableDesktopNotif();
        }.bind(this)}), xd);
    }, setFileUploader: function (wd) {
        this._fileUploader = wd;
    }, _initializeAutoSendPhotoUploader: function () {
        this._photoUploader = jb.renderComponent(jb.createElement(t, {onSubmit: this._handlePUSubmit.bind(this), onAllUploadsComplete: this._handlePUAllUploadsCompleted.bind(this), onLastUploadFail: this._handlePULastUploadFailed.bind(this), onLastUploadCancel: this._handlePULastUploadCanceled.bind(this)}), this._getNode('photoUploaderContainer'));
    }, _handlePUSubmit: function (wd, xd) {
        rd(this, gb.UPLOAD_START, xd);
        kd(this, '', [], function (yd) {
            if (this._threadID !== yd.thread_id) {
                this._newThreadIDFromPhotoUpload = yd.thread_id;
                if (this._messagesView)this._messagesView.setNewThreadID(yd.thread_id);
            }
            yd.content_attachment = null;
            qc.updateNewMessage(yd, xd.upload_id, xd);
            qc.sendMessage(yd);
        }.bind(this));
        this._focusInput();
    }, _handlePULastUploadFailed: function (wd, xd) {
        rd(this, gb.CLIENT_ERROR, xd);
        vd(xd);
        var yd = "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u043d\u0435 \u0443\u0434\u0430\u043b\u0430\u0441\u044c", zd = "\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044c, \u0447\u0442\u043e \u0432\u044b \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0435 \u043f\u0440\u0438\u0433\u043e\u0434\u043d\u0443\u044e \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u044e.";
        new ha().setTitle(yd).setBody(zd).setButtons(ha.OK).show();
    }, _handlePULastUploadCanceled: function (wd, xd) {
        rd(this, gb.CANCEL_DURING_UPLOAD, xd);
        vd(xd);
    }, _handlePUAllUploadsCompleted: function (wd, xd) {
        rd(this, gb.ALL_UPLOADS_DONE, xd);
        var yd = qc.updateMessageAfterUpload(xd.upload_id, xd);
        qc.clearUploadedMessage(xd.upload_id);
        qc.sendMessage(yd);
        var zd = xd.image_ids.length || xd.attachments.length;
        jd(this, zd);
    }, _stickerSelected: function (wd) {
        kd(this, '', [], function (xd) {
            xd.has_attachment = true;
            xd.sticker_id = wd;
            qc.sendMessage(xd);
            this.focus();
        }.bind(this));
        this._messagesView && this._messagesView.scrollToBottom();
    }, _emoticonSelected: function (wd) {
        var xd = na.symbols[wd];
        if (!xd)return;
        if (p.get('chat_react_input')) {
            this._chatInput.insertEmoticon(xd);
            return;
        }
        this._selectionPosition = this._selectionPosition || new lb(this._getNode('input'));
        var yd = xb.getInstance(this._getNode('input')), zd = yd.getValue(), ae = oa.insertEmoticon(xd, zd, this._selectionPosition.getPos());
        yd.setValue(ae.result);
        this._selectionPosition.setPos(ae.start, ae.end);
    }, _clearStickerSearchNUXIndicator: function () {
        fa.removeClass(this._getNode('emoticonIndicator'), 'nux');
    }, _orionTriggered: function () {
        kd(this, '', [], function (wd) {
            this.focus();
        }.bind(this));
        this._messagesView && this._messagesView.scrollToBottom();
    }, _addStickerSearchNUXIndicator: function () {
        fa.addClass(this._getNode('emoticonIndicator'), 'nux');
        zc = false;
    }, _clearStickerSearchNUXTooltip: function () {
        this._stickerSearchNUXTooltip && this._stickerSearchNUXTooltip.hideNUX();
    }, _onFlyoutShown: function (wd) {
        if (p.get('chat_react_sticker_button')) {
            var xd = this._stickersFlyout.props.packID;
            if (xd !== ob.SEARCH_PACK_ID)this.focus();
        }
        if (nb.WebStickerTrigger && this._triggeredWord && !this._userUsedTrigger) {
            m.log('StickersLoggerConfig', {event: 'sticker_trigger_activated', triggeredword: this._triggeredWord, triggerused: true});
            this._userUsedTrigger = true;
            this._stickersFlyout.setProps({packID: ob.SEARCH_PACK_ID, trigger: this._triggeredWord}, wd);
            this._setStickerTrigger(null);
        } else wd();
        this._stickersFlyoutShown = true;
    }, _onFlyoutHidden: function () {
        this._stickersFlyoutShown = false;
        this.focus();
        if (nb.WebStickerTrigger)this._chatInput.setProps({triggeredWord: null});
    }, _onTriggerChanged: function (wd) {
        this._triggeredWord = wd;
        this._chatInput.setProps({triggeredWord: wd});
    }});
    function vd(wd) {
        var xd = qc.updateMessageAfterUpload(wd.upload_id, wd);
        qc.clearUploadedMessage(wd.upload_id);
        qc.deleteMessages(xd.thread_id, [xd.message_id]);
        qc.deleteLocalMessage(xd.thread_id);
    }

    e.exports = sd;
}, null);
__d("MercuryNotificationRenderer", ["MercuryAssert", "MercuryParticipants", "tx", "MercuryMessages", "MercuryThreads"], function (a, b, c, d, e, f, g, h, i) {
    var j = b('MercuryMessages').get(), k = b('MercuryThreads').get();

    function l(m, n) {
        g.isThreadID(m);
        k.getThreadMeta(m, function (o) {
            j.getThreadMessagesRange(m, 0, 1, function (p) {
                var q = p.length && p[p.length - 1];
                if (q && q.author != h.user) {
                    h.get(q.author, function (r) {
                        if (o.name) {
                            n(i._("{senderName} \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u043b \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0434\u043b\u044f {groupName}", {senderName: r.short_name, groupName: o.name}));
                        } else n(i._("\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0442 {name}", {name: r.short_name}));
                    });
                } else n("\u041d\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435!");
            });
        });
    }

    e.exports = {renderDocumentTitle: l};
}, null);
__d("ChatTitleBarBlinker", ["ChatActivity", "DocumentTitle", "JSLogger", "MercuryNotificationRenderer", "PresenceState", "MercuryThreadInformer", "MercuryTimestampTracker"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = b('MercuryThreadInformer').get(), m = b('MercuryTimestampTracker').get(), n = i.create('chat_title'), o = null, p = 0, q = false;

    function r() {
        if (o) {
            o.stop();
            o = null;
            return true;
        }
        return false;
    }

    function s(x) {
        var y = x || m.getLastUserMessageTimestamp();
        if (p <= y) {
            p = y;
            if (r() || q)k.doSync();
        }
    }

    var t = {blink: function (x, y) {
        if (!o && p < y)j.renderDocumentTitle(x, function (z) {
            if (!o)o = h.blink(z);
        });
    }, stopBlinking: function () {
        s();
    }, blinkingElsewhere: function () {
        q = true;
    }};

    function u(x) {
        var y = k.verifyNumber(x.sb2);
        if (!y || y <= p)return null;
        return y;
    }

    function v(x) {
        var y = x && u(x);
        if (y) {
            p = y;
            n.debug('load', p);
            r();
            q = false;
        }
    }

    function w(x) {
        var y = u(x);
        if (!y) {
            n.debug('store', p);
            x.sb2 = p;
            q = false;
        }
        return x;
    }

    k.registerStateStorer(w);
    k.registerStateLoader(v);
    l.subscribe('thread-read-changed', function (x, y) {
        var z = m.getLastUserMessageTimestamp(), aa = 0;
        for (var ba in y)if (y[ba].mark_as_read && y[ba].timestamp >= z && y[ba].timestamp > aa)aa = y[ba].timestamp;
        aa && s(aa);
    });
    g.subscribe('activity', function () {
        s();
    });
    (function () {
        var x = k.getInitial();
        if (x)p = u(x) || 0;
    })();
    e.exports = t;
}, null);
__d("ChatNewMessageHandler", ["ArbiterMixin", "ChatActivity", "ChatMentionsNotifications", "ChatTabModel", "ChatTabView", "JSLogger", "MercuryAssert", "MercuryBrowserAlerts", "UserActivity", "MercuryConfig", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = l.create('chat_new_message'), s = {_raiseNewMessageTab: function (t, u) {
        var v = j.getTab(t), w = false;
        if (v) {
            w = v.raised;
        } else w = true;
        s.inform('chat/new-message-from-server', {thread_id: t});
        u.to_new_tab = !v;
        u.to_raised_tab = !!w;
    }, _notify: function (t, u, v) {
        if (p.DesktopNotificationsGK)i.notifyIfMessageToMe(u);
        var w = k.get(t);
        v.view_is_visible = w && w.isVisible();
        v.view_is_focused = w && w.isFocused();
        if (!v.view_is_visible)r.log('message_to_hidden');
        v.is_active = h.isActive();
        n.messageReceived(u);
    }, newMessage: function (t, u, v) {
        m.isThreadID(t);
        var w = {thread_id: t, message_id: u.message_id};
        this._raiseNewMessageTab(t, w);
        this._notify(t, u, w);
        r.log('message', w);
    }};
    q(s, g);
    n.subscribe('before-alert', function (t, event) {
        var u = event.threadID, v = k.get(u), w = j.getTab(u);
        if (w && w.raised && v && v.isVisible() && v.isFocused() && o.isActive()) {
            v.tryMarkAsRead();
            event.cancelAlert();
        }
    });
    e.exports = s;
}, null);
__d("ChatTabLRUManager", ["ChatTabView", "ChatTabModel", "MercuryThreads"], function (a, b, c, d, e, f, g, h) {
    var i = b('MercuryThreads').get(), j = {getLRUVisibleTab: function (k) {
        if (k.hasRoomForRaisedTab())return undefined;
        var l = Object.keys(k.getTabsToShow() || {}), m = 1 * 60, n = null, o = Infinity;
        for (var p = 0; p < l.length; p++) {
            var q = l[p], r = i.getThreadMetaNow(q);
            if (h.isTabPromoted(q))continue;
            if (!g.get(q).hasEmptyInput() || !r)continue;
            var s = (h.getServerTime() - r.timestamp) / 1000;
            if (!r.timestamp || (r.timestamp && r.timestamp < o && s > m)) {
                n = r.thread_id;
                o = r.timestamp;
            }
        }
        return n;
    }};
    e.exports = j;
}, null);
__d("ChatTabPolicy", ["ChatBehavior", "JSLogger", "MercuryActionTypeConstants", "MercuryLogMessageType", "MercuryAssert", "MercuryParticipants", "MercuryParticipantTypes", "MercurySourceType", "MercuryThreadMode", "MercuryThreadMuter", "MessagingTag", "PresencePrivacy", "ShortProfiles", "MercuryUnseenState"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t = b('MercuryUnseenState').get(), u = h.create('tab_policy');

    function v(w, x) {
        t.markThreadSeen(w, x);
    }

    e.exports = {messageIsAllowed: function (w, x, y) {
        var z = w.thread_id, aa = x.message_id;
        k.isThreadID(z);
        k.isParticipantID(x.author);
        var ba;
        if (p.isThreadMuted(w)) {
            ba = {thread_id: z, message_id: aa, mute_settings: w.mute_settings};
            u.log('message_thread_muted', ba);
            return;
        }
        if (w.mode == o.OBJECT_ORIGINATED) {
            ba = {thread_id: z, message_id: aa, mode: w.mode};
            u.log('message_object_originated', ba);
            return;
        }
        if (x.source == n.EMAIL || x.source == n.TITAN_EMAIL_REPLY) {
            ba = {thread_id: z, message_id: aa, source: x.source};
            u.log('message_source_not_allowed', ba);
            return;
        }
        var ca = l.getUserID(x.author);
        if (!ca) {
            u.log('message_bad_author', {thread_id: z, message_id: aa, user: ca});
            return;
        }
        if (x.action_type != i.USER_GENERATED_MESSAGE && !this._messageIsNewlyCreatedGroup(x, w)) {
            ba = {thread_id: z, message_id: aa, type: x.action_type};
            u.log('message_non_user_generated', ba);
            return;
        }
        if (w.is_canonical_user && !g.notifiesUserMessages()) {
            u.log('message_jabber', {thread_id: z, message_id: aa});
            v(z, true);
            return;
        }
        if (w.is_canonical && !w.canonical_fbid) {
            u.log('message_canonical_contact', {thread_id: z, message_id: aa});
            return;
        }
        if (w.folder != q.INBOX) {
            u.log('message_folder', {thread_id: z, message_id: aa, folder: w.folder});
            return;
        }
        var da = l.getUserID(l.user);
        s.getMulti([ca, da], function (ea) {
            if (!r.allows(ca)) {
                u.log('message_privacy', {thread_id: z, message_id: aa, user: ca});
                return;
            }
            var fa = ea[ca].employee && ea[da].employee;
            if (!fa && ea[ca].type !== m.FRIEND) {
                u.log('message_non_friend', {thread_id: z, message_id: aa, user: ca});
                return;
            }
            y();
        });
    }, _messageIsNewlyCreatedGroup: function (w, x) {
        return w.action_type === i.LOG_MESSAGE && w.log_message_type === j.THREAD_NAME && x.message_count === 1;
    }};
}, null);
__d("ChatTabViewSelector", ["Event", "Arbiter", "CSS", "DataStore", "DOM", "MenuDeprecated", "NubController", "ChatTabTemplates", "Toggler", "copyProperties", "MercuryThreadInformer", "MercuryThreads", "MercuryThreadMetadataRenderer"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = b('MercuryThreadInformer').get(), r = b('MercuryThreads').get(), s = b('MercuryThreadMetadataRenderer').get();

    function t(u) {
        var v = n[':fb:chat:tab:selector'].build(), w = v.getRoot(), x = v.getNode('menu'), y = k.find(x, '.uiMenuInner'), z = {}, aa = new m().init(w);
        i.hide(w);
        k.insertBefore(u, w);
        function ba(ea) {
            var fa = 0;
            for (var ga in z) {
                var ha = z[ga], ia = r.getThreadMetaNow(ga), ja = ha.getNode('unreadCount'), ka = (ia && ia.unread_count) || 0;
                fa += ka;
                if (ka > 9)ka = '+';
                i.conditionClass(ja, 'invisible_elem', !ka);
                k.setContent(ja, ka);
            }
            var la = v.getNode('numMessages');
            i.conditionShow(la, fa);
            k.setContent(la, fa);
        }

        this.setTabData = function (ea) {
            z = {};
            if (ea.length < 1) {
                i.hide(w);
                return;
            }
            i.show(w);
            k.empty(y);
            ea.forEach(function (fa) {
                var ga = n[':fb:chat:tab:selector:item'].build();
                z[fa.id] = ga;
                var ha = ga.getNode('content');
                s.renderAndSeparatedParticipantList(fa.id, ha);
                k.prependContent(y, ga.getRoot());
                j.set(ga.getRoot(), 'threadID', fa.id);
                var ia = ga.getNode('closeButton');
                g.listen(ia, 'click', function (event) {
                    t.inform('selector/close-tab', fa.id);
                    event.kill();
                });
            });
            aa.flyoutContentChanged();
            k.setContent(v.getNode('numTabs'), ea.length);
            ba();
        };
        function ca(event, ea) {
            if (ea.menu != x)return;
            var fa = j.get(ea.item, 'threadID');
            t.inform('selected', fa);
            o.hide(w);
        }

        function da(event, ea) {
            l.register(x);
        }

        l.subscribe('select', ca.bind(this));
        o.listen('show', w, function () {
            h.inform('layer_shown', {type: 'ChatTabSelector'});
            da();
        });
        o.listen('hide', w, function () {
            h.inform('layer_hidden', {type: 'ChatTabSelector'});
        });
        q.subscribe('threads-updated', ba);
    }

    p(t, new h());
    e.exports = t;
}, null);
__d("ChatTabController", ["Arbiter", "ChatActivity", "ChatConfig", "ChatNewMessageHandler", "ChatTabLRUManager", "ChatTabMessagesView", "ChatTabModel", "ChatTabPolicy", "ChatTabView", "ChatTabViewSelector", "JSLogger", "MercuryConfig", "MercuryParticipants", "StickerState", "Style", "UserAgent_DEPRECATED", "VideoCallCore", "ChatTabPresence", "ChatTypeaheadBehavior", "MercuryThreadInformer", "MercuryThreads", "MercuryUnseenState"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
    b('ChatTabPresence');
    b('ChatTypeaheadBehavior');
    var x = b('MercuryThreadInformer').get(), y = b('MercuryThreads').get(), z = b('MercuryUnseenState').get(), aa = i.get('tab_auto_close_timeout') || 7200000, ba = q.create('tab_controller');

    function ca(qa) {
        y.changeThreadReadStatus(qa, true);
        da(qa);
    }

    function da(qa) {
        z.markThreadSeen(qa);
    }

    function ea(qa, ra, sa) {
        var ta = m.get().tabs;
        qa += ra ? 1 : -1;
        while (qa >= 0 && qa < ta.length) {
            var ua = ta[qa], va = o.get(ua.id);
            if (va && va.isVisible() && (!sa || ua.raised)) {
                va.focus();
                return true;
            }
            qa += ra ? 1 : -1;
        }
        return false;
    }

    function fa(qa, ra) {
        var sa = ra && ra.getRightmostHiddenTab();
        if (sa === qa)return null;
        return sa;
    }

    function ga() {
        return Math.floor(Math.random() * 2147483648).toString(16);
    }

    function ha(qa, ra, sa, ta) {
        m.raiseTab(qa, true, sa);
        var ua = ra && ra.getLeftmostVisibleTab(), va = ra && ra.getTabsToShow();
        if (va && !va[qa] && ua) {
            m.promoteThreadInPlaceOfThread(qa, ua, fa(qa, ra), true);
        } else m.setPromotedTab(qa);
        g.inform('chat/open-tab', qa);
        var wa = o.get(qa);
        wa && wa.focus();
    }

    function ia(qa, ra, sa) {
        var ta = sa.forceDrop();
        if (!m.getTab(qa))m.raiseTab(qa, false);
        if (ta)return;
        var ua = ra && k.getLRUVisibleTab(ra), va = ra && ra.getTabsToShow();
        if (va && !va[qa] && ua)m.promoteThreadInPlaceOfThread(qa, ua, fa(qa, ra));
    }

    function ja(qa, ra) {
        var sa = m.indexOf(qa);
        m.closeTab(qa, ra);
        return sa;
    }

    function ka(qa, ra) {
        j.subscribe('chat/new-message-from-server', function (ab, bb) {
            ia(bb.thread_id, qa, ra);
        });
        p.subscribe('selected', function (ab, bb) {
            ha(bb, qa);
        });
        g.subscribe('chat/tabs-order-changed', function (ab, bb) {
            m.changeShowingTabs(bb);
        });
        g.subscribe('page_transition', function (ab, bb) {
            m.closeFragileTabs();
        });
        g.subscribe('chat/close-all-tabs', function () {
            m.closeAllTabs();
        });
        g.subscribe('chat-visibility/go-offline', function () {
            m.closeAllTabs();
        });
        o.subscribe('read', function (event, ab) {
            ca(ab);
        });
        h.subscribe('idle', function (ab, bb) {
            if (bb > aa) {
                var cb = m.get().tabs;
                cb.forEach(function (db) {
                    var eb = db.id;
                    y.getThreadMeta(eb, function (fb) {
                        if (!fb.unread_count) {
                            ba.log('autoclose_idle_seen', {thread_id: eb, idleness: bb});
                            m.closeTab(eb, 'autoclose_idle_seen');
                        }
                    });
                });
            }
        });
        o.subscribe('nub-activated', function (ab, bb) {
            ha(bb, qa);
        });
        o.subscribe('lower-activated', function (ab, bb) {
            m.lowerTab(bb);
            var cb = o.get(bb);
            cb && cb.focus();
        });
        o.subscribe('focus-tab', function (ab, bb) {
            var cb = m.getTab(bb);
            if (cb && cb.raised)ha(bb, qa, cb.signatureID, true);
        });
        function sa(ab, bb) {
            w.showOutgoingCallDialog(bb.userID, bb.clickSource);
            m.lowerTab(bb.threadID);
        }

        o.subscribe('video-call-clicked', sa);
        l.subscribe('video-call-clicked', sa);
        l.subscribe('interaction-with-tab', function (ab, bb) {
            var cb = m.getTab(bb);
            cb && cb.raised && da(bb);
        });
        o.subscribe('closed-tab', function (ab, bb) {
            ba.log('close_view', {thread_id: bb});
            ja(bb, 'close_view');
            return false;
        });
        o.subscribe('thread-deleted', function (ab, bb) {
            ba.log('close_thread_deleted', {thread_id: bb});
            ja(bb, 'close_thread_deleted');
            return false;
        });
        o.subscribe('unsubscribed', function (ab, bb) {
            ba.log('close_view_unsubscribed', {thread_id: bb});
            ja(bb, 'close_view_unsubscribed');
            return false;
        });
        o.subscribe('esc-pressed', function (ab, bb) {
            ba.log('close_esc', {thread_id: bb});
            var cb = ja(bb, 'close_esc');
            setTimeout(function () {
                ea(cb - 1, true, true) || ea(cb, false, true);
            }, 0);
        });
        p.subscribe('selector/close-tab', function (ab, bb) {
            ba.log('close_chat_from_selector', {thread_id: bb});
            ja(bb, 'close_chat_from_selector');
        });
        x.subscribe('messages-received', function (ab, bb) {
            for (var cb in bb) {
                var db = bb[cb];
                for (var eb = 0; eb < db.length; eb++) {
                    var fb = db[eb];
                    if (fb.author != s.user) {
                        if (!fb.is_unread) {
                            ba.log('message_already_read', {action_id: fb.action_id, thread_id: fb.thread_id});
                            continue;
                        }
                        y.getThreadMeta(cb, function (gb) {
                            n.messageIsAllowed(gb, fb, function () {
                                j.newMessage(cb, fb, qa);
                            });
                        });
                    }
                }
            }
        });
        x.subscribe('thread-read-changed', function (ab, bb) {
            for (var cb in bb)if (!bb[cb].mark_as_read) {
                ba.log('autoclose_marked_unread', {thread_id: cb});
                m.closeTab(cb, 'autoclose_marked_unread');
            }
        });
        o.subscribe('tab-pressed', function (ab, bb) {
            return !ea(m.indexOf(bb.id), bb.shiftPressed);
        });
        g.subscribe(q.DUMP_EVENT, function (ab, bb) {
            bb.chat_controller = {auto_close_timeout: aa};
        });
        this.openTab = function (ab, bb) {
            ha(ab, bb, ga());
        };
        var ta, ua, va = [], wa = [], xa = [], ya;
        if (t.shouldShowStickerSearchNUXTooltip()) {
            ta = qa.getRightmostRaisedTab();
            if (ta) {
                ya = o.get(ta);
                ya.showStickerSearchNUXTooltip();
            } else g.subscribeOnce('chat/open-tab', function (ab, bb) {
                ya = o.get(bb);
                ya.showStickerSearchNUXTooltip();
            });
        } else if (r.ShowOrionNUXTooltip) {
            va = qa.getRaisedVisibleTabs();
            for (var za = 0; za < va.length; za++) {
                ua = o.get(va[za]);
                if (ua.isOrionNUXEligible())wa.push(ua);
            }
            if (wa.length) {
                xa = wa.map(function (ab) {
                    return ab.getParticipantIDForOrionNUX();
                });
                s.getMulti(xa, function (ab) {
                    for (var bb in ab)if (ab[bb].orion_eligible) {
                        ya = wa.filter(function (cb) {
                            return cb._getCanonicalUserID() === s.getUserID(ab[bb].id);
                        })[0];
                        break;
                    }
                    if (ya)ya.showOrionNUXTooltip();
                });
            }
        }
    }

    if (v.firefox()) {
        var la = function () {
            return u.get(document.body, 'overflowX') + ' ' + u.get(document.body, 'overflowY');
        }, ma = la(), na = function () {
            var qa = la();
            if (qa !== ma) {
                ma = qa;
                g.inform('overflow-applied-to-body');
            }
        };
        if ('MutationObserver' in window) {
            var oa = new MutationObserver(na), pa = {attributes: true, attributeFilter: ['class', 'style']};
            oa.observe(document.documentElement, pa);
        } else document.documentElement.addEventListener('DOMAttrModified', function (event) {
            if (event.getTarget() === document.documentElement && (event.attrName === 'class' || event.attrName === 'style'))na();
        }, false);
    }
    e.exports = ka;
}, null);
__d("ChatTabViewCoordinator", ["Arbiter", "BanzaiODS", "Bootloader", "ChatTabModel", "ChatTabView", "ChatTabViewSelector", "CSS", "JSLogger", "Style", "Rect", "VideoCallSupport", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = n.create('chat_tab_coordinator'), t, u;

    function v(w, x) {
        var y = new l(w), z = {}, aa = {}, ba = false;

        function ca() {
            var oa = j.get(), pa = {};
            oa.tabs.forEach(function (ra) {
                pa[ra.id] = 1;
            });
            s.log('process_tab_changed', {model_tabs: Object.keys(pa), view_tabs: Object.keys(z)});
            for (var qa in z)if (!pa[qa]) {
                s.log('remove_tab', {tab_id: qa});
                z[qa].destroy();
                delete(z[qa]);
            }
            da(oa);
            ma(oa);
            if (oa.tabNeedsFocus && !oa.tabNeedsFocus.isFocused())oa.tabNeedsFocus.focus();
        }

        function da(oa) {
            var pa = null;
            oa.tabs.forEach(function (qa) {
                var ra = qa.id, sa = false;
                if (!z[ra]) {
                    s.log('add_tab', {tab_id: ra});
                    z[ra] = new k(ra, qa.server_id, qa.signatureID, w, pa);
                    sa = true;
                } else z[ra].updateSignatureID(qa.signatureID);
                if (z[ra].isFocused())oa.tabNeedsFocus = z[ra];
                if (!sa && !z[ra].nextTabIs(pa)) {
                    var ta = z[ra].getScrollTop();
                    if (pa) {
                        z[ra].insertBefore(pa);
                    } else z[ra].appendTo(w);
                    if (ta)z[ra].setScrollTop(ta);
                }
                pa = z[ra];
            });
        }

        function ea() {
            var oa = x.getShowingTabsOrder();
            if (!oa || !oa.length)return;
            var pa = z[oa[0].id]._tabElem, qa = z[oa[oa.length - 1].id]._tabElem, ra = parseInt(o.get(qa, 'margin-left'), 10) || 0, sa = p.getElementBounds(qa).l - 2 * ra;
            sa = sa > 0 ? sa : 0;
            t && t.setBoundingBox(new p(0, p.getElementBounds(pa).r, 0, sa));
        }

        function fa(oa, pa) {
            var qa = false;
            pa.forEach(function (ta) {
                if (ta.raised) {
                    if (aa[ta.id]) {
                        qa = true;
                        delete aa[ta.id];
                    }
                } else if (!aa[ta.id]) {
                    qa = true;
                    aa[ta.id] = true;
                }
            });
            if (qa)return true;
            if (!t)return true;
            var ra = ga() || [];
            if (ra.length !== oa.length)return true;
            for (var sa = 0; sa < oa.length; sa++)if (ra[sa] !== oa[sa].id)return true;
            return false;
        }

        function ga() {
            var oa = t && t.getOrder();
            oa && oa.reverse();
            return oa;
        }

        function ha() {
            var oa = ga();
            if (oa) {
                h.bumpEntityKey('chat.web', 'tab.drag_order_changed');
                g.inform('chat/tabs-order-changed', oa);
            }
        }

        function ia(oa, pa, qa) {
            if (z[qa]._scrollTop != null)z[qa].setScrollTop(z[qa]._scrollTop);
        }

        function ja(oa, pa) {
            u = pa;
            z[pa]._isDragDropActive = true;
            z[pa]._scrollTop = z[pa].getScrollTop();
            o.set(z[pa]._tabElem, 'z-index', 1);
            ea();
            h.bumpEntityKey('chat.web', 'tab.drag_started');
        }

        function ka(oa) {
            o.set(z[oa]._tabElem, 'z-index', '');
            if (z[oa]._scrollTop != null)z[oa].setScrollTop(z[oa]._scrollTop);
            z[oa]._scrollTop = null;
            u = null;
            setTimeout(function () {
                z[oa]._isDragDropActive = false;
            }, 0);
        }

        function la(oa) {
            i.loadModules(["SortableGroup"], function (pa) {
                var qa = x.getShowingTabsOrder(), ra = fa(qa, oa);
                if (qa.length <= 1) {
                    t && t.removeAllSortables();
                    return;
                }
                if (ra) {
                    if (t) {
                        t.removeAllSortables();
                    } else t = new pa().setBeforeGrabCallback(ja).setDragOverCallback(ia).setDropCallback(ka).setOrderChangeHandler(ha).setUseScroller(false).setDragOverHorizontally();
                    for (var sa = 0; sa < qa.length; sa++) {
                        var ta = qa[sa];
                        t.addSortable(ta.id, z[ta.id]._tabElem, aa[ta.id] ? null : z[ta.id]._titlebar);
                    }
                }
            });
        }

        function ma(oa) {
            var pa = x.getTabsToShow(oa), qa = [], ra = false;
            oa.tabs.forEach(function (sa) {
                if (!pa[sa.id]) {
                    z[sa.id].setVisibleState(false, sa.raised);
                    qa.push(sa);
                }
            });
            oa.tabs.forEach(function (sa) {
                if (pa[sa.id]) {
                    z[sa.id].setVisibleState(true, sa.raised);
                    ra |= sa.raised;
                }
            });
            y.setTabData(qa);
            na(ra);
            la(oa.tabs);
        }

        function na(oa) {
            if (!oa && ba) {
                g.inform('layer_hidden', {type: 'ChatTab'});
                ba = false;
            } else if (oa && !ba) {
                g.inform('layer_shown', {type: 'ChatTab'});
                ba = true;
            }
        }

        if (q.isVideoCallSupported())m.addClass(w, 'videoCallEnabled');
        x.subscribe('tabs-changed', ca);
        ca();
    }

    r(v.prototype, {forceDrop: function () {
        if (t && u) {
            t.forceDrop(u);
            u = null;
            return true;
        }
        return false;
    }});
    e.exports = v;
}, null);
__d("MercuryStateCheck", ["Arbiter", "ChannelConstants", "MercuryFolders", "MessagingTag", "URI", "copyProperties", "MercuryServerRequests"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = b('MercuryServerRequests').get(), n = l(new g(), {initialize: function () {
        g.subscribe(h.ON_INVALID_HISTORY, o);
        d(['ChannelConnection'], function (p) {
            p.subscribe(p.CONNECTED, function (q, r) {
                if (!r.init)o();
            });
        });
    }});

    function o() {
        var p;
        if (k.getRequestURI().getPath().search(/messages/) !== -1) {
            p = i.getSupportedFolders();
        } else p = [j.INBOX];
        m.fetchMissedMessages(p);
    }

    n.initialize();
    e.exports = n;
}, null);
__d("ChatApp", ["CSS", "JSLogger"], function (a, b, c, d, e, f, g, h) {
    var i = {init: function (j, k, l) {
        if (this._isInitialized) {
            h.create('chat_app').error('repeated_init');
            return;
        }
        this._rootElem = j;
        d(['TabsViewport', 'ChatTabController', 'ChatTabViewCoordinator', 'MercuryServerRequests', 'MercuryChannelHandler', 'MercuryStateCheck'], function (m, n, o, p, q, r) {
            q = q.get();
            q.turnOn();
            p.get().handleUpdate(l);
            this.tabsViewport = new m(k);
            this.tabViewCoordinator = new o(k, this.tabsViewport);
            this.tabController = new n(this.tabsViewport, this.tabViewCoordinator);
            this._isInitialized = this._isLoaded = true;
        }.bind(this));
    }, isInitialized: function () {
        return !!this._isInitialized;
    }, isHidden: function () {
        return !this._isInitialized || this._isHidden;
    }, hide: function () {
        if (this.isHidden())return;
        g.hide(this._rootElem);
        this._isHidden = true;
    }, unhide: function () {
        if (this._isInitialized) {
            if (this._isHidden) {
                g.show(this._rootElem);
                this.tabsViewport.checkWidth();
                d(['Dock'], function (j) {
                    j.resizeAllFlyouts();
                });
                this._isHidden = false;
            }
        } else if (!this._isLoaded) {
            d(['UIPagelet'], function (j) {
                j.loadFromEndpoint('ChatTabsPagelet', 'ChatTabsPagelet');
                j.loadFromEndpoint('BuddylistPagelet', 'BuddylistPagelet');
            });
            this._isLoaded = true;
        }
    }};
    e.exports = i;
}, null);