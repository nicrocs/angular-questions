'use strict';

/* Controllers */

var questionControllers = angular.module('questionControllers', []);

questionControllers.controller('QuestionListCtrl', ['$scope', '$location', 'Question',
  function($scope, $location, Question) {
    $scope.questions = Question.query();
    $scope.editQuestion = function(id) {
      $location.path('/question/' + id);
    };
    $scope.deleteQuestion = function(id) {
      console.log(id);
      $scope.question = Question.get({id: id}, function() {
        $scope.question.$delete();
      })
    }
  }]);

questionControllers.controller('QuestionFormCtrl', ['$scope', '$routeParams', '$location', 'Question',
  function($scope, $routeParams, $location, Question) {
    if ($routeParams.id) {
      $scope.question = Question.get({id: $routeParams.id});
      $scope.question.$promise.then(function(result) {
        $scope.question = result;
      })
    } else {
      $scope.question = {};
    }

    $scope.question.types = [
        "short_answer", "long_answer", "single_choice", "multiple_choice"
    ];

    $scope.addNewChoice = function() {
      if ($scope.question.type == "single_choice" || $scope.question.type == "multiple_choice") {
        if (!$scope.question.choices) {
          $scope.question.choices = [];
          var newItemNo = $scope.question.choices.length;
          $scope.question.choices.push({'id':newItemNo});
        } else {
          var newItemNo = $scope.question.choices.length;
          $scope.question.choices.push({'id':newItemNo});
        }
      } else {
        if ($scope.question.choices) {
          delete $scope.question.choices;
        }

      }

    };

    $scope.removeChoice = function(e) {
        var thisChoice = $scope.question.choices.indexOf(e);
        $scope.question.choices.splice(thisChoice);
    };
    $scope.update = function(question) {
      if ($routeParams.id) {
        Question.edit(question);
      } else {
        Question.save(question);
      }
      $location.path('/questions');
    };

    $scope.reset = function() {
      $scope.question = {};
    };

    $scope.reset();
  }
]);