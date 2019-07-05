// Dependencies
var express = require("express");
var mongoose = require("mongoose");

// Helpers
var Receipt = require("./../model/Receipt");
var enviroments = require("./../enviroments");

// Variables
var router = express.Router();

// Connection
mongoose.connect(enviroments.db);

// Endpoints
router.get("/", function(req, res, next) {
  Receipt.find(function(err, receipts) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(receipts);
    }
  });
});

router.get("/:id", function(req, res, next) {
  Receipt.findById(req.params.id, function(error, receipt) {
    if (error) {
      res.send(error);
    }

    res.json(receipt);
  });
});

router.get("/date/:date", function(req, res, next) {
  Receipt.findOne({ date: req.params.date }, function(error, receipt) {
    if (error) {
      res.send(error);
    }

    res.json(receipt);
  });
});

router.get("/user/:idUser", function(req, res, next) {
  Receipt.findOne({ idUser: req.params.idUser }, function(error, receipt) {
    if (error) {
      res.send(error);
    }

    res.json(receipt);
  });
});

router.post("/", function(req, res, next) {
  if (req.body.value && req.body.date && req.body.idUser) {
    var receipt = new Receipt();
    receipt.value = req.body.value;
    receipt.date = req.body.date;
    receipt.idUser = req.body.idUser;

    receipt.save(function(error) {
      if (error) {
        res.status(500).send(error);
      }

      res.sendStatus(201);
    });
  } else {
    res.sendStatus(400);
  }
});

// Quando for atualizar um Recebimento, é necessário enviar os grupos,
// e distinguir quais são são os novos e os que já existiam
router.put("/:id", function(req, res, next) {
  if (req.body.listNew) {
    listNew.forEach(item => ExpenseGroup.createGroup(item, res));
  }

  if (req.body.listEditable) {
    listEditable.forEach(item => ExpenseGroup.editGroup(item, res));
  }

  Receipt.findById(req.params.id, function(error, receipt) {
    if (error) {
      res.send(error);
    }

    receipt.name = req.body.name;
    receipt.percentage = req.body.percentage;

    receipt.save(function(error) {
      if (error) {
        res.send(error);
      }

      res.sendStatus(200);
    });
  });
});

router.delete("/:id", function(req, res, next) {
  Receipt.remove({ _id: req.params.id }, function(error) {
    if (error) {
      res.send(error);
    }

    res.sendStatus(200);
  });
});

module.exports = router;
