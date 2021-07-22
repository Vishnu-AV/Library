var createError = require('http-errors');
var express = require('express');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/librarys',  {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

// check connection
db.once('open', function() {
  console.log('connected to db');
});

// check for db errors
db.on('error', function(err) {
  console.log(err);
});

var indexRouter = require('./routes/index');
var membersRouter = require('./routes/members');
var booksRouter = require('./routes/books');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use('',express.static('/node_modules/bootstrap/dist'));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static('node_modules/bootstrap/dist/css'))
app.use('/js', express.static('node_modules/bootstrap/dist/js'))
app.use('/js', express.static('node_modules/jquery/dist'))


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/books',booksRouter);
// routes.initialize(app);

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
