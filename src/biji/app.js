var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var backend = require('./routes/backend');
var login = require('./routes/login');
var register = require('./routes/register');
var user = require('./routes/user');
var task = require('./routes/task');
var taskDetail = require('./routes/taskDetail');
var playground = require('./routes/playground');
var note = require('./routes/note');
var config = require('./routes/common/config').c();


var app = express();

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: config.mongodb,ttl: 14 * 24 * 60 * 60})
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', login);
app.use('/register', register);
//登陆判断
app.use(function (req, res, next) {
    if(req.session.user == undefined){
      console.info(req.path);
      return res.redirect("/login");
    }
    next();
});


app.use('/', index);
app.use('/backend', backend);
app.use('/user', user);
app.use('/task', task);
app.use('/taskDetail', taskDetail);
app.use('/playground', playground);
app.use('/note', note);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
