import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


const MovieCard = ({movie, addToNomination,  index, disabledButtons}) =>{

  const addDefaultSrc = (e) =>{
    e.target.src ='/poster.jpg'
  }

    return(
      <div className='poster movie-card'>
        <img onError={addDefaultSrc} src={movie.Poster} alt='poster' wrapped ui={false} />
           
        <h2>{movie.Title}</h2>
        <h3>{movie.Year}</h3>
        <button onClick={() => addToNomination(index, movie)} disabled={disabledButtons[index]}>Nominate</button>
     </div> 
    )
}

export default MovieCard