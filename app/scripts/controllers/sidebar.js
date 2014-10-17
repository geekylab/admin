'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('SideBarCtrl', function ($scope, $location) {
        $scope.menus = [
            {
                name: "Dashboard",
                href: "/",
                icon: "icon-home"
            },
            {
                name: "Order",
                href: "/order",
                icon: "icon-basket"
            },
            {
                name: "Category",
                href: "/category",
                icon: "icon-docs"
            },
            {
                name: "Item",
                href: "/item",
                icon: "icon-cup"
            }
        ];


        $scope.getClass = function (path) {
            var current = $location.path();
            if (current === path) {
                return "active";
            } else {
                return "";
            }
        };

        $scope.isSelected = function (path) {
            var current = $location.path();
            if (current === path) {
                return true;
            } else {
                return false;
            }
        };


    });
