import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound.js';
import Header from '../Header/Header.js';
import ProtectedRoute from '../../contexts/ProtectedRoute.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import * as apiAuth from '../../utils/ApiAuth.js';
import apiMain from '../../utils/ApiMain.js';
import { getMovies } from '../../utils/ApiMovies.js';

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
          setLoggedIn(true);
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
          localStorage.setItem('jwt', data.token);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (!loggedIn) {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        handleLoginUser(jwt);
      }
    }
  }, [loggedIn]);

  function handleExit() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    navigate('/signin');
  }

  //Получаем информацию о зарегистрированном пользователе (работает, не надо фиксить)
  React.useEffect(() => {
    getUserInfo();
  }, []);

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route>
            <Route path="/" element={<Main/>} />
            <Route path="/movies" 
            element={<ProtectedRoute element={Movies}
            loggedIn={loggedIn}  />} />
            <Route path="/saved-movies" 
            element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn}/>} />
            <Route path="/profile"
             element={<ProtectedRoute element={Profile} 
             loggedIn={loggedIn} currentUser={currentUser}
              handleExit={handleExit}
             onExit={handleExit}/>} />
          </Route>
          <Route path="/signup" element={
              <Register onRegister={handleRegNewUser} />} />
          <Route path="/signin" element={
              <Login onLogin={handleLoginUser}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </CurrentUserContext.Provider>
    )
}

export default App;