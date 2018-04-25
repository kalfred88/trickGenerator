const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const helmet = require('helmet');
const passport = require('passport')
const cors = require('cors');

const db = require('./config/database.js');
const User = require('./models/user');
const Trick = require('./models/trick');
const usersRouter = require('./routes/users.route');
const trickRouter = require('./routes/trick.route');

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;


const app = express();


//Connect to mongoDB
mongoose.connect(db.uri, db.options,
  () => {
    console.log('MongoDB connected!');
  },
  err => {
    console.log('MongoDB error.:' + err);
  })

//Logging
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
let accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
  //skip: (req, res) => res.statusCode < 400
});
app.use(morgan('combined', {
  stream: accessLogStream
}));

//Security
app.use(helmet());

//Enable CORS
app.use(cors());

//Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

//Cookie handlig
app.use(cookieParser());

//Session handling
app.use(session({
  secret: 'YOUR_SECRET_KEY',
  resave: true,
  saveUninitialized: true
}));

//Passport auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/user', usersRouter);
app.use('/tricks', trickRouter);

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