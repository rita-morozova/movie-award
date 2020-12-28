import React from 'react'


const  NominatedMovie = ({movie, removeFromNomination}) =>{
  
  const addDefaultSrc = (e) =>{
    e.target.src ='/poster.jpg'
  }
    return(
      <div className='poster'>
        <img onError={addDefaultSrc} src={movie.Poster} alt='poster'/>
        <h2>{movie.Title}</h2>
        <h2>{movie.Year}</h2>
        <button  key={movie.imdbID} onClick={() => removeFromNomination(movie)}>Remove</button>
      </div>
    )
}

export default NominatedMovie