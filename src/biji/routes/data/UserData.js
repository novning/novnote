var DB = require('./DB');


var UserData = {
  collection:"user",
  filter:function(filter,callback){
      DB.filter(this.collection,filter,function(docs){
        callback(docs);
      });
  },
  update:function(condition,updateField,callback){
    DB.update(this.collection,condition,updateField,callback);
  }

}
module.exports = UserData;
