import React from 'react'
import NominatedMovie from './NominatedMovie'

const  NominationsContainer = ({nominations}) =>{

    return(
      <div>
        <h2>Nominations</h2>
        {nominations.map (movie => <NominatedMovie key={movie.id} movie={movie} />)}
      </div>
    )
}

export default NominationsContainer