$(document).ready(function(){

  $("#name").blur(function(){
    var name = $(this).val();
    if(name != ""){
      restful.asyncGet("/register/valid/"+name).success(function(e){

        if(e.code == 0){
          $("#message").html("用户名可以使用");
        }
      }).error(function(e){
        console.info(e.responseText);
      });
    }

  });

  $("#register").click(function(){
    var name =$("#name").val();
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
