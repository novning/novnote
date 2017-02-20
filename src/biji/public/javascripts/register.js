$(document).ready(function(){
  var nameInput = $("#name");
  nameInput.blur(function(){

    var name = $(this).val();
    if(name != ""){
      if(!regex.acountValid(name)){
        $.nmessage({code:1,message:"字母，数字，下划线"});
        return;
      }else{
      }
      restful.asyncGet("/register/valid/"+name).success(function(e){
        if(e.code == 0){
          $.nmessage(e);
        }
      }).error(function(e){
        console.info(e.responseText);
      });
    }else{
        $.nmessage({code:1,message:"请输入用户名"});
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
                $.nmessage(e1);
                if(e1.code == 0){
                  setTimeout(function(){
                      window.location.href = "/login";
                  },3000);
                }else{
                }
              });
            }
          }else{
            $.nmessage(e);
          }
        });
    }

  });
});
