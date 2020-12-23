import React from 'react'

const MovieCard = ({movie}) =>{

    return(
      <div>
        <h2>{movie.Title}</h2>
        <h3>{movie.Year}</h3>
        <button>Nominate</button>
      </div>
    )
}

export default MovieCard