const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GoalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  timeline: {
    type: String,
    default: ''
  },
  deadline: {
    type: String,
    default: ''
  },
  createdAt: { type: Date, expires: 600, default: Date.now }
});

// Compile and export schema
module.exports = Goal = mongoose.model('goal', GoalSchema);
