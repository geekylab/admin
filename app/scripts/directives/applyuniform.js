'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:applyUniform
 * @description
 * # applyUniform
 */
angular.module('clientApp')
    .directive('applyUniform', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                element.uniform();
            }
        };
    });
