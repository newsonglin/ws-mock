var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addressRouter  = require('./routes/address');
var suburbRouter  = require('./routes/suburb');
var streetRouter  = require('./routes/street');
var vehicleRouter  = require('./routes/vehicle');
var airpointsRouter = require('./routes/airpoints');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addressRegistry/v1/address',addressRouter);
app.use('/address',addressRouter);
app.use('/addressRegistry/v1/suburb',suburbRouter);
app.use('/suburb',suburbRouter);
app.use('/addressRegistry/v1/postcode',streetRouter);
app.use('/postcode',streetRouter);
app.use('/vehicleRegistry/v1/vehicle',vehicleRouter);
app.use('/vehicle',vehicleRouter);
app.use('/loyaltyService/v1/airpoints',airpointsRouter);
app.use('/airpoints',airpointsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.end(err.message);
});

module.exports = app;
