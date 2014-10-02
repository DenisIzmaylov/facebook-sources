/*!CK:1508358053!*//*1411964858,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["Gd0f0"]);
}

__d("legacy:connect-login", ["ConnectLogin"], function (a, b, c, d) {
    a.ConnectLogin = b('ConnectLogin');
}, 3);
__d("htmlize", ["htmlSpecialChars"], function (a, b, c, d, e, f, g) {
    function h(i) {
        return g(i).replace(/\r\n|[\r\n]/g, '<br/>');
    }

    e.exports = h;
}, null);
__d("PluginResize", ["Locale", "Log", "UnverifiedXD", "copyProperties", "getOffsetParent", "getStyleProperty"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    function m(q) {
        q = q || document.body;
        var r = 0, s = k(q);
        if (g.isRTL() && s) {
            r = s.offsetWidth - q.offsetLeft - q.offsetWidth;
        } else if (!g.isRTL())r = q.offsetLeft;
        return n(q) + r;
    }

    function n(q) {
        return Math.ceil(parseFloat(l(q, 'width'))) || q.offsetWidth;
    }

    function o(q) {
        q = q || document.body;
        return q.offsetHeight + q.offsetTop;
    }

    function p(q, r, event, s) {
        this.calcWidth = q || m;
        this.calcHeight = r || o;
        this.width = undefined;
        this.height = undefined;
        this.reposition = !!s;
        this.event = event || 'resize';
    }

    j(p.prototype, {resize: function () {
        var q = this.calcWidth(), r = this.calcHeight();
        if (q !== this.width || r !== this.height) {
            h.debug('Resizing Plugin: (%s, %s, %s, %s)', q, r, this.event, this.reposition);
            this.width = q;
            this.height = r;
            i.send({type: this.event, width: q, height: r, reposition: this.reposition});
        }
        return this;
    }, auto: function (q) {
        setInterval(this.resize.bind(this), q || 250);
        return this;
    }});
    p.auto = function (q, event, r) {
        return new p(m.bind(null, q), o.bind(null, q), event).resize().auto(r);
    };
    p.autoHeight = function (q, r, event, s) {
        return new p(function () {
            return q;
        }, o.bind(null, r), event).resize().auto(s);
    };
    e.exports = p;
}, null);
__d("MentionsInputMatchers", [], function (a, b, c, d, e, f) {
    var g = ['@', '\\uff20'].join(''), h = '.,+*?$|#{}()\\^\\-\\[\\]\\\\\/!%\'"~=<>_:;\n\r', i = '\\b[A-Z][^ A-Z' + h + ']', j = '(?:[^' + g + h + ']|[' + h + '][^ ' + h + '])', k = '(?:^|\\s)(?:[' + g + '](' + j + '{0,20}))', l = '(?:(?:^|[^#])(' + i + '+)|' + k + ')', m = '(?:' + i + '{4,})', n = '#\\uFF03', o = {trigger: new RegExp('[' + g + ']$'), hashtagTrigger: new RegExp('[' + n + ']'), mainMatcher: new RegExp(k + '$'), autoMatcher: new RegExp(l + '$'), userMatcher: new RegExp(m + '$')};
    e.exports = o;
}, null);
__d("MentionsInput", ["Arbiter", "ArbiterMixin", "Bootloader", "CSS", "DataStore", "DOM", "Event", "Input", "InputSelection", "Keys", "MentionsInputMatchers", "Parent", "Style", "TokenizeUtil", "UserAgent_DEPRECATED", "htmlize", "mixin", "removeFromArray", "repeatString"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
    var z = '\uFEFF', aa = new RegExp(z, 'g'), ba = function (na) {
        return na + z;
    }, ca = '\uFFFD', da = /@+\[[0-9]+\:([^\]]|\\\])*\]+/g, ea = /[\\\]:]/g;

    function fa(na, oa) {
        return na.replace(oa, y(' ', oa.length));
    }

    function ga(na, oa) {
        return na.substring(0, oa) + na.substring(oa + 1);
    }

    function ha(na) {
        var oa = na.lastIndexOf('>');
        if (oa >= 0) {
            var pa = na.indexOf(' ', oa);
            return pa >= 0 ? na.substr(0, pa + 1) : na;
        } else return '';
    }

    function ia(na, oa, pa) {
        var qa = pa.lastIndexOf('<', oa) > pa.lastIndexOf('>', oa);
        return qa ? ' ' : '&nbsp;<wbr />';
    }

    var ja = w(h);
    for (var ka in ja)if (ja.hasOwnProperty(ka))ma[ka] = ja[ka];
    var la = ja === null ? null : ja.prototype;
    ma.prototype = Object.create(la);
    ma.prototype.constructor = ma;
    ma.__superConstructor__ = ja;
    function ma(na, oa, pa, qa, ra, sa) {
        "use strict";
        k.set(na, 'MentionsInput', this);
        this._root = na;
        this._typeahead = oa;
        this._input = pa;
        this._offsets = [];
        var ta = null, ua = this.init.bind(this, qa, ra, sa);
        try {
            ta = document.activeElement === this._input;
        } catch (va) {
        }
        if (ta) {
            setTimeout(ua, 0);
        } else var wa = m.listen(this._input, 'focus', function () {
            setTimeout(ua, 0);
            wa.remove();
        });
        this._hasHashtags = qa.hashtags;
        this._autoSuggestPages = qa.autosuggest_pages;
        this._lastHighlighterHTML = '';
        this._hashtags = [];
    }

    ma.prototype.init = function (na, oa, pa) {
        "use strict";
        if (this._initialized)return;
        this._initialized = true;
        this._highlighter = l.find(this._root, '.highlighter');
        this._highlighterInner = this._highlighter.firstChild;
        this._highlighterContent = l.find(this._root, '.highlighterContent');
        this._hiddenInput = l.find(this._root, '.mentionsHidden');
        this._placeholder = this._input.getAttribute('placeholder') || '';
        this._metrics = pa;
        if (!this._hiddenInput.name) {
            var qa = this._input.name;
            this._input.name = qa + '_text';
            this._hiddenInput.name = qa;
        }
        this._initEvents();
        this._initTypeahead();
        if (oa === null) {
            this._setup();
        } else this.reset(oa);
        this.inform('init', null, g.BEHAVIOR_STATE);
    };
    ma.prototype._setup = function () {
        "use strict";
        this._mentioned = {};
        this._orderedUIDs = [];
        this._numMentioned = 0;
        this._filterData = null;
        this._highlighterContent && l.empty(this._highlighterContent);
        this._highlighterAuxContent && l.remove(this._highlighterAuxContent);
        this._highlighterAuxContent = null;
        n.setPlaceholder(this._input, this._placeholder);
        s.set(this._typeahead.getElement(), 'height', 'auto');
    };
    ma.prototype.reset = function (na) {
        "use strict";
        if (!this._initialized)return;
        this._setup();
        var oa = na && na.value || '';
        this._value = oa;
        this._hiddenInput && (this._hiddenInput.value = oa);
        if (this._input && na)n.setValue(this._input, na.value);
        var pa = na && na.mentions;
        if (pa && pa.length) {
            var qa = [];
            pa.forEach(function (ra) {
                qa.push(ra.offset + ra.length);
                delete ra.offset;
                delete ra.length;
                this._addToken(ra);
            }, this);
            qa.reverse().forEach(function (ra) {
                oa = oa.substring(0, ra) + z + oa.substring(ra);
            });
        }
        n.setValue(this._input, oa);
        this._update();
    };
    ma.prototype.getValue = function () {
        "use strict";
        return n.getValue(this._input).replace(aa, '');
    };
    ma.prototype._getMarkedValue = function () {
        "use strict";
        return n.getValueRaw(this._input);
    };
    ma.prototype.getRawValue = function () {
        "use strict";
        this._update();
        return n.getValue(this._hiddenInput);
    };
    ma.prototype.checkValue = function () {
        "use strict";
        var na = this._typeahead.getCore().getValue();
        if (q.trigger.exec(na) || na === '')this.inform('sessionEnd', {});
    };
    ma.prototype.getTypeahead = function () {
        "use strict";
        return this._typeahead;
    };
    ma.prototype._initEvents = function () {
        "use strict";
        var na = this._update.bind(this);
        m.listen(this._input, {input: na, keyup: na, change: na, blur: this._handleBlur.bind(this), focus: this._handleFocus.bind(this), keydown: this._handleKeydown.bind(this)});
        if (this._metrics) {
            this._metrics.init(this._typeahead);
            this._metrics._reset();
            this._metrics.bindSessionStart(this._typeahead, 'render', true);
            this._metrics.bindSessionEnd(this._typeahead.getView(), 'select', true);
            this._metrics.bindSessionEnd(this, 'sessionEnd', false);
            m.listen(this._input, 'keyup', function (event) {
                setTimeout(this.checkValue.bind(this), 0);
            }.bind(this));
        }
    };
    ma.prototype._initTypeahead = function () {
        "use strict";
        this._typeahead.subscribe('select', function (sa, ta) {
            var ua = ta.selected;
            this._addToken({uid: ua.uid, text: ua.text, type: ua.type, weakreference: ua.weak_reference});
            this.updateValue();
        }.bind(this));
        var na = this._input, oa = null;

        function pa() {
            if (oa === null) {
                oa = n.getSubmitOnEnter(na);
                n.setSubmitOnEnter(na, false);
            }
        }

        function qa() {
            if (oa !== null) {
                n.setSubmitOnEnter(na, oa);
                oa = null;
            }
        }

        this._typeahead.subscribe('reset', qa);
        this._typeahead.subscribe('render', pa);
        this._typeahead.subscribe('highlight', function (sa, ta) {
            ta.index >= 0 ? pa() : qa();
        });
        this._typeahead.subscribe('query', function () {
            this._filterData = null;
        }.bind(this));
        var ra = this._typeahead.getCore();
        ra.suffix = z;
        this._handleFocus();
    };
    ma.prototype._handleBlur = function () {
        "use strict";
        if (this._filterToken) {
            this._filterToken.remove();
            this._filterToken = null;
        }
    };
    ma.prototype._handleFocus = function () {
        "use strict";
        if (!this._filterToken)this._filterToken = this._typeahead.getData().addFilter(this._filterResults.bind(this));
        this._updateWidth();
    };
    ma.prototype._handleKeydown = function (event) {
        "use strict";
        var na = event.keyCode;
        if (na == p.BACKSPACE || na == p.DELETE)this._handleBackspaceAndDelete(event, na);
        if (na == p.LEFT || na == p.RIGHT)setTimeout(this._handleLeftAndRight.bind(this, na), 10);
    };
    ma.prototype._handleLeftAndRight = function (na) {
        "use strict";
        var oa = this._getMarkedValue(), pa = o.get(this._input), qa = pa.start, ra = pa.end, sa = na == p.LEFT, ta = na == p.RIGHT;
        if (qa == ra) {
            var ua = sa ? -1 : 1;
            if (oa.charAt(qa) == z)o.set(this._input, qa + ua);
        } else if (sa && oa.charAt(qa) == z) {
            o.set(this._input, qa - 1, ra);
        } else if (sa && oa.charAt(ra) == z) {
            o.set(this._input, qa, ra - 1);
        } else if (ta && oa.charAt(ra) == z) {
            o.set(this._input, qa, ra + 1);
        } else if (ta && oa.charAt(qa) == z)o.set(this._input, qa + 1, ra);
    };
    ma.prototype._handleBackspaceAndDelete = function (event, na) {
        "use strict";
        var oa = o.get(this._input), pa = false;
        if (oa.start !== oa.end)if (this._offsetIsInsideMention(oa.start + 1) && this._offsetIsInsideMention(oa.end)) {
            pa = (na === p.BACKSPACE);
        } else return;
        var qa = na === p.DELETE ? 1 : -1, ra = qa + (pa ? oa.end : oa.start), sa = this._getMarkedValue(), ta = sa;
        for (var ua = 0; ua < this._orderedUIDs.length; ++ua) {
            var va = this._mentioned[this._orderedUIDs[ua]], wa = va.text, xa = ba(wa), ya = ta.indexOf(xa), za = ya + xa.length;
            if (ra < ya || ra >= za) {
                ta = fa(ta, xa);
                continue;
            }
            var ab, bb;
            if (va.type != 'user') {
                ab = 0;
                bb = [wa];
            } else {
                ab = xa.substring(0, ra - ya).split(' ').length - 1;
                bb = wa.split(' ');
            }
            var cb = bb.splice(ab, 1)[0], db = bb.join(' '), eb = ab === 0 ? ya : za - cb.length - 1;
            if (db) {
                va.text = db;
                db = ba(db);
            } else this._removeToken(va.uid);
            var fb = sa.substring(0, ya) + db + sa.substring(za);
            n.setValue(this._input, fb);
            o.set(this._input, eb);
            this._update();
            event.kill();
            break;
        }
    };
    ma.prototype._offsetIsInsideMention = function (na) {
        "use strict";
        for (var oa = 0; oa < this._offsets.length; oa++)if (na > this._offsets[oa][0] && na <= this._offsets[oa][1])return true;
        return false;
    };
    ma.prototype._filterResults = function (na) {
        "use strict";
        if (this._filterData === null) {
            var oa = o.get(this._input).start;
            if (this._offsetIsInsideMention(oa)) {
                this._filterData = {caretIsInsideMention: true};
                return false;
            }
            var pa = this._typeahead.getCore();
            this._filterData = {value: pa.getValue(), rawValue: pa.getRawValue()};
        }
        if (this._filterData.caretIsInsideMention)return false;
        if (q.mainMatcher.test(this._filterData.rawValue))return true;
        if (na.type != 'user' && !this._shouldIncludeNonUserItem(na))return false;
        if (na.disable_autosuggest)return false;
        if (q.userMatcher.test(this._filterData.value))return true;
        return t.isExactMatch(this._filterData.value, this._typeahead.getData().getTextToIndex(na));
    };
    ma.prototype._shouldIncludeNonUserItem = function (na) {
        "use strict";
        if (this._autoSuggestPages != 'false' && na.connected_page)return true;
        if (this._autoSuggestPages == 'include_authoritative' && na.is_authoritative_person)return true;
        return false;
    };
    ma.prototype._addToken = function (na) {
        "use strict";
        var oa = na.uid;
        if (!this._mentioned.hasOwnProperty(oa)) {
            this._mentioned[oa] = na;
            this._orderedUIDs.push(oa);
            this._numMentioned++;
            this._update();
        }
    };
    ma.prototype._removeToken = function (na) {
        "use strict";
        if (this._mentioned.hasOwnProperty(na)) {
            delete this._mentioned[na];
            x(this._orderedUIDs, na);
            this._numMentioned--;
            this._update();
        }
    };
    ma.prototype._update = function () {
        "use strict";
        var na = this._getMarkedValue();
        if (na == this._value)return;
        this._value = na;
        this._updateTypeahead();
        this._updateMentions();
        this._updateWidth();
        setTimeout(this._updateDirection.bind(this), 0);
        this.updateValue();
    };
    ma.prototype._updateMentions = function () {
        "use strict";
        this._offsets = [];
        var na = this._getMarkedValue(), oa = na;
        for (var pa = 0; pa < this._orderedUIDs.length; ++pa) {
            var qa = this._orderedUIDs[pa], ra = ba(this._mentioned[qa].text), sa = oa.indexOf(ra);
            if (sa == -1)this._removeToken(qa);
            oa = fa(oa, ra);
            this._offsets.push([sa, sa + ra.length]);
        }
        var ta = na;
        while ((sa = oa.indexOf(z)) > -1) {
            ta = ga(ta, sa);
            oa = ga(oa, sa);
        }
        if (na !== ta) {
            var ua = o.get(this._input);
            n.setValue(this._input, ta);
            o.set(this._input, ua.start);
            this._value = ta;
        }
    };
    ma.prototype._renderHashtags = function (na) {
        "use strict";
        if (!this._hasHashtags)return v(na);
        if (!this._hashtagParser) {
            if (q.hashtagTrigger.exec(na))this.bootloadHashtagParser();
            if (!this._hashtagParser)return v(na);
        }
        this._hashtags = this._hashtagParser.parse(na);
        var oa = [], pa = 0;
        for (var qa = 0; qa < this._hashtags.length; qa++) {
            var ra = this._hashtags[qa];
            oa.push(v(na.substring(pa, ra.rawOffset)), '<b>', ra.marker, ra.tag, '</b>');
            pa = ra.rawOffset + ra.marker.length + ra.tag.length;
        }
        oa.push(v(na.substring(pa)));
        return oa.join('');
    };
    ma.prototype.updateValue = function () {
        "use strict";
        var na = this._value = this._getMarkedValue(), oa = this._orderedUIDs, pa = na.replace(da, ca);
        for (var qa = 0; qa < oa.length; ++qa) {
            var ra = '@[' + oa[qa] + ':]', sa = ba(this._mentioned[oa[qa]].text);
            pa = pa.replace(sa, ra);
            na = na.replace(sa, ra);
        }
        var ta = this._renderHashtags(na);
        for (var qa = 0; qa < oa.length; ++qa) {
            var ua = oa[qa], va = this._mentioned[ua], wa = va.text, xa = va.weakreference ? '<b class="weak">' : '<b>';
            ta = ta.replace('@[' + ua + ':]', xa + v(ba(wa)) + '</b>');
            wa = wa.replace(ea, function (za) {
                return '\\' + za;
            });
            pa = pa.replace('@[' + ua + ':]', '@[' + ua + ':' + wa + ']');
        }
        var ya = ha(ta);
        if (this._highlighterAuxContent || ya !== this._lastHighlighterHTML) {
            if (u.ie() < 9)ta = ta.replace(/ /g, ia);
            this._highlighterContent.innerHTML = ta;
            this._updateHighlighter();
            this._lastHighlighterHTML = ya;
        }
        this._hiddenInput.value = pa;
        this._updateHeight();
    };
    ma.prototype._updateDirection = function () {
        "use strict";
        var na = s.get(this._input, 'direction');
        if (na == this._dir)return;
        this._dir = na;
        s.set(this._highlighter, 'direction', na);
        if (na == 'rtl') {
            s.set(this._highlighter, 'text-align', 'right');
        } else s.set(this._highlighter, 'text-align', 'left');
    };
    ma.prototype._updateWidth = function () {
        "use strict";
        var na = this._input.offsetWidth;
        if (na === this._lastInputWidth)return;
        this._lastInputWidth = na;
        var oa = s.getFloat.bind(null, this._input), pa = na - oa('paddingLeft') - oa('paddingRight') - oa('borderLeftWidth') - oa('borderRightWidth');
        this._highlighterInner.style.width = Math.max(pa, 0) + 'px';
    };
    ma.prototype._updateHeight = function () {
        "use strict";
        if (this._highlighterAuxContent) {
            var na = this._highlighter.offsetHeight, oa = this._typeahead.getElement();
            if (na > oa.offsetHeight) {
                s.set(oa, 'height', na + 'px');
                g.inform('reflow');
            }
        }
    };
    ma.prototype._updateTypeahead = function () {
        "use strict";
        var na = this._typeahead.getCore();
        na.matcher = q.autoMatcher;
        na.setExclusions(this._orderedUIDs);
        this.inform('update', {mentioned: this._mentioned});
    };
    ma.prototype.setPlaceholder = function (na) {
        "use strict";
        this._placeholder = na;
        if (!this.hasAuxContent())n.setPlaceholder(this._input, na);
    };
    ma.prototype._updateHighlighter = function () {
        "use strict";
        if (this._highlighterContent)j.conditionShow(this._highlighterContent, this._numMentioned > 0 || this.hasAuxContent() || this._hashtags.length);
    };
    ma.prototype.setAuxContent = function (na) {
        "use strict";
        if (this._highlighterContent) {
            if (!this._highlighterAuxContent) {
                this._highlighterAuxContent = l.create('span', {className: 'highlighterAuxContent'});
                l.insertAfter(this._highlighterContent, this._highlighterAuxContent);
            }
            l.setContent(this._highlighterAuxContent, na);
            if (na) {
                n.setPlaceholder(this._input, '');
            } else n.setPlaceholder(this._input, this._placeholder);
            this._value = null;
            this._update();
            this._updateHighlighter();
            this._updateHeight();
        }
    };
    ma.prototype.hasAuxContent = function () {
        "use strict";
        var na = this.getAuxContentRoot();
        return na && j.shown(na) && na.innerHTML.length > 0;
    };
    ma.prototype.getAuxContentRoot = function () {
        "use strict";
        return this._highlighterAuxContent;
    };
    ma.prototype.addMention = function (na, oa) {
        "use strict";
        oa = (typeof oa === 'undefined') ? true : oa;
        var pa = oa === false ? '' : ' ', qa = this._getMarkedValue();
        if (qa !== '')qa += ' ';
        n.setValue(this._input, qa + ba(na.text) + pa);
        this._addToken(na);
        this._update();
    };
    ma.prototype.getMentions = function () {
        "use strict";
        return this._mentioned;
    };
    ma.prototype.bootloadHashtagParser = function () {
        "use strict";
        if (!this._hashtagParser)i.loadModules(["HashtagParser"], function (na) {
            this._hashtagParser = na;
            if (this._initialized) {
                this._value = null;
                this._update();
            }
        }.bind(this));
    };
    ma.getInstance = function (na) {
        "use strict";
        var oa = r.byClass(na, 'uiMentionsInput');
        return oa ? k.get(oa, 'MentionsInput') : null;
    };
    e.exports = ma;
}, null);
__d("legacy:MentionsInput", ["MentionsInput"], function (a, b, c, d) {
    a.MentionsInput = b('MentionsInput');
}, 3);
__d("TypeaheadAreaCore", ["InputSelection", "TypeaheadCore", "copyProperties", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j) {
    for (var k in h)if (h.hasOwnProperty(k))m[k] = h[k];
    var l = h === null ? null : h.prototype;
    m.prototype = Object.create(l);
    m.prototype.constructor = m;
    m.__superConstructor__ = h;
    function m(n) {
        "use strict";
        h.call(this, n);
        this.matcher = new RegExp(this.matcher + '$');
        this.preventFocusChangeOnTab = true;
    }

    m.prototype.select = function (n) {
        "use strict";
        l.select.call(this, n);
        var o = this.element.value, p = this.prefix + n.text + this.suffix;
        this.expandBounds(o, p);
        var q = o.substring(0, this.start), r = o.substring(this.end);
        this.element.value = q + p + r;
        g.set(this.element, q.length + p.length);
    };
    m.prototype.expandBounds = function (n, o) {
        "use strict";
        n = n.toLowerCase();
        o = o.toLowerCase();
        var p, q, r, s, t = /\s/;
        q = n.substring(this.start, this.end);
        r = o.indexOf(q);
        p = this.start;
        while (p >= 0 && r >= 0) {
            s = n.charAt(p - 1);
            if (!s || t.test(s))this.start = p;
            q = s + q;
            r = o.indexOf(q);
            p--;
        }
        q = n.substring(this.start, this.end);
        r = o.indexOf(q);
        p = this.end;
        while (p <= n.length && r >= 0) {
            s = n.charAt(p);
            if (!s || t.test(s))this.end = p;
            q = q + s;
            r = o.indexOf(q);
            p++;
        }
    };
    m.prototype.getRawValue = function () {
        "use strict";
        var n = g.get(this.element).start || 0;
        return l.getValue.call(this).substring(0, n);
    };
    m.prototype.getValue = function () {
        "use strict";
        var n = this.matcher && this.matcher.exec(this.getRawValue());
        if (!n)return '';
        var o = n[0], p = n.index + o.length;
        o = o.replace(/^\s/, '');
        var q = o.length;
        o = o.replace(/\s$/, '');
        var r = q - o.length;
        this.start = p - q;
        this.end = p + r;
        return n[2] || n[1] || n[0];
    };
    i(m.prototype, {prefix: '', suffix: ', ', matcher: "\\b[^,]*", click: j});
    e.exports = m;
}, null);
__d("TypeaheadHoistFriends", ["copyProperties"], function (a, b, c, d, e, f, g) {
    function h(i) {
        "use strict";
        this._typeahead = i;
    }

    h.prototype.enable = function () {
        "use strict";
        var i = this._typeahead.getView();
        this._subscription = i.subscribe('beforeRender', function (j, k) {
            var l = [], m = [], n = [];
            for (var o = 0; o < k.results.length; ++o) {
                var p = k.results[o];
                if (p.type == 'header') {
                    n = n.concat(m, l);
                    n.push(p);
                    m = [];
                    l = [];
                } else if (p.type == 'user' && p.bootstrapped) {
                    m.push(p);
                } else l.push(p);
            }
            k.results = n.concat(m, l);
        });
    };
    h.prototype.disable = function () {
        "use strict";
        this._typeahead.getView().unsubscribe(this._subscription);
        this._subscription = null;
    };
    g(h.prototype, {_subscription: null});
    e.exports = h;
}, null);
__d("legacy:HoistFriendsTypeaheadBehavior", ["TypeaheadHoistFriends"], function (a, b, c, d, e, f, g) {
    if (!a.TypeaheadBehaviors)a.TypeaheadBehaviors = {};
    a.TypeaheadBehaviors.hoistFriends = function (h) {
        h.enableBehavior(g);
    };
}, 3);
__d("TypeaheadMetrics", ["AsyncRequest", "Event", "copyProperties", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j) {
    function k(l) {
        "use strict";
        this.extraData = {};
        i(this, l);
    }

    k.prototype.init = function (l) {
        "use strict";
        this.init = j;
        this.core = l.getCore();
        this.view = l.getView();
        this.data = l.getData();
        this.stats = {};
        this.sessionActive = false;
        this._sessionStartEvents = [];
        this._sessionEndEvents = [];
        this._reset();
        this.initEvents();
    };
    k.prototype._reset = function () {
        "use strict";
        this.stats = {};
        this.avgStats = {};
        this.sessionActive = false;
        this.sid = Math.floor(Date.now() * Math.random());
        this.data.setQueryData({sid: this.sid});
        this.data.setBootstrapData({sid: this.sid});
        this.request_ids = [];
    };
    k.prototype.recordSelect = function (l) {
        "use strict";
        var m = l.selected;
        if (m.uid == null) {
            this.recordStat('selected_id', 'SELECT_NULL');
        } else this.recordStat('selected_id', m.uid);
        this.recordStat('selected_type', m.type);
        this.recordStat('selected_position', l.index);
        this.recordStat('selected_with_mouse', l.clicked ? 1 : 0);
        this.recordStat('selected_query', l.query);
        this._sessionEnd();
    };
    k.prototype.bindSessionStart = function (l, event, m) {
        "use strict";
        if (m)for (var n = 0; n < this._sessionStartEvents.length; ++n) {
            var o = this._sessionStartEvents[n];
            o.obj.unsubscribe(o.token);
        }
        this._sessionStartEvents.push({obj: l, token: l.subscribe(event, function (p, q) {
            this._sessionStart();
        }.bind(this))});
    };
    k.prototype.bindSessionEnd = function (l, event, m) {
        "use strict";
        if (m)for (var n = 0; n < this._sessionEndEvents.length; ++n) {
            var o = this._sessionEndEvents[n];
            o.obj.unsubscribe(o.token);
        }
        this._sessionEndEvents.push({obj: l, token: l.subscribe(event, function (p, q) {
            this._sessionEnd();
        }.bind(this))});
    };
    k.prototype.initEvents = function () {
        "use strict";
        this.bindSessionStart(this.core, 'focus', false);
        this.bindSessionEnd(this.core, 'blur', false);
        this.view.subscribe('select', function (l, m) {
            this.recordSelect(m);
        }.bind(this));
        this.bindSessionEnd(this.view, 'select', false);
        this.view.subscribe('render', function (l, m) {
            this.results = m;
        }.bind(this));
        this.data.subscribe('beforeQuery', function (l, m) {
            this.query = m.value;
            if (!m.value)return;
            this.recordCountStat('num_queries');
        }.bind(this));
        this.data.subscribe('beforeFetch', function (l, m) {
            if (m.fetch_context.bootstrap) {
                this.bootstrapBegin = Date.now();
            } else m.fetch_context.queryBegin = Date.now();
        }.bind(this));
        this.data.subscribe('fetchComplete', function (l, m) {
            if (m.fetch_context.bootstrap) {
                this.recordAvgStat('bootstrap_latency', Date.now() - this.bootstrapBegin);
                var n = {};
                m.response.payload.entries.forEach(function (o) {
                    if (!n[o.type]) {
                        n[o.type] = 1;
                    } else n[o.type]++;
                });
                this.recordStat('bootstrap_response_types', n);
                this.bootstrapped = true;
            } else {
                if ('filtered_count' in m.response.payload)this.recordStat('filtered_count', m.response.payload.filtered_count);
                this.recordAvgStat('avg_query_latency', Date.now() - m.fetch_context.queryBegin);
            }
        }.bind(this));
        this.data.subscribe('respond', function (l, m) {
            var n = this.data.tokenizeBackend(m.value || '').flatValue, o = this.data.findBestPreviousQuery(n), p = this.data.getQueryIDs()[o];
            this.normalized_backend_query = o;
            this.request_id = p;
            this.request_ids.push(p);
        }.bind(this));
        this.data.subscribe('dirty', function (l, m) {
            this.bootstrapped = false;
        }.bind(this));
    };
    k.prototype._sessionStart = function () {
        "use strict";
        if (this.sessionActive)return;
        this.sessionActive = true;
    };
    k.prototype._sessionEnd = function () {
        "use strict";
        if (!this.sessionActive)return;
        this.sessionActive = false;
        this.submit();
        this._reset();
    };
    k.prototype.recordStat = function (l, m) {
        "use strict";
        this.stats[l] = m;
    };
    k.prototype.recordCountStat = function (l) {
        "use strict";
        var m = this.stats[l];
        this.stats[l] = m ? m + 1 : 1;
    };
    k.prototype.recordAvgStat = function (l, m) {
        "use strict";
        if (this.avgStats[l]) {
            this.avgStats[l][0] += m;
            ++this.avgStats[l][1];
        } else this.avgStats[l] = [m, 1];
    };
    k.prototype.hasStats = function () {
        "use strict";
        return !!Object.keys(this.stats).length;
    };
    k.prototype.submit = function () {
        "use strict";
        if (this.hasStats()) {
            i(this.stats, this.extraData);
            if (this.results) {
                var l = (this.results).map(function (o, p) {
                    return o.uid;
                });
                this.recordStat('candidate_results', JSON.stringify(l));
            }
            if (this.query)this.recordStat('query', this.query);
            if (this.normalized_backend_query)this.recordStat('normalized_backend_query', this.normalized_backend_query);
            if (this.request_id)this.recordStat('request_id', this.request_id);
            if (this.request_ids.length)this.recordStat('request_ids', this.request_ids);
            if (this.sid)this.recordStat('sid', this.sid);
            if (this.bootstrapped)this.recordStat('bootstrapped', 1);
            for (var m in this.avgStats) {
                var n = this.avgStats[m];
                this.stats[m] = n[0] / n[1];
            }
            new g().setURI(this.endPoint).setMethod('POST').setData({stats: this.stats}).setErrorHandler(j).send();
            this._reset();
        }
    };
    k.register = function (l, m, n) {
        "use strict";
        if (document.activeElement === l) {
            m.init(n);
        } else var o = h.listen(l, 'focus', function () {
            m.init(n);
            o.remove();
        });
    };
    i(k.prototype, {endPoint: '/ajax/typeahead/record_basic_metrics.php'});
    e.exports = k;
}, null);