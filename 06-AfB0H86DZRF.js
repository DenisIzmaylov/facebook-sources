/*!CK:1255637580!*//*1412036295,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["xttYm"]);
}

__d("Collection", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        if (!h.__collection__) {
            var j = new Function();
            for (var k in h.prototype)j.prototype[k] = g._call.bind(null, k);
            h.__collection__ = j;
        }
        var l = new h.__collection__();
        l._elements = i;
        return l;
    }

    g._call = function (h) {
        var i = Array.prototype.slice.call(arguments, 1);
        this._elements.forEach(function (j) {
            j[h].apply(j, i);
        });
        return this;
    };
    e.exports = g;
}, null);
__d("Drag", ["Event", "Arbiter", "DOM", "Style", "Vector"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {};
    l.currentDraggable = null;
    l.grab = function (m) {
        if (l.currentDraggable)l._onmouseup();
        m.lastDragOver = null;
        l.attachDragEvents();
        l.currentDraggable = m;
    };
    l.attachDragEvents = function () {
        document.onselectstart = function () {
            document.onselectstart = null;
            return false;
        };
        if (l.dragEventsAttached)return;
        l.dragEventsAttached = true;
        h.subscribe('scroller/scroll', l._onmousemove);
        g.listen(document, {mousemove: l._onmousemove, mouseup: l._onmouseup});
    };
    l.droppables = {};
    l.addDroppable = function (m, n) {
        (l.droppables[m] = l.droppables[m] || []).push(n);
    };
    l.removeDroppable = function (m, n) {
        l.droppables[m] = l.droppables[m].filter(function (o) {
            return o != n;
        });
    };
    l.getOffsetParent = function (m) {
        if (i.isNodeOfType(m, ['body', 'html']))return document.body;
        while ((m = m.parentNode) && m !== document.body)if (j.get(m, 'position') !== 'static')return m;
        return document.body;
    };
    l._onmousemove = function (event, m) {
        if (!l.currentDraggable)return;
        var n = m || k.getEventPosition(event), o = l.currentDraggable, p = l.droppables[o.namespace];
        if (o.namespace && o.active && p) {
            var q = {};
            p.forEach(function (w) {
                q[w.zIndex] = w.zIndex;
            });
            var r = [];
            for (var s in q)r.push(q[s]);
            r.sort();
            var t = o.lastDragOver, u = null;
            for (var v = r.length - 1; v >= 0; v--)if (t && t.dom != null && t.zIndex == r[v] && t.isDraggedOver(n)) {
                u = t;
                break;
            } else for (s = 0; s < p.length; s++) {
                if (r[v] != p[s].zIndex)continue;
                if (t != p[s] && o.dom != p[s].dom && p[s].isDraggedOver(n)) {
                    u = p[s];
                    v = -1;
                    break;
                }
            }
            if (u && u != t) {
                u.ondragover(o);
                l.currentDraggable.adjustCursorPosition();
            }
            if (u)u.ondragmove(o, n.sub(k.getElementPosition(u.dom)));
            o.lastDragOver = u;
        }
        l.currentDraggable._onmousemove(n);
    };
    l._onmouseup = function (m) {
        document.onselectstart = null;
        if (l.currentDraggable) {
            l.currentDraggable._ondrop();
            l.currentDraggable = null;
        }
    };
    e.exports = l;
}, null);
__d("Draggable", ["Event", "Arbiter", "Collection", "DOM", "Drag", "Rect", "Style", "Vector", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    function p(s) {
        "use strict";
        this.canvas = s;
        this.scrollZone = 50;
        this.velocity = 100;
        this.coefficient = 1;
    }

    p.prototype.activate = function () {
        "use strict";
        this.activate = o;
        this.event = g.listen(document, 'mousemove', this._onmousemove.bind(this));
        this.interval = setInterval(this._intervalHandler.bind(this), 50);
        this.cursor = null;
    };
    p.prototype.deactivate = function () {
        "use strict";
        delete this.activate;
        this.event && this.event.remove();
        this.event = null;
        clearInterval(this.interval);
    };
    p.prototype._onmousemove = function (event) {
        "use strict";
        this.cursor = n.getEventPosition(event);
    };
    p.prototype._intervalHandler = function () {
        "use strict";
        if (!this.cursor)return;
        var s = this.canvas == document.body ? l.getViewportBounds() : new l(this.canvas), t = new l(this.cursor.y - s.t, s.r - this.cursor.x, s.b - this.cursor.y, this.cursor.x - s.l), u = new n(0, 0);
        if (t.t < t.b && t.t < this.scrollZone) {
            u.y = -this.scrollZone + t.t;
        } else if (t.b < this.scrollZone)u.y = this.scrollZone - t.b;
        u.y = this._doMath(u.y);
        if (t.l < t.r && t.l < this.scrollZone) {
            u.x = -this.scrollZone + t.l;
        } else if (t.r < this.scrollZone)u.x = this.scrollZone - t.r;
        u.x = this._doMath(u.x);
        if (u.x || u.y) {
            u.scrollElementBy(this.canvas);
            if (document.body == this.canvas) {
                var v = n.getScrollPosition();
                u.scrollElementBy(this.canvas);
                var w = n.getScrollPosition();
                this.cursor = this.cursor.add(w.sub(v));
            } else u.scrollElementBy(this.canvas);
            h.inform('scroller/scroll', this.cursor);
        }
    };
    p.prototype._doMath = function (s) {
        "use strict";
        s = (s >= 0 ? Math.min(s, this.scrollZone) : Math.max(s, -this.scrollZone));
        return Math.floor(Math.pow(s / this.scrollZone * this.velocity, this.coefficient));
    };
    p.findScrollParent = function (s) {
        "use strict";
        var t;
        s = s.parentNode;
        while (s) {
            if (s.scrollHeight != s.offsetTop) {
                t = m.get(s, 'overflowY');
                if (t == 'scroll' || t == 'auto')return s;
            }
            s = s.parentNode;
        }
        return document.body;
    };
    function q(s) {
        "use strict";
        if (!s)throw new Error('Element should be a DOM node');
        if (!(this instanceof q)) {
            if (s instanceof Array) {
                var t = [];
                s.forEach(function (u) {
                    t.push(new q(u));
                });
                return new i(q, t);
            } else return new q(s);
        } else {
            this.data = {};
            this.handles = [];
            this.dom = s;
            this.boundingBox = null;
            this.useScroller = true;
            this.grabPctX = this.grabPctY = 0;
            this.addHandle(this.dom);
        }
    }

    q.prototype.destroy = function () {
        "use strict";
        this.handles.forEach(function (s) {
            this.removeHandle(s.obj);
        }.bind(this));
        this.data = this.dom = null;
    };
    q.prototype.adjustCursorPosition = function () {
        "use strict";
        var s = n.getElementDimensions(this.dom);
        this.cursorPositionVector = new n(parseInt(this.grabPctX * s.x, 10), parseInt(this.grabPctY * s.y, 10));
    };
    q.prototype._onclick = function (event) {
        "use strict";
        if (this.active)return g.kill(event);
    };
    q.prototype._ongrab = function (s) {
        "use strict";
        this.ongrab();
        if (this.useScroller) {
            if (!this.scroller)this.scroller = new p(p.findScrollParent(this.dom));
            this.scroller.activate();
        }
        if (this.active) {
            if (!this.oldPosition)this.oldPosition = this.dom.style.position;
            var t = k.getOffsetParent(this.dom);
            if (t !== document.body)s = s.sub(n.getElementPosition(t));
            this.dom.style.position = this.absolute ? 'absolute' : 'relative';
            s.sub(this.cursorPositionVector).setElementPosition(this.dom);
        }
    };
    q.prototype._onmousedown = function (event) {
        "use strict";
        if (!((event.which && event.which === 1) || (event.button && event.button === 1)))return;
        var s = event.getTarget();
        if (j.isNodeOfType(s, ['input', 'select', 'textarea', 'object', 'embed']))return true;
        var t = n.getEventPosition(event), u = n.getElementDimensions(this.dom);
        this.draggableInitialVector = n.getElementPosition(this.dom);
        this.cursorPositionVector = t.sub(this.draggableInitialVector);
        this.grabPctX = u.x === 0 ? 0 : this.cursorPositionVector.x / u.x;
        this.grabPctY = u.y === 0 ? 0 : this.cursorPositionVector.y / u.y;
        k.grab(this, event);
        if (this.gutter) {
            this.cursorInitialVector = t;
        } else {
            this._setActive(true);
            this._ongrab(t);
        }
        return g.kill(event);
    };
    q.prototype._onmousemove = function (s) {
        "use strict";
        if (!this.active)if (s.distanceTo(this.cursorInitialVector) >= this.gutter) {
            this._setActive(true);
            this._ongrab(s);
        }
        if (this.active) {
            var t = s.sub(this.cursorPositionVector), u;
            if (this.boundingBox) {
                var v = l.newFromVectors(t, n.getElementDimensions(this.dom));
                v = v.boundWithin(this.boundingBox);
                t = v.getPositionVector();
                if (this.boundingBox.w() === 0) {
                    u = new n(this.draggableInitialVector.x, t.y, 'document');
                } else if (this.boundingBox.h() === 0) {
                    u = new n(t.x, this.draggableInitialVector.y, 'document');
                } else u = t;
            } else u = t;
            var w = k.getOffsetParent(this.dom);
            if (w !== document.body)u = u.sub(n.getElementPosition(w));
            u.setElementPosition(this.dom);
            this.ondrag(s);
        }
    };
    q.prototype._ondrop = function () {
        "use strict";
        this.scroller && this.scroller.deactivate();
        if (this.active) {
            setTimeout((function () {
                this._setActive(false);
            }).bind(this), 0);
            this.ondrop();
            if (this.lastDragOver)this.lastDragOver.ondrop(this);
        }
    };
    q.prototype.killDrag = function () {
        "use strict";
        this._setActive(false);
        k._onmouseup();
    };
    q.prototype.forceDrop = function () {
        "use strict";
        k._onmouseup();
    };
    q.prototype.setBoundingBox = function (s) {
        "use strict";
        this.boundingBox = s;
        return this;
    };
    q.prototype.resetPosition = function () {
        "use strict";
        this.dom.style.position = this.oldPosition;
        this.oldPosition = null;
        this.dom.style.left = '';
        this.dom.style.top = '';
        return this;
    };
    q.prototype.setUseAbsolute = function (s) {
        "use strict";
        this.absolute = s;
        return this;
    };
    q.prototype.setDragHandler = function (s) {
        "use strict";
        this.ondrag = s;
        return this;
    };
    q.prototype.setGrabHandler = function (s) {
        "use strict";
        this.ongrab = s;
        return this;
    };
    q.prototype.setDropHandler = function (s) {
        "use strict";
        this.ondrop = s;
        return this;
    };
    q.prototype.setGutter = function (s) {
        "use strict";
        this.gutter = s;
        return this;
    };
    q.prototype.setNamespace = function (s) {
        "use strict";
        this.namespace = s;
        return this;
    };
    q.prototype.setUseScroller = function (s) {
        "use strict";
        this.useScroller = s;
        return this;
    };
    q.prototype.addHandle = function (s) {
        "use strict";
        if (this.handles.length == 1 && this.handles[0].obj == this.dom)this.removeHandle(this.dom);
        this.handles.push({obj: s, evt: [g.listen(s, 'mousedown', this._onmousedown.bind(this)), g.listen(s, 'click', this._onclick.bind(this)), g.listen(s, 'drag', r), g.listen(s, 'selectstart', r)]});
        return this;
    };
    q.prototype.removeHandle = function (s) {
        "use strict";
        this.handles = this.handles.filter(function (t) {
            if (t.obj != s) {
                return true;
            } else {
                t.evt.forEach(function (u) {
                    u.remove();
                });
                return false;
            }
        });
    };
    q.prototype.getDOM = function () {
        "use strict";
        return this.dom;
    };
    q.prototype.setKey = function (s, t) {
        "use strict";
        this.data[s] = t;
        return this;
    };
    q.prototype.getKey = function (s) {
        "use strict";
        return this.data[s];
    };
    q.prototype._setActive = function (s) {
        "use strict";
        if (!this.dom)return;
        this.dom.activeDrag = this.active = s;
        for (var t = 0; t < this.handles.length; t++)this.handles[t].obj.activeDrag = s;
    };
    q.prototype.ondrag = o;
    q.prototype.ongrab = o;
    q.prototype.ondrop = o;
    q.prototype.gutter = 0;
    q.prototype.handles = null;
    function r(s) {
        if (s.getTarget() !== document.activeElement)return s.kill();
    }

    e.exports = q;
}, null);
__d("Droppable", ["Collection", "Drag", "Draggable", "Vector", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(m) {
        "use strict";
        if (!m)throw new Error('Element should be a DOM node');
        if (!(this instanceof l)) {
            if (m instanceof Array) {
                var n = [];
                m.forEach(function (o) {
                    n.push(new l(o));
                });
                return new g(l, n);
            } else return new l(m);
        } else {
            this.data = {};
            this.dom = m;
            this.namespace = null;
        }
    }

    l.prototype.destroy = function () {
        "use strict";
        if (this.namespace)h.removeDroppable(this.namespace, this);
        this.data = this.dom = null;
    };
    l.prototype.setNamespace = function (m) {
        "use strict";
        if (this.namespace)h.removeDroppable(this.namespace, this);
        this.namespace = m;
        h.addDroppable(m, this);
        return this;
    };
    l.prototype.setZIndex = function (m) {
        "use strict";
        this.zIndex = m;
        return this;
    };
    l.prototype.hasPointMovedHorizontally = function (m) {
        "use strict";
        var n = j.getElementPosition(this.dom);
        return n.x <= m.x && this.dom.offsetWidth + n.x > m.x;
    };
    l.prototype.hasPointMovedVertically = function (m) {
        "use strict";
        var n = j.getElementPosition(this.dom);
        return n.y <= m.y && this.dom.offsetHeight + n.y > m.y;
    };
    l.prototype.hasPointMovedInside = function (m) {
        "use strict";
        return this.hasPointMovedHorizontally(m) && this.hasPointMovedVertically(m);
    };
    l.prototype.setDragOverHandler = function (m) {
        "use strict";
        this.ondragover = m;
        return this;
    };
    l.prototype.setDragOverVectically = function () {
        "use strict";
        this.isDraggedOver = l.prototype.hasPointMovedVertically;
        return this;
    };
    l.prototype.setDragOverHorizontally = function () {
        "use strict";
        this.isDraggedOver = l.prototype.hasPointMovedHorizontally;
        return this;
    };
    l.prototype.setDragMoveHandler = function (m) {
        "use strict";
        this.ondragmove = m;
        return this;
    };
    l.prototype.setDropHandler = function (m) {
        "use strict";
        this.ondrop = m;
        return this;
    };
    l.prototype.zIndex = 0;
    l.prototype.isDraggedOver = l.prototype.hasPointMovedInside;
    l.prototype.ondragover = k;
    l.prototype.ondragmove = k;
    l.prototype.ondrop = k;
    l.prototype.getDOM = i.prototype.getDOM;
    l.prototype.setKey = i.prototype.setKey;
    l.prototype.getKey = i.prototype.getKey;
    e.exports = l;
}, null);
__d("LeftNavItemClassicDraggableContainer.react", ["React", "DOMDimensions", "Style", "Draggable", "Droppable", "Arbiter"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    var m = g.createClass({displayName: 'LeftNavItemClassicDraggableContainer', propTypes: {itemID: g.PropTypes.oneOfType([g.PropTypes.string, g.PropTypes.number]).isRequired, section: g.PropTypes.object.isRequired, sortable: g.PropTypes.bool.isRequired}, render: function () {
        return (g.createElement(g.DOM.div, {'data-itemid': this.props.itemID}, this.props.children));
    }, componentWillReceiveProps: function (n) {
        if (!this.props.sortable && n.sortable)this._mountDraggable(n.draggableBound);
        if (this.props.sortable && !n.sortable)this._unmountDraggable();
    }, _mountDraggable: function (n) {
        var o = 'bookmarkItem', p = this.props.section, q = this.props.itemID, r = this.getDOMNode();
        this._draggable = (new j(r)).setNamespace(o).setUseAbsolute(true).setGutter(15).setBoundingBox(n).setGrabHandler(function () {
            var s = h.getElementDimensions(this.dom);
            i.set(this.dom, 'width', s.width + 'px');
            l.inform('LeftNavDragController/onItemEditDraggableGrab', {section: p, draggable: this});
        }).setDropHandler(function () {
            i.set(this.dom, 'width', '');
            this.resetPosition();
            l.inform('LeftNavDragController/onItemEditDraggableDrop', {section: p, draggable: this});
        });
        this._droppable = (new k(r)).setNamespace(o).setDragOverHandler(function (s) {
            l.inform('LeftNavDragController/onItemEditDroppableDragOver', {section: p, draggable: s, targetItemID: q});
        });
    }, _unmountDraggable: function () {
        if (this._draggable)this._draggable.destroy();
        if (this._droppable)this._droppable.destroy();
    }});
    e.exports = m;
}, null);
__d("LeftNavDragNUX.react", ["ContextualDialog", "ContextualDialogArrow", "LayerAutoFocus", "LayerRefocusOnHide", "ReactLayer", "React", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    "use strict";
    var o = l.PropTypes, p = k.createClass({displayName: 'LeftNavDragNUX', createLayer: function (r) {
        var s = this.props.nuxType !== 'remove' ? "_53lz" : "_53l-", t = this.getContextNode(), u = {wrapperClassName: s, arrowDimensions: {offset: 14, length: 18}}, v = {alignment: this.props.alignment, arrowBehavior: h, context: t, offsetX: this.props.offsetX, offsetY: this.props.offsetY, position: this.props.position, theme: u}, w = new g(v, r);
        w.disableBehavior(i);
        w.disableBehavior(j);
        w.conditionShow(this.props.shown);
        return w;
    }, receiveProps: function (r) {
        var s = this.getContextNode();
        this.layer.setContext(s);
        this.layer.setPosition(r.position).setAlignment(r.alignment).setOffsetX(r.offsetX).setOffsetY(r.offsetY).conditionShow(r.shown);
    }, getContextNode: function () {
        var r = this.props.owner.getSiblingByRef(this.props.contextRef);
        return r && r.getDOMNode();
    }}), q = l.createClass({displayName: 'LeftNavDragNUX', propTypes: {contextRef: o.string, nuxType: o.oneOf(['add', 'sort', 'remove', null, undefined]), alignment: o.oneOf(['left', 'center', 'right']), offsetX: o.number, offsetY: o.number}, render: function () {
        var r = this.props, s = r.nuxType, t = (function (v, w) {
            var x = {}, y = Object.prototype.hasOwnProperty;
            if (v == null)throw new TypeError();
            for (var z in v)if (y.call(v, z) && !y.call(w, z))x[z] = v[z];
            return x;
        })(r, {nuxType: 1}), u = null;
        switch (s) {
            case 'add':
                u = "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435";
                break;
            case 'sort':
                u = "\u041f\u0435\u0440\u0435\u0433\u0440\u0443\u043f\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c";
                break;
            case 'remove':
                u = "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0433\u043e";
                break;
            case null:
                return null;
            case undefined:
                return null;
        }
        return (l.createElement(p, Object.assign({}, t, {className: "dragTooltip", shown: s !== null, owner: this, nuxType: s}), u));
    }});
    e.exports = q;
}, null);
__d("LeftNavItemDraggableContainer.react", ["React", "LeftNavDragNUX.react", "ReactLayeredComponentMixin", "Arbiter", "Draggable", "Droppable", "csx", "DOMDimensions", "DOMQuery", "Style"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    "use strict";
    var q = g.createClass({displayName: 'LeftNavItemDraggableContainer', mixins: [i], propTypes: {itemID: g.PropTypes.oneOfType([g.PropTypes.string, g.PropTypes.number]).isRequired, section: g.PropTypes.object.isRequired, isPinned: g.PropTypes.bool.isRequired, sortable: g.PropTypes.bool.isRequired}, getInitialState: function () {
        return {tooltip: null};
    }, renderLayers: function () {
        if (!this.props.sortable)return {dragNUX: null};
        var r = this.state.tooltip === 'remove' ? g.createElement(h, {contextRef: "draggableContainer", nuxType: "remove", position: "above", alignment: "left", offsetX: 20}) : null;
        return {dragNUX: r};
    }, render: function () {
        var r = this.props.isPinned ? 'pinnedItem' : null;
        return (g.createElement(g.DOM.div, {ref: "draggableContainer", className: r, 'data-itemid': this.props.itemID}, this.props.children));
    }, setTooltip: function (r) {
        this.setState({tooltip: r});
    }, componentDidMount: function () {
        if (this.props.sortable)this._mountDraggable();
    }, componentWillUnmount: function () {
        if (this.props.sortable)this._unmountDraggable();
    }, _mountDraggable: function () {
        var r = 'bookmarkItem', s = this, t = this.props.section, u = this.props.itemID, v = this.props.isPinned, w = this.getDOMNode(), x = o.scry(w, "._1agu")[0];
        if (!x)return;
        this._draggable = (new k(w)).setNamespace(r).setUseAbsolute(true).setGutter(15).addHandle(x).setGrabHandler(function () {
            var y = n.getElementDimensions(this.dom);
            p.apply(this.dom, {width: y.width + 'px', 'z-index': '999'});
            j.inform('LeftNavDragController/onItemDraggableGrab', {section: t, dragContainer: s, draggable: this, isDraggedItemPinned: v});
        }).setDragHandler(function (y) {
            j.inform('LeftNavDragController/onItemDraggableDrag', {dragContainer: s, isDraggedItemPinned: v, vector: y});
        }).setDropHandler(function () {
            p.apply(this.dom, {width: null, 'z-index': null});
            this.resetPosition();
            s.setTooltip(null);
            j.inform('LeftNavDragController/onItemDraggableDrop', {section: t, draggable: this, isDraggedItemPinned: v});
        });
        if (t.props.id === 'pinnedNav')this._droppable = (new l(w)).setNamespace(r).setDragOverHandler(function (y) {
            j.inform('LeftNavDragController/onItemDroppableDragOver', {section: t, draggable: y, targetItemID: u});
        });
    }, _unmountDraggable: function () {
        if (this._draggable)this._draggable.destroy();
        if (this._droppable)this._droppable.destroy();
    }});
    e.exports = q;
}, null);
__d("LeftNavItem.react", ["Arbiter", "Bootloader", "DOMContainer.react", "Image.react", "LeftNavItemClassicDraggableContainer.react", "LeftNavItemDraggableContainer.react", "React", "Run", "XUISpinner.react", "cx", "joinClasses", "LeftNavConfig"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    "use strict";
    var s = '\u00A0', t = '\u00B7', u = m.createClass({displayName: 'LeftNavItem', render: function () {
        var v = r.gkResults.left_nav_drag_to_favorite === 1, w = this.props, x = w.model, y = w.section, z = x.keys.some(function (fa) {
            return fa === w.selectedKey;
        }), aa = x.keys.some(function (fa) {
            return fa === w.loadingKey;
        }), ba = y.props.id === 'pinnedNav', ca = y.props.id === 'bookmarksSeeAllEntSection', da = (("sideNavItem") + (' ' + "stat_elem") + (z ? ' ' + "selectedItem" : '') + (aa ? ' ' + "_5afd" : '')), ea = v ? m.createElement(l, {itemID: x.id, section: y, sortable: x.sortable && !ca, pinnable: x.pinnable, isPinned: x.pinned, draggableBound: this.props.draggableBound}, this._renderBookmarkContent()) : m.createElement(k, {itemID: x.id, section: y, sortable: ba && w.inEditMode && x.sortable, draggableBound: this.props.draggableBound}, this._renderBookmarkContent());
        return (m.createElement(m.DOM.li, {key: x.id, className: da, 'data-sortable': x.sortable}, ea));
    }, _renderBookmarkContent: function () {
        var v = r.gkResults.left_nav_drag_to_favorite === 1, w = this.props.model, x = this.props.section, y = x.props.id === 'pinnedNav', z = x.props.id === 'bookmarksSeeAllEntSection', aa = w.count > 0, ba = w.auxcontent ? m.createElement(i, {key: "auxpopover"}, w.auxcontent) : null, ca = this._renderCounter(w.count, z), da = q('linkWrap', aa ? 'hasCount' : 'noCount'), ea = (("_5afe") + (y && w.sortable ? ' ' + "sortableItem" : ''));
        if (!this.BookmarkPopoverMenu)n.onLoad(function () {
            h.loadModules(["BookmarkPopoverMenu.react"], function (ja) {
                this.BookmarkPopoverMenu = ja;
                setTimeout(this.forceUpdate.bind(this), 0);
            }.bind(this));
        }.bind(this));
        var fa = null, ga = this.BookmarkPopoverMenu;
        if (ga)fa = m.createElement(ga, {key: "popover", navSection: this.props.section, navItem: this, editmenu: w.editmenu});
        var ha = null;
        if (z && w.subtitle)ha = m.createElement(m.DOM.div, {className: "_1xmt"}, s + s + t + s + s, m.createElement(i, null, w.subtitle));
        var ia = [ba, fa, m.createElement(m.DOM.div, {className: "clearfix"}, m.createElement(m.DOM.a, {key: "link", 'data-testid': 'left_nav_item_' + w.link.title, className: ea, 'data-gt': w.datagt, title: w.link.title, rel: w.link.rel, href: w.link.href, draggable: "false", onClick: function () {
            return g.inform('LeftNavController/setItemCount', {item: w, count: 0});
        }}, m.createElement(m.DOM.div, {className: "rfloat"}, m.createElement(o, {className: "uiSideNavSpinner", showOnAsync: true}), z ? null : ca, y && w.sortable ? m.createElement(m.DOM.span, {className: "_upa"}) : null), m.createElement(m.DOM.span, {className: "imgWrap"}, m.createElement(j, {src: w.image, height: "16", width: "16", className: ((v && w.sortable && !z ? "_1agu" : '')), draggable: "false"})), m.createElement(m.DOM.div, {className: da}, w.name, z ? ca : null)), ha)];
        return ia;
    }, _renderCounter: function (v, w) {
        var x = v > 0, y = (("count") + (' ' + "_5aff") + (!x ? ' ' + "hidden_elem" : '') + (w ? ' ' + "mlm" : ''));
        return (m.createElement(m.DOM.span, {className: y}, m.createElement(m.DOM.span, {className: "countValue fss"}, v <= 20 ? v : '20+')));
    }});
    e.exports = u;
}, null);
__d("LeftNavItemPlaceholder.react", ["React", "cx"], function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i = g.createClass({displayName: 'LeftNavItemPlaceholder', render: function () {
        return (g.createElement(g.DOM.li, {className: "sideNavItem stat_elem"}, g.createElement(g.DOM.a, {className: "_5afe clearfix sortableItem"})));
    }});
    e.exports = i;
}, null);
__d("LeftNavSection.react", ["Arbiter", "Bootloader", "DOMDimensions", "React", "Link.react", "LeftRight.react", "InlineBlock.react", "LeftNavItem.react", "LeftNavItemPlaceholder.react", "ReactLayeredComponentMixin", "cx", "DOMQuery", "Draggable", "Droppable", "fbt", "Run", "Style", "LeftNavConfig"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
    "use strict";
    var y = null, z = j.createClass({displayName: 'LeftNavSection', mixins: [p], getDefaultProps: function () {
        return {sortable: false};
    }, getInitialState: function () {
        return {dragged: false, inEditMode: false, glowingType: null, draggableBound: null, placeholderIdx: -1};
    }, renderLayers: function () {
        var aa = this.props.id === 'bookmarksSeeAllEntSection';
        if (aa)return {dragNUX: null};
        if (!y)v.onLoad(function () {
            h.loadModules(["LeftNavDragNUX.react"], function (da) {
                if (!y)y = da;
                setTimeout(this.forceUpdate.bind(this), 0);
            }.bind(this));
        }.bind(this));
        var ba = this.state.glowingType, ca = null;
        if (ba === 'add' || ba === 'sort')if (y)ca = j.createElement(y, {contextRef: "sectionBody", nuxType: ba, position: "above", alignment: "center"});
        return {dragNUX: ca};
    }, render: function () {
        var aa = this, ba = this.props.model, ca = ba.items, da = this.props.selectedKey, ea = this.props.loadingKey, fa = this.state.inEditMode, ga = this.state.draggableBound, ha = x.gkResults.left_nav_drag_to_favorite === 1;
        if (ca.length === 0)return null;
        var ia = 1, ja = ca.map(function (pa) {
            return (j.createElement(n, {key: pa.id, model: pa, section: aa, selectedKey: da, loadingKey: ea, inEditMode: fa, draggableBound: ga, rank: ia++}));
        });
        if (this.state.placeholderIdx >= 0)ja.splice(this.state.placeholderIdx, 0, j.createElement(o, {key: "itemplaceholder", ref: "placeholder"}));
        var ka = this.state.glowingType, la = (("homeSideNav") + (ka === 'add' ? ' ' + "_1492" : '') + (ka === 'sort' ? ' ' + "_1493" : '') + (ka === 'remove' ? ' ' + "_1494" : '')), ma = (("_bui") + (this._isPinnedSection() ? ' ' + "droppableNav" : '') + (!this._isPinnedSection() ? ' ' + "nonDroppableNav" : '') + (' ' + "_3-8w") + (!fa ? ' ' + "_3-96" : '')), na = this._isPinnedSection() && !ha ? j.createElement(j.DOM.div, {className: "_3hge stat_elem"}, j.createElement(k, {className: "navEditDone", onClick: function () {
            g.inform('LeftNavDragController/toggleEditMode', {section: aa});
        }}, j.createElement(j.DOM.span, {className: "_3hgf"}, "\u0413\u043e\u0442\u043e\u0432\u043e"))) : null, oa = {nav_items_count: ca.length.toString(), nav_section: this.props.id.toString(), bm_sec: this.props.id.toString()};
        return (j.createElement(j.DOM.div, {id: this.props.id, className: la, 'data-ft': ba.dataft, ref: "sectionBody"}, this._renderHeader(), j.createElement(j.DOM.ul, {className: ma, 'data-gt': JSON.stringify(oa), 'data-ft': ba.dataft}, ja), na));
    }, _renderHeader: function () {
        var aa = this.props.model, ba;
        if (aa.title) {
            var ca = this.props.showPersistentMoreLink ? "_1cwg _1m1v _5ol3" : "_1cwg _5ol3", da = aa.seeallhref ? j.createElement(k, {href: aa.seeallhref}, j.createElement(l, null, j.createElement(j.DOM.span, {className: "sectionDragHandle"}, aa.title), aa.remainingcount && !this.state.dragged ? j.createElement(m, {className: "_3-91"}, j.createElement(j.DOM.div, {className: ca}, aa.seealltext)) : null)) : j.createElement(j.DOM.span, {className: "sectionDragHandle"}, aa.title);
            ba = j.createElement(j.DOM.h4, {className: "navHeader"}, da);
        } else ba = null;
        return ba;
    }, componentDidMount: function () {
        var aa = this._isPinnedSection(), ba = x.gkResults.left_nav_custom_section_ranking === 1;
        if (ba && this.props.sortable)this._mountDraggable();
    }, componentDidUpdate: function () {
        this._updatePinnedSectionBound();
    }, componentWillUnmount: function () {
        this._unmountDraggable();
    }, _updatePinnedSectionBound: function () {
        if (this._isPinnedSection())g.inform('LeftNavDragController/updatePinnedSectionBound');
    }, _mountDraggable: function () {
        var aa = 'leftNavSection', ba = this, ca = this.getDOMNode(), da = r.scry(ca, '.sectionDragHandle')[0];
        if (!da)return;
        this._draggable = (new s(ca)).setNamespace(aa).setUseAbsolute(true).setGutter(15).addHandle(da).setGrabHandler(function () {
            ba.setState({dragged: true});
            var ea = i.getElementDimensions(ca);
            w.apply(ca, {'z-index': 1024, width: ea.width + 'px', height: ea.height + 'px'});
            g.inform('LeftNavDragController/onSectionDraggableGrab', ba);
        }).setDropHandler(function () {
            ba.setState({dragged: false});
            w.apply(ca, {'z-index': null, width: null, height: null});
            this.resetPosition();
            g.inform('LeftNavDragController/onSectionDraggableDrop');
        });
        this._droppable = (new t(ca)).setNamespace(aa).setDragOverHandler(function () {
            g.inform('LeftNavDragController/onSectionDroppableDragOver', {targetSectionID: ba.props.id});
        });
    }, _unmountDraggable: function () {
        if (this._draggable)this._draggable.destroy();
        if (this._droppable)this._droppable.destroy();
    }, _isPinnedSection: function () {
        return this.props.id === 'pinnedNav';
    }});
    e.exports = z;
}, null);
__d("LeftNavSectionPlaceholder.react", ["React", "cx"], function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i = g.createClass({displayName: 'LeftNavSectionPlaceholder', render: function () {
        var j = {height: this.props.height + 'px', width: this.props.width + 'px'};
        return (g.createElement(g.DOM.div, {className: "homeSideNav", style: j}, g.createElement(g.DOM.ul, {className: "_bui"})));
    }});
    e.exports = i;
}, null);
__d("LeftNavContainer.react", ["invariant", "LeftNavSection.react", "LeftNavSectionPlaceholder.react", "React"], function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    var k = j.createClass({displayName: 'LeftNavContainer', getInitialState: function () {
        return {placeholderIdx: -1, placeholderWidth: 0, placeholderHeight: 0};
    }, render: function () {
        var l = this.props.model, m = j.createElement(h, {selectedKey: l.selectedKey, loadingKey: l.loadingKey, model: l.pinnedSection, key: "pinnedNav", id: "pinnedNav", ref: "pinnedNav"}), n = l.sections, o = n.map(function (p) {
            return j.createElement(h, {selectedKey: l.selectedKey, loadingKey: l.loadingKey, model: p, showPersistentMoreLink: l.showPersistentMoreLink, key: p.id, id: p.id, sortable: true});
        });
        if (this.state.placeholderIdx > -1)o.splice(this.state.placeholderIdx, 0, j.createElement(i, {key: "placeholder", width: this.state.placeholderWidth, height: this.state.placeholderHeight}));
        return (j.createElement(j.DOM.div, null, m, o));
    }, getPinnedSection: function () {
        var l = this.refs.pinnedNav;
        g(l);
        return l;
    }});
    e.exports = k;
}, null);
__d("LeftNavDragController", ["Arbiter", "CSS", "cx", "DOMDimensions", "DOMQuery", "invariant", "Rect", "Style", "SubscriptionsHandler", "Vector"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    "use strict";
    var q;

    function r(s, t) {
        l(!q);
        q = this;
        this.$LeftNavDragController0 = s;
        this.$LeftNavDragController1 = t;
        this.$LeftNavDragController2();
        this.$LeftNavDragController3 = null;
        this.$LeftNavDragController4 = false;
        this.$LeftNavDragController5 = new o();
        this.$LeftNavDragController5.addSubscriptions(g.subscribe('LeftNavDragController/updatePinnedSectionBound', this.$LeftNavDragController2.bind(this)), g.subscribe('LeftNavDragController/toggleEditMode', this.$LeftNavDragController6.bind(this)), g.subscribe('LeftNavDragController/onItemEditDraggableGrab', this.$LeftNavDragController7.bind(this)), g.subscribe('LeftNavDragController/onItemEditDraggableDrop', this.$LeftNavDragController8.bind(this)), g.subscribe('LeftNavDragController/onItemEditDroppableDragOver', this.$LeftNavDragController9.bind(this)), g.subscribe('LeftNavDragController/onItemDraggableGrab', this.$LeftNavDragControllera.bind(this)), g.subscribe('LeftNavDragController/onItemDraggableDrag', this.$LeftNavDragControllerb.bind(this)), g.subscribe('LeftNavDragController/onItemDraggableDrop', this.$LeftNavDragControllerc.bind(this)), g.subscribe('LeftNavDragController/onItemDroppableDragOver', this.$LeftNavDragControllerd.bind(this)));
    }

    r.prototype.destroy = function () {
        this.$LeftNavDragController5.release();
        q = null;
    };
    r.prototype.$LeftNavDragController2 = function () {
        this.$LeftNavDragControllere = this.$LeftNavDragControllerf(false);
    };
    r.prototype.$LeftNavDragControllera = function (s, t) {
        var u = t, v = u.section, w = u.draggable, x = u.dragContainer, y = u.isDraggedItemPinned;
        if (!this.$LeftNavDragControllere) {
            w.killDrag();
            n.set(w.dom, 'width', '');
            w.resetPosition();
            return;
        }
        var z = this.$LeftNavDragController1.getPinnedSection();
        this.$LeftNavDragController3 = x;
        h.addClass(this.$LeftNavDragController0, 'draggingMode');
        if (y) {
            var aa = this.$LeftNavDragControllerg(v, w);
            z.setState({placeholderIdx: aa, glowingType: 'sort'});
        } else z.setState({glowingType: 'add'});
    };
    r.prototype.$LeftNavDragControllerb = function (s, t) {
        var u = t.vector, v = t.dragContainer, w = t.isDraggedItemPinned, x = this.$LeftNavDragController1.getPinnedSection();
        if (this.$LeftNavDragControllerh(u)) {
            var y = x.state.placeholderIdx > -1;
            if (!y) {
                var z = x.props.model.items.findIndex(function (aa) {
                    return !aa.sortable;
                });
                x.setState({placeholderIdx: z + 1, glowingType: w ? 'sort' : 'add'});
                this.$LeftNavDragController3.setTooltip(null);
            }
        } else {
            x.setState({placeholderIdx: -1, glowingType: w ? 'remove' : 'add'});
            if (w)v.setTooltip('remove');
        }
    };
    r.prototype.$LeftNavDragControllerc = function (s, t) {
        var u = t.draggable, v = t.isDraggedItemPinned, w = this.$LeftNavDragController1.getPinnedSection(), x = u.dom.getAttribute('data-itemid');
        if (this.$LeftNavDragControllerh()) {
            var y = this.$LeftNavDragControlleri(w, x);
            if (y)g.inform('LeftNavController/updatePinnedSection', {idOrder: y});
        } else if (v)g.inform('LeftNavController/toggleFavorite', x);
        this.$LeftNavDragController3 = null;
        h.removeClass(this.$LeftNavDragController0, 'draggingMode');
        w.setState({placeholderIdx: -1, glowingType: null});
    };
    r.prototype.$LeftNavDragControllerd = function (s, t) {
        var u = t.section, v = t.draggable, w = t.targetItemID, x = h.hasClass(v.dom, 'pinnedItem'), y = u.state.placeholderIdx >= 0, z = u.props.model.items, aa = z.findIndex(function (ca) {
            return ca.id === w;
        }), ba;
        if (y) {
            ba = u.state.placeholderIdx <= aa ? aa + 1 : aa;
        } else ba = aa;
        u.setState({placeholderIdx: ba, glowingType: x ? 'sort' : 'add'});
        if (x)this.$LeftNavDragController3.setTooltip(null);
    };
    r.prototype.$LeftNavDragController6 = function (s, t) {
        var u = t.section;
        if (!u.state.inEditMode) {
            var v = this.$LeftNavDragControllerf(true);
            if (v) {
                v.l = v.r = 0;
                u.setState({draggableBound: v});
            }
        }
        h.toggleClass(this.$LeftNavDragController0, "_2ryg");
        u.setState({inEditMode: !u.state.inEditMode});
    };
    r.prototype.$LeftNavDragController7 = function (s, t) {
        var u = t.section, v = t.draggable, w = this.$LeftNavDragControllerg(u, v);
        u.setState({placeholderIdx: w});
    };
    r.prototype.$LeftNavDragController8 = function (s, t) {
        var u = t.section, v = t.draggable, w = this.$LeftNavDragControllerg(u, v), x = u.state.placeholderIdx;
        if (x !== w && x !== w + 1) {
            var y = u.props.model, z = y.items[w];
            g.inform('LeftNavController/updatePinnedSection', {idOrder: this.$LeftNavDragControlleri(u, z.id)});
        }
        u.setState({placeholderIdx: -1});
    };
    r.prototype.$LeftNavDragController9 = function (s, t) {
        var u = t.section, v = t.draggable, w = t.targetItemID, x = u.props.model, y = this.$LeftNavDragControllerg(u, v);
        if (y >= 0) {
            var z = x.items.findIndex(function (ba) {
                return ba.id === w;
            }), aa = u.state.placeholderIdx <= z ? z + 1 : z;
            u.setState({placeholderIdx: aa});
        }
    };
    r.prototype.$LeftNavDragControllerh = function (s) {
        if (s) {
            var t = this.$LeftNavDragControllere;
            this.$LeftNavDragController4 = t && s.x >= t.l && s.x <= t.r && s.y >= t.t && s.y <= t.b;
        }
        return this.$LeftNavDragController4;
    };
    r.prototype.$LeftNavDragControlleri = function (s, t) {
        if (!s)return undefined;
        var u = s.props.model.items, v = s.state.placeholderIdx, w = [];
        u.forEach(function (x, y) {
            if (y === v)w.push(t);
            if (x.sortable && x.id !== t)w.push(x.id);
        });
        if (v === u.length)w.push(t);
        return w;
    };
    r.prototype.$LeftNavDragControllerg = function (s, t) {
        var u = s.props.model, v = t.dom.getAttribute('data-itemid');
        return (u.items.findIndex(function (w) {
            return w.id.toString() === v;
        }));
    };
    r.prototype.$LeftNavDragControllerf = function (s) {
        var t = this.$LeftNavDragController1.getPinnedSection(), u = t.getDOMNode(), v = k.scry(u, 'li.sideNavItem');
        if (s)v = v.filter(function (fa) {
            return fa.getAttribute('data-sortable') === 'true';
        });
        if (v.length > 0) {
            var w = v[0], x = j.getElementDimensions(w).width, y = v[v.length - 1], z = j.getElementDimensions(y).height, aa = p.getElementPosition(w).y, ba = p.getElementPosition(y).y + z;
            if (t.state.placeholderIdx >= 0) {
                var ca = t.refs.placeholder.getDOMNode(), da = p.getElementPosition(ca), ea = j.getElementDimensions(ca);
                aa = Math.min(aa, da.y);
                ba = Math.max(ba, da.y + ea.height);
            }
            return new m(aa, p.getElementPosition(w).x + x, ba, p.getElementPosition(w).x);
        } else return null;
    };
    e.exports = r;
}, null);
__d("LeftNavSectionDragController", ["Arbiter", "DOMDimensions", "invariant", "SubscriptionsHandler"], function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    var k = null;

    function l(m) {
        i(!k);
        k = this;
        this.$LeftNavSectionDragController0 = m;
        this.$LeftNavSectionDragController1 = null;
        this.$LeftNavSectionDragController2 = new j();
        this.$LeftNavSectionDragController2.addSubscriptions(g.subscribe('LeftNavDragController/onSectionDraggableGrab', this.$LeftNavSectionDragController3.bind(this)), g.subscribe('LeftNavDragController/onSectionDraggableDrop', this.$LeftNavSectionDragController4.bind(this)), g.subscribe('LeftNavDragController/onSectionDroppableDragOver', this.$LeftNavSectionDragController5.bind(this)));
    }

    l.prototype.destroy = function () {
        this.$LeftNavSectionDragController2.release();
        k = null;
    };
    l.prototype.$LeftNavSectionDragController3 = function (m, n) {
        this.$LeftNavSectionDragController1 = n;
        var o = this.$LeftNavSectionDragController0.props.model.sections, p = o.findIndex(function (r) {
            return r.id === n.props.id;
        }), q = h.getElementDimensions(n.getDOMNode());
        this.$LeftNavSectionDragController0.setState({placeholderIdx: p, placeholderWidth: q.width, placeholderHeight: q.height});
    };
    l.prototype.$LeftNavSectionDragController4 = function () {
        var m = this.$LeftNavSectionDragController0, n = this.$LeftNavSectionDragController1.props.id, o = m.state.placeholderIdx, p = m.props.model.sections.findIndex(function (r) {
            return r.id === n;
        });
        if (o !== p && o !== p + 1) {
            var q = this.$LeftNavSectionDragController6(n);
            g.inform('LeftNavController/updateSectionOrder', {idOrder: q});
        }
        this.$LeftNavSectionDragController1 = null;
        this.$LeftNavSectionDragController0.setState({placeholderIdx: -1, placeholderWidth: 0, placeholderHeight: 0});
    };
    l.prototype.$LeftNavSectionDragController5 = function (m, n) {
        var o = n.targetSectionID, p = this.$LeftNavSectionDragController0, q = p.props.model.sections, r = p.state.placeholderIdx >= 0, s = q.findIndex(function (u) {
            return u.id === o;
        }), t;
        if (r) {
            t = p.state.placeholderIdx <= s ? s + 1 : s;
        } else t = s;
        p.setState({placeholderIdx: t});
    };
    l.prototype.$LeftNavSectionDragController6 = function (m) {
        var n = this.$LeftNavSectionDragController0, o = n.props.model.sections, p = n.state.placeholderIdx, q = o.reduce(function (r, s, t) {
            if (t === p)r.push(m);
            if (s.id !== m)r.push(s.id);
            return r;
        }, []);
        if (p === o.length)q.push(m);
        return q;
    };
    e.exports = l;
}, null);
__d("LeftNavController", ["React", "LeftNavContainer.react", "LeftNavDragController", "LeftNavSectionDragController", "AsyncRequest", "Arbiter", "Event", "SubscriptionsHandler", "Run", "$", "copyProperties", "CSS", "cx", "debounce", "DOMDimensions", "Locale", "URI", "Vector", "NavigationMessage", "ChannelConstants"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
    "use strict";
    var aa, ba, ca, da, ea, fa, ga = null, ha, ia = {init: function (mb, nb) {
        aa = mb;
        ba = nb;
        ha = false;
        fa = new n();
        fa.addSubscriptions(m.listen(window, 'resize', t(ka, 200)), l.subscribe('LeftNavController/toggleFavorite', ya), l.subscribe('LeftNavController/updatePinnedSection', za), l.subscribe('LeftNavController/setItemCount', function (pb, qb) {
            var rb = qb.item, sb = qb.count;
            return na(rb, sb);
        }), l.subscribe(z.getArbiterType('nav_update_counts'), oa), l.subscribeOnce('AsyncLayout/initialized', function () {
            return ha = true;
        }), l.subscribe(y.NAVIGATION_ITEM_REMOVED, pa), l.subscribe(y.NAVIGATION_COMPLETED, va), l.subscribe(y.NAVIGATION_FAILED, wa), l.subscribe(y.NAVIGATION_COUNT_UPDATE, xa), l.subscribe(y.NAVIGATION_SELECT, ua), l.subscribe('LeftNavController/updateSectionOrder', ab));
        var ob = hb(ba.selectedKey);
        if (ob)ob.count = 0;
        ca = g.renderComponent(g.createElement(h, {model: ba}), aa);
        ka();
        da = new i(aa, ca);
        ea = new j(ca);
        o.onLeave(this.uninstall.bind(this));
    }, uninstall: function () {
        ha = false;
        fa.release();
        da.destroy();
        ea.destroy();
    }, initPageTransitions: function (mb) {
        mb.registerHandler(function (nb) {
            return ha && qa(nb);
        }, 6);
    }, mountSeeAllPayload: function (mb) {
        ga = mb;
    }};

    function ja() {
        ca.forceUpdate();
    }

    function ka() {
        if (!aa)return;
        var mb = x.getElementPosition(aa).x;
        r.conditionClass(aa, "_3evf", mb < 20 || (v.isRTL() && mb + u.getElementDimensions(aa).width < u.getElementDimensions(p('globalContainer')).width));
    }

    function la(mb) {
        ba.loadingKey = null;
        ba.selectedKey = mb || ba.defaultKey;
        ja();
    }

    function ma(mb) {
        ba.loadingKey = mb;
        ja();
    }

    function na(mb, nb) {
        mb.count = nb;
        ja();
    }

    function oa(mb, nb) {
        var ob = nb.obj, pb = ob.items;
        pb.forEach(function (qb) {
            var rb = hb(qb.key);
            if (rb)rb.count = rb.count + qb.count;
        });
        ja();
    }

    function pa(mb, nb) {
        var ob;

        function pb(rb, sb) {
            return rb.keys.some(function (tb) {
                return tb === sb;
            });
        }

        for (var qb = 0; qb < ba.sections.length; qb++) {
            ob = kb(ba.sections[qb].items, function (rb) {
                return pb(rb, nb);
            });
            if (ob)break;
        }
        kb(ba.pinnedSection.items, function (rb) {
            return pb(rb, nb);
        });
        ja();
    }

    function qa(mb) {
        var nb = ib(mb);
        return nb && nb.endpoint && ra(nb, mb);
    }

    function ra(mb, nb) {
        ma(mb.keys[0]);
        na(mb, 0);
        ta(mb.endpoint, q(sa(mb, nb), nb.getQueryData()));
        return true;
    }

    function sa(mb, nb) {
        var ob = {};
        ob.sidecol = true;
        ob.path = nb.getPath();
        var pb = jb(mb.keys);
        pb = pb.text ? pb.text : pb.numeric;
        ob.sk = pb;
        ob.key = pb;
        return ob;
    }

    function ta(mb, nb) {
        nb.endpoint = mb;
        l.inform(y.NAVIGATION_BEGIN, {useAjaxPipe: true, params: nb});
    }

    function ua(mb, nb) {
        var ob = nb.sk;
        if (nb.asLoading) {
            ma(ob);
        } else la(ob);
    }

    function va(mb, nb) {
        var ob = ba.loadingKey;
        la(ob);
    }

    function wa(mb, nb) {
        ma(null);
    }

    function xa(mb, nb) {
        var ob = hb(nb && nb.key);
        if (ob)na(ob, nb.hide ? 0 : ob.count + nb.count);
    }

    function ya(mb, nb) {
        var ob = eb(nb), pb = ba.pinnedSection;
        if (!ob) {
            if (!ga)return;
            ob = ga.find(function (tb) {
                return tb.id === nb;
            });
            if (!ob)return;
            ob = q({}, ob);
            ob.pinned = true;
            pb.items.push(ob);
            new k().setURI('/ajax/bookmark/add/').setData({id: ob.keys[0]}).send();
        } else {
            var qb = db(ob);
            if (fb(nb)) {
                ob.pinned = false;
                var rb = pb.items.findIndex(function (tb) {
                    return tb.id === ob.id;
                });
                if (rb >= 0) {
                    pb.items.splice(rb, 1);
                    if (qb)qb.items.unshift(ob);
                    new k().setURI('/ajax/bookmark/delete/').setData({id: ob.keys[0]}).send();
                }
            } else {
                ob.pinned = true;
                var sb = qb.items.findIndex(function (tb) {
                    return tb.id === ob.id;
                });
                if (qb && sb >= 0) {
                    qb.items.splice(sb, 1);
                    pb.items.push(ob);
                    new k().setURI('/ajax/bookmark/add/').setData({id: ob.keys[0]}).send();
                }
            }
        }
        ja();
    }

    function za(mb, nb) {
        var ob = nb.idOrder, pb = ba.pinnedSection, qb = pb.items.filter(function (sb) {
            return !sb.sortable;
        });
        ob.forEach(function (sb) {
            var tb = pb.items.find(function (vb) {
                return vb.id === sb;
            });
            if (tb) {
                qb.push(tb);
            } else if (tb = eb(sb)) {
                var ub = db(tb);
                kb(ub.items, function (vb) {
                    return vb.id === tb.id;
                });
                qb.push(tb);
                tb.pinned = true;
            }
        });
        pb.items = qb;
        var rb = qb.map(function (sb) {
            return sb.keys[0];
        });
        new k().setURI('/ajax/bookmark/edit/').setData({ids: rb}).send();
        ja();
    }

    function ab(mb, nb) {
        var ob = nb.idOrder, pb = ba.sections;
        ba.sections = ob.reduce(function (qb, rb) {
            var sb = pb.find(function (tb) {
                return tb.id === rb;
            });
            if (sb)qb.push(sb);
            return qb;
        }, []);
        new k().setURI('/bookmark/section/edit/').setData({nav_section_names: ob}).send();
        ja();
    }

    function bb(mb) {
        var nb = w.getRequestURI();
        return ((mb.getDomain() === nb.getDomain()) && (mb.getPath() === '/' || mb.getPath() === '/home.php'));
    }

    function cb(mb) {
        if (mb === 'pinnedNav') {
            return ba.pinnedSection;
        } else return (ba.sections.filter(function (nb) {
            return nb.id === mb;
        })[0]);
    }

    function db(mb) {
        return cb(lb[mb.type]);
    }

    function eb(mb) {
        mb = mb.toString();
        return gb(function (nb) {
            return nb.id.toString() === mb;
        });
    }

    function fb(mb) {
        mb = mb.toString();
        var nb = cb('pinnedNav');
        return nb.items.some(function (ob) {
            return ob.id.toString() === mb;
        });
    }

    function gb(mb) {
        for (var nb = 0; nb < ba.sections.length; nb++) {
            var ob = ba.sections[nb].items.find(mb);
            if (ob)return ob;
        }
        return ba.pinnedSection.items.find(mb);
    }

    function hb(mb) {
        return gb(function (nb) {
            return nb.keys.some(function (ob) {
                return ob === mb;
            });
        });
    }

    function ib(mb) {
        var nb = mb.getQueryData().sk;
        if (nb) {
            return hb(nb);
        } else if (bb(mb)) {
            return hb(ba.defaultKey);
        } else return gb(function (ob) {
            return ob.path && ob.path.some(function (pb) {
                return pb === mb.getPath();
            });
        });
    }

    function jb(mb) {
        var nb = /^(app|group|fl)_/, ob = {};
        for (var pb = 0; pb < mb.length; pb++) {
            var qb = nb.test(mb[pb]);
            if (qb && !ob.numeric) {
                ob.numeric = mb[pb];
            } else if (!qb && !ob.text)ob.text = mb[pb];
            if (ob.numeric && ob.text)break;
        }
        return ob;
    }

    function kb(mb, nb) {
        for (var ob = 0; ob < mb.length; ob++)if (nb(mb[ob])) {
            var pb = mb[ob];
            mb.splice(ob, 1);
            return pb;
        }
        return undefined;
    }

    var lb = {favorites: 'pinnedNav', profiles: 'pinnedNav', company: 'companyNav', apps: 'appsNav', groups: 'groupsNav', pages: 'pagesNav', lists: 'listsNav', interests: 'interestsNav', connect_apps: 'connectNav', type_user: 'pinnedNav', type_group: 'groupsNav', type_company: 'companyNav', type_page: 'pagesNav', type_friend_list: 'listsNav', type_interest_list: 'interestsNav', type_non_canvas_app: 'appsNav', type_facebook_app: 'appsNav', type_canvas_app_game: 'appsNav', type_canvas_app_non_game: 'appsNav', type_curated_feed: 'interestsNav', type_game_tool: 'appsNav', type_page_tool: 'pagesNav', type_pinnable_page_tool: 'pagesNav', type_developer: 'developerNav', type_developer_tool: 'developerNav'};
    e.exports = ia;
}, null);
__d("BanzaiNectar", ["Banzai"], function (a, b, c, d, e, f, g) {
    function h(j) {
        return {log: function (k, l, m) {
            var n = {e: l, a: m};
            g.post('nectar:' + k, n, j);
        }};
    }

    var i = h();
    i.create = h;
    e.exports = i;
}, null);
__d("VideoAutoplayPlayButton", ["CSS", "Event", "cx"], function (a, b, c, d, e, f, g, h, i) {
    var j = {}, k = {getClicked: function (l) {
        if (j.hasOwnProperty(l))return j[l].clicked;
        return false;
    }, register: function (l, m, n) {
        j[l] = h.listen(m, 'click', function () {
            g.removeClass(m, "_5vos");
            g.show(n);
            j[l].clicked = true;
        });
    }, unregister: function (l) {
        if (j.hasOwnProperty(l))j[l].remove();
    }};
    e.exports = k;
}, null);