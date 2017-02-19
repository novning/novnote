$(document).ready(function(){
  function login(){
    var name = $("#name").val();
    var password = $("#password").val();
    var user = {name:name,password:password};
    restful.put("/user/login",user).success(function(e){
      if(e.code == 0){
        window.location = "/";
      }else{
        $("#message").html(e.result);
      }
    });
  }

  document.onkeydown = function(e){
    var ev = document.all ? window.event : e;
    if(ev.keyCode==13) {
      login();
    }
}

  $("#login").click(login);


});
