import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';


function MoviesCardList({isSaved, onCardSave, onCardDelete, savedMovies, handleLike, movies}) {
  const [visibleMovies, setVisibleMovies] = React.useState([]); // 
  const [line, setLine] = React.useState(0);
  
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
  
  React.useEffect(() => {
    setMoviesRules();
    window.addEventListener("resize", () => {
      setTimeout(() => {
        setMoviesRules();
      }, 200);
    });
  }, []);

  const handleButtonHidden = React.useMemo(() => {
    if (movies === null) { return false }
    if (visibleMovies >= movies.length) { return false } 
    else { return true }
  }, [movies, visibleMovies]);

  function getSavedMovieCard(savedMovies, card) {
    return savedMovies.find((savedMovies) => savedMovies.movieId === card.id);
  }

  return (
    <section className="cards">
      <div className="movies-cards">
      {movies.map((movie, amount) => {
        if (amount < visibleMovies) {
          return (
          <MoviesCard key={movie.id ?? movie.movieId} isLiked={getSavedMovieCard(savedMovies, movie)}
                      onCardDelete={onCardDelete} isSaved={isSaved}
                      savedMovies={savedMovies} handleLikeClick={handleLike}
                      onCardSave={onCardSave} movie={movie}/>)}
          return null;
        })
      } 
      </div>
      {handleButtonHidden && (
      <button className="button movies-cards__button" type="button" 
              onClick={showMoreMovies}>Еще
      </button>
       )}
    </section>
  );
}

export default MoviesCardList;
