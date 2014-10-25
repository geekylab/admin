'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ItemeditCtrl
 * @description
 * # ItemeditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ItemeditCtrl', function ($scope, Items, $location, $routeParams, alertService, FileUploader, $translate, Categories) {

        var uploader = $scope.uploader = new FileUploader(
            {url: '/api/upload'}
        );

        $scope.item = {};
        $scope.categories = Categories.query();
        $scope.item.images = [];
        $scope.myPromise = {};

        //uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
        //    console.info('onWhenAddingFileFailed', item, filter, options);
        //};
        //uploader.onAfterAddingFile = function (fileItem) {
        //    console.info('onAfterAddingFile', fileItem);
        //};
        //uploader.onAfterAddingAll = function (addedFileItems) {
        //    console.info('onAfterAddingAll', addedFileItems);
        //};
        //uploader.onBeforeUploadItem = function (item) {
        //    console.info('onBeforeUploadItem', item);
        //};
        //uploader.onProgressItem = function (fileItem, progress) {
        //    console.info('onProgressItem', fileItem, progress);
        //};
        //uploader.onProgressAll = function (progress) {
        //    console.info('onProgressAll', progress);
        //};
        //uploader.onSuccessItem = function (fileItem, response, status, headers) {
        //    console.info('onSuccessItem', fileItem, response, status, headers);
        //};
        //uploader.onErrorItem = function (fileItem, response, status, headers) {
        //    console.info('onErrorItem', fileItem, response, status, headers);
        //};
        //uploader.onCancelItem = function (fileItem, response, status, headers) {
        //    console.info('onCancelItem', fileItem, response, status, headers);
        //};
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            var filename = {};
            filename[$scope.supportLang.selected.code] = response.filename;
            $scope.item.images.push({
                path: response.path,
                filename: filename,
            });
            fileItem.remove();
        };
        //uploader.onCompleteAll = function () {
        //    console.info('onCompleteAll');
        //};


        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        if ($routeParams.id != -1) {
            $scope.myPromise = $scope.item = Items.get({id: $routeParams.id});
        } else {
            $scope.item = new Items();
            $scope.item.images = [];
        }

        if ($scope.item.images === undefined)
            $scope.item.images = [];


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
//                $scope.myPromise = Items.update($scope.item, success, failure);
                $scope.myPromise = $scope.item.$update(success, failure);
            } else {
                $scope.myPromise = $scope.item.$save(success, failure);//Items.save($scope.item, success, failure);
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

    });
