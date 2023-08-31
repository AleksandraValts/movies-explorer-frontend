import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="popup popup_opened">
      <div className="popup__container">
        <button type="button" class="popup__button-close"></button>
        <div className="popup__menu">
          <Link to={"/"} style={{ textDecoration: 'none' }}>
            <p className="popup__menu-item">Главная</p>
          </Link>
          <Link to={"/movies"} style={{ textDecoration: 'none' }}>
            <p className="popup__menu-item">Фильмы</p>
          </Link>
          <Link to={"/saved-movies"} style={{ textDecoration: 'none' }}>
            <p className="popup__menu-item">Сохраненные фильмы</p>
          </Link>
        </div>

      </div>


    </div>
  );
}

export default Profile;