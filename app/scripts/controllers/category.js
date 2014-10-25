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
                {
                    field: 'name',
                    cellTemplate: '<div class="ui-grid-cell-contents" grid-multi-lang-field="{{row.entity.name}}"></div>'
                },
                {
                    field: 'Action',
                    cellTemplate: '<a class="btn btn-success" ng-href="#/category/edit/{{row.entity._id}}"> Edit</a>',
                    enableFiltering: false,
                    enableSorting: false
                }
            ]
        };

        $scope.entries = Categories.query(function (data) {
            $scope.gridOptions.data = data;
        });
    });
