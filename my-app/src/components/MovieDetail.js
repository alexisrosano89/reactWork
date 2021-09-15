import React from "react";
import { Link } from "react-router-dom";
import user from "../images/cinema.png";

const MovieDetail = (props) => {
  const { MovieId, MovieName, MovieGenre, ActorName } = props.location.state.movie;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{MovieName}</div>
          <div className="description">{MovieGenre}</div>
          <div className="description">{ActorName}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Movie List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieDetail;
