import React from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import { getMovies } from '../../utils/ApiMovies.js';
import Preloader from '../Movies/Preloader/Preloader.js';
import {EMPTY_SEARCH, CONNECTION_ERROR} from '../../utils/errors.js'
import {SHORT_TIME} from '../../utils/films.js'

function Movies({onCardSave, savedMovies, onCardDelete}) {
  const [films, setFilms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [shorts, setShorts] = React.useState(false);
  const [filtered, setFiltered] = React.useState([]);
 
  const filterShorts = (movies) =>{return movies.filter((movie) => movie.duration < SHORT_TIME)}
  const filterMovies = (movies, item) => {
    const filtered = movies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(item.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(item.toLowerCase())
    );
    return filtered;
  }

  React.useEffect(() => {
    const filtered = JSON.parse(localStorage.getItem('filtered'));
    const short = localStorage.getItem('short') === 'true';
    setFilms(filtered || []);
    setFiltered(shorts ? filterShorts(filtered) : filtered || []);
    setShorts(short);
  }, [shorts]);

  React.useEffect(() => {
    setError('');
    const movie = localStorage.getItem('searched');
    if (filtered.length === 0 && movie) {setError(EMPTY_SEARCH)};
  }, [filtered]);

  //React.useEffect(() => {
  //  const filtered = filterMovies(savedMovies, item, shorts);
 //   if (filtered.length === 0) { setError(EMPTY_SEARCH) };
 //   setFilms(shorts ? filterShorts(filtered) : filtered);
 // }, [savedMovies, shorts, item]);

  function handleFilter(movies, query, short) {
    setError('');
    const filtered = filterMovies(movies, query, short);
    setFilms(filtered);
    setFiltered(short ? filterShorts(filtered) : filtered);
    localStorage.setItem('filtered', JSON.stringify(filtered));
    localStorage.setItem('films', JSON.stringify(movies));
  }

  function handleShorts() {
    setError('');
    const filtered = !shorts;
    localStorage.setItem('short', filtered);
    setShorts(filtered);
    setFiltered(filtered ? filterShorts(films) : films);
  }
  
  function handleSearch(movie) {
    setError('');
    const films = JSON.parse(localStorage.getItem('films'));
    localStorage.setItem('searched', movie);
    if (films) { handleFilter(films, movie, shorts) } 
    else {
      setIsLoading(true);
      getMovies()
      .then((data) => { handleFilter(data, movie, shorts) })
      .catch(() => { setError(CONNECTION_ERROR) })
      .finally(() => { setIsLoading(false) });
    }
  }

 //  function handleSearch(item, shorts) {
 // const films =  JSON.parse(localStorage.getItem('films'));
 // if (!films) {
  //  getMovies().then((film) => {
   //   localStorage.setItem('films', JSON.stringify(film));
  //    handleFilter(item, shorts);
   // })
   // .catch(() => { setError(CONNECTION_ERROR) });
   // .finally(() => { setIsLoading(false) });
//};

  return (
    <main className="movies">
        <Header visibility={"none"}/>
        <SearchForm handleSearch={handleSearch} filter={handleShorts} shorts={shorts}/>
        {isLoading ? (<Preloader />) : (
        <MoviesCardList movies={filtered} error={error}
                        onCardSave={onCardSave} onCardDelete={onCardDelete}
                        savedMovies={savedMovies} />)}         
        <p className='movies__error'>{error}</p>            
        <Footer/>
    </main>
  );
}

export default Movies;