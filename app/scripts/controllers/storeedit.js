'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StoreeditCtrl
 * @description
 * # StoreeditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('StoreeditCtrl', function ($scope, $routeParams, Store, constAllCountries, alertService, $location) {

        $scope.locationSearching = false;
        $scope.addressBase = {
            countries: constAllCountries,
            states: {
                'SP': 'SP'
            },
            cities: {
                'Santos': 'Santos'
            }
        };
        $scope.supportLang = {
            selected: {},
            languages: [
                {name: 'English', code: 'en'},
                {name: 'Japanese', code: 'ja'},
                {name: 'Portuguese', code: 'pt'}
            ]
        };
        $scope.supportLang.selected = $scope.supportLang.languages[0];

        if ($routeParams.id != -1) {
            $scope.myPromise = $scope.store = Store.get(
                {
                    id: $routeParams.id
                }
            );
        } else {
            $scope.store = new Store();
        }

        $scope.changeLang = function (lang) {
            $scope.myPromise = $scope.store = Store.get(
                {
                    id: $routeParams.id,
                    lang: lang
                }
            );
        };

        $scope.save = function (continueFlg) {
            function success(response) {
                alertService.add('success', '保存した');
                if (!continueFlg) {
                    $location.path("/store");
                } else {
                    $location.path("/store/edit/" + $scope.store._id);
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

            if ($scope.store._id) {
//                $scope.myPromise = Items.update($scope.category, success, failure);
                $scope.myPromise = $scope.store.$update(success, failure);
            } else {
                $scope.myPromise = $scope.store.$save(success, failure);//Items.save($scope.category, success, failure);
            }
        };

        $scope.getLocation = function () {
            if (navigator.geolocation) {
                $scope.locationSearching = true;
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.debug('getCurrentPosition');
                    if ($scope.store.location == undefined) {
                        $scope.store.location = [];
                    }
                    $scope.store.location[0] = position.coords.latitude;
                    $scope.store.location[1] = position.coords.longitude;
                    $scope.$apply($scope.locationSearching = false);

                });
            } else {
                alert('not support');
            }
        }


    });
