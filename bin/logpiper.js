var logpiper = require('../src/logpiper');
var commandLineArgs = require('command-line-args');
var cli = commandLineArgs([
    { name: 'port', alias: 'p', type: Number },
]);
var options = cli.parse();
var port = options.port || 8080;
logpiper.logpiper(port, function (server) { });
//# sourceMappingURL=logpiper.js.map