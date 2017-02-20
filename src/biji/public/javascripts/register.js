$(document).ready(function(){
  var nameInput = $("#name");
  nameInput.blur(function(){

    var name = $(this).val();
    if(name != ""){
      if(!regex.regexValid(name,regex.accountRegex)){
        $("#message").html("字母，数字，下划线");
        return;
      }else{
        $("#message").html('');
      }
      restful.asyncGet("/register/valid/"+name).success(function(e){
        if(e.code == 0){
          $("#message").html("用户名可以使用");
        }
      }).error(function(e){
        console.info(e.responseText);
      });
    }else{
        $("#message").html("请输入用户名");
    }

  });

  $("#register").click(function(){
    var name =nameInput.val();
    var password = $("#password").val();
    var passwordConfirm = $("#passwordConfirm").val();

    if(name != ""){
        restful.get("/register/valid/"+name).success(function(e){
          if(e.code == 0){
            if(name != "" && password != "" && password == passwordConfirm){
              var model = {name:name,password:password};
              restful.post("/register",model).success(function(e1){
                if(e1.code == 0){
                  $("#message").html("注册成功！");
                  setTimeout(function(){
                      window.location.href = "/login";
                  },3000);

                }else{
                  $("#message").html(e1.message);
                }
              });
            }
          }else{
            $("#message").html("用户名已经存在");
          }
        });
    }

  });
});
