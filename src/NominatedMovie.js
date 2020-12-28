import React from 'react'


const  NominatedMovie = ({movie, removeFromNomination}) =>{
  
  const addDefaultSrc = (e) =>{
    e.target.src ='/poster.jpg'
  }
    return(
      <div className='poster nominated-movie'>
        <img onError={addDefaultSrc} src={movie.Poster} alt='poster'/>
        <h2>{movie.Title}</h2>
        <h4>{movie.Year}</h4>
        <button  key={movie.imdbID} onClick={() => removeFromNomination(movie)}>REMOVE</button>
      </div>
    )
}

export default NominatedMovie