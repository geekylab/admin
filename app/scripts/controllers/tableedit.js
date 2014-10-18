'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TableeditCtrl
 * @description
 * # TableeditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('TableeditCtrl', function ($scope, Tables, $translate, alertService, $routeParams, $location) {

        $scope.table_status = {
            0: $translate.instant('vacated'),
            1: $translate.instant('busy')
        };

        if ($routeParams.id != -1) {
            $scope.myPromise = $scope.table = Tables.get({id: $routeParams.id});
        } else {
            $scope.table = new Tables();
        }


        $scope.save = function (continueFlg) {
            function success(response) {
                alertService.add('success', '保存した');
                console.log("success", response);
                if (!continueFlg) {
                    $location.path("/table");
                } else {
                    $location.path("/table/edit/" + $scope.table._id);
                }
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

            if ($scope.table._id) {
                $scope.myPromise = $scope.table.$update(success, failure);
            } else {
                $scope.myPromise = $scope.table.$save(success, failure);
            }
        };

        $scope.delete = function () {
            function success(response) {
                alertService.add('success', '削除されました。');
                $location.path("/category");
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

            if ($scope.table._id) {
                if (window.confirm($translate.instant('Remove?')))
                    $scope.myPromise = $scope.table.$delete(success, failure);
            }
        };

    });
