const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const items = require('./routes/api/items');
const appointments = require('./routes/api/appointments');
const moods = require('./routes/api/moods');
const goals = require('./routes/api/goals');
const books = require('./routes/api/books');
const movies = require('./routes/api/movies');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(`${__dirname}/client/build`));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);
app.use('/api/appointments', appointments);
app.use('/api/moods', moods);
app.use('/api/goals', goals);
app.use('/api/books', books);
app.use('/api/movies', movies);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
