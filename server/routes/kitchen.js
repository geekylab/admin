var express = require('express');
var router = express.Router();
/* POST chat page. */
router.get('/', function (req, res) {
    res.render('kitchen', {
        title: 'Kitchen'
    });
});
module.exports = router;