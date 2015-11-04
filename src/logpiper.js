var server = require('../src/logpiper-server');
var client = require('../src/logpiper-client');
function logpiper(port, callback) {
    server.run(port, function (httpServer, io) {
        client.stream(function (data) {
            io.sockets.emit('log', data);
        }, function () { });
        callback(httpServer);
    });
}
exports.logpiper = logpiper;
//# sourceMappingURL=logpiper.js.map