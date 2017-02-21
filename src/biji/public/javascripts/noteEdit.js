$(document).ready(function(){
    var id = $("#save").attr("data-id");
    var quill = new Quill('#quill-container', {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ]
    },
    placeholder: '...',
    theme: 'snow'  // or 'bubble'
  });
  $("#save").click(function(){
    var title = $("#note-title").val();
    if(title == "")return;

    var content = quill.getContents();
    var model = {
      title:title,
      content:content.ops
    };
    if(id != undefined && id != ""){
      model._id = id;
      restful.put("/note",model).success(function(e){
        $.nmessage(e);
        console.info(e);
      });
    }else{
      restful.post("/note",model).success(function(e){
        $.nmessage(e);
        console.info(e);
      });
    }
    window.location.href = "/note";
  });

  function initNoteEdit(){
      if(id != ""){
        restful.get("/note/id/"+id).success(function(e){
          console.info(e);
          $("#note-title").val(e.title);
          quill.setContents(e.content);
        });
      }

  }
  initNoteEdit();


});
