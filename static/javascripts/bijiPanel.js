(function($) {
    $.fn.bijiPanel = function(opt) {
        var container = this;
        var taskYear;
        var taskList;
        var defaults = {'test': '0'};
        var options = $.extend(defaults, opt);
        var data = options.data;
        var isOrdering = false;
        function timeRender(year){
          return '<i class = "material-icons md-2">hourglass_empty</i>' +
                      '<span class = "sprint-year">' + year + '</span>'+
                      '<div class = "order-setting">' +
                      '<button class="biji-fff-btn btn-order-setting">排序</span>';
        }
        function taskRender(index,data){
          var n = "";
          if(data.name.length > 15){
            n = data.name.substr(0,15) + "...";
          }else{
            n = data.name;
          }
          var str = '<div class = "panel" id = "' + data._id + '" index = "' + index + '">' +
                '<div class = "title" title = "' + data.name + '">' +
                  n +
                '</div>' +
                '<div class = "record">' +
                  '<a href = "/taskDetail/' + data._id + '" >记录</a>' +
                '</div>' +
                '<div class = "time-panel">' +
                    '<button class="biji-fff-btn addTime" data-time = "7">7</button><button class="biji-fff-btn addTime" data-time = "5">5</button><button class="biji-fff-btn addTime" data-time="3">3</button><button class="biji-fff-btn addTime" data-time="2">2</button><button class="biji-fff-btn addTime" data-time="1">1</button>'+
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
              $.nmessage(e);
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

          container.find(".btn-order-setting").click(function(){
            if(isOrdering){
              container.find(".panel").off("mousedown");
              container.find(".panel").removeAttr("style");
              container.css("height","");
              isOrdering = false;
              $(this).text("排序");
              var updateTask = [];
              container.find(".panel").each(function(i,v){
                updateTask.push({id:$(v).attr("id")});
              });
              restful.put("/task/order",updateTask).success(function(e){
                console.info(e);
                $.nmessage(e);
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
            container.find(".panel").on('mousedown', function(e) {
              //$(document.body).css({"overflow-x":"hidden","overflow-y":"hidden"});
                var selectCube = $(this);
                var clickPosX = e.clientX - selectCube.position().left;
                var clickPosY = e.clientY - selectCube.position().top;
                var cubes = {};
                var index = parseInt(selectCube.attr("index"));
                var swapIndex;
                var temp = index;
                $(selectCube).css({'opacity':0.9,'zIndex':1});
                container.css("height",container.height());
                $(container.find(".panel").get().reverse()).each(function(i, v) {
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
                    var currentPosX = e.clientX - selectCube.parent().offset().left;
                    var currentPosY = e.clientY - selectCube.parent().offset().top;
                    for (var i in cubes) {
                        if (currentPosX > cubes[i].left &&
                            currentPosX < cubes[i].right &&
                            currentPosY > cubes[i].top &&
                            currentPosY < cubes[i].bottom &&
                            index != i) {
                            swapIndex = parseInt(i);
                            var moveTo = function(num, j) {
                                var c = $('.panel[index=' + j + ']');
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
                            selectCube.attr('index', swapIndex);
                            break;
                        } else {

                        }
                    }
                });
                $(document).on('mouseup', function() {
                  //$(document.body).css({"overflow-x":"auto","overflow-y":"auto"});
                    $(this).off('mousemove');
                    $(this).off('mouseup');
                    selectCube.animate({
                            left: parseInt(cubes[index].left),
                            top: parseInt(cubes[index].top)
                        },'fast',
                        function() {
                          if(temp != index){
                            console.info(index + "---" + swapIndex);
                            var swapPanel = container.find('.panel[index=' + temp+ ']');

                            if (index < temp) {
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
                return this;
            },
            init: function() {
                taskYear = $('<div class = "dimension timeline" ></div>');
                taskYear.append(timeRender(data.year));
                container.append(taskYear);
                taskList = $('<div style = "position:relative"></div>');
                $.each(data.task,function(i,v){
                    taskList.append(taskRender(i,v));
                });
                container.append(taskList);
                bingCRUDEvent();
                return this;
            }

        }
        return _bijiPanel;
    }
})(jQuery);
