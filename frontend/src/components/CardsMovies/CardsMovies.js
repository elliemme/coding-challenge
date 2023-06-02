import React, { useEffect, useState } from "react";
import { IMAGE_URL, img_300, unavailable } from "../../helpers/image";
import Moment from "react-moment";
import { firebaseAuth } from "../../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { removeMovieFromLiked } from "../../store";
import "./CardsMovies.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CardsMovies = ({ movie, isWatched = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:8000/user/add", {
        email,
        data: movie,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="black" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <div className="cards">
          <img
            className="cards__img"
            src={`${IMAGE_URL}original${
              movie ? movie.poster_path : unavailable
            }`}
          />
          <div className="cards__overlay">
            <div className="card__title">
              {movie ? movie.original_title : ""}
            </div>
            <div className="card__runtime">
              <Moment format="YYYY">{movie ? movie.release_date : ""}</Moment>
              <span className="card__rating">
                {movie ? movie.vote_average : ""}
                <i className="fas fa-star" />
              </span>
            </div>
            <div className="add__info">
              {isWatched ? (
                <BsTrash
                  style={{ fontSize: "25px", marginRight: "10px" }}
                  title="Remove from List"
                  onClick={() =>
                    dispatch(removeMovieFromLiked({ movieId: movie.id, email }))
                  }
                />
              ) : (
                <AiOutlinePlus
                  style={{ fontSize: "25px", marginRight: "10px" }}
                  title="Add to my list"
                  onClick={addToList}
                />
              )}

              <AiOutlineInfoCircle
                style={{ fontSize: "25px" }}
                title="More Info"
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            </div>
            <div className="card__description">
              {movie ? movie.overview.slice(0, 118) + "..." : ""}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardsMovies;
