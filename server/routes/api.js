var express = require('express');
var router = express.Router();
var db = require('../models/database');
var model = require('../models/mongo');
var multiparty = require('multiparty');
var format = require('util').format;
var fs = require('fs');

var Items = model.Items;
var Orders = model.Orders;


router.get('/dashboard/index', function (req, res) {
    res.send([{name: "test"}]);
});

router.get('/order', function (req, res) {
    Orders.find({}, function (err, rows) {
        if (err)
            res.json(err);
        res.json(rows);
    });
});

router.get('/order/:id', function (req, res) {
    Orders.findOne({_id: req.params.id}, function (err, order) {
        if (err)
            res.json(err);
        res.json(order);

    });
});

router.get('/item', function (req, res) {
    Items.find({}, function (err, rows) {
        if (err)
            res.json(err);
        res.json(rows);
    });
});

router.get('/item/:id', function (req, res) {
    Items.findOne({_id: req.params.id}, function (err, item) {
        if (err)
            res.json(err);


        console.info("get item :" + req.params.id, item);
        res.json(item);

    });
});

router.put('/item/:id', function (req, res) {

    console.info("post data", req.body);
    Items.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                price: req.body.price,
                time: req.body.time,
                images: req.body.images
            }
        },
        {upsert: true},
        function (err, obj) {
            if (err) {
                res.json(err);
            }
            res.json(obj);
        });
});


router.post('/item', function (req, res) {

    console.info("post data", req.body);

    var item = new Items();
    item.name = req.body.name;
    item.price = req.body.price;
    item.time = req.body.time;
    item.iamges = req.body.images;
    item.save(function (err) {
        if (err) {
            res.json(err);
        }
        res.json({message: 'Bear created!'});
    });
});

router.delete('/item/:id', function (req, res) {
    Items.findByIdAndRemove(req.params.id, function (err, response) {
        if (err) {
            res.json(err);
        }
        res.json({message: 'Deleted!'});
    });
});


router.post('/upload', function (req, res, next) {
// create a form to begin parsing
    var form = new multiparty.Form();
    var image;
    var title = "test";
    form.on('error', next);
    form.on('close', function () {
        if (image.filename != undefined) {
            image.path = '/assets/uploads/' + image.filename;
            res.json(image);
        }
//            res.send(format('\nuploaded %s (%d Kb) as %s', image.filename, image.size / 1024 | 0, title));
    });

    // listen on field event for title
    form.on('field', function (name, val) {
        if (name !== 'title') return;
        title = val;
    });

    // listen on part event for image file
    form.on('part', function (part) {
        if (!part.filename) return;

        if (part.name !== 'file') return part.resume();

        console.log(part);

        image = {};
        image.filename = part.filename;
        image.size = 0;
        part.on('data', function (buf) {
            image.size += buf.length;
        });

        var out = fs.createWriteStream(__dirname + '/../assets/uploads/' + part.filename);
        part.pipe(out);


    });

    // parse the form
    form.parse(req);
});


module.exports = router;
