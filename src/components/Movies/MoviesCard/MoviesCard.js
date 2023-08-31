import film from '../../../images/student.jpg';

function MoviesCard() {
  return (
    <div className="movies-card">
      <div className="movies-card__about">
        <h2 className="movies-card__header">Фильм</h2>
        <p className="movies-card__time">1h 30m</p>
      </div>
      <img className="movies-card__poster" src={film} alt="Фильм"/>
      <button className="movies-card__button" type="button">Сохранить</button>
    </div>
  );
}

export default MoviesCard;