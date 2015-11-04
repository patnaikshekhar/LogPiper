import http = require('http');
import server = require('../src/logpiper-server');
import client = require('../src/logpiper-client');

export function logpiper(port: number, callback: (server: http.Server) => void) : void {
	server.run(port, (httpServer, io) => {
		client.stream((data) => {
			io.sockets.emit('log', data);
		}, () => {});
		
		callback(httpServer);
	});
}