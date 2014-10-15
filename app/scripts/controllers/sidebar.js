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
                href: "admin.main",
                icon: "icon-home"
            },
            {
                name: "Order",
                href: "admin.order",
                icon: "icon-basket",
                children: [
                    {
                        name: "Dashboard",
                        href: "/",
                        icon: "icon-home"
                    }
                ]
            },
            {
                name: "Kitchen",
                href: "kitchen",
                icon: "icon-basket",
                children: [
                    {
                        name: "Dashboard",
                        href: "/",
                        icon: "icon-home"
                    }
                ]
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
