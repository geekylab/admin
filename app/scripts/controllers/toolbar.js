'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ToolbarCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ToolbarCtrl', function ($scope, socket) {
        $scope.connected = socket.socket.connected;


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
