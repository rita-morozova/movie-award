import React from 'react'
import MovieCard from './MovieCard'

const ResultsContainer = ({movies}) =>{

  console.log(movies)
    return(
      <div>
        {movies.map (movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    )
}

export default ResultsContainer