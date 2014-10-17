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

        if ($routeParams.id != -1) {
            $scope.item = Items.get({id: $routeParams.id});
        } else {
            $scope.item = new Items();
        }


        $scope.save = function (continueFlg) {
            function success(response) {
                alertService.add('success', '保存した');
                console.log("success", response);
                if (!continueFlg)
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

            if ($scope.item._id) {
                Items.update($scope.item, success, failure);
            } else {
                Items.save($scope.item, success, failure);
            }
        };

        $scope.delete = function () {

            function success(response) {
                alertService.add('success', '削除されました。');
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

            if ($scope.item._id) {
                Items.delete({id: $scope.item._id}, success, failure);
            }
        };

    });
