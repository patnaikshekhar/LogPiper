var server = require('../src/logpiper-server');
var client = require('../src/logpiper-client');
function logpiper(port, callback) {
    var streamBuffer = [];
    server.run(port, function (httpServer, io) {
        client.stream(function (data) {
            io.on('connection', function (socket) {
                streamBuffer.forEach(function (data) {
                    socket.emit('log', data);
                });
            });
            streamBuffer.push(data);
            io.sockets.emit('log', data);
        }, function () {
            streamBuffer.push('Connection Ended');
            io.sockets.emit('log', 'Connection Ended');
        });
        callback(httpServer);
    });
}
exports.logpiper = logpiper;
logpiper(8080, function (server) { });
//# sourceMappingURL=logpiper.js.map