import React, { useState } from "react";
import { img_300 } from "../../helpers/image";
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

const CardsMovies = ({ movie, isWatched = false }) => {
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

  return (
    <div className="cards">
      <img className="cards__img" src={`${img_300}${movie.poster_path}`} />
      <div className="cards__overlay">
        <div className="card__title">{movie ? movie.original_title : ""}</div>
        <div className="card__runtime">
          <Moment format="YYYY">{movie ? movie.release_date : ""}</Moment>
          <span className="card__rating">
            {movie ? movie.vote_average : ""}
            <i className="fas fa-star" />
          </span>
        </div>
        <div className="add-info">
          {isWatched ? (
            <BsTrash
              style={{
                fontSize: "30px",
                marginRight: "50px",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
              title="Remove from List"
              onClick={() =>
                dispatch(removeMovieFromLiked({ movieId: movie.id, email }))
              }
            />
          ) : (
            <AiOutlinePlus
              style={{
                fontSize: "30px",
                marginRight: "50px",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
              title="Add to my list"
              onClick={addToList}
            />
          )}

          <AiOutlineInfoCircle
            style={{
              fontSize: "30px",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
            title="More Info"
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardsMovies;
