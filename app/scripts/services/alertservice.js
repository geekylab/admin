'use strict';

/**
 * @ngdoc service
 * @name clientApp.alertService
 * @description
 * # alertService
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('alertService', function ($rootScope, $timeout) {
        var alertService = {};

        // create an array of alerts available globally
        $rootScope.alerts = [];

        alertService.add = function (type, msg) {
            $rootScope.alerts.push({'type': type, 'msg': msg});

            $timeout(function () {
                $rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
            }, 5000);


        };

        alertService.closeAlert = function (index) {
            $rootScope.alerts.splice(index, 1);
        };

        return alertService;
    });
