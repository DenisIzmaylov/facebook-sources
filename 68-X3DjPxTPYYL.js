/*!CK:62111867!*//*1411981873,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["P4qa4"]);
}

__d("flash-js", ["copyProperties"], function (a, b, c, d, e, f, g) {
    function h() {
    }

    g(h, {INIT: 'flash/init', READY: 'flash/ready', FAILED: 'flash/failed'});
    e.exports = h;
}, null);
__d("legacy:flash-js", ["flash-js"], function (a, b, c, d) {
    a.Flash = b('flash-js');
}, 3);
__d("getLayoutRoot", ["DOMQuery", "csx"], function (a, b, c, d, e, f, g, h) {
    var i = null;

    function j() {
        if (!i)i = g.scry(document.body, "._li")[0];
        return i;
    }

    e.exports = j;
}, null);
__d("PhotoUtils", ["Event", "URI"], function (a, b, c, d, e, f, g, h) {
    var i = {getImagesFromData: function (j) {
        var k = [];
        for (var l in j)if (l.indexOf('image') === 0)k.push(j[l]);
        return k;
    }, getFBIDFromData: function (j) {
        return j && j.id;
    }, getOriginalImageFromData: function (j) {
        return j.original || j.download_image;
    }, getDownloadURLFromData: function (j) {
        var k = this.getOriginalImageFromData(j);
        if (!k)return null;
        var l = new h(k.uri);
        l.addQueryData({dl: 1});
        return l;
    }, getPermalinkFromData: function (j) {
        return j.permalink;
    }, canViewerMakeCoverPhoto: function (j) {
        return !!j.can_viewer_make_cover_photo;
    }, getCoverPhotoURLFromData: function (j) {
        return new h('/profile.php').addQueryData({preview_cover: i.getFBIDFromData(j)});
    }, preload: function (j, k, l) {
        var m = j.getDimensions();
        for (var n = 0; n < k.length; ++n) {
            var o = m.getBestFitImageFromPhoto(k[n], m.getMaxStageDimensions()), p = new Image();
            l && g.listen(p, 'load', l.bind(null, k[n]));
            j.getLogger().log(o.uri);
            p.src = o.uri;
        }
    }};
    e.exports = i;
}, null);
__d("SpotlightViewerClose", ["React", "ReactPropTypes", "TooltipLink.react", "cx", "fbt", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = g.createClass({displayName: 'SpotlightViewerClose', propTypes: {position: h.oneOf(['left', 'right'])}, getDefaultProps: function () {
        return {position: 'right'};
    }, render: function () {
        var n = (this.props.position == 'left') ? "_5wx3" : "_5wx4", o = g.createElement(g.DOM.span, null, "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 Esc \u0434\u043b\u044f \u0432\u044b\u0445\u043e\u0434\u0430");
        return (g.createElement(i, {className: l("_4-o9 _50-m _51an", n), onClick: this.props.onClick, tooltip: o}));
    }});
    e.exports = m;
}, null);
__d("SpotlightViewport", ["Locale", "Parent", "React", "ReactPropTypes", "Vector", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = i.createClass({displayName: 'SpotlightViewport', propTypes: {stageDimensions: j.object.isRequired}, PAGE_TO_PREV_PERCENTAGE: .2, sections: {NONE: null, FORWARD: 1, BACKWARD: 2}, getInitialState: function () {
        return {currentActiveSection: this.sections.NONE, active: true};
    }, _onMouseMove: function (event) {
        var o = k.getEventPosition(event.nativeEvent), p = k.getElementPosition(this.getDOMNode()), q, r = o.x - p.x, s = r / this.props.stageDimensions.x;
        if (g.isRTL()) {
            q = s > (1 - this.PAGE_TO_PREV_PERCENTAGE);
        } else q = s < this.PAGE_TO_PREV_PERCENTAGE;
        if (q) {
            this.setState({currentActiveSection: this.sections.BACKWARD});
        } else this.setState({currentActiveSection: this.sections.FORWARD});
    }, _onClick: function (event) {
        var o = this.state.currentActiveSection == this.sections.FORWARD, p = event.target;
        if (!h.byClass(p, "_51an"))this.props.onClick && this.props.onClick(o);
    }, _onMouseEnter: function () {
        this.setState({active: true});
    }, _onMouseLeave: function () {
        this.setState({active: false});
    }, render: function () {
        var o = (("_4-of") + (!this.state.active && !this.props.active ? ' ' + "_50-l" : '') + (this.state.currentActiveSection === this.sections.BACKWARD ? ' ' + "_516a" : '') + (this.state.currentActiveSection === this.sections.FORWARD ? ' ' + "_516b" : '') + (this.props.showLoadingIndicator ? ' ' + "_51jp" : ''));
        if (this.props.className)o = m(o, this.props.className);
        return (i.createElement(i.DOM.div, {className: o, style: {width: this.props.stageDimensions && this.props.stageDimensions.x, height: this.props.stageDimensions && this.props.stageDimensions.y}, onClick: this._onClick, onMouseMove: this._onMouseMove, onMouseEnter: this._onMouseEnter, onMouseLeave: this._onMouseLeave}, this.props.children, i.createElement(i.DOM.div, {className: "_4-og"}, i.createElement(i.DOM.span, {className: "_4-oh"}), this.props.media, i.createElement(i.DOM.div, {className: "_4-oi"}))));
    }});
    e.exports = n;
}, null);
__d("SpotlightViewerUnmountOnClose", [], function (a, b, c, d, e, f) {
    function g(h) {
        "use strict";
        this.$SpotlightViewerUnmountOnClose0 = h;
    }

    g.prototype.enable = function () {
        "use strict";
        this.$SpotlightViewerUnmountOnClose1 = this.$SpotlightViewerUnmountOnClose0.subscribeOnce('close', this.$SpotlightViewerUnmountOnClose0.unmountComponent.bind(this.$SpotlightViewerUnmountOnClose0));
    };
    g.prototype.disable = function () {
        "use strict";
        this.$SpotlightViewerUnmountOnClose1 && this.$SpotlightViewerUnmountOnClose1.unsubscribe();
        delete this.$SpotlightViewerUnmountOnClose1;
    };
    e.exports = g;
}, null);
__d("PhotoViewerDimensions", ["Event", "PhotoUtils", "Vector", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = {verticalPadding: 'number', horizontalPadding: 'number', normalResDim: 'object'};

    function l(m) {
        "use strict";
        for (var n in m) {
            if (!k[n])throw new Error("Unsupported extraData value '" + n + "' should not be used");
            if (typeof m[n] === k[n])this['_' + n] = m[n];
        }
        this._listener = g.listen(window, 'resize', this._resetMaxStageDimensions.bind(this));
    }

    l.prototype.destroy = function () {
        "use strict";
        this._listener.remove();
    };
    l.prototype.getStageDimensions = function (m) {
        "use strict";
        var n = this.getMaxStageDimensions(), o = new i(Math.min(m.x, n.x), Math.min(m.y, n.y)), p = o.x / o.y, q = m.x / m.y;
        if (p < q) {
            o.y = Math.round(o.x / q);
        } else o.x = Math.round(o.y * q);
        return o;
    };
    l.prototype.getImageDimensionsForStage = function (m, n) {
        "use strict";
        var o = m.x, p = m.y, q = n.x, r = n.y;
        if (o >= q || p >= r) {
            var s = o / p, t = q / r;
            if (t < s) {
                o = q;
                p = Math.round(q / s);
            } else if (t > s) {
                o = Math.round(r * s);
                p = r;
            } else {
                o = q;
                p = r;
            }
        }
        return new i(o, p);
    };
    l.prototype.getMaxStageDimensions = function () {
        "use strict";
        if (!this._maxStageDimensions)this._maxStageDimensions = new i(i.getViewportDimensions().x - this._horizontalPadding, i.getViewportDimensions().y - this._verticalPadding);
        return this._maxStageDimensions;
    };
    l.prototype._resetMaxStageDimensions = function () {
        "use strict";
        this._maxStageDimensions = null;
    };
    l.prototype.getBestFitImageFromPhoto = function (m, n) {
        "use strict";
        var o = null, p = h.getImagesFromData(m);
        p = p.sort(function (r, s) {
            return s.width - r.width;
        });
        if (window.devicePixelRatio && window.devicePixelRatio > 1)n = new i(n.x * window.devicePixelRatio, n.y * window.devicePixelRatio);
        for (var q = 0; q < p.length; q++)if (!o || p[q].width >= n.x || p[q].height >= n.y)o = p[q];
        return o;
    };
    l.prototype.getOriginalDimensionsFromPhoto = function (m) {
        "use strict";
        var n = h.getOriginalImageFromData(m);
        return new i(n.width, n.height);
    };
    l.prototype.getBestFitDimensionsFromPhoto = function (m, n) {
        "use strict";
        var o = this.getBestFitImageFromPhoto(m, n);
        return new i(o.width, o.height);
    };
    l.prototype.getVerticalPadding = function () {
        "use strict";
        return this._verticalPadding;
    };
    l.prototype.getHorizontalPadding = function () {
        "use strict";
        return this._horizontalPadding;
    };
    j(l.prototype, {_verticalPadding: 40, _horizontalPadding: 60, _normalResDim: {x: 960, y: 960}});
    e.exports = l;
}, null);
__d("legacy:swfobject", ["swfobject"], function (a, b, c, d, e, f, g) {
    a.deconcept = g;
    a.SWFObject = g.SWFObject;
    a.showFlashErrorDialog = g.showFlashErrorDialog;
}, 3);
__d("VideoAutoplayControllerX", ["DOMDimensions", "Event", "SubscriptionsHandler", "VideoPlayerReason", "Visibility", "destroyOnUnload", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = null, o = 500;

    function p() {
        "use strict";
        this.$VideoAutoplayControllerX0 = null;
        this.$VideoAutoplayControllerX1 = null;
        this.$VideoAutoplayControllerX2 = new i();
        this.$VideoAutoplayControllerX3 = new i();
        this.$VideoAutoplayControllerX4 = [];
        this.setAutoplayInterval(o);
        l(function () {
            this.$VideoAutoplayControllerX5();
            if (this === n)n = null;
        }.bind(this));
    }

    p.prototype.setAutoplayInterval = function (q) {
        "use strict";
        if (q === this.$VideoAutoplayControllerX6)return;
        this.$VideoAutoplayControllerX6 = q;
        this.$VideoAutoplayControllerX7();
    };
    p.registerVideoUnit = function (q) {
        "use strict";
        if (n == null)n = new p();
        n.$VideoAutoplayControllerX4.push(q);
        n.$VideoAutoplayControllerX8();
        if (q.isVisible())n.$VideoAutoplayControllerX9();
    };
    p.prototype.$VideoAutoplayControllerX5 = function () {
        "use strict";
        this.$VideoAutoplayControllerX2.release();
        this.$VideoAutoplayControllerX3.release();
        this.$VideoAutoplayControllerXa.remove();
        this.$VideoAutoplayControllerXa = null;
    };
    p.prototype.$VideoAutoplayControllerX8 = function () {
        "use strict";
        if (!this.$VideoAutoplayControllerX4.length) {
            this.$VideoAutoplayControllerX3.addSubscriptions(h.listen(window, 'resize', this.$VideoAutoplayControllerX9.bind(this)), h.listen(window, 'blur', this.$VideoAutoplayControllerXb.bind(this)), h.listen(window, 'focus', this.$VideoAutoplayControllerXc.bind(this)), k.addListener(k.HIDDEN, this.$VideoAutoplayControllerXb.bind(this)), k.addListener(k.VISIBLE, this.$VideoAutoplayControllerXc.bind(this)));
            if (!this.$VideoAutoplayControllerXa)this.$VideoAutoplayControllerX7();
        }
    };
    p.prototype.$VideoAutoplayControllerX7 = function () {
        "use strict";
        if (this.$VideoAutoplayControllerXa)this.$VideoAutoplayControllerXa.remove();
        this.$VideoAutoplayControllerXa = h.listen(window, 'scroll', m(this.$VideoAutoplayControllerX9.bind(this), this.$VideoAutoplayControllerX6));
    };
    p.prototype.$VideoAutoplayControllerXd = function () {
        "use strict";
        var q = [];
        this.$VideoAutoplayControllerX4.forEach(function (r) {
            if (r.isVisible()) {
                q.push(r);
                if (!r.wasVisible) {
                    r.wasVisible = true;
                    r.logDisplayed();
                }
            } else r.wasVisible = false;
        });
        return q;
    };
    p.prototype.$VideoAutoplayControllerXb = function () {
        "use strict";
        if (!this.$VideoAutoplayControllerX0) {
            this.$VideoAutoplayControllerX0 = this.$VideoAutoplayControllerX1;
            this.$VideoAutoplayControllerXe(j.PAGE_VISIBILITY);
        }
    };
    p.prototype.$VideoAutoplayControllerXc = function () {
        "use strict";
        if (this.$VideoAutoplayControllerX0) {
            this.$VideoAutoplayControllerX0.playWithoutUnmute(j.PAGE_VISIBILITY);
            this.$VideoAutoplayControllerX1 = this.$VideoAutoplayControllerX0;
            this.$VideoAutoplayControllerX0 = null;
        }
    };
    p.prototype.$VideoAutoplayControllerXe = function (q) {
        "use strict";
        if (this.$VideoAutoplayControllerX1) {
            this.$VideoAutoplayControllerX1.pause(q);
            this.$VideoAutoplayControllerX1 = null;
        }
    };
    p.prototype.$VideoAutoplayControllerXf = function () {
        "use strict";
        if (this.$VideoAutoplayControllerX1.addListener) {
            this.$VideoAutoplayControllerX2.release();
            this.$VideoAutoplayControllerX2.engage();
            this.$VideoAutoplayControllerX2.addSubscriptions.apply(this.$VideoAutoplayControllerX2, ['finishPlayback', 'turnOffAutoplay'].map(function (event) {
                return this.$VideoAutoplayControllerX1.addListener(event, function () {
                    this.$VideoAutoplayControllerX2.release();
                    this.$VideoAutoplayControllerX1 = null;
                }.bind(this));
            }.bind(this)));
        }
    };
    p.prototype.$VideoAutoplayControllerX9 = function () {
        "use strict";
        var q = this.$VideoAutoplayControllerXd(), r = q.length, s = null;
        if (r == 1) {
            s = q[0];
            s = s.isAutoplayable() ? s : null;
        } else if (r > 1) {
            var t = g.getViewportDimensions().height / 2;
            q.forEach(function (u) {
                if (!u.isAutoplayable())return;
                var v = u.getDOMPosition(), w = v.y + v.height / 2, x = Math.abs(w - t);
                u.playPriority = x;
                if (!s || u.playPriority < s.playPriority)s = u;
            });
        }
        if (this.$VideoAutoplayControllerX1) {
            if (s != this.$VideoAutoplayControllerX1) {
                this.$VideoAutoplayControllerXe(j.AUTOPLAY);
                this.$VideoAutoplayControllerX1 = s;
                if (this.$VideoAutoplayControllerX1) {
                    this.$VideoAutoplayControllerXf();
                    this.$VideoAutoplayControllerX1.playWithoutUnmute(j.AUTOPLAY);
                }
            }
        } else if (s) {
            this.$VideoAutoplayControllerX1 = s;
            this.$VideoAutoplayControllerXf();
            this.$VideoAutoplayControllerX1.playWithoutUnmute(j.AUTOPLAY);
        }
    };
    e.exports = p;
}, null);
__d("VideoPlayerAdditionalLogDataGetter", [], function (a, b, c, d, e, f) {
    function g(h) {
        "use strict";
        if (typeof h === 'function') {
            this.$VideoPlayerAdditionalLogDataGetter0 = null;
            this.$VideoPlayerAdditionalLogDataGetter1 = h;
        } else {
            this.$VideoPlayerAdditionalLogDataGetter0 = h;
            this.$VideoPlayerAdditionalLogDataGetter1 = null;
        }
    }

    g.prototype.get = function () {
        "use strict";
        if (this.$VideoPlayerAdditionalLogDataGetter1)return this.$VideoPlayerAdditionalLogDataGetter1();
        return this.$VideoPlayerAdditionalLogDataGetter0;
    };
    e.exports = g;
}, null);
__d("SpotlightVideoDimensions", ["PhotoViewerDimensions", "Vector"], function (a, b, c, d, e, f, g, h) {
    var i = 520;

    function j(k) {
        "use strict";
        this.$SpotlightVideoDimensions0 = new g();
        this.$SpotlightVideoDimensions1 = k;
    }

    j.prototype.getStageAndVideoDimensions = function (k) {
        "use strict";
        var l = this.$SpotlightVideoDimensions0.getMaxStageDimensions(), m = this.$SpotlightVideoDimensions0.getImageDimensionsForStage(k, l.sub(this.$SpotlightVideoDimensions1, 0)), n = new h(m.x + this.$SpotlightVideoDimensions1, Math.max(m.y, i));
        return {stageDimensions: n, videoDimensions: m};
    };
    e.exports = j;
}, null);
__d("VideoSpotlight", ["LayerHideOnBlur", "LayerHideOnEscape", "ReactLayer", "Spotlight", "cx", "getLayoutRoot", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = i.createClass({getDefaultEnabledBehaviors: function () {
        return {hideOnBlur: g, hideOnEscape: h};
    }, createLayer: function (o) {
        m(l());
        var p = this.enumerateBehaviors(this.props.behaviors), q = {addedBehaviors: p, rootClassName: "_5v-m"}, r = new j(q, o);
        r.conditionShow(this.props.shown);
        r.setInsertParent(l());
        if (this.props.onHide)r.subscribe('hide', this.props.onHide);
        return r;
    }, receiveProps: function (o) {
        this.layer.conditionShow(o.shown);
    }});
    e.exports = n;
}, null);
__d("SpotlightVideoViewer", ["ArbiterMixin", "BehaviorsMixin", "Event", "React", "ReactLayeredComponentMixin", "SpotlightVideoDimensions", "SpotlightViewerClose", "SpotlightViewerUnmountOnClose", "SpotlightViewport", "SubscriptionsHandler", "Style", "Vector", "VideoSpotlight", "cx", "getViewportDimensions", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    var w = 360, x = j.createClass({displayName: 'SpotlightVideoViewer', mixins: [g, h, k], behaviors: [n], componentWillMount: function () {
        this.enableBehaviors(this.behaviors);
    }, componentDidMount: function () {
        this._subscriptions.addSubscriptions(i.listen(window, 'resize', this._onResize));
        this._popOutVideo();
    }, componentWillUnmount: function () {
        this._subscriptions.release();
        this.destroyBehaviors();
    }, getInitialState: function () {
        this._dimensions = new l(w);
        this._originalDimensions = new r(this.props.videoElement.offsetWidth, this.props.videoElement.offsetHeight);
        this._targetDimensions = this._originalDimensions.mul(2);
        this._subscriptions = new p();
        return {dimensions: this._dimensions.getStageAndVideoDimensions(this._targetDimensions)};
    }, renderLayers: function () {
        var y = {height: this.state.dimensions.stageDimensions.y + 'px'};
        return {videoLayer: j.createElement(s, {onHide: this._popInVideo, shown: true}, j.createElement(j.DOM.div, {className: "_n3"}, j.createElement(o, {stageDimensions: this.state.dimensions.stageDimensions}, j.createElement(m, {onClick: this._handleClose}), j.createElement(j.DOM.div, {className: "rfloat _5xg6", style: y}, j.createElement(j.DOM.div, {className: "_5xg7"}, ' ', "UFI Section", ' ')))))};
    }, render: function () {
        return j.createElement(j.DOM.div, null);
    }, _handleClose: function () {
        this.inform('close');
    }, _onResize: function () {
        this.setState({dimensions: this._dimensions.getStageAndVideoDimensions(this._targetDimensions)});
        this._repositionVideo();
    }, _popOutVideo: function () {
        v(this.props.videoElement);
        q.apply(this.props.videoElement, {position: 'fixed', 'z-index': '401'});
        this._repositionVideo();
    }, _popInVideo: function () {
        this._handleClose();
        v(this.props.videoElement);
        var y = this._originalDimensions.x, z = this._originalDimensions.y;
        q.apply(this.props.videoElement, {left: 0, height: z + 'px', position: 'static', top: 0, width: y + 'px', 'z-index': 'auto'});
        q.apply(this.props.swfElement, {height: z + 'px', width: y + 'px'});
    }, _repositionVideo: function () {
        var y = u.withoutScrollbars(), z = this.state.dimensions.videoDimensions.y, aa = this.state.dimensions.videoDimensions.x - 1, ba = y.width / 2 - this.state.dimensions.stageDimensions.x / 2 + 1, ca = y.height / 2 - z / 2;
        q.apply(this.props.videoElement, {height: z + 'px', left: ba + 'px', top: ca + 'px', width: aa + 'px'});
        q.apply(this.props.swfElement, {height: z + 'px', width: aa + 'px'});
    }});
    e.exports = x;
}, null);
__d("VideoViewer", ["DOM", "React", "SpotlightVideoViewer"], function (a, b, c, d, e, f, g, h, i) {
    var j = {_viewerContainer: null, bootstrapWithElement: function (k, l) {
        var m = h.createElement(i, {swfElement: l, videoElement: k});
        j.renderViewer(m);
    }, renderViewer: function (k) {
        if (!this._viewerContainer) {
            this._viewerContainer = g.create('div');
            document.body.appendChild(this._viewerContainer);
        }
        k = h.renderComponent(k, this._viewerContainer);
        k.subscribeOnce('close', function () {
            g.empty(this._viewerContainer);
        }.bind(this));
    }};
    e.exports = j;
}, null);
__d("VideoPlayerUnitX", ["Arbiter", "AttachmentRelatedShareConstants", "CSS", "DOM", "DOMDimensions", "Event", "EventEmitter", "LitestandStoryInsertionStatus", "PhotoSnowlift", "Run", "SubscriptionsHandler", "VideoAutoplayPlayButton", "VideoPlayerAdditionalLogDataGetter", "VideoPlayerApiEvents", "VideoPlayerLoggerEvents", "VideoPlayerLoggerErrors", "VideoPlayerLoggerErrorStates", "VideoPlayerLoggerFallbackReasons", "VideoPlayerLoggerSources", "VideoPlayerController", "VideoViewer", "cx", "logVideosClickTracking", "VideoPlayerReason"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da) {
    var ea = 1, fa = 100, ga = 10000;
    for (var ha in m)if (m.hasOwnProperty(ha))ja[ha] = m[ha];
    var ia = m === null ? null : m.prototype;
    ja.prototype = Object.create(ia);
    ja.prototype.constructor = ja;
    ja.__superConstructor__ = m;
    function ja(ka, la) {
        "use strict";
        ia.constructor.call(this);
        this.$VideoPlayerUnitX0 = la;
        this.$VideoPlayerUnitX1 = ka;
        this.$VideoPlayerUnitX2 = this.isAutoplayable();
        this.$VideoPlayerUnitX3 = new q();
        this.$VideoPlayerUnitX4 = null;
        p.onLeave(function () {
            this.$VideoPlayerUnitX3.release();
        }.bind(this));
        this.$VideoPlayerUnitX5 = false;
        if (r.getClicked(la.flash_id))this.$VideoPlayerUnitX5 = true;
        if (la.controller) {
            this.$VideoPlayerUnitX6 = la.controller;
        } else {
            var ma = Object.assign({}, la, {source: this.$VideoPlayerUnitX0.is_ad ? y.ADS : y.INLINE, should_autoplay: false, additional_logdata_getter: new s({autoplay_eligible: this.$VideoPlayerUnitX0.viewport_autoplay})});
            this.$VideoPlayerUnitX6 = new z(ma, ka);
        }
        this.$VideoPlayerUnitX6.setAdditionalLogDataGetter(new s(function () {
            return {autoplay_eligible: this.isAutoplayable()};
        }.bind(this)));
        if (this.$VideoPlayerUnitX6.isImplementationUnavailable())this.$VideoPlayerUnitX7();
        this.$VideoPlayerUnitX8();
        if (this.$VideoPlayerUnitX9('fallback'))return;
        if (this.$VideoPlayerUnitX5)this.$VideoPlayerUnitXa(da.USER);
        this.$VideoPlayerUnitXb();
        r.unregister(this.$VideoPlayerUnitX0.flash_id);
        this.$VideoPlayerUnitX1.thumbnails.forEach(function (na) {
            this.$VideoPlayerUnitX3.addSubscriptions(l.listen(na, 'click', function () {
                return this.$VideoPlayerUnitXc();
            }.bind(this)));
        }.bind(this));
        this.$VideoPlayerUnitX3.addSubscriptions(l.listen(this.$VideoPlayerUnitX1.play_icon, 'click', function () {
            return this.$VideoPlayerUnitXc();
        }.bind(this)), n.registerBlocker(function () {
            return this.$VideoPlayerUnitX9('playing');
        }.bind(this)));
        if (this.$VideoPlayerUnitXd()) {
            this.$VideoPlayerUnitX1.pivotThumbs.forEach(function (na) {
                this.$VideoPlayerUnitX3.addSubscriptions(l.listen(na, 'click', function () {
                    this.$VideoPlayerUnitXe();
                }.bind(this)));
            }.bind(this));
            this.$VideoPlayerUnitX3.addSubscriptions(l.listen(this.$VideoPlayerUnitX1.pivotNextText, 'click', function () {
                this.$VideoPlayerUnitXc();
            }.bind(this)));
            this.$VideoPlayerUnitX3.addSubscriptions(l.listen(this.$VideoPlayerUnitX1.pivotReplayText, 'click', function () {
                this.$VideoPlayerUnitXe();
            }.bind(this)));
        }
    }

    ja.prototype.isVisible = function () {
        "use strict";
        var ka = k.getViewportDimensions().height, la = this.getDOMPosition();
        if (la.height === 0)return false;
        var ma = la.y + (1 - ea) * la.height, na = la.y + ea * la.height;
        if (ma >= 0 && na < ka)return true;
        return false;
    };
    ja.prototype.$VideoPlayerUnitX7 = function () {
        "use strict";
        this.$VideoPlayerUnitXf(false, x.FLASH_UNAVAILABLE);
    };
    ja.prototype.isAutoplayable = function () {
        "use strict";
        return this.$VideoPlayerUnitX0.viewport_autoplay && !this.$VideoPlayerUnitXg;
    };
    ja.prototype.$VideoPlayerUnitXa = function (ka) {
        "use strict";
        if (this.$VideoPlayerUnitX2) {
            this.$VideoPlayerUnitX2 = false;
            this.$VideoPlayerUnitX6.unmute();
        }
        this.$VideoPlayerUnitX6.play(ka);
    };
    ja.prototype.$VideoPlayerUnitXh = function () {
        "use strict";
        this.$VideoPlayerUnitX6.pause('large_format');
        o.bootstrap(this.$VideoPlayerUnitX0.permalink_url);
        this.$VideoPlayerUnitX6.logEvent(u.ENTER_LARGE_FORMAT);
        ca(this.$VideoPlayerUnitX6.getVideoNode());
    };
    ja.prototype.playWithoutUnmute = function (ka) {
        "use strict";
        this.$VideoPlayerUnitX6.play(ka);
    };
    ja.prototype.$VideoPlayerUnitXc = function () {
        "use strict";
        this.$VideoPlayerUnitXa(da.USER);
        ca(this.$VideoPlayerUnitX6.getVideoNode());
    };
    ja.prototype.$VideoPlayerUnitXe = function () {
        "use strict";
        this.$VideoPlayerUnitX6.previousVideo();
        this.$VideoPlayerUnitXa(da.USER);
    };
    ja.prototype.getVideoID = function () {
        "use strict";
        return this.$VideoPlayerUnitX6.getVideoID();
    };
    ja.prototype.$VideoPlayerUnitXi = function () {
        "use strict";
        return this.$VideoPlayerUnitX6.getVideoIndex();
    };
    ja.prototype.$VideoPlayerUnitXj = function () {
        "use strict";
        this.$VideoPlayerUnitXk();
    };
    ja.prototype.$VideoPlayerUnitX8 = function () {
        "use strict";
        var ka = [
            ['expandVideo', function () {
                return this.$VideoPlayerUnitXl();
            }.bind(this)],
            ['finishPlayback', function () {
                return this.$VideoPlayerUnitXm();
            }.bind(this)],
            ['turnOffAutoplay', function () {
                return this.$VideoPlayerUnitXn();
            }.bind(this)],
            ['unmuteVideo', function () {
                return this.$VideoPlayerUnitXo();
            }.bind(this)],
            ['openLargeFormat', function () {
                return this.$VideoPlayerUnitXh();
            }.bind(this)],
            ['stateChange', function () {
                return this.$VideoPlayerUnitXk();
            }.bind(this)],
            ['switchVideo', function () {
                return this.$VideoPlayerUnitXj();
            }.bind(this)],
            ['fallbackPlay', function () {
                return this.$VideoPlayerUnitXp();
            }.bind(this)],
            ['buffered', function () {
                return this.$VideoPlayerUnitXk();
            }.bind(this)],
            ['buffering', function () {
                return this.$VideoPlayerUnitXk();
            }.bind(this)]
        ], la = function (event) {
            return this.emit.bind(this, event);
        }.bind(this);
        this.$VideoPlayerUnitX3.addSubscriptions.apply(this.$VideoPlayerUnitX3, ka.map(function (ma) {
            return this.$VideoPlayerUnitX6.addListener.apply(this.$VideoPlayerUnitX6, ma);
        }.bind(this)).concat(t.map(function (event) {
            return this.$VideoPlayerUnitX6.addListener(event, la(event));
        }.bind(this))));
    };
    ja.prototype.logDisplayed = function () {
        "use strict";
        this.$VideoPlayerUnitX6.logEvent(u.DISPLAYED, {autoplay_reason: this.$VideoPlayerUnitX0.autoplay_reason});
    };
    ja.prototype.$VideoPlayerUnitXp = function () {
        "use strict";
        var ka = {error: v.ENTERED_FALLBACK, error_description: "fallback_reason: " + this.$VideoPlayerUnitX4, state: w.PLAYBACK_FAILURE};
        this.$VideoPlayerUnitX6.logEvent(u.ERROR, ka);
    };
    ja.prototype.$VideoPlayerUnitXf = function (ka, la) {
        "use strict";
        ka = ka === undefined ? true : ka;
        this.$VideoPlayerUnitX4 = la;
        this.$VideoPlayerUnitX6.setState('fallback');
        this.$VideoPlayerUnitX6.logEvent(u.ENTERED_FALLBACK, {reason: la, flash_available: ka});
    };
    ja.prototype.$VideoPlayerUnitXb = function () {
        "use strict";
        setTimeout(function () {
            if (this.$VideoPlayerUnitX9('loading')) {
                this.$VideoPlayerUnitXf(true, x.TIMEOUT);
                this.$VideoPlayerUnitX6.cancelPlayRequest();
            }
        }.bind(this), ga);
    };
    ja.prototype.$VideoPlayerUnitXl = function () {
        "use strict";
        aa.bootstrapWithElement(this.$VideoPlayerUnitX1.video_container, this.$VideoPlayerUnitX6.getVideoNode());
    };
    ja.prototype.$VideoPlayerUnitXo = function () {
        "use strict";
        this.$VideoPlayerUnitXq();
    };
    ja.prototype.$VideoPlayerUnitXd = function () {
        "use strict";
        return this.$VideoPlayerUnitX6.getVideosCount() > 1;
    };
    ja.prototype.$VideoPlayerUnitXm = function () {
        "use strict";
        if (this.$VideoPlayerUnitXd())this.$VideoPlayerUnitX6.nextVideo();
        this.$VideoPlayerUnitXq();
        this.$VideoPlayerUnitXr();
    };
    ja.prototype.handleFlashApiFactoryError = function (ka, la) {
        "use strict";
        ia.handleFlashApiFactoryError.call(this, ka, la);
        this.$VideoPlayerUnitXf(true, x.FLASH_ERROR);
    };
    ja.prototype.$VideoPlayerUnitXr = function () {
        "use strict";
        this.$VideoPlayerUnitXg = true;
    };
    ja.prototype.$VideoPlayerUnitXn = function () {
        "use strict";
        this.$VideoPlayerUnitXr();
    };
    ja.prototype.$VideoPlayerUnitXk = function () {
        "use strict";
        this.$VideoPlayerUnitXs();
        this.$VideoPlayerUnitXt();
        this.$VideoPlayerUnitXu();
        this.$VideoPlayerUnitXv();
        this.$VideoPlayerUnitXw();
        this.$VideoPlayerUnitXx();
    };
    ja.prototype.getDOMPosition = function () {
        "use strict";
        return this.$VideoPlayerUnitX6.getDOMPosition();
    };
    ja.prototype.pause = function (ka) {
        "use strict";
        this.$VideoPlayerUnitX6.pause(ka);
    };
    ja.prototype.$VideoPlayerUnitXs = function () {
        "use strict";
        if (this.$VideoPlayerUnitX9('fallback')) {
            this.$VideoPlayerUnitX3.release();
            var ka = this.$VideoPlayerUnitX1;
            j.empty(this.$VideoPlayerUnitX6.getRootNode());
            j.appendContent(this.$VideoPlayerUnitX6.getRootNode(), ka.fallback_link);
            j.appendContent(ka.fallback_link, ka.thumbnails[this.$VideoPlayerUnitXi()]);
            j.appendContent(ka.fallback_link, ka.play_icon);
        }
    };
    ja.prototype.$VideoPlayerUnitXv = function () {
        "use strict";
        if (this.$VideoPlayerUnitX9('fallback') || (this.$VideoPlayerUnitX9('loading') && !this.$VideoPlayerUnitX6.isPlayRequestPending() && !this.$VideoPlayerUnitX5 && !this.isAutoplayable()) || ((this.$VideoPlayerUnitX9('ready') || this.$VideoPlayerUnitX9('paused')) && !this.$VideoPlayerUnitX6.isPlayRequestPending())) {
            i.addClass(this.$VideoPlayerUnitX1.play_icon, "_5vos");
        } else if (this.$VideoPlayerUnitX9('finished')) {
            if (this.$VideoPlayerUnitX6.hasCTAEndscreen && this.$VideoPlayerUnitX6.hasCTAEndscreen()) {
                return;
            } else if (!this.$VideoPlayerUnitXd())i.addClass(this.$VideoPlayerUnitX1.play_icon, "_5vos");
        } else if (!this.$VideoPlayerUnitX9('finished') || !this.$VideoPlayerUnitXd()) {
            i.removeClass(this.$VideoPlayerUnitX1.play_icon, "_5vos");
            i.removeClass(this.$VideoPlayerUnitX1.play_icon, "_5vov");
        }
    };
    ja.prototype.$VideoPlayerUnitXw = function () {
        "use strict";
        if (this.$VideoPlayerUnitX6.isBuffering() || (this.$VideoPlayerUnitX9('loading') && (this.$VideoPlayerUnitX5 || this.isAutoplayable())) || (this.$VideoPlayerUnitX9('ready') && this.$VideoPlayerUnitX6.isPlayRequestPending())) {
            i.show(this.$VideoPlayerUnitX1.spinner);
        } else i.hide(this.$VideoPlayerUnitX1.spinner);
    };
    ja.prototype.$VideoPlayerUnitXx = function () {
        "use strict";
        if (this.$VideoPlayerUnitX9('playing') || this.$VideoPlayerUnitX9('paused')) {
            this.$VideoPlayerUnitX1.thumbnails.forEach(function (ka) {
                i.hide(ka);
            });
        } else i.show(this.$VideoPlayerUnitX1.thumbnails[this.$VideoPlayerUnitXi()]);
    };
    ja.prototype.$VideoPlayerUnitXu = function () {
        "use strict";
        if (!this.$VideoPlayerUnitXd())return;
        var ka = this.$VideoPlayerUnitX1.pivotThumbs;
        ka.forEach(function (ma) {
            i.removeClass(ma, "_5vlu");
            i.removeClass(ma, "_5vou");
            i.addClass(ma, "_5vot");
        });
        i.removeClass(this.$VideoPlayerUnitX1.pivotReplayText, "_5vm5");
        i.removeClass(this.$VideoPlayerUnitX1.pivotNextText, "_5vm5");
        if (this.$VideoPlayerUnitX9('finished')) {
            var la = ka[this.$VideoPlayerUnitXy()];
            i.removeClass(la, "_5vot");
            i.addClass(la, "_5vlu");
            setTimeout(function () {
                if (!this.$VideoPlayerUnitX9('finished'))return;
                i.addClass(la, "_5vou");
                i.addClass(this.$VideoPlayerUnitX1.pivotReplayText, "_5vm5");
                i.addClass(this.$VideoPlayerUnitX1.pivotNextText, "_5vm5");
                i.addClass(this.$VideoPlayerUnitX1.play_icon, "_5vov");
            }.bind(this), fa);
        }
    };
    ja.prototype.$VideoPlayerUnitXt = function () {
        "use strict";
        if (!this.$VideoPlayerUnitXd())return;
        var ka = this.$VideoPlayerUnitX1.story_footers;
        for (var la = 0; la < ka.length; la++)i.conditionShow(ka[la], la === this.$VideoPlayerUnitXi());
    };
    ja.prototype.$VideoPlayerUnitXz = function () {
        "use strict";
        var ka = this.$VideoPlayerUnitXA();
        return (this.$VideoPlayerUnitXi() + 1) % ka;
    };
    ja.prototype.$VideoPlayerUnitXy = function () {
        "use strict";
        var ka = this.$VideoPlayerUnitXA();
        return (this.$VideoPlayerUnitXi() - 1 + ka) % ka;
    };
    ja.prototype.$VideoPlayerUnitXA = function () {
        "use strict";
        return this.$VideoPlayerUnitX6.getVideosCount();
    };
    ja.prototype.$VideoPlayerUnitXq = function () {
        "use strict";
        g.inform(h.FBVIDEO_CLICK, {attachment: this.$VideoPlayerUnitX1.video_container, fbvideo_id: this.$VideoPlayerUnitX0.video_ids[0]});
    };
    ja.prototype.$VideoPlayerUnitX9 = function (ka) {
        "use strict";
        return this.$VideoPlayerUnitX6.isState(ka);
    };
    e.exports = ja;
}, null);
__d("XVideoRhcControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/video\/righthandcolumn\/", {video_id: {type: "String", required: true}});
}, null);
__d("VideoRhcController", ["AsyncRequest", "CSS", "Event", "SubscriptionsHandler", "VideoPlayerReason", "XVideoRhcControllerURIBuilder", "destroyOnUnload", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = 500, p = null;

    function q() {
        "use strict";
        this.$VideoRhcController0 = null;
        this.$VideoRhcController1 = new j();
        this.$VideoRhcController2 = null;
        this.$VideoRhcController3 = null;
        m(function () {
            if (this.$VideoRhcController3)this.$VideoRhcController3.remove();
            this.$VideoRhcController3 = null;
            this.$VideoRhcController2 = null;
            this.$VideoRhcController0 = null;
            this.$VideoRhcController1.release();
            this.$VideoRhcController1 = null;
            if (this === p)p = null;
        });
    }

    q.getInstance = function () {
        "use strict";
        if (p == null)p = new q();
        return p;
    };
    q.addRhcRootElement = function (r) {
        "use strict";
        var s = q.getInstance();
        s.$VideoRhcController2 = r;
    };
    q.registerVideoUnit = function (r) {
        "use strict";
        var s = q.getInstance();
        s.$VideoRhcController4();
        r.addListener('beginPlayback', function (t) {
            return s.$VideoRhcController5(r, t.reason);
        });
    };
    q.prototype.$VideoRhcController5 = function (r, s) {
        "use strict";
        if (s !== k.USER)return;
        this.$VideoRhcController0 = r;
        if (!this.$VideoRhcController0 || !this.$VideoRhcController2)return;
        this.$VideoRhcController6();
        var t = new l().setString('video_id', this.$VideoRhcController0.getVideoID()).getURI();
        this.request = new g().setMethod('GET').setURI(t).setReadOnly(true).send();
        this.$VideoRhcController7();
    };
    q.prototype.$VideoRhcController7 = function () {
        "use strict";
        this.$VideoRhcController1.release();
        this.$VideoRhcController1.engage();
        this.$VideoRhcController1.addSubscriptions.apply(this.$VideoRhcController1, ['finishPlayback', 'pausePlayback'].map(function (event) {
            return this.$VideoRhcController0.addListener(event, function () {
                this.$VideoRhcController1.release();
                this.$VideoRhcController0 = null;
            }.bind(this));
        }.bind(this)));
    };
    q.prototype.$VideoRhcController4 = function () {
        "use strict";
        if (this.$VideoRhcController3)return;
        this.$VideoRhcController3 = i.listen(window, 'scroll', n(this.$VideoRhcController8.bind(this), o));
    };
    q.prototype.$VideoRhcController6 = function () {
        "use strict";
        if (this.$VideoRhcController2)h.hide(this.$VideoRhcController2);
    };
    q.prototype.$VideoRhcController9 = function () {
        "use strict";
        if (this.$VideoRhcController2)h.show(this.$VideoRhcController2);
    };
    q.prototype.$VideoRhcController8 = function () {
        "use strict";
        if (this.$VideoRhcController0 && this.$VideoRhcController2 && !this.$VideoRhcController0.isVisible()) {
            this.$VideoRhcController0.pause(k.PAGE_VISIBILITY);
            this.$VideoRhcController9();
        }
    };
    e.exports = q;
}, null);
__d("VideoFeedRegister", ["VideoAutoplayControllerX", "VideoPlayerUnitX", "VideoRhcController"], function (a, b, c, d, e, f, g, h, i) {
    var j = 'video_watch_and_scroll', k = {registerVideoUnit: function (l, m, n) {
        var o = new h(l, m);
        g.registerVideoUnit(o);
        if (n[j])i.registerVideoUnit(o);
    }};
    e.exports = k;
}, null);