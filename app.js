// Import Module
let createError = require('http-errors');
let express = require('express');
let path = require('path');


// Routers
const author = require('./routes/authorRouter');
const comment = require('./routes/commentRouter');
const post = require('./routes/postRouter');
const like = require('./routes/likeRouter');

// Mongodb Connection
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/blog';
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then((db) => {
  console.log("Connected correctly to server (http://localhost:3000/)");
}, (err) => {
  console.log(err);
});

let app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/authors', author);
app.use('/posts', post);
app.use('/comments', comment);
app.use('/likes', like);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;