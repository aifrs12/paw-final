const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Item = require('./models/item');

const app = express();

mongoose.connect('mongodb+srv://admin:qApDe8F4tiWPc7WZ@cluster0-uvdxy.mongodb.net/paw?retryWrites=true&w=majority')
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
  item.save();
  res.status(201).json({
    message: 'Leilão add sucess'
  });
});

app.get('/api/items', (req, res, next) => {
  Item.find().then(documents => {
    res.status(200).json({
      message: 'Leilões resposta sucess',
      items: documents
    });
  });
});

module.exports = app;
