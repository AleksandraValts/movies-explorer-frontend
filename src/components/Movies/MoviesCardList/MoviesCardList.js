import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList(props) {
  return (
    <section className="cards">
      <div className="movies-cards">
        <MoviesCard  onCardLike={props.onCardLike}/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
      </div>
      <button className="movies-cards__button" type="button">Еще</button>
        


    </section>
  );
}

export default MoviesCardList;

