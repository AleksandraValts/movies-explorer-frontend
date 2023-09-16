import React from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ handleSearch }) {
  const [input, setInput] = React.useState('');
  const { pathname } = useLocation();
  const [shortFilm, setShortFilm] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (pathname === '/movies') {
      const item = localStorage.getItem('item');
      const shorts = JSON.parse(localStorage.getItem('shorts'));
      if (item) {
        setInput(item);
      }
      if (shorts) {
        setShortFilm(shorts);
      }
      if (item || shorts === true) {
        handleSearch(item, shorts);
      }
    }
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!input) {
      setError(true);
      evt.target.elements['search'].focus();
      return;
    }
    setError(false);
    localStorage.setItem('item', input);
    handleSearch(input, shortFilm);
  };

  function handeleInput (evt) {
    setInput(evt.target.value);
  };

  function handleFilterCheckbox () {
    setShortFilm(!shortFilm);
    handleSearch(input, !shortFilm);
    if (pathname === '/movies') {
      localStorage.setItem('shorts', !shortFilm);
    }
  };

  return (
    <section className="search" aria-label="Поиск">
      <div className="search__container">
        <form className="search__form" name="search-form"
              onSubmit={handleSubmit}  noValidate>
            <input className="search__input" type="text"
                   placeholder="Фильм" required id="search"
                   onChange={handeleInput} name="search"/>
            <button className="search__button button" type="submit" 
                    aria-label="Поиск">Поиск
            </button>
            {error ? (
            <span className="search__error">
                Перед началом поиска введите название фильма
            </span>
            ) : (
            <span className="search__error search__error_none">
                Все ок
            </span>
            )}        
        </form>
        <FilterCheckbox value={shortFilm} onChange={handleFilterCheckbox} />
      </div>
    </section>
  );
}

export default SearchForm;
