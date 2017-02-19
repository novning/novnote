var noteData = require('../data/NoteData');
var moment = require('moment');

var NoteService = {
  add:function(model,callback){
    var time = new Date().getTime();
    model.createTime = time;
    model.updateTime = time;
    noteData.add(model,function(e,_id){
      if(e > 0){
        callback({code:0,result:"success"});
      }else{
        callback({code:1,result:"fail"});
      }
    });
  },
  findByUserId:function(userId,callback){
    noteData.filterField({userId:userId},{content:0},function(docs){
      if(docs.length > 0){
          for(var i = 0;i < docs.length;i++){
            docs[i].createTime = moment(docs[i].createTime).format("YYYY-MM-DD");
            docs[i].updateTime = moment(docs[i].updateTime).format("YYYY-MM-DD");
          }
      }
      callback(docs);

    });
  },
  findById:function(id,callback){
    noteData.findById(id,function(e){
      if(e != null){
        e.createTime = moment(e.createTime).format("YYYY-MM-DD");
        e.updateTime = moment(e.updateTime).format("YYYY-MM-DD");
      }
      callback(e);
    });
  },
  findByTitleLike:function(title,callback){
    noteData.findByTitleLike(title,function(e){
      if(e.length > 0){
        for(var i = 0;i < e.length;i++){
          e[i].createTime = moment(e[i].createTime).format("YYYY-MM-DD");
          e[i].updateTime = moment(e[i].updateTime).format("YYYY-MM-DD");
        }
      }
      callback(e);
    });
  },
  update:function(model,callback){
    noteData.updateById(model._id,{
      title:model.title,
      content:model.content,
      updateTime:new Date().getTime(),
    },function(e){
      if(e > 0){
        callback({code:0,result:"success"});
      }else{
        callback({code:1,result:"fail"});
      }
    });
  },
  deleteById:function(id,callback){
    noteData.deleteById(id,function(e){
      if(e > 0){
        callback({code:0,result:"success"});
      }else{
        callback({code:1,result:"fail"});
      }
    });
  }

}

module.exports = NoteService;
