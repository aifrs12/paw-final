const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemsRoutes = require("./routes/items");
const userRoutes = require('./routes/user');
const Item = require('./models/item');

const app = express();

mongoose.connect('mongodb+srv://admin:qApDe8F4tiWPc7WZ@cluster0-uvdxy.mongodb.net/paw')
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

app.use("/api/items" , itemsRoutes);
app.use("/api/user" , userRoutes);

module.exports = app;
