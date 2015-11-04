import express = require('express');
import http = require('http');
import io = require('socket.io');

var app : express.Express = express();
var ioApp : SocketIO.Server;

export function run(port : number, callback : (server: http.Server, io: SocketIO.Server) => void) : void {	
	
	app.use(express.static('./src/public'))
	
	let server = app.listen(port, () => {
		console.log('Listening on', port);
		ioApp = io(server);
		callback(server, ioApp);
	});
}