'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'questionControllers',
  'questionServices'
]).
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/questions', {
        templateUrl: 'questionsList/questions-list.html',
        controller: 'QuestionListCtrl'
      }).
      when('/questions/add', {
        templateUrl: 'questions/questions-form.html',
        controller: 'QuestionFormCtrl'
      }).
      when('/question/:id', {
        templateUrl: 'questions/questions-form.html',
        controller: 'QuestionFormCtrl'
      }).
      otherwise({
        redirectTo: '/questions'
      });
  }]);
