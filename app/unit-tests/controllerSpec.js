'use strict';

describe('QuestionListCtrl', function() {
  var scope, ctrl;

  beforeEach(module('app'));

  it('should have a phone list controller', (inject(function($controller) {
    scope = {};
    ctrl = $controller('QuestionListCtrl', {$scope: scope});
    expect(ctrl).toBeDefined();
  })));

});