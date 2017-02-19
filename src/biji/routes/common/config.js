var config = require('config-lite');
var nconfig = {
  port:function(){
    return config.port;
  },
  session:function(){
    return config.session;
  },
  mongodb:function(){
    return config.mongodb;
  }
}

module.exports = nconfig;
