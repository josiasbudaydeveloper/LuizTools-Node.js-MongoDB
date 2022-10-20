const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

global.authenticationMiddleware = () => {  
  return function (req, res, next) {
    if (req.isAuthenticated() && require('./permissions')(req)) {
      return next()
    }
    res.redirect('/?fail=true')
  }
};

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const reportsRouter = require('./routes/reports');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./auth')(passport);
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_CONNECTION+'/authentication',
    ttl: 30*60,
    autoRemove: 'native'
  }),
  secret: process.env.MONGO_STORE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/index', indexRouter);
app.use('/reports', reportsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
