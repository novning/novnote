var DB = require('./DB');

var TaskData = {
  collection:"task",
  add:function(model,callback){
    DB.add(this.collection,model,callback);
  },
  filter:function(filter,callback){
      DB.filter(this.collection,filter,callback);
  },
  findOne:function(filter,callback){
    DB.findByID(this.collection,filter,callback);
  },
  findAll:function(callback){
    DB.findAll(this.collection,callback);
  },
  update:function(condition,updateField,callback){
    DB.update(this.collection,condition,updateField,callback);
  },
  taskDone:function(condition,updateField,callback){
    DB.update(this.collection,condition,updateField,callback);
  },
  updateTakeTime:function(condition,updateField,callback){
    DB.update(this.collection,condition,updateField,callback);
  },
  deleteOne:function(condition,callback){
    DB.deleteOne(this.collection,condition,callback);
  },

}
module.exports = TaskData;
