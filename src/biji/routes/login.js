var express = require('express');
var nlogger = require('./common/nlogger.js');
var userService = require('./service/UserService');

var router = express.Router();

var nl = nlogger.logger();
/* GET login page. */
router.get('/', function(req, res, next) {
  nl.info("login page");
  res.render('login', { title: 'Login' });
});

router.put('/', function(req, res, next) {
  var user = req.body;
  if(user.name.length > 20 || user.password.length > 20){
      res.send({code:1,message:"内容过长"});
  }else{

    userService.login(user,function(loginUser){
        if(loginUser != null){
          //login success
          req.session.user = loginUser;
          res.send({code:0,message:"登陆成功"});
        }else{
            res.send({code:1,message:"登陆失败"});
        }

    });

  }

});

router.get('/exit', function(req, res, next) {
  req.session.user = undefined;
  //res.send({code:0,result:"success"});
  res.render('login', { title: 'Login' });
});

module.exports = router;
