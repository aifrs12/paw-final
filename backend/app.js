const express = require('express');
const bodyParser = require('body-parser');

const Item = required('./models/item');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/items', (req, res, next) => {
  const item = new Item({
    title: req.body.title,
    content: req.body.content

  });
  console.log(item);
  res.status(201).json({
    message: 'Leilão add sucess'
  });
});

app.get('/api/items', (req, res, next) => {
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
