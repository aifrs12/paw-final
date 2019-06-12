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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.post('/api/items/', (req, res, next) => {
  const item = new Item({
    title: req.body.title,
    content: req.body.content
  });
  item.save().then(createdItem => {
    res.status(201).json({
      message: 'Leilão add sucess',
      itemId: createdItem._id
    });
  });
});

app.put('/api/items/:id', (req, res, next) => {
  const item = new Item({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Item.updateOne({ _id: req.params.id }, item).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

app.get('/api/items/', (req, res, next) => {
  Item.find().then(documents => {
    res.status(200).json({
      message: 'Leilões resposta sucess',
      items: documents
    });
  });
});

app.get("/api/items/:id", (req, res, next) => {
  Item.findById(req.params.id).then(item => {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item not found!" });
    }
  });
});

app.delete('/api/items/:id', (req, res, next) => {
  Item.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Leilão apagado' });
  });
});

module.exports = app;
