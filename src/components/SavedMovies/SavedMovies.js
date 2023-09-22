import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import {EMPTY_SEARCH} from '../../utils/errors.js'
import {SHORT_TIME} from '../../utils/films.js'

function SavedMovies({onCardDelete, savedMovies}) {
  const [films, setFilms] = React.useState(savedMovies);
  const [error, setError] = React.useState('');
  const [shorts, setShorts] = React.useState(false);
  const [item, setItem] = React.useState('');

  const filterShorts = (movies) =>{return movies.filter((movie) => movie.duration < SHORT_TIME)}
  const filterMovies = (movies, item) => {
    const filtered = movies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(item.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(item.toLowerCase())
    );
    return filtered;
  }

  React.useEffect(() => {
    setError('');
    const filtered = filterMovies(savedMovies, item, shorts);
    if (filtered.length === 0) { setError(EMPTY_SEARCH) };
    setFilms(shorts ? filterShorts(filtered) : filtered);
  }, [savedMovies, shorts, item]);
  
 // function handleSearch (item, shorts) {
 //   setError('')
 //   setLoading(true);
 //   const filtered = handleSearchFilter(savedMovies, item, shorts);
 //   if (filtered.length === 0) { setError(EMPTY_SEARCH) }
  //  setFilms(filtered);
 // };

  function handleSearch(item) { 
    setError('');
    setItem(item) 
  }
  
  function handleShorts() { 
    setError('');
    setShorts(!shorts) 
  }

  return (
    <main className="movies">
        <Header visibility={"none"}/>
        <SearchForm  handleSearch={handleSearch} filter={handleShorts} shorts={shorts}/>
        <MoviesCardList movies={films} savedMovies={savedMovies} onCardDelete={onCardDelete}/>
        <p className='movies__error'>{error}</p>
        <Footer/>
    </main>
  );
}

export default SavedMovies;