/// <references path="../typings/tsd.d.ts" />

//var logpiper = require('../src/logpiper');
//var stdin = require('mock-stdin').stdin();

import logpiperClient = require('../src/logpiper-client');
import logpiperServer = require('../src/logpiper-server');
import request = require('request');

jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

describe("logpiper-client", function() {
	
	var stdin;
		
	beforeEach(function() {
		stdin = require('mock-stdin').stdin();
	});
	
	it("should be able to read piped input", function(done) {
		process.nextTick(function mockResponse() {      		
			stdin.send('Some text');
			stdin.end();
    	});
		
		logpiperClient.piper(function(data) {
			expect(data).toBe('Some text');
			done();
		});
	});
});

describe("logpiper-server", function() {
	
	var port = process.env.PORT || 8000;
	var url = 'http://localhost:' + port + '/';
	
	it('should start when run', function(done) {
		
		logpiperServer.run(port, function(server) {
			request
				.get(url)
				.on('response', function(response) {
					expect(response.statusCode).toBe(200);
					server.close();
					done();
				})
				.on('error', function(err) {
					expect(err).toBe(null);
					done();
				});
		});
	});
	
	it('should return a socket when running', function(done) {
		logpiperServer.run(port, function(server, sockets) {
			expect(sockets).toBeDefined();
			done();
			server.close();
		});
	});
});