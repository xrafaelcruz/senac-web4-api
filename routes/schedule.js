// Dependencies
var express = require("express")
var mongoose = require("mongoose")

// Helpers
var Schedule = require("./../model/Schedule")
var config = require("./../config")

// Variables
var router = express.Router()

// Connection
mongoose.connect(config.db)

// Endpoints
router.get("/", function(req, res, next) {
  Schedule.find(function(err, schedules) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(schedules)
    }
  })
})

router.get("/:id", function(req, res, next) {
  Schedule.findById(req.params.id, function(error, schedule) {
    if (error) {
      res.send(error)
    }

    res.json(schedule)
  })
})

router.get("/user/:id", function(req, res, next) {
  Schedule.find({ user: req.params.id }, function(error, schedules) {
    if (error) {
      res.send(error)
    }

    res.json(schedules)
  })
})

router.post("/", function(req, res, next) {
  var schedule = new Schedule()
  schedule.dateTime = req.body.dateTime
  schedule.service = req.body.service
  schedule.user = req.body.user

  schedule.save(function(error) {
    if (error) {
      res.status(500).send(error)
    }

    res.sendStatus(201)
  })
})

router.put("/:id", function(req, res, next) {
  Schedule.findById(req.params.id, function(error, schedule) {
    if (error) {
      res.send(error)
    }

    schedule.dateTime = req.body.dateTime
    schedule.service = req.body.service
    schedule.user = req.body.user

    schedule.save(function(error) {
      if (error) {
        res.send(error)
      }

      res.sendStatus(200)
    })
  })
})

router.delete("/:id", function(req, res, next) {
  Schedule.remove({ _id: req.params.id }, function(error) {
    if (error) {
      res.send(error)
    }

    res.sendStatus(200)
  })
})

module.exports = router
