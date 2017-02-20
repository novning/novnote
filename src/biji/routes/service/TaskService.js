
var taskData = require('../data/taskData');
var taskDetailData = require("../data/taskDetailData");

var TaskService = {
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
  findByUserId:function(userId,callback){
    taskData.filter({userId,userId},function(tasks){
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
  add:function(model,callback){
    var createTime = new Date().getTime();
    model.createTime = createTime;
    model.updateTime = createTime;
    model.takeTime = 0;
    model.order = createTime;
    taskData.add(model,function(insertCount,_id){
      if(insertCount > 0){
        callback({code:0,message:"创建成功！"});
      }else{
        callback({code:1,message:"创建失败！"});
      }
    });
  },
  update:function(id,model,callback){
    taskData.update({_id:id},model,function(e){
      if(e > 0){
        callback({code:0,message:"编辑成功！"});
      }else{
        callback({code:1,message:"编辑失败！"});
      }
    });
  },
  updateTime:function(model,callback){
    var time = new Date().getTime();
    taskData.findOne(model.id,function(docs){
      if(docs != null){
        var v = parseFloat(model.takeTime);
        var taskDetail = {
          taskId:model.id,
          createTime:time,
          takeTime:v,
          content:model.content
        }
        taskDetailData.add(taskDetail,function(insertResult,_id){
          if(insertResult > 0){
            var orginalValue = parseFloat(docs.takeTime);
            var updateValue = orginalValue + v;
            if(updateValue < 0){
                updateValue = 0;
            }
            var updateField = {takeTime:updateValue,updateTime:time};
            if(docs.startTime == null){
              updateField.startTime = new Date().getTime();
            }

            taskData.updateTakeTime({_id:model.id},updateField,function(e){
                if(e > 0){
                  callback({code:0,message:"更新成功！"});
                }else{
                  callback({code:1,message:"更新失败！"});
                }
            });
          }
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
    callback({code:0,message:"排序完成！"});
  },
  deleteById:function(id,callback){
    taskData.deleteOne({_id:id},function(e){
      if(e > 0){
        taskDetailData.deleteMany({taskId:id},function(detailResult){
          callback({code:0,message:"删除成功！"});
        });
      }else{
        callback({code:1,message:"删除失败！"});
      }
    });
  }
}

module.exports = TaskService;
