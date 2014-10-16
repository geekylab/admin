var kitchenApp = angular.module('KitchenApp', [])
    .factory('socket', function ($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });

                });
            },
            socket: socket
        };
    }).filter('array', function () {
        return function (arrayLength) {
            if (arrayLength) {
                arrayLength = Math.ceil(arrayLength);
                var arr = new Array(arrayLength), i = 0;
                for (; i < arrayLength; i++) {
                    arr[i] = i;
                }
                return arr;
            }
        };
    });


kitchenApp.controller('PanelCtrl', function ($scope, $http, socket) {
    $scope.connected = false;

    $scope.orders = [];

    $http.get('/api/test')
        .success(function (data) {
            $scope.orders = data;
        });


    socket.on('connect', function () {
        $scope.connected = socket.socket.connected;
    });

    socket.on('disconnect', function () {
        $scope.connected = socket.socket.connected;
    });

    $scope.isConn = function () {
        return {
            'panel-success': $scope.connected,
            'panel-danger': !$scope.connected
        };
    };

    socket.on('new:order', function (order) {
        $scope.orders.push(order);
    });

});
//(function ($) {
//    // socket.io接続
//    var socket = io.connect();
//
//
//    // 接続時
//    socket.on('connect', function () {
//        // ログイン通知
//
//    });
//
//    // 切断時
//    socket.on('disconnect', function (client) {
//
//    });
//
//    // 受信時
//    socket.on('order:new', function (data) {
//
//    });
//
//
//
//})(jQuery);