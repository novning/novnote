
var mongo = require('mongodb');

var DBConnect = {
  mongo:mongo.MongoClient,
  url:'mongodb://172.16.18.130:27017/ningbiji',
  filter:function(collection,filter,callback){
    try{
      mongo.connect(this.url, function(err, db) {
        var col = db.collection(collection);
        col.find(filter).toArray(function(err, docs) {
          db.close();
          callback(docs);

        });
      });
    }catch(e){
      console.log(e);
    }
  },
  findAll:function(collection,callback){
    mongo.connect(this.url,function(err,db){
      var col = db.collection(collection);
      col.find({}).toArray(function(err, docs) {
        db.close();
        callback(docs);

      });
    });
  }

}

module.exports = DBConnect;
