import "dotenv/config";

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const POPULAR = process.env.POPULAR_URL;
const SEARCH = process.env.SEARCH_URL;
const DETAILS = process.env.DETAILS_URL;
const GENRE = process.env.GENRE_URL;
const YEAR = process.env.YEAR_URL;
const ALL = process.env.ALL_URL;
const TOP_RATED = process.env.TOP_RATED_URL;
const UPCOMING = process.env.UPCOMING;
const GENRELIST = process.env.GENRE_MOVIE_LIST;

export default {
  API_KEY,
  API_URL,
  POPULAR,
  SEARCH,
  DETAILS,
  GENRE,
  PORT,
  YEAR,
  ALL,
  TOP_RATED,
  UPCOMING,
  GENRELIST,
};
