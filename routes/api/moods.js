const express = require('express');
const router = express.Router();

// Mood Model
const Mood = require('../../models/Mood');

//@route GET api/moods
//@desc Get All Moods
router.get('/', (req, res) => {
  Mood.find()
    // .sort({ date: -1 })
    .then(moods => res.json(moods));
});

//@route POST api/moods
//@desc Create A Mood
router.post('/', (req, res) => {
  const newMood = new Mood({
    mood: req.body.mood,
    thought: req.body.thought
  });

  newMood.save().then(mood => res.json(mood));
});

//@route DELETE api/moods/:id
//@desc Delete A Mood
router.delete('/:id', (req, res) => {
  Mood.findById(req.params.id)
    .then(mood => mood.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
