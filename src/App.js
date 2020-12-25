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
  disabledButtons: [],
  
}

componentDidMount = () => {
  const nominations = localStorage.getItem('nominations')
  if(nominations !== null){
    this.setState({nominations: JSON.parse(nominations)})
  }
  // const nominations = JSON.parse(localStorage.getItem('nominations'))
  // this.hydrateStateWithLocalStorage()
  // //added even listener to save state to local storage when user leaves or refreshes the page
  // window.addEventListener(
  //   'beforeunload',
  //   this.saveStateToLocalStorage.bind(this)
  // )
}

//saving state when the user leaves the app
// componentWillUnmount = () => {
//   window.removeEventListener(
//     'beforeunload',
//     this.saveStateToLocalStorage.bind(this)
//   )
//   //saves if component has a chance to unmount
//   this.saveStateToLocalStorage()
// }

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
  const {nominations} = this.state
  if(nominations.length < 5){
    if(!nominations.includes(movie)){
    this.setState((prevState) => {
      const newDisabledButtons = [...prevState.disabledButtons];
      newDisabledButtons[index] = true;
      localStorage.setItem('nominations', JSON.stringify([...prevState.nominations, movie]))
      return {
      nominations: [...prevState.nominations, movie],
      disabledButtons: newDisabledButtons
      }
    })
  }
  //Update Local Storage after adding a new movie
  // localStorage.setItem('nominations', JSON.stringify(nominations))
  // localStorage.setItem('movie', '')
 }
}

removeFromNomination = (movie) =>{
  this.setState((prevState) =>({
    nominations: prevState.nominations.filter(nominatedMovie =>nominatedMovie !== movie ) 
  }))
  //Update Local Storage after removing a movie from nominations
  localStorage.setItem('nominations', JSON.stringify(this.state.nominations))
}

displayBanner = () => {
  if(this.state.nominations.length === 5){
    return(
       <Banner />
    )
  }
}

//rendering items saved in Local Storage
hydrateStateWithLocalStorage = () =>{
  //for all items in state
  for(let key in this.state){
    //if the key exists in local storage
    if(localStorage.hasOwnProperty(key)){
      let value = localStorage.getItem(key)

      //parse the localStorage string and setState
      try{
        value = JSON.parse(value)
        this.setState({[key]: value})
      } catch (e){
        //handle empty string
        this.setState({[key]: value})
      }
    }
  }
}

saveStateToLocalStorage = () =>{
  //for every item in state
  for (let key in this.state){
    //save to local storage
    localStorage.setItem(key, JSON.stringify(this.state[key]))
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
