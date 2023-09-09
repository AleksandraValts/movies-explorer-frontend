import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ movies }) {

  // временный функционал для проверки работы верстки
 // function handleLikeClick() {
   // const popup = document.querySelector('.movies-card__button');
   // popup.classList.add('movies-card__button-like');
  //}

  return (
    <section className="cards">
      <div className="movies-cards">
      {movies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))}
        
      </div>
      <button className="button movies-cards__button" type="button">Еще</button>
    </section>
  );
}

export default MoviesCardList;

