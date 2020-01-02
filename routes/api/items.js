const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

//@route GET api/items
//@desc Get All Items
router.get('/', (req, res) => {
  Item.find()
    // .sort({ date: -1 })
    .then(items => res.json(items));
});

//@route POST api/items
//@desc Create An Item
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity
  });

  newItem.save().then(item => res.json(item));
});

//@route POST api/items/
//@desc Update An Item
router.post('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.name = req.body.name;
      item.quantity = req.body.quantity;
      item.save().then(item => res.json(item));
    })
    .catch(err => res.status(404).json({ success: false }));
});

//@route DELETE api/items/:id
//@desc Delete An Item
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
