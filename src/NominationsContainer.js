import React from 'react'
import NominatedMovie from './NominatedMovie'
import Banner from './Banner'

const  NominationsContainer = ({nominations, removeFromNomination}) =>{

    return(
      <div>
        <h2>Nominations</h2>
        {nominations.map (movie => <NominatedMovie key={movie.imdbID} movie={movie} removeFromNomination={removeFromNomination} />)}
      </div>
    )
}

export default NominationsContainer