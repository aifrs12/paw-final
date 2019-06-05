const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Item = require('./models/item');

const app = express();

mongoose.connect('mongodb+srv://Daniel:b2XBAvvZzgC7be0x@cluster0-wxo4k.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

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
