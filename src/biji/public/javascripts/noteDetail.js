$(document).ready(function(){
  var id = $(".container").attr("data-id");
  restful.get("/note/"+id).success(function(e){
    $("#title").html(e.title);
    $("#content").html(quillGetHTML(e.content));
  });

  function quillGetHTML(inputDelta) {
    var tempCont = document.createElement("div");
    (new Quill(tempCont)).setContents(inputDelta);
    return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
  }
});
