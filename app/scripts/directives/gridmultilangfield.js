'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:gridMultiLangField
 * @description
 * # gridMuiltLangField
 */
angular.module('clientApp')
    .directive('gridMultiLangField', function ($compile) {
        return {
            template: '<div class="ui-grid-cell-contents"></div>',
            restrict: 'A',
            replace: true,
            link: function postLink(scope, element, attrs) {

                var langImages = '';
                angular.forEach(scope.$eval(attrs.gridMultiLangField), function (value, key) {
                    if (key == 'us') {
                        element.text(value);
                    }

                    langImages += '<img style="margin-left:4px" src="/app/images/flags/' + key + '.png" alt="" title="' + value + '" />';
                });
                element.append(langImages);
            }
        };
    });
