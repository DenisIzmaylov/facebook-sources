/*!CK:2048298941!*//*1411961345,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["KIqQh"]);
}

__d("PUWApplications", [], function (a, b, c, d, e, f) {
    e.exports = {WEB_SIMPLE: "web_simple", WEB_FLASH: "web_flash", WEB_HTML5: "web_html5", WEB_COMPOSER: "web_composer", WEB_ARCHIVE: "web_archive", WEB_MESSENGER: "web_messenger", WEB_OMNIPICKER: "web_omnipicker", WEB_MUSE_OMNIPICKER: "web_muse_omnipicker", WEB_M_ZERO: "web_m_zero", WEB_M_BASIC: "web_m_basic", WEB_M_TOUCH: "web_m_touch", MOBILE_FB4IOS: "mobile_fb4ios", MOBILE_FB4IOS_SNAP: "mobile_fb4ios_snap", MOBILE_FB4A: "mobile_fb4a", MOBILE_PMA_ANDROID: "mobile_pma_android", MOBILE_PMA_IOS: "mobile_pma_ios", THIRD_PARTY: "third_party"};
}, null);
__d("PUWSteps", [], function (a, b, c, d, e, f) {
    e.exports = {CLIENT_FLOW_BEGIN: "client_flow_begin", CLIENT_SELECT_BEGIN: "client_select_begin", CLIENT_SELECT_SUCCESS: "client_select_success", CLIENT_SELECT_CANCEL: "client_select_cancel", CLIENT_SELECT_FAIL: "client_select_fail", CLIENT_FLOW_POST: "client_flow_post", CLIENT_TRANSFER_BATCH_BEGIN: "client_transfer_batch_begin", CLIENT_UPLOAD_BEGIN: "client_upload_begin", CLIENT_PROCESS_BEGIN: "client_process_begin", CLIENT_PROCESS_SUCCESS: "client_process_success", CLIENT_PROCESS_CANCEL: "client_process_cancel", CLIENT_PROCESS_SKIP: "client_process_skip", CLIENT_PROCESS_FAIL: "client_process_fail", CLIENT_PROCESS_UNAVAILABLE: "client_process_unavailable", CLIENT_TRANSFER_ENQUEUE: "client_transfer_enqueue", CLIENT_TRANSFER_BEGIN: "client_transfer_begin", CLIENT_TRANSFER_SUCCESS: "client_transfer_success", CLIENT_TRANSFER_CANCEL: "client_transfer_cancel", CLIENT_TRANSFER_FAIL: "client_transfer_fail", CLIENT_TRANSFER_MANUAL_RETRY: "client_transfer_manual_retry", CLIENT_UPLOAD_SUCCESS: "client_upload_success", CLIENT_UPLOAD_FAIL: "client_upload_fail", CLIENT_UPLOAD_CANCEL: "client_upload_cancel", CLIENT_UPLOAD_REMOVE: "client_upload_remove", CLIENT_FACEREC_BEGIN: "client_facerec_begin", CLIENT_FACEREC_SUCCESS: "client_facerec_success", CLIENT_FACEREC_FAIL: "client_facerec_fail", CLIENT_PHOTO_PREVIEW_OPEN: "client_photo_preview_open", CLIENT_PHOTO_PREVIEW_CLOSE: "client_photo_preview_close", CLIENT_TRANSFER_BATCH_SUCCESS: "client_transfer_batch_success", CLIENT_TRANSFER_BATCH_CANCEL: "client_transfer_batch_cancel", CLIENT_TRANSFER_BATCH_FAIL: "client_transfer_batch_fail", CLIENT_PUBLISH_ENQUEUE: "client_publish_enqueue", CLIENT_PUBLISH_BEGIN: "client_publish_begin", CLIENT_PUBLISH_SUCCESS: "client_publish_success", CLIENT_PUBLISH_FAIL: "client_publish_fail", CLIENT_ATTEMPT_FAIL: "client_attempt_fail", CLIENT_FLOW_SUCCESS: "client_flow_success", CLIENT_FLOW_FATAL: "client_flow_fatal", CLIENT_FLOW_GIVEUP: "client_flow_giveup", CLIENT_FLOW_CANCEL: "client_flow_cancel", CLIENT_FLOW_FAIL: "client_flow_fail", CLIENT_FLOW_INCOMPLETE: "client_flow_incomplete", CLIENT_ATTEMPT_INCOMPLETE: "client_attempt_incomplete", CLIENT_FLOW_RETRY: "client_flow_retry", CLIENT_ATTEMPT_RETRY: "client_attempt_retry", CLIENT_DIAGNOSTIC: "client_diagnostic", CLIENT_CANCEL_SURVEY: "client_cancel_survey", SERVER_UPLOAD_BEGIN: "server_upload_begin", SERVER_UPLOAD_SUCCESS: "server_upload_success", SERVER_UPLOAD_FAIL: "server_upload_fail", SERVER_PUBLISH_BEGIN: "server_publish_begin", SERVER_PUBLISH_SUCCESS: "server_publish_success", SERVER_PUBLISH_FAIL: "server_publish_fail", SERVER_RECEIVER_BEGIN: "server_receiver_begin", SERVER_RECEIVER_PUBLISH_BEGIN: "server_receiver_publish_begin", SERVER_SENTRY_RESTRICTION: "server_sentry_restriction"};
}, null);
__d("CelebrationsBanzaiLogger", ["BanzaiLogger", "copyProperties"], function (a, b, c, d, e, f, g, h) {
    function i(j, k) {
        "use strict";
        this.$CelebrationsBanzaiLogger0 = j;
        this.$CelebrationsBanzaiLogger1 = k;
    }

    i.prototype.logEvent = function (event, j) {
        "use strict";
        var k = h({}, j);
        k.event = event;
        k.source = this.$CelebrationsBanzaiLogger0;
        k.celebration_type = this.$CelebrationsBanzaiLogger1;
        g.log('CelebrationsLoggerConfig', k);
    };
    h(i, {createLogger: function (j, k) {
        return new i(j, k);
    }});
    e.exports = i;
}, null);
__d("PhotosUploadWaterfallXMixin", ["AsyncSignal", "Banzai", "PhotosUploadWaterfallXConfig", "PUWApplications", "copyProperties", "invariant", "randomInt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n(p, q) {
        var r = {};
        p.client_time = Math.round(Date.now() / 1000);
        if (i.retryBanzai) {
            r.retry = true;
            p.nonce = m(4294967296);
        }
        h.post(i.banzaiRoute, p, r);
        if (q)setTimeout(q, 0);
    }

    function o(p, q) {
        if (i.useBanzai) {
            n(p, q);
        } else {
            var r = new g(i.loggingEndpoint, {data: JSON.stringify(p)}).setHandler(q);
            if (i.timeout)r.setTimeout(10 * 1000);
            r.send();
        }
    }

    e.exports = {logStep: function (p, q, r) {
        var s = this.getWaterfallID && this.getWaterfallID(), t = this.getWaterfallAppName && this.getWaterfallAppName();
        if (!s || !t)return;
        if (i.reduceLoggingRequests && t === j.WEB_FLASH) {
            r && r();
            return;
        }
        o(k({step: p, qn: s, uploader: t, ref: this.getWaterfallSource && this.getWaterfallSource()}, q), r);
    }};
}, null);
__d("MessagingConst", ["copyProperties"], function (a, b, c, d, e, f, g) {
    var h = {APP_ID: 313785040330, XD_MESSAGE: {SANDBOX_READY: 'sandbox_ready', SET_CONTENT: 'set_content', HTML_SIZE: 'html_size', REFRESH_SIZE: 'refresh_size'}, SHINGLE_SCROLL_TRIGGER: 5, EVENTS: {MESSAGE_SENT: 'messaging/message_sent'}, initConstants: function (i) {
        g(h, i);
    }};
    e.exports = h;
}, null);
__d("FileInputUploader", ["ArbiterMixin", "DOM", "DTSG", "FileForm", "Form", "copyProperties", "mixin", "submitForm"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = m(g);
    for (var p in o)if (o.hasOwnProperty(p))r[p] = o[p];
    var q = o === null ? null : o.prototype;
    r.prototype = Object.create(q);
    r.prototype.constructor = r;
    r.__superConstructor__ = o;
    function r(s, t) {
        "use strict";
        this._inputElem = s;
        this._form_container = t ? t : document.body;
        this._data = {};
    }

    r.prototype.setInput = function (s) {
        "use strict";
        this._inputElem = s;
        return this;
    };
    r.prototype.setURI = function (s) {
        "use strict";
        this._uri = s;
        return this;
    };
    r.prototype.setData = function (s) {
        "use strict";
        this._data = s;
        return this;
    };
    r.prototype.setPreprocessHandler = function (s) {
        "use strict";
        this._preprocessHandler = s;
        return this;
    };
    r.prototype.setNetworkErrorRetryLimit = function (s) {
        "use strict";
        this._retryLimit = s;
        return this;
    };
    r.prototype.setFiles = function (s) {
        "use strict";
        this._files = s;
        return this;
    };
    r.prototype.setAllowCrossOrigin = function (s) {
        "use strict";
        this._allowCrossOrigin = !!s;
        return this;
    };
    r.prototype.setUploadInParallel = function (s) {
        "use strict";
        this._uploadInParallel = !!s;
        return this;
    };
    r.prototype.setConcurrentLimit = function (s) {
        "use strict";
        this._concurrentLimit = s;
        return this;
    };
    r.prototype.send = function () {
        "use strict";
        this._createForm();
        var s = this._inputElem.cloneNode(false);
        h.replace(this._inputElem, s);
        h.appendContent(this._formElem, this._inputElem);
        h.appendContent(this._form_container, this._formElem);
        n(this._formElem);
        h.replace(s, this._inputElem);
        this._cleanup();
    };
    r.prototype._onFileFormEvent = function (s, t) {
        "use strict";
        this.inform(s, t);
    };
    r.prototype._createForm = function () {
        "use strict";
        this._formElem = h.create('form', {action: this._uri, method: 'post'});
        this._fileForm = new j(this._formElem, null, {allowCrossOrigin: this._allowCrossOrigin, uploadInParallel: this._uploadInParallel, concurrentLimit: this._concurrentLimit, preprocessHandler: this._preprocessHandler, networkErrorRetryLimit: this._retryLimit});
        if (this._files)this._fileForm.setFiles(this._files);
        this._fileForm.subscribe(j.EVENTS, this._onFileFormEvent.bind(this));
        k.createHiddenInputs(l({fb_dtsg: i.getToken()}, this._data), this._formElem);
    };
    r.prototype._cleanup = function () {
        "use strict";
        this._fileForm.destroy();
        this._fileForm = null;
        h.remove(this._formElem);
        this._formElem = null;
    };
    l(r.prototype, {_formElem: null, _fileForm: null, _uri: null, _files: null, _allowCrossOrigin: false, _uploadInParallel: false, _concurrentLimit: null});
    e.exports = r;
}, null);
__d("glyph", ["ix"], function (a, b, c, d, e, f) {
    e.exports = b('ix');
}, null);
__d("BirthdayModal", ["Button", "CSS", "DOM", "Event", "FileInputUploader", "Focus", "Layer", "csx", "cx", "CelebrationsLogger"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = b('CelebrationsLogger').Logger, q = b('CelebrationsLogger').Sources, r = b('CelebrationsLogger').Events, s = b('CelebrationsLogger').CelebrationTypes, t = [], u = [], v = [], w, x, y, z, aa = {init: function (ba, ca, da) {
        w = ca;
        t = [];
        u = [];
        v = [];
        x = da;
        z = p.createLogger(q.RHC_REMINDER, s.BIRTHDAY);
        j.listen(ba, 'click', function () {
            ca.show();
        });
    }, addComposer: function (ba, ca) {
        t[ca] = ba;
        var da = i.find(ba, "._4ovw"), ea = i.find(ba, "._4ovy"), fa = i.find(ea, '.inlineReplyTextArea'), ga = i.find(da, "._5r2w"), ha = i.find(ba, "._4ow1");
        if (x)j.listen(ga, 'click', function (event) {
            var ia = i.find(ea, "._n");
            ia.click();
            event.stopPropagation();
            if (v[ca])v[ca].remove();
            v[ca] = j.listen(ia, 'change', function (event) {
                h.hide(da);
                h.show(ea);
                l.set(fa);
            });
        });
        j.listen(da, 'click', function (event) {
            h.hide(da);
            h.show(ea);
            l.set(fa);
        });
        j.listen(ha, 'submit', function (event, ia) {
            z.logEvent(r.CLIENT_STARTED_POST);
        });
        j.listen(ha, 'success', function (event, ia) {
            z.logEvent(r.CLIENT_FINISHED_POST);
        });
        j.listen(ha, 'faiure', function (event, ia) {
            z.logEvent(r.CLIENT_FAILED_POST);
        });
    }, addUpcomingBirthdays: function (ba, ca) {
        j.listen(ca.firstChild, 'click', function (event) {
            h.show(ba);
            h.hide(ca);
        });
    }, attachPhoto: function (ba, ca, da) {
        var ea = t[da];
        if (!ea)return;
        var fa = i.find(ea, "._4ovz");
        h.removeClass(fa, "._4ow0");
        var ga = i.find(ea, "._4ow1");
        ga.appendChild(ca);
        i.appendContent(fa, ba);
        var ha = i.find(ea, "._4ow2");
        h.show(ha);
        var ia = i.find(ea, "._30e4");
        g.setEnabled(ia, true);
    }, initUploader: function (ba, ca, da, ea) {
        if (x)u[da] = ba;
        var fa = ba.getInput();
        ba.subscribe('change', this._uploadPhoto.bind(this, fa, ea, da));
    }, _uploadPhoto: function (ba, ca, da) {
        var ea = t[da];
        if (!ea)return;
        var fa = i.find(ea, "._4ow3"), ga = i.find(ea, "._4ow4");
        h.show(fa);
        h.hide(ga);
        var ha = new k(ba);
        ha.setURI(ca.uploadURI).setData(ca.uploadData).setAllowCrossOrigin(true).setUploadInParallel(true).setFiles(ba.files).send();
        var ia = i.find(ea, "._30e4");
        g.setEnabled(ia, false);
        if (!x) {
            var ja = m.getTopmostLayer();
            if (ja)ja.hide();
        }
    }, showPhotoPicker: function (ba) {
        ba.subscribeOnce(['show'], function () {
            h.addClass(w.getContentRoot(), "_30e3");
        }.bind(this));
        ba.subscribeOnce(['hide'], function () {
            w.show();
            h.removeClass(w.getContentRoot(), "_30e3");
        }.bind(this));
    }, addPhotoItem: function (ba, ca, da, ea) {
        var fa = t[ea];
        if (!fa)return;
        j.listen(ba, 'click', function () {
            var ga = i.find(fa, "._4ow3"), ha = i.find(fa, "._4ovz"), ia = i.find(fa, "._4ow4");
            h.show(ga);
            h.hide(ia);
            h.removeClass(ha, "._4ow0");
            var ja = i.find(fa, "._4ow1");
            ja.appendChild(da);
            i.appendContent(ha, ca);
            var ka = i.find(fa, "._4ow2");
            h.show(ka);
            var la = m.getTopmostLayer();
            if (la)la.hide();
        });
    }, addRemoveButton: function (ba, ca) {
        var da = t[ca];
        if (!da)return;
        j.listen(ba, 'click', function () {
            h.hide(ba);
            var ea = i.find(da, "._4ow3"), fa = i.find(da, "._4ovz"), ga = i.find(da, "._4ow4");
            h.hide(ea);
            h.show(ga);
            h.addClass(fa, "._4ow0");
            i.remove(fa.firstChild);
            i.scry(da, "._4ow5").forEach(function (ha) {
                i.remove(ha);
            });
            if (x)u[ca].clear();
        }.bind(this));
    }, finishPosting: function (ba, ca) {
        var da = t[ca];
        if (!da)return;
        var ea = i.find(da, "._4ovy");
        i.replace(ea, ba);
    }, setPhotoAlbumView: function (ba) {
        y = ba;
    }, setPhotoView: function (ba) {
        if (!y)return;
        var ca = i.find(y, "._5r32");
        if (ca) {
            h.hide(ca);
        } else return;
        var da = i.find(y, "._375u");
        da.appendChild(ba);
        var ea = i.find(ba, "._375v");
        j.listen(ea, 'click', function () {
            h.show(ca);
            var fa = i.find(y, "._375w");
            i.remove(fa);
        }.bind(this));
    }};
    e.exports = aa;
}, null);
__d("XBirthdayMessagePostControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/reminders\/birthday\/message\/", {});
}, null);