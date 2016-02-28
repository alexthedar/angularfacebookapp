'use strict';

// Declare app level module which depends on views, and components
angular.module('AngFBApp', [
  'ngRoute',
  'AngFBApp.view1',
  'AngFBApp.view2',
  'AngFBApp.facebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);
