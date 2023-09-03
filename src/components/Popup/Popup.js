import React from 'react';
import { Link } from 'react-router-dom';
import headerAccount from '../../images/header-icon.svg';

function Profile(props) {
  return (
    <div className="popup">
      <div className="popup__container">
        <button type="button" class="popup__button-close button"
        onClick={props.onClose}></button>
        <div className="popup__menu">
          <Link to={"/"} className="popup__menu-item button">Главная</Link>
          <Link to={"/movies"} className="popup__menu-item button">Фильмы</Link>
          <Link to={"/saved-movies"} className="popup__menu-item button">Сохраненные фильмы</Link>
        </div>
          <Link to={"/profile"} className="popup__account button">
            <p className="popup__text">Аккаунт</p>
              <img className="popup__logo-acc" src={headerAccount} alt="Лого"/>
          </Link>
      </div>
    </div>
  );
}

export default Profile;