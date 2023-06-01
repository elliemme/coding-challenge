import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./SearchPage.css";
import CustomPagination from "../../components/CustomPagination.js";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchPage.css";
import CardsMovies from "../../components/CardsMovies/CardsMovies";

function SearchPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const fetchSearchMovies = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/movies/search?query=${searchText}&page=${page}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearchMovies();
  }, [page]);

  return (
    <>
      <Navbar isScrolled={isScrolled} />

      <div className="movieSearch">
        <div className="containerSearch">
          <div className="searchPage">
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ color: "black", backgroundColor: "white" }}
            />
            <Button
              onClick={fetchSearchMovies}
              variant="contained"
              style={{ marginLeft: 10 }}
              sx={{ backgroundColor: "darkgrey" }}
            >
              <SearchIcon sx={{ color: "black" }} fontSize="large" />
            </Button>
          </div>

          <div className="tabs-search">
            <Tabs
              value={type}
              sx={{ color: "white", backgroundColor: "black" }}
              onChange={(event, newValue) => {
                setType(newValue);
                setPage(1);
              }}
              style={{ color: "white", backgroundColor: "black" }}
              aria-label="disabled tabs example"
            >
              <Tab
                style={{
                  color: "white",
                  width: "100%",
                  alignItems: "center",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                label="Search Movies"
              />
            </Tabs>
          </div>
        </div>

        <div
          className="main-searchField"
          style={{
            width: "100%",
            minHeight: "100vh",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="popular">
            {content &&
              content.map((movie, index) => {
                return (
                  <CardsMovies movie={movie} index={index} key={movie.id} />
                );
              })}

            {searchText &&
              !content &&
              (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
          </div>

          {numOfPages > 1 && (
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
