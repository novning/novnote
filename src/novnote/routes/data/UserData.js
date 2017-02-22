var DB = require('./DB');

var UserDB = {
  collection:"user",
  filter:function(filter,callback){
      DB.filter(this.collection,filter,callback);
  },
  findOne:function(id,callback){
    DB.findByID(this.collection,id,callback);
  },
  findAll:function(callback){
    DB.findAll(this.collection,callback);
  },
  update:function(condition,updateField,callback){
    DB.update(this.collection,condition,updateField,callback);
  },
  add:function(model,callback){
    DB.add(this.collection,model,callback);
  }

}
module.exports = UserDB;
