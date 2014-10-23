'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:jtimepicker
 * @description
 * # jtimepicker
 */
angular.module('clientApp')
    .directive('jtimepicker', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                element.timepicker({
                    minuteStep: 5,
                    showInputs: false,
                    disableFocus: true,
                    showMeridian: false
                });
            }
        };
    });
