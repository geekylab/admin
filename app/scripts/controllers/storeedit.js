'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StoreeditCtrl
 * @description
 * # StoreeditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('StoreeditCtrl', function ($scope,
                                           $routeParams,
                                           Store,
                                           constAllCountries,
                                           alertService,
                                           $location,
                                           FileUploader,
                                           $translate,
                                           constFacility) {

        var uploader = $scope.uploader = new FileUploader(
            {url: '/api/upload'}
        );

        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
            }
        });

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            if ($scope.store.images == undefined)
                $scope.store.images = [];
            var desc = {};
            var filename = {};
            desc[$scope.supportLang.selected.code] = '';
            filename[$scope.supportLang.selected.code] = response.filename;
            $scope.store.images.push({
                path: response.path,
                filename: filename,
                desc: desc
            });
            fileItem.remove();
        };

        $scope.constFacility = constFacility;

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

        if ($routeParams.id != -1) {
            $scope.myPromise = $scope.store = Store.get(
                {id: $routeParams.id},
                function (data) {
                    $scope.tableGridOptions.data = $scope.store.tables;
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

                $scope.tableGridOptions.data = $scope.store.tables;
            }

            function failure(response) {
                alert('error');
                console.log(response);
            }

            if ($scope.store._id) {
                $scope.myPromise = $scope.store.$update(success, failure);
            } else {
                $scope.myPromise = $scope.store.$save(success, failure);
            }
        };

        $scope.delete = function () {
            function success(response) {
                alertService.add('success', '削除されました。');
                $location.path("/store");
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
                if (window.confirm($translate.instant('Remove?')))
                    $scope.myPromise = $scope.store.$delete(success, failure);
            }
        };

        $scope.getLocation = function () {
            if (navigator.geolocation) {
                $scope.locationSearching = true;
                navigator.geolocation.getCurrentPosition(function (position) {
                    if ($scope.store.location == undefined) {
                        $scope.store.location = [];
                    }
                    $scope.store.location[0] = position.coords.longitude;
                    $scope.store.location[1] = position.coords.latitude;
                    $scope.$apply($scope.locationSearching = false);

                });
            } else {
                alert('not support');
            }
        };


        $scope.checkCheckbox = function (option) {
            if ($scope.store.opts == undefined)
                return false;
            return $scope.store.opts.indexOf(option) > -1;
        };

        $scope.toggleCheck = function (store_id, option) {
            if ($scope.store.opts == undefined) {
                $scope.store.opts = [];
            }
            var idx = $scope.store.opts.indexOf(option);

            if (angular.equals(idx, -1)) {
                $scope.store.opts.push(option);
            }
            else {
                $scope.store.opts.splice(idx, 1);
            }
        };

        /**
         * Table grid
         */

        $scope.addRow = function () {
            $scope.store.tables.push({
                'table_number': 0,
                'limited_number': 4,
                'table_status': 0
            });
        };

        $scope.tableGridScope = {
            deleteRow: function (col, row, index) {
                if (window.confirm($translate.instant('Delete?'))) {
                    var idx = $scope.store.tables.indexOf(row.entity);
                    $scope.store.tables.splice(idx, 1);
                }
            }
        };

        $scope.tableGridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [
                {
                    field: 'table_number',
                    enableCellEdit: true
                },
                {
                    field: 'table_status',
                    name: 'table_status',
                    displayName: 'Table',
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    editDropdownValueLabel: 'status',
                    cellFilter: 'mapGender',
                    editDropdownOptionsArray: [
                        {id: 0, status: $translate.instant('vacated')},
                        {id: 1, status: $translate.instant('busy')}
                    ]
                },

                {
                    field: 'limited_number'
                },
                {
                    field: 'Action',
                    cellTemplate: '<button class="btn btn-xs red" type="button" ng-click="getExternalScopes().deleteRow(col,row,$index)"><i class="fa fa-times"></i> Delete</button>',
                    enableFiltering: false,
                    enableSorting: false,
                    enableCellEdit: false
                }
            ]
        };

    }).filter('mapGender', function ($translate) {
        var genderHash = {
            0: $translate.instant('vacated'),
            1: $translate.instant('busy')
        };
        return function (input) {
            if (input == undefined || input === '') {
                return '';
            } else {
                return genderHash[input];
            }
        }
    });
