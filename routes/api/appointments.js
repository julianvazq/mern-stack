const express = require('express');
const router = express.Router();

// Appointment Model
const Appointment = require('../../models/Appointment');

//@route GET api/appointments
//@desc Get All Items
router.get('/', (req, res) => {
  Appointment.find()
    // .sort({ date: -1 })
    .then(appointments => res.json(appointments));
});

//@route POST api/appointments
//@desc Create An Appointment
router.post('/', (req, res) => {
  const newAppointment = new Appointment({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time
  });

  newAppointment.save().then(appointment => res.json(appointment));
});

//@route DELETE api/appointments/:id
//@desc Delete An Appointment
router.delete('/:id', (req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment =>
      appointment.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
