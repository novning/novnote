var express = require('express');
var router = express.Router();
var taskService = require('./service/TaskService');


router.get('/', function(req, res, next) {
  taskService.findAll(function(data){
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
  console.info(model);
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

router.put('/update/:id/:value',function(req,res,next){
  var id = req.params.id;
  var value = req.params.value;

  taskService.updateTakeTime(id,value,function(e){
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
  taskService.deleteOne(id,function(e){
    res.send(e);
  });
});


module.exports = router;
