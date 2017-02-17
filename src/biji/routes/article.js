var express = require('express');
var articleService = require('./service/ArticleService');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('article', { title: '文章' });
});

router.get('/list',function(req,res,next){
  articleService.findAll(function(data){
    res.send(data);
  });
});

router.put("/",function(req,res,next){
  var article = req.body;
  articleService.add(article,function(insertResult){
    res.send(insertResult);
  });
});

module.exports = router;
