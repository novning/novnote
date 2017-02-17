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
    if(title != "" && content.ops.length > 0){

      var model = {
        title:title,
        content:content.ops
      };

      restful.put("/article",model).success(function(e){
        console.info(e);
      });
    }

  });

  function initArticles(){
      var container = $("#article-container");
      restful.get("/article/list").success(function(e){
        console.info(e);
        $.each(e,function(i,v){
            container.append(articleRender(v));
        });

      });
  }

  function articleRender(article){
    var content = "";
    for(var i = 0;i < article.content.length;i++){
        content += article.content[i].insert;
    }
    console.info(content);
    return '<div class = "article">' +
            '<div class = "title">' +
            article.title +
            '</div>' +
            '<textarea class = "content">' +
              content +
            '</textarea>' +
            '</div>';

  }

  initArticles();


});
