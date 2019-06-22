const express = require("express");
const Lance = require('../models/lance.js');
const router = express.Router();

router.post('', (req, res, next) => {
  const lance = new Lance({
      user: req.body.user,
      valor: req.body.valor,
      estado: req.body.estado

  });
  lance.save().then(createdLance => {
      res.status(201).json({
          message: 'Lance criado com sucesso',
          lanceId: createdLance._id
      });
  })
      .catch(error => {
          console.log(error);
          res.status(500).json({
              message: 'Erro ao criar Lance'
          })
      });
});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = req.query.page;
  lanceQuery = Lance.find();
  let lancesAdq;
  if (pageSize && currentPage) {
      lanceQuery
          .skip(pageSize * (currentPage - 1))
          .limit(pageSize);
  }
  lanceQuery
      .then(documents => {
        lancesAdq = documents;
          return Lance.countDocuments();
      })
      .then(count => {
          res.status(200).json({
              message: 'lances fetch com Sucesso',
              lances: lancesAdq,
              maxlances: count
          });
      })
      .catch(error => {
          res.status(500).json({
              message: 'Erro fetch lances'
          });
      });
});

router.get('/:id', (req, res, next) => {
  Lance.findById(req.params.id).then(lance => {
      if (lance) {
          res.status(200).json(lance);
      } else {
          res.status(404).json({ message: 'Lance Não Existe' });
      }
  }).catch(error => {
      res.status(500).json({
          message: 'Erro fetch lances'
      });
  });
});

module.exports = router;

