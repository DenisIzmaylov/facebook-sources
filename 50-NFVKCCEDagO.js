/*!CK:2346014721!*//*1412086471,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["qJB+S"]);
}

__d("FaceboxSourceConstants", [], function (a, b, c, d, e, f) {
    e.exports = {SNOWLIFT_SUGGEST: "snowlift_suggest", SNOWLIFT_DISMISS: "photo_snowlift_unit_suggestions", PERMALINK_SUGGEST: "permalink_suggest", PERMALINK_DISMISS: "photo_permalink_suggestions", UPLOADER_SUGGEST: "uploader_suggest", UPLOADER_DISMISS: "album_uploader_suggestions"};
}, null);
__d("FileInput.react", ["FileInput", "InlineBlock.react", "React", "cx", "invariant", "joinClasses"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = i.createClass({displayName: 'FileInput', render: function () {
        return (i.createElement(h, {className: "_m", ref: "container"}, this.props.children, i.createElement(i.DOM.input, Object.assign({}, this.props, {type: "file", className: l(this.props.className, "_n"), ref: "fileInput"}), undefined)));
    }, componentDidMount: function () {
        var n = this.refs.fileInput.getDOMNode(), o = this.refs.container.getDOMNode(), p = o.firstChild;
        k(p.nodeName === 'A');
        p.setAttribute('rel', 'ignore');
        this._fileInput = new g(o, p, n);
    }, componentWillUnmount: function () {
        this._fileInput.destroy();
        this._fileInput = null;
    }, getFileInput: function () {
        return this._fileInput;
    }});
    e.exports = m;
}, null);
__d("Spotlight.react", ["LayerHideOnBlur", "LayerHideOnEscape", "ReactLayer", "Spotlight"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = i.createClass({getDefaultEnabledBehaviors: function () {
        return {hideOnBlur: g, hideOnEscape: h};
    }, createLayer: function (l) {
        var m = this.enumerateBehaviors(this.props.behaviors), n = {addedBehaviors: m, rootClassName: this.props.rootClassName}, o = new j(n, l);
        o.conditionShow(this.props.shown);
        if (this.props.onBeforeHide)o.subscribe('beforehide', this.props.onBeforeHide);
        if (this.props.onHide)o.subscribe('hide', this.props.onHide);
        return o;
    }, receiveProps: function (l) {
        this.layer.conditionShow(l.shown);
    }});
    e.exports = k;
}, null);
__d("XUIDialogCloseButton.react", ["React", "XUIDialogButton.react", "tx"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.createClass({displayName: 'XUIDialogCloseButton', render: function () {
        return (g.createElement(h, Object.assign({}, this.props, {action: "cancel", label: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c"})));
    }});
    e.exports = j;
}, null);
__d("clamp", [], function (a, b, c, d, e, f) {
    function g(h, i, j) {
        if (i < h)return h;
        if (i > j)return j;
        return i;
    }

    e.exports = g;
}, null);
__d("PhotoTagApproval", ["Arbiter", "CSS", "DOM", "Event", "Parent", "PhotosConst", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n(o) {
        "use strict";
        this.viewer = o;
        this.units = [];
        this.currentUnit = 0;
        var p = o.getVersionConst();
        if (p == l.VIEWER_SNOWLIFT) {
            this._root = m('fbPhotoSnowliftTagApproval');
        } else this._root = m('fbPhotoPageTagApproval');
        g.subscribe(o.getEventString('DATA_CHANGE'), this.restartTagApproval.bind(this));
        g.subscribe('PhotoTagApproval.PENDING_TAG_PHOTO_CLICK', this.pendingTagPhotoClick.bind(this));
        j.listen(this._root, 'click', this.handleClick.bind(this));
        j.listen(this._root, 'mousemove', function (q) {
            this.hiliteCurrentPendingTag();
            j.kill(q);
        }.bind(this));
        this.restartTagApproval();
    }

    n.prototype.handleClick = function (event) {
        "use strict";
        var o = event.getTarget();
        if (h.hasClass(o, 'nextPager') && h.hasClass(o, 'enabled')) {
            this.showNextUnit();
        } else if (h.hasClass(o, 'prevPager') && h.hasClass(o, 'enabled')) {
            this.showPrevUnit();
        } else if (k.byClass(o, 'fbPhotoApprovalPendingButtons')) {
            var p = this.units[this.currentUnit], q = this.getTagNameID(p);
            if (q) {
                var r = k.byClass(o, 'approve');
                g.inform('PhotoTagApproval.UPDATE_TAG_BOX', {id: q, approve: r, version: this.viewer.getVersionConst()});
            }
            setTimeout(this.removeSelectedUnit.bind(this), 0);
        }
        return true;
    };
    n.prototype.loadUnits = function (o) {
        "use strict";
        this.units = i.scry(this._root, 'div.fbPhotoApprovalUnit');
        if (this.units.length) {
            h.show(this._root);
            this.showUnit(o);
            h.conditionClass(this._root, 'hidePagers', this.units.length == 1);
        } else {
            h.hide(this._root);
            g.inform('PhotoTagApproval.HILITE_TAG', {tag: null, version: this.viewer.getVersionConst()});
        }
    };
    n.prototype.restartTagApproval = function () {
        "use strict";
        this.loadUnits(0);
    };
    n.prototype.pendingTagPhotoClick = function (o, p) {
        "use strict";
        if (p.version !== l.VIEWER_PERMALINK && p.version !== l.VIEWER_SNOWLIFT)return true;
        var q = 'approve:' + p.id;
        for (var r = 0; r < this.units.length; r++)if (this.units[r].id === q) {
            this.showUnit(r);
            return false;
        }
        return true;
    };
    n.prototype.removeSelectedUnit = function () {
        "use strict";
        var o = this.units[this.currentUnit];
        i.remove(o);
        this.loadUnits(this.currentUnit);
    };
    n.prototype.showNextUnit = function () {
        "use strict";
        this.showUnit(this.currentUnit + 1);
    };
    n.prototype.showPrevUnit = function () {
        "use strict";
        this.showUnit(this.currentUnit - 1);
    };
    n.prototype.getTagNameID = function (o) {
        "use strict";
        var p = o.id.indexOf(':');
        return o.id.slice(p + 1);
    };
    n.prototype.showUnit = function (o) {
        "use strict";
        this.units.forEach(h.hide);
        this.currentUnit = (o + this.units.length) % this.units.length;
        var p = this.units[this.currentUnit];
        h.show(p);
        this.hiliteCurrentPendingTag();
        h.conditionClass(i.find(this._root, 'a.prevPager'), 'enabled', this.currentUnit > 0);
        h.conditionClass(i.find(this._root, 'a.nextPager'), 'enabled', this.currentUnit < this.units.length - 1);
    };
    n.prototype.hiliteCurrentPendingTag = function () {
        "use strict";
        var o = this.units[this.currentUnit], p = this.getTagNameID(o);
        g.inform('PhotoTagApproval.HILITE_TAG', {tag: p, version: this.viewer.getVersionConst()});
    };
    e.exports = n;
}, null);
__d("legacy:photo-tag-approval", ["PhotoTagApproval"], function (a, b, c, d) {
    a.PhotoTagApproval = b('PhotoTagApproval');
}, 3);
__d("PhotoTagStore", ["AsyncRequest", "copyProperties", "invariant", "isEmpty"], function (a, b, c, d, e, f, g, h, i, j) {
    function k() {
        "use strict";
        this._tagList = {};
        this._textTagList = {};
        this._originalTagList = {};
        this._dirtyPhotosByUid = {};
        k.instance = this;
    }

    k.prototype.getPhotoTags = function (l) {
        "use strict";
        return this._tagList[l] || {};
    };
    k.prototype.photoHasTags = function (l) {
        "use strict";
        return !j(this.getPhotoTags(l));
    };
    k.prototype.clear = function () {
        "use strict";
        this._tagList = {};
        this._textTagList = {};
        this._originalTagList = {};
        this._dirtyPhotosByUid = {};
    };
    k.prototype.revert = function (l) {
        "use strict";
        for (var m in this._tagList)if (!this._originalTagList[m][l]) {
            delete this._tagList[m][l];
        } else this._tagList[m][l] = this._originalTagList[m][l];
        this._dirtyPhotosByUid = {};
    };
    k.prototype.hasNewTags = function () {
        "use strict";
        return !j(this._tagList) || !j(this._textTagList);
    };
    k.prototype.userHasDirtyTags = function (l) {
        "use strict";
        return !j(this._dirtyPhotosByUid[l]);
    };
    k.prototype.userDirtyTagsCount = function (l) {
        "use strict";
        return Object.keys(this._dirtyPhotosByUid[l]).length;
    };
    k.prototype.handleTagFetch = function (l) {
        "use strict";
        for (var m in l)this.loadTagInfo(m, l[m]);
    };
    k.prototype.saveAlbumTagsForUser = function (l, m) {
        "use strict";
        var n = {}, o = [], p = this._dirtyPhotosByUid[l] || {};
        for (var q in p) {
            var r = this._tagList[q][l];
            if (r === undefined) {
                o[o.length] = q;
                continue;
            }
            n[q] = {x: r.x, y: r.y};
        }
        var s = {subject: l, action: 'save', save_tags: n, remove_from: o};
        new g().setURI('/ajax/photos/album/tags.php').setData(s).setHandler(function (t) {
            m(t.payload);
        }).setAllowCrossPageTransition(true).send();
        delete this._dirtyPhotosByUid[l];
    };
    k.prototype.getTagsFromList = function (l) {
        "use strict";
        var m = [];
        for (var n in l)if (l.hasOwnProperty(n))for (var o in l[n])if (l[n].hasOwnProperty(o))m.push(l[n][o]);
        return m;
    };
    k.prototype.getAllTags = function () {
        "use strict";
        var l = this.getTagsFromList(this._tagList), m = this.getTagsFromList(this._textTagList);
        return l.concat(m);
    };
    k.prototype.removeTag = function (l, m) {
        "use strict";
        var n = this._tagList[l], o = this._originalTagList[l] || {};
        if (o[m]) {
            this._dirtyPhotosByUid[m] = this._dirtyPhotosByUid[m] || {};
            this._dirtyPhotosByUid[m][l] = true;
        } else delete this._dirtyPhotosByUid[m][l];
        for (var p in n)if (p == m) {
            var q = this._tagList[l][p];
            delete this._tagList[l][p];
            if (j(this._tagList[l]))delete this._tagList[l];
            return q;
        }
    };
    k.prototype.removeTextTag = function (l, m) {
        "use strict";
        var n = this._textTagList[l];
        if (!j(n[m])) {
            var o = this._textTagList[l][m];
            delete this._textTagList[l][m];
            if (j(this._textTagList[l]))delete this._textTagList[l];
            return o;
        }
    };
    k.prototype.removeAllNewTagsOfUser = function (l) {
        "use strict";
        var m = [];
        if (!this.userHasDirtyTags(l))return m;
        var n = this._dirtyPhotosByUid[l];
        for (var o in n)m.push(this.removeTag(o, l));
        return m;
    };
    k.prototype.removeAllTagsFromPhoto = function (l) {
        "use strict";
        var m = [];
        if (!j(this._tagList[l]))for (var n in this._tagList[l]) {
            if (!this._tagList[l].hasOwnProperty(n))continue;
            m.push(this.removeTag(l, n));
        }
        if (!j(this._textTagList[l]))for (var o in this._textTagList[l]) {
            if (!this._textTagList[l].hasOwnProperty(o))continue;
            m.push(this.removeTextTag(l, o));
        }
        return m;
    };
    k.prototype.storeTag = function (l, m, n, o, p) {
        "use strict";
        this.storeTagWithOptions(l, m, n, o, {can_remove: p});
    };
    k.prototype.rotateTags = function (l, m) {
        "use strict";
        i((m === 'left' || m === 'right'));
        [this._tagList, this._textTagList].forEach(function (n) {
            var o, p, q = n[l];
            if (q)Object.keys(q).forEach(function (r) {
                o = q[r];
                if (m === 'left') {
                    p = o.x;
                    o.x = o.y;
                    o.y = 100 - p;
                } else {
                    p = o.y;
                    o.y = o.x;
                    o.x = 100 - p;
                }
            });
        });
    };
    k.prototype.storeTagWithOptions = function (l, m, n, o, p) {
        "use strict";
        this._dirtyPhotosByUid[m] = this._dirtyPhotosByUid[m] || {};
        this._dirtyPhotosByUid[m][l] = true;
        var q = {x: n, y: o};
        h(q, p);
        if (!m) {
            this._textTagList[l] = this._textTagList[l] || {};
            this._textTagList[l][q.name] = q;
        } else {
            this._tagList[l] = this._tagList[l] || {};
            this._tagList[l][m] = q;
        }
    };
    k.prototype.loadTagInfo = function (l, m) {
        "use strict";
        this._tagList[l] = {};
        this._originalTagList[l] = {};
        for (var n = 0; n < m.length; n++) {
            var o = m[n];
            this._tagList[l][o.subject] = o;
            this._originalTagList[l][o.subject] = o;
        }
    };
    k.getInstance = function () {
        "use strict";
        if (k.instance === null)new k();
        return k.instance;
    };
    k.instance = null;
    e.exports = k;
}, null);
__d("PhotosTaggingWaterfall", ["AsyncSignal", "copyProperties"], function (a, b, c, d, e, f, g, h) {
    function i(j) {
        i._queueName = j || i._queueName;
    }

    h(i, {BEGIN: "begin", TAG_FACE: "tag_face", HOVER_TAG_FACE: "hover_tag_face", SHOW_SUGGEST: "show_suggest", ADD_NAME: "add_name", TAG_CONFIRMED: "tag_confirmed", FINISH: "finish", TYPE_NAME: 'type_name', SELECT_NAME: 'select_name', _queueName: null, sendSignal: function (j, k) {
        new g('/ajax/photos/tag_waterfall.php', {data: JSON.stringify(j)}).setHandler(k).send();
    }});
    e.exports = i;
}, null);
__d("ProfilePictureFlowLogging", ["Arbiter", "Banzai", "Event", "Parent", "ProfilePhotoActionLogger", "Run", "TimelineProfilePicConfig", "TimelineProfilePictureLoggerEnums", "tidyEvent"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = m.loading, q = m.success, r = 'data-action-type', s, t, u;

    function v() {
        u && u.unsubscribe();
        u = null;
    }

    var w = {action: n.actions, flow: n.flows, step: n.steps, log: function (x) {
        var y = x || w.step.INIT;
        h.post('profile_pic_action', {action_type: s, flow_type: t, step_type: y});
        if (s == w.action.UPLOAD && y == w.step.INIT)k.log(k.EVENT_SELECT_METHOD, k.SOURCE_TIMELINE, k.METHOD_UPLOAD);
        t = null;
        if (x === 'success' || x === 'fail')s = null;
        return w;
    }, setAction: function (x) {
        s = x;
        return w;
    }, setFlowType: function (x) {
        t = x;
        return w;
    }, init: function (x) {
        if (!u) {
            u = g.subscribe([p, q], function (y) {
                w.log(y === p ? n.steps.LOADING : n.steps.SUCCESS);
            });
            l.onLeave(v);
        }
        o(i.listen(x, 'click', function (y) {
            var z = j.byAttribute(y.getTarget(), r);
            if (!z)return;
            w.setAction(z.getAttribute(r)).log();
        }));
    }, initMenuItems: function (x, y) {
        w.init(x.getRoot());
        if (!y)return;
        var z = y.getFileForm();
        o([z.subscribe('submit', function () {
            w.log(w.step.UPLOAD_SELECT).log(w.step.LOADING);
        }), z.subscribe('success', function () {
            w.log(w.step.UPLOAD_SUCCESS).log(w.step.SUCCESS);
        }), z.subscribe('fail', function () {
            w.log(w.step.FAIL);
        })]);
    }};
    e.exports = w;
}, null);
__d("XProfilePicCropAsyncControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/profile\/picture\/crop_profile_pic\/", {photo_id: {type: "Int", required: true}, profile_id: {type: "Int", required: true}, height: {type: "Float", required: true}, width: {type: "Float", required: true}, x: {type: "Float", required: true}, y: {type: "Float", required: true}, source: {type: "Enum"}, method: {type: "Enum"}});
}, null);
__d("XProfilePicMakeAsyncControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/profile\/picture\/make_profile_pic\/", {end_x: {type: "Float"}, end_y: {type: "Float"}, photo_id: {type: "Int", required: true}, profile_id: {type: "Int", required: true}, source: {type: "Enum"}, start_x: {type: "Float"}, start_y: {type: "Float"}, method: {type: "Enum"}});
}, null);
__d("XProfilePicSaver", ["AsyncRequest", "ArbiterMixin", "ProfilePictureFlowLogging", "XProfilePicCropAsyncControllerURIBuilder", "XProfilePicMakeAsyncControllerURIBuilder", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = i.step, n = l(h);
    for (var o in n)if (n.hasOwnProperty(o))q[o] = n[o];
    var p = n === null ? null : n.prototype;
    q.prototype = Object.create(p);
    q.prototype.constructor = q;
    q.__superConstructor__ = n;
    function q(r, s) {
        "use strict";
        this.$XProfilePicSaver0 = r;
        this.$XProfilePicSaver1 = s;
    }

    q.prototype.setProfilePhotoSource = function (r) {
        "use strict";
        this.$XProfilePicSaver2 = r;
        return this;
    };
    q.prototype.setProfilePhotoMethod = function (r) {
        "use strict";
        this.$XProfilePicSaver3 = r;
        return this;
    };
    q.prototype.setFlowType = function (r) {
        "use strict";
        this.$XProfilePicSaver4 = r;
        return this;
    };
    q.prototype.saveCroppedProfilePic = function (r) {
        "use strict";
        this.$XProfilePicSaver5 = true;
        this.$XProfilePicSaver6(new j().setFloat('x', r.x).setFloat('y', r.y).setFloat('width', Math.min(r.width, 1)).setFloat('height', Math.min(r.height, 1)));
        this.$XProfilePicSaver7(m.CROP_SAVING);
    };
    q.prototype.saveAsProfilePic = function () {
        "use strict";
        this.$XProfilePicSaver8();
    };
    q.prototype.saveAsProfilePicWithPosition = function (r) {
        "use strict";
        this.$XProfilePicSaver8(r);
    };
    q.prototype.$XProfilePicSaver8 = function (r) {
        "use strict";
        this.$XProfilePicSaver5 = false;
        var s = new k();
        if (r)s.setFloat('start_x', 100 * r.startX).setFloat('start_y', 100 * r.startY).setFloat('end_x', 100 * r.endX).setFloat('end_y', 100 * r.endY);
        this.$XProfilePicSaver6(s);
        this.$XProfilePicSaver7(m.PREVIOUS_PIC_SAVING);
    };
    q.prototype.$XProfilePicSaver9 = function (r) {
        "use strict";
        this.inform('error', r);
        this.$XProfilePicSaver7(this.$XProfilePicSaver5 ? m.CROP_FAIL : m.PREVIOUS_PIC_FAIL);
    };
    q.prototype.$XProfilePicSaver7 = function (r) {
        "use strict";
        this.$XProfilePicSaver4 && i.setFlowType(this.$XProfilePicSaver4);
        i.log(r);
    };
    q.prototype.$XProfilePicSaver6 = function (r) {
        "use strict";
        r.setInt('photo_id', this.$XProfilePicSaver0).setInt('profile_id', this.$XProfilePicSaver1).setEnum('source', this.$XProfilePicSaver2 || 'photo_view');
        this.$XProfilePicSaver3 && r.setEnum('method', this.$XProfilePicSaver3);
        new g(r.getURI()).setErrorHandler(this.$XProfilePicSaver9.bind(this)).setHandler(this.$XProfilePicSavera.bind(this)).send();
        this.$XProfilePicSaver7(m.LOADING);
    };
    q.prototype.$XProfilePicSavera = function (r) {
        "use strict";
        this.inform('success', r);
        this.$XProfilePicSaver7(this.$XProfilePicSaver5 ? m.CROP_SUCCESS : m.PREVIOUS_PIC_SUCCESS);
        this.$XProfilePicSaver7(m.SUCCESS);
    };
    e.exports = q;
}, null);
__d("ProfilePicRequestCreator", ["URI", "XProfilePicSaver", "tidyEvent"], function (a, b, c, d, e, f, g, h, i) {
    function j(k, l) {
        "use strict";
        this.saver = new h(String(k), String(l));
        i([this.saver.subscribe('success', this.$ProfilePicRequestCreator0.bind(this)), this.saver.subscribe('error', this.$ProfilePicRequestCreator1.bind(this))]);
        this.setSuccessURI(new g('/profile.php').setQueryData({id: l}));
        this.setErrorURI(new g('/photo.php').setQueryData({pid: k, profile_id: l}));
    }

    j.prototype.setSuccessURI = function (k) {
        "use strict";
        this.$ProfilePicRequestCreator2 = k;
        return this;
    };
    j.prototype.setErrorURI = function (k) {
        "use strict";
        this.$ProfilePicRequestCreator3 = k;
        return this;
    };
    j.prototype.setProfilePhotoSource = function (k) {
        "use strict";
        k && this.saver.setProfilePhotoSource(k);
        return this;
    };
    j.prototype.setProfilePhotoMethod = function (k) {
        "use strict";
        k && this.saver.setProfilePhotoMethod(k);
        return this;
    };
    j.prototype.setFlowType = function (k) {
        "use strict";
        this.saver.setFlowType(k);
        return this;
    };
    j.prototype.savePic = function () {
        "use strict";
        this.saver.saveAsProfilePic();
    };
    j.prototype.saveCrop = function (k, l) {
        "use strict";
        this.saver.saveCroppedProfilePic({x: k.x / l.x, y: k.y / l.y, width: k.width / l.x, height: k.height / l.y});
    };
    j.prototype.$ProfilePicRequestCreator0 = function () {
        "use strict";
        this.$ProfilePicRequestCreator2.go(true);
    };
    j.prototype.$ProfilePicRequestCreator1 = function () {
        "use strict";
        this.$ProfilePicRequestCreator3.go(true);
    };
    e.exports = j;
}, null);
__d("PhotocropConstraintConstants", [], function (a, b, c, d, e, f) {
    var g = {BOUNDARY: 'boundary', SQUARE: 'square', WIDE: 'wide'};
    g.getAspectRatioForType = function (h) {
        switch (h) {
            case g.SQUARE:
                return 1;
            case g.WIDE:
                return 16 / 9;
            default:
                return null;
        }
    };
    e.exports = g;
}, null);
__d("PhotocropConstraint", ["Vector", "PhotocropConstraintConstants", "clamp"], function (a, b, c, d, e, f, g, h, i) {
    function j(p) {
        "use strict";
        this.photocrop = p;
        this.pos = null;
    }

    j.prototype.onMouseMove = function (p, q, r) {
        "use strict";
        var s = p.sub(this.pos);
        if (q) {
            this.onResize(s, r);
        } else this.onMove(s);
        this.pos = this.pos.add(s);
    };
    j.prototype.onMouseDown = function (p) {
        "use strict";
        this.pos = p;
    };
    j.prototype.onResize = function (p, q) {
        "use strict";
    };
    j.prototype.onMove = function (p) {
        "use strict";
        var q = this.photocrop.box, r = this.photocrop.wrapper.offsetWidth, s = this.photocrop.wrapper.offsetHeight;
        p.x = i(-q.l, p.x, r - q.r);
        p.y = i(-q.t, p.y, s - q.b);
        this.photocrop.box = q.add(p);
    };
    for (var k in j)if (j.hasOwnProperty(k))m[k] = j[k];
    var l = j === null ? null : j.prototype;
    m.prototype = Object.create(l);
    m.prototype.constructor = m;
    m.__superConstructor__ = j;
    function m() {
        "use strict";
        if (j !== null)j.apply(this, arguments);
    }

    m.prototype.onResize = function (p, q) {
        "use strict";
        var r = this.photocrop.min_width, s = this.photocrop.min_height, t = this.photocrop.box, u = this.photocrop.wrapper.offsetWidth, v = this.photocrop.wrapper.offsetHeight;
        switch (q) {
            case 'ne':
                t.r += p.x = i(t.l + r - t.r, p.x, u - t.r);
                t.t += p.y = i(-t.t, p.y, t.b - s - t.t);
                break;
            case 'nw':
                t.l += p.x = i(-t.l, p.x, t.r - r - t.l);
                t.t += p.y = i(-t.t, p.y, t.b - s - t.t);
                break;
            case 'se':
                t.r += p.x = i(t.l + r - t.r, p.x, u - t.r);
                t.b += p.y = i(t.t + s - t.b, p.y, v - t.b);
                break;
            case 'sw':
                t.l += p.x = i(-t.l, p.x, t.r - r - t.l);
                t.b += p.y = i(t.t + s - t.b, p.y, v - t.b);
                break;
        }
    };
    for (k in j)if (j.hasOwnProperty(k))n[k] = j[k];
    n.prototype = Object.create(l);
    n.prototype.constructor = n;
    n.__superConstructor__ = j;
    function n() {
        "use strict";
        if (j !== null)j.apply(this, arguments);
    }

    n.prototype.setRatio = function (p) {
        "use strict";
        this.ratio = p;
        return this;
    };
    n.prototype.onMouseDown = function (p) {
        "use strict";
        l.onMouseDown.call(this, p);
        var q = this.photocrop.box, r = q.r - q.l, s = q.b - q.t;
        this.displacement = new g(r, s);
    };
    n.prototype.$AspectRatioConstraint0 = function (p, q, r, s, t, u) {
        "use strict";
        var v, w, x, y, z;
        v = this.displacement.x / this.displacement.y;
        w = y = i(p, q, r);
        x = z = i(s, t, u);
        if (v > this.ratio) {
            x = i(s, w / this.ratio, u);
            w = x * this.ratio;
        } else {
            w = i(p, x * this.ratio, r);
            x = w / this.ratio;
        }
        return new g(w, x);
    };
    n.prototype.onResize = function (p, q) {
        "use strict";
        var r = this.photocrop.min_width, s = this.photocrop.min_height, t = this.photocrop.box, u = this.photocrop.wrapper.offsetWidth, v = this.photocrop.wrapper.offsetHeight, w;
        switch (q) {
            case 'ne':
                this.displacement = this.displacement.add(p.x, -p.y);
                w = this.$AspectRatioConstraint0(r, this.displacement.x, u - t.l, s, this.displacement.y, t.b);
                t.r = t.l + w.x;
                t.t = t.b - w.y;
                break;
            case 'nw':
                this.displacement = this.displacement.add(-p.x, -p.y);
                w = this.$AspectRatioConstraint0(r, this.displacement.x, t.r, s, this.displacement.y, t.b);
                t.l = t.r - w.x;
                t.t = t.b - w.y;
                break;
            case 'se':
                this.displacement = this.displacement.add(p.x, p.y);
                w = this.$AspectRatioConstraint0(r, this.displacement.x, u - t.l, s, this.displacement.y, v - t.t);
                t.r = t.l + w.x;
                t.b = t.t + w.y;
                break;
            case 'sw':
                this.displacement = this.displacement.add(-p.x, p.y);
                w = this.$AspectRatioConstraint0(r, this.displacement.x, t.r, s, this.displacement.y, v - t.t);
                t.l = t.r - w.x;
                t.b = t.t + w.y;
                break;
        }
    };
    function o(p, q) {
        var r;
        switch (q) {
            case h.BOUNDARY:
                r = new m(p);
                break;
            case h.WIDE:
            case h.SQUARE:
                r = new n(p).setRatio(h.getAspectRatioForType(q));
                break;
            default:
                throw Error('unsupported PhotocropConstraint type');
        }
        return r;
    }

    e.exports = o;
}, null);
__d("Photocrop2", ["ArbiterMixin", "PhotocropConstraintConstants", "CSS", "DOM", "Event", "PhotosConst", "Rect", "Style", "Vector", "copyProperties", "mixin", "PhotocropConstraint"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = q(g);
    for (var t in s)if (s.hasOwnProperty(t))v[t] = s[t];
    var u = s === null ? null : s.prototype;
    v.prototype = Object.create(u);
    v.prototype.constructor = v;
    v.__superConstructor__ = s;
    function v(w, x, y) {
        "use strict";
        this.photo = w;
        var z = this.getPhotoDimensions();
        if (y) {
            this.imageDimensions = new o(y.x, y.y);
        } else this.imageDimensions = new o(z.x, z.y);
        x.height = x.height || l.PIC_NORMAL_FBX_SIZE;
        x.width = x.width || l.PIC_NORMAL_FBX_SIZE;
        p(this, {target: this.photo.parentNode, create_target: false, target_parent: this.photo.parentNode, min_width: l.PIC_NORMAL_FBX_SIZE, min_height: l.PIC_NORMAL_FBX_SIZE, center_x: (z.x || x.width) / 2, center_y: (z.y || x.height) / 2, constraint_type: h.BOUNDARY}, x);
        this._unscaledMinHeight = this.min_height;
        this._unscaledMinWidth = this.min_width;
        this._unscaledHeight = this.height;
        this._unscaledWidth = this.width;
        this.setInitialDimensionsAndPos();
        if (this.create_target) {
            this.target = j.create('div');
            i.addClass(this.target, 'stageCropper');
            this.target_parent.appendChild(this.target);
        }
        i.addClass(this.target, 'photocrop');
        ['bg', 'wrapper', 'viewport'].forEach(function (aa) {
            this[aa] = j.create('div');
            i.addClass(this[aa], aa);
        }.bind(this));
        this.highlight = j.create('img');
        i.addClass(this.highlight, 'highlight');
        this.setHighlightSource();
        i.addClass(this.wrapper, 'photocropWrapper');
        this.target.appendChild(this.bg);
        this.target.appendChild(this.wrapper);
        this.wrapper.appendChild(this.highlight);
        this.wrapper.appendChild(this.viewport);
        ['ne', 'nw', 'sw', 'se'].forEach(function (aa) {
            var ba = j.create('div');
            i.addClass(ba, aa);
            ba.setAttribute('data-cropcorner', aa);
            this.viewport.appendChild(ba);
            i.addClass(ba, 'profilePicViewportGrabby');
        }.bind(this));
        k.listen(this.viewport, {mousedown: this.mousedown.bind(this), dragstart: k.kill, selectstart: k.kill, click: k.stop});
        k.listen(document, {mousemove: this.mousemove.bind(this), mouseup: this.mouseup.bind(this)});
        k.listen(window, {resize: this.adjustForResize.bind(this)});
        this.realignToPictureSize();
        this.redraw();
    }

    v.prototype.setInitialDimensionsAndPos = function () {
        "use strict";
        this._constraint = r(this, this.constraint_type);
        var w = h.getAspectRatioForType(this.constraint_type), x = this.getPhotoDimensions();
        if (w) {
            this._unscaledMinHeight = this._unscaledMinWidth / w;
            this._unscaledHeight = this._unscaledWidth / w;
        }
        this.setNewRatio();
        var y = Math.min(this.width, x.x), z = Math.min(this.height, x.y);
        this.min_width = Math.min(this.min_width, x.x);
        this.min_height = Math.min(this.min_height, x.y);
        if (w)if (x.x / x.y > w) {
            z = Math.min(z, x.y);
            y = z * w;
            this.min_width = this.min_height * w;
        } else {
            y = Math.min(y, x.x);
            z = y / w;
            this.min_height = this.min_width / w;
        }
        var aa = this.center_x - y / 2, ba = this.center_y - z / 2;
        this.box = new m(ba, aa + y, ba + z, aa);
    };
    v.prototype.getPhotoDimensions = function () {
        "use strict";
        return new o(Math.round(parseFloat(n.get(this.photo, 'width'))), Math.round(parseFloat(n.get(this.photo, 'height'))));
    };
    v.prototype.getPhotoPosition = function () {
        "use strict";
        return new o(this.photo.offsetLeft, this.photo.offsetTop);
    };
    v.prototype.setHighlightSource = function () {
        "use strict";
        this.highlight.src = this.photo.src;
    };
    v.prototype.setConstraintType = function (w) {
        "use strict";
        this.constraint_type = w;
        this.setInitialDimensionsAndPos();
        this.adjustForResize();
    };
    v.prototype.adjustForResize = function () {
        "use strict";
        var w = this.ratio, x = this.setNewRatio(), y = x / w;
        this.box.t *= y;
        this.box.l *= y;
        this.box.b *= y;
        this.box.r *= y;
        this.redraw();
        this.realignToPictureSize();
    };
    v.prototype.setNewRatio = function () {
        "use strict";
        this.ratio = this.getPhotoDimensions().x / this.imageDimensions.x;
        this.min_width = this.ratio * this._unscaledMinWidth;
        this.min_height = this.ratio * this._unscaledMinHeight;
        this.width = Math.max(1, this.ratio) * this._unscaledWidth;
        this.height = Math.max(1, this.ratio) * this._unscaledHeight;
        return this.ratio;
    };
    v.prototype.realignToPictureSize = function () {
        "use strict";
        var w = this.photo;
        if (!w)return;
        var x = this.getPhotoDimensions(), y = this.getPhotoPosition();
        [this.bg, this.wrapper].forEach(function (z) {
            z.style.width = x.x + 'px';
            z.style.height = x.y + 'px';
            z.style.top = y.y + 'px';
            z.style.left = y.x + 'px';
        });
    };
    v.prototype.redraw = function () {
        "use strict";
        var w = [this.box.t, this.box.r, this.box.b, this.box.l], x = this.getPhotoDimensions();
        this.highlight.style.width = x.x + "px";
        this.highlight.style.height = x.y + "px";
        this.highlight.style.clip = "rect(" + w.join("px ") + "px)";
        this.viewport.style.top = this.box.t + "px";
        this.viewport.style.left = this.box.l + "px";
        this.viewport.style.height = (this.box.b - this.box.t) + "px";
        this.viewport.style.width = (this.box.r - this.box.l) + "px";
    };
    v.prototype.done = function (w) {
        "use strict";
        this.freezeViewport = true;
        if (!w) {
            [this.bg, this.wrapper].forEach(j.remove);
            if (this.create_target) {
                j.remove(this.target);
                this.target = null;
            } else i.removeClass(this.target, 'photocrop');
        }
        var x = Math.round(this.box.l * (1 / this.ratio)), y = Math.round(this.box.t * (1 / this.ratio)), z = Math.round(this.box.r * (1 / this.ratio)), aa = Math.round(this.box.b * (1 / this.ratio));
        this.inform('done', w);
        return {x: Math.max(x, 0), y: Math.max(y, 0), width: z - Math.max(x, 0), height: aa - Math.max(y, 0)};
    };
    v.prototype.reset = function () {
        "use strict";
        this.freezeViewport = false;
    };
    v.prototype.mousedown = function (w) {
        "use strict";
        if (this.freezeViewport)return;
        this.mouseTarget = w.getTarget();
        this._constraint.onMouseDown(o.getEventPosition(w));
        i.addClass(document.body, 'draggingMode');
        return false;
    };
    v.prototype.mousemove = function (w) {
        "use strict";
        if (!this.mouseTarget)return;
        this._constraint.onMouseMove(o.getEventPosition(w), this.mouseTarget !== this.viewport, this.mouseTarget.getAttribute('data-cropcorner'));
        this.redraw();
        return false;
    };
    v.prototype.mouseup = function (w) {
        "use strict";
        this.mouseTarget = null;
        i.removeClass(document.body, 'draggingMode');
    };
    e.exports = v;
}, null);
__d("PhotoTagger", ["Arbiter", "AsyncRequest", "CSS", "DOM", "Event", "FaceboxSourceConstants", "Hovercard", "Keys", "Parent", "PhotosConst", "PhotosTaggingWaterfall", "PhotosUtils", "PhotoTagStore", "React", "SimpleXUIDialog", "Style", "Vector", "XUIDialogCloseButton.react", "copyProperties", "csx", "getElementPosition", "removeFromArray", "userAction"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca) {
    function da(fa, ga) {
        return ((fa % ga) + ga) % ga;
    }

    function ea(fa) {
        "use strict";
        this.viewer = fa;
        this.version = fa.getVersionConst();
        this.datasources = {};
        this.photoData = {};
        this.tagRects = {};
        this.ajaxURIs = {tagsInit: '/ajax/photos/photo/tags/tags_init.php', tagsAlbum: '/ajax/photos/photo/tags/tags_album.php', fetchDatasource: '/ajax/photos/photo/tags/fetch_datasource.php', tagAction: '/ajax/photo_tagging_ajax.php', tagWithAction: '/ajax/with_tagging_ajax.php'};
        this.recognizedUsers = [];
        this.addedSuggestions = [];
        this.featuredSuggestions = [];
        this.albumSuggestions = [];
        this.friendSuggestions = [];
        this.suggestionAlbum = -1;
        ea.instances[this.version] = this;
    }

    ea.prototype.initSnowlift = function (fa, ga, ha) {
        "use strict";
        this._init(fa, ga, ha, this.viewer.container);
    };
    ea.prototype.initPermalink = function (fa, ga, ha) {
        "use strict";
        this._init(fa, ga, ha, this.viewer.actionList);
    };
    ea.prototype._init = function (fa, ga, ha, ia) {
        "use strict";
        this.setupUserActionLogging();
        this.root = this.viewer.getRoot();
        this.tagger = fa;
        this.tokenizer = ga;
        this._qn = null;
        this.typeahead = ga.getTypeahead();
        this.userId = ha;
        this.makeProfilePicMenuContainer = ia;
        this.faceboxes = [];
        this.tags = [];
        this.currentFacebox = null;
        this.revokedFaceboxes = [];
        this.requestFaceboxNextTag = false;
        this.clickState = j.find(this.root, 'div.stageActions');
        this.newTagBox = j.find(this.clickState, 'div.newTagBox');
        this.addTagLink = j.find(this.root, this.elemNames[this.version].addTagLink);
        this.overlayActions = j.find(this.root, this.elemNames[this.version].overlayActions);
        this.setupHandlers();
        this.hideNewTagTimer = null;
        this.needAlbumSuggestionsFetch = true;
        this.fetchTaggingSuggestions({owner: this.photoData.owner});
        this.setDataSource(this.typeahead.getData());
        this.updateFaceboxes();
        this.tagAccumulating = false;
        return this;
    };
    ea.prototype.setTagAccumulator = function (fa) {
        "use strict";
        this.tagAccumulating = fa;
    };
    ea.prototype.setupUserActionLogging = function () {
        "use strict";
        this.ua = ca(this.viewer.getSourceString()).uai('init', 'tagging').add_event('init');
    };
    ea.prototype.logUserActionEvent = function (fa) {
        "use strict";
        this.ua.add_event(fa);
    };
    ea.prototype.fetchTaggingSuggestions = function (fa) {
        "use strict";
        this.logUserActionEvent('sugg_fetch');
        new h().setURI(this.ajaxURIs.tagsInit).setData(fa).setOption('retries', 1).setAllowCrossPageTransition(true).setHandler(function (ha) {
            var ia = ha.getPayload();
            this.featuredSuggestions = ia.featuredTaggees;
            this.friendSuggestions = ia.friendTaggees;
            this.updateTypeaheadSuggestions();
            this.logUserActionEvent('sugg_fetch_done');
        }.bind(this)).send();
        var ga = this.typeahead.subscribe('bootstrap', function (ha, ia) {
            if (ia && !ia.bootstrapping) {
                if (this.taggingMode)this.updateWithSuggestions();
                this.typeahead.unsubscribe(ga);
                this.typeahead.subscribe('focus', function () {
                    if (this.taggingMode)this.updateWithSuggestions();
                }.bind(this));
                this.typeahead.subscribe('click', function () {
                    if (!this.taggingMode)this.updateWithSuggestions();
                }.bind(this));
                this.tokenizer.subscribe('removeToken', this.updateWithSuggestions.bind(this));
                this.tokenizer.subscribe('addToken', this.addSuggestion.bind(this));
                this.typeahead.subscribe('respond', function (ja, ka) {
                    if (this.taggingMode && ka && !ka.results.length)this.updateWithSuggestions();
                }.bind(this));
            }
        }.bind(this));
    };
    ea.prototype.fetchAlbumTaggingSuggestions = function () {
        "use strict";
        this.logUserActionEvent('sugg_album_fetch');
        new h().setURI(this.ajaxURIs.tagsAlbum).setData({cachedAlbum: this.suggestionAlbum, photo: this.photoData.fbid}).setOption('retries', 1).setAllowCrossPageTransition(true).setHandler(function (fa) {
            this.needAlbumSuggestionsFetch = false;
            var ga = fa.getPayload();
            if (ga.length === 0)return;
            this.suggestionAlbum = ga.album;
            this.albumSuggestions = ga.taggees;
            this.updateTypeaheadSuggestions();
            this.logUserActionEvent('sugg_album_fetch_done');
        }.bind(this)).send();
    };
    ea.prototype.resetAlbumTaggingSuggestions = function () {
        "use strict";
        this.needAlbumSuggestionsFetch = true;
        this.updateTypeaheadSuggestions();
    };
    ea.prototype.updateTypeaheadSuggestions = function () {
        "use strict";
        this.typeahead.getView().setSuggestions(this.addedSuggestions.concat(this.recognizedUsers, this.featuredSuggestions, this.needAlbumSuggestionsFetch ? [] : this.albumSuggestions, this.friendSuggestions));
    };
    ea.prototype.saveClickPosition = function (fa, ga) {
        "use strict";
        var ha = w.getElementPosition(fa), ia = w.getElementDimensions(fa);
        this.clickPercentToPhoto = new w((ga.x - ha.x) / ia.x, (ga.y - ha.y) / ia.y);
    };
    ea.prototype.getCalculatedClickPosition = function (fa) {
        "use strict";
        var ga = w.getElementPosition(fa), ha = w.getElementDimensions(fa);
        if (ha.x === 0 || ha.y === 0)return null;
        return new w(this.clickPercentToPhoto.x * ha.x + ga.x, this.clickPercentToPhoto.y * ha.y + ga.y, 'document');
    };
    ea.prototype.repositionTagger = function () {
        "use strict";
        if (this.clickPercentToPhoto) {
            var fa = this.viewer.getImage(), ga = this.getCalculatedClickPosition(fa);
            if (!ga)return;
            this.addTagFromClickPos(ga);
        }
    };
    ea.prototype.setupHandlers = function () {
        "use strict";
        this.handlers = [k.listen(this.clickState, 'click', this.addTag.bind(this)), k.listen(this.addTagLink, 'click', this.checkActions.bind(this)), k.listen(this.overlayActions, 'click', this.checkActions.bind(this))];
        k.listen(document.documentElement, 'keydown', function (event) {
            if (!this.taggingMode)return;
            var fa = k.getKeyCode(event);
            if (fa === n.ESC) {
                this.deactivateTagging();
            } else if (fa === n.TAB)this.addNextTagFromFacebox(event.shiftKey ? -1 : 1);
        }.bind(this));
        this.subscriptions = [g.subscribe(this.viewer.getEventString('PAGE'), this.restartTagging.bind(this)), g.subscribe(this.viewer.getEventString('DATA_CHANGE'), this.setPhotoData.bind(this)), g.subscribe(this.viewer.getEventString('EXTRA_DATA_CHANGE'), this.setExtraData.bind(this)), g.subscribe(this.viewer.getEventString('CLOSE'), this.deactivateTagging.bind(this))];
        this.tokenizer.subscribe('addToken', this.saveTag.bind(this));
        this.tokenizer.subscribe('removeToken', this.removeTag.bind(this));
        this.tokenizer.subscribe('markTagAsSpam', this.markTagAsSpam.bind(this));
    };
    ea.prototype.updateWithSuggestions = function (fa, ga) {
        "use strict";
        var ha = this.typeahead.getData().buildUids(' ', this.typeahead.getView().getSuggestions(), this.typeahead.getCore().getExclusions());
        if (!ha.length)return;
        var ia = this.typeahead.getData().respond('', ha);
        for (var ja = 0; ja < ia.length; ja++)ia[ja].index = -1000 + ja;
    };
    ea.prototype.addSuggestion = function (fa, ga) {
        "use strict";
        var ha = ga.info && ga.info.uid;
        if (ha) {
            this.addedSuggestions.unshift(ha);
            this.updateTypeaheadSuggestions();
        }
    };
    ea.prototype.setQueueName = function (fa) {
        "use strict";
        this._qn = fa;
        return this;
    };
    ea.prototype._sendWaterfallLogSignal = function (fa) {
        "use strict";
        q.sendSignal({qn: this._qn, source: this.viewer.getSourceString(), step: fa, pid: this.photoData.pid});
    };
    ea.prototype._sendFaceboxSuggestionLogSignal = function (fa, ga) {
        "use strict";
        q.sendSignal({step: q.SHOW_SUGGEST, photo_owner: this.photoData.owner, tagee: fa, is_first: true, source: ga});
    };
    ea.prototype._bumpQueueName = function () {
        "use strict";
        if (this._qn)this._qn += 1;
    };
    ea.prototype.activateTagging = function () {
        "use strict";
        this.logUserActionEvent('activate');
        g.inform('PhotoTagger.ACTIVATE_TAGGING');
        if (this.getDataSource()) {
            this.dataSourceFetched(this.getDataSource());
        } else new h(this.ajaxURIs.fetchDatasource).setData({fbid: this.photoData.fbid, version: this.version}).send();
        if (this.needAlbumSuggestionsFetch)this.fetchAlbumTaggingSuggestions();
    };
    ea.prototype.restartTagging = function () {
        "use strict";
        this.hideNewTag();
        this.hideTagger();
        this.revokedFaceboxes = [];
        this.setCurrentFacebox(null);
        if (this.taggingMode) {
            this.requestFaceboxNextTag = true;
            this.activateTagging();
        }
    };
    ea.prototype.getDataSource = function () {
        "use strict";
        return this.datasources[this.getDataSourceKey()];
    };
    ea.prototype.getDataSourceKey = function () {
        "use strict";
        if (this.photoData.ownertype == 'user' && !this.photoData.obj_id)return 'friends';
        return this.photoData.obj_id || this.photoData.owner;
    };
    ea.prototype.setDataSource = function (fa) {
        "use strict";
        if (this.typeahead.getData() != fa)this.typeahead.swapData(fa);
        this.datasources[this.getDataSourceKey()] = fa;
    };
    ea.prototype.dataSourceFetched = function (fa) {
        "use strict";
        this.taggingMode = true;
        i.addClass(this.root, 'taggingMode');
        g.inform('PhotoTagger.ACTIVATED_TAGGING');
        this._bumpQueueName();
        this._sendWaterfallLogSignal(q.BEGIN);
        this.setDataSource(fa);
    };
    ea.prototype.deactivateTagging = function () {
        "use strict";
        this.logUserActionEvent('deactivate');
        if (this.taggingMode === true)this._sendWaterfallLogSignal(q.FINISH);
        this.taggingMode = false;
        this.hideNewTag();
        this.hideTagger();
        this.setCurrentFacebox(null);
        i.removeClass(this.root, 'taggingMode');
        g.inform('PhotoTagger.DEACTIVATED_TAGGING');
    };
    ea.prototype.checkActions = function (event) {
        "use strict";
        var fa = event.getTarget();
        if (o.byClass(fa, 'fbPhotosPhotoActionsTag'))if (this.taggingMode) {
            this.deactivateTagging();
        } else {
            this.activateTagging();
            this.addNextTagFromFacebox(1);
        }
    };
    ea.prototype.hideTagger = function () {
        "use strict";
        i.hide(this.tagger);
        this.clickPercentToPhoto = null;
        var fa = j.scry(this.tagger, 'input.textInput')[0];
        if (fa)fa.blur();
    };
    ea.prototype.showTagger = function () {
        "use strict";
        var fa = j.find(this.tagger, '.typeaheadContainer'), ga = j.find(fa, '.arrow .nub'), ha = aa(fa), ia = 3;
        v.set(fa, 'margin-left', 0);
        v.set(ga, 'margin-left', 0);
        i.show(this.tagger);
        if (ha.x < 0) {
            v.set(fa, 'margin-left', ((-2 * ha.x) + 'px'));
            v.set(ga, 'margin-left', (ha.x - ia) + 'px');
        }
        setTimeout((function () {
            j.find(this.tagger, 'input.textInput').focus();
        }).bind(this), 0);
        this.hideNewTag();
        g.inform('reflow');
    };
    ea.prototype.showNewTag = function (fa) {
        "use strict";
        if (!this.newTagBox)return;
        j.setContent(j.find(this.newTagBox, 'div.tagName'), j.create('span', null, fa));
        i.show(this.newTagBox);
        this.hideNewTagTimer = setTimeout(this.hideNewTag.bind(this), 3000);
    };
    ea.prototype.hideNewTag = function () {
        "use strict";
        if (!this.newTagBox)return;
        if (this.hideNewTagTimer !== null) {
            clearTimeout(this.hideNewTagTimer);
            this.hideNewTagTimer = null;
        }
        i.hide(this.newTagBox);
    };
    ea.prototype.getTaggerPositioningOrigin = function () {
        "use strict";
        return w.getElementPosition(this.clickState, 'document');
    };
    ea.prototype.setClickPosAndFacebox = function (fa) {
        "use strict";
        var ga = this.viewer.getImage();
        this.saveClickPosition(ga, fa);
        var ha = r.absoluteToNormalizedPosition(ga, fa);
        this.setCurrentFacebox(this.findNearestFacebox(ha));
    };
    ea.prototype.addTagFromClickPos = function (fa) {
        "use strict";
        if (this.currentFacebox) {
            this.addTagFromFaceboxDontSave(this.currentFacebox);
        } else {
            this.removeSuggestionFromTagger();
            i.removeClass(j.find(this.tagger, '.faceBox'), 'faceBoxHidden');
            this.addTagFromPosition(fa, this.TAG_BOX_SIZE);
        }
    };
    ea.prototype.addTag = function (event) {
        "use strict";
        var fa = event.getTarget(), ga = o.byClass(fa, 'fbPhotosPhotoButtons');
        if (!this.taggingMode || (ga && fa !== ga) || o.byClass(fa, 'fbPhotosPhotoActions') || o.byClass(fa, 'faceboxSuggestion') || o.byClass(fa, 'photoTagTypeahead'))return;
        var ha = w.getEventPosition(event);
        this.setClickPosAndFacebox(ha);
        this.addTagFromClickPos(ha);
    };
    ea.prototype._findNearest = function (fa, ga) {
        "use strict";
        var ha = Infinity, ia = null;
        fa.forEach(function (ja) {
            if (ja.rect.contains(ga)) {
                var ka = ga.distanceTo(ja.rect.getCenter());
                if (ka < ha) {
                    ha = ka;
                    ia = ja;
                }
            }
        });
        return ia;
    };
    ea.prototype.findNearestFacebox = function (fa) {
        "use strict";
        return this._findNearest(this.faceboxes, fa);
    };
    ea.prototype.findNearestTag = function (fa) {
        "use strict";
        return this._findNearest(this.tags, fa);
    };
    ea.prototype.addNextTagFromFacebox = function (fa) {
        "use strict";
        if (this.faceboxes.length === 0)return;
        if (!this.currentFacebox) {
            this.setCurrentFacebox(this.faceboxes[0]);
        } else {
            var ga = this.faceboxes.indexOf(this.currentFacebox), ha = da(ga + fa, this.faceboxes.length);
            if (ha === ga)return;
            this.setCurrentFacebox(this.faceboxes[ha]);
        }
        this.addTagFromFacebox(this.currentFacebox);
    };
    ea.prototype.addTagFromFaceboxDontSave = function (fa) {
        "use strict";
        i.addClass(fa.node, 'active');
        i.addClass(j.find(this.tagger, '.faceBox'), 'faceBoxHidden');
        var ga = fa.rect.getCenter(), ha = this.viewer.getImage(), ia = r.normalizedToAbsolutePosition(ha, ga), ja = (fa.rect.w() / 100) * w.getElementDimensions(ha).x;
        if (fa.rect.w() > this.HUGE_FACE_THRESH && fa.rect.h() > this.HUGE_FACE_THRESH)ja *= this.HUGE_FACE_SHRINK_FACTOR;
        var ka = this.getFaceboxSuggestionFromFaceboxElem(fa.node);
        if (ka) {
            var la = (this.version === p.VIEWER_PERMALINK) ? l.PERMALINK_DISMISS : l.SNOWLIFT_DISMISS;
            this.addSuggestionToTagger(fa, ka);
            this._sendFaceboxSuggestionLogSignal(ka.getAttribute('data-id'), la);
        } else this.removeSuggestionFromTagger();
        this.addTagFromPosition(ia, ja);
        return ia;
    };
    ea.prototype.getFaceboxSuggestionFromFaceboxElem = function (fa) {
        "use strict";
        return j.scry(fa, "._570u")[0];
    };
    ea.prototype.addSuggestionToTagger = function (fa, ga) {
        "use strict";
        this.removeSuggestionFromTagger();
        i.addClass(this.tagger, 'suggestionActive');
        var ha = j.find(this.tagger, '.typeaheadContainer'), ia = ga.cloneNode(true);
        this.stripReactID(ia);
        j.appendContent(ha, ia);
        this.setupFaceboxSuggestionHandlers(fa, ia);
    };
    ea.prototype.stripReactID = function (fa) {
        "use strict";
        fa.removeAttribute('data-reactid');
        for (var ga = 0; ga < fa.children.length; ga++)this.stripReactID(fa.children[ga]);
    };
    ea.prototype.removeSuggestionFromTagger = function () {
        "use strict";
        i.removeClass(this.tagger, 'suggestionActive');
        var fa = j.scry(this.tagger, '.faceboxSuggestion');
        fa && fa.forEach(function (ga) {
            j.remove(ga);
        });
    };
    ea.prototype.dismissFaceboxSuggestion = function (fa, ga, ha, ia) {
        "use strict";
        new h().setURI('/ajax/dismiss_tag_suggest.php').setMethod('POST').setData({facebox_logs: [
            {facebox: fa, log_data: {photo_owner: ha, tagee: ga, is_first: true}}
        ], closing_source: ia, closing_action: 'no'}).setAllowCrossPageTransition(true).send();
    };
    ea.prototype.addTagFromFacebox = function (fa) {
        "use strict";
        var ga = this.addTagFromFaceboxDontSave(fa), ha = this.viewer.getImage();
        this.saveClickPosition(ha, ga);
    };
    ea.prototype.addTagFromPosition = function (fa, ga) {
        "use strict";
        var ha = this.viewer.getImage(), ia = this.calcTaggerPosition(ha, fa, ga);
        this.calcClickPoint(ha, fa);
        if (!ia) {
            this.hideTagger();
            return;
        }
        ia.setElementPosition(this.tagger);
        if (this.newTagBox) {
            ia.setElementPosition(this.newTagBox);
            new w(ga, ga).setElementDimensions(this.newTagBox);
        }
        var ja = w.getElementPosition(ha), ka = w.getElementDimensions(ha), la = this.typeahead.getView();
        if (fa.y > ja.y + ka.y * 3 / 4) {
            i.addClass(this.tagger, 'fbPhotoTaggerFlipped');
            la.addTypeaheadFlip('fbPhotoTaggerFlipped');
            if (fa.x > ja.x + ka.x * 1 / 2) {
                this.flipRules('fbPhotoTaggerRight', 'fbPhotoTaggerLeft', la);
            } else this.flipRules('fbPhotoTaggerLeft', 'fbPhotoTaggerRight', la);
        } else {
            i.removeClass(this.tagger, 'fbPhotoTaggerFlipped');
            i.removeClass(this.tagger, 'fbPhotoTaggerLeft');
            i.removeClass(this.tagger, 'fbPhotoTaggerRight');
            la.removeTypeaheadFlip('fbPhotoTaggerFlipped');
            la.removeTypeaheadFlip('fbPhotoTaggerLeft');
            la.removeTypeaheadFlip('fbPhotoTaggerRight');
        }
        this.showTagger();
        if (this.taggingMode) {
            this._sendWaterfallLogSignal(q.TAG_FACE);
        } else this._sendWaterfallLogSignal(q.HOVER_TAG_FACE);
    };
    ea.prototype.flipRules = function (fa, ga, ha) {
        "use strict";
        i.addClass(this.tagger, fa);
        i.removeClass(this.tagger, ga);
        ha.addTypeaheadFlip(fa);
        ha.removeTypeaheadFlip(ga);
    };
    ea.prototype.calcTaggerPosition = function (fa, ga, ha, ia) {
        "use strict";
        ia = ia || ha;
        var ja = w.getElementPosition(fa), ka = w.getElementDimensions(fa), la = new w(ha / 2, ia / 2), ma = ga.sub(ja);
        for (var na in {x: 1, y: 1}) {
            if (ga[na] < ja[na] || ga[na] > ja[na] + ka[na])return null;
            var oa = na === 'x' ? ha : ia;
            if (ma[na] < (oa / 2)) {
                la[na] = ma[na];
            } else if (ka[na] < ma[na] + (oa / 2))la[na] = oa - (ka[na] - ma[na]);
        }
        var pa = 3, qa = j.find(this.tagger, '.faceBox');
        v.set(qa, 'width', (ha - pa * 2) + 'px');
        v.set(qa, 'height', (ia - pa * 2) + 'px');
        var ra = ga.sub(this.getTaggerPositioningOrigin());
        return ra.sub(la.x, la.y);
    };
    ea.prototype.calcClickPoint = function (fa, ga) {
        "use strict";
        var ha = w.getElementDimensions(fa), ia = w.getElementPosition(fa), ja = ga.sub(ia);
        this.clickPoint = {x: ja.x / ha.x, y: ja.y / ha.y};
    };
    ea.prototype.getTaggingDataForSave = function (fa, ga) {
        "use strict";
        var ha = this.getTaggingData('add', fa.isFreeform() ? '' : fa.getValue(), fa.getText(), ga);
        ha.x = this.clickPoint.x * 100;
        ha.y = this.clickPoint.y * 100;
        ha.from_facebox = !!this.currentFacebox;
        ha.tagging_mode = !!this.taggingMode;
        return ha;
    };
    ea.prototype.saveTag = function (fa, ga, ha) {
        "use strict";
        var ia = this.getTaggingDataForSave(ga, ha);
        this.logUserActionEvent('save');
        if (this.tagAccumulating) {
            s.getInstance().storeTagWithOptions(this.photoData.fbid, ia.subject, ia.x, ia.y, ia);
        } else new h().setURI(this.ajaxURIs.tagAction).setMethod('POST').setData(ia).setAllowCrossPageTransition(true).setHandler(this.tagsChangeHandler.bind(this)).setErrorHandler(this.checkError.bind(this, ga)).send();
        var ja = (this.userId === ia.subject);
        if (ja) {
            var ka = j.scry(this.makeProfilePicMenuContainer, '[data-picid="' + this.viewer.getCurrentPhotoInfo().fbid + '"]');
            if (ka.length === 1) {
                var la = ka[0];
                i.removeClass(la, 'hide');
            }
        }
        this.showNewTag(ga.getText());
        this.hideTagger();
        var ma = this.currentFacebox;
        if (ma) {
            if (this.taggingMode)this.addNextTagFromFacebox(1);
            this.removeFacebox(ma);
        }
        g.inform('PhotoTagger.ADDING_TAG', {subject: ia.subject, text: ga.getText()});
        g.inform('PhotoTagger.SAVE_TAG', {photo_fbid: this.photoData.fbid, self_tag: ja});
    };
    ea.prototype.getTaggingData = function (fa, ga, ha, ia) {
        "use strict";
        return {cs_ver: this.version, pid: this.photoData.pid, fbid: this.photoData.fbid, id: this.photoData.owner, subject: ga, name: ha, action: fa, source: ia ? ia : this.viewer.getSourceString(), qn: this._qn, position: this.getPosition(), slsource: this.viewer.getViewerSource(), slset: this.viewer.getViewerSet()};
    };
    ea.prototype.getPosition = function () {
        "use strict";
        return this.viewer.getPosition();
    };
    ea.prototype.tagsChangeHandler = function (fa) {
        "use strict";
        this.logUserActionEvent('save_done');
    };
    ea.prototype.checkError = function (fa, ga) {
        "use strict";
        if (ga.getPayload() && ga.getPayload().clear_tag) {
            fa.already_untagged = true;
            this.tokenizer.removeToken(fa);
        }
        u.showEx(ga.errorDescription, ga.errorSummary, t.createElement(x, null));
    };
    ea.prototype.removeTag = function (fa, ga, ha) {
        "use strict";
        if (ga.already_untagged)return;
        var ia = 'remove';
        if (j.scry(ga.element, 'a.pending')[0])ia = 'retract';
        if (ga.blockUser)ia = 'remove_block';
        this.logUserActionEvent('save');
        if (this.tagAccumulating) {
            if (ga.isFreeform()) {
                s.getInstance().removeTextTag(this.photoData.fbid, ga.getInfo().text);
            } else s.getInstance().removeTag(this.photoData.fbid, ga.getInfo().uid);
        } else new h().setURI(this.ajaxURIs.tagAction).setMethod('POST').setData(this.getTaggingData(ia, ga.isFreeform() ? '' : ga.getInfo().uid, ga.getInfo().text)).setHandler(function (la) {
            this.tagsChangeHandler(la);
            ha && ha();
        }.bind(this)).setAllowCrossPageTransition(true).send();
        if (this.userId === parseInt(ga.getValue(), 10) && this.userId !== this.viewer.getCurrentPhotoInfo().owner) {
            var ja = j.scry(this.makeProfilePicMenuContainer, '[data-picid="' + this.viewer.getCurrentPhotoInfo().fbid + '"]');
            if (ja.length === 1) {
                var ka = ja[0];
                i.addClass(ka, 'hide');
            }
            g.inform('PhotoTagger.REMOVED_MAKE_PROFILE_PIC_OPTION');
        }
    };
    ea.prototype.removeTagByID = function (fa, ga, ha) {
        "use strict";
        var ia = this.tokenizer.tokens;
        for (var ja = 0; ja < ia.length; ja++)if (ia[ja].info.uid == ga)return this.removeTag(null, ia[ja], ha);
    };
    ea.prototype.removeTagByIDFromHovercardLink = function (fa, ga, ha) {
        "use strict";
        this.removeTagByID(fa, ga, function () {
            if (m.contains(ha))m.hide(true);
        });
    };
    ea.prototype.removeWithTag = function (fa, ga) {
        "use strict";
        new h().setURI(this.ajaxURIs.tagWithAction).setMethod('POST').setData({action: 'remove_with', taggee: ga, tag: fa, version: this.version, fbid: this.photoData.fbid}).setHandler(function (ha) {
            this.tagsChangeHandler(ha);
            if (window.Hovercard)window.Hovercard.hide(true);
        }.bind(this)).setAllowCrossPageTransition(true).send();
    };
    ea.prototype.setPhotoData = function (fa, ga) {
        "use strict";
        this.clickPercentToPhoto = null;
        this.photoData = ga;
        return this;
    };
    ea.prototype.setExtraData = function (fa, ga) {
        "use strict";
        this.tagRects = ga.tagRects;
        this.updateFaceboxes();
        this._setInitialFaceboxFromID(ga);
        if (ga.openTag)setTimeout(function () {
            this.activateTagging();
            this._setInitialFaceboxFromID(ga);
            if (this.faceboxes.length === 1) {
                this.addTagFromFacebox(this.currentFacebox);
            } else this.addNextTagFromFacebox(1);
        }.bind(this), 0);
        return this;
    };
    ea.prototype._setInitialFaceboxFromID = function (fa) {
        "use strict";
        if (fa.initialFaceboxID !== null && this.faceboxes.length !== 0) {
            var ga = this.getFacebox(fa.initialFaceboxID);
            if (ga !== null) {
                var ha = this.faceboxes.indexOf(ga);
                ha = da(ha - 1, this.faceboxes.length);
                this.setCurrentFacebox(this.faceboxes[ha]);
            }
        }
    };
    ea.prototype.markTagAsSpam = function (fa, ga) {
        "use strict";
        new h().setURI(this.ajaxURIs.tagAction).setMethod('POST').setData(this.getTaggingData('mark_as_spam', ga, null)).send();
    };
    ea.prototype.removeFacebox = function (fa) {
        "use strict";
        if (fa === null)return;
        this.revokedFaceboxes.push(fa.rect.getCenter());
        ba(this.faceboxes, fa);
        j.remove(fa.node);
        if (fa === this.currentFacebox)this.setCurrentFacebox(null);
    };
    ea.prototype.setCurrentFacebox = function (fa) {
        "use strict";
        if (this.currentFacebox)i.removeClass(this.currentFacebox.node, 'active');
        this.currentFacebox = fa;
        if (fa) {
            this.recognizedUsers = JSON.parse(fa.node.getAttribute('data-recognizeduids'));
            this.updateTypeaheadSuggestions();
        }
    };
    ea.prototype.updateRevokedFaceboxes = function () {
        "use strict";
        this.revokedFaceboxes = this.revokedFaceboxes.filter(function (fa) {
            for (var ga = 0; ga < this.faceboxes.length; ++ga) {
                var ha = this.faceboxes[ga], ia = fa.distanceTo(ha.rect.getCenter());
                if (ia < this.EPSILON)return true;
            }
            return false;
        }.bind(this));
        this.revokedFaceboxes.forEach(function (fa) {
            var ga = this.findNearestFacebox(fa);
            ba(this.faceboxes, ga);
            j.remove(ga.node);
        }.bind(this));
    };
    ea.prototype.updateFaceboxes = function () {
        "use strict";
        this.faceboxes = [];
        this.tags = [];
        for (var fa in this.tagRects) {
            var ga;
            if (r.isFacebox(fa)) {
                ga = this.faceboxes;
            } else if (r.isTag(fa))ga = this.tags;
            if (ga) {
                var ha = 'container';
                if (this.version === p.VIEWER_PERMALINK)ha = 'root';
                var ia = j.scry(this.viewer[ha], '#' + fa);
                if (ia.length > 0)ga.push({node: ia[0], id: fa, rect: this.tagRects[fa]});
            }
        }
        this.updateRevokedFaceboxes();
        this.faceboxes.sort(function (ka, la) {
            return ka.rect.getCenter().x - la.rect.getCenter().x;
        });
        if (this.currentFacebox) {
            var ja = this.currentFacebox.rect.getCenter();
            this.setCurrentFacebox(this.findNearestFacebox(ja));
            i.addClass(this.currentFacebox.node, 'active');
        }
        if (this.requestFaceboxNextTag) {
            this.addNextTagFromFacebox(1);
            this.requestFaceboxNextTag = false;
        }
    };
    ea.prototype.getFacebox = function (fa) {
        "use strict";
        for (var ga = 0; ga < this.faceboxes.length; ++ga)if (this.faceboxes[ga].id === fa)return this.faceboxes[ga];
        return null;
    };
    ea.prototype.setupFaceboxSuggestionHandlers = function (fa, ga) {
        "use strict";
        var ha = j.find(ga, "a._570w"), ia = j.find(ga, "a._570x");
        this.handlers.push(k.listen(ha, 'click', function (ja) {
            var ka = this._getCurrentFaceboxID(), la = (this.version === p.VIEWER_PERMALINK) ? l.PERMALINK_DISMISS : l.SNOWLIFT_DISMISS;
            this.dismissFaceboxSuggestion(fa.id.replace('face:', ''), ga.getAttribute('data-id'), this.photoData.owner, la);
            this.removeSuggestionFromTagger();
            this.hideTagger();
            j.remove(this.getFaceboxSuggestionFromFaceboxElem(fa.node));
            g.inform('PhotoTagger.TAG_SUGGESTION_REJECTED/' + ka);
        }.bind(this)), k.listen(ia, 'click', function (ja) {
            var ka = this._getCurrentFaceboxID(), la = {uid: ga.getAttribute('data-id'), text: ga.getAttribute('data-text')}, ma = this.tokenizer.createToken(la), na = (this.version === p.VIEWER_PERMALINK) ? l.PERMALINK_SUGGEST : l.SNOWLIFT_SUGGEST;
            this.saveTag(null, ma, na);
            g.inform('PhotoTagger.TAG_SUGGESTION_CONFIRMED/' + ka);
        }.bind(this)));
    };
    ea.prototype._getCurrentFaceboxID = function () {
        "use strict";
        return this.currentFacebox && this.currentFacebox.id.substring(5);
    };
    ea.getInstance = function (fa) {
        "use strict";
        return ea.instances[fa];
    };
    ea.resetAlbumTaggingSuggestions = function (fa) {
        "use strict";
        var ga = ea.getInstance(fa);
        ga && ga.resetAlbumTaggingSuggestions();
    };
    y(ea, {instances: {}});
    y(ea.prototype, {TAG_BOX_SIZE: 100, EPSILON: .0025, HUGE_FACE_THRESH: 90, HUGE_FACE_SHRINK_FACTOR: .6, elemNames: {6: {addTagLink: 'div.fbPhotosPhotoOwnerButtons', overlayActions: 'div.snowliftOverlayBar'}}});
    e.exports = ea;
}, null);
__d("PhotoPermalink", ["Arbiter", "Assert", "AsyncRequest", "Bootloader", "CSS", "DOM", "Event", "KeyEventController", "Keys", "PageTransitions", "Parent", "PhotoPermalinkURI", "PhotosConst", "PhotoSessionLog", "PhotoStreamCache", "PhotoTagSearchPivotLogger", "PhotosUtils", "PhotoTagger", "PhotoViewer", "Style", "Vector", "$", "copyProperties", "createArrayFrom", "emptyFunction", "ge", "goURI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga) {
    for (var ha in y)if (y.hasOwnProperty(ha))ja[ha] = y[ha];
    var ia = y === null ? null : y.prototype;
    ja.prototype = Object.create(ia);
    ja.prototype.constructor = ja;
    ja.__superConstructor__ = y;
    function ja() {
        "use strict";
        y.call(this);
        this.encodingMode = false;
        this._uriStack = [];
        this.replaceUrl = false;
        this.payloadInitialized = false;
        this._seenTags = {};
    }

    ja.prototype.init = function (ka) {
        "use strict";
        this.stream = new u();
        this.stream.init(s.VIEWER_PERMALINK, 'PhotoViewerPagelet', 'pagelet_photo_viewer');
        this.reset();
        this.root = ba('fbPhotoPageContainer');
        this.header = ba('fbPhotoPageHeader');
        this.stageWrapper = l.find(this.root, '.stageContainer');
        this.videoStage = l.find(this.stageWrapper, 'div.videoStage');
        this.buttonActions = l.find(this.root, 'div.stageButtons');
        this.viewLargerLink = l.scry(this.root, 'a.fbPhotoViewLarger').pop();
        this.feedback = fa('fbPhotoPageFeedback');
        this.image = fa('fbPhotoImage');
        this.errorBox = fa('fbPhotoPageError');
        this.actionList = fa('fbPhotoPageActions');
        this.stageActions = l.find(this.root, 'div.stageActions');
        this.showingTypeaheadSuggestions = false;
        this.loadingStates = {image: false, html: false};
        this.unhiliteTimer = null;
        this.source = null;
        if (this.image)this.imageLoadListener = m.listen(this.image, 'load', this.adjustForNewData.bind(this));
        this.pageHandlers = [m.listen(this.root, 'mouseout', this.mouseOutListener.bind(this)), m.listen(this.root, 'mousemove', this.mouseMoveListener.bind(this)), m.listen(this.stageWrapper, 'click', this.stageClickListener.bind(this)), m.listen(this.buttonActions, 'click', this.buttonListener.bind(this)), m.listen(this.actionList, 'click', this.rotateListener.bind(this)), m.listen(this.feedback, 'click', function (event) {
            var la = event.getTarget();
            if (q.byClass(la, 'like_link') || (q.byClass(la, 'UFILikeLink') && q.byClass(la, 'UIActionLinks')))k.toggleClass(l.find(this.buttonActions, 'div.likeCommentGroup'), 'viewerLikesThis');
        }.bind(this))];
        p.registerHandler(this.transitionHandler.bind(this));
        n.registerKey('LEFT', this.goNav.bind(this));
        n.registerKey('RIGHT', this.goNav.bind(this));
        t.initLogging(t.PERMALINK);
        this._showHover = ka.pivot_hover;
        g.subscribe('PhotoTagApproval.HILITE_TAG', this.onHiliteTag.bind(this));
        g.subscribe('PhotoTagApproval.UPDATE_TAG_BOX', this.onUpdateTagBox.bind(this));
        this.adjustForNewData();
    };
    ja.prototype.getEventPrefix = function () {
        "use strict";
        return 'PhotoPermalink';
    };
    ja.prototype.getSourceString = function () {
        "use strict";
        return 'permalink';
    };
    ja.prototype.getViewerSource = function () {
        "use strict";
        return this.source;
    };
    ja.prototype.getViewerSet = function () {
        "use strict";
        return this.stream.getPhotoSet();
    };
    ja.prototype.getVersionConst = function () {
        "use strict";
        return s.VIEWER_PERMALINK;
    };
    ja.prototype.saveTagsFromPayload = function (ka) {
        "use strict";
        this.storeFromData(ka);
        if ('data' in ka && this.stream.getCursor() in ka.data)this.swapData();
    };
    ja.prototype.goNav = function (event) {
        "use strict";
        var ka = m.getKeyCode(event) || event.getTarget(), la = event.type === 'click' && q.byClass(ka, 'stageWrapper') && !q.byClass(ka, 'tagBoxPending') && !q.byClass(ka, 'tagBoxPendingResponse') && !q.byClass(ka, 'uiButtonGroup');
        if (la && k.hasClass(this.root, 'taggingMode'))return false;
        if (ka == o.LEFT) {
            this.page(-1);
        } else if (ka == o.RIGHT || la)this.page(1);
        return false;
    };
    ja.prototype.pagerClick = function (ka) {
        "use strict";
        if (ka == 'prev') {
            this.page(-1);
        } else if (ka == 'next')this.page(1);
        return false;
    };
    ja.prototype.setLoadingState = function (ka, la) {
        "use strict";
        switch (ka) {
            case ja.STATE_IMAGE_DATA:
                this.loadingStates[ka] = la;
                k.conditionClass(this.root, 'imageLoading', la);
                break;
            case ja.STATE_HTML:
                this.loadingStates[ka] = la;
                k.conditionClass(this.root, 'dataLoading', la);
                break;
        }
    };
    ja.prototype.checkState = function (ka) {
        "use strict";
        if (ka != ja.STATE_ERROR && !this.loadingStates[ka])return;
        switch (ka) {
            case ja.STATE_IMAGE_DATA:
                var la = this.stream.getCurrentImageData();
                if (la) {
                    if (la.url) {
                        this.switchImage(la.url, true);
                    } else if (la.video)this.switchVideo(la.video, true);
                    this.setLoadingState(ka, false);
                }
                break;
            case ja.STATE_HTML:
                if (this.stream.getCurrentHtml()) {
                    this.swapData();
                    this.setLoadingState(ka, false);
                }
                break;
            default:
                if (this.stream.errorInCurrent()) {
                    if (this.image)k.hide(this.image);
                    k.show(this.errorBox);
                }
                break;
        }
    };
    ja.prototype.reHilitePendingTag = function () {
        "use strict";
        var ka = fa(this.hilitedTag);
        if (ka && k.hasClass(ka, 'showPendingTagName'))return;
        var la = l.scry(this.root, 'div.tagsWrapper div.showPendingTagName')[0];
        if (la)this.switchHilitedTags(la.id);
    };
    ja.prototype.setReachedLeftEnd = function () {
        "use strict";
        this.stream.setReachedLeftEnd();
    };
    ja.prototype.setReachedRightEnd = function () {
        "use strict";
        this.stream.setReachedRightEnd();
    };
    ja.prototype.isPagingAllowed = function (ka) {
        "use strict";
        return this.stream.isValidMovement(ka) && !k.hasClass(this.root, 'croppingMode');
    };
    ja.prototype.page = function (ka, la) {
        "use strict";
        if (!this.isPagingAllowed(ka) || !this.stream.nonCircularPhotoSetCanPage(ka))return;
        this._seenTags = {};
        this.unhiliteAllTags();
        var ma = this.getVideoOnStage();
        if (ma)this.switchVideo(ma, false);
        this.recacheData();
        this.stream.moveCursor(ka);
        if (this.image)k.hide(this.image);
        if (this.stream.errorInCurrent()) {
            this.setLoadingState(ja.STATE_HTML, true);
            k.show(this.errorBox);
            return;
        }
        var na = this.stream.getCurrentImageData();
        if (na) {
            if (na.url) {
                this.switchImage(na.url, true);
                if (this.viewLargerLink)this.viewLargerLink.setAttribute('href', na.info.permalink);
            } else if (na.video)this.switchVideo(na.video, true);
            if (!la) {
                this.replaceUrl = true;
                ga(na.info.permalink);
            }
        } else {
            this.waitForLoadCount++;
            this.setLoadingState(ja.STATE_IMAGE_DATA, true);
        }
        if (this.stream.getCurrentHtml()) {
            this.swapData();
        } else this.setLoadingState(ja.STATE_HTML, true);
        g.inform('PhotoPermalink.PAGE');
    };
    ja.prototype.transitionHandler = function (ka) {
        "use strict";
        if (!r.isValid(ka))return false;
        if (ka.getQueryData().makeprofile && ka.getQueryData().fbid == this.stream.getCursor() && !this.getVideoOnStage()) {
            j.loadModules(["PhotoPermalinkCropper"], function (pa) {
                pa.start();
            });
            p.transitionComplete();
            return true;
        }
        var la = ka.getQualifiedURI().toString();
        if (!ka.protocol)la = la.replace(/^file:\/\//, "");
        if (this.replaceUrl) {
            this.replaceUrl = false;
            this._uriStack.push(la);
            p.transitionComplete();
            return true;
        }
        var ma = this._uriStack.length;
        if (ma >= 2 && this._uriStack[ma - 2] === la)this._uriStack.pop();
        var na = this.stream.getCursorForURI(ka.getUnqualifiedURI().toString());
        if (na) {
            var oa = this.stream.getRelativeMovement(na);
            this.page(oa, true);
            p.transitionComplete();
            return true;
        }
        return false;
    };
    ja.prototype.recacheData = function (ka) {
        "use strict";
        if (!this.loadingStates.html) {
            var la = this.stream.getCurrentHtml();
            for (var ma in la) {
                var na = fa(ma);
                if (na)la[ma] = da(na.childNodes);
                if (ka !== true && ma !== 'fbPhotoPageHeader')l.empty(ba(ma));
            }
        }
    };
    ja.prototype.getCurrentPhotoInfo = function () {
        "use strict";
        var ka = this.stream.getCurrentImageData();
        return ka && ka.info;
    };
    ja.prototype.getVideoOnStage = function () {
        "use strict";
        var ka = this.stream.getCurrentImageData();
        return ka && ka.video;
    };
    ja.prototype.switchImage = function (ka, la) {
        "use strict";
        k.hide(this.image);
        k.hide(this.errorBox);
        var ma = this.stream && this.stream.getCurrentImageData();
        if (ma) {
            t.addPhotoView(ma.info);
            if (this._showHover) {
                var na = this.stream.getCurrentExtraData();
                if (na)v.logImageImpression('permalink', String(this.stream.getCursor()), Object.keys(na.tagRects));
            }
        }
        var oa = l.create('img', {id: 'fbPhotoImage', className: 'fbPhotoImage', alt: '', src: ka});
        l.replace(this.image, oa);
        this.image = oa;
        if (this.imageLoadListener)this.imageLoadListener.remove();
        this.imageLoadListener = m.listen(this.image, 'load', this.adjustForNewData.bind(this));
        if (la)this.stream.preloadImages();
    };
    ja.prototype.switchVideo = function (ka, la) {
        "use strict";
        var ma = 'swf_' + ka;
        if (la) {
            k.addClass(this.stageWrapper, 'showVideo');
            this.videoStage.id = ka;
            if (window[ma] && !fa(ma))window[ma].write(ka);
        } else {
            this.videoStage.id = 'fbPageVideoStage';
            window[ma].addVariable('video_autoplay', 0);
            l.empty(this.videoStage);
            k.removeClass(this.stageWrapper, 'showVideo');
        }
    };
    ja.prototype.swapData = function () {
        "use strict";
        if (this.dataLoadTimer) {
            this.setLoadingState(ja.STATE_HTML, true);
            clearTimeout(this.dataLoadTimer);
            this.dataLoadTimer = setTimeout(this.clearTimer.bind(this, true), 100);
            return;
        }
        var ka, la = this.stream.getCurrentHtml();
        if (la) {
            for (var ma in la) {
                var na = la[ma];
                if (Array.isArray(na) && na.length === 1 && na[0] === undefined)continue;
                ka = fa(ma);
                ka && l.setContent(ka, la[ma]);
            }
            g.inform('PhotoPermalink.DATA_CHANGE', this.stream.getCurrentImageData().info, g.BEHAVIOR_STATE);
            if (this.stream.getCurrentExtraData()) {
                g.inform('PhotoPermalink.EXTRA_DATA_CHANGE', this.stream.getCurrentExtraData(), g.BEHAVIOR_STATE);
                var oa = this.stream.getCurrentExtraData();
                if (oa && oa.source !== undefined) {
                    this.source = oa.source;
                    t.setSource(this.source);
                }
            }
            this.setLoadingState(ja.STATE_HTML, false);
            this.dataLoadTimer = setTimeout(this.clearTimer.bind(this, false), 100);
        }
        this.adjustForNewData();
    };
    ja.prototype.clearTimer = function (ka) {
        "use strict";
        this.dataLoadTimer = false;
        ka && this.swapData();
    };
    ja.prototype.adjustForNewData = function () {
        "use strict";
        if (!this.image)return;
        var ka = l.scry(this.stageWrapper, 'div.tagsWrapper')[0], la = aa.getElementDimensions(this.image);
        if (ka) {
            z.set(ka, 'width', la.x + 'px');
            z.set(ka, 'height', la.y + 'px');
        }
    };
    ja.prototype.fetchInitBucket = function (ka) {
        "use strict";
        if (!this.stream.isLoaded())return;
        this.stream.fetch(ka, true);
    };
    ja.prototype.addPhotoFbids = function (ka, la, ma) {
        "use strict";
        var na = this.stream.getCursor() === null;
        this.stream.attachToFbidsList(ka, la, ma);
        if (ma && na)this.page(0);
    };
    ja.prototype.attachTagger = function (ka) {
        "use strict";
        l.appendContent(this.stageActions, ka);
    };
    ja.prototype.storeFromData = function (ka) {
        "use strict";
        var la = this.stream.storeToCache(ka);
        if ('init' in ka) {
            t.setPhotoSet(this.stream.getPhotoSet());
            t.setLogFbids(true);
            t.addPhotoView(this.stream.getCurrentImageData().info);
            if (this._showHover) {
                var ma = this.stream.getCurrentExtraData();
                if (ma)v.logImageImpression('permalink', String(this.stream.getCursor()), Object.keys(ma.tagRects));
            }
        }
        if ('error' in la) {
            this.checkState(ja.STATE_ERROR);
            return;
        }
        if ('image' in la)this.checkState(ja.STATE_IMAGE_DATA);
        if ('data' in la)this.checkState(ja.STATE_HTML);
        if (!this.payloadInitialized && this.stream.getCurrentExtraData()) {
            this.payloadInitialized = true;
            g.inform('PhotoPermalink.EXTRA_DATA_CHANGE', this.stream.getCurrentExtraData(), g.BEHAVIOR_STATE);
        }
    };
    ja.prototype.handleServerError = function (ka, la) {
        "use strict";
        l.setContent(this.errorBox, ka);
        this.storeFromData(la);
    };
    ja.prototype.updateTotalCount = function (ka, la, ma) {
        "use strict";
        var na = fa('fbPhotoPagePositionAndCount');
        na && l.setContent(na, ma);
        this.stream.setTotalCount(ka);
        this.stream.setFirstCursorIndex(la);
    };
    ja.prototype.buttonListener = function (event) {
        "use strict";
        var ka = event.getTarget();
        if (q.byClass(ka, 'likeButton')) {
            var la = l.scry(this.feedback, 'button.like_link')[0];
            if (!la)la = l.scry(this.feedback, 'a.UFILikeLink')[0];
            la && la.click();
        } else if (q.byClass(ka, 'commentButton')) {
            var ma = l.scry(this.feedback, 'div.commentBox textarea')[0];
            if (!ma)ma = l.scry(this.feedback, 'li.UFIAddComment textarea')[0];
            if (ma) {
                ma.focus();
                this.root.scrollTop = this.root.scrollHeight;
            }
        }
    };
    ja.prototype.rotateListener = function (event) {
        "use strict";
        var ka = event.getTarget();
        if (q.byClass(ka, 'rotateRight')) {
            this.rotate('right');
        } else if (q.byClass(ka, 'rotateLeft'))this.rotate('left');
    };
    ja.prototype.stageClickListener = function (event) {
        "use strict";
        var ka = event.getTarget(), la = k.hasClass(ka, 'faceBox'), ma = (q.byClass(ka, 'fbPhotoTagApprovalBox') || q.byClass(ka, 'faceboxSuggestion') || q.byClass(ka, 'videoStage') || q.byClass(ka, 'tag') || q.byClass(ka, 'typeaheadWrapper') || q.byClass(ka, 'photoTagTypeahead') || q.byClass(ka, 'fbPhotoViewLarger') || la);
        if (la) {
            if (!this.showingTypeaheadSuggestions) {
                var na = this.getTagger();
                na.updateWithSuggestions();
                setTimeout((function () {
                    l.find(na.tagger, 'input.textInput').focus();
                }).bind(this), 0);
            }
            this.showingTypeaheadSuggestions = !this.showingTypeaheadSuggestions;
        }
        if (ma) {
            return true;
        } else this.goNav(event);
    };
    ja.prototype.rotate = function (ka) {
        "use strict";
        var la = this.stream.getCursor();
        if (this.getVideoOnStage()) {
            var ma = (ka == 'left') ? 270 : 90;
            h.isTruthy(this.videoRotateURI, "Video rotate URI not set.");
            j.loadModules(["VideoRotate"], function (oa) {
                new oa(la, this.videoRotateURI).motionRotate(ma);
            }.bind(this));
            return;
        }
        var na = ca({fbid: la, opaquecursor: this.stream.getOpaqueCursor(la), cs_ver: s.VIEWER_PERMALINK}, this.stream.getPhotoSetQuery());
        na[ka] = 1;
        this.setLoadingState(ja.STATE_IMAGE_DATA, true);
        k.hide(this.image);
        new i('/ajax/photos/photo/rotate/').setMethod('POST').setAllowCrossPageTransition(true).setReadOnly(false).setData(na).setFinallyHandler(this.rotateComplete.bind(this, la)).send();
    };
    ja.prototype.rotateComplete = function (ka, la) {
        "use strict";
        if (ka == this.stream.getCursor()) {
            this.setLoadingState(ja.STATE_IMAGE_DATA, false);
            this.switchImage(this.stream.getCurrentImageData().url);
            this.swapData();
        }
    };
    ja.prototype.mouseOutListener = function (event) {
        "use strict";
        var ka = event.getTarget(), la = event.getRelatedTarget(), ma = q.byClass(ka, 'stageActions'), na = q.byClass(ka, 'stageWrapper'), oa = q.byClass(la, 'stageActions'), pa = q.byClass(la, 'stageWrapper'), qa = q.byClass(la, 'uiContextualLayer'), ra = (!pa && !qa && (na && !oa) || (ma && !pa));
        if (ra)this.unhiliteAllTags(true);
    };
    ja.prototype.mouseMoveListener = function (event) {
        "use strict";
        var ka = event.getTarget(), la = (q.byClass(ka, 'faceboxSuggestion') || q.byClass(ka, 'tagPointer') || q.byClass(ka, 'typeaheadWrapper') || q.byClass(ka, 'photoTagTypeahead') || q.byClass(ka, 'arrow'));
        if (!q.byClass(ka, 'stageActions') && !q.byClass(ka, 'stageWrapper') || la)return;
        this.hiliteTagsOnMouseMove(event);
    };
    ja.prototype.unhiliteAllTags = function (ka, event) {
        "use strict";
        l.scry(this.stageWrapper, 'div.tagsWrapper div.hover').forEach(function (ma) {
            if (ka && k.hasClass(ma, 'tagBoxPending'))return;
            k.removeClass(ma, 'hover');
        });
        if (ka)return;
        l.scry(this.stageWrapper, 'div.tagsWrapper div.otherActive').forEach(function (ma) {
            k.removeClass(ma, 'otherActive');
        });
        if (this.unhiliteTimer !== null) {
            clearTimeout(this.unhiliteTimer);
            this.unhiliteTimer = null;
        }
        this.hilitedTag = null;
        this.showingTypeaheadSuggestions = false;
        if (!k.hasClass(this.root, 'taggingMode')) {
            var la = this.getTagger();
            if (la) {
                la.hideTagger();
                la.setCurrentFacebox(null);
            }
        }
    };
    ja.prototype.getTagger = function () {
        "use strict";
        return x.getInstance(s.VIEWER_PERMALINK);
    };
    ja.prototype.switchHilitedTags = function (ka, la) {
        "use strict";
        this.unhiliteAllTags();
        this.hiliteAllBoxes();
        var ma = fa(ka);
        if (ma) {
            this.hilitedTag = ka;
            if (!k.hasClass(this.root, 'taggingMode') && w.isFacebox(this.hilitedTag)) {
                var na = this.getTagger();
                if (na) {
                    k.addClass(ma, 'hover');
                    var oa = na.getFacebox(ka);
                    na.setCurrentFacebox(oa);
                    if (oa)na.addTagFromFacebox(oa);
                }
            } else k.addClass(ma, 'hover');
            if (k.hasClass(ma, 'tagBoxPending') && !k.hasClass(ma, 'showPendingTagName') && la === true) {
                l.scry(this.stageWrapper, 'div.tagsWrapper div.showPendingTagName').forEach(function (pa) {
                    k.removeClass(pa, 'showPendingTagName');
                });
                k.addClass(ma, 'showPendingTagName');
            }
        }
    };
    ja.prototype.hiliteTagsOnMouseMove = function (event) {
        "use strict";
        if (!this.stream.getCurrentExtraData() || this.getVideoOnStage())return;
        if (this.unhiliteTimer !== null)return;
        var ka = event.getTarget();
        if (q.byClass(ka, 'fbPhotoPageTagApproval') || q.byClass(ka, 'tagPointer'))return;
        var la = q.byClass(ka, 'tagBoxPending'), ma = false;
        if (this.hilitedTag) {
            var na = fa(this.hilitedTag);
            ma = na && k.hasClass(na, 'tagBoxPending');
        }
        var oa = ((!this.hilitedTag && la) || (!ma && la));
        if (oa) {
            this.switchHilitedTags(la.id);
            return;
        }
        if (la && (la.id == this.hilitedTag))return;
        var pa = 250, qa = w.absoluteToNormalizedPosition(this.image, aa.getEventPosition(event)), ra = w.getNearestBox(this.stream.getCurrentExtraData().tagRects, qa);
        if (!ra) {
            if (!ma) {
                this.unhiliteAllTags();
                this.reHilitePendingTag();
            }
            return;
        }
        var sa = null;
        if (ma) {
            var ta = {};
            ta[this.hilitedTag] = this.stream.getCurrentExtraData().tagRects[this.hilitedTag];
            sa = w.getNearestBox(ta, qa);
        }
        if (sa !== null && ma)return;
        if (this.hilitedTag != ra)if (ma) {
            this.unhiliteTimer = setTimeout(this.unhiliteAllTags.bind(this, false, event), pa);
        } else {
            if (this._showHover && !this._seenTags[ra]) {
                this._seenTags[ra] = true;
                v.logPivotImpression('permalnk', 'pivot_impression', ra);
            }
            this.switchHilitedTags(ra);
        }
    };
    ja.prototype.updateTagBox = function (ka, la) {
        "use strict";
        this.unhiliteAllTags();
        var ma = fa(ka);
        if (!ma)return;
        k.addClass(ma, 'tagBox');
        k.addClass(ma, 'tagBoxPendingResponse');
        k.removeClass(ma, 'tagBoxPending');
        k.hide(l.find(ma, 'span.tagForm'));
        if (la) {
            k.show(l.find(ma, 'span.tagApproved'));
        } else k.show(l.find(ma, 'span.tagIgnored'));
    };
    ja.prototype.reset = function () {
        "use strict";
        while (this.pageHandlers && this.pageHandlers.length)this.pageHandlers.pop().remove();
        if (this.imageLoadListener) {
            this.imageLoadListener.remove();
            this.imageLoadListener = null;
        }
        n.getInstance().resetHandlers();
    };
    ja.prototype.onHiliteTag = function (ka, la) {
        "use strict";
        if (la.version != s.VIEWER_PERMALINK)return;
        var ma = la.tag;
        if (ma) {
            this.switchHilitedTags(ma, true);
        } else this.unhiliteAllTags();
    };
    ja.prototype.onUpdateTagBox = function (ka, la) {
        "use strict";
        if (la.version == s.VIEWER_PERMALINK)this.updateTagBox(la.id, la.approve);
    };
    ja.prototype.disableAutoRefresh = function () {
        "use strict";
        clearTimeout(this.timerId);
    };
    ja.prototype.isInVideoEncodingMode = function () {
        "use strict";
        return this.encodingMode;
    };
    ja.prototype.enableAutoRefresh = function (ka) {
        "use strict";
        this.encodingMode = true;
        this.timerId = setTimeout(function () {
            window.location.reload();
        }, ka);
    };
    ja.prototype.setHasLocation = function (ka) {
        "use strict";
        k.conditionClass(this.root, 'hasLocation', ka);
    };
    ja.getInstance = function () {
        "use strict";
        if (!ja._instance)ja._instance = new ja();
        return ja._instance;
    };
    ja.addPhotoFbids = function (ka, la, ma) {
        "use strict";
        ja.getInstance().addPhotoFbids(ka, la, ma);
    };
    ja.setReachedLeftEnd = function () {
        "use strict";
        ja.getInstance().setReachedLeftEnd();
    };
    ja.setReachedRightEnd = function () {
        "use strict";
        ja.getInstance().setReachedRightEnd();
    };
    ja.attachTagger = function (ka) {
        "use strict";
        ja.getInstance().attachTagger(ka);
    };
    ja.disableAjaxPipeForVideo = function () {
        "use strict";
        var ka = ja.getInstance();
        if (ka.stream)ka.stream.setUseAjaxPipe(false);
    };
    ja.init = function (ka) {
        "use strict";
        ja.getInstance().init(ka || {});
    };
    ja.recacheData = function (ka) {
        "use strict";
        ja.getInstance().recacheData(ka);
    };
    ja.saveTagsFromPayload = function (ka) {
        "use strict";
        ja.getInstance().saveTagsFromPayload(ka);
    };
    ja.saveTagsFromPayloadDelayed = function (ka) {
        "use strict";
        setTimeout(ja.saveTagsFromPayload.bind(null, ka), 2000);
    };
    ja.handleServerError = function (ka, la) {
        "use strict";
        ja.getInstance().handleServerError(ka, la);
    };
    ja.setHasLocation = function (ka) {
        "use strict";
        ja.getInstance().setHasLocation(ka);
    };
    ja.storeFromData = function (ka) {
        "use strict";
        ja.getInstance().storeFromData(ka);
    };
    ja.swapData = function () {
        "use strict";
        ja.getInstance().swapData();
    };
    ja.updateTotalCount = function (ka, la, ma) {
        "use strict";
        ja.getInstance().updateTotalCount(ka, la, ma);
    };
    ja.isInVideoEncodingMode = function () {
        "use strict";
        return ja.getInstance().isInVideoEncodingMode();
    };
    ja.disableAutoRefresh = function () {
        "use strict";
        ja.getInstance().disableAutoRefresh();
    };
    ja.enableAutoRefresh = function (ka) {
        "use strict";
        ja.getInstance().enableAutoRefresh(ka);
    };
    ja.setVideoRotateURI = function (ka) {
        "use strict";
        ja.getInstance().videoRotateURI = ka;
    };
    ca(ja, {STATE_ERROR: 'error', STATE_HTML: 'html', STATE_IMAGE_DATA: 'image', MIN_TAG_DISTANCE: 80, _instance: null, touchMarkup: ea});
    e.exports = ja;
}, null);
__d("PhotoPermalinkCropper", ["Arbiter", "CSS", "Dialog", "DOM", "Event", "Keys", "Photocrop2", "PhotoPermalink", "ProfilePicRequestCreator", "ProfilePictureFlowLogging", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = p.flow.PERMALINK, s = {initialize: function (t) {
        this.clickHandlers = [];
        if (this.photocrop)this.destroy(false);
        this.photoPermalink = n.getInstance();
        this.root = this.photoPermalink.getRoot();
        this.options = t || {};
        this.cropLink = j.scry(this.root, 'a.fbPhotoActionsCrop')[0];
        if (!this.cropLink)return;
        this.registerClickHandler();
        this.registerEscapeKeyHandler();
        g.subscribe('PhotoPermalink.PAGE', function () {
            this.registerClickHandler();
            this.registerEscapeKeyHandler();
            this.destroy(false);
        }.bind(this), g.SUBSCRIBE_NEW);
        g.subscribe('PhotoTagger.REMOVED_MAKE_PROFILE_PIC_OPTION', this.destroy.bind(this, false));
    }, registerEscapeKeyHandler: function () {
        k.listen(document.documentElement, 'keydown', function (event) {
            if (k.getKeyCode(event) === l.ESC)this.destroy(false);
        }.bind(this));
    }, registerClickHandler: function () {
        var t = j.scry(this.root, '.startCropping');
        if (t.length === 0)return;
        for (var u = 0; u < t.length; u++) {
            if (this.clickHandlers.indexOf(t[u]) !== -1)continue;
            k.listen(t[u], 'click', function () {
                p.setFlowType(r).setAction(p.action.MAKE_PROFILE).log();
                this.start();
                return false;
            }.bind(this));
            this.clickHandlers.push(t[u]);
        }
    }, start: function () {
        if (this.photocrop || !this.cropLink)return;
        if (h.hasClass(this.cropLink, 'profileAlbum')) {
            p.setFlowType(r).log(p.step.PREVIOUS_PIC_INIT);
            new i().setTitle("\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u044e \u043f\u0440\u043e\u0444\u0438\u043b\u044f").setBody("\u0412\u044b \u0443\u0436\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043b\u0438 \u044d\u0442\u043e \u0444\u043e\u0442\u043e \u0432 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u0441\u0432\u043e\u0435\u0439 \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u043f\u0440\u043e\u0444\u0438\u043b\u044f. \u0412\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0435\u0433\u043e \u0441\u043d\u043e\u0432\u0430?").setButtons([i.CONFIRM, i.CANCEL]).setModal(true).setHandler(function () {
                setTimeout(this.reuseProfilePic.bind(this), 0);
                return false;
            }.bind(this)).setCancelHandler(function () {
                this.cancelAndStopEvent();
            }.bind(this)).show();
            return false;
        }
        p.setFlowType(r).log(p.step.CROP);
        h.addClass(this.cropLink, 'croppingModeOn');
        h.addClass(this.root, 'croppingMode');
        var t = j.find(this.root, 'img.fbPhotoImage'), u = j.find(this.root, 'a.doneCroppingLink'), v = j.find(this.root, 'a.cancelCroppingLink'), w = j.find(this.cropLink, '.doneCropping');
        this.wrapper = j.create('div');
        h.addClass(this.wrapper, 'stageCropper');
        j.find(this.root, '.stageWrapper').appendChild(this.wrapper);
        this.wrapper.style.marginTop = t.parentNode.style.marginTop;
        k.listen(this.wrapper, 'click', function (event) {
            k.kill(event);
        });
        k.listen(u, 'click', this.done.bind(this));
        k.listen(v, 'click', this.cancelAndStopEvent.bind(this));
        k.listen(w, 'click', this.done.bind(this));
        var x = this.photoPermalink.stream.getCurrentImageData(), y = (function () {
            this.photocrop = new m(t, {target: this.wrapper}, x ? x.originalDimensions || x.dimensions : null);
        }).bind(this);
        if (t.complete) {
            y();
        } else k.listen(t, 'load', y);
        return false;
    }, done: function () {
        var t = n.getInstance().getCurrentPhotoInfo(), u = this.photoPermalink.stream.getCurrentImageData(), v = this.destroy(true);
        if (!v)return false;
        var w = u.originalDimensions || u.dimensions;
        new o(t.fbid, this.getProfilePicTarget(t).id).setProfilePhotoSource(this.options.source).setProfilePhotoMethod('existing').setFlowType(r).saveCrop(v, w);
        return false;
    }, cancelAndStopEvent: function () {
        p.setFlowType(r).log(p.step.CANCEL);
        this.destroy(false);
        return false;
    }, destroy: function (t) {
        if (!this.photocrop) {
            if (!t && this.wrapper) {
                j.remove(this.wrapper);
                this.wrapper = null;
            }
            return null;
        }
        h.removeClass(this.cropLink, 'croppingModeOn');
        h.removeClass(this.root, 'croppingMode');
        if (t) {
            h.addClass(this.root, 'profilePicSavingMode');
        } else {
            j.remove(this.wrapper);
            this.wrapper = null;
        }
        var u = this.photocrop.done(t);
        this.photocrop = null;
        return u;
    }, reuseProfilePic: function () {
        var t = n.getInstance().getCurrentPhotoInfo();
        new o(t.fbid, this.getProfilePicTarget(t).id).setProfilePhotoSource(this.options.source).setProfilePhotoMethod('existing').setFlowType(r).savePic();
        return false;
    }, getProfilePicTarget: function (t) {
        if (h.hasClass(this.cropLink, 'makePageProfile'))return {id: t.owner, type: 'object'};
        return {id: this.options.uid, type: 'profile'};
    }};
    e.exports = s;
}, null);
__d("PhotoTags", ["Arbiter", "CSS", "DOM", "Event", "Parent", "PhotosConst", "cx", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    function o(p, q, r) {
        "use strict";
        this.tagTargets = p;
        this.tagBox = q;
        this.version = r || l.VIEWER_PERMALINK;
        this.handlers = [];
        this.tagTargets.forEach(function (s) {
            this.handlers.push(j.listen(s, {mouseover: this.showTag.bind(this), mouseout: this.hideTags.bind(this)}));
        }.bind(this));
        this.subscriptions = [];
        if (this.version == l.VIEWER_SNOWLIFT)this.subscriptions.push(g.subscribe("PhotoSnowlift.PAGE", this.hideTags.bind(this)));
    }

    o.prototype.showTag = function (event) {
        "use strict";
        var p = event.getTarget(), q = h.hasClass(p, 'taggee'), r = h.hasClass(p, "_54ru"), s = null;
        if (q) {
            s = p.getAttribute('data-tag');
        } else if (r) {
            var t = k.byTag(p, 'a');
            s = t && t.getAttribute('data-tag');
        }
        if (!s) {
            p = k.byClass(p, 'taggee');
            if (p)s = p.getAttribute('data-tag');
        }
        var u = this.version == l.VIEWER_PERMALINK ? 'perm:tag:' + s : 'tag:' + s, v = u && n(u);
        if (v) {
            h.addClass(v, 'showTag');
            h.addClass(this.tagBox, 'showingTag');
        }
    };
    o.prototype.hideTags = function () {
        "use strict";
        h.removeClass(this.tagBox, 'showingTag');
        i.scry(this.tagBox, 'div.showTag').forEach(function (p) {
            h.removeClass(p, 'showTag');
        });
    };
    o.prototype.destroy = function () {
        "use strict";
        for (var p in this.handlers)this.handlers[p].remove();
        this.subscriptions.forEach(g.unsubscribe.bind(g));
    };
    e.exports = o;
}, null);
__d("legacy:PhotoTags", ["PhotoTags"], function (a, b, c, d) {
    a.PhotoTags = b('PhotoTags');
}, 3);