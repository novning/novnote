var noteData = require('../data/NoteData');
var moment = require('moment');

var NoteService = {
  add:function(model,callback){
    var time = new Date();
    model.createYear = time.getFullYear();
    model.createTime = time.getTime();
    model.updateTime = time.getTime();
    noteData.add(model,function(e,_id){
      if(e > 0){
        callback({code:0,message:"创建成功！"});
      }else{
        callback({code:1,message:"创建失败！"});
      }
    });
  },
  findByUserId:function(userId,callback){
    noteData.filterFieldAndGroupAndSort(userId,function(docs){
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
        callback({code:0,message:"编辑成功！"});
      }else{
        callback({code:1,message:"编辑失败！"});
      }
    });
  },
  deleteById:function(id,callback){
    noteData.deleteById(id,function(e){
      if(e > 0){
        callback({code:0,message:"删除成功！"});
      }else{
        callback({code:1,message:"删除失败！"});
      }
    });
  }

}

module.exports = NoteService;
