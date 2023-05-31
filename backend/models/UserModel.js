import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  watchedMovies: Array,
});

export default model("users", userSchema);
