/*!CK:3691766062!*//*1411499528,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["B6bVd"]);
}

__d("TickerReadStateTracking", ["Style", "clickRefAction"], function (a, b, c, d, e, f, g, h) {
    var i = 73, j = 'ticker_hover', k = [];

    function l(n) {
        if (!n)return null;
        var o = JSON.parse(n.getAttribute('data-ft'));
        if (!o)return null;
        if (o.mf_story_key)return o.mf_story_key;
        if (o.fbid)return o.fbid;
        return null;
    }

    function m(n) {
        var o = l(n);
        if (!o || o in k)return;
        k[o] = true;
        var p = {evt: i};
        h(j, n, null, 'FORCE', {ft: p});
    }

    e.exports.log = m;
}, null);
__d("TickerController", ["Event", "Animation", "Arbiter", "AsyncRequest", "AsyncSignal", "Bootloader", "ChannelConstants", "LegacyContextualDialog", "CSS", "DOM", "HTML", "JSLogger", "Keys", "LayerFadeOnHide", "LiveTimer", "NavigationMessage", "Parent", "Rect", "Run", "ScrollableArea", "SelectorDeprecated", "Style", "TickerReadStateTracking", "Toggler", "UIPagelet", "URI", "UserActivity", "UserAgent_DEPRECATED", "Vector", "DOMVector", "BanzaiODS", "$", "clickRefAction", "collectDataAttributes", "containsNode", "copyProperties", "cx", "csx", "ex", "emptyFunction", "ge", "getElementText", "goURI", "throttle", "userAction"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra, sa, ta, ua, va, wa, xa, ya) {
    var za = 1, ab = 2, bb = 3, cb = 4, db = 15000, eb = r.create('ticker_controller');

    function fb() {
    }

    pa(fb, {_instances: {}, _activeInstance: null, _placeholders: {}, _logPositionChange: false, getInstance: function (gb) {
        var hb = w.byClass(la(gb), 'fbFeedTicker');
        return hb ? fb._instances[hb.id] : null;
    }, isLoaded: function (gb) {
        var hb = fb._placeholders[gb.id];
        return !hb || hb.status == bb;
    }, show: function (gb, hb) {
        hb = hb || ta;
        for (var ib in fb._instances) {
            var jb = ua(ib);
            if (!jb || jb.parentNode.id == gb.id)continue;
            fb.hide(jb.parentNode);
        }
        fb._doPositionChange(gb);
        o.show(gb);
        var kb = fb._placeholders[gb.id];
        if (kb && kb.status == za) {
            var lb = (ia.getElementDimensions(gb).y || 0) > 0, mb = gb.id === 'pagelet_rhc_ticker' && !o.hasClass(gb, 'hidden_rhc_ticker');
            if (lb || mb) {
                fb._fetchTickerForPlaceholder(gb, hb);
            } else i.subscribe('Ticker/resized', function () {
                if (kb.status == za)fb._fetchTickerForPlaceholder(gb, hb);
            });
        } else {
            var nb = p.scry(gb, '.fbFeedTicker')[0], ob = nb && fb.getInstance(nb);
            fb._activeInstance = ob;
            ob && ob._poll();
            fb._placeholders[gb.id] = {status: cb, callback: hb};
            hb();
        }
        i.inform('ticker/show', {node: gb, callback: hb});
    }, _doPositionChange: function (gb) {
        if (!fb._logPositionChange || o.shown(gb))return;
        new k('/common/ods_endpoint.php', {k: 'ticker.render.switch.' + gb.id}).send();
    }, hide: function (gb) {
        var hb = p.scry(gb, '.fbFeedTicker')[0], ib = hb && fb.getInstance(hb);
        ib && ib.hideActiveStory();
        o.hide(gb);
    }, hideStoriesByClass: function (gb) {
        for (var hb in fb._instances)p.scry(la(hb), gb).forEach(o.hide);
    }, hideStory: function (gb) {
        var hb = gb && fb.getInstance(gb);
        hb && hb.hideStory(gb);
    }, replaceStory: function (gb, hb) {
        var ib = p.scry(document.body, 'div.fbFeedTickerStory'), jb = fb.getInstance(ib[0]), kb = jb._findStoryById(gb);
        jb.handleRemoveStory();
        o.hide(kb);
        p.insertAfter(kb, hb);
        hb.setAttribute('data-story-id', kb.getAttribute('id'));
        var lb = setTimeout(function () {
            fb.removeMarkup(hb, kb);
        }, db);
        hb.setAttribute('data-timeout-token', lb);
    }, removeMarkup: function (gb, hb) {
        o.addClass(gb, 'removedStoryMarkup');
        new h(gb).to('height', 0).duration(500).ondone(function () {
            p.remove(gb);
        }).go();
    }, undoHideStory: function (gb) {
        var hb = gb && fb.getInstance(gb);
        hb && hb.undoHideStory(gb);
    }, insertStoriesAtBottom: function (gb) {
        fb._activeInstance.insertStoriesAtBottom(gb);
    }, _fetchTickerForPlaceholder: function (gb, hb) {
        var ib = {handler: function () {
            fb._placeholders[gb.id].status = bb;
            hb();
        }};
        ea.loadFromEndpoint('TickerEntStoryPagelet', gb.id, fb._placeholders[gb.id].pageletData, ib);
        fb._placeholders[gb.id].status = ab;
    }, registerStoryDialog: function (gb, hb) {
        i.subscribe('ticker/init', function () {
            var ib = ua(gb), jb = ib && fb.getInstance(ib);
            jb && jb.registerStoryDialog(ib, hb);
        }, i.SUBSCRIBE_ALL);
    }, registerPlaceholder: function (gb, hb) {
        var ib = fb._placeholders[gb];
        fb._placeholders[gb] = {status: za, pageletData: hb};
        if (ib && ib.status == cb) {
            fb.show(la(gb));
            ib.callback();
        }
    }});
    pa(fb.prototype, {ADS_IDLE_MS: 300000, FLYOUT_MAX_HEIGHT: 450, FLYOUT_OFFSET_THRESHOLD: 20, FLYOUT_COMMENT_OFFSET: 15, FLYOUT_VIEWPORT_PADDING: 75, FLYOUT_ACTION_FOOTER_PADDING: 8, FLYOUT_TARGET_HEIGHT_OFFSET: 25, DEFAULT_LOOK_BEHIND: 10, init: function (gb, hb, ib) {
        fb._instances[gb.id] = this;
        fb._activeInstance = this;
        this._root = gb;
        this._content = p.find(gb, '.ticker_stream');
        this._stories = p.find(this._root, '.tickerActivityStories');
        this._scrollableArea = hb;
        this._container = p.find(gb, 'div.uiScrollableAreaWrap');
        this._newestStory = {};
        this._storyIDs = [];
        this._objectIDs = [];
        this._fetchedStories = {};
        this._fetchedStoriesDialog = {};
        this._storyDialogResources = {};
        this._removedStoryIDs = [];
        this._storiesToRemove = [];
        var jb = Date.now();
        this._initTime = jb;
        this._lastUpdate = jb;
        this._lastPull = jb;
        this._lastInsert = jb;
        this._lastCustomStory = 0;
        this._pollOnly = false;
        this._needNonCustomStoryNum = 0;
        this._doCustomUpdate = true;
        this._autoloadStoryIndex = 1;
        this._scrollTopThreshold = 100;
        this._scrollTopPrompt = p.find(this._root, '.scrollTopPrompt');
        this._scrollTopPromptVisible = false;
        this._maxStoriesToKeep = 50;
        this._minStoriesToKeep = 25;
        this._tickerInSidebarMode = !!w.byClass(this._root, 'fbChatSidebar');
        this._loadStoriesWithActions();
        ma('ticker_flyout');
        ma('ticker_flyout_prefetch');
        ma('ticker_flyout_loadtime');
        ma('ticker_stream');
        this._ua = {flyout: ya('ticker').uai('flyout', 'flyout', false), flyout_prefetch: ya('ticker').uai('flyout_prefetch', 'flyout_prefetch', false), flyout_loadtime: ya('ticker').uai('ticker_flyout_loadtime', 'flyout_loadtime', false), stream: ya('ticker').uai('ticker_stream', 'stream', false)};
        this._uaCurStoryIDFetch = null;
        this._uaCurStoryIDPrefetch = null;
        var kb = p.create('div', {className: 'storyQueue hidden_elem'});
        this._storyQueue = kb;
        p.appendContent(this._root, kb);
        this._lastKStories = {head: null, tail: null, count: 0, actors: {}, apps: {}, stories: {}};
        this._dedupeKeys = {};
        this._initObjectIDs();
        this._initConfig(ib);
        this._resetMorePager();
        this._initListeners();
        this._initSubscriptions(ib);
        i.inform('ticker/init', this, i.BEHAVIOR_PERSISTENT);
        this._poll();
    }, _lastKStoriesInsert: function (gb) {
        this._lastKStories.stories[gb.getAttribute("data-story-key")] = true;
        var hb = {story: gb, next: null};
        if (this._lastKStories.head)this._lastKStories.head.next = hb;
        this._lastKStories.head = hb;
        this._lastKStories.count++;
        if (!this._lastKStories.tail)this._lastKStories.tail = this._lastKStories.head;
        var ib = gb.getAttribute("data-actor");
        if (!this._lastKStories.actors[ib])this._lastKStories.actors[ib] = 0;
        this._lastKStories.actors[ib]++;
        var jb = gb.getAttribute("data-app");
        if (jb) {
            if (!this._lastKStories.apps[jb])this._lastKStories.apps[jb] = 0;
            this._lastKStories.apps[jb]++;
        }
        if (this._lastKStories.count > this.DEFAULT_LOOK_BEHIND) {
            while (this._lastKStories.tail && !this._lastKStoriesRemove(this._lastKStories.tail.story))this._lastKStories.tail = this._lastKStories.tail.next;
            if (!this._lastKStories.tail)this._lastKStories.head = null;
        }
    }, _lastKStoriesRemove: function (gb) {
        var hb = gb.getAttribute("data-story-key"), ib = gb.getAttribute("data-actor"), jb = gb.getAttribute("data-app");
        if (this._lastKStories.stories[hb]) {
            delete this._lastKStories.stories[hb];
            this._lastKStories.actors[ib]--;
            if (jb)this._lastKStories.apps[jb]--;
            this._lastKStories.count--;
            return true;
        } else return false;
    }, _loadStoriesWithActions: function () {
        var gb = ua('rightCol');
        if (!gb)return;
        this._toggleWrapper = p.scry(gb, '.tickerToggleWrapper')[0];
        if (this._toggleWrapper) {
            var hb = p.scry(this._stories, '.tickerStoryWithButton');
            this._storiesWithActions = {};
            for (var ib = 0; ib < hb.length; ib++) {
                var jb = hb[ib];
                this._storiesWithActions[jb.getAttribute('data-story-key')] = jb;
            }
        }
    }, _initConfig: function (gb) {
        pa(this, {_newest: gb.newest, _page_newest: gb.newest, _timeout: gb.timeout, _heartbeatTimeout: Math.min(5000, gb.heartbeatTimeout), _maxHeartbeatTimeout: Math.max(30000, gb.maxHeartbeatTimeout), _pullTimeout: Math.max(30000, gb.pullTimeout), _insertTimeout: gb.insertTimeout, _friendCount: gb.friendCount, _maxQueueLength: gb.maxQueueLength, _heartbeatEndpoint: gb.heartbeatEndpoint, _maxCustomQueueLength: gb.maxCustomQueueLength, _customStoryInsertTimeout: Math.max(5000, gb.customStoryInsertTimeout), _nonCustomToCustomStoryRatio: gb.nonCustomToCustomStoryRatio, _minForceUpdateInterval: Math.max(gb.insertTimeout, gb.minForceUpdateInterval), _popupOnHover: gb.popupOnHover, _priorityAppId: gb.priorityAppId, _userIdleTimeout: gb.userIdleTimeout, _firstCustomStoryDelay: gb.firstCustomStoryDelay, _pollOnly: gb.pollOnly, _tickerSource: gb.tickerSource, _logFlyouts: gb.logFlyouts, _userScrollGaurdDelay: gb.userScrollGaurdDelay, _rescheduleScrollToTopDelay: gb.rescheduleScrollToTopDelay, _aggressiveRegulator: gb.aggressiveRegulator});
        this._queueCustomStories(gb.customStories);
    }, _initListeners: function () {
        this._listeners = g.listen(this._root, {click: this._handleClick.bind(this), keydown: this._handleKeydown.bind(this), mouseout: this._handleMouseout.bind(this), mouseover: this._handleMouseover.bind(this), mousedown: this._tickerDeClicker.bind(this), mouseup: this._handleMouseup.bind(this)});
        this._listeners.scroll = g.listen(this._container, 'scroll', this._handleScroll.bind(this));
        setTimeout(this._initInfiniteScrollListener.bind(this), 0);
    }, _initSubscriptions: function (gb) {
        y.onLeave(this._cleanup.bind(this));
        this._subscriptions = [i.subscribe(v.NAVIGATION_BEGIN, this._onNavHandler.bind(this)), i.subscribe('composer/publish', this._handleComposerPublish.bind(this)), i.subscribe('Ticker/storiesInserted', this._handleStoriesInserted.bind(this)), i.subscribe('Ticker/fixed', this._setFixed.bind(this, true)), i.subscribe('Ticker/unfixed', this._setFixed.bind(this, false)), i.subscribe('Ticker/resized', this._checkInfiniteScroll.bind(this)), i.subscribe('ufi/comment', this._scrollDialogToBottom.bind(this)), i.subscribe('ufi/changed', this._redrawFlyout.bind(this)), i.subscribe('Ticker/chatOpened', this._handleChatOpened.bind(this))];
        if (!gb.pollOnly)this._subscriptions.push(i.subscribe(m.getArbiterType('ticker_update'), this._handleTickerPush.bind(this)));
        if (gb.pushChannel && !gb.pollOnly)this.setPushChannel(gb.pushChannel);
    }, _handleClick: function (event) {
        if (!(event.button === 1 || event.altKey || event.ctrlKey || event.metaKey))event.prevent();
        var gb = event.getTarget();
        if (this._getButtonFromNode(gb)) {
            this._logUserAction(gb, 'click', event);
            this._handleActionButton(event);
            return;
        }
        var hb = this._getStoryFromNode(gb), ib = w.byClass(gb, 'tickerStoryAllowClick');
        if (!hb || hb == this._selectedStory || ib)return;
        if (this._storyIsHidden(hb))return;
        if (hb == this._activeStory && !this._selectedStory)this._selecting = true;
        this._logUserEvent('flyout', 'click');
        this._logUserEvent('flyout_loadtime', 'open');
        if (this._storyCanOpenExternally(hb)) {
            var jb = hb.getAttribute('data-href');
            if (jb && !gb.getAttribute('href')) {
                var kb = {href: jb}, lb = na(gb, ['ft', 'gt']);
                ma('click', kb, event, 'FORCE', lb);
                ya('ticker', kb, event).uai('click');
            } else this._logUserAction(gb, 'click', event);
            this._openStoryExternally(hb, event);
            return;
        }
        this._logUserAction(gb, 'flyout', event);
        this._activateStory(hb, 'click');
        this._selectStory(hb);
    }, _handleMouseover: function (event) {
        this._setLocked(true);
        var gb = event.getTarget(), hb = this._getOpenableStory(gb);
        if (!hb) {
            var ib = w.byClass(gb, "_5wvy");
            if (ib) {
                clearTimeout(parseInt(ib.getAttribute('data-timeout-token'), 10));
                var jb = setTimeout(function () {
                    fb.removeMarkup(ib, hb);
                }, db);
                ib.setAttribute('data-timeout-token', jb);
            }
            return;
        }
        event.kill();
        if (this._popupOnHover) {
            if (!(hb.id in this._fetchedStories)) {
                this._logUserEvent('flyout_prefetch', 'prefetch_on_hover');
                this._uaCurStoryIDPrefetch = hb.id;
            }
            this._fetchStory(hb);
        }
        if (this._selectedStory)return;
        if (this._popupOnHover) {
            this._clearHoverTimeouts();
            var kb = this._storyCanOpenExternally(hb) ? 500 : 1000, lb = this._activeStory ? 75 : kb;
            this._hoverShowTimeout = this._setTimeout(function () {
                this._logUserEvent('flyout', 'hover', lb);
                this._logUserEvent('flyout_loadtime', 'open');
                this._activateStory(hb, 'hover');
                this._logUserAction(gb, 'flyout', event);
            }.bind(this), lb);
        }
    }, _handleMouseout: function (event) {
        var gb = event.getTarget();
        this._setLocked(false);
        if (gb == this._getStoryFromNode(gb)) {
            var hb = p.scry(gb.parentNode, '.openToggler');
            for (var ib = 0; ib < hb.length; ib++)aa.toggle(hb[ib]);
        }
        this._clearClickedStory();
        this._scheduleHide();
    }, _handleKeydown: function (event) {
        this._tickerDeClicker(event);
        var gb = this._activeStory;
        if (!gb)return;
        var hb = g.getKeyCode(event);
        switch (hb) {
            case s.UP:
            case s.DOWN:
                var ib = this._getInsertedStories(), jb;
                if (event.getModifiers().any) {
                    jb = hb === s.UP ? 0 : ib.length - 1;
                } else jb = ib.indexOf(gb) + (hb === s.UP ? -1 : 1);
                gb = ib[jb];
                break;
            case s.ESC:
                this._deactivateStory(true);
                return;
            default:
                return;
        }
        event.kill();
        if (!gb)return;
        this._activateStory(gb, 'keypress');
        this._selectStory(gb);
    }, _fadeTopmostStoryButton: function () {
        var gb = 0, hb = 15;
        if (this._storiesWithActions)for (var ib in this._storiesWithActions) {
            var jb = this._storiesWithActions[ib], kb = p.scry(jb, '.tickerInlineActionButton')[0], lb = p.scry(kb, '.tickerActionIcon')[0], mb = ia.getElementPosition(kb).y - ia.getElementPosition(this._toggleWrapper).y;
            if (mb < gb) {
                ba.set(kb, 'opacity', 0);
                ba.set(lb, 'opacity', 0);
            } else if (mb >= gb && mb < hb) {
                var nb = (mb - gb) / (hb - gb);
                ba.set(kb, 'opacity', nb);
                ba.set(lb, 'opacity', nb);
                break;
            } else {
                ba.set(kb, 'opacity', 1);
                ba.set(lb, 'opacity', 1);
            }
        }
    }, _handleScroll: function () {
        if (!this._preventScrollDismiss) {
            this._deactivateStory(true);
        } else this._preventScrollDismiss = false;
        if (!this._handleScrollThrottled)this._handleScrollThrottled = xa(this._handleScrollInner.bind(this));
        this._handleScrollThrottled();
    }, _handleScrollInner: function () {
        this._fadeTopmostStoryButton();
        this._checkInfiniteScroll();
        this._setIsUserScrolling();
        if (!this._scrollLogged) {
            this._scrollLogged = true;
            var gb = this._stories.childNodes.length, hb = this._stories.getAttribute('data-gt'), ib = {ticker_scroll: 1, number_stories: gb, source: hb};
            ma('scroll', null, null, 'FORCE', {gt: ib});
            ya('ticker').uai('scroll');
        }
    }, _setIsUserScrolling: function () {
        clearTimeout(this._userScrollingToken);
        if (this._isScrolledToTop()) {
            this._userScrolling = false;
            return;
        }
        this._userScrolling = true;
        this._userScrollingToken = setTimeout(function () {
            this._userScrolling = false;
            this._userScrollingToken = null;
        }.bind(this), this._userScrollGaurdDelay);
    }, _isUserScrolling: function () {
        return this._userScrolling;
    }, _handleStoriesInserted: function () {
        this._initInfiniteScrollListener();
        if (this._scrollableArea instanceof z) {
            this._scrollableArea.adjustGripper();
        } else eb.error('wrong_scrollable_area', {dump: this});
        this._logUserEvent('stream', 'insert');
    }, _handleActionButton: function (event) {
        var gb = event.getTarget(), hb = this._getOpenableStory(gb), ib = this._getStoryDialog(hb);
        if (ib)var jb = ib.subscribe('beforehide', function () {
            ib.unsubscribe(jb);
            return false;
        });
    }, _handleScrollToTopClick: function () {
        this._scrollToTop(this._poll.bind(this));
    }, _scheduleScrollToTop: function () {
        this._scrollToTopToken && clearTimeout(this._scrollToTopToken);
        this._scrollToTopToken = setTimeout(function () {
            if (this._isLocked() || this._isUserScrolling()) {
                this._scheduleScrollToTop();
            } else {
                this._scrollToTopToken = null;
                this._scrollToTop();
            }
        }.bind(this), this._rescheduleScrollToTopDelay);
    }, _scrollToTop: function (gb) {
        new h(this._container).to('scrollTop', 0).ease(h.ease.end).ondone(gb).go();
    }, _clearHoverTimeouts: function () {
        clearTimeout(this._hoverShowTimeout);
        clearTimeout(this._hoverHideTimeout);
    }, _getAllStories: function () {
        return p.scry(this._root, 'div.fbFeedTickerStory');
    }, _findStoryById: function (gb) {
        var hb = p.scry(this._root, '.fbFeedTickerStory'), ib;
        for (story in hb) {
            ib = hb[story];
            if (gb == this._getStoryDialogParams(ib).token)return ib;
        }
        return null;
    }, _getInsertedStories: function () {
        return this._getAllStories().filter(function (gb) {
            return !o.hasClass(gb, 'queuedStory') && !o.hasClass(gb, 'customStory');
        });
    }, _getQueuedStories: function () {
        return p.scry(this._storyQueue, '.fbFeedTickerStory.queuedStory');
    }, _getQueuedCustomStories: function () {
        return p.scry(this._storyQueue, '.fbFeedTickerStory.customStory');
    }, _getButtonFromNode: function (gb) {
        return w.byClass(gb, 'tickerInlineOverlay');
    }, _getStoryFromNode: function (gb) {
        return w.byClass(gb, 'fbFeedTickerStory');
    }, _getActionButtonFromStory: function (gb) {
        return p.scry(gb, '.tickerInlineActionButton')[0];
    }, _getOpenableStory: function (gb) {
        var hb = this._getStoryFromNode(gb);
        return this._storyCanOpenDialog(hb) ? hb : null;
    }, _getStoryDialog: function (gb) {
        return this._fetchedStoriesDialog[gb.id] || n.getInstance(gb);
    }, _getStoryDialogParams: function (gb) {
        var hb = gb && gb.getAttribute('data-flyoutdata') || null;
        return hb && JSON.parse(hb) || null;
    }, _storyCanOpenDialog: function (gb) {
        return !!this._getStoryDialogParams(gb) && !this._storyIsHidden(gb);
    }, _storyCanOpenExternally: function (gb) {
        return !!gb.getAttribute('data-href') || !this._storyCanOpenDialog(gb);
    }, _storyIsHidden: function (gb) {
        return o.hasClass(gb, 'tickerStoryHidden');
    }, hideActiveStory: function () {
        this._activeStory && this.hideStory(this._activeStory);
    }, hideStory: function (gb) {
        this._deactivateStory();
        if (va(gb) === '')p.remove(gb);
        o.addClass(gb, 'tickerStoryHidden');
        o.removeClass(gb, 'tickerStoryClickable');
    }, undoHideStory: function (gb) {
        o.addClass(gb, 'tickerStoryClickable');
        o.removeClass(gb, 'tickerStoryHidden');
    }, insertStoriesAtBottom: function (gb) {
        if (!gb)return;
        var hb = p.create('div');
        hb.appendChild(gb);
        var ib = p.scry(hb, '.fbFeedTickerStory'), jb = p.find(hb, '.tickerMorePager'), kb = [];
        for (var lb = 0; lb < ib.length; lb++)if (!this.dedupeStory(ib[lb]))kb.push(ib[lb]);
        if (kb.length) {
            kb.push(jb);
            p.replace(p.find(this._root, '.tickerMorePager'), kb);
        }
        i.inform('Ticker/storiesInserted');
    }, _scheduleHide: function () {
        if (this._popupOnHover && !this._selectedStory) {
            this._clearHoverTimeouts();
            this._hoverHideTimeout = this._setTimeout(this._deactivateStory.bind(this), 100);
        }
    }, _setScrollTopPromptVisible: function (gb) {
        this._scrollTopPromptVisible = gb;
        o.conditionShow(this._scrollTopPrompt, gb);
        if (gb && !this._listeners.scrollTop) {
            this._listeners.scrollTop = g.listen(this._scrollTopPrompt, {click: this._handleScrollToTopClick.bind(this)});
        } else if (!gb && this._listeners.scrollTop) {
            this._listeners.scrollTop.click.remove();
            this._listeners.scrollTop = null;
        }
    }, _isUserIdle: function () {
        return !ga.isActive(this._userIdleTimeout);
    }, _schedulePoll: function () {
        clearTimeout(this._pollToken);
        this._pollToken = this._setTimeout(this._poll.bind(this), this._timeout);
    }, _poll: function () {
        if (!this._isTickerVisible())return;
        if (this._storiesToRemove.length > 0) {
            if (this._isInsertingStory)return this._schedulePoll();
            var gb = this._storiesToRemove.pop();
            this.removeStory(gb);
        }
        var hb = !this._isScrolledToTop() && this._getQueuedStories().length;
        this._setScrollTopPromptVisible(hb);
        var ib = Date.now(), jb = ib - this._lastInsert;
        if (jb < this._insertTimeout || this._isLocked())return this._schedulePoll();
        var kb = this._getQueuedStories(), lb = this._getQueuedCustomStories(), mb = this._isUserIdle(), nb = kb.length > 0, ob = lb.length > 0 && !mb && (ib - this._initTime > this._firstCustomStoryDelay) && (this._needNonCustomStoryNum === 0 || (!nb && (ib - this._lastCustomStory) > this._customStoryInsertTimeout));
        if (ob) {
            this.insertStory(lb.shift());
            this._lastCustomStory = ib;
            this._needNonCustomStoryNum = this._nonCustomToCustomStoryRatio;
            return this._schedulePoll();
        }
        if (nb) {
            var pb = kb.shift();
            this.insertStory(pb);
            this._needNonCustomStoryNum--;
            if (this._needNonCustomStoryNum < 0)this._needNonCustomStoryNum = 0;
            return this._schedulePoll();
        }
        if (mb)return ga.subscribeOnce(this._poll.bind(this));
        var qb = lb.length === 0 && this._needNonCustomStoryNum === 0 && this._nonCustomToCustomStoryRatio > 0 && ga.isActive(this.ADS_IDLE_MS) && ((ib - this._lastUpdate) > this._minForceUpdateInterval), rb = false, sb = false;
        if (this._pollOnly) {
            sb = ib - this._lastUpdate > this._heartbeatTimeout;
        } else rb = (ib - this._lastPull > this._pullTimeout);
        var tb = (qb && this._doCustomUpdate) || rb || sb;
        if (!tb)return this._schedulePoll();
        if (qb)this._doCustomUpdate = false;
        this.update({pull: rb, fullpoll: sb, needcustomstory: qb});
    }, _updatePollOnlyHeartbeatTimeout: function () {
        if (this._pollOnly && this._heartbeatTimeout < this._maxHeartbeatTimeout)this._heartbeatTimeout = Math.min(this._heartbeatTimeout + 5000, this._maxHeartbeatTimeout);
    }, update: function (gb) {
        this._updatePollOnlyHeartbeatTimeout();
        if (!this._pollOnly)return this._schedulePoll();
        var hb = {newest: (gb.fullpoll || gb.cache_update) ? this._newest : this._page_newest, storyids: this._storyIDs, friendcount: this._friendCount, priorityappid: this._priorityAppId, source: this._tickerSource, needcustomstory: this._nonCustomToCustomStoryRatio > 0};
        if (!hb.newest || hb.newest === '0')throw new Error(sa('Trying to request new ticker stories with an invalid cursor %s, with' + ' the settings fullpoll %s, cache_update %s, value coming from this.%s', typeof hb.newest === 'string' ? '"' + hb.newest + '"' : hb.newest, gb.fullpoll, gb.cache_update, (gb.fullpoll || gb.cache_update) ? '_newest' : '_page_newest'));
        pa(hb, gb);
        new j().setURI(this._heartbeatEndpoint).setReadOnly(true).setOption('retries', 0).setData(hb).setHandler(this._handleResponse.bind(this)).setFinallyHandler(this._poll.bind(this)).setAllowCrossPageTransition(true).send();
        this._lastUpdate = Date.now();
        if (hb.pull)this._lastPull = this._lastUpdate;
        this._storyIDs = [];
    }, insertStory: function (gb, hb, ib) {
        this._lastInsert = Date.now();
        window.LiveTimer && u.addTimeStamps(gb);
        o.removeClass(gb, 'queuedStory');
        o.removeClass(gb, 'customStory');
        if (hb !== false) {
            var jb = ib ? this._fadeStoryIn : this._flyStoryIn;
            if (this._isUserScrolling()) {
                var kb = function () {
                    this._container.scrollTop = this._container.scrollTop + this._stories.firstChild.offsetHeight;
                    this._scheduleScrollToTop();
                }.bind(this);
                this._fadeStoryIn(gb, kb);
            } else this._scrollToTop(jb.bind(this, gb));
        } else p.prependContent(this._stories, gb);
        if (this._storiesWithActions && o.hasClass(gb, 'tickerStoryWithButton'))this._storiesWithActions[gb.getAttribute('data-story-key')] = gb;
        this._removeOldStories();
    }, _removeOldStories: function () {
        var gb = this._getInsertedStories();
        if (gb.length <= this._maxStoriesToKeep)return;
        var hb = this._minStoriesToKeep, ib = gb.slice(hb);
        ib.forEach(p.remove);
        if (this._storiesWithActions)for (var jb = 0; jb < ib.length; jb++)delete this._storiesWithActions[ib[jb].getAttribute('data-story-key')];
        this._resetMorePager();
    }, _resetMorePager: function () {
        var gb = this._getInsertedStories();
        if (!gb || !gb.length)return;
        var hb = gb[gb.length - 1].getAttribute('data-ticker-timestamp'), ib = p.scry(this._root, '.tickerMorePager a')[0];
        if (!ib || !hb)return;
        var jb = new fa(ib.getAttribute('ajaxify'));
        jb.addQueryData({oldest: hb});
        ib.setAttribute('ajaxify', jb);
    }, _setLocked: function (gb) {
        this._locked = gb;
    }, _isLocked: function () {
        return !!(this._locked || this._activeStory);
    }, informAndRemoveStory: function (gb, hb, ib) {
        var jb = this._getStoryFromNode(gb), kb = jb.getAttribute('data-story-key');
        p.setContent(jb, hb);
        o.addClass(jb, 'highlightedStory');
        this._setTimeout(this.removeStory.bind(this, kb), ib || 6000);
    }, _getStoryByStoryKey: function (gb) {
        var hb = this._getAllStories();
        for (var ib = 0; ib < hb.length; ib++) {
            var jb = hb[ib];
            if (jb.getAttribute('data-story-key') == gb)return jb;
        }
        return null;
    }, removeStory: function (gb) {
        this._removedStoryIDs[gb] = true;
        var hb = this._getStoryByStoryKey(gb);
        if (!hb)return;
        if (this._storiesWithActions)delete this._storiesWithActions[gb];
        if (hb == this._activeStory)this._deactivateStory();
        var ib = this._getStoryDialog(hb);
        ib && ib.destroy();
        this._lastKStoriesRemove(hb);
        var jb = hb.getAttribute("data-dedupe-key");
        if (jb)delete this._dedupeKeys[jb];
        if (o.hasClass(hb, 'queuedStory')) {
            p.remove(hb);
            return;
        }
        this._animateStoryOut(hb);
    }, _isScrolledToTop: function () {
        return this._container.scrollTop <= this._scrollTopThreshold;
    }, _flyStoryIn: function (gb) {
        var hb = p.create('div', {style: {marginTop: '-1000px'}}, gb);
        ba.set(hb, 'opacity', 0);
        p.prependContent(this._stories, hb);
        var ib = ia.getElementDimensions(hb).y;
        ba.set(hb, 'marginTop', '-' + ib + 'px');
        this._isInsertingStory = true;
        new h(hb).to('marginTop', 0).ease(h.ease.end).checkpoint(.5).to('opacity', 1).ondone(function () {
            p.replace(hb, gb);
            this._afterInsert(gb);
            this._isInsertingStory = false;
        }.bind(this)).go();
    }, _fadeStoryIn: function (gb, hb) {
        new h(this._stories).to('opacity', .5).ondone(function () {
            p.prependContent(this._stories, gb);
            if (hb)hb();
            new h(this._stories).to('opacity', 1).ondone(function () {
                this._afterInsert(gb);
            }.bind(this)).go();
        }.bind(this)).go();
    }, _animateStoryOut: function (gb) {
        var hb = p.create('div', {style: {overflow: 'hidden', position: 'relative'}});
        p.insertBefore(gb, hb);
        p.appendContent(hb, gb);
        new h(hb).to('top', 20).to('height', 0).to('opacity', 0).ease(h.ease.end).ondone(function () {
            p.remove(hb);
            i.inform('Ticker/animateOut');
        }.bind(this)).go();
    }, _afterInsert: function (gb) {
        i.inform('Ticker/afterInsert');
    }, setPushChannel: function (gb) {
        this._pushSubscription && this._pushSubscription.unsubscribe();
        this._pushSubscription = i.subscribe(m.getArbiterType(gb), this._handleTickerPush.bind(this));
        d(['ChatConfig', 'ChannelConnection'], function (hb, ib) {
            this._channelConnection = ib;
            this._checkChannelConnection();
            this._channelConnectionSubscription = this._channelConnection.subscribe([this._channelConnection.CONNECTED, this._channelConnection.RECONNECTING, this._channelConnection.SHUTDOWN, this._channelConnection.MUTE_WARNING, this._channelConnection.UNMUTE_WARNING], this._handleChannelConnection.bind(this));
        }.bind(this));
    }, _checkChannelConnection: function () {
        o.conditionClass(this._root, 'disconnected', this._channelConnection.disconnected());
    }, setCurrentAppId: function (gb) {
        this._priorityAppId = gb;
    }, _handleTickerPush: function (gb, hb) {
        var ib = hb.obj;
        if (ib.delete_id) {
            this._storiesToRemove.push(ib.delete_id);
            return;
        }
        if (ib.fromups)if (ib.do_logging)this._logDarkLaunch(ib);
        var jb = ib.story_xhp;
        if (!jb)return;
        var kb = q(jb).getRootNode();
        if (!ib.story_time || ib.story_time === '0')throw new Error(sa('An invalid story time was pushed: %s, for ticker story: %s', typeof ib.story_time === 'string' ? '"' + ib.story_time + '"' : ib.story_time, kb.getAttribute('data-flyoutdata')));
        this._newest = ib.story_time;
        this.queueStory(kb, ib.flyout_js_cmds);
        if (this._aggressiveRegulator && ib.actor == this._newestStory.actorID) {
            this.removeStory(this._newestStory.storyKey);
            new k('/common/ods_endpoint.php', {k: 'ticker.aggr.remove'}).send();
        }
        this._newestStory = {actorID: ib.actor, storyKey: kb.getAttribute('data-story-key')};
    }, _handleComposerPublish: function (gb, hb) {
        hb.tickerMarkup && this.insertStory(hb.tickerMarkup);
    }, _logDarkLaunch: function (gb) {
        var hb = {actor: gb.actor, story_time: gb.story_time, key: gb.story_obj_id, dark: 1};
        new j().setURI('/alite/push/log.php').setData({msg: JSON.stringify(hb)}).send();
    }, _logRender: function () {
        if (this._loggedRender)return;
        var gb = this._tickerInSidebarMode;
        if (gb || w.byClass(this._content, 'home_right_column')) {
            new k('/ajax/log_ticker_render.php', {sidebar_mode: gb}).send();
            this._loggedRender = true;
        }
    }, _isTickerVisible: function () {
        var gb = (fb._activeInstance == this);
        gb && this._logRender();
        return gb;
    }, _handleResponse: function (gb) {
        var hb = gb.getPayload();
        if (hb.newest)this._newest = this._page_newest = hb.newest;
        if (hb.content)if (hb.content instanceof Array) {
            for (var ib = 0; ib < hb.content.length; ib++)this.queueStoryMarkup(hb.content[ib]);
        } else this.queueStoryMarkup(hb.content);
        if (hb.custom_stories && hb.custom_stories.length) {
            this._queueCustomStories(hb.custom_stories);
            this._doCustomUpdate = true;
        }
    }, queueStoryMarkup: function (gb) {
        var hb = q(gb).getRootNode();
        this.queueStory(hb);
    }, dedupeStory: function (gb) {
        var hb = gb.getAttribute('data-story-key'), ib = hb && (!!this._objectIDs[hb] || !!this._removedStoryIDs[hb]);
        ib = ib || !!this._lastKStories.actors[gb.getAttribute('data-actor')] || !!this._lastKStories.apps[gb.getAttribute('data-app')];
        var jb = gb.getAttribute('data-dedupe-key');
        ib = ib || jb && this._dedupeKeys[jb];
        if (gb.getAttribute('data-force-push'))ib = false;
        hb && (this._objectIDs[hb] = true);
        return ib;
    }, queueStory: function (gb, hb) {
        if (this.dedupeStory(gb))return;
        this._lastKStoriesInsert(gb);
        var ib = gb.getAttribute("data-dedupe-key");
        if (ib)this._dedupeKeys[ib] = true;
        o.addClass(gb, 'queuedStory');
        p.appendContent(this._storyQueue, gb);
        var jb = hb && hb.length;
        if (jb)hb.forEach(function (lb) {
            new Function(lb).apply();
        });
        gb.setAttribute('id', gb.id + '_' + this._root.id);
        var kb = this._getQueuedStories();
        kb.slice(0, -this._maxQueueLength).forEach(p.remove);
        if (jb)this._fetchedStories[gb.id] = true;
    }, _queueCustomStories: function (gb) {
        while (gb.length) {
            var hb = gb.shift();
            hb = q(hb).getRootNode();
            if (this.dedupeStory(hb))continue;
            o.addClass(hb, 'customStory');
            p.appendContent(this._storyQueue, hb);
        }
        var ib = this._getQueuedCustomStories();
        ib.slice(0, -this._maxQueueLength).forEach(p.remove);
    }, _cleanup: function () {
        fb._placeholders.pagelet_rhc_ticker = null;
        if (!w.byClass(this._content, 'hasRightCol'))return;
        this._objectIDs = [];
        this._subscriptions.forEach(i.unsubscribe);
        this._channelConnectionSubscription && this._channelConnection.unsubscribe(this._channelConnectionSubscription);
        this._pushSubscription && this._pushSubscription.unsubscribe();
        for (var gb in this._listeners)this._listeners[gb] && this._listeners[gb].remove();
        clearTimeout(this._pollToken);
        this._pollToken = null;
        this._cleanupInputFocusListener();
        this._cleanupContentResizeListener();
        i.inform('Ticker/cleanup');
    }, _onNavHandler: function (gb, hb) {
        var ib = hb.params.key;
        if (ib != 'lf' && ib != 'h')this._cleanup();
    }, registerStoryDialog: function (gb, hb) {
        if (this._uaCurStoryIDFetch == gb.id) {
            this._uaCurStoryIDFetch = null;
            this._logUserEvent('flyout', 'fetch_success');
        }
        if (this._uaCurStoryIDPrefetch == gb.id) {
            this._uaCurStoryIDPrefetch = null;
            this._logUserEvent('flyout_prefetch', 'prefetch_success');
        }
        this._fetchedStories[gb.id] = true;
        this._fetchedStoriesDialog[gb.id] = hb;
        hb.setContext(gb);
        hb.subscribe('hide', this._deactivateStory.bind(this, true));
        hb.subscribe('success', this._focusStory.bind(this, gb));
        hb.subscribe('beforehide', function () {
            if (this._selecting) {
                this._selecting = false;
                return false;
            }
        }.bind(this));
        if (this._popupOnHover) {
            hb.subscribe('mouseenter', this._clearHoverTimeouts.bind(this));
            hb.subscribe('mouseleave', this._scheduleHide.bind(this));
            hb.subscribe('show', function () {
                setTimeout(this._highlightDialogScrollbar.bind(this, hb), 0);
                var ib = g.listen(hb.getContent(), 'mousedown', function () {
                    this._selectStory(gb);
                    ib.remove();
                }.bind(this));
            }.bind(this));
        }
        if (gb == this._activeStory) {
            this._logUserEvent('flyout_loadtime', 'show_fetched');
            this._logUserEvent('flyout', 'show');
            this._openDialog(hb);
        }
    }, _highlightDialogScrollbar: function (gb) {
        var hb = p.scry(gb.getContent(), '.uiScrollableArea')[0];
        hb && z.poke(hb);
    }, _openStoryExternally: function (gb, event) {
        var hb = gb.getAttribute('data-href');
        if (!hb || hb == '#')return;
        var ib = gb.getAttribute('data-story-rel');
        switch (ib) {
            case 'theater':
                this._deactivateAndClearStory();
                l.loadModules(["PhotoViewer"], function (lb) {
                    lb.bootstrap(hb, gb);
                });
                return;
            case 'async':
                this._deactivateAndClearStory();
                j.bootstrap(hb, gb);
                return;
        }
        var jb = gb.getAttribute('data-target'), kb = (event.which != 1 || event.getModifiers().any || jb == '_blank');
        kb ? window.open(hb, '_blank') : wa(hb);
    }, _deactivateAndClearStory: function () {
        this._clearHoverTimeouts();
        this._deactivateStory();
    }, _focusStoryWillTriggerScroll: function (gb) {
        var hb = this._container, ib = hb.clientHeight, jb = gb.offsetHeight, kb = hb.scrollTop, lb = kb + ib, mb = gb.offsetTop, nb = mb + jb;
        return mb < kb || nb > lb;
    }, _focusStory: function (gb) {
        if (this._focusStoryWillTriggerScroll(gb))this._preventScrollDismiss = true;
        var hb = new x(gb), ib = w.byClass(gb, 'scrollable'), jb = hb.boundWithin(new x(ib)).getPositionVector(), kb = hb.getPositionVector().sub(jb);
        if (kb.y !== 0)kb.scrollElementBy(ib);
        gb.focus();
    }, _selectStory: function (gb) {
        this._selectedStory = gb;
        o.addClass(gb, 'tickerStorySelected');
        o.addClass(this._root, 'tickerChildSelected');
    }, _activateStory: function (gb, hb) {
        this._clearHoverTimeouts();
        if (gb == this._activeStory || !this._storyCanOpenDialog(gb))return;
        this._deactivateStory();
        this._focusStory(gb);
        this._activeStory = gb;
        o.addClass(gb, 'tickerStoryActive');
        window.Toggler && da.hide();
        if (this._logFlyouts) {
            hb = hb || 'unknown';
            new k('/ajax/feed/ticker/flyout.php', {src: hb}).send();
        }
        ca.log(gb);
        var ib = this._getStoryDialog(gb);
        if (ib) {
            this._logUserEvent('flyout_loadtime', 'show_prefetched');
            this._logUserEvent('flyout', 'show');
            if (this._storyDialogResources[gb.id])l.loadResources(this._storyDialogResources[gb.id]);
            this._openDialog(ib);
            ka.bumpEntityKey('ticker_stories', 'flyouts.open');
            return;
        }
        if (!(gb.id in this._fetchedStories)) {
            this._uaCurStoryIDFetch = gb.id;
            this._logUserEvent('flyout', 'fetch');
        }
        this._fetchStory(gb);
    }, handleRemoveStory: function () {
        this._deactivateStory(true);
    }, _deactivateStory: function (gb) {
        if (this._activeStory === this._deactivatingStory)return;
        this._deactivatingStory = this._activeStory;
        if (this._dialog) {
            if (gb === true) {
                this._dialog.enableBehavior(t);
            } else this._dialog.disableBehavior(t);
            this._dialog.hide();
            this._logUserEvent('flyout', 'close');
        }
        if (this._activeStory) {
            o.removeClass(this._activeStory, 'tickerStoryActive');
            o.removeClass(this._activeStory, 'tickerStorySelected');
            o.removeClass(this._root, 'tickerChildSelected');
        }
        this._dialog = this._selectedStory = this._activeStory = null;
        this._cleanupInputFocusListener();
        this._cleanupContentResizeListener();
        this._deactivatingStory = null;
    }, _logUserAction: function (gb, hb, event) {
        ma(hb, gb, event, 'FORCE');
        ya('ticker', gb, event).uai(hb);
    }, _logUserEvent: function (gb, event) {
        if (this._ua[gb])this._ua[gb].add_event(event);
    }, _fetchStory: function (gb) {
        clearTimeout(this._fetchToken);
        var hb = [], ib = this._getInsertedStories(), jb = ib.indexOf(gb);
        [-1, 0, 1].forEach(function (kb) {
            var lb = ib[jb + kb];
            lb && hb.push(lb);
        }, this);
        this._fetchToken = setTimeout(this._fetchStories.bind(this, hb), 100);
    }, _fetchStories: function (gb) {
        var hb = [], ib, jb = function (kb) {
            clearTimeout(ib);
            gb.forEach(function (lb) {
                o.conditionClass(lb, 'tickerStoryFetching', kb);
            });
        };
        gb = gb.filter(function (kb) {
            if (kb.id in this._fetchedStories)return false;
            this._fetchedStories[kb.id] = true;
            var lb = this._getStoryDialogParams(kb);
            if (!lb)return false;
            lb.uniq_id = kb.getAttribute('id');
            lb.referrer = this._tickerSource;
            hb.push(lb);
            return true;
        }, this);
        if (!hb.length)return;
        ib = this._setTimeout(jb.bind(null, true), 500);
        new j('/ajax/feed/ticker/multi_story').setInitialHandler(this._handleDialogResponse.bind(this, hb)).setFinallyHandler(jb.bind(null, false)).setErrorHandler(ta).setData({stories: hb}).setAllowCrossPageTransition(this._tickerInSidebarMode).send();
    }, _handleDialogResponse: function (gb, hb) {
        if (hb && hb.resource_map) {
            var ib = [];
            for (var jb in hb.resource_map) {
                var kb = hb.resource_map[jb];
                if (kb.type === 'css' && !kb.permanent)ib.push(jb);
            }
            if (ib.length > 0)for (var lb = 0; lb < gb.length; lb++)this._storyDialogResources[gb[lb].uniq_id] = ib;
        }
    }, _tickerDeClicker: function (event) {
        var gb = event.getTarget(), hb = w.byTag(gb, 'a'), ib = this._getStoryFromNode(gb), jb = this._getButtonFromNode(gb);
        if (ib && hb && !jb && o.hasClass(ib, 'tickerStoryClickable') && !o.hasClass(hb, 'tickerStoryAllowClick') && !this._storyIsHidden(ib))hb.setAttribute('rel', 'ignore');
        var kb = (event.button == 2), lb = (event.type === 'keydown'), mb = ib && this._getActionButtonFromStory(ib);
        if (!kb && mb && !lb)this._setClickedStory(ib);
    }, _handleMouseup: function (event) {
        this._clearClickedStory();
    }, _setClickedStory: function (gb) {
        this._clearClickedStory();
        o.addClass(gb, 'tickerStoryClicked');
        this._clickedStory = gb;
    }, _clearClickedStory: function () {
        if (this._clickedStory) {
            o.removeClass(this._clickedStory, 'tickerStoryClicked');
            this._clickedStory = null;
        }
    }, _initInfiniteScrollListener: function () {
        var gb = this._getInsertedStories();
        if (this._storiesWithActions)for (var hb = 0; hb < gb.length; hb++) {
            var ib = gb[hb];
            if (o.hasClass(ib, 'tickerStoryWithButton'))this._storiesWithActions[ib.getAttribute('data-story-key')] = ib;
        }
        var jb = Math.max(0, gb.length - this._autoloadStoryIndex);
        this._infiniteScrollStory = gb[jb];
        this._checkInfiniteScroll();
    }, _checkInfiniteScroll: function () {
        if (this._infiniteScrollStory) {
            var gb = ia.getElementPosition(this._infiniteScrollStory).y, hb = ia.getElementPosition(this._container).y + ia.getElementDimensions(this._container).y;
            if (gb < hb) {
                var ib = p.scry(this._root, '.tickerMorePager a')[0];
                if (ib) {
                    var jb = w.byClass(ib, 'stat_elem') || ib;
                    new j(ib.getAttribute('ajaxify')).setReadOnly(true).setRelativeTo(ib).setStatusElement(jb).setAllowCrossPageTransition(true).send();
                    this._logUserEvent('stream', 'scroll');
                }
                this._infiniteScrollStory = null;
                this._autoloadStoryIndex = 5;
            }
        }
    }, _setFixed: function (gb) {
        if (!this._selectedStory)return;
        var hb = this._getStoryDialog(this._selectedStory);
        if (hb) {
            hb.setFixed && hb.setFixed(gb);
            hb.updatePosition();
        }
    }, _setTimeout: function (gb, hb) {
        return setTimeout(gb, hb, !this._tickerInSidebarMode);
    }, _scrollDialogToBottom: function () {
        var gb = this._dialog && this._dialog.getContent(), hb = gb && p.scry(gb, '.uiScrollableAreaWrap')[0], ib = hb && z.getInstance(hb);
        ib && ib.scrollToBottom();
    }, _redrawFlyout: function (gb, hb) {
        var ib = this._dialog;
        if (ib && ib.isShown() && oa(ib.getContent(), hb.form))this._updateDialogPosition();
    }, _openDialog: function (gb) {
        if (!this._tickerInSidebarMode)o.addClass(gb.getRoot(), 'tickerStoryOverlayOnTop');
        var hb = ja.getScrollPosition();
        this._dialog = gb.show();
        window.scrollTo(hb.x, hb.y);
        this._updateDialogPosition();
        this._writeSwfFrame(gb);
        setTimeout(this._initCommentFocusListener.bind(this), 0);
        setTimeout(this._initContentResizeListener.bind(this), 0);
        this._stupidIE7VideoResizeHack(gb);
    }, _stupidIE7VideoResizeHack: function (gb) {
        if (ha.ie() === 7) {
            var hb = p.scry(gb.getContent(), '.uiVideoThumb .img');
            hb.forEach(function (ib) {
                ba.set(ib, 'width', '');
            });
        }
    }, _updateDialogPosition: function () {
        var gb = this._tickerInSidebarMode || !!w.byClass(this._root, 'fixed_elem');
        this._dialog.setFixed && this._dialog.setFixed(gb);
        this._adjustFlyoutContentHeight();
        this._dialog.updatePosition();
    }, _writeSwfFrame: function (gb) {
        var hb = this._dialog && this._dialog.getContent(), ib = p.scry(hb, '.swfObject')[0];
        if (!ib)return;
        var jb = ib.getAttribute('data-swfid');
        if (jb && window[jb]) {
            var kb = window[jb];
            kb.write(ib);
        }
    }, _initCommentFocusListener: function () {
        var gb = this._dialog && this._dialog.getContent(), hb = gb && p.scry(gb, '.tickerDialogFooter textarea')[0];
        if (!hb)return;
        this._listeners.inputFocus = g.listen(hb, 'focus', this._scrollDialogToBottom.bind(this));
    }, _cleanupInputFocusListener: function () {
        if (this._listeners.inputFocus) {
            this._listeners.inputFocus.remove();
            this._listeners.inputFocus = null;
        }
    }, _initContentResizeListener: function () {
        var gb = this._dialog && this._dialog.getContent();
        if (!gb)return;
        this._listeners.contentResize = g.listen(gb, 'click', function () {
            setTimeout(this._dialog.updatePosition.bind(this._dialog), 0);
        }.bind(this));
    }, _cleanupContentResizeListener: function () {
        if (this._listeners.contentResize) {
            this._listeners.contentResize.remove();
            this._listeners.contentResize = null;
        }
    }, _adjustFlyoutContentHeight: function () {
        var gb = this._dialog && this._dialog.getContent(), hb = gb && p.scry(gb, '.uiScrollableAreaWrap')[0];
        if (!hb)return;
        var ib = ia.getElementDimensions(hb), jb = ia.getElementPosition(hb), kb = p.scry(hb, '.uiUfi .uiUfiComment'), lb = p.scry(hb, "._12tg")[0], mb = this.FLYOUT_MAX_HEIGHT;
        if (lb) {
            var nb = ia.getElementPosition(lb);
            mb = Math.max(mb, this.FLYOUT_TARGET_HEIGHT_OFFSET + this.FLYOUT_ACTION_FOOTER_PADDING + nb.y + lb.offsetHeight - jb.y);
        }
        var ob = ia.getViewportDimensions().y - this.FLYOUT_VIEWPORT_PADDING;
        mb = Math.min(mb, ob);
        var pb = mb - this.FLYOUT_TARGET_HEIGHT_OFFSET;
        for (var qb = 0; qb < kb.length; qb++) {
            var rb = kb[qb], sb = ia.getElementPosition(rb), tb = sb.y - jb.y;
            if (Math.abs(tb - pb) <= this.FLYOUT_OFFSET_THRESHOLD) {
                pb = tb + this.FLYOUT_COMMENT_OFFSET;
                break;
            }
        }
        if (ib.y >= pb) {
            ba.set(hb, 'height', pb + 'px');
            ba.set(hb, 'max-height', null);
        } else {
            ba.set(hb, 'max-height', mb + 'px');
            ba.set(hb, 'height', null);
        }
    }, _initObjectIDs: function () {
        var gb = this._getAllStories();
        for (var hb = gb.length - 1; hb >= 0; hb--) {
            var ib = gb[hb].getAttribute('data-story-key');
            if (ib) {
                this._objectIDs[ib] = true;
                this._lastKStoriesInsert(gb[hb]);
                var jb = gb[hb].getAttribute("data-dedupe-key");
                if (jb)this._dedupeKeys[jb] = true;
            }
        }
    }, _handleChatOpened: function () {
        this._deactivateStory(true);
    }, _handleChannelConnection: function () {
        this._checkChannelConnection();
    }, getNewest: function () {
        return this._newest;
    }});
    e.exports = fb;
}, null);
__d("TickerRightColumnController", ["Arbiter", "CSS", "DOM", "Event", "NavigationMessage", "Run", "Style", "SubscriptionsHandler", "TickerController", "Vector", "ge", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s;

    function t() {
        var y = q('pagelet_rhc_ticker');
        y && o.show(y, v);
    }

    function u() {
        var y = q('pagelet_rhc_ticker');
        y && o.hide(y);
    }

    function v() {
        var y = q('pagelet_rhc_ticker'), z = i.scry(y, '.ticker_container')[0], aa = i.scry(y, '.ticker_stream')[0], ba = q('rightCol');
        if (!y || !z || !aa || !ba)return;
        m.set(z, 'height', '0');
        var ca = 75, da = p.getViewportDimensions().y, ea = p.getElementDimensions(ba).y, fa = da - ea - ca, ga = p.getElementDimensions(aa).y, ha = Math.max(Math.min(fa, ga, s.tickerMaxHeight || 425), s.tickerMinHeight || 225);
        m.set(z, 'height', ha + 'px');
    }

    function w(y) {
        var z = q('pagelet_reminders'), aa = q('pagelet_rhc_ticker'), ba = z && i.scry(z, 'div.tickerToggleWrapper')[0], ca = aa && i.scry(aa, 'div.tickerToggleWrapper')[0];
        ba && h.conditionClass(ba, 'displayedTickerToggleWrapper', !y);
        ca && h.conditionClass(ca, 'displayedTickerToggleWrapper', y);
        aa && h.conditionClass(aa, 'hidden_rhc_ticker', !y);
        if (y) {
            v();
            var da = q('fbTickerClosedEd');
            da && h.hide(da);
        }
    }

    var x = {init: function (y) {
        s = y;
        var z = new n();
        if (s.enableSidebar)z.addSubscriptions(g.subscribe('sidebar/hide', t), g.subscribe('sidebar/show', u), g.subscribe('minisidebar/show', t), g.subscribe('LitestandClassicRHC/loaded', v), j.listen(window, 'scroll', r(function () {
            var ba = i.scry(q('pagelet_rhc_ticker'), '.fbFeedTicker')[0], ca = ba && o.getInstance(ba);
            ca && ca.handleRemoveStory();
        })));
        if (!h.hasClass(document.documentElement, 'sidebarMode')) {
            t();
        } else if (s.enableSidebar)u();
        var aa = function () {
            z.release();
        };
        g.subscribeOnce(k.NAVIGATION_BEGIN, aa);
        l.onLeave(aa);
    }, initRHCTickerHider: function (y) {
        j.listen(y, 'click', this.hideRHCTicker);
    }, showRHCTicker: function () {
        w(true);
    }, hideRHCTicker: function () {
        w(false);
    }};
    e.exports = x;
}, null);
__d("legacy:TickerController", ["TickerController"], function (a, b, c, d) {
    a.TickerController = b('TickerController');
}, 3);