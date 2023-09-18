import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import apiMain from '../../utils/ApiMain.js';

function SavedMovies({onCardDelete, movies, loggedIn}) {

  const [films, setfilms] = React.useState(
    JSON.parse(localStorage.getItem('savedMovies')) || []
  ); 

  React.useEffect(() => {
      apiMain.getSavedMovies()
        .then((movies) => setfilms(movies.reverse()))
        .catch((err) => {
          console.log(`Ошибка сервера ${err}`);
        })
  }, []);

  function handleSearch (item, shorts) {
    const filtered = handleSearchFilter(movies, item, shorts);
    if (filtered.length === 0) {
      console.log('err')
    }
    setfilms(filtered);
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
        <MoviesCardList movies={movies} films={films} 
                        onCardDelete={onCardDelete} /> 
        <Footer/>
    </main>
  );
}

export default SavedMovies;