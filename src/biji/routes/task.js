var express = require('express');
var taskService = require('./service/TaskService');
var router = express.Router();



router.get('/', function(req, res, next) {
  var user = req.session.user;
  taskService.findByUser(user._id,function(data){
    res.send(data);
  });
});
router.get('/list', function(req, res, next) {
  taskService.findList(function(data){
    res.send(data);
  });
});

router.post('/', function(req, res, next) {
  var model = req.body;
  model.userId = req.session.user._id;
  taskService.add(model,function(data){
    res.send(data);
  });
});

router.put('/done/:id',function(req,res,next){
  var id = req.params.id;
  taskService.taskDone(id,function(e){
    res.send(e);
  })
});
router.put('/order',function(req,res,next){
  var tasks = req.body;
  taskService.updateOrder(tasks,function(e){
    res.send(e);
  })
});

router.put('/updateTime',function(req,res,next){
  var model = req.body;

  taskService.updateTime(model,function(e){
    res.send(e);
  });
});
router.put('/:id',function(req,res,next){
  var id = req.params.id;
  var model = req.body;
  taskService.update(id,model,function(e){
    res.send(e);
  });
});

router.delete('/:id',function(req,res,next){
  var id = req.params.id;
  taskService.deleteById(id,function(e){
    res.send(e);
  });
});


module.exports = router;
