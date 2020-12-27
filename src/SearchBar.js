import React from 'react'

const SearchBar = ({onChange, onSubmit}) => {
  return (
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Search...' onChange={onChange} />
      </form>
  )
}

export default SearchBar