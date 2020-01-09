const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: { type: Date, expires: 600, default: Date.now }
});

// Compile and export schema
module.exports = Item = mongoose.model('item', ItemSchema);
