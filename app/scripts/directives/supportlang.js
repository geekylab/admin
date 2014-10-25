'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:supportLang
 * @description
 * # supportLang
 */
angular.module('clientApp')
    .controller('SupportLangController', ['$scope', '$translate', function SupportLangController($scope, $translate) {
        $scope.supportLang = {
            selected: {},
            languages: [
                {name: $translate.instant('English'), code: 'us'},
                {name: $translate.instant('Japanese'), code: 'jp'},
                {name: $translate.instant('Portuguese'), code: 'br'}
            ]
        };
        $scope.supportLang.selected = $scope.supportLang.languages[0];
    }]).directive('supportLang', function ($compile) {
        return {
            template: '<div></div>',
            restrict: 'E',
            controller: 'SupportLangController',
            link: function postLink(scope, element, attrs) {
                var html = "";
                html += '<select ng-model="supportLang.selected" ng-options="lang.name for lang in supportLang.languages" class="form-control margin-top-10"></select>';
                element.html(html);
                $compile(element.contents())(scope);
            }
        };
    });
