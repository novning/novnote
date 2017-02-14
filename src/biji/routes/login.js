var express = require('express');
var router = express.Router();
var userDB = require('./DB/UserDB');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.put('/', function(req, res, next) {
  var user = req.body;
  userDB.login(user,function(loginUser){
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

router.delete('/', function(req, res, next) {
  req.session.user = undefined;
  res.send({code:0,result:"success"});
});

module.exports = router;
