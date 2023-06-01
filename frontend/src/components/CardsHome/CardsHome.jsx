import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./CardsHome.css";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../helpers/image";
import Moment from "react-moment";
import { AiOutlineInfoCircle } from "react-icons/ai";

const CardsHome = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <img
              className="cards__img"
              src={`${IMAGE_URL}original${movie ? movie.poster_path : ""}`}
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
              <div className="add-info">
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

              <div className="card__description">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default CardsHome;
