var express = require('express');
var pg = require("pg");
var connectionString = require ("../db/connection").connectionString;

var router = express.Router();

router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log("posting patronus error", err);
    } else {
      var patronusResults = [];

      var patronus_name = request.body.name;

      var query = client.query("INSERT INTO patronus (patronus_name) VALUES ($1)"+
                    " RETURNING patronus_name;", [patronus_name]);

      query.on("row", function(row){
        patronusResults.push(row);
      });

      query.on("end", function(){
        done();
        response.send(patronusResults);
      });

      query.on("error", function(err){
        console.log("Error posting patronus name", err);
        done();
        response.status(500).send(err);
      });
    }
  });

});

router.get('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query("SELECT * FROM patronus;");
      var results = [];

      query.on("error", function(err){
        console.log("Error getting patronuses", err);
        response.sendStatus(500);
        process.exit(1);
      });

      query.on("row", function(row){
        results.push(row);
      });

      query.on("end", function(){
        console.log("Success! No dementors for you!");
        done();
        response.send(results);
      });
    }
  });
});

module.exports = router;
