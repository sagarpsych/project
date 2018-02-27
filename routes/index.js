var express = require('express');
var router = express.Router();
var fs = require('fs');
var json2csv = require('json2csv').parse;
var moment = require('moment');
var datastore = 'datastore.csv';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Game' });
});

router.get('/summary', function(req, res, next){
	res.render('summary', {title: 'Summary of Data'});
});

router.post('/commit', function(req, res, next){
	console.log("Committing Data");
  var data = req.body;
  data.time = moment().format();
  var fields = ["time", "age", "yearEdu", "education", "race", "gender", "diagnosis", "medicine",
    "1_1", "2_1", "3_1", "4_1", "5_1", "6_1", "7_1", "8_1", "9_1", "10_1",
    "1_2", "2_2", "3_2", "4_2", "5_2", "6_2", "7_2", "8_2", "9_2", "10_2",
    "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12"
  ];

  var newLine= "\r\n";
  fs.stat(datastore, function (err, stat) {
    if (err == null) {
        console.log('File exists');
        var opts = {"fields": fields, "header": false};
        //write the actual data and end with newline
        var csv = json2csv(data, opts) + newLine;

        fs.appendFile(datastore, csv, function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    }
    else {
        //write the headers and newline
        console.log('New file, include writing headers');
        var opts = {"fields": fields, "header": true};
        //write the actual data and end with newline
        var csv = json2csv(data, opts) + newLine;
        fs.appendFile(datastore, csv, function (err) {
          if (err) throw err;
          console.log('The "data to append" was appended to the newly created file!');
        });
    }
  });

});


router.get('/data', function(req,res,next){
  fs.readFile(datastore, function(err, contents){
    if(err){
      res.error(err);
    }
    else{
      res.send(contents);
    }
  });

});

module.exports = router;
