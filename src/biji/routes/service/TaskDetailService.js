var moment = require('moment');
var taskData = require('../data/taskData');
var taskDetailData = require("../data/taskDetailData");

var TaskDetailService = {
  findByTaskId:function(id,callback){
    var result = {};
    taskData.findOne(id,function(task){
      if(task != null){
        taskDetailData.filter({taskId:id},function(docs){
          docs.sort(function(a,b){return a.createTime>b.createTime?-1:1});;
          for(var i = 0;i < docs.length;i++){
            docs[i].createTime = moment(docs[i].createTime).format("YYYY-MM-DD");
          }

          result._id = task._id;
          result.name = task.name;
          result.startTime = moment(task.startTime).format("YYYY-MM-DD");
          result.updateTime = moment(task.updateTime).format("YYYY-MM-DD");
          result.takeTime = task.takeTime;
          result.updateCount = docs.length;
          result.detail = docs;
          callback(result);
        });
      }else{
        callback(result);
      }
    });
  },
  deleteById:function(id,callback){
    taskDetailData.deleteOne({_id:id},function(e){
      if(e > 0){
        callback({code:0,result:"success"});
      }else{
        callback({code:1,result:"fail"});
      }
    });

  }
}

module.exports = TaskDetailService;
