/// <references path="../typings/tsd.d.ts" />

var app = angular.module('logApp', []);

interface logControllerScope extends angular.IScope {
	logs: string[];
	socket: any;
	isTest: boolean;
}

app.controller('logController', function($scope : logControllerScope, logService) {
	
	if (!$scope.isTest) {
		$scope.socket = io.connect();	
	}
	
	$scope.logs = [];
	logService.bind($scope , 'logs');
});

app.service('logService', function() {
	
	this.bind = (scope : logControllerScope, element : string) => {
		scope.socket.on('log', function(data : string) {
			scope.$apply(() => scope[element].push({
				row: data
			}));
		});
	}
});