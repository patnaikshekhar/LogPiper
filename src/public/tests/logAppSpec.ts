/// <references path="../typings/tsd.d.ts" />

describe('logApp', () => {
	beforeEach(() => angular.module('logApp'));
	
	var logController;
	var scope;
	
	beforeEach(inject(($rootScope, $controller) => {
		scope = $rootScope.$new();
		logController = $controller('logController', {
			$scope: scope
		});
	}));
	
	it('should add two numbers', () => {
		console.log(scope);
		expect(scope.name).toEqual('test');
	});
});