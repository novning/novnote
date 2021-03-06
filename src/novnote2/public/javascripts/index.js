$(document).ready(function(){
  var container = $(".content-container");
  var tasks;
  var novnotePanels = [];

  //init data
  function initTask(){
    restful.get("/task").success(function(e){
      tasks = e;
      container.empty();
      for(var i = 0;i < e.length;i++){
        var sprint = $('<div class = "sprint" id = "' + e[i].year + '" ></div>');
        container.append(sprint);
        var panel = sprint.novnotePanel({data:e[i]}).init();
        novnotePanels.push(panel);
      }
  }).error(function(e){
    console.info(e);
  });
}
  $("#add-btn").click(function(){
    var name = $(".novnote-normal-input").val();
    if(name != ""){
      restful.post("/task",{name:name}).success(function(e){
        console.info(e);
        $.nmessage(e);
        initTask();
        $(".novnote-normal-input").val("");
      });
    }
  });

  initTask();

});
