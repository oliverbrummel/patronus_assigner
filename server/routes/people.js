var express = require('express');
var pg = require("pg");
var connectionString = require ("../db/connection").connectionString;

var router = express.Router();


router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log("posting people error", err);
      response.sendStatus(500);
    } else {
      var peopleResults = [];

      var first_name = request.body.first_name;
      var last_name = request.body.last_name;

      var query = client.query("INSERT INTO people (first_name, last_name) VALUES ($1, $2) " +
        "RETURNING first_name, last_name;", [first_name, last_name]);

      query.on("row", function(row) {
        peopleResults.push(row);
      }); //query.on("row")

      query.on("end", function() {
        done();
        response.send(peopleResults);
      }); //query.on("end")

      query.on("error", function(err) {
        console.log("Error posting person name", err);
        done();
        response.status(500).send(err);
      }); //query.on("error")

    } //  else
  }); //  pg.connect
}); //  router.post for people

router.get('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query("SELECT * FROM people LEFT JOIN patronus ON people.patronus_id = patronus.patronus_id;");
      var results = [];

      query.on("error", function(err){
        console.log("Error getting people", err);
        response.sendStatus(500);
        process.exit(1);
      });

      query.on("row", function(row){
        results.push(row);
      });

      query.on("end", function(){
        console.log("Success!");
        done();
        response.send(results);
      });
    }
  });
});

router.get('/:id', function(request, response){
  var requestedID = request.params.id;
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query("SELECT * FROM people WHERE id = " + requestedID + ";");
      var results = [];

      query.on("error", function(err){
        console.log("Error getting person", err);
        response.sendStatus(500);
        process.exit(1);
      });

      query.on("row", function(row){
        results.push(row);
      });

      query.on("end", function(){
        console.log("Success! Enjoy your person!");
        done();
        response.send(results);
      });
    }
  });
});

router.put("/:id", function(request, response){
  var requestedID = request.params.id;
  var patronus = request.body;

  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query("UPDATE people SET patronus_id = " + patronus.patronus_id + " WHERE id = " + requestedID + " RETURNING *;");
      var results = [];

      query.on("error", function(err){
        console.log("Error assigning patronuses", err);
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
