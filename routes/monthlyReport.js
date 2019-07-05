// Dependencies
var express = require("express");
var mongoose = require("mongoose");

// Helpers
var MonthlyReport = require("./../model/MonthlyReport");
var enviroments = require("./../enviroments");

// Variables
var router = express.Router();

// Connection
mongoose.connect(enviroments.db);

// Endpoints
router.get("/", function(req, res, next) {
  MonthlyReport.find(function(err, reports) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(reports);
    }
  });
});

router.get("/:id", function(req, res, next) {
  MonthlyReport.findById(req.params.id, function(error, report) {
    if (error) {
      res.send(error);
    }

    res.json(report);
  });
});

router.get("/name/:name", function(req, res, next) {
  MonthlyReport.findOne({ name: req.params.name }, function(error, report) {
    if (error) {
      res.send(error);
    }

    res.json(report);
  });
});

router.post("/", function(req, res, next) {
  if (req.body.expense && req.body.value && req.body.expenseGroup) {
    var report = new MonthlyReport();
    report.expense = req.body.expense;
    report.value = req.body.value;
    report.expenseGroup = req.body.expenseGroup;

    report.save(function(error) {
      if (error) {
        res.status(500).send(error);
      }

      res.sendStatus(201);
    });
  } else {
    res.sendStatus(400);
  }
});

router.put("/:id", function(req, res, next) {
  MonthlyReport.findById(req.params.id, function(error, report) {
    if (error) {
      res.send(error);
    }

    report.name = req.body.name;
    report.percentage = req.body.percentage;

    report.save(function(error) {
      if (error) {
        res.send(error);
      }

      res.sendStatus(200);
    });
  });
});

router.delete("/:id", function(req, res, next) {
  MonthlyReport.remove({ _id: req.params.id }, function(error) {
    if (error) {
      res.send(error);
    }

    res.sendStatus(200);
  });
});

module.exports = router;
