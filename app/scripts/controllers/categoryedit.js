'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CategoryeditCtrl
 * @description
 * # CategoryeditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('CategoryeditCtrl', function ($scope, Categories, $routeParams, alertService, $location, $translate) {
        $scope.category = {};
        if ($routeParams.id != -1) {
            $scope.myPromise = $scope.category = Categories.get({id: $routeParams.id});
        } else {
            $scope.category = new Categories();
        }


        $scope.save = function (continueFlg) {
            function success(response) {
                alertService.add('success', '保存した');
                if (!continueFlg) {
                    $location.path("/category");
                } else {
                    $location.path("/category/edit/" + $scope.category._id);
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

            if ($scope.category._id) {
//                $scope.myPromise = Items.update($scope.category, success, failure);
                $scope.myPromise = $scope.category.$update(success, failure);
            } else {
                $scope.myPromise = $scope.category.$save(success, failure);//Items.save($scope.category, success, failure);
            }
        };

        $scope.delete = function () {
            function success(response) {
                alertService.add('success', '削除されました。');
                $location.path("/category");
            }

            function failure(response) {
                alert('error');
                console.log(response);
            }

            if ($scope.category._id) {
                if (window.confirm($translate.instant('Remove?')))
                    $scope.myPromise = $scope.category.$delete(success, failure);
            }
        };

    });
