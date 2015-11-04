/// <references path="../typings/tsd.d.ts" />
describe('logApp', function () {
    beforeEach(function () { return angular.module('logApp'); });
    var logController;
    var scope;
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        logController = $controller('logController', {
            $scope: scope
        });
    }));
    it('should add two numbers', function () {
        console.log(scope);
        expect(scope.name).toEqual('test');
    });
});
//# sourceMappingURL=logAppSpec.js.map