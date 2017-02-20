//node basedata.js

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var secret = require('./routes/common/secret');
var DB = require('./routes/data/DB');


//启动mogodb mongod --dbpath=/data


  DB.clearCollection("user");
  DB.clearCollection("task");
  DB.clearCollection("taskDetail");
  DB.clearCollection("playground");
  DB.clearCollection("note");

secret.md5("admin",function(secPwd){
  var data = {name:"admin",password:secPwd,createTime:new Date().getTime()};
  DB.add("user",data,function(e){});
});
