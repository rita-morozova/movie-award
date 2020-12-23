import React from 'react'
import MovieCard from './MovieCard'

const ResultsContainer = ({movies, addToNomination}) =>{


    return(
      <div>
        {movies.map (movie => <MovieCard key={movie.id} movie={movie} addToNomination={addToNomination}/>)}
      </div>
    )
}

export default ResultsContainer