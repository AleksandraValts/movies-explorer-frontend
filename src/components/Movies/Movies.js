import React from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import { getMovies } from '../../utils/ApiMovies.js';
import apiMain from '../../utils/ApiMain.js';

function Movies() {
  const [movies, setMovies] = React.useState([]);
  const [error, setError] = React.useState('');

  // получаем карточки со всеми фильмами базы данных (перенесено из App.js, добавить прелоадер)
  function handleSearch(item, shorts) {
    const films =  JSON.parse(localStorage.getItem('films'));
    if (!films) {
      getMovies()
        .then((film) => {
          localStorage.setItem('films', JSON.stringify(film));
          handleFilter(item, shorts);
        })
        .catch(() => {
          setError('Ошибка подключения');
        });
    } else {
      handleFilter(item, shorts);
    }
  };

  // получаем карточки с фильмами из хранилища
   React.useEffect(() => {
    const localFilms = localStorage.getItem('localFilms');
    if (!localFilms) {
      apiMain.getSavedMovies()
        .then((film) => {
          if (film.length > 0) {
            localStorage.setItem('localFilms', JSON.stringify(film));
          }    
        })
        .catch(() => { setError('Ошибка подключения')});
    }
  }, []);

  function handleFilter(item, shorts) {
    const localFilms = JSON.parse(localStorage.getItem('films'));
    const filtered = handleSearchFilter(localFilms, item, shorts);
    if (filtered.length === 0) {
      setError("Не найдено");
    }
    setMovies(filtered);
  };

  function handleSearchFilter(films, item, short) {
    if (!films) { return []}
    let filtered = [...films];
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
        <SearchForm handleSearch={handleSearch}/>
        <MoviesCardList movies={movies} error={error}/>
        <Footer/>
    </main>
  );
}

export default Movies;