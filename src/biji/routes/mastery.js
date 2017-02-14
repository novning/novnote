var express = require('express');
var router = express.Router();
var masteryDB = require('./DB/MasteryDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  masteryDB.findMasterys(function(data){
    res.send(data);
  });
});

module.exports = router;
