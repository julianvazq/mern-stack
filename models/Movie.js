const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    default: ''
  },
  createdAt: { type: Date, expires: 600, default: Date.now }
});

// Compile and export schema
module.exports = Movie = mongoose.model('movie', MovieSchema);
