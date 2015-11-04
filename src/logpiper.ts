import http = require('http');
import server = require('../src/logpiper-server');
import client = require('../src/logpiper-client');

export function logpiper(port: number, callback: (server: http.Server) => void) : void {
	
	let streamBuffer: string[] = [];
	
	server.run(port, (httpServer, io) => {
		client.stream((data) => {
			io.on('connection', (socket) => {
				streamBuffer.forEach((data) => {
					socket.emit('log', data);		
				});
			});
			
			streamBuffer.push(data);
			io.sockets.emit('log', data);
		}, () => {
			streamBuffer.push('Connection Ended');
			io.sockets.emit('log', 'Connection Ended');
		});
		
		callback(httpServer);
	});
}

logpiper(8080, (server) => {});