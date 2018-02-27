var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Game' });
});

router.get('/summary', function(req, res, next){
	res.render('summary', {title: 'Summary of Data'});
});

router.post('/commit', function(req, res, next){
	console.log(req.data)
});


router.get('/data', function(req,res,next){

});

module.exports = router;
