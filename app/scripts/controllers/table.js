'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TableCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
