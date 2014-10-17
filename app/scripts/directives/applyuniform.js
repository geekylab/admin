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
            link: function (scope, element, attr) {
                element.uniform();
            }
        };
    });
