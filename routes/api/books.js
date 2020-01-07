const express = require('express');
const router = express.Router();

// Book Model
const Book = require('../../models/Book');

//@route GET api/books
//@desc Get All Books
router.get('/', (req, res) => {
  Book.find()
    // .sort({ date: -1 })
    .then(books => res.json(books));
});

//@route POST api/books
//@desc Create A Book
router.post('/', (req, res) => {
  const newGoal = new Book({
    title: req.body.title,
    author: req.body.author
  });

  newGoal.save().then(book => res.json(book));
});

//@route POST api/books/
//@desc Update An Book
router.post('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      book.title = req.body.title;
      book.author = req.body.author;
      book.save().then(book => res.json(book));
    })
    .catch(err => res.status(404).json({ success: false }));
});

//@route DELETE api/books/:id
//@desc Delete An Book
router.delete('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => book.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
