'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:tableStatus
 * @description
 * # tableStatus
 */
angular.module('clientApp')
    .directive('tableStatus', function (constTableStatus, $translate) {
        return {
            restrict: '',
            link: function postLink(scope, element, attrs) {
                var nowStatus = attrs.tableStatus;
                if (nowStatus != undefined && constTableStatus[nowStatus] != undefined) {
                    console.info('now status 2', constTableStatus[nowStatus]);
                    element.text($translate.instant(constTableStatus[nowStatus]));
                }
            }
        };
    });
