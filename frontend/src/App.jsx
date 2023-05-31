import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import MovieDetails from "./pages/MovieDetails";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import UserList from "./pages/UserList";
import SearchPage from "./pages/Search/SearchPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/top-rated" element={<TopRated />} />
        <Route exact path="/upcoming" element={<Upcoming />} />
        <Route exact path="/my-list" element={<UserList />} />
        <Route exact path="*" element={<NotFound />} />
        <Route exact path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
