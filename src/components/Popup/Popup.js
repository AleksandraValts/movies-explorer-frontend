import React from 'react';
import { Link } from 'react-router-dom';
import headerAccount from '../../images/header-logo-acc-black.png';

function Profile(props) {
  return (
    <div className="popup">
      <div className="popup__container">
        <button type="button" class="popup__button-close"
        onClick={props.onClose}></button>
        <div className="popup__menu">
          <Link to={"/"} className="popup__menu-item">Главная</Link>
          <Link to={"/movies"} className="popup__menu-item">Фильмы</Link>
          <Link to={"/saved-movies"} className="popup__menu-item">Сохраненные фильмы</Link>
        </div>
          <div className="popup__account">
            <p className="popup__text">Аккаунт</p>
            <Link to={"/profile"}>
              <img className="popup__logo-acc" src={headerAccount} alt="Лого аккаунта"/>
            </Link>
          </div>
      </div>
    </div>
  );
}

export default Profile;