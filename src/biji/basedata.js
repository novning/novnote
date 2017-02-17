//node basedata.js

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

//启动mogodb mongod --dbpath=/data

// Connection URL
var url = 'mongodb://172.16.18.129:27017/ningbiji';

var insertDocuments = function(db,collection,data,callback) {
  // Get the documents collection
  var collection = db.collection(collection);
  // Insert some documents
  collection.insertMany(data, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted " + result.result.n + " documents into the collection");
    callback(result);
  });
}
var clearCollections = function(db,collection,callback){
  var col = db.collection(collection);
  col.deleteMany({});
}


// user id name password
//
// task id name createTime startTime doneTime takeTime status order
// taskHistory id name createTime startTime doneTime takeTime status order
// taskStatus id key value(开始，完成)
//
// article id title content createTime updateTime;

MongoClient.connect(url, function(err, db) {

  console.log("Connected successfully to server");

  //user
  clearCollections(db,"user",function(){db.close();});
  //此处需要MD5加密
  var data = [{name:"admin",password:"admin"}];
  insertDocuments(db,"user", data,function() {
    db.close();
  });

  //taskStatus
  clearCollections(db,"taskStatus",function(){db.close();});
  var taskStatus = [{key:0,value:"创建"},{key:1,value:"开始"},{key:1,value:"完成"}];
  insertDocuments(db,"taskStatus", taskStatus,function() {
    db.close();
  });

  //task
  clearCollections(db,"task",function(){db.close();});
  var date = new Date().getTime();
  var date2016 = new Date(2016,1,3,10,52,03).getTime();
  var task = [
    {name:"深入理解计算机系统1",createTime:date,startTime:null,doneTime:null,updateTime:date,takeTime:0,status:0,order:2},
    {name:"深入理解计算机系统2",createTime:date,startTime:null,doneTime:null,updateTime:date,takeTime:0,status:0,order:1},
    {name:"深入理解计算机系统3",createTime:date,startTime:null,doneTime:null,updateTime:date,takeTime:0,status:0,order:0},
    {name:"跑步100公里",createTime:date2016,startTime:null,doneTime:null,updateTime:date2016,takeTime:0,status:0,order:1}];

  insertDocuments(db,"task", task,function() {
    db.close();
  });
});
