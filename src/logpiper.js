var server = require('../src/logpiper-server');
var client = require('../src/logpiper-client');
function logpiper(port, callback) {
    server.run(port, function (httpServer, io) {
        client.stream(function (data) {
            io.sockets.emit('log', data);
        }, function () {
            io.sockets.emit('log', 'Connection Ended');
        });
        callback(httpServer);
    });
}
exports.logpiper = logpiper;
logpiper(8080, function (server) {
    // Start server
    console.log(server);
});
//# sourceMappingURL=logpiper.js.map