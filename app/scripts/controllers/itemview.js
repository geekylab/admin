'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ItemviewCtrl
 * @description
 * # ItemviewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ItemviewCtrl', function ($scope, Items, $routeParams) {
        var itemId = $routeParams.id;
        $scope.item = {
            name: '',
            price: 0,
            created: ''
        };
        if (itemId != -1) {
            $scope.item = Items.get({id: itemId});
        }


        $scope.save = function () {
            console.log($scope.item);
            if ($scope._id) {
                alert('save');
                $scope.$save();
            } else {
                var post = new Items($scope.item);
                post.$save(function (savedObject, handler) {
                    // 保存後の処理
                    alert('ok');
                });
            }
        }
    });
