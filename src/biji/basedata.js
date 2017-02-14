//node basedata.js

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://172.16.18.130:27017/ningbiji';

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

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   //此处需要MD5加密
//   var data = [{name:"admin",password:"admin"}];
//   insertDocuments(db,"user", data,function() {
//     db.close();
//   });
// });

// user id name password
// mastery id name order
// point id name createTime startTime doneTime total unit process order priority masteryId
// pointHistory id pointId updateScore
// experience id title content createTime updateTime itemId

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  //此处需要MD5加密
  // var mastery = [{name:"计算机",order:"0"},{name:"English",order:"1"}];
  // insertDocuments(db,"mastery", mastery,function() {
  //   db.close();
  // });

  var mastery = [{name:"计算机原理",createTime:new Date(),updateTime:null,doneTime:null,total:100,process:0,order:0,remarks:"",masteryId:'589f006749764fca943ed013'}];
  insertDocuments(db,"point", mastery,function() {
    db.close();
  });
});
