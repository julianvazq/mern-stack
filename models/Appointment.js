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
  },
  createdAt: { type: Date, expires: 600, default: Date.now }
});

// Compile and export schema
module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);
