import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieId: Number,
  title: String,
  poster: String,
  overview: String,
  year: String,
  genre_ids: [Number],
  watched: {
    type: Boolean,
    default: false,
  },
  rating: { type: Number, min: 0, max: 10, default: null },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

movieSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
