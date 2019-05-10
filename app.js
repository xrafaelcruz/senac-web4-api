// Dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');

// Helpers
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/user');
var scheduleRouter = require('./routes/schedule');

// Variables
var app = express();

// Add headers
app.use(function (req, res, next) {
    console.log('Erro!!')

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Settings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRouter.router);
//app.use('/user', authRouter.validateUser);
app.use('/user', usersRouter);
app.use('/schedule', authRouter.validateUser);
app.use('/schedule', scheduleRouter);

module.exports = app;
