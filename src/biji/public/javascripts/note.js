$(document).ready(function(){
  var container = $(".note-container");

  $("#search").click(function(){
    var title = $("#search-input").val();
    if(title == ""){
      initNote();
    }else{
      restful.put("/note/search/",{title:title}).success(function(e){
        processData(e);
      });
    }
  });
  function initNote(){
    restful.get("/note/list").success(function(e){
      processData(e);
    });
  }

  function processData(e){
    container.empty();
    for(var i = 0;i < e.length;i++){
      container.append(renderNote(e[i]));
    }
    $(".del").click(function(){
      var id = $(this).parent().attr("data-id");
      restful.destroy("/note/" + id).success(function(e){
        $.nmessage(e);
        initNote();
      });
    });
  }

  function renderNote(note){
    return '<div class = "panel">' +
      '<div class = "title">' +
      '<a href = "/note/detail/' + note._id + '">' + note.title +  '</a></div>' +
      '<div class = "time-message" data-id = "' + note._id + '">' +
      '<span >' + note.updateTime + '&nbsp;</span>'+
      '<a href = "/note/edit/' + note._id + '" class = "edit">' +
      '<i class = "material-icons">edit</i>' +
      '</a>&nbsp;' +
      '<a href = "#" class = "del">' + '<i class = "material-icons">delete</i>' +
      '</a></div>' +
    '</div>';
  }

  initNote();
});
