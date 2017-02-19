var mongo = require('mongodb');
var objectid = require('objectid')
var config = require('../common/config');

var DB = {
  mongo:mongo.MongoClient,
  url:config.mongodb(),
  conn:function(collection,callback){
    this.mongo.connect(this.url,function(err,db){
      var col = db.collection(collection);
      callback(col,function(){
          db.close();
      });
    });
  },
  objId:function(id){
    return mongo.ObjectId(id);
  },
  add:function(collection,model,callback){
    this.conn(collection,function(col,dbClose){
      var oid = objectid();
      model._id = oid;
      col.insertOne(model,function(err,result){
        dbClose();
        callback(result.insertedCount,oid.toString());
      });
    });
  },
  filter:function(collection,filter,callback){
    this.conn(collection,function(col,dbClose){
      col.find(filter).toArray(function(err,docs){
        dbClose();
        callback(docs);
      });
    });
  },
  findByID:function(collection,id,callback){
    var that = this;
    this.conn(collection,function(col,dbClose){
      col.find({_id:that.objId(id)}).toArray(function(err,docs){
        dbClose();
        if(docs.length > 0){
          callback(docs[0]);
        }else{
          callback(null);
        }
      });
    });
  },
  findAll:function(collection,callback){
    this.conn(collection,function(col,dbClose){
      col.find({}).toArray(function(err,docs){
        dbClose();
        callback(docs);
      });
    });
  },
  update:function(collection,con,updateField,callback){
    var that = this;
    this.conn(collection,function(col,dbClose){
      if(con._id && con._id != ""){
        con._id = that.objId(con._id);
      }

      col.updateOne(con, { $set: updateField }, function(err, res) {
        dbClose();
        callback(res.result.n);
      });
    });
  },
  deleteOne:function(collection,con,callback){
    var that = this;
    this.conn(collection,function(col,dbClose){
      if(con._id && con._id != ""){
        con._id = that.objId(con._id);
      }
      console.info(con);
      col.deleteOne(con, function(err, res) {
        console.info(err);
        dbClose();
        callback(res.deletedCount);
      });
    });
  },
  deleteMany:function(collection,con,callback){
    var that = this;
    this.conn(collection,function(col,dbClose){
      if(con._id && con._id != ""){
        con._id = that.objId(con._id);
      }
      col.deleteMany(con,function(err,res){
        dbClose();
        callback(res.deletedCount);
      });
    });
  }
}
module.exports = DB;
