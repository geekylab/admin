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
                                          Store,
                                          $modal,
                                          $log) {

        var uploader = $scope.uploader = new FileUploader(
            {url: '/api/upload'}
        );

        $scope.item = {};
        $scope.categories = Categories.query();
        $scope.stores = Store.query();
        $scope.myPromise = {};

        //ingredient table
        $scope.ingredientGridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [
                {
                    field: 'text',
                    cellTemplate: '<div class="ui-grid-cell-contents" grid-multi-lang-field="{{row.entity.text}}"></div>'
                }
            ]
        };

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            if ($scope.item.images == undefined)
                $scope.item.images = [];

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

                if ($scope.item.ingredients === undefined)
                    $scope.item.ingredients = [];

                console.log($scope.item.ingredients);

                $scope.ingredientGridOptions.data = $scope.item.ingredients;
            });
        } else {
            $scope.item = new Items();
            $scope.item.images = [];
            $scope.item.ingredients = [];
            $scope.item.stores = [];
            $scope.ingredientGridOptions.data = $scope.item.ingredients;
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

        $scope.categoryToggleCheck = function (itemId, categoryId) {
            if ($scope.item.categories == undefined) {
                $scope.item.categories = [];
            }

            var idx = $scope.item.categories.indexOf(categoryId);
            if (angular.equals(idx, -1)) {
                $scope.item.categories.push(categoryId);
            }
            else {
                $scope.item.categories.splice(idx, 1);
            }
        };

        $scope.storeToggleCheck = function (itemId, storeId) {
            if ($scope.item.stores == undefined) {
                $scope.item.stores = [];
            }

            var idx = $scope.item.stores.indexOf(storeId);
            if (angular.equals(idx, -1)) {
                $scope.item.stores.push(storeId);
            }
            else {
                $scope.item.stores.splice(idx, 1);
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
                    },
                    defaultIngredients: function () {
                        return $scope.item.ingredients;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                angular.copy(selectedItem, $scope.item.ingredients);
                $scope.ingredientGridOptions.data = $scope.item.ingredients;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        }

    }).controller('ModalIngredientsCtrl', function ($scope,
                                                    $modalInstance,
                                                    defaultLang,
                                                    defaultIngredients,
                                                    $http,
                                                    $log,
                                                    Ingredients,
                                                    alertService) {
        $scope.not_found = false;
        $scope.newingredient = new Ingredients();
        $scope.create_new_flg = false;
        $scope.defaultLang = defaultLang;
        $scope.query = '';
        $scope.ingredients = [];
        $scope.selected = {
            items: []
        };

        angular.copy(defaultIngredients, $scope.selected.items);

        $scope.search = function () {
            $scope.ingredients = Ingredients.query('/api/ingredients', {
                lang: defaultLang,
                name: $scope.query
            }, function (json) {
                console.debug(json);
                $scope.ingredients = json;
                $scope.not_found = $scope.ingredients.length == 0;
                $scope.create_new_flg = false;
            });
        };

        $scope.selectIngredient = function (ingredient) {
            var idx = -1;
            angular.forEach($scope.selected.items, function (item, i) {
                if (item._id == ingredient._id) {
                    idx = i;
                }
            });

            if (angular.equals(idx, -1)) {
                $scope.selected.items.push(ingredient);
            } else {
                $scope.selected.items.splice(idx, 1);
            }
        };

        $scope.hasIngredientInArray = function (ingredient) {
            var idx = -1;
            angular.forEach($scope.selected.items, function (item, i) {
                if (item._id == ingredient._id) {
                    idx = i;
                }
            });

            return (idx > -1);
        };

        $scope.editIngredient = function (ingredient) {
            $scope.create_new_flg = true;
            angular.copy(ingredient, $scope.newingredient);
        };

        $scope.createNewIngredient = function () {
            $scope.create_new_flg = true;
            $scope.newingredient.text = {};
            $scope.newingredient.text[$scope.supportLang.selected.code] = $scope.query;
        };

        $scope.saveIngredient = function () {
            var updateFlg = false;

            function success(response) {
                alertService.add('success', '保存した');
                $scope.create_new_flg = false;
                if (!updateFlg)
                    $scope.selectIngredient(response);

                $scope.searchCurrent(response);
            }

            function failure(response) {
                alert('error');
                console.log(response);
            }

            if ($scope.newingredient._id) {
                updateFlg = true;
                $scope.myLoadingPromise = $scope.newingredient.$update(success, failure);
            } else {
                $scope.myLoadingPromise = $scope.newingredient.$save(success, failure);
            }
        };

        $scope.searchCurrent = function (ingredient) {
            $scope.query = ingredient.text[defaultLang];
            $scope.search();
        };


        $scope.ok = function () {
            $modalInstance.close($scope.selected.items);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });