var express = require('express');
var router = express.Router();
var userService = require('./service/UserService');


router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', function(req, res, next) {
  var user = req.body;
  userService.register(user,function(e){
      res.send(e);

  });
});
router.get("/valid/:name",function(req,res,next){
  var name = req.params.name;
  userService.validUsername(name,function(e){
    res.send(e);
  });
});

module.exports = router;
