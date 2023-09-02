import film from '../../../images/film.jpg';

function MoviesCard(props) {

  return (
    <div className="movies-card">
      <div className="movies-card__about">
        <h2 className="movies-card__header">Фильм</h2>
        <p className="movies-card__time">1h 30m</p>
      </div>
      <img className="movies-card__poster" src={film} alt="Фильм"/>
      {props.children}
    </div>
  );
}

export default MoviesCard;



