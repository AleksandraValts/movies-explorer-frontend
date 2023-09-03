import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm() {
  return (
    <section className="search" aria-label="Поиск">
      <div className="search__container">
        <form className="search__form" name="search">
            <input className="search__input" type="text" 
                 placeholder="Фильм" required />
            <button className="search__button button" type="submit" 
            aria-label="Поиск">Поиск</button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}

export default SearchForm;
