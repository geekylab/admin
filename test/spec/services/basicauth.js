'use strict';

describe('Service: BasicAuth', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var BasicAuth;
  beforeEach(inject(function (_BasicAuth_) {
    BasicAuth = _BasicAuth_;
  }));

  it('should do something', function () {
    expect(!!BasicAuth).toBe(true);
  });

});
