var express = require('express');
var router = express.Router();
var userService = require('./service/userService');

/* GET login page. */
router.get('/', function(req, res, next) {
  //res.render('login', { title: 'Login' });
});
router.put('/', function(req, res, next) {
  var model = req.body;
  userService.updatePassword(model,function(e){
    res.send(e);
  })
});

module.exports = router;
