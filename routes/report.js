// Dependencies
var express = require("express");
var mongoose = require("mongoose");

// Helpers
var Report = require("./../model/Report");
var enviroments = require("./../enviroments");

// Variables
var router = express.Router();

// Connection
mongoose.connect(enviroments.db, { useNewUrlParser: true });

// Endpoints
router.get("/:id", function(req, res, next) {
  Report.findById(req.params.id, function(error, user) {
    if (error) {
      res.send(error);
    }

    res.json(user);
  });
});

router.get("/user/:idUser", function(req, res, next) {
  Report.find({ idUser: req.params.idUser }, function(error, user) {
    if (error) {
      res.send(error);
    }

    res.json(user);
  });
});

router.post("/", function(req, res, next) {
  if (
    req.body.value &&
    req.body.date &&
    req.body.idUser &&
    req.body.expenseGroupList
  ) {
    var report = new Report();
    report.value = req.body.value;
    report.date = req.body.date;
    report.idUser = req.body.idUser;
    report.expenseGroupList = req.body.expenseGroupList;

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
  Report.findById(req.params.id, function(error, updatedReport) {
    if (error) {
      res.send(error);
    }

    updatedReport.value = req.body.value;
    updatedReport.date = req.body.date;
    updatedReport.idUser = req.body.idUser;
    updatedReport.expenseGroupList = req.body.expenseGroupList;

    updatedReport.save(function(error) {
      if (error) {
        res.send(error);
      }

      res.sendStatus(200);
    });
  });
});

router.delete("/:id", function(req, res, next) {
  Report.remove({ _id: req.params.id }, function(error) {
    if (error) {
      res.send(error);
    }

    res.sendStatus(200);
  });
});

module.exports = router;
