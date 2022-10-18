const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// authorization middleare //
const authenticationMiddleware = require('./middlewares/authentication-middleware');
app.use('/', indexRouter);
app.use('/users', authenticationMiddleware, usersRouter);

// error handler
app.use(function(err, req, res, next) {
  console.error(err);

  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;