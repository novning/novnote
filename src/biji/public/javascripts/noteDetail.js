$(document).ready(function(){
  var id = $(".container").attr("data-id");
  restful.get("/note/id/"+id).success(function(e){
    $("#title-content").html(e.title);
    $("#content").html(quillGetHTML(e.content));
  });

  function quillGetHTML(inputDelta) {
    var tempCont = document.createElement("div");
    (new Quill(tempCont)).setContents(inputDelta);
    return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
  }

  $("#edit").click(function(){
    window.location.href = "/note/edit/"+id;
  });
  $("#del").click(function(){
    restful.destroy("/note/" + id).success(function(e){
      $.nmessage(e);
      window.location.href = "/note";
    });
  });


});
