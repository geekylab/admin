'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('OrderCtrl', function ($scope, Orders, uiGridConstants, $modal, Store, alertService) {
        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [
                {field: 'order_number'},
                {field: 'customers'},
                {
                    field: 'table_number', filters: [
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
                    field: 'store.store_name.us',
                    enableSorting: false
                },
                {
                    field: 'order_status'
                },
                {
                    field: 'secret_number',
                    enableSorting: false
                },
                {
                    field: 'Action',
                    cellTemplate: '<a class="btn btn-success" ng-href="/#/order/{{row.entity._id}}" >Edit</a>',
                    enableFiltering: false,
                    enableSorting: false
                }
            ]
        };

        $scope.entries = Orders.query(function (data) {
            $scope.gridOptions.data = data;
        });


        $scope.order = new Orders();

        $scope.createNewOrder = function () {

            var modalInstance = $modal.open({
                templateUrl: 'myNewOrderModal.html',
                controller: 'MyNewOrderModalCtrl',
                size: 'lg',
                resolve: {}
            });

            modalInstance.result.then(function (modalOrder) {
                function success(response) {
                    alertService.add('success', '保存した');
                    var newOrder = {};
                    angular.copy($scope.order, newOrder);
                    $scope.gridOptions.data.push(newOrder);
                    $scope.order = new Orders();
                }

                function failure(response) {
                    console.log(response);
                }


                $scope.order.table_number = modalOrder.table.table_number;
                $scope.order.store = modalOrder.store;
                $scope.order.order_status = 1;

                $scope.myPromise = $scope.order.$save(success, failure);


            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });


        };

    }).controller('MyNewOrderModalCtrl', function ($scope,
                                                   $modalInstance,
                                                   Store,
                                                   Orders) {

        $scope.order = {};
        $scope.stores = [];
        $scope.stores = Store.query();

        $scope.newNumber = 0;


        $scope.generateOrderNumber = function () {
            $scope.newNumber = Math.floor((Math.random() * (9999 - 1111) + 1111));
        };

        $scope.ok = function () {
            $modalInstance.close($scope.order);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
