import React from 'react'

const MovieCard = ({movie, addToNomination}) =>{

    return(
      <div>
        <h2>{movie.Title}</h2>
        <h3>{movie.Year}</h3>
        <button onClick={() => addToNomination(movie)}>Nominate</button>
      </div>
    )
}

export default MovieCard