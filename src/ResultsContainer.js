import React from 'react'
import MovieCard from './MovieCard'

const ResultsContainer = ({movies, addToNomination,  disabledButtons}) =>{


    return(
      <div>
        {movies.map ((movie, index) =>  <MovieCard key={movie.imdbID} index={index} movie={movie} addToNomination={addToNomination}  disabledButtons={disabledButtons} />)}
      </div>
    )
}

export default ResultsContainer