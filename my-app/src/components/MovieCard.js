import React from "react";
import { Link } from "react-router-dom";
import user from "../images/cinema.png";

const MovieCard = (props) => {
  const { MovieId, MovieName, MovieGenre, ActorName } = props.movie;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link
          to={{ pathname: `/movie/${MovieId}`, state: { movie: props.movie } }}
        ></Link>
          <div className="header">{MovieName}</div>
          <div>{MovieGenre}</div>
          <div>{ActorName}</div>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHander(MovieId)}
      ></i>
      <Link to={{ pathname: `/edit`, state: { movie: props.movie } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default MovieCard;
