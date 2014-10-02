/*!CK:790898821!*//*1412109695,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["a9\/jF"]);
}

__d("MercuryActionStatus", [], function (a, b, c, d, e, f) {
    e.exports = {UNSENT: 0, SUCCESS: 1, UNCONFIRMED: 3, FAILED_UNKNOWN_REASON: 4, UNABLE_TO_CONFIRM: 5, RESENT: 6, RESENDING: 7, ERROR: 10};
}, null);
__d("MercuryActionTypeConstants", [], function (a, b, c, d, e, f) {
    e.exports = {LOG_MESSAGE: "ma-type:log-message", USER_GENERATED_MESSAGE: "ma-type:user-generated-message", CHANGE_READ_STATUS: "ma-type:change_read_status", CHANGE_MUTE_SETTINGS: "ma-type:change-mute-settings", CLEAR_CHAT: "ma-type:clear_chat", SEND_MESSAGE: "ma-type:send-message", UPDATE_ACTION_ID: "ma-type:update-action-id", DELETE_MESSAGES: "ma-type:delete-messages", DELETE_THREAD: "ma-type:delete-thread", CHANGE_ARCHIVED_STATUS: "ma-type:change-archived-status", CHANGE_FOLDER: "ma-type:change-folder"};
}, null);
__d("MercuryAPIArgsSource", [], function (a, b, c, d, e, f) {
    e.exports = {CHAT: "chat", JEWEL: "jewel", MERCURY: "mercury", WEBMESSENGER: "web_messenger"};
}, null);
__d("MercuryAttachmentContentType", [], function (a, b, c, d, e, f) {
    e.exports = {PHOTO: "attach:image", VIDEO: "attach:video", MUSIC: "attach:music", VOICE: "attach:voice", TEXT: "attach:text", MSWORD: "attach:ms:word", MSXLS: "attach:ms:xls", MSPPT: "attach:ms:ppt", ORION: "attach:orion", SHOERACK_INVITATION: "attach:shoerackinvite", UNKNOWN: "attach:unknown"};
}, null);
__d("MercuryAttachmentType", [], function (a, b, c, d, e, f) {
    e.exports = {ERROR: "error", FILE: "file", PHOTO: "photo", STICKER: "sticker", SHARE: "share", UNKNOWN: "unknown", VIDEO: "video"};
}, null);
__d("MercuryErrorType", [], function (a, b, c, d, e, f) {
    e.exports = {SERVER: 1, TRANSPORT: 2, TIMEOUT: 3};
}, null);
__d("MercuryGenericConstants", [], function (a, b, c, d, e, f) {
    e.exports = {PENDING_THREAD_ID: "pending:pending", MAX_THREAD_NAME_LENGTH: "250"};
}, null);
__d("MercuryGlobalActionType", [], function (a, b, c, d, e, f) {
    e.exports = {MARK_ALL_READ: "mga-type:mark-all-read"};
}, null);
__d("MercuryLogMessageType", [], function (a, b, c, d, e, f) {
    e.exports = {SUBSCRIBE: "log:subscribe", UNSUBSCRIBE: "log:unsubscribe", VIDEO_CALL: "log:video-call", PHONE_CALL: "log:phone-call", THREAD_NAME: "log:thread-name", THREAD_IMAGE: "log:thread-image", SERVER_ERROR: "log:error-msg", LIVE_LISTEN: "log:live-listen", WALLPAPER: "log:wallpaper"};
}, null);
__d("MercuryParticipantTypes", [], function (a, b, c, d, e, f) {
    e.exports = {USER: "user", THREAD: "thread", EVENT: "event", PAGE: "page", FRIEND: "friend"};
}, null);
__d("MercuryPayloadSource", [], function (a, b, c, d, e, f) {
    e.exports = {UNKNOWN: "unknown", CLIENT_CHANNEL_MESSAGE: "client_channel_message", CLIENT_SEND_MESSAGE: "client_send_message", CLIENT_CHANGE_ARCHIVED_STATUS: "client_change-archived_status", CLIENT_CHANGE_FOLDER: "client_change_folder", CLIENT_CHANGE_MUTE_SETTINGS: "client_change_mute_settings", CLIENT_CHANGE_READ_STATUS: "client_change_read_status", CLIENT_CLEAR_CHAT: "client_clear_chat", CLIENT_DELETE_MESSAGES: "client_delete_messages", CLIENT_DELETE_THREAD: "client_delete_thread", CLIENT_HANDLE_ERROR: "client_handle_error", SERVER_INITIAL_DATA: "server_initial_data", SERVER_SEND_MESSAGE: "server_send_message", SERVER_CONFIRM_MESSAGES: "server_confirm_messages", SERVER_CHANGE_ARCHIVED_STATUS: "server_change_archived_status", SERVER_CHANGE_READ_STATUS: "server_change_read_status", SERVER_MARK_FOLDER_READ: "server_mark_folder_read", SERVER_MARK_SEEN: "server_mark_seen", SERVER_FETCH_THREAD_INFO: "server_fetch_thread_info", SERVER_FETCH_THREADLIST_INFO: "server_fetch_threadlist_info", SERVER_THREAD_SYNC: "server_thread_sync", SERVER_TAB_PRESENCE: "server_tab_presence", SERVER_UNREAD_THREADS: "server_unread_threads", SERVER_SEARCH: "server_search"};
}, null);
__d("MercurySourceType", [], function (a, b, c, d, e, f) {
    e.exports = {CHAT_ORCA: "source:chat:orca", CHAT_IPHONE: "source:chat:iphone", CHAT_JABBER: "source:chat:jabber", CHAT_MEEBO: "source:chat:meebo", CHAT_WEB: "source:chat:web", CHAT_TEST: "source:chat:test", CHAT: "source:chat", EMAIL: "source:email", GIGABOXX_API: "source:gigaboxx:api", GIGABOXX_BLAST: "source:gigaboxx:blast", GIGABOXX_EMAIL_REPLY: "source:gigaboxx:emailreply", GIGABOXX_MOBILE: "source:gigaboxx:mobile", GIGABOXX_WAP: "source:gigaboxx:wap", GIGABOXX_WEB: "source:gigaboxx:web", LEIA: "source:leia", SHARE_DIALOG: "source:share:dialog", SEND_PLUGIN: "source:sendplugin", SMS: "source:sms", TEST: "source:test", TITAN_WAP: "source:titan:wap", TITAN_M_BASIC: "source:titan:m_basic", TITAN_M_JAPAN: "source:titan:m_japan", TITAN_M_MINI: "source:titan:m_mini", TITAN_M_TOUCH: "source:titan:m_touch", TITAN_M_APP: "source:titan:m_app", TITAN_M_TABLET: "source:titan:m_tablet", TITAN_M_ZERO: "source:titan:m_zero", TITAN_M_TALK: "source:titan:m_talk", TITAN_WEB: "source:titan:web", TITAN_FACEWEB_ANDROID: "source:titan:faceweb_android", TITAN_FACEWEB_BUFFY: "source:titan:faceweb_buffy", TITAN_FACEWEB_IPAD: "source:titan:faceweb_ipad", TITAN_FACEWEB_IPHONE: "source:titan:faceweb_iphone", TITAN_FACEWEB_UNKNOWN: "source:titan:faceweb_unknown", TITAN_API: "source:titan:api", TITAN_API_MOBILE: "source:titan:api_mobile", TITAN_ORCA: "source:titan:orca", TITAN_EMAIL_REPLY: "source:titan:emailreply", MOBILE: "source:mobile", UNKNOWN: "source:unknown", WEB: "source:web", HELPCENTER: "source:helpcenter", NEW_SHARE_DIALOG: "source:share:dialog:new", PAID_PROMOTION: "source:paid_promotion", BUFFY_SMS: "source:buffy:sms", WEBRTC_MOBILE: "source:webrtc:mobile"};
}, null);
__d("MercuryThreadMode", [], function (a, b, c, d, e, f) {
    e.exports = {EMAIL_ORIGINATED: 1, TITAN_ORIGINATED: 2, OBJECT_ORIGINATED: 3};
}, null);
__d("MessagingTag", [], function (a, b, c, d, e, f) {
    e.exports = {GROUPS: "groups", UNREAD: "unread", ACTION_ARCHIVED: "action:archived", INBOX: "inbox", OTHER: "other", EVENT: "event", SENT: "sent", SMS_MUTE: "sms_mute", SPAM: "spam", UPDATES: "broadcasts_inbox", BCC: "header:bcc", FILTERED_CONTENT: "filtered_content", ARCHIVED: "archived", EMAIL: "email", VOICEMAIL: "voicemail", SPAM_SPOOFING: "spam:spoofing", SPOOF_WARNING: "MTA:spoof_warning", SMS_TAG_ROOT: "SMSShortcode:", APP_ID_ROOT: "app_id:", DOMAIN_AUTH_PASS: "MTA:dmarc:pass", DOMAIN_AUTH_FAIL: "MTA:dmarc:fail", MTA_SYSTEM_MESSAGE: "MTA:system_message", EMAIL_MESSAGE: "source:email"};
}, null);
__d("PhotoResizeModeConst", [], function (a, b, c, d, e, f) {
    e.exports = {CONTAIN: "s", COVER: "p"};
}, null);
__d("ReportState", ["ErrorUtils", "invariant"], function (a, b, c, d, e, f, g, h) {
    var i = {};

    function j(l, m) {
        h(!i[l]);
        i[l] = m;
    }

    function k() {
        var l = {};
        Object.keys(i).forEach(function (m) {
            try {
                l[m] = i[m]();
            } catch (n) {
                g.reportError('ReportState: callback threw an error.');
            }
        });
        return l;
    }

    e.exports = {registerCallback: j, getState: k};
}, null);
__d("MercurySingletonMixin", ["CurrentUser"], function (a, b, c, d, e, f, g) {
    var h = {_getInstances: function () {
        if (!this._instances)this._instances = {};
        return this._instances;
    }, get: function () {
        return this.getForFBID(g.getID());
    }, getForFBID: function (i) {
        var j = this._getInstances();
        if (!j[i])j[i] = new this(i);
        return j[i];
    }};
    e.exports = h;
}, null);
__d("MercuryMessageClientState", [], function (a, b, c, d, e, f) {
    var g = {DO_NOT_SEND_TO_SERVER: 'do_not_send_to_server', SEND_TO_SERVER: 'send_to_server'};
    e.exports = g;
}, null);
__d("MercuryMessageIDs", ["KeyedCallbackManager"], function (a, b, c, d, e, f, g) {
    var h = new g(), i = {getServerIDs: function (j, k) {
        var l = j.filter(function (n) {
            return n.indexOf('mail.projektitan.com') !== -1;
        }), m = function (n) {
            var o = j.map(function (p) {
                return n[p] ? n[p] : p;
            });
            k(o);
        };
        return h.executeOrEnqueue(l, m);
    }, addServerID: function (j, k) {
        h.setResource(j, k);
    }};
    e.exports = i;
}, null);
__d("ImageSourceType", [], function (a, b, c, d, e, f) {
    var g = {PROFILE_PICTURE: 'profile_picture', IMAGE: 'image'};
    e.exports = g;
}, null);
__d("ImageSourceRequest", ["CurrentUser", "ImageSourceType", "KeyedCallbackManager", "PhotoResizeModeConst", "MercuryServerDispatcher", "arrayContains", "extendArray"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n() {
        "use strict";
        this._request = {fbid: null, type: null, width: null, height: null, resize_mode: null};
        this._callback = null;
    }

    n.prototype.setFBID = function (r) {
        "use strict";
        this._request.fbid = r;
        return this;
    };
    n.prototype.setType = function (r) {
        "use strict";
        if (!l([h.PROFILE_PICTURE, h.IMAGE], r))throw new TypeError('ImageSourceRequest.setType: invalid type ' + r);
        this._request.type = r;
        return this;
    };
    n.prototype.setDimensions = function (r, s) {
        "use strict";
        this._request.width = r;
        this._request.height = s;
        return this;
    };
    n.prototype.setResizeMode = function (r) {
        "use strict";
        if (!l([j.COVER, j.CONTAIN], r))throw new TypeError('ImageSourceRequest.setResizeMode: invalid resize mode ' + r);
        this._request.resize_mode = r;
        return this;
    };
    n.prototype.setCallback = function (r) {
        "use strict";
        this._callback = r;
        return this;
    };
    n.prototype.send = function () {
        "use strict";
        if (!this._request.fbid || !this._request.width || !this._request.height || !this._request.type || !this._request.resize_mode || !this._callback)throw new Error('ImageSourceRequest: You must set all the fields');
        var r = p(), s = q(this._request);
        r.executeOrEnqueue(s, this._callback);
        if (r.getUnavailableResourcesFromRequest(s).length === 1) {
            k.trySend('/ajax/image_source.php', {requests: [this._request]});
            return true;
        }
        return false;
    };
    var o = null;

    function p() {
        if (o)return o;
        var r = new i();
        o = r;
        k.registerEndpoints({'/ajax/image_source.php': {request_user_id: g.getID(), mode: k.BATCH_DEFERRED_MULTI, batch_function: function (s, t) {
            m(s.requests, t.requests);
            return s;
        }, handler: function (s, t) {
            var u = t.getData().requests;
            for (var v = 0; v < u.length; ++v)r.setResource(q(u[v]), s[v]);
        }}});
        return r;
    }

    function q(r) {
        return [r.fbid, r.type, r.width, r.height, r.resize_mode].join('|');
    }

    e.exports = n;
}, null);
__d("MercuryIDs", [], function (a, b, c, d, e, f) {
    var g = {isValid: function (h) {
        if (!h || typeof h !== 'string')return false;
        return (/^\w{3,12}:/.test(h));
    }, isValidThreadID: function (h) {
        if (!g.isValid(h))return false;
        var i = g.tokenize(h);
        switch (i.type) {
            case 'user':
            case 'group':
            case 'thread':
            case 'root':
            case 'pending':
                return true;
            default:
                return false;
        }
    }, tokenize: function (h) {
        if (!this.isValid(h))throw ("bad_id_format " + h);
        var i = h.indexOf(':');
        return {type: h.substr(0, i), value: h.substr(i + 1)};
    }, getUserIDFromParticipantID: function (h) {
        if (!g.isValid(h))return null;
        var i = g.tokenize(h);
        if (i.type != 'fbid')return null;
        return i.value;
    }, getParticipantIDFromUserID: function (h) {
        if (isNaN(h))throw ("Not a user ID: " + h);
        return 'fbid:' + h;
    }, getUserIDFromThreadID: function (h) {
        if (!this.isCanonical(h))return null;
        return this.tokenize(h).value;
    }, isCanonical: function (h) {
        return this.isValid(h) && this.tokenize(h).type === 'user';
    }, isMultichat: function (h) {
        return this.isValid(h) && this.tokenize(h).type !== 'user';
    }};
    e.exports = g;
}, null);
__d("MercuryAssert", ["MercuryIDs"], function (a, b, c, d, e, f, g) {
    e.exports = {isParticipantID: function (h) {
        if (!g.isValid(h))throw ("bad_participant_id " + h);
    }, allParticipantIDs: function (h) {
        h.forEach(this.isParticipantID);
    }, isUserParticipantID: function (h) {
        var i = g.tokenize(h);
        if (i.type != 'fbid')throw ("bad_user_id " + h);
    }, isEmailParticipantID: function (h) {
        var i = g.tokenize(h);
        if (i.type != 'email')throw ("bad_email_id " + h);
    }, allThreadID: function (h) {
        h.forEach(this.isThreadID);
    }, isThreadID: function (h) {
        if (!g.isValid(h))throw ("bad_thread_id " + h);
    }};
}, null);
__d("MercuryCallbackRegistry", [], function (a, b, c, d, e, f) {
    'use strict';
    function g() {
        this.$MercuryCallbackRegistry0 = 0;
        this.$MercuryCallbackRegistry1 = {};
    }

    g.prototype.add = function (h) {
        var i = this.$MercuryCallbackRegistry0++;
        this.$MercuryCallbackRegistry1[i] = h;
        return {id: i, remove: this.remove.bind(this, i)};
    };
    g.prototype.call = function (h) {
        var i = Array.prototype.slice.call(arguments, 1), j = this.$MercuryCallbackRegistry1[h];
        if (j) {
            delete this.$MercuryCallbackRegistry1[h];
            j.apply(null, i);
        }
    };
    g.prototype.remove = function (h) {
        delete this.$MercuryCallbackRegistry1[h];
    };
    e.exports = g;
}, null);
__d("XMercurySendLogControllerURIBuilder", ["XControllerURIBuilder"], function (a, b, c, d, e, f) {
    e.exports = b("XControllerURIBuilder").create("\/messaging\/send_logger\/", {message_id: {type: "String", required: true}, event: {type: "Enum", required: true}, is_canonical: {type: "Bool"}});
}, null);
__d("MercurySendLogger", ["AsyncSignal", "XMercurySendLogControllerURIBuilder"], function (a, b, c, d, e, f, g, h) {
    var i = false, j = {CLIENT_SEND_SUCCEEDED: 'client_send_succeeded', CLIENT_SEND_FAILED: 'client_send_failed', CLIENT_CHANNEL_ECHO: 'client_channel_echo', enable: function () {
        i = true;
    }, log: function (event, k, l) {
        if (!i)return;
        new g((new h()).setEnum('event', event).setString('message_id', k).setBool('is_canonical', !!l.canonical).getURI().toString()).send();
    }};
    e.exports = j;
}, null);
__d("MercurySendErrorLogger", ["Banzai", "BanzaiLogger"], function (a, b, c, d, e, f, g, h) {
    var i = h.create({retry: true}), j = g.isEnabled('mercury_send_attempt_logging'), k = {log: function (l) {
        if (!j)return;
        var m = {message_id: l.message_id, timestamp_client: Date.now(), error_type: l.error_data.type, error_code: l.error_data.code, error_description: l.error_data.description, is_transient: l.error_data.is_transient};
        i.log('MercurySendErrorLoggerConfig', m);
    }};
    e.exports = k;
}, null);
__d("MercurySendTimeoutRetryManager", ["MercurySendTimeoutRetryManagerConfig"], function (a, b, c, d, e, f, g) {
    var h = {}, i = {shouldRetry: function (j) {
        var k = j.getData(), l = this._extractUniqueIdentifier(k.message_batch);
        if (h[l] === undefined)h[l] = g.initial_retries;
        var m = h[l] > 0;
        h[l]--;
        return m;
    }, _extractUniqueIdentifier: function (j) {
        var k = '';
        for (var l = 0; l < j.length; l++) {
            var m = j[l];
            k = k + 'id:' + m.message_id + ',ts:' + m.timestamp;
        }
        return k;
    }};
    e.exports = i;
}, null);
__d("MessagingReliabilityLogger", ["PresenceUtil", "MercuryServerDispatcher", "MessagingReliabilityLoggerInitialData", "isEmpty", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = '/ajax/mercury/client_reliability.php', m = 60000;

    function n(t, u) {
        var v = {app: i.app, categories: JSON.stringify(t)};
        if (!j(u))v.extra = JSON.stringify(u);
        return v;
    }

    function o(t, u, v, w) {
        if (t[u] === undefined)t[u] = {};
        if (t[u][v] === undefined)t[u][v] = 0;
        t[u][v] += w;
    }

    function p(t, u, v, w) {
        if (t[u] === undefined)t[u] = {};
        if (t[u][v] === undefined)t[u][v] = [];
        for (var x = 0; x < w.length; ++x)t[u][v].push(w[x]);
    }

    function q(t, u) {
        if ((t && !t.categories) || (u && !u.categories))return;
        var v = t ? JSON.parse(t.categories) : {}, w = t && t.extra ? JSON.parse(t.extra) : {}, x = JSON.parse(u.categories), y = u.extra ? JSON.parse(u.extra) : {};
        for (var z in x) {
            var aa = x[z], ba = y[z];
            for (var ca in aa) {
                o(v, z, ca, aa[ca]);
                if (ba !== undefined) {
                    var da = ba[ca];
                    if (da !== undefined)p(w, z, ca, da);
                }
            }
        }
        return n(v, w);
    }

    var r = {};
    r[l] = {mode: h.BATCH_SUCCESSIVE_PIGGYBACK_ON_ERROR, batch_function: q};
    h.registerEndpoints(r);
    var s = {addEntry: function (t, u, v) {
        if (!i.enabled)return;
        var w = {};
        o(w, t, u, 1);
        var x = {};
        if (v !== undefined)p(x, t, u, [v]);
        h.trySend(l, n(w, x));
    }};
    (function t() {
        s.addEntry('page_event', 'active', g.getSessionID());
        k(t, m);
    })();
    e.exports = s;
}, null);
__d("MercuryThreadInformer", ["ArbiterMixin", "LogHistory", "MercuryAssert", "MercuryLoggingHelper", "MercurySingletonMixin", "copyProperties", "mapObject", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    'use strict';
    var o = h.getInstance('mercury_informer'), p = n(g);
    for (var q in p)if (p.hasOwnProperty(q))s[q] = p[q];
    var r = p === null ? null : p.prototype;
    s.prototype = Object.create(r);
    s.prototype.constructor = s;
    s.__superConstructor__ = p;
    function s(u) {
        this.$MercuryThreadInformer0 = u;
        this.$MercuryThreadInformer1 = {};
        this.$MercuryThreadInformer2 = {};
        this.$MercuryThreadInformer3 = {};
        this.$MercuryThreadInformer4 = false;
        this.$MercuryThreadInformer5 = false;
        this.$MercuryThreadInformer6 = false;
        this.$MercuryThreadInformer7 = {};
        this.$MercuryThreadInformer8 = {};
        this.$MercuryThreadInformer9 = {};
        this.$MercuryThreadInformera = 0;
    }

    s.prototype.updatedThread = function (u) {
        this.$MercuryThreadInformer2[u] = true;
        this.$MercuryThreadInformerb();
    };
    s.prototype.deletedThread = function (u) {
        this.$MercuryThreadInformer1[u] = true;
        this.$MercuryThreadInformerb();
    };
    s.prototype.updatedThreadlist = function () {
        this.$MercuryThreadInformer4 = true;
        this.$MercuryThreadInformerb();
    };
    s.prototype.updatedUnseenState = function () {
        this.$MercuryThreadInformer5 = true;
        this.$MercuryThreadInformerb();
    };
    s.prototype.updatedUnreadState = function () {
        this.$MercuryThreadInformer6 = true;
        this.$MercuryThreadInformerb();
    };
    s.prototype.changedThreadReadState = function (u, v, w) {
        if (!this.$MercuryThreadInformer3[u] || this.$MercuryThreadInformer3[u].timestamp < w)this.$MercuryThreadInformer3[u] = {mark_as_read: v, timestamp: w};
        this.$MercuryThreadInformerb();
    };
    s.prototype.receivedMessage = function (u) {
        i.isThreadID(u.thread_id);
        var v = u.thread_id;
        if (!this.$MercuryThreadInformer7[v])this.$MercuryThreadInformer7[v] = [];
        this.$MercuryThreadInformer7[v].push(u);
        this.updatedThread(v);
    };
    s.prototype.reorderedMessages = function (u, v) {
        this.$MercuryThreadInformer8[u] = {source: v};
        this.$MercuryThreadInformerb();
    };
    s.prototype.updatedMessage = function (u, v, w) {
        if (!this.$MercuryThreadInformer9[u])this.$MercuryThreadInformer9[u] = {};
        this.$MercuryThreadInformer9[u][v] = {source: w};
        this.updatedThread(u);
    };
    s.prototype.synchronizeInforms = function (u) {
        this.$MercuryThreadInformera++;
        try {
            u();
        } catch (v) {
            throw v;
        } finally {
            this.$MercuryThreadInformera--;
            this.$MercuryThreadInformerb();
        }
    };
    s.prototype.listen = function (u, v) {
        return this.subscribe('threads-updated', function (w, x) {
            if (x[u])v(u);
        });
    };
    s.prototype.$MercuryThreadInformerb = function () {
        if (!this.$MercuryThreadInformera) {
            var u = this.$MercuryThreadInformer1, v = this.$MercuryThreadInformer2, w = this.$MercuryThreadInformer3, x = this.$MercuryThreadInformer4, y = this.$MercuryThreadInformer5, z = this.$MercuryThreadInformer6, aa = this.$MercuryThreadInformer7, ba = this.$MercuryThreadInformer8, ca = this.$MercuryThreadInformer9;
            this.$MercuryThreadInformer1 = {};
            this.$MercuryThreadInformer2 = {};
            this.$MercuryThreadInformer3 = {};
            this.$MercuryThreadInformer4 = false;
            this.$MercuryThreadInformer5 = false;
            this.$MercuryThreadInformer6 = false;
            this.$MercuryThreadInformer7 = {};
            this.$MercuryThreadInformer8 = {};
            this.$MercuryThreadInformer9 = {};
            var da = Object.keys(v);
            if (da.length || x)this.$MercuryThreadInformerc('threadlist-updated', da);
            if (da.length)this.$MercuryThreadInformerc('threads-updated', v);
            for (var ea in w) {
                this.$MercuryThreadInformerc('thread-read-changed', w);
                break;
            }
            for (ea in u) {
                this.$MercuryThreadInformerc('threads-deleted', u);
                break;
            }
            if (y)this.$MercuryThreadInformerc('unseen-updated', null);
            if (z)this.$MercuryThreadInformerc('unread-updated', null);
            for (ea in aa) {
                this.$MercuryThreadInformerc('messages-received', aa);
                break;
            }
            for (ea in ba) {
                this.$MercuryThreadInformerc('messages-reordered', ba);
                break;
            }
            for (ea in ca) {
                this.$MercuryThreadInformerc('messages-updated', ca);
                break;
            }
        }
    };
    s.prototype.$MercuryThreadInformerc = function (u, v) {
        t(u, v);
        this.inform(u, v);
    };
    function t(u, v) {
        var w = v;
        if (u == 'messages-received')w = m(w, function (x) {
            return x.map(function (y) {
                return j.obfuscateMessage(y);
            });
        });
        o.debug(u, w);
    }

    l(s, k);
    e.exports = s;
}, null);
__d("MercuryServerRequests", ["Arbiter", "ArbiterMixin", "AsyncResponse", "BanzaiLogger", "ChannelConstants", "CurrentUser", "KeyedCallbackManager", "LogHistory", "MercuryActionStatus", "MercuryActionTypeConstants", "MercuryAPIArgsSource", "MercuryAssert", "MercuryConfig", "MercuryErrorType", "MercuryGenericConstants", "MercuryGlobalActionType", "MercuryIDs", "MercuryLoggingHelper", "MercuryLogMessageType", "MercuryMessageClientState", "MercuryPayloadSource", "MercurySendLogger", "MercurySendErrorLogger", "MercurySendTimeoutRetryManager", "MercuryServerRequestsConfig", "MercurySingletonMixin", "MercurySourceType", "MercuryThreadlistConstants", "MercuryMessageIDs", "MessagingConfig", "MessagingReliabilityLogger", "MessagingTag", "MercuryServerDispatcher", "MercuryThreadInformer", "copyProperties", "createObjectFrom", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma, na, oa, pa, qa) {
    "use strict";
    var ra = n.getInstance('mercury_server'), sa = q.MERCURY;

    function ta(lc, mc) {
        if (mc)lc._lastActionTimestamp = Math.max(lc._lastActionTimestamp, mc);
    }

    function ua(lc, mc) {
        var nc = mc.thread_id, oc = lc._serverToClientIDs.getResource(nc);
        if (!oc) {
            if (mc.canonical_fbid) {
                oc = 'user:' + mc.canonical_fbid;
            } else if (mc.root_message_threading_id)oc = 'root:' + mc.root_message_threading_id;
            oc = oc || 'thread:' + nc;
            wa(lc, nc, oc);
        }
        mc.thread_id = oc;
    }

    function va(lc, mc) {
        var nc = mc.thread_fbid;
        if (mc.canonical_fbid)nc = mc.canonical_fbid;
        var oc = lc._FBIDToClientIDs.getResource(nc);
        if (!oc) {
            if (mc.canonical_fbid) {
                oc = 'user:' + mc.canonical_fbid;
            } else if (mc.root_message_threading_id)oc = 'root:' + mc.root_message_threading_id;
            oc = oc || 'thread:' + nc;
            if (nc)nc = nc.toString();
            xa(lc, nc, oc);
            if (mc.thread_id)wa(lc, mc.thread_id, oc);
        }
        mc.thread_id = oc;
    }

    function wa(lc, mc, nc) {
        lc._serverToClientIDs.setResource(mc, nc);
        lc._clientToServerIDs.setResource(nc, mc);
        lc._newlyAddedClientIDs[mc] = nc;
    }

    function xa(lc, mc, nc) {
        lc._clientIDToFBIDs.setResource(nc, mc);
        lc._FBIDToClientIDs.setResource(mc, nc);
        lc._newlyAddedClientIDs[mc] = nc;
    }

    function ya(lc, mc, nc) {
        var oc = lc._clientToServerIDs.executeOrEnqueue(mc, nc), pc = lc._clientToServerIDs.getUnavailableResources(oc), qc = w.tokenize(mc);
        if (pc.length && qc.type != 'root')lc.fetchThreadData(pc);
    }

    function za(lc, mc, nc) {
        var oc = lc._clientIDToFBIDs.executeOrEnqueue(mc, nc), pc = lc._clientIDToFBIDs.getUnavailableResources(oc), qc = w.tokenize(mc);
        if (pc.length && qc.type != 'root')lc.fetchThreadData(pc);
    }

    function ab(lc, mc) {
        return lc._clientToServerIDs.getResource(mc);
    }

    function bb(lc, mc) {
        return lc._clientIDToFBIDs.getResource(mc);
    }

    function cb(lc, mc) {
        return !!lc._serverToClientIDs.getResource(mc);
    }

    function db(lc, mc) {
        return !!lc._FBIDToClientIDs.getResource(mc);
    }

    function eb(lc, mc) {
        var nc = lc._serverToClientIDs.getResource(mc);
        if (typeof nc == 'undefined')ra.warn('no_client_thread_id', {server_id: mc});
        return nc;
    }

    function fb(lc, mc) {
        var nc = lc._FBIDToClientIDs.getResource(mc);
        if (typeof nc == 'undefined')ra.warn('no_client_thread_id', {thread_fbid: mc});
        return nc;
    }

    function gb(lc, mc, nc) {
        lc._serverToClientIDs.executeOrEnqueue(mc, nc);
        lc.ensureThreadIsFetched(mc);
    }

    function hb(lc, mc, nc) {
        lc._FBIDToClientIDs.executeOrEnqueue(mc, nc);
        lc.ensureThreadIsFetched(mc);
    }

    function ib(lc, mc, nc) {
        if (mc.action_type != p.SEND_MESSAGE)return;
        var oc = mc.client_thread_id;
        if (!oc)oc = eb(lc, mc.thread_id);
        var pc = null;
        if (oc)pc = w.tokenize(oc).type;
        lb(lc, mc, nc === 'success');
        if (mc.status === o.ERROR) {
            ca.log(mc);
        } else {
            ka.addEntry('send_' + pc, nc, mc.thread_id + ',' + mc.message_id);
            ba.log(nc === 'success' ? ba.CLIENT_SEND_SUCCEEDED : ba.CLIENT_SEND_FAILED, mc.client_message_id, {canonical: pc && !w.isMultichat(oc)});
        }
    }

    function jb(lc, mc, nc) {
        if (mc.action_type != p.SEND_MESSAGE)return;
        var oc = mc.thread_fbid;
        if (mc.other_user_fbid)oc = mc.other_user_fbid;
        var pc = mc.client_thread_id;
        if (!pc)pc = fb(lc, oc);
        var qc = null;
        if (pc)qc = w.tokenize(pc).type;
        lb(lc, mc, nc === 'success');
        if (mc.status === o.ERROR) {
            ca.log(mc);
        } else {
            ka.addEntry('send_' + qc, nc, oc + ',' + mc.message_id);
            ba.log(nc === 'success' ? ba.CLIENT_SEND_SUCCEEDED : ba.CLIENT_SEND_FAILED, mc.client_message_id, {canonical: qc && !w.isMultichat(pc)});
        }
    }

    function kb(lc) {
        return lc.getError() ? '_' + lc.getError() : '';
    }

    function lb(lc, mc, nc) {
        if (Math.floor(Math.random() * 20) === 0)if (mc.client_message_id in lc._sentMessagesTimestamp) {
            var oc = lc._sentMessagesTimestamp[mc.client_message_id], pc = Date.now() - oc, qc = mc.client_thread_id;
            if (!qc)if (s.MercuryFBIDGK) {
                qc = fb(lc, mc.thread_fbid);
            } else qc = eb(lc, mc.thread_id);
            j.log('WebMessagingLatencyLoggerConfig', {has_attachment: mc.attachments && mc.attachments.length > 0, latency: pc, is_canonical: !w.isMultichat(qc), send_successful: nc, source: 'client'});
        }
    }

    function mb(lc, mc) {
        var nc = null;
        switch (mc.status) {
            case o.SUCCESS:
                nc = 'success';
                break;
            case o.FAILED_UNKNOWN_REASON:
                nc = 'confirmed_error';
                break;
            case o.UNABLE_TO_CONFIRM:
                nc = 'confirm_error';
                break;
            default:
                return;
        }
        if (s.MercuryFBIDGK) {
            jb(lc, mc, nc);
        } else ib(lc, mc, nc);
    }

    function nb(lc, mc) {
        (mc.message_counts || []).forEach(function (vc) {
            ta(lc, vc.seen_timestamp);
        });
        (mc.threads || []).forEach(function (vc) {
            ua(lc, vc);
            delete lc._fetchingThreads[vc.thread_id];
            var wc = ab(lc, vc.thread_id);
            delete lc._fetchingThreads[wc];
            ta(lc, vc.timestamp);
        });
        (mc.ordered_threadlists || []).forEach(function (vc) {
            vc.thread_ids = vc.thread_ids.map(eb.bind(null, lc));
        });
        mc.actions = mc.actions || [];
        mc.actions.forEach(function (vc) {
            mb(lc, vc);
            if (vc.status && vc.status != o.SUCCESS && !vc.thread_id) {
                vc.thread_id = vc.client_thread_id;
                return;
            }
            if (vc.action_type == p.SEND_MESSAGE && vc.client_thread_id && vc.client_thread_id != u.PENDING_THREAD_ID && vc.thread_id)wa(lc, vc.thread_id, vc.client_thread_id);
            vc.server_thread_id = vc.thread_id;
            if (vc.thread_id) {
                vc.thread_id = cb(lc, vc.thread_id) ? eb(lc, vc.thread_id) : null;
            } else if (vc.client_thread_id)vc.thread_id = vc.client_thread_id;
            ta(lc, vc.timestamp);
        });
        if (mc.end_of_history) {
            var nc = [];
            for (var oc = 0; oc < mc.end_of_history.length; oc++) {
                var pc = mc.end_of_history[oc];
                if (pc.type == 'user') {
                    nc.push('user:' + pc.id);
                } else if (pc.type == 'thread' && cb(lc, pc.id))nc.push(eb(lc, pc.id));
            }
            mc.end_of_history = nc;
        }
        if (mc.roger) {
            var qc = {};
            for (var rc in mc.roger) {
                var sc = lc._serverToClientIDs.getResource(rc);
                if (sc) {
                    var tc = mc.roger[rc];
                    qc[sc] = {};
                    for (var uc in tc)qc[sc]['fbid:' + uc] = tc[uc];
                }
            }
            mc.roger = qc;
        }
    }

    function ob(lc, mc) {
        (mc.threads || []).forEach(function (vc) {
            va(lc, vc);
            delete lc._fetchingThreads[vc.thread_id];
            var wc = bb(lc, vc.thread_id);
            delete lc._fetchingThreads[wc];
            ta(lc, vc.timestamp);
        });
        (mc.ordered_threadlists || []).forEach(function (vc) {
            var wc = vc.thread_fbids || [];
            wc = wc.concat(vc.other_user_fbids || []);
            vc.thread_ids = wc.map(fb.bind(null, lc));
        });
        mc.actions = mc.actions || [];
        mc.actions.forEach(function (vc) {
            mb(lc, vc);
            var wc = vc.thread_fbid;
            if (vc.other_user_fbid)wc = vc.other_user_fbid;
            if (vc.status && vc.status != o.SUCCESS && !wc) {
                vc.thread_id = vc.client_thread_id;
                return;
            }
            if (vc.action_type == p.SEND_MESSAGE && vc.client_thread_id && vc.client_thread_id != u.PENDING_THREAD_ID && wc)xa(lc, wc.toString(), vc.client_thread_id);
            var xc = vc.thread_id;
            if (wc) {
                vc.thread_id = db(lc, wc) ? fb(lc, wc) : null;
            } else if (vc.client_thread_id)vc.thread_id = vc.client_thread_id;
            if (!vc.thread_id)vc.server_thread_id = xc;
            ta(lc, vc.timestamp);
        });
        if (mc.end_of_history) {
            var nc = [];
            for (var oc = 0; oc < mc.end_of_history.length; oc++) {
                var pc = mc.end_of_history[oc];
                if (pc.type == 'user') {
                    nc.push('user:' + pc.fbid);
                } else if (pc.type == 'thread' && db(lc, pc.fbid))nc.push(fb(lc, pc.fbid));
            }
            mc.end_of_history = nc;
        }
        if (mc.roger) {
            var qc = {};
            for (var rc in mc.roger) {
                var sc = lc._serverToClientIDs.getResource(rc);
                if (sc) {
                    var tc = mc.roger[rc];
                    qc[sc] = {};
                    for (var uc in tc)qc[sc]['fbid:' + uc] = tc[uc];
                }
            }
            mc.roger = qc;
        }
    }

    function pb(lc) {
        if (lc._pendingUpdates && lc._pendingUpdates.length) {
            var mc = lc._pendingUpdates[0];
            lc._pendingUpdates = lc._pendingUpdates.slice(1);
            lc.handleUpdate(mc);
        }
    }

    function qb(lc, mc) {
        var nc = oa({}, lc), oc;
        if (mc.threads) {
            if (!nc.threads)nc.threads = {};
            for (oc in mc.threads)nc.threads[oc] = Object.keys(pa((nc.threads[oc] || []).concat(mc.threads[oc])));
        }
        if (mc.messages) {
            if (!nc.messages)nc.messages = {};
            for (oc in mc.messages) {
                if (!nc.messages[oc])nc.messages[oc] = {};
                for (var pc in mc.messages[oc])if (nc.messages[oc][pc]) {
                    nc.messages[oc][pc] = tb(nc.messages[oc][pc], mc.messages[oc][pc]);
                } else nc.messages[oc][pc] = mc.messages[oc][pc];
            }
        }
        nc.client = lc.client || mc.client;
        return nc;
    }

    function rb(lc, mc) {
        var nc = oa(pa(lc.folders, true), pa(mc.folders, true)), oc = lc.client || mc.client;
        return {folders: Object.keys(nc), client: oc};
    }

    function sb(lc, mc) {
        for (var nc in mc)if (lc[nc] && typeof lc[nc] === 'object') {
            lc[nc] = tb(lc[nc], mc[nc]);
        } else if (mc[nc] && typeof mc[nc] === 'object') {
            var oc = {};
            oa(oc, mc[nc]);
            lc[nc] = oc;
        }
        return lc;
    }

    function tb(lc, mc) {
        var nc = lc.offset < mc.offset ? lc.offset : mc.offset, oc = lc.offset + lc.limit, pc = mc.offset + mc.limit, qc = (oc > pc) ? oc : pc, rc = qc - nc;
        return {offset: nc, limit: rc};
    }

    function ub(lc, mc) {
        var nc = lc.client || mc.client, oc = {ids: {}, client: nc};
        oa(oc.ids, lc.ids);
        oa(oc.ids, mc.ids);
        return oc;
    }

    function vb(lc, mc) {
        var nc = {}, oc, pc = lc.client || mc.client;
        delete lc.client;
        delete mc.client;
        for (oc in lc)oa(nc, pa(lc[oc], oc));
        for (oc in mc)oa(nc, pa(mc[oc], oc));
        var qc = {client: pc};
        for (var rc in nc) {
            oc = nc[rc];
            if (!qc[oc])qc[oc] = [];
            qc[oc].push(rc);
        }
        return qc;
    }

    function wb(lc, mc) {
        var nc = lc.client || mc.client, oc = pa(lc.ids, true), pc = pa(mc.ids, true), qc = oa(oc, pc);
        return {ids: Object.keys(qc), client: nc};
    }

    function xb(lc) {
        this._fbid = lc;
        this._lastActionTimestamp = 0;
        this._serverToClientIDs = new m();
        this._clientToServerIDs = new m();
        this._FBIDToClientIDs = new m();
        this._clientIDToFBIDs = new m();
        this._pendingUpdates = [];
        this._fetchingThreads = {};
        this._newlyAddedClientIDs = {};
        this._sentMessagesTimestamp = {};
        jc(this);
    }

    oa(xb.prototype, h, {getServerThreadID: function (lc, mc) {
        r.isThreadID(lc);
        if (s.MercuryFBIDGK) {
            za(this, lc, mc);
        } else ya(this, lc, mc);
    }, getThreadFBID: function (lc, mc) {
        r.isThreadID(lc);
        za(this, lc, mc);
    }, getClientThreadID: function (lc, mc) {
        if (s.MercuryFBIDGK) {
            hb(this, lc, mc);
        } else gb(this, lc, mc);
    }, getClientThreadIDNow: function (lc) {
        if (s.MercuryFBIDGK) {
            return fb(this, lc);
        } else return eb(this, lc);
    }, getServerThreadIDNow: function (lc) {
        if (s.MercuryFBIDGK) {
            return bb(this, lc);
        } else return ab(this, lc);
    }, getClientThreadIDForPermalinks: function (lc) {
        return eb(this, lc);
    }, convertThreadIDIfAvailable: function (lc) {
        var mc;
        if (s.MercuryFBIDGK) {
            mc = this._FBIDToClientIDs.getResource(lc);
            if (mc === undefined) {
                return lc;
            } else return mc;
        } else {
            mc = this._serverToClientIDs.getResource(lc);
            if (mc === undefined) {
                return lc;
            } else return mc;
        }
    }, isUser: function (lc) {
        return lc < 2.2e+09 || (lc >= 1e+14 && lc <= 100099999989999) || (lc >= 8.9e+13 && lc <= 89999999999999);
    }, canLinkExternallyThreadID: function (lc) {
        r.isThreadID(lc);
        var mc = w.tokenize(lc);
        return (mc.type == 'user') || !!ab(this, lc);
    }, canLinkExternallyFBID: function (lc) {
        r.isThreadID(lc);
        var mc = w.tokenize(lc);
        return (mc.type == 'user') || !!bb(this, lc);
    }, canLinkExternally: function (lc) {
        if (s.MercuryFBIDGK) {
            return this.canLinkExternallyFBID(lc);
        } else return this.canLinkExternallyThreadID(lc);
    }, fetchThreadlistInfo: function (lc, mc, nc, oc, pc) {
        nc = nc || la.INBOX;
        pc = pc || sa;
        var qc = oc ? ma.IMMEDIATE : null, rc = {client: pc};
        rc[nc] = {offset: lc, limit: mc, filter: oc};
        kc(this, '/ajax/mercury/threadlist_info.php', rc, qc);
    }, fetchUnseenThreadIDs: function (lc, mc) {
        mc = mc || sa;
        this.fetchThreadlistInfo(ha.RECENT_THREAD_OFFSET, ha.JEWEL_THREAD_COUNT, lc, null, mc);
    }, fetchUnreadThreadIDs: function (lc, mc) {
        mc = mc || sa;
        kc(this, '/ajax/mercury/unread_threads.php', {folders: [lc], client: mc});
    }, fetchMissedMessages: function (lc, mc) {
        mc = mc || sa;
        var nc = {last_action_timestamp: this._lastActionTimestamp, folders: lc, client: mc};
        nc.last_action_timestamp = this._lastActionTimestamp;
        kc(this, '/ajax/mercury/thread_sync.php', nc);
    }, fetchThreadData: function (lc, mc) {
        if (s.MercuryFBIDGK) {
            this.fetchThreadDataFBID(lc, mc);
        } else this.fetchThreadDataThreadID(lc, mc);
    }, fetchThreadDataThreadID: function (lc, mc) {
        mc = mc || sa;
        r.allThreadID(lc);
        var nc = {threads: {}, client: mc}, oc = [], pc = [];
        lc.forEach(function (rc) {
            if (this._fetchingThreads[rc])return;
            this._fetchingThreads[rc] = true;
            var sc = ab(this, rc);
            if (sc) {
                pc.push(sc);
                nc.threads.thread_ids = pc;
            } else {
                var tc = w.tokenize(rc);
                if (tc.type == 'user') {
                    oc.push(tc.value);
                    nc.threads.user_ids = oc;
                } else if (tc.type == 'thread') {
                    pc.push(tc.value);
                    nc.threads.thread_ids = pc;
                } else if (tc.type != 'root' && tc.type != 'pending')throw new Error('Unknown thread type', tc);
            }
        }.bind(this));
        this.inform("fetch-thread-data", nc);
        for (var qc in nc.threads) {
            kc(this, '/ajax/mercury/thread_info.php', nc);
            break;
        }
    }, fetchThreadDataFBID: function (lc, mc) {
        mc = mc || sa;
        r.allThreadID(lc);
        var nc = {threads: {}, client: mc}, oc = [], pc = [];
        lc.forEach(function (rc) {
            if (this._fetchingThreads[rc])return;
            this._fetchingThreads[rc] = true;
            var sc = bb(this, rc), tc = w.tokenize(rc);
            if (tc.type == 'user') {
                oc.push(tc.value);
                nc.threads.user_ids = oc;
            } else if (tc.type == 'thread') {
                if (sc) {
                    pc.push(sc);
                } else pc.push(tc.value);
                nc.threads.thread_fbids = pc;
            } else if (tc.type != 'root' && tc.type != 'pending')throw new Error('Unknown thread type', tc);
        }.bind(this));
        this.inform("fetch-thread-data", nc);
        for (var qc in nc.threads) {
            kc(this, '/ajax/mercury/thread_info.php', nc);
            break;
        }
    }, ensureThreadIsFetched: function (lc, mc) {
        if (s.MercuryFBIDGK) {
            this.ensureThreadIsFetchedFBID(lc, mc);
        } else this.ensureThreadIsFetchedThreadID(lc, mc);
    }, ensureThreadIsFetchedThreadID: function (lc, mc) {
        mc = mc || sa;
        if (!this._serverToClientIDs.getResource(lc) && !this._fetchingThreads[lc]) {
            this._fetchingThreads[lc] = true;
            kc(this, '/ajax/mercury/thread_info.php', {threads: {thread_ids: [lc]}, client: mc});
        }
    }, ensureThreadIsFetchedFBID: function (lc, mc) {
        mc = mc || sa;
        if (!this._FBIDToClientIDs.getResource(lc) && !this._fetchingThreads[lc]) {
            this._fetchingThreads[lc] = true;
            kc(this, '/ajax/mercury/thread_info.php', {threads: {thread_fbids: [lc]}, client: mc});
        }
    }, fetchThreadMessages: function (lc, mc, nc, oc, pc) {
        if (s.MercuryFBIDGK) {
            this.fetchThreadMessagesFBID(lc, mc, nc, oc, pc);
        } else this.fetchThreadMessagesThreadID(lc, mc, nc, oc, pc);
    }, fetchThreadMessagesThreadID: function (lc, mc, nc, oc, pc) {
        r.isThreadID(lc);
        pc = pc || sa;
        var qc, rc, sc = w.tokenize(lc), tc = ab(this, lc), uc = false;
        if (tc) {
            rc = 'thread_ids';
            qc = tc;
        } else {
            qc = sc.value;
            switch (sc.type) {
                case 'user':
                    rc = 'user_ids';
                    uc = true;
                    break;
                case 'thread':
                    rc = 'thread_ids';
                    break;
            }
        }
        var vc = {messages: {}, threads: {}, client: pc};
        if (rc) {
            vc.messages[rc] = {};
            vc.messages[rc][qc] = {offset: mc, limit: nc};
            if (uc)vc.threads[rc] = [qc];
            kc(this, '/ajax/mercury/thread_info.php', vc, oc);
        } else ya(this, lc, function (wc) {
            vc.messages.thread_ids = {};
            vc.messages.thread_ids[wc] = {offset: mc, limit: nc};
            kc(this, '/ajax/mercury/thread_info.php', vc, oc);
        }.bind(this));
    }, fetchThreadMessagesFBID: function (lc, mc, nc, oc, pc) {
        r.isThreadID(lc);
        pc = pc || sa;
        var qc, rc, sc = w.tokenize(lc), tc = bb(this, lc), uc = false;
        if (tc) {
            qc = tc;
            rc = (sc.type == 'user') ? 'user_ids' : 'thread_fbids';
        } else {
            qc = sc.value;
            switch (sc.type) {
                case 'user':
                    rc = 'user_ids';
                    uc = true;
                    break;
                case 'thread':
                    rc = 'thread_fbids';
                    break;
            }
        }
        var vc = {messages: {}, threads: {}, client: pc};
        if (rc) {
            vc.messages[rc] = {};
            vc.messages[rc][qc] = {offset: mc, limit: nc};
            if (uc)vc.threads[rc] = [qc];
            kc(this, '/ajax/mercury/thread_info.php', vc, oc);
        } else za(this, lc, function (wc) {
            vc.messages.thread_fbids = {};
            vc.messages.thread_fbids[wc] = {offset: mc, limit: nc};
            kc(this, '/ajax/mercury/thread_info.php', vc, oc);
        }.bind(this));
    }, handleThreadInfoError: function (lc) {
        if (s.MercuryFBIDGK) {
            this.handleThreadInfoErrorFBID(lc);
        } else this.handleThreadInfoErrorThreadID(lc);
    }, handleThreadInfoErrorThreadID: function (lc) {
        var mc = lc.getRequest().getData(), nc = [];
        if (mc.messages) {
            for (var oc in mc.messages.thread_ids)nc.push(yb(eb(this, oc)));
            for (var pc in mc.messages.user_ids)nc.push(yb('user:' + pc));
            for (var qc in mc.messages.group_ids)nc.push(yb('group:' + qc));
        }
        if (nc.length)this.handleUpdate({actions: nc, from_client: true, payload_source: aa.CLIENT_CHANNEL_MESSAGE});
        if (mc.threads && (mc.threads.user_ids || mc.threads.group_ids || mc.threads.thread_ids)) {
            var rc = 5, sc = true;
            if (!mc.retry_count) {
                mc.retry_count = 0;
                if (mc.messages)delete mc.messages;
            } else if (mc.retry_count >= rc) {
                sc = false;
                (mc.threads.thread_ids || []).forEach(function (uc) {
                    if (uc in this._fetchingThreads)delete this._fetchingThreads[uc];
                }.bind(this));
            }
            if (sc) {
                var tc = mc.retry_count * 1000;
                qa(function () {
                    ra.log('retry_thread', mc);
                    kc(this, '/ajax/mercury/thread_info.php', mc);
                }.bind(this), tc);
                mc.retry_count++;
            }
        }
    }, handleThreadInfoErrorFBID: function (lc) {
        var mc = lc.getRequest().getData(), nc = [];
        if (mc.messages) {
            for (var oc in mc.messages.thread_fbids)nc.push(yb(fb(this, oc)));
            for (var pc in mc.messages.user_ids)nc.push(yb('user:' + pc));
            for (var qc in mc.messages.group_ids)nc.push(yb('group:' + qc));
        }
        if (nc.length)this.handleUpdate({actions: nc, from_client: true, payload_source: aa.CLIENT_CHANNEL_MESSAGE});
        if (mc.threads && (mc.threads.user_ids || mc.threads.group_ids || mc.threads.thread_ids)) {
            var rc = 5, sc = true;
            if (!mc.retry_count) {
                mc.retry_count = 0;
                if (mc.messages)delete mc.messages;
            } else if (mc.retry_count >= rc) {
                sc = false;
                (mc.threads.thread_ids || []).forEach(function (uc) {
                    if (uc in this._fetchingThreads)delete this._fetchingThreads[uc];
                }.bind(this));
            }
            if (sc) {
                var tc = mc.retry_count * 1000;
                qa(function () {
                    ra.log('retry_thread', mc);
                    kc(this, '/ajax/mercury/thread_info.php', mc);
                }.bind(this), tc);
                mc.retry_count++;
            }
        }
    }, markFolderAsRead: function (lc) {
        kc(this, '/ajax/mercury/mark_folder_as_read.php', {folder: lc});
        var mc = [
            {action_type: v.MARK_ALL_READ, action_id: null, folder: lc}
        ];
        this.handleUpdate({global_actions: mc, from_client: true, payload_source: aa.CLIENT_CHANGE_READ_STATUS});
    }, changeThreadReadStatus: function (lc, mc, nc) {
        if (s.MercuryFBIDGK) {
            this.changeThreadReadStatusFBID(lc, mc, nc);
        } else this.changeThreadReadStatusThreadID(lc, mc, nc);
    }, changeThreadReadStatusThreadID: function (lc, mc, nc) {
        r.isThreadID(lc);
        ya(this, lc, function (pc) {
            var qc = {ids: {}};
            qc.ids[pc] = mc;
            kc(this, '/ajax/mercury/change_read_status.php', qc);
        }.bind(this));
        var oc = [
            {action_type: p.CHANGE_READ_STATUS, action_id: null, thread_id: lc, mark_as_read: mc, folder: nc}
        ];
        this.handleUpdate({actions: oc, from_client: true, payload_source: aa.CLIENT_CHANGE_READ_STATUS});
    }, changeThreadReadStatusFBID: function (lc, mc, nc) {
        r.isThreadID(lc);
        za(this, lc, function (pc) {
            var qc = {ids: {}};
            qc.ids[pc] = mc;
            kc(this, '/ajax/mercury/change_read_status.php', qc);
        }.bind(this));
        var oc = [
            {action_type: p.CHANGE_READ_STATUS, action_id: null, thread_id: lc, mark_as_read: mc, folder: nc}
        ];
        this.handleUpdate({actions: oc, from_client: true, payload_source: aa.CLIENT_CHANGE_READ_STATUS});
    }, changeThreadArchivedStatus: function (lc, mc) {
        if (s.MercuryFBIDGK) {
            this.changeThreadArchivedStatusFBID(lc, mc);
        } else this.changeThreadArchivedStatusThreadID(lc, mc);
    }, changeThreadArchivedStatusThreadID: function (lc, mc) {
        r.isThreadID(lc);
        ya(this, lc, function (pc) {
            var qc = {ids: {}};
            qc.ids[pc] = mc;
            kc(this, '/ajax/mercury/change_archived_status.php', qc);
        }.bind(this));
        var nc = {action_type: p.CHANGE_ARCHIVED_STATUS, action_id: null, thread_id: lc, archived: mc}, oc = {actions: [nc], from_client: true, payload_source: aa.CLIENT_CHANGE_ARCHIVED_STATUS};
        this.handleUpdate(oc);
    }, changeThreadArchivedStatusFBID: function (lc, mc) {
        r.isThreadID(lc);
        za(this, lc, function (pc) {
            var qc = {ids: {}};
            qc.ids[pc] = mc;
            kc(this, '/ajax/mercury/change_archived_status.php', qc);
        }.bind(this));
        var nc = {action_type: p.CHANGE_ARCHIVED_STATUS, action_id: null, thread_id: lc, archived: mc}, oc = {actions: [nc], from_client: true, payload_source: aa.CLIENT_CHANGE_ARCHIVED_STATUS};
        this.handleUpdate(oc);
    }, changeThreadFolder: function (lc, mc) {
        if (s.MercuryFBIDGK) {
            this.changeThreadFolderFBID(lc, mc);
        } else this.changeThreadFolderThreadID(lc, mc);
    }, changeThreadFolderThreadID: function (lc, mc) {
        r.isThreadID(lc);
        ya(this, lc, function (pc) {
            var qc = {};
            qc[mc] = [pc];
            kc(this, '/ajax/mercury/move_thread.php', qc);
        }.bind(this));
        var nc = {action_type: p.CHANGE_FOLDER, action_id: null, thread_id: lc, new_folder: mc}, oc = {actions: [nc], from_client: true, payload_source: aa.CLIENT_CHANGE_FOLDER};
        this.handleUpdate(oc);
    }, changeThreadFolderFBID: function (lc, mc) {
        r.isThreadID(lc);
        za(this, lc, function (pc) {
            var qc = {};
            qc[mc] = [pc];
            kc(this, '/ajax/mercury/move_thread.php', qc);
        }.bind(this));
        var nc = {action_type: p.CHANGE_FOLDER, action_id: null, thread_id: lc, new_folder: mc}, oc = {actions: [nc], from_client: true, payload_source: aa.CLIENT_CHANGE_FOLDER};
        this.handleUpdate(oc);
    }, changeMutingOnThread: function (lc, mc) {
        if (s.MercuryFBIDGK) {
            this.changeMutingOnThreadFBID(lc, mc);
        } else this.changeMutingOnThreadThreadID(lc, mc);
    }, changeMutingOnThreadThreadID: function (lc, mc) {
        r.isThreadID(lc);
        ya(this, lc, function (nc) {
            kc(this, '/ajax/mercury/change_mute_thread.php', {thread_id: nc, mute_settings: mc, payload_source: sa});
        }.bind(this));
    }, changeMutingOnThreadFBID: function (lc, mc) {
        r.isThreadID(lc);
        za(this, lc, function (nc) {
            kc(this, '/ajax/mercury/change_mute_thread.php', {thread_fbid: nc, mute_settings: mc, payload_source: sa});
        }.bind(this));
    }, markThreadSpam: function (lc) {
        if (s.MercuryFBIDGK) {
            this.markThreadSpamFBID(lc);
        } else this.markThreadSpamThreadID(lc);
    }, markThreadSpamThreadID: function (lc) {
        r.isThreadID(lc);
        ya(this, lc, function (mc) {
            kc(this, '/ajax/mercury/mark_spam.php', {id: mc});
        }.bind(this));
    }, markThreadSpamFBID: function (lc) {
        r.isThreadID(lc);
        za(this, lc, function (mc) {
            kc(this, '/ajax/mercury/mark_spam.php', {id: mc});
        }.bind(this));
    }, markMessagesSpam: function (lc, mc) {
        ia.getServerIDs(mc || [], function (oc) {
            kc(this, '/ajax/mercury/mark_spam_messages.php', {message_ids: oc});
        }.bind(this));
        var nc = {action_type: p.DELETE_MESSAGES, action_id: null, thread_id: lc, message_ids: mc};
        this.handleUpdate({actions: [nc], from_client: true, payload_source: aa.CLIENT_DELETE_MESSAGES});
    }, unmarkThreadSpam: function (lc) {
        if (s.MercuryFBIDGK) {
            this.unmarkThreadSpamFBID(lc);
        } else this.unmarkThreadSpamThreadID(lc);
    }, unmarkThreadSpamThreadID: function (lc) {
        r.isThreadID(lc);
        ya(this, lc, function (mc) {
            kc(this, '/ajax/mercury/unmark_spam.php', {id: mc});
        }.bind(this));
    }, unmarkThreadSpamFBID: function (lc) {
        r.isThreadID(lc);
        za(this, lc, function (mc) {
            kc(this, '/ajax/mercury/unmark_spam.php', {id: mc});
        }.bind(this));
    }, deleteThread: function (lc) {
        if (s.MercuryFBIDGK) {
            this.deleteThreadFBID(lc);
        } else this.deleteThreadThreadID(lc);
    }, deleteThreadThreadID: function (lc) {
        r.isThreadID(lc);
        ya(this, lc, function (mc) {
            var nc = {ids: [mc]};
            kc(this, '/ajax/mercury/delete_thread.php', nc);
        }.bind(this));
    }, deleteThreadFBID: function (lc) {
        r.isThreadID(lc);
        za(this, lc, function (mc) {
            var nc = {ids: [mc]};
            kc(this, '/ajax/mercury/delete_thread.php', nc);
        }.bind(this));
    }, deleteMessages: function (lc, mc, nc) {
        ia.getServerIDs(mc || [], function (pc) {
            kc(this, '/ajax/mercury/delete_messages.php', {message_ids: pc});
        }.bind(this));
        var oc;
        if (nc) {
            oc = {action_type: p.DELETE_THREAD, action_id: null, thread_id: lc};
        } else oc = {action_type: p.DELETE_MESSAGES, action_id: null, thread_id: lc, message_ids: mc};
        this.handleUpdate({actions: [oc], from_client: true, payload_source: aa.CLIENT_DELETE_MESSAGES});
    }, clearChat: function (lc, mc, nc) {
        r.isThreadID(lc);
        kc(this, '/ajax/chat/settings.php', {clear_history_id: mc});
        var oc = [
            {action_type: p.CLEAR_CHAT, action_id: null, thread_id: lc, clear_time: nc}
        ];
        this.handleUpdate({actions: oc, from_client: true, payload_source: aa.CLIENT_CLEAR_CHAT});
    }, sendNewMessage: function (lc, mc) {
        if (s.MercuryFBIDGK) {
            this.sendNewMessageFBID(lc, mc);
        } else this.sendNewMessageThreadID(lc, mc);
    }, sendNewMessageThreadID: function (lc, mc) {
        mc = mc || sa;
        if (!lc.client_state || lc.client_state == z.SEND_TO_SERVER)ia.getServerIDs(lc.forward_message_ids || [], function (oc) {
            var pc = lc.thread_id, qc = w.tokenize(lc.thread_id), rc = qc.type, sc = oa({}, lc);
            sc.forward_message_ids = oc;
            if ((rc == 'root' && qc.value == sc.message_id) || (rc == 'user' && !ab(this, pc)) || (lc.thread_id == u.PENDING_THREAD_ID)) {
                sc.client_thread_id = sc.thread_id;
                sc.thread_id = null;
                this._sendNewMessageToServer(sc, mc);
            } else ya(this, sc.thread_id, function (tc) {
                sc.thread_id = tc;
                this._sendNewMessageToServer(sc);
            }.bind(this));
        }.bind(this));
        if (lc.thread_id != u.PENDING_THREAD_ID) {
            var nc = {actions: [oa({}, lc)], from_client: true, payload_source: aa.CLIENT_SEND_MESSAGE};
            this.handleUpdate(nc);
        }
    }, sendNewMessageFBID: function (lc, mc) {
        mc = mc || sa;
        if (!lc.client_state || lc.client_state == z.SEND_TO_SERVER)ia.getServerIDs(lc.forward_message_ids || [], function (oc) {
            var pc = lc.thread_id, qc = w.tokenize(lc.thread_id), rc = qc.type, sc = oa({}, lc);
            sc.forward_message_ids = oc;
            if ((rc == 'root' && qc.value == sc.message_id) || (rc == 'user') || (pc == u.PENDING_THREAD_ID)) {
                sc.client_thread_id = sc.thread_id;
                sc.thread_id = null;
                this._sendNewMessageToServer(sc, mc);
            } else za(this, sc.thread_id, function (tc) {
                qc = w.tokenize(sc.thread_id);
                if (qc.type == 'user') {
                    sc.other_user_fbid = qc.values;
                } else sc.thread_fbid = tc;
                sc.thread_id = null;
                this._sendNewMessageToServer(sc);
            }.bind(this));
        }.bind(this));
        if (lc.thread_id != u.PENDING_THREAD_ID) {
            var nc = {actions: [oa({}, lc)], from_client: true, payload_source: aa.CLIENT_SEND_MESSAGE};
            this.handleUpdate(nc);
        }
    }, _sendNewMessageToServer: function (lc, mc) {
        g.inform(k.ATTEMPT_RECONNECT);
        mc = mc || sa;
        this._sentMessagesTimestamp[lc.message_id] = Date.now();
        kc(this, '/ajax/mercury/send_messages.php', {message_batch: [lc], client: mc});
    }, requestMessageConfirmation: function (lc, mc) {
        if (s.MercuryFBIDGK) {
            this.requestMessageConfirmationFBID(lc, mc);
        } else this.requestMessageConfirmationThreadID(lc, mc);
    }, requestMessageConfirmationThreadID: function (lc, mc) {
        mc = mc || sa;
        var nc = {}, oc = {};
        for (var pc in lc) {
            var qc = ab(this, pc);
            if (qc) {
                nc[qc] = lc[pc];
            } else {
                var rc = lc[pc];
                for (var sc = 0; sc < rc.length; sc++)oc[rc[sc]] = pc;
            }
        }
        var tc = Object.keys(nc), uc = Object.keys(oc);
        if (tc.length || uc.length)kc(this, '/ajax/mercury/confirm_messages.php', {thread_message_map: nc, local_messages: oc, client: mc});
    }, requestMessageConfirmationFBID: function (lc, mc) {
        mc = mc || sa;
        var nc = {}, oc = {};
        for (var pc in lc) {
            var qc = bb(this, pc);
            if (qc) {
                nc[qc] = lc[pc];
            } else {
                var rc = lc[pc];
                for (var sc = 0; sc < rc.length; sc++)oc[rc[sc]] = pc;
            }
        }
        var tc = Object.keys(nc), uc = Object.keys(oc);
        if (tc.length || uc.length)kc(this, '/ajax/mercury/confirm_messages.php', {thread_message_map: nc, local_messages: oc, client: mc});
    }, handleMessageConfirmError: function (lc) {
        if (s.MercuryFBIDGK) {
            this.handleMessageConfirmErrorFBID(lc);
        } else this.handleMessageConfirmErrorThreadID(lc);
    }, handleMessageConfirmErrorThreadID: function (lc) {
        var mc = lc.getRequest().getData().thread_message_map, nc = lc.getRequest().getData().local_messages;
        if (!mc && !nc)return;
        var oc = [];
        for (var pc in mc) {
            var qc = mc[pc];
            qc.forEach(function (tc) {
                oc.push({action_type: p.SEND_MESSAGE, client_message_id: tc, message_id: tc, client_thread_id: null, thread_id: pc, status: o.UNABLE_TO_CONFIRM});
            });
        }
        for (var rc in nc) {
            var sc = nc[rc];
            oc.push({action_type: p.SEND_MESSAGE, client_message_id: rc, message_id: rc, client_thread_id: sc, thread_id: null, status: o.UNABLE_TO_CONFIRM});
        }
        if (oc.length)this.handleUpdate({actions: oc, payload_source: aa.CLIENT_HANDLE_ERROR});
    }, handleMessageConfirmErrorFBID: function (lc) {
        var mc = lc.getRequest().getData().thread_message_map, nc = lc.getRequest().getData().local_messages;
        if (!mc && !nc)return;
        var oc = [];
        for (var pc in mc) {
            var qc = mc[pc];
            qc.forEach(function (tc) {
                oc.push({action_type: p.SEND_MESSAGE, client_message_id: tc, message_id: tc, client_thread_id: null, thread_fbid: pc, status: o.UNABLE_TO_CONFIRM});
            });
        }
        for (var rc in nc) {
            var sc = nc[rc];
            oc.push({action_type: p.SEND_MESSAGE, client_message_id: rc, message_id: rc, client_thread_id: sc, thread_fbid: null, status: o.UNABLE_TO_CONFIRM});
        }
        if (oc.length)this.handleUpdate({actions: oc, payload_source: aa.CLIENT_HANDLE_ERROR});
    }, markSeen: function () {
        var lc = this._lastActionTimestamp;
        kc(this, '/ajax/mercury/mark_seen.php', {seen_timestamp: lc});
    }, handleRoger: function (lc) {
        var mc = lc.tid ? this._serverToClientIDs.getResource(lc.tid) : ('user:' + lc.reader);
        if (mc) {
            var nc = {};
            nc[mc] = {};
            nc[mc]['fbid:' + lc.reader] = lc.time;
            this.inform('update-roger', nc);
        }
    }, handleUpdateWaitForThread: function (lc, mc, nc) {
        if (s.MercuryFBIDGK) {
            this.handleUpdateWaitForThreadFBID(lc, mc, nc);
        } else this.handleUpdateWaitForThreadThreadID(lc, mc, nc);
    }, handleUpdateWaitForThreadThreadID: function (lc, mc, nc) {
        nc = nc || sa;
        var oc = this._serverToClientIDs.getResource(mc);
        if (oc) {
            this.handleUpdate(lc);
            return;
        }
        this._serverToClientIDs.executeOrEnqueue(mc, function () {
            this._pendingUpdates.push(lc);
        }.bind(this));
        if (!this._fetchingThreads[mc]) {
            this._fetchingThreads[mc] = true;
            kc(this, '/ajax/mercury/thread_info.php', {threads: {thread_ids: [mc]}, client: nc});
        }
    }, handleUpdateWaitForThreadFBID: function (lc, mc, nc) {
        nc = nc || sa;
        var oc = this._FBIDToClientIDs.getResource(mc);
        if (oc) {
            this.handleUpdate(lc);
            return;
        }
        this._FBIDToClientIDs.executeOrEnqueue(mc, function () {
            this._pendingUpdates.push(lc);
        }.bind(this));
        if (!this._fetchingThreads[mc]) {
            this._fetchingThreads[mc] = true;
            var pc = {threads: {thread_fbids: [mc]}, client: nc};
            if (this.isUser(mc))pc = {threads: {user_ids: [mc]}, client: nc};
            kc(this, '/ajax/mercury/thread_info.php', pc);
        }
    }, handleUpdate: function (lc) {
        var mc = [];
        if (lc && lc.threads)for (var nc = 0; nc < lc.threads.length; nc++) {
            if (!lc.threads[nc].snippet_attachments)continue;
            for (var oc = 0; oc < lc.threads[nc].snippet_attachments.length; oc++)if (lc.threads[nc].snippet_attachments[oc].share_xhp) {
                mc.push({i: nc, j: oc, xhp: lc.threads[nc].snippet_attachments[oc].share_xhp});
                lc.threads[nc].snippet_attachments[oc].share_xhp = "HTMLDivElement not shown: object contains circular " + "reference, which was breaking JSON.stringify. " + "Look at MercuryServerRequests.handleUpdate";
            }
        }
        var pc = {actions: [], threads: []};
        if (lc) {
            if (lc.actions)for (var qc = 0; qc < lc.actions.length; qc++) {
                var rc = oa({}, lc.actions[qc]);
                x.obfuscateAction(rc);
                pc.actions.push(rc);
            }
            if (lc.threads)for (qc = 0; qc < lc.threads.length; qc++) {
                var sc = oa({}, lc.threads[qc]);
                x.obfuscateThread(sc);
                pc.threads.push(sc);
            }
        }
        var tc = oa({}, lc, pc);
        ra.debug('update:' + lc.payload_source, {payload: tc, from_client: lc.from_client});
        for (var uc = 0; uc < mc.length; uc++)lc.threads[mc[uc].i].snippet_attachments[mc[uc].j].share_xhp = mc[uc].xhp;
        for (uc in lc) {
            na.getForFBID(this._fbid).synchronizeInforms(function () {
                if (!lc.from_client) {
                    if (s.MercuryFBIDGK) {
                        ob(this, lc);
                    } else nb(this, lc);
                    this.inform('payload-preprocessed', lc);
                }
                this.inform('update-thread-ids', this._newlyAddedClientIDs);
                this._newlyAddedClientIDs = {};
                this.inform('update-participants', lc);
                this.inform('update-threads', lc);
                this.inform('update-unread', lc);
                this.inform('update-threadlist', lc);
                this.inform('update-messages', lc);
                this.inform('update-unseen', lc);
                this.inform('update-typing-state', lc);
                this.inform('update-roger', lc.roger);
                this.inform('model-update-completed', null);
                pb(this);
            }.bind(this));
            break;
        }
    }, _handleSendMessageErrorCommon: function (lc, mc, nc, oc) {
        ra.debug('handle_send_message_error_common', {reliability_error_status: nc, request_error_status: mc});
        var pc = lc.getData(), qc = pc.message_batch, rc = qc.map(function (tc) {
            var uc = {action_type: p.SEND_MESSAGE, thread_id: tc.thread_id, client_message_id: tc.message_id, message_id: tc.message_id, client_thread_id: tc.client_thread_id, status: mc, error_data: oc};
            if (s.MercuryFBIDGK) {
                uc.thread_fbid = tc.thread_fbid;
            } else uc.thread_id = tc.thread_id;
            return uc;
        });
        if (s.MercuryFBIDGK) {
            rc.forEach(function (tc) {
                jb(this, tc, nc);
            }.bind(this));
        } else rc.forEach(function (tc) {
            ib(this, tc, nc);
        }.bind(this));
        var sc = {actions: rc, payload_source: aa.CLIENT_HANDLE_ERROR};
        this.handleUpdate(sc);
    }, handleSendMessageError: function (lc) {
        var mc = lc.getPayload(), nc = null, oc = null;
        if (mc && mc.error_payload) {
            nc = o.UNCONFIRMED;
            oc = 'send_error';
        } else {
            nc = o.ERROR;
            oc = 'request_error' + kb(lc);
        }
        var pc = lc.error;
        if (pc === 1404102)i.verboseErrorHandler(lc);
        var qc = /<.*>/.test(lc.getErrorDescription()) ? lc.getErrorSummary() : lc.getErrorDescription();
        this._handleSendMessageErrorCommon(lc.getRequest(), nc, oc, {type: t.SERVER, code: lc.getError(), description: qc, is_transient: lc.isTransient()});
    }, handleSendMessageTransportError: function (lc) {
        this._handleSendMessageErrorCommon(lc.getRequest(), o.ERROR, 'transport_error' + kb(lc), {type: t.TRANSPORT, code: lc.getError(), is_transient: true});
    }, handleSendMessageTimeout: function (lc) {
        if (da.shouldRetry(lc)) {
            var mc = lc.getData();
            for (var nc = 0; nc < mc.message_batch.length; nc++) {
                var oc = mc.message_batch[nc];
                this._sendNewMessageToServer(oa({}, oc), null);
            }
        } else this._handleSendMessageErrorCommon(lc, o.ERROR, 'transport_timeout', {type: t.TIMEOUT, is_transient: true});
    }, getLastActionTimestamp: function () {
        return this._lastActionTimestamp;
    }});
    oa(xb, fa);
    function yb(lc) {
        return {action_type: p.LOG_MESSAGE, thread_id: lc, message_id: lc, timestamp: Date.now(), timestamp_absolute: '', timestamp_relative: '', is_unread: false, source: ga.UNKNOWN, log_message_type: y.SERVER_ERROR, log_message_data: {}};
    }

    function zb(lc) {
        var mc = lc.getData(), nc = mc.request_user_id ? mc.request_user_id : l.getID();
        return xb.getForFBID(nc);
    }

    function ac(lc, mc) {
        zb(mc).handleUpdate(lc);
    }

    function bc(lc, mc) {
        var nc = lc.client || mc.client;
        return {client: nc, message_batch: lc.message_batch.concat(mc.message_batch)};
    }

    function cc(lc, mc) {
        var nc = {};
        oa(nc, lc.ids);
        oa(nc, mc.ids);
        var oc = lc.client || mc.client;
        return {ids: nc, client: oc};
    }

    function dc(lc, mc) {
        return mc;
    }

    function ec(lc) {
        var mc = zb(lc.getRequest());
        mc.handleThreadInfoError(lc);
    }

    function fc(lc) {
        var mc = zb(lc.getRequest());
        mc.handleSendMessageError(lc);
    }

    function gc(lc) {
        var mc = zb(lc.getRequest());
        mc.handleSendMessageTransportError(lc);
    }

    function hc(lc) {
        var mc = zb(lc);
        mc.handleSendMessageTimeout(lc);
    }

    function ic(lc) {
        var mc = zb(lc.getRequest());
        mc.handleMessageConfirmError(lc);
    }

    function jc(lc) {
        ma.registerEndpoints({'/ajax/mercury/thread_sync.php': {request_user_id: lc._fbid, mode: ma.IDEMPOTENT, handler: ac}, '/ajax/mercury/thread_info.php': {request_user_id: lc._fbid, mode: ma.BATCH_DEFERRED_MULTI, batch_function: qb, handler: ac, error_handler: ec}, '/ajax/mercury/mark_folder_as_read.php': {request_user_id: lc._fbid, mode: ma.IMMEDIATE, handler: ac}, '/ajax/mercury/change_read_status.php': {request_user_id: lc._fbid, mode: ma.BATCH_SUCCESSIVE, batch_function: cc, handler: ac}, '/ajax/mercury/send_messages.php': {request_user_id: lc._fbid, mode: ma.BATCH_SUCCESSIVE, batch_function: bc, batch_size_limit: ja.SEND_BATCH_LIMIT, handler: ac, error_handler: fc, transport_error_handler: gc, timeout: ea.sendMessageTimeout, timeout_handler: hc, connection_retries: ja.SEND_CONNECTION_RETRIES}, '/ajax/mercury/mark_seen.php': {request_user_id: lc._fbid, mode: ma.BATCH_SUCCESSIVE, batch_function: dc, handler: ac}, '/ajax/mercury/confirm_messages.php': {request_user_id: lc._fbid, mode: ma.IMMEDIATE, handler: ac, error_handler: ic}, '/ajax/mercury/threadlist_info.php': {request_user_id: lc._fbid, mode: ma.BATCH_SUCCESSIVE_UNIQUE, batch_function: sb, handler: ac}, '/ajax/mercury/mark_spam.php': {request_user_id: lc._fbid, mode: ma.IMMEDIATE, handler: ac}, '/ajax/mercury/mark_spam_messages.php': {request_user_id: lc._fbid, mode: ma.IMMEDIATE, handler: ac}, '/ajax/mercury/unmark_spam.php': {request_user_id: lc._fbid, mode: ma.IMMEDIATE, handler: ac}, '/ajax/mercury/unread_threads.php': {request_user_id: lc._fbid, mode: ma.BATCH_SUCCESSIVE_UNIQUE, batch_function: rb, handler: ac}, '/ajax/chat/settings.php': {request_user_id: lc._fbid, mode: ma.IMMEDIATE}, '/ajax/mercury/change_archived_status.php': {request_user_id: lc._fbid, mode: ma.BATCH_SUCCESSIVE, batch_function: ub, handler: ac}, '/ajax/mercury/delete_thread.php': {request_user_id: lc._fbid, mode: ma.BATCH_SUCCESSIVE, batch_function: wb, handler: ac}, '/ajax/mercury/delete_messages.php': {request_user_id: lc._fbid, mode: ma.IMMEDIATE, handler: ac}, '/ajax/mercury/move_thread.php': {request_user_id: lc._fbid, mode: ma.BATCH_SUCCESSIVE, batch_function: vb, handler: ac}, '/ajax/mercury/change_mute_thread.php': {request_user_id: lc._fbid, mode: ma.IMMEDIATE, handler: ac}});
    }

    function kc(lc, mc, nc, oc) {
        ma.trySend(mc, nc, oc, lc._fbid);
    }

    e.exports = xb;
}, null);
__d("MercuryParticipants", ["CurrentUser", "ImageSourceRequest", "ImageSourceType", "MercuryAssert", "MercuryCallbackRegistry", "MercuryIDs", "MercuryParticipantsConstants", "MercuryParticipantTypes", "PhotoResizeModeConst", "ShortProfiles", "copyProperties", "getObjectValues", "tx", "MercuryServerRequests"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t = b('MercuryServerRequests').get(), u = 'fbid:' + g.getID(), v = {}, w = {}, x = new k(), y = function (da) {
        da = ba(da);
        if (v[da.id]) {
            q(v[da.id], da);
        } else v[da.id] = q({}, da);
        if (da.vanity)w[da.vanity] = da.id;
    };

    function z(da) {
        j.isEmailParticipantID(da);
        var ea = l.tokenize(da), fa = ea.value;
        return {gender: m.UNKNOWN_GENDER, href: null, id: da, image_src: m.EMAIL_IMAGE, big_image_src: m.EMAIL_IMAGE, name: fa, short_name: fa, employee: false};
    }

    function aa(da, ea) {
        j.allParticipantIDs(da);
        var fa = x.add(ea), ga = {}, ha = {};
        da.forEach(function (ja) {
            if (v[ja]) {
                ga[ja] = q({}, v[ja]);
            } else {
                var ka = l.tokenize(ja);
                if (ka.type == 'fbid') {
                    var la = ka.value;
                    ha[ja] = la;
                } else if (ka.type == 'email')ga[ja] = z(ja);
            }
        });
        var ia = r(ha);
        if (ia.length) {
            p.getMulti(ia, function (ja) {
                for (var ka in ha) {
                    var la = ha[ka], ma = ja[la];
                    ga[ka] = {gender: ma.gender, href: ma.uri, id: ka, image_src: ma.thumbSrc, name: ma.name, short_name: ma.firstName, employee: ma.employee, type: ma.type, vanity: ma.vanity, is_friend: ma.is_friend, orion_eligible: ma.orionEligible, social_snippets: ma.social_snippets};
                    y(ga[ka]);
                }
                x.call(fa.id, ga);
            });
        } else x.call(fa.id, ga);
        return fa;
    }

    function ba(da) {
        var ea = da.type === n.USER || da.type === n.FRIEND;
        if (!ea)return da;
        if (!da.name && !da.href && !da.vanity) {
            var fa = "\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c Facebook";
            da.name = fa;
            da.short_name = fa;
        }
        return da;
    }

    var ca = {user: u, isAuthor: function (da) {
        return da === u;
    }, getIDFromVanityOrFBID: function (da) {
        if (!da)return;
        if (w[da])return w[da];
        if (da.match('^\\d+$'))return ca.getIDForUser(da);
    }, getNow: function (da) {
        return v[da];
    }, get: function (da, ea) {
        j.isParticipantID(da);
        return ca.getMulti([da], function (fa) {
            ea(fa[da]);
        });
    }, getMulti: function (da, ea, fa) {
        return aa(da, ea, false);
    }, getMap: function (da, ea) {
        var fa = [];
        for (var ga in da)if (Array.isArray(da[ga])) {
            fa = fa.concat(da[ga]);
        } else if (da[ga])fa.push(da[ga]);
        return this.getMulti(fa, function (ha) {
            var ia = {};
            for (var ja in da)if (Array.isArray(da[ja])) {
                ia[ja] = da[ja].map(function (ka) {
                    return ha[ka];
                });
            } else ia[ja] = ha[da[ja]];
            ea(ia);
        });
    }, getBigImageMulti: function (da, ea) {
        j.allParticipantIDs(da);
        var fa = m.BIG_IMAGE_SIZE;
        return ca.getMulti(da, function (ga) {
            var ha = {}, ia = 0, ja = function (na, oa) {
                ia++;
                ha[na] = oa;
                if (ia === da.length)ea(ha);
            }, ka = function (na, oa) {
                v[na].big_image_src = oa.uri;
                ja(na, oa.uri);
            };
            for (var la in ga) {
                var ma = ga[la];
                if (!ma.big_image_src) {
                    new h().setFBID(ca.getUserID(la)).setType(i.PROFILE_PICTURE).setDimensions(fa, fa).setResizeMode(o.COVER).setCallback(ka.bind(null, la)).send();
                } else ja(ma.id, ma.big_image_src);
            }
        });
    }, getOrderedBigImageMulti: function (da, ea) {
        return ca.getBigImageMulti(da, function (fa) {
            var ga = da.map(function (ha) {
                return fa[ha];
            });
            ea(ga);
        });
    }, getUserID: function (da) {
        return l.getUserIDFromParticipantID(da);
    }, getIDForUser: function (da) {
        return l.getParticipantIDFromUserID(da);
    }, addParticipants: function (da) {
        da.forEach(y);
    }};
    t.subscribe('update-participants', function (da, ea) {
        ca.addParticipants(ea.participants || []);
    });
    e.exports = ca;
}, null);
__d("MercuryFolders", ["MessagingTag", "arrayContains"], function (a, b, c, d, e, f, g, h) {
    var i = [g.INBOX, g.OTHER, g.ACTION_ARCHIVED, g.SPAM], j = {getSupportedFolders: function () {
        return i.concat();
    }, isSupportedFolder: function (k) {
        return h(i, k);
    }, getFromMeta: function (k) {
        var l = k.folder;
        if (k.is_archived)l = g.ACTION_ARCHIVED;
        return l;
    }};
    e.exports = j;
}, null);
__d("MercuryAttachment", ["MercuryAttachmentContentType", "MercuryAttachmentType", "startsWith"], function (a, b, c, d, e, f, g, h, i) {
    var j = {getAttachIconClass: function (k) {
        switch (k) {
            case g.PHOTO:
                return 'MercuryPhotoIcon';
            case g.VIDEO:
                return 'MercuryVideoIcon';
            case g.MUSIC:
                return 'MercuryMusicIcon';
            case g.VOICE:
                return 'MercuryVoiceIcon';
            case g.TEXT:
                return 'MercuryTextIcon';
            case g.MSWORD:
                return 'MercuryMSWordIcon';
            case g.MSXLS:
                return 'MercuryMSXLSIcon';
            case g.MSPPT:
                return 'MercuryMSPPTIcon';
            case g.ORION:
                return 'MercuryOrionIcon';
        }
        return 'MercuryDefaultIcon';
    }, getAttachIconClassByMime: function (k) {
        if (i(k, 'image')) {
            return 'MercuryPhotoIcon';
        } else if (i(k, 'video')) {
            return 'MercuryVideoIcon';
        } else if (i(k, 'audio')) {
            return 'MercuryMusicIcon';
        } else if (i(k, 'text/plain')) {
            return 'MercuryTextIcon';
        } else return 'MercuryDefaultIcon';
    }, getAttachTypeByMime: function (k) {
        if (i(k, 'image')) {
            return g.PHOTO;
        } else if (i(k, 'video')) {
            return g.VIDEO;
        } else if (i(k, 'audio')) {
            return g.MUSIC;
        } else if (i(k, 'text/plain')) {
            return g.TEXT;
        } else return g.UNKNOWN;
    }, convertRaw: function (k) {
        var l = [];
        for (var m = 0; m < k.length; m++) {
            var n = k[m];
            if (n.attach_type === h.PHOTO) {
                l.push(n);
            } else if (n.filename) {
                var o = j.getAttachTypeByMime(n.filetype), p = {};
                p.attach_type = h.FILE;
                p.name = n.filename;
                p.icon_type = o;
                p.url = '';
                l.push(p);
            }
        }
        return l;
    }, get: function (k) {
        var l = [];
        if (k.attachments) {
            l = k.attachments;
        } else if (k.raw_attachments)l = this.convertRaw(k.raw_attachments);
        if (!(k.attachments && k.attachments.length > 0) && k.preview_attachments && k.preview_attachments.length > 0)return l.concat(k.preview_attachments);
        return l;
    }};
    e.exports = j;
}, null);
__d("MercuryThreads", ["MercuryFolders", "KeyedCallbackManager", "MercuryActionTypeConstants", "MercuryAssert", "MercuryAttachment", "MercuryConfig", "MercuryGlobalActionType", "MercuryIDs", "MercuryLogMessageType", "MercuryPayloadSource", "MercurySingletonMixin", "MercuryThreadMode", "MessagingTag", "MercuryParticipants", "ReportState", "MercuryServerRequests", "MercuryThreadInformer", "copyProperties", "createObjectFrom", "removeFromArray"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
    function aa(na, oa, pa) {
        var qa = y(oa.participants, true), ra = t.getIDForUser(na._fbid);
        pa.forEach(function (sa) {
            if (qa[sa] !== true) {
                oa.participants.push(sa);
                if (sa === ra)oa.is_subscribed = true;
            }
        });
    }

    function ba(na, oa, pa) {
        pa.forEach(function (qa) {
            z(oa.participants, qa);
            if (qa === t.getIDForUser(na._fbid))oa.is_subscribed = false;
        });
    }

    function ca(na, oa) {
        if (na.participants[0] != oa) {
            z(na.participants, oa);
            na.participants.unshift(oa);
        }
    }

    function da(na, oa) {
        var pa = oa.body, qa = oa.subject, ra = '';
        if (qa) {
            qa = qa.toLowerCase();
            if (pa.slice(0, qa.length).toLowerCase() == qa) {
                ra = pa;
            } else if (pa) {
                ra = qa + ' \u00B7 ' + pa;
            } else ra = qa;
        } else ra = pa;
        na.snippet = ra;
        na.snippet_has_attachment = oa.has_attachment;
        if (oa.raw_attachments && oa.raw_attachments.length > 0) {
            var sa = k.convertRaw(oa.raw_attachments);
            na.snippet_attachments = sa;
        } else na.snippet_attachments = oa.attachments;
        na.is_forwarded_snippet = !!oa.forward_count;
        na.snippet_sender = oa.author;
    }

    function ea(na, oa, pa) {
        if (!oa)return false;
        if (!oa.timestamp)if (l.ReadStatusGK) {
            na._pendingReadStatusThreads[oa.thread_id] = true;
            return false;
        } else return true;
        var qa = !oa.unread_count;
        if (pa == qa)return false;
        oa.unread_count = pa ? 0 : 1;
        na._threadInformer.updatedThread(oa.thread_id);
        return true;
    }

    function fa(na, oa) {
        var pa = na._threads.getAllResources();
        for (var qa in pa) {
            var ra = pa[qa];
            if (ra.folder == oa) {
                ra.unread_count = 0;
                na._threads.setResource(qa, ra);
                na._threadInformer.updatedThread(qa);
            }
        }
    }

    function ga(na, oa, pa) {
        if (!oa || oa.chat_clear_time === pa)return false;
        oa.chat_clear_time = pa;
        na._threadInformer.reorderedMessages(oa.thread_id);
        return true;
    }

    function ha(na, oa, pa, qa) {
        if (pa.timestamp)na._threadInformer.changedThreadReadState(oa.thread_id, qa, pa.timestamp);
        ea(na, oa, qa);
    }

    function ia(na, oa, pa, qa) {
        var ra = pa.action_type;
        if (ra == i.USER_GENERATED_MESSAGE || ra == i.LOG_MESSAGE) {
            pa.is_unread && oa.unread_count++;
            oa.message_count++;
            oa.is_archived = false;
        }
        switch (ra) {
            case i.USER_GENERATED_MESSAGE:
                if (oa.last_read_timestamp >= pa.timestamp)ha(na, oa, pa, true);
                ca(oa, pa.author);
                break;
            case i.SEND_MESSAGE:
                var sa = pa.log_message_type;
                if (sa == o.THREAD_IMAGE)oa.image_src = pa.log_message_data.image ? pa.log_message_data.image.preview_url : null;
                oa.snippet_attachments = pa.attachments;
                break;
            case i.LOG_MESSAGE:
                var sa = pa.log_message_type;
                if (sa == o.SUBSCRIBE) {
                    aa(na, oa, pa.log_message_data.added_participants);
                } else if (sa == o.UNSUBSCRIBE) {
                    ba(na, oa, pa.log_message_data.removed_participants);
                } else if (sa == o.THREAD_IMAGE) {
                    if (!qa)oa.image_src = pa.log_message_data.image ? pa.log_message_data.image.preview_url : null;
                } else if (sa == o.THREAD_NAME)oa.name = pa.log_message_data.name;
                break;
            case i.CHANGE_READ_STATUS:
                if (pa.timestamp)oa.last_read_timestamp = pa.timestamp;
                ha(na, oa, pa, pa.mark_as_read);
                break;
            case i.CLEAR_CHAT:
                ga(na, oa, pa.clear_time);
                break;
            case i.CHANGE_ARCHIVED_STATUS:
                oa.is_archived = pa.archived;
                break;
            case i.CHANGE_FOLDER:
                oa.folder = pa.new_folder;
                break;
            case i.DELETE_MESSAGES:
                if (qa) {
                    oa.snippet = '...';
                    oa.snippet_has_attachment = false;
                    oa.snippet_attachments = null;
                    oa.snippet_sender = null;
                    oa.is_forwarded_snippet = false;
                    na._threadInformer.updatedThread(pa.thread_id);
                } else if (pa.message_ids)oa.message_count = oa.message_count - pa.message_ids.length;
                break;
            case i.CHANGE_MUTE_SETTINGS:
                if (pa.mute_settings !== undefined) {
                    var ta = na._fbid + '@facebook.com';
                    if (oa.mute_settings) {
                        if (pa.mute_settings) {
                            oa.mute_settings[ta] = pa.mute_settings;
                        } else delete oa.mute_settings[ta];
                        na._threadInformer.updatedThread(oa.thread_id);
                    }
                }
                break;
        }
    }

    function ja(na, oa) {
        var pa = n.tokenize(oa.thread_id), qa = la(na, oa.specific_to_list), ra = {thread_id: oa.thread_id, last_action_id: null, participants: oa.specific_to_list, name: null, snippet: oa.body, snippet_has_attachment: false, snippet_attachments: [], snippet_sender: oa.author, unread_count: 0, message_count: 0, image_src: null, timestamp_absolute: oa.timestamp_absolute, timestamp_relative: oa.timestamp_relative, timestamp: oa.timestamp, canonical_fbid: pa.type === 'user' ? pa.value : null, is_canonical_user: pa.type === 'user', is_canonical: qa, is_subscribed: true, root_message_threading_id: oa.message_id, folder: s.INBOX, is_archived: false, mode: r.TITAN_ORIGINATED};
        return ra;
    }

    function ka(na) {
        this._fbid = na;
        this._serverRequests = v.getForFBID(this._fbid);
        this._threadInformer = w.getForFBID(this._fbid);
        this._threads = new h();
        this._pendingReadStatusThreads = {};
        ma(this);
    }

    x(ka.prototype, {getThreadMetaNow: function (na) {
        j.isThreadID(na);
        return this._threads.getResource(na);
    }, getThreadMeta: function (na, oa, pa) {
        var qa = function (ra) {
            oa(ra[na]);
        };
        return this.getMultiThreadMeta([na], qa, pa);
    }, getMultiThreadMeta: function (na, oa, pa) {
        j.allThreadID(na);
        var qa = this._threads.executeOrEnqueue(na, oa), ra = this._threads.getUnavailableResources(qa);
        if (ra.length) {
            var sa = [];
            for (var ta = 0; ta < ra.length; ta++) {
                var ua = ra[ta], va = n.tokenize(ua);
                if (va.type == 'user') {
                    var wa = this.getCanonicalThreadToUser(va.value, null, pa, true);
                    if (this.isEmptyLocalThread(wa.thread_id))sa.push(wa.thread_id);
                } else sa.push(ua);
            }
            if (sa.length)this._serverRequests.fetchThreadData(sa, pa);
        }
        return qa;
    }, unsubscribe: function (na) {
        this._threads.unsubscribe(na);
    }, changeThreadReadStatus: function (na, oa) {
        j.isThreadID(na);
        var pa = this._threads.getResource(na);
        if (ea(this, pa, oa))this._serverRequests.changeThreadReadStatus(na, oa, g.getFromMeta(pa));
    }, changeThreadArchivedStatus: function (na, oa) {
        j.isThreadID(na);
        var pa = this._threads.getResource(na);
        if (pa.is_archived != oa) {
            pa.is_archived = oa;
            this._threadInformer.updatedThread(pa.thread_id);
            this._serverRequests.changeThreadArchivedStatus(na, oa);
        }
    }, changeFolder: function (na, oa) {
        j.isThreadID(na);
        var pa = this._threads.getResource(na);
        if (pa && pa.folder != oa) {
            pa.folder = oa;
            this._threadInformer.updatedThread(pa.thread_id);
            this._serverRequests.changeThreadFolder(na, oa);
        }
    }, updateThreads: function (na) {
        if (!na || !na.length)return;
        var oa = {};
        na.forEach(function (pa) {
            oa[pa.thread_id] = pa;
        });
        this._threads.addResourcesAndExecute(oa);
    }, updateMetadataByActions: function (na, oa) {
        if (!na || !na.length)return;
        var pa = {}, qa = {}, ra = {};
        for (var sa = 0; sa < na.length; sa++) {
            var ta = na[sa];
            if (ta.is_forward)continue;
            var ua = ta.action_type, va = ta.thread_id;
            j.isThreadID(va);
            var wa = this.getThreadMetaNow(va);
            if (ua == i.LOG_MESSAGE && ta.log_message_type == o.SERVER_ERROR)continue;
            var xa = !!(ta.sync_id || ta.action_id);
            if (!wa && !xa && ua == i.USER_GENERATED_MESSAGE) {
                wa = ja(this, ta);
                this._threads.setResource(va, wa);
            }
            if (wa) {
                if (ua == i.DELETE_THREAD) {
                    wa.message_count = 0;
                    this._threadInformer.deletedThread(va);
                    continue;
                }
                if (ua == i.LOG_MESSAGE || ua == i.USER_GENERATED_MESSAGE)xa = !oa;
                if (wa.server_timestamp && ta.timestamp <= wa.server_timestamp && xa)continue;
                if (!ra[va])ra[va] = x({}, wa);
                ia(this, ra[va], ta, oa);
                if (ua == i.USER_GENERATED_MESSAGE)pa[va] = ta;
                if (ua == i.USER_GENERATED_MESSAGE || ua == i.LOG_MESSAGE || ua == i.SEND_MESSAGE)if (ta && ta.timestamp && (!qa[va] || ta.timestamp > qa[va].timestamp))qa[va] = ta;
            }
        }
        for (var ya in ra) {
            var za = ra[ya], ab = pa[ya];
            if (ab)da(za, ab);
            var bb = qa[ya], cb = za.timestamp;
            if (bb) {
                if (bb.timestamp > cb)za = x(za, {timestamp_absolute: bb.timestamp_absolute, timestamp_relative: bb.timestamp_relative, timestamp: bb.timestamp});
                var db = za.server_timestamp;
                if (!oa && bb.timestamp > db)za.server_timestamp = bb.timestamp;
            }
            this._threads.setResource(ya, za);
        }
    }, getCanonicalThreadToUser: function (na, oa, pa, qa) {
        return this.getCanonicalThreadToParticipant('fbid:' + na, oa, pa, qa);
    }, getCanonicalThreadToParticipant: function (na, oa, pa, qa) {
        var ra = this.getThreadIDForParticipant(na), sa = this._threads.getResource(ra);
        if (typeof sa == 'undefined') {
            sa = this.createNewLocalThread(ra, [t.getIDForUser(this._fbid), na], oa);
            !qa && this._serverRequests.fetchThreadData([ra], pa);
        }
        return sa;
    }, getThreadIDForUser: function (na) {
        return 'user:' + na;
    }, getThreadIDForParticipant: function (na) {
        var oa = n.tokenize(na);
        return this.getThreadIDForUser(oa.value);
    }, createNewLocalThread: function (na, oa, pa) {
        var qa = this._threads.getResource(na);
        if (!qa) {
            var ra = n.tokenize(na);
            qa = {thread_id: na, last_action_id: null, participants: oa, name: null, snippet: '', snippet_has_attachment: false, snippet_sender: null, unread_count: pa ? pa : 0, message_count: 0, image_src: null, timestamp_absolute: null, timestamp_relative: null, timestamp: null, canonical_fbid: ra.type === 'user' ? ra.value : null, is_canonical_user: ra.type == 'user', is_canonical: la(this, oa), is_subscribed: true, root_message_threading_id: null, folder: s.INBOX, is_archived: false, mode: r.TITAN_ORIGINATED};
            this._threads.setResource(na, qa);
        }
        return qa;
    }, addParticipantsToThreadLocally: function (na, oa) {
        var pa = this._threads.getResource(na);
        if (pa) {
            aa(this, pa, oa);
            this._threadInformer.updatedThread(pa.thread_id);
        }
    }, getCanonicalUserInThread: function (na) {
        var oa = n.tokenize(na);
        return oa.type == 'user' ? oa.value : null;
    }, getCanonicalGroupInThread: function (na) {
        var oa = n.tokenize(na);
        return oa.type == 'group' ? oa.value : null;
    }, isEmptyLocalThread: function (na) {
        var oa = this._threads.getResource(na);
        if (!oa)return false;
        var pa = n.tokenize(na);
        return pa.type == 'root' && !oa.timestamp;
    }, isNewEmptyLocalThread: function (na) {
        if (!this.isEmptyLocalThread(na))return false;
        var oa = this._threads.getResource(na);
        return oa.participants && oa.participants.length === 0;
    }, canReply: function (na) {
        var oa = this._threads.getResource(na);
        return oa && oa.is_subscribed && oa.mode != r.OBJECT_ORIGINATED && !oa.has_email_participant && !oa.read_only && (oa.recipients_loadable || oa.recipients_loadable === undefined);
    }});
    x(ka, q);
    function la(na, oa) {
        var pa = oa.filter(function (qa) {
            return qa != t.getIDForUser(na._fbid);
        });
        return pa.length <= 1;
    }

    function ma(na) {
        na._serverRequests.subscribe('update-threads', function (oa, pa) {
            var qa = (pa.actions || []).filter(function (ua) {
                return ua.thread_id;
            });
            if (l.ReadStatusGK)if (pa.payload_source == p.SERVER_FETCH_THREAD_INFO)(pa.threads || []).forEach(function (ua) {
                var va = ua.thread_id, wa = na._threads.getResource(va);
                if (na._pendingReadStatusThreads[va]) {
                    delete na._pendingReadStatusThreads[va];
                    if (ua.unread_count)na._serverRequests.changeThreadReadStatus(ua.thread_id, true, wa.folder);
                }
            });
            na.updateThreads(pa.threads);
            na.updateMetadataByActions(qa, pa.from_client);
            (pa.threads || []).forEach(function (ua) {
                na._threadInformer.updatedThread(ua.thread_id);
            });
            var ra = pa.global_actions || [];
            for (var sa = 0; sa < ra.length; sa++) {
                var ta = ra[sa];
                if (ta.action_type == m.MARK_ALL_READ)fa(na, ta.folder);
            }
        });
    }

    u.registerCallback('mercury-threads', function () {
        var na = {};
        na.threads = {};
        var oa = ka._getInstances();
        for (var pa in oa)na.threads[pa] = oa[pa]._threads.dumpResources();
        return na;
    });
    e.exports = ka;
}, null);
__d("MercuryUnreadState", ["MercuryFolders", "LogHistory", "KeyedCallbackManager", "MercuryActionTypeConstants", "MercuryConfig", "MercuryGlobalActionType", "MercurySingletonMixin", "MercuryThreadlistConstants", "MessagingTag", "ReportState", "MercuryServerRequests", "MercuryThreadInformer", "MercuryThreads", "arrayContains", "copyProperties", "createObjectFrom"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    var w = (g.getSupportedFolders() || []).filter(function (pa) {
        return pa != o.ACTION_ARCHIVED;
    }), x = 'unread_thread_hash', y = 'unseen_thread_list', z = n.MAX_UNREAD_COUNT, aa = h.getInstance('mercury_unread_state');

    function ba(pa) {
        this._fbid = pa;
        this._serverRequests = q.getForFBID(this._fbid);
        this._threadInformer = r.getForFBID(this._fbid);
        this._threads = s.getForFBID(this._fbid);
        this._allReadTimestamp = {};
        this._threadReadTimestamp = {};
        this._initialUnreadCount = {};
        this._maxCount = {};
        this._unreadResources = {};
        w.forEach(function (qa) {
            this._initialUnreadCount[qa] = 0;
            this._maxCount[qa] = false;
            this._unreadResources[qa] = new i();
        }.bind(this));
        this._serverRequests.subscribe('update-unread', function (qa, ra) {
            ga(this, ra);
            var sa = ra.global_actions || [];
            for (var ta = 0; ta < sa.length; ta++) {
                var ua = sa[ta];
                if (ua.action_type == l.MARK_ALL_READ)la(this, ua.folder, ua.timestamp);
            }
        }.bind(this));
        this._serverRequests.subscribe('update-thread-ids', function (qa, ra) {
            na(this, ra);
        }.bind(this));
    }

    u(ba.prototype, {getUnreadCount: function (pa) {
        if (this.exceedsMaxCount(pa)) {
            aa.error('unguarded_unread_count_fetch', {});
            return 0;
        }
        return fa(this, pa);
    }, exceedsMaxCount: function (pa) {
        return this._maxCount[pa] || (fa(this, pa) > z);
    }, markFolderAsRead: function (pa) {
        if (this._maxCount[pa] || fa(this, pa) > 0)this._serverRequests.markFolderAsRead(pa);
    }});
    u(ba, m);
    function ca(pa, qa, ra) {
        pa._unreadResources[qa].setResource(x, ra);
        pa._unreadResources[qa].setResource(y, Object.keys(ra));
    }

    function da(pa, qa, ra) {
        var sa = pa._unreadResources[qa].executeOrEnqueue(x, ra), ta = pa._unreadResources[qa].getUnavailableResources(sa);
        if (ta.length)pa._serverRequests.fetchUnreadThreadIDs(qa);
    }

    function ea(pa, qa) {
        return pa._unreadResources[qa].getResource(x);
    }

    function fa(pa, qa) {
        var ra = pa._unreadResources[qa].getResource(y);
        if (ra) {
            return ra.length;
        } else return pa._initialUnreadCount[qa];
    }

    function ga(pa, qa) {
        if (k.MercuryFBIDGK) {
            ia(pa, qa);
        } else ha(pa, qa);
    }

    function ha(pa, qa) {
        var ra;
        (qa.unread_thread_ids || []).forEach(function (sa) {
            ra = sa.folder;
            if (!oa(ra))return;
            var ta = ma(pa, sa.thread_ids);
            ca(pa, ra, v(ta, true));
            if (ta.length > z)pa._maxCount[ra] = true;
            pa._threadInformer.updatedUnreadState();
        });
        (qa.message_counts || []).forEach(function (sa) {
            if (sa.unread_count === undefined)return;
            ra = sa.folder;
            if (sa.unread_count > z) {
                pa._maxCount[ra] = true;
                ca(pa, ra, {});
                pa._threadInformer.updatedUnreadState();
            } else {
                pa._initialUnreadCount[ra] = sa.unread_count;
                if (pa._initialUnreadCount[ra] === 0)ca(pa, ra, {});
                pa._threadInformer.updatedUnreadState();
            }
        });
        (qa.actions || []).forEach(function (sa) {
            if (sa.is_forward)return;
            var ta = j, ua = sa.thread_id ? sa.thread_id : sa.server_thread_id;
            if (sa.action_type == ta.DELETE_THREAD) {
                w.forEach(function (wa) {
                    ka(pa, wa, ua);
                });
            } else if (sa.action_type == ta.CHANGE_ARCHIVED_STATUS || sa.action_type == ta.CHANGE_FOLDER) {
                var va = pa._threads.getThreadMetaNow(sa.thread_id);
                ra = g.getFromMeta(va);
                if (oa(ra) && va.unread_count > 0)ja(pa, ra, ua);
                w.forEach(function (wa) {
                    if (wa != ra)ka(pa, wa, ua);
                });
            } else {
                ra = sa.folder;
                if (!oa(ra))return;
                if (sa.action_type == ta.CHANGE_READ_STATUS) {
                    if (sa.mark_as_read) {
                        ka(pa, ra, ua, sa.timestamp);
                    } else ja(pa, ra, ua, sa.timestamp);
                } else if (sa.action_type == ta.USER_GENERATED_MESSAGE || sa.action_type == ta.LOG_MESSAGE)if (sa.is_unread)ja(pa, ra, ua, sa.timestamp);
            }
        });
    }

    function ia(pa, qa) {
        var ra;
        (qa.unread_thread_fbids || []).forEach(function (sa) {
            ra = sa.folder;
            if (!oa(ra))return;
            var ta = sa.thread_fbids || [];
            ta = ta.concat(sa.other_user_fbids || []);
            var ua = ma(pa, ta);
            ca(pa, ra, v(ua, true));
            if (ua.length > z)pa._maxCount[ra] = true;
            pa._threadInformer.updatedUnreadState();
        });
        (qa.message_counts || []).forEach(function (sa) {
            if (sa.unread_count === undefined)return;
            ra = sa.folder;
            if (sa.unread_count > z) {
                pa._maxCount[ra] = true;
                ca(pa, ra, {});
                pa._threadInformer.updatedUnreadState();
            } else {
                pa._initialUnreadCount[ra] = sa.unread_count;
                if (pa._initialUnreadCount[ra] === 0)ca(pa, ra, {});
                pa._threadInformer.updatedUnreadState();
            }
        });
        (qa.actions || []).forEach(function (sa) {
            if (sa.is_forward)return;
            var ta = j, ua = sa.other_user_fbid ? sa.other_user_fbid : sa.thread_fbid, va = sa.thread_id ? sa.thread_id : ua;
            if (sa.action_type == ta.DELETE_THREAD) {
                w.forEach(function (xa) {
                    ka(pa, xa, va);
                });
            } else if (sa.action_type == ta.CHANGE_ARCHIVED_STATUS || sa.action_type == ta.CHANGE_FOLDER) {
                var wa = pa._threads.getThreadMetaNow(sa.thread_id);
                ra = g.getFromMeta(wa);
                if (oa(ra) && wa.unread_count > 0)ja(pa, ra, va);
                w.forEach(function (xa) {
                    if (xa != ra)ka(pa, xa, va);
                });
            } else {
                ra = sa.folder;
                if (!oa(ra))return;
                if (sa.action_type == ta.CHANGE_READ_STATUS) {
                    if (sa.mark_as_read) {
                        ka(pa, ra, va, sa.timestamp);
                    } else ja(pa, ra, va, sa.timestamp);
                } else if (sa.action_type == ta.USER_GENERATED_MESSAGE || sa.action_type == ta.LOG_MESSAGE)if (sa.is_unread)ja(pa, ra, va, sa.timestamp);
            }
        });
    }

    function ja(pa, qa, ra, sa) {
        if (pa._maxCount[qa])return;
        da(pa, qa, function (ta) {
            var ua = pa._allReadTimestamp[qa] || 0, va = pa._threadReadTimestamp[ra] || 0, wa = sa || Number.POSITIVE_INFINITY;
            if (wa >= ua && wa >= va && !ta[ra]) {
                ta[ra] = sa || 0;
                ca(pa, qa, ta);
                pa._threadInformer.updatedUnreadState();
            }
        });
    }

    function ka(pa, qa, ra, sa) {
        if (pa._maxCount[qa])return;
        da(pa, qa, function (ta) {
            if (sa) {
                var ua = pa._threadReadTimestamp[ra];
                if (!ua || ua < sa)pa._threadReadTimestamp[ra] = sa;
            }
            var va = ta[ra];
            if (sa && typeof va == 'number' && sa < va)return;
            if (ra in ta) {
                delete ta[ra];
                ca(pa, qa, ta);
                pa._threadInformer.updatedUnreadState();
            }
        });
    }

    function la(pa, qa, ra) {
        pa._maxCount[qa] = false;
        ca(pa, qa, {});
        pa._allReadTimestamp[qa] = Math.max(pa._allReadTimestamp[qa] || 0, ra || 0);
        pa._threadInformer.updatedUnreadState();
    }

    function ma(pa, qa) {
        return qa.map(pa._serverRequests.convertThreadIDIfAvailable, pa._serverRequests);
    }

    function na(pa, qa) {
        w.forEach(function (ra) {
            var sa = ea(pa, ra);
            if (!sa)return;
            for (var ta in qa) {
                var ua = qa[ta];
                if (sa[ta]) {
                    sa[ua] = sa[ta];
                    delete sa[ta];
                }
            }
            ca(pa, ra, sa);
        });
    }

    function oa(pa) {
        return t(w, pa);
    }

    p.registerCallback('mercury-unread-state', function () {
        var pa = {};
        pa.unread = {};
        pa.unread_max_count = {};
        var qa = ba._getInstances();
        for (var ra in qa) {
            pa.unread[ra] = {};
            pa.unread_max_count[ra] = {};
            w.forEach(function (sa) {
                pa.unread[ra][sa] = u({}, ea(qa[ra], sa));
                pa.unread_max_count[ra][sa] = qa[ra]._maxCount[sa];
            });
        }
        return pa;
    });
    e.exports = ba;
}, null);
__d("MercuryFilters", ["MessagingTag", "arrayContains"], function (a, b, c, d, e, f, g, h) {
    var i = [g.UNREAD], j = {ALL: 'all', getSupportedFilters: function () {
        return i.concat();
    }, isSupportedFilter: function (k) {
        return h(i, k);
    }};
    e.exports = j;
}, null);