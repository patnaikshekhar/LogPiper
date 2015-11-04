/// <references path="../typings/tsd.d.ts" />
describe('logApp', function () {
    beforeEach(function () { return module('logApp'); });
    var logController;
    var scope;
    var logService;
    beforeEach(inject(function ($rootScope, $controller, $injector) {
        scope = $rootScope.$new();
        scope.isTest = true;
        scope.socket = {
            on: function (event, data) { },
            emit: function (event, data) {
                scope.socket.on(event, data);
            }
        };
        logController = $controller('logController', {
            $scope: scope
        });
        logService = $injector.get('logService');
    }));
    it('should initialize logs to empty', function () {
        expect(scope).not.toBeNull();
        expect(scope.logs).toEqual([]);
    });
    it('should update when the socket sends a message', function () {
        var test = [];
        spyOn(scope.socket, 'on');
        logService.bind(scope, 'test');
        scope.socket.emit('log', 'test');
        expect(scope.socket.on).toHaveBeenCalledWith('log', 'test');
    });
});
//# sourceMappingURL=logAppSpec.js.map