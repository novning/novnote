$(document).ready(function(){
  var container = $(".container");
  var tasks;
  // var panel1 = $("#container").bijiPanel({panel:data:cubeListA}).init();
  // var panel2 = $("#container").bijiPanel({data:cubeListB}).init();
  var bijiPanels = [];

  //init data
  function initTask(){
    restful.get("/task").success(function(e){
      tasks = e;
      container.empty();
      console.info(e);
      for(var i = 0;i < e.length;i++){
        var sprint = $('<div class = "sprint" id = "' + e[i].year + '" ></div>');
        container.append(sprint);
        var panel = sprint.bijiPanel({data:e[i]}).init();
        bijiPanels.push(panel);
      }

  });

}

  $("#add-btn").click(function(){
    var name = $(".add-input").val();
    if(name != ""){
      restful.post("/task",{name:name}).success(function(e){
        initTask();
        $(".add-input").val("");
      });
    }
  });

  initTask();

});
