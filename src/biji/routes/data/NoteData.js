var DB = require('./DB');

var schema = {
  _id:null,
  title:null,
  content:null,
  createTime:null,
  updateTime:null,
  userId:null
}


var NoteData = {
  collection:"note",
  add:function(model,callback){
    DB.add(this.collection,model,callback);
  },
  filter:function(filter,callback){
    DB.filter(this.collection,filter,callback);
  },
  findById:function(filter,callback){
    DB.findByID(this.collection,filter,callback);
  },
  filterField:function(filter,field,callback){
    DB.filterField(this.collection,filter,field,callback);
  },
  findByTitleLike:function(title,callback){
    var regex = eval('/' + title + '/');
    DB.findByRegex(this.collection,{'title':{$regex:regex}},callback);
  },
  findAll:function(callback){
    DB.findAll(this.collection,callback);
  },
  update:function(condition,updateField,callback){
    DB.update(this.collection,condition,updateField,callback);
  },
  updateById:function(id,updateField,callback){
    DB.update(this.collection,{_id:id},updateField,callback);
  },
  deleteById:function(id,callback){
    DB.deleteById(this.collection,id,callback);
  },
  deleteOne:function(condition,callback){
    DB.deleteOne(this.collection,condition,callback);
  }

}
module.exports = NoteData;
