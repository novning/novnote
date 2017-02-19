var express = require('express');
var playgroundService = require('./service/PlaygroundService');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('playground', { title: 'playground' });
});

router.get('/content',function(req,res,next){
  var userId = req.session.user._id;
  playgroundService.findByUserId(userId,function(data){
    res.send(data);
  });
});

router.put("/",function(req,res,next){
  var model = req.body;
  var userId = req.session.user._id;
  model.userId = userId;
  playgroundService.update(model,function(e){
    res.send(e);
  });
});

module.exports = router;
