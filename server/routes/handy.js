var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('handy', {
        title: 'Handy'
    });
});
module.exports = router;