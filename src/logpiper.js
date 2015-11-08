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
            var dataElements = data.split('\n');
            // Remove last element if it is null
            if (dataElements.length > 0) {
                if (dataElements[dataElements.length - 1] == '') {
                    dataElements.pop();
                }
            }
            dataElements.forEach(function (d) {
                streamBuffer.push(d);
                io.sockets.emit('log', d);
            });
        }, function () {
            streamBuffer.push('Connection Ended');
            io.sockets.emit('log', 'Connection Ended');
        });
        callback(httpServer);
    });
}
exports.logpiper = logpiper;
//# sourceMappingURL=logpiper.js.map