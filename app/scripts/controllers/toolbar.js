'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ToolbarCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ToolbarCtrl', function ($scope, socket, alertService, $rootScope, $http) {

        $scope.me = {};
        $http.get('/api/me').success(function (data, status, headers, config) {
            $scope.me = data;
        }).error(function (data, status, headers, config) {
        });

        $scope.connected = socket.socket.connected;

        $rootScope.closeAlert = alertService.closeAlert;
        //$scope.$watch('connected', function (newVal, oldVal) {
        //
        //});

        socket.on('connect', function () {
            $scope.connected = socket.socket.connected;
        });

        socket.on('disconnect', function () {
            $scope.connected = socket.socket.connected;
        });

        $scope.isConn = function () {
            return {
                'conn': $scope.connected
            };
        };


    });
