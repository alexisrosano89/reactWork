import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import api from "../api/apidir";
import Header from "./Header";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //RetrieveMovies from the WEBAPI
  const retrieveMovies = async () => {
    const response = await api.get("/movie");
    console.log(response.data);
    return response.data;
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newMovieList = movies.filter((movie) => {
        return Object.values(movie)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newMovieList);
    } else {
      setSearchResults(movies);
    }
  };

  useEffect(() => {
    const getAllMovies = async () => {
      const allMovies = await retrieveMovies();
      if (allMovies){
        setMovies(allMovies);
      }
    };

    getAllMovies();
  }, []);

  useEffect(() => {
  }, [movies]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <MovieList
                {...props}
                movies={searchTerm.length < 1 ? movies : searchResults}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/"
            render={(props) => (
              alert("¡Not implemented!")
            )}
          />

          <Route
            path="/"
            render={(props) => (
              alert("¡Not implemented!")
          )}
        />
      <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
      </Router>
    </div>
  );
}


export default App;
