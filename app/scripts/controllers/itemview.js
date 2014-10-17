'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ItemviewCtrl
 * @description
 * # ItemviewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ItemviewCtrl', function ($scope, Items, $location, $routeParams, alertService) {

        if ($routeParams.id) {
            $scope.item = Items.get({id: $routeParams.id});
        } else {
            $scope.item = new Items();
        }


        $scope.save = function () {
            function success(response) {
                alertService.add('success', '保存した');
                console.log("success", response);
                $location.path("/item");
            }

            function failure(response) {
                _.each(response.data, function (errors, key) {
                    if (errors.length > 0) {
                        _.each(errors, function (e) {
                            $scope.form[key].$dirty = true;
                            $scope.form[key].$setValidity(e, false);
                        });
                    }
                });
            }


            if ($routeParams.id) {
                Items.update($scope.item, success, failure);
            } else {
                Items.save($scope.item, success, failure);
            }
        }
    });
