//README: REFER TO THE NOTE BELOW
//NOTE: you can get a free mongodb database using https://mlab.com/, after which follow the instructions there and to create the hosted database
//and paste the connection string below in the place holder const uri = <INSERT-CONNECTION-STRING-HERE>;
//make sure to create a database with the name shorturl and a collection within it with the name of urlmap
'use strict';

var express = require('express');
var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = 50023;

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});

//WORKING TEST FUNCTION >>>>
app.get("/api/shorturl/:number", function(req, res) {
  //this redirects the page if the number give is already in the database, else it returns error
  mongo.connect(uri, function(err, db) {
    var dbo = db.db("shorturl");
    
    dbo.collection("urlmap").findOne({short_url: parseInt(req.params.number)}, function(err, result) {
      if(result == null || result == "") {
        res.json({error: "error"});
      }
      else {
        res.redirect(result.original_url);
        db.close();
      }
  });
  });
});
//<<<<< WORKING TEST FUNCTION

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
const parse = require("body-parser");
app.use(parse.urlencoded({
    extended: true
}));
app.use(parse.json());

const dns = require('dns');
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

/** this project needs a db !! **/ 
const uri = <INSERT-CONNECTION-STRING-HERE>;

app.post("/api/shorturl/new", function (req, res) {
    var url = req.body.url.replace(/(^\w+:|^)\/\//, '');
    var number = Math.floor(Math.random() * 101);
  
    dns.lookup(url, (err, add, fam) => {
      //Alternative REGEX: /^((http)|(https))\:\/\/(www)\.[a-z]+\.(com)/
      if(err == null || err == "") {
        mongo.connect(uri, function(err, db) {
          if (err) throw err;
            var dbo = db.db("shorturl");
          
          //!!!!!!PREVENTIVE MEASURE: prevents overridding of the number 3
          while(number == 3) {
            number = Math.floor(Math.random() * 101);
          }
          
          dbo.collection("urlmap").findOne({short_url: number}, function(err, result) {
            if(result != null || result != "") {
              dbo.collection("urlmap").deleteOne({short_url: number}, function(err, obj) {
                if (err) throw err;
              });
            }
          });
          
          var myobj = {original_url: req.body.url, short_url: number};
          dbo.collection("urlmap").insertOne(myobj, function(err, res) {
              if (err) throw err;
              db.close();
          });
        });
      
        res.json({original_url: req.body.url, short_url: number});
      }
      else {
        res.json({error: "invalid URL"}); 
      } 
    });
});