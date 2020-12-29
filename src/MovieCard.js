import React from 'react'
import {  Icon, Image } from 'semantic-ui-react'


const MovieCard = ({movie, addToNomination,  index, disabledButtons, nominations}) =>{

  const addDefaultSrc = (e) =>{
    e.target.src ='/poster.jpg'
  }

  //check if movie is nominated, if no -enable button
  const findMovie = (movie) =>{
    nominations.find(m => m===movie)
  }

    return(
      <div className='poster movie-card'>
        <img onError={addDefaultSrc} src={movie.Poster} alt='poster'/>
        <h2>{movie.Title}</h2>
        <h2>{movie.Year}</h2>
        <button onClick={() => addToNomination(index, movie)} disabled={disabledButtons[index]} enabled={!findMovie? true : false}>NOMINATE</button>
     </div> 
    )
}

export default MovieCard