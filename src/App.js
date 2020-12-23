import React, {useState} from 'react'
import './App.css'
import SearchBar from './SearchBar'
import ResultsContainer from './ResultsContainer'
import axios from 'axios'

class App extends React.Component {

state = {
  movies: [],
  searchWord: '',
  error: null
}

findMovies = async(word) => {
  const key = process.env.REACT_APP_OMDB_API_KEY
  const response = await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${word}`)
  const {data} = response
  const {Search} = data
  
  if (data.Response === 'True'){
    this.setState({movies: Search})
  }else if(data.Error === 'Movie Not Found'){
    this.setState({error: 'Your search did not return any matches. Please try again'})
  }else if (data.Error === 'Too many results'){
    this.setState({error: 'Too many results. Please enter a more specific title.'})
  }
}

handleSearch = (e) =>{
  this.setState({searchWord: e.target.value})
  this.findMovies()
}

handleSubmit = (e) => {
  e.preventDefault()
  if(!this.state.searchWord){
    this.setState({error: 'Field can not be left blank'})
  }else{
    this.findMovies(this.state.searchWord)
    this.setState({searchWord: ''})
  }
}

 
render(){
  // const searchMovies =  this.state.movies.filter(movie => movie.title.includes(this.state.searchWord)) 
  console.log(this.state.movies)
  return (
    <div className="App">
      <SearchBar onChange={this.handleSearch} onSubmit={this.handleSubmit} findMovies={this.findMovies} />
      <ResultsContainer  movies={this.state.movies} />
    </div>
  )
 }
}

export default App;
