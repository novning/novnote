var userData = require('../data/UserData');
var secret = require('../common/Secret');

var UserService = {
  login:function(user,callback){
    userData.filter({name:user.name},function(u){
      if(u.length > 0){
        secret.md5(user.password,function(secPwd){
          if(u[0].password == secPwd){
              callback(u[0]);
          }else{
            callback(null);
          }
        });
      }else{
          callback(null);
      }
    });
  },
  updatePassword:function(user,callback){
    userData.filter({name:user.name},function(u){
      if(u.length > 0){
        secret.md5(user.oldPwd,function(secPwd){
          if(u[0].password == secPwd){
            secret.md5(user.newPwd,function(newSecPwd){
              userData.update({_id:u[0]._id},{password:newSecPwd},function(e){
                if(e > 0){
                  callback({code:0,result:"success"});
                }else{
                  callback({code:1,result:"fail"});
                }
              });
            });
          }
        });
      }else{
          callback(null);
      }
    });
  },
  register:function(user,callback){
    if(user.name.length <= 20 && user.password.length <= 20){
      user.createTime = new Date().getTime();
      userData.add(user,function(e,_id){
        if(e > 0){
          callback({code:0,result:"success"});
        }else{
          callback({code:1,result:"fail"});
        }
      });
    }else{
      callback({code:1,result:"fail",message:"内容过长"});
    }

  },
  validUsername:function(name,callback){
    userData.filter({name:name},function(e){
      if(e <= 0){
        callback({code:0,result:"success"});
      }else{
        callback({code:1,result:"fail"});
      }
    });
  }
}

module.exports = UserService;
