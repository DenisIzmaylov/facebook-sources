/*!CK:3438380827!*//*1401163522,178183207*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["Rs18G"]);
}

__d("legacy:PhotoSnowlift", ["PhotoSnowlift"], function (a, b, c, d) {
    a.PhotoSnowlift = b('PhotoSnowlift');
}, 3);
__d("PhotoViewerFollow", ["Arbiter", "AsyncRequest", "BanzaiODS", "CSS", "DOM", "Event", "Parent", "PhotosConst", "$", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = {};

    function r(s) {
        "use strict";
        this.viewer = s;
    }

    r.prototype.init = function (s, t, u, v, w, x, y) {
        "use strict";
        this.subscribeLink = s;
        this.unsubscribeFlyout = t;
        this.subscribeEndpoints = w;
        this.unsubscribeEndpoints = x;
        this.unsubLinks = v;
        this.unsubDiv = u;
        this.reset();
        this.activate();
        this.type = y;
        l.listen(this.subscribeLink, 'click', function (event) {
            if (m.byClass(event.getTarget(), 'photoViewerFollowLink'))this.subscribePhotoOwner();
        }.bind(this));
        l.listen(this.unsubLinks.user, 'click', this.unsubscribePhotoOwner.bind(this));
        l.listen(this.unsubLinks.page, 'click', this.unsubscribePhotoOwner.bind(this));
        g.subscribe(['FollowUser', 'FollowUserFail', 'UnfollowUser', 'UnfollowUserFail'], this.updateSubscribe.bind(this));
        g.subscribe(this.viewer.getEventString('DATA_CHANGE'), this.showSubscribeLinkOnChange.bind(this));
        if (this.viewer.getVersionConst() === n.VIEWER_SNOWLIFT) {
            g.subscribe(this.viewer.getEventString('CLOSE'), this.reset.bind(this));
            g.subscribe(this.viewer.getEventString('OPEN'), this.activate.bind(this));
        }
        this.registerUnsubscribeTarget();
    };
    r.prototype.activate = function () {
        "use strict";
        this.activated = true;
    };
    r.prototype.reset = function () {
        "use strict";
        this.unsubscribeFlyout && this.unsubscribeFlyout.clearNodes();
        this.subscriptionChange = {};
        this.activated = false;
    };
    r.prototype.registerUnsubscribeTarget = function () {
        "use strict";
        if (!this.unsubscribeFlyout)return;
        var s = k.scry(this.subscribeLink, '.photoViewerFollowedMsg')[0];
        if (s && !j.hasClass(s, 'unsubFlyoutEnabled')) {
            this.unsubscribeFlyout.initNode(s);
            j.addClass(s, 'unsubFlyoutEnabled');
        }
    };
    r.prototype.updateSubscribe = function (s, t) {
        "use strict";
        if (!this.activated)return;
        var u = t.profile_id;
        if (u) {
            this.subscriptionChange[u] = s === 'FollowUser' || s === 'UnfollowUserFail' ? 'following' : 'unfollowed';
            this.toggleSubscribeLink(u);
        }
    };
    r.prototype.showSubscribeLinkOnChange = function (s, t) {
        "use strict";
        this.type = t.ownertype;
        j.conditionClass(this.unsubDiv, 'isPage', this.type === 'page');
        this.toggleSubscribeLink(t.owner);
    };
    r.prototype.toggleSubscribeLink = function (s) {
        "use strict";
        var t = k.scry(this.subscribeLink, 'span.fbPhotoSubscribeWrapper')[0];
        if (!t)return;
        if (this.subscriptionChange[s]) {
            j.conditionClass(t, 'followingOwner', this.subscriptionChange[s] === 'following');
            if (this.subscriptionChange[s] === 'unfollowed')this.unsubscribeFlyout && this.unsubscribeFlyout.hideFlyout(true);
        }
        this.registerUnsubscribeTarget();
    };
    r.prototype.subscribePhotoOwner = function () {
        "use strict";
        if (!this.viewer.getOwnerId())return;
        var s = (this.type === 'user') ? {profile_id: this.viewer.getOwnerId()} : {fbpage_id: this.viewer.getOwnerId(), add: true, reload: false, fan_origin: 'photo_snowlift'};
        g.inform('FollowUser', {profile_id: this.viewer.getOwnerId()});
        if (this.type === 'page')i.bumpEntityKey('snowlift_page_like', 'snowlift_page_like.clicked_link');
        s.location = this.FOLLOW_LOCATION_PHOTO;
        new h(this.subscribeEndpoints[this.type]).setAllowCrossPageTransition(true).setData(s).setMethod('POST').setReadOnly(false).setErrorHandler(g.inform.bind(null, 'FollowUserFail', s)).send();
    };
    r.prototype.unsubscribePhotoOwner = function () {
        "use strict";
        if (!this.viewer.getOwnerId())return;
        var s = (this.type === 'user') ? {profile_id: this.viewer.getOwnerId()} : {fbpage_id: this.viewer.getOwnerId(), add: false, reload: false};
        g.inform('UnfollowUser', {profile_id: this.viewer.getOwnerId()});
        s.location = this.FOLLOW_LOCATION_PHOTO;
        new h(this.unsubscribeEndpoints[this.type]).setAllowCrossPageTransition(true).setData(s).setMethod('POST').setReadOnly(false).setErrorHandler(g.inform.bind(null, 'UnfollowUserFail', s)).send();
    };
    r.createInstance = function (s, t, u, v, w, x, y, z) {
        "use strict";
        var aa = s.getInstance(), ba = new r(aa);
        ba.init(o(t), u, v, w, x, y, z);
        q[aa.getVersionConst()] = ba;
        return ba;
    };
    r.getInstance = function (s) {
        "use strict";
        return q[s];
    };
    p(r.prototype, {FOLLOW_LOCATION_PHOTO: 48});
    e.exports = r;
}, null);
__d("PhotosButtonTooltips", ["Arbiter", "DOMDimensions", "Style", "Tooltip"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = [], l = [], m;

    function n(r, s) {
        if (!r || !r.length || !s || !s.length || r.length != s.length)throw new Error('Incorrect arguments passed in from PHP for photo button cropping');
        var t = 0, u = [], v = false;
        for (t = 0; t < r.length; t++) {
            u.push(h.getElementDimensions(r[t]).width);
            if (u[t])v = true;
        }
        if (v) {
            r.forEach(function (z) {
                i.set(z, 'max-width', '100%');
            });
            for (t = 0; t < r.length; t++) {
                var w = r[t], x = u[t];
                if (x) {
                    var y = h.getElementDimensions(w).width;
                    if (y > x) {
                        j.set(w, s[t]);
                        l.push(w);
                    }
                }
            }
            r.forEach(function (z) {
                i.set(z, 'max-width', '');
            });
        }
        return v;
    }

    function o() {
        k.forEach(function (r) {
            r.unsubscribe();
        });
        k = [];
        l.forEach(j.remove);
        l = [];
    }

    function p(r, s, t) {
        this.arbiterToken = g.subscribe(r, function () {
            if (n(s, t))this.arbiterToken && this.arbiterToken.unsubscribe();
        }.bind(this));
    }

    var q = {init: function () {
        if (!m)m = g.subscribe('PhotoSnowlift.CLOSE', o);
    }, registerButtonsOnPaging: function (r, s) {
        k.push(new p('PhotoSnowlift.DATA_CHANGE', r, s).arbiterToken);
    }, registerButtonsOnTaggingOn: function (r, s) {
        k.push(new p('PhotoTagger.ACTIVATED_TAGGING', r, s).arbiterToken);
    }, registerButtonsOnTaggingOff: function (r, s) {
        k.push(new p('PhotoTagger.DEACTIVATED_TAGGING', r, s).arbiterToken);
    }};
    e.exports = q;
}, null);