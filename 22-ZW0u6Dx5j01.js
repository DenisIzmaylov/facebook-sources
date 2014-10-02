/*!CK:3519950165!*//*1412036127,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["JZJ0O"]);
}

__d("CensorLogger", ["Event", "Banzai", "DOM", "debounce", "ge", "Keys"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = 10 * 60 * 1000, m = b('Keys').RETURN, n = function (q) {
        var r = (q.target || q.srcElement).id, s = (q.target || q.srcElement).value.trim().length, t = o.tracker(r);
        if (!t)return;
        if (s > 5 && !t.submitted) {
            if (t.type == 'comment' && t.parent_fbid == 'unknown') {
                if (!o.syncTrackerWithForm(r))o.snowliftSync(r);
                t = o.tracker(r);
            }
            h.post('censorlogger', {impid: t.impid, clearcounter: t.clearcounter, instrument: t.type, elementid: r, parent_fbid: (t.parent_fbid == 'unknown' ? null : t.parent_fbid), version: "original"}, h.VITAL);
            o.setSubmitted(r, true);
        } else if (s === 0 && t.submitted && q.which != m) {
            o.debouncers[r] = p(r);
            o.debouncers[r]();
        } else if (s > 0 && t.submitted)if (o.debouncers[r])o.debouncers[r].reset();
    }, o = {init: function (q) {
        this.impressionID = q;
        for (var r in this.trackedElements)if (!k(r))this.stopTracking(r);
        for (var s in this.unmatchedForms)if (!k(s))delete this.unmatchedForms[s];
    }, trackElement: function (q, r, s) {
        var t, u, v;
        this.debouncers = this.debouncers || {};
        this.trackedElements = this.trackedElements || {};
        this.unmatchedForms = this.unmatchedForms || {};
        r = r.toLowerCase();
        if (r == 'composer') {
            t = (s ? i.find(q, 'div.uiMetaComposerMessageBox textarea.input') : i.find(q, 'div.uiComposerMessageBox textarea.input'));
            u = i.find(q, 'form.attachmentForm');
            var w = i.scry(q, 'input[name="xhpc_targetid"]')[0];
            if (w)v = w.value;
        } else if (r == 'comment')t = i.find(q, 'div.commentBox textarea.textInput');
        if (t == null)return;
        var x = i.getID(t);
        if (u)this.addJoinTableInfoToForm(u, i.getID(t));
        g.listen(t, 'keyup', n.bind(this));
        this.trackedElements[x] = {submitted: false, clearcounter: 0, type: r, impid: this.impressionID, parent_fbid: v || 'unknown', formID: (u ? i.getID(u) : null)};
        if (r == 'comment')this.syncTrackerWithForm(x);
    }, registerForm: function (q, r) {
        this.unmatchedForms = this.unmatchedForms || {};
        this.unmatchedForms[q] = r;
    }, syncTrackerWithForm: function (q) {
        for (var r in this.unmatchedForms) {
            var s = k(r);
            if (s) {
                var t = i.scry(s, 'div.commentBox textarea.textInput')[0];
                if (t) {
                    var u = i.getID(t);
                    if (u && u == q) {
                        this.trackedElements[q].parent_fbid = this.unmatchedForms[r];
                        this.trackedElements[q].formID = r;
                        this.addJoinTableInfoToForm(s, q);
                        delete this.unmatchedForms[r];
                        return true;
                    }
                }
            }
        }
        return false;
    }, snowliftSync: function (q) {
        var r, s = k(q);
        if (s && (r = i.scry(s, '^.fbPhotosSnowboxFeedbackInput')[0])) {
            var t = i.find(r, 'input[name="feedback_params"]'), u = JSON.parse(t.value).target_fbid;
            this.trackedElements[q].parent_fbid = u;
            this.trackedElements[q].formID = r.id;
            this.addJoinTableInfoToForm(r, q);
            return true;
        }
        return false;
    }, stopTracking: function (q) {
        delete this.trackedElements[q];
        if (this.debouncers[q]) {
            this.debouncers[q].reset();
            delete this.debouncers[q];
        }
    }, tracker: function (q) {
        return this.trackedElements[q];
    }, getSubmitted: function (q) {
        return (this.trackedElements[q] ? this.trackedElements[q].submitted : false);
    }, setSubmitted: function (q, r) {
        if (this.trackedElements[q])this.trackedElements[q].submitted = r;
    }, incrementClearCounter: function (q) {
        if (!this.tracker(q))return;
        this.trackedElements[q].clearcounter++;
        this.trackedElements[q].submitted = false;
        var r = i.scry(k(this.trackedElements[q].formID), 'input[name="clp"]')[0];
        if (r)r.value = JSON.stringify({censorlogger_impid: this.trackedElements[q].impid, clearcounter: this.trackedElements[q].clearcounter, element_id: q});
    }, addJoinTableInfoToForm: function (q, r) {
        i.prependContent(q, i.create('input', {type: 'hidden', name: 'clp', value: JSON.stringify({censorlogger_impid: this.impressionID, clearcounter: 0, element_id: r, version: "original"})}));
    }}, p = function (q) {
        return j(function () {
            o.incrementClearCounter(q);
        }, l, o);
    };
    e.exports = o;
}, null);
__d("UFIOrderingModeSelector.react", ["InlineBlock.react", "Link.react", "LoadingIndicator.react", "React", "Image.react", "ReactXUIMenu", "PopoverMenu.react", "cx", "ix"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = l.SelectableMenu, q = l.SelectableItem, r = j.createClass({displayName: 'UFIOrderingModeSelector', propTypes: {currentOrderingMode: j.PropTypes.string, onOrderChanged: j.PropTypes.func, orderingmodes: j.PropTypes.array.isRequired}, getInitialState: function () {
        var s = null;
        this.props.orderingmodes.map(function (t) {
            if (t.selected)s = t;
        });
        return {selectedMode: s};
    }, onMenuItemClick: function (s, t) {
        var u = t.item.getValue();
        this.props.orderingmodes.map(function (v) {
            if (v.value === u)this.setState({selectedMode: v});
        }.bind(this));
        this.props.onOrderChanged(u);
    }, render: function () {
        var s = null;
        if (this.props.currentOrderingMode != this.state.selectedMode.value)s = j.createElement(i, {className: "UFIOrderingModeSelectorLoading", color: "white", size: "small"});
        var t = j.createElement(p, {onItemClick: this.onMenuItemClick}, this.props.orderingmodes.map(function (u) {
            return (j.createElement(q, {key: u.value, value: u.value, selected: u.value === this.state.selectedMode.value}, u.name));
        }.bind(this)));
        return (j.createElement(j.DOM.div, {className: "UFIOrderingModeSelector"}, s, j.createElement(g, null, j.createElement(m, {className: "UFIOrderingModeSelectorPopover", menu: t, alignh: "right"}, j.createElement(h, null, this.state.selectedMode.name, j.createElement(k, {className: "UFIOrderingModeSelectorDownCaret", src: o('/images/ui/xhp/link/more/down_caret.gif')}))))));
    }});
    e.exports = r;
}, null);
__d("ComposerXMentionsInputReset", ["DOMQuery", "Input"], function (a, b, c, d, e, f, g, h) {
    function i(j) {
        var k = g.scry(j.element, 'textarea.input')[0];
        j.instance.reset();
        h.reset(k);
    }

    e.exports = i;
}, null);
__d("legacy:ScrollAwareDOM", ["ScrollAwareDOM"], function (a, b, c, d) {
    a.ScrollAwareDOM = b('ScrollAwareDOM');
}, 3);
__d("intlList", ["React", "fbt", "invariant", "keyMirror"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    var k = function (m, n) {
        n = n || k.CONJUNCTIONS.AND;
        var o = m.length;
        if (o === 0) {
            return '';
        } else if (o === 1)return m[0];
        var p = m[o - 1], q = m[0];
        for (var r = 1; r < o - 1; ++r)q = h._("{previous items}, {following items}", [h.param("previous items", q), h.param("following items", m[r])]);
        return l(q, p, n);
    };

    function l(m, n, o) {
        switch (o) {
            case k.CONJUNCTIONS.AND:
                return (h._("{list of items} \u0438 {last item}", [h.param("list of items", m), h.param("last item", n)]));
            case k.CONJUNCTIONS.OR:
                return (h._("{list of items} \u0438\u043b\u0438 {last item}", [h.param("list of items", m), h.param("last item", n)]));
            case k.CONJUNCTIONS.NONE:
                return (h._("{list of items}, {last item}", [h.param("list of items", m), h.param("last item", n)]));
            default:
                i(false);
        }
    }

    k.CONJUNCTIONS = j({AND: null, NONE: null, OR: null});
    e.exports = k;
}, null);
__d("XPubcontentInlinePhotoPivotsEventsControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/pubcontent\/inline_photo_pivots_chaining\/events\/", {});
}, null);
__d("EntstreamAttachmentRelatedShare", ["Arbiter", "AsyncRequest", "AttachmentRelatedShareConstants", "csx", "cx", "CSS", "DOM", "Event", "ge", "tidyEvent", "XPubcontentInlinePhotoPivotsEventsControllerURIBuilder"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = 2, s = 3, t = {createRelatedAttachmentDelay: function (u, v, w) {
        var x = null;
        if (typeof u === "string") {
            x = o(u);
        } else x = u;
        if (!x)return;
        setTimeout(function () {
            g.inform(i.ARTICLE_CLICK, {attachment: x, global_share_id: v, is_auto_expand: true, is_right_click: false});
        }, 1000);
    }, loadRelatedAttachment: function (u, v, w) {
        var x = null;
        if (typeof u === "string") {
            x = o(u);
        } else x = u;
        if (!x)return;
        var y = n.listen(x, 'click', function () {
            y.remove();
            g.inform(i.ARTICLE_CLICK, {attachment: x, global_share_id: v, is_right_click: false, share_id: w});
        }), z = n.listen(x, 'mousedown', function (event) {
            if (event.which === s || event.button === r) {
                z.remove();
                g.inform(i.ARTICLE_CLICK, {attachment: x, global_share_id: v, is_right_click: true});
            }
        });
    }, loadInlineStoryPivotAttachment: function (u, v) {
        var w = o(u);
        if (!w)return;
        var x = n.listen(w, 'click', function () {
            x.remove();
            g.inform(i.PHOTO_CLICK, {attachment: w, storyid: v});
        });
    }, loadRelatedGameAttachment: function (u, v) {
        var w = null;
        if (typeof u === "string") {
            w = o(u);
        } else w = u;
        if (!w)return;
        p(n.listen(w, 'click', function () {
            g.inform(i.GAME_CLICK, {attachment: w, global_share_id: v});
        }));
        p(n.listen(w, 'mousedown', function (event) {
            if (event.which === s || event.button === r)g.inform(i.GAME_CLICK, {attachment: w, global_share_id: v});
        }));
    }, loadRelatedLSCVideoAttachment: function (u, v) {
        var w = null;
        if (typeof u === 'string') {
            w = o(u);
        } else w = u;
        if (!w)return;
        var x = "^div._4-u2", y = m.scry(w, x), z = n.listen(w, 'click', function () {
            z.remove();
            g.inform(i.VIDEO_CLICK, {attachment: w, global_share_id: v});
        });
    }, loadRelatedLSCInlineVideoAttachment: function (u, v) {
        var w = null;
        if (typeof u === 'string') {
            w = o(u);
        } else w = u;
        if (!w)return;
        n.listen(w, 'click', function () {
            var x = "^div._4-u2", y = "_1d8v", z = m.scry(w, x), aa = z.length === 1 ? z[0] : null, ba = aa.parentNode, ca = ba.previousSibling;
            while (!ca) {
                ba = ba.parentNode;
                ca = ba.previousSibling;
            }
            if (!l.hasClass(ca, y)) {
                var da = m.create('div', {className: y}), ea = m.insertBefore(aa.parentNode, da), fa = ea.length >= 1 ? ea[0] : null;
            } else fa = ca;
            var ga = m.getID(fa);
            new h().setURI('/ajax/flash/expand_inline.php').setData({share_id: v, target_div: ga, max_width: 470, max_height: 264, replace_target_div: true, expand_you_tube_video: true}).setMethod('GET').setReadOnly(true).setRelativeTo(w.parentNode).send();
            g.inform(i.VIDEO_CLICK, {attachment: w, global_share_id: v, continued_chaining: true});
        });
    }, closeButton: function (u, v) {
        n.listen(u, 'click', function () {
            m.remove(v);
        });
    }, closeButtonPhotoPivots: function (u, v, w, x) {
        n.listen(u, 'click', function () {
            var y = new q(), z = {story_id: w, search_query_type: x, event: 'hide'};
            new h().setMethod('POST').setURI(y.getURI()).setData(z).send();
            m.remove(v);
        });
    }, seeAllLinkPhotoPivots: function (u, v, w) {
        n.listen(u, 'click', function () {
            var x = new q(), y = {story_id: v, search_query_type: w, event: 'see_all'};
            new h().setMethod('POST').setURI(x.getURI()).setData(y).send();
        });
    }, loadRelatedVideos: function (u, v, w) {
        var x = o(u);
        if (!x)return;
        var y = o(v);
        if (!y)return;
        var z = {global_share_id: w, attachment_div_id: m.getID(x.parentNode), video_div_id: v}, aa = n.listen(y, 'click', function () {
            aa.remove();
            g.inform(i.VIDEO_CLICK, {attachment: x.parentNode, attachment_div_id: m.getID(x.parentNode), video_div_id: v, global_share_id: w});
        });
    }, removeOldSuggestions: function (u) {
        var v = o(u);
        if (!v)return;
        var w = m.scry(v.parentNode, "._5d73");
        for (var x = 1; x < w.length; x++)m.remove(w[x]);
        setTimeout(function () {
            l.show(w[0]);
        }, 1000);
    }, showHiddenSuggestions: function (u) {
        var v = n.listen(u, 'click', function () {
            v.remove();
            var w = "^._1ui8", x = m.scry(u, w);
            if (!x)return;
            l.hide(x[0]);
            var y = x[0].previousSibling;
            while (y) {
                l.show(y);
                y = y.previousSibling;
            }
        });
    }};
    e.exports = t;
}, null);
__d("FeedTrackingAsync", ["Arbiter", "collectDataAttributes", "copyProperties"], function (a, b, c, d, e, f, g, h, i) {
    function j() {
        g.subscribe('AsyncRequest/send', function (k, l) {
            var m = l.request, n = m.getRelativeTo();
            if (n) {
                var o = m.getData(), p = h(n, ['ft']);
                if (Object.keys(p.ft).length)i(o, p);
            }
        });
    }

    e.exports = {init: j};
}, null);
__d("AudienceSelectorTags", [], function (a, b, c, d, e, f) {
    var g = {}, h = {hasTags: function (i) {
        return g.hasOwnProperty(i);
    }, setHasTags: function (i) {
        if (i)g[i] = true;
    }};
    e.exports = h;
}, null);
__d("FbFeedCommentUFIScroller", ["Arbiter", "DOMScroll", "containsNode", "ge"], function (a, b, c, d, e, f, g, h, i, j) {
    g.subscribe('comment/focus', function (k, l) {
        var m = l.element, n = j('content');
        if (n && i(n, m))h.ensureVisible(m, null, 60, 250);
    });
    e.exports = {};
}, null);
__d("ButtonGroupX", ["ArbiterMixin", "copyProperties", "mixin"], function (a, b, c, d, e, f, g, h, i) {
    var j = i(g);
    for (var k in j)if (j.hasOwnProperty(k))m[k] = j[k];
    var l = j === null ? null : j.prototype;
    m.prototype = Object.create(l);
    m.prototype.constructor = m;
    m.__superConstructor__ = j;
    function m(n, o) {
        "use strict";
        o = o || {};
        this._root = n;
        this._radioButtons = o.radioButtons || [];
        this._selected = o.selected;
        this.initButtonListeners();
    }

    m.prototype.initButtonListeners = function () {
        "use strict";
        var n = this._radioButtons.length;
        while (n--) {
            var o = this._radioButtons[n];
            o.subscribe('select', this.selectButton.bind(this, o));
        }
    };
    m.prototype.getSelected = function () {
        "use strict";
        return this._selected;
    };
    m.prototype.getSelectedValue = function () {
        "use strict";
        return this._selected ? this._selected.getValue() : null;
    };
    m.prototype.selectButton = function (n) {
        "use strict";
        if (this._selected !== n) {
            this.setSelected(n);
            this.inform('change', {selected: n});
        }
        return this;
    };
    m.prototype.setSelected = function (n) {
        "use strict";
        if (this._selected !== n) {
            if (this._selected)this._selected.setSelected(false);
            n.setSelected(true);
            this._selected = n;
        }
        return this;
    };
    m.prototype.setSelectedValue = function (n) {
        "use strict";
        var o = this._radioButtons.length;
        while (o--) {
            var p = this._radioButtons[o];
            if (p.getValue() === n)return this.setSelected(p);
        }
        return this;
    };
    e.exports = m;
}, null);
__d("DialogExpansion", ["Animation", "DialogPosition", "LoadingDialogDimensions", "Style"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = i.WIDTH, l = i.HEIGHT, m = 400, n = 100;

    function o(p) {
        "use strict";
        this._dialog = p;
        this._fixedTopMargin = p.getFixedTopPosition();
    }

    o.prototype.enable = function () {
        "use strict";
        this._subscription = this._dialog.subscribe('aftershow', this._onAfterShow.bind(this));
    };
    o.prototype.disable = function () {
        "use strict";
        this._subscription.unsubscribe();
        this._subscription = null;
    };
    o.prototype.setTargetWidth = function (p) {
        "use strict";
        this._targetWidth = p;
    };
    o.prototype._onAfterShow = function () {
        "use strict";
        this._outer = this._dialog.getContentRoot();
        this._inner = this._dialog.getInnerContent();
        if (isNaN(parseInt(j.get(this._inner, 'height'), 10)))return;
        var p = h.calculateTopMargin(k, l);
        j.apply(this._inner, {opacity: '0', width: this._dialog.getWidth() + 'px'});
        j.apply(this._outer, {width: k + 'px', height: l + 'px', marginTop: p + 'px', overflow: 'hidden'});
        setTimeout(function () {
            var q = parseInt(this._dialog.getWidth(), 10);
            if (this._targetWidth)q = this._targetWidth;
            var r = parseInt(j.get(this._inner, 'height'), 10), s;
            if (this._fixedTopMargin) {
                s = this._fixedTopMargin;
            } else s = h.calculateTopMargin(q, r);
            this._growThenFade(q, r, s);
        }.bind(this), 100);
    };
    o.prototype._growThenFade = function (p, q, r) {
        "use strict";
        new g(this._outer).to('width', p).to('height', q).to('marginTop', r).duration(m).ease(g.ease.both).ondone(this._fadeIn.bind(this)).go();
    };
    o.prototype._fadeIn = function () {
        "use strict";
        j.set(this._outer, 'overflow', '');
        j.set(this._outer, 'height', '');
        new g(this._inner).from('opacity', 0).to('opacity', 1).ondone(function () {
            this._dialog.inform('afterexpand');
        }.bind(this)).duration(n).go();
    };
    e.exports = o;
}, null);
__d("XPrivacyCustomDialogControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/privacy\/custom_dialog\/", {id: {type: "String", required: true}, option_id: {type: "String", required: true}, autosave: {type: "Bool"}, explain_tags: {type: "Bool"}, limit_community: {type: "Bool"}, limit_facebook: {type: "Bool"}, limit_fof: {type: "Bool"}, limit_tagexpand: {type: "Bool"}, is_new_privacy_selector: {type: "Bool"}, render_location: {type: "Int"}, content_type: {type: "String"}, post_param: {type: "String"}, privacy_data: {type: "String"}, source: {type: "String"}, tags: {type: "IntVector"}, tag_expansion_button: {type: "String"}, __asyncDialog: {type: "Int"}});
}, null);