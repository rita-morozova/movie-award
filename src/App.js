import React, {useState} from 'react'
import './App.css'
import SearchBar from './SearchBar'
import ResultsContainer from './ResultsContainer'
import NominationsContainer from './NominationsContainer'
import axios from 'axios'

class App extends React.Component {

state = {
  movies: [],
  searchWord: '',
  error: null,
  nominations: []
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
  this.findMovies(this.state.searchWord)
}

addToNomination= (movie) =>{
  if(!this.state.nominations.includes(movie)){
    this.setState((prevState) => ({
      nominations: [...prevState.nominations, movie]
    }))
  }
}

removeFromNomination = (movie) =>{
  this.setState((prevState) =>({
    nominations: prevState.nominations.filter(nominatedMovie =>nominatedMovie !== movie )
  }))
}

// handleSubmit = (e) => {
//   e.preventDefault()
//   if(!this.state.searchWord){
//     this.setState({error: 'Field can not be left blank'})
//   }else{
//     this.findMovies(this.state.searchWord)
//     this.setState({searchWord: ''})
//   }
// }

 
render(){
const {movies, nominations} = this.state
  console.log(this.state.nominations)
  return (
    <div className="App">
      <SearchBar onChange={this.handleSearch} onSubmit={this.handleSubmit} findMovies={this.findMovies} />
      <ResultsContainer  movies={movies}  addToNomination={this.addToNomination} />
      <NominationsContainer nominations={nominations} removeFromNomination={this.removeFromNomination}/>
    </div>
  )
 }
}

export default App;
