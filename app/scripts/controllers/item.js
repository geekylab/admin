'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ItemCtrl', function ($scope, Items) {
        $scope.entries = Items.query();

        //$scope.entry = new Items(); //You can instantiate resource class
        //$scope.entry.name = 'some data';
        //$scope.entry.price = '1500';
        //Items.save($scope.entry, function () {
        //    //data saved. do something here.
        //}); //saves an entry. Assuming $scope.entry is the Entry object

    });
