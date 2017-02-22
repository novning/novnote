(function($){
  $.extend({
    nmessage:function(message){
      var mess = $('<div></div>');
      mess.attr("id","nmess-"+new Date().getTime())
      mess.html(message.message);
      mess.css({
        "position":"fixed",
        "top":"0","left":"0","right":"0",
        "font-size":"2em",
        "height":"2em",
        "line-height":"2em",
        "text-align":"center",
        "opacity":"0.9","zIndex":"99"});
      if(message.code == 0){
        mess.css({"background-color":"#4cd069","color":"#fff"});
      }else if(message.code == 1){
        mess.css({"background-color":"#d04c4c","color":"#fff"});
      }
      $("body").append(mess);
      mess.fadeIn(1000,function(){
        mess.fadeOut(2000,function(){
          mess.remove();
        });
      });
    }
  });
})(jQuery);
