/*!CK:1960694901!*//*1403549303,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["wxq+C"]);
}

__d("SnowliftPicCropper", ["Arbiter", "CSS", "Dialog", "DOM", "Event", "Keys", "Parent", "Photocrop2", "ProfilePicRequestCreator", "ProfilePictureFlowLogging", "Style", "copyProperties", "tx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t = p.flow.SNOWLIFT;

    function u(v) {
        "use strict";
        this.root = v.getRoot();
        this.photoSnowlift = v;
    }

    u.prototype.init = function () {
        "use strict";
        this.croppingMode = false;
        this.optionMenu = j.find(this.root, 'div.fbPhotoSnowliftContainer');
        this.overlayActions = j.find(this.root, 'div.snowliftOverlayBar');
        this.setupHandlers();
        this.resetData();
        g.subscribe('PhotoTagger.REMOVED_MAKE_PROFILE_PIC_OPTION', this.disableCropping.bind(this, false));
    };
    u.prototype.setupHandlers = function () {
        "use strict";
        this.handlers = [k.listen(this.optionMenu, 'click', this.clickHandler.bind(this)), k.listen(this.overlayActions, 'click', this.clickHandler.bind(this)), k.listen(window, 'resize', (function (event) {
            this.resetPhoto();
        }).bind(this)), k.listen(document.documentElement, 'keydown', function (event) {
            if (!this.croppingMode)return;
            var v = k.getKeyCode(event);
            if (v === l.ESC) {
                this.disableCropping(false);
                k.kill(event);
            }
        }.bind(this))];
    };
    u.prototype.submitCroppedPhoto = function () {
        "use strict";
        var v = this.photoSnowlift.getCurrentPhotoInfo();
        if (!v)return;
        h.addClass(this.root, 'profilePicSavingMode');
        var w = this.disableCropping(true), x = this.photoSnowlift.getCurrentImageServerSizeDimensions();
        new o(v.fbid, this.getProfilePicTargetId(v)).setProfilePhotoMethod('existing').setProfilePhotoSource(this._data.pp_source).setFlowType(t).saveCrop(w, x);
    };
    u.prototype.clickHandler = function (event) {
        "use strict";
        var v = event.getTarget();
        if (!this.croppingMode && m.byClass(v, 'fbPhotoActionsCrop')) {
            var w = m.byClass(v, 'fbPhotoActionsCrop');
            this._setData({inprofilepicalbum: !!m.byClass(v, 'profileAlbum'), makeuserprofile: !!m.byClass(v, 'makeUserProfile'), profile_id: w.getAttribute('data-userid')});
            if (this._data.isUser)p.setFlowType(t).setAction(p.action.MAKE_PROFILE).log();
            this.enableCropping();
            event.prevent();
        } else if (this.croppingMode && m.byClass(v, 'cancelCroppingLink')) {
            this._logFlowStep(p.step.CANCEL);
            this.disableCropping(false);
            event.prevent();
        } else if (this.croppingMode && m.byClass(v, 'doneCroppingLink')) {
            this.submitCroppedPhoto();
            event.prevent();
        }
    };
    u.prototype.resetPhoto = function () {
        "use strict";
        this.photo = j.find(this.root, 'img.spotlight');
        if (this.photocrop) {
            j.setAttributes(this.photocrop.highlight, {src: this.photo.src});
            this.photocrop.photo = this.photo;
            this.photocrop.adjustForResize();
        } else if (this.wrapper) {
            j.remove(this.wrapper);
            this.wrapper = null;
        }
    };
    u.prototype.enableCropping = function () {
        "use strict";
        if (this.croppingMode)return;
        if (this._data.previousProfilePic)return this.showPicInProfileAlbumDialog();
        this._logFlowStep(p.step.CROP);
        this.croppingMode = true;
        this.resetPhoto();
        this.wrapper = j.create('div');
        h.addClass(this.wrapper, 'stageCropper');
        j.find(this.root, '.stage').appendChild(this.wrapper);
        q.set(this.wrapper, 'width', '100%');
        q.set(this.wrapper, 'height', '100%');
        this.photocrop = new n(this.photo, {target: this.wrapper}, this.photoSnowlift.getCurrentImageServerSizeDimensions());
        h.addClass(this.root, 'profilePicCroppingMode');
    };
    u.prototype.disableCropping = function (v) {
        "use strict";
        if (!this.croppingMode)return;
        this.croppingMode = false;
        h.removeClass(this.root, 'profilePicCroppingMode');
        var w = null;
        if (this.photocrop) {
            w = this.photocrop.done(v);
            this.photocrop = null;
        }
        if (!v && this.wrapper) {
            j.remove(this.wrapper);
            this.wrapper = null;
        }
        delete this.photo;
        return w;
    };
    u.prototype.showPicInProfileAlbumDialog = function () {
        "use strict";
        this._logFlowStep(p.step.PREVIOUS_PIC_INIT);
        new i().setTitle("\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u044e \u043f\u0440\u043e\u0444\u0438\u043b\u044f").setBody("\u0412\u044b \u0443\u0436\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043b\u0438 \u044d\u0442\u043e \u0444\u043e\u0442\u043e \u0432 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u0441\u0432\u043e\u0435\u0439 \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u043f\u0440\u043e\u0444\u0438\u043b\u044f. \u0412\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0435\u0433\u043e \u0441\u043d\u043e\u0432\u0430?").setButtons([i.CONFIRM, i.CANCEL]).setModal(true).setHandler((function () {
            h.addClass(this.root, 'profilePicSavingMode');
            var v = this.photoSnowlift.getCurrentPhotoInfo();
            if (!v)return;
            var w = this.getProfilePicTargetId(v);
            new o(v.fbid, w).setProfilePhotoSource(this._data.pp_source).setProfilePhotoMethod('existing').setFlowType(t).savePic();
        }).bind(this)).show();
    };
    u.prototype.getProfilePicTargetId = function (v) {
        "use strict";
        if (this._data.isUser || this._data.profile_id)return this._data.profile_id;
        return v.owner;
    };
    u.prototype.resetData = function () {
        "use strict";
        this._setData(this.photoSnowlift.getLoadQuery());
    };
    u.prototype._logFlowStep = function (v) {
        "use strict";
        p.setFlowType(t).log(v);
    };
    u.prototype._setData = function (v) {
        "use strict";
        this._data = {profile_id: parseInt(v.profile_id, 10), pp_source: v.pp_source || 'photo_view', isUser: !!v.makeuserprofile, previousProfilePic: !!v.inprofilepicalbum};
    };
    u.getInstance = function (v) {
        "use strict";
        if (!u._instance)u._instance = new u(v);
        return u._instance;
    };
    r(u, {_instance: null});
    e.exports = u;
}, null);