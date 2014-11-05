'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('StoreCtrl', function ($scope, Store) {
        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [
                {
                    field: 'store_name',
                    cellTemplate: '<div class="ui-grid-cell-contents" grid-multi-lang-field="{{row.entity.store_name}}"></div>'
                },

                {
                    field: 'tel'
                },
                {
                    field: 'seat_count'
                },
                {
                    field: 'Action',
                    cellTemplate: '<a class="btn btn-success" ng-href="#/store/edit/{{row.entity._id}}"> Edit</a>',
                    enableFiltering: false,
                    enableSorting: false
                }
            ]
        };

        $scope.entries = Store.query(function (data) {
            $scope.gridOptions.data = data;
        });
    });
