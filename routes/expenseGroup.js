// Dependencies
var express = require("express");
var mongoose = require("mongoose");

// Helpers
var ExpenseGroup = require("./../model/ExpenseGroup");
var enviroments = require("./../enviroments");

// Variables
var router = express.Router();

// Connection
mongoose.connect(enviroments.db);

// Endpoints
router.get("/", function(req, res, next) {
  ExpenseGroup.find(function(err, groups) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(groups);
    }
  });
});

router.get("/:id", function(req, res, next) {
  ExpenseGroup.findById(req.params.id, function(error, group) {
    if (error) {
      res.send(error);
    }

    res.json(group);
  });
});

router.get("/name/:name", function(req, res, next) {
  ExpenseGroup.findOne({ name: req.params.name }, function(error, group) {
    if (error) {
      res.send(error);
    }

    res.json(group);
  });
});

router.post("/", function(req, res, next) {
  if (req.body.name && req.body.percentage) {
    var group = new ExpenseGroup();
    group.name = req.body.name;
    group.percentage = req.body.percentage;

    group.save(function(error) {
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
  ExpenseGroup.findById(req.params.id, function(error, group) {
    if (error) {
      res.send(error);
    }

    group.name = req.body.name;
    group.percentage = req.body.percentage;

    group.save(function(error) {
      if (error) {
        res.send(error);
      }

      res.sendStatus(200);
    });
  });
});

router.delete("/:id", function(req, res, next) {
  ExpenseGroup.remove({ _id: req.params.id }, function(error) {
    if (error) {
      res.send(error);
    }

    res.sendStatus(200);
  });
});

module.exports = router;
