import React from 'react'
import MovieCard from './MovieCard'
import LoadingComponent from './LoadingComponent'

const ResultsContainer = ({movies, addToNomination,  disabledButtons, searchWord}) =>{


    return(
      <div className='results col-8'>
        {searchWord.length > 0 ?
        <>
        <h2>Results for {!searchWord ? '...'  : `'${searchWord}'`}</h2>
        {movies.length ===0 ? 
        <>
        <h2>Too many results. Please enter a more specific title.</h2>
        <LoadingComponent /> 
        </>
        : null}
        {movies.map ((movie, index) =>  <MovieCard key={movie.imdbID} index={index} movie={movie} addToNomination={addToNomination}  disabledButtons={disabledButtons} />)}
        </>
        :
        <h2>Search for your favorite movie</h2>
        }
      </div>
    )
}

export default ResultsContainer