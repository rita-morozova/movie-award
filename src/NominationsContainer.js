import React from 'react'
import NominatedMovie from './NominatedMovie'


const  NominationsContainer = ({nominations, removeFromNomination}) =>{

    return(
      <div className='nominations col-4'>
        <h1>Nominations</h1>
        {nominations.length === 0 ? <h3>Nominate your first movie</h3> : null}
        {nominations.map (movie => <NominatedMovie key={movie.imdbID} movie={movie} removeFromNomination={removeFromNomination} />)}
      </div>
    )
}

export default NominationsContainer