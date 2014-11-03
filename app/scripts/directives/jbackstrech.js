'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:jbackstretch
 * @description
 * # jtimepicker
 */
angular.module('clientApp')
    .directive('jbackstretch', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var data = scope.$eval(attr.backgroundUrl);
                var backgroundOption = {};
                if (attr.backgroundOption != undefined)
                    var backgroundOption = scope.$eval(attr.backgroundOption);
                element.backstretch(data, backgroundOption);
            }
        }
    });