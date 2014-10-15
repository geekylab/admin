'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:HandyCtrl
 * @description
 * # HandyCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('HandyCtrl', function ($scope, socket) {

        $scope.items = [
            {
                name: "Cabonara"
            },
            {
                name: "Yakisoba"
            }
        ];

        $scope.buy = function (item) {
            var order = {
                table_number: 1,
                order_time: '2014-10-14 17:42:00',
                items: [{
                    name: item.name
                }]
            };


            socket.emit('new:order', order, function (insertId) {
                alert('ok');
            });
        };

    });
