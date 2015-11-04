/// <references path="../typings/tsd.d.ts" />

describe('logApp', () => {
	
	beforeEach(() => module('logApp'));
	
	var logController;
	var scope;
	var logService;
	
	beforeEach(inject(($rootScope, $controller, $injector) => {
		scope = $rootScope.$new();
		
		scope.isTest = true;
		scope.socket = {
			on: (event: string, data: string) => {},
			emit: (event: string, data: string) => {
				scope.socket.on(event, data);
			}
		};
		
		logController = $controller('logController', {
			$scope: scope
		});
		
		logService = $injector.get('logService');
	}));
	
	it('should initialize logs to empty', () => {
		expect(scope).not.toBeNull();
		expect(scope.logs).toEqual([]);
	});
	
	it('should update when the socket sends a message', () => {
		var test = [];
		
		spyOn(scope.socket, 'on');
		logService.bind(scope, 'test');
		scope.socket.emit('log', 'test');
		
		expect(scope.socket.on).toHaveBeenCalledWith('log', 'test');
	});
});