'use strict';

// Declare app level module which depends on views, and components
angular.module('AngFBApp', [
  'ngRoute',
  'AngFBApp.facebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);
