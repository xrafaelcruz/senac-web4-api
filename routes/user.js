// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var nodemailer = require("nodemailer");

// Helpers
var User = require("./../model/User");
var enviroments = require("./../enviroments");

// Variables
var router = express.Router();

// Connection
mongoose.connect(enviroments.db);

// Endpoints
router.get("/", function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(users);
    }
  });
});

router.get("/:id", function(req, res, next) {
  User.findById(req.params.id, function(error, user) {
    if (error) {
      res.send(error);
    }

    res.json(user);
  });
});

router.get("/username/:username", function(req, res, next) {
  User.findOne({ username: req.params.username }, function(error, user) {
    if (error) {
      res.send(error);
    }

    res.json(user);
  });
});

router.post("/", function(req, res, next) {
  if (
    req.body.username &&
    req.body.password &&
    req.body.email &&
    req.body.name &&
    req.body.phone
  ) {
    User.findOne({ username: req.body.username }, function(err, foundedUser) {
      if (!foundedUser) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.name = req.body.name;
        user.phone = req.body.phone;
        user.profile = req.body.profile ? req.body.profile : "normal";

        user.save(function(error) {
          if (error) {
            res.status(500).send(error);
          }

          res.sendStatus(201);
        });
      } else if (foundedUser) {
        res.status(409).send({ error: "Esse usuário já existe" });
      }
    });
  } else {
    res.sendStatus(400);
  }
});

router.post("/email/:id", function(req, res, next) {
  User.findById(req.params.id, function(error, user) {
    if (error) {
      res.send(error);
    }

    // enviar o email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rafaelcruzx@gmail.com",
        pass: ""
      }
    });

    const mailOptions = {
      from: "rafaelcruzx@gmail.com",
      to: "rafaelcruzx@gmail.com",
      subject: "E-mail enviado usando Node!" + user.username,
      text: "Bem fácil, não? ;)"
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });

    res.json(user);
  });
});

router.put("/:id", function(req, res, next) {
  User.findById(req.params.id, function(error, updatedUser) {
    if (error) {
      res.send(error);
    }

    if (req.body.username) updatedUser.username = req.body.username;
    if (req.body.password) updatedUser.password = req.body.password;
    if (req.body.email) updatedUser.email = req.body.email;
    if (req.body.name) updatedUser.name = req.body.name;
    if (req.body.phone) updatedUser.phone = req.body.phone;
    if (req.body.profile) updatedUser.profile = req.body.profile;

    updatedUser.save(function(error) {
      if (error) {
        res.send(error);
      }

      res.sendStatus(200);
    });
  });
});

router.delete("/:id", function(req, res, next) {
  User.remove({ _id: req.params.id }, function(error) {
    if (error) {
      res.send(error);
    }

    res.sendStatus(200);
  });
});

module.exports = router;
