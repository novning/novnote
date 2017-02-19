$(document).ready(function(){
  var taskTable = $("#task");

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
