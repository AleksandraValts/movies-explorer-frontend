import React from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({handleSearch, filter, shorts}) {
  const [input, setInput] = React.useState('');
  const { pathname } = useLocation();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const movie = localStorage.getItem('searched');
    if (pathname === '/movies' && movie) { setInput(movie) }
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!input) {
      setError(true);
      evt.target.elements['search'].focus();
      return;
    }
    setError(false);
    handleSearch(input);
  }
  
  function handleInput(evt) {
    setInput(evt.target.value);
  }

  return (
    <section className="search" aria-label="Поиск">
      <div className="search__container">
        <form className="search__form" name="search-form"
              onSubmit={handleSubmit}  noValidate>
            <input className="search__input" type="text"
                   placeholder="Фильм" required id="search"
                   onChange={handleInput} value={input}  name="search"/>
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
        <FilterCheckbox filter={filter} shorts={shorts} />
      </div>
    </section>
  );
}

export default SearchForm;
