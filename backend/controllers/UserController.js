import UserModel from "../models/UserModel.js";

export const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.watchedMovies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

export const addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const { watchedMovies } = user;
      const movieAlreadyWatched = watchedMovies.find(
        ({ id }) => id === data.id
      );
      if (!movieAlreadyWatched) {
        await UserModel.findByIdAndUpdate(
          user._id,
          {
            watchedMovies: [...user.watchedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await UserModel.create({ email, watchedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

export const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const movies = user.watchedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(500).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await UserModel.findByIdAndUpdate(
        user._id,
        {
          watchedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};
