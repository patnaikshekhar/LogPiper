/// <references path="../typings/tsd.d.ts" />

var app = angular.module('logApp', []);
app.controller('logController', ['$scope', function($scope : angular.IScope) {
	$scope.name = 'test';
}]);