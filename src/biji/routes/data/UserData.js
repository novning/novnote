var DB = require('./DB');


var UserData = {
  collection:"user",
  filter:function(filter,callback){
      DB.filter(this.collection,filter,function(docs){
        callback(docs);
      });
  }

}
module.exports = UserData;
