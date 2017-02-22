var express = require('express');
var userService = require('./service/UserService');

var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  //res.render('login', { title: 'Login' });
});
router.put('/', function(req, res, next) {
  var model = req.body;
  model.name = req.session.user.name;
  userService.updatePassword(model,function(e){
    res.send(e);
  });
});


module.exports = router;
