var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var api = require('./routes/api');
var handy = require('./routes/handy');
var kitchen = require('./routes/kitchen');

var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

/* passportの設定 */
var passport = require('passport');

var app = express();

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// required for passport
app.use(expressSession({
        secret: 'ilovescotchscotchyscotchscotch',
        proxy: true,
        resave: true,
        saveUninitialized: true
    })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/app', isLoggedIn, express.static(path.join(__dirname, '../app')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

//app.use(expressSession({
//    secret: 'secret',
//    store: new MongoStore({
//        db: 'session',
//        host: 'localhost',
//        clear_interval: 60 * 60
//    }),
//    proxy: true,
//    resave: true,
//    saveUninitialized: true
//}));


require('./routes/routes')(app, passport);


app.use('/api', isLoggedIn, api);
//app.use('/handy', handy);
//app.use('/kitchen', isLoggedIn, kitchen);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});
//}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
