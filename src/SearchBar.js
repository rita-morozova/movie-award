import React from 'react'

const SearchBar = ({onChange}) => {
  return (
    <div className="ui search">
        <input className="prompt" type='text' placeholder='Search...' onChange={onChange} />
    </div>
  )
}

export default SearchBar