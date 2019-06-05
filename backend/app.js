const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Teste moddleware');
  next();
});

app.use((req, res, next) => {
  res.send('Hi from app.js');
});

module.exports = app;
