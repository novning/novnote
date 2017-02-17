var DB = require('./DB');


var ArticleData = {
  collection:"article",
  filter:function(filter,callback){
      DB.find(this.collection,filter,function(docs){
        callback(docs);
      });
  }

}
module.exports = ArticleData;
