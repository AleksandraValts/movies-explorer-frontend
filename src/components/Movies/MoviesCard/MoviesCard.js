function MoviesCard(
  { movie: {nameRU, duration, trailerLink, image: { url }}}) 
  {

  function convertMinutes(min) {
    const hours = Math.floor(min / 60);
    const minutes = Math.floor(min % 60);
    return `${hours}ч ${minutes}м`;
  }

  return (
    <div className="movies-card">
      <div className="movies-card__about">
        <h2 className="movies-card__header">{nameRU}</h2>
        <p className="movies-card__time">{convertMinutes(duration)}</p>
      </div>
        <a className="movies-card__trailer" 
        href={trailerLink} rel="noreferrer" target="_blank">
      <img className="movies-card__poster" 
      src={`https://api.nomoreparties.co/${url}`} alt={nameRU}/>
      </a>
      <button className="button movies-card__button" type="button" 
         >Сохранить</button>
    </div>
  );
}

export default MoviesCard;