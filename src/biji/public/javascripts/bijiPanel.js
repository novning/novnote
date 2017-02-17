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
                      '<button class="btn btn-orderSetting">排序</span>' +
                  '</div>';
        }
        function taskRender(data){
          var startTime;
          if(data.startTime == null){
            startTime = "";
          }else{
            startTime = new Date(data.startTime).format("yyyy/MM/dd");
          }
          var doneTime;
          if(data.doneTime == null){
            doneTime = "";
          }else{
            doneTime = new Date(data.doneTime).format("yyyy/MM/dd");
          }
          var takeTime = data.takeTime + " h";
          var str = '<div class = "task_panel" id = "' + data._id + '" order = "' + data.order + '">' +
              '<div class = "title lh">' + data.name + '</div>' +
              '<div class = "lh">' +
                  '<i class = "material-icons md-25">timeline</i>' +
                  '<span class = "startTime">' + startTime + '</span> ~ <span class = "doneTime">' + doneTime + '</span>' +
              '</div>' +
              '<div class = "lh">' +
                  '<i class = "material-icons md-25">query_builder</i>' +
                  '<span class = "takeTime">' + takeTime + '</span>' +
              '</div>';
              if(data.status == "0"){
                str += '<div class = "operator">' +
                    '<button class="btn done">完成</button>' +
                    '<button class="btn upd swap" data-operation = "+">' +
                        '<i class = "material-icons md-15">loop</i>' +
                    '</button>' +
                    '<button class="btn upd updateTime" data-time="5">+5</button>' +
                    '<button class="btn upd updateTime" data-time="3">+3</button>' +
                    '<button class="btn upd updateTime" data-time="1">+1</button>' +
                '</div>';
              }else{
                str += '<div class = "operator">' +
                    '<button class="btn done" disabled >完成</button>'+
                    '</div>';
              }
              str += '</div>';
          return str;
        }
        function bingCRUDEvent(){
          container.find(".updateTime").click(function(){
            var that = this;
            var btnGroup = $(this).parent().find(".btn");
            btnGroup.attr("disabled","true");
              var takeTimePanel = $(this).parent().parent().find(".takeTime");
              var taskId = $(this).parent().parent().attr("id");
              var swapOperation = $(this).parent().find(".swap").attr("data-operation");
              var updateTimeValue = $(this).attr("data-time");
              var updateValue = 0;
              if(swapOperation == "+"){
                updateValue = 0 + parseFloat(updateTimeValue);
              }else{
                updateValue = 0 - parseFloat(updateTimeValue);
              }
              restful.put("/task/update/"+taskId + "/" + updateValue).success(function(e){
                console.info(e);
                takeTimePanel.text(e.value + "h");
                if(e.startTime){
                  var startTimePanel = $(that).parent().parent().find(".startTime");
                  startTimePanel.text(new Date(e.startTime).format("yyyy/MM/dd"));
                }
                btnGroup.removeAttr("disabled");
              }).error(function(e){
                btnGroup.removeAttr("disabled");
              });
          });
          container.find(".done").click(function(){
            var that = this;
            var taskId = $(this).parent().parent().attr("id");
            restful.put("/task/done/"+taskId).success(function(e){
              //console.info(e);
              var doneTimePanel = $(that).parent().parent().find(".doneTime");
              doneTimePanel.text(new Date(e.value).format("yyyy/MM/dd"));
              $(that).attr("disabled","true");
              $(that).parent().find(".upd").remove();
            });
          });
          container.find(".swap").click(function(){
            console.info("swap");
            $(this).attr("data-operation") == "+"
            ?$(this).attr("data-operation","-"):$(this).attr("data-operation","+");
            var oper = $(this).attr("data-operation");
            var updateGroups = $(this).parent().find(".updateTime");
            for(var i = 0;i < updateGroups.length;i++){
              $(updateGroups[i]).text(oper+$(updateGroups[i]).attr("data-time"));
            }

          });
          container.find(".btn-orderSetting").click(function(){
            if(isOrdering){
              container.find(".task_panel").off("mousedown");
              isOrdering = false;
              $(this).text("排序");
              var updateTask = [];
              container.find(".task_panel").each(function(i,v){
                updateTask.push({id:$(v).attr("id"),order:$(v).attr("order")});
              });
              restful.put("/task/order",updateTask).success(function(e){
                console.info(e);
              });
            }else{
              isOrdering = true;
              bindDragEvent();
              $(this).text("完成");
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

                var order = parseInt(selectCube.attr("order"));
                var swapOrder;
                var useForOnMouseUpOrder = order;
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
                    cubes[$(v).attr("order")] = {
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
                            order != i) {
                            swapOrder = parseInt(i);
                            var moveTo = function(num, j) {
                                var c = $('.task_panel[order=' + j + ']');
                                $(c).stop();
                                var t = cubes[j + num];

                                c.animate({
                                    left: t.left,
                                    top: t.top
                                }, 'fast');
                                c.attr('order', j + num);
                            }
                            if (order > swapOrder) {
                                for (var j = order - 1; j >= swapOrder; j--) {
                                    moveTo(1, j);
                                }
                            } else {
                                for (var j = order + 1; j < swapOrder + 1; j++) {
                                    moveTo(-1, j);
                                }
                            };
                            order = swapOrder;
                            selectCube.attr('order', swapOrder); //变换_this的index
                        } else {
                          console.info("else interesting");
                        }
                    }

                });

                $(document).on('mouseup', function() {
                    $(this).off('mousemove');
                    $(this).off('mouseup');
                    selectCube.animate({
                            left: parseInt(cubes[order].left),
                            top: parseInt(cubes[order].top)
                        },'fast',
                        function() {
                          var swapPanel = $('.task_panel[order=' + useForOnMouseUpOrder + ']');
                          console.info(useForOnMouseUpOrder + "|||" + order);
                          if (useForOnMouseUpOrder > order) {
                            selectCube.insertBefore(swapPanel);

                          } else {
                              selectCube.insertAfter(swapPanel);
                          };

                            container.find(".task_panel").removeAttr("style");
                            container.css("height","");
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
                    container.append(taskRender(v));
                });
                bingCRUDEvent();
                return this;
            }

        }
        return _bijiPanel;
    }
})(jQuery);
