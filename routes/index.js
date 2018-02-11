var express = require('express');
var router = express.Router();
var db_name = "sagarlad";
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
var MongoClient = require('mongodb').MongoClient;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Game' });
});

router.get('/summary', function(req, res, next){
	res.render('summary', {title: 'Summary of Data'});
});

router.post('/commit', function(req, res, next){
	MongoClient.connect(mongodb_connection_string, function(err, db) {
		db.collection("timepsych").findOne({},{}, function(err, result){
			var data = result.data;
			data.push(req.body);
			db.collection('timepsych').update({}, {$set:{"data":data}}, {upsert:true}, function(err, result) {
    			db.close();
    			res.send(data);
    		});
 		 });
	});
});


router.get('/data', function(req,res,next){
	if(req.body.secure){
		MongoClient.connect(mongodb_connection_string, function(err, db) {
			db.collection("timepsych").findOne({},{}, function(err, result){
				var data = result.data;
				res.send(data);
 		 	});
		});
	}
	else{
		res.send("Unauthorized access");
	}
	
});

module.exports = router;
