const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MoodSchema = new Schema({
  mood: {
    type: Number,
    required: true
  },
  thought: {
    type: String,
    default: 'No thoughts recorded.'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Compile and export schema
module.exports = Mood = mongoose.model('mood', MoodSchema);
