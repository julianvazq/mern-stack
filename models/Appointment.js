const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AppointmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  }
});

// Compile and export schema
module.exports = Item = mongoose.model('appointment', AppointmentSchema);
