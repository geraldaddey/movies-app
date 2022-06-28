import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import Movie from "./Components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=db80d1db4faebe3092bdd4cfb9f63fe9";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=db80d1db4faebe3092bdd4cfb9f63fe9&query=";

function App() {
  const [movies, SetMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // fetch movies data from API and set it to new state
  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetMovies(data.results);
      });
  }, []);

  // const handleClick = () => {
  //   console.log("button clicked");

  //   // fetch(SEARCH_API + searchTerm)
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     console.log(data);
  //   //     SetMovies(data.results);
  //   //   });
  // };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          SetMovies(data.results);
        });
    }

    setSearchTerm("");
  };

  return (
    <div className="App">
      <h2>MOVIES APP</h2>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <FaSearch type="submit" onClick={handleOnSubmit} />
        </form>
      </header>
      {/* display a list of movies and pass props to Movie component  */}
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

export default App;
