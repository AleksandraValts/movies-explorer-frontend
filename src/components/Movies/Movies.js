import React from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';

function Movies() {
  return (
    <main className="movies">
        <Header/>
        <SearchForm/>
        <MoviesCardList/>
        <Footer/>
    </main>
  );
}

export default Movies;