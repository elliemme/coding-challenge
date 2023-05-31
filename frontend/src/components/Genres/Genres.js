import { useEffect } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";
import "./Genres.css";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const handleAddGenre = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemoveGenre = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get("http://localhost:8000/movies/genre-list");
    console.log(genres);
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres();
    };
  }, []);

  return (
    <div className="col-lg-12" style={{ padding: "0" }}>
      <div className="chip-genre">
        {selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            key={genre.id}
            sx={{ bgcolor: "#708090" }}
            clickable
            onDelete={() => handleRemoveGenre(genre)}
          />
        ))}

        {genres?.map((genre) => (
          <Chip
            label={genre.name}
            size="small"
            key={genre.id}
            clickable
            onClick={() => handleAddGenre(genre)}
          />
        ))}
      </div>
    </div>
  );
};

export default Genres;
