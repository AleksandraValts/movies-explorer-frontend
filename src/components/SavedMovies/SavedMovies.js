import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCard from '../Movies/MoviesCard/MoviesCard.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';

function Movies() {
  return (
    <main className="movies">
        <Header visibility={"none"}/>
        <SearchForm/>
        <section className="cards">
          <div className="movies-cards">
            <MoviesCard >
              <button className="button movies-card__button-delete-like movies-card__button" 
              type="button">Сохранить</button>
            </MoviesCard>
            <MoviesCard>
              <button className="button movies-card__button-delete-like movies-card__button" 
              type="button">Сохранить</button>
            </MoviesCard>
            <MoviesCard>
              <button className="button movies-card__button-delete-like movies-card__button" 
              type="button">Сохранить</button>
            </MoviesCard>
          </div>
        </section>
        <Footer/>
    </main>
  );
}

export default Movies;