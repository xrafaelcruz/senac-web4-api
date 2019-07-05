var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Produto = require('../model/produto')

mongoose.connect("mongodb://localhost/app_produtos");
/* GET produtos listing. */
router.get('/', function(req, res, next) {
  Produto.find(function(err,produtos) {
    if(err){
        res.status(500).send(err);
    }
    else
        res.json(produtos);
  });
});
/* GET produtos by id listing. */
router.get('/:id', function(req, res, next) {
  console.log("Buscar produto por id",req.params.id)
  Produto.findById(req.params.id, function(error, usuario) {
    if(error) 
      res.send(error);
    res.json(usuario);
  });
});
/* POST user */
router.post('/', function(req, res, next) {
  console.log("POST");
    var produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.save(function(error) {
      if(error)
        res.status(500).send(err);
                        
      res.sendStatus(201);
    });
  });

router.put('/:id', function(req, res, next) {
  console.log("PUT ", req.params.id);
  Produto.findById(req.params.id, function(error, produto) {
    if(error) 
      res.send(error);
    
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
  
    produto.save(function(error) {
      if(error)
        res.send(error);
      //Se não teve erro, retorna response normal (200)
      res.sendStatus(200);
    });
  });
});

router.delete('/:id', function(req, res, next) {
  console.log("Delete ", req.params.id);
  Produto.remove({
    _id: req.params.id
  }, function(error) {
    if(error)
      res.send(error);
    //Se não teve erro, retorna response normal (200)
    res.sendStatus(200);
  });
});
        
module.exports = router;
