/// <references path="../typings/tsd.d.ts" />
function piper(callback) {
    var data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (chunk) {
        data += chunk.toString().trim();
    });
    process.stdin.on('end', function () {
        callback(data);
    });
    process.stdin.resume();
}
exports.piper = piper;
;
// piper(function(data) {
// 	console.log('Here the data is ', data, 'done');
// }); 
//# sourceMappingURL=logpiper-client.js.map