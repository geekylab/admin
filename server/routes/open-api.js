var express = require('express');
var router = express.Router();
var model = require('../models/mongo');
var passport = require('passport');

var Stores = model.Stores;

router.get('/store/near/:longitude/:latitude', function (req, res) {
    console.log(req.params.longitude);
    console.log(req.params.latitude);
    if (req.user)
        console.log(req.user.facebook.name);
    Stores.find({
        location: {
            $near: {
                $geometry: {type: "Point", coordinates: [req.params.longitude, req.params.latitude]},
                $maxDistance: 5000
            }
        }
    }, function (err, rows) {
        if (err)
            res.json(err);
        else
            res.json(rows);
    });
});

/**
 * Check facebook login
 */
router.post('/auth/facebook/token',
    passport.authenticate('facebook-token'),
    function (req, res) {
        if (req.user) {
            res.json(req.user);
        } else {
            res.json({
                status: false,
                error: "no user"
            });
        }

    }
);

/**
 * logout
 */
router.get('/logout', function (req, res) {
    console.log("logout");
    req.logout();
    res.json({status: true});
});


/**
 * store
 */

router.get('/store/:id', function (req, res) {
    console.log('store');
    Stores.findOne({_id: req.params.id})
        .exec(function (err, store) {
            if (err)
                return res.json(err);

            res.json(store);

        });
});

router.post('/store/search', function (req, res) {

    console.log(req.body);

    if (req.body.features != undefined) {
        req.body.features.forEach(function (feature) {
            console.log(feature);
        });
    }


    Stores.find({}, function (err, rows) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            res.json(rows);
        }
    });
    //res.json([{
    //    _id: '1',
    //    name: 'Awesome Restaurant for server',
    //    desc: 'Meat specialties',
    //    open_days: 'everyday',
    //    open_time: 'From 10am to 10pm',
    //    public_rating: 3.7,
    //    my_rating: 5,
    //    address: 'Av. Pres. Wilson, 2131 - Santos/SP',
    //    location: {
    //        lat: '-23.9691553',
    //        long: '-46.3750582'
    //    },
    //    features: {
    //        'kids_space': true,
    //        'parking': true,
    //        'smoking': true,
    //        'non_smoking': true
    //    },
    //    phone: '1'
    //}]);
});


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;