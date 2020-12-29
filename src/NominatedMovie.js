import React from 'react'


const  NominatedMovie = ({movie, removeFromNomination, disabledButtons, index}) =>{
  
  const addDefaultSrc = (e) =>{
    e.target.src ='/poster.jpg'
  }
    return(
      <div className='poster nominated-movie'>
        <img onError={addDefaultSrc} src={movie.Poster} alt='poster'/>
        <h2>{movie.Title}</h2>
        <h4>{movie.Year}</h4>
        <button  key={movie.imdbID} onClick={() => removeFromNomination(movie, index)} enabled={disabledButtons[index]}>REMOVE</button>
      </div>
    )
}

export default NominatedMovie