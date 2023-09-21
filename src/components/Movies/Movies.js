import React from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import { getMovies } from '../../utils/ApiMovies.js';
import Preloader from '../Movies/Preloader/Preloader.js';
import {EMPTY_SEARCH, CONNECTION_ERROR} from '../../utils/errors.js'

function Movies({onCardSave, savedMovies, onCardDelete}) {
  const [films, setMovies] = React.useState([]);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSearchFilter = React.useCallback((movies, item, short) => {
    if (!movies) { return null}
    return movies.filter((movie) =>
      (short ? movie.duration <= 40 : movie) &&
      (movie.nameRU.toLowerCase().includes(item.toLowerCase()) ||
       movie.nameEN.toLowerCase().includes(item.toLowerCase()))
    );
  }, []);

  function handleSearch(item, shorts) {
    setIsLoading(true)
    const films =  JSON.parse(localStorage.getItem('films'));
    if (!films) {
      getMovies().then((film) => {
        localStorage.setItem('films', JSON.stringify(film));
        handleFilter(item, shorts);
      })
      .catch(() => {
        setIsLoading(false)
        setError(CONNECTION_ERROR);
      });
    } else { handleFilter(item, shorts)}
  };
  
  function handleFilter(item, shorts) {
    setError('')
    const localFilms = JSON.parse(localStorage.getItem('films'));
    const filtered = handleSearchFilter(localFilms, item, shorts);
    if (filtered.length === 0) {
      setIsLoading(false);
      setError(EMPTY_SEARCH);
    }
    setMovies(filtered);
    setIsLoading(false)
  };

  return (
    <main className="movies">
        <Header visibility={"none"}/>
        <SearchForm handleSearch={handleSearch}/>
        
        {isLoading ? (<Preloader />) : (
        <MoviesCardList movies={films} error={error}
                        onCardSave={onCardSave} onCardDelete={onCardDelete}
                        savedMovies={savedMovies} />)
        }         
        <p className='movies__error'>{error}</p>            
        <Footer/>
    </main>
  );
}

export default Movies;