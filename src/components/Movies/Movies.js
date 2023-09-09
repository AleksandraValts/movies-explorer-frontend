import React from 'react';
import PropTypes from "prop-types";
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';

function Movies({movies}) {
  return (
    <main className="movies">
        <Header visibility={"none"}/>
        <SearchForm/>
        <MoviesCardList movies={movies}/>
        <Footer/>
    </main>
  );
}

export default Movies;