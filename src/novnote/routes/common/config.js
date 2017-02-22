var config = require('config-lite');
var nconfig = {
  c:function(){
    return {
      port:config.port,
      session:config.session,
      mongodb:config.mongodb,
    }
  }
}

module.exports = nconfig;
