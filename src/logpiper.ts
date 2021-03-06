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
			
			let dataElements = data.split('\n');
			
			// Remove last element if it is null
			if (dataElements.length > 0) {
				if (dataElements[dataElements.length - 1] == '') {
					dataElements.pop();
				}
			}
			
			dataElements.forEach((d : string) => {
				streamBuffer.push(d);
				io.sockets.emit('log', d);	
			});
			
		}, () => {
			streamBuffer.push('Connection Ended');
			io.sockets.emit('log', 'Connection Ended');
		});
		
		callback(httpServer);
	});
}