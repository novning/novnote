var userData = require('../data/UserData');

var userService = {
  login:function(user,callback){
    userData.filter(user,function(user){
      if(user.length > 0){
          callback(user[0]);
      }else{
          callback(null);
      }
    });
  }

}

module.exports = userService;
