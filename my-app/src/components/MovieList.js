import React, { useRef } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const inputEl = useRef("");
  const deleteMovieHandler = (id) => {
    props.getMovieId(id);
  };

  const renderMovieList = props.movies.map((movie) => {
    return (
      <MovieCard
        movie={movie}
        clickHander={deleteMovieHandler}
        key={movie.MovieId}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <div className="main">
      <h2>
        Movies List
        <Link to="/add">
          <button className="ui button blue right">Add Movie</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Movies by Name, Genre or Actor!"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderMovieList.length > 0
          ? renderMovieList
          : "No Movies available"}
      </div>
    </div>
  );
};

export default MovieList;
