import React from 'react'

const MovieCard = ({movie, addToNomination,  index, disabledButtons}) =>{

  const addDefaultSrc = (e) =>{
    e.target.src ='/poster.jpg'
  }

    return(
      <div >
        <img onError={addDefaultSrc} src={movie.Poster} alt='poster' width='100px' height='150px' />
        <h2>{movie.Title}</h2>
        <h3>{movie.Year}</h3>
        <button onClick={() => addToNomination(index, movie)} disabled={disabledButtons[index]}>Nominate</button>
      </div> 
    )
}

export default MovieCard