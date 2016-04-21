var express = require('express');
var index = require('./routes/index');
var bodyParser = require('body-parser');
var initializeDB = require("./db/connection").initializeDB;

var app = express();

app.use(bodyParser.json());
app.use(express.static('server/public'));
app.use('/', index);

initializeDB();

var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('Server listening on port', port);
});
