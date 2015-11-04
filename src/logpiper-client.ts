/// <references path="../typings/tsd.d.ts" />

export function stream(dataCallback: (data: string) => void, endCallback: () => void) {
	var data = '';
	
	process.stdin.setEncoding('utf8');
	
	process.stdin.on('data', (chunk) => dataCallback(chunk.toString()));
	
	process.stdin.on('end', () => endCallback());
	
	process.stdin.resume();
};