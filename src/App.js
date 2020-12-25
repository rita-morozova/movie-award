import React, {useState} from 'react'
import './App.css'
import SearchBar from './SearchBar'
import ResultsContainer from './ResultsContainer'
import NominationsContainer from './NominationsContainer'
import Banner from './Banner'
import axios from 'axios'

class App extends React.Component {

state = {
  movies: [],
  searchWord: '',
  error: null,
  nominations: [],
  disabledButtons: []
}

findMovies = async(word) => {
  const key = process.env.REACT_APP_OMDB_API_KEY
  const response = await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${word}`)
  const {data} = response
  const {Search} = data
  
  if (data.Response === 'True'){
    this.setState({
      movies: Search,
      disabledButtons: new Array(Search.length).fill(false)
    })
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

addToNomination= (index, movie) =>{
  if(this.state.nominations.length < 5){
    if(!this.state.nominations.includes(movie)){
    this.setState((prevState) => {
      const newDisabledButtons = [...prevState.disabledButtons];
      newDisabledButtons[index] = true;
      return {
      nominations: [...prevState.nominations, movie],
      disabledButtons: newDisabledButtons
      }
    })
  }
 }
}

removeFromNomination = (movie) =>{
  this.setState((prevState) =>({
    nominations: prevState.nominations.filter(nominatedMovie =>nominatedMovie !== movie )
  }))
}

displayBanner = () => {
  if(this.state.nominations.length === 5){
    return(
       <Banner />
    )
  }
}
 
render(){
const {movies, nominations,  disabledButtons} = this.state
  console.log(this.state.nominations)
  return (
    <div className="App">
      <SearchBar onChange={this.handleSearch} onSubmit={this.handleSubmit} findMovies={this.findMovies} />
      <ResultsContainer  movies={movies}  addToNomination={this.addToNomination}  disabledButtons={disabledButtons} />
      <NominationsContainer nominations={nominations} removeFromNomination={this.removeFromNomination}/>
      {this.displayBanner()}
    </div>
  )
 }
}

export default App;
