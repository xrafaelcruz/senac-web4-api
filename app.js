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
