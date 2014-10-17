'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CategoryCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
