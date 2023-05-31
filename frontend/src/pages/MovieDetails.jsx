import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IMAGE_URL,
  img_185,
  noPicture,
  image_size,
  poster_size,
} from "../helpers/image.js";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";

const handleDragStart = (e) => e.preventDefault();

export default function MovieDetails() {
  const [movie, setMovie] = useState();
  const [credits, setCredits] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const { id } = useParams();

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/movies/credits?movieId=${id}`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchDetails = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/movies/details?movieId=${id}`
    );
    setMovie(data);
  };

  useEffect(() => {
    fetchDetails();
    window.scrollTo(0, 0);
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const items = credits.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_185}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="movie">
        <div className="movie__intro">
          <img
            className="movie__backdrop"
            src={`${IMAGE_URL}${image_size}${movie ? movie.backdrop_path : ""}`}
          />

          <div className="movie__poster">
            <img
              className="movie__posterpath"
              src={`${IMAGE_URL}${poster_size}${
                movie ? movie.poster_path : ""
              }`}
            />

            <span className="movie__poster_title">
              {movie?.original_title}{" "}
            </span>
            <span className="movie__releaseDate">
              {movie ? "Release date: " + movie?.release_date : ""}
            </span>

            <div className="movie__rating">
              <i class="fas fa-star" />
              {movie ? movie?.vote_average : ""}
              <span className="movie__voteCount">
                {movie ? "(" + movie?.vote_count + " votes)" : ""}
              </span>
            </div>

            <div className="movie__runtime">
              {movie ? movie?.runtime + " mins" : ""}
            </div>

            <div className="movie__genres">
              {movie && movie?.genres
                ? movie.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>

            <p className="movie__overview">{movie?.overview}</p>
          </div>

          <div className="castMovie">
            <h3 className="textMovieCast">Movie Cast</h3>
          </div>
          <AliceCarousel
            mouseTracking
            infinite
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
          />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;

  .movie__rating {
    font-size: 1rem;
    margin-left: 250px;
    margin-top: 0;
    -webkit-box-pack: center;
    justify-content: left;
    -webkit-box-align: left;
    align-items: center;
    text-align: center;
    display: flex;
  }

  .movie__voteCount {
    margin-left: 5px;
  }

  .movie__runtime {
    font-size: 1rem;
    margin-left: 250px;
    margin-top: 0px;
    -webkit-box-pack: center;
    justify-content: left;
    -webkit-box-align: left;
    align-items: center;
    text-align: center;
    display: flex;
  }

  .movie__releaseDate {
    font-size: 1.5rem;
    margin-left: 250px;
    margin-top: 0;
    -webkit-box-pack: center;
    justify-content: left;
    -webkit-box-align: left;
    align-items: center;
    text-align: center;
    display: flex;
  }

  .movie__genres {
    font-size: 2rem;
    margin-left: 250px;
    margin-top: 10px;
    -webkit-box-pack: center;
    justify-content: left;
    -webkit-box-align: left;
    align-items: center;
    text-align: center;
    display: flex;
  }

  .movie__genre {
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    text-align: center;
    font-size: 1rem;
    margin-right: 5px;
    border-radius: 50px;
    background-color: white;
    color: black;
    padding: 10px;
    font-weight: 600;
  }

  .movie__backdrop {
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 80px 80px 80px;
    margin-left: 0%;
  }

  .movie__poster {
    margin-left: 120px;
    margin-bottom: 50px;
  }

  .movie__posterpath {
    height: 300px;
    width: 200px;
    margin-top: -200px;
    box-shadow: 0.5em 0.5em 0.5em whitesmoke;
    border-radius: 10px;
  }

  .movie__poster_title {
    font-size: 2.5rem;
    margin-left: 250px;
    margin-top: -270px;
    -webkit-box-pack: center;
    justify-content: left;
    -webkit-box-align: left;
    align-items: center;
    text-align: center;
    display: flex;
  }

  .movie__overview {
    font-size: 1.2rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 95px;
    margin-bottom: -2rem;
    padding: 0 100px 0 50px;
  }

  .textMovieCast {
    color: white !important;
    margin-bottom: 4rem;
    margin-top: 80px;
    margin-bottom: 0px;
    font-size: 1.5rem;
    align-items: center;
    font-weight: 600;
    text-shadow: 0px 0px 5px #000000;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .carouselItem {
    background-color: #000000;
    margin-bottom: 10px;
    padding: 10px;
  }

  .carouselItem__txt {
    color: white;
    text-shadow: 0px 0px 5px #000000;
  }

  .carouselItem__img {
    border-radius: 10px;
    margin-bottom: 5px;
    box-shadow: 0px 0px 5px black;
  }
`;
