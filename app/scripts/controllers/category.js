'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('CategoryCtrl', function ($scope, Categories) {
        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [
                {field: '_id'},
                {field: 'name'},
                {
                    field: 'created',
                    enableSorting: false
                },
                {
                    field: 'Action',
                    cellTemplate: '<a class="btn btn-success" ng-href="/#/item/{{row.entity._id}}"> Edit</a>',
                    enableFiltering: false,
                    enableSorting: false
                }
            ]
        };

        $scope.entries = Categories.query(function (data) {
            $scope.gridOptions.data = data;
        });
    });
