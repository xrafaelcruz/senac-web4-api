// Dependencies
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");

// Routes import
var auth = require("./routes/auth");
var users = require("./routes/user");
var report = require("./routes/report");

// Variables
var app = express();

// Add headers
app.use(cors());

// Settings
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/auth", auth.router);
app.use("/user", users);
app.use("/report", auth.validateUser);
app.use("/report", report);

module.exports = app;
