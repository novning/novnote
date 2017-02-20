var playgroundData = require('../data/PlaygroundData');

var PlaygroundService = {
  findByUserId:function(userId,callback){
    playgroundData.filter({userId:userId},function(docs){
      if(docs != null && docs.length > 0){
        callback(docs[0]);
      }else{
        console.info('add');
        var p = {userId:userId,content:[]};
        playgroundData.add(p,function(insertCount,_id){
          if(insertCount > 0){
            callback(p);
          }else{
            callback(null);
          }
        });
      }
    });
  },
  update:function(model,callback){
    playgroundData.update({userId:model.userId},{content:model.content},function(e){
      if(e > 0){
        callback({code:0,message:"编辑成功！"});
      }else{
        callback({code:1,message:"编辑失败！"});
      }
    });
  }

}

module.exports = PlaygroundService;
