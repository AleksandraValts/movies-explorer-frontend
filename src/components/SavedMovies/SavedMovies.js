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
  
  React.useEffect(() => {
      apiMain.getSavedMovies()
        .then((movies) => setFilms(movies.reverse()))
       .catch(() => { setError(CONNECTION_ERROR)})
  }, [savedMovies]);

  function handleSearch (item, shorts) {
    setError('')
    setLoading(true);
    const filtered = handleSearchFilter(savedMovies, item, shorts);
    if (filtered.length === 0) {
      setError(EMPTY_SEARCH);
    }
    setFilms(filtered);
    setLoading(false);
  };

  function handleSearchFilter(films, item, short) {
    if (!films) { return []}
    let filtered = [...films];
    console.log(filtered)
    if (item) {
      filtered = filtered.filter((film) => film.nameRU
        .toLowerCase().includes(item.toLowerCase()));
    }
    if (short) {
      return filtered.filter((film) => film.duration <= 40);
    }
    return filtered;
  }
  

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