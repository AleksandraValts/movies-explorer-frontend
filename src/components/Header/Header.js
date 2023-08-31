import headerLogo from '../../images/header-logo.svg';
import headerAccount from '../../images/header-logo-acc.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to={"/"}>
        <img className="header__logo" src={headerLogo} alt="Лого"/>
      </Link>
      <div className="header__about">
        <ul className="header__films">
          <Link to={"/movies"} style={{ textDecoration: 'none' }}>
            <li className="header__films-list">Фильмы</li>
          </Link>
          <Link to={"/saved-movies"} style={{ textDecoration: 'none' }}>
            <li className="header__films-list">Сохраненные фильмы</li>
          </Link>
        </ul>
        <Link to={"/profile"} style={{ textDecoration: 'none' }}>
          <div className="header__account">
            <p className="header__text">Аккаунт</p>
            <img className="header__logo-acc" src={headerAccount} alt="Лого аккаунта"/>
          </div>
        </Link>
      </div>
      <button className="header__button"></button>
    </header>
  );
}

export default Header;