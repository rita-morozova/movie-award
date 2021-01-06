import React from "react";
import MovieCard from "./MovieCard";
import LoadingComponent from "./LoadingComponent";

const ResultsContainer = ({
  movies,
  addToNomination,
  searchWord,
  nominations,
  nominated,
}) => {
  return (
    <div className="results col-s-8">
      {searchWord.length > 0 ? (
        <>
          <h2>Results for {!searchWord ? "..." : `'${searchWord}'`}</h2>
          {movies.length === 0 ? (
            <>
              <h2 style={{ marginTop: "15%" }}>
                Too many results. Please enter a more specific title
              </h2>
              <LoadingComponent />
            </>
          ) : null}
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              addToNomination={addToNomination}
              nominations={nominations}
              disabled={nominated.has(movie.imdbID)}
            />
          ))}
        </>
      ) : (
        <div className="empty">
          <h1 style={{ marginTop: "15%" }}>
            Search for your five favorite movies and nominate them for The
            Shoppies Movie Awards
          </h1>
        </div>
      )}
    </div>
  );
};

export default ResultsContainer;
