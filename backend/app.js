const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

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
