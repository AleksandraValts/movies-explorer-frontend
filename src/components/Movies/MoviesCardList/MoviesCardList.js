import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({onCardSave, onCardDelete, savedMovies, movies}) {
  const [visibleMovies, setVisibleMovies] = React.useState(0);
  const [line, setLine] = React.useState(0);
  const location = useLocation();
  
  function setMoviesRules() {
    const width = window.innerWidth;
    if (width <= 500) {
      setVisibleMovies(5);
      setLine(2);
    } else if (width <= 1276) {
      setVisibleMovies(8);
      setLine(2);
    } else {
      setVisibleMovies(12);
      setLine(3);
    }
  };

  function showMoreMovies() {
    setVisibleMovies(visibleMovies + line);
  };

  React.useEffect(() => { setMoviesRules(movies)}, [movies]);
  React.useEffect(() => {
    setTimeout(() => { window.addEventListener('resize', setMoviesRules)}, 200);
  });

  return (
    <section className="cards">
      {location.pathname !== '/saved-movies' ? (
      <div className="movies-cards">
        {movies.map((movie, amount) => { if (amount < visibleMovies) {
            return ( <MoviesCard key={movie.id ?? movie.movieId} onCardSave={onCardSave}
                    onCardDelete={onCardDelete} savedMovies={savedMovies} movie={movie} />)}
            return null })}
      </div> 
      ) : (
      <div className="movies-cards">
        {movies.map((movie) => { return (
          <MoviesCard key={movie.id ?? movie.movieId} onCardSave={onCardSave}
          onCardDelete={onCardDelete} savedMovies={savedMovies} movie={movie} />)})} 
      </div>
      )}
      {movies.length > visibleMovies && location.pathname !== '/saved-movies' && (
      <button className="button movies-cards__button" type="button" 
              onClick={showMoreMovies}>Еще
      </button>
       )}
    </section>
  );
}

export default MoviesCardList;
