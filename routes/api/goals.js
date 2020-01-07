const express = require('express');
const router = express.Router();

// Goal Model
const Goal = require('../../models/Goal');

//@route GET api/goals
//@desc Get All Goals
router.get('/', (req, res) => {
  Goal.find()
    // .sort({ date: -1 })
    .then(goals => res.json(goals));
});

//@route POST api/goals
//@desc Create A Goal
router.post('/', (req, res) => {
  const newGoal = new Goal({
    name: req.body.name,
    timeline: req.body.timeline,
    deadline: req.body.deadline
  });

  newGoal.save().then(goal => res.json(goal));
});

//@route POST api/goals/
//@desc Update A Goal
router.post('/:id', (req, res) => {
  Goal.findById(req.params.id)
    .then(goal => {
      goal.name = req.body.name;
      goal.timeline = req.body.timeline;
      goal.deadline = req.body.deadline;
      goal.save().then(goal => res.json(goal));
    })
    .catch(err => res.status(404).json({ success: false }));
});

//@route DELETE api/goals/:id
//@desc Delete A Goal
router.delete('/:id', (req, res) => {
  Goal.findById(req.params.id)
    .then(goal => goal.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
