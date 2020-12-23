import React from 'react'

const  NominatedMovie = ({movie}) =>{

    return(
      <div>
        <h2>{movie.Title}</h2>
        <h2>{movie.Year}</h2>
        <button>Remove</button>
      </div>
    )
}

export default NominatedMovie