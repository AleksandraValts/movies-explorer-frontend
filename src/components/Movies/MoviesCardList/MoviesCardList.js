import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({movies, error}) {

  const [visibleMovies, setVisibleMovies] = React.useState(0); // 
  const [step, setStep] = React.useState(0);
  const location = useLocation();
  
  function setMoviesRules() {
    const width = window.innerWidth;
    if (location.pathname === "/saved-movies") {
      setVisibleMovies(movies.length);
    }
    if (width <= 500) {
      setVisibleMovies(5);
      setStep(2);
    } else if (width <= 1276) {
      setVisibleMovies(8);
      setStep(2);
    } else {
      setVisibleMovies(12);
      setStep(3);
    }
  };

  function showMoreMovies() {
    setVisibleMovies(visibleMovies+step);
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

  return (
    <section className="cards">
      <div className="movies-cards">
      {movies.map((movie, amount) => {
        if (amount < visibleMovies) {
          return (<MoviesCard key={movie.id} movie={movie} />)
        }
        return null;
      })} 
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
