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
        console.info(e);
        initNote();
      });
    });
  }

  function renderNote(note){
    return '<div class = "panel">' +
      '<div class = "title"><a href = "/note/detail/' + note._id + '">' + note.title +  '</a></div>' +
      '<div class = "oper" data-id = "' + note._id + '">' +
      '<div class = "createTime">创建时间：' + note.createTime + '</div>'+
      '<div class = "updateTime">更新时间：' + note.updateTime + '</div>'+
      '&nbsp;<a href = "/note/edit/' + note._id + '" class = "oper-link edit">编辑</a>&nbsp;' +
      '&nbsp;<a href = "#" class = "oper-link del">删除</a></div>' +
    '</div>';
  }

  initNote();
});
