import http = require('http');
import server = require('../src/logpiper-server');
import client = require('../src/logpiper-client');

export function logpiper(port: number, callback: (server: http.Server) => void) : void {
	server.run(port, (httpServer, io) => {
		client.stream((data) => {
			io.sockets.emit('log', data);
		}, () => {
			io.sockets.emit('log', 'Connection Ended');
		});
		
		callback(httpServer);
	});
}

logpiper(8080, (server) => {
	// Start server
	console.log(server);
});