'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.datas = {};
        $http.get('/api/dashboard/index').then(function (json) {
            if (json.data) {
                $scope.datas = json.data;
            }
        });
    });
