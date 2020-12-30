import React from 'react'
import './styles/App.css'
import SearchBar from './SearchBar'
import ResultsContainer from './ResultsContainer'
import NominationsContainer from './NominationsContainer'
import Banner from './Banner'
import Header from './Header'
import axios from 'axios'
import {EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton} from 'react-share'



class App extends React.Component {

state = {
  movies: [],
  searchWord: '',
  error: null,
  nominations: [],
  disabledButtons: [], 
}

componentDidMount = () => {
  let nominations = localStorage.getItem('nominations')
  if(nominations !==null){
    this.setState({nominations: JSON.parse(nominations)})
  }
}

findMovies = async(input) => {
  const key = process.env.REACT_APP_OMDB_API_KEY
  const response = await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${input}`)
  const {data} = response
  const {Search} = data
  
  if (data.Response === 'True'){
    this.setState({
      movies: Search,
      disabledButtons: new Array(Search.length).fill(false)
    })
  }else if(data.Error === 'Movie Not Found'){
    this.setState({error: 'Movie not Found. Please try again'})
  }else if (data.Error === 'Too many results'){
    this.setState({error: 'Too many results. Please enter a more specific title.'})
  }
}

handleSearch = (e) =>{
  this.setState({searchWord: e.target.value})
  this.findMovies(this.state.searchWord)
}

handleError = () => {
  if(this.state.error){
    alert(this.state.error)
  }
}

addToNomination= (index, movie) =>{
  const {nominations} = this.state
  if(nominations.length < 5){
    if(!nominations.includes(movie)){
    this.setState((prevState) => {
      const newDisabledButtons = [...prevState.disabledButtons];
      newDisabledButtons[index] = true;
      //Update Local Storage after adding a new movie
      localStorage.setItem('nominations', JSON.stringify([...prevState.nominations, movie]))
      return {
      nominations: [...prevState.nominations, movie],
      disabledButtons: newDisabledButtons
      }
    })
  }
 }
}

removeFromNomination = (movie, index) =>{
  this.setState((prevState) => {
    const updatedList = [...prevState.nominations].filter(nm => nm !== movie);
    const newDisabledButtons = [...prevState.disabledButtons];
    newDisabledButtons[index] = false;
    //Update Local Storage after removing a movie from nominations
    localStorage.setItem('nominations', JSON.stringify(updatedList))
    return{
      nominations: updatedList,
      disabledButtons: newDisabledButtons
    }
  })
}

displayBanner = () => {
  if(this.state.nominations.length === 5){
    return(
       <Banner />
    )
  }
}
 
render(){
const {movies, nominations,  disabledButtons, searchWord} = this.state
const url = 'http://localhost:3000/'
const subject = 'The Shoppies: Movie awards for entrepreneurs'
const body = 'Check out The Shoppies Awards and vote now for your top-five movies of 2020!'
  return (
    <div className='App'>
      {this.handleError()}

      <Header /> 
      <div className='background'>

     {!this.displayBanner() ? <SearchBar onChange={this.handleSearch} findMovies={this.findMovies} /> : this.displayBanner() }

    

      <div className='row'>
      <ResultsContainer  movies={movies}  addToNomination={this.addToNomination}  disabledButtons={disabledButtons} searchWord={searchWord} nominations={nominations} />
      <NominationsContainer nominations={nominations} removeFromNomination={this.removeFromNomination} disabledButtons={disabledButtons}/>
      </div>

      <div className='icons'>
      <EmailShareButton  url ={url} subject={subject} body={body}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
      <FacebookShareButton url={url} quote={body}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton url={url} title={subject} summary={body}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={body} hashtags={['movieaward', 'shopify']}>
        <TwitterIcon size={32} round={true}/>
      </TwitterShareButton>
      </div>

      </div>
    </div>
  )
 }
}

export default App
