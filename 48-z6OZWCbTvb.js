/*!CK:115563571!*//*1407723996,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["RzRti"]);
}

__d("ComposerXEmptyAttachment", ["ComposerXAttachment"], function (a, b, c, d, e, f, g) {
    for (var h in g)if (g.hasOwnProperty(h))j[h] = g[h];
    var i = g === null ? null : g.prototype;
    j.prototype = Object.create(i);
    j.prototype.constructor = j;
    j.__superConstructor__ = g;
    function j(k, l) {
        "use strict";
        g.call(this);
        this._root = k;
        if (l)this.attachmentClassName = l;
    }

    j.prototype.getRoot = function () {
        "use strict";
        return this._root;
    };
    e.exports = j;
}, null);
__d("SortableGroup", ["CSS", "DOM", "Draggable", "Droppable", "Style", "Vector", "copyProperties", "emptyFunction", "removeFromArray"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    function p() {
        "use strict";
        this.namespace = 'sortable' + (++p.instanceCount);
        this.draggables = {};
        this.droppables = {};
        this.sortables = {};
        this.linkedGroups = [];
        this.linkedGroups.onbeforelinkjump = n;
        this.linkedGroups.onlinkjump = n;
        this.rootNode = null;
        this.boundingBox = null;
        this.neverEmpty = false;
        this.hasEmptyMessage = false;
        this.isDroppable = true;
        this.isDraggable = true;
        this.useScroller = true;
        this.dragOverCriteria = 'inside';
        this.requireSameParent = true;
        this.anchor = null;
        this.disabled = false;
        this.autoWidth = false;
    }

    p.prototype.addEmptyMessage = function (q, r) {
        "use strict";
        var s = 'placeholder';
        if (q.parentNode != r)h.appendContent(r, q);
        this.emptyMessage = q;
        this._initializeAdded(s, q);
        this.hasEmptyMessage = true;
        this.sortables[s] = q;
        this.droppables[s] = (new j(q)).setNamespace(this.namespace).setDragOverHandler(this._dragOverHandlerShim.bind(this, s));
        return this;
    };
    p.prototype.setAutoWidth = function (q) {
        "use strict";
        this.autoWidth = q;
        return this;
    };
    p.prototype.setUseScroller = function (q) {
        "use strict";
        this.useScroller = q;
        return this;
    };
    p.prototype.setDragOverHorizontally = function () {
        "use strict";
        this.dragOverCriteria = 'horizontal';
        return this;
    };
    p.prototype.setDragOverVertically = function () {
        "use strict";
        this.dragOverCriteria = 'vertical';
        return this;
    };
    p.prototype.removeEmptyMessage = function () {
        "use strict";
        if (this.emptyMessage)h.remove(this.emptyMessage);
        this.hasEmptyMessage = false;
        this.removeSortable('placeholder');
        return this;
    };
    p.prototype.addSortable = function (q, r, s) {
        "use strict";
        this._initializeAdded(q, r);
        this.sortables[q] = r;
        this.draggables[q] = (new i(r)).setNamespace(this.namespace).setGutter(this.gutter).setUseAbsolute(true).setUseScroller(this.useScroller).setGrabHandler(this.grabHandler.bind(this, q)).setDropHandler(this.dropHandler.bind(this, q)).setKey('key', q).setBoundingBox(this.boundingBox);
        if (s)this.draggables[q].addHandle(s);
        this.droppables[q] = (new j(r)).setNamespace(this.namespace).setDragOverHandler(this._dragOverHandlerShim.bind(this, q));
        if (this.dragOverCriteria === 'horizontal') {
            this.droppables[q].setDragOverHorizontally();
        } else if (this.dragOverCriteria === 'vertical')this.droppables[q].setDragOverVectically();
        return this;
    };
    p.prototype.destroy = function () {
        "use strict";
        for (var q in this.droppables)this.droppables[q].destroy();
        for (var r in this.draggables)this.draggables[r].destroy();
        this.droppables = this.draggables = this.rootNode = null;
        o(this.linkedGroups, this);
        for (var s = 0; s < this.linkedGroups.length; s++)this.linkedGroups[s].linkedGroups = this.linkedGroups;
    };
    p.prototype.dragOverHandler = function (q, r) {
        "use strict";
        if (!this.isDroppable && !this.anchor)return;
        var s = false;
        if (!(r in this.draggables)) {
            this.linkedGroups.onbeforelinkjump.call(this, r);
            if (!this.migrateLinkedSortable(r))throw new Error('Draggable dropped onto a foreign droppable!');
            s = true;
        }
        var t = true, u = this.getSortables(), v = this.sortables[r], w = this.sortables[q];
        if (!this.anchor) {
            var x = u.length;
            for (var y = 0; y < x; y++)if (u[y] == w) {
                break;
            } else if (u[y] == v) {
                t = false;
                break;
            }
        } else w = this.anchor;
        this.onbeforedragover(v, w);
        var z = this.linkedGroups.placeholder;
        this.insertPlaceholder(z, w, t || this.anchor);
        z.parentNode.insertBefore(v, z);
        this.ondragover(v, w, r, q);
        if (s)this.linkedGroups.onlinkjump.call(this, r);
    };
    p.prototype.dropHandler = function (q) {
        "use strict";
        if (this._checkLastRemaining()) {
            this.draggables[q].resetPosition();
            return;
        }
        var r = this.linkedGroups.placeholder;
        g.removeClass(this.sortables[q], 'drag');
        this.draggables[q].resetPosition();
        r.parentNode.insertBefore(this.sortables[q], r);
        r.parentNode.removeChild(r);
        for (var s = 0; s < this.linkedGroups.length; s++)if (this.linkedGroups[s].anchor)delete this.linkedGroups[s].anchor;
        this.ondropcallback(q, this.sortables[q]);
        this.onorderchange();
    };
    p.prototype.getOrder = function () {
        "use strict";
        var q = [], r = this.getSortables();
        for (var s = 0; s < r.length; s++)for (var t in this.sortables)if (this.sortables[t] == r[s]) {
            q.push(t);
            break;
        }
        return q;
    };
    p.prototype.getSortables = function () {
        "use strict";
        return this.rootNode ? this.rootNode.childNodes : [];
    };
    p.prototype.grabHandler = function (q) {
        "use strict";
        if (this.disabled || this._checkLastRemaining() || !this.isDraggable) {
            this.draggables[q].killDrag();
            return;
        }
        this.onbeforegrabcallback(this.sortables[q], q);
        var r = this.linkedGroups.placeholder, s = this.sortables[q];
        g.setClass(r, s.className);
        g.addClass(r, 'droppable_placeholder');
        g.addClass(s, 'drag');
        l.getElementDimensions(s).setElementDimensions(r);
        if (this.autoWidth)k.set(r, 'width', 'auto');
        s.parentNode.insertBefore(r, s);
        this.ongrabcallback(this.sortables[q], q);
        if (!this.isDroppable) {
            this.anchor = s.nextSibling;
            if (!this.anchor) {
                this.anchor = h.create('div');
                s.parentNode.appendChild(this.anchor);
            }
        }
    };
    p.prototype.insertPlaceholder = function (q, r, s) {
        "use strict";
        if (s) {
            h.insertBefore(r, q);
        } else h.insertAfter(r, q);
    };
    p.prototype.keyExists = function (q) {
        "use strict";
        return this.sortables[q];
    };
    p.prototype.link = function (q) {
        "use strict";
        q.linkedGroups = this.linkedGroups;
        if (!this.linkedGroups.length)this.linkedGroups.push(this);
        this.linkedGroups.push(q);
        for (var r = 0; r < this.linkedGroups.length; r++)if (this.linkedGroups[r].namespace != this.namespace) {
            this.linkedGroups[r].namespace = this.namespace;
            for (var s in this.linkedGroups[r].droppables) {
                this.linkedGroups[r].droppables[s].setNamespace(this.namespace);
                var t = this.linkedGroups[r].draggables[s];
                t && t.setNamespace(this.namespace);
            }
        }
        return this;
    };
    p.prototype.migrateLinkedSortable = function (q) {
        "use strict";
        for (var r = 0; r < this.linkedGroups.length; r++)if (q in this.linkedGroups[r].draggables) {
            this.sortables[q] = this.linkedGroups[r].sortables[q];
            this.draggables[q] = this.linkedGroups[r].draggables[q];
            this.draggables[q].setGrabHandler(this.grabHandler.bind(this, q)).setDropHandler(this.dropHandler.bind(this, q));
            this.droppables[q] = this.linkedGroups[r].droppables[q];
            this.droppables[q].setDragOverHandler(this._dragOverHandlerShim.bind(this, q));
            delete this.linkedGroups[r].sortables[q];
            delete this.linkedGroups[r].draggables[q];
            delete this.linkedGroups[r].droppables[q];
            return true;
        }
        return false;
    };
    p.prototype.removeSortable = function (q) {
        "use strict";
        if (q in this.sortables) {
            if (q in this.draggables)this.draggables[q].destroy();
            if (q in this.droppables)this.droppables[q].destroy();
            delete this.draggables[q];
            delete this.droppables[q];
            delete this.sortables[q];
        }
    };
    p.prototype.removeAllSortables = function () {
        "use strict";
        for (var q in this.sortables)this.removeSortable(q);
    };
    p.prototype.setDisabled = function (q) {
        "use strict";
        this.disabled = q;
        return this;
    };
    p.prototype.forceDrop = function (q) {
        "use strict";
        if (q in this.sortables)this.draggables[q].forceDrop();
    };
    p.prototype.killDrag = function (q) {
        "use strict";
        if (q in this.sortables)this.draggables[q].killDrag();
    };
    p.prototype.setBeforeGrabCallback = function (q) {
        "use strict";
        this.onbeforegrabcallback = q;
        return this;
    };
    p.prototype.setBoundingBox = function (q) {
        "use strict";
        this.boundingBox = q;
        for (var r in this.draggables)this.draggables[r].setBoundingBox(this.boundingBox);
        return this;
    };
    p.prototype.setBeforeDragOverCallback = function (q) {
        "use strict";
        this.onbeforedragover = q;
        return this;
    };
    p.prototype.setDragOverCallback = function (q) {
        "use strict";
        this.ondragover = q;
        return this;
    };
    p.prototype.setDropCallback = function (q) {
        "use strict";
        this.ondropcallback = q;
        return this;
    };
    p.prototype.setDroppable = function (q) {
        "use strict";
        this.isDroppable = q;
        return this;
    };
    p.prototype.setDraggable = function (q) {
        "use strict";
        this.isDraggable = q;
        return this;
    };
    p.prototype.setGrabCallback = function (q) {
        "use strict";
        this.ongrabcallback = q;
        return this;
    };
    p.prototype.setBeforeLinkJumpHandler = function (q) {
        "use strict";
        this.linkedGroups.onbeforelinkjump = q;
        return this;
    };
    p.prototype.setInsertPlaceholderHandler = function (q) {
        "use strict";
        this.insertPlaceholder = q;
    };
    p.prototype.setLinkJumpHandler = function (q) {
        "use strict";
        this.linkedGroups.onlinkjump = q;
        return this;
    };
    p.prototype.setNeverEmpty = function (q) {
        "use strict";
        this.neverEmpty = q;
    };
    p.prototype.setOrderChangeHandler = function (q) {
        "use strict";
        this.onorderchange = q;
        return this;
    };
    p.prototype.setRequireSameParent = function (q, r) {
        "use strict";
        this.requireSameParent = r;
    };
    p.prototype.setSortablesGetter = function (q) {
        "use strict";
        this.getSortables = q;
    };
    p.prototype._checkLastRemaining = function (q) {
        "use strict";
        var r = this.hasEmptyMessage ? 2 : 1;
        return this.neverEmpty && this.getSortables().length == r;
    };
    p.prototype._dragOverHandlerShim = function (q, r) {
        "use strict";
        this.dragOverHandler(q, r.getKey('key'));
    };
    p.prototype._initializeAdded = function (q, r) {
        "use strict";
        if (this.rootNode === null) {
            this.rootNode = r.parentNode;
            if (!this.linkedGroups.placeholder)this.linkedGroups.placeholder = h.create(r.tagName, {className: 'dragPlaceholder', style: {padding: '0'}});
        } else if (this.requireSameParent && this.rootNode != r.parentNode)throw new Error('All sortables of a collection must share the same parentNode');
        if (q in this.draggables)throw new Error('All sortables must have a unique key');
    };
    p.instanceCount = 0;
    m(p.prototype, {gutter: 15, onbeforegrabcallback: n, onbeforedragover: n, ondragover: n, ondropcallback: n, ongrabcallback: n, onorderchange: n});
    e.exports = a.SortableGroup || p;
}, null);
__d("TimelineReorderAboutUnitEditor", ["AsyncRequest", "DataStore", "DOMQuery", "Rect", "SortableGroup", "csx"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = null;

    function n(o, p) {
        "use strict";
        if (!m || p !== m.$TimelineReorderAboutUnitEditor0)m = this;
        m.$TimelineReorderAboutUnitEditor1 = o;
        m.$TimelineReorderAboutUnitEditor0 = p;
        n.resetItems();
        return m;
    }

    n.prototype.addItems = function () {
        "use strict";
        this.sortableGroup = new k().setOrderChangeHandler(this.$TimelineReorderAboutUnitEditor2.bind(this));
        var o = i.scry(this.$TimelineReorderAboutUnitEditor1, "._5bkm");
        for (var p = 0, q = o.length; p < q; p++)this.sortableGroup.addSortable(h.get((o[p]), 'token'), o[p]);
        var r = new j(this.$TimelineReorderAboutUnitEditor1);
        this.sortableGroup.setBoundingBox(r);
    };
    n.prototype.$TimelineReorderAboutUnitEditor2 = function () {
        "use strict";
        new g('/ajax/timeline/about_unit/reorder_items/').setData({order: this.sortableGroup.getOrder(), profile_id: this.$TimelineReorderAboutUnitEditor0}).send();
    };
    n.resetItems = function () {
        "use strict";
        if (!m)return;
        m.sortableGroup && m.sortableGroup.destroy();
        m.addItems();
    };
    e.exports = n;
}, null);
__d("TimelineStickyHeaderComposerX", ["Arbiter", "Bootloader", "ComposerXController", "CSS", "DOMQuery", "Event", "Parent", "Run", "TimelineComposerUtilities", "TimelineContentLoader", "TimelineStickyHeader", "Vector", "csx", "cx", "getElementText"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
    function v(x) {
        return x && x.getContext && m.byClass(x.getContext(), "_2wp");
    }

    function w(x) {
        "use strict";
        this._composerRoot = x;
        this._tokens = [o.listenToSetEstimatedDate(this._composerRoot, p.capsuleForCurrentSection), o.listenToPublish(this._composerRoot, this._close.bind(this)), g.subscribe('PhotoSnowlift.OPEN', this._close.bind(this)), g.subscribe('TimelineMLE/mleFlyoutShown', function (y, z) {
            if (v(z) === this._composerRoot)i.reset(this._composerRoot);
        }.bind(this)), g.subscribe('composer/initializedAttachment', function (y, z) {
            if (z.composerRoot === this._composerRoot) {
                this._registerClickToDismiss();
                if (!z.isInitial)this._closeMLE();
            } else this._close();
        }.bind(this)), g.subscribe(q.ADJUST_WIDTH, this._toggleNarrowMode.bind(this))];
        this._clickCancelToken = o.listenToCancel(this._composerRoot, this._close.bind(this));
        n.onLeave(function () {
            while (this._tokens.length)this._tokens.pop().unsubscribe();
            this._clearClickDismissToken();
            if (this._clickCancelToken) {
                this._clickCancelToken.remove();
                this._clickCancelToken = null;
            }
        }.bind(this));
    }

    w.prototype._toggleNarrowMode = function (event, x) {
        "use strict";
        h.loadModules(["Tooltip"], function (y) {
            var z = r.getElementDimensions(x).x > 400, aa = k.scry(this._composerRoot, "._9lb");
            j.conditionClass(this._composerRoot, "_2wq", z);
            for (var ba = 0; ba < aa.length; ba++) {
                var ca = aa[ba], da = u(ca);
                if (z) {
                    y.set(ca, da);
                } else y.remove(ca);
            }
        }.bind(this));
        return false;
    };
    w.prototype._registerClickToDismiss = function () {
        "use strict";
        var x = j.hasClass(k.find(this._composerRoot, "._yq"), "_519b");
        if (!x) {
            this._clearClickDismissToken();
            return;
        }
        this._clickDismissToken = l.listen(document.body, 'click', function (y) {
            var z = m.byClass(y.getTarget(), "_2wp");
            if (!z) {
                this._close();
                this._clearClickDismissToken();
            }
        }.bind(this));
    };
    w.prototype._clearClickDismissToken = function () {
        "use strict";
        if (this._clickDismissToken) {
            this._clickDismissToken.remove();
            this._clickDismissToken = null;
        }
    };
    w.prototype._close = function () {
        "use strict";
        this._clearClickDismissToken();
        this._closeMLE();
        i.reset(this._composerRoot);
    };
    w.prototype._closeMLE = function () {
        "use strict";
        h.loadModules(["TimelineMLE"], function (x) {
            var y = x.getFlyout();
            if (v(y) === this._composerRoot)x.hideFlyout();
        }.bind(this));
    };
    e.exports = w;
}, null);
__d("InfoReviewInstanceManager", ["DOM", "Event", "React", "csx"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = "._5sf3", l = [], m = [], n = {addInstanceRoot: function (o, p) {
        m.push(h.listen(p, 'click', function (q) {
            var r = g.scry(p, k)[0];
            r && g.remove(r);
        }));
        l.push(o);
    }, cleanupInstances: function () {
        var o = [];
        while (l.length) {
            var p = l.pop();
            document.contains(p) ? o.push(p) : i.unmountComponentAtNode(p);
        }
        while (m.length)m.pop().remove();
        l = o;
    }};
    e.exports = n;
}, null);
__d("InfoReviewCloseButton", ["DOM", "Event", "InfoReviewInstanceManager", "Parent", "$", "tidyEvent"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = 'fbTimelineUnit';

    function n(o, p) {
        "use strict";
        this.$InfoReviewCloseButton0 = o;
        this.$InfoReviewCloseButton1 = p;
        this.$InfoReviewCloseButton2 = h.listen(this.$InfoReviewCloseButton0, 'click', this.$InfoReviewCloseButton3.bind(this));
        l(this.$InfoReviewCloseButton2);
    }

    n.prototype.$InfoReviewCloseButton3 = function () {
        "use strict";
        var o = k(this.$InfoReviewCloseButton1);
        if (o.parentElement.children.length === 1)o = j.byClass(o, m);
        g.remove(o) && this.$InfoReviewCloseButton4();
        i.cleanupInstances();
    };
    n.prototype.$InfoReviewCloseButton4 = function () {
        "use strict";
        this.$InfoReviewCloseButton0 = null;
        this.$InfoReviewCloseButton1 = null;
        this.$InfoReviewCloseButton2 && this.$InfoReviewCloseButton2.remove();
        this.$InfoReviewCloseButton2 = null;
    };
    e.exports = n;
}, null);