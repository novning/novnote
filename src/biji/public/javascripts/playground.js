$(document).ready(function(){
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
    var content = quill.getContents();
    var model = {
      content:content.ops
    };
    restful.put("/playground",model).success(function(e){
      $.nmessage(e);
      console.info(e);
    });

  });
  $("#add-btn").click(function(){
    var name = $(".biji-normal-input").val();
    if(name != ""){
      restful.post("/task",{name:name}).success(function(e){
        $.nmessage(e);
        $(".biji-normal-input").val("");
      });
    }
  });

  function initPlayground(){
      restful.get("/playground/content").success(function(e){
        console.info(e);
        quill.setContents(e.content);
      });
  }
  initPlayground();


});
