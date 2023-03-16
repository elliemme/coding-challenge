const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the movie collection
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
});

// Create a model for the movie collection
const Movie = mongoose.model('Movie', movieSchema);

// Define a route for getting all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
