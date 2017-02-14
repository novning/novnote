$(document).ready(function(){

  function refreshMastery(masteries){
    $("#mastery").html('');
    $.each(masteries,function(i,v){
        $("#mastery").append($('<span id = "' + v._id + '" class = "mastery">' + v.name + '</span>'));
    });
  }
  restful.get("/mastery").success(function(e){
    refreshMastery(e);
  });

  $("#mastery .mastery").click(function(){
    restful.get("/point/"+$(this).attr("id")).success(function(e){
      $.each(e,function(i,v){
          $("#point").append($('<div id = "' + v._id + '" class = "point">' + v.name + '</div>'));
      });
      $(".point").click(function(){
        console.info("hehe");
      });
      $("#point").show();
    });
  });

  $("#point").hide();

});
