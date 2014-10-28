'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ItemeditCtrl
 * @description
 * # ItemeditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ItemeditCtrl', function ($scope,
                                          Items,
                                          $location,
                                          $routeParams,
                                          alertService,
                                          FileUploader,
                                          $translate,
                                          Categories,
                                          $modal,
                                          $log) {

        var uploader = $scope.uploader = new FileUploader(
            {url: '/api/upload'}
        );

        $scope.item = {};
        $scope.categories = Categories.query();
        $scope.item.images = [];
        $scope.myPromise = {};

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            var filename = {};
            filename[$scope.supportLang.selected.code] = response.filename;
            $scope.item.images.push({
                path: response.path,
                filename: filename
            });
            fileItem.remove();
        };

        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        if ($routeParams.id != -1) {
            $scope.myPromise = $scope.item = Items.get({id: $routeParams.id}, function (item) {
                if ($scope.item.images === undefined)
                    $scope.item.images = [];

            });
        } else {
            $scope.item = new Items();
            $scope.item.images = [];
        }

        $scope.save = function (continueFlg) {
            function success(response) {
                alertService.add('success', '保存した');
                console.log("success", response);
                if (!continueFlg) {
                    $location.path("/item");
                } else {
                    $location.path("/item/" + $scope.item._id);
                }
            }

            function failure(response) {
                alert('error');
                console.log(response);
            }

            if ($scope.item._id) {
                $scope.myPromise = $scope.item.$update(success, failure);
            } else {
                $scope.myPromise = $scope.item.$save(success, failure);
            }
        };

        $scope.delete = function () {
            function success(response) {
                alertService.add('success', '削除されました。');
                $location.path("/item");
            }

            function failure(response) {
                alert('error');
                console.log(response);
            }

            if ($scope.item._id) {
                if (window.confirm($translate.instant('Remove?')))
                    $scope.myPromise = $scope.item.$delete(success, failure);
            }
        };

        $scope.removeImage = function (index) {
            if (window.confirm($translate.instant('Remove?'))) {
                $scope.item.images.splice(index, 1);
            }
        };

        $scope.toggleCheck = function (itemId, categoryId) {
            if ($scope.item.categories != undefined) {
                var idx = $scope.item.categories.indexOf(categoryId);
                if (angular.equals(idx, -1)) {
                    $scope.item.categories.push(categoryId);
                }
                else {
                    $scope.item.categories.splice(idx, 1);
                }
            }
        };

        $scope.addIngredient = function () {
            var modalInstance = $modal.open({
                templateUrl: 'myModalWindow.html',
                controller: 'ModalIngredientsCtrl',
                size: 'lg',
                resolve: {
                    defaultLang: function () {
                        return $scope.supportLang.selected.code;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        }

    }).controller('ModalIngredientsCtrl', function ($scope,
                                                    $modalInstance,
                                                    defaultLang,
                                                    $http,
                                                    $log) {
        $scope.not_found = false;
        $scope.newingredient = {};
        $scope.create_new_flg = false;
        $scope.defaultLang = defaultLang;
        $scope.query = '';
        $scope.ingredients = [];
        $scope.selected = {
            items: []
        };

        $scope.search = function (q) {
            $scope.myLoadingPromise = $http.post('/api/ingredients', {lang: defaultLang, name: $scope.query})
                .success(function (json) {
                    console.debug(json);
                    $scope.ingredients = json;
                    $scope.not_found = $scope.ingredients.length == 0;
                    $scope.create_new_flg = false;

                }).error(function () {
                    alert('error');
                });
        };

        $scope.selectIngredient = function (ingredient) {
            var idx = $scope.selected.items.indexOf(ingredient);
            if (angular.equals(idx, -1)) {
                $scope.selected.items.push(ingredient);
            } else {
                $scope.selected.items.splice(idx, 1);
            }
        };

        $scope.hasIngredientInArray = function (ingredient) {
            return ($scope.selected.items.indexOf(ingredient) > -1);
        };

        $scope.createNewIngredient = function () {
            $scope.create_new_flg = true;
            $scope.newingredient.text = {};
            $scope.newingredient.text[$scope.supportLang.selected.code] = $scope.query;
        };


        $scope.ok = function () {
            $modalInstance.close($scope.selected.items);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });