/// <references path="../typings/tsd.d.ts" />
var logpiperClient = require('../src/logpiper-client');
var logpiperServer = require('../src/logpiper-server');
var logpiper = require('../src/logpiper');
var request = require('request');
var io = require('socket.io-client');
var stdin;
var PORT = process.env.PORT || 8000;
var URL = 'http://localhost:' + PORT + '/';
var SOCKET_OPTIONS = {
    transports: ['websocket'],
    'force new connection': true
};
jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
describe('logpiper-client', function () {
    beforeEach(function () {
        stdin = require('mock-stdin').stdin();
    });
    it('should call the callback when input is passed via pipe', function (done) {
        process.nextTick(function () {
            stdin.send('Some text');
            stdin.end();
        });
        logpiperClient.stream(function (data) {
            expect(data).toBe('Some text');
        }, function () {
            expect(null).toBeNull;
            done();
        });
    });
    it('should call the callback mutiple times when the callback is called', function (done) {
        process.nextTick(function () {
            stdin.send('Some text');
            stdin.send('Some text2');
            stdin.end();
        });
        var dummy = {
            test: function (data) { }
        };
        spyOn(dummy, 'test');
        logpiperClient.stream(function (data) { return dummy.test(data); }, function () {
            expect(dummy.test).toHaveBeenCalledWith('Some text');
            expect(dummy.test).toHaveBeenCalledWith('Some text2');
            done();
        });
    });
});
describe('logpiper-server', function () {
    it('should start when run', function (done) {
        logpiperServer.run(PORT, function (server) {
            request
                .get(URL + 'index.html')
                .on('response', function (response) {
                expect(response.statusCode).toBe(200);
                server.close();
                done();
            })
                .on('error', function (err) {
                expect(err).toBe(null);
                done();
            });
        });
    });
    it('should return a socket when running', function (done) {
        logpiperServer.run(PORT, function (server, io) {
            expect(io).toBeDefined();
            done();
            server.close();
        });
    });
});
describe('logpiper', function () {
    beforeEach(function () {
        stdin = require('mock-stdin').stdin();
    });
    it('should stream data to the server when the client is started', function (done) {
        logpiper.logpiper(PORT, function (server) {
            // Create client and connect
            var client = io.connect(URL, SOCKET_OPTIONS);
            client.on('connect', function () {
                // When connected send data
                process.nextTick(function () {
                    stdin.send('Some text');
                    stdin.send('Some text2');
                    stdin.end();
                    setTimeout(function () {
                        server.close();
                        expect(dummy.test).toHaveBeenCalledWith('Some text');
                        expect(dummy.test).toHaveBeenCalledWith('Some text2');
                        done();
                    }, 1000);
                });
                var dummy = {
                    test: function (data) { }
                };
                spyOn(dummy, 'test');
                client.on('log', dummy.test);
            });
        });
    });
    it('should buffer data and send it to the client when online', function (done) {
        logpiper.logpiper(PORT, function (server) {
            var dummy = {
                test: function (data) { }
            };
            stdin.send('Some text');
            stdin.send('Some text2');
            stdin.end();
            setTimeout(function () {
                server.close();
                expect(dummy.test).toHaveBeenCalledWith('Some text');
                expect(dummy.test).toHaveBeenCalledWith('Some text2');
                done();
            }, 1000);
            spyOn(dummy, 'test');
            var client = io.connect(URL, SOCKET_OPTIONS);
            client.on('log', dummy.test);
        });
    });
    it('should split multiline data elements', function (done) {
        logpiper.logpiper(PORT, function (server) {
            var dummy = {
                test: function (data) { }
            };
            stdin.send('Some text\nSome text2');
            stdin.end();
            setTimeout(function () {
                server.close();
                expect(dummy.test).toHaveBeenCalledWith('Some text');
                expect(dummy.test).toHaveBeenCalledWith('Some text2');
                done();
            }, 1000);
            spyOn(dummy, 'test');
            var client = io.connect(URL, SOCKET_OPTIONS);
            client.on('log', dummy.test);
        });
    });
    it('should not send the last element in a mutiline split if it is null', function (done) {
        logpiper.logpiper(PORT, function (server) {
            var dummy = {
                test: function (data) { }
            };
            stdin.send('Some text\nSome text2\n');
            stdin.end();
            setTimeout(function () {
                server.close();
                expect(dummy.test).toHaveBeenCalledWith('Some text');
                expect(dummy.test).toHaveBeenCalledWith('Some text2');
                expect(dummy.test).not.toHaveBeenCalledWith('');
                done();
            }, 1000);
            spyOn(dummy, 'test');
            var client = io.connect(URL, SOCKET_OPTIONS);
            client.on('log', dummy.test);
        });
    });
});
//# sourceMappingURL=logpiperSpec.js.map