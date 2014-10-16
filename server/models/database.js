var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'johna1203',
    password: '',
    database: 'geekymenu',
    connectionLimit: 10,
    supportBigNumbers: true
});

// Get records from a city
exports.getOrders = function (callback) {
    var sql = "SELECT * FROM orders WHERE order_status=?";
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [0], function (err, results) {
            connection.release();
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};