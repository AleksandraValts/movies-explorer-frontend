import React from 'react';
import { Route, Routes, useNavigate, useLocation, } from 'react-router-dom';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound.js';
import ProtectedRoute from '../../contexts/ProtectedRoute.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import * as apiAuth from '../../utils/ApiAuth.js';
import apiMain from '../../utils/ApiMain.js';
import Preloader from '../Movies/Preloader/Preloader.js';
import {CONFLICT, SERVER_ERROR, REG_ERROR, AUTH_ERROR} from '../../utils/errors.js'

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState({text: ''});
  const [savedMovies, setSavedMovies] = React.useState([]);
  //const [isLoading, setIsLoading] = React.useState(false);

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiAuth.checkToken(jwt)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .then(() => {navigate(location.pathname)})
      .catch((err) => { console.log(err)});
    }
  }

  React.useEffect(() => {handleTokenCheck()}, [])

  function handleRegNewUser({email, password, name}) {
    return apiAuth
       .register(email, password, name)
       .then((res) => {
         if (res) {
          setErrorMessage({text:''})
          navigate('/signin')}
       })
       .catch((err) => {
        console.log(err);
        setErrorMessage({text:''});
        setError(true);
        if (err === 'Статус ошибки: 400') {
          setErrorMessage({text: REG_ERROR});
        }
        if (err === 'Статус ошибки: 409') {
          setErrorMessage({text: CONFLICT});
        }
        if (err === 'Статус ошибки: 500') {
          setErrorMessage({text: SERVER_ERROR});
        }
      });
  }

  function handleLoginUser({email, password}) {
    apiAuth.authorise(email, password)
      .then((data) => {
       // if(!data) { return }
        if (data) {
          setLoggedIn(true);
        //  getUserInfo();
          localStorage.setItem('jwt', data.token);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage({text:''});
        setError(true);
        if (err === 'Статус ошибки: 401') {
          setErrorMessage({text: AUTH_ERROR});
        }
        if (err === 'Статус ошибки: 500') {
          setErrorMessage({text: SERVER_ERROR});
        }
      });
  }

  function handleExit() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    navigate('/signin');
  }

  React.useEffect(() => {
    if (loggedIn) {
      apiMain.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {console.log(err)});

      apiMain.getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse())
        })
        .catch((err) => {console.log(err)});
    }
  }, [loggedIn]);

  function handleLike(movie) {
    const isSaved = savedMovies.some(c => c.movieId === movie.id);
    if (!isSaved) {
      apiMain.saveMovie(movie)
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie]);
        })
    } else {
      const id = savedMovies.find(c => c.movieId === movie.id)._id;
      apiMain
        .deleteSavedMovie(id)
        .then(() => {
          setSavedMovies(res => res.filter(c => c.movieId !== movie.id))
        })
        .catch((err) => console.log(err));
    }
  };

  function handleDeleteLike(movie) {
    apiMain.deleteSavedMovie(movie._id)
      .then(() => {
        setSavedMovies(res => res.filter(c => c._id !== movie._id))
      })
      .catch((err) => console.log(err));
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
                   savedMovies={savedMovies}/>}/>
            <Route path="/profile"
                   element={<ProtectedRoute element={Profile} 
                   loggedIn={loggedIn} currentUser={currentUser}
                   handleExit={handleExit} onExit={handleExit}/>}/>
          </Route>
          <Route path="/signup"
                 element={<Register onRegister={handleRegNewUser}
                 error={error} text={errorMessage.text}/>}/>
          <Route path="/signin" 
                 element={<Login onLogin={handleLoginUser}
                 error={error} text={errorMessage.text}/>}/>
          <Route path="*" element={<NotFound/>}/>   
        </Routes>
   
    </CurrentUserContext.Provider>
  )
}

export default App;

