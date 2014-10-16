'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ItemCtrl', function ($scope, Items, uiGridConstants, i18nService) {

        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [
                {field: '_id'},
                {field: 'name'},
                {
                    field: 'price', filters: [
                    {
                        condition: uiGridConstants.filter.GREATER_THAN,
                        placeholder: 'greater than'
                    },
                    {
                        condition: uiGridConstants.filter.LESS_THAN,
                        placeholder: 'less than'
                    }
                ]
                },
                {
                    field: 'created',
                    enableSorting: false
                },
                {
                    field: 'Action',
                    cellTemplate: '<a class="btn btn-success" ng-href="/#/item/{{row.entity._id}}" >Edit</a>',
                    enableFiltering: false,
                    enableSorting: false
                }
            ]
        };

        $scope.entries = Items.query(function (data) {
            $scope.gridOptions.data = data;
        });

        $scope.myScope = {
            edit: function (row) {
                console.log(row);
            }
        };


        //$scope.entry = new Items(); //You can instantiate resource class
        //$scope.entry.name = 'some data';
        //$scope.entry.price = '1500';
        //Items.save($scope.entry, function () {
        //    //data saved. do something here.
        //}); //saves an entry. Assuming $scope.entry is the Entry object

    });
