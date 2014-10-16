var express = require('express');
var router = express.Router();
var db = require('../models/database');
var model = require('../models/mongo');

var Items = model.Items;


/* GET users listing. */
router.get('/dashboard/index', function (req, res) {
    res.send([{name: "test"}]);
});

router.get('/orders', function (req, res) {
    db.getOrders(function (err, results) {
        if (!err) {
            res.send(results);
        } else {
            res.send([]);
        }
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
    Items.update({_id: req.body.id}, function (err, item) {
        if (err)
            res.send(err);
        res.send(item);

    });
});

router.post('/item', function (req, res) {
    var item = new Items();
    item.name = req.body.name;
    item.price = req.body.price;
    console.log(item.price)
    item.save(function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json({message: 'Bear created!'});
    });
});


module.exports = router;
