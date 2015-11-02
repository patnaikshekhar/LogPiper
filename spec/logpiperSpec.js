/// <references path="../typings/tsd.d.ts" />
//var logpiper = require('../src/logpiper');
//var stdin = require('mock-stdin').stdin();
var logpiper = require('../src/logpiper');
var stdin;
describe("log_piper", function () {
    beforeEach(function () {
        stdin = require('mock-stdin').stdin();
    });
    it("should be able to read piped input", function (done) {
        process.nextTick(function mockResponse() {
            stdin.send('Some text');
            stdin.end();
        });
        logpiper.piper(function (data) {
            expect(data).toBe('Some text');
            done();
        });
    });
});
//# sourceMappingURL=logpiperSpec.js.map