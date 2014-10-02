/*!CK:2678267222!*//*1412036014,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["2PGOY"]);
}

__d("ItunesPluginLogging", ["Run", "Bootloader"], function (a, b, c, d, e, f, g) {
    var h = {logPluginData: function () {
        g.onAfterLoad(function () {
            var i = b('Bootloader');
            i.loadModules(["ItunesDetector", "AsyncRequest"], function (j, k) {
                new k().setURI('/ajax/ads/media/log').setData({status: j.hasItunes()}).send();
            });
        });
    }};
    e.exports = h;
}, null);
__d("AppsDivebarDisplayController", ["AppsDivebarConfigData", "AsyncRequest", "Arbiter", "CSS", "UIPagelet", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = '173', n = {isVisible: function () {
        if (typeof(this._visible) != 'undefined')return this._visible;
        this._visible = !g.hidden;
        return this._visible;
    }, showApps: function () {
        this._visible = true;
        var o = {fb_source_category: 'sidebar'};
        k.loadFromEndpoint('CanvasNavigationPagelet', 'pagelet_canvas_nav_content', o);
        j.show('apps_gripper');
        j.show('pagelet_canvas_nav_content');
        j.addClass('pagelet_canvas_nav_content', "_4woj");
        i.inform('AppsDivebar/show-apps');
        new h('/ajax/feed/apps/resize').setData({height: '' + m, menu: true}).setMethod('POST').send();
    }, hideApps: function () {
        this._visible = false;
        i.inform('AppsDivebar/hide-apps');
        j.hide('pagelet_canvas_nav_content');
        j.hide('apps_gripper');
        new h('/ajax/feed/apps/resize').setData({height: '1', menu: true}).setMethod('POST').send();
    }};
    e.exports = n;
}, null);
__d("BuddyListNub", ["Arbiter", "AvailableList", "BlackbirdUpsell", "ChannelConnection", "ChannelConstants", "ChatConfig", "ChatSidebar", "ChatVisibility", "CSS", "Dock", "DOM", "Event", "HTML", "JSLogger", "JSXDOM", "KeyEventController", "Keys", "NubController", "OrderedFriendsList", "Parent", "PresencePrivacy", "PresenceStatus", "Toggler", "csx", "cx", "setTimeoutAcrossTransitions", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga) {
    var ha = 32, ia = 10, ja = t.create('buddylist_nub');
    for (var ka in x)if (x.hasOwnProperty(ka))ma[ka] = x[ka];
    var la = x === null ? null : x.prototype;
    ma.prototype = Object.create(la);
    ma.prototype.constructor = ma;
    ma.__superConstructor__ = x;
    function ma(na, oa, pa) {
        "use strict";
        x.call(this);
        la.init.call(this, na);
        this.root = na;
        this.orderedList = oa;
        this.typeahead = pa;
        this.button = q.find(na, 'a.fbNubButton');
        this.unreadCount = q.find(na, "span._5ayx");
        this.label = q.find(na, 'span.label');
        this.body = q.scry(na, 'div.fbNubFlyoutBody')[0];
        this.container = z.byClass(na, "_56ox");
        this.typeaheadContainer = q.find(na, '.fbChatTypeaheadViewContainer');
        var qa = q.find(na, 'div.fbNubFlyoutTitlebar');
        ca.createInstance(qa).setSticky(false);
        oa.subscribe('render', this.flyoutContentChanged.bind(this));
        oa.setScrollContainer(this.body);
        h.subscribe('buddylist/availability-changed', this._updateCount.bind(this));
        g.subscribe('chat/connect', this._handleConnect.bind(this));
        aa.subscribe('privacy-user-presence-changed', this._handleVisibilityChange.bind(this));
        this.message = q.find(na, "div._4mq1");
        this.warningMsgText = null;
        this.warningMsgEventListener = null;
        this.showWarningTimeout = null;
        j.subscribe(j.CONNECTED, this._handleChannelConnected.bind(this));
        j.subscribe(j.SHUTDOWN, this._handleChannelShutdown.bind(this));
        j.subscribe(j.RECONNECTING, this._handleChannelReconnecting.bind(this));
        j.subscribe([j.MUTE_WARNING, j.UNMUTE_WARNING], this._updateView.bind(this));
        this.subscribe('show', this.onShow.bind(this));
        this.subscribe('hide', this.onHide.bind(this));
        this.subscribe('resize', this.onResize.bind(this));
        r.listen(na, 'keydown', this._onKeyDown.bind(this));
        r.listen(this.button, 'click', this.onButtonClick.bind(this));
        v.registerKey('q', function (event) {
            if (this._isOpen) {
                pa.getCore().getElement().focus();
            } else {
                this.onButtonClick();
                this.show();
            }
            event.prevent();
        }.bind(this));
        pa.getCore().subscribe('escape', this.hide.bind(this));
        pa.subscribe(['respond', 'reset'], function (ra, sa) {
            if (this._isOpen) {
                if (sa && sa.value && sa.value === pa.getCore().getValue() && pa.getView().isVisible()) {
                    p.setUseMaxHeight(this.root, false);
                    this._hideBuddyList();
                } else this._showBuddyList();
                this.flyoutContentChanged();
            }
        }.bind(this));
        g.subscribe('sidebar/show', this.hide.bind(this));
        g.subscribe('minisidebar/show', this.hide.bind(this));
        g.subscribe('sidebar/hide', this._onSidebarHide.bind(this));
        this._orderedListCount = y.getList().length;
        g.inform('buddylist-nub/initialized', this, g.BEHAVIOR_PERSISTENT);
        this._handleVisibilityChange();
        ja.log('buddylist_initialized');
    }

    ma.prototype.getButton = function () {
        "use strict";
        return this.button;
    };
    ma.prototype.getRoot = function () {
        "use strict";
        return this.root;
    };
    ma.prototype._handleConnect = function (na) {
        "use strict";
        this._updateView(true);
    };
    ma.prototype._getShutdownReason = function (na) {
        "use strict";
        switch (na) {
            case k.HINT_AUTH:
                return "\u0412\u0440\u0435\u043c\u044f \u0432\u0430\u0448\u0435\u0439 \u0441\u0435\u0441\u0441\u0438\u0438 \u0438\u0441\u0442\u0435\u043a\u043b\u043e. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u043d\u043e\u0432\u044c \u0432\u044b\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0445\u043e\u0434.";
            case k.HINT_CONN:
                return ga._("{Chat} Facebook \u0432 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d.", {Chat: "\u0427\u0430\u0442"});
            case k.HINT_MAINT:
                return ga._("{Chat} Facebook \u0432 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u0437\u0430\u043a\u0440\u044b\u0442 \u043d\u0430 \u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u043e\u0435 \u043e\u0431\u0441\u043b\u0443\u0436\u0438\u0432\u0430\u043d\u0438\u0435.", {Chat: "\u0427\u0430\u0442"});
            default:
                return ga._("{Chat} Facebook \u0432 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d.", {Chat: "\u0427\u0430\u0442"});
        }
    };
    ma.prototype._getReconnectMsg = function (na) {
        "use strict";
        var oa;
        if (na === null || false === navigator.onLine) {
            oa = "\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u043a \u0447\u0430\u0442\u0443. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u0432\u043e\u0435 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043a \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u0443.";
        } else if (na > l.get('warning_countdown_threshold_msec')) {
            var pa = q.create('a', {href: '#', className: 'fbChatReconnectLink'}, "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u044c \u043f\u043e\u043f\u044b\u0442\u043a\u0443"), qa = q.create('div', null, pa), ra = qa.innerHTML;
            oa = s(ga._("\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u043a \u0447\u0430\u0442\u0443. {try-again-link}", {'try-again-link': ra}));
        } else if (na > 1000) {
            oa = ga._("\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u043a \u0447\u0430\u0442\u0443. \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0441\u044f \u0447\u0435\u0440\u0435\u0437 {seconds} \u0441\u0435\u043a...", {seconds: Math.floor(na / 1000)});
        } else oa = "\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u043a \u0447\u0430\u0442\u0443. \u041f\u043e\u0432\u0442\u043e\u0440\u043d\u043e\u0435 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435...";
        return oa;
    };
    ma.prototype._resetShowWarningTimeout = function () {
        "use strict";
        if (this.showWarningTimeout) {
            clearTimeout(this.showWarningTimeout);
            this.showWarningTimeout = null;
        }
    };
    ma.prototype._handleChannelConnected = function (na) {
        "use strict";
        this._resetShowWarningTimeout();
        if (this.orderedList.isVisible())n.goOnline();
        this.warningMsgText = null;
        this._updateView();
    };
    ma.prototype._handleChannelShutdown = function (na, oa) {
        "use strict";
        this._resetShowWarningTimeout();
        this.warningMsgText = this._getShutdownReason(oa);
        this._updateView();
    };
    ma.prototype._handleChannelReconnecting = function (na, oa) {
        "use strict";
        this._resetShowWarningTimeout();
        this.warningMsgText = this._getReconnectMsg(oa);
        if (oa > 1000) {
            if (oa > l.get('warning_countdown_threshold_msec')) {
                if (this.warningMsgEventListener) {
                    this.warningMsgEventListener.remove();
                    this.warningMsgEventListener = null;
                }
                this.warningMsgEventListener = r.listen(this.message, 'click', function (event) {
                    if (o.hasClass(event.getTarget(), 'fbChatReconnectLink')) {
                        this._tryReconnect();
                        event.kill();
                    }
                }.bind(this));
            }
            this.showWarningTimeout = fa(this._handleChannelReconnecting.bind(this, na, oa - 1000), 1000);
        }
        this._updateView();
    };
    ma.prototype._tryReconnect = function () {
        "use strict";
        if (j.disconnected())j.reconnect();
    };
    ma.prototype._handleVisibilityChange = function () {
        "use strict";
        this._updateView();
        if (i.shouldShow()) {
            if (n.hasBlackbirdEnabled()) {
                i.showBlackbirdDialog(this.getButton(), aa.getVisibility());
            } else if (!n.isOnline())i.showOfflineDialog(this.getButton());
        } else i.hide();
        if (!n.isOnline())this.hide();
    };
    ma.prototype._updateView = function (na) {
        "use strict";
        var oa = this.container;
        if (oa) {
            o.conditionClass(oa, 'offline', !n.isOnline());
            o.conditionClass(oa, 'error', j.disconnected());
        }
        if (j.disconnected())q.setContent(this.message, this.warningMsgText);
        var pa, qa;
        if (!n.isOnline()) {
            pa = ga._("{Chat} (\u041e\u0442\u043a\u043b\u044e\u0447\u0435\u043d)", {Chat: "\u0427\u0430\u0442"});
        } else if (j.disconnected()) {
            pa = ga._("{Chat} (\u041e\u0442\u043a\u043b\u044e\u0447\u0435\u043d)", {Chat: "\u0427\u0430\u0442"});
        } else {
            var ra = ba.getOnlineCount();
            if (ra) {
                pa = ga._("{Chat} {number-available}", {Chat: "\u0427\u0430\u0442", 'number-available': u.span({className: "count"}, "(", ra, ")")});
            } else {
                pa = "\u0427\u0430\u0442";
                qa = true;
            }
        }
        this._setUnread(this._unreadMessageCount);
        this._setLabel(pa, qa);
        this.buttonContentChanged();
    };
    ma.prototype.onButtonClick = function () {
        "use strict";
        this._conditionallyShowTypeahead();
        if (o.shown(this.typeahead.getElement())) {
            var na = this.subscribe('show', function () {
                this.typeahead.getCore().getElement().focus();
                i.dismiss();
            }.bind(this));
            setTimeout(this.unsubscribe.bind(this, na), 0);
        }
    };
    ma.prototype.onHide = function () {
        "use strict";
        this._isOpen = false;
        if (this._buddyListRenderSubscription) {
            this.orderedList.unsubscribe(this._buddyListRenderSubscription);
            this._buddyListRenderSubscription = null;
        }
        this._hideBuddyList();
        this.typeahead.getCore().reset();
    };
    ma.prototype._onKeyDown = function (event) {
        "use strict";
        var na = r.getKeyCode(event);
        if (na === w.ESC && !o.hasClass(this.root, 'menuOpened')) {
            this.hide();
            return false;
        } else if (na == w.RETURN)m.enable();
    };
    ma.prototype._onSidebarHide = function (event) {
        "use strict";
        this.getButton().focus();
    };
    ma.prototype.onResize = function () {
        "use strict";
        var na = p.getMaxFlyoutHeight(this.root) - 60, oa = Math.max(250, na);
        this.orderedList.setNumTopFriends(Math.floor(oa / ha));
    };
    ma.prototype._showBuddyList = function () {
        "use strict";
        if (!this._buddyListRenderSubscription)this._buddyListRenderSubscription = this.orderedList.subscribe('render', p.setUseMaxHeight.bind(p, this.root, false));
        o.hide(this.typeaheadContainer);
        this.orderedList.show();
        ja.bump('buddylist_show');
    };
    ma.prototype._hideBuddyList = function () {
        "use strict";
        o.show(this.typeaheadContainer);
        this.orderedList.hide();
        ja.bump('buddylist_hide');
    };
    ma.prototype.onShow = function () {
        "use strict";
        this._isOpen = true;
        if (j.disconnected()) {
            this._tryReconnect();
            this._showBuddyList();
        } else n.goOnline(this._showBuddyList.bind(this));
    };
    ma.prototype._setLabel = function (na, oa) {
        "use strict";
        var pa = this.label.cloneNode(true);
        q.setContent(pa, na);
        q.replace(this.label, pa);
        this.label = pa;
        this.throbber && o.conditionShow(this.throbber, !!oa);
    };
    ma.prototype._setUnread = function (na) {
        "use strict";
        o.conditionShow(this.unreadCount, !!na);
        if (na) {
            na = u.span({className: "_51jx _5ayw"}, na);
            q.setContent(this.unreadCount, na);
        }
    };
    ma.prototype._conditionallyShowTypeahead = function () {
        "use strict";
        o.conditionShow(this.typeahead.getElement(), this._orderedListCount >= ia);
    };
    ma.prototype._updateCount = function () {
        "use strict";
        this._updateView();
        this._conditionallyShowTypeahead();
    };
    e.exports = ma;
}, null);
__d("ChatSidebarDropdown", ["AppsDivebarDisplayController", "Arbiter", "AsyncRequest", "Chat", "ChatOptions", "ChatOrderedList", "ChatSidebar", "ChatVisibility", "CSS", "JSLogger", "PresenceState", "cx", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    function t(u, v, w, x, y, z) {
        "use strict";
        this._menu = v;
        this._popover = u.getPopover();
        this._selectedValues = {};
        this._menuIsRendered = false;
        this._editingFavoriteList = false;
        this._hasAppsOption = z;
        this._logger = p.create('blackbird');
        this._menu.subscribe('itemclick', this._onClick.bind(this));
        this._popover.subscribe('init', this._onLayerInit.bind(this));
        this._popover.subscribe('show', this._updateTickerVisibility.bind(this));
        h.subscribe('chat/option-changed', this._onOptionChanged.bind(this));
    }

    t.prototype._onLayerInit = function () {
        "use strict";
        this._menuIsRendered = true;
        o.addClass(this._popover.getLayer().getContentRoot(), "_5vm9");
        this._displayBrowserNotificationsIfNeeded();
        this._updateVisibility();
        h.subscribe('chat-visibility/go-online', this._updateVisibility.bind(this));
        h.subscribe('chat-visibility/go-offline', this._updateVisibility.bind(this));
        this._updateSelectedItems();
        if (this._editingFavoriteList)this._updateEditFavoriteListLabel(this._editingFavoriteList);
        if (this._hasAppsOption)this._registerAppHandlers();
    };
    t.prototype._updateSelectedItems = function () {
        "use strict";
        this._menu.forEachItem(function (u) {
            var v = u.getValue && u.getValue();
            if (v in this._selectedValues) {
                var w = this._selectedValues[v];
                if (w) {
                    u.select();
                } else u.deselect();
            }
        }.bind(this));
    };
    t.prototype._registerAppHandlers = function () {
        "use strict";
        this._updateAppsVisibility();
        h.subscribe('AppsDivebar/hide-apps', this._updateAppsVisibility.bind(this));
        h.subscribe('AppsDivebar/show-apps', this._updateAppsVisibility.bind(this));
    };
    t.prototype._updateTickerVisibility = function () {
        "use strict";
        var u = s('pagelet_ticker');
        o.conditionClass(this._popover.getLayer().getContentRoot(), "_2rox", !u || u.offsetHeight === 0);
    };
    t.prototype._updateAppsVisibility = function () {
        "use strict";
        o.conditionClass(this._popover.getLayer().getContentRoot(), "_2vh", !g.isVisible());
    };
    t.prototype._updateVisibility = function () {
        "use strict";
        o.conditionClass(this._popover.getLayer().getContentRoot(), "_5vma", !n.isOnline());
    };
    t.prototype._displayBrowserNotificationsIfNeeded = function () {
        "use strict";
        if (window.webkitNotifications) {
            var u;
            this._menu.forEachItem(function (v) {
                if (v.getValue && v.getValue() === 'browser_notif')u = v;
            });
            if (u) {
                o.show(u.getRoot());
                if (window.webkitNotifications.checkPermission() !== 0)u.deselect();
            }
        }
    };
    t.prototype._onChangeSettingResponse = function (u, v, w) {
        "use strict";
        q.doSync();
    };
    t.prototype._onChangeSettingError = function (u, v, w) {
        "use strict";
        k.setSetting(u, !v, 'sidebar_menu_error');
    };
    t.prototype._onChangeFinally = function () {
        "use strict";
        this._pendingChange = false;
    };
    t.prototype._onOptionChanged = function (u, v) {
        "use strict";
        var w = v.name, x = v.value;
        if (this._menuIsRendered) {
            this._menu.forEachItem(function (y) {
                if (y.getValue && (y.getValue() === w))if (y.isSelected() && !x) {
                    y.deselect();
                } else if (!y.isSelected() && x)y.select();
            });
        } else this._selectedValues[w] = x;
    };
    t.prototype._onClick = function (u, v) {
        "use strict";
        if (this._pendingChange)return false;
        var w = false, x = v.item.getValue(), y = true;
        switch (x) {
            case 'sidebar':
                this.toggleSidebar();
                break;
            case 'online':
                if (!n.isOnline()) {
                    n.goOnline();
                } else this._logVisibilityChange(x, true);
                w = true;
                break;
            case 'offline':
                if (n.isOnline()) {
                    n.goOffline();
                } else this._logVisibilityChange(x, true);
                w = true;
                break;
            case 'advanced_settings':
            case 'turn_off_dialog':
                h.inform('chat/advanced-settings-dialog-opened');
                w = true;
                this._logVisibilityChange(x, false);
                break;
            case 'browser_notif':
                if (!v.item.isSelected() && window.webkitNotifications && window.webkitNotifications.checkPermission() !== 0) {
                    window.webkitNotifications.requestPermission(function () {
                        this.changeSetting(x, !v.item.isSelected());
                    }.bind(this));
                } else this.changeSetting(x, !v.item.isSelected());
                w = true;
                break;
            case 'sound':
                this.changeSetting(x, !v.item.isSelected());
                w = true;
                break;
            case 'pause':
                var z = !v.item.isSelected();
                if (z) {
                    l._pause();
                } else l._unpause();
                w = true;
                y = false;
                break;
            case 'close_all_tabs':
                h.inform('chat/close-all-tabs');
                this._logVisibilityChange(x, false);
                w = true;
                break;
            case 'show_apps':
                if (!g.isVisible()) {
                    g.showApps();
                    m.resize();
                }
                w = true;
                break;
            case 'hide_apps':
                if (g.isVisible()) {
                    g.hideApps();
                    m.resize();
                }
                w = true;
                break;
            case 'show_ticker':
                h.inform('ChatSidebarDropdown/openTicker');
                w = true;
                break;
            case 'hide_ticker':
                h.inform('ChatSidebarDropdown/closeTicker');
                w = true;
                break;
        }
        if (w) {
            this.hideMenu();
            return y;
        }
    };
    t.prototype._logVisibilityChange = function (u, v) {
        "use strict";
        this._logger.error(v ? 'sidebar_dropdown_visibility_error' : 'sidebar_dropdown_set_visibility', {action: u});
    };
    t.prototype.changeSetting = function (u, v) {
        "use strict";
        if (this._pendingChange)return false;
        this._pendingChange = true;
        var w = {};
        w[u] = v;
        k.setSetting(u, v, 'sidebar_menu');
        new i('/ajax/chat/settings.php').setHandler(this._onChangeSettingResponse.bind(this, u, v)).setErrorHandler(this._onChangeSettingError.bind(this, u, v)).setFinallyHandler(this._onChangeFinally.bind(this)).setData(w).setAllowCrossPageTransition(true).send();
    };
    t.prototype.hideMenu = function () {
        "use strict";
        if (this._menuIsRendered)this._popover.hideLayer();
    };
    t.prototype.toggleSidebar = function () {
        "use strict";
        j.toggleSidebar();
        this.hideMenu();
        return false;
    };
    e.exports = t;
}, null);
__d("ChatSidebarLog", ["AsyncSignal", "Banzai", "BanzaiLogger", "Bootloader", "csx", "DOM", "ErrorUtils", "ModuleDependencies", "JSLogger", "Run", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = o.create('chat_sidebar_load'), s = null, t = false, u = (Math.random() * 2147483648 | 0).toString(36), v = Date.now(), w = null, x = false;
    p.onLoad(function () {
        t = true;
    });
    try {
        d(['ChatSidebar'], function (ea) {
            s = ea;
        });
    } catch (y) {
        r.warn('exception', {reason: y.toString()});
    }
    function z(ea, fa) {
        if (ea && ea.length > fa)return ea[fa];
        return null;
    }

    function aa(ea) {
        if (ea.name == 'SyntaxError' || /syntaxerror/i.test(ea.message))x = true;
    }

    function ba() {
        if (!w)w = i.create(q({retry: true}, h.VITAL));
        return w;
    }

    function ca(ea) {
        setTimeout(function () {
            var fa = n.getMissing('ChatSidebar'), ga = j.getErrorUrls(), ha = j.getLoadingUrls(), ia = [];
            for (var ja in ha)ia.push({url: ja, time: ha[ja]});
            ia.sort(function (qa, ra) {
                return ra.time - qa.time;
            });
            var ka = {};
            for (var la = 0, ma = ia.length; la < ma; la++)ka[ia.url] = ia.time;
            var na = {start_gap: v - j.getStartTime(), page_loaded: t, page_id: u, timeout: ea, missing_total: fa ? fa.length : null, module_1: z(fa, 0), module_2: z(fa, 1), module_3: z(fa, 2), error_url_total: ga.length, error_url_1: z(ga, 0), error_url_2: z(ga, 1), error_url_3: z(ga, 2), loading_url_total: ia.length, loading_url_1: z(ia, 0) ? z(ia, 0).url : null, loading_time_1: z(ia, 0) ? z(ia, 0).time : null, loading_url_2: z(ia, 1) ? z(ia, 1).url : null, loading_time_2: z(ia, 1) ? z(ia, 1).time : null, loading_url_3: z(ia, 2) ? z(ia, 2).url : null, loading_time_3: z(ia, 2) ? z(ia, 2).time : null}, oa = null;
            if (!s) {
                r.warn('require_' + ea, {missing: fa});
                oa = 'require';
            }
            if (s && !s.isInitialized()) {
                r.warn('init_' + ea, {missing: fa});
                oa = 'init';
            }
            if (s && s.isInitialized() && s.isEnabled() && s.shouldShowSidebar()) {
                var pa = l.scry(s.getRoot(), "._42fz");
                if (!pa || pa.length === 0) {
                    r.warn('render_' + ea, {missing: fa});
                    oa = 'render';
                }
            }
            if (oa) {
                na.symptom = oa;
                new g('/ajax/chat/sidebar_load.php', na).send();
                ba().log('SidebarLoadFailureLoggerConfig', {start_gap: v - j.getStartTime(), page_loaded: t, page_id: u, timeout: ea, symptom: oa, has_syntax_error: x});
            }
        }, ea);
    }

    var da = {start: function () {
        m.addListener(aa);
        ca(5000);
        ca(10000);
        ca(15000);
        ca(30000);
        ca(60000);
    }};
    e.exports = da;
}, null);
__d("ChatTypeaheadCore", ["Event", "Keys", "TypeaheadCore", "copyProperties", "emptyFunction", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    for (var m in i)if (i.hasOwnProperty(m))o[m] = i[m];
    var n = i === null ? null : i.prototype;
    o.prototype = Object.create(n);
    o.prototype.constructor = o;
    o.__superConstructor__ = i;
    function o() {
        "use strict";
        if (i !== null)i.apply(this, arguments);
    }

    o.prototype.init = function (p, q, r) {
        "use strict";
        n.init.call(this, p, q, r);
        this.informBeginActive = false;
        this.informEndActive = false;
        this.data.subscribe('respond', function () {
            if (this.informBeginActive) {
                this.informBeginActive = false;
                this.inform('sidebar/typeahead/active', true);
            } else if (this.informEndActive) {
                this.informEndActive = false;
                this.inform('sidebar/typeahead/active', false);
            }
        }.bind(this));
    };
    o.prototype.keydown = function (event) {
        "use strict";
        this.data.fetchAll();
        var p = g.getKeyCode(event);
        if (p === h.ESC) {
            this.view.clearContent();
            setTimeout(l(this.reset, this), 0);
            if (!this.getValue()) {
                this.element.blur();
                this.inform('escape');
            }
            return event.kill();
        }
        return n.keydown.call(this, event);
    };
    o.prototype.checkValue = function () {
        "use strict";
        var p = this.getValue(), q = this.value;
        if (p == q)return;
        if (q && !p) {
            this.typeaheadActive = false;
            this.informEndActive = true;
        } else if (!q && p) {
            this.typeaheadActive = true;
            this.informBeginActive = true;
            this.inform('sidebar/typeahead/preActive');
        }
        n.checkValue.call(this);
    };
    j(o.prototype, {handleTab: k});
    e.exports = o;
}, null);
__d("PublicPromise", ["Promise"], function (a, b, c, d, e, f, g) {
    function h() {
        "use strict";
        this.$PublicPromise0 = false;
        this.$PublicPromise1 = false;
        this.$PublicPromise2 = new g(function (i, j) {
            this.$PublicPromise3 = i;
            this.$PublicPromise4 = j;
        }.bind(this));
    }

    h.prototype.getPromise = function () {
        "use strict";
        return this.$PublicPromise2;
    };
    h.prototype.resolve = function (i) {
        "use strict";
        if (!this.$PublicPromise0) {
            this.$PublicPromise1 = true;
            this.$PublicPromise3(i);
        }
    };
    h.prototype.reject = function (i) {
        "use strict";
        if (!this.$PublicPromise0) {
            this.$PublicPromise1 = true;
            this.$PublicPromise4(i);
        }
    };
    h.prototype.then = function () {
        "use strict";
        return g.prototype.then.apply(this.$PublicPromise2, arguments);
    };
    h.prototype.done = function () {
        "use strict";
        return g.prototype.done.apply(this.$PublicPromise2, arguments);
    };
    h.prototype.abort = function () {
        "use strict";
        this.$PublicPromise0 = true;
    };
    h.prototype.isSettled = function () {
        "use strict";
        return this.$PublicPromise1;
    };
    h.prototype.isAborted = function () {
        "use strict";
        return this.$PublicPromise0;
    };
    e.exports = h;
}, null);
__d("ChatTypeaheadDataSource", ["BanzaiLogger", "ChatSortUsers", "CurrentUser", "DataSource", "JSLogger", "MercuryParticipantTypes", "Promise", "PublicPromise", "ShortProfiles", "debounce", "merge"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = 500;
    for (var s in j)if (j.hasOwnProperty(s))u[s] = j[s];
    var t = j === null ? null : j.prototype;
    u.prototype = Object.create(t);
    u.prototype.constructor = u;
    u.__superConstructor__ = j;
    function u(v) {
        "use strict";
        v = v || {};
        v.kanaNormalization = true;
        j.call(this, v);
        this._jslog = k.create('chat_typeahead');
        this._jslog.log('created');
        this._bootstrapPromise = new n();
        this._queryPromise = new n();
        m.all([this._bootstrapPromise, this._queryPromise]).then(this._logWaitTime);
        this._needsFriends = true;
        this._logQuery = p(function (w, x) {
            this._queryPromise.resolve(Date.now() - r);
            this._jslog.log('query', {query: w, success: x});
        }, r, this, true);
        this._logRespond = p(function (w, x) {
            this._jslog.log('respond', {query: w, results: x});
        }, r, this, true);
    }

    u.prototype.init = function () {
        "use strict";
        this._jslog.log('init');
        t.init.call(this);
        this._update();
    };
    u.prototype.bootstrap = function () {
        "use strict";
        this._jslog.log('bootstrap');
        t.bootstrap.call(this);
        o.fetchAll().then(function () {
            this._bootstrapPromise.resolve(Date.now());
            this.inform('activity', {activity: false});
            this._needsFriends = false;
            this._update();
        }.bind(this));
    };
    u.prototype.query = function (v, w, x, y) {
        "use strict";
        var z = t.query.call(this, v, w, x, y);
        this._logQuery(v, z);
        return z;
    };
    u.prototype.respond = function (v, w, x) {
        "use strict";
        var y = t.respond.call(this, v, w, x);
        this._logRespond(v, w);
        return y;
    };
    u.prototype.getQueryData = function (v, w) {
        "use strict";
        return q(t.getQueryData.call(this, v, w), {needs_friends: this._needsFriends});
    };
    u.prototype.fetchAll = function () {
        "use strict";
        o.fetchAll();
    };
    u.prototype._update = function () {
        "use strict";
        var v = this.value, w = o.getCachedProfileIDs(), x = w.filter(function (z) {
            var aa = o.getNow(z);
            return (z == i.getID() || aa.type === l.FRIEND);
        });
        x.sort(h.sort);
        var y = x.map(function (z) {
            var aa = o.getNow(z), ba = z == i.getID() ? l.FRIEND : aa.type, ca = [aa.additionalName, aa.alternateName].concat(aa.searchTokens || []).join(' ');
            return {uid: z, text: aa.name, tokens: ca, localized_text: aa.name, additional_text: aa.additionalName, photo: aa.thumbSrc, type: ba};
        });
        if (y.length)this.addEntries(y);
        this.value = v;
        if (v)this.query(v);
    };
    u.prototype.refreshData = function () {
        "use strict";
        this.fetchAll();
        d(['AvailableList'], function (v) {
            v.update();
        }.bind(this));
    };
    u.prototype._logWaitTime = function (v) {
        "use strict";
        var w = v[0], x = v[1];
        g.log('ChatTypeaheadLoggerConfig', {wait_time: w - x});
    };
    e.exports = u;
}, null);
__d("ChatSidebarHeader.react", ["React", "cx", "joinClasses"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.createClass({displayName: 'ReactChatSidebarHeader', render: function () {
        return (g.createElement(g.DOM.div, Object.assign({}, this.props, {className: i(this.props.className, "_55ob")}), g.createElement(g.DOM.div, {className: "_55oc"}, this.props.children)));
    }});
    e.exports = j;
}, null);
__d("ChatSidebarThread.react", ["ChatSidebarItem.react", "DOM", "WebMessengerPermalinkConstants", "React", "MercuryThreadMetadataRawRenderer", "Tooltip", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = j.createClass({displayName: 'ChatSidebarThread', getInitialState: function () {
        return {maxNumParticipantsToRender: 10};
    }, propTypes: {image: j.PropTypes.string, imageSize: j.PropTypes.number, name: j.PropTypes.string, participants: j.PropTypes.array, numOtherParticipants: j.PropTypes.number, status: j.PropTypes.number, threadID: j.PropTypes.string, unreadCount: j.PropTypes.number}, _renderParticipants: function () {
        var q = [], r = this.props.participants.length, s = this.props.numOtherParticipants, t = Math.min(this.state.maxNumParticipantsToRender, r);
        if (s - t == 1)t--;
        for (var u = 0; u < t; u++) {
            var v = h.create('li');
            h.setContent(v, this.props.participants[u].name);
            q.push(v);
        }
        if (t < s) {
            v = h.create('li');
            h.setContent(v, m._("and {num} more...", [m.param("num", s - t)]));
            q.push(v);
        }
        return h.create('ul', {}, q);
    }, componentDidMount: function () {
        l.set(this.getDOMNode(), this._renderParticipants());
    }, render: function () {
        var q = this.props.name, r = o(this.props.threadID, this.props.participants, this.props.numOtherParticipants), s = q ? r : undefined, t = i.getURIPathForThreadID(this.props.threadID), u = p(this.props.image, this.props.participants), v = q ? q : r;
        return (j.createElement(g, {context: s, href: {url: t}, imageSize: this.props.imageSize, images: u, name: v, status: this.props.status, unreadCount: this.props.unreadCount}));
    }});

    function o(q, r, s) {
        return k.renderRawParticipantList(q, r, s, {names_renderer: k.renderShortNames});
    }

    function p(q, r) {
        if (q)return q;
        return r.map(function (s) {
            return s.image_src;
        });
    }

    e.exports = n;
}, null);
__d("ChatTypeaheadRenderer", ["AvailableListConstants", "ChatSidebarConstants", "ChatSidebarHeader.react", "ChatSidebarSections", "ChatSidebarThread.react", "ChatSidebarUser.react", "ChatTypeaheadConstants", "DOM", "LastMobileActiveTimes", "MercuryParticipants", "PresenceStatus", "React"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = {};

    function t(y, z) {
        if (!(y in s))s[y] = n.create('li');
        r.renderComponent(z, s[y]);
        return s[y];
    }

    function u(y) {
        return t(y.text, r.createElement(i, null, y.text));
    }

    function v(y) {
        var z = y.mercury_thread.participants.map(function (aa) {
            return p.getUserID(aa);
        });
        return t(y.uid, r.createElement(k, {image: y.mercury_thread.image_src, imageSize: h.getImageSize(), name: y.mercury_thread.name, participants: y.participants_to_render, numOtherParticipants: z.length - 1, status: q.getGroup(z), threadID: y.uid}));
    }

    function w(y) {
        var z = q.get(y.uid), aa = (z === g.MOBILE) ? o.getShortDisplay(y.uid) : null, ba = (y.render_type == m.NON_FRIEND_TYPE || y.render_type == m.FB4C_TYPE) ? y.subtext : null, ca = null;
        if (z === g.ACTIVE)ca = q.getDetailedActivePresence(y.uid);
        return t(y.uid, r.createElement(l, {image: y.photo, imageSize: h.getImageSize(), name: y.text, sectionName: j.TYPEAHEAD, status: z, birthday: q.isBirthday(y.uid), statusTime: aa, detailedStatus: ca, userID: y.uid, context: ba}));
    }

    function x(y, z) {
        if (y.type === m.HEADER_TYPE)return u(y);
        if (y.type == m.THREAD_TYPE)return v(y);
        return w(y);
    }

    e.exports = x;
}, null);
__d("ChatTypeaheadView", ["BucketedTypeaheadView", "ChatTypeaheadConstants", "CurrentUser", "DOM", "React", "MercuryThreadSearchUtils", "XUISpinner.react", "arrayContains", "cx", "fbt", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    for (var r in g)if (g.hasOwnProperty(r))t[r] = g[r];
    var s = g === null ? null : g.prototype;
    t.prototype = Object.create(s);
    t.prototype.constructor = t;
    t.__superConstructor__ = g;
    function t(u, v) {
        "use strict";
        g.call(this, u, v);
        this.showingLoadingIndicator = false;
        this.typeObjects = {};
        this.typeObjectsOrder = [];
        this.typeObjects[h.NON_FRIEND_TYPE] = {uid: h.NON_FRIEND_TYPE, type: h.HEADER_TYPE, text: "\u0414\u0420\u0423\u0417\u042c\u042f \u0414\u0420\u0423\u0417\u0415\u0419"};
        this.typeObjectsOrder.push(h.NON_FRIEND_TYPE);
        this.typeObjects[h.THREAD_TYPE] = {uid: h.THREAD_TYPE, type: h.HEADER_TYPE, text: "\u0413\u0420\u0423\u041f\u041f\u041e\u0412\u0410\u042f \u041f\u0415\u0420\u0415\u041f\u0418\u0421\u041a\u0410"};
        this.typeObjectsOrder.push(h.THREAD_TYPE);
        this.typeObjects[h.FB4C_TYPE] = {uid: h.FB4C_TYPE, type: h.HEADER_TYPE, text: "\u041a\u041e\u041b\u041b\u0415\u0413\u0418"};
        this.typeObjects[h.FRIEND_TYPE] = {disabled: true, uid: h.FRIEND_TYPE, type: h.HEADER_TYPE, text: "\u0414\u0420\u0423\u0417\u042c\u042f"};
        this.typeObjectsOrder.push(h.FB4C_TYPE);
        this.typeObjectsOrder.push(h.FRIEND_TYPE);
    }

    t.prototype.reset = function () {
        "use strict";
        if (this.value === '')this.clearContent();
        this.index = -1;
        this.items = [];
        this.results = [];
        this.value = '';
        this.inform('reset');
        return this;
    };
    t.prototype.clearContent = function () {
        "use strict";
        this.hideLoadingIndicator();
        j.empty(this.content);
    };
    t.prototype.buildBuckets = function (u, v) {
        "use strict";
        v = v.reverse();
        v = v.filter(function (w) {
            var x = w.render_type || w.type;
            if (x === 'thread') {
                var y = 'fbid:' + i.getID();
                if (!n(w.mercury_thread.participants, y))return false;
                var z = w.participants_to_render.some(function (ba) {
                    return l.queryMatchesName(u, ba.name);
                }), aa = l.queryMatchesName(u, w.mercury_thread.name);
                if (!z && !aa)return false;
            }
            return true;
        });
        return s.buildBuckets.call(this, u, v);
    };
    t.prototype.getDefaultIndex = function (u) {
        "use strict";
        if (u.length === 0)return -1;
        var v = u.length - 1;
        while (!this.isHighlightable(u[v]) && v >= 0)v--;
        return v;
    };
    t.prototype.showLoadingIndicator = function () {
        "use strict";
        if (!this.showingLoadingIndicator) {
            k.renderComponent(k.createElement(k.DOM.div, {className: "spinnerContainer"}, k.createElement(m, {className: "_3-8i", background: "light", size: "small", paused: false})), this.content);
            this.showingLoadingIndicator = true;
        }
    };
    t.prototype.hideLoadingIndicator = function () {
        "use strict";
        if (this.showingLoadingIndicator) {
            k.unmountComponentAtNode(this.content);
            this.showingLoadingIndicator = false;
        }
    };
    t.prototype.showNoResults = function () {
        "use strict";
        this.hideLoadingIndicator();
        j.setContent(this.content, j.create('div', {className: "noResults _3-9a"}, "\u0414\u0440\u0443\u0433 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d."));
    };
    t.prototype.hide = function () {
        "use strict";
        this.clearContent();
        return s.hide.call(this);
    };
    t.prototype.render = function (u, v, w) {
        "use strict";
        if (!v.length) {
            if (u)this.showLoadingIndicator();
        } else this.hideLoadingIndicator();
        return s.render.call(this, u, v, w);
    };
    e.exports = t;
}, null);
__d("legacy:ChatTypeaheadBehavior", ["ChatTypeaheadBehavior"], function (a, b, c, d, e, f, g) {
    if (!a.TypeaheadBehaviors)a.TypeaheadBehaviors = {};
    a.TypeaheadBehaviors.chatTypeahead = function (h) {
        h.enableBehavior(g);
    };
}, 3);
__d("NotificationImpressions", ["AsyncSignal", "NotificationTokens", "URI"], function (a, b, c, d, e, f, g, h, i) {
    var j = '/ajax/notifications/impression.php';

    function k(l, m) {
        var n = {ref: m};
        h.untokenizeIDs(l).forEach(function (o, p) {
            n['alert_ids[' + p + ']'] = o;
        });
        new g(i(j).getQualifiedURI().toString(), n).send();
    }

    e.exports = {log: k};
}, null);
__d("NotificationBeeperItemContents.react", ["Animation", "AsyncRequest", "Bootloader", "CloseButton.react", "ImageBlock.react", "InlineStoryInsert", "NotificationURI", "NotificationUserActions", "React", "TextWithEntities.react", "Timestamp.react", "URI", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    function t(v, w) {
        return o.createElement(o.DOM.span, {className: "fwb"}, v);
    }

    var u = o.createClass({displayName: 'NotificationBeeperItemContents', _markAsRead: function () {
        n.markNotificationsAsRead([this.props.beep.notificationID]);
    }, _onClick: function (v) {
        this._markAsRead();
        this.props.onHide();
        if (v.button === 1 || v.altKey || v.ctrlKey || v.metaKey || v.shiftKey)return;
        var w = this.props.beep, x = r(w.url).getPath();
        if (m.isAlbumDraftRecoveryDialogURI(w.link)) {
            new h(w.link).send();
            v.preventDefault();
        } else if (w.photo && m.snowliftable(w.link)) {
            i.loadModules(["PhotoSnowlift"], function (y) {
                y.bootstrap(w.link, v.currentTarget);
            });
            v.preventDefault();
        } else if (w.eligibleToRenderInFeed) {
            if (!l._isInFeed()) {
                l.gotoPermalink(w.link);
            } else l._insert(w.link, x, w.notifID);
            v.preventDefault();
        } else if (w.ajaxifyLink) {
            i.loadModules(["AsyncDialog"], function (y) {
                y.bootstrap(w.ajaxifyLink, v.currentTarget, 'dialog');
            });
            v.preventDefault();
        }
    }, _onClose: function () {
        this._markAsRead();
        this.props.onHide();
    }, _doFlash: function () {
        new g(this.refs.inner.getDOMNode()).from('opacity', '0').to('opacity', '1').duration(200).go();
    }, componentDidMount: function () {
        this.props.onReadyToHide(this.props.beep.notificationID);
    }, componentDidUpdate: function (v) {
        if (v.beep.beepID !== this.props.beep.beepID) {
            this._doFlash();
            this.props.onReadyToHide(this.props.beep.notificationID);
        }
    }, render: function () {
        var v = this.props.beep;
        return (o.createElement(o.DOM.div, {ref: "inner"}, o.createElement(j, {className: "_3soc", onClick: this._onClose, size: "medium"}), o.createElement(o.DOM.a, {href: v.link, onClick: this._onClick, className: "_3soi"}, o.createElement(k, {className: "_3soj", spacing: "medium"}, o.createElement(o.DOM.img, {src: v.actors[0].profile_picture.uri, className: "_3sok"}), o.createElement(o.DOM.div, {className: "_3sol"}, o.createElement(p, {renderEmoticons: true, renderEmoji: true, interpolator: t, ranges: v.text.ranges, aggregatedranges: v.text.aggregated_ranges, text: v.text.text}), o.createElement(k, {className: "_3som"}, o.createElement(o.DOM.img, {className: "_1x8t", src: v.icon.uri}), o.createElement(q, {time: v.timestamp.time, text: v.timestamp.text, verbose: v.timestamp.verbose})))))));
    }});
    e.exports = u;
}, null);
__d("NotificationBeeperConst", ["keyMirror"], function (a, b, c, d, e, f, g) {
    var h = {IDLE_DELAY: 10000, ACTIVE_DELAY_LONG: 4000, FADE_OUT_LENGTH: 1500, BeepStates: g({PENDING: true, RENDERED: true, READY_TO_HIDE: true, FADING_OUT: true})};
    e.exports = h;
}, null);
__d("NotificationBeeperItem.react", ["Animation", "BrowserSupport", "NotificationBeeperItemContents.react", "React", "NotificationBeeperItemRenderersList", "Style", "NotificationBeeperConst", "cx", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = j.createClass({displayName: 'NotificationBeeperItem', getInitialState: function () {
        return {fadedIn: false, hidden: false};
    }, componentDidMount: function () {
        var q;
        if (h.hasCSSAnimations()) {
            q = this.setState.bind(this, {fadedIn: true}, null);
        } else q = function () {
            new g(this.refs.item.getDOMNode()).from('top', '-30px').from('opacity', '0').to('top', '0px').to('opacity', '1').duration(200).ondone(this.setState.bind(this, {fadedIn: true}, null)).go();
        }.bind(this);
        o(q, 50);
        this.props.onInserted(this.props.beep);
    }, componentWillUnmount: function () {
        if (this._fadeOutAnimation) {
            this._fadeOutAnimation.stop();
            this._fadeOutAnimation = null;
        }
    }, _onHide: function () {
        this.setState({hidden: true});
    }, render: function () {
        var q = this.props.beep, r = (("_3sod") + (this.state.fadedIn ? ' ' + "_3soe" : '') + (this.state.hidden ? ' ' + "_3sof" : '')), s = this._getRenderer(q.beepRenderer);
        return (j.createElement(j.DOM.li, {className: r, ref: "item", 'data-gt': q.tracking}, j.createElement(s, {beep: q, onHide: this._onHide, onReadyToHide: this.props.onReadyToHide, ref: "itemContents"})));
    }, componentDidUpdate: function (q, r, s) {
        if (this.props.fadingOut) {
            if (!this._fadeOutAnimation)this._fadeOutAnimation = new g(this.refs.item.getDOMNode()).from('opacity', '1').to('opacity', '0').duration(m.FADE_OUT_LENGTH).ondone(this._onHide).go();
            this.refs.item.getDOMNode().style.transitionDuration = '0ms';
        } else if (this._fadeOutAnimation) {
            this._fadeOutAnimation.stop();
            this._fadeOutAnimation = null;
            l.set(this.refs.item.getDOMNode(), 'opacity', '1');
        }
    }, _getRenderer: function (q) {
        if (q in k)return k[q];
        return i;
    }});
    e.exports = p;
}, null);
__d("NotificationSound", ["Sound", "copyProperties"], function (a, b, c, d, e, f, g, h) {
    var i = 5000;
    g.init(['audio/mpeg']);
    function j(k) {
        this._soundPath = k;
        this._lastPlayed = 0;
    }

    h(j.prototype, {play: function (k) {
        if (!this._soundPath)return;
        var l = Date.now();
        if ((l - this._lastPlayed) < i)return;
        this._lastPlayed = l;
        g.play(this._soundPath, k);
    }});
    e.exports = j;
}, null);
__d("NotificationBeeper.react", ["Arbiter", "ChannelConstants", "NotificationBeeperItem.react", "NotificationConstants", "NotificationImpressions", "NotificationPhotoThumbnail", "NotificationSound", "NotificationUpdates", "NotificationURI", "NotificationUserActions", "React", "XPermalinkDialogControllerURIBuilder", "NotificationBeeperConst", "NotificationBeeperPinnedPostLoader", "cx", "isEmpty", "setTimeoutAcrossTransitions", "shield"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
    var y = s.BeepStates, z = 'beeper', aa = j.PayloadSourceType.LIVE_SEND, ba = j.PayloadSourceType.OTHER_APPLICATION, ca = q.createClass({displayName: 'NotificationBeeper', propTypes: {}, getInitialState: function () {
        return {soundEnabled: this.props.soundEnabled, hovering: false, fading: false, paused: false, beeps: {}};
    }, componentWillMount: function () {
        var da = h.getArbiterType('notif_sound_pref_changed'), ea = 'update-notifications';
        this.subscriptions = [n.subscribe(ea, function (fa, ga) {
            if (ga.payloadsource === aa || ga.payloadsource === ba) {
                var ha = ga.nodes;
                if (ha && ha.length)this._handleBeepChanges(this._convertNotifications(ha));
            }
        }.bind(this)), g.subscribe(da, function (fa, ga) {
            this.setState({soundEnabled: ga.obj.enabled});
        }.bind(this))];
        g.inform('NotificationBeeper/mounted', null, g.BEHAVIOR_PERSISTENT);
        if (t.payload)this._handleBeepChanges(this._convertNotifications(t.payload.nodes));
    }, componentWillUnmount: function () {
        this.subscriptions.forEach(function (da) {
            da.unsubscribe();
        });
        this.subscriptions = null;
    }, _onMouseEnter: function () {
        if (this.state.paused)return;
        this._hideWait && clearTimeout(this._hideWait);
        var da = [], ea = this.state.beeps;
        Object.keys(ea).forEach(function (fa) {
            if (ea[fa].state != y.PENDING) {
                da.push(fa);
            } else ea[fa].state = y.RENDERED;
        });
        p.markNotificationsAsSeen(da);
        this.setState({hovering: true, fading: false, beeps: ea});
    }, _onMouseLeave: function () {
        if (this.state.paused)return;
        this._waitToHide(s.ACTIVE_DELAY_LONG);
        this.setState({hovering: false});
    }, _onInsertedItem: function (da) {
        if (!this.state.hovering)this._waitToHide();
        if (this.state.soundEnabled && da.sound) {
            if (!this._notifSound)this._notifSound = new m(this.props.soundPath);
            this._notifSound.play(da.beepID);
        }
        if (this.props.shouldLogImpressions)k.log([da.notificationID], z);
    }, _waitToHide: function (da) {
        this._hideWait && clearTimeout(this._hideWait);
        this._hideWait = w(x(this._hide, this), (da || s.IDLE_DELAY) * (this.props.slowFade ? 2 : 1));
    }, _onReadyToHide: function (da) {
        this.state.beeps[da].state = y.READY_TO_HIDE;
        if (!this._hideWait)this._waitToHide();
    }, _hide: function () {
        this._hideWait = null;
        var da = this.state.beeps;
        Object.keys(da).forEach(function (ea) {
            if (da[ea].state == y.READY_TO_HIDE)da[ea].state = y.FADING_OUT;
        });
        this.setState({fading: true});
        w(x(this._finishHide, this), s.FADE_OUT_LENGTH);
    }, _finishHide: function () {
        if (!this.state.fading)return;
        var da = this.state.beeps;
        Object.keys(da).forEach(function (ea) {
            if (da[ea].state == y.FADING_OUT)delete da[ea];
        });
        this.setState({fading: false, beeps: da});
        w(function () {
            var ea = this.state.beeps;
            Object.keys(ea).forEach(function (fa) {
                if (ea[fa].state == y.PENDING)ea[fa].state = y.RENDERED;
            });
            this.setState({beeps: ea});
        }.bind(this));
    }, _handleBeepChanges: function (da) {
        var ea = this.state.fading ? y.PENDING : y.RENDERED, fa = this.state.beeps, ga = false;
        Object.keys(da).reverse().forEach(function (ha) {
            var ia = {state: ea, data: da[ha]};
            if (!fa[ha] || fa[ha].data.beepID != ia.data.beepID) {
                if (fa[ha]) {
                    ga = true;
                    if (ia.data.beepUpdatesOnTop)delete fa[ha];
                }
                fa[ha] = ia;
            }
        });
        if (ga && !this.state.paused)this._waitToHide();
        this.forceUpdate();
    }, _togglePause: function () {
        if (!this.state.paused) {
            this._hideWait && clearTimeout(this._hideWait);
        } else this._waitToHide();
        this.setState({paused: !this.state.paused, fading: false});
    }, render: function () {
        var da = this.state.beeps, ea = {};
        Object.keys(da).reverse().forEach(function (ia) {
            var ja = da[ia];
            if (ja.state == y.PENDING)return;
            ja.data.eligibleToRenderInFeed = ja.data.hasEntStory && this.props.storyInsert;
            ea[ia] = q.createElement(i, {fadingOut: this.state.fading && ja.state == y.FADING_OUT, beep: ja.data, onInserted: this._onInsertedItem, onReadyToHide: this._onReadyToHide});
        }, this);
        var fa = !v(ea), ga = null;
        if (fa && this.props.canPause)ga = q.createElement(q.DOM.li, {className: "_a_g", onClick: this._togglePause}, this.state.paused ? 'Continue' : 'Pause [fb]');
        var ha = ((!fa ? "hidden_elem" : '') + (' ' + "_50d1"));
        return (q.createElement(q.DOM.ul, {ref: "container", className: ha, 'data-gt': this.props.tracking, onMouseEnter: this._onMouseEnter, onMouseLeave: this._onMouseLeave}, ea, ga));
    }, _convertNotifications: function (da) {
        var ea = {};
        da.forEach(function (fa) {
            if (!fa.showBeep)return;
            var ga = fa.alert_id, ha = ga + '-' + fa.receivedTime, ia = l.getThumbnail(fa.attachments, fa.attached_story), ja = ea[ga] = {notificationID: ga, notifID: fa.id, beepID: ha, beepRenderer: fa.beepRenderer, rendererData: fa.rendererData, beepUpdatesOnTop: fa.beepUpdatesOnTop, actors: fa.unaggregatedActors || fa.actors, icon: fa.icon, link: fa.url ? o.localize(fa.url) : '#', url: fa.url, ajaxifyLink: fa.ajaxify_url, hasPermalinkDialog: fa.hasPermalinkDialog, hasEntStory: fa.hasEntStory, photo: ia, text: fa.unaggregatedTitle || fa.title, timestamp: fa.timestamp, receivedTime: fa.receivedTime, sound: !!fa.sound, tracking: fa.tracking};
            if (ja.hasPermalinkDialog && this.props.shouldShowPermalinkDialog)ja.ajaxifyLink = new r().setString('uri', ja.link).getURI().toString();
        }.bind(this));
        return ea;
    }});
    e.exports = ca;
}, null);
__d("XGamesGripperNoteUpdaterControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/async\/games\/gripper_note_viewed\/", {});
}, null);
__d("SidebarAppTickerResizer", ["Animation", "Arbiter", "AsyncRequest", "ChatSidebar", "CSS", "cx", "debounce", "DOMQuery", "Event", "SimpleDrag", "$", "XGamesGripperNoteUpdaterControllerURIBuilder"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = 1e-07, s = 1, t = 85, u = 173, v = 300, w = 46, x = 90, y = 82, z = 150;

    function aa(ba, ca, da, ea) {
        "use strict";
        this.$SidebarAppTickerResizer0 = q('pagelet_ticker');
        this.$SidebarAppTickerResizer1 = q('pagelet_canvas_nav_content');
        this.$SidebarAppTickerResizer2 = this.$SidebarAppTickerResizer0.parentNode;
        this.$SidebarAppTickerResizer1.style.height = da;
        this.$SidebarAppTickerResizer3(ba, ca);
        if (da === null)if (ea !== null) {
            this.$SidebarAppTickerResizer4();
            this.$SidebarAppTickerResizer5(this.$SidebarAppTickerResizer6());
        } else h.subscribe('AppsDivebar/show-apps', this.$SidebarAppTickerResizer4.bind(this));
        h.subscribe('ChatSidebarDropdown/closeTicker', this.$SidebarAppTickerResizer7.bind(this));
        h.subscribe('ChatSidebarDropdown/openTicker', this.$SidebarAppTickerResizer8.bind(this));
        if (ea) {
            var fa = n.scry(document.body, '#pagelet_ticker')[0], ga = fa && fa.parentNode, ha, ia = function () {
                if (!k.shown(ga))return;
                var ja = b('XGamesGripperNoteUpdaterControllerURIBuilder'), ka = (new ja()).getURI();
                new i().setURI(ka).send();
                ea.show();
                if (ha)ha.unsubscribe();
            };
            if (ga && k.shown(ga)) {
                ia();
            } else ha = h.subscribe('ticker/show', ia);
        }
        this.$SidebarAppTickerResizer9 = m(this.$SidebarAppTickerResizer4.bind(this), 200);
        o.listen(window, 'resize', this.$SidebarAppTickerResizer9);
    }

    aa.prototype.$SidebarAppTickerResizer4 = function (ba) {
        "use strict";
        this.$SidebarAppTickerResizera();
        var ca = Math.round(parseFloat(this.$SidebarAppTickerResizer0.style.height));
        if (ca > Math.round(this.$SidebarAppTickerResizerb()) || this.$SidebarAppTickerResizerc && this.$SidebarAppTickerResizerc > s) {
            var da = (this.$SidebarAppTickerResizerc / this.$SidebarAppTickerResizerd) * 100, ea = this.$SidebarAppTickerResizere(0, this.$SidebarAppTickerResizerb() - da);
            if (!(ba && ba.type === 'resize'))this.$SidebarAppTickerResizerf(ea);
            j.resize();
        }
    };
    aa.prototype.$SidebarAppTickerResizerb = function () {
        "use strict";
        if (!j.isVisible())return x;
        return Math.min(x, (this.$SidebarAppTickerResizerd - this.$SidebarAppTickerResizerg - y) * 100 / this.$SidebarAppTickerResizerd);
    };
    aa.prototype.$SidebarAppTickerResizer3 = function (ba, ca) {
        "use strict";
        var da = new p(ba);
        da.subscribe('start', this.$SidebarAppTickerResizerh.bind(this));
        da.subscribe(['update', 'end'], this.$SidebarAppTickerResizeri.bind(this));
        var ea = new p(ca);
        ea.subscribe('start', this.$SidebarAppTickerResizerh.bind(this));
        ea.subscribe('update', this.$SidebarAppTickerResizerj.bind(this));
        ea.subscribe('end', this.$SidebarAppTickerResizerk.bind(this));
    };
    aa.prototype.$SidebarAppTickerResizerh = function (ba, event) {
        "use strict";
        this.$SidebarAppTickerResizerl = event.clientY;
        this.$SidebarAppTickerResizera();
        this.$SidebarAppTickerResizerm();
    };
    aa.prototype.$SidebarAppTickerResizera = function () {
        "use strict";
        this.$SidebarAppTickerResizerg = this.$SidebarAppTickerResizer1.offsetTop;
        this.$SidebarAppTickerResizern = this.$SidebarAppTickerResizer0.offsetHeight;
        this.$SidebarAppTickerResizerd = this.$SidebarAppTickerResizer2.offsetHeight;
        this.$SidebarAppTickerResizerc = this.$SidebarAppTickerResizer1.offsetHeight;
        this.$SidebarAppTickerResizero = this.$SidebarAppTickerResizerc;
    };
    aa.prototype.$SidebarAppTickerResizerm = function () {
        "use strict";
        k.addClass(this.$SidebarAppTickerResizer2, "_4vfq");
    };
    aa.prototype.$SidebarAppTickerResizerp = function () {
        "use strict";
        k.removeClass(this.$SidebarAppTickerResizer2, "_4vfq");
    };
    aa.prototype.$SidebarAppTickerResizeri = function (ba, event) {
        "use strict";
        var ca = (this.$SidebarAppTickerResizerc / this.$SidebarAppTickerResizerd) * 100, da = this.$SidebarAppTickerResizere(event.clientY - this.$SidebarAppTickerResizerl, this.$SidebarAppTickerResizerb() - ca);
        if (ba == 'end') {
            this.$SidebarAppTickerResizerp();
            this.$SidebarAppTickerResizerf(da);
        }
        j.resize();
    };
    aa.prototype.$SidebarAppTickerResizerj = function (ba, event) {
        "use strict";
        var ca = -this.$SidebarAppTickerResizerc, da = this.$SidebarAppTickerResizer6() - this.$SidebarAppTickerResizerc, ea = this.$SidebarAppTickerResizerq(event.clientY - this.$SidebarAppTickerResizerl, ca, da);
        this.$SidebarAppTickerResizere(-ea, this.$SidebarAppTickerResizerb());
        this.$SidebarAppTickerResizero = this.$SidebarAppTickerResizerc + ea;
        this.$SidebarAppTickerResizero = Math.max(s, this.$SidebarAppTickerResizero);
        this.$SidebarAppTickerResizer1.style.height = this.$SidebarAppTickerResizero + 'px';
    };
    aa.prototype.$SidebarAppTickerResizerk = function (ba, event) {
        "use strict";
        var ca = this.$SidebarAppTickerResizero, da = this.$SidebarAppTickerResizers(this.$SidebarAppTickerResizero), ea = this.$SidebarAppTickerResizere(this.$SidebarAppTickerResizerc - da, this.$SidebarAppTickerResizerb());
        if (this.$SidebarAppTickerResizerc != da) {
            this.$SidebarAppTickerResizer5(da);
            this.$SidebarAppTickerResizerf(ea);
        }
        new g(this.$SidebarAppTickerResizer1).from('height', ca).to('height', da).duration(v).go();
    };
    aa.prototype.$SidebarAppTickerResizere = function (ba, ca) {
        "use strict";
        var da = this.$SidebarAppTickerResizern + ba, ea = (da / this.$SidebarAppTickerResizerd) * 100;
        ea = Math.max(r, Math.min(ca, ea));
        this.$SidebarAppTickerResizer0.style.height = ea + '%';
        return ea;
    };
    aa.prototype.$SidebarAppTickerResizers = function (ba) {
        "use strict";
        var ca = this.$SidebarAppTickerResizert(), da = this.$SidebarAppTickerResizer6();
        return (ba < (da - w)) ? ((ba < (ca - w)) ? s : ca) : da;
    };
    aa.prototype.$SidebarAppTickerResizert = function () {
        "use strict";
        return t;
    };
    aa.prototype.$SidebarAppTickerResizer6 = function () {
        "use strict";
        return u;
    };
    aa.prototype.$SidebarAppTickerResizeru = function (ba) {
        "use strict";
        var ca = this.$SidebarAppTickerResizer6();
        return (ba < 0) ? s : (ba > ca ? ca : ba);
    };
    aa.prototype.$SidebarAppTickerResizerq = function (ba, ca, da) {
        "use strict";
        return (ba < ca) ? ca : ((ba > da) ? da : ba);
    };
    aa.prototype.$SidebarAppTickerResizerf = function (ba) {
        "use strict";
        new i('/ajax/feed/ticker/resize').setData({height: '' + ba}).setMethod('POST').send();
        h.inform('Ticker/resized');
    };
    aa.prototype.$SidebarAppTickerResizer5 = function (ba) {
        "use strict";
        new i('/ajax/feed/apps/resize').setData({height: '' + ba}).setMethod('POST').send();
    };
    aa.prototype.$SidebarAppTickerResizerv = function (ba) {
        "use strict";
        var ca = this.$SidebarAppTickerResizern, da = this.$SidebarAppTickerResizerd * ba / 100;
        new g(this.$SidebarAppTickerResizer0).from('height', ca).to('height', da).duration(z).ondone(function () {
            this.$SidebarAppTickerResizer0.style.height = ba + '%';
            j.resize();
        }.bind(this)).go();
    };
    aa.prototype.$SidebarAppTickerResizer7 = function () {
        "use strict";
        this.$SidebarAppTickerResizera();
        this.$SidebarAppTickerResizerv(0);
        this.$SidebarAppTickerResizerf('0.0');
    };
    aa.prototype.$SidebarAppTickerResizer8 = function () {
        "use strict";
        this.$SidebarAppTickerResizera();
        var ba = ((this.$SidebarAppTickerResizerd - this.$SidebarAppTickerResizerg - y - this.$SidebarAppTickerResizerc) * 50 / this.$SidebarAppTickerResizerd);
        this.$SidebarAppTickerResizerv(ba);
        this.$SidebarAppTickerResizerf(ba);
    };
    e.exports = aa;
}, null);
__d("SidebarTicker", ["Arbiter", "ChatSidebar", "CSS", "DOM", "Run", "TickerController", "$", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    function o() {
        this._ticker = m('pagelet_ticker');
        this._initSubscriptions();
        if (i.hasClass(document.documentElement, 'sidebarMode'))this._onSidebarShow();
    }

    o.hide = function () {
        k.onAfterLoad(function () {
            j.remove(m('pagelet_ticker'));
            j.remove(j.find(document.body, 'div.fbSidebarGripper'));
            h.resize();
        });
    };
    n(o.prototype, {_initSubscriptions: function () {
        this._subscriptions = [g.subscribe('sidebar/show', this._onSidebarShow.bind(this))];
    }, _onSidebarShow: function () {
        l.show(this._ticker);
    }});
    e.exports = o;
}, null);
__d("SyncRequestNotificationBeeperItemContents.react", ["Animation", "CloseButton.react", "ImageBlock.react", "NotificationUserActions", "React", "SyncRequest.react", "SyncRequestStatusEnum", "cx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = k.createClass({displayName: 'SyncRequestNotificationBeeperItemContents', _markAsRead: function () {
        j.markNotificationsAsRead([this.props.beep.notificationID]);
        this.props.onHide();
    }, _onClose: function () {
        this._markAsRead();
        this.props.onHide();
    }, _doFlash: function () {
        new g(this.refs.inner.getDOMNode()).from('opacity', '0').to('opacity', '1').duration(200).go();
    }, componentDidMount: function () {
        if (this.props.beep.rendererData.status != m.PENDING)this.props.onReadyToHide(this.props.beep.notificationID);
    }, componentDidUpdate: function (p) {
        if (this.props.beep.rendererData.status != m.PENDING && p.beep.rendererData.status == m.PENDING)this.props.onReadyToHide(this.props.beep.notificationID);
    }, onRequestStatusUpdate: function (p, q) {
        if (p != m.PENDING && q == m.PENDING)this.props.onReadyToHide(this.props.beep.notificationID);
    }, render: function () {
        var p = this.props.beep, q = p.rendererData;
        return (k.createElement(k.DOM.div, {ref: "inner"}, k.createElement(h, {className: "_3soc", onClick: this._onClose, size: "medium"}), k.createElement(i, {className: "_3soj"}, k.createElement(k.DOM.img, {src: p.actors[0].profile_picture.uri, className: "_3sok"}), k.createElement(k.DOM.div, {className: "_3sol"}, k.createElement(l, {app: q.app, creationTime: q.creation_time, requestId: q.id.toString(), receiver: q.receiver, sender: q.sender, status: q.status, timeout: q.timeout, timeRemaining: q.time_remaining, viewerId: q.receiver.id, onStatusUpdate: this.onRequestStatusUpdate})))));
    }});
    e.exports = o;
}, null);
__d("LiveMessageReceiver", ["Arbiter", "ChannelConstants", "copyProperties", "emptyFunction", "shield"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(m) {
        this.eventName = m;
        this.subs = null;
        this.handler = j;
        this.shutdownHandler = null;
        this.registered = false;
        this.appId = 1;
    }

    i(l, {getAppMessageType: function (m, n) {
        return 'live_message/' + m + ':' + n;
    }, route: function (m) {
        var n = function (o) {
            var p = l.getAppMessageType(m.app_id, m.event_name);
            g.inform(p, o, g.BEHAVIOR_PERSISTENT);
        };
        n(m.response);
    }});
    i(l.prototype, {setAppId: function (m) {
        this.appId = m;
        return this;
    }, setHandler: function (m) {
        this.handler = m;
        this._dirty();
        return this;
    }, setRestartHandler: j, setShutdownHandler: function (m) {
        this.shutdownHandler = k(m);
        this._dirty();
        return this;
    }, _dirty: function () {
        if (this.registered) {
            this.unregister();
            this.register();
        }
    }, register: function () {
        var m = function (o, p) {
            return this.handler(p);
        }.bind(this), n = l.getAppMessageType(this.appId, this.eventName);
        this.subs = {};
        this.subs.main = g.subscribe(n, m);
        if (this.shutdownHandler)this.subs.shut = g.subscribe(h.ON_SHUTDOWN, this.shutdownHandler);
        this.registered = true;
        return this;
    }, unregister: function () {
        if (!this.subs)return this;
        for (var m in this.subs)if (this.subs[m])this.subs[m].unsubscribe();
        this.subs = null;
        this.registered = false;
        return this;
    }});
    e.exports = l;
}, null);
__d("initLiveMessageReceiver", ["Arbiter", "ChannelConstants", "LiveMessageReceiver"], function (a, b, c, d, e, f, g, h, i) {
    g.subscribe(h.getArbiterType('app_msg'), function (j, k) {
        i.route(k.obj);
    });
}, null);
__d("ClearableTypeahead", ["Event"], function (a, b, c, d, e, f, g) {
    var h = {resetOnCloseButtonClick: function (i, j) {
        g.listen(j, 'click', function () {
            var k = i.getCore();
            k.getElement().focus();
            k.reset();
        });
    }};
    e.exports = h;
}, null);
__d("legacy:CompactTypeaheadRenderer", ["CompactTypeaheadRenderer"], function (a, b, c, d) {
    if (!a.TypeaheadRenderers)a.TypeaheadRenderers = {};
    a.TypeaheadRenderers.compact = b('CompactTypeaheadRenderer');
}, 3);