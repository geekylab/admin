'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TableeditCtrl
 * @description
 * # TableeditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('TableeditCtrl', function ($scope, Tables, $translate) {

        $scope.table_status = {
            0: $translate.instant('vacated'),
            1: $translate.instant('busy')
        }
    });
