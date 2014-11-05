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


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;