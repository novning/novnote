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
    console.info(e);
    for(var i = 0;i < e.length;i++){
      var year = $('<ul id = "' + e[i]._id + '"><div class = "note-year">'+e[i]._id+'</div></ul>');
      for(var j = 0;j < e[i].content.length;j++){
          year.append(renderNote(e[i].content[j]));
      }
      container.append(year);
    }
  }

  function renderNote(note){
    return '<li><time>' + new Date(note.updateTime).format("MM-hh") + '</time>—' +
    '<a href = "/note/detail/' + note._id + '">' + note.title +  '</a></div>' +
    '</li>';
  }

  initNote();
});
