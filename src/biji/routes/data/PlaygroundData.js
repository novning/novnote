var DB = require('./DB');

var schema = {
  _id:null,
  content:null,
  userId:null
}


var PlaygroundData = {
  collection:"playground",
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
  }

}
module.exports = PlaygroundData;
