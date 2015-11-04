/// <references path="../typings/tsd.d.ts" />
var app = angular.module('logApp', []);
app.controller('logController', function ($scope, logService) {
    if (!$scope.isTest) {
        $scope.socket = io.connect();
    }
    $scope.logs = [];
    logService.bind($scope, 'logs');
});
app.service('logService', function () {
    this.bind = function (scope, element) {
        scope.socket.on('log', function (data) {
            scope.$apply(function () { return scope[element].push({
                row: data
            }); });
        });
    };
});
//# sourceMappingURL=main.js.map