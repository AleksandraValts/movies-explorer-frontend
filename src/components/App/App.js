import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound.js';
//import Header from '../Header/Header.js';
//import Popup from '../Popup/Popup.js';
import ProtectedRoute from '../../contexts/ProtectedRoute.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import * as apiAuth from '../../utils/ApiAuth.js';
import apiMain from '../../utils/ApiMain.js';
//import apiMovies from '../../utils/ApiMovies.js';
import Preloader from '../Movies/Preloader/Preloader.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();


  // регистрируем нового пользователя, авторизуемся и выходим из профиля (работает, не фиксить)
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiAuth.checkToken(jwt)
      .then((res) => {
       // const { _id } = res;
        setLoggedIn(true);
        setCurrentUser(res);
      })
        .then(() => {
          navigate('/movies');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, [])

  function handleRegNewUser({email, password, name}) {
    return apiAuth
       .register(email, password, name)
       .then((res) => {
         if (res) {
          navigate('/signin');
         }
       })
       .catch((err) => {
         console.log(err);
       })
  }

  function handleLoginUser({email, password}) {
    return apiAuth
      .authorise(email, password)
      .then((data) => {
        if(!data) { return }
        if (data.token) {
          setLoggedIn(true);
          getUserInfo();
          localStorage.setItem('jwt', data.token);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

 // React.useEffect(() => { if (!loggedIn) {
  //    if (localStorage.getItem('jwt')) {
  //      const jwt = localStorage.getItem('jwt');
   //     handleLoginUser(jwt);
   //   }
   // }
 // }, [loggedIn]);

  function handleExit() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setLoggedIn(false);
    navigate('/signin');
  }

  //Получаем информацию о зарегистрированном пользователе (работает, не надо фиксить)
  React.useEffect(() => {
    getUserInfo();
  }, [loggedIn]);

function getUserInfo() {
  apiMain.getUserInfo()
    .then((data) => {
      setCurrentUser(data);
      setLoggedIn(true);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так! Ошибка сервера ${err}`);
    })
}

React.useEffect(() => {
  if (loggedIn) {
    apiMain
      .getSavedMovies()
      .then((movies) => {
        setCurrentUser(movies)
        setSavedMovies(movies.reverse())
      })
      .catch((err) => {
        console.log(`Что-то пошло не так! Ошибка сервера ${err}`);
      })
  }
}, [loggedIn]);


const [savedMovies, setSavedMovies] = React.useState(null);

function handleLike(movie) {
  const isMovieSaved = savedMovies.some((item) => item.movieId === movie.id);
  console.log(isMovieSaved)
  if (!isMovieSaved) {
    apiMain
      .saveMovie({
        movieId: movie.id,
        nameRU: movie.nameRU,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        duration: movie.duration,
        country: movie.country,
        director: movie.director,
        year: movie.year,
        description: movie.description,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
        owner: movie.owner,
        nameEN: movie.nameEN,
      })
      .then((movie) => setSavedMovies([movie, ...savedMovies]))
      .then((() => console.log("works")))
      .catch((err) => console.log(err, err.status, err.message));
  } else {
    const id = savedMovies.find((item) => item.movieId === movie.id)._id;
    console.log(id)
    apiMain
      .deleteSavedMovie(id)
      .then(() => {
        setSavedMovies((res) =>
          res.filter((item) => item.movieId !== movie.id)
        );
      })
      .then((() => console.log("works 2")))
      .catch((err) => console.log(err, err.status, err.message));
  }
};

// Удаляю карточку из сохранённых фильмов
function handleDeleteLike(movie) {
  apiMain
    .deleteSavedMovie(movie._id)
    .then(() => {
      setSavedMovies((res) =>
        res.filter((item) => item.movieId !== movie.movieId)
      );
    })
    .then((() => console.log("works 3")))
    .catch((err) => console.log(err, err.status, err.message));
};


  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route>
            <Route path="/" element={<Main loggedIn={loggedIn}/>}/>
            <Route path="/movies" 
                   element={<ProtectedRoute element={Movies}
                   loggedIn={loggedIn}  savedMovies={savedMovies}
                   onCardSave={handleLike}/>}/>
            <Route path="/saved-movies" 
                   element={<ProtectedRoute element={SavedMovies}
                   loggedIn={loggedIn} onCardDelete={handleDeleteLike}
                   movies={savedMovies}/>}/>
            <Route path="/profile"
                   element={<ProtectedRoute element={Profile} 
                   loggedIn={loggedIn} currentUser={currentUser}
                   handleExit={handleExit} onExit={handleExit}/>}/>
          </Route>
          <Route path="/signup"
                 element={<Register onRegister={handleRegNewUser}/>}/>
          <Route path="/signin" 
                 element={<Login onLogin={handleLoginUser}/>}/>
          <Route path="*" element={<NotFound/>}/>         
        </Routes>
    </CurrentUserContext.Provider>
  )
}

export default App;