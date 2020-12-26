import React, {useState} from 'react'
import MovieCard from './MovieCard'


const ResultsContainer = ({movies, addToNomination,  disabledButtons, searchWord}) =>{


    return(
      <div>
        {searchWord.length > 0 ?
        <>
        <h2>Results for {!searchWord ? '...'  : `'${searchWord}'`}</h2>
        {movies.map ((movie, index) =>  <MovieCard key={movie.imdbID} index={index} movie={movie} addToNomination={addToNomination}  disabledButtons={disabledButtons} />)}
        </>
        :
        <h2>Search for your favorite movie</h2>
        }
      </div>
    )
}

export default ResultsContainer