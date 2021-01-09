import React, { useState, useEffect } from "react";
import "./styles/App.css";
import SearchBar from "./SearchBar";
import ResultsContainer from "./ResultsContainer";
import NominationsContainer from "./NominationsContainer";
import Banner from "./Banner";
import Header from "./Header";
import axios from "axios";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [error, setError] = useState(null);
  const [nominations, setNominations] = useState([]);

  const getItemsFromLocalStorage = () => {
    let nominations = localStorage.getItem("nominations");
    if (nominations !== null) {
      setNominations(JSON.parse(nominations));
    }
  };

  //add an empty array to prevent an infinite loop
  useEffect(() => {
    getItemsFromLocalStorage();
  }, []);

  const findMovies = async (input) => {
    const key = process.env.REACT_APP_OMDB_API_KEY;
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${key}&s=${input}`
    );
    const { data } = response;
    const { Search } = data;

    if (data.Response === "True") {
      setMovies(Search);
    } else if (data.Error === "Movie Not Found") {
      setError("Movie not Found. Try again");
    } else if (data.Error === "Too many results") {
      setError("Too many results. Enter a more specific title.");
    }
  };

  const handleSearch = (e) => {
    setSearchWord(e.target.value);
    findMovies(searchWord);
  };

  const handleError = () => {
    if (error) {
      alert(error);
    }
  };

  const addToNomination = (movie) => {
    if (nominations.length < 5) {
      if (!nominations.includes(movie)) {
        setNominations([...nominations, movie]);
        //Update Local Storage after adding a new movie
        localStorage.setItem(
          "nominations",
          JSON.stringify([...nominations, movie])
        );
      }
    }
  };

  const removeFromNomination = (movie) => {
    const updatedList = [...nominations].filter((nominatedMovie) => nominatedMovie !== movie);
    setNominations(updatedList);
    //Update Local Storage after removing a movie from nominations
    localStorage.setItem("nominations", JSON.stringify(updatedList));
  };

  const displayBanner = () => {
    if (nominations.length === 5) {
      return <Banner />;
    }
  };

  const nominated = new Set(
    nominations.map((nominatedMovie) => nominatedMovie.imdbID)
  );
  const url = "https://shoppies-award.netlify.app/";
  const subject = "The Shoppies: Movie awards for entrepreneurs";
  const body =
    "Check out The Shoppies Awards and vote now for your top-five movies of 2020!";

  return (
    <div className="App">
      {handleError()}
      <Header />
      <div className="background">
        {!displayBanner() ? (
          <SearchBar onChange={handleSearch} findMovies={findMovies} />
        ) : (
          displayBanner()
        )}
        <div className="row">
          <ResultsContainer
            movies={movies}
            addToNomination={addToNomination}
            searchWord={searchWord}
            nominations={nominations}
            nominated={nominated}
          />
          <NominationsContainer
            nominations={nominations}
            removeFromNomination={removeFromNomination}
            nominated={nominated}
          />
        </div>
        <div className="icons">
          <EmailShareButton url={url} subject={subject} body={body}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
          <FacebookShareButton url={url} quote={body}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <LinkedinShareButton url={url} title={subject} summary={body}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <TwitterShareButton
            url={url}
            title={body}
            hashtags={["movieaward", "shopify"]}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};

export default App;
