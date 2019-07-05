// Dependencies
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");

// Routes import
var authRouter = require("./routes/auth");
var usersRouter = require("./routes/user");
var expenseGroupRouter = require("./routes/expenseGroup");
var monthlyReportRouter = require("./routes/monthlyReport");

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
app.use("/auth", authRouter.router);
app.use("/user", usersRouter);
app.use("/expenseGroup", authRouter.validateUser);
app.use("/expenseGroup", expenseGroupRouter);
app.use("/monthlyReport", authRouter.validateUser);
app.use("/monthlyReport", monthlyReportRouter);

module.exports = app;
