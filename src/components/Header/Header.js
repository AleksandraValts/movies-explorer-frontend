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
        <img className="header__logo" src={headerLogo} alt="Лого"/>
      </Link>
      <div className="header__about">
        <ul className="header__films">
          <Link to={"/movies"} className="header__films-list">
            Фильмы
          </Link>
          <Link to={"/saved-movies"} className="header__films-list">
            Сохраненные фильмы
          </Link>
        </ul>
        <div className="header__account">
          <p className="header__text">Аккаунт</p>
          <Link to={"/profile"}>
            <img className={`header__logo-acc header__logo-acc-${props.logo}`} src={headerAccount} alt="Лого аккаунта"/>
          </Link>
        </div>        
      </div>
      <button className="header__button" onClick={openMenuPopup}></button>
    </div>
    <Popup onClose={closeMenuPopup}/>
    </header>
  );
}

export default Header;