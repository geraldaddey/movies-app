import "./App.css";
import React from "react";
import { useEffect, useState } from "react";

import Movie from "./Components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=db80d1db4faebe3092bdd4cfb9f63fe9";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, SetMovies] = useState([]);
  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetMovies(data.results);
      });
  }, []);

  return (
    <div className="App">
      <div>
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

export default App;
