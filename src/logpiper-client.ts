/// <references path="../typings/tsd.d.ts" />
export function piper(callback: (data: string) => void) {
	var data = '';
	
	process.stdin.setEncoding('utf8');
	
	process.stdin.on('data', function(chunk) {
		data += chunk.toString().trim();
	});
	
	process.stdin.on('end', function() {
		callback(data);
	});
	
	process.stdin.resume();
};

// piper(function(data) {
// 	console.log('Here the data is ', data, 'done');
// });