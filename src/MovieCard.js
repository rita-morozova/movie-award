import React from 'react'
import {  Icon, Image } from 'semantic-ui-react'


const MovieCard = ({movie, addToNomination,  index, disabledButtons}) =>{

  const addDefaultSrc = (e) =>{
    e.target.src ='/poster.jpg'
  }

    return(
      <div className='poster movie-card'>
        <img onError={addDefaultSrc} src={movie.Poster} alt='poster'/>
        <h2>{movie.Title}</h2>
        <h2>{movie.Year}</h2>
        <button onClick={() => addToNomination(index, movie)} disabled={disabledButtons[index]}>NOMINATE</button>
     </div> 
    )
}

export default MovieCard