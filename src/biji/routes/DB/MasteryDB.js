var DBConnect = require('./DBConnect');

var MasteryDB = {
  findMasterys:function(callback){
    DBConnect.findAll("mastery",function(mastery){
      callback(mastery);
    });
  }

}
module.exports = MasteryDB;
