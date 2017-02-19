$(document).ready(function(){
  $(".delTask").click(function(){
    return;
    var _id = $(this).attr("id");
    restful.destroy("/task/"+_id).success(function(e){
      console.info(e);
    });
  });

  $(".del").click(function(){
    return;
    var _id = $(this).attr("id");
    restful.destroy("/taskDetail/"+_id).success(function(e){
      console.info(e);
    });
  });
});
