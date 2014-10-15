'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:KitchenCtrl
 * @description
 * # KitchenCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('KitchenCtrl', function ($scope, socket, $modal) {

        $scope.message = '';
        $scope.orders = [];

        socket.emit('get:orders');

        socket.on('get:orders:Success', function (rows) {
            $scope.orders = [];
            angular.forEach(rows, function (value, key) {
                var order = {
                    order_id: value.order_id,
                    table_number: value.table_number,
                    order_time: value.order_time,
                    items: [{
                        name: "Bigmac",
                        annotations: [
                            '- Cebola'
                        ]
                    }, {
                        name: "Beer"
                    }]
                };

                var start = moment.utc(value.order_time);
                var now = moment.tz('UTC');
                console.log("now : " + moment().tz('UTC').format('YYYY-MM-DD HH:mm:ss'));
                console.log("db  : " + start.format('YYYY-MM-DD HH:mm:ss'));
                console.log("now zone  : " + now.zone());
                console.log("db  zone : " + start.zone());
                var datet = now.diff(start, 'seconds');


                order.order_time = datet;

                order.timer = (function () {
                    var now = datet;
                    return setInterval(function () {
                        now++;
                        $scope.$apply(function () {
                            order.order_time = now;
                        });
                    }, 1000);
                })(order);


                $scope.orders.push(order);
            });
        });

        socket.on('new:order', function (order) {
            order.timer = (function () {
                var now = 0;
                return setInterval(function () {
                    now++;
                    $scope.$apply(function () {
                        order.order_time = now;
                    });
                }, 1000);
            })(order);

            $scope.orders.push(order);
        });

        $scope.newOrder = function () {
            var rnd = Math.floor(Math.random() * 25);
            var order = {
                table_number: rnd,
                order_time: '2014-10-14 17:42:00',
                items: [{
                    name: "Bigmac",
                    annotations: [
                        '- Cebola'
                    ]
                }, {
                    name: "Beer"
                }]
            };


            socket.emit('new:order', order, function (insertId) {
                console.log(insertId);
            });
        };

        $scope.broadcast = function () {
            var rnd = Math.floor(Math.random() * 25);
            var order = {
                table_number: rnd,
                order_time: '16:37:44',
                items: [{
                    name: "Bigmac",
                    annotations: [
                        '- Cebola'
                    ]
                }, {
                    name: "Beer"
                }]
            };
            socket.emit('broadcast:order', {order: order});

            order.timer = (function () {
                var now = 0;
                return setInterval(function () {
                    now++;
                    $scope.$apply(function () {
                        order.order_time = now;
                    });
                }, 1000);
            })(order);

            $scope.orders.push(order);
        };

        $scope.isLate = function (index) {
            return {
                'bg-red-sunglo': ($scope.orders[index].order_time >= 15 && $scope.orders[index].order_time < 60),
                'bg-blue-hoki': $scope.orders[index].order_time <= 15,
                'bg-red-intense': $scope.orders[index].order_time >= 60
            };
        };

        $scope.ok = function (order) {
            socket.emit('complete:order', order, function () {
                socket.emit('get:orders');
            });
        };

    });
