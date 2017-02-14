var express = require('express');
var router = express.Router();
var pointDB = require('./DB/PointDB');

/* GET home page. */
router.get('/:masteryId', function(req, res, next) {
  var masteryId = req.params.masteryId;
  pointDB.findPointByMasteryId(masteryId,function(data){
    res.send(data);
  })
});

module.exports = router;
