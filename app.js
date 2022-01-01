var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
// under development
// use less css
// var lessMiddleware = require('less-middleware');
// var logger = require('morgan');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// under development
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// under development
// app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// under development
app.use('/sample', express.static(__dirname + '/node_modules/admin-lte/pages'));

app.use('/admin-lte', express.static(__dirname + '/node_modules/admin-lte'));
app.use('/dist', express.static(__dirname + '/node_modules/admin-lte/dist'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/admin', require('./routes/admin'));
app.use('/login', require('./routes/login'));
app.use('/api', require('./routes/api'));
app.use('/fileService', require('./routes/fileService'));
// app.use('/img', express.static(__dirname + '/node_modules/bootstrap/dist/'));
// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
