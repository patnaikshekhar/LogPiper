/// <references path="../typings/tsd.d.ts" />
function stream(dataCallback, endCallback) {
    var data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (chunk) { return dataCallback(chunk.toString()); });
    process.stdin.on('end', function () { return endCallback(); });
    process.stdin.resume();
}
exports.stream = stream;
;
//# sourceMappingURL=logpiper-client.js.map