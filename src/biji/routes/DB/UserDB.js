var DBConnect = require('./DBConnect');

var UserDB = {
  login:function(user,callback){
    DBConnect.filter("user",user,function(user){
      if(user.length > 0){
          callback(user[0]);
      }else{
          callback(null);
      }
    });
  }

}
module.exports = UserDB;
