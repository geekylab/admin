var express = require('express');
var router = express.Router();
var db = require('../models/database');
var model = require('../models/mongo');
var multiparty = require('multiparty');
var format = require('util').format;
var fs = require('fs');
//var async = require('async');

var Items = model.Items;
var Orders = model.Orders;
var Categories = model.Categories;
var Tables = model.Tables;
var Stores = model.Stores;
var Ingredients = model.Ingredients;

router.get('/me', function (req, res) {
    var user = req.user;
    res.json({
        email: user.local.email
    });
});

router.get('/dashboard/index', function (req, res) {
    Tables.count({table_status: 1}, function (err, count) {
        if (err) {
            console.log(err);
            res.json(err);
        }
        var response = {
            busy_tables: count
        };
        console.log(response);
        res.json(response);
    });
});

router.get('/order', function (req, res) {
    Orders.find({})
        .populate('store', 'store_name')
        .populate('customers', 'name')
        .exec(function (err, order) {
            //if (err) return handleError(err);
            //console.log('The creator is %s', story._creator.name);
            //// prints "The creator is Aaron"
            if (err)
                return res.json(err);
            res.json(order);
        });
});

router.get('/order/:id', function (req, res) {
    Orders.findOne({_id: req.params.id}, function (err, order) {
        if (err)
            res.json(err);
        res.json(order);

    });
});

router.post('/order', function (req, res) {

    function getNewOrderNumber() {
        return "1234679";
    }

    function findSecretNumber(tmpNumber, cb) {
        Orders.find({secret_number: tmpNumber}, function (err, rows) {
            cb(rows)
        });
    }

    function generateNewSecretNumber(cb) {
        var high = 9999;
        var low = 1000;
        var tmpNumber = Math.floor(Math.random() * (high - low + 1) + low);
        findSecretNumber(tmpNumber, function (rows) {
            if (rows.length > 0)
                generateNewSecretNumber(cb);
            else
                cb(tmpNumber);
        });


    }

    var order = new Orders();

    //order_number
    order.order_number = getNewOrderNumber();

    //table_number
    if (req.body.table_number != undefined)
        order.table_number = req.body.table_number;

    //store
    order.store = req.body.store._id;


    //order_status
    order.order_status = 1;

    //customers

    //items

    //created


    //secret_number
    generateNewSecretNumber(function (secret) {
        order.secret_number = secret;
        order.save(function (err) {
            if (err) {
                return res.json(err);
            }
            console.info("insert new order", order);
            res.json(order);
        });
    });


    //Orders.findOne({_id: req.params.id}, function (err, order) {
    //    if (err)
    //        res.json(err);
    //    res.json(order);
    //
    //});
});


/**
 * Item
 */

router.get('/item', isLoggedIn, function (req, res) {
    Items.find({}, function (err, rows) {
        if (err)
            res.json(err);
        res.json(rows);
    });
});

router.get('/item/:id', isLoggedIn, function (req, res) {
    Items.findOne({_id: req.params.id})
        .populate("ingredients")
        .exec(function (err, item) {
            if (err) {
                return res.json(err);
            }
            res.json(item);

        });
});

router.put('/item/:id', isLoggedIn, function (req, res) {

    var updateItem = {};
    updateItem.name = req.body.name;
    updateItem.desc = req.body.desc;
    updateItem.price = req.body.price;
    updateItem.time = req.body.time;
    updateItem.images = req.body.images;
    updateItem.categories = req.body.categories;
    updateItem.stores = req.body.stores;
    updateItem.ingredients = [];

    if (req.body.ingredients != null) {
        req.body.ingredients.forEach(function (ingredient) {
            updateItem.ingredients.push(ingredient._id);
        });
    }


    Items.findByIdAndUpdate(req.params.id, {
            $set: updateItem
            //{
            //    name: req.body.name,
            //    desc: req.body.desc,
            //    price: req.body.price,
            //    time: req.body.time,
            //    images: req.body.images,
            //    categories: req.body.categories,
            //    ingredients: req.body.ingredients
            //}
        },
        {upsert: true},
        function (err, obj) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            res.json(obj);
        });
});


router.post('/item', isLoggedIn, function (req, res) {

    var item = new Items();
    if (req.body.name != undefined)
        item.name = req.body.name;

    if (req.body.desc != undefined)
        item.desc = req.body.desc;

    if (req.body.price != undefined)
        item.price = req.body.price;

    if (req.body.time != undefined)
        item.time = req.body.time;

    if (req.body.images != undefined)
        item.images = req.body.images;

    if (req.body.categories != undefined)
        item.categories = req.body.categories;

    if (req.body.stores != undefined)
        item.stores = req.body.stores;

    item.ingredients = [];
    if (req.body.ingredients != undefined) {
        req.body.ingredients.forEach(function (ingredient) {
            item.ingredients.push(ingredient._id);
        });
    }

    item.save(function (err) {
        if (err) {
            return res.json(err);
        }
        res.json(item);
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

/**
 * Category
 */

router.get('/category', function (req, res) {
    Categories.find({}, function (err, rows) {
        if (err)
            res.json(err);
        res.json(rows);
    });
});

router.get('/category/:id', function (req, res) {
    Categories.findOne({_id: req.params.id}, function (err, item) {
        if (err)
            res.json(err);


        console.info("get item :" + req.params.id, item);
        res.json(item);

    });
});

router.put('/category/:id', function (req, res) {
    Categories.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name
            }
        },
        {upsert: true},
        function (err, obj) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            res.json(obj);
        });
});


router.post('/category', function (req, res) {

    console.info("post data", req.body);

    var category = new Categories();
    if (req.body.name != undefined)
        category.name = req.body.name;
    category.save(function (err) {
        if (err) {
            res.json(err);
        }
        console.info("insert item", category);
        res.json(category);
    });
});

router.delete('/category/:id', function (req, res) {
    Categories.findByIdAndRemove(req.params.id, function (err, response) {
        if (err) {
            res.json(err);
        }
        res.json({message: 'Deleted!'});
    });
});

/**
 * Tables
 */

router.get('/table', function (req, res) {
    Tables.find({}, function (err, rows) {
        if (err)
            res.json(err);
        res.json(rows);
    });
});

router.get('/table/:id', function (req, res) {
    Tables.findOne({_id: req.params.id}, function (err, item) {
        if (err)
            res.json(err);


        console.info("get item :" + req.params.id, item);
        res.json(item);

    });
});

router.put('/table/:id', function (req, res) {
    Tables.findByIdAndUpdate(req.params.id, {
            $set: {
                table_number: req.body.table_number,
                table_status: req.body.table_status,
                limited_number: req.body.limited_number
            }
        },
        {upsert: true},
        function (err, obj) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            res.json(obj);
        });
});


router.post('/table', function (req, res) {

    console.info("post data", req.body);

    var table = new Tables();
    if (req.body.table_number != undefined)
        table.table_number = req.body.table_number;
    if (req.body.table_status != undefined)
        table.table_status = req.body.table_status;
    if (req.body.limited_number != undefined)
        table.limited_number = req.body.limited_number;
    table.save(function (err) {
        if (err) {
            res.json(err);
        }
        console.info("insert item", table);
        res.json(table);
    });
});

router.delete('/table/:id', function (req, res) {
    Tables.findByIdAndRemove(req.params.id, function (err, response) {
        if (err) {
            res.json(err);
        }
        res.json({message: 'Deleted!'});
    });
});

/**
 * Store
 */

router.get('/store', isLoggedIn, function (req, res) {
    var user = req.user;
    Stores.find({users: user._id})
        .populate('users')
        .exec(function (err, rows) {
            if (err)
                return res.json(err);
            res.json(rows);
        });
});


router.get('/store/:id/:lang?', isLoggedIn, function (req, res) {
    var user = req.user;
    var lang = req.params.lang;

    if (lang == undefined) {
        lang = 'en';
    }


    Stores.findOne({_id: req.params.id, users: user._id})
        .populate('users')
        .exec(function (err, store) {
            //if (err) return handleError(err);
            //console.log(person);
            if (err)
                return res.json(err);

            res.json(store);

        });
});

router.put('/store/:id', isLoggedIn, function (req, res) {
    var user = req.user;
    var updateData = {};
    getStoreObjectFromReq(req, updateData);
    Stores.findOneAndUpdate({'_id': req.params.id, users: user._id}, {
            $set: updateData
        },
        function (err, obj) {
            if (err) {
                res.json(err);
            }
            res.json(obj);
        });
});

function getStoreObjectFromReq(req, updateData) {
    if (req.body.store_name != undefined)
        updateData.store_name = req.body.store_name;

    if (req.body.desc != undefined)
        updateData.desc = req.body.desc;

    if (req.body.tel != undefined)
        updateData.tel = req.body.tel;

    if (req.body.country != undefined)
        updateData.country = req.body.country;

    if (req.body.zip_code != undefined)
        updateData.zip_code = req.body.zip_code;

    if (req.body.state != undefined)
        updateData.state = req.body.state;

    if (req.body.city != undefined)
        updateData.city = req.body.city;

    if (req.body.address != undefined)
        updateData.address = req.body.address;

    if (req.body.address2 != undefined)
        updateData.address2 = req.body.address2;

    if (req.body.location != undefined)
        updateData.location = req.body.location;

    if (req.body.seat_count != undefined)
        updateData.seat_count = req.body.seat_count;

    if (req.body.images != undefined)
        updateData.images = req.body.images;

    if (req.body.opening_hour != undefined) {
        updateData.opening_hour = {};
        if (req.body.opening_hour.start != undefined)
            updateData.opening_hour.start = req.body.opening_hour.start;

        if (req.body.opening_hour.end != undefined)
            updateData.opening_hour.end = req.body.opening_hour.end;

        if (req.body.opening_hour.last_order != undefined)
            updateData.opening_hour.last_order = req.body.opening_hour.last_order;
    }

    if (req.body.seat_type != undefined)
        updateData.seat_type = req.body.seat_type;

    if (req.body.opts != undefined)
        updateData.opts = req.body.opts;

    if (req.body.tables != undefined)
        updateData.tables = req.body.tables;

    return updateData;
}

router.post('/store', isLoggedIn, function (req, res) {
    var user = req.user;
    var store = new Stores();
    store.users.push(user);
    getStoreObjectFromReq(req, store);
    store.save(function (err) {
        if (err) {
            res.json(err);
        }
        res.json(store);
    });
});

router.delete('/store/:id', isLoggedIn, function (req, res) {
    var user = req.user;
    Stores.findByIdAndRemove(req.params.id, {users: user._id}, function (err, response) {
        if (err) {
            res.json(err);
        }
        res.json({message: 'Deleted!'});
    });
});


/**
 * Image upload
 */

router.post('/upload', function (req, res, next) {
    // create a form to begin parsing
    var user = req.user;
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

        image = {};
        image.filename = part.filename;
        image.size = 0;
        part.on('data', function (buf) {
            image.size += buf.length;
        });

        var userImageDir = __dirname + '/../assets/uploads/' + user._id;
        if (!fs.existsSync(userImageDir)) {
            fs.mkdirSync(userImageDir);
        }

        var out = fs.createWriteStream(userImageDir + '/' + part.filename);
        part.pipe(out);
    });

    // parse the form
    form.parse(req);
});

router.get('/ingredients', function (req, res) {
    if (req.query.name != undefined && req.query.lang != undefined) {
        var conditions = {};
        conditions['text.' + req.query.lang] = new RegExp(req.query.name, 'i');
        Ingredients.find(conditions, function (err, rows) {
            if (err)
                res.json([err]);
            res.json(rows);
        });
    } else {
        res.json([]);
    }
});

router.post('/ingredients', function (req, res) {
    var user = req.user;
    var ingredient = new Ingredients();

    if (req.body.text != null)
        ingredient.text = req.body.text;

    if (req.body.desc != null)
        ingredient.desc = req.body.desc;

    if (req.body.is_okay != null)
        ingredient.is_okay = false;

    if (req.body.user_id != null)
        ingredient.user_id = user._id;

    ingredient.save(function (err) {
        if (err) {
            res.json(err);
        }
        console.info("insert ingredient", ingredient);
        res.json(ingredient);
    });

});

router.put('/ingredients/:id', function (req, res) {
    var user = req.user;
    var ingredient = {};

    if (req.body.text != null)
        ingredient.text = req.body.text;

    if (req.body.desc != null)
        ingredient.desc = req.body.desc;

    if (req.body.is_okay != null)
        ingredient.is_okay = false;

    if (req.body.user_id != null)
        ingredient.user_id = user._id;

    Ingredients.findOneAndUpdate({'_id': req.params.id}, {
            $set: ingredient
        },
        function (err, obj) {
            if (err) {
                res.json(err);
            } else {
                console.log(obj, err);
                res.json(obj);
            }
        });

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401);
    res.json({error: 'Authenticate error'});
}

module.exports = router;
