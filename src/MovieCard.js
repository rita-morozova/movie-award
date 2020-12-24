import React from 'react'

const MovieCard = ({movie, addToNomination,  index, disabledButtons}) =>{


    return(
      <div >
        <h2>{movie.Title}</h2>
        <h3>{movie.Year}</h3>
        <button onClick={() => addToNomination(index, movie)} disabled={disabledButtons[index]}>Nominate</button>
      </div> 
    )
}

export default MovieCard