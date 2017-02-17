$(document).ready(function(){
  var taskTable = $("#task");
  function initTask(){
    restful.get("/task/list").success(function(e){
      console.info(e);
      //taskTable.empty(".task");
      for(var i = 0;i < e.length;i++){
          taskTable.append(renderTask(e[i]));
      }
      taskTable.find(".edit-btn").click(function(){
        var taskRow = $(this).parent().parent();
        var id = taskRow.attr("id");
        var name = taskRow.find(".taskName").val();
        if(name != null){
          restful.put("/task/"+id,{name:name}).success(function(e){

          });
        }
      });
      taskTable.find(".delete-btn").click(function(){
        var taskRow = $(this).parent().parent();
        var id = taskRow.attr("id");
        restful.destroy("/task/"+id).success(function(e){
            taskRow.remove();
        });
      });
    });
  }

  function renderTask(task){
    var createTime = new Date(task.createTime).format("yyyy/MM/dd");
    var startTime;
    var doneTime;
    var status;
    if(task.startTime == null){
      startTime = "";
    }else{
        startTime = new Date(task.startTime).format("yyyy/MM/dd");
    }
    if(task.doneTime == null){
      doneTime = "";
    }else{
        doneTime = new Date(task.doneTime).format("yyyy/MM/dd");
    }

    if(task.status == 0){
      status = "创建";
    }else if(task.status == 1){
      status = "开始";
    }else{
      status = "完成";
    }
    return '<tr id = "' + task._id + '">' +
        '<td><input type = "text" class = "taskName" value = "' + task.name + '" /></td>' +
        '<td>' + createTime + '</td>' +
        '<td>' + startTime + '</td>' +
        '<td>' + doneTime + '</td>' +
        '<td>' + task.takeTime  + ' h</td>' +
        '<td>' + status + '</td>' +
        '<td>' +
            '<button class="edit-btn oper-btn"><i class = "material-icons ">edit</i></button>' +
        '</td>' +
        '<td>' +
        '<button class="delete-btn oper-btn"><i class = "material-icons ">delete</i></button>' +
        '</td>' +
      '</tr>';
  }


  initTask();
});
