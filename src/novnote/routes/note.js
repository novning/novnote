var express = require('express');
var noteService = require('./service/NoteService');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('note', { title: 'note' });
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  if(id == "_") id = "";
  res.render('noteEdit', { title: 'note edit',id:id});
});
router.get('/detail/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('noteDetail', { title: 'note detail',id:id});
});

router.post('/', function(req, res, next) {
  var model = req.body;
  model.userId = req.session.user._id;
  noteService.add(model,function(e){
    res.send(e);
  });
});
router.put('/', function(req, res, next) {
  var model = req.body;
  noteService.update(model,function(e){
    res.send(e);
  });
});
router.get("/list",function(req,res,next){
  var userId = req.session.user._id;
  noteService.findByUserId(userId,function(e){
    res.send(e);
  });
});
router.put("/search",function(req,res,next){
  var title = req.body.title;
  noteService.findByTitleLike(title,function(e){
    console.info(e);
    res.send(e);
  })
});
router.get("/id/:id",function(req,res,next){
  var id = req.params.id;
  noteService.findById(id,function(e){
    res.send(e);
  })
});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  noteService.deleteById(id,function(e){
    res.send(e);
  });
});


module.exports = router;
