import React from "react";
import NominatedMovie from "./NominatedMovie";

const NominationsContainer = ({
  nominations,
  removeFromNomination,
  nominated,
}) => {
  return (
    <div className="nominations col-s-4">
      <h1>NOMINATIONS</h1>
      {nominations.length === 0 ? (
        <>
          <img src="/nominate.jpg" alt="poster" height={265} />
          <h3>Nominate your first movie...</h3>
        </>
      ) : null}
      {nominations.map((movie) => (
        <NominatedMovie
          key={movie.imdbID}
          movie={movie}
          removeFromNomination={removeFromNomination}
          disabled={nominated.has(movie.imdbID)}
        />
      ))}
    </div>
  );
};

export default NominationsContainer;
