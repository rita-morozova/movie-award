import React from 'react'
import NominatedMovie from './NominatedMovie'

const  NominationsContainer = ({nominations, removeFromNomination}) =>{

    return(
      <div>
        <h2>Nominations</h2>
        {nominations.map (movie => <NominatedMovie key={movie.id} movie={movie} removeFromNomination={removeFromNomination} />)}
      </div>
    )
}

export default NominationsContainer