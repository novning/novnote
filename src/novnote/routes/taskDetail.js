var express = require('express');
var taskDetailService = require('./service/taskDetailService');
var router = express.Router();

/* GET taskDetail page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Biji' });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  taskDetailService.findByTaskId(id,function(e){
    res.render('taskDetail', { title: 'Biji',task: e });
    //res.send(e);
  });
});
router.delete('/:id',function(req,res,next){
  var id = req.params.id;
  taskDetailService.deleteById(id,function(e){
    res.send(e);
  });
});

module.exports = router;
