var express = require('express');
var router = express.Router();

router.get('/search/zip', function (req, res) {

});


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;