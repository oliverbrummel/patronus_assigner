var express = require('express');
var path = require('path');
var people = require('./people');
var patronuses = require('./patronuses');
var router = express.Router();

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.use('/people', people);
router.use('/patronuses', patronuses);

module.exports = router;
