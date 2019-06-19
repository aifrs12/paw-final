const express = require("express");
const Item = require('../models/item');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.post('', checkAuth, (req, res, next) => {
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

router.put('/:id', checkAuth, (req, res, next) => {
  const item = new Item({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Item.updateOne({ _id: req.params.id }, item).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const itemQuery = Item.find();
  let fetchedItems;
  if (pageSize && currentPage) {
    itemQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  itemQuery.then(documents => {
    fetchedItems = documents;
    return Item.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Leilões resposta sucess',
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
  Item.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Leilão apagado' });
  });
});


module.exports = router;

