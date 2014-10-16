'use strict';

describe('Controller: HandyCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var HandyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HandyCtrl = $controller('HandyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
