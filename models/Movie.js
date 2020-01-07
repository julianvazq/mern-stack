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
  }
});

// Compile and export schema
module.exports = Movie = mongoose.model('movie', MovieSchema);
