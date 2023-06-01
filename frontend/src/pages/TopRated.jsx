import React, { useEffect, useState } from "react";
import CustomPagination from "../components/CustomPagination.js";
import axios from "axios";
import Navbar from "../components/Navbar";
import CardsHome from "../components/CardsHome/CardsHome.jsx";

const TopRated = () => {
  const [movieList, setMovieList] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  const fetchUpcoming = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/movies/top?page=${page}`
    );
    console.log(data);
    setMovieList(data.results);
    setNumOfPages(data.totalPages);
  };

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    fetchUpcoming();
  }, [page]);

  return (
    <>
      <Navbar isScrolled={isScrolled} />

      <div
        className="homePage"
        style={{ width: "100%", marginTop: "150px", textAlign: "center" }}
      >
        <span
          className="pageTitle"
          style={{ fontSize: "30px", textTransform: "uppercase" }}
        >
          Top Rated
        </span>
        <div className="popular">
          {movieList.map((movie) => (
            <CardsHome movie={movie} key={movie.id} id={movie.id} />
          ))}
        </div>
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
};

export default TopRated;
