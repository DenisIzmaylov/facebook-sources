/*!CK:1463551414!*//*1411684681,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["nt+WU"]);
}

__d("TimelineProfilePictureLoggerEnums", [], function (a, b, c, d, e, f) {
    e.exports = {actions: {EDIT_THUMBNAIL: "edit_thumbnail", FROM_PHOTOS: "from_photos", MAKE_PROFILE: "make_profile", SILHOUETTE: "silhouette", SUGGESTION: "suggestion", SUGGESTION_UPLOAD: "suggestion_upload", SYNCED_PHOTO: "synced_photo", TAKE_PHOTO: "take_photo", UPLOAD: "upload_photo", USE_PREVIOUS: "use_previous"}, flows: {PERMALINK: "permalink", SNOWLIFT: "snowlift", SPOTLIGHT: "spotlight", VAULT: "vault", ZOOMCROP: "zoomcrop"}, steps: {INIT: "init", CANCEL: "cancel", CROP: "crop", CROP_FAIL: "crop_fail", CROP_SAVING: "crop_saving", CROP_SUCCESS: "crop_success", FAIL: "fail", LOADING: "loading", PREVIOUS_PIC_FAIL: "previous_pic_fail", PREVIOUS_PIC_INIT: "previous_pic_init", PREVIOUS_PIC_SAVING: "previous_pic_saving", PREVIOUS_PIC_SUCCESS: "previous_pic_success", SUCCESS: "success", UPLOAD_SELECT: "upload_select", UPLOAD_SUCCESS: "upload_success", VIEWER_INIT: "viewer_init"}};
}, null);
__d("List.react", ["ReactPropTypes", "React", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = h.createClass({displayName: 'List', propTypes: {border: g.oneOf(['none', 'light', 'medium', 'dark']), spacing: g.oneOf(['none', 'small', 'medium', 'large']), direction: g.oneOf(['vertical', 'horizontal']), valign: g.oneOf(['baseline', 'top', 'middle', 'bottom']), edgepadding: g.bool}, getDefaultProps: function () {
        return {border: 'medium', spacing: 'medium', direction: 'vertical', valign: 'top'};
    }, render: function () {
        var l = this.props.border, m = this.props.direction, n = this.props.spacing, o = m === 'horizontal' && this.props.valign, p, q, r;
        p = ((m === 'vertical' ? "_4kg" : '') + (m === 'horizontal' ? ' ' + "_4ki" : '') + (o === 'top' ? ' ' + "_509-" : '') + (o === 'middle' ? ' ' + "_509_" : '') + (o === 'bottom' ? ' ' + "_50a0" : ''));
        if (n !== 'none' || l !== 'none')q = ((l === 'none' ? "_6-i" : '') + (l === 'light' ? ' ' + "_4ks" : '') + (l === 'medium' ? ' ' + "_4kt" : '') + (l === 'dark' ? ' ' + "_4ku" : ''));
        if (n !== 'none')r = ((!this.props.edgepadding ? "_6-h" : '') + (n === 'small' ? ' ' + "_704" : '') + (n === 'medium' ? ' ' + "_6-j" : '') + (n === 'large' ? ' ' + "_703" : ''));
        var s = j("uiList", p, q, r);
        return (h.createElement(h.DOM.ul, Object.assign({}, this.props, {className: j(this.props.className, s)}), this.props.children));
    }});
    e.exports = k;
}, null);
__d("sliceChildren", ["flattenChildren"], function (a, b, c, d, e, f, g) {
    "use strict";
    function h(i, j, k) {
        if (i == null)return i;
        var l = {}, m = g(i), n = 0;
        for (var o in m) {
            if (!m.hasOwnProperty(o))continue;
            var p = m[o];
            if (n >= j)l[o] = p;
            n++;
            if (k != null && n >= k)break;
        }
        return l;
    }

    e.exports = h;
}, null);
__d("XUIDialogTitle.react", ["LeftRight.react", "React", "ReactPropTypes", "XUICloseButton.react", "cx", "tx", "sliceChildren", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = h.createClass({displayName: 'XUIDialogTitle', propTypes: {closeButtonText: i.string, showCloseButton: i.bool}, getDefaultProps: function () {
        return {closeButtonText: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c", showCloseButton: true};
    }, render: function () {
        var p = null;
        if (this.props.showCloseButton)p = h.createElement(j, {label: this.props.closeButtonText, className: "layerCancel _51-t"});
        return (h.createElement(h.DOM.div, Object.assign({}, this.props, {className: n(this.props.className, "_4-i0")}), h.createElement(g, null, h.createElement(h.DOM.h3, {className: "_52c9"}, m(this.props.children, 0, 1)), h.createElement(h.DOM.div, {className: "_51-u"}, m(this.props.children, 1), p))));
    }});
    e.exports = o;
}, null);
__d("SimpleXUIDialog", ["DialogX", "LayerDestroyOnHide", "LayerFadeOnHide", "LayerFadeOnShow", "LayerHideOnBlur", "LayerHideOnEscape", "React", "XUIDialogTitle.react", "XUIDialogBody.react", "XUIDialogFooter.react", "XUIDialogOkayButton.react"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    'use strict';
    var r = 445, s = {show: function (t, u, v, w) {
        var x = m.createElement(q, {action: "cancel", use: "confirm"});
        this.showEx(t, u, x, v, w);
    }, showEx: function (t, u, v, w, x) {
        x = x || {};
        var y = [h, j, i, l];
        if (x.hideOnBlur !== false)y.push(k);
        var z = {width: r, xui: true, addedBehaviors: y};
        if (u)u = m.createElement(n, {showCloseButton: true}, u);
        if (v)v = m.createElement(p, null, v);
        var aa = m.createElement(m.DOM.div, null, u, m.createElement(o, null, t), v), ba = new g(z, aa);
        if (w)ba.subscribe('hide', w);
        ba.show();
    }};
    e.exports = s;
}, null);
__d("PhotoPermalinkTagger", ["Arbiter", "Event", "PhotoPermalink", "PhotoTagger", "$", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    for (var m in j)if (j.hasOwnProperty(m))o[m] = j[m];
    var n = j === null ? null : j.prototype;
    o.prototype = Object.create(n);
    o.prototype.constructor = o;
    o.__superConstructor__ = j;
    function o(p) {
        "use strict";
        j.call(this, i.getInstance(), true);
        this.photoData = p;
    }

    o.prototype.setupHandlers = function () {
        "use strict";
        var p = k('imagestage'), q = k('fbPhotoPageTagBoxes');
        this.handlers = [h.listen(this.clickState, 'click', this.addTag.bind(this)), h.listen(p, 'click', this.addTag.bind(this)), h.listen(q, 'click', this.addTag.bind(this)), h.listen(this.addTagLink, 'click', this.checkActions.bind(this)), h.listen(this.overlayActions, 'click', this.checkActions.bind(this))];
        this.subscriptions = [g.subscribe('PhotoPermalink.PAGE', this.restartTagging.bind(this)), g.subscribe('PhotoPermalink.DATA_CHANGE', this.setPhotoData.bind(this)), g.subscribe('PhotoPermalink.EXTRA_DATA_CHANGE', this.setExtraData.bind(this))];
        this.tokenizer.subscribe('addToken', this.saveTag.bind(this));
        this.tokenizer.subscribe('removeToken', this.removeTag.bind(this));
        this.tokenizer.subscribe('markTagAsSpam', this.markTagAsSpam.bind(this));
    };
    o.prototype.setDataForTokenizer = function () {
        "use strict";
        this.tokenizer.setup(null, this.photoData);
        return this;
    };
    l(o.prototype, {elemNames: {0: {addTagLink: 'div.fbPhotosPhotoActions', overlayActions: 'div.fbPhotosPhotoButtons'}}});
    e.exports = o;
}, null);
__d("legacy:PhotoPermalinkTagger", ["PhotoPermalinkTagger"], function (a, b, c, d) {
    a.PhotoPermalinkTagger = b('PhotoPermalinkTagger');
}, 3);
__d("legacy:fb-photos-permalink-js", ["PhotoPermalink"], function (a, b, c, d) {
    a.PhotoPermalink = b('PhotoPermalink');
}, 3);
__d("TagToken", ["DOM", "Token"], function (a, b, c, d, e, f, g, h) {
    for (var i in h)if (h.hasOwnProperty(i))k[i] = h[i];
    var j = h === null ? null : h.prototype;
    k.prototype = Object.create(j);
    k.prototype.constructor = k;
    k.__superConstructor__ = h;
    function k(l) {
        "use strict";
        h.call(this, l, 'tag');
    }

    k.prototype.createElement = function () {
        "use strict";
        var l = this.isFreeform(), m = g.create('span', {className: 'separator'}, ', '), n = g.create(l ? 'span' : 'a', {className: 'taggee', 'data-tag': this.getValue()}, this.getText());
        if (!l)n.href = this.getInfo().path;
        return g.create('span', {className: 'tagItem'}, [m, n]);
    };
    e.exports = k;
}, null);
__d("TagTokenizer", ["Arbiter", "CSS", "DOM", "Parent", "TagToken", "Tokenizer", "createObjectFrom", "ge", "getElementText", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    for (var q in l)if (l.hasOwnProperty(q))s[q] = l[q];
    var r = l === null ? null : l.prototype;
    s.prototype = Object.create(r);
    s.prototype.constructor = s;
    s.__superConstructor__ = l;
    function s(t, u, v, w, x) {
        "use strict";
        l.call(this, v, w, x);
        g.subscribe('PhotoInlineEditor.CANCEL_INLINE_EDITING', this.updateTokenareaVisibility.bind(this), g.SUBSCRIBE_NEW);
        this.appphoto = u;
        g.subscribe(t.getInstance().getEventString('DATA_CHANGE'), this.setup.bind(this), g.SUBSCRIBE_NEW);
    }

    s.prototype.setup = function (t, u) {
        "use strict";
        this.appphoto = u.byapp;
        this.byowner = u.isowner;
        return this.reset();
    };
    s.prototype.reset = function () {
        "use strict";
        var t = this.getTokenElements().map(this.getTokenDataFromTag.bind(this));
        this.withTagKeys = {};
        var u = this.getWithTagTokenElements().map(function (v) {
            return this._tokenKey(this.getTokenDataFromTag(v));
        }.bind(this));
        this.withTagKeys = m(u);
        return r.reset.call(this, t);
    };
    s.prototype.processEvents = function (event, t, u) {
        "use strict";
        if (j.byClass(t, 'remove')) {
            var v = this.getTokenFromElement(u);
            v = this.addTokenData(v, t);
            this.removeToken(v);
            event.kill();
        }
    };
    s.prototype.insertToken = function (t) {
        "use strict";
        return null;
    };
    s.prototype.removeToken = function (t) {
        "use strict";
        if (this.appphoto) {
            return this.replaceToken(t);
        } else {
            this.inform('removeToken', t);
            g.inform('Form/change', {node: this.element});
        }
    };
    s.prototype.addTokenData = function (t, u) {
        "use strict";
        if (j.byClass(u, 'blockuser'))t.blockUser = true;
        return t;
    };
    s.prototype.getTokenDataFromTag = function (t) {
        "use strict";
        return {uid: i.find(t, 'input').value, text: o(i.find(t, '.taggee'))};
    };
    s.prototype.getTokenElementFromTarget = function (t) {
        "use strict";
        return j.byClass(t, 'tagItem');
    };
    s.prototype.getTokenElements = function () {
        "use strict";
        return i.scry(this.tokenarea, 'span.tagItem').filter(this.filterNonTokenElements.bind(this));
    };
    s.prototype.getWithTagTokenElements = function () {
        "use strict";
        return i.scry(this.tokenarea, 'span.withTagItem');
    };
    s.prototype.filterNonTokenElements = function (t) {
        "use strict";
        return !h.hasClass(t, 'markasspam') && !h.hasClass(t, 'reported') && !h.hasClass(t, 'withTagItem');
    };
    s.prototype.createToken = function (t, u) {
        "use strict";
        var v = this.getToken(this._tokenKey(t));
        v = v || new k(t);
        u && v.setElement(u);
        return v;
    };
    s.prototype.updateTokenareaVisibility = function () {
        "use strict";
        var t = this.getTokenElements().filter(function (w) {
            return h.shown(w);
        }), u = this.getWithTagTokenElements(), v = i.scry(this.tokenarea, 'span.ogTagItem');
        h.conditionShow(this.tokenarea, t.length !== 0 || u.length !== 0 || v.length !== 0);
    };
    s.prototype.replaceToken = function (t) {
        "use strict";
        if (!t)return;
        var u = this.tokens.indexOf(t);
        if (u < 0)return;
        this.tokens.splice(this.tokens.indexOf(t), 1);
        delete this.unique[this._tokenKey(t.getInfo())];
        var v = n('tagspam' + t.getValue());
        v && i.remove(v);
        var w = [' [', "\u041c\u0435\u0442\u043a\u0430 \u0443\u0434\u0430\u043b\u0435\u043d\u0430.", ' '];
        w.push(i.create('a', {onclick: this.markAsSpam.bind(this, t.getValue())}, "\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u043c\u0435\u0442\u043a\u0443 \u043a\u0430\u043a \u0441\u043f\u0430\u043c"));
        w.push('] ');
        var x = i.create('span', {className: 'fbPhotosTaglistTag tagItem markasspam', id: 'tagspam' + t.getValue()}, w);
        i.replace(t.getElement(), x);
        this.updateTokenarea();
        this.inform('removeToken', t);
        g.inform('Form/change', {node: this.element});
    };
    s.prototype.markAsSpam = function (t) {
        "use strict";
        var u = n('tagspam' + t), v = [' [', "\u041c\u0435\u0442\u043a\u0430 \u043e\u0442\u043c\u0435\u0447\u0435\u043d\u0430 \u043a\u0430\u043a \u0441\u043f\u0430\u043c", '] '], w = i.create('span', {className: 'fbPhotosTaglistTag tagItem reported', id: 'tagspam' + t}, v);
        i.replace(u, w);
        this.inform('markTagAsSpam', t);
    };
    e.exports = s;
}, null);
__d("TagTypeaheadView", ["AsyncRequest", "ContextualTypeaheadView", "CSS", "DOM", "Parent"], function (a, b, c, d, e, f, g, h, i, j, k) {
    for (var l in h)if (h.hasOwnProperty(l))n[l] = h[l];
    var m = h === null ? null : h.prototype;
    n.prototype = Object.create(m);
    n.prototype.constructor = n;
    n.__superConstructor__ = h;
    function n(o, p) {
        "use strict";
        h.call(this, o, p);
        this.hintText = p.hintText;
        this.userEd = p.userEd;
        this.origAutoSelect = p.autoSelect;
        this.setSuggestions(p.suggestions);
    }

    n.prototype.init = function () {
        "use strict";
        i.addClass(this.element, 'uiTagTypeaheadView');
        m.init.call(this);
    };
    n.prototype.buildResults = function (o) {
        "use strict";
        if (!this.value && this.hintText)o.unshift({subtext: this.hintText, type: 'hintText'});
        if (this.userEd) {
            new g().setURI('/ajax/fof/user_education.php').setData({increment: 1}).send();
            o.unshift({subtext: this.userEd, type: 'userEdText'});
        }
        var p = m.buildResults.call(this, o);
        if (this.userEd)o.shift();
        if (!this.value)o.shift();
        return p;
    };
    n.prototype.show = function () {
        "use strict";
        var o = j.scry(this.context, '.typeaheadBackdrop');
        if (o.length > 0)i.addClass(o[0], 'resultsPresent');
        return m.show.call(this);
    };
    n.prototype.hide = function () {
        "use strict";
        var o = j.scry(this.context, '.typeaheadBackdrop');
        if (o.length > 0)i.removeClass(o[0], 'resultsPresent');
        return m.hide.call(this);
    };
    n.prototype.render = function (o, p, q) {
        "use strict";
        this.autoSelect = this.origAutoSelect && o.length;
        this.disableAutoSelect = o.length === 0;
        m.render.call(this, o, p, q);
    };
    n.prototype.getItems = function () {
        "use strict";
        var o = m.getItems.call(this);
        if (!this.value)o.shift();
        if (this.userEd)o.shift();
        return o;
    };
    n.prototype.getSuggestions = function () {
        "use strict";
        return this.suggestions;
    };
    n.prototype.setSuggestions = function (o) {
        "use strict";
        this.suggestions = o ? o.map(String) : [];
        this.visible = !!this.suggestions.length;
    };
    n.prototype.addSuggestion = function (o) {
        "use strict";
        this.suggestions.unshift(o);
    };
    n.prototype.addTypeaheadFlip = function (o) {
        "use strict";
        i.addClass(this.element, o);
    };
    n.prototype.removeTypeaheadFlip = function (o) {
        "use strict";
        i.removeClass(this.element, o);
    };
    n.prototype.getContext = function () {
        "use strict";
        var o = k.byClass(this.element, 'typeaheadContainer');
        if (o) {
            return o;
        } else return m.getContext.call(this);
    };
    e.exports = n;
}, null);
__d("ProfilePhotoActionLogger", ["Banzai"], function (a, b, c, d, e, f, g) {
    var h = {EVENT_SELECT_METHOD: 'select_method', EVENT_CAMERA_PERMISSION_PROVIDED: 'permission_provided', EVENT_CAMERA_PERMISSION_DENIED: 'permission_denied', EVENT_CAMERA_NO_WEBCAM: 'permission_denied', EVENT_CAMERA_UNKNOWN_MEDIASTREAM_ERROR: 'unknown_mediastream_error', EVENT_CAMERA_TAKE_PHOTO: 'take_photo', EVENT_CAMERA_RETAKE_PHOTO: 'retake_photo', EVENT_CAMERA_UPLOAD_ATTEMPT: 'upload_attempt', EVENT_CAMERA_UPLOAD_ERROR: 'upload_error', EVENT_CAMERA_UPLOAD_SUCCESS: 'upload_success', SOURCE_SUGGESTIONS: 'suggestions', SOURCE_TIMELINE: 'timeline', SOURCE_NUX: 'nux', METHOD_EXISTING: 'existing', METHOD_UPLOAD: 'upload', METHOD_CAMERA: 'camera', log: function (i, j, k) {
        g.post('profile_photo_action', {event: i, source: j, method: k});
    }};
    e.exports = h;
}, null);
__d("ProfileInfoLeftNavItem.react", ["React", "ReactPropTypes", "URI", "Link.react", "XUISpinner.react", "XUIGrayText.react", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = g.createClass({displayName: 'ProfileInfoLeftNavItem', propTypes: {isDisabled: h.bool.isRequired, isSelected: h.bool.isRequired, title: h.string.isRequired, linkuri: h.instanceOf(i)}, render: function () {
        return (g.createElement(g.DOM.li, Object.assign({}, this.props, {className: n(this.props.className, "_47_-")}), g.createElement(j, {className: (("_5pwr") + (this.props.isSelected ? ' ' + "_47__" : '')), href: this.props.linkuri, onClick: function (p) {
            p.preventDefault();
        }}, g.createElement(l, {className: "_5pws", shade: "light", size: "medium", weight: this.props.isSelected ? 'bold' : 'normal'}, this.props.title), g.createElement(k, {className: (("_3m8x") + (this.props.isSelected && this.props.isDisabled ? ' ' + "_3m8y" : ''))}))));
    }});
    e.exports = o;
}, null);
__d("ProfileInfoLeftNav.react", ["AsyncRequest", "PageTransitions", "React", "ReactPropTypes", "SimpleXUIDialog", "URI", "List.react", "ProfileInfoLeftNavItem.react", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = null, q = i.createClass({displayName: 'ProfileInfoLeftNav', propTypes: {initialSelectedIndex: j.number.isRequired, listItemData: j.object.isRequired, listItemTestIDs: j.array.isRequired, overviewContent: j.object, displaySectionToIndex: j.object.isRequired, sectionTitles: j.array.isRequired, testID: j.string.isRequired}, statics: {setOverviewContent: function (r) {
        if (p) {
            p.overviewContent = r;
            p._addOverviewContentListener();
        }
    }}, getInitialState: function () {
        return {selectedIndex: this.props.initialSelectedIndex, asyncRequest: null};
    }, componentWillMount: function () {
        p = this;
        this.overviewContent = this.props.overviewContent;
        h.registerHandler(this._transitionHandler.bind(this));
        this._addOverviewContentListener();
    }, componentWillUnmount: function () {
        if (this.overviewContent)this.overviewContent.removeAllListeners();
        this.shouldReplaceURI = null;
    }, _addOverviewContentListener: function () {
        if (this.overviewContent)this.overviewContent.addListener('navigate', function (r) {
            return this._handleClick(this.props.displaySectionToIndex[r]);
        }.bind(this));
    }, _handleClick: function (r, s) {
        if (this.state.selectedIndex === r)return;
        if (this.state.asyncRequest)this.state.asyncRequest.abort();
        this.shouldReplaceURI = true;
        h.go(this._getRedirectURI(this.props.listItemData.profileSectionsQueryData[r]), false);
        var t = new g().setErrorHandler(this._asyncRequestErrorHandler).setHandler(this._asyncRequestCompletionHandler).setURI(this.props.listItemData.links[r]);
        this.setState({selectedIndex: r, asyncRequest: t});
        t.send();
    }, _getRedirectURI: function (r) {
        var s = l.getRequestURI(), t = this.props.listItemData.queryData;
        return s.setQueryData(Object.assign({}, s.getQueryData(), {section: r}, (Array.isArray(t) ? null : t)));
    }, _transitionHandler: function () {
        if (this.shouldReplaceURI) {
            h.transitionComplete(true);
            this.shouldReplaceURI = false;
            return true;
        }
        return false;
    }, _asyncRequestCompletionHandler: function () {
        this.setState({asyncRequest: null});
        if (this.state.selectedIndex !== 0 && this.overviewContent)this.overviewContent.removeAllListeners();
    }, _asyncRequestErrorHandler: function () {
        this.setState({asyncRequest: null});
        k.show("Sorry, something went wrong while loading this section. Please try again later.");
    }, render: function () {
        return (i.createElement(m, {border: "none", 'data-testid': this.props.testID, spacing: "none"}, this.props.listItemData.links.map(function (r, s) {
            var t = this.state.selectedIndex === s, u = this._getRedirectURI(this.props.listItemData.profileSectionsQueryData[s]);
            return (i.createElement(n, {'data-testid': this.props.listItemTestIDs[s], isDisabled: !!this.state.asyncRequest, isSelected: t, key: s, linkuri: u, onClick: this._handleClick.bind(this, s), title: this.props.sectionTitles[s]}));
        }, this)));
    }});
    e.exports = q;
}, null);
__d("ProfileInfoNavOverview", ["DataStore", "Event", "Parent", "ProfileInfoLeftNav.react", "cx", "destroyOnUnload", "mixInEventEmitter"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = "_5y02", o = "_45nw", p = "_2w77", q = "_5f_8";

    function r(s) {
        "use strict";
        j.setOverviewContent(this);
        var t = h.listen(s, 'click', function (event) {
            var u = event.target, v = i.byClass(u, n) || i.byClass(u, o) || i.byClass(u, p) || i.byClass(u, q);
            if (u.nodeName !== 'A' && v)this.emit('navigate', g.get(v, 'overviewsection'));
        }.bind(this));
        l(function () {
            t.remove();
            t = null;
        });
    }

    m(r, {navigate: true});
    e.exports = r;
}, null);
__d("FreeformTokenizerBehavior", ["Event", "Input", "Keys"], function (a, b, c, d, e, f, g, h, i) {
    function j(k, l) {
        var m = l.matcher && new RegExp(l.matcher, 'i'), n = l.splitter && new RegExp(l.splitter), o = l.tokenize_on_blur !== false, p = l.tokenize_on_paste !== false, q = l.split_on_check === true, r = l.select_on_comma !== false, s = l.select_on_space === true, t = l.never_submit === true;

        function u(event) {
            var v = h.getValue(k.getInput()).trim();
            if (n && event && event.type == 'paste') {
                v = v.split(n);
            } else if (n && q) {
                v = v.split(n);
            } else v = [v];
            var w = false;
            for (var x = 0; x < v.length; x++) {
                var y = v[x].trim();
                if (y && (!m || m.test(y))) {
                    var z = {uid: y, text: y, freeform: true};
                    k.addToken(k.createToken(z));
                    w = true;
                }
            }
            if (event && w) {
                k.getTypeahead().getCore().afterSelect();
                event.kill();
            }
        }

        k.subscribe('keydown', function (v, w) {
            var event = w.event, x = g.getKeyCode(event);
            if (x == i.RETURN || (r && x == i.COMMA) || (s && x == i.SPACE)) {
                var y = k.getTypeahead().getView();
                if (y.getSelection()) {
                    y.select();
                    event.kill();
                } else u(event);
            }
            if (x == i.RETURN && t)event.kill();
        });
        k.subscribe('paste', function (v, w) {
            if (p)setTimeout(u.bind(null, w.event), 20);
        });
        k.subscribe('blur', function (v, w) {
            if (o)u();
            k.getTypeahead().getCore().reset();
        });
    }

    e.exports = j;
}, null);
__d("legacy:FreeformTokenizerBehavior", ["FreeformTokenizerBehavior"], function (a, b, c, d, e, f, g) {
    if (!a.TokenizerBehaviors)a.TokenizerBehaviors = {};
    a.TokenizerBehaviors.freeform = g;
}, 3);
__d("TypeaheadHintText", ["copyProperties", "emptyFunction"], function (a, b, c, d, e, f, g, h) {
    function i(j) {
        "use strict";
        this._typeahead = j;
    }

    i.prototype.enable = function () {
        "use strict";
        this._typeahead.getCore().resetOnKeyup = false;
    };
    g(i.prototype, {disable: h});
    e.exports = i;
}, null);
__d("legacy:HintTextTypeaheadBehavior", ["TypeaheadHintText"], function (a, b, c, d, e, f, g) {
    if (!a.TypeaheadBehaviors)a.TypeaheadBehaviors = {};
    a.TypeaheadBehaviors.hintText = function (h) {
        h.enableBehavior(g);
    };
}, 3);