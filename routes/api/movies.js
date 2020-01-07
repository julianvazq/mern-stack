const express = require('express');
const router = express.Router();

// Movie Model
const Movie = require('../../models/Movie');

//@route GET api/movies
//@desc Get All Movies
router.get('/', (req, res) => {
  Movie.find()
    // .sort({ date: -1 })
    .then(movies => res.json(movies));
});

//@route POST api/movies
//@desc Create A Movie
router.post('/', (req, res) => {
  const newMovie = new Movie({
    title: req.body.title,
    genre: req.body.genre
  });

  newMovie.save().then(movie => res.json(movie));
});

//@route POST api/movies/:id
//@desc Update An Movie
router.post('/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => {
      movie.title = req.body.title;
      movie.genre = req.body.genre;
      movie.save().then(movie => res.json(movie));
    })
    .catch(err => res.status(404).json({ success: false }));
});

//@route DELETE api/movies/:id
//@desc Delete An Movie
router.delete('/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => movie.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
