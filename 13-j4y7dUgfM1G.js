/*!CK:4041571306!*//*1407738597,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["1XxM1"]);
}

__d("UnityObject", [], function (a, b, c, d, e, f) {
    var g = function () {
        var h = "Unity Player", i = "application/vnd.unity", j = document, k = navigator, l = "https://ssl-webplayer.unity3d.com/download_webplayer-3.x/", m = "_unity_triedjava", n = "_unity_triedclickonce", o = "undefined", p = "installed", q = "missing", r = "broken", s = "unsupported", t = "standard", u = "java", v = "clickonce", w = function () {
            var ia = k.userAgent, ja = k.platform, ka = /chrome/i.test(ia), la = false;
            if (/msie/i.test(ia)) {
                la = parseFloat(ia.replace(/^.*msie ([0-9]+(\.[0-9]+)?).*$/i, "$1"));
            } else if (/Trident/i.test(ia))la = parseFloat(ia.replace(/^.*rv:([0-9]+(\.[0-9]+)?).*$/i, "$1"));
            var ma = {w3: typeof j.getElementById != o && typeof j.getElementsByTagName != o && typeof j.createElement != o, win: ja ? /win/i.test(ja) : /win/i.test(ia), mac: ja ? /mac/i.test(ja) : /mac/i.test(ia), ie: la, ff: /firefox/i.test(ia), op: /opera/i.test(ia), ch: ka, sf: /safari/i.test(ia) && !ka, wk: /webkit/i.test(ia) ? parseFloat(ia.replace(/^.*webkit\/(\d+(\.\d+)?).*$/i, "$1")) : false, x64: /win64/i.test(ia) && /x64/i.test(ia), moz: /mozilla/i.test(ia) ? parseFloat(ia.replace(/^.*mozilla\/([0-9]+(\.[0-9]+)?).*$/i, "$1")) : 0, mobile: /ipad/i.test(ja) || /iphone/i.test(ja) || /ipod/i.test(ja) || /android/i.test(ia) || /windows phone/i.test(ia)};
            ma.clientBrand = ma.ch ? 'ch' : ma.ff ? 'ff' : ma.sf ? 'sf' : ma.ie ? 'ie' : ma.op ? 'op' : '??';
            ma.clientPlatform = ma.win ? 'win' : ma.mac ? 'mac' : '???';
            var na = j.getElementsByTagName("script");
            for (var oa = 0; oa < na.length; ++oa) {
                var pa = na[oa].src.match(/^(.*)3\.0\/uo\/UnityObject\.js$/i);
                if (pa) {
                    l = pa[1];
                    break;
                }
            }
            function qa(ta, ua) {
                for (var va = 0; va < Math.max(ta.length, ua.length); ++va) {
                    var wa = (va < ta.length) && ta[va] ? Number(ta[va]) : 0, xa = (va < ua.length) && ua[va] ? Number(ua[va]) : 0;
                    if (wa < xa)return -1;
                    if (wa > xa)return 1;
                }
                return 0;
            }

            function ra(ta) {
                try {
                    return new ActiveXObject("JavaWebStart.isInstalled." + ta + ".0") != null;
                } catch (ua) {
                    return false;
                }
            }

            function sa(ta) {
                try {
                    return new ActiveXObject("JavaPlugin.160_" + ta) != null;
                } catch (ua) {
                    return false;
                }
            }

            ma.java = function () {
                if (k.javaEnabled()) {
                    var ta = (ma.win && ma.ff), va = false;
                    if (ta || va) {
                        if (typeof k.mimeTypes != o) {
                            var wa = ta ? [1, 6, 0, 12] : [1, 4, 2, 0];
                            for (var xa = 0; xa < k.mimeTypes.length; ++xa)if (k.mimeTypes[xa].enabledPlugin) {
                                var ya = k.mimeTypes[xa].type.match(/^application\/x-java-applet;(?:jpi-)?version=(\d+)(?:\.(\d+)(?:\.(\d+)(?:_(\d+))?)?)?$/);
                                if (ya != null)if (qa(wa, ya.slice(1)) <= 0)return true;
                            }
                        }
                    } else if (ma.win && ma.ie)if (typeof ActiveXObject != o) {
                        if (ra("1.7.0"))return true;
                        if (ma.ie >= 8) {
                            if (ra("1.6.0")) {
                                for (xa = 12; xa <= 50; ++xa)if (sa(xa))if (ma.ie == 9 && ma.moz == 5 && xa < 24) {
                                    continue;
                                } else return true;
                                return false;
                            }
                        } else return ra("1.6.0") || ra("1.5.0") || ra("1.4.2");
                    }
                }
                return false;
            }();
            ma.co = function () {
                if (ma.win && ma.ie) {
                    var ta = ia.match(/(\.NET CLR [0-9.]+)|(\.NET[0-9.]+)/g);
                    if (ta != null) {
                        var va = [3, 5, 0];
                        for (var wa = 0; wa < ta.length; ++wa) {
                            var xa = ta[wa].match(/[0-9.]{2,}/g)[0].split(".");
                            if (qa(va, xa) <= 0)return true;
                        }
                    }
                }
                return false;
            }();
            return ma;
        }();

        function x(ia) {
            var ja = new RegExp(escape(ia) + "=([^;]+)");
            if (ja.test(j.cookie + ";")) {
                ja.exec(j.cookie + ";");
                return RegExp.$1;
            }
            return false;
        }

        function y(ia, ja) {
            document.cookie = escape(ia) + "=" + escape(ja) + "; path=/";
        }

        function z(ia) {
            var ja = 0;
            if (ia) {
                var ka = ia.toLowerCase().match(/^(\d+)(?:\.(\d+)(?:\.(\d+)([dabfr])?(\d+)?)?)?$/);
                if (ka && ka[1]) {
                    var la = ka[1], ma = ka[2] ? ka[2] : 0, na = ka[3] ? ka[3] : 0, oa = ka[4] ? ka[4] : 'r', pa = ka[5] ? ka[5] : 0;
                    ja |= ((la / 10) % 10) << 28;
                    ja |= (la % 10) << 24;
                    ja |= (ma % 10) << 20;
                    ja |= (na % 10) << 16;
                    ja |= {d: 2 << 12, a: 4 << 12, b: 6 << 12, f: 8 << 12, r: 8 << 12}[oa];
                    ja |= ((pa / 100) % 10) << 8;
                    ja |= ((pa / 10) % 10) << 4;
                    ja |= (pa % 10);
                }
            }
            return ja;
        }

        function aa(ia) {
            var ja = null, ka = j.getElementsByTagName("body")[0], la = j.createElement("object");
            if (ka && la) {
                la.setAttribute("type", i);
                la.style.visibility = "hidden";
                ka.appendChild(la);
                var ma = 0;
                (function () {
                    if (typeof la.GetPluginVersion == o) {
                        if (ma++ < 10)setTimeout(arguments.callee, 10);
                    } else {
                        ja = {};
                        ja.plugin = la.GetPluginVersion();
                        ja.unity = la.GetUnityVersion("");
                    }
                })();
                ka.removeChild(la);
            }
            ia(ja);
        }

        function ba(ia) {
            var ja = q, ka = null;
            k.plugins.refresh();
            if (w.clientBrand === "??" || w.clientPlatform === "???" || w.mobile) {
                ja = s;
            } else if (w.op && w.mac) {
                ja = s;
            } else if (typeof k.plugins != o && k.plugins[h] && typeof k.mimeTypes != o && k.mimeTypes[i] && k.mimeTypes[i].enabledPlugin) {
                ja = p;
                aa(function (qa) {
                    if (!qa || !qa.plugin) {
                        ja = r;
                    } else if (w.mac && w.ch && (z(qa.plugin) <= z("2.6.1f3"))) {
                        ja = r;
                    } else ka = qa.plugin;
                    ia(ja, ka);
                });
                return;
            } else if (w.ie) {
                var la = false;
                try {
                    if (ActiveXObject.prototype != null)la = true;
                } catch (ma) {
                }
                if (!la || w.x64) {
                    ja = s;
                } else {
                    ja = q;
                    try {
                        var na = new ActiveXObject("UnityWebPlayer.UnityWebPlayer.1");
                        ka = na.GetPluginVersion();
                        ja = p;
                        if (ka == "2.5.0f5") {
                            var oa = /Windows NT \d+\.\d+/.exec(k.userAgent);
                            if (oa && oa.length > 0) {
                                var pa = parseFloat(oa[0].split(' ')[2]);
                                if (pa >= 6)ja = r;
                            }
                        }
                    } catch (ma) {
                    }
                }
            }
            ia(ja, ka);
        }

        function ca(ia) {
            var ja = q, ka = null;
            if (typeof k.mimeTypes != o && k.mimeTypes[i] && k.mimeTypes[i].enabledPlugin) {
                ja = p;
                var la = k.mimeTypes[i].enabledPlugin.description;
                ka = la.replace("Unity Player ", "");
            }
            ia(ja, ka);
        }

        function da(ia) {
            ba(function (ja, ka) {
                var la = 'javascript:window.open("http://unity3d.com/webplayer/");', ma = ja;
                if (ja != s && ja != r)if (w.java && !x(m)) {
                    la = "";
                    ma = u;
                } else if (w.co && !x(n)) {
                    la = "";
                    ma = v;
                } else if (w.win) {
                    la = l + "UnityWebPlayer.exe";
                    ma = t;
                } else if (k.platform == "MacIntel") {
                    la = l + "webplayer-mini.dmg";
                    ma = t;
                } else if (k.platform == "MacPPC") {
                    la = l + "webplayer-mini.dmg";
                    ma = t;
                }
                ia(la, ma);
            });
        }

        function ea() {
            y(m, true);
            var ia = {type: "application/x-java-applet", archive: l + "3.0/jws/UnityWebPlayer.jar", code: "UnityWebPlayer", name: "Unity Web Player", width: 1, height: 1}, ja = j.createElement("div"), ka = j.body.lastChild;
            j.body.insertBefore(ja, ka.nextSibling);
            var la = {jnlp_href: l + "3.0/jws/UnityWebPlayer.jnlp", classloader_cache: false, installer: ha(), image: "http://webplayer.unity3d.com/installation/unitylogo.png", centerimage: true, boxborder: false, scriptable: true, mayscript: true};
            if (w.win && w.ie) {
                var ma = "";
                for (var na in ia)ma += ' ' + na + '="' + ia[na] + '"';
                var oa = "";
                for (var pa in la)oa += '<param name="' + pa + '" value="' + la[pa] + '" />';
                ja.outerHTML = '<object' + ma + '>' + oa + '</object>';
            } else {
                var qa = j.createElement("object");
                for (na in ia)qa.setAttribute(na, ia[na]);
                for (pa in la) {
                    var ra = j.createElement("param");
                    ra.name = pa;
                    ra.value = la[pa];
                    qa.appendChild(ra);
                }
                ja.parentNode.replaceChild(qa, ja);
            }
        }

        function fa(ia) {
            if (!ia)y(n, true);
            var ja = l + "3.0/co/UnityWebPlayer.application?installer=" + encodeURIComponent(l + "UnityWebPlayer.exe");
            ga(ja);
        }

        function ga(ia) {
            var ja = document.createElement("IFRAME");
            ja.setAttribute("src", ia);
            ja.style.width = 1 + "px";
            ja.style.height = 1 + "px";
            ja.style.border = "none";
            document.body.appendChild(ja);
        }

        function ha() {
            return l + (w.win ? "UnityWebPlayer.exe" : "UnityPlayer.plugin.zip");
        }

        return {kInstalled: p, kMissing: q, kUnsupported: s, kJava: u, kClickOnce: v, triedJavaCookie: m, detectUnity: function (ia) {
            if (w.w3 && !(w.wk && w.wk < 312) && ia) {
                ba(ia);
            } else if (ia)ia(q);
        }, detectOnlyUnity: function (ia) {
            ca(ia);
        }, genInstallUnity: function (ia) {
            da(ia);
        }, doJavaInstall: function () {
            ea();
        }, doClickOnceInstall: function (ia) {
            fa(ia);
        }, doStandardInstall: function (ia) {
            ga(ia);
        }};
    }();
    e.exports.kInstalled = g.kInstalled;
    e.exports.kMissing = g.kMissing;
    e.exports.kUnsupported = g.kUnsupported;
    e.exports.kJava = g.kJava;
    e.exports.kClickOnce = g.kClickOnce;
    e.exports.triedJavaCookie = g.triedJavaCookie;
    e.exports.detectUnity = function (h) {
        g.detectUnity(function (i, j) {
            h(i, j);
        });
    };
    e.exports.detectOnlyUnity = function (h) {
        g.detectOnlyUnity(function (i, j) {
            h(i, j);
        });
    };
    e.exports.genInstallUnity = function (h) {
        g.genInstallUnity(function (i, j) {
            h(i, j);
        });
    };
    e.exports.doJavaInstall = function () {
        g.doJavaInstall();
    };
    e.exports.doClickOnceInstall = function (h) {
        g.doClickOnceInstall(h);
    };
    e.exports.doStandardInstall = function (h) {
        g.doStandardInstall(h);
    };
    e.exports.callbackWhenUnityDetected = function (h) {
        var i = function () {
            g.detectUnity(function (j, k) {
                if (j == g.kInstalled) {
                    h(j, k);
                } else setTimeout(i, 3000);
            });
        };
        i();
    };
}, null);
__d("UnityLogging", ["AsyncRequest", "UnityObject", "UserAgent_DEPRECATED"], function (a, b, c, d, e, f, g, h, i) {
    var j = function (k) {
        return function (l, m) {
            var n = {status: l, version: m, reason: k};
            new g().setURI('/ajax/platform/unity/logging').setData(n).send();
        };
    };
    e.exports.dailyLogUnityVersion = function () {
        if ((i.webkit() >= 537.71 && !i.chrome()) || i.chrome() >= 32) {
            h.detectOnlyUnity(j('daily'));
            return;
        }
        h.detectUnity(j('daily'));
    };
    e.exports.logUntilInstalled = function () {
        h.detectUnity(function (k, l) {
            j('canvas')(k, l);
            if (k != h.kInstalled)h.callbackWhenUnityDetected(j('state_change'));
        });
    };
}, null);