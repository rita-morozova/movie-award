import React from 'react'
import NominatedMovie from './NominatedMovie'


const  NominationsContainer = ({nominations, removeFromNomination}) =>{

    return(
      <div>
        <h2>Nominations</h2>
        {nominations.length === 0 ? 'Nominate your first movie' : null}
        {nominations.map (movie => <NominatedMovie key={movie.imdbID} movie={movie} removeFromNomination={removeFromNomination} />)}
      </div>
    )
}

export default NominationsContainer