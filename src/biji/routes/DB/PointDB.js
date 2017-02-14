var DBConnect = require('./DBConnect');

var PointDB = {
  findPointByMasteryId:function(masteryId,callback){
    DBConnect.filter("point",{"masteryId":masteryId},function(points){
      callback(points);
    });
  }

}
module.exports = PointDB;
