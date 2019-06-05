const express = require('express');

const app = express();

app.use('/api/items', (req, res, next) => {
  const items = [
     {
       id: '123456',
     title: 'leilão 1',
     content: 'TESTE'
    },
    {
      id: '098765',
    title: 'leilão 2',
    content: 'BLABLABLA'
   }
  ];
  res.status(200).json({
    message: 'Leilões resposta sucess',
    items: items
  });
});

module.exports = app;
