var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const restRouter = require('./routes/rest');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');
const cookieware = require('./cookieware');

const app = express();
const db = require('./db'); //IMPORTANTE. Como variable no se usa, pero es el que realiza la conexión con la base de datos.


const cors = require('cors');


const whitelist = ['https://localhost:4200', '127.0.0.1']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log(whitelist.indexOf(origin))
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// corsOptions no me funciona
app.use(cors())


// Monkey patch before you require http for the first time.
// process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

const port = process.env.PORT || 3000;
const host = process.env.hostname || '127.0.0.1';
process.env.NODE_ENV === 'development';
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.all('*', cookieware.checkCookie, function (error, req, res, next) {
  // console.log('Accessing the secret section ...')
  // res.status(200).send({url: req.originalUrl + ' not found'}),
  // get the url pathname
  next(error); // pass control to the next handler
});




app.use('/', indexRouter);
app.use(/^\/rest\/\$catalog/, catalogRouter);
app.use(/^\/rest\/\users/, usersRouter);
app.use('/rest', restRouter);


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
