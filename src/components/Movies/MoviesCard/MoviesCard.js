import React from 'react';
import { useLocation } from 'react-router-dom';
import apiMain from '../../../utils/ApiMain.js';

function MoviesCard({ onCardSave, onCardDelete, savedMovies, movie}) {

  function convertMinutes(min) {
    const hours = Math.floor(min / 60);
    const minutes = Math.floor(min % 60);
    return `${hours}ч ${minutes}м`;
  }

  let { pathname } = useLocation();
  const isLiked = savedMovies
  ? savedMovies.some(c => c.movieId === movie.id)
  : false;

// Обработчик клика лайка
const handleLikeClick = () => {
  onCardSave(movie);
};

// Обработчик клика удаления
const handleDeleteClick = () => {
  onCardDelete(movie);
};


  return (
    <div className="movies-card">
      <div className="movies-card__about">
        <h2 className="movies-card__header">{movie.nameRU}</h2>
        <p className="movies-card__time">{convertMinutes(movie.duration)}</p>
      </div>
        <a className="movies-card__trailer" 
        href={movie.trailerLink} rel="noreferrer" target="_blank">
      <img className="movies-card__poster" 
      src={
        pathname === '/movies'
          ? `https://api.nomoreparties.co/${movie.image.url}`
          : movie.image
      }
      alt={movie.nameRU}/>
      </a>
      {pathname === '/saved-movies' ? (
      <button className="button movies-card__button movies-card__button-delete-like" 
      type="button" onClick={handleDeleteClick}
         ></button>
         ) : (
          <button className={
            isLiked
            ? "button movies-card__button movies-card__button-like" 
            : "button movies-card__button movies-card__button-save-like" 
          }
          type="button" onClick={handleLikeClick} 
         ></button>
         )}
    </div>
  );
}

export default MoviesCard;

