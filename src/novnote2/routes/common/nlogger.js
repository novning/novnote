var winston = require('winston');
var moment = require('moment');

var nlogger = {
  format:function(){
    return "YYYY-MM-DD hh:mm:ss";
  },
  logger:function(){
    var _this = this;
    return new (winston.Logger)({
     transports: [
       new (winston.transports.Console)({
         timestamp: function() {
           return moment(Date.now()).format(_this.format());
         },
         formatter: function(options) {
           return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }
       }),
       new (winston.transports.File)({
         name: 'info-file',
         filename: 'log-info.log',
         level: 'info',
         timestamp: function() {
           return moment(Date.now()).format(_this.format());
         },
         formatter: function(options) {
           return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }
       }),
       new (winston.transports.File)({
         name: 'error-file',
         filename: 'log-error.log',
         level: 'error',
         timestamp: function() {
           return moment(Date.now()).format(_this.format());
         },
         formatter: function(options) {
           return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }
       })
     ]
   });
 }

}

module.exports = nlogger;
