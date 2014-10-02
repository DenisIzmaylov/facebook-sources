/*!CK:3226759081!*//*1401285439,178167327*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["kZVeB"]);
}

__d("LitestandComposerPublisher", ["Arbiter"], function (a, b, c, d, e, f, g) {
    f.publish = function (h, i) {
        g.inform('LitestandComposer/publish', {composer_id: h, markup: i});
    };
}, null);
__d("ShareLikeFooterContext", [], function (a, b, c, d, e, f) {
    var g = {STREAM: 'stream', TICKER: 'ticker', TIMELINE: 'timeline', LITESTAND: 'litestand'};
    e.exports = g;
}, null);