'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('OrderCtrl', function ($scope) {

        $scope.filters = {
            order_id: "",
            order_date_from: "",
            order_date_to: "",
            table_number: "",
            price: "",
            product_name: ""
        };

        $scope.doSearch = function () {
            alert('search');
        };

        $scope.doReset = function () {
            alert('reset');
        };

        $scope.toggleOrder = function ($event) {
            var target = angular.element($event.target);
            target.parent().parent().parent().parent().css({backgroundColor: "#ccc"});
        };

        $scope.completeOrder = function () {
            alert('complete');
        };

        $scope.editOrder = function () {
            alert('editOrder');
        };

        $scope.cancelOrder = function () {
            alert('cancelOrder');
        };


    });
