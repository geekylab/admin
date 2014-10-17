'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CategoryeditCtrl
 * @description
 * # CategoryeditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('CategoryeditCtrl', function ($scope, Categories, $routeParams) {
        if ($routeParams.id != -1) {
            $scope.myPromise = $scope.category = Categories.get({id: $routeParams.id});
        } else {
            $scope.category = new Categories();
        }
    });
