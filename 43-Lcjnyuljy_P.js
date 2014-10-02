/*!CK:456113436!*//*1408457172,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["vxsWQ"]);
}

__d("BirthdayReminder", ["Animation", "AsyncDialog", "AsyncRequest", "CSS", "DOM", "DOMQuery", "Event", "Parent", "XBirthdayMessagePostControllerURIBuilder", "fbt", "tx", "CelebrationsLogger"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = b('CelebrationsLogger').Logger, s = b('CelebrationsLogger').Sources, t = b('CelebrationsLogger').Events, u = {registerMessageHandler: function (v, w, x) {
        m.listen(v, 'click', function (event, y) {
            var z = (new i()).setURI('/ajax/messaging/composer.php').setData({ids: [w], ref: x}).setMethod('POST');
            h.send(z, function (aa) {
                aa.subscribe('Messenger/message-sent', function () {
                    var ba = new o().getURI();
                    new i().setURI(ba).setData({id: w}).setMethod('POST').send();
                });
            });
        });
    }, registerWallpostHandler: function (v, w, x) {
        var y = null;
        if (x && w)y = r.createLogger(s.RHC_REMINDER, w);
        m.listen(v, 'submit', function (event, z) {
            var aa, ba, ca;
            aa = n.byTag(v, 'li');
            if (aa)for (ba = aa.nextSibling; ba; ba = ba.nextSibling) {
                ca = l.scry(ba, 'textarea');
                if (ca.length) {
                    ca[0].focus();
                    break;
                }
            }
            if (y)y.logEvent(t.CLIENT_STARTED_POST);
            return true;
        });
        if (y)m.listen(v, 'success', function (event, z) {
            y.logEvent(t.CLIENT_FINISHED_POST);
        });
        m.listen(v, 'error', function (event, z) {
            var aa = k.create('a', {href: '#'}, "There was an error submitting your post. Retry?");
            m.listen(aa, 'click', function (event, ba) {
                j.show(v);
                k.remove(aa);
            });
            j.hide(v);
            k.insertAfter(v, aa);
            if (y)y.logEvent(t.CLIENT_FAILED_POST);
            return false;
        });
    }, registerCommentHandler: function (v, w) {
        m.listen(v, 'error', function (event, x) {
            k.setContent(v, "\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0435 \u0432\u0430\u0448\u0435\u0433\u043e \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f");
            return false;
        });
        m.listen(v, 'success', function (event, x) {
            k.replace(v, w);
            new g(w).duration(1000).checkpoint().to('backgroundColor', '#FFFFFF').from('borderColor', '#FFE222').to('borderColor', '#FFFFFF').go();
        });
    }};
    e.exports = u;
}, null);