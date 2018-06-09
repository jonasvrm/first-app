var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var cflash = require('connect-flash');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var intl = require('intl');

/* DB */
mongoose.connect('mongodb://localhost:27017/dbcontext');
require(__manage + 'config/passport');

//Dashboard
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var productRouter = require('./routes/product');
var orgRouter = require('./routes/organisation');
var categoryRouter = require('./routes/category');

var app = express();

app.set('views', path.join(__manage, 'views'));

// view engine setup
app.engine('.hbs', expressHbs({
    layoutsDir   : 'manage/views/layouts',
    partialsDir   : 'manage/views/partials',
    defaultLayout: 'layout',
    extname: '.hbs',
    helpers: require(__base + 'assets/handlebars-helpers')
}));
app.set('view engine', '.hbs');

app.use(logger('dev'));-
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//session setup
app.use(session({
    secret: 'sessionSecretYEAH',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cflash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());

//global variables
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.__manage = __manage;
    res.locals.__manageUrl = __manageUrl;
    next();
});



app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/product', productRouter);
app.use('/organisation', orgRouter);
app.use('/category', categoryRouter);

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
