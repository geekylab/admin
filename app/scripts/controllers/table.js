'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('TableCtrl', function ($scope, Tables) {
        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [
                {field: 'table_number'},
                {
                    field: 'table_status',
                    cellTemplate: '<div class="ui-grid-cell-contents" table-status="{{row.entity.table_status}}"></div>'
                },
                {
                    field: 'limited_number'
                },
                {
                    field: 'Action',
                    cellTemplate: '<a class="btn btn-success" ng-href="#/table/edit/{{row.entity._id}}"> Edit</a>',
                    enableFiltering: false,
                    enableSorting: false
                }
            ]
        };

        $scope.entries = Tables.query(function (data) {
            $scope.gridOptions.data = data;
        });
    });
