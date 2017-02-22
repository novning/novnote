var DB = require('./DB');

var schema = {
  _id:null,
  name:null,
  createTime:null,
  startTime:null,
  doneTime:null,
  updateTime:null,
  takeTime:null,
  order:0
}

var TaskData = {
  collection:"task",
  add:function(model,callback){
    DB.add(this.collection,model,callback);
  },
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
  updateTakeTime:function(condition,updateField,callback){
    DB.update(this.collection,condition,updateField,callback);
  },
  deleteOne:function(condition,callback){
    DB.deleteOne(this.collection,condition,callback);
  }

}
module.exports = TaskData;
