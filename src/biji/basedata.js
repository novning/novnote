//node basedata.js

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var secret = require('./routes/common/Secret');

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
  secret.md5("admin",function(secPwd){
    var data = [{name:"admin",password:secPwd}];
    insertDocuments(db,"user", data,function() {
      db.close();
    });
  })

  //task
  clearCollections(db,"task",function(){db.close();});
  // var date = new Date().getTime();
  // var date2016 = new Date(2016,1,3,10,52,03).getTime();
  // var task = [
  //   {name:"深入理解计算机系统1",createTime:date,startTime:null,updateTime:date,takeTime:0,order:2,userId:null},
  //   {name:"深入理解计算机系统2",createTime:date,startTime:null,updateTime:date,takeTime:0,order:1,userId:null},
  //   {name:"深入理解计算机系统3",createTime:date,startTime:null,updateTime:date,takeTime:0,order:0,userId:null},
  //   {name:"跑步100公里",createTime:date2016,startTime:null,updateTime:date2016,takeTime:0,order:1,userId:null}];
  //
  // insertDocuments(db,"task", task,function() {
  //   db.close();
  // });

  //taskDetail
  clearCollections(db,"taskDetail",function(){db.close();});
  //playground
  clearCollections(db,"playground",function(){db.close();});
});
