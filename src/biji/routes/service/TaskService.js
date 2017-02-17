
var taskData = require('../data/taskData');

var taskService = {
  findAll:function(callback){
    taskData.findAll(function(tasks){
      var processData = [];
      if(tasks && tasks.length > 0){
        //group by updateTime.getFullYear
        for(var i = 0;i < tasks.length;i++){
          var task = tasks[i];
          var taskUpdateYear = new Date(task.updateTime).getFullYear();
          if(!processData[taskUpdateYear]){
            processData[taskUpdateYear] = [];
          }
          processData[taskUpdateYear].push(task);
        }
        //format
        var result = [];
        for(var t in processData){
          var sortProcessData = processData[t].sort(function(a,b){return a.order>b.order?-1:1});
          result.push({year:t,task:sortProcessData});

        }
        //order by year
        result.sort(function(a,b){return a.year>b.year?-1:1});
      }
      callback(result);
    });
  },
  findList:function(callback){
    taskData.findAll(callback);
  },
  add:function(model,callback){
    var createTime = new Date().getTime();
    model.createTime = createTime;
    model.updateTime = createTime;
    model.takeTime = 0;
    model.status = 0;
    model.order = createTime;
    taskData.add(model,function(insertCount){
      if(insertCount > 0){
        callback({code:0,result:"success"});
      }else{
        callback({code:1,result:"fail"});
      }
    });
  },
  update:function(id,model,callback){
    taskData.update({_id:id},model,function(e){
      if(e > 0){
        callback({code:0,result:"success"});
      }else{
        callback({code:1,result:"fail"});
      }
    });
  },
  taskDone:function(id,callback){
    var doneTime = new Date().getTime();
    taskData.taskDone({_id:id},
      {status:2,
        updateTime:doneTime,
      doneTime:doneTime},function(e){
        if(e > 0){
          callback({code:0,result:"success",value:doneTime});
        }else{
          callback({code:1,result:"fail",value:""});
        }
      });
  },
  updateTakeTime:function(id,value,callback){
    taskData.findOne(id,function(docs){
      if(docs != null){
        var orginalValue = parseFloat(docs.takeTime);
        var v = parseFloat(value);
        var updateValue = orginalValue + v;
        var updateField = {takeTime:updateValue};
        if(docs.startTime == null){
          updateField.startTime = new Date().getTime();
          updateField.status = 1;
        }
        if(updateValue < 0){
            updateValue = 0;
        }
        taskData.updateTakeTime({_id:id},updateField,
          function(updateResult){
            var callbackParam = {};
            if(updateResult > 0){
              callbackParam.code = 0;
              callbackParam.result = "success";
              callbackParam.value = updateValue;
            }else{
              callbackParam.code = 1;
              callbackParam.result = "fail";
              callbackParam.value = orginalValue;
            }
            if(updateField.startTime){
              callbackParam.startTime = updateField.startTime;
            }
            callback(callbackParam);
        });
      }
    });
  },
  updateOrder:function(tasks,callback){
    var order = tasks.length - 1;
    for(var i = 0;i < tasks.length;i++){
      var task = tasks[i];
      console.info(task.id);
      taskData.update({_id:task.id},{order:order},
        function(updateResult){}
      );
      order--;
    }
    callback({code:0,result:"success"});
  },
  deleteOne:function(id,callback){
    taskData.deleteOne({_id:id},function(e){
      if(e > 0){
        callback({code:0,result:"success"});
      }else{
        callback({code:1,result:"fail"});
      }
    });
  }
}

module.exports = taskService;
