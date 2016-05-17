var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sagar', { title: 'Sagar Lad Time Perception' });
});

module.exports = router;
