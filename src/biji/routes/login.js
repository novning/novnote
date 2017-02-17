var express = require('express');
var router = express.Router();
var userService = require('./service/UserService');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.put('/', function(req, res, next) {
  var user = req.body;
  userService.login(user,function(loginUser){
    console.log(loginUser);
      if(loginUser != null){
          //login success
          console.log("success");
          req.session.user = loginUser;
          res.send({code:0,result:"success"});
      }else{
          res.send({code:1,result:"login failed"});
      }

  });
});

router.get('/exit', function(req, res, next) {
  req.session.user = undefined;
  //res.send({code:0,result:"success"});
  res.render('login', { title: 'Login' });
});

module.exports = router;
