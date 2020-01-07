const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/items');
const appointments = require('./routes/api/appointments');
const moods = require('./routes/api/moods');
const goals = require('./routes/api/goals');
const books = require('./routes/api/books');

const app = express();

// Middleware
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);
app.use('/api/appointments', appointments);
app.use('/api/moods', moods);
app.use('/api/goals', goals);
app.use('/api/books', books);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
