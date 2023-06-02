import { Router } from "express";
import config from "../utils/config.js";
import { fetchMovies } from "../utils/fetchMovies.js";

const router = Router();

router.get("/", async (req, res) => {
  const { page } = req.query;
  fetchMovies(
    `${config.ALL}api_key=${config.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`,
    res,
    page
  );
});

router.get("/popular", async (req, res) => {
  const { page } = req.query;
  const currentPage = Math.round(page / 2);

  fetchMovies(
    `${config.POPULAR}api_key=${config.API_KEY}&language=en-US&page=${page}`,
    res,
    page
  );
});

router.get("/genre", async (req, res) => {
  const { genreId, page } = req.query;
  const currentPage = Math.round(page / 2);

  fetchMovies(
    `${config.GENRE}api_key=${config.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genreId}&page=${page}`,
    res,
    page
  );
});

router.get("/genre-list", async (req, res) => {
  fetchMovies(`${config.GENRELIST}api_key=${config.API_KEY}`, res);
});

router.get("/search", async (req, res) => {
  const { query } = req.query;

  fetchMovies(
    `${config.SEARCH}api_key=${config.API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
    res
  );
});

router.get("/details", async (req, res) => {
  const { movieId } = req.query;

  fetchMovies(
    `${config.DETAILS}${movieId}?api_key=${config.API_KEY}&language=en-US`,
    res
  );
});

router.get("/credits", async (req, res) => {
  const { movieId } = req.query;
  fetchMovies(
    `${config.DETAILS}${movieId}/credits?api_key=${config.API_KEY}&language=en-US`,
    res
  );
});

router.get("/year", async (req, res) => {
  const { year } = req.query;
  const { page } = req.query;
  fetchMovies(
    `${config.YEAR}api_key=${config.API_KEY}&primary_release_year=${year}&language=en-US&sort_by=primary_release_date.desc&page=${page}`,
    res,
    page
  );
});

router.get("/top", async (req, res) => {
  const { page } = req.query;

  fetchMovies(
    `${config.TOP_RATED}api_key=${config.API_KEY}&language=en-US&page=${page}`,
    res,
    page
  );
});

router.get("/upcoming", async (req, res) => {
  const { page } = req.query;

  fetchMovies(
    `${config.UPCOMING}api_key=${config.API_KEY}&language=en-US&page=${page}`,
    res,
    page
  );
});

export default router;
