// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

// Helpers
var enviroments = require("./../enviroments");
var User = require("./../model/User");

// Variables
var router = express.Router();
var keyword = "SEN@CR$";

// Conection
mongoose.connect(enviroments.db);

// Endpoints
router.post("/token", function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.sendStatus(401);
  }

  User.findOne({ username: req.body.username }, function(error, user) {
    if (error) {
      res.send(error);
    } else if (!user || user == null) {
      res.status(401).json({ error: "Usuário nao encontrado" });
    } else if (user.password == req.body.password) {
      var token = jwt.sign(
        {
          id: user.id
        },
        keyword,
        { expiresIn: "1h" }
      );

      res.status(201).send({ token: token });
    } else {
      res.status(401).json({
        error: "Nao foi possível executar essa operacao"
      });
    }
  });
});

// Functions
var validateUser = function(req, res, next) {
  var token = req.get("x-auth-token");

  if (!token) {
    res.status("403").send("Nao tem o token de acesso!");
  } else {
    jwt.verify(token, keyword, function(error, userId) {
      if (error) {
        res.status(401).send(error);
      } else {
        next();
      }
    });
  }
};

module.exports = {
  validateUser,
  router
};
