var crypto = require('crypto');  //加载crypto库
//console.log(crypto.getHashes()); //打印支持的hash算法


var Secret = {
  md5:function(content,callback){
    var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    md5.update(content);
    var d = md5.digest('hex');  //加密后的值d
    console.log("orginal content:" + content +" result:" + d);
    callback(d);
  }

}
//secret.md5("password");
module.exports = Secret;
