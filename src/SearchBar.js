import React from 'react'

const SearchBar = ({onChange, onSubmit}) => {
  return (
    <div className="ui search">
      <form onSubmit={onSubmit}>
        <input className="prompt" type='text' placeholder='Search...' onChange={onChange} />
        <button>Find Movies</button>
      </form>
    </div>
  )
}

export default SearchBar