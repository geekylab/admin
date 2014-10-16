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
        $http.get('/api/dashboard/index').then(function (data) {
            console.log(data.data.response);
            if (data.data.success) {
                console.log(data.data.response);
                $scope.datas = data.data.response;
            }
        });
    });
