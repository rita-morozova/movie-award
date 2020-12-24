import React from 'react'

const  NominatedMovie = ({movie, removeFromNomination}) =>{

    return(
      <div>
        <h2>{movie.Title}</h2>
        <h2>{movie.Year}</h2>
        <button  key={movie.imdbID} onClick={() => removeFromNomination(movie)}>Remove</button>
      </div>
    )
}

export default NominatedMovie