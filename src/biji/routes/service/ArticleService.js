var articleData = require('../data/ArticleData');

var articleService = {
  findAll:function(callback){
    articleData.findAll(callback);
  },
  add:function(model,callback){
    var createTime = new Date().getTime();
    model.createTime = createTime;
    model.updateTime = createTime;
    articleData.add(model,function(insertCount){
      if(insertCount > 0){
        callback({code:0,result:"success"});
      }else{
        callback({code:1,result:"fail"});
      }
    });
  },
  findOne:function(){

  }

}

module.exports = articleService;
