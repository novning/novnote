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
    var title = $("#title").val();
    var content = quill.getContents();
    console.info(title);
    console.info(content);
  });

  function initArticles(){
      //restful.get("/article").success(function(e){
        //$("#article-panel")
      //});
  }

  initArticles();


});
