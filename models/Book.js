const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: ''
  }
});

// Compile and export schema
module.exports = Book = mongoose.model('book', BookSchema);
