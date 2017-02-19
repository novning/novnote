(function($) {
    $.fn.bijiPanel = function(opt) {
        var container = this;
        var defaults = {
            'color': 'red',
            'fontSize': '12px'
        };
        var options = $.extend(defaults, opt);
        var data = options.data;
        var isOrdering = false;
        function timeRender(year){
          return '<div class = "dimension timeline" >' +
                      '<i class = "material-icons md-40">hourglass_empty</i>' +
                      '<span class = "sprint-year">' + year + '</span>'+
                      '<div class = "orderSetting">' +
                      '<button class="task-btn btn-orderSetting">排序</span>' +
                  '</div>';
        }
        function taskRender(index,data){
          var str = '<div class = "task_panel" id = "' + data._id + '" index = "' + index + '">' +
                '<div class = "title">' +
                  data.name +
                '</div>' +
                '<div class = "record">' +
                  '<a href = "/taskDetail/' + data._id + '" >记录</a>' +
                '</div>' +

                '<div class = "time-panel">' +
                    '<button class="task-btn addTime" data-time = "7">7</button><button class="task-btn addTime" data-time = "5">5</button><button class="task-btn addTime" data-time="3">3</button><button class="task-btn addTime" data-time="2">2</button><button class="task-btn addTime" data-time="1">1</button>'+
                '</div>' +

                '<div class = "log-panel">' +
                  '<div>' +
                  '<textarea class = "log-content"></textarea>' +
                  '</div>' +
                  '<div class = "submit-oper">' +
                  '<button class="submit-btn cancel">取消</button>' +
                  '<button class="submit-btn submitUpdate">提交</button>' +
                  '</div>' +
                '</div>' +
              '</div>';
          return str;
        }
        function addTimeClick(){
          var card = $(this).parent().parent();
          if($(this).hasClass("time-checked")){
              $(this).removeClass("time-checked");
          }else{
            $(this).addClass("time-checked");
          }
          var isChecked = false;
          card.find(".addTime").each(function(i,v){
            if($(v).hasClass("time-checked")){
              isChecked = true;
            }
          });
          if(isChecked){
            card.find(".log-panel").show();
            if(!card.find(".log-panel").is(":hidden")){

            }
          }else{
            card.find(".log-panel").hide();
          }
        }
        function bingCRUDEvent(){

          container.find(".addTime").bind("click",addTimeClick);
          container.find(".submitUpdate").click(function(){
            var that = this;
            var card = $(this).parent().parent().parent();
            var taskId = card.attr("id");
            var updTime = 0;
            var addTimeGroup = card.find(".addTime");
            addTimeGroup.each(function(i,v){
              if($(v).hasClass("time-checked")){
                updTime += parseFloat($(v).attr("data-time"));
              }
            });
            var content = card.find(".log-content");
            var contentVal = "";
            if(content.val().length > 200){
              contentVal = content.val().substr(0,200);
            }else{
              contentVal = content.val();
            }
            var model = {id:taskId,content:contentVal,takeTime:updTime};
            restful.put("/task/updateTime/",model).success(function(e){
              console.info(e);
              content.val("");
              card.find(".log-panel").hide();
              addTimeGroup.each(function(i,v){
                $(v).removeClass("time-checked");
              });

            });
          });
          container.find(".cancel").click(function(){
            var that = this;
            var card = $(this).parent().parent().parent();
            var addTimeGroup = card.find(".addTime");
            card.find(".log-panel").hide();
            addTimeGroup.each(function(i,v){
              if($(v).hasClass("time-checked")){
                $(v).removeClass("time-checked");
              }
            });
            var content = card.find(".log-content");
            content.val("");
          });

          container.find(".btn-orderSetting").click(function(){
            if(isOrdering){
              container.find(".task_panel").off("mousedown");
              container.find(".task_panel").removeAttr("style");
              container.css("height","");
              isOrdering = false;
              $(this).text("排序");
              var updateTask = [];
              container.find(".task_panel").each(function(i,v){
                updateTask.push({id:$(v).attr("id")});
              });
              restful.put("/task/order",updateTask).success(function(e){
                console.info(e);
              });
              container.find(".addTime").bind("click",addTimeClick);
            }else{
              isOrdering = true;
              bindDragEvent($(this).parent());
              $(this).text("完成");


              var addTimeGroup = container.find(".addTime");
              container.find(".log-panel").hide();
              addTimeGroup.each(function(i,v){
                if($(v).hasClass("time-checked")){
                  $(v).removeClass("time-checked");
                }
              });
              var content = container.find(".log-content");
              content.val("");
              container.find(".addTime").unbind("click",addTimeClick);
            }
          });
        }
        function bindDragEvent(panels) {
            console.info("bind event");

            container.find(".task_panel").on('mousedown', function(e) {
                var selectCube = $(this);

                var clickPosX = e.clientX - selectCube.position().left;
                var clickPosY = e.clientY - selectCube.position().top;

                var cubes = {};

                var index = parseInt(selectCube.attr("index"));
                var swapIndex;
                var temp = index;
                $(selectCube).css({'opacity':0.9,'zIndex':1});
                container.css("height",container.height());
                $(container.find(".task_panel").get().reverse()).each(function(i, v) {
                  $(v).css({
                      'position': 'absolute',
                      'left': $(v).position().left + 'px',
                      'top': $(v).position().top + 'px',
                      'width':$(v).outerWidth(),
                      'height':$(v).outerHeight(),
                      'margin':$(v).css("margin"),
                      'padding':$(v).css('padding')
                  });
                    cubes[$(v).attr("index")] = {
                        left: $(v).position().left,
                        top: $(v).position().top,
                        right: $(v).position().left + $(v).outerWidth(),
                        bottom: $(v).position().top+ $(v).outerHeight()
                    };
                });

                $(document).on('mousemove', function(e) {
                    var selectCubeLeft = e.clientX - clickPosX;
                    var selectCubeTop = e.clientY - clickPosY;
                    selectCube.css({
                        'left': selectCubeLeft + 'px',
                        'top': selectCubeTop + 'px'
                    });
                    var currentPosX = e.clientX;
                    var currentPosY = e.clientY;

                    for (var i in cubes) {
                        if (currentPosX > cubes[i].left &&
                            currentPosX < cubes[i].right &&
                            currentPosY > cubes[i].top &&
                            currentPosY < cubes[i].bottom &&
                            index != i) {
                            swapIndex = parseInt(i);
                            var moveTo = function(num, j) {
                                var c = $('.task_panel[index=' + j + ']');
                                $(c).stop();
                                var t = cubes[j + num];
                                c.animate({left: t.left,top: t.top}, 'fast');
                                c.attr('index', j + num);
                                temp = j+num;
                            }
                            if (index > swapIndex) {
                                for (var j = index - 1; j >= swapIndex; j--) {
                                    moveTo(1, j);
                                }
                            } else {
                                for (var j = index + 1; j < swapIndex + 1; j++) {
                                  console.info("loop");
                                    moveTo(-1, j);
                                }
                            };
                            index = swapIndex;
                            selectCube.attr('index', swapIndex); //变换_this的index
                        } else {

                        }
                    }
                });
                $(document).on('mouseup', function() {
                    $(this).off('mousemove');
                    $(this).off('mouseup');
                    selectCube.animate({
                            left: parseInt(cubes[swapIndex].left),
                            top: parseInt(cubes[swapIndex].top)
                        },'fast',
                        function() {
                          if(temp != swapIndex){
                            var swapPanel = container.find('.task_panel[index=' + temp+ ']');
                            if (temp > swapIndex) {
                              selectCube.insertBefore(swapPanel);
                            } else {
                              selectCube.insertAfter(swapPanel);
                            };
                          }
                        });
                });
            });
        }
        var _bijiPanel = {
            test: function() {
                console.info("haha");
                return this;
            },
            init: function() {
                container.append(timeRender(data.year));
                $.each(data.task,function(i,v){
                    container.append(taskRender(i,v));
                });
                bingCRUDEvent();
                return this;
            }

        }
        return _bijiPanel;
    }
})(jQuery);
