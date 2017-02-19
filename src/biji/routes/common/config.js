var config = require('config-lite');
console.info(config);
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
