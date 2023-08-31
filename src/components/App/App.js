import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound.js';
//import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';

function App() {
return (
  <div className="app">
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Register/>} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;