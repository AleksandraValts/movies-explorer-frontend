import headerLogo from '../../images/header-logo.svg';
import headerAccount from '../../images/header-icon.svg';
import { Link } from 'react-router-dom';
import Popup from '../Popup/Popup.js';

function Header(props) {

  // временный функционал для проверки работы верстки
  function openMenuPopup() {
    const popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
  }

  function closeMenuPopup() {
    const popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
  }

  return (
    <header> 
      <div className={`header header__${props.header}`}>
      <Link to={"/"}>
        <img className="header__logo button" src={headerLogo} alt="Лого"/>
      </Link>
      <div className={`header__about header__about_${props.about}`}>
        <div className="header__films">
          <Link to={"/movies"} className="header__films-list button">
            Фильмы
          </Link>
          <Link to={"/saved-movies"} className="header__films-list button">
            Сохраненные фильмы
          </Link>
        </div>
        <Link to={"/profile"} className="header__account button">
            <p className="header__text">Аккаунт</p>
            <img className={`header__logo-acc header__logo-acc_${props.logo}`} src={headerAccount} alt="Лого аккаунта"/>
        </Link>       
      </div>
      <div className={`header__unauthorized header__unauthorized_${props.visibility}`}>
        <Link to={"/signup"} className="header__register button">Регистрация</Link>
        <Link to={"/signin"} className="header__login button">Войти</Link>
      </div>
      <button className="header__button button" onClick={openMenuPopup}></button>
    </div>
    <Popup onClose={closeMenuPopup}/>
    </header>
  );
}

export default Header;