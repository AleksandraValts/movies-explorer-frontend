import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import apiMain from '../../utils/ApiMain.js';
import Preloader from '../Movies/Preloader/Preloader.js';
import {EMPTY_SEARCH, CONNECTION_ERROR} from '../../utils/errors.js'

function SavedMovies({onCardDelete, savedMovies}) {
  const [loading, setLoading] = React.useState(false); 
  const [films, setFilms] = React.useState(savedMovies);
  const [error, setError] = React.useState('');
  const handleSearchFilter = React.useCallback((movies, item, short) => {
    if (!movies) { return null}
    return movies.filter((movie) =>
      (short ? movie.duration <= 40 : movie) &&
      (movie.nameRU.toLowerCase().includes(item.toLowerCase()) ||
       movie.nameEN.toLowerCase().includes(item.toLowerCase()))
    );
  }, []);
  
  React.useEffect(() => {
      apiMain.getSavedMovies()
        .then((movies) => setFilms(movies.reverse()))
        .catch(() => { setError(CONNECTION_ERROR) })
  }, [savedMovies]);

  function handleSearch (item, shorts) {
    setError('')
    setLoading(true);
    const filtered = handleSearchFilter(savedMovies, item, shorts);
    if (filtered.length === 0) { setError(EMPTY_SEARCH) }
    setFilms(filtered);
    setLoading(false);
  };

  return (
    <main className="movies">
        <Header visibility={"none"}/>
        <SearchForm  handleSearch={handleSearch} />
        
        {loading ? ( <Preloader />) : (
        <MoviesCardList  movies={films} isSaved={true} savedMovies={savedMovies}
                        onCardDelete={onCardDelete} />
        )}

        <p className='movies__error'>{error}</p>
        <Footer/>
    </main>
  );
}

export default SavedMovies;