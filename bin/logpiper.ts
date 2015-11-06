import logpiper = require('../src/logpiper')
import commandLineArgs = require('command-line-args');

let cli = commandLineArgs([
	{ name: 'port', alias: 'p', type: Number },
]);

let options = cli.parse()

let port = options.port || 8080;

logpiper.logpiper(port, (server) => {});