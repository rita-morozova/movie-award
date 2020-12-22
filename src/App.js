import React, {useState} from 'react'
import './App.css'
import SearchBar from './SearchBar'
import ResultsContainer from './ResultsContainer'

const App = () => {

  const [movies, setMovies] = useState([])
  const [searchWord, setSearchWord] = useState('')

  const handleSearch = (e) => {
    setSearchWord(e.target.value)
    findMovies()
    console.log(movies)
  }

  const findMovies = () => {
    const key = process.env.REACT_APP_OMDB_API_KEY
    fetch(`http://www.omdbapi.com/?apikey=${key}&s=${searchWord}`)
    .then(resp => resp.json())
    .then(data => setMovies(data))
  }
 

  return (
    <div className="App">
      <SearchBar onChange={handleSearch} />
      <ResultsContainer />
    </div>
  )
}

export default App;
