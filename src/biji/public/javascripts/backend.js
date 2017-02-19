$(document).ready(function(){
  var taskTable = $("#task");
  function initTask(){
    $("#task tr[class=task]").remove();
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

    if(task.startTime == null){
      startTime = "";
    }else{
        startTime = new Date(task.startTime).format("yyyy/MM/dd");
    }


    return '<tr id = "' + task._id + '" class = "task">' +
        '<td><input type = "text" class = "taskName" value = "' + task.name + '" /></td>' +
        '<td>' + createTime + '</td>' +
        '<td>' + startTime + '</td>' +
        '<td>' + task.updateTime + '</td>' +
        '<td>' + task.takeTime  + ' h</td>' +
        '<td>' +
            '<button class="edit-btn oper-btn"><i class = "material-icons ">edit</i></button>' +
        '</td>' +
        '<td>' +
        '<button class="delete-btn oper-btn"><i class = "material-icons ">delete</i></button>' +
        '</td>' +
      '</tr>';
  }
  $("#updatePwdBtn").click(function(){
    var oldPwd = $("#oldPwd");
    var newPwd = $("#newPwd");
    var newPwdConfirm = $("#newPwdConfirm");
    if(oldPwd.val() != "" && newPwd.val() != "" && newPwd.val() == newPwdConfirm.val()){
      restful.put("/user",{oldPwd:oldPwd.val(),newPwd:newPwd.val()}).success(function(e){
        console.info(e);
        oldPwd.val("");
        newPwd.val("");
        newPwdConfirm.val("");
      }).error(function(e){
        console.info(e);
      });
    }
  });


});
