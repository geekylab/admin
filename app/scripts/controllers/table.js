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
                {field: '_id'},
                {field: 'table_number'},
                {
                    field: 'created',
                    enableSorting: false
                },
                {
                    field: 'table_status'
                },
                {
                    field: 'limited_number'
                },
                {
                    field: 'Action',
                    cellTemplate: '<a class="btn btn-success" ng-href="/#/table/edit/{{row.entity._id}}"> Edit</a>',
                    enableFiltering: false,
                    enableSorting: false
                }
            ]
        };

        $scope.entries = Tables.query(function (data) {
            $scope.gridOptions.data = data;
        });
    });
