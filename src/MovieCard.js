import React from "react";

const MovieCard = ({
  movie,
  addToNomination,
  disabled
}) => {
  const addDefaultSrc = (e) => {
    e.target.src = "/poster.jpg";
  };

  return (
    <div className="poster movie-card">
      <img onError={addDefaultSrc} src={movie.Poster} alt="poster" />
      <h2>{movie.Title}</h2>
      <h3>{movie.Year}</h3>
      <button
        onClick={() => addToNomination(movie)}
        disabled={disabled}
      >
        NOMINATE
      </button>
    </div>
  );
};

export default MovieCard;
