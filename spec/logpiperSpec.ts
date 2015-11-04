/// <references path="../typings/tsd.d.ts" />

import logpiperClient = require('../src/logpiper-client');
import logpiperServer = require('../src/logpiper-server');
import logpiper = require('../src/logpiper');
import request = require('request');
import io = require('socket.io-client');

var stdin;
var PORT = process.env.PORT || 8000;
var URL = 'http://localhost:' + PORT + '/';
var SOCKET_OPTIONS ={
  transports: ['websocket'],
  'force new connection': true
};

jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

describe('logpiper-client', () => {
	
	beforeEach(() => {
		stdin = require('mock-stdin').stdin();
	});
	
	it('should call the callback when input is passed via pipe', (done) => {
		process.nextTick(() => {      		
			stdin.send('Some text');
			stdin.end();
    	});
		
		logpiperClient.stream((data) => {
			expect(data).toBe('Some text');
		}, () => {
			expect(null).toBeNull;
			done();
		});
	});
	
	it('should call the callback mutiple times when the callback is called', (done) => {
		process.nextTick(() => {      		
			stdin.send('Some text');
			stdin.send('Some text2');
			stdin.end();
    	});
		
		var dummy = {
			test: (data: string) => {}
		}	
		
		spyOn(dummy, 'test');
		
		logpiperClient.stream((data) => dummy.test(data),() => {
			expect(dummy.test).toHaveBeenCalledWith('Some text');
			expect(dummy.test).toHaveBeenCalledWith('Some text2');
			done();
		});
	});
	
});

describe('logpiper-server', function() {
	
	it('should start when run', (done) => {
		
		logpiperServer.run(PORT, (server) => {
			request
				.get(URL + 'index.html')
				.on('response', (response) => {
					expect(response.statusCode).toBe(200);
					server.close();
					done();
				})
				.on('error', (err) => {
					expect(err).toBe(null);
					done();
				});
		});
	});
	
	it('should return a socket when running', (done) => {
		logpiperServer.run(PORT, (server, io) => {
			expect(io).toBeDefined();
			done();
			server.close();
		});
	});
});

describe('logpiper', () => {

	beforeEach(() => {
		stdin = require('mock-stdin').stdin();
	});
	
	it('should stream data to the server when the client is started', (done) => {
		logpiper.logpiper(PORT, (server) => {
				
			// Create client and connect
			var client = io.connect(URL, SOCKET_OPTIONS);
			
			client.on('connect', () => {
				// When connected send data
				process.nextTick(() => {
					stdin.send('Some text');
					stdin.send('Some text2');
					stdin.end();
					setTimeout(() => {
						server.close();
						expect(dummy.test).toHaveBeenCalledWith('Some text');
						expect(dummy.test).toHaveBeenCalledWith('Some text2');
						done();	
					}, 1000);
    			});
				
				var dummy = {
					test: (data: string) => {}
				};
				
				spyOn(dummy, 'test');
				
				client.on('log', dummy.test);
			});
		});
	});
	
	it('should buffer data and send it to the client when online', (done) => {
		logpiper.logpiper(PORT, (server) => {
			
			stdin.send('Some text');
			stdin.send('Some text2');
			stdin.end();
			setTimeout(() => {
				server.close();
				expect(dummy.test).toHaveBeenCalledWith('Some text');
				expect(dummy.test).toHaveBeenCalledWith('Some text2');
				done();	
			}, 1000);
			
			var dummy = {
				test: (data: string) => {}
			};
			
			spyOn(dummy, 'test');
			
			var client = io.connect(URL, SOCKET_OPTIONS);
			client.on('log', dummy.test);
		});
	});
	
	it('should split multiline data elements', (done) => {
		logpiper.logpiper(PORT, (server) => {
			
			stdin.send('Some text\nSome text2');
			stdin.end();
			setTimeout(() => {
				server.close();
				expect(dummy.test).toHaveBeenCalledWith('Some text');
				expect(dummy.test).toHaveBeenCalledWith('Some text2');
				done();	
			}, 1000);
			
			var dummy = {
				test: (data: string) => {}
			};
			
			spyOn(dummy, 'test');
			
			var client = io.connect(URL, SOCKET_OPTIONS);
			client.on('log', dummy.test);
		});
	});
});