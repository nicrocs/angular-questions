'use strict';

/* Services */

var questionServices = angular.module('questionServices', ['ngResource']);

questionServices.factory('Question', ['$resource',
    function($resource){
        return $resource('/api/questions/:id', {id: '@id'}, {
            delete: {
                method: 'DELETE', isArray: true
            },
            edit: {
                method: 'PUT'
            }
        });
    }]);
