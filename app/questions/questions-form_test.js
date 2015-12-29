'use strict';

describe('QuestionListCtrl', function() {

  beforeEach(module('app'));

    it('should retrieve questions from the json file', inject(function($controller) {
      //spec body
      var questionsListCtrl = $controller('QuestionsListCtrl');
      expect(questionsListCtrl).toBeDefined();
    }));

});