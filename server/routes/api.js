var express = require('express');
var router = express.Router();
var db = require('../models/database');
var model = require('../models/mongo');

var Items = model.Items;
var Orders = model.Orders;


/* GET users listing. */
router.get('/dashboard/index', function (req, res) {
    res.send([{name: "test"}]);
});

router.get('/order', function (req, res) {
    Orders.find({}, function (err, rows) {
        if (err)
            res.send(err);
        res.send(rows);
    });
});

router.get('/order/:id', function (req, res) {
    Orders.findOne({_id: req.params.id}, function (err, order) {
        if (err)
            res.send(err);
        res.send(order);

    });
});

router.get('/item', function (req, res) {
    Items.find({}, function (err, rows) {
        if (err)
            res.send(err);
        res.send(rows);
    });
});

router.get('/item/:id', function (req, res) {
    Items.findOne({_id: req.params.id}, function (err, item) {
        if (err)
            res.send(err);
        res.send(item);

    });
});

router.put('/item/:id', function (req, res) {
    Items.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                price: req.body.price
            }
        },
        {upsert: true},
        function (err, obj) {
            return res.json(true);
        });
});


router.post('/item', function (req, res) {
    var item = new Items();
    item.name = req.body.name;
    item.price = req.body.price;
    item.save(function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json({message: 'Bear created!'});
    });
});


module.exports = router;
