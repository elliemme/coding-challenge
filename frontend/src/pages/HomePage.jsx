import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../helpers/image";
import "../pages/HomePage/HomePage.css";
import CustomPagination from "../components/CustomPagination.js";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useGenre from "../helpers/useGenre.js";
import Genres from "../components/Genres/Genres";
import CardsHome from "../components/CardsHome/CardsHome";

function HomePage() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const genreforURL = useGenre(selectedGenres);

  const AllMovies = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/movies/all?&page=${page}`
    );

    console.log(data);

    setMovie(data.results);
    setNumOfPages(data.totalPages);
  };

  useEffect(() => {
    AllMovies();
  }, [page]);

  const fetchMoviesByGenre = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/movies/genre?genreId=${genreforURL}&page=${page}`
    );
    setMovie(data.results);
    setNumOfPages(data.totalPages);
  };

  useEffect(() => {
    fetchMoviesByGenre();
  }, [genreforURL, page]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <Genres
        selectedGenres={selectedGenres}
        genres={genres}
        setSelectedGenres={setSelectedGenres}
        setGenres={setGenres}
        setPage={setPage}
      />

      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {movie.map((movie) => (
          <>
            <div className="posterImage">
              <img
                src={`${IMAGE_URL}original${movie && movie.backdrop_path}`}
              />
            </div>
            <div className="movieDescription">
              <div className="posterImage_title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="posterImage_description">
                {movie ? movie.overview : ""}
              </div>
              <div className="buttons flex">
                <button
                  className="flex j-center a-center"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <AiOutlineInfoCircle />
                  More Info
                </button>
              </div>
            </div>
          </>
        ))}
      </Carousel>

      <div className="popular">
        {movie.map((movie) => (
          <CardsHome movie={movie} key={movie.id} id={movie.id} />
        ))}
      </div>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
}

export default HomePage;
