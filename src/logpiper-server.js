var express = require('express');
var io = require('socket.io');
var app = express();
var ioApp;
function run(port, callback) {
    console.log(__dirname + '/public');
    app.use(express.static(__dirname + '/public'));
    var server = app.listen(port, function () {
        console.log('Listening on', port);
        ioApp = io(server);
        callback(server, ioApp);
    });
}
exports.run = run;
//# sourceMappingURL=logpiper-server.js.map