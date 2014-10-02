/*!CK:1286622985!*//*1412036411,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["rJafB"]);
}

__d("TagExpansionButtonConfig", [], function (a, b, c, d, e, f) {
    e.exports = {FRIENDS_OF_TAGGED: "friends_of_tagged", TAGGED_ONLY: "tagged_only"};
}, null);
__d("InstanceProxy", [], function (a, b, c, d, e, f) {
    function g(h) {
        "use strict";
        this.$InstanceProxy0 = h;
    }

    g.prototype.getInstance = function () {
        "use strict";
        return this.$InstanceProxy0;
    };
    e.exports = g;
}, null);
__d("MetaComposerEdDialog", ["ARIA", "Animation", "Arbiter", "AsyncRequest", "DOM", "Ease", "Parent", "SelectorDeprecated", "Vector", "copyProperties", "getElementText"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = null;

    function s(t) {
        this._dialog = t.dialog;
        this.config = t;
        this._init();
    }

    s.init = function (t) {
        if (r) {
            r.config.show_audience = t.show_audience;
            t.dialog.destroy();
            return;
        }
        r = new s(t);
    };
    p(s.prototype, {_init: function () {
        i.subscribe('ComposerXStatusAttachment/ready', function () {
            if (this.config.show_audience) {
                this._sendEducationRequest({}, '/ajax/composer/audience/education', this._handlerCustomDuration.bind(this, 6000));
                this.config.show_audience = false;
            }
        }.bind(this));
        if (this.config.show_sticky)i.subscribe('composer/mutate', function (t, u) {
            this._sendEducationRequest({sticky_num: this.config.n_sticky_shown}, '/ajax/composer/audience/sticky_education');
        }.bind(this));
        if (this.config.show_tags)i.subscribe('SelectedPrivacyOption/changed', function (t, u) {
            this._sendEducationRequest({ids: u.tags, from: 'WithTagger', hasEvent: u.hasEvent, type: u.privacy, tag_num: this.config.n_tag_shown}, '/ajax/composer/audience/tag_education', this._handler.bind(this));
        }.bind(this));
        n.subscribe('open', this._killAnim.bind(this));
    }, _sendEducationRequest: function (t, u, v) {
        if (!this._updateDialogContext())return;
        this._async && this._async.abort();
        this._async = new j(u);
        this._async.setData(t).setHandler(v).send();
    }, _updateDialogContext: function () {
        var t = k.scry(document.body, 'div.composerAudienceWrapper'), u, v;
        for (var w = 0; w < t.length; w++) {
            u = t[w];
            v = o.getElementPosition(u);
            if (u && v.x > 0 && v.y > 0) {
                this._dialog.setContext(u);
                return true;
            }
        }
        return false;
    }, _handler: function (t) {
        this._handlerCustomDuration(1500, t);
    }, _handlerCustomDuration: function (t, u) {
        var v = u.payload;
        if (!v || !this._updateDialogContext())return;
        var w = this._dialog.getContent().firstChild;
        k.setContent(w, v);
        g.announce(q(w));
        this._dialog.show();
        var x = m.byClass(w, 'metaComposerUserEd');
        if (this._anim) {
            this._anim.stop();
            this._anim = new h(x);
        } else this._anim = new h(x).from('opacity', 0);
        this._anim.to('opacity', 1).ease(l.sineOut).checkpoint().duration(t).checkpoint().to('opacity', 0).ease(l.sineOut).checkpoint().ondone(this._killAnim.bind(this)).go();
    }, _killAnim: function (t, u) {
        if (this._anim) {
            this._dialog.hide();
            this._anim.stop();
            this._anim = null;
        }
    }});
    e.exports = s;
}, null);
__d("PrivacySelectorOptionNew", ["CSS", "DOM", "DOMQuery", "JSXDOM", "MenuSelectableItem", "PrivacyConst", "csx", "cx", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    for (var p in k)if (k.hasOwnProperty(p))r[p] = k[p];
    var q = k === null ? null : k.prototype;
    r.prototype = Object.create(q);
    r.prototype.constructor = r;
    r.__superConstructor__ = k;
    function r(s) {
        "use strict";
        k.call(this, s);
        this.updateAfterTagExpansion(this._data.hasTags);
    }

    r.prototype.getTooltip = function () {
        "use strict";
        return this._data.tooltip;
    };
    r.prototype.getPostParam = function () {
        "use strict";
        return this._data.postParam;
    };
    r.prototype.getTriggerIcon = function () {
        "use strict";
        return this._data.triggerIcon;
    };
    r.prototype.isPublic = function () {
        "use strict";
        return this.getPostParam() === l.PostParam.EVERYONE;
    };
    r.prototype.isFriends = function () {
        "use strict";
        return this.getPostParam() === l.PostParam.FRIENDS;
    };
    r.prototype.isBasicOption = function () {
        "use strict";
        return true;
    };
    r.prototype.isCustomOption = function () {
        "use strict";
        return false;
    };
    r.prototype.getTagExpansionBehavior = function () {
        "use strict";
        return this._data.tagExpansionBehavior;
    };
    r.prototype.getBaseValue = function () {
        "use strict";
        return this._data.baseValue;
    };
    r.prototype.getIndex = function () {
        "use strict";
        return this._data.value;
    };
    r.prototype.getLoggingEventName = function () {
        "use strict";
        switch (this.getPostParam()) {
            case l.PostParam.FRIENDS:
                return 'click_friends';
            case l.PostParam.EVERYONE:
                return 'click_everyone';
            case l.PostParam.ONLY_ME:
                return 'click_only_me';
            case l.PostParam.FRIENDS_MINUS_ACQUAINTANCES:
                return 'click_friends_except_acquaintances';
            case l.PostParam.FB_ONLY:
                return 'click_fb_only';
            default:
                return 'click_other';
        }
    };
    r.prototype.updateAfterTagExpansion = function (s) {
        "use strict";
        var t = this._data.baseLabel;
        if (s && this._data.showPlusOnTagExpansion)t = o._("{privacyLabel} (+)", [o.param("privacyLabel", this._data.baseLabel)]);
        this._setLabel(t);
        if (s) {
            this._setSubtitle(this._data.optionSubtitleWithTags);
        } else this._setSubtitle(this._data.optionSubtitle);
    };
    r.prototype.isBelowFold = function () {
        "use strict";
        var s = g.hasClass(this.getRoot(), "_3ey_");
        return s;
    };
    r.prototype._setLabel = function (s) {
        "use strict";
        if (!s)return;
        var t = i.find(this.getRoot(), "._54nh");
        t && h.setContent(t, s);
        this._data.label = s;
    };
    r.prototype._setSubtitle = function (s) {
        "use strict";
        if (!s)return;
        var t = i.find(this.getRoot(), "._48u1");
        t && h.setContent(t, s);
    };
    r.prototype.render = function () {
        "use strict";
        var s = q.render.call(this);
        if (!this._data.isPrimaryOption)return s;
        var t = i.find(s, "._54nc");
        t && g.addClass(t, "_48t_");
        var u = h.find(s, "._54nh");
        u && g.addClass(u, "_48u0");
        var v = j.div({className: "_48u1"}, this._data.optionSubtitle);
        h.appendContent(t, v);
        return s;
    };
    e.exports = r;
}, null);
__d("XPrivacySelectorLoggingControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/privacy\/selector\/log\/", {event: {type: "Enum", required: true}, render_location: {type: "Int", required: true}, content_type: {type: "String", required: true}});
}, null);
__d("PrivacySelectorCustomOption", ["AsyncDialog", "AsyncRequest", "DataStore", "PrivacySelectorOptionNew", "XPrivacySelectorLoggingControllerURIBuilder", "XPrivacyCustomDialogControllerURIBuilder"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    for (var m in j)if (j.hasOwnProperty(m))o[m] = j[m];
    var n = j === null ? null : j.prototype;
    o.prototype = Object.create(n);
    o.prototype.constructor = o;
    o.__superConstructor__ = j;
    function o(p) {
        "use strict";
        j.call(this, p);
    }

    o.prototype.isBasicOption = function () {
        "use strict";
        return false;
    };
    o.prototype.isCustomOption = function () {
        "use strict";
        return true;
    };
    o.prototype.getSelector = function () {
        "use strict";
        return this._selector;
    };
    o.prototype.setPostParam = function (p) {
        "use strict";
        this._data.postParam = p;
    };
    o.prototype.getLoggingEventName = function () {
        "use strict";
        return 'click_custom';
    };
    o.prototype.openDialog = function (p) {
        "use strict";
        if (typeof this._selector === 'undefined')this._selector = p;
        i.set(this._data.id, 'PrivacySelectorCustomOption', this);
        var q = new l().setString('option_id', this._data.id).setString('id', this._data.privacyfbid.toString()).setString('post_param', p.getPostParam()).setString('content_type', p.getContentType()).setInt('render_location', p.getRenderLocation()).setIntVector('tags', p.getTags()).setBool('autosave', this._data.autosave).setBool('limit_community', this._data.limitcommunity).setBool('limit_facebook', this._data.limitfacebook).setBool('limit_fof', this._data.limitfof).setBool('limit_tagexpand', this._data.limittagexpand).setBool('is_new_privacy_selector', true).setString('tag_expansion_button', p.getTagExpansionButton()).getURI(), r = new h(q);
        r.setRelativeTo(p.getTriggerButtonElement());
        g.send(r, function (s) {
            var t = function (u) {
                var v = new k().setEnum('event', u).setInt('render_location', document.getElementsByName('render_location')[0].value).setString('content_type', document.getElementsByName('content_type')[0].value).getURI();
                new h().setURI(v).send();
            };
            s.subscribe('hide', function () {
                p.inform('custom/hide');
                p.inform('selectorFinished');
            });
            s.subscribe('success', function () {
                p.inform('custom/success');
                t('custom_save');
            });
            s.subscribe('cancel', function () {
                p.inform('custom/cancel');
                t('custom_cancel');
            });
        });
    };
    o.customPrivacySave = function (p, q, r) {
        "use strict";
        var s = i.get(p, 'PrivacySelectorCustomOption');
        s.getSelector().updateDataForItemIndex(s.getIndex(), q, r);
        s.getSelector().setValue(s.getIndex());
        i.remove(p, 'PrivacySelectorCustomOption');
    };
    e.exports = o;
}, null);
__d("PrivacySelectableMenu", ["AsyncRequest", "CSS", "Ease", "PrivacySelectorCustomOption", "PrivacySelectorOptionNew", "SelectableMenu", "SelectableMenuUtils", "XPrivacySelectorLoggingControllerURIBuilder", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    for (var p in l)if (l.hasOwnProperty(p))r[p] = l[p];
    var q = l === null ? null : l.prototype;
    r.prototype = Object.create(q);
    r.prototype.constructor = r;
    r.__superConstructor__ = l;
    function r(s, t) {
        "use strict";
        l.call(this, s, t);
    }

    r.prototype.getItemForIndex = function (s) {
        "use strict";
        for (var t = 0; t < this._items.length; t++) {
            var u = this._items[t];
            if (u instanceof k && u.getIndex() == s)return u;
        }
        return null;
    };
    r.prototype.selectOption = function (s) {
        "use strict";
        var t = null, u = this._items.some(function (v) {
            if (v instanceof k && !v.isCustomOption() && v.getPostParam() == s) {
                this.setValue(v.getIndex());
                return true;
            }
            if (v instanceof j) {
                t = v;
                return false;
            }
            if (this._isMoreOption(v)) {
                this.expandMenu();
                return false;
            }
        }, this);
        if (!u && t) {
            t.setPostParam(s);
            this.setValue(t.getIndex());
        }
    };
    r.prototype._isMoreOption = function (s) {
        "use strict";
        return h.hasClass(s.getRoot(), "_po2");
    };
    r.prototype._handleItemClick = function (s, t) {
        "use strict";
        if (!m.doesItemSupportSelect(s))return q._handleItemClick.call(this, s, t);
        if (this._isMoreOption(s)) {
            this._logMoreClick();
            this.expandMenu();
            return;
        }
        this._logOptionClick(s);
        var u = this.inform('itemclick', {item: s, event: t});
        if (u)return;
        if (!m.isSelected(s) && !s.isCustomOption() && s.select() !== false) {
            this._items.forEach(function (v) {
                if (m.isSelected(v) && v !== s)v.deselect();
            });
            this.inform('change', this.getSelection());
        }
        this.done();
        return s.handleClick();
    };
    r.prototype._logMoreClick = function () {
        "use strict";
        var s = new n().setEnum('event', 'more_options').setInt('render_location', this._config.renderlocation).setString('content_type', this._config.contenttype).getURI();
        new g().setURI(s).send();
    };
    r.prototype._logOptionClick = function (s) {
        "use strict";
        var t = new n().setEnum('event', s.getLoggingEventName()).setInt('render_location', this._config.renderlocation).setString('content_type', this._config.contenttype).getURI();
        new g().setURI(t).send();
    };
    r.prototype.expandMenu = function () {
        "use strict";
        h.removeClass(this.getRoot(), "_po3");
        h.addClass(this.getRoot(), "_po4");
    };
    r.prototype.collapseMenu = function () {
        "use strict";
        h.removeClass(this.getRoot(), "_po4");
        h.addClass(this.getRoot(), "_po3");
    };
    r.prototype.updateOptionsAfterTagExpansion = function (s) {
        "use strict";
        this.forEachItem(function (t) {
            if (t instanceof k)t.updateAfterTagExpansion(s);
        });
    };
    r.prototype.onPopoverOpen = function (s) {
        "use strict";
        if (s.isBelowFold()) {
            this.expandMenu();
        } else this.collapseMenu();
        if (this._items.indexOf(s) >= 15)setTimeout(function () {
            this._scrollableArea.scrollToBottom(true, {duration: 1000, ease: i.sineOut});
        }.bind(this), 250);
    };
    e.exports = r;
}, null);
__d("PopoverButton", ["DOM", "DOMQuery", "csx"], function (a, b, c, d, e, f, g, h, i) {
    var j = {setLabel: function (k, l) {
        var m = h.find(k, "._55pe"), n = m.childNodes;
        for (var o = 0; o < n.length; o++)if (h.isTextNode(n[o])) {
            g.replace(n[o], l);
            return;
        }
        g.appendContent(m, l);
    }};
    e.exports = j;
}, null);
__d("PrivacySelectorNewDispatcher", ["Dispatcher", "copyProperties", "merge"], function (a, b, c, d, e, f, g, h, i) {
    var j = 'selector', k = h(new g(), {handleUpdateFromSelector: function (l) {
        this.dispatch(i({payloadSource: j}, l));
    }});
    e.exports = k;
}, null);
__d("PrivacySelectorDataStore", ["ArbiterMixin", "merge", "PrivacySelectorNewDispatcher", "KeyedCallbackManager"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = new j(), l = h(g, {get: function (m, n) {
        k.executeOrEnqueue(m, n);
    }, hasValueChanged: function (m) {
        return !!k.getResource(m);
    }});
    i.register(function (m) {
        if (m.selector_type) {
            var n = {};
            n[m.selector_type] = {post_param: m.post_param, unique_id: m.unique_id};
            k.addResourcesAndExecute(n);
            l.inform('change');
        }
    });
    e.exports = l;
}, null);
__d("XPrivacySelectorUpdateControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/privacy\/selector\/update\/", {privacy_fbid: {type: "Int", required: true}, post_param: {type: "String", required: true}, tags: {type: "IntVector"}, render_location: {type: "Int", required: true}, is_saved_on_select: {type: "Bool"}, should_return_tooltip: {type: "Bool"}, prefix_tooltip_with_app_privacy: {type: "Bool"}, ent_id: {type: "Int", required: true}, tag_expansion_button: {type: "String"}});
}, null);
__d("PrivacySelectorBase", ["ArbiterMixin", "AsyncRequest", "Button", "CurrentUser", "Input", "MenuSelectableItem", "PopoverButton", "PopoverLoadingMenu", "DataStore", "PrivacySelectorNewDispatcher", "PrivacySelectorDataStore", "PrivacySelectableMenu", "TagExpansionButtonConfig", "Tooltip", "XPrivacySelectorLoggingControllerURIBuilder", "XPrivacySelectorUpdateControllerURIBuilder", "bind", "fbt", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    var z = y(g);
    for (var aa in z)if (z.hasOwnProperty(aa))ca[aa] = z[aa];
    var ba = z === null ? null : z.prototype;
    ca.prototype = Object.create(ba);
    ca.prototype.constructor = ca;
    ca.__superConstructor__ = z;
    function ca(da, ea, fa, ga, ha, ia) {
        "use strict";
        o.set(da, 'selector', this);
        this._root = da;
        this._button = ea;
        this._config = ia;
        this._menu = fa;
        this._popoverMenu = ha;
        this._input = ga;
        this._isSavedOnSelect = ia.is_saved_on_select;
        this._privacyFBID = ia.privacy_fbid;
        this._contentType = ia.content_type;
        this._renderLocation = ia.render_location;
        this._supportsTagExpansion = ia.supports_tag_expansion;
        this._prefixTooltipApps = ia.should_prefix_tooltip_apps;
        this._shouldDisplayLabel = ia.should_display_label;
        this._tags = ia.tagged_uids;
        this._hasTags = this._tags.length > 0;
        this._entID = ia.ent_id;
        this._popover = this._popoverMenu.getPopover();
        this._receivingUpdate = false;
        this._initTagExpansionButtonState();
        if (ia.use_async_menu) {
            this._popoverMenu.subscribe('setMenu', function () {
                this._menu = this._popoverMenu.getMenu();
                if (!(this._menu instanceof r))return;
                this._onMenuLoad();
                this._onPopoverOpen();
                this.inform('asyncMenuLoaded');
            }.bind(this));
        } else this._onMenuLoad();
        if (ia.selector_sync_key) {
            this._selectorSyncKey = ia.selector_sync_key.toString();
            q.subscribe('change', function () {
                q.get(this._selectorSyncKey, function (ja) {
                    if (ja.unique_id !== this._menu._config.id) {
                        this._receivingUpdate = true;
                        this.selectOption(ja.post_param);
                    }
                }.bind(this));
            }.bind(this));
            this._menu.subscribe('change', function () {
                if (!this._receivingUpdate) {
                    var ja = this._getSelectedOption();
                    p.handleUpdateFromSelector({selector_type: this._selectorSyncKey, post_param: ja.getPostParam().toString(), unique_id: this._menu._config.id});
                } else this._receivingUpdate = false;
            }.bind(this));
        }
    }

    ca.prototype.getIsPublicSelected = function () {
        "use strict";
        return this._selectedOption.isPublic();
    };
    ca.prototype.getIsFriendsSelected = function () {
        "use strict";
        return this._selectedOption.isFriends();
    };
    ca.prototype.getSelectedBaseValue = function () {
        "use strict";
        return this._selectedOption.getBaseValue();
    };
    ca.prototype.setValue = function (da) {
        "use strict";
        this._menu.setValue(da);
    };
    ca.prototype.openSelectorExpanded = function (da) {
        "use strict";
        this.openSelector(function () {
            this._menu.expandMenu();
            da && da();
        }.bind(this));
    };
    ca.prototype.openSelector = function (da) {
        "use strict";
        if (this._menu instanceof n) {
            this.subscribeOnce('asyncMenuLoaded', function () {
                da && da();
            }.bind(this));
            this._popover.showLayer();
        } else {
            this._popover.showLayer();
            da && da();
        }
        this.inform('open');
    };
    ca.prototype.closeSelector = function () {
        "use strict";
        this._popover.hideLayer();
    };
    ca.prototype.getPopover = function () {
        "use strict";
        return this._popover;
    };
    ca.prototype.getTriggerButtonElement = function () {
        "use strict";
        return this._button;
    };
    ca.prototype.getMenuElement = function () {
        "use strict";
        return this._menu.getRoot();
    };
    ca.prototype.selectOption = function (da) {
        "use strict";
        if (!da)return;
        if (this._menu instanceof n) {
            this.subscribeOnce('asyncMenuLoaded', this._selectOptionImpl.bind(this, da));
            this._fetchAsyncMenu();
        } else this._selectOptionImpl(da);
    };
    ca.prototype._selectOptionImpl = function (da) {
        "use strict";
        this._menu.selectOption(da);
        this._selectedOption = this._getSelectedOption();
        this.updateDataForItemIndex(this._selectedOption.getIndex(), this._selectedOption.getPostParam().toString());
    };
    ca.prototype.setTagExpansionButton = function (da) {
        "use strict";
        this._tagExpansionButton = da;
        if (this._hasTags) {
            this._menu.updateOptionsAfterTagExpansion(this._showTagExpansion());
            this._updateTriggerButtonLabel();
            this._updateTooltipAfterChange();
        }
    };
    ca.prototype.getTagExpansionButton = function () {
        "use strict";
        return this._tagExpansionButton;
    };
    ca.prototype._initTagExpansionButtonState = function () {
        "use strict";
        this._tagExpansionButton = s.FRIENDS_OF_TAGGED;
        var da = this._getSelectedOption();
        if (!da)return;
        var ea = JSON.parse(da.getPostParam());
        if (ea.settings && ea.settings.no_tag_expansion === true) {
            this._tagExpansionButton = s.TAGGED_ONLY;
        } else this._tagExpansionButton = s.FRIENDS_OF_TAGGED;
    };
    ca.prototype._fetchAsyncMenu = function () {
        "use strict";
        if (this._config.use_async_menu)this._popoverMenu.fetchMenu();
    };
    ca.prototype._getSelectedOption = function () {
        "use strict";
        if (!(this._menu instanceof r))return;
        var da;
        this._menu.forEachItem(function (ea) {
            if (ea instanceof l && ea.isSelected())da = ea;
        }.bind(this));
        return da;
    };
    ca.prototype._onItemClick = function (da, ea) {
        "use strict";
        var fa = ea.item;
        if (fa.isBasicOption()) {
            this.updateDataForItemIndex(fa.getIndex(), fa.getPostParam().toString());
        } else if (fa.isCustomOption()) {
            this._closeForCustom = true;
            fa.openDialog(this);
        }
        this.inform('click', {customSelected: fa.isCustomOption()});
    };
    ca.prototype.getContentType = function () {
        "use strict";
        return this._contentType;
    };
    ca.prototype.getRenderLocation = function () {
        "use strict";
        return this._renderLocation;
    };
    ca.prototype.getPostParam = function () {
        "use strict";
        return this._postParam;
    };
    ca.prototype.getTags = function () {
        "use strict";
        return this._tags;
    };
    ca.prototype.updateDataForItemIndex = function (da, ea, fa) {
        "use strict";
        if (fa) {
            this._tagExpansionButton = fa;
            this.inform('CustomTagExpansion', this._tagExpansionButton);
        }
        var ga = this._menu.getItemForIndex(da);
        if (ga.isCustomOption())ga.setPostParam(ea);
        this._selectedOption = ga;
        this._postParam = ea;
        k.setValue(this._input, ea);
        this._updateTriggerButtonLabel();
        if (this._shouldUpdateTooltips()) {
            this._updateTooltipAfterChange();
        } else {
            if (this._isSavedOnSelect)this._savePrivacy();
            this._setTooltipValue(this._selectedOption.getTooltip());
        }
        this.inform('changed', {post_param: this._postParam, base_value: this.getSelectedBaseValue()});
    };
    ca.prototype._shouldUpdateTooltips = function () {
        "use strict";
        return this._prefixTooltipApps || this._supportsTagExpansion;
    };
    ca.prototype._savePrivacy = function () {
        "use strict";
        this._sendUpdateRequest();
    };
    ca.prototype._sendUpdateRequest = function () {
        "use strict";
        var da = new v().setInt('privacy_fbid', this._privacyFBID).setString('post_param', this._postParam).setIntVector('tags', this._tags).setInt('render_location', this._renderLocation).setBool('is_saved_on_select', this._isSavedOnSelect).setBool('should_return_tooltip', this._shouldUpdateTooltips()).setBool('prefix_tooltip_with_app_privacy', this._prefixTooltipApps).setInt('ent_id', this._entID).setString('tag_expansion_button', this._tagExpansionButton).getURI();
        new h().setRelativeTo(this._button).setHandler(w(this, function (ea) {
            var fa = ea && ea.payload && ea.payload.tooltip;
            fa && this._setTooltipValue(ea.payload.tooltip);
        })).setURI(da).send();
    };
    ca.prototype.informTagsChanged = function (da) {
        "use strict";
        var ea = this._getTags(da);
        if (this._hasTags === !ea.length) {
            this._hasTags = !!ea.length;
            this._menu.updateOptionsAfterTagExpansion(this._showTagExpansion());
            this._updateTriggerButtonLabel();
        }
        if (this._tags.length !== ea.length) {
            this._tags = ea;
            this._updateTooltipAfterChange();
        }
    };
    ca.prototype._showTagExpansion = function () {
        "use strict";
        return this._hasTags && (this._tagExpansionButton.valueOf() === s.FRIENDS_OF_TAGGED.valueOf());
    };
    ca.prototype._getTags = function (da) {
        "use strict";
        var ea = [], fa = j.getID();
        if (da.withTags)for (var ga = 0; ga < da.withTags.length; ga++) {
            var ha = da.withTags[ga].info;
            if (ha.uid != fa)ea.push(ha.uid);
        }
        if (da.mention)for (var ia in da.mention)if (da.mention[ia].type == 'user' && da.mention[ia].uid != fa)ea.push(da.mention[ia].uid);
        return ea;
    };
    ca.prototype._updateTriggerButtonLabel = function () {
        "use strict";
        var da = this._selectedOption.getTriggerIcon();
        i.setIcon(this._button, da.cloneNode());
        if (!this._shouldDisplayLabel)return;
        m.setLabel(this._button, this._selectedOption.getLabel());
    };
    ca.prototype._updateTooltipAfterChange = function () {
        "use strict";
        var da = "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...";
        this._setTooltipValue(da);
        this._sendUpdateRequest();
    };
    ca.prototype._setTooltipValue = function (da) {
        "use strict";
        da && t.set(this._button, da);
    };
    ca.prototype._onPopoverClose = function () {
        "use strict";
        if (!this._getSelectedOption())return;
        if (this._closeForCustom) {
            this._closeForCustom = false;
        } else this.inform('selectorFinished');
        this.inform('close');
    };
    ca.prototype._onPopoverOpen = function () {
        "use strict";
        if (!(this._menu instanceof r))return;
        this._menu.onPopoverOpen(this._getSelectedOption());
        var da = new u().setEnum('event', 'opened').setInt('render_location', this._renderLocation).setString('content_type', this._contentType).getURI();
        new h().setURI(da).send();
    };
    ca.prototype._onMenuLoad = function () {
        "use strict";
        this._menu.subscribe('itemclick', this._onItemClick.bind(this));
        this._popover.subscribe('hide', this._onPopoverClose.bind(this));
        this._popover.subscribe('show', this._onPopoverOpen.bind(this));
        this._selectedOption = this._getSelectedOption();
        if (this._selectedOption) {
            this._postParam = this._selectedOption.getPostParam().toString();
            this._hasTags && this._updateTriggerButtonLabel();
        }
    };
    e.exports = ca;
}, null);
__d("MenuStaticItem", ["DOM", "MenuItemBase", "React", "copyProperties", "cx", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    for (var m in h)if (h.hasOwnProperty(m))o[m] = h[m];
    var n = h === null ? null : h.prototype;
    o.prototype = Object.create(n);
    o.prototype.constructor = o;
    o.__superConstructor__ = h;
    function o(p) {
        "use strict";
        h.call(this);
        this._data = p;
    }

    o.prototype._renderItemContent = function () {
        "use strict";
        var p = g.create('span', {className: "_54nc _54ah"});
        if (this._data.children) {
            i.renderComponent(i.createElement(i.DOM.span, {className: "_54nh"}, this._data.children), p);
        } else g.setContent(p, g.create('span', {className: "_54nh"}, this._data.markup));
        return p;
    };
    j(o.prototype, {handleClick: l});
    e.exports = o;
}, null);