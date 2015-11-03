var express = require('express');
var io = require('socket.io');
var app = express();
var ioApp;
function run(port, callback) {
    app.get('/', function (request, response) {
        response.end('Test');
    });
    var server = app.listen(port, function () {
        console.log('Listening on', port);
        ioApp = io(server);
        callback(server, ioApp);
    });
}
exports.run = run;
//# sourceMappingURL=logpiper-server.js.map