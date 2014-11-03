'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:jbackstretch
 * @description
 * # jtimepicker
 */
angular.module('clientApp')
    .directive('ngMatch', function ($parse) {

        var link = function (scope, element, attrs, ctrl) {
            // if ngModel is not defined, we don't need to do anything
            if (!ctrl) return;
            if (!attrs.ngMatch) return;

            var firstPassword = $parse(attrs.ngMatch);

            var validator = function (value) {
                var temp = firstPassword(scope),
                    v = value === temp;
                ctrl.$setValidity('match', v);
                return value;
            };

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);
            attrs.$observe('ngMatch', function () {
                validator(ctrl.$viewValue);
            });

        };

        return {
            require: '?ngModel',
            link: link
        };
    });