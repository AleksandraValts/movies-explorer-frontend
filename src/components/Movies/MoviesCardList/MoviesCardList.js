import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList(props) {

  // временный функционал для проверки работы верстки
  function handleLikeClick() {
    const popup = document.querySelector('.movies-card__button');
    popup.classList.add('movies-card__button-like');
  }

  return (
    <section className="cards">
      <div className="movies-cards">
        <MoviesCard  onCardLike={props.onCardLike}>
          <button className="button movies-card__button" type="button" 
          onClick={handleLikeClick}>Сохранить</button>
        </MoviesCard>
        <MoviesCard  onCardLike={props.onCardLike}>
          <button className="button movies-card__button" type="button" 
          onClick={handleLikeClick}>Сохранить</button>
        </MoviesCard>
        <MoviesCard  onCardLike={props.onCardLike}>
          <button className="button movies-card__button" type="button" 
          onClick={handleLikeClick}>Сохранить</button>
        </MoviesCard>
        <MoviesCard  onCardLike={props.onCardLike}>
          <button className="button movies-card__button" type="button" 
          onClick={handleLikeClick}>Сохранить</button>
        </MoviesCard>
        <MoviesCard  onCardLike={props.onCardLike}>
          <button className="button movies-card__button" type="button" 
          onClick={handleLikeClick}>Сохранить</button>
        </MoviesCard>
        <MoviesCard  onCardLike={props.onCardLike}>
          <button className="button movies-card__button" type="button" 
          onClick={handleLikeClick}>Сохранить</button>
        </MoviesCard>
        <MoviesCard  onCardLike={props.onCardLike}>
          <button className="button movies-card__button" type="button" 
          onClick={handleLikeClick}>Сохранить</button>
        </MoviesCard>
        <MoviesCard  onCardLike={props.onCardLike}>
          <button className="button movies-card__button" type="button" 
          onClick={handleLikeClick}>Сохранить</button>
        </MoviesCard>
      </div>
      <button className="button movies-cards__button" type="button">Еще</button>
    </section>
  );
}

export default MoviesCardList;

