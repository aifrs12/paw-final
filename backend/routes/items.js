const express = require("express");
const Item = require('../models/item');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.post('', checkAuth, (req, res, next) => {
  const item = new Item({
    title: req.body.title,
    content: req.body.content,
    creator: req.userInfo.userId
  });
  item.save().then(createdItem => {
    res.status(201).json({
      message: 'Leilão add sucess',
      itemId: createdItem._id
    });
  });
});

router.put('/:id', checkAuth, (req, res, next) => {
  const item = new Item({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userInfo.userId
  });
  Item.updateOne({ _id: req.params.id, creator: req.userInfo.userId }, item).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({ message: 'Update sucess!' });
    } else {
      res.status(401).json({ message: 'Update not authorized!' });
    }
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const itemQuery = Item.find();
  let fetchedItems;
  if (pageSize && currentPage) {
    itemQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  itemQuery
    .then(documents => {
      fetchedItems = documents;
      return Item.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Items fetched successfully!",
        items: fetchedItems,
        maxItems: count
      });
    });
});

router.get("/:id", (req, res, next) => {

  Item.findById(req.params.id).then(item => {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item not found!" });
  }
  });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Item.deleteOne({_id: req.params.id, creator: req.userInfo.userId }).then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: 'Delete sucess!' });
    } else {
      res.status(401).json({ message: 'Delete not authorized!' });
    }
  });
});


module.exports = router;

