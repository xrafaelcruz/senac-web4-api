// Dependencies
var express = require('express')
var mongoose = require('mongoose')

// Helpers
var Service = require('./../model/Service')
var config = require('./../config')

// Variables
var router = express.Router()

// Connection
mongoose.connect(config.db)

// Endpoints
router.get('/', function(req, res, next) {
	Service.find(function(err, services) {
		if (err) {
			res.status(500).send(err)
		} else {
			res.json(services)
		}
	})
})

router.get('/:id', function(req, res, next) {
	Service.findById(req.params.id, function(error, service) {
		if (error) {
			res.send(error)
		}

		res.json(service)
	})
})

router.get('/name/:name', function(req, res, next) {
	Service.findOne({ name: req.params.name }, function(error, service) {
		if (error) {
			res.send(error)
		}

		res.json(service)
	})
})

router.post('/', function(req, res, next) {
	var service = new Service()
	service.name = req.body.name

	if (req.body.name) {
		service.save(function(error) {
			if (error) {
				res.status(500).send(error)
			}

			res.sendStatus(201)
		})
	} else {
		res.sendStatus(400)
	}
})

router.put('/:id', function(req, res, next) {
	Service.findById(req.params.id, function(error, service) {
		if (error) {
			res.send(error)
		}

		service.name = req.body.name

		service.save(function(error) {
			if (error) {
				res.send(error)
			}

			res.sendStatus(200)
		})
	})
})

router.delete('/:id', function(req, res, next) {
	Service.remove({ _id: req.params.id }, function(error) {
		if (error) {
			res.send(error)
		}

		res.sendStatus(200)
	})
})

module.exports = router
