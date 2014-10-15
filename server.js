// MySQL データベース名、ユーザー名、パスワード
var DBNAME = 'geekymenu';
var DBUSER = 'johna1203';
var DBPASSWD = null;

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
var moment = require('moment');


var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: DBUSER,
    password: DBPASSWD,
    database: DBNAME
});


app.use(express.static('app'));
//app.get('/', function (req, res) {
//    res.sendfile(__dirname + '/index.html');
//});

server.listen(3000);

io.on('connection', function (socket) {
    socket.on('broadcast:order', function (data) {
        socket.broadcast.emit('new:order', data.order);
    });


    socket.on('new:order', function (order, callback) {
        connection.query(
            'INSERT INTO orders (table_number,order_time,order_status) VALUES (?,NOW(),?)',
            [order.table_number, 0],
            function (err, rows) {
                console.log(err);
                if (callback) {
                    callback.apply(rows.insertId);
                }

                socket.emit('new:order', order);
                socket.broadcast.emit('new:order', order);
            }
        );
    });

    socket.on('get:orders', function (data, callback) {
        connection.query(
            'SELECT *,DATE_FORMAT(order_time,\'%Y-%m-%d %k:%i:%s\') as order_time from orders where order_status = 0',
            function (err, rows) {
                socket.broadcast.emit('get:orders:Success', rows);
                socket.emit('get:orders:Success', rows);
            }
        );
    });

    socket.on('complete:order', function (data, callback) {

        connection.query(
            'update orders set order_status = 1 where order_id = ?',
            [data.order_id],
            function (err, rows) {
                console.log(err);
                if (callback) {
                    callback.apply();
                }
            }
        );
    });


});